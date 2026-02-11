import { NextRequest, NextResponse } from 'next/server';
import { 
  indexEventPage, 
  indexVenuePage, 
  indexAttractionPage,
  pingSitemap,
  isIndexingConfigured 
} from '@/lib/google-indexing';

/**
 * Webhook endpoint for automatic indexing
 * Called when pages are created/updated
 * 
 * POST /api/webhooks/index-page
 * Body: { type: 'event' | 'venue' | 'attraction', slug: string }
 * 
 * Can be triggered from:
 * - Supabase database webhooks
 * - Admin panel after publishing
 * - Cron jobs for batch updates
 */
export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret (optional but recommended)
    const webhookSecret = process.env.INDEXING_WEBHOOK_SECRET;
    if (webhookSecret) {
      const authHeader = request.headers.get('authorization');
      if (authHeader !== `Bearer ${webhookSecret}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    if (!isIndexingConfigured()) {
      console.log('Google Indexing API not configured - webhook received but skipped');
      return NextResponse.json({ 
        success: false, 
        skipped: true,
        reason: 'API not configured' 
      });
    }

    const body = await request.json();
    const { type, slug, pingMap = true } = body;

    if (!type || !slug) {
      return NextResponse.json(
        { error: 'Missing type or slug' },
        { status: 400 }
      );
    }

    let result;
    switch (type) {
      case 'event':
        result = await indexEventPage(slug);
        break;
      case 'venue':
      case 'place':
        result = await indexVenuePage(slug);
        break;
      case 'attraction':
        result = await indexAttractionPage(slug);
        break;
      default:
        return NextResponse.json(
          { error: `Unknown type: ${type}. Use 'event', 'venue', or 'attraction'` },
          { status: 400 }
        );
    }

    // Ping sitemap after indexing
    if (pingMap) {
      await pingSitemap();
    }

    return NextResponse.json({
      success: result.success,
      type,
      slug,
      url: result.url,
      sitemapPinged: pingMap,
      error: result.error,
    });
  } catch (error) {
    console.error('Index webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
