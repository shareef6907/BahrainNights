'use client';

import { motion } from 'framer-motion';
import { categoryConfigs, EventCategory } from './CalendarFilters';

export interface CalendarEvent {
  id: string;
  title: string;
  slug: string;
  date: string; // YYYY-MM-DD
  time: string;
  venue: string;
  area: string;
  category: EventCategory;
  price?: string;
  image?: string;
  isFeatured?: boolean;
}

interface CalendarDayProps {
  date: Date;
  events: CalendarEvent[];
  isToday: boolean;
  isCurrentMonth: boolean;
  isPast: boolean;
  onClick: () => void;
}

export default function CalendarDay({
  date,
  events,
  isToday,
  isCurrentMonth,
  isPast,
  onClick,
}: CalendarDayProps) {
  const dayNumber = date.getDate();
  const maxVisibleEvents = 3;
  const visibleEvents = events.slice(0, maxVisibleEvents);
  const moreCount = events.length - maxVisibleEvents;

  const getCategoryColor = (category: EventCategory): string => {
    const config = categoryConfigs.find((c) => c.id === category);
    return config?.color || '#6B7280';
  };

  return (
    <motion.button
      onClick={onClick}
      className={`relative min-h-[100px] md:min-h-[120px] p-2 text-left border border-white/5 transition-all ${
        isToday
          ? 'bg-yellow-500/10 border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.2)]'
          : isCurrentMonth
          ? 'bg-white/[0.02] hover:bg-white/5'
          : 'bg-transparent'
      } ${isPast && !isToday ? 'opacity-50' : ''}`}
      whileHover={{ backgroundColor: isToday ? undefined : 'rgba(255,255,255,0.05)' }}
      whileTap={{ scale: 0.98 }}
      aria-label={`${date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}. ${events.length} events.`}
    >
      {/* Date Number */}
      <div
        className={`text-sm md:text-base font-semibold mb-2 ${
          isToday
            ? 'text-yellow-400'
            : isCurrentMonth
            ? 'text-white'
            : 'text-gray-600'
        }`}
      >
        {dayNumber}
      </div>

      {/* Event Indicators */}
      <div className="space-y-1">
        {visibleEvents.map((event) => (
          <div
            key={event.id}
            className="flex items-center gap-1.5 overflow-hidden"
          >
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: getCategoryColor(event.category) }}
            />
            <span className="text-xs text-gray-300 truncate hidden md:block">
              {event.title}
            </span>
          </div>
        ))}

        {/* Mobile: Just show dots */}
        <div className="md:hidden flex items-center gap-1 flex-wrap">
          {events.slice(0, 5).map((event) => (
            <div
              key={event.id}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: getCategoryColor(event.category) }}
            />
          ))}
        </div>

        {/* More indicator */}
        {moreCount > 0 && (
          <div className="text-xs text-gray-500 hidden md:block">
            +{moreCount} more
          </div>
        )}
        {events.length > 5 && (
          <div className="text-xs text-gray-500 md:hidden">
            +{events.length - 5}
          </div>
        )}
      </div>

      {/* Today indicator glow */}
      {isToday && (
        <div className="absolute inset-0 border-2 border-yellow-500/50 rounded pointer-events-none" />
      )}
    </motion.button>
  );
}
