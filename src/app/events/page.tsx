import { Suspense } from 'react';
import { supabaseAdmin } from '@/lib/supabase';
import EventsPageClient, { Event } from '@/components/events/EventsPageClient';

// Revalidate every 5 minutes for fresh data
export const revalidate = 300;

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

// Fetch all events on the server
async function getEvents(): Promise<Event[]> {
  const { data, error } = await supabaseAdmin
    .from('events')
    .select('*')
    .eq('status', 'published')
    .order('start_date', { ascending: true });

  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data || []).map((event: any) => {
    // Handle date formatting
    const eventDate = event.start_date || event.date;
    const formattedDate = eventDate
      ? new Date(eventDate).toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        })
      : 'Date TBA';

    // Handle time formatting
    const eventTime = event.start_time || event.time || 'Time TBA';

    // Handle price
    const price = event.price || event.price_range;
    const isFree = !price || price === '0' || price.toLowerCase() === 'free';

    return {
      id: event.id,
      title: event.title || 'Untitled Event',
      slug: event.slug || event.id,
      description: event.description || '',
      image: event.featured_image || event.cover_url || '/images/event-placeholder.jpg',
      category: event.category || 'general',
      categoryColor: getCategoryColor(event.category),
      venue: event.venue_name || event.venue || 'Venue TBA',
      location: event.venue_address || event.location || '',
      date: formattedDate,
      time: eventTime,
      price: isFree ? 'Free' : `BD ${price}`,
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
