'use client';

import { useState, useMemo } from 'react';
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

// Popular cities for quick jump - ordered by likely popularity
const POPULAR_CITIES = [
  { name: 'Dubai', country: 'UAE' },
  { name: 'Abu Dhabi', country: 'UAE' },
  { name: 'Riyadh', country: 'Saudi Arabia' },
  { name: 'Jeddah', country: 'Saudi Arabia' },
  { name: 'Doha', country: 'Qatar' },
  { name: 'Muscat', country: 'Oman' },
];

// Country flag mapping
const COUNTRY_FLAGS: Record<string, string> = {
  'UAE': '🇦🇪',
  'United Arab Emirates': '🇦🇪',
  'Saudi Arabia': '🇸🇦',
  'Qatar': '🇶🇦',
  'Kuwait': '🇰🇼',
  'Oman': '🇴🇲',
  'Jordan': '🇯🇴',
  'Lebanon': '🇱🇧',
  'Türkiye': '🇹🇷',
  'Turkey': '🇹🇷',
  'Egypt': '🇪🇬',
  'Morocco': '🇲🇦',
  'UK': '🇬🇧',
  'United Kingdom': '🇬🇧',
  'Germany': '🇩🇪',
  'France': '🇫🇷',
  'Spain': '🇪🇸',
  'Italy': '🇮🇹',
  'India': '🇮🇳',
};

