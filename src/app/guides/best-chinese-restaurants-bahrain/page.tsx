import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Utensils, MapPin, Star,
  DollarSign, Flame, Award
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Best Chinese Restaurants in Bahrain 2026 | Top 12 Dim Sum & Cantonese Dining',
  description: 'Discover the 12 best Chinese restaurants in Bahrain for 2026. From authentic dim sum to Sichuan specialties, find the best Chinese food in Manama, Seef, and Juffair at Golden Dragon, Panda House, and more.',
  keywords: 'best Chinese restaurants Bahrain 2026, Chinese food Bahrain, dim sum Bahrain, Cantonese Manama, Sichuan Bahrain, Golden Dragon, Panda House, authentic Chinese Bahrain',
  openGraph: {
    title: 'Best Chinese Restaurants in Bahrain 2026 | Top 12 Dim Sum & Cantonese Dining',
    description: 'Complete guide to the best Chinese restaurants in Bahrain - from authentic dim sum to elegant Cantonese fine dining.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/best-chinese-restaurants-bahrain',
    images: [{ url: 'https://www.bahrainnights.com/images/guides/chinese-restaurants-bahrain.jpg', width: 1200, height: 630, alt: 'Best Chinese Restaurants in Bahrain' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Chinese Restaurants in Bahrain 2026',
    description: 'Your ultimate guide to Chinese cuisine in Bahrain.',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/best-chinese-restaurants-bahrain',
  },
};

const restaurants = [
  {
    name: 'Golden Dragon',
    slug: 'golden-dragon-bahrain',
    location: 'Gulf Hotel, Adliya',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 18-35 per person',
    cuisine: 'Cantonese Fine Dining',
    description: 'Located within the prestigious Gulf Hotel, Golden Dragon stands as Bahrain\'s premier Chinese fine dining destination. The restaurant offers an authentic Cantonese experience with expert chefs who have mastered traditional cooking techniques. The elegant setting features classic Chinese décor with private dining rooms for special occasions. The extensive menu spans dim sum, seafood, and signature Cantonese dishes prepared with imported premium ingredients.',
    specialties: ['Dim Sum', 'Peking Duck', 'Live Seafood', 'Cantonese BBQ', 'Premium Abalone'],
    atmosphere: 'Elegant fine dining with traditional Chinese décor and private rooms',
    hours: 'Daily 12PM-3PM, 7PM-11PM',
    reservation: 'Highly recommended, essential for weekends',
    bestFor: 'Business entertaining, celebrations, authentic Cantonese, special occasions',
    mustTry: 'Peking Duck, Dim Sum Selection, Steamed Garoupa, Crispy Aromatic Duck',
  },
  {
    name: 'Panda House',
    slug: 'panda-house-bahrain',
    location: 'Juffair',
    type: 'Casual Dining',
    rating: 5,
    price: 'BD 6-14 per person',
    cuisine: 'Authentic Chinese',
    description: 'Panda House has become a Juffair institution, beloved for its authentic Chinese flavors and generous portions at reasonable prices. Run by a Chinese family, the kitchen maintains traditional recipes and proper techniques that appeal to Chinese residents and food enthusiasts alike. The extensive menu covers all major Chinese regional cuisines with particular strength in Sichuan and Cantonese dishes. The casual atmosphere makes it perfect for regular dining.',
    specialties: ['Sichuan Dishes', 'Hand-pulled Noodles', 'Mapo Tofu', 'Kung Pao Chicken', 'Chinese BBQ'],
    atmosphere: 'Casual and authentic with welcoming family atmosphere',
    hours: 'Daily 11AM-11PM',
    reservation: 'Recommended for groups',
    bestFor: 'Authentic Chinese, families, regular visits, groups, late night',
    mustTry: 'Mapo Tofu, Kung Pao Chicken, Hand-pulled noodles, Sweet and sour pork',
  },
  {
    name: 'Shang Palace',
    slug: 'shang-palace-bahrain',
    location: 'Shangri-La Hotel, Seef',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 20-45 per person',
    cuisine: 'Premium Cantonese',
    description: 'The Shang Palace brings the legendary Shangri-La hospitality to Chinese dining in Bahrain. This sophisticated restaurant offers refined Cantonese cuisine in an opulent setting befitting its five-star hotel home. Master chefs prepare traditional dishes with premium ingredients, while the elegant ambiance and impeccable service create an unforgettable dining experience. The weekend dim sum is particularly renowned among discerning diners.',
    specialties: ['Weekend Dim Sum', 'Premium Seafood', 'Traditional Cantonese', 'Chef Specialties', 'Chinese Tea Service'],
    atmosphere: 'Luxurious Shangri-La elegance with sophisticated Chinese décor',
    hours: 'Daily 12PM-3PM, 7PM-11PM',
    reservation: 'Essential, especially for weekend dim sum',
    bestFor: 'Special occasions, business dining, dim sum lovers, hotel guests',
    mustTry: 'Dim Sum Brunch, Wok-fried Lobster, Roast Duck, Steamed fish',
  },
  {
    name: 'China Garden',
    slug: 'china-garden-diplomat',
    location: 'Diplomat Radisson Blu',
    type: 'Fine Dining',
    rating: 4,
    price: 'BD 15-30 per person',
    cuisine: 'Traditional Chinese',
    description: 'A long-standing favorite in Bahrain\'s Chinese dining scene, China Garden at the Diplomat Radisson Blu Hotel delivers consistent quality in an elegant hotel setting. The restaurant has built a loyal following over decades with its reliable execution of Chinese classics and attentive service. The menu offers a comprehensive journey through Chinese cuisine, from light dim sum to hearty mains.',
    specialties: ['Classic Chinese Dishes', 'Business Lunches', 'Seafood', 'Traditional Décor', 'Private Dining'],
    atmosphere: 'Classic hotel Chinese restaurant with refined décor',
    hours: 'Daily 12PM-3PM, 7PM-11PM',
    reservation: 'Recommended',
    bestFor: 'Business lunches, hotel guests, reliable quality, traditional Chinese',
    mustTry: 'Sweet and sour prawns, Beef in black bean sauce, Fried rice, Hot and sour soup',
  },
  {
    name: 'Chopstix',
    slug: 'chopstix-bahrain',
    location: 'Seef Mall / Multiple Locations',
    type: 'Casual Dining',
    rating: 4,
    price: 'BD 5-12 per person',
    cuisine: 'Modern Chinese',
    description: 'Chopstix brings accessible, well-prepared Chinese food to shopping destinations across Bahrain. This popular chain has perfected the art of delivering flavorful Chinese dishes in a casual, family-friendly setting. The menu caters to local tastes while maintaining the essence of Chinese cooking. Multiple convenient locations make it easy to satisfy Chinese food cravings wherever you are.',
    specialties: ['Mall Convenience', 'Family Friendly', 'Quick Service', 'Value Combos', 'Noodles'],
    atmosphere: 'Modern casual dining with efficient service',
    hours: 'Mall hours (typically 10AM-10PM)',
    reservation: 'Not required',
    bestFor: 'Mall shoppers, families, quick meals, consistent quality',
    mustTry: 'Kung Pao Chicken, Fried Noodles, Spring Rolls, Lemon Chicken',
  },
  {
    name: 'Beijing Restaurant',
    slug: 'beijing-restaurant-manama',
    location: 'Manama',
    type: 'Casual Dining',
    rating: 4,
    price: 'BD 5-12 per person',
    cuisine: 'Northern Chinese',
    description: 'Beijing Restaurant specializes in the hearty flavors of Northern China, featuring dishes that warm the soul. The restaurant is particularly known for its hand-made dumplings and noodles, prepared fresh daily by skilled Chinese cooks. The casual setting belies the authentic flavors emerging from the kitchen. For lovers of Northern Chinese cuisine, this is an essential Bahrain destination.',
    specialties: ['Hand-made Dumplings', 'Northern Chinese', 'Fresh Noodles', 'Lamb Dishes', 'Hot Pot'],
    atmosphere: 'Casual authentic Chinese eatery',
    hours: 'Daily 11AM-11PM',
    reservation: 'Walk-in friendly',
    bestFor: 'Dumpling lovers, authentic Northern Chinese, budget dining, families',
    mustTry: 'Pork Dumplings, Beijing Noodles, Lamb Skewers, Fried Dumplings',
  },
  {
    name: 'Red Wok',
    slug: 'red-wok-bahrain',
    location: 'Juffair',
    type: 'Casual Dining',
    rating: 4,
    price: 'BD 4-10 per person',
    cuisine: 'Indo-Chinese',
    description: 'Red Wok serves the popular Indo-Chinese fusion that has captured hearts across Asia. This style blends Chinese cooking techniques with Indian spices and flavors, creating dishes that are bold, flavorful, and uniquely satisfying. The restaurant excels in quick wok-fried dishes with punchy flavors. For those who love spice with their Chinese, Red Wok delivers consistently.',
    specialties: ['Indo-Chinese Fusion', 'Chilli Dishes', 'Manchurian', 'Hakka Noodles', 'Fried Rice'],
    atmosphere: 'Casual and vibrant with quick service',
    hours: 'Daily 11AM-12AM',
    reservation: 'Not usually required',
    bestFor: 'Spice lovers, Indo-Chinese fans, late night, budget dining',
    mustTry: 'Chilli Chicken, Gobi Manchurian, Hakka Noodles, Dragon Chicken',
  },
  {
    name: 'Dynasty',
    slug: 'dynasty-chinese-bahrain',
    location: 'ART Rotana, Amwaj',
    type: 'Fine Dining',
    rating: 4,
    price: 'BD 18-32 per person',
    cuisine: 'Cantonese',
    description: 'Dynasty at the ART Rotana offers refined Cantonese dining in the beautiful Amwaj Islands setting. The restaurant combines authentic flavors with elegant presentation, making it ideal for special occasions or sophisticated business dining. The waterfront hotel location adds to the ambiance, while skilled chefs deliver consistent quality across the menu.',
    specialties: ['Waterfront Dining', 'Hotel Cantonese', 'Dim Sum', 'Seafood Specialties', 'Private Events'],
    atmosphere: 'Elegant hotel dining with Amwaj waterfront setting',
    hours: 'Daily 12PM-3PM, 7PM-11PM',
    reservation: 'Recommended',
    bestFor: 'Amwaj residents, hotel guests, celebrations, scenic dining',
    mustTry: 'Dim Sum Lunch, Crispy Duck, Wok-fried Prawns, Seafood Fried Rice',
  },
  {
    name: 'Great Wall',
    slug: 'great-wall-bahrain',
    location: 'Gudaibiya',
    type: 'Budget',
    rating: 4,
    price: 'BD 3-8 per person',
    cuisine: 'Authentic Chinese',
    description: 'Great Wall proves that authentic Chinese food doesn\'t require a big budget. This unpretentious restaurant serves genuine Chinese flavors at remarkably affordable prices. Frequented by the Chinese community in Bahrain, the kitchen maintains proper techniques and authentic seasonings. The no-frills setting focuses attention where it belongs: on the delicious food.',
    specialties: ['Budget Friendly', 'Authentic Flavors', 'Chinese Community Favorite', 'Large Portions', 'Home-style Cooking'],
    atmosphere: 'Simple and authentic, no-frills dining',
    hours: 'Daily 11AM-11PM',
    reservation: 'Not required',
    bestFor: 'Budget dining, authentic experience, locals, takeaway',
    mustTry: 'Fried Rice, Sweet and Sour Pork, Beef with Broccoli, Spring Rolls',
  },
  {
    name: 'Wok Station',
    slug: 'wok-station-bahrain',
    location: 'Seef District',
    type: 'Fast Casual',
    rating: 4,
    price: 'BD 4-9 per person',
    cuisine: 'Contemporary Asian',
    description: 'Wok Station brings fresh, made-to-order wok cooking to the fast-casual dining scene. The interactive format allows diners to customize their bowls with choice of proteins, vegetables, and sauces. The theatrical open kitchen adds entertainment value while ensuring freshness. For quick, healthy, customizable Asian fare, Wok Station is a reliable choice.',
    specialties: ['Build Your Bowl', 'Fresh Wok Cooking', 'Healthy Options', 'Quick Service', 'Customizable'],
    atmosphere: 'Modern fast-casual with open wok kitchen',
    hours: 'Daily 11AM-11PM',
    reservation: 'Not required',
    bestFor: 'Quick meals, customizable dishes, healthy eating, mall dining',
    mustTry: 'Custom Wok Bowl, Signature Fried Rice, Teriyaki Options, Fresh Vegetables',
  },
  {
    name: 'Golden China',
    slug: 'golden-china-riffa',
    location: 'Riffa',
    type: 'Casual Dining',
    rating: 4,
    price: 'BD 5-12 per person',
    cuisine: 'Traditional Chinese',
    description: 'Serving the Riffa community, Golden China offers reliable Chinese cuisine south of Manama. The restaurant has become a local favorite for its generous portions and consistent flavors. The menu covers all Chinese classics with quality ingredients and proper preparation. For Riffa residents seeking Chinese without the drive to Manama, Golden China delivers.',
    specialties: ['Riffa Location', 'Family Portions', 'Classic Chinese', 'Delivery Available', 'Set Menus'],
    atmosphere: 'Comfortable local Chinese restaurant',
    hours: 'Daily 11AM-11PM',
    reservation: 'Walk-in friendly',
    bestFor: 'Riffa residents, families, consistent quality, delivery',
    mustTry: 'Special Fried Rice, Chicken in Garlic Sauce, Beef Chow Mein, Wonton Soup',
  },
  {
    name: 'Bamboo',
    slug: 'bamboo-chinese-bahrain',
    location: 'Zinj',
    type: 'Casual Dining',
    rating: 4,
    price: 'BD 6-14 per person',
    cuisine: 'Chinese & Asian',
    description: 'Bamboo offers a diverse Asian menu with strong Chinese offerings in the Zinj neighborhood. The restaurant balances authenticity with local preferences, creating dishes that satisfy both purists and casual diners. The menu includes popular Chinese favorites alongside other Asian cuisines for groups with varied preferences. Friendly service and consistent quality have built a loyal following.',
    specialties: ['Mixed Asian Menu', 'Sizzling Platters', 'Noodle Varieties', 'Vegetarian Options', 'Family Dining'],
    atmosphere: 'Welcoming neighborhood Asian restaurant',
    hours: 'Daily 11:30AM-11PM',
    reservation: 'Recommended for groups',
    bestFor: 'Mixed groups, families, neighborhood dining, vegetarians',
    mustTry: 'Sizzling Beef, Kung Pao Prawns, Vegetable Fried Rice, Crispy Wontons',
  },
];

const restaurantsByCategory = [
  { category: 'Fine Dining', picks: ['Golden Dragon', 'Shang Palace', 'Dynasty'] },
  { category: 'Best Dim Sum', picks: ['Shang Palace', 'Golden Dragon', 'Dynasty'] },
  { category: 'Best Value', picks: ['Great Wall', 'Panda House', 'Beijing Restaurant'] },
  { category: 'Authentic Sichuan', picks: ['Panda House', 'Beijing Restaurant', 'Great Wall'] },
  { category: 'Best for Groups', picks: ['Golden Dragon', 'Panda House', 'China Garden'] },
  { category: 'Quick Meals', picks: ['Chopstix', 'Wok Station', 'Red Wok'] },
];

const dishes = [
  { dish: 'Peking Duck', description: 'Roasted duck with crispy skin, pancakes, and hoisin sauce', where: 'Golden Dragon, Shang Palace, Dynasty' },
  { dish: 'Dim Sum', description: 'Steamed and fried dumplings, buns, and small plates', where: 'Shang Palace, Golden Dragon, Dynasty' },
  { dish: 'Kung Pao Chicken', description: 'Stir-fried chicken with peanuts and dried chilies', where: 'Panda House, Chopstix, China Garden' },
  { dish: 'Sweet and Sour Pork', description: 'Crispy pork in tangy sweet and sour sauce', where: 'Golden Dragon, Panda House, Great Wall' },
  { dish: 'Mapo Tofu', description: 'Silken tofu in spicy Sichuan chili bean sauce', where: 'Panda House, Beijing Restaurant, Great Wall' },
  { dish: 'Fried Rice', description: 'Wok-fried rice with egg, vegetables, and choice of protein', where: 'Panda House, Chopstix, Golden China' },
  { dish: 'Chow Mein', description: 'Stir-fried noodles with vegetables and protein', where: 'Panda House, Golden China, Red Wok' },
  { dish: 'Spring Rolls', description: 'Crispy rolled pastry with savory vegetable or meat filling', where: 'Golden Dragon, Chopstix, China Garden' },
];

const tips = [
  {
    title: 'Reserve for Dim Sum',
    content: 'Weekend dim sum at hotel restaurants is extremely popular. Book in advance at Shang Palace or Golden Dragon to avoid disappointment.',
  },
  {
    title: 'Share Family Style',
    content: 'Chinese dining is designed for sharing. Order one dish per person plus rice and share everything. This way you can taste more variety.',
  },
  {
    title: 'Ask for Authentic Spice',
    content: 'If you enjoy Sichuan heat, ask for "Chinese spicy" rather than adjusted versions. Restaurants often tone down the chili for local palates.',
  },
  {
    title: 'Try the Specials',
    content: 'Many Chinese restaurants have off-menu specials or dishes prepared for Chinese customers. Ask your server what\'s special today.',
  },
  {
    title: 'Lunch Sets Offer Value',
    content: 'Hotel Chinese restaurants often have business lunch sets that offer fine dining quality at more accessible prices.',
  },
  {
    title: 'Tea is Part of the Experience',
    content: 'Chinese tea service is integral to the meal. Good Chinese restaurants will serve quality tea as part of the dining experience.',
  },
];

const faqs = [
  {
    q: 'What is the best Chinese restaurant in Bahrain for fine dining?',
    a: 'Golden Dragon at the Gulf Hotel is widely considered Bahrain\'s finest Chinese restaurant, offering premium Cantonese cuisine with exceptional dim sum and Peking duck. Shang Palace at Shangri-La Hotel is another excellent choice for luxurious Chinese dining, particularly renowned for its weekend dim sum brunch.',
  },
  {
    q: 'Where can I find the best dim sum in Bahrain?',
    a: 'Shang Palace at Shangri-La Hotel serves the most acclaimed dim sum in Bahrain, especially during their weekend brunch. Golden Dragon at Gulf Hotel also offers excellent dim sum selections. Dynasty at ART Rotana provides quality dim sum in a scenic Amwaj setting. Book ahead as weekend dim sum is very popular.',
  },
  {
    q: 'Are there authentic Chinese restaurants in Bahrain?',
    a: 'Yes, several restaurants offer authentic Chinese cuisine. Panda House in Juffair is run by a Chinese family and serves genuine flavors. Great Wall in Gudaibiya is popular with the Chinese community. Beijing Restaurant specializes in authentic Northern Chinese cuisine with hand-made dumplings and noodles.',
  },
  {
    q: 'What are the cheapest Chinese restaurants in Bahrain?',
    a: 'Great Wall in Gudaibiya offers authentic Chinese from BD 3-8 per person. Red Wok provides Indo-Chinese from BD 4-10. Chopstix and Wok Station offer budget-friendly options in malls from BD 4-9. These restaurants prove quality Chinese food is available at every budget level.',
  },
  {
    q: 'Which Chinese restaurant in Bahrain has the best Peking Duck?',
    a: 'Golden Dragon at Gulf Hotel is renowned for serving the best Peking Duck in Bahrain, prepared traditionally and carved tableside. Shang Palace at Shangri-La also offers excellent Peking Duck. Both require advance ordering for the full duck presentation. Expect to pay around BD 25-35 for a whole duck.',
  },
];

export default function BestChineseRestaurantsBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-red-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Best Chinese Restaurants Bahrain', url: 'https://www.bahrainnights.com/guides/best-chinese-restaurants-bahrain' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-yellow-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium mb-4">
              🥡 Ultimate Restaurant Guide 2026
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-red-400 to-yellow-500 bg-clip-text text-transparent">
                Best Chinese Restaurants
              </span>
              {' '}in Bahrain 2026
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From elegant Cantonese fine dining at Shang Palace to authentic street-style gems — 
              your complete guide to the best Chinese restaurants, dim sum houses, and Sichuan spots in the Kingdom of Bahrain.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated} | By <Link href="https://www.bahrainnights.com" className="text-red-400 hover:underline">BahrainNights.com</Link>
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Restaurants Reviewed', value: '35+', icon: Utensils },
              { label: 'Budget From', value: 'BD 3', icon: DollarSign },
              { label: 'Fine Dining Options', value: '4+', icon: Award },
              { label: 'Regional Styles', value: 'All China', icon: Flame },
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
              Chinese cuisine holds a special place in Bahrain&apos;s diverse culinary landscape, with restaurants 
              ranging from opulent hotel fine dining establishments to humble neighborhood eateries cherished by 
              the Chinese community. The kingdom offers an impressive array of regional Chinese cuisines, from 
              delicate Cantonese dim sum and roast meats to fiery Sichuan dishes that challenge your spice tolerance. 
              Whether you&apos;re celebrating a special occasion or seeking authentic comfort food, Bahrain&apos;s 
              Chinese restaurant scene has evolved to satisfy every preference and budget.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mt-4">
              The Chinese dining experience in Bahrain spans the full spectrum of what this ancient cuisine has to 
              offer. Premium hotels like the Gulf Hotel, Shangri-La, and Diplomat Radisson Blu house refined 
              restaurants where master chefs prepare traditional dishes with premium ingredients and tableside 
              presentations. Meanwhile, casual eateries in Juffair, Gudaibiya, and beyond serve home-style cooking 
              that transports you straight to the streets of Beijing or the teahouses of Guangzhou. This comprehensive 
              guide will help you navigate Bahrain&apos;s Chinese restaurant scene, whether you&apos;re craving 
              perfectly crispy Peking duck or a simple bowl of hand-pulled noodles.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Picks by Category */}
      <section className="py-8 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Quick Picks by Category</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {restaurantsByCategory.map((cat) => (
              <div key={cat.category} className="bg-white/5 rounded-xl p-4">
                <h3 className="font-semibold text-red-400 mb-2 text-sm">{cat.category}</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  {cat.picks.map((pick) => (
                    <li key={pick}>• {pick}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurant List */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Top Chinese Restaurants in Bahrain</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Comprehensive reviews with prices, specialties, and insider recommendations for 2026.
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

      {/* Popular Dishes Guide */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Must-Try Chinese Dishes in Bahrain</h2>
          <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
            Essential dishes every Chinese food lover should try, and where to find the best versions.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {dishes.map((dish) => (
              <div key={dish.dish} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-red-400 mb-1">{dish.dish}</h3>
                <p className="text-sm text-gray-300 mb-2">{dish.description}</p>
                <p className="text-xs text-gray-400">Best at: {dish.where}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dining Tips */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Chinese Dining Tips in Bahrain</h2>
          
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
      <section className="py-12 px-4 bg-gradient-to-r from-red-500/20 to-yellow-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Looking for Food Events & Experiences?</h2>
          <p className="text-gray-300 mb-6">
            Discover food festivals, restaurant promotions, and culinary events in Bahrain.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://bahrain.platinumlist.net/?affiliate=yjg3yzi"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-red-500 hover:bg-red-400 text-black font-bold rounded-lg transition-colors"
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
              { title: 'Thai Restaurants', href: '/guides/best-thai-restaurants-bahrain', emoji: '🍜' },
              { title: 'Japanese & Sushi', href: '/guides/best-japanese-restaurants-bahrain', emoji: '🍣' },
              { title: 'Arabic & Lebanese', href: '/guides/best-arabic-restaurants-bahrain', emoji: '🥙' },
              { title: 'Italian', href: '/guides/best-italian-restaurants-bahrain', emoji: '🍝' },
              { title: 'Seafood', href: '/guides/best-seafood-bahrain', emoji: '🦐' },
              { title: 'All Restaurants', href: '/guides/restaurants', emoji: '🍽️' },
              { title: 'Best Buffets', href: '/guides/buffets', emoji: '🥘' },
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

      {/* Structured Data - Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Best Chinese Restaurants in Bahrain 2026 | Top 12 Dim Sum & Cantonese Dining',
            description: 'Complete guide to the best Chinese restaurants in Bahrain, from Cantonese fine dining to authentic budget-friendly options.',
            author: {
              '@type': 'Organization',
              name: 'BahrainNights',
              url: 'https://www.bahrainnights.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'BahrainNights',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.bahrainnights.com/logo.png',
              },
            },
            datePublished: '2026-01-01',
            dateModified: lastUpdated,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://www.bahrainnights.com/guides/best-chinese-restaurants-bahrain',
            },
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
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a,
              },
            })),
          }),
        }}
      />
    </div>
  );
}
