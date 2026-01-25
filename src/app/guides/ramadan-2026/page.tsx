import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Moon, Sun, Clock, MapPin, Heart, Users,
  Utensils, Music, Star, Calendar
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ramadan in Bahrain 2026 Guide | Iftar, Events & Tips',
  description: 'Complete guide to Ramadan in Bahrain 2026 - best iftar spots, suhoor venues, events, timings, and what to expect during the holy month.',
  keywords: 'Ramadan Bahrain 2026, iftar Bahrain, suhoor Bahrain, Ramadan events, Ramadan guide Bahrain',
  openGraph: {
    title: 'Ramadan in Bahrain 2026 Guide',
    description: 'Your guide to experiencing Ramadan in Bahrain - iftar, suhoor, events and traditions.',
    type: 'article',
    locale: 'en_US',
  },
};

const iftarSpots = [
  {
    name: 'The Gulf Hotel',
    type: 'Buffet',
    price: 'BD 25-35',
    highlight: 'Legendary iftar with massive variety',
    atmosphere: 'Traditional & Grand',
  },
  {
    name: 'Four Seasons',
    type: 'Fine Dining',
    price: 'BD 40-55',
    highlight: 'Elegant iftar with bay views',
    atmosphere: 'Luxurious',
  },
  {
    name: 'The Ritz-Carlton',
    type: 'Buffet',
    price: 'BD 35-45',
    highlight: 'Beachfront Ramadan tent',
    atmosphere: 'Premium',
  },
  {
    name: 'Trader Vic&apos;s',
    type: 'Set Menu',
    price: 'BD 20-28',
    highlight: 'Polynesian-Arabic fusion',
    atmosphere: 'Unique',
  },
  {
    name: 'Saffron by Jena',
    type: 'Set Menu',
    price: 'BD 15-22',
    highlight: 'Authentic Arabic cuisine',
    atmosphere: 'Cozy & Traditional',
  },
  {
    name: 'Ramee Grand Hotel',
    type: 'Buffet',
    price: 'BD 18-25',
    highlight: 'Great value, family-friendly',
    atmosphere: 'Casual',
  },
];

const suhoorSpots = [
  { name: 'Manama Souq', type: 'Traditional', desc: 'Authentic late-night experience' },
  { name: 'Block 338', type: 'Cafes', desc: 'Hip cafes open late' },
  { name: 'Hotel Lounges', type: 'Upscale', desc: 'Comfortable suhoor settings' },
  { name: 'Muharraq', type: 'Traditional', desc: 'Historic area, local vibe' },
];

const tips = [
  {
    icon: Clock,
    title: 'Timings',
    content: 'Iftar is at sunset (~6 PM), Suhoor before dawn (~4 AM). Work hours are typically shorter (6 hours). Many shops open late evening.',
  },
  {
    icon: Utensils,
    title: 'Eating & Drinking',
    content: 'Non-Muslims can eat during the day, but discretely and not in public. Most restaurants serve food to non-fasting guests.',
  },
  {
    icon: Heart,
    title: 'Dress Code',
    content: 'Dress more conservatively during Ramadan. Modest clothing is appreciated, especially when visiting traditional areas.',
  },
  {
    icon: Users,
    title: 'Atmosphere',
    content: 'Ramadan has a special, peaceful atmosphere. Evenings come alive with family gatherings, charity events, and community spirit.',
  },
];

const events = [
  { name: 'Ramadan Nights', desc: 'Cultural events and entertainment after iftar', where: 'Various venues' },
  { name: 'Ghabga Gatherings', desc: 'Traditional late-night social gatherings', where: 'Hotels & homes' },
  { name: 'Charity Events', desc: 'Community iftar and donation drives', where: 'Mosques & community centers' },
  { name: 'Quran Recitations', desc: 'Special Taraweeh prayers', where: 'Al Fateh Mosque & others' },
];

