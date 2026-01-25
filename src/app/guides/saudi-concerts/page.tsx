import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Music, Mic2, Calendar, MapPin, Ticket, Star,
  ArrowRight, Users, Sparkles, Volume2, Plane, Info
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Concerts in Saudi Arabia 2026 | Riyadh, Jeddah & AlUla Events',
  description: 'Find concerts in Saudi Arabia! Guide to live music events in Riyadh, Jeddah, and AlUla. MDL Beast, Soundstorm, and international artists in the Kingdom.',
  keywords: 'concerts in Saudi Arabia, Saudi concerts, Riyadh concerts, Jeddah concerts, MDL Beast, Soundstorm, live music Saudi, concerts Riyadh',
  openGraph: {
    title: 'Concerts in Saudi Arabia 2026 | Riyadh, Jeddah & AlUla Events',
    description: 'Your guide to concerts and live music events in Saudi Arabia.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/saudi-concerts',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/saudi-concerts',
  },
};

const majorVenues = [
  {
    name: 'Boulevard Riyadh City',
    type: 'Entertainment District',
    location: 'Riyadh',
    capacity: '50,000+',
    description: 'Massive entertainment complex hosting major international concerts and events.',
    recentArtists: ['Travis Scott', 'Future', 'Imagine Dragons', 'David Guetta'],
  },
  {
    name: 'Jeddah Superdome',
    type: 'Indoor Arena',
    location: 'Jeddah',
    capacity: '15,000',
    description: 'Premier indoor concert venue in the Western Province.',
    recentArtists: ['Various international acts', 'Arabic superstars'],
  },
  {
    name: 'King Abdullah Sports City',
    type: 'Stadium',
    location: 'Jeddah',
    capacity: '62,000',
    description: 'Major stadium hosting mega concerts and sporting events.',
    recentArtists: ['BTS', 'Major wrestling events'],
  },
  {
    name: 'Maraya Concert Hall',
    type: 'Mirrored Concert Hall',
    location: 'AlUla',
    capacity: '500-5,000',
    description: 'Stunning mirrored building in the desert, hosting intimate high-profile concerts.',
    recentArtists: ['Andrea Bocelli', 'Alicia Keys', 'Lionel Richie'],
  },
  {
    name: 'MDL Beast Venue',
    type: 'Festival Grounds',
    location: 'Riyadh',
    capacity: '200,000+',
    description: 'Home of the annual Soundstorm festival - one of the world\'s largest music festivals.',
    recentArtists: ['Soundstorm lineup', 'Global EDM acts'],
  },
];

const majorEvents = [
  {
    name: 'Soundstorm (MDL Beast)',
    month: 'December',
    location: 'Riyadh',
    type: 'EDM Festival',
    description: 'One of the world\'s largest music festivals featuring top EDM artists. Multiple stages, 3+ days.',
    tip: 'Book flights and accommodation months in advance. Packages often sell out.',
  },
  {
    name: 'Riyadh Season',
    month: 'October-March',
    location: 'Riyadh',
    type: 'Entertainment Season',
    description: 'Massive entertainment season with concerts, shows, and events throughout the city.',
    tip: 'Check riyadhseason.sa for the latest lineup. Book event tickets separately.',
  },
  {
    name: 'Jeddah Season',
    month: 'June-July',
    location: 'Jeddah',
    type: 'Entertainment Season',
    description: 'Summer festival with concerts, cultural events, and entertainment.',
    tip: 'Great option when other Gulf cities are quiet in summer.',
  },
  {
    name: 'AlUla Moments',
    month: 'Various',
    location: 'AlUla',
    type: 'Cultural Events',
    description: 'Unique concerts and events in the stunning desert setting of AlUla.',
    tip: 'Combine with historical site visits - AlUla is a UNESCO heritage destination.',
  },
];

const highlights = [
  {
    title: 'Entertainment Revolution',
    content: 'Saudi Arabia\'s entertainment scene has transformed dramatically since 2019. The Kingdom now hosts major international artists regularly.',
  },
  {
    title: 'World-Class Events',
    content: 'Events like Soundstorm attract 700,000+ visitors. The production quality rivals any global festival.',
  },
  {
    title: 'Diverse Lineup',
    content: 'From EDM and hip-hop to Arabic pop and classical - Saudi hosts all genres at major venues.',
  },
  {
    title: 'Growing Scene',
    content: 'New venues and events are announced regularly as part of Vision 2030.',
  },
];

const practicalInfo = [
  {
    title: 'Visas',
    content: 'Tourist visas are available online for many nationalities. GCC residents can enter freely.',
  },
  {
    title: 'Tickets',
    content: 'Book through official season websites (riyadhseason.sa) or Platinumlist.',
  },
  {
    title: 'Transport',
    content: 'Riyadh and Jeddah have Uber/Careem. For Soundstorm, shuttle buses run from the city.',
  },
  {
    title: 'What to Expect',
    content: 'Professional organization, safe environment, family-friendly. No alcohol is served.',
  },
];

