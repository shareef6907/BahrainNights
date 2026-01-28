import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Become a Guide on BahrainNights | BahrainNights',
  description: 'Join BahrainNights as a local guide. Share your expertise about Bahrain\'s best restaurants, nightlife, events, and hidden gems with our growing community.',
  alternates: {
    canonical: 'https://www.bahrainnights.com/become-a-guide',
  },
  openGraph: {
    title: 'Become a Guide on BahrainNights',
    description: 'Join BahrainNights as a local guide. Share your expertise about Bahrain\'s best spots.',
    type: 'website',
    locale: 'en_BH',
    url: 'https://www.bahrainnights.com/become-a-guide',
  },
};

export default function BecomeGuideLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
