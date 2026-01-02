import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { getAdminClient } from '@/lib/supabase/server';

interface RouteContext {
  params: Promise<{ id: string }>;
}

interface ChangeRequest {
  id: string;
  venue_id: string;
  changes: Record<string, unknown>;
  status: string;
}

// Reject a venue change request
export async function POST(request: NextRequest, context: RouteContext) {
  try {
    // Verify admin authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await verifyToken(token);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { id } = await context.params;
    const body = await request.json();
    const reason = body.reason || '';

    const supabase = getAdminClient();

    // Get the change request
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: changeRequest, error: fetchError } = await (supabase
      .from('venue_change_requests') as any)
      .select('*')
      .eq('id', id)
      .single();

    const request_data = changeRequest as ChangeRequest | null;

    if (fetchError || !request_data) {
      return NextResponse.json(
        { error: 'Change request not found' },
        { status: 404 }
      );
    }

    if (request_data.status !== 'pending') {
      return NextResponse.json(
        { error: 'This request has already been processed' },
        { status: 400 }
      );
    }

    // Update the change request status to rejected
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: updatedRequest, error: updateError } = await (supabase
      .from('venue_change_requests') as any)
      .update({
        status: 'rejected',
        rejection_reason: reason,
        reviewed_by: user.userId,
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating change request:', updateError);
      return NextResponse.json(
        { error: 'Failed to reject change request' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Profile change request rejected',
      request: updatedRequest,
    });
  } catch (error) {
    console.error('Error rejecting change request:', error);
    return NextResponse.json(
      { error: 'Failed to reject change request' },
      { status: 500 }
    );
  }
}
