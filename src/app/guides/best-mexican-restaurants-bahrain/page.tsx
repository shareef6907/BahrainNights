import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import InternalLinks from '@/components/SEO/InternalLinks';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, DollarSign, Utensils, Flame } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Mexican Restaurants in Bahrain 2026 | Tacos, Burritos & Margaritas',
  description: 'Discover the best Mexican restaurants in Bahrain. From Cantina Kahlo fine dining to authentic taquerias. Complete guide to tacos, burritos, and margaritas with prices and locations.',
  keywords: 'best Mexican restaurants Bahrain, tacos Bahrain, burritos Bahrain, Mexican food Manama, Cantina Kahlo Bahrain, Tex-Mex Bahrain, margaritas Bahrain, fajitas Bahrain',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/best-mexican-restaurants-bahrain' },
  openGraph: {
    title: 'Best Mexican Restaurants in Bahrain 2026',
    description: 'Your complete guide to Mexican cuisine in Bahrain — from fine dining to street-style tacos.',
    type: 'article',
    locale: 'en_BH',
  },
};

const faqs = [
  { q: 'What is the best Mexican restaurant in Bahrain?', a: 'Cantina Kahlo at The Ritz-Carlton is award-winning with mariachi bands and vibrant ambiance. Casa Mexicana in Adliya has been serving authentic Mexican since 1993 with a real Mexican chef. Margarita Mexicana at Gulf Hotel offers fine dining.' },
  { q: 'Where can I get the best tacos in Bahrain?', a: 'Taco Muchachos is famous for Birria tacos (Bahrain\'s first Birria taco truck). ElChapo Lounge serves creative tacos including Birria. Cantina Kahlo has a rotating "Taco of the Week" and Calexico offers California-style tacos.' },
  { q: 'Are there Tex-Mex restaurants in Bahrain?', a: 'Yes! Burrito Loco specializes in customizable burrito bowls. Franks a Lot in Juffair mixes American and Mexican favorites. Tacos and Burritos offers casual Tex-Mex fusion perfect for delivery.' },
  { q: 'Which Mexican restaurants in Bahrain have margaritas?', a: 'Cantina Kahlo at Ritz-Carlton, Margarita Mexicana at Gulf Hotel, Casa Mexicana, and Señor Paco\'s all serve signature margaritas. These licensed venues offer the full Mexican dining experience with cocktails.' },
  { q: 'Where can I get Mexican food delivery in Bahrain?', a: 'Burrito Loco and Tacos and Burritos are popular delivery options. Taco Muchachos started as a food truck and offers delivery. Most restaurants in Adliya and Juffair also deliver through apps.' },
];

