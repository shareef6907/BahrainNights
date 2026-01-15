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
    affiliate_url: event.affiliate_url || '',
  };
}

interface Country {
  code: string;
  name: string;
  flag: string;
  fullName: string;
}

interface Props {
  events: InternationalEvent[];
  eventsByCountry: Record<string, InternationalEvent[]>;
  countries: Country[];
}

export default function InternationalPageClient({ events, eventsByCountry, countries }: Props) {
  const { t } = useTranslation();
  const [selectedEvent, setSelectedEvent] = useState<InternationalEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

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

  // Filter events based on selected country
  const displayedEvents = selectedCountry
    ? eventsByCountry[selectedCountry] || []
    : events;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 via-blue-900/50 to-teal-900/50" />
        <div className="absolute inset-0 bg-[url('/images/world-map-dots.png')] opacity-10" />

        <div className="relative container mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white text-sm font-medium mb-4">
              {t.international?.title || 'International Events'}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {t.international?.hero?.title || 'International'}{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                {t.international?.hero?.titleHighlight || 'Events'}
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {t.international?.subtitle || 'Discover amazing events across the Middle East and beyond'}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Country Filter Pills */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-gray-700/50">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCountry(null)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                selectedCountry === null
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
              }`}
            >
              All Countries ({events.length})
            </button>
            {countries
              .filter(country => (eventsByCountry[country.name] || []).length > 0)
              .map(country => {
              const count = (eventsByCountry[country.name] || []).length;
              return (
                <button
                  key={country.code}
                  onClick={() => setSelectedCountry(country.name)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${
                    selectedCountry === country.name
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                  }`}
                >
                  <span>{country.flag}</span>
                  <span>{country.name}</span>
                  <span className="text-xs opacity-70">({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="container mx-auto px-4 py-12">
        {displayedEvents.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🌍</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {t.international?.noEvents || 'No upcoming events'}
            </h3>
            <p className="text-gray-400">
              Check back soon for new international events!
            </p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={event.featured_image || event.cover_url || '/images/event-placeholder.jpg'}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />

                      {/* Country Badge */}
                      <div className="absolute top-3 left-3 px-3 py-1 bg-black/70 backdrop-blur rounded-full text-white text-sm font-medium flex items-center gap-1">
                        {countries.find(c => c.name === event.country || c.fullName === event.country)?.flag || '🌍'}
                        <span>{event.city || event.country}</span>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-3 right-3 px-3 py-1 bg-purple-500/80 backdrop-blur rounded-full text-white text-xs font-medium capitalize">
                        {event.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
                        {event.title}
                      </h3>

                      {/* Venue */}
                      {event.venue_name && (
                        <p className="text-gray-400 text-sm mb-2 flex items-center gap-1">
                          <span className="text-purple-400">📍</span>
                          {event.venue_name}
                        </p>
                      )}

                      {/* Date & Time */}
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-300 flex items-center gap-1">
                          <span className="text-blue-400">📅</span>
                          {getDisplayDate(event)}
                        </span>
                        {event.start_time && (
                          <span className="text-gray-300 flex items-center gap-1">
                            <span className="text-teal-400">🕐</span>
                            {formatTime(event.start_time)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Country Sections */}
      {!selectedCountry && (
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Browse by Country
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {countries.map(country => {
              const count = (eventsByCountry[country.name] || []).length;
              return (
                <Link
                  key={country.code}
                  href={`/international/${country.code}`}
                  className="group relative bg-gray-800/50 backdrop-blur rounded-2xl p-6 text-center border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10"
                >
                  <div className="text-5xl mb-3">{country.flag}</div>
                  <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                    {country.name}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {count} {count === 1 ? 'event' : 'events'}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      )}

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
