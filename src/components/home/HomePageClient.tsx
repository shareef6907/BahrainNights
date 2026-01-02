'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Star, ChevronRight, ChevronDown, Menu, X, Sparkles, Plus, Play, Building2, LogIn } from 'lucide-react';
import GlobalSearch from '@/components/search/GlobalSearch';
import { SponsorsSection } from '@/components/sponsors';
import { Movie } from '@/components/cinema/MovieCard';
import LanguageSwitcher from '@/components/LanguageSwitcher';

// Lazy load modals - only loaded when user interacts with movies
const MovieModal = dynamic(() => import('@/components/cinema/MovieModal'), {
  loading: () => null,
  ssr: false,
});

const TrailerModal = dynamic(() => import('@/components/cinema/TrailerModal'), {
  loading: () => null,
  ssr: false,
});

// Animation variants - optimized for speed
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.05 } }
};

const cardHover = {
  y: -6,
  transition: { duration: 0.2 }
};

const dropdownVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: "easeOut" as const }
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: { duration: 0.15 }
  }
};

const accordionVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" as const }
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

// Navigation menu data
const menuItems = [
  {
    name: 'Events',
    icon: '🎭',
    href: '/events',
    dropdown: [
      { name: "Today's Events", icon: '📅', href: '/events?filter=today' },
      { name: 'This Weekend', icon: '🗓️', href: '/events?filter=weekend' },
      { name: 'Concerts & Live Music', icon: '🎵', href: '/events?category=concerts' },
      { name: 'Family & Kids', icon: '👨‍👩‍👧‍👦', href: '/events?category=family' },
      { name: 'Cultural & Arts', icon: '🎨', href: '/events?category=cultural' },
      { name: 'Sports', icon: '⚽', href: '/events?category=sports' },
      { name: 'Full Calendar', icon: '📆', href: '/events/calendar' },
    ]
  },
  {
    name: 'Dining & Nightlife',
    icon: '🍽️',
    href: '/places',
    dropdown: [
      { name: 'Restaurants', icon: '🍴', href: '/places?category=restaurant' },
      { name: 'Cafes & Coffee Shops', icon: '☕', href: '/places?category=cafe' },
      { name: 'Lounges & Bars', icon: '🍸', href: '/places?category=lounge' },
      { name: 'Nightclubs', icon: '🎶', href: '/places?category=nightclub' },
      { name: 'Beach & Pool Clubs', icon: '🏖️', href: '/places?category=beach-club' },
      { name: 'View All Places', icon: '📍', href: '/places' },
    ]
  },
  {
    name: 'Cinema',
    icon: '🎬',
    href: '/cinema',
    dropdown: [
      { name: 'Now Showing', icon: '🎞️', href: '/cinema?filter=now-showing' },
      { name: 'Coming Soon', icon: '🔜', href: '/cinema?filter=coming-soon' },
    ]
  },
  {
    name: 'Offers',
    icon: '🏷️',
    href: '/offers',
    dropdown: [
      { name: 'Ladies Nights', icon: '👠', href: '/offers?type=ladies-night' },
      { name: 'Brunches', icon: '🥂', href: '/offers?type=brunch' },
      { name: 'Happy Hours', icon: '🍻', href: '/offers?type=happy-hour' },
      { name: 'Special Deals', icon: '💎', href: '/offers?type=special' },
    ]
  },
  {
    name: 'Explore',
    icon: '🧭',
    href: '/explore',
    dropdown: [
      { name: 'Hotels & Staycations', icon: '🏨', href: '/explore?category=hotels' },
      { name: 'Spas & Wellness', icon: '💆', href: '/explore?category=spas' },
      { name: 'Shopping & Markets', icon: '🛍️', href: '/explore?category=shopping' },
      { name: 'Tours & Experiences', icon: '🗺️', href: '/explore?category=tours' },
      { name: 'Community Events', icon: '🤝', href: '/explore?category=community' },
    ]
  }
];

// Movie type for the cinema section (full data for modal)
export interface HomepageMovie {
  id: string;
  title: string;
  slug: string;
  poster_url: string | null;
  backdrop_url: string | null;
  tmdb_rating: number | null;
  genre: string[];
  duration_minutes: number | null;
  language: string | null;
  release_date: string | null;
  is_now_showing: boolean;
  synopsis: string | null;
  trailer_url: string | null;
  movie_cast: string[];
  scraped_from: string[];
}

