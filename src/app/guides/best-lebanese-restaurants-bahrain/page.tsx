import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Clock, Star, DollarSign, Utensils } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Lebanese Restaurants in Bahrain 2026 | Top Mezze & Grills',
  description: 'Discover the best Lebanese restaurants in Bahrain. From authentic mezze and shawarma to grilled meats and fattoush. Complete guide with prices and recommendations.',
  keywords: 'Lebanese restaurants Bahrain, best Lebanese food Bahrain, mezze Bahrain, shawarma Bahrain, Lebanese grill Bahrain, Arabic food Bahrain',
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/best-lebanese-restaurants-bahrain',
  },
  openGraph: {
    title: 'Best Lebanese Restaurants in Bahrain 2026',
    description: 'Find the finest Lebanese cuisine in Bahrain - authentic mezze, grills, and more.',
    type: 'article',
    locale: 'en_US',
  },
};

const faqs = [
  { q: 'What are the best Lebanese restaurants in Bahrain?', a: 'Top Lebanese restaurants in Bahrain include Em Sherif (fine dining), Abd El Wahab (upscale traditional), Kababji (modern Lebanese), Leila Min Lebnan (authentic), and Babel (contemporary). Each offers distinct interpretations of Lebanese cuisine from casual to luxurious.' },
  { q: 'What is Lebanese mezze?', a: 'Mezze is a selection of small dishes served as appetizers in Lebanese cuisine. Typical mezze includes hummus, baba ganoush, fattoush, tabbouleh, kibbeh, grape leaves, labneh, and kebbeh. It\'s meant to be shared and enjoyed leisurely before main courses.' },
  { q: 'How much does Lebanese food cost in Bahrain?', a: 'Lebanese restaurant prices in Bahrain range from 3-6 BD for casual shawarma spots, 8-15 BD per person at mid-range restaurants, and 20-40 BD per person at upscale establishments. Mezze is typically shared, making dining more economical.' },
  { q: 'Is Lebanese food halal in Bahrain?', a: 'Yes, Lebanese food in Bahrain is halal. Most Lebanese restaurants serve lamb, chicken, and beef prepared according to Islamic dietary laws. Seafood options are also widely available. Some upscale restaurants may serve alcohol separately.' },
  { q: 'What\'s the difference between Lebanese and Arabic food?', a: 'Lebanese cuisine is part of Levantine cooking, known for fresh vegetables, olive oil, herbs like parsley and mint, and dishes like tabbouleh and kibbeh. Gulf Arabic cuisine uses more rice, dates, and spices. Lebanese food is generally lighter with more salads and grilled items.' },
];

const restaurants = [
  {
    name: 'Em Sherif',
    area: 'Adliya',
    rating: 5,
    priceRange: 'BD 25-45',
    mustTry: ['Signature kebbeh', 'Mixed grill', 'Kunafa'],
    vibe: 'Fine dining with traditional décor',
    bestFor: 'Special occasions, authentic luxury',
  },
  {
    name: 'Abd El Wahab',
    area: 'Seef',
    rating: 5,
    priceRange: 'BD 18-35',
    mustTry: ['Cold mezze platter', 'Lamb chops', 'Fattoush'],
    vibe: 'Elegant, family-friendly',
    bestFor: 'Family dinners, business meals',
  },
  {
    name: 'Babel',
    area: 'Bahrain Bay',
    rating: 5,
    priceRange: 'BD 20-40',
    mustTry: ['Signature hummus varieties', 'Mixed grill', 'Sea bass'],
    vibe: 'Modern Lebanese, waterfront views',
    bestFor: 'Date nights, celebrations',
  },
  {
    name: 'Kababji',
    area: 'Seef Mall',
    rating: 4,
    priceRange: 'BD 8-18',
    mustTry: ['Grilled kebabs', 'Chicken taouk', 'Fresh juices'],
    vibe: 'Casual modern, quick service',
    bestFor: 'Quick lunch, families',
  },
  {
    name: 'Leila Min Lebnan',
    area: 'Juffair',
    rating: 4,
    priceRange: 'BD 10-20',
    mustTry: ['Homestyle mezze', 'Saj bread', 'Lamb kebbeh'],
    vibe: 'Authentic, cozy atmosphere',
    bestFor: 'Traditional experience, groups',
  },
  {
    name: 'Automatic Restaurant',
    area: 'Various locations',
    rating: 4,
    priceRange: 'BD 5-12',
    mustTry: ['Shawarma', 'Falafel wraps', 'Hummus'],
    vibe: 'Casual, takeaway friendly',
    bestFor: 'Quick bites, late night',
  },
  {
    name: 'Al Safadi',
    area: 'Seef',
    rating: 4,
    priceRange: 'BD 8-15',
    mustTry: ['Grilled meats', 'Fatayer', 'Fresh salads'],
    vibe: 'Family restaurant, spacious',
    bestFor: 'Large groups, value',
  },
  {
    name: 'Cafe Blanc',
    area: 'Amwaj',
    rating: 4,
    priceRange: 'BD 12-22',
    mustTry: ['Breakfast mezze', 'Manakish', 'Lebanese coffee'],
    vibe: 'Chic cafe, all-day dining',
    bestFor: 'Brunch, casual dining',
  },
];

export default function BestLebaneseRestaurantsBahrainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-red-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Best Lebanese Restaurants', url: 'https://www.bahrainnights.com/guides/best-lebanese-restaurants-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium mb-4">
              🇱🇧 Cuisine Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best{' '}
              <span className="bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
                Lebanese
              </span>
              {' '}Restaurants in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From mezze spreads and fresh fattoush to sizzling grills and sweet kunafa — 
              discover Bahrain&apos;s finest Lebanese dining experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Lebanese cuisine holds a special place in Bahrain&apos;s culinary landscape. With a significant 
            Lebanese community and deep cultural connections, you&apos;ll find authentic Lebanese restaurants 
            across the kingdom — from casual shawarma joints to opulent fine dining establishments.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            The beauty of Lebanese food lies in its freshness and variety. A typical meal starts with 
            an array of mezze — small plates of hummus, baba ganoush, tabbouleh, and more — followed 
            by grilled meats, fresh bread, and sweet desserts. It&apos;s cuisine meant to be shared, 
            savored slowly, and enjoyed with good company.
          </p>
        </div>
      </section>

      {/* Restaurant List */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Top Lebanese Restaurants</h2>
          
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

      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Lebanese Food FAQs</h2>
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

      {/* Cross-links */}
      <section className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-6">More Cuisine Guides</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { title: 'Arabic', href: '/guides/best-arabic-restaurants-bahrain' },
              { title: 'Turkish', href: '/guides/best-turkish-restaurants-bahrain' },
              { title: 'Indian', href: '/guides/best-indian-restaurants-bahrain' },
              { title: 'Italian', href: '/guides/best-italian-restaurants-bahrain' },
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
        headline: 'Best Lebanese Restaurants in Bahrain 2026',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2026-02-11', dateModified: '2026-02-11',
      })}} />
    </div>
  );
}
