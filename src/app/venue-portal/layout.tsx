import type { Metadata } from 'next';
import VenuePortalShell from './VenuePortalShell';

// The venue portal is a private app surface for venue owners - it must never
// be indexed. The shell is a client component, so the robots directives live
// on this server layout.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function VenuePortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <VenuePortalShell>{children}</VenuePortalShell>;
}
