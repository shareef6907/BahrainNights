import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Utensils, MapPin, Star,
  DollarSign, Flame, Award
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Best Thai Restaurants in Bahrain 2026 | Top 12 Thai Food & Street Eats',
  description: 'Discover the 12 best Thai restaurants in Bahrain for 2026. From authentic Pad Thai and Tom Yum to fine dining Thai experiences, find the perfect Thai restaurant in Manama, Seef & Juffair.',
  keywords: 'best Thai restaurants Bahrain 2026, Thai food Bahrain, Pad Thai Manama, Tom Yum soup Bahrain, Thai curry Bahrain, Thai street food Bahrain, authentic Thai Bahrain',
  openGraph: {
    title: 'Best Thai Restaurants in Bahrain 2026 | Top 12 Thai Food & Street Eats',
    description: 'Complete guide to the best Thai restaurants in Bahrain - from authentic street food to elegant dining.',
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
    name: 'Trader Vic\'s Mai Tai Lounge',
    slug: 'trader-vics-bahrain',
    location: 'Ritz-Carlton, Seef',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 20-40 per person',
    cuisine: 'Thai & Polynesian',
    description: 'While known for its Polynesian flair, Trader Vic\'s serves exceptional Thai dishes in an exotic tropical setting. The restaurant\'s skilled Thai chefs create authentic dishes with premium ingredients, from fragrant green curries to perfectly balanced Pad Thai. The sophisticated atmosphere makes it ideal for special occasions, while the extensive cocktail menu featuring mai tais and tropical drinks complements the bold Thai flavors perfectly.',
    specialties: ['Green curry', 'Pad Thai', 'Thai seafood', 'Cocktail pairings', 'Tropical ambiance'],
    atmosphere: 'Exotic Polynesian décor with island vibes and romantic lighting',
    hours: 'Daily 7PM-1AM',
    reservation: 'Recommended, especially weekends',
    bestFor: 'Date nights, celebrations, cocktail lovers, special occasions',
    mustTry: 'Green curry with prawns, Pad Thai, Mai Tai cocktails',
  },
  {
    name: 'Lanterns',
    slug: 'lanterns-ritz-carlton',
    location: 'Ritz-Carlton, Seef',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 18-35 per person',
    cuisine: 'Thai & Pan-Asian',
    description: 'Nestled within the luxurious Ritz-Carlton Bahrain, Lanterns offers an elegant Thai dining experience combined with stunning terrace views. The restaurant expertly prepares traditional Thai dishes using authentic spices and fresh ingredients. The open-air terrace overlooking the Arabian Gulf provides a magical setting for enjoying Tom Yum soup, aromatic curries, and classic Thai stir-fries while gentle sea breezes enhance the dining atmosphere.',
    specialties: ['Tom Yum soup', 'Massaman curry', 'Thai basil dishes', 'Terrace dining', 'Seafood specialties'],
    atmosphere: 'Elegant hotel dining with beautiful outdoor terrace and Gulf views',
    hours: 'Daily 12PM-11PM',
    reservation: 'Highly recommended for terrace seating',
    bestFor: 'Romantic dinners, business entertaining, hotel guests, sunset dining',
    mustTry: 'Tom Yum Goong, Massaman lamb curry, Mango sticky rice',
  },
  {
    name: 'Monsoon',
    slug: 'monsoon-seef',
    location: 'Seef District',
    type: 'Casual Fine Dining',
    rating: 5,
    price: 'BD 12-25 per person',
    cuisine: 'Thai & Asian Fusion',
    description: 'Monsoon has established itself as one of Bahrain\'s favorite destinations for authentic Thai cuisine. The restaurant strikes the perfect balance between traditional recipes and contemporary presentation, creating dishes that are both visually appealing and explosively flavorful. The stylish interior features Asian-inspired décor with warm wood tones and subtle lighting that creates an inviting atmosphere for both casual meals and celebrations.',
    specialties: ['Red curry', 'Pad Thai', 'Thai fish cakes', 'Spring rolls', 'Coconut-based desserts'],
    atmosphere: 'Contemporary Asian décor with sophisticated ambiance',
    hours: 'Daily 12PM-11:30PM',
    reservation: 'Recommended for dinner',
    bestFor: 'Family dinners, groups, regular Thai cravings, celebrations',
    mustTry: 'Red curry chicken, Tod Mun (fish cakes), Pad See Ew, Coconut ice cream',
  },
  {
    name: 'Silk Thai Restaurant',
    slug: 'silk-thai-juffair',
    location: 'Juffair',
    type: 'Casual Dining',
    rating: 4,
    price: 'BD 8-18 per person',
    cuisine: 'Authentic Thai',
    description: 'Silk Thai delivers consistently authentic Thai flavors in a comfortable, unpretentious setting. Run by a Thai family with decades of culinary experience, the restaurant serves dishes that taste like they\'re straight from the streets of Bangkok. The generous portions and reasonable prices have made it a favorite among locals and expats seeking genuine Thai food without the hotel price tag.',
    specialties: ['Authentic Thai curries', 'Som Tam (papaya salad)', 'Larb', 'Thai fried rice', 'Basil chicken'],
    atmosphere: 'Casual and family-friendly with traditional Thai touches',
    hours: 'Daily 11AM-11PM',
    reservation: 'Usually walk-in friendly',
    bestFor: 'Families, authentic flavors, regular visits, value dining',
    mustTry: 'Som Tam, Pad Krapow (basil chicken), Green curry, Thai iced tea',
  },
  {
    name: 'Thai Lounge',
    slug: 'thai-lounge-adliya',
    location: 'Adliya',
    type: 'Casual Dining',
    rating: 4,
    price: 'BD 10-20 per person',
    cuisine: 'Modern Thai',
    description: 'Located in the trendy Adliya district, Thai Lounge combines authentic Thai cooking with a modern lounge atmosphere. The restaurant caters to the area\'s vibrant nightlife crowd while maintaining serious culinary credentials. Whether you\'re looking for a pre-drinks dinner or a late-night Thai food fix, the kitchen delivers consistent quality and bold flavors.',
    specialties: ['Late-night Thai', 'Thai street food', 'Cocktails', 'Sharing platters', 'Vegetarian options'],
    atmosphere: 'Trendy lounge setting in the heart of Adliya nightlife',
    hours: 'Daily 12PM-12AM',
    reservation: 'Recommended on weekends',
    bestFor: 'Night owls, Adliya visitors, pre-drinks dining, groups',
    mustTry: 'Thai street food platter, Drunken noodles, Tom Kha Gai',
  },
  {
    name: 'Noodle Box',
    slug: 'noodle-box-bahrain',
    location: 'Multiple Locations',
    type: 'Fast Casual',
    rating: 4,
    price: 'BD 4-10 per person',
    cuisine: 'Thai Street Food',
    description: 'For quick, affordable Thai food that doesn\'t compromise on taste, Noodle Box is a reliable go-to. The menu features Thai favorites like Pad Thai, green curry, and stir-fried noodles served in generous portions perfect for a quick lunch or casual dinner. Multiple locations across Bahrain make it convenient for satisfying sudden Thai cravings anywhere in the kingdom.',
    specialties: ['Pad Thai', 'Noodle dishes', 'Quick service', 'Value meals', 'Takeaway-friendly'],
    atmosphere: 'Casual quick-service with modern design',
    hours: 'Daily 11AM-11PM',
    reservation: 'Not required',
    bestFor: 'Quick meals, lunch breaks, takeaway, budget dining',
    mustTry: 'Signature Pad Thai, Green curry noodles, Thai fried rice',
  },
  {
    name: 'Bushido',
    slug: 'bushido-gulf-hotel',
    location: 'Gulf Hotel, Adliya',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 25-50 per person',
    cuisine: 'Japanese & Thai Fusion',
    description: 'Bushido at the Gulf Hotel offers an upscale dining experience that artfully combines Thai and Japanese cuisines. The restaurant\'s Thai offerings are prepared with the same precision and premium ingredients as its Japanese dishes. The elegant setting features dramatic lighting and sophisticated décor that creates an atmosphere of modern Asian luxury.',
    specialties: ['Fusion dishes', 'Premium ingredients', 'Thai curries', 'Sushi-Thai combinations', 'Tasting menus'],
    atmosphere: 'Sleek, sophisticated Asian luxury dining',
    hours: 'Daily 7PM-11:30PM',
    reservation: 'Essential',
    bestFor: 'Special occasions, foodies, fusion lovers, business dinners',
    mustTry: 'Thai-Japanese fusion specials, Signature curry, Dessert selections',
  },
  {
    name: 'Wok Station',
    slug: 'wok-station-bahrain',
    location: 'Seef Mall',
    type: 'Fast Casual',
    rating: 4,
    price: 'BD 4-8 per person',
    cuisine: 'Thai Wok Dishes',
    description: 'Wok Station brings the excitement of Thai wok cooking to a casual mall setting. Watch as skilled chefs toss ingredients in flaming woks, creating fresh stir-fries and noodle dishes right before your eyes. The interactive experience and affordable prices make it particularly popular with families and shoppers looking for a satisfying meal break.',
    specialties: ['Live wok cooking', 'Custom stir-fries', 'Noodle dishes', 'Family-friendly', 'Mall convenience'],
    atmosphere: 'Open kitchen concept in bustling mall food court',
    hours: 'Daily 10AM-10PM',
    reservation: 'Not required',
    bestFor: 'Shoppers, families, quick bites, interactive dining',
    mustTry: 'Custom wok stir-fry, Pad Thai, Thai basil chicken rice',
  },
  {
    name: 'Mezzaluna',
    slug: 'mezzaluna-manama',
    location: 'Diplomatic Area',
    type: 'Fine Dining',
    rating: 4,
    price: 'BD 20-40 per person',
    cuisine: 'Italian & Thai',
    description: 'While primarily an Italian restaurant, Mezzaluna features an impressive selection of Thai dishes on its pan-Asian menu. The restaurant\'s Thai chef brings authentic flavors to classics like Tom Yum and Pad Thai, all served in an elegant setting with panoramic city views. Perfect for groups with mixed cuisine preferences.',
    specialties: ['Thai-Italian combination', 'City views', 'Business lunch', 'Private dining', 'Wine selection'],
    atmosphere: 'Elegant high-rise dining with stunning Manama views',
    hours: 'Daily 12PM-3PM, 7PM-11PM',
    reservation: 'Recommended',
    bestFor: 'Business lunches, mixed groups, view seekers, special events',
    mustTry: 'Tom Yum soup, Thai green curry, Combination dinner',
  },
  {
    name: 'Royal Thai',
    slug: 'royal-thai-bahrain',
    location: 'Gudaibiya',
    type: 'Budget',
    rating: 4,
    price: 'BD 4-9 per person',
    cuisine: 'Authentic Thai Street Food',
    description: 'Royal Thai is a hidden gem serving some of Bahrain\'s most authentic Thai street food at incredibly affordable prices. The small restaurant may lack fancy décor, but more than makes up for it with dishes that transport you straight to Bangkok\'s food markets. Thai expats and in-the-know locals flock here for genuine flavors that rival anything back home.',
    specialties: ['Street food authenticity', 'Budget prices', 'Thai expat favorite', 'Som Tam', 'Isaan dishes'],
    atmosphere: 'Simple no-frills setting focused purely on food',
    hours: 'Daily 10AM-10PM',
    reservation: 'Not required',
    bestFor: 'Budget dining, authentic seekers, Thai expats, adventurous eaters',
    mustTry: 'Som Tam Thai, Larb Moo, Khao Pad (fried rice), Thai soups',
  },
  {
    name: 'Benihana',
    slug: 'benihana-bahrain',
    location: 'Sheraton, Manama',
    type: 'Fine Dining',
    rating: 4,
    price: 'BD 18-35 per person',
    cuisine: 'Japanese & Thai',
    description: 'Famous for its theatrical teppanyaki cooking, Benihana also serves excellent Thai dishes for those seeking variety. The restaurant\'s Thai menu features well-executed classics prepared with the same attention to detail as their Japanese offerings. The fun, interactive atmosphere makes it perfect for celebrations and group dining.',
    specialties: ['Teppanyaki show', 'Thai side menu', 'Group dining', 'Celebrations', 'Entertainment'],
    atmosphere: 'Fun, theatrical dining with skilled chef performances',
    hours: 'Daily 12PM-3PM, 7PM-11PM',
    reservation: 'Highly recommended',
    bestFor: 'Celebrations, families, group outings, entertainment dining',
    mustTry: 'Thai curry alongside teppanyaki, Spring rolls, Pad Thai',
  },
  {
    name: 'Café Lilou',
    slug: 'cafe-lilou-adliya',
    location: 'Adliya',
    type: 'Café',
    rating: 4,
    price: 'BD 8-15 per person',
    cuisine: 'European & Thai',
    description: 'The beloved Café Lilou surprises diners with an excellent selection of Thai dishes alongside its famous French pastries and European fare. The Thai offerings are authentic and well-prepared, providing a refreshing change from the usual café menu. The charming courtyard setting makes it a delightful spot for a Thai lunch.',
    specialties: ['Unexpected Thai menu', 'Café ambiance', 'Outdoor seating', 'All-day dining', 'Desserts'],
    atmosphere: 'Charming European café with courtyard seating',
    hours: 'Daily 7AM-11PM',
    reservation: 'Walk-in friendly',
    bestFor: 'Café lovers, brunch, casual Thai lunch, mixed groups',
    mustTry: 'Thai green curry, Pad Thai, followed by French pastries',
  },
];

