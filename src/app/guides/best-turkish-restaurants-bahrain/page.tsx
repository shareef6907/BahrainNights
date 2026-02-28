import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import InternalLinks from '@/components/SEO/InternalLinks';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, DollarSign, Utensils, Flame } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Turkish Restaurants in Bahrain 2026 | Kebabs, Grills & More',
  description: 'Discover the best Turkish restaurants in Bahrain. From CZN Burak to authentic grillhouses. Complete guide to kebabs, pide, breakfast spreads, and Turkish BBQ with prices and locations.',
  keywords: 'best Turkish restaurants Bahrain, Turkish food Bahrain, kebab Bahrain, CZN Burak Bahrain, Turkish grill Manama, doner kebab Bahrain, Turkish breakfast Bahrain, lahmacun Bahrain',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/best-turkish-restaurants-bahrain' },
  openGraph: {
    title: 'Best Turkish Restaurants in Bahrain 2026',
    description: 'Your complete guide to Turkish cuisine in Bahrain — from viral chef CZN Burak to beloved local grillhouses.',
    type: 'article',
    locale: 'en_BH',
  },
};

const faqs = [
  { q: 'What is the best Turkish restaurant in Bahrain?', a: 'Guzel and Konyali Ahmet Usta are consistently rated among the best for authentic Turkish cuisine. For a viral experience, CZN Burak at The Avenues brings showmanship and flavor. Al Shoala and Showpiece are beloved local institutions.' },
  { q: 'Where is CZN Burak in Bahrain?', a: 'CZN Burak is located at The Avenues mall (Gate 3) in Manama. The viral Turkish chef\'s restaurant offers his signature showmanship along with authentic Turkish grills and mezze.' },
  { q: 'How much does Turkish food cost in Bahrain?', a: 'Casual Turkish spots like Istanbul House and Al Shoala cost BD 5-12. Mid-range restaurants like Bosporus and Şışler run BD 12-25. CZN Burak and upscale options range BD 25-50 per person.' },
  { q: 'What Turkish dishes should I try in Bahrain?', a: 'Start with mezze and pide (Turkish flatbread). Try kebabs like Adana and Iskender. Don\'t miss lahmacun (Turkish pizza), manti (dumplings), and finish with baklava or künefe. Turkish breakfast spreads are also exceptional.' },
  { q: 'Are there Turkish breakfast options in Bahrain?', a: 'Yes! LALE Restaurant is famous for generous Turkish breakfast spreads. Simit Sarayı offers casual breakfast with fresh simits and pastries. Bosporus and Baharat also serve excellent morning options.' },
];

