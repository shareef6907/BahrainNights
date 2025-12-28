const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

export interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  runtime: number;
  genres: { id: number; name: string }[];
  vote_average: number;
  original_language: string;
  videos?: { results: { key: string; type: string; site: string }[] };
  credits?: {
    cast: { name: string; character: string }[];
    crew: { name: string; job: string }[];
  };
}

export interface TMDBResponse {
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
  page: number;
}

export async function getNowPlaying(page = 1): Promise<TMDBResponse> {
  if (!TMDB_API_KEY) {
    throw new Error('TMDB_API_KEY is not configured');
  }

  // Try Bahrain region first
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&region=BH&page=${page}`,
    { next: { revalidate: 3600 } } // Cache for 1 hour
  );

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`);
  }

  const data = await response.json();

  // If BH has no results, fallback to US
  if (data.results.length === 0) {
    const fallback = await fetch(
      `${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&region=US&page=${page}`,
      { next: { revalidate: 3600 } }
    );
    return fallback.json();
  }

  return data;
}

export async function getUpcoming(page = 1): Promise<TMDBResponse> {
  if (!TMDB_API_KEY) {
    throw new Error('TMDB_API_KEY is not configured');
  }

  const response = await fetch(
    `${TMDB_BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}&region=BH&page=${page}`,
    { next: { revalidate: 3600 } }
  );

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`);
  }

  const data = await response.json();

  // If BH has no results, fallback to US
  if (data.results.length === 0) {
    const fallback = await fetch(
      `${TMDB_BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}&region=US&page=${page}`,
      { next: { revalidate: 3600 } }
    );
    return fallback.json();
  }

  return data;
}

export async function getMovieDetails(tmdbId: number): Promise<TMDBMovie> {
  if (!TMDB_API_KEY) {
    throw new Error('TMDB_API_KEY is not configured');
  }

  const response = await fetch(
    `${TMDB_BASE_URL}/movie/${tmdbId}?api_key=${TMDB_API_KEY}&append_to_response=videos,credits`,
    { next: { revalidate: 86400 } } // Cache for 24 hours
  );

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`);
  }

  return response.json();
}

export async function searchMovies(query: string): Promise<TMDBMovie[]> {
  if (!TMDB_API_KEY) {
    throw new Error('TMDB_API_KEY is not configured');
  }

  const response = await fetch(
    `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`,
    { next: { revalidate: 3600 } }
  );

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`);
  }

  const data = await response.json();
  return data.results;
}

export async function getPopularMovies(page = 1): Promise<TMDBResponse> {
  if (!TMDB_API_KEY) {
    throw new Error('TMDB_API_KEY is not configured');
  }

  const response = await fetch(
    `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`,
    { next: { revalidate: 3600 } }
  );

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`);
  }

  return response.json();
}

export function getPosterUrl(path: string | null, size: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w500'): string {
  if (!path) return '/images/movie-placeholder.jpg';
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}

export function getBackdropUrl(path: string | null, size: 'w300' | 'w780' | 'w1280' | 'original' = 'w1280'): string {
  if (!path) return '/images/backdrop-placeholder.jpg';
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}

export function getTrailerUrl(videos?: TMDBMovie['videos']): string | null {
  if (!videos?.results?.length) return null;

  // First try to find official trailer
  const officialTrailer = videos.results.find(
    v => v.type === 'Trailer' && v.site === 'YouTube'
  );

  if (officialTrailer) {
    return `https://www.youtube.com/watch?v=${officialTrailer.key}`;
  }

  // Fallback to any YouTube video
  const anyYouTube = videos.results.find(v => v.site === 'YouTube');
  if (anyYouTube) {
    return `https://www.youtube.com/watch?v=${anyYouTube.key}`;
  }

  return null;
}

export function getTrailerKey(videos?: TMDBMovie['videos']): string | null {
  if (!videos?.results?.length) return null;

  const trailer = videos.results.find(
    v => v.type === 'Trailer' && v.site === 'YouTube'
  );

  if (trailer) return trailer.key;

  // Fallback to any YouTube video
  const anyYouTube = videos.results.find(v => v.site === 'YouTube');
  return anyYouTube?.key || null;
}

export function getDirector(credits?: TMDBMovie['credits']): string | null {
  if (!credits?.crew?.length) return null;
  const director = credits.crew.find(c => c.job === 'Director');
  return director?.name || null;
}

export function getCast(credits?: TMDBMovie['credits'], limit = 5): string[] {
  if (!credits?.cast?.length) return [];
  return credits.cast.slice(0, limit).map(c => c.name);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function getRating(voteAverage: number): string {
  // This is a simplified rating - in production you'd want actual MPAA ratings
  if (voteAverage >= 8) return 'G';
  if (voteAverage >= 7) return 'PG';
  if (voteAverage >= 6) return 'PG-13';
  if (voteAverage >= 5) return '15+';
  return '18+';
}

export function getGenreNames(genres?: { id: number; name: string }[]): string[] {
  if (!genres?.length) return [];
  return genres.map(g => g.name);
}

export function formatRuntime(minutes: number | null | undefined): string {
  if (!minutes) return 'TBA';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  return `${hours}h ${mins}m`;
}

export function getLanguageName(code: string): string {
  const languages: Record<string, string> = {
    en: 'English',
    ar: 'Arabic',
    hi: 'Hindi',
    fr: 'French',
    es: 'Spanish',
    de: 'German',
    ja: 'Japanese',
    ko: 'Korean',
    zh: 'Chinese',
    ta: 'Tamil',
    te: 'Telugu',
    ml: 'Malayalam',
  };
  return languages[code] || code.toUpperCase();
}
