import { NextRequest, NextResponse } from 'next/server';
import { processParksResults } from '@/lib/parks/utils';
import { BAHRAIN_CENTER, VERIFIED_PARKS_WHITELIST } from '@/lib/parks/constants';

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY || process.env.GOOGLE_MAPS_API_KEY;

// Cache for directory (24 hours)
let directoryCache: { data: any; timestamp: number } | null = null;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

async function fetchAllParks(): Promise<any[]> {
  if (!GOOGLE_PLACES_API_KEY) {
    throw new Error('Google Places API key not configured');
  }

  const allResults: any[] = [];
  
  // Search queries to get comprehensive results
  const searchQueries = [
    'parks in Bahrain',
    'gardens in Bahrain',
    'public parks Bahrain',
    'playgrounds Bahrain',
  ];

  for (const query of searchQueries) {
    try {
      const url = new URL('https://maps.googleapis.com/maps/api/place/textsearch/json');
      url.searchParams.set('query', query);
      url.searchParams.set('region', 'bh');
      url.searchParams.set('key', GOOGLE_PLACES_API_KEY);

      const response = await fetch(url.toString());
      const data = await response.json();

      if (data.status === 'OK' && data.results) {
        allResults.push(...data.results);
        
        // Handle pagination if there's a next_page_token
        let nextPageToken = data.next_page_token;
        let pageCount = 0;
        const maxPages = 2; // Limit to avoid excessive API calls
        
        while (nextPageToken && pageCount < maxPages) {
          // Google requires a short delay before using next_page_token
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          const nextUrl = new URL('https://maps.googleapis.com/maps/api/place/textsearch/json');
          nextUrl.searchParams.set('pagetoken', nextPageToken);
          nextUrl.searchParams.set('key', GOOGLE_PLACES_API_KEY);
          
          const nextResponse = await fetch(nextUrl.toString());
          const nextData = await nextResponse.json();
          
          if (nextData.status === 'OK' && nextData.results) {
            allResults.push(...nextData.results);
          }
          
          nextPageToken = nextData.next_page_token;
          pageCount++;
        }
      }
    } catch (error) {
      console.error(`Error fetching parks for query "${query}":`, error);
    }
  }

  // Also do a nearby search centered on Bahrain
  try {
    const nearbyUrl = new URL('https://maps.googleapis.com/maps/api/place/nearbysearch/json');
    nearbyUrl.searchParams.set('location', `${BAHRAIN_CENTER.lat},${BAHRAIN_CENTER.lng}`);
    nearbyUrl.searchParams.set('radius', '50000'); // 50km covers all of Bahrain
    nearbyUrl.searchParams.set('type', 'park');
    nearbyUrl.searchParams.set('key', GOOGLE_PLACES_API_KEY);

    const nearbyResponse = await fetch(nearbyUrl.toString());
    const nearbyData = await nearbyResponse.json();

    if (nearbyData.status === 'OK' && nearbyData.results) {
      allResults.push(...nearbyData.results);
    }
  } catch (error) {
    console.error('Error fetching nearby parks:', error);
  }

  // Remove duplicates by place_id
  const uniqueResults = Array.from(
    new Map(allResults.map(item => [item.place_id, item])).values()
  );

  return uniqueResults;
}

export async function GET(request: NextRequest) {
  // Check cache
  if (directoryCache && Date.now() - directoryCache.timestamp < CACHE_DURATION) {
    return NextResponse.json({
      ...directoryCache.data,
      cached: true,
    });
  }

  if (!GOOGLE_PLACES_API_KEY) {
    return NextResponse.json(
      { error: 'Google Places API key not configured' },
      { status: 500 }
    );
  }

  try {
    // Fetch all parks
    const allResults = await fetchAllParks();

    // Process and filter results
    const filteredParks = processParksResults(allResults);

    // Separate verified and unverified parks
    const verifiedParks = filteredParks.filter(p => p.isVerified || p.isWhitelisted);
    const unverifiedParks = filteredParks.filter(p => !p.isVerified && !p.isWhitelisted);

    // Sort by rating
    verifiedParks.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    unverifiedParks.sort((a, b) => (b.rating || 0) - (a.rating || 0));

    const responseData = {
      verifiedParks,
      unverifiedParks,
      totalRaw: allResults.length,
      totalFiltered: filteredParks.length,
      totalVerified: verifiedParks.length,
      totalUnverified: unverifiedParks.length,
      status: 'OK',
    };

    // Cache the results
    directoryCache = {
      data: responseData,
      timestamp: Date.now(),
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error fetching parks directory:', error);
    return NextResponse.json(
      { error: 'Failed to fetch parks directory' },
      { status: 500 }
    );
  }
}

// Allow cache invalidation via POST
export async function POST(request: NextRequest) {
  const body = await request.json();
  
  if (body.action === 'invalidate-cache') {
    directoryCache = null;
    return NextResponse.json({ success: true, message: 'Cache invalidated' });
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
}
