import { Metadata } from 'next';
import Link from 'next/link';
import { 
  PartyPopper, Clock, MapPin, Star,
  Calendar, Gift, Users, Utensils
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Eid Celebrations in Bahrain 2025 | Events, Activities & Guide',
  description: 'Complete guide to Eid celebrations in Bahrain! Best events, activities, family fun, dining, and what to do during Eid Al-Fitr and Eid Al-Adha.',
  keywords: 'Eid Bahrain, Eid Al Fitr Bahrain, Eid Al Adha Bahrain, Eid celebrations, Eid events Bahrain, Bahrain holidays, Eid activities',
  openGraph: {
    title: 'Eid Celebrations in Bahrain 2025 | Events, Activities & Guide',
    description: 'Your guide to celebrating Eid in Bahrain.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/eid',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/eid',
  },
};

const eidInfo = [
  {
    name: 'Eid Al-Fitr',
    meaning: 'Festival of Breaking Fast',
    when: 'End of Ramadan (March/April 2025)',
    duration: '3-4 days holiday',
    traditions: ['Eid prayers', 'Family gatherings', 'Gift-giving (Eidiya)', 'Feasting', 'New clothes', 'Charity'],
    vibe: 'Celebratory after month of fasting',
  },
  {
    name: 'Eid Al-Adha',
    meaning: 'Festival of Sacrifice',
    when: 'After Hajj pilgrimage (June 2025)',
    duration: '4-5 days holiday',
    traditions: ['Eid prayers', 'Sacrifice ritual', 'Meat distribution', 'Family gatherings', 'Charity'],
    vibe: 'Spiritual, commemorative',
  },
];

const activities = [
  {
    name: 'Eid Prayers',
    type: 'Religious',
    location: 'Al Fateh Mosque & others',
    description: 'Morning prayers held at mosques and outdoor prayer grounds. Non-Muslims can observe respectfully.',
    time: 'Early morning (6-8 AM)',
  },
  {
    name: 'Mall Celebrations',
    type: 'Family Entertainment',
    location: 'City Centre, Seef Mall, The Avenues',
    description: 'Special Eid events, decorations, entertainment, and sales at major malls.',
    time: 'All day',
  },
  {
    name: 'Bahrain Bay Festivities',
    type: 'Public Entertainment',
    location: 'Bahrain Bay',
    description: 'Family entertainment, food stalls, fireworks, and activities along the waterfront.',
    time: 'Evening',
  },
  {
    name: 'Theme Parks',
    type: 'Family Fun',
    location: 'Wahooo!, Lost Paradise',
    description: 'Special Eid packages and extended hours at water parks and entertainment venues.',
    time: 'All day',
  },
  {
    name: 'Hotel Eid Brunches',
    type: 'Dining',
    location: 'Major hotels',
    description: 'Special Eid day brunches and festive dining experiences at hotels.',
    time: 'Lunch/Brunch',
  },
  {
    name: 'Beach Outings',
    type: 'Relaxation',
    location: 'Coral Bay, Al Dar Islands',
    description: 'Many families spend Eid at beach clubs or the islands.',
    time: 'All day',
  },
];

const diningOptions = [
  { venue: 'Hotel Eid Brunches', price: 'BD 25-60', description: 'Festive buffets at major hotels' },
  { venue: 'Arabic Restaurants', price: 'BD 15-40', description: 'Traditional feasting at Zahle, Abd El Wahab' },
  { venue: 'Family Restaurants', price: 'BD 10-25', description: 'Casual dining perfect for families' },
  { venue: 'Sweet Shops', price: 'BD 5-20', description: 'Traditional Arabic sweets and baklava' },
];

