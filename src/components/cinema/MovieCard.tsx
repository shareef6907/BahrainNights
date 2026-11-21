'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Play, Star, Clock } from 'lucide-react';
import Image from 'next/image';
import { hasPlayableTrailer } from '@/lib/cinema/trailer';

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
  /**
   * The runtime, e.g. "2h 30min".
   *
   * EMPTY when the runtime is unknown. It is never "0min": a runtime of zero
   * minutes is not a runtime, it is missing information, and printing "0min"
   * on a card tells the visitor something false.
   */
  duration: string;
  language: string;
  releaseDate?: string;
  isNowShowing: boolean;
  synopsis: string;
  trailerUrl: string;
  cast?: string[];
  scrapedFrom?: string[]; // Which cinemas have this movie: ['cineco', 'vox', 'mukta', 'cinepolis']
  /**
   * The film's own page on each cinema, keyed by cinema id.
   *
   * e.g. `{ vox: 'https://bhr.voxcinemas.com/movies/i-play-rocky' }`
   *
   * Only URLs that the sync has VERIFIED answer HTTP 200 are stored here, so
   * a Book button built from this map can never point at a 404. When the map
   * is absent (the `booking_urls` column has not been created yet, or the
   * film's cinema slug could not be resolved) there is NO Book button.
   *
   * See `src/lib/cinema/booking-links.ts` for the single place that turns
   * this map into links.
   */
  bookingUrls?: Record<string, string>;
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
        {/*
          THE POSTER.

          There is no fallback card. Shareef's rule: "If there is no poster,
          take it from the cinema website in Bahrain. If the movie doesn't
          exist in Bahrain, don't show it. No poster, no cinema on
          bahrainnights.com."

          The poster now comes from the cinema's own listing for every film
          it screens (see scripts/scrape-vox.ts and scripts/scrape-cineco.ts),
          and a film that STILL has no poster is dropped from the page
          entirely rather than rendered as a branded placeholder. The
          placeholder grid is what visitors were seeing, and it read as a
          broken site.
        */}
        {movie.poster ? (
          <Image
            src={movie.poster}
            alt={movie.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            unoptimized
          />
        ) : null}

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

        {/*
          THE PLAY BUTTONS.

          Rendered only when the film has a trailer that can ACTUALLY PLAY —
          the same predicate the modal uses to decide it has a video. A
          truthy-but-unplayable trailer used to render a button that opened a
          black box reading "Trailer not available".
        */}
        {hasPlayableTrailer(movie.trailerUrl) && (
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
          {/* Play Trailer Button - only when the trailer can play */}
          {hasPlayableTrailer(movie.trailerUrl) && (
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

          {/*
            Book Tickets Button.

            It opens the film modal, where the cinemas the film is listed at
            are shown as Book buttons — but only the ones we have a verified
            per-film URL for. This button is NOT a link itself, so it never
            needs a URL.
          */}
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

        {/*
          THE RUNTIME.

          Rendered only when there IS a runtime. A missing runtime is not
          "0min" — it is unknown, and the element is left out entirely.
        */}
        {movie.duration ? (
          <div className="flex items-center gap-1 text-sm text-gray-400">
            <Clock className="w-3.5 h-3.5" />
            <span>{movie.duration}</span>
          </div>
        ) : null}
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
