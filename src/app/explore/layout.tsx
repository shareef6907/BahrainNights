import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Explore Bahrain - Shopping, Hotels, Spas, Tours & More | BahrainNights',
  description: 'Explore everything Bahrain has to offer. Shopping malls, luxury hotels, spas, guided tours, kids activities, community events, and more.',
  keywords: 'explore bahrain, things to do bahrain, bahrain activities, bahrain shopping, bahrain hotels, bahrain tours, bahrain spas',
  alternates: {
    canonical: 'https://www.bahrainnights.com/explore',
  },
  openGraph: {
    title: 'Explore Bahrain - Shopping, Hotels, Spas, Tours & More',
    description: 'Explore everything Bahrain has to offer. Shopping malls, luxury hotels, spas, guided tours, and more.',
    type: 'website',
    locale: 'en_BH',
    url: 'https://www.bahrainnights.com/explore',
  },
};

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
