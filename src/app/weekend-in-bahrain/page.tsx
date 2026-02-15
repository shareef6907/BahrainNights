import { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { 
  MapPin, Clock, Calendar, Sun, Moon, Sunrise, Sunset,
  Coffee, Utensils, Waves, Camera, Landmark, ShoppingBag,
  ArrowRight, Star, Users, Palmtree, Music, Heart, Car
} from 'lucide-react';

// SEO Optimized Metadata
export const metadata: Metadata = {
  title: 'Your Perfect Weekend in Bahrain (2026) — 48-Hour Itinerary | BahrainNights',
  description: 'Plan your perfect weekend in Bahrain with our 48-hour itinerary! From Friday brunch to Saturday beach, discover the best way to spend 2 days in Bahrain.',
  keywords: [
    'weekend in Bahrain', 'Bahrain itinerary', '48 hours in Bahrain', '2 days in Bahrain',
    'Bahrain weekend trip', 'Bahrain travel itinerary', 'what to do weekend Bahrain',
    'Bahrain short trip', 'Bahrain weekend guide', 'visit Bahrain weekend',
    'Bahrain Friday Saturday', 'Bahrain staycation', 'Bahrain day trip'
  ].join(', '),
  alternates: {
    canonical: 'https://www.bahrainnights.com/weekend-in-bahrain',
  },
  openGraph: {
    title: 'Your Perfect Weekend in Bahrain (2026) — 48-Hour Itinerary',
    description: 'The ultimate guide to spending a weekend in Bahrain. Curated itinerary for 48 amazing hours.',
    url: 'https://www.bahrainnights.com/weekend-in-bahrain',
    siteName: 'BahrainNights',
    images: [
      {
        url: 'https://www.bahrainnights.com/og-weekend.jpg',
        width: 1200,
        height: 630,
        alt: 'Weekend in Bahrain',
      },
    ],
    type: 'article',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Perfect Weekend in Bahrain',
    description: '48-hour itinerary for an amazing Bahrain weekend!',
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

interface WeekendEvent {
  id: string;
  title: string;
  slug: string;
  venue_name: string;
  date: string;
  cover_url: string;
}

async function getWeekendEvents(): Promise<WeekendEvent[]> {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const today = new Date();
    
    // Find next Thursday-Friday (the Gulf weekend)
    const dayOfWeek = today.getDay();
    const daysUntilThursday = (4 - dayOfWeek + 7) % 7;
    const nextThursday = new Date(today);
    nextThursday.setDate(today.getDate() + daysUntilThursday);
    const nextFriday = new Date(nextThursday);
    nextFriday.setDate(nextThursday.getDate() + 1);
    
    const thursdayStr = nextThursday.toISOString().split('T')[0];
    const fridayStr = nextFriday.toISOString().split('T')[0];
    
    const { data } = await supabase
      .from('events')
      .select('id, title, slug, venue_name, date, cover_url')
      .eq('status', 'published')
      .eq('is_hidden', false)
      .or(`date.eq.${thursdayStr},date.eq.${fridayStr}`)
      .order('date', { ascending: true })
      .limit(8);
    
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
        '@id': 'https://www.bahrainnights.com/weekend-in-bahrain#article',
        headline: 'Your Perfect Weekend in Bahrain — 48-Hour Itinerary 2026',
        description: 'Plan your perfect weekend in Bahrain with this comprehensive 48-hour itinerary.',
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
        '@type': 'TouristTrip',
        name: 'Perfect Weekend in Bahrain',
        description: '48-hour itinerary covering culture, dining, beaches, and nightlife',
        touristType: ['Weekend Travelers', 'Couples', 'Solo Travelers', 'Families'],
        itinerary: {
          '@type': 'ItemList',
          numberOfItems: 2,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Day 1 - Culture & Nightlife', description: 'Explore old Manama, Friday brunch, sunset drinks, nightlife' },
            { '@type': 'ListItem', position: 2, name: 'Day 2 - Beach & Relaxation', description: 'Beach club, shopping, traditional dinner, sunset' }
          ]
        }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.bahrainnights.com' },
          { '@type': 'ListItem', position: 2, name: 'Weekend in Bahrain', item: 'https://www.bahrainnights.com/weekend-in-bahrain' }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Is a weekend enough to visit Bahrain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! A weekend (2-3 days) is perfect for experiencing Bahrain\'s highlights. You can visit historical sites, enjoy the beaches, experience the dining scene, and enjoy the nightlife. It\'s ideal for a quick getaway from Saudi Arabia or the UAE.'
            }
          },
          {
            '@type': 'Question',
            name: 'When is the weekend in Bahrain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The weekend in Bahrain is Friday and Saturday. Thursday night marks the start of weekend activities and is the main party night. Most people arrive Thursday evening and leave Saturday night or Sunday.'
            }
          }
        ]
      }
    ]
  };
}

