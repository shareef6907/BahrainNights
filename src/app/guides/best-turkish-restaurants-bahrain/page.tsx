import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Turkish Restaurants in Bahrain 2026 | Kebabs, Mezze & More',
  description: 'Discover the best Turkish restaurants in Bahrain. Authentic kebabs, pide, lahmacun, mezze, and Turkish breakfast. Complete guide with prices and locations.',
  keywords: 'Turkish restaurants Bahrain, best Turkish food Bahrain, kebab Bahrain, Turkish breakfast Bahrain, pide Bahrain',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/best-turkish-restaurants-bahrain' },
  openGraph: {
    title: 'Best Turkish Restaurants in Bahrain 2026',
    description: 'Find authentic Turkish cuisine in Bahrain - kebabs, pide, mezze and more.',
    type: 'article', locale: 'en_US',
  },
};

const faqs = [
  { q: 'What are the best Turkish restaurants in Bahrain?', a: 'Top Turkish restaurants include Sultanahmet (traditional), Turk (modern), Saray (family-style), and Günaydın (steakhouse). Each offers distinct Turkish experiences from casual to upscale.' },
  { q: 'What Turkish dishes should I try?', a: 'Must-try dishes include Adana kebab, iskender kebab, lahmacun (Turkish pizza), pide (boat-shaped bread), manti (dumplings), Turkish breakfast spread, and kunefe for dessert.' },
  { q: 'How much does Turkish food cost in Bahrain?', a: 'Turkish restaurant prices range from 4-8 BD for casual kebab shops, 10-18 BD at mid-range restaurants, and 20-35 BD at upscale establishments. Turkish breakfast sets typically cost 8-15 BD.' },
  { q: 'Is Turkish food similar to Lebanese?', a: 'Both cuisines share Mediterranean influences and some dishes like hummus and grilled meats. Turkish cuisine features more bread varieties, unique kebab styles, and distinct desserts like baklava and kunefe.' },
  { q: 'What is a Turkish breakfast?', a: 'Turkish breakfast (kahvaltı) is a spread of cheeses, olives, tomatoes, cucumbers, honey, kaymak (clotted cream), eggs, bread, and Turkish tea. It\'s meant to be leisurely enjoyed, typically on weekends.' },
];

const restaurants = [
  {
    name: 'Sultanahmet Restaurant',
    area: 'Juffair',
    rating: 5,
    priceRange: 'BD 12-25',
    mustTry: ['Mixed grill platter', 'Iskender kebab', 'Kunefe'],
    vibe: 'Traditional Turkish ambiance',
    bestFor: 'Authentic experience, groups',
  },
  {
    name: 'Günaydın',
    area: 'Seef',
    rating: 5,
    priceRange: 'BD 18-35',
    mustTry: ['Premium steaks', 'Turkish breakfast', 'Baklava'],
    vibe: 'Modern upscale, open kitchen',
    bestFor: 'Special dinners, steak lovers',
  },
  {
    name: 'Turk Restaurant',
    area: 'Adliya',
    rating: 4,
    priceRange: 'BD 10-20',
    mustTry: ['Adana kebab', 'Pide', 'Turkish tea'],
    vibe: 'Contemporary casual',
    bestFor: 'Casual dining, families',
  },
  {
    name: 'Saray Turkish Restaurant',
    area: 'Manama',
    rating: 4,
    priceRange: 'BD 8-16',
    mustTry: ['Lahmacun', 'Chicken shish', 'Ayran'],
    vibe: 'Family-friendly, generous portions',
    bestFor: 'Value dining, traditional food',
  },
  {
    name: 'Döner & Gyros',
    area: 'Various',
    rating: 4,
    priceRange: 'BD 3-8',
    mustTry: ['Döner kebab', 'Durum wrap', 'Turkish rice'],
    vibe: 'Quick service, casual',
    bestFor: 'Quick lunch, takeaway',
  },
  {
    name: 'Istanbul Restaurant',
    area: 'Hoora',
    rating: 4,
    priceRange: 'BD 6-14',
    mustTry: ['Mixed kebab', 'Manti', 'Turkish coffee'],
    vibe: 'Cozy neighborhood spot',
    bestFor: 'Locals, authentic dishes',
  },
];

export default function BestTurkishRestaurantsBahrainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-red-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Best Turkish Restaurants', url: 'https://www.bahrainnights.com/guides/best-turkish-restaurants-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-rose-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium mb-4">🇹🇷 Cuisine Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best <span className="bg-gradient-to-r from-red-400 to-rose-500 bg-clip-text text-transparent">Turkish</span> Restaurants in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Sizzling kebabs, fresh pide, sweet baklava, and the famous Turkish breakfast spread — 
              discover Bahrain&apos;s best Turkish dining spots.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Turkish cuisine brings a rich tapestry of flavors to Bahrain — from the smoky char of 
            perfectly grilled kebabs to the delicate layers of baklava dripping with honey. With 
            influences from Central Asia, the Middle East, and Mediterranean, Turkish food offers 
            familiar comfort alongside exciting discoveries.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Whether you&apos;re craving a quick döner wrap, an elaborate Turkish breakfast with endless 
            small plates, or a feast of mixed grills, Bahrain&apos;s Turkish restaurants deliver 
            authentic flavors in settings from casual to upscale.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Top Turkish Restaurants</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {restaurants.map((restaurant) => (
              <div key={restaurant.name} className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold">{restaurant.name}</h3>
                    <p className="text-red-400 text-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {restaurant.area}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{restaurant.priceRange}</div>
                    <div className="flex items-center gap-0.5 justify-end">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < restaurant.rating ? 'text-red-400 fill-red-400' : 'text-gray-600'}`} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-3">{restaurant.vibe}</p>
                <div className="mb-3">
                  <span className="text-xs text-gray-500">Must try:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {restaurant.mustTry.map((item) => (
                      <span key={item} className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded">{item}</span>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-500"><strong>Best for:</strong> {restaurant.bestFor}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Turkish Food FAQs</h2>
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
          <h2 className="text-xl font-bold mb-6">More Cuisine Guides</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { title: 'Lebanese', href: '/guides/best-lebanese-restaurants-bahrain' },
              { title: 'Arabic', href: '/guides/best-arabic-restaurants-bahrain' },
              { title: 'Italian', href: '/guides/best-italian-restaurants-bahrain' },
              { title: 'Steakhouses', href: '/guides/best-steakhouses-bahrain' },
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
        headline: 'Best Turkish Restaurants in Bahrain 2026',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2026-02-11', dateModified: '2026-02-11',
      })}} />
    </div>
  );
}
