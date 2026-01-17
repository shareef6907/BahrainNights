import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAdminClient } from '@/lib/supabase/server';
import { LOCATION_DATA } from '@/types/blog';
import type { BlogArticle } from '@/types/database';

interface Props {
  params: Promise<{ location: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { location } = await params;
  const locationInfo = LOCATION_DATA[location];

  if (!locationInfo) {
    return { title: 'Not Found' };
  }

  return {
    title: `Places to Go in ${locationInfo.name} - Best Events, Nightlife & Attractions | BahrainNights`,
    description: `Discover the best places to go in ${locationInfo.name}. Find events, concerts, nightlife, restaurants, and attractions. Your complete guide to ${locationInfo.name} entertainment.`,
    keywords: [
      `places to go in ${locationInfo.name}`,
      `things to do in ${locationInfo.name}`,
      `${locationInfo.name} events`,
      `${locationInfo.name} nightlife`,
      `${locationInfo.name} attractions`,
      `best places in ${locationInfo.name}`,
      `what to do in ${locationInfo.name}`,
      `${locationInfo.name} concerts`,
      `${locationInfo.name} entertainment`,
    ],
    openGraph: {
      title: `Places to Go in ${locationInfo.name} | BahrainNights`,
      description: `Your complete guide to the best events, nightlife, and attractions in ${locationInfo.name}`,
      type: 'website',
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(LOCATION_DATA).map((location) => ({
    location,
  }));
}

export const revalidate = 3600; // Revalidate every hour

async function getLocationData(location: string) {
  const supabase = getAdminClient();

  // Get all articles for this country
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: articles } = await (supabase as any)
    .from('blog_articles')
    .select('*')
    .eq('status', 'published')
    .eq('country', location)
    .order('created_at', { ascending: false })
    .limit(20) as { data: BlogArticle[] | null };

  // Get events count for this country (approximate from location field)
  const locationInfo = LOCATION_DATA[location];
  const { count: eventsCount } = await supabase
    .from('events')
    .select('*', { count: 'exact', head: true })
    .or(locationInfo?.cities.map(city => `venue_name.ilike.%${city}%,venue_address.ilike.%${city}%`).join(',') || '')
    .eq('is_active', true);

  // Get featured articles
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: featured } = await (supabase as any)
    .from('blog_articles')
    .select('*')
    .eq('status', 'published')
    .eq('country', location)
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(3) as { data: BlogArticle[] | null };

  return {
    articles: articles || [],
    featured: featured || [],
    eventsCount: eventsCount || 0,
  };
}

export default async function CornerstonePage({ params }: Props) {
  const { location } = await params;
  const locationInfo = LOCATION_DATA[location];

  if (!locationInfo) {
    notFound();
  }

  const { articles, featured, eventsCount } = await getLocationData(location);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 text-center bg-gradient-to-b from-slate-900 to-slate-950">
        <span className="text-7xl mb-6 block">{locationInfo.flag}</span>
        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
          Places to Go in{' '}
          <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
            {locationInfo.name}
          </span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
          Your complete guide to the best events, nightlife, restaurants, and attractions in {locationInfo.name}
        </p>

        {/* Stats */}
        <div className="flex justify-center gap-12 text-center">
          <div>
            <p className="text-4xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              {eventsCount > 0 ? eventsCount.toLocaleString() : '50'}+
            </p>
            <p className="text-gray-500">Events</p>
          </div>
          <div>
            <p className="text-4xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              {articles.length}
            </p>
            <p className="text-gray-500">Articles</p>
          </div>
          <div>
            <p className="text-4xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              {locationInfo.cities.length}
            </p>
            <p className="text-gray-500">Cities</p>
          </div>
        </div>
      </section>

      {/* Cities Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Explore Cities in {locationInfo.name}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {locationInfo.cities.map((city) => (
              <Link
                key={city}
                href={`/blog/country/${location}?city=${city.toLowerCase()}`}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-yellow-400/50 rounded-xl p-6 text-center transition-all duration-300 group"
              >
                <h3 className="font-bold text-lg text-white group-hover:text-yellow-400 transition-colors">
                  {city}
                </h3>
                <p className="text-gray-500 text-sm mt-1">View Guide &rarr;</p>
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
              <span className="text-yellow-400">Featured</span> Guides
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {featured.map((article) => (
                <ArticleCard key={article.id} article={article} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SEO Content Block */}
      <section className="py-16 px-4 bg-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Why Visit {locationInfo.name}?</h2>
          <div className="prose prose-invert prose-lg">
            <p className="text-gray-300 leading-relaxed mb-6">
              {locationInfo.description}
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              At BahrainNights, we curate the best events and experiences across {locationInfo.name},
              helping you discover hidden gems and popular hotspots alike. From intimate jazz
              nights to massive music festivals, from Michelin-starred restaurants to cozy
              local cafes – we&apos;ve got you covered.
            </p>

            <h3 className="text-2xl font-bold text-white mt-8 mb-4">What to Expect</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-yellow-400">🎵</span> Live concerts and music events
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-400">🎭</span> Comedy shows and theatrical performances
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-400">🍽️</span> Fine dining and culinary experiences
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-400">🎶</span> Nightclubs and lounges
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-400">👨‍👩‍👧‍👦</span> Family-friendly attractions
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-400">🎨</span> Cultural festivals and exhibitions
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* All Articles Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Latest from {locationInfo.name}</h2>
          {articles.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white/5 rounded-2xl">
              <p className="text-gray-400 text-lg mb-4">
                No articles for {locationInfo.name} yet. Check back soon!
              </p>
              <Link
                href="/events"
                className="inline-block text-yellow-400 hover:text-yellow-300 font-medium"
              >
                Browse Events Instead &rarr;
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-yellow-500/20 to-pink-500/20 border border-yellow-400/30 rounded-3xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Explore {locationInfo.name}?
          </h2>
          <p className="text-gray-400 mb-8">
            Discover upcoming events, concerts, and experiences happening across {locationInfo.name}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/events"
              className="px-8 py-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black font-bold rounded-full hover:shadow-lg hover:shadow-orange-500/25 transition-all"
            >
              Browse Events
            </Link>
            <Link
              href="/attractions"
              className="px-8 py-4 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition-all"
            >
              Discover Attractions
            </Link>
          </div>
        </div>
      </section>

      {/* Back to Blog */}
      <div className="text-center pb-16">
        <Link
          href="/blog"
          className="inline-block text-yellow-400 hover:text-yellow-300 font-medium"
        >
          &larr; Back to Blog
        </Link>
      </div>
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
            {article.city && <span>{article.city}</span>}
            {article.city && <span>&bull;</span>}
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
