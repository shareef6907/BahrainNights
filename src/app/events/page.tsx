import { Suspense } from 'react';
import { createClient } from '@supabase/supabase-js';
import EventsPageClient, { Event } from '@/components/events/EventsPageClient';

// Force dynamic rendering to ensure fresh data on every request
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Create Supabase client directly to ensure service role key is used
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Category color mapping
function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
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
  };
  return colors[category?.toLowerCase()] || 'bg-purple-500';
}

// Helper: Normalize date to ISO format (YYYY-MM-DD)
function normalizeToISODate(dateStr: string | null | undefined): string {
  if (!dateStr) return '';

  // If already in ISO format (YYYY-MM-DD), return as-is
  if (/^\d{4}-\d{2}-\d{2}/.test(dateStr)) {
    return dateStr.split('T')[0]; // Strip time if present
  }

  // Try to parse various formats
  try {
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      // If the year is missing/wrong (e.g., "Dec 29" parsed as 2001), use current/next year
      const year = date.getFullYear();
      const currentYear = new Date().getFullYear();

      if (year < currentYear - 1) {
        // Date was parsed with wrong year, assume current or next year
        const month = date.getMonth();
        const day = date.getDate();
        const currentMonth = new Date().getMonth();

        // If the month is before current month, assume next year
        const targetYear = month < currentMonth ? currentYear + 1 : currentYear;
        const correctedDate = new Date(targetYear, month, day);
        return correctedDate.toISOString().split('T')[0];
      }

      return date.toISOString().split('T')[0];
    }
  } catch {
    // Fall through
  }

  return ''; // Return empty if we can't parse
}

// Fetch all published events on the server
async function getEvents(): Promise<Event[]> {
  // Create Supabase client with service role key
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  // Fetch published events ordered by event date (upcoming first)
  const { data, error } = await supabase
    .from('events')
    .select('*')
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
    // Handle date formatting - support both date and start_date fields
    const eventDate = event.date || event.start_date;
    const rawDate = normalizeToISODate(eventDate); // Normalize to ISO format for filtering
    const formattedDate = eventDate
      ? new Date(eventDate).toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        })
      : 'Date TBA';

    // Handle time formatting - support both time and start_time fields
    // Don't default to "Time TBA" - leave it null/empty if no time is set
    const rawTime = event.time || event.start_time || '';
    // Filter out TBA values
    const eventTime = rawTime && !rawTime.toLowerCase().includes('tba') ? rawTime : '';

    // Handle price - support multiple field names
    const price = event.price || event.price_range || event.booking_method;
    const priceType = event.price_type;
    const isFree = priceType === 'free' || !price || price === '0' || price.toLowerCase?.() === 'free';

    return {
      id: event.id,
      title: event.title || 'Untitled Event',
      slug: event.slug || event.id,
      description: event.description || '',
      image: event.cover_url || event.image_url || event.featured_image || '/images/event-placeholder.jpg',
      category: event.category || 'general',
      categoryColor: getCategoryColor(event.category),
      venue: event.venue_name || event.venue || 'Venue TBA',
      location: event.venue_address || event.location || '',
      date: formattedDate,
      rawDate, // ISO date for filtering
      time: eventTime,
      price: isFree ? 'Free' : (price?.includes?.('BD') ? price : `BD ${price}`),
      isFree,
      isFeatured: event.is_featured || false,
    };
  });
}

// Server Component - data is fetched BEFORE the page renders
export default async function EventsPage() {
  // Fetch all data on the server - NO loading state needed!
  const events = await getEvents();

  return (
    <Suspense fallback={null}>
      <EventsPageClient initialEvents={events} />
    </Suspense>
  );
}

// Metadata for SEO
export const metadata = {
  title: 'Events in Bahrain | BahrainNights',
  description: 'Discover the best events, concerts, shows, and experiences happening in Bahrain. Find events today, this weekend, or this month.',
  openGraph: {
    title: 'Events in Bahrain',
    description: 'Discover the best events, concerts, shows, and experiences happening in Bahrain.',
    url: 'https://bahrainnights.com/events',
    type: 'website',
  },
};
