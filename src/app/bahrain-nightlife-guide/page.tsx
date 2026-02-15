import { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { 
  MapPin, Star, Clock, Music, Wine, Moon, Sparkles,
  Users, Calendar, ArrowRight, Volume2, PartyPopper,
  Martini, Mic2, Guitar, Disc3, Heart, Camera
} from 'lucide-react';

// SEO Optimized Metadata
export const metadata: Metadata = {
  title: 'Bahrain Nightlife Guide (2026) — Best Bars, Clubs & Parties | BahrainNights',
  description: 'The ultimate Bahrain nightlife guide for 2026! Discover the best bars, clubs, lounges, and party spots in Juffair, Adliya, and beyond. Ladies nights, live music, and more.',
  keywords: [
    'Bahrain nightlife', 'bars in Bahrain', 'clubs in Bahrain', 'Bahrain party',
    'Juffair nightlife', 'Adliya bars', 'Bahrain ladies night', 'nightclubs Bahrain',
    'best bars Bahrain', 'Bahrain clubbing', 'party in Bahrain', 'live music Bahrain',
    'Bahrain lounges', 'rooftop bars Bahrain', 'where to party Bahrain',
    'Bahrain night out', 'Bahrain DJ', 'Bahrain weekend'
  ].join(', '),
  alternates: {
    canonical: 'https://www.bahrainnights.com/bahrain-nightlife-guide',
  },
  openGraph: {
    title: 'Bahrain Nightlife Guide (2026) — Best Bars, Clubs & Parties',
    description: 'Your complete guide to nightlife in Bahrain. From upscale lounges to legendary clubs.',
    url: 'https://www.bahrainnights.com/bahrain-nightlife-guide',
    siteName: 'BahrainNights',
    images: [
      {
        url: 'https://www.bahrainnights.com/og-nightlife.jpg',
        width: 1200,
        height: 630,
        alt: 'Bahrain Nightlife Guide',
      },
    ],
    type: 'article',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bahrain Nightlife Guide (2026)',
    description: 'Best bars, clubs & parties in Bahrain!',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

interface NightlifeEvent {
  id: string;
  title: string;
  slug: string;
  venue_name: string;
  date: string;
  category: string;
  cover_url: string;
}

async function getNightlifeEvents(): Promise<NightlifeEvent[]> {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const today = new Date().toISOString().split('T')[0];
    
    const { data } = await supabase
      .from('events')
      .select('id, title, slug, venue_name, date, category, cover_url')
      .eq('status', 'published')
      .eq('is_hidden', false)
      .in('category', ['nightlife', 'music', 'party', 'concert'])
      .gte('date', today)
      .order('date', { ascending: true })
      .limit(6);
    
    return data || [];
  } catch {
    return [];
  }
}

// JSON-LD Schema
function generateSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': 'https://www.bahrainnights.com/bahrain-nightlife-guide#article',
        headline: 'Bahrain Nightlife Guide — Best Bars, Clubs & Parties 2026',
        description: 'The complete guide to nightlife in Bahrain. Discover the best bars, clubs, and party spots.',
        author: {
          '@type': 'Organization',
          name: 'BahrainNights'
        },
        publisher: {
          '@type': 'Organization',
          name: 'BahrainNights',
          logo: {
            '@type': 'ImageObject',
            url: 'https://www.bahrainnights.com/logo.png'
          }
        },
        datePublished: '2026-01-15',
        dateModified: new Date().toISOString().split('T')[0],
      },
      {
        '@type': 'ItemList',
        name: 'Best Nightlife Spots in Bahrain',
        numberOfItems: 25,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Club Downtown', description: 'Premier nightclub in Juffair' },
          { '@type': 'ListItem', position: 2, name: 'CUT Lounge', description: 'Upscale rooftop at Four Seasons' },
          { '@type': 'ListItem', position: 3, name: 'Block 338', description: 'Entertainment hub in Adliya' },
          { '@type': 'ListItem', position: 4, name: 'Bushido Lounge', description: 'Sophisticated cocktail bar' },
          { '@type': 'ListItem', position: 5, name: 'JJ\'s Irish Pub', description: 'Live music and sports' },
        ]
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.bahrainnights.com' },
          { '@type': 'ListItem', position: 2, name: 'Bahrain Nightlife Guide', item: 'https://www.bahrainnights.com/bahrain-nightlife-guide' }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Is nightlife good in Bahrain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! Bahrain has the most liberal nightlife in the Gulf region. You\'ll find everything from sophisticated rooftop lounges to pumping nightclubs, live music venues, and beach clubs. The scene is diverse and welcoming to all nationalities.'
            }
          },
          {
            '@type': 'Question',
            name: 'Where is the best nightlife area in Bahrain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Juffair is the main nightlife hub with numerous clubs and bars. Adliya is more upscale with cocktail bars and restaurants. Hotel bars (Four Seasons, Ritz-Carlton, Gulf Hotel) offer sophisticated lounges. Each area has its own vibe.'
            }
          }
        ]
      }
    ]
  };
}

