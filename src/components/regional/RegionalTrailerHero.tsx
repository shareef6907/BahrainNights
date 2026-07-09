'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, ChevronLeft, ChevronRight, Info } from 'lucide-react';

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
  const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null);
  const playerRef = useRef<any>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.YT?.Player) { setYtApiReady(true); return; }
    (window as any).onYouTubeIframeAPIReady = () => setYtApiReady(true);
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.getElementsByTagName('script')[0]?.parentNode?.insertBefore(tag, document.getElementsByTagName('script')[0]);
  }, []);

  const createPlayer = useCallback((videoId: string) => {
    if (!window.YT || !playerContainerRef.current || !ytApiReady) return;
    if (playerRef.current) { try { playerRef.current.destroy(); } catch {} }
    playerContainerRef.current.innerHTML = '';
    try {
      const player = new window.YT.Player(playerContainerRef.current.id, {
        videoId,
        playerVars: { autoplay: 1, mute: 1, controls: 0, showinfo: 0, rel: 0, loop: 1, playsinline: 1, modestbranding: 1, iv_load_policy: 3, disablekb: 1, fs: 0 },
        events: {
          onReady: (e: any) => {
            // Explicit mute BEFORE playVideo - required for iOS Safari
            e.target.mute();
            e.target.playVideo();
            setTimeout(() => { try { e.target.unMute(); e.target.setVolume(50); setIsMuted(false); } catch {} }, 1000);
          },
          onStateChange: (e: any) => { 
            if (e.data === 0) { e.target.seekTo(0); e.target.playVideo(); }
            // If UNSTARTED (-1) or CUED (5) after 2s, retry play - covers Low Power Mode
            if (e.data === -1 || e.data === 5) {
              setTimeout(() => {
                try { e.target.mute(); e.target.playVideo(); } catch {}
              }, 2000);
            }
          },
        },
      } as any);
      playerRef.current = player;
    } catch {}
  }, [ytApiReady]);

  useEffect(() => {
    if (!movies.length || !ytApiReady) return;
    const id = getYouTubeId(movies[0]?.trailer_key);
    if (id && !playerRef.current) setTimeout(() => createPlayer(id), 500);
  }, [movies.length, ytApiReady, createPlayer]);

  useEffect(() => {
    if (!movies.length || !ytApiReady || !playerRef.current) return;
    const id = getYouTubeId(movies[currentIndex]?.trailer_key);
    if (id && playerRef.current.loadVideoById) {
      playerRef.current.loadVideoById(id);
      playerRef.current.mute();
      playerRef.current.playVideo();
      playerRef.current.seekTo(0);
      setTimeout(() => { try { playerRef.current.unMute(); playerRef.current.setVolume(50); setIsMuted(false); } catch {} }, 1000);
    }
  }, [currentIndex, movies, ytApiReady]);

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

  if (!movies.length) {
    return <div className="h-[70vh] md:h-[85vh] bg-gray-900 flex items-center justify-center"><div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin" /></div>;
  }

  // Tap-to-play fallback for iOS Low Power Mode
  useEffect(() => {
    if (!isMobile) return;
    
    const handleTapToPlay = () => {
      if (playerRef.current && playerRef.current.playVideo) {
        try {
          playerRef.current.mute();
          playerRef.current.playVideo();
        } catch {}
      }
    };
    
    document.addEventListener('touchstart', handleTapToPlay, { once: true });
    document.addEventListener('click', handleTapToPlay, { once: true });
    
    return () => {
      document.removeEventListener('touchstart', handleTapToPlay);
      document.removeEventListener('click', handleTapToPlay);
    };
  }, [isMobile]);

  return (
    <div className="relative overflow-hidden bg-black" style={{ width: '100vw', height: isMobile ? '70vh' : '85vh', marginLeft: 'calc(-50vw + 50%)' }}>
      <div id="regional-youtube-player" ref={playerContainerRef} className="absolute inset-0 w-full h-full" style={{ transform: 'scale(1.15)', transformOrigin: 'center center' }} />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-black/40" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent" />
      
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
