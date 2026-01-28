import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kids Activities & Entertainment in Bahrain | BahrainNights',
  description: 'Find the best kids activities, play areas, and family entertainment in Bahrain. Indoor playgrounds, water parks, educational activities, and fun days out.',
  keywords: 'kids activities bahrain, children entertainment bahrain, play areas bahrain, family fun bahrain',
  alternates: {
    canonical: 'https://www.bahrainnights.com/explore/kids',
  },
  openGraph: {
    title: 'Kids Activities & Entertainment in Bahrain',
    description: 'Find the best kids activities, play areas, and family entertainment in Bahrain.',
    type: 'website',
    locale: 'en_BH',
    url: 'https://www.bahrainnights.com/explore/kids',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kids Activities & Entertainment in Bahrain',
    description: 'Find the best kids activities, play areas, and family entertainment in Bahrain.',
  },
};

export default function KidsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
