import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Moon, Clock, MapPin, Star,
  Calendar, Heart, Users, Utensils
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Ramadan in Bahrain 2026 | Iftar, Traditions & Visitor Guide',
  description: 'Complete guide to Ramadan in Bahrain! Best iftar venues, cultural experiences, traditions, mosque visits, and tips for visitors during the holy month.',
  keywords: 'Ramadan Bahrain, iftar Bahrain, Ramadan 2026, Bahrain Ramadan guide, iftar tents Bahrain, Ramadan traditions Bahrain, visiting Bahrain Ramadan',
  openGraph: {
    title: 'Ramadan in Bahrain 2026 | Iftar, Traditions & Visitor Guide',
    description: 'Your guide to experiencing Ramadan in Bahrain.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/ramadan',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/ramadan',
  },
};

const iftarVenues = [
  {
    name: 'Four Seasons Bahrain Bay',
    location: 'Bahrain Bay',
    type: 'Luxury Hotel',
    price: 'BD 40-60 per person',
    description: 'Lavish iftar spread with stunning bay views. Premium Arabic and international cuisine in elegant setting.',
    highlights: ['Bay views', 'Live cooking', 'Oud music', 'Premium spread'],
  },
  {
    name: 'Ritz-Carlton Ramadan Tent',
    location: 'Seef',
    type: 'Traditional Tent',
    price: 'BD 35-50 per person',
    description: 'Beautiful Ramadan tent with traditional atmosphere, live entertainment, and extensive Arabic buffet.',
    highlights: ['Traditional tent', 'Live Arabic music', 'Shisha after iftar', 'Family-friendly'],
  },
  {
    name: 'Gulf Hotel Iftar',
    location: 'Adliya',
    type: 'Hotel Buffet',
    price: 'BD 25-35 per person',
    description: 'Long-established iftar destination with excellent Arabic food from Zahle restaurant expertise.',
    highlights: ['Zahle quality', 'Good value', 'Central location', 'Large capacity'],
  },
  {
    name: 'Al Waha Tent',
    location: 'Various locations',
    type: 'Traditional Tent',
    price: 'BD 15-25 per person',
    description: 'Traditional Ramadan tent experience with authentic atmosphere and good value iftar.',
    highlights: ['Authentic atmosphere', 'Budget-friendly', 'Traditional food', 'Shisha'],
  },
  {
    name: 'Reef Resort',
    location: 'Bahrain Bay',
    type: 'Waterfront',
    price: 'BD 20-30 per person',
    description: 'Waterfront iftar setting with fresh seafood options and pleasant evening breeze.',
    highlights: ['Waterfront', 'Seafood options', 'Family setting', 'Outdoor area'],
  },
];

const traditions = [
  { name: 'Fasting (Sawm)', description: 'Muslims fast from dawn to sunset — no food, drink, or smoking during daylight hours.' },
  { name: 'Iftar', description: 'The sunset meal breaking the fast. Usually starts with dates and water, then a full meal.' },
  { name: 'Suhoor', description: 'Pre-dawn meal before fasting begins. Many restaurants serve until 3-4 AM.' },
  { name: 'Taraweeh', description: 'Special night prayers held at mosques after iftar throughout Ramadan.' },
  { name: 'Charity (Zakat)', description: 'Giving to those in need is especially emphasized during Ramadan.' },
  { name: 'Gergaoun', description: 'Mid-Ramadan celebration for children who go door-to-door collecting sweets.' },
];

const visitorTips = [
  {
    title: 'Eating & Drinking',
    content: 'Eating, drinking, and smoking in public during daylight is prohibited. Hotels may serve discreetly in designated areas.',
  },
  {
    title: 'Dress Code',
    content: 'Dress more conservatively than usual. Cover shoulders and knees. Avoid tight or revealing clothing.',
  },
  {
    title: 'Working Hours',
    content: 'Offices work reduced hours (often 9AM-2PM). Shops open late (after iftar) and stay open until late night.',
  },
  {
    title: 'Traffic',
    content: 'Roads are quiet during the day but very busy around iftar time (sunset). Plan accordingly.',
  },
  {
    title: 'Experience Iftar',
    content: 'Join an iftar meal — it\'s a wonderful cultural experience. Hotels and tents welcome non-Muslims.',
  },
  {
    title: 'Respect',
    content: 'Be respectful of those fasting. Avoid playing loud music in public or obvious eating/drinking.',
  },
];

