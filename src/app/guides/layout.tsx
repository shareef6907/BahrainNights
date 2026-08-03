import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Bahrain Nights Guides',
    default: 'Travel Guides | Bahrain Nights',
  },
  description: 'Expert guides to help you explore Bahrain - from nightlife and dining to culture and events.',
};

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
