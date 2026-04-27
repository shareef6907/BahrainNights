import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { searchMovies, getMovieDetails, type TMDBMovie } from '@/lib/tmdb';

export const dynamic = 'force-dynamic';
export const maxDuration = 120;

const VOX_BASE_URL = 'https://bhr.voxcinemas.com';

interface MovieUpdate {
  id: string;
  title: string;
  action: 'now_showing' | 'coming_soon' | 'removed';
}

interface SyncResult {
  success: boolean;
  timestamp: string;
 voxNowShowing: string[];
  voxComingSoon: string[];
  updates: MovieUpdate[];
  added: string[];
  errors: string[];
}

/**
 * Extract movie titles from VOX cinema page
 */
async function getVOXMovies(url: string): Promise<string[]> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });
    
    if (!response.ok) {
      throw new Error(`VOX fetch failed: ${response.status}`);
    }
    
    const html = await response.text();
    const titles: string[] = [];
    
    // Match data-title attributes
    const regex = /data-title="([^"]+)"/g;
    let match;
    
    while ((match = regex.exec(html)) !== null) {
      const title = match[1]
        .replace(/&amp;/g, '&')
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"')
        .trim();
      
      if (title && !titles.includes(title)) {
        titles.push(title);
      }
    }
    
    return titles;
  } catch (error) {
    console.error('Error fetching VOX movies:', error);
    return [];
  }
}

/**
 * Normalize movie title for matching
 */
function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/^the\s+/i, '')
    .replace(/[^a-z0-9]/g, '')
    .trim();
}

/**
 * Find movie in database by title (fuzzy match)
 */
function findMovieByTitle(movies: any[], title: string): any | null {
  const normalized = normalizeTitle(title);
  
  for (const movie of movies) {
    const movieNormalized = normalizeTitle(movie.title);
    
    // Exact match
    if (movieNormalized === normalized) {
      return movie;
    }
    
    // Partial match (title contains or is contained)
    if (normalized.includes(movieNormalized) || movieNormalized.includes(normalized)) {
      return movie;
    }
  }
  
  return null;
}

/**
 * Add movie to database using TMDB
 */
async function addMovieToDatabase(
  supabase: ReturnType<typeof createClient>,
  title: string,
  isNowShowing: boolean
): Promise<string | null> {
  try {
    // Search TMDB for the movie
    const results = await searchMovies(title);
    
    if (!results || results.length === 0) {
      console.log(`TMDB: No results for "${title}"`);
      return null;
    }
    
    const tmdbMovie = results[0];
    
    // Get full movie details
    const fullMovie = await getMovieDetails(tmdbMovie.id);
    
    if (!fullMovie) {
      return null;
    }
    
    // Create slug
    const slug = fullMovie.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    
    // Insert into database
    const { data, error } = await supabase
      .from('movies')
      .insert({
        tmdb_id: fullMovie.id,
        title: fullMovie.title,
        slug: slug,
        poster_url: fullMovie.poster_path 
          ? `https://image.tmdb.org/t/p/w500${fullMovie.poster_path}`
          : null,
        backdrop_url: fullMovie.backdrop_path
          ? `https://image.tmdb.org/t/p/original${fullMovie.backdrop_path}`
          : null,
        duration_minutes: fullMovie.runtime || null,
        genre: fullMovie.genres?.map((g: any) => g.name) || [],
        rating: null,
        synopsis: fullMovie.overview || null,
        release_date: fullMovie.release_date || null,
        language: fullMovie.original_language || null,
        director: null,
        movie_cast: null,
        tmdb_rating: fullMovie.vote_average || null,
        is_now_showing: isNowShowing,
        is_coming_soon: !isNowShowing,
        genres: (fullMovie as any).genres?.map((g: any) => g.name) || [],
        overview: (fullMovie as any).overview || null,
        poster_path: (fullMovie as any).poster_path,
        backdrop_path: (fullMovie as any).backdrop_path,
        runtime: (fullMovie as any).runtime,
        popularity: (fullMovie as any).popularity || 0,
        scraped_from: ['vox'],
      } as any)
      .select('id')
      .single();
    
    if (error) {
      console.error(`Error inserting "${title}":`, error.message);
      return null;
    }
    
    return (data as any)?.id || null;
  } catch (error) {
    console.error(`Error adding "${title}" to database:`, error);
    return null;
  }
}

/**
 * Main sync function
 */
