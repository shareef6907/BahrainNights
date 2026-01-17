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

// Fetch all movies on the server (excluding Mukta-only movies)
async function getMovies() {
  // Fetch all movies - we'll group them by genre on the client side
  // This avoids the "Now Showing" / "Coming Soon" labels since scraper data isn't 100% accurate
  const { data: allMoviesData } = await supabaseAdmin
    .from('movies')
    .select('*')
    // Exclude movies that are ONLY from Mukta - only show VOX, Cineco, Seef, or manual entries
    .or('scraped_from.is.null,scraped_from.cs.{vox},scraped_from.cs.{cineco},scraped_from.cs.{seef}')
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

// Server Component - data is fetched BEFORE the page renders
export default async function CinemaPage() {
  // Fetch all data on the server - NO loading state needed!
  const [{ allMovies, nowShowing }, lastUpdated] = await Promise.all([
    getMovies(),
    getLastUpdated()
  ]);

  return (
    <>
      <MovieListSchema
        movies={nowShowing}
        pageTitle="Movies in Bahrain Cinemas"
        pageDescription="Find movies playing in Bahrain cinemas - Cineco, VOX, Cinépolis, and more. Watch trailers and book tickets."
        pageUrl="https://bahrainnights.com/cinema"
      />
      <Suspense fallback={null}>
        <CinemaNetflixClient allMovies={allMovies} />
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
