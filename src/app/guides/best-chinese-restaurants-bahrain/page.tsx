import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Utensils, MapPin, Star,
  DollarSign, Flame, Award
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Best Chinese Restaurants in Bahrain 2026 | Top 12 Dim Sum & Cantonese',
  description: 'Discover the 12 best Chinese restaurants in Bahrain for 2026. From authentic dim sum and Cantonese cuisine to Sichuan specialties, find the perfect Chinese restaurant in Manama, Seef & Juffair.',
  keywords: 'best Chinese restaurants Bahrain 2026, Chinese food Bahrain, dim sum Bahrain, Cantonese food Manama, Sichuan Bahrain, Chinese takeaway Bahrain, authentic Chinese Bahrain',
  openGraph: {
    title: 'Best Chinese Restaurants in Bahrain 2026 | Top 12 Dim Sum & Cantonese',
    description: 'Complete guide to the best Chinese restaurants in Bahrain - from dim sum to Sichuan cuisine.',
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
    name: 'China Garden',
    slug: 'china-garden-gulf-hotel',
    location: 'Gulf Hotel, Adliya',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 20-40 per person',
    cuisine: 'Cantonese & Dim Sum',
    description: 'Consistently ranked among Bahrain\'s finest Chinese restaurants, China Garden at the Gulf Hotel offers an authentic Cantonese experience helmed by skilled Hong Kong-trained chefs. The restaurant is particularly renowned for its dim sum, which features delicate handcrafted dumplings, fluffy bao buns, and traditional Cantonese classics. The elegant setting with traditional Chinese décor creates the perfect atmosphere for both business dinners and family celebrations.',
    specialties: ['Dim sum lunch', 'Peking duck', 'Seafood', 'Cantonese roasts', 'Set menus'],
    atmosphere: 'Elegant traditional Chinese décor with private dining rooms',
    hours: 'Daily 12PM-3PM (dim sum), 7PM-11PM',
    reservation: 'Essential for weekend dim sum',
    bestFor: 'Dim sum lovers, business dinners, special occasions, authentic Cantonese',
    mustTry: 'Dim sum selection, Peking duck, Wok-fried lobster, Char siu bao',
  },
  {
    name: 'Royal China',
    slug: 'royal-china-seef',
    location: 'Seef District',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 18-35 per person',
    cuisine: 'Cantonese',
    description: 'Royal China brings sophisticated Cantonese dining to Bahrain with an menu that honors traditional techniques while incorporating premium ingredients. The restaurant\'s skilled chefs execute classics with precision, from perfectly crispy duck to silky congee. The contemporary Chinese décor creates an upscale yet welcoming atmosphere that appeals to both connoisseurs and newcomers to Cantonese cuisine.',
    specialties: ['Cantonese classics', 'Live seafood', 'Roast meats', 'Noodles', 'Group banquets'],
    atmosphere: 'Contemporary Chinese luxury with elegant furnishings',
    hours: 'Daily 12PM-11PM',
    reservation: 'Highly recommended',
    bestFor: 'Celebrations, family gatherings, authentic Cantonese, business lunches',
    mustTry: 'Crispy aromatic duck, Sweet and sour fish, Claypot rice, Egg tarts',
  },
  {
    name: 'Golden Phoenix',
    slug: 'golden-phoenix-manama',
    location: 'Diplomatic Area',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 15-30 per person',
    cuisine: 'Szechuan & Cantonese',
    description: 'Golden Phoenix offers a journey through China\'s diverse culinary landscape, with particular strength in fiery Szechuan dishes alongside Cantonese favorites. The restaurant is known for bold flavors, generous portions, and welcoming service that has built a loyal following over the years. The extensive menu caters to adventurous eaters seeking authentic spice as well as those preferring milder Cantonese preparations.',
    specialties: ['Szechuan specialties', 'Mapo tofu', 'Kung Pao dishes', 'Hot pots', 'Peking duck'],
    atmosphere: 'Traditional Chinese with red and gold accents',
    hours: 'Daily 11:30AM-11PM',
    reservation: 'Recommended for groups',
    bestFor: 'Spice lovers, adventurous eaters, authentic flavors, groups',
    mustTry: 'Mapo tofu, Kung Pao chicken, Dan dan noodles, Twice-cooked pork',
  },
  {
    name: 'Dragon City',
    slug: 'dragon-city-juffair',
    location: 'Juffair',
    type: 'Casual Dining',
    rating: 4,
    price: 'BD 8-18 per person',
    cuisine: 'Chinese-Filipino Fusion',
    description: 'Dragon City has become a beloved institution serving the diverse communities of Juffair with a menu that spans Chinese classics and Filipino favorites. The restaurant\'s Cantonese dishes are prepared with skill and consistency, while the fusion offerings provide unique flavor combinations not found elsewhere. The casual atmosphere and reasonable prices make it perfect for regular visits.',
    specialties: ['Fusion dishes', 'Fried rice varieties', 'Noodle soups', 'Family portions', 'Takeaway'],
    atmosphere: 'Casual and family-friendly with bright décor',
    hours: 'Daily 10AM-11PM',
    reservation: 'Usually walk-in friendly',
    bestFor: 'Families, casual dining, fusion seekers, value meals',
    mustTry: 'Special fried rice, Beef chow fun, Crispy pork belly, Hot and sour soup',
  },
  {
    name: 'Furn Bistro',
    slug: 'furn-bistro-manama',
    location: 'Kempinski Hotel, Manama',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 20-40 per person',
    cuisine: 'Pan-Asian with Chinese Focus',
    description: 'Furn Bistro at the Kempinski offers sophisticated Chinese dishes as part of its Pan-Asian culinary journey. The restaurant\'s Chinese menu features refined interpretations of classic dishes, with particular attention to presentation and premium ingredients. The sleek, modern setting provides a contemporary backdrop for exploring Chinese flavors elevated to hotel fine dining standards.',
    specialties: ['Modern Chinese', 'Tasting menus', 'Premium ingredients', 'Wine pairings', 'Private dining'],
    atmosphere: 'Sleek contemporary design with open kitchen elements',
    hours: 'Daily 12PM-11PM',
    reservation: 'Highly recommended',
    bestFor: 'Special occasions, foodies, business entertaining, hotel guests',
    mustTry: 'Chef\'s Chinese selection, Dim sum platter, Wok-fried specialties',
  },
  {
    name: 'Mandarin Chinese',
    slug: 'mandarin-chinese-bahrain',
    location: 'Exhibition Road, Manama',
    type: 'Casual Dining',
    rating: 4,
    price: 'BD 6-15 per person',
    cuisine: 'Traditional Chinese',
    description: 'A long-standing favorite among Bahrain\'s Chinese food enthusiasts, Mandarin Chinese delivers authentic flavors in a no-frills setting. The kitchen prepares time-tested recipes that have satisfied cravings for decades, from perfectly executed fried rice to comforting noodle soups. The consistent quality and reasonable prices have earned it generations of loyal customers.',
    specialties: ['Classic dishes', 'Fried rice', 'Noodles', 'Sweet and sour', 'Family sets'],
    atmosphere: 'Traditional Chinese restaurant with comfortable seating',
    hours: 'Daily 11AM-11PM',
    reservation: 'Usually not required',
    bestFor: 'Authentic cravings, regular visits, families, takeaway',
    mustTry: 'House special fried rice, Beef with black bean sauce, Spring rolls, Lemon chicken',
  },
  {
    name: 'Chopsticks',
    slug: 'chopsticks-bahrain',
    location: 'Multiple Locations',
    type: 'Fast Casual',
    rating: 4,
    price: 'BD 4-10 per person',
    cuisine: 'Chinese Fast Casual',
    description: 'Chopsticks brings Chinese flavors to the fast-casual format, perfect for quick lunches and convenient dinners. The menu features crowd-pleasers like kung pao chicken, sweet and sour pork, and various fried rice options — all prepared fresh and served quickly. Multiple locations across Bahrain make it a reliable go-to for satisfying Chinese food cravings on the go.',
    specialties: ['Quick service', 'Combo meals', 'Takeaway', 'Value pricing', 'Mall locations'],
    atmosphere: 'Modern fast-casual with convenient counter service',
    hours: 'Daily 10AM-10PM (mall hours)',
    reservation: 'Not required',
    bestFor: 'Quick meals, shoppers, lunch breaks, takeaway',
    mustTry: 'Combo meals, Kung Pao chicken, Special fried rice, Crispy wontons',
  },
  {
    name: 'Wok Express',
    slug: 'wok-express-bahrain',
    location: 'City Centre Bahrain',
    type: 'Fast Casual',
    rating: 4,
    price: 'BD 3-8 per person',
    cuisine: 'Chinese Stir-Fry',
    description: 'Wok Express offers the excitement of fresh wok cooking at mall-friendly prices. Watch as skilled wok chefs toss your custom order in flaming woks, creating fresh stir-fries and noodle dishes in minutes. The interactive concept and budget-friendly pricing make it popular with families and anyone seeking a quick, customizable Chinese meal.',
    specialties: ['Custom wok dishes', 'Build your own', 'Fresh noodles', 'Quick cooking', 'Budget meals'],
    atmosphere: 'Open wok station in food court setting',
    hours: 'Daily 10AM-10PM',
    reservation: 'Not required',
    bestFor: 'Mall shoppers, custom meals, families, budget dining',
    mustTry: 'Build-your-own wok, Beef noodles, Chicken fried rice',
  },
  {
    name: 'Asian Village',
    slug: 'asian-village-riffa',
    location: 'Riffa',
    type: 'Casual Dining',
    rating: 4,
    price: 'BD 7-15 per person',
    cuisine: 'Pan-Asian with Chinese',
    description: 'Asian Village serves the Riffa community with a diverse Pan-Asian menu that includes well-executed Chinese dishes. The restaurant\'s Chinese offerings range from comforting classics to more adventurous regional specialties. The friendly service and family-oriented atmosphere have made it a neighborhood favorite for casual dining.',
    specialties: ['Pan-Asian variety', 'Chinese classics', 'Family dining', 'Delivery', 'Group menus'],
    atmosphere: 'Comfortable neighborhood restaurant',
    hours: 'Daily 11AM-11PM',
    reservation: 'Recommended for groups',
    bestFor: 'Riffa residents, families, mixed groups, casual dinners',
    mustTry: 'Szechuan beef, Special chow mein, Honey chicken, Salt and pepper squid',
  },
  {
    name: 'Panda Express',
    slug: 'panda-express-bahrain',
    location: 'Multiple Locations',
    type: 'Fast Casual',
    rating: 3,
    price: 'BD 3-7 per person',
    cuisine: 'American Chinese',
    description: 'The globally recognized Panda Express brings its American-Chinese comfort food to Bahrain. While not authentically Chinese, the restaurant serves consistent, crowd-pleasing dishes like orange chicken and Beijing beef that satisfy cravings for familiar flavors. The quick service and predictable quality make it reliable for families and those seeking comfort food.',
    specialties: ['Orange chicken', 'Beijing beef', 'Combo plates', 'Quick service', 'Consistent quality'],
    atmosphere: 'Familiar fast-casual American Chinese setting',
    hours: 'Daily 10AM-11PM',
    reservation: 'Not required',
    bestFor: 'Families with kids, comfort food, quick meals, consistent experience',
    mustTry: 'Orange chicken, Beijing beef, Honey walnut shrimp',
  },
  {
    name: 'Zen Restaurant',
    slug: 'zen-restaurant-seef',
    location: 'Seef',
    type: 'Fine Dining',
    rating: 4,
    price: 'BD 15-30 per person',
    cuisine: 'Chinese & Japanese',
    description: 'Zen Restaurant offers a refined Asian dining experience with a strong Chinese menu alongside Japanese options. The Chinese dishes are prepared with attention to authentic techniques, from proper wok hei in stir-fries to carefully steamed dim sum. The minimalist décor creates a peaceful atmosphere that matches the restaurant\'s name.',
    specialties: ['Dual cuisine', 'Dim sum', 'Seafood', 'Sushi and Chinese combos', 'Private rooms'],
    atmosphere: 'Minimalist Asian elegance with tranquil ambiance',
    hours: 'Daily 12PM-11PM',
    reservation: 'Recommended',
    bestFor: 'Mixed groups, business dinners, those wanting variety, special occasions',
    mustTry: 'Dim sum selection, Crispy duck, Salt and pepper prawns, Chinese-style lobster',
  },
  {
    name: 'Lanterns',
    slug: 'lanterns-ritz-carlton',
    location: 'Ritz-Carlton, Seef',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 18-35 per person',
    cuisine: 'Pan-Asian with Chinese',
    description: 'Lanterns at the Ritz-Carlton features an excellent selection of Chinese dishes within its broader Pan-Asian offering. The Chinese menu showcases Cantonese classics prepared with premium ingredients and meticulous technique. The stunning terrace with Gulf views provides an unforgettable backdrop for enjoying expertly prepared dim sum or aromatic claypot dishes.',
    specialties: ['Dim sum', 'Cantonese roasts', 'Terrace dining', 'Gulf views', 'Premium ingredients'],
    atmosphere: 'Elegant hotel dining with spectacular outdoor terrace',
    hours: 'Daily 12PM-11PM',
    reservation: 'Highly recommended for terrace',
    bestFor: 'Special occasions, romantic dinners, impressive entertaining, hotel guests',
    mustTry: 'Weekend dim sum, Peking duck, Black pepper beef, Mango pudding',
  },
];

