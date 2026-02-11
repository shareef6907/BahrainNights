import { NextRequest, NextResponse } from 'next/server';
import { 
  requestIndexing, 
  requestBatchIndexing, 
  pingSitemap, 
  isIndexingConfigured,
  buildPageUrl 
} from '@/lib/google-indexing';

// POST /api/admin/indexing
// Request Google to index one or more URLs
export async function POST(request: NextRequest) {
  try {
    // Check if API is configured
    if (!isIndexingConfigured()) {
      return NextResponse.json(
        { 
          error: 'Google Indexing API not configured',
          message: 'Set GOOGLE_INDEXING_CLIENT_EMAIL and GOOGLE_INDEXING_PRIVATE_KEY environment variables'
        },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { urls, url, type = 'URL_UPDATED', pingSitemapAfter = true } = body;

    // Single URL
    if (url && !urls) {
      const fullUrl = url.startsWith('http') ? url : buildPageUrl(url);
      const result = await requestIndexing(fullUrl, type);
      
      // Optionally ping sitemap
      if (pingSitemapAfter) {
        await pingSitemap();
      }

      return NextResponse.json({
        success: result.success,
        result,
        sitemapPinged: pingSitemapAfter,
      });
    }

    // Multiple URLs (batch)
    if (urls && Array.isArray(urls)) {
      const fullUrls = urls.map((u: string) => 
        u.startsWith('http') ? u : buildPageUrl(u)
      );
      const result = await requestBatchIndexing(fullUrls, type);
      
      // Optionally ping sitemap
      if (pingSitemapAfter) {
        await pingSitemap();
      }

      return NextResponse.json({
        success: result.success,
        results: result.results,
        errors: result.errors,
        sitemapPinged: pingSitemapAfter,
      });
    }

    return NextResponse.json(
      { error: 'Missing url or urls parameter' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Indexing API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET /api/admin/indexing/status
// Check if indexing API is configured
export async function GET() {
  return NextResponse.json({
    configured: isIndexingConfigured(),
    message: isIndexingConfigured() 
      ? 'Google Indexing API is configured and ready'
      : 'Google Indexing API credentials not set. Add GOOGLE_INDEXING_CLIENT_EMAIL and GOOGLE_INDEXING_PRIVATE_KEY to environment variables.',
  });
}
