import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// Category mapping for explore page
const exploreCategoryMapping: Record<string, string[]> = {
  hotels: ['hotel', 'resort', 'staycation'],
  spas: ['spa', 'wellness', 'massage', 'gym', 'salon'],
  shopping: ['shopping', 'market', 'mall', 'retail'],
  tours: ['tour', 'experience', 'adventure'],
  kids: ['kids', 'family', 'entertainment', 'waterpark'],
  community: ['community', 'charity', 'volunteer'],
};

// Get explore category for a venue
function getExploreCategory(venueCategory: string): string | null {
  for (const [exploreCategory, venueCategories] of Object.entries(exploreCategoryMapping)) {
    if (venueCategories.includes(venueCategory.toLowerCase())) {
      return exploreCategory;
    }
  }
  return null;
}

// Get all featured venues for explore page (public endpoint)
export async function GET() {
  try {
    // Get all featured and approved venues
    const { data: venues, error } = await supabaseAdmin
      .from('venues')
      .select('id, name, slug, category, area, logo_url, cover_image_url, like_count, description')
      .eq('status', 'approved')
      .eq('is_featured', true)
      .order('like_count', { ascending: false });

    if (error) {
      console.error('Error fetching featured venues:', error);
      return NextResponse.json({ error: 'Failed to fetch featured venues' }, { status: 500 });
    }

    // Group venues by explore category
    const featuredByCategory: Record<string, typeof venues> = {
      hotels: [],
      spas: [],
      shopping: [],
      tours: [],
      kids: [],
      community: [],
    };

    for (const venue of venues || []) {
      const exploreCategory = getExploreCategory(venue.category);
      if (exploreCategory && featuredByCategory[exploreCategory]) {
        featuredByCategory[exploreCategory].push(venue);
      }
    }

    // Return both the grouped venues and a flat list
    return NextResponse.json({
      byCategory: featuredByCategory,
      all: venues || [],
    });
  } catch (error) {
    console.error('Error in explore featured API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
