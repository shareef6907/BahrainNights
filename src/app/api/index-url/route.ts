import { NextResponse } from 'next/server';
import { requestIndexing, isIndexingConfigured, buildPageUrl } from '@/lib/google-indexing';

export const dynamic = 'force-dynamic';

/**
 * Manual URL indexing endpoint
 * 
 * Use this to request immediate indexing of specific URLs
 * 
 * Example: POST /api/index-url
 * Body: { "url": "/artists" } or { "url": "https://www.bahrainnights.com/artists" }
 */
export async function POST(request: Request) {
  try {
    // Verify API key
    const apiKey = request.headers.get('x-api-key');
    const expectedKey = process.env.INDEXING_API_KEY;
    
    if (expectedKey && apiKey !== expectedKey) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!isIndexingConfigured()) {
      return NextResponse.json({
        success: false,
        error: 'Google Indexing API not configured',
      });
    }

    const body = await request.json();
    let url = body.url;

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // If it's a path, convert to full URL
    if (!url.startsWith('http')) {
      url = buildPageUrl(url);
    }

    const result = await requestIndexing(url, 'URL_UPDATED');

    return NextResponse.json({
      success: result.success,
      url: result.url,
      message: result.success 
        ? 'URL submitted for indexing' 
        : 'Failed to submit URL',
      error: result.error,
    });

  } catch (error) {
    console.error('Index URL error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

// GET endpoint to check status / test
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({
      configured: isIndexingConfigured(),
      usage: 'POST with { "url": "/path" } to request indexing',
      example: 'POST /api/index-url with body { "url": "/artists" }',
    });
  }

  // Convert GET to POST for convenience
  const fakeRequest = {
    headers: request.headers,
    json: async () => ({ url }),
  } as Request;

  return POST(fakeRequest);
}
