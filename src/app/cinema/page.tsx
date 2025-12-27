'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Film } from 'lucide-react';
import FeaturedMovie from '@/components/cinema/FeaturedMovie';
import MovieFilters from '@/components/cinema/MovieFilters';
import MovieGrid from '@/components/cinema/MovieGrid';
import MovieModal from '@/components/cinema/MovieModal';
import TrailerModal from '@/components/cinema/TrailerModal';
import { Movie } from '@/components/cinema/MovieCard';

// Generate dates for the next 7 days
const generateDates = () => {
  const dates = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    dates.push({
      date: date.toISOString().split('T')[0],
      dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: date.getDate().toString(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      isToday: i === 0
    });
  }

  return dates;
};

// Mock Movies Data
const nowShowingMovies: Movie[] = [
  {
    id: '1',
    title: 'Dune: Part Three',
    slug: 'dune-part-three',
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&h=800&fit=crop',
    rating: 8.9,
    genres: ['Sci-Fi', 'Adventure'],
    duration: '2h 46min',
    language: 'English',
    isNowShowing: true,
    synopsis: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he must prevent a terrible future only he can foresee.',
    trailerUrl: 'https://www.youtube.com/watch?v=Way9Dexny3w',
    cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson', 'Josh Brolin']
  },
  {
    id: '2',
    title: 'Pushpa 2: The Rule',
    slug: 'pushpa-2-the-rule',
    poster: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1533928298208-27ff66555d8d?w=1920&h=800&fit=crop',
    rating: 8.2,
    genres: ['Action', 'Drama'],
    duration: '3h 20min',
    language: 'Hindi/Telugu',
    isNowShowing: true,
    synopsis: 'Pushpa Raj returns with more power and dominance. After establishing himself in the smuggling world, he now faces bigger challenges from law enforcement and rival syndicates. The rule of Pushpa continues.',
    trailerUrl: 'https://www.youtube.com/watch?v=example',
    cast: ['Allu Arjun', 'Rashmika Mandanna', 'Fahadh Faasil']
  },
  {
    id: '3',
    title: 'Mufasa: The Lion King',
    slug: 'mufasa-the-lion-king',
    poster: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1920&h=800&fit=crop',
    rating: 7.8,
    genres: ['Animation', 'Family'],
    duration: '2h 10min',
    language: 'English',
    isNowShowing: true,
    synopsis: 'Exploring the unlikely rise of the beloved king of the Pride Lands. Rafiki relays the legend of Mufasa to young lion cub Kiara, daughter of Simba and Nala, with Timon and Pumbaa lending their signature style.',
    trailerUrl: 'https://www.youtube.com/watch?v=example',
    cast: ['Aaron Pierre', 'Kelvin Harrison Jr.', 'John Kani']
  },
  {
    id: '4',
    title: 'Sonic the Hedgehog 3',
    slug: 'sonic-the-hedgehog-3',
    poster: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1920&h=800&fit=crop',
    rating: 7.5,
    genres: ['Animation', 'Adventure'],
    duration: '1h 50min',
    language: 'English',
    isNowShowing: true,
    synopsis: 'Sonic, Knuckles, and Tails reunite against a powerful new adversary, Shadow, a mysterious villain with powers unlike anything they have faced before. With their abilities outmatched in every way, Team Sonic must seek out an unlikely alliance.',
    trailerUrl: 'https://www.youtube.com/watch?v=example',
    cast: ['Ben Schwartz', 'Keanu Reeves', 'Jim Carrey', 'Idris Elba']
  },
  {
    id: '5',
    title: 'Nosferatu',
    slug: 'nosferatu',
    poster: 'https://images.unsplash.com/photo-1509248961895-a3de369d8c55?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1604975999044-188783d54fb3?w=1920&h=800&fit=crop',
    rating: 8.1,
    genres: ['Horror'],
    duration: '2h 12min',
    language: 'English',
    isNowShowing: true,
    synopsis: 'A gothic tale of obsession between a haunted young woman in 19th century Germany and the ancient Transylvanian vampire who stalks her, bringing with him untold horror.',
    trailerUrl: 'https://www.youtube.com/watch?v=example',
    cast: ['Bill Skarsgård', 'Lily-Rose Depp', 'Nicholas Hoult', 'Willem Dafoe']
  },
  {
    id: '6',
    title: 'Kraven the Hunter',
    slug: 'kraven-the-hunter',
    poster: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1920&h=800&fit=crop',
    rating: 6.8,
    genres: ['Action'],
    duration: '2h 07min',
    language: 'English',
    isNowShowing: true,
    synopsis: 'Kraven\'s complex relationship with his ruthless father starts him down a path of vengeance with brutal consequences, motivating him to become not only the greatest hunter in the world, but also one of its most feared.',
    trailerUrl: 'https://www.youtube.com/watch?v=example',
    cast: ['Aaron Taylor-Johnson', 'Ariana DeBose', 'Russell Crowe']
  },
  {
    id: '7',
    title: 'Moana 2',
    slug: 'moana-2',
    poster: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1920&h=800&fit=crop',
    rating: 7.6,
    genres: ['Animation', 'Family'],
    duration: '1h 40min',
    language: 'English',
    isNowShowing: true,
    synopsis: 'After receiving an unexpected call from her wayfinding ancestors, Moana journeys alongside Maui and a new crew to the far seas of Oceania and into dangerous, long-lost waters for an adventure unlike anything she\'s ever faced.',
    trailerUrl: 'https://www.youtube.com/watch?v=example',
    cast: ['Auli\'i Cravalho', 'Dwayne Johnson', 'Temuera Morrison']
  },
  {
    id: '8',
    title: 'The Magic Flute',
    slug: 'the-magic-flute',
    poster: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=1920&h=800&fit=crop',
    rating: 7.2,
    genres: ['Drama', 'Arabic'],
    duration: '1h 55min',
    language: 'Arabic',
    isNowShowing: true,
    synopsis: 'A mesmerizing Arabic drama that weaves together tradition and modernity, following a young musician\'s journey through the vibrant streets of Bahrain as he discovers the power of his heritage.',
    trailerUrl: 'https://www.youtube.com/watch?v=example',
    cast: ['Ahmed Al-Jasmi', 'Fatima Al-Doseri', 'Mohammed Al-Rashid']
  }
];

