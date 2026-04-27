'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Play, X, Star, Clock, Calendar, ExternalLink } from 'lucide-react';
import { Movie } from './MovieCard';
import NetflixHero from './NetflixHero';

interface CinemaPageClientProps {
  initialNowShowing: Movie[];
  initialComingSoon: Movie[];
  initialCinemas: { value: string; label: string }[];
  lastUpdated: string | null;
  featuredTrailers: Movie[];
}

export default function CinemaPageClient({
  initialNowShowing,
  initialComingSoon,
  featuredTrailers
}: CinemaPageClientProps) {
  const [activeTab, setActiveTab] = useState<'now-showing' | 'coming-soon'>('now-showing');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const movies = activeTab === 'now-showing' ? initialNowShowing : initialComingSoon;

  // Handle movie click
  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Featured Trailers Hero */}
      <NetflixHero 
        movies={featuredTrailers} 
        onMovieClick={(movie) => handleMovieClick(movie)}
        onBookClick={(movie) => {
          const query = window.encodeURIComponent(movie.title);
          window.open(`https://bhr.voxcinemas.com/movies?search=${query}`, '_blank');
        }}
      />

      {/* Hero to content gradient blend */}
      <div className="relative -mt-32 h-32 z-10 pointer-events-none" 
        style={{ background: 'linear-gradient(to bottom, transparent, #0a0a0a)' }} 
      />

      {/* Navigation Tabs */}
      <div className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-8 py-4">
            <button
              onClick={() => setActiveTab('now-showing')}
              className={`relative pb-3 text-lg font-medium transition-colors duration-300 ${
                activeTab === 'now-showing'
                  ? 'text-[#d4a853]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Now Showing
              {activeTab === 'now-showing' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d4a853]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('coming-soon')}
              className={`relative pb-3 text-lg font-medium transition-colors duration-300 ${
                activeTab === 'coming-soon'
                  ? 'text-[#d4a853]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Coming Soon
              {activeTab === 'coming-soon' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d4a853]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {movies.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">
              {activeTab === 'now-showing' 
                ? 'No movies currently showing' 
                : 'No upcoming movies announced'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                onClick={() => handleMovieClick(movie)}
                isComingSoon={activeTab === 'coming-soon'}
              />
            ))}
          </div>
        )}
      </div>

      {/* Movie Detail Modal */}
      {isModalOpen && selectedMovie && (
        <MovieModal 
          movie={selectedMovie} 
          onClose={closeModal}
          isComingSoon={activeTab === 'coming-soon'}
        />
      )}
    </div>
  );
}

// Movie Card Component
function MovieCard({ 
  movie, 
  onClick,
  isComingSoon 
}: { 
  movie: Movie; 
  onClick: () => void;
  isComingSoon?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative aspect-[2/3] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ease-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 20px 40px rgba(212, 168, 83, 0.15)' : 'none',
      }}
    >
      {/* Poster Image */}
      <Image
        src={movie.poster}
        alt={movie.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

      {/* Coming Soon Badge */}
      {isComingSoon && (
        <div className="absolute top-3 right-3 bg-[#d4a853] text-black text-xs font-bold px-3 py-1 rounded-full">
          COMING SOON
        </div>
      )}

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        {/* Rating */}
        {movie.rating > 0 && (
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-3.5 h-3.5 text-[#d4a853] fill-[#d4a853]" />
            <span className="text-xs text-white/80">{movie.rating.toFixed(1)}</span>
          </div>
        )}

        {/* Title */}
        <h3 className="text-white font-semibold text-sm leading-tight line-clamp-2 mb-2">
          {movie.title}
        </h3>

        {/* Genres */}
        {movie.genres && movie.genres.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {movie.genres.slice(0, 2).map((genre) => (
              <span 
                key={genre} 
                className="text-[10px] text-gray-300 bg-white/10 px-2 py-0.5 rounded"
              >
                {genre}
              </span>
            ))}
          </div>
        )}

        {/* View Details Overlay */}
        <div 
          className={`absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="text-[#d4a853] text-sm font-medium flex items-center gap-2">
            <Play className="w-4 h-4" />
            View Details
          </span>
        </div>
      </div>
    </div>
  );
}

// Movie Modal Component
function MovieModal({ 
  movie, 
  onClose,
  isComingSoon 
}: { 
  movie: Movie; 
  onClose: () => void;
  isComingSoon?: boolean;
}) {
  // Format runtime
  const formatRuntime = (duration: string) => {
    const match = duration.match(/(\d+)h\s*(\d+)?min?/);
    if (match) {
      const hours = parseInt(match[1]);
      const mins = match[2] ? parseInt(match[2]) : 0;
      if (hours > 0 && mins > 0) return `${hours}h ${mins}m`;
      if (hours > 0) return `${hours}h`;
      return `${mins}m`;
    }
    return duration;
  };

  // Generate cinema links
  const movieSearchQuery = encodeURIComponent(movie.title);
  const voxLink = `https://bhr.voxcinemas.com/`;
  const cinecoLink = `https://bahrain.cineco.net/now-showing/`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      {/* Modal Content */}
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#141414] border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Backdrop Image - use poster as fallback */}
        {(movie.backdrop || movie.poster) && (
          <div className="relative h-64 sm:h-80">
            <Image
              src={movie.backdrop || movie.poster}
              alt={movie.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="p-6 sm:p-8 -mt-20 relative">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
            {/* Poster */}
            <div className="flex-shrink-0">
              <div className="relative w-40 sm:w-48 aspect-[2/3] rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={movie.poster}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
                {isComingSoon && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="bg-[#d4a853] text-black text-xs font-bold px-3 py-1 rounded-full">
                      COMING SOON
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                {movie.title}
              </h2>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-300">
                {movie.rating > 0 && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-[#d4a853] fill-[#d4a853]" />
                    <span>{movie.rating.toFixed(1)}</span>
                  </div>
                )}
                {movie.duration && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatRuntime(movie.duration)}</span>
                  </div>
                )}
                {movie.releaseDate && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{movie.releaseDate}</span>
                  </div>
                )}
                {movie.language && (
                  <span className="px-2 py-0.5 bg-white/10 rounded">{movie.language}</span>
                )}
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.genres.map((genre) => (
                    <span 
                      key={genre} 
                      className="text-xs text-[#d4a853] border border-[#d4a853]/30 px-3 py-1 rounded-full"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}

              {/* Synopsis */}
              {movie.synopsis && (
                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-2">Synopsis</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {movie.synopsis}
                  </p>
                </div>
              )}

              {/* Cast */}
              {movie.cast && movie.cast.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-2">Cast</h3>
                  <p className="text-gray-300 text-sm">
                    {movie.cast.join(', ')}
                  </p>
                </div>
              )}

              {/* Book Tickets Section */}
              {!isComingSoon && (
                <div className="mt-8 pt-6 border-t border-white/10">
                  <h3 className="text-white font-semibold mb-4">Book Tickets</h3>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={voxLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 bg-[#d4a853] text-black font-medium rounded-lg hover:bg-[#c49a47] transition-colors"
                    >
                      VOX Cinemas
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <a
                      href={cinecoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors border border-white/20"
                    >
                      Cineco
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              )}

              {/* Watch Trailer */}
              {movie.trailerUrl && (
                <div className="mt-6">
                  <a
                    href={`https://www.youtube.com/watch?v=${movie.trailerUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 border border-white/30 text-white rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    Watch Trailer
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}