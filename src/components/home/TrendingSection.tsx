'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TrendingUp, MapPin, Calendar, Star, Clock, Users, ArrowRight, Flame } from 'lucide-react';

interface TrendingVenue {
  id: string;
  name: string;
  slug: string;
  category: string;
  area: string;
  rating: number;
  image_url: string | null;
  view_count: number;
}

interface TrendingEvent {
  id: string;
  title: string;
  slug: string;
  venue_name: string;
  date: string;
  cover_url: string | null;
  view_count: number;
}

interface TrendingSectionProps {
  venues: TrendingVenue[];
  events: TrendingEvent[];
}

const categoryLabels: Record<string, string> = {
  restaurant: '🍽️ Restaurant',
  cafe: '☕ Café',
  nightclub: '🌙 Nightclub',
  lounge: '🍸 Lounge',
  'beach-club': '🏖️ Beach Club',
  bar: '🍺 Bar',
  hotel: '🏨 Hotel',
  spa: '💆 Spa',
};

export default function TrendingSection({ venues, events }: TrendingSectionProps) {
  const [activeTab, setActiveTab] = useState<'venues' | 'events'>('venues');

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <section className="py-12 md:py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
              Trending This Week
              <Flame className="w-6 h-6 text-orange-400 animate-pulse" />
            </h2>
            <p className="text-gray-400 text-sm">What everyone's checking out in Bahrain</p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-800/50 rounded-full p-1">
          <button
            onClick={() => setActiveTab('venues')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === 'venues'
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Top 5 Venues
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === 'events'
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Top 3 Events
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        {/* Venues Grid */}
        {activeTab === 'venues' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
          >
            {venues.slice(0, 5).map((venue, index) => (
              <Link
                key={venue.id}
                href={`/places/${venue.slug}`}
                className="group relative bg-slate-800/50 rounded-2xl overflow-hidden hover:ring-2 hover:ring-orange-500/50 transition-all"
              >
                {/* Rank Badge */}
                <div className="absolute top-3 left-3 z-10 w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {index + 1}
                </div>

                {/* Image */}
                <div className="aspect-square relative">
                  {venue.image_url ? (
                    <img
                      src={venue.image_url}
                      alt={venue.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                      <span className="text-4xl">
                        {categoryLabels[venue.category]?.split(' ')[0] || '📍'}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-xs text-orange-400 font-medium">
                    {categoryLabels[venue.category] || venue.category}
                  </span>
                  <h3 className="text-white font-semibold text-lg line-clamp-1 group-hover:text-orange-400 transition">
                    {venue.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    <span className="text-gray-400 text-xs">{venue.area}</span>
                    {venue.rating > 0 && (
                      <>
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 ml-2" />
                        <span className="text-gray-400 text-xs">{venue.rating.toFixed(1)}</span>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        )}

        {/* Events Grid */}
        {activeTab === 'events' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {events.slice(0, 3).map((event, index) => (
              <Link
                key={event.id}
                href={`/events/${event.slug}`}
                className="group relative bg-slate-800/50 rounded-2xl overflow-hidden hover:ring-2 hover:ring-orange-500/50 transition-all"
              >
                {/* Rank Badge */}
                <div className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold shadow-lg">
                  #{index + 1}
                </div>

                {/* Image */}
                <div className="aspect-video relative">
                  {event.cover_url ? (
                    <img
                      src={event.cover_url}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-orange-900/50 to-red-900/50 flex items-center justify-center">
                      <Calendar className="w-12 h-12 text-orange-400/50" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                </div>

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-orange-400" />
                    <span className="text-orange-400 text-sm font-medium">
                      {formatDate(event.date)}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-xl line-clamp-2 group-hover:text-orange-400 transition mb-2">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400 text-sm">{event.venue_name}</span>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </div>

      {/* View All Link */}
      <div className="mt-8 text-center">
        <Link
          href={activeTab === 'venues' ? '/places' : '/events'}
          className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-medium transition"
        >
          View All {activeTab === 'venues' ? 'Places' : 'Events'}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
