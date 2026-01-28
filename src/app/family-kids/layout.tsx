import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Family & Kids Activities in Bahrain - Fun for All Ages | BahrainNights',
  description: 'Discover the best family-friendly activities and kids entertainment in Bahrain. Indoor play areas, water parks, educational activities, and fun days out for the whole family.',
  keywords: 'kids activities bahrain, family activities bahrain, things to do with kids bahrain, family fun bahrain, children entertainment bahrain',
  alternates: {
    canonical: 'https://www.bahrainnights.com/family-kids',
  },
  openGraph: {
    title: 'Family & Kids Activities in Bahrain',
    description: 'Discover the best family-friendly activities and kids entertainment in Bahrain.',
    type: 'website',
    locale: 'en_BH',
    url: 'https://www.bahrainnights.com/family-kids',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Family & Kids Activities in Bahrain',
    description: 'Discover the best family-friendly activities and kids entertainment in Bahrain.',
  },
};

export default function FamilyKidsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
