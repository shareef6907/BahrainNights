import { Suspense } from 'react';
import { createClient } from '@supabase/supabase-js';
import EventsPageClient, { Event, Attraction } from '@/components/events/EventsPageClient';
import EventListSchema from '@/components/SEO/EventListSchema';
import InternalLinks, { guideLinks, placeLinks } from '@/components/SEO/InternalLinks';
import EventServicesPromo from '@/components/events/EventServicesPromo';
import { parseDate, toISODateString } from '@/lib/utils/date';

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

// Helper: Normalize date to ISO format (YYYY-MM-DD) - timezone-safe
function normalizeToISODate(dateStr: string | null | undefined): string {
  if (!dateStr) return '';

  // If already in ISO format (YYYY-MM-DD), return as-is
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return dateStr;
  }
  
  // Strip time component if present (e.g., "2025-02-15T00:00:00")
  if (/^\d{4}-\d{2}-\d{2}T/.test(dateStr)) {
    return dateStr.split('T')[0];
  }

  // Use timezone-safe parsing
  const date = parseDate(dateStr);
  if (!date) return '';
  
  // Check if year needs correction (for dates like "Dec 29" parsed with wrong year)
  const year = date.getFullYear();
  const currentYear = new Date().getFullYear();

  if (year < currentYear - 1) {
    // Date was parsed with wrong year, assume current or next year
    const month = date.getMonth();
    const day = date.getDate();
    const currentMonth = new Date().getMonth();

    // If the month is before current month, assume next year
    const targetYear = month < currentMonth ? currentYear + 1 : currentYear;
    return toISODateString(new Date(targetYear, month, day));
  }

  return toISODateString(date);
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

  // Get today's date in ISO format for filtering
  const today = new Date().toISOString().split('T')[0];

  // Fetch published events that are current or upcoming
  // Filter: date >= today OR end_date >= today (for multi-day events)
  // Only show Bahrain events on main events page (international events have separate page)
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('status', 'published')
    .eq('is_hidden', false)
    .eq('country', 'Bahrain')
    .or(`date.gte.${today},end_date.gte.${today}`)
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

    // Handle end date for multi-day events
    const eventEndDate = event.end_date;
    const rawEndDate = eventEndDate ? normalizeToISODate(eventEndDate) : undefined;
    const formattedEndDate = eventEndDate && rawEndDate !== rawDate
      ? new Date(eventEndDate).toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        })
      : undefined;

    // Handle time formatting - support both time and start_time fields
    // Don't default to "Time TBA" - leave it null/empty if no time is set
    const rawTime = event.time || event.start_time || '';
    // Filter out TBA values
    const eventTime = rawTime && !rawTime.toLowerCase().includes('tba') ? rawTime : '';

    // Handle price - support multiple field names and types
    // Priority: event.price (number or numeric string) > event.price_range (string) > event.booking_method
    let numericPrice: number | null = null;

    if (typeof event.price === 'number') {
      numericPrice = event.price;
    } else if (typeof event.price === 'string') {
      // Try to parse string price - handles "20", "70 BHD", "BD 25", etc.
      const priceStr = event.price.toLowerCase();
      // Check for "free" first
      if (priceStr === 'free' || priceStr === 'free entry') {
        numericPrice = 0;
      } else {
        // Extract numeric value from strings like "20", "70 BHD", "BD 25"
        const match = priceStr.match(/(\d+(?:\.\d+)?)/);
        if (match) {
          numericPrice = parseFloat(match[1]);
        }
      }
    }

    const priceString = event.price_range || event.booking_method || '';
    const isSoldOut = event.is_sold_out === true;

    // Determine price display logic:
    // - is_sold_out → "Sold out"
    // - null/undefined price → "Contact for price" (not free!)
    // - price === 0 → "Free" (explicitly free events)
    // - price > 0 → Show the price
    // - price_range string containing "free" → Free
    let displayPrice: string;
    let isFree = false;

    if (isSoldOut) {
      // Event is sold out - show sold out status
      displayPrice = 'Sold out';
      isFree = false;
    } else if (numericPrice === null && !priceString) {
      // No price info at all - show "Contact for price"
      displayPrice = 'Contact for price';
      isFree = false;
    } else if (numericPrice === 0 || priceString.toLowerCase?.() === 'free') {
      // Explicitly free
      displayPrice = 'Free';
      isFree = true;
    } else if (numericPrice !== null && numericPrice > 0) {
      // Has a numeric price
      displayPrice = `BD ${numericPrice}`;
      isFree = false;
    } else if (priceString) {
      // Has a price string (e.g., "From BD 25")
      displayPrice = priceString.includes('BD') ? priceString : `BD ${priceString}`;
      isFree = false;
    } else {
      displayPrice = 'Contact for price';
      isFree = false;
    }

    return {
      id: event.id,
      title: event.title || 'Untitled Event',
      slug: event.slug || event.id,
      description: event.description || '',
      image: event.cover_url || event.image_url || event.featured_image || '/images/event-placeholder.jpg',
      coverUrl: event.cover_url || event.image_url || event.featured_image || '/images/event-placeholder.jpg',
      category: event.category || 'general',
      categoryColor: getCategoryColor(event.category),
      venue: event.venue_name || event.venue || 'Venue TBA',
      location: event.venue_address || event.location || '',
      date: formattedDate,
      endDate: formattedEndDate, // For multi-day events
      rawDate, // ISO date for filtering
      rawEndDate, // ISO end date for filtering
      time: eventTime,
      price: displayPrice,
      priceNum: numericPrice,
      priceCurrency: event.price_currency || 'BHD',
      isFree,
      isSoldOut,
      isFeatured: event.is_featured || false,
      affiliateUrl: event.affiliate_url || event.booking_url || event.source_url || '',
    };
  });
}

