import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Heart, MapPin, Star, Clock, ArrowRight, Calendar,
  Sparkles, Utensils, Wine, Music, Gift, Camera,
  Sun, Moon, Coffee, Flower2
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Valentine\'s Day in Bahrain 2026 — Best Restaurants & Events | BahrainNights',
  description: 'Plan the perfect Valentine\'s Day in Bahrain 2026! Discover romantic restaurants, special events, date ideas, and exclusive offers for couples in the Kingdom.',
  keywords: [
    'Valentine\'s Day Bahrain 2026', 'romantic restaurants Bahrain', 'Valentine dinner Bahrain',
    'couples activities Bahrain', 'romantic date ideas Bahrain', 'Valentine events Bahrain',
    'best date spots Bahrain', 'romantic dining Manama', 'Valentine offers Bahrain'
  ].join(', '),
  alternates: {
    canonical: 'https://www.bahrainnights.com/blog/valentines-day-bahrain-2026',
  },
  openGraph: {
    title: 'Valentine\'s Day in Bahrain 2026 — Best Restaurants & Events',
    description: 'Your complete guide to celebrating love in Bahrain. Romantic restaurants, special events & date ideas!',
    url: 'https://www.bahrainnights.com/blog/valentines-day-bahrain-2026',
    siteName: 'BahrainNights',
    images: [
      {
        url: 'https://www.bahrainnights.com/og-valentines-2026.jpg',
        width: 1200,
        height: 630,
        alt: 'Valentine\'s Day in Bahrain 2026',
      },
    ],
    type: 'article',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Valentine\'s Day in Bahrain 2026',
    description: 'Romantic restaurants, events & date ideas for couples!',
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
    headline: 'Valentine\'s Day in Bahrain 2026 — Best Restaurants & Events',
    description: 'Plan the perfect Valentine\'s Day in Bahrain with romantic restaurants, events, and date ideas.',
    image: 'https://www.bahrainnights.com/og-valentines-2026.jpg',
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
    datePublished: '2026-01-20',
    dateModified: '2026-02-08',
    mainEntityOfPage: 'https://www.bahrainnights.com/blog/valentines-day-bahrain-2026'
  };
}

const romanticRestaurants = [
  {
    name: 'CUT by Wolfgang Puck',
    location: 'Four Seasons Bahrain Bay',
    cuisine: 'Steakhouse',
    vibe: 'Sophisticated & glamorous',
    valentineOffer: '5-course tasting menu with champagne',
    price: 'BHD 95/person',
    rating: 4.9,
    features: ['Bay views', 'Live jazz', 'Private tables']
  },
  {
    name: 'La Mer',
    location: 'Ritz-Carlton Bahrain',
    cuisine: 'French Seafood',
    vibe: 'Elegant & romantic',
    valentineOffer: 'Seafood tower + champagne dinner',
    price: 'BHD 120/couple',
    rating: 4.8,
    features: ['Waterfront', 'Candle-lit', 'Oyster bar']
  },
  {
    name: 'Masso',
    location: 'Four Seasons Bahrain Bay',
    cuisine: 'Italian',
    vibe: 'Warm & intimate',
    valentineOffer: 'Italian love menu with wine pairing',
    price: 'BHD 85/person',
    rating: 4.7,
    features: ['Handmade pasta', 'Terrace seating', 'Sunset views']
  },
  {
    name: 'Bushido',
    location: 'Ritz-Carlton Bahrain',
    cuisine: 'Japanese',
    vibe: 'Sophisticated & unique',
    valentineOffer: 'Omakase experience for two',
    price: 'BHD 150/couple',
    rating: 4.8,
    features: ['Sushi bar', 'Sake pairing', 'Private dining']
  },
  {
    name: 'Plums',
    location: 'Gulf Hotel',
    cuisine: 'Continental',
    vibe: 'Classic & refined',
    valentineOffer: 'Candlelit 4-course dinner',
    price: 'BHD 75/person',
    rating: 4.6,
    features: ['Award-winning', 'Live music', 'Dessert trolley']
  },
  {
    name: 'Takht Jamsheed',
    location: 'Gulf Hotel',
    cuisine: 'Persian',
    vibe: 'Exotic & romantic',
    valentineOffer: 'Persian feast with live entertainment',
    price: 'BHD 65/person',
    rating: 4.7,
    features: ['Live music', 'Belly dancing', 'Shisha lounge']
  },
];

