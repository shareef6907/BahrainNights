import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, Clock, Users, DollarSign } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Bowling Alleys in Bahrain 2026 | Lanes, Prices & Locations',
  description: 'Find the best bowling alleys in Bahrain. Family-friendly lanes, cosmic bowling, arcade games, and birthday party packages. Complete guide with prices.',
  keywords: 'bowling Bahrain, bowling alley Bahrain, bowling prices Bahrain, family bowling Bahrain, cosmic bowling Bahrain',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/bowling-bahrain' },
  openGraph: {
    title: 'Best Bowling Alleys in Bahrain 2026',
    description: 'Discover the top bowling venues in Bahrain for family fun and entertainment.',
    type: 'article', locale: 'en_US',
  },
};

const faqs = [
  { q: 'Where can I go bowling in Bahrain?', a: 'Main bowling alleys include Funland at Seef Mall, Dana Mall Bowling, Magic Planet at City Centre, and Funscape. Each offers multiple lanes with varying atmospheres from family-friendly to cosmic bowling.' },
  { q: 'How much does bowling cost in Bahrain?', a: 'Bowling typically costs 2-4 BD per game per person. Shoe rental is usually included or costs 0.5-1 BD extra. Many venues offer hourly lane rental (10-20 BD/hour) which is better value for groups.' },
  { q: 'Do bowling alleys in Bahrain have cosmic bowling?', a: 'Yes, most major bowling alleys offer cosmic/glow bowling on weekends and evenings. Funland and Magic Planet are known for their cosmic bowling nights with black lights and music.' },
  { q: 'Can I book bowling for birthday parties?', a: 'All major bowling alleys offer birthday party packages including lane time, food, cake, and party room access. Packages typically start from 100-150 BD for 10-15 kids.' },
  { q: 'What age is appropriate for bowling in Bahrain?', a: 'Bowling is suitable for all ages. Most venues have lightweight balls and bumper rails for children. Kids as young as 3-4 can enjoy bowling with adult supervision.' },
];

const venues = [
  {
    name: 'Funland - Seef Mall',
    area: 'Seef',
    rating: 4,
    pricePerGame: 'BD 3-4',
    lanes: '12 lanes',
    features: ['Cosmic bowling', 'Arcade games', 'Food court nearby', 'Modern lanes'],
    bestFor: 'Families, teens',
  },
  {
    name: 'Magic Planet - City Centre',
    area: 'Seef',
    rating: 4,
    pricePerGame: 'BD 3-4',
    lanes: '10 lanes',
    features: ['Theme park rides', 'Arcade', 'Glow bowling', 'Birthday packages'],
    bestFor: 'Kids, family outings',
  },
  {
    name: 'Dana Mall Bowling',
    area: 'Isa Town',
    rating: 4,
    pricePerGame: 'BD 2.5-3.5',
    lanes: '8 lanes',
    features: ['Value pricing', 'Less crowded', 'Food options', 'Relaxed vibe'],
    bestFor: 'Budget bowling, locals',
  },
  {
    name: 'Funscape',
    area: 'Saar',
    rating: 4,
    pricePerGame: 'BD 3-4',
    lanes: '8 lanes',
    features: ['Entertainment complex', 'Go-karts nearby', 'Dining', 'Modern facility'],
    bestFor: 'Full day entertainment',
  },
];

export default function BowlingBahrainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Bowling in Bahrain', url: 'https://www.bahrainnights.com/guides/bowling-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium mb-4">🎳 Activity Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Bowling</span> in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Strike up some fun at Bahrain&apos;s bowling alleys — perfect for families, 
              friends, and birthday celebrations.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Bowling remains one of Bahrain&apos;s most popular family activities, offering 
            air-conditioned entertainment that&apos;s perfect for escaping the heat. Most bowling 
            alleys are located within malls or entertainment complexes, making them easy to 
            combine with shopping, dining, or arcade games.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Whether you&apos;re a serious bowler looking to improve your game or just want a 
            fun activity for the kids, Bahrain&apos;s lanes cater to all skill levels with 
            bumpers available for beginners and lightweight balls for children.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Bowling Alleys</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {venues.map((venue) => (
              <div key={venue.name} className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold">{venue.name}</h3>
                    <p className="text-blue-400 text-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {venue.area}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm">{venue.pricePerGame}/game</div>
                    <div className="text-xs text-gray-400">{venue.lanes}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {venue.features.map((f) => (
                    <span key={f} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">{f}</span>
                  ))}
                </div>
                <p className="text-xs text-gray-500"><strong>Best for:</strong> {venue.bestFor}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Bowling FAQs</h2>
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
              { title: 'Escape Rooms', href: '/guides/escape-rooms-bahrain' },
              { title: 'Karaoke', href: '/guides/karaoke-bahrain' },
              { title: 'Kids Activities', href: '/guides/kids-activities-bahrain' },
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
        headline: 'Best Bowling Alleys in Bahrain 2026',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2026-02-11', dateModified: '2026-02-11',
      })}} />
    </div>
  );
}
