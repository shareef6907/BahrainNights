import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Heart, Star, MapPin, Clock, Wine, Sparkles, Calendar,
  Music, Crown, PartyPopper, Gift, Users, Martini, Moon
} from 'lucide-react';

// SEO Optimized Metadata
export const metadata: Metadata = {
  title: 'Ladies Night Bahrain — Best Deals This Week 2026 | BahrainNights',
  description: 'Complete guide to Ladies Night in Bahrain 2026. Free drinks, free entry, and best deals every day of the week. Updated weekly with the latest offers from top venues.',
  keywords: [
    'ladies night Bahrain', 'ladies night Manama', 'free drinks Bahrain',
    'ladies night deals Bahrain', 'Tuesday ladies night', 'Wednesday ladies night',
    'Thursday ladies night Bahrain', 'best ladies night Gulf', 'women free drinks Bahrain',
    'Bahrain nightlife ladies', 'ladies night Juffair', 'ladies night Adliya',
    'girls night out Bahrain', 'ladies night hotels Bahrain'
  ].join(', '),
  alternates: {
    canonical: 'https://www.bahrainnights.com/ladies-night-bahrain',
  },
  openGraph: {
    title: 'Ladies Night Bahrain — Best Deals This Week 2026',
    description: 'Free drinks & entry at the best venues in Bahrain. Updated weekly guide to ladies night deals.',
    url: 'https://www.bahrainnights.com/ladies-night-bahrain',
    siteName: 'BahrainNights',
    images: [
      {
        url: 'https://www.bahrainnights.com/og-ladies-night.jpg',
        width: 1200,
        height: 630,
        alt: 'Ladies Night Bahrain',
      },
    ],
    type: 'article',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ladies Night Bahrain 2026',
    description: 'Free drinks & entry at top venues - updated weekly!',
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
        '@id': 'https://www.bahrainnights.com/ladies-night-bahrain#article',
        headline: 'Ladies Night Bahrain — Best Deals This Week 2026',
        description: 'Complete weekly guide to ladies night deals in Bahrain. Free drinks and entry at top venues.',
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
        name: 'Best Ladies Night Venues in Bahrain',
        itemListOrder: 'https://schema.org/ItemListOrderDescending',
        numberOfItems: 20,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Trader Vic\'s', description: 'Tuesday - Free drinks for ladies at Ritz-Carlton' },
          { '@type': 'ListItem', position: 2, name: 'CUT Lounge', description: 'Wednesday - 3 complimentary drinks at Four Seasons' },
          { '@type': 'ListItem', position: 3, name: 'Typhoon', description: 'Tuesday - Free entry and drinks at Le Méridien' },
          { '@type': 'ListItem', position: 4, name: 'JJ\'s Irish Bar', description: 'Thursday - Ladies drink free all night' },
          { '@type': 'ListItem', position: 5, name: 'Club Wahoo', description: 'Wednesday - Free entry and drinks until midnight' },
        ]
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.bahrainnights.com' },
          { '@type': 'ListItem', position: 2, name: 'Ladies Night Bahrain', item: 'https://www.bahrainnights.com/ladies-night-bahrain' }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is ladies night in Bahrain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ladies night in Bahrain is a popular promotion where women receive free drinks, free entry, or special discounts at bars, clubs, and lounges. Most ladies nights run on Tuesday, Wednesday, or Thursday evenings, typically from 8 PM to midnight.'
            }
          },
          {
            '@type': 'Question',
            name: 'Which day is best for ladies night in Bahrain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Tuesday and Wednesday are the most popular days for ladies night in Bahrain, with the most venues offering deals. Thursday also has good options but venues tend to be busier. Check individual venue offers as they vary.'
            }
          },
          {
            '@type': 'Question',
            name: 'Do all bars in Bahrain have ladies night?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Not all bars offer ladies night, but most hotel bars, popular nightclubs, and many standalone bars have ladies night promotions on at least one day of the week. The deals vary from free drinks to discounted packages.'
            }
          },
          {
            '@type': 'Question',
            name: 'What should I wear to ladies night in Bahrain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Smart casual to dressy is appropriate for ladies night. Most venues have a dress code - avoid flip-flops, beach wear, or overly casual attire. Upscale hotel venues may expect elegant evening wear.'
            }
          },
          {
            '@type': 'Question',
            name: 'Are ladies nights in Bahrain safe?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, ladies nights in Bahrain are very safe. Bahrain is one of the safest countries in the Middle East. Hotel venues in particular have security. As always, drink responsibly and arrange safe transportation.'
            }
          }
        ]
      }
    ]
  };
}

