import { OG_IMAGES } from '@/lib/og';
import { Suspense } from 'react';
import { createClient } from '@supabase/supabase-js';
import EventsPageClient, { Event, Attraction } from '@/components/events/EventsPageClient';
import InternationalEventsSection from '@/components/events/InternationalEventsSection';
import EventListSchema from '@/components/SEO/EventListSchema';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import InternalLinks, { guideLinks, placeLinks, eventLinks, dedupeLinks } from '@/components/SEO/InternalLinks';
import EventServicesPromo from '@/components/events/EventServicesPromo';
import { parseDate, toISODateString, todayInBahrain, formatEventDateForDisplay } from '@/lib/utils/date';
import { PUBLIC_EVENT_SELECT } from '@/lib/public-fields';

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

  /*
   * TODAY, IN ASIA/BAHRAIN, AT DATE GRANULARITY.
   *
   * `new Date().toISOString().split('T')[0]` is the UTC date. Bahrain is
   * UTC+3, so between 21:00 and 24:00 UTC the UTC date is already
   * TOMORROW in Bahrain. Comparing an event's date against the UTC date
   * drops today's evening events for three hours a day.
   *
   * The date must be Bahrain's calendar date, as YYYY-MM-DD, because the
   * stored `date` / `start_date` / `end_date` columns are calendar dates,
   * not timestamps.
   */
  const today = todayInBahrain();

  /*
   * THE UPCOMING FILTER, IN THE DATABASE.
   *
   * An event is upcoming when COALESCE(end_date, start_date, date) >= today.
   *
   * Three things this fixes:
   *
   *  1. The END date is used, so a multi-day event that is RUNNING RIGHT NOW
   *     still shows on its second day. The old filter looked at
   *     start_date, which hides an event that started yesterday and is on
   *     tonight.
   *
   *  2. The filter runs in the DATABASE. Filtering in the browser after the
   *     fetch still ships the dead rows to every visitor, still counts
   *     them, and still shows them in the payload.
   *
   *  3. `date` is the fallback for rows that have neither start_date nor
   *     end_date, so an event with only a date is not silently dropped.
   *
   * PostgREST cannot express COALESCE, so this is written as the
   * equivalent OR-chain: (end_date >= today) OR (end_date IS NULL AND
   * start_date >= today) OR (end_date IS NULL AND start_date IS NULL AND
   * date >= today).
   */
  const upcomingFilter = [
    `end_date.gte.${today}`,
    `and(end_date.is.null,start_date.gte.${today})`,
    `and(end_date.is.null,start_date.is.null,date.gte.${today})`,
  ].join(',');

  const { data, error } = await supabase
    .from('events')
      .select(PUBLIC_EVENT_SELECT)
    .eq('status', 'published')
    .eq('is_hidden', false)
    .eq('country', 'Bahrain')
    .or(upcomingFilter)
      .order('start_date', { ascending: true, nullsFirst: false })
      .order('id', { ascending: true });

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
    /*
     * The display date.
     *
     * The YEAR is included when it is not the current year, so an event on
     * 8 January 2027 reads "Fri, Jan 8, 2027" and cannot be mistaken for
     * an event that already happened.
     */
    const formattedDate = formatEventDateForDisplay(eventDate);

    // Handle end date for multi-day events
    const eventEndDate = event.end_date;
    const rawEndDate = eventEndDate ? normalizeToISODate(eventEndDate) : undefined;
    const formattedEndDate = eventEndDate && rawEndDate !== rawDate
      ? formatEventDateForDisplay(eventEndDate)
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

