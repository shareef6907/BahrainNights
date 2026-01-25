import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Flag, Calendar, MapPin, Star,
  Sparkles, Music, Users, Camera
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Bahrain National Day 2025 | December 16-17 Celebrations Guide',
  description: 'Complete guide to Bahrain National Day! Events, fireworks, parades, activities, and celebrations on December 16-17 across the kingdom.',
  keywords: 'Bahrain National Day, December 16 Bahrain, Bahrain independence day, national day events, Bahrain celebrations, fireworks Bahrain',
  openGraph: {
    title: 'Bahrain National Day 2025 | December 16-17 Celebrations',
    description: 'Your guide to National Day celebrations in Bahrain.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/national-day',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/national-day',
  },
};

const events = [
  {
    name: 'Bahrain Bay Celebrations',
    location: 'Bahrain Bay',
    type: 'Major Venue',
    description: 'Central celebrations with fireworks, concerts, food stalls, and family entertainment along the waterfront.',
    highlights: ['Fireworks display', 'Live concerts', 'Food festival', 'Family zone', 'Light shows'],
  },
  {
    name: 'Manama Corniche Events',
    location: 'Manama Corniche',
    type: 'Public Event',
    description: 'Traditional celebrations along the corniche with parades, performances, and cultural activities.',
    highlights: ['Parades', 'Cultural shows', 'Street food', 'Photography spots'],
  },
  {
    name: 'Mall Celebrations',
    location: 'City Centre, Seef Mall, Avenues',
    type: 'Family Entertainment',
    description: 'Special events, decorations, performances, and sales at major shopping malls.',
    highlights: ['Performances', 'Kids activities', 'National Day sales', 'Decorations'],
  },
  {
    name: 'Muharraq Heritage Events',
    location: 'Muharraq',
    type: 'Cultural',
    description: 'Traditional celebrations in historic Muharraq celebrating Bahraini heritage and culture.',
    highlights: ['Heritage shows', 'Traditional music', 'Local crafts', 'Historical tours'],
  },
  {
    name: 'Hotel Events',
    location: 'Major hotels',
    type: 'Dining & Entertainment',
    description: 'Special brunches, dinners, and rooftop parties at hotels with firework views.',
    highlights: ['Themed brunches', 'Rooftop parties', 'Firework views', 'Special menus'],
  },
];

const traditions = [
  { name: 'December 16', description: 'Independence Day - commemorates independence from Britain in 1971' },
  { name: 'December 17', description: 'Accession Day - anniversary of late Amir Isa bin Salman Al Khalifa\'s accession' },
  { name: 'Red & White', description: 'National colors displayed everywhere - flags, decorations, clothing' },
  { name: 'Fireworks', description: 'Major firework displays across the country, especially at night' },
  { name: 'Parades', description: 'Military and cultural parades celebrating national pride' },
  { name: 'Royal Events', description: 'Official ceremonies and royal family appearances' },
];

const activities = [
  { activity: 'Watch fireworks', location: 'Bahrain Bay, hotels, beaches', tip: 'Arrive early for good spots' },
  { activity: 'Attend concerts', location: 'Bahrain Bay, various venues', tip: 'Check lineup in advance' },
  { activity: 'Heritage tours', location: 'Muharraq, Bahrain Fort', tip: 'Special programs during holiday' },
  { activity: 'Family fun', location: 'Malls, theme parks', tip: 'Extended hours during holiday' },
  { activity: 'Beach celebrations', location: 'Beach clubs, islands', tip: 'Book early - popular time' },
  { activity: 'Car parade watching', location: 'Main roads', tip: 'Evening on the 16th especially' },
];

const tips = [
  { title: 'Dates', content: 'December 16-17 are public holidays. Most businesses closed, tourist areas busy.' },
  { title: 'Traffic', content: 'Very heavy traffic, especially evening of 16th. Use taxis or arrive early.' },
  { title: 'Dress', content: 'Wear red and white to join the celebrations! Available everywhere before.' },
  { title: 'Fireworks', content: 'Best viewed from Bahrain Bay, hotel rooftops, or beachfront. Start after sunset.' },
  { title: 'Book Ahead', content: 'Hotel events, restaurants book up. Reserve 1-2 weeks in advance.' },
  { title: 'Respect', content: 'Patriotic time - be respectful of flag, anthem, and celebrations.' },
];

export default function NationalDayPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-red-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'National Day', url: 'https://www.bahrainnights.com/guides/national-day' },
      ]} />

      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-white/5" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium mb-4">🇧🇭 National Celebration</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">Bahrain National Day</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Celebrate December 16-17 with Bahrain! Fireworks, parades, concerts, and nationwide festivities marking independence and national pride.
            </p>
            <p className="text-sm text-gray-500 mt-4">Last updated: {lastUpdated} • December 16-17 annually</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Holiday Days', value: '2', icon: Calendar },
              { label: 'Since', value: '1971', icon: Flag },
              { label: 'Firework Sites', value: '5+', icon: Sparkles },
              { label: 'Key Color', value: 'Red', icon: Star },
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
          <h2 className="text-xl font-bold mb-4 text-center">What Is National Day?</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {traditions.map((t) => (
              <div key={t.name} className="bg-white/5 rounded-xl p-4">
                <h3 className="font-semibold text-red-400 text-sm">{t.name}</h3>
                <p className="text-xs text-gray-400">{t.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Major Events</h2>
          <p className="text-gray-400 text-center mb-12">Where to celebrate National Day.</p>
          
          <div className="space-y-6">
            {events.map((e) => (
              <div key={e.name} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{e.name}</h3>
                    <p className="text-red-400 text-sm flex items-center gap-1 mb-2">
                      <MapPin className="w-4 h-4" />{e.location} • {e.type}
                    </p>
                    <p className="text-gray-300 mb-4">{e.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {e.highlights.map((h) => (<span key={h} className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded">{h}</span>))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Things to Do</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activities.map((a) => (
              <div key={a.activity} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-red-400">{a.activity}</h3>
                <p className="text-sm text-gray-300">{a.location}</p>
                <p className="text-xs text-gray-400 mt-2">💡 {a.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Tips for National Day</h2>
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

      <section className="py-16 px-4 bg-gradient-to-r from-red-500/20 to-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">More Bahrain Events</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guides/f1" className="px-8 py-3 bg-red-500 hover:bg-red-400 text-black font-bold rounded-lg transition-colors">F1 Grand Prix</Link>
            <Link href="/guides/eid" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors">Eid Celebrations</Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'F1 Grand Prix', href: '/guides/f1', emoji: '🏎️' },
              { title: 'Things to Do', href: '/guides/things-to-do', emoji: '🎯' },
              { title: 'Historical Sites', href: '/guides/historical-sites', emoji: '🏰' },
              { title: 'Family Activities', href: '/guides/family-activities', emoji: '👨‍👩‍👧‍👦' },
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
              { q: 'When is Bahrain National Day?', a: 'December 16-17 every year. December 16 commemorates independence (1971), December 17 marks the late Amir\'s accession.' },
              { q: 'Is National Day a public holiday?', a: 'Yes, both December 16 and 17 are official public holidays in Bahrain.' },
              { q: 'Where are the best fireworks?', a: 'Bahrain Bay has the main display. Hotels with bay views offer great vantage points. Beach clubs also have good views.' },
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
        headline: 'Bahrain National Day 2025',
        description: 'Complete guide to Bahrain National Day celebrations on December 16-17.',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2025-01-26', dateModified: lastUpdated,
      })}} />
    </div>
  );
}