const comingSoonMovies: Movie[] = [
  {
    id: '9',
    title: 'Captain America: Brave New World',
    slug: 'captain-america-brave-new-world',
    poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=1920&h=800&fit=crop',
    rating: 0,
    genres: ['Action', 'Sci-Fi'],
    duration: '2h 30min',
    language: 'English',
    isNowShowing: false,
    releaseDate: 'Feb 14, 2025',
    synopsis: 'Sam Wilson embraces his role as the new Captain America as the world faces a terrifying new global threat.',
    trailerUrl: 'https://www.youtube.com/watch?v=example',
    cast: ['Anthony Mackie', 'Harrison Ford', 'Tim Blake Nelson']
  },
  {
    id: '10',
    title: 'Mickey 17',
    slug: 'mickey-17',
    poster: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=800&fit=crop',
    rating: 0,
    genres: ['Sci-Fi', 'Thriller'],
    duration: '2h 15min',
    language: 'English',
    isNowShowing: false,
    releaseDate: 'Mar 7, 2025',
    synopsis: 'Mickey Barnes is an "expendable" who takes on dangerous jobs no one else wants, dying repeatedly and being regenerated each time.',
    trailerUrl: 'https://www.youtube.com/watch?v=example',
    cast: ['Robert Pattinson', 'Naomi Ackie', 'Steven Yeun', 'Mark Ruffalo']
  },
  {
    id: '11',
    title: 'Snow White',
    slug: 'snow-white-2025',
    poster: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&h=800&fit=crop',
    rating: 0,
    genres: ['Fantasy', 'Musical'],
    duration: '2h 05min',
    language: 'English',
    isNowShowing: false,
    releaseDate: 'Mar 21, 2025',
    synopsis: 'A live-action reimagining of the classic fairy tale, featuring new songs and a fresh perspective on the beloved princess.',
    trailerUrl: 'https://www.youtube.com/watch?v=example',
    cast: ['Rachel Zegler', 'Gal Gadot', 'Andrew Burnap']
  }
];

