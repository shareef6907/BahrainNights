import { OG_IMAGES } from '@/lib/og';
import { Suspense } from 'react';
import { supabaseAdmin } from '@/lib/supabase';
import CinemaPageClient from '@/components/cinema/CinemaPageClient';
import { Movie } from '@/components/cinema/MovieCard';
import MovieListSchema from '@/components/SEO/MovieListSchema';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import { PUBLIC_MOVIE_SELECT } from '@/lib/public-fields';

// Revalidate every 60 seconds for fresh data
export const revalidate = 60;

// Database movie type
interface DBMovie {
  id: string;
  tmdb_id: number;
  title: string;
  slug: string;
  poster_url: string;
  backdrop_url: string;
  duration_minutes: number;
  genre: string[];
  rating: string;
  synopsis: string;
  release_date: string;
  trailer_url: string;
  trailer_key: string;
  language: string;
  director: string;
  movie_cast: string[];
  tmdb_rating: number;
  is_now_showing: boolean;
  is_coming_soon: boolean;
  scraped_from: string[];
}

/**
 * Is this a poster URL we can actually render?
 *
 * NOTE: the old check was `poster.includes('null')` — a SUBSTRING test. A
 * legitimate URL can contain the letters "null" anywhere in it, and such a
 * film was silently dropped from the page. This compares against the literal
 * strings instead.
 */
function hasUsablePoster(poster: string | null | undefined): boolean {
  if (!poster) return false;
  const p = poster.trim();
  if (!p) return false;
  if (p === 'null' || p === 'undefined') return false;
  if (p.includes('placeholder')) return false;
  return true;
}

// Helper to construct full TMDB image URLs.
// Returns '' when there is no usable image, so the caller can render a
// branded fallback instead of a broken image.
function getPosterUrl(posterPath: string | null): string {
  if (!hasUsablePoster(posterPath)) return '';
  if (posterPath!.startsWith('http')) return posterPath!;
  return `https://image.tmdb.org/t/p/w500${posterPath}`;
}

function getBackdropUrl(backdropPath: string | null): string {
  if (!hasUsablePoster(backdropPath)) return '';
  if (backdropPath!.startsWith('http')) return backdropPath!;
  return `https://image.tmdb.org/t/p/original${backdropPath}`;
}

// Convert DB movie to component Movie format
function convertToMovieFormat(dbMovie: DBMovie): Movie {
  const durationMins = dbMovie.duration_minutes || 0;
  const hours = Math.floor(durationMins / 60);
  const mins = durationMins % 60;
  const durationStr = hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;

  let trailerUrl = '';
  if (dbMovie.trailer_key) {
    trailerUrl = dbMovie.trailer_key;
  } else if (dbMovie.trailer_url) {
    trailerUrl = dbMovie.trailer_url;
  }

  return {
    id: dbMovie.id,
    title: dbMovie.title,
    slug: dbMovie.slug,
    poster: getPosterUrl(dbMovie.poster_url),
    hasPoster: hasUsablePoster(dbMovie.poster_url),
    backdrop: getBackdropUrl(dbMovie.backdrop_url),
    rating: dbMovie.tmdb_rating || 0,
    genres: dbMovie.genre || [],
    duration: durationStr,
    language: dbMovie.language || 'English',
    releaseDate: dbMovie.release_date ? new Date(dbMovie.release_date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }) : undefined,
    isNowShowing: dbMovie.is_now_showing,
    synopsis: dbMovie.synopsis || '',
    trailerUrl,
    cast: dbMovie.movie_cast || [],
    scrapedFrom: dbMovie.scraped_from || [],
  };
}

/**
 * How far is this row's release date from the current cinema window?
 *
 * The film actually screening now is the one whose release year is closest to
 * today. A row with no release date at all is the furthest possible answer,
 * so it is only ever chosen when nothing better exists.
 */
function releaseDistanceFromNow(movie: DBMovie, now: number): number {
  if (!movie.release_date) return Number.POSITIVE_INFINITY;
  const t = new Date(movie.release_date).getTime();
  if (Number.isNaN(t)) return Number.POSITIVE_INFINITY;
  return Math.abs(t - now);
}

