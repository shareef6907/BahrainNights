import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events Calendar Bahrain - What\'s On Today & This Week | BahrainNights',
  description: 'Browse the complete Bahrain events calendar. Find concerts, parties, family activities, sports events, and more happening today, this week, and this month in Bahrain.',
  keywords: 'bahrain events calendar, what\'s on bahrain, bahrain events today, bahrain events this week, things to do bahrain today',
  alternates: {
    canonical: 'https://www.bahrainnights.com/calendar',
  },
  openGraph: {
    title: 'Events Calendar Bahrain - What\'s On Today & This Week',
    description: 'Browse the complete Bahrain events calendar. Find concerts, parties, family activities, and more happening in Bahrain.',
    type: 'website',
    locale: 'en_BH',
    url: 'https://www.bahrainnights.com/calendar',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Events Calendar Bahrain - What\'s On Today & This Week',
    description: 'Browse the complete Bahrain events calendar. Find concerts, parties, family activities, and more.',
  },
};

export default function CalendarLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
