'use client';

import { motion } from 'framer-motion';
import MovieCard, { Movie } from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
  onTrailerClick: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onMovieClick, onTrailerClick }: MovieGridProps) {
  if (movies.length === 0) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center py-20 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-6xl mb-4">🎬</div>
        <h3 className="text-xl font-bold text-white mb-2">No movies found</h3>
        <p className="text-gray-400 max-w-md">
          Try adjusting your filters or check back later for new releases.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {movies.map((movie, index) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          index={index}
          onMovieClick={onMovieClick}
          onTrailerClick={onTrailerClick}
        />
      ))}
    </div>
  );
}
