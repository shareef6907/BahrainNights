import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, Clock, DollarSign, Utensils, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Indian Restaurants in Bahrain 2026 | Top Curry Houses & Fine Dining',
  description: 'Discover the best Indian restaurants in Bahrain. From authentic South Indian dosas to North Indian curries, biryani, and fine dining. Complete guide with prices, locations, and reviews.',
  keywords: 'best Indian restaurants Bahrain, Indian food Bahrain, curry Bahrain, biryani Bahrain, Indian restaurant Manama, South Indian Bahrain, North Indian Bahrain, tandoori Bahrain',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/best-indian-restaurants-bahrain' },
  openGraph: {
    title: 'Best Indian Restaurants in Bahrain 2026',
    description: 'Your complete guide to the best Indian cuisine in Bahrain — from street food to fine dining.',
    type: 'article',
    locale: 'en_BH',
  },
};

const faqs = [
  { q: 'What is the best Indian restaurant in Bahrain?', a: 'Rasoi by Vineet at Gulf Hotel is widely considered the best for fine dining Indian cuisine. For authentic home-style cooking, Lanterns and Copper Chimney are top choices. For South Indian, Saravana Bhavan is legendary.' },
  { q: 'Where can I find authentic South Indian food in Bahrain?', a: 'Saravana Bhavan in Manama is the go-to for authentic South Indian vegetarian food — dosas, idlis, and thalis. Anjappar and Chettinad restaurants also serve excellent South Indian non-vegetarian dishes.' },
  { q: 'What is the average cost of Indian food in Bahrain?', a: 'Budget Indian restaurants cost BD 2-4 per person. Mid-range places like Copper Chimney or Lanterns run BD 6-12. Fine dining at Rasoi by Vineet or Saffron starts at BD 20-35 per person.' },
  { q: 'Which areas have the best Indian restaurants?', a: 'Gudaibiya and Manama Souq have the most authentic budget options. Adliya and Seef offer mid-range choices. Juffair and hotel restaurants have upscale Indian dining.' },
  { q: 'Do Indian restaurants in Bahrain serve alcohol?', a: 'Most standalone Indian restaurants do not serve alcohol as many are vegetarian or family-oriented. Hotel restaurants like Rasoi by Vineet, Saffron (Ritz-Carlton), and India (Gulf Hotel) serve alcohol.' },
];

const restaurants = [
  { 
    name: 'Rasoi by Vineet', 
    location: 'Gulf Hotel, Adliya',
    cuisine: 'Contemporary Indian Fine Dining',
    priceRange: 'BD 25-45',
    highlight: 'Michelin-starred chef Vineet Bhatia\'s signature dishes',
    mustTry: 'Chocolate Samosa, Lamb Shank Rogan Josh',
    rating: 4.8,
  },
  { 
    name: 'Saffron', 
    location: 'The Ritz-Carlton, Seef',
    cuisine: 'North Indian Fine Dining',
    priceRange: 'BD 20-35',
    highlight: 'Elegant setting with live Indian classical music',
    mustTry: 'Tandoori Platter, Dal Makhani',
    rating: 4.7,
  },
  { 
    name: 'Copper Chimney', 
    location: 'Adliya',
    cuisine: 'North Indian',
    priceRange: 'BD 8-15',
    highlight: 'Classic Indian restaurant, great for families',
    mustTry: 'Butter Chicken, Paneer Tikka',
    rating: 4.5,
  },
  { 
    name: 'Lanterns', 
    location: 'Gudaibiya',
    cuisine: 'Multi-Regional Indian',
    priceRange: 'BD 6-12',
    highlight: 'Authentic flavors at reasonable prices',
    mustTry: 'Hyderabadi Biryani, Kebab Platter',
    rating: 4.4,
  },
  { 
    name: 'Saravana Bhavan', 
    location: 'Manama',
    cuisine: 'South Indian Vegetarian',
    priceRange: 'BD 2-5',
    highlight: 'World-famous chain, pure vegetarian',
    mustTry: 'Masala Dosa, Filter Coffee, Thali',
    rating: 4.6,
  },
  { 
    name: 'Anjappar', 
    location: 'Gudaibiya',
    cuisine: 'Chettinad (South Indian)',
    priceRange: 'BD 4-8',
    highlight: 'Spicy Chettinad specialties',
    mustTry: 'Chettinad Chicken, Mutton Sukka',
    rating: 4.3,
  },
  { 
    name: 'Charcoal Grill', 
    location: 'Juffair',
    cuisine: 'North Indian BBQ',
    priceRange: 'BD 8-15',
    highlight: 'Live tandoor, great kebabs',
    mustTry: 'Galouti Kebab, Seekh Kebab',
    rating: 4.4,
  },
  { 
    name: 'Zafran Indian Bistro', 
    location: 'Seef Mall',
    cuisine: 'Modern Indian',
    priceRange: 'BD 6-12',
    highlight: 'Mall dining with quality Indian food',
    mustTry: 'Biryanis, Street Food Chaat',
    rating: 4.2,
  },
];

