import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAdminClient } from '@/lib/supabase/server';
import { LOCATION_DATA } from '@/types/blog';
import type { BlogArticle } from '@/types/database';

interface Props {
  params: Promise<{ country: string }>;
  searchParams: Promise<{ city?: string }>;
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { country } = await params;
  const { city } = await searchParams;
  const locationInfo = LOCATION_DATA[country];

  if (!locationInfo) {
    return { title: 'Not Found' };
  }

  const locationName = city ? `${city}, ${locationInfo.name}` : locationInfo.name;

  return {
    title: `${locationName} Events & Entertainment Guide | BahrainNights Blog`,
    description: `Explore events, nightlife, and entertainment in ${locationName}. Your guide to the best things to do and places to visit.`,
    keywords: [
      `${locationName} events`,
      `things to do in ${locationName}`,
      `${locationName} nightlife`,
      `${locationName} entertainment`,
    ],
  };
}

export async function generateStaticParams() {
  return Object.keys(LOCATION_DATA).map((country) => ({
    country,
  }));
}

export const revalidate = 3600;

// Helper: Filter out past events from blog articles
// Uses 'any' cast because event_date/event_end_date may not be in TypeScript types yet
function filterPastEvents(articles: BlogArticle[]): BlogArticle[] {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  
  return articles.filter(a => {
    // Cast to any to access event date fields that may not be in types yet
    const article = a as any;
    
    // If it has event dates, check if it's still current/upcoming
    const eventEndDate = article.event_end_date ? new Date(article.event_end_date) : null;
    const eventDate = article.event_date ? new Date(article.event_date) : null;
    const relevantDate = eventEndDate || eventDate;
    
    // If no event dates, it's a regular article - show it
    if (!relevantDate) return true;
    
    // Only show if event hasn't passed yet
    return relevantDate >= now;
  });
}

async function getArticles(country: string, city?: string) {
  const supabase = getAdminClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let query = (supabase as any)
    .from('blog_articles')
    .select('*')
    .eq('status', 'published')
    .eq('country', country)
    .order('created_at', { ascending: false });

  if (city) {
    query = query.ilike('city', city);
  }

  const { data: rawArticles } = await query.limit(50) as { data: BlogArticle[] | null };

  // CRITICAL: Filter out past events before returning
  return filterPastEvents(rawArticles || []).slice(0, 30);
}

export default async function CountryBlogPage({ params, searchParams }: Props) {
  const { country } = await params;
  const { city } = await searchParams;
  const locationInfo = LOCATION_DATA[country];

  if (!locationInfo) {
    notFound();
  }

  const articles = await getArticles(country, city);
  const locationName = city ? `${city}, ${locationInfo.name}` : locationInfo.name;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <section className="pt-32 pb-12 px-4 text-center">
        <span className="text-5xl mb-4 block">{locationInfo.flag}</span>
        <h1 className="text-3xl md:text-5xl font-black mb-4">
          Blog Articles from{' '}
          <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
            {locationName}
          </span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          {articles.length} articles about events and experiences in {locationName}
        </p>
      </section>

      {/* City Filter */}
      {!city && (
        <section className="px-4 pb-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href={`/regional/country/${country}`}
                className="px-4 py-2 bg-yellow-400 text-black rounded-full text-sm font-medium"
              >
                All Cities
              </Link>
              {locationInfo.cities.map((c) => (
                <Link
                  key={c}
                  href={`/regional/country/${country}?city=${c.toLowerCase()}`}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-sm transition-colors"
                >
                  {c}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Breadcrumb if city selected */}
      {city && (
        <section className="px-4 pb-8">
          <div className="max-w-6xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-gray-500">
              <Link href="/regional" className="hover:text-white transition-colors">Blog</Link>
              <span>/</span>
              <Link href={`/regional/country/${country}`} className="hover:text-white transition-colors">
                {locationInfo.name}
              </Link>
              <span>/</span>
              <span className="text-white capitalize">{city}</span>
            </nav>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          {articles.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/regional/${article.slug}`}
                  className="group block bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-yellow-400/50 transition-all"
                >
                  {article.featured_image ? (
                    <img
                      src={article.featured_image}
                      alt={article.title}
                      className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center">
                      <span className="text-4xl">📰</span>
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      {article.city && <span className="capitalize">{article.city}</span>}
                      {article.city && <span>&bull;</span>}
                      <span>{article.read_time_minutes} min read</span>
                    </div>
                    <h3 className="font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                        {article.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white/5 rounded-2xl">
              <p className="text-gray-400 text-lg mb-4">
                No articles for {locationName} yet.
              </p>
              <Link
                href={`/regional/places-to-go/${country}`}
                className="inline-block text-yellow-400 hover:text-yellow-300 font-medium"
              >
                View {locationInfo.name} Guide &rarr;
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Back Links */}
      <div className="text-center pb-16 flex justify-center gap-6">
        <Link
          href={`/regional/places-to-go/${country}`}
          className="text-yellow-400 hover:text-yellow-300 font-medium"
        >
          {locationInfo.name} Guide
        </Link>
        <Link
          href="/regional"
          className="text-gray-400 hover:text-white font-medium"
        >
          All Articles
        </Link>
      </div>
    </div>
  );
}
