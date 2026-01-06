import { Suspense } from 'react';
import { createClient } from '@supabase/supabase-js';
import ToursExploreClient from './ToursExploreClient';
import { ExploreItem } from '@/components/explore/ExploreGrid';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Create Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Fetch tours from database
async function getTours(): Promise<ExploreItem[]> {
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });

  const { data, error } = await supabase
    .from('tours')
    .select('*')
    .eq('is_active', true)
    .order('is_featured', { ascending: false })
    .order('tripadvisor_rating', { ascending: false, nullsFirst: false });

  if (error) {
    console.error('Error fetching tours:', error);
    return [];
  }

  if (!data || data.length === 0) {
    return [];
  }

  // Map database fields to ExploreItem interface
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((tour: any) => ({
    id: tour.id,
    name: tour.name,
    slug: tour.slug || tour.id,
    type: tour.tour_type || 'Day Tour',
    category: 'tours' as const,
    image: tour.image_url || 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
    area: tour.areas_covered?.[0] || tour.meeting_point || 'Bahrain',
    description: tour.short_description || tour.description?.substring(0, 150) || '',
    price: tour.price_from ? `BD ${tour.price_from}` : undefined,
    rating: tour.tripadvisor_rating || tour.rating || undefined,
    duration: tour.duration || undefined,
    features: tour.highlights || tour.includes || [],
    isFeatured: tour.is_featured || false,
  }));
}

// Server Component
export default async function ToursPage() {
  const tours = await getTours();

  return (
    <Suspense fallback={<ToursLoading />}>
      <ToursExploreClient initialTours={tours} />
    </Suspense>
  );
}

function ToursLoading() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
    </div>
  );
}

// Metadata for SEO
export const metadata = {
  title: 'Tours & Adventures in Bahrain - Explore Experiences',
  description: 'Discover amazing tours and adventures in Bahrain. Desert safaris, cultural tours, boat trips, food experiences, and more.',
};
