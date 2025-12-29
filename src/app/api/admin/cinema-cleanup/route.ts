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

/**
 * POST /api/admin/cinema-cleanup
 *
 * Actions:
 * - remove_movie_from_cinema: Remove a movie from a specific cinema's scraped_from list
 * - mark_not_showing: Mark a movie as not showing
 * - cleanup_all_stale: Remove all movies that have no valid cinema sources
 */
export async function POST(request: NextRequest) {
  const supabase = getSupabaseAdmin();

  try {
    const body = await request.json();
    const { action, movie_id, cinema_key, movie_title } = body;

    // Action: Remove movie from specific cinema
    if (action === 'remove_movie_from_cinema') {
      if (!movie_id && !movie_title) {
        return NextResponse.json({ error: 'movie_id or movie_title required' }, { status: 400 });
      }

      // Find the movie
      let query = supabase.from('movies').select('*');
      if (movie_id) {
        query = query.eq('id', movie_id);
      } else if (movie_title) {
        query = query.ilike('title', `%${movie_title}%`);
      }

      const { data: movies, error: findError } = await query;

      if (findError || !movies || movies.length === 0) {
        return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
      }

      const movie = movies[0];
      const currentScrapedFrom = movie.scraped_from || [];

      // Remove the specific cinema from scraped_from
      const newScrapedFrom = cinema_key
        ? currentScrapedFrom.filter((c: string) => c !== cinema_key)
        : [];

      // If no cinemas left, mark as not showing
      const isNowShowing = newScrapedFrom.length > 0;

      const { error: updateError } = await supabase
        .from('movies')
        .update({
          scraped_from: newScrapedFrom,
          is_now_showing: isNowShowing,
          updated_at: new Date().toISOString(),
        })
        .eq('id', movie.id);

      if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        message: cinema_key
          ? `Removed "${movie.title}" from ${cinema_key}. Now showing: ${isNowShowing}`
          : `Cleared all cinemas from "${movie.title}". Now marked as not showing.`,
        movie: {
          id: movie.id,
          title: movie.title,
          previous_scraped_from: currentScrapedFrom,
          new_scraped_from: newScrapedFrom,
          is_now_showing: isNowShowing,
        },
      });
    }

    // Action: Mark movie as not showing
    if (action === 'mark_not_showing') {
      if (!movie_id && !movie_title) {
        return NextResponse.json({ error: 'movie_id or movie_title required' }, { status: 400 });
      }

      let query = supabase.from('movies').select('id, title');
      if (movie_id) {
        query = query.eq('id', movie_id);
      } else if (movie_title) {
        query = query.ilike('title', `%${movie_title}%`);
      }

      const { data: movies, error: findError } = await query;

      if (findError || !movies || movies.length === 0) {
        return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
      }

      const movieIds = movies.map(m => m.id);

      const { error: updateError } = await supabase
        .from('movies')
        .update({
          is_now_showing: false,
          scraped_from: [],
          updated_at: new Date().toISOString(),
        })
        .in('id', movieIds);

      if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        message: `Marked ${movies.length} movie(s) as not showing`,
        movies: movies.map(m => m.title),
      });
    }

    // Action: Cleanup all stale movies
    if (action === 'cleanup_all_stale') {
      // Find movies marked as showing but with empty scraped_from
      const { data: staleMovies, error: findError } = await supabase
        .from('movies')
        .select('id, title, scraped_from')
        .eq('is_now_showing', true);

      if (findError) {
        return NextResponse.json({ error: findError.message }, { status: 500 });
      }

      // Filter to movies with empty or null scraped_from
      const moviesToFix = (staleMovies || []).filter(m =>
        !m.scraped_from ||
        (Array.isArray(m.scraped_from) && m.scraped_from.length === 0)
      );

      if (moviesToFix.length === 0) {
        return NextResponse.json({
          success: true,
          message: 'No stale movies found',
          fixedCount: 0,
        });
      }

      const { error: updateError } = await supabase
        .from('movies')
        .update({
          is_now_showing: false,
          updated_at: new Date().toISOString(),
        })
        .in('id', moviesToFix.map(m => m.id));

      if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        message: `Fixed ${moviesToFix.length} stale movies`,
        fixedMovies: moviesToFix.map(m => m.title),
      });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// GET - Show current cinema data status
export async function GET() {
  const supabase = getSupabaseAdmin();

  try {
    // Get all movies marked as now showing
    const { data: nowShowing } = await supabase
      .from('movies')
      .select('id, title, scraped_from, is_now_showing, updated_at')
      .eq('is_now_showing', true)
      .order('title');

    // Group by cinema
    const byCinema: Record<string, string[]> = {
      cineco: [],
      vox: [],
      cinepolis: [],
      mukta: [],
    };

    for (const movie of nowShowing || []) {
      const sources = movie.scraped_from || [];
      for (const source of sources) {
        if (byCinema[source]) {
          byCinema[source].push(movie.title);
        }
      }
    }

    // Get last scraper run
    const { data: lastRun } = await supabase
      .from('agent_logs')
      .select('*')
      .eq('agent_type', 'cinema_scraper_github')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    return NextResponse.json({
      totalNowShowing: nowShowing?.length || 0,
      byCinema: Object.fromEntries(
        Object.entries(byCinema).map(([k, v]) => [k, { count: v.length, movies: v }])
      ),
      lastScraperRun: lastRun ? {
        status: lastRun.status,
        completedAt: lastRun.completed_at,
        itemsFound: lastRun.items_found,
        itemsUpdated: lastRun.items_updated,
      } : null,
      allNowShowing: nowShowing?.map(m => ({
        id: m.id,
        title: m.title,
        cinemas: m.scraped_from,
        updatedAt: m.updated_at,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
