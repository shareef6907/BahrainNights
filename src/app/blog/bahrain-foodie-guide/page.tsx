import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Utensils, MapPin, Star, Clock, ArrowRight, Heart,
  Sparkles, ChefHat, Coffee, Globe, Fish, Beef,
  Flame, Wine, Users, Camera
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'The Ultimate Bahrain Foodie Guide — 50 Must-Try Dishes | BahrainNights',
  description: 'Discover 50 must-try dishes in Bahrain! From traditional machboos and harees to international favorites. Your complete Bahrain food bucket list with where to find each dish.',
  keywords: [
    'Bahrain food guide', 'Bahraini cuisine', 'must try food Bahrain', 'best dishes Bahrain',
    'machboos', 'harees', 'Bahrain traditional food', 'what to eat in Bahrain',
    'Bahrain restaurant guide', 'Bahrain foodie', 'Gulf cuisine', 'Middle Eastern food Bahrain'
  ].join(', '),
  alternates: {
    canonical: 'https://www.bahrainnights.com/blog/bahrain-foodie-guide',
  },
  openGraph: {
    title: 'The Ultimate Bahrain Foodie Guide — 50 Must-Try Dishes',
    description: 'Your complete guide to the best food in Bahrain. 50 dishes you absolutely must try!',
    url: 'https://www.bahrainnights.com/blog/bahrain-foodie-guide',
    siteName: 'BahrainNights',
    images: [
      {
        url: 'https://www.bahrainnights.com/og-foodie-guide.jpg',
        width: 1200,
        height: 630,
        alt: 'Bahrain Foodie Guide - 50 Must-Try Dishes',
      },
    ],
    type: 'article',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Ultimate Bahrain Foodie Guide — 50 Must-Try Dishes',
    description: 'Your complete Bahrain food bucket list!',
  },
  authors: [{ name: 'BahrainNights Team' }],
  robots: {
    index: true,
    follow: true,
  },
};

function generateSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'The Ultimate Bahrain Foodie Guide — 50 Must-Try Dishes',
    description: 'Discover 50 must-try dishes in Bahrain from traditional Bahraini cuisine to international favorites.',
    image: 'https://www.bahrainnights.com/og-foodie-guide.jpg',
    author: {
      '@type': 'Organization',
      name: 'BahrainNights Team',
      url: 'https://www.bahrainnights.com'
    },
    publisher: {
      '@type': 'Organization',
      name: 'BahrainNights',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.bahrainnights.com/logo.png'
      }
    },
    datePublished: '2026-01-01',
    dateModified: '2026-02-08',
    mainEntityOfPage: 'https://www.bahrainnights.com/blog/bahrain-foodie-guide'
  };
}

const traditionalDishes = [
  { num: 1, name: 'Machboos', desc: 'The national dish of Bahrain. Spiced rice with tender lamb or chicken, dried limes, and fragrant baharat. A must-try for any visitor.', where: 'Haji\'s Café, Bahraini Heritage Restaurant', price: '$$' },
  { num: 2, name: 'Harees', desc: 'Wheat porridge slow-cooked with meat until silky smooth. Traditionally served during Ramadan but available year-round.', where: 'Traditional restaurants in Muharraq', price: '$' },
  { num: 3, name: 'Balaleet', desc: 'Sweet vermicelli noodles topped with a savory egg omelette. The sweet-savory combination is uniquely Bahraini.', where: 'Haji\'s Café, local breakfast spots', price: '$' },
  { num: 4, name: 'Muhammar', desc: 'Sweet rice with dates and rose water, often served with fried fish. A beloved Bahraini comfort food.', where: 'Bahraini Heritage, Budaiya restaurants', price: '$$' },
  { num: 5, name: 'Gabout', desc: 'Traditional Bahraini dumplings filled with meat and spices, served in a rich tomato-based stew.', where: 'Haji\'s Café, traditional homes', price: '$' },
  { num: 6, name: 'Qoozi', desc: 'Whole roasted lamb stuffed with rice, eggs, and spices. The ultimate celebration dish for weddings and Eid.', where: 'Gulf Hotel, major hotel restaurants', price: '$$$$' },
  { num: 7, name: 'Samak Mashwi', desc: 'Fresh Gulf fish grilled to perfection with simple spices. Best enjoyed by the sea at a Budaiya restaurant.', where: 'Lanterns, Budaiya seafood restaurants', price: '$$' },
  { num: 8, name: 'Luqaimat', desc: 'Sweet fried dough balls drizzled with date syrup. These addictive treats are Bahrain\'s favorite dessert.', where: 'Street vendors, traditional restaurants', price: '$' },
  { num: 9, name: 'Khanfaroosh', desc: 'Traditional Bahraini saffron rice pancakes, often served at celebrations and during Ramadan.', where: 'Local bakeries, home cooks', price: '$' },
  { num: 10, name: 'Chai Haleeb', desc: 'Sweet milk tea infused with cardamom and saffron. The essential Bahraini beverage.', where: 'Every café and restaurant', price: '$' },
];