const restaurantsByCategory = [
  { category: 'Fine Dining', picks: ['Trader Vic\'s', 'Lanterns', 'Bushido'] },
  { category: 'Best Value', picks: ['Royal Thai', 'Noodle Box', 'Wok Station'] },
  { category: 'Best Pad Thai', picks: ['Monsoon', 'Silk Thai', 'Noodle Box'] },
  { category: 'Authentic', picks: ['Royal Thai', 'Silk Thai', 'Monsoon'] },
  { category: 'Best for Groups', picks: ['Benihana', 'Thai Lounge', 'Monsoon'] },
  { category: 'Late Night', picks: ['Thai Lounge', 'Trader Vic\'s', 'Noodle Box'] },
];

const dishes = [
  { dish: 'Pad Thai', description: 'Stir-fried rice noodles with tamarind, peanuts, and bean sprouts', where: 'Monsoon, Silk Thai, Noodle Box' },
  { dish: 'Tom Yum Goong', description: 'Hot and sour soup with prawns, lemongrass, and galangal', where: 'Lanterns, Silk Thai, Royal Thai' },
  { dish: 'Green Curry', description: 'Creamy coconut curry with Thai basil and green chilies', where: 'Trader Vic\'s, Monsoon, Lanterns' },
  { dish: 'Som Tam', description: 'Spicy green papaya salad with lime and dried shrimp', where: 'Royal Thai, Silk Thai, Thai Lounge' },
  { dish: 'Massaman Curry', description: 'Rich, mild curry with potatoes and roasted peanuts', where: 'Lanterns, Monsoon, Bushido' },
  { dish: 'Pad Krapow', description: 'Stir-fried meat with holy basil and fried egg', where: 'Silk Thai, Royal Thai, Thai Lounge' },
  { dish: 'Mango Sticky Rice', description: 'Sweet glutinous rice with fresh mango and coconut cream', where: 'Lanterns, Monsoon, Silk Thai' },
  { dish: 'Tom Kha Gai', description: 'Creamy coconut chicken soup with galangal', where: 'Thai Lounge, Silk Thai, Lanterns' },
];

