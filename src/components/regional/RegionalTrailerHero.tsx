'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Volume2, VolumeX, ChevronLeft, ChevronRight, Info, Play } from 'lucide-react';

interface Movie {
  id: string;
  title: string;
  synopsis?: string;
  genre?: string[];
  trailer_key?: string;
  poster_url?: string;
  backdrop_url?: string;
}

interface Props {
  movies?: Movie[];
  onMovieClick?: (movie: Movie) => void;
  onBookClick?: (movie: Movie) => void;
}

function getYouTubeId(url: string | undefined): string | null {
  if (!url) return null;
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s?]+)/);
  return match?.[1] || null;
}

export default function RegionalTrailerHero({ movies: propMovies, onMovieClick, onBookClick }: Props) {
  const [movies, setMovies] = useState<Movie[]>(propMovies || []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [ytApiReady, setYtApiReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isMobileRef = useRef(false); // Track current mobile state
  const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null);
  const playerRef = useRef<any>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);
  const [showPoster, setShowPoster] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const isTouchDeviceRef = useRef(false);
  const lastIndexRef = useRef<number>(0);

  // Fetch movies
  useEffect(() => {
    if (movies.length > 0) return;
    fetch('/api/cinema/trailers?limit=5')
      .then(r => r.json())
      .then(d => {
        if (d.movies) {
          setMovies(d.movies.map((m: any) => ({
            id: m.id,
            title: m.title,
            synopsis: m.synopsis,
            genre: m.genre,
            trailer_key: m.trailer_key,
            poster_url: m.poster_url,
            backdrop_url: m.backdrop_url,
          })));
        }
      });
  }, [movies.length]);

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

    if (window.YT?.Player) {
      setYtApiReady(true);
      // Fall through — NOT an early return. Cleanup below must register.
    } else {
      (window as any).onYouTubeIframeAPIReady = () => setYtApiReady(true);
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.getElementsByTagName('script')[0]?.parentNode?.insertBefore(tag, document.getElementsByTagName('script')[0]);
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

  const initializePlayer = useCallback((videoId: string) => {
    if (!window.YT || !playerContainerRef.current || !ytApiReady) return;
    if (playerRef.current) { try { playerRef.current.destroy(); } catch {} }
    playerContainerRef.current.innerHTML = '';
    try {
      const player = new window.YT.Player(playerContainerRef.current.id, {
        videoId,
        playerVars: { autoplay: 1, mute: 1, controls: 0, showinfo: 0, rel: 0, loop: 1, playsinline: 1, modestbranding: 1, iv_load_policy: 3, disablekb: 1, fs: 0 },
        events: {
          onReady: (e: any) => {
            e.target.playVideo();
            // Fade poster on non-touch devices once player is ready — desktop iframe loads reliably.
            // On touch devices (phone, iPad): poster fades only on PLAYING to preserve the guarantee.
            if (!isTouchDeviceRef.current) {
              setShowPoster(false);
            }
            setTimeout(() => { try { e.target.unMute(); e.target.setVolume(50); setIsMuted(false); } catch {} }, 1000);
          },
          onStateChange: (e: any) => {
            if (e.data === 0) { e.target.seekTo(0); e.target.playVideo(); }
            // Fade poster on PLAYING (1) — all devices.
            // On touch devices: this is the only path that hides the poster.
            // If video never plays, poster stays (no timer).
            if (e.data === 1) setShowPoster(false);
          },
        },
      } as any);
      playerRef.current = player;
      initializedRef.current = true;
    } catch {}
  }, [ytApiReady]);

  // Initialize player on mount
  useEffect(() => {
    if (!movies.length || !ytApiReady) return;
    const id = getYouTubeId(movies[0]?.trailer_key);
    if (id && !initializedRef.current && !playerRef.current) {
      // Defer only on mobile — poster must paint first (LCP). Desktop creates immediately.
      const delay = isMobileRef.current ? 100 : 0;
      const timer = setTimeout(() => {
        if (!initializedRef.current && !playerRef.current) initializePlayer(id);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [movies.length, ytApiReady, initializePlayer]);

  // When currentIndex changes, load new video
  useEffect(() => {
    if (!movies.length || !ytApiReady) return;
    const id = getYouTubeId(movies[currentIndex]?.trailer_key);
    if (!id) return;
    // Only reset poster if the slide actually changed, not on parent re-render
    if (currentIndex !== lastIndexRef.current) {
      lastIndexRef.current = currentIndex;
      setShowPoster(true);
    }
    if (playerRef.current && playerRef.current.loadVideoById) {
      playerRef.current.loadVideoById(id);
      playerRef.current.mute();
      playerRef.current.playVideo();
      playerRef.current.seekTo(0);
      setTimeout(() => { try { playerRef.current.unMute(); playerRef.current.setVolume(50); setIsMuted(false); } catch {} }, 1000);
    } else if (!initializedRef.current) {
      const delay = isMobileRef.current ? 100 : 0;
      const timer = setTimeout(() => {
        if (!initializedRef.current && !playerRef.current) initializePlayer(id);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, movies, ytApiReady, initializePlayer]);

  useEffect(() => {
    if (movies.length > 1) {
      autoAdvanceRef.current = setInterval(() => setCurrentIndex(p => (p + 1) % movies.length), 25000);
    }
    return () => { if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current); };
  }, [movies.length]);

  const goNext = () => setCurrentIndex(p => (p + 1) % movies.length);
  const goPrev = () => setCurrentIndex(p => (p - 1 + movies.length) % movies.length);
  const toggleMute = () => {
    if (playerRef.current) {
      try { isMuted ? playerRef.current.unMute() : playerRef.current.mute(); } catch {}
    }
    setIsMuted(!isMuted);
  };

  const current = movies[currentIndex];
  const genreDisplay = current?.genre?.slice(0, 3).join(' • ');
  const backdropUrl = current?.backdrop_url || current?.poster_url;

  if (!movies.length) {
    return <div className="h-[70vh] md:h-[85vh] bg-gray-900 flex items-center justify-center"><div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin" /></div>;
  }

  // Handle mobile play button tap — opens YouTube fullscreen
  const handleMobilePlay = () => {
    const videoId = current?.trailer_key;
    if (videoId) {
      window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
    }
  };

  // Tap-to-unmute on mobile: tap the poster/video area to toggle mute.
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
      } catch {}
    }
  };

  return (
    <div
      className="relative overflow-hidden bg-black"
      style={{ width: '100vw', height: isMobile ? '70vh' : '85vh', marginLeft: 'calc(-50vw + 50%)' }}
      onClick={handleHeroTap}
    >
      {/* YouTube iframe — always rendered, z-[1], underneath poster.
          pointer-events-none: content overlay buttons must remain tappable.
          On mobile: created after 100ms (deferred for LCP).
          On desktop: created immediately. */}
      <div
        id="regional-youtube-player"
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
            alt={current?.title || 'Movie backdrop'}
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

      {/* Gradient overlays — pointer-events: none */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-black/40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent pointer-events-none" />

      <div className="absolute inset-0 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-yellow-500 text-black px-3 py-1 rounded text-sm font-bold">NOW SHOWING</span>
              {genreDisplay && <span className="text-gray-300 text-sm">{genreDisplay}</span>}
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4">{current?.title}</h1>
            {current?.synopsis && <p className="text-lg text-gray-200 mb-8 line-clamp-3">{current.synopsis}</p>}
            <div className="flex gap-4">
              <button onClick={toggleMute} className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold ${isMuted ? 'bg-yellow-500 text-black' : 'bg-white text-black'}`}>
                {isMuted ? <Volume2 size={24} /> : <VolumeX size={24} />} {isMuted ? 'Enable Sound' : 'Mute'}
              </button>
              <a href="/cinema" className="flex items-center gap-2 bg-white/20 text-white px-8 py-3 rounded-lg font-bold"><Info size={24} />View All Movies</a>
            </div>
          </div>
        </div>
      </div>

      {movies.length > 1 && (
        <>
          <button onClick={goPrev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full"><ChevronLeft size={32} /></button>
          <button onClick={goNext} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full"><ChevronRight size={32} /></button>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {movies.map((_, i) => (
              <button key={i} onClick={() => setCurrentIndex(i)} className={`rounded-full ${i === currentIndex ? 'w-10 h-2 bg-yellow-500' : 'w-2 h-2 bg-white/50'}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