const middleEasternFavorites = [
  { num: 11, name: 'Shawarma', desc: 'Slow-roasted meat wrapped in fresh bread with garlic sauce. Bahrain has perfected this street food.', where: 'Jasmis, Aroos Damascus, street vendors', price: '$' },
  { num: 12, name: 'Hummus with Lamb', desc: 'Creamy hummus topped with spiced ground lamb and pine nuts. Elevated comfort food.', where: 'Al Abraaj, Lebanese restaurants', price: '$$' },
  { num: 13, name: 'Mixed Grill', desc: 'An assortment of grilled meats including kebabs, tikka, and kofta with Arabic bread.', where: 'Al Abraaj, Bahraini Heritage', price: '$$' },
  { num: 14, name: 'Fattoush', desc: 'Fresh salad with crispy pita chips and sumac dressing. Refreshing and packed with flavor.', where: 'Every Lebanese restaurant', price: '$' },
  { num: 15, name: 'Moutabal', desc: 'Smoky eggplant dip with tahini and pomegranate seeds. Essential part of any mezze spread.', where: 'Al Abraaj, fine dining restaurants', price: '$' },
  { num: 16, name: 'Manakeesh', desc: 'Lebanese flatbread with za\'atar, cheese, or meat. Perfect for breakfast or a quick snack.', where: 'Wooden Bakery, Lebanese bakeries', price: '$' },
  { num: 17, name: 'Kunafa', desc: 'Cheese pastry soaked in sweet syrup with crispy shredded phyllo. The ultimate Middle Eastern dessert.', where: 'Habibah, Wooden Bakery', price: '$' },
  { num: 18, name: 'Lamb Ouzi', desc: 'Slow-roasted lamb served over spiced rice with nuts and raisins. A feast for special occasions.', where: 'Gulf Hotel, major hotel restaurants', price: '$$$' },
  { num: 19, name: 'Falafel Wrap', desc: 'Crispy falafel with fresh vegetables and tahini in warm pita. Bahrain\'s favorite vegetarian option.', where: 'Aroos Damascus, street vendors', price: '$' },
  { num: 20, name: 'Shish Taouk', desc: 'Marinated chicken skewers grilled to juicy perfection. A crowd-pleaser at any gathering.', where: 'Lebanese restaurants, hotel restaurants', price: '$$' },
];

