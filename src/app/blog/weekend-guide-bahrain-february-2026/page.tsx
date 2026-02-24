import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Calendar, MapPin, Clock, Music, Utensils, Wine, 
  Sun, Users, Star, ArrowRight, Ticket, Camera, 
  Heart, Sparkles, Coffee, ShoppingBag
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ramadan Weekend Guide: Iftar, Suhoor & Activities in Bahrain 2026 | BahrainNights',
  description: 'Your complete Ramadan guide to Bahrain. Discover the best Iftar buffets, Ghabga experiences, family activities, and spiritual events during the holy month.',
  keywords: [
    'Bahrain Ramadan guide', 'Iftar Bahrain 2026', 'Suhoor Bahrain',
    'Ghabga Bahrain', 'Ramadan activities Bahrain', 'things to do Ramadan Bahrain',
    'Ramadan tent Bahrain', 'best Iftar Bahrain', 'Ramadan events Bahrain'
  ].join(', '),
  alternates: {
    canonical: 'https://www.bahrainnights.com/blog/weekend-guide-bahrain-february-2026',
  },
  openGraph: {
    title: 'Weekend Guide: What\'s Happening in Bahrain This Weekend (Feb 2026)',
    description: 'Discover the best events, brunches, and activities for your weekend in Bahrain. Updated weekly!',
    url: 'https://www.bahrainnights.com/blog/weekend-guide-bahrain-february-2026',
    siteName: 'BahrainNights',
    images: [
      {
        url: 'https://www.bahrainnights.com/og-weekend-guide.jpg',
        width: 1200,
        height: 630,
        alt: 'Weekend Guide Bahrain February 2026',
      },
    ],
    type: 'article',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weekend Guide: Bahrain February 2026',
    description: 'Your complete weekend guide to Bahrain - brunches, events, nightlife & more!',
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
    headline: 'Weekend Guide: What\'s Happening in Bahrain This Weekend (Feb 2026)',
    description: 'Your complete guide to the best events, brunches, and activities in Bahrain this weekend.',
    image: 'https://www.bahrainnights.com/og-weekend-guide.jpg',
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
    datePublished: '2026-02-01',
    dateModified: '2026-02-08',
    mainEntityOfPage: 'https://www.bahrainnights.com/blog/weekend-guide-bahrain-february-2026'
  };
}

// Note: During Ramadan, traditional Friday brunches are not available
// Instead, hotels offer Iftar and Suhoor experiences
const ramadanDining = [
  { name: 'Al Waha Iftar - Gulf Hotel', desc: 'Bahrain\'s most legendary Iftar buffet with traditional Arabic dishes and live cooking stations', price: 'From BHD 28', time: 'Sunset - 9:00 PM', rating: 4.8 },
  { name: 'Ramadan Tent - Ritz-Carlton', desc: 'Elegant Iftar experience with Gulf and Levantine cuisine in a beautifully decorated tent', price: 'From BHD 35', time: 'Sunset - 10:00 PM', rating: 4.7 },
  { name: 'Four Seasons Iftar', desc: 'Premium Iftar featuring international and Arabic cuisines with stunning Bahrain Bay views', price: 'From BHD 38', time: 'Sunset - 9:30 PM', rating: 4.7 },
  { name: 'InterContinental Iftar', desc: 'Family-friendly Iftar with generous buffet and traditional Ramadan atmosphere', price: 'From BHD 25', time: 'Sunset - 9:00 PM', rating: 4.5 },
];

const weekendEvents = [
  { name: 'Ramadan Nights at Souq Waqif', type: 'Cultural', location: 'Muharraq', day: 'Daily', time: 'After Iftar', desc: 'Traditional markets come alive after Iftar with shopping, street food, and live entertainment' },
  { name: 'Ghabga at Gulf Hotel', type: 'Dining', location: 'Gulf Hotel', day: 'Daily', time: 'After 10 PM', desc: 'Late-night Ramadan gathering with traditional sweets, Arabic coffee, and shisha' },
  { name: 'Ritz-Carlton Beach Walk', type: 'Leisure', location: 'Ritz-Carlton, Seef', day: 'Saturday', time: 'Late afternoon', desc: 'Enjoy a peaceful pre-Iftar walk along the pristine private beach' },
  { name: 'Quran Recitation at Grand Mosque', type: 'Spiritual', location: 'Al Fateh Grand Mosque', day: 'Daily', time: 'Evening', desc: 'Beautiful Quran recitations during Ramadan at Bahrain\'s iconic mosque' },
];

const familyActivities = [
  { name: 'Lost Paradise of Dilmun', desc: 'Bahrain\'s largest water park with wave pools, lazy rivers, and thrilling slides', location: 'Sakhir', suitable: 'All ages' },
  { name: 'Bahrain National Museum', desc: 'Explore 6,000 years of history with interactive exhibits. Free entry!', location: 'Manama', suitable: 'All ages' },
  { name: 'Wahooo! Waterpark', desc: 'Indoor water park at City Centre - perfect for cooling off', location: 'Seef', suitable: 'All ages' },
  { name: 'Gravity Indoor Skydiving', desc: 'Experience freefall in a safe indoor environment', location: 'Bahrain Bay', suitable: 'Ages 4+' },
];

