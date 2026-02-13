import { Suspense } from 'react';
import { supabaseAdmin } from '@/lib/supabase';
import CinemaPageClient from '@/components/cinema/CinemaPageClient';
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

// Filter and deduplicate movies
function filterValidMovies(movies: DBMovie[]): DBMovie[] {
  // Filter movies - allow those with valid posters OR from Cineco/VOX scrapers
  const validMovies = movies.filter(movie => {
    const poster = movie.poster_url || '';
    const hasValidPoster = poster.startsWith('http') && !poster.includes('placeholder') && !poster.includes('null');
    const isFromScraper = movie.scraped_from && movie.scraped_from.length > 0;
    
    // Allow movies with valid posters OR movies from cinema scrapers (even without posters)
    return hasValidPoster || isFromScraper;
  });

  // Remove duplicates by title (case-insensitive)
  const seen = new Set<string>();
  return validMovies.filter(movie => {
    const key = movie.title.toLowerCase().trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// Fetch all movies on the server (VOX + Cineco + manual entries)
async function getMovies() {
  const [nowShowingRes, comingSoonRes] = await Promise.all([
    supabaseAdmin
      .from('movies')
      .select('*')
      .eq('is_now_showing', true)
      // Show VOX, Cineco movies or manual entries (no scraped_from)
      .or('scraped_from.is.null,scraped_from.cs.{vox},scraped_from.cs.{cineco}')
      .order('tmdb_rating', { ascending: false }),
    supabaseAdmin
      .from('movies')
      .select('*')
      .eq('is_coming_soon', true)
      // Show VOX, Cineco movies or manual entries (no scraped_from)
      .or('scraped_from.is.null,scraped_from.cs.{vox},scraped_from.cs.{cineco}')
      .order('release_date', { ascending: true })
  ]);

  // Filter out invalid posters and duplicates
  const filteredNowShowing = filterValidMovies(nowShowingRes.data || []);
  const filteredComingSoon = filterValidMovies(comingSoonRes.data || []);

  const nowShowing = filteredNowShowing.map((m: DBMovie) => convertToMovieFormat(m));
  const comingSoon = filteredComingSoon.map((m: DBMovie) => convertToMovieFormat(m));

  return { nowShowing, comingSoon };
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
  const [{ nowShowing, comingSoon }, cinemas, lastUpdated] = await Promise.all([
    getMovies(),
    getCinemas(),
    getLastUpdated()
  ]);

  return (
    <>
      <MovieListSchema
        movies={nowShowing}
        pageTitle="Movies Now Showing in Bahrain - VOX Cinemas"
        pageDescription="Find movies now showing at VOX Cinemas Bahrain - VOX City Centre and VOX The Avenues"
        pageUrl="https://www.bahrainnights.com/cinema"
      />
      <Suspense fallback={null}>
        <CinemaPageClient
          initialNowShowing={nowShowing}
          initialComingSoon={comingSoon}
          initialCinemas={cinemas}
          lastUpdated={lastUpdated}
        />
      </Suspense>
    </>
  );
}

// Metadata for SEO
export const metadata = {
  title: 'Cinema in Bahrain - Movies Now Showing & Coming Soon | VOX & Cineco',
  description: 'Find movies now showing at VOX Cinemas and Cineco Bahrain. Check what\'s playing, watch trailers, and book tickets online at VOX City Centre, VOX The Avenues, Cineco Seef, and more.',
  keywords: ['cinema in Bahrain', 'movies in Bahrain', 'Bahrain cinema', 'now showing Bahrain', 'VOX Bahrain', 'Cineco Bahrain', 'VOX City Centre', 'VOX The Avenues', 'Cineco Seef', 'movie showtimes Bahrain'],
  openGraph: {
    title: 'Cinema in Bahrain - Movies Now Showing & Coming Soon | VOX & Cineco',
    description: 'Find movies now showing at VOX Cinemas and Cineco Bahrain. Watch trailers and book tickets online.',
    url: 'https://www.bahrainnights.com/cinema',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/cinema',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cinema in Bahrain - Movies Now Showing & Coming Soon',
    description: 'Find movies now showing at VOX Cinemas and Cineco Bahrain. Book tickets online.',
  },
};
