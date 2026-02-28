import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import InternalLinks from '@/components/SEO/InternalLinks';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, DollarSign, Wine, Award, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Fine Dining Restaurants in Bahrain 2026 | Upscale & Luxury Dining',
  description: 'Discover the best fine dining restaurants in Bahrain. From Michelin-starred chefs to luxury hotel restaurants. Complete guide to upscale dining with prices, dress codes, and reservations.',
  keywords: 'fine dining Bahrain, upscale restaurants Bahrain, luxury restaurants Manama, Michelin star Bahrain, best restaurants Bahrain, special occasion dining Bahrain, romantic restaurants Bahrain',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/best-fine-dining-bahrain' },
  openGraph: {
    title: 'Best Fine Dining Restaurants in Bahrain 2026',
    description: 'Your complete guide to luxury and upscale dining experiences in Bahrain.',
    type: 'article',
    locale: 'en_BH',
  },
};

const faqs = [
  { q: 'What is the best fine dining restaurant in Bahrain?', a: 'CUT by Wolfgang Puck at Four Seasons and Rasoi by Vineet at Gulf Hotel are considered Bahrain\'s premier fine dining restaurants. Both feature celebrity chefs and exceptional cuisine — CUT for steaks and Rasoi for contemporary Indian.' },
  { q: 'Are there Michelin-starred restaurants in Bahrain?', a: 'While Bahrain doesn\'t have Michelin ratings, Rasoi by Vineet is operated by Michelin-starred chef Vineet Bhatia. CUT is from Wolfgang Puck, whose original CUT locations have earned Michelin stars.' },
  { q: 'How much does fine dining cost in Bahrain?', a: 'Expect BD 40-80 per person at most fine dining restaurants. At premium spots like CUT or Rasoi, a full experience with wine pairings can reach BD 100-150. Lunch menus offer the same quality at 30-40% lower prices.' },
  { q: 'What should I wear to fine dining restaurants in Bahrain?', a: 'Smart casual to formal attire is expected. Men should wear long trousers and collared shirts (blazers appreciated). Women should dress elegantly. Avoid shorts, flip-flops, and overly casual wear.' },
  { q: 'Do I need reservations for fine dining in Bahrain?', a: 'Yes, reservations are strongly recommended, especially for weekends and special occasions. Book 2-3 days ahead for most restaurants, or 1-2 weeks ahead for CUT and Rasoi on weekends.' },
];

