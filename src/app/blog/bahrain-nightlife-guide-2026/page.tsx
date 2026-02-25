import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Music, MapPin, Star, Clock, ArrowRight, Sparkles,
  Wine, Users, PartyPopper, Moon, Martini, Volume2,
  Calendar, Heart, Flame, ChevronRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'The Ultimate Bahrain Nightlife Guide 2026 — Clubs & Lounges | BahrainNights',
  description: 'Your complete guide to Bahrain nightlife in 2026. Discover the best nightclubs, rooftop lounges, live music venues, and ladies nights across Juffair, Adliya, and Seef.',
  keywords: [
    'Bahrain nightlife 2026', 'best lounges Bahrain', 'nightclubs Bahrain', 'Juffair nightlife',
    'Adliya lounges', 'ladies night Bahrain', 'rooftop lounges Bahrain', 'live music Bahrain',
    'Bahrain clubs', 'best lounges Bahrain', 'night out Bahrain', 'Bahrain party scene'
  ].join(', '),
  alternates: {
    canonical: 'https://www.bahrainnights.com/blog/bahrain-nightlife-guide-2026',
  },
  openGraph: {
    title: 'The Ultimate Bahrain Nightlife Guide 2026',
    description: 'Your complete guide to Bahrain\'s best clubs and lounges in 2026.',
    url: 'https://www.bahrainnights.com/blog/bahrain-nightlife-guide-2026',
    siteName: 'BahrainNights',
    images: [
      {
        url: 'https://www.bahrainnights.com/og-nightlife-guide-2026.jpg',
        width: 1200,
        height: 630,
        alt: 'Bahrain Nightlife Guide 2026',
      },
    ],
    type: 'article',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Ultimate Bahrain Nightlife Guide 2026',
    description: 'Your complete guide to Bahrain\'s nightlife scene!',
  },
  authors: [{ name: 'BahrainNights Team' }],
  robots: {
    index: true,
    follow: true,
  },
};

function generateSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'The Ultimate Bahrain Nightlife Guide 2026',
        description: 'Your complete guide to Bahrain\'s best clubs, bars, and lounges in 2026.',
        image: 'https://www.bahrainnights.com/og-nightlife-guide-2026.jpg',
        author: {
          '@type': 'Organization',
          name: 'BahrainNights Team',
          url: 'https://www.bahrainnights.com'
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
        dateModified: '2026-02-15',
        mainEntityOfPage: 'https://www.bahrainnights.com/blog/bahrain-nightlife-guide-2026'
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is the legal drinking age in Bahrain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The legal drinking age in Bahrain is 21. You will need to show valid ID (passport or CPR) at clubs and bars.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is the dress code for Bahrain nightclubs?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Most upscale clubs enforce smart casual to formal dress codes. Men should wear collared shirts and closed shoes. Avoid sportswear, flip-flops, and shorts. Ladies have more flexibility but should dress elegantly.'
            }
          },
          {
            '@type': 'Question',
            name: 'When is ladies night in Bahrain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ladies nights are typically held on Tuesdays, Wednesdays, and Thursdays at various venues. Women often receive free entry and complimentary drinks during specified hours.'
            }
          },
          {
            '@type': 'Question',
            name: 'What time do clubs close in Bahrain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Most nightclubs stay open until 2 AM on weekdays and 3 AM on weekends (Thursday and Friday nights). Some venues may close earlier during Ramadan.'
            }
          },
          {
            '@type': 'Question',
            name: 'Where is the best nightlife area in Bahrain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Juffair is the main nightlife hub with numerous bars and clubs. Adliya offers a more upscale, artsy vibe with cocktail lounges. Bahrain Bay and the hotel districts also have excellent rooftop venues.'
            }
          }
        ]
      }
    ]
  };
}

const nightlifeDistricts = [
  {
    name: 'Juffair',
    desc: 'The undisputed heart of Bahrain\'s nightlife. This vibrant district is packed with bars, clubs, and late-night eateries catering to every taste and budget.',
    highlights: ['International bars', 'Live sports venues', 'Late-night food', 'Diverse crowd'],
    vibe: 'Energetic & diverse',
    bestFor: 'Bar-hopping, casual nights out',
    color: 'from-purple-500 to-pink-600'
  },
  {
    name: 'Adliya',
    desc: 'Bahrain\'s artsy, upscale nightlife destination. Think craft cocktails, chic lounges, and a more sophisticated crowd enjoying fine drinks and conversation.',
    highlights: ['Cocktail lounges', 'Art galleries', 'Boutique venues', 'Foodie scene'],
    vibe: 'Sophisticated & trendy',
    bestFor: 'Date nights, upscale evenings',
    color: 'from-amber-500 to-orange-600'
  },
  {
    name: 'Bahrain Bay',
    desc: 'Home to the Four Seasons and stunning skyline views. This area offers premium rooftop bars and elegant hotel lounges with unmatched ambiance.',
    highlights: ['Rooftop bars', 'Bay views', 'Luxury hotels', 'Fine dining'],
    vibe: 'Glamorous & refined',
    bestFor: 'Special occasions, skyline views',
    color: 'from-cyan-500 to-blue-600'
  },
  {
    name: 'Seef District',
    desc: 'The commercial heart of Bahrain transforms after dark with hotel bars, shisha lounges, and entertainment venues near the malls.',
    highlights: ['Hotel bars', 'Shisha lounges', 'Convenient location', 'Shopping nearby'],
    vibe: 'Accessible & varied',
    bestFor: 'After-work drinks, casual outings',
    color: 'from-green-500 to-emerald-600'
  }
];

