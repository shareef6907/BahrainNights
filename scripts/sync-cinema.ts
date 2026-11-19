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
import {
  catalogueTitleMatches,
  fetchOEmbed,
  pickBestSearchResult,
  pickBestTmdbVideo,
} from '../src/lib/trailer-verification';

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
    // Fold diacritics BEFORE stripping punctuation.
    //
    // The old order removed every non a-z0-9 character, which DELETED the
    // accented letter instead of folding it: "Les Misérables" became
    // "lesmisrables" while "Les Miserables" became "lesmiserables". The same
    // film listed by two cinemas under different spellings therefore produced
    // two rows instead of one, and it is why the cinema page showed the same
    // title twice with different sources.
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/^the\s+/i, '')
    .replace(/[^a-z0-9]/g, '')
    .trim();
}

/**
 * Find movie in database by fuzzy title match
 */
async function findMovieByTitle(title: string): Promise<{ id: string; title: string; poster_url?: string | null; scraped_from?: string[] | null } | null> {
  const normalized = normalizeTitle(title);
  
  // Get all movies from database
  const { data: movies } = await supabase
    .from('movies')
    .select('id, title, poster_url, scraped_from')
    .order('title');

  if (!movies || movies.length === 0) return null;

  // Try exact match first (normalized)
  for (const movie of movies) {
    if (normalizeTitle(movie.title) === normalized) {
      console.log(`  ✓ Exact match found: "${movie.title}" for "${title}"`);
      return movie;
    }
  }

  // Try case-insensitive contains
  const lowerTitle = title.toLowerCase();
  for (const movie of movies) {
    const movieLower = movie.title.toLowerCase();
    if (movieLower.includes(lowerTitle) || lowerTitle.includes(movieLower)) {
      // Only match if lengths are similar (avoid "I" matching "I Swear")
      if (Math.abs(movieLower.length - lowerTitle.length) < 10) {
        console.log(`  ✓ Partial match found: "${movie.title}" for "${title}"`);
        return movie;
      }
    }
  }

  // No match found
  return null;
}

/**
 * Search TMDB for a movie by title.
 *
 * The match is VERIFIED, not assumed. A TMDB search for "john doe" returns
 * some unrelated film, and the sync used to write that film's id, poster and
 * synopsis onto a row titled "john doe". So a candidate is only accepted when
 * its title actually refers to the title we searched for.
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
      // Consider the top few candidates, not just the first, and keep only
      // those whose own title refers to the title we searched for.
      const candidates = data.results.slice(0, 5);
      const accepted = candidates.filter((candidate: any) => {
        // A candidate whose title does not BEGIN with the title we searched
        // for is a DIFFERENT film.
        //
        // `catalogueTitleMatches` allows the catalogue title to be a PREFIX
        // of the TMDB title - the scraped "khalifa" is the film "Khalifa:
        // The Ruler" - but not merely to appear somewhere inside it. That is
        // what keeps "english" from claiming "Johnny English".
        const acceptable = catalogueTitleMatches(title, candidate.title);
        if (!acceptable) {
          console.log(`  ⚠️ Rejecting TMDB match "${candidate.title}" for "${title}" (no title overlap)`);
        }
        return acceptable;
      });

      if (!accepted.length) {
        console.log(`  ⚠️ No TMDB candidate for "${title}" matched the title`);
        return null;
      }

      const movie = accepted[0];
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
 * Find a trailer for a film.
 *
 * The ORIGINAL implementation searched YouTube for "<title> official trailer"
 * and took the FIRST hit, with no check that the hit belonged to the film. That
 * is how a crypto video ended up as the trailer for a Tamil thriller, and how
 * 115 wrong trailers accumulated across the catalogue.
 *
 * The order of preference:
 *
 *   1. The cinema's OWN trailer. The Cineco and VOX pages embed the exact
 *      YouTube key for the film they list, so it is authoritative and needs
 *      no searching at all.
 *   2. TMDB's own video list for the film.
 *   3. A YouTube search, but only a result whose own title names the film.
 *
 * Returns null when nothing can be positively matched. An empty trailer is
 * better than a wrong one.
 */