const restaurants = [
  { 
    name: 'CUT by Wolfgang Puck', 
    location: 'Four Seasons Hotel, Bahrain Bay',
    cuisine: 'Modern American Steakhouse',
    priceRange: 'BD 50-100',
    highlight: 'One of only three CUT restaurants globally. 180° views of Manama skyline.',
    mustTry: 'USDA Prime Ribeye, Wagyu Selection, Bone Marrow Flan',
    rating: 4.9,
    dressCode: 'Smart Casual to Formal',
    chef: 'Wolfgang Puck',
  },
  { 
    name: 'Rasoi by Vineet', 
    location: 'Gulf Hotel, Adliya',
    cuisine: 'Contemporary Indian Fine Dining',
    priceRange: 'BD 35-70',
    highlight: 'Bahrain\'s first Michelin-starred chef restaurant. Open kitchen concept.',
    mustTry: 'Chocolate Samosa, Lamb Nalli Nihari, Tasting Menu',
    rating: 4.8,
    dressCode: 'Smart Casual',
    chef: 'Vineet Bhatia (Michelin Star)',
  },
  { 
    name: 'La Mer', 
    location: 'Gulf Hotel, Adliya',
    cuisine: 'French Mediterranean',
    priceRange: 'BD 40-80',
    highlight: 'Gulf Hotel\'s signature French restaurant with elegant ambiance.',
    mustTry: 'Lobster Thermidor, Duck Confit, Crème Brûlée',
    rating: 4.7,
    dressCode: 'Smart Casual to Formal',
    chef: 'European Culinary Team',
  },
  { 
    name: 'Plums', 
    location: 'The Ritz-Carlton, Seef',
    cuisine: 'International Fine Dining',
    priceRange: 'BD 45-90',
    highlight: 'Elegant setting with classic international cuisine and impeccable service.',
    mustTry: 'Prime Cuts, Seafood Selections, Chef\'s Tasting Menu',
    rating: 4.7,
    dressCode: 'Smart Casual to Formal',
    chef: 'Ritz-Carlton Culinary Team',
  },
  { 
    name: 'Re Napoli', 
    location: 'Four Seasons Hotel, Bahrain Bay',
    cuisine: 'Authentic Italian',
    priceRange: 'BD 30-55',
    highlight: 'Waterfront Italian with ingredients imported from Italy.',
    mustTry: 'Neapolitan Pizza, Fresh Pasta, Gelato',
    rating: 4.8,
    dressCode: 'Smart Casual',
    chef: 'Italian Culinary Team',
  },
  { 
    name: 'Takumi', 
    location: 'Four Seasons Hotel, Bahrain Bay',
    cuisine: 'Japanese Omakase & Teppanyaki',
    priceRange: 'BD 45-100',
    highlight: 'Intimate omakase counter and live teppanyaki experience.',
    mustTry: 'Chef\'s Omakase, Wagyu Teppanyaki, Sashimi Selection',
    rating: 4.6,
    dressCode: 'Smart Casual',
    chef: 'Japanese Head Chef',
  },
  { 
    name: 'BiCE', 
    location: 'Gulf Hotel, Adliya',
    cuisine: 'Northern Italian Fine Dining',
    priceRange: 'BD 30-50',
    highlight: 'Classic Italian elegance with an extensive wine cellar.',
    mustTry: 'Risotto, Ossobuco, Veal Milanese',
    rating: 4.6,
    dressCode: 'Smart Casual',
    chef: 'Italian Culinary Team',
  },
  { 
    name: 'Marrakech', 
    location: 'The Ritz-Carlton, Seef',
    cuisine: 'Moroccan Fine Dining',
    priceRange: 'BD 35-60',
    highlight: 'Authentic Moroccan ambiance with traditional tagines and couscous.',
    mustTry: 'Lamb Tagine, Royal Couscous, Moroccan Pastries',
    rating: 4.5,
    dressCode: 'Smart Casual',
    chef: 'Moroccan Culinary Team',
  },
  { 
    name: 'Masso', 
    location: 'Adliya',
    cuisine: 'Contemporary Italian',
    priceRange: 'BD 25-45',
    highlight: 'Stylish standalone restaurant, best Italian in Adliya.',
    mustTry: 'Truffle Pasta, Ossobuco, Wine Selection',
    rating: 4.7,
    dressCode: 'Smart Casual',
    chef: 'European Team',
  },
  { 
    name: 'Nirvana', 
    location: 'Grand Hyatt Bahrain',
    cuisine: 'North Indian Fine Dining',
    priceRange: 'BD 25-50',
    highlight: 'Award-winning Indian cuisine in elegant surroundings.',
    mustTry: 'Tandoori Selection, Biryani, Butter Chicken',
    rating: 4.5,
    dressCode: 'Smart Casual',
    chef: 'Indian Culinary Team',
  },
];

