'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';
import EventModal, { EventData } from '@/components/events/EventModal';

interface InternationalEvent {
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
  end_date: string | null;
  end_time: string | null;
  featured_image: string | null;
  cover_url: string | null;
  affiliate_url: string | null;
  country: string;
  city: string | null;
}

// Transform InternationalEvent to EventData for EventModal
function toEventData(event: InternationalEvent): EventData {
  return {
    id: event.id,
    title: event.title,
    description: event.description,
    price: null,
    price_currency: '',
    image_url: event.featured_image,
    cover_url: event.cover_url,
    venue_name: event.venue_name,
    location: event.city || event.country,
    category: event.category,
    start_date: event.start_date,
    start_time: event.start_time,
    end_date: event.end_date,
    end_time: event.end_time,
    affiliate_url: event.affiliate_url || '',
  };
}

interface CountryConfig {
  name: string;
  fullName: string;
  flag: string;
  dbName: string;
}

interface Props {
  country: CountryConfig;
  events: InternationalEvent[];
  eventsByCity: Record<string, InternationalEvent[]>;
}

export default function CountryPageClient({ country, events, eventsByCity }: Props) {
  const { t } = useTranslation();
  const [selectedEvent, setSelectedEvent] = useState<InternationalEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleEventClick = (event: InternationalEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Smart date display for events - shows "Ongoing" if start_date is past but end_date is future
  const getDisplayDate = (event: InternationalEvent) => {
    const today = new Date().toISOString().split('T')[0];
    const startDate = event.start_date || event.date;
    const endDate = event.end_date;

    // If start date is in the past but end date is in the future, it's an ongoing event
    if (startDate < today && endDate && endDate >= today) {
      return 'Ongoing';
    }

    return formatDate(startDate);
  };

  const formatTime = (timeStr: string | null) => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  // Get unique cities and categories
  const cities = Object.keys(eventsByCity).sort();
  const categories = [...new Set(events.map(e => e.category))].sort();

  // Filter events
  let displayedEvents = events;
  if (selectedCity) {
    displayedEvents = eventsByCity[selectedCity] || [];
  }
  if (selectedCategory) {
    displayedEvents = displayedEvents.filter(e => e.category === selectedCategory);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 via-blue-900/50 to-teal-900/50" />

        <div className="relative container mx-auto px-4 py-20">
          {/* Back Button */}
          <Link
            href="/international"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <span>←</span>
            <span>All International Events</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="text-7xl mb-4 block">{country.flag}</span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Events in{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                {country.fullName}
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover {events.length} upcoming events in {country.name}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-gray-700/50">
          <div className="flex flex-col md:flex-row gap-4">
            {/* City Filter */}
            {cities.length > 1 && (
              <div className="flex flex-wrap gap-2">
                <span className="text-gray-400 text-sm self-center mr-2">City:</span>
                <button
                  onClick={() => setSelectedCity(null)}
                  className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                    selectedCity === null
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                  }`}
                >
                  All Cities
                </button>
                {cities.map(city => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                      selectedCity === city
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                        : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                    }`}
                  >
                    {city} ({(eventsByCity[city] || []).length})
                  </button>
                ))}
              </div>
            )}

            {/* Category Filter */}
            {categories.length > 1 && (
              <div className="flex flex-wrap gap-2 md:ml-auto">
                <span className="text-gray-400 text-sm self-center mr-2">Category:</span>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                    selectedCategory === null
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                  }`}
                >
                  All
                </button>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm transition-all duration-300 capitalize ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                        : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="container mx-auto px-4 py-12">
        {displayedEvents.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">{country.flag}</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {t.international?.noEvents || 'No upcoming events'}
            </h3>
            <p className="text-gray-400 mb-6">
              Check back soon for new events in {country.name}!
            </p>
            <Link
              href="/international"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
            >
              Browse All International Events
            </Link>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {displayedEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => handleEventClick(event)}
                  className="group cursor-pointer"
                >
                  <div className="relative bg-gray-800/50 backdrop-blur rounded-2xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
                    {/* Image */}
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={event.featured_image || event.cover_url || '/images/event-placeholder.jpg'}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />

                      {/* City Badge */}
                      {event.city && (
                        <div className="absolute top-3 left-3 px-3 py-1 bg-black/70 backdrop-blur rounded-full text-white text-sm font-medium flex items-center gap-1">
                          <span>📍</span>
                          <span>{event.city}</span>
                        </div>
                      )}

                      {/* Category Badge */}
                      <div className="absolute top-3 right-3 px-3 py-1 bg-purple-500/80 backdrop-blur rounded-full text-white text-xs font-medium capitalize">
                        {event.category}
                      </div>

                      {/* Event Title Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-xl font-bold text-white mb-1 line-clamp-2 group-hover:text-purple-300 transition-colors">
                          {event.title}
                        </h3>
                        {event.venue_name && (
                          <p className="text-gray-300 text-sm flex items-center gap-1">
                            {event.venue_name}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 border-t border-gray-700/50">
                      {/* Date & Time */}
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium flex items-center gap-2">
                          <span className="text-blue-400">📅</span>
                          {getDisplayDate(event)}
                        </span>
                        {event.start_time && (
                          <span className="text-gray-300 flex items-center gap-2">
                            <span className="text-teal-400">🕐</span>
                            {formatTime(event.start_time)}
                          </span>
                        )}
                      </div>

                      {/* Book Now Button */}
                      <button className="w-full mt-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30">
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <EventModal
          event={toEventData(selectedEvent)}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedEvent(null);
          }}
        />
      )}
    </div>
  );
}
