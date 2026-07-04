import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Marketing by Bahrain Nights — Creative & Marketing Studio',
  description: 'Creative & marketing studio serving clients in Bahrain and across the region — film, photography, animation, social media, and websites, one team behind your brand.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: 'https://bahrainnights.com/marketing/en',
    languages: {
      'en': 'https://bahrainnights.com/marketing/en',
      'ar': 'https://bahrainnights.com/marketing/ar',
    },
  },
  openGraph: {
    title: 'Marketing by Bahrain Nights',
    description: 'Creative & marketing studio serving clients in Bahrain and across the region.',
    url: 'https://bahrainnights.com/marketing/en',
    siteName: 'Marketing by Bahrain Nights',
    locale: 'en_US',
    type: 'website',
  },
};

export default function MarketingPage() {
  return (
    <div style={{ minHeight: '100vh', padding: '4rem 2rem', background: '#0A0A0B', color: '#fff' }}>
      <h1>Marketing by Bahrain Nights</h1>
      <p>Creative & marketing studio serving clients in Bahrain and across the region.</p>
      <p>Film. Photography. Animation. Social Media. Websites. One team behind your brand.</p>
    </div>
  );
}
