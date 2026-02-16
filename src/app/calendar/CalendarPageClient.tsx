'use client';

import { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';
import { Calendar, Loader2 } from 'lucide-react';
import CalendarHeader, { CalendarView } from '@/components/calendar/CalendarHeader';
import CalendarFilters, { EventCategory, categoryConfigs } from '@/components/calendar/CalendarFilters';
import CalendarGrid from '@/components/calendar/CalendarGrid';
import CalendarWeekView from '@/components/calendar/CalendarWeekView';
import CalendarListView from '@/components/calendar/CalendarListView';
import DayDetailModal from '@/components/calendar/DayDetailModal';
import MiniCalendar from '@/components/calendar/MiniCalendar';
import CalendarLegend from '@/components/calendar/CalendarLegend';
import { CalendarEvent } from '@/components/calendar/CalendarDay';

interface CalendarPageClientProps {
  initialEvents: CalendarEvent[];
  featuredEvents: CalendarEvent[];
}

function CalendarPageContent({ initialEvents, featuredEvents }: CalendarPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>('month');
  const [activeCategories, setActiveCategories] = useState<EventCategory[]>(
    categoryConfigs.map((c) => c.id)
  );
  const [selectedDay, setSelectedDay] = useState<{
    date: Date;
    events: CalendarEvent[];
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isInitialized = useRef(false);
  const isUpdatingFromUrl = useRef(false);

  // Initialize from URL params (runs once on mount)
  useEffect(() => {
    if (!searchParams || isInitialized.current) return;

    isUpdatingFromUrl.current = true;

    const dateParam = searchParams.get('date');
    const viewParam = searchParams.get('view') as CalendarView;

    if (dateParam) {
      const parsedDate = new Date(dateParam);
      if (!isNaN(parsedDate.getTime())) {
        setCurrentDate(parsedDate);
      }
    }

    if (viewParam && ['month', 'week', 'list'].includes(viewParam)) {
      setView(viewParam);
    }

    isInitialized.current = true;
    // Reset flag after state updates
    setTimeout(() => {
      isUpdatingFromUrl.current = false;
    }, 0);
  }, [searchParams]);

  // Update URL on state change (skip if updating from URL)
  useEffect(() => {
    if (!isInitialized.current || isUpdatingFromUrl.current) return;

    const params = new URLSearchParams();
    params.set('date', currentDate.toISOString().split('T')[0]);
    if (view !== 'month') {
      params.set('view', view);
    }
    router.replace(`/calendar?${params.toString()}`, { scroll: false });
  }, [currentDate, view, router]);

  const handleViewChange = (newView: CalendarView) => {
    setView(newView);
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (view === 'month' || view === 'list') {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    } else {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    }
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleToggleCategory = (category: EventCategory) => {
    setActiveCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleClearAll = () => {
    setActiveCategories([]);
  };

  const handleSelectAll = () => {
    setActiveCategories(categoryConfigs.map((c) => c.id));
  };

  const handleDayClick = (date: Date, events: CalendarEvent[]) => {
    setSelectedDay({ date, events });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDateSelect = (date: Date) => {
    setCurrentDate(date);
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative pt-24 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full mb-4">
              <Calendar className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400 font-medium text-sm">Events Calendar</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Plan Your{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                Month
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Discover all upcoming events in Bahrain at a glance
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calendar Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <CalendarHeader
          currentDate={currentDate}
          view={view}
          onViewChange={handleViewChange}
          onNavigate={handleNavigate}
          onToday={handleToday}
        />
      </section>

      {/* Category Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <CalendarFilters
          activeCategories={activeCategories}
          onToggleCategory={handleToggleCategory}
          onClearAll={handleClearAll}
          onSelectAll={handleSelectAll}
        />
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex gap-8">
          {/* Calendar Views */}
          <div className="flex-1">
            {view === 'month' && (
              <CalendarGrid
                currentDate={currentDate}
                events={initialEvents}
                activeCategories={activeCategories}
                onDayClick={handleDayClick}
              />
            )}
            {view === 'week' && (
              <CalendarWeekView
                currentDate={currentDate}
                events={initialEvents}
                activeCategories={activeCategories}
                onDayClick={handleDayClick}
              />
            )}
            {view === 'list' && (
              <CalendarListView
                currentDate={currentDate}
                events={initialEvents}
                activeCategories={activeCategories}
              />
            )}
          </div>

          {/* Sidebar - Hidden on mobile */}
          <div className="hidden xl:block w-72 flex-shrink-0 space-y-6">
            <MiniCalendar
              currentDate={currentDate}
              events={initialEvents}
              onDateSelect={handleDateSelect}
            />
            <CalendarLegend featuredEvents={featuredEvents} />
          </div>
        </div>
      </section>

      {/* Mobile Floating Today Button */}
      <motion.button
        onClick={handleToday}
        className="fixed bottom-6 right-6 xl:hidden p-4 bg-yellow-500 text-black rounded-full shadow-lg z-40"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        aria-label="Go to today"
      >
        <Calendar className="w-6 h-6" />
      </motion.button>

      {/* Day Detail Modal */}
      <DayDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        date={selectedDay?.date || null}
        events={selectedDay?.events || []}
      />
    </div>
  );
}

// Loading component
function CalendarLoading() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
        <p className="text-gray-400">Loading calendar...</p>
      </div>
    </div>
  );
}

// Main export with Suspense
export default function CalendarPageClient(props: CalendarPageClientProps) {
  return (
    <Suspense fallback={<CalendarLoading />}>
      <CalendarPageContent {...props} />
    </Suspense>
  );
}
