'use client';

import { useState, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Film } from 'lucide-react';
import NetflixHero from '@/components/cinema/NetflixHero';
import GenreRow from '@/components/cinema/GenreRow';
import { Movie } from '@/components/cinema/MovieCard';

// Lazy load modals - only loaded when user clicks a movie
const MovieModal = dynamic(() => import('@/components/cinema/MovieModal'), {
  loading: () => null,
  ssr: false,
});

const TrailerModal = dynamic(() => import('@/components/cinema/TrailerModal'), {
  loading: () => null,
  ssr: false,
});

interface CinemaPageClientProps {
  initialNowShowing: Movie[];
  initialComingSoon: Movie[];
  initialCinemas?: { value: string; label: string }[];
  lastUpdated?: string | null;
  featuredTrailers?: Movie[];
}

// Genre display order (most popular first)
const GENRE_ORDER = [
  'Action',
  'Comedy', 
  'Horror',
  'Drama',
  'Family',
  'Thriller',
  'Animation',
  'Romance',
  'Sci-Fi',
  'Science Fiction',
  'Adventure',
  'Fantasy',
  'Mystery',
  'Crime',
];

export default function CinemaPageClient({
  initialNowShowing,
  initialComingSoon,
  featuredTrailers,
}: CinemaPageClientProps) {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isMovieModalOpen, setIsMovieModalOpen] = useState(false);
  const [trailerMovie, setTrailerMovie] = useState<Movie | null>(null);
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);

  // All movies for the page (now showing + coming soon, deduplicated)
  const allMovies = useMemo(() => {
    const seen = new Set<string>();
    return [...initialNowShowing, ...initialComingSoon].filter(movie => {
      if (seen.has(movie.id)) return false;
      seen.add(movie.id);
      return true;
    });
  }, [initialNowShowing, initialComingSoon]);

  // Featured movies for the hero - prefer featuredTrailers, fallback to recent with trailers
  const heroMovies = useMemo(() => {
    if (featuredTrailers && featuredTrailers.length > 0) {
      return featuredTrailers;
    }
    // Fallback: now showing movies with trailers, sorted by release date
    return initialNowShowing
      .filter(m => m.trailerUrl && m.backdrop)
      .sort((a, b) => {
        const dateA = a.releaseDate ? new Date(a.releaseDate).getTime() : 0;
        const dateB = b.releaseDate ? new Date(b.releaseDate).getTime() : 0;
        return dateB - dateA;
      })
      .slice(0, 8);
  }, [featuredTrailers, initialNowShowing]);

  // Group movies by genre
  const genreGroups = useMemo(() => {
    const groups: Record<string, Movie[]> = {};
    
    allMovies.forEach(movie => {
      const genres = movie.genres || [];
      genres.forEach(genre => {
        const normalizedGenre = genre.trim();
        if (!groups[normalizedGenre]) {
          groups[normalizedGenre] = [];
        }
        // Avoid duplicates within a genre
        if (!groups[normalizedGenre].find(m => m.id === movie.id)) {
          groups[normalizedGenre].push(movie);
        }
      });
    });

    // Sort genres by preferred order, then alphabetically
    const sortedGenres = Object.keys(groups).sort((a, b) => {
      const indexA = GENRE_ORDER.findIndex(g => g.toLowerCase() === a.toLowerCase());
      const indexB = GENRE_ORDER.findIndex(g => g.toLowerCase() === b.toLowerCase());
      
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return a.localeCompare(b);
    });

    // Filter out genres with less than 2 movies and dedupe similar genres
    const seenGenres = new Set<string>();
    return sortedGenres
      .filter(genre => {
        const normalized = genre.toLowerCase().replace(/[- ]/g, '');
        if (seenGenres.has(normalized)) return false;
        seenGenres.add(normalized);
        // Combine Sci-Fi and Science Fiction
        if (normalized === 'sciencefiction' && seenGenres.has('scifi')) return false;
        if (normalized === 'scifi') seenGenres.add('sciencefiction');
        return groups[genre].length >= 1;
      })
      .map(genre => ({
        name: genre,
        movies: groups[genre].sort((a, b) => b.rating - a.rating),
      }));
  }, [allMovies]);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsMovieModalOpen(true);
  };

  const handleTrailerClick = (movie: Movie) => {
    setTrailerMovie(movie);
    setIsTrailerModalOpen(true);
  };

  const handleBookClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsMovieModalOpen(true);
  };

  // Generate JSON-LD for movies
  const moviesJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: 'Cinema in Bahrain - Movies Now Showing & Coming Soon | BahrainNights',
        description: 'Find movies now showing in Bahrain cinemas. Check what\'s playing at Cineco, VOX, Cinépolis, and Mukta A2 Cinemas.',
        url: 'https://www.bahrainnights.com/cinema'
      },
      {
        '@type': 'ItemList',
        name: 'Movies Now Showing in Bahrain',
        itemListElement: initialNowShowing.slice(0, 10).map((movie, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Movie',
            name: movie.title,
            description: movie.synopsis,
            image: movie.poster,
            datePublished: movie.releaseDate,
            duration: movie.duration,
            genre: movie.genres,
            aggregateRating: movie.rating > 0 ? {
              '@type': 'AggregateRating',
              ratingValue: movie.rating,
              bestRating: 10,
              worstRating: 0
            } : undefined,
            url: `https://www.bahrainnights.com/cinema?movie=${movie.slug}`
          }
        }))
      }
    ]
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(moviesJsonLd) }}
      />

      <main className="min-h-screen bg-[#0a0a0a] text-white">
        {/* Netflix-Style Hero with Autoplay Trailers */}
        <NetflixHero
          movies={heroMovies}
          onMovieClick={handleMovieClick}
          onBookClick={handleBookClick}
        />

        {/* Genre Rows */}
        <div className="relative z-10 -mt-16 pb-12">
          {genreGroups.length > 0 ? (
            genreGroups.map((group) => (
              <GenreRow
                key={group.name}
                genre={group.name}
                movies={group.movies}
                onMovieClick={handleMovieClick}
                onTrailerClick={handleTrailerClick}
              />
            ))
          ) : (
            <div className="text-center py-20 px-6">
              <Film className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Movies Available</h3>
              <p className="text-gray-400">
                Check back soon for the latest movies showing in Bahrain cinemas.
              </p>
            </div>
          )}
        </div>

        {/* Movie Detail Modal */}
        <MovieModal
          movie={selectedMovie}
          isOpen={isMovieModalOpen}
          onClose={() => setIsMovieModalOpen(false)}
          onTrailerClick={() => {
            if (selectedMovie) {
              setTrailerMovie(selectedMovie);
              setIsTrailerModalOpen(true);
            }
          }}
        />

        {/* Trailer Modal */}
        <TrailerModal
          isOpen={isTrailerModalOpen}
          onClose={() => setIsTrailerModalOpen(false)}
          title={trailerMovie?.title || ''}
          trailerUrl={trailerMovie?.trailerUrl || ''}
        />
      </main>
    </>
  );
}
