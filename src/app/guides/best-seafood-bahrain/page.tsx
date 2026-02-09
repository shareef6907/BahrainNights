import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Utensils, MapPin, Star,
  DollarSign, Waves, Award
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Best Seafood Restaurants in Bahrain 2026 | Top 15 Fish & Oyster Bars',
  description: 'Discover the 15 best seafood restaurants in Bahrain for 2026. From fresh hammour and prawns to oyster bars and beachfront dining, find the perfect seafood spot in Manama, Seef & Amwaj.',
  keywords: 'best seafood restaurants Bahrain 2026, seafood Bahrain, fresh fish Bahrain, hammour Bahrain, oyster bar Manama, lobster Bahrain, beachfront dining Bahrain',
  openGraph: {
    title: 'Best Seafood Restaurants in Bahrain 2026 | Top 15 Fish & Oyster Bars',
    description: 'Complete guide to the best seafood restaurants in Bahrain - from fresh catches to fine dining.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/best-seafood-bahrain',
    images: [{ url: 'https://www.bahrainnights.com/images/guides/seafood-restaurants-bahrain.jpg', width: 1200, height: 630, alt: 'Best Seafood Restaurants in Bahrain' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Seafood Restaurants in Bahrain 2026',
    description: 'Your ultimate guide to seafood dining in Bahrain.',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/best-seafood-bahrain',
  },
};

const restaurants = [
  {
    name: 'CUT by Wolfgang Puck',
    slug: 'cut-wolfgang-puck-bahrain',
    location: 'Four Seasons, Bahrain Bay',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 35-70 per person',
    cuisine: 'Premium Seafood & Steaks',
    description: 'While renowned for its steaks, CUT delivers equally impressive seafood dishes that showcase the finest ingredients prepared with Wolfgang Puck\'s signature flair. The seafood towers, fresh oysters, and expertly prepared fish dishes compete with the best in the region. The stunning Four Seasons setting with bay views creates an unforgettable fine dining experience where every detail is meticulously curated.',
    specialties: ['Seafood towers', 'Fresh oysters', 'Whole fish', 'Premium seafood platters', 'Bay views'],
    atmosphere: 'Ultra-luxurious with panoramic Bahrain Bay views',
    hours: 'Daily 6PM-11PM',
    reservation: 'Essential',
    bestFor: 'Special celebrations, impressive entertaining, luxury seekers, romantic dinners',
    mustTry: 'Seafood tower, Oysters on ice, Maine lobster, Chilean sea bass',
  },
  {
    name: 'Bushido',
    slug: 'bushido-gulf-hotel',
    location: 'Gulf Hotel, Adliya',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 25-50 per person',
    cuisine: 'Japanese Seafood',
    description: 'Bushido showcases the art of Japanese seafood preparation in Bahrain\'s most sophisticated Asian setting. From pristine sashimi to elaborate seafood tempura, every dish demonstrates the delicate touch and premium quality that define Japanese cuisine. The sleek, dramatic interior creates the perfect atmosphere for experiencing seafood elevated to an art form.',
    specialties: ['Sashimi', 'Sushi omakase', 'Seafood tempura', 'Japanese lobster', 'Premium fish'],
    atmosphere: 'Sleek Japanese luxury with dramatic lighting',
    hours: 'Daily 7PM-11:30PM',
    reservation: 'Essential',
    bestFor: 'Sushi lovers, Japanese cuisine enthusiasts, special occasions, foodies',
    mustTry: 'Omakase selection, Lobster tempura, Black cod, Fresh sashimi platter',
  },
  {
    name: 'La Mer',
    slug: 'la-mer-ritz-carlton',
    location: 'Ritz-Carlton, Seef',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 25-50 per person',
    cuisine: 'French Mediterranean Seafood',
    description: 'La Mer at the Ritz-Carlton is dedicated entirely to the treasures of the sea, presenting French-Mediterranean seafood with elegance and precision. The restaurant features a raw bar showcasing the freshest catches, while the main menu offers classic preparations elevated by premium ingredients. The romantic terrace with views of the Arabian Gulf makes every meal feel like a coastal escape.',
    specialties: ['Raw bar', 'Fresh oysters', 'Grilled whole fish', 'Bouillabaisse', 'Terrace dining'],
    atmosphere: 'Elegant French nautical theme with Gulf views',
    hours: 'Daily 7PM-11PM',
    reservation: 'Highly recommended',
    bestFor: 'Romantic dinners, seafood purists, special occasions, hotel guests',
    mustTry: 'Oyster selection, Bouillabaisse, Grilled hammour, Seafood risotto',
  },
  {
    name: 'Masso',
    slug: 'masso-seef',
    location: 'ART Rotana, Amwaj',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 20-40 per person',
    cuisine: 'Italian Seafood',
    description: 'Masso brings Italian coastal cuisine to Bahrain with a menu that celebrates Mediterranean seafood traditions. The restaurant\'s skilled Italian chefs prepare fresh catches using time-honored techniques, from simple grilled preparations that let the fish shine to rich seafood pastas and risottos. The sleek waterfront setting on Amwaj Islands provides a fitting backdrop for Mediterranean flavors.',
    specialties: ['Seafood pasta', 'Grilled fish', 'Italian risotto', 'Mediterranean preparations', 'Waterfront views'],
    atmosphere: 'Contemporary Italian with Amwaj waterfront views',
    hours: 'Daily 12PM-11PM',
    reservation: 'Recommended for dinner',
    bestFor: 'Italian food lovers, waterfront dining, business lunches, romantic evenings',
    mustTry: 'Seafood linguine, Grilled sea bream, Lobster risotto, Fritto misto',
  },
  {
    name: 'Ocean',
    slug: 'ocean-atlantis',
    location: 'Atlantis, The Palm (day trip from Bahrain)',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 30-60 per person',
    cuisine: 'Contemporary Seafood',
    description: 'For those willing to make the journey to Dubai, Ocean at Atlantis represents the pinnacle of seafood dining in the Gulf region. The restaurant\'s spectacular setting with aquarium views, combined with sustainably sourced seafood prepared by acclaimed chefs, creates a once-in-a-lifetime dining experience that seafood enthusiasts should not miss.',
    specialties: ['Sustainable seafood', 'Aquarium views', 'Tasting menus', 'Premium catches', 'Chef\'s specials'],
    atmosphere: 'Spectacular with floor-to-ceiling aquarium views',
    hours: 'Daily 7PM-11PM',
    reservation: 'Essential - book weeks ahead',
    bestFor: 'Special occasions, bucket list dining, seafood connoisseurs',
    mustTry: 'Chef\'s tasting menu, Local catches, Premium oysters',
  },
  {
    name: 'Meisei',
    slug: 'meisei-bahrain',
    location: 'Bahrain Bay',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 25-45 per person',
    cuisine: 'Japanese Seafood & Sushi',
    description: 'Meisei elevates Japanese seafood to an art form in its elegant Bahrain Bay location. The master sushi chefs work with the finest imported fish to create sushi and sashimi that rivals the best in Tokyo. Beyond raw preparations, the menu features creative Japanese seafood dishes that balance tradition with innovation.',
    specialties: ['Omakase sushi', 'Premium sashimi', 'Japanese seafood', 'Wagyu and seafood', 'Private rooms'],
    atmosphere: 'Sophisticated Japanese minimalism with bay views',
    hours: 'Daily 12PM-3PM, 7PM-11PM',
    reservation: 'Highly recommended',
    bestFor: 'Sushi connoisseurs, business entertaining, special celebrations, Japanese cuisine lovers',
    mustTry: 'Omakase experience, Otoro sashimi, King crab, Unagi preparations',
  },
  {
    name: 'Fish Market',
    slug: 'fish-market-intercontinental',
    location: 'InterContinental, Manama',
    type: 'Fine Dining',
    rating: 4,
    price: 'BD 20-40 per person',
    cuisine: 'Interactive Seafood',
    description: 'Fish Market offers a unique interactive dining concept where guests select their seafood from an ice display and choose how it\'s prepared. This market-style approach ensures freshness while giving diners control over their meal. The theatrical cooking stations and wide variety of catches make every visit an adventure.',
    specialties: ['Pick your fish', 'Custom cooking styles', 'Ice display', 'Live cooking', 'Variety of catches'],
    atmosphere: 'Interactive market concept with open kitchen',
    hours: 'Daily 7PM-11PM',
    reservation: 'Recommended',
    bestFor: 'Interactive experience, families, groups, fresh fish lovers',
    mustTry: 'Market fresh selection, Grilled hammour, Tiger prawns, Mixed seafood platter',
  },
  {
    name: 'Bahrain Fish House',
    slug: 'bahrain-fish-house',
    location: 'Multiple Locations',
    type: 'Casual Dining',
    rating: 4,
    price: 'BD 8-18 per person',
    cuisine: 'Traditional Bahraini Seafood',
    description: 'Bahrain Fish House celebrates the kingdom\'s maritime heritage with traditional Bahraini seafood preparations at accessible prices. The menu features local catches like hammour, safi, and shrimp prepared in authentic Gulf styles — grilled with samak mashwi spices, fried to golden perfection, or simmered in aromatic stews. It\'s where locals go for genuine taste of Bahraini seafood.',
    specialties: ['Local catches', 'Bahraini preparations', 'Grilled fish', 'Traditional recipes', 'Value pricing'],
    atmosphere: 'Casual traditional with warm hospitality',
    hours: 'Daily 11AM-11PM',
    reservation: 'Usually walk-in friendly',
    bestFor: 'Authentic Bahraini food, families, locals, value seekers',
    mustTry: 'Hammour grilled, Machboos samak, Fried safi, Shrimp bahraini-style',
  },
  {
    name: 'Re/Asian Cuisine',
    slug: 're-asian-cuisine',
    location: 'Four Seasons, Bahrain Bay',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 25-45 per person',
    cuisine: 'Pan-Asian Seafood',
    description: 'Re/Asian brings diverse Asian seafood traditions under one roof at the Four Seasons. The menu travels from Japanese sushi bars to Thai coastal kitchens to Chinese seafood restaurants, offering the best of each tradition. The stunning waterfront setting and sophisticated service make it ideal for those wanting variety without compromising on quality.',
    specialties: ['Pan-Asian variety', 'Sushi and sashimi', 'Thai seafood', 'Chinese preparations', 'Waterfront dining'],
    atmosphere: 'Contemporary Asian elegance with bay views',
    hours: 'Daily 12PM-11PM',
    reservation: 'Recommended',
    bestFor: 'Varied tastes, groups, Asian seafood lovers, impressive dining',
    mustTry: 'Mixed seafood platter, Thai-style prawns, Chinese-style lobster, Sashimi selection',
  },
  {
    name: 'La Vinoteca',
    slug: 'la-vinoteca-seef',
    location: 'Seef District',
    type: 'Fine Dining',
    rating: 4,
    price: 'BD 20-35 per person',
    cuisine: 'Spanish Seafood',
    description: 'La Vinoteca brings Spanish coastal cuisine to Bahrain with an impressive selection of Mediterranean seafood tapas and mains. The restaurant excels in preparations like gambas al ajillo, paella loaded with shellfish, and simply grilled whole fish. An excellent wine list complements the bold Spanish flavors, creating a true bodega atmosphere.',
    specialties: ['Seafood tapas', 'Paella', 'Gambas al ajillo', 'Spanish wines', 'Mediterranean flavors'],
    atmosphere: 'Warm Spanish bodega ambiance',
    hours: 'Daily 12PM-12AM',
    reservation: 'Recommended for dinner',
    bestFor: 'Spanish food lovers, wine enthusiasts, tapas sharing, groups',
    mustTry: 'Seafood paella, Gambas al ajillo, Pulpo a la gallega, Grilled sea bass',
  },
  {
    name: 'Captain\'s Cabin',
    slug: 'captains-cabin-bahrain',
    location: 'Budaiya Beach',
    type: 'Casual Dining',
    rating: 4,
    price: 'BD 10-20 per person',
    cuisine: 'Beachfront Seafood',
    description: 'Captain\'s Cabin offers the quintessential Bahrain beachfront seafood experience. Located right on Budaiya Beach, the restaurant serves fresh catches in a relaxed setting where the sound of waves accompanies your meal. The simple preparations let the freshness of the fish shine, while the sunset views provide entertainment that no indoor restaurant can match.',
    specialties: ['Beach location', 'Fresh catches', 'Sunset dining', 'Casual atmosphere', 'Grilled seafood'],
    atmosphere: 'Laid-back beachfront with sunset views',
    hours: 'Daily 12PM-11PM',
    reservation: 'Recommended for sunset times',
    bestFor: 'Beach lovers, casual outings, sunsets, families',
    mustTry: 'Grilled hammour, Mixed seafood grill, Fried shrimp, Fresh fish of the day',
  },
  {
    name: 'Bubba Gump Shrimp',
    slug: 'bubba-gump-bahrain',
    location: 'The Avenues, Manama',
    type: 'Casual Dining',
    rating: 3,
    price: 'BD 8-15 per person',
    cuisine: 'American Seafood',
    description: 'The globally recognized Bubba Gump brings its American Gulf Coast seafood and Forrest Gump theming to Bahrain. While not fine dining, the restaurant delivers generous portions of shrimp prepared every way imaginable — fried, grilled, scampi-style, and more. The fun atmosphere and movie memorabilia make it popular with families and tourists.',
    specialties: ['Shrimp dishes', 'American portions', 'Family-friendly', 'Movie theme', 'Casual fun'],
    atmosphere: 'Fun Forrest Gump-themed with American casual vibe',
    hours: 'Daily 11AM-11PM',
    reservation: 'Usually walk-in friendly',
    bestFor: 'Families with kids, tourists, casual fun, shrimp lovers',
    mustTry: 'Bucket of Boat Trash, Shrimper\'s Heaven, Coconut shrimp, Fish and chips',
  },
  {
    name: 'Plums',
    slug: 'plums-ritz-carlton',
    location: 'Ritz-Carlton, Seef',
    type: 'Fine Dining',
    rating: 4,
    price: 'BD 20-40 per person',
    cuisine: 'International with Seafood Focus',
    description: 'Plums at the Ritz-Carlton is known for its exceptional brunch, but the restaurant also delivers outstanding seafood throughout the week. The menu features fresh catches prepared in various international styles, from simple grilled preparations to elaborate sauced creations. The elegant setting and impeccable service elevate every meal.',
    specialties: ['Friday brunch', 'International seafood', 'Elegant setting', 'Quality ingredients', 'Hotel service'],
    atmosphere: 'Classic Ritz-Carlton elegance',
    hours: 'Daily 7AM-11PM',
    reservation: 'Essential for Friday brunch',
    bestFor: 'Brunch seekers, hotel guests, elegant dining, celebrations',
    mustTry: 'Friday seafood brunch, Grilled lobster, Pan-seared fish, Seafood platter',
  },
  {
    name: 'Maki Bahrain',
    slug: 'maki-bahrain',
    location: 'Multiple Locations',
    type: 'Casual Dining',
    rating: 4,
    price: 'BD 10-20 per person',
    cuisine: 'Japanese Seafood',
    description: 'Maki brings accessible Japanese seafood dining to multiple locations across Bahrain. The menu features sushi rolls, sashimi, and cooked Japanese dishes at prices that allow for regular visits. While not as elevated as hotel Japanese restaurants, Maki delivers consistent quality and fresh flavors in a casual, contemporary setting.',
    specialties: ['Sushi rolls', 'Sashimi', 'Japanese casual', 'Multiple locations', 'Consistent quality'],
    atmosphere: 'Modern casual Japanese',
    hours: 'Daily 12PM-11PM',
    reservation: 'Walk-in friendly',
    bestFor: 'Casual sushi, regular visits, accessible Japanese, takeaway',
    mustTry: 'Signature rolls, Sashimi platter, Tempura prawns, Teriyaki salmon',
  },
  {
    name: 'Manama Souq Fish Stalls',
    slug: 'manama-souq-fish',
    location: 'Manama Souq',
    type: 'Street Food',
    rating: 4,
    price: 'BD 3-10 per person',
    cuisine: 'Traditional Fresh Seafood',
    description: 'For the most authentic Bahraini seafood experience, the fish stalls in Manama Souq offer fresh catches straight from local fishermen. Buy your fish from the market vendors, then have it cooked to order at adjacent restaurants. This is how generations of Bahrainis have enjoyed seafood — fresh, simple, and incredibly affordable.',
    specialties: ['Ultra-fresh', 'Market experience', 'Traditional cooking', 'Lowest prices', 'Authentic atmosphere'],
    atmosphere: 'Authentic souq with bustling market energy',
    hours: 'Daily 6AM-8PM (varies)',
    reservation: 'Not applicable',
    bestFor: 'Adventurous eaters, authentic seekers, budget dining, cultural experience',
    mustTry: 'Fresh hammour, Local prawns, Safi fish, Whatever is freshest',
  },
];

const restaurantsByCategory = [
  { category: 'Fine Dining', picks: ['CUT', 'La Mer', 'Meisei'] },
  { category: 'Best Sushi', picks: ['Bushido', 'Meisei', 'Maki'] },
  { category: 'Best Value', picks: ['Bahrain Fish House', 'Manama Souq', 'Captain\'s Cabin'] },
  { category: 'Beachfront', picks: ['Captain\'s Cabin', 'Masso', 'La Mer'] },
  { category: 'Traditional', picks: ['Bahrain Fish House', 'Manama Souq', 'Fish Market'] },
  { category: 'Special Occasions', picks: ['CUT', 'La Mer', 'Bushido'] },
];

const dishes = [
  { dish: 'Hammour', description: 'Bahrain\'s beloved local grouper, firm and flavorful', where: 'Bahrain Fish House, Fish Market, Captain\'s Cabin' },
  { dish: 'Fresh Oysters', description: 'Briny, fresh oysters from the raw bar', where: 'CUT, La Mer, Re/Asian' },
  { dish: 'Sashimi', description: 'Pristine raw fish sliced by master chefs', where: 'Bushido, Meisei, Re/Asian' },
  { dish: 'Seafood Paella', description: 'Spanish rice loaded with mixed shellfish', where: 'La Vinoteca, Masso' },
  { dish: 'Grilled Prawns', description: 'Jumbo prawns simply grilled with garlic butter', where: 'Fish Market, Captain\'s Cabin, La Mer' },
  { dish: 'Lobster', description: 'Premium whole lobster, various preparations', where: 'CUT, Bushido, Plums' },
  { dish: 'Machboos Samak', description: 'Traditional Bahraini spiced fish with rice', where: 'Bahrain Fish House, Manama Souq' },
  { dish: 'Seafood Tower', description: 'Impressive display of chilled seafood on ice', where: 'CUT, La Mer, Fish Market' },
];

const tips = [
  {
    title: 'Freshness First',
    content: 'At market-style restaurants, always check the fish eyes (clear is fresh) and smell (should be ocean-fresh, not fishy). Don\'t hesitate to ask when it was caught.',
  },
  {
    title: 'Local Catches',
    content: 'Try local Bahraini fish like hammour (grouper), safi, and shrimp. They\'re often fresher than imported varieties and support local fishermen.',
  },
  {
    title: 'Cooking Styles',
    content: 'Simple preparations often showcase fresh seafood best. Grilled (mashwi) or fried (magli) with minimal seasoning lets quality fish shine.',
  },
  {
    title: 'Seasonal Availability',
    content: 'Some catches are seasonal. Ask your server what\'s particularly fresh today — restaurants with varying daily specials often have the freshest options.',
  },
  {
    title: 'Reserve for Seafood Towers',
    content: 'If ordering a seafood tower at fine dining venues, call ahead. These require preparation time and may need advance notice.',
  },
  {
    title: 'Souq Experience',
    content: 'At Manama Souq, go early morning for the best selection. Don\'t be afraid to negotiate prices and have your catch cooked at nearby restaurants.',
  },
];

const faqs = [
  {
    q: 'What is the best seafood restaurant in Bahrain for fine dining?',
    a: 'CUT by Wolfgang Puck at the Four Seasons offers the most luxurious seafood experience with stunning bay views and impeccable service. La Mer at the Ritz-Carlton specializes exclusively in seafood with French-Mediterranean flair. Both deliver exceptional experiences worthy of special occasions.',
  },
  {
    q: 'Where can I find the freshest fish in Bahrain?',
    a: 'For the absolute freshest seafood, visit the fish stalls at Manama Souq where local fishermen sell their daily catches. Fish Market at InterContinental offers a similar market-style concept in a restaurant setting. Bahrain Fish House also sources locally for fresh traditional preparations.',
  },
  {
    q: 'What is the best sushi restaurant in Bahrain?',
    a: 'Bushido at the Gulf Hotel and Meisei at Bahrain Bay are considered Bahrain\'s premier sushi destinations, with master chefs preparing omakase-style experiences. For more casual sushi, Maki offers consistent quality at multiple locations across the kingdom.',
  },
  {
    q: 'Are there beachfront seafood restaurants in Bahrain?',
    a: 'Captain\'s Cabin on Budaiya Beach offers classic beachfront seafood dining with sunset views. Masso at ART Rotana Amwaj provides waterfront dining. La Mer at Ritz-Carlton has a terrace overlooking the Gulf. These venues combine fresh seafood with beautiful water views.',
  },
  {
    q: 'What local Bahraini seafood dishes should I try?',
    a: 'Try machboos samak (spiced fish with rice), hammour grilled simply with traditional spices, and local shrimp preparations. Bahrain Fish House and the Manama Souq restaurants serve authentic Bahraini seafood dishes that have been favorites for generations.',
  },
];

export default function BestSeafoodBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Best Seafood Restaurants Bahrain', url: 'https://www.bahrainnights.com/guides/best-seafood-bahrain' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium mb-4">
              🦐 Ultimate Seafood Guide 2026
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                Best Seafood Restaurants
              </span>
              {' '}in Bahrain 2026
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From fresh Gulf catches at local fish houses to luxury seafood towers at world-class restaurants — 
              your complete guide to the best seafood dining, oyster bars, and sushi spots in the Kingdom of Bahrain.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated} | By <Link href="https://www.bahrainnights.com" className="text-blue-400 hover:underline">BahrainNights.com</Link>
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Restaurants Reviewed', value: '40+', icon: Utensils },
              { label: 'Budget From', value: 'BD 3', icon: DollarSign },
              { label: 'Beachfront Venues', value: '5+', icon: Waves },
              { label: 'Fine Dining Options', value: '8+', icon: Award },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-blue-400" />
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
              As an island nation surrounded by the warm waters of the Arabian Gulf, Bahrain has a deep connection to 
              the sea that stretches back millennia. This maritime heritage is reflected in a seafood dining scene 
              that ranges from humble fish markets where local catches are cooked to order, to world-class restaurants 
              where celebrity chefs transform the ocean&apos;s bounty into culinary art.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mt-4">
              Whether you&apos;re craving the simple pleasure of perfectly grilled hammour on a beachfront terrace, the 
              theatrical presentation of a towering seafood platter at a luxury hotel, or the pristine artistry of 
              master-crafted sushi, Bahrain delivers exceptional seafood experiences for every palate and occasion.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mt-4">
              The kingdom&apos;s waters yield prized catches like hammour (grouper), safi, sheri, and succulent Gulf 
              prawns, while international imports bring oysters, lobsters, and exotic fish from around the world. 
              This guide navigates you through the best seafood restaurants in Bahrain, from authentic local 
              experiences to internationally acclaimed fine dining, ensuring you find the perfect setting for your 
              seafood feast.
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
                <h3 className="font-semibold text-blue-400 mb-2 text-sm">{cat.category}</h3>
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
          <h2 className="text-3xl font-bold mb-4 text-center">Top Seafood Restaurants in Bahrain</h2>
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
                        <Link href={`/restaurants/${restaurant.slug}`} className="hover:text-blue-400 transition-colors">
                          <h3 className="text-xl font-bold">{restaurant.name}</h3>
                        </Link>
                        <p className="text-blue-400 text-sm flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {restaurant.location} • {restaurant.type}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex">
                          {[...Array(restaurant.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-blue-400 fill-blue-400" />
                          ))}
                        </div>
                        <span className="text-sm font-bold text-white">{restaurant.price}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-blue-300 mb-2">{restaurant.cuisine}</p>
                    <p className="text-gray-300 mb-4">{restaurant.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {restaurant.specialties.map((s) => (
                        <span key={s} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="bg-blue-500/10 rounded-lg p-3">
                      <p className="text-sm">
                        <strong className="text-blue-400">Must Try: </strong>
                        {restaurant.mustTry}
                      </p>
                    </div>
                  </div>
                  
                  <div className="lg:w-1/4 space-y-2 text-sm bg-black/20 rounded-xl p-4">
                    <p><strong className="text-gray-400">Atmosphere:</strong> {restaurant.atmosphere}</p>
                    <p><strong className="text-gray-400">Hours:</strong> {restaurant.hours}</p>
                    <p><strong className="text-gray-400">Reservations:</strong> {restaurant.reservation}</p>
                    <p className="text-blue-400 italic pt-2">Best for: {restaurant.bestFor}</p>
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
          <h2 className="text-3xl font-bold mb-8 text-center">Must-Try Seafood Dishes in Bahrain</h2>
          <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
            Essential dishes every seafood lover should try, and where to find the best versions.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {dishes.map((dish) => (
              <div key={dish.dish} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-blue-400 mb-1">{dish.dish}</h3>
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
          <h2 className="text-3xl font-bold mb-12 text-center">Seafood Dining Tips in Bahrain</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tips.map((tip) => (
              <div key={tip.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-blue-400 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-300">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events CTA */}
      <section className="py-12 px-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20">
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
              className="px-6 py-3 bg-blue-500 hover:bg-blue-400 text-black font-bold rounded-lg transition-colors"
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
              { title: 'Thai', href: '/guides/best-thai-restaurants-bahrain', emoji: '🍜' },
              { title: 'Chinese', href: '/guides/best-chinese-restaurants-bahrain', emoji: '🥡' },
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
                <span className="font-medium group-hover:text-blue-400 transition-colors">
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
            Powered by <Link href="https://www.bahrainnights.com" className="text-blue-400 hover:underline">BahrainNights.com</Link> — 
            Your ultimate guide to nightlife, dining, and entertainment in Bahrain.
          </p>
          <div className="flex justify-center gap-6 text-sm text-gray-500">
            <a href="https://www.eventsbahrain.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">EventsBahrain.com</a>
            <a href="https://www.cinematicwebworks.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">CinematicWebWorks.com</a>
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
            headline: 'Best Seafood Restaurants in Bahrain 2026 | Top 15 Fish & Oyster Bars',
            description: 'Complete guide to the best seafood restaurants in Bahrain, from fresh local catches to luxury fine dining and sushi.',
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
              '@id': 'https://www.bahrainnights.com/guides/best-seafood-bahrain',
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
