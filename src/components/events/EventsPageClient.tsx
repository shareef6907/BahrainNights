'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, Calendar, MapPin, Clock, Filter, Grid3X3, List, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import AdBanner from '@/components/ads/AdBanner';

// Event interface
export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  category: string;
  categoryColor: string;
  venue: string;
  location: string;
  date: string;
  endDate?: string; // For multi-day events (formatted display string)
  rawDate: string; // ISO date string for filtering
  rawEndDate?: string; // ISO end date for filtering
  time: string;
  price: string;
  isFree: boolean;
  isFeatured?: boolean;
}

// Attraction interface for Family & Kids
export interface Attraction {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  area: string;
  priceFrom?: number;
  priceRange?: string;
  rating?: number;
  duration?: string;
  ageRange?: string;
  tags: string[];
  isFeatured: boolean;
}

// Category filters
const categories = [
  { id: 'all', name: 'All Events', icon: '🎭' },
  { id: 'music', name: 'Music & Concerts', icon: '🎵' },
  { id: 'dining', name: 'Dining & Food', icon: '🍽️' },
  { id: 'family', name: 'Family & Kids', icon: '👨‍👩‍👧‍👦' },
  { id: 'arts', name: 'Arts & Culture', icon: '🎨' },
  { id: 'sports', name: 'Sports & Fitness', icon: '⚽' },
  { id: 'nightlife', name: 'Nightlife', icon: '🌙' },
  { id: 'business', name: 'Business', icon: '💼' },
  { id: 'wellness', name: 'Wellness', icon: '🧘' },
  { id: 'shopping', name: 'Shopping', icon: '🛍️' },
  { id: 'community', name: 'Community', icon: '🤝' },
];

// Time filters
const timeFilters = [
  { id: 'all', name: 'All Dates' },
  { id: 'today', name: "Today" },
  { id: 'weekend', name: 'This Weekend' },
  { id: 'week', name: 'This Week' },
  { id: 'month', name: 'This Month' },
];

interface EventsPageClientProps {
  initialEvents: Event[];
  familyAttractions?: Attraction[];
}