const ladiesNightsByDay = [
  {
    day: 'Sunday',
    icon: Moon,
    color: 'from-indigo-500 to-blue-600',
    description: 'Start the week with style',
    venues: [
      {
        name: 'Coda Jazz Lounge',
        location: 'Ritz-Carlton',
        offer: 'Happy hour prices for ladies all night',
        time: '7 PM - 2 AM',
        vibe: 'Sophisticated jazz & cocktails',
        details: 'Live jazz performances. Intimate setting. Premium whiskey and cocktail selection.',
        link: '/venues'
      },
      {
        name: 're/Asian',
        location: 'Four Seasons',
        offer: '2-for-1 cocktails for ladies',
        time: '6 PM - 11 PM',
        vibe: 'Modern Asian chic',
        details: 'Contemporary Asian bar with creative cocktails and stunning design.',
        link: '/venues'
      },
    ]
  },
  {
    day: 'Monday',
    icon: Sparkles,
    color: 'from-violet-500 to-purple-600',
    description: 'Beat the Monday blues',
    venues: [
      {
        name: 'Mezzanine',
        location: 'Le Méridien',
        offer: '3 complimentary drinks for ladies',
        time: '8 PM - 12 AM',
        vibe: 'Chic hotel lounge',
        details: 'Stylish setting with DJ music. Dress code: smart casual.',
        link: '/venues'
      },
      {
        name: 'Piano Piano',
        location: 'Gulf Hotel',
        offer: 'Ladies happy hour specials',
        time: '7 PM - 11 PM',
        vibe: 'Classic piano bar',
        details: 'Live piano entertainment. Elegant atmosphere. Classic cocktails.',
        link: '/venues'
      },
    ]
  },
  {
    day: 'Tuesday',
    icon: Heart,
    color: 'from-pink-500 to-rose-600',
    description: 'The classic ladies night!',
    venues: [
      {
        name: 'Trader Vic\'s',
        location: 'Ritz-Carlton',
        offer: 'Unlimited drinks 8 PM - 12 AM',
        time: '8 PM - 12 AM',
        vibe: 'Tropical tiki paradise',
        details: 'Bahrain\'s most popular ladies night. Tiki cocktails, Polynesian bites, great atmosphere. Book ahead!',
        featured: true,
        link: '/venues'
      },
      {
        name: 'Typhoon',
        location: 'Le Méridien',
        offer: 'Free entry + 3 drinks',
        time: '8 PM - 1 AM',
        vibe: 'Lively party atmosphere',
        details: 'Popular with mixed crowd. DJ music, dancing, good vibes. Gets busy after 10 PM.',
        featured: true,
        link: '/venues'
      },
      {
        name: 'Sheraton Lobby Lounge',
        location: 'Sheraton Hotel',
        offer: 'Complimentary cocktails for ladies',
        time: '7 PM - 11 PM',
        vibe: 'Classic hotel bar',
        details: 'Live entertainment. Relaxed atmosphere. Good for early evening drinks.',
        link: '/venues'
      },
      {
        name: 'Calexico',
        location: 'Amwaj',
        offer: '3 free margaritas for ladies',
        time: '7 PM - 11 PM',
        vibe: 'Fun Mexican vibes',
        details: 'Vibrant Mexican restaurant. Great tacos and margaritas. Casual and fun.',
        link: '/venues'
      },
    ]
  },
  {
    day: 'Wednesday',
    icon: Wine,
    color: 'from-red-500 to-orange-600',
    description: 'Mid-week celebrations',
    venues: [
      {
        name: 'CUT Lounge',
        location: 'Four Seasons',
        offer: '3 complimentary drinks for ladies',
        time: '7 PM - 12 AM',
        vibe: 'Upscale sophistication',
        details: 'Sleek lounge adjacent to Wolfgang Puck\'s steakhouse. Craft cocktails, stunning bay views.',
        featured: true,
        link: '/venues'
      },
      {
        name: 'Club Wahoo',
        location: 'Juffair',
        offer: 'Free entry + drinks until 12 AM',
        time: '10 PM - 3 AM',
        vibe: 'Party nightclub',
        details: 'Popular club with DJ playing commercial hits. Gets packed late. Dancing all night.',
        featured: true,
        link: '/venues'
      },
      {
        name: 'The Meat Company',
        location: 'Adliya',
        offer: '50% off drinks for ladies',
        time: '7 PM - 12 AM',
        vibe: 'Upscale bar & grill',
        details: 'South African steakhouse with great bar. Good for dinner and drinks combo.',
        link: '/venues'
      },
      {
        name: 'Gaucho',
        location: 'Adliya',
        offer: 'Happy hour prices all night for ladies',
        time: '6 PM - 11 PM',
        vibe: 'Argentinian flair',
        details: 'Lively atmosphere with good wine selection. Live music some nights.',
        link: '/venues'
      },
      {
        name: 'Bushido Lounge',
        location: 'Ritz-Carlton',
        offer: 'Complimentary sake flights for ladies',
        time: '7 PM - 11 PM',
        vibe: 'Japanese elegance',
        details: 'Premium sake and Japanese whisky bar. Intimate, modern setting.',
        link: '/venues'
      },
    ]
  },
  {
    day: 'Thursday',
    icon: PartyPopper,
    color: 'from-amber-500 to-yellow-600',
    description: 'Weekend kickoff!',
    venues: [
      {
        name: 'JJ\'s Irish Bar',
        location: 'Juffair',
        offer: 'Ladies drink free all night',
        time: '8 PM - 2 AM',
        vibe: 'Classic Irish pub',
        details: 'Long-standing favorite. Casual, friendly crowd. Great for meeting people. Gets busy!',
        featured: true,
        link: '/venues'
      },
      {
        name: 'Block 338 Venues',
        location: 'Adliya',
        offer: 'Various ladies night offers',
        time: '8 PM - 2 AM',
        vibe: 'Multiple options',
        details: 'Several bars and restaurants with Thursday ladies specials. Bar hop through the block!',
        featured: true,
        link: '/venues'
      },
      {
        name: 'Diggers',
        location: 'Juffair',
        offer: '2-for-1 drinks for ladies',
        time: '7 PM - 1 AM',
        vibe: 'Australian sports bar',
        details: 'Casual sports bar atmosphere. Pool tables, big screens, friendly crowd.',
        link: '/venues'
      },
      {
        name: 'La Med Lounge',
        location: 'Ritz-Carlton',
        offer: 'Complimentary sparkling wine for ladies',
        time: '7 PM - 11 PM',
        vibe: 'Poolside elegance',
        details: 'Mediterranean vibes by the pool. Perfect for sunset drinks before heading out.',
        link: '/venues'
      },
    ]
  },
  {
    day: 'Friday',
    icon: Crown,
    color: 'from-emerald-500 to-teal-600',
    description: 'Weekend vibes',
    venues: [
      {
        name: 'Coda Jazz Lounge',
        location: 'Ritz-Carlton',
        offer: 'Happy hour 7-9 PM for ladies',
        time: '7 PM - 2 AM',
        vibe: 'Live jazz night',
        details: 'Best live jazz in Bahrain. Special weekend performances. Sophisticated crowd.',
        link: '/venues'
      },
      {
        name: 'CUT Lounge',
        location: 'Four Seasons',
        offer: 'Champagne happy hour for ladies',
        time: '6 PM - 9 PM',
        vibe: 'Friday night glamour',
        details: 'Start the weekend in style. Champagne specials, bay views, chic atmosphere.',
        link: '/venues'
      },
    ]
  },
  {
    day: 'Saturday',
    icon: Star,
    color: 'from-blue-500 to-cyan-600',
    description: 'Weekend continues',
    venues: [
      {
        name: 'Trader Vic\'s',
        location: 'Ritz-Carlton',
        offer: '2-for-1 cocktails for ladies',
        time: '6 PM - 9 PM',
        vibe: 'Tropical Saturday',
        details: 'Extended happy hour for ladies. Great for early evening drinks before dinner.',
        link: '/venues'
      },
      {
        name: 're/Asian',
        location: 'Four Seasons',
        offer: 'Ladies cocktail specials',
        time: '6 PM - 11 PM',
        vibe: 'Modern Asian',
        details: 'Creative cocktails and Asian small plates. Intimate, stylish setting.',
        link: '/venues'
      },
    ]
  },
];

