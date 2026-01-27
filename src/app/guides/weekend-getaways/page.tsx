import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Plane, Clock, MapPin, Star,
  Car, Globe, DollarSign, Calendar
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Weekend Getaways from Bahrain 2026 | Dubai, Qatar, Saudi & Beyond',
  description: 'Best weekend getaways from Bahrain! Quick escapes to Dubai, Doha, Al Khobar, and beyond. Flight times, visa info, and trip ideas for short breaks.',
  keywords: 'weekend getaway Bahrain, trips from Bahrain, Dubai from Bahrain, Doha from Bahrain, Saudi from Bahrain, short trips Bahrain',
  openGraph: {
    title: 'Weekend Getaways from Bahrain 2026 | Dubai, Qatar, Saudi',
    description: 'Your guide to weekend escapes from Bahrain.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/weekend-getaways',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/weekend-getaways',
  },
};

const destinations = [
  {
    name: 'Dubai, UAE',
    country: 'UAE',
    distance: '45min flight / 5hr drive',
    visa: 'GCC residents: free on arrival',
    budget: 'BD 100-300/weekend',
    highlights: ['Burj Khalifa', 'Desert safari', 'Shopping malls', 'Beach clubs', 'Nightlife'],
    bestFor: 'Shopping, nightlife, family fun',
    tip: 'Thursday night flight, return Saturday. Many expat favorites.',
  },
  {
    name: 'Doha, Qatar',
    country: 'Qatar',
    distance: '30min flight',
    visa: 'GCC residents: free on arrival',
    budget: 'BD 80-200/weekend',
    highlights: ['Museum of Islamic Art', 'Souq Waqif', 'The Pearl', 'Desert adventures', 'Sports events'],
    bestFor: 'Culture, sports events, quick escape',
    tip: 'Shortest flight. Great for long weekend. World Cup infrastructure excellent.',
  },
  {
    name: 'Al Khobar/Dammam, Saudi',
    country: 'Saudi Arabia',
    distance: '30min drive (King Fahd Causeway)',
    visa: 'eVisa or GCC residents free',
    budget: 'BD 30-80/trip',
    highlights: ['Corniche', 'Shopping', 'Restaurants', 'Beach resorts', 'Ithra museum'],
    bestFor: 'Day trip or quick overnight, shopping',
    tip: 'Easiest trip - just drive! Weekend causeway can be busy.',
  },
  {
    name: 'Abu Dhabi, UAE',
    country: 'UAE',
    distance: '1hr flight',
    visa: 'GCC residents: free on arrival',
    budget: 'BD 120-300/weekend',
    highlights: ['Sheikh Zayed Mosque', 'Louvre Abu Dhabi', 'Ferrari World', 'Yas Island', 'Desert'],
    bestFor: 'Culture, theme parks, luxury',
    tip: 'Combine with Dubai for longer trip. More relaxed than Dubai.',
  },
  {
    name: 'Muscat, Oman',
    country: 'Oman',
    distance: '1hr 15min flight',
    visa: 'GCC residents: free / Others: eVisa',
    budget: 'BD 100-250/weekend',
    highlights: ['Grand Mosque', 'Old Muscat', 'Wadis', 'Mountains', 'Beaches'],
    bestFor: 'Nature, adventure, authentic Arabia',
    tip: 'Beautiful scenery. Rent car to explore wadis. Very different vibe.',
  },
  {
    name: 'Kuwait City',
    country: 'Kuwait',
    distance: '45min flight',
    visa: 'GCC residents: free on arrival',
    budget: 'BD 80-180/weekend',
    highlights: ['Kuwait Towers', 'Souq Mubarakiya', 'Marina', 'Shopping', 'Food scene'],
    bestFor: 'Food, culture, quick visit',
    tip: 'Excellent food scene. Hot summers like Bahrain.',
  },
  {
    name: 'Jeddah, Saudi',
    country: 'Saudi Arabia',
    distance: '2hr flight',
    visa: 'eVisa or GCC residents',
    budget: 'BD 100-250/weekend',
    highlights: ['Al Balad (UNESCO)', 'Corniche', 'Red Sea', 'Boulevard', 'Entertainment'],
    bestFor: 'History, beach, Saudi experiences',
    tip: 'Saudi is transforming. New entertainment options. Red Sea beautiful.',
  },
  {
    name: 'Riyadh, Saudi',
    country: 'Saudi Arabia',
    distance: '1.5hr flight',
    visa: 'eVisa or GCC residents',
    budget: 'BD 100-250/weekend',
    highlights: ['Diriyah', 'Boulevard', 'Edge of the World', 'Events', 'Modern Saudi'],
    bestFor: 'New Saudi, events, business combo',
    tip: 'Capital city transformation. Major events/concerts. Edge of the World stunning.',
  },
];

const byType = [
  { type: 'Quickest', destinations: 'Al Khobar (drive), Doha (30min)' },
  { type: 'Cheapest', destinations: 'Al Khobar (no flight!), Doha' },
  { type: 'Best Nightlife', destinations: 'Dubai' },
  { type: 'Best Culture', destinations: 'Muscat, Abu Dhabi, Doha' },
  { type: 'Best Nature', destinations: 'Muscat, Jeddah (Red Sea)' },
  { type: 'Best for Families', destinations: 'Dubai, Abu Dhabi' },
];