const restaurants = [
  { 
    name: 'Cantina Kahlo', 
    location: 'The Ritz-Carlton, Seef',
    style: 'Fine Dining Mexican',
    priceRange: 'BD 25-50',
    highlight: 'Award-winning with mariachi band, festive vibes, and legendary brunches.',
    mustTry: 'Taco of the Week, Churros, Ceviches, Signature Margaritas',
    rating: 4.8,
    vibe: 'Festive',
    licensed: true,
  },
  { 
    name: 'Casa Mexicana', 
    location: 'Adliya',
    style: 'Authentic Mexican',
    priceRange: 'BD 12-25',
    highlight: 'Operating since 1993 with a real Mexican chef. Live music and authentic flavors.',
    mustTry: 'Enchilada De Pollo, Nachos, Chicken Fajita',
    rating: 4.6,
    vibe: 'Authentic',
    licensed: true,
  },
  { 
    name: 'Margarita Mexicana', 
    location: 'Gulf Hotel, Adliya',
    style: 'Fine Dining',
    priceRange: 'BD 20-40',
    highlight: 'One of Bahrain\'s first fine dining Mexican spots. Ingredients from Mexico.',
    mustTry: 'Costillas de Res, Taco Platter, Hand-Shaken Margaritas',
    rating: 4.7,
    vibe: 'Upscale',
    licensed: true,
  },
  { 
    name: 'Señor Paco\'s', 
    location: 'Adliya',
    style: 'Traditional Mexican',
    priceRange: 'BD 12-25',
    highlight: 'Long-standing favorite with vibrant interiors, live music, and classic dishes.',
    mustTry: 'Fajitas, Enchiladas, Fresh Guacamole',
    rating: 4.5,
    vibe: 'Vibrant',
    licensed: true,
  },
  { 
    name: 'Calexico', 
    location: 'Block 338, Adliya',
    style: 'California-Mexican Fusion',
    priceRange: 'BD 10-22',
    highlight: 'California meets Mexico. Upbeat spot for casual bites and after-dark cocktails.',
    mustTry: 'Pollo Asado Tacos, Sheikhy Pedro Cocktail',
    rating: 4.4,
    vibe: 'Trendy',
    licensed: true,
  },
  { 
    name: 'ElChapo Lounge & Restaurant', 
    location: 'Block 338, Adliya',
    style: 'Modern Mexican Lounge',
    priceRange: 'BD 12-28',
    highlight: 'Creative takes on classics. Daily happy hours and buzzing energy.',
    mustTry: 'Birria Tacos, Soft Shell Tacos, Beef Empanadas',
    rating: 4.4,
    vibe: 'Lounge',
    licensed: true,
  },
  { 
    name: 'Taco Muchachos', 
    location: 'Juffair & Jerdab (Isa Town)',
    style: 'Street Food',
    priceRange: 'BD 4-12',
    highlight: 'Bahrain\'s first Birria taco truck! Cult following for authentic street tacos.',
    mustTry: 'Birria Tacos, Crispy Chicken Quesadilla, Deluxe Beef Nachos',
    rating: 4.5,
    vibe: 'Street Food',
    licensed: false,
  },
  { 
    name: 'LLAMA Lounge & Restaurant', 
    location: 'District 1, Janabiyah',
    style: 'Latin Fusion',
    priceRange: 'BD 15-30',
    highlight: 'Lively Latin experience with live shows, music, and bold flavors.',
    mustTry: 'Llama Chops, Classic Ceviche, Aji Chicken',
    rating: 4.4,
    vibe: 'Entertainment',
    licensed: true,
  },
  { 
    name: 'Burrito Loco', 
    location: 'Delivery Only',
    style: 'Tex-Mex Delivery',
    priceRange: 'BD 4-10',
    highlight: 'Fresh, customizable burrito bowls. Perfect for delivery and quick Tex-Mex.',
    mustTry: 'Rice Bowls, Classic Burritos, Loaded Nachos',
    rating: 4.3,
    vibe: 'Delivery',
    licensed: false,
  },
  { 
    name: 'Franks a Lot', 
    location: 'Mannai Plaza, Juffair',
    style: 'Tex-Mex Casual',
    priceRange: 'BD 5-12',
    highlight: 'American favorites meet Mexican staples. Fun, filling, and fast.',
    mustTry: 'Tex-Mex Rice Bowl, California Burrito, Taco Salad',
    rating: 4.2,
    vibe: 'Casual',
    licensed: false,
  },
  { 
    name: 'Tacos and Burritos', 
    location: 'Delivery & Multiple Locations',
    style: 'Tex-Mex Fusion',
    priceRange: 'BD 4-10',
    highlight: 'Casual Tex-Mex for every mood. Great for late-night cravings.',
    mustTry: 'Mexican Chicken Salad, Chilli Cheese Fries, Shrimp Tacos',
    rating: 4.2,
    vibe: 'Casual',
    licensed: false,
  },
  { 
    name: 'El Camino', 
    location: 'Galali, Muharraq',
    style: 'Street Style',
    priceRange: 'BD 3-8',
    highlight: 'Family-run with Mexican-style hot dogs and street food vibes.',
    mustTry: 'Mexican Hot Dogs, Loaded Nacho Trays',
    rating: 4.1,
    vibe: 'Street Food',
    licensed: false,
  },
];

