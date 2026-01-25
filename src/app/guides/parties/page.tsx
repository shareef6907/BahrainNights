import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Music, PartyPopper, Sparkles, Clock, MapPin, Star,
  ArrowRight, Users, Wine, Zap, Calendar, Volume2
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Best Parties in Bahrain 2026 | Nightclubs, Events & Party Guide',
  description: 'Find the best parties in Bahrain! Complete guide to nightclubs, themed nights, ladies nights, pool parties, and the hottest events. Where to party in Manama, Juffair & Adliya.',
  keywords: 'parties in Bahrain, best parties Bahrain, Bahrain nightclubs, Bahrain party scene, where to party Bahrain, Juffair clubs, Bahrain events, party events Bahrain',
  openGraph: {
    title: 'Best Parties in Bahrain 2026 | Nightclubs, Events & Party Guide',
    description: 'Your ultimate guide to the best parties in Bahrain - nightclubs, events, ladies nights, and more.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/parties',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/parties',
  },
};

const partyVenues = [
  {
    name: 'CK\'s',
    area: 'Juffair',
    type: 'Nightclub',
    vibe: 'Iconic Bahrain party institution',
    musicStyle: 'Mixed - Hip Hop, Top 40, Arabic',
    bestNights: 'Thursday, Friday',
    price: '$$',
    highlights: ['Legendary spot', 'Multiple floors', 'Late night crowds', 'Expat favorite'],
  },
  {
    name: 'Club D',
    area: 'Juffair',
    type: 'Nightclub',
    vibe: 'High-energy dance club',
    musicStyle: 'Electronic, House, R&B',
    bestNights: 'Thursday, Friday',
    price: '$$',
    highlights: ['Great sound system', 'International DJs', 'Themed nights'],
  },
  {
    name: 'Coral Bay Beach Club',
    area: 'Amwaj',
    type: 'Beach Club',
    vibe: 'Day-to-night beach parties',
    musicStyle: 'House, Deep House, Chill',
    bestNights: 'Friday (day), Saturday',
    price: '$$$',
    highlights: ['Pool parties', 'Beach setting', 'Sunset sessions', 'Brunch parties'],
  },
  {
    name: 'Gulf Hotel Venues',
    area: 'Adliya',
    type: 'Hotel Complex',
    vibe: 'Multiple venues for different moods',
    musicStyle: 'Various - Rock, Jazz, Pop, Arabic',
    bestNights: 'Thursday, Friday',
    price: '$$-$$$',
    highlights: ['Typhoon bar', 'Sherlock Holmes', 'Lanterns', 'Al Waha tent'],
  },
  {
    name: 'JJ\'s Irish Pub',
    area: 'Adliya',
    type: 'Pub/Live Music',
    vibe: 'Live bands and party atmosphere',
    musicStyle: 'Rock, Pop covers, Live music',
    bestNights: 'Thursday, Friday, Saturday',
    price: '$$',
    highlights: ['Live bands', 'Casual vibe', 'Late night', 'Big screen sports'],
  },
  {
    name: 'Four Seasons Bahrain Bay',
    area: 'Bahrain Bay',
    type: 'Luxury Venue',
    vibe: 'Upscale parties and events',
    musicStyle: 'House, Electronic, International DJs',
    bestNights: 'Friday',
    price: '$$$',
    highlights: ['Pool parties', 'Special events', 'Premium service', 'Celebrity DJs'],
  },
];

const partyTypes = [
  {
    type: 'Ladies Nights',
    icon: Sparkles,
    description: 'Free entry and free drinks for ladies, typically Tuesday-Wednesday',
    bestVenues: ['CK\'s', 'Club D', 'Coral Bay', 'Hotel lounges'],
    tips: 'Arrive early (9-10 PM) for best deals. Some venues require dress code.',
  },
  {
    type: 'Pool/Beach Parties',
    icon: PartyPopper,
    description: 'Day parties with pools, DJs, and beach vibes',
    bestVenues: ['Coral Bay', 'Four Seasons', 'Lost Paradise', 'Sofitel'],
    tips: 'Best during cooler months (Oct-Apr). Book ahead for popular ones.',
  },
  {
    type: 'Themed Nights',
    icon: Zap,
    description: '80s, 90s, Latin, R&B, and special occasion parties',
    bestVenues: ['Gulf Hotel', 'CK\'s', 'Club D', 'Various rotating venues'],
    tips: 'Check social media for weekly themes. Halloween and NYE are huge.',
  },
  {
    type: 'Live Music Parties',
    icon: Volume2,
    description: 'Live bands and performances in party atmospheres',
    bestVenues: ['JJ\'s', 'Sherlock Holmes', 'Lanterns', 'Hotel venues'],
    tips: 'Filipino cover bands are legendary. Most perform 9 PM-1 AM.',
  },
];

