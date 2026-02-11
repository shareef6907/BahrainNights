import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, DollarSign, Utensils } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Arabic Restaurants in Bahrain 2026 | Lebanese, Khaleeji & Levantine',
  description: 'Discover the best Arabic restaurants in Bahrain. From authentic Lebanese mezze and Khaleeji cuisine to Egyptian, Moroccan, and Syrian specialties. Complete guide with prices and reviews.',
  keywords: 'best Arabic restaurants Bahrain, Lebanese restaurant Bahrain, Arabic food Bahrain, mezze Bahrain, Khaleeji food Bahrain, Middle Eastern food Bahrain, shawarma Bahrain',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/best-arabic-restaurants-bahrain' },
  openGraph: {
    title: 'Best Arabic Restaurants in Bahrain 2026',
    description: 'Your complete guide to the best Arabic cuisine in Bahrain — from mezze to machboos.',
    type: 'article',
    locale: 'en_BH',
  },
};

const faqs = [
  { q: 'What is the best Arabic restaurant in Bahrain?', a: 'For Lebanese, Al Abraaj and Zaitoun are excellent. For traditional Bahraini, Haji Hassan (machboos) is legendary. For upscale Arabic, Al Safir at Ritz-Carlton and Layali Zaman offer premium experiences.' },
  { q: 'Where can I find authentic Bahraini food?', a: 'Haji Hassan is famous for machboos (spiced rice with meat). Saffron by Jena offers traditional Bahraini dishes. For a local experience, try restaurants in Muharraq or near Bab Al Bahrain souq.' },
  { q: 'What are typical Arabic dishes to try in Bahrain?', a: 'Must-try dishes include machboos (Bahraini biryani), mezze platters (hummus, tabbouleh, fattoush), shawarma, lamb ouzi, mixed grill, and kunafa for dessert.' },
  { q: 'How much does Arabic food cost in Bahrain?', a: 'Street shawarma costs BD 0.5-1.5. Casual mezze restaurants run BD 5-10 per person. Mid-range like Al Abraaj is BD 10-18. Upscale Arabic dining starts at BD 25+ per person.' },
  { q: 'Which Arabic restaurants have shisha?', a: 'Many Arabic restaurants offer shisha including Zaitoun, Layali Zaman, and cafes in Adliya. Hotel restaurants generally do not offer shisha. Best shisha spots are often standalone cafes.' },
];

const restaurants = [
  { 
    name: 'Al Abraaj', 
    location: 'Adliya',
    cuisine: 'Lebanese',
    priceRange: 'BD 10-20',
    highlight: 'Iconic Lebanese restaurant, beautiful setting',
    mustTry: 'Mixed Grill, Hummus, Fattoush, Kunafa',
    rating: 4.6,
  },
  { 
    name: 'Haji Hassan', 
    location: 'Muharraq',
    cuisine: 'Traditional Bahraini',
    priceRange: 'BD 5-10',
    highlight: 'The original machboos destination since generations',
    mustTry: 'Chicken Machboos, Lamb Machboos, Madrooba',
    rating: 4.7,
  },
  { 
    name: 'Layali Zaman', 
    location: 'Juffair',
    cuisine: 'Levantine & Khaleeji',
    priceRange: 'BD 15-25',
    highlight: 'Elegant Arabic ambiance, live oud music',
    mustTry: 'Mixed Mezze, Lamb Ouzi, Shisha',
    rating: 4.5,
  },
  { 
    name: 'Al Safir', 
    location: 'The Ritz-Carlton, Seef',
    cuisine: 'Pan-Arabic Fine Dining',
    priceRange: 'BD 25-45',
    highlight: 'Upscale Arabic with Gulf views',
    mustTry: 'Lamb Cutlets, Arabic Mezze, Ouzi',
    rating: 4.7,
  },
  { 
    name: 'Zaitoun', 
    location: 'Adliya',
    cuisine: 'Lebanese',
    priceRange: 'BD 8-15',
    highlight: 'Garden setting, family atmosphere',
    mustTry: 'Kibbeh, Grilled Halloumi, Shawarma Plate',
    rating: 4.4,
  },
  { 
    name: 'Mirai', 
    location: 'Seef',
    cuisine: 'Lebanese Contemporary',
    priceRange: 'BD 12-22',
    highlight: 'Modern take on Lebanese classics',
    mustTry: 'Truffle Hummus, Lamb Chops, Fresh Juices',
    rating: 4.5,
  },
  { 
    name: 'Saffron by Jena', 
    location: 'Riffa',
    cuisine: 'Traditional Bahraini & Khaleeji',
    priceRange: 'BD 8-15',
    highlight: 'Authentic Bahraini home cooking',
    mustTry: 'Machboos, Muhammar, Balaleet',
    rating: 4.6,
  },
  { 
    name: 'Furn Bistro', 
    location: 'Adliya',
    cuisine: 'Lebanese Bakery & Café',
    priceRange: 'BD 4-10',
    highlight: 'Fresh manakish, pastries, all-day breakfast',
    mustTry: 'Zaatar Manakish, Cheese Fatayer, Labneh',
    rating: 4.3,
  },
];