// Note: During Ramadan, nightlife is limited. Many venues operate with reduced hours after Iftar.
const eveningSpots = [
  { name: 'Saffron by Jena', location: 'Muharraq', type: 'Traditional Café', vibe: 'Authentic Bahraini atmosphere with Arabic coffee and sweets' },
  { name: 'Haji\'s Café', location: 'Muharraq', type: 'Traditional Café', vibe: 'Historic café with the best traditional chai and breakfast' },
  { name: 'The Lobby Lounge', location: 'Ritz-Carlton', type: 'Elegant Lounge', vibe: 'Refined atmosphere for post-Iftar gatherings' },
  { name: 'Café Lilou', location: 'Adliya', type: 'French Café', vibe: 'Charming café for late-night Suhoor gatherings' },
];

const restaurantPicks = [
  { name: 'CUT by Wolfgang Puck', cuisine: 'Steakhouse', location: 'Four Seasons', highlight: 'Best steaks in Bahrain' },
  { name: 'Bushido', cuisine: 'Japanese', location: 'Ritz-Carlton', highlight: 'Omakase experience' },
  { name: 'The Orangery', cuisine: 'Mediterranean', location: 'Adliya', highlight: 'Instagram-worthy brunch spot' },
  { name: 'Masso', cuisine: 'Italian', location: 'Four Seasons', highlight: 'Handmade pasta perfection' },
];

