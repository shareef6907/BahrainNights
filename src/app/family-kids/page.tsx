import { Suspense } from 'react';
import { createClient } from '@supabase/supabase-js';
import FamilyKidsPageClient, { Attraction } from '@/components/attractions/FamilyKidsPageClient';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Create Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Fetch family-friendly attractions
async function getAttractions(): Promise<Attraction[]> {
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  const { data, error } = await supabase
    .from('attractions')
    .select('*')
    .eq('is_active', true)
    .eq('category', 'Family & Kids')
    .order('is_featured', { ascending: false })
    .order('tripadvisor_rating', { ascending: false, nullsFirst: false })
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching attractions:', error);
    return [];
  }

  if (!data || data.length === 0) {
    return [];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((attraction: any) => ({
    id: attraction.id,
    name: attraction.name,
    slug: attraction.slug || attraction.id,
    description: attraction.description || '',
    shortDescription: attraction.short_description || attraction.description?.substring(0, 150) + '...' || '',
    category: attraction.category || 'Family & Kids',
    area: attraction.area || 'Bahrain',
    image: attraction.image_url || 'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=800&h=500&fit=crop',
    duration: attraction.duration || '1-2 hours',
    bestTime: attraction.best_time || 'Any time',
    priceRange: attraction.price_range || 'Contact for price',
    priceFrom: attraction.price_from || null,
    suitableFor: attraction.suitable_for || ['families', 'kids'],
    tags: attraction.tags || [],
    rating: attraction.tripadvisor_rating || attraction.rating || null,
    reviewCount: attraction.tripadvisor_reviews || attraction.review_count || 0,
    tripadvisorUrl: attraction.tripadvisor_url || null,
    website: attraction.website || null,
    phone: attraction.phone || null,
    bookingUrl: attraction.booking_url || null,
    isFeatured: attraction.is_featured || false,
  }));
}

// Server Component
export default async function FamilyKidsPage() {
  const attractions = await getAttractions();

  return (
    <Suspense fallback={null}>
      <FamilyKidsPageClient initialAttractions={attractions} />
    </Suspense>
  );
}

// Metadata for SEO
export const metadata = {
  title: 'Family & Kids Activities in Bahrain - Best Family-Friendly Attractions',
  description: 'Discover the best family-friendly attractions, activities, and things to do with kids in Bahrain. From water parks to museums, find perfect family outings.',
  keywords: ['family activities Bahrain', 'things to do with kids Bahrain', 'family attractions Bahrain', 'kids activities Bahrain', 'water parks Bahrain', 'family fun Bahrain'],
  openGraph: {
    title: 'Family & Kids Activities in Bahrain | BahrainNights',
    description: 'Discover the best family-friendly attractions and activities in Bahrain. Perfect for parents looking for fun things to do with kids.',
    url: 'https://bahrainnights.com/family-kids',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Family Fun in Bahrain',
      },
    ],
  },
  alternates: {
    canonical: 'https://bahrainnights.com/family-kids',
  },
};
