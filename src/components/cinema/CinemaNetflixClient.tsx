'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Search, Film, X } from 'lucide-react';
import CinemaHeroPlayer from './CinemaHeroPlayer';
import MovieRow from './MovieRow';
import { Movie } from './MovieCard';

// Lazy load modals
const MovieModal = dynamic(() => import('./MovieModal'), {
  loading: () => null,
  ssr: false,
});

const TrailerModal = dynamic(() => import('./TrailerModal'), {
  loading: () => null,
  ssr: false,
});

interface CinemaNetflixClientProps {
  allMovies: Movie[];
}

// Genre configuration for rows
const GENRE_ROWS = [
  { genre: 'Action', icon: '💥', title: 'Action Films' },
  { genre: 'Comedy', icon: '😂', title: 'Comedy' },
  { genre: 'Horror', icon: '👻', title: 'Horror & Thriller' },
  { genre: 'Thriller', icon: '🔪', title: 'Thriller' },
  { genre: 'Drama', icon: '🎭', title: 'Drama' },
  { genre: 'Family', icon: '👨‍👩‍👧‍👦', title: 'Family Friendly' },
  { genre: 'Animation', icon: '🎨', title: 'Animation' },
  { genre: 'Adventure', icon: '🗺️', title: 'Adventure' },
  { genre: 'Science Fiction', icon: '🚀', title: 'Sci-Fi' },
  { genre: 'Fantasy', icon: '🧙', title: 'Fantasy' },
  { genre: 'Romance', icon: '💕', title: 'Romance' },
  { genre: 'Crime', icon: '🔍', title: 'Crime' },
  { genre: 'Documentary', icon: '📹', title: 'Documentary' },
];

export default function CinemaNetflixClient({ allMovies }: CinemaNetflixClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isMovieModalOpen, setIsMovieModalOpen] = useState(false);
  const [trailerMovie, setTrailerMovie] = useState<Movie | null>(null);
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);

  // Featured movies for hero - top rated with valid backdrops and trailers
  const heroMovies = useMemo(() => {
    return allMovies
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
  }, [allMovies]);

  // Group movies by genre
  const moviesByGenre = useMemo(() => {
    const groups: Record<string, Movie[]> = {};

    GENRE_ROWS.forEach(({ genre }) => {
      groups[genre] = allMovies.filter((movie) =>
        movie.genres.some((g) => g.toLowerCase().includes(genre.toLowerCase()))
      );
    });

    return groups;
  }, [allMovies]);

  // Top Rated row
  const topRatedMovies = useMemo(() => {
    return [...allMovies]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 15);
  }, [allMovies]);

  // Search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return allMovies.filter((movie) =>
      movie.title.toLowerCase().includes(query) ||
      movie.genres.some((g) => g.toLowerCase().includes(query))
    );
  }, [allMovies, searchQuery]);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsMovieModalOpen(true);
  };

  const handleTrailerClick = () => {
    if (selectedMovie) {
      setTrailerMovie(selectedMovie);
      setIsTrailerModalOpen(true);
    }
  };

  const isSearching = searchQuery.trim().length > 0;

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section with Auto-Playing Trailers */}
      {!isSearching && heroMovies.length > 0 && (
        <CinemaHeroPlayer
          movies={heroMovies}
          onMovieClick={handleMovieClick}
        />
      )}

      {/* Search Bar - Fixed at top when scrolling */}
      <div className={`sticky top-16 z-30 bg-gradient-to-b from-gray-950 via-gray-950/95 to-transparent ${isSearching ? 'pt-24' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3 bg-gray-800/80 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`relative ${isSearching ? '' : '-mt-32'} z-10 pb-20`}>
        {isSearching ? (
          /* Search Results */
          <div className="px-6 md:px-12 pt-4">
            <h2 className="text-2xl font-bold text-white mb-6">
              {searchResults.length > 0
                ? `Found ${searchResults.length} result${searchResults.length !== 1 ? 's' : ''}`
                : 'No movies found'}
            </h2>
            {searchResults.length > 0 ? (
              <MovieRow
                title="Search Results"
                icon="🔍"
                movies={searchResults}
                onSelectMovie={handleMovieClick}
              />
            ) : (
              <div className="text-center py-20">
                <Film className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">
                  Try searching for a different movie title or genre
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Genre Rows */
          <div className="space-y-2 md:space-y-4">
            {/* Top Rated Row */}
            {topRatedMovies.length > 0 && (
              <MovieRow
                title="Top Rated"
                icon="⭐"
                movies={topRatedMovies}
                onSelectMovie={handleMovieClick}
              />
            )}

            {/* Featured Films - All movies that have trailers */}
            {heroMovies.length > 0 && (
              <MovieRow
                title="Featured Films"
                icon="🎬"
                movies={allMovies.filter(m => m.trailerUrl && m.trailerUrl.length > 0).slice(0, 20)}
                onSelectMovie={handleMovieClick}
              />
            )}

            {/* Genre-based Rows */}
            {GENRE_ROWS.map(({ genre, icon, title }) => {
              const movies = moviesByGenre[genre] || [];
              if (movies.length === 0) return null;

              return (
                <MovieRow
                  key={genre}
                  title={title}
                  icon={icon}
                  movies={movies}
                  onSelectMovie={handleMovieClick}
                />
              );
            })}

            {/* Latest Releases - by release date */}
            <MovieRow
              title="Latest Releases"
              icon="🆕"
              movies={[...allMovies]
                .sort((a, b) => {
                  const dateA = a.releaseDate ? new Date(a.releaseDate).getTime() : 0;
                  const dateB = b.releaseDate ? new Date(b.releaseDate).getTime() : 0;
                  return dateB - dateA;
                })
                .slice(0, 20)}
              onSelectMovie={handleMovieClick}
            />
          </div>
        )}
      </div>

      {/* Movie Detail Modal */}
      <MovieModal
        movie={selectedMovie}
        isOpen={isMovieModalOpen}
        onClose={() => setIsMovieModalOpen(false)}
        onTrailerClick={handleTrailerClick}
      />

      {/* Trailer Modal */}
      <TrailerModal
        isOpen={isTrailerModalOpen}
        onClose={() => setIsTrailerModalOpen(false)}
        title={trailerMovie?.title || ''}
        trailerUrl={trailerMovie?.trailerUrl || ''}
      />
    </div>
  );
}