const weeklyCalendar = [
  {
    day: 'Monday',
    vibe: '😴 Recovery day',
    events: 'Most clubs closed or quiet. Some hotel bars open.',
  },
  {
    day: 'Tuesday',
    vibe: '👯‍♀️ Ladies night',
    events: 'Ladies nights start. Some venues offer free drinks for women.',
  },
  {
    day: 'Wednesday',
    vibe: '👯‍♀️ Ladies night continues',
    events: 'More ladies night options. Building up to the weekend.',
  },
  {
    day: 'Thursday',
    vibe: '🔥 Weekend starts!',
    events: 'THE big night out. All major clubs packed. Book tables in advance.',
  },
  {
    day: 'Friday',
    vibe: '🎉 Day & night parties',
    events: 'Pool parties during day, clubs at night. Brunch parties popular.',
  },
  {
    day: 'Saturday',
    vibe: '🍻 Casual vibes',
    events: 'More relaxed than Thursday. Live music venues, rooftop bars.',
  },
  {
    day: 'Sunday',
    vibe: '🌅 Wind down',
    events: 'Early closures. Hotel bars and lounges for a quiet drink.',
  },
];

const partyTips = [
  {
    title: 'Timing',
    content: 'Bahrain parties start late. Clubs don\'t fill up until 11 PM-12 AM. Peak time is 1-3 AM.',
  },
  {
    title: 'Dress Code',
    content: 'Smart casual minimum. No shorts/sandals for men at clubs. Ladies have more flexibility.',
  },
  {
    title: 'Reservations',
    content: 'Book tables for Thursday nights, especially at popular clubs. Groups of 4+ should reserve.',
  },
  {
    title: 'Transport',
    content: 'Use Uber/Careem. Absolutely no drinking and driving - penalties are severe in Bahrain.',
  },
  {
    title: 'Budget',
    content: 'Expect BD 3-8 per drink at clubs. Entry is usually free before midnight, BD 5-10 after.',
  },
  {
    title: 'Networking',
    content: 'Bahrain\'s party scene is social. It\'s common to meet people and join groups.',
  },
];

const upcomingParties = [
  {
    name: 'Weekly Pool Party',
    venue: 'Coral Bay',
    day: 'Every Friday',
    type: 'Pool Party',
  },
  {
    name: 'Latin Night',
    venue: 'Various venues',
    day: 'Rotating',
    type: 'Themed',
  },
  {
    name: 'R&B Thursdays',
    venue: 'Multiple clubs',
    day: 'Thursday',
    type: 'Themed',
  },
  {
    name: 'Ladies Night Special',
    venue: 'CK\'s & Club D',
    day: 'Tuesday-Wednesday',
    type: 'Ladies Night',
  },
];

