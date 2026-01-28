import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Sponsors & Partners | BahrainNights',
  description: 'Meet the sponsors and partners who support BahrainNights in bringing you the best events, nightlife, and entertainment coverage in Bahrain.',
  alternates: {
    canonical: 'https://www.bahrainnights.com/sponsors',
  },
  openGraph: {
    title: 'Our Sponsors & Partners | BahrainNights',
    description: 'Meet the sponsors and partners who support BahrainNights.',
    type: 'website',
    locale: 'en_BH',
    url: 'https://www.bahrainnights.com/sponsors',
  },
};

export default function SponsorsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
