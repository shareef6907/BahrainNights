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
  const [isMuted, setIsMuted] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isMobileRef = useRef(false);
  const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null);
  const playerRef = useRef<any>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [showPoster, setShowPoster] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const isTouchDeviceRef = useRef(false);
  const lastPosterIndexRef = useRef<number>(0);

  // Debug state
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [apiScriptLoaded, setApiScriptLoaded] = useState(false);
  const [playerBound, setPlayerBound] = useState(false);
  const [lastState, setLastState] = useState<string>('none');
  const [lastError, setLastError] = useState<string>('none');
  const [confirmedPlaying, setConfirmedPlaying] = useState(false);
  const [iframeLoadedAt, setIframeLoadedAt] = useState<number | null>(null);
  const [apiScriptLoadedAt, setApiScriptLoadedAt] = useState<number | null>(null);
  const [playerBoundAt, setPlayerBoundAt] = useState<number | null>(null);
  const mountTimestamp = useRef<number>(Date.now()).current;

  // Fallback timer: if iframe onLoad has not fired within 8s, leave poster up
  const iframeLoadTimerRef = useRef<NodeJS.Timeout | null>(null);

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

  const currentMovie = movies[currentIndex];
  const videoId = getYouTubeId(currentMovie?.trailerUrl);
  const backdropUrl = currentMovie?.backdrop || currentMovie?.poster;

  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const embedSrc = videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&fs=0&enablejsapi=1&origin=${encodeURIComponent(origin)}`
    : '';

  // --- iframe onLoad: reliable DOM event, does not depend on postMessage ---
  const handleIframeLoad = useCallback(() => {
    if (iframeLoadTimerRef.current) {
      clearTimeout(iframeLoadTimerRef.current);
      iframeLoadTimerRef.current = null;
    }
    setIframeLoaded(true);
    setIframeLoadedAt(Date.now());
    setShowPoster(false);

    // Destroy any previous YT player before rebinding
    if (playerRef.current) {
      try { playerRef.current.destroy(); } catch {}
      playerRef.current = null;
    }
    setPlayerBound(false);
    setLastState('none');
    setConfirmedPlaying(false);

    // Bind YouTube JS API to the existing iframe (does not recreate it)
    const bindApi = () => {
      if (!iframeRef.current || playerRef.current) return;
      try {
        const player = new window.YT.Player(iframeRef.current, {
          events: {
            onStateChange: (e: any) => {
              setLastState(String(e.data));
              if (e.data === 1) setConfirmedPlaying(true);
            },
            onError: (e: any) => {
              setLastError(String(e.data));
              console.log('YouTube onError, code:', e.data);
            },
          },
        });
        playerRef.current = player;
        setPlayerBound(true);
        setPlayerBoundAt(Date.now());
      } catch (err) {
        console.warn('YT.Player bind failed:', err);
      }
    };

    if (window.YT && window.YT.Player) {
      bindApi();
    } else {
      (window as any).onYouTubeIframeAPIReady = () => {
        setApiScriptLoaded(true);
        setApiScriptLoadedAt(Date.now());
        bindApi();
      };
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
        setApiScriptLoaded(true);
        setApiScriptLoadedAt(Date.now());
      } else {
        setApiScriptLoaded(true);
        setApiScriptLoadedAt(Date.now());
      }
    }
  }, []);

  // Start 8s fallback timer when embedSrc becomes truthy
  useEffect(() => {
    if (!embedSrc) return;
    if (iframeLoaded) return; // onLoad already fired
    iframeLoadTimerRef.current = setTimeout(() => {
      console.warn('iframe onLoad did not fire within 8s — poster remains');
    }, 8000);
    return () => {
      if (iframeLoadTimerRef.current) {
        clearTimeout(iframeLoadTimerRef.current);
        iframeLoadTimerRef.current = null;
      }
    };
  }, [embedSrc, iframeLoaded]);

  // Reset state and destroy player when videoId changes (slide change)
  useEffect(() => {
    return () => {
      if (playerRef.current) {
        try { playerRef.current.destroy(); } catch {}
        playerRef.current = null;
      }
    };
  }, [videoId]);

  // Slide-change: only reset poster, nothing else
  // key={videoId} in JSX handles the iframe remount and autoplay
  useEffect(() => {
    if (currentIndex !== lastPosterIndexRef.current) {
      lastPosterIndexRef.current = currentIndex;
      setShowPoster(true);
      setIframeLoaded(false);
      setIframeLoadedAt(null);
      setPlayerBound(false);
      setPlayerBoundAt(null);
      setLastState('none');
      setConfirmedPlaying(false);
    }
  }, [currentIndex]);

  // Auto-unmute on desktop after user interaction
  useEffect(() => {
    if (!isMobile && !isTouchDeviceRef.current && !userInteracted && playerRef.current) {
      const timer = setTimeout(() => {
        if (playerRef.current) {
          try { playerRef.current.unMute(); setIsMuted(false); } catch {}
        }
        setUserInteracted(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isMobile, userInteracted]);

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

  const toggleMute = useCallback(() => {
    if (playerRef.current) {
      try { isMuted ? playerRef.current.unMute() : playerRef.current.mute(); } catch {}
    }
    setIsMuted(!isMuted);
    setUserInteracted(true);
  }, [isMuted]);

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

  const handleMobilePlay = useCallback(() => {
    if (videoId) window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  }, [videoId]);

  // Tap-to-toggle on mobile
  const handleHeroTap = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    if (isTouchDeviceRef.current && playerRef.current) {
      try {
        if (isMuted) { playerRef.current.unMute(); playerRef.current.setVolume(50); }
        else { playerRef.current.mute(); }
        setIsMuted(!isMuted);
        setUserInteracted(true);
      } catch {}
    }
  };

  // Sound on first interaction — any tap anywhere enables sound
  useEffect(() => {
    const enableSound = () => {
      if (playerRef.current && isMuted) {
        try { playerRef.current.unMute(); playerRef.current.setVolume(50); } catch {}
        setIsMuted(false);
        setUserInteracted(true);
      }
    };
    document.addEventListener('click', enableSound, { once: true, passive: true });
    document.addEventListener('touchstart', enableSound, { once: true, passive: true });
    return () => {
      document.removeEventListener('click', enableSound);
      document.removeEventListener('touchstart', enableSound);
    };
  }, [isMuted]);

  const stateLabels: Record<string, string> = { '-1': 'unstarted', '0': 'ended', '1': 'playing', '2': 'paused', '3': 'buffering', '5': 'cued' };
  const elapsed = (ts: number | null) => ts === null ? '—' : `${Date.now() - mountTimestamp}ms`;

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
      {/* Declarative YouTube iframe — z-[1], below poster.
          key={videoId} causes React to remount on slide change — new video autoplays.
          autoplay, mute, playsinline, loop params are in the URL. No script needed. */}
      {embedSrc && (
        <iframe
          key={videoId}
          ref={iframeRef}
          src={embedSrc}
          title="Trailer"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          frameBorder="0"
          onLoad={handleIframeLoad}
          className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
          style={{ transform: 'scale(1.15)', transformOrigin: 'center center', border: 0 }}
        />
      )}

      {/* Poster — z-[2], fades on iframe onLoad (not on PLAYING). */}
      {backdropUrl ? (
        <div
          className="absolute inset-0 w-full h-full pointer-events-none z-[2]"
          style={{ opacity: showPoster ? 1 : 0, transition: 'opacity 300ms ease-out' }}
        >
          <Image src={backdropUrl} alt={currentMovie?.title || 'Movie backdrop'} fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-black/50 pointer-events-none" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-[2]"
          style={{ opacity: showPoster ? 1 : 0, transition: 'opacity 300ms ease-out' }}>
          <Play className="w-16 h-16 text-gray-600" />
        </div>
      )}

      {/* Small play button — touch devices only, bottom-right, above content.
          Renders while confirmedPlaying === false.
          Disappears within ~1-2s when PLAYING fires from the JS API.
          If JS API never binds: button remains as the escape hatch. */}
      {isTouchDevice && !confirmedPlaying && (
        <button
          onClick={handleMobilePlay}
          className="absolute bottom-28 right-4 flex items-center gap-2 px-4 py-2 bg-[#d4a853] hover:bg-[#c49a48] text-black font-bold rounded-lg z-[25] shadow-xl"
          aria-label="Play trailer"
        >
          <Play className="w-5 h-5 fill-current" />
          <span className="text-sm">Play</span>
        </button>
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent z-[5] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/20 z-[5] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent z-[5] pointer-events-none" />

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
              <h1 className="text-2xl md:text-6xl lg:text-7xl font-black text-white mb-2 md:mb-4 drop-shadow-2xl">
                {currentMovie?.title}
              </h1>
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
                    className="flex items-center gap-1.5 md:gap-2 px-3 md:px-6 py-2 md:py-3 bg-white text-black text-sm md:text-base font-bold rounded-lg hover:bg-gray-200 transition-colors"
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Play className="w-4 h-4 md:w-5 md:h-5 fill-current" />Trailer
                  </motion.button>
                )}
                <motion.button onClick={() => onBookClick(currentMovie)}
                  className="flex items-center gap-1.5 md:gap-2 px-3 md:px-6 py-2 md:py-3 bg-red-600 text-white text-sm md:text-base font-bold rounded-lg hover:bg-red-700 transition-colors"
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Ticket className="w-4 h-4 md:w-5 md:h-5" />Book
                </motion.button>
                <motion.button onClick={() => onMovieClick(currentMovie)}
                  className="flex items-center gap-1.5 md:gap-2 px-3 md:px-6 py-2 md:py-3 bg-gray-800/80 text-white text-sm md:text-base font-medium rounded-lg hover:bg-gray-700 transition-colors border border-gray-600"
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Info className="w-4 h-4 md:w-5 md:h-5" />Info
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <button
        onClick={toggleMute}
        className={`absolute ${isMobile ? 'bottom-28 right-4' : 'bottom-32 right-6'} p-3 md:p-3 bg-red-600 hover:bg-red-500 active:bg-red-700 rounded-full border-2 border-white text-white transition-all z-20 ${
          isMobile ? 'animate-pulse' : ''
        }`}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? <VolumeX className="w-5 h-5 md:w-5 md:h-5" /> : <Volume2 className="w-5 h-5 md:w-5 md:h-5" />}
      </button>

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

      {/* DEBUG OVERLAY — ?debug=1 (remove in one commit) */}
      {typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('debug') === '1' && (
        <div style={{
          position: 'fixed', top: 0, left: 0, zIndex: 9999,
          background: 'rgba(0,0,0,0.92)', color: '#00ff00',
          fontFamily: 'monospace', fontSize: '12px',
          padding: '10px 14px', lineHeight: '1.8', minWidth: '320px',
          border: '1px solid #00ff00',
        }}>
          <div style={{ color: '#fff', fontWeight: 'bold', marginBottom: '6px', borderBottom: '1px solid #00ff00', paddingBottom: '4px' }}>
            NETFLIX HERO DEBUG
          </div>
          <div>videoId: <span style={{ color: '#ff0' }}>{videoId ?? 'none'}</span></div>
          <div>isMobile: <span style={{ color: isMobile ? '#ff6b6b' : '#aaa' }}>{String(isMobile)}</span></div>
          <div>isTouchDevice: <span style={{ color: isTouchDevice ? '#ff6b6b' : '#aaa' }}>{String(isTouchDevice)}</span></div>
          <div>iframeRendered: <span style={{ color: embedSrc ? '#ff6b6b' : '#aaa' }}>{String(!!embedSrc)}</span></div>
          <div>onLoad fired: <span style={{ color: iframeLoaded ? '#ff6b6b' : '#aaa' }}>{String(iframeLoaded)}</span> {iframeLoaded ? `+${elapsed(iframeLoadedAt)}` : ''}</div>
          <div>apiScriptLoaded: <span style={{ color: apiScriptLoaded ? '#ff6b6b' : '#aaa' }}>{String(apiScriptLoaded)}</span> {apiScriptLoaded ? `+${elapsed(apiScriptLoadedAt)}` : ''}</div>
          <div>playerBound: <span style={{ color: playerBound ? '#ff6b6b' : '#aaa' }}>{String(playerBound)}</span> {playerBound ? `+${elapsed(playerBoundAt)}` : ''}</div>
          <div>lastState: <span style={{ color: '#ff0' }}>{stateLabels[lastState] ?? lastState}</span></div>
          <div>confirmedPlaying: <span style={{ color: confirmedPlaying ? '#ff6b6b' : '#aaa' }}>{String(confirmedPlaying)}</span></div>
          <div>showPoster: <span style={{ color: showPoster ? '#ff6b6b' : '#aaa' }}>{String(showPoster)}</span></div>
          <div>lastError: <span style={{ color: lastError !== 'none' ? '#ff4444' : '#aaa' }}>{lastError}</span></div>
          <div style={{ marginTop: '6px', borderTop: '1px solid #00ff00', paddingTop: '4px', color: '#888', fontSize: '10px' }}>
            state: -1=unstarted, 0=ended, 1=playing, 2=paused, 3=buffering, 5=cued<br />
            elapsed = ms since mount
          </div>
        </div>
      )}
    </div>
  );
}