async function findTrailer(
  title: string,
  cinemaTrailerUrl?: string,
  tmdbData?: any,
  filmTitles?: string[]
): Promise<{ key: string; source: string } | null> {
  // ---- Source 1: the cinema's own trailer link ------------------------
  if (cinemaTrailerUrl) {
    const match = cinemaTrailerUrl.match(/[?&]v=([A-Za-z0-9_-]{11})/);
    if (match) {
      const oembed = await fetchOEmbed(match[1]);
      if (oembed.status === 200) {
        console.log(`  🎬 Using the cinema's own trailer (${match[1]})`);
        return { key: match[1], source: 'cinema' };
      }
    }
  }

  // ---- Source 2: TMDB's own video list --------------------------------
  const titles = filmTitles?.length ? filmTitles : [title];
  if (tmdbData?.videos?.results?.length) {
    const oembedCache = new Map<string, string>();
    for (const video of tmdbData.videos.results) {
      if (video.site !== 'YouTube' || !video.key) continue;
      if (video.type === 'Behind the Scenes' || video.type === 'Bloopers' || video.type === 'Featurette') continue;
      const oembed = await fetchOEmbed(video.key);
      if (oembed.status === 200) oembedCache.set(video.key, oembed.title);
    }

    const best = pickBestTmdbVideo(
      tmdbData.videos.results,
      titles,
      (key) => oembedCache.get(key) ?? null
    );
    if (best) {
      console.log(`  🎬 Using TMDB trailer (${best.key}) - ${best.reason}`);
      return { key: best.key, source: 'tmdb' };
    }
  }

  // ---- Source 3: YouTube search, verified ------------------------------
  if (!YOUTUBE_API_KEY) return null;

  try {
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(title + ' official trailer')}&type=video&maxResults=10&key=${YOUTUBE_API_KEY}`;
    const response = await fetch(searchUrl);
    const data = await response.json();
    if (!data.items?.length) return null;

    const candidates = data.items.map((item: any) => ({
      videoId: item.id.videoId as string,
      title: item.snippet.title as string,
      channelTitle: item.snippet.channelTitle as string,
    }));

    const best = pickBestSearchResult(candidates, titles);
    if (!best) {
      console.log(`  ⚠️ No YouTube result for "${title}" could be matched to the film - leaving the trailer empty`);
      return null;
    }

    const oembed = await fetchOEmbed(best.key);
    if (oembed.status !== 200) return null;

    console.log(`  🎬 Using verified YouTube trailer (${best.key}) - ${best.reason}`);
    return { key: best.key, source: 'youtube-search' };
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
 * Find a row by TMDB id.
 *
 * tmdb_id carries a UNIQUE index (movies_tmdb_id_key), so this is an indexed
 * lookup and there can be at most one match.
 */
async function findMovieByTmdbId(tmdbId: number): Promise<{ id: string; slug: string } | null> {
  const { data } = await supabase
    .from('movies')
    .select('id, slug')
    .eq('tmdb_id', tmdbId)
    .maybeSingle();
  return (data as { id: string; slug: string } | null) || null;
}

/**
 * Find a row by slug. slug carries a UNIQUE constraint.
 */
async function findMovieBySlug(slug: string): Promise<{ id: string; slug: string; tmdb_id: number | null } | null> {
  const { data } = await supabase
    .from('movies')
    .select('id, slug, tmdb_id')
    .eq('slug', slug)
    .maybeSingle();
  return (data as { id: string; slug: string; tmdb_id: number | null } | null) || null;
}

/**
 * Work out a slug that is safe to write.
 *
 * The slug is published in the sitemap and in search results, so it must not
 * change from one sync to the next. The rules:
 *
 *   - If the film is already in the table under this TMDB id, its EXISTING
 *     slug is reused. A re-sync never churns a published URL.
 *   - Otherwise the plain slug of the canonical title is used, and if that is
 *     already held by a DIFFERENT film it is disambiguated with the TMDB id
 *     (matching the convention the table already uses, e.g. "rocky-1366").
 */
async function resolveSlug(canonicalTitle: string, tmdbId: number | null, source: string): Promise<string> {
  const base = createSlug(canonicalTitle);
  if (!base) return `movie-${Date.now()}`;

  const holder = await findMovieBySlug(base);
  if (!holder) return base;

  // The slug is held by the same film (same TMDB id, or both without one) -
  // keep it.
  if (tmdbId !== null && holder.tmdb_id === tmdbId) return base;
  if (tmdbId === null && holder.tmdb_id === null) return base;

  const withId = tmdbId !== null ? `${base}-${tmdbId}` : `${base}-${source}`;
  if (!(await findMovieBySlug(withId))) return withId;

  let n = 2;
  while (await findMovieBySlug(`${withId}-${n}`)) n++;
  return `${withId}-${n}`;
}

/**
 * Write a film into the table, updating it in place when it is already there.
 *
 * WHY AN UPSERT AND NOT AN INSERT
 * -------------------------------
 * The old code used `.insert(`. On 2026-11-18 that produced, in the
 * production log:
 *
 *   ❌ Error inserting "OM - Chapter 1: Udhiram - The Blood":
 *      duplicate key value violates unique constraint "movies_tmdb_id_key"
 *
 * The film was simply LOST - the error was logged and the sync moved on. An
 * upsert on the same unique key updates the existing row instead of failing.
 *
 * THE NULL tmdb_id PROBLEM
 * ------------------------
 * `ON CONFLICT` never fires for a NULL key, so an upsert on `tmdb_id` would
 * INSERT a brand new row on every single run for a film that TMDB does not
 * know about - the table would grow a duplicate every run.
 *
 * The strategy is therefore two conflict targets:
 *
 *   - the film HAS a TMDB id  -> conflict on `tmdb_id` (there is a UNIQUE
 *     index on it, movies_tmdb_id_key), so the same film updates in place
 *     even when its title spelling changed;
 *   - the film has NO TMDB id -> conflict on `slug`, which is UNIQUE and NOT
 *     NULL on every row, so the film still updates in place instead of
 *     duplicating.
 *
 * Only fields we actually know are written. A run with no TMDB data does not
 * blank out a poster, a rating or a release date that a previous run stored.
 */
async function upsertMovie(
  title: string,
  tmdbData: any,
  isNowShowing: boolean,
  cinemaPosterUrl?: string,
  source: string = 'vox',
  cinemaTrailerUrl?: string
): Promise<string | null> {
  try {
    // Prefer TMDB's own title. Fall back to the scraped title only when TMDB
    // gave us nothing.
    const canonicalTitle = tmdbData?.title || title;
    const tmdbId: number | null = tmdbData?.id ?? null;

    // Use cinema site poster if TMDB didn't have a valid match
    const posterUrl = cinemaPosterUrl || (tmdbData?.poster_path
      ? `https://image.tmdb.org/t/p/w500${tmdbData.poster_path}`
      : null);
    const backdropUrl = tmdbData?.backdrop_path
      ? `https://image.tmdb.org/t/p/original${tmdbData.backdrop_path}`
      : tmdbData?.poster_path
        ? `https://image.tmdb.org/t/p/w500${tmdbData.poster_path}`
        : null;

    // Reuse the slug the film already has, so a re-sync never churns a URL
    // that the sitemap has published.
    const existingByTmdb = tmdbId !== null ? await findMovieByTmdbId(tmdbId) : null;
    const slug = existingByTmdb?.slug ?? (await resolveSlug(canonicalTitle, tmdbId, source));

    // Find a trailer that has been positively matched to this film. The
    // cinema's own trailer is preferred; TMDB's video list next; a YouTube
    // search only if its result's own title names the film.
    const filmTitles = [canonicalTitle, title, tmdbData?.original_title].filter(Boolean);
    const trailer = await findTrailer(canonicalTitle, cinemaTrailerUrl, tmdbData, filmTitles);

    const genres = tmdbData?.genres?.map((g: any) => g.name) || [];

    // Fields that are always safe to write.
    const payload: Record<string, unknown> = {
      title: canonicalTitle,
      slug,
      is_now_showing: isNowShowing,
      is_coming_soon: !isNowShowing,
      scraped_from: [source],
      updated_at: new Date().toISOString(),
    };

    // TMDB fields are only written when we actually have them. Writing a
    // null would blank out a value a previous run stored.
    if (tmdbData) {
      payload.tmdb_id = tmdbId;
      if (posterUrl) payload.poster_url = posterUrl;
      if (backdropUrl) payload.backdrop_url = backdropUrl;
      payload.duration_minutes = tmdbData.runtime || null;
      payload.genre = genres;
      payload.rating = tmdbData.release_dates?.results?.[0]?.release_dates?.[0]?.certification || null;
      payload.synopsis = tmdbData.overview || null;
      payload.release_date = tmdbData.release_date || null;
      payload.language = tmdbData.original_language || null;
      payload.director = tmdbData.credits?.crew?.find((c: any) => c.job === 'Director')?.name || null;
      payload.movie_cast = tmdbData.credits?.cast?.slice(0, 5).map((c: any) => c.name) || null;
      payload.tmdb_rating = tmdbData.vote_average || null;
      // Only a trailer that was matched to THIS film is written. When
      // nothing matched, the trailer stays empty rather than being filled
      // with an unrelated video.
      payload.trailer_key = trailer?.key ?? null;
      payload.trailer_url = trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
      payload.genres = genres;
      payload.overview = tmdbData.overview || null;
      payload.poster_path = tmdbData.poster_path;
      payload.backdrop_path = tmdbData.backdrop_path;
      payload.runtime = tmdbData.runtime;
      payload.popularity = tmdbData.popularity || 0;
    } else if (cinemaPosterUrl) {
      // No TMDB data, but the cinema published artwork for the film.
      payload.poster_url = cinemaPosterUrl;
    }

    // Merge the source list rather than overwriting it: a film showing at
    // both VOX and Cineco must list BOTH, and whichever cinema happened to be
    // scraped first must not erase the other.
    const existingRow = existingByTmdb ?? (await findMovieBySlug(slug));
    if (existingRow) {
      const existingSources = Array.isArray((existingRow as any).scraped_from)
        ? (existingRow as any).scraped_from
        : [];
      const merged = Array.from(new Set([...existingSources, source]));
      if (merged.length) payload.scraped_from = merged;
    }

    const onConflict = tmdbId !== null ? 'tmdb_id' : 'slug';

    const { data, error } = await supabase
      .from('movies')
      .upsert(payload as any, { onConflict })
      .select('id')
      .single();

    if (error) {
      console.error(`  ❌ Error upserting "${canonicalTitle}":`, error.message);
      return null;
    }

    console.log(`  ✅ ${existingRow ? 'Updated' : 'Added'}: ${canonicalTitle}`);
    return data?.id || null;
  } catch (error) {
    console.error(`  ❌ Error adding "${title}":`, error instanceof Error ? error.message : error);
    return null;
  }
}

