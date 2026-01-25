import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Music, PartyPopper, Sparkles, Clock, MapPin, Star,
  ArrowRight, Users, Wine, Zap, Calendar, Plane
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Best Parties in Dubai 2026 | Nightclubs, Events & Party Guide',
  description: 'Find the best parties in Dubai! Complete guide to Dubai nightclubs, beach parties, ladies nights, and the hottest events. Where to party in Dubai Marina, JBR & Downtown.',
  keywords: 'parties in Dubai, best parties Dubai, Dubai nightclubs, Dubai party scene, where to party Dubai, Dubai clubs, Dubai nightlife, Dubai events',
  openGraph: {
    title: 'Best Parties in Dubai 2026 | Nightclubs, Events & Party Guide',
    description: 'Your ultimate guide to the best parties in Dubai - nightclubs, beach clubs, and exclusive events.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/dubai-parties',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/dubai-parties',
  },
};

const topClubs = [
  {
    name: 'WHITE Dubai',
    area: 'Meydan',
    type: 'Mega Club',
    vibe: 'World-famous open-air mega club',
    music: 'EDM, House, Hip Hop',
    bestNights: 'Thursday, Friday, Saturday',
    price: '$$$',
    highlights: ['Open-air rooftop', 'International DJs', 'Stunning views', 'VIP tables'],
  },
  {
    name: 'Soho Garden',
    area: 'Meydan',
    type: 'Garden Club Complex',
    vibe: 'Multi-venue entertainment complex',
    music: 'Various - House, Techno, Hip Hop',
    bestNights: 'Thursday, Friday',
    price: '$$$',
    highlights: ['Multiple venues', 'Different music styles', 'Outdoor setting', 'Food options'],
  },
  {
    name: 'Cavalli Club',
    area: 'Fairmont Hotel',
    type: 'Luxury Nightclub',
    vibe: 'Roberto Cavalli-designed glamour',
    music: 'House, R&B, Commercial',
    bestNights: 'Thursday, Friday',
    price: '$$$$',
    highlights: ['Stunning interior', 'Fine dining', 'Exclusive clientele', 'Fashion-forward'],
  },
  {
    name: 'Billionaire Mansion',
    area: 'Taj Hotel',
    type: 'Entertainment Venue',
    vibe: 'Dinner shows and late-night parties',
    music: 'Live entertainment, DJ sets',
    bestNights: 'Thursday, Friday, Saturday',
    price: '$$$$',
    highlights: ['Dinner shows', 'Celebrity sightings', 'Luxury experience', 'Table service'],
  },
  {
    name: 'Base Dubai',
    area: 'D3',
    type: 'Underground Club',
    vibe: 'Industrial warehouse vibes',
    music: 'Techno, House, Underground',
    bestNights: 'Friday, Saturday',
    price: '$$',
    highlights: ['Authentic club culture', 'International DJs', 'Late nights', 'Music-focused'],
  },
  {
    name: 'Zero Gravity',
    area: 'Skydive Dubai',
    type: 'Beach Club',
    vibe: 'Beach party destination',
    music: 'House, Commercial',
    bestNights: 'Friday, Saturday',
    price: '$$$',
    highlights: ['Beach setting', 'Pool', 'Day-to-night', 'Great for groups'],
  },
];

const partyAreas = [
  {
    area: 'Dubai Marina & JBR',
    description: 'Waterfront area with beach clubs, rooftop bars, and casual nightlife.',
    bestFor: 'Beach parties, casual drinks, sunset sessions',
    topSpots: ['Zero Gravity', 'Barasti', 'Pier 7'],
  },
  {
    area: 'Downtown Dubai',
    description: 'Upscale nightlife near Burj Khalifa with hotel clubs and lounges.',
    bestFor: 'Luxury nightlife, special occasions',
    topSpots: ['Armani/Privé', 'Cavalli Club', 'Billionaire'],
  },
  {
    area: 'Meydan',
    description: 'Home to Dubai\'s mega clubs with massive outdoor venues.',
    bestFor: 'Big nights out, international DJs, mega parties',
    topSpots: ['WHITE Dubai', 'Soho Garden', 'SECRET'],
  },
  {
    area: 'DIFC',
    description: 'Financial district with sophisticated lounges and rooftop bars.',
    bestFor: 'After-work drinks, upscale lounges, cocktails',
    topSpots: ['Zuma', 'La Petite Maison', 'Iris'],
  },
];

const weeklyGuide = [
  { day: 'Monday', vibe: '😴 Quiet', tip: 'Recovery day - some hotel bars open' },
  { day: 'Tuesday', vibe: '👯‍♀️ Ladies night', tip: 'Best ladies night deals across the city' },
  { day: 'Wednesday', vibe: '🍷 Mid-week', tip: 'More ladies nights, lounge vibes' },
  { day: 'Thursday', vibe: '🔥 Weekend starts', tip: 'THE big night - all clubs packed' },
  { day: 'Friday', vibe: '🎉 Day parties', tip: 'Brunch parties, beach clubs, night clubs' },
  { day: 'Saturday', vibe: '🎵 Big events', tip: 'International DJs, special events' },
  { day: 'Sunday', vibe: '🌅 Sunday brunches', tip: 'Famous Dubai Sunday brunches' },
];

const gettingThere = {
  fromBahrain: {
    flight: '45 minutes from Bahrain International Airport',
    frequency: 'Multiple daily flights (Gulf Air, Emirates, flydubai)',
    tip: 'Weekend trips are popular - fly Thursday morning, return Saturday night',
  },
  transportation: [
    'Metro: Clean, cheap, connects major areas',
    'Taxi/Careem/Uber: Readily available, AC comfortable',
    'Never drink and drive - penalties are severe',
  ],
};

