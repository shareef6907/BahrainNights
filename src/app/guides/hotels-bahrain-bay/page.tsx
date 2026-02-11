import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, Hotel, Building2, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hotels in Bahrain Bay 2026 | Luxury Waterfront Hotels',
  description: 'Guide to luxury hotels in Bahrain Bay. Four Seasons, waterfront views, and premium accommodations in Bahrain\'s most prestigious address.',
  keywords: 'hotels Bahrain Bay, Four Seasons Bahrain, luxury hotels Bahrain, waterfront hotels Bahrain, 5 star hotels Bahrain',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/hotels-bahrain-bay' },
  openGraph: {
    title: 'Hotels in Bahrain Bay 2026',
    description: 'Luxury waterfront hotels in Bahrain Bay - the kingdom\'s most prestigious address.',
    type: 'article', locale: 'en_US',
  },
};

const faqs = [
  { q: 'What is Bahrain Bay?', a: 'Bahrain Bay is a modern waterfront development in Manama featuring the Four Seasons Hotel, The Avenues mall, high-end residences, and a scenic promenade. It\'s Bahrain\'s most prestigious address.' },
  { q: 'What hotels are in Bahrain Bay?', a: 'The Four Seasons Hotel Bahrain Bay is the anchor property. The area also has premium serviced apartments. Other luxury hotels like Ritz-Carlton are nearby in Manama.' },
  { q: 'How much do Bahrain Bay hotels cost?', a: 'Four Seasons rooms start around 120-180 BD per night, with suites going much higher. It\'s Bahrain\'s most expensive hotel area. Worth it for special occasions.' },
  { q: 'Is Bahrain Bay good for tourists?', a: 'Excellent for luxury travelers. World-class dining, stunning views, and The Avenues mall. Less convenient for budget travelers - better options in Juffair or Seef.' },
  { q: 'What restaurants are in Bahrain Bay?', a: 'Four Seasons has CUT, Re Asian Cuisine, and other venues. The Avenues mall has numerous restaurants. The promenade area is developing with more dining options.' },
];

const hotels = [
  {
    name: 'Four Seasons Hotel Bahrain Bay',
    rating: 5,
    priceRange: 'BD 120-300+',
    highlights: ['Iconic architecture', 'World-class restaurants', 'Private beach', 'Spa', 'Bay views'],
    bestFor: 'Luxury seekers, special occasions, honeymooners',
  },
  {
    name: 'Four Seasons Serviced Apartments',
    rating: 5,
    priceRange: 'BD 150-400+',
    highlights: ['Apartment-style luxury', 'Kitchen facilities', 'Hotel services'],
    bestFor: 'Extended luxury stays, families',
  },
];

const nearbyOptions = [
  {
    name: 'Ritz-Carlton Bahrain',
    area: 'Manama (10 min)',
    rating: 5,
    priceRange: 'BD 100-250',
  },
  {
    name: 'Jumeirah Royal Saray',
    area: 'Seef (15 min)',
    rating: 5,
    priceRange: 'BD 90-200',
  },
  {
    name: 'ART Rotana',
    area: 'Amwaj (20 min)',
    rating: 5,
    priceRange: 'BD 70-150',
  },
];

export default function HotelsBahrainBayPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-amber-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Hotels in Bahrain Bay', url: 'https://www.bahrainnights.com/guides/hotels-bahrain-bay' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-4">✨ Luxury Hotels</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Hotels in <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Bahrain Bay</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Bahrain&apos;s most prestigious address — waterfront luxury with stunning 
              skyline views and world-class hospitality.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">About Bahrain Bay</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Bahrain Bay is a stunning waterfront development that represents modern Bahrain 
            at its finest. The area centers around the iconic Four Seasons Hotel with its 
            distinctive twin towers, The Avenues mall (the kingdom&apos;s newest and largest), 
            and a beautiful promenade perfect for evening strolls.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <Sparkles className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <h3 className="font-bold">Luxury</h3>
              <p className="text-sm text-gray-400">5-star everything</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <Building2 className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <h3 className="font-bold">Modern</h3>
              <p className="text-sm text-gray-400">Iconic architecture</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <MapPin className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <h3 className="font-bold">Waterfront</h3>
              <p className="text-sm text-gray-400">Stunning bay views</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Bahrain Bay Hotels</h2>
          <div className="grid gap-6">
            {hotels.map((hotel) => (
              <div key={hotel.name} className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-2xl font-bold">{hotel.name}</h3>
                    <div className="flex items-center gap-1 text-yellow-400">
                      {[...Array(hotel.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                  <div className="text-amber-400 font-bold text-lg">{hotel.priceRange}</div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {hotel.highlights.map((h) => (
                    <span key={h} className="text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded">{h}</span>
                  ))}
                </div>
                <p className="text-gray-400"><strong>Best for:</strong> {hotel.bestFor}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Other Luxury Options Nearby</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {nearbyOptions.map((hotel) => (
              <div key={hotel.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold">{hotel.name}</h3>
                <p className="text-amber-400 text-sm">{hotel.area}</p>
                <div className="flex items-center gap-1 text-yellow-400 my-2">
                  {[...Array(hotel.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <p className="text-gray-400 text-sm">{hotel.priceRange}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Bahrain Bay FAQs</h2>
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
              { title: 'Hotels in Amwaj', href: '/guides/hotels-amwaj-bahrain' },
              { title: 'Best Views', href: '/guides/best-views-bahrain' },
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
        headline: 'Hotels in Bahrain Bay 2026',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2026-02-11', dateModified: '2026-02-11',
      })}} />
    </div>
  );
}
