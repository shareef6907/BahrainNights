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

// Global YouTube API reference
declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YouTubePlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  loadVideoById: (videoId: string) => void;
  seekTo: (seconds: number) => void;
  setLoop: (loop: boolean) => void;
  destroy: () => void;
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
  const [isMuted, setIsMuted] = useState(true); // Start muted for autoplay (browser requirement)
  const [userInteracted, setUserInteracted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [ytApiReady, setYtApiReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load YouTube IFrame Player API
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      
      window.onYouTubeIframeAPIReady = () => {
        setYtApiReady(true);
      };
    } else if (window.YT) {
      setYtApiReady(true);
    }
  }, []);

  // Create YouTube player
  const createPlayer = useCallback((videoId: string) => {
    if (!window.YT || !playerContainerRef.current || !ytApiReady) return;
    
    // Destroy existing player
    if (playerRef.current) {
      try {
        playerRef.current.destroy();
      } catch (e) {
        // Ignore destroy errors
      }
      playerRef.current = null;
    }

    // Clear container
    playerContainerRef.current.innerHTML = '';

    // Create new player instance
    try {
      const player = new window.YT.Player(playerContainerRef.current.id, {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          mute: 1, // Must start muted for mobile autoplay
          controls: 0,
          showinfo: 0,
          rel: 0,
          loop: 1,
          playsinline: 1, // Critical for iOS
          modestbranding: 1,
          iv_load_policy: 3,
          disablekb: 1,
          fs: 0,
          origin: typeof window !== 'undefined' ? window.location.origin : undefined,
        },
        events: {
          onReady: (event: { target: YouTubePlayer }) => {
            // Force play on ready
            event.target.playVideo();
            // Loop the video
            event.target.seekTo(0);
          },
          onStateChange: (event: { target: YouTubePlayer; data: number }) => {
            // Loop when video ends (YT.PlayerState.ENDED = 0)
            if (event.data === 0) {
              event.target.seekTo(0);
              event.target.playVideo();
            }
          },
        },
      });
      
      playerRef.current = player;
      initializedRef.current = true;
    } catch (e) {
      console.error('Failed to create YouTube player:', e);
    }
  }, [ytApiReady]);

  // Initialize player when movie changes
  useEffect(() => {
    if (!movies || movies.length === 0 || !ytApiReady) return;
    
    const currentMovie = movies[currentIndex];
    const videoId = getYouTubeId(currentMovie?.trailerUrl);
    
    if (videoId && !initializedRef.current) {
      createPlayer(videoId);
    }
  }, [movies, currentIndex, ytApiReady, createPlayer]);

  // Auto-unmute on desktop after user interaction
  useEffect(() => {
    if (!isMobile && !userInteracted && playerRef.current) {
      const timer = setTimeout(() => {
        if (playerRef.current) {
          try {
            playerRef.current.unMute();
            setIsMuted(false);
          } catch (e) {
            // Ignore if already unmuted
          }
        }
        setUserInteracted(true);
      }, 2000);
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

  // Navigate to specific slide
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

  // Toggle mute using YouTube API
  const toggleMute = useCallback(() => {
    if (playerRef.current) {
      try {
        if (isMuted) {
          playerRef.current.unMute();
        } else {
          playerRef.current.mute();
        }
      } catch (e) {
        console.error('Mute toggle error:', e);
      }
    }
    setIsMuted(!isMuted);
    setUserInteracted(true);
  }, [isMuted]);

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

  return (
    <div 
      className="relative overflow-hidden bg-black"
      style={{ 
        width: '100vw', 
        height: isMobile ? '70vh' : '85vh', 
        minHeight: isMobile ? '400px' : '600px', 
        marginLeft: 'calc(-50vw + 50%)' 
      }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* YouTube Player Container - full width, scaled to fill */}
      <div 
        id="youtube-player"
        ref={playerContainerRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ 
          transform: 'scale(1.15)',
          transformOrigin: 'center center',
        }}
      />

      {/* Gradient overlays for cinematic feel */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent z-[5]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/20 z-[5]" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent z-[5]" />

      {/* Content Overlay - Netflix style, on top of video */}
      <div className="absolute inset-0 flex items-end z-10">
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
              {/* Movie Title */}
              <h1 className="text-2xl md:text-6xl lg:text-7xl font-black text-white mb-2 md:mb-4 drop-shadow-2xl">
                {currentMovie?.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2 md:mb-4 text-gray-300 text-xs md:text-base">
                {currentMovie?.tmdb_rating && (
                  <span className="text-[#d4a853] font-semibold">★ {currentMovie.tmdb_rating}</span>
                )}
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

              {/* Synopsis - hidden on mobile for space */}
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

      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        className={`absolute ${isMobile ? 'bottom-24 right-4' : 'bottom-32 right-6'} p-2.5 md:p-3 bg-gray-800/70 hover:bg-gray-700/90 active:bg-gray-600/90 rounded-full border border-gray-600 text-white transition-all z-20`}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? <VolumeX className="w-4 h-4 md:w-5 md:h-5" /> : <Volume2 className="w-4 h-4 md:w-5 md:h-5" />}
      </button>

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