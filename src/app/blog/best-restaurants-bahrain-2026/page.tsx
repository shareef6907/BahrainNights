import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Utensils, MapPin, Star, Clock, ArrowRight, Sparkles,
  Award, Users, ChefHat, Flame, Wine, Globe,
  Heart, DollarSign, Calendar, ChevronRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Restaurants in Bahrain 2026 — Top 50 Dining Experiences | BahrainNights',
  description: 'Discover the best restaurants in Bahrain for 2026. From fine dining to hidden gems, our comprehensive guide covers top restaurants across all cuisines and price points.',
  keywords: [
    'best restaurants Bahrain 2026', 'top restaurants Bahrain', 'fine dining Bahrain',
    'Bahrain restaurant guide', 'where to eat Bahrain', 'Manama restaurants',
    'Bahrain food scene', 'new restaurants Bahrain', 'romantic restaurants Bahrain',
    'best seafood Bahrain', 'Bahrain steakhouse', 'Bahrain dining'
  ].join(', '),
  alternates: {
    canonical: 'https://www.bahrainnights.com/blog/best-restaurants-bahrain-2026',
  },
  openGraph: {
    title: 'Best Restaurants in Bahrain 2026 — Top 50 Dining Experiences',
    description: 'Your definitive guide to the best restaurants in Bahrain for 2026.',
    url: 'https://www.bahrainnights.com/blog/best-restaurants-bahrain-2026',
    siteName: 'BahrainNights',
    images: [
      {
        url: 'https://www.bahrainnights.com/og-restaurants-2026.jpg',
        width: 1200,
        height: 630,
        alt: 'Best Restaurants Bahrain 2026',
      },
    ],
    type: 'article',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Restaurants in Bahrain 2026',
    description: 'Top 50 restaurants you need to try in Bahrain!',
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
    '@graph': [
      {
        '@type': 'Article',
        headline: 'Best Restaurants in Bahrain 2026 — Top 50 Dining Experiences',
        description: 'Your definitive guide to the best restaurants in Bahrain for 2026.',
        image: 'https://www.bahrainnights.com/og-restaurants-2026.jpg',
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
        dateModified: '2026-02-15',
        mainEntityOfPage: 'https://www.bahrainnights.com/blog/best-restaurants-bahrain-2026'
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is the most expensive restaurant in Bahrain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'CUT by Wolfgang Puck at Four Seasons and Nusr-Et (Salt Bae\'s restaurant) are among the most expensive, with steaks exceeding BHD 100. Fine dining Japanese omakase can also reach BHD 150+ per person.'
            }
          },
          {
            '@type': 'Question',
            name: 'Do I need reservations for restaurants in Bahrain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'For fine dining and popular restaurants, especially on weekends (Thursday-Saturday), reservations are highly recommended. Many restaurants accept bookings via phone, Instagram DM, or platforms like OpenTable.'
            }
          },
          {
            '@type': 'Question',
            name: 'What are the best areas for restaurants in Bahrain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Adliya is famous for its diverse restaurant scene. Seef and Bahrain Bay offer upscale hotel dining. Juffair has international options, while Muharraq provides authentic traditional Bahraini cuisine.'
            }
          }
        ]
      }
    ]
  };
}

const fineDining = [
  { name: 'CUT by Wolfgang Puck', cuisine: 'Steakhouse', location: 'Four Seasons, Bahrain Bay', price: '$$$$', desc: 'World-class steaks with stunning bay views. The truffle fries and tomahawk are legendary. Perfect for special occasions.' },
  { name: 'La Mer', cuisine: 'French/Mediterranean', location: 'Ritz-Carlton', price: '$$$$', desc: 'Elegant French cuisine with impeccable service. The seafood tower and lobster thermidor are exceptional.' },
  { name: 'Bushido', cuisine: 'Japanese', location: 'Gulf Hotel', price: '$$$', desc: 'Theatrical Japanese dining with live performances. The omakase experience is worth every dinar.' },
  { name: 'Plums', cuisine: 'International Fine Dining', location: 'Gulf Hotel', price: '$$$$', desc: 'Bahrain\'s most awarded restaurant. Seasonal menus showcasing global techniques with local ingredients.' },
  { name: 'Nusr-Et', cuisine: 'Steakhouse', location: 'Four Seasons', price: '$$$$', desc: 'Salt Bae\'s famous steakhouse. The experience is as much about the showmanship as the meat.' },
  { name: 'Mirai', cuisine: 'Japanese Omakase', location: 'Bahrain Bay', price: '$$$$', desc: 'Intimate omakase counter with fish flown in from Tokyo\'s Tsukiji Market. Book weeks in advance.' },
  { name: 're/Asian Cuisine', cuisine: 'Pan-Asian', location: 'Four Seasons', price: '$$$', desc: 'Modern Asian dishes in a sleek setting. The dim sum and Peking duck are standouts.' },
  { name: 'Masso', cuisine: 'Italian', location: 'Bahrain Bay', price: '$$$', desc: 'Authentic Italian with house-made pasta and wood-fired pizzas. The tiramisu is divine.' },
];

