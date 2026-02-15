import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import InternalLinks from '@/components/SEO/InternalLinks';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Moon, Music, Wine, MapPin, Clock, Star,
  ArrowRight, Users, Sparkles, Volume2
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Bahrain Nightlife Guide 2026 | Best Clubs, Bars & Lounges',
  description: 'Complete guide to Bahrain nightlife - discover the best nightclubs, bars, lounges, and late-night spots in Manama, Adliya, and Juffair.',
  keywords: 'Bahrain nightlife, Bahrain clubs, Bahrain bars, Manama nightlife, Adliya bars, Juffair clubs, best clubs Bahrain',
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/nightlife',
  },
  openGraph: {
    title: 'Bahrain Nightlife Guide 2026 | Best Clubs, Bars & Lounges',
    description: 'Your ultimate guide to the best nightlife in Bahrain - clubs, bars, lounges, and more.',
    type: 'article',
    locale: 'en_US',
  },
};

const areas = [
  {
    name: 'Adliya',
    description: 'The trendy arts district with boutique bars and cozy lounges',
    vibe: 'Artsy, Casual, Hipster',
    bestFor: 'Cocktails, live music, date nights',
    spots: [
      { name: 'Colony', type: 'Restaurant & Lounge', highlight: 'Trendy food & drinks' },
      { name: 'Block 338', type: 'Bar Street', highlight: 'Multiple venues in one area' },
      { name: 'JJ\'s Irish Pub', type: 'Pub', highlight: 'Live music & sports' },
    ],
  },
  {
    name: 'Juffair',
    description: 'The party hub with nightclubs and late-night entertainment',
    vibe: 'Energetic, Party, International',
    bestFor: 'Dancing, clubs, late nights',
    spots: [
      { name: 'Hotel Entertainment Venues', type: 'Various', highlight: 'Multiple options' },
      { name: 'Aloft Rooftop', type: 'Lounge', highlight: 'City views & cocktails' },
      { name: 'Late Night Spots', type: 'Various', highlight: 'Open until late' },
    ],
  },
  {
    name: 'Seef & Diplomatic Area',
    description: 'Upscale hotel bars and sophisticated lounges',
    vibe: 'Upscale, Business, Refined',
    bestFor: 'Business drinks, premium cocktails',
    spots: [
      { name: 'Four Seasons Bahrain Bay', type: 'Hotel Bar', highlight: 'Luxury beachfront' },
      { name: 'Gulf Hotel Bars', type: 'Hotel Complex', highlight: 'Multiple venues' },
      { name: 'The Ritz-Carlton', type: 'Lounge', highlight: 'Elegant atmosphere' },
    ],
  },
  {
    name: 'Amwaj Islands',
    description: 'Island getaway with beach clubs and waterfront dining',
    vibe: 'Beach, Relaxed, Premium',
    bestFor: 'Beach day, sunset drinks',
    spots: [
      { name: 'Solymar', type: 'Beach Club', highlight: 'Beach vibes & events' },
      { name: 'Dragon Hotel', type: 'Hotel Bar', highlight: 'Asian fusion & drinks' },
      { name: 'Waterfront Venues', type: 'Various', highlight: 'Restaurants & cafes' },
    ],
  },
  {
    name: 'Diyar Al Muharraq',
    description: 'Modern waterfront development with Marassi Galleria',
    vibe: 'Waterfront, Modern, Family-friendly',
    bestFor: 'Waterfront dining, casual evening',
    spots: [
      { name: 'Marassi Galleria', type: 'Mixed', highlight: 'Restaurants & cafes' },
      { name: 'Waterfront Promenade', type: 'Various', highlight: 'Sea views & dining' },
    ],
  },
];

const tips = [
  {
    icon: Clock,
    title: 'Best Times',
    content: 'Thursday is the biggest night out (weekend starts Friday). Most clubs get going after 11 PM and stay open until 2-3 AM.',
  },
  {
    icon: Wine,
    title: 'Dress Code',
    content: 'Smart casual for most venues. Nightclubs often require no shorts/sandals for men. Ladies are generally more relaxed.',
  },
  {
    icon: MapPin,
    title: 'Getting Around',
    content: 'Use Uber/Careem for safe transport. Taxis are also available. Don\'t drink and drive - penalties are severe.',
  },
  {
    icon: Users,
    title: 'Ladies Nights',
    content: 'Many venues offer free drinks for ladies on certain nights (usually Tuesday/Wednesday). Check venue socials for deals.',
  },
];

const eventTypes = [
  { name: 'Live Music', desc: 'Jazz, rock, Filipino bands', venues: 'JJ\'s, Sherlock Holmes, various hotels' },
  { name: 'DJ Nights', desc: 'House, hip-hop, R&B', venues: 'Various clubs and lounges' },
  { name: 'Themed Parties', desc: '80s, 90s, Latin nights', venues: 'Various rotating venues' },
  { name: 'Beach Parties', desc: 'Pool parties & beach events', venues: 'Various beach clubs' },
];

