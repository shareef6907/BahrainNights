'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import Link from 'next/link';

// Days of the week
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function EventsCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get first day of month and total days
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Generate calendar days
  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-500/5 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <CalendarIcon className="w-10 h-10 text-blue-400" />
              Events Calendar
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Plan your month with all the best events happening in Bahrain
            </p>
          </motion.div>

          {/* Back to Events */}
          <div className="flex justify-center mb-8">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Events
            </Link>
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
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
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`min-h-[100px] p-2 border-b border-r border-white/5 ${
                  day ? 'cursor-pointer hover:bg-white/5 transition-colors' : ''
                }`}
                onClick={() => day && setSelectedDate(new Date(year, month, day))}
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
                    {/* Placeholder for events - will be populated when database is ready */}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Coming Soon Notice */}
          <div className="p-8 text-center border-t border-white/10">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-bold text-white mb-2">Calendar View Coming Soon!</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              We&apos;re working on an interactive calendar where you can see all events at a glance.
              Check back soon!
            </p>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              Browse Events List
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