export async function POST(request: NextRequest): Promise<NextResponse<SyncResult>> {
  const result: SyncResult = {
    success: false,
    timestamp: new Date().toISOString(),
    voxNowShowing: [],
    voxComingSoon: [],
    updates: [],
    added: [],
    errors: [],
  };

  try {
    // Verify CRON_SECRET
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { ...result, errors: ['Unauthorized'] },
        { status: 401 }
      );
    }

    // Initialize Supabase admin client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    ) as any;

    console.log('[Cinema Sync] Fetching VOX movies...');
    
    // Fetch VOX movies
    const [voxNowShowing, voxComingSoon] = await Promise.all([
      getVOXMovies(`${VOX_BASE_URL}/movies/whatson`),
      getVOXMovies(`${VOX_BASE_URL}/movies/comingsoon`),
    ]);

    result.voxNowShowing = voxNowShowing;
    result.voxComingSoon = voxComingSoon;

    console.log(`[Cinema Sync] VOX Now Showing: ${voxNowShowing.length}`);
    console.log(`[Cinema Sync] VOX Coming Soon: ${voxComingSoon.length}`);

    // Get all movies from database
    const { data: dbMovies, error: dbError } = await supabase
      .from('movies')
      .select('*');

    if (dbError) {
      result.errors.push(`Database error: ${dbError.message}`);
      return NextResponse.json(result, { status: 500 });
    }

    const dbMoviesMap = new Map(dbMovies.map((m: any) => [m.title.toLowerCase(), m]));
    const allDbMovies = dbMovies as any[];

    // Track which movies should be showing
    const shouldBeShowing = new Set<string>();
    const shouldBeComingSoon = new Set<string>();

    // Process VOX Now Showing
    for (const title of voxNowShowing) {
      shouldBeShowing.add(normalizeTitle(title));
    }

    // Process VOX Coming Soon
    for (const title of voxComingSoon) {
      // If also in now showing, prefer now showing
      if (!shouldBeShowing.has(normalizeTitle(title))) {
        shouldBeComingSoon.add(normalizeTitle(title));
      }
    }

    // Update database movies
    for (const movie of allDbMovies) {
      const normalized = normalizeTitle(movie.title);
      const wasNowShowing = movie.is_now_showing;
      const wasComingSoon = movie.is_coming_soon;
      
      let newNowShowing = false;
      let newComingSoon = false;

      if (shouldBeShowing.has(normalized)) {
        newNowShowing = true;
        newComingSoon = false;
      } else if (shouldBeComingSoon.has(normalized)) {
        newNowShowing = false;
        newComingSoon = true;
      } else {
        // Not on VOX anymore - mark as not showing
        newNowShowing = false;
        newComingSoon = false;
      }

      // Only update if changed
      if (wasNowShowing !== newNowShowing || wasComingSoon !== newComingSoon) {
        const { error: updateError } = await supabase
          .from('movies')
          .update({
            is_now_showing: newNowShowing,
            is_coming_soon: newComingSoon,
            updated_at: new Date().toISOString(),
          })
          .eq('id', movie.id);

        if (updateError) {
          result.errors.push(`Update failed for ${movie.title}: ${updateError.message}`);
        } else {
          result.updates.push({
            id: movie.id,
            title: movie.title,
            action: newNowShowing ? 'now_showing' : newComingSoon ? 'coming_soon' : 'removed',
          });
        }
      }
    }

    // Add missing movies (that exist on VOX but not in DB)
    const missingNowShowing = voxNowShowing.filter(
      title => !findMovieByTitle(allDbMovies, title)
    );
    const missingComingSoon = voxComingSoon.filter(
      title => !findMovieByTitle(allDbMovies, title)
    );

    console.log(`[Cinema Sync] Missing Now Showing: ${missingNowShowing.length}`);
    console.log(`[Cinema Sync] Missing Coming Soon: ${missingComingSoon.length}`);

    // Add missing movies (limit to avoid rate limits)
    const toAdd = [...missingNowShowing.slice(0, 5), ...missingComingSoon.slice(0, 3)];
    
    for (const title of toAdd) {
      const isNowShowing = missingNowShowing.includes(title);
      const addedId = await addMovieToDatabase(supabase, title, isNowShowing);
      
      if (addedId) {
        result.added.push(title);
      } else {
        result.errors.push(`Failed to add: ${title}`);
      }
    }

    result.success = true;
    console.log('[Cinema Sync] Complete:', {
      updates: result.updates.length,
      added: result.added.length,
      errors: result.errors.length,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('[Cinema Sync] Error:', error);
    result.errors.push(error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(result, { status: 500 });
  }
}