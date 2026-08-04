#!/usr/bin/env npx tsx

/**
 * Cinema Sync - Main Orchestrator
 * Scrapes VOX & Cineco, syncs with database using TMDB as ENRICHMENT (not a gate)
 *
 * Run: npx tsx scripts/sync-cinema.ts
 */

import { createClient } from '@supabase/supabase-js';
import { scrapeVOX, type ScoredMovie } from './scrape-vox';
import { scrapeCineco } from './scrape-cineco';
import { normalizeTitle } from '../src/lib/cinema-normalize';

// Load .env.local for local development
import { config } from 'dotenv';
config({ path: '.env.local' });
config();

// Environment variables
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

// Set to true to actually write to DB. Set false for dry-run.
const DRY_RUN = process.env.DRY_RUN !== 'false';

if (DRY_RUN) {
  console.warn('⚠️  DRY RUN — no changes will be written to the database');
  console.warn('    Set DRY_RUN=false to enable writes.\n');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Delay helper for rate limiting
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Find movie in database by normalized title match.
 * Uses the same normalizeTitle() as the scraper merge — guaranteed consistent keys.
 */
async function findMovieByTitle(title: string): Promise<{ id: string; title: string; scraped_from: string[] | null } | null> {
  const normalized = normalizeTitle(title);

  const { data: movies } = await supabase
    .from('movies')
    .select('id, title, scraped_from')
    .order('title');

  if (!movies || movies.length === 0) return null;

  // Exact match (normalized)
  for (const movie of movies) {
    if (normalizeTitle(movie.title) === normalized) {
      return movie as { id: string; title: string; scraped_from: string[] | null };
    }
  }

  // Partial match (case-insensitive contains, length similarity check)
  const lowerTitle = title.toLowerCase();
  for (const movie of movies) {
    const movieLower = movie.title.toLowerCase();
    if (movieLower.includes(lowerTitle) || lowerTitle.includes(movieLower)) {
      if (Math.abs(movieLower.length - lowerTitle.length) < 10) {
        return movie as { id: string; title: string; scraped_from: string[] | null };
      }
    }
  }

  return null;
}

/**
 * Search TMDB for movie by title.
 * Returns null if not found — this is NOT a blocking error, it's expected
 * for regional/Arabic/Hindi cinema not yet in TMDB.
 */
async function searchTMDB(title: string, year?: number): Promise<any | null> {
  if (!TMDB_API_KEY) {
    console.log('  ⚠️ TMDB_API_KEY not set, skipping TMDB lookup');
    return null;
  }

  const currentYear = year || new Date().getFullYear();

  try {
    let searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}&year=${currentYear}`;
    let response = await fetch(searchUrl);
    let data = await response.json();

    if (!data.results || data.results.length === 0) {
      searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}`;
      response = await fetch(searchUrl);
      data = await response.json();
    }

    if (data.results && data.results.length > 0) {
      const movie = data.results[0];
      const detailsUrl = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${TMDB_API_KEY}&append_to_response=credits,videos`;
      const detailsResponse = await fetch(detailsUrl);
      const details = await detailsResponse.json();
      return details;
    }

    return null;
  } catch (error) {
    console.error('  ❌ TMDB search error:', error instanceof Error ? error.message : error);
    return null;
  }
}

/**
 * Search YouTube for trailer by movie title.
 */
async function searchYouTubeTrailer(title: string): Promise<string | null> {
  if (!YOUTUBE_API_KEY) {
    try {
      const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(title + ' official trailer')}&type=video&maxResults=1`;
      const response = await fetch(searchUrl);
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        return data.items[0].id.videoId;
      }
    } catch {
      // No API key, can't search
    }
    return null;
  }

  try {
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(title + ' official trailer')}&type=video&maxResults=1&key=${YOUTUBE_API_KEY}`;
    const response = await fetch(searchUrl);
    const data = await response.json();
    if (data.items && data.items.length > 0) {
      return data.items[0].id.videoId;
    }
    return null;
  } catch (error) {
    console.error('  ⚠️ YouTube search error:', error instanceof Error ? error.message : error);
    return null;
  }
}

/**
 * Generate a URL-safe slug from a title.
 */
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Insert a new movie into the database.
 *
 * @param movie         - Raw movie data from scraper
 * @param tmdbData      - TMDB enrichment data (null = regional/unlisted film)
 * @param isNowShowing  - Current cinema status
 * @param source        - 'vox' | 'cineco' — the actual source that scraped this title
 * @param posterUrl     - Poster URL from source site (used if TMDB has no poster)
 */
async function insertMovie(
  movie: ScoredMovie,
  tmdbData: any,
  isNowShowing: boolean,
  source: 'vox' | 'cineco',
  posterUrl?: string | null,
): Promise<string | null> {
  const { title } = movie;

  if (DRY_RUN) {
    console.log(`  ⏭️  [DRY RUN] Would INSERT: "${title}" (source=${source}, tmdb=${!!tmdbData})`);
    return 'dry-run-id';
  }

  try {
    const slug = createSlug(title);

    // Poster priority: TMDB > source site > null
    const posterFromTmdb = tmdbData?.poster_path
      ? `https://image.tmdb.org/t/p/w500${tmdbData.poster_path}`
      : null;
    const posterUrlFinal = posterFromTmdb || posterUrl || null;

    const backdropUrl = tmdbData?.backdrop_path
      ? `https://image.tmdb.org/t/p/original${tmdbData.backdrop_path}`
      : tmdbData?.poster_path
        ? `https://image.tmdb.org/t/p/w500${tmdbData.poster_path}`
        : null;

    const trailerKey = await searchYouTubeTrailer(title);
    await wait(500);

    const genres = tmdbData?.genres?.map((g: any) => g.name) || [];

    const { data, error } = await supabase
      .from('movies')
      .insert({
        tmdb_id: tmdbData?.id || null,
        title,
        slug,
        poster_url: posterUrlFinal,
        backdrop_url: backdropUrl,
        duration_minutes: tmdbData?.runtime || null,
        genre: genres,
        rating: tmdbData?.release_dates?.results?.[0]?.release_dates?.[0]?.certification || null,
        synopsis: tmdbData?.overview || null,
        release_date: tmdbData?.release_date || null,
        language: tmdbData?.original_language || null,
        director: tmdbData?.credits?.crew?.find((c: any) => c.job === 'Director')?.name || null,
        movie_cast: tmdbData?.credits?.cast?.slice(0, 5).map((c: any) => c.name) || null,
        tmdb_rating: tmdbData?.vote_average || null,
        is_now_showing: isNowShowing,
        is_coming_soon: !isNowShowing,
        trailer_key: trailerKey,
        genres,
        overview: tmdbData?.overview || null,
        poster_path: tmdbData?.poster_path,
        backdrop_path: tmdbData?.backdrop_path,
        runtime: tmdbData?.runtime,
        popularity: tmdbData?.popularity || 0,
        scraped_from: [source],
      } as any)
      .select('id')
      .single();

    if (error) {
      console.error(`  ❌ Error inserting "${title}":`, error.message);
      return null;
    }

    console.log(`  ✅ Added: ${title}`);
    return data?.id || null;
  } catch (error) {
    console.error(`  ❌ Error adding "${title}":`, error instanceof Error ? error.message : error);
    return null;
  }
}

