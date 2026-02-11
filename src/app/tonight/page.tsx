import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Music, Utensils, PartyPopper, Star, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Things to Do in Bahrain Tonight | What\'s On Tonight',
  description: 'Find what\'s happening in Bahrain tonight. Live events, happy hours, ladies nights, live music, restaurant deals, and nightlife - updated daily.',
  keywords: 'things to do Bahrain tonight, whats on Bahrain tonight, Bahrain tonight, events tonight Bahrain, nightlife Bahrain today',
  alternates: { canonical: 'https://www.bahrainnights.com/tonight' },
  openGraph: {
    title: 'Things to Do in Bahrain Tonight',
    description: 'Your guide to tonight\'s events, deals, and entertainment in Bahrain.',
    type: 'website',
  },
};

// Get current day for dynamic content hints
const getDayName = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[new Date().getDay()];
};

const tonightCategories = [
  {
    title: 'Happy Hours',
    icon: Clock,
    description: 'Discounted drinks typically from 4-8 PM at hotel bars and restaurants',
    link: '/guides/happy-hour-bahrain',
    color: 'amber',
  },
  {
    title: 'Live Music',
    icon: Music,
    description: 'Bands, DJs, and live performances at venues across Bahrain',
    link: '/guides/live-music',
    color: 'purple',
  },
  {
    title: 'Ladies Nights',
    icon: Star,
    description: 'Free drinks and special deals for ladies at select venues',
    link: '/guides/nightlife',
    color: 'pink',
  },
  {
    title: 'Dining Deals',
    icon: Utensils,
    description: 'Restaurant promotions, set menus, and special offers',
    link: '/guides/restaurants',
    color: 'green',
  },
  {
    title: 'Nightlife',
    icon: PartyPopper,
    description: 'Clubs, bars, and late-night entertainment',
    link: '/guides/nightlife',
    color: 'blue',
  },
  {
    title: 'Late Night Food',
    icon: MapPin,
    description: 'Where to eat after midnight in Bahrain',
    link: '/guides/best-late-night-food-bahrain',
    color: 'red',
  },
];

const weekdayTips: Record<string, string[]> = {
  Sunday: ['Many venues start their week quietly', 'Good night for relaxed dinners', 'Some happy hours run longer'],
  Monday: ['Industry night at some bars', 'Quiz nights at various venues', 'Quieter clubs = more space'],
  Tuesday: ['Ladies nights at many venues', 'Mid-week dining deals', 'Live music at select spots'],
  Wednesday: ['Peak ladies night', 'Karaoke nights popular', 'Good happy hour options'],
  Thursday: ['Gulf weekend begins!', 'Busiest night for nightlife', 'Book restaurants in advance'],
  Friday: ['Brunch day (afternoon)', 'Evening picks up late', 'Some venues closed until evening'],
  Saturday: ['Second weekend night', 'Live entertainment peaks', 'Reservations recommended'],
};