const bestByCuisine = [
  {
    cuisine: 'Arabic & Lebanese',
    icon: '🥙',
    restaurants: [
      { name: 'Al Abraaj', location: 'Seef', desc: 'Outstanding Lebanese mezze and grills in an elegant tent-style setting.' },
      { name: 'Bahraini Heritage', location: 'Budaiya', desc: 'Authentic Bahraini dishes in a traditional house. The machboos is perfect.' },
      { name: 'Haji\'s Café', location: 'Muharraq', desc: 'Institution for traditional breakfast. Balaleet and chai haleeb are must-tries.' },
      { name: 'Aroos Damascus', location: 'Multiple', desc: 'Legendary shawarma and falafel. The late-night queues speak for themselves.' },
    ]
  },
  {
    cuisine: 'Indian',
    icon: '🍛',
    restaurants: [
      { name: 'Zafran', location: 'Adliya', desc: 'North Indian fine dining with live music. The butter chicken and naan are sublime.' },
      { name: 'Copper Chimney', location: 'Seef', desc: 'Authentic tandoori and curries from a legendary Indian chain.' },
      { name: 'Rasoi by Vineet', location: 'Gulf Hotel', desc: 'Michelin-starred chef Vineet Bhatia\'s contemporary Indian fine dining experience.' },
      { name: 'Lanterns', location: 'Adliya', desc: 'Creative Indian fusion in a gorgeous setting. Great for groups.' },
    ]
  },
  {
    cuisine: 'Japanese',
    icon: '🍣',
    restaurants: [
      { name: 'Bushido', location: 'Gulf Hotel', desc: 'The complete Japanese experience with teppanyaki, sushi, and performances.' },
      { name: 'Mirai', location: 'Bahrain Bay', desc: 'Authentic omakase with seasonal fish from Japan.' },
      { name: 'Sushi Shin', location: 'Adliya', desc: 'Neighborhood sushi bar with exceptional quality and fair prices.' },
      { name: 'Meisei', location: 'Seef', desc: 'Casual Japanese with excellent ramen and robatayaki.' },
    ]
  },
  {
    cuisine: 'Italian',
    icon: '🍝',
    restaurants: [
      { name: 'Masso', location: 'Bahrain Bay', desc: 'Wood-fired pizzas and hand-made pasta in a lively atmosphere.' },
      { name: 'Segafredo', location: 'Adliya', desc: 'Authentic Italian with great coffee culture. Perfect for casual dining.' },
      { name: 'Il Terrazzo', location: 'Crowne Plaza', desc: 'Classic Italian with an extensive wine list and romantic ambiance.' },
      { name: 'Caffe Milano', location: 'Four Seasons', desc: 'Upscale Italian with bay views and impeccable pasta dishes.' },
    ]
  },
  {
    cuisine: 'Seafood',
    icon: '🦞',
    restaurants: [
      { name: 'La Mer', location: 'Ritz-Carlton', desc: 'Premium seafood with French techniques. The seafood tower is legendary.' },
      { name: 'Fish Market', location: 'Multiple', desc: 'Pick your fish, pick your style. Fresh Gulf seafood at its best.' },
      { name: 'Lanterns', location: 'Adliya', desc: 'Creative seafood dishes alongside Indian favorites.' },
      { name: 'Budaiya Seaside', location: 'Budaiya', desc: 'Casual seaside dining with the freshest catch of the day.' },
    ]
  },
];

