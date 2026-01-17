'use client';

import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Movie } from './MovieCard';
import NetflixMovieCard from './NetflixMovieCard';

interface MovieRowProps {
  title: string;
  icon?: string;
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
}

export default function MovieRow({ title, icon, movies, onSelectMovie }: MovieRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftArrow(scrollLeft > 10);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    handleScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [movies]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  if (movies.length === 0) return null;

  return (
    <div
      className="relative py-4 md:py-6 group/row"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 md:px-12 mb-3 md:mb-4">
        <h2 className="text-lg md:text-2xl font-bold text-white flex items-center gap-2">
          {icon && <span className="text-xl md:text-2xl">{icon}</span>}
          {title}
          <span className="text-gray-500 text-sm font-normal ml-2">({movies.length})</span>
        </h2>
      </div>

      {/* Scrollable Container */}
      <div className="relative">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className={`absolute left-0 top-0 bottom-0 z-40 w-12 md:w-16 bg-gradient-to-r from-gray-950 to-transparent flex items-center justify-start pl-2 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="bg-black/80 hover:bg-black p-2 rounded-full transition-colors">
              <ChevronLeft size={24} className="text-white" />
            </div>
          </button>
        )}

        {/* Cards Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-2 md:gap-3 overflow-x-auto scrollbar-hide px-6 md:px-12 pb-4"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {movies.map((movie, index) => (
            <div key={movie.id} style={{ scrollSnapAlign: 'start' }}>
              <NetflixMovieCard
                movie={movie}
                onSelect={onSelectMovie}
                index={index}
                isFirst={index === 0}
                isLast={index === movies.length - 1}
              />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className={`absolute right-0 top-0 bottom-0 z-40 w-12 md:w-16 bg-gradient-to-l from-gray-950 to-transparent flex items-center justify-end pr-2 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="bg-black/80 hover:bg-black p-2 rounded-full transition-colors">
              <ChevronRight size={24} className="text-white" />
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
