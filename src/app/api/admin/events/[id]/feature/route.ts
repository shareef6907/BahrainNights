import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

/**
 * Toggle featured status of an event
 * POST /api/admin/events/[id]/feature
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const body = await request.json();
    const { is_featured } = body;

    // Update the event's featured status
    const { data: event, error } = await supabaseAdmin
      .from('events')
      .update({ is_featured: is_featured })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Toggle feature error:', error);
      return NextResponse.json(
        { error: 'Failed to update featured status: ' + error.message },
        { status: 500 }
      );
    }

    // Revalidate pages that display events
    try {
      revalidatePath('/events');
      revalidatePath('/');
      if (event?.slug) {
        revalidatePath(`/events/${event.slug}`);
      }
      if (event?.category) {
        revalidatePath(`/events/category/${event.category}`);
      }
    } catch (revalidateError) {
      console.error('Failed to revalidate:', revalidateError);
    }

    return NextResponse.json({
      success: true,
      event,
      is_featured: event.is_featured,
      message: event.is_featured ? 'Event marked as featured' : 'Event removed from featured',
    });
  } catch (error) {
    console.error('Toggle feature error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
