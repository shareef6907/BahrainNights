import { Metadata } from 'next';
import { getAdminClient } from '@/lib/supabase/server';
import { BlogPageClient } from './BlogPageClient';

export const metadata: Metadata = {
  title: 'Blog | BahrainNights - Events, Culture & Nightlife',
  description: 'Discover the best places to go, events to attend, and experiences to have across Bahrain, UAE, Saudi Arabia, Qatar, and UK. Your guide to entertainment in the Middle East.',
  keywords: ['bahrain events', 'things to do in bahrain', 'places to go in uae', 'dubai nightlife', 'qatar events', 'middle east entertainment'],
  openGraph: {
    title: 'Blog | BahrainNights',
    description: 'Your guide to the best events and experiences across the Middle East',
    type: 'website',
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

  // Featured articles (admin-selected)
  const featured = articles.filter(a => a.is_featured).slice(0, 10);

  // Get trending (most viewed)
  const trending = [...articles]
    .sort((a, b) => (b.view_count || 0) - (a.view_count || 0))
    .slice(0, 15);

  // Get latest
  const latest = articles.slice(0, 15);

  // City-based filtering
  const bahrain = articles.filter(a =>
    a.country === 'bahrain' ||
    a.city?.toLowerCase().includes('manama') ||
    a.city?.toLowerCase().includes('bahrain')
  );

  const dubai = articles.filter(a =>
    a.city?.toLowerCase().includes('dubai')
  );

  const abuDhabi = articles.filter(a =>
    a.city?.toLowerCase().includes('abu dhabi') ||
    a.city?.toLowerCase().includes('abu-dhabi')
  );

  const riyadh = articles.filter(a =>
    a.city?.toLowerCase().includes('riyadh')
  );

  const jeddah = articles.filter(a =>
    a.city?.toLowerCase().includes('jeddah')
  );

  const doha = articles.filter(a =>
    a.city?.toLowerCase().includes('doha') ||
    a.country === 'qatar'
  );

  const london = articles.filter(a =>
    a.city?.toLowerCase().includes('london') ||
    a.country === 'uk'
  );

  return (
    <BlogPageClient
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
