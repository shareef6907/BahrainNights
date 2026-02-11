import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, Hotel, Palmtree, Waves } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hotels in Amwaj Islands Bahrain 2026 | Beach Resorts',
  description: 'Guide to hotels in Amwaj Islands, Bahrain. Beach resorts, island atmosphere, and relaxed luxury away from the city bustle.',
  keywords: 'hotels Amwaj Bahrain, Amwaj Islands hotels, beach hotels Bahrain, ART Rotana Amwaj, island resorts Bahrain',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/hotels-amwaj-bahrain' },
  openGraph: {
    title: 'Hotels in Amwaj Islands Bahrain 2026',
    description: 'Beach resort hotels on Amwaj Islands - Bahrain\'s island escape.',
    type: 'article', locale: 'en_US',
  },
};

const faqs = [
  { q: 'What are the Amwaj Islands?', a: 'Amwaj is a group of man-made islands in northeast Bahrain, connected to the mainland by causeway. It features residential areas, hotels, restaurants, and a relaxed beach atmosphere.' },
  { q: 'What hotels are on Amwaj Islands?', a: 'ART Rotana is the main resort hotel. There are also serviced apartments and rental properties. The Dragon Hotel and Resort is another option in the area.' },
  { q: 'Is Amwaj good for tourists?', a: 'Great for beach lovers wanting a relaxed escape from the city. Has good restaurants and a chill vibe. Less convenient for sightseeing or nightlife - you\'ll need transport to Manama.' },
  { q: 'How far is Amwaj from Manama?', a: 'Amwaj is about 25-30 minutes drive from central Manama. The airport is about 15-20 minutes away. You\'ll need a car or taxi for getting around.' },
  { q: 'Are there beaches in Amwaj?', a: 'Yes, Amwaj has several beaches. Hotel guests have beach access. There are also public areas and the lagoon beaches. The water is calm and suitable for swimming.' },
];

const hotels = [
  {
    name: 'ART Rotana',
    rating: 5,
    priceRange: 'BD 70-150',
    highlights: ['Private beach', 'Island resort feel', 'Multiple pools', 'Spa', 'Several restaurants'],
    bestFor: 'Beach lovers, families, relaxation',
  },
  {
    name: 'Dragon Hotel & Resort',
    rating: 4,
    priceRange: 'BD 50-90',
    highlights: ['Pool', 'Beach access', 'Quiet location'],
    bestFor: 'Mid-range beach escape',
  },
  {
    name: 'Serviced Apartments',
    rating: 3,
    priceRange: 'BD 35-70',
    highlights: ['Self-catering', 'Local living', 'Value for money'],
    bestFor: 'Extended stays, independent travelers',
  },
];

export default function HotelsAmwajBahrainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-cyan-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Hotels in Amwaj', url: 'https://www.bahrainnights.com/guides/hotels-amwaj-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-teal-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-medium mb-4">🏝️ Island Hotels</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Hotels in <span className="bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent">Amwaj Islands</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Bahrain&apos;s island escape — beach resorts and a relaxed atmosphere 
              away from the city.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">About Amwaj Islands</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Amwaj Islands offer something different in Bahrain — a genuine island escape with 
            beaches, lagoons, and a more relaxed pace. Connected to the mainland by causeway 
            and just 15 minutes from the airport, it&apos;s a popular choice for visitors 
            seeking beach time without venturing to more remote resorts.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <Waves className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <h3 className="font-bold">Beaches</h3>
              <p className="text-sm text-gray-400">Calm waters, sandy shores</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <Palmtree className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <h3 className="font-bold">Relaxed</h3>
              <p className="text-sm text-gray-400">Island atmosphere</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <Hotel className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <h3 className="font-bold">Resorts</h3>
              <p className="text-sm text-gray-400">All-inclusive options</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Hotels in Amwaj</h2>
          <div className="grid gap-6">
            {hotels.map((hotel) => (
              <div key={hotel.name} className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold">{hotel.name}</h3>
                    <div className="flex items-center gap-1 text-yellow-400">
                      {[...Array(hotel.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>
                  <div className="text-cyan-400 font-bold">{hotel.priceRange}</div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {hotel.highlights.map((h) => (
                    <span key={h} className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded">{h}</span>
                  ))}
                </div>
                <p className="text-gray-400"><strong>Best for:</strong> {hotel.bestFor}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Amwaj FAQs</h2>
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
          <h2 className="text-xl font-bold mb-6">Other Hotel Areas</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { title: 'Hotels in Seef', href: '/guides/hotels-seef-bahrain' },
              { title: 'Hotels in Juffair', href: '/guides/hotels-juffair-bahrain' },
              { title: 'Hotels in Bahrain Bay', href: '/guides/hotels-bahrain-bay' },
              { title: 'Beach Clubs', href: '/guides/beach-clubs' },
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
        headline: 'Hotels in Amwaj Islands Bahrain 2026',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2026-02-11', dateModified: '2026-02-11',
      })}} />
    </div>
  );
}
