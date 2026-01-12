import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

/**
 * Toggle event visibility (hide/unhide)
 */
export async function PATCH(
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
    const { is_hidden } = body;

    if (typeof is_hidden !== 'boolean') {
      return NextResponse.json(
        { error: 'is_hidden must be a boolean value' },
        { status: 400 }
      );
    }

    // Get current event to check it exists
    const { data: existingEvent, error: fetchError } = await supabaseAdmin
      .from('events')
      .select('id, title, slug, is_hidden')
      .eq('id', id)
      .single();

    if (fetchError || !existingEvent) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // Update visibility
    const { data: event, error: updateError } = await supabaseAdmin
      .from('events')
      .update({ is_hidden })
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      console.error('Update event visibility error:', updateError);
      return NextResponse.json(
        { error: 'Failed to update event visibility: ' + updateError.message },
        { status: 500 }
      );
    }

    // Revalidate pages that display events
    try {
      revalidatePath('/events');
      revalidatePath('/events/calendar');
      revalidatePath('/');
      if (event?.slug) {
        revalidatePath(`/events/${event.slug}`);
      }
      console.log(`Revalidated event pages after visibility change for: ${existingEvent.title}`);
    } catch (revalidateError) {
      console.error('Failed to revalidate:', revalidateError);
    }

    return NextResponse.json({
      success: true,
      event,
      message: is_hidden
        ? `Event "${existingEvent.title}" is now hidden from public view`
        : `Event "${existingEvent.title}" is now visible to the public`,
    });
  } catch (error) {
    console.error('Toggle event visibility error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
