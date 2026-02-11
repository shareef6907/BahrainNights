'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Clock, MapPin, ChevronRight, Zap } from 'lucide-react';

export interface HappeningNowEvent {
  id: string;
  title: string;
  slug: string;
  venue_name: string;
  cover_url: string | null;
  category: string;
  date: string;
  time: string | null;
  end_time?: string | null;
}

interface HappeningNowProps {
  events: HappeningNowEvent[];
  onEventClick?: (event: HappeningNowEvent) => void;
}

function getTimeUntil(eventDate: string, eventTime: string | null): { label: string; urgency: 'live' | 'soon' | 'later' } {
  const now = new Date();
  const eventDateTime = new Date(`${eventDate}T${eventTime || '20:00'}:00`);
  const diffMs = eventDateTime.getTime() - now.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);

  if (diffMs < 0 && diffMs > -6 * 60 * 60 * 1000) {
    // Event started within last 6 hours - assume still live
    return { label: 'LIVE NOW', urgency: 'live' };
  }
  if (diffHours <= 0) {
    return { label: 'Starting Soon', urgency: 'soon' };
  }
  if (diffHours < 1) {
    const mins = Math.round(diffMs / (1000 * 60));
    return { label: `In ${mins} min`, urgency: 'soon' };
  }
  if (diffHours < 3) {
    const hours = Math.floor(diffHours);
    const mins = Math.round((diffHours - hours) * 60);
    return { label: `In ${hours}h ${mins}m`, urgency: 'soon' };
  }
  if (diffHours < 6) {
    return { label: `In ${Math.round(diffHours)}h`, urgency: 'later' };
  }
  return { label: 'Today', urgency: 'later' };
}

export default function HappeningNow({ events, onEventClick }: HappeningNowProps) {
  const [timeLabels, setTimeLabels] = useState<Record<string, { label: string; urgency: string }>>({});

  // Update time labels every minute
  useEffect(() => {
    const updateLabels = () => {
      const labels: Record<string, { label: string; urgency: string }> = {};
      events.forEach(event => {
        labels[event.id] = getTimeUntil(event.date, event.time);
      });
      setTimeLabels(labels);
    };

    updateLabels();
    const interval = setInterval(updateLabels, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [events]);

  // Filter to only show events happening within next 6 hours or currently live
  const relevantEvents = events.filter(event => {
    const label = timeLabels[event.id];
    return label && (label.urgency === 'live' || label.urgency === 'soon' || label.urgency === 'later');
  }).slice(0, 6);

  if (relevantEvents.length === 0) {
    return null;
  }

  const liveCount = relevantEvents.filter(e => timeLabels[e.id]?.urgency === 'live').length;

  return (
    <section className="px-4 mb-12 md:mb-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <Zap className="w-8 h-8 text-yellow-500" />
              {liveCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
              )}
            </div>
            <div>
              <h2 className="text-3xl md:text-5xl font-bold">Happening Now</h2>
              <p className="text-gray-400 text-sm mt-1">
                {liveCount > 0 ? (
                  <span className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    {liveCount} event{liveCount > 1 ? 's' : ''} live right now
                  </span>
                ) : (
                  'Events starting soon'
                )}
              </p>
            </div>
          </div>
          <Link
            href="/events?filter=today"
            className="text-yellow-500 hover:text-yellow-400 flex items-center gap-2 transition-colors group"
          >
            <span className="hidden md:inline font-medium">View All Today</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {relevantEvents.map((event, index) => {
            const timeInfo = timeLabels[event.id] || { label: 'Today', urgency: 'later' };
            const isLive = timeInfo.urgency === 'live';
            const isSoon = timeInfo.urgency === 'soon';

            const cardClassName = `group flex gap-4 p-4 rounded-2xl border transition-all duration-300 hover:scale-[1.02] cursor-pointer text-left w-full ${
              isLive
                ? 'bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-500/50'
                : isSoon
                ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30'
                : 'bg-white/5 border-white/10 hover:border-white/30'
            }`;

            const cardContent = (
              <>
                {/* Thumbnail */}
                <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                  <img
                    src={event.cover_url || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=200&h=200&fit=crop'}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {isLive && (
                    <div className="absolute inset-0 bg-red-500/30 flex items-center justify-center">
                      <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                        LIVE
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Time Badge */}
                  <div
                    className={`inline-flex items-center gap-1.5 text-xs font-bold px-2 py-1 rounded-full mb-2 ${
                      isLive
                        ? 'bg-red-500 text-white'
                        : isSoon
                        ? 'bg-yellow-500 text-black'
                        : 'bg-white/10 text-gray-300'
                    }`}
                  >
                    <Clock className="w-3 h-3" />
                    {timeInfo.label}
                  </div>

                  <h3 className="font-bold text-lg line-clamp-1 group-hover:text-yellow-500 transition-colors">
                    {event.title}
                  </h3>

                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="truncate max-w-[120px]">{event.venue_name || 'TBA'}</span>
                    </span>
                    {event.time && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {event.time}
                      </span>
                    )}
                  </div>
                </div>

                {/* Arrow indicator */}
                <div className="hidden md:flex items-center">
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all" />
                </div>
              </>
            );

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {onEventClick ? (
                  <button
                    type="button"
                    onClick={() => onEventClick(event)}
                    className={cardClassName}
                  >
                    {cardContent}
                  </button>
                ) : (
                  <Link
                    href={`/events/${event.slug}`}
                    className={cardClassName}
                  >
                    {cardContent}
                  </Link>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Live Pulse Effect for whole section when there are live events */}
        {liveCount > 0 && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -inset-4 bg-red-500/5 rounded-3xl animate-pulse" />
          </div>
        )}
      </div>
    </section>
  );
}
