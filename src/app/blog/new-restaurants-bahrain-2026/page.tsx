import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Utensils, MapPin, Star, Calendar, Clock, ArrowRight,
  Sparkles, ChefHat, Wine, Coffee, Globe, TrendingUp,
  Heart, Camera, Users
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'New Restaurant Openings in Bahrain 2026 — Latest Dining Spots | BahrainNights',
  description: 'Discover the newest restaurants opening in Bahrain in 2026. From fine dining to casual eateries, stay ahead of the curve with our guide to the latest restaurant openings.',
  keywords: [
    'new restaurants Bahrain 2026', 'restaurant openings Bahrain', 'new dining Bahrain',
    'latest restaurants Manama', 'new cafes Bahrain', 'upcoming restaurants Bahrain',
    'best new restaurants Bahrain', 'Bahrain food scene 2026', 'new places to eat Bahrain'
  ].join(', '),
  alternates: {
    canonical: 'https://www.bahrainnights.com/blog/new-restaurants-bahrain-2026',
  },
  openGraph: {
    title: 'New Restaurant Openings in Bahrain 2026',
    description: 'The hottest new restaurants opening in Bahrain this year. Be first to discover the newest dining spots!',
    url: 'https://www.bahrainnights.com/blog/new-restaurants-bahrain-2026',
    siteName: 'BahrainNights',
    images: [
      {
        url: 'https://www.bahrainnights.com/og-new-restaurants-2026.jpg',
        width: 1200,
        height: 630,
        alt: 'New Restaurants in Bahrain 2026',
      },
    ],
    type: 'article',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'New Restaurant Openings in Bahrain 2026',
    description: 'Discover the newest dining spots in Bahrain!',
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
    headline: 'New Restaurant Openings in Bahrain 2026',
    description: 'Discover the newest restaurants opening in Bahrain in 2026. From fine dining to casual eateries.',
    image: 'https://www.bahrainnights.com/og-new-restaurants-2026.jpg',
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
    datePublished: '2026-01-15',
    dateModified: '2026-02-08',
    mainEntityOfPage: 'https://www.bahrainnights.com/blog/new-restaurants-bahrain-2026'
  };
}

const recentOpenings = [
  {
    name: 'Nama Dubai',
    cuisine: 'Emirati Fine Dining',
    location: 'Four Seasons Bahrain Bay',
    opened: 'January 2026',
    description: 'The acclaimed Dubai restaurant brings its refined Emirati cuisine to Bahrain. Expect modern interpretations of traditional Gulf dishes with locally-sourced ingredients and stunning presentations.',
    highlights: ['Tasting Menu', 'Private Dining', 'Gulf Views'],
    price: '$$$$',
    rating: 4.8
  },
  {
    name: 'Sushi Shin',
    cuisine: 'Omakase Japanese',
    location: 'Marassi Galleria',
    opened: 'January 2026',
    description: 'An intimate 12-seat omakase experience featuring fish flown in directly from Tokyo\'s Tsukiji market. The Japanese chef crafts a unique multi-course experience each evening.',
    highlights: ['Omakase Only', 'Tokyo Fish', 'Sake Pairing'],
    price: '$$$$',
    rating: 4.9
  },
  {
    name: 'Butcha Istanbul',
    cuisine: 'Turkish Steakhouse',
    location: 'City Centre Bahrain',
    opened: 'December 2025',
    description: 'This popular Turkish steakhouse chain brings theatrical dining to Bahrain. Premium Anatolian beef, tableside service, and a vibrant atmosphere make it a destination for meat lovers.',
    highlights: ['Premium Beef', 'Tableside Service', 'Turkish Hospitality'],
    price: '$$$',
    rating: 4.6
  },
  {
    name: 'Cafe de Paris',
    cuisine: 'French Brasserie',
    location: 'The Avenues',
    opened: 'December 2025',
    description: 'Classic French brasserie fare in an elegant setting. From croque monsieurs to steak frites, this is Parisian dining done right with an extensive wine list.',
    highlights: ['French Classics', 'Wine Selection', 'All-Day Dining'],
    price: '$$$',
    rating: 4.5
  },
  {
    name: 'Kinoya',
    cuisine: 'Japanese Ramen',
    location: 'Adliya',
    opened: 'November 2025',
    description: 'The famous Dubai ramen spot opens in Bahrain\'s trendiest neighborhood. Authentic tonkotsu ramen, perfectly cooked noodles, and traditional izakaya bites.',
    highlights: ['Tonkotsu Ramen', 'Izakaya Bites', 'Late Night'],
    price: '$$',
    rating: 4.7
  },
  {
    name: 'Carbone',
    cuisine: 'Italian-American',
    location: 'Ritz-Carlton Bahrain',
    opened: 'November 2025',
    description: 'The legendary New York Italian-American restaurant arrives in Bahrain. Expect timeless classics like spicy rigatoni vodka, veal parmesan, and impeccable hospitality.',
    highlights: ['NYC Import', 'Classic Dishes', 'Retro Glamour'],
    price: '$$$$',
    rating: 4.8
  },
  {
    name: 'Makan House',
    cuisine: 'Modern Bahraini',
    location: 'Muharraq Heritage Area',
    opened: 'October 2025',
    description: 'A celebration of Bahraini heritage in a beautifully restored traditional house. Local ingredients, family recipes, and contemporary techniques create a unique dining experience.',
    highlights: ['Heritage Setting', 'Local Ingredients', 'Cultural Experience'],
    price: '$$$',
    rating: 4.6
  },
  {
    name: 'Sketch',
    cuisine: 'Contemporary European',
    location: 'Bahrain Financial Harbour',
    opened: 'October 2025',
    description: 'This London-inspired concept brings artistic dining to Bahrain\'s business district. Creative European cuisine in a space that\'s equal parts restaurant and art gallery.',
    highlights: ['Art-Forward', 'Tasting Menu', 'Cocktails'],
    price: '$$$$',
    rating: 4.5
  },
];

