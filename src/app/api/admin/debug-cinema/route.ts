import { NextRequest, NextResponse } from 'next/server';
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

export async function GET(request: NextRequest) {
  const supabase = getSupabaseAdmin();
  const { searchParams } = new URL(request.url);
  const movieTitle = searchParams.get('movie') || 'Greenland';

  try {
    // 1. Find movies matching the search
    const { data: movies, error: moviesError } = await supabase
      .from('movies')
      .select('*')
      .ilike('title', `%${movieTitle}%`);

    if (moviesError) {
      return NextResponse.json({ error: moviesError.message }, { status: 500 });
    }

    // 2. Get showtimes for these movies
    const movieIds = movies?.map(m => m.id) || [];
    let showtimes = [];

    if (movieIds.length > 0) {
      const { data: showtimeData, error: showtimesError } = await supabase
        .from('showtimes')
        .select(`
          *,
          cinema:cinemas(id, name, location, area)
        `)
        .in('movie_id', movieIds);

      if (!showtimesError) {
        showtimes = showtimeData || [];
      }
    }

    // 3. Get cinemas list
    const { data: cinemas } = await supabase
      .from('cinemas')
      .select('*');

    // 4. Get latest agent log for cinema scraper
    const { data: agentLogs } = await supabase
      .from('agent_logs')
      .select('*')
      .or('agent_type.eq.cinema_scraper_github,agent_name.eq.cinema_sync')
      .order('created_at', { ascending: false })
      .limit(5);

    // 5. Get all movies that are currently showing
    const { data: nowShowingMovies } = await supabase
      .from('movies')
      .select('id, title, scraped_from, is_now_showing, is_coming_soon, updated_at')
      .eq('is_now_showing', true)
      .order('title');

    return NextResponse.json({
      query: movieTitle,
      movies: movies?.map(m => ({
        id: m.id,
        title: m.title,
        is_now_showing: m.is_now_showing,
        is_coming_soon: m.is_coming_soon,
        scraped_from: m.scraped_from,
        updated_at: m.updated_at,
        created_at: m.created_at,
      })),
      showtimes: showtimes.map(s => ({
        id: s.id,
        movie_id: s.movie_id,
        cinema_id: s.cinema_id,
        cinema_name: s.cinema?.name,
        cinema_location: s.cinema?.location,
        showtime: s.showtime,
        format: s.format,
        is_active: s.is_active,
        created_at: s.created_at,
      })),
      cinemas: cinemas?.map(c => ({
        id: c.id,
        name: c.name,
        location: c.location,
      })),
      latestScraperRuns: agentLogs?.map(log => ({
        id: log.id,
        agent_type: log.agent_type || log.agent_name,
        status: log.status,
        items_found: log.items_found,
        items_updated: log.items_updated,
        created_at: log.created_at,
        completed_at: log.completed_at,
        metadata: log.metadata,
      })),
      nowShowingCount: nowShowingMovies?.length || 0,
      nowShowingMovies: nowShowingMovies?.slice(0, 20),
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// POST - Clean stale showtimes
export async function POST(request: NextRequest) {
  const supabase = getSupabaseAdmin();
  const { action } = await request.json();

  if (action === 'cleanup_stale_showtimes') {
    // Delete showtimes that are in the past
    const now = new Date().toISOString();

    const { data: deleted, error } = await supabase
      .from('showtimes')
      .delete()
      .lt('showtime', now)
      .select('id');

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `Deleted ${deleted?.length || 0} stale showtimes`,
      deletedCount: deleted?.length || 0,
    });
  }

  if (action === 'reset_movie_status') {
    // Reset is_now_showing for movies with no active showtimes
    const { data: moviesWithShowtimes } = await supabase
      .from('showtimes')
      .select('movie_id')
      .gte('showtime', new Date().toISOString())
      .eq('is_active', true);

    const movieIdsWithShowtimes = new Set(moviesWithShowtimes?.map(s => s.movie_id) || []);

    // Get all movies marked as now showing
    const { data: nowShowingMovies } = await supabase
      .from('movies')
      .select('id, title')
      .eq('is_now_showing', true);

    const moviesToReset = nowShowingMovies?.filter(m => !movieIdsWithShowtimes.has(m.id)) || [];

    if (moviesToReset.length > 0) {
      const { error } = await supabase
        .from('movies')
        .update({ is_now_showing: false })
        .in('id', moviesToReset.map(m => m.id));

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Reset ${moviesToReset.length} movies that have no active showtimes`,
      resetMovies: moviesToReset.map(m => m.title),
    });
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
}