export default function RamadanGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-emerald-950/10 to-slate-950 text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium mb-4">
              🌙 Ramadan 2026
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Ramadan in{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                Bahrain
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the holy month in the Kingdom — from magnificent iftars 
              to the spiritual atmosphere that transforms the island.
            </p>
            
            <div className="mt-8 inline-flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full">
              <Calendar className="w-5 h-5 text-emerald-400" />
              <span className="font-bold">Expected: February 28 - March 29, 2026</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">*Dates depend on moon sighting</p>
          </div>
        </div>
      </section>

      {/* What is Ramadan */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Understanding Ramadan</h2>
          
          <div className="bg-white/5 rounded-2xl p-8">
            <p className="text-gray-300 mb-6">
              Ramadan is the holiest month in Islam, observed by Muslims worldwide through 
              fasting from dawn to sunset. It&apos;s a time of spiritual reflection, increased 
              devotion, and community.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <Sun className="w-6 h-6 text-emerald-400 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Fasting (Sawm)</h3>
                  <p className="text-sm text-gray-400">
                    Muslims fast from dawn to sunset — no food, drink, or smoking during daylight hours.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Moon className="w-6 h-6 text-emerald-400 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Iftar</h3>
                  <p className="text-sm text-gray-400">
                    The evening meal that breaks the fast at sunset. Traditionally starts with dates and water.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Star className="w-6 h-6 text-emerald-400 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Suhoor</h3>
                  <p className="text-sm text-gray-400">
                    Pre-dawn meal eaten before the fast begins. A social occasion, especially on weekends.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Heart className="w-6 h-6 text-emerald-400 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Charity (Zakat)</h3>
                  <p className="text-sm text-gray-400">
                    Giving to those in need is emphasized. Many community iftars provide free meals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Iftar Spots */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Best Iftar Spots</h2>
          <p className="text-gray-400 text-center mb-12">
            From grand hotel buffets to intimate restaurants
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {iftarSpots.map((spot) => (
              <div key={spot.name} className="bg-white/5 rounded-xl p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold">{spot.name}</h3>
                  <span className="text-emerald-400 font-bold text-sm">{spot.price}</span>
                </div>
                <p className="text-sm text-emerald-300 mb-2">{spot.highlight}</p>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{spot.type}</span>
                  <span>{spot.atmosphere}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Suhoor */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Suhoor Spots</h2>
          
          <div className="grid md:grid-cols-4 gap-4">
            {suhoorSpots.map((spot) => (
              <div key={spot.name} className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl p-5 text-center">
                <h3 className="font-bold mb-1">{spot.name}</h3>
                <p className="text-xs text-emerald-400 mb-2">{spot.type}</p>
                <p className="text-xs text-gray-400">{spot.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Visitor Tips</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {tips.map((tip) => (
              <div key={tip.title} className="bg-white/5 rounded-xl p-6 flex items-start gap-4">
                <div className="p-3 bg-emerald-500/20 rounded-lg">
                  <tip.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">{tip.title}</h3>
                  <p className="text-gray-400 text-sm">{tip.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Ramadan Events</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {events.map((event) => (
              <div key={event.name} className="bg-white/5 rounded-xl p-6">
                <h3 className="font-bold text-emerald-400 mb-2">{event.name}</h3>
                <p className="text-sm text-gray-300 mb-2">{event.desc}</p>
                <p className="text-xs text-gray-500">
                  <MapPin className="w-3 h-3 inline mr-1" />
                  {event.where}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Changes */}
      <section className="py-16 px-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">What Changes During Ramadan</h2>
          
          <div className="bg-white/5 rounded-2xl p-8">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Working Hours:</strong> Typically reduced to 6 hours. Government offices: 9 AM - 2 PM.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Restaurants:</strong> Many close during the day but open after iftar until late.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Nightlife:</strong> Most bars and clubs close for the month. Some hotel restaurants remain open.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Shops:</strong> Malls and shops often open late evening (after 8 PM) and stay open until midnight.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Music:</strong> No loud music in public. A more peaceful, contemplative atmosphere.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Experience Ramadan</h2>
          <p className="text-gray-300 mb-8">
            Discover iftar events and Ramadan activities happening around Bahrain.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/events"
              className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-lg transition-colors"
            >
              Ramadan Events
            </Link>
            <Link 
              href="/places?category=restaurant"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              Iftar Restaurants
            </Link>
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Ramadan in Bahrain 2026 Guide',
            description: 'Complete guide to experiencing Ramadan in Bahrain.',
            author: { '@type': 'Organization', name: 'BahrainNights' },
            publisher: { '@type': 'Organization', name: 'BahrainNights' },
            datePublished: '2026-01-25',
            dateModified: '2026-01-25',
          }),
        }}
      />
    </div>
  );
}
