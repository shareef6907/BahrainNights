'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Star, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Movie } from './MovieCard';

interface FeaturedMovieProps {
  movies: Movie[];
  onTrailerClick: (movie: Movie) => void;
  onMovieClick: (movie: Movie) => void;
}

export default function FeaturedMovie({ movies, onTrailerClick, onMovieClick }: FeaturedMovieProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [movies.length]);

  const movie = movies[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

  return (
    <div className="relative h-[500px] md:h-[550px] rounded-3xl overflow-hidden">
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={movie.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={movie.backdrop}
            alt={movie.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            unoptimized
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="flex items-center gap-8 md:gap-12">
            {/* Poster */}
            <AnimatePresence mode="wait">
              <motion.div
                key={movie.id}
                className="hidden md:block relative w-[200px] lg:w-[250px] aspect-[2/3] rounded-xl overflow-hidden shadow-2xl flex-shrink-0"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src={movie.poster}
                  alt={movie.title}
                  fill
                  className="object-cover"
                  sizes="250px"
                  unoptimized
                />
              </motion.div>
            </AnimatePresence>

            {/* Info */}
            <AnimatePresence mode="wait">
              <motion.div
                key={movie.id}
                className="flex-1 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                {/* Badge */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                    NEW AT VOX
                  </span>
                  {movie.releaseDate && (
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                      {movie.releaseDate}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
                  {movie.title}
                </h2>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  {/* Rating */}
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-lg">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="text-white font-bold">{movie.rating}</span>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-1.5 text-gray-300">
                    <Clock className="w-4 h-4" />
                    <span>{movie.duration}</span>
                  </div>

                  {/* Language */}
                  <span className="text-gray-300">{movie.language}</span>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre}
                      className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm text-gray-300"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                {/* Synopsis */}
                <p className="text-gray-300 line-clamp-2 md:line-clamp-3 mb-6">
                  {movie.synopsis}
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap gap-3">
                  {/* Watch Trailer Button - Only show if trailer exists */}
                  {movie.trailerUrl && (
                    <motion.button
                      onClick={() => onTrailerClick(movie)}
                      className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white font-medium hover:bg-white/20 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Play className="w-5 h-5 fill-current" />
                      Watch Trailer
                    </motion.button>
                  )}

                  <motion.button
                    onClick={() => onMovieClick(movie)}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 rounded-xl text-black font-bold hover:shadow-lg hover:shadow-orange-500/25 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Book Tickets
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {movies.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            aria-label="Previous movie"
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            aria-label="Next movie"
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {movies.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {movies.map((movie, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to ${movie.title}`}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? 'w-8 bg-yellow-400' : 'w-2 bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
