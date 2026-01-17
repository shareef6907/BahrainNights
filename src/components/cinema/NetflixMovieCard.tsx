'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Play, Star, Clock, Calendar } from 'lucide-react';
import { Movie } from './MovieCard';

interface NetflixMovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
  index: number;
  isFirst?: boolean;
  isLast?: boolean;
}

export default function NetflixMovieCard({
  movie,
  onSelect,
  index,
  isFirst = false,
  isLast = false,
}: NetflixMovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Determine hover expansion direction based on position
  const getTransformOrigin = () => {
    if (isFirst) return 'left center';
    if (isLast) return 'right center';
    return 'center center';
  };

  return (
    <div
      ref={cardRef}
      className={`relative flex-shrink-0 w-[140px] md:w-[180px] lg:w-[200px] transition-all duration-300 ease-out cursor-pointer ${
        isHovered ? 'z-50' : 'z-10'
      }`}
      style={{
        transform: isHovered ? 'scale(1.4)' : 'scale(1)',
        transformOrigin: getTransformOrigin(),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(movie)}
    >
      {/* Card Container */}
      <div
        className={`relative rounded-md overflow-hidden bg-gray-900 transition-all duration-300 ${
          isHovered ? 'shadow-2xl shadow-black/80 rounded-b-none' : 'shadow-lg'
        }`}
      >
        {/* Poster Image */}
        <div className="relative aspect-[2/3] w-full">
          <Image
            src={movie.poster || '/placeholder-movie.jpg'}
            alt={movie.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 140px, (max-width: 1024px) 180px, 200px"
            unoptimized
          />

          {/* Play Button Overlay */}
          {isHovered && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="bg-white rounded-full p-3 transform hover:scale-110 transition-transform">
                <Play size={24} className="text-black fill-black ml-0.5" />
              </div>
            </div>
          )}

          {/* Rating Badge */}
          {movie.rating > 0 && (
            <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1">
              <Star size={12} className="text-yellow-400 fill-yellow-400" />
              <span className="text-white text-xs font-bold">{movie.rating.toFixed(1)}</span>
            </div>
          )}

          {/* Language Badge */}
          {movie.language && !isHovered && (
            <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded font-medium">
              {movie.language}
            </div>
          )}
        </div>

        {/* Expanded Info Panel (shows on hover) */}
        {isHovered && (
          <div className="absolute top-full left-0 right-0 bg-gray-900 p-3 rounded-b-md shadow-2xl shadow-black/80">
            {/* Title */}
            <h3 className="text-white font-bold text-sm mb-2 line-clamp-2">{movie.title}</h3>

            {/* Meta Info */}
            <div className="flex items-center gap-3 text-gray-400 text-xs mb-2">
              {movie.duration && (
                <span className="flex items-center gap-1">
                  <Clock size={10} />
                  {movie.duration}
                </span>
              )}
              {movie.releaseDate && (
                <span className="flex items-center gap-1">
                  <Calendar size={10} />
                  {new Date(movie.releaseDate).getFullYear()}
                </span>
              )}
            </div>

            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {movie.genres.slice(0, 3).map((genre, i) => (
                  <span
                    key={i}
                    className="text-xs text-gray-300 bg-gray-800 px-2 py-0.5 rounded"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}

            {/* Book Tickets CTA */}
            <button
              className="w-full mt-3 bg-red-600 hover:bg-red-500 text-white text-xs font-bold py-2 rounded transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(movie);
              }}
            >
              Book Tickets
            </button>
          </div>
        )}
      </div>

      {/* Title (visible when not hovered) */}
      {!isHovered && (
        <div className="mt-2 px-1">
          <h3 className="text-white text-sm font-medium line-clamp-1">{movie.title}</h3>
          {movie.genres && movie.genres.length > 0 && (
            <p className="text-gray-500 text-xs line-clamp-1">{movie.genres.slice(0, 2).join(' • ')}</p>
          )}
        </div>
      )}
    </div>
  );
}