export default function BestIndianRestaurantsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-orange-950/20 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Best Indian Restaurants', url: 'https://www.bahrainnights.com/guides/best-indian-restaurants-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm font-medium mb-4">🍛 Cuisine Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Indian Restaurants</span> in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From sizzling tandoori kebabs to aromatic biryanis, creamy curries to crispy dosas — 
              discover Bahrain&apos;s best Indian restaurants for every budget and occasion.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
          <p>
            Bahrain has one of the largest Indian expat communities in the Gulf, which means you&apos;ll find 
            some of the most authentic Indian food outside of India. Whether you&apos;re craving the rich, 
            creamy gravies of North India, the spicy Chettinad dishes of Tamil Nadu, or the crispy dosas 
            of Karnataka, Bahrain has it all.
          </p>
          <p>
            The Indian dining scene in Bahrain ranges from humble eateries in Gudaibiya serving BD 1 thalis 
            to Michelin-starred fine dining at five-star hotels. This guide covers the best options across 
            all price points, helping you find the perfect spot for a quick lunch, family dinner, or special celebration.
          </p>
        </div>
      </section>

      {/* Restaurant Cards */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Top Indian Restaurants</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {restaurants.map((restaurant, index) => (
              <div 
                key={restaurant.name}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-orange-400/50 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-orange-400 text-sm font-medium">#{index + 1}</span>
                    <h3 className="text-xl font-bold text-white">{restaurant.name}</h3>
                    <p className="text-gray-400 text-sm flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {restaurant.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-orange-500/20 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                    <span className="text-orange-400 font-medium">{restaurant.rating}</span>
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

      {/* Regional Guide */}
      <section className="py-12 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Indian Food by Region</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-orange-400 mb-3">🍗 North Indian</h3>
              <p className="text-gray-300 mb-2">
                Rich, creamy curries, tandoori breads, and aromatic biryanis. North Indian cuisine dominates 
                Bahrain&apos;s Indian dining scene. Look for butter chicken, dal makhani, paneer dishes, and naan bread.
              </p>
              <p className="text-gray-400 text-sm">
                <strong>Best for:</strong> Copper Chimney, Charcoal Grill, Saffron, Rasoi by Vineet
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-orange-400 mb-3">🥘 South Indian</h3>
              <p className="text-gray-300 mb-2">
                Dosas, idlis, vadas, and filter coffee. South Indian food is lighter, often vegetarian, and 
                packed with coconut, curry leaves, and tamarind. Chettinad cuisine offers spicier meat dishes.
              </p>
              <p className="text-gray-400 text-sm">
                <strong>Best for:</strong> Saravana Bhavan, Anjappar, Murugan Idli Shop
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-orange-400 mb-3">🍖 Mughlai</h3>
              <p className="text-gray-300 mb-2">
                The royal cuisine of the Mughal emperors. Expect rich kormas, biryanis, kebabs, and dishes 
                finished with cream, nuts, and saffron. Perfect for special occasions.
              </p>
              <p className="text-gray-400 text-sm">
                <strong>Best for:</strong> Lanterns, India at Gulf Hotel, Zafran
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-orange-400 mb-3">🌶️ Street Food</h3>
              <p className="text-gray-300 mb-2">
                Chaat, pani puri, samosas, and vada pav. Bahrain has several spots serving authentic Indian 
                street food — perfect for a quick, flavorful snack.
              </p>
              <p className="text-gray-400 text-sm">
                <strong>Best for:</strong> Bikanervala, Chaat Cafe, various Gudaibiya street vendors
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Tips for Indian Dining in Bahrain</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-orange-400 mb-2">🕐 Best Times to Visit</h3>
              <p className="text-gray-300 text-sm">
                Lunch buffets (12-3pm) offer great value at mid-range restaurants. For dinner, 
                book ahead on weekends at popular spots. Friday brunch is popular at hotel restaurants.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-orange-400 mb-2">🌶️ Spice Levels</h3>
              <p className="text-gray-300 text-sm">
                Indian restaurants in Bahrain often tone down spice for local tastes. If you want authentic 
                heat, ask for &quot;Indian spicy&quot; or specify your preference when ordering.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-orange-400 mb-2">🥬 Vegetarian Options</h3>
              <p className="text-gray-300 text-sm">
                Indian cuisine offers the best vegetarian options in Bahrain. South Indian restaurants 
                like Saravana Bhavan are 100% vegetarian with extensive menus.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-orange-400 mb-2">💰 Budget Dining</h3>
              <p className="text-gray-300 text-sm">
                Head to Gudaibiya for the most authentic and affordable Indian food. A full meal with 
                biryani, curry, and drinks can cost under BD 3 at local eateries.
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
            <Link href="/guides/best-arabic-restaurants-bahrain" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all">
              Arabic Restaurants →
            </Link>
            <Link href="/guides/best-japanese-restaurants-bahrain" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all">
              Japanese Restaurants →
            </Link>
            <Link href="/places" className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full font-medium hover:shadow-lg hover:shadow-orange-500/25 transition-all">
              Browse All Restaurants
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
