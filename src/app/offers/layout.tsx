import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Deals & Offers in Bahrain - Restaurant, Bar & Lounge Deals | BahrainNights',
  description: 'Find the best deals, happy hours, and special offers from restaurants, bars, lounges, and venues across Bahrain. Ladies nights, brunches, and daily specials.',
  keywords: 'bahrain deals, bahrain offers, happy hour bahrain, ladies night bahrain, restaurant deals bahrain, bar offers bahrain',
  alternates: {
    canonical: 'https://www.bahrainnights.com/offers',
  },
  openGraph: {
    title: 'Best Deals & Offers in Bahrain',
    description: 'Find the best deals, happy hours, and special offers from restaurants, bars, lounges, and venues across Bahrain.',
    type: 'website',
    locale: 'en_BH',
    url: 'https://www.bahrainnights.com/offers',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Deals & Offers in Bahrain',
    description: 'Find the best deals, happy hours, and special offers from restaurants, bars, and lounges in Bahrain.',
  },
};

export default function OffersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