/**
 * Update the cinema status of an existing movie.
 *
 * @param movieId       - Database row ID
 * @param isNowShowing  - New now-showing status
 * @param isComingSoon  - New coming-soon status
 * @param source        - Source to ADD to scraped_from (union, never remove)
 */
async function updateMovieStatus(
  movieId: string,
  isNowShowing: boolean,
  isComingSoon: boolean,
  source: 'vox' | 'cineco',
): Promise<boolean> {
  if (DRY_RUN) {
    console.log(`  ⏭️  [DRY RUN] Would UPDATE id=${movieId} (now=${isNowShowing}, soon=${isComingSoon}, add_source=${source})`);
    return true;
  }

  try {
    // Fetch current scraped_from to union with new source
    const { data: existing } = await supabase
      .from('movies')
      .select('scraped_from')
      .eq('id', movieId)
      .single();

    const currentSources: string[] = existing?.scraped_from || [];
    const updatedSources = currentSources.includes(source)
      ? currentSources
      : [...currentSources, source];

    const { error } = await supabase
      .from('movies')
      .update({
        is_now_showing: isNowShowing,
        is_coming_soon: isComingSoon,
        scraped_from: updatedSources,
        updated_at: new Date().toISOString(),
      })
      .eq('id', movieId);

    if (error) {
      console.error(`  ❌ Error updating movie:`, error.message);
      return false;
    }

    return true;
  } catch (error) {
    console.error(`  ❌ Error updating movie:`, error instanceof Error ? error.message : error);
    return false;
  }
}

/**
 * Main sync function
 */
