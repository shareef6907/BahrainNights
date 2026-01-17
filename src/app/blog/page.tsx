import { Metadata } from 'next';
import Link from 'next/link';
import { getAdminClient } from '@/lib/supabase/server';
import { LOCATION_DATA } from '@/types/blog';
import type { BlogArticle } from '@/types/database';

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

export const revalidate = 3600; // Revalidate every hour

async function getBlogArticles() {
  const supabase = getAdminClient();

  // Get featured articles
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: featured } = await (supabase as any)
    .from('blog_articles')
    .select('*')
    .eq('status', 'published')
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(3) as { data: BlogArticle[] | null };

  // Get recent articles - order by created_at to ensure all published articles show
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: recent } = await (supabase as any)
    .from('blog_articles')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(12) as { data: BlogArticle[] | null };

  // Get article counts by country
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: countryCounts } = await (supabase as any)
    .from('blog_articles')
    .select('country')
    .eq('status', 'published') as { data: { country: string }[] | null };

  const countsByCountry: Record<string, number> = {};
  countryCounts?.forEach((item) => {
    countsByCountry[item.country] = (countsByCountry[item.country] || 0) + 1;
  });

  return { featured: featured || [], recent: recent || [], countsByCountry };
}

export default async function BlogPage() {
  const { featured, recent, countsByCountry } = await getBlogArticles();

  const countries = Object.entries(LOCATION_DATA).map(([slug, data]) => ({
    slug,
    ...data,
    articleCount: countsByCountry[slug] || 0,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-black mb-4">
          BahrainNights <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">Blog</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Stories, guides, and inspiration for your next adventure across the Middle East and beyond
        </p>
      </section>

      {/* Cornerstone Pages - SEO Power Links */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Explore by Location</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {countries.map((country) => (
              <Link
                key={country.slug}
                href={`/blog/places-to-go/${country.slug}`}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-yellow-400/50 rounded-xl p-4 text-center transition-all duration-300 group"
              >
                <span className="text-4xl block mb-2">{country.flag}</span>
                <p className="font-medium text-white group-hover:text-yellow-400 transition-colors">
                  Places to Go in {country.name}
                </p>
                {country.articleCount > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    {country.articleCount} articles
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featured.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-yellow-400">Featured</span> Stories
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {featured.map((article) => (
                <ArticleCard key={article.id} article={article} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Articles */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Latest Stories</h2>
          {recent.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {recent.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No articles yet. Check back soon!</p>
              <Link
                href="/events"
                className="inline-block mt-4 text-yellow-400 hover:text-yellow-300 font-medium"
              >
                Browse Events Instead &rarr;
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-16 px-4 bg-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Your Guide to the Best Experiences</h2>
          <p className="text-gray-400 leading-relaxed mb-8">
            BahrainNights Blog brings you the latest events, insider tips, and comprehensive guides
            to help you discover the best things to do across the Middle East. Whether you&apos;re looking
            for places to go in Bahrain, exciting events in Dubai, concerts in Saudi Arabia, or
            cultural experiences in Qatar, we&apos;ve got you covered.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/events"
              className="px-6 py-3 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black font-semibold rounded-full hover:shadow-lg hover:shadow-orange-500/25 transition-all"
            >
              Explore Events
            </Link>
            <Link
              href="/attractions"
              className="px-6 py-3 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition-all"
            >
              Discover Attractions
            </Link>
          </div>
        </div>
      </section>

      {/* Footer spacer */}
      <div className="h-16" />
    </div>
  );
}

interface ArticleCardProps {
  article: {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    featured_image: string | null;
    country: string;
    city: string | null;
    category: string | null;
    read_time_minutes: number;
    published_at: string;
  };
  featured?: boolean;
}

function ArticleCard({ article, featured }: ArticleCardProps) {
  return (
    <Link href={`/blog/${article.slug}`} className="group block">
      <article className={`bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-yellow-400/50 transition-all duration-300 ${featured ? 'ring-2 ring-yellow-400/20' : ''}`}>
        {article.featured_image ? (
          <div className="aspect-video relative overflow-hidden">
            <img
              src={article.featured_image}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            {featured && (
              <div className="absolute top-3 left-3 px-3 py-1 bg-yellow-400 text-black text-xs font-bold rounded-full">
                Featured
              </div>
            )}
          </div>
        ) : (
          <div className="aspect-video bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center">
            <span className="text-4xl">📰</span>
          </div>
        )}
        <div className="p-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <span className="capitalize">{article.country}</span>
            {article.city && (
              <>
                <span>&bull;</span>
                <span>{article.city}</span>
              </>
            )}
            <span>&bull;</span>
            <span>{article.read_time_minutes} min read</span>
          </div>
          <h3 className="font-bold text-lg text-white group-hover:text-yellow-400 transition-colors line-clamp-2">
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="text-gray-400 text-sm mt-2 line-clamp-2">
              {article.excerpt}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}
