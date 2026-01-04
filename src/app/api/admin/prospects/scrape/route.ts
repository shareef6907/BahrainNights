import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Note: This endpoint triggers scraping. In production, the actual scraping
// is done via GitHub Actions cron job. This is for manual triggering.

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const source = body.source || 'all';

    // Log the scrape request
    const { data: log, error: logError } = await supabase
      .from('prospect_scrape_logs')
      .insert({
        source: source,
        status: 'pending',
        started_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (logError) {
      console.error('Error creating scrape log:', logError);
    }

    // In a real implementation, you would trigger the scraper here
    // For now, we'll return information about how to run it

    return NextResponse.json({
      message: 'Scrape job queued',
      log_id: log?.id,
      instructions: {
        manual: 'Run: npx ts-node scripts/scrapers/run-all.ts',
        automated: 'GitHub Actions runs daily at midnight',
        sources: ['facebook', 'instagram', 'google_ads', 'linkedin', 'news_sites'],
      },
    });
  } catch (error) {
    console.error('Scrape API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Get recent scrape logs
    const { data: logs, error } = await supabase
      .from('prospect_scrape_logs')
      .select('*')
      .order('started_at', { ascending: false })
      .limit(20);

    if (error) {
      console.error('Error fetching scrape logs:', error);
      return NextResponse.json({ error: 'Failed to fetch logs' }, { status: 500 });
    }

    // Get stats
    const { data: stats } = await supabase
      .from('prospect_scrape_logs')
      .select('source, status, prospects_found, new_prospects')
      .order('started_at', { ascending: false })
      .limit(100);

    const summary = {
      totalRuns: logs?.length || 0,
      lastRun: logs?.[0]?.started_at || null,
      bySource: {} as Record<string, { runs: number; totalFound: number; totalNew: number }>,
    };

    if (stats) {
      for (const stat of stats) {
        if (!summary.bySource[stat.source]) {
          summary.bySource[stat.source] = { runs: 0, totalFound: 0, totalNew: 0 };
        }
        summary.bySource[stat.source].runs++;
        summary.bySource[stat.source].totalFound += stat.prospects_found || 0;
        summary.bySource[stat.source].totalNew += stat.new_prospects || 0;
      }
    }

    return NextResponse.json({ logs, summary });
  } catch (error) {
    console.error('Scrape logs API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
