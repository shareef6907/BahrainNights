'use client';

import { motion } from 'framer-motion';
import CalendarDay, { CalendarEvent } from './CalendarDay';
import { EventCategory } from './CalendarFilters';

interface CalendarGridProps {
  currentDate: Date;
  events: CalendarEvent[];
  activeCategories: EventCategory[];
  onDayClick: (date: Date, events: CalendarEvent[]) => void;
}

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarGrid({
  currentDate,
  events,
  activeCategories,
  onDayClick,
}: CalendarGridProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get first day of the month
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  // Get the starting day (Sunday of the week containing the 1st)
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());

  // Generate 6 weeks (42 days) to ensure we cover all cases
  const days: Date[] = [];
  const currentDay = new Date(startDate);
  for (let i = 0; i < 42; i++) {
    days.push(new Date(currentDay));
    currentDay.setDate(currentDay.getDate() + 1);
  }

  // Filter events based on active categories
  const filteredEvents = events.filter((event) =>
    activeCategories.includes(event.category)
  );

  // Group events by date
  const getEventsForDate = (date: Date): CalendarEvent[] => {
    const dateStr = date.toISOString().split('T')[0];
    return filteredEvents.filter((event) => event.date === dateStr);
  };

  // Check if date is in current month
  const isCurrentMonth = (date: Date): boolean => {
    return date.getMonth() === currentDate.getMonth();
  };

  // Check if date is today
  const isToday = (date: Date): boolean => {
    return date.toDateString() === today.toDateString();
  };

  // Check if date is in the past
  const isPast = (date: Date): boolean => {
    return date < today;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
    >
      {/* Days of Week Header */}
      <div className="grid grid-cols-7 border-b border-white/10">
        {DAYS_OF_WEEK.map((day, index) => (
          <div
            key={day}
            className={`py-3 text-center text-sm font-semibold ${
              index === 5 || index === 6 ? 'text-yellow-400' : 'text-gray-400'
            }`}
          >
            <span className="hidden sm:inline">{day}</span>
            <span className="sm:hidden">{day.charAt(0)}</span>
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7">
        {days.map((date, index) => {
          const dayEvents = getEventsForDate(date);

          return (
            <CalendarDay
              key={index}
              date={date}
              events={dayEvents}
              isToday={isToday(date)}
              isCurrentMonth={isCurrentMonth(date)}
              isPast={isPast(date)}
              onClick={() => onDayClick(date, dayEvents)}
            />
          );
        })}
      </div>
    </motion.div>
  );
}
