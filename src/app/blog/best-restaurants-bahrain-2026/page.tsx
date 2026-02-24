import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Utensils, MapPin, Star, Clock, ArrowRight, Sparkles,
  Award, Users, ChefHat, Flame, Wine, Globe,
  Heart, DollarSign, Calendar, ChevronRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Restaurants in Bahrain 2026 — Top Dining Experiences | BahrainNights',
  description: 'Discover the best restaurants in Bahrain for 2026. From fine dining to hidden gems, our comprehensive guide covers top restaurants across all cuisines and price points.',
  keywords: [
    'best restaurants Bahrain 2026', 'top restaurants Bahrain', 'fine dining Bahrain',
    'Bahrain restaurant guide', 'where to eat Bahrain', 'Manama restaurants',
    'Bahrain food scene', 'romantic restaurants Bahrain', 'best seafood Bahrain'
  ].join(', '),
  alternates: {
    canonical: 'https://www.bahrainnights.com/blog/best-restaurants-bahrain-2026',
  },
  openGraph: {
    title: 'Best Restaurants in Bahrain 2026 — Top Dining Experiences',
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
    description: 'Top restaurants you need to try in Bahrain!',
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
        headline: 'Best Restaurants in Bahrain 2026 — Top Dining Experiences',
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
        dateModified: '2026-02-24',
        mainEntityOfPage: 'https://www.bahrainnights.com/blog/best-restaurants-bahrain-2026'
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
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

// Verified restaurants at Gulf Hotel
const gulfHotelRestaurants = [
  { name: 'Takht Jamsheed', cuisine: 'Persian', desc: 'Taking inspiration from Persia\'s royal palace, this elegant restaurant offers fine dining fit for royalty with traditional Iranian cuisine.' },
  { name: 'Bushido', cuisine: 'Japanese', desc: 'Theatrical Japanese dining with teppanyaki, sushi, and live performances. A complete dining experience.' },
  { name: 'Plums', cuisine: 'International Fine Dining', desc: 'Bahrain\'s most awarded restaurant with seasonal menus showcasing global techniques.' },
  { name: 'Rasoi by Vineet', cuisine: 'Indian', desc: 'Michelin-starred chef Vineet Bhatia\'s contemporary Indian fine dining experience.' },
];

// Verified restaurants at Ritz-Carlton
const ritzCarltonRestaurants = [
  { name: 'La Med', cuisine: 'Mediterranean', desc: 'Elegant Mediterranean cuisine with stunning marina views. Famous for their Friday brunch.' },
  { name: 'Trader Vic\'s', cuisine: 'Polynesian', desc: 'Tiki-themed waterfront dining with creative cocktails and Pacific Island-inspired cuisine.' },
  { name: 'Primavera', cuisine: 'Italian', desc: 'Authentic Italian dining with Gulf views and fresh pasta dishes.' },
  { name: 'Nirvana', cuisine: 'Indian', desc: 'Palace-style décor with intricate wood screens. Live santoor player accompanies refined North Indian cuisine.' },
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
      { name: 'La Plage', location: 'Ritz-Carlton', desc: 'Al fresco Mediterranean dining with Arabian Gulf views. Perfect beachside atmosphere.' },
      { name: 'Fish Market', location: 'Multiple', desc: 'Pick your fish, pick your style. Fresh Gulf seafood at its best.' },
      { name: 'Lanterns', location: 'Adliya', desc: 'Creative seafood dishes alongside Indian favorites.' },
      { name: 'Budaiya Seaside', location: 'Budaiya', desc: 'Casual seaside dining with the freshest catch of the day.' },
    ]
  },
];

// Verified restaurants - Adliya
const adliyaRestaurants = [
  { name: 'Café Lilou', cuisine: 'French Café', desc: 'Parisian vibes with excellent pastries, breakfast, and light fare. Perfect for afternoon tea.' },
  { name: 'Zafran', cuisine: 'Indian', desc: 'North Indian fine dining with live music. The butter chicken and naan are sublime.' },
  { name: 'Lanterns', cuisine: 'Indian Fusion', desc: 'Creative Indian fusion in a gorgeous setting. Great for groups and special occasions.' },
  { name: 'Segafredo', cuisine: 'Italian', desc: 'Authentic Italian with great coffee culture. Perfect for casual dining.' },
];

// Verified traditional Bahraini
const traditionalBahraini = [
  { name: 'Haji\'s Café', location: 'Muharraq', desc: 'Institution for traditional breakfast. Balaleet and chai haleeb are must-tries.' },
  { name: 'Sitra Fish', location: 'Sitra', desc: 'Fresh Gulf seafood in a no-frills setting. Locals queue for the catch of the day.' },
];