/**
 * Resolve a group of rows that share a title down to the ONE film that is
 * actually screening.
 *
 * WHY NOT "highest rated" or "whichever row sorted first":
 * The old code kept whichever row the query happened to return first, which
 * was decided by the ORDER BY — `tmdb_rating DESC` for now-showing and
 * `release_date ASC` for coming-soon. Both are wrong:
 *
 *   - `tmdb_rating DESC` kept the 1995 "Sense and Sensibility" (7.4) over the
 *     2026 one (7.2) that is actually on screen this month.
 *   - `release_date ASC` kept the OLDEST row of a coming-soon title, which is
 *     the same bug class with a different tiebreak.
 *
 * The rule is now: the film whose release date is CLOSEST TO NOW wins, because
 * that is the film the cinema is screening. Only when two rows are equally
 * close does it fall back to "the one we can actually show" (has a poster),
 * then to the better rated one, then to a stable id comparison.
 */
function resolveCollision(rows: DBMovie[]): DBMovie {
  if (rows.length === 1) return rows[0];
  const now = Date.now();
  return [...rows].sort((a, b) => {
    const distance = releaseDistanceFromNow(a, now) - releaseDistanceFromNow(b, now);
    if (distance !== 0) return distance;

    const posterA = hasUsablePoster(a.poster_url) ? 0 : 1;
    const posterB = hasUsablePoster(b.poster_url) ? 0 : 1;
    if (posterA !== posterB) return posterA - posterB;

    const ratingA = a.tmdb_rating ?? -1;
    const ratingB = b.tmdb_rating ?? -1;
    if (ratingA !== ratingB) return ratingB - ratingA;

    return String(a.id).localeCompare(String(b.id));
  })[0];
}

/**
 * Collapse rows that share a title down to one row per film.
 *
 * NOTE: this deliberately does NOT drop rows without a poster. A film that is
 * showing now must never be hidden for lack of artwork — the card renders a
 * branded fallback poster instead.
 */
function dedupeMovies(movies: DBMovie[]): DBMovie[] {
  const groups = new Map<string, DBMovie[]>();
  for (const movie of movies) {
    const key = movie.title.toLowerCase().trim();
    const existing = groups.get(key);
    if (existing) {
      existing.push(movie);
    } else {
      groups.set(key, [movie]);
    }
  }
  return Array.from(groups.values()).map(resolveCollision);
}

/**
 * Display order.
 *
 * The ordering is done in JS rather than in the query so it is not at the
 * mercy of Postgres' NULL handling: `ORDER BY x DESC` puts NULLs FIRST by
 * default, which is how films with no rating were ending up at the top of the
 * grid.
 */
function sortNowShowing(movies: DBMovie[]): DBMovie[] {
  return [...movies].sort((a, b) => {
    const dateA = a.release_date ?? '';
    const dateB = b.release_date ?? '';
    if (dateA !== dateB) {
      if (!dateA) return 1;
      if (!dateB) return -1;
      return dateB.localeCompare(dateA);
    }
    const ratingA = a.tmdb_rating ?? -1;
    const ratingB = b.tmdb_rating ?? -1;
    if (ratingA !== ratingB) return ratingB - ratingA;
    return a.title.localeCompare(b.title);
  });
}

function sortComingSoon(movies: DBMovie[]): DBMovie[] {
  return [...movies].sort((a, b) => {
    const dateA = a.release_date ?? '';
    const dateB = b.release_date ?? '';
    if (dateA !== dateB) {
      if (!dateA) return 1;
      if (!dateB) return -1;
      return dateA.localeCompare(dateB);
    }
    return a.title.localeCompare(b.title);
  });
}

// Fetch all movies - now showing OR coming soon
async function getMovies() {
  const [nowShowingRes, comingSoonRes] = await Promise.all([
    supabaseAdmin
      .from('movies')
      .select(PUBLIC_MOVIE_SELECT as any)
      .eq('is_now_showing', true),
    supabaseAdmin
      .from('movies')
      .select(PUBLIC_MOVIE_SELECT as any)
      .eq('is_coming_soon', true)
  ]);

  // `select()` is given a runtime column list, so the generated row type is
  // lost; the rows are cast back to `DBMovie` at this boundary.
  const filteredNowShowing = sortNowShowing(
    dedupeMovies((nowShowingRes.data || []) as unknown as DBMovie[])
  );
  const filteredComingSoon = sortComingSoon(
    dedupeMovies((comingSoonRes.data || []) as unknown as DBMovie[])
  );

  const nowShowing = filteredNowShowing.map((m: DBMovie) => convertToMovieFormat(m));
  const comingSoon = filteredComingSoon.map((m: DBMovie) => convertToMovieFormat(m));

  return { nowShowing, comingSoon };
}

