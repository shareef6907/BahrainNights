'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Play, Star, Clock, Film } from 'lucide-react';
import Image from 'next/image';

export interface Movie {
  id: string;
  title: string;
  slug: string;
  poster: string;
  /**
   * False when there is no usable poster artwork. The card then renders a
   * branded fallback poster instead of a broken image — a film that is
   * showing must never be hidden for lack of a poster.
   */
  hasPoster?: boolean;
  backdrop: string;
  rating: number;
  genres: string[];
  duration: string;
  language: string;
  releaseDate?: string;
  isNowShowing: boolean;
  synopsis: string;
  trailerUrl: string;
  cast?: string[];
  scrapedFrom?: string[]; // Which cinemas have this movie: ['cineco', 'vox', 'mukta', 'cinepolis']
}

interface MovieCardProps {
  movie: Movie;
  index?: number;
  onMovieClick: (movie: Movie) => void;
  onTrailerClick: (movie: Movie) => void;
}

function MovieCard({ movie, index = 0, onMovieClick, onTrailerClick }: MovieCardProps) {
  return (
    <motion.div
      className="group cursor-pointer"
      data-testid="movie-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      onClick={() => onMovieClick(movie)}
    >
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-slate-800 shadow-lg group-hover:shadow-2xl group-hover:shadow-yellow-500/10 transition-all duration-300">
        {/* Poster Image — or a branded fallback when the film has no artwork */}
        {movie.hasPoster !== false && movie.poster ? (
          <Image
            src={movie.poster}
            alt={movie.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            unoptimized
          />
        ) : (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#1c1c1c] via-[#141414] to-[#0a0a0a] px-4 text-center"
            role="img"
            aria-label={`${movie.title} — poster unavailable`}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#d4a853]/40 bg-[#d4a853]/10 mb-3">
              <Film className="h-6 w-6 text-[#d4a853]" />
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#d4a853]/70">
              Bahrain Nights
            </span>
          </div>
        )}

        {/* Rating Badge — hidden when there is no rating.
            A rating of 0 means "unrated" (unreleased films have no TMDB score),
            and a badge reading "0" reads as a broken widget rather than an
            absent one. */}
        {movie.rating > 0 && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/80 backdrop-blur-sm rounded-lg">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-white font-bold text-sm">{movie.rating}</span>
          </div>
        )}

        {/* Now Showing / Coming Soon Badge */}
        <div className="absolute top-3 left-3">
          {movie.isNowShowing ? (
            <span className="px-2 py-1 bg-green-700 text-white text-xs font-bold rounded-lg">
              Now Showing
            </span>
          ) : (
            <span className="px-2 py-1 bg-orange-700 text-white text-xs font-bold rounded-lg">
              {movie.releaseDate}
            </span>
          )}
        </div>

        {/* Mobile Play Button - Always visible on touch devices */}
        {movie.trailerUrl && (
          <button
            className="md:hidden absolute bottom-3 left-3 p-3 bg-yellow-400 rounded-full text-black shadow-lg active:scale-95 transition-transform z-10"
            onClick={(e) => {
              e.stopPropagation();
              onTrailerClick(movie);
            }}
            aria-label="Play trailer"
          >
            <Play className="w-5 h-5 fill-current" />
          </button>
        )}

        {/* Hover Overlay - Desktop only */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex flex-col items-center justify-center gap-3">
          {/* Play Trailer Button - Only show if trailer exists */}
          {movie.trailerUrl && (
            <motion.button
              className="p-4 bg-yellow-400 rounded-full text-black shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                onTrailerClick(movie);
              }}
              aria-label={`Play trailer for ${movie.title}`}
            >
              <Play className="w-6 h-6 fill-current" />
            </motion.button>
          )}

          {/* Book Tickets Button */}
          <button
            className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white text-sm font-medium hover:bg-white/30 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onMovieClick(movie);
            }}
          >
            Book Tickets
          </button>
        </div>
      </div>

      {/* Movie Info */}
      <div className="mt-3 space-y-1">
        <h3 className="font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-1">
          {movie.title}
        </h3>

        {/* Genre Tags */}
        <div className="flex flex-wrap gap-1">
          {movie.genres.slice(0, 2).map((genre) => (
            <span
              key={genre}
              className="px-2 py-0.5 bg-white/10 rounded text-xs text-gray-400"
            >
              {genre}
            </span>
          ))}
        </div>

        {/* Duration */}
        <div className="flex items-center gap-1 text-sm text-gray-400">
          <Clock className="w-3.5 h-3.5" />
          <span>{movie.duration}</span>
        </div>
      </div>
    </motion.div>
  );
}

// Memoize to prevent unnecessary re-renders in lists
export default React.memo(MovieCard, (prevProps, nextProps) => {
  return (
    prevProps.movie.id === nextProps.movie.id &&
    prevProps.index === nextProps.index &&
    prevProps.onMovieClick === nextProps.onMovieClick &&
    prevProps.onTrailerClick === nextProps.onTrailerClick
  );
});
