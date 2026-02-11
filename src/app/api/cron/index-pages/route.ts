import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';
import { 
  requestBatchIndexing, 
  pingSitemap, 
  isIndexingConfigured,
  buildPageUrl 
} from '@/lib/google-indexing';

export const dynamic = 'force-dynamic';
export const maxDuration = 60; // Allow up to 60 seconds for batch processing

/**
 * Cron job to request indexing for recently published pages
 * 
 * Runs daily to catch any pages that didn't get indexed on publish
 * Also useful for re-indexing updated pages
 * 
 * Add to vercel.json:
 * { "path": "/api/cron/index-pages", "schedule": "0 4 * * *" }
 */
export async function GET() {
  try {
    // Check if API is configured
    if (!isIndexingConfigured()) {
      return NextResponse.json({
        success: false,
        message: 'Google Indexing API not configured',
      });
    }

    const supabase = getAdminClient();
    const urlsToIndex: string[] = [];

    // Get events published in the last 24 hours
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayISO = yesterday.toISOString();

    // Future events that are published
    const today = new Date().toISOString().split('T')[0];
    
    const { data: recentEvents } = await supabase
      .from('events')
      .select('slug')
      .eq('status', 'published')
      .eq('is_hidden', false)
      .gte('date', today) // Only future events
      .gte('updated_at', yesterdayISO)
      .limit(50) as { data: Array<{ slug: string }> | null };

    if (recentEvents) {
      recentEvents.forEach(event => {
        if (event.slug) {
          urlsToIndex.push(buildPageUrl(`/events/${event.slug}`));
        }
      });
    }

    // Get venues approved in the last 24 hours
    const { data: recentVenues } = await supabase
      .from('venues')
      .select('slug')
      .eq('status', 'approved')
      .eq('is_hidden', false)
      .gte('updated_at', yesterdayISO)
      .limit(50) as { data: Array<{ slug: string }> | null };

    if (recentVenues) {
      recentVenues.forEach(venue => {
        if (venue.slug) {
          urlsToIndex.push(buildPageUrl(`/places/${venue.slug}`));
        }
      });
    }

    // Get attractions updated in the last 24 hours
    const { data: recentAttractions } = await supabase
      .from('attractions')
      .select('slug')
      .eq('is_active', true)
      .gte('updated_at', yesterdayISO)
      .limit(50) as { data: Array<{ slug: string }> | null };

    if (recentAttractions) {
      recentAttractions.forEach(attraction => {
        if (attraction.slug) {
          urlsToIndex.push(buildPageUrl(`/attractions/${attraction.slug}`));
        }
      });
    }

    // Also add key static pages that should be frequently crawled
    const keyPages = [
      '/',
      '/events',
      '/cinema',
      '/places',
      '/attractions',
      '/guides',
    ];
    keyPages.forEach(page => urlsToIndex.push(buildPageUrl(page)));

    if (urlsToIndex.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No new pages to index',
        indexed: 0,
      });
    }

    // Request batch indexing (limit 100 per day is Google's limit)
    const uniqueUrls = [...new Set(urlsToIndex)].slice(0, 100);
    const result = await requestBatchIndexing(uniqueUrls);

    // Always ping sitemap
    await pingSitemap();

    return NextResponse.json({
      success: result.success,
      indexed: result.results.filter(r => r.success).length,
      failed: result.results.filter(r => !r.success).length,
      errors: result.errors,
      urls: uniqueUrls,
    });
  } catch (error) {
    console.error('Index pages cron error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
