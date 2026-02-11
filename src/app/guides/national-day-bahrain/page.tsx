import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, Flag, Sparkles, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Bahrain National Day 2026 | Events, Fireworks & Celebrations',
  description: 'Complete guide to Bahrain National Day celebrations. Fireworks, events, parades, and activities for December 16-17. Where to celebrate National Day in Bahrain.',
  keywords: 'Bahrain National Day, National Day Bahrain 2026, Bahrain National Day fireworks, December 16 Bahrain, Bahrain independence day',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/national-day-bahrain' },
  openGraph: {
    title: 'Bahrain National Day 2026 - Events & Celebrations',
    description: 'Everything you need to know about celebrating Bahrain National Day.',
    type: 'article', locale: 'en_US',
  },
};

const faqs = [
  { q: 'When is Bahrain National Day?', a: 'Bahrain National Day is celebrated on December 16th (Independence Day, 1971) and December 17th (Accession Day of HM King Hamad). Both days are public holidays.' },
  { q: 'Where are the National Day fireworks in Bahrain?', a: 'Major fireworks displays are held at Bahrain Bay, various malls, and sometimes Arad Fort. Check official announcements and local news for confirmed locations and times.' },
  { q: 'What events happen on National Day?', a: 'Events include fireworks displays, military parades, air shows, cultural performances, mall celebrations, and special hotel events. Many buildings are decorated in red and white.' },
  { q: 'Is everything closed on National Day?', a: 'Most government offices and banks are closed. Malls and restaurants are open (often with extended hours). Some may have special National Day promotions and events.' },
  { q: 'How do locals celebrate National Day?', a: 'Families gather for celebrations, attend fireworks and events, decorate cars and homes with flags, wear traditional or red/white clothing, and enjoy the festive atmosphere across the kingdom.' },
];

const celebrations = [
  {
    name: 'Fireworks Displays',
    locations: ['Bahrain Bay', 'City Centre Mall', 'Various locations'],
    description: 'Spectacular fireworks light up the sky across Bahrain',
    timing: 'Usually 8-9 PM on Dec 16-17',
  },
  {
    name: 'Military Parade',
    locations: ['National Stadium area'],
    description: 'Official parade with military displays and performances',
    timing: 'Morning of December 16th',
  },
  {
    name: 'Air Show',
    locations: ['Bahrain Bay / Manama skyline'],
    description: 'Royal Bahraini Air Force display with aerobatic teams',
    timing: 'Varies - check announcements',
  },
  {
    name: 'Mall Events',
    locations: ['City Centre', 'Seef Mall', 'The Avenues'],
    description: 'Family entertainment, activities, and celebrations',
    timing: 'All day Dec 16-17',
  },
  {
    name: 'Cultural Performances',
    locations: ['Various venues'],
    description: 'Traditional music, dance, and heritage displays',
    timing: 'Throughout the celebrations',
  },
];

export default function NationalDayBahrainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-red-950/20 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'National Day', url: 'https://www.bahrainnights.com/guides/national-day-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-white/5" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium mb-4">🇧🇭 National Day</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Bahrain <span className="bg-gradient-to-r from-red-500 to-white bg-clip-text text-transparent">National Day</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              December 16-17 — Celebrating Bahrain&apos;s independence and heritage with 
              fireworks, parades, and nationwide festivities.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Bahrain National Day commemorates the country&apos;s independence on December 16, 1971, 
            and the accession of His Majesty King Hamad bin Isa Al Khalifa on December 17. 
            These two days transform the kingdom into a sea of red and white, with celebrations 
            ranging from spectacular fireworks to family-friendly events.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            The festive spirit is everywhere — cars adorned with flags, buildings lit in national 
            colors, and a palpable sense of pride throughout the streets. It&apos;s one of the best 
            times to experience Bahraini culture and hospitality.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">What to Expect</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {celebrations.map((event) => (
              <div key={event.name} className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all">
                <h3 className="text-xl font-bold mb-2">{event.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{event.description}</p>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {event.locations.map((loc) => (
                      <span key={loc} className="text-xs bg-red-500/20 text-red-300 px-2 py-0.5 rounded">{loc}</span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">⏰ {event.timing}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">National Day FAQs</h2>
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
              { title: 'Best Views', href: '/guides/best-views-bahrain' },
              { title: 'Family Activities', href: '/guides/kids-activities-bahrain' },
              { title: 'Manama Guide', href: '/guides/manama-city-guide' },
              { title: 'New Year\'s Eve', href: '/guides/new-years-eve-bahrain' },
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
        headline: 'Bahrain National Day 2026 - Events & Celebrations',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2026-02-11', dateModified: '2026-02-11',
      })}} />
    </div>
  );
}
