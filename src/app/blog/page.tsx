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

export const dynamic = 'force-dynamic'; // Always fetch fresh data

interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  country: string;
  city: string | null;
  category: string;
  read_time_minutes: number;
  view_count: number;
  published_at: string;
}

async function getBlogArticles() {
  try {
    const supabase = getAdminClient();

    // Get all published articles
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: articles, error } = await (supabase as any)
      .from('blog_articles')
      .select('id, title, slug, excerpt, content, featured_image, country, city, category, read_time_minutes, view_count, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false }) as { data: BlogArticle[] | null; error: Error | null };

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

  // Group by country
  const bahrain = articles.filter(a => a.country === 'bahrain');
  const uae = articles.filter(a => a.country === 'uae');
  const saudi = articles.filter(a => a.country === 'saudi-arabia');
  const qatar = articles.filter(a => a.country === 'qatar');
  const uk = articles.filter(a => a.country === 'uk');

  // Get trending (most viewed)
  const trending = [...articles]
    .sort((a, b) => (b.view_count || 0) - (a.view_count || 0))
    .slice(0, 10);

  // Get latest
  const latest = articles.slice(0, 10);

  return (
    <BlogPageClient
      bahrain={bahrain}
      uae={uae}
      saudi={saudi}
      qatar={qatar}
      uk={uk}
      trending={trending}
      latest={latest}
    />
  );
}
