import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Car, Calendar, MapPin, Star,
  Ticket, Clock, Users, Music
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'F1 Bahrain Grand Prix 2026 | Tickets, Events & Complete Guide',
  description: 'Complete guide to F1 Bahrain Grand Prix! Tickets, race schedule, best viewing spots, concerts, parties, hotels, and everything for race weekend.',
  keywords: 'F1 Bahrain, Bahrain Grand Prix 2026, F1 tickets Bahrain, Bahrain International Circuit, Formula 1 Bahrain, race weekend Bahrain',
  openGraph: {
    title: 'F1 Bahrain Grand Prix 2026 | Complete Race Weekend Guide',
    description: 'Your guide to F1 weekend in Bahrain.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/f1',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/f1',
  },
};

const ticketTypes = [
  {
    name: 'Main Grandstand',
    price: 'BD 100-200',
    location: 'Start/Finish straight',
    view: 'Best view of starts, pit stops, podium',
    facilities: 'Covered, premium seats, screens',
    bestFor: 'First-timers, premium experience',
  },
  {
    name: 'Batelco Grandstand',
    price: 'BD 60-100',
    location: 'Turn 1',
    view: 'Overtaking zone, great action',
    facilities: 'Covered, good sightlines',
    bestFor: 'Action seekers, good value',
  },
  {
    name: 'University Grandstand',
    price: 'BD 40-70',
    location: 'Turns 9-10',
    view: 'Technical section, multiple corners',
    facilities: 'Partially covered',
    bestFor: 'Budget option, multiple views',
  },
  {
    name: 'General Admission',
    price: 'BD 25-40',
    location: 'Various viewing areas',
    view: 'Walking access to multiple spots',
    facilities: 'Standing areas, big screens',
    bestFor: 'Budget, flexibility, walking around',
  },
  {
    name: 'Paddock Club',
    price: 'BD 500+',
    location: 'Above pit lane',
    view: 'Pit access, garage tours, celebrity spotting',
    facilities: 'All-inclusive hospitality',
    bestFor: 'VIP experience, corporate',
  },
];

const schedule = [
  { day: 'Thursday', events: 'Pit lane walk, driver appearances, fan zone opens' },
  { day: 'Friday', events: 'Practice 1 & 2, concerts, after-race parties' },
  { day: 'Saturday', events: 'Practice 3, Qualifying, major concerts' },
  { day: 'Sunday', events: 'Race day! Pre-race show, main race, podium, closing concerts' },
];

const concerts = [
  { note: 'Major international artists perform after qualifying and race', typical: 'Past acts: Post Malone, The Weeknd, Black Eyed Peas, Swedish House Mafia' },
];

const tips = [
  { title: 'Book Early', content: 'Tickets sell out fast, especially grandstands. Book 3-6 months ahead for best selection.' },
  { title: 'Hotels', content: 'Prices 3-5x normal during F1. Book months ahead or stay outside Manama.' },
  { title: 'Transport', content: 'Shuttle buses from Manama included with tickets. Taxis surge heavily - use shuttles.' },
  { title: 'What to Bring', content: 'Sun protection, ear plugs, comfortable shoes. Food/water available inside.' },
  { title: 'Stay Late', content: 'Concerts after qualifying/race are included in ticket. Don\'t leave early!' },
  { title: 'Fan Zone', content: 'Free activities, simulators, food, merch. Arrives Thursday before racing starts.' },
];

const partiesAndEvents = [
  { name: 'After-Race Parties', location: 'Hotels, clubs', description: 'Major parties at hotels and beach clubs all weekend' },
  { name: 'Bahrain Bay Events', location: 'Bahrain Bay', description: 'Pre-race atmosphere, viewing screens, festivities' },
  { name: 'Hotel Rooftop Parties', location: 'Four Seasons, Ritz', description: 'Exclusive parties with race-themed events' },
  { name: 'Beach Club Events', location: 'Various beach clubs', description: 'Pool parties and weekend celebrations' },
];

