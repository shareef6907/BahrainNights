import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/server';
import {
  fetchOEmbed,
  isInformativeVideoTitle,
  pickBestSearchResult,
  pickBestTmdbVideo,
  titleRefersToFilm,
} from '@/lib/trailer-verification';

export const dynamic = 'force-dynamic';
export const maxDuration = 300; // 5 minutes

/**
 * Trailer Auto-Fetch Cron Job
 *
 * Fills in MISSING trailers for movies. It never rewrites a trailer that is
 * already there.
 *
 * WHY THIS IS CAREFUL
 * -------------------
 * The original version of this job searched YouTube for
 * "<title> official trailer <year>" and stored the FIRST hit. A YouTube search
 * result says nothing about WHICH film a video belongs to -- it is only a
 * ranking. So "Top Crypto To Buy In October 2026" outranked the real trailer
 * for the film "Crypto" and was written onto it. The 2026-11-18 trailer audit
 * found 115 wrong or unverifiable trailers that had accumulated this way.
 *
 * The rule this job now follows:
 *
 *   NEVER write a trailer key that has not been positively matched to the film.
 *
 * Sources are tried in order of authority:
 *
 *   1. TMDB's own video list for the film (requires tmdb_id). TMDB knows
 *      which videos belong to which film, so this is authoritative. The
 *      candidate's oEmbed title must still name the film, and the video type
 *      must be a Trailer/Teaser rather than a blooper or featurette.
 *   2. A YouTube search, but only a candidate whose OWN title names the film
 *      and reads as a trailer. The first hit is not taken.
 *
 * If neither source yields a verified key, the trailer is left EMPTY. An
 * empty trailer is a cosmetic gap on one card; a wrong trailer undermines
 * every trailer on the site.
 *
 * Add to vercel.json:
 * {
 *   "crons": [
 *     { "path": "/api/cron/update-trailers", "schedule": "0 0 * * 0" }
 *   ]
 * }
 *
 * Requires YOUTUBE_API_KEY in environment variables (only for the search
 * fallback; TMDB lookups need TMDB_API_KEY).
 * Requires CRON_SECRET for auth.
 */

interface YouTubeSearchResult {
  videoId: string;
  title: string;
  channelTitle: string;
}

/** Search YouTube and return several candidates, not just the first. */
async function searchYouTube(
  query: string,
  apiKey: string,
  maxResults = 10
): Promise<YouTubeSearchResult[]> {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
    query
  )}&type=video&maxResults=${maxResults}&key=${apiKey}`;

  try {
    const response = await fetch(url, { next: { revalidate: 0 } });
    if (!response.ok) {
      console.error('YouTube API error:', response.status);
      return [];
    }

    const data = await response.json();
    if (!data.items?.length) return [];

    return data.items.map((item: any) => ({
      videoId: item.id.videoId,
      title: item.snippet.title ?? '',
      channelTitle: item.snippet.channelTitle ?? '',
    }));
  } catch (error) {
    console.error('YouTube search error:', error);
    return [];
  }
}

/** The movie columns this job needs. */
interface MovieRecord {
  id: string;
  title: string;
  tmdb_id: number | null;
  release_date: string | null;
  trailer_url: string | null;
  trailer_key: string | null;
  is_now_showing: boolean;
  is_coming_soon: boolean;
}

/**
 * Sports fixtures are not films and have no trailer. The comment on the
 * original query claimed to exclude them, but it did not -- a query for
 * "ICC MT20 World Cup 2026: India Vs. South Africa official trailer 2026"
 * returns match highlights, which are then stored as a "trailer".
 */
const SPORTS_PATTERNS =
  /\b(vs\.?|v\.?|versus|premier league|la liga|uefa|champions league|icc|cricket|world cup|t20|odi|test match|wrestlemania|wwe|royal rumble|grand slam|formula\s*1|f1\b|grand prix|olympic|ufc|boxing match|fight night|super bowl|fa cup|world championship|series final|leg\s*\d)\b/i;

/**
 * The list of title spellings we know for a film. TMDB's original title is
 * included because a film's home-market trailer is titled in that script.
 */
async function filmTitlesFor(movie: MovieRecord): Promise<string[]> {
  const titles = [movie.title];
  if (!movie.tmdb_id) return titles.filter(Boolean) as string[];

  const tmdbKey = process.env.TMDB_API_KEY;
  if (!tmdbKey) return titles.filter(Boolean) as string[];

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie.tmdb_id}?api_key=${tmdbKey}`,
      { next: { revalidate: 86400 } }
    );
    if (!response.ok) return titles.filter(Boolean) as string[];
    const data = await response.json();
    if (data.title) titles.push(data.title);
    if (data.original_title) titles.push(data.original_title);
  } catch {
    // A TMDB outage must not stop the job; the search fallback still works.
  }

  return titles.filter(Boolean) as string[];
}

