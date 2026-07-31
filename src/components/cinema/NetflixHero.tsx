'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
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
  const [isMuted, setIsMuted] = useState(true); // Start muted for mobile autoplay
  const [userInteracted, setUserInteracted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [ytApiReady, setYtApiReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isMobileRef = useRef(false); // Track current mobile state for useEffect
  const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null);
  const playerRef = useRef<any>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);
  const [showPoster, setShowPoster] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const isTouchDeviceRef = useRef(false);
  const lastPosterIndexRef = useRef<number>(0);

  // --- DEBUG STATE (remove in one commit) ---
  const [playerCreated, setPlayerCreated] = useState(false);
  const [onReadyFired, setOnReadyFired] = useState(false);
  const [lastStateChange, setLastStateChange] = useState<string>('none');
  const [lastError, setLastError] = useState<string>('none');
  const [polledState, setPolledState] = useState<string>('n/a');
  // --- END DEBUG STATE ---

  // Detect mobile and touch capability
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      isMobileRef.current = mobile;
      const touch = typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0;
      setIsTouchDevice(touch);
      isTouchDeviceRef.current = touch;
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load YouTube IFrame Player API — all devices.
  // Runs once on mount ([] dep). On mobile the poster paints first (LCP);
  // player creation is deferred 100ms in the mount effect.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.YT && window.YT.Player) {
      setYtApiReady(true);
      // Fall through — NOT an early return. Cleanup below must register.
    } else {
      (window as any).onYouTubeIframeAPIReady = () => {
        setYtApiReady(true);
      };
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    // Registered ONCE, reached on every code path including the already-loaded branch.
    return () => {
      if (playerRef.current) {
        try { playerRef.current.destroy(); } catch {}
        playerRef.current = null;
      }
      initializedRef.current = false;
    };
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
          mute: 1, // MUST be 1 for mobile autoplay to work
          controls: 0,
          showinfo: 0,
          rel: 0,
          loop: 1,
          playsinline: 1, // Critical for iOS
          modestbranding: 1,
          iv_load_policy: 3,
          disablekb: 1,
          fs: 0,
          origin: typeof window !== 'undefined' ? window.location.origin : '',
        },
        events: {
          onReady: (event: { target: any }) => {
            console.log('YT Player ready, state:', event.target.getPlayerState());
            setOnReadyFired(true);
            event.target.playVideo();
            // Fade poster on non-touch devices once player is ready — desktop iframe loads reliably.
            // On touch devices (phone, iPad): poster fades only on PLAYING to preserve the guarantee.
            if (!isTouchDeviceRef.current) {
              setShowPoster(false);
            }
            // Try to unmute after playback starts
            setTimeout(() => {
              try {
                event.target.unMute();
                event.target.setVolume(50);
                setIsMuted(false);
              } catch (e) {
                // Browser blocked unmute — keep muted, show unmute button
                setIsMuted(true);
              }
            }, 1000);
          },
          onError: (event: { target: any; data: number }) => {
            // DEBUG: YouTube error codes — https://developers.google.com/youtube/iframe_api_reference#onError
            // Codes 2 and 5 are usually network/embed issues. Codes 101/150 mean embedding disabled.
            setLastError(String(event.data));
            console.log('YouTube onError, code:', event.data);
            // If autoplay with audio fails, retry muted
            event.target.mute();
            event.target.setVolume(50);
            event.target.playVideo();
          },
          onStateChange: (event: { target: any; data: number }) => {
            // DEBUG: track raw state change data
            setLastStateChange(String(event.data));
            // Loop when video ends (YT.PlayerState.ENDED = 0)
            if (event.data === 0) {
              event.target.seekTo(0);
              event.target.playVideo();
            }
            // Fade poster on PLAYING (1) — all devices.
            // On touch devices: this is the only path that hides the poster.
            // If video never plays, poster stays (no timer).
            if (event.data === 1) {
              setShowPoster(false);
            }
          },
        },
      } as any);

      playerRef.current = player;
      initializedRef.current = true;
      setPlayerCreated(true);
    } catch (e) {
      console.error('Failed to create YouTube player:', e);
    }
  }, [ytApiReady]);

  // --- DEBUG: poll getPlayerState every 500ms (remove in one commit) ---
  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getPlayerState === 'function') {
        const state = playerRef.current.getPlayerState();
        setPolledState(String(state));
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Initialize player on mount
  useEffect(() => {
    if (!movies || movies.length === 0 || !ytApiReady) return;

    const videoId = getYouTubeId(movies[0]?.trailerUrl);

    if (videoId && !initializedRef.current && !playerRef.current) {
      // Defer on mobile — poster must paint first (LCP). Desktop creates immediately.
      const delay = isMobileRef.current ? 100 : 0;
      const timer = setTimeout(() => {
        if (!initializedRef.current && !playerRef.current) {
          createPlayer(videoId);
          initializedRef.current = true;
        }
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [ytApiReady, createPlayer]);

  // When currentIndex changes, load new video
  useEffect(() => {
    if (!movies || movies.length === 0 || !ytApiReady) return;

    const currentMovie = movies[currentIndex];
    const videoId = getYouTubeId(currentMovie?.trailerUrl);

    if (!videoId) return;

    // Only reset poster if the slide actually changed, not on parent re-render
    if (currentIndex !== lastPosterIndexRef.current) {
      lastPosterIndexRef.current = currentIndex;
      setShowPoster(true);
    }

    if (playerRef.current && playerRef.current.loadVideoById) {
      // Video already exists — load new video (start muted for mobile autoplay)
      playerRef.current.loadVideoById(videoId);
      playerRef.current.mute();
      playerRef.current.playVideo();
      playerRef.current.seekTo(0);
      // Try to unmute after playback starts
      setTimeout(() => {
        try {
          playerRef.current?.unMute();
          playerRef.current?.setVolume(50);
          setIsMuted(false);
        } catch (e) {
          setIsMuted(true);
        }
      }, 1000);
    } else if (!initializedRef.current) {
      // No player yet — create new one
      const delay = isMobileRef.current ? 100 : 0;
      const timer = setTimeout(() => {
        if (!initializedRef.current && !playerRef.current) {
          createPlayer(videoId);
          initializedRef.current = true;
        }
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [movies, currentIndex, ytApiReady, createPlayer]);

  // Auto-unmute on desktop after user interaction
  useEffect(() => {
    if (!isMobile && !isTouchDeviceRef.current && !userInteracted && playerRef.current) {
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
  const backdropUrl = currentMovie?.backdrop || currentMovie?.poster;

  // Handle mobile play button tap — opens YouTube fullscreen
  const handleMobilePlay = useCallback(() => {
    if (videoId) {
      window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
    }
  }, [videoId]);

  // Tap-to-unmute on mobile: tap the poster/video area to toggle mute.
  // closest('button') prevents triggering when user taps any button
  // (play button, Trailer, Book, Info, nav arrows, dots).
  const handleHeroTap = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    if (isTouchDeviceRef.current && playerRef.current) {
      try {
        if (isMuted) {
          playerRef.current.unMute();
          playerRef.current.setVolume(50);
        } else {
          playerRef.current.mute();
        }
        setIsMuted(!isMuted);
        setUserInteracted(true);
      } catch {
        // Player not ready — ignore
      }
    }
  };

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
      onClick={handleHeroTap}
    >
      {/* YouTube iframe — always rendered, z-[1], underneath poster.
          pointer-events-none: content overlay buttons must remain tappable.
          On mobile: created after 100ms (deferred for LCP).
          On desktop: created immediately. */}
      <div
        id="youtube-player"
        ref={playerContainerRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
        style={{ transform: 'scale(1.15)', transformOrigin: 'center center' }}
      />

      {/* Poster (Plan B) — always rendered, z-[2], above iframe.
          Fades to opacity 0 on PLAYING (all devices) or onReady (non-touch only).
          Shows if video never plays — no timer, poster stays.
          pointer-events-none on container: does not intercept taps.
          Yellow play button: rendered ONLY on touch devices AND only while poster is visible.
          Desktop (non-touch): no play button ever. */}
      {backdropUrl ? (
        <div
          className="absolute inset-0 w-full h-full pointer-events-none z-[2]"
          style={{ opacity: showPoster ? 1 : 0, transition: 'opacity 300ms ease-out' }}
        >
          <Image
            src={backdropUrl}
            alt={currentMovie?.title || 'Movie backdrop'}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50 pointer-events-none" />
          {/* Play button: only rendered on touch devices AND only while poster is visible.
              Not in DOM after PLAYING — poster-area tap reaches handleHeroTap. */}
          {isTouchDevice && showPoster && (
            <button
              onClick={handleMobilePlay}
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              style={{ pointerEvents: 'auto' }}
              aria-label="Play trailer"
            >
              <div className="w-20 h-20 rounded-full bg-[#d4a853] hover:bg-[#c49a48] flex items-center justify-center transition-all transform hover:scale-110 shadow-2xl">
                <Play className="w-10 h-10 text-black ml-1" fill="black" />
              </div>
            </button>
          )}
        </div>
      ) : (
        /* No-backdrop fallback: same opacity treatment as the poster branch.
           Fades on the same signals so it never sits above a playing video. */
        <div
          className="absolute inset-0 bg-gray-900 flex items-center justify-center z-[2]"
          style={{ opacity: showPoster ? 1 : 0, transition: 'opacity 300ms ease-out' }}
        >
          <Play className="w-16 h-16 text-gray-600" />
        </div>
      )}

      {/* Gradient overlays for cinematic feel — pointer-events: none */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent z-[5] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/20 z-[5] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent z-[5] pointer-events-none" />

      {/* Content Overlay — Netflix style, on top of video */}
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
                {currentMovie?.rating && (
                  <span className="text-[#d4a853] font-semibold">★ {currentMovie.rating}/10</span>
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

              {/* Synopsis — hidden on mobile for space */}
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
        className={`absolute ${isMobile ? 'bottom-28 right-4' : 'bottom-32 right-6'} p-3 md:p-3 bg-red-600 hover:bg-red-500 active:bg-red-700 rounded-full border-2 border-white text-white transition-all z-20 ${
          isMobile ? 'animate-pulse' : ''
        }`}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? <VolumeX className="w-5 h-5 md:w-5 md:h-5" /> : <Volume2 className="w-5 h-5 md:w-5 md:h-5" />}
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

      {/* DEBUG OVERLAY — visible when ?debug=1 in URL (remove in one commit) */}
      {typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('debug') === '1' && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 9999,
            background: 'rgba(0,0,0,0.92)',
            color: '#00ff00',
            fontFamily: 'monospace',
            fontSize: '12px',
            padding: '10px 14px',
            lineHeight: '1.7',
            minWidth: '280px',
            border: '1px solid #00ff00',
          }}
        >
          <div style={{ color: '#fff', fontWeight: 'bold', marginBottom: '6px', borderBottom: '1px solid #00ff00', paddingBottom: '4px' }}>
            NETFLIX HERO DEBUG
          </div>
          <div>isMobile: <span style={{ color: isMobile ? '#ff6b6b' : '#aaa' }}>{String(isMobile)}</span></div>
          <div>isTouchDevice: <span style={{ color: isTouchDevice ? '#ff6b6b' : '#aaa' }}>{String(isTouchDevice)}</span></div>
          <div>ytApiReady: <span style={{ color: ytApiReady ? '#ff6b6b' : '#aaa' }}>{String(ytApiReady)}</span></div>
          <div>playerCreated: <span style={{ color: playerCreated ? '#ff6b6b' : '#aaa' }}>{String(playerCreated)}</span></div>
          <div>onReady fired: <span style={{ color: onReadyFired ? '#ff6b6b' : '#aaa' }}>{String(onReadyFired)}</span></div>
          <div>lastStateChange: <span style={{ color: '#ff0' }}>{lastStateChange}</span></div>
          <div>polledState: <span style={{ color: '#ff0' }}>{polledState}</span></div>
          <div>lastError: <span style={{ color: lastError !== 'none' ? '#ff4444' : '#aaa' }}>{lastError}</span></div>
          <div style={{ marginTop: '6px', borderTop: '1px solid #00ff00', paddingTop: '4px', color: '#888', fontSize: '10px' }}>
            state: -1=unstarted, 0=ended, 1=playing, 2=paused, 3=buffering, 5=cued
          </div>
        </div>
      )}
    </div>
  );
}
