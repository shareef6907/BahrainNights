import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import InternalLinks from '@/components/SEO/InternalLinks';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, DollarSign, Utensils, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Lebanese Restaurants in Bahrain 2026 | Mezze, Shawarma & Fine Dining',
  description: 'Discover the best Lebanese restaurants in Bahrain. From Em Sherif fine dining to authentic shawarma at Badawi. Complete guide with prices, locations, and must-try dishes.',
  keywords: 'best Lebanese restaurants Bahrain, Lebanese food Bahrain, mezze Bahrain, shawarma Bahrain, Em Sherif Bahrain, hummus Bahrain, manakish Bahrain, Lebanese fine dining Manama',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/best-lebanese-restaurants-bahrain' },
  openGraph: {
    title: 'Best Lebanese Restaurants in Bahrain 2026',
    description: 'Your complete guide to authentic Lebanese cuisine in Bahrain — from upscale mezze to street-style shawarma.',
    type: 'article',
    locale: 'en_BH',
  },
};

const faqs = [
  { q: 'What is the best Lebanese restaurant in Bahrain?', a: 'Em Sherif at The Avenues is considered Bahrain\'s finest Lebanese restaurant, offering upscale dining from the acclaimed Beirut brand. For authentic, casual Lebanese food, Badawi is a local legend with multiple locations.' },
  { q: 'Where can I find the best shawarma in Bahrain?', a: 'Badawi is famous for excellent shawarma at affordable prices. Zaatar w Zeit offers quick-service Lebanese including shawarma wraps. For upscale versions, Em Sherif and Abd El Wahab serve refined takes on the classic.' },
  { q: 'How much does Lebanese food cost in Bahrain?', a: 'Casual spots like Badawi and Zaatar w Zeit cost BD 3-8 per person. Mid-range restaurants like Naseef run BD 8-15. Fine dining Lebanese at Em Sherif or Abd El Wahab ranges BD 25-50 per person.' },
  { q: 'What Lebanese dishes should I try in Bahrain?', a: 'Start with mezze: hummus, moutabal, tabbouleh, and fattoush. Try hot mezze like kebbeh, falafel, and halloumi. For mains, mixed grill (mashawi), shawarma, and grilled fish are essential. End with knafeh or baklava.' },
  { q: 'Are there Lebanese breakfast options in Bahrain?', a: 'Yes! Naseef in Manama Souq is famous for traditional breakfast including fool, falafel, labneh, and manakish. Badawi and Zaatar w Zeit also serve Lebanese breakfast items.' },
];

