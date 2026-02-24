'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Ticket } from 'lucide-react';
import Image from 'next/image';
import { Movie } from './MovieCard';

// Genre icons/emojis
const genreIcons: Record<string, string> = {
  'action': '🔥',
  'comedy': '😂',
  'horror': '👻',
  'drama': '🎭',
  'family': '👨‍👩‍👧‍👦',
  'thriller': '😱',
  'animation': '🎨',
  'romance': '💕',
  'sci-fi': '🚀',
  'science fiction': '🚀',
  'adventure': '🗺️',
  'fantasy': '🧙',
  'mystery': '🔍',
  'crime': '🔫',
  'documentary': '📹',
  'music': '🎵',
  'war': '⚔️',
  'western': '🤠',
  'history': '📜',
  'biography': '👤',
};

interface GenreRowProps {
  genre: string;
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
  onTrailerClick: (movie: Movie) => void;
}

export default function GenreRow({ genre, movies, onMovieClick, onTrailerClick }: GenreRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftArrow(scrollLeft > 20);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
  };

  useEffect(() => {
    handleScroll();
  }, [movies]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = scrollContainerRef.current.clientWidth * 0.75;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const genreIcon = genreIcons[genre.toLowerCase()] || '🎬';

  if (movies.length === 0) return null;

  return (
    <div 
      className="relative py-6"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Genre Title */}
      <div className="flex items-center justify-between px-6 md:px-12 mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
          <span className="text-2xl">{genreIcon}</span>
          {genre}
        </h2>
        {movies.length > 5 && (
          <button 
            onClick={() => scroll('right')}
            className="text-sm text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            See All
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Scroll Container */}
      <div className="relative group">
        {/* Left Arrow */}
        <motion.button
          onClick={() => scroll('left')}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-black/80 hover:bg-black rounded-full flex items-center justify-center text-white shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: showLeftArrow && isHovering ? 1 : 0 }}
          style={{ pointerEvents: showLeftArrow ? 'auto' : 'none' }}
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>

        {/* Right Arrow */}
        <motion.button
          onClick={() => scroll('right')}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-black/80 hover:bg-black rounded-full flex items-center justify-center text-white shadow-lg"
          initial={{ opacity: 1 }}
          animate={{ opacity: showRightArrow && isHovering ? 1 : 0 }}
          style={{ pointerEvents: showRightArrow ? 'auto' : 'none' }}
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>

        {/* Left Gradient Fade */}
        {showLeftArrow && (
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        )}

        {/* Right Gradient Fade */}
        {showRightArrow && (
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        )}

        {/* Movies Row */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide px-6 md:px-12 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map((movie, index) => (
            <MoviePoster
              key={movie.id}
              movie={movie}
              index={index}
              onMovieClick={onMovieClick}
              onTrailerClick={onTrailerClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface MoviePosterProps {
  movie: Movie;
  index: number;
  onMovieClick: (movie: Movie) => void;
  onTrailerClick: (movie: Movie) => void;
}

function MoviePoster({ movie, index, onMovieClick, onTrailerClick }: MoviePosterProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="flex-shrink-0 group/card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.3), duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ width: '160px' }} // Fixed width for consistent sizing
    >
      <div 
        className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-800 shadow-lg cursor-pointer transition-all duration-300"
        style={{
          transform: isHovered ? 'scale(1.08)' : 'scale(1)',
          zIndex: isHovered ? 10 : 1,
        }}
        onClick={() => onMovieClick(movie)}
      >
        {/* Poster Image */}
        <Image
          src={movie.poster}
          alt={movie.title}
          fill
          className="object-cover"
          sizes="160px"
          unoptimized
        />

        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex flex-col items-center justify-end p-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Title on hover */}
          <p className="text-white text-sm font-semibold text-center line-clamp-2 mb-3">
            {movie.title}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-2">
            {movie.trailerUrl && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onTrailerClick(movie);
                }}
                className="p-2.5 bg-white rounded-full text-black hover:bg-gray-200 transition-colors shadow-lg"
                aria-label="Play trailer"
              >
                <Play className="w-4 h-4 fill-current" />
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMovieClick(movie);
              }}
              className="p-2.5 bg-red-600 rounded-full text-white hover:bg-red-700 transition-colors shadow-lg"
              aria-label="Book tickets"
            >
              <Ticket className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Rating Badge - Always visible */}
        {movie.rating > 0 && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-black/70 backdrop-blur-sm rounded text-xs font-bold text-yellow-400">
            ★ {movie.rating.toFixed(1)}
          </div>
        )}
      </div>

      {/* Title below poster (always visible) */}
      <div className="mt-3 px-1">
        <p className="text-white text-sm font-medium line-clamp-1 group-hover/card:text-red-400 transition-colors">
          {movie.title}
        </p>
        <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">
          {movie.genres?.slice(0, 2).join(' • ')}
        </p>
      </div>
    </motion.div>
  );
}
