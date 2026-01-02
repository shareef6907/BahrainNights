import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { getAdminClient } from '@/lib/supabase/server';

interface VenueSessionData {
  id: string;
  name: string;
  slug: string;
  email: string;
  status: string;
  logo_url: string | null;
  cover_image_url: string | null;
  description: string | null;
  phone: string | null;
  address: string | null;
  area: string | null;
  category: string | null;
}

const VENUE_SESSION_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'venue-portal-secret-key-min-32-chars!'
);

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('venue_session')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Verify JWT
    const { payload } = await jwtVerify(token, VENUE_SESSION_SECRET);

    if (payload.type !== 'venue' || !payload.venueId) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 401 }
      );
    }

    // Get fresh venue data
    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from('venues')
      .select('id, name, slug, email, status, logo_url, cover_image_url, description, phone, address, area, category')
      .eq('id', payload.venueId)
      .single();

    const venue = data as VenueSessionData | null;

    if (error || !venue) {
      return NextResponse.json(
        { error: 'Venue not found' },
        { status: 404 }
      );
    }

    // Check if still approved
    if (venue.status !== 'approved') {
      // Clear session if venue is no longer approved
      cookieStore.delete('venue_session');
      return NextResponse.json(
        { error: 'Venue is no longer active' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      venue: {
        id: venue.id,
        name: venue.name,
        slug: venue.slug,
        email: venue.email,
        status: venue.status,
        logo_url: venue.logo_url,
        cover_image_url: venue.cover_image_url,
        description: venue.description,
        phone: venue.phone,
        address: venue.address,
        area: venue.area,
        category: venue.category,
      },
    });
  } catch (error) {
    console.error('Session verification error:', error);
    return NextResponse.json(
      { error: 'Invalid session' },
      { status: 401 }
    );
  }
}
