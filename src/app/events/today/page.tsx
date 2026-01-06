import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events Happening Today in Bahrain | BahrainNights',
  description: 'Discover what events are happening today in Bahrain. Find concerts, parties, exhibitions, family activities, and more happening right now.',
  keywords: 'events today bahrain, whats on today bahrain, today events manama, bahrain events tonight',
};

export default function EventsTodayPage() {
  // Redirect to events page with today filter
  redirect('/events?time=today');
}
