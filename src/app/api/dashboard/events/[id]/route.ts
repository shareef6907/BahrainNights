import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getEventById, updateEvent, deleteEvent, publishEvent } from '@/lib/db/events';
import { getVenueByOwnerId } from '@/lib/db/venues';
import { cookies } from 'next/headers';
import { z } from 'zod';

// Validation schema for updating events
const updateEventSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  category: z.string().optional(),
  tags: z.string().optional(),
  startDate: z.string().optional(),
  startTime: z.string().optional(),
  endDate: z.string().optional(),
  endTime: z.string().optional(),
  isRecurring: z.boolean().optional(),
  recurringPattern: z.string().optional(),
  recurringDays: z.array(z.string()).optional(),
  priceType: z.enum(['free', 'paid', 'range']).optional(),
  price: z.string().optional(),
  priceMin: z.string().optional(),
  priceMax: z.string().optional(),
  bookingUrl: z.string().optional(),
  bookingMethod: z.string().optional(),
  featuredImage: z.string().optional(),
  galleryImages: z.array(z.string()).optional(),
  ageRestriction: z.string().optional(),
  dressCode: z.string().optional(),
  specialInstructions: z.string().optional(),
  status: z.enum(['draft', 'published', 'cancelled']).optional(),
  action: z.enum(['publish', 'unpublish', 'cancel']).optional(),
});

// Get single event
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Verify authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await verifyToken(token);
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Get user's venue
    const venue = await getVenueByOwnerId(user.userId);
    if (!venue) {
      return NextResponse.json({ error: 'No venue found' }, { status: 404 });
    }

    // Get event
    const event = await getEventById(id);
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // Verify ownership
    if (event.venue_id !== venue.id) {
      return NextResponse.json(
        { error: 'Not authorized to view this event' },
        { status: 403 }
      );
    }

    return NextResponse.json({ event });
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 }
    );
  }
}

// Update event
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Verify authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await verifyToken(token);
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Get user's venue
    const venue = await getVenueByOwnerId(user.userId);
    if (!venue) {
      return NextResponse.json({ error: 'No venue found' }, { status: 404 });
    }

    // Get event
    const event = await getEventById(id);
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // Verify ownership
    if (event.venue_id !== venue.id) {
      return NextResponse.json(
        { error: 'Not authorized to update this event' },
        { status: 403 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const result = updateEventSchema.safeParse(body);

    if (!result.success) {
      const errors = result.error.issues.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      return NextResponse.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }

    const data = result.data;

    // Handle special actions
    if (data.action === 'publish') {
      const updatedEvent = await publishEvent(id);
      return NextResponse.json({
        event: updatedEvent,
        message: 'Event published successfully',
      });
    }

    if (data.action === 'unpublish') {
      const updatedEvent = await updateEvent(id, { status: 'draft' });
      return NextResponse.json({
        event: updatedEvent,
        message: 'Event unpublished',
      });
    }

    if (data.action === 'cancel') {
      const updatedEvent = await updateEvent(id, { status: 'cancelled' });
      return NextResponse.json({
        event: updatedEvent,
        message: 'Event cancelled',
      });
    }

    // Build update object
    const updates: Record<string, any> = {};

    if (data.title) updates.title = data.title;
    if (data.description) updates.description = data.description;
    if (data.category) updates.category = data.category;
    if (data.startDate) updates.start_date = data.startDate;
    if (data.startTime) updates.start_time = data.startTime;
    if (data.endDate !== undefined) updates.end_date = data.endDate || null;
    if (data.endTime !== undefined) updates.end_time = data.endTime || null;
    if (data.isRecurring !== undefined) updates.is_recurring = data.isRecurring;
    if (data.recurringPattern !== undefined) updates.recurrence_pattern = data.recurringPattern || null;
    if (data.recurringDays !== undefined) updates.recurrence_days = data.recurringDays || null;
    if (data.featuredImage) updates.featured_image = data.featuredImage;
    if (data.galleryImages !== undefined) updates.gallery = data.galleryImages || null;
    if (data.bookingUrl !== undefined) updates.booking_url = data.bookingUrl || null;
    if (data.ageRestriction !== undefined) updates.age_restriction = data.ageRestriction || null;
    if (data.dressCode !== undefined) updates.dress_code = data.dressCode || null;
    if (data.specialInstructions !== undefined) updates.special_instructions = data.specialInstructions || null;
    if (data.status) updates.status = data.status;

    // Handle tags
    if (data.tags !== undefined) {
      updates.tags = data.tags
        ? data.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
        : null;
    }

    // Handle price
    if (data.priceType !== undefined) {
      if (data.priceType === 'free') {
        updates.price = 'Free';
      } else if (data.priceType === 'paid' && data.price) {
        updates.price = `BD ${data.price}`;
      } else if (data.priceType === 'range' && data.priceMin && data.priceMax) {
        updates.price = `BD ${data.priceMin} - ${data.priceMax}`;
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No valid updates provided' },
        { status: 400 }
      );
    }

    updates.updated_at = new Date().toISOString();

    const updatedEvent = await updateEvent(id, updates);

    return NextResponse.json({
      event: updatedEvent,
      message: 'Event updated successfully',
    });
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    );
  }
}

// Delete event
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Verify authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await verifyToken(token);
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Get user's venue
    const venue = await getVenueByOwnerId(user.userId);
    if (!venue) {
      return NextResponse.json({ error: 'No venue found' }, { status: 404 });
    }

    // Get event
    const event = await getEventById(id);
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // Verify ownership
    if (event.venue_id !== venue.id) {
      return NextResponse.json(
        { error: 'Not authorized to delete this event' },
        { status: 403 }
      );
    }

    await deleteEvent(id);

    return NextResponse.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    );
  }
}