export default function BestFineDiningPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-amber-950/20 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Best Fine Dining', url: 'https://www.bahrainnights.com/guides/best-fine-dining-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-rose-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-4">✨ Luxury Dining Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best <span className="bg-gradient-to-r from-amber-400 to-rose-500 bg-clip-text text-transparent">Fine Dining</span> in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From Michelin-starred chef creations to luxury hotel restaurants with panoramic views — 
              discover Bahrain&apos;s most exceptional dining experiences for special occasions.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
          <p>
            Bahrain punches well above its weight in the fine dining scene. The Kingdom attracts 
            world-class chefs, with restaurants from culinary legends like Wolfgang Puck and 
            Michelin-starred Vineet Bhatia choosing Bahrain as one of their exclusive global locations.
          </p>
          <p>
            The best fine dining experiences cluster around the luxury hotel corridor — the Four Seasons 
            in Bahrain Bay, Gulf Hotel in Adliya, and The Ritz-Carlton in Seef. Each offers multiple 
            upscale restaurants covering cuisines from American steakhouse to authentic Moroccan.
          </p>
          <p>
            Whether you&apos;re celebrating an anniversary, impressing business clients, or simply treating 
            yourself to an extraordinary meal, this guide covers every top-tier dining option in the Kingdom.
          </p>
        </div>
      </section>

      {/* The Big Two */}
      <section className="py-12 px-4 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">The Pinnacle: Bahrain&apos;s Two Best</h2>
          <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
            These two restaurants consistently rank as Bahrain&apos;s finest — both featuring internationally 
            acclaimed chefs and exceptional cuisine.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {restaurants.slice(0, 2).map((restaurant) => (
              <div 
                key={restaurant.name}
                className="bg-gradient-to-br from-amber-500/10 to-rose-500/10 border border-amber-500/30 rounded-2xl p-8"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-6 h-6 text-amber-400" />
                  <span className="text-amber-400 font-bold">Top Rated</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{restaurant.name}</h3>
                <p className="text-gray-400 text-sm flex items-center gap-1 mb-4">
                  <MapPin className="w-4 h-4" /> {restaurant.location}
                </p>
                <p className="text-gray-300 mb-4">{restaurant.highlight}</p>
                <div className="space-y-2 text-sm">
                  <p className="text-amber-400">
                    <strong>Chef:</strong> {restaurant.chef}
                  </p>
                  <p className="text-gray-400">
                    <strong>Cuisine:</strong> {restaurant.cuisine}
                  </p>
                  <p className="text-gray-400">
                    <strong>Price Range:</strong> {restaurant.priceRange}
                  </p>
                  <p className="text-gray-400">
                    <strong>Must Try:</strong> {restaurant.mustTry}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-1 bg-amber-500/20 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="text-amber-400 font-medium">{restaurant.rating}</span>
                  </div>
                  <span className="text-gray-500">|</span>
                  <span className="text-gray-400 text-sm">{restaurant.dressCode}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Restaurant Cards */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">All Fine Dining Restaurants</h2>
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
                  <span className="flex items-center gap-1 text-amber-400">
                    <DollarSign className="w-4 h-4" /> {restaurant.priceRange}
                  </span>
                  <span className="flex items-center gap-1 text-gray-400">
                    <Wine className="w-4 h-4" /> {restaurant.dressCode}
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

      {/* By Hotel */}
      <section className="py-12 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Fine Dining by Hotel</h2>
          
          <div className="space-y-8">
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-xl font-bold text-amber-400 mb-3">🏨 Four Seasons Bahrain Bay</h3>
              <p className="text-gray-300 mb-4">
                The newest luxury hotel in Bahrain, offering stunning waterfront views and three exceptional 
                restaurants. Modern architecture meets world-class dining.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li><strong className="text-white">CUT by Wolfgang Puck</strong> — Modern American Steakhouse</li>
                <li><strong className="text-white">Re Napoli</strong> — Authentic Italian</li>
                <li><strong className="text-white">Takumi</strong> — Japanese Omakase & Teppanyaki</li>
              </ul>
            </div>
            
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-xl font-bold text-amber-400 mb-3">🏨 Gulf Hotel Adliya</h3>
              <p className="text-gray-300 mb-4">
                Bahrain&apos;s iconic luxury hotel with a legendary collection of restaurants. 
                Home to multiple award-winners and the Kingdom&apos;s first Michelin-starred chef.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li><strong className="text-white">Rasoi by Vineet</strong> — Contemporary Indian (Michelin-starred chef)</li>
                <li><strong className="text-white">La Mer</strong> — French Mediterranean</li>
                <li><strong className="text-white">BiCE</strong> — Northern Italian</li>
              </ul>
            </div>
            
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-xl font-bold text-amber-400 mb-3">🏨 The Ritz-Carlton Seef</h3>
              <p className="text-gray-300 mb-4">
                Classic luxury with impeccable service. The Ritz-Carlton brings international 
                fine dining standards to the Seef district.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li><strong className="text-white">Plums</strong> — International Fine Dining</li>
                <li><strong className="text-white">Marrakech</strong> — Moroccan Fine Dining</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Fine Dining Tips</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-amber-400 mb-2 flex items-center gap-2">
                <Clock className="w-5 h-5" /> Book Ahead
              </h3>
              <p className="text-gray-300 text-sm">
                Reservations are essential for all fine dining venues. Book 2-3 days ahead for weekday 
                dinners, 1-2 weeks ahead for weekend evenings at CUT and Rasoi. Lunch is easier.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-amber-400 mb-2 flex items-center gap-2">
                <Wine className="w-5 h-5" /> Wine Programs
              </h3>
              <p className="text-gray-300 text-sm">
                Hotels like Four Seasons and Gulf Hotel have exceptional wine cellars. Ask about wine 
                pairings for the tasting menus — they elevate the experience significantly.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-amber-400 mb-2">💡 Lunch Deals</h3>
              <p className="text-gray-300 text-sm">
                Many fine dining restaurants offer set lunch menus at 30-40% off dinner prices. 
                Perfect for experiencing places like CUT or Rasoi without the full evening cost.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-amber-400 mb-2">🎉 Special Occasions</h3>
              <p className="text-gray-300 text-sm">
                Mention birthdays, anniversaries, or celebrations when booking. Hotels often provide 
                complimentary desserts, personalized menus, or special seating arrangements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Best For */}
      <section className="py-12 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Best For...</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-amber-400 mb-2">💑 Romantic Dinner</h3>
              <p className="text-gray-300">
                <strong>CUT by Wolfgang Puck</strong> — Stunning Manama skyline views at sunset, intimate booths.
                <br /><strong>La Mer</strong> — Classic French elegance, perfect ambiance.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-amber-400 mb-2">💼 Business Dinner</h3>
              <p className="text-gray-300">
                <strong>Plums at Ritz-Carlton</strong> — Impeccable service, professional atmosphere.
                <br /><strong>BiCE</strong> — Classic, reliable, impressive without being flashy.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-amber-400 mb-2">🎂 Special Celebration</h3>
              <p className="text-gray-300">
                <strong>Rasoi by Vineet</strong> — Unique experience, memorable dishes, Michelin-starred chef.
                <br /><strong>CUT</strong> — Wolfgang Puck prestige, celebration-worthy setting.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-amber-400 mb-2">🍖 Best Steak</h3>
              <p className="text-gray-300">
                <strong>CUT by Wolfgang Puck</strong> — Hands down the best steakhouse in Bahrain. 
                Premium USDA and Wagyu cuts prepared to perfection.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-amber-400 mb-2">🌅 Best View</h3>
              <p className="text-gray-300">
                <strong>CUT at Four Seasons</strong> — 180° panoramic views of Manama.
                <br /><strong>Re Napoli</strong> — Waterfront terrace seating.
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
      <section className="py-16 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More Dining</h2>
          <p className="text-gray-400 mb-8">Discover more restaurant guides by cuisine and occasion</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guides/best-italian-restaurants-bahrain" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all">
              Italian Restaurants →
            </Link>
            <Link href="/guides/best-seafood-bahrain" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all">
              Seafood Restaurants →
            </Link>
            <Link href="/places" className="px-6 py-3 bg-gradient-to-r from-amber-500 to-rose-500 rounded-full font-medium hover:shadow-lg hover:shadow-amber-500/25 transition-all">
              Browse All Restaurants
            </Link>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-lg font-bold mb-4">Cuisine Guides</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { title: 'Italian', href: '/guides/best-italian-restaurants-bahrain' },
              { title: 'Indian', href: '/guides/best-indian-restaurants-bahrain' },
              { title: 'Japanese', href: '/guides/best-japanese-restaurants-bahrain' },
              { title: 'Arabic', href: '/guides/best-arabic-restaurants-bahrain' },
              { title: 'Seafood', href: '/guides/best-seafood-bahrain' },
              { title: 'Thai', href: '/guides/best-thai-restaurants-bahrain' },
              { title: 'Chinese', href: '/guides/best-chinese-restaurants-bahrain' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="px-3 py-1.5 bg-white/5 hover:bg-amber-500/20 rounded text-sm transition-colors">
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <InternalLinks 
        title="Explore Dining in Bahrain" 
        links={[
          { title: 'Best Restaurants in Bahrain', href: '/guides/restaurants' },
          { title: 'Romantic Date Night', href: '/guides/romantic' },
          { title: 'Adliya Restaurants & Bars', href: '/guides/adliya-restaurants-bars' },
          { title: 'Best Brunches', href: '/guides/brunches' },
          { title: 'Rooftop Bars', href: '/guides/rooftop-bars-bahrain' },
        ]} 
      />
    </div>
  );
}
