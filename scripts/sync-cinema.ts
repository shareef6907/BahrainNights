#!/usr/bin/env npx tsx

/**
 * Cinema Sync - Main Orchestrator
 * Scrapes VOX & Cineco, syncs with database using TMDB
 * 
 * Run: npx tsx scripts/sync-cinema.ts
 */

import { createClient } from '@supabase/supabase-js';
import { scrapeVOX } from './scrape-vox';
import { scrapeCineco } from './scrape-cineco';

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

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Delay helper for rate limiting
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fuzzy title matching - normalize for comparison
 */
function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/^the\s+/i, '')
    .replace(/[^a-z0-9]/g, '')
    .trim();
}

/**
 * Find movie in database by fuzzy title match
 */
async function findMovieByTitle(title: string): Promise<{ id: string; title: string } | null> {
  const normalized = normalizeTitle(title);
  
  // Get all movies that might match
  const { data: movies } = await supabase
    .from('movies')
    .select('id, title')
    .limit(50);
  
  if (!movies) return null;
  
  for (const movie of movies) {
    if (normalizeTitle(movie.title) === normalized) {
      return movie;
    }
  }
  
  // Try partial match
  for (const movie of movies) {
    const movieNorm = normalizeTitle(movie.title);
    if (normalized.includes(movieNorm) || movieNorm.includes(normalized)) {
      return movie;
    }
  }
  
  return null;
}

/**
 * Search TMDB for movie by title
 * FIXED: No 6-month filter - insert ALL movies
 */
