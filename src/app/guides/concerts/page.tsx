import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Music, Mic2, Calendar, MapPin, Ticket, Star,
  ArrowRight, Users, Sparkles, Volume2, Radio
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Concerts in Bahrain 2026 | Live Music Events & Shows',
  description: 'Find concerts and live music events in Bahrain! From international artists to local bands, discover upcoming concerts at Bahrain venues. Get tickets and event info.',
  keywords: 'concerts in Bahrain, Bahrain concerts, live music Bahrain, Bahrain shows, music events Bahrain, concerts Manama, Bahrain gigs, upcoming concerts Bahrain',
  openGraph: {
    title: 'Concerts in Bahrain 2026 | Live Music Events & Shows',
    description: 'Your guide to concerts and live music events in Bahrain - international artists, local bands, and where to see live music.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/concerts',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/concerts',
  },
};

const majorVenues = [
  {
    name: 'Bahrain International Circuit (BIC)',
    type: 'Stadium/Arena',
    capacity: '50,000+',
    description: 'The premier venue for major international concerts, especially during F1 weekend.',
    recentArtists: ['Post Malone', 'The Weeknd', 'Swedish House Mafia'],
    location: 'Sakhir',
    website: 'bahraingp.com',
  },
  {
    name: 'Al Dana Amphitheatre',
    type: 'Amphitheatre',
    capacity: '10,000',
    description: 'Open-air venue hosting international and regional concerts throughout the year.',
    recentArtists: ['Amr Diab', 'Nancy Ajram', 'Maroon 5'],
    location: 'Bahrain Bay',
    website: 'aldana.bh',
  },
  {
    name: 'Bahrain National Theatre',
    type: 'Theatre',
    capacity: '1,001',
    description: 'Elegant indoor venue for classical concerts, orchestras, and cultural performances.',
    recentArtists: ['Classical performances', 'Orchestras', 'Jazz concerts'],
    location: 'Manama',
    website: 'culture.gov.bh',
  },
  {
    name: 'Hotel Ballrooms',
    type: 'Indoor Venues',
    capacity: '500-2,000',
    description: 'Gulf Hotel, Ritz-Carlton, Four Seasons host intimate concerts and special events.',
    recentArtists: ['Various artists', 'Corporate events', 'Special performances'],
    location: 'Various',
    website: 'Various',
  },
];

const concertTypes = [
  {
    type: 'International Pop/Rock',
    icon: Music,
    description: 'Major international artists typically perform during F1 weekend (March-April) or special events.',
    when: 'F1 weekend, National Day, special tours',
    priceRange: 'BD 30-150+',
    tip: 'Book F1 concert tickets early - they sell out fast. Check Platinumlist for announcements.',
  },
  {
    type: 'Arabic Artists',
    icon: Mic2,
    description: 'Regional superstars like Amr Diab, Tamer Hosny, and Nancy Ajram perform regularly.',
    when: 'Throughout the year, especially Eid and holidays',
    priceRange: 'BD 20-80',
    tip: 'Arabic concerts are very popular. VIP tables offer better experience.',
  },
  {
    type: 'Live Band Venues',
    icon: Volume2,
    description: 'Hotel bars and pubs featuring live bands playing covers and original music nightly.',
    when: 'Every night, best Thursday-Saturday',
    priceRange: 'Free entry (drink minimum)',
    tip: 'Filipino cover bands are legendary in Bahrain. JJ\'s and Sherlock Holmes are top spots.',
  },
  {
    type: 'Jazz & Blues',
    icon: Radio,
    description: 'Intimate jazz performances at upscale venues and special jazz nights.',
    when: 'Weekly at select venues',
    priceRange: 'Free-BD 25',
    tip: 'Check The Jazz Club (Gulf Hotel) and hotel lounges for jazz nights.',
  },
];

