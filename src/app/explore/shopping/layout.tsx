import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopping in Bahrain - Malls, Souks & Markets | BahrainNights',
  description: 'Explore the best shopping destinations in Bahrain. From modern malls like City Centre and Marassi Galleria to traditional souks and local markets.',
  keywords: 'shopping bahrain, bahrain malls, souks bahrain, bahrain markets, city centre bahrain, marassi galleria',
  alternates: {
    canonical: 'https://www.bahrainnights.com/explore/shopping',
  },
  openGraph: {
    title: 'Shopping in Bahrain - Malls, Souks & Markets',
    description: 'Explore the best shopping destinations in Bahrain.',
    type: 'website',
    locale: 'en_BH',
    url: 'https://www.bahrainnights.com/explore/shopping',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shopping in Bahrain - Malls, Souks & Markets',
    description: 'Explore the best shopping destinations in Bahrain.',
  },
};

export default function ShoppingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
