import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Spas & Wellness in Bahrain - Massage, Hammam & More | BahrainNights',
  description: 'Discover the best spas and wellness centers in Bahrain. Luxury spa treatments, traditional hammam, massage therapy, and relaxation experiences.',
  keywords: 'bahrain spas, best spa bahrain, massage bahrain, hammam bahrain, wellness bahrain, spa treatments bahrain',
  alternates: {
    canonical: 'https://www.bahrainnights.com/explore/spas',
  },
  openGraph: {
    title: 'Best Spas & Wellness in Bahrain',
    description: 'Discover the best spas and wellness centers in Bahrain.',
    type: 'website',
    locale: 'en_BH',
    url: 'https://www.bahrainnights.com/explore/spas',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Spas & Wellness in Bahrain',
    description: 'Discover the best spas and wellness centers in Bahrain.',
  },
};

export default function SpasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
