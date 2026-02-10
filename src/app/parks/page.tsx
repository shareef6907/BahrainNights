import { Metadata } from 'next';
import ParksPageClient from './ParksPageClient';

export const metadata: Metadata = {
  title: 'Parks & Gardens in Bahrain - Find Parks Near You | BahrainNights',
  description: 'Discover parks and gardens in Bahrain. Find parks near you with directions, ratings, and photos. Explore green spaces across the Kingdom.',
  keywords: ['parks in Bahrain', 'gardens Bahrain', 'parks near me', 'green spaces Bahrain', 'outdoor activities Bahrain', 'family parks Bahrain'],
  openGraph: {
    title: 'Parks & Gardens in Bahrain - Find Parks Near You',
    description: 'Discover parks and gardens in Bahrain. Find parks near you with directions, ratings, and photos.',
    url: 'https://www.bahrainnights.com/parks',
    siteName: 'BahrainNights',
    type: 'website',
    images: [
      {
        url: 'https://bahrainnights-production.s3.me-south-1.amazonaws.com/branding/og-parks.jpg',
        width: 1200,
        height: 630,
        alt: 'Parks & Gardens in Bahrain',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Parks & Gardens in Bahrain - Find Parks Near You',
    description: 'Discover parks and gardens in Bahrain. Find parks near you with directions, ratings, and photos.',
  },
};

export default function ParksPage() {
  return <ParksPageClient />;
}
