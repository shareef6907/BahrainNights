import { NextRequest, NextResponse } from 'next/server';
import { processParksResults, calculateDistance } from '@/lib/parks/utils';

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY || process.env.GOOGLE_MAPS_API_KEY;

// Simple in-memory cache (in production, use Redis or similar)
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour for nearby searches

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const radius = searchParams.get('radius') || '5000';

  if (!lat || !lng) {
    return NextResponse.json(
      { error: 'Latitude and longitude are required' },
      { status: 400 }
    );
  }

  if (!GOOGLE_PLACES_API_KEY) {
    return NextResponse.json(
      { error: 'Google Places API key not configured' },
      { status: 500 }
    );
  }

  // Check cache
  const cacheKey = `nearby:${lat}:${lng}:${radius}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    // Recalculate distances based on current location
    const parksWithDistance = cached.data.results.map((park: any) => ({
      ...park,
      distance: calculateDistance(
        parseFloat(lat),
        parseFloat(lng),
        park.geometry.location.lat,
        park.geometry.location.lng
      )
    })).sort((a: any, b: any) => (a.distance || 0) - (b.distance || 0));

    return NextResponse.json({
      results: parksWithDistance,
      status: 'OK',
      cached: true,
    });
  }

  try {
    // Search for parks using Google Places Nearby Search API
    const url = new URL('https://maps.googleapis.com/maps/api/place/nearbysearch/json');
    url.searchParams.set('location', `${lat},${lng}`);
    url.searchParams.set('radius', radius);
    url.searchParams.set('type', 'park');
    url.searchParams.set('key', GOOGLE_PLACES_API_KEY);

    const response = await fetch(url.toString());
    const data = await response.json();

    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      console.error('Google Places API error:', data.status, data.error_message);
      return NextResponse.json(
        { error: 'Failed to fetch parks from Google Places API', details: data.error_message },
        { status: 500 }
      );
    }

    // Process and filter results to remove false positives
    const filteredParks = processParksResults(data.results || []);

    // Calculate distance for each park and sort by nearest
    const parksWithDistance = filteredParks.map((park) => ({
      ...park,
      distance: calculateDistance(
        parseFloat(lat),
        parseFloat(lng),
        park.geometry.location.lat,
        park.geometry.location.lng
      )
    })).sort((a, b) => (a.distance || 0) - (b.distance || 0));

    // Cache the results (without distance, will be recalculated)
    cache.set(cacheKey, {
      data: { results: filteredParks },
      timestamp: Date.now(),
    });

    return NextResponse.json({
      results: parksWithDistance,
      status: data.status,
      totalRaw: data.results?.length || 0,
      totalFiltered: parksWithDistance.length,
    });
  } catch (error) {
    console.error('Error fetching nearby parks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch nearby parks' },
      { status: 500 }
    );
  }
}
