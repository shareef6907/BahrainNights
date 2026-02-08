import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Calendar, MapPin, Clock, Ticket, Music, Film, Users,
  Sparkles, PartyPopper, Mic2, Trophy, Heart, Star, ExternalLink
} from 'lucide-react';

// SEO Optimized Metadata
export const metadata: Metadata = {
  title: 'Events in Bahrain This Week — What\'s On | BahrainNights',
  description: 'Discover what\'s happening in Bahrain this week! Live concerts, comedy shows, brunches, exhibitions, and more. Your weekly guide to events in the Kingdom of Bahrain.',
  keywords: [
    'events Bahrain this week', 'what\'s on Bahrain', 'Bahrain events today',
    'things to do Bahrain this week', 'concerts Bahrain', 'comedy shows Bahrain',
    'brunch Bahrain this weekend', 'exhibitions Bahrain', 'events Manama',
    'weekend events Bahrain', 'Bahrain nightlife events', 'family events Bahrain',
    'Bahrain entertainment', 'live music Bahrain', 'Platinumlist Bahrain'
  ].join(', '),
  alternates: {
    canonical: 'https://www.bahrainnights.com/bahrain-events-this-week',
  },
  openGraph: {
    title: 'Events in Bahrain This Week — What\'s On',
    description: 'Your weekly guide to events, concerts, shows, and things to do in Bahrain.',
    url: 'https://www.bahrainnights.com/bahrain-events-this-week',
    siteName: 'BahrainNights',
    images: [
      {
        url: 'https://www.bahrainnights.com/og-events.jpg',
        width: 1200,
        height: 630,
        alt: 'Events in Bahrain This Week',
      },
    ],
    type: 'article',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Events in Bahrain This Week',
    description: 'What\'s happening in Bahrain - concerts, shows, brunches & more!',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// JSON-LD Schema
function generateSchema() {
  const today = new Date();
  const weekEnd = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': 'https://www.bahrainnights.com/bahrain-events-this-week#article',
        headline: 'Events in Bahrain This Week — What\'s On',
        description: 'Weekly guide to events, concerts, shows, and entertainment in Bahrain.',
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
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.bahrainnights.com' },
          { '@type': 'ListItem', position: 2, name: 'Events This Week', item: 'https://www.bahrainnights.com/bahrain-events-this-week' }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Where can I find events in Bahrain this week?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'BahrainNights.com is your go-to source for weekly events in Bahrain. We cover concerts, comedy shows, brunches, exhibitions, and family activities. You can also check Platinumlist for ticketed events and Time Out Bahrain for listings.'
            }
          },
          {
            '@type': 'Question',
            name: 'What are the best Friday brunch options in Bahrain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The best Friday brunches include Gulf Hotel\'s Al Waha (most famous), Four Seasons Bay View, Ritz-Carlton La Med, and InterContinental Choices. Prices range from 25-60 BHD with packages including beverages. Book in advance for popular venues.'
            }
          },
          {
            '@type': 'Question',
            name: 'Are there comedy shows in Bahrain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! The Comedy Club at The Gulf Hotel hosts weekly shows on Thursday nights. International comedians regularly perform at special events. Check Platinumlist for upcoming comedy shows and ticket bookings.'
            }
          },
          {
            '@type': 'Question',
            name: 'Where can I buy event tickets in Bahrain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Platinumlist is Bahrain\'s main ticketing platform for concerts, comedy shows, and special events. Some events also sell tickets through Virgin Megastore or at the venue. BahrainNights.com links directly to ticket sources.'
            }
          },
          {
            '@type': 'Question',
            name: 'What family-friendly events happen in Bahrain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Family events include exhibitions at Bahrain National Museum, Bahrain Fort activities, mall entertainment, movie screenings, and seasonal festivals like National Day celebrations and Spring of Culture events.'
            }
          }
        ]
      }
    ]
  };
}

const eventCategories = [
  { name: 'All Events', icon: Calendar, color: 'from-purple-500 to-pink-600' },
  { name: 'Concerts', icon: Music, color: 'from-red-500 to-orange-600' },
  { name: 'Comedy', icon: Mic2, color: 'from-yellow-500 to-amber-600' },
  { name: 'Brunches', icon: Users, color: 'from-green-500 to-emerald-600' },
  { name: 'Exhibitions', icon: Sparkles, color: 'from-blue-500 to-indigo-600' },
  { name: 'Sports', icon: Trophy, color: 'from-orange-500 to-red-600' },
];

