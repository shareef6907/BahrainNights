'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, List, Grid3X3, CalendarDays } from 'lucide-react';

export type CalendarView = 'month' | 'week' | 'list';

interface CalendarHeaderProps {
  currentDate: Date;
  view: CalendarView;
  onViewChange: (view: CalendarView) => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  onToday: () => void;
}

export default function CalendarHeader({
  currentDate,
  view,
  onViewChange,
  onNavigate,
  onToday,
}: CalendarHeaderProps) {
  const formatMonthYear = () => {
    return currentDate.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  };

  const formatWeekRange = () => {
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek.getDay();
    startOfWeek.setDate(startOfWeek.getDate() - day);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);

    const startMonth = startOfWeek.toLocaleDateString('en-US', { month: 'short' });
    const endMonth = endOfWeek.toLocaleDateString('en-US', { month: 'short' });
    const startDay = startOfWeek.getDate();
    const endDay = endOfWeek.getDate();
    const year = endOfWeek.getFullYear();

    if (startMonth === endMonth) {
      return `${startMonth} ${startDay} - ${endDay}, ${year}`;
    }
    return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
  };

  const viewButtons = [
    { id: 'month' as CalendarView, label: 'Month', icon: Grid3X3 },
    { id: 'week' as CalendarView, label: 'Week', icon: CalendarDays },
    { id: 'list' as CalendarView, label: 'List', icon: List },
  ];

  return (
    <div className="space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
      {/* Title and Navigation */}
      <div className="flex items-center justify-between md:justify-start gap-4">
        {/* Navigation Arrows */}
        <div className="flex items-center gap-1">
          <motion.button
            onClick={() => onNavigate('prev')}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Previous ${view}`}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          <motion.button
            onClick={() => onNavigate('next')}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Next ${view}`}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Current Month/Week Display */}
        <h2 className="text-xl md:text-2xl font-bold text-white min-w-[200px]">
          {view === 'week' ? formatWeekRange() : formatMonthYear()}
        </h2>

        {/* Today Button */}
        <motion.button
          onClick={onToday}
          className="px-3 py-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20 text-sm font-medium transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Today
        </motion.button>
      </div>

      {/* View Toggle */}
      <div className="flex items-center justify-center md:justify-end">
        <div className="flex items-center bg-white/5 rounded-xl p-1">
          {viewButtons.map((btn) => {
            const isActive = view === btn.id;
            const IconComponent = btn.icon;

            return (
              <motion.button
                key={btn.id}
                onClick={() => onViewChange(btn.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-yellow-500 text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <IconComponent className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">{btn.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
