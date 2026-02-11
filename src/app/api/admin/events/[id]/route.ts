import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyToken } from '@/lib/auth';
import { sendEventApprovalEmail, sendEventRejectionEmail } from '@/lib/email';
import { indexEventPage, pingSitemap, isIndexingConfigured } from '@/lib/google-indexing';

export const dynamic = 'force-dynamic';

/**
 * Get single event details for admin
 */
export async function GET(
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

    const { data: event, error } = await supabaseAdmin
      .from('events')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Get event error:', error);
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ event });
  } catch (error) {
    console.error('Get event error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Update event (approve, reject, edit, feature, etc.)
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
    const { action, rejectionReason, ...updateData } = body;

    // First, get the current event data for email notifications
    const { data: existingEvent } = await supabaseAdmin
      .from('events')
      .select('*')
      .eq('id', id)
      .single();

    let updates: Record<string, unknown> = {};

    switch (action) {
      case 'approve':
        updates = { status: 'published' };
        break;
      case 'reject':
        updates = { status: 'rejected' };
        break;
      case 'draft':
        updates = { status: 'draft' };
        break;
      case 'feature':
        updates = { is_featured: true };
        break;
      case 'unfeature':
        updates = { is_featured: false };
        break;
      case 'update':
        updates = updateData;
        break;
      case 'update_description':
        // Handle description update specifically
        if (body.description === undefined) {
          return NextResponse.json(
            { error: 'Description is required' },
            { status: 400 }
          );
        }
        updates = { description: body.description };
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

    const { data: event, error } = await supabaseAdmin
      .from('events')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Update event error:', error);
      return NextResponse.json(
        { error: 'Failed to update event: ' + error.message },
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
      console.log('Revalidated event pages after status change');
    } catch (revalidateError) {
      console.error('Failed to revalidate:', revalidateError);
    }

    // Send email notifications for approval/rejection
    const contactEmail = existingEvent?.contact_email;
    const eventTitle = existingEvent?.title || event?.title || 'Your Event';
    const eventSlug = event?.slug || '';
    const venueName = existingEvent?.venue_name || event?.venue_name || 'Your Venue';

    if (contactEmail) {
      try {
        if (action === 'approve') {
          await sendEventApprovalEmail(contactEmail, eventTitle, eventSlug, venueName);
          console.log(`Approval email sent to ${contactEmail} for event: ${eventTitle}`);
        } else if (action === 'reject') {
          const reason = rejectionReason || 'Your event did not meet our publishing guidelines. Please review and resubmit.';
          await sendEventRejectionEmail(contactEmail, eventTitle, venueName, reason);
          console.log(`Rejection email sent to ${contactEmail} for event: ${eventTitle}`);
        }
      } catch (emailError) {
        // Log email error but don't fail the request
        console.error('Failed to send email notification:', emailError);
      }
    } else {
      console.log(`No contact email found for event: ${eventTitle}`);
    }

    // Request Google indexing for approved events (time-sensitive!)
    if (action === 'approve' && eventSlug && isIndexingConfigured()) {
      try {
        const indexResult = await indexEventPage(eventSlug);
        if (indexResult.success) {
          console.log(`Google indexing requested for event: /events/${eventSlug}`);
          await pingSitemap();
        } else {
          console.warn(`Google indexing failed for event: ${eventSlug}`, indexResult.error);
        }
      } catch (indexError) {
        // Log but don't fail the request
        console.error('Failed to request Google indexing:', indexError);
      }
    }

    return NextResponse.json({
      success: true,
      event,
      message: action === 'approve'
        ? 'Event approved and published! Email notification sent.'
        : action === 'reject'
        ? 'Event rejected. Email notification sent.'
        : 'Event updated successfully',
    });
  } catch (error) {
    console.error('Update event error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Delete event
 */
export async function DELETE(
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

    const { error } = await supabaseAdmin
      .from('events')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Delete event error:', error);
      return NextResponse.json(
        { error: 'Failed to delete event: ' + error.message },
        { status: 500 }
      );
    }

    // Revalidate pages that display events
    try {
      revalidatePath('/events');
      revalidatePath('/events/calendar');
      revalidatePath('/');
      console.log('Revalidated event pages after deletion');
    } catch (revalidateError) {
      console.error('Failed to revalidate:', revalidateError);
    }

    return NextResponse.json({
      success: true,
      message: 'Event deleted successfully',
    });
  } catch (error) {
    console.error('Delete event error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
