import { NextRequest, NextResponse } from 'next/server';
import { runSEOAgent } from '@/lib/agents/seoAgent';

// Vercel Cron configuration
export const dynamic = 'force-dynamic';
export const maxDuration = 300; // 5 minutes max

/**
 * Daily SEO Agent Cron Job
 * Runs at 6:00 AM Bahrain time (3:00 AM UTC)
 * Configured in vercel.json
 */
export async function GET(request: NextRequest) {
  // Verify cron secret for security
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  // Allow requests from Vercel Cron (they include a special header)
  const isVercelCron = request.headers.get('x-vercel-cron') === '1';

  // Also allow with correct authorization header for manual triggers
  const isAuthorized = cronSecret && authHeader === `Bearer ${cronSecret}`;

  if (!isVercelCron && !isAuthorized) {
    console.log('[SEO Cron] Unauthorized request attempted');
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  console.log('[SEO Cron] Starting SEO Agent run...');
  const startTime = Date.now();

  try {
    const result = await runSEOAgent();

    const response = {
      success: result.success,
      message: result.success
        ? `SEO optimization completed successfully in ${result.durationSeconds}s`
        : `SEO optimization completed with errors in ${result.durationSeconds}s`,
      stats: {
        pagesOptimized: result.pagesOptimized,
        keywordsChecked: result.keywordsChecked,
        sitemapUpdated: result.sitemapUpdated,
        duration: `${result.durationSeconds}s`
      },
      details: result.details,
      errors: result.errors.length > 0 ? result.errors : undefined,
      timestamp: new Date().toISOString()
    };

    console.log('[SEO Cron] Completed:', response.message);

    return NextResponse.json(response, {
      status: result.success ? 200 : 207 // 207 Multi-Status for partial success
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[SEO Cron] Failed:', errorMessage);

    return NextResponse.json(
      {
        success: false,
        error: 'SEO Agent failed',
        message: errorMessage,
        duration: `${Math.round((Date.now() - startTime) / 1000)}s`,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

/**
 * Manual trigger endpoint (POST)
 * For admin dashboard manual runs
 */
export async function POST(request: NextRequest) {
  // Verify admin authorization
  const authHeader = request.headers.get('authorization');
  const adminSecret = process.env.ADMIN_API_SECRET || process.env.CRON_SECRET;

  if (!adminSecret || authHeader !== `Bearer ${adminSecret}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  console.log('[SEO Cron] Manual trigger from admin...');

  try {
    const result = await runSEOAgent();

    return NextResponse.json({
      success: result.success,
      message: result.success
        ? 'SEO optimization completed successfully'
        : 'SEO optimization completed with some errors',
      stats: {
        pagesOptimized: result.pagesOptimized,
        keywordsChecked: result.keywordsChecked,
        sitemapUpdated: result.sitemapUpdated,
        duration: `${result.durationSeconds}s`
      },
      details: result.details,
      errors: result.errors.length > 0 ? result.errors : undefined,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[SEO Cron] Manual trigger failed:', errorMessage);

    return NextResponse.json(
      {
        success: false,
        error: 'SEO Agent failed',
        message: errorMessage,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
