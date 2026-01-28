import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | BahrainNights',
  description: 'Get in touch with the BahrainNights team. Questions about events, venue listings, advertising, or partnerships? We\'re here to help.',
  keywords: 'contact bahrainnights, bahrain events contact, bahrainnights email, bahrainnights phone',
  alternates: {
    canonical: 'https://www.bahrainnights.com/contact',
  },
  openGraph: {
    title: 'Contact Us | BahrainNights',
    description: 'Get in touch with the BahrainNights team. Questions about events, venue listings, advertising, or partnerships?',
    type: 'website',
    locale: 'en_BH',
    url: 'https://www.bahrainnights.com/contact',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Us | BahrainNights',
    description: 'Get in touch with the BahrainNights team.',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
