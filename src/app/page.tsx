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

// Fetch featured events from different categories for "Happening Today"
async function getTodayEvents(): Promise<TodayEvent[]> {
  const today = new Date().toISOString().split('T')[0];

  // Get one featured/upcoming event from each category
  const categories = ['music', 'sports', 'arts', 'dining', 'community', 'shopping'];
  const events: TodayEvent[] = [];

  for (const category of categories) {
    const { data, error } = await supabaseAdmin
      .from('events')
      .select('id, title, slug, venue_name, time, cover_url, category, date, is_featured, view_count')
      .eq('status', 'published')
      .eq('category', category)
      .gte('date', today)
      .order('is_featured', { ascending: false })
      .order('view_count', { ascending: false })
      .order('date', { ascending: true })
      .limit(1)
      .single();

    if (!error && data) {
      const catInfo = categoryDisplay[data.category] || { label: data.category, icon: '📅' };
      events.push({
        id: data.id,
        title: data.title,
        slug: data.slug,
        venue: data.venue_name || 'TBA',
        time: data.time || 'Check listing',
        image: data.cover_url || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=500&fit=crop',
        category: catInfo.label,
        date: data.date,
      });
    }

    // Stop after 4 events
    if (events.length >= 4) break;
  }

  // If we don't have 4 events, fetch more from any category
  if (events.length < 4) {
    const existingIds = events.map(e => e.id);
    const { data: moreEvents } = await supabaseAdmin
      .from('events')
      .select('id, title, slug, venue_name, time, cover_url, category, date')
      .eq('status', 'published')
      .gte('date', today)
      .not('id', 'in', `(${existingIds.length > 0 ? existingIds.map(id => `'${id}'`).join(',') : "''"})`)
      .order('is_featured', { ascending: false })
      .order('view_count', { ascending: false })
      .limit(4 - events.length);

    if (moreEvents) {
      for (const data of moreEvents) {
        const catInfo = categoryDisplay[data.category] || { label: data.category, icon: '📅' };
        events.push({
          id: data.id,
          title: data.title,
          slug: data.slug,
          venue: data.venue_name || 'TBA',
          time: data.time || 'Check listing',
          image: data.cover_url || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=500&fit=crop',
          category: catInfo.label,
          date: data.date,
        });
      }
    }
  }

  return events;
}

// Fetch now showing movies
async function getMovies(): Promise<HomepageMovie[]> {
  const { data, error } = await supabaseAdmin
    .from('movies')
    .select('*')
    .eq('is_now_showing', true)
    .order('tmdb_rating', { ascending: false })
    .limit(4);

  if (error) {
    console.error('Error fetching movies:', error);
    return [];
  }

  return data || [];
}

// Fetch stats for the homepage
async function getStats() {
  const defaultStats = { events: 0, venues: 0, cinema: 0, offers: 0, explore: 0 };

  try {
    // Fetch counts in parallel
    const [eventsResult, venuesResult, moviesResult] = await Promise.all([
      supabaseAdmin.from('events').select('id', { count: 'exact', head: true }).eq('status', 'published'),
      supabaseAdmin.from('venues').select('id', { count: 'exact', head: true }),
      supabaseAdmin.from('movies').select('id', { count: 'exact', head: true }).eq('is_now_showing', true),
    ]);

    return {
      events: eventsResult.count || 0,
      venues: venuesResult.count || 0,
      cinema: moviesResult.count || 0,
      offers: 0, // Will be added later
      explore: 0, // Will be added later
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return defaultStats;
  }
}

// Server Component - data is fetched BEFORE the page renders
export default async function BahrainNightsHomepage() {
  // Fetch all data on the server - NO loading state needed!
  const [movies, stats, todayEvents] = await Promise.all([
    getMovies(),
    getStats(),
    getTodayEvents()
  ]);

  return (
    <HomePageClient
      initialMovies={movies}
      initialStats={stats}
      initialTodayEvents={todayEvents}
    />
  );
}

// Metadata for SEO
export const metadata = {
  title: 'BahrainNights | AI-Powered Cultural Discovery',
  description: "Bahrain's first AI-powered guide to events, dining, and culture. Always updated, always alive.",
  openGraph: {
    title: 'BahrainNights | AI-Powered Cultural Discovery',
    description: "Bahrain's first AI-powered guide to events, dining, and culture. Always updated, always alive.",
    url: 'https://bahrainnights.com',
    type: 'website',
  },
};