export default function DubaiPartiesPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Dubai Parties', url: 'https://www.bahrainnights.com/guides/dubai-parties' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-pink-500/20 text-pink-400 rounded-full text-sm font-medium mb-4">
              🇦🇪 Dubai Party Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best{' '}
              <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                Parties
              </span>
              {' '}in Dubai
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Dubai is the party capital of the Middle East. From mega clubs to beach parties — 
              your complete guide to Dubai nightlife.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Major Clubs', value: '50+', icon: Music },
              { label: 'Beach Clubs', value: '20+', icon: PartyPopper },
              { label: 'From Bahrain', value: '45 min', icon: Plane },
              { label: 'Best Night', value: 'Thursday', icon: Star },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-pink-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Guide */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Weekly Party Calendar</h2>
          <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
            {weeklyGuide.map((day) => (
              <div 
                key={day.day}
                className={`bg-white/5 rounded-xl p-4 ${
                  day.day === 'Thursday' || day.day === 'Friday' ? 'ring-2 ring-pink-500' : ''
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

      {/* Top Clubs */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Top Dubai Clubs</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            The best nightclubs and party venues in Dubai.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topClubs.map((club) => (
              <div 
                key={club.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold">{club.name}</h3>
                    <p className="text-pink-400 text-sm">{club.area} • {club.type}</p>
                  </div>
                  <span className="text-xs bg-white/10 px-2 py-1 rounded">{club.price}</span>
                </div>
                
                <p className="text-gray-300 text-sm mb-4">{club.vibe}</p>
                
                <div className="space-y-2 text-sm mb-4">
                  <p><strong className="text-gray-400">Music:</strong> {club.music}</p>
                  <p><strong className="text-gray-400">Best nights:</strong> {club.bestNights}</p>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {club.highlights.map((h) => (
                    <span key={h} className="text-xs bg-pink-500/20 text-pink-300 px-2 py-1 rounded">
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
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Party Districts</h2>
          
          <div className="space-y-6">
            {partyAreas.map((area) => (
              <div key={area.area} className="bg-white/5 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-pink-400 mb-2">{area.area}</h3>
                <p className="text-gray-300 mb-3">{area.description}</p>
                <p className="text-sm text-gray-400 mb-2">
                  <strong>Best for:</strong> {area.bestFor}
                </p>
                <p className="text-sm text-pink-300">
                  <strong>Top spots:</strong> {area.topSpots.join(' • ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting There from Bahrain */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <Plane className="inline w-8 h-8 mr-2 text-pink-400" />
            Getting to Dubai from Bahrain
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="font-bold mb-4 text-pink-400">Flight Info</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>✈️ {gettingThere.fromBahrain.flight}</li>
                <li>📅 {gettingThere.fromBahrain.frequency}</li>
                <li>💡 {gettingThere.fromBahrain.tip}</li>
              </ul>
            </div>
            
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="font-bold mb-4 text-pink-400">Getting Around Dubai</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                {gettingThere.transportation.map((tip, i) => (
                  <li key={i}>• {tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More Destinations</h2>
          <p className="text-gray-300 mb-8">
            Check out parties and events across the region.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/regional"
              className="px-8 py-3 bg-pink-500 hover:bg-pink-400 text-white font-bold rounded-lg transition-colors"
            >
              Regional Events
            </Link>
            <Link 
              href="/guides/parties"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              Bahrain Parties
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
              { title: 'Abu Dhabi Parties', href: '/guides/abu-dhabi-parties', emoji: '🇦🇪' },
              { title: 'Qatar Events', href: '/guides/qatar-parties', emoji: '🇶🇦' },
              { title: 'Dubai Events', href: '/regional/country/uae', emoji: '📅' },
              { title: 'Bahrain Nightlife', href: '/guides/nightlife', emoji: '🌙' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group"
              >
                <span className="text-2xl mb-2 block">{guide.emoji}</span>
                <span className="font-medium group-hover:text-pink-400 transition-colors">
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
                q: 'What is the best night to party in Dubai?',
                a: 'Thursday is the biggest party night as the UAE weekend starts on Friday. Friday and Saturday are also excellent for beach parties and special events.',
              },
              {
                q: 'What are the best clubs in Dubai?',
                a: 'WHITE Dubai and Soho Garden in Meydan are the mega clubs. For luxury, try Cavalli Club or Billionaire. Base Dubai is great for underground music lovers.',
              },
              {
                q: 'How do I get to Dubai from Bahrain?',
                a: 'Flights take about 45 minutes with multiple daily services from Gulf Air, Emirates, and flydubai. Many Bahrainis do weekend trips for Dubai nightlife.',
              },
              {
                q: 'What is the dress code for Dubai clubs?',
                a: 'Smart casual to dressy. No shorts, flip flops, or sports wear. Upscale venues expect designer or fashionable attire, especially on weekends.',
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
            headline: 'Best Parties in Dubai 2026 | Nightclubs, Events & Party Guide',
            description: 'Complete guide to the best parties in Dubai including nightclubs, beach clubs, and events.',
            author: {
              '@type': 'Organization',
              name: 'BahrainNights',
              url: 'https://bahrainnights.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'BahrainNights',
            },
            datePublished: '2026-01-26',
            dateModified: lastUpdated,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://bahrainnights.com/guides/dubai-parties',
            },
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
                name: 'What is the best night to party in Dubai?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Thursday is the biggest party night as the UAE weekend starts on Friday.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the best clubs in Dubai?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'WHITE Dubai and Soho Garden in Meydan are the mega clubs. For luxury, try Cavalli Club or Billionaire.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do I get to Dubai from Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Flights take about 45 minutes with multiple daily services from Gulf Air, Emirates, and flydubai.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
