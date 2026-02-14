'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight, MapPin, Calendar } from 'lucide-react';
import EventModal, { EventData } from '@/components/events/EventModal';
import { useTranslation } from '@/lib/i18n/TranslationContext';

// Animation variants
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

export interface InternationalEvent {
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
  dbName: string;
}

// Popular destinations for Bahrainis - regional GCC + UK
const COUNTRIES: Country[] = [
  { code: 'uae', name: 'UAE', flag: '🇦🇪', dbName: 'UAE' },
  { code: 'qatar', name: 'Qatar', flag: '🇶🇦', dbName: 'Qatar' },
  { code: 'saudi-arabia', name: 'Saudi Arabia', flag: '🇸🇦', dbName: 'Saudi Arabia' },
  { code: 'uk', name: 'UK', flag: '🇬🇧', dbName: 'UK' },
];

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

interface Props {
  events: InternationalEvent[];
}

export default function InternationalEventsSection({ events }: Props) {
  const { t } = useTranslation();
  const [selectedEvent, setSelectedEvent] = useState<InternationalEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const getCountryFlag = (countryName: string): string => {
    const country = COUNTRIES.find(c => c.name === countryName || c.dbName === countryName);
    return country?.flag || '🌍';
  };

  const getCountryCode = (countryName: string): string => {
    const country = COUNTRIES.find(c => c.name === countryName || c.dbName === countryName);
    return country?.code || '';
  };

  if (!events || events.length === 0) {
    return null;
  }

  // Get countries that have events
  const countriesWithEvents = COUNTRIES.filter(country =>
    events.some(event => event.country === country.name || event.country === country.dbName)
  );

  return (
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
            🌍 {t.international?.hero?.title || 'International Events'}
          </h2>
          <Link
            href="/international"
            className="text-yellow-500 hover:text-yellow-400 flex items-center space-x-2 transition-colors group"
          >
            <span className="font-medium">{t.home?.sections?.viewAll || 'View All'}</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {events.slice(0, 4).map((event) => (
            <motion.div
              key={event.id}
              onClick={() => handleEventClick(event)}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-purple-500/50 transition-all duration-300"
              variants={fadeIn}
              whileHover={cardHover}
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={event.featured_image || event.cover_url || '/images/event-placeholder.jpg'}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Country Badge */}
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/70 backdrop-blur text-white text-sm font-bold rounded-full flex items-center gap-1.5">
                  <span>{getCountryFlag(event.country)}</span>
                  <span>{event.city || event.country}</span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-bold rounded-full capitalize">
                  {event.category}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-300">
                    {event.venue_name && (
                      <div className="flex items-center space-x-1.5 truncate max-w-[140px]">
                        <MapPin className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                        <span className="truncate">{event.venue_name}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-400" />
                      <span>{getDisplayDate(event)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Country Quick Links - Only show countries with events */}
        {countriesWithEvents.length > 0 && (
          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            {countriesWithEvents.map((country) => (
              <Link
                key={country.code}
                href={`/international/${country.code}`}
                className="px-4 py-2 bg-white/5 backdrop-blur border border-white/10 rounded-full hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300 flex items-center gap-2 text-sm font-medium"
              >
                <span>{country.flag}</span>
                <span>{country.name}</span>
              </Link>
            ))}
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
    </section>
  );
}
