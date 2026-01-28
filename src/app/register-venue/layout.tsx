import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register Your Venue on BahrainNights | BahrainNights',
  description: 'List your restaurant, bar, lounge, or venue on BahrainNights. Reach thousands of people looking for the best places in Bahrain.',
  alternates: {
    canonical: 'https://www.bahrainnights.com/register-venue',
  },
  openGraph: {
    title: 'Register Your Venue on BahrainNights',
    description: 'List your restaurant, bar, lounge, or venue on BahrainNights.',
    type: 'website',
    locale: 'en_BH',
    url: 'https://www.bahrainnights.com/register-venue',
  },
};

export default function RegisterVenueLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
