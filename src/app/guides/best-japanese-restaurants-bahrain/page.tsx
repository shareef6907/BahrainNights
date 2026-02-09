import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Utensils, MapPin, Star,
  DollarSign, Award, Sparkles
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Best Japanese & Sushi Restaurants in Bahrain 2026 | Top 12 Omakase & Ramen Spots',
  description: 'Discover the best Japanese restaurants and sushi bars in Bahrain for 2026. From premium omakase experiences to authentic ramen, find top-rated Japanese dining including Bushido, Kei, and Maki.',
  keywords: 'best Japanese restaurants Bahrain, sushi Bahrain, omakase Bahrain, ramen Bahrain, Bushido Bahrain, Japanese food Manama, sashimi Bahrain',
  openGraph: {
    title: 'Best Japanese & Sushi Restaurants in Bahrain 2026 | Top 12 Omakase & Ramen Spots',
    description: 'Complete guide to the best Japanese restaurants and sushi bars in Bahrain - from omakase to ramen.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/best-japanese-restaurants-bahrain',
    images: [{ url: 'https://www.bahrainnights.com/images/guides/japanese-restaurants-bahrain.jpg', width: 1200, height: 630, alt: 'Best Japanese Restaurants in Bahrain' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Japanese & Sushi Restaurants in Bahrain 2026',
    description: 'Your ultimate guide to Japanese cuisine in Bahrain.',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/best-japanese-restaurants-bahrain',
  },
};

const restaurants = [
  {
    name: 'Bushido',
    slug: 'bushido-adliya',
    location: 'Adliya',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 25-50 per person',
    cuisine: 'Contemporary Japanese',
    description: 'Bushido stands as Bahrain\'s premier Japanese dining destination, offering an exquisite blend of traditional techniques and modern creativity. The sleek, intimate setting creates the perfect atmosphere for savoring meticulously crafted sushi, sashimi, and innovative Japanese fusion dishes. The omakase experience here is legendary, showcasing the finest seasonal ingredients.',
    specialties: ['Omakase', 'Premium sashimi', 'Signature rolls', 'Wagyu beef', 'Sake pairings'],
    atmosphere: 'Sleek and intimate with contemporary Japanese aesthetics',
    hours: 'Daily 12PM-3PM, 7PM-12AM',
    reservation: 'Essential for dinner, especially omakase',
    bestFor: 'Special occasions, sushi connoisseurs, date nights',
    mustTry: 'Omakase menu, Dragon roll, A5 Wagyu, Yellowtail sashimi',
  },
  {
    name: 'Kei',
    slug: 'kei-bahrain',
    location: 'Adliya',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 20-45 per person',
    cuisine: 'Japanese Fine Dining',
    description: 'Kei offers a sophisticated Japanese dining experience in the heart of Adliya. The restaurant combines traditional Japanese cuisine with artistic presentation, creating dishes that are as beautiful as they are delicious. From delicate sashimi to robata-grilled specialties, every dish reflects meticulous attention to detail.',
    specialties: ['Sashimi platters', 'Robata grill', 'Japanese whisky', 'Creative appetizers', 'Tasting menus'],
    atmosphere: 'Elegant and refined with minimalist Japanese design',
    hours: 'Daily 12PM-3PM, 7PM-11:30PM',
    reservation: 'Highly recommended',
    bestFor: 'Fine dining, business dinners, culinary exploration',
    mustTry: 'Chef\'s sashimi selection, Black cod miso, Wagyu tataki',
  },
  {
    name: 'Zuma',
    slug: 'zuma-bahrain',
    location: 'Four Seasons Bahrain Bay',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 30-60 per person',
    cuisine: 'Contemporary Japanese',
    description: 'Part of the internationally acclaimed Zuma group, this Four Seasons outpost delivers sophisticated contemporary Japanese cuisine in a stunning waterfront setting. The restaurant is famous for its robata grill, sushi counter, and innovative dishes that blend Japanese traditions with modern flair. The views of Bahrain Bay add to the exceptional experience.',
    specialties: ['Robata grill', 'Premium sushi', 'Signature cocktails', 'Black cod', 'Weekend brunch'],
    atmosphere: 'Glamorous with stunning bay views, buzzing social scene',
    hours: 'Daily 12PM-3PM, 7PM-12AM',
    reservation: 'Essential, especially weekends',
    bestFor: 'Special occasions, see-and-be-seen dining, celebrations',
    mustTry: 'Black cod miso, Robata wagyu, Signature Zuma rolls, Sake flights',
  },
  {
    name: 'Maki',
    slug: 'maki-bahrain',
    location: 'Seef Mall & City Centre',
    type: 'Casual Dining',
    rating: 4,
    price: 'BD 8-18 per person',
    cuisine: 'Japanese Casual',
    description: 'Maki brings accessible Japanese cuisine to Bahrain\'s malls, offering fresh sushi, creative rolls, and Japanese comfort food at reasonable prices. The convenient locations and consistent quality make it a popular choice for sushi cravings without the fine dining price tag.',
    specialties: ['Creative maki rolls', 'Bento boxes', 'Ramen', 'Tempura', 'Affordable lunch sets'],
    atmosphere: 'Modern and casual, mall-friendly environment',
    hours: 'Mall hours, typically 10AM-10PM',
    reservation: 'Not usually required',
    bestFor: 'Quick sushi fix, families, mall dining, lunch',
    mustTry: 'Rainbow roll, Chicken katsu, Maki special roll, Miso soup',
  },
  {
    name: 'Nozomi',
    slug: 'nozomi-bahrain',
    location: 'Bahrain Bay',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 25-55 per person',
    cuisine: 'Japanese Contemporary',
    description: 'Nozomi combines cutting-edge Japanese cuisine with a vibrant atmosphere and stunning bay views. The restaurant is known for its theatrical presentations, premium ingredients, and extensive sake and cocktail menu. It\'s where Bahrain\'s social scene meets exceptional Japanese food.',
    specialties: ['Signature sushi', 'Japanese cocktails', 'Wagyu dishes', 'Theatrical presentations', 'DJ nights'],
    atmosphere: 'Vibrant and glamorous with waterfront terrace',
    hours: 'Daily 7PM-2AM',
    reservation: 'Essential',
    bestFor: 'Night out, special occasions, social dining',
    mustTry: 'Truffle sashimi, Signature cocktails, Wagyu sliders',
  },
  {
    name: 'Trader Vic\'s Japanese Menu',
    slug: 'trader-vics-bahrain',
    location: 'Ritz-Carlton Bahrain',
    type: 'Casual Fine',
    rating: 4,
    price: 'BD 15-35 per person',
    cuisine: 'Pan-Asian with Japanese',
    description: 'While famous for its Polynesian fare, Trader Vic\'s at the Ritz-Carlton offers excellent Japanese-inspired dishes alongside its broader menu. The waterfront setting and legendary cocktails make it a unique option for those wanting sushi with a twist.',
    specialties: ['Sushi selection', 'Asian fusion', 'Signature cocktails', 'Waterfront dining'],
    atmosphere: 'Tropical elegance with beachfront views',
    hours: 'Daily 12PM-12AM',
    reservation: 'Recommended for dinner',
    bestFor: 'Mixed groups, cocktails with sushi, waterfront dining',
    mustTry: 'Mai Tai with sushi platter, Asian fusion dishes',
  },
  {
    name: 'Sakura',
    slug: 'sakura-bahrain',
    location: 'Adliya',
    type: 'Casual Dining',
    rating: 4,
    price: 'BD 10-22 per person',
    cuisine: 'Traditional Japanese',
    description: 'Sakura offers authentic Japanese cuisine in a traditional setting, with a focus on classic preparations rather than fusion. The restaurant is favored by Japanese expats and purists who appreciate time-honored techniques and familiar flavors.',
    specialties: ['Authentic sushi', 'Ramen', 'Donburi bowls', 'Tempura', 'Set meals'],
    atmosphere: 'Traditional Japanese with tatami-style seating available',
    hours: 'Daily 12PM-3PM, 6PM-11PM',
    reservation: 'Recommended for dinner',
    bestFor: 'Authentic Japanese, expat favorites, traditional experience',
    mustTry: 'Chirashi don, Tonkotsu ramen, Tempura set, Green tea',
  },
  {
    name: 'Yo! Sushi',
    slug: 'yo-sushi-bahrain',
    location: 'City Centre Bahrain',
    type: 'Casual',
    rating: 3,
    price: 'BD 6-15 per person',
    cuisine: 'Conveyor Belt Sushi',
    description: 'The famous British-Japanese chain brings its conveyor belt concept to Bahrain, offering fun, accessible sushi in a vibrant setting. Perfect for families and sushi newcomers, with color-coded plates at different price points.',
    specialties: ['Conveyor belt sushi', 'Hot dishes', 'Kids-friendly', 'Karaage', 'Gyoza'],
    atmosphere: 'Fun and casual with moving conveyor belt',
    hours: 'Mall hours, typically 10AM-10PM',
    reservation: 'Not required',
    bestFor: 'Families, kids, casual sushi, fun dining',
    mustTry: 'Salmon nigiri, California roll, Chicken gyoza',
  },
  {
    name: 'Mirai',
    slug: 'mirai-bahrain',
    location: 'Seef District',
    type: 'Casual Dining',
    rating: 4,
    price: 'BD 10-20 per person',
    cuisine: 'Japanese Fusion',
    description: 'Mirai offers creative Japanese fusion cuisine with a modern twist. The restaurant appeals to younger diners with its Instagram-worthy presentations, creative rolls, and contemporary atmosphere.',
    specialties: ['Fusion rolls', 'Japanese tacos', 'Colorful presentations', 'Matcha desserts'],
    atmosphere: 'Modern and Instagram-friendly',
    hours: 'Daily 12PM-11PM',
    reservation: 'Recommended for weekends',
    bestFor: 'Trendy dining, Instagram-worthy food, younger crowds',
    mustTry: 'Signature fusion rolls, Matcha lava cake, Japanese tacos',
  },
  {
    name: 'Tokyo Tei',
    slug: 'tokyo-tei-bahrain',
    location: 'Juffair',
    type: 'Casual',
    rating: 4,
    price: 'BD 7-15 per person',
    cuisine: 'Authentic Japanese',
    description: 'A hidden gem in Juffair, Tokyo Tei is run by Japanese owners and serves some of the most authentic Japanese food in Bahrain. The unassuming exterior hides a kitchen that produces genuine Japanese home-style cooking and fresh sushi.',
    specialties: ['Authentic home cooking', 'Fresh sushi', 'Udon', 'Japanese curry', 'Set menus'],
    atmosphere: 'Simple and authentic, no-frills Japanese',
    hours: 'Daily 11AM-11PM',
    reservation: 'Not usually required',
    bestFor: 'Authentic Japanese, hidden gem, value',
    mustTry: 'Japanese curry, Fresh sushi set, Udon noodles',
  },
];

const sushiTypes = [
  { type: 'Omakase', description: 'Chef\'s choice tasting menu - the ultimate sushi experience', where: 'Bushido, Zuma, Kei' },
  { type: 'Nigiri', description: 'Hand-pressed rice topped with fresh fish slices', where: 'All restaurants' },
  { type: 'Sashimi', description: 'Pure sliced raw fish, no rice', where: 'Bushido, Kei, Nozomi' },
  { type: 'Maki Rolls', description: 'Rice and fillings wrapped in seaweed', where: 'Maki, Yo! Sushi' },
  { type: 'Temaki', description: 'Hand-rolled cone-shaped sushi', where: 'Bushido, Sakura' },
  { type: 'Chirashi', description: 'Sashimi scattered over sushi rice bowl', where: 'Sakura, Tokyo Tei' },
];

const tips = [
  {
    title: 'Omakase Etiquette',
    content: 'For omakase, trust the chef completely. Eat each piece immediately when served for optimal freshness.',
  },
  {
    title: 'Sushi Order',
    content: 'Start with lighter fish (white fish) and progress to richer options (salmon, tuna) for the best taste experience.',
  },
  {
    title: 'Wasabi & Soy',
    content: 'At fine dining venues, wasabi is often already applied. Avoid mixing wasabi into soy sauce - it\'s considered improper.',
  },
  {
    title: 'Chopstick Skills',
    content: 'It\'s acceptable to eat sushi with your hands at traditional restaurants. Nigiri should be dipped fish-side down.',
  },
  {
    title: 'Sake Pairing',
    content: 'Ask for sake recommendations - different sakes complement different fish. Cold sake with sashimi is classic.',
  },
  {
    title: 'Fresh is Best',
    content: 'Visit popular sushi restaurants during busy times - higher turnover means fresher fish.',
  },
];

const faqs = [
  {
    q: 'What is the best sushi restaurant in Bahrain?',
    a: 'Bushido in Adliya is widely considered Bahrain\'s best sushi restaurant, especially for its omakase experience. Zuma at Four Seasons and Kei are also exceptional for premium sushi. For casual sushi, Maki offers great quality at accessible prices.',
  },
  {
    q: 'Where can I get omakase in Bahrain?',
    a: 'The best omakase experiences in Bahrain are at Bushido, Kei, and Zuma. Expect to pay BD 35-60+ for a full omakase menu. Reservations are essential, and it\'s best to mention any dietary restrictions when booking.',
  },
  {
    q: 'Is there good ramen in Bahrain?',
    a: 'While Bahrain isn\'t known for ramen specifically, Sakura and Tokyo Tei offer authentic ramen. Maki also serves decent ramen at mall locations. For the best experience, visit during cooler months.',
  },
  {
    q: 'What is the cheapest Japanese restaurant in Bahrain?',
    a: 'Yo! Sushi and Maki offer the most affordable Japanese food, with meals starting from BD 6-8 per person. Tokyo Tei in Juffair also provides excellent value for authentic Japanese cuisine.',
  },
  {
    q: 'Are there halal Japanese restaurants in Bahrain?',
    a: 'Most Japanese restaurants in Bahrain source halal-certified ingredients. However, it\'s best to confirm with individual restaurants, especially regarding meat and cooking methods. Traditional sushi (fish-based) is generally not a concern.',
  },
];

export default function BestJapaneseRestaurantsBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-red-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Best Japanese Restaurants Bahrain', url: 'https://www.bahrainnights.com/guides/best-japanese-restaurants-bahrain' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium mb-4">
              🍣 Ultimate Sushi Guide 2026
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
                Best Japanese & Sushi Restaurants
              </span>
              {' '}in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From exclusive omakase experiences at Bushido to accessible mall sushi — 
              your complete guide to the best Japanese restaurants, ramen bars, and sushi spots in Bahrain.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated} | By <Link href="https://www.bahrainnights.com" className="text-red-400 hover:underline">BahrainNights.com</Link>
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Restaurants Reviewed', value: '20+', icon: Utensils },
              { label: 'Budget From', value: 'BD 6', icon: DollarSign },
              { label: 'Premium Omakase', value: '4+', icon: Award },
              { label: 'Cuisine Style', value: 'All Styles', icon: Sparkles },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-red-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-gray-300 leading-relaxed">
              Japanese cuisine has become increasingly sophisticated in Bahrain, with world-class restaurants 
              offering everything from traditional sushi and sashimi to contemporary fusion creations. Whether 
              you&apos;re seeking an intimate omakase experience where the chef curates each course, a vibrant 
              social scene paired with premium sake, or simply a quick sushi fix during a shopping trip, 
              Bahrain&apos;s Japanese dining scene delivers.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mt-4">
              The Kingdom&apos;s Japanese restaurants range from internationally acclaimed fine dining establishments 
              to authentic hole-in-the-wall gems run by Japanese expats. This guide covers the complete spectrum, 
              helping you find the perfect Japanese restaurant for any occasion and budget.
            </p>
          </div>
        </div>
      </section>

      {/* Sushi Types Guide */}
      <section className="py-8 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Know Your Sushi</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {sushiTypes.map((type) => (
              <div key={type.type} className="bg-white/5 rounded-xl p-4">
                <h3 className="font-semibold text-red-400 mb-1">{type.type}</h3>
                <p className="text-xs text-gray-400 mb-2">{type.description}</p>
                <p className="text-xs text-pink-300">Best at: {type.where}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurant List */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Top Japanese Restaurants in Bahrain</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Comprehensive reviews covering sushi, ramen, robata, and everything Japanese for 2026.
          </p>
          
          <div className="space-y-6">
            {restaurants.map((restaurant) => (
              <div 
                key={restaurant.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <Link href={`/restaurants/${restaurant.slug}`} className="hover:text-red-400 transition-colors">
                          <h3 className="text-xl font-bold">{restaurant.name}</h3>
                        </Link>
                        <p className="text-red-400 text-sm flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {restaurant.location} • {restaurant.type}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex">
                          {[...Array(restaurant.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-red-400 fill-red-400" />
                          ))}
                        </div>
                        <span className="text-sm font-bold text-white">{restaurant.price}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-red-300 mb-2">{restaurant.cuisine}</p>
                    <p className="text-gray-300 mb-4">{restaurant.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {restaurant.specialties.map((s) => (
                        <span key={s} className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded">
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="bg-red-500/10 rounded-lg p-3">
                      <p className="text-sm">
                        <strong className="text-red-400">Must Try: </strong>
                        {restaurant.mustTry}
                      </p>
                    </div>
                  </div>
                  
                  <div className="lg:w-1/4 space-y-2 text-sm bg-black/20 rounded-xl p-4">
                    <p><strong className="text-gray-400">Atmosphere:</strong> {restaurant.atmosphere}</p>
                    <p><strong className="text-gray-400">Hours:</strong> {restaurant.hours}</p>
                    <p><strong className="text-gray-400">Reservations:</strong> {restaurant.reservation}</p>
                    <p className="text-red-400 italic pt-2">Best for: {restaurant.bestFor}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dining Tips */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Japanese Dining Etiquette & Tips</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tips.map((tip) => (
              <div key={tip.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-red-400 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-300">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events CTA */}
      <section className="py-12 px-4 bg-gradient-to-r from-red-500/20 to-pink-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Discover Food Events & Experiences</h2>
          <p className="text-gray-300 mb-6">
            Find Japanese food festivals, sake tastings, and culinary events in Bahrain.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://bahrain.platinumlist.net/?affiliate=yjg3yzi"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-red-500 hover:bg-red-400 text-white font-bold rounded-lg transition-colors"
            >
              Browse Events on Platinumlist
            </a>
            <a 
              href="https://www.eventsbahrain.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              EventsBahrain.com
            </a>
          </div>
        </div>
      </section>

      {/* Related Cuisine Guides */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Explore More Cuisine Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Indian Restaurants', href: '/guides/best-indian-restaurants-bahrain', emoji: '🍛' },
              { title: 'Seafood', href: '/guides/best-seafood-bahrain', emoji: '🦐' },
              { title: 'Thai', href: '/guides/best-thai-restaurants-bahrain', emoji: '🍜' },
              { title: 'Chinese', href: '/guides/best-chinese-restaurants-bahrain', emoji: '🥡' },
              { title: 'Arabic & Lebanese', href: '/guides/best-arabic-restaurants-bahrain', emoji: '🥙' },
              { title: 'Italian', href: '/guides/best-italian-restaurants-bahrain', emoji: '🍝' },
              { title: 'All Restaurants', href: '/guides/restaurants', emoji: '🍽️' },
              { title: 'Best Brunches', href: '/guides/brunches', emoji: '🥂' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group"
              >
                <span className="text-2xl mb-2 block">{guide.emoji}</span>
                <span className="font-medium group-hover:text-red-400 transition-colors">
                  {guide.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
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

      {/* Footer */}
      <section className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400 mb-4">
            Powered by <Link href="https://www.bahrainnights.com" className="text-red-400 hover:underline">BahrainNights.com</Link> — 
            Your ultimate guide to nightlife, dining, and entertainment in Bahrain.
          </p>
          <div className="flex justify-center gap-6 text-sm text-gray-500">
            <a href="https://www.eventsbahrain.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-400">EventsBahrain.com</a>
            <a href="https://www.cinematicwebworks.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-400">CinematicWebWorks.com</a>
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Best Japanese & Sushi Restaurants in Bahrain 2026',
            description: 'Complete guide to the best Japanese restaurants and sushi bars in Bahrain.',
            author: { '@type': 'Organization', name: 'BahrainNights', url: 'https://www.bahrainnights.com' },
            publisher: { '@type': 'Organization', name: 'BahrainNights' },
            datePublished: '2026-01-01',
            dateModified: lastUpdated,
            mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://www.bahrainnights.com/guides/best-japanese-restaurants-bahrain' },
          }),
        }}
      />
      
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: { '@type': 'Answer', text: faq.a },
            })),
          }),
        }}
      />
    </div>
  );
}