async function syncCinema() {
  console.log('🎬 CINEMA SYNC - Starting');
  console.log('='.repeat(60));
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN (no writes)' : 'LIVE'}`);
  console.log('Started at:', new Date().toISOString());
  console.log('='.repeat(60));

  const stats = {
    voxNowShowing: 0,
    voxComingSoon: 0,
    cinecoNowShowing: 0,
    cinecoComingSoon: 0,
    added: 0,
    updated: 0,
    removed: 0,
    tmdbMatched: 0,
    tmdbMissing: 0,
    noPoster: 0,
  };

  try {
    // Step 1: Scrape VOX
    console.log('\n📡 Step 1: Scraping VOX Bahrain...');
    const voxResult = await scrapeVOX();
    stats.voxNowShowing = voxResult.nowShowing.length;
    stats.voxComingSoon = voxResult.comingSoon.length;

    // Build VOX poster map: normalized title → poster URL
    const voxPosterMap = new Map<string, string | null>();
    for (const m of [...voxResult.nowShowing, ...voxResult.comingSoon]) {
      voxPosterMap.set(normalizeTitle(m.title), m.posterUrl);
    }

    // Step 2: Scrape Cineco
    console.log('\n📡 Step 2: Scraping Cineco Bahrain...');
    const cinecoResult = await scrapeCineco();
    stats.cinecoNowShowing = cinecoResult.nowShowing.length;
    stats.cinecoComingSoon = cinecoResult.comingSoon.length;

    // Build Cineco poster map
    const cinecoPosterMap = new Map<string, string | null>();
    for (const m of [...cinecoResult.nowShowing, ...cinecoResult.comingSoon]) {
      cinecoPosterMap.set(normalizeTitle(m.title), m.posterUrl);
    }

    // Step 3: Merge by normalized title, tracking source per title
    console.log('\n🔀 Step 3: Merging by normalized title...');

    const allNowShowing: { movie: ScoredMovie; source: 'vox' | 'cineco' }[] = [];
    const allComingSoon: { movie: ScoredMovie; source: 'vox' | 'cineco' }[] = [];

    for (const m of voxResult.nowShowing) {
      allNowShowing.push({ movie: m, source: 'vox' });
    }
    for (const m of cinecoResult.nowShowing) {
      allNowShowing.push({ movie: m, source: 'cineco' });
    }
    for (const m of voxResult.comingSoon) {
      allComingSoon.push({ movie: m, source: 'vox' });
    }
    for (const m of cinecoResult.comingSoon) {
      allComingSoon.push({ movie: m, source: 'cineco' });
    }

    // Deduplicate: keep first occurrence by normalized key, but note both sources
    const mergedNowShowing = new Map<string, { movie: ScoredMovie; source: 'vox' | 'cineco' }>();
    for (const item of allNowShowing) {
      const key = normalizeTitle(item.movie.title);
      if (!mergedNowShowing.has(key)) {
        mergedNowShowing.set(key, item);
      }
    }

    const mergedComingSoon = new Map<string, { movie: ScoredMovie; source: 'vox' | 'cineco' }>();
    for (const item of allComingSoon) {
      const key = normalizeTitle(item.movie.title);
      if (!mergedNowShowing.has(key)) { // Don't add if already in now-showing
        if (!mergedComingSoon.has(key)) {
          mergedComingSoon.set(key, item);
        }
      }
    }

    const nowShowingList = Array.from(mergedNowShowing.values());
    const comingSoonList = Array.from(mergedComingSoon.values());

    console.log(`  Merged Now Showing: ${nowShowingList.length} (from ${allNowShowing.length} raw)`);
    console.log(`  Merged Coming Soon: ${comingSoonList.length} (from ${allComingSoon.length} raw)`);

    // Step 4: Process Now Showing
    console.log('\n📊 Step 4: Processing Now Showing...');

    for (const { movie, source } of nowShowingList) {
      const { title } = movie;
      const existing = await findMovieByTitle(title);

      if (existing) {
        // Update status + union scraped_from
        const updated = await updateMovieStatus(existing.id, true, false, source);
        if (updated) {
          console.log(`  🔄 Updated: "${title}" (Now Showing, source=${source})`);
          stats.updated++;
        }
      } else {
        // New movie — always insert (TMDB is enrichment, not a gate)
        const tmdbData = await searchTMDB(title);
        await wait(300);

        // Get poster from source site
        const posterMap = source === 'vox' ? voxPosterMap : cinecoPosterMap;
        const posterUrl = posterMap.get(normalizeTitle(title)) || null;

        if (!posterUrl) stats.noPoster++;

        if (tmdbData) {
          stats.tmdbMatched++;
          const inserted = await insertMovie(movie, tmdbData, true, source, posterUrl);
          if (inserted) stats.added++;
        } else {
          stats.tmdbMissing++;
          console.log(`  ℹ️  No TMDB match, inserted without metadata: "${title}"`);
          const inserted = await insertMovie(movie, null, true, source, posterUrl);
          if (inserted) stats.added++;
        }
      }
    }

    // Step 5: Process Coming Soon
    console.log('\n📊 Step 5: Processing Coming Soon...');

    for (const { movie, source } of comingSoonList) {
      const { title } = movie;
      const existing = await findMovieByTitle(title);

      if (existing) {
        const updated = await updateMovieStatus(existing.id, false, true, source);
        if (updated) {
          console.log(`  🔄 Updated: "${title}" (Coming Soon, source=${source})`);
          stats.updated++;
        }
      } else {
        const tmdbData = await searchTMDB(title);
        await wait(300);

        const posterMap = source === 'vox' ? voxPosterMap : cinecoPosterMap;
        const posterUrl = posterMap.get(normalizeTitle(title)) || null;

        if (!posterUrl) stats.noPoster++;

        if (tmdbData) {
          stats.tmdbMatched++;
          const inserted = await insertMovie(movie, tmdbData, false, source, posterUrl);
          if (inserted) stats.added++;
        } else {
          stats.tmdbMissing++;
          console.log(`  ℹ️  No TMDB match, inserted without metadata: "${title}"`);
          const inserted = await insertMovie(movie, null, false, source, posterUrl);
          if (inserted) stats.added++;
        }
      }
    }

    // Step 6: Cleanup — mark stale movies as not showing
    console.log('\n🧹 Step 6: Cleaning up stale movies...');

    const totalMoviesFound = nowShowingList.length + comingSoonList.length;
    const MIN_MOVIES_THRESHOLD = 5;

    if (totalMoviesFound === 0) {
      console.log('  ⚠️ WARNING: Scraper found 0 movies! Skipping cleanup to prevent data loss.');
    } else if (totalMoviesFound < MIN_MOVIES_THRESHOLD) {
      console.log(`  ⚠️ WARNING: Scraper found only ${totalMoviesFound} movies. Proceeding with caution.`);
    } else {
      const { data: staleMovies } = await supabase
        .from('movies')
        .select('id, title')
        .or('is_now_showing.eq.true,is_coming_soon.eq.true');

      const activeKeys = new Set([
        ...nowShowingList.map(i => normalizeTitle(i.movie.title)),
        ...comingSoonList.map(i => normalizeTitle(i.movie.title)),
      ]);

      for (const movie of staleMovies || []) {
        if (!activeKeys.has(normalizeTitle(movie.title))) {
          if (!DRY_RUN) {
            await supabase
              .from('movies')
              .update({ is_now_showing: false, is_coming_soon: false, updated_at: new Date().toISOString() })
              .eq('id', movie.id);
          }
          console.log(`  🗑️ Removed from showing: "${movie.title}"`);
          stats.removed++;
        }
      }
    }

    // Final summary
    console.log('\n' + '='.repeat(60));
    console.log('📈 SYNC COMPLETE');
    console.log('='.repeat(60));
    console.log(`VOX Now Showing: ${stats.voxNowShowing}`);
    console.log(`VOX Coming Soon: ${stats.voxComingSoon}`);
    console.log(`Cineco Now Showing: ${stats.cinecoNowShowing}`);
    console.log(`Cineco Coming Soon: ${stats.cinecoComingSoon}`);
    console.log(`---`);
    console.log(`Movies Added: ${stats.added}`);
    console.log(`Movies Updated: ${stats.updated}`);
    console.log(`Movies Removed: ${stats.removed}`);
    console.log(`TMDB Matched: ${stats.tmdbMatched}`);
    console.log(`TMDB Missing (inserted anyway): ${stats.tmdbMissing}`);
    console.log(`No poster available: ${stats.noPoster}`);
    console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`);
    console.log('='.repeat(60));

    return stats;
  } catch (error) {
    console.error('❌ Fatal error:', error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  syncCinema()
    .then(() => {
      console.log('\n✅ Cinema sync complete');
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ Cinema sync failed:', error);
      process.exit(1);
    });
}

export { syncCinema };
