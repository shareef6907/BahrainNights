import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, PartyPopper, Sparkles, Clock, Music } from 'lucide-react';

export const metadata: Metadata = {
  title: 'New Year\'s Eve in Bahrain 2026/2027 | Parties, Fireworks & Events',
  description: 'Complete guide to New Year\'s Eve in Bahrain. Best parties, hotel galas, fireworks locations, restaurants, and countdown events.',
  keywords: 'New Years Eve Bahrain, NYE Bahrain, New Year party Bahrain, fireworks Bahrain, New Year dinner Bahrain, countdown Bahrain',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/new-years-eve-bahrain' },
  openGraph: {
    title: 'New Year\'s Eve in Bahrain 2026/2027',
    description: 'The ultimate guide to celebrating NYE in Bahrain - parties, fireworks, and gala dinners.',
    type: 'article', locale: 'en_US',
  },
};

const faqs = [
  { q: 'Where are the best New Year\'s Eve parties in Bahrain?', a: 'Major hotels host gala dinners and parties - Four Seasons, Ritz-Carlton, Gulf Hotel, and Sofitel are top choices. Nightclubs in Adliya and Juffair also have special NYE events with international DJs.' },
  { q: 'Where can I watch fireworks in Bahrain on NYE?', a: 'Bahrain Bay typically has the main fireworks display. Other viewing spots include Bahrain Financial Harbour, the Corniche, and hotel venues with bay views. Check official announcements closer to the date.' },
  { q: 'How much do NYE gala dinners cost in Bahrain?', a: 'Hotel gala dinners range from 60-150 BD per person, often including dinner, drinks, entertainment, and countdown party. Premium packages with premium drinks can exceed 200 BD.' },
  { q: 'Do I need to book NYE events in advance?', a: 'Yes! Popular venues sell out weeks in advance. Book hotel galas and restaurant dinners by mid-December. Nightclub tables should be reserved at least a week ahead.' },
  { q: 'What time do NYE events start in Bahrain?', a: 'Gala dinners typically start at 8-9 PM with countdown at midnight. Nightclub parties often begin around 10 PM and continue until 3-4 AM. After-parties may run later.' },
];

const events = [
  {
    type: 'Hotel Galas',
    icon: '🎩',
    venues: [
      { name: 'Four Seasons Gala', price: 'BD 100-180', highlights: 'Bay views, fireworks, live band' },
      { name: 'Ritz-Carlton NYE', price: 'BD 90-150', highlights: 'Beachfront, multiple venues' },
      { name: 'Gulf Hotel', price: 'BD 70-120', highlights: 'Multiple restaurant options' },
      { name: 'Sofitel Zallaq', price: 'BD 80-130', highlights: 'Beach party atmosphere' },
    ]
  },
  {
    type: 'Nightclub Parties',
    icon: '🎉',
    venues: [
      { name: 'Club venues (Adliya)', price: 'BD 30-80', highlights: 'DJs, dancing, late night' },
      { name: 'Hotel clubs', price: 'BD 40-100', highlights: 'Premium crowd, packages' },
      { name: 'Rooftop parties', price: 'BD 50-100', highlights: 'Open air, city views' },
    ]
  },
  {
    type: 'Restaurant Dinners',
    icon: '🍾',
    venues: [
      { name: 'Fine dining venues', price: 'BD 50-100', highlights: 'Special menus, intimate' },
      { name: 'Waterfront restaurants', price: 'BD 60-120', highlights: 'Fireworks views possible' },
    ]
  },
];

export default function NewYearsEveBahrainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-amber-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'New Year\'s Eve', url: 'https://www.bahrainnights.com/guides/new-years-eve-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-yellow-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-4">🎆 New Year&apos;s Eve</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">New Year&apos;s Eve</span> in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ring in the new year with fireworks over Bahrain Bay, glamorous hotel galas, 
              and parties that go until dawn.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            New Year&apos;s Eve is one of Bahrain&apos;s biggest celebration nights. Hotels pull out 
            all the stops with gala dinners, live entertainment, and premium drinks packages. 
            Fireworks light up the sky over Bahrain Bay at midnight, visible from numerous 
            vantage points across the capital.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            <strong className="text-amber-400">Pro tip:</strong> Book early! The best hotel packages 
            sell out by mid-December. If you want a table with fireworks views, reserve by early 
            December at the latest.
          </p>
        </div>
      </section>

      {events.map((category) => (
        <section key={category.type} className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="text-3xl">{category.icon}</span>
              {category.type}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {category.venues.map((venue) => (
                <div key={venue.name} className="bg-white/5 rounded-xl p-5 hover:bg-white/10 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold">{venue.name}</h3>
                    <span className="text-amber-400 font-medium text-sm">{venue.price}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{venue.highlights}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">NYE FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6">
                <h3 className="font-bold mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-6">Related Guides</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { title: 'Nightlife', href: '/guides/nightlife' },
              { title: 'Best Views', href: '/guides/best-views-bahrain' },
              { title: 'Date Night', href: '/guides/best-date-night-bahrain' },
              { title: 'Rooftop Bars', href: '/guides/rooftop-bars-bahrain' },
            ].map((guide) => (
              <Link key={guide.href} href={guide.href} className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors">
                {guide.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'New Year\'s Eve in Bahrain 2026/2027',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2026-02-11', dateModified: '2026-02-11',
      })}} />
    </div>
  );
}
