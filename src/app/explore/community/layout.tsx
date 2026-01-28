import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Community Events & Activities in Bahrain | BahrainNights',
  description: 'Discover community events, social gatherings, networking meetups, and group activities happening in Bahrain.',
  keywords: 'bahrain community, community events bahrain, meetups bahrain, social events bahrain, networking bahrain',
  alternates: {
    canonical: 'https://www.bahrainnights.com/explore/community',
  },
  openGraph: {
    title: 'Community Events & Activities in Bahrain',
    description: 'Discover community events, social gatherings, and networking meetups in Bahrain.',
    type: 'website',
    locale: 'en_BH',
    url: 'https://www.bahrainnights.com/explore/community',
  },
  twitter: {
    card: 'summary',
    title: 'Community Events & Activities in Bahrain',
    description: 'Discover community events, social gatherings, and networking meetups in Bahrain.',
  },
};

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
