import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const dynamic = 'force-dynamic';

// GET endpoint to check last scrape status from GitHub Actions
export async function GET() {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get latest scrape log from GitHub Actions (or any cinema scraper)
    const { data: latestLog, error: logError } = await supabase
      .from('agent_logs')
      .select('*')
      .or('agent_type.eq.cinema_scraper_github,agent_type.eq.cinema_scraper')
      .order('started_at', { ascending: false })
      .limit(1)
      .single();

    // Get count of now showing movies
    const { count: nowShowingCount } = await supabase
      .from('movies')
      .select('*', { count: 'exact', head: true })
      .eq('is_now_showing', true);

    // Get movies with their scraped sources
    const { data: scrapedMovies } = await supabase
      .from('movies')
      .select('title, scraped_from, last_scraped')
      .eq('is_now_showing', true)
      .not('scraped_from', 'is', null)
      .limit(50);

    return NextResponse.json({
      success: true,
      lastScrape: latestLog || null,
      nowShowingCount: nowShowingCount || 0,
      scrapedMovies: scrapedMovies || [],
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
