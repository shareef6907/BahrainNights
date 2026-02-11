import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Mexican Restaurants in Bahrain 2026 | Tacos, Burritos & More',
  description: 'Discover the best Mexican restaurants in Bahrain. Authentic tacos, burritos, fajitas, and margaritas. Complete guide with prices and recommendations.',
  keywords: 'Mexican restaurants Bahrain, best Mexican food Bahrain, tacos Bahrain, burritos Bahrain, Tex-Mex Bahrain',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/best-mexican-restaurants-bahrain' },
  openGraph: {
    title: 'Best Mexican Restaurants in Bahrain 2026',
    description: 'Find the best Mexican cuisine in Bahrain - tacos, burritos, fajitas and more.',
    type: 'article', locale: 'en_US',
  },
};

const faqs = [
  { q: 'What are the best Mexican restaurants in Bahrain?', a: 'Top Mexican restaurants include Calexico (Adliya\'s favorite), Cantina Laredo (upscale Tex-Mex), Señor Paco\'s, and Chipotle for casual. Each offers different takes from street-style tacos to refined Mexican-American cuisine.' },
  { q: 'What Mexican dishes should I try?', a: 'Essential dishes include tacos (soft or crispy), burritos, fajitas (sizzling platters), quesadillas, nachos with guacamole, enchiladas, and churros for dessert. Don\'t miss the margaritas at licensed venues.' },
  { q: 'Is there authentic Mexican food in Bahrain?', a: 'While most Mexican restaurants in Bahrain serve Tex-Mex fusion, you can find more authentic options at places like Calexico. True Mexican cuisine features less cheese, more fresh salsas, and traditional preparations.' },
  { q: 'How much does Mexican food cost in Bahrain?', a: 'Mexican restaurant prices range from 3-7 BD for casual tacos and burritos, 10-18 BD at sit-down restaurants, and 15-30 BD at upscale venues with drinks. Sharing platters offer good value for groups.' },
  { q: 'Where can I get margaritas in Bahrain?', a: 'Licensed Mexican restaurants like Calexico and Cantina Laredo serve margaritas and cocktails. Hotel-based Mexican venues also offer full bar service. Non-alcoholic mocktails are available everywhere.' },
];

const restaurants = [
  {
    name: 'Calexico',
    area: 'Adliya',
    rating: 5,
    priceRange: 'BD 10-22',
    mustTry: ['Street tacos', 'Margaritas', 'Loaded nachos'],
    vibe: 'Vibrant bar & restaurant, late-night',
    bestFor: 'Night out, drinks, groups',
  },
  {
    name: 'Cantina Laredo',
    area: 'Seef',
    rating: 5,
    priceRange: 'BD 15-30',
    mustTry: ['Tableside guacamole', 'Fajitas', 'Top-shelf margaritas'],
    vibe: 'Upscale Tex-Mex, elegant',
    bestFor: 'Special occasions, dates',
  },
  {
    name: 'Señor Paco\'s',
    area: 'Juffair',
    rating: 4,
    priceRange: 'BD 8-16',
    mustTry: ['Burrito bowl', 'Chicken fajitas', 'Churros'],
    vibe: 'Colorful, family-friendly',
    bestFor: 'Families, casual dining',
  },
  {
    name: 'Chipotle',
    area: 'Various',
    rating: 4,
    priceRange: 'BD 4-8',
    mustTry: ['Build-your-own burrito', 'Burrito bowl', 'Chips & guac'],
    vibe: 'Fast casual, customizable',
    bestFor: 'Quick lunch, healthy-ish',
  },
  {
    name: 'Taco Bell',
    area: 'Various',
    rating: 3,
    priceRange: 'BD 2-6',
    mustTry: ['Crunchwrap Supreme', 'Tacos', 'Nachos'],
    vibe: 'Fast food, late-night',
    bestFor: 'Budget bites, cravings',
  },
  {
    name: 'El Mexicano',
    area: 'Manama',
    rating: 4,
    priceRange: 'BD 8-15',
    mustTry: ['Enchiladas', 'Mexican rice', 'Tres leches'],
    vibe: 'Traditional, homestyle',
    bestFor: 'Authentic flavors, value',
  },
];

export default function BestMexicanRestaurantsBahrainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-orange-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Best Mexican Restaurants', url: 'https://www.bahrainnights.com/guides/best-mexican-restaurants-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm font-medium mb-4">🇲🇽 Cuisine Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Mexican</span> Restaurants in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Crunchy tacos, loaded burritos, sizzling fajitas, and frozen margaritas — 
              discover Bahrain&apos;s best spots for Mexican and Tex-Mex cuisine.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Mexican food has found a passionate following in Bahrain, with restaurants ranging from 
            quick-service taco spots to upscale Tex-Mex destinations. The bold flavors — smoky chipotle, 
            fresh cilantro, zesty lime, and creamy avocado — translate perfectly to the Gulf palate.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Whether you&apos;re craving a late-night burrito after a night out in Adliya, a family-friendly 
            fajita feast, or craft margaritas with tableside guacamole, Bahrain&apos;s Mexican scene delivers 
            flavor and fun in equal measure.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Top Mexican Restaurants</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {restaurants.map((restaurant) => (
              <div key={restaurant.name} className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold">{restaurant.name}</h3>
                    <p className="text-orange-400 text-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {restaurant.area}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{restaurant.priceRange}</div>
                    <div className="flex items-center gap-0.5 justify-end">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < restaurant.rating ? 'text-orange-400 fill-orange-400' : 'text-gray-600'}`} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-3">{restaurant.vibe}</p>
                <div className="mb-3">
                  <span className="text-xs text-gray-500">Must try:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {restaurant.mustTry.map((item) => (
                      <span key={item} className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded">{item}</span>
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
          <h2 className="text-3xl font-bold mb-12 text-center">Mexican Food FAQs</h2>
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
              { title: 'American', href: '/guides/best-steakhouses-bahrain' },
              { title: 'Italian', href: '/guides/best-italian-restaurants-bahrain' },
              { title: 'Lebanese', href: '/guides/best-lebanese-restaurants-bahrain' },
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
        headline: 'Best Mexican Restaurants in Bahrain 2026',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2026-02-11', dateModified: '2026-02-11',
      })}} />
    </div>
  );
}
