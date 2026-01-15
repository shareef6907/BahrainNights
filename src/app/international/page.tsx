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

// Country configuration for display
const COUNTRIES = [
  { code: 'uae', name: 'UAE', flag: '🇦🇪', fullName: 'United Arab Emirates' },
  { code: 'saudi-arabia', name: 'Saudi Arabia', flag: '🇸🇦', fullName: 'Saudi Arabia' },
  { code: 'qatar', name: 'Qatar', flag: '🇶🇦', fullName: 'Qatar' },
  { code: 'egypt', name: 'Egypt', flag: '🇪🇬', fullName: 'Egypt' },
  { code: 'turkiye', name: 'Türkiye', flag: '🇹🇷', fullName: 'Türkiye' },
  { code: 'uk', name: 'UK', flag: '🇬🇧', fullName: 'United Kingdom' },
];

export default async function InternationalPage() {
  // Fetch all international events (not from Bahrain)
  // Use end_date >= today to include long-running shows (e.g., West End musicals)
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
    .gte('end_date', new Date().toISOString().split('T')[0])
    .order('start_date', { ascending: true })
    .limit(500);

  if (error) {
    console.error('Error fetching international events:', error);
  }

  const internationalEvents: InternationalEvent[] = events || [];

  // Group events by country
  const eventsByCountry: Record<string, InternationalEvent[]> = {};
  COUNTRIES.forEach(country => {
    eventsByCountry[country.name] = internationalEvents.filter(
      e => e.country === country.name || e.country === country.fullName
    );
  });

  return (
    <InternationalPageClient
      events={internationalEvents}
      eventsByCountry={eventsByCountry}
      countries={COUNTRIES}
    />
  );
}