const priceGuide = [
  { symbol: '$', range: 'Under BHD 10', desc: 'Casual eateries, street food' },
  { symbol: '$$', range: 'BHD 10-25', desc: 'Mid-range restaurants' },
  { symbol: '$$$', range: 'BHD 25-50', desc: 'Upscale casual to fine dining' },
  { symbol: '$$$$', range: 'BHD 50+', desc: 'Premium fine dining' },
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
                From five-star hotel dining to beloved local haunts, our guide to the best 
                verified restaurants in Bahrain has something for every palate and occasion.
              </p>
              
              <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> 10 min read
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
              Bahrain's dining scene offers incredible diversity. In a single evening, you could enjoy 
              traditional machboos in Muharraq, fine dining at a five-star hotel, and French pastries 
              in Adliya. The island's position as a regional hub means you'll find authentic cuisines 
              from across the globe.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              This guide features verified restaurants we can confidently recommend. We're continuously 
              updating this list as we visit and verify more establishments across the Kingdom.
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

        {/* Gulf Hotel Restaurants */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Gulf Hotel Restaurants</h2>
                <p className="text-gray-400">World-class dining under one roof</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-8 max-w-3xl">
              The Gulf Hotel Bahrain is home to over 10 restaurants and lounges, making it a dining 
              destination in itself. Here are the standout options:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {gulfHotelRestaurants.map((restaurant) => (
                <div key={restaurant.name} className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-amber-500/50 transition">
                  <h3 className="text-lg font-semibold text-white mb-1">{restaurant.name}</h3>
                  <p className="text-amber-400 text-sm mb-2">{restaurant.cuisine}</p>
                  <p className="text-gray-400 text-sm">{restaurant.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ritz-Carlton Restaurants */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Ritz-Carlton Bahrain</h2>
                <p className="text-gray-400">Luxury dining on the waterfront</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              {ritzCarltonRestaurants.map((restaurant) => (
                <div key={restaurant.name} className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-blue-500/50 transition">
                  <h3 className="text-lg font-semibold text-white mb-1">{restaurant.name}</h3>
                  <p className="text-blue-400 text-sm mb-2">{restaurant.cuisine}</p>
                  <p className="text-gray-400 text-sm">{restaurant.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Adliya Dining */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Adliya — Bahrain's Dining Hub</h2>
                <p className="text-gray-400">Trendy restaurants and cafes</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-8 max-w-3xl">
              Adliya is Bahrain's trendiest dining district, home to art galleries, boutiques, and 
              an eclectic mix of restaurants and cafes.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {adliyaRestaurants.map((restaurant) => (
                <div key={restaurant.name} className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-purple-500/50 transition">
                  <h3 className="text-lg font-semibold text-white mb-1">{restaurant.name}</h3>
                  <p className="text-purple-400 text-sm mb-2">{restaurant.cuisine}</p>
                  <p className="text-gray-400 text-sm">{restaurant.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Traditional Bahraini */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-600">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Traditional Bahraini</h2>
                <p className="text-gray-400">Authentic local flavors</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {traditionalBahraini.map((restaurant) => (
                <div key={restaurant.name} className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-orange-500/50 transition">
                  <h3 className="text-lg font-semibold text-white mb-1">{restaurant.name}</h3>
                  <p className="text-orange-400 text-sm mb-2">{restaurant.location}</p>
                  <p className="text-gray-400 text-sm">{restaurant.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* More Coming Soon */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-4xl mx-auto text-center">
            <ChefHat className="w-16 h-16 text-amber-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">More Restaurants Coming Soon</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              We're actively verifying more restaurants across Bahrain to add to this guide. 
              Check back regularly for updates, or follow us on social media for the latest additions.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
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
              Browse our restaurant directory or check out our other dining guides.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/restaurants"
                className="px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full text-white font-semibold hover:opacity-90 transition"
              >
                Browse All Restaurants
              </Link>
              <Link 
                href="/blog/best-brunches-bahrain-2026"
                className="px-8 py-4 bg-gray-800 rounded-full text-white font-semibold hover:bg-gray-700 transition"
              >
                Friday Brunch Guide
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
                <h3 className="font-semibold text-white group-hover:text-orange-300 transition">Bahrain Foodie Guide</h3>
                <p className="text-sm text-gray-400 mt-2">Must-try dishes in Bahrain</p>
              </Link>
              <Link href="/blog/best-brunches-bahrain-2026" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition group">
                <Wine className="w-8 h-8 text-amber-400 mb-3" />
                <h3 className="font-semibold text-white group-hover:text-amber-300 transition">Best Brunches 2026</h3>
                <p className="text-sm text-gray-400 mt-2">Friday brunch guide</p>
              </Link>
              <Link href="/blog/new-restaurants-bahrain-2026" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition group">
                <Sparkles className="w-8 h-8 text-cyan-400 mb-3" />
                <h3 className="font-semibold text-white group-hover:text-cyan-300 transition">New Restaurants</h3>
                <p className="text-sm text-gray-400 mt-2">Latest openings</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