const liveVenues = [
  {
    name: 'JJ\'s Irish Pub',
    location: 'Adliya',
    type: 'Live Music Pub',
    music: 'Rock, Pop covers, Variety',
    nights: 'Daily live music',
    vibe: 'Energetic, party atmosphere',
  },
  {
    name: 'Sherlock Holmes',
    location: 'Gulf Hotel',
    type: 'English Pub',
    music: 'Classic rock, Pop covers',
    nights: 'Nightly',
    vibe: 'Casual, expat favorite',
  },
  {
    name: 'The Jazz Club',
    location: 'Gulf Hotel',
    type: 'Jazz Lounge',
    music: 'Jazz, Blues',
    nights: 'Selected nights',
    vibe: 'Sophisticated, intimate',
  },
  {
    name: 'Lanterns',
    location: 'Gulf Hotel',
    type: 'Asian Fusion Lounge',
    music: 'Live entertainment, DJ',
    nights: 'Thursday-Saturday',
    vibe: 'Upscale, trendy',
  },
  {
    name: 'Typhoon',
    location: 'Gulf Hotel',
    type: 'Sports Bar',
    music: 'Live bands, Rock',
    nights: 'Nightly',
    vibe: 'Lively, sports crowd',
  },
  {
    name: 'Trader Vic\'s',
    location: 'Ritz-Carlton',
    type: 'Tiki Bar',
    music: 'Live entertainment',
    nights: 'Selected nights',
    vibe: 'Tropical, relaxed',
  },
];

const upcomingHighlights = [
  {
    event: 'F1 Bahrain Grand Prix 2026',
    date: 'March-April 2026',
    venue: 'Bahrain International Circuit',
    description: 'Major international concerts alongside the race weekend.',
    status: 'Artists TBA',
  },
  {
    event: 'Spring of Culture',
    date: 'February-April 2026',
    venue: 'Various venues',
    description: 'Annual arts and music festival featuring international performers.',
    status: 'Lineup announced soon',
  },
  {
    event: 'Bahrain National Day',
    date: 'December 16-17, 2026',
    venue: 'Various venues',
    description: 'Celebrations often include special concerts and performances.',
    status: 'Annual event',
  },
];

const ticketTips = [
  {
    title: 'Where to Buy',
    content: 'Platinumlist.net is the main ticketing platform for major events. Virgin Megastore also sells tickets for some shows.',
  },
  {
    title: 'Early Bird',
    content: 'Sign up for venue newsletters and follow social media for early bird prices - savings can be 20-30%.',
  },
  {
    title: 'VIP Packages',
    content: 'For Arabic concerts, VIP tables often include drinks and better viewing. Worth it for groups.',
  },
  {
    title: 'F1 Weekend',
    content: 'Concert tickets are often separate from F1 tickets. Some packages include both. Book months ahead.',
  },
];