// Sample weekly events structure - in production this would be dynamic
const weeklyHighlights = [
  {
    day: 'Thursday',
    events: [
      {
        name: 'Comedy Night at The Gulf',
        venue: 'The Gulf Hotel - Comedy Club',
        time: '9:00 PM',
        type: 'Comedy',
        price: 'From 20 BHD',
        description: 'Weekly stand-up comedy featuring regional and international comedians. The longest-running comedy night in Bahrain delivers laughs every Thursday.',
        ticketLink: 'https://bahrain.platinumlist.net',
        featured: true
      },
      {
        name: 'Ladies Night',
        venue: 'Various Hotel Bars',
        time: '8:00 PM onwards',
        type: 'Nightlife',
        price: 'Free entry + drinks deals',
        description: 'Thursday is the biggest ladies night in Bahrain. Most hotel bars offer free drinks and special packages for ladies.',
        ticketLink: null,
        featured: false
      }
    ]
  },
  {
    day: 'Friday',
    events: [
      {
        name: 'Al Waha Friday Brunch',
        venue: 'Gulf Hotel',
        time: '12:30 PM - 4:00 PM',
        type: 'Brunch',
        price: '35-55 BHD',
        description: 'Bahrain\'s most famous Friday brunch with live cooking stations, unlimited food and beverages, and entertainment. An institution for over 20 years.',
        ticketLink: null,
        featured: true
      },
      {
        name: 'Four Seasons Bay View Brunch',
        venue: 'Four Seasons Hotel',
        time: '1:00 PM - 4:30 PM',
        type: 'Brunch',
        price: '45-65 BHD',
        description: 'Elegant brunch experience with bay views, premium selections including sushi bar, and sophisticated atmosphere.',
        ticketLink: null,
        featured: true
      },
      {
        name: 'Beach Day at Ritz-Carlton',
        venue: 'Ritz-Carlton Bahrain',
        time: 'All Day',
        type: 'Leisure',
        price: 'Pool pass available',
        description: 'Spend the day at Bahrain\'s finest beach resort with pool access, beach, and dining options.',
        ticketLink: null,
        featured: false
      }
    ]
  },
  {
    day: 'Saturday',
    events: [
      {
        name: 'Saturday Brunch',
        venue: 'Various Hotels',
        time: '12:00 PM - 4:00 PM',
        type: 'Brunch',
        price: '25-45 BHD',
        description: 'Several hotels offer Saturday brunches as an alternative to the Friday crowd. Great for a more relaxed experience.',
        ticketLink: null,
        featured: false
      },
      {
        name: 'Bahrain National Museum',
        venue: 'Manama',
        time: '8:00 AM - 8:00 PM',
        type: 'Exhibition',
        price: '1 BHD',
        description: 'Explore Bahrain\'s rich history and culture at the National Museum. Current exhibitions rotate throughout the year.',
        ticketLink: null,
        featured: false
      }
    ]
  },
  {
    day: 'Ongoing',
    events: [
      {
        name: 'Bahrain Fort (Qal\'at al-Bahrain)',
        venue: 'Karbabad',
        time: 'Daily 8:00 AM - 8:00 PM',
        type: 'Exhibition',
        price: 'Free',
        description: 'UNESCO World Heritage Site open daily for exploration. The museum and archaeological site offer insight into 4,000 years of history.',
        ticketLink: null,
        featured: false
      },
      {
        name: 'Tree of Life Visit',
        venue: 'Southern Desert',
        time: '24/7',
        type: 'Attraction',
        price: 'Free',
        description: 'Visit the legendary 400-year-old tree standing alone in the desert. Best visited during sunset for photos.',
        ticketLink: null,
        featured: false
      }
    ]
  }
];

const upcomingHighlights = [
  {
    name: 'Check Platinumlist for Latest',
    date: 'Various Dates',
    venue: 'Multiple Venues',
    type: 'Various',
    description: 'Major concerts and special events are announced regularly. Platinumlist is Bahrain\'s official ticketing platform for entertainment events.',
    ticketLink: 'https://bahrain.platinumlist.net'
  }
];

