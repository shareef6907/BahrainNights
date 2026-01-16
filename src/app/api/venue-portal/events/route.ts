import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { getAdminClient } from '@/lib/supabase/server';
import { sendEventSubmissionEmail } from '@/lib/email';

interface VenueBasicData {
  name: string;
  slug: string;
  email: string;
}

const VENUE_SESSION_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'venue-portal-secret-key-min-32-chars!'
);

async function getVenueFromSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('venue_session')?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, VENUE_SESSION_SECRET);
    if (payload.type !== 'venue' || !payload.venueId) {
      return null;
    }
    return payload.venueId as string;
  } catch {
    return null;
  }
}

function generateSlug(title: string): string {
  // Transliterate common accented characters to ASCII
  const transliterations: Record<string, string> = {
    'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a', 'æ': 'ae',
    'ç': 'c', 'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e',
    'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',
    'ñ': 'n', 'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o', 'ø': 'o',
    'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u', 'ý': 'y', 'ÿ': 'y',
    'ß': 'ss', 'œ': 'oe',
  };

  let slug = title.toLowerCase();
  for (const [char, replacement] of Object.entries(transliterations)) {
    slug = slug.replace(new RegExp(char, 'g'), replacement);
  }

  slug = slug
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .substring(0, 100);

  if (!slug) {
    slug = 'event-' + Date.now().toString(36);
  }

  return slug;
}

export async function GET() {
  try {
    const venueId = await getVenueFromSession();
    if (!venueId) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Get venue name first since events table doesn't have venue_id
    const supabase = getAdminClient();
    const { data: venueData } = await supabase
      .from('venues')
      .select('name')
      .eq('id', venueId)
      .single();

    const venue = venueData as { name: string } | null;

    if (!venue) {
      return NextResponse.json({ events: [] });
    }

    // Filter events by venue_name (events table uses venue_name, not venue_id)
    const { data: events, error } = await supabase
      .from('events')
      .select('id, title, slug, status, start_date, end_date, start_time, category, featured_image, is_recurring, recurrence_pattern, recurrence_days, promotion_start_date, promotion_end_date')
      .eq('venue_name', venue.name)
      .order('start_date', { ascending: false });

    if (error) {
      console.error('Get events error:', error);
      return NextResponse.json(
        { error: 'Failed to get events' },
        { status: 500 }
      );
    }

    return NextResponse.json({ events: events || [] });
  } catch (error) {
    console.error('Get events error:', error);
    return NextResponse.json(
      { error: 'Failed to get events' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const venueId = await getVenueFromSession();
    if (!venueId) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Validation
    if (!body.title || !body.title.trim()) {
      return NextResponse.json(
        { error: 'Event title is required' },
        { status: 400 }
      );
    }

    if (!body.start_date) {
      return NextResponse.json(
        { error: 'Start date is required' },
        { status: 400 }
      );
    }

    if (!body.category) {
      return NextResponse.json(
        { error: 'Category is required' },
        { status: 400 }
      );
    }

    // Get venue info
    const supabase = getAdminClient();
    const { data: venueData } = await supabase
      .from('venues')
      .select('name, slug, email')
      .eq('id', venueId)
      .single();

    const venue = venueData as VenueBasicData | null;

    if (!venue) {
      return NextResponse.json(
        { error: 'Venue not found' },
        { status: 404 }
      );
    }

    // Generate unique slug
    const baseSlug = generateSlug(body.title);
    const timestamp = Date.now().toString(36);
    const slug = `${baseSlug}-${timestamp}`;

    // Create event with correct database column names
    // Based on actual DB schema: has both 'date' (required) and 'start_date' columns
    const eventData = {
      venue_name: venue.name,
      venue_id: venueId,
      title: body.title.trim(),
      slug,
      description: body.description?.trim() || '',
      category: body.category,
      date: body.start_date, // Required legacy column
      start_date: body.start_date,
      end_date: body.end_date || null,
      start_time: body.start_time || null,
      end_time: body.end_time || null,
      booking_url: body.booking_url || null,
      google_maps_link: body.google_maps_link || null,
      featured_image: body.featured_image || null,
      status: 'pending',
      is_featured: false,
      views: 0,
      view_count: 0,
      // Recurrence fields
      is_recurring: body.is_recurring || false,
      recurrence_pattern: body.recurrence_pattern || null,
      recurrence_days: body.recurrence_days || null,
      promotion_start_date: body.promotion_start_date || null,
      promotion_end_date: body.promotion_end_date || null,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: event, error } = await (supabase
      .from('events') as any)
      .insert(eventData)
      .select()
      .single();

    if (error) {
      console.error('Create event error:', error.message, error.details, error.hint);
      return NextResponse.json(
        { error: 'Failed to create event: ' + error.message },
        { status: 500 }
      );
    }

    // Send event submission confirmation email
    let emailSent = false;
    if (venue.email) {
      try {
        const emailResult = await sendEventSubmissionEmail(
          venue.email,
          body.title.trim(),
          venue.name
        );
        emailSent = emailResult.success;
        if (!emailSent) {
          console.error('Failed to send event submission email:', emailResult.error);
        }
      } catch (emailError) {
        console.error('Error sending event submission email:', emailError);
      }
    }

    return NextResponse.json({
      success: true,
      event,
      emailSent,
    });
  } catch (error) {
    console.error('Create event error:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}
