'use client';

import { motion } from 'framer-motion';
import { Play, Star, Clock } from 'lucide-react';
import Image from 'next/image';

export interface Movie {
  id: string;
  title: string;
  slug: string;
  poster: string;
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
}

interface MovieCardProps {
  movie: Movie;
  index?: number;
  onMovieClick: (movie: Movie) => void;
  onTrailerClick: (movie: Movie) => void;
}

export default function MovieCard({ movie, index = 0, onMovieClick, onTrailerClick }: MovieCardProps) {
  return (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      onClick={() => onMovieClick(movie)}
    >
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-slate-800 shadow-lg group-hover:shadow-2xl group-hover:shadow-yellow-500/10 transition-all duration-300">
        {/* Poster Image */}
        <Image
          src={movie.poster}
          alt={movie.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          unoptimized
        />

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/80 backdrop-blur-sm rounded-lg">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-white font-bold text-sm">{movie.rating}</span>
        </div>

        {/* Now Showing / Coming Soon Badge */}
        <div className="absolute top-3 left-3">
          {movie.isNowShowing ? (
            <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-lg">
              Now Showing
            </span>
          ) : (
            <span className="px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded-lg">
              {movie.releaseDate}
            </span>
          )}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
          {/* Play Trailer Button */}
          <motion.button
            className="p-4 bg-yellow-400 rounded-full text-black shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onTrailerClick(movie);
            }}
          >
            <Play className="w-6 h-6 fill-current" />
          </motion.button>

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
