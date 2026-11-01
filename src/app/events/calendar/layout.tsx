import type { Metadata } from 'next';

// The calendar page itself is a client component, so it cannot export metadata.
// This server layout carries the canonical + robots directives for the route.
export const metadata: Metadata = {
  title: 'Events Calendar | What\'s On in Bahrain | Bahrain Nights',
  description:
    'Browse the Bahrain events calendar - see what\'s on today, this week and this month. Concerts, exhibitions, family activities, parties and more, all in one calendar view.',
  alternates: {
    canonical: '/events/calendar',
  },
};

export default function EventsCalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