const internationalHighlights = [
  { num: 21, name: 'Butter Chicken', desc: 'Creamy tomato-based curry that\'s become a Bahrain staple. The Indian community has perfected it here.', where: 'Zafran, Copper Chimney, Lanterns', price: '$$' },
  { num: 22, name: 'Biryani', desc: 'Fragrant rice layered with spiced meat. Hyderabadi and Lucknowi styles are both popular in Bahrain.', where: 'Zafran, Saffron, Indian restaurants', price: '$$' },
  { num: 23, name: 'Fish and Chips', desc: 'British classic done right at Bahrain\'s British-style pubs and restaurants.', where: 'JJ\'s Irish Pub, British Club', price: '$$' },
  { num: 24, name: 'Sushi Omakase', desc: 'Chef\'s choice sushi experience with premium imported fish. Bahrain\'s Japanese scene is booming.', where: 'Sushi Shin, Bushido, Mirai', price: '$$$$' },
  { num: 25, name: 'Neapolitan Pizza', desc: 'Wood-fired pizza with San Marzano tomatoes and buffalo mozzarella. Authenticity is key.', where: 'Masso, Segafredo, Italian restaurants', price: '$$' },
  { num: 26, name: 'Pad Thai', desc: 'Stir-fried noodles with tamarind, peanuts, and lime. Thai restaurants in Bahrain don\'t disappoint.', where: 'Thai Express, hotel Thai restaurants', price: '$$' },
  { num: 27, name: 'Peking Duck', desc: 'Crispy-skinned duck with pancakes and hoisin sauce. A special occasion worthy dish.', where: 'Dynasty, hotel Chinese restaurants', price: '$$$' },
  { num: 28, name: 'Wagyu Steak', desc: 'Premium Japanese beef grilled to perfection. Several Bahrain restaurants offer A5 grade.', where: 'CUT by Wolfgang Puck, Nusr-Et', price: '$$$$' },
  { num: 29, name: 'Tacos Al Pastor', desc: 'Spit-roasted pork tacos with pineapple. Latin American flavors are gaining ground in Bahrain.', where: 'Calexico, Mexican restaurants', price: '$$' },
  { num: 30, name: 'Pho', desc: 'Vietnamese noodle soup with fragrant broth. Comfort in a bowl, especially on cooler evenings.', where: 'Vietnamese restaurants, food courts', price: '$' },
];

const seafoodSpecials = [
  { num: 31, name: 'Hammour', desc: 'The Gulf\'s most prized fish. Mild, flaky, and best grilled with simple spices.', where: 'Fish Market, Lanterns, seaside restaurants', price: '$$' },
  { num: 32, name: 'King Fish Tikka', desc: 'Marinated king fish grilled in the tandoor. Smoky, spicy, and absolutely addictive.', where: 'Indian restaurants, Zafran', price: '$$' },
  { num: 33, name: 'Lobster Thermidor', desc: 'Classic French preparation with a creamy sauce. Bahrain\'s five-star hotels excel at this.', where: 'La Mer, Gulf Hotel', price: '$$$$' },
  { num: 34, name: 'Jumbo Prawns', desc: 'Giant Gulf prawns grilled, fried, or in curry. A seafood lover\'s dream.', where: 'Fish Market, seafood restaurants', price: '$$$' },
  { num: 35, name: 'Fresh Oysters', desc: 'Imported oysters on the half shell. Several fine dining spots offer excellent selections.', where: 'La Mer, CUT, fine dining restaurants', price: '$$$$' },
  { num: 36, name: 'Seafood Machboos', desc: 'The rice dish made with fresh Gulf fish instead of meat. A coastal Bahraini specialty.', where: 'Traditional restaurants, Budaiya area', price: '$$' },
  { num: 37, name: 'Crab Curry', desc: 'Fresh crab in rich, spicy gravy. The best ones use local mud crabs.', where: 'Indian seafood restaurants', price: '$$' },
  { num: 38, name: 'Grilled Zubaidi', desc: 'Silver pomfret, a Gulf delicacy, grilled whole with lemon and herbs.', where: 'Lanterns, traditional restaurants', price: '$$' },
  { num: 39, name: 'Sashimi Platter', desc: 'Pristine raw fish from Tokyo\'s markets, sliced to perfection.', where: 'Bushido, Sushi Shin, Mirai', price: '$$$' },
  { num: 40, name: 'Seafood Tower', desc: 'An impressive display of oysters, prawns, crab, and lobster on ice.', where: 'La Mer, fine dining restaurants', price: '$$$$' },
];

