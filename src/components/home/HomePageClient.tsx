'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Star, ChevronRight, ChevronDown, Menu, X, Sparkles, Plus, Play, Building2, LogIn } from 'lucide-react';
import GlobalSearch from '@/components/search/GlobalSearch';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useTranslation } from '@/lib/i18n/TranslationContext';
import { Movie } from '@/components/cinema/MovieCard';

// Lazy load below-fold components for faster initial load
const AdBanner = dynamic(() => import('@/components/ads/AdBanner'), {
  loading: () => <div className="h-[280px] md:h-[500px] bg-slate-800/50 rounded-2xl animate-pulse" />,
  ssr: false,
});

const SponsorsSection = dynamic(
  () => import('@/components/sponsors').then(mod => ({ default: mod.SponsorsSection })),
  { loading: () => null, ssr: false }
);

// Lazy load modals - only loaded when user interacts with movies
const MovieModal = dynamic(() => import('@/components/cinema/MovieModal'), {
  loading: () => null,
  ssr: false,
});

const TrailerModal = dynamic(() => import('@/components/cinema/TrailerModal'), {
  loading: () => null,
  ssr: false,
});

const InternationalEventsSection = dynamic(() => import('@/components/home/InternationalEventsSection'), {
  loading: () => <div className="h-[400px] bg-slate-800/50 rounded-2xl animate-pulse" />,
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

// Navigation menu data - moved to component to use translations

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

// Today event type for "Happening Today" section
export interface TodayEvent {
  id: string;
  title: string;
  slug: string;
  venue: string;
  time: string;
  image: string;
  category: string;
  date: string;
}

// International event type for homepage section
export interface HomepageInternationalEvent {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category: string;
  venue_name: string | null;
  date: string;
  time: string | null;
  start_date: string | null;
  start_time: string | null;
  featured_image: string | null;
  cover_url: string | null;
  affiliate_url: string | null;
  country: string;
  city: string | null;
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
  initialStats: { events: number; venues: number; cinema: number; offers: number; explore: number; attractions: number };
  initialTodayEvents: TodayEvent[];
  initialInternationalEvents: HomepageInternationalEvent[];
}

export default function HomePageClient({ initialMovies, initialStats, initialTodayEvents, initialInternationalEvents }: HomePageClientProps) {
  const { t } = useTranslation();

  // All possible international countries with their config
  const allInternationalCountries = [
    { code: 'uae', name: 'UAE', flag: '🇦🇪', matchNames: ['UAE', 'United Arab Emirates'] },
    { code: 'saudi-arabia', name: 'Saudi Arabia', flag: '🇸🇦', matchNames: ['Saudi Arabia'] },
    { code: 'qatar', name: 'Qatar', flag: '🇶🇦', matchNames: ['Qatar'] },
    { code: 'egypt', name: 'Egypt', flag: '🇪🇬', matchNames: ['Egypt'] },
    { code: 'turkiye', name: 'Türkiye', flag: '🇹🇷', matchNames: ['Türkiye', 'Turkey'] },
    { code: 'uk', name: 'UK', flag: '🇬🇧', matchNames: ['UK', 'United Kingdom'] },
  ];

  // Filter countries that have events
  const countriesWithEvents = allInternationalCountries.filter(country =>
    initialInternationalEvents?.some(event =>
      country.matchNames.includes(event.country)
    )
  );

  // Generate international dropdown items (only countries with events)
  const internationalDropdownItems = [
    { name: t.nav.allInternational || 'All International Events', icon: '🎭', href: '/international' },
    ...countriesWithEvents.map(country => ({
      name: country.name,
      icon: country.flag,
      href: `/international/${country.code}`,
    })),
  ];

  // Navigation menu data with translations
  const menuItems = [
    {
      name: t.nav.attractions,
      icon: '🎢',
      href: '/attractions',
      dropdown: [
        { name: t.nav.allAttractions, icon: '🎯', href: '/attractions' },
        { name: t.nav.tours, icon: '🗺️', href: '/attractions?category=tour' },
        { name: t.nav.waterSports, icon: '🏄', href: '/attractions?category=water-sports' },
        { name: t.nav.indoorActivities, icon: '🎮', href: '/attractions?category=indoor' },
        { name: t.nav.sightseeing, icon: '🏛️', href: '/attractions?category=sightseeing' },
        { name: t.nav.boatTours, icon: '⛵', href: '/attractions?category=boat-tour' },
        { name: t.nav.desertSafari, icon: '🏜️', href: '/attractions?category=desert-safari' },
      ]
    },
    {
      name: t.nav.events,
      icon: '🎭',
      href: '/events',
      dropdown: [
        { name: t.nav.todaysEvents, icon: '📅', href: '/events?filter=today' },
        { name: t.nav.thisWeekend, icon: '🗓️', href: '/events?filter=weekend' },
        { name: t.nav.concertsLiveMusic, icon: '🎵', href: '/events?category=concerts' },
        { name: t.nav.familyKids, icon: '👨‍👩‍👧‍👦', href: '/events?category=family' },
        { name: t.nav.culturalArts, icon: '🎨', href: '/events?category=cultural' },
        { name: t.nav.sports, icon: '⚽', href: '/events?category=sports' },
        { name: t.nav.fullCalendar, icon: '📆', href: '/events/calendar' },
      ]
    },
    {
      name: t.nav.international || 'International',
      icon: '🌍',
      href: '/international',
      dropdown: internationalDropdownItems,
    },
    {
      name: t.nav.diningNightlife,
      icon: '🍽️',
      href: '/places',
      dropdown: [
        { name: t.nav.restaurants, icon: '🍴', href: '/places?category=restaurant' },
        { name: t.nav.cafesCoffeeShops, icon: '☕', href: '/places?category=cafe' },
        { name: t.nav.loungesBars, icon: '🍸', href: '/places?category=lounge' },
        { name: t.nav.nightclubs, icon: '🎶', href: '/places?category=nightclub' },
        { name: t.nav.beachPoolClubs, icon: '🏖️', href: '/places?category=beach-club' },
        { name: t.nav.viewAllPlaces, icon: '📍', href: '/places' },
      ]
    },
    {
      name: t.nav.cinema,
      icon: '🎬',
      href: '/cinema',
      dropdown: [
        { name: t.nav.nowShowing, icon: '🎞️', href: '/cinema?filter=now-showing' },
        { name: t.nav.comingSoon, icon: '🔜', href: '/cinema?filter=coming-soon' },
      ]
    },
    {
      name: t.nav.offers,
      icon: '🏷️',
      href: '/offers',
      dropdown: [
        { name: t.nav.ladiesNights, icon: '👠', href: '/offers?type=ladies-night' },
        { name: t.nav.brunches, icon: '🥂', href: '/offers?type=brunch' },
        { name: t.nav.happyHours, icon: '🍻', href: '/offers?type=happy-hour' },
        { name: t.nav.specialDeals, icon: '💎', href: '/offers?type=special' },
      ]
    },
    {
      name: t.nav.explore,
      icon: '🧭',
      href: '/explore',
      dropdown: [
        { name: t.nav.hotelsStaycations, icon: '🏨', href: '/explore?category=hotels' },
        { name: t.nav.spasWellness, icon: '💆', href: '/explore?category=spas' },
        { name: t.nav.shoppingMarkets, icon: '🛍️', href: '/explore?category=shopping' },
        { name: t.nav.toursExperiences, icon: '🗺️', href: '/explore?category=tours' },
        { name: t.nav.communityEvents, icon: '🤝', href: '/explore?category=community' },
      ]
    }
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Data from server - no loading needed!
  const [movies] = useState<HomepageMovie[]>(initialMovies);
  const [stats] = useState(initialStats);
  const [todayEvents] = useState<TodayEvent[]>(initialTodayEvents);

  // Movie modal states
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isMovieModalOpen, setIsMovieModalOpen] = useState(false);
  const [trailerMovie, setTrailerMovie] = useState<Movie | null>(null);
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);

  // Play video immediately when ready
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Play as soon as we have any data
    const playVideo = () => {
      video.play().catch(() => {});
    };

    // Try to play immediately if already loaded
    if (video.readyState >= 2) {
      playVideo();
    }

    // Listen for when video can start playing
    video.addEventListener('canplay', playVideo);
    video.addEventListener('loadeddata', playVideo);

    return () => {
      video.removeEventListener('canplay', playVideo);
      video.removeEventListener('loadeddata', playVideo);
    };
  }, []);

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

  // Data - ads are now fetched via AdBanner component

  // Categories with real counts from API
  const categories = [
    { icon: "🎢", name: t.categories.attractions, description: t.categories.attractionsDesc, count: stats.attractions, color: "from-teal-500 to-emerald-500", href: "/attractions" },
    { icon: "🎭", name: t.categories.events, description: t.categories.eventsDesc, count: stats.events, color: "from-purple-500 to-pink-500", href: "/events" },
    { icon: "🍽️", name: t.categories.dining, description: t.categories.diningDesc, count: stats.venues, color: "from-orange-500 to-red-500", href: "/places" },
    { icon: "🎬", name: t.categories.cinema, description: t.categories.cinemaDesc, count: stats.cinema, color: "from-blue-500 to-cyan-500", href: "/cinema" },
    { icon: "🏷️", name: t.categories.offers, description: t.categories.offersDesc, count: stats.offers, color: "from-green-500 to-emerald-500", href: "/offers" },
    { icon: "🧭", name: t.categories.explore, description: t.categories.exploreDesc, count: stats.explore, color: "from-indigo-500 to-purple-500", href: "/explore" }
  ];



  // Auto-advance slider - handled by AdBanner component now

  // Quick filter buttons with direct page links (not search)
  const quickFilters = [
    { label: `🎢 ${t.categories.attractions}`, href: '/attractions' },
    { label: `🎭 ${t.home.quickFilters.events}`, href: '/events' },
    { label: `🍽️ ${t.home.quickFilters.dining}`, href: '/places' },
    { label: `🎬 ${t.home.quickFilters.cinema}`, href: '/cinema' },
    { label: `🏷️ ${t.home.quickFilters.offers}`, href: '/offers' },
    { label: `🧭 ${t.home.quickFilters.explore}`, href: '/explore' },
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
            {/* Logo and Language Toggle */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <a href="/" className="flex items-center">
                <span className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                  BahrainNights
                </span>
              </a>
              <LanguageToggle variant="pill" />
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
                            <span>{t.nav.viewAll} {item.name}</span>
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
              <a
                href="/list-event"
                className="flex items-center space-x-1.5 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black px-3 py-2 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-orange-500/25 hover:scale-105 transition-all duration-200"
              >
                <Plus className="w-4 h-4" />
                <span>{t.nav.listEvent}</span>
              </a>
              <a
                href="/register-venue"
                className="flex items-center space-x-1.5 bg-white/10 border border-white/20 text-white px-3 py-2 rounded-full text-sm font-medium hover:bg-white/20 hover:border-yellow-400/50 transition-all duration-200"
              >
                <Building2 className="w-4 h-4" />
                <span>{t.nav.registerVenue}</span>
              </a>
              <a
                href="/venue-portal/login"
                className="flex items-center space-x-1.5 text-gray-400 hover:text-white px-2 py-2 text-xs transition-all duration-200"
              >
                <LogIn className="w-3 h-3" />
                <span>{t.nav.login}</span>
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
                              <span>{t.nav.viewAll}</span>
                              <ChevronRight className="w-4 h-4" />
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {/* Mobile Language Toggle */}
                <div className="flex justify-center py-4 border-b border-white/5">
                  <LanguageToggle variant="default" />
                </div>

                {/* Mobile CTA */}
                <div className="pt-4 space-y-3">
                  <a
                    href="/list-event"
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black px-6 py-4 rounded-xl font-semibold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Plus className="w-5 h-5" />
                    <span>{t.footer.listYourEvent}</span>
                  </a>
                  <a
                    href="/register-venue"
                    className="w-full flex items-center justify-center space-x-2 bg-white/10 border border-white/20 text-white px-6 py-4 rounded-xl font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Building2 className="w-5 h-5" />
                    <span>{t.footer.registerYourVenue}</span>
                  </a>
                  <a
                    href="/venue-portal/login"
                    className="w-full flex items-center justify-center space-x-2 text-gray-400 hover:text-white text-sm py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LogIn className="w-4 h-4" />
                    <span>{t.footer.venueLogin}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section with Video Background */}
      <section className="relative pt-32 pb-32 px-4 min-h-[600px] md:min-h-[700px]">
        {/* Video Background - full size, no cropping from top */}
        <div className="absolute inset-0 w-full h-full">
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            // @ts-expect-error fetchpriority is valid but not in React types yet
            fetchpriority="high"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: 'center center' }}
            src="/Header-Video1.mp4"
          />
          {/* Subtle navy blue gradient at bottom to blend with background */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0F] to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            className="inline-block mb-6 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:border-yellow-400/50 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-sm text-gray-300 flex items-center gap-2">
              <span className="text-xl">🇧🇭</span>
              {t.home.hero.tagline}
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
              {t.home.hero.title}
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {t.home.hero.subtitle} •
            <span className="text-white font-semibold"> {stats.events > 0 ? stats.events.toLocaleString() : '1,247'} {t.nav.events.toLowerCase()}</span> •
            <span className="text-white font-semibold"> {stats.venues > 0 ? stats.venues.toLocaleString() : '847'} {t.nav.venues.toLowerCase()}</span>
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
              placeholder={t.home.hero.searchPlaceholder}
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

      {/* Premium Ad Slider - Fetches ads from database */}
      <section className="relative z-10 px-4 mt-6 mb-10 md:mb-20">
        <div className="max-w-7xl mx-auto">
          <AdBanner
            targetPage="homepage"
            placement="slider"
            limit={5}
            className="h-[280px] md:h-[500px]"
          />
        </div>
      </section>

      {/* Cinema Section - NO LOADING STATE! Data pre-fetched on server */}
      <section className="px-4 mb-12 md:mb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex items-center justify-between mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-5xl font-bold">🎬 {t.home.sections.nowShowing}</h2>
            <a href="/cinema" className="text-yellow-400 hover:text-yellow-300 flex items-center space-x-2 transition-colors group">
              <span className="font-medium">{t.home.sections.viewAll}</span>
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
                    className="w-full h-[280px] md:h-[450px] object-cover group-hover:scale-105 transition-transform duration-300"
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
                          {t.movieModal.watchTrailer}
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

      {/* Happening Today */}
      <section className="px-4 mb-12 md:mb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex items-center justify-between mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-5xl font-bold flex items-center gap-3">
              🔥 {t.home.sections.happeningToday}
            </h2>
            <a href="/events/today" className="text-yellow-400 hover:text-yellow-300 flex items-center space-x-2 transition-colors group">
              <span className="font-medium">{t.home.sections.viewAll}</span>
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
            {todayEvents.length > 0 ? (
              todayEvents.map(event => (
                <motion.a
                  key={event.id}
                  href={`/events/${event.slug}`}
                  className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-yellow-400/50 transition-colors block"
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
                      <h3 className="text-xl font-bold mb-3 line-clamp-2">{event.title}</h3>
                      <div className="flex items-center justify-between text-sm text-gray-300">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-yellow-400" />
                          <span className="truncate max-w-[100px]">{event.venue}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-yellow-400" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))
            ) : (
              <div className="col-span-4 text-center py-12">
                <p className="text-gray-400">No upcoming events found. Check back soon!</p>
                <a href="/events" className="text-yellow-400 hover:text-yellow-300 mt-2 inline-block">Browse all events →</a>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* International Events Section */}
      {initialInternationalEvents && initialInternationalEvents.length > 0 && (
        <InternationalEventsSection events={initialInternationalEvents} />
      )}

      {/* Categories Grid - Updated to match main menu */}
      <section className="px-4 mb-12 md:mb-24">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            {t.home.sections.exploreByCategory}
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
                    {category.count > 0 ? `${category.count} ${t.categories.listings}` : t.categories.comingSoon}
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
              <p className="text-gray-400 mb-6">{t.footer.tagline}</p>
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
              { title: t.footer.events, links: [{ name: t.footer.todaysEvents, href: '/events?filter=today' }, { name: t.footer.thisWeekend, href: '/events?filter=weekend' }, { name: t.footer.concerts, href: '/events?category=concerts' }, { name: t.footer.fullCalendar, href: '/events/calendar' }] },
              { title: t.footer.dining, links: [{ name: t.footer.restaurants, href: '/places?category=restaurant' }, { name: t.footer.cafes, href: '/places?category=cafe' }, { name: t.footer.nightlife, href: '/places?category=nightclub' }, { name: t.footer.viewAll, href: '/places' }] },
              { title: t.footer.forBusinesses, links: [{ name: t.footer.registerYourVenue, href: '/register-venue' }, { name: t.footer.venueLogin, href: '/venue-portal/login' }, { name: t.footer.listYourEvent, href: '/list-event' }, { name: t.footer.advertise, href: '/advertise' }, { name: t.footer.contact, href: '/contact' }] }
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
            <p>{t.footer.copyright}</p>
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
