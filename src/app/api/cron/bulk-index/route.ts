import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';
import { 
  requestBatchIndexing, 
  pingSitemap, 
  isIndexingConfigured,
} from '@/lib/google-indexing';

export const dynamic = 'force-dynamic';
export const maxDuration = 300; // 5 minutes for bulk processing

const SITEMAP_URL = 'https://www.bahrainnights.com/sitemap.xml';
const DAILY_LIMIT = 200; // Google's daily limit per property

/**
 * Bulk indexing cron job
 * 
 * Reads ALL URLs from sitemap.xml and submits them to Google Indexing API
 * Tracks submitted URLs in Supabase to avoid re-submitting
 * Runs daily until all pages are indexed
 * 
 * Add to vercel.json:
 * { "path": "/api/cron/bulk-index", "schedule": "0 2 * * *" }
 */
export async function GET(request: Request) {
  const startTime = Date.now();
  
  // Verify cron secret for security
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    // Also allow API key in query string for manual triggers
    const { searchParams } = new URL(request.url);
    const apiKey = searchParams.get('key');
    if (apiKey !== process.env.INDEXING_API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  if (!isIndexingConfigured()) {
    return NextResponse.json({
      success: false,
      error: 'Google Indexing API not configured. Set GOOGLE_INDEXING_CLIENT_EMAIL and GOOGLE_INDEXING_PRIVATE_KEY.',
      action: 'Please configure the Google Indexing API credentials in Vercel environment variables.',
    });
  }

  try {
    // Fetch sitemap
    const sitemapResponse = await fetch(SITEMAP_URL, { 
      next: { revalidate: 0 } // Always fetch fresh
    });
    
    if (!sitemapResponse.ok) {
      throw new Error(`Failed to fetch sitemap: ${sitemapResponse.status}`);
    }

    const sitemapXml = await sitemapResponse.text();
    
    // Parse URLs from sitemap
    const urlMatches = sitemapXml.match(/<loc>([^<]+)<\/loc>/g) || [];
    const allUrls = urlMatches.map(match => 
      match.replace('<loc>', '').replace('</loc>', '').trim()
    );

    console.log(`Found ${allUrls.length} URLs in sitemap`);

    // Get Supabase client for tracking
    const supabase = getAdminClient();
    
    // Get already submitted URLs from tracking table
    // Table may not exist yet - handle gracefully
    let submittedUrls = new Set<string>();
    try {
      const { data: submittedData, error } = await supabase
        .from('indexing_submissions')
        .select('url')
        .eq('status', 'submitted');
      
      if (!error && submittedData) {
        submittedUrls = new Set(submittedData.map((d: { url: string }) => d.url));
      }
    } catch {
      console.log('indexing_submissions table not yet created - will index all URLs');
    }
    
    // Filter to URLs not yet submitted
    const pendingUrls = allUrls.filter(url => !submittedUrls.has(url));
    
    console.log(`${pendingUrls.length} URLs pending submission (${submittedUrls.size} already submitted)`);

    if (pendingUrls.length === 0) {
      // All URLs submitted, ping sitemap and report
      await pingSitemap();
      
      return NextResponse.json({
        success: true,
        message: 'All sitemap URLs have been submitted for indexing!',
        stats: {
          totalUrls: allUrls.length,
          alreadySubmitted: submittedUrls.size,
          newlySubmitted: 0,
        },
        timeMs: Date.now() - startTime,
      });
    }

    // Submit up to DAILY_LIMIT URLs (in batches of 100)
    const urlsToSubmit = pendingUrls.slice(0, DAILY_LIMIT);
    const batches = [];
    
    for (let i = 0; i < urlsToSubmit.length; i += 100) {
      batches.push(urlsToSubmit.slice(i, i + 100));
    }

    let successCount = 0;
    let failCount = 0;
    const errors: string[] = [];

    for (const batch of batches) {
      const result = await requestBatchIndexing(batch, 'URL_UPDATED');
      
      for (const r of result.results) {
        if (r.success) {
          successCount++;
          // Track successful submission (ignore errors if table doesn't exist)
          try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await (supabase.from('indexing_submissions') as any).upsert({
              url: r.url,
              status: 'submitted',
              submitted_at: new Date().toISOString(),
            }, { onConflict: 'url' });
          } catch {
            // Table may not exist yet - continue anyway
          }
        } else {
          failCount++;
          if (r.error) {
            errors.push(`${r.url}: ${r.error}`);
          }
        }
      }
      
      // Small delay between batches to be nice to Google
      if (batches.indexOf(batch) < batches.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Also ping sitemap
    await pingSitemap();

    const remainingUrls = pendingUrls.length - urlsToSubmit.length;
    
    return NextResponse.json({
      success: true,
      message: remainingUrls > 0 
        ? `Submitted ${successCount} URLs. ${remainingUrls} remaining (will continue tomorrow due to daily limit).`
        : `Submitted ${successCount} URLs. All pages now submitted!`,
      stats: {
        totalUrls: allUrls.length,
        alreadySubmitted: submittedUrls.size,
        submittedToday: successCount,
        failed: failCount,
        remaining: remainingUrls,
        dailyLimit: DAILY_LIMIT,
      },
      errors: errors.length > 0 ? errors.slice(0, 10) : undefined, // Limit error output
      timeMs: Date.now() - startTime,
    });

  } catch (error) {
    console.error('Bulk indexing error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timeMs: Date.now() - startTime,
    }, { status: 500 });
  }
}

// Also support POST for manual triggers
export async function POST(request: Request) {
  return GET(request);
}
