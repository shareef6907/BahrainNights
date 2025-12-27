'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CalendarEvent } from './CalendarDay';
import { EventCategory, categoryConfigs } from './CalendarFilters';
import { MapPin, Clock, ChevronRight } from 'lucide-react';

interface CalendarListViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  activeCategories: EventCategory[];
}

interface GroupedEvents {
  date: Date;
  dateStr: string;
  events: CalendarEvent[];
}

export default function CalendarListView({
  currentDate,
  events,
  activeCategories,
}: CalendarListViewProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Filter events based on active categories
  const filteredEvents = events.filter((event) =>
    activeCategories.includes(event.category)
  );

  // Get events for current month
  const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  const monthEvents = filteredEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate >= monthStart && eventDate <= monthEnd;
  });

  // Sort events by date
  const sortedEvents = [...monthEvents].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Group events by date
  const groupedEvents: GroupedEvents[] = [];
  sortedEvents.forEach((event) => {
    const existing = groupedEvents.find((g) => g.dateStr === event.date);
    if (existing) {
      existing.events.push(event);
    } else {
      groupedEvents.push({
        date: new Date(event.date),
        dateStr: event.date,
        events: [event],
      });
    }
  });

  const getCategoryColor = (category: EventCategory): string => {
    const config = categoryConfigs.find((c) => c.id === category);
    return config?.color || '#6B7280';
  };

  const getCategoryLabel = (category: EventCategory): string => {
    const config = categoryConfigs.find((c) => c.id === category);
    return config?.label || category;
  };

  const isToday = (date: Date): boolean => {
    return date.toDateString() === today.toDateString();
  };

  const isPast = (date: Date): boolean => {
    return date < today;
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (groupedEvents.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16"
      >
        <div className="text-gray-400 text-lg">No events found for this month</div>
        <p className="text-gray-500 mt-2">Try selecting different categories or change the month</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {groupedEvents.map((group, groupIndex) => (
        <motion.div
          key={group.dateStr}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: groupIndex * 0.05 }}
        >
          {/* Date Header */}
          <div
            className={`sticky top-0 z-10 py-3 px-4 rounded-t-xl ${
              isToday(group.date)
                ? 'bg-yellow-500/20 border border-yellow-500/30'
                : 'bg-slate-800/90 border border-white/10'
            } backdrop-blur-sm`}
          >
            <h3
              className={`font-bold ${
                isToday(group.date) ? 'text-yellow-400' : 'text-white'
              }`}
            >
              {formatDate(group.date)}
              {isToday(group.date) && (
                <span className="ml-2 text-xs bg-yellow-500 text-black px-2 py-0.5 rounded-full">
                  TODAY
                </span>
              )}
            </h3>
            <p className="text-sm text-gray-400">
              {group.events.length} event{group.events.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Events */}
          <div
            className={`space-y-2 rounded-b-xl overflow-hidden ${
              isPast(group.date) && !isToday(group.date) ? 'opacity-60' : ''
            }`}
          >
            {group.events.map((event, eventIndex) => (
              <Link
                key={event.id}
                href={`/events/${event.slug}`}
                className="block"
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: groupIndex * 0.05 + eventIndex * 0.02 }}
                  className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group"
                >
                  {/* Time */}
                  <div className="w-20 flex-shrink-0">
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">{event.time}</span>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div
                    className="px-2 py-1 rounded-full text-xs font-medium flex-shrink-0"
                    style={{
                      backgroundColor: `${getCategoryColor(event.category)}20`,
                      color: getCategoryColor(event.category),
                    }}
                  >
                    {getCategoryLabel(event.category)}
                  </div>

                  {/* Event Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium truncate group-hover:text-yellow-400 transition-colors">
                      {event.title}
                    </h4>
                    <div className="flex items-center gap-1.5 text-gray-400 text-sm mt-0.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="truncate">
                        {event.venue} • {event.area}
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  {event.price && (
                    <div className="text-yellow-400 font-medium text-sm flex-shrink-0">
                      {event.price}
                    </div>
                  )}

                  {/* Arrow */}
                  <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-yellow-400 transition-colors flex-shrink-0" />
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
