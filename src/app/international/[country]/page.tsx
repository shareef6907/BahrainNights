import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getInternationalEvents } from '@/lib/international-events';
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
      title: 'Country Not Found',
    };
  }

  return {
    title: `Events in ${countryConfig.fullName}`,
    description: `Discover amazing events, concerts, shows, and experiences in ${countryConfig.fullName}. Book tickets to the best events.`,
    openGraph: {
      title: `Events in ${countryConfig.fullName}`,
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

export default async function CountryPage({ params }: Props) {
  const { country } = await params;
  const countryConfig = COUNTRIES[country];

  if (!countryConfig) {
    notFound();
  }

  // ONE dataset: full filtered list, NO limit, same sort as /international
  const countryEvents = await getInternationalEvents({ country: countryConfig.dbName });

  // Group by city — derived from the ONE dataset
  const eventsByCity: Record<string, typeof countryEvents> = {};
  countryEvents.forEach(event => {
    const city = event.city || 'Other';
    if (!eventsByCity[city]) {
      eventsByCity[city] = [];
    }
    eventsByCity[city].push(event);
  });

  // Schema: first 15 events
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
