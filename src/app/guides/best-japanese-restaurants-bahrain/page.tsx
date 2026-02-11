import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, DollarSign, Utensils } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Japanese Restaurants in Bahrain 2026 | Sushi, Ramen & Izakaya',
  description: 'Discover the best Japanese restaurants in Bahrain. From premium sushi and sashimi to authentic ramen, teppanyaki, and izakaya dining. Complete guide with prices and reviews.',
  keywords: 'best Japanese restaurants Bahrain, sushi Bahrain, ramen Bahrain, Japanese food Bahrain, teppanyaki Bahrain, izakaya Bahrain, Japanese restaurant Manama',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/best-japanese-restaurants-bahrain' },
  openGraph: {
    title: 'Best Japanese Restaurants in Bahrain 2026',
    description: 'Your complete guide to the best Japanese cuisine in Bahrain — from sushi bars to ramen shops.',
    type: 'article',
    locale: 'en_BH',
  },
};

const faqs = [
  { q: 'What is the best Japanese restaurant in Bahrain?', a: 'Bushido at The Ritz-Carlton and Maki Bahrain are considered the top Japanese restaurants for sushi. For ramen, Marukame Udon and Ippudo are excellent. Kei at Four Seasons offers high-end omakase.' },
  { q: 'Where can I find authentic ramen in Bahrain?', a: 'Marukame Udon in City Centre Bahrain serves fresh udon. For ramen, try Ippudo (Seef) or Wagamama. True Japanese-style ramen shops are limited but growing in Bahrain.' },
  { q: 'How much does sushi cost in Bahrain?', a: 'Casual sushi like Yo! Sushi costs BD 4-10. Mid-range spots like Maki run BD 12-25. Premium omakase at Bushido or Kei starts at BD 35-60+ per person.' },
  { q: 'Are there all-you-can-eat sushi restaurants in Bahrain?', a: 'Yes, several Japanese restaurants offer sushi buffets. Kobe Japanese Restaurant and some hotel restaurants offer unlimited sushi options, typically BD 15-25 per person.' },
  { q: 'Which Japanese restaurants in Bahrain serve alcohol?', a: 'Hotel restaurants like Bushido, Kei, and restaurant-bars like Zuma serve alcohol. Standalone Japanese restaurants in malls typically do not.' },
];

const restaurants = [
  { 
    name: 'Bushido', 
    location: 'The Ritz-Carlton, Seef',
    cuisine: 'Japanese Fine Dining & Sushi Bar',
    priceRange: 'BD 30-60',
    highlight: 'Premium sushi with stunning views, sake bar',
    mustTry: 'Omakase Menu, Black Cod Miso, Wagyu Tataki',
    rating: 4.8,
  },
  { 
    name: 'Kei', 
    location: 'Four Seasons, Bahrain Bay',
    cuisine: 'Contemporary Japanese',
    priceRange: 'BD 35-70',
    highlight: 'Elegant omakase experience, freshest fish',
    mustTry: 'Chef\'s Omakase, Toro, Uni',
    rating: 4.9,
  },
  { 
    name: 'Maki Bahrain', 
    location: 'The Avenues',
    cuisine: 'Modern Japanese Sushi',
    priceRange: 'BD 12-25',
    highlight: 'Creative rolls, trendy atmosphere',
    mustTry: 'Dragon Roll, Volcano Roll, Bento Box',
    rating: 4.5,
  },
  { 
    name: 'Zuma', 
    location: 'Four Seasons, Bahrain Bay',
    cuisine: 'Izakaya Style',
    priceRange: 'BD 30-55',
    highlight: 'Global izakaya chain, vibrant nightlife scene',
    mustTry: 'Robata Grill, Miso Black Cod, Wagyu Gyoza',
    rating: 4.7,
  },
  { 
    name: 'Ippudo', 
    location: 'Seef Mall',
    cuisine: 'Ramen & Japanese',
    priceRange: 'BD 6-12',
    highlight: 'Famous Tokyo ramen chain',
    mustTry: 'Shiromaru Classic, Karaka-men, Gyoza',
    rating: 4.4,
  },
  { 
    name: 'Marukame Udon', 
    location: 'City Centre Bahrain',
    cuisine: 'Udon Noodles',
    priceRange: 'BD 3-7',
    highlight: 'Fresh udon made in front of you',
    mustTry: 'Kake Udon, Tempura Udon, Onigiri',
    rating: 4.3,
  },
  { 
    name: 'Yo! Sushi', 
    location: 'Multiple Locations',
    cuisine: 'Conveyor Belt Sushi',
    priceRange: 'BD 5-12',
    highlight: 'Fun conveyor belt concept, kid-friendly',
    mustTry: 'Rainbow Roll, Katsu Curry, Edamame',
    rating: 4.1,
  },
  { 
    name: 'Wagamama', 
    location: 'City Centre Bahrain',
    cuisine: 'Pan-Asian & Japanese',
    priceRange: 'BD 5-12',
    highlight: 'Casual dining, great for groups',
    mustTry: 'Chicken Ramen, Pad Thai, Gyoza',
    rating: 4.2,
  },
];

export default function BestJapaneseRestaurantsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-red-950/20 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Best Japanese Restaurants', url: 'https://www.bahrainnights.com/guides/best-japanese-restaurants-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium mb-4">🍣 Cuisine Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best <span className="bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">Japanese Restaurants</span> in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From exquisite omakase sushi experiences to steaming bowls of ramen and sizzling 
              teppanyaki — explore Bahrain&apos;s finest Japanese dining destinations.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
          <p>
            Japanese cuisine has captured the hearts of Bahrain diners, and the Kingdom now boasts 
            an impressive array of Japanese restaurants. From high-end hotel restaurants flying in 
            fish directly from Tokyo&apos;s Tsukiji market to casual ramen shops and conveyor belt sushi bars, 
            there&apos;s something for every Japanese food lover.
          </p>
          <p>
            The Japanese dining scene in Bahrain spans the full spectrum — from quick BD 5 udon lunches 
            to lavish BD 100+ omakase dinners. Whether you&apos;re craving fresh sashimi, authentic ramen, 
            or the theatrical experience of teppanyaki, this guide will help you find the perfect spot.
          </p>
        </div>
      </section>

      {/* Restaurant Cards */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Top Japanese Restaurants</h2>
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

      {/* Dining Styles */}
      <section className="py-12 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Japanese Dining Styles in Bahrain</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-red-400 mb-3">🍣 Sushi & Sashimi</h3>
              <p className="text-gray-300 mb-2">
                The crown jewel of Japanese cuisine. Bahrain&apos;s top sushi restaurants source premium fish, 
                with some importing directly from Japan. For the ultimate experience, try omakase — a 
                chef&apos;s choice tasting menu.
              </p>
              <p className="text-gray-400 text-sm">
                <strong>Best for:</strong> Bushido, Kei, Maki Bahrain
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-red-400 mb-3">🍜 Ramen & Udon</h3>
              <p className="text-gray-300 mb-2">
                Soul-warming noodle soups perfect for a satisfying meal. Rich tonkotsu (pork bone) broth, 
                spicy miso, or light shoyu — each style offers a unique experience. Udon features thicker, 
                chewier noodles.
              </p>
              <p className="text-gray-400 text-sm">
                <strong>Best for:</strong> Ippudo, Marukame Udon, Wagamama
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-red-400 mb-3">🔥 Teppanyaki & Robata</h3>
              <p className="text-gray-300 mb-2">
                Theatrical cooking on a hot iron griddle (teppanyaki) or over charcoal (robata). 
                Watch skilled chefs prepare wagyu beef, seafood, and vegetables right at your table.
              </p>
              <p className="text-gray-400 text-sm">
                <strong>Best for:</strong> Zuma (robata), Four Seasons teppanyaki
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-red-400 mb-3">🍶 Izakaya</h3>
              <p className="text-gray-300 mb-2">
                Japanese-style gastropubs serving small plates meant for sharing alongside drinks. 
                Think Japanese tapas — gyoza, yakitori, edamame, and more. Perfect for groups.
              </p>
              <p className="text-gray-400 text-sm">
                <strong>Best for:</strong> Zuma, various hotel Japanese restaurants
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Tips for Japanese Dining in Bahrain</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-red-400 mb-2">🎌 For Omakase</h3>
              <p className="text-gray-300 text-sm">
                Book at least a week ahead for premium omakase experiences. Sit at the sushi bar 
                for the best experience. Let the chef know of any allergies in advance.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-red-400 mb-2">🍱 Lunch Specials</h3>
              <p className="text-gray-300 text-sm">
                Many Japanese restaurants offer lunch bento boxes and set menus at significant 
                discounts compared to dinner prices. Great value at places like Maki and Ippudo.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-red-400 mb-2">🥢 Sushi Etiquette</h3>
              <p className="text-gray-300 text-sm">
                Dip sushi fish-side down into soy sauce, not rice-side. Eat nigiri in one bite if possible. 
                Use ginger as a palate cleanser between pieces, not as a topping.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-red-400 mb-2">🍵 Sake Pairing</h3>
              <p className="text-gray-300 text-sm">
                High-end spots like Bushido and Kei have extensive sake menus. Ask the sommelier 
                for pairing recommendations — sake can elevate your sushi experience.
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
            <Link href="/guides/best-italian-restaurants-bahrain" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all">
              Italian Restaurants →
            </Link>
            <Link href="/places" className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full font-medium hover:shadow-lg hover:shadow-red-500/25 transition-all">
              Browse All Restaurants
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