const tips = [
  { title: 'Book Early', content: 'Flights to Dubai spike for weekends. Book 2-4 weeks ahead.' },
  { title: 'Thursday Flights', content: 'Leave Thursday evening, maximize your weekend time.' },
  { title: 'Causeway Traffic', content: 'Al Khobar: causeway busy Thu evening/Sat night. Plan timing.' },
  { title: 'GCC Advantage', content: 'GCC residents can enter Gulf countries without visa. Huge advantage!' },
  { title: 'Pack Light', content: 'Weekend trips = carry-on only. Skip baggage wait.' },
  { title: 'Apps Ready', content: 'Download Uber/Careem for destination before you go.' },
];

export default function WeekendGetawaysPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Weekend Getaways', url: 'https://www.bahrainnights.com/guides/weekend-getaways' },
      ]} />

      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm font-medium mb-4">✈️ Travel Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">Weekend Getaways</span> from Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Escape for the weekend! Quick trips to Dubai, Doha, Saudi Arabia, and beyond — all easily accessible from Bahrain.
            </p>
            <p className="text-sm text-gray-500 mt-4">Last updated: {lastUpdated}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Nearest', value: 'Al Khobar', icon: Car },
              { label: 'Quickest Flight', value: '30 min', icon: Plane },
              { label: 'Budget From', value: 'BD 30', icon: DollarSign },
              { label: 'Destinations', value: '10+', icon: Globe },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-indigo-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-center">Quick Pick by Type</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {byType.map((t) => (
              <div key={t.type} className="bg-white/5 rounded-xl p-3">
                <h3 className="font-semibold text-indigo-400 text-sm">{t.type}</h3>
                <p className="text-xs text-gray-300">{t.destinations}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Destinations</h2>
          <p className="text-gray-400 text-center mb-12">Easy weekend escapes from Bahrain.</p>
          
          <div className="space-y-6">
            {destinations.map((d) => (
              <div key={d.name} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold">{d.name}</h3>
                        <p className="text-indigo-400 text-sm">{d.country} • {d.distance}</p>
                      </div>
                      <span className="text-sm font-bold text-white">{d.budget}</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-3"><strong>Visa:</strong> {d.visa}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {d.highlights.map((h) => (<span key={h} className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded">{h}</span>))}
                    </div>
                    <p className="text-sm text-gray-300"><strong>Best for:</strong> {d.bestFor}</p>
                  </div>
                  <div className="lg:w-1/4 bg-black/20 rounded-xl p-4">
                    <p className="text-indigo-400 italic text-sm">💡 {d.tip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Travel Tips</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tips.map((tip) => (
              <div key={tip.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-indigo-400 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-300">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay in Bahrain Instead?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guides/staycations" className="px-8 py-3 bg-indigo-500 hover:bg-indigo-400 text-black font-bold rounded-lg transition-colors">Staycations</Link>
            <Link href="/guides/things-to-do" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors">Things to Do</Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Staycations', href: '/guides/staycations', emoji: '🏨' },
              { title: 'Things to Do', href: '/guides/things-to-do', emoji: '🎯' },
              { title: 'Beach Clubs', href: '/guides/beach-clubs', emoji: '🏖️' },
              { title: 'Expat Guide', href: '/guides/expat', emoji: '🏠' },
            ].map((g) => (
              <Link key={g.href} href={g.href} className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group">
                <span className="text-2xl mb-2 block">{g.emoji}</span>
                <span className="font-medium group-hover:text-indigo-400 transition-colors">{g.title}</span>
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
              { q: 'What\'s the easiest weekend trip from Bahrain?', a: 'Al Khobar, Saudi Arabia — just 30 minutes drive over the King Fahd Causeway. No flights needed!' },
              { q: 'Can GCC residents travel visa-free?', a: 'Yes! GCC residents (not just citizens) can enter UAE, Qatar, Kuwait, Oman, and Saudi without visa.' },
              { q: 'Best destination for a quick weekend?', a: 'Doha (30min flight) or Al Khobar (drive) for shortest trips. Dubai for most to do.' },
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
        headline: 'Weekend Getaways from Bahrain 2026',
        description: 'Complete guide to weekend trips from Bahrain.',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2026-01-26', dateModified: lastUpdated,
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What\'s the easiest weekend trip from Bahrain?', acceptedAnswer: { '@type': 'Answer', text: 'Al Khobar, Saudi Arabia — just 30 minutes drive over the King Fahd Causeway. No flights needed!' } },
          { '@type': 'Question', name: 'Can GCC residents travel visa-free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! GCC residents (not just citizens) can enter UAE, Qatar, Kuwait, Oman, and Saudi without visa.' } },
          { '@type': 'Question', name: 'Best destination for a quick weekend?', acceptedAnswer: { '@type': 'Answer', text: 'Doha (30min flight) or Al Khobar (drive) for shortest trips. Dubai for most to do.' } },
        ]
      })}} />
    </div>
  );
}
