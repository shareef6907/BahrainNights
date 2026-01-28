import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Advertise on BahrainNights - Reach Bahrain\'s Largest Audience | BahrainNights',
  description: 'Promote your business, venue, or event on BahrainNights. Reach thousands of engaged users looking for things to do in Bahrain. Sponsored listings, banner ads, and featured placements.',
  keywords: 'advertise bahrain, bahrain advertising, promote business bahrain, bahrain marketing, event promotion bahrain',
  alternates: {
    canonical: 'https://www.bahrainnights.com/advertise',
  },
  openGraph: {
    title: 'Advertise on BahrainNights - Reach Bahrain\'s Largest Audience',
    description: 'Promote your business, venue, or event on BahrainNights. Reach thousands of engaged users.',
    type: 'website',
    locale: 'en_BH',
    url: 'https://www.bahrainnights.com/advertise',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Advertise on BahrainNights',
    description: 'Promote your business, venue, or event on BahrainNights. Reach thousands of engaged users.',
  },
};

export default function AdvertiseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
