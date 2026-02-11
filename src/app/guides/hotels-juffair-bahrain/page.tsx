import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, Hotel, Music, Utensils } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hotels in Juffair Bahrain 2026 | Best Juffair Hotels',
  description: 'Guide to hotels in Juffair, Bahrain. Stay near nightlife, restaurants, and the American Navy base. Budget to mid-range options.',
  keywords: 'hotels Juffair Bahrain, Juffair hotels, where to stay Juffair, Juffair accommodation, hotels near Navy base Bahrain',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/hotels-juffair-bahrain' },
  openGraph: {
    title: 'Hotels in Juffair Bahrain 2026',
    description: 'Find hotels in Juffair - Bahrain\'s entertainment district with nightlife and dining.',
    type: 'article', locale: 'en_US',
  },
};

const faqs = [
  { q: 'Why stay in Juffair, Bahrain?', a: 'Juffair is Bahrain\'s entertainment hub with numerous bars, restaurants, and nightclubs. It\'s popular with tourists and expats. Also close to the US Navy base, so American visitors often stay here.' },
  { q: 'Is Juffair safe for tourists?', a: 'Yes, Juffair is generally safe. It\'s busy at night due to nightlife, which some may find lively. The area is well-policed. Normal travel precautions apply.' },
  { q: 'What are hotel prices in Juffair?', a: 'Juffair offers budget to mid-range options. Expect 20-40 BD for 3-star hotels, 40-70 BD for 4-star properties. It\'s generally cheaper than Seef or Bahrain Bay.' },
  { q: 'Is Juffair close to the beach?', a: 'Juffair itself doesn\'t have beaches, but it\'s 15-20 minutes from beach resorts in Zallaq. Some hotels have pools. Nearby Amwaj has beach access.' },
  { q: 'How far is Juffair from the airport?', a: 'Juffair is about 20-25 minutes from Bahrain International Airport by car. Taxis and rideshares are readily available.' },
];

const hotels = [
  {
    name: 'Majestic Arjaan by Rotana',
    rating: 4,
    priceRange: 'BD 45-75',
    highlights: ['Serviced apartments', 'Pool', 'Near nightlife'],
    bestFor: 'Extended stays, nightlife lovers',
  },
  {
    name: 'Gulf Executive Residence',
    rating: 4,
    priceRange: 'BD 35-55',
    highlights: ['Apartment-style', 'Kitchen facilities', 'Good value'],
    bestFor: 'Families, long stays',
  },
  {
    name: 'Golden Tulip Bahrain',
    rating: 4,
    priceRange: 'BD 35-60',
    highlights: ['Central Juffair', 'Business facilities', 'Restaurants'],
    bestFor: 'Business travelers',
  },
  {
    name: 'Ramee Grand Hotel',
    rating: 4,
    priceRange: 'BD 30-50',
    highlights: ['Pool', 'Multiple dining', 'Entertainment area'],
    bestFor: 'Mid-range comfort',
  },
  {
    name: 'Swiss-Belhotel',
    rating: 3,
    priceRange: 'BD 25-40',
    highlights: ['Budget-friendly', 'Clean rooms', 'Near bars'],
    bestFor: 'Budget nightlife seekers',
  },
  {
    name: 'Budget Hotels',
    rating: 3,
    priceRange: 'BD 15-30',
    highlights: ['Basic rooms', 'No frills', 'Location convenience'],
    bestFor: 'Budget travelers',
  },
];

export default function HotelsJuffairBahrainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Hotels in Juffair', url: 'https://www.bahrainnights.com/guides/hotels-juffair-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium mb-4">🏨 Hotel Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Hotels in <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Juffair</span>, Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Stay in Bahrain&apos;s entertainment district — walking distance to bars, 
              restaurants, and nightlife.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">About Juffair</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Juffair is Bahrain&apos;s most vibrant entertainment district. With dozens of bars, 
            nightclubs, and restaurants packed into a relatively small area, it&apos;s the 
            go-to neighborhood for nightlife. It&apos;s also home to many expats and is near 
            the US Naval base.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <Music className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <h3 className="font-bold">Nightlife</h3>
              <p className="text-sm text-gray-400">Bahrain&apos;s party central</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <Utensils className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <h3 className="font-bold">Dining</h3>
              <p className="text-sm text-gray-400">International cuisines</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <Hotel className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <h3 className="font-bold">Value</h3>
              <p className="text-sm text-gray-400">Budget-friendly options</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Hotels in Juffair</h2>
          <div className="grid md:grid-cols-2 gap-6">
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
                  <div className="text-purple-400 font-bold">{hotel.priceRange}</div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {hotel.highlights.map((h) => (
                    <span key={h} className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">{h}</span>
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
          <h2 className="text-3xl font-bold mb-12 text-center">Juffair Hotel FAQs</h2>
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
              { title: 'Hotels in Manama', href: '/guides/hotels-manama-bahrain' },
              { title: 'Hotels in Bahrain Bay', href: '/guides/hotels-bahrain-bay' },
              { title: 'Juffair Bars', href: '/guides/juffair-restaurants-bars' },
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
        headline: 'Hotels in Juffair Bahrain 2026',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2026-02-11', dateModified: '2026-02-11',
      })}} />
    </div>
  );
}
