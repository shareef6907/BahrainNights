import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import InternalLinks from '@/components/SEO/InternalLinks';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, DollarSign, Utensils, Flame } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Korean Restaurants in Bahrain 2026 | BBQ, Fried Chicken & More',
  description: 'Discover the best Korean restaurants in Bahrain. From Korean BBQ and unlimited samgyeopsal to crispy fried chicken. Complete guide with prices, locations, and must-try dishes.',
  keywords: 'best Korean restaurants Bahrain, Korean BBQ Bahrain, samgyeopsal Bahrain, Korean fried chicken Bahrain, BonChon Bahrain, Arirang Bahrain, Korean food Manama, bibimbap Bahrain',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/best-korean-restaurants-bahrain' },
  openGraph: {
    title: 'Best Korean Restaurants in Bahrain 2026',
    description: 'Your complete guide to Korean cuisine in Bahrain — from sizzling BBQ to crispy fried chicken.',
    type: 'article',
    locale: 'en_BH',
  },
};

const faqs = [
  { q: 'What is the best Korean restaurant in Bahrain?', a: 'Arirang is the oldest and most established Korean restaurant (since 1978). Seoul in Block 338 is popular for BBQ with karaoke. For fried chicken, BonChon and Koolees are top choices.' },
  { q: 'Where can I get Korean BBQ in Bahrain?', a: 'Han Kook Kwan at Grand Safir Hotel, Da Rae Jung in Adliya, Seoul in Block 338, and Arirang all offer excellent Korean BBQ experiences with tabletop grilling.' },
  { q: 'What is the cheapest Korean BBQ in Bahrain?', a: 'Yakiniku Shabu Shabu offers unlimited samgyeopsal starting from just BD 2.9 per head. Da Rae Jung has unlimited BBQ from BD 7 including sides, rice, and soup.' },
  { q: 'Is there Korean fried chicken in Bahrain?', a: 'Yes! BonChon is famous for double-fried crispy chicken. Koolees specializes in Korean fried chicken and street food. Both are must-visits for chicken lovers.' },
  { q: 'Are Korean restaurants in Bahrain halal?', a: 'Many Korean restaurants in Bahrain are halal or offer halal options. Da Rae Jung, Koolees, and Ketchup & Mayo are popular halal-friendly choices. Always confirm with the restaurant if needed.' },
];