const venueTypes = [
  {
    type: 'Nightclubs',
    icon: Music,
    venues: [
      { name: 'Block 338', location: 'Adliya', desc: 'Trendy club with rotating themes and events. Known for its house music nights and fashion-forward crowd.' },
      { name: 'The One Club', location: 'Diplomat Hotel', desc: 'Bahrain institution with multiple dance floors and a loyal following. Arabic nights on Wednesdays are legendary.' },
      { name: 'Bushido by Buddha-Bar', location: 'Ritz-Carlton, Seef', desc: 'Chic lounge and nightclub inspired by Japanese mysticism. Perfect blend of dining and late-night entertainment.' },
    ]
  },
  {
    type: 'Rooftop Bars & Lounges',
    icon: Moon,
    venues: [
      { name: 'CUT by Wolfgang Puck', location: 'Four Seasons, Bahrain Bay', desc: 'Premium steakhouse with a spectacular lounge area. Stunning views of the bay and city skyline.' },
      { name: 'Sky Lounge', location: 'Four Seasons, Bahrain Bay', desc: 'Sophisticated rooftop bar with panoramic bay views and expertly crafted cocktails.' },
      { name: 'La Fontaine', location: 'Manama (Hoora)', desc: 'Art center and restaurant in a 150-year-old heritage building. Intimate atmosphere for evening gatherings.' },
      { name: 'Trader Vic\'s', location: 'Ritz-Carlton, Seef', desc: 'Legendary Polynesian bar on the ground floor by the lagoon. Famous for Mai Tais and pupu platters in a tiki-themed setting.' },
    ]
  },
  {
    type: 'Live Music Venues',
    icon: Volume2,
    venues: [
      { name: 'JJ\'s Irish Pub', location: 'Juffair & Adliya', desc: 'Live bands most nights playing rock, pop, and crowd favorites. Great atmosphere and friendly vibe.' },
      { name: 'Sherlock Holmes Pub', location: 'Gulf Hotel', desc: 'British pub atmosphere with live music weekends and quiz nights. A Bahrain institution.' },
      { name: 'Thai Lounge', location: 'Ritz-Carlton, Seef', desc: 'Evening DJ entertainment with Asian-inspired cocktails and small plates.' },
    ]
  },
  {
    type: 'Cocktail Lounges',
    icon: Martini,
    venues: [
      { name: 'Burlington Club', location: 'Ritz-Carlton, Seef', desc: 'Sophisticated gentleman\'s club atmosphere with premium cigars and fine cognacs.' },
      { name: 'The Lobby Lounge', location: 'Ritz-Carlton, Seef', desc: 'Elegant lounge with classical trio and world-famous afternoon tea service.' },
      { name: 're/Asian Cuisine', location: 'Four Seasons, Bahrain Bay', desc: 'Chic Asian-fusion lounge with creative cocktails and stunning bay views.' },
      { name: 'Bahri Bar', location: 'Four Seasons, Bahrain Bay', desc: 'Sophisticated waterfront bar with Gulf views and expertly crafted cocktails.' },
    ]
  }
];

const ladiesNightGuide = [
  { day: 'Tuesday', venues: 'Multiple hotel bars and lounges', details: 'Most venues offer 3-4 complimentary drinks for ladies' },
  { day: 'Wednesday', venues: 'The One Club, CUT, various bars', details: 'Arabic night themes at many venues; ladies specials available' },
  { day: 'Thursday', venues: 'Almost everywhere', details: 'The biggest night out — weekend starts here with full ladies night deals' },
];

const weeklyHighlights = [
  { day: 'Sunday', theme: 'Recovery Mode', desc: 'Quiet nights at lounges; some sports bars showing live games' },
  { day: 'Monday', theme: 'Industry Night', desc: 'F&B workers\' night out; late-night spots offer deals' },
  { day: 'Tuesday', theme: 'Ladies Night Begins', desc: 'First wave of ladies nights across the city' },
  { day: 'Wednesday', theme: 'Midweek Momentum', desc: 'Arabic nights, live music, building energy' },
  { day: 'Thursday', theme: 'Weekend Kickoff', desc: 'The biggest night — everyone is out, clubs are packed' },
  { day: 'Friday', theme: 'Post-Brunch Party', desc: 'Brunch flows into evening drinks and dancing' },
  { day: 'Saturday', theme: 'Chill Sessions', desc: 'Relaxed vibes before the work week; rooftop bars shine' },
];