/**
 * TMDB's list of videos for a film.
 */
async function tmdbVideosFor(
  tmdbId: number
): Promise<{ key: string; name?: string; type?: string; site?: string; official?: boolean; iso?: string }[]> {
  const tmdbKey = process.env.TMDB_API_KEY;
  if (!tmdbKey) return [];

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${tmdbId}/videos?api_key=${tmdbKey}`,
      { next: { revalidate: 86400 } }
    );
    if (!response.ok) return [];
    const data = await response.json();
    return data.results ?? [];
  } catch {
    return [];
  }
}

export async function GET(request: Request) {
  const startTime = Date.now();

  // Verify cron secret for security
  const authHeader = request.headers.get('authorization');
  const { searchParams } = new URL(request.url);
  const queryKey = searchParams.get('key');

  const cronSecret = process.env.CRON_SECRET;
  const youtubeApiKey = process.env.YOUTUBE_API_KEY;

  // Auth check
  if (cronSecret && authHeader !== `Bearer ${cronSecret}` && queryKey !== cronSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const supabase = getAdminClient();

    // Only movies that have NO trailer. A trailer that is already there was
    // verified when it was written, and is not touched again.
    const { data: movies, error } = await supabase
      .from('movies')
      .select(
        'id, title, tmdb_id, release_date, trailer_url, trailer_key, is_now_showing, is_coming_soon'
      )
      .or('trailer_url.is.null,trailer_key.is.null');

    if (error) {
      throw error;
    }

    const candidates = (movies as MovieRecord[] | null) ?? [];

    // A row needs a trailer only when BOTH fields are missing. A row with a
    // key but no URL (or the reverse) is a half-written row, and its key is
    // the one that was verified -- rebuild the URL from it rather than
    // replacing the key.
    const moviesNeedingTrailers = candidates.filter(
      (movie) => !movie.trailer_url || !movie.trailer_key
    );

    if (moviesNeedingTrailers.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No movies need trailers. All caught up!',
        stats: { processed: 0, updated: 0, skipped: 0, failed: 0 },
        timeMs: Date.now() - startTime,
      });
    }

    console.log(`Found ${moviesNeedingTrailers.length} movies needing trailers`);

    let updatedCount = 0;
    let skippedCount = 0;
    let failedCount = 0;
    const results: {
      title: string;
      release_date: string | null;
      status: string;
      videoId?: string;
      source?: string;
      reason?: string;
    }[] = [];

    const moviesToProcess = moviesNeedingTrailers.slice(0, 100);

    for (const movie of moviesToProcess) {
      const title = movie.title || '';
      const releaseDate = movie.release_date;
      const year = releaseDate ? new Date(releaseDate).getFullYear() : '';

      const record = (status: string, extra: Record<string, unknown> = {}) => {
        results.push({ title, release_date: releaseDate, status, ...extra } as any);
      };

      // Sports fixtures are not films. Give them no trailer at all.
      if (SPORTS_PATTERNS.test(title)) {
        skippedCount++;
        record('skipped_sports');
        continue;
      }

      // A half-written row already has a verified key. Rebuild the URL.
      if (movie.trailer_key && !movie.trailer_url) {
        const { error: updateError } = await (supabase as any)
          .from('movies')
          .update({ trailer_url: `https://www.youtube.com/watch?v=${movie.trailer_key}` })
          .eq('id', movie.id);
        if (!updateError) {
          updatedCount++;
          record('url_rebuilt', { videoId: movie.trailer_key });
        } else {
          failedCount++;
          record('failed', { reason: updateError.message });
        }
        continue;
      }

      const filmTitles = await filmTitlesFor(movie);
      const oembedCache = new Map<string, string>();
      const oembedTitleFor = (key: string): string | null => {
        if (oembedCache.has(key)) return oembedCache.get(key) ?? null;
        return null;
      };

      // ---- Source 1: TMDB's own video list for this film ----------------
      let chosen: { key: string; source: string; confidence: number; reason: string } | null = null;

      if (movie.tmdb_id) {
        const videos = await tmdbVideosFor(movie.tmdb_id);
        if (videos.length) {
          // Resolve the oEmbed titles of the candidates first, so the matcher
          // works against the video's REAL title rather than TMDB's own label.
          const candidatesToCheck = videos.filter(
            (video) => video.site === 'YouTube' && video.key && video.type !== 'Behind the Scenes' && video.type !== 'Bloopers' && video.type !== 'Featurette'
          );
          for (const video of candidatesToCheck) {
            const oembed = await fetchOEmbed(video.key);
            if (oembed.status === 200) oembedCache.set(video.key, oembed.title);
          }

          const best = pickBestTmdbVideo(videos, filmTitles, oembedTitleFor);
          if (best) {
            chosen = {
              key: best.key,
              source: 'tmdb',
              confidence: best.confidence,
              reason: best.reason,
            };
          }
        }
      }

      // ---- Source 2: YouTube search, verified by the video's own title ---
      if (!chosen && youtubeApiKey) {
        const searchQuery = year ? `${title} official trailer ${year}` : `${title} official trailer`;
        console.log(`Searching: ${searchQuery}`);

        const searchResults = await searchYouTube(searchQuery, youtubeApiKey);
        const best = pickBestSearchResult(searchResults, filmTitles);
        if (best) {
          // Confirm the key is actually embeddable before writing it.
          const oembed = await fetchOEmbed(best.key);
          if (oembed.status === 200) {
            chosen = {
              key: best.key,
              source: 'youtube-search',
              confidence: best.confidence,
              reason: best.reason,
            };
          } else {
            record('skipped_not_embeddable', { videoId: best.key });
          }
        }
      }

      if (!chosen) {
        // No verified trailer. Leave the row alone -- an empty trailer is
        // better than a wrong one.
        skippedCount++;
        record('skipped_unverified', {
          reason: 'no trailer could be positively matched to this film',
        });
        continue;
      }

      const trailerUrl = `https://www.youtube.com/watch?v=${chosen.key}`;
      const updatePayload: Record<string, unknown> = {
        trailer_key: chosen.key,
        trailer_url: trailerUrl,
      };

      // Record provenance when the verification columns exist. They are added
      // by docs/sql/2026-11-18-trailer-verification.sql, which is applied
      // separately -- writing them unconditionally would fail every update
      // on a database that does not have them yet.
      const oembed = await fetchOEmbed(chosen.key);
      if (oembed.status === 200 && isInformativeVideoTitle(oembed.title)) {
        updatePayload.trailer_video_title = oembed.title;
      }
      updatePayload.trailer_verified_at = new Date().toISOString();
      updatePayload.trailer_match_confidence = chosen.confidence;

      const { error: updateError } = await (supabase as any)
        .from('movies')
        .update(updatePayload)
        .eq('id', movie.id);

      if (updateError) {
        // The provenance columns may not exist yet. Retry with only the
        // columns that have always been there.
        if (/column|schema/i.test(updateError.message)) {
          const { error: retryError } = await (supabase as any)
            .from('movies')
            .update({ trailer_key: chosen.key, trailer_url: trailerUrl })
            .eq('id', movie.id);
          if (retryError) {
            failedCount++;
            record('failed', { reason: retryError.message });
            continue;
          }
        } else {
          failedCount++;
          record('failed', { reason: updateError.message });
          continue;
        }
      }

      updatedCount++;
      record('updated', { videoId: chosen.key, source: chosen.source, reason: chosen.reason });

      // Rate limiting: 100ms delay between requests
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    const remaining = moviesNeedingTrailers.length - moviesToProcess.length;

    return NextResponse.json({
      success: true,
      message:
        updatedCount > 0
          ? `Updated ${updatedCount} trailers. ${skippedCount} left empty (no verified match). ${remaining} more remaining (will continue on next run).`
          : `Processed ${moviesToProcess.length} movies. ${skippedCount} left empty (no verified match).`,
      stats: {
        totalNeedingTrailers: moviesNeedingTrailers.length,
        processedThisRun: moviesToProcess.length,
        updated: updatedCount,
        skipped: skippedCount,
        failed: failedCount,
        remaining,
      },
      results: results.slice(0, 20),
      timeMs: Date.now() - startTime,
    });
  } catch (error) {
    console.error('Update trailers error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timeMs: Date.now() - startTime,
      },
      { status: 500 }
    );
  }
}

// Also support POST for manual triggers
export async function POST(request: Request) {
  return GET(request);
}