const restaurants = [
  { 
    name: 'Arirang', 
    location: 'Exhibition Road',
    style: 'Traditional Korean',
    priceRange: 'BD 10-25',
    highlight: 'Bahrain\'s oldest Korean restaurant since 1978. A taste of home for Korean expats.',
    mustTry: 'Korean BBQ, Traditional Specialties, Japchae',
    rating: 4.6,
    vibe: 'Traditional',
    licensed: true,
  },
  { 
    name: 'Seoul', 
    location: 'Block 338, Adliya',
    style: 'BBQ & Lounge',
    priceRange: 'BD 12-28',
    highlight: 'Excellent BBQ with extensive menu. Private karaoke rooms available.',
    mustTry: 'Korean BBQ Platter, Premium Meats, Soju',
    rating: 4.7,
    vibe: 'Social',
    licensed: true,
  },
  { 
    name: 'BonChon', 
    location: 'Palace Avenue',
    style: 'Korean Fried Chicken',
    priceRange: 'BD 6-15',
    highlight: 'Famous double-fried crispy chicken. "My hometown" comfort food.',
    mustTry: 'Crispy Drumsticks, Chicken Katsu Curry, Tteokbokki',
    rating: 4.5,
    vibe: 'Casual',
    licensed: false,
  },
  { 
    name: 'Han Kook Kwan', 
    location: 'Grand Safir Hotel, Juffair',
    style: 'BBQ & Grill',
    priceRange: 'BD 12-25',
    highlight: 'A taste of home for Korean expats. Great for groups and celebrations.',
    mustTry: 'Korean BBQ, Cold Buckwheat Noodles, Sundae Gukbap',
    rating: 4.5,
    vibe: 'Social',
    licensed: true,
  },
  { 
    name: 'Da Rae Jung', 
    location: 'Block 327, Adliya',
    style: 'Unlimited BBQ',
    priceRange: 'BD 7-15',
    highlight: 'Unlimited BBQ from just BD 7! Includes sides, rice, japchae, and soup.',
    mustTry: 'Unlimited Samgyeopsal, Steamed Eggs, Kimchi',
    rating: 4.4,
    vibe: 'Value',
    licensed: true,
  },
  { 
    name: 'Koolees', 
    location: 'Juffair',
    style: 'Street Food & Fried Chicken',
    priceRange: 'BD 5-12',
    highlight: 'Korean street food specialists. Cozy spot with outdoor seating.',
    mustTry: 'Korean Fried Chicken, Tteokbokki, Dak Kang Jung, Bibimbap',
    rating: 4.4,
    vibe: 'Casual',
    licensed: false,
  },
  { 
    name: 'Itsumo', 
    location: 'Manama',
    style: 'Korean-Japanese Fusion',
    priceRange: 'BD 8-18',
    highlight: 'Fusion restaurant with unlimited Korean BBQ options.',
    mustTry: 'Unlimited Korean Chicken, Pork & Chicken Mix, Korean Appetizers',
    rating: 4.3,
    vibe: 'Casual',
    licensed: false,
  },
  { 
    name: 'Ketchup & Mayo', 
    location: 'Jidhafs & Juffair',
    style: 'Korean Street Food',
    priceRange: 'BD 3-8',
    highlight: 'First in Bahrain for Korean-style corndogs. Casual grab-and-go.',
    mustTry: 'Hot Cheetos Corndog, Potato Corndog, Ramen Corndog',
    rating: 4.3,
    vibe: 'Fast Casual',
    licensed: false,
  },
  { 
    name: 'Yakiniku Shabu Shabu', 
    location: 'Al Najma Club, Juffair',
    style: 'Budget Unlimited BBQ',
    priceRange: 'BD 2.9-8',
    highlight: 'Incredible value! Unlimited samgyeopsal from just BD 2.9 per head.',
    mustTry: 'Unlimited Beef BBQ, Unlimited Pork BBQ, Buffet Sides',
    rating: 4.2,
    vibe: 'Budget',
    licensed: false,
  },
];

