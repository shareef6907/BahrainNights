import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

// Map database offer_type to frontend type
function mapOfferType(dbType: string): string {
  const typeMap: Record<string, string> = {
    'ladies-night': 'ladies-night',
    'brunch': 'brunch',
    'happy-hour': 'happy-hour',
    'special-deal': 'special',
    'buy1get1': 'special',
    'buffet': 'brunch',
  };
  return typeMap[dbType] || 'special';
}

interface OfferWithVenue {
  id: string;
  title: string;
  slug: string;
  description: string;
  offer_type: string;
  days_available: string[];
  start_time: string;
  end_time: string;
  valid_from: string | null;
  valid_until: string | null;
  is_ongoing: boolean;
  whats_included: string[] | null;
  terms_conditions: string | null;
  reservation_required: boolean;
  featured_image: string | null;
  status: string;
  view_count: number;
  created_at: string;
  venue_id: string | null;
  venues: {
    id: string;
    name: string;
    slug: string;
    logo_url: string | null;
    cover_image_url: string | null;
    area: string | null;
    category: string | null;
  } | null;
}

export async function GET() {
  try {
    const supabase = getAdminClient();

    // Get all active offers with venue information
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase
      .from('offers') as any)
      .select(`
        id,
        title,
        slug,
        description,
        offer_type,
        days_available,
        start_time,
        end_time,
        valid_from,
        valid_until,
        is_ongoing,
        whats_included,
        terms_conditions,
        reservation_required,
        featured_image,
        status,
        view_count,
        created_at,
        venue_id,
        venues (
          id,
          name,
          slug,
          logo_url,
          cover_image_url,
          area,
          category
        )
      `)
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    const offers = data as OfferWithVenue[] | null;

    if (error) {
      console.error('Get offers error:', error);
      return NextResponse.json(
        { error: 'Failed to get offers' },
        { status: 500 }
      );
    }

    // Transform offers to match frontend structure
    const transformedOffers = (offers || []).map(offer => {
      const venue = offer.venues;

      // Parse time to readable format
      const formatTime = (time: string) => {
        if (!time) return '';
        const [hours, minutes] = time.split(':');
        const h = parseInt(hours);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const hour12 = h % 12 || 12;
        return `${hour12}:${minutes} ${ampm}`;
      };

      // Check if offer is new (created in last 7 days)
      const isNew = new Date(offer.created_at).getTime() > Date.now() - (7 * 24 * 60 * 60 * 1000);

      // Check if ending soon (valid_until is within 7 days)
      const isEndingSoon = offer.valid_until
        ? new Date(offer.valid_until).getTime() < Date.now() + (7 * 24 * 60 * 60 * 1000)
        : false;

      return {
        id: offer.id,
        title: offer.title,
        slug: offer.slug,
        venue: {
          id: venue?.id || '',
          name: venue?.name || 'Unknown Venue',
          slug: venue?.slug || '',
          logo: venue?.logo_url || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&h=100&fit=crop',
          image: offer.featured_image || venue?.cover_image_url || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=500&fit=crop',
          area: venue?.area || 'Bahrain',
          category: venue?.category || 'venue',
        },
        type: mapOfferType(offer.offer_type),
        description: offer.description || '',
        shortDescription: offer.description?.slice(0, 100) + '...' || '',
        days: offer.days_available || [],
        time: `${formatTime(offer.start_time)} - ${formatTime(offer.end_time)}`,
        validUntil: offer.is_ongoing ? undefined : offer.valid_until,
        terms: offer.terms_conditions ? offer.terms_conditions.split('\n').filter(Boolean) : [],
        highlights: offer.whats_included || [],
        isNew,
        isFeatured: offer.view_count > 10,
        isEndingSoon,
      };
    });

    return NextResponse.json({ offers: transformedOffers });
  } catch (error) {
    console.error('Get offers error:', error);
    return NextResponse.json(
      { error: 'Failed to get offers' },
      { status: 500 }
    );
  }
}
