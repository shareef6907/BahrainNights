import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Music, PartyPopper, Sparkles, Clock, MapPin, Star,
  ArrowRight, Users, Wine, Zap, Calendar, Plane
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Best Parties in Abu Dhabi 2026 | Nightclubs, Events & Party Guide',
  description: 'Find the best parties in Abu Dhabi! Complete guide to Abu Dhabi nightclubs, beach parties, ladies nights, and events. Where to party on Yas Island, Saadiyat & Corniche.',
  keywords: 'parties in Abu Dhabi, Abu Dhabi parties, Abu Dhabi nightclubs, Abu Dhabi nightlife, where to party Abu Dhabi, Yas Island clubs, Abu Dhabi events',
  openGraph: {
    title: 'Best Parties in Abu Dhabi 2026 | Nightclubs, Events & Party Guide',
    description: 'Your guide to the best parties in Abu Dhabi - nightclubs, beach clubs, and events.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/abu-dhabi-parties',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/abu-dhabi-parties',
  },
};

const topVenues = [
  {
    name: 'MAD on Yas Island',
    area: 'Yas Island',
    type: 'Mega Club',
    vibe: 'Abu Dhabi\'s largest nightclub venue',
    music: 'EDM, House, Hip Hop, Arabic',
    bestNights: 'Thursday, Friday',
    price: '$$$',
    highlights: ['Massive capacity', 'International DJs', 'F1 weekend parties', 'Multiple areas'],
  },
  {
    name: 'Annex',
    area: 'Abu Dhabi EDITION',
    type: 'Underground Club',
    vibe: 'Intimate underground vibes',
    music: 'House, Techno, Electronic',
    bestNights: 'Friday, Saturday',
    price: '$$$',
    highlights: ['Cool crowd', 'Music-focused', 'Late nights', 'Boutique hotel setting'],
  },
  {
    name: 'Iris Abu Dhabi',
    area: 'Yas Bay',
    type: 'Lounge & Club',
    vibe: 'Chic waterfront venue',
    music: 'House, Commercial, R&B',
    bestNights: 'Thursday, Friday',
    price: '$$$',
    highlights: ['Waterfront location', 'Yas Bay views', 'Outdoor terrace', 'Sunset sessions'],
  },
  {
    name: 'Saadiyat Beach Club',
    area: 'Saadiyat Island',
    type: 'Beach Club',
    vibe: 'Luxury beachfront parties',
    music: 'House, Chill, Pool party',
    bestNights: 'Friday, Saturday',
    price: '$$$$',
    highlights: ['Pristine beach', 'Pool parties', 'Day-to-night', 'Premium experience'],
  },
  {
    name: 'URBN',
    area: 'Corniche',
    type: 'Rooftop Lounge',
    vibe: 'Stylish rooftop with city views',
    music: 'House, Commercial',
    bestNights: 'Thursday, Friday',
    price: '$$$',
    highlights: ['Corniche views', 'Great cocktails', 'Chic atmosphere', 'Outdoor seating'],
  },
  {
    name: 'Yas Marina Circuit Events',
    area: 'Yas Island',
    type: 'Event Venue',
    vibe: 'Major concerts and F1 after-parties',
    music: 'Varies - major artists',
    bestNights: 'Special events',
    price: '$$$$',
    highlights: ['F1 weekend', 'International headliners', 'Massive crowds', 'Unique setting'],
  },
];

const partyAreas = [
  {
    area: 'Yas Island',
    description: 'Entertainment hub with theme parks, concerts, and Abu Dhabi\'s best nightlife.',
    bestFor: 'Mega clubs, special events, F1 weekend',
    topSpots: ['MAD', 'Yas Marina', 'Iris'],
  },
  {
    area: 'Saadiyat Island',
    description: 'Cultural district with luxury beach clubs and upscale venues.',
    bestFor: 'Beach parties, luxury experience, day clubs',
    topSpots: ['Saadiyat Beach Club', 'Soul Beach', 'Museum events'],
  },
  {
    area: 'Corniche & Downtown',
    description: 'City center with hotel bars, rooftop lounges, and classic nightlife.',
    bestFor: 'Hotel bars, after-work drinks, lounges',
    topSpots: ['URBN', 'Catch Abu Dhabi', 'Hotel rooftops'],
  },
  {
    area: 'Al Maryah Island',
    description: 'Business district with sophisticated bars and dining experiences.',
    bestFor: 'Upscale lounges, business entertainment',
    topSpots: ['Zuma', 'Li Jiang', 'Hakkasan'],
  },
];

