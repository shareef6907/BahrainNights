import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, DollarSign, Utensils, Fish } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Seafood Restaurants in Bahrain 2026 | Fresh Fish & Waterfront Dining',
  description: 'Discover the best seafood restaurants in Bahrain. From fresh hammour and shrimp to lobster and oysters. Complete guide to waterfront dining, fish markets, and seafood grills.',
  keywords: 'best seafood Bahrain, seafood restaurants Bahrain, fresh fish Bahrain, hammour Bahrain, waterfront dining Bahrain, fish market Bahrain, lobster Bahrain, shrimp Bahrain',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/best-seafood-bahrain' },
  openGraph: {
    title: 'Best Seafood Restaurants in Bahrain 2026',
    description: 'Your complete guide to the freshest seafood in Bahrain — from fish markets to fine dining.',
    type: 'article',
    locale: 'en_BH',
  },
};

const faqs = [
  { q: 'What is the best seafood restaurant in Bahrain?', a: 'For fine dining, Cut by Wolfgang Puck (Four Seasons) and La Mer (Ritz-Carlton) offer premium seafood. For traditional, Dar Al Shawarb and Al Bandar Resort are excellent. For fresh catches, head to Muharraq fish market.' },
  { q: 'Where can I find fresh fish in Bahrain?', a: 'The Muharraq Fish Market (near Arad) is the best place for fresh catches. Many restaurants source from here daily. Bahrain Fisherman\'s Association market and various co-ops also sell fresh fish.' },
  { q: 'What local fish should I try in Bahrain?', a: 'Try hammour (grouper) — Bahrain\'s most popular fish. Also excellent: safi (rabbitfish), chanad (kingfish), and shrimp/prawns from local waters. Ask for catch of the day at restaurants.' },
  { q: 'Are there waterfront seafood restaurants in Bahrain?', a: 'Yes! Al Bandar Resort in Sitra, La Mer at Ritz-Carlton, and restaurants along Bahrain Bay have waterfront seating. Amwaj Islands also has several seafood spots with marina views.' },
  { q: 'How much does seafood cost in Bahrain?', a: 'Fish market prices vary by catch (BD 3-15/kg). Casual seafood restaurants cost BD 8-15 per person. Mid-range like Dar Al Shawarb runs BD 15-25. Fine dining seafood starts at BD 30+ per person.' },
];

const restaurants = [
  { 
    name: 'La Mer', 
    location: 'The Ritz-Carlton, Seef',
    cuisine: 'Mediterranean Seafood Fine Dining',
    priceRange: 'BD 35-60',
    highlight: 'Stunning sea views, premium imported seafood',
    mustTry: 'Lobster, Fresh Oysters, Grilled Fish, Bouillabaisse',
    rating: 4.8,
  },
  { 
    name: 'Cut by Wolfgang Puck', 
    location: 'Four Seasons, Bahrain Bay',
    cuisine: 'Premium Steakhouse & Seafood',
    priceRange: 'BD 40-70',
    highlight: 'Celebrity chef restaurant, whole grilled fish',
    mustTry: 'Dover Sole, Lobster Tail, Seafood Platter',
    rating: 4.9,
  },
  { 
    name: 'Dar Al Shawarb', 
    location: 'Muharraq',
    cuisine: 'Traditional Bahraini Seafood',
    priceRange: 'BD 15-25',
    highlight: 'Authentic Bahraini fish house, local favorite',
    mustTry: 'Hammour Machboos, Grilled Shrimp, Sayadieh',
    rating: 4.6,
  },
  { 
    name: 'Al Bandar Resort', 
    location: 'Sitra',
    cuisine: 'Bahraini Seafood & Grills',
    priceRange: 'BD 12-22',
    highlight: 'Waterfront location, fresh daily catch',
    mustTry: 'Grilled Fish, Mixed Seafood Grill, Shrimp Machboos',
    rating: 4.5,
  },
  { 
    name: 'The Fish Market', 
    location: 'InterContinental, Manama',
    cuisine: 'Interactive Seafood',
    priceRange: 'BD 20-35',
    highlight: 'Pick your fish, choose your cooking style',
    mustTry: 'Market Fresh Selection, Lobster, King Prawns',
    rating: 4.4,
  },
  { 
    name: 'Bahri Bar', 
    location: 'Four Seasons, Bahrain Bay',
    cuisine: 'Casual Mediterranean Seafood',
    priceRange: 'BD 15-30',
    highlight: 'Outdoor terrace, relaxed waterfront vibe',
    mustTry: 'Grilled Calamari, Fish Tacos, Seafood Salad',
    rating: 4.5,
  },
  { 
    name: 'Bushido', 
    location: 'The Ritz-Carlton, Seef',
    cuisine: 'Japanese Seafood',
    priceRange: 'BD 30-50',
    highlight: 'Premium sushi and sashimi, sake bar',
    mustTry: 'Sashimi Platter, Black Cod, Toro',
    rating: 4.7,
  },
  { 
    name: 'The Fisherman\'s Hut', 
    location: 'Muharraq',
    cuisine: 'Casual Bahraini Seafood',
    priceRange: 'BD 6-12',
    highlight: 'No-frills fresh fish, local atmosphere',
    mustTry: 'Daily Catch Grilled, Fish Curry, Fried Hammour',
    rating: 4.3,
  },
];