const venueGuide = [
  {
    name: 'Bahrain National Theatre',
    type: 'Concerts & Shows',
    capacity: '1,001 seats',
    description: 'Premier venue for cultural performances, concerts, and theatrical productions.'
  },
  {
    name: 'The Gulf Hotel - Al Dana',
    type: 'Major Events',
    capacity: '1,000+',
    description: 'Hosts major concerts, New Year\'s Eve events, and large-scale productions.'
  },
  {
    name: 'Bahrain International Circuit',
    type: 'Sports & Concerts',
    capacity: '30,000+',
    description: 'Home of F1 Grand Prix and major outdoor concerts when in season.'
  },
  {
    name: 'The Comedy Club',
    type: 'Comedy',
    capacity: '150',
    description: 'Weekly comedy shows and special performances in intimate setting.'
  },
  {
    name: 'Exhibition World Bahrain',
    type: 'Exhibitions & Trade Shows',
    capacity: 'Varies',
    description: 'Large exhibition center hosting trade shows, expos, and conferences.'
  },
];

export default function EventsThisWeekPage() {
  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);

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
                <li><Link href="/events" className="hover:text-white transition">Events</Link></li>
                <li>/</li>
                <li className="text-white">This Week</li>
              </ol>
            </nav>

            <div className="text-center">
              <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full text-purple-300 text-sm mb-4">
                🎉 Updated Weekly
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Events in Bahrain This Week
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-4">
                Your weekly guide to what's happening in the Kingdom. From concerts and comedy to 
                brunches and exhibitions, never miss a moment.
              </p>
              <p className="text-gray-400">
                <Calendar className="w-4 h-4 inline mr-2" />
                Week of {formattedDate}
              </p>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 px-4 border-y border-gray-800">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3">
              {eventCategories.map((cat) => (
                <button
                  key={cat.name}
                  className={`px-4 py-2 rounded-full bg-gradient-to-r ${cat.color} text-white text-sm font-medium hover:opacity-90 transition flex items-center gap-2`}
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
            <p className="text-gray-300 leading-relaxed">
              Bahrain's event scene is vibrant and varied, offering everything from world-class concerts 
              at the National Theatre to intimate comedy nights and legendary Friday brunches. The Kingdom 
              regularly hosts international acts, regional performers, and unique cultural events that 
              make any week exciting.
            </p>
            <p className="text-gray-300 leading-relaxed">
              This page serves as your weekly guide to what's on. We highlight recurring favorites, 
              special events, and seasonal activities so you never miss out. For ticketed events, 
              we link directly to <strong>Platinumlist</strong>, Bahrain's official entertainment 
              ticketing platform.
            </p>
          </div>
        </section>

        {/* Weekly Events */}
        {weeklyHighlights.map((day) => (
          <section key={day.day} className="py-8 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </span>
                {day.day}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                {day.events.map((event) => (
                  <div 
                    key={event.name}
                    className={`p-6 rounded-xl border transition-all ${
                      event.featured 
                        ? 'bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/50' 
                        : 'bg-gray-800/50 border-gray-700 hover:bg-gray-800'
                    }`}
                  >
                    {event.featured && (
                      <span className="inline-block px-2 py-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded text-xs font-medium mb-3">
                        ⭐ Featured
                      </span>
                    )}
                    
                    <h3 className="text-xl font-semibold text-white mb-2">{event.name}</h3>
                    
                    <div className="flex flex-wrap gap-3 text-sm text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {event.venue}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {event.time}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-4">{event.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-green-400 font-semibold">{event.price}</span>
                      {event.ticketLink && (
                        <a 
                          href={event.ticketLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded-full text-sm transition"
                        >
                          <Ticket className="w-3 h-3" /> Get Tickets
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Platinumlist CTA */}
        <section className="py-16 px-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Looking for Concerts & Special Events?</h2>
            <p className="text-xl text-gray-300 mb-6">
              Platinumlist is Bahrain's official ticketing platform for entertainment events.
            </p>
            <p className="text-gray-400 mb-8">
              From international concerts to comedy specials and exclusive parties, find tickets for 
              upcoming events before they sell out.
            </p>
            <a 
              href="https://bahrain.platinumlist.net" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold hover:opacity-90 transition"
            >
              Browse Events on Platinumlist <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Venue Guide */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-10">Event Venues in Bahrain</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {venueGuide.map((venue) => (
                <div key={venue.name} className="p-5 bg-gray-800/50 rounded-xl border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-1">{venue.name}</h3>
                  <p className="text-purple-400 text-sm mb-2">{venue.type}</p>
                  <p className="text-gray-400 text-sm mb-2">Capacity: {venue.capacity}</p>
                  <p className="text-gray-400 text-sm">{venue.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Weekly Tips */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-10">Weekly Event Tips</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-800/50 rounded-xl">
                <h3 className="text-xl font-semibold text-purple-400 mb-3">🎭 Thursday</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Comedy Club at Gulf Hotel (weekly)</li>
                  <li>• Best night for ladies nights</li>
                  <li>• Pre-weekend parties at clubs</li>
                  <li>• Many restaurants have live music</li>
                </ul>
              </div>
              
              <div className="p-6 bg-gray-800/50 rounded-xl">
                <h3 className="text-xl font-semibold text-green-400 mb-3">🍳 Friday</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Book brunch early (they fill up!)</li>
                  <li>• Most attractions are open</li>
                  <li>• Family-friendly activities available</li>
                  <li>• Evening is quieter at venues</li>
                </ul>
              </div>
              
              <div className="p-6 bg-gray-800/50 rounded-xl">
                <h3 className="text-xl font-semibold text-blue-400 mb-3">☀️ Saturday</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Less crowded than Friday</li>
                  <li>• Great for cultural sites</li>
                  <li>• Pool and beach days</li>
                  <li>• Some Saturday brunches available</li>
                </ul>
              </div>
              
              <div className="p-6 bg-gray-800/50 rounded-xl">
                <h3 className="text-xl font-semibold text-amber-400 mb-3">💡 Pro Tips</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Follow venues on Instagram for updates</li>
                  <li>• Book tickets early for popular events</li>
                  <li>• Join hotel loyalty programs for brunch deals</li>
                  <li>• Summer has fewer events but better prices</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-10">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Where can I find events in Bahrain this week?</h3>
                <p className="text-gray-300">
                  BahrainNights.com is your go-to source for weekly events in Bahrain. We cover concerts, 
                  comedy shows, brunches, exhibitions, and family activities. You can also check Platinumlist 
                  for ticketed events and Time Out Bahrain for listings.
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">What are the best Friday brunch options in Bahrain?</h3>
                <p className="text-gray-300">
                  The best Friday brunches include Gulf Hotel's Al Waha (most famous), Four Seasons Bay View, 
                  Ritz-Carlton La Med, and InterContinental Choices. Prices range from 25-60 BHD with packages 
                  including beverages. Book in advance for popular venues.
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Are there comedy shows in Bahrain?</h3>
                <p className="text-gray-300">
                  Yes! The Comedy Club at The Gulf Hotel hosts weekly shows on Thursday nights. International 
                  comedians regularly perform at special events. Check Platinumlist for upcoming comedy shows 
                  and ticket bookings.
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Where can I buy event tickets in Bahrain?</h3>
                <p className="text-gray-300">
                  Platinumlist is Bahrain's main ticketing platform for concerts, comedy shows, and special 
                  events. Some events also sell tickets through Virgin Megastore or at the venue. 
                  BahrainNights.com links directly to ticket sources.
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">What family-friendly events happen in Bahrain?</h3>
                <p className="text-gray-300">
                  Family events include exhibitions at Bahrain National Museum, Bahrain Fort activities, 
                  mall entertainment, movie screenings, and seasonal festivals like National Day celebrations 
                  and Spring of Culture events.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Links */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white text-center mb-8">More to Explore</h2>
            
            <div className="grid md:grid-cols-4 gap-4">
              <Link href="/events" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition text-center group">
                <span className="text-3xl mb-3 block">📅</span>
                <h3 className="font-semibold text-white group-hover:text-purple-300">All Events</h3>
                <p className="text-sm text-gray-400 mt-2">Full events calendar</p>
              </Link>
              
              <Link href="/guides/brunch" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition text-center group">
                <span className="text-3xl mb-3 block">🥂</span>
                <h3 className="font-semibold text-white group-hover:text-purple-300">Brunch Guide</h3>
                <p className="text-sm text-gray-400 mt-2">All Friday brunches</p>
              </Link>
              
              <Link href="/bahrain-nightlife-guide" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition text-center group">
                <span className="text-3xl mb-3 block">🌙</span>
                <h3 className="font-semibold text-white group-hover:text-purple-300">Nightlife</h3>
                <p className="text-sm text-gray