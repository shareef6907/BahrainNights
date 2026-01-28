import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Hotels in Bahrain - Luxury, Business & Budget Hotels | BahrainNights',
  description: 'Find the best hotels in Bahrain. From luxury 5-star resorts to business hotels and budget-friendly stays in Manama, Seef, Juffair, and Amwaj Islands.',
  keywords: 'bahrain hotels, best hotels bahrain, luxury hotels bahrain, 5 star hotels bahrain, manama hotels, seef hotels',
  alternates: {
    canonical: 'https://www.bahrainnights.com/explore/hotels',
  },
  openGraph: {
    title: 'Best Hotels in Bahrain',
    description: 'Find the best hotels in Bahrain. From luxury 5-star resorts to business hotels and budget-friendly stays.',
    type: 'website',
    locale: 'en_BH',
    url: 'https://www.bahrainnights.com/explore/hotels',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Hotels in Bahrain',
    description: 'Find the best hotels in Bahrain. From luxury 5-star resorts to budget-friendly stays.',
  },
};

export default function HotelsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