const day1 = {
  title: 'Day 1: Culture, Brunch & Nightlife',
  subtitle: 'Thursday Night + Friday',
  icon: Sun,
  color: 'from-amber-500 to-orange-600',
  timeline: [
    {
      time: 'Thursday Evening',
      title: 'Arrive & Check In',
      icon: Car,
      description: 'Arrive in Bahrain via the King Fahd Causeway or Bahrain International Airport. Check into your hotel and freshen up.',
      tips: [
        'Book a hotel in Manama, Seef, or near the waterfront',
        'If driving from Saudi, expect 30-60 min at the causeway',
        'Airport is only 15 minutes from downtown'
      ],
      recommended: ['Four Seasons', 'Ritz-Carlton', 'Gulf Hotel', 'Intercontinental'],
      link: '/guides/hotels'
    },
    {
      time: '9:00 PM',
      title: 'Thursday Night Dinner',
      icon: Utensils,
      description: 'Start your weekend with dinner at one of Bahrain\'s excellent restaurants. Thursday night is the main party night, so book ahead at popular spots.',
      tips: [
        'Make reservations in advance for popular restaurants',
        'Adliya has great restaurant options within walking distance of bars',
        'Consider a rooftop dinner for stunning views'
      ],
      recommended: ['CUT by Wolfgang Puck', 'Bushido', 'Block 338', 'Masso'],
      link: '/best-restaurants-bahrain'
    },
    {
      time: '11:00 PM',
      title: 'Thursday Night Out',
      icon: Moon,
      description: 'Experience Bahrain\'s legendary Thursday nightlife. The party peaks between midnight and 3am.',
      tips: [
        'Juffair for clubs, Adliya for bars',
        'Ladies get free drinks at many venues',
        'Dress smart casual — no shorts or flip-flops'
      ],
      recommended: ['Club Downtown', 'Block 338', 'CUT Lounge', 'Hazel Rooftop'],
      link: '/bahrain-nightlife-guide'
    },
    {
      time: 'Friday Morning',
      title: 'Late Start & Coffee',
      icon: Coffee,
      description: 'Sleep in after Thursday night (you\'ve earned it!). Start your Friday with specialty coffee at one of Bahrain\'s trendy cafés.',
      tips: [
        'Most brunch bookings are 12:30-1:00 PM start',
        'Some cafés open from 8 AM for early risers',
        'Try Arabic coffee for an authentic experience'
      ],
      recommended: ['198 Cafe', 'Crust & Crema', 'Lilou', 'Furn Bistro'],
      link: '/guides/cafes'
    },
    {
      time: '12:30 PM',
      title: 'Friday Brunch',
      icon: Utensils,
      description: 'The highlight of any Bahrain weekend! Friday brunch is a Gulf institution — unlimited food and drinks for 3-4 hours at top hotels.',
      tips: [
        'Book at least a week in advance',
        'Budget 25-50 BHD per person including drinks',
        'Pace yourself — brunches last until 4 PM',
        'Gulf Hotel\'s Al Waha brunch is the most famous'
      ],
      recommended: ['Gulf Hotel Al Waha', 'Four Seasons', 'Ritz-Carlton', 'InterContinental'],
      link: '/guides/brunch'
    },
    {
      time: '4:30 PM',
      title: 'Cultural Exploration',
      icon: Landmark,
      description: 'After brunch, explore Bahrain\'s rich heritage. The old areas are beautiful in the late afternoon light.',
      tips: [
        'Bahrain Fort has stunning sunset views',
        'Manama Souq is perfect for evening shopping',
        'Al Fateh Mosque offers free guided tours'
      ],
      recommended: ['Bahrain Fort', 'National Museum', 'Manama Souq', 'Al Fateh Mosque'],
      link: '/things-to-do-in-bahrain'
    },
    {
      time: '7:00 PM',
      title: 'Sunset Drinks',
      icon: Sunset,
      description: 'Watch the sunset over Bahrain Bay with a cocktail in hand. Several rooftop bars offer spectacular views.',
      tips: [
        'Four Seasons rooftop has the best views',
        'Many hotel bars have sunset happy hours',
        'Bahrain Bay waterfront is perfect for a sunset walk'
      ],
      recommended: ['CUT Lounge', 'Hazel Rooftop', 'Sky Lounge', 'Trader Vic\'s'],
      link: '/lounges-bars'
    },
    {
      time: '9:00 PM',
      title: 'Friday Night Dinner',
      icon: Utensils,
      description: 'A lighter dinner after a big brunch. Try seafood, Middle Eastern cuisine, or casual fare.',
      tips: [
        'Friday nights are more relaxed than Thursday',
        'Many restaurants have live music on Fridays',
        'Budaiya Road has great local seafood options'
      ],
      recommended: ['La Mer', 'Lanterns', 'Bahraini Heritage', 'Fish Market'],
      link: '/restaurants'
    },
    {
      time: '11:00 PM',
      title: 'Friday Night Options',
      icon: Music,
      description: 'Friday nights are more laid-back. Enjoy live music, shisha, or continue the party if you still have energy!',
      tips: [
        'Live music at JJ\'s, Coda, or Sherlock Holmes',
        'Shisha cafes are open late',
        'Some clubs are quieter on Friday (Saturday is a work day for some)'
      ],
      recommended: ['Coda Jazz Lounge', 'JJ\'s Irish Pub', 'Block 338', 'Sherlock Holmes'],
      link: '/guides/nightlife'
    }
  ]
};