export default function PartiesGuidePage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Parties', url: 'https://www.bahrainnights.com/guides/parties' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-pink-500/20 text-pink-400 rounded-full text-sm font-medium mb-4">
              🎉 Party Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best{' '}
              <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                Parties
              </span>
              {' '}in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Bahrain has the most vibrant nightlife in the Gulf. From legendary nightclubs to 
              beach parties and ladies nights — find out where to party tonight.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Nightclubs', value: '25+', icon: Music },
              { label: 'Hotel Bars', value: '40+', icon: Wine },
              { label: 'Beach Clubs', value: '8+', icon: PartyPopper },
              { label: 'Events/Week', value: '50+', icon: Calendar },
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

      {/* Weekly Calendar */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Weekly Party Calendar</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
            {weeklyCalendar.map((day) => (
              <div 
                key={day.day}
                className={`bg-white/5 rounded-xl p-4 ${
                  day.day === 'Thursday' ? 'ring-2 ring-pink-500' : ''
                }`}
              >
                <div className="text-lg font-bold mb-1">{day.day}</div>
                <div className="text-2xl mb-2">{day.vibe.split(' ')[0]}</div>
                <p className="text-xs text-gray-400">{day.events}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-pink-400 mt-4 text-sm">
            ⭐ Thursday is the main party night (weekend starts Friday in Bahrain)
          </p>
        </div>
      </section>

      {/* Top Party Venues */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Top Party Venues</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            The best spots to party in Bahrain, from legendary clubs to beach parties.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partyVenues.map((venue) => (
              <div 
                key={venue.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold">{venue.name}</h3>
                    <p className="text-pink-400 text-sm">{venue.area} • {venue.type}</p>
                  </div>
                  <span className="text-xs bg-white/10 px-2 py-1 rounded">{venue.price}</span>
                </div>
                
                <p className="text-gray-300 text-sm mb-4">{venue.vibe}</p>
                
                <div className="space-y-2 text-sm mb-4">
                  <p><strong className="text-gray-400">Music:</strong> {venue.musicStyle}</p>
                  <p><strong className="text-gray-400">Best nights:</strong> {venue.bestNights}</p>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {venue.highlights.map((h) => (
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

      {/* Party Types */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Types of Parties</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {partyTypes.map((party) => (
              <div key={party.type} className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-pink-500/20 rounded-lg">
                    <party.icon className="w-6 h-6 text-pink-400" />
                  </div>
                  <h3 className="text-xl font-bold">{party.type}</h3>
                </div>
                <p className="text-gray-300 mb-4">{party.description}</p>
                <p className="text-sm mb-2">
                  <strong className="text-pink-400">Best venues:</strong> {party.bestVenues.join(', ')}
                </p>
                <p className="text-xs text-gray-400 italic">💡 {party.tips}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Party Tips */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Party Tips</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {partyTips.map((tip) => (
              <div key={tip.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-pink-400 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-300">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regular Events */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Regular Party Events</h2>
          
          <div className="grid md:grid-cols-4 gap-4">
            {upcomingParties.map((party) => (
              <div key={party.name} className="bg-white/5 rounded-xl p-5 text-center">
                <span className="text-xs bg-pink-500/20 text-pink-400 px-2 py-1 rounded mb-2 inline-block">
                  {party.type}
                </span>
                <h3 className="font-bold mb-1">{party.name}</h3>
                <p className="text-sm text-gray-400">{party.venue}</p>
                <p className="text-xs text-gray-500">{party.day}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Party?</h2>
          <p className="text-gray-300 mb-8">
            Check out what&apos;s happening tonight and find the best parties in Bahrain.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/events"
              className="px-8 py-3 bg-pink-500 hover:bg-pink-400 text-white font-bold rounded-lg transition-colors"
            >
              Tonight&apos;s Events
            </Link>
            <Link 
              href="/guides/nightlife"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              Full Nightlife Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Nightlife Guide', href: '/guides/nightlife', emoji: '🌙' },
              { title: 'Ladies Nights', href: '/guides/ladies-nights', emoji: '💃' },
              { title: 'Beach Clubs', href: '/guides/beach-clubs', emoji: '🏖️' },
              { title: 'Best Brunches', href: '/guides/brunches', emoji: '🥂' },
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
                q: 'What is the best night to party in Bahrain?',
                a: 'Thursday is the main party night in Bahrain since the weekend starts on Friday. Clubs are busiest from 11 PM to 3 AM. Friday nights are also popular, especially for pool parties during the day.',
              },
              {
                q: 'What time do clubs open in Bahrain?',
                a: 'Most clubs open around 9-10 PM but don\'t get busy until 11 PM-midnight. Peak hours are 1-3 AM. Some venues stay open until 4 AM on weekends.',
              },
              {
                q: 'Is there a dress code for Bahrain clubs?',
                a: 'Yes, smart casual is the minimum. Men should avoid shorts and sandals. Collared shirts are recommended. Women have more flexibility but most dress up for nightclubs.',
              },
              {
                q: 'Where can I find ladies nights in Bahrain?',
                a: 'Ladies nights are typically on Tuesday and Wednesday at major clubs like CK\'s and Club D, as well as many hotel bars. Ladies often get free entry and complimentary drinks.',
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
            headline: 'Best Parties in Bahrain 2026',
            description: 'Complete guide to the best parties in Bahrain including nightclubs, ladies nights, pool parties, and themed events.',
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
              '@id': 'https://bahrainnights.com/guides/parties',
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
                name: 'What is the best night to party in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Thursday is the main party night in Bahrain since the weekend starts on Friday. Clubs are busiest from 11 PM to 3 AM.',
                },
              },
              {
                '@type': 'Question',
                name: 'What time do clubs open in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Most clubs open around 9-10 PM but don\'t get busy until 11 PM-midnight. Peak hours are 1-3 AM.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is there a dress code for Bahrain clubs?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, smart casual is the minimum. Men should avoid shorts and sandals. Collared shirts are recommended.',
                },
              },
              {
                '@type': 'Question',
                name: 'Where can I find ladies nights in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Ladies nights are typically on Tuesday and Wednesday at major clubs like CK\'s and Club D, as well as many hotel bars.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
