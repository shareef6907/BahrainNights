import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { BAHRAIN_PARKS } from '@/lib/parks/data';

// Calculate distance between two points (Haversine formula)
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// GET /api/parks - Get all active parks (public)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const governorate = searchParams.get('governorate');
  const sort = searchParams.get('sort') || 'rating';
  const userLat = searchParams.get('lat');
  const userLng = searchParams.get('lng');

  try {
    // Try to fetch from database first
    let query = supabaseAdmin
      .from('parks')
      .select('*')
      .eq('is_active', true);

    // Filter by governorate if specified
    if (governorate && governorate !== 'all') {
      query = query.eq('governorate', governorate);
    }

    const { data: dbParks, error } = await query;

    // If database query successful and has data, use it
    if (!error && dbParks && dbParks.length > 0) {
      let parks = dbParks.map(park => ({
        id: park.id,
        name: park.name,
        nameAr: park.name_arabic,
        description: park.description,
        area: park.address?.split(',')[0] || park.address,
        address: park.address,
        governorate: park.governorate,
        coordinates: {
          lat: parseFloat(park.latitude),
          lng: parseFloat(park.longitude),
        },
        features: park.features || [],
        rating: park.rating,
        reviewCount: park.total_reviews,
        image: park.image_url,
        openingHours: park.opening_hours,
        isVerified: park.is_verified,
        googleMapsUrl: park.google_maps_url,
        distance: undefined as number | undefined,
      }));

      // Calculate distance if user location provided
      if (userLat && userLng) {
        const lat = parseFloat(userLat);
        const lng = parseFloat(userLng);
        parks = parks.map(park => ({
          ...park,
          distance: calculateDistance(lat, lng, park.coordinates.lat, park.coordinates.lng),
        }));
      }

      // Sort
      switch (sort) {
        case 'distance':
          if (userLat && userLng) {
            parks.sort((a, b) => (a.distance ?? 999) - (b.distance ?? 999));
          }
          break;
        case 'rating':
          parks.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
          break;
        case 'reviews':
          parks.sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0));
          break;
        case 'name':
          parks.sort((a, b) => a.name.localeCompare(b.name));
          break;
      }

      return NextResponse.json({ 
        parks,
        source: 'database',
        count: parks.length,
      });
    }

    // Fallback to hardcoded data if database unavailable or empty
    console.log('Falling back to hardcoded parks data');
    
    let parks = BAHRAIN_PARKS.map(park => ({
      id: park.id,
      name: park.name,
      nameAr: park.nameAr,
      description: park.description,
      area: park.area,
      address: `${park.area}, Bahrain`,
      governorate: park.governorate,
      coordinates: park.coordinates,
      features: park.features,
      rating: park.rating,
      reviewCount: park.reviewCount,
      image: park.image,
      openingHours: park.openingHours,
      isVerified: park.isVerified,
      googleMapsUrl: `https://www.google.com/maps/search/${encodeURIComponent(park.name + ' Bahrain')}`,
      distance: undefined as number | undefined,
    }));

    // Filter by governorate
    if (governorate && governorate !== 'all') {
      parks = parks.filter(p => p.governorate === governorate);
    }

    // Calculate distance if user location provided
    if (userLat && userLng) {
      const lat = parseFloat(userLat);
      const lng = parseFloat(userLng);
      parks = parks.map(park => ({
        ...park,
        distance: calculateDistance(lat, lng, park.coordinates.lat, park.coordinates.lng),
      }));
    }

    // Sort
    switch (sort) {
      case 'distance':
        if (userLat && userLng) {
          parks.sort((a, b) => (a.distance ?? 999) - (b.distance ?? 999));
        }
        break;
      case 'rating':
        parks.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case 'reviews':
        parks.sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0));
        break;
      case 'name':
        parks.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return NextResponse.json({ 
      parks,
      source: 'hardcoded',
      count: parks.length,
    });
  } catch (error) {
    console.error('Error fetching parks:', error);
    
    // Final fallback - return hardcoded data
    return NextResponse.json({ 
      parks: BAHRAIN_PARKS.map(park => ({
        id: park.id,
        name: park.name,
        nameAr: park.nameAr,
        description: park.description,
        area: park.area,
        address: `${park.area}, Bahrain`,
        governorate: park.governorate,
        coordinates: park.coordinates,
        features: park.features,
        rating: park.rating,
        reviewCount: park.reviewCount,
        image: park.image,
        openingHours: park.openingHours,
        isVerified: park.isVerified,
        googleMapsUrl: `https://www.google.com/maps/search/${encodeURIComponent(park.name + ' Bahrain')}`,
      })),
      source: 'fallback',
      count: BAHRAIN_PARKS.length,
    });
  }
}
