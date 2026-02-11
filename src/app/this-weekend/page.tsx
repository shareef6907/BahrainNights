import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Sun, Moon, Utensils, Music, Waves, Users, ArrowRight, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Bahrain This Weekend | Things to Do This Weekend in Bahrain',
  description: 'Plan your weekend in Bahrain. Friday brunch, beach clubs, nightlife, family activities, and events happening this weekend across the kingdom.',
  keywords: 'Bahrain this weekend, things to do weekend Bahrain, Friday brunch Bahrain, weekend events Bahrain, weekend activities Bahrain',
  alternates: { canonical: 'https://www.bahrainnights.com/this-weekend' },
  openGraph: {
    title: 'Bahrain This Weekend - Things to Do',
    description: 'Your complete guide to weekend activities, brunches, and events in Bahrain.',
    type: 'website',
  },
};

const weekendHighlights = [
  {
    title: 'Friday Brunch',
    icon: Utensils,
    time: 'Friday 12:30 PM - 4 PM',
    description: 'Bahrain\'s legendary Friday brunch scene at hotels across the kingdom. Feast, drinks, and social atmosphere.',
    link: '/guides/brunches',
    color: 'amber',
  },
  {
    title: 'Beach & Pool',
    icon: Waves,
    time: 'All Weekend',
    description: 'Beach clubs, hotel pools, and day passes for relaxing in the sun.',
    link: '/guides/beach-clubs',
    color: 'cyan',
  },
  {
    title: 'Nightlife',
    icon: Moon,
    time: 'Thu-Sat Nights',
    description: 'Thursday kicks off the weekend with packed clubs and bars through Saturday.',
    link: '/guides/nightlife',
    color: 'purple',
  },
  {
    title: 'Family Fun',
    icon: Users,
    time: 'All Weekend',
    description: 'Kid-friendly activities, attractions, and family restaurants.',
    link: '/guides/kids-activities-bahrain',
    color: 'green',
  },
  {
    title: 'Live Entertainment',
    icon: Music,
    time: 'Weekend Evenings',
    description: 'Live bands, DJs, concerts, and performances across venues.',
    link: '/guides/live-music',
    color: 'pink',
  },
  {
    title: 'Day Trips',
    icon: MapPin,
    time: 'Saturday',
    description: 'Explore Bahrain\'s heritage sites, islands, and attractions.',
    link: '/guides/things-to-do',
    color: 'orange',
  },
];

const weekendByDay = [
  {
    day: 'Thursday Night',
    subtitle: 'Weekend Kickoff',
    highlights: [
      'Gulf weekend officially begins',
      'Peak nightlife - clubs and bars at full capacity',
      'Ladies nights at many venues',
      'Live music and entertainment',
      'Book restaurants in advance',
    ],
  },
  {
    day: 'Friday',
    subtitle: 'Brunch Day',
    highlights: [
      'Morning: Quiet, many sleep in',
      'Afternoon: FRIDAY BRUNCH (12:30-4 PM)',
      'Post-brunch: Pool parties, beach clubs',
      'Evening: Dinner reservations recommended',
      'Night: Second big night out',
    ],
  },
  {
    day: 'Saturday',
    subtitle: 'Day Activities',
    highlights: [
      'Morning: Farmers markets, breakfast spots',
      'Day: Beach clubs, pools, attractions',
      'Afternoon: Shopping, family activities',
      'Evening: Dinner and entertainment',
      'Night: Final weekend night out',
    ],
  },
];

const topBrunches = [
  { name: 'Four Seasons', price: 'BD 45+', vibe: 'Upscale' },
  { name: 'Ritz-Carlton', price: 'BD 40+', vibe: 'Premium' },
  { name: 'Gulf Hotel', price: 'BD 35+', vibe: 'Classic' },
  { name: 'InterContinental', price: 'BD 35+', vibe: 'Variety' },
];

