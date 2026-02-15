import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Nightclubs in Bahrain - Clubbing Guide 2026 | BahrainNights',
  description: 'Discover the best nightclubs in Bahrain. From exclusive lounges to dance clubs, find the hottest nightlife spots with dress codes, entry fees, and events.',
  keywords: 'nightclubs Bahrain, clubs Bahrain, best clubs Bahrain, Bahrain nightlife, clubbing Bahrain',
  alternates: {
    canonical: 'https://www.bahrainnights.com/clubs',
  },
  openGraph: {
    title: 'Best Nightclubs in Bahrain - Clubbing Guide 2026',
    description: 'Discover the best nightclubs in Bahrain. Exclusive lounges, dance clubs, and nightlife hotspots.',
    type: 'website',
    locale: 'en_BH',
    url: 'https://www.bahrainnights.com/clubs',
  },
};

export default function ClubsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
