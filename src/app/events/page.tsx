'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, Calendar, MapPin, Clock, Filter, Grid3X3, List, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Event interface
interface Event {
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
  time: string;
  price: string;
  isFree: boolean;
}

// Sample events data (placeholder until database is populated)
const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Ragheb Alama Live in Concert',
    slug: 'ragheb-alama-live-concert-2025',
    description: 'Lebanese superstar Ragheb Alama returns to Bahrain for an unforgettable night',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=500&fit=crop',
    category: 'Concerts',
    categoryColor: 'bg-purple-500',
    venue: 'Al Dana Amphitheatre',
    location: 'Bahrain Bay',
    date: 'Jan 10',
    time: '8:00 PM',
    price: 'From BD 25',
    isFree: false,
  },
  {
    id: '2',
    title: 'Jazz Night at Cafe Lilou',
    slug: 'jazz-night-cafe-lilou',
    description: 'Live jazz performance with international artists',
    image: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800&h=500&fit=crop',
    category: 'Live Music',
    categoryColor: 'bg-blue-500',
    venue: 'Cafe Lilou',
    location: 'Adliya',
    date: 'Jan 12',
    time: '8:00 PM',
    price: 'Free Entry',
    isFree: true,
  },
  {
    id: '3',
    title: 'Family Fun Day at Wahooo!',
    slug: 'family-fun-day-wahooo',
    description: 'A day of water park fun for the whole family',
    image: 'https://images.unsplash.com/photo-1526401485004-46910ecc8e51?w=800&h=500&fit=crop',
    category: 'Family',
    categoryColor: 'bg-green-500',
    venue: 'Wahooo! Waterpark',
    location: 'Seef Mall',
    date: 'Jan 13',
    time: '10:00 AM',
    price: 'BD 15',
    isFree: false,
  },
  {
    id: '4',
    title: 'Art Exhibition: Modern Bahrain',
    slug: 'art-exhibition-modern-bahrain',
    description: 'Contemporary art showcase featuring local Bahraini artists',
    image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&h=500&fit=crop',
    category: 'Cultural',
    categoryColor: 'bg-pink-500',
    venue: 'Bahrain National Museum',
    location: 'Manama',
    date: 'Jan 15',
    time: '6:00 PM',
    price: 'Free Entry',
    isFree: true,
  },
  {
    id: '5',
    title: 'Football Match: Bahrain vs UAE',
    slug: 'football-bahrain-vs-uae',
    description: 'Gulf Cup qualifier match',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=500&fit=crop',
    category: 'Sports',
    categoryColor: 'bg-red-500',
    venue: 'Bahrain National Stadium',
    location: 'Riffa',
    date: 'Jan 18',
    time: '7:00 PM',
    price: 'BD 5',
    isFree: false,
  },
  {
    id: '6',
    title: 'Ladies Night at The Orangery',
    slug: 'ladies-night-orangery',
    description: 'Complimentary drinks and live DJ for ladies',
    image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800&h=500&fit=crop',
    category: 'Nightlife',
    categoryColor: 'bg-indigo-500',
    venue: 'The Orangery',
    location: 'Adliya',
    date: 'Jan 11',
    time: '9:00 PM',
    price: 'Free Entry',
    isFree: true,
  },
];

// Category filters
const categories = [
  { id: 'all', name: 'All Events', icon: '🎭' },
  { id: 'concerts', name: 'Concerts & Live Music', icon: '🎵' },
  { id: 'family', name: 'Family & Kids', icon: '👨‍👩‍👧‍👦' },
  { id: 'cultural', name: 'Cultural & Arts', icon: '🎨' },
  { id: 'sports', name: 'Sports', icon: '⚽' },
  { id: 'nightlife', name: 'Nightlife', icon: '🌙' },
];

// Time filters
const timeFilters = [
  { id: 'all', name: 'All Dates' },
  { id: 'today', name: "Today's Events" },
  { id: 'weekend', name: 'This Weekend' },
  { id: 'week', name: 'This Week' },
  { id: 'month', name: 'This Month' },
];

function EventsPageContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTime, setSelectedTime] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Get filter from URL params
  useEffect(() => {
    const filter = searchParams?.get('filter');
    const category = searchParams?.get('category');

    if (filter) {
      setSelectedTime(filter);
    }
    if (category) {
      setSelectedCategory(category);
    }

    // Simulate loading events (replace with actual API call when available)
    setLoading(true);
    setTimeout(() => {
      setEvents(sampleEvents);
      setLoading(false);
    }, 500);
  }, [searchParams]);

  // Filter events based on search and filters
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' ||
      event.category.toLowerCase().includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  return (
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

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
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
            </div>
          </div>

          {/* Events Grid */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-400">
                {loading ? 'Loading...' : `${filteredEvents.length} events found`}
              </p>
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

            {/* Loading State */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white/5 rounded-2xl overflow-hidden animate-pulse">
                    <div className="aspect-video bg-white/10" />
                    <div className="p-4 space-y-3">
                      <div className="h-6 bg-white/10 rounded" />
                      <div className="h-4 bg-white/10 rounded w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredEvents.length > 0 ? (
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
                {filteredEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
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
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className={`absolute top-3 left-3 px-3 py-1 ${event.categoryColor} text-white text-xs font-bold rounded-full`}>
                            {event.category}
                          </div>
                          <div className="absolute top-3 right-3 px-3 py-1 bg-black/70 text-white text-xs rounded-full">
                            {event.date}
                          </div>
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
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-yellow-400" />
                                <span>{event.time}</span>
                              </div>
                              <span className={`font-bold ${event.isFree ? 'text-green-400' : 'text-yellow-400'}`}>
                                {event.price}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
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
                <Link
                  href="/events"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                >
                  View All Events
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

// Loading fallback
function EventsLoadingFallback() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <p className="text-gray-400">Loading events...</p>
      </div>
    </div>
  );
}

export default function EventsPage() {
  return (
    <Suspense fallback={<EventsLoadingFallback />}>
      <EventsPageContent />
    </Suspense>
  );
}
