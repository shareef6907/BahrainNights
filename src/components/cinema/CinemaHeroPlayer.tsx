'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, ChevronLeft, ChevronRight, Ticket, Info } from 'lucide-react';
import Image from 'next/image';
import { Movie } from './MovieCard';

interface CinemaHeroPlayerProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

export default function CinemaHeroPlayer({ movies, onMovieClick }: CinemaHeroPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Start MUTED on mobile for autoplay to work (browser restriction)
  // Desktop starts unmuted for better experience
  const [isMuted, setIsMuted] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null);

  // IMPORTANT: Persist mute preference across slide changes using ref
  const userMutePreference = useRef<boolean>(true);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
      setIsMobile(mobile);
      // On desktop, start unmuted for better experience
      // On mobile, keep muted for autoplay to work
      if (!mobile) {
        setIsMuted(false);
        userMutePreference.current = false;
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-advance trailers every 25 seconds
  useEffect(() => {
    if (movies.length > 1) {
      autoAdvanceRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % movies.length);
        // DO NOT change mute state when auto-advancing - this fixes the sliding mute bug
      }, 25000);
    }
    return () => {
      if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current);
    };
  }, [movies.length]);

  const currentMovie = movies[currentIndex];

  // Extract YouTube video ID from URL
  const getYouTubeId = useCallback((movie: Movie): string | null => {
    if (!movie.trailerUrl) return null;
    const match = movie.trailerUrl.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&\s?]+)/);
    return match?.[1] || null;
  }, []);

  // Get YouTube embed URL - ALWAYS uses userMutePreference ref to persist across slides
  const getYouTubeUrl = useCallback((movie: Movie): string | null => {
    const videoId = getYouTubeId(movie);
    if (!videoId) return null;

    // Use userMutePreference.current to persist mute state across slide changes
    const muteParam = userMutePreference.current ? 1 : 0;
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${muteParam}&controls=0&loop=1&playlist=${videoId}&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&enablejsapi=1&playsinline=1`;
  }, [getYouTubeId]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    // Reset auto-advance timer but DO NOT touch mute state
    if (autoAdvanceRef.current) {
      clearInterval(autoAdvanceRef.current);
      autoAdvanceRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % movies.length);
      }, 25000);
    }
    // NOTE: We do NOT reset isMuted here - this fixes the mobile mute bug!
  };

  const goNext = () => goToSlide((currentIndex + 1) % movies.length);
  const goPrev = () => goToSlide((currentIndex - 1 + movies.length) % movies.length);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    // Save user preference to persist across slide changes
    userMutePreference.current = newMuteState;
  };

  if (movies.length === 0) {
    return (
      <div className="relative w-full h-[60vh] bg-gradient-to-b from-gray-800 to-gray-950 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">🎬 Cinema</h1>
          <p className="text-xl text-gray-400">Discover movies playing in Bahrain</p>
        </div>
      </div>
    );
  }

  const youtubeUrl = currentMovie ? getYouTubeUrl(currentMovie) : null;
  const hasTrailer = youtubeUrl !== null;

  return (
    <div className="relative w-full h-[85vh] md:h-[90vh] overflow-hidden bg-black">
      {/* Video/Image Background */}
      <div className="absolute inset-0">
        {hasTrailer ? (
          <iframe
            key={`cinema-trailer-${currentIndex}-${isMuted}`}
            src={youtubeUrl}
            className="absolute w-[300%] h-[300%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            style={{ border: 'none' }}
          />
        ) : (
          <Image
            src={currentMovie?.backdrop || currentMovie?.poster || ''}
            alt={currentMovie?.title || ''}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        )}
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-black/40" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-2xl">
            {/* Genre Badge */}
            {currentMovie?.genres && currentMovie.genres.length > 0 && (
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-bold">
                  🎬 NOW SHOWING
                </span>
                <span className="text-gray-300 text-sm">{currentMovie.genres.join(' • ')}</span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight drop-shadow-2xl">
              {currentMovie?.title}
            </h1>

            {/* Movie Info */}
            <div className="flex items-center gap-4 text-gray-300 mb-4">
              {currentMovie?.rating && currentMovie.rating > 0 && (
                <span className="flex items-center gap-1 bg-black/50 px-3 py-1 rounded-lg">
                  ⭐ {currentMovie.rating.toFixed(1)}
                </span>
              )}
              {currentMovie?.duration && (
                <span className="bg-black/50 px-3 py-1 rounded-lg">{currentMovie.duration}</span>
              )}
              {currentMovie?.language && (
                <span className="bg-black/50 px-3 py-1 rounded-lg">{currentMovie.language}</span>
              )}
            </div>

            {/* Synopsis */}
            {currentMovie?.synopsis && (
              <p className="text-lg text-gray-200 mb-8 line-clamp-3 drop-shadow-lg max-w-xl">
                {currentMovie.synopsis}
              </p>
            )}

            {/* Action Buttons - Enhanced for mobile touch */}
            <div className="flex flex-wrap items-center gap-3 md:gap-4 relative z-20">
              {hasTrailer && (
                <button
                  onClick={toggleMute}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    toggleMute(e as unknown as React.MouseEvent);
                  }}
                  className={`flex items-center gap-2 px-5 md:px-8 py-3 md:py-3 rounded-lg font-bold text-base md:text-lg transition-all active:scale-95 touch-manipulation ${
                    isMuted
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'bg-white text-black hover:bg-gray-200'
                  }`}
                >
                  {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
                  <span className="hidden sm:inline">{isMuted ? 'Tap to Unmute' : 'Mute'}</span>
                  <span className="sm:hidden">{isMuted ? 'Unmute' : 'Mute'}</span>
                </button>
              )}

              <button
                onClick={() => onMovieClick(currentMovie)}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  onMovieClick(currentMovie);
                }}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white px-5 md:px-8 py-3 md:py-3 rounded-lg font-bold text-base md:text-lg transition-all active:scale-95 touch-manipulation"
              >
                <Ticket size={22} />
                <span className="hidden sm:inline">Book Tickets</span>
                <span className="sm:hidden">Book</span>
              </button>

              <button
                onClick={() => onMovieClick(currentMovie)}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  onMovieClick(currentMovie);
                }}
                className="flex items-center gap-2 bg-gray-600/80 hover:bg-gray-500/80 active:bg-gray-700/80 text-white px-5 md:px-6 py-3 md:py-3 rounded-lg font-bold text-base md:text-lg transition-all active:scale-95 touch-manipulation"
              >
                <Info size={22} />
                <span className="hidden sm:inline">More Info</span>
                <span className="sm:hidden">Info</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {movies.length > 1 && (
        <>
          <button
            onClick={goPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-all hidden md:block"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-all hidden md:block"
          >
            <ChevronRight size={32} />
          </button>
        </>
      )}

      {/* Trailer Indicators - Bottom Center */}
      {movies.length > 1 && (
        <div className="absolute bottom-32 md:bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {movies.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-10 h-2 bg-red-500'
                  : 'w-2 h-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      )}

      {/* REMOVED: Bottom-right sound icon as requested - only mute button in action buttons area */}
    </div>
  );
}
