'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { CalendarEvent } from './CalendarDay';

interface MiniCalendarProps {
  currentDate: Date;
  events: CalendarEvent[];
  onDateSelect: (date: Date) => void;
}

const DAYS_OF_WEEK = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function MiniCalendar({
  currentDate,
  events,
  onDateSelect,
}: MiniCalendarProps) {
  const [displayMonth, setDisplayMonth] = useState(new Date(currentDate));
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get first day of the month
  const firstDayOfMonth = new Date(displayMonth.getFullYear(), displayMonth.getMonth(), 1);
  const lastDayOfMonth = new Date(displayMonth.getFullYear(), displayMonth.getMonth() + 1, 0);

  // Get the starting day (Sunday of the week containing the 1st)
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());

  // Generate days
  const days: Date[] = [];
  const current = new Date(startDate);
  for (let i = 0; i < 42; i++) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  const hasEvents = (date: Date): boolean => {
    const dateStr = date.toISOString().split('T')[0];
    return events.some((e) => e.date === dateStr);
  };

  const isCurrentMonth = (date: Date): boolean => {
    return date.getMonth() === displayMonth.getMonth();
  };

  const isToday = (date: Date): boolean => {
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date): boolean => {
    return date.toDateString() === currentDate.toDateString();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(displayMonth);
    newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    setDisplayMonth(newDate);
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-1 hover:bg-white/10 rounded transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-gray-400" />
        </button>
        <span className="text-white font-medium text-sm">
          {displayMonth.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
        </span>
        <button
          onClick={() => navigateMonth('next')}
          className="p-1 hover:bg-white/10 rounded transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Days of Week */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS_OF_WEEK.map((day, index) => (
          <div
            key={index}
            className="text-center text-xs text-gray-500 font-medium"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => (
          <button
            key={index}
            onClick={() => onDateSelect(date)}
            className={`relative aspect-square flex items-center justify-center text-xs rounded transition-colors ${
              !isCurrentMonth(date)
                ? 'text-gray-600'
                : isSelected(date)
                ? 'bg-yellow-500 text-black font-bold'
                : isToday(date)
                ? 'bg-yellow-500/20 text-yellow-400 font-bold'
                : 'text-gray-300 hover:bg-white/10'
            }`}
          >
            {date.getDate()}
            {hasEvents(date) && isCurrentMonth(date) && !isSelected(date) && (
              <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-yellow-400" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
