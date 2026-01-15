import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase';
import CountryPageClient from './CountryPageClient';

// Country configuration
const COUNTRIES: Record<string, { name: string; fullName: string; flag: string; dbName: string }> = {
  'uae': { name: 'UAE', fullName: 'United Arab Emirates', flag: '🇦🇪', dbName: 'UAE' },
  'saudi-arabia': { name: 'Saudi Arabia', fullName: 'Saudi Arabia', flag: '🇸🇦', dbName: 'Saudi Arabia' },
  'qatar': { name: 'Qatar', fullName: 'Qatar', flag: '🇶🇦', dbName: 'Qatar' },
  'egypt': { name: 'Egypt', fullName: 'Egypt', flag: '🇪🇬', dbName: 'Egypt' },
  'turkiye': { name: 'Türkiye', fullName: 'Türkiye', flag: '🇹🇷', dbName: 'Türkiye' },
  'uk': { name: 'UK', fullName: 'United Kingdom', flag: '🇬🇧', dbName: 'UK' },
};

interface Props {
  params: Promise<{ country: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  const countryConfig = COUNTRIES[country];

  if (!countryConfig) {
    return {
      title: 'Country Not Found | BahrainNights',
    };
  }

  return {
    title: `Events in ${countryConfig.fullName} | BahrainNights`,
    description: `Discover amazing events, concerts, shows, and experiences in ${countryConfig.fullName}. Book tickets to the best events.`,
    openGraph: {
      title: `Events in ${countryConfig.fullName} | BahrainNights`,
      description: `Discover amazing events in ${countryConfig.fullName}`,
      images: [`/images/og-${country}.jpg`],
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(COUNTRIES).map((country) => ({
    country,
  }));
}

export const revalidate = 3600; // Revalidate every hour

interface InternationalEvent {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category: string;
  venue_name: string | null;
  date: string;
  time: string | null;
  start_date: string | null;
  start_time: string | null;
  end_date: string | null;
  end_time: string | null;
  featured_image: string | null;
  cover_url: string | null;
  affiliate_url: string | null;
  country: string;
  city: string | null;
}

export default async function CountryPage({ params }: Props) {
  const { country } = await params;
  const countryConfig = COUNTRIES[country];

  if (!countryConfig) {
    notFound();
  }

  // Fetch events for this country
  const { data: events, error } = await supabaseAdmin
    .from('events')
    .select(`
      id,
      title,
      slug,
      description,
      category,
      venue_name,
      date,
      time,
      start_date,
      start_time,
      end_date,
      end_time,
      featured_image,
      cover_url,
      affiliate_url,
      country,
      city
    `)
    .eq('country', countryConfig.dbName)
    .eq('status', 'published')
    .eq('is_active', true)
    .gte('start_date', new Date().toISOString().split('T')[0])
    .order('start_date', { ascending: true })
    .limit(100);

  if (error) {
    console.error(`Error fetching events for ${countryConfig.name}:`, error);
  }

  const countryEvents: InternationalEvent[] = events || [];

  // Group events by city
  const eventsByCity: Record<string, InternationalEvent[]> = {};
  countryEvents.forEach(event => {
    const city = event.city || 'Other';
    if (!eventsByCity[city]) {
      eventsByCity[city] = [];
    }
    eventsByCity[city].push(event);
  });

  return (
    <CountryPageClient
      country={countryConfig}
      events={countryEvents}
      eventsByCity={eventsByCity}
    />
  );
}
