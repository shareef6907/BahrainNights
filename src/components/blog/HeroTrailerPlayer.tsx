'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, Info, ChevronLeft, ChevronRight } from 'lucide-react';

interface Movie {
  id: string;
  title: string;
  overview?: string;
  genre?: string;
  trailer_url?: string;
  youtube_trailer_id?: string;
  poster_url?: string;
  backdrop_url?: string;
  release_date?: string;
}

export function HeroTrailerPlayer() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null);
  const playerRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await fetch('/api/cinema/trailers?limit=5');
      const data = await res.json();
      if (data.movies?.length > 0) {
        setMovies(data.movies);
      }
    } catch (error) {
      console.error('Failed to fetch trailers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-advance trailers
  useEffect(() => {
    if (movies.length > 1) {
      autoAdvanceRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % movies.length);
      }, 20000); // 20 seconds per trailer
    }
    return () => {
      if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current);
    };
  }, [movies.length]);

  const currentMovie = movies[currentIndex];

  const getYouTubeUrl = useCallback((movie: Movie) => {
    let videoId = movie.youtube_trailer_id;
    if (!videoId && movie.trailer_url) {
      const match = movie.trailer_url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&\s?]+)/);
      videoId = match?.[1];
    }
    if (!videoId) return null;
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&loop=1&playlist=${videoId}&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1`;
  }, [isMuted]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    if (autoAdvanceRef.current) {
      clearInterval(autoAdvanceRef.current);
      autoAdvanceRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % movies.length);
      }, 20000);
    }
  };

  const goNext = () => goToSlide((currentIndex + 1) % movies.length);
  const goPrev = () => goToSlide((currentIndex - 1 + movies.length) % movies.length);

  if (isLoading) {
    return (
      <div className="relative w-full h-[70vh] md:h-[85vh] bg-gray-900 animate-pulse flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="relative w-full h-[70vh] md:h-[85vh] bg-gradient-to-b from-gray-800 to-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">BahrainNights Blog</h1>
          <p className="text-xl text-gray-400">Discover events, culture & nightlife</p>
        </div>
      </div>
    );
  }

  const youtubeUrl = getYouTubeUrl(currentMovie);

  return (
    <div className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0">
        {youtubeUrl ? (
          <iframe
            ref={playerRef}
            key={`${currentMovie.id}-${isMuted}`}
            src={youtubeUrl}
            className="absolute w-[300%] h-[300%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            style={{ border: 'none' }}
          />
        ) : (
          <img
            src={currentMovie.backdrop_url || currentMovie.poster_url}
            alt={currentMovie.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-black/30" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-yellow-500 text-black px-3 py-1 rounded text-sm font-bold">
                NOW SHOWING
              </span>
              {currentMovie.genre && (
                <span className="text-gray-400 text-sm">{currentMovie.genre}</span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight drop-shadow-2xl">
              {currentMovie.title}
            </h1>

            {/* Overview */}
            {currentMovie.overview && (
              <p className="text-lg md:text-xl text-gray-200 mb-6 line-clamp-3 drop-shadow-lg max-w-xl">
                {currentMovie.overview}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors"
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                {isMuted ? 'Unmute' : 'Mute'}
              </button>

              <a
                href="/cinema"
                className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-bold hover:bg-white/30 transition-colors"
              >
                <Info size={20} />
                More Info
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {movies.length > 1 && (
        <>
          <button
            onClick={goPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all opacity-0 hover:opacity-100 focus:opacity-100 group-hover:opacity-100"
            aria-label="Previous trailer"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all opacity-0 hover:opacity-100 focus:opacity-100 group-hover:opacity-100"
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
                  ? 'w-8 h-2 bg-yellow-500'
                  : 'w-2 h-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      )}

      {/* Volume Toggle (Bottom Right) */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute bottom-8 right-8 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full border border-white/30 transition-colors"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>
    </div>
  );
}
