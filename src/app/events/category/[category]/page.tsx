import { OG_IMAGES } from '@/lib/og';
import { supabaseAdmin } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import CategoryPageClient from './CategoryPageClient';
import { sortEventsWithFeatured } from '@/lib/utils/eventSorting';
import { VALID_CATEGORY_SLUGS } from '@/lib/seo/indexable-hubs';

// Revalidate every 5 minutes
export const revalidate = 300;

// Valid categories.
//
// The list lives in src/lib/seo/indexable-hubs.ts so that the sitemap and
// this page cannot disagree about which category hubs exist. It was
// duplicated here before, and the sitemap drifted: no /events/category/* hub
// was listed in it at all.
const validCategories: readonly string[] = VALID_CATEGORY_SLUGS;

// Category display info
const categoryInfo: Record<string, { label: string; icon: string; description: string }> = {
  music: { label: 'Music & Concerts', icon: '🎵', description: 'Live music, concerts, and musical performances' },
  sports: { label: 'Sports & Fitness', icon: '⚽', description: 'Sports events, matches, and fitness activities' },
  arts: { label: 'Arts & Culture', icon: '🎨', description: 'Art exhibitions, cultural events, and creative showcases' },
  dining: { label: 'Dining & Food', icon: '🍽️', description: 'Food festivals, culinary events, and dining experiences' },
  community: { label: 'Community', icon: '🤝', description: 'Community gatherings and social events' },
  shopping: { label: 'Shopping & Markets', icon: '🛍️', description: 'Markets, sales, and shopping events' },
  nightlife: { label: 'Nightlife', icon: '🌙', description: 'Clubs, parties, and late-night entertainment' },
  special: { label: 'Special Events', icon: '⭐', description: 'Unique and special occasions' },
  family: { label: 'Family & Kids', icon: '👨‍👩‍👧‍👦', description: 'Family-friendly activities and kids events' },
  wellness: { label: 'Wellness & Spa', icon: '🧘', description: 'Wellness retreats, spa days, and health events' },
  business: { label: 'Business & Networking', icon: '💼', description: 'Conferences, workshops, and networking events' },
  cultural: { label: 'Cultural', icon: '🏛️', description: 'Cultural celebrations and heritage events' },
  concerts: { label: 'Concerts', icon: '🎤', description: 'Live concerts and music performances' },
};

interface PageProps {
  params: Promise<{ category: string }>;
}

// Allow dynamic rendering for categories not pre-generated
export const dynamicParams = true;

// Generate static params for all categories (gracefully handle missing env vars)
export async function generateStaticParams() {
  // Skip static generation if Supabase isn't configured (local dev without env vars)
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return [];
  }
  return validCategories.map((category) => ({
    category,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const info = categoryInfo[category] || { label: category, description: `${category} events in Bahrain` };

  // A category page with no upcoming events is a soft-404: live, indexable,
  // reachable, but with nothing on it. Google should not rank an empty page,
  // so it is marked noindex, nofollow.
  //
  // The route itself is NOT removed — the URL may have inbound links, and the
  // category may gain events later, in which case it becomes indexable again
  // automatically.
  const events = await getCategoryEvents(category);
  const hasListings = events.length > 0;

  return {
    title: `${info.label} Events in Bahrain`,
    description: `Discover the best ${info.description.toLowerCase()} in Bahrain. Browse upcoming ${info.label.toLowerCase()} events.`,
    alternates: {
      canonical: `/events/category/${category}`,
    },
    robots: hasListings
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      title: `${info.label} Events in Bahrain`,
      description: `Discover the best ${info.description.toLowerCase()} in Bahrain.`,
      url: `https://www.bahrainnights.com/events/category/${category}`,
    images: [OG_IMAGES.events],
    },
  };
}

// Fetch events for category
async function getCategoryEvents(category: string) {
  const today = new Date().toISOString().split('T')[0];

  const { data: events, error } = await supabaseAdmin
    .from('events')
    .select('*')
    .eq('status', 'published')
    .eq('is_hidden', false)
    .eq('country', 'Bahrain') // Only Bahrain events
    .eq('category', category)
    .gte('date', today)
    .order('date', { ascending: true })
    .limit(50);

  if (error) {
    console.error('Error fetching category events:', error);
    return [];
  }

  // Transform and sort events with featured first
  const transformedEvents = (events || []).map(event => ({
    id: event.id,
    title: event.title || 'Untitled Event',
    slug: event.slug || event.id,
    description: event.description || '',
    image: event.cover_url || event.image_url || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=500&fit=crop',
    coverUrl: event.cover_url || event.image_url || null,
    category: event.category || category,
    venue: event.venue_name || 'Venue TBD',
    location: event.venue_address || event.location || '',
    date: event.date,
    rawDate: event.date,
    rawEndDate: event.end_date || null,
    time: event.time || event.start_time || '',
    price: event.price || 'See Details',
    priceNum: event.price_min || (typeof event.price === 'number' ? event.price : null),
    priceCurrency: event.price_currency || 'BHD',
    isFree: !event.price || event.price === 'Free' || event.price.toLowerCase?.() === 'free',
    isFeatured: event.is_featured || false,
    is_featured: event.is_featured || false,
    affiliateUrl: event.affiliate_url || event.booking_url || event.source_url || '',
  }));

  // Sort with featured events first (alphabetically), then non-featured by date
  return sortEventsWithFeatured(transformedEvents);
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;

  // Validate category
  if (!validCategories.includes(category)) {
    notFound();
  }

  const info = categoryInfo[category] || { label: category, icon: '📅', description: `${category} events` };
  const events = await getCategoryEvents(category);

  return (
    <CategoryPageClient
      category={category}
      categoryInfo={info}
      events={events}
    />
  );
}
