import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Music, Mic2, Calendar, MapPin, Ticket, Star,
  ArrowRight, Users, Sparkles, Volume2, Plane
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Concerts in Dubai 2026 | Live Music Events, Shows & Festivals',
  description: 'Find concerts in Dubai! Complete guide to live music events, international artists, festivals, and where to see music in Dubai. Upcoming concerts and tickets.',
  keywords: 'concerts in Dubai, Dubai concerts, live music Dubai, Dubai shows, music events Dubai, Dubai festivals, upcoming concerts Dubai, Dubai gigs',
  openGraph: {
    title: 'Concerts in Dubai 2026 | Live Music Events, Shows & Festivals',
    description: 'Your guide to concerts and live music events in Dubai - international artists, festivals, and more.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/dubai-concerts',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/dubai-concerts',
  },
};

const majorVenues = [
  {
    name: 'Coca-Cola Arena',
    type: 'Indoor Arena',
    capacity: '17,000',
    location: 'City Walk',
    description: 'Dubai\'s premier indoor concert venue hosting major international artists year-round.',
    recentArtists: ['Coldplay', 'Ed Sheeran', 'Dua Lipa', 'Billie Eilish'],
  },
  {
    name: 'Autism Rocks Arena',
    type: 'Outdoor Arena',
    capacity: '20,000+',
    location: 'Dubai Festival City',
    description: 'Major outdoor venue for large-scale concerts and festivals.',
    recentArtists: ['Post Malone', 'Eminem', 'Bruno Mars'],
  },
  {
    name: 'Dubai Opera',
    type: 'Opera House',
    capacity: '2,000',
    location: 'Downtown Dubai',
    description: 'World-class venue for classical concerts, opera, ballet, and intimate performances.',
    recentArtists: ['Lang Lang', 'Andrea Bocelli', 'Diana Krall'],
  },
  {
    name: 'Media City Amphitheatre',
    type: 'Outdoor Amphitheatre',
    capacity: '15,000',
    location: 'Dubai Media City',
    description: 'Open-air venue perfect for concerts under the stars.',
    recentArtists: ['Various festivals', 'Regional artists'],
  },
  {
    name: 'Atlantis The Palm',
    type: 'Resort Venue',
    capacity: '5,000+',
    location: 'Palm Jumeirah',
    description: 'Hosts exclusive New Year\'s Eve concerts and special events.',
    recentArtists: ['NYE headliners', 'Special events'],
  },
];

const annualEvents = [
  {
    name: 'RedFest DXB',
    month: 'February',
    type: 'Music Festival',
    description: 'Dubai\'s biggest music festival featuring international pop, rock, and hip-hop artists.',
    venues: ['Media City Amphitheatre'],
    tip: 'Two-day event with multiple stages. Book early for early bird prices.',
  },
  {
    name: 'Dubai Jazz Festival',
    month: 'February',
    type: 'Jazz Festival',
    description: 'Annual jazz festival attracting world-renowned jazz and soul artists.',
    venues: ['Media City Amphitheatre'],
    tip: 'More than just jazz - includes pop and rock acts too.',
  },
  {
    name: 'Global Village',
    month: 'October-April',
    type: 'Entertainment Season',
    description: 'Seasonal attraction with concerts, performances, and cultural entertainment.',
    venues: ['Global Village'],
    tip: 'Great for families - concerts plus cultural experiences.',
  },
  {
    name: 'Expo City Events',
    month: 'Year-round',
    type: 'Various',
    description: 'Legacy of Expo 2020 continues with concerts and events.',
    venues: ['Expo City Dubai'],
    tip: 'Check their calendar for international acts.',
  },
];

const concertTypes = [
  {
    type: 'International Pop/Rock',
    description: 'Major international artists perform regularly at Coca-Cola Arena and outdoor venues.',
    frequency: 'Weekly during peak season (Oct-Apr)',
    priceRange: 'AED 250-1,500+',
  },
  {
    type: 'Arabic Artists',
    description: 'Regional superstars perform throughout the year, especially during holidays.',
    frequency: 'Multiple times monthly',
    priceRange: 'AED 150-800',
  },
  {
    type: 'EDM & Dance',
    description: 'International DJs at clubs and special festival events.',
    frequency: 'Weekly at venues, festivals seasonally',
    priceRange: 'AED 200-500',
  },
  {
    type: 'Classical & Opera',
    description: 'World-class performances at Dubai Opera.',
    frequency: 'Regular season',
    priceRange: 'AED 300-2,000',
  },
];

const ticketPlatforms = [
  { name: 'Platinumlist', url: 'platinumlist.net', description: 'Primary ticketing for major concerts' },
  { name: 'Dubai Calendar', url: 'dubaicalendar.com', description: 'Official Dubai events listing' },
  { name: 'Ticketmaster ME', url: 'ticketmaster.ae', description: 'International shows' },
  { name: 'Virgin Megastore', url: 'virginmegastore.ae', description: 'Physical and online tickets' },
];

