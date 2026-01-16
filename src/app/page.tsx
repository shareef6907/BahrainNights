import { supabaseAdmin } from '@/lib/supabase';
import HomePageClient, { HomepageMovie, TodayEvent } from '@/components/home/HomePageClient';

// Revalidate every 5 minutes for fresh data
export const revalidate = 300;

// Category mapping for display
const categoryDisplay: Record<string, { label: string; icon: string }> = {
  music: { label: 'Live Music', icon: '🎵' },
  sports: { label: 'Sports', icon: '⚽' },
  arts: { label: 'Arts & Culture', icon: '🎨' },
  dining: { label: 'Dining', icon: '🍽️' },
  community: { label: 'Community', icon: '🤝' },
  shopping: { label: 'Shopping', icon: '🛍️' },
  special: { label: 'Special Event', icon: '⭐' },
  nightlife: { label: 'Nightlife', icon: '🌙' },
  family: { label: 'Family', icon: '👨‍👩‍👧‍👦' },
};

// Fetch featured events for "Happening Today" - ONLY today's events
async function getTodayEvents(): Promise<TodayEvent[]> {
  const today = new Date().toISOString().split('T')[0];

  // Fetch all today's events in a single query and group by category
  const { data: allTodayEvents, error } = await supabaseAdmin
    .from('events')
    .select('id, title, slug, venue_name, time, cover_url, category, date, is_featured, view_count')
    .eq('status', 'published')
    .eq('is_hidden', false)
    .eq('country', 'Bahrain')
    .eq('date', today)
    .order('is_featured', { ascending: false })
    .order('view_count', { ascending: false })
    .limit(20);

  if (error || !allTodayEvents) {
    console.error('Error fetching today events:', error);
    return [];
  }

  // Group by category and take the best event from each
  const categoryOrder = ['music', 'sports', 'arts', 'dining', 'community', 'shopping', 'nightlife', 'special', 'family'];
  const seenCategories = new Set<string>();
  const events: TodayEvent[] = [];

  // First pass: get one event per category
  for (const category of categoryOrder) {
    if (events.length >= 4) break;
    const event = allTodayEvents.find(e => e.category === category && !seenCategories.has(e.category));
    if (event) {
      seenCategories.add(event.category);
      const catInfo = categoryDisplay[event.category] || { label: event.category, icon: '📅' };
      events.push({
        id: event.id,
        title: event.title,
        slug: event.slug,
        venue: event.venue_name || 'TBA',
        time: event.time || 'Check listing',
        image: event.cover_url || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=500&fit=crop',
        category: catInfo.label,
        date: event.date,
      });
    }
  }

  // Second pass: fill remaining slots with any events
  if (events.length < 4) {
    const existingIds = new Set(events.map(e => e.id));
    for (const event of allTodayEvents) {
      if (events.length >= 4) break;
      if (!existingIds.has(event.id)) {
        const catInfo = categoryDisplay[event.category] || { label: event.category, icon: '📅' };
        events.push({
          id: event.id,
          title: event.title,
          slug: event.slug,
          venue: event.venue_name || 'TBA',
          time: event.time || 'Check listing',
          image: event.cover_url || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=500&fit=crop',
          category: catInfo.label,
          date: event.date,
        });
      }
    }
  }

  return events;
}

// Fetch now showing movies (excluding Indian language films and Mukta-only movies)
async function getMovies(): Promise<HomepageMovie[]> {
  // Indian language codes to exclude: hi=Hindi, ml=Malayalam, ta=Tamil, te=Telugu, kn=Kannada
  const indianLanguages = ['hi', 'ml', 'ta', 'te', 'kn'];

  const { data, error } = await supabaseAdmin
    .from('movies')
    .select('id, title, slug, poster_url, backdrop_url, tmdb_rating, genre, duration_minutes, language, release_date, is_now_showing, synopsis, trailer_url, movie_cast, scraped_from')
    .eq('is_now_showing', true)
    .not('language', 'in', `(${indianLanguages.join(',')})`)
    // Exclude movies that are ONLY from Mukta - only show VOX, Cineco, Seef, or manual entries
    .or('scraped_from.is.null,scraped_from.cs.{vox},scraped_from.cs.{cineco},scraped_from.cs.{seef}')
    .order('tmdb_rating', { ascending: false })
    .limit(4);

  if (error) {
    console.error('Error fetching movies:', error);
    return [];
  }

  return data || [];
}

