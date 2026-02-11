import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, Waves, Fish, Anchor } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Diving in Bahrain 2026 | Dive Sites, Courses & Operators',
  description: 'Complete guide to scuba diving in Bahrain. Dive sites, PADI courses, pearl diving experiences, and dive operators. Explore underwater Bahrain.',
  keywords: 'diving Bahrain, scuba diving Bahrain, PADI Bahrain, dive sites Bahrain, pearl diving Bahrain, snorkeling Bahrain',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/diving-bahrain' },
  openGraph: {
    title: 'Diving in Bahrain 2026',
    description: 'Explore underwater Bahrain - dive sites, courses, and pearl diving experiences.',
    type: 'article', locale: 'en_US',
  },
};

const faqs = [
  { q: 'Where can I dive in Bahrain?', a: 'Popular dive sites include Fasht Al Adm reef, Jarada Island, various shipwrecks, and artificial reefs. The waters around Bahrain offer visibility up to 15m and diverse marine life including rays, reef fish, and seasonal whale sharks.' },
  { q: 'What dive operators are in Bahrain?', a: 'Established operators include Bahrain Yacht Club Diving, Al Dar Islands Dive Center, and several hotel-based PADI centers. Most offer discovery dives, certifications, and guided trips.' },
  { q: 'How much does diving cost in Bahrain?', a: 'Discovery dives start from 40-60 BD. PADI Open Water certification costs 180-250 BD. Certified diver trips typically cost 35-50 BD per dive including equipment.' },
  { q: 'What\'s the best time for diving in Bahrain?', a: 'October to April offers the best diving conditions with cooler water and better visibility. Summer diving is possible but water temps reach 32°C+ and visibility decreases.' },
  { q: 'Can I try pearl diving in Bahrain?', a: 'Yes! Pearl diving experiences are available as cultural tourism, recreating Bahrain\'s historic pearl industry. Operators offer supervised shallow-water pearl diving trips where you may find real pearls.' },
];

const operators = [
  {
    name: 'Bahrain Yacht Club Diving',
    area: 'Manama',
    rating: 5,
    priceRange: 'BD 40-60/dive',
    services: ['PADI courses', 'Guided dives', 'Equipment rental', 'Night dives'],
    bestFor: 'Certified divers, courses',
  },
  {
    name: 'Al Dar Islands Dive Center',
    area: 'Al Dar Islands',
    rating: 4,
    priceRange: 'BD 35-55/dive',
    services: ['Discovery dives', 'Snorkeling', 'Pearl diving', 'Island access'],
    bestFor: 'Day trips, beginners',
  },
  {
    name: 'Hotel Dive Centers',
    area: 'Various',
    rating: 4,
    priceRange: 'BD 50-80/dive',
    services: ['Guest convenience', 'Pool training', 'PADI courses', 'Equipment'],
    bestFor: 'Hotel guests, convenience',
  },
];

const diveSites = [
  { name: 'Fasht Al Adm', depth: '8-18m', highlight: 'Healthy coral reef, diverse fish life' },
  { name: 'Jarada Island', depth: '5-12m', highlight: 'Easy diving, rays, coral formations' },
  { name: 'Shipwrecks', depth: '15-30m', highlight: 'Multiple wrecks for advanced divers' },
  { name: 'Artificial Reefs', depth: '10-20m', highlight: 'Developing ecosystems, good visibility' },
];

export default function DivingBahrainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Diving in Bahrain', url: 'https://www.bahrainnights.com/guides/diving-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium mb-4">🤿 Activity Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">Diving</span> in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore Bahrain&apos;s underwater world — coral reefs, shipwrecks, and 
              the historic pearl diving heritage of the Arabian Gulf.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Bahrain&apos;s diving scene offers unique experiences in the warm Arabian Gulf waters. 
            While not known for world-class reefs, the kingdom provides interesting diving with 
            healthy local reefs, artificial structures, shipwrecks, and the chance to participate 
            in authentic pearl diving — connecting to Bahrain&apos;s heritage as the Gulf&apos;s pearl capital.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Visibility ranges from 5-15 meters depending on conditions, with water temperatures 
            comfortable year-round (22-32°C). Marine life includes rays, reef fish, moray eels, 
            and during winter months, the occasional whale shark.
          </p>
        </div>
      </section>

      {/* Dive Sites */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Dive Sites</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {diveSites.map((site) => (
              <div key={site.name} className="bg-white/5 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <Fish className="w-8 h-8 text-blue-400 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold mb-1">{site.name}</h3>
                    <p className="text-blue-400 text-sm mb-2">Depth: {site.depth}</p>
                    <p className="text-gray-400 text-sm">{site.highlight}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operators */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Dive Operators</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {operators.map((op) => (
              <div key={op.name} className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold">{op.name}</h3>
                    <p className="text-blue-400 text-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {op.area}
                    </p>
                  </div>
                  <div className="font-bold text-sm">{op.priceRange}</div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {op.services.map((s) => (
                    <span key={s} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">{s}</span>
                  ))}
                </div>
                <p className="text-xs text-gray-500"><strong>Best for:</strong> {op.bestFor}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Diving FAQs</h2>
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
          <h2 className="text-xl font-bold mb-6">More Activities</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { title: 'Beach Clubs', href: '/guides/beach-clubs' },
              { title: 'Pool Day Passes', href: '/guides/pool-day-passes-bahrain' },
              { title: 'Outdoor Activities', href: '/guides/outdoor-activities-bahrain' },
              { title: 'Golf', href: '/guides/golf-bahrain' },
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
        headline: 'Diving in Bahrain 2026',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2026-02-11', dateModified: '2026-02-11',
      })}} />
    </div>
  );
}