export default function ConcertsGuidePage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-red-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Concerts', url: 'https://www.bahrainnights.com/guides/concerts' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-purple-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium mb-4">
              🎵 Live Music Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-red-400 to-purple-500 bg-clip-text text-transparent">
                Concerts
              </span>
              {' '}in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From world-class international artists during F1 weekend to legendary live 
              bands at local pubs — discover the best live music experiences in Bahrain.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Major Venues', value: '5+', icon: MapPin },
              { label: 'Live Music Bars', value: '15+', icon: Volume2 },
              { label: 'Annual Events', value: '50+', icon: Calendar },
              { label: 'F1 Concerts/Year', value: '3-5', icon: Star },
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

      {/* Major Venues */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Major Concert Venues</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            The biggest venues in Bahrain for international and regional concerts.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {majorVenues.map((venue) => (
              <div 
                key={venue.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold">{venue.name}</h3>
                    <p className="text-red-400 text-sm">{venue.type} • {venue.location}</p>
                  </div>
                  <span className="text-xs bg-white/10 px-2 py-1 rounded">
                    {venue.capacity}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-4">{venue.description}</p>
                <p className="text-sm">
                  <strong className="text-red-400">Recent artists:</strong>{' '}
                  {venue.recentArtists.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Concert Types */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Types of Live Music</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {concertTypes.map((concert) => (
              <div key={concert.type} className="bg-white/5 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-red-500/20 rounded-lg">
                    <concert.icon className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-xl font-bold">{concert.type}</h3>
                </div>
                <p className="text-gray-300 mb-4">{concert.description}</p>
                <div className="space-y-2 text-sm mb-3">
                  <p><strong className="text-gray-400">When:</strong> {concert.when}</p>
                  <p><strong className="text-gray-400">Price range:</strong> {concert.priceRange}</p>
                </div>
                <p className="text-xs text-red-400 italic">💡 {concert.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Music Venues */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Live Music Venues</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Bars and pubs with live bands — perfect for a night out with great music.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {liveVenues.map((venue) => (
              <div 
                key={venue.name}
                className="bg-gradient-to-br from-red-500/10 to-purple-500/10 rounded-xl p-5"
              >
                <h3 className="font-bold mb-1">{venue.name}</h3>
                <p className="text-red-400 text-sm mb-3">{venue.location} • {venue.type}</p>
                <div className="space-y-1 text-sm text-gray-300">
                  <p><strong>Music:</strong> {venue.music}</p>
                  <p><strong>Live:</strong> {venue.nights}</p>
                  <p><strong>Vibe:</strong> {venue.vibe}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Highlights */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Major Events to Watch</h2>
          
          <div className="space-y-4">
            {upcomingHighlights.map((event) => (
              <div 
                key={event.event}
                className="bg-white/5 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <h3 className="text-lg font-bold">{event.event}</h3>
                  <p className="text-gray-400 text-sm">{event.venue}</p>
                  <p className="text-gray-300 text-sm mt-1">{event.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-red-400 font-bold">{event.date}</div>
                  <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded">
                    {event.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ticket Tips */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Ticket Tips</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ticketTips.map((tip) => (
              <div key={tip.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-red-400 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-300">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-500/20 to-purple-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Don&apos;t Miss a Beat</h2>
          <p className="text-gray-300 mb-8">
            Check our events calendar for upcoming concerts and live music in Bahrain.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/events?category=concert"
              className="px-8 py-3 bg-red-500 hover:bg-red-400 text-white font-bold rounded-lg transition-colors"
            >
              View Upcoming Concerts
            </Link>
            <Link 
              href="/events"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              All Events
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
              { title: 'Best Parties', href: '/guides/parties', emoji: '🎉' },
              { title: 'F1 2026 Guide', href: '/guides/f1-2026', emoji: '🏎️' },
              { title: 'Things to Do', href: '/guides/things-to-do', emoji: '🎯' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group"
              >
                <span className="text-2xl mb-2 block">{guide.emoji}</span>
                <span className="font-medium group-hover:text-red-400 transition-colors">
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
                q: 'When do major concerts happen in Bahrain?',
                a: 'The biggest concerts are during the F1 Grand Prix weekend (March-April), National Day (December), and Spring of Culture festival (February-April). International artists typically perform during these periods.',
              },
              {
                q: 'Where can I find live music in Bahrain?',
                a: 'For nightly live bands, head to Gulf Hotel venues (JJ\'s, Sherlock Holmes, Typhoon) or Adliya pubs. Filipino cover bands play rock and pop classics every night of the week.',
              },
              {
                q: 'How do I buy concert tickets in Bahrain?',
                a: 'Platinumlist.net is the primary ticketing platform for major concerts. Virgin Megastore and venue box offices also sell tickets. For F1 weekend concerts, check bahraingp.com.',
              },
              {
                q: 'What artists have performed in Bahrain?',
                a: 'Recent years have seen Post Malone, The Weeknd, Swedish House Mafia, Maroon 5, and many Arabic superstars like Amr Diab and Nancy Ajram perform in Bahrain.',
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
            headline: 'Concerts in Bahrain 2026 | Live Music Events & Shows',
            description: 'Complete guide to concerts and live music in Bahrain including major venues, upcoming events, and where to see live bands.',
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
              '@id': 'https://bahrainnights.com/guides/concerts',
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
                name: 'When do major concerts happen in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The biggest concerts are during the F1 Grand Prix weekend (March-April), National Day (December), and Spring of Culture festival (February-April).',
                },
              },
              {
                '@type': 'Question',
                name: 'Where can I find live music in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'For nightly live bands, head to Gulf Hotel venues (JJ\'s, Sherlock Holmes, Typhoon) or Adliya pubs.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do I buy concert tickets in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Platinumlist.net is the primary ticketing platform for major concerts. Virgin Megastore and venue box offices also sell tickets.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
