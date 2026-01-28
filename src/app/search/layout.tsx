import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search Events, Places & Things to Do in Bahrain | BahrainNights',
  description: 'Search for events, restaurants, nightlife venues, activities, and more across Bahrain. Find exactly what you\'re looking for on BahrainNights.',
  alternates: {
    canonical: 'https://www.bahrainnights.com/search',
  },
  openGraph: {
    title: 'Search BahrainNights',
    description: 'Search for events, restaurants, nightlife venues, activities, and more across Bahrain.',
    type: 'website',
    locale: 'en_BH',
    url: 'https://www.bahrainnights.com/search',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