const neighborhoods = [
  {
    name: 'Juffair',
    tagline: 'The Party District',
    icon: PartyPopper,
    color: 'from-pink-500 to-rose-600',
    description: 'The heart of Bahrain\'s nightlife scene. Multiple clubs, bars, and late-night venues packed into a few blocks. This is where the party happens every night of the week.',
    vibe: 'Energetic, diverse, loud, fun',
    bestFor: 'Clubbing, bar hopping, late nights',
    venues: [
      { name: 'Club Downtown', type: 'Nightclub', desc: 'Premier nightclub with international DJs, VIP sections, and huge dance floor. Thursday and Friday nights are legendary.', hours: '10pm-3am', link: '/nightclubs' },
      { name: 'Wrangler\'s', type: 'Country Bar', desc: 'Unique country-western themed bar with live music, dancing, and American comfort food.', hours: '8pm-2am', link: '/lounges-bars' },
      { name: 'Diggers', type: 'Sports Bar', desc: 'Popular expat hangout with multiple screens, pool tables, and great pub atmosphere.', hours: '12pm-2am', link: '/lounges-bars' },
      { name: 'Club Paparazzi', type: 'Nightclub', desc: 'Bollywood nights, hip-hop, and mixed music. Popular with diverse crowds.', hours: '10pm-3am', link: '/nightclubs' },
      { name: 'Typhoon', type: 'Lounge Bar', desc: 'Asian-inspired lounge with creative cocktails and late-night dining.', hours: '6pm-2am', link: '/lounges-bars' },
      { name: 'JJ\'s Irish Pub', type: 'Pub', desc: 'Classic Irish pub with live music, quiz nights, and friendly atmosphere.', hours: '12pm-2am', link: '/lounges-bars' },
    ]
  },
  {
    name: 'Adliya',
    tagline: 'The Trendy Quarter',
    icon: Martini,
    color: 'from-purple-500 to-indigo-600',
    description: 'Bahrain\'s coolest neighborhood. Art galleries, boutique bars, rooftop terraces, and the famous Block 338. More sophisticated than Juffair, perfect for a classy night out.',
    vibe: 'Trendy, artistic, upscale casual',
    bestFor: 'Cocktails, dinner dates, bar hopping',
    venues: [
      { name: 'Block 338', type: 'Entertainment Complex', desc: 'The iconic Adliya destination with multiple bars, restaurants, and rooftop venues under one umbrella.', hours: '6pm-2am', link: '/lounges-bars' },
      { name: 'Hazel Rooftop', type: 'Rooftop Bar', desc: 'Stunning rooftop lounge with city views, craft cocktails, and sophisticated vibe.', hours: '6pm-1am', link: '/lounges-bars' },
      { name: 'Coda Jazz Lounge', type: 'Jazz Club', desc: 'Intimate jazz venue with live performances. Best cocktails in Adliya.', hours: '8pm-2am', link: '/lounges-bars' },
      { name: 'Segafredo', type: 'Bar & Café', desc: 'Italian-inspired spot perfect for aperitivo and people watching on the terrace.', hours: '8am-1am', link: '/lounges-bars' },
      { name: 'Zoe\'s', type: 'Wine Bar', desc: 'Cozy wine bar with excellent selection and cheese boards.', hours: '6pm-12am', link: '/lounges-bars' },
    ]
  },
  {
    name: 'Hotel Scene',
    tagline: 'Sophisticated Elegance',
    icon: Wine,
    color: 'from-amber-500 to-orange-600',
    description: 'Bahrain\'s luxury hotels host world-class bars and lounges. Expect premium service, creative mixology, and stunning settings. Perfect for special occasions or a refined night out.',
    vibe: 'Luxurious, elegant, exclusive',
    bestFor: 'Fine cocktails, date nights, celebrations',
    venues: [
      { name: 'CUT Lounge', type: 'Rooftop Bar', desc: 'Four Seasons rooftop with panoramic views, signature cocktails, and A-list atmosphere.', hours: '6pm-1am', link: '/lounges-bars' },
      { name: 'Bushido Lounge', type: 'Cocktail Bar', desc: 'Japanese-inspired cocktail bar at Ritz-Carlton. Exceptional drinks and ambiance.', hours: '6pm-1am', link: '/lounges-bars' },
      { name: 'Trader Vic\'s', type: 'Tiki Bar', desc: 'Legendary Polynesian bar at Ritz-Carlton. Famous for Mai Tais and pupu platters.', hours: '12pm-1am', link: '/lounges-bars' },
      { name: 'Sherlock Holmes', type: 'English Pub', desc: 'Gulf Hotel\'s British pub with real ales, pub quiz, and cozy atmosphere.', hours: '12pm-2am', link: '/lounges-bars' },
      { name: 'Zenj', type: 'Nightclub', desc: 'Gulf Hotel\'s iconic nightclub with live DJs and resident bands.', hours: '10pm-3am', link: '/nightclubs' },
      { name: 'Vox', type: 'Lounge', desc: 'InterContinental\'s stylish lounge with live music and dancing.', hours: '8pm-2am', link: '/lounges-bars' },
    ]
  },
  {
    name: 'Beach Clubs',
    tagline: 'Day-to-Night Parties',
    icon: Moon,
    color: 'from-cyan-500 to-blue-600',
    description: 'Bahrain\'s beach clubs offer the complete experience — pool parties during the day, sunset cocktails, and some continue into the night with DJs and dancing.',
    vibe: 'Relaxed, fun, social',
    bestFor: 'Pool parties, sunset drinks, weekend vibes',
    venues: [
      { name: 'Coral Bay', type: 'Beach Club', desc: 'The original beach club with pool, beach, and regular party events. Friday brunch is legendary.', hours: '10am-10pm', link: '/beach-pool-clubs' },
      { name: 'Jumeirah Beach', type: 'Beach Club', desc: 'Luxury beach club with infinity pool, cabanas, and upscale atmosphere.', hours: '10am-8pm', link: '/beach-pool-clubs' },
      { name: 'Ritz Beach Club', type: 'Beach Club', desc: 'Exclusive beach with premium amenities. Sunset drinks are magical.', hours: '9am-7pm', link: '/beach-pool-clubs' },
      { name: 'Sofitel Beach', type: 'Beach & Pool', desc: 'Beautiful setting with sea views. Popular for weekend relaxation.', hours: '9am-sunset', link: '/beach-pool-clubs' },
    ]
  }
];

