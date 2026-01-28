import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Calendar, MapPin, Clock, Ticket, Car, Hotel,
  ArrowRight, Star, Music, Utensils, Plane
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'F1 Bahrain Grand Prix 2026 Guide | Everything You Need to Know',
  description: 'Complete guide to the 2026 Bahrain Grand Prix - tickets, schedule, getting there, where to stay, and what to do during F1 weekend.',
  keywords: 'F1 Bahrain 2026, Bahrain Grand Prix, Formula 1 Bahrain, BIC tickets, F1 weekend Bahrain',
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/f1-2026',
  },
  openGraph: {
    title: 'F1 Bahrain Grand Prix 2026 Guide',
    description: 'Your ultimate guide to F1 weekend in Bahrain - tickets, transport, accommodation and more.',
    type: 'article',
    locale: 'en_US',
  },
};

const schedule = [
  { day: 'Thursday', date: 'March 12', events: ['Pit Lane Walk (ticket holders)', 'Team Arrivals', 'F1 Village Opens'] },
  { day: 'Friday', date: 'March 13', events: ['Practice 1: 3:30 PM', 'Practice 2: 7:00 PM', 'Evening Concerts'] },
  { day: 'Saturday', date: 'March 14', events: ['Practice 3: 4:30 PM', 'Qualifying: 8:00 PM', 'Post-Quali Concerts'] },
  { day: 'Sunday', date: 'March 15', events: ['Race Day: 8:00 PM', 'Podium Ceremony', 'Closing Concerts'] },
];

const ticketTiers = [
  {
    name: 'Main Grandstand',
    price: 'BD 200-350',
    features: ['Start/Finish line view', 'Big screen', 'Covered seating', 'Best atmosphere'],
    bestFor: 'First-time visitors, photography enthusiasts',
  },
  {
    name: 'Turn 1 Grandstand',
    price: 'BD 150-280',
    features: ['First corner action', 'Overtaking zone', 'Great views', 'Covered'],
    bestFor: 'Seeing wheel-to-wheel racing',
  },
  {
    name: 'Batelco Grandstand',
    price: 'BD 120-200',
    features: ['Hairpin view', 'Technical section', 'Good value', 'Covered'],
    bestFor: 'Budget-conscious fans, families',
  },
  {
    name: 'General Admission',
    price: 'BD 50-80',
    features: ['Roaming access', 'Multiple viewing areas', 'F1 Village access', 'Most affordable'],
    bestFor: 'Exploring the circuit, casual fans',
  },
  {
    name: 'VIP Hospitality',
    price: 'BD 500+',
    features: ['Paddock access', 'Gourmet dining', 'Open bar', 'Pit lane walks'],
    bestFor: 'Corporate entertaining, ultimate experience',
  },
];

const accommodation = [
  { area: 'Manama (City Center)', distance: '25 min', pros: 'Nightlife, restaurants, most hotels', cons: 'Traffic on race days' },
  { area: 'Seef District', distance: '20 min', pros: 'Malls, dining, good hotels', cons: 'Can be busy' },
  { area: 'Amwaj Islands', distance: '40 min', pros: 'Beach resorts, relaxed', cons: 'Further from circuit' },
  { area: 'Sakhir (Near Circuit)', distance: '5 min', pros: 'Walking distance, no traffic', cons: 'Limited options, remote' },
];

const tips = [
  { icon: Ticket, title: 'Book Early', content: 'Tickets sell out months in advance. Official tickets from BIC only - avoid scalpers.' },
  { icon: Car, title: 'Transport', content: 'Free shuttles from Bahrain City Centre. Uber/taxis work but expect surge pricing.' },
  { icon: Clock, title: 'Arrive Early', content: 'Gates open 4 hours before sessions. Beat the crowds and explore the F1 Village.' },
  { icon: Hotel, title: 'Book Hotels Now', content: 'Hotels triple their prices and sell out. Book 6+ months ahead for best rates.' },
];

