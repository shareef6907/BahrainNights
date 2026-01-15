import { Metadata } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import InternationalPageClient from './InternationalPageClient';

export const metadata: Metadata = {
  title: 'International Events | BahrainNights',
  description: 'Discover amazing events across UAE, Saudi Arabia, Qatar, Egypt, Türkiye, and UK. Book tickets to the best concerts, shows, and experiences worldwide.',
  openGraph: {
    title: 'International Events | BahrainNights',
    description: 'Discover amazing events across the Middle East and beyond',
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

// Country configuration with flags
const COUNTRY_CONFIG: Record<string, { flag: string; code: string }> = {
  'UAE': { flag: '🇦🇪', code: 'uae' },
  'United Arab Emirates': { flag: '🇦🇪', code: 'uae' },
  'Saudi Arabia': { flag: '🇸🇦', code: 'saudi-arabia' },
  'Qatar': { flag: '🇶🇦', code: 'qatar' },
  'Egypt': { flag: '🇪🇬', code: 'egypt' },
  'Türkiye': { flag: '🇹🇷', code: 'turkiye' },
  'Turkey': { flag: '🇹🇷', code: 'turkiye' },
  'UK': { flag: '🇬🇧', code: 'uk' },
  'United Kingdom': { flag: '🇬🇧', code: 'uk' },
  'Kuwait': { flag: '🇰🇼', code: 'kuwait' },
  'Oman': { flag: '🇴🇲', code: 'oman' },
  'Jordan': { flag: '🇯🇴', code: 'jordan' },
  'Lebanon': { flag: '🇱🇧', code: 'lebanon' },
  'Morocco': { flag: '🇲🇦', code: 'morocco' },
  'India': { flag: '🇮🇳', code: 'india' },
};

export default async function InternationalPage() {
  const today = new Date().toISOString().split('T')[0];

  // Fetch all international events (not from Bahrain)
  // Filter: start_date >= today OR end_date >= today OR date >= today
  // This handles events that only have `date` field populated
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
    .or(`start_date.gte.${today},end_date.gte.${today},date.gte.${today}`)
    .order('start_date', { ascending: true, nullsFirst: false });

  if (error) {
    console.error('Error fetching international events:', error);
  }

  // Additional client-side filter to ensure no past events slip through
  const todayDate = new Date(today);
  const internationalEvents: InternationalEvent[] = (events || []).filter(event => {
    const eventDate = event.start_date || event.end_date || event.date;
    if (!eventDate) return false;
    const parsedDate = new Date(eventDate);
    return parsedDate >= todayDate;
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

  return (
    <InternationalPageClient
      events={internationalEvents}
      eventsByCountry={eventsByCountry}
      countries={countriesWithEvents}
    />
  );
}
