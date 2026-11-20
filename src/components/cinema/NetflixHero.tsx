'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ChevronLeft, ChevronRight, Ticket, Info } from 'lucide-react';
import { Movie } from './MovieCard';
import TrailerPlayer from './TrailerPlayer';

interface NetflixHeroProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
  onBookClick: (movie: Movie) => void;
}

function getYouTubeId(url: string | undefined): string | null {
  if (!url) return null;
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export default function NetflixHero({ movies, onMovieClick, onBookClick }: NetflixHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isMobileRef = useRef(false);
  const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      isMobileRef.current = mobile;
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const currentMovie = movies[currentIndex];
  const videoId = getYouTubeId(currentMovie?.trailerUrl);
  const backdropUrl = currentMovie?.backdrop || currentMovie?.poster;

  // Auto-advance every 25 seconds
  const startAutoAdvance = useCallback(() => {
    if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current);
    autoAdvanceRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 25000);
  }, [movies.length]);

  useEffect(() => {
    if (movies.length > 1) startAutoAdvance();
    return () => { if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current); };
  }, [movies.length, startAutoAdvance]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    startAutoAdvance();
  }, [startAutoAdvance]);

  const goToPrevious = useCallback(() => {
    goToSlide(currentIndex === 0 ? movies.length - 1 : currentIndex - 1);
  }, [currentIndex, movies.length, goToSlide]);

  const goToNext = useCallback(() => {
    goToSlide((currentIndex + 1) % movies.length);
  }, [currentIndex, movies.length, goToSlide]);

  if (!movies || movies.length === 0) {
    return (
      <div className="relative flex items-center justify-center bg-gradient-to-b from-gray-900 to-black"
        style={{ width: '100vw', height: '80vh', marginLeft: 'calc(-50vw + 50%)' }}>
        <div className="text-center">
          <Play className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Coming Soon</h2>
          <p className="text-gray-400">Check back for the latest movie trailers</p>
        </div>
      </div>
    );
  }

  return (
    <div
      /*
       * Height comes from CSS media queries, not from the `isMobile` state:
       * the server rendered 85vh and the client switched it to 70vh after
       * hydration, which shifted the layout below the hero (CLS).
       */
      className="relative overflow-hidden bg-black h-[70vh] md:h-[85vh] min-h-[400px] md:min-h-[600px]"
      style={{
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)'
      }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/*
        The trailer player owns the poster/facade, the lazy YouTube iframe, the
        unmuted-first playback attempt and the muted fallback. The hero only
        renders the overlay content on top of it.
      */}
      {videoId ? (
        <div className="absolute inset-0 z-0">
          <TrailerPlayer
            key={videoId}
            videoId={videoId}
            poster={backdropUrl}
            title={currentMovie?.title ? `${currentMovie.title} trailer` : 'Trailer'}
            activation="click"
            priority
            playButtonPlacement="bottomRight"
            aspectRatio={null}
            className="h-full w-full"
          />
        </div>
      ) : (
        backdropUrl ? (
          <div className="absolute inset-0 z-0">
            <Image
              src={backdropUrl}
              alt={currentMovie?.title || 'Movie backdrop'}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        ) : null
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent z-[5] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/20 z-[5] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent z-[5] pointer-events-none" />

      <div className="absolute inset-0 flex items-end z-10 pointer-events-none">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 pb-16 md:pb-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl md:text-6xl lg:text-7xl font-black text-white mb-2 md:mb-4 drop-shadow-2xl">
                {currentMovie?.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2 md:mb-4 text-gray-300 text-xs md:text-base">
                {currentMovie?.rating ? (
                  <span className="text-[#d4a853] font-semibold">★ {currentMovie.rating}/10</span>
                ) : null}
                {currentMovie?.genres?.slice(0, isMobile ? 2 : 3).map((genre, i) => (
                  <span key={genre} className="flex items-center">
                    {i > 0 && <span className="mx-1 md:mx-2 text-gray-500">•</span>}
                    {genre}
                  </span>
                ))}
                {currentMovie?.duration && (
                  <><span className="mx-1 md:mx-2 text-gray-500">•</span><span>{currentMovie.duration}</span></>
                )}
              </div>
              {currentMovie?.synopsis && (
                <p className="hidden md:block text-gray-300 text-sm md:text-base line-clamp-2 md:line-clamp-3 mb-6 max-w-xl">
                  {currentMovie.synopsis}
                </p>
              )}
              <div className="flex flex-wrap gap-2 md:gap-3 mt-3 md:mt-0">
                {videoId && (
                  <motion.button onClick={() => onMovieClick(currentMovie)}
                    className="pointer-events-auto flex items-center gap-1.5 md:gap-2 px-3 md:px-6 py-2 md:py-3 bg-white text-black text-sm md:text-base font-bold rounded-lg hover:bg-gray-200 transition-colors"
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Play className="w-4 h-4 md:w-5 md:w-5 fill-current" />Trailer
                  </motion.button>
                )}
                <motion.button onClick={() => onBookClick(currentMovie)}
                  className="pointer-events-auto flex items-center gap-1.5 md:gap-2 px-3 md:px-6 py-2 md:py-3 bg-red-600 text-white text-sm md:text-base font-bold rounded-lg hover:bg-red-700 transition-colors"
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Ticket className="w-4 h-4 md:w-5 md:w-5" />Book
                </motion.button>
                <motion.button onClick={() => onMovieClick(currentMovie)}
                  className="pointer-events-auto flex items-center gap-1.5 md:gap-2 px-3 md:px-6 py-2 md:py-3 bg-gray-800/80 text-white text-sm md:text-base font-medium rounded-lg hover:bg-gray-700 transition-colors border border-gray-600"
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Info className="w-4 h-4 md:w-5 md:w-5" />Info
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {movies.length > 1 && (
        <>
          <motion.button onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all z-20"
            initial={{ opacity: 0 }} animate={{ opacity: showControls || isMobile ? 1 : 0 }}
            aria-label="Previous trailer">
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          <motion.button onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all z-20"
            initial={{ opacity: 0 }} animate={{ opacity: showControls || isMobile ? 1 : 0 }}
            aria-label="Next trailer">
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </>
      )}

      {movies.length > 1 && (
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {movies.map((_, index) => (
            <button key={index} onClick={() => goToSlide(index)} aria-label={`Go to trailer ${index + 1}`}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex ? 'w-8 h-2 bg-white' : 'w-2 h-2 bg-white/50 hover:bg-white/80'
              }`} />
          ))}
        </div>
      )}

    </div>
  );
}
