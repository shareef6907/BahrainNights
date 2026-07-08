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
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileHint, setShowMobileHint] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const initialMutedRef = useRef<boolean>(true);

  // Detect mobile/touch device
  useEffect(() => {
    const checkDevice = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isIPad = /iPad/.test(navigator.userAgent) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      const mobile = isTouchDevice || isMobileUA || isIPad;
      setIsMobile(mobile);
      initialMutedRef.current = mobile;
      setIsMuted(mobile);
      setShowMobileHint(mobile);
    };
    checkDevice();
  }, []);

  useEffect(() => {
    fetchFeaturedTrailers();
  }, []);

  const fetchFeaturedTrailers = async () => {
    try {
      const featuredRes = await fetch('/api/admin/blog/trailers');
      const featuredData = await featuredRes.json();

      if (featuredData.trailers?.length > 0) {
        const activeTrailers = featuredData.trailers
          .filter((t: { is_active: boolean; movie?: Movie }) => t.is_active && t.movie)
          .map((t: { movie: Movie }) => t.movie);

        if (activeTrailers.length > 0) {
          setMovies(activeTrailers);
          setIsLoading(false);
          return;
        }
      }

      const res = await fetch('/api/cinema/trailers?limit=5');
      const data = await res.json();
      if (data.movies?.length > 0) {
        setMovies(data.movies);
      }
    } catch (error) {
      console.error('Failed to fetch trailers:', error);
      try {
        const res = await fetch('/api/cinema/trailers?limit=5');
        const data = await res.json();
        if (data.movies?.length > 0) {
          setMovies(data.movies);
        }
      } catch {
        // Silent fail
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-advance trailers
  useEffect(() => {
    if (movies.length > 1) {
      autoAdvanceRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % movies.length);
      }, 25000);
    }
    return () => {
      if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current);
    };
  }, [movies.length]);

  // Reset on slide change
  useEffect(() => {
    if (isMobile && !isMuted) {
      setIsMuted(true);
    }
    setVideoError(false);
  }, [currentIndex, isMobile, isMuted]);

  // Listen for YouTube errors
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://www.youtube.com') return;
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (data.event === 'onError' ||
            (data.info && typeof data.info === 'number' && [2, 5, 100, 101, 150].includes(data.info))) {
          setVideoError(true);
        }
      } catch {
        // Not JSON
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const currentMovie = movies[currentIndex];

  const getVideoId = useCallback((movie: Movie): string | null => {
    if (movie.trailer_key) return movie.trailer_key;
    if (movie.trailer_url) {
      const match = movie.trailer_url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&\s?]+)/);
      return match?.[1] || null;
    }
    return null;
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    if (autoAdvanceRef.current) {
      clearInterval(autoAdvanceRef.current);
      autoAdvanceRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % movies.length);
      }, 25000);
    }
  };

  const goNext = () => goToSlide((currentIndex + 1) % movies.length);
  const goPrev = () => goToSlide((currentIndex - 1 + movies.length) % movies.length);

  // YouTube postMessage for mute toggle
  const sendYouTubeCommand = (command: string) => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: command }),
        '*'
      );
    }
  };

  const toggleMute = () => {
    setShowMobileHint(false);
    const newMutedState = !isMuted;
    sendYouTubeCommand(newMutedState ? 'mute' : 'unMute');
    setIsMuted(newMutedState);
  };

  if (isLoading) {
    return (
      <div className="relative w-full h-[70vh] md:h-[85vh] bg-gray-900 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="relative w-full h-[70vh] md:h-[85vh] bg-gradient-to-b from-gray-800 to-gray-950 flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-10" />
        <div className="relative text-center px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4">
            <span
              className="bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-600 bg-clip-text text-transparent"
              style={{ filter: 'drop-shadow(0 0 12px rgba(217, 119, 6, 0.4))' }}
            >
              BahrainNights
            </span>{' '}
            Blog
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
            Discover the best events, culture & nightlife across the Middle East
          </p>
        </div>
      </div>
    );
  }

  const videoId = currentMovie ? getVideoId(currentMovie) : null;

  // Build iframe URL - match cinema but with sound
  const iframeUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=0&showinfo=0&rel=0&loop=1&playsinline=1&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`
    : null;

  const genreDisplay = currentMovie && Array.isArray(currentMovie.genre)
    ? currentMovie.genre.slice(0, 3).join(' • ')
    : currentMovie?.genre;

  return (
    <div 
      className="relative overflow-hidden bg-black"
      style={{ 
        width: '100vw', 
        height: isMobile ? '70vh' : '85vh', 
        marginLeft: 'calc(-50vw + 50%)' 
      }}
    >
      {/* Video Container - matching cinema approach */}
      <div className="absolute inset-0 w-full h-full">
        {/* Backdrop image */}
        {(currentMovie?.backdrop_url || currentMovie?.poster_url) && (
          <Image
            src={currentMovie?.backdrop_url || currentMovie?.poster_url || ''}
            alt={currentMovie?.title || 'Movie backdrop'}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        )}
        
        {/* YouTube iframe - full viewport coverage */}
        {iframeUrl && !videoError && (
          <iframe
            ref={iframeRef}
            key={`trailer-${currentIndex}`}
            src={iframeUrl}
            className="absolute top-0 left-0 w-full h-full"
            style={{ transform: 'scale(1.15)', transformOrigin: 'center center' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; webkit-fullscreen; mozfullscreen"
            allowFullScreen
            frameBorder="0"
          />
        )}
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-black/40" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-yellow-500 text-black px-3 py-1 rounded text-sm font-bold">
                NOW SHOWING
              </span>
              {genreDisplay && (
                <span className="text-gray-300 text-sm">{genreDisplay}</span>
              )}
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight drop-shadow-2xl">
              {currentMovie?.title}
            </h1>

            {currentMovie?.synopsis && (
              <p className="text-lg text-gray-200 mb-8 line-clamp-3 drop-shadow-lg max-w-xl">
                {currentMovie.synopsis}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4">
              {iframeUrl && !videoError ? (
                <button
                  onClick={toggleMute}
                  className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-lg transition-colors ${
                    isMuted
                      ? 'bg-yellow-500 hover:bg-yellow-400 text-black'
                      : 'bg-white hover:bg-gray-200 text-black'
                  }`}
                >
                  {isMuted ? <Volume2 size={24} /> : <VolumeX size={24} />}
                  {isMuted ? 'Enable Sound' : 'Mute'}
                </button>
              ) : videoId ? (
                <a
                  href={`https://www.youtube.com/watch?v=${videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-lg bg-red-600 hover:bg-red-500 text-white transition-colors"
                >
                  <Play size={24} fill="white" />
                  Watch Trailer
                </a>
              ) : null}

              <Link
                href="/cinema"
                className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-white/30 transition-colors"
              >
                <Info size={24} />
                View All Movies
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {movies.length > 1 && (
        <>
          <button
            onClick={goPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-all"
            aria-label="Previous trailer"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-all"
            aria-label="Next trailer"
          >
            <ChevronRight size={32} />
          </button>
        </>
      )}

      {/* Trailer Indicators */}
      {movies.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {movies.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to trailer ${index + 1}`}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-10 h-2 bg-yellow-500'
                  : 'w-2 h-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      )}

      {/* Mobile Sound Hint */}
      {showMobileHint && isMuted && videoId && !videoError && (
        <button
          onClick={toggleMute}
          className="absolute bottom-32 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-full font-bold shadow-lg animate-pulse transition-colors"
        >
          <Volume2 size={20} />
          <span>Tap for Sound</span>
        </button>
      )}
    </div>
  );
}
