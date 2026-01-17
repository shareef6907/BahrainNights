'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

// YouTube Player API commands via postMessage
const sendYouTubeCommand = (iframe: HTMLIFrameElement | null, command: string) => {
  if (iframe?.contentWindow) {
    iframe.contentWindow.postMessage(
      JSON.stringify({ event: 'command', func: command }),
      '*'
    );
  }
};

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
  const [isMuted, setIsMuted] = useState(true); // UI state for mute toggle
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileHint, setShowMobileHint] = useState(false);
  const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  // IMPORTANT: initialMuted is used in iframe URL and NEVER changes
  // This prevents iframe reload when toggling mute via postMessage
  const initialMutedRef = useRef<boolean>(true);

  // Detect mobile device and set initial mute state
  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth < 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
      // Mobile: MUST be muted for autoplay to work (browser requirement)
      // Desktop: Can autoplay unmuted
      initialMutedRef.current = mobile;
      setIsMuted(mobile);
      // Show sound hint only on mobile
      setShowMobileHint(mobile);
    };

    checkDevice();
    // Don't add resize listener to avoid changing mute state after initial load
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
      // Try fallback
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

  // On mobile, reset to muted when changing slides to ensure video plays
  // Mobile browsers require muted autoplay - trying to unmute new iframes is unreliable
  useEffect(() => {
    if (isMobile && !isMuted) {
      setIsMuted(true);
    }
  }, [currentIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  const currentMovie = movies[currentIndex];

  // Get YouTube video ID
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
    // Reset auto-advance timer
    if (autoAdvanceRef.current) {
      clearInterval(autoAdvanceRef.current);
      autoAdvanceRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % movies.length);
      }, 25000);
    }
  };

  const goNext = () => goToSlide((currentIndex + 1) % movies.length);
  const goPrev = () => goToSlide((currentIndex - 1 + movies.length) % movies.length);

  const toggleMute = () => {
    setShowMobileHint(false); // Hide hint after user interaction
    // Use YouTube postMessage API to toggle mute without recreating iframe
    // This prevents video from stopping on mobile when toggling sound
    const newMutedState = !isMuted;
    sendYouTubeCommand(iframeRef.current, newMutedState ? 'mute' : 'unMute');
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

  // IMPORTANT: Only create ONE iframe URL for the CURRENT trailer
  // This prevents multiple audio streams playing simultaneously
  // playsinline=1 is required for iOS autoplay
  // CRITICAL: Use initialMutedRef (not isMuted) so URL doesn't change when toggling sound
  // Mobile MUST start muted for autoplay to work, postMessage handles unmute
  const iframeUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${initialMutedRef.current ? 1 : 0}&controls=0&loop=1&playlist=${videoId}&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&enablejsapi=1&playsinline=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`
    : null;

  const genreDisplay = currentMovie && Array.isArray(currentMovie.genre)
    ? currentMovie.genre.slice(0, 3).join(' • ')
    : currentMovie?.genre;

  return (
    <div className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden bg-black">
      {/* SINGLE Video Background - Only current trailer loads */}
      <div className="absolute inset-0">
        {iframeUrl ? (
          <iframe
            ref={iframeRef}
            key={`trailer-${currentIndex}`} // Only re-render on trailer change, NOT on mute toggle
            src={iframeUrl}
            className="absolute w-[300%] h-[300%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            style={{ border: 'none' }}
          />
        ) : (
          <img
            src={currentMovie?.backdrop_url || currentMovie?.poster_url || ''}
            alt={currentMovie?.title}
            className="w-full h-full object-cover"
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

      {/* Mobile Sound Hint - Prominent tap button */}
      {showMobileHint && isMuted && iframeUrl && (
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
