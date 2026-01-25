import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Calendar, MapPin, Ticket, Star, Clock,
  ArrowRight, Users, Music, PartyPopper, Plane, Sun
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Events in Dubai This Weekend 2026 | What\'s On Guide',
  description: 'Find events in Dubai this weekend! Discover parties, concerts, brunches, activities, and what\'s on in Dubai. Your complete guide to weekend events in Dubai.',
  keywords: 'events in Dubai this weekend, Dubai events, what to do in Dubai this weekend, Dubai weekend, things to do Dubai, Dubai activities, Dubai this weekend',
  openGraph: {
    title: 'Events in Dubai This Weekend 2026 | What\'s On Guide',
    description: 'Your guide to events happening in Dubai this weekend - parties, brunches, concerts, and more.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/dubai-events',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/dubai-events',
  },
};

const weekendCategories = [
  {
    name: 'Friday Brunches',
    icon: '🥂',
    description: 'Dubai is famous for its legendary Friday brunches at 5-star hotels.',
    topPicks: ['Bubbalicious (Westin)', 'Saffron (Atlantis)', 'Nobu (Atlantis)', 'STK Downtown'],
    priceRange: 'AED 350-700',
    tip: 'Book at least a week ahead for popular brunches. Most run 1-4 PM.',
  },
  {
    name: 'Beach Clubs',
    icon: '🏖️',
    description: 'Day parties and pool sessions at Dubai\'s beach clubs.',
    topPicks: ['Zero Gravity', 'Nikki Beach', 'Barasti', 'Azure Beach'],
    priceRange: 'AED 150-400 day pass',
    tip: 'Friday and Saturday are busiest. Book beds/cabanas in advance.',
  },
  {
    name: 'Nightlife',
    icon: '🌙',
    description: 'World-class clubs and bars open Thursday-Saturday.',
    topPicks: ['WHITE Dubai', 'Soho Garden', 'Base Dubai', 'Billionaire'],
    priceRange: 'Entry: AED 0-300',
    tip: 'Thursday is the biggest night. Book tables for groups.',
  },
  {
    name: 'Concerts & Shows',
    icon: '🎵',
    description: 'Regular concerts at Coca-Cola Arena and other venues.',
    topPicks: ['Check Coca-Cola Arena', 'Dubai Opera', 'Media City Amphitheatre'],
    priceRange: 'AED 250-1,500+',
    tip: 'Book tickets early on Platinumlist. Peak season Oct-April.',
  },
  {
    name: 'Family Activities',
    icon: '👨‍👩‍👧‍👦',
    description: 'Theme parks, attractions, and family-friendly events.',
    topPicks: ['Dubai Parks', 'IMG Worlds', 'Dubai Aquarium', 'Global Village'],
    priceRange: 'AED 100-400',
    tip: 'Global Village is open October-April. Great for families.',
  },
  {
    name: 'Cultural & Markets',
    icon: '🎨',
    description: 'Art exhibitions, markets, and cultural events.',
    topPicks: ['Alserkal Avenue', 'Ripe Market', 'Dubai Design District'],
    priceRange: 'Free-AED 100',
    tip: 'Friday/Saturday mornings for outdoor markets.',
  },
];

const weeklySchedule = [
  { day: 'Thursday', highlight: 'Main party night', events: 'Clubs open, ladies nights, live music' },
  { day: 'Friday', highlight: 'Brunch & day parties', events: 'Friday brunches, beach clubs, evening events' },
  { day: 'Saturday', highlight: 'Family & events', events: 'Theme parks, markets, concerts, casual nightlife' },
];

const seasonalHighlights = [
  {
    season: 'Winter (Nov-Feb)',
    events: ['Dubai Shopping Festival', 'Dubai Food Festival', 'Outdoor events', 'Global Village'],
    note: 'Peak season - best weather, most events',
  },
  {
    season: 'Spring (Mar-Apr)',
    events: ['Art Dubai', 'Dubai World Cup', 'RedFest DXB', 'Outdoor concerts'],
    note: 'Great weather, major festivals',
  },
  {
    season: 'Summer (May-Sep)',
    events: ['DSS Summer', 'Indoor events', 'Hotel deals', 'Mall activities'],
    note: 'Hot weather, but great deals and indoor fun',
  },
  {
    season: 'Autumn (Oct)',
    events: ['Season launches', 'Halloween events', 'Global Village opens'],
    note: 'New season begins, weather improving',
  },
];

const whereToFind = [
  { platform: 'Dubai Calendar', url: 'dubaicalendar.com', type: 'Official listings' },
  { platform: 'Time Out Dubai', url: 'timeoutdubai.com', type: 'Curated picks' },
  { platform: 'Platinumlist', url: 'platinumlist.net', type: 'Concert tickets' },
  { platform: 'Instagram', url: '@dubainightlife', type: 'Club events' },
];

