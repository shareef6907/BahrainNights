import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, Hotel, Building2, Landmark } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hotels in Manama Bahrain 2026 | Central Manama Hotels',
  description: 'Guide to hotels in central Manama, Bahrain. Stay in the capital\'s heart near the souq, business district, museums, and historic sites.',
  keywords: 'hotels Manama Bahrain, Manama hotels, central Bahrain hotels, downtown Manama, hotels near Bahrain souq',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/hotels-manama-bahrain' },
  openGraph: {
    title: 'Hotels in Manama Bahrain 2026',
    description: 'Find the best hotels in central Manama - Bahrain\'s capital city.',
    type: 'article', locale: 'en_US',
  },
};

const faqs = [
  { q: 'Why stay in central Manama?', a: 'Central Manama puts you near the historic souq, Bahrain National Museum, business district, and the Corniche. It\'s walkable and well-connected, with easy access to other areas by taxi or rideshare.' },
  { q: 'What hotels are in downtown Manama?', a: 'Options include the Ritz-Carlton, InterContinental Regency, Crowne Plaza, and several mid-range hotels. The Diplomatic Area and nearby Juffair have additional options.' },
  { q: 'Is Manama good for business travelers?', a: 'Yes, central Manama is ideal for business. It\'s near the Diplomatic Area, Bahrain Financial Harbour, government offices, and many corporate headquarters. Hotels here cater to business needs.' },
  { q: 'How far is Manama from the airport?', a: 'Bahrain International Airport is about 15-20 minutes from central Manama by car. Most hotels offer airport transfers, and taxis are readily available.' },
  { q: 'Is Manama walkable?', a: 'Parts of Manama are walkable, especially around the souq, museum area, and Corniche. However, Bahrain is generally car-oriented. Summer heat makes walking impractical during the day from May-September.' },
];

const hotels = [
  {
    name: 'The Ritz-Carlton, Bahrain',
    rating: 5,
    priceRange: 'BD 100-250',
    area: 'Manama/Seef border',
    highlights: ['Private beach', 'Multiple restaurants', 'Spa', 'Iconic property'],
    bestFor: 'Luxury seekers, special occasions',
  },
  {
    name: 'InterContinental Regency',
    rating: 5,
    priceRange: 'BD 70-130',
    area: 'Diplomatic Area',
    highlights: ['Business facilities', 'Central location', 'Pool', 'Multiple dining'],
    bestFor: 'Business travelers, convenience',
  },
  {
    name: 'Crowne Plaza Bahrain',
    rating: 4,
    priceRange: 'BD 50-90',
    area: 'Diplomatic Area',
    highlights: ['Business center', 'Near embassies', 'Good value'],
    bestFor: 'Corporate travel, mid-range luxury',
  },
  {
    name: 'Wyndham Garden',
    rating: 4,
    priceRange: 'BD 40-70',
    area: 'Manama',
    highlights: ['Modern rooms', 'Rooftop pool', 'City views'],
    bestFor: 'Modern comfort, value',
  },
  {
    name: 'Mercure Grand Hotel',
    rating: 4,
    priceRange: 'BD 35-60',
    area: 'Diplomatic Area',
    highlights: ['Reliable chain', 'Good facilities', 'Business-friendly'],
    bestFor: 'Consistent quality',
  },
  {
    name: 'Budget Hotels',
    rating: 3,
    priceRange: 'BD 20-40',
    area: 'Various Manama',
    highlights: ['Basic rooms', 'Central access', 'No frills'],
    bestFor: 'Budget travelers',
  },
];

export default function HotelsManamaBahrainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Hotels in Manama', url: 'https://www.bahrainnights.com/guides/hotels-manama-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-blue-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm font-medium mb-4">🏨 Hotel Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Hotels in <span className="bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent">Manama</span>, Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Stay in Bahrain&apos;s capital city — near the historic souq, museums, 
              business district, and the heart of the kingdom.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">About Central Manama</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Manama is Bahrain&apos;s capital and largest city, home to the Diplomatic Area, 
            historic souq, national museum, and waterfront Corniche. Staying here puts you 
            at the center of Bahraini life — near government buildings, cultural sites, 
            and traditional markets.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <Landmark className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
              <h3 className="font-bold">Culture</h3>
              <p className="text-sm text-gray-400">Museums, souq, heritage</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <Building2 className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
              <h3 className="font-bold">Business</h3>
              <p className="text-sm text-gray-400">Diplomatic Area, offices</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <MapPin className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
              <h3 className="font-bold">Central</h3>
              <p className="text-sm text-gray-400">Access all areas easily</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Hotels in Manama</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {hotels.map((hotel) => (
              <div key={hotel.name} className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold">{hotel.name}</h3>
                    <p className="text-indigo-400 text-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {hotel.area}
                    </p>
                    <div className="flex items-center gap-1 text-yellow-400 mt-1">
                      {[...Array(hotel.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>
                  <div className="text-indigo-400 font-bold">{hotel.priceRange}</div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {hotel.highlights.map((h) => (
                    <span key={h} className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded">{h}</span>
                  ))}
                </div>
                <p className="text-xs text-gray-500"><strong>Best for:</strong> {hotel.bestFor}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Manama Hotel FAQs</h2>
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
              { title: 'Hotels in Amwaj', href: '/guides/hotels-amwaj-bahrain' },
            ].map((guide) => (
              <Link key={guide.href} href={guide.href} className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors">
                {guide.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-6">Explore Manama</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { title: 'Manama City Guide', href: '/guides/manama-city-guide' },
              { title: 'Things to Do Tonight', href: '/tonight' },
              { title: 'This Weekend', href: '/this-weekend' },
              { title: 'Best Restaurants', href: '/guides/restaurants' },
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
        headline: 'Hotels in Manama Bahrain 2026',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2026-02-11', dateModified: '2026-02-11',
      })}} />
    </div>
  );
}