export default function NightlifeGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Bahrain Nightlife Guide', url: 'https://www.bahrainnights.com/guides/nightlife' },
      ]} />
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium mb-4">
              🌙 Nightlife Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Bahrain{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Nightlife
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From sophisticated hotel lounges to buzzing nightclubs — Bahrain&apos;s nightlife scene 
              is one of the most vibrant in the Gulf.
            </p>
          </div>

          {/* Quick Facts */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Nightclubs', value: '25+', icon: Music },
              { label: 'Bars & Lounges', value: '100+', icon: Wine },
              { label: 'Hotel Bars', value: '40+', icon: Star },
              { label: 'Live Music Venues', value: '15+', icon: Volume2 },
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

      {/* Areas Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Nightlife by Area
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Each neighborhood has its own vibe. Here&apos;s where to go based on what you&apos;re looking for.
          </p>
          
          <div className="space-y-8">
            {areas.map((area) => (
              <div 
                key={area.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 text-purple-400">{area.name}</h3>
                    <p className="text-gray-300 mb-4">{area.description}</p>
                    
                    <div className="flex flex-wrap gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-gray-500">Vibe:</span>{' '}
                        <span className="text-white">{area.vibe}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Best for:</span>{' '}
                        <span className="text-white">{area.bestFor}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-1/2">
                    <h4 className="text-sm font-medium text-gray-400 mb-3">Top Spots</h4>
                    <div className="space-y-3">
                      {area.spots.map((spot) => (
                        <div key={spot.name} className="flex items-center justify-between bg-black/30 rounded-lg p-3">
                          <div>
                            <div className="font-medium">{spot.name}</div>
                            <div className="text-xs text-gray-500">{spot.type}</div>
                          </div>
                          <div className="text-xs text-purple-400">{spot.highlight}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Essential Tips
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {tips.map((tip) => (
              <div key={tip.title} className="bg-white/5 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-500/20 rounded-lg">
                    <tip.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">{tip.title}</h3>
                    <p className="text-gray-400 text-sm">{tip.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            What&apos;s On
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {eventTypes.map((event) => (
              <div key={event.name} className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-5">
                <h3 className="font-bold mb-1">{event.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{event.desc}</p>
                <p className="text-xs text-purple-300">Popular: {event.venues}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Note */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 rounded-2xl p-8 text-center">
            <Sparkles className="w-8 h-8 mx-auto mb-4 text-amber-400" />
            <h2 className="text-2xl font-bold mb-4">Good to Know</h2>
            <div className="text-gray-300 space-y-3 text-sm">
              <p>
                <strong>Alcohol:</strong> Available in licensed hotels, clubs, and restaurants. 
                Legal drinking age is 21. Non-Muslims can purchase alcohol from licensed stores.
              </p>
              <p>
                <strong>Ramadan:</strong> Many nightlife venues close or have reduced hours during 
                the holy month. Some hotel bars may still operate.
              </p>
              <p>
                <strong>Safety:</strong> Bahrain is very safe, but always arrange transport home. 
                Keep your drink in sight, and go out in groups when possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Go Out?
          </h2>
          <p className="text-gray-300 mb-8">
            Check what&apos;s happening tonight at bars and clubs across Bahrain.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/places?category=nightclub"
              className="px-8 py-3 bg-purple-500 hover:bg-purple-400 text-white font-bold rounded-lg transition-colors"
            >
              Browse Nightclubs
            </Link>
            <Link 
              href="/events"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              Tonight&apos;s Events
            </Link>
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-6">Related Guides</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: 'Things to Do in Bahrain', href: '/guides/things-to-do', emoji: '🇧🇭' },
              { title: 'Best Brunches', href: '/guides/brunches', emoji: '🥂' },
              { title: 'Dining Guide', href: '/restaurants', emoji: '🍽️' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group flex items-center gap-3"
              >
                <span className="text-2xl">{guide.emoji}</span>
                <span className="font-medium group-hover:text-purple-400 transition-colors">
                  {guide.title}
                </span>
              </Link>
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
            headline: 'Bahrain Nightlife Guide 2026',
            description: 'Complete guide to nightlife in Bahrain including the best nightclubs, bars, and lounges.',
            author: {
              '@type': 'Organization',
              name: 'BahrainNights',
              url: 'https://bahrainnights.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'BahrainNights',
            },
            datePublished: '2026-01-25',
            dateModified: '2026-01-25',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://bahrainnights.com/guides/nightlife',
            },
          }),
        }}
      />
    </div>
  );
}