export default function BestKoreanRestaurantsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-pink-950/20 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Best Korean Restaurants', url: 'https://www.bahrainnights.com/guides/best-korean-restaurants-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-red-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-pink-500/20 text-pink-400 rounded-full text-sm font-medium mb-4">🇰🇷 Cuisine Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best <span className="bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent">Korean Restaurants</span> in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From sizzling BBQ and unlimited samgyeopsal to crispy fried chicken — 
              discover Bahrain&apos;s vibrant Korean food scene fueled by K-culture.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
          <p>
            The K-wave has hit Bahrain hard. Along with K-drama, K-pop, and K-beauty, 
            Korean food has become a beloved part of the island&apos;s culinary landscape. 
            From tabletop BBQ joints where you grill your own meat to crispy fried chicken 
            spots perfect for a late-night craving, Bahrain delivers authentic Korean flavors.
          </p>
          <p>
            Whether you&apos;re a homesick Korean expat looking for a taste of home, a K-drama 
            fan wanting to try the dishes you&apos;ve seen on screen, or simply curious about 
            this delicious cuisine, Bahrain&apos;s Korean restaurants won&apos;t disappoint.
          </p>
        </div>
      </section>

      {/* Top Picks */}
      <section className="py-12 px-4 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Top Korean Restaurants</h2>
          <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
            The best Korean dining experiences in Bahrain — from BBQ to fried chicken.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.slice(0, 6).map((restaurant, index) => (
              <div 
                key={restaurant.name}
                className="bg-gradient-to-br from-pink-500/10 to-red-500/10 border border-pink-500/30 rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-pink-400 font-bold">#{index + 1}</span>
                  <div className="flex items-center gap-1 bg-pink-500/20 px-2 py-0.5 rounded-full">
                    <Star className="w-3 h-3 text-pink-400 fill-pink-400" />
                    <span className="text-pink-400 text-sm font-medium">{restaurant.rating}</span>
                  </div>
                  {restaurant.licensed && (
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded">Licensed</span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{restaurant.name}</h3>
                <p className="text-gray-400 text-sm flex items-center gap-1 mb-3">
                  <MapPin className="w-4 h-4" /> {restaurant.location}
                </p>
                <p className="text-gray-300 text-sm mb-3">{restaurant.highlight}</p>
                <div className="space-y-1 text-sm">
                  <p className="text-pink-400">
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
          <h2 className="text-3xl font-bold mb-8 text-center">All Korean Restaurants</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {restaurants.map((restaurant, index) => (
              <div 
                key={restaurant.name}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-pink-400/50 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-pink-400 text-sm font-medium">#{index + 1}</span>
                    <h3 className="text-xl font-bold text-white">{restaurant.name}</h3>
                    <p className="text-gray-400 text-sm flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {restaurant.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-pink-500/20 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 text-pink-400 fill-pink-400" />
                    <span className="text-pink-400 font-medium">{restaurant.rating}</span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-2">{restaurant.style}</p>
                <p className="text-gray-400 text-sm mb-3">{restaurant.highlight}</p>
                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="flex items-center gap-1 text-pink-400">
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

      {/* Korean Cuisine Guide */}
      <section className="py-12 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Korean Cuisine Essentials</h2>
          
          <div className="space-y-8">
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-xl font-bold text-pink-400 mb-3">🔥 Korean BBQ</h3>
              <p className="text-gray-300 mb-3">
                The quintessential Korean dining experience — grilling meat at your table.
              </p>
              <ul className="space-y-1 text-gray-400">
                <li><strong className="text-white">Samgyeopsal</strong> — Thick pork belly slices, the most popular cut</li>
                <li><strong className="text-white">Bulgogi</strong> — Marinated beef, sweet and savory</li>
                <li><strong className="text-white">Galbi</strong> — Marinated beef short ribs</li>
                <li><strong className="text-white">Chadol</strong> — Thin beef brisket slices</li>
              </ul>
            </div>
            
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-xl font-bold text-pink-400 mb-3">🍗 Fried Chicken</h3>
              <p className="text-gray-300 mb-3">
                Korean fried chicken is double-fried for extra crispiness. A K-drama staple!
              </p>
              <ul className="space-y-1 text-gray-400">
                <li><strong className="text-white">Yangnyeom</strong> — Sweet and spicy glazed chicken</li>
                <li><strong className="text-white">Dakgangjeong</strong> — Crispy sweet chicken bites</li>
                <li><strong className="text-white">Chimaek</strong> — Chicken + beer (맥주), the perfect combo</li>
              </ul>
            </div>
            
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-xl font-bold text-pink-400 mb-3">🍜 Noodles & Rice</h3>
              <p className="text-gray-300 mb-3">
                Comfort food that hits different.
              </p>
              <ul className="space-y-1 text-gray-400">
                <li><strong className="text-white">Bibimbap</strong> — Mixed rice with vegetables, meat, and egg</li>
                <li><strong className="text-white">Japchae</strong> — Sweet potato glass noodles with vegetables</li>
                <li><strong className="text-white">Naengmyeon</strong> — Cold buckwheat noodles, refreshing in summer</li>
                <li><strong className="text-white">Ramyeon</strong> — Korean instant noodles, elevated</li>
              </ul>
            </div>
            
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-xl font-bold text-pink-400 mb-3">🥢 Sides (Banchan)</h3>
              <p className="text-gray-300 mb-3">
                Free refillable side dishes that come with every Korean meal.
              </p>
              <ul className="space-y-1 text-gray-400">
                <li><strong className="text-white">Kimchi</strong> — Fermented spicy cabbage, the icon</li>
                <li><strong className="text-white">Tteokbokki</strong> — Spicy rice cakes in red sauce</li>
                <li><strong className="text-white">Gyeran-jjim</strong> — Steamed egg, fluffy and comforting</li>
                <li><strong className="text-white">Pickled radish</strong> — Crunchy, refreshing palate cleanser</li>
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
              <h3 className="text-lg font-bold text-pink-400 mb-2">🔥 Best BBQ</h3>
              <p className="text-gray-300 text-sm">
                <strong>Arirang</strong> — The OG since 1978.
                <br /><strong>Seoul</strong> — Extensive menu, great atmosphere.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-pink-400 mb-2">🍗 Best Fried Chicken</h3>
              <p className="text-gray-300 text-sm">
                <strong>BonChon</strong> — Famous double-fried crispy.
                <br /><strong>Koolees</strong> — Street food specialists.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-pink-400 mb-2">💰 Best Value</h3>
              <p className="text-gray-300 text-sm">
                <strong>Yakiniku Shabu Shabu</strong> — Unlimited BBQ from BD 2.9!
                <br /><strong>Da Rae Jung</strong> — Unlimited from BD 7 with sides.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-pink-400 mb-2">🎤 With Karaoke</h3>
              <p className="text-gray-300 text-sm">
                <strong>Seoul</strong> — Private karaoke rooms.
                <br /><strong>Han Kook Kwan</strong> — BBQ + singing = perfect night.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-pink-400 mb-2">🌭 Street Food</h3>
              <p className="text-gray-300 text-sm">
                <strong>Ketchup & Mayo</strong> — Korean corndogs!
                <br /><strong>Koolees</strong> — Tteokbokki, fried chicken.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-pink-400 mb-2">🍺 Licensed</h3>
              <p className="text-gray-300 text-sm">
                <strong>Arirang, Seoul, Han Kook Kwan, Da Rae Jung</strong>
                <br />Soju and beer available for chimaek experience.
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
            <Link href="/guides/best-japanese-restaurants-bahrain" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all">
              Japanese Restaurants →
            </Link>
            <Link href="/guides/best-thai-restaurants-bahrain" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all">
              Thai Restaurants →
            </Link>
            <Link href="/places" className="px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-full font-medium hover:shadow-lg hover:shadow-pink-500/25 transition-all">
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
              { title: 'Japanese', href: '/guides/best-japanese-restaurants-bahrain' },
              { title: 'Thai', href: '/guides/best-thai-restaurants-bahrain' },
              { title: 'Chinese', href: '/guides/best-chinese-restaurants-bahrain' },
              { title: 'Indian', href: '/guides/best-indian-restaurants-bahrain' },
              { title: 'Italian', href: '/guides/best-italian-restaurants-bahrain' },
              { title: 'Fine Dining', href: '/guides/best-fine-dining-bahrain' },
              { title: 'Steakhouses', href: '/guides/best-steakhouses-bahrain' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="px-3 py-1.5 bg-white/5 hover:bg-pink-500/20 rounded text-sm transition-colors">
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <InternalLinks 
        title="Explore Dining in Bahrain" 
        links={[
          { title: 'Best Japanese Restaurants', href: '/guides/best-japanese-restaurants-bahrain' },
          { title: 'Best Restaurants in Bahrain', href: '/guides/restaurants' },
          { title: 'Juffair Restaurants', href: '/guides/juffair-restaurants-bars' },
          { title: 'Block 338 Nightlife', href: '/guides/adliya-restaurants-bars' },
          { title: 'Best Fried Chicken', href: '/guides/best-fried-chicken-bahrain' },
        ]} 
      />
    </div>
  );
}