const comingSoon = [
  {
    name: 'Nobu Bahrain',
    cuisine: 'Japanese-Peruvian',
    location: 'Marassi Al Bahrain',
    expected: 'Q2 2026',
    description: 'The world-famous Nobu restaurant is finally coming to Bahrain. Expect the signature black cod miso, yellowtail sashimi with jalapeño, and their legendary cocktail program.',
    excitement: 'High'
  },
  {
    name: 'Zuma',
    cuisine: 'Contemporary Japanese',
    location: 'Four Seasons Bahrain Bay',
    expected: 'Q2 2026',
    description: 'Another major opening for Bahrain\'s dining scene. Zuma\'s izakaya-style dining and robata grill will add a new dimension to the city\'s Japanese offerings.',
    excitement: 'Very High'
  },
  {
    name: 'Din Tai Fung',
    cuisine: 'Taiwanese',
    location: 'City Centre Bahrain',
    expected: 'Q3 2026',
    description: 'The legendary dumpling house is expanding to Bahrain. Their famous xiao long bao (soup dumplings) have won hearts worldwide, and Bahrain is next.',
    excitement: 'High'
  },
  {
    name: 'Amazonico',
    cuisine: 'Latin American',
    location: 'Marassi Galleria',
    expected: 'Q3 2026',
    description: 'The Dubai hotspot brings its jungle-themed Latin American concept to Bahrain. Expect ceviche, tropical cocktails, and a vibrant party atmosphere.',
    excitement: 'High'
  },
  {
    name: 'Coya',
    cuisine: 'Peruvian',
    location: 'TBA',
    expected: 'Q4 2026',
    description: 'Peruvian cuisine is having a moment, and Coya\'s arrival in Bahrain will cement the trend. Pisco cocktails, anticuchos, and tiraditos await.',
    excitement: 'Medium'
  },
];

const trendingCuisines = [
  { cuisine: 'Japanese Omakase', trend: 'Rising', reason: 'Intimate dining experiences are in demand' },
  { cuisine: 'Modern Middle Eastern', trend: 'Hot', reason: 'Local chefs reinventing traditional recipes' },
  { cuisine: 'Latin American', trend: 'Growing', reason: 'Ceviche and tacos gaining mainstream appeal' },
  { cuisine: 'Korean', trend: 'Rising', reason: 'K-culture influence driving interest' },
  { cuisine: 'Plant-Based', trend: 'Growing', reason: 'Health-conscious dining on the rise' },
];

