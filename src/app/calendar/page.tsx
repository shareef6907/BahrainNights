import { Metadata } from 'next';
import { Suspense } from 'react';
import { supabaseAdmin } from '@/lib/supabase';
import CalendarPageClient from './CalendarPageClient';
import { CalendarEvent } from '@/components/calendar/CalendarDay';

export const metadata: Metadata = {
  title: 'Events Calendar Bahrain | All Upcoming Events',
  description: 'View all upcoming events in Bahrain on our interactive calendar. Find concerts, parties, family events, dining experiences, and more.',
  keywords: ['Bahrain events calendar', 'events calendar', 'what\'s on Bahrain', 'upcoming events Bahrain'],
  alternates: {
    canonical: 'https://www.bahrainnights.com/calendar',
  },
  openGraph: {
    title: 'Events Calendar Bahrain | All Upcoming Events',
    description: 'View all upcoming events in Bahrain on our interactive calendar.',
    type: 'website',
    url: 'https://www.bahrainnights.com/calendar',
  },
};

// Force dynamic rendering for real-time event data
export const dynamic = 'force-dynamic';

// Category mapping for calendar
const categoryMapping: Record<string, string> = {
  music: 'concerts',
  concert: 'concerts',
  concerts: 'concerts',
  nightlife: 'nightlife',
  party: 'nightlife',
  club: 'nightlife',
  dining: 'dining',
  food: 'dining',
  restaurant: 'dining',
  brunch: 'dining',
  family: 'family',
  kids: 'family',
  arts: 'cultural',
  culture: 'cultural',
  cultural: 'cultural',
  exhibition: 'cultural',
  sports: 'sports',
  fitness: 'sports',
  cinema: 'cinema',
  movie: 'cinema',
  film: 'cinema',
};

function normalizeCategory(category: string | null): string {
  if (!category) return 'concerts';
  const lower = category.toLowerCase();
  return categoryMapping[lower] || 'concerts';
}

// Fetch real events from the database
async function getCalendarEvents(): Promise<CalendarEvent[]> {
  const today = new Date();
  // Get events for the next 3 months
  const threeMonthsLater = new Date(today);
  threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
  
  const todayStr = today.toISOString().split('T')[0];
  const endDateStr = threeMonthsLater.toISOString().split('T')[0];

  const { data: events, error } = await supabaseAdmin
    .from('events')
    .select('id, title, slug, date, time, venue_name, venue_address, category, is_featured, price, price_range')
    .eq('status', 'published')
    .eq('is_hidden', false)
    .eq('country', 'Bahrain')
    .gte('date', todayStr)
    .lte('date', endDateStr)
    .order('date', { ascending: true })
    .order('time', { ascending: true });

  if (error) {
    console.error('Error fetching calendar events:', error);
    return [];
  }

  // Transform to CalendarEvent format
  return (events || []).map((event) => {
    // Parse price
    let priceDisplay = 'Contact for price';
    if (event.price === 0 || event.price_range?.toLowerCase() === 'free') {
      priceDisplay = 'Free';
    } else if (event.price) {
      priceDisplay = `BD ${event.price}`;
    } else if (event.price_range) {
      priceDisplay = event.price_range;
    }

    // Extract area from venue_address or default to venue_name
    const area = event.venue_address?.split(',')[0] || event.venue_name || 'Bahrain';

    return {
      id: event.id,
      title: event.title,
      slug: event.slug,
      date: event.date,
      time: event.time || '',
      venue: event.venue_name || 'TBA',
      area: area,
      category: normalizeCategory(event.category),
      price: priceDisplay,
      isFeatured: event.is_featured || false,
    };
  });
}

export default async function CalendarPage() {
  const events = await getCalendarEvents();
  const featuredEvents = events.filter(e => e.isFeatured).slice(0, 5);

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400">Loading calendar...</p>
        </div>
      </div>
    }>
      <CalendarPageClient 
        initialEvents={events} 
        featuredEvents={featuredEvents}
      />
    </Suspense>
  );
}
