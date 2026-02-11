import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, Users, Baby, Utensils } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Family Restaurants in Bahrain 2026 | Kid-Friendly Dining',
  description: 'Find the best family-friendly restaurants in Bahrain. Kid menus, play areas, high chairs, and welcoming atmospheres for dining with children.',
  keywords: 'family restaurants Bahrain, kid-friendly restaurants Bahrain, dining with kids Bahrain, children restaurants Bahrain, family dining Bahrain',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/best-family-restaurants-bahrain' },
  openGraph: {
    title: 'Best Family Restaurants in Bahrain 2026',
    description: 'Discover kid-friendly restaurants perfect for family dining in Bahrain.',
    type: 'article', locale: 'en_US',
  },
};

const faqs = [
  { q: 'What are the best family restaurants in Bahrain?', a: 'Top family spots include Friday\'s, Chili\'s, The Cheesecake Factory, Nando\'s, Texas Roadhouse, and hotel buffets. Mall food courts also offer variety for picky eaters. Many have kids menus and play areas.' },
  { q: 'Which restaurants have play areas for kids?', a: 'Several restaurants feature play areas including some McDonald\'s, Hardee\'s family locations, and dedicated family entertainment centers with dining. Mall-based restaurants are near play areas at Funland and Magic Planet.' },
  { q: 'Do restaurants in Bahrain have high chairs?', a: 'Most family restaurants and hotel venues have high chairs available. It\'s best to mention when booking. Some may have limited numbers, so arrive early on busy nights.' },
  { q: 'What time is best for family dining in Bahrain?', a: 'Early dinners (5:30-7 PM) work best for families with young children. Weekend lunches are also popular. Avoid peak hours (8-9 PM) when restaurants are crowded and service is slower.' },
  { q: 'Are there restaurants with kids menus in Bahrain?', a: 'Most international chain restaurants offer kids menus with smaller portions and child-friendly options. Hotel restaurants often accommodate children with special requests even without formal kids menus.' },
];

const restaurants = [
  {
    name: 'The Cheesecake Factory',
    area: 'City Centre',
    rating: 5,
    priceRange: 'BD 10-18',
    familyFeatures: ['Huge menu variety', 'Shareable portions', 'Kids love the desserts'],
    bestFor: 'Big families, picky eaters',
  },
  {
    name: 'Texas Roadhouse',
    area: 'Seef',
    rating: 4,
    priceRange: 'BD 8-15',
    familyFeatures: ['Free peanuts', 'Kids menu', 'Casual atmosphere', 'Crayons provided'],
    bestFor: 'Active kids, meat lovers',
  },
  {
    name: 'Friday\'s (TGI Friday\'s)',
    area: 'Various',
    rating: 4,
    priceRange: 'BD 8-15',
    familyFeatures: ['Kids menu', 'American favorites', 'Welcoming staff'],
    bestFor: 'Casual family dinner',
  },
  {
    name: 'Chili\'s',
    area: 'Various',
    rating: 4,
    priceRange: 'BD 7-14',
    familyFeatures: ['Kids menu', 'Tex-Mex options', 'Booth seating'],
    bestFor: 'Budget-friendly family meal',
  },
  {
    name: 'Nando\'s',
    area: 'Various',
    rating: 4,
    priceRange: 'BD 5-10',
    familyFeatures: ['Quick service', 'Healthy-ish options', 'Kids can choose spice level'],
    bestFor: 'Quick family lunch',
  },
  {
    name: 'Hotel Buffets (Friday Brunch)',
    area: 'Various Hotels',
    rating: 5,
    priceRange: 'BD 15-35',
    familyFeatures: ['Something for everyone', 'Kids often eat free', 'Entertainment'],
    bestFor: 'Special family occasions',
  },
  {
    name: 'PF Chang\'s',
    area: 'City Centre',
    rating: 4,
    priceRange: 'BD 10-18',
    familyFeatures: ['Shareable dishes', 'Asian flavors for adventurous kids', 'Nice ambiance'],
    bestFor: 'Introducing kids to Asian food',
  },
  {
    name: 'Johnny Rockets',
    area: 'Various',
    rating: 4,
    priceRange: 'BD 6-12',
    familyFeatures: ['Classic American', 'Burgers & shakes', 'Fun 50s vibe'],
    bestFor: 'Burger-loving families',
  },
];

export default function BestFamilyRestaurantsBahrainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-orange-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Best Family Restaurants', url: 'https://www.bahrainnights.com/guides/best-family-restaurants-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm font-medium mb-4">👨‍👩‍👧‍👦 Family Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best <span className="bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">Family</span> Restaurants in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Kid-friendly menus, welcoming staff, and atmospheres where children are actually 
              welcome — find the perfect spot for family dining.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Dining out with kids in Bahrain doesn&apos;t have to be stressful. The kingdom has 
            plenty of family-friendly restaurants where children are welcomed, menus cater to 
            young palates, and the atmosphere is relaxed enough for the inevitable spills and noise.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            From casual chains with kids menus to hotel brunches where little ones eat free, 
            there&apos;s an option for every family occasion — whether it&apos;s a quick weeknight 
            dinner or a special celebration.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Top Family-Friendly Restaurants</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {restaurants.map((restaurant) => (
              <div key={restaurant.name} className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      {restaurant.name}
                      <Users className="w-4 h-4 text-orange-400" />
                    </h3>
                    <p className="text-orange-400 text-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {restaurant.area}
                    </p>
                  </div>
                  <div className="font-bold">{restaurant.priceRange}</div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {restaurant.familyFeatures.map((f) => (
                    <span key={f} className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded">{f}</span>
                  ))}
                </div>
                <p className="text-xs text-gray-500"><strong>Best for:</strong> {restaurant.bestFor}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Family Dining FAQs</h2>
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
          <h2 className="text-xl font-bold mb-6">More Guides</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { title: 'Kids Activities', href: '/guides/kids-activities-bahrain' },
              { title: 'Brunches', href: '/guides/brunches' },
              { title: 'Budget Dining', href: '/guides/budget' },
              { title: 'Mall Food', href: '/guides/malls' },
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
        headline: 'Best Family Restaurants in Bahrain 2026',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2026-02-11', dateModified: '2026-02-11',
      })}} />
    </div>
  );
}
