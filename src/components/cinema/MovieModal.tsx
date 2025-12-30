'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Clock, Play, ExternalLink, Ticket } from 'lucide-react';
import Image from 'next/image';
import { Movie } from './MovieCard';

// Bahrain cinema booking URLs
const BAHRAIN_CINEMAS = [
  {
    id: 'cineco',
    name: 'Cineco',
    logo: '/images/cinemas/cineco.png',
    locations: ['Seef Mall', 'Saar Mall', 'Oasis Mall', 'Wadi Al Sail'],
    bookingUrl: 'https://bahrain.cineco.net/',
    color: 'from-red-500/20 to-red-600/20',
    borderColor: 'border-red-500/30',
    hoverColor: 'hover:border-red-400',
  },
  {
    id: 'vox',
    name: 'VOX Cinemas',
    logo: '/images/cinemas/vox.png',
    locations: ['City Centre', 'The Avenues'],
    bookingUrl: 'https://bhr.voxcinemas.com/',
    color: 'from-purple-500/20 to-purple-600/20',
    borderColor: 'border-purple-500/30',
    hoverColor: 'hover:border-purple-400',
  },
  {
    id: 'cinepolis',
    name: 'Cinépolis',
    logo: '/images/cinemas/cinepolis.png',
    locations: ['Wadi Al Sail'],
    bookingUrl: 'https://bahrain.cinepolisgulf.com/',
    color: 'from-blue-500/20 to-blue-600/20',
    borderColor: 'border-blue-500/30',
    hoverColor: 'hover:border-blue-400',
  },
  {
    id: 'mukta',
    name: 'Mukta A2 Cinemas',
    logo: '/images/cinemas/mukta.png',
    locations: ['Juffair'],
    bookingUrl: 'https://www.muktaa2cinemas.com/bahrain',
    color: 'from-amber-500/20 to-amber-600/20',
    borderColor: 'border-amber-500/30',
    hoverColor: 'hover:border-amber-400',
  },
];

interface MovieModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
  onTrailerClick: () => void;
}

export default function MovieModal({
  movie,
  isOpen,
  onClose,
  onTrailerClick,
}: MovieModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!movie) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[95] overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="min-h-full flex items-start justify-center p-4 pt-10 pb-20">
              <motion.div
                className="relative w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl"
                data-testid="movie-modal"
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header with Backdrop */}
                <div className="relative h-[250px] md:h-[300px]">
                  <Image
                    src={movie.backdrop}
                    alt={movie.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors z-10"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Content */}
                <div className="relative -mt-24 px-6 pb-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Poster */}
                    <div className="relative w-[140px] md:w-[180px] aspect-[2/3] rounded-xl overflow-hidden shadow-2xl flex-shrink-0 mx-auto md:mx-0">
                      <Image
                        src={movie.poster}
                        alt={movie.title}
                        fill
                        className="object-cover"
                        sizes="180px"
                        unoptimized
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 pt-4 md:pt-16">
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 text-center md:text-left">
                        {movie.title}
                      </h2>

                      {/* Meta */}
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                        <div className="flex items-center gap-1 px-3 py-1 bg-yellow-400/10 border border-yellow-400/30 rounded-lg">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-yellow-400 font-bold">{movie.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-300">
                          <Clock className="w-4 h-4" />
                          <span>{movie.duration}</span>
                        </div>
                        <span className="text-gray-300">{movie.language}</span>
                      </div>

                      {/* Genres */}
                      <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                        {movie.genres.map((genre) => (
                          <span
                            key={genre}
                            className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>

                      {/* Trailer Button */}
                      {movie.trailerUrl && (
                        <button
                          onClick={onTrailerClick}
                          className="flex items-center gap-2 mx-auto md:mx-0 px-5 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-colors"
                        >
                          <Play className="w-5 h-5 fill-current" />
                          Watch Trailer
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Synopsis */}
                  <div className="mt-6 p-4 bg-white/5 rounded-xl">
                    <h3 className="text-lg font-bold text-white mb-2">Synopsis</h3>
                    <p className="text-gray-300 leading-relaxed">{movie.synopsis}</p>
                  </div>

                  {/* Cast */}
                  {movie.cast && movie.cast.length > 0 && (
                    <div className="mt-4 p-4 bg-white/5 rounded-xl">
                      <h3 className="text-lg font-bold text-white mb-2">Cast</h3>
                      <p className="text-gray-300">{movie.cast.join(', ')}</p>
                    </div>
                  )}

                  {/* Book Tickets Section - Now Showing */}
                  {movie.isNowShowing && (
                    <div className="mt-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Ticket className="w-6 h-6 text-yellow-400" />
                        <h3 className="text-xl font-bold text-white">Book Tickets</h3>
                      </div>

                      <p className="text-gray-400 mb-4">
                        Select a cinema to book your tickets for {movie.title}
                      </p>

                      {/* Cinema Grid - Show ALL cinemas for Now Showing movies */}
                      {/* Most movies in Bahrain play at all major cinemas, so show all booking options */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {BAHRAIN_CINEMAS.map((cinema) => (
                            <a
                              key={cinema.id}
                              href={cinema.bookingUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-testid="cinema-option"
                              className={`group p-4 bg-gradient-to-br ${cinema.color} border ${cinema.borderColor} ${cinema.hoverColor} rounded-xl transition-all hover:scale-[1.02] hover:shadow-lg`}
                            >
                              <div className="flex items-center gap-4">
                                {/* Cinema Logo Placeholder */}
                                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                  <span className="text-2xl font-bold text-white">
                                    {cinema.name.charAt(0)}
                                  </span>
                                </div>

                                <div className="flex-1 min-w-0">
                                  <h4 className="font-bold text-white text-lg truncate">
                                    {cinema.name}
                                  </h4>
                                  <p className="text-sm text-gray-400 truncate">
                                    {cinema.locations.join(' • ')}
                                  </p>
                                </div>

                                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg group-hover:bg-yellow-400 group-hover:text-black transition-all">
                                  <span className="font-medium text-white group-hover:text-black">
                                    Book Now
                                  </span>
                                  <ExternalLink className="w-4 h-4 text-white group-hover:text-black" />
                                </div>
                              </div>
                            </a>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Coming Soon */}
                  {!movie.isNowShowing && (
                    <div className="mt-6 p-6 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20 rounded-xl text-center">
                      <p className="text-orange-400 font-medium mb-1">Coming to cinemas</p>
                      <p className="text-2xl font-bold text-white">{movie.releaseDate}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
