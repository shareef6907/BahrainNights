import { Suspense } from 'react';
import { supabaseAdmin } from '@/lib/supabase';
import CinemaNetflixClient from '@/components/cinema/CinemaNetflixClient';
import { Movie } from '@/components/cinema/MovieCard';
import MovieListSchema from '@/components/SEO/MovieListSchema';

// Revalidate every 5 minutes for fresh data
export const revalidate = 300;

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

// Helper to construct full TMDB image URLs
function getPosterUrl(posterPath: string | null): string {
  if (!posterPath) return '/images/movie-placeholder.jpg';
  if (posterPath.startsWith('http')) return posterPath;
  return `https://image.tmdb.org/t/p/w500${posterPath}`;
}

function getBackdropUrl(backdropPath: string | null): string {
  if (!backdropPath) return '/images/backdrop-placeholder.jpg';
  if (backdropPath.startsWith('http')) return backdropPath;
  return `https://image.tmdb.org/t/p/w1280${backdropPath}`;
}

// Convert DB movie to component Movie format
function convertToMovieFormat(dbMovie: DBMovie): Movie {
  const durationMins = dbMovie.duration_minutes || 0;
  const hours = Math.floor(durationMins / 60);
  const mins = durationMins % 60;
  const durationStr = hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;

  return {
    id: dbMovie.id,
    title: dbMovie.title,
    slug: dbMovie.slug,
    poster: getPosterUrl(dbMovie.poster_url),
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
    trailerUrl: dbMovie.trailer_url || '',
    cast: dbMovie.movie_cast || [],
    scrapedFrom: dbMovie.scraped_from || [],
  };
}

// Fetch all movies on the server (ONLY scraped movies actually playing in Bahrain)
async function getMovies() {
  // Fetch ONLY movies that are scraped from Bahrain cinemas
  // This ensures we only show movies actually playing in Bahrain (not random TMDB entries)
  const { data: allMoviesData } = await supabaseAdmin
    .from('movies')
    .select('*')
    // ONLY show movies scraped from actual Bahrain cinemas - VOX, Cineco, or Seef
    // Movies must have scraped_from array containing at least one valid cinema
    .or('scraped_from.cs.{vox},scraped_from.cs.{cineco},scraped_from.cs.{seef}')
    .order('tmdb_rating', { ascending: false });

  const allMovies = (allMoviesData || []).map((m: DBMovie) => convertToMovieFormat(m));

  // Also get separated lists for SEO schema
  const nowShowing = allMovies.filter((m: Movie) => m.isNowShowing);
  const comingSoon = allMovies.filter((m: Movie) => !m.isNowShowing);

  return { allMovies, nowShowing, comingSoon };
}

// Fetch cinemas for filter dropdown
async function getCinemas() {
  const { data } = await supabaseAdmin
    .from('cinemas')
    .select('id, name')
    .order('name');

  interface Cinema {
    id: string;
    name: string;
  }

  return [
    { value: 'all', label: 'All Cinemas' },
    ...(data || []).map((c: Cinema) => ({
      value: c.id,
      label: c.name,
    })),
  ];
}

// Fetch last scraper update time
async function getLastUpdated() {
  const { data } = await supabaseAdmin
    .from('agent_logs')
    .select('completed_at')
    .eq('agent_type', 'cinema_scraper_github')
    .eq('status', 'completed')
    .order('completed_at', { ascending: false })
    .limit(1)
    .single();

  return data?.completed_at || null;
}

// Fetch featured trailers for cinema hero (admin-selected)
async function getFeaturedTrailers(): Promise<string[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('cinema_featured_trailers')
      .select('movie_id')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      // Table might not exist yet - return empty array
      console.log('Featured trailers table not available:', error.message);
      return [];
    }

    return (data || []).map((t: { movie_id: string }) => t.movie_id);
  } catch {
    return [];
  }
}

// Server Component - data is fetched BEFORE the page renders
export default async function CinemaPage() {
  // Fetch all data on the server - NO loading state needed!
  const [{ allMovies, nowShowing }, featuredTrailerIds] = await Promise.all([
    getMovies(),
    getFeaturedTrailers()
  ]);

  // Get hero movies: use admin-selected featured trailers if available, otherwise use top-rated with trailers
  let heroMovies: Movie[] = [];

  if (featuredTrailerIds.length > 0) {
    // Use admin-selected featured trailers in the specified order
    heroMovies = featuredTrailerIds
      .map(id => allMovies.find(m => m.id === id))
      .filter((m): m is Movie => m !== undefined && !!m.trailerUrl);
  }

  // If no featured trailers or none have valid trailers, fall back to top-rated with trailers
  if (heroMovies.length === 0) {
    heroMovies = allMovies
      .filter((movie) => {
        const hasValidBackdrop = movie.backdrop &&
          !movie.backdrop.includes('placeholder') &&
          !movie.backdrop.includes('null') &&
          movie.backdrop.startsWith('http');
        const hasTrailer = movie.trailerUrl && movie.trailerUrl.length > 0;
        return hasValidBackdrop && hasTrailer;
      })
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5);
  }

  return (
    <>
      <MovieListSchema
        movies={nowShowing}
        pageTitle="Movies in Bahrain Cinemas"
        pageDescription="Find movies playing in Bahrain cinemas - Cineco, VOX, Cinépolis, and more. Watch trailers and book tickets."
        pageUrl="https://bahrainnights.com/cinema"
      />
      <Suspense fallback={null}>
        <CinemaNetflixClient allMovies={allMovies} heroMovies={heroMovies} />
      </Suspense>
    </>
  );
}

// Metadata for SEO
export const metadata = {
  title: 'Cinema in Bahrain - Movies Now Showing & Coming Soon',
  description: 'Find movies now showing in Bahrain cinemas. Check what\'s playing at Cineco, VOX, Cinépolis, and Mukta A2 Cinemas. Watch trailers, see showtimes, and book tickets online.',
  keywords: ['cinema in Bahrain', 'movies in Bahrain', 'Bahrain cinema', 'now showing Bahrain', 'Cineco', 'VOX Bahrain', 'movie showtimes Bahrain'],
  openGraph: {
    title: 'Cinema in Bahrain - Movies Now Showing & Coming Soon | BahrainNights',
    description: 'Find movies now showing in Bahrain cinemas. Check what\'s playing at Cineco, VOX, Cinépolis, and Mukta A2 Cinemas.',
    url: 'https://bahrainnights.com/cinema',
    type: 'website',
  },
  alternates: {
    canonical: 'https://bahrainnights.com/cinema',
  },
};
