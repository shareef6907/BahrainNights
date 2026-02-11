import { supabaseAdmin } from '@/lib/supabase';
import HomePageClient, { HomepageMovie, TodayEvent } from '@/components/home/HomePageClient';

// Force dynamic rendering - page needs real-time data
export const dynamic = 'force-dynamic';

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

// Fetch upcoming events - show next 4 events regardless of date
async function getTodayEvents(): Promise<TodayEvent[]> {
  const today = new Date().toISOString().split('T')[0];

  // Fetch upcoming events (today and future) - not just today
  const { data: upcomingEvents, error } = await supabaseAdmin
    .from('events')
    .select('id, title, slug, venue_name, time, cover_url, category, date, is_featured, view_count')
    .eq('status', 'published')
    .eq('is_hidden', false)
    .eq('country', 'Bahrain')
    .gte('date', today)
    .order('date', { ascending: true })
    .order('is_featured', { ascending: false })
    .order('view_count', { ascending: false })
    .limit(20);

  if (error || !upcomingEvents) {
    console.error('Error fetching upcoming events:', error);
    return [];
  }

  // Group by category and take the best event from each for diversity
  const categoryOrder = ['music', 'sports', 'arts', 'dining', 'community', 'shopping', 'nightlife', 'special', 'family'];
  const seenCategories = new Set<string>();
  const events: TodayEvent[] = [];

  // First pass: get one event per category (from soonest events)
  for (const category of categoryOrder) {
    if (events.length >= 4) break;
    const event = upcomingEvents.find(e => e.category === category && !seenCategories.has(e.category));
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

  // Second pass: fill remaining slots with soonest events
  if (events.length < 4) {
    const existingIds = new Set(events.map(e => e.id));
    for (const event of upcomingEvents) {
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

// Fetch now showing movies (VOX only + manual entries, excluding Indian language films)
async function getMovies(): Promise<HomepageMovie[]> {
  // Indian language codes to exclude: hi=Hindi, ml=Malayalam, ta=Tamil, te=Telugu, kn=Kannada
  const indianLanguages = ['hi', 'ml', 'ta', 'te', 'kn'];

  const { data, error } = await supabaseAdmin
    .from('movies')
    .select('id, title, slug, poster_url, backdrop_url, tmdb_rating, genre, duration_minutes, language, release_date, is_now_showing, synopsis, trailer_url, movie_cast, scraped_from')
    .eq('is_now_showing', true)
    .not('language', 'in', `(${indianLanguages.join(',')})`)
    // Only show VOX movies or manual entries (no scraped_from)
    .or('scraped_from.is.null,scraped_from.cs.{vox}')
    // Must have a valid poster URL (starts with http)
    .like('poster_url', 'http%')
    .order('tmdb_rating', { ascending: false })
    .limit(8); // Fetch more to filter duplicates

  if (error) {
    console.error('Error fetching movies:', error);
    return [];
  }

  // Filter out movies with placeholder images and duplicates
  const validMovies = (data || []).filter((movie: HomepageMovie) => {
    const poster = movie.poster_url || '';
    // Exclude placeholder images
    if (poster.includes('placeholder') || poster.includes('null') || !poster.startsWith('http')) {
      return false;
    }
    return true;
  });

  // Remove duplicates by title (case-insensitive)
  const seen = new Set<string>();
  const uniqueMovies = validMovies.filter((movie: HomepageMovie) => {
    const key = movie.title.toLowerCase().trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return uniqueMovies.slice(0, 4);
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
  const defaultStats = { events: 0, venues: 0, cinema: 0, offers: 0, explore: 0, attractions: 0, blog: 0 };

  try {
    // Fetch counts in parallel (only Bahrain events for event count)
    const [eventsResult, venuesResult, moviesResult, attractionsResult, blogResult] = await Promise.all([
      supabaseAdmin.from('events').select('id', { count: 'exact', head: true }).eq('status', 'published').eq('is_hidden', false).eq('country', 'Bahrain'),
      supabaseAdmin.from('venues').select('id', { count: 'exact', head: true }),
      supabaseAdmin.from('movies').select('id', { count: 'exact', head: true }).eq('is_now_showing', true),
      supabaseAdmin.from('attractions').select('id', { count: 'exact', head: true }).eq('is_active', true),
      supabaseAdmin.from('blog_articles').select('id', { count: 'exact', head: true }).eq('status', 'published'),
    ]);

    return {
      events: eventsResult.count || 0,
      venues: venuesResult.count || 0,
      cinema: moviesResult.count || 0,
      offers: 0, // Will be added later
      explore: 0, // Will be added later
      attractions: attractionsResult.count || 0,
      blog: blogResult.count || 0,
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return defaultStats;
  }
}

// Fetch happening now events (events happening today)
async function getHappeningNowEvents() {
  const today = new Date().toISOString().split('T')[0];
  
  const { data, error } = await supabaseAdmin
    .from('events')
    .select('id, title, slug, venue_name, cover_url, category, date, time, end_time')
    .eq('status', 'published')
    .eq('is_hidden', false)
    .eq('country', 'Bahrain')
    .eq('date', today)
    .order('time', { ascending: true })
    .limit(6);

  if (error) {
    console.error('Error fetching happening now events:', error);
    return [];
  }

  return data || [];
}

// Fetch trending data for Trending This Week section
async function getTrendingData() {
  const today = new Date().toISOString().split('T')[0];
  
  const [venuesResult, eventsResult] = await Promise.all([
    // Top 5 venues by view count
    supabaseAdmin
      .from('venues')
      .select('id, name, slug, category, area, rating, image_url, view_count')
      .eq('status', 'approved')
      .order('view_count', { ascending: false })
      .limit(5),
    // Top 3 upcoming events by view count  
    supabaseAdmin
      .from('events')
      .select('id, title, slug, venue_name, date, cover_url, view_count')
      .eq('status', 'published')
      .eq('is_hidden', false)
      .eq('country', 'Bahrain')
      .gte('date', today)
      .order('view_count', { ascending: false })
      .limit(3),
  ]);

  return {
    venues: venuesResult.data || [],
    events: eventsResult.data || [],
  };
}

// Fetch surprise me data (random events, places, attractions)
async function getSurpriseData() {
  const today = new Date().toISOString().split('T')[0];
  
  const [eventsResult, venuesResult, attractionsResult] = await Promise.all([
    // Random upcoming events
    supabaseAdmin
      .from('events')
      .select('id, title, slug, venue_name, cover_url, category, time')
      .eq('status', 'published')
      .eq('is_hidden', false)
      .eq('country', 'Bahrain')
      .gte('date', today)
      .limit(10),
    // Random venues/places
    supabaseAdmin
      .from('venues')
      .select('id, name, slug, cover_url, category')
      .limit(10),
    // Random attractions
    supabaseAdmin
      .from('attractions')
      .select('id, name, slug, featured_image, category')
      .eq('is_active', true)
      .limit(10),
  ]);

  const events = (eventsResult.data || []).map(e => ({
    type: 'event' as const,
    id: e.id,
    title: e.title,
    slug: e.slug,
    image: e.cover_url || '/images/event-placeholder.jpg',
    venue: e.venue_name,
    category: e.category || 'Event',
    time: e.time,
    href: `/events/${e.slug}`,
  }));

  const places = (venuesResult.data || []).map(v => ({
    type: 'place' as const,
    id: v.id,
    title: v.name,
    slug: v.slug,
    image: v.cover_url || '/images/venue-placeholder.jpg',
    category: v.category || 'Venue',
    href: `/venues/${v.slug}`,
  }));

  const attractions = (attractionsResult.data || []).map(a => ({
    type: 'attraction' as const,
    id: a.id,
    title: a.name,
    slug: a.slug,
    image: a.featured_image || '/images/attraction-placeholder.jpg',
    category: a.category || 'Attraction',
    href: `/attractions/${a.slug}`,
  }));

  return { events, places, attractions };
}

// Server Component - data is fetched BEFORE the page renders
export default async function BahrainNightsHomepage() {
  // Fetch all data on the server - NO loading state needed!
  const [movies, stats, todayEvents, internationalEvents, happeningNowEvents, surpriseData, trendingData] = await Promise.all([
    getMovies(),
    getStats(),
    getTodayEvents(),
    getInternationalEvents(),
    getHappeningNowEvents(),
    getSurpriseData(),
    getTrendingData()
  ]);

  return (
    <HomePageClient
      initialMovies={movies}
      initialStats={stats}
      initialTodayEvents={todayEvents}
      initialInternationalEvents={internationalEvents}
      initialHappeningNowEvents={happeningNowEvents}
      initialSurpriseData={surpriseData}
      initialTrendingData={trendingData}
    />
  );
}

// Metadata for SEO
export const metadata = {
  title: 'BahrainNights | Events, Venues, Cinema & Nightlife in Bahrain',
  description: "Discover Bahrain's best events, venues, cinema, nightlife, and dining. Your curated guide to everything happening in the Kingdom. Go Out. Live More.",
  keywords: ['Bahrain Nights', 'events in Bahrain', 'nightlife in Bahrain', 'things to do in Bahrain', 'venues in Bahrain', 'cinema Bahrain'],
  alternates: {
    canonical: 'https://www.bahrainnights.com',
  },
  openGraph: {
    title: 'BahrainNights | Events, Venues & Nightlife in Bahrain',
    description: "Your curated guide to Bahrain's best experiences",
    url: 'https://www.bahrainnights.com',
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
