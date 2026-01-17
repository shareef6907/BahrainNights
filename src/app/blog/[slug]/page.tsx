import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAdminClient } from '@/lib/supabase/server';
import type { BlogArticle } from '@/types/database';
import EventSchema from '@/components/SEO/EventSchema';

interface Props {
  params: Promise<{ slug: string }>;
}

interface ArticleMeta {
  title: string;
  meta_title: string | null;
  meta_description: string | null;
  excerpt: string | null;
  featured_image: string | null;
  keywords: string[] | null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = getAdminClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: article } = await (supabase as any)
    .from('blog_articles')
    .select('title, meta_title, meta_description, excerpt, featured_image, keywords')
    .eq('slug', slug)
    .eq('status', 'published')
    .single() as { data: ArticleMeta | null };

  if (!article) {
    return { title: 'Article Not Found | BahrainNights' };
  }

  return {
    title: article.meta_title || `${article.title} | BahrainNights Blog`,
    description: article.meta_description || article.excerpt || `Read about ${article.title} on BahrainNights Blog`,
    keywords: article.keywords?.join(', '),
    openGraph: {
      title: article.meta_title || article.title,
      description: article.meta_description || article.excerpt || '',
      images: article.featured_image ? [article.featured_image] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt || '',
      images: article.featured_image ? [article.featured_image] : [],
    },
  };
}

export const revalidate = 3600; // Revalidate every hour

interface RelatedArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  country: string;
  city: string | null;
  read_time_minutes: number;
}

