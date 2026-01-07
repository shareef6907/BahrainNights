import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';
import { verifyAdmin } from '@/lib/auth/verifyAdmin';
import { getSitemapStats } from '@/lib/seo/sitemapGenerator';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/seo/stats
 * Get SEO statistics and overview
 */
export async function GET(request: NextRequest) {
  try {
    const adminCheck = await verifyAdmin(request);
    if (!adminCheck.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = getAdminClient();

    // Get sitemap stats
    let sitemapStats;
    try {
      sitemapStats = await getSitemapStats();
    } catch (e) {
      sitemapStats = { totalUrls: 0, staticUrls: 0, events: 0, venues: 0, attractions: 0, movies: 0, offers: 0 };
    }

    // Get keyword count
    const { count: keywordCount } = await supabase
      .from('seo_keywords')
      .select('*', { count: 'exact', head: true });

    // Get optimized pages count
    const { count: optimizedPages } = await supabase
      .from('seo_page_meta')
      .select('*', { count: 'exact', head: true });

    // Get last run info
    const { data: lastRun } = await supabase
      .from('seo_agent_logs')
      .select('*')
      .order('run_date', { ascending: false })
      .limit(1)
      .single();

    // Get run history stats (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data: recentRuns } = await (supabase
      .from('seo_agent_logs') as any)
      .select('status, pages_optimized, duration_seconds')
      .gte('run_date', sevenDaysAgo.toISOString());

    const recentRunsTyped = recentRuns as Array<{ status: string; pages_optimized: number; duration_seconds: number }> | null;
    const runStats = {
      totalRuns: recentRunsTyped?.length || 0,
      successfulRuns: recentRunsTyped?.filter(r => r.status === 'completed').length || 0,
      totalPagesOptimized: recentRunsTyped?.reduce((sum, r) => sum + (r.pages_optimized || 0), 0) || 0,
      avgDuration: recentRunsTyped && recentRunsTyped.length > 0
        ? Math.round(recentRunsTyped.reduce((sum, r) => sum + (r.duration_seconds || 0), 0) / recentRunsTyped.length)
        : 0
    };

    // Get average optimization score
    const { data: scores } = await (supabase
      .from('seo_page_meta') as any)
      .select('optimization_score')
      .not('optimization_score', 'is', null);

    const scoresTyped = scores as Array<{ optimization_score: number }> | null;
    const avgScore = scoresTyped && scoresTyped.length > 0
      ? Math.round(scoresTyped.reduce((sum, s) => sum + (s.optimization_score || 0), 0) / scoresTyped.length)
      : 0;

    const lastRunTyped = lastRun as { run_date: string; status: string; pages_optimized: number; duration_seconds: number } | null;
    return NextResponse.json({
      success: true,
      data: {
        sitemap: sitemapStats,
        keywords: {
          total: keywordCount || 0
        },
        pages: {
          optimized: optimizedPages || 0,
          avgScore
        },
        lastRun: lastRunTyped ? {
          date: lastRunTyped.run_date,
          status: lastRunTyped.status,
          pagesOptimized: lastRunTyped.pages_optimized,
          duration: lastRunTyped.duration_seconds
        } : null,
        weeklyStats: runStats
      }
    });
  } catch (error) {
    console.error('[Admin SEO Stats] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