export default function DubaiConcertsPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-red-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Dubai Concerts', url: 'https://www.bahrainnights.com/guides/dubai-concerts' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium mb-4">
              🎵 Dubai Music Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
                Concerts
              </span>
              {' '}in Dubai
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Dubai is a global hub for live entertainment. From stadium concerts to intimate 
              jazz nights — discover the best music events in Dubai.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Major Venues', value: '10+', icon: MapPin },
              { label: 'Concerts/Month', value: '30+', icon: Calendar },
              { label: 'From Bahrain', value: '45 min', icon: Plane },
              { label: 'Peak Season', value: 'Oct-Apr', icon: Star },
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
            World-class venues hosting international and regional artists.
          </p>
          
          <div className="space-y-6">
            {majorVenues.map((venue) => (
              <div 
                key={venue.name}
                className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{venue.name}</h3>
                      <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">
                        {venue.capacity}
                      </span>
                    </div>
                    <p className="text-red-400 text-sm mb-2">{venue.type} • {venue.location}</p>
                    <p className="text-gray-300 mb-3">{venue.description}</p>
                    <p className="text-sm">
                      <strong className="text-gray-400">Recent artists:</strong>{' '}
                      <span className="text-red-300">{venue.recentArtists.join(', ')}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Annual Events */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Annual Music Events</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {annualEvents.map((event) => (
              <div key={event.name} className="bg-white/5 rounded-xl p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold">{event.name}</h3>
                    <p className="text-red-400 text-sm">{event.type}</p>
                  </div>
                  <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded">
                    {event.month}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-3">{event.description}</p>
                <p className="text-xs text-gray-400 mb-2">Venues: {event.venues.join(', ')}</p>
                <p className="text-xs text-red-300 italic">💡 {event.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Concert Types */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Types of Concerts</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {concertTypes.map((type) => (
              <div key={type.type} className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl p-6">
                <h3 className="font-bold text-red-400 mb-2">{type.type}</h3>
                <p className="text-gray-300 text-sm mb-3">{type.description}</p>
                <div className="text-xs text-gray-400 space-y-1">
                  <p>Frequency: {type.frequency}</p>
                  <p>Price range: {type.priceRange}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ticket Platforms */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Where to Buy Tickets</h2>
          
          <div className="grid md:grid-cols-4 gap-4">
            {ticketPlatforms.map((platform) => (
              <div key={platform.name} className="bg-white/5 rounded-xl p-5 text-center">
                <h3 className="font-bold mb-2">{platform.name}</h3>
                <p className="text-xs text-gray-400 mb-2">{platform.description}</p>
                <p className="text-xs text-red-400">{platform.url}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting There */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <Plane className="inline w-8 h-8 mr-2 text-red-400" />
            From Bahrain
          </h2>
          
          <div className="bg-white/5 rounded-xl p-6 max-w-2xl mx-auto">
            <ul className="space-y-3 text-gray-300">
              <li>✈️ 45-minute flight from Bahrain International Airport</li>
              <li>📅 Multiple daily flights on Gulf Air, Emirates, flydubai</li>
              <li>💰 Weekend flights can be affordable with advance booking</li>
              <li>💡 Many Bahrainis fly to Dubai specifically for major concerts</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-500/20 to-orange-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Planning Your Concert Trip?</h2>
          <p className="text-gray-300 mb-8">
            Check out our Dubai party guide and regional events for more entertainment options.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/regional"
              className="px-8 py-3 bg-red-500 hover:bg-red-400 text-white font-bold rounded-lg transition-colors"
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
          <h2 className="text-2xl font-bold mb-8">Related Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Bahrain Concerts', href: '/guides/concerts', emoji: '🇧🇭' },
              { title: 'Dubai Parties', href: '/guides/dubai-parties', emoji: '🎉' },
              { title: 'Qatar Events', href: '/guides/qatar-parties', emoji: '🇶🇦' },
              { title: 'Regional Events', href: '/regional', emoji: '🌍' },
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

      {/* FAQ */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {[
              {
                q: 'When is the best time for concerts in Dubai?',
                a: 'October to April is peak concert season due to pleasant weather. Major festivals like RedFest DXB happen in February. Summer months have fewer outdoor events.',
              },
              {
                q: 'What are the best concert venues in Dubai?',
                a: 'Coca-Cola Arena is the premier indoor venue for major artists. Dubai Opera hosts classical and intimate shows. Autism Rocks Arena handles large outdoor concerts.',
              },
              {
                q: 'How do I buy concert tickets in Dubai?',
                a: 'Platinumlist.net is the main ticketing platform. Also check Ticketmaster ME, Virgin Megastore, and venue websites. Book early for popular shows.',
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
            headline: 'Concerts in Dubai 2026 | Live Music Events & Shows',
            description: 'Complete guide to concerts in Dubai including venues, festivals, and upcoming events.',
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
                name: 'When is the best time for concerts in Dubai?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'October to April is peak concert season. Major festivals happen in February.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the best concert venues in Dubai?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Coca-Cola Arena is the premier indoor venue. Dubai Opera hosts classical shows.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
