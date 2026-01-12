import { NextRequest, NextResponse } from 'next/server';
import { runDiscoveryAgent } from '@/lib/agents/discovery';

// Vercel Cron configuration
export const dynamic = 'force-dynamic';
export const maxDuration = 300; // 5 minutes max

// =====================================================
// TEMPORARILY DISABLED - Event scraper is disabled
// To re-enable: Remove the SCRAPER_DISABLED check below
// =====================================================
const SCRAPER_DISABLED = true;

/**
 * Daily Discovery Agent Cron Job
 * Runs at 5:00 AM Bahrain time (2:00 AM UTC)
 * Configured in vercel.json
 */
export async function GET(request: NextRequest) {
  // TEMPORARILY DISABLED
  if (SCRAPER_DISABLED) {
    console.log('[Discovery Cron] DISABLED - Event scraper is temporarily disabled');
    return NextResponse.json({
      success: false,
      message: 'Event scraper temporarily disabled',
      disabled: true,
      timestamp: new Date().toISOString()
    }, { status: 200 });
  }
  // Verify cron secret for security
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  // Allow requests from Vercel Cron (they include a special header)
  const isVercelCron = request.headers.get('x-vercel-cron') === '1';

  // Also allow with correct authorization header for manual triggers
  const isAuthorized = cronSecret && authHeader === `Bearer ${cronSecret}`;

  if (!isVercelCron && !isAuthorized) {
    console.log('[Discovery Cron] Unauthorized request attempted');
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  console.log('[Discovery Cron] Starting Discovery Agent run...');
  const startTime = Date.now();

  try {
    const result = await runDiscoveryAgent();

    const durationSeconds = Math.round((Date.now() - startTime) / 1000);

    const response = {
      success: result.success,
      message: result.success
        ? `Discovery completed successfully in ${durationSeconds}s`
        : `Discovery completed with errors in ${durationSeconds}s`,
      stats: {
        discovered: result.totalDiscovered,
        duplicates: result.totalDuplicates,
        duration: `${durationSeconds}s`
      },
      errors: result.errors.length > 0 ? result.errors : undefined,
      logId: result.logId,
      timestamp: new Date().toISOString()
    };

    console.log('[Discovery Cron] Completed:', response.message);

    return NextResponse.json(response, {
      status: result.success ? 200 : 207 // 207 Multi-Status for partial success
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[Discovery Cron] Failed:', errorMessage);

    return NextResponse.json(
      {
        success: false,
        error: 'Discovery Agent failed',
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
  // TEMPORARILY DISABLED
  if (SCRAPER_DISABLED) {
    console.log('[Discovery Cron] DISABLED - Manual trigger blocked, scraper is disabled');
    return NextResponse.json({
      success: false,
      message: 'Event scraper temporarily disabled',
      disabled: true,
      timestamp: new Date().toISOString()
    }, { status: 200 });
  }

  // Verify admin authorization
  const authHeader = request.headers.get('authorization');
  const adminSecret = process.env.ADMIN_API_SECRET || process.env.CRON_SECRET;

  if (!adminSecret || authHeader !== `Bearer ${adminSecret}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  console.log('[Discovery Cron] Manual trigger from admin...');
  const startTime = Date.now();

  try {
    const result = await runDiscoveryAgent();

    const durationSeconds = Math.round((Date.now() - startTime) / 1000);

    return NextResponse.json({
      success: result.success,
      message: result.success
        ? 'Discovery completed successfully'
        : 'Discovery completed with some errors',
      stats: {
        discovered: result.totalDiscovered,
        duplicates: result.totalDuplicates,
        duration: `${durationSeconds}s`
      },
      errors: result.errors.length > 0 ? result.errors : undefined,
      logId: result.logId,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[Discovery Cron] Manual trigger failed:', errorMessage);

    return NextResponse.json(
      {
        success: false,
        error: 'Discovery Agent failed',
        message: errorMessage,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
