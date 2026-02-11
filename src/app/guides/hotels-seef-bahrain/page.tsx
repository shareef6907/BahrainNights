import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, Hotel, ShoppingBag, Utensils } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hotels in Seef Bahrain 2026 | Best Seef District Hotels',
  description: 'Guide to hotels in Seef, Bahrain. Best hotels near City Centre Mall, Seef Mall, and the business district. Budget to luxury options.',
  keywords: 'hotels Seef Bahrain, Seef district hotels, hotels near City Centre Bahrain, Seef accommodation, where to stay Seef Bahrain',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/hotels-seef-bahrain' },
  openGraph: {
    title: 'Hotels in Seef Bahrain 2026',
    description: 'Find the best hotels in Seef district - near malls, restaurants, and business centers.',
    type: 'article', locale: 'en_US',
  },
};

const faqs = [
  { q: 'Why stay in Seef, Bahrain?', a: 'Seef is Bahrain\'s main shopping and business district. It\'s home to City Centre Mall, Seef Mall, and numerous restaurants. Central location with good access to Manama, the airport, and attractions.' },
  { q: 'What hotels are near City Centre Bahrain?', a: 'The Westin is directly connected to City Centre Mall. Wyndham Grand, Elite Resort & Spa, and several mid-range hotels are within walking distance or a short drive.' },
  { q: 'Is Seef a good area for tourists?', a: 'Yes, especially for shopping and dining. It\'s convenient but less atmospheric than areas like Adliya or Manama. Good for families and business travelers who want mall access.' },
  { q: 'What are hotel prices in Seef?', a: 'Seef offers mid-range to upper-mid-range options. Expect 30-60 BD for good 4-star hotels, 60-100 BD for premium properties. Budget options available in surrounding areas.' },
  { q: 'Is Seef close to nightlife?', a: 'Seef has some hotel bars but isn\'t the nightlife hub. Adliya (15 min) and Juffair (20 min) are better for bars and clubs. Seef is better for shopping, dining, and business.' },
];

const hotels = [
  {
    name: 'The Westin Bahrain City Centre',
    rating: 5,
    priceRange: 'BD 70-120',
    highlights: ['Connected to City Centre Mall', 'Business facilities', 'Pool & spa'],
    bestFor: 'Shoppers, business travelers',
  },
  {
    name: 'Wyndham Grand Manama',
    rating: 5,
    priceRange: 'BD 60-100',
    highlights: ['Rooftop bar', 'Modern rooms', 'Near malls'],
    bestFor: 'Modern luxury seekers',
  },
  {
    name: 'Elite Resort & Spa',
    rating: 4,
    priceRange: 'BD 40-70',
    highlights: ['Beach club', 'Spa facilities', 'Family-friendly'],
    bestFor: 'Families, spa lovers',
  },
  {
    name: 'Fraser Suites Seef',
    rating: 4,
    priceRange: 'BD 45-80',
    highlights: ['Serviced apartments', 'Kitchen facilities', 'Long-stay friendly'],
    bestFor: 'Extended stays, families',
  },
  {
    name: 'Downtown Rotana',
    rating: 4,
    priceRange: 'BD 40-65',
    highlights: ['Central location', 'Multiple restaurants', 'Good value'],
    bestFor: 'Business travelers, value seekers',
  },
  {
    name: 'Best Western Plus',
    rating: 3,
    priceRange: 'BD 25-45',
    highlights: ['Budget-friendly', 'Clean rooms', 'Basic amenities'],
    bestFor: 'Budget travelers',
  },
];

export default function HotelsSeefBahrainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Hotels in Seef', url: 'https://www.bahrainnights.com/guides/hotels-seef-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium mb-4">🏨 Hotel Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Hotels in <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Seef</span>, Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Stay in the heart of Bahrain&apos;s shopping district — steps from malls, 
              restaurants, and business centers.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">About Seef District</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Seef is Bahrain&apos;s premier shopping and business district. Home to City Centre 
            Bahrain (the island&apos;s largest mall), Seef Mall, and a concentration of restaurants 
            and offices, it&apos;s an excellent base for visitors who prioritize convenience 
            and shopping access.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <ShoppingBag className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <h3 className="font-bold">Shopping</h3>
              <p className="text-sm text-gray-400">Major malls within walking distance</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <Utensils className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <h3 className="font-bold">Dining</h3>
              <p className="text-sm text-gray-400">Hundreds of restaurants</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <MapPin className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <h3 className="font-bold">Central</h3>
              <p className="text-sm text-gray-400">15-20 min to most attractions</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Hotels in Seef</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {hotels.map((hotel) => (
              <div key={hotel.name} className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      {hotel.name}
                    </h3>
                    <div className="flex items-center gap-1 text-yellow-400">
                      {[...Array(hotel.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>
                  <div className="text-blue-400 font-bold">{hotel.priceRange}</div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {hotel.highlights.map((h) => (
                    <span key={h} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">{h}</span>
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
          <h2 className="text-3xl font-bold mb-12 text-center">Seef Hotel FAQs</h2>
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
              { title: 'Hotels in Juffair', href: '/guides/hotels-juffair-bahrain' },
              { title: 'Hotels in Manama', href: '/guides/hotels-manama-bahrain' },
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Hotels in Seef Bahrain 2026',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2026-02-11', dateModified: '2026-02-11',
      })}} />
    </div>
  );
}