// Mock Showtimes Data
const mockShowtimes = [
  {
    cinemaName: 'Cineco Seef Mall',
    cinemaLogo: '',
    location: 'Seef District',
    showtimes: [
      { time: '3:30 PM', format: 'Standard', bookingUrl: '#' },
      { time: '6:45 PM', format: 'Standard', bookingUrl: '#' },
      { time: '9:30 PM', format: 'IMAX', bookingUrl: '#' },
      { time: '12:15 AM', format: 'Standard', bookingUrl: '#' }
    ]
  },
  {
    cinemaName: 'Cineco City Centre',
    cinemaLogo: '',
    location: 'City Centre Bahrain',
    showtimes: [
      { time: '4:00 PM', format: 'Standard', bookingUrl: '#' },
      { time: '7:00 PM', format: 'VIP', bookingUrl: '#' },
      { time: '10:00 PM', format: 'Standard', bookingUrl: '#' }
    ]
  },
  {
    cinemaName: 'VOX Cinemas',
    cinemaLogo: '',
    location: 'City Centre Bahrain',
    showtimes: [
      { time: '3:00 PM', format: 'Standard', bookingUrl: '#' },
      { time: '6:00 PM', format: '3D', bookingUrl: '#' },
      { time: '9:00 PM', format: 'IMAX', bookingUrl: '#' },
      { time: '11:45 PM', format: 'Standard', bookingUrl: '#' }
    ]
  },
  {
    cinemaName: 'VOX Cinemas',
    cinemaLogo: '',
    location: 'The Avenues',
    showtimes: [
      { time: '4:30 PM', format: 'Standard', bookingUrl: '#' },
      { time: '7:30 PM', format: 'VIP', bookingUrl: '#' },
      { time: '10:30 PM', format: 'Standard', bookingUrl: '#' }
    ]
  },
  {
    cinemaName: 'Novo Cinemas',
    cinemaLogo: '',
    location: 'Seef Mall',
    showtimes: [
      { time: '5:00 PM', format: 'Standard', bookingUrl: '#' },
      { time: '8:00 PM', format: 'Standard', bookingUrl: '#' },
      { time: '11:00 PM', format: 'Standard', bookingUrl: '#' }
    ]
  }
];

// Filter options
const cinemas = [
  { value: 'all', label: 'All Cinemas' },
  { value: 'cineco', label: 'Cineco' },
  { value: 'vox', label: 'VOX Cinemas' },
  { value: 'novo', label: 'Novo Cinemas' }
];

const genres = [
  { value: 'all', label: 'All Genres' },
  { value: 'action', label: 'Action' },
  { value: 'comedy', label: 'Comedy' },
  { value: 'drama', label: 'Drama' },
  { value: 'horror', label: 'Horror' },
  { value: 'animation', label: 'Animation' },
  { value: 'sci-fi', label: 'Sci-Fi' },
  { value: 'family', label: 'Family' }
];

const languages = [
  { value: 'all', label: 'All Languages' },
  { value: 'english', label: 'English' },
  { value: 'arabic', label: 'Arabic' },
  { value: 'hindi', label: 'Hindi' }
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

  const dates = generateDates();

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
        if (selectedGenre !== 'all' && !movie.genres.some(g => g.toLowerCase() === selectedGenre)) {
          return false;
        }

        // Language filter
        if (selectedLanguage !== 'all' && !movie.language.toLowerCase().includes(selectedLanguage)) {
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
            return 0; // Keep original order for "popular"
        }
      });
  }, [activeTab, searchQuery, selectedGenre, selectedLanguage, sortBy]);

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
            description: 'Find movies now showing in Bahrain cinemas. Check showtimes at Cineco, VOX, and Novo Cinemas. Watch trailers and book tickets online.',
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
                Find showtimes, watch trailers, and book tickets
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
                  Now Showing
                </button>
                <button
                  onClick={() => setActiveTab('coming-soon')}
                  className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                    activeTab === 'coming-soon'
                      ? 'bg-yellow-400 text-black'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Coming Soon
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Movie Banner - Only for Now Showing */}
        {activeTab === 'now-showing' && (
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
            <MovieGrid
              movies={filteredMovies}
              onMovieClick={handleMovieClick}
              onTrailerClick={handleTrailerClick}
            />
          </div>
        </section>

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
          showtimes={mockShowtimes}
          dates={dates}
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
