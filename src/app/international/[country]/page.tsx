import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getInternationalEvents } from '@/lib/international-events';
import { COUNTRIES } from '@/lib/seo/indexable-hubs';
import CountryPageClient from './CountryPageClient';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import EventListSchema from '@/components/SEO/EventListSchema';

// Country configuration - comprehensive list of all Platinumlist countries.
//
// MOVED to src/lib/seo/indexable-hubs.ts so the page and the sitemap are
// generated from one list. While it lived here only, the sitemap ended up
// listing 2 of the 27 country hubs (uae and qatar) and Google reported the
// other populated ones as "URL is unknown to Google".

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

  // A country page with no listings is a soft-404: it is live, indexable and
  // reachable, but it has nothing on it. Google should not rank an empty
  // page, so it is marked noindex, nofollow.
  //
  // The route itself is NOT removed — the URL may have inbound links, and the
  // country may gain listings later, in which case the page becomes
  // indexable again automatically.
  const events = await getInternationalEvents({ country: countryConfig.dbName });
  const hasListings = events.length > 0;

  return {
    title: `Events in ${countryConfig.fullName}`,
    description: `Discover amazing events, concerts, shows, and experiences in ${countryConfig.fullName}. Book tickets to the best events.`,
    alternates: {
      canonical: `/international/${country}`,
    },
    robots: hasListings
      ? { index: true, follow: true }
      : { index: false, follow: false },
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
