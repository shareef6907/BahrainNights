import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Wine, Star, MapPin, Clock, Music, Sparkles, Users, 
  Heart, Martini, Moon, PartyPopper, Flame, Crown
} from 'lucide-react';

// SEO Optimized Metadata
export const metadata: Metadata = {
  title: 'Nightlife in Bahrain — Best Bars, Clubs & Lounges 2026 | BahrainNights',
  description: 'Complete guide to Bahrain nightlife 2026. Discover the best bars, nightclubs, and lounges in Adliya, Juffair, and Seef. Ladies nights, dress codes, and insider tips.',
  keywords: [
    'Bahrain nightlife', 'bars in Bahrain', 'clubs in Bahrain', 'nightclubs Bahrain',
    'Adliya nightlife', 'Juffair bars', 'Seef nightlife', 'lounges Bahrain',
    'ladies night Bahrain', 'best bars Manama', 'Bahrain clubs 2026',
    'where to party Bahrain', 'rooftop bars Bahrain', 'live music Bahrain'
  ].join(', '),
  alternates: {
    canonical: 'https://www.bahrainnights.com/nightlife-bahrain',
  },
  openGraph: {
    title: 'Nightlife in Bahrain — Best Bars, Clubs & Lounges 2026',
    description: 'Your ultimate guide to Bahrain\'s nightlife scene. Best bars, clubs, and lounges in every area.',
    url: 'https://www.bahrainnights.com/nightlife-bahrain',
    siteName: 'BahrainNights',
    images: [
      {
        url: 'https://www.bahrainnights.com/og-nightlife.jpg',
        width: 1200,
        height: 630,
        alt: 'Nightlife in Bahrain',
      },
    ],
    type: 'article',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nightlife in Bahrain 2026',
    description: 'Best bars, clubs & lounges - complete guide!',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

// JSON-LD Schema
function generateSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': 'https://www.bahrainnights.com/nightlife-bahrain#article',
        headline: 'Nightlife in Bahrain — Best Bars, Clubs & Lounges 2026',
        description: 'Complete guide to Bahrain nightlife. Discover the best bars, clubs, and lounges across the island.',
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
        datePublished: '2024-01-15',
        dateModified: new Date().toISOString().split('T')[0],
      },
      {
        '@type': 'ItemList',
        name: 'Best Nightlife Venues in Bahrain',
        itemListOrder: 'https://schema.org/ItemListOrderDescending',
        numberOfItems: 20,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Coda Jazz Lounge', description: 'Live jazz and sophisticated cocktails at Ritz-Carlton' },
          { '@type': 'ListItem', position: 2, name: 'The Meat Company', description: 'Upscale bar and grill in Adliya' },
          { '@type': 'ListItem', position: 3, name: 'JJ\'s Irish Bar', description: 'Legendary expat bar' },
          { '@type': 'ListItem', position: 4, name: 'Trader Vic\'s', description: 'Tiki cocktails at Ritz-Carlton' },
          { '@type': 'ListItem', position: 5, name: 'Block 338', description: 'Trendy destination with multiple venues' },
        ]
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.bahrainnights.com' },
          { '@type': 'ListItem', position: 2, name: 'Nightlife Bahrain', item: 'https://www.bahrainnights.com/nightlife-bahrain' }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Is alcohol legal in Bahrain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, alcohol is legal in Bahrain and available at licensed venues including hotels, restaurants, and bars. You must be 21 or older to purchase alcohol. Non-Muslims can also buy alcohol from licensed stores with a permit.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is the drinking age in Bahrain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The legal drinking age in Bahrain is 21 years old. You may be asked for ID at bars and clubs, so always carry your passport or CPR card.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is the dress code for Bahrain nightclubs?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Most upscale bars and clubs in Bahrain require smart casual attire. No shorts, flip-flops, or sportswear. Collared shirts for men are often required at premium venues. Dress to impress, especially on weekends.'
            }
          },
          {
            '@type': 'Question',
            name: 'When is ladies night in Bahrain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ladies nights in Bahrain typically run on Tuesdays, Wednesdays, and Thursdays. Women receive free entry and complimentary drinks at participating venues. Check individual venues for current offers as they change regularly.'
            }
          },
          {
            '@type': 'Question',
            name: 'What time do bars close in Bahrain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Most bars in Bahrain close between 1:00 AM and 2:00 AM on weeknights. On weekends (Thursday-Friday nights), many venues stay open until 3:00 AM. Some hotel bars have 24-hour licenses.'
            }
          }
        ]
      }
    ]
  };
}

