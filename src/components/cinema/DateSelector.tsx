'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

interface DateOption {
  date: string;
  dayName: string;
  dayNumber: string;
  month: string;
  isToday: boolean;
}

interface DateSelectorProps {
  dates: DateOption[];
  selectedDate: string;
  onDateSelect: (date: string) => void;
}

export default function DateSelector({ dates, selectedDate, onDateSelect }: DateSelectorProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative">
      {/* Scroll Buttons */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-slate-900/90 backdrop-blur-sm border border-white/10 rounded-full text-white hover:bg-slate-800 transition-colors hidden md:flex"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-slate-900/90 backdrop-blur-sm border border-white/10 rounded-full text-white hover:bg-slate-800 transition-colors hidden md:flex"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Date Pills */}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide py-2 px-1 md:px-8"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {dates.map((date, index) => (
          <motion.button
            key={date.date}
            onClick={() => onDateSelect(date.date)}
            className={`flex-shrink-0 flex flex-col items-center px-4 py-3 rounded-xl border transition-all min-w-[80px] ${
              selectedDate === date.date
                ? 'bg-yellow-400 border-yellow-400 text-black'
                : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20'
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.03 }}
          >
            <span className={`text-xs font-medium ${
              selectedDate === date.date ? 'text-black/70' : 'text-gray-400'
            }`}>
              {date.isToday ? 'Today' : date.dayName}
            </span>
            <span className="text-xl font-bold">{date.dayNumber}</span>
            <span className={`text-xs ${
              selectedDate === date.date ? 'text-black/70' : 'text-gray-400'
            }`}>
              {date.month}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
