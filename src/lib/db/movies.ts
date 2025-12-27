import { getAdminClient } from '@/lib/supabase/server';
import type { Movie, MovieInsert, MovieUpdate, Showtime, ShowtimeInsert, MovieWithShowtimes } from '@/types/database';

export interface MovieFilters {
  status?: Movie['status'] | 'all';
  genre?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

// Get all movies with optional filters
export async function getMovies(filters: MovieFilters = {}): Promise<Movie[]> {
  const supabase = getAdminClient();

  let query = supabase
    .from('movies')
    .select('*')
    .order('release_date', { ascending: false });

  if (filters.status && filters.status !== 'all') {
    query = query.eq('status', filters.status);
  }

  if (filters.genre) {
    query = query.contains('genre', [filters.genre]);
  }

  if (filters.search) {
    query = query.or(`title.ilike.%${filters.search}%,overview.ilike.%${filters.search}%`);
  }

  if (filters.limit) {
    query = query.limit(filters.limit);
  }

  if (filters.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching movies:', error);
    throw new Error('Failed to fetch movies');
  }

  return (data || []) as Movie[];
}

// Get now showing movies
export async function getNowShowingMovies(): Promise<Movie[]> {
  return getMovies({ status: 'now_showing' });
}

// Get coming soon movies
export async function getComingSoonMovies(): Promise<Movie[]> {
  return getMovies({ status: 'coming_soon' });
}

// Get movie by slug
export async function getMovieBySlug(slug: string): Promise<Movie | null> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('movies')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Error fetching movie by slug:', error);
    throw new Error('Failed to fetch movie');
  }

  return data as Movie;
}

// Get movie by slug with showtimes
export async function getMovieBySlugWithShowtimes(slug: string): Promise<MovieWithShowtimes | null> {
  const supabase = getAdminClient();

  // First get the movie
  const { data: movieData, error: movieError } = await supabase
    .from('movies')
    .select('*')
    .eq('slug', slug)
    .single();

  if (movieError) {
    if (movieError.code === 'PGRST116') {
      return null;
    }
    console.error('Error fetching movie:', movieError);
    throw new Error('Failed to fetch movie');
  }

  const movie = movieData as Movie;

  // Then get showtimes for today and future
  const today = new Date().toISOString().split('T')[0];
  const { data: showtimes, error: showtimesError } = await supabase
    .from('showtimes')
    .select('*')
    .eq('movie_id', movie.id)
    .gte('show_date', today)
    .order('show_date', { ascending: true })
    .order('showtime', { ascending: true });

  if (showtimesError) {
    console.error('Error fetching showtimes:', showtimesError);
  }

  return {
    ...movie,
    showtimes: (showtimes || []) as Showtime[],
  };
}

// Get movie by ID
export async function getMovieById(id: string): Promise<Movie | null> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('movies')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('Error fetching movie by ID:', error);
    throw new Error('Failed to fetch movie');
  }

  return data as Movie;
}

// Create movie
export async function createMovie(movie: MovieInsert): Promise<Movie> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('movies')
    .insert(movie as any)
    .select()
    .single();

  if (error) {
    console.error('Error creating movie:', error);
    throw new Error('Failed to create movie');
  }

  return data as Movie;
}

// Update movie
export async function updateMovie(id: string, updates: MovieUpdate): Promise<Movie> {
  const supabase = getAdminClient();

  const { data, error } = await (supabase as any)
    .from('movies')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating movie:', error);
    throw new Error('Failed to update movie');
  }

  return data as Movie;
}

// Delete movie
export async function deleteMovie(id: string): Promise<void> {
  const supabase = getAdminClient();

  const { error } = await supabase
    .from('movies')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting movie:', error);
    throw new Error('Failed to delete movie');
  }
}

// Get showtimes for a movie
export async function getShowtimesForMovie(movieId: string, date?: string): Promise<Showtime[]> {
  const supabase = getAdminClient();

  let query = supabase
    .from('showtimes')
    .select('*')
    .eq('movie_id', movieId)
    .order('showtime', { ascending: true });

  if (date) {
    query = query.eq('show_date', date);
  } else {
    // Default to today and future
    const today = new Date().toISOString().split('T')[0];
    query = query.gte('show_date', today);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching showtimes:', error);
    throw new Error('Failed to fetch showtimes');
  }

  return (data || []) as Showtime[];
}

// Create showtime
export async function createShowtime(showtime: ShowtimeInsert): Promise<Showtime> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('showtimes')
    .insert(showtime as any)
    .select()
    .single();

  if (error) {
    console.error('Error creating showtime:', error);
    throw new Error('Failed to create showtime');
  }

  return data as Showtime;
}

// Create multiple showtimes
export async function createShowtimes(showtimes: ShowtimeInsert[]): Promise<Showtime[]> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('showtimes')
    .insert(showtimes as any)
    .select();

  if (error) {
    console.error('Error creating showtimes:', error);
    throw new Error('Failed to create showtimes');
  }

  return (data || []) as Showtime[];
}

// Delete showtime
export async function deleteShowtime(id: string): Promise<void> {
  const supabase = getAdminClient();

  const { error } = await supabase
    .from('showtimes')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting showtime:', error);
    throw new Error('Failed to delete showtime');
  }
}

// Delete all showtimes for a movie
export async function deleteShowtimesForMovie(movieId: string): Promise<void> {
  const supabase = getAdminClient();

  const { error } = await supabase
    .from('showtimes')
    .delete()
    .eq('movie_id', movieId);

  if (error) {
    console.error('Error deleting showtimes:', error);
    throw new Error('Failed to delete showtimes');
  }
}

// Get all genres
export async function getMovieGenres(): Promise<string[]> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('movies')
    .select('genre');

  if (error) {
    console.error('Error fetching genres:', error);
    return [];
  }

  const movies = (data || []) as { genre: string[] | null }[];
  const allGenres = movies.flatMap(m => m.genre || []);
  const uniqueGenres = [...new Set(allGenres)];
  return uniqueGenres;
}

// Get all cinemas
export async function getCinemas(): Promise<string[]> {
  const supabase = getAdminClient();

  const { data, error } = await supabase
    .from('showtimes')
    .select('cinema_name');

  if (error) {
    console.error('Error fetching cinemas:', error);
    return [];
  }

  const showtimes = (data || []) as { cinema_name: string }[];
  const cinemas = [...new Set(showtimes.map(s => s.cinema_name))];
  return cinemas;
}