const tips = [
  { title: 'Book Early', content: 'Hotels, restaurants, and activities book up fast. Reserve 1-2 weeks ahead.' },
  { title: 'Traffic', content: 'Roads are busy as everyone visits family. Allow extra travel time.' },
  { title: 'Shopping', content: 'Pre-Eid shopping rush is intense. Sales continue through Eid.' },
  { title: 'Dress Up', content: 'Eid is a time for new clothes. Dress nicely to join the festivities.' },
  { title: 'Greetings', content: 'Say "Eid Mubarak" (Blessed Eid) to locals — they\'ll appreciate it!' },
  { title: 'Cash/Gifts', content: 'Eidiya (cash gifts) given to children. Small gifts appreciated for hosts.' },
];

export default function EidPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-green-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Eid', url: 'https://www.bahrainnights.com/guides/eid' },
      ]} />

      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium mb-4">🎉 Festival Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">Eid Celebrations</span> in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the joy of Eid in Bahrain — from morning prayers to family feasts, festive events, and joyous celebrations.
            </p>
            <p className="text-sm text-gray-500 mt-4">Last updated: {lastUpdated}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Eids Per Year', value: '2', icon: Calendar },
              { label: 'Holiday Days', value: '3-5', icon: PartyPopper },
              { label: 'Key Value', value: 'Family', icon: Users },
              { label: 'Tradition', value: 'Eidiya', icon: Gift },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-green-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-center">The Two Eids</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {eidInfo.map((eid) => (
              <div key={eid.name} className="bg-white/5 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-400">{eid.name}</h3>
                <p className="text-sm text-gray-400 mb-2">{eid.meaning}</p>
                <p className="text-sm text-gray-300 mb-2"><strong>When:</strong> {eid.when}</p>
                <p className="text-sm text-gray-300 mb-2"><strong>Duration:</strong> {eid.duration}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {eid.traditions.map((t) => (<span key={t} className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">{t}</span>))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Eid Activities</h2>
          <p className="text-gray-400 text-center mb-12">Things to do during Eid in Bahrain.</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((a) => (
              <div key={a.name} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all">
                <h3 className="text-lg font-bold">{a.name}</h3>
                <p className="text-green-400 text-sm mb-2">{a.type} • {a.location}</p>
                <p className="text-gray-300 text-sm mb-2">{a.description}</p>
                <p className="text-xs text-gray-400"><Clock className="w-3 h-3 inline mr-1" />{a.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Eid Dining</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {diningOptions.map((d) => (
              <div key={d.venue} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-green-400">{d.venue}</h3>
                <p className="text-lg font-bold mb-1">{d.price}</p>
                <p className="text-sm text-gray-400">{d.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Eid Tips</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tips.map((tip) => (
              <div key={tip.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-green-400 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-300">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">More Celebrations</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guides/ramadan" className="px-8 py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded-lg transition-colors">Ramadan Guide</Link>
            <Link href="/guides/national-day" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors">National Day</Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Ramadan Guide', href: '/guides/ramadan', emoji: '🌙' },
              { title: 'Family Activities', href: '/guides/family-activities', emoji: '👨‍👩‍👧‍👦' },
              { title: 'Buffets', href: '/guides/buffets', emoji: '🍽️' },
              { title: 'Water Parks', href: '/guides/water-parks', emoji: '🌊' },
            ].map((g) => (
              <Link key={g.href} href={g.href} className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group">
                <span className="text-2xl mb-2 block">{g.emoji}</span>
                <span className="font-medium group-hover:text-green-400 transition-colors">{g.title}</span>
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
              { q: 'When is Eid in 2025?', a: 'Eid Al-Fitr is expected around late March 2025. Eid Al-Adha around early June 2025. Exact dates depend on moon sighting.' },
              { q: 'How long is Eid holiday?', a: 'Eid Al-Fitr is typically 3-4 days, Eid Al-Adha 4-5 days. Government and schools get official holidays.' },
              { q: 'What is Eidiya?', a: 'Cash gifts given to children during Eid, similar to Christmas money. Usually from elder relatives.' },
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
        headline: 'Eid Celebrations in Bahrain 2025',
        description: 'Complete guide to Eid celebrations in Bahrain.',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2025-01-26', dateModified: lastUpdated,
      })}} />
    </div>
  );
}
