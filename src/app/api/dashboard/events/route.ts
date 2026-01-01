import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getEventsByVenue, createEvent, countEventsByStatus } from '@/lib/db/events';
import { getVenueByOwnerId } from '@/lib/db/venues';
import { cookies } from 'next/headers';
import { z } from 'zod';

// Validation schema for creating events
const createEventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(1, 'Category is required'),
  tags: z.string().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endDate: z.string().optional(),
  endTime: z.string().optional(),
  isRecurring: z.boolean().optional(),
  recurringPattern: z.string().optional(),
  recurringDays: z.array(z.string()).optional(),
  priceType: z.enum(['free', 'paid', 'range']),
  price: z.string().optional(),
  priceMin: z.string().optional(),
  priceMax: z.string().optional(),
  bookingUrl: z.string().optional(),
  bookingMethod: z.string().optional(),
  featuredImage: z.string().min(1, 'Featured image is required'),
  galleryImages: z.array(z.string()).optional(),
  ageRestriction: z.string().optional(),
  dressCode: z.string().optional(),
  specialInstructions: z.string().optional(),
  status: z.enum(['draft', 'published']).optional(),
});

// Get venue's events
export async function GET(request: NextRequest) {
  try {
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

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;

    // Get events
    const events = await getEventsByVenue(venue.id, status as any);

    return NextResponse.json({
      events,
      venue: {
        id: venue.id,
        name: venue.name,
        status: venue.status,
      },
    });
  } catch (error) {
    console.error('Error fetching venue events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

// Create new event
export async function POST(request: NextRequest) {
  try {
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

    // Check venue is approved
    if (venue.status !== 'approved') {
      return NextResponse.json(
        { error: 'Venue must be approved to create events' },
        { status: 403 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const result = createEventSchema.safeParse(body);

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

    // Generate slug
    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') +
      '-' +
      Date.now().toString(36);

    // Parse price
    let priceRange: string | null = null;
    if (data.priceType === 'free') {
      priceRange = 'Free';
    } else if (data.priceType === 'paid' && data.price) {
      priceRange = `BD ${data.price}`;
    } else if (data.priceType === 'range' && data.priceMin && data.priceMax) {
      priceRange = `BD ${data.priceMin} - ${data.priceMax}`;
    }

    // Parse tags
    const tags = data.tags
      ? data.tags.split(',').map((t) => t.trim()).filter(Boolean)
      : [];

    // Create event
    const event = await createEvent({
      venue_id: venue.id,
      title: data.title,
      slug,
      description: data.description,
      category: data.category,
      tags,
      start_date: data.startDate,
      end_date: data.endDate || null,
      start_time: data.startTime,
      end_time: data.endTime || null,
      is_recurring: data.isRecurring || false,
      recurrence_pattern: data.recurringPattern || null,
      recurrence_days: data.recurringDays || null,
      price: priceRange,
      booking_url: data.bookingUrl || null,
      featured_image: data.featuredImage || null,
      gallery: data.galleryImages || null,
      age_restriction: data.ageRestriction || null,
      dress_code: data.dressCode || null,
      special_instructions: data.specialInstructions || null,
      status: data.status || 'draft',
    });

    return NextResponse.json(
      { event, message: 'Event created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}
