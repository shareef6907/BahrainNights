import { Metadata } from 'next';
import PlacesPageClient from './PlacesPageClient';

export const metadata: Metadata = {
  title: 'Best Restaurants, Bars, Cafes & Nightlife in Bahrain | BahrainNights',
  description: 'Discover the best dining and nightlife spots in Bahrain. Explore top restaurants, cafes, lounges, bars, and nightclubs across Manama, Seef, Juffair, and more.',
  keywords: 'bahrain restaurants, bahrain nightlife, bahrain bars, bahrain cafes, bahrain lounges, best restaurants bahrain, nightclubs bahrain, dining bahrain',
  alternates: {
    canonical: 'https://www.bahrainnights.com/places',
  },
  openGraph: {
    title: 'Best Restaurants, Bars, Cafes & Nightlife in Bahrain',
    description: 'Discover the best dining and nightlife spots in Bahrain. Explore top restaurants, cafes, lounges, bars, and nightclubs.',
    type: 'website',
    locale: 'en_BH',
    url: 'https://www.bahrainnights.com/places',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Restaurants, Bars, Cafes & Nightlife in Bahrain',
    description: 'Discover the best dining and nightlife spots in Bahrain. Explore top restaurants, cafes, lounges, bars, and nightclubs.',
  },
};

export default function PlacesPage() {
  return <PlacesPageClient />;
}
