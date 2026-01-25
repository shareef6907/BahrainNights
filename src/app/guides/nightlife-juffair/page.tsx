import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Music, Moon, Wine, MapPin, Clock, Star,
  ArrowRight, Users, Sparkles, Volume2
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Juffair Nightlife Guide 2026 | Best Clubs & Bars in Juffair Bahrain',
  description: 'Complete guide to Juffair nightlife in Bahrain. Discover the best nightclubs, bars, and late-night spots in Juffair. CK\'s, Club D, and more party venues.',
  keywords: 'Juffair nightlife, Juffair clubs, Juffair bars, nightlife Juffair Bahrain, CKs Juffair, Club D Juffair, where to party Juffair',
  openGraph: {
    title: 'Juffair Nightlife Guide 2026 | Best Clubs & Bars in Juffair Bahrain',
    description: 'Your guide to the best nightclubs and bars in Juffair, Bahrain.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/nightlife-juffair',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/nightlife-juffair',
  },
};

const juffairVenues = [
  {
    name: 'CK\'s',
    type: 'Nightclub',
    description: 'Bahrain\'s most iconic nightclub. Multiple floors, great sound system, and legendary parties.',
    music: 'Hip Hop, R&B, Top 40, Arabic',
    bestNights: 'Thursday, Friday',
    hours: '10 PM - 3 AM',
    priceRange: '$$',
    features: ['Multiple levels', 'VIP tables', 'Ladies nights Tue/Wed', 'Expat favorite'],
    tip: 'Arrive before midnight to avoid queues. Book a table for groups.',
  },
  {
    name: 'Club D',
    type: 'Nightclub',
    description: 'High-energy dance club known for great music and international DJs.',
    music: 'House, Electronic, R&B',
    bestNights: 'Thursday, Friday, Saturday',
    hours: '10 PM - 3 AM',
    priceRange: '$$',
    features: ['Great sound system', 'Themed nights', 'Ladies nights', 'Dance floor'],
    tip: 'Good for dancing. Check their social media for theme nights.',
  },
  {
    name: 'Aloft Rooftop',
    type: 'Rooftop Bar',
    description: 'Trendy rooftop bar at Aloft Hotel with city views and cocktails.',
    music: 'Lounge, House',
    bestNights: 'Thursday-Saturday',
    hours: '6 PM - 2 AM',
    priceRange: '$$-$$$',
    features: ['Rooftop views', 'Cocktails', 'Sunset spot', 'Casual dress'],
    tip: 'Great for pre-club drinks or relaxed evening.',
  },
  {
    name: 'Hotel Bars (Various)',
    type: 'Hotel Venues',
    description: 'Multiple hotels in Juffair with bars and lounges.',
    music: 'Various',
    bestNights: 'Daily',
    hours: 'Varies',
    priceRange: '$$',
    features: ['Safe environment', 'Good service', 'International crowd'],
    tip: 'Check each hotel for their specific offerings and events.',
  },
];

const weeklySchedule = [
  { day: 'Monday', status: 'quiet', note: 'Most clubs closed or quiet' },
  { day: 'Tuesday', status: 'ladies', note: 'Ladies night at CK\'s and Club D' },
  { day: 'Wednesday', status: 'ladies', note: 'Ladies night continues' },
  { day: 'Thursday', status: 'peak', note: '🔥 Main party night - packed!' },
  { day: 'Friday', status: 'busy', note: 'Great night out, slightly less packed' },
  { day: 'Saturday', status: 'busy', note: 'Good for dancing' },
  { day: 'Sunday', status: 'quiet', note: 'Limited options' },
];

const tips = [
  { title: 'Getting There', content: 'Juffair is central and easy to reach by taxi or Uber/Careem. Most venues are within walking distance of each other.' },
  { title: 'Dress Code', content: 'Smart casual for most venues. No shorts or sandals for men. Ladies dress up.' },
  { title: 'Timing', content: 'Clubs don\'t fill up until 11 PM-midnight. Peak hours are 1-3 AM.' },
  { title: 'Safety', content: 'Juffair is safe but arrange transport home. Never drink and drive.' },
];