function getCountryFlag(country: string): string {
  return COUNTRY_FLAGS[country] || '🌍';
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

export default function InternationalEventsSection({ events, eventsByCountry, countries }: Props) {
  const { t } = useTranslation();
  const [selectedEvent, setSelectedEvent] = useState<InternationalEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

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

  const getDisplayDate = (event: InternationalEvent) => {
    const today = new Date().toISOString().split('T')[0];
    const startDate = event.start_date || event.date;
    const endDate = event.end_date;
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

  // Get cities with events for popular cities
  const popularCitiesWithEvents = useMemo(() => {
    return POPULAR_CITIES.map(pc => {
      const cityEvents = events.filter(e => e.city === pc.name && e.country === pc.country);
      return { ...pc, count: cityEvents.length };
    }).filter(pc => pc.count > 0);
  }, [events]);

  // Get all cities grouped by country
  const citiesByCountry = useMemo(() => {
    const cities: Record<string, Record<string, InternationalEvent[]>> = {};
    events.forEach(event => {
      if (event.city) {
        if (!cities[event.country]) cities[event.country] = {};
        if (!cities[event.country][event.city]) cities[event.country][event.city] = [];
        cities[event.country][event.city].push(event);
      }
    });
    return cities;
  }, [events]);

  // Get filtered events
  const displayedEvents = useMemo(() => {
    let filtered = selectedCountry && selectedCity
      ? (citiesByCountry[selectedCountry]?.[selectedCity] || [])
      : selectedCountry
        ? (eventsByCountry[selectedCountry] || [])
        : events;
    
    // Limit to 6 per city when viewing a specific city
    if (selectedCity) {
      filtered = filtered.slice(0, 6);
    }
    
    return filtered;
  }, [selectedCountry, selectedCity, events, eventsByCountry, citiesByCountry]);

  const handleCityClick = (cityName: string, country: string) => {
    setSelectedCountry(country);
    setSelectedCity(cityName);
  };

  const handleCountryClick = (countryName: string) => {
    setSelectedCountry(countryName);
    setSelectedCity(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black">
      {/* Section Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-teal-900/30" />

        <div className="relative container mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white text-sm font-medium mb-4">
              International Events
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Global{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Experiences
              </span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Discover amazing events across the Middle East and beyond — from Dubai to Doha, Riyadh to Cairo
            </p>
          </motion.div>
        </div>
      </div>

      {/* Popular Cities Quick Jump */}
      {popularCitiesWithEvents.length > 0 && (
        <div className="container mx-auto px-4 pb-8">
          <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
            {popularCitiesWithEvents.map(city => (
              <button
                key={`${city.country}-${city.name}`}
                onClick={() => handleCityClick(city.name, city.country)}
                className={`px-4 py-2 md:py-2 rounded-full text-sm font-medium transition-all duration-300 touch-manipulation cursor-pointer select-none ${
                  selectedCity === city.name && selectedCountry === city.country
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-700/50'
                }`}
              >
                {getCountryFlag(city.country)} {city.name} ({city.count})
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Country Filter Pills */}
      <div className="container mx-auto px-4 pb-8">
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-gray-700/50">
          <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
            <button
              type="button"
              onClick={() => { setSelectedCountry(null); setSelectedCity(null); }}
              className={`px-4 py-2 md:py-2 rounded-full transition-all duration-300 text-sm md:text-base touch-manipulation cursor-pointer select-none ${
                !selectedCountry
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'
              }`}
            >
              All ({events.length})
            </button>
            {countries.map(country => {
              const count = eventsByCountry[country.name]?.length || 0;
              return (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleCountryClick(country.name)}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    handleCountryClick(country.name);
                  }}
                  className={`px-4 py-2 md:py-2 rounded-full transition-all duration-300 text-sm md:text-base touch-manipulation cursor-pointer select-none ${
                    selectedCountry === country.name && !selectedCity
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white'
                  }`}
                >
                  {country.flag} {country.name} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Events by City */}
      <div className="container mx-auto px-4 pb-12">
        {/* Show city sub-headers when a country is selected */}
        {selectedCountry && !selectedCity && citiesByCountry[selectedCountry] && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4 text-center">
              {getCountryFlag(selectedCountry)} {selectedCountry} — Cities
            </h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {Object.entries(citiesByCountry[selectedCountry]).map(([cityName, cityEvents]) => (
                <button
                  key={cityName}
                  onClick={() => handleCityClick(cityName, selectedCountry)}
                  className="px-4 py-2 rounded-full bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-700/50 transition-all duration-300"
                >
                  {cityName} ({cityEvents.length})
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Selected City Header */}
        {selectedCity && (
          <div className="mb-8 text-center">
            <button
              onClick={() => { setSelectedCity(null); }}
              className="text-gray-400 hover:text-white text-sm mb-2"
            >
              ← Back to {selectedCountry}
            </button>
            <h3 className="text-2xl font-bold text-white">
              {selectedCity} {selectedCity && <span className="text-gray-400">({displayedEvents.length} events)</span>}
            </h3>
            {(displayedEvents.length >= 6) && (
              <Link
                href={`/international/${selectedCountry?.toLowerCase().replace(/\s+/g, '-')}?city=${encodeURIComponent(selectedCity)}`}
                className="text-purple-400 hover:text-purple-300 text-sm mt-2 inline-block"
              >
                View all in {selectedCity} →
              </Link>
            )}
          </div>
        )}

        {/* Event Cards Grid */}
        {displayedEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {displayedEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative bg-gray-800/50 backdrop-blur rounded-2xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 cursor-pointer"
                  onClick={() => handleEventClick(event)}
                >
                  {/* Image */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={event.cover_url || event.featured_image || '/images/event-placeholder.jpg'}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                    
                    {/* Country/City Badge */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      {event.country && (
                        <span className="px-2 py-1 bg-gray-900/70 backdrop-blur rounded-full text-xs text-white">
                          {getCountryFlag(event.country)} {event.city || event.country}
                        </span>
                      )}
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
                        <span>📍</span>
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
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No events found in this selection.</p>
          </div>
        )}

        {/* View All Link for Country */}
        {selectedCountry && !selectedCity && (
          <div className="text-center mt-8">
            <Link
              href={`/international/${countries.find(c => c.name === selectedCountry)?.code || ''}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-xl hover:shadow-lg transition-all"
            >
              View all {eventsByCountry[selectedCountry]?.length || 0} events in {selectedCountry} →
            </Link>
          </div>
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