export default function TonightPage() {
  const today = getDayName();
  const tips = weekdayTips[today] || weekdayTips['Thursday'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950/20 to-slate-950 text-white">
      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-indigo-400" />
              <span className="text-indigo-400 font-medium">{today}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              What&apos;s On <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">Tonight</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your guide to tonight&apos;s events, deals, and entertainment across Bahrain.
            </p>
          </div>
        </div>
      </section>

      {/* Today's Tips */}
      <section className="py-12 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-400" />
            {today} Night Tips
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {tips.map((tip, i) => (
              <div key={i} className="bg-white/5 rounded-lg p-4">
                <p className="text-gray-300">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Find Your Tonight</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tonightCategories.map((cat) => (
              <Link 
                key={cat.title} 
                href={cat.link}
                className="group bg-white/5 hover:bg-white/10 rounded-xl p-6 transition-all"
              >
                <cat.icon className={`w-10 h-10 text-${cat.color}-400 mb-4`} />
                <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{cat.description}</p>
                <span className="text-indigo-400 text-sm flex items-center gap-1">
                  Explore <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links by Area */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Tonight by Area</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: 'Adliya', href: '/guides/adliya' },
              { name: 'Juffair', href: '/guides/juffair-restaurants-bars' },
              { name: 'Seef', href: '/guides/seef' },
              { name: 'Manama', href: '/guides/manama-city-guide' },
              { name: 'Amwaj', href: '/guides/amwaj' },
              { name: 'Bahrain Bay', href: '/guides/bahrain-bay' },
            ].map((area) => (
              <Link 
                key={area.name}
                href={area.href}
                className="px-6 py-3 bg-white/5 hover:bg-indigo-500/20 rounded-full transition-colors"
              >
                {area.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Looking for Something Specific?</h2>
          <p className="text-gray-400 mb-8">
            Browse our comprehensive guides to find exactly what you&apos;re in the mood for tonight.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guides" className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-lg font-medium transition-colors">
              All Guides
            </Link>
            <Link href="/events" className="px-6 py-3 border border-white/20 hover:bg-white/10 rounded-lg font-medium transition-colors">
              Events Calendar
            </Link>
          </div>
        </div>
      </section>

      {/* More Tonight Ideas */}
      <section className="py-12 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-6">More Ideas for Tonight</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link href="/guides/best-date-night-bahrain" className="bg-white/5 hover:bg-white/10 rounded-lg p-4 transition-colors">
              <span className="text-2xl mb-2 block">💕</span>
              <h3 className="font-bold">Date Night</h3>
              <p className="text-xs text-gray-400">Romantic spots for couples</p>
            </Link>
            <Link href="/guides/shisha-lounges-bahrain" className="bg-white/5 hover:bg-white/10 rounded-lg p-4 transition-colors">
              <span className="text-2xl mb-2 block">💨</span>
              <h3 className="font-bold">Shisha</h3>
              <p className="text-xs text-gray-400">Best hookah spots</p>
            </Link>
            <Link href="/guides/karaoke-bahrain" className="bg-white/5 hover:bg-white/10 rounded-lg p-4 transition-colors">
              <span className="text-2xl mb-2 block">🎤</span>
              <h3 className="font-bold">Karaoke</h3>
              <p className="text-xs text-gray-400">Sing your heart out</p>
            </Link>
            <Link href="/guides/best-views-bahrain" className="bg-white/5 hover:bg-white/10 rounded-lg p-4 transition-colors">
              <span className="text-2xl mb-2 block">🌃</span>
              <h3 className="font-bold">Best Views</h3>
              <p className="text-xs text-gray-400">Rooftops & skylines</p>
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-12 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-4">Things to Do in Bahrain Tonight</h2>
          <div className="text-gray-400 space-y-4 text-sm">
            <p>
              Looking for what to do in Bahrain tonight? Whether it&apos;s a {today.toLowerCase()}, 
              Bahrain always has something happening. From <Link href="/guides/happy-hour-bahrain" className="text-indigo-400 hover:underline">happy hours</Link> starting in the late 
              afternoon to clubs that keep going until the early hours, the kingdom&apos;s 
              nightlife scene caters to every mood.
            </p>
            <p>
              Popular areas for tonight include <Link href="/guides/adliya" className="text-indigo-400 hover:underline">Adliya</Link> (trendy bars and restaurants), 
              <Link href="/guides/juffair-restaurants-bars" className="text-indigo-400 hover:underline">Juffair</Link> (entertainment hub), and hotel venues across <Link href="/guides/seef" className="text-indigo-400 hover:underline">Seef</Link> and <Link href="/guides/bahrain-bay" className="text-indigo-400 hover:underline">Bahrain Bay</Link>. 
              Check our area guides for specific recommendations based on where you are 
              or where you want to go tonight.
            </p>
            <p>
              Planning ahead? Check out our <Link href="/this-weekend" className="text-indigo-400 hover:underline">This Weekend</Link> guide for 
              <Link href="/guides/brunches" className="text-indigo-400 hover:underline">Friday brunch</Link> bookings and weekend activities.
            </p>
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-lg font-bold mb-4">Related Guides</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { title: 'This Weekend', href: '/this-weekend' },
              { title: 'Best Steakhouses', href: '/guides/best-steakhouses-bahrain' },
              { title: 'Japanese Restaurants', href: '/guides/best-japanese-restaurants-bahrain' },
              { title: 'Italian Restaurants', href: '/guides/best-italian-restaurants-bahrain' },
              { title: 'Bowling', href: '/guides/bowling-bahrain' },
              { title: 'Escape Rooms', href: '/guides/escape-rooms-bahrain' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded text-sm transition-colors">
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Things to Do in Bahrain Tonight',
        description: 'Find what\'s happening in Bahrain tonight - events, happy hours, nightlife and more.',
        url: 'https://www.bahrainnights.com/tonight',
        publisher: {
          '@type': 'Organization',
          name: 'BahrainNights',
        },
      })}} />
    </div>
  );
}
