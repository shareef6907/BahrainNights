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

// Cache page for 5 minutes - HUGE performance boost
export const revalidate = 300;

interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string | null;
  country: string;
  city: string | null;
  category: string;
  read_time_minutes: number;
  view_count: number;
  published_at: string;
  is_featured?: boolean;
  event_date?: string | null;
  event_end_date?: string | null;
  event_venue?: string | null;
  affiliate_url?: string | null;
}

async function getBlogArticles() {
  try {
    const supabase = getAdminClient();

    // OPTIMIZED: Only fetch fields needed for listing (NO content field - it's heavy)
    // Content is fetched on-demand when modal opens
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: articles, error } = await (supabase as any)
      .from('blog_articles')
      .select('id, title, slug, excerpt, featured_image, country, city, category, read_time_minutes, view_count, published_at, is_featured, event_date, event_end_date, event_venue, affiliate_url')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(100) as { data: BlogArticle[] | null; error: Error | null };

    if (error) {
      console.error('Blog articles fetch error:', error);
      return [];
    }

    return articles || [];
  } catch (err) {
    console.error('Blog articles exception:', err);
    return [];
  }
}

export default async function BlogPage() {
  const articles = await getBlogArticles();

  // CRITICAL: Filter out past events from ALL listings
  // If article has event_date or event_end_date, only show if event hasn't passed
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Compare dates only, not time
  
  // Helper function: returns true if article should be shown (not a past event)
  const isNotPastEvent = (a: BlogArticle): boolean => {
    const eventEndDate = a.event_end_date ? new Date(a.event_end_date) : null;
    const eventDate = a.event_date ? new Date(a.event_date) : null;
    
    // Use end date if available, otherwise use event date
    const relevantDate = eventEndDate || eventDate;
    
    // If no event dates, it's a regular article - show it
    if (!relevantDate) return true;
    
    // Only show if event hasn't passed yet (today or future)
    return relevantDate >= now;
  };

  // Pre-filter all articles to exclude past events
  const activeArticles = articles.filter(isNotPastEvent);
  
  // Featured articles (admin-selected)
  const featured = activeArticles.filter(a => a.is_featured).slice(0, 10);

  // Get trending (most viewed) - from active articles only
  const trending = [...activeArticles]
    .sort((a, b) => (b.view_count || 0) - (a.view_count || 0))
    .slice(0, 15);

  // Get latest - from active articles only
  const latest = activeArticles.slice(0, 15);

  // City-based filtering - all from active articles only
  const bahrain = activeArticles.filter(a =>
    a.country === 'bahrain' ||
    a.city?.toLowerCase().includes('manama') ||
    a.city?.toLowerCase().includes('bahrain')
  );

  const dubai = activeArticles.filter(a =>
    a.city?.toLowerCase().includes('dubai')
  );

  const abuDhabi = activeArticles.filter(a =>
    a.city?.toLowerCase().includes('abu dhabi') ||
    a.city?.toLowerCase().includes('abu-dhabi')
  );

  const riyadh = activeArticles.filter(a =>
    a.city?.toLowerCase().includes('riyadh')
  );

  const jeddah = activeArticles.filter(a =>
    a.city?.toLowerCase().includes('jeddah')
  );

  const doha = activeArticles.filter(a =>
    a.city?.toLowerCase().includes('doha') ||
    a.country === 'qatar'
  );

  const london = activeArticles.filter(a =>
    a.city?.toLowerCase().includes('london') ||
    a.country === 'uk'
  );

  return (
    <RegionalPageClient
      featured={featured}
      bahrain={bahrain}
      dubai={dubai}
      abuDhabi={abuDhabi}
      riyadh={riyadh}
      jeddah={jeddah}
      doha={doha}
      london={london}
      trending={trending}
      latest={latest}
    />
  );
}
