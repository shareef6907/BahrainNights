'use client';

import { motion } from 'framer-motion';
import { CalendarEvent } from './CalendarDay';
import { EventCategory, categoryConfigs } from './CalendarFilters';
import Link from 'next/link';

interface CalendarWeekViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  activeCategories: EventCategory[];
  onDayClick: (date: Date, events: CalendarEvent[]) => void;
}

export default function CalendarWeekView({
  currentDate,
  events,
  activeCategories,
  onDayClick,
}: CalendarWeekViewProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get start of week (Sunday)
  const startOfWeek = new Date(currentDate);
  const day = startOfWeek.getDay();
  startOfWeek.setDate(startOfWeek.getDate() - day);

  // Generate week days
  const weekDays: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(date.getDate() + i);
    weekDays.push(date);
  }

  // Filter events based on active categories
  const filteredEvents = events.filter((event) =>
    activeCategories.includes(event.category)
  );

  // Get events for a specific date
  const getEventsForDate = (date: Date): CalendarEvent[] => {
    const dateStr = date.toISOString().split('T')[0];
    return filteredEvents.filter((event) => event.date === dateStr);
  };

  const isToday = (date: Date): boolean => {
    return date.toDateString() === today.toDateString();
  };

  const isPast = (date: Date): boolean => {
    return date < today;
  };

  const getCategoryColor = (category: EventCategory): string => {
    const config = categoryConfigs.find((c) => c.id === category);
    return config?.color || '#6B7280';
  };

  const getCategoryBgColor = (category: EventCategory): string => {
    const config = categoryConfigs.find((c) => c.id === category);
    return config?.bgColor || 'bg-gray-500/20';
  };

  return (
    <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-7 gap-2 md:gap-3 min-w-[700px] md:min-w-0"
      >
        {weekDays.map((date, index) => {
          const dayEvents = getEventsForDate(date);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
          const dayNumber = date.getDate();
          const monthName = date.toLocaleDateString('en-US', { month: 'short' });
          const isWeekend = index === 5 || index === 6;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white/5 backdrop-blur-sm border rounded-xl overflow-hidden min-h-[300px] flex flex-col ${
                isToday(date)
                  ? 'border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.2)]'
                  : 'border-white/10'
              } ${isPast(date) ? 'opacity-60' : ''}`}
            >
              {/* Day Header */}
              <button
                onClick={() => onDayClick(date, dayEvents)}
                className={`p-3 text-center border-b border-white/10 hover:bg-white/5 transition-colors ${
                  isToday(date) ? 'bg-yellow-500/10' : ''
                }`}
              >
                <div
                  className={`text-xs font-medium ${
                    isWeekend ? 'text-yellow-400' : 'text-gray-400'
                  }`}
                >
                  {dayName}
                </div>
                <div
                  className={`text-lg font-bold ${
                    isToday(date) ? 'text-yellow-400' : 'text-white'
                  }`}
                >
                  {dayNumber}
                </div>
                <div className="text-xs text-gray-500">{monthName}</div>
              </button>

              {/* Events List */}
              <div className="flex-1 p-2 space-y-2 overflow-y-auto">
                {dayEvents.length === 0 ? (
                  <div className="text-xs text-gray-500 text-center py-4">
                    No events
                  </div>
                ) : (
                  dayEvents.map((event) => (
                    <Link
                      key={event.id}
                      href={`/events/${event.slug}`}
                      className={`block p-2 rounded-lg ${getCategoryBgColor(
                        event.category
                      )} hover:opacity-80 transition-opacity`}
                    >
                      <div
                        className="text-xs font-medium mb-1"
                        style={{ color: getCategoryColor(event.category) }}
                      >
                        {event.time}
                      </div>
                      <div className="text-sm text-white font-medium line-clamp-2">
                        {event.title}
                      </div>
                      <div className="text-xs text-gray-400 mt-1 truncate">
                        {event.venue}
                      </div>
                    </Link>
                  ))
                )}
              </div>

              {/* Event Count Badge */}
              {dayEvents.length > 0 && (
                <div className="px-2 pb-2">
                  <div className="text-xs text-gray-500 text-center">
                    {dayEvents.length} event{dayEvents.length !== 1 ? 's' : ''}
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
