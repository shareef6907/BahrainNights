import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

/**
 * Public API to get attractions
 * GET /api/attractions?category=Family%20%26%20Kids&area=Manama&featured=true&limit=20
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const area = searchParams.get('area');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const priceRange = searchParams.get('priceRange');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = supabaseAdmin
      .from('attractions')
      .select('*', { count: 'exact' })
      .eq('is_active', true)
      .order('display_order', { ascending: true })
      .order('tripadvisor_rating', { ascending: false, nullsFirst: false })
      .range(offset, offset + limit - 1);

    // Filter by category
    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    // Filter by area
    if (area && area !== 'all') {
      query = query.eq('area', area);
    }

    // Filter featured
    if (featured === 'true') {
      query = query.eq('is_featured', true);
    }

    // Filter by price range
    if (priceRange && priceRange !== 'all') {
      query = query.eq('price_range', priceRange);
    }

    // Search
    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%,tags.cs.{${search}}`);
    }

    const { data: attractions, error, count } = await query;

    if (error) {
      console.error('Attractions fetch error:', error);
      return NextResponse.json({
        attractions: [],
        total: 0,
        error: error.message,
      });
    }

    // Transform for frontend
    const transformedAttractions = (attractions || []).map(attraction => ({
      id: attraction.id,
      name: attraction.name,
      nameArabic: attraction.name_arabic,
      slug: attraction.slug,
      description: attraction.description || '',
      shortDescription: attraction.short_description || attraction.description?.substring(0, 150) + '...',
      category: attraction.category,
      area: attraction.area,
      address: attraction.address,
      image: attraction.image_url || 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=500&fit=crop',
      images: attraction.images || [],
      duration: attraction.duration || '1-2 hours',
      bestTime: attraction.best_time || 'Any time',
      priceRange: attraction.price_range || 'Contact for price',
      priceFrom: attraction.price_from,
      priceTo: attraction.price_to,
      suitableFor: attraction.suitable_for || [],
      tags: attraction.tags || [],
      rating: attraction.tripadvisor_rating || attraction.rating,
      reviewCount: attraction.tripadvisor_reviews || attraction.review_count || 0,
      tripadvisorUrl: attraction.tripadvisor_url,
      website: attraction.website,
      phone: attraction.phone,
      bookingUrl: attraction.booking_url,
      isFeatured: attraction.is_featured,
      googleMapsUrl: attraction.google_maps_url,
      latitude: attraction.latitude,
      longitude: attraction.longitude,
    }));

    return NextResponse.json({
      attractions: transformedAttractions,
      total: count || transformedAttractions.length,
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Attractions API error:', error);
    return NextResponse.json({
      attractions: [],
      total: 0,
      error: 'Server error',
    });
  }
}