const day2 = {
  title: 'Day 2: Beach, Shopping & Sunset',
  subtitle: 'Saturday',
  icon: Waves,
  color: 'from-cyan-500 to-blue-600',
  timeline: [
    {
      time: '9:00 AM',
      title: 'Breakfast',
      icon: Coffee,
      description: 'Start Saturday with a proper breakfast at a local café or your hotel.',
      tips: [
        'Haji\'s Café in Muharraq for authentic Bahraini breakfast',
        'Most hotel breakfasts run until 10:30 AM',
        'Try balaleet (sweet vermicelli with eggs)'
      ],
      recommended: ['Haji\'s Café', 'Lilou', 'Hotel Breakfast', 'Furn Bistro'],
      link: '/guides/cafes'
    },
    {
      time: '10:30 AM',
      title: 'Beach Club Day',
      icon: Waves,
      description: 'Spend your Saturday at a beach club. Swim, sunbathe, and enjoy pool vibes. This is quintessential Bahrain.',
      tips: [
        'Book ahead on weekends — beach clubs fill up',
        'Day passes range from 15-40 BHD',
        'Bring sunscreen and swimwear',
        'Most have pools, beach, and restaurants on-site'
      ],
      recommended: ['Coral Bay', 'Jumeirah Beach', 'Ritz Beach Club', 'Sofitel Beach'],
      link: '/beach-pool-clubs'
    },
    {
      time: '2:00 PM',
      title: 'Lunch at the Beach',
      icon: Utensils,
      description: 'Enjoy lunch at the beach club without leaving your lounger. Fresh salads, grilled items, and cold drinks.',
      tips: [
        'Beach club restaurants are excellent',
        'Stay hydrated — it\'s hot!',
        'Consider a day bed or cabana for extra comfort'
      ],
      recommended: ['Beach Club Restaurant', 'Poolside Service'],
      link: '/beach-pool-clubs'
    },
    {
      time: '4:00 PM',
      title: 'Shopping Time',
      icon: ShoppingBag,
      description: 'Hit the malls for air-conditioned shopping. Bahrain has excellent malls with international and local brands.',
      tips: [
        'City Centre is the biggest with 350+ stores',
        'Marassi Galleria for luxury waterfront shopping',
        'Gold City for jewelry at good prices'
      ],
      recommended: ['City Centre Bahrain', 'Marassi Galleria', 'Seef Mall', 'The Avenues'],
      link: '/guides/malls'
    },
    {
      time: '6:30 PM',
      title: 'Tree of Life Excursion',
      icon: Palmtree,
      description: 'If time permits, make a quick trip to the mysterious Tree of Life — a 400-year-old tree in the desert with no water source.',
      tips: [
        '20-minute drive from Manama',
        'Best at sunset for photos',
        'Combine with a desert drive'
      ],
      recommended: ['Tree of Life', 'Oil Museum (nearby)'],
      link: '/attractions'
    },
    {
      time: '7:30 PM',
      title: 'Sunset at Bahrain Bay',
      icon: Sunset,
      description: 'End your trip with sunset views at Bahrain Bay. The waterfront promenade is perfect for an evening stroll.',
      tips: [
        'Walk along the corniche',
        'Great photo opportunities with the skyline',
        'Several casual dining options nearby'
      ],
      recommended: ['Bahrain Bay', 'Water Garden City', 'Four Seasons Promenade'],
      link: '/places'
    },
    {
      time: '8:30 PM',
      title: 'Farewell Dinner',
      icon: Heart,
      description: 'Your last meal in Bahrain. Choose something memorable — maybe traditional Bahraini cuisine you haven\'t tried yet.',
      tips: [
        'Try machboos if you haven\'t yet',
        'Seafood by the water is always special',
        'Book a restaurant with a view'
      ],
      recommended: ['Bahraini Heritage', 'La Mer', 'Lanterns', 'Al Abraaj'],
      link: '/best-restaurants-bahrain'
    },
    {
      time: '10:30 PM',
      title: 'Departure',
      icon: Car,
      description: 'Head to the airport or back over the causeway. If flying, arrive 2 hours early. If driving, expect traffic on Saturday nights.',
      tips: [
        'Saturday evening causeway traffic can be heavy',
        'Duty-free at the airport is excellent',
        'Airport is compact and efficient'
      ],
      recommended: [],
      link: ''
    }
  ]
};