// Fetch featured trailers from admin selection
async function getFeaturedTrailers(): Promise<Movie[]> {
  try {
    const { data: featured, error: featuredError } = await supabaseAdmin
      .from('cinema_featured_trailers')
      .select('movie_id, display_order, is_active')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (!featuredError && featured && featured.length > 0) {
      const movieIds = featured.map(f => f.movie_id);
      const { data: movies } = await supabaseAdmin
        .from('movies')
        .select(PUBLIC_MOVIE_SELECT as any)
        .in('id', movieIds);

      if (movies && movies.length > 0) {
        const movieRows = (movies || []) as unknown as DBMovie[];
        const movieMap = new Map(movieRows.map((m: DBMovie) => [m.id, m]));
        const orderedMovies = featured
          .map((f: { movie_id: string }) => movieMap.get(f.movie_id))
          .filter((m): m is DBMovie => m !== undefined && !!m.trailer_key)
          .map((m: DBMovie) => convertToMovieFormat(m));
        
        if (orderedMovies.length > 0) {
          return orderedMovies;
        }
      }
    }

    // Fallback: Get recent movies with trailers
    const { data: fallbackMovies } = await supabaseAdmin
      .from('movies')
      .select(PUBLIC_MOVIE_SELECT as any)
      .eq('is_now_showing', true)
      .not('trailer_key', 'is', null)
      .order('release_date', { ascending: false })
      .limit(8);

    // The hero needs artwork. A trailer with neither a poster nor a backdrop
    // is skipped HERE — this is the hero's own requirement, not the grid's.
    // A film in the grid is never hidden for lack of a poster.
    return sortNowShowing(dedupeMovies((fallbackMovies || []) as unknown as DBMovie[]))
      .filter(m => hasUsablePoster(m.poster_url) || hasUsablePoster(m.backdrop_url))
      .filter(m => m.trailer_key)
      .map(m => convertToMovieFormat(m));
  } catch (err) {
    console.error('Error fetching featured trailers:', err);
    return [];
  }
}

// Server Component
export default async function CinemaPage() {
  const [{ nowShowing, comingSoon }, featuredTrailers] = await Promise.all([
    getMovies(),
    getFeaturedTrailers(),
  ]);

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Cinema', url: 'https://www.bahrainnights.com/cinema' }
      ]} />
      <MovieListSchema
        movies={nowShowing}
        pageTitle="Movies Now Showing in Bahrain - VOX Cinemas"
        pageDescription="Find movies now showing at VOX Cinemas Bahrain"
        pageUrl="https://www.bahrainnights.com/cinema"
      />
      <Suspense fallback={null}>
        <CinemaPageClient
          initialNowShowing={nowShowing}
          initialComingSoon={comingSoon}
          initialCinemas={[{ value: 'all', label: 'All Cinemas' }]}
          lastUpdated={null}
          featuredTrailers={featuredTrailers}
        />
      </Suspense>
    </>
  );
}

// Metadata for SEO
export const metadata = {
  title: 'Cinema in Bahrain - Movies Now Showing & Coming Soon | VOX & Cineco',
  description: 'Find movies now showing at VOX Cinemas and Cineco Bahrain. Check what\'s playing, watch trailers, and book tickets online.',
  keywords: ['cinema in Bahrain', 'movies in Bahrain', 'Bahrain cinema', 'now showing Bahrain', 'VOX Bahrain', 'Cineco Bahrain'],
  openGraph: {
    title: 'Cinema in Bahrain - Movies Now Showing & Coming Soon',
    description: 'Find movies now showing at VOX Cinemas and Cineco Bahrain.',
    url: 'https://www.bahrainnights.com/cinema',
    type: 'website',
  images: [OG_IMAGES.default],
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/cinema',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cinema in Bahrain - Movies Now Showing & Coming Soon',
    description: 'Find movies now showing at VOX Cinemas and Cineco Bahrain.',
  },
};