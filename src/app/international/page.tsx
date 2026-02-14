import { Metadata } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import InternationalPageClient from './InternationalPageClient';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import EventListSchema from '@/components/SEO/EventListSchema';

export const metadata: Metadata = {
  title: 'International Events | Concerts, Shows & Experiences Worldwide | BahrainNights',
  description: 'Discover amazing events across UAE, Saudi Arabia, Qatar, Kuwait, Oman, Egypt, Türkiye, UK, India, Morocco, Lebanon, and 20+ countries. Book tickets to concerts, shows, and experiences worldwide.',
  alternates: {
    canonical: 'https://www.bahrainnights.com/international',
  },
  openGraph: {
    title: 'International Events | BahrainNights',
    description: 'Discover concerts, shows & experiences across 25+ countries - Middle East, Europe, Asia & beyond',
    images: ['/images/og-international.jpg'],
  },
};

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
  end_date: string | null;
  start_time: string | null;
  featured_image: string | null;
  cover_url: string | null;
  affiliate_url: string | null;
  country: string;
  city: string | null;
}

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
  const today = new Date().toISOString().split('T')[0];

  // Fetch all international events (not from Bahrain)
  // Filter: start_date >= today OR date >= today OR end_date >= today (for ongoing events)
  // This ensures we show upcoming events AND ongoing events (started in past but still running)
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
      end_date,
      start_time,
      featured_image,
      cover_url,
      affiliate_url,
      country,
      city
    `)
    .neq('country', 'Bahrain')
      .eq('status', 'published')
      .eq('is_active', true)
      .or(`start_date.gte.${today},date.gte.${today},end_date.gte.${today}`)
      .order('start_date', { ascending: true, nullsFirst: false });
    events = result.data;
    error = result.error;
  } catch (e) {
    console.error('Error fetching international events (may be build time):', e);
    events = [];
  }

  if (error) {
    console.error('Error fetching international events:', error);
  }

  // Post-process events:
  // 1. Filter out events with start_date more than 6 months in the past (even if end_date is future)
  // 2. Sort by display date (start_date if future, else end_date for ongoing events)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const sixMonthsAgoStr = sixMonthsAgo.toISOString().split('T')[0];

  const internationalEvents: InternationalEvent[] = (events || [])
    .filter(event => {
      // Keep if start_date is within last 6 months or in the future
      const startDate = event.start_date || event.date;
      return startDate >= sixMonthsAgoStr;
    })
    .sort((a, b) => {
      // Sort by the most relevant date for display
      const getDisplayDate = (e: InternationalEvent) => {
        const start = e.start_date || e.date;
        const end = e.end_date;
        // If start is in future, use it; otherwise use end_date for ongoing events
        if (start >= today) return start;
        if (end && end >= today) return end;
        return start;
      };
      return getDisplayDate(a).localeCompare(getDisplayDate(b));
    });

  // Get unique countries from events and build dynamic country list
  const uniqueCountries = [...new Set(internationalEvents.map(e => e.country))].filter(Boolean);

  // Build countries array with flags, sorted by event count
  const countriesWithEvents = uniqueCountries.map(countryName => {
    const config = COUNTRY_CONFIG[countryName] || { flag: '🌍', code: countryName.toLowerCase().replace(/\s+/g, '-') };
    return {
      code: config.code,
      name: countryName,
      flag: config.flag,
      fullName: countryName,
    };
  });

  // Group events by country
  const eventsByCountry: Record<string, InternationalEvent[]> = {};
  uniqueCountries.forEach(countryName => {
    eventsByCountry[countryName] = internationalEvents.filter(e => e.country === countryName);
  });

  // Sort countries by event count (descending)
  countriesWithEvents.sort((a, b) =>
    (eventsByCountry[b.name]?.length || 0) - (eventsByCountry[a.name]?.length || 0)
  );

  // Transform events for schema
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