const alternativeItineraries = [
  {
    title: 'Couples Romantic Weekend',
    description: 'Spa, fine dining, sunset cocktails',
    activities: ['Couples spa at Ritz-Carlton', 'Private beach dinner', 'Rooftop drinks', 'Al Dar Islands trip'],
    icon: Heart
  },
  {
    title: 'Family Weekend',
    description: 'Kids activities and family fun',
    activities: ['Lost Paradise Water Park', 'Bahrain Fort exploration', 'Cinema at City Centre', 'Beach day at Coral Bay'],
    icon: Users
  },
  {
    title: 'Adventure Weekend',
    description: 'Active and thrilling experiences',
    activities: ['Desert safari', 'Jet skiing at Amwaj', 'Scuba diving', 'F1 track experience'],
    icon: Waves
  },
  {
    title: 'Culture & History',
    description: 'Deep dive into heritage',
    activities: ['Full Muharraq heritage trail', 'National Museum', 'Pearl diving experience', 'Traditional dinner'],
    icon: Landmark
  }
];

const practicalTips = [
  { title: 'Best Time to Visit', desc: 'October to April for pleasant weather. Avoid June-August unless you love heat (40°C+). Ramadan timing varies — check dates.' },
  { title: 'Getting Around', desc: 'Taxis and ride-hailing (Uber-like apps) work well. Renting a car gives more freedom. No public transport to speak of.' },
  { title: 'Budget', desc: 'Mid-range weekend: 200-300 BHD. Luxury weekend: 500+ BHD. This covers hotel, dining, activities, and nightlife.' },
  { title: 'What to Pack', desc: 'Smart casual clothes for restaurants/bars. Swimwear for beaches. Light layers for AC. Comfortable walking shoes.' },
  { title: 'Alcohol', desc: 'Available at licensed venues (hotels and select restaurants). No public drinking. 21+ age limit.' },
  { title: 'Dress Code', desc: 'Liberal compared to neighbors, but still respectful. Covered shoulders in malls/public. Smart dress for upscale venues.' },
];