/**
 * Backfill the artwork for a film that is already in the table but has no
 * poster.
 *
 * WHY: a film that is showing must never be invisible. The page used to drop
 * every row without a poster, which hid 17 of the 29 now-showing films. Some
 * of those can be given a real poster from TMDB, and the rest get a branded
 * fallback card.
 *
 * Only the ARTWORK and the rating are written. The release date and the
 * tmdb_id are deliberately left alone:
 *
 *   - release_date decides which row wins the page's dedupe, and a row with
 *     no date is always the furthest from the current cinema window, which is
 *     exactly the behaviour we want;
 *   - tmdb_id has a UNIQUE index, and the film may already have a sibling row
 *     carrying that id, so writing it would fail with a duplicate key.
 */
async function backfillPoster(
  movieId: string,
  title: string,
  currentYear: number
): Promise<boolean> {
  try {
    const tmdbData = await searchTMDB(title, currentYear);
    if (!tmdbData) return false;

    const posterUrl = tmdbData.poster_path
      ? `https://image.tmdb.org/t/p/w500${tmdbData.poster_path}`
      : null;
    if (!posterUrl) return false;

    const update: Record<string, unknown> = {
      poster_url: posterUrl,
      poster_path: tmdbData.poster_path,
      updated_at: new Date().toISOString(),
    };
    if (tmdbData.vote_average) update.tmdb_rating = tmdbData.vote_average;

    const { error } = await supabase
      .from('movies')
      .update(update)
      .eq('id', movieId);

    if (error) {
      console.error(`  ❌ Error backfilling poster for "${title}":`, error.message);
      return false;
    }

    console.log(`  🖼️  Backfilled poster from TMDB: ${title}`);
    return true;
  } catch (error) {
    console.error(`  ❌ Error backfilling poster for "${title}":`, error instanceof Error ? error.message : error);
    return false;
  }
}

