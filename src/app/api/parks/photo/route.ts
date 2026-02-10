import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY || process.env.GOOGLE_MAPS_API_KEY;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const reference = searchParams.get('reference');
  const maxwidth = searchParams.get('maxwidth') || '400';

  if (!reference) {
    return NextResponse.json(
      { error: 'Photo reference is required' },
      { status: 400 }
    );
  }

  if (!GOOGLE_PLACES_API_KEY) {
    return NextResponse.json(
      { error: 'Google Places API key not configured' },
      { status: 500 }
    );
  }

  try {
    // Fetch photo from Google Places Photo API
    const url = new URL('https://maps.googleapis.com/maps/api/place/photo');
    url.searchParams.set('photo_reference', reference);
    url.searchParams.set('maxwidth', maxwidth);
    url.searchParams.set('key', GOOGLE_PLACES_API_KEY);

    const response = await fetch(url.toString(), {
      redirect: 'follow',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch photo');
    }

    // Get the image data
    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/jpeg';

    // Return the image with appropriate headers
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400, s-maxage=86400', // Cache for 24 hours
      },
    });
  } catch (error) {
    console.error('Error fetching photo:', error);
    // Return a placeholder or redirect to a default image
    return NextResponse.redirect(
      new URL('/images/park-placeholder.jpg', request.url)
    );
  }
}
