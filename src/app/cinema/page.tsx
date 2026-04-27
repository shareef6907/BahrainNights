import { Suspense } from 'react';
import { supabaseAdmin } from '@/lib/supabase';
import CinemaPageClient from '@/components/cinema/CinemaPageClient';
import { Movie } from '@/components/cinema/MovieCard';
import MovieListSchema from '@/components/SEO/MovieListSchema';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

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

// Helper to construct full TMDB image URLs
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

// Filter movies with valid posters
function filterValidMovies(movies: DBMovie[]): DBMovie[] {
  const validMovies = movies.filter(movie => {
    const poster = movie.poster_url || '';
    if (!poster || poster.includes('placeholder') || poster.includes('null')) {
      return false;
    }
    return true;
  });

  // Remove duplicates by title
  const seen = new Set<string>();
  return validMovies.filter(movie => {
    const key = movie.title.toLowerCase().trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// Fetch all movies - now showing OR coming soon
async function getMovies() {
  const [nowShowingRes, comingSoonRes] = await Promise.all([
    supabaseAdmin
      .from('movies')
      .select('*')
      .eq('is_now_showing', true)
      .order('tmdb_rating', { ascending: false }),
    supabaseAdmin
      .from('movies')
      .select('*')
      .eq('is_coming_soon', true)
      .order('release_date', { ascending: true })
  ]);

  const filteredNowShowing = filterValidMovies(nowShowingRes.data || []);
  const filteredComingSoon = filterValidMovies(comingSoonRes.data || []);

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
        .select('*')
        .in('id', movieIds);

      if (movies && movies.length > 0) {
        const movieMap = new Map(movies.map(m => [m.id, m]));
        const orderedMovies = featured
          .map(f => movieMap.get(f.movie_id))
          .filter((m): m is DBMovie => m !== undefined && !!m.trailer_key)
          .map(m => convertToMovieFormat(m));
        
        if (orderedMovies.length > 0) {
          return orderedMovies;
        }
      }
    }

    // Fallback: Get recent movies with trailers
    const { data: fallbackMovies } = await supabaseAdmin
      .from('movies')
      .select('*')
      .eq('is_now_showing', true)
      .not('trailer_key', 'is', null)
      .order('release_date', { ascending: false })
      .limit(8);

    return filterValidMovies(fallbackMovies || [])
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