export default function F1GuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-red-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Bahrain F1 Grand Prix 2026', url: 'https://www.bahrainnights.com/guides/f1-2026' },
      ]} />
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium mb-4">
              🏎️ F1 2026
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Bahrain{' '}
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Grand Prix
              </span>
              {' '}2026
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The first race of the season. Night racing under the lights. 
              Everything you need for the ultimate F1 weekend in Bahrain.
            </p>
            
            <div className="mt-8 inline-flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full">
              <Calendar className="w-5 h-5 text-red-400" />
              <span className="font-bold">March 13-15, 2026</span>
              <span className="text-gray-400">|</span>
              <MapPin className="w-5 h-5 text-red-400" />
              <span>Bahrain International Circuit</span>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Weekend Schedule</h2>
          
          <div className="grid md:grid-cols-4 gap-4">
            {schedule.map((day) => (
              <div key={day.day} className="bg-white/5 rounded-xl p-5">
                <div className="text-red-400 font-bold text-lg">{day.day}</div>
                <div className="text-gray-400 text-sm mb-4">{day.date}</div>
                <ul className="space-y-2">
                  {day.events.map((event) => (
                    <li key={event} className="text-sm flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>{event}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <p className="text-center text-gray-500 text-sm mt-6">
            *Times are local (GMT+3). Schedule subject to change.
          </p>
        </div>
      </section>

      {/* Tickets */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Tickets</h2>
          <p className="text-gray-400 text-center mb-12">
            Official tickets available from{' '}
            <a href="https://www.bahraingp.com" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">
              bahraingp.com
            </a>
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ticketTiers.map((tier) => (
              <div key={tier.name} className="bg-white/5 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-lg">{tier.name}</h3>
                  <span className="text-red-400 font-bold">{tier.price}</span>
                </div>
                <ul className="space-y-2 mb-4">
                  {tier.features.map((f) => (
                    <li key={f} className="text-sm text-gray-300 flex items-center gap-2">
                      <Star className="w-3 h-3 text-red-400" /> {f}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-500">
                  <strong>Best for:</strong> {tier.bestFor}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accommodation */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Where to Stay</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="py-3 px-4 font-bold">Area</th>
                  <th className="py-3 px-4 font-bold">Distance to BIC</th>
                  <th className="py-3 px-4 font-bold">Pros</th>
                  <th className="py-3 px-4 font-bold">Cons</th>
                </tr>
              </thead>
              <tbody>
                {accommodation.map((area) => (
                  <tr key={area.area} className="border-b border-white/10">
                    <td className="py-4 px-4 font-medium">{area.area}</td>
                    <td className="py-4 px-4 text-red-400">{area.distance}</td>
                    <td className="py-4 px-4 text-gray-300 text-sm">{area.pros}</td>
                    <td className="py-4 px-4 text-gray-500 text-sm">{area.cons}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Essential Tips</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {tips.map((tip) => (
              <div key={tip.title} className="bg-white/5 rounded-xl p-6 flex items-start gap-4">
                <div className="p-3 bg-red-500/20 rounded-lg">
                  <tip.icon className="w-6 h-6 text-red-400" />
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

      {/* Beyond the Race */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Beyond the Race</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            F1 weekend is about more than just racing. Here&apos;s what else to experience.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl p-6">
              <Music className="w-8 h-8 text-red-400 mb-4" />
              <h3 className="font-bold mb-2">After-Race Concerts</h3>
              <p className="text-sm text-gray-300">
                Major artists perform after Saturday and Sunday sessions. Past acts include 
                The Weeknd, Post Malone, and Swedish House Mafia.
              </p>
            </div>
            <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl p-6">
              <Utensils className="w-8 h-8 text-red-400 mb-4" />
              <h3 className="font-bold mb-2">F1 Parties</h3>
              <p className="text-sm text-gray-300">
                Hotels and clubs host special F1-themed events all weekend. Book tables 
                early at top venues.
              </p>
            </div>
            <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl p-6">
              <Car className="w-8 h-8 text-red-400 mb-4" />
              <h3 className="font-bold mb-2">Driving Experiences</h3>
              <p className="text-sm text-gray-300">
                Book track experiences at BIC - drive the F1 circuit yourself or 
                experience a passenger hot lap.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-500/10 to-orange-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Plan Your F1 Weekend</h2>
          <p className="text-gray-300 mb-8">
            Check out events happening during race week and explore Bahrain.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/events"
              className="px-8 py-3 bg-red-500 hover:bg-red-400 text-white font-bold rounded-lg transition-colors"
            >
              F1 Week Events
            </Link>
            <Link 
              href="/guides/things-to-do"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              Explore Bahrain
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
            '@type': 'Event',
            name: 'Bahrain Grand Prix 2026',
            description: 'Formula 1 Gulf Air Bahrain Grand Prix 2026',
            startDate: '2026-03-13',
            endDate: '2026-03-15',
            location: {
              '@type': 'Place',
              name: 'Bahrain International Circuit',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Sakhir',
                addressCountry: 'BH',
              },
            },
            organizer: {
              '@type': 'Organization',
              name: 'Bahrain International Circuit',
            },
          }),
        }}
      />
    </div>
  );
}