export default function F1Page() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-red-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'F1', url: 'https://www.bahrainnights.com/guides/f1' },
      ]} />

      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium mb-4">🏎️ Motorsport</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">F1 Bahrain Grand Prix</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The ultimate guide to Formula 1 in Bahrain — tickets, schedule, concerts, parties, and tips for the biggest weekend of the year.
            </p>
            <p className="text-sm text-gray-500 mt-4">Last updated: {lastUpdated} • Race dates announced annually</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Circuit', value: 'Sakhir', icon: MapPin },
              { label: 'Track Length', value: '5.4 km', icon: Car },
              { label: 'First Race', value: '2004', icon: Calendar },
              { label: 'Night Race', value: 'Yes', icon: Star },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-red-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-center">Race Weekend Schedule</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {schedule.map((d) => (
              <div key={d.day} className="bg-white/5 rounded-xl p-4">
                <h3 className="font-bold text-red-400">{d.day}</h3>
                <p className="text-sm text-gray-300">{d.events}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Ticket Options</h2>
          <p className="text-gray-400 text-center mb-12">Choose your race weekend experience.</p>
          
          <div className="space-y-6">
            {ticketTypes.map((t) => (
              <div key={t.name} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold">{t.name}</h3>
                        <p className="text-red-400 text-sm">{t.location}</p>
                      </div>
                      <span className="text-lg font-bold text-white">{t.price}</span>
                    </div>
                    <p className="text-gray-300 mb-2"><strong>View:</strong> {t.view}</p>
                    <p className="text-gray-300 mb-2"><strong>Facilities:</strong> {t.facilities}</p>
                    <p className="text-red-300 text-sm">Best for: {t.bestFor}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">🎵 Concerts & Entertainment</h2>
          <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl p-8 text-center">
            <p className="text-xl text-gray-300 mb-4">World-class artists perform at the circuit after qualifying and the race</p>
            <p className="text-gray-400">Past performers include: Post Malone, The Weeknd, Black Eyed Peas, Swedish House Mafia, and more</p>
            <p className="text-red-400 mt-4 font-semibold">Concert access included with all race tickets!</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Parties & Events</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {partiesAndEvents.map((p) => (
              <div key={p.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-red-400">{p.name}</h3>
                <p className="text-sm text-gray-400 mb-1">{p.location}</p>
                <p className="text-sm text-gray-300">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">F1 Weekend Tips</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tips.map((tip) => (
              <div key={tip.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-red-400 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-300">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-red-500/20 to-orange-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Plan Your Weekend</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guides/hotels" className="px-8 py-3 bg-red-500 hover:bg-red-400 text-black font-bold rounded-lg transition-colors">Find Hotels</Link>
            <Link href="/guides/parties" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors">Party Guide</Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Hotels', href: '/guides/hotels', emoji: '🏨' },
              { title: 'Parties', href: '/guides/parties', emoji: '🎉' },
              { title: 'Nightlife', href: '/guides/nightlife', emoji: '🌃' },
              { title: 'Beach Clubs', href: '/guides/beach-clubs', emoji: '🏖️' },
            ].map((g) => (
              <Link key={g.href} href={g.href} className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group">
                <span className="text-2xl mb-2 block">{g.emoji}</span>
                <span className="font-medium group-hover:text-red-400 transition-colors">{g.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">FAQs</h2>
          <div className="space-y-4">
            {[
              { q: 'When is F1 Bahrain Grand Prix 2026?', a: 'Typically held in February/March as one of the opening races. Exact dates announced by FIA. Check bahraingp.com for official dates.' },
              { q: 'How much are F1 tickets in Bahrain?', a: 'General admission from BD 25, grandstands BD 40-200, Paddock Club BD 500+. Book early for best prices.' },
              { q: 'Are concerts included with F1 tickets?', a: 'Yes! All ticket holders can attend post-race and qualifying concerts at the circuit.' },
              { q: 'How do I get to the circuit?', a: 'Free shuttle buses from Bahrain Mall and other locations included with tickets. Taxis available but expensive.' },
            ].map((faq, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6">
                <h3 className="font-bold mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'F1 Bahrain Grand Prix 2026',
        description: 'Complete guide to F1 race weekend in Bahrain.',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2026-01-26', dateModified: lastUpdated,
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'When is F1 Bahrain Grand Prix 2026?', acceptedAnswer: { '@type': 'Answer', text: 'Typically held in February/March as one of the opening races. Exact dates announced by FIA. Check bahraingp.com for official dates.' } },
          { '@type': 'Question', name: 'How much are F1 tickets in Bahrain?', acceptedAnswer: { '@type': 'Answer', text: 'General admission from BD 25, grandstands BD 40-200, Paddock Club BD 500+. Book early for best prices.' } },
          { '@type': 'Question', name: 'Are concerts included with F1 tickets?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! All ticket holders can attend post-race and qualifying concerts at the circuit.' } },
          { '@type': 'Question', name: 'How do I get to the circuit?', acceptedAnswer: { '@type': 'Answer', text: 'Free shuttle buses from Bahrain Mall and other locations included with tickets. Taxis available but expensive.' } },
        ]
      })}} />
    </div>
  );
}
