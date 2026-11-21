#!/usr/bin/env npx tsx

/**
 * Cinema Sync - Main Orchestrator
 * Scrapes VOX & Cineco, syncs with database using TMDB
 *
 * Run: npx tsx scripts/sync-cinema.ts
 */

import fs from 'node:fs';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';
import { scrapeVOX } from './scrape-vox';
import { scrapeCineco } from './scrape-cineco';
import {
  catalogueTitleMatches,
  fetchOEmbed,
  pickBestSearchResult,
  pickBestTmdbVideo,
} from '../src/lib/trailer-verification';
import { decideCleanup } from './cinema-cleanup-guard';
import { applyTitleOverride, getMovieOverride } from '../src/lib/cinema/admin-overrides';
import { validateBookingUrl, validateBookingUrls } from '../src/lib/cinema/booking-url-validation';

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
/**
 * The result of a title lookup: an EXACT match, a FUZZY candidate, or
 * nothing.
 *
 * A fuzzy candidate is NOT a match. It is a possibility that a human has to
 * decide on.
 */
export interface TitleLookup {
  exact: { id: string; title: string; poster_url?: string | null; scraped_from?: string[] | null } | null;
  /** A near-miss candidate. NEVER applied automatically. */
  fuzzy: { id: string; title: string } | null;
}

async function findMovieByTitle(title: string): Promise<TitleLookup> {
  const normalized = normalizeTitle(title);

  // Get all movies from database
  const { data: movies } = await supabase
    .from('movies')
    .select('id, title, poster_url, scraped_from')
    .order('title');

  if (!movies || movies.length === 0) return { exact: null, fuzzy: null };

  // Try exact match first (normalized)
  for (const movie of movies) {
    if (normalizeTitle(movie.title) === normalized) {
      console.log(`  ✓ Exact match found: "${movie.title}" for "${title}"`);
      return { exact: movie, fuzzy: null };
    }
  }

  /*
   * FUZZY MATCHING — NO LONGER APPLIED AUTOMATICALLY.
   *
   * The old code fell through to a "contains" match and wrote the found row
   * as if it were the same film. That is how "Fate" came to claim a video
   * for a completely different film, and it is how two DIFFERENT films
   * collapse into one row.
   *
   * A contains-match is now only ever REPORTED. The row is not updated and
   * the title is not written to it; instead the pair is recorded for a human
   * to merge by hand (see `flagForManualMerge`).
   *
   * The length guard is kept only to pick the BEST candidate to report.
   */
  const lowerTitle = title.toLowerCase();
  let best: { id: string; title: string } | null = null;
  let bestDelta = Number.POSITIVE_INFINITY;

  for (const movie of movies) {
    const movieLower = movie.title.toLowerCase();
    if (movieLower.includes(lowerTitle) || lowerTitle.includes(movieLower)) {
      const delta = Math.abs(movieLower.length - lowerTitle.length);
      // Only consider it a candidate if lengths are similar (avoid "I"
      // matching "I Swear").
      if (delta < 10 && delta < bestDelta) {
        best = { id: movie.id, title: movie.title };
        bestDelta = delta;
      }
    }
  }

  return { exact: null, fuzzy: best };
}

/**
 * Record a title that could not be matched exactly, for a human to merge.
 *
 * The report is WRITTEN BY THE SYNC AT RUNTIME into `reports/`, so it always
 * reflects the run that produced it. It is a machine-readable artifact: one
 * JSON object per flagged title, with the scraped title, the candidate, the
 * candidate's movie id, and the reason.
 *
 * The point is that the pair is never merged automatically. A misspellings
 * merge is a judgement call, and the observed real pairs — "Three Wishes for
 * Cindrella" vs "Three Wishes for Cinderella", "Om CH.1 Udhiram:the Blood
 * Wood" vs "OM - Chapter 1: Udhiram - The Blood" — are exactly the cases
 * where an automatic merge does the wrong thing.
 */
const MANUAL_MERGE_REPORT = path.join(process.cwd(), 'reports', 'cinema-manual-merge.json');

