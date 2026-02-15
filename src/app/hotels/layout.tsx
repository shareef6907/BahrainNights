import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Hotels in Bahrain - Luxury & Budget Hotels 2026 | BahrainNights',
  description: 'Find the best hotels in Bahrain. Luxury resorts, business hotels, and budget stays. Compare prices, amenities, and book your perfect accommodation.',
  keywords: 'hotels Bahrain, best hotels Bahrain, luxury hotels Bahrain, Bahrain resorts, where to stay Bahrain',
  alternates: {
    canonical: 'https://www.bahrainnights.com/hotels',
  },
  openGraph: {
    title: 'Best Hotels in Bahrain - Luxury & Budget Hotels 2026',
    description: 'Find the best hotels in Bahrain. Luxury resorts, business hotels, and budget-friendly options.',
    type: 'website',
    locale: 'en_BH',
    url: 'https://www.bahrainnights.com/hotels',
  },
};

export default function HotelsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