const proTips = [
  { title: 'Guest Lists Matter', tip: 'Get on guest lists for popular clubs via Instagram or WhatsApp groups. Skip the queue and sometimes the cover charge.' },
  { title: 'Dress to Impress', tip: 'Bahrain venues enforce dress codes, especially at upscale spots. When in doubt, go smart casual or better.' },
  { title: 'Table Service', tip: 'For big nights out, book a table. Minimum spends are reasonable and you get guaranteed seating.' },
  { title: 'Happy Hours', tip: 'Most bars offer happy hours from 5-8 PM. Great way to start the night without breaking the bank.' },
  { title: 'Transport', tip: 'Uber and local taxis are readily available. Never drink and drive — penalties are severe in Bahrain.' },
  { title: 'Cash vs Card', tip: 'Most venues accept cards, but smaller bars may prefer cash. ATMs are widely available.' },
];

export default function NightlifeGuide2026Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSchema()) }}
      />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-pink-900/30" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
          
          <div className="max-w-4xl mx-auto relative z-10">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li>/</li>
                <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
                <li>/</li>
                <li className="text-white">Bahrain Nightlife Guide 2026</li>
              </ol>
            </nav>

            <div className="text-center">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full text-purple-300 text-sm mb-4">
                <Moon className="w-4 h-4" /> Complete 2026 Guide
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
                The Ultimate Bahrain Nightlife Guide 2026
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                From legendary clubs and rooftop bars to hidden lounges and live music venues, discover 
                everything you need to know about Bahrain's vibrant after-dark scene.
              </p>
              
              <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> 12 min read
                </span>
                <span>•</span>
                <span>Updated February 2026</span>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
            <p className="text-gray-300 leading-relaxed text-lg">
              Bahrain has earned its reputation as the Gulf's party capital, and for good reason. While neighboring 
              countries maintain stricter regulations, the Kingdom offers a refreshingly liberal approach to nightlife 
              that attracts visitors from across the region. Whether you're a resident looking to explore new spots 
              or a tourist planning your first night out, this comprehensive guide has everything you need.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              The nightlife scene in 2026 is more diverse than ever. You'll find world-class nightclubs hosting 
              international DJs, intimate jazz lounges, beach clubs with sunset sessions, and traditional pubs with 
              live bands. The secret to a great night in Bahrain? Knowing where to go, when to go, and what to expect.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              From the bustling streets of Juffair to the sophisticated lounges of Adliya and the glamorous rooftops 
              of Bahrain Bay, every district offers a unique experience. Let's dive into the complete guide to 
              Bahrain's nightlife in 2026.
            </p>
          </div>
        </section>

        {/* Nightlife Districts */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Nightlife Districts</h2>
                <p className="text-gray-400">Know your neighborhoods for the perfect night out</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {nightlifeDistricts.map((district) => (
                <div key={district.name} className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-purple-500/50 transition">
                  <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${district.color} text-white text-sm font-medium mb-3`}>
                    {district.name}
                  </div>
                  <p className="text-gray-300 mb-4">{district.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {district.highlights.map((h) => (
                      <span key={h} className="px-2 py-1 bg-gray-700/50 rounded text-xs text-gray-300">{h}</span>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Vibe:</span>
                      <p className="text-white">{district.vibe}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Best for:</span>
                      <p className="text-white">{district.bestFor}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Venue Types */}
        {venueTypes.map((category, idx) => (
          <section key={category.type} className={`py-16 px-4 ${idx % 2 === 0 ? '' : 'bg-gray-800/30'}`}>
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600">
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">{category.type}</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {category.venues.map((venue) => (
                  <div key={venue.name} className="p-5 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-purple-500/30 transition">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-white">{venue.name}</h3>
                      <Star className="w-4 h-4 text-purple-400" />
                    </div>
                    <p className="text-purple-400/70 text-sm flex items-center gap-1 mb-2">
                      <MapPin className="w-3 h-3" /> {venue.location}
                    </p>
                    <p className="text-gray-400 text-sm">{venue.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Ladies Night Guide */}
        <section className="py-16 px-4 bg-gradient-to-r from-pink-900/20 to-purple-900/20">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Ladies Night Guide</h2>
                <p className="text-gray-400">Your weekly schedule for complimentary drinks</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {ladiesNightGuide.map((item) => (
                <div key={item.day} className="p-6 bg-gray-800/50 rounded-xl border border-pink-500/30">
                  <h3 className="text-xl font-bold text-pink-300 mb-2">{item.day}</h3>
                  <p className="text-white text-sm mb-2">{item.venues}</p>
                  <p className="text-gray-400 text-sm">{item.details}</p>
                </div>
              ))}
            </div>
            
            <p className="text-gray-300 text-center max-w-2xl mx-auto">
              Pro tip: Follow venues on Instagram for special ladies night promotions and events. 
              Some offer unlimited drinks during specific hours, while others provide set menus.
            </p>
            
            <div className="text-center mt-6">
              <Link 
                href="/guides/ladies-night"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 rounded-full text-white font-semibold hover:opacity-90 transition"
              >
                Full Ladies Night Guide <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Weekly Highlights */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Weekly Nightlife Calendar</h2>
                <p className="text-gray-400">What to expect each night of the week</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {weeklyHighlights.map((day, idx) => (
                <div key={day.day} className={`p-4 rounded-xl ${idx === 4 ? 'bg-gradient-to-b from-purple-600/30 to-pink-600/30 border border-purple-500/50' : 'bg-gray-800/50 border border-gray-700'}`}>
                  <h3 className={`font-semibold mb-1 ${idx === 4 ? 'text-purple-300' : 'text-white'}`}>{day.day}</h3>
                  <p className={`text-xs mb-2 ${idx === 4 ? 'text-purple-200' : 'text-gray-400'}`}>{day.theme}</p>
                  <p className="text-gray-400 text-xs">{day.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pro Tips */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-amber-400" />
              Insider Tips for Bahrain Nightlife
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {proTips.map((tip) => (
                <div key={tip.title} className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                  <h3 className="text-lg font-semibold text-amber-300 mb-2">{tip.title}</h3>
                  <p className="text-gray-400 text-sm">{tip.tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-2">What is the legal drinking age in Bahrain?</h3>
                <p className="text-gray-400">The legal drinking age in Bahrain is 21. You will need to show valid ID (passport or CPR) at clubs and bars.</p>
              </div>
              
              <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-2">What is the dress code for Bahrain nightclubs?</h3>
                <p className="text-gray-400">Most upscale clubs enforce smart casual to formal dress codes. Men should wear collared shirts and closed shoes. Avoid sportswear, flip-flops, and shorts. Ladies have more flexibility but should dress elegantly.</p>
              </div>
              
              <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-2">When is ladies night in Bahrain?</h3>
                <p className="text-gray-400">Ladies nights are typically held on Tuesdays, Wednesdays, and Thursdays at various venues. Women often receive free entry and complimentary drinks during specified hours.</p>
              </div>
              
              <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-2">What time do clubs close in Bahrain?</h3>
                <p className="text-gray-400">Most nightclubs stay open until 2 AM on weekdays and 3 AM on weekends (Thursday and Friday nights). Some venues may close earlier during Ramadan.</p>
              </div>
              
              <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-2">Where is the best nightlife area in Bahrain?</h3>
                <p className="text-gray-400">Juffair is the main nightlife hub with numerous bars and clubs. Adliya offers a more upscale, artsy vibe with cocktail lounges. Bahrain Bay and the hotel districts also have excellent rooftop venues.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready for Your Night Out?</h2>
            <p className="text-gray-300 text-lg mb-8">
              Explore our complete venue directory to plan the perfect evening in Bahrain.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/nightlife"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold hover:opacity-90 transition"
              >
                Browse Nightlife Venues
              </Link>
              <Link 
                href="/guides/ladies-night"
                className="px-8 py-4 bg-gray-800 rounded-full text-white font-semibold hover:bg-gray-700 transition"
              >
                Ladies Night Guide
              </Link>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8">Related Guides</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/guides/nightlife-juffair" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition group">
                <MapPin className="w-8 h-8 text-purple-400 mb-3" />
                <h3 className="font-semibold text-white group-hover:text-purple-300 transition">Juffair Nightlife</h3>
                <p className="text-sm text-gray-400 mt-2">Deep dive into Bahrain's party district</p>
              </Link>
              <Link href="/guides/nightlife-adliya" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition group">
                <Wine className="w-8 h-8 text-amber-400 mb-3" />
                <h3 className="font-semibold text-white group-hover:text-amber-300 transition">Adliya Scene</h3>
                <p className="text-sm text-gray-400 mt-2">Cocktails and culture</p>
              </Link>
              <Link href="/guides/happy-hour-bahrain" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition group">
                <Martini className="w-8 h-8 text-cyan-400 mb-3" />
                <h3 className="font-semibold text-white group-hover:text-cyan-300 transition">Happy Hour Guide</h3>
                <p className="text-sm text-gray-400 mt-2">Best deals in Bahrain</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
