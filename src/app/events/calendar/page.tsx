'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin, Clock, X } from 'lucide-react';
import Link from 'next/link';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

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

export default function EventsCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch events on mount
  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch('/api/events');
        const data = await res.json();
        if (data.events) {
          setEvents(data.events.map((e: any) => ({
            id: e.id,
            title: e.title,
            slug: e.slug,
            date: e.rawDate || '',
            endDate: e.rawEndDate,
            time: e.time,
            venue: e.venue,
            category: e.category,
          })));
        }
      } catch (err) {
        console.error('Failed to fetch events:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays = useMemo(() => {
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  }, [firstDayOfMonth, daysInMonth]);

  // Group events by date
  const eventsByDate = useMemo(() => {
    const grouped: Record<string, CalendarEvent[]> = {};
    events.forEach(event => {
      if (!event.date) return;
      const startDate = new Date(event.date);
      const endDate = event.endDate ? new Date(event.endDate) : startDate;
      const current = new Date(startDate);
      while (current <= endDate) {
        const dateKey = current.toISOString().split('T')[0];
        if (!grouped[dateKey]) grouped[dateKey] = [];
        if (!grouped[dateKey].find(e => e.id === event.id)) {
          grouped[dateKey].push(event);
        }
        current.setDate(current.getDate() + 1);
      }
    });
    return grouped;
  }, [events]);

  const getEventsForDay = (day: number) => {
    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return eventsByDate[dateKey] || [];
  };

  const selectedDateEvents = useMemo(() => {
    if (!selectedDate) return [];
    return eventsByDate[selectedDate.toISOString().split('T')[0]] || [];
  }, [selectedDate, eventsByDate]);

  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };

  const handleDayClick = (day: number) => {
    setSelectedDate(new Date(year, month, day));
    if (getEventsForDay(day).length > 0) setShowModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <section className="pt-24 pb-8 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <CalendarIcon className="w-8 h-8 text-purple-400" />
            Events Calendar
          </h1>
          <p className="text-gray-400">{events.length} events available</p>
          <div className="flex justify-center gap-4 mt-4">
            <Link href="/events" className="text-yellow-400 hover:text-yellow-300 flex items-center gap-1">
              <ChevronLeft className="w-4 h-4" /> Back to Events
            </Link>
          </div>
        </div>
      </section>

      {/* Calendar */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          {/* Month Navigation */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))} className="p-2 hover:bg-white/10 rounded-lg">
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <h2 className="text-xl font-bold text-white">{MONTHS[month]} {year}</h2>
            <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))} className="p-2 hover:bg-white/10 rounded-lg">
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 border-b border-white/10">
            {DAYS.map(day => (
              <div key={day} className="py-3 text-center text-sm text-gray-400 font-medium">{day}</div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7">
            {calendarDays.map((day, i) => {
              const dayEvents = day ? getEventsForDay(day) : [];
              return (
                <div
                  key={i}
                  className={`min-h-[90px] p-2 border-b border-r border-white/5 ${day ? 'cursor-pointer hover:bg-white/5' : ''}`}
                  onClick={() => day && handleDayClick(day)}
                >
                  {day && (
                    <>
                      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm ${
                        isToday(day) ? 'bg-purple-500 text-white' : 'text-white'
                      }`}>
                        {day}
                      </span>
                      {dayEvents.length > 0 && (
                        <div className="mt-1 space-y-0.5">
                          {dayEvents.slice(0, 2).map(event => (
                            <div
                              key={event.id}
                              className={`text-xs px-1 py-0.5 rounded truncate text-white ${categoryColors[event.category] || 'bg-slate-500'}`}
                            >
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-gray-400">+{dayEvents.length - 2} more</div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {showModal && selectedDate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-slate-900 border border-white/10 rounded-xl max-w-md w-full max-h-[70vh] overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h3 className="text-lg font-bold text-white">
                  {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </h3>
                <button onClick={() => setShowModal(false)} className="p-1 hover:bg-white/10 rounded">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <div className="p-4 overflow-y-auto max-h-[50vh] space-y-2">
                {selectedDateEvents.map(event => (
                  <Link
                    key={event.id}
                    href={`/events/${event.slug}`}
                    className="block p-3 bg-white/5 hover:bg-white/10 rounded-lg"
                  >
                    <h4 className="font-medium text-white">{event.title}</h4>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{event.venue}</span>
                      {event.time && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{event.time}</span>}
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
