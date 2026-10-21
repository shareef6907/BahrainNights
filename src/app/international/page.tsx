import { Metadata } from 'next';
import { getInternationalEvents } from '@/lib/international-events';
import InternationalPageClient from './InternationalPageClient';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import EventListSchema from '@/components/SEO/EventListSchema';

export const metadata: Metadata = {
  title: 'International Events | Concerts, Shows & Experiences Worldwide',
  description: 'Discover amazing events across UAE, Saudi Arabia, Qatar, Kuwait, Oman, Egypt, Türkiye, UK, India, Morocco, Lebanon, and 20+ countries. Book tickets to concerts, shows, and experiences worldwide.',
  alternates: {
    canonical: 'https://www.bahrainnights.com/international',
  },
  openGraph: {
    title: 'International Events',
    description: 'Discover concerts, shows & experiences across 25+ countries - Middle East, Europe, Asia & beyond',
    images: ['/images/og-international.jpg'],
  },
};

export const revalidate = 3600; // Revalidate every hour

// Country configuration with flags - comprehensive list of all Platinumlist countries
const COUNTRY_CONFIG: Record<string, { flag: string; code: string }> = {
  // Middle East & GCC
  'UAE': { flag: '🇦🇪', code: 'uae' },
  'United Arab Emirates': { flag: '🇦🇪', code: 'uae' },
  'Saudi Arabia': { flag: '🇸🇦', code: 'saudi-arabia' },
  'Qatar': { flag: '🇶🇦', code: 'qatar' },
  'Kuwait': { flag: '🇰🇼', code: 'kuwait' },
  'Oman': { flag: '🇴🇲', code: 'oman' },
  'Jordan': { flag: '🇯🇴', code: 'jordan' },
  'Lebanon': { flag: '🇱🇧', code: 'lebanon' },
  'Türkiye': { flag: '🇹🇷', code: 'turkiye' },
  'Turkey': { flag: '🇹🇷', code: 'turkiye' },
  'Cyprus': { flag: '🇨🇾', code: 'cyprus' },
  // Africa
  'Egypt': { flag: '🇪🇬', code: 'egypt' },
  'Morocco': { flag: '🇲🇦', code: 'morocco' },
  'South Africa': { flag: '🇿🇦', code: 'south-africa' },
  'Nigeria': { flag: '🇳🇬', code: 'nigeria' },
  // Europe
  'UK': { flag: '🇬🇧', code: 'uk' },
  'United Kingdom': { flag: '🇬🇧', code: 'uk' },
  'Germany': { flag: '🇩🇪', code: 'germany' },
  'France': { flag: '🇫🇷', code: 'france' },
  'Spain': { flag: '🇪🇸', code: 'spain' },
  'Italy': { flag: '🇮🇹', code: 'italy' },
  'Greece': { flag: '🇬🇷', code: 'greece' },
  // Asia
  'India': { flag: '🇮🇳', code: 'india' },
  'Pakistan': { flag: '🇵🇰', code: 'pakistan' },
  'Singapore': { flag: '🇸🇬', code: 'singapore' },
  'Malaysia': { flag: '🇲🇾', code: 'malaysia' },
  'Thailand': { flag: '🇹🇭', code: 'thailand' },
  'Indonesia': { flag: '🇮🇩', code: 'indonesia' },
  'Philippines': { flag: '🇵🇭', code: 'philippines' },
  // Americas
  'USA': { flag: '🇺🇸', code: 'usa' },
  'United States': { flag: '🇺🇸', code: 'usa' },
};

export default async function InternationalPage() {
  // ONE dataset: full filtered list, no limit, same sort as country pages
  const internationalEvents = await getInternationalEvents();

  // Derive country list from the ONE dataset
  const uniqueCountries = [...new Set(internationalEvents.map(e => e.country))].filter(Boolean);

  const eventsByCountry: Record<string, typeof internationalEvents> = {};
  uniqueCountries.forEach(countryName => {
    eventsByCountry[countryName] = internationalEvents.filter(e => e.country === countryName);
  });

  const countriesWithEvents = uniqueCountries
    .map(countryName => {
      const config = COUNTRY_CONFIG[countryName] || {
        flag: '🌍',
        code: countryName.toLowerCase().replace(/\s+/g, '-'),
      };
      return {
        code: config.code,
        name: countryName,
        flag: config.flag,
        fullName: countryName,
      };
    })
    .sort((a, b) => (eventsByCountry[b.name]?.length || 0) - (eventsByCountry[a.name]?.length || 0));

  // Schema: first 15 events
  const schemaEvents = internationalEvents.slice(0, 15).map(event => ({
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
          { name: 'International Events', url: 'https://www.bahrainnights.com/international' },
        ]}
      />
      <EventListSchema
        events={schemaEvents}
        pageTitle="International Events"
        pageDescription="Discover concerts, shows, and experiences across UAE, Saudi Arabia, Qatar, and more"
        pageUrl="https://www.bahrainnights.com/international"
      />
      <InternationalPageClient
        events={internationalEvents}
        eventsByCountry={eventsByCountry}
        countries={countriesWithEvents}
      />
    </>
  );
}