// Fetch international events for homepage section
async function getInternationalEvents() {
  const today = new Date().toISOString().split('T')[0];

  // Fetch events including ongoing ones (end_date in future)
  // Filter: start_date >= today OR date >= today OR end_date >= today
  const { data, error } = await supabaseAdmin
    .from('events')
    .select(`
      id,
      title,
      slug,
      description,
      category,
      venue_name,
      date,
      time,
      start_date,
      start_time,
      end_date,
      featured_image,
      cover_url,
      affiliate_url,
      country,
      city
    `)
    .neq('country', 'Bahrain')
    .eq('status', 'published')
    .eq('is_active', true)
    .or(`start_date.gte.${today},date.gte.${today},end_date.gte.${today}`)
    .order('start_date', { ascending: true, nullsFirst: false })
    .limit(100);

  if (error) {
    console.error('Error fetching international events:', error);
    return [];
  }

  // Post-process: filter out events with start_date more than 6 months in the past
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const sixMonthsAgoStr = sixMonthsAgo.toISOString().split('T')[0];

  const filteredEvents = (data || [])
    .filter(event => {
      const startDate = event.start_date || event.date;
      return startDate >= sixMonthsAgoStr;
    })
    .sort((a, b) => {
      const getDisplayDate = (e: typeof a) => {
        const start = e.start_date || e.date;
        const end = e.end_date;
        if (start >= today) return start;
        if (end && end >= today) return end;
        return start;
      };
      return getDisplayDate(a).localeCompare(getDisplayDate(b));
    });

  // Diversify by country: ensure we show events from different countries
  // Take one event from each country first, then fill remaining slots
  const countryPriority = ['UAE', 'Saudi Arabia', 'Qatar', 'UK', 'Egypt', 'Türkiye'];
  const seenCountries = new Set<string>();
  const diverseEvents: typeof filteredEvents = [];

  // First pass: get one event per country (in priority order)
  for (const country of countryPriority) {
    const event = filteredEvents.find(e => e.country === country && !seenCountries.has(e.country));
    if (event) {
      seenCountries.add(event.country);
      diverseEvents.push(event);
    }
  }

  // Second pass: add any remaining countries not in priority list
  for (const event of filteredEvents) {
    if (!seenCountries.has(event.country)) {
      seenCountries.add(event.country);
      diverseEvents.push(event);
    }
  }

  // Third pass: fill remaining slots with events from any country
  const diverseEventIds = new Set(diverseEvents.map(e => e.id));
  for (const event of filteredEvents) {
    if (!diverseEventIds.has(event.id)) {
      diverseEvents.push(event);
    }
  }

  return diverseEvents;
}

// Fetch stats for the homepage
async function getStats() {
  const defaultStats = { events: 0, venues: 0, cinema: 0, offers: 0, explore: 0, attractions: 0 };

  try {
    // Fetch counts in parallel (only Bahrain events for event count)
    const [eventsResult, venuesResult, moviesResult, attractionsResult] = await Promise.all([
      supabaseAdmin.from('events').select('id', { count: 'exact', head: true }).eq('status', 'published').eq('is_hidden', false).eq('country', 'Bahrain'),
      supabaseAdmin.from('venues').select('id', { count: 'exact', head: true }),
      supabaseAdmin.from('movies').select('id', { count: 'exact', head: true }).eq('is_now_showing', true),
      supabaseAdmin.from('attractions').select('id', { count: 'exact', head: true }).eq('is_active', true),
    ]);

    return {
      events: eventsResult.count || 0,
      venues: venuesResult.count || 0,
      cinema: moviesResult.count || 0,
      offers: 0, // Will be added later
      explore: 0, // Will be added later
      attractions: attractionsResult.count || 0,
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return defaultStats;
  }
}

// Server Component - data is fetched BEFORE the page renders
export default async function BahrainNightsHomepage() {
  // Fetch all data on the server - NO loading state needed!
  const [movies, stats, todayEvents, internationalEvents] = await Promise.all([
    getMovies(),
    getStats(),
    getTodayEvents(),
    getInternationalEvents()
  ]);

  return (
    <HomePageClient
      initialMovies={movies}
      initialStats={stats}
      initialTodayEvents={todayEvents}
      initialInternationalEvents={internationalEvents}
    />
  );
}

// Metadata for SEO
export const metadata = {
  title: 'BahrainNights | Events, Venues, Cinema & Nightlife in Bahrain',
  description: "Discover Bahrain's best events, venues, cinema, nightlife, and dining. Your curated guide to everything happening in the Kingdom. Go Out. Live More.",
  keywords: ['Bahrain Nights', 'events in Bahrain', 'nightlife in Bahrain', 'things to do in Bahrain', 'venues in Bahrain', 'cinema Bahrain'],
  openGraph: {
    title: 'BahrainNights | Events, Venues & Nightlife in Bahrain',
    description: "Your curated guide to Bahrain's best experiences",
    url: 'https://bahrainnights.com',
    siteName: 'BahrainNights',
    type: 'website',
    images: [
      {
        url: 'https://bahrainnights-production.s3.me-south-1.amazonaws.com/branding/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BahrainNights - Events, Venues & Nightlife in Bahrain',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BahrainNights | Events, Venues & Nightlife in Bahrain',
    description: "Your curated guide to Bahrain's best experiences",
    images: ['https://bahrainnights-production.s3.me-south-1.amazonaws.com/branding/og-image.jpg'],
  },
};