const ladiesNights = [
  { day: 'Sunday', venues: ['Bushido Lounge', 'Trader Vic\'s'] },
  { day: 'Monday', venues: ['CUT Lounge', 'Block 338'] },
  { day: 'Tuesday', venues: ['Zenj', 'Club Downtown'] },
  { day: 'Wednesday', venues: ['Hazel Rooftop', 'Coda'] },
  { day: 'Thursday', venues: ['Most hotels', 'Juffair bars'] },
];

const liveMusic = [
  { name: 'JJ\'s Irish Pub', type: 'Rock/Pop covers', days: 'Daily', location: 'Juffair' },
  { name: 'Coda Jazz Lounge', type: 'Jazz/Blues', days: 'Thu-Sat', location: 'Adliya' },
  { name: 'Sherlock Holmes', type: 'Acoustic/Pop', days: 'Wed-Sat', location: 'Gulf Hotel' },
  { name: 'Zenj', type: 'Live band & DJ', days: 'Tue-Sat', location: 'Gulf Hotel' },
  { name: 'Gulf Hotel Lobby', type: 'Piano/Jazz', days: 'Daily', location: 'Gulf Hotel' },
  { name: 'Wrangler\'s', type: 'Country/Rock', days: 'Thu-Sat', location: 'Juffair' },
];