export default function BestMexicanRestaurantsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-orange-950/20 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Best Mexican Restaurants', url: 'https://www.bahrainnights.com/guides/best-mexican-restaurants-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-white/5 to-red-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm font-medium mb-4">🌮 Cuisine Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best <span className="bg-gradient-to-r from-green-400 via-white to-red-500 bg-clip-text text-transparent">Mexican Restaurants</span> in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From award-winning Cantina Kahlo to authentic taquerias — discover Bahrain&apos;s 
              vibrant Mexican food scene with tacos, burritos, and margaritas.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
          <p>
            Mexican food in Bahrain comes with plenty of personality and punch. From sizzling 
            fajitas and oozing quesadillas to fresh pico de gallo and hand-shaken margaritas, 
            the island&apos;s Latin food scene is only getting hotter.
          </p>
          <p>
            Whether you&apos;re after a family-run street-style taqueria, an award-winning fine 
            dining experience with mariachi bands, or just a quick burrito bowl delivery, 
            Bahrain has you covered. Some places even serve strawberry cheesecake tacos — 
            don&apos;t knock it till you try it!
          </p>
        </div>
      </section>

      {/* Top Picks */}
      <section className="py-12 px-4 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Top Mexican Restaurants</h2>
          <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
            The best Mexican dining experiences in Bahrain — from fine dining to street tacos.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.slice(0, 6).map((restaurant, index) => (
              <div 
                key={restaurant.name}
                className="bg-gradient-to-br from-green-500/10 via-white/5 to-red-500/10 border border-orange-500/30 rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-orange-400 font-bold">#{index + 1}</span>
                  <div className="flex items-center gap-1 bg-orange-500/20 px-2 py-0.5 rounded-full">
                    <Star className="w-3 h-3 text-orange-400 fill-orange-400" />
                    <span className="text-orange-400 text-sm font-medium">{restaurant.rating}</span>
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
                  <p className="text-orange-400">
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
          <h2 className="text-3xl font-bold mb-8 text-center">All Mexican Restaurants</h2>
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
                <p className="text-gray-300 text-sm mb-2">{restaurant.style}</p>
                <p className="text-gray-400 text-sm mb-3">{restaurant.highlight}</p>
                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="flex items-center gap-1 text-orange-400">
                    <DollarSign className="w-4 h-4" /> {restaurant.priceRange}
                  </span>
                  <span className="flex items-center gap-1 text-red-400">
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

      {/* Mexican Cuisine Guide */}
      <section className="py-12 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Mexican Cuisine Essentials</h2>
          
          <div className="space-y-8">
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-xl font-bold text-orange-400 mb-3">🌮 Tacos</h3>
              <p className="text-gray-300 mb-3">
                The iconic Mexican dish — soft or crispy tortillas filled with endless possibilities.
              </p>
              <ul className="space-y-1 text-gray-400">
                <li><strong className="text-white">Birria Tacos</strong> — Slow-cooked beef in consommé, dipped and grilled</li>
                <li><strong className="text-white">Carnitas</strong> — Slow-cooked pulled pork, crispy edges</li>
                <li><strong className="text-white">Al Pastor</strong> — Marinated pork with pineapple</li>
                <li><strong className="text-white">Fish Tacos</strong> — Battered fish with cabbage and crema</li>
              </ul>
            </div>
            
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-xl font-bold text-orange-400 mb-3">🌯 Burritos & More</h3>
              <p className="text-gray-300 mb-3">
                Wrapped, loaded, and satisfying.
              </p>
              <ul className="space-y-1 text-gray-400">
                <li><strong className="text-white">Burrito</strong> — Large flour tortilla stuffed with everything</li>
                <li><strong className="text-white">Burrito Bowl</strong> — All the fillings, no tortilla</li>
                <li><strong className="text-white">Quesadilla</strong> — Grilled tortilla with melted cheese</li>
                <li><strong className="text-white">Enchiladas</strong> — Rolled tortillas in chili sauce</li>
              </ul>
            </div>
            
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-xl font-bold text-orange-400 mb-3">🥑 Starters & Sides</h3>
              <p className="text-gray-300 mb-3">
                The supporting cast that often steals the show.
              </p>
              <ul className="space-y-1 text-gray-400">
                <li><strong className="text-white">Guacamole</strong> — Fresh avocado dip, made tableside at best spots</li>
                <li><strong className="text-white">Nachos</strong> — Loaded tortilla chips with all the toppings</li>
                <li><strong className="text-white">Ceviche</strong> — Fresh fish "cooked" in citrus</li>
                <li><strong className="text-white">Elote</strong> — Mexican street corn with mayo and cheese</li>
              </ul>
            </div>
            
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-xl font-bold text-orange-400 mb-3">🍹 Drinks</h3>
              <p className="text-gray-300 mb-3">
                No Mexican meal is complete without the right beverage.
              </p>
              <ul className="space-y-1 text-gray-400">
                <li><strong className="text-white">Margarita</strong> — Tequila, lime, triple sec (frozen or rocks)</li>
                <li><strong className="text-white">Horchata</strong> — Sweet rice milk with cinnamon</li>
                <li><strong className="text-white">Agua Fresca</strong> — Fresh fruit water (tamarind, hibiscus)</li>
                <li><strong className="text-white">Michelada</strong> — Beer with lime, spices, and chili</li>
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
              <h3 className="text-lg font-bold text-orange-400 mb-2">🎉 Celebrations</h3>
              <p className="text-gray-300 text-sm">
                <strong>Cantina Kahlo</strong> — Mariachi band, festive brunches.
                <br /><strong>LLAMA Lounge</strong> — Live shows and entertainment.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-orange-400 mb-2">🌮 Best Tacos</h3>
              <p className="text-gray-300 text-sm">
                <strong>Taco Muchachos</strong> — Birria tacos with cult following.
                <br /><strong>ElChapo Lounge</strong> — Creative taco variations.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-orange-400 mb-2">🍹 Margaritas</h3>
              <p className="text-gray-300 text-sm">
                <strong>Margarita Mexicana</strong> — Hand-shaken, fine dining.
                <br /><strong>Cantina Kahlo</strong> — Signature varieties.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-orange-400 mb-2">🚗 Delivery</h3>
              <p className="text-gray-300 text-sm">
                <strong>Burrito Loco</strong> — Customizable bowls.
                <br /><strong>Tacos and Burritos</strong> — Late-night cravings.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-orange-400 mb-2">💰 Budget</h3>
              <p className="text-gray-300 text-sm">
                <strong>El Camino</strong> — Street-style hot dogs from BD 3.
                <br /><strong>Taco Muchachos</strong> — Food truck prices.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-orange-400 mb-2">🎸 Live Music</h3>
              <p className="text-gray-300 text-sm">
                <strong>Casa Mexicana</strong> — Authentic vibes since 1993.
                <br /><strong>Señor Paco&apos;s</strong> — Vibrant interiors, music.
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
            <Link href="/guides/best-steakhouses-bahrain" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all">
              Steakhouses →
            </Link>
            <Link href="/guides/best-italian-restaurants-bahrain" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all">
              Italian Restaurants →
            </Link>
            <Link href="/places" className="px-6 py-3 bg-gradient-to-r from-green-500 via-white to-red-500 text-slate-900 rounded-full font-medium hover:shadow-lg hover:shadow-orange-500/25 transition-all">
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
              { title: 'Steakhouses', href: '/guides/best-steakhouses-bahrain' },
              { title: 'Italian', href: '/guides/best-italian-restaurants-bahrain' },
              { title: 'Lebanese', href: '/guides/best-lebanese-restaurants-bahrain' },
              { title: 'Indian', href: '/guides/best-indian-restaurants-bahrain' },
              { title: 'Turkish', href: '/guides/best-turkish-restaurants-bahrain' },
              { title: 'Fine Dining', href: '/guides/best-fine-dining-bahrain' },
              { title: 'Korean', href: '/guides/best-korean-restaurants-bahrain' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="px-3 py-1.5 bg-white/5 hover:bg-orange-500/20 rounded text-sm transition-colors">
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
          { title: 'Adliya Restaurants & Bars', href: '/guides/adliya-restaurants-bars' },
          { title: 'Block 338 Guide', href: '/guides/adliya' },
          { title: 'Best Brunches', href: '/guides/brunches' },
          { title: 'Juffair Restaurants', href: '/guides/juffair-restaurants-bars' },
        ]} 
      />
    </div>
  );
}