const whatToDo = [
  { activity: 'Attend an iftar', description: 'Experience the communal meal breaking the fast at hotels or tents' },
  { activity: 'Visit Al Fateh Mosque', description: 'Join or observe evening prayers at the Grand Mosque' },
  { activity: 'Explore souks at night', description: 'Traditional markets come alive after iftar' },
  { activity: 'Enjoy suhoor culture', description: 'Late-night dining and cafes are bustling until dawn' },
  { activity: 'Witness Gergaoun', description: 'Children\'s celebration mid-Ramadan (around day 15)' },
  { activity: 'Charity activities', description: 'Many volunteer opportunities during the holy month' },
];

export default function RamadanPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Ramadan', url: 'https://www.bahrainnights.com/guides/ramadan' },
      ]} />

      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium mb-4">🌙 Cultural Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">Ramadan</span> in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the holy month in Bahrain — from lavish iftar feasts to spiritual traditions, cultural celebrations, and visitor guidance.
            </p>
            <p className="text-sm text-gray-500 mt-4">Last updated: {lastUpdated} • Dates vary annually based on moon sighting</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Duration', value: '29-30 days', icon: Calendar },
              { label: 'Iftar Time', value: 'Sunset', icon: Moon },
              { label: 'Iftar Venues', value: '50+', icon: Utensils },
              { label: 'Key Value', value: 'Community', icon: Heart },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-center">Ramadan Traditions</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {traditions.map((t) => (
              <div key={t.name} className="bg-white/5 rounded-xl p-4">
                <h3 className="font-semibold text-purple-400 text-sm">{t.name}</h3>
                <p className="text-xs text-gray-400">{t.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Best Iftar Venues</h2>
          <p className="text-gray-400 text-center mb-12">Top spots to break your fast.</p>
          
          <div className="space-y-6">
            {iftarVenues.map((venue) => (
              <div key={venue.name} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{venue.name}</h3>
                    <p className="text-purple-400 text-sm flex items-center gap-1 mb-2">
                      <MapPin className="w-4 h-4" />{venue.location} • {venue.type}
                    </p>
                    <p className="text-gray-300 mb-4">{venue.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {venue.highlights.map((h) => (<span key={h} className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">{h}</span>))}
                    </div>
                  </div>
                  <div className="lg:w-1/4 text-right">
                    <span className="text-lg font-bold text-white">{venue.price}</span>
                    <p className="text-sm text-gray-400">per person</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">What to Do During Ramadan</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {whatToDo.map((item) => (
              <div key={item.activity} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-purple-400 mb-2">{item.activity}</h3>
                <p className="text-sm text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Tips for Visitors</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visitorTips.map((tip) => (
              <div key={tip.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-purple-400 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-300">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-purple-500/20 to-indigo-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">More Cultural Guides</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guides/eid" className="px-8 py-3 bg-purple-500 hover:bg-purple-400 text-black font-bold rounded-lg transition-colors">Eid Celebrations</Link>
            <Link href="/guides/historical-sites" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors">Historical Sites</Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Eid Guide', href: '/guides/eid', emoji: '🎉' },
              { title: 'Arabic Food', href: '/guides/arabic-restaurants', emoji: '🥙' },
              { title: 'Mosques', href: '/guides/historical-sites', emoji: '🕌' },
              { title: 'Buffets', href: '/guides/buffets', emoji: '🍽️' },
            ].map((g) => (
              <Link key={g.href} href={g.href} className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group">
                <span className="text-2xl mb-2 block">{g.emoji}</span>
                <span className="font-medium group-hover:text-purple-400 transition-colors">{g.title}</span>
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
              { q: 'Can non-Muslims eat during Ramadan in Bahrain?', a: 'Yes, but not in public. Hotels serve meals discreetly in designated areas. Eating, drinking, and smoking in public during daylight hours is prohibited.' },
              { q: 'When is Ramadan 2026?', a: 'Ramadan 2026 is expected to begin around February 28 - March 1, depending on moon sighting. Dates are confirmed closer to the time.' },
              { q: 'Can tourists visit Bahrain during Ramadan?', a: 'Absolutely! It\'s a unique cultural experience. Just be respectful of local customs and fasting hours.' },
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
        headline: 'Ramadan in Bahrain 2026',
        description: 'Complete guide to Ramadan in Bahrain including iftar venues and visitor tips.',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2026-01-26', dateModified: lastUpdated,
      })}} />
    </div>
  );
}
