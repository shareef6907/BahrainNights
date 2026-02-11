import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, Clock, Wine, Beer } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Happy Hours in Bahrain 2026 | Drink Deals & Specials',
  description: 'Find the best happy hour deals in Bahrain. Discounted drinks, 2-for-1 offers, and the best bars for after-work drinks.',
  keywords: 'happy hour Bahrain, drink deals Bahrain, cheap drinks Bahrain, bar specials Bahrain, after work drinks Bahrain',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/happy-hour-bahrain' },
  openGraph: {
    title: 'Best Happy Hours in Bahrain 2026',
    description: 'The best happy hour deals and drink specials across Bahrain.',
    type: 'article', locale: 'en_US',
  },
};

const faqs = [
  { q: 'What time is happy hour in Bahrain?', a: 'Most happy hours run from 4-8 PM, with some starting as early as 3 PM or extending to 9 PM. Sunday through Wednesday typically have the best deals. Thursday happy hours are rarer.' },
  { q: 'How much can you save during happy hour?', a: 'Typical savings are 30-50% off regular prices. 2-for-1 deals are common. Expect to pay 2-4 BD per drink during happy hour versus 5-8 BD at regular prices.' },
  { q: 'Which hotels have the best happy hours?', a: 'Gulf Hotel, Ritz-Carlton, Diplomat, and InterContinental have popular happy hours. Hotel bars often have better ambiance and service than standalone bars.' },
  { q: 'Are there happy hours in Adliya?', a: 'Yes, many Adliya bars have happy hour deals, especially early week. Calexico, JJ\'s Irish Pub, and various venues offer specials. Check with specific venues for current deals.' },
  { q: 'Is there happy hour on weekends?', a: 'Weekend happy hours are less common. Thursday (the start of the Gulf weekend) sometimes has deals. Friday and Saturday happy hours are rare as these are peak nights.' },
];

const deals = [
  {
    venue: 'Hotel Bars',
    area: 'Various',
    timing: '4 PM - 8 PM',
    deal: '2-for-1 on select drinks',
    priceRange: 'BD 3-6 per drink',
    bestDays: 'Sun-Wed',
  },
  {
    venue: 'Gulf Hotel Venues',
    area: 'Adliya',
    timing: '5 PM - 8 PM',
    deal: '50% off selected beverages',
    priceRange: 'BD 2.5-5 per drink',
    bestDays: 'Sun-Tue',
  },
  {
    venue: 'Adliya Bars',
    area: 'Adliya',
    timing: '4 PM - 7 PM',
    deal: 'Various specials',
    priceRange: 'BD 2-4 per drink',
    bestDays: 'Sun-Wed',
  },
  {
    venue: 'Juffair Bars',
    area: 'Juffair',
    timing: '3 PM - 7 PM',
    deal: 'Cheap pints, 2-for-1',
    priceRange: 'BD 2-4 per drink',
    bestDays: 'Daily (varies)',
  },
  {
    venue: 'Sports Bars',
    area: 'Various',
    timing: 'Match times',
    deal: 'Game day specials',
    priceRange: 'BD 3-5 per drink',
    bestDays: 'Match days',
  },
];

export default function HappyHourBahrainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-amber-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Happy Hour', url: 'https://www.bahrainnights.com/guides/happy-hour-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-4">🍺 Drinks Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Happy Hours</span> in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              2-for-1 deals, discounted drinks, and the best spots for affordable 
              after-work drinks in Bahrain.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Drinking in Bahrain isn&apos;t cheap, but happy hour makes it much more accessible. 
            Most hotel bars and many standalone venues offer discounted drinks during early 
            evening hours, typically from 4-8 PM. The best deals are Sunday through Wednesday 
            when venues want to attract the after-work crowd.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            <strong className="text-amber-400">Pro tip:</strong> Happy hours change frequently. 
            Check with venues directly for current deals. Some require food orders, others have 
            minimum spends. House wines and draft beers usually offer the best value.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Happy Hour Deals</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {deals.map((deal) => (
              <div key={deal.venue} className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      {deal.venue}
                      <Beer className="w-4 h-4 text-amber-400" />
                    </h3>
                    <p className="text-amber-400 text-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {deal.area}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {deal.timing}
                    </div>
                  </div>
                </div>
                <p className="text-white font-medium mb-2">{deal.deal}</p>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>{deal.priceRange}</span>
                  <span>Best: {deal.bestDays}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Happy Hour FAQs</h2>
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
              { title: 'Juffair Bars', href: '/guides/juffair-restaurants-bars' },
              { title: 'Adliya Guide', href: '/guides/adliya' },
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
        headline: 'Best Happy Hours in Bahrain 2026',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2026-02-11', dateModified: '2026-02-11',
      })}} />
    </div>
  );
}
