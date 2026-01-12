import { supabaseAdmin } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import CategoryPageClient from './CategoryPageClient';
import { sortEventsWithFeatured } from '@/lib/utils/eventSorting';

// Revalidate every 5 minutes
export const revalidate = 300;

// Valid categories
const validCategories = [
  'music', 'sports', 'arts', 'dining', 'community',
  'shopping', 'nightlife', 'special', 'family', 'wellness',
  'business', 'cultural', 'concerts'
];

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

// Generate static params for all categories
export async function generateStaticParams() {
  return validCategories.map((category) => ({
    category,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const info = categoryInfo[category] || { label: category, description: `${category} events in Bahrain` };

  return {
    title: `${info.label} Events in Bahrain | BahrainNights`,
    description: `Discover the best ${info.description.toLowerCase()} in Bahrain. Browse upcoming ${info.label.toLowerCase()} events.`,
    openGraph: {
      title: `${info.label} Events in Bahrain | BahrainNights`,
      description: `Discover the best ${info.description.toLowerCase()} in Bahrain.`,
      url: `https://bahrainnights.com/events/category/${category}`,
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
    category: event.category || category,
    venue: event.venue_name || 'Venue TBD',
    date: event.date,
    time: event.time || event.start_time || '',
    price: event.price || 'See Details',
    isFree: !event.price || event.price === 'Free' || event.price.toLowerCase?.() === 'free',
    isFeatured: event.is_featured || false,
    is_featured: event.is_featured || false,
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