/**
 * Update existing movie status
 */
async function updateMovieStatus(
  movieId: string,
  isNowShowing: boolean,
  isComingSoon: boolean,
  source?: string,
  currentSources?: string[] | null
): Promise<boolean> {
  try {
    const update: Record<string, unknown> = {
      is_now_showing: isNowShowing,
      is_coming_soon: isComingSoon,
      updated_at: new Date().toISOString(),
    };

    // Keep the source list accurate. A film showing at both VOX and Cineco
    // must list BOTH, and a movie that already carries a source must not have
    // it overwritten by whichever cinema happened to be scraped first.
    if (source) {
      const existing = Array.isArray(currentSources) ? currentSources : [];
      const merged = Array.from(new Set([...existing, source]));
      if (merged.length) update.scraped_from = merged;
    }

    const { error } = await supabase
      .from('movies')
      .update(update)
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

    // Track WHICH cinema each title came from.
    //
    // The old code pooled the VOX and Cineco title lists into one array and
    // then wrote `scraped_from: ['vox']` on every insert. The source was
    // destroyed at merge time and hard-coded afterwards, so a Cineco-only
    // film was recorded as a VOX film and a film showing at both was
    // recorded as a VOX film too. `scraped_from` is what the cinema page and
    // the orphan check read, so the whole source breakdown was wrong.
    const sourceByTitle = new Map<string, Set<string>>();

    // The trailer the cinema itself publishes for each film, keyed by the
    // same normalised title. This is authoritative: it is the trailer the
    // cinema is actually showing, so it never needs a search.
    const cinemaTrailerByTitle = new Map<string, string>();

    const addWithSource = (titles: string[], source: string) => {
      for (const t of titles) {
        const key = normalizeTitle(t);
        if (!key) continue;
        if (!sourceByTitle.has(key)) sourceByTitle.set(key, new Set());
        sourceByTitle.get(key)!.add(source);
      }
    };
    addWithSource(voxResult.nowShowing, 'vox');
    addWithSource(cinecoResult.nowShowing.map((m) => m.title), 'cineco');
    addWithSource(voxResult.comingSoon, 'vox');
    addWithSource(cinecoResult.comingSoon.map((m) => m.title), 'cineco');

    for (const movie of [...cinecoResult.nowShowing, ...cinecoResult.comingSoon]) {
      if (!movie.trailerKey) continue;
      const key = normalizeTitle(movie.title);
      if (key && !cinemaTrailerByTitle.has(key)) {
        cinemaTrailerByTitle.set(key, movie.trailerKey);
      }
    }

    // The title we keep for a group is the first spelling we saw for it.
    const labelByTitle = new Map<string, string>();
    for (const list of [voxResult.nowShowing, cinecoResult.nowShowing.map((m) => m.title), voxResult.comingSoon, cinecoResult.comingSoon.map((m) => m.title)]) {
      for (const t of list) {
        const key = normalizeTitle(t);
        if (key && !labelByTitle.has(key)) labelByTitle.set(key, t);
      }
    }

    // Deduplicate
    const nowShowingSet = new Set(
      [...voxResult.nowShowing, ...cinecoResult.nowShowing.map((m) => m.title)].map(normalizeTitle),
    );
    const comingSoonSet = new Set(
      [...voxResult.comingSoon, ...cinecoResult.comingSoon.map((m) => m.title)].map(normalizeTitle),
    );

    // Remove from coming soon if also in now showing
    for (const title of nowShowingSet) {
      comingSoonSet.delete(title);
    }

    const mergedNowShowing = Array.from(nowShowingSet).map(k => labelByTitle.get(k) || k);
    const mergedComingSoon = Array.from(comingSoonSet).map(k => labelByTitle.get(k) || k);

    // The source(s) each merged title belongs to.
    const sourcesFor = (title: string): string[] => {
      const set = sourceByTitle.get(normalizeTitle(title));
      return set ? Array.from(set) : ['vox'];
    };

    console.log(`  Merged Now Showing: ${mergedNowShowing.length}`);
    console.log(`  Merged Coming Soon: ${mergedComingSoon.length}`);

    // Step 4: Process Now Showing
    console.log('\n📊 Step 4: Processing Now Showing movies...');

    for (const title of mergedNowShowing) {
      const existing = await findMovieByTitle(title);
      const sources = sourcesFor(title);

      if (existing) {
        // Update existing
        const updated = await updateMovieStatus(existing.id, true, false, sources[0], existing.scraped_from);
        if (updated) {
          console.log(`  🔄 Updated: ${title} (Now Showing) [${sources.join('+')}]`);
          stats.updated++;
        }

        // A film that is showing must never be invisible. If this row has no
        // artwork, try to give it a real poster from TMDB. The rest fall back
        // to the branded poster card on the page.
        if (!existing.poster_url) {
          const currentYear = new Date().getFullYear();
          await backfillPoster(existing.id, title, currentYear);
          await wait(300); // Rate limit
        }
      } else {
        // Search TMDB and write the film.
        console.log(`  🔍 New movie: ${title} - searching TMDB...`);
        const currentYear = new Date().getFullYear();
        const tmdbData = await searchTMDB(title, currentYear);
        await wait(300); // Rate limit

        if (!tmdbData) {
          // No TMDB match - but the film IS screening, so it must still be
          // written. The old code skipped it entirely, which is how films
          // ended up missing from the page altogether.
          console.log(`  ⚠️ No valid TMDB data for "${title}" - writing the film without it.`);
          stats.tmdbErrors++;
        }

        const inserted = await upsertMovie(
          title,
          tmdbData,
          true,
          undefined,
          sources[0],
          cinemaTrailerByTitle.get(normalizeTitle(title))
        );
        if (inserted) {
          stats.added++;
        }
      }
    }

    // Step 5: Process Coming Soon
    console.log('\n📊 Step 5: Processing Coming Soon movies...');

    for (const title of mergedComingSoon) {
      const existing = await findMovieByTitle(title);
      const sources = sourcesFor(title);

      if (existing) {
        // Update existing
        const updated = await updateMovieStatus(existing.id, false, true, sources[0], existing.scraped_from);
        if (updated) {
          console.log(`  🔄 Updated: ${title} (Coming Soon) [${sources.join('+')}]`);
          stats.updated++;
        }

        if (!existing.poster_url) {
          const currentYear = new Date().getFullYear();
          await backfillPoster(existing.id, title, currentYear);
          await wait(300); // Rate limit
        }
      } else {
        // Search TMDB and write the film.
        console.log(`  🔍 New movie: ${title} - searching TMDB...`);
        const currentYear = new Date().getFullYear();
        const tmdbData = await searchTMDB(title, currentYear);
        await wait(300); // Rate limit

        if (!tmdbData) {
          console.log(`  ⚠️ No valid TMDB data for "${title}" - writing the film without it.`);
          stats.tmdbErrors++;
        }

        const inserted = await upsertMovie(
          title,
          tmdbData,
          false,
          undefined,
          sources[0],
          cinemaTrailerByTitle.get(normalizeTitle(title))
        );
        if (inserted) {
          stats.added++;
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