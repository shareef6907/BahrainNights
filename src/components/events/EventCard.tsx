'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  category: string;
  categoryColor: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  price: string;
  isFree: boolean;
  isFeatured?: boolean;
}

interface EventCardProps {
  event: Event;
  view?: 'grid' | 'list';
  index?: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
      ease: 'easeOut' as const
    }
  })
};

export default function EventCard({ event, view = 'grid', index = 0 }: EventCardProps) {
  if (view === 'list') {
    return (
      <motion.div
        custom={index}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ x: 4 }}
        className="group"
      >
        <Link href={`/events/${event.slug}`} className="block">
          <div className="flex gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-yellow-400/50 transition-all duration-300">
            {/* Image */}
            <div className="relative w-48 h-32 flex-shrink-0 overflow-hidden">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                sizes="192px"
              />
              <div className={`absolute top-2 left-2 px-2 py-1 ${event.categoryColor} text-white text-xs font-bold rounded-full`}>
                {event.category}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 py-3 pr-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-1">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-400 line-clamp-1 mt-1">{event.description}</p>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <span className={`text-sm font-bold ${event.isFree ? 'text-green-400' : 'text-yellow-400'}`}>
                    {event.price}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-yellow-400" />
                  <span className="line-clamp-1">{event.venue}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-yellow-400" />
                  <span>{event.date}</span>
                </div>
                {/* Only show time if it's actually set (not TBA/TBD/Time TBA) */}
                {event.time && !['TBA', 'TBD', 'Time TBA', 'time tba'].includes(event.time) && !event.time.toLowerCase().includes('tba') && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-yellow-400" />
                    <span>{event.time}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Grid view
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -6 }}
      className="group"
    >
      <Link href={`/events/${event.slug}`} className="block">
        <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-yellow-400/50 transition-all duration-300">
          {/* Image Container */}
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Category Badge */}
            <div className={`absolute top-3 left-3 px-3 py-1 ${event.categoryColor} text-white text-xs font-bold rounded-full shadow-lg`}>
              {event.category}
            </div>

            {/* Date Badge */}
            <div className="absolute top-3 right-3 px-3 py-1 bg-black/70 backdrop-blur-sm text-white text-xs font-medium rounded-full">
              {event.date}
            </div>

            {/* View Details Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="px-6 py-2 bg-yellow-400 text-black font-bold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                View Details
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-2 mb-2">
              {event.title}
            </h3>

            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span className="line-clamp-1">{event.venue}</span>
              </div>
              <div className="flex items-center justify-between">
                {/* Only show time if it's actually set (not TBA/TBD/Time TBA) */}
                {event.time && !['TBA', 'TBD', 'Time TBA', 'time tba'].includes(event.time) && !event.time.toLowerCase().includes('tba') ? (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                    <span>{event.time}</span>
                  </div>
                ) : (
                  <div /> /* Empty div to maintain spacing */
                )}
                <span className={`font-bold ${event.isFree ? 'text-green-400' : 'text-yellow-400'}`}>
                  {event.price}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
