'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, Calendar, Star, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  category: string;
  venue: string;
  date: string;
  time: string;
  price: string;
  isFree: boolean;
  isFeatured: boolean;
}

interface CategoryPageClientProps {
  category: string;
  categoryInfo: {
    label: string;
    icon: string;
    description: string;
  };
  events: Event[];
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.05 } }
};

// Format date for display
function formatDate(dateStr: string): string {
  if (!dateStr) return 'TBD';
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch {
    return 'TBD';
  }
}

export default function CategoryPageClient({ category, categoryInfo, events }: CategoryPageClientProps) {
  // Count featured events
  const featuredCount = events.filter(e => e.isFeatured).length;

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-pink-500/5 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back Button */}
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to All Events
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="text-6xl mb-4">{categoryInfo.icon}</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {categoryInfo.label}
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              {categoryInfo.description}
            </p>
            <div className="mt-4 flex items-center justify-center gap-4 text-sm">
              <span className="text-gray-400">{events.length} events</span>
              {featuredCount > 0 && (
                <span className="flex items-center gap-1 text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  {featuredCount} featured
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {events.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                data-testid="event-card"
                data-featured={event.isFeatured}
                variants={fadeIn}
                whileHover={{ y: -6 }}
                className="group"
              >
                <Link href={`/events/${event.slug}`} className="block">
                  <div className={`relative bg-white/5 backdrop-blur-sm border ${event.isFeatured ? 'border-yellow-400/50 ring-1 ring-yellow-400/20' : 'border-white/10'} rounded-2xl overflow-hidden hover:border-yellow-400/50 transition-all duration-300`}>
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Featured Badge */}
                      {event.isFeatured && (
                        <div className="absolute top-3 right-3 px-3 py-1 bg-yellow-400 text-black text-xs font-bold rounded-full flex items-center gap-1 shadow-lg z-10">
                          <Star className="w-3 h-3 fill-current" />
                          Featured
                        </div>
                      )}

                      {/* Date Badge */}
                      <div className={`absolute ${event.isFeatured ? 'top-10' : 'top-3'} right-3 px-3 py-1 bg-black/70 text-white text-xs rounded-full`}>
                        {formatDate(event.date)}
                      </div>

                      {/* Featured indicator overlay */}
                      {event.isFeatured && index < featuredCount && (
                        <div className="absolute top-3 left-3 px-2 py-1 bg-gradient-to-r from-yellow-400/80 to-orange-500/80 text-black text-xs font-bold rounded-full">
                          #{index + 1}
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
                        {event.time && !event.time.toLowerCase().includes('tba') && (
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-yellow-400" />
                            <span>{event.time}</span>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-yellow-400" />
                            <span>{formatDate(event.date)}</span>
                          </div>
                          <span className={`font-bold ${event.isFree ? 'text-green-400' : 'text-yellow-400'}`}>
                            {event.isFree ? 'Free' : event.price}
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
          <div className="text-center py-16">
            <div className="text-6xl mb-4">{categoryInfo.icon}</div>
            <h3 className="text-2xl font-bold text-white mb-2">No events found</h3>
            <p className="text-gray-400 mb-6">
              Check back soon for upcoming {categoryInfo.label.toLowerCase()} events!
            </p>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              Browse All Events
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