const sweetTreats = [
  { num: 41, name: 'Umm Ali', desc: 'Egyptian bread pudding with cream, nuts, and raisins. Warm, comforting perfection.', where: 'Hotel restaurants, Arabic restaurants', price: '$' },
  { num: 42, name: 'Ras Al Abed', desc: 'Chocolate-coated marshmallow treats. A nostalgic favorite across the Gulf.', where: 'Supermarkets, sweet shops', price: '$' },
  { num: 43, name: 'Arabic Ice Cream', desc: 'Stretchy mastic ice cream with pistachios. Unlike any ice cream you\'ve had before.', where: 'Bachir, Arabic ice cream shops', price: '$' },
  { num: 44, name: 'Baklava', desc: 'Layers of phyllo, nuts, and honey syrup. Turkish and Lebanese varieties are both excellent.', where: 'Wooden Bakery, sweet shops', price: '$' },
  { num: 45, name: 'Cheesecake', desc: 'New York style or Japanese fluffy — Bahrain\'s café scene has perfected both.', where: 'Café Lilou, 198 Café', price: '$$' },
  { num: 46, name: 'Crème Brûlée', desc: 'Classic French dessert with crackling caramelized sugar top.', where: 'Fine dining restaurants', price: '$$' },
  { num: 47, name: 'Mahalabia', desc: 'Rosewater-scented milk pudding with pistachios. Light, fragrant, and refreshing.', where: 'Arabic restaurants, hotel buffets', price: '$' },
  { num: 48, name: 'Date Cake', desc: 'Moist cake made with Bahraini dates. Sweet, sticky, and utterly irresistible.', where: 'Local bakeries, hotel restaurants', price: '$' },
  { num: 49, name: 'Matcha Desserts', desc: 'Japanese green tea in cakes, ice cream, and more. The matcha trend is strong in Bahrain.', where: 'Meisei, Japanese cafés', price: '$$' },
  { num: 50, name: 'French Macarons', desc: 'Delicate almond meringue cookies in rainbow colors. Bahrain\'s pastry chefs nail these.', where: 'Café Lilou, hotel patisseries', price: '$$' },
];

const foodieExperiences = [
  { name: 'Friday Brunch', desc: 'The Gulf\'s signature dining experience. Unlimited food and drinks at world-class hotels.', icon: Wine },
  { name: 'Budaiya Seafood Trail', desc: 'Drive along the coast and stop at roadside fish restaurants for the freshest catch.', icon: Fish },
  { name: 'Muharraq Heritage Walk', desc: 'Explore traditional cafés and bakeries in Bahrain\'s historic heart.', icon: Camera },
  { name: 'Night Market Food Stalls', desc: 'Street food from around the world at Bahrain\'s various night markets.', icon: Users },
];

