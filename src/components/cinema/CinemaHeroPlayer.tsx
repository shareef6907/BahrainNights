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
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null);

  // IMPORTANT: Store mute preference that persists across slide changes
  const userMutePreference = useRef<boolean | null>(null);

  useEffect(() => {
    // Check if user previously unmuted (for returning visitors)
    const savedMuteState = localStorage.getItem('cinema-mute-preference');
    if (savedMuteState === 'unmuted') {
      userMutePreference.current = false;
    }
  }, []);

  // Auto-advance trailers every 25 seconds
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

  // Handle user interaction (click/tap) to unmute - MOBILE FIX
  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);

        // If user hasn't explicitly muted, unmute on interaction
        if (userMutePreference.current === null || userMutePreference.current === false) {
          setIsMuted(false);
          userMutePreference.current = false;
          localStorage.setItem('cinema-mute-preference', 'unmuted');
        }
      }
    };

    // Listen for both click and touch
    document.addEventListener('click', handleInteraction, { once: true });
    document.addEventListener('touchstart', handleInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, [hasInteracted]);

  const currentMovie = movies[currentIndex];

  // Extract YouTube video ID from URL
  const getYouTubeId = useCallback((movie: Movie): string | null => {
    if (!movie.trailerUrl) return null;
    const match = movie.trailerUrl.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&\s?]+)/);
    return match?.[1] || null;
  }, []);

  // Get YouTube embed URL - PRESERVES MUTE STATE
  const getYouTubeUrl = useCallback((movie: Movie): string | null => {
    const videoId = getYouTubeId(movie);
    if (!videoId) return null;

    // Use the current mute state (this preserves across slide changes)
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&loop=1&playlist=${videoId}&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&enablejsapi=1&playsinline=1`;
  }, [isMuted, getYouTubeId]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    // Reset auto-advance timer
    if (autoAdvanceRef.current) {
      clearInterval(autoAdvanceRef.current);
      autoAdvanceRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % movies.length);
      }, 25000);
    }
    // NOTE: We do NOT reset isMuted here - this fixes the mobile bug!
  };

  const goNext = () => goToSlide((currentIndex + 1) % movies.length);
  const goPrev = () => goToSlide((currentIndex - 1 + movies.length) % movies.length);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    setHasInteracted(true);

    // Save user preference
    userMutePreference.current = newMuteState;
    localStorage.setItem('cinema-mute-preference', newMuteState ? 'muted' : 'unmuted');
  };

  if (movies.length === 0) {
    return (
      <div className="relative w-full h-[60vh] bg-gradient-to-b from-gray-800 to-gray-950 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">🎬 Cinema</h1>
          <p className="text-xl text-gray-400">Discover the latest movies</p>
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
                  🎬 FEATURED
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

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              {hasTrailer && (
                <button
                  onClick={toggleMute}
                  className="flex items-center gap-2 bg-white text-black px-6 md:px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-200 transition-colors"
                >
                  {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                  {isMuted ? 'Unmute' : 'Mute'}
                </button>
              )}

              <button
                onClick={() => onMovieClick(currentMovie)}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-6 md:px-8 py-3 rounded-lg font-bold text-lg transition-colors"
              >
                <Ticket size={24} />
                Book Tickets
              </button>

              <button
                onClick={() => onMovieClick(currentMovie)}
                className="flex items-center gap-2 bg-gray-600/80 hover:bg-gray-500/80 text-white px-6 py-3 rounded-lg font-bold text-lg transition-colors"
              >
                <Info size={24} />
                More Info
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

      {/* Trailer Indicators */}
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

      {/* Volume Toggle - Bottom Right */}
      {hasTrailer && (
        <button
          onClick={toggleMute}
          className="absolute bottom-32 md:bottom-24 right-8 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full border border-white/30 transition-all"
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      )}

      {/* Sound Hint - Only on mobile when muted */}
      {isMuted && !hasInteracted && hasTrailer && (
        <div className="absolute bottom-32 md:bottom-24 right-24 bg-black/70 text-white px-4 py-2 rounded-lg text-sm animate-pulse md:hidden">
          🔊 Tap for sound
        </div>
      )}
    </div>
  );
}
