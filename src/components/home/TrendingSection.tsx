'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, MapPin, Calendar, Star, ArrowRight, Flame, Eye, Users, Award } from 'lucide-react';

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

// Format view count with K/M suffix
function formatViewCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}

// Get popularity badge based on view count
function getPopularityBadge(viewCount: number, index: number): { label: string; color: string } | null {
  if (index === 0) {
    return { label: '🔥 Most Popular', color: 'from-orange-500 to-red-500' };
  }
  if (viewCount > 500) {
    return { label: '⭐ Popular', color: 'from-yellow-500 to-amber-500' };
  }
  if (viewCount > 200) {
    return { label: '📈 Trending', color: 'from-blue-500 to-cyan-500' };
  }
  return null;
}

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

  // Calculate total views for social proof
  const totalVenueViews = venues.reduce((sum, v) => sum + (v.view_count || 0), 0);
  const totalEventViews = events.reduce((sum, e) => sum + (e.view_count || 0), 0);

  return (
    <section className="py-12 md:py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <motion.div 
            className="relative w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <TrendingUp className="w-7 h-7 text-white" />
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-red-500 animate-ping opacity-20" />
          </motion.div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
              Trending This Week
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
              >
                <Flame className="w-6 h-6 text-orange-400" />
              </motion.div>
            </h2>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4 text-yellow-500" />
                {formatViewCount(totalVenueViews + totalEventViews)} views this week
              </span>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-800/50 rounded-full p-1 border border-white/5">
          <button
            onClick={() => setActiveTab('venues')}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === 'venues'
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              Top 5 Venues
            </span>
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              activeTab === 'events'
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Top 3 Events
            </span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {/* Venues Grid */}
          {activeTab === 'venues' && (
            <motion.div
              key="venues"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
            >
              {venues.slice(0, 5).map((venue, index) => {
                const badge = getPopularityBadge(venue.view_count || 0, index);
                
                return (
                  <motion.div
                    key={venue.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={`/places/${venue.slug}`}
                      className="group relative bg-slate-800/50 rounded-2xl overflow-hidden hover:ring-2 hover:ring-orange-500/50 transition-all block"
                    >
                      {/* Rank Badge */}
                      <motion.div 
                        className="absolute top-3 left-3 z-10 w-9 h-9 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-sm shadow-lg"
                        whileHover={{ scale: 1.1 }}
                      >
                        {index + 1}
                      </motion.div>

                      {/* Popularity Badge */}
                      {badge && (
                        <div className={`absolute top-3 right-3 z-10 px-2 py-1 rounded-full bg-gradient-to-r ${badge.color} text-white text-[10px] font-bold shadow-lg`}>
                          {badge.label}
                        </div>
                      )}

                      {/* Image */}
                      <div className="aspect-square relative">
                        {venue.image_url ? (
                          <Image
                            src={venue.image_url}
                            alt={venue.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
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
                        <div className="flex items-center justify-between mt-1">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <span className="text-gray-400 text-xs">{venue.area}</span>
                            {venue.rating > 0 && (
                              <>
                                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 ml-1" />
                                <span className="text-gray-400 text-xs">{venue.rating.toFixed(1)}</span>
                              </>
                            )}
                          </div>
                          {/* View count */}
                          {venue.view_count > 0 && (
                            <div className="flex items-center gap-1 text-gray-500 text-xs">
                              <Eye className="w-3 h-3" />
                              {formatViewCount(venue.view_count)}
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* Events Grid */}
          {activeTab === 'events' && (
            <motion.div
              key="events"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {events.slice(0, 3).map((event, index) => {
                const badge = getPopularityBadge(event.view_count || 0, index);
                
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 }}
                  >
                    <Link
                      href={`/events/${event.slug}`}
                      className="group relative bg-slate-800/50 rounded-2xl overflow-hidden hover:ring-2 hover:ring-orange-500/50 transition-all block"
                    >
                      {/* Rank Badge */}
                      <motion.div 
                        className="absolute top-4 left-4 z-10 w-11 h-11 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold shadow-lg"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        #{index + 1}
                      </motion.div>

                      {/* Popularity Badge */}
                      {badge && (
                        <motion.div 
                          className={`absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full bg-gradient-to-r ${badge.color} text-white text-xs font-bold shadow-lg`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 + index * 0.1, type: 'spring' }}
                        >
                          {badge.label}
                        </motion.div>
                      )}

                      {/* Image */}
                      <div className="aspect-video relative">
                        {event.cover_url ? (
                          <Image
                            src={event.cover_url}
                            alt={event.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
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
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-orange-400" />
                            <span className="text-orange-400 text-sm font-medium">
                              {formatDate(event.date)}
                            </span>
                          </div>
                          {/* View count */}
                          {event.view_count > 0 && (
                            <div className="flex items-center gap-1 px-2 py-1 bg-black/40 rounded-full text-gray-300 text-xs">
                              <Eye className="w-3 h-3" />
                              {formatViewCount(event.view_count)} views
                            </div>
                          )}
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
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
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