async function searchTMDB(title: string, year?: number): Promise<any | null> {
  if (!TMDB_API_KEY) {
    console.log('  ⚠️ TMDB_API_KEY not set, skipping TMDB lookup');
    return null;
  }
  
  const currentYear = year || new Date().getFullYear();
  
  try {
    // First try with current year
    let searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}&year=${currentYear}`;
    let response = await fetch(searchUrl);
    let data = await response.json();
    
    // If no results, try without year
    if (!data.results || data.results.length === 0) {
      searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}`;
      response = await fetch(searchUrl);
      data = await response.json();
    }
    
    if (data.results && data.results.length > 0) {
      // Take first match - no age filter
      const movie = data.results[0];
      const detailsUrl = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${TMDB_API_KEY}&append_to_response=credits,videos`;
      const detailsResponse = await fetch(detailsUrl);
      const details = await detailsResponse.json();
      
      console.log(`  ✓ Matched: "${movie.title}"`);
      return details;
    }
    
    return null;
  } catch (error) {
    console.error('  ❌ TMDB search error:', error instanceof Error ? error.message : error);
    return null;
  }
}

/**
 * Search YouTube for trailer
 */
async function searchYouTubeTrailer(title: string): Promise<string | null> {
  if (!YOUTUBE_API_KEY) {
    // Try without API key (limited requests)
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
 * Create slug from title
 */
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Insert new movie into database
 */
async function insertMovie(
  title: string,
  tmdbData: any,
  isNowShowing: boolean,
  cinemaPosterUrl?: string
): Promise<string | null> {
  try {
    const slug = createSlug(title);
    // Use cinema site poster if TMDB didn't have a valid match
    const posterUrl = cinemaPosterUrl || (tmdbData?.poster_path 
      ? `https://image.tmdb.org/t/p/w500${tmdbData.poster_path}` 
      : null);
    const backdropUrl = tmdbData?.backdrop_path 
      ? `https://image.tmdb.org/t/p/original${tmdbData.backdrop_path}` 
      : null;
    
    // Search for trailer
    const trailerKey = await searchYouTubeTrailer(title);
    await wait(500); // Rate limit
    
    const genres = tmdbData?.genres?.map((g: any) => g.name) || [];
    
    const { data, error } = await supabase
      .from('movies')
      .insert({
        tmdb_id: tmdbData?.id || null,
        title: title,
        slug: slug,
        poster_url: posterUrl,
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
        genres: genres,
        overview: tmdbData?.overview || null,
        poster_path: tmdbData?.poster_path,
        backdrop_path: tmdbData?.backdrop_path,
        runtime: tmdbData?.runtime,
        popularity: tmdbData?.popularity || 0,
        scraped_from: ['vox'],
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
 * Update existing movie status
 */
async function updateMovieStatus(
  movieId: string,
  isNowShowing: boolean,
  isComingSoon: boolean
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('movies')
      .update({
        is_now_showing: isNowShowing,
        is_coming_soon: isComingSoon,
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
    tmdbErrors: 0,
  };
  
  try {
    // Step 1: Scrape VOX
    console.log('\n📡 Step 1: Scraping VOX Bahrain...');
    const voxResult = await scrapeVOX();
    stats.voxNowShowing = voxResult.nowShowing.length;
    stats.voxComingSoon = voxResult.comingSoon.length;
    
    // Step 2: Scrape Cineco
    console.log('\n📡 Step 2: Scraping Cineco Bahrain...');
    const cinecoResult = await scrapeCineco();
    stats.cinecoNowShowing = cinecoResult.nowShowing.length;
    stats.cinecoComingSoon = cinecoResult.comingSoon.length;
    
    // Step 3: Merge results (deduplicate)
    console.log('\n🔀 Step 3: Merging results...');
    
    const allNowShowing = [
      ...voxResult.nowShowing,
      ...cinecoResult.nowShowing,
    ];
    const allComingSoon = [
      ...voxResult.comingSoon,
      ...cinecoResult.comingSoon,
    ];
    
    // Deduplicate
    const nowShowingSet = new Set(allNowShowing.map(t => normalizeTitle(t)));
    const comingSoonSet = new Set(allComingSoon.map(t => normalizeTitle(t)));
    
    // Remove from coming soon if also in now showing
    for (const title of nowShowingSet) {
      comingSoonSet.delete(title);
    }
    
    const mergedNowShowing = Array.from(nowShowingSet);
    const mergedComingSoon = Array.from(comingSoonSet);
    
    console.log(`  Merged Now Showing: ${mergedNowShowing.length}`);
    console.log(`  Merged Coming Soon: ${mergedComingSoon.length}`);
    
    // Step 4: Process Now Showing
    console.log('\n📊 Step 4: Processing Now Showing movies...');
    
    for (const title of mergedNowShowing) {
      const existing = await findMovieByTitle(title);
      
      if (existing) {
        // Update existing
        const updated = await updateMovieStatus(existing.id, true, false);
        if (updated) {
          console.log(`  🔄 Updated: ${title} (Now Showing)`);
          stats.updated++;
        }
      } else {
        // Search TMDB and insert new
        console.log(`  🔍 New movie: ${title} - searching TMDB...`);
        const currentYear = new Date().getFullYear();
        const tmdbData = await searchTMDB(title, currentYear);
        await wait(300); // Rate limit
        
        if (tmdbData) {
          const inserted = await insertMovie(title, tmdbData, true);
          if (inserted) {
            stats.added++;
          }
        } else {
          stats.tmdbErrors++;
          console.log(`  ⚠️ Could not find valid TMDB data for: ${title} (may be too old or not in TMDB)`);
        }
      }
    }
    
    // Step 5: Process Coming Soon
    console.log('\n📊 Step 5: Processing Coming Soon movies...');
    
    for (const title of mergedComingSoon) {
      const existing = await findMovieByTitle(title);
      
      if (existing) {
        // Update existing
        const updated = await updateMovieStatus(existing.id, false, true);
        if (updated) {
          console.log(`  🔄 Updated: ${title} (Coming Soon)`);
          stats.updated++;
        }
      } else {
        // Search TMDB and insert new
        console.log(`  🔍 New movie: ${title} - searching TMDB...`);
        const currentYear = new Date().getFullYear();
        const tmdbData = await searchTMDB(title, currentYear);
        await wait(300); // Rate limit
        
        if (tmdbData) {
          const inserted = await insertMovie(title, tmdbData, false);
          if (inserted) {
            stats.added++;
          }
        } else {
          stats.tmdbErrors++;
          console.log(`  ⚠️ Could not find valid TMDB data for: ${title} (may be too old or not in TMDB)`);
        }
      }
    }
    
    // Step 6: Cleanup - remove movies no longer showing
    console.log('\n🧹 Step 6: Cleaning up stale movies...');
    
    // SAFETY: Only cleanup if scraper found movies (prevents wiping everything on failed scrape)
    const totalMoviesFound = mergedNowShowing.length + mergedComingSoon.length;
    const MIN_MOVIES_THRESHOLD = 5;
    
    if (totalMoviesFound === 0) {
      console.log('  ⚠️ WARNING: Scraper found 0 movies! Skipping cleanup to prevent data loss.');
      console.log('  ⚠️ This indicates a problem with the scraper (site may be down or selectors changed).');
      console.log('  ⚠️ Manual intervention required. Existing movies preserved.');
    } else if (totalMoviesFound < MIN_MOVIES_THRESHOLD) {
      console.log(`  ⚠️ WARNING: Scraper found only ${totalMoviesFound} movies (expected ${MIN_MOVIES_THRESHOLD}+).`);
      console.log('  ⚠️ Proceeding with cleanup but watching for false positives.');
      console.log('  ⚠️ If this persists, check if VOX/Cineco site structure changed.');
    } else {
      const { data: staleMovies } = await supabase
        .from('movies')
        .select('id, title')
        .or('is_now_showing.eq.true,is_coming_soon.eq.true');
      
      for (const movie of staleMovies || []) {
        const normTitle = normalizeTitle(movie.title);
        
        // Check if still in any list
        const inNowShowing = nowShowingSet.has(normTitle);
        const inComingSoon = comingSoonSet.has(normTitle);
        
        if (!inNowShowing && !inComingSoon) {
          // Mark as not showing
          await updateMovieStatus(movie.id, false, false);
          console.log(`  🗑️ Removed from showing: ${movie.title}`);
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
    console.log(`Movies Removed from showing: ${stats.removed}`);
    console.log(`TMDB Lookup Failures: ${stats.tmdbErrors}`);
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