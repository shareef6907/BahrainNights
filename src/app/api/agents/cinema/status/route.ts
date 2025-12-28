import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();

    // Get latest agent run
    const { data: latestRun, error: runError } = await supabase
      .from('agent_logs')
      .select('*')
      .eq('agent_name', 'cinema_sync')
      .order('started_at', { ascending: false })
      .limit(1)
      .single();

    // Get movie counts
    const { count: totalMovies } = await supabase
      .from('movies')
      .select('*', { count: 'exact', head: true });

    const { count: nowShowing } = await supabase
      .from('movies')
      .select('*', { count: 'exact', head: true })
      .eq('is_now_showing', true);

    const { count: comingSoon } = await supabase
      .from('movies')
      .select('*', { count: 'exact', head: true })
      .eq('is_coming_soon', true);

    // Get cinema count
    const { count: cinemaCount } = await supabase
      .from('cinemas')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true);

    // Get showtime count (future only)
    const { count: showtimeCount } = await supabase
      .from('showtimes')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true)
      .gte('showtime', new Date().toISOString());

    // Get recent runs (last 5)
    const { data: recentRuns } = await supabase
      .from('agent_logs')
      .select('id, started_at, completed_at, status, items_added, items_updated, errors')
      .eq('agent_name', 'cinema_sync')
      .order('started_at', { ascending: false })
      .limit(5);

    return NextResponse.json({
      stats: {
        total_movies: totalMovies || 0,
        now_showing: nowShowing || 0,
        coming_soon: comingSoon || 0,
        cinemas: cinemaCount || 0,
        upcoming_showtimes: showtimeCount || 0,
      },
      latest_run: latestRun
        ? {
            id: latestRun.id,
            started_at: latestRun.started_at,
            completed_at: latestRun.completed_at,
            status: latestRun.status,
            items_found: latestRun.items_found,
            items_added: latestRun.items_added,
            items_updated: latestRun.items_updated,
            error_count: Array.isArray(latestRun.errors) ? latestRun.errors.length : 0,
            duration_ms: latestRun.metadata?.duration_ms,
          }
        : null,
      recent_runs: recentRuns?.map(run => ({
        id: run.id,
        started_at: run.started_at,
        completed_at: run.completed_at,
        status: run.status,
        items_added: run.items_added,
        items_updated: run.items_updated,
        error_count: Array.isArray(run.errors) ? run.errors.length : 0,
      })) || [],
    });
  } catch (error) {
    console.error('Status check error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch status' },
      { status: 500 }
    );
  }
}
