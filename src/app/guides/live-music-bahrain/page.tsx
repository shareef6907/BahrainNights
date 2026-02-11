import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Clock, Music, Star, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Live Music in Bahrain 2026 | Bars, Venues & Concert Halls',
  description: 'Find live music in Bahrain. From jazz bars and rock pubs to acoustic nights and concert venues. Complete guide to live bands, DJs, and music events in Bahrain.',
  keywords: 'live music Bahrain, live bands Bahrain, jazz bar Bahrain, rock pub Bahrain, concerts Bahrain, music venues Bahrain, DJ Bahrain, acoustic music Bahrain',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/live-music-bahrain' },
  openGraph: {
    title: 'Live Music in Bahrain 2026',
    description: 'Your guide to live music venues, bands, and concerts in Bahrain.',
    type: 'article',
    locale: 'en_BH',
  },
};

const faqs = [
  { q: 'Where can I find live music in Bahrain?', a: 'JJ\'s Irish Pub has live bands most nights. Big Texas has country/rock. Upstairs Downstairs hosts jazz. Hotel bars like Sherlock Holmes feature live acts. Check venues\' social media for schedules.' },
  { q: 'What types of live music are popular in Bahrain?', a: 'Classic rock covers, jazz, acoustic sets, and Filipino bands playing pop hits are common. EDM and house music at nightclubs. Arabic music at traditional venues and events.' },
  { q: 'Are there jazz bars in Bahrain?', a: 'Yes! Upstairs Downstairs in Adliya hosts jazz nights. Some hotel lounges feature jazz pianists and vocalists. The Bahrain Jazz Fest brings international acts annually.' },
  { q: 'When do live bands play in Bahrain?', a: 'Most live music starts around 9-10pm on weekdays, earlier on weekends. Thursday and Friday nights have the best lineups. Some venues have afternoon weekend sessions.' },
  { q: 'Are there outdoor music venues in Bahrain?', a: 'The Bahrain Bay amphitheater hosts major concerts. Spring of Culture and other festivals feature outdoor stages. Some hotels have garden venues for special events.' },
];

const venues = [
  { 
    name: 'JJ\'s Irish Pub', 
    location: 'Adliya',
    musicType: 'Rock, Pop Covers, Filipino Bands',
    schedule: 'Live music nightly from 9pm',
    highlight: 'Bahrain\'s most popular live music pub',
    rating: 4.5,
  },
  { 
    name: 'Big Texas', 
    location: 'Juffair',
    musicType: 'Country, Rock, Southern Rock',
    schedule: 'Live bands Wed-Sat from 10pm',
    highlight: 'Texas-themed venue with energetic performances',
    rating: 4.3,
  },
  { 
    name: 'Upstairs Downstairs', 
    location: 'Adliya',
    musicType: 'Jazz, Soul, Acoustic',
    schedule: 'Jazz nights weekly, check schedule',
    highlight: 'Intimate jazz bar atmosphere',
    rating: 4.4,
  },
  { 
    name: 'Sherlock Holmes Pub', 
    location: 'Gulf Hotel, Adliya',
    musicType: 'Classic Rock, Pop Covers',
    schedule: 'Live bands Thu-Sat from 9:30pm',
    highlight: 'British pub with professional bands',
    rating: 4.2,
  },
  { 
    name: 'Nirvana', 
    location: 'Diplomatic Area',
    musicType: 'Indian Live Music, Bollywood',
    schedule: 'Live performances nightly',
    highlight: 'Indian restaurant with live entertainment',
    rating: 4.1,
  },
  { 
    name: 'The Bahrain Bay', 
    location: 'Bahrain Bay',
    musicType: 'Major Concerts & Events',
    schedule: 'Scheduled concerts',
    highlight: 'Outdoor amphitheater for big acts',
    rating: 4.6,
  },
  { 
    name: 'Club 360', 
    location: 'Seef',
    musicType: 'EDM, House, International DJs',
    schedule: 'Thu-Sat from 11pm',
    highlight: 'Top nightclub with guest DJs',
    rating: 4.3,
  },
  { 
    name: 'Trader Vic\'s', 
    location: 'The Ritz-Carlton, Seef',
    musicType: 'Live Band, Lounge Music',
    schedule: 'Live music Thu-Sat',
    highlight: 'Upscale tiki bar with performances',
    rating: 4.4,
  },
];

export default function LiveMusicBahrainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-pink-950/20 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Live Music', url: 'https://www.bahrainnights.com/guides/live-music-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-red-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-pink-500/20 text-pink-400 rounded-full text-sm font-medium mb-4">🎸 Activity Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent">Live Music</span> in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From intimate jazz bars to rocking pubs and international concerts — 
              discover where to enjoy live music performances across the Kingdom.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
          <p>
            Bahrain&apos;s live music scene punches above its weight. Despite being a small island, 
            the Kingdom hosts a vibrant array of live performances — from nightly cover bands at 
            popular pubs to international artists at major venues. Whether you&apos;re into rock, jazz, 
            acoustic sets, or electronic beats, you&apos;ll find your sound here.
          </p>
          <p>
            The live music culture is strongest in Adliya and Juffair, where bars compete for 
            audiences with quality acts. Filipino bands are particularly popular, known for their 
            versatility and ability to play everything from The Beatles to Bruno Mars. Hotel venues 
            often feature more polished acts, while independent bars offer raw, energetic performances.
          </p>
        </div>
      </section>

      {/* Venue Cards */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Live Music Venues</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {venues.map((venue, index) => (
              <div 
                key={venue.name}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-pink-400/50 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-pink-400 text-sm font-medium">#{index + 1}</span>
                    <h3 className="text-xl font-bold text-white">{venue.name}</h3>
                    <p className="text-gray-400 text-sm flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {venue.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-pink-500/20 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 text-pink-400 fill-pink-400" />
                    <span className="text-pink-400 font-medium">{venue.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-yellow-400 text-sm mb-2">
                  <Music className="w-4 h-4" />
                  <span>{venue.musicType}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                  <Clock className="w-4 h-4" />
                  <span>{venue.schedule}</span>
                </div>
                <p className="text-gray-300 text-sm">{venue.highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Genre Guide */}
      <section className="py-12 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Music by Genre</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-pink-400 mb-3">🎸 Rock & Pop Covers</h3>
              <p className="text-gray-300">
                The most common live music in Bahrain. Filipino bands excel at covering everything 
                from classic rock to current hits. Best venues: JJ&apos;s Irish Pub, Big Texas, Sherlock Holmes.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-pink-400 mb-3">🎷 Jazz & Blues</h3>
              <p className="text-gray-300">
                A growing scene with dedicated nights at select venues. Upstairs Downstairs leads 
                the jazz scene. The annual Bahrain Jazz Fest brings international artists.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-pink-400 mb-3">🎹 Acoustic & Singer-Songwriter</h3>
              <p className="text-gray-300">
                Intimate performances at cafes and lounges. Great for a chill evening. Check 
                Adliya cafes and hotel lounges for acoustic sets.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-pink-400 mb-3">🎧 DJ & Electronic</h3>
              <p className="text-gray-300">
                Nightclubs feature resident and guest DJs playing house, EDM, and hip-hop. 
                Club 360, B-Lounge, and hotel clubs host international DJs regularly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More Entertainment</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guides/happy-hour-bahrain" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all">
              Happy Hour →
            </Link>
            <Link href="/guides/nightlife" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all">
              Nightlife Guide →
            </Link>
            <Link href="/events" className="px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-full font-medium hover:shadow-lg transition-all">
              Upcoming Concerts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