const tips = [
  {
    title: 'Spice Levels',
    content: 'Thai food can be intensely spicy. Order "Thai spicy" only if you\'re experienced. Most restaurants will adjust to your preference — don\'t be shy to ask for mild.',
  },
  {
    title: 'Fresh Herbs Matter',
    content: 'Good Thai food depends on fresh herbs like Thai basil, lemongrass, and kaffir lime leaves. Restaurants using fresh ingredients will have notably better flavors.',
  },
  {
    title: 'Rice Pairing',
    content: 'Jasmine rice is essential with Thai curries — it absorbs the flavors perfectly. Some Isaan dishes pair better with sticky rice.',
  },
  {
    title: 'Balance is Key',
    content: 'Thai cuisine balances sweet, sour, salty, and spicy. A good dish will hit all four notes. Adjust with the condiments provided.',
  },
  {
    title: 'Fish Sauce is Essential',
    content: 'Fish sauce is the backbone of Thai cooking. Don\'t be put off by the smell — it adds umami depth that makes Thai food special.',
  },
  {
    title: 'Lunch Specials',
    content: 'Many Thai restaurants offer lunch sets with better value. A lunch Pad Thai or curry set can save you BD 5-10 compared to dinner.',
  },
];

const faqs = [
  {
    q: 'What is the best Thai restaurant in Bahrain for authentic flavors?',
    a: 'For the most authentic Thai flavors, Royal Thai in Gudaibiya is highly recommended by Thai expats. Silk Thai in Juffair also delivers genuine Thai taste at reasonable prices. Both restaurants are run by Thai families and serve dishes true to traditional recipes. For upscale authentic Thai, Lanterns at Ritz-Carlton offers refined Thai cuisine.',
  },
  {
    q: 'Where can I find the best Pad Thai in Bahrain?',
    a: 'Monsoon in Seef District is famous for its perfectly balanced Pad Thai with the right blend of tamarind, peanuts, and fresh ingredients. Silk Thai and Noodle Box also serve excellent versions. For quick and affordable Pad Thai, Noodle Box locations throughout Bahrain offer consistent quality at budget-friendly prices.',
  },
  {
    q: 'Are there Thai restaurants in Bahrain suitable for fine dining?',
    a: 'Yes, several excellent options exist. Lanterns at the Ritz-Carlton offers elegant Thai dining with terrace views. Trader Vic\'s combines Thai dishes with tropical elegance. Bushido at Gulf Hotel serves upscale Thai-Japanese fusion. These venues are perfect for special occasions and business entertaining.',
  },
  {
    q: 'What are the cheapest Thai restaurants in Bahrain?',
    a: 'Royal Thai in Gudaibiya offers authentic Thai street food from BD 4-9 per person. Noodle Box and Wok Station in various malls serve satisfying meals for BD 4-8. These budget-friendly options prove you don\'t need to spend much for delicious Thai food in Bahrain.',
  },
  {
    q: 'Which Thai restaurants in Bahrain are open late?',
    a: 'Thai Lounge in Adliya stays open until midnight, perfect for the nightlife district. Trader Vic\'s operates until 1 AM, making it ideal for late-night Thai cravings with cocktails. Monsoon and several Noodle Box locations also serve until 11-11:30 PM.',
  },
];