const hiddenGems = [
  { name: 'Coco\'s', location: 'Adliya', cuisine: 'Café', desc: 'Charming café with the best croissants outside Paris. Breakfast here is a must.', price: '$$' },
  { name: 'Takht Jamsheed', location: 'Seef', cuisine: 'Persian', desc: 'Authentic Iranian cuisine in an unassuming location. The kebabs are perfection.', price: '$$' },
  { name: 'Café Lilou', location: 'Adliya', cuisine: 'French Café', desc: 'Parisian vibes with excellent pastries and light fare. Perfect for afternoon tea.', price: '$$' },
  { name: 'Maki Bahrain', location: 'Manama', cuisine: 'Japanese', desc: 'No-frills sushi spot with incredibly fresh fish and wallet-friendly prices.', price: '$' },
  { name: 'Thai Corner', location: 'Juffair', cuisine: 'Thai', desc: 'Tiny restaurant serving some of the most authentic Thai food in Bahrain.', price: '$' },
  { name: 'My Café', location: 'Muharraq', cuisine: 'Bahraini', desc: 'Local favorite for traditional dishes. Ask the owner for daily specials.', price: '$' },
];

const romanticRestaurants = [
  { name: 'La Mer', location: 'Ritz-Carlton', why: 'Elegant ambiance, impeccable service, stunning views' },
  { name: 'CUT', location: 'Four Seasons', why: 'Sophisticated dining with bay views and world-class steaks' },
  { name: 'Iris', location: 'Bahrain Bay', why: 'Sunset cocktails followed by beachside dinner' },
  { name: 'Café Lilou', location: 'Adliya', why: 'Intimate French café perfect for anniversary celebrations' },
  { name: 'Trader Vic\'s', location: 'Ritz-Carlton', why: 'Romantic waterfront setting with tiki cocktails' },
];

const bestForBusiness = [
  { name: 'Plums', desc: 'Professional atmosphere, private dining rooms, Michelin-worthy food' },
  { name: 'CUT', desc: 'Impressive setting for closing deals, excellent wine selection' },
  { name: 'The Orangery', desc: 'Elegant brunch venue, great for daytime meetings' },
  { name: 'Gulf Hotel Restaurants', desc: 'Multiple options under one roof, convenient for hotel guests' },
];

const newOpenings2026 = [
  { name: 'Nobu Bahrain', opening: 'Q1 2026', cuisine: 'Japanese-Peruvian', desc: 'The legendary Nobu finally arrives in Bahrain. Expect black cod miso and yellowtail jalapeno.' },
  { name: 'Zuma', opening: 'Q2 2026', cuisine: 'Japanese', desc: 'London\'s iconic izakaya comes to Bahrain Bay with its signature robata grill.' },
  { name: 'Cipriani', opening: 'Q3 2026', cuisine: 'Italian', desc: 'Venice\'s legendary restaurant expands to the Gulf with classic Venetian dishes.' },
  { name: 'Hakkasan', opening: 'Late 2026', cuisine: 'Chinese', desc: 'Michelin-starred Cantonese cuisine in a stunning architectural setting.' },
];

const priceGuide = [
  { symbol: '$', range: 'Under BHD 10', desc: 'Casual eateries, street food, quick service' },
  { symbol: '$$', range: 'BHD 10-25', desc: 'Mid-range restaurants, good value dining' },
  { symbol: '$$$', range: 'BHD 25-50', desc: 'Upscale casual to fine dining' },
  { symbol: '$$$$', range: 'BHD 50+', desc: 'Premium fine dining, special occasions' },
];

