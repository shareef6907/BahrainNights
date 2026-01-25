import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Music, PartyPopper, Sparkles, Clock, MapPin, Star,
  ArrowRight, Users, Wine, Zap, Calendar, Plane, Info
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Parties in Qatar 2026 | Doha Nightlife, Events & Entertainment Guide',
  description: 'Find parties and nightlife in Qatar! Guide to Doha clubs, hotel bars, events, and entertainment. What to expect from Qatar nightlife after the World Cup.',
  keywords: 'parties in Qatar, Qatar nightlife, Doha nightlife, Qatar clubs, Doha bars, Qatar events, nightlife Doha, entertainment Qatar',
  openGraph: {
    title: 'Parties in Qatar 2026 | Doha Nightlife, Events & Entertainment Guide',
    description: 'Your guide to parties, nightlife and entertainment in Qatar and Doha.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/qatar-parties',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/qatar-parties',
  },
};

const venues = [
  {
    name: 'Crystal',
    area: 'W Doha',
    type: 'Nightclub',
    vibe: 'Doha\'s most popular nightclub',
    music: 'House, Hip Hop, Commercial',
    bestNights: 'Thursday, Friday',
    price: '$$$',
    highlights: ['Best club in Doha', 'International DJs', 'Themed nights', 'VIP tables'],
  },
  {
    name: 'Sky View Bar',
    area: 'La Cigale Hotel',
    type: 'Rooftop Lounge',
    vibe: 'Stunning city views and cocktails',
    music: 'Live music, Lounge',
    bestNights: 'Wednesday-Saturday',
    price: '$$$',
    highlights: ['City views', 'Live entertainment', 'Cocktails', 'Date night'],
  },
  {
    name: 'Nobu Doha',
    area: 'Four Seasons',
    type: 'Restaurant & Bar',
    vibe: 'Upscale dining and drinks',
    music: 'Lounge, DJ weekends',
    bestNights: 'Thursday, Friday',
    price: '$$$$',
    highlights: ['World-class dining', 'Late-night bar', 'Sophisticated crowd'],
  },
  {
    name: 'B Lounge',
    area: 'Banana Island Resort',
    type: 'Beach Lounge',
    vibe: 'Island resort beach experience',
    music: 'Chill, House',
    bestNights: 'Friday, Saturday',
    price: '$$$$',
    highlights: ['Private island', 'Beach setting', 'Exclusive feel', 'Day-to-night'],
  },
  {
    name: 'The Pearl-Qatar venues',
    area: 'The Pearl',
    type: 'Multiple Venues',
    vibe: 'Waterfront dining and bars',
    music: 'Various',
    bestNights: 'Weekends',
    price: '$$-$$$',
    highlights: ['Marina views', 'Multiple options', 'Dining & drinks', 'Walking area'],
  },
  {
    name: 'Hakkasan',
    area: 'St. Regis',
    type: 'Restaurant & Club',
    vibe: 'Luxury Cantonese dining with late-night vibes',
    music: 'House, Electronic',
    bestNights: 'Thursday, Friday',
    price: '$$$$',
    highlights: ['Michelin-level dining', 'Stunning design', 'Late-night bar'],
  },
];

const importantNotes = [
  {
    title: 'Alcohol Availability',
    content: 'Alcohol is only available at licensed hotel venues in Qatar. There are no standalone bars or liquor stores. All nightlife happens in 4-5 star hotels.',
    icon: Info,
  },
  {
    title: 'Dress Code',
    content: 'Qatar is conservative. Smart attire is required at all venues. Women should dress modestly outside hotels (shoulders and knees covered).',
    icon: Users,
  },
  {
    title: 'Weekend',
    content: 'Qatar\'s weekend is Friday-Saturday. Thursday night is the start of the weekend and the main going-out night.',
    icon: Calendar,
  },
  {
    title: 'Compared to Dubai/Bahrain',
    content: 'Qatar\'s nightlife is more subdued than Dubai or Bahrain. Expect lounge-style venues rather than mega clubs. Quality over quantity.',
    icon: Star,
  },
];

const areas = [
  {
    area: 'West Bay',
    description: 'Business district with most major hotels and their bars/clubs.',
    bestFor: 'Nightclubs, hotel bars, upscale lounges',
    venues: ['W Doha', 'Four Seasons', 'St. Regis', 'Shangri-La'],
  },
  {
    area: 'The Pearl-Qatar',
    description: 'Man-made island with waterfront restaurants and cafes.',
    bestFor: 'Dinner and drinks, walking, shisha',
    venues: ['Marina restaurants', 'Various lounges', 'Waterfront cafes'],
  },
  {
    area: 'Katara Cultural Village',
    description: 'Cultural hub with events, cafes, and beach.',
    bestFor: 'Cultural events, family-friendly, daytime',
    venues: ['Amphitheatre events', 'Cafes', 'Beach facilities'],
  },
  {
    area: 'Souq Waqif',
    description: 'Traditional market area with cafes and shisha lounges.',
    bestFor: 'Shisha, traditional atmosphere, tourists',
    venues: ['Traditional cafes', 'Rooftop lounges', 'Restaurants'],
  },
];

const events = [
  {
    type: 'Concerts & Shows',
    description: 'Major international artists perform at venues like Lusail Stadium and Qatar National Convention Centre.',
    frequency: 'Regular - check listings',
  },
  {
    type: 'Sporting Events',
    description: 'World Cup legacy means regular football and sporting events with fan zones.',
    frequency: 'Seasonal',
  },
  {
    type: 'Cultural Events',
    description: 'Qatar hosts major cultural events, art exhibitions, and festivals.',
    frequency: 'Year-round',
  },
  {
    type: 'Hotel Events',
    description: 'Special themed nights, brunches, and parties at major hotels.',
    frequency: 'Weekly',
  },
];

