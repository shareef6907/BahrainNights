import { Suspense } from 'react';
import { createClient } from '@supabase/supabase-js';
import ToursPageClient, { Tour } from '@/components/tours/ToursPageClient';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Create Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Fetch tours
async function getTours(): Promise<Tour[]> {
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  const { data, error } = await supabase
    .from('tours')
    .select(`
      *,
      tour_providers (
        id,
        name,
        slug,
        logo_url,
        is_verified,
        rating,
        review_count
      )
    `)
    .eq('is_active', true)
    .order('is_featured', { ascending: false })
    .order('tripadvisor_rating', { ascending: false, nullsFirst: false })
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching tours:', error);
    return [];
  }

  if (!data || data.length === 0) {
    return [];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((tour: any) => ({
    id: tour.id,
    name: tour.name,
    slug: tour.slug || tour.id,
    description: tour.description || '',
    shortDescription: tour.short_description || tour.description?.substring(0, 150) + '...' || '',
    tourType: tour.tour_type || 'Day Tours',
    category: tour.category || 'Day Tours',
    duration: tour.duration || '2-4 hours',
    durationHours: tour.duration_hours || null,
    groupSize: tour.group_size || 'Small group',
    maxParticipants: tour.max_participants || null,
    languages: tour.languages || ['English'],
    image: tour.image_url || 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=500&fit=crop',
    priceFrom: tour.price_from || null,
    pricePer: tour.price_per || 'person',
    currency: tour.currency || 'BHD',
    includes: tour.includes || [],
    highlights: tour.highlights || [],
    areasCovered: tour.areas_covered || [],
    suitableFor: tour.suitable_for || [],
    difficultyLevel: tour.difficulty_level || 'Easy',
    rating: tour.tripadvisor_rating || tour.rating || null,
    reviewCount: tour.tripadvisor_reviews || tour.review_count || 0,
    tripadvisorUrl: tour.tripadvisor_url || null,
    isFeatured: tour.is_featured || false,
    provider: tour.tour_providers ? {
      id: tour.tour_providers.id,
      name: tour.tour_providers.name,
      slug: tour.tour_providers.slug,
      logo: tour.tour_providers.logo_url,
      isVerified: tour.tour_providers.is_verified,
      rating: tour.tour_providers.rating,
      reviewCount: tour.tour_providers.review_count,
    } : tour.provider_name ? {
      name: tour.provider_name,
    } : null,
  }));
}

// Server Component
export default async function ToursPage() {
  const tours = await getTours();

  return (
    <Suspense fallback={null}>
      <ToursPageClient initialTours={tours} />
    </Suspense>
  );
}

// Metadata for SEO
export const metadata = {
  title: 'Tours & Experiences in Bahrain - Cultural, Desert Safari, Food Tours',
  description: 'Book the best tours and experiences in Bahrain. Cultural tours, desert safaris, food tours, boat trips, and private guided experiences with local experts.',
  keywords: ['Bahrain tours', 'desert safari Bahrain', 'cultural tours Bahrain', 'food tours Bahrain', 'local guides Bahrain', 'private tours Bahrain', 'things to do Bahrain'],
  openGraph: {
    title: 'Tours & Experiences in Bahrain | BahrainNights',
    description: 'Discover Bahrain with expert local guides. Cultural tours, desert safaris, food experiences, and more.',
    url: 'https://bahrainnights.com/tours',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Tours in Bahrain',
      },
    ],
  },
  alternates: {
    canonical: 'https://bahrainnights.com/tours',
  },
};
