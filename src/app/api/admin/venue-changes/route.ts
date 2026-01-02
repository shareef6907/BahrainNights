import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { getAdminClient } from '@/lib/supabase/server';

// Get all venue change requests for admin
export async function GET(request: NextRequest) {
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

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'pending';
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 50;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0;

    const supabase = getAdminClient();

    // Build query - join with venues to get venue name
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query = (supabase.from('venue_change_requests') as any)
      .select('*, venues(name)', { count: 'exact' })
      .order('submitted_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status !== 'all') {
      query = query.eq('status', status);
    }

    const { data: requests, error, count } = await query;

    if (error) {
      console.error('Error fetching venue change requests:', error);
      return NextResponse.json(
        { error: 'Failed to fetch change requests' },
        { status: 500 }
      );
    }

    // Get counts by status
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { count: pendingCount } = await (supabase.from('venue_change_requests') as any)
      .select('id', { count: 'exact', head: true })
      .eq('status', 'pending');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { count: approvedCount } = await (supabase.from('venue_change_requests') as any)
      .select('id', { count: 'exact', head: true })
      .eq('status', 'approved');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { count: rejectedCount } = await (supabase.from('venue_change_requests') as any)
      .select('id', { count: 'exact', head: true })
      .eq('status', 'rejected');

    return NextResponse.json({
      requests: requests || [],
      counts: {
        pending: pendingCount || 0,
        approved: approvedCount || 0,
        rejected: rejectedCount || 0,
        total: count || 0,
      },
      pagination: {
        limit,
        offset,
        total: count || 0,
      },
    });
  } catch (error) {
    console.error('Error fetching venue change requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch change requests' },
      { status: 500 }
    );
  }
}
