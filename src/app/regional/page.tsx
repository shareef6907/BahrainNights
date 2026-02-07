import { Metadata } from 'next';
import { getAdminClient } from '@/lib/supabase/server';
import { RegionalPageClient } from './RegionalPageClient';

export const metadata: Metadata = {
  title: 'Regional Events | BahrainNights - Middle East Entertainment Guide',
  description: 'Discover the best events, concerts, and experiences across Bahrain, UAE, Saudi Arabia, Qatar, and UK. Your complete guide to entertainment in the Middle East.',
  keywords: ['middle east events', 'dubai events', 'saudi arabia events', 'qatar events', 'uae concerts', 'regional entertainment', 'gulf events'],
  openGraph: {
    title: 'Regional Events | BahrainNights',
    description: 'Your guide to the best events and experiences across the Middle East',
    url: 'https://www.bahrainnights.com/regional',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/regional',
  },
};

// Cache page for 5 minutes
export const revalidate = 300;

// Unified interface for both events and blog articles
export interface RegionalItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string | null;
  country: string;
  city: string | null;
  category: string;
  event_date: string | null;
  event_end_date: string | null;
  event_venue: string | null;
  affiliate_url: string | null;
  // For display purposes
  read_time_minutes?: number;
  view_count?: number;
  published_at?: string;
  is_featured?: boolean;
  isEvent?: boolean; // To distinguish events from articles
}

// Fetch upcoming events from events table
async function getUpcomingEvents(): Promise<RegionalItem[]> {
  try {
    const supabase = getAdminClient();
    const today = new Date().toISOString().split('T')[0];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: events, error } = await (supabase as any)
      .from('events')
      .select('id, title, slug, description, cover_url, featured_image, country, city, category, date, start_date, end_date, venue_name, affiliate_url, is_featured')
      .eq('status', 'published')
      .eq('is_active', true)
      .or(`start_date.gte.${today},date.gte.${today},end_date.gte.${today}`)
      .order('start_date', { ascending: true })
      .limit(200);

    if (error) {
      console.error('Events fetch error:', error);
      return [];
    }

    // Transform events to RegionalItem format
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (events || []).map((e: any) => ({
      id: e.id,
      title: e.title,
      slug: e.slug,
      excerpt: e.description?.substring(0, 200) || '',
      featured_image: e.cover_url || e.featured_image,
      country: e.country || 'Unknown',
      city: e.city,
      category: e.category || 'event',
      event_date: e.start_date || e.date,
      event_end_date: e.end_date,
      event_venue: e.venue_name,
      affiliate_url: e.affiliate_url,
      is_featured: e.is_featured,
      isEvent: true,
    }));
  } catch (err) {
    console.error('Events exception:', err);
    return [];
  }
}

// Fetch blog articles (non-event content)
async function getBlogArticles(): Promise<RegionalItem[]> {
  try {
    const supabase = getAdminClient();
    const today = new Date().toISOString().split('T')[0];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: articles, error } = await (supabase as any)
      .from('blog_articles')
      .select('id, title, slug, excerpt, featured_image, country, city, category, read_time_minutes, view_count, published_at, is_featured, event_date, event_end_date, event_venue, affiliate_url')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Blog articles fetch error:', error);
      return [];
    }

    // Filter out past events from articles
    const filtered = (articles || []).filter((a: any) => {
      const eventEndDate = a.event_end_date ? new Date(a.event_end_date) : null;
      const eventDate = a.event_date ? new Date(a.event_date) : null;
      const relevantDate = eventEndDate || eventDate;
      if (!relevantDate) return true;
      return relevantDate >= new Date(today);
    });

    return filtered.map((a: any) => ({
      id: a.id,
      title: a.title,
      slug: a.slug,
      excerpt: a.excerpt || '',
      featured_image: a.featured_image,
      country: a.country || 'Unknown',
      city: a.city,
      category: a.category || 'article',
      read_time_minutes: a.read_time_minutes,
      view_count: a.view_count,
      published_at: a.published_at,
      is_featured: a.is_featured,
      event_date: a.event_date || null,
      event_end_date: a.event_end_date || null,
      event_venue: a.event_venue || null,
      affiliate_url: a.affiliate_url || null,
      isEvent: false,
    }));
  } catch (err) {
    console.error('Blog articles exception:', err);
    return [];
  }
}

