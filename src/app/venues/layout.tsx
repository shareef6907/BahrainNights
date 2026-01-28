import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Venues in Bahrain - Restaurants, Bars, Clubs & More | BahrainNights',
  description: 'Browse all venues listed on BahrainNights. Restaurants, bars, lounges, nightclubs, cafes, hotels, and entertainment venues across Bahrain.',
  keywords: 'bahrain venues, bahrain restaurants list, bahrain bars list, bahrain nightlife venues',
  alternates: {
    canonical: 'https://www.bahrainnights.com/venues',
  },
  openGraph: {
    title: 'All Venues in Bahrain',
    description: 'Browse all venues listed on BahrainNights. Restaurants, bars, lounges, nightclubs, cafes, and more.',
    type: 'website',
    locale: 'en_BH',
    url: 'https://www.bahrainnights.com/venues',
  },
};

export default function VenuesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