const restaurants = [
  { 
    name: 'CZN Burak', 
    location: 'The Avenues, Gate 3, Manama',
    style: 'Viral Chef Experience',
    priceRange: 'BD 25-50',
    highlight: 'The viral Turkish chef\'s Bahrain outpost. Big on showmanship, bigger on flavor.',
    mustTry: 'Signature Kebabs, Mixed Grill, Theatrical Presentations',
    rating: 4.6,
    vibe: 'Entertainment Dining',
  },
  { 
    name: 'Guzel Turkish Restaurant', 
    location: 'Juffair',
    style: 'Authentic Turkish Fine Dining',
    priceRange: 'BD 15-35',
    highlight: 'Considered by many as the best Turkish restaurant in Bahrain. Perfect for celebrations.',
    mustTry: 'Lamb Shank, Mixed Grill, Künefe',
    rating: 4.7,
    vibe: 'Upscale',
  },
  { 
    name: 'Konyali Ahmet Usta', 
    location: 'Juffair',
    style: 'Premium Turkish Steakhouse',
    priceRange: 'BD 20-45',
    highlight: 'Rated the finest Turkish restaurant and top dining establishment in Bahrain.',
    mustTry: 'Turkish Steaks, Lahmacun, Cheese Rolls',
    rating: 4.8,
    vibe: 'Fine Dining',
  },
  { 
    name: 'Şışler', 
    location: 'The Avenues & City Centre Bahrain',
    style: 'Elegant Turkish',
    priceRange: 'BD 15-30',
    highlight: 'Elegant plating, ambient vibes, feels like a mini escape to Istanbul.',
    mustTry: 'Şiş Kebab, Pide, Turkish Tea',
    rating: 4.5,
    vibe: 'Upscale Casual',
  },
  { 
    name: 'Bosporus Turkish Restaurant', 
    location: 'Marassi Galleria Mall, Diyar Al Muharraq',
    style: 'Family Turkish',
    priceRange: 'BD 12-25',
    highlight: 'Bright, breezy, and perfect for families. Bold Turkish flavors.',
    mustTry: 'Mixed Grill, Turkish Breakfast, Baklava',
    rating: 4.4,
    vibe: 'Family',
  },
  { 
    name: 'Al Shoala Restaurant', 
    location: 'Jidhafs, Muharraq & Isa Town',
    style: 'Traditional Grillhouse',
    priceRange: 'BD 5-12',
    highlight: 'Serving Turkish delights since 1988. Succulent grills and traditional dishes.',
    mustTry: 'Grilled Meats, Kebabs, Turkish Bread',
    rating: 4.4,
    vibe: 'Casual',
  },
  { 
    name: 'LALE Restaurant & Gourmet', 
    location: 'Manama',
    style: 'Breakfast & Café',
    priceRange: 'BD 8-18',
    highlight: 'Known for knockout Turkish breakfasts and generous portions.',
    mustTry: 'Turkish Breakfast Spread, Menemen, Simit',
    rating: 4.5,
    vibe: 'Café',
  },
  { 
    name: 'Showpiece', 
    location: 'Zinj',
    style: 'Local Favorite',
    priceRange: 'BD 6-15',
    highlight: 'A long-time local gem serving Turkish grills since 1994. Simple, no-fuss.',
    mustTry: 'Adana Kebab, Mixed Grill, Hummus',
    rating: 4.3,
    vibe: 'Casual',
  },
  { 
    name: 'Iskenderun Grills', 
    location: 'Manama',
    style: 'Traditional Grill',
    priceRange: 'BD 6-14',
    highlight: 'Local favorite for authentic Turkish grills and fresh bread.',
    mustTry: 'Shish Tawook, Meat Kebab, Turkish Bread',
    rating: 4.3,
    vibe: 'Casual',
  },
  { 
    name: 'Baharat Restaurant', 
    location: 'Le Meridien City Centre, Seef',
    style: 'Hotel Turkish',
    priceRange: 'BD 15-30',
    highlight: 'Themed nights including Turkish Night, BBQ Night, and weekend brunch.',
    mustTry: 'BBQ Night Selection, Turkish Mains, Brunch',
    rating: 4.4,
    vibe: 'Hotel',
  },
  { 
    name: 'Istanbul House Restaurant', 
    location: 'Janabiya & Saar',
    style: 'Casual Turkish',
    priceRange: 'BD 5-12',
    highlight: 'Affordable, cheerful, and seriously tasty. A crowd favorite.',
    mustTry: 'Doner, Pide, Lentil Soup',
    rating: 4.2,
    vibe: 'Casual',
  },
  { 
    name: 'Midyeci Ahmet', 
    location: 'District 1, Janabiyah',
    style: 'Seafood Specialist',
    priceRange: 'BD 10-22',
    highlight: 'Buckets of mussels, Turkish-style. One dish, three flavors, done brilliantly.',
    mustTry: 'Stuffed Mussels (Midye Dolma), Fried Mussels, Fish',
    rating: 4.4,
    vibe: 'Casual',
  },
  { 
    name: 'Simit Sarayı', 
    location: 'City Centre Bahrain & Souq Al Baraha',
    style: 'Turkish Bakery Café',
    priceRange: 'BD 3-8',
    highlight: 'Casual Turkish bakery where simits and pastries are the stars.',
    mustTry: 'Simit, Börek, Turkish Tea, Pastries',
    rating: 4.2,
    vibe: 'Café',
  },
  { 
    name: 'Bayram Turkish Grill', 
    location: 'The Grove Village, Bani Jamrah',
    style: 'Themed Grillhouse',
    priceRange: 'BD 10-22',
    highlight: 'Castle vibes meet Turkish classics. Hearty food with imagination.',
    mustTry: 'Grilled Platters, Lamb Dishes, Desserts',
    rating: 4.3,
    vibe: 'Family',
  },
  { 
    name: 'Gurme Mehmed', 
    location: 'District 2, Janabiyah',
    style: 'Cozy Turkish',
    priceRange: 'BD 8-18',
    highlight: 'Laid-back vibes, authentic taste. Comfort food the Turkish way.',
    mustTry: 'Homestyle Dishes, Kebabs, Turkish Coffee',
    rating: 4.3,
    vibe: 'Casual',
  },
];