export default function BestArabicRestaurantsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-amber-950/20 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Best Arabic Restaurants', url: 'https://www.bahrainnights.com/guides/best-arabic-restaurants-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-yellow-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-4">🥙 Cuisine Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">Arabic Restaurants</span> in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From authentic Bahraini machboos and Lebanese mezze to lavish Khaleeji feasts — 
              discover the rich tapestry of Arabic cuisine across the Kingdom.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
          <p>
            Arabic cuisine in Bahrain spans centuries of culinary tradition, from the Kingdom&apos;s own 
            Bahraini specialties to Lebanese, Syrian, Egyptian, and other regional influences. As a 
            crossroads of the Arab world, Bahrain offers an unparalleled opportunity to explore the 
            diverse flavors of Middle Eastern cooking.
          </p>
          <p>
            Whether you&apos;re craving a quick shawarma wrap, a leisurely mezze feast with friends, or 
            an authentic Bahraini machboos made with generations-old recipes, this guide will help 
            you navigate the best Arabic dining experiences in the Kingdom. From humble eateries in 
            Muharraq to elegant restaurants in five-star hotels, Arabic food is everywhere in Bahrain.
          </p>
        </div>
      </section>

      {/* Restaurant Cards */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Top Arabic Restaurants</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {restaurants.map((restaurant, index) => (
              <div 
                key={restaurant.name}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-amber-400/50 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-amber-400 text-sm font-medium">#{index + 1}</span>
                    <h3 className="text-xl font-bold text-white">{restaurant.name}</h3>
                    <p className="text-gray-400 text-sm flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {restaurant.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-500/20 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="text-amber-400 font-medium">{restaurant.rating}</span>
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

      {/* Regional Cuisine Guide */}
      <section className="py-12 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Arabic Regional Cuisines</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-amber-400 mb-3">🇧🇭 Bahraini (Khaleeji)</h3>
              <p className="text-gray-300 mb-2">
                Traditional Bahraini cuisine features machboos (spiced rice with meat or fish), 
                muhammar (sweet rice), madrooba (mashed fish with rice), and balaleet (sweet vermicelli with eggs).
                Influenced by Indian, Persian, and Arabian flavors.
              </p>
              <p className="text-gray-400 text-sm">
                <strong>Best for:</strong> Haji Hassan, Saffron by Jena, local Muharraq restaurants
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-amber-400 mb-3">🇱🇧 Lebanese</h3>
              <p className="text-gray-300 mb-2">
                The most popular Arabic cuisine in Bahrain. Known for mezze (small plates), grilled meats, 
                fresh salads, and dips like hummus, moutabbal, and labneh. Always served with warm pita bread.
              </p>
              <p className="text-gray-400 text-sm">
                <strong>Best for:</strong> Al Abraaj, Zaitoun, Mirai, Furn Bistro
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-amber-400 mb-3">🇸🇾 Syrian</h3>
              <p className="text-gray-300 mb-2">
                Similar to Lebanese but with distinct specialties like kibbeh halabiya (Aleppo-style kibbeh), 
                muhammara (red pepper dip), and exceptional sweets like baklava and halawet el jibn.
              </p>
              <p className="text-gray-400 text-sm">
                <strong>Best for:</strong> Various restaurants in Manama souq area
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-amber-400 mb-3">🇪🇬 Egyptian</h3>
              <p className="text-gray-300 mb-2">
                Hearty comfort food including koshari (rice, lentils, pasta), ful medames (fava beans), 
                and molokhia (jute leaf stew). Street food favorites include falafel (ta&apos;meya) and hawawshi.
              </p>
              <p className="text-gray-400 text-sm">
                <strong>Best for:</strong> Egyptian restaurants in Gudaibiya and Manama
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Essential Dishes */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Must-Try Arabic Dishes</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
              <span className="text-4xl mb-4 block">🍚</span>
              <h3 className="text-lg font-bold text-amber-400 mb-2">Machboos</h3>
              <p className="text-gray-300 text-sm">
                Bahrain&apos;s national dish — aromatic spiced rice with chicken, lamb, or fish. Similar to biryani but with distinct Khaleeji spices.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
              <span className="text-4xl mb-4 block">🥙</span>
              <h3 className="text-lg font-bold text-amber-400 mb-2">Shawarma</h3>
              <p className="text-gray-300 text-sm">
                Marinated meat slow-roasted on a vertical spit, wrapped in bread with garlic sauce, pickles, and vegetables.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
              <span className="text-4xl mb-4 block">🍽️</span>
              <h3 className="text-lg font-bold text-amber-400 mb-2">Mezze</h3>
              <p className="text-gray-300 text-sm">
                Selection of small dishes — hummus, moutabbal, tabbouleh, fattoush, kibbeh, and more. The heart of Arabic dining.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
              <span className="text-4xl mb-4 block">🍖</span>
              <h3 className="text-lg font-bold text-amber-400 mb-2">Mixed Grill</h3>
              <p className="text-gray-300 text-sm">
                Assortment of grilled meats — lamb chops, chicken tawook, kafta, and shish kebab. Served with rice and bread.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
              <span className="text-4xl mb-4 block">🍰</span>
              <h3 className="text-lg font-bold text-amber-400 mb-2">Kunafa</h3>
              <p className="text-gray-300 text-sm">
                Crispy shredded pastry with sweet cheese filling, soaked in sugar syrup. The king of Arabic desserts.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
              <span className="text-4xl mb-4 block">🫖</span>
              <h3 className="text-lg font-bold text-amber-400 mb-2">Arabic Coffee</h3>
              <p className="text-gray-300 text-sm">
                Light, cardamom-spiced coffee served in small cups. A symbol of Arabian hospitality, often with dates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4 bg-white/5">
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
            <Link href="/guides/best-indian-restaurants-bahrain" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all">
              Indian Restaurants →
            </Link>
            <Link href="/guides/best-seafood-bahrain" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all">
              Seafood Restaurants →
            </Link>
            <Link href="/places" className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full font-medium hover:shadow-lg hover:shadow-amber-500/25 transition-all">
              Browse All Restaurants
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