async function getArticle(slug: string) {
  const supabase = getAdminClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: article, error } = await (supabase as any)
    .from('blog_articles')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single() as { data: BlogArticle | null; error: Error | null };

  if (error || !article) return null;

  // Increment view count (fire and forget)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (supabase as any)
    .from('blog_articles')
    .update({ view_count: (article.view_count || 0) + 1 })
    .eq('id', article.id)
    .then(() => {});

  // Get event details if linked (for CTA and structured data)
  interface LinkedEvent {
    title: string;
    description: string | null;
    start_date: string;
    start_time: string | null;
    end_date: string | null;
    end_time: string | null;
    venue_name: string | null;
    venue_address: string | null;
    price: string | null;
    image_url: string | null;
    cover_url: string | null;
    category: string | null;
    slug: string;
    affiliate_url: string | null;
  }

  let eventSlug: string | null = null;
  let eventAffiliateUrl: string | null = null;
  let eventData: LinkedEvent | null = null;

  if (article.event_id) {
    const { data: event } = await supabase
      .from('events')
      .select('title, description, start_date, start_time, end_date, end_time, venue_name, venue_address, price, image_url, cover_url, category, slug, affiliate_url')
      .eq('id', article.event_id)
      .single() as { data: LinkedEvent | null };
    if (event) {
      eventSlug = event.slug;
      eventAffiliateUrl = event.affiliate_url;
      eventData = event;
    }
  }

  // Get related articles
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: related } = await (supabase as any)
    .from('blog_articles')
    .select('id, title, slug, excerpt, featured_image, country, city, read_time_minutes')
    .eq('status', 'published')
    .eq('country', article.country)
    .neq('id', article.id)
    .order('created_at', { ascending: false })
    .limit(3) as { data: RelatedArticle[] | null };

  return { article, related: related || [], eventSlug, eventAffiliateUrl, eventData };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const data = await getArticle(slug);

  if (!data) {
    notFound();
  }

  const { article, related, eventSlug, eventAffiliateUrl, eventData } = data;

  const publishedDate = new Date(article.published_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      {/* Event Structured Data for SEO - only for event-related articles */}
      {eventData && (
        <EventSchema
          event={{
            title: eventData.title,
            description: eventData.description,
            start_date: eventData.start_date,
            start_time: eventData.start_time,
            end_date: eventData.end_date,
            end_time: eventData.end_time,
            venue_name: eventData.venue_name,
            venue_address: eventData.venue_address,
            price: eventData.price,
            booking_url: eventData.affiliate_url,
            image_url: eventData.image_url,
            cover_url: eventData.cover_url,
            category: eventData.category,
            slug: eventData.slug,
          }}
        />
      )}
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
        {/* Hero Image */}
      {article.featured_image && (
        <div className="w-full h-[40vh] md:h-[50vh] relative">
          <img
            src={article.featured_image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
        </div>
      )}

      {/* Article Content */}
      <article className={`max-w-3xl mx-auto px-4 py-8 ${article.featured_image ? '-mt-32 relative z-10' : 'pt-32'}`}>
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-4 flex items-center gap-2">
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          <span>/</span>
          <Link href={`/blog/places-to-go/${article.country}`} className="hover:text-white transition-colors capitalize">
            {article.country.replace('-', ' ')}
          </Link>
          {article.city && (
            <>
              <span>/</span>
              <span className="capitalize">{article.city}</span>
            </>
          )}
        </nav>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
          {article.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-8 text-sm">
          <span>{publishedDate}</span>
          <span>&bull;</span>
          <span>{article.read_time_minutes} min read</span>
          <span>&bull;</span>
          <span>{article.view_count.toLocaleString()} views</span>
          {article.category && (
            <>
              <span>&bull;</span>
              <span className="px-2 py-1 bg-yellow-400/20 text-yellow-400 rounded-full text-xs">
                {article.category}
              </span>
            </>
          )}
        </div>

        {/* Content */}
        <div
          className="prose prose-invert prose-lg max-w-none
            prose-headings:text-white prose-headings:font-bold
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-gray-300 prose-p:leading-relaxed
            prose-a:text-yellow-400 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white
            prose-blockquote:border-yellow-400 prose-blockquote:text-gray-400 prose-blockquote:italic
            prose-ul:text-gray-300 prose-ol:text-gray-300
            prose-li:marker:text-yellow-400
            prose-img:rounded-xl prose-img:shadow-xl"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Event Link */}
        {article.event_id && eventSlug && (
          <div className="mt-12 p-6 bg-gradient-to-r from-yellow-500/20 to-pink-500/20 border border-yellow-400/30 rounded-2xl">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <span>🎟️</span> Get Tickets
            </h3>
            <p className="text-gray-400 mb-4">Don&apos;t miss this event!</p>
            <div className="flex flex-wrap gap-3">
              {eventAffiliateUrl && (
                <a
                  href={eventAffiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black font-bold px-6 py-3 rounded-full hover:shadow-lg hover:shadow-orange-500/25 transition-all"
                >
                  Buy Tickets &rarr;
                </a>
              )}
              <Link
                href={`/events/${eventSlug}`}
                className="inline-block bg-white/10 border border-white/20 px-6 py-3 rounded-full hover:bg-white/20 transition-all"
              >
                View Event Details
              </Link>
            </div>
          </div>
        )}

        {/* Venue Link */}
        {article.venue_id && (
          <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-2xl">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <span>📍</span> Visit the Venue
            </h3>
            <p className="text-gray-400 mb-4">Discover more about this location</p>
            <Link
              href={`/places/${article.venue_id}`}
              className="inline-block bg-white/10 border border-white/20 px-6 py-3 rounded-full hover:bg-white/20 transition-all"
            >
              View Venue &rarr;
            </Link>
          </div>
        )}

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {article.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Share Section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-gray-400 text-sm mb-4">Share this article</p>
          <div className="flex gap-3">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`https://bahrainnights.com/blog/${article.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center transition-colors"
              aria-label="Share on Twitter"
            >
              𝕏
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://bahrainnights.com/blog/${article.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center transition-colors"
              aria-label="Share on Facebook"
            >
              f
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`${article.title} https://bahrainnights.com/blog/${article.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center transition-colors"
              aria-label="Share on WhatsApp"
            >
              📱
            </a>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-16 border-t border-white/10">
          <h2 className="text-2xl font-bold mb-8">
            More from <span className="capitalize">{article.country.replace('-', ' ')}</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/blog/${item.slug}`}
                className="group block bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-yellow-400/50 transition-all"
              >
                {item.featured_image ? (
                  <img
                    src={item.featured_image}
                    alt={item.title}
                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center">
                    <span className="text-4xl">📰</span>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  {item.excerpt && (
                    <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                      {item.excerpt}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

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
    </>
  );
}
