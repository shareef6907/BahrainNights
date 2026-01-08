import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { getAdminClient } from '@/lib/supabase/server';
import { extractCoordinatesFromGoogleMapsUrl } from '@/lib/utils';

interface OpeningHoursDay {
  open: string;
  close: string;
}

interface OpeningHours {
  sunday?: OpeningHoursDay | 'closed';
  monday?: OpeningHoursDay | 'closed';
  tuesday?: OpeningHoursDay | 'closed';
  wednesday?: OpeningHoursDay | 'closed';
  thursday?: OpeningHoursDay | 'closed';
  friday?: OpeningHoursDay | 'closed';
  saturday?: OpeningHoursDay | 'closed';
}

interface VenueProfileData {
  id: string;
  name: string;
  slug: string;
  email: string;
  description: string | null;
  description_ar: string | null;
  phone: string | null;
  address: string | null;
  area: string | null;
  website: string | null;
  whatsapp: string | null;
  instagram: string | null;
  facebook: string | null;
  tiktok: string | null;
  twitter: string | null;
  menu_url: string | null;
  booking_url: string | null;
  opening_hours: OpeningHours | string | null;
  cuisine_types: string[] | null;
  subcategories: string[] | null;
  features: string[] | null;
  logo_url: string | null;
  cover_image_url: string | null;
  gallery: string[] | null;
  latitude: number | null;
  longitude: number | null;
  google_maps_url: string | null;
  price_range: number | null;
  avg_cost_per_person: string | null;
  status: string;
  password_hash?: string;
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
    const { data, error } = await supabase
      .from('venues')
      .select('*')
      .eq('id', venueId)
      .single();

    const venue = data as VenueProfileData | null;

    if (error || !venue) {
      return NextResponse.json(
        { error: 'Venue not found' },
        { status: 404 }
      );
    }

    // Remove sensitive fields
    const { password_hash: _password, ...safeVenue } = venue;

    return NextResponse.json({ venue: safeVenue });
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { error: 'Failed to get profile' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const venueId = await getVenueFromSession();
    if (!venueId) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Only allow updating certain fields
    // Note: must match actual database column names exactly (from database.ts)
    const allowedFields = [
      'description',
      'description_ar',
      'phone',
      'address',
      'area',
      'opening_hours',
      'instagram',
      'website',
      'whatsapp',
      'facebook',
      'tiktok',
      'twitter',
      'menu_url',
      'booking_url',
      'cuisine_types', // plural - matches database column
      'subcategories',
      'features',
      'logo_url',
      'cover_image_url',
      'gallery',
      'latitude',
      'longitude',
      'google_maps_url',
      'price_range',
      'avg_cost_per_person',
    ];

    const updates: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updates[field] = body[field];
      }
    }

    // Auto-extract coordinates from Google Maps URL if provided
    if (updates.google_maps_url && typeof updates.google_maps_url === 'string') {
      const coords = extractCoordinatesFromGoogleMapsUrl(updates.google_maps_url);
      if (coords) {
        // Only update coordinates if not explicitly provided
        if (updates.latitude === undefined) {
          updates.latitude = coords.latitude;
        }
        if (updates.longitude === undefined) {
          updates.longitude = coords.longitude;
        }
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      );
    }

    const supabase = getAdminClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase
      .from('venues') as any)
      .update(updates)
      .eq('id', venueId)
      .select()
      .single();

    const venue = data as VenueProfileData | null;

    if (error || !venue) {
      console.error('Update profile error:', error?.message, error?.details, error?.hint);
      return NextResponse.json(
        { error: 'Failed to update profile: ' + (error?.message || 'Unknown error') },
        { status: 500 }
      );
    }

    // Remove sensitive fields
    const { password_hash: _password, ...safeVenue } = venue;

    return NextResponse.json({
      success: true,
      venue: safeVenue,
    });
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
