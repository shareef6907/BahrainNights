import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase';
import EventDetailClient from './EventDetailClient';
import EventSchema from '@/components/SEO/EventSchema';

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
  venue_id: string | null;
  venue_name: string;
  venue_address: string;
  date: string;
  end_date: string | null;
  time: string;
  end_time: string | null;
  price: string;
  image_url: string | null;
  cover_url: string | null;
  featured_image: string | null;
  booking_url: string | null;
  source_url: string | null;
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

// Venue data type
interface DBVenue {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  cover_image_url: string | null;
  phone: string | null;
  email: string | null;
  address: string;
  area: string;
  booking_url: string | null;
  website: string | null;
  instagram: string | null;
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

// Format date range for multi-day events
function formatDateRange(startDate: string, endDate: string | null): { display: string; dayOfWeek: string; endDisplay?: string } {
  const startInfo = formatDate(startDate);
  if (!endDate || endDate === startDate) {
    return startInfo;
  }
  const endDateObj = new Date(endDate);
  const endDisplay = endDateObj.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  return { ...startInfo, endDisplay };
}

// Known venue coordinates for accurate map links
const KNOWN_VENUES: Record<string, { lat: number; lng: number }> = {
  'beyon al dana amphitheatre': { lat: 26.0325, lng: 50.5106 },
  'al dana amphitheatre': { lat: 26.0325, lng: 50.5106 },
  'bahrain international circuit': { lat: 26.0325, lng: 50.5106 },
};

// Get venue coordinates from known venues or use default Manama coordinates
function getVenueCoordinates(venueName: string): { lat: number; lng: number } {
  const normalized = venueName?.toLowerCase().trim() || '';
  for (const [key, coords] of Object.entries(KNOWN_VENUES)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return coords;
    }
  }
  // Default to Manama center
  return { lat: 26.2285, lng: 50.5860 };
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
    .eq('is_hidden', false)
    .single();

  if (error || !event) {
    return null;
  }

  return event as DBEvent;
}

// Fetch venue by ID
async function getVenueById(venueId: string): Promise<DBVenue | null> {
  const { data: venue, error } = await supabaseAdmin
    .from('venues')
    .select('id, name, slug, logo_url, cover_image_url, phone, email, address, area, booking_url, website, instagram')
    .eq('id', venueId)
    .eq('status', 'approved')
    .single();

  if (error || !venue) {
    return null;
  }

  return venue as DBVenue;
}

// Fetch venue by name (fallback for scraped events)
async function getVenueByName(venueName: string): Promise<DBVenue | null> {
  const { data: venue, error } = await supabaseAdmin
    .from('venues')
    .select('id, name, slug, logo_url, cover_image_url, phone, email, address, area, booking_url, website, instagram')
    .ilike('name', `%${venueName}%`)
    .eq('status', 'approved')
    .limit(1)
    .single();

  if (error || !venue) {
    return null;
  }

  return venue as DBVenue;
}

// Fetch similar events (same category)
async function getSimilarEvents(category: string, excludeId: string) {
  const { data: events } = await supabaseAdmin
    .from('events')
    .select('id, title, slug, description, category, venue_name, date, time, price, image_url, cover_url')
    .eq('status', 'published')
    .eq('is_hidden', false)
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

  // Try to fetch venue data - first by venue_id, then by venue_name
  let venueData: DBVenue | null = null;
  if (dbEvent.venue_id) {
    venueData = await getVenueById(dbEvent.venue_id);
  }
  if (!venueData && dbEvent.venue_name) {
    venueData = await getVenueByName(dbEvent.venue_name);
  }

  // Get category info
  const categoryInfo = getCategoryInfo(dbEvent.category);
  const dateInfo = formatDateRange(dbEvent.date, dbEvent.end_date);

  // Get image - prioritize featured_image, then cover_url, then image_url
  const image = dbEvent.featured_image || dbEvent.cover_url || dbEvent.image_url || getDefaultImage(dbEvent.category);

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
    venue: venueData?.name || dbEvent.venue_name,
    venueSlug: venueData?.slug || dbEvent.venue_name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'venue',
    location: venueData?.address || dbEvent.venue_address || dbEvent.venue_name || 'Bahrain',
    date: dateInfo.endDisplay ? `${dateInfo.display} - ${dateInfo.endDisplay}` : dateInfo.display, // Date range for multi-day events
    dayOfWeek: dateInfo.dayOfWeek,
    time: (dbEvent.time && !dbEvent.time.toLowerCase().includes('tba')) ? dbEvent.time : '',
    duration: '',
    price: dbEvent.price || 'Free',
    isFree: !dbEvent.price || dbEvent.price.toLowerCase().includes('free'),
    priceTiers: dbEvent.price ? [{ tier: 'General', price: dbEvent.price }] : [],
    ageRestriction: 'All Ages Welcome',
    dressCode: 'Smart Casual',
    tags: dbEvent.tags || [categoryInfo.display],
    bookingUrl: dbEvent.booking_url || venueData?.booking_url || null,
    sourceUrl: dbEvent.source_url || null,
    // Venue info from venues table (if found)
    hostedByVenue: venueData ? {
      id: venueData.id,
      name: venueData.name,
      slug: venueData.slug,
      logo: venueData.logo_url,
      phone: venueData.phone,
      email: venueData.email,
      website: venueData.website,
      instagram: venueData.instagram,
      bookingUrl: venueData.booking_url,
    } : null,
    venueDetails: (() => {
      const coords = getVenueCoordinates(dbEvent.venue_name || '');
      return {
        name: venueData?.name || dbEvent.venue_name || 'Venue',
        slug: venueData?.slug || dbEvent.venue_name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'venue',
        image: venueData?.logo_url || venueData?.cover_image_url || 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=400&h=300&fit=crop',
        address: venueData?.address || dbEvent.venue_address || dbEvent.venue_name || 'Bahrain',
        phone: venueData?.phone || dbEvent.contact_phone || '',
        email: venueData?.email || dbEvent.contact_email || '',
        latitude: coords.lat,
        longitude: coords.lng,
        website: venueData?.website || dbEvent.source_url || undefined,
      };
    })(),
    startDate: `${dbEvent.date}T${dbEvent.time || '19:00'}:00`,
    endDate: dbEvent.end_date
      ? `${dbEvent.end_date}T${dbEvent.end_time || '23:59'}:00`
      : `${dbEvent.date}T23:59:00`,
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
      time: (e.time && !e.time.toLowerCase().includes('tba')) ? e.time : '',
      price: e.price || 'Free',
      isFree: !e.price || e.price.toLowerCase().includes('free'),
    };
  });

  return (
    <>
      {/* Structured Data for SEO - Server-rendered for better indexing */}
      <EventSchema
        event={{
          title: dbEvent.title,
          description: dbEvent.description,
          date: dbEvent.date,
          time: dbEvent.time,
          end_date: dbEvent.end_date,
          end_time: dbEvent.end_time,
          venue_name: dbEvent.venue_name,
          venue_address: dbEvent.venue_address,
          price: dbEvent.price,
          booking_url: dbEvent.booking_url,
          image_url: dbEvent.image_url,
          cover_url: dbEvent.cover_url,
          featured_image: dbEvent.featured_image,
          category: dbEvent.category,
          slug: dbEvent.slug,
        }}
      />
      <EventDetailClient event={event} similarEvents={similarEvents} />
    </>
  );
}
