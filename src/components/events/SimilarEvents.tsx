'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import EventCard, { Event } from './EventCard';

interface SimilarEventsProps {
  title: string;
  events: Event[];
}

function SimilarEvents({ title, events }: SimilarEventsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320; // Card width + gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (events.length === 0) return null;

  return (
    <motion.section
      className="py-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>

        {/* Navigation Arrows - Desktop only */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 hover:border-yellow-400/50 transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 hover:border-yellow-400/50 transition-all"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Scrollable Events */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {events.map((event, index) => (
          <div
            key={event.id}
            className="flex-shrink-0 w-[280px] md:w-[300px] snap-start"
          >
            <EventCard event={event} index={index} />
          </div>
        ))}
      </div>
    </motion.section>
  );
}

export default React.memo(SimilarEvents);
