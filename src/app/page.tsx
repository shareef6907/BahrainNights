import { supabaseAdmin } from '@/lib/supabase';
import HomePageClient, { HomepageMovie } from '@/components/home/HomePageClient';

// Revalidate every 5 minutes for fresh data
export const revalidate = 300;

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
  const [movies, stats] = await Promise.all([
    getMovies(),
    getStats()
  ]);

  return (
    <HomePageClient
      initialMovies={movies}
      initialStats={stats}
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
