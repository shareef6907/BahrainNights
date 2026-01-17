'use client';

import { useState, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
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
  heroMovies?: Movie[];  // Admin-selected hero movies (optional - computed from allMovies if not provided)
}

// Genre configuration for rows - only genre-based rows, no "Top Rated" or "Featured"
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

export default function CinemaNetflixClient({ allMovies, heroMovies: serverHeroMovies }: CinemaNetflixClientProps) {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isMovieModalOpen, setIsMovieModalOpen] = useState(false);
  const [trailerMovie, setTrailerMovie] = useState<Movie | null>(null);
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);

  // Featured movies for hero - use server-provided if available, otherwise compute from allMovies
  const heroMovies = useMemo(() => {
    // If server provided hero movies, use them
    if (serverHeroMovies && serverHeroMovies.length > 0) {
      return serverHeroMovies;
    }

    // Fallback: compute from allMovies (with valid backdrops and trailers)
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
  }, [allMovies, serverHeroMovies]);

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

  // Listen for openMovieModal events from hero player
  useEffect(() => {
    const handleOpenModal = (e: CustomEvent) => {
      if (e.detail) {
        // Find the movie in allMovies that matches
        const movie = allMovies.find(m => m.id === e.detail.id || m.title === e.detail.title);
        if (movie) {
          setSelectedMovie(movie);
          setIsMovieModalOpen(true);
        }
      }
    };

    window.addEventListener('openMovieModal', handleOpenModal as EventListener);
    return () => window.removeEventListener('openMovieModal', handleOpenModal as EventListener);
  }, [allMovies]);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section with Auto-Playing Trailers */}
      {heroMovies.length > 0 && (
        <CinemaHeroPlayer
          movies={heroMovies}
          onMovieClick={handleMovieClick}
        />
      )}

      {/* Content - Genre Rows Only (No search bar, no Top Rated, no Featured) */}
      <div className="relative -mt-32 z-10 pb-20">
        <div className="space-y-2 md:space-y-4">
          {/* Genre-based Rows ONLY */}
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