const restaurants = [
  { 
    name: 'Em Sherif', 
    location: 'The Avenues, Bahrain Bay',
    style: 'Fine Dining Lebanese',
    priceRange: 'BD 30-60',
    highlight: 'Award-winning Beirut brand. Elegant setting with Mireille Hayek\'s renowned recipes.',
    mustTry: 'Signature Mezze Spread, Lamb Ouzi, Knafeh',
    rating: 4.8,
    vibe: 'Fine Dining',
  },
  { 
    name: 'Em Sherif Sea Cafe', 
    location: 'The Avenues, Bahrain Bay',
    style: 'Lebanese Seafood',
    priceRange: 'BD 25-45',
    highlight: 'Seafood-focused Lebanese from the Em Sherif family. Fresh catches with Lebanese spices.',
    mustTry: 'Grilled Fish, Seafood Mezze, Fried Calamari',
    rating: 4.7,
    vibe: 'Upscale Casual',
  },
  { 
    name: 'Layali Abd El Wahab', 
    location: 'Moda Mall, Seef',
    style: 'Upscale Traditional',
    priceRange: 'BD 20-40',
    highlight: 'Beautiful atmosphere with authentic Lebanese cuisine. Known for generous portions.',
    mustTry: 'Hot Mezze Platter, Mixed Grill, Fattoush',
    rating: 4.6,
    vibe: 'Upscale Casual',
  },
  { 
    name: 'Badawi', 
    location: 'Multiple Locations (Seef, Muharraq, Manama)',
    style: 'Authentic Casual',
    priceRange: 'BD 4-10',
    highlight: 'Local legend for authentic Lebanese. Fresh ingredients, honest prices, no frills.',
    mustTry: 'Shawarma, Falafel, Kebbeh, Hummus',
    rating: 4.6,
    vibe: 'Casual',
  },
  { 
    name: 'Naseef', 
    location: 'Manama Souq & Seef Mall',
    style: 'Traditional Café-Restaurant',
    priceRange: 'BD 5-12',
    highlight: 'Manama institution famous for Bahraini-Lebanese breakfast. Historic souq atmosphere.',
    mustTry: 'Breakfast Platter, Fool, Manakish, Arabic Coffee',
    rating: 4.5,
    vibe: 'Traditional',
  },
  { 
    name: 'Rosemary Gourmet', 
    location: 'Seef District',
    style: 'Hidden Gem',
    priceRange: 'BD 6-14',
    highlight: 'Under-the-radar spot with punchy flavors. Locals\' favorite for quality Lebanese.',
    mustTry: 'Grilled Meats, Fresh Mezze, Daily Specials',
    rating: 4.5,
    vibe: 'Casual',
  },
  { 
    name: 'Zaatar w Zeit', 
    location: 'Multiple Locations',
    style: 'Quick Service Lebanese',
    priceRange: 'BD 3-8',
    highlight: 'Popular chain for fresh manakish, wraps, and quick Lebanese bites.',
    mustTry: 'Zaatar Manakish, Chicken Shawarma, Halloumi Wrap',
    rating: 4.3,
    vibe: 'Fast Casual',
  },
  { 
    name: 'Babel', 
    location: 'Adliya',
    style: 'Contemporary Lebanese',
    priceRange: 'BD 15-30',
    highlight: 'Modern Lebanese in trendy Adliya. Creative presentations, social atmosphere.',
    mustTry: 'Contemporary Mezze, Lamb Chops, Cocktails',
    rating: 4.4,
    vibe: 'Trendy',
  },
  { 
    name: 'Al Abraaj', 
    location: 'Juffair & Seef',
    style: 'Traditional Lebanese',
    priceRange: 'BD 8-18',
    highlight: 'Family-friendly Lebanese with generous portions and outdoor seating.',
    mustTry: 'Mixed Grill, Chicken Taouk, Arabic Salads',
    rating: 4.3,
    vibe: 'Family',
  },
  { 
    name: 'Karam Beirut', 
    location: 'Seef Mall',
    style: 'Mall Lebanese',
    priceRange: 'BD 8-16',
    highlight: 'Solid mall option for Lebanese cravings. Consistent quality, convenient location.',
    mustTry: 'Fatayer, Grilled Chicken, Fresh Juices',
    rating: 4.2,
    vibe: 'Casual',
  },
];

export default function BestLebaneseRestaurantsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-emerald-950/20 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Best Lebanese Restaurants', url: 'https://www.bahrainnights.com/guides/best-lebanese-restaurants-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-red-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium mb-4">🇱🇧 Cuisine Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best <span className="bg-gradient-to-r from-emerald-400 to-red-500 bg-clip-text text-transparent">Lebanese Restaurants</span> in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From award-winning Em Sherif to beloved local spots like Badawi — discover 
              Bahrain&apos;s finest Lebanese cuisine, mezze spreads, and shawarma.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
          <p>
            Lebanese cuisine holds a special place in Bahrain&apos;s culinary landscape. With a significant 
            Lebanese community and deep cultural ties, the Kingdom offers everything from hole-in-the-wall 
            shawarma joints to sophisticated fine dining experiences that rival Beirut itself.
          </p>
          <p>
            The arrival of Em Sherif at The Avenues brought world-class Lebanese dining to Bahrain, 
            while institutions like Badawi and Naseef have been serving authentic flavors for decades. 
            Whether you&apos;re craving a quick manakish, an elaborate mezze feast, or grilled meats 
            from a charcoal mashawi, Bahrain delivers.
          </p>
        </div>
      </section>

      {/* Top Picks */}
      <section className="py-12 px-4 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Top Lebanese Experiences</h2>
          <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
            The best Lebanese restaurants in Bahrain for any occasion and budget.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.slice(0, 6).map((restaurant, index) => (
              <div 
                key={restaurant.name}
                className="bg-gradient-to-br from-emerald-500/10 to-red-500/10 border border-emerald-500/30 rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-emerald-400 font-bold">#{index + 1}</span>
                  <div className="flex items-center gap-1 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                    <Star className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                    <span className="text-emerald-400 text-sm font-medium">{restaurant.rating}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{restaurant.name}</h3>
                <p className="text-gray-400 text-sm flex items-center gap-1 mb-3">
                  <MapPin className="w-4 h-4" /> {restaurant.location}
                </p>
                <p className="text-gray-300 text-sm mb-3">{restaurant.highlight}</p>
                <div className="space-y-1 text-sm">
                  <p className="text-emerald-400">
                    <DollarSign className="w-4 h-4 inline" /> {restaurant.priceRange}
                  </p>
                  <p className="text-gray-500">
                    <Utensils className="w-4 h-4 inline mr-1" /> {restaurant.mustTry}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Restaurants */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">All Lebanese Restaurants</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {restaurants.map((restaurant, index) => (
              <div 
                key={restaurant.name}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-emerald-400/50 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-emerald-400 text-sm font-medium">#{index + 1}</span>
                    <h3 className="text-xl font-bold text-white">{restaurant.name}</h3>
                    <p className="text-gray-400 text-sm flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {restaurant.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-emerald-500/20 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                    <span className="text-emerald-400 font-medium">{restaurant.rating}</span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-2">{restaurant.style}</p>
                <p className="text-gray-400 text-sm mb-3">{restaurant.highlight}</p>
                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <DollarSign className="w-4 h-4" /> {restaurant.priceRange}
                  </span>
                  <span className="flex items-center gap-1 text-red-400">
                    <Heart className="w-4 h-4" /> {restaurant.vibe}
                  </span>
                </div>
                <p className="text-gray-500 text-xs mt-3">
                  <strong className="text-gray-400">Must Try:</strong> {restaurant.mustTry}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lebanese Cuisine Guide */}
      <section className="py-12 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Lebanese Cuisine Essentials</h2>
          
          <div className="space-y-8">
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-xl font-bold text-emerald-400 mb-3">🥗 Cold Mezze</h3>
              <p className="text-gray-300 mb-3">
                The foundation of any Lebanese meal. Small dishes meant for sharing and dipping with fresh bread.
              </p>
              <ul className="space-y-1 text-gray-400">
                <li><strong className="text-white">Hummus</strong> — Creamy chickpea dip with tahini, lemon, and olive oil</li>
                <li><strong className="text-white">Moutabal</strong> — Smoky eggplant dip (similar to baba ganoush)</li>
                <li><strong className="text-white">Tabbouleh</strong> — Fresh parsley salad with bulgur, tomato, and mint</li>
                <li><strong className="text-white">Fattoush</strong> — Crispy bread salad with sumac dressing</li>
                <li><strong className="text-white">Labneh</strong> — Strained yogurt with olive oil and za&apos;atar</li>
              </ul>
            </div>
            
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-xl font-bold text-emerald-400 mb-3">🔥 Hot Mezze</h3>
              <p className="text-gray-300 mb-3">
                Cooked appetizers that arrive sizzling. These are the showstoppers.
              </p>
              <ul className="space-y-1 text-gray-400">
                <li><strong className="text-white">Kebbeh</strong> — Fried bulgur shells with spiced lamb</li>
                <li><strong className="text-white">Falafel</strong> — Crispy chickpea fritters</li>
                <li><strong className="text-white">Halloumi</strong> — Grilled cheese that doesn&apos;t melt</li>
                <li><strong className="text-white">Fatayer</strong> — Baked pastries with spinach, cheese, or meat</li>
                <li><strong className="text-white">Sambousek</strong> — Fried pastries with savory fillings</li>
              </ul>
            </div>
            
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-xl font-bold text-emerald-400 mb-3">🍖 Grills (Mashawi)</h3>
              <p className="text-gray-300 mb-3">
                Charcoal-grilled meats are the heart of Lebanese main courses.
              </p>
              <ul className="space-y-1 text-gray-400">
                <li><strong className="text-white">Shish Taouk</strong> — Marinated chicken skewers</li>
                <li><strong className="text-white">Kafta</strong> — Spiced minced meat on skewers</li>
                <li><strong className="text-white">Lahm Meshwi</strong> — Grilled lamb cubes</li>
                <li><strong className="text-white">Mixed Grill</strong> — Assortment of all the above</li>
                <li><strong className="text-white">Shawarma</strong> — Slow-roasted meat sliced thin</li>
              </ul>
            </div>
            
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-xl font-bold text-emerald-400 mb-3">🍯 Sweets</h3>
              <p className="text-gray-300 mb-3">
                Lebanese desserts are legendary — sweet, rich, and unforgettable.
              </p>
              <ul className="space-y-1 text-gray-400">
                <li><strong className="text-white">Knafeh</strong> — Cheese pastry with syrup (the king of desserts)</li>
                <li><strong className="text-white">Baklava</strong> — Layered filo with nuts and honey</li>
                <li><strong className="text-white">Maamoul</strong> — Date-filled semolina cookies</li>
                <li><strong className="text-white">Ashta</strong> — Clotted cream with rose water</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Best For */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Best For...</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-emerald-400 mb-2">✨ Special Occasion</h3>
              <p className="text-gray-300 text-sm">
                <strong>Em Sherif</strong> — Beirut&apos;s finest, award-winning hospitality.
                <br /><strong>Layali Abd El Wahab</strong> — Elegant atmosphere, generous spreads.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-emerald-400 mb-2">💰 Best Value</h3>
              <p className="text-gray-300 text-sm">
                <strong>Badawi</strong> — Authentic quality at honest prices.
                <br /><strong>Zaatar w Zeit</strong> — Quick, fresh, affordable.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-emerald-400 mb-2">🌅 Breakfast</h3>
              <p className="text-gray-300 text-sm">
                <strong>Naseef</strong> — Traditional Lebanese-Bahraini breakfast, souq vibes.
                <br /><strong>Zaatar w Zeit</strong> — Fresh manakish any time.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-emerald-400 mb-2">🥙 Best Shawarma</h3>
              <p className="text-gray-300 text-sm">
                <strong>Badawi</strong> — Classic, fresh, perfectly spiced.
                <br /><strong>Rosemary Gourmet</strong> — Hidden gem quality.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-emerald-400 mb-2">👨‍👩‍👧 Family Dining</h3>
              <p className="text-gray-300 text-sm">
                <strong>Al Abraaj</strong> — Generous portions, outdoor seating.
                <br /><strong>Karam Beirut</strong> — Mall-convenient, kid-friendly.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-emerald-400 mb-2">🍸 Trendy Night Out</h3>
              <p className="text-gray-300 text-sm">
                <strong>Babel</strong> — Contemporary Lebanese, Adliya vibes.
                <br /><strong>Em Sherif</strong> — Sophisticated, memorable evening.
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
          <p className="text-gray-400 mb-8">Discover more dining guides by cuisine</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guides/best-arabic-restaurants-bahrain" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all">
              Arabic Restaurants →
            </Link>
            <Link href="/guides/best-indian-restaurants-bahrain" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all">
              Indian Restaurants →
            </Link>
            <Link href="/places" className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-red-500 rounded-full font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all">
              Browse All Restaurants
            </Link>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-lg font-bold mb-4">More Cuisine Guides</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { title: 'Arabic', href: '/guides/best-arabic-restaurants-bahrain' },
              { title: 'Indian', href: '/guides/best-indian-restaurants-bahrain' },
              { title: 'Italian', href: '/guides/best-italian-restaurants-bahrain' },
              { title: 'Turkish', href: '/guides/best-turkish-restaurants-bahrain' },
              { title: 'Seafood', href: '/guides/best-seafood-bahrain' },
              { title: 'Fine Dining', href: '/guides/best-fine-dining-bahrain' },
              { title: 'Steakhouses', href: '/guides/best-steakhouses-bahrain' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="px-3 py-1.5 bg-white/5 hover:bg-emerald-500/20 rounded text-sm transition-colors">
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <InternalLinks 
        title="Explore Dining in Bahrain" 
        links={[
          { title: 'Best Arabic Restaurants', href: '/guides/best-arabic-restaurants-bahrain' },
          { title: 'Best Restaurants in Bahrain', href: '/guides/restaurants' },
          { title: 'Adliya Restaurants & Bars', href: '/guides/adliya-restaurants-bars' },
          { title: 'Best Brunches', href: '/guides/brunches' },
          { title: 'Shisha Spots', href: '/guides/shisha' },
        ]} 
      />
    </div>
  );
}
