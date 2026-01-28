import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Content Guidelines | BahrainNights',
  description: 'Content guidelines and community standards for BahrainNights. Learn about our policies for venue listings, event submissions, and user-generated content.',
  alternates: {
    canonical: 'https://www.bahrainnights.com/content-guidelines',
  },
  openGraph: {
    title: 'Content Guidelines | BahrainNights',
    description: 'Content guidelines and community standards for BahrainNights.',
    type: 'website',
    locale: 'en_BH',
    url: 'https://www.bahrainnights.com/content-guidelines',
  },
};

export default function ContentGuidelinesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
