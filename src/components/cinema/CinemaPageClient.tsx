'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Search, Film, Clock, AlertCircle } from 'lucide-react';
import FeaturedMovie from '@/components/cinema/FeaturedMovie';
import MovieFilters from '@/components/cinema/MovieFilters';
import MovieGrid from '@/components/cinema/MovieGrid';
import { Movie } from '@/components/cinema/MovieCard';
import AdBanner from '@/components/ads/AdBanner';

// Lazy load modals - only loaded when user clicks a movie
const MovieModal = dynamic(() => import('@/components/cinema/MovieModal'), {
  loading: () => null,
  ssr: false,
});

const TrailerModal = dynamic(() => import('@/components/cinema/TrailerModal'), {
  loading: () => null,
  ssr: false,
});

// Filter options
const defaultCinemas = [
  { value: 'all', label: 'All Cinemas' },
];

const genres = [
  { value: 'all', label: 'All Genres' },
  { value: 'action', label: 'Action' },
  { value: 'comedy', label: 'Comedy' },
  { value: 'drama', label: 'Drama' },
  { value: 'horror', label: 'Horror' },
  { value: 'animation', label: 'Animation' },
  { value: 'sci-fi', label: 'Sci-Fi' },
  { value: 'science fiction', label: 'Sci-Fi' },
  { value: 'family', label: 'Family' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'thriller', label: 'Thriller' },
  { value: 'romance', label: 'Romance' },
  { value: 'fantasy', label: 'Fantasy' },
];

const languages = [
  { value: 'all', label: 'All Languages' },
  { value: 'english', label: 'English' },
  { value: 'arabic', label: 'Arabic' },
  { value: 'hindi', label: 'Hindi' },
];

interface CinemaPageClientProps {
  initialNowShowing: Movie[];
  initialComingSoon: Movie[];
  initialCinemas?: { value: string; label: string }[];
  lastUpdated?: string | null;
}

// Format the last updated timestamp
function formatLastUpdated(timestamp: string | null | undefined): string {
  if (!timestamp) return 'Unknown';
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor(diffMs / (1000 * 60));

  if (diffMins < 60) {
    return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  }
}