export default function BestTurkishRestaurantsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-red-950/20 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Best Turkish Restaurants', url: 'https://www.bahrainnights.com/guides/best-turkish-restaurants-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-white/5" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium mb-4">🇹🇷 Cuisine Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best <span className="bg-gradient-to-r from-red-400 to-white bg-clip-text text-transparent">Turkish Restaurants</span> in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From viral chef CZN Burak to beloved local grillhouses — discover Bahrain&apos;s 
              finest Turkish cuisine, smoky kebabs, and generous breakfast spreads.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
          <p>
            Turkish restaurants dot every corner of Bahrain. There&apos;s something about Turkish food 
            that feels like a warm hug — smoky grills, generous portions, and that satisfying clink 
            of tea in dainty glasses. The island has embraced this cuisine with open arms and big appetites.
          </p>
          <p>
            From family-run kitchens serving kebabs since the 1980s to internationally famed spots 
            with viral chefs, Turkish restaurants here deliver both food and experience. Whether 
            you&apos;re chasing the perfect Adana kebab, a weekend breakfast spread, or simply want 
            to sip çay and people-watch, Bahrain&apos;s Turkish scene won&apos;t disappoint.
          </p>
        </div>
      </section>

      {/* Top Picks */}
      <section className="py-12 px-4 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Top Turkish Experiences</h2>
          <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
            The best Turkish restaurants for any occasion — from viral entertainment to authentic traditions.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.slice(0, 6).map((restaurant, index) => (
              <div 
                key={restaurant.name}
                className="bg-gradient-to-br from-red-500/10 to-white/5 border border-red-500/30 rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-red-400 font-bold">#{index + 1}</span>
                  <div className="flex items-center gap-1 bg-red-500/20 px-2 py-0.5 rounded-full">
                    <Star className="w-3 h-3 text-red-400 fill-red-400" />
                    <span className="text-red-400 text-sm font-medium">{restaurant.rating}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{restaurant.name}</h3>
                <p className="text-gray-400 text-sm flex items-center gap-1 mb-3">
                  <MapPin className="w-4 h-4" /> {restaurant.location}
                </p>
                <p className="text-gray-300 text-sm mb-3">{restaurant.highlight}</p>
                <div className="space-y-1 text-sm">
                  <p className="text-red-400">
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
          <h2 className="text-3xl font-bold mb-8 text-center">All Turkish Restaurants</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {restaurants.map((restaurant, index) => (
              <div 
                key={restaurant.name}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-red-400/50 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-red-400 text-sm font-medium">#{index + 1}</span>
                    <h3 className="text-xl font-bold text-white">{restaurant.name}</h3>
                    <p className="text-gray-400 text-sm flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {restaurant.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-red-500/20 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 text-red-400 fill-red-400" />
                    <span className="text-red-400 font-medium">{restaurant.rating}</span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-2">{restaurant.style}</p>
                <p className="text-gray-400 text-sm mb-3">{restaurant.highlight}</p>
                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="flex items-center gap-1 text-red-400">
                    <DollarSign className="w-4 h-4" /> {restaurant.priceRange}
                  </span>
                  <span className="flex items-center gap-1 text-orange-400">
                    <Flame className="w-4 h-4" /> {restaurant.vibe}
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

      {/* Turkish Cuisine Guide */}
      <section className="py-12 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Turkish Cuisine Essentials</h2>
          
          <div className="space-y-8">
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-xl font-bold text-red-400 mb-3">🍢 Kebabs</h3>
              <p className="text-gray-300 mb-3">
                The heart of Turkish cuisine. Grilled meats prepared with centuries of tradition.
              </p>
              <ul className="space-y-1 text-gray-400">
                <li><strong className="text-white">Adana Kebab</strong> — Spicy minced lamb on skewers, charcoal-grilled</li>
                <li><strong className="text-white">Iskender</strong> — Doner over bread with tomato sauce and yogurt</li>
                <li><strong className="text-white">Şiş Kebab</strong> — Cubed meat on skewers, marinated and grilled</li>
                <li><strong className="text-white">Köfte</strong> — Turkish meatballs, grilled or fried</li>
              </ul>
            </div>
            
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-xl font-bold text-red-400 mb-3">🫓 Breads & Pastries</h3>
              <p className="text-gray-300 mb-3">
                Turkish baking is an art form — from street-side simits to elaborate böreks.
              </p>
              <ul className="space-y-1 text-gray-400">
                <li><strong className="text-white">Pide</strong> — Boat-shaped flatbread with various toppings</li>
                <li><strong className="text-white">Lahmacun</strong> — Thin crispy base with spiced meat (Turkish pizza)</li>
                <li><strong className="text-white">Simit</strong> — Sesame-crusted bread rings</li>
                <li><strong className="text-white">Börek</strong> — Layered filo pastries with cheese or meat</li>
              </ul>
            </div>
            
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-xl font-bold text-red-400 mb-3">🍳 Breakfast</h3>
              <p className="text-gray-300 mb-3">
                Turkish breakfast is legendary — a spread that covers the entire table.
              </p>
              <ul className="space-y-1 text-gray-400">
                <li><strong className="text-white">Menemen</strong> — Scrambled eggs with tomatoes and peppers</li>
                <li><strong className="text-white">Sucuklu Yumurta</strong> — Eggs with Turkish sausage</li>
                <li><strong className="text-white">Kaymak</strong> — Clotted cream with honey</li>
                <li><strong className="text-white">Full Spread</strong> — Cheeses, olives, jams, bread, eggs, and çay</li>
              </ul>
            </div>
            
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-xl font-bold text-red-400 mb-3">🍯 Sweets</h3>
              <p className="text-gray-300 mb-3">
                Turkish desserts are rich, sweet, and absolutely worth the calories.
              </p>
              <ul className="space-y-1 text-gray-400">
                <li><strong className="text-white">Baklava</strong> — Layered filo with nuts and syrup</li>
                <li><strong className="text-white">Künefe</strong> — Shredded pastry with cheese and syrup</li>
                <li><strong className="text-white">Turkish Delight</strong> — Lokum in various flavors</li>
                <li><strong className="text-white">Sütlaç</strong> — Turkish rice pudding</li>
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
              <h3 className="text-lg font-bold text-red-400 mb-2">📸 Viral Experience</h3>
              <p className="text-gray-300 text-sm">
                <strong>CZN Burak</strong> — The smiling chef&apos;s theatrical presentation.
                <br /><strong>Şışler</strong> — Instagram-worthy plating and ambiance.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-red-400 mb-2">🏆 Best Kebabs</h3>
              <p className="text-gray-300 text-sm">
                <strong>Guzel</strong> — Hands down the best Turkish in Bahrain.
                <br /><strong>Konyali Ahmet Usta</strong> — Premium cuts, authentic preparation.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-red-400 mb-2">🌅 Breakfast</h3>
              <p className="text-gray-300 text-sm">
                <strong>LALE Restaurant</strong> — Legendary Turkish breakfast spreads.
                <br /><strong>Simit Sarayı</strong> — Quick, fresh simits and pastries.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-red-400 mb-2">💰 Best Value</h3>
              <p className="text-gray-300 text-sm">
                <strong>Al Shoala</strong> — Serving quality since 1988, great prices.
                <br /><strong>Istanbul House</strong> — Cheerful, tasty, affordable.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-red-400 mb-2">👨‍👩‍👧 Family Dining</h3>
              <p className="text-gray-300 text-sm">
                <strong>Bosporus</strong> — Bright, family-friendly at Marassi.
                <br /><strong>Bayram Turkish Grill</strong> — Castle vibes kids love.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-red-400 mb-2">🦪 Seafood</h3>
              <p className="text-gray-300 text-sm">
                <strong>Midyeci Ahmet</strong> — Turkish mussels done brilliantly.
                <br />One dish, three flavors, buckets of happiness.
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
          <p className="text-gray-400 mb-8">Discover more dining guides</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guides/best-lebanese-restaurants-bahrain" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all">
              Lebanese Restaurants →
            </Link>
            <Link href="/guides/best-arabic-restaurants-bahrain" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all">
              Arabic Restaurants →
            </Link>
            <Link href="/places" className="px-6 py-3 bg-gradient-to-r from-red-500 to-white/80 text-slate-900 rounded-full font-medium hover:shadow-lg hover:shadow-red-500/25 transition-all">
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
              { title: 'Lebanese', href: '/guides/best-lebanese-restaurants-bahrain' },
              { title: 'Arabic', href: '/guides/best-arabic-restaurants-bahrain' },
              { title: 'Indian', href: '/guides/best-indian-restaurants-bahrain' },
              { title: 'Steakhouses', href: '/guides/best-steakhouses-bahrain' },
              { title: 'Italian', href: '/guides/best-italian-restaurants-bahrain' },
              { title: 'Fine Dining', href: '/guides/best-fine-dining-bahrain' },
              { title: 'Seafood', href: '/guides/best-seafood-bahrain' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="px-3 py-1.5 bg-white/5 hover:bg-red-500/20 rounded text-sm transition-colors">
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
          { title: 'Shisha Spots', href: '/guides/shisha' },
          { title: 'Best Brunches', href: '/guides/brunches' },
          { title: 'Juffair Restaurants', href: '/guides/juffair-restaurants-bars' },
        ]} 
      />
    </div>
  );
}
