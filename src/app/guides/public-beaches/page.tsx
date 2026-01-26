import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Waves, Clock, MapPin, Star,
  Car, Users, Sun, DollarSign
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Public Beaches in Bahrain 2026 | Free Beaches & Swimming Spots',
  description: 'Discover free public beaches in Bahrain! Complete guide to Marassi Beach, Al Jazayer, Karbabad Beach, and the best free swimming spots with facilities info.',
  keywords: 'public beaches Bahrain, free beaches Bahrain, Marassi Beach, Al Jazayer Beach, swimming Bahrain, beach access Bahrain, best beaches Manama',
  openGraph: {
    title: 'Public Beaches in Bahrain 2026 | Free Beaches & Swimming Spots',
    description: 'Your guide to free public beaches in Bahrain.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/public-beaches',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/public-beaches',
  },
};

const beaches = [
  {
    name: 'Marassi Beach',
    location: 'Diyar Al Muharraq',
    type: 'Public Beach',
    rating: 5,
    cost: 'Free (parking BD 1-2)',
    description: 'Bahrain\'s most popular public beach with beautiful white sand, clear waters, and good facilities. Recently developed, well-maintained.',
    features: ['Clean sand', 'Clear water', 'Lifeguards', 'Changing rooms', 'Showers', 'Cafes nearby', 'Parking'],
    bestTime: 'Early morning or late afternoon',
    crowd: 'Busy weekends, quiet weekdays',
    water: 'Shallow, calm, good for families',
    tip: 'Arrive early on Fridays. Gets very busy by noon.',
  },
  {
    name: 'Al Jazayer Beach',
    location: 'Al Jazayer (South of Sitra)',
    type: 'Public Beach',
    rating: 4,
    cost: 'Free',
    description: 'Natural beach area popular with locals. Less developed but authentic atmosphere. Rocky in parts.',
    features: ['Natural setting', 'Local vibe', 'BBQ areas', 'Parking'],
    bestTime: 'Morning or sunset',
    crowd: 'Local families, less touristy',
    water: 'Varies - some rocky areas, some sandy',
    tip: 'Bring your own supplies. Limited facilities.',
  },
  {
    name: 'Karbabad Beach',
    location: 'Karbabad',
    type: 'Public Beach',
    rating: 4,
    cost: 'Free',
    description: 'Traditional fishing village beach near Bahrain Fort. Great for sunset views and authentic local experience.',
    features: ['Near Bahrain Fort', 'Traditional boats', 'Sunset views', 'Local cafes'],
    bestTime: 'Sunset',
    crowd: 'Locals, photographers',
    water: 'Good for wading, shallow',
    tip: 'Combine with Bahrain Fort visit. Perfect sunset location.',
  },
  {
    name: 'Asry Beach',
    location: 'Hidd',
    type: 'Public Beach',
    rating: 3,
    cost: 'Free',
    description: 'Quiet beach area near Asry shipyard. Less crowded but basic facilities.',
    features: ['Quiet', 'Less crowded', 'Parking'],
    bestTime: 'Morning',
    crowd: 'Very quiet, locals only',
    water: 'Shallow, calm',
    tip: 'Good for peaceful morning walks.',
  },
  {
    name: 'Budaiya Beach',
    location: 'Budaiya',
    type: 'Coastal Area',
    rating: 3,
    cost: 'Free',
    description: 'Coastal road with beach access points. Popular for fishing and evening walks.',
    features: ['Coastal access', 'Fishing spots', 'Evening walks', 'Restaurants nearby'],
    bestTime: 'Evening',
    crowd: 'Fishermen, walkers',
    water: 'Rocky in parts',
    tip: 'More for walks than swimming. Nice coastal drive.',
  },
];

const comparisonChart = [
  { beach: 'Marassi', swimming: '⭐⭐⭐⭐⭐', facilities: '⭐⭐⭐⭐⭐', crowds: 'High', family: 'Best' },
  { beach: 'Al Jazayer', swimming: '⭐⭐⭐', facilities: '⭐⭐', crowds: 'Medium', family: 'Good' },
  { beach: 'Karbabad', swimming: '⭐⭐⭐', facilities: '⭐⭐', crowds: 'Low', family: 'OK' },
  { beach: 'Asry', swimming: '⭐⭐⭐', facilities: '⭐', crowds: 'Low', family: 'Basic' },
];

const tips = [
  { title: 'Best Season', content: 'October-April for pleasant beach weather. Summer too hot for daytime beach visits.' },
  { title: 'What to Bring', content: 'Sunscreen, umbrella/shade, water, towels. Limited rentals at most beaches.' },
  { title: 'Timing', content: 'Go early morning (7-10am) or late afternoon (4-6pm) to avoid peak heat.' },
  { title: 'Modest Dress', content: 'Regular swimwear OK at beaches. Cover up when leaving beach area.' },
  { title: 'Friday Crowds', content: 'Fridays are busiest day. Arrive early or visit on weekdays instead.' },
  { title: 'Food & Drink', content: 'Bring your own to most beaches. Marassi has nearby cafes.' },
];

