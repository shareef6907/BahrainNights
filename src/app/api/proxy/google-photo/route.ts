import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const GOOGLE_PLACES_API_URL = 'https://maps.googleapis.com/maps/api/place/photo';

// Cache duration in seconds (1 hour)
const CACHE_DURATION = 3600;

// GET - Proxy Google Places photo
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const photoReference = searchParams.get('reference');
    const maxWidth = searchParams.get('maxwidth') || '400';

    if (!photoReference) {
      return NextResponse.json(
        { error: 'Missing photo reference' },
        { status: 400 }
      );
    }

    if (!GOOGLE_MAPS_API_KEY) {
      return NextResponse.json(
        { error: 'Google Maps API key not configured' },
        { status: 500 }
      );
    }

    // Build the Google Places Photo URL
    const googlePhotoUrl = new URL(GOOGLE_PLACES_API_URL);
    googlePhotoUrl.searchParams.set('photoreference', photoReference);
    googlePhotoUrl.searchParams.set('maxwidth', maxWidth);
    googlePhotoUrl.searchParams.set('key', GOOGLE_MAPS_API_KEY);

    // Fetch the image from Google
    const response = await fetch(googlePhotoUrl.toString(), {
      redirect: 'follow',
    });

    if (!response.ok) {
      console.error('Error fetching Google photo:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Failed to fetch photo' },
        { status: response.status }
      );
    }

    // Get the image data
    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/jpeg';

    // Return the image with caching headers
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': `public, max-age=${CACHE_DURATION}, s-maxage=${CACHE_DURATION}`,
        'CDN-Cache-Control': `public, max-age=${CACHE_DURATION}`,
      },
    });
  } catch (error) {
    console.error('Error proxying Google photo:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