export function flagForManualMerge(
  scrapedTitle: string,
  candidate: { id: string; title: string },
  reason: string
): void {
  const entry = {
    scraped_title: scrapedTitle,
    candidate_movie_id: candidate.id,
    candidate_title: candidate.title,
    reason,
    flagged_at: new Date().toISOString(),
  };

  try {
    fs.mkdirSync(path.dirname(MANUAL_MERGE_REPORT), { recursive: true });
    let existing: unknown[] = [];
    try {
      const raw = fs.readFileSync(MANUAL_MERGE_REPORT, 'utf8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) existing = parsed;
    } catch {
      /* no previous report */
    }
    // Replace an earlier flag for the same scraped title rather than
    // appending a duplicate every run.
    const without = existing.filter(
      (e: any) => !(e && e.scraped_title === scrapedTitle)
    );
    without.push(entry);
    fs.writeFileSync(MANUAL_MERGE_REPORT, JSON.stringify(without, null, 2));
    console.log(
      `  ⚠️  NEEDS MANUAL MERGE: "${scrapedTitle}" ≈ "${candidate.title}" — ` +
        `recorded in ${path.relative(process.cwd(), MANUAL_MERGE_REPORT)} (not merged automatically)`
    );
  } catch (err) {
    console.warn('  ⚠️  Could not write the manual-merge report:', err);
  }
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
  //
  // The cinema's trailer may arrive as a bare YouTube key (which is what the
  // scrapers read off the page) or as a full URL. Both are accepted, and
  // either way the key goes through the SAME oEmbed check every other
  // trailer goes through — an unverified trailer is never stored.
  if (cinemaTrailerUrl) {
    const keyMatch =
      cinemaTrailerUrl.match(/[?&]v=([A-Za-z0-9_-]{11})/) ||
      (/^[A-Za-z0-9_-]{11}$/.test(cinemaTrailerUrl)
        ? [cinemaTrailerUrl, cinemaTrailerUrl]
        : null);
    if (keyMatch) {
      const key = keyMatch[1];
      const oembed = await fetchOEmbed(key);
      if (oembed.status === 200) {
        console.log(`  🎬 Using the cinema's own trailer (${key})`);
        return { key, source: 'cinema' };
      }
      console.log(`  ⚠️ The cinema's trailer did not verify (${key}) - ignoring it.`);
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
 * Read the booking URLs already stored for a film.
 *
 * The `booking_urls` column is added by a MANUAL script that has not been run
 * yet, so a plain `.select('booking_urls')` would fail with 42703 on a
 * database without it — and that failure must not stop the sync. This reads
 * the column on its own and degrades to an empty map.
 */
async function readExistingBookingUrls(movieId: string): Promise<Record<string, string>> {
  try {
    const { data, error } = await supabase
      .from('movies')
      .select('booking_urls')
      .eq('id', movieId)
      .maybeSingle();
    if (error) return {};
    const value = (data as any)?.booking_urls;
    if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
    const out: Record<string, string> = {};
    for (const [cinema, url] of Object.entries(value as Record<string, unknown>)) {
      if (typeof url === 'string' && url.trim()) out[cinema] = url.trim();
    }
    return out;
  } catch {
    return {};
  }
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
  cinemaTrailerUrl?: string,
  bookingUrl?: string,
  cinemaFields?: {
    durationMinutes?: number;
    synopsis?: string;
    language?: string;
  }
): Promise<string | null> {
  try {
    // Prefer TMDB's own title. Fall back to the scraped title only when TMDB
    // gave us nothing.
    const rawTitle = tmdbData?.title || title;
    const tmdbId: number | null = tmdbData?.id ?? null;

    /*
     * The admin override.
     *
     * A cinema may list a film under a short name that is not its real
     * title — VOX lists TMDB 1719068 as "Crypto", but the film is "Tales
     * from the Crypto". The scraped title must not win, so the override
     * replaces it.
     *
     * The override is applied HERE, before the payload is built, so that the
     * title AND the slug are both derived from the corrected title and the
     * override survives every re-sync.
     */
    const canonicalTitle = applyTitleOverride(rawTitle, tmdbId);
    if (canonicalTitle !== rawTitle) {
      const override = getMovieOverride(tmdbId);
      console.log(
        `  ⭐ Admin override applied: "${rawTitle}" -> "${canonicalTitle}"` +
          (override?.note ? ` (${override.note})` : '')
      );
    }

    /*
     * THE POSTER, in the order the brief requires:
     *
     *   1. TMDB's poster   — highest quality, and it is the one that matches
     *                         the film the audience already knows.
     *   2. The cinema's own — which is what every film has, including the
     *                         local-language and live-viewing films TMDB has
     *                         never heard of.
     *
     * Before this, the cinema's poster won, which put a low-resolution
     * listing image on films that had a proper TMDB poster.
     */
    const posterUrl = (tmdbData?.poster_path
      ? `https://image.tmdb.org/t/p/w500${tmdbData.poster_path}`
      : null) || cinemaPosterUrl || null;
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
      payload.genre = genres;
      payload.rating = tmdbData.release_dates?.results?.[0]?.release_dates?.[0]?.certification || null;
      payload.release_date = tmdbData.release_date || null;
      payload.director = tmdbData.credits?.crew?.find((c: any) => c.job === 'Director')?.name || null;
      payload.movie_cast = tmdbData.credits?.cast?.slice(0, 5).map((c: any) => c.name) || null;
      payload.tmdb_rating = tmdbData.vote_average || null;
      // Only a trailer that was matched to THIS film is written. When
      // nothing matched, the trailer stays empty rather than being filled
      // with an unrelated video.
      payload.trailer_key = trailer?.key ?? null;
      payload.trailer_url = trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
      payload.genres = genres;
      payload.poster_path = tmdbData.poster_path;
      payload.backdrop_path = tmdbData.backdrop_path;
      payload.popularity = tmdbData.popularity || 0;

      /*
       * The runtime, the synopsis and the language.
       *
       * TMDB's value is preferred, but TMDB has no runtime for a lot of the
       * films that actually screen in Bahrain. Writing `null` there blanked
       * the runtime for those films and they rendered as "0min" on the card.
       * The cinema publishes the real runtime, so it is used when TMDB is
       * silent.
       */
      const durationMinutes = tmdbData.runtime || cinemaFields?.durationMinutes;
      if (durationMinutes) {
        payload.duration_minutes = durationMinutes;
        payload.runtime = durationMinutes;
      }
      const synopsis = tmdbData.overview || cinemaFields?.synopsis;
      if (synopsis) {
        payload.synopsis = synopsis;
        payload.overview = synopsis;
      }
      const language = tmdbData.original_language || cinemaFields?.language;
      if (language) payload.language = language;
    } else {
      /*
       * NO TMDB MATCH.
       *
       * The film is screening, so it is written — but it is written with what
       * the CINEMA published: the poster, the runtime, the synopsis, the
       * language and the trailer. Before this, such a film was written with a
       * bare title and nothing else, which is what produced the "BAHRAIN
       * NIGHTS" placeholder cards.
       */
      if (cinemaPosterUrl) payload.poster_url = cinemaPosterUrl;
      if (cinemaFields?.durationMinutes) {
        payload.duration_minutes = cinemaFields.durationMinutes;
        payload.runtime = cinemaFields.durationMinutes;
      }
      if (cinemaFields?.synopsis) {
        payload.synopsis = cinemaFields.synopsis;
        payload.overview = cinemaFields.synopsis;
      }
      if (cinemaFields?.language) payload.language = cinemaFields.language;
      // The cinema's own trailer is authoritative for the film it lists, but
      // it is only stored after the same oEmbed check every other trailer
      // goes through, so an unverified trailer is never stored.
      if (!trailer && cinemaTrailerUrl) {
        const oembed = await fetchOEmbed(cinemaTrailerUrl);
        if (oembed.status === 200) {
          payload.trailer_key = cinemaTrailerUrl;
          payload.trailer_url = `https://www.youtube.com/watch?v=${cinemaTrailerUrl}`;
        }
      }
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

    /*
     * The per-film booking URL.
     *
     * It is written ONLY after it has been verified to answer HTTP 200 — a
     * Book button that lands on a 404 is worse than no Book button. It is
     * also MERGED with whatever the row already holds, so a film listed at
     * both VOX and Cineco keeps both URLs across a re-sync that only sees one
     * of them.
     *
     * The `booking_urls` column is added by a MANUAL script that has not
     * been run yet, so a write against a database without the column fails
     * with 42703. That must not take the film write down with it, so the
     * column is probed once and, when it is missing, the payload is written
     * without it.
     */
    if (bookingUrl) {
      const verified = await validateBookingUrl(bookingUrl);
      if (verified) {
        const existingUrls = existingRow ? await readExistingBookingUrls(existingRow.id) : {};
        payload.booking_urls = { ...existingUrls, [source]: bookingUrl };
      } else {
        console.log(`  ⚠️ Booking URL did not resolve (skipped): ${bookingUrl}`);
      }
    }

    const onConflict = tmdbId !== null ? 'tmdb_id' : 'slug';

    let { data, error } = await supabase
      .from('movies')
      .upsert(payload as any, { onConflict })
      .select('id')
      .single();

    // The `booking_urls` column may not exist yet (the migration is manual).
    // Retry without it rather than losing the film.
    if (error && /booking_urls|column/i.test(error.message || '')) {
      console.warn(
        '  ⚠️ `movies.booking_urls` is not present in the database — writing the film without it. ' +
          'Run: docs/sql/2026-11-20-add-movies-booking-urls.sql (manual), then re-run the cinema sync.'
      );
      delete payload.booking_urls;
      const retry = await supabase
        .from('movies')
        .upsert(payload as any, { onConflict })
        .select('id')
        .single();
      data = retry.data;
      error = retry.error;
    }

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
/**
 * Give a film that has no poster one.
 *
 * TMDB first, then the cinema's own artwork.
 *
 * The cinema fallback is the important one. TMDB has never heard of most of
 * the local-language films and the live viewings, so a TMDB-only backfill
 * left them posterless — and a posterless film rendered as a "BAHRAIN NIGHTS"
 * placeholder card. Every film the cinema lists has a poster on the
 * cinema's own page, so the poster is always available there.
 */
async function backfillPoster(
  movieId: string,
  title: string,
  currentYear: number,
  cinemaPosterUrl?: string,
  cinemaFields?: {
    durationMinutes?: number;
    synopsis?: string;
    language?: string;
    trailerKey?: string;
  }
): Promise<boolean> {
  try {
    const tmdbData = await searchTMDB(title, currentYear);

    const posterUrl = (tmdbData?.poster_path
      ? `https://image.tmdb.org/t/p/w500${tmdbData.poster_path}`
      : null) || cinemaPosterUrl || null;
    if (!posterUrl) return false;

    const update: Record<string, unknown> = {
      poster_url: posterUrl,
      updated_at: new Date().toISOString(),
    };
    if (tmdbData?.poster_path) update.poster_path = tmdbData.poster_path;
    if (tmdbData?.vote_average) update.tmdb_rating = tmdbData.vote_average;

    // The runtime and the synopsis, when TMDB has none but the cinema does.
    const durationMinutes = tmdbData?.runtime || cinemaFields?.durationMinutes;
    if (durationMinutes) {
      update.duration_minutes = durationMinutes;
      update.runtime = durationMinutes;
    }
    const synopsis = tmdbData?.overview || cinemaFields?.synopsis;
    if (synopsis) {
      update.synopsis = synopsis;
      update.overview = synopsis;
    }
    const language = tmdbData?.original_language || cinemaFields?.language;
    if (language) update.language = language;

    // The cinema's trailer, but only after it verifies.
    if (cinemaFields?.trailerKey) {
      const oembed = await fetchOEmbed(cinemaFields.trailerKey);
      if (oembed.status === 200) {
        update.trailer_key = cinemaFields.trailerKey;
        update.trailer_url = `https://www.youtube.com/watch?v=${cinemaFields.trailerKey}`;
      }
    }

    const { error } = await supabase
      .from('movies')
      .update(update)
      .eq('id', movieId);

    if (error) {
      console.error(`  ❌ Error backfilling poster for "${title}":`, error.message);
      return false;
    }

    const from = tmdbData?.poster_path ? 'TMDB' : 'the cinema';
    console.log(`  🖼️  Backfilled poster from ${from}: ${title}`);
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
  currentSources?: string[] | null,
  bookingUrls?: Record<string, string>
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

    /*
     * The per-film booking URLs.
     *
     * Only URLs that have been verified to answer HTTP 200 are stored, and
     * they are MERGED with the URLs the row already holds — so a re-sync that
     * only sees VOX does not erase the Cineco URL.
     *
     * As with the insert path, the column may not exist yet (the migration is
     * manual). If the write fails because of it, the rest of the update is
     * retried without the column.
     */
    if (bookingUrls && Object.keys(bookingUrls).length > 0) {
      const existingUrls = await readExistingBookingUrls(movieId);
      const mergedUrls = { ...existingUrls, ...bookingUrls };
      if (Object.keys(mergedUrls).length > 0) {
        update.booking_urls = mergedUrls;
      }
    }

    const { error } = await supabase
      .from('movies')
      .update(update)
      .eq('id', movieId);

    if (error) {
      // The `booking_urls` column may not exist yet. Retry the rest of the
      // update without it rather than losing the film's status change.
      if (/booking_urls|column/i.test(error.message || '') && update.booking_urls) {
        console.warn(
          '  ⚠️ `movies.booking_urls` is not present in the database — updating the film without it. ' +
            'Run: docs/sql/2026-11-20-add-movies-booking-urls.sql (manual), then re-run the cinema sync.'
        );
        delete update.booking_urls;
        const retry = await supabase
          .from('movies')
          .update(update)
          .eq('id', movieId);
        if (retry.error) {
          console.error(`  ❌ Error updating movie:`, retry.error.message);
          return false;
        }
        return true;
      }
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

  /** When this run started — used to stamp the run log. */
  const runStartedAt = Date.now();

  const stats = {
    voxNowShowing: 0,
    voxComingSoon: 0,
    cinecoNowShowing: 0,
    cinecoComingSoon: 0,
    added: 0,
    updated: 0,
    removed: 0,
    tmdbErrors: 0,
    manualMergeFlagged: 0,
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

    // The film's OWN per-film page at each cinema, keyed by normalised title
    // then by cinema id.
    //
    // These are captured from the cinemas' own listing pages — VOX publishes
    // `/movies/<slug>` and Cineco publishes `/amy_movie/<slug>/` — so they are
    // the addresses the films really live at. They are never computed from a
    // title: VOX's slugs carry language and format suffixes the title never
    // implies ("Hadoota" -> `hadoota-arabic`), so a computed slug 404s.
    const bookingUrlByTitle = new Map<string, Map<string, string>>();

    const addWithSource = (titles: string[], source: string) => {
      for (const t of titles) {
        const key = normalizeTitle(t);
        if (!key) continue;
        if (!sourceByTitle.has(key)) sourceByTitle.set(key, new Set());
        sourceByTitle.get(key)!.add(source);
      }
    };

    const addBookingUrl = (title: string, source: string, url: string | undefined) => {
      if (!url) return;
      const key = normalizeTitle(title);
      if (!key) return;
      if (!bookingUrlByTitle.has(key)) bookingUrlByTitle.set(key, new Map());
      const map = bookingUrlByTitle.get(key)!;
      // First cinema wins for a given title — two listings of the same film
      // at the same cinema are the same film.
      if (!map.has(source)) map.set(source, url);
    };

    for (const m of voxResult.nowShowing) {
      addWithSource([m.title], 'vox');
      addBookingUrl(m.title, 'vox', m.url);
    }
    for (const m of cinecoResult.nowShowing) {
      addWithSource([m.title], 'cineco');
      addBookingUrl(m.title, 'cineco', m.url);
    }
    for (const m of voxResult.comingSoon) {
      addWithSource([m.title], 'vox');
      addBookingUrl(m.title, 'vox', m.url);
    }
    for (const m of cinecoResult.comingSoon) {
      addWithSource([m.title], 'cineco');
      addBookingUrl(m.title, 'cineco', m.url);
    }

    /*
     * The posters, trailers and runtimes the cinemas publish.
     *
     * These maps are the whole point of this pass. Before, the sync only ever
     * read the cinema's TRAILER, and only from Cineco — the VOX scraper
     * returned a title and a URL and nothing else. A film TMDB could not match
     * therefore landed with no poster, no runtime and no trailer, and rendered
     * as a "BAHRAIN NIGHTS" placeholder card.
     *
     * Both cinemas now publish a poster for every film they list, so every
     * film in these maps has artwork.
     */
    const cinemaPosterByTitle = new Map<string, string>();
    const cinemaTrailerByTitle = new Map<string, string>();
    const cinemaDurationByTitle = new Map<string, number>();
    const cinemaSynopsisByTitle = new Map<string, string>();
    const cinemaLanguageByTitle = new Map<string, string>();

    const recordCinemaFields = (movies: {
      title: string;
      posterUrl?: string;
      trailerKey?: string;
      durationMinutes?: number;
      synopsis?: string;
      language?: string;
    }[]) => {
      for (const movie of movies) {
        const key = normalizeTitle(movie.title);
        if (!key) continue;
        if (movie.posterUrl && !cinemaPosterByTitle.has(key)) {
          cinemaPosterByTitle.set(key, movie.posterUrl);
        }
        if (movie.trailerKey && !cinemaTrailerByTitle.has(key)) {
          cinemaTrailerByTitle.set(key, movie.trailerKey);
        }
        if (movie.durationMinutes && !cinemaDurationByTitle.has(key)) {
          cinemaDurationByTitle.set(key, movie.durationMinutes);
        }
        if (movie.synopsis && !cinemaSynopsisByTitle.has(key)) {
          cinemaSynopsisByTitle.set(key, movie.synopsis);
        }
        if (movie.language && !cinemaLanguageByTitle.has(key)) {
          cinemaLanguageByTitle.set(key, movie.language);
        }
      }
    };

    recordCinemaFields(voxResult.nowShowing);
    recordCinemaFields(voxResult.comingSoon);
    recordCinemaFields(cinecoResult.nowShowing);
    recordCinemaFields(cinecoResult.comingSoon);

    console.log(
      `  Cinema artwork: ${cinemaPosterByTitle.size} posters, ` +
        `${cinemaTrailerByTitle.size} trailers, ` +
        `${cinemaDurationByTitle.size} runtimes`
    );

    // The title we keep for a group is the first spelling we saw for it.
    const labelByTitle = new Map<string, string>();
    for (const list of [voxResult.nowShowing.map((m) => m.title), cinecoResult.nowShowing.map((m) => m.title), voxResult.comingSoon.map((m) => m.title), cinecoResult.comingSoon.map((m) => m.title)]) {
      for (const t of list) {
        const key = normalizeTitle(t);
        if (key && !labelByTitle.has(key)) labelByTitle.set(key, t);
      }
    }

    // Deduplicate
    const nowShowingSet = new Set(
      [...voxResult.nowShowing.map((m) => m.title), ...cinecoResult.nowShowing.map((m) => m.title)].map(normalizeTitle),
    );
    const comingSoonSet = new Set(
      [...voxResult.comingSoon.map((m) => m.title), ...cinecoResult.comingSoon.map((m) => m.title)].map(normalizeTitle),
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

    /*
     * The film's per-film booking URLs, verified to resolve.
     *
     * A URL is only kept when it answers HTTP 200. An unverified URL is
     * dropped rather than stored, so the Book button can never point at a
     * dead page. The check runs once per film per run.
     */
    const verifiedBookingUrlsFor = async (title: string): Promise<Record<string, string>> => {
      const map = bookingUrlByTitle.get(normalizeTitle(title));
      if (!map || map.size === 0) return {};
      const candidates: Record<string, string> = {};
      for (const [cinema, url] of map) candidates[cinema] = url;
      const verified = await validateBookingUrls(candidates);
      return verified;
    };

    console.log(`  Merged Now Showing: ${mergedNowShowing.length}`);
    console.log(`  Merged Coming Soon: ${mergedComingSoon.length}`);

    // Step 4: Process Now Showing
    console.log('\n📊 Step 4: Processing Now Showing movies...');

    for (const title of mergedNowShowing) {
      const lookup = await findMovieByTitle(title);
      const existing = lookup.exact;
      const sources = sourcesFor(title);

      if (existing) {
        // Update existing
        const updated = await updateMovieStatus(
          existing.id,
          true,
          false,
          sources[0],
          existing.scraped_from,
          await verifiedBookingUrlsFor(title)
        );
        if (updated) {
          console.log(`  🔄 Updated: ${title} (Now Showing) [${sources.join('+')}]`);
          stats.updated++;
        }

        /*
         * A film that is showing must never be invisible.
         *
         * If this row has no artwork, give it a real poster: TMDB's first,
         * then the cinema's own. The cinema publishes a poster for EVERY film
         * it lists, so this is the path that removes the placeholder cards.
         */
        if (!existing.poster_url) {
          const currentYear = new Date().getFullYear();
          await backfillPoster(
            existing.id,
            title,
            currentYear,
            cinemaPosterByTitle.get(normalizeTitle(title)),
            {
              durationMinutes: cinemaDurationByTitle.get(normalizeTitle(title)),
              synopsis: cinemaSynopsisByTitle.get(normalizeTitle(title)),
              language: cinemaLanguageByTitle.get(normalizeTitle(title)),
              trailerKey: cinemaTrailerByTitle.get(normalizeTitle(title)),
            }
          );
          await wait(300); // Rate limit
        }
      } else {
        /*
         * No EXACT match. A fuzzy candidate may exist, but it is NOT applied.
         *
         * The row is NOT updated from a near-miss — that is the change. The
         * pair is recorded for a human to merge, and the film is written as
         * a new row instead, so the site still shows the film that is
         * actually screening.
         */
        if (lookup.fuzzy) {
          flagForManualMerge(
            title,
            lookup.fuzzy,
            'Fuzzy title match found but NOT applied automatically — a human must decide whether these are the same film.'
          );
          stats.manualMergeFlagged++;
        }

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

        const urls = await verifiedBookingUrlsFor(title);
        const inserted = await upsertMovie(
          title,
          tmdbData,
          true,
          cinemaPosterByTitle.get(normalizeTitle(title)),
          sources[0],
          cinemaTrailerByTitle.get(normalizeTitle(title)),
          urls[sources[0]],
          {
            durationMinutes: cinemaDurationByTitle.get(normalizeTitle(title)),
            synopsis: cinemaSynopsisByTitle.get(normalizeTitle(title)),
            language: cinemaLanguageByTitle.get(normalizeTitle(title)),
          }
        );
        if (inserted) {
          stats.added++;
        }
      }
    }

    // Step 5: Process Coming Soon
    console.log('\n📊 Step 5: Processing Coming Soon movies...');

    for (const title of mergedComingSoon) {
      const lookup = await findMovieByTitle(title);
      const existing = lookup.exact;
      const sources = sourcesFor(title);

      if (existing) {
        // Update existing
        const updated = await updateMovieStatus(
          existing.id,
          false,
          true,
          sources[0],
          existing.scraped_from,
          await verifiedBookingUrlsFor(title)
        );
        if (updated) {
          console.log(`  🔄 Updated: ${title} (Coming Soon) [${sources.join('+')}]`);
          stats.updated++;
        }

        if (!existing.poster_url) {
          const currentYear = new Date().getFullYear();
          await backfillPoster(
            existing.id,
            title,
            currentYear,
            cinemaPosterByTitle.get(normalizeTitle(title)),
            {
              durationMinutes: cinemaDurationByTitle.get(normalizeTitle(title)),
              synopsis: cinemaSynopsisByTitle.get(normalizeTitle(title)),
              language: cinemaLanguageByTitle.get(normalizeTitle(title)),
              trailerKey: cinemaTrailerByTitle.get(normalizeTitle(title)),
            }
          );
          await wait(300); // Rate limit
        }
      } else {
        // No EXACT match. A fuzzy candidate is reported, never applied.
        if (lookup.fuzzy) {
          flagForManualMerge(
            title,
            lookup.fuzzy,
            'Fuzzy title match found but NOT applied automatically — a human must decide whether these are the same film.'
          );
          stats.manualMergeFlagged++;
        }

        // Search TMDB and write the film.
        console.log(`  🔍 New movie: ${title} - searching TMDB...`);
        const currentYear = new Date().getFullYear();
        const tmdbData = await searchTMDB(title, currentYear);
        await wait(300); // Rate limit

        if (!tmdbData) {
          console.log(`  ⚠️ No valid TMDB data for "${title}" - writing the film without it.`);
          stats.tmdbErrors++;
        }

        const urls = await verifiedBookingUrlsFor(title);
        const inserted = await upsertMovie(
          title,
          tmdbData,
          false,
          cinemaPosterByTitle.get(normalizeTitle(title)),
          sources[0],
          cinemaTrailerByTitle.get(normalizeTitle(title)),
          urls[sources[0]],
          {
            durationMinutes: cinemaDurationByTitle.get(normalizeTitle(title)),
            synopsis: cinemaSynopsisByTitle.get(normalizeTitle(title)),
            language: cinemaLanguageByTitle.get(normalizeTitle(title)),
          }
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
      // PER-SOURCE SAFETY.
      //
      // The old guard only looked at the COMBINED total, so a single source
      // failing silently (Cineco -> 0 movies) still passed the threshold via
      // VOX, and the cleanup then demoted every film that the failed source
      // had contributed — even though those films were still listed on the
      // cinema's own site. On 2026-11-19 this dropped the live /cinema page
      // from 34 cards to 24 in one run.
      //
      // If ANY source returned nothing, the fresh lists are incomplete and
      // every film that source owns looks absent. Do not clean up at all.
      const sourceTotals: Record<string, number> = {
        vox: voxResult.nowShowing.length + voxResult.comingSoon.length,
        cineco: cinecoResult.nowShowing.length + cinecoResult.comingSoon.length,
      };
      const cleanupDecision = decideCleanup(sourceTotals);

      if (!cleanupDecision.run) {
        console.log(`  ⚠️ WARNING: ${cleanupDecision.reason}.`);
        console.log('  ⚠️ Skipping cleanup entirely to prevent data loss — every film is preserved.');
        console.log(`  ::error::Cinema sync: ${cleanupDecision.reason}. Cleanup skipped, all films preserved.`);
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
    console.log(`Needs Manual Merge: ${stats.manualMergeFlagged}`);
    console.log('='.repeat(60));

    /*
     * Record the run so the contribution monitor can see it.
     *
     * The monitor (scripts/verify-cinema-freshness.mjs) needs the PER-SOURCE
     * contribution of each run. Without a run history it can only see the
     * current state of the table, which cannot distinguish "this source
     * contributed 20 films" from "this source contributed 20 films ONCE and
     * has been dead ever since".
     *
     * The history is written to `agent_logs.metadata`, keyed by
     * `trigger: 'cinema-sync'`, alongside the per-source counts:
     *
     *   { trigger: 'cinema-sync',
     *     sources: { vox: { now_showing, coming_soon },
     *                cineco: { now_showing, coming_soon } } }
     *
     * It is a LOG row, not business data — it records what a run did, which
     * is exactly what a log is for.
     */
    try {
      const { error: logError } = await supabase.from('agent_logs').insert({
        started_at: runStartedAt,
        completed_at: new Date().toISOString(),
        status: 'completed',
        items_found:
          stats.voxNowShowing +
          stats.voxComingSoon +
          stats.cinecoNowShowing +
          stats.cinecoComingSoon,
        items_added: stats.added,
        items_updated: stats.updated,
        metadata: {
          trigger: 'cinema-sync',
          duration_ms: Date.now() - runStartedAt,
          sources: {
            vox: {
              now_showing: stats.voxNowShowing,
              coming_soon: stats.voxComingSoon,
            },
            cineco: {
              now_showing: stats.cinecoNowShowing,
              coming_soon: stats.cinecoComingSoon,
            },
          },
        },
      });
      if (logError) {
        console.warn('  ⚠️ Could not record the run in agent_logs:', logError.message);
      }
    } catch (logErr) {
      console.warn('  ⚠️ Could not record the run in agent_logs:', logErr);
    }

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