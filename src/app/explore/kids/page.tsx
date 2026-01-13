import { Suspense } from 'react';
import { createClient } from '@supabase/supabase-js';
import KidsExploreClient from './KidsExploreClient';
import { ExploreItem } from '@/components/explore/ExploreGrid';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Create Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Fetch kids/family attractions from database
async function getKidsAttractions(): Promise<ExploreItem[]> {
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });

  const { data, error } = await supabase
    .from('attractions')
    .select('*')
    .eq('is_active', true)
    .order('is_featured', { ascending: false })
    .order('tripadvisor_rating', { ascending: false, nullsFirst: false });

  if (error) {
    console.error('Error fetching attractions:', error);
    return [];
  }

  if (!data || data.length === 0) {
    return [];
  }

  // Map database fields to ExploreItem interface
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((attraction: any) => {
    // Derive age range from suitable_for array
    let ageRange = 'All Ages';
    const suitableFor = attraction.suitable_for || [];
    if (suitableFor.includes('kids')) {
      ageRange = 'Kids';
    } else if (suitableFor.includes('families')) {
      ageRange = 'All Ages';
    }

    // Derive type from category or subcategory
    let type = attraction.subcategory || attraction.category || 'Attraction';
    // Clean up type for display
    if (type === 'Family & Kids') {
      type = attraction.subcategory || 'Family Activity';
    }

    return {
      id: attraction.id,
      name: attraction.name,
      slug: attraction.slug || attraction.id,
      type: type,
      category: 'kids' as const,
      image: attraction.image_url || 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=800',
      area: attraction.area || 'Bahrain',
      description: attraction.short_description || attraction.description?.substring(0, 150) || '',
      price: attraction.price_from !== null && attraction.price_from !== undefined && attraction.price_from > 0
        ? `BD ${attraction.price_from}`
        : (attraction.price_range === 'Free' ? 'Free' : (attraction.price_range || undefined)),
      rating: attraction.tripadvisor_rating || attraction.rating || undefined,
      duration: attraction.duration || undefined,
      ageRange: ageRange,
      features: attraction.tags || [],
      isFeatured: attraction.is_featured || false,
    };
  });
}

// Server Component
export default async function KidsPage() {
  const kidsAttractions = await getKidsAttractions();

  return (
    <Suspense fallback={<KidsLoading />}>
      <KidsExploreClient initialKids={kidsAttractions} />
    </Suspense>
  );
}

function KidsLoading() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>
  );
}

// Metadata for SEO
export const metadata = {
  title: 'Family & Kids Activities in Bahrain - Fun for All Ages',
  description: 'Discover the best family-friendly attractions and kids activities in Bahrain. Waterparks, theme parks, museums, and more.',
};
