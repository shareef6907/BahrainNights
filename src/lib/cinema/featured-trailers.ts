import { supabaseAdmin } from '@/lib/supabase';
import { extractYouTubeVideoId } from '@/lib/utils/youtube';

/**
 * Server-side helper that resolves the trailer films used by the header
 * trailer hero components.
 *
 * The point of this helper is SEO + performance:
 *  - The film list is resolved on the SERVER, so the titles are part of the
 *    server-rendered HTML (never a client-only fetch).
 *  - The same data is handed to the client hero component, so the trailer
 *    header can be rendered immediately instead of waiting for an API round
 *    trip (which used to leave the header frozen on a poster).
 */

export interface FeaturedTrailer {
  id: string;
  title: string;
  slug: string;
  /** YouTube video id (11 chars) or empty string when the film has no trailer. */
  trailerKey: string;
  poster: string;
  backdrop: string;
  synopsis: string;
  genres: string[];
  rating: number;
  duration: string;
  releaseDate?: string;
  language: string;
}

interface DBMovieRow {
  id: string;
  title: string;
  slug: string | null;
  poster_url: string | null;
  backdrop_url: string | null;
  synopsis: string | null;
  genre: string[] | null;
  tmdb_rating: number | null;
  duration_minutes: number | null;
  release_date: string | null;
  language: string | null;
  trailer_url: string | null;
  trailer_key: string | null;
}

function getPosterUrl(posterPath: string | null): string {
  if (!posterPath) return '/images/movie-placeholder.jpg';
  if (posterPath.startsWith('http')) return posterPath;
  return `https://image.tmdb.org/t/p/w500${posterPath}`;
}

function getBackdropUrl(backdropPath: string | null): string {
  if (!backdropPath) return '/images/backdrop-placeholder.jpg';
  if (backdropPath.startsWith('http')) return backdropPath;
  return `https://image.tmdb.org/t/p/original${backdropPath}`;
}

function toFeaturedTrailer(row: DBMovieRow): FeaturedTrailer {
  const durationMins = row.duration_minutes || 0;
  const hours = Math.floor(durationMins / 60);
  const mins = durationMins % 60;
  const durationStr = hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;

  const rawTrailer = row.trailer_key || row.trailer_url || '';
  const trailerKey = extractYouTubeVideoId(rawTrailer) || '';

  return {
    id: row.id,
    title: row.title,
    slug: row.slug || row.id,
    trailerKey,
    poster: getPosterUrl(row.poster_url),
    backdrop: getBackdropUrl(row.backdrop_url),
    synopsis: row.synopsis || '',
    genres: row.genre || [],
    rating: row.tmdb_rating || 0,
    duration: durationStr,
    releaseDate: row.release_date
      ? new Date(row.release_date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      : undefined,
    language: row.language || 'English',
  };
}

function isUsable(row: DBMovieRow): boolean {
  const poster = row.poster_url || '';
  if (!poster || poster.includes('placeholder') || poster.includes('null')) {
    return false;
  }
  return true;
}

/**
 * Resolve the featured trailer films on the server.
 *
 * Order of preference:
 *  1. The manually curated `cinema_featured_trailers` selection.
 *  2. The most recent now-showing films that actually have a trailer.
 *
 * Never throws — a failure returns an empty list so the page still renders.
 */
export async function getFeaturedTrailers(limit = 8): Promise<FeaturedTrailer[]> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: featured, error: featuredError } = await (supabaseAdmin as any)
      .from('cinema_featured_trailers')
      .select('movie_id, display_order, is_active')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (!featuredError && featured && featured.length > 0) {
      const movieIds = featured.map((f: { movie_id: string }) => f.movie_id);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: movies } = await (supabaseAdmin as any)
        .from('movies')
        .select('*')
        .in('id', movieIds);

      if (movies && movies.length > 0) {
        const movieMap = new Map<string, DBMovieRow>(
          (movies as DBMovieRow[]).map((m: DBMovieRow) => [m.id, m])
        );
        const ordered = (featured as { movie_id: string }[])
          .map((f: { movie_id: string }) => movieMap.get(f.movie_id))
          .filter((m): m is DBMovieRow => m !== undefined)
          .map(toFeaturedTrailer)
          .filter((t: FeaturedTrailer) => t.trailerKey);

        if (ordered.length > 0) {
          return ordered.slice(0, limit);
        }
      }
    }

    // Fallback: recent now-showing films that have a trailer.
    const { data: fallbackMovies } = await supabaseAdmin
      .from('movies')
      .select('*')
      .eq('is_now_showing', true)
      .not('trailer_key', 'is', null)
      .order('release_date', { ascending: false })
      .limit(limit);

    return ((fallbackMovies || []) as unknown as DBMovieRow[])
      .filter(isUsable)
      .map(toFeaturedTrailer)
      .filter((t) => t.trailerKey);
  } catch (err) {
    console.error('Error fetching featured trailers:', err);
    return [];
  }
}
