import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tours & Experiences in Bahrain - Guided Tours & Activities | BahrainNights',
  description: 'Book the best tours and experiences in Bahrain. City tours, cultural excursions, desert safaris, boat trips, and unique local experiences.',
  keywords: 'bahrain tours, guided tours bahrain, bahrain experiences, bahrain excursions, things to do bahrain, bahrain sightseeing',
  alternates: {
    canonical: 'https://www.bahrainnights.com/tours',
  },
  openGraph: {
    title: 'Tours & Experiences in Bahrain',
    description: 'Book the best tours and experiences in Bahrain. City tours, cultural excursions, and unique local experiences.',
    type: 'website',
    locale: 'en_BH',
    url: 'https://www.bahrainnights.com/tours',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tours & Experiences in Bahrain',
    description: 'Book the best tours and experiences in Bahrain.',
  },
};

export default function ToursLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