const restaurantsByCategory = [
  { category: 'Fine Dining', picks: ['China Garden', 'Royal China', 'Lanterns'] },
  { category: 'Best Dim Sum', picks: ['China Garden', 'Lanterns', 'Zen Restaurant'] },
  { category: 'Best Value', picks: ['Chopsticks', 'Wok Express', 'Mandarin Chinese'] },
  { category: 'Authentic', picks: ['China Garden', 'Golden Phoenix', 'Royal China'] },
  { category: 'Best for Groups', picks: ['Royal China', 'Dragon City', 'Golden Phoenix'] },
  { category: 'Quick Meals', picks: ['Chopsticks', 'Wok Express', 'Panda Express'] },
];

const dishes = [
  { dish: 'Dim Sum', description: 'Assorted steamed and fried dumplings, buns, and small bites', where: 'China Garden, Lanterns, Zen Restaurant' },
  { dish: 'Peking Duck', description: 'Crispy-skinned roast duck served with pancakes and hoisin', where: 'China Garden, Royal China, Golden Phoenix' },
  { dish: 'Kung Pao Chicken', description: 'Wok-fried chicken with peanuts, chilies, and Sichuan pepper', where: 'Golden Phoenix, Mandarin Chinese, Chopsticks' },
  { dish: 'Sweet & Sour Pork', description: 'Crispy pork pieces in tangy fruit-based sauce', where: 'Mandarin Chinese, Dragon City, Royal China' },
  { dish: 'Mapo Tofu', description: 'Silky tofu in spicy Sichuan bean paste with minced meat', where: 'Golden Phoenix, Furn Bistro, Zen Restaurant' },
  { dish: 'Char Siu', description: 'Cantonese BBQ pork with honey glaze', where: 'China Garden, Royal China, Lanterns' },
  { dish: 'Fried Rice', description: 'Wok-fried rice with eggs, vegetables, and choice of protein', where: 'Dragon City, Mandarin Chinese, Chopsticks' },
  { dish: 'Chow Mein', description: 'Stir-fried noodles with vegetables and protein', where: 'Asian Village, Wok Express, Dragon City' },
];