export default function CinemaPageClient({
  initialNowShowing,
  initialComingSoon,
  initialCinemas = defaultCinemas,
  lastUpdated
}: CinemaPageClientProps) {
  const searchParams = useSearchParams();
  const filterParam = searchParams?.get('filter') ?? null;

  // Set initial tab based on URL parameter
  const initialTab = filterParam === 'coming-soon' ? 'coming-soon' : 'now-showing';

  const [activeTab, setActiveTab] = useState<'now-showing' | 'coming-soon'>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCinema, setSelectedCinema] = useState('all');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isMovieModalOpen, setIsMovieModalOpen] = useState(false);
  const [trailerMovie, setTrailerMovie] = useState<Movie | null>(null);
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);

  // Data from server - no loading needed!
  const [nowShowingMovies] = useState<Movie[]>(initialNowShowing);
  const [comingSoonMovies] = useState<Movie[]>(initialComingSoon);
  const [cinemas] = useState(initialCinemas);

  // Update tab when URL parameter changes
  useEffect(() => {
    if (filterParam === 'coming-soon') {
      setActiveTab('coming-soon');
    } else if (filterParam === 'now-showing') {
      setActiveTab('now-showing');
    }
  }, [filterParam]);

  // Filter and sort movies
  const filteredMovies = useMemo(() => {
    const movies = activeTab === 'now-showing' ? nowShowingMovies : comingSoonMovies;

    return movies
      .filter((movie) => {
        // Search filter
        if (searchQuery && !movie.title.toLowerCase().includes(searchQuery.toLowerCase())) {
          return false;
        }

        // Genre filter
        if (selectedGenre !== 'all' && !movie.genres.some(g => g.toLowerCase() === selectedGenre.toLowerCase())) {
          return false;
        }

        // Language filter
        if (selectedLanguage !== 'all' && !movie.language.toLowerCase().includes(selectedLanguage.toLowerCase())) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'rating':
            return b.rating - a.rating;
          case 'newest':
            return 0; // Would need actual dates
          default:
            return b.rating - a.rating; // Default sort by rating
        }
      });
  }, [activeTab, nowShowingMovies, comingSoonMovies, searchQuery, selectedGenre, selectedLanguage, sortBy]);

  // Filter out movies without valid poster images for the featured slider
  // Sort by IMDB rating (highest first) so best movies get top slider positions
  const featuredMovies = nowShowingMovies
    .filter((movie) => {
      // Must have a real poster URL (not placeholder)
      const hasValidPoster = movie.poster &&
        !movie.poster.includes('placeholder') &&
        !movie.poster.includes('null') &&
        movie.poster.startsWith('http');
      // Must have a real backdrop URL (not placeholder)
      const hasValidBackdrop = movie.backdrop &&
        !movie.backdrop.includes('placeholder') &&
        !movie.backdrop.includes('null') &&
        movie.backdrop.startsWith('http');
      return hasValidPoster && hasValidBackdrop;
    })
    .sort((a, b) => b.rating - a.rating) // Highest rating = 1st slide
    .slice(0, 7);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsMovieModalOpen(true);
  };

  const handleTrailerClick = (movie: Movie) => {
    setTrailerMovie(movie);
    setIsTrailerModalOpen(true);
  };

  const handleClearFilters = () => {
    setSelectedCinema('all');
    setSelectedGenre('all');
    setSelectedLanguage('all');
    setSearchQuery('');
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Cinema in Bahrain - Now Showing Movies | BahrainNights',
            description: 'Find movies now showing in Bahrain cinemas. Check what\'s playing at Cineco, VOX, Cinépolis, and Mukta A2 Cinemas. Watch trailers and book tickets online.',
            url: 'https://bahrainnights.com/cinema'
          })
        }}
      />

      <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white min-h-screen">
        {/* Hero Section */}
        <section className="pt-24 pb-8 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Film className="w-8 h-8 text-yellow-400" />
                <h1 className="text-4xl md:text-5xl font-black">
                  <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                    Now Showing
                  </span>{' '}
                  in Bahrain
                </h1>
              </div>
              <p className="text-xl text-gray-400">
                Find movies, watch trailers, and book tickets at Bahrain cinemas
              </p>

              {/* Last Updated & Report Link */}
              <div className="flex items-center justify-center gap-4 mt-3 text-sm">
                <div className="flex items-center gap-1.5 text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>Updated {formatLastUpdated(lastUpdated)}</span>
                </div>
              </div>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              className="max-w-xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 transition-colors"
                />
              </div>
            </motion.div>

            {/* Tab Toggle */}
            <motion.div
              className="flex justify-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="inline-flex bg-white/5 border border-white/10 rounded-xl p-1">
                <button
                  onClick={() => setActiveTab('now-showing')}
                  className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                    activeTab === 'now-showing'
                      ? 'bg-yellow-400 text-black'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Now Showing ({nowShowingMovies.length})
                </button>
                <button
                  onClick={() => setActiveTab('coming-soon')}
                  className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                    activeTab === 'coming-soon'
                      ? 'bg-yellow-400 text-black'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Coming Soon ({comingSoonMovies.length})
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Movie Banner - Only for Now Showing */}
        {activeTab === 'now-showing' && featuredMovies.length > 0 && (
          <section className="px-4 mb-8 md:mb-12">
            <div className="max-w-7xl mx-auto">
              <FeaturedMovie
                movies={featuredMovies}
                onTrailerClick={handleTrailerClick}
                onMovieClick={handleMovieClick}
              />
            </div>
          </section>
        )}

        {/* Filters */}
        <section className="px-4 mb-8">
          <div className="max-w-7xl mx-auto">
            <MovieFilters
              cinemas={cinemas}
              genres={genres}
              languages={languages}
              selectedCinema={selectedCinema}
              selectedGenre={selectedGenre}
              selectedLanguage={selectedLanguage}
              sortBy={sortBy}
              onCinemaChange={setSelectedCinema}
              onGenreChange={setSelectedGenre}
              onLanguageChange={setSelectedLanguage}
              onSortChange={setSortBy}
              onClearFilters={handleClearFilters}
            />
          </div>
        </section>

        {/* Ad Banner */}
        <section className="px-4 mb-8">
          <div className="max-w-7xl mx-auto">
            <AdBanner targetPage="cinema" placement="banner" limit={5} />
          </div>
        </section>

        {/* Movies Grid */}
        <section className="px-4 pb-12 md:pb-20">
          <div className="max-w-7xl mx-auto">
            {filteredMovies.length === 0 ? (
              <div className="text-center py-20">
                <Film className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No movies found</h3>
                <p className="text-gray-400 mb-4">
                  {nowShowingMovies.length === 0 && comingSoonMovies.length === 0
                    ? 'Movies will be available after syncing with TMDB'
                    : 'Try adjusting your filters'}
                </p>
                {searchQuery || selectedGenre !== 'all' || selectedLanguage !== 'all' ? (
                  <button
                    onClick={handleClearFilters}
                    className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors"
                  >
                    Clear Filters
                  </button>
                ) : null}
              </div>
            ) : (
              <MovieGrid
                movies={filteredMovies}
                onMovieClick={handleMovieClick}
                onTrailerClick={handleTrailerClick}
              />
            )}
          </div>
        </section>

        {/* Movie Detail Modal */}
        <MovieModal
          movie={selectedMovie}
          isOpen={isMovieModalOpen}
          onClose={() => {
            setIsMovieModalOpen(false);
          }}
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
      </div>
    </>
  );
}
