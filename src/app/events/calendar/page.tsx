import { Suspense } from 'react';
import { createClient } from '@supabase/supabase-js';
import EventsCalendarClient from '@/components/events/EventsCalendarClient';

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Create Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Calendar event type
export interface CalendarEvent {
  id: string;
  title: string;
  slug: string;
  date: string; // ISO format YYYY-MM-DD
  endDate?: string;
  time?: string;
  venue: string;
  category: string;
}

// Fetch all published events
async function getEvents(): Promise<CalendarEvent[]> {
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  const { data, error } = await supabase
    .from('events')
    .select('id, title, slug, date, end_date, time, start_time, venue_name, venue, category')
    .eq('status', 'published')
    .order('date', { ascending: true });

  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }

  if (!data || data.length === 0) {
    return [];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((event: any) => {
    const eventDate = event.date || '';
    const rawDate = eventDate ? eventDate.split('T')[0] : '';
    const endDate = event.end_date ? event.end_date.split('T')[0] : undefined;
    const time = event.time || event.start_time || '';

    return {
      id: event.id,
      title: event.title || 'Untitled Event',
      slug: event.slug || event.id,
      date: rawDate,
      endDate,
      time: time && !time.toLowerCase().includes('tba') ? time : undefined,
      venue: event.venue_name || event.venue || 'Venue TBA',
      category: event.category || 'general',
    };
  });
}

// Server Component
export default async function EventsCalendarPage() {
  const events = await getEvents();

  return (
    <Suspense fallback={<CalendarLoading />}>
      <EventsCalendarClient events={events} />
    </Suspense>
  );
}

// Loading component
function CalendarLoading() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-400">Loading calendar...</p>
      </div>
    </div>
  );
}

// Metadata for SEO
export const metadata = {
  title: 'Events Calendar | BahrainNights',
  description: 'View all upcoming events in Bahrain on our interactive calendar. Plan your month with concerts, shows, dining, and more.',
  openGraph: {
    title: 'Events Calendar - BahrainNights',
    description: 'View all upcoming events in Bahrain on our interactive calendar.',
    url: 'https://bahrainnights.com/events/calendar',
    type: 'website',
  },
};