const tips = [
  {
    title: 'Dim Sum Timing',
    content: 'Dim sum is traditionally a lunch affair. Arrive early (before 1 PM) at popular spots like China Garden for the freshest selection and to avoid waiting.',
  },
  {
    title: 'Share Family Style',
    content: 'Chinese meals are designed for sharing. Order several dishes for the table and share — this gives you variety and is the authentic way to dine.',
  },
  {
    title: 'Rice is Essential',
    content: 'For non-soup dishes, steamed jasmine rice is essential. It balances rich sauces and extends your dishes. Don\'t skip it.',
  },
  {
    title: 'Spice Levels',
    content: 'Sichuan dishes are genuinely spicy. The numbing sensation from Sichuan peppercorns is intentional. Ask for mild if you\'re not experienced with the heat.',
  },
  {
    title: 'Reserve for Peking Duck',
    content: 'Peking duck often requires advance ordering (sometimes 24 hours). Call ahead to avoid disappointment at fine dining restaurants.',
  },
  {
    title: 'Lunch Specials',
    content: 'Many Chinese restaurants offer lunch sets that provide excellent value — often 30-40% cheaper than ordering the same items à la carte.',
  },
];

const faqs = [
  {
    q: 'What is the best Chinese restaurant in Bahrain for dim sum?',
    a: 'China Garden at the Gulf Hotel is widely regarded as having the best dim sum in Bahrain, with skilled Hong Kong-trained chefs preparing authentic Cantonese dumplings and buns. Lanterns at the Ritz-Carlton also offers excellent weekend dim sum with the bonus of terrace views. For both, reservations are essential, especially on weekends.',
  },
  {
    q: 'Where can I find authentic Sichuan food in Bahrain?',
    a: 'Golden Phoenix in the Diplomatic Area specializes in Sichuan cuisine alongside Cantonese dishes. Their Mapo tofu, Kung Pao chicken, and dan dan noodles deliver authentic Sichuan flavors with the characteristic numbing spice of Sichuan peppercorns. Ask for "authentic spicy" if you want the full experience.',
  },
  {
    q: 'Which Chinese restaurants in Bahrain offer Peking duck?',
    a: 'China Garden at the Gulf Hotel is famous for its Peking duck, carved tableside with traditional accompaniments. Royal China and Golden Phoenix also prepare excellent versions. It\'s advisable to order Peking duck in advance (at least a few hours, sometimes 24 hours) to ensure availability.',
  },
  {
    q: 'What are the cheapest Chinese restaurants in Bahrain?',
    a: 'Wok Express and Panda Express offer meals from BD 3-7 per person. Chopsticks provides good Chinese fast-casual options at multiple locations for BD 4-10. Mandarin Chinese offers authentic dishes at BD 6-15, representing excellent value for sit-down Chinese dining.',
  },
  {
    q: 'Are there Chinese restaurants in Bahrain suitable for large groups?',
    a: 'Royal China and China Garden both offer private dining rooms ideal for large groups and celebrations. Dragon City in Juffair can accommodate big parties with family-style sharing menus. Golden Phoenix also welcomes groups and can arrange banquet-style dining for special occasions.',
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
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-amber-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium mb-4">
              🥡 Ultimate Chinese Food Guide 2026
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-red-400 to-amber-500 bg-clip-text text-transparent">
                Best Chinese Restaurants
              </span>
              {' '}in Bahrain 2026
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From exquisite dim sum at China Garden to fiery Sichuan specialties — 
              your complete guide to the best Chinese restaurants, Cantonese cuisine, and authentic Asian flavors in Bahrain.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated} | By <Link href="https://www.bahrainnights.com" className="text-red-400 hover:underline">BahrainNights.com</Link>
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Restaurants Reviewed', value: '30+', icon: Utensils },
              { label: 'Budget From', value: 'BD 3', icon: DollarSign },
              { label: 'Dim Sum Spots', value: '5+', icon: Award },
              { label: 'Regional Cuisines', value: '4+', icon: Flame },
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
              Chinese cuisine in Bahrain reflects the incredible diversity of China&apos;s culinary heritage, from the delicate 
              refinement of Cantonese dim sum to the bold, numbing heat of Sichuan cooking. With a significant Chinese 
              expat community and generations of established restaurants, Bahrain offers authentic Chinese dining 
              experiences that rival those found in major Asian cities.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mt-4">
              Whether you&apos;re craving the theatrical presentation of Peking duck, the comfort of perfectly fried rice 
              with proper wok hei, or the sophisticated artistry of handcrafted dim sum, this guide will help you 
              navigate Bahrain&apos;s Chinese restaurant scene. From opulent hotel fine dining to humble neighborhood 
              eateries treasured by locals, discover where to find the kingdom&apos;s best Chinese flavors.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mt-4">
              Chinese cooking is one of the world&apos;s great culinary traditions, built on principles of balance, 
              texture, and flavor harmony. The best Chinese restaurants in Bahrain honor these traditions with 
              skilled chefs, quality ingredients, and cooking techniques honed over millennia. From the sizzle 
              of a scorching wok to the gentle steam of bamboo baskets, every element contributes to dishes 
              that are both nourishing and deeply satisfying.
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
      <section className="py-12 px-4 bg-gradient-to-r from-red-500/20 to-amber-500/20">
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
              { title: 'Indian', href: '/guides/best-indian-restaurants-bahrain', emoji: '🍛' },
              { title: 'Japanese & Sushi', href: '/guides/best-japanese-restaurants-bahrain', emoji: '🍣' },
              { title: 'Thai', href: '/guides/best-thai-restaurants-bahrain', emoji: '🍜' },
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
            headline: 'Best Chinese Restaurants in Bahrain 2026 | Top 12 Dim Sum & Cantonese',
            description: 'Complete guide to the best Chinese restaurants in Bahrain, from authentic dim sum to Sichuan cuisine and fast-casual options.',
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