export default async function WeekendPage() {
  const events = await getWeekendEvents();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSchema()) }}
      />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/30 to-amber-900/30" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <nav className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li>/</li>
                <li className="text-white">Weekend in Bahrain</li>
              </ol>
            </nav>

            <div className="text-center">
              <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-cyan-500/20 to-amber-500/20 rounded-full text-cyan-300 text-sm mb-4">
                📅 48-Hour Itinerary
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-amber-200 bg-clip-text text-transparent">
                Your Perfect Weekend in Bahrain
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Whether you're coming from Saudi Arabia for a quick escape or planning a short getaway, 
                this 48-hour itinerary covers the best of what Bahrain has to offer.
              </p>
              
              <div className="flex flex-wrap justify-center gap-8 mt-10">
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400">48</div>
                  <div className="text-sm text-gray-400">Hours</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-400">15+</div>
                  <div className="text-sm text-gray-400">Experiences</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-400">1</div>
                  <div className="text-sm text-gray-400">Amazing Weekend</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Overview */}
        <section className="py-8 px-4 border-y border-gray-800">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4">
              <a href="#day-1" className={`p-6 rounded-xl bg-gradient-to-r ${day1.color} hover:opacity-90 transition`}>
                <div className="flex items-center gap-4">
                  <day1.icon className="w-10 h-10 text-white" />
                  <div>
                    <h3 className="text-xl font-bold text-white">{day1.title}</h3>
                    <p className="text-white/80">{day1.subtitle}</p>
                  </div>
                </div>
              </a>
              <a href="#day-2" className={`p-6 rounded-xl bg-gradient-to-r ${day2.color} hover:opacity-90 transition`}>
                <div className="flex items-center gap-4">
                  <day2.icon className="w-10 h-10 text-white" />
                  <div>
                    <h3 className="text-xl font-bold text-white">{day2.title}</h3>
                    <p className="text-white/80">{day2.subtitle}</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
            <h2 className="text-3xl font-bold text-white mb-6">Why a Weekend in Bahrain?</h2>
            <p className="text-gray-300 leading-relaxed">
              Bahrain is the perfect weekend destination. Small enough to experience in 48 hours, yet packed 
              with enough variety to fill every moment. Thousands of visitors from Saudi Arabia cross the 
              causeway every weekend to enjoy Bahrain's <strong>liberal atmosphere, excellent dining, 
              beautiful beaches, and vibrant nightlife</strong>.
            </p>
            <p className="text-gray-300 leading-relaxed">
              This itinerary assumes you arrive Thursday evening and leave Saturday night — the classic 
              Gulf weekend. We've balanced culture, relaxation, dining, and nightlife to give you the 
              complete Bahrain experience. Feel free to adjust based on your interests!
            </p>
            <div className="bg-gray-800/50 rounded-xl p-6 mt-6">
              <h3 className="text-xl font-semibold text-amber-400 mb-3">⚡ Weekend Quick Facts</h3>
              <ul className="text-gray-300 space-y-2">
                <li><strong>When:</strong> Weekend = Friday-Saturday (Thursday night is party night)</li>
                <li><strong>Getting there:</strong> King Fahd Causeway (from Saudi) or fly into BAH</li>
                <li><strong>Budget:</strong> Mid-range 200-300 BHD, Luxury 500+ BHD for the weekend</li>
                <li><strong>Weather:</strong> Best October-April (pleasant), Summer is HOT (40°C+)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Day 1 Timeline */}
        <section id="day-1" className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className={`flex items-center gap-4 mb-10 p-6 rounded-xl bg-gradient-to-r ${day1.color}`}>
              <day1.icon className="w-10 h-10 text-white" />
              <div>
                <h2 className="text-3xl font-bold text-white">{day1.title}</h2>
                <p className="text-white/80">{day1.subtitle}</p>
              </div>
            </div>
            
            <div className="space-y-8">
              {day1.timeline.map((item, index) => (
                <div key={index} className="relative pl-8 border-l-2 border-amber-500/30">
                  <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
                    <item.icon className="w-3 h-3 text-white" />
                  </div>
                  
                  <div className="bg-gray-800/50 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="text-amber-400 font-semibold text-sm">{item.time}</span>
                        <h3 className="text-xl font-bold text-white">{item.title}</h3>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{item.description}</p>
                    
                    <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">💡 Tips</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        {item.tips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-amber-400">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {item.recommended.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        <span className="text-sm text-gray-400">Recommended:</span>
                        {item.recommended.map((rec) => (
                          <span key={rec} className="px-2 py-1 bg-amber-500/20 rounded text-xs text-amber-300">
                            {rec}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {item.link && (
                      <Link 
                        href={item.link} 
                        className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 text-sm mt-4"
                      >
                        See more options <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Day 2 Timeline */}
        <section id="day-2" className="py-16 px-4 bg-gray-800/20">
          <div className="max-w-4xl mx-auto">
            <div className={`flex items-center gap-4 mb-10 p-6 rounded-xl bg-gradient-to-r ${day2.color}`}>
              <day2.icon className="w-10 h-10 text-white" />
              <div>
                <h2 className="text-3xl font-bold text-white">{day2.title}</h2>
                <p className="text-white/80">{day2.subtitle}</p>
              </div>
            </div>
            
            <div className="space-y-8">
              {day2.timeline.map((item, index) => (
                <div key={index} className="relative pl-8 border-l-2 border-cyan-500/30">
                  <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center">
                    <item.icon className="w-3 h-3 text-white" />
                  </div>
                  
                  <div className="bg-gray-800/50 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="text-cyan-400 font-semibold text-sm">{item.time}</span>
                        <h3 className="text-xl font-bold text-white">{item.title}</h3>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{item.description}</p>
                    
                    <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">💡 Tips</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        {item.tips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-cyan-400">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {item.recommended.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        <span className="text-sm text-gray-400">Recommended:</span>
                        {item.recommended.map((rec) => (
                          <span key={rec} className="px-2 py-1 bg-cyan-500/20 rounded text-xs text-cyan-300">
                            {rec}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {item.link && (
                      <Link 
                        href={item.link} 
                        className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-sm mt-4"
                      >
                        See more options <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Alternative Itineraries */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-10">Alternative Weekend Ideas</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {alternativeItineraries.map((alt) => (
                <div key={alt.title} className="bg-gray-800/50 rounded-xl p-6">
                  <alt.icon className="w-8 h-8 text-purple-400 mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">{alt.title}</h3>
                  <p className="text-sm text-gray-400 mb-4">{alt.description}</p>
                  <ul className="text-sm text-gray-300 space-y-1">
                    {alt.activities.map((act) => (
                      <li key={act} className="flex items-center gap-2">
                        <span className="text-purple-400">•</span>
                        {act}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* This Weekend's Events */}
        {events.length > 0 && (
          <section className="py-16 px-4 bg-gray-800/30">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <Calendar className="w-8 h-8 text-cyan-400" />
                  This Weekend's Events
                </h2>
                <Link 
                  href="/events/this-weekend" 
                  className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2"
                >
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="grid md:grid-cols-4 gap-6">
                {events.slice(0, 4).map((event) => (
                  <Link
                    key={event.id}
                    href={`/events/${event.slug}`}
                    className="group bg-gray-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-cyan-500 transition"
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
                      <div className="text-sm text-cyan-400 mb-2">
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                      <h3 className="font-semibold text-white group-hover:text-cyan-300 transition line-clamp-2">
                        {event.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Practical Tips */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-10">Practical Tips</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {practicalTips.map((tip) => (
                <div key={tip.title} className="bg-gray-800/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-cyan-400 mb-3">{tip.title}</h3>
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
                <h3 className="text-xl font-semibold text-white mb-3">Is a weekend enough to visit Bahrain?</h3>
                <p className="text-gray-300">
                  Yes! A weekend (2-3 days) is perfect for experiencing Bahrain's highlights. You can visit 
                  historical sites, enjoy the beaches, experience the dining scene, and enjoy the nightlife. 
                  It's ideal for a quick getaway from Saudi Arabia or the UAE.
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">When is the weekend in Bahrain?</h3>
                <p className="text-gray-300">
                  The weekend in Bahrain is Friday and Saturday. Thursday night marks the start of weekend 
                  activities and is the main party night. Most visitors arrive Thursday evening and leave 
                  Saturday night or Sunday.
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">How do I get to Bahrain from Saudi Arabia?</h3>
                <p className="text-gray-300">
                  The King Fahd Causeway connects Saudi Arabia to Bahrain. The drive takes about 30-60 minutes 
                  depending on traffic and border processing. You'll need valid ID/passport and potentially 
                  a visa (GCC residents can enter freely). Expect queues on Thursday evenings.
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">What should I not miss on a weekend trip?</h3>
                <p className="text-gray-300">
                  Must-dos: Friday brunch (book ahead!), exploring Bahrain Fort at sunset, at least one 
                  night out in Juffair or Adliya, a beach club day, and traditional Bahraini food. 
                  If you have extra time, add the Tree of Life and Muharraq heritage trail.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Guides */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-10">Plan Your Weekend</h2>
            
            <div className="grid md:grid-cols-4 gap-4">
              <Link href="/things-to-do-in-bahrain" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition text-center group">
                <Camera className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                <h3 className="font-semibold text-white group-hover:text-amber-300">Things to Do</h3>
                <p className="text-sm text-gray-400 mt-2">50 best activities</p>
              </Link>
              
              <Link href="/best-restaurants-bahrain" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition text-center group">
                <Utensils className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                <h3 className="font-semibold text-white group-hover:text-orange-300">Restaurants</h3>
                <p className="text-sm text-gray-400 mt-2">Where to eat</p>
              </Link>
              
              <Link href="/bahrain-nightlife-guide" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition text-center group">
                <Moon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <h3 className="font-semibold text-white group-hover:text-purple-300">Nightlife</h3>
                <p className="text-sm text-gray-400 mt-2">Bars & clubs</p>
              </Link>
              
              <Link href="/events/this-weekend" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition text-center group">
                <Calendar className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                <h3 className="font-semibold text-white group-hover:text-cyan-300">This Weekend</h3>
                <p className="text-sm text-gray-400 mt-2">Events happening</p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-cyan-900/30 to-amber-900/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready for Your Bahrain Weekend?</h2>
            <p className="text-gray-300 text-lg mb-8">
              Browse events, make reservations, and plan the perfect getaway.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/events"
                className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full text-white font-semibold hover:opacity-90 transition"
              >
                Browse Events
              </Link>
              <Link 
                href="/guides/hotels"
                className="px-8 py-4 bg-gray-800 rounded-full text-white font-semibold hover:bg-gray-700 transition"
              >
                Find Hotels
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
