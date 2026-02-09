import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Utensils, MapPin, Star,
  DollarSign, Flame, Award
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Best Thai Restaurants in Bahrain 2026 | Top 12 Authentic Thai Dining',
  description: 'Discover the 12 best Thai restaurants in Bahrain for 2026. From authentic street food to elegant fine dining, find the best Pad Thai, Tom Yum, and Thai curries in Manama, Seef, and Juffair.',
  keywords: 'best Thai restaurants Bahrain 2026, Thai food Bahrain, Pad Thai Bahrain, Tom Yum Manama, Thai curry Bahrain, Talay Thai, Thai Lounge, authentic Thai Bahrain',
  openGraph: {
    title: 'Best Thai Restaurants in Bahrain 2026 | Top 12 Authentic Thai Dining',
    description: 'Complete guide to the best Thai restaurants in Bahrain - from authentic street food to elegant fine dining experiences.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/best-thai-restaurants-bahrain',
    images: [{ url: 'https://www.bahrainnights.com/images/guides/thai-restaurants-bahrain.jpg', width: 1200, height: 630, alt: 'Best Thai Restaurants in Bahrain' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Thai Restaurants in Bahrain 2026',
    description: 'Your ultimate guide to Thai cuisine in Bahrain.',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/best-thai-restaurants-bahrain',
  },
};

const restaurants = [
  {
    name: 'Talay Thai',
    slug: 'talay-thai-bahrain',
    location: 'Adliya',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 15-30 per person',
    cuisine: 'Authentic Thai',
    description: 'Widely regarded as Bahrain\'s premier Thai restaurant, Talay Thai delivers an exceptional culinary journey through the flavors of Thailand. The elegant setting in Adliya perfectly complements the refined yet authentic dishes crafted by skilled Thai chefs. Every dish reflects the careful balance of sweet, sour, salty, and spicy that defines Thai cuisine. The extensive menu spans all major regions of Thailand, from fiery Southern curries to delicate Northern specialties.',
    specialties: ['Tom Yum Goong', 'Massaman Curry', 'Pad Thai', 'Mango Sticky Rice', 'Thai Seafood'],
    atmosphere: 'Elegant dining with traditional Thai décor and intimate seating',
    hours: 'Daily 12PM-3PM, 7PM-11PM',
    reservation: 'Recommended, especially weekends',
    bestFor: 'Special occasions, authentic Thai experience, date nights',
    mustTry: 'Tom Yum Goong, Massaman Lamb, Pad Thai with prawns, Thai ice tea',
  },
  {
    name: 'Thai Lounge',
    slug: 'thai-lounge-bahrain',
    location: 'Seef Mall / City Centre',
    type: 'Casual Dining',
    rating: 5,
    price: 'BD 8-18 per person',
    cuisine: 'Modern Thai',
    description: 'Thai Lounge has built a devoted following across its multiple locations in Bahrain thanks to consistent quality and generous portions. The contemporary ambiance makes it perfect for casual dining, whether you\'re with family, friends, or solo. The menu covers all Thai favorites with a modern twist, and the kitchen caters well to various spice preferences. Their lunch specials offer excellent value for those seeking quality Thai food during the day.',
    specialties: ['Green Curry', 'Pad See Ew', 'Spring Rolls', 'Tom Kha Gai', 'Thai Noodles'],
    atmosphere: 'Modern casual with vibrant Thai-inspired décor',
    hours: 'Daily 11AM-11PM',
    reservation: 'Walk-in friendly',
    bestFor: 'Families, mall dining, casual lunches, consistent quality',
    mustTry: 'Green Curry with Chicken, Pad See Ew, Fresh spring rolls, Thai iced coffee',
  },
  {
    name: 'Monsoon',
    slug: 'monsoon-bahrain',
    location: 'InterContinental Regency',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 18-35 per person',
    cuisine: 'Pan-Asian / Thai',
    description: 'Set within the prestigious InterContinental Regency, Monsoon offers an upscale Pan-Asian experience with Thai cuisine taking center stage. The sophisticated ambiance combines modern elegance with subtle Asian touches, creating the perfect backdrop for a memorable dining experience. The kitchen team brings together authentic techniques with premium ingredients, resulting in Thai dishes that satisfy purists while appealing to broader palates.',
    specialties: ['Signature Thai Curries', 'Wok-fried dishes', 'Seafood specials', 'Premium Pad Thai', 'Asian fusion desserts'],
    atmosphere: 'Luxurious hotel dining with Asian-inspired modern design',
    hours: 'Daily 12PM-3PM, 7PM-11PM',
    reservation: 'Highly recommended',
    bestFor: 'Business dinners, celebrations, hotel guests, refined Thai experience',
    mustTry: 'Signature Red Curry, Prawns in tamarind sauce, Coconut soup, Black rice pudding',
  },
  {
    name: 'Lanterns Thai',
    slug: 'lanterns-ritz-carlton',
    location: 'Ritz-Carlton, Seef',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 20-40 per person',
    cuisine: 'Thai & Asian',
    description: 'Located within the luxurious Ritz-Carlton Bahrain, Lanterns offers a stunning setting for Thai and Asian cuisine. The beautiful outdoor terrace with views of the lagoon creates an unforgettable dining atmosphere. The Thai menu features classic dishes prepared with premium ingredients and authentic techniques. Whether you choose the elegant indoor seating or the romantic terrace, Lanterns delivers a world-class Thai dining experience.',
    specialties: ['Terrace dining', 'Premium Thai curries', 'Fresh seafood', 'Authentic noodles', 'Thai desserts'],
    atmosphere: 'Elegant Ritz-Carlton setting with stunning terrace views',
    hours: 'Daily 12PM-11PM',
    reservation: 'Essential for terrace seating',
    bestFor: 'Romantic dinners, special occasions, outdoor dining, hotel guests',
    mustTry: 'Yellow Curry with Lobster, Tom Yum with fresh prawns, Mango sticky rice',
  },
  {
    name: 'Krua Thai',
    slug: 'krua-thai-juffair',
    location: 'Juffair',
    type: 'Casual Dining',
    rating: 4,
    price: 'BD 6-12 per person',
    cuisine: 'Authentic Thai',
    description: 'Krua Thai brings authentic home-style Thai cooking to Juffair at remarkably affordable prices. This no-frills gem has earned a loyal following among Thai food enthusiasts who value authenticity over ambiance. The owners source ingredients carefully to ensure genuine Thai flavors, and the kitchen doesn\'t shy away from proper spice levels. For those seeking the real taste of Thailand without hotel prices, Krua Thai delivers consistently.',
    specialties: ['Street-style Pad Thai', 'Authentic curries', 'Papaya salad', 'Basil stir-fry', 'Thai soups'],
    atmosphere: 'Simple and authentic neighborhood Thai restaurant',
    hours: 'Daily 11AM-10:30PM',
    reservation: 'Usually walk-in friendly',
    bestFor: 'Authentic Thai cravings, budget dining, spice lovers, takeaway',
    mustTry: 'Som Tam (papaya salad), Pad Krapow, Boat noodles, Green curry',
  },
  {
    name: 'Bangkok Bites',
    slug: 'bangkok-bites-bahrain',
    location: 'Manama',
    type: 'Street Food Style',
    rating: 4,
    price: 'BD 4-10 per person',
    cuisine: 'Thai Street Food',
    description: 'Bangkok Bites captures the vibrant energy and bold flavors of Thailand\'s famous street food scene. The casual setting recreates the atmosphere of a Bangkok street stall, complete with quick service and authentic flavors. Dishes are prepared fresh to order, often with the wok-hei (breath of the wok) that defines great Thai street cooking. For an affordable taste of Thailand that doesn\'t compromise on authenticity, Bangkok Bites is a top choice.',
    specialties: ['Street-style noodles', 'Satay skewers', 'Quick wok dishes', 'Thai snacks', 'Fresh juices'],
    atmosphere: 'Casual street food vibes with quick service',
    hours: 'Daily 10AM-11PM',
    reservation: 'Not required',
    bestFor: 'Quick Thai fix, budget meals, late-night cravings, takeaway',
    mustTry: 'Chicken satay, Pad Thai, Thai boat noodles, Fried rice with basil',
  },
  {
    name: 'Blue Thai',
    slug: 'blue-thai-seef',
    location: 'Seef District',
    type: 'Casual Dining',
    rating: 4,
    price: 'BD 8-15 per person',
    cuisine: 'Contemporary Thai',
    description: 'Blue Thai offers a contemporary take on Thai cuisine in a stylish Seef location. The restaurant balances authenticity with modern presentation, appealing to both Thai food enthusiasts and newcomers alike. The menu features familiar favorites alongside creative specialties that showcase the kitchen\'s skill. The vibrant décor and welcoming atmosphere make it ideal for group gatherings and family dinners.',
    specialties: ['Modern presentations', 'Classic curries', 'Fresh salads', 'Seafood dishes', 'Vegetarian Thai'],
    atmosphere: 'Contemporary and vibrant with stylish touches',
    hours: 'Daily 11:30AM-11PM',
    reservation: 'Recommended for groups',
    bestFor: 'Groups, family dining, modern Thai experience, Seef location',
    mustTry: 'Panang Curry, Tom Kha, Crispy prawn cakes, Thai fish cakes',
  },
  {
    name: 'Nara Thai',
    slug: 'nara-thai-bahrain',
    location: 'Riffa / Isa Town',
    type: 'Casual Dining',
    rating: 4,
    price: 'BD 5-12 per person',
    cuisine: 'Traditional Thai',
    description: 'Serving the communities of Riffa and Isa Town, Nara Thai brings authentic Thai flavors to areas outside Manama. The restaurant has become a local favorite for its consistent quality and reasonable prices. The menu covers all the essential Thai dishes with particular strength in noodle dishes and curries. For residents in the southern governorates seeking quality Thai food, Nara Thai is the go-to destination.',
    specialties: ['Noodle dishes', 'Regional curries', 'Fried rice varieties', 'Thai appetizers', 'Set meals'],
    atmosphere: 'Welcoming local restaurant with comfortable seating',
    hours: 'Daily 11AM-11PM',
    reservation: 'Usually walk-in friendly',
    bestFor: 'Riffa residents, family meals, consistent Thai food, value',
    mustTry: 'Drunken noodles, Massaman Beef, Thai fried rice, Red curry',
  },
  {
    name: 'Siam Kitchen',
    slug: 'siam-kitchen-bahrain',
    location: 'Gudaibiya',
    type: 'Budget',
    rating: 4,
    price: 'BD 3-8 per person',
    cuisine: 'Authentic Thai',
    description: 'Siam Kitchen proves that excellent Thai food doesn\'t require a premium price tag. This small but mighty restaurant serves surprisingly authentic dishes at budget-friendly prices. Run by Thai nationals, the kitchen maintains genuine flavors and proper spice levels. The humble setting attracts those in the know who prioritize taste over ambiance. For the best value Thai food in Bahrain, Siam Kitchen is hard to beat.',
    specialties: ['Affordable curries', 'Authentic spice levels', 'Fresh noodles', 'Traditional soups', 'Value meals'],
    atmosphere: 'Simple, no-frills authentic Thai eatery',
    hours: 'Daily 10AM-10PM',
    reservation: 'Not required',
    bestFor: 'Budget dining, authentic experience, Thai community favorite, takeaway',
    mustTry: 'Green curry, Pad Krapow, Tom Yum, Thai tea',
  },
  {
    name: 'Saffron Thai',
    slug: 'saffron-thai-diplomat',
    location: 'Diplomat Radisson Blu',
    type: 'Fine Dining',
    rating: 4,
    price: 'BD 15-28 per person',
    cuisine: 'Premium Thai',
    description: 'Located in the Diplomat Radisson Blu Hotel, Saffron Thai offers refined Thai cuisine in an elegant hotel setting. The restaurant combines traditional Thai flavors with contemporary presentation, creating dishes that are both authentic and visually stunning. The sophisticated atmosphere makes it ideal for business dining or special celebrations. The extensive menu spans Thailand\'s diverse regional cuisines.',
    specialties: ['Hotel Thai dining', 'Business lunches', 'Thai tasting menus', 'Premium ingredients', 'Extensive wine list'],
    atmosphere: 'Elegant hotel restaurant with refined ambiance',
    hours: 'Daily 12PM-3PM, 7PM-11PM',
    reservation: 'Recommended',
    bestFor: 'Business entertaining, hotel guests, refined Thai experience',
    mustTry: 'Tasting menu, Signature curries, Grilled seafood, Mango desserts',
  },
  {
    name: 'Thai Express',
    slug: 'thai-express-bahrain',
    location: 'Multiple Locations',
    type: 'Fast Casual',
    rating: 3,
    price: 'BD 4-9 per person',
    cuisine: 'Quick Thai',
    description: 'Part of the international chain, Thai Express offers convenient Thai food in shopping malls across Bahrain. While not as authentic as specialty restaurants, it provides a reliable option for quick Thai cravings during shopping trips. The menu covers familiar favorites in consistent quality across locations. For families with kids or those seeking a fast but flavorful meal, Thai Express delivers convenience and consistency.',
    specialties: ['Quick service', 'Mall locations', 'Family-friendly', 'Consistent quality', 'Set meals'],
    atmosphere: 'Fast casual mall dining with efficient service',
    hours: 'Mall hours (typically 10AM-10PM)',
    reservation: 'Not required',
    bestFor: 'Mall shoppers, families, quick meals, convenient locations',
    mustTry: 'Pad Thai, Green Curry Rice, Spring rolls, Thai iced tea',
  },
  {
    name: 'Elephant Thai',
    slug: 'elephant-thai-bahrain',
    location: 'Zinj',
    type: 'Casual Dining',
    rating: 4,
    price: 'BD 6-14 per person',
    cuisine: 'Traditional Thai',
    description: 'Elephant Thai has carved out a reputation for authentic Thai flavors in the Zinj neighborhood. The restaurant focuses on traditional recipes prepared with care and attention to detail. The menu features dishes from across Thailand, with particular expertise in central Thai cuisine. The warm, welcoming atmosphere and attentive service add to the overall experience.',
    specialties: ['Central Thai dishes', 'Fresh ingredients', 'Traditional recipes', 'Family portions', 'Vegetarian options'],
    atmosphere: 'Cozy neighborhood Thai restaurant with warm hospitality',
    hours: 'Daily 11:30AM-11PM',
    reservation: 'Recommended for dinner',
    bestFor: 'Neighborhood dining, authentic Thai, families, vegetarians',
    mustTry: 'Yellow Curry, Pad Woon Sen, Thai basil chicken, Coconut soup',
  },
];

const restaurantsByCategory = [
  { category: 'Fine Dining', picks: ['Talay Thai', 'Monsoon', 'Lanterns Thai'] },
  { category: 'Best Value', picks: ['Siam Kitchen', 'Bangkok Bites', 'Krua Thai'] },
  { category: 'Best Curries', picks: ['Talay Thai', 'Thai Lounge', 'Elephant Thai'] },
  { category: 'Spice Lovers', picks: ['Krua Thai', 'Siam Kitchen', 'Bangkok Bites'] },
  { category: 'Best for Groups', picks: ['Thai Lounge', 'Blue Thai', 'Nara Thai'] },
  { category: 'Outdoor Dining', picks: ['Lanterns Thai', 'Monsoon', 'Talay Thai'] },
];

const dishes = [
  { dish: 'Pad Thai', description: 'Stir-fried rice noodles with tamarind, peanuts, and lime', where: 'Talay Thai, Thai Lounge, Krua Thai' },
  { dish: 'Tom Yum Goong', description: 'Spicy and sour soup with prawns and aromatic herbs', where: 'Talay Thai, Monsoon, Lanterns' },
  { dish: 'Green Curry', description: 'Creamy coconut curry with Thai basil and chilies', where: 'Thai Lounge, Blue Thai, Siam Kitchen' },
  { dish: 'Massaman Curry', description: 'Rich curry with peanuts, potatoes, and warm spices', where: 'Talay Thai, Nara Thai, Elephant Thai' },
  { dish: 'Som Tam', description: 'Spicy green papaya salad with lime and chilies', where: 'Krua Thai, Bangkok Bites, Siam Kitchen' },
  { dish: 'Pad Krapow', description: 'Stir-fried meat with holy basil and chilies', where: 'Krua Thai, Siam Kitchen, Bangkok Bites' },
  { dish: 'Tom Kha Gai', description: 'Creamy coconut soup with chicken and galangal', where: 'Thai Lounge, Blue Thai, Talay Thai' },
  { dish: 'Mango Sticky Rice', description: 'Sweet glutinous rice with fresh mango and coconut cream', where: 'Talay Thai, Monsoon, Lanterns' },
];

const tips = [
  {
    title: 'Know Your Spice Level',
    content: 'Thai restaurants often ask about spice preferences. "Thai spicy" is usually much hotter than "medium." When in doubt, start mild and add chili flakes.',
  },
  {
    title: 'Balance Your Order',
    content: 'A proper Thai meal includes soup, curry, stir-fry, and rice. Mix wet and dry dishes, and include something fresh like a salad.',
  },
  {
    title: 'Try Jasmine Rice',
    content: 'Fragrant jasmine rice is the traditional accompaniment for Thai curries and stir-fries. Sticky rice pairs best with Northern and Isaan dishes.',
  },
  {
    title: 'Share Family Style',
    content: 'Thai dining is communal. Order several dishes to share and eat with a spoon and fork (not chopsticks for Thai food).',
  },
  {
    title: 'Lunch Specials',
    content: 'Many Thai restaurants offer excellent lunch deals with curry and rice combos at reduced prices. Great for trying new dishes affordably.',
  },
  {
    title: 'Fresh Herbs Matter',
    content: 'The best Thai dishes feature fresh lemongrass, galangal, kaffir lime, and Thai basil. These aromatics define authentic Thai flavor.',
  },
];

const faqs = [
  {
    q: 'What is the best Thai restaurant in Bahrain for authentic cuisine?',
    a: 'Talay Thai in Adliya is widely considered Bahrain\'s best Thai restaurant for authentic cuisine, with skilled Thai chefs preparing traditional dishes. For budget-friendly authenticity, Krua Thai in Juffair and Siam Kitchen in Gudaibiya offer genuine Thai flavors at affordable prices. These restaurants are favorites among the Thai community in Bahrain.',
  },
  {
    q: 'Where can I find the best Pad Thai in Bahrain?',
    a: 'Talay Thai serves an exceptional Pad Thai with the perfect balance of sweet, sour, and savory. Thai Lounge across its multiple locations also delivers consistently good Pad Thai. For street-style authenticity, Krua Thai and Bangkok Bites prepare their Pad Thai in traditional wok style.',
  },
  {
    q: 'Are there affordable Thai restaurants in Bahrain?',
    a: 'Yes, several excellent Thai restaurants offer authentic food at budget prices. Siam Kitchen in Gudaibiya offers meals from BD 3-8. Bangkok Bites provides street-food style Thai from BD 4-10. Krua Thai in Juffair offers quality Thai from BD 6-12. These prove great Thai food doesn\'t require fine dining prices.',
  },
  {
    q: 'Which Thai restaurant in Bahrain is best for a date night?',
    a: 'Lanterns Thai at the Ritz-Carlton offers stunning terrace views and elegant ambiance perfect for romantic dining. Talay Thai in Adliya provides intimate fine dining with exceptional food. Monsoon at InterContinental Regency combines sophisticated atmosphere with premium Thai cuisine.',
  },
  {
    q: 'Do Thai restaurants in Bahrain offer vegetarian options?',
    a: 'Most Thai restaurants in Bahrain have vegetarian options, as Thai cuisine features many vegetable and tofu dishes. Thai Lounge, Blue Thai, and Elephant Thai have dedicated vegetarian menus. Tofu can substitute meat in most curries and stir-fries. Be sure to mention any dietary requirements as some dishes contain fish sauce.',
  },
];

export default function BestThaiRestaurantsBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-emerald-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Best Thai Restaurants Bahrain', url: 'https://www.bahrainnights.com/guides/best-thai-restaurants-bahrain' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-yellow-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium mb-4">
              🍜 Ultimate Restaurant Guide 2026
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-emerald-400 to-yellow-500 bg-clip-text text-transparent">
                Best Thai Restaurants
              </span>
              {' '}in Bahrain 2026
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From elegant fine dining at Talay Thai to authentic street food gems — 
              your complete guide to the best Thai restaurants, Pad Thai spots, and curry houses in the Kingdom of Bahrain.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated} | By <Link href="https://www.bahrainnights.com" className="text-emerald-400 hover:underline">BahrainNights.com</Link>
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Restaurants Reviewed', value: '30+', icon: Utensils },
              { label: 'Budget From', value: 'BD 3', icon: DollarSign },
              { label: 'Fine Dining Options', value: '4+', icon: Award },
              { label: 'Regional Styles', value: 'All Thailand', icon: Flame },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-emerald-400" />
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
              Thai cuisine has captured the hearts and taste buds of food lovers worldwide, and Bahrain offers 
              a remarkable selection of Thai restaurants ranging from luxurious hotel fine dining to humble 
              neighborhood gems run by Thai nationals. The kingdom&apos;s diverse dining scene includes authentic 
              establishments serving fiery curries and aromatic soups that transport you straight to Bangkok, 
              as well as contemporary restaurants offering refined interpretations of Thai classics.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mt-4">
              Whether you&apos;re craving the perfect Pad Thai with its harmonious blend of sweet, sour, and 
              savory notes, a warming bowl of Tom Yum that clears your sinuses, or a creamy green curry 
              fragrant with Thai basil, this comprehensive guide will help you navigate Bahrain&apos;s 
              Thai restaurant scene. From Seef to Juffair, Adliya to Riffa, we&apos;ve covered every corner 
              of the kingdom to bring you the definitive guide to Thai dining in Bahrain for 2026.
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
                <h3 className="font-semibold text-emerald-400 mb-2 text-sm">{cat.category}</h3>
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
          <h2 className="text-3xl font-bold mb-4 text-center">Top Thai Restaurants in Bahrain</h2>
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
                        <Link href={`/restaurants/${restaurant.slug}`} className="hover:text-emerald-400 transition-colors">
                          <h3 className="text-xl font-bold">{restaurant.name}</h3>
                        </Link>
                        <p className="text-emerald-400 text-sm flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {restaurant.location} • {restaurant.type}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex">
                          {[...Array(restaurant.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                          ))}
                        </div>
                        <span className="text-sm font-bold text-white">{restaurant.price}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-emerald-300 mb-2">{restaurant.cuisine}</p>
                    <p className="text-gray-300 mb-4">{restaurant.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {restaurant.specialties.map((s) => (
                        <span key={s} className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded">
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="bg-emerald-500/10 rounded-lg p-3">
                      <p className="text-sm">
                        <strong className="text-emerald-400">Must Try: </strong>
                        {restaurant.mustTry}
                      </p>
                    </div>
                  </div>
                  
                  <div className="lg:w-1/4 space-y-2 text-sm bg-black/20 rounded-xl p-4">
                    <p><strong className="text-gray-400">Atmosphere:</strong> {restaurant.atmosphere}</p>
                    <p><strong className="text-gray-400">Hours:</strong> {restaurant.hours}</p>
                    <p><strong className="text-gray-400">Reservations:</strong> {restaurant.reservation}</p>
                    <p className="text-emerald-400 italic pt-2">Best for: {restaurant.bestFor}</p>
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
          <h2 className="text-3xl font-bold mb-8 text-center">Must-Try Thai Dishes in Bahrain</h2>
          <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
            Essential dishes every Thai food lover should try, and where to find the best versions.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {dishes.map((dish) => (
              <div key={dish.dish} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-emerald-400 mb-1">{dish.dish}</h3>
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
          <h2 className="text-3xl font-bold mb-12 text-center">Thai Dining Tips in Bahrain</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tips.map((tip) => (
              <div key={tip.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-emerald-400 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-300">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events CTA */}
      <section className="py-12 px-4 bg-gradient-to-r from-emerald-500/20 to-yellow-500/20">
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
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-lg transition-colors"
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
              { title: 'Chinese Restaurants', href: '/guides/best-chinese-restaurants-bahrain', emoji: '🥡' },
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
                <span className="font-medium group-hover:text-emerald-400 transition-colors">
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
            Powered by <Link href="https://www.bahrainnights.com" className="text-emerald-400 hover:underline">BahrainNights.com</Link> — 
            Your ultimate guide to nightlife, dining, and entertainment in Bahrain.
          </p>
          <div className="flex justify-center gap-6 text-sm text-gray-500">
            <a href="https://www.eventsbahrain.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">EventsBahrain.com</a>
            <a href="https://www.cinematicwebworks.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">CinematicWebWorks.com</a>
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
            headline: 'Best Thai Restaurants in Bahrain 2026 | Top 12 Authentic Thai Dining',
            description: 'Complete guide to the best Thai restaurants in Bahrain, from fine dining to authentic budget-friendly options.',
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
              '@id': 'https://www.bahrainnights.com/guides/best-thai-restaurants-bahrain',
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
