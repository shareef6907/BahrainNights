import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = getSupabaseAdmin();

    // Optional: get scheduling info from request body
    let scheduledFor: string | null = null;
    try {
      const body = await request.json();
      scheduledFor = body.scheduled_for || null;
    } catch {
      // No body provided, that's fine
    }

    const updateData: Record<string, string | null> = {
      status: scheduledFor ? 'scheduled' : 'approved',
      reviewed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (scheduledFor) {
      updateData.scheduled_for = scheduledFor;
    }

    const { data, error } = await supabase
      .from('content_posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      content: data,
      message: scheduledFor ? 'Content approved and scheduled' : 'Content approved',
    });
  } catch (error) {
    console.error('Error approving content:', error);
    return NextResponse.json(
      { error: 'Failed to approve content' },
      { status: 500 }
    );
  }
}