const nightlifeAreas = [
  {
    name: 'Adliya',
    description: 'The heart of Bahrain\'s nightlife scene',
    icon: Flame,
    color: 'from-red-500 to-orange-600',
    overview: 'Adliya is the undisputed nightlife capital of Bahrain. This trendy neighborhood is packed with bars, restaurants, and clubs, making it the go-to destination for a night out. The famous Block 338 and surrounding streets come alive after sunset with a mix of upscale lounges, casual pubs, and everything in between.',
    venues: [
      { name: 'Block 338', type: 'Entertainment Complex', description: 'Multiple venues under one roof including restaurants, bars, and lounges. The heart of Adliya nightlife.', hours: '5PM - 2AM', vibe: 'Trendy & Diverse', link: '/venues' },
      { name: 'The Meat Company', type: 'Bar & Grill', description: 'Upscale South African steakhouse with excellent cocktails and wine selection. Great for dinner and drinks.', hours: '12PM - 1AM', vibe: 'Sophisticated', link: '/venues' },
      { name: 'Gaucho', type: 'Bar & Restaurant', description: 'Argentinian grill with vibrant bar scene. Live music on weekends and great sangria.', hours: '12PM - 1AM', vibe: 'Lively', link: '/venues' },
      { name: 'Segafredo', type: 'Café Bar', description: 'Italian café that transforms into a bustling bar at night. Perfect for people-watching on the terrace.', hours: '8AM - 12AM', vibe: 'Casual', link: '/venues' },
      { name: 'Coco\'s', type: 'Lounge Bar', description: 'Chic lounge with creative cocktails and shisha. Popular with the fashion-forward crowd.', hours: '6PM - 2AM', vibe: 'Trendy', link: '/venues' },
    ]
  },
  {
    name: 'Juffair',
    description: 'Expat-friendly area with diverse venues',
    icon: PartyPopper,
    color: 'from-purple-500 to-pink-600',
    overview: 'Juffair is home to many expats and offers a more casual, international nightlife scene. You\'ll find everything from American sports bars to karaoke lounges and nightclubs. It\'s generally more affordable than hotel venues and has a relaxed, friendly atmosphere. Great for pub crawls with friends.',
    venues: [
      { name: 'JJ\'s Irish Bar', type: 'Pub', description: 'Legendary Irish pub that\'s been a Bahrain institution for years. Live sports, cold beer, and friendly atmosphere.', hours: '11AM - 2AM', vibe: 'Classic Pub', link: '/venues' },
      { name: 'Diggers', type: 'Sports Bar', description: 'Australian sports bar with great food, pool tables, and multiple screens. Popular with the Aussie crowd.', hours: '11AM - 2AM', vibe: 'Casual', link: '/venues' },
      { name: 'Club Wahoo', type: 'Nightclub', description: 'Popular nightclub with DJs spinning commercial hits. Gets packed on weekends.', hours: '10PM - 3AM', vibe: 'Party', link: '/venues' },
      { name: 'Bangkok Garden', type: 'Bar & Restaurant', description: 'Thai restaurant with lively bar upstairs. Known for affordable drinks and karaoke.', hours: '12PM - 2AM', vibe: 'Fun & Casual', link: '/venues' },
      { name: 'Wrangler Bar', type: 'Country Bar', description: 'American-style country bar with live music. Unique concept in Bahrain.', hours: '6PM - 2AM', vibe: 'Country', link: '/venues' },
    ]
  },
  {
    name: 'Hotel Bars',
    description: 'Premium venues in five-star properties',
    icon: Crown,
    color: 'from-amber-500 to-yellow-600',
    overview: 'Bahrain\'s luxury hotels house some of the most sophisticated bars and lounges in the Gulf. From jazz clubs to rooftop terraces, these venues offer premium service, top-shelf spirits, and elegant atmospheres. Perfect for special occasions, business entertaining, or when you want a more refined experience.',
    venues: [
      { name: 'Coda Jazz Lounge', type: 'Jazz Club', hotel: 'Ritz-Carlton', description: 'Intimate jazz club with live performances nightly. Excellent whiskey selection and Cuban cigars.', hours: '7PM - 2AM', vibe: 'Sophisticated', link: '/venues' },
      { name: 'Trader Vic\'s', type: 'Tiki Bar', hotel: 'Ritz-Carlton', description: 'Legendary tiki bar with tropical cocktails and Polynesian bites. Fun, colorful atmosphere.', hours: '6PM - 2AM', vibe: 'Tropical Fun', link: '/venues' },
      { name: 'CUT Lounge', type: 'Cocktail Bar', hotel: 'Four Seasons', description: 'Sleek lounge attached to Wolfgang Puck\'s steakhouse. Craft cocktails and stunning views.', hours: '6PM - 1AM', vibe: 'Upscale', link: '/venues' },
      { name: 're/Asian', type: 'Lounge Bar', hotel: 'Four Seasons', description: 'Modern Asian bar with creative cocktails and small plates. Chic, contemporary design.', hours: '6PM - 1AM', vibe: 'Modern Chic', link: '/venues' },
      { name: 'Sheraton Lobby Lounge', type: 'Lounge', hotel: 'Sheraton', description: 'Classic hotel lounge with live entertainment. Great for after-work drinks.', hours: '5PM - 1AM', vibe: 'Classic', link: '/venues' },
      { name: 'Piano Piano', type: 'Piano Bar', hotel: 'Gulf Hotel', description: 'Classic piano bar with live entertainment nightly. Old-school elegance.', hours: '7PM - 1AM', vibe: 'Classic', link: '/venues' },
    ]
  },
  {
    name: 'Seef & City Centre',
    description: 'Shopping district with hidden gems',
    icon: Sparkles,
    color: 'from-cyan-500 to-blue-600',
    overview: 'The Seef area is primarily known for shopping, but it hides some excellent bars and lounges, particularly in hotel properties. The area tends to be more family-oriented during the day but offers sophisticated evening options. Great for combining shopping with dinner and drinks.',
    venues: [
      { name: 'Typhoon', type: 'Lounge Bar', hotel: 'Le Méridien', description: 'Popular bar with live music and diverse crowd. Regular theme nights and promotions.', hours: '6PM - 2AM', vibe: 'Lively', link: '/venues' },
      { name: 'Mezzanine', type: 'Lounge', hotel: 'Le Méridien', description: 'Stylish lounge with creative cocktails. Good for pre-dinner drinks.', hours: '5PM - 1AM', vibe: 'Chic', link: '/venues' },
      { name: 'Bushido Lounge', type: 'Japanese Bar', hotel: 'Ritz-Carlton', description: 'Sake and Japanese whisky bar with modern izakaya vibes.', hours: '6PM - 12AM', vibe: 'Contemporary', link: '/venues' },
    ]
  }
];