const casualRomantic = [
  {
    name: 'The Orangery',
    location: 'Adliya',
    vibe: 'Garden romance',
    best: 'Brunch or lunch date',
    price: '$$',
    tip: 'Book the garden terrace for maximum charm'
  },
  {
    name: 'Café Lilou',
    location: 'Adliya',
    vibe: 'French charm',
    best: 'Breakfast date',
    price: '$$',
    tip: 'Their French toast is legendary'
  },
  {
    name: 'Segafredo',
    location: 'Adliya',
    vibe: 'Italian cool',
    best: 'Late-night date',
    price: '$$',
    tip: 'Great for people-watching'
  },
  {
    name: 'Block 338',
    location: 'Adliya',
    vibe: 'Trendy & artsy',
    best: 'Bar hopping',
    price: '$$-$$$',
    tip: 'Multiple venues in one destination'
  },
];

const valentineEvents = [
  {
    name: 'Romantic Sunset Dhow Cruise',
    date: 'February 14, 2026',
    time: '5:00 PM - 8:00 PM',
    location: 'Bahrain Bay',
    price: 'BHD 80/couple',
    includes: ['Traditional dhow ride', 'Dinner', 'Champagne', 'Live oud music']
  },
  {
    name: 'Valentine\'s Beach Dinner',
    date: 'February 14, 2026',
    time: '7:00 PM - 11:00 PM',
    location: 'Jumeirah Beach',
    price: 'BHD 150/couple',
    includes: ['Private beach cabana', '4-course dinner', 'Bonfire', 'Stargazing']
  },
  {
    name: 'Couples Spa Retreat',
    date: 'February 14-16, 2026',
    time: 'Various times',
    location: 'Ritz-Carlton Spa',
    price: 'BHD 200/couple',
    includes: ['Couples massage', 'Pool access', 'Champagne', 'Chocolate strawberries']
  },
  {
    name: 'Rooftop Jazz Night',
    date: 'February 14, 2026',
    time: '8:00 PM onwards',
    location: 'Hazel Rooftop',
    price: 'BHD 45/person',
    includes: ['Live jazz band', 'Cocktails', 'City views', 'Dancing']
  },
];

const uniqueExperiences = [
  {
    name: 'Private Yacht Charter',
    description: 'Sail into the sunset on a private yacht with champagne, canapés, and your own captain.',
    price: 'From BHD 200',
    duration: '3 hours',
    icon: Sun
  },
  {
    name: 'Hot Air Balloon Ride',
    description: 'Float above Bahrain\'s desert landscape at sunrise. Includes breakfast after landing.',
    price: 'From BHD 150/person',
    duration: '2 hours',
    icon: Sun
  },
  {
    name: 'Private Cooking Class',
    description: 'Learn to cook a romantic Italian dinner together with a private chef.',
    price: 'From BHD 120/couple',
    duration: '3 hours',
    icon: Utensils
  },
  {
    name: 'Stargazing Dinner',
    description: 'Desert setup with telescope, gourmet dinner, and astronomy guide under the stars.',
    price: 'From BHD 180/couple',
    duration: '4 hours',
    icon: Moon
  },
  {
    name: 'Helicopter Tour',
    description: 'See Bahrain from above with a scenic helicopter tour over the city and islands.',
    price: 'From BHD 300/couple',
    duration: '30 minutes',
    icon: Camera
  },
  {
    name: 'Couples Photography Session',
    description: 'Professional photoshoot at Bahrain\'s most romantic locations.',
    price: 'From BHD 150',
    duration: '2 hours',
    icon: Camera
  },
];