const tips = [
  { title: 'Dress Code', desc: 'Smart casual is standard. No shorts, flip-flops, or sportswear at upscale venues. Clubs require stylish attire — when in doubt, overdress.' },
  { title: 'Timing', desc: 'Bahrainis eat late. Bars fill up around 10-11pm. Clubs don\'t get busy until midnight. The party peaks between 1-3am on weekends.' },
  { title: 'ID Required', desc: 'Always carry ID (passport or CPR). 21+ for bars and clubs. Hotels may be stricter about dress and age policies.' },
  { title: 'Transportation', desc: 'Use taxis or ride-hailing apps. Never drink and drive — Bahrain has zero tolerance. Parking is available but limited in busy areas.' },
  { title: 'Prices', desc: 'Drinks cost 4-8 BHD at bars, 8-15 BHD at upscale lounges. Happy hours offer 50% off. Ladies nights offer free drinks (limited).' },
  { title: 'Weekend', desc: 'The weekend runs Thursday-Friday. Thursday night is the main party night. Wednesday is also popular (ladies nights). Friday is more relaxed.' },
];

export default async function NightlifePage() {
  const events = await getNightlifeEvents();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSchema()) }}
      />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-pink-900/40" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-pulse" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <nav className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li>/</li>
                <li className="text-white">Bahrain Nightlife Guide</li>
              </ol>
            </nav>

            <div className="text-center">
              <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full text-purple-300 text-sm mb-4">
                🌙 Where to Go Tonight
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Bahrain Nightlife Guide
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                The most comprehensive guide to Bahrain's bars, clubs, and party scene. 
                From rooftop cocktails to legendary dance floors — this is where the night comes alive.
              </p>
              
              <div className="flex flex-wrap justify-center gap-8 mt-10">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">50+</div>
                  <div className="text-sm text-gray-400">Venues</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-400">4</div>
                  <div className="text-sm text-gray-400">Areas</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400">7</div>
                  <div className="text-sm text-gray-400">Nights a Week</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-8 px-4 border-y border-gray-800">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3">
              {neighborhoods.map((n) => (
                <a
                  key={n.name}
                  href={`#${n.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`px-4 py-2 rounded-full bg-gradient-to-r ${n.color} text-white text-sm font-medium hover:opacity-90 transition flex items-center gap-2`}
                >
                  <n.icon className="w-4 h-4" />
                  {n.name}
                </a>
              ))}
              <a href="#ladies-nights" className="px-4 py-2 rounded-full bg-pink-600 text-white text-sm font-medium hover:opacity-90 transition">
                👠 Ladies Nights
              </a>
              <a href="#live-music" className="px-4 py-2 rounded-full bg-amber-600 text-white text-sm font-medium hover:opacity-90 transition">
                🎵 Live Music
              </a>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
            <h2 className="text-3xl font-bold text-white mb-6">Why Bahrain for Nightlife?</h2>
            <p className="text-gray-300 leading-relaxed">
              Bahrain has long been the Gulf's party destination. While its neighbors have varying restrictions, 
              Bahrain offers a <strong>liberal and welcoming nightlife scene</strong> that draws visitors from 
              Saudi Arabia, Qatar, and beyond.
            </p>
            <p className="text-gray-300 leading-relaxed">
              The scene is remarkably diverse. You'll find everything from <strong>sophisticated hotel lounges</strong> 
              serving craft cocktails with stunning views, to <strong>pumping nightclubs</strong> with international 
              DJs, to <strong>cozy pubs</strong> with live music and friendly faces. Every night of the week has 
              something going on.
            </p>
            <p className="text-gray-300 leading-relaxed">
              This guide breaks down the best venues by neighborhood, covers the famous ladies nights, 
              and gives you insider tips to make the most of your night out in Bahrain.
            </p>
          </div>
        </section>

        {/* Neighborhoods */}
        {neighborhoods.map((neighborhood) => (
          <section 
            key={neighborhood.name} 
            id={neighborhood.name.toLowerCase().replace(/\s+/g, '-')}
            className="py-16 px-4"
          >
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-3">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${neighborhood.color}`}>
                    <neighborhood.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">{neighborhood.name}</h2>
                    <p className="text-lg text-gray-400">{neighborhood.tagline}</p>
                  </div>
                </div>
                <p className="text-gray-300 max-w-3xl mt-4">{neighborhood.description}</p>
                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="px-3 py-1 bg-gray-800 rounded-lg text-sm">
                    <span className="text-gray-400">Vibe:</span> <span className="text-white">{neighborhood.vibe}</span>
                  </div>
                  <div className="px-3 py-1 bg-gray-800 rounded-lg text-sm">
                    <span className="text-gray-400">Best for:</span> <span className="text-white">{neighborhood.bestFor}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {neighborhood.venues.map((venue) => (
                  <Link 
                    key={venue.name} 
                    href={venue.link}
                    className="group p-6 bg-gray-800/50 hover:bg-gray-800 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium bg-gradient-to-r ${neighborhood.color} text-white mb-2`}>
                          {venue.type}
                        </span>
                        <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition">
                          {venue.name}
                        </h3>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-3">{venue.desc}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      {venue.hours}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Ladies Nights */}
        <section id="ladies-nights" className="py-16 px-4 bg-gradient-to-r from-pink-900/30 to-purple-900/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                👠 Ladies Nights in Bahrain
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Ladies nights are a Gulf tradition. Free drinks (usually up to 3-4), free entry, and 
                great vibes. Here's when and where:
              </p>
            </div>
            
            <div className="grid md:grid-cols-5 gap-4">
              {ladiesNights.map((night) => (
                <div key={night.day} className="bg-gray-800/50 rounded-xl p-4 text-center">
                  <div className="text-lg font-semibold text-pink-400 mb-3">{night.day}</div>
                  {night.venues.map((venue) => (
                    <div key={venue} className="text-gray-300 text-sm py-1">{venue}</div>
                  ))}
                </div>
              ))}
            </div>
            
            <p className="text-center text-gray-400 text-sm mt-6">
              * Offerings change regularly. Check with venues for current promotions.
            </p>
          </div>
        </section>

        {/* Live Music */}
        <section id="live-music" className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                <Music className="w-8 h-8 text-amber-400" />
                Live Music Venues
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Bahrain has a thriving live music scene with resident bands, jazz nights, and visiting artists.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveMusic.map((venue) => (
                <div key={venue.name} className="bg-gray-800/50 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-amber-500/20 rounded-lg">
                      <Guitar className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{venue.name}</h3>
                      <p className="text-sm text-amber-400">{venue.type}</p>
                      <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                        <Calendar className="w-4 h-4" /> {venue.days}
                        <span>•</span>
                        <MapPin className="w-4 h-4" /> {venue.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        {events.length > 0 && (
          <section className="py-16 px-4 bg-gray-800/30">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <PartyPopper className="w-8 h-8 text-purple-400" />
                  Upcoming Parties & Events
                </h2>
                <Link 
                  href="/events?category=nightlife" 
                  className="text-purple-400 hover:text-purple-300 flex items-center gap-2"
                >
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {events.map((event) => (
                  <Link
                    key={event.id}
                    href={`/events/${event.slug}`}
                    className="group bg-gray-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-purple-500 transition"
                  >
                    {event.cover_url && (
                      <div className="aspect-video bg-gray-700">
                        <img 
                          src={event.cover_url} 
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <div className="text-sm text-purple-400 mb-2">
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                      <h3 className="font-semibold text-white group-hover:text-purple-300 transition line-clamp-2">
                        {event.title}
                      </h3>
                      {event.venue_name && (
                        <div className="text-sm text-gray-400 mt-2 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {event.venue_name}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Tips Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-10">Insider Tips</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tips.map((tip) => (
                <div key={tip.title} className="bg-gray-800/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">{tip.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-10">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Is nightlife good in Bahrain?</h3>
                <p className="text-gray-300">
                  Yes! Bahrain has the most liberal nightlife in the Gulf region. You'll find everything from 
                  sophisticated rooftop lounges to pumping nightclubs, live music venues, and beach clubs. 
                  The scene is diverse and welcoming to all nationalities.
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Where is the best nightlife area in Bahrain?</h3>
                <p className="text-gray-300">
                  Juffair is the main nightlife hub with numerous clubs and bars. Adliya is more upscale with 
                  cocktail bars and restaurants. Hotel bars (Four Seasons, Ritz-Carlton, Gulf Hotel) offer 
                  sophisticated lounges. Each area has its own vibe.
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">What time do clubs close in Bahrain?</h3>
                <p className="text-gray-300">
                  Bars typically close around 1-2am. Nightclubs stay open until 3am on weekends (Thursday/Friday). 
                  Some venues have after-hours on special occasions. The party peaks between midnight and 2am.
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Are tourists allowed in Bahrain bars?</h3>
                <p className="text-gray-300">
                  Absolutely! Bahrain's bars and clubs welcome tourists. Bring your passport as ID. 
                  The drinking age is 21. Most venues are in hotels or licensed areas. 
                  Smart casual dress code applies at upscale venues.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Guides */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-10">Explore More</h2>
            
            <div className="grid md:grid-cols-4 gap-4">
              <Link href="/guides/nightlife-juffair" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition text-center group">
                <PartyPopper className="w-8 h-8 text-pink-400 mx-auto mb-3" />
                <h3 className="font-semibold text-white group-hover:text-pink-300">Juffair Guide</h3>
                <p className="text-sm text-gray-400 mt-2">Complete Juffair nightlife</p>
              </Link>
              
              <Link href="/guides/ladies-nights" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition text-center group">
                <Heart className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <h3 className="font-semibold text-white group-hover:text-purple-300">Ladies Nights</h3>
                <p className="text-sm text-gray-400 mt-2">Free drinks & entry</p>
              </Link>
              
              <Link href="/guides/beach-clubs" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition text-center group">
                <Moon className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                <h3 className="font-semibold text-white group-hover:text-cyan-300">Beach Clubs</h3>
                <p className="text-sm text-gray-400 mt-2">Day-to-night parties</p>
              </Link>
              
              <Link href="/events" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition text-center group">
                <Calendar className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                <h3 className="font-semibold text-white group-hover:text-amber-300">Events</h3>
                <p className="text-sm text-gray-400 mt-2">What's happening tonight</p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-purple-900/40 to-pink-900/40">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready for a Night Out?</h2>
            <p className="text-gray-300 text-lg mb-8">
              Check out tonight's events, upcoming parties, and exclusive offers.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/events?category=nightlife"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold hover:opacity-90 transition"
              >
                Tonight's Events
              </Link>
              <Link 
                href="/lounges-bars"
                className="px-8 py-4 bg-gray-800 rounded-full text-white font-semibold hover:bg-gray-700 transition"
              >
                Browse Venues
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