const ladiesNightVenues = [
  { name: 'Trader Vic\'s', day: 'Tuesday', offer: 'Free drinks for ladies 8PM-12AM', venue: 'Ritz-Carlton' },
  { name: 'CUT Lounge', day: 'Wednesday', offer: '3 complimentary drinks for ladies', venue: 'Four Seasons' },
  { name: 'Typhoon', day: 'Tuesday', offer: 'Free entry + 3 drinks', venue: 'Le Méridien' },
  { name: 'JJ\'s Irish Bar', day: 'Thursday', offer: 'Ladies drink free all night', venue: 'Juffair' },
  { name: 'Club Wahoo', day: 'Wednesday', offer: 'Free entry and drinks until 12AM', venue: 'Juffair' },
];

const nightlifeTips = [
  {
    icon: Users,
    title: 'Dress Code',
    tip: 'Smart casual is the minimum. Avoid shorts, flip-flops, and sportswear. Collared shirts for men at upscale venues.'
  },
  {
    icon: Clock,
    title: 'Timing',
    tip: 'Most places get busy after 10 PM. Weekends (Thursday/Friday) are busiest. Arrive early for good seating.'
  },
  {
    icon: Heart,
    title: 'Ladies Nights',
    tip: 'Tuesday-Thursday typically have ladies\' nights with free drinks. Great way to explore different venues.'
  },
  {
    icon: Wine,
    title: 'Legal Age',
    tip: 'You must be 21+ to drink. Carry ID. Some venues check at the door, especially on busy nights.'
  }
];