// Helper to convert homepage movie data to Movie format for modal
function convertToMovieFormat(movie: HomepageMovie): Movie {
  const durationMins = movie.duration_minutes || 0;
  const hours = Math.floor(durationMins / 60);
  const mins = durationMins % 60;
  const durationStr = hours > 0 ? `${hours}h ${mins}min` : durationMins > 0 ? `${mins}min` : 'N/A';

  // Handle poster URL
  const getPosterUrl = (url: string | null): string => {
    if (!url) return '/images/movie-placeholder.jpg';
    if (url.startsWith('http')) return url;
    return `https://image.tmdb.org/t/p/w500${url}`;
  };

  // Handle backdrop URL
  const getBackdropUrl = (url: string | null): string => {
    if (!url) return '/images/backdrop-placeholder.jpg';
    if (url.startsWith('http')) return url;
    return `https://image.tmdb.org/t/p/w1280${url}`;
  };

  return {
    id: movie.id,
    title: movie.title,
    slug: movie.slug,
    poster: getPosterUrl(movie.poster_url),
    backdrop: getBackdropUrl(movie.backdrop_url),
    rating: movie.tmdb_rating || 0,
    genres: movie.genre || [],
    duration: durationStr,
    language: movie.language || 'English',
    releaseDate: movie.release_date ? new Date(movie.release_date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }) : undefined,
    isNowShowing: movie.is_now_showing,
    synopsis: movie.synopsis || '',
    trailerUrl: movie.trailer_url || '',
    cast: movie.movie_cast || [],
    scrapedFrom: movie.scraped_from || [],
  };
}

interface HomePageClientProps {
  initialMovies: HomepageMovie[];
  initialStats: { events: number; venues: number; cinema: number; offers: number; explore: number };
}

