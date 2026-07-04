import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'التسويق من البحرين نايتس — استوديو إبداعي وتسويق',
  description: 'استوديو إبداعي وتسويق يخدم العملاء في البحرين والمنطقة — الأفلام، التصوير، الرسوم المتحركة، وسائل التواصل الاجتماعي، والمواقع الإلكترونية، فريق واحد خلف علامتك التجارية.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: 'https://bahrainnights.com/marketing/ar',
    languages: {
      'en': 'https://bahrainnights.com/marketing/en',
      'ar': 'https://bahrainnights.com/marketing/ar',
    },
  },
  openGraph: {
    title: 'التسويق من البحرين نايتس',
    description: 'استوديو إبداعي وتسويق يخدم العملاء في البحرين والمنطقة.',
    url: 'https://bahrainnights.com/marketing/ar',
    siteName: 'التسويق من البحرين نايتس',
    locale: 'ar',
    type: 'website',
  },
};

export default function MarketingArabicPage() {
  return (
    <div style={{ minHeight: '100vh', padding: '4rem 2rem', background: '#0A0A0B', color: '#fff', direction: 'rtl' }}>
      <h1>التسويق من البحرين نايتس</h1>
      <p>استوديو إبداعي وتسويق يخدم العملاء في البحرين والمنطقة.</p>
      <p>الأفلام. التصوير. الرسوم المتحركة. وسائل التواصل الاجتماعي. المواقع الإلكترونية. فريق واحد خلف علامتك التجارية.</p>
    </div>
  );
}
