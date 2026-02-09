import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Utensils, MapPin, Star,
  DollarSign, Users, Flame, Award
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Best Indian Restaurants in Bahrain 2026 | Top 15 Curry Houses & Fine Dining',
  description: 'Discover the 15 best Indian restaurants in Bahrain for 2026. From Michelin-starred Rasoi by Vineet to authentic street food, find the perfect curry house, biryani spot, and vegetarian options.',
  keywords: 'best Indian restaurants Bahrain 2026, Indian food Bahrain, biryani Bahrain, curry houses Manama, vegetarian Indian Bahrain, Rasoi by Vineet, Indian fine dining Bahrain',
  openGraph: {
    title: 'Best Indian Restaurants in Bahrain 2026 | Top 15 Curry Houses & Fine Dining',
    description: 'Complete guide to the best Indian restaurants in Bahrain - from fine dining to budget-friendly gems.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/best-indian-restaurants-bahrain',
    images: [{ url: 'https://www.bahrainnights.com/images/guides/indian-restaurants-bahrain.jpg', width: 1200, height: 630, alt: 'Best Indian Restaurants in Bahrain' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Indian Restaurants in Bahrain 2026',
    description: 'Your ultimate guide to Indian cuisine in Bahrain.',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/best-indian-restaurants-bahrain',
  },
};

const restaurants = [
  {
    name: 'Rasoi by Vineet',
    slug: 'rasoi-by-vineet',
    location: 'Gulf Hotel, Adliya',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 25-50 per person',
    cuisine: 'Modern Indian',
    description: 'Helmed by Michelin-starred Chef Vineet Bhatia, Rasoi delivers an extraordinary modern Indian dining experience that redefines subcontinental cuisine. The restaurant seamlessly blends traditional Indian flavors with contemporary techniques, creating dishes that are both visually stunning and explosively flavorful. The elegant setting at the Gulf Hotel provides the perfect backdrop for what many consider Bahrain\'s finest Indian restaurant.',
    specialties: ['Tasting menus', 'Lamb chops', 'Seafood curry', 'Contemporary presentations', 'Wine pairings'],
    atmosphere: 'Elegant fine dining with modern décor and intimate seating',
    hours: 'Daily 7PM-11PM',
    reservation: 'Essential, especially weekends',
    bestFor: 'Special occasions, business dinners, foodies seeking innovation',
    mustTry: 'Chef\'s tasting menu, Lamb seekh kebab, Chocolate samosa',
  },
  {
    name: 'Silk\'s',
    slug: 'silks-ritz-carlton',
    location: 'Ritz-Carlton, Seef',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 20-40 per person',
    cuisine: 'North Indian',
    description: 'Set within the luxurious Ritz-Carlton Bahrain, Silk\'s offers sophisticated North Indian cuisine in an opulent setting. The restaurant features live cooking stations where skilled chefs prepare tandoori dishes before your eyes. The menu spans the breadth of North Indian culinary traditions, from creamy Punjab curries to aromatic Lucknowi biryanis.',
    specialties: ['Tandoori dishes', 'Dal makhani', 'Butter chicken', 'Biryani', 'Live cooking stations'],
    atmosphere: 'Luxurious hotel dining, open kitchen with theatrical cooking',
    hours: 'Daily 12PM-3PM, 7PM-11PM',
    reservation: 'Highly recommended',
    bestFor: 'Celebrations, romantic dinners, hotel guests, business entertaining',
    mustTry: 'Tandoori platter, Lamb biryani, Gulab jamun with saffron rabri',
  },
  {
    name: 'Saffron by Atul Kochhar',
    slug: 'saffron-atul-kochhar',
    location: 'Al Areen Palace & Spa',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 25-45 per person',
    cuisine: 'Modern Indian',
    description: 'Celebrity chef Atul Kochhar brings his award-winning approach to Indian cuisine at this stunning resort restaurant. Saffron combines classical Indian cooking with modern European techniques, resulting in dishes that surprise and delight. The luxurious desert resort setting adds to the sense of occasion.',
    specialties: ['Chef\'s specials', 'Seafood dishes', 'Contemporary Indian', 'Seasonal tasting menus'],
    atmosphere: 'Luxury resort dining with Arabian desert views',
    hours: 'Thu-Sat dinner only (check seasonal schedules)',
    reservation: 'Essential - limited availability',
    bestFor: 'Special occasions, culinary experiences, resort guests',
    mustTry: 'Seasonal tasting menu, Kerala seafood specialties',
  },
  {
    name: 'Zafran',
    slug: 'zafran-seef',
    location: 'Seef District',
    type: 'Casual Fine Dining',
    rating: 5,
    price: 'BD 12-25 per person',
    cuisine: 'North Indian',
    description: 'Zafran has earned its reputation as one of Bahrain\'s most beloved Indian restaurants through consistent quality and generous portions of authentic North Indian cuisine. The contemporary setting appeals to families and groups, while the extensive menu caters to every preference from vegetarian delights to succulent kebabs.',
    specialties: ['Butter chicken', 'Hyderabadi biryani', 'Naan varieties', 'Paneer dishes', 'Mixed kebab platters'],
    atmosphere: 'Contemporary Indian with comfortable family-friendly seating',
    hours: 'Daily 12PM-12AM',
    reservation: 'Recommended for weekend dinners',
    bestFor: 'Family dinners, groups, regular visits, celebrations',
    mustTry: 'Butter chicken, Hyderabadi biryani, Garlic naan, Zafrani kheer',
  },
  {
    name: 'Copper Chimney',
    slug: 'copper-chimney-adliya',
    location: 'Adliya',
    type: 'Casual Dining',
    rating: 4,
    price: 'BD 8-18 per person',
    cuisine: 'North Indian',
    description: 'A long-standing institution in Bahrain\'s Indian dining scene, Copper Chimney delivers reliable, flavorful dishes in a comfortable family-friendly atmosphere. The restaurant has earned loyal following for its consistent quality and reasonable prices, making it perfect for regular Indian food cravings.',
    specialties: ['Tandoor dishes', 'Curries', 'Biryani', 'Vegetarian options', 'Family portions'],
    atmosphere: 'Traditional Indian décor, welcoming family ambiance',
    hours: 'Daily 12PM-11:30PM',
    reservation: 'Usually walk-in friendly',
    bestFor: 'Families, casual dining, regular visits, groups',
    mustTry: 'Chicken tikka, Dal tadka, Paneer butter masala, Kulfi',
  },
  {
    name: 'Moti Mahal Delux',
    slug: 'moti-mahal-delux',
    location: 'Juffair & Seef',
    type: 'Casual Dining',
    rating: 4,
    price: 'BD 5-12 per person',
    cuisine: 'North Indian',
    description: 'Part of the legendary Delhi chain that invented butter chicken, Moti Mahal brings authentic Mughlai cuisine to Bahrain. The restaurant stays true to its heritage with time-tested recipes that have delighted diners for generations. Multiple locations make it convenient for anyone craving classic North Indian comfort food.',
    specialties: ['Butter chicken (original recipe!)', 'Dal makhani', 'Tandoor items', 'Classic Mughlai dishes'],
    atmosphere: 'Traditional ambiance with rich Mughal-inspired décor',
    hours: 'Daily 11AM-11PM',
    reservation: 'Not usually required',
    bestFor: 'Butter chicken lovers, history buffs, families, value seekers',
    mustTry: 'Butter chicken, Dal makhani, Rumali roti, Chicken tikka',
  },
  {
    name: 'Charcoal Grill',
    slug: 'charcoal-grill-juffair',
    location: 'Juffair',
    type: 'Casual Dining',
    rating: 4,
    price: 'BD 6-15 per person',
    cuisine: 'North Indian/Pakistani',
    description: 'Famous for its sizzling grilled meats and authentic subcontinental flavors, Charcoal Grill delivers exceptional value with generous portions. The aromatic smoke from the charcoal grills perfumes the restaurant, promising the bold flavors of traditional Pakistani and North Indian barbecue cuisine.',
    specialties: ['Charcoal grilled meats', 'Karahi dishes', 'Biryani', 'Seekh kebabs', 'Fresh naan'],
    atmosphere: 'Casual and lively with open grill views',
    hours: 'Daily 12PM-12AM',
    reservation: 'Walk-in friendly',
    bestFor: 'Meat lovers, budget dining, late night cravings, groups',
    mustTry: 'Mixed grill platter, Karahi chicken, Seekh kebab, Biryani',
  },
  {
    name: 'Tandoori Hut',
    slug: 'tandoori-hut-gudaibiya',
    location: 'Gudaibiya',
    type: 'Budget',
    rating: 4,
    price: 'BD 3-8 per person',
    cuisine: 'North Indian',
    description: 'For authentic Indian flavors at unbeatable prices, Tandoori Hut is the go-to destination. This no-frills establishment focuses on what matters most: delicious, freshly prepared food. Local residents and budget-conscious foodies flock here for some of the best value Indian food in Bahrain.',
    specialties: ['Tandoori chicken', 'Biryani', 'Curries', 'Fresh naan and roti', 'Value meals'],
    atmosphere: 'Simple, unpretentious, authentically local',
    hours: 'Daily 11AM-11PM',
    reservation: 'Not required',
    bestFor: 'Budget meals, authentic flavors, takeaway, quick bites',
    mustTry: 'Tandoori chicken, Chicken biryani, Fresh roti, Dal fry',
  },
  {
    name: 'India Palace',
    slug: 'india-palace-bahrain',
    location: 'Multiple locations across Bahrain',
    type: 'Casual Dining',
    rating: 4,
    price: 'BD 6-12 per person',
    cuisine: 'North Indian',
    description: 'India Palace has become synonymous with reliable Indian food in Bahrain. With multiple branches across the kingdom, this popular chain offers consistent quality and an extensive menu that covers all North Indian favorites. The family-friendly atmosphere and reasonable prices make it a regular choice for many.',
    specialties: ['Complete thali meals', 'Vegetarian options', 'Biryani', 'Tandoor items', 'South Indian breakfast'],
    atmosphere: 'Comfortable and family-friendly across all locations',
    hours: 'Daily 11AM-11PM',
    reservation: 'Not usually required',
    bestFor: 'Families, consistent quality, convenience, all-round Indian menu',
    mustTry: 'Thali meals, Paneer tikka, Biryani, Lassi',
  },
  {
    name: 'Lanterns',
    slug: 'lanterns-ritz-carlton',
    location: 'Ritz-Carlton, Seef',
    type: 'Pan-Asian/Indian',
    rating: 4,
    price: 'BD 15-30 per person',
    cuisine: 'Indian & Thai',
    description: 'Lanterns offers a unique blend of Indian and Thai cuisines in a stunning setting with outdoor terrace dining. The restaurant is particularly popular for its Indian dishes, served alongside Thai favorites, making it ideal for groups with varied preferences.',
    specialties: ['Indian curries', 'Thai dishes', 'Seafood', 'Vegetarian options', 'Terrace dining'],
    atmosphere: 'Relaxed elegance with beautiful outdoor seating options',
    hours: 'Daily 12PM-11PM',
    reservation: 'Recommended for dinner',
    bestFor: 'Mixed groups, casual celebrations, terrace dining',
    mustTry: 'Signature curries, Grilled seafood, Pad Thai with Indian twist',
  },
  {
    name: 'Cinnamon',
    slug: 'cinnamon-indian',
    location: 'Juffair',
    type: 'Casual Dining',
    rating: 4,
    price: 'BD 7-15 per person',
    cuisine: 'South Indian',
    description: 'Specializing in South Indian cuisine, Cinnamon offers a refreshing change from the North Indian dominated dining scene. The restaurant serves authentic dosas, idlis, and flavorful South Indian curries that transport you straight to Chennai or Bangalore.',
    specialties: ['Dosas', 'Idli sambar', 'South Indian thali', 'Filter coffee', 'Chettinad dishes'],
    atmosphere: 'Bright and welcoming with South Indian touches',
    hours: 'Daily 7AM-11PM',
    reservation: 'Not usually required',
    bestFor: 'South Indian food lovers, breakfast, vegetarians',
    mustTry: 'Masala dosa, Idli sambar, Chettinad chicken, Filter coffee',
  },
  {
    name: 'Nihari Inn',
    slug: 'nihari-inn',
    location: 'Manama',
    type: 'Budget',
    rating: 4,
    price: 'BD 3-7 per person',
    cuisine: 'Pakistani/Mughlai',
    description: 'Named after the famous slow-cooked meat stew, Nihari Inn specializes in hearty Pakistani and Mughlai dishes. The restaurant is beloved for its authentic nihari, rich curries, and freshly baked bread straight from the tandoor.',
    specialties: ['Nihari', 'Paya', 'Haleem', 'Kebabs', 'Fresh naan'],
    atmosphere: 'Simple and authentic Pakistani eatery',
    hours: 'Daily 11AM-11PM',
    reservation: 'Not required',
    bestFor: 'Authentic Pakistani food, budget dining, meat lovers',
    mustTry: 'Beef nihari, Paya, Seekh kebab, Naan',
  },
];

const restaurantsByCategory = [
  { category: 'Fine Dining', picks: ['Rasoi by Vineet', 'Silk\'s', 'Saffron by Atul Kochhar'] },
  { category: 'Best Value', picks: ['Tandoori Hut', 'Moti Mahal', 'India Palace'] },
  { category: 'Best Biryani', picks: ['Zafran', 'Silk\'s', 'Copper Chimney'] },
  { category: 'Vegetarian Friendly', picks: ['Zafran', 'India Palace', 'Cinnamon'] },
  { category: 'Best for Groups', picks: ['Zafran', 'Copper Chimney', 'Moti Mahal'] },
  { category: 'Late Night', picks: ['Charcoal Grill', 'Zafran', 'Copper Chimney'] },
];

const dishes = [
  { dish: 'Butter Chicken', description: 'Creamy tomato-based curry with tender tandoori chicken', where: 'Moti Mahal, Zafran, Silk\'s' },
  { dish: 'Biryani', description: 'Fragrant basmati rice layered with spiced meat and aromatics', where: 'Zafran, Copper Chimney, Silk\'s' },
  { dish: 'Tandoori Chicken', description: 'Yogurt-marinated chicken roasted in clay oven', where: 'Tandoori Hut, Silk\'s, Charcoal Grill' },
  { dish: 'Dal Makhani', description: 'Creamy black lentils slow-cooked overnight with butter', where: 'Moti Mahal, Silk\'s, Zafran' },
  { dish: 'Paneer Tikka', description: 'Grilled cottage cheese cubes marinated in spices', where: 'Zafran, India Palace, Copper Chimney' },
  { dish: 'Seekh Kebab', description: 'Minced meat kebabs grilled on skewers', where: 'Charcoal Grill, Rasoi, Silk\'s' },
  { dish: 'Masala Dosa', description: 'Crispy rice crepe with spiced potato filling', where: 'Cinnamon, India Palace' },
  { dish: 'Lamb Rogan Josh', description: 'Aromatic Kashmiri lamb curry with deep red color', where: 'Rasoi by Vineet, Silk\'s, Zafran' },
];

const tips = [
  {
    title: 'Make Reservations',
    content: 'Fine dining venues like Rasoi and Silk\'s require booking, especially on weekends. Casual spots are usually walk-in friendly.',
  },
  {
    title: 'Spice Levels',
    content: 'Always specify your spice preference. "Medium" at Indian restaurants is often quite spicy for unaccustomed palates.',
  },
  {
    title: 'Vegetarian Paradise',
    content: 'Indian cuisine offers exceptional vegetarian options. Don\'t hesitate to explore the paneer, dal, and vegetable dishes.',
  },
  {
    title: 'Share Family Style',
    content: 'Indian food is designed for sharing. Order a variety of dishes and share them family-style for the best experience.',
  },
  {
    title: 'Bread Varieties',
    content: 'Don\'t just order naan - try roti, paratha, or kulcha for different textures and flavors with your curry.',
  },
  {
    title: 'Lunch Deals',
    content: 'Many restaurants offer excellent lunch thalis or set menus at significantly lower prices than dinner.',
  },
];

const faqs = [
  {
    q: 'What is the best Indian restaurant in Bahrain for fine dining?',
    a: 'Rasoi by Vineet at Gulf Hotel is widely regarded as Bahrain\'s finest Indian restaurant. Chef Vineet Bhatia\'s Michelin-starred approach to modern Indian cuisine offers an exceptional dining experience. Silk\'s at Ritz-Carlton and Saffron by Atul Kochhar are also excellent fine dining options.',
  },
  {
    q: 'Where can I find the best biryani in Bahrain?',
    a: 'Zafran in Seef District is famous for its Hyderabadi biryani with perfectly layered rice and tender meat. Silk\'s at Ritz-Carlton serves an excellent lamb biryani, while Copper Chimney offers great value biryani options. For authentic Lucknowi style, try the biryani at Moti Mahal.',
  },
  {
    q: 'Are there good vegetarian Indian restaurants in Bahrain?',
    a: 'Most Indian restaurants in Bahrain have extensive vegetarian menus. Zafran, India Palace, and Cinnamon are particularly good for vegetarians. South Indian restaurant Cinnamon excels in vegetarian dosas and idlis. Many restaurants can also prepare dishes vegan upon request.',
  },
  {
    q: 'What are the cheapest Indian restaurants in Bahrain?',
    a: 'Tandoori Hut in Gudaibiya offers authentic Indian food from BD 3-8 per person. Nihari Inn, Charcoal Grill, and Moti Mahal are also excellent budget options with meals under BD 10. These restaurants prove you don\'t need to spend much for delicious Indian food.',
  },
  {
    q: 'Which Indian restaurants in Bahrain are open late?',
    a: 'Charcoal Grill and Zafran stay open until midnight, making them perfect for late-night Indian food cravings. Copper Chimney is open until 11:30 PM. Most casual Indian restaurants in Juffair cater to the late-night crowd.',
  },
];

export default function BestIndianRestaurantsBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-orange-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Best Indian Restaurants Bahrain', url: 'https://www.bahrainnights.com/guides/best-indian-restaurants-bahrain' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm font-medium mb-4">
              🍛 Ultimate Restaurant Guide 2026
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                Best Indian Restaurants
              </span>
              {' '}in Bahrain 2026
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From Michelin-starred fine dining at Rasoi by Vineet to authentic street food gems — 
              your complete guide to the best Indian restaurants, biryani houses, and curry spots in the Kingdom of Bahrain.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated} | By <Link href="https://www.bahrainnights.com" className="text-orange-400 hover:underline">BahrainNights.com</Link>
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Restaurants Reviewed', value: '50+', icon: Utensils },
              { label: 'Budget From', value: 'BD 3', icon: DollarSign },
              { label: 'Fine Dining Options', value: '5+', icon: Award },
              { label: 'Cuisine Regions', value: 'All India', icon: Flame },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-orange-400" />
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
              Bahrain boasts one of the Gulf&apos;s most vibrant Indian food scenes, a reflection of the deep cultural ties 
              between the Kingdom and the Indian subcontinent. From luxurious hotel restaurants helmed by celebrity 
              chefs to humble neighborhood eateries serving generations-old recipes, Indian cuisine in Bahrain spans 
              every price point and regional specialty.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mt-4">
              Whether you&apos;re craving a perfectly spiced biryani, the comfort of creamy butter chicken, or an 
              innovative tasting menu that reimagines traditional dishes, this comprehensive guide will help you 
              find the perfect Indian restaurant for every occasion.
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
                <h3 className="font-semibold text-orange-400 mb-2 text-sm">{cat.category}</h3>
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
          <h2 className="text-3xl font-bold mb-4 text-center">Top Indian Restaurants in Bahrain</h2>
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
                        <Link href={`/restaurants/${restaurant.slug}`} className="hover:text-orange-400 transition-colors">
                          <h3 className="text-xl font-bold">{restaurant.name}</h3>
                        </Link>
                        <p className="text-orange-400 text-sm flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {restaurant.location} • {restaurant.type}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex">
                          {[...Array(restaurant.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-orange-400 fill-orange-400" />
                          ))}
                        </div>
                        <span className="text-sm font-bold text-white">{restaurant.price}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-orange-300 mb-2">{restaurant.cuisine}</p>
                    <p className="text-gray-300 mb-4">{restaurant.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {restaurant.specialties.map((s) => (
                        <span key={s} className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded">
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="bg-orange-500/10 rounded-lg p-3">
                      <p className="text-sm">
                        <strong className="text-orange-400">Must Try: </strong>
                        {restaurant.mustTry}
                      </p>
                    </div>
                  </div>
                  
                  <div className="lg:w-1/4 space-y-2 text-sm bg-black/20 rounded-xl p-4">
                    <p><strong className="text-gray-400">Atmosphere:</strong> {restaurant.atmosphere}</p>
                    <p><strong className="text-gray-400">Hours:</strong> {restaurant.hours}</p>
                    <p><strong className="text-gray-400">Reservations:</strong> {restaurant.reservation}</p>
                    <p className="text-orange-400 italic pt-2">Best for: {restaurant.bestFor}</p>
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
          <h2 className="text-3xl font-bold mb-8 text-center">Must-Try Indian Dishes in Bahrain</h2>
          <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
            Essential dishes every Indian food lover should try, and where to find the best versions.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {dishes.map((dish) => (
              <div key={dish.dish} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-orange-400 mb-1">{dish.dish}</h3>
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
          <h2 className="text-3xl font-bold mb-12 text-center">Indian Dining Tips in Bahrain</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tips.map((tip) => (
              <div key={tip.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-orange-400 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-300">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events CTA */}
      <section className="py-12 px-4 bg-gradient-to-r from-orange-500/20 to-red-500/20">
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
              className="px-6 py-3 bg-orange-500 hover:bg-orange-400 text-black font-bold rounded-lg transition-colors"
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
              { title: 'Arabic & Lebanese', href: '/guides/best-arabic-restaurants-bahrain', emoji: '🥙' },
              { title: 'Japanese & Sushi', href: '/guides/best-japanese-restaurants-bahrain', emoji: '🍣' },
              { title: 'Italian', href: '/guides/best-italian-restaurants-bahrain', emoji: '🍝' },
              { title: 'Seafood', href: '/guides/best-seafood-bahrain', emoji: '🦐' },
              { title: 'Thai', href: '/guides/best-thai-restaurants-bahrain', emoji: '🍜' },
              { title: 'Chinese', href: '/guides/best-chinese-restaurants-bahrain', emoji: '🥡' },
              { title: 'All Restaurants', href: '/guides/restaurants', emoji: '🍽️' },
              { title: 'Best Buffets', href: '/guides/buffets', emoji: '🥘' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group"
              >
                <span className="text-2xl mb-2 block">{guide.emoji}</span>
                <span className="font-medium group-hover:text-orange-400 transition-colors">
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
            Powered by <Link href="https://www.bahrainnights.com" className="text-orange-400 hover:underline">BahrainNights.com</Link> — 
            Your ultimate guide to nightlife, dining, and entertainment in Bahrain.
          </p>
          <div className="flex justify-center gap-6 text-sm text-gray-500">
            <a href="https://www.eventsbahrain.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400">EventsBahrain.com</a>
            <a href="https://www.cinematicwebworks.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400">CinematicWebWorks.com</a>
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
            headline: 'Best Indian Restaurants in Bahrain 2026 | Top 15 Curry Houses & Fine Dining',
            description: 'Complete guide to the best Indian restaurants in Bahrain, from Michelin-starred fine dining to authentic budget-friendly options.',
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
              '@id': 'https://www.bahrainnights.com/guides/best-indian-restaurants-bahrain',
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
