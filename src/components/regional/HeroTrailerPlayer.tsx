'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Volume2, VolumeX, Info, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import Link from 'next/link';

interface Movie {
  id: string;
  title: string;
  synopsis?: string | null;
  genre?: string[] | null;
  trailer_url?: string | null;
  trailer_key?: string | null;
  poster_url?: string | null;
  backdrop_url?: string | null;
}

export function HeroTrailerPlayer() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const isMobileRef = useRef(false); // Track current mobile state
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [ytApiReady, setYtApiReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null);
  const playerRef = useRef<any>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || 'ontouchstart' in window;
      setIsMobile(mobile);
      isMobileRef.current = mobile;
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load YouTube API (desktop only - mobile uses poster)
  useEffect(() => {
    // Skip on mobile - we use poster image instead of YouTube iframe
    if (isMobileRef.current) return;
    
    if (typeof window !== 'undefined') {
      if (window.YT && window.YT.Player) {
        setYtApiReady(true);
        return;
      }
      (window as any).onYouTubeIframeAPIReady = () => setYtApiReady(true);
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }
  }, [isMobile]);

  // Create player
  const createPlayer = useCallback((videoId: string) => {
    if (!window.YT || !playerContainerRef.current || !ytApiReady) return;
    
    if (playerRef.current) {
      try { playerRef.current.destroy(); } catch {}
      playerRef.current = null;
    }
    playerContainerRef.current.innerHTML = '';

    try {
      const player = new window.YT.Player(playerContainerRef.current!.id, {
        videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          showinfo: 0,
          rel: 0,
          loop: 1,
          playlist: videoId,
          playsinline: 1,
          modestbranding: 1,
          iv_load_policy: 3,
          disablekb: 1,
          fs: 0,
          origin: typeof window !== 'undefined' ? window.location.origin : '',
        },
        events: {
          onReady: (event: { target: any }) => {
            event.target.playVideo();
            setTimeout(() => {
              try {
                event.target.unMute();
                event.target.setVolume(50);
                setIsMuted(false);
              } catch {}
            }, 1000);
          },
          onError: () => setVideoError(true),
          onStateChange: (event: { target: any; data: number }) => {
            if (event.data === 0) {
              event.target.seekTo(0);
              event.target.playVideo();
            }
          },
        },
      } as any);
      playerRef.current = player;
    } catch {}
  }, [ytApiReady]);

  // Init on mount
  useEffect(() => {
    if (!movies.length || !ytApiReady) return;
    const id = movies[0].trailer_key || (movies[0].trailer_url?.match(/(?:v=|youtu\.be\/)([^&]+)/)?.[1]);
    if (id && !playerRef.current) {
      setTimeout(() => createPlayer(id), 500);
    }
  }, [movies.length, ytApiReady, createPlayer]);

  // Switch video
  useEffect(() => {
    if (!movies.length || !ytApiReady || !playerRef.current) return;
    const id = movies[currentIndex].trailer_key || (movies[currentIndex].trailer_url?.match(/(?:v=|youtu\.be\/)([^&]+)/)?.[1]);
    if (id && playerRef.current.loadVideoById) {
      playerRef.current.loadVideoById(id);
      playerRef.current.mute();
      playerRef.current.playVideo();
      playerRef.current.seekTo(0);
      setTimeout(() => {
        try { playerRef.current.unMute(); playerRef.current.setVolume(50); setIsMuted(false); } catch {}
      }, 1000);
      setVideoError(false);
    }
  }, [currentIndex, movies, ytApiReady]);

  // Auto-advance
  useEffect(() => {
    if (movies.length > 1) {
      autoAdvanceRef.current = setInterval(() => setCurrentIndex(p => (p + 1) % movies.length), 25000);
    }
    return () => { if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current); };
  }, [movies.length]);

  // Fetch movies
  useEffect(() => {
    fetch('/api/cinema/trailers?limit=5')
      .then(r => r.json())
      .then(d => { if (d.movies?.length) setMovies(d.movies); })
      .finally(() => setIsLoading(false));
  }, []);

  const currentMovie = movies[currentIndex];
  const genreDisplay = currentMovie?.genre?.slice(0, 3).join(' • ');

  const goNext = () => setCurrentIndex(p => (p + 1) % movies.length);
  const goPrev = () => setCurrentIndex(p => (p - 1 + movies.length) % movies.length);

  const toggleMute = () => {
    if (playerRef.current) {
      try {
        if (isMuted) { playerRef.current.unMute(); playerRef.current.setVolume(50); }
        else { playerRef.current.mute(); }
      } catch {}
    }
    setIsMuted(!isMuted);
  };

  if (isLoading) return <div className="h-[70vh] md:h-[85vh] bg-gray-900 flex items-center justify-center"><div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin" /></div>;
  if (!movies.length) return <div className="h-[70vh] md:h-[85vh] bg-gray-950 flex items-center justify-center"><h1 className="text-4xl md:text-6xl font-black text-white">BahrainNights Blog</h1></div>;

  // PLAN B: On mobile, show branded poster with play button
  const showPosterInsteadOfPlayer = isMobile;
  const backdropUrl = currentMovie?.backdrop_url || currentMovie?.poster_url;

  // Handle mobile play button tap
  const handleMobilePlay = () => {
    const videoId = currentMovie?.trailer_key;
    if (videoId) {
      window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
    }
  };

  return (
    <div className="relative overflow-hidden bg-black" style={{ width: '100vw', height: isMobile ? '70vh' : '85vh', marginLeft: 'calc(-50vw + 50%)' }}>
      {/* DESKTOP: YouTube Player */}
      {!showPosterInsteadOfPlayer && (
        <>
          <div id="regional-youtube-player" ref={playerContainerRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ transform: 'scale(1.15)', transformOrigin: 'center center' }} />
          {(currentMovie?.backdrop_url || currentMovie?.poster_url) && <Image src={currentMovie.backdrop_url || currentMovie.poster_url || ''} alt="" fill className="object-cover" priority />}
        </>
      )}

      {/* MOBILE: Branded poster with play button - next/image for LCP */}
      {showPosterInsteadOfPlayer && backdropUrl && (
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={backdropUrl}
            alt={currentMovie?.title || 'Movie backdrop'}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50 pointer-events-none" />
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
        </div>
      )}

      {showPosterInsteadOfPlayer && !backdropUrl && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
          <Play className="w-16 h-16 text-gray-600" />
        </div>
      )}

      {/* Gradient overlays - pointer-events: none to prevent blocking */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-black/40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-yellow-500 text-black px-3 py-1 rounded text-sm font-bold">NOW SHOWING</span>
              {genreDisplay && <span className="text-gray-300 text-sm">{genreDisplay}</span>}
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4">{currentMovie?.title}</h1>
            {currentMovie?.synopsis && <p className="text-lg text-gray-200 mb-8 line-clamp-3">{currentMovie.synopsis}</p>}
            <div className="flex gap-4">
              <button onClick={toggleMute} className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold ${isMuted ? 'bg-yellow-500 text-black' : 'bg-white text-black'}`}>
                {isMuted ? <Volume2 size={24} /> : <VolumeX size={24} />} {isMuted ? 'Enable Sound' : 'Mute'}
              </button>
              <Link href="/cinema" className="flex items-center gap-2 bg-white/20 text-white px-8 py-3 rounded-lg font-bold"><Info size={24} />View All Movies</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
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