export default function BestRestaurants2026Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSchema()) }}
      />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/30 to-orange-900/30" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
          
          <div className="max-w-4xl mx-auto relative z-10">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li>/</li>
                <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
                <li>/</li>
                <li className="text-white">Best Restaurants Bahrain 2026</li>
              </ol>
            </nav>

            <div className="text-center">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full text-amber-300 text-sm mb-4">
                <Award className="w-4 h-4" /> 2026 Dining Guide
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-amber-200 to-orange-200 bg-clip-text text-transparent leading-tight">
                Best Restaurants in Bahrain 2026
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                From Michelin-worthy fine dining to beloved local haunts, our comprehensive guide 
                to the 50 best restaurants in Bahrain has something for every palate and occasion.
              </p>
              
              <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> 15 min read
                </span>
                <span>•</span>
                <span>Updated February 2026</span>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
            <p className="text-gray-300 leading-relaxed text-lg">
              Bahrain's dining scene has never been more exciting. As the Kingdom continues to attract world-class 
              chefs and innovative concepts, 2026 promises to be a landmark year for food lovers. Whether you're 
              seeking a romantic dinner with bay views, an authentic Bahraini feast, or the latest culinary trend, 
              our curated guide will point you in the right direction.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              What makes Bahrain unique is its diversity. In a single evening, you could enjoy traditional machboos 
              in Muharraq, sip cocktails at a rooftop bar in Bahrain Bay, and finish with French pastries in Adliya. 
              The island's position as a regional hub means you'll find authentic cuisines from across the globe, 
              often prepared by expats who bring recipes from home.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              We've eaten our way through Bahrain to bring you this comprehensive guide. From the splurge-worthy 
              steakhouses where deals are closed to the hole-in-the-wall gems where locals queue for lunch, these 
              are the restaurants that define Bahrain's culinary landscape in 2026.
            </p>
          </div>
        </section>

        {/* Price Guide */}
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-amber-400" /> Price Guide
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {priceGuide.map((p) => (
                  <div key={p.symbol} className="text-center">
                    <span className="text-2xl text-amber-400">{p.symbol}</span>
                    <p className="text-white text-sm">{p.range}</p>
                    <p className="text-gray-500 text-xs">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Fine Dining Section */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Fine Dining Excellence</h2>
                <p className="text-gray-400">Bahrain's most prestigious restaurants</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {fineDining.map((restaurant) => (
                <div key={restaurant.name} className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-amber-500/50 transition">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{restaurant.name}</h3>
                      <p className="text-amber-400 text-sm">{restaurant.cuisine}</p>
                    </div>
                    <span className="text-amber-400 font-bold">{restaurant.price}</span>
                  </div>
                  <p className="text-gray-500 text-sm flex items-center gap-1 mb-2">
                    <MapPin className="w-3 h-3" /> {restaurant.location}
                  </p>
                  <p className="text-gray-400 text-sm">{restaurant.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Best by Cuisine */}
        {bestByCuisine.map((category, idx) => (
          <section key={category.cuisine} className={`py-16 px-4 ${idx % 2 === 0 ? '' : 'bg-gray-800/30'}`}>
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl">{category.icon}</span>
                <h2 className="text-3xl font-bold text-white">Best {category.cuisine}</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {category.restaurants.map((restaurant) => (
                  <div key={restaurant.name} className="p-5 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-amber-500/30 transition">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-white">{restaurant.name}</h3>
                      <Star className="w-4 h-4 text-amber-400" />
                    </div>
                    <p className="text-amber-400/70 text-sm flex items-center gap-1 mb-2">
                      <MapPin className="w-3 h-3" /> {restaurant.location}
                    </p>
                    <p className="text-gray-400 text-sm">{restaurant.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Hidden Gems */}
        <section className="py-16 px-4 bg-gradient-to-r from-green-900/20 to-emerald-900/20">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Hidden Gems</h2>
                <p className="text-gray-400">Under-the-radar spots the locals love</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hiddenGems.map((gem) => (
                <div key={gem.name} className="p-5 bg-gray-800/50 rounded-xl border border-green-500/30">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">{gem.name}</h3>
                    <span className="text-green-400 text-sm">{gem.price}</span>
                  </div>
                  <p className="text-green-400/70 text-xs mb-1">{gem.cuisine} • {gem.location}</p>
                  <p className="text-gray-400 text-sm">{gem.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Romantic Restaurants */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Most Romantic Restaurants</h2>
                <p className="text-gray-400">Perfect for date nights and special occasions</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {romanticRestaurants.map((restaurant, idx) => (
                <div key={restaurant.name} className={`p-5 rounded-xl border ${idx === 0 ? 'bg-gradient-to-br from-pink-600/20 to-rose-600/20 border-pink-500/50' : 'bg-gray-800/50 border-gray-700'}`}>
                  {idx === 0 && <span className="text-xs text-pink-300 mb-2 block">Editor's Pick</span>}
                  <h3 className="text-lg font-semibold text-white mb-1">{restaurant.name}</h3>
                  <p className="text-pink-400/70 text-sm mb-2">{restaurant.location}</p>
                  <p className="text-gray-400 text-sm">{restaurant.why}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link 
                href="/guides/romantic"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 rounded-full text-white font-semibold hover:opacity-90 transition"
              >
                Full Romantic Dining Guide <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* New Openings 2026 */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Most Anticipated Openings 2026</h2>
                <p className="text-gray-400">Coming soon to Bahrain</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {newOpenings2026.map((restaurant) => (
                <div key={restaurant.name} className="p-6 bg-gray-800/50 rounded-xl border border-cyan-500/30">
                  <span className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full mb-3">
                    Opening {restaurant.opening}
                  </span>
                  <h3 className="text-xl font-semibold text-white mb-1">{restaurant.name}</h3>
                  <p className="text-cyan-400 text-sm mb-2">{restaurant.cuisine}</p>
                  <p className="text-gray-400">{restaurant.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link 
                href="/blog/new-restaurants-bahrain-2026"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition"
              >
                See all new restaurants <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-2">What is the most expensive restaurant in Bahrain?</h3>
                <p className="text-gray-400">CUT by Wolfgang Puck at Four Seasons and Nusr-Et (Salt Bae's restaurant) are among the most expensive, with steaks exceeding BHD 100. Fine dining Japanese omakase can also reach BHD 150+ per person.</p>
              </div>
              
              <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-2">Do I need reservations for restaurants in Bahrain?</h3>
                <p className="text-gray-400">For fine dining and popular restaurants, especially on weekends (Thursday-Saturday), reservations are highly recommended. Many restaurants accept bookings via phone, Instagram DM, or platforms like OpenTable.</p>
              </div>
              
              <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-2">What are the best areas for restaurants in Bahrain?</h3>
                <p className="text-gray-400">Adliya is famous for its diverse restaurant scene. Seef and Bahrain Bay offer upscale hotel dining. Juffair has international options, while Muharraq provides authentic traditional Bahraini cuisine.</p>
              </div>
              
              <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-2">What is the typical restaurant dress code?</h3>
                <p className="text-gray-400">Fine dining restaurants expect smart casual attire. Casual restaurants are relaxed, but beachwear and flip-flops are generally not appropriate. Some rooftop venues have stricter dress codes in the evening.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-amber-900/30 to-orange-900/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Hungry Yet?</h2>
            <p className="text-gray-300 text-lg mb-8">
              Browse our complete restaurant directory with reviews, menus, and booking information.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/restaurants"
                className="px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full text-white font-semibold hover:opacity-90 transition"
              >
                Browse All Restaurants
              </Link>
              <Link 
                href="/best-restaurants-bahrain"
                className="px-8 py-4 bg-gray-800 rounded-full text-white font-semibold hover:bg-gray-700 transition"
              >
                Restaurant Rankings
              </Link>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8">Related Guides</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/blog/bahrain-foodie-guide" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition group">
                <Utensils className="w-8 h-8 text-orange-400 mb-3" />
                <h3 className="font-semibold text-white group-hover:text-orange-300 transition">50 Must-Try Dishes</h3>
                <p className="text-sm text-gray-400 mt-2">Your Bahrain food bucket list</p>
              </Link>
              <Link href="/blog/best-brunches-bahrain-2026" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition group">
                <Wine className="w-8 h-8 text-amber-400 mb-3" />
                <h3 className="font-semibold text-white group-hover:text-amber-300 transition">Best Brunches 2026</h3>
                <p className="text-sm text-gray-400 mt-2">Friday brunch guide</p>
              </Link>
              <Link href="/guides/best-seafood-bahrain" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition group">
                <Globe className="w-8 h-8 text-cyan-400 mb-3" />
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