export default function BestSeafoodBahrainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950/20 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Best Seafood', url: 'https://www.bahrainnights.com/guides/best-seafood-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium mb-4">🦐 Cuisine Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">Seafood</span> in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              As an island nation, Bahrain takes its seafood seriously. From traditional hammour 
              machboos to contemporary waterfront dining — discover the freshest catches in the Kingdom.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
          <p>
            Bahrain&apos;s maritime heritage runs deep. For centuries, Bahrainis have lived off the sea — 
            from pearl diving to fishing. Today, this connection continues through the Kingdom&apos;s 
            excellent seafood restaurants. Whether you prefer your fish grilled simply with local 
            spices or prepared with international flair, Bahrain delivers.
          </p>
          <p>
            The best seafood in Bahrain starts at the source: the fish markets of Muharraq, where 
            local fishermen bring in their daily catches at dawn. Many top restaurants source directly 
            from these markets, ensuring the freshest possible ingredients. From casual beachside 
            grills to elegant waterfront fine dining, this guide covers the best seafood experiences 
            in the Kingdom.
          </p>
        </div>
      </section>

      {/* Restaurant Cards */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Top Seafood Restaurants</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {restaurants.map((restaurant, index) => (
              <div 
                key={restaurant.name}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-blue-400/50 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-blue-400 text-sm font-medium">#{index + 1}</span>
                    <h3 className="text-xl font-bold text-white">{restaurant.name}</h3>
                    <p className="text-gray-400 text-sm flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {restaurant.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-blue-500/20 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 text-blue-400 fill-blue-400" />
                    <span className="text-blue-400 font-medium">{restaurant.rating}</span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-3">{restaurant.cuisine}</p>
                <p className="text-gray-400 text-sm mb-3">{restaurant.highlight}</p>
                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="flex items-center gap-1 text-green-400">
                    <DollarSign className="w-4 h-4" /> {restaurant.priceRange}
                  </span>
                  <span className="flex items-center gap-1 text-yellow-400">
                    <Utensils className="w-4 h-4" /> {restaurant.mustTry}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Fish Guide */}
      <section className="py-12 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Bahrain&apos;s Local Fish</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Fish className="w-8 h-8 text-blue-400" />
                <h3 className="text-xl font-bold text-blue-400">Hammour (Grouper)</h3>
              </div>
              <p className="text-gray-300 text-sm">
                The king of Bahraini fish. Firm white flesh, mild flavor, perfect grilled or in 
                machboos. Found on every seafood restaurant menu. Best from September to April.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Fish className="w-8 h-8 text-blue-400" />
                <h3 className="text-xl font-bold text-blue-400">Chanad (Kingfish)</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Rich, oily fish with firm texture. Excellent grilled or in curries. 
                A staple in traditional Bahraini cooking. Best during winter months.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Fish className="w-8 h-8 text-blue-400" />
                <h3 className="text-xl font-bold text-blue-400">Safi (Rabbitfish)</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Small, flavorful fish often served whole. Sweet, delicate taste. 
                Popular fried or grilled with simple seasoning. Available year-round.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Fish className="w-8 h-8 text-blue-400" />
                <h3 className="text-xl font-bold text-blue-400">Rubian (Shrimp)</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Local shrimp are sweet and tender. Essential in machboos rubian, grilled, 
                or in curries. Pearl-diving era made shrimp a Bahraini staple.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dining Experiences */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Seafood Dining Experiences</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-blue-400 mb-3">🏖️ Waterfront Dining</h3>
              <p className="text-gray-300 mb-2">
                Nothing beats fresh seafood with a sea view. Bahrain Bay, Al Bandar Resort, 
                and Amwaj Islands offer stunning waterfront restaurants where you can enjoy 
                your meal watching the sunset over the Gulf.
              </p>
              <p className="text-gray-400 text-sm">
                <strong>Best for:</strong> La Mer, Bahri Bar, Al Bandar Resort
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-blue-400 mb-3">🎣 Fish Market Experience</h3>
              <p className="text-gray-300 mb-2">
                For the freshest possible seafood, visit Muharraq Fish Market early morning 
                (5-7 AM). Select your catch and have it cleaned on the spot. Some nearby 
                restaurants will even cook your purchases for a small fee.
              </p>
              <p className="text-gray-400 text-sm">
                <strong>Best for:</strong> Muharraq Central Market, local fish co-ops
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-blue-400 mb-3">🍳 Interactive Dining</h3>
              <p className="text-gray-300 mb-2">
                At restaurants like The Fish Market (InterContinental), you choose your fish 
                from a fresh display, select your cooking method (grilled, fried, steamed, 
                baked), and watch it being prepared.
              </p>
              <p className="text-gray-400 text-sm">
                <strong>Best for:</strong> The Fish Market, various hotel seafood restaurants
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-blue-400 mb-3">🏠 Traditional Bahraini</h3>
              <p className="text-gray-300 mb-2">
                For authentic Bahraini seafood, head to Muharraq or Sitra. Local fish houses 
                serve hammour machboos, sayadieh (fish with rice), and simple grilled catches 
                with local spices. No frills, just fresh fish.
              </p>
              <p className="text-gray-400 text-sm">
                <strong>Best for:</strong> Dar Al Shawarb, The Fisherman&apos;s Hut
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-12 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Tips for Seafood Dining</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-blue-400 mb-2">🌅 Timing Matters</h3>
              <p className="text-gray-300 text-sm">
                Fish markets are best visited at dawn. Restaurant fish is freshest at lunch. 
                Avoid Monday for the freshest catches — boats often don&apos;t go out on Fridays.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-blue-400 mb-2">📅 Seasonal Fish</h3>
              <p className="text-gray-300 text-sm">
                Some fish are seasonal. Hammour is best September-April. Summer brings 
                different catches. Ask what&apos;s freshest and in season for the best experience.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-blue-400 mb-2">🦐 Local vs Imported</h3>
              <p className="text-gray-300 text-sm">
                Local fish and shrimp are often better value and fresher than imports. 
                Lobster, oysters, and salmon are typically imported and priced accordingly.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-blue-400 mb-2">👃 Freshness Test</h3>
              <p className="text-gray-300 text-sm">
                Fresh fish should smell like the sea, not fishy. Eyes should be clear and 
                bright. Flesh should spring back when pressed. Don&apos;t hesitate to inspect.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More Cuisines</h2>
          <p className="text-gray-400 mb-8">Discover more dining options across Bahrain</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guides/best-arabic-restaurants-bahrain" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all">
              Arabic Restaurants →
            </Link>
            <Link href="/guides/best-japanese-restaurants-bahrain" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all">
              Japanese Restaurants →
            </Link>
            <Link href="/places" className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all">
              Browse All Restaurants
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
