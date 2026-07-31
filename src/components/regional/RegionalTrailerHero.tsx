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
  const [isMobile, setIsMobile] = useState(false);
  const isMobileRef = useRef(false);
  const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null);
  const playerRef = useRef<any>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [showPoster, setShowPoster] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const isTouchDeviceRef = useRef(false);
  const lastIndexRef = useRef<number>(0);

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

  // 8s fallback timer
  const iframeLoadTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch movies from API if not passed as prop
  useEffect(() => {
    if (movies.length > 0) return;
    fetch('/api/cinema/trailers?limit=5')
      .then(r => r.json())
      .then(d => {
        if (d.movies) {
          setMovies(d.movies.map((m: any) => ({
            id: m.id, title: m.title, synopsis: m.synopsis, genre: m.genre,
            trailer_key: m.trailer_key, poster_url: m.poster_url, backdrop_url: m.backdrop_url,
          })));
        }
      });
  }, [movies.length]);

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

  const current = movies[currentIndex];
  const videoId = getYouTubeId(current?.trailer_key);
  const backdropUrl = current?.backdrop_url || current?.poster_url;
  const genreDisplay = current?.genre?.slice(0, 3).join(' • ') ?? '';

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

  // 8s fallback timer
  useEffect(() => {
    if (!embedSrc) return;
    if (iframeLoaded) return;
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

  // Reset on slide change — key={videoId} in JSX handles iframe remount
  useEffect(() => {
    if (currentIndex !== lastIndexRef.current) {
      lastIndexRef.current = currentIndex;
      setShowPoster(true);
      setIframeLoaded(false);
      setIframeLoadedAt(null);
      setPlayerBound(false);
      setPlayerBoundAt(null);
      setLastState('none');
      setConfirmedPlaying(false);
    }
  }, [currentIndex]);

  // Cleanup player on unmount
  useEffect(() => {
    return () => {
      if (playerRef.current) {
        try { playerRef.current.destroy(); } catch {}
        playerRef.current = null;
      }
    };
  }, [videoId]);

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

  const handleMobilePlay = () => {
    if (videoId) window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  // Tap-to-toggle on mobile
  const handleHeroTap = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    if (isTouchDeviceRef.current && playerRef.current) {
      try {
        if (isMuted) { playerRef.current.unMute(); playerRef.current.setVolume(50); }
        else { playerRef.current.mute(); }
        setIsMuted(!isMuted);
      } catch {}
    }
  };

  // Sound on first interaction
  useEffect(() => {
    const enableSound = () => {
      if (playerRef.current && isMuted) {
        try { playerRef.current.unMute(); playerRef.current.setVolume(50); } catch {}
        setIsMuted(false);
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
      style={{ width: '100vw', height: isMobile ? '70vh' : '85vh', marginLeft: 'calc(-50vw + 50%)' }}
      onClick={handleHeroTap}
    >
      {/* Declarative YouTube iframe — z-[1], below poster.
          key={videoId} causes React to remount on slide change — new video autoplays. */}
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

      {/* Poster — z-[2], fades on iframe onLoad. */}
      {backdropUrl ? (
        <div
          className="absolute inset-0 w-full h-full pointer-events-none z-[2]"
          style={{ opacity: showPoster ? 1 : 0, transition: 'opacity 300ms ease-out' }}
        >
          <Image src={backdropUrl} alt={current?.title || 'Movie backdrop'} fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-black/50 pointer-events-none" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-[2]"
          style={{ opacity: showPoster ? 1 : 0, transition: 'opacity 300ms ease-out' }}>
          <Play className="w-16 h-16 text-gray-600" />
        </div>
      )}

      {/* Small play button — touch devices only, bottom-right, above content.
          Renders while confirmedPlaying === false. Disappears when PLAYING fires. */}
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
            REGIONAL HERO DEBUG
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
