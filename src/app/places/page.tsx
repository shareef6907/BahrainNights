import { Metadata } from 'next';
import PlacesPageClient from './PlacesPageClient';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Best Restaurants, Lounges, Cafes & Nightlife in Bahrain | BahrainNights',
  description: 'Discover the best dining and nightlife spots in Bahrain. Explore top restaurants, cafes, lounges, and nightclubs across Manama, Seef, Juffair, and more.',
  keywords: 'bahrain restaurants, bahrain nightlife, bahrain lounges, bahrain cafes, best restaurants bahrain, nightclubs bahrain, dining bahrain',
  alternates: {
    canonical: 'https://www.bahrainnights.com/places',
  },
  openGraph: {
    title: 'Best Restaurants, Lounges, Cafes & Nightlife in Bahrain',
    description: 'Discover the best dining and nightlife spots in Bahrain. Explore top restaurants, cafes, lounges, and nightclubs.',
    type: 'website',
    locale: 'en_BH',
    url: 'https://www.bahrainnights.com/places',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Restaurants, Lounges, Cafes & Nightlife in Bahrain',
    description: 'Discover the best dining and nightlife spots in Bahrain. Explore top restaurants, cafes, lounges, and nightclubs.',
  },
};

export default function PlacesPage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Places', url: 'https://www.bahrainnights.com/places' }
      ]} />
      <PlacesPageClient />
    </>
  );
}
