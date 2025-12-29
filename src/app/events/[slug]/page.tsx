import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase';
import EventDetailClient from './EventDetailClient';

// Revalidate every 5 minutes
export const revalidate = 300;

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Database event type
interface DBEvent {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  venue_name: string;
  venue_address: string;
  date: string;
  time: string;
  price: string;
  image_url: string | null;
  cover_url: string | null;
  booking_url: string | null;
  status: string;
  is_featured: boolean;
  tags: string[] | null;
  views: number;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  created_at: string;
  updated_at: string;
}

// Get category display name and color
function getCategoryInfo(category: string): { display: string; color: string } {
  const categories: Record<string, { display: string; color: string }> = {
    music: { display: 'Music & Concerts', color: 'bg-purple-500' },
    dining: { display: 'Dining & Food', color: 'bg-orange-500' },
    family: { display: 'Family & Kids', color: 'bg-green-500' },
    arts: { display: 'Arts & Culture', color: 'bg-pink-500' },
    sports: { display: 'Sports & Fitness', color: 'bg-blue-500' },
    nightlife: { display: 'Nightlife', color: 'bg-indigo-500' },
    business: { display: 'Business', color: 'bg-slate-500' },
    wellness: { display: 'Wellness & Spa', color: 'bg-teal-500' },
  };
  return categories[category?.toLowerCase()] || { display: category || 'Event', color: 'bg-gray-500' };
}

// Format date for display
function formatDate(dateStr: string): { display: string; dayOfWeek: string } {
  const date = new Date(dateStr);
  const display = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
  return { display, dayOfWeek };
}

// Get default image based on category
function getDefaultImage(category: string): string {
  const images: Record<string, string> = {
    music: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1200&h=600&fit=crop',
    dining: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=600&fit=crop',
    family: 'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=1200&h=600&fit=crop',
    arts: 'https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=1200&h=600&fit=crop',
    sports: 'https://images.unsplash.com/photo-1461896836934-5cf6e9c7fa5c?w=1200&h=600&fit=crop',
    nightlife: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=1200&h=600&fit=crop',
    business: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&h=600&fit=crop',
    wellness: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&h=600&fit=crop',
  };
  return images[category?.toLowerCase()] || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=600&fit=crop';
}

// Fetch event by slug
async function getEvent(slug: string) {
  const { data: event, error } = await supabaseAdmin
    .from('events')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error || !event) {
    return null;
  }

  return event as DBEvent;
}

// Fetch similar events (same category)
async function getSimilarEvents(category: string, excludeId: string) {
  const { data: events } = await supabaseAdmin
    .from('events')
    .select('id, title, slug, description, category, venue_name, date, time, price, image_url, cover_url')
    .eq('status', 'published')
    .eq('category', category)
    .neq('id', excludeId)
    .gte('date', new Date().toISOString().split('T')[0])
    .order('date', { ascending: true })
    .limit(4);

  return events || [];
}

// Generate metadata
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    return {
      title: 'Event Not Found | BahrainNights',
    };
  }

  return {
    title: `${event.title} | BahrainNights`,
    description: event.description?.slice(0, 160) || `${event.title} at ${event.venue_name}`,
    openGraph: {
      title: event.title,
      description: event.description?.slice(0, 160),
      images: [event.cover_url || event.image_url || getDefaultImage(event.category)],
      url: `https://bahrainnights.com/events/${slug}`,
      type: 'website',
    },
  };
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const dbEvent = await getEvent(slug);

  if (!dbEvent) {
    notFound();
  }

  // Increment view count
  await supabaseAdmin
    .from('events')
    .update({ views: (dbEvent.views || 0) + 1 })
    .eq('id', dbEvent.id);

  // Get category info
  const categoryInfo = getCategoryInfo(dbEvent.category);
  const dateInfo = formatDate(dbEvent.date);

  // Get image
  const image = dbEvent.cover_url || dbEvent.image_url || getDefaultImage(dbEvent.category);

  // Format the event for the client component
  const event = {
    id: dbEvent.id,
    title: dbEvent.title,
    slug: dbEvent.slug,
    description: dbEvent.description || 'No description available.',
    image,
    images: [image], // Single image for now
    category: categoryInfo.display,
    categoryColor: categoryInfo.color,
    venue: dbEvent.venue_name,
    venueSlug: dbEvent.venue_name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'venue',
    location: dbEvent.venue_address || 'Bahrain',
    date: dateInfo.display,
    dayOfWeek: dateInfo.dayOfWeek,
    time: dbEvent.time || 'TBA',
    duration: 'TBA',
    price: dbEvent.price || 'Free',
    isFree: !dbEvent.price || dbEvent.price.toLowerCase().includes('free'),
    priceTiers: dbEvent.price ? [{ tier: 'General', price: dbEvent.price }] : [],
    ageRestriction: 'All Ages Welcome',
    dressCode: 'Smart Casual',
    tags: dbEvent.tags || [categoryInfo.display],
    bookingUrl: dbEvent.booking_url || '#',
    venueDetails: {
      name: dbEvent.venue_name || 'Venue',
      slug: dbEvent.venue_name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'venue',
      image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=400&h=300&fit=crop',
      address: dbEvent.venue_address || 'Bahrain',
      phone: dbEvent.contact_phone || '',
      latitude: 26.2285,
      longitude: 50.5860,
    },
    startDate: `${dbEvent.date}T${dbEvent.time || '19:00'}:00`,
    endDate: `${dbEvent.date}T23:59:00`,
  };

  // Get similar events
  const similarEventsRaw = await getSimilarEvents(dbEvent.category, dbEvent.id);
  const similarEvents = similarEventsRaw.map((e) => {
    const catInfo = getCategoryInfo(e.category);
    const eventDate = new Date(e.date);
    return {
      id: e.id,
      title: e.title,
      slug: e.slug,
      description: e.description?.slice(0, 100) || '',
      image: e.cover_url || e.image_url || getDefaultImage(e.category),
      category: catInfo.display,
      categoryColor: catInfo.color,
      venue: e.venue_name,
      location: 'Bahrain',
      date: eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      time: e.time || 'TBA',
      price: e.price || 'Free',
      isFree: !e.price || e.price.toLowerCase().includes('free'),
    };
  });

  return <EventDetailClient event={event} similarEvents={similarEvents} />;
}
