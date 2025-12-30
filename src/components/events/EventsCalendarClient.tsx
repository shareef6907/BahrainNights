'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin, Clock, X } from 'lucide-react';
import Link from 'next/link';

// Days of the week
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Category colors
const categoryColors: Record<string, string> = {
  music: 'bg-purple-500',
  dining: 'bg-orange-500',
  family: 'bg-green-500',
  arts: 'bg-pink-500',
  sports: 'bg-blue-500',
  nightlife: 'bg-indigo-500',
  business: 'bg-gray-500',
  wellness: 'bg-teal-500',
  shopping: 'bg-yellow-500',
  community: 'bg-red-500',
  special: 'bg-amber-500',
  general: 'bg-slate-500',
};

interface CalendarEvent {
  id: string;
  title: string;
  slug: string;
  date: string;
  endDate?: string;
  time?: string;
  venue: string;
  category: string;
}

interface EventsCalendarClientProps {
  events: CalendarEvent[];
}

export default function EventsCalendarClient({ events }: EventsCalendarClientProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get first day of month and total days
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  }, [firstDayOfMonth, daysInMonth]);

  // Group events by date (including multi-day events)
  const eventsByDate = useMemo(() => {
    const grouped: Record<string, CalendarEvent[]> = {};

    events.forEach(event => {
      if (!event.date) return;

      const startDate = new Date(event.date);
      const endDate = event.endDate ? new Date(event.endDate) : startDate;

      // Add event to all days in its range
      const current = new Date(startDate);
      while (current <= endDate) {
        const dateKey = current.toISOString().split('T')[0];
        if (!grouped[dateKey]) {
          grouped[dateKey] = [];
        }
        // Avoid duplicates
        if (!grouped[dateKey].find(e => e.id === event.id)) {
          grouped[dateKey].push(event);
        }
        current.setDate(current.getDate() + 1);
      }
    });

    return grouped;
  }, [events]);

  // Get events for a specific day
  const getEventsForDay = (day: number): CalendarEvent[] => {
    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return eventsByDate[dateKey] || [];
  };

  // Get events for selected date
  const selectedDateEvents = useMemo(() => {
    if (!selectedDate) return [];
    const dateKey = selectedDate.toISOString().split('T')[0];
    return eventsByDate[dateKey] || [];
  }, [selectedDate, eventsByDate]);

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };

  const handleDayClick = (day: number) => {
    const date = new Date(year, month, day);
    setSelectedDate(date);
    const dayEvents = getEventsForDay(day);
    if (dayEvents.length > 0) {
      setShowModal(true);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-pink-500/5 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <CalendarIcon className="w-10 h-10 text-purple-400" />
              Events Calendar
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Plan your month with all the best events happening in Bahrain
            </p>
            <p className="text-purple-400 mt-2">
              {events.length} events available
            </p>
          </motion.div>

          {/* Back to Events */}
          <div className="flex justify-center gap-4 mb-8">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Events
            </Link>
            <button
              onClick={goToToday}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors"
            >
              Today
            </button>
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden"
        >
          {/* Calendar Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <button
              onClick={goToPreviousMonth}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <h2 className="text-2xl font-bold text-white">
              {MONTHS[month]} {year}
            </h2>
            <button
              onClick={goToNextMonth}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 border-b border-white/10">
            {DAYS.map((day) => (
              <div
                key={day}
                className="py-4 text-center text-sm font-semibold text-gray-400"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7">
            {calendarDays.map((day, index) => {
              const dayEvents = day ? getEventsForDay(day) : [];
              const hasEvents = dayEvents.length > 0;

              return (
                <div
                  key={index}
                  className={`min-h-[100px] p-2 border-b border-r border-white/5 ${
                    day ? 'cursor-pointer hover:bg-white/5 transition-colors' : ''
                  }`}
                  onClick={() => day && handleDayClick(day)}
                >
                  {day && (
                    <div className="h-full">
                      <span
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                          isToday(day)
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                            : selectedDate?.getDate() === day &&
                              selectedDate?.getMonth() === month
                            ? 'bg-yellow-400 text-black'
                            : 'text-white hover:bg-white/10'
                        }`}
                      >
                        {day}
                      </span>

                      {/* Event indicators */}
                      {hasEvents && (
                        <div className="mt-1 space-y-1">
                          {dayEvents.slice(0, 3).map((event, i) => (
                            <div
                              key={event.id + '-' + i}
                              className={`text-xs px-1.5 py-0.5 rounded truncate ${
                                categoryColors[event.category] || categoryColors.general
                              } text-white`}
                              title={event.title}
                            >
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 3 && (
                            <div className="text-xs text-gray-400 px-1.5">
                              +{dayEvents.length - 3} more
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="p-4 border-t border-white/10">
            <div className="flex flex-wrap gap-3 justify-center">
              {Object.entries(categoryColors).slice(0, 8).map(([category, color]) => (
                <div key={category} className="flex items-center gap-1.5">
                  <div className={`w-3 h-3 rounded-full ${color}`} />
                  <span className="text-xs text-gray-400 capitalize">{category}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Event Modal */}
      <AnimatePresence>
        {showModal && selectedDate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-white/10 rounded-2xl max-w-lg w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h3 className="text-lg font-bold text-white">
                  {formatDate(selectedDate)}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-4 overflow-y-auto max-h-[60vh]">
                {selectedDateEvents.length > 0 ? (
                  <div className="space-y-3">
                    {selectedDateEvents.map((event) => (
                      <Link
                        key={event.id}
                        href={`/events/${event.slug}`}
                        className="block p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-full rounded-full ${categoryColors[event.category] || categoryColors.general}`} />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-white truncate">
                              {event.title}
                            </h4>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <span className="truncate">{event.venue}</span>
                              </div>
                              {event.time && (
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{event.time}</span>
                                </div>
                              )}
                            </div>
                            <span className={`inline-block mt-2 px-2 py-0.5 text-xs rounded-full ${categoryColors[event.category] || categoryColors.general} text-white capitalize`}>
                              {event.category}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    No events on this day
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-white/10">
                <Link
                  href="/events"
                  className="block w-full py-3 text-center bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                >
                  Browse All Events
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
