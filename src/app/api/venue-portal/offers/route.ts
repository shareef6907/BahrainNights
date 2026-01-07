import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { getAdminClient } from '@/lib/supabase/server';

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
    slug = 'offer-' + Date.now().toString(36);
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

    const supabase = getAdminClient();

    // Get offers for this venue
    const { data: offers, error } = await supabase
      .from('offers')
      .select('id, title, slug, status, offer_type, days_available, start_time, end_time, valid_until, is_ongoing, featured_image')
      .eq('venue_id', venueId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Get offers error:', error);
      return NextResponse.json(
        { error: 'Failed to get offers' },
        { status: 500 }
      );
    }

    return NextResponse.json({ offers: offers || [] });
  } catch (error) {
    console.error('Get offers error:', error);
    return NextResponse.json(
      { error: 'Failed to get offers' },
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
        { error: 'Offer title is required' },
        { status: 400 }
      );
    }

    if (!body.offer_type) {
      return NextResponse.json(
        { error: 'Offer type is required' },
        { status: 400 }
      );
    }

    if (!body.days_available || body.days_available.length === 0) {
      return NextResponse.json(
        { error: 'At least one day must be selected' },
        { status: 400 }
      );
    }

    if (!body.start_time || !body.end_time) {
      return NextResponse.json(
        { error: 'Start and end times are required' },
        { status: 400 }
      );
    }

    const supabase = getAdminClient();

    // Generate unique slug
    const baseSlug = generateSlug(body.title);
    const timestamp = Date.now().toString(36);
    const slug = `${baseSlug}-${timestamp}`;

    // Create offer
    const offerData = {
      venue_id: venueId,
      title: body.title.trim(),
      slug,
      description: body.description?.trim() || '',
      offer_type: body.offer_type,
      days_available: body.days_available,
      start_time: body.start_time,
      end_time: body.end_time,
      valid_from: body.valid_from || null,
      valid_until: body.valid_until || null,
      is_ongoing: body.is_ongoing ?? true,
      whats_included: body.whats_included || null,
      terms_conditions: body.terms_conditions || null,
      reservation_required: body.reservation_required ?? false,
      featured_image: body.featured_image || null,
      status: 'active', // Offers are immediately active
      view_count: 0,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: offer, error } = await (supabase
      .from('offers') as any)
      .insert(offerData)
      .select()
      .single();

    if (error) {
      console.error('Create offer error:', error.message, error.details, error.hint);
      return NextResponse.json(
        { error: 'Failed to create offer: ' + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      offer,
    });
  } catch (error) {
    console.error('Create offer error:', error);
    return NextResponse.json(
      { error: 'Failed to create offer' },
      { status: 500 }
    );
  }
}
