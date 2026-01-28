import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tours & Sightseeing in Bahrain | BahrainNights',
  description: 'Book guided tours and sightseeing experiences in Bahrain. City tours, cultural excursions, boat trips, and unique local experiences.',
  keywords: 'bahrain tours, sightseeing bahrain, guided tours bahrain, bahrain excursions, bahrain boat tours',
  alternates: {
    canonical: 'https://www.bahrainnights.com/explore/tours',
  },
  openGraph: {
    title: 'Tours & Sightseeing in Bahrain',
    description: 'Book guided tours and sightseeing experiences in Bahrain.',
    type: 'website',
    locale: 'en_BH',
    url: 'https://www.bahrainnights.com/explore/tours',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tours & Sightseeing in Bahrain',
    description: 'Book guided tours and sightseeing experiences in Bahrain.',
  },
};

export default function ToursLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
