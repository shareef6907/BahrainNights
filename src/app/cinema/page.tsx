'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Film, Loader2 } from 'lucide-react';
import FeaturedMovie from '@/components/cinema/FeaturedMovie';
import MovieFilters from '@/components/cinema/MovieFilters';
import MovieGrid from '@/components/cinema/MovieGrid';
import MovieModal from '@/components/cinema/MovieModal';
import TrailerModal from '@/components/cinema/TrailerModal';
import { Movie } from '@/components/cinema/MovieCard';

// Database movie type
interface DBMovie {
  id: string;
  tmdb_id: number;
  title: string;
  slug: string;
  poster_url: string;
  backdrop_url: string;
  duration_minutes: number;
  genre: string[];
  rating: string;
  synopsis: string;
  release_date: string;
  trailer_url: string;
  trailer_key: string;
  language: string;
  director: string;
  movie_cast: string[];
  tmdb_rating: number;
  is_now_showing: boolean;
  is_coming_soon: boolean;
  scraped_from: string[]; // Which cinemas have this movie: ['cineco', 'vox', 'mukta', 'cinepolis']
}

// Helper to construct full TMDB image URLs
function getPosterUrl(posterPath: string | null): string {
  if (!posterPath) return '/images/movie-placeholder.jpg';
  if (posterPath.startsWith('http')) return posterPath;
  // Handle paths like "/abc123.jpg" - prepend TMDB URL
  return `https://image.tmdb.org/t/p/w500${posterPath}`;
}

function getBackdropUrl(backdropPath: string | null): string {
  if (!backdropPath) return '/images/backdrop-placeholder.jpg';
  if (backdropPath.startsWith('http')) return backdropPath;
  // Handle paths like "/abc123.jpg" - prepend TMDB URL
  return `https://image.tmdb.org/t/p/w1280${backdropPath}`;
}

// Convert DB movie to component Movie format
function convertToMovieFormat(dbMovie: DBMovie): Movie {
  const durationMins = dbMovie.duration_minutes || 0;
  const hours = Math.floor(durationMins / 60);
  const mins = durationMins % 60;
  const durationStr = hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;

  return {
    id: dbMovie.id,
    title: dbMovie.title,
    slug: dbMovie.slug,
    poster: getPosterUrl(dbMovie.poster_url),
    backdrop: getBackdropUrl(dbMovie.backdrop_url),
    rating: dbMovie.tmdb_rating || 0,
    genres: dbMovie.genre || [],
    duration: durationStr,
    language: dbMovie.language || 'English',
    releaseDate: dbMovie.release_date ? new Date(dbMovie.release_date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }) : undefined,
    isNowShowing: dbMovie.is_now_showing,
    synopsis: dbMovie.synopsis || '',
    trailerUrl: dbMovie.trailer_url || '',
    cast: dbMovie.movie_cast || [],
    scrapedFrom: dbMovie.scraped_from || [],
  };
}

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

export default function CinemaPage() {
  const [activeTab, setActiveTab] = useState<'now-showing' | 'coming-soon'>('now-showing');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCinema, setSelectedCinema] = useState('all');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isMovieModalOpen, setIsMovieModalOpen] = useState(false);
  const [trailerMovie, setTrailerMovie] = useState<Movie | null>(null);
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);

  // Data states
  const [nowShowingMovies, setNowShowingMovies] = useState<Movie[]>([]);
  const [comingSoonMovies, setComingSoonMovies] = useState<Movie[]>([]);
  const [cinemas, setCinemas] = useState(defaultCinemas);
  const [loading, setLoading] = useState(true);

  // Fetch movies and cinemas
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch now showing movies
        const nowShowingRes = await fetch('/api/cinema/movies?status=now_showing');
        if (nowShowingRes.ok) {
          const data = await nowShowingRes.json();
          setNowShowingMovies((data.movies || []).map(convertToMovieFormat));
        }

        // Fetch coming soon movies
        const comingSoonRes = await fetch('/api/cinema/movies?status=coming_soon');
        if (comingSoonRes.ok) {
          const data = await comingSoonRes.json();
          setComingSoonMovies((data.movies || []).map(convertToMovieFormat));
        }

        // Fetch cinemas for filter dropdown
        const cinemasRes = await fetch('/api/cinema/cinemas');
        if (cinemasRes.ok) {
          const data = await cinemasRes.json();
          interface Cinema {
            id: string;
            name: string;
          }
          const cinemaOptions = [
            { value: 'all', label: 'All Cinemas' },
            ...(data.cinemas || []).map((c: Cinema) => ({
              value: c.id,
              label: c.name,
            })),
          ];
          setCinemas(cinemaOptions);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const featuredMovies = nowShowingMovies.slice(0, 3);

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

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-yellow-400 animate-spin mb-4" />
            <p className="text-gray-400">Loading movies...</p>
          </div>
        )}

        {!loading && (
          <>
            {/* Featured Movie Banner - Only for Now Showing */}
            {activeTab === 'now-showing' && featuredMovies.length > 0 && (
              <section className="px-4 mb-12">
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

            {/* Movies Grid */}
            <section className="px-4 pb-20">
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
          </>
        )}

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