const f1Weekend = {
  description: 'Abu Dhabi F1 Grand Prix weekend (November) brings the biggest parties of the year.',
  highlights: [
    'International headline concerts (Post Malone, The Weeknd-level artists)',
    'Yacht parties at Yas Marina',
    'Extended club hours',
    'Celebrity sightings',
    'Global party crowd',
  ],
  tip: 'Book accommodation and concert tickets months in advance - it sells out!',
};

const weeklyGuide = [
  { day: 'Monday', vibe: '😴 Quiet', tip: 'Limited nightlife - some hotel bars' },
  { day: 'Tuesday', vibe: '👯‍♀️ Ladies night', tip: 'Ladies night deals at various venues' },
  { day: 'Wednesday', vibe: '🍷 Building up', tip: 'More ladies nights, lounge vibes' },
  { day: 'Thursday', vibe: '🔥 Big night', tip: 'Weekend starts - clubs get busy' },
  { day: 'Friday', vibe: '🎉 Peak', tip: 'Beach parties, brunch parties, clubs' },
  { day: 'Saturday', vibe: '🎵 Events', tip: 'Special events, day-to-night parties' },
  { day: 'Sunday', vibe: '🌅 Brunches', tip: 'Legendary Abu Dhabi brunches' },
];

export default function AbuDhabiPartiesPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Abu Dhabi Parties', url: 'https://www.bahrainnights.com/guides/abu-dhabi-parties' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium mb-4">
              🇦🇪 Abu Dhabi Party Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Parties
              </span>
              {' '}in Abu Dhabi
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The UAE capital offers a sophisticated party scene. From Yas Island mega clubs 
              to Saadiyat beach parties — discover Abu Dhabi nightlife.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Major Clubs', value: '15+', icon: Music },
              { label: 'Beach Clubs', value: '8+', icon: PartyPopper },
              { label: 'From Bahrain', value: '55 min', icon: Plane },
              { label: 'F1 Weekend', value: 'Nov', icon: Star },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* F1 Weekend Special */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              🏎️ Abu Dhabi F1 Grand Prix Weekend
            </h2>
            <p className="text-gray-300 mb-4">{f1Weekend.description}</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold mb-2 text-orange-400">What to Expect:</h3>
                <ul className="space-y-1 text-sm text-gray-300">
                  {f1Weekend.highlights.map((h, i) => (
                    <li key={i}>• {h}</li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center">
                <p className="text-sm text-orange-300 italic">💡 {f1Weekend.tip}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Guide */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Weekly Party Calendar</h2>
          <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
            {weeklyGuide.map((day) => (
              <div 
                key={day.day}
                className={`bg-white/5 rounded-xl p-4 ${
                  day.day === 'Thursday' || day.day === 'Friday' ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div className="text-lg font-bold mb-1">{day.day}</div>
                <div className="text-2xl mb-2">{day.vibe.split(' ')[0]}</div>
                <p className="text-xs text-gray-400">{day.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Venues */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Top Party Venues</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            The best nightclubs and party spots in Abu Dhabi.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topVenues.map((venue) => (
              <div 
                key={venue.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold">{venue.name}</h3>
                    <p className="text-blue-400 text-sm">{venue.area} • {venue.type}</p>
                  </div>
                  <span className="text-xs bg-white/10 px-2 py-1 rounded">{venue.price}</span>
                </div>
                
                <p className="text-gray-300 text-sm mb-4">{venue.vibe}</p>
                
                <div className="space-y-2 text-sm mb-4">
                  <p><strong className="text-gray-400">Music:</strong> {venue.music}</p>
                  <p><strong className="text-gray-400">Best nights:</strong> {venue.bestNights}</p>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {venue.highlights.map((h) => (
                    <span key={h} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Party Areas */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Party Districts</h2>
          
          <div className="space-y-6">
            {partyAreas.map((area) => (
              <div key={area.area} className="bg-white/5 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-blue-400 mb-2">{area.area}</h3>
                <p className="text-gray-300 mb-3">{area.description}</p>
                <p className="text-sm text-gray-400 mb-2">
                  <strong>Best for:</strong> {area.bestFor}
                </p>
                <p className="text-sm text-blue-300">
                  <strong>Top spots:</strong> {area.topSpots.join(' • ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting There */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <Plane className="inline w-8 h-8 mr-2 text-blue-400" />
            Getting to Abu Dhabi
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="font-bold mb-4 text-blue-400">From Bahrain</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>✈️ 55 minutes flight from Bahrain International</li>
                <li>📅 Multiple daily flights (Gulf Air, Etihad)</li>
                <li>💡 Can combine with Dubai (1.5 hour drive between)</li>
              </ul>
            </div>
            
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="font-bold mb-4 text-blue-400">Getting Around</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Taxi and Careem widely available</li>
                <li>• Yas Island is 30 min from city center</li>
                <li>• Most nightlife concentrated in key areas</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More Destinations</h2>
          <p className="text-gray-300 mb-8">
            Check out parties and events across the region.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/regional"
              className="px-8 py-3 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-lg transition-colors"
            >
              Regional Events
            </Link>
            <Link 
              href="/guides/dubai-parties"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              Dubai Parties
            </Link>
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">More Regional Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Dubai Parties', href: '/guides/dubai-parties', emoji: '🇦🇪' },
              { title: 'Qatar Events', href: '/guides/qatar-parties', emoji: '🇶🇦' },
              { title: 'UAE Events', href: '/regional/country/uae', emoji: '📅' },
              { title: 'Bahrain Nightlife', href: '/guides/nightlife', emoji: '🌙' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group"
              >
                <span className="text-2xl mb-2 block">{guide.emoji}</span>
                <span className="font-medium group-hover:text-blue-400 transition-colors">
                  {guide.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {[
              {
                q: 'What is the best night to party in Abu Dhabi?',
                a: 'Thursday and Friday are the main party nights. Thursday is when the weekend kicks off, and Friday has great beach and pool parties during the day.',
              },
              {
                q: 'Where are the best clubs in Abu Dhabi?',
                a: 'Yas Island has the biggest clubs like MAD. Saadiyat Island is best for beach clubs. For sophisticated lounges, try Al Maryah Island and the Corniche area.',
              },
              {
                q: 'When is the Abu Dhabi F1 Grand Prix?',
                a: 'The Abu Dhabi F1 Grand Prix is held in November (dates vary). It\'s the biggest party weekend of the year with major international concerts.',
              },
              {
                q: 'Is Abu Dhabi nightlife good?',
                a: 'Yes! While more relaxed than Dubai, Abu Dhabi has excellent nightlife, especially on Yas Island. The scene is slightly more sophisticated and less crowded.',
              },
            ].map((faq, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6">
                <h3 className="font-bold mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Best Parties in Abu Dhabi 2026',
            description: 'Complete guide to the best parties in Abu Dhabi including nightclubs, beach clubs, and F1 weekend events.',
            author: { '@type': 'Organization', name: 'BahrainNights' },
            publisher: { '@type': 'Organization', name: 'BahrainNights' },
            datePublished: '2026-01-26',
            dateModified: lastUpdated,
          }),
        }}
      />
      
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is the best night to party in Abu Dhabi?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Thursday and Friday are the main party nights.',
                },
              },
              {
                '@type': 'Question',
                name: 'When is the Abu Dhabi F1 Grand Prix?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The Abu Dhabi F1 Grand Prix is held in November.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