// Fetch Family & Kids attractions for display in the family category
async function getAttractions(): Promise<Attraction[]> {
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  const { data, error } = await supabase
    .from('attractions')
    .select('*')
    .eq('is_active', true)
    .order('is_featured', { ascending: false })
    .order('tripadvisor_rating', { ascending: false, nullsFirst: false });

  if (error) {
    console.error('Error fetching attractions:', error);
    return [];
  }

  if (!data || data.length === 0) {
    return [];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((attraction: any) => ({
    id: attraction.id,
    name: attraction.name,
    slug: attraction.slug || attraction.id,
    description: attraction.short_description || attraction.description?.substring(0, 200) || '',
    image: attraction.image_url || '/images/event-placeholder.jpg',
    area: attraction.area || 'Bahrain',
    priceFrom: attraction.price_from,
    priceRange: attraction.price_range,
    rating: attraction.tripadvisor_rating || attraction.rating,
    duration: attraction.duration,
    ageRange: attraction.suitable_for?.includes('kids') ? 'Kids' : 'All Ages',
    tags: attraction.tags || [],
    isFeatured: attraction.is_featured || false,
  }));
}

// Server Component - data is fetched BEFORE the page renders
export default async function EventsPage() {
  // Fetch all data on the server - NO loading state needed!
  const [events, attractions] = await Promise.all([
    getEvents(),
    getAttractions()
  ]);

  // Transform events for schema - map to format expected by EventListSchema
  const schemaEvents = events.slice(0, 20).map(event => ({
    title: event.title,
    start_date: event.rawDate,
    venue_name: event.venue,
    affiliate_url: event.affiliateUrl,
    image_url: event.image,
    slug: event.slug,
  }));

  return (
    <>
      <EventListSchema
        events={schemaEvents}
        pageTitle="Events in Bahrain"
        pageDescription="Discover concerts, nightlife, comedy, and more events in Bahrain"
        pageUrl="https://www.bahrainnights.com/events"
      />
      <Suspense fallback={null}>
        <EventsPageClient initialEvents={events} familyAttractions={attractions} />
      </Suspense>
      <EventServicesPromo />
      <InternalLinks title="Explore Bahrain" links={[...guideLinks, ...placeLinks]} />
    </>
  );
}

// Metadata for SEO
export const metadata = {
  title: 'Events in Bahrain - Concerts, Shows & Happenings',
  description: 'Discover the best events happening in Bahrain. Find concerts, shows, parties, family activities, and cultural events. Updated daily with all events in Bahrain.',
  keywords: ['events in Bahrain', 'Bahrain events', 'events happening in Bahrain', 'Bahrain parties', 'concerts in Bahrain', 'things to do in Bahrain'],
  openGraph: {
    title: 'Events in Bahrain - Concerts, Shows & Happenings | BahrainNights',
    description: 'Discover the best events happening in Bahrain. Find concerts, shows, parties, family activities, and cultural events.',
    url: 'https://www.bahrainnights.com/events',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/events',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Events in Bahrain - Concerts, Shows & Happenings | BahrainNights',
    description: 'Discover the best events happening in Bahrain. Find concerts, shows, parties, family activities, and cultural events.',
  },
};