const giftIdeas = [
  { item: 'Bahraini Pearls', where: 'Manama Souq', price: 'From BHD 50', tip: 'Authentic Gulf pearls are a timeless gift' },
  { item: 'Spa Voucher', where: 'Five-star hotels', price: 'From BHD 80', tip: 'Can be used together as a couple experience' },
  { item: 'Fine Dining Gift Card', where: 'CUT, La Mer, Masso', price: 'From BHD 100', tip: 'Let them choose their own special dinner' },
  { item: 'Perfume', where: 'Arabian Oud, Amouage', price: 'From BHD 40', tip: 'Arabian fragrances are unique and luxurious' },
  { item: 'Designer Flowers', where: 'The Posy, Maison des Fleurs', price: 'From BHD 35', tip: 'Order early - they sell out!' },
  { item: 'Chocolate Box', where: 'Patchi, Godiva', price: 'From BHD 25', tip: 'Customize with a personal message' },
];

const dayDateIdeas = [
  { time: '9:00 AM', activity: 'Sunrise breakfast at The Orangery', type: 'Food' },
  { time: '11:00 AM', activity: 'Couples spa treatment', type: 'Wellness' },
  { time: '1:00 PM', activity: 'Lunch at Café Lilou', type: 'Food' },
  { time: '3:00 PM', activity: 'Visit Bahrain National Museum', type: 'Culture' },
  { time: '5:00 PM', activity: 'Sunset cocktails at a rooftop lounge', type: 'Drinks' },
  { time: '8:00 PM', activity: 'Romantic fine dining dinner', type: 'Food' },
  { time: '10:30 PM', activity: 'Moonlit beach walk', type: 'Romance' },
];

