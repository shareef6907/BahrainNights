import type { Metadata } from 'next';

// The offline page is a PWA fallback shown when the network is unavailable.
// It is not content - it must never be indexed.
export const metadata: Metadata = {
  title: 'You\'re Offline | Bahrain Nights',
  description: 'You appear to be offline. Reconnect to browse events, venues and nightlife in Bahrain.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function OfflineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