export default function JuffairNightlifePage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Nightlife', url: 'https://www.bahrainnights.com/guides/nightlife' },
          { name: 'Juffair', url: 'https://www.bahrainnights.com/guides/nightlife-juffair' },
        ]}
      />

      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium mb-4">
              🌙 Area Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Juffair
              </span>
              {' '}Nightlife
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Juffair is Bahrain&apos;s party hub — home to legendary nightclubs like CK&apos;s 
              and Club D. Here&apos;s your complete guide to nightlife in Juffair.
            </p>
            <p className="text-sm text-gray-500 mt-4">Last updated: {lastUpdated}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Clubs', value: '5+', icon: Music },
              { label: 'Bars', value: '15+', icon: Wine },
              { label: 'Best Night', value: 'Thursday', icon: Star },
              { label: 'Peak Hours', value: '1-3 AM', icon: Clock },
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

      {/* Weekly Calendar */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Weekly Schedule</h2>
          <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
            {weeklySchedule.map((day) => (
              <div 
                key={day.day}
                className={`bg-white/5 rounded-xl p-4 ${
                  day.status === 'peak' ? 'ring-2 ring-purple-500' :
                  day.status === 'ladies' ? 'ring-1 ring-pink-500' : ''
                }`}
              >
                <div className="font-bold mb-1">{day.day}</div>
                <p className="text-xs text-gray-400">{day.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venues */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Top Juffair Venues</h2>
          
          <div className="space-y-6">
            {juffairVenues.map((venue) => (
              <div key={venue.name} className="bg-white/5 rounded-2xl p-6">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{venue.name}</h3>
                      <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">
                        {venue.type}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-3">{venue.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm mb-3">
                      <p><strong className="text-gray-400">Music:</strong> {venue.music}</p>
                      <p><strong className="text-gray-400">Best:</strong> {venue.bestNights}</p>
                      <p><strong className="text-gray-400">Hours:</strong> {venue.hours}</p>
                      <p><strong className="text-gray-400">Price:</strong> {venue.priceRange}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {venue.features.map((f) => (
                        <span key={f} className="text-xs bg-white/10 px-2 py-1 rounded">{f}</span>
                      ))}
                    </div>
                    <p className="text-xs text-purple-300 italic">💡 {venue.tip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Tips for Juffair Nightlife</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {tips.map((tip) => (
              <div key={tip.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-purple-400 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-300">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More Areas</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guides/nightlife" className="px-6 py-3 bg-purple-500 hover:bg-purple-400 text-white font-bold rounded-lg">
              Full Nightlife Guide
            </Link>
            <Link href="/guides/parties" className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg">
              Best Parties
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">FAQ</h2>
          <div className="space-y-4">
            {[
              { q: 'What are the best clubs in Juffair?', a: 'CK\'s and Club D are the two main nightclubs. CK\'s is more established and larger, while Club D is known for electronic music.' },
              { q: 'What night is best for Juffair nightlife?', a: 'Thursday is the biggest night. Ladies nights are Tuesday and Wednesday with free drinks for women.' },
              { q: 'Is Juffair safe at night?', a: 'Yes, Juffair is generally safe. Use Uber/Careem for transport. Don\'t drink and drive.' },
            ].map((faq, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6">
                <h3 className="font-bold mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Juffair Nightlife Guide 2026',
        description: 'Complete guide to nightlife in Juffair, Bahrain.',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2026-01-26',
        dateModified: lastUpdated,
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What are the best clubs in Juffair?', acceptedAnswer: { '@type': 'Answer', text: 'CK\'s and Club D are the two main nightclubs in Juffair.' }},
          { '@type': 'Question', name: 'What night is best for Juffair nightlife?', acceptedAnswer: { '@type': 'Answer', text: 'Thursday is the biggest night. Ladies nights are Tuesday and Wednesday.' }},
        ],
      })}} />
    </div>
  );
}
