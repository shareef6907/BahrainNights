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

// Fetch tours/attractions from database - only Platinum List sourced items
async function getTours(): Promise<ExploreItem[]> {
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });

  // Fetch from attractions table - only show Platinum List items with valid booking URLs
  const { data, error } = await supabase
    .from('attractions')
    .select('*')
    .eq('is_active', true)
    .eq('source', 'platinumlist')
    .not('booking_url', 'is', null)
    .order('is_featured', { ascending: false })
    .order('tripadvisor_rating', { ascending: false, nullsFirst: false });

  if (error) {
    console.error('Error fetching attractions for tours:', error);
    return [];
  }

  if (!data || data.length === 0) {
    return [];
  }

  // Map database fields to ExploreItem interface
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((attraction: any) => {
    // Derive type from category or subcategory
    let type = attraction.subcategory || attraction.category || 'Experience';
    if (type === 'Family & Kids') {
      type = attraction.subcategory || 'Activity';
    }

    return {
      id: attraction.id,
      name: attraction.name,
      slug: attraction.slug || attraction.id,
      type: type,
      category: 'tours' as const,
      image: attraction.image_url || 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
      area: attraction.area || 'Bahrain',
      description: attraction.short_description || attraction.description?.substring(0, 150) || '',
      price: attraction.price_from !== null && attraction.price_from !== undefined && attraction.price_from > 0
        ? `BD ${attraction.price_from}`
        : (attraction.price_range === 'Free' ? 'Free' : (attraction.price_range || undefined)),
      rating: attraction.tripadvisor_rating || attraction.rating || undefined,
      duration: attraction.duration || undefined,
      features: attraction.tags || [],
      isFeatured: attraction.is_featured || false,
    };
  });
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
  description: 'Discover amazing tours and adventures in Bahrain. Pearl diving, cultural tours, island boat trips, food experiences, and more.',
};
