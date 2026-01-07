import { NextRequest } from 'next/server';
import scrapeMuktaCinema from '@/lib/agents/muktaScraper';

// Verify cron secret for security
const CRON_SECRET = process.env.CRON_SECRET || 'bahrainnights-mukta-cron-2024';

export const dynamic = 'force-dynamic';
export const maxDuration = 300; // 5 minutes max for scraping

export async function GET(request: NextRequest) {
  // Check authorization
  const authHeader = request.headers.get('authorization');
  const cronSecret = request.nextUrl.searchParams.get('secret');

  // Allow if correct secret is provided (via header or query param)
  if (authHeader !== `Bearer ${CRON_SECRET}` && cronSecret !== CRON_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  console.log('🎬 Mukta Cinema scraper triggered via API');

  try {
    const result = await scrapeMuktaCinema();

    return Response.json({
      success: result.success,
      message: result.success
        ? 'Mukta Cinema scraper completed successfully'
        : 'Scraper completed with errors',
      data: {
        moviesFound: result.moviesFound,
        moviesUpdated: result.moviesUpdated,
        comingSoonCount: result.comingSoonCount,
        nowShowingCount: result.nowShowingCount,
        comingSoonTitles: result.comingSoonTitles,
        nowShowingTitles: result.nowShowingTitles,
      },
      errors: result.errors,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Mukta scraper API error:', error);
    return Response.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}

// Also allow POST for manual triggers
export async function POST(request: NextRequest) {
  return GET(request);
}
