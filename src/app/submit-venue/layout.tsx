import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Submit Your Venue | BahrainNights',
  description: 'Submit your venue to be listed on BahrainNights. Get discovered by thousands of people looking for restaurants, bars, and entertainment in Bahrain.',
  alternates: {
    canonical: 'https://www.bahrainnights.com/submit-venue',
  },
  openGraph: {
    title: 'Submit Your Venue | BahrainNights',
    description: 'Submit your venue to be listed on BahrainNights.',
    type: 'website',
    locale: 'en_BH',
    url: 'https://www.bahrainnights.com/submit-venue',
  },
};

export default function SubmitVenueLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
