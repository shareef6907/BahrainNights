'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Volume2, VolumeX, Info, ChevronLeft, ChevronRight } from 'lucide-react';

interface Movie {
  id: string;
  title: string;
  synopsis?: string | null;
  genre?: string[] | null;
  trailer_url?: string | null;
  trailer_key?: string | null;
  poster_url?: string | null;
  backdrop_url?: string | null;
  release_date?: string | null;
}

export function HeroTrailerPlayer() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null);

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

  // Get YouTube video ID from movie
  const getVideoId = useCallback((movie: Movie): string | null => {
    if (movie.trailer_key) return movie.trailer_key;
    if (movie.trailer_url) {
      const match = movie.trailer_url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&\s?]+)/);
      return match?.[1] || null;
    }
    return null;
  }, []);

  // Precompute all YouTube URLs for preloading
  const youtubeUrls = useMemo(() => {
    return movies.map(movie => {
      const videoId = getVideoId(movie);
      if (!videoId) return null;
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1`;
    });
  }, [movies, getVideoId]);

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

  // Fallback hero when no trailers available
  if (movies.length === 0) {
    return (
      <div className="relative w-full h-[70vh] md:h-[85vh] bg-gradient-to-b from-gray-800 to-gray-950 flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-10" />
        <div className="relative text-center px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
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

  const genreDisplay = currentMovie && Array.isArray(currentMovie.genre)
    ? currentMovie.genre.slice(0, 3).join(' • ')
    : currentMovie?.genre;

  return (
    <div className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden bg-black group">
      {/* Preloaded Video Backgrounds - All iframes loaded, only current one visible */}
      <div className="absolute inset-0">
        {movies.map((movie, index) => {
          const url = youtubeUrls[index];
          const isActive = index === currentIndex;

          return (
            <div
              key={movie.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {url ? (
                <iframe
                  src={url}
                  className="absolute w-[300%] h-[300%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  style={{ border: 'none' }}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              ) : (
                <img
                  src={movie.backdrop_url || movie.poster_url || ''}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-black/30 z-20" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent z-20" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center z-30">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-yellow-500 text-black px-3 py-1 rounded text-sm font-bold">
                NOW SHOWING
              </span>
              {genreDisplay && (
                <span className="text-gray-400 text-sm">{genreDisplay}</span>
              )}
            </div>

            {/* Title with fade transition */}
            <div className="relative h-[120px] md:h-[180px] overflow-hidden">
              {movies.map((movie, index) => (
                <h1
                  key={movie.id}
                  className={`absolute inset-0 text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight drop-shadow-2xl transition-all duration-500 ${
                    index === currentIndex
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                >
                  {movie.title}
                </h1>
              ))}
            </div>

            {/* Synopsis with fade transition */}
            <div className="relative h-[80px] md:h-[100px] overflow-hidden mb-6">
              {movies.map((movie, index) => (
                <p
                  key={movie.id}
                  className={`absolute inset-0 text-lg md:text-xl text-gray-200 line-clamp-3 drop-shadow-lg max-w-xl transition-all duration-500 ${
                    index === currentIndex
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                >
                  {movie.synopsis || ''}
                </p>
              ))}
            </div>

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
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
            aria-label="Previous trailer"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
            aria-label="Next trailer"
          >
            <ChevronRight size={32} />
          </button>
        </>
      )}

      {/* Trailer Indicators */}
      {movies.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
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
      {youtubeUrls[currentIndex] && (
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute bottom-8 right-8 z-30 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full border border-white/30 transition-colors"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      )}
    </div>
  );
}