export default function WeekendGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSchema()) }}
      />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-pink-900/30" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
          
          <div className="max-w-4xl mx-auto relative z-10">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li>/</li>
                <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
                <li>/</li>
                <li className="text-white">Weekend Guide February 2026</li>
              </ol>
            </nav>

            <div className="text-center">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full text-purple-300 text-sm mb-4">
                <Calendar className="w-4 h-4" /> February 2026
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
                Weekend Guide: What's Happening in Bahrain This Weekend
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Your ultimate guide to making the most of your weekend in the Kingdom of Bahrain. 
                From legendary Friday brunches to Saturday night adventures, we've got you covered.
              </p>
              
              <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> 8 min read
                </span>
                <span>•</span>
                <span>By BahrainNights Team</span>
                <span>•</span>
                <span>Updated Feb 8, 2026</span>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
            <p className="text-gray-300 leading-relaxed text-lg">
              Another weekend is upon us in the Kingdom of Bahrain, and there's no shortage of incredible things to do. 
              Whether you're a resident looking to explore something new or a visitor from across the causeway, this guide 
              will help you plan the perfect weekend. From the world-famous Friday brunches that have made Bahrain a 
              regional dining destination to the vibrant nightlife scene that comes alive after dark, we've curated the 
              best experiences for every taste and budget.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              February in Bahrain offers perfect weather for outdoor activities — temperatures hover around a pleasant 
              20-25°C, making it ideal for beach days, outdoor brunches, and evening strolls along the waterfront. Let's 
              dive into everything this weekend has to offer.
            </p>
          </div>
        </section>

        {/* Friday Brunch Section */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">🍳 Friday Brunch</h2>
                <p className="text-gray-400">The Gulf's most beloved weekend tradition</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-8 max-w-3xl">
              During Ramadan, the traditional Friday brunch is replaced by Iftar — the evening meal to break 
              the fast. Bahrain's hotels offer some of the finest Iftar experiences in the region, featuring 
              traditional Arabic dishes, live cooking stations, and warm hospitality. Here are our top picks:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {ramadanDining.map((brunch) => (
                <div key={brunch.name} className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-gray-600 transition">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-white">{brunch.name}</h3>
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <span className="font-semibold">{brunch.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{brunch.desc}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-purple-400 font-semibold">{brunch.price}</span>
                    <span className="text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {brunch.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <Link href="/guides/brunch" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition">
                View all Friday brunches <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Weekend Events Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600">
                <Ticket className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">🎭 Events & Activities</h2>
                <p className="text-gray-400">What's happening this weekend</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-8 max-w-3xl">
              Bahrain's events calendar is packed with exciting activities. From live music performances to cultural 
              experiences, there's something for everyone this weekend. Mark your calendars for these must-attend events:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {weekendEvents.map((event) => (
                <div key={event.name} className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-gray-600 transition">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-300 text-xs font-medium">
                      {event.type}
                    </span>
                    <span className="text-gray-500 text-sm">{event.day}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{event.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{event.desc}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {event.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {event.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <Link href="/events" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition">
                Browse all events <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Family Activities Section */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">👨‍👩‍👧‍👦 Family Fun</h2>
                <p className="text-gray-400">Activities for all ages</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-8 max-w-3xl">
              Bahrain is incredibly family-friendly, with world-class attractions that keep kids entertained while parents 
              relax. The February weather is perfect for outdoor adventures, but there are plenty of indoor options too. 
              Here are our top family picks for the weekend:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {familyActivities.map((activity) => (
                <div key={activity.name} className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-gray-600 transition">
                  <h3 className="text-xl font-semibold text-white mb-2">{activity.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{activity.desc}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {activity.location}
                    </span>
                    <span className="px-3 py-1 bg-green-500/20 rounded-full text-green-300 text-xs">
                      {activity.suitable}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <Link href="/family-kids" className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition">
                More family activities <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Nightlife Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600">
                <Wine className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">🌙 Nightlife</h2>
                <p className="text-gray-400">Where to go when the sun sets</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-8 max-w-3xl">
              During Ramadan, Bahrain's evening scene shifts to a more relaxed pace. Traditional cafés, hotel lounges, 
              and cultural spaces become the gathering spots after Iftar. Here are the best places for post-Iftar 
              gatherings and late-night Suhoor:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {eveningSpots.map((spot) => (
                <div key={spot.name} className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-gray-600 transition">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-violet-500/20 rounded-full text-violet-300 text-xs font-medium">
                      {spot.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{spot.name}</h3>
                  <p className="text-gray-400 text-sm mb-3">{spot.vibe}</p>
                  <span className="text-gray-500 text-sm flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {spot.location}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <Link href="/bahrain-nightlife-guide" className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition">
                Full nightlife guide <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Restaurant Recommendations Section */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-600">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">🍽️ Restaurant Picks</h2>
                <p className="text-gray-400">Where to dine this weekend</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-8 max-w-3xl">
              Beyond brunch, Bahrain's dining scene offers incredible variety. From celebrity chef restaurants to 
              cozy local gems, here are our top dinner recommendations for the weekend:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {restaurantPicks.map((restaurant) => (
                <div key={restaurant.name} className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-gray-600 transition">
                  <h3 className="text-xl font-semibold text-white mb-1">{restaurant.name}</h3>
                  <div className="flex items-center gap-2 mb-3 text-sm">
                    <span className="text-orange-400">{restaurant.cuisine}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {restaurant.location}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">{restaurant.highlight}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <Link href="/best-restaurants-bahrain" className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition">
                Full restaurant guide <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Insider Tips */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-amber-400" />
              Insider Tips for the Weekend
            </h2>
            
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl border border-amber-500/30">
                <h3 className="text-xl font-semibold text-amber-300 mb-2">🎫 Book Brunches in Advance</h3>
                <p className="text-gray-300">
                  Popular brunches like Al Waha fill up fast, especially during the cooler months. We recommend booking 
                  at least 3-4 days in advance for the best spots. Some brunches offer early bird discounts if you arrive 
                  at opening time.
                </p>
              </div>
              
              <div className="p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl border border-blue-500/30">
                <h3 className="text-xl font-semibold text-blue-300 mb-2">🚗 Parking & Transportation</h3>
                <p className="text-gray-300">
                  If you're heading to Adliya for dinner or nightlife, consider using ride-sharing apps as parking can be 
                  limited. Most hotels offer valet parking for restaurant guests. The Bahrain Metro is also a great option 
                  for getting around without the hassle.
                </p>
              </div>
              
              <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/30">
                <h3 className="text-xl font-semibold text-purple-300 mb-2">🌡️ Weather Perfect</h3>
                <p className="text-gray-300">
                  February weather in Bahrain is perfect for outdoor activities. Temperatures range from 15-25°C, making 
                  it ideal for beach days, rooftop dining, and exploring historical sites. Pack a light jacket for evening 
                  outings.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Make the Most of Your Weekend</h2>
            <p className="text-gray-300 text-lg mb-8">
              Discover more events, browse restaurants, and plan your perfect Bahrain weekend with our comprehensive guides.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/events"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold hover:opacity-90 transition"
              >
                Browse All Events
              </Link>
              <Link 
                href="/calendar"
                className="px-8 py-4 bg-gray-800 rounded-full text-white font-semibold hover:bg-gray-700 transition"
              >
                View Calendar
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
              <Link href="/blog/bahrain-foodie-guide" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition group">
                <Heart className="w-8 h-8 text-red-400 mb-3" />
                <h3 className="font-semibold text-white group-hover:text-red-300 transition">Bahrain Foodie Guide</h3>
                <p className="text-sm text-gray-400 mt-2">50 must-try dishes</p>
              </Link>
              <Link href="/bahrain-nightlife-guide" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition group">
                <Music className="w-8 h-8 text-purple-400 mb-3" />
                <h3 className="font-semibold text-white group-hover:text-purple-300 transition">Nightlife Guide</h3>
                <p className="text-sm text-gray-400 mt-2">Best bars & clubs</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
