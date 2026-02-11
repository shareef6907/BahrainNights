import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Korean Restaurants in Bahrain 2026 | BBQ, Bibimbap & More',
  description: 'Discover the best Korean restaurants in Bahrain. Korean BBQ, bibimbap, fried chicken, and authentic Korean cuisine. Complete guide with prices and recommendations.',
  keywords: 'Korean restaurants Bahrain, Korean BBQ Bahrain, bibimbap Bahrain, Korean fried chicken Bahrain, Korean food Bahrain',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/best-korean-restaurants-bahrain' },
  openGraph: {
    title: 'Best Korean Restaurants in Bahrain 2026',
    description: 'Find authentic Korean cuisine in Bahrain - BBQ, bibimbap, fried chicken and more.',
    type: 'article', locale: 'en_US',
  },
};

const faqs = [
  { q: 'What are the best Korean restaurants in Bahrain?', a: 'Top Korean restaurants in Bahrain include Oppa Korean BBQ, Seoul Garden, Koreana, and Hansik. These offer authentic Korean BBQ, traditional dishes, and Korean fried chicken in various settings from casual to family-style.' },
  { q: 'What Korean dishes should I try?', a: 'Essential dishes include Korean BBQ (grilled meats at your table), bibimbap (rice bowl with vegetables and egg), bulgogi (marinated beef), kimchi jjigae (kimchi stew), japchae (glass noodles), and Korean fried chicken.' },
  { q: 'How does Korean BBQ work?', a: 'Korean BBQ features a grill built into your table where you cook marinated meats yourself. It typically comes with unlimited banchan (side dishes) including kimchi, pickled vegetables, and sauces. Great for groups and interactive dining.' },
  { q: 'Is Korean food spicy?', a: 'Korean cuisine ranges from mild to very spicy. Dishes like kimchi and tteokbokki can be quite hot, while bibimbap and bulgogi are mild. Most restaurants can adjust spice levels upon request.' },
  { q: 'How much does Korean food cost in Bahrain?', a: 'Korean restaurant prices range from 5-10 BD for casual dishes, 12-20 BD for Korean BBQ per person, and 15-30 BD at upscale establishments. BBQ is typically better value when dining with groups.' },
];

const restaurants = [
  {
    name: 'Oppa Korean BBQ',
    area: 'Juffair',
    rating: 5,
    priceRange: 'BD 12-22',
    mustTry: ['Unlimited BBQ', 'Kimchi jjigae', 'Bibimbap'],
    vibe: 'Lively BBQ experience',
    bestFor: 'Groups, authentic BBQ',
  },
  {
    name: 'Seoul Garden',
    area: 'Seef',
    rating: 4,
    priceRange: 'BD 10-18',
    mustTry: ['Bulgogi', 'Seafood pancake', 'Tteokbokki'],
    vibe: 'Family-friendly, clean',
    bestFor: 'Families, varied menu',
  },
  {
    name: 'Koreana Restaurant',
    area: 'Manama',
    rating: 4,
    priceRange: 'BD 8-15',
    mustTry: ['Samgyeopsal', 'Japchae', 'Korean fried chicken'],
    vibe: 'Traditional, cozy',
    bestFor: 'Authentic experience',
  },
  {
    name: 'Hansik',
    area: 'Adliya',
    rating: 4,
    priceRange: 'BD 10-20',
    mustTry: ['Stone pot bibimbap', 'Army stew', 'Chicken katsu'],
    vibe: 'Modern casual',
    bestFor: 'Lunch, K-food lovers',
  },
  {
    name: 'K-Town Chicken',
    area: 'Various',
    rating: 4,
    priceRange: 'BD 5-12',
    mustTry: ['Korean fried chicken', 'Cheese corn', 'Ramyeon'],
    vibe: 'Fast casual, delivery-friendly',
    bestFor: 'Quick bites, fried chicken',
  },
  {
    name: 'Arirang',
    area: 'Hoora',
    rating: 4,
    priceRange: 'BD 8-16',
    mustTry: ['Hot stone rice', 'Galbi', 'Mandu'],
    vibe: 'Authentic, neighborhood gem',
    bestFor: 'Local Koreans, traditional food',
  },
];

export default function BestKoreanRestaurantsBahrainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-pink-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Best Korean Restaurants', url: 'https://www.bahrainnights.com/guides/best-korean-restaurants-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-red-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-pink-500/20 text-pink-400 rounded-full text-sm font-medium mb-4">🇰🇷 Cuisine Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best <span className="bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent">Korean</span> Restaurants in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Sizzling BBQ at your table, comforting bibimbap, crispy fried chicken, and endless banchan — 
              discover Bahrain&apos;s Korean dining scene.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Korean cuisine has exploded in popularity globally, and Bahrain has embraced this delicious 
            trend. From the interactive experience of grilling your own meats at Korean BBQ restaurants 
            to the addictive crunch of Korean fried chicken, there&apos;s something uniquely satisfying 
            about Korean food.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            What makes Korean dining special is the banchan — the array of small side dishes that accompany 
            every meal, from tangy kimchi to sweet pickled radish. It&apos;s cuisine that encourages sharing, 
            experimentation, and plenty of bold flavors.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Top Korean Restaurants</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {restaurants.map((restaurant) => (
              <div key={restaurant.name} className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold">{restaurant.name}</h3>
                    <p className="text-pink-400 text-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {restaurant.area}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{restaurant.priceRange}</div>
                    <div className="flex items-center gap-0.5 justify-end">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < restaurant.rating ? 'text-pink-400 fill-pink-400' : 'text-gray-600'}`} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-3">{restaurant.vibe}</p>
                <div className="mb-3">
                  <span className="text-xs text-gray-500">Must try:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {restaurant.mustTry.map((item) => (
                      <span key={item} className="text-xs bg-pink-500/20 text-pink-300 px-2 py-1 rounded">{item}</span>
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
          <h2 className="text-3xl font-bold mb-12 text-center">Korean Food FAQs</h2>
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
              { title: 'Japanese', href: '/guides/best-japanese-restaurants-bahrain' },
              { title: 'Chinese', href: '/guides/best-chinese-restaurants-bahrain' },
              { title: 'Thai', href: '/guides/best-thai-restaurants-bahrain' },
              { title: 'Indian', href: '/guides/best-indian-restaurants-bahrain' },
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
        headline: 'Best Korean Restaurants in Bahrain 2026',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2026-02-11', dateModified: '2026-02-11',
      })}} />
    </div>
  );
}
