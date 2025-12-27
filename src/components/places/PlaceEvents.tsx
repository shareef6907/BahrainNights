'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ChevronRight, PartyPopper } from 'lucide-react';

export interface PlaceEvent {
  id: string;
  title: string;
  slug: string;
  date: string;
  time: string;
  image: string;
  category: string;
  categoryColor: string;
}

interface PlaceEventsProps {
  events: PlaceEvent[];
  venueName: string;
  venueSlug: string;
}

export default function PlaceEvents({ events, venueName, venueSlug }: PlaceEventsProps) {
  if (events.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-yellow-400" />
          <h2 className="text-xl font-bold text-white">Upcoming Events</h2>
        </div>

        <div className="text-center py-8">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
            <PartyPopper className="w-8 h-8 text-gray-500" />
          </div>
          <p className="text-gray-400 mb-2">No upcoming events scheduled</p>
          <p className="text-gray-500 text-sm">Check back soon for new events at this venue</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-yellow-400" />
          <h2 className="text-xl font-bold text-white">Upcoming Events at {venueName}</h2>
        </div>

        {events.length > 3 && (
          <Link
            href={`/events?venue=${venueSlug}`}
            className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 text-sm font-medium transition-colors"
          >
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex-shrink-0 w-[280px]"
          >
            <Link
              href={`/events/${event.slug}`}
              className="block group"
            >
              {/* Image */}
              <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="280px"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Category Badge */}
                <div className={`absolute top-2 left-2 px-2 py-1 ${event.categoryColor} rounded-full`}>
                  <span className="text-xs font-bold text-white">{event.category}</span>
                </div>

                {/* Date Badge */}
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-lg">
                  <span className="text-xs font-medium text-white">{event.date}</span>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-white font-semibold group-hover:text-yellow-400 transition-colors line-clamp-1 mb-1">
                {event.title}
              </h3>
              <div className="flex items-center gap-1 text-gray-400 text-sm">
                <Clock className="w-3.5 h-3.5" />
                <span>{event.time}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
