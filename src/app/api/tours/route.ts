import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

/**
 * Public API to get tours
 * GET /api/tours?type=Cultural&category=Day%20Tours&featured=true&limit=20
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tourType = searchParams.get('type');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const providerId = searchParams.get('providerId');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = supabaseAdmin
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
      `, { count: 'exact' })
      .eq('is_active', true)
      .order('display_order', { ascending: true })
      .order('tripadvisor_rating', { ascending: false, nullsFirst: false })
      .range(offset, offset + limit - 1);

    // Filter by tour type
    if (tourType && tourType !== 'all') {
      query = query.eq('tour_type', tourType);
    }

    // Filter by category
    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    // Filter featured
    if (featured === 'true') {
      query = query.eq('is_featured', true);
    }

    // Filter by provider
    if (providerId) {
      query = query.eq('provider_id', providerId);
    }

    // Filter by price range
    if (minPrice) {
      query = query.gte('price_from', parseFloat(minPrice));
    }
    if (maxPrice) {
      query = query.lte('price_from', parseFloat(maxPrice));
    }

    // Search
    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%,highlights.cs.{${search}}`);
    }

    const { data: tours, error, count } = await query;

    if (error) {
      console.error('Tours fetch error:', error);
      return NextResponse.json({
        tours: [],
        total: 0,
        error: error.message,
      });
    }

    // Transform for frontend
    const transformedTours = (tours || []).map(tour => ({
      id: tour.id,
      name: tour.name,
      nameArabic: tour.name_arabic,
      slug: tour.slug,
      description: tour.description || '',
      shortDescription: tour.short_description || tour.description?.substring(0, 150) + '...',
      tourType: tour.tour_type,
      category: tour.category,
      duration: tour.duration,
      durationHours: tour.duration_hours,
      groupSize: tour.group_size,
      maxParticipants: tour.max_participants,
      languages: tour.languages || ['English'],
      image: tour.image_url || 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=500&fit=crop',
      images: tour.images || [],
      priceFrom: tour.price_from,
      priceTo: tour.price_to,
      pricePer: tour.price_per || 'person',
      currency: tour.currency || 'BHD',
      includes: tour.includes || [],
      excludes: tour.excludes || [],
      highlights: tour.highlights || [],
      itinerary: tour.itinerary,
      meetingPoint: tour.meeting_point,
      endPoint: tour.end_point,
      areasCovered: tour.areas_covered || [],
      suitableFor: tour.suitable_for || [],
      difficultyLevel: tour.difficulty_level || 'Easy',
      rating: tour.tripadvisor_rating || tour.rating,
      reviewCount: tour.tripadvisor_reviews || tour.review_count || 0,
      tripadvisorUrl: tour.tripadvisor_url,
      isFeatured: tour.is_featured,
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

    return NextResponse.json({
      tours: transformedTours,
      total: count || transformedTours.length,
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Tours API error:', error);
    return NextResponse.json({
      tours: [],
      total: 0,
      error: 'Server error',
    });
  }
}
