import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, Clock, Sun, DollarSign } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Golf in Bahrain 2026 | Courses, Clubs & Green Fees',
  description: 'Complete guide to golf in Bahrain. Golf courses, driving ranges, green fees, and membership info. Royal Golf Club and more.',
  keywords: 'golf Bahrain, golf courses Bahrain, Royal Golf Club Bahrain, green fees Bahrain, driving range Bahrain, golf membership Bahrain',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/golf-bahrain' },
  openGraph: {
    title: 'Golf in Bahrain 2026',
    description: 'Discover golf in Bahrain - courses, green fees, and clubs.',
    type: 'article', locale: 'en_US',
  },
};

const faqs = [
  { q: 'Where can I play golf in Bahrain?', a: 'The main golf venue is the Royal Golf Club in Riffa, featuring an 18-hole championship course. Awali Golf Club offers 9 holes, and there are several driving ranges and golf academies around Manama.' },
  { q: 'How much does golf cost in Bahrain?', a: 'Green fees at Royal Golf Club range from 40-80 BD for 18 holes depending on time and day. Driving ranges cost 5-15 BD per bucket. Golf lessons start from 25-40 BD per session.' },
  { q: 'Do I need membership to play golf in Bahrain?', a: 'No membership required for pay-and-play at Royal Golf Club, though members get preferential rates and tee times. Memberships are available for regular players.' },
  { q: 'What\'s the best time to play golf in Bahrain?', a: 'October to April offers the best weather for golf. Summer months are extremely hot — early morning tee times (before 7 AM) are recommended May-September.' },
  { q: 'Can beginners learn golf in Bahrain?', a: 'Yes, several golf academies offer lessons for beginners. Royal Golf Club has a driving range and teaching professionals. Some hotels also partner with golf instructors.' },
];

const venues = [
  {
    name: 'Royal Golf Club',
    area: 'Riffa',
    rating: 5,
    priceRange: 'BD 40-80',
    features: ['18-hole championship course', 'Clubhouse', 'Driving range', 'Pro shop', 'Restaurant'],
    bestFor: 'Serious golfers, visitors',
  },
  {
    name: 'Awali Golf Club',
    area: 'Awali',
    rating: 4,
    priceRange: 'BD 20-35',
    features: ['9-hole course', 'Sand greens', 'Historic club', 'Members\' bar'],
    bestFor: 'Casual golf, unique experience',
  },
  {
    name: 'Driving Ranges',
    area: 'Various',
    rating: 3,
    priceRange: 'BD 5-15',
    features: ['Practice facilities', 'Lessons available', 'Equipment rental', 'Flexible hours'],
    bestFor: 'Practice, beginners',
  },
];

export default function GolfBahrainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-green-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Golf in Bahrain', url: 'https://www.bahrainnights.com/guides/golf-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium mb-4">⛳ Activity Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">Golf</span> in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Tee off at Bahrain&apos;s golf courses — from championship greens to historic desert links.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Golf in Bahrain offers a unique experience, with the kingdom&apos;s flagship Royal Golf Club 
            providing a world-class 18-hole course in the desert landscape. The course, designed by 
            Karl Litten, features lush fairways maintained to international standards against the 
            backdrop of Riffa&apos;s terrain.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            For visitors, pay-and-play options make it easy to enjoy a round without membership 
            commitments. The best golfing season runs from October to April when temperatures are 
            pleasant, though early morning rounds are possible year-round.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Golf Venues</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {venues.map((venue) => (
              <div key={venue.name} className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold">{venue.name}</h3>
                    <p className="text-green-400 text-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {venue.area}
                    </p>
                  </div>
                  <div className="font-bold text-sm">{venue.priceRange}</div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {venue.features.map((f) => (
                    <span key={f} className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">{f}</span>
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
          <h2 className="text-3xl font-bold mb-12 text-center">Golf FAQs</h2>
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
              { title: 'Diving', href: '/guides/diving-bahrain' },
              { title: 'Outdoor Activities', href: '/guides/outdoor-activities-bahrain' },
              { title: 'Beach Clubs', href: '/guides/beach-clubs' },
              { title: 'Spa & Wellness', href: '/guides/spa-wellness-bahrain' },
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
        headline: 'Golf in Bahrain 2026',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2026-02-11', dateModified: '2026-02-11',
      })}} />
    </div>
  );
}