export default function NightlifePage() {
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
          
          <div className="max-w-6xl mx-auto relative z-10">
            <nav className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li>/</li>
                <li className="text-white">Nightlife Bahrain</li>
              </ol>
            </nav>

            <div className="text-center">
              <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full text-purple-300 text-sm mb-4">
                🍸 Nightlife Guide 2026
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Nightlife in Bahrain
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                From sophisticated hotel lounges to buzzing nightclubs, Bahrain offers the most vibrant nightlife 
                in the Gulf. Discover the best bars, clubs, and lounges across the island.
              </p>
              
              <div className="flex flex-wrap justify-center gap-8 mt-10">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">4</div>
                  <div className="text-sm text-gray-400">Key Areas</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-400">50+</div>
                  <div className="text-sm text-gray-400">Venues</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-fuchsia-400">3 AM</div>
                  <div className="text-sm text-gray-400">Weekend Hours</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
            <h2 className="text-3xl font-bold text-white mb-6">Bahrain's Nightlife Scene</h2>
            <p className="text-gray-300 leading-relaxed">
              Bahrain has long been known as the most liberal country in the Gulf, and its nightlife scene reflects 
              this reputation. While neighboring countries have limited options, Bahrain offers everything from 
              world-class cocktail bars to thumping nightclubs, all within a compact, easy-to-navigate island.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Alcohol is legal and widely available at licensed venues, which are primarily concentrated in hotels 
              and the nightlife districts of <strong>Adliya</strong> and <strong>Juffair</strong>. The scene is 
              cosmopolitan, with a mix of locals, expats, and weekend visitors from Saudi Arabia creating a 
              diverse, energetic atmosphere.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Whether you're looking for <strong>live jazz</strong> at a sophisticated lounge, <strong>craft 
              cocktails</strong> at a rooftop bar, or a <strong>late-night dance floor</strong>, Bahrain has 
              you covered. The weekend here runs Thursday through Friday, with many venues open until 2 AM on 
              weeknights and 3 AM on weekends.
            </p>
          </div>
        </section>

        {/* Tips Section */}
        <section className="py-8 px-4 bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white text-center mb-8">Before You Go Out</h2>
            <div className="grid md:grid-cols-4 gap-4">
              {nightlifeTips.map((tip) => (
                <div key={tip.title} className="p-4 bg-gray-800/50 rounded-xl text-center">
                  <tip.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-2">{tip.title}</h3>
                  <p className="text-sm text-gray-400">{tip.tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nightlife Areas */}
        {nightlifeAreas.map((area) => (
          <section 
            key={area.name} 
            id={area.name.toLowerCase().replace(/\s+/g, '-')}
            className="py-16 px-4"
          >
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${area.color}`}>
                  <area.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">{area.name}</h2>
                  <p className="text-gray-400">{area.description}</p>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-8 max-w-4xl">{area.overview}</p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {area.venues.map((venue) => (
                  <div 
                    key={venue.name} 
                    className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {venue.name}
                        </h3>
                        <div className="text-sm text-purple-400">{venue.type}</div>
                        {'hotel' in venue && (
                          <div className="text-xs text-gray-500 mt-1">{venue.hotel}</div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{venue.description}</p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1 text-gray-400">
                        <Clock className="w-4 h-4" /> {venue.hours}
                      </span>
                      <span className="px-2 py-1 bg-gray-700/50 rounded-full text-xs text-purple-300">
                        {venue.vibe}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Ladies Night Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-pink-900/20 to-purple-900/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <Heart className="w-12 h-12 text-pink-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-3">Ladies Night in Bahrain</h2>
              <p className="text-gray-400">Free drinks and entry at the best venues. Check our dedicated <Link href="/ladies-night-bahrain" className="text-pink-400 hover:text-pink-300">Ladies Night Guide</Link> for the latest offers.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ladiesNightVenues.map((venue) => (
                <div key={venue.name} className="p-4 bg-gray-800/50 rounded-xl border border-pink-900/30">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-white">{venue.name}</h3>
                    <span className="px-2 py-1 bg-pink-500/20 rounded-full text-xs text-pink-300">{venue.day}</span>
                  </div>
                  <p className="text-sm text-gray-400">{venue.offer}</p>
                  <p className="text-xs text-gray-500 mt-2">{venue.venue}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link 
                href="/ladies-night-bahrain"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full text-white font-semibold hover:opacity-90 transition"
              >
                View All Ladies Nights
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-10">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Is alcohol legal in Bahrain?</h3>
                <p className="text-gray-300">
                  Yes, alcohol is legal in Bahrain and readily available at licensed venues including hotels, 
                  restaurants, and standalone bars. You must be 21 or older to purchase alcohol. Non-Muslims 
                  can also buy alcohol from licensed stores with a personal permit.
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">What is the dress code for nightclubs?</h3>
                <p className="text-gray-300">
                  Most upscale bars and clubs require smart casual attire at minimum. Avoid shorts, flip-flops, 
                  athletic wear, and torn clothing. Collared shirts for men are often required at premium hotel 
                  venues. When in doubt, dress up rather than down.
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">When is the best time to go out in Bahrain?</h3>
                <p className="text-gray-300">
                  The weekend in Bahrain runs Thursday through Friday. Thursday night is the busiest. Most venues 
                  start getting lively after 10 PM and peak around midnight. For a more relaxed experience, visit 
                  on Tuesday or Wednesday when you can also take advantage of ladies' night deals.
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">What time do bars close in Bahrain?</h3>
                <p className="text-gray-300">
                  Most bars close between 1:00 AM and 2:00 AM on weeknights. On weekends (Thursday and Friday 
                  nights), many venues stay open until 3:00 AM. Some hotel bars have extended or 24-hour licenses.
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Are there cover charges at Bahrain clubs?</h3>
                <p className="text-gray-300">
                  Most bars don't have cover charges. Nightclubs may charge 10-20 BHD on busy nights, often 
                  including a drink. Ladies frequently get free entry, especially on designated ladies' nights. 
                  Hotel venues rarely charge covers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Go Out?</h2>
            <p className="text-gray-300 text-lg mb-8">
              Check out this week's events, ladies' night deals, and more.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/events"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold hover:opacity-90 transition"
              >
                This Week's Events
              </Link>
              <Link 
                href="/ladies-night-bahrain"
                className="px-8 py-4 bg-gray-800 rounded-full text-white font-semibold hover:bg-gray-700 transition"
              >
                Ladies Night Guide
              </Link>
            </div>
            
            <p className="mt-12 text-gray-500 text-sm">
              Powered by <Link href="/" className="text-gray-400 hover:text-white">BahrainNights.com</Link> — Bahrain's #1 Events & Lifestyle Platform
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