export default function ValentinesDayPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSchema()) }}
      />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/30 to-pink-900/30" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
          
          <div className="max-w-4xl mx-auto relative z-10">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li>/</li>
                <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
                <li>/</li>
                <li className="text-white">Valentine's Day 2026</li>
              </ol>
            </nav>

            <div className="text-center">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full text-red-300 text-sm mb-4">
                <Heart className="w-4 h-4" /> February 14, 2026
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-red-200 to-pink-200 bg-clip-text text-transparent leading-tight">
                Valentine's Day in Bahrain 2026
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Make this Valentine's Day unforgettable. Discover the most romantic restaurants, 
                exclusive events, and unique experiences for celebrating love in the Kingdom.
              </p>
              
              <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> 10 min read
                </span>
                <span>•</span>
                <span>By BahrainNights Team</span>
                <span>•</span>
                <span className="text-red-400">Updated for 2026</span>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
            <p className="text-gray-300 leading-relaxed text-lg">
              Valentine's Day in Bahrain is a magical affair. While the Kingdom may be small, it offers an 
              incredible array of romantic experiences — from candlelit dinners at world-class restaurants 
              to sunset cruises on traditional dhows, private beach picnics to stargazing in the desert.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              Whether you're planning an extravagant surprise or a cozy evening for two, this guide has 
              everything you need to plan the perfect Valentine's Day 2026. Remember: the best restaurants 
              and experiences book up weeks in advance, so don't wait!
            </p>
          </div>
        </section>

        {/* Important Note */}
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="p-6 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-2xl border border-red-500/30">
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="w-6 h-6 text-red-400" />
                <h3 className="text-xl font-semibold text-red-300">Book Now — Don't Wait!</h3>
              </div>
              <p className="text-gray-300">
                Valentine's Day is the busiest night for restaurants in Bahrain. The top spots start taking 
                reservations in late January and fill up fast. We recommend booking 2-3 weeks ahead for 
                popular restaurants and special experiences.
              </p>
            </div>
          </div>
        </section>

        {/* Fine Dining Section */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-600">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">💝 Romantic Fine Dining</h2>
                <p className="text-gray-400">Where to dine on the most romantic night of the year</p>
              </div>
            </div>
            
            <div className="space-y-6">
              {romanticRestaurants.map((restaurant) => (
                <div 
                  key={restaurant.name} 
                  className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-red-500/50 transition"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-white">{restaurant.name}</h3>
                        <div className="flex items-center gap-1 text-amber-400">
                          <Star className="w-4 h-4 fill-amber-400" />
                          <span className="font-semibold">{restaurant.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm flex items-center gap-1 mb-2">
                        <MapPin className="w-4 h-4" /> {restaurant.location} • {restaurant.cuisine}
                      </p>
                      <p className="text-pink-400 text-sm mb-3">{restaurant.vibe}</p>
                      <div className="p-3 bg-red-500/10 rounded-lg mb-4 inline-block">
                        <p className="text-red-300 text-sm font-medium">
                          ❤️ Valentine's Special: {restaurant.valentineOffer}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {restaurant.features.map((feature) => (
                          <span key={feature} className="px-3 py-1 bg-gray-700/50 rounded-full text-xs text-gray-300">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-red-400 font-bold text-lg">{restaurant.price}</div>
                      <p className="text-gray-500 text-xs mt-1">Valentine's menu price</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <Link href="/best-restaurants-bahrain" className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 transition">
                View all romantic restaurants <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Casual Romantic Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600">
                <Coffee className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">☕ Casual Romance</h2>
                <p className="text-gray-400">Charming spots for a relaxed date</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {casualRomantic.map((spot) => (
                <div key={spot.name} className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-pink-500/50 transition">
                  <h3 className="text-xl font-semibold text-white mb-1">{spot.name}</h3>
                  <p className="text-pink-400 text-sm mb-2">{spot.location}</p>
                  <p className="text-gray-400 text-sm mb-3">{spot.vibe}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Best for: {spot.best}</span>
                    <span className="text-pink-400">{spot.price}</span>
                  </div>
                  <p className="text-gray-500 text-xs mt-3 italic">💡 Tip: {spot.tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Valentine Events Section */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">✨ Special Valentine Events</h2>
                <p className="text-gray-400">Unique experiences for February 14</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {valentineEvents.map((event) => (
                <div key={event.name} className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-purple-500/50 transition">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-300 text-xs font-medium">
                      {event.date}
                    </span>
                    <span className="text-gray-500 text-sm">{event.time}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{event.name}</h3>
                  <p className="text-gray-400 text-sm flex items-center gap-1 mb-4">
                    <MapPin className="w-4 h-4" /> {event.location}
                  </p>
                  <div className="mb-4">
                    <p className="text-gray-500 text-xs mb-2">Includes:</p>
                    <div className="flex flex-wrap gap-2">
                      {event.includes.map((item) => (
                        <span key={item} className="px-2 py-1 bg-gray-700/50 rounded-full text-xs text-gray-300">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-purple-400 font-bold">{event.price}</div>
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

        {/* Unique Experiences Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">🎁 Unique Experiences</h2>
                <p className="text-gray-400">Make memories that last forever</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {uniqueExperiences.map((exp) => (
                <div key={exp.name} className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-amber-500/50 transition">
                  <exp.icon className="w-8 h-8 text-amber-400 mb-3" />
                  <h3 className="text-xl font-semibold text-white mb-2">{exp.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{exp.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-amber-400 font-semibold">{exp.price}</span>
                    <span className="text-gray-500">{exp.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gift Ideas Section */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-rose-500 to-red-600">
                <Flower2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">💐 Gift Ideas</h2>
                <p className="text-gray-400">Thoughtful presents to show your love</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {giftIdeas.map((gift) => (
                <div key={gift.item} className="p-5 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-rose-500/50 transition">
                  <h3 className="text-lg font-semibold text-white mb-1">{gift.item}</h3>
                  <p className="text-rose-400 text-sm mb-2">{gift.where}</p>
                  <p className="text-gray-500 text-xs mb-3">💡 {gift.tip}</p>
                  <span className="text-rose-400 font-semibold text-sm">{gift.price}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Day Date Itinerary */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Heart className="w-8 h-8 text-red-400" />
              Perfect Valentine's Day Itinerary
            </h2>
            
            <p className="text-gray-300 mb-8">
              Want to make the whole day special? Here's our recommended itinerary for the ultimate 
              Valentine's Day in Bahrain:
            </p>
            
            <div className="space-y-4">
              {dayDateIdeas.map((idea, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-red-500/30 transition">
                  <div className="w-20 text-red-400 font-bold">{idea.time}</div>
                  <div className="flex-1 text-white">{idea.activity}</div>
                  <span className="px-3 py-1 bg-red-500/20 rounded-full text-red-300 text-xs">
                    {idea.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">Pro Tips for Valentine's Day</h2>
            
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-2xl border border-red-500/30">
                <h3 className="text-xl font-semibold text-red-300 mb-2">🚗 Transportation</h3>
                <p className="text-gray-300">
                  Book a car service or use ride-sharing apps. Valentine's Day is busy, and you don't 
                  want to worry about parking or designated drivers. Many hotels offer valet.
                </p>
              </div>
              
              <div className="p-6 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-2xl border border-pink-500/30">
                <h3 className="text-xl font-semibold text-pink-300 mb-2">🌸 Order Flowers Early</h3>
                <p className="text-gray-300">
                  Florists in Bahrain get slammed on Valentine's Day. Order your bouquet at least 
                  3-4 days in advance for delivery. Popular shops like The Posy often sell out completely.
                </p>
              </div>
              
              <div className="p-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl border border-purple-500/30">
                <h3 className="text-xl font-semibold text-purple-300 mb-2">📱 Make It Personal</h3>
                <p className="text-gray-300">
                  The best Valentine's experiences are thoughtful, not just expensive. Consider what 
                  your partner actually loves — whether that's a simple beach picnic or a five-star dinner.
                </p>
              </div>
              
              <div className="p-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl border border-amber-500/30">
                <h3 className="text-xl font-semibold text-amber-300 mb-2">🎁 Experience Over Things</h3>
                <p className="text-gray-300">
                  Studies show that experiences create more lasting happiness than material gifts. 
                  Consider booking a couples' experience like a cooking class, spa day, or yacht cruise.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-red-900/30 to-pink-900/30">
          <div className="max-w-4xl mx-auto text-center">
            <Heart className="w-16 h-16 text-red-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-6">Make This Valentine's Day Special</h2>
            <p className="text-gray-300 text-lg mb-8">
              Browse our full guides for more romantic ideas, restaurant recommendations, and event listings.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/best-restaurants-bahrain"
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 rounded-full text-white font-semibold hover:opacity-90 transition"
              >
                Explore Restaurants
              </Link>
              <Link 
                href="/events"
                className="px-8 py-4 bg-gray-800 rounded-full text-white font-semibold hover:bg-gray-700 transition"
              >
                View All Events
              </Link>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8">Related Guides</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/blog/weekend-guide-bahrain-february-2026" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition group">
                <Calendar className="w-8 h-8 text-purple-400 mb-3" />
                <h3 className="font-semibold text-white group-hover:text-purple-300 transition">Weekend Guide</h3>
                <p className="text-sm text-gray-400 mt-2">What's happening this weekend</p>
              </Link>
              <Link href="/blog/new-restaurants-bahrain-2026" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition group">
                <Utensils className="w-8 h-8 text-orange-400 mb-3" />
                <h3 className="font-semibold text-white group-hover:text-orange-300 transition">New Restaurants 2026</h3>
                <p className="text-sm text-gray-400 mt-2">Latest dining openings</p>
              </Link>
              <Link href="/bahrain-nightlife-guide" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition group">
                <Music className="w-8 h-8 text-pink-400 mb-3" />
                <h3 className="font-semibold text-white group-hover:text-pink-300 transition">Nightlife Guide</h3>
                <p className="text-sm text-gray-400 mt-2">Best bars & lounges</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