export default function BestThaiRestaurantsBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-green-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Best Thai Restaurants Bahrain', url: 'https://www.bahrainnights.com/guides/best-thai-restaurants-bahrain' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-yellow-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium mb-4">
              🍜 Ultimate Thai Food Guide 2026
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-green-400 to-yellow-500 bg-clip-text text-transparent">
                Best Thai Restaurants
              </span>
              {' '}in Bahrain 2026
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From authentic street food at Royal Thai to elegant dining at Lanterns — 
              your complete guide to the best Thai restaurants, Pad Thai spots, and curry houses in the Kingdom of Bahrain.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated} | By <Link href="https://www.bahrainnights.com" className="text-green-400 hover:underline">BahrainNights.com</Link>
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Restaurants Reviewed', value: '25+', icon: Utensils },
              { label: 'Budget From', value: 'BD 4', icon: DollarSign },
              { label: 'Fine Dining Options', value: '4+', icon: Award },
              { label: 'Spice Levels', value: 'All', icon: Flame },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-green-400" />
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
              Thai cuisine has captured the hearts of food lovers worldwide with its explosive flavors, aromatic herbs, 
              and perfect balance of sweet, sour, salty, and spicy elements. In Bahrain, the Thai food scene has 
              flourished to offer everything from humble street food experiences to sophisticated fine dining.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mt-4">
              Whether you&apos;re craving the tangy kick of authentic Tom Yum soup, the comforting warmth of green curry 
              with coconut milk, or the iconic Pad Thai that started a global food revolution, Bahrain&apos;s Thai 
              restaurants deliver authentic flavors that rival those found on the streets of Bangkok. This comprehensive 
              guide will help you navigate the kingdom&apos;s best Thai dining options for every occasion and budget.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mt-4">
              Thai cooking is an art form built on fresh ingredients — lemongrass, galangal, kaffir lime leaves, 
              Thai basil, and bird&apos;s eye chilies combine to create dishes that are at once complex and harmonious. 
              The best Thai restaurants in Bahrain respect these traditions while adapting to local preferences, 
              offering spice levels from mild to authentic Thai heat that will make your eyes water in the best possible way.
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
                <h3 className="font-semibold text-green-400 mb-2 text-sm">{cat.category}</h3>
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
                        <Link href={`/restaurants/${restaurant.slug}`} className="hover:text-green-400 transition-colors">
                          <h3 className="text-xl font-bold">{restaurant.name}</h3>
                        </Link>
                        <p className="text-green-400 text-sm flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {restaurant.location} • {restaurant.type}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex">
                          {[...Array(restaurant.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-green-400 fill-green-400" />
                          ))}
                        </div>
                        <span className="text-sm font-bold text-white">{restaurant.price}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-green-300 mb-2">{restaurant.cuisine}</p>
                    <p className="text-gray-300 mb-4">{restaurant.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {restaurant.specialties.map((s) => (
                        <span key={s} className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="bg-green-500/10 rounded-lg p-3">
                      <p className="text-sm">
                        <strong className="text-green-400">Must Try: </strong>
                        {restaurant.mustTry}
                      </p>
                    </div>
                  </div>
                  
                  <div className="lg:w-1/4 space-y-2 text-sm bg-black/20 rounded-xl p-4">
                    <p><strong className="text-gray-400">Atmosphere:</strong> {restaurant.atmosphere}</p>
                    <p><strong className="text-gray-400">Hours:</strong> {restaurant.hours}</p>
                    <p><strong className="text-gray-400">Reservations:</strong> {restaurant.reservation}</p>
                    <p className="text-green-400 italic pt-2">Best for: {restaurant.bestFor}</p>
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
                <h3 className="font-bold text-green-400 mb-1">{dish.dish}</h3>
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
                <h3 className="font-bold text-green-400 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-300">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events CTA */}
      <section className="py-12 px-4 bg-gradient-to-r from-green-500/20 to-yellow-500/20">
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
              className="px-6 py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded-lg transition-colors"
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
              { title: 'Indian', href: '/guides/best-indian-restaurants-bahrain', emoji: '🍛' },
              { title: 'Japanese & Sushi', href: '/guides/best-japanese-restaurants-bahrain', emoji: '🍣' },
              { title: 'Chinese', href: '/guides/best-chinese-restaurants-bahrain', emoji: '🥡' },
              { title: 'Seafood', href: '/guides/best-seafood-bahrain', emoji: '🦐' },
              { title: 'Arabic & Lebanese', href: '/guides/best-arabic-restaurants-bahrain', emoji: '🥙' },
              { title: 'Italian', href: '/guides/best-italian-restaurants-bahrain', emoji: '🍝' },
              { title: 'All Restaurants', href: '/guides/restaurants', emoji: '🍽️' },
              { title: 'Best Buffets', href: '/guides/buffets', emoji: '🥘' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group"
              >
                <span className="text-2xl mb-2 block">{guide.emoji}</span>
                <span className="font-medium group-hover:text-green-400 transition-colors">
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
            Powered by <Link href="https://www.bahrainnights.com" className="text-green-400 hover:underline">BahrainNights.com</Link> — 
            Your ultimate guide to nightlife, dining, and entertainment in Bahrain.
          </p>
          <div className="flex justify-center gap-6 text-sm text-gray-500">
            <a href="https://www.eventsbahrain.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">EventsBahrain.com</a>
            <a href="https://www.cinematicwebworks.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">CinematicWebWorks.com</a>
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
            headline: 'Best Thai Restaurants in Bahrain 2026 | Top 12 Thai Food & Street Eats',
            description: 'Complete guide to the best Thai restaurants in Bahrain, from authentic street food to elegant fine dining options.',
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
