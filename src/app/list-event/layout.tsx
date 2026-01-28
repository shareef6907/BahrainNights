import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'List Your Event on BahrainNights | BahrainNights',
  description: 'Promote your event on BahrainNights. Reach thousands of people looking for events and things to do in Bahrain. Free and premium listings available.',
  alternates: {
    canonical: 'https://www.bahrainnights.com/list-event',
  },
  openGraph: {
    title: 'List Your Event on BahrainNights',
    description: 'Promote your event on BahrainNights. Reach thousands of people looking for events in Bahrain.',
    type: 'website',
    locale: 'en_BH',
    url: 'https://www.bahrainnights.com/list-event',
  },
};

export default function ListEventLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
