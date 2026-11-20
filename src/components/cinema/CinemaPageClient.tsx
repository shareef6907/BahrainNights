'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import MovieCard, { Movie } from './MovieCard';
import NetflixHero from './NetflixHero';
import { primaryBookingLink } from '@/lib/cinema/booking-links';

/**
 * The shared modal — the SAME component the homepage uses.
 *
 * There used to be a second, local `MovieModal` defined in this file. It
 * shadowed the shared one and rendered a different design (serif title, gold
 * "Watch Trailer" link out to youtube.com, a bare VOX homepage link), so the
 * cinema page looked nothing like the homepage. Two components with the same
 * name and different designs is the same failure mode as the four copies of
 * `cleanTitle` that shipped in November.
 *
 * The shared component is the reference design and is used as-is.
 */
const MovieModal = dynamic(() => import('@/components/cinema/MovieModal'), {
  loading: () => null,
  ssr: false,
});

/**
 * The shared trailer player. The cinema page used to open YouTube in a new
 * tab; it now uses the same in-page popup as the homepage.
 */
const TrailerModal = dynamic(() => import('@/components/cinema/TrailerModal'), {
  loading: () => null,
  ssr: false,
});

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
  const [trailerMovie, setTrailerMovie] = useState<Movie | null>(null);
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);

  const movies = activeTab === 'now-showing' ? initialNowShowing : initialComingSoon;

  // Handle movie click
  const handleMovieClick = useCallback((movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  }, []);

  // Close modal
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  }, []);

  // Open the shared trailer popup
  const openTrailer = useCallback((movie: Movie) => {
    setTrailerMovie(movie);
    setIsTrailerModalOpen(true);
  }, []);

  const closeTrailer = useCallback(() => {
    setIsTrailerModalOpen(false);
    setTrailerMovie(null);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeModal]);

  /**
   * The hero's "Book" button.
   *
   * It used to open `https://bhr.voxcinemas.com/movies?search=<title>`,
   * which is a **404** on VOX — `/movies?search=` 404s, and the working
   * endpoint is `/search?q=` — so every click was a dead link.
   *
   * Now it uses the ONE booking-link builder. If we have a verified per-film
   * URL, the user goes straight to the film page at that cinema. If we do
   * not, the modal opens instead, where the cinemas the film is listed at
   * are shown as plain links — so the user is never sent to a URL that 404s.
   */
  const handleBookClick = useCallback((movie: Movie) => {
    const link = primaryBookingLink(movie.scrapedFrom, movie.bookingUrls);
    if (link) {
      window.open(link.url, '_blank', 'noopener,noreferrer');
      return;
    }
    handleMovieClick(movie);
  }, [handleMovieClick]);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Featured Trailers Hero */}
      <NetflixHero
        movies={featuredTrailers}
        onMovieClick={(movie) => handleMovieClick(movie)}
        onBookClick={handleBookClick}
        onTrailerClick={openTrailer}
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
            {movies.map((movie, index) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                index={index}
                onMovieClick={handleMovieClick}
                onTrailerClick={openTrailer}
              />
            ))}
          </div>
        )}
      </div>

      {/* Movie Detail Modal — the shared component, as on the homepage */}
      {isModalOpen && selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          isOpen={isModalOpen}
          onClose={closeModal}
          onTrailerClick={() => openTrailer(selectedMovie)}
        />
      )}

      {/* Trailer popup — the shared component, as on the homepage */}
      {isTrailerModalOpen && trailerMovie && (
        <TrailerModal
          isOpen={isTrailerModalOpen}
          onClose={closeTrailer}
          title={trailerMovie.title || ''}
          trailerUrl={trailerMovie.trailerUrl || ''}
        />
      )}
    </div>
  );
}
