import type { Metadata } from 'next';

// The calendar page itself is a client component, so it cannot export metadata.
// This server layout carries the canonical + robots directives for the route.
export const metadata: Metadata = {
  title: 'Events Calendar | What\'s On in Bahrain',
  description:
    'Browse the Bahrain events calendar and see what is on today, this week and this month, from concerts and exhibitions to parties.',
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