export default function HomePageClient({ initialMovies, initialStats }: HomePageClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Data from server - no loading needed!
  const [movies] = useState<HomepageMovie[]>(initialMovies);
  const [stats] = useState(initialStats);

  // Movie modal states
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isMovieModalOpen, setIsMovieModalOpen] = useState(false);
  const [trailerMovie, setTrailerMovie] = useState<Movie | null>(null);
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);

  const handleMovieClick = (movie: HomepageMovie) => {
    const convertedMovie = convertToMovieFormat(movie);
    setSelectedMovie(convertedMovie);
    setIsMovieModalOpen(true);
  };

  const handleTrailerClick = (movie: Movie) => {
    setTrailerMovie(movie);
    setIsTrailerModalOpen(true);
  };

  // Optimized scroll handler with throttling
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setActiveDropdown(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Data
  const adSlides = [
    { id: 1, title: "New Year's Eve at The Ritz", subtitle: "Ring in 2026 with elegance", cta: "Book Now", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920&h=600&fit=crop", gradient: "from-purple-600/40 to-pink-600/40" },
    { id: 2, title: "Jazz Night Every Thursday", subtitle: "Live music at Cafe Lilou", cta: "Reserve Table", image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=1920&h=600&fit=crop", gradient: "from-blue-600/40 to-cyan-600/40" },
    { id: 3, title: "Bahrain Food Festival", subtitle: "50+ Local Vendors • Jan 15-20", cta: "Get Tickets", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&h=600&fit=crop", gradient: "from-orange-600/40 to-red-600/40" }
  ];

  // Categories with real counts from API
  const categories = [
    { icon: "🎭", name: "Events", description: "Concerts, shows & more", count: stats.events, color: "from-purple-500 to-pink-500", href: "/events" },
    { icon: "🍽️", name: "Dining & Nightlife", description: "Restaurants & clubs", count: stats.venues, color: "from-orange-500 to-red-500", href: "/places" },
    { icon: "🎬", name: "Cinema", description: "Movies & showtimes", count: stats.cinema, color: "from-blue-500 to-cyan-500", href: "/cinema" },
    { icon: "🏷️", name: "Offers", description: "Deals & promotions", count: stats.offers, color: "from-green-500 to-emerald-500", href: "/offers" },
    { icon: "🧭", name: "Explore", description: "Hotels, spas & more", count: stats.explore, color: "from-indigo-500 to-purple-500", href: "/explore" }
  ];

  const todayEvents = [
    { id: 1, title: "Jazz Night", venue: "Cafe Lilou", time: "8:00 PM", image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=400&h=500&fit=crop", category: "Live Music" },
    { id: 2, title: "Ladies Night", venue: "The Orangery", time: "9:00 PM", image: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=400&h=500&fit=crop", category: "Nightlife" },
    { id: 3, title: "Cinema Night", venue: "Cineco Seef", time: "7:00 PM", image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=500&fit=crop", category: "Entertainment" },
    { id: 4, title: "Beach Party", venue: "Coral Bay", time: "12:00 PM", image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&h=500&fit=crop", category: "Outdoor" }
  ];


  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(prev => (prev + 1) % adSlides.length), 5000);
    return () => clearInterval(timer);
  }, [adSlides.length]);

  // Quick filter buttons with direct page links (not search)
  const quickFilters = [
    { label: '🎭 Events', href: '/events' },
    { label: '🍽️ Dining', href: '/places' },
    { label: '🎬 Cinema', href: '/cinema' },
    { label: '🏷️ Offers', href: '/offers' },
    { label: '🧭 Explore', href: '/explore' },
  ];

  return (
    <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white min-h-screen">
      {/* CSS Background Effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-600/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-cyan-600/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/95 backdrop-blur-xl border-b border-white/10 shadow-xl shadow-black/20' : ''}`}>
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <a href="/" className="flex items-center">
                <span className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                  BahrainNights
                </span>
              </a>
            </div>

            {/* Desktop Navigation - Centered */}
            <div className="hidden lg:flex items-center space-x-1">
              {menuItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200 group ${activeDropdown === item.name ? 'text-white bg-white/5' : ''}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Desktop Dropdown */}
                  <AnimatePresence>
                    {activeDropdown === item.name && (
                      <motion.div
                        className="absolute top-full left-0 mt-2 w-64 bg-slate-900/98 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden"
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <div className="py-2">
                          {item.dropdown.map((subItem, index) => (
                            <a
                              key={subItem.name}
                              href={subItem.href}
                              className="flex items-center space-x-3 px-4 py-3 hover:bg-white/5 transition-colors group"
                              style={{ animationDelay: `${index * 30}ms` }}
                            >
                              <span className="text-xl group-hover:scale-110 transition-transform duration-200">{subItem.icon}</span>
                              <span className="text-gray-300 group-hover:text-white transition-colors">{subItem.name}</span>
                            </a>
                          ))}
                        </div>
                        <div className="border-t border-white/10 p-3">
                          <a
                            href={item.href}
                            className="flex items-center justify-center space-x-2 py-2 text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
                          >
                            <span>View All {item.name}</span>
                            <ChevronRight className="w-4 h-4" />
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center space-x-2">
              <GlobalSearch variant="navbar" />
              <LanguageSwitcher variant="desktop" />
              <a
                href="/list-event"
                className="flex items-center space-x-1.5 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black px-3 py-2 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-orange-500/25 hover:scale-105 transition-all duration-200"
              >
                <Plus className="w-4 h-4" />
                <span>List Event</span>
              </a>
              <a
                href="/venue-portal/login"
                className="flex items-center space-x-1.5 text-gray-400 hover:text-white px-2 py-2 text-xs transition-all duration-200"
              >
                <span>Venue Login</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
              data-testid="mobile-menu-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="lg:hidden bg-slate-900/98 backdrop-blur-xl border-t border-white/10 max-h-[calc(100vh-5rem)] overflow-y-auto"
              data-testid="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-4 space-y-1">
                {menuItems.map((item) => (
                  <div key={item.name} className="border-b border-white/5 last:border-0">
                    {/* Accordion Header */}
                    <button
                      onClick={() => setMobileAccordion(mobileAccordion === item.name ? null : item.name)}
                      className="w-full flex items-center justify-between py-4 text-left"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{item.icon}</span>
                        <span className="text-lg font-medium text-white">{item.name}</span>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${mobileAccordion === item.name ? 'rotate-180 text-yellow-400' : ''}`}
                      />
                    </button>

                    {/* Accordion Content */}
                    <AnimatePresence>
                      {mobileAccordion === item.name && (
                        <motion.div
                          variants={accordionVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="overflow-hidden"
                        >
                          <div className="pb-4 pl-4 space-y-1">
                            {item.dropdown.map((subItem) => (
                              <a
                                key={subItem.name}
                                href={subItem.href}
                                className="flex items-center space-x-3 py-3 px-4 rounded-xl hover:bg-white/5 transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                <span className="text-xl">{subItem.icon}</span>
                                <span className="text-gray-300">{subItem.name}</span>
                              </a>
                            ))}
                            <a
                              href={item.href}
                              className="flex items-center space-x-2 py-3 px-4 text-yellow-400 font-medium"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <span>View All</span>
                              <ChevronRight className="w-4 h-4" />
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {/* Mobile Language & CTA */}
                <div className="pt-4 space-y-3">
                  <LanguageSwitcher variant="mobile" />
                  <a
                    href="/list-event"
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black px-6 py-4 rounded-xl font-semibold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Plus className="w-5 h-5" />
                    <span>List Your Event</span>
                  </a>
                  <a
                    href="/venue-portal/login"
                    className="w-full flex items-center justify-center text-gray-400 hover:text-white text-sm py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>Venue Login</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            className="inline-block mb-6 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:border-yellow-400/50 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-sm text-gray-300 flex items-center gap-2">
              <span className="text-xl">🇧🇭</span>
              Supporting Local Businesses
              <span className="text-yellow-400">•</span>
              Always Free
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
              Discover Bahrain&apos;s
            </span>
            <br />
            <span className="text-white">Best Experiences</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <span className="text-yellow-400">AI-powered</span> • Always updated •
            <span className="text-white font-semibold"> {stats.events > 0 ? stats.events.toLocaleString() : '1,247'} events</span> •
            <span className="text-white font-semibold"> {stats.venues > 0 ? stats.venues.toLocaleString() : '847'} venues</span>
          </motion.p>

          {/* Search Bar */}
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <GlobalSearch
              variant="hero"
              placeholder="What are you looking for tonight?"
            />

            {/* Quick Filters */}
            <motion.div className="flex flex-wrap justify-center gap-3 mt-8" variants={stagger} initial="hidden" animate="visible">
              {quickFilters.map(filter => (
                <motion.a
                  key={filter.label}
                  href={filter.href}
                  className="px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full hover:bg-white/10 hover:border-yellow-400/50 transition-all duration-200 text-sm font-medium"
                  variants={fadeIn}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {filter.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Premium Ad Slider */}
      <section className="px-4 mb-24">
        <div className="max-w-7xl mx-auto">
          <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden">
            <AnimatePresence mode="wait">
              {adSlides.map((slide, index) => (
                index === currentSlide && (
                  <motion.div
                    key={slide.id}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                    <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center text-center p-8">
                      <div className="max-w-3xl">
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 text-white drop-shadow-2xl">{slide.title}</h2>
                        <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-lg">{slide.subtitle}</p>
                        <button className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg shadow-2xl hover:scale-105 transition-transform">
                          {slide.cta}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>

            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {adSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-200 ${index === currentSlide ? 'bg-white w-8' : 'bg-white/50 w-2'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Happening Today */}
      <section className="px-4 mb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex items-center justify-between mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-5xl font-bold flex items-center gap-3">
              🔥 Happening Today
            </h2>
            <a href="/events/today" className="text-yellow-400 hover:text-yellow-300 flex items-center space-x-2 transition-colors group">
              <span className="font-medium">View All</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {todayEvents.map(event => (
              <motion.div
                key={event.id}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-yellow-400/50 transition-colors"
                variants={fadeIn}
                whileHover={cardHover}
              >
                <div className="relative h-72 overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute top-4 right-4 px-4 py-1.5 bg-yellow-400 text-black text-xs font-bold rounded-full">
                    {event.category}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold mb-3">{event.title}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-300">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-yellow-400" />
                        <span>{event.venue}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-yellow-400" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Cinema Section - NO LOADING STATE! Data pre-fetched on server */}
      <section className="px-4 mb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex items-center justify-between mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-5xl font-bold">🎬 Now Showing in Cinemas</h2>
            <a href="/cinema?filter=now-showing" className="text-yellow-400 hover:text-yellow-300 flex items-center space-x-2 transition-colors group">
              <span className="font-medium">All Movies</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {movies.length > 0 ? (
              movies.map((movie) => (
                <motion.div
                  key={movie.id}
                  onClick={() => handleMovieClick(movie)}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer block"
                  variants={fadeIn}
                  whileHover={cardHover}
                >
                  <img
                    src={movie.poster_url?.startsWith('http') ? movie.poster_url : movie.poster_url ? `https://image.tmdb.org/t/p/w500${movie.poster_url}` : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300&h=450&fit=crop'}
                    alt={movie.title}
                    className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-bold text-xl mb-2">{movie.title}</h3>
                      {movie.tmdb_rating && (
                        <div className="flex items-center space-x-2 text-yellow-400">
                          <Star className="w-5 h-5 fill-current" />
                          <span className="text-lg font-semibold">{movie.tmdb_rating.toFixed(1)}</span>
                        </div>
                      )}
                      {/* Play trailer button */}
                      {movie.trailer_url && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTrailerClick(convertToMovieFormat(movie));
                          }}
                          className="mt-3 flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black rounded-full font-medium hover:bg-yellow-300 transition-colors"
                        >
                          <Play className="w-4 h-4 fill-current" />
                          Watch Trailer
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              // No movies fallback
              <div className="col-span-4 text-center py-12">
                <p className="text-gray-400">No movies currently showing. Check back soon!</p>
                <a href="/cinema" className="text-yellow-400 hover:text-yellow-300 mt-2 inline-block">Browse all movies →</a>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Categories Grid - Updated to match main menu */}
      <section className="px-4 mb-24">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            Explore by Category
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {categories.map(category => (
              <motion.a
                key={category.name}
                href={category.href}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 cursor-pointer overflow-hidden hover:border-yellow-400/50 transition-all duration-300"
                variants={fadeIn}
                whileHover={cardHover}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                <div className="relative text-center">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-200">{category.icon}</div>
                  <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-400 mb-2">{category.description}</p>
                  <p className="text-yellow-400 font-semibold">
                    {category.count > 0 ? `${category.count} listings` : 'Coming soon'}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sponsors Section */}
      <SponsorsSection />

      {/* Footer */}
      <footer className="border-t border-white/10 px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-10">
            <div className="md:col-span-2">
              <div className="text-3xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent mb-4">
                BahrainNights
              </div>
              <p className="text-gray-400 mb-6">Bahrain&apos;s first AI-powered guide to events, dining, and culture. Always updated, always alive.</p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                  <span className="text-xl">📸</span>
                </a>
                <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                  <span className="text-xl">👤</span>
                </a>
                <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                  <span className="text-xl">🐦</span>
                </a>
              </div>
            </div>
            {[
              { title: 'Events', links: [{ name: "Today's Events", href: '/events?filter=today' }, { name: 'This Weekend', href: '/events?filter=weekend' }, { name: 'Concerts', href: '/events?category=concerts' }, { name: 'Full Calendar', href: '/events/calendar' }] },
              { title: 'Dining', links: [{ name: 'Restaurants', href: '/places?category=restaurant' }, { name: 'Cafes', href: '/places?category=cafe' }, { name: 'Nightlife', href: '/places?category=nightclub' }, { name: 'View All', href: '/places' }] },
              { title: 'For Businesses', links: [{ name: 'Register Your Venue', href: '/register-venue' }, { name: 'Venue Login', href: '/venue-portal/login' }, { name: 'List Your Event', href: '/list-event' }, { name: 'Advertise', href: '/advertise' }, { name: 'Contact', href: '/contact' }] }
            ].map(section => (
              <div key={section.title}>
                <h4 className="font-bold text-lg mb-4">{section.title}</h4>
                <ul className="space-y-3 text-gray-400">
                  {section.links.map(link => (
                    <li key={link.name} className="hover:text-white hover:translate-x-1 transition-all duration-200">
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-10 border-t border-white/10 text-center text-gray-400">
            <p>© 2025 BahrainNights.com • Powered by AI • Made with ❤️ in Bahrain</p>
          </div>
        </div>
      </footer>

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
    </div>
  );
}