export default function ThisWeekendPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-orange-950/10 to-slate-950 text-white">
      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-orange-400" />
              <span className="text-orange-400 font-medium">This Weekend</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Bahrain <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">This Weekend</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From legendary Friday brunches to beach clubs and nightlife — your complete 
              weekend guide to the Kingdom of Bahrain.
            </p>
          </div>
        </div>
      </section>

      {/* Weekend Highlights */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Weekend Highlights</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {weekendHighlights.map((item) => (
              <Link 
                key={item.title}
                href={item.link}
                className="group bg-white/5 hover:bg-white/10 rounded-xl p-6 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <item.icon className={`w-10 h-10 text-${item.color}-400`} />
                  <span className="text-xs text-gray-500">{item.time}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-orange-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{item.description}</p>
                <span className="text-orange-400 text-sm flex items-center gap-1">
                  Explore <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Day by Day */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Weekend Day by Day</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {weekendByDay.map((day) => (
              <div key={day.day} className="bg-white/5 rounded-xl p-6">
                <h3 className="text-xl font-bold text-orange-400 mb-1">{day.day}</h3>
                <p className="text-gray-500 text-sm mb-4">{day.subtitle}</p>
                <ul className="space-y-2">
                  {day.highlights.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                      <Sun className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Friday Brunch Spotlight */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
              <Utensils className="w-6 h-6 text-amber-400" />
              Friday Brunch
            </h2>
            <p className="text-gray-400 mb-6">
              The cornerstone of Bahrain&apos;s weekend. Book ahead for the best spots.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {topBrunches.map((brunch) => (
                <div key={brunch.name} className="bg-black/30 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold">{brunch.name}</h4>
                    <span className="text-xs text-gray-500">{brunch.vibe}</span>
                  </div>
                  <span className="text-amber-400 font-medium">{brunch.price}</span>
                </div>
              ))}
            </div>
            <Link href="/guides/brunches" className="inline-flex items-center gap-2 text-amber-400 hover:underline">
              View all brunches <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Weekend by Area */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Weekend by Area</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: 'Adliya', href: '/guides/adliya', desc: 'Bars & dining' },
              { name: 'Juffair', href: '/guides/juffair-restaurants-bars', desc: 'Nightlife hub' },
              { name: 'Zallaq', href: '/guides/zallaq-guide', desc: 'Beach resorts' },
              { name: 'Amwaj', href: '/guides/amwaj', desc: 'Island vibes' },
              { name: 'Seef', href: '/guides/seef', desc: 'Shopping & dining' },
              { name: 'Bahrain Bay', href: '/guides/bahrain-bay', desc: 'Upscale waterfront' },
            ].map((area) => (
              <Link 
                key={area.name}
                href={area.href}
                className="px-6 py-3 bg-white/5 hover:bg-orange-500/20 rounded-lg transition-colors text-center"
              >
                <div className="font-medium">{area.name}</div>
                <div className="text-xs text-gray-500">{area.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Plan Your Perfect Weekend</h2>
          <p className="text-gray-400 mb-8">
            Browse our guides for detailed recommendations on everything Bahrain has to offer.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guides" className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-medium transition-colors">
              All Guides
            </Link>
            <Link href="/tonight" className="px-6 py-3 border border-white/20 hover:bg-white/10 rounded-lg font-medium transition-colors">
              What&apos;s On Tonight
            </Link>
            <Link href="/events" className="px-6 py-3 border border-white/20 hover:bg-white/10 rounded-lg font-medium transition-colors">
              Events Calendar
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-12 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-4">Things to Do in Bahrain This Weekend</h2>
          <div className="text-gray-400 space-y-4 text-sm">
            <p>
              The Bahrain weekend runs Thursday through Saturday (with Friday being the 
              main day off). This creates a unique rhythm — Thursday night kicks off 
              the celebrations, Friday is for brunch and relaxation, and Saturday 
              offers a mix of activities before the work week returns on Sunday.
            </p>
            <p>
              Friday brunch is the cultural highlight — hotels across Bahrain offer 
              elaborate buffets with free-flowing drinks, live entertainment, and 
              pool access. It&apos;s as much a social event as a meal, often lasting 
              from 12:30 PM until 4 PM or later.
            </p>
            <p>
              Whether you&apos;re looking for beach time in Zallaq, nightlife in Juffair 
              and Adliya, family activities at malls and attractions, or cultural 
              exploration in Manama and Muharraq, Bahrain packs plenty into its 
              three-day weekend.
            </p>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Bahrain This Weekend - Things to Do',
        description: 'Your complete guide to weekend activities, brunches, and events in Bahrain.',
        url: 'https://www.bahrainnights.com/this-weekend',
        publisher: {
          '@type': 'Organization',
          name: 'BahrainNights',
        },
      })}} />
    </div>
  );
}