export default function SaudiConcertsPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-green-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Saudi Concerts', url: 'https://www.bahrainnights.com/guides/saudi-concerts' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium mb-4">
              🇸🇦 Saudi Music Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                Concerts
              </span>
              {' '}in Saudi Arabia
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Saudi Arabia has become a global entertainment destination. From MDL Beast to intimate 
              desert concerts in AlUla — discover the Kingdom&apos;s music scene.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Major Venues', value: '10+', icon: MapPin },
              { label: 'Soundstorm Size', value: '200k+', icon: Users },
              { label: 'From Bahrain', value: '1 hour', icon: Plane },
              { label: 'Best Event', value: 'Soundstorm', icon: Star },
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

      {/* Entertainment Revolution */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Entertainment Revolution</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {highlights.map((item) => (
              <div key={item.title} className="bg-green-500/10 rounded-xl p-5">
                <h3 className="font-bold text-green-400 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-300">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Major Venues */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Major Concert Venues</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            World-class venues across the Kingdom hosting international artists.
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
                      <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                        {venue.capacity}
                      </span>
                    </div>
                    <p className="text-green-400 text-sm mb-2">{venue.type} • {venue.location}</p>
                    <p className="text-gray-300 mb-3">{venue.description}</p>
                    <p className="text-sm">
                      <strong className="text-gray-400">Recent artists:</strong>{' '}
                      <span className="text-green-300">{venue.recentArtists.join(', ')}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Major Events */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Major Annual Events</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {majorEvents.map((event) => (
              <div key={event.name} className="bg-white/5 rounded-xl p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold">{event.name}</h3>
                    <p className="text-green-400 text-sm">{event.type} • {event.location}</p>
                  </div>
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">
                    {event.month}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-3">{event.description}</p>
                <p className="text-xs text-green-300 italic">💡 {event.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Soundstorm Highlight */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">🎧 Soundstorm by MDL Beast</h2>
          <p className="text-xl text-gray-300 mb-6">
            One of the world&apos;s largest music festivals, held annually in December in Riyadh.
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-400">700,000+</div>
              <div className="text-gray-400">Attendees in 2023</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-400">7+</div>
              <div className="text-gray-400">Massive Stages</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-400">200+</div>
              <div className="text-gray-400">Artists</div>
            </div>
          </div>
          <p className="text-sm text-gray-400 mt-6">
            Features world-class EDM artists, stunning production, and incredible atmosphere.
          </p>
        </div>
      </section>

      {/* Practical Info */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Practical Information</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {practicalInfo.map((info) => (
              <div key={info.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-green-400 mb-2">{info.title}</h3>
                <p className="text-sm text-gray-300">{info.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting There */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <Plane className="inline w-8 h-8 mr-2 text-green-400" />
            Getting to Saudi Arabia
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="font-bold mb-4 text-green-400">From Bahrain</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>🚗 King Fahd Causeway - drive to Eastern Province</li>
                <li>✈️ 1-hour flights to Riyadh and Jeddah</li>
                <li>📅 Multiple daily flights on Gulf Air, Saudia, flynas</li>
                <li>💡 Causeway is great for Eastern Province events</li>
              </ul>
            </div>
            
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="font-bold mb-4 text-green-400">Visa Info</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• GCC citizens: No visa required</li>
                <li>• Many nationalities: Tourist e-visa online</li>
                <li>• Event visas available for major festivals</li>
                <li>• Check visa.visitsaudi.com</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More Regional Events</h2>
          <p className="text-gray-300 mb-8">
            Check out concerts and events across the Gulf region.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/regional"
              className="px-8 py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded-lg transition-colors"
            >
              Regional Events
            </Link>
            <Link 
              href="/guides/dubai-concerts"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              Dubai Concerts
            </Link>
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Bahrain Concerts', href: '/guides/concerts', emoji: '🇧🇭' },
              { title: 'Dubai Concerts', href: '/guides/dubai-concerts', emoji: '🇦🇪' },
              { title: 'Qatar Events', href: '/guides/qatar-parties', emoji: '🇶🇦' },
              { title: 'Regional Events', href: '/regional', emoji: '🌍' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group"
              >
                <span className="text-2xl mb-2 block">{guide.emoji}</span>
                <span className="font-medium group-hover:text-green-400 transition-colors">
                  {guide.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {[
              {
                q: 'Are there concerts in Saudi Arabia?',
                a: 'Yes! Since 2019, Saudi Arabia hosts major international artists regularly. Events like Soundstorm attract 700,000+ visitors. Riyadh Season runs October-March with constant entertainment.',
              },
              {
                q: 'What is Soundstorm/MDL Beast?',
                a: 'Soundstorm is one of the world\'s largest music festivals, held annually in December in Riyadh. It features 200+ artists across 7+ stages over multiple days.',
              },
              {
                q: 'Can tourists attend concerts in Saudi Arabia?',
                a: 'Yes. Tourist visas are available online for many nationalities. GCC citizens don\'t need visas. Special event visas are sometimes available for major festivals.',
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
            headline: 'Concerts in Saudi Arabia 2026',
            description: 'Complete guide to concerts in Saudi Arabia including Soundstorm, Riyadh Season, and venues.',
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
                name: 'Are there concerts in Saudi Arabia?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! Since 2019, Saudi Arabia hosts major international artists regularly.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is Soundstorm/MDL Beast?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Soundstorm is one of the world\'s largest music festivals, held in Riyadh.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
