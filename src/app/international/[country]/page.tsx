import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase';
import CountryPageClient from './CountryPageClient';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import EventListSchema from '@/components/SEO/EventListSchema';

// Country configuration - comprehensive list of all Platinumlist countries
const COUNTRIES: Record<string, { name: string; fullName: string; flag: string; dbName: string }> = {
  // Middle East & GCC
  'uae': { name: 'UAE', fullName: 'United Arab Emirates', flag: '🇦🇪', dbName: 'UAE' },
  'saudi-arabia': { name: 'Saudi Arabia', fullName: 'Saudi Arabia', flag: '🇸🇦', dbName: 'Saudi Arabia' },
  'qatar': { name: 'Qatar', fullName: 'Qatar', flag: '🇶🇦', dbName: 'Qatar' },
  'kuwait': { name: 'Kuwait', fullName: 'Kuwait', flag: '🇰🇼', dbName: 'Kuwait' },
  'oman': { name: 'Oman', fullName: 'Oman', flag: '🇴🇲', dbName: 'Oman' },
  'jordan': { name: 'Jordan', fullName: 'Jordan', flag: '🇯🇴', dbName: 'Jordan' },
  'lebanon': { name: 'Lebanon', fullName: 'Lebanon', flag: '🇱🇧', dbName: 'Lebanon' },
  'turkiye': { name: 'Türkiye', fullName: 'Türkiye', flag: '🇹🇷', dbName: 'Türkiye' },
  'cyprus': { name: 'Cyprus', fullName: 'Cyprus', flag: '🇨🇾', dbName: 'Cyprus' },
  // Africa
  'egypt': { name: 'Egypt', fullName: 'Egypt', flag: '🇪🇬', dbName: 'Egypt' },
  'morocco': { name: 'Morocco', fullName: 'Morocco', flag: '🇲🇦', dbName: 'Morocco' },
  'south-africa': { name: 'South Africa', fullName: 'South Africa', flag: '🇿🇦', dbName: 'South Africa' },
  'nigeria': { name: 'Nigeria', fullName: 'Nigeria', flag: '🇳🇬', dbName: 'Nigeria' },
  // Europe
  'uk': { name: 'UK', fullName: 'United Kingdom', flag: '🇬🇧', dbName: 'UK' },
  'germany': { name: 'Germany', fullName: 'Germany', flag: '🇩🇪', dbName: 'Germany' },
  'france': { name: 'France', fullName: 'France', flag: '🇫🇷', dbName: 'France' },
  'spain': { name: 'Spain', fullName: 'Spain', flag: '🇪🇸', dbName: 'Spain' },
  'italy': { name: 'Italy', fullName: 'Italy', flag: '🇮🇹', dbName: 'Italy' },
  'greece': { name: 'Greece', fullName: 'Greece', flag: '🇬🇷', dbName: 'Greece' },
  // Asia
  'india': { name: 'India', fullName: 'India', flag: '🇮🇳', dbName: 'India' },
  'pakistan': { name: 'Pakistan', fullName: 'Pakistan', flag: '🇵🇰', dbName: 'Pakistan' },
  'singapore': { name: 'Singapore', fullName: 'Singapore', flag: '🇸🇬', dbName: 'Singapore' },
  'malaysia': { name: 'Malaysia', fullName: 'Malaysia', flag: '🇲🇾', dbName: 'Malaysia' },
  'thailand': { name: 'Thailand', fullName: 'Thailand', flag: '🇹🇭', dbName: 'Thailand' },
  'indonesia': { name: 'Indonesia', fullName: 'Indonesia', flag: '🇮🇩', dbName: 'Indonesia' },
  'philippines': { name: 'Philippines', fullName: 'Philippines', flag: '🇵🇭', dbName: 'Philippines' },
  // Americas
  'usa': { name: 'USA', fullName: 'United States', flag: '🇺🇸', dbName: 'USA' },
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

  const today = new Date().toISOString().split('T')[0];

  // Fetch events for this country
  // Filter: start_date >= today OR date >= today OR end_date >= today (for ongoing events)
  let events: any[] | null = null;
  let error: any = null;
  
  try {
    const result = await supabaseAdmin
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
      .or(`start_date.gte.${today},date.gte.${today},end_date.gte.${today}`)
      .order('start_date', { ascending: true, nullsFirst: false })
      .limit(100);
    events = result.data;
    error = result.error;
  } catch (e) {
    console.error(`Error fetching events for ${countryConfig.name} (may be build time):`, e);
    events = [];
  }

  if (error) {
    console.error(`Error fetching events for ${countryConfig.name}:`, error);
  }

  // Post-process: filter out events with start_date more than 6 months in the past
  // and sort by most relevant display date
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const sixMonthsAgoStr = sixMonthsAgo.toISOString().split('T')[0];

  const countryEvents: InternationalEvent[] = (events || [])
    .filter(event => {
      const startDate = event.start_date || event.date;
      return startDate >= sixMonthsAgoStr;
    })
    .sort((a, b) => {
      const getDisplayDate = (e: InternationalEvent) => {
        const start = e.start_date || e.date;
        const end = e.end_date;
        if (start >= today) return start;
        if (end && end >= today) return end;
        return start;
      };
      return getDisplayDate(a).localeCompare(getDisplayDate(b));
    });

  // Group events by city
  const eventsByCity: Record<string, InternationalEvent[]> = {};
  countryEvents.forEach(event => {
    const city = event.city || 'Other';
    if (!eventsByCity[city]) {
      eventsByCity[city] = [];
    }
    eventsByCity[city].push(event);
  });

  // Transform events for schema
  const schemaEvents = countryEvents.slice(0, 15).map(event => ({
    title: event.title,
    start_date: event.start_date || event.date,
    venue_name: event.venue_name,
    affiliate_url: event.affiliate_url,
    image_url: event.cover_url || event.featured_image,
    slug: event.slug,
  }));

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'International', url: 'https://www.bahrainnights.com/international' },
          { name: countryConfig.fullName, url: `https://www.bahrainnights.com/international/${country}` },
        ]}
      />
      <EventListSchema
        events={schemaEvents}
        pageTitle={`Events in ${countryConfig.fullName}`}
        pageDescription={`Discover concerts, shows, and experiences in ${countryConfig.fullName}`}
        pageUrl={`https://www.bahrainnights.com/international/${country}`}
      />
      <CountryPageClient
        country={countryConfig}
        events={countryEvents}
        eventsByCity={eventsByCity}
      />
    </>
  );
}