// Fetch international events (non-Bahrain)
async function getInternationalEvents() {
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  /*
   * TODAY IN BAHRAIN, at date granularity - the international listing had
   * the same UTC bug as the local one.
   */
  const today = todayInBahrain();

  /*
   * The same upcoming rule as the local listing: an event is listed while
   * it has not finished, using its END date.
   */
  const upcomingFilter = [
    `end_date.gte.${today}`,
    `and(end_date.is.null,start_date.gte.${today})`,
    `and(end_date.is.null,start_date.is.null,date.gte.${today})`,
  ].join(',');

  const { data, error } = await supabase
    .from('events')
    .select(`
      id, title, slug, description, category, venue_name, date, time,
      start_date, end_date, start_time, featured_image, cover_url,
      affiliate_url, country, city
    `)
    .neq('country', 'Bahrain')
    .eq('status', 'published')
    .eq('is_active', true)
    .or(upcomingFilter)
    .order('start_date', { ascending: true, nullsFirst: false })
    .order('id', { ascending: true });

  if (error || !data) {
    console.error('Error fetching international events:', error);
    return { events: [], eventsByCountry: {}, countries: [] };
  }

  /*
   * The upcoming window is applied in the DATABASE above, so it is not
   * repeated here. The old client-side "last 6 months" filter ran against
   * a UTC-derived date and compared a start date, which is how an
   * international event that had already finished stayed on the page.
   */
  const filteredEvents = data;

  // Build events by country
  const eventsByCountry: Record<string, typeof data> = {};
  const uniqueCountries = [...new Set(filteredEvents.map(e => e.country).filter(Boolean))];

  uniqueCountries.forEach(countryName => {
    eventsByCountry[countryName] = filteredEvents.filter(e => e.country === countryName);
  });

  // Build countries with flags
  const COUNTRY_CONFIG: Record<string, { flag: string; code: string }> = {
    'UAE': { flag: '🇦🇪', code: 'uae' },
    'United Arab Emirates': { flag: '🇦🇪', code: 'uae' },
    'Saudi Arabia': { flag: '🇸🇦', code: 'saudi-arabia' },
    'Qatar': { flag: '🇶🇦', code: 'qatar' },
    'Kuwait': { flag: '🇰🇼', code: 'kuwait' },
    'Oman': { flag: '🇴🇲', code: 'oman' },
    'Jordan': { flag: '🇯🇴', code: 'jordan' },
    'Lebanon': { flag: '🇱🇧', code: 'lebanon' },
    'Türkiye': { flag: '🇹🇷', code: 'turkiye' },
    'Turkey': { flag: '🇹🇷', code: 'turkiye' },
    'Egypt': { flag: '🇪🇬', code: 'egypt' },
    'Morocco': { flag: '🇲🇦', code: 'morocco' },
    'UK': { flag: '🇬🇧', code: 'uk' },
    'United Kingdom': { flag: '🇬🇧', code: 'uk' },
    'Germany': { flag: '🇩🇪', code: 'germany' },
    'France': { flag: '🇫🇷', code: 'france' },
    'Spain': { flag: '🇪🇸', code: 'spain' },
    'Italy': { flag: '🇮🇹', code: 'italy' },
    'India': { flag: '🇮🇳', code: 'india' },
  };

  const countries = uniqueCountries.map(countryName => {
    const config = COUNTRY_CONFIG[countryName] || { flag: '🌍', code: countryName.toLowerCase().replace(/\s+/g, '-') };
    return {
      code: config.code,
      name: countryName,
      flag: config.flag,
      fullName: countryName,
    };
  }).sort((a, b) => (eventsByCountry[b.name]?.length || 0) - (eventsByCountry[a.name]?.length || 0));

  return { events: filteredEvents, eventsByCountry, countries };
}

// Server Component - data is fetched BEFORE the page renders
export default async function EventsPage() {
  // Fetch all data on the server - NO loading state needed!
  const [events, attractions, internationalData] = await Promise.all([
    getEvents(),
    getAttractions(),
    getInternationalEvents()
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
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Events', url: 'https://www.bahrainnights.com/events' }
      ]} />
      <EventListSchema
        events={schemaEvents}
        pageTitle="Events in Bahrain"
        pageDescription="Discover concerts, nightlife, comedy, and more events in Bahrain"
        pageUrl="https://www.bahrainnights.com/events"
      />
      <Suspense fallback={null}>
        <EventsPageClient initialEvents={events} familyAttractions={attractions} />
      </Suspense>
      
      {/* International Events Section */}
      {internationalData.events.length > 0 && (
        <InternationalEventsSection
          events={internationalData.events}
          eventsByCountry={internationalData.eventsByCountry}
          countries={internationalData.countries}
        />
      )}
      
      <EventServicesPromo />
      <InternalLinks title="Explore Bahrain" links={dedupeLinks(eventLinks, guideLinks, placeLinks)} />
    </>
  );
}

// Metadata for SEO
export const metadata = {
  title: 'Events in Bahrain — Concerts & Shows',
  description: 'Discover the best events happening in Bahrain, from concerts and shows to parties, family activities and cultural events, updated daily.',
  keywords: ['events in Bahrain', 'Bahrain events', 'events happening in Bahrain', 'Bahrain parties', 'concerts in Bahrain', 'things to do in Bahrain'],
  openGraph: {
    title: 'Events in Bahrain - Concerts, Shows & Happenings',
    description: 'Discover the best events happening in Bahrain. Find concerts, shows, parties, family activities, and cultural events.',
    url: 'https://www.bahrainnights.com/events',
    type: 'website',
  images: [OG_IMAGES.events],
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/events',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Events in Bahrain — Concerts & Shows',
    description: 'Discover the best events happening in Bahrain. Find concerts, shows, parties, family activities and cultural events.',
  },
};
