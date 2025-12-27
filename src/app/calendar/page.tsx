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

// Generate sample events for December 2025 and January 2026
const generateSampleEvents = (): CalendarEvent[] => {
  const events: CalendarEvent[] = [];

  // December 2025 Events
  // Dec 27 (Today) - 3 events
  events.push(
    {
      id: 'dec27-1',
      title: 'Jazz Night at Coda',
      slug: 'jazz-night-coda',
      date: '2025-12-27',
      time: '8:00 PM',
      venue: 'Coda Jazz Lounge',
      area: 'Juffair',
      category: 'concerts',
      price: 'BD 15',
    },
    {
      id: 'dec27-2',
      title: 'Family Fun Day',
      slug: 'family-fun-day',
      date: '2025-12-27',
      time: '10:00 AM',
      venue: 'Bahrain Bay',
      area: 'Manama',
      category: 'family',
      price: 'Free',
    },
    {
      id: 'dec27-3',
      title: 'Ladies Night at The Orangery',
      slug: 'ladies-night-orangery',
      date: '2025-12-27',
      time: '9:00 PM',
      venue: 'The Orangery',
      area: 'Adliya',
      category: 'nightlife',
      price: 'Free Entry',
    }
  );

  // Dec 28 (Saturday) - 5 events
  events.push(
    {
      id: 'dec28-1',
      title: 'Saturday Brunch at Gulf Hotel',
      slug: 'saturday-brunch-gulf',
      date: '2025-12-28',
      time: '12:00 PM',
      venue: 'Gulf Hotel',
      area: 'Manama',
      category: 'dining',
      price: 'BD 35',
      isFeatured: true,
    },
    {
      id: 'dec28-2',
      title: 'Pool Party at Coral Bay',
      slug: 'pool-party-coral-bay',
      date: '2025-12-28',
      time: '2:00 PM',
      venue: 'Coral Bay Club',
      area: 'Amwaj Islands',
      category: 'nightlife',
      price: 'BD 25',
    },
    {
      id: 'dec28-3',
      title: 'Premier League Screening',
      slug: 'premier-league-screening',
      date: '2025-12-28',
      time: '7:00 PM',
      venue: "JJ's Irish Restaurant",
      area: 'Juffair',
      category: 'sports',
      price: 'Free',
    },
    {
      id: 'dec28-4',
      title: 'Art Exhibition Opening',
      slug: 'art-exhibition-opening',
      date: '2025-12-28',
      time: '6:00 PM',
      venue: 'Bahrain National Museum',
      area: 'Manama',
      category: 'cultural',
      price: 'BD 5',
    },
    {
      id: 'dec28-5',
      title: 'Sonic The Hedgehog 3',
      slug: 'sonic-hedgehog-3',
      date: '2025-12-28',
      time: '4:00 PM',
      venue: 'VOX Cinemas',
      area: 'City Centre',
      category: 'cinema',
      price: 'BD 6',
    }
  );

  // Dec 29 (Sunday) - 4 events
  events.push(
    {
      id: 'dec29-1',
      title: 'Sunday Funday at Beach',
      slug: 'sunday-funday-beach',
      date: '2025-12-29',
      time: '11:00 AM',
      venue: 'Marassi Beach',
      area: 'Diyar Al Muharraq',
      category: 'family',
      price: 'BD 10',
    },
    {
      id: 'dec29-2',
      title: 'Live Acoustic Session',
      slug: 'live-acoustic-session',
      date: '2025-12-29',
      time: '7:00 PM',
      venue: 'Block 338',
      area: 'Adliya',
      category: 'concerts',
      price: 'Free',
    },
    {
      id: 'dec29-3',
      title: 'Yoga on the Rooftop',
      slug: 'yoga-rooftop',
      date: '2025-12-29',
      time: '7:00 AM',
      venue: 'Wyndham Garden',
      area: 'Juffair',
      category: 'sports',
      price: 'BD 12',
    },
    {
      id: 'dec29-4',
      title: 'Traditional Music Night',
      slug: 'traditional-music-night',
      date: '2025-12-29',
      time: '8:00 PM',
      venue: 'Beit Al Jasra',
      area: 'Jasra',
      category: 'cultural',
      price: 'BD 8',
    }
  );

  // Dec 30 (Monday) - 2 events
  events.push(
    {
      id: 'dec30-1',
      title: 'Happy Hour at CUT',
      slug: 'happy-hour-cut',
      date: '2025-12-30',
      time: '6:00 PM',
      venue: 'CUT by Wolfgang Puck',
      area: 'Bahrain Bay',
      category: 'dining',
      price: '40% OFF',
    },
    {
      id: 'dec30-2',
      title: 'Kids Movie Afternoon',
      slug: 'kids-movie-afternoon',
      date: '2025-12-30',
      time: '3:00 PM',
      venue: 'Cineco',
      area: 'Seef Mall',
      category: 'cinema',
      price: 'BD 4',
    }
  );

  // Dec 31 (NYE!) - 8 events
  events.push(
    {
      id: 'dec31-1',
      title: 'NYE Gala Dinner',
      slug: 'nye-gala-dinner',
      date: '2025-12-31',
      time: '8:00 PM',
      venue: 'Ritz-Carlton Bahrain',
      area: 'Seef',
      category: 'dining',
      price: 'BD 150',
      isFeatured: true,
    },
    {
      id: 'dec31-2',
      title: 'NYE Countdown Party',
      slug: 'nye-countdown-party',
      date: '2025-12-31',
      time: '10:00 PM',
      venue: 'The Avenues',
      area: 'Bahrain Bay',
      category: 'nightlife',
      price: 'BD 75',
      isFeatured: true,
    },
    {
      id: 'dec31-3',
      title: 'NYE Beach Bash',
      slug: 'nye-beach-bash',
      date: '2025-12-31',
      time: '9:00 PM',
      venue: 'Coral Bay Club',
      area: 'Amwaj Islands',
      category: 'nightlife',
      price: 'BD 60',
    },
    {
      id: 'dec31-4',
      title: 'Family NYE Celebration',
      slug: 'family-nye-celebration',
      date: '2025-12-31',
      time: '6:00 PM',
      venue: 'Bahrain Bay',
      area: 'Manama',
      category: 'family',
      price: 'Free',
    },
    {
      id: 'dec31-5',
      title: 'NYE Jazz Spectacular',
      slug: 'nye-jazz-spectacular',
      date: '2025-12-31',
      time: '9:00 PM',
      venue: 'Coda Jazz Lounge',
      area: 'Juffair',
      category: 'concerts',
      price: 'BD 45',
    },
    {
      id: 'dec31-6',
      title: 'Fireworks Viewing Party',
      slug: 'fireworks-viewing',
      date: '2025-12-31',
      time: '11:00 PM',
      venue: 'Four Seasons',
      area: 'Bahrain Bay',
      category: 'cultural',
      price: 'BD 50',
    },
    {
      id: 'dec31-7',
      title: 'NYE Rooftop Celebration',
      slug: 'nye-rooftop',
      date: '2025-12-31',
      time: '10:00 PM',
      venue: 'Downtown Rotana',
      area: 'Manama',
      category: 'nightlife',
      price: 'BD 55',
    },
    {
      id: 'dec31-8',
      title: 'NYE Special Screening',
      slug: 'nye-special-screening',
      date: '2025-12-31',
      time: '7:00 PM',
      venue: 'VOX Cinemas',
      area: 'City Centre',
      category: 'cinema',
      price: 'BD 15',
    }
  );

  // Scattered December events
  events.push(
    {
      id: 'dec20-1',
      title: 'Christmas Market',
      slug: 'christmas-market',
      date: '2025-12-20',
      time: '4:00 PM',
      venue: 'Block 338',
      area: 'Adliya',
      category: 'cultural',
      price: 'Free',
    },
    {
      id: 'dec21-1',
      title: 'Winter Wonderland',
      slug: 'winter-wonderland',
      date: '2025-12-21',
      time: '10:00 AM',
      venue: 'Bahrain City Centre',
      area: 'Seef',
      category: 'family',
      price: 'BD 8',
    },
    {
      id: 'dec22-1',
      title: 'Sunday Roast',
      slug: 'sunday-roast',
      date: '2025-12-22',
      time: '1:00 PM',
      venue: 'The Westin',
      area: 'Bahrain Bay',
      category: 'dining',
      price: 'BD 28',
    },
    {
      id: 'dec25-1',
      title: 'Christmas Brunch',
      slug: 'christmas-brunch',
      date: '2025-12-25',
      time: '12:00 PM',
      venue: 'Gulf Hotel',
      area: 'Manama',
      category: 'dining',
      price: 'BD 45',
      isFeatured: true,
    },
    {
      id: 'dec26-1',
      title: 'Boxing Day Shopping',
      slug: 'boxing-day-shopping',
      date: '2025-12-26',
      time: '10:00 AM',
      venue: 'The Avenues',
      area: 'Bahrain Bay',
      category: 'cultural',
      price: 'Free',
    }
  );

  // January 2026 Events
  // Jan 1 (New Year Recovery) - 2 events
  events.push(
    {
      id: 'jan1-1',
      title: 'New Year Brunch',
      slug: 'new-year-brunch',
      date: '2026-01-01',
      time: '12:00 PM',
      venue: 'The Westin',
      area: 'Bahrain Bay',
      category: 'dining',
      price: 'BD 30',
    },
    {
      id: 'jan1-2',
      title: 'Family Fun Day',
      slug: 'new-year-family-fun',
      date: '2026-01-01',
      time: '3:00 PM',
      venue: 'Bahrain Bay',
      area: 'Manama',
      category: 'family',
      price: 'Free',
    }
  );

  // Jan 2 (Thursday) - 3 events
  events.push(
    {
      id: 'jan2-1',
      title: 'Ladies Night Thursday',
      slug: 'ladies-night-thursday',
      date: '2026-01-02',
      time: '8:00 PM',
      venue: 'Coral Bay Club',
      area: 'Amwaj Islands',
      category: 'nightlife',
      price: 'BD 15',
    },
    {
      id: 'jan2-2',
      title: 'Quiz Night',
      slug: 'quiz-night-jan',
      date: '2026-01-02',
      time: '7:00 PM',
      venue: "JJ's Irish Restaurant",
      area: 'Juffair',
      category: 'nightlife',
      price: 'Free',
    },
    {
      id: 'jan2-3',
      title: 'New Release: Kraven',
      slug: 'new-release-kraven',
      date: '2026-01-02',
      time: '6:00 PM',
      venue: 'VOX Cinemas',
      area: 'City Centre',
      category: 'cinema',
      price: 'BD 7',
    }
  );

  // Jan 3 (Friday) - 6 events
  events.push(
    {
      id: 'jan3-1',
      title: 'Friday Garden Brunch',
      slug: 'friday-garden-brunch-jan',
      date: '2026-01-03',
      time: '12:30 PM',
      venue: 'The Westin',
      area: 'Bahrain Bay',
      category: 'dining',
      price: 'BD 38',
      isFeatured: true,
    },
    {
      id: 'jan3-2',
      title: 'Live Band Night',
      slug: 'live-band-night-jan',
      date: '2026-01-03',
      time: '9:00 PM',
      venue: 'Block 338',
      area: 'Adliya',
      category: 'concerts',
      price: 'Free',
    },
    {
      id: 'jan3-3',
      title: 'Football Friday',
      slug: 'football-friday-jan',
      date: '2026-01-03',
      time: '7:00 PM',
      venue: "Trader Vic's",
      area: 'Seef',
      category: 'sports',
      price: 'Free',
    },
    {
      id: 'jan3-4',
      title: 'Art Walk Adliya',
      slug: 'art-walk-adliya',
      date: '2026-01-03',
      time: '5:00 PM',
      venue: 'Adliya Streets',
      area: 'Adliya',
      category: 'cultural',
      price: 'Free',
    },
    {
      id: 'jan3-5',
      title: 'Family Movie Night',
      slug: 'family-movie-night',
      date: '2026-01-03',
      time: '4:00 PM',
      venue: 'Cineco',
      area: 'Seef Mall',
      category: 'cinema',
      price: 'BD 5',
    },
    {
      id: 'jan3-6',
      title: 'Weekend Kickoff Party',
      slug: 'weekend-kickoff-party',
      date: '2026-01-03',
      time: '10:00 PM',
      venue: 'The Orangery',
      area: 'Adliya',
      category: 'nightlife',
      price: 'Free Entry',
    }
  );

  // Jan 4 (Saturday) - 5 events
  events.push(
    {
      id: 'jan4-1',
      title: 'Saturday Seaview Brunch',
      slug: 'seaview-brunch-jan',
      date: '2026-01-04',
      time: '12:00 PM',
      venue: 'Gulf Hotel',
      area: 'Manama',
      category: 'dining',
      price: 'BD 35',
    },
    {
      id: 'jan4-2',
      title: 'Kids Carnival',
      slug: 'kids-carnival-jan',
      date: '2026-01-04',
      time: '10:00 AM',
      venue: 'Bahrain Fort',
      area: 'Manama',
      category: 'family',
      price: 'BD 5',
    },
    {
      id: 'jan4-3',
      title: 'DJ Night',
      slug: 'dj-night-jan4',
      date: '2026-01-04',
      time: '10:00 PM',
      venue: 'Coda Jazz Lounge',
      area: 'Juffair',
      category: 'nightlife',
      price: 'BD 20',
    },
    {
      id: 'jan4-4',
      title: 'Beach Volleyball Tournament',
      slug: 'beach-volleyball-jan',
      date: '2026-01-04',
      time: '9:00 AM',
      venue: 'Coral Bay Club',
      area: 'Amwaj Islands',
      category: 'sports',
      price: 'BD 15',
    },
    {
      id: 'jan4-5',
      title: 'Art Gallery Tour',
      slug: 'art-gallery-tour',
      date: '2026-01-04',
      time: '4:00 PM',
      venue: 'Bahrain National Museum',
      area: 'Manama',
      category: 'cultural',
      price: 'BD 3',
    }
  );

  // Jan 10 (Friday) - 4 events
  events.push(
    {
      id: 'jan10-1',
      title: 'Friday Brunch',
      slug: 'friday-brunch-jan10',
      date: '2026-01-10',
      time: '12:30 PM',
      venue: 'Sofitel Bahrain',
      area: 'Seef',
      category: 'dining',
      price: 'BD 32',
    },
    {
      id: 'jan10-2',
      title: 'Jazz Evening',
      slug: 'jazz-evening-jan',
      date: '2026-01-10',
      time: '8:00 PM',
      venue: 'Coda Jazz Lounge',
      area: 'Juffair',
      category: 'concerts',
      price: 'BD 18',
      isFeatured: true,
    },
    {
      id: 'jan10-3',
      title: 'Kids Playtime',
      slug: 'kids-playtime-jan',
      date: '2026-01-10',
      time: '3:00 PM',
      venue: 'Magic Planet',
      area: 'City Centre',
      category: 'family',
      price: 'BD 8',
    },
    {
      id: 'jan10-4',
      title: 'Cinema Under Stars',
      slug: 'cinema-under-stars',
      date: '2026-01-10',
      time: '7:00 PM',
      venue: 'Bahrain Bay',
      area: 'Manama',
      category: 'cinema',
      price: 'BD 10',
    }
  );

  // Jan 11 (Saturday) - 5 events
  events.push(
    {
      id: 'jan11-1',
      title: 'Pool Brunch Party',
      slug: 'pool-brunch-party-jan',
      date: '2026-01-11',
      time: '1:00 PM',
      venue: 'Sofitel Bahrain',
      area: 'Seef',
      category: 'dining',
      price: 'BD 32',
    },
    {
      id: 'jan11-2',
      title: 'Live Music Saturday',
      slug: 'live-music-saturday',
      date: '2026-01-11',
      time: '9:00 PM',
      venue: 'Block 338',
      area: 'Adliya',
      category: 'concerts',
      price: 'Free',
    },
    {
      id: 'jan11-3',
      title: 'Family Beach Day',
      slug: 'family-beach-day',
      date: '2026-01-11',
      time: '10:00 AM',
      venue: 'Marassi Beach',
      area: 'Diyar Al Muharraq',
      category: 'family',
      price: 'BD 10',
    },
    {
      id: 'jan11-4',
      title: 'Saturday Night Fever',
      slug: 'saturday-night-fever',
      date: '2026-01-11',
      time: '10:00 PM',
      venue: 'The Orangery',
      area: 'Adliya',
      category: 'nightlife',
      price: 'BD 15',
    },
    {
      id: 'jan11-5',
      title: 'Cultural Heritage Walk',
      slug: 'heritage-walk-jan',
      date: '2026-01-11',
      time: '4:00 PM',
      venue: 'Muharraq',
      area: 'Muharraq',
      category: 'cultural',
      price: 'BD 5',
    }
  );

  // More scattered January events
  events.push(
    {
      id: 'jan17-1',
      title: 'Friday Seafood Brunch',
      slug: 'seafood-brunch-jan',
      date: '2026-01-17',
      time: '12:00 PM',
      venue: 'Ritz-Carlton Bahrain',
      area: 'Seef',
      category: 'dining',
      price: 'BD 40',
    },
    {
      id: 'jan18-1',
      title: 'Kids Workshop',
      slug: 'kids-workshop-jan',
      date: '2026-01-18',
      time: '10:00 AM',
      venue: 'Bahrain National Museum',
      area: 'Manama',
      category: 'family',
      price: 'BD 5',
    },
    {
      id: 'jan24-1',
      title: 'Republic Day Celebration',
      slug: 'republic-day-jan',
      date: '2026-01-24',
      time: '6:00 PM',
      venue: 'Indian Club',
      area: 'Manama',
      category: 'cultural',
      price: 'Free',
    },
    {
      id: 'jan25-1',
      title: 'Weekend Pool Party',
      slug: 'weekend-pool-party-jan',
      date: '2026-01-25',
      time: '2:00 PM',
      venue: 'Coral Bay Club',
      area: 'Amwaj Islands',
      category: 'nightlife',
      price: 'BD 25',
    },
    {
      id: 'jan31-1',
      title: 'End of Month Party',
      slug: 'end-month-party-jan',
      date: '2026-01-31',
      time: '9:00 PM',
      venue: 'The Orangery',
      area: 'Adliya',
      category: 'nightlife',
      price: 'BD 10',
    }
  );

  return events;
};

const sampleEvents = generateSampleEvents();

function CalendarPageContent() {
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

  // Get featured events
  const featuredEvents = sampleEvents.filter((e) => e.isFeatured);

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
                events={sampleEvents}
                activeCategories={activeCategories}
                onDayClick={handleDayClick}
              />
            )}
            {view === 'week' && (
              <CalendarWeekView
                currentDate={currentDate}
                events={sampleEvents}
                activeCategories={activeCategories}
                onDayClick={handleDayClick}
              />
            )}
            {view === 'list' && (
              <CalendarListView
                currentDate={currentDate}
                events={sampleEvents}
                activeCategories={activeCategories}
              />
            )}
          </div>

          {/* Sidebar - Hidden on mobile */}
          <div className="hidden xl:block w-72 flex-shrink-0 space-y-6">
            <MiniCalendar
              currentDate={currentDate}
              events={sampleEvents}
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
export default function CalendarPage() {
  return (
    <Suspense fallback={<CalendarLoading />}>
      <CalendarPageContent />
    </Suspense>
  );
}
