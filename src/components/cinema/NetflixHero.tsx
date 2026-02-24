'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Volume2, VolumeX, ChevronLeft, ChevronRight, Ticket, Info } from 'lucide-react';
import { Movie } from './MovieCard';

interface NetflixHeroProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
  onBookClick: (movie: Movie) => void;
}

// Extract YouTube video ID from various URL formats
function getYouTubeId(url: string | undefined): string | null {
  if (!url) return null;
  
  // Handle direct video IDs (no URL)
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
    return url;
  }
  
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
  const [isMuted, setIsMuted] = useState(true); // Start muted for autoplay
  const [userInteracted, setUserInteracted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-unmute on desktop after first load
  useEffect(() => {
    if (!isMobile && !userInteracted) {
      const timer = setTimeout(() => {
        setIsMuted(false);
        setUserInteracted(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isMobile, userInteracted]);

  // Auto-advance slides every 25 seconds
  const startAutoAdvance = useCallback(() => {
    if (autoAdvanceRef.current) {
      clearInterval(autoAdvanceRef.current);
    }
    autoAdvanceRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
      // DO NOT reset isMuted - preserve user's mute preference
    }, 25000);
  }, [movies.length]);

  useEffect(() => {
    if (movies.length > 1) {
      startAutoAdvance();
    }
    return () => {
      if (autoAdvanceRef.current) {
        clearInterval(autoAdvanceRef.current);
      }
    };
  }, [movies.length, startAutoAdvance]);

  // Navigate to specific slide - PRESERVE mute state
  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    startAutoAdvance();
    // DO NOT change isMuted here - preserve user's choice
  }, [startAutoAdvance]);

  const goToPrevious = useCallback(() => {
    goToSlide(currentIndex === 0 ? movies.length - 1 : currentIndex - 1);
  }, [currentIndex, movies.length, goToSlide]);

  const goToNext = useCallback(() => {
    goToSlide((currentIndex + 1) % movies.length);
  }, [currentIndex, movies.length, goToSlide]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
    setUserInteracted(true);
  }, []);

  if (!movies || movies.length === 0) {
    return (
      <div 
        className="relative flex items-center justify-center bg-gradient-to-b from-gray-900 to-black"
        style={{ width: '100vw', height: '80vh', marginLeft: 'calc(-50vw + 50%)' }}
      >
        <div className="text-center">
          <Play className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Coming Soon</h2>
          <p className="text-gray-400">Check back for the latest movie trailers</p>
        </div>
      </div>
    );
  }

  const currentMovie = movies[currentIndex];
  const videoId = getYouTubeId(currentMovie?.trailerUrl);

  // Build YouTube embed URL
  // Both mobile and desktop: hide YouTube controls for Netflix-like feel
  // Sound control handled via our custom button + iframe reload
  const getEmbedUrl = (id: string, muted: boolean) => {
    const params = new URLSearchParams({
      autoplay: '1',
      mute: muted ? '1' : '0',
      controls: '0', // Always hide YouTube controls for clean look
      loop: '1',
      playlist: id,
      modestbranding: '1',
      rel: '0',
      showinfo: '0',
      iv_load_policy: '3',
      disablekb: '1',
      playsinline: '1',
      origin: typeof window !== 'undefined' ? window.location.origin : '',
    });
    return `https://www.youtube.com/embed/${id}?${params.toString()}`;
  };

  return (
    <div 
      className="relative overflow-hidden bg-black"
      style={{ 
        width: '100vw', 
        height: isMobile ? '50vh' : '80vh', 
        minHeight: isMobile ? '300px' : '600px', 
        marginLeft: 'calc(-50vw + 50%)' 
      }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* YouTube Video Background */}
      <AnimatePresence mode="wait">
        {videoId && (
          <motion.div
            key={`video-${currentIndex}-${isMuted}`}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Video container - cover behavior on all devices for Netflix feel */}
            <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center">
              <iframe
                src={getEmbedUrl(videoId, isMuted)}
                className="pointer-events-none"
                style={{
                  // Cover behavior - fill container cinematically
                  border: 'none',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '100vw',
                  height: '56.25vw',
                  minHeight: '100%',
                  minWidth: '177.78vh',
                  transform: 'translate(-50%, -50%)',
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={currentMovie?.title || 'Movie Trailer'}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fallback backdrop if no trailer */}
      {!videoId && currentMovie?.backdrop && (
        <motion.div
          key={`backdrop-${currentIndex}`}
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${currentMovie.backdrop})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}

      {/* Gradient overlays for cinematic feel */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/20" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent" />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-end pb-16 md:pb-32">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Movie Title */}
              <h1 className="text-2xl md:text-6xl lg:text-7xl font-black text-white mb-2 md:mb-4 drop-shadow-2xl">
                {currentMovie?.title}
              </h1>

              {/* Meta Info - simplified on mobile */}
              <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2 md:mb-4 text-gray-300 text-xs md:text-base">
                {currentMovie?.genres?.slice(0, isMobile ? 2 : 3).map((genre, i) => (
                  <span key={genre} className="flex items-center">
                    {i > 0 && <span className="mx-1 md:mx-2 text-gray-500">•</span>}
                    {genre}
                  </span>
                ))}
                {currentMovie?.duration && (
                  <>
                    <span className="mx-1 md:mx-2 text-gray-500">•</span>
                    <span>{currentMovie.duration}</span>
                  </>
                )}
              </div>

              {/* Synopsis - hidden on mobile */}
              {currentMovie?.synopsis && (
                <p className="hidden md:block text-gray-300 text-sm md:text-base line-clamp-2 md:line-clamp-3 mb-6 max-w-xl">
                  {currentMovie.synopsis}
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 md:gap-3 mt-3 md:mt-0">
                {videoId && (
                  <motion.button
                    onClick={() => onMovieClick(currentMovie)}
                    className="flex items-center gap-1.5 md:gap-2 px-3 md:px-6 py-2 md:py-3 bg-white text-black text-sm md:text-base font-bold rounded-lg hover:bg-gray-200 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                    Trailer
                  </motion.button>
                )}
                <motion.button
                  onClick={() => onBookClick(currentMovie)}
                  className="flex items-center gap-1.5 md:gap-2 px-3 md:px-6 py-2 md:py-3 bg-red-600 text-white text-sm md:text-base font-bold rounded-lg hover:bg-red-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Ticket className="w-4 h-4 md:w-5 md:h-5" />
                  Book
                </motion.button>
                <motion.button
                  onClick={() => onMovieClick(currentMovie)}
                  className="flex items-center gap-1.5 md:gap-2 px-3 md:px-6 py-2 md:py-3 bg-gray-800/80 text-white text-sm md:text-base font-medium rounded-lg hover:bg-gray-700 transition-colors border border-gray-600"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Info className="w-4 h-4 md:w-5 md:h-5" />
                  Info
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mute/Unmute Button - shown on all devices */}
      <button
        onClick={toggleMute}
        className={`absolute ${isMobile ? 'bottom-20 right-4' : 'bottom-32 right-6'} p-2.5 md:p-3 bg-gray-800/70 hover:bg-gray-700/90 active:bg-gray-600/90 rounded-full border border-gray-600 text-white transition-all z-20`}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? <VolumeX className="w-4 h-4 md:w-5 md:h-5" /> : <Volume2 className="w-4 h-4 md:w-5 md:h-5" />}
      </button>

      {/* Tap to unmute hint - mobile only, when muted */}
      {isMobile && isMuted && !userInteracted && (
        <motion.div 
          className="absolute bottom-20 right-16 bg-black/80 text-white text-xs px-3 py-1.5 rounded-full z-20"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.3 }}
        >
          Tap for sound
        </motion.div>
      )}

      {/* Navigation Arrows */}
      {movies.length > 1 && (
        <>
          <motion.button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: showControls || isMobile ? 1 : 0 }}
            aria-label="Previous trailer"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          <motion.button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: showControls || isMobile ? 1 : 0 }}
            aria-label="Next trailer"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </>
      )}

      {/* Dot Indicators */}
      {movies.length > 1 && (
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {movies.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to trailer ${index + 1}`}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex 
                  ? 'w-8 h-2 bg-white' 
                  : 'w-2 h-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      )}

    </div>
  );
}