const topPicks = [
  {
    name: 'Trader Vic\'s Tuesday',
    description: 'The most legendary ladies night in Bahrain. Unlimited drinks in a tropical tiki setting.',
    icon: Crown,
  },
  {
    name: 'CUT Lounge Wednesday',
    description: 'Upscale Four Seasons experience with craft cocktails and bay views.',
    icon: Sparkles,
  },
  {
    name: 'JJ\'s Thursday',
    description: 'Classic pub vibes and free drinks all night. Great for meeting people.',
    icon: Heart,
  },
];

const tips = [
  {
    icon: Calendar,
    title: 'Book Ahead',
    tip: 'Popular venues like Trader Vic\'s fill up fast. Reserve in advance, especially for groups.'
  },
  {
    icon: Clock,
    title: 'Timing',
    tip: 'Most deals run 8 PM - 12 AM. Arrive early for the best experience and seating.'
  },
  {
    icon: Users,
    title: 'Dress Code',
    tip: 'Smart casual to dressy. Hotel venues expect elegant attire. No flip-flops or beachwear.'
  },
  {
    icon: Wine,
    title: 'Drink Responsibly',
    tip: 'Pace yourself. Free drinks are great but stay safe. Arrange transport in advance.'
  },
];

export default function LadiesNightPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSchema()) }}
      />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-900/30 to-purple-900/30" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <nav className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li>/</li>
                <li className="text-white">Ladies Night Bahrain</li>
              </ol>
            </nav>

            <div className="text-center">
              <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full text-pink-300 text-sm mb-4">
                💃 Updated Weekly
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent">
                Ladies Night Bahrain
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Free drinks, free entry, and fabulous vibes. Your complete guide to the best ladies night 
                deals in Bahrain, updated weekly.
              </p>
              
              <div className="flex flex-wrap justify-center gap-8 mt-10">
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-400">20+</div>
                  <div className="text-sm text-gray-400">Venues</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">7</div>
                  <div className="text-sm text-gray-400">Days a Week</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-fuchsia-400">Free</div>
                  <div className="text-sm text-gray-400">Drinks</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Top Picks */}
        <section className="py-8 px-4 bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white text-center mb-8">🏆 Editor's Top Picks</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {topPicks.map((pick) => (
                <div key={pick.name} className="p-4 bg-gradient-to-r from-pink-900/30 to-purple-900/30 rounded-xl border border-pink-500/20">
                  <pick.icon className="w-8 h-8 text-pink-400 mb-3" />
                  <h3 className="font-semibold text-white mb-2">{pick.name}</h3>
                  <p className="text-sm text-gray-400">{pick.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {tips.map((tip) => (
                <div key={tip.title} className="p-4 bg-gray-800/50 rounded-xl text-center">
                  <tip.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-2">{tip.title}</h3>
                  <p className="text-xs text-gray-400">{tip.tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Day Navigation */}
        <section className="py-4 px-4 sticky top-0 bg-gray-900/95 backdrop-blur-sm z-20 border-b border-gray-800">
          <div className="max-w-6xl mx-auto">
            <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
              {ladiesNightsByDay.map((dayInfo) => (
                <a
                  key={dayInfo.day}
                  href={`#${dayInfo.day.toLowerCase()}`}
                  className={`flex-shrink-0 px-4 py-2 rounded-full bg-gradient-to-r ${dayInfo.color} text-white text-sm font-medium hover:opacity-90 transition flex items-center gap-2`}
                >
                  <dayInfo.icon className="w-4 h-4" />
                  {dayInfo.day}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Ladies Nights by Day */}
        {ladiesNightsByDay.map((dayInfo) => (
          <section 
            key={dayInfo.day} 
            id={dayInfo.day.toLowerCase()}
            className="py-12 px-4"
          >
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${dayInfo.color}`}>
                  <dayInfo.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">{dayInfo.day}</h2>
                  <p className="text-gray-400">{dayInfo.description}</p>
                </div>
              </div>
              
              {dayInfo.venues.length === 0 ? (
                <p className="text-gray-500 italic">Limited ladies night options on {dayInfo.day}. Check other days for more deals!</p>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {dayInfo.venues.map((venue) => (
                    <div 
                      key={venue.name} 
                      className={`p-6 rounded-2xl border transition-all ${
                        'featured' in venue && venue.featured 
                          ? 'bg-gradient-to-r from-pink-900/30 to-purple-900/30 border-pink-500/30 hover:border-pink-500/50' 
                          : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      {'featured' in venue && venue.featured && (
                        <span className="inline-block px-2 py-1 bg-pink-500/20 rounded-full text-xs text-pink-300 mb-3">
                          ⭐ Popular Choice
                        </span>
                      )}
                      
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-white">
                            {venue.name}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                            <MapPin className="w-4 h-4" />
                            <span>{venue.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{venue.time}</span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="inline-block px-3 py-1.5 bg-green-500/20 rounded-lg text-green-300 font-semibold">
                          🎁 {venue.offer}
                        </div>
                      </div>
                      
                      <p className="text-gray-400 text-sm leading-relaxed mb-3">{venue.details}</p>
                      
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-gray-700/50 rounded-full text-xs text-purple-300">
                          {venue.vibe}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        ))}

        {/* What to Know */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">About Ladies Night in Bahrain</h2>
            <p className="text-gray-300 leading-relaxed">
              Ladies night is a beloved tradition in Bahrain's nightlife scene. Unlike more conservative 
              neighbors, Bahrain offers a vibrant bar and club culture, and ladies nights are a major part 
              of the social calendar. These promotions typically offer <strong>free drinks</strong>, 
              <strong>free entry</strong>, or significant discounts for women.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Most ladies nights run from <strong>Tuesday through Thursday</strong>, with Tuesday being the 
              most popular night. Deals typically start around <strong>8 PM</strong> and end at 
              <strong>midnight</strong>, though some venues extend later. Hotel bars tend to offer more 
              upscale experiences, while standalone bars in Juffair and Adliya have a more casual vibe.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Popular venues like Trader Vic's at the Ritz-Carlton get very busy, so <strong>booking 
              ahead is recommended</strong>, especially for groups. Dress codes vary — hotel venues expect 
              elegant attire, while pubs are more casual. Always drink responsibly and arrange safe 
              transportation in advance.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-10">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">What is ladies night in Bahrain?</h3>
                <p className="text-gray-300">
                  Ladies night is a promotional event where women receive free drinks, free entry, or special 
                  discounts at bars, clubs, and lounges. Most run on Tuesday, Wednesday, or Thursday evenings, 
                  typically from 8 PM to midnight.
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Which day is best for ladies night?</h3>
                <p className="text-gray-300">
                  Tuesday and Wednesday have the most venues offering ladies night deals. Tuesday at Trader 
                  Vic's is the most famous. Thursday has good options too but venues are busier as it's the 
                  start of the weekend.
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Do I need to book for ladies night?</h3>
                <p className="text-gray-300">
                  For popular venues like Trader Vic's and CUT Lounge, booking is highly recommended, 
                  especially for groups. Walk-ins are possible at most venues but you may not get a table 
                  during peak hours.
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">What should I wear?</h3>
                <p className="text-gray-300">
                  Smart casual to dressy is appropriate. Hotel venues expect elegant attire — think cocktail 
                  dresses or chic outfits. Pubs are more casual but avoid flip-flops and beachwear everywhere.
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Are ladies nights in Bahrain safe?</h3>
                <p className="text-gray-300">
                  Yes, Bahrain is one of the safest countries in the Middle East. Hotel venues have security, 
                  and the bar districts are well-patrolled. As always, drink responsibly, stay with friends, 
                  and arrange safe transportation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-pink-900/30 to-purple-900/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready for a Night Out?</h2>
            <p className="text-gray-300 text-lg mb-8">
              Explore more nightlife options, events, and things to do in Bahrain.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/nightlife-bahrain"
                className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full text-white font-semibold hover:opacity-90 transition"
              >
                Full Nightlife Guide
              </Link>
              <Link 
                href="/events"
                className="px-8 py-4 bg-gray-800 rounded-full text-white font-semibold hover:bg-gray-700 transition"
              >
                What's On This Week
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