export default function EventsPageClient({ initialEvents, familyAttractions = [] }: EventsPageClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams?.get('category') || 'all');
  const [selectedTime, setSelectedTime] = useState(searchParams?.get('filter') || 'all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Use initialEvents directly - SSR ensures data is already available
  const events = initialEvents || [];

  // Update URL when filters change (without page reload)
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (selectedTime !== 'all') params.set('filter', selectedTime);

    const newUrl = params.toString() ? `/events?${params.toString()}` : '/events';
    router.replace(newUrl, { scroll: false });
  }, [selectedCategory, selectedTime, router]);

  // Filter events based on search, category, and time
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          event.title.toLowerCase().includes(query) ||
          event.venue.toLowerCase().includes(query) ||
          event.description?.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedCategory !== 'all') {
        if (event.category.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
      }

      // Time filter - use ISO string comparison to avoid timezone issues
      // For ongoing/multi-day events, check if event is ACTIVE during the filter period
      if (selectedTime !== 'all') {
        // Get today's date in Bahrain timezone (UTC+3) as ISO string
        const now = new Date();
        const bahrainTime = new Date(now.getTime() + (3 * 60 * 60 * 1000) - (now.getTimezoneOffset() * 60 * 1000));
        const todayISO = bahrainTime.toISOString().split('T')[0]; // "2025-12-30"

        // Event start and end dates (for multi-day events)
        const eventStartISO = event.rawDate;
        const eventEndISO = event.rawEndDate || eventStartISO; // Use start date if no end date
        if (!eventStartISO) return true; // Skip if no date

        // Helper to add days to ISO date string
        const addDays = (isoDate: string, days: number): string => {
          const date = new Date(isoDate + 'T12:00:00Z'); // Use noon UTC to avoid DST issues
          date.setUTCDate(date.getUTCDate() + days);
          return date.toISOString().split('T')[0];
        };

        // Helper to check if event is active during a date range
        // Event overlaps if: eventStart <= periodEnd AND eventEnd >= periodStart
        const isEventActiveDuring = (periodStartISO: string, periodEndISO: string): boolean => {
          return eventStartISO <= periodEndISO && eventEndISO >= periodStartISO;
        };

        // Get day of week (0=Sun, 1=Mon, ..., 6=Sat)
        const todayDate = new Date(todayISO + 'T12:00:00Z');
        const dayOfWeek = todayDate.getUTCDay();

        switch (selectedTime) {
          case 'today':
            // Event is active today if today falls between start and end dates
            if (!isEventActiveDuring(todayISO, todayISO)) return false;
            break;

          case 'weekend': {
            // Weekend = Friday through Sunday
            let fridayISO: string;
            let sundayISO: string;

            if (dayOfWeek === 0) {
              // Today is Sunday - current weekend is Fri-Sun
              fridayISO = addDays(todayISO, -2);
              sundayISO = todayISO;
            } else if (dayOfWeek === 6) {
              // Today is Saturday
              fridayISO = addDays(todayISO, -1);
              sundayISO = addDays(todayISO, 1);
            } else if (dayOfWeek === 5) {
              // Today is Friday
              fridayISO = todayISO;
              sundayISO = addDays(todayISO, 2);
            } else {
              // Mon-Thu: show upcoming weekend
              const daysUntilFriday = 5 - dayOfWeek;
              fridayISO = addDays(todayISO, daysUntilFriday);
              sundayISO = addDays(fridayISO, 2);
            }

            // Event is active during weekend if it overlaps with Fri-Sun
            if (!isEventActiveDuring(fridayISO, sundayISO)) return false;
            break;
          }

          case 'week': {
            // This week = Monday through Sunday of current week
            let mondayISO: string;
            let sundayISO: string;

            if (dayOfWeek === 0) {
              // Sunday - week started 6 days ago
              mondayISO = addDays(todayISO, -6);
              sundayISO = todayISO;
            } else {
              // Mon-Sat
              mondayISO = addDays(todayISO, -(dayOfWeek - 1));
              sundayISO = addDays(mondayISO, 6);
            }

            // Event is active this week if it overlaps with Mon-Sun
            if (!isEventActiveDuring(mondayISO, sundayISO)) return false;
            break;
          }

          case 'month': {
            // Current month
            const year = todayISO.substring(0, 4);
            const month = todayISO.substring(5, 7);
            const firstDayISO = `${year}-${month}-01`;
            // Get last day of month
            const lastDayDate = new Date(Date.UTC(parseInt(year), parseInt(month), 0));
            const lastDayISO = lastDayDate.toISOString().split('T')[0];

            // Event is active this month if it overlaps with the month
            if (!isEventActiveDuring(firstDayISO, lastDayISO)) return false;
            break;
          }
        }
      }

      return true;
    });
  }, [events, searchQuery, selectedCategory, selectedTime]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedTime('all');
  };

  // Generate JSON-LD for events (limited to first 10 for performance)
  const eventsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: filteredEvents.slice(0, 10).map((event, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Event',
        name: event.title,
        description: event.description,
        startDate: event.rawDate,
        endDate: event.rawEndDate || event.rawDate,
        location: {
          '@type': 'Place',
          name: event.venue,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Bahrain'
          }
        },
        image: event.image,
        url: `https://bahrainnights.com/events/${event.slug}`,
        offers: event.isFree ? {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'BHD',
          availability: 'https://schema.org/InStock'
        } : undefined,
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode'
      }
    }))
  };

  return (
    <>
      {/* JSON-LD Structured Data for Events */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsJsonLd) }}
      />

      <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-pink-500/5 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Discover{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                Events
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Find the best concerts, shows, and experiences happening in Bahrain
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events, venues, or artists..."
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
              />
            </div>
          </motion.div>

          {/* Time Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-6"
          >
            {timeFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedTime(filter.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedTime === filter.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mobile Category Filter - Horizontal Scrollable Pills */}
      <section className="lg:hidden px-4 pb-4 -mt-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full whitespace-nowrap text-sm transition-all ${
                selectedCategory === category.id
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/15'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.id === 'all' ? 'All' : category.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Mobile Quick Links */}
        <div className="flex gap-3 mt-3">
          <Link
            href="/events/calendar"
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-yellow-400 text-sm font-medium"
          >
            <Calendar className="w-4 h-4" />
            Calendar
          </Link>
          <Link
            href="/list-event"
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-white text-sm font-medium"
          >
            List Event
          </Link>
        </div>
      </section>

      {/* Ad Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <AdBanner targetPage="events" placement="banner" limit={5} />
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Hidden on Mobile */}
          <div className="hidden lg:block lg:w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all ${
                      selectedCategory === category.id
                        ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                        : 'text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    <span className="text-xl">{category.icon}</span>
                    <span className="text-sm">{category.name}</span>
                  </button>
                ))}
              </div>

              {/* Calendar Link */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <Link
                  href="/events/calendar"
                  className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors"
                >
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">View Full Calendar</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* List Your Event CTA */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <Link
                  href="/list-event"
                  className="block w-full text-center px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                >
                  List Your Event
                </Link>
              </div>

              {/* Sidebar Ad */}
              <div className="mt-6">
                <AdBanner targetPage="events" placement="sidebar" />
              </div>
            </div>
          </div>

          {/* Events Grid */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <p className="text-gray-400">
                  {selectedCategory === 'family'
                    ? `${filteredEvents.length} events + ${familyAttractions.length} activities found`
                    : `${filteredEvents.length} events found`
                  }
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Family & Kids Attractions Section */}
            {selectedCategory === 'family' && familyAttractions.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="text-2xl">👨‍👩‍👧‍👦</span>
                    Family Activities & Attractions
                  </h2>
                  <Link
                    href="/explore/kids"
                    className="text-green-400 hover:text-green-300 text-sm font-medium transition-colors"
                  >
                    View All →
                  </Link>
                </div>
                <motion.div
                  className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: { transition: { staggerChildren: 0.05 } }
                  }}
                >
                  {familyAttractions.map((attraction) => (
                    <motion.div
                      key={attraction.id}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      whileHover={{ y: -6 }}
                      className="group"
                    >
                      <Link href={`/explore/kids/${attraction.slug}`} className="block">
                        <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-green-400/50 transition-all duration-300">
                          <div className="relative aspect-video overflow-hidden">
                            <Image
                              src={attraction.image}
                              alt={attraction.name}
                              fill
                              className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute top-3 left-3 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                              Activity
                            </div>
                            {attraction.rating && (
                              <div className="absolute top-3 right-3 px-2 py-1 bg-black/70 text-white text-xs rounded-full flex items-center gap-1">
                                ⭐ {attraction.rating.toFixed(1)}
                              </div>
                            )}
                            {attraction.isFeatured && (
                              <div className="absolute bottom-3 left-3 px-2 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full">
                                ⭐ Featured
                              </div>
                            )}
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-bold text-white group-hover:text-green-400 transition-colors line-clamp-2 mb-2">
                              {attraction.name}
                            </h3>
                            <div className="space-y-2 text-sm text-gray-400">
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-green-400" />
                                <span className="line-clamp-1">{attraction.area}</span>
                              </div>
                              {attraction.duration && (
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4 text-green-400" />
                                  <span>{attraction.duration}</span>
                                </div>
                              )}
                              {attraction.priceFrom && (
                                <div className="text-green-400 font-medium">
                                  From BD {attraction.priceFrom}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}

            {/* Events Section Header when in Family category */}
            {selectedCategory === 'family' && filteredEvents.length > 0 && (
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">🎭</span>
                Family Events
              </h2>
            )}

            {filteredEvents.length > 0 ? (
              <motion.div
                className={`grid gap-6 ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-1'
                }`}
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.05 } }
                }}
              >
                {filteredEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    data-testid="event-card"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    whileHover={{ y: -6 }}
                    className="group"
                  >
                    <Link href={`/events/${event.slug}`} className="block">
                      <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-yellow-400/50 transition-all duration-300">
                        <div className="relative aspect-video overflow-hidden">
                          <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className={`absolute top-3 left-3 px-3 py-1 ${event.categoryColor} text-white text-xs font-bold rounded-full capitalize`}>
                            {event.category}
                          </div>
                          <div className="absolute top-3 right-3 px-3 py-1 bg-black/70 text-white text-xs rounded-full">
                            {event.endDate ? `${event.date} - ${event.endDate}` : event.date}
                          </div>
                          {event.isFeatured && (
                            <div className="absolute bottom-3 left-3 px-2 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full">
                              ⭐ Featured
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-2 mb-2">
                            {event.title}
                          </h3>
                          <div className="space-y-2 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-yellow-400" />
                              <span className="line-clamp-1">{event.venue}</span>
                            </div>
                            {/* Only show time if it's set and not TBA */}
                            {event.time && !event.time.toLowerCase().includes('tba') && (
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-yellow-400" />
                                <span>{event.time}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : selectedCategory === 'family' && familyAttractions.length > 0 ? (
              /* No events but we have attractions - show "no events" message only */
              <div className="text-center py-8 border-t border-white/10 mt-4">
                <p className="text-gray-400">
                  No family events scheduled right now. Check out the activities above!
                </p>
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🎭</div>
                <h3 className="text-2xl font-bold text-white mb-2">No events found</h3>
                <p className="text-gray-400 mb-6">
                  {searchQuery || selectedCategory !== 'all'
                    ? 'Try adjusting your search or filters'
                    : 'Check back soon for upcoming events!'}
                </p>
                {(searchQuery || selectedCategory !== 'all' || selectedTime !== 'all') && (
                  <button
                    onClick={handleClearFilters}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                  >
                    Clear Filters
                  </button>
                )}
                <div className="mt-8">
                  <p className="text-gray-500 mb-4">Have an event to share?</p>
                  <Link
                    href="/list-event"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                  >
                    List Your Event Free
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