export default function QatarPartiesPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-rose-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Qatar Parties', url: 'https://www.bahrainnights.com/guides/qatar-parties' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 to-maroon-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-rose-500/20 text-rose-400 rounded-full text-sm font-medium mb-4">
              🇶🇦 Qatar Nightlife Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">
                Parties
              </span>
              {' '}in Qatar
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Qatar offers a sophisticated nightlife experience in its world-class hotels. 
              Discover the best bars, lounges, and events in Doha.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Hotel Venues', value: '30+', icon: Wine },
              { label: 'Nightclubs', value: '5-10', icon: Music },
              { label: 'From Bahrain', value: '35 min', icon: Plane },
              { label: 'Best Night', value: 'Thursday', icon: Star },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-rose-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">What You Need to Know</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {importantNotes.map((note) => (
              <div key={note.title} className="bg-rose-500/10 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-rose-500/20 rounded-lg">
                    <note.icon className="w-6 h-6 text-rose-400" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">{note.title}</h3>
                    <p className="text-gray-300 text-sm">{note.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Venues */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Top Venues in Doha</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            The best places for nightlife in Qatar - all located in licensed hotels.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {venues.map((venue) => (
              <div 
                key={venue.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold">{venue.name}</h3>
                    <p className="text-rose-400 text-sm">{venue.area} • {venue.type}</p>
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
                    <span key={h} className="text-xs bg-rose-500/20 text-rose-300 px-2 py-1 rounded">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Doha Areas Guide</h2>
          
          <div className="space-y-6">
            {areas.map((area) => (
              <div key={area.area} className="bg-white/5 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-rose-400 mb-2">{area.area}</h3>
                <p className="text-gray-300 mb-3">{area.description}</p>
                <p className="text-sm text-gray-400 mb-2">
                  <strong>Best for:</strong> {area.bestFor}
                </p>
                <p className="text-sm text-rose-300">
                  <strong>Key venues:</strong> {area.venues.join(' • ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Events in Qatar</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {events.map((event) => (
              <div key={event.type} className="bg-white/5 rounded-xl p-6">
                <h3 className="font-bold text-rose-400 mb-2">{event.type}</h3>
                <p className="text-gray-300 text-sm mb-2">{event.description}</p>
                <p className="text-xs text-gray-500">Frequency: {event.frequency}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting There */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <Plane className="inline w-8 h-8 mr-2 text-rose-400" />
            Getting to Qatar
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="font-bold mb-4 text-rose-400">From Bahrain</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>✈️ 35 minutes flight from Bahrain International</li>
                <li>📅 Multiple daily flights (Gulf Air, Qatar Airways)</li>
                <li>🚗 Previously accessible via King Fahd Causeway + Saudi (check current status)</li>
                <li>💡 Easy day trip or weekend getaway</li>
              </ul>
            </div>
            
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="font-bold mb-4 text-rose-400">Getting Around Doha</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Doha Metro - modern and efficient</li>
                <li>• Uber and Karwa taxis widely available</li>
                <li>• Most hotels in West Bay area</li>
                <li>• The Pearl is 15-20 min from downtown</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-rose-500/20 to-pink-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More Destinations</h2>
          <p className="text-gray-300 mb-8">
            Check out parties and events across the Gulf region.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/regional"
              className="px-8 py-3 bg-rose-500 hover:bg-rose-400 text-white font-bold rounded-lg transition-colors"
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
              { title: 'Abu Dhabi Parties', href: '/guides/abu-dhabi-parties', emoji: '🇦🇪' },
              { title: 'Bahrain Nightlife', href: '/guides/nightlife', emoji: '🇧🇭' },
              { title: 'Bahrain Parties', href: '/guides/parties', emoji: '🎉' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group"
              >
                <span className="text-2xl mb-2 block">{guide.emoji}</span>
                <span className="font-medium group-hover:text-rose-400 transition-colors">
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
                q: 'Is there nightlife in Qatar?',
                a: 'Yes, but it\'s limited to licensed venues in 4-5 star hotels. There are no standalone bars or clubs. The scene is sophisticated and lounge-focused rather than mega-club style.',
              },
              {
                q: 'Can you drink alcohol in Qatar?',
                a: 'Alcohol is available only at licensed hotel venues. There are no liquor stores or bars outside hotels. Non-residents can drink at hotel bars with valid ID.',
              },
              {
                q: 'What is the best club in Doha?',
                a: 'Crystal at W Doha is considered the best nightclub in Qatar. For a more lounge experience, try Sky View Bar at La Cigale or Nobu at Four Seasons.',
              },
              {
                q: 'How does Qatar nightlife compare to Dubai or Bahrain?',
                a: 'Qatar\'s nightlife is more conservative and sophisticated than Dubai or Bahrain. Expect upscale hotel bars and lounges rather than big nightclubs. It\'s quality over quantity.',
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
            headline: 'Parties in Qatar 2026 | Doha Nightlife Guide',
            description: 'Complete guide to parties and nightlife in Qatar including Doha clubs, hotel bars, and events.',
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
                name: 'Is there nightlife in Qatar?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, but it\'s limited to licensed venues in 4-5 star hotels.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can you drink alcohol in Qatar?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Alcohol is available only at licensed hotel venues.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the best club in Doha?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Crystal at W Doha is considered the best nightclub in Qatar.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
