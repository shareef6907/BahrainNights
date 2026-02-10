import { Metadata } from 'next';
import Link from 'next/link';
import { Music, MapPin, Star, Calendar, Mic2, Guitar, Piano } from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';

export const metadata: Metadata = {
  title: 'Live Music in Bahrain 2026 | Best Bars, Venues & Concerts',
  description: 'Discover live music in Bahrain for 2026. From jazz bars to rock venues, Filipino bands to international concerts — find where to enjoy live performances.',
  keywords: 'live music Bahrain, live bands Bahrain, concerts Bahrain, jazz bars Manama, Filipino bands Bahrain, live entertainment Bahrain',
  openGraph: {
    title: 'Live Music in Bahrain 2026 | Best Bars & Venues',
    description: 'Complete guide to live music venues and concerts in Bahrain.',
    type: 'article',
    locale: 'en_BH',
    url: 'https://www.bahrainnights.com/guides/live-music-bahrain',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/live-music-bahrain',
  },
};

const faqs = [
  {
    q: 'Where can I find live music in Bahrain?',
    a: 'Live music is available at hotel bars (Ritz-Carlton, Gulf Hotel, Diplomat), Adliya venues (Calexico, The Warp), Juffair pubs, and major concert venues like Al Dana Amphitheatre for international acts.',
  },
  {
    q: 'What types of live music are popular in Bahrain?',
    a: 'Filipino cover bands dominate hotel lounges playing pop/rock classics. You\'ll also find jazz nights, acoustic acts, DJ sets, and occasional Arabic music. International concerts feature pop, rock, and Arabic superstars.',
  },
  {
    q: 'When are the best nights for live music?',
    a: 'Thursday and Friday nights are peak times for live music. Many venues have live bands from 9 PM onwards. Check individual venue schedules as some have music 5-6 nights per week.',
  },
  {
    q: 'How do I find out about concerts in Bahrain?',
    a: 'Check BahrainNights events page, Platinumlist for ticket sales, and venue social media. Major concerts are announced months in advance at venues like Al Dana Amphitheatre.',
  },
];

const venues = [
  {
    name: 'Al Dana Amphitheatre',
    location: 'Al Jasra',
    type: 'Concert Venue',
    capacity: '10,000',
    description: 'Bahrain\'s premier outdoor concert venue hosting international superstars from Coldplay to Arabic legends. World-class sound and production.',
    music: ['International concerts', 'Arabic stars', 'Major festivals'],
    nights: 'Special events',
  },
  {
    name: 'Sherlock Holmes Pub',
    location: 'Gulf Hotel',
    type: 'English Pub',
    capacity: '150',
    description: 'Classic British pub atmosphere with live Filipino bands playing rock and pop covers nightly. Great food and beer selection.',
    music: ['Classic rock', 'Pop covers', 'Sing-alongs'],
    nights: 'Nightly from 9 PM',
  },
  {
    name: 'Trader Vic\'s',
    location: 'Ritz-Carlton',
    type: 'Tiki Bar',
    capacity: '200',
    description: 'Polynesian paradise with live music on the terrace. Great for sundowner drinks with acoustic sets and full bands on weekends.',
    music: ['Pop covers', 'Acoustic', 'Island vibes'],
    nights: 'Wed-Sat',
  },
  {
    name: 'Calexico',
    location: 'Adliya',
    type: 'Mexican Bar',
    capacity: '100',
    description: 'Lively Mexican restaurant and bar featuring live bands on weekends. Great margaritas and energetic party atmosphere.',
    music: ['Rock covers', 'Party hits', 'Latin'],
    nights: 'Thu-Sat',
  },
  {
    name: 'The Warp',
    location: 'Adliya',
    type: 'Music Bar',
    capacity: '80',
    description: 'Underground music venue for alternative and indie acts. Host to local bands and occasional international indie artists.',
    music: ['Indie', 'Alternative', 'Local bands'],
    nights: 'Thu-Sat',
  },
  {
    name: 'JJ\'s Irish Pub',
    location: 'Juffair',
    type: 'Irish Pub',
    capacity: '150',
    description: 'Authentic Irish pub experience with live music, especially during special events and holidays. Great Guinness.',
    music: ['Irish folk', 'Rock covers', 'Pop'],
    nights: 'Weekend events',
  },
  {
    name: 'Mezzanine Lounge',
    location: 'Gulf Hotel',
    type: 'Lounge',
    capacity: '100',
    description: 'Elegant hotel lounge with jazz and acoustic performances. Sophisticated atmosphere for quiet drinks with music.',
    music: ['Jazz', 'Acoustic', 'Easy listening'],
    nights: 'Thu-Sat',
  },
  {
    name: 'Bahrain Bay Kitchen',
    location: 'Four Seasons',
    type: 'Restaurant & Bar',
    capacity: '80',
    description: 'Upscale dining with live music on select evenings. Beautiful bay views with refined acoustic performances.',
    music: ['Jazz', 'Acoustic', 'Piano'],
    nights: 'Fri-Sat',
  },
];