// Helper to filter items by city/country
function filterByLocation(items: RegionalItem[], cities: string[], countries: string[] = []): RegionalItem[] {
  return items.filter(item => {
    const cityMatch = cities.some(c => 
      item.city?.toLowerCase().includes(c.toLowerCase())
    );
    const countryMatch = countries.some(c => 
      item.country?.toLowerCase() === c.toLowerCase()
    );
    return cityMatch || countryMatch;
  });
}

export default async function RegionalPage() {
  // Fetch both events and blog articles
  const [events, articles] = await Promise.all([
    getUpcomingEvents(),
    getBlogArticles(),
  ]);

  // Combine all items
  const allItems = [...events, ...articles];

  // Featured items (prioritize events with is_featured)
  const featured = allItems
    .filter(item => item.is_featured)
    .slice(0, 10);

  // Group by location - EVENTS FIRST, then articles
  // Bahrain
  const bahrain = filterByLocation(allItems, ['manama', 'bahrain'], ['Bahrain']);
  
  // Dubai
  const dubai = filterByLocation(allItems, ['dubai'], []);
  
  // Abu Dhabi  
  const abuDhabi = filterByLocation(allItems, ['abu dhabi', 'abu-dhabi', 'yas island'], []);
  
  // Saudi Arabia - Riyadh
  const riyadh = filterByLocation(allItems, ['riyadh'], []);
  
  // Saudi Arabia - Jeddah
  const jeddah = filterByLocation(allItems, ['jeddah'], []);
  
  // Saudi Arabia - AlUla & other cities
  const saudiOther = filterByLocation(allItems, ['alula', 'al-ula', 'dammam', 'khobar'], ['Saudi Arabia'])
    .filter(item => !riyadh.includes(item) && !jeddah.includes(item));
  
  // Qatar - Doha
  const doha = filterByLocation(allItems, ['doha'], ['Qatar']);
  
  // Kuwait
  const kuwait = filterByLocation(allItems, ['kuwait city', 'kuwait'], ['Kuwait']);
  
  // Oman
  const oman = filterByLocation(allItems, ['muscat'], ['Oman']);
  
  // Egypt
  const egypt = filterByLocation(allItems, ['cairo', 'giza', 'alexandria'], ['Egypt']);
  
  // UK - London
  const london = filterByLocation(allItems, ['london'], ['UK', 'United Kingdom']);

  // Trending (most viewed articles + featured events)
  const trending = [...allItems]
    .sort((a, b) => {
      // Prioritize featured items
      if (a.is_featured && !b.is_featured) return -1;
      if (!a.is_featured && b.is_featured) return 1;
      // Then by view count
      return (b.view_count || 0) - (a.view_count || 0);
    })
    .slice(0, 15);

  // Latest (most recent by date)
  const latest = [...allItems]
    .sort((a, b) => {
      const dateA = a.event_date || a.published_at || '';
      const dateB = b.event_date || b.published_at || '';
      return dateB.localeCompare(dateA);
    })
    .slice(0, 15);

  // Check if we have content
  const hasContent = allItems.length > 0;

  return (
    <RegionalPageClient
      featured={featured}
      bahrain={bahrain}
      dubai={dubai}
      abuDhabi={abuDhabi}
      riyadh={riyadh}
      jeddah={jeddah}
      saudiOther={saudiOther}
      doha={doha}
      kuwait={kuwait}
      oman={oman}
      egypt={egypt}
      london={london}
      trending={trending}
      latest={latest}
      hasContent={hasContent}
      totalEvents={events.length}
    />
  );
}
