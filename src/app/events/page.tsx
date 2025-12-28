import { Suspense } from 'react';
import { createClient } from '@supabase/supabase-js';
import EventsPageClient, { Event } from '@/components/events/EventsPageClient';

// Revalidate every 5 minutes for fresh data
export const revalidate = 300;

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

// Fetch all published events on the server
async function getEvents(): Promise<Event[]> {
  // Create Supabase client with service role key
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  // Fetch published events ordered by created_at
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

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
    const formattedDate = eventDate
      ? new Date(eventDate).toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        })
      : 'Date TBA';

    // Handle time formatting - support both time and start_time fields
    const eventTime = event.time || event.start_time || 'Time TBA';

    // Handle price - support multiple field names
    const price = event.price || event.price_range || event.booking_method;
    const priceType = event.price_type;
    const isFree = priceType === 'free' || !price || price === '0' || price.toLowerCase?.() === 'free';

    return {
      id: event.id,
      title: event.title || 'Untitled Event',
      slug: event.slug || event.id,
      description: event.description || '',
      image: event.cover_url || event.featured_image || '/images/event-placeholder.jpg',
      category: event.category || 'general',
      categoryColor: getCategoryColor(event.category),
      venue: event.venue_name || event.venue || 'Venue TBA',
      location: event.venue_address || event.location || '',
      date: formattedDate,
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

  console.log('=== EVENTS PAGE RENDER ===');
  console.log('Events passed to client:', events.length);
  if (events.length > 0) {
    console.log('Event titles:', events.map(e => e.title).join(', '));
  }

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