export default function LiveMusicBahrainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Live Music Bahrain', url: 'https://www.bahrainnights.com/guides/live-music-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium mb-4">
              🎵 Entertainment Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Live Music in{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Bahrain
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From hotel bar bands to stadium concerts — discover where to enjoy 
              live performances across the kingdom.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Venues', value: '20+', icon: Music },
              { label: 'Music Styles', value: '10+', icon: Guitar },
              { label: 'Best Nights', value: 'Thu-Sat', icon: Calendar },
              { label: 'Concerts/Year', value: '50+', icon: Mic2 },
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

      {/* Venues Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Live Music Venues</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            From intimate bars to major concert halls
          </p>
          
          <div className="grid gap-6">
            {venues.map((venue) => (
              <div 
                key={venue.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 hover:border-purple-500/30 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="text-xl font-bold">{venue.name}</h3>
                        <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                          <MapPin className="w-4 h-4" />
                          {venue.location}
                          <span className="text-purple-400">•</span>
                          <span>{venue.type}</span>
                        </div>
                      </div>
                      <div className="text-sm text-purple-400">
                        Capacity: {venue.capacity}
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{venue.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {venue.music.map((genre) => (
                        <span key={genre} className="px-3 py-1 bg-purple-500/10 text-purple-300 rounded-full text-xs">
                          {genre}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>Music nights: {venue.nights}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Music Styles */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Music Styles in Bahrain</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { style: 'Cover Bands', icon: Mic2, description: 'Filipino bands playing pop, rock, and R&B classics at hotel bars.' },
              { style: 'Jazz & Blues', icon: Piano, description: 'Sophisticated jazz nights at upscale lounges and hotels.' },
              { style: 'Rock & Indie', icon: Guitar, description: 'Alternative venues hosting local and touring rock acts.' },
              { style: 'DJ & Electronic', icon: Music, description: 'Club nights featuring local and international DJs.' },
            ].map((item) => (
              <div key={item.style} className="bg-white/5 rounded-xl p-6 text-center">
                <item.icon className="w-10 h-10 mx-auto mb-4 text-purple-400" />
                <h3 className="font-bold mb-2">{item.style}</h3>
                <p className="text-sm text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-6">
                <h3 className="font-bold mb-2 text-purple-300">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-Promo */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Hosting a Live Music Event?</h2>
            <p className="text-gray-300 mb-6 max-w-xl mx-auto">
              Cinematic Group provides professional sound & lighting, LED walls, 
              stage setup, and full event production for concerts and live performances.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://www.eventsbahrain.com" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-purple-500 hover:bg-purple-400 rounded-lg font-medium transition-colors">
                Sound & Lighting
              </a>
              <a href="https://www.filmproductionbahrain.com" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-colors">
                Concert Filming
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-6">Related Guides</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: 'Upcoming Events', href: '/events', emoji: '🎭' },
              { title: 'Nightlife Guide', href: '/guides/nightlife', emoji: '🌙' },
              { title: 'Happy Hour Deals', href: '/guides/happy-hour-bahrain', emoji: '🍻' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group flex items-center gap-3"
              >
                <span className="text-2xl">{guide.emoji}</span>
                <span className="font-medium group-hover:text-purple-400 transition-colors">{guide.title}</span>
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
            headline: 'Live Music in Bahrain 2026',
            description: 'Complete guide to live music venues and concerts in Bahrain.',
            author: { '@type': 'Organization', name: 'BahrainNights' },
            publisher: { '@type': 'Organization', name: 'BahrainNights' },
            datePublished: '2026-02-11',
            dateModified: '2026-02-11',
          }),
        }}
      />
    </div>
  );
}
