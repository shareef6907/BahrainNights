'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  MapPin, 
  ChevronDown, 
  ChevronRight, 
  Ticket,
  Sparkles,
  Music,
  Utensils,
  Users,
  Dumbbell,
  Palette,
  Star
} from 'lucide-react';

export interface TonightEvent {
  id: string;
  title: string;
  slug: string;
  venue_name: string | null;
  time: string | null;
  cover_url: string | null;
  category: string;
  affiliate_url?: string | null;
}

interface TonightQuickViewProps {
  events: TonightEvent[];
  onEventClick?: (event: TonightEvent) => void;
}

const categoryConfig: Record<string, { icon: React.ReactNode; label: string; color: string }> = {
  music: { icon: <Music className="w-4 h-4" />, label: 'Live Music', color: 'from-purple-500 to-pink-500' },
  sports: { icon: <Dumbbell className="w-4 h-4" />, label: 'Sports', color: 'from-green-500 to-emerald-500' },
  arts: { icon: <Palette className="w-4 h-4" />, label: 'Arts & Culture', color: 'from-orange-500 to-red-500' },
  dining: { icon: <Utensils className="w-4 h-4" />, label: 'Dining', color: 'from-amber-500 to-yellow-500' },
  community: { icon: <Users className="w-4 h-4" />, label: 'Community', color: 'from-blue-500 to-cyan-500' },
  nightlife: { icon: <Sparkles className="w-4 h-4" />, label: 'Nightlife', color: 'from-violet-500 to-purple-500' },
  family: { icon: <Users className="w-4 h-4" />, label: 'Family', color: 'from-teal-500 to-green-500' },
  special: { icon: <Star className="w-4 h-4" />, label: 'Special Event', color: 'from-yellow-500 to-orange-500' },
};

export default function TonightQuickView({ events, onEventClick }: TonightQuickViewProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Get unique categories from events
  const availableCategories = useMemo(() => {
    const cats = new Set(events.map(e => e.category));
    return Array.from(cats).filter(c => categoryConfig[c]);
  }, [events]);

  // Filter events based on active filter
  const filteredEvents = useMemo(() => {
    if (activeFilter === 'all') return events;
    return events.filter(e => e.category === activeFilter);
  }, [events, activeFilter]);

  if (events.length === 0) return null;

  return (
    <section className="px-4 mb-12 md:mb-20">
      <div className="max-w-7xl mx-auto">
        {/* Header - Always visible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500/20 via-orange-500/10 to-red-500/20 blur-2xl rounded-3xl opacity-50" />
          
          <div 
            className="relative bg-gradient-to-r from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-yellow-500/30 rounded-2xl p-6 cursor-pointer hover:border-yellow-500/50 transition-all duration-300"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Pulsing live indicator */}
                <div className="relative">
                  <div className="absolute inset-0 bg-yellow-500 rounded-full animate-ping opacity-30" />
                  <div className="relative w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-black" />
                  </div>
                </div>
                
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
                    What&apos;s On Tonight
                    <span className="px-2 py-1 text-xs font-bold bg-yellow-500 text-black rounded-full animate-pulse">
                      LIVE
                    </span>
                  </h2>
                  <p className="text-gray-400 text-sm">
                    {events.length} event{events.length !== 1 ? 's' : ''} happening today in Bahrain
                  </p>
                </div>
              </div>

              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
              >
                <ChevronDown className="w-5 h-5 text-white" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Expandable Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-6">
                {/* Category Filters */}
                {availableCategories.length > 1 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-wrap gap-2 mb-6"
                  >
                    <button
                      onClick={() => setActiveFilter('all')}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        activeFilter === 'all'
                          ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black shadow-lg shadow-yellow-500/30'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                      }`}
                    >
                      All Events
                    </button>
                    {availableCategories.map(cat => {
                      const config = categoryConfig[cat];
                      return (
                        <button
                          key={cat}
                          onClick={() => setActiveFilter(cat)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                            activeFilter === cat
                              ? `bg-gradient-to-r ${config.color} text-white shadow-lg`
                              : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                          }`}
                        >
                          {config.icon}
                          {config.label}
                        </button>
                      );
                    })}
                  </motion.div>
                )}

                {/* Events Grid */}
                <motion.div 
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredEvents.slice(0, 6).map((event, index) => {
                      const config = categoryConfig[event.category] || { 
                        icon: <Star className="w-4 h-4" />, 
                        label: 'Event', 
                        color: 'from-gray-500 to-slate-500' 
                      };
                      
                      return (
                        <motion.div
                          key={event.id}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => onEventClick?.(event)}
                          className="group relative bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-500/10 transition-all duration-300"
                        >
                          <div className="flex gap-4 p-4">
                            {/* Image */}
                            <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                              {event.cover_url ? (
                                <Image
                                  src={event.cover_url}
                                  alt={event.title}
                                  fill
                                  sizes="80px"
                                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                              ) : (
                                <div className={`w-full h-full bg-gradient-to-br ${config.color} flex items-center justify-center`}>
                                  {config.icon}
                                </div>
                              )}
                              
                              {/* Category Badge */}
                              <div className={`absolute bottom-1 left-1 right-1 px-1.5 py-0.5 bg-gradient-to-r ${config.color} rounded text-[10px] font-bold text-white text-center truncate`}>
                                {config.label}
                              </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-white line-clamp-2 group-hover:text-yellow-400 transition-colors">
                                {event.title}
                              </h3>
                              
                              <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                                <MapPin className="w-3 h-3 text-yellow-500 flex-shrink-0" />
                                <span className="truncate">{event.venue_name || 'TBA'}</span>
                              </div>
                              
                              <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                                <Clock className="w-3 h-3 text-yellow-500 flex-shrink-0" />
                                <span>{event.time || 'Check listing'}</span>
                              </div>
                            </div>

                            {/* Arrow */}
                            <div className="flex items-center">
                              <motion.div
                                whileHover={{ x: 3 }}
                                className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center group-hover:bg-yellow-500 transition-colors"
                              >
                                <ChevronRight className="w-4 h-4 text-yellow-500 group-hover:text-black transition-colors" />
                              </motion.div>
                            </div>
                          </div>

                          {/* Book Now Overlay on Hover */}
                          {event.affiliate_url && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              whileHover={{ opacity: 1, y: 0 }}
                              className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-yellow-500 to-yellow-500/80"
                            >
                              <Link 
                                href={event.affiliate_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center justify-center gap-2 text-black font-bold text-sm"
                              >
                                <Ticket className="w-4 h-4" />
                                Book Now
                              </Link>
                            </motion.div>
                          )}
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </motion.div>

                {/* View All Link */}
                {filteredEvents.length > 6 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6 text-center"
                  >
                    <Link
                      href="/events?filter=today"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold rounded-full hover:shadow-lg hover:shadow-yellow-500/30 hover:scale-105 transition-all duration-300"
                    >
                      View All {filteredEvents.length} Events
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