export default function FoodieGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSchema()) }}
      />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/30 to-orange-900/30" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
          
          <div className="max-w-4xl mx-auto relative z-10">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li>/</li>
                <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
                <li>/</li>
                <li className="text-white">Bahrain Foodie Guide</li>
              </ol>
            </nav>

            <div className="text-center">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full text-red-300 text-sm mb-4">
                <Heart className="w-4 h-4" /> 50 Must-Try Dishes
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-red-200 to-orange-200 bg-clip-text text-transparent leading-tight">
                The Ultimate Bahrain Foodie Guide
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                From traditional Bahraini delicacies passed down through generations to international 
                favorites perfected by world-class chefs, this is your essential eating bucket list.
              </p>
              
              <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> 15 min read
                </span>
                <span>•</span>
                <span>By BahrainNights Team</span>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
            <p className="text-gray-300 leading-relaxed text-lg">
              Bahrain may be the smallest country in the Gulf, but its food scene punches well above its weight. 
              As a trading hub for thousands of years, the Kingdom has absorbed culinary influences from across 
              the globe while maintaining a proud tradition of local dishes that tell the story of its pearl-diving 
              heritage and desert roots.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              Whether you're a resident looking to explore beyond your comfort zone or a visitor seeking authentic 
              experiences, this guide covers 50 dishes you absolutely must try in Bahrain. We've organized them by 
              category and included our favorite spots to find each one. Consider this your official Bahrain food 
              bucket list.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              Pro tip: The best way to experience Bahrain's food culture is with an open mind and an empty stomach. 
              Some of the most memorable meals happen at unassuming local spots rather than fancy restaurants. 
              Don't be afraid to ask locals for recommendations — Bahrainis love sharing their food traditions.
            </p>
          </div>
        </section>

        {/* Traditional Bahraini Section */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">🇧🇭 Traditional Bahraini</h2>
                <p className="text-gray-400">Dishes #1-10: The authentic flavors of the Kingdom</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-8 max-w-3xl">
              Start your Bahrain food journey with traditional dishes. These recipes have been passed down through 
              generations, reflecting the island's history as a pearl-diving nation and its position at the crossroads 
              of ancient trade routes.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {traditionalDishes.map((dish) => (
                <div key={dish.num} className="p-5 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-amber-500/50 transition">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold">
                      {dish.num}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-semibold text-white">{dish.name}</h3>
                        <span className="text-amber-400 text-sm">{dish.price}</span>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{dish.desc}</p>
                      <p className="text-amber-400/70 text-xs flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {dish.where}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Middle Eastern Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">🥙 Middle Eastern Favorites</h2>
                <p className="text-gray-400">Dishes #11-20: Lebanese, Turkish, and regional classics</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-8 max-w-3xl">
              Bahrain's large Lebanese and Levantine communities have brought their culinary traditions to the 
              island. These dishes have become so integrated that they're practically local now.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {middleEasternFavorites.map((dish) => (
                <div key={dish.num} className="p-5 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-green-500/50 transition">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold">
                      {dish.num}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-semibold text-white">{dish.name}</h3>
                        <span className="text-green-400 text-sm">{dish.price}</span>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{dish.desc}</p>
                      <p className="text-green-400/70 text-xs flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {dish.where}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* International Section */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">🌍 International Highlights</h2>
                <p className="text-gray-400">Dishes #21-30: Global flavors done right</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-8 max-w-3xl">
              Bahrain's cosmopolitan population has created demand for authentic international cuisines. 
              From Indian curries perfected by generations of expats to Japanese omakase from Tokyo-trained chefs, 
              the world is on your plate.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {internationalHighlights.map((dish) => (
                <div key={dish.num} className="p-5 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-purple-500/50 transition">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold">
                      {dish.num}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-semibold text-white">{dish.name}</h3>
                        <span className="text-purple-400 text-sm">{dish.price}</span>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{dish.desc}</p>
                      <p className="text-purple-400/70 text-xs flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {dish.where}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Seafood Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600">
                <Fish className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">🐟 Seafood Specials</h2>
                <p className="text-gray-400">Dishes #31-40: Fresh from the Arabian Gulf</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-8 max-w-3xl">
              As an island nation, Bahrain has an incredible seafood tradition. The morning fish markets are 
              a must-visit, and the restaurants along the coast serve catches that were swimming just hours before.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {seafoodSpecials.map((dish) => (
                <div key={dish.num} className="p-5 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-cyan-500/50 transition">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
                      {dish.num}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-semibold text-white">{dish.name}</h3>
                        <span className="text-cyan-400 text-sm">{dish.price}</span>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{dish.desc}</p>
                      <p className="text-cyan-400/70 text-xs flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {dish.where}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Desserts Section */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">🍰 Sweet Treats</h2>
                <p className="text-gray-400">Dishes #41-50: Save room for dessert</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-8 max-w-3xl">
              The Gulf has a serious sweet tooth, and Bahrain is no exception. From traditional date-based 
              desserts to French patisserie, there's always room for something sweet.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {sweetTreats.map((dish) => (
                <div key={dish.num} className="p-5 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-pink-500/50 transition">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 flex items-center justify-center text-white font-bold">
                      {dish.num}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-semibold text-white">{dish.name}</h3>
                        <span className="text-pink-400 text-sm">{dish.price}</span>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{dish.desc}</p>
                      <p className="text-pink-400/70 text-xs flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {dish.where}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Foodie Experiences */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-amber-400" />
              Bonus: Must-Do Foodie Experiences
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {foodieExperiences.map((exp) => (
                <div key={exp.name} className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
                  <exp.icon className="w-8 h-8 text-amber-400 mb-3" />
                  <h3 className="text-xl font-semibold text-white mb-2">{exp.name}</h3>
                  <p className="text-gray-400">{exp.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">Eating Like a Local: Top Tips</h2>
            
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl border border-amber-500/30">
                <h3 className="text-xl font-semibold text-amber-300 mb-2">🕐 Timing Is Everything</h3>
                <p className="text-gray-300">
                  Bahrainis eat late. Dinner often starts at 9 PM or later, and many restaurants are busiest 
                  around 10 PM. For a more peaceful experience, arrive early. For the authentic vibe, go late.
                </p>
              </div>
              
              <div className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl border border-green-500/30">
                <h3 className="text-xl font-semibold text-green-300 mb-2">🍽️ Share Everything</h3>
                <p className="text-gray-300">
                  Gulf dining culture is communal. Order multiple dishes to share, and don't be shy about 
                  eating with your hands when appropriate. Communal platters are the norm at traditional restaurants.
                </p>
              </div>
              
              <div className="p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl border border-blue-500/30">
                <h3 className="text-xl font-semibold text-blue-300 mb-2">💬 Ask for Recommendations</h3>
                <p className="text-gray-300">
                  Bahrainis are proud of their food culture. Ask servers, hotel staff, or taxi drivers for their 
                  favorite spots. Some of the best meals come from recommendations off the beaten path.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-red-900/30 to-orange-900/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Start Your Food Adventure</h2>
            <p className="text-gray-300 text-lg mb-8">
              Ready to eat your way through Bahrain? Explore our restaurant directory to find all these dishes and more.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/restaurants"
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-full text-white font-semibold hover:opacity-90 transition"
              >
                Browse Restaurants
              </Link>
              <Link 
                href="/best-restaurants-bahrain"
                className="px-8 py-4 bg-gray-800 rounded-full text-white font-semibold hover:bg-gray-700 transition"
              >
                Best Restaurants Guide
              </Link>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8">Related Guides</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/blog/new-restaurants-bahrain-2026" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition group">
                <Utensils className="w-8 h-8 text-orange-400 mb-3" />
                <h3 className="font-semibold text-white group-hover:text-orange-300 transition">New Restaurants 2026</h3>
                <p className="text-sm text-gray-400 mt-2">Latest openings in Bahrain</p>
              </Link>
              <Link href="/guides/brunch" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition group">
                <Coffee className="w-8 h-8 text-amber-400 mb-3" />
                <h3 className="font-semibold text-white group-hover:text-amber-300 transition">Friday Brunch Guide</h3>
                <p className="text-sm text-gray-400 mt-2">Best brunches in Bahrain</p>
              </Link>
              <Link href="/guides/seafood" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition group">
                <Fish className="w-8 h-8 text-cyan-400 mb-3" />
                <h3 className="font-semibold text-white group-hover:text-cyan-300 transition">Seafood Guide</h3>
                <p className="text-sm text-gray-400 mt-2">Fresh from the Gulf</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