const neighborhoodGuide = [
  { area: 'Marassi', vibe: 'Luxury waterfront dining', notable: 'Newest restaurant cluster with premium brands' },
  { area: 'Adliya', vibe: 'Trendy and eclectic', notable: 'Independent restaurants and hip cafes' },
  { area: 'Seef', vibe: 'Mall dining and family-friendly', notable: 'Accessible international chains' },
  { area: 'Muharraq', vibe: 'Heritage and authentic', notable: 'Traditional Bahraini and cultural experiences' },
  { area: 'Bahrain Bay', vibe: 'Five-star luxury', notable: 'Hotel dining at its finest' },
];

export default function NewRestaurantsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSchema()) }}
      />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/30 to-red-900/30" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/20 rounded-full blur-3xl" />
          
          <div className="max-w-4xl mx-auto relative z-10">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li>/</li>
                <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
                <li>/</li>
                <li className="text-white">New Restaurants 2026</li>
              </ol>
            </nav>

            <div className="text-center">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full text-orange-300 text-sm mb-4">
                <Sparkles className="w-4 h-4" /> Updated February 2026
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-orange-200 to-red-200 bg-clip-text text-transparent leading-tight">
                New Restaurant Openings in Bahrain 2026
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Stay ahead of the dining curve with our comprehensive guide to the newest restaurants 
                opening in Bahrain. From international brands to local gems, here's what's hot.
              </p>
              
              <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> 10 min read
                </span>
                <span>•</span>
                <span>By BahrainNights Team</span>
                <span>•</span>
                <span>Last updated Feb 8, 2026</span>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
            <p className="text-gray-300 leading-relaxed text-lg">
              Bahrain's restaurant scene is experiencing an exciting renaissance. As the Kingdom continues to position 
              itself as a culinary destination in the Gulf, international restaurant groups are taking notice. 2026 is 
              shaping up to be a landmark year for dining in Bahrain, with major brand openings, innovative local concepts, 
              and a diverse range of cuisines hitting the market.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              From the arrival of legendary names like Nobu and Zuma to homegrown concepts celebrating Bahraini heritage, 
              there's never been a more exciting time to dine out in the Kingdom. We've compiled this guide to help you 
              stay on top of the latest openings and plan your next culinary adventure.
            </p>
          </div>
        </section>

        {/* Recent Openings Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">🆕 Recent Openings</h2>
                <p className="text-gray-400">Now open and ready to discover</p>
              </div>
            </div>
            
            <div className="space-y-6">
              {recentOpenings.map((restaurant, index) => (
                <div 
                  key={restaurant.name} 
                  className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-gray-600 transition"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-green-500/20 rounded-full text-green-300 text-xs font-medium">
                          {restaurant.opened}
                        </span>
                        <span className="text-orange-400 text-sm font-medium">{restaurant.cuisine}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{restaurant.name}</h3>
                      <p className="text-gray-400 text-sm flex items-center gap-1 mb-4">
                        <MapPin className="w-4 h-4" /> {restaurant.location}
                      </p>
                      <p className="text-gray-300 leading-relaxed mb-4">{restaurant.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {restaurant.highlights.map((highlight) => (
                          <span key={highlight} className="px-3 py-1 bg-gray-700/50 rounded-full text-xs text-gray-300">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="flex items-center gap-1 text-amber-400 justify-end mb-1">
                        <Star className="w-5 h-5 fill-amber-400" />
                        <span className="font-bold text-lg">{restaurant.rating}</span>
                      </div>
                      <div className="text-orange-400 font-bold text-lg">{restaurant.price}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">🔜 Coming Soon</h2>
                <p className="text-gray-400">What to look forward to</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-8 max-w-3xl">
              These highly anticipated restaurants are on their way to Bahrain. Mark your calendars and get ready 
              to be first in line when they open their doors.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {comingSoon.map((restaurant) => (
                <div 
                  key={restaurant.name} 
                  className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-purple-500/50 transition relative overflow-hidden"
                >
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      restaurant.excitement === 'Very High' 
                        ? 'bg-pink-500/20 text-pink-300' 
                        : restaurant.excitement === 'High'
                        ? 'bg-purple-500/20 text-purple-300'
                        : 'bg-gray-500/20 text-gray-300'
                    }`}>
                      {restaurant.excitement} Excitement
                    </span>
                  </div>
                  <span className="text-purple-400 text-sm font-medium">{restaurant.expected}</span>
                  <h3 className="text-xl font-bold text-white mt-2 mb-1">{restaurant.name}</h3>
                  <p className="text-orange-400 text-sm mb-2">{restaurant.cuisine}</p>
                  <p className="text-gray-400 text-sm flex items-center gap-1 mb-4">
                    <MapPin className="w-4 h-4" /> {restaurant.location}
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed">{restaurant.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Cuisines Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">📈 Trending Cuisines</h2>
                <p className="text-gray-400">What's shaping Bahrain's food scene</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {trendingCuisines.map((item) => (
                <div key={item.cuisine} className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-white">{item.cuisine}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.trend === 'Hot' 
                        ? 'bg-red-500/20 text-red-300' 
                        : item.trend === 'Rising'
                        ? 'bg-orange-500/20 text-orange-300'
                        : 'bg-green-500/20 text-green-300'
                    }`}>
                      {item.trend}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">{item.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Neighborhood Guide */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">📍 Where to Eat by Neighborhood</h2>
                <p className="text-gray-400">Find your vibe</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {neighborhoodGuide.map((area) => (
                <div key={area.area} className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-2">{area.area}</h3>
                  <p className="text-orange-400 text-sm mb-3">{area.vibe}</p>
                  <p className="text-gray-400 text-sm">{area.notable}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-amber-400" />
              Tips for Trying New Restaurants
            </h2>
            
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl border border-amber-500/30">
                <h3 className="text-xl font-semibold text-amber-300 mb-2">🎫 Book Early for Hot Openings</h3>
                <p className="text-gray-300">
                  New restaurant openings in Bahrain generate huge buzz. For places like Nobu and Zuma, 
                  expect to book weeks in advance once reservations open. Follow their social media and 
                  sign up for mailing lists to get first access.
                </p>
              </div>
              
              <div className="p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl border border-blue-500/30">
                <h3 className="text-xl font-semibold text-blue-300 mb-2">🕐 Soft Opening Perks</h3>
                <p className="text-gray-300">
                  Many restaurants do soft openings before their official launch, often with discounted 
                  prices or preview menus. Follow @bahrainnights on Instagram for insider updates on 
                  soft opening opportunities.
                </p>
              </div>
              
              <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/30">
                <h3 className="text-xl font-semibold text-purple-300 mb-2">📱 Give It Time</h3>
                <p className="text-gray-300">
                  While it's exciting to be first, new restaurants often take a few weeks to hit their 
                  stride. For the best experience, consider visiting 2-3 weeks after opening when the 
                  team has settled into their rhythm.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-orange-900/30 to-red-900/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Explore Bahrain's Restaurant Scene</h2>
            <p className="text-gray-300 text-lg mb-8">
              Browse our complete restaurant directory with reviews, menus, and booking information.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/restaurants"
                className="px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 rounded-full text-white font-semibold hover:opacity-90 transition"
              >
                Browse All Restaurants
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
              <Link href="/blog/bahrain-foodie-guide" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition group">
                <Heart className="w-8 h-8 text-red-400 mb-3" />
                <h3 className="font-semibold text-white group-hover:text-red-300 transition">Bahrain Foodie Guide</h3>
                <p className="text-sm text-gray-400 mt-2">50 must-try dishes</p>
              </Link>
              <Link href="/blog/weekend-guide-bahrain-february-2026" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition group">
                <Calendar className="w-8 h-8 text-purple-400 mb-3" />
                <h3 className="font-semibold text-white group-hover:text-purple-300 transition">Weekend Guide</h3>
                <p className="text-sm text-gray-400 mt-2">What's happening this weekend</p>
              </Link>
              <Link href="/guides/brunch" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition group">
                <Coffee className="w-8 h-8 text-orange-400 mb-3" />
                <h3 className="font-semibold text-white group-hover:text-orange-300 transition">Friday Brunch Guide</h3>
                <p className="text-sm text-gray-400 mt-2">Best brunches in Bahrain</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
