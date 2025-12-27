'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Clock, Play, ExternalLink, MapPin } from 'lucide-react';
import Image from 'next/image';
import { Movie } from './MovieCard';
import DateSelector from './DateSelector';

interface Showtime {
  time: string;
  format: string;
  bookingUrl: string;
}

interface CinemaShowtimes {
  cinemaName: string;
  cinemaLogo?: string;
  location: string;
  showtimes: Showtime[];
}

interface MovieModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
  onTrailerClick: () => void;
  showtimes: CinemaShowtimes[];
  dates: { date: string; dayName: string; dayNumber: string; month: string; isToday: boolean }[];
}

export default function MovieModal({
  movie,
  isOpen,
  onClose,
  onTrailerClick,
  showtimes,
  dates
}: MovieModalProps) {
  const [selectedDate, setSelectedDate] = useState(dates[0]?.date || '');

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

  const formatBadgeColor = (format: string) => {
    switch (format.toLowerCase()) {
      case 'imax':
        return 'bg-blue-500 text-white';
      case 'vip':
        return 'bg-purple-500 text-white';
      case '3d':
        return 'bg-green-500 text-white';
      default:
        return 'bg-white/10 text-gray-300';
    }
  };

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
                      <button
                        onClick={onTrailerClick}
                        className="flex items-center gap-2 mx-auto md:mx-0 px-5 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-colors"
                      >
                        <Play className="w-5 h-5 fill-current" />
                        Watch Trailer
                      </button>
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

                  {/* Showtimes Section */}
                  {movie.isNowShowing && (
                    <div className="mt-6">
                      <h3 className="text-xl font-bold text-white mb-4">Showtimes</h3>

                      {/* Date Selector */}
                      <div className="mb-6">
                        <DateSelector
                          dates={dates}
                          selectedDate={selectedDate}
                          onDateSelect={setSelectedDate}
                        />
                      </div>

                      {/* Cinemas */}
                      <div className="space-y-4">
                        {showtimes.map((cinema) => (
                          <div
                            key={cinema.cinemaName}
                            className="p-4 bg-white/5 border border-white/10 rounded-xl"
                          >
                            <div className="flex items-center gap-3 mb-3">
                              {cinema.cinemaLogo && (
                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                                  <Image
                                    src={cinema.cinemaLogo}
                                    alt={cinema.cinemaName}
                                    width={32}
                                    height={32}
                                    className="object-contain"
                                  />
                                </div>
                              )}
                              <div>
                                <h4 className="font-bold text-white">{cinema.cinemaName}</h4>
                                <div className="flex items-center gap-1 text-sm text-gray-400">
                                  <MapPin className="w-3.5 h-3.5" />
                                  <span>{cinema.location}</span>
                                </div>
                              </div>
                            </div>

                            {/* Showtimes */}
                            <div className="flex flex-wrap gap-2">
                              {cinema.showtimes.map((showtime, idx) => (
                                <a
                                  key={idx}
                                  href={showtime.bookingUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="group flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-yellow-400/10 hover:border-yellow-400/50 transition-all"
                                >
                                  <span className="text-white font-medium group-hover:text-yellow-400">
                                    {showtime.time}
                                  </span>
                                  {showtime.format !== 'Standard' && (
                                    <span className={`px-2 py-0.5 text-xs font-bold rounded ${formatBadgeColor(showtime.format)}`}>
                                      {showtime.format}
                                    </span>
                                  )}
                                  <ExternalLink className="w-3.5 h-3.5 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                              ))}
                            </div>
                          </div>
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