export default function PublicBeachesPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-cyan-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Public Beaches', url: 'https://www.bahrainnights.com/guides/public-beaches' },
      ]} />

      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-medium mb-4">🏖️ Beach Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Public Beaches</span> in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              No beach club fee needed! Discover Bahrain's free public beaches — from the popular Marassi to hidden local spots.
            </p>
            <p className="text-sm text-gray-500 mt-4">Last updated: {lastUpdated}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Public Beaches', value: '5+', icon: Waves },
              { label: 'Entry Fee', value: 'Free', icon: DollarSign },
              { label: 'Best Season', value: 'Oct-Apr', icon: Sun },
              { label: 'Best Beach', value: 'Marassi', icon: Star },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-cyan-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Public Beaches</h2>
          <p className="text-gray-400 text-center mb-12">Free beach access in Bahrain.</p>
          
          <div className="space-y-6">
            {beaches.map((b) => (
              <div key={b.name} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold">{b.name}</h3>
                        <p className="text-cyan-400 text-sm flex items-center gap-1">
                          <MapPin className="w-4 h-4" />{b.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex">{[...Array(b.rating)].map((_, i) => (<Star key={i} className="w-4 h-4 text-cyan-400 fill-cyan-400" />))}</div>
                        <span className="text-sm font-bold text-green-400">{b.cost}</span>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4">{b.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {b.features.map((f) => (<span key={f} className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded">{f}</span>))}
                    </div>
                  </div>
                  <div className="lg:w-1/4 space-y-2 text-sm bg-black/20 rounded-xl p-4">
                    <p><strong className="text-gray-400">Best time:</strong> {b.bestTime}</p>
                    <p><strong className="text-gray-400">Crowd level:</strong> {b.crowd}</p>
                    <p><strong className="text-gray-400">Water:</strong> {b.water}</p>
                    <p className="text-cyan-400 italic pt-2">💡 {b.tip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Beach Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-cyan-500/20">
                  <th className="p-3 text-left">Beach</th>
                  <th className="p-3">Swimming</th>
                  <th className="p-3">Facilities</th>
                  <th className="p-3">Crowds</th>
                  <th className="p-3">Family</th>
                </tr>
              </thead>
              <tbody>
                {comparisonChart.map((r, i) => (
                  <tr key={r.beach} className={i % 2 === 0 ? 'bg-white/5' : ''}>
                    <td className="p-3 font-medium text-cyan-400">{r.beach}</td>
                    <td className="p-3 text-center">{r.swimming}</td>
                    <td className="p-3 text-center">{r.facilities}</td>
                    <td className="p-3 text-center">{r.crowds}</td>
                    <td className="p-3 text-center">{r.family}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Beach Tips</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tips.map((tip) => (
              <div key={tip.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-cyan-400 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-300">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Want More Facilities?</h2>
          <p className="text-gray-300 mb-8">Beach clubs offer pools, restaurants, and better facilities for a fee.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guides/beach-clubs" className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg transition-colors">Beach Clubs</Link>
            <Link href="/guides/outdoor-activities" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors">Outdoor Activities</Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Beach Clubs', href: '/guides/beach-clubs', emoji: '🏖️' },
              { title: 'Budget Guide', href: '/guides/budget', emoji: '💰' },
              { title: 'Free Things', href: '/guides/free-things-to-do', emoji: '🆓' },
              { title: 'Family Fun', href: '/guides/family-activities', emoji: '👨‍👩‍👧‍👦' },
            ].map((g) => (
              <Link key={g.href} href={g.href} className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group">
                <span className="text-2xl mb-2 block">{g.emoji}</span>
                <span className="font-medium group-hover:text-cyan-400 transition-colors">{g.title}</span>
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
              { q: 'What is the best public beach in Bahrain?', a: 'Marassi Beach in Diyar Al Muharraq is the best — clean, well-maintained, with facilities and lifeguards.' },
              { q: 'Are public beaches free in Bahrain?', a: 'Yes! Entry is free. Some have paid parking (BD 1-2). Bring your own supplies as rentals are limited.' },
              { q: 'Is it safe to swim at public beaches?', a: 'Yes, especially at Marassi which has lifeguards. Always check conditions and swim in designated areas.' },
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
        headline: 'Public Beaches in Bahrain 2026',
        description: 'Complete guide to free public beaches in Bahrain.',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2026-01-26', dateModified: lastUpdated,
      })}} />
    </div>
  );
}
