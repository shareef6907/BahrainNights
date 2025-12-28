import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import {
  getNowPlaying,
  getUpcoming,
  getMovieDetails,
  getPosterUrl,
  getBackdropUrl,
  getTrailerUrl,
  getTrailerKey,
  getDirector,
  getCast,
  getGenreNames,
  slugify,
  getRating,
  getLanguageName,
  TMDBMovie,
} from '@/lib/tmdb';

export const dynamic = 'force-dynamic';
export const maxDuration = 60; // 60 seconds max for Vercel

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

interface SyncResult {
  added: number;
  updated: number;
  errors: string[];
  movies: string[];
}

async function processMovie(
  supabase: ReturnType<typeof getSupabaseAdmin>,
  movie: TMDBMovie,
  isComingSoon: boolean
): Promise<{ action: 'added' | 'updated' | 'error'; title: string; error?: string }> {
  try {
    // Get full movie details
    const details = await getMovieDetails(movie.id);

    // IMPORTANT: NEVER set is_now_showing from TMDB sync!
    // Only the GitHub Actions cinema scraper should set is_now_showing = true
    // based on actual Bahrain cinema data (Cineco, VOX, Cinepolis, Mukta)
    const movieData = {
      tmdb_id: movie.id,
      title: details.title,
      slug: slugify(details.title) + '-' + movie.id,
      poster_url: getPosterUrl(details.poster_path, 'w500'),
      backdrop_url: getBackdropUrl(details.backdrop_path, 'w1280'),
      duration_minutes: details.runtime || null,
      genre: getGenreNames(details.genres),
      rating: getRating(details.vote_average),
      synopsis: details.overview || null,
      release_date: details.release_date || null,
      trailer_url: getTrailerUrl(details.videos),
      trailer_key: getTrailerKey(details.videos),
      language: getLanguageName(details.original_language),
      director: getDirector(details.credits),
      movie_cast: getCast(details.credits, 10),
      tmdb_rating: details.vote_average || null,
      // is_now_showing is NOT set here - only cinema scraper sets this
      is_coming_soon: isComingSoon,
      updated_at: new Date().toISOString(),
    };

    // Check if movie exists
    const { data: existing } = await supabase
      .from('movies')
      .select('id')
      .eq('tmdb_id', movie.id)
      .single();

    if (existing) {
      // Update existing movie
      const { error } = await supabase
        .from('movies')
        .update(movieData)
        .eq('tmdb_id', movie.id);

      if (error) throw error;
      return { action: 'updated', title: details.title };
    } else {
      // Insert new movie
      const { error } = await supabase
        .from('movies')
        .insert({
          ...movieData,
          created_at: new Date().toISOString(),
        });

      if (error) throw error;
      return { action: 'added', title: details.title };
    }
  } catch (error) {
    return {
      action: 'error',
      title: movie.title,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function POST(request: Request) {
  const startTime = Date.now();
  const supabase = getSupabaseAdmin();

  // Create agent log entry
  const { data: logEntry, error: logError } = await supabase
    .from('agent_logs')
    .insert({
      agent_name: 'cinema_sync',
      status: 'running',
      metadata: { trigger: 'manual' },
    })
    .select('id')
    .single();

  if (logError) {
    console.error('Failed to create log entry:', logError);
  }

  const logId = logEntry?.id;

  try {
    const result: SyncResult = {
      added: 0,
      updated: 0,
      errors: [],
      movies: [],
    };

    // Fetch now playing movies (2 pages = ~40 movies)
    console.log('Fetching now playing movies...');
    const nowPlaying1 = await getNowPlaying(1);
    const nowPlaying2 = await getNowPlaying(2);
    const nowPlayingMovies = [...nowPlaying1.results, ...nowPlaying2.results];

    // Fetch upcoming movies (1 page = ~20 movies)
    console.log('Fetching upcoming movies...');
    const upcoming = await getUpcoming(1);
    const upcomingMovies = upcoming.results;

    // Track all TMDB IDs we're processing
    const processedTmdbIds = new Set<number>();

    // Process now playing movies (add/update info only, NOT is_now_showing)
    // Note: is_now_showing is ONLY set by the GitHub Actions cinema scraper
    // based on actual Bahrain cinema websites (Cineco, VOX, Cinepolis, Mukta)
    console.log(`Processing ${nowPlayingMovies.length} now playing movies (metadata only)...`);
    for (const movie of nowPlayingMovies) {
      if (processedTmdbIds.has(movie.id)) continue;
      processedTmdbIds.add(movie.id);

      // is_coming_soon = false for now playing movies
      const res = await processMovie(supabase, movie, false);
      if (res.action === 'added') {
        result.added++;
        result.movies.push(`+ ${res.title}`);
      } else if (res.action === 'updated') {
        result.updated++;
        result.movies.push(`~ ${res.title}`);
      } else if (res.error) {
        result.errors.push(`${res.title}: ${res.error}`);
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Process upcoming movies
    console.log(`Processing ${upcomingMovies.length} upcoming movies...`);
    for (const movie of upcomingMovies) {
      if (processedTmdbIds.has(movie.id)) continue;
      processedTmdbIds.add(movie.id);

      // is_coming_soon = true for upcoming movies
      const res = await processMovie(supabase, movie, true);
      if (res.action === 'added') {
        result.added++;
        result.movies.push(`+ ${res.title} (coming soon)`);
      } else if (res.action === 'updated') {
        result.updated++;
        result.movies.push(`~ ${res.title} (coming soon)`);
      } else if (res.error) {
        result.errors.push(`${res.title}: ${res.error}`);
      }

      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // IMPORTANT: Do NOT modify is_now_showing here!
    // Only the GitHub Actions cinema scraper sets is_now_showing based on
    // actual Bahrain cinema data. TMDB sync only updates movie metadata.

    // Update agent log
    if (logId) {
      await supabase
        .from('agent_logs')
        .update({
          completed_at: new Date().toISOString(),
          status: result.errors.length > 0 ? 'completed_with_errors' : 'completed',
          items_found: nowPlayingMovies.length + upcomingMovies.length,
          items_processed: processedTmdbIds.size,
          items_added: result.added,
          items_updated: result.updated,
          errors: result.errors,
          metadata: {
            trigger: 'manual',
            duration_ms: Date.now() - startTime,
            now_playing_count: nowPlayingMovies.length,
            upcoming_count: upcomingMovies.length,
          },
        })
        .eq('id', logId);
    }

    return NextResponse.json({
      success: true,
      duration_ms: Date.now() - startTime,
      summary: {
        found: processedTmdbIds.size,
        added: result.added,
        updated: result.updated,
        errors: result.errors.length,
      },
      movies: result.movies,
      errors: result.errors.length > 0 ? result.errors : undefined,
    });
  } catch (error) {
    console.error('Cinema sync error:', error);

    // Update agent log with error
    if (logId) {
      await supabase
        .from('agent_logs')
        .update({
          completed_at: new Date().toISOString(),
          status: 'failed',
          errors: [error instanceof Error ? error.message : 'Unknown error'],
          metadata: {
            trigger: 'manual',
            duration_ms: Date.now() - startTime,
          },
        })
        .eq('id', logId);
    }

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        duration_ms: Date.now() - startTime,
      },
      { status: 500 }
    );
  }
}

// GET endpoint for checking if sync is available
export async function GET() {
  return NextResponse.json({
    message: 'Cinema Sync Agent',
    method: 'POST to run sync',
    info: 'Fetches movies from TMDB and syncs to database',
  });
}