export default function DubaiEventsPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-amber-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Dubai Events', url: 'https://www.bahrainnights.com/guides/dubai-events' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-4">
              🗓️ Dubai Weekend Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Events in{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Dubai
              </span>
              {' '}This Weekend
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Dubai has something for everyone, every weekend. From legendary brunches to 
              world-class nightlife — here&apos;s your guide to what&apos;s on.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Events/Weekend', value: '100+', icon: Calendar },
              { label: 'Friday Brunches', value: '50+', icon: PartyPopper },
              { label: 'From Bahrain', value: '45 min', icon: Plane },
              { label: 'Best Season', value: 'Oct-Apr', icon: Sun },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-amber-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Weekend Schedule */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Weekend Overview</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {weeklySchedule.map((day) => (
              <div 
                key={day.day}
                className={`bg-white/5 rounded-xl p-6 ${
                  day.day === 'Friday' ? 'ring-2 ring-amber-500' : ''
                }`}
              >
                <h3 className="text-xl font-bold text-amber-400 mb-2">{day.day}</h3>
                <p className="text-sm font-medium mb-2">{day.highlight}</p>
                <p className="text-xs text-gray-400">{day.events}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-400 mt-4">
            UAE weekend is Friday-Saturday. Thursday night kicks off the weekend.
          </p>
        </div>
      </section>

      {/* Event Categories */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">What&apos;s On This Weekend</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Browse events by category and find your perfect weekend activity.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {weekendCategories.map((category) => (
              <div 
                key={category.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                <p className="text-gray-300 text-sm mb-4">{category.description}</p>
                
                <div className="space-y-2 text-sm mb-4">
                  <p>
                    <strong className="text-amber-400">Top picks:</strong>{' '}
                    {category.topPicks.join(', ')}
                  </p>
                  <p>
                    <strong className="text-gray-400">Price range:</strong>{' '}
                    {category.priceRange}
                  </p>
                </div>
                
                <p className="text-xs text-amber-300 italic">💡 {category.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Highlights */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Seasonal Events</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {seasonalHighlights.map((season) => (
              <div 
                key={season.season}
                className={`bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-xl p-5 ${
                  season.season.includes('Winter') ? 'ring-2 ring-amber-500' : ''
                }`}
              >
                <h3 className="font-bold text-amber-400 mb-3">{season.season}</h3>
                <ul className="space-y-1 text-sm text-gray-300 mb-3">
                  {season.events.map((e, i) => (
                    <li key={i}>• {e}</li>
                  ))}
                </ul>
                <p className="text-xs text-gray-400 italic">{season.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where to Find Events */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Where to Find Events</h2>
          
          <div className="grid md:grid-cols-4 gap-4">
            {whereToFind.map((platform) => (
              <div key={platform.platform} className="bg-white/5 rounded-xl p-5 text-center">
                <h3 className="font-bold mb-1">{platform.platform}</h3>
                <p className="text-xs text-amber-400 mb-2">{platform.url}</p>
                <p className="text-xs text-gray-400">{platform.type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting There */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <Plane className="inline w-8 h-8 mr-2 text-amber-400" />
            Weekend Trip from Bahrain
          </h2>
          
          <div className="bg-white/5 rounded-xl p-6 max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold mb-4 text-amber-400">Getting There</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>✈️ 45-minute flight from Bahrain</li>
                  <li>📅 10+ daily flights (Gulf Air, Emirates, flydubai)</li>
                  <li>💰 Return flights from ~BD 40-80</li>
                  <li>💡 Fly Thursday evening, return Saturday night</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4 text-amber-400">Tips</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Book brunch/clubs in advance</li>
                  <li>• Stay in Dubai Marina or Downtown for nightlife</li>
                  <li>• Metro + Uber covers most areas</li>
                  <li>• Check Dubai Calendar for what&apos;s on</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Plan Your Dubai Weekend</h2>
          <p className="text-gray-300 mb-8">
            Check out our detailed guides for Dubai parties, concerts, and more.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/dubai-parties"
              className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg transition-colors"
            >
              Dubai Parties
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
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Dubai Parties', href: '/guides/dubai-parties', emoji: '🎉' },
              { title: 'Dubai Concerts', href: '/guides/dubai-concerts', emoji: '🎵' },
              { title: 'Abu Dhabi Events', href: '/guides/abu-dhabi-parties', emoji: '🇦🇪' },
              { title: 'Bahrain Events', href: '/events/this-weekend', emoji: '🇧🇭' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group"
              >
                <span className="text-2xl mb-2 block">{guide.emoji}</span>
                <span className="font-medium group-hover:text-amber-400 transition-colors">
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
                q: 'What is there to do in Dubai this weekend?',
                a: 'Dubai offers Friday brunches, beach clubs, world-class nightlife, concerts, family attractions like theme parks, markets, and cultural events. There\'s something for every interest and budget.',
              },
              {
                q: 'What is the best day for nightlife in Dubai?',
                a: 'Thursday is the main party night as the weekend starts Friday. Friday evening is also great for clubs and bars. Saturday tends to be more relaxed.',
              },
              {
                q: 'When is the best time to visit Dubai for events?',
                a: 'October to April is peak season with the best weather and most events. Major festivals like Global Village run during winter months.',
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
            headline: 'Events in Dubai This Weekend 2026',
            description: 'Complete guide to weekend events in Dubai including brunches, parties, concerts, and activities.',
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
                name: 'What is there to do in Dubai this weekend?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Dubai offers Friday brunches, beach clubs, nightlife, concerts, and family attractions.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the best day for nightlife in Dubai?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Thursday is the main party night as the weekend starts Friday.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
