import { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { 
  MapPin, Calendar, Utensils, Music, Film, Users, 
  Sun, Moon, ShoppingBag, Landmark, Waves, Car,
  Star, ArrowRight, Clock, Camera, Palmtree, Building2,
  Heart, Compass, Ticket, Coffee, Sparkles, Trophy
} from 'lucide-react';

// SEO Optimized Metadata
export const metadata: Metadata = {
  title: '50 Best Things to Do in Bahrain (2026) — Ultimate Activity Guide | BahrainNights',
  description: 'Discover the 50 best things to do in Bahrain in 2026! From historical sites and beaches to nightlife, restaurants, and family activities. Your complete Bahrain bucket list with insider tips.',
  keywords: [
    'things to do in Bahrain', 'Bahrain activities', 'Bahrain attractions 2026',
    'what to do in Bahrain', 'Bahrain tourist places', 'Bahrain bucket list',
    'best activities Bahrain', 'Bahrain sightseeing', 'Bahrain tourism guide',
    'visit Bahrain', 'Bahrain travel guide', 'Bahrain experiences',
    'Bahrain day trips', 'Bahrain weekend activities', 'fun in Bahrain'
  ].join(', '),
  alternates: {
    canonical: 'https://www.bahrainnights.com/things-to-do-in-bahrain',
  },
  openGraph: {
    title: '50 Best Things to Do in Bahrain (2026) — Ultimate Activity Guide',
    description: 'The definitive guide to experiencing Bahrain. 50 incredible activities from beaches and culture to nightlife and adventure.',
    url: 'https://www.bahrainnights.com/things-to-do-in-bahrain',
    siteName: 'BahrainNights',
    images: [
      {
        url: 'https://www.bahrainnights.com/og-things-to-do.jpg',
        width: 1200,
        height: 630,
        alt: 'Things to Do in Bahrain - Complete Guide',
      },
    ],
    type: 'article',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: '50 Best Things to Do in Bahrain (2026)',
    description: 'Your complete Bahrain activity guide - beaches, culture, food, nightlife & more!',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Force dynamic for fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

// Supabase setup
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

interface UpcomingEvent {
  id: string;
  title: string;
  slug: string;
  venue_name: string;
  date: string;
  category: string;
  cover_url: string;
}

interface FeaturedVenue {
  id: string;
  name: string;
  slug: string;
  category: string;
  area: string;
  rating: number;
}

async function getUpcomingEvents(): Promise<UpcomingEvent[]> {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const today = new Date().toISOString().split('T')[0];
    
    const { data } = await supabase
      .from('events')
      .select('id, title, slug, venue_name, date, category, cover_url')
      .eq('status', 'published')
      .eq('is_hidden', false)
      .eq('country', 'Bahrain')
      .gte('date', today)
      .order('date', { ascending: true })
      .limit(6);
    
    return data || [];
  } catch {
    return [];
  }
}

async function getFeaturedVenues(): Promise<FeaturedVenue[]> {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const { data } = await supabase
      .from('venues')
      .select('id, name, slug, category, area, rating')
      .eq('status', 'approved')
      .order('rating', { ascending: false })
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
        '@id': 'https://www.bahrainnights.com/things-to-do-in-bahrain#article',
        headline: '50 Best Things to Do in Bahrain (2026)',
        description: 'Discover the 50 best things to do in Bahrain. From historical sites and beaches to nightlife and family activities.',
        image: 'https://www.bahrainnights.com/og-things-to-do.jpg',
        author: {
          '@type': 'Organization',
          name: 'BahrainNights',
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
        dateModified: new Date().toISOString().split('T')[0],
        mainEntityOfPage: 'https://www.bahrainnights.com/things-to-do-in-bahrain'
      },
      {
        '@type': 'ItemList',
        '@id': 'https://www.bahrainnights.com/things-to-do-in-bahrain#list',
        name: '50 Best Things to Do in Bahrain',
        itemListOrder: 'https://schema.org/ItemListOrderDescending',
        numberOfItems: 50,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Visit Bahrain Fort (Qal\'at al-Bahrain)', url: 'https://www.bahrainnights.com/attractions' },
          { '@type': 'ListItem', position: 2, name: 'Explore Manama Souq', url: 'https://www.bahrainnights.com/guides/souks' },
          { '@type': 'ListItem', position: 3, name: 'Swim at Al Dar Islands', url: 'https://www.bahrainnights.com/attractions' },
          { '@type': 'ListItem', position: 4, name: 'Experience Bahrain Nightlife in Juffair', url: 'https://www.bahrainnights.com/guides/nightlife-juffair' },
          { '@type': 'ListItem', position: 5, name: 'Watch the Sunset at Bahrain Bay', url: 'https://www.bahrainnights.com/places' },
        ]
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.bahrainnights.com' },
          { '@type': 'ListItem', position: 2, name: 'Things to Do in Bahrain', item: 'https://www.bahrainnights.com/things-to-do-in-bahrain' }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What are the must-see attractions in Bahrain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The must-see attractions in Bahrain include Bahrain Fort (UNESCO World Heritage), the National Museum, Al Fateh Grand Mosque, Tree of Life, and Manama Souq. For beaches, visit Al Dar Islands or Amwaj.'
            }
          },
          {
            '@type': 'Question',
            name: 'Is Bahrain good for tourists?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! Bahrain is excellent for tourists. It offers a unique blend of rich history, modern attractions, beautiful beaches, world-class dining, vibrant nightlife, and warm hospitality. Most nationalities can get visa on arrival.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is Bahrain famous for?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Bahrain is famous for its ancient Dilmun civilization, pearl diving heritage, Formula 1 Grand Prix, liberal atmosphere in the Gulf, excellent nightlife, and being a financial hub. It\'s also known for the Tree of Life and beautiful mosques.'
            }
          }
        ]
      }
    ]
  };
}

const activities = [
  {
    category: 'Historical & Cultural',
    icon: Landmark,
    color: 'from-amber-500 to-orange-600',
    items: [
      { num: 1, name: 'Bahrain Fort (Qal\'at al-Bahrain)', desc: 'UNESCO World Heritage site with 4,000 years of history. Explore ancient ruins and the on-site museum. Free entry.', link: '/attractions' },
      { num: 2, name: 'Bahrain National Museum', desc: 'The largest museum in Bahrain showcasing 6,000 years of history. Beautiful architecture and fascinating exhibits.', link: '/guides/museums' },
      { num: 3, name: 'Al Fateh Grand Mosque', desc: 'One of the largest mosques in the world. Free guided tours available. Stunning architecture and peaceful atmosphere.', link: '/attractions' },
      { num: 4, name: 'Manama Souq', desc: 'Traditional market in the heart of the capital. Shop for gold, spices, textiles, and souvenirs.', link: '/guides/souks' },
      { num: 5, name: 'Bab Al Bahrain', desc: 'Historic gateway to Manama Souq. Great photo opportunity and starting point for old town exploration.', link: '/attractions' },
      { num: 6, name: 'Muharraq Heritage Trail', desc: 'Walk through UNESCO-listed pearling path. Traditional houses, old mosques, and authentic Bahraini culture.', link: '/guides/historical-sites' },
      { num: 7, name: 'A\'ali Burial Mounds', desc: 'Ancient burial mounds dating back to Dilmun civilization. UNESCO World Heritage site.', link: '/attractions' },
      { num: 8, name: 'Beit Al Quran', desc: 'Museum dedicated to Islamic arts with rare Quran manuscripts and beautiful calligraphy.', link: '/guides/museums' },
    ]
  },
  {
    category: 'Beaches & Water Activities',
    icon: Waves,
    color: 'from-cyan-500 to-blue-600',
    items: [
      { num: 9, name: 'Al Dar Islands', desc: 'Take a boat to this private island paradise. Crystal clear waters, beach activities, and dolphin watching.', link: '/attractions' },
      { num: 10, name: 'Amwaj Islands Beach', desc: 'Beautiful public beach with water sports. Jet skiing, kayaking, and beachside cafes.', link: '/guides/public-beaches' },
      { num: 11, name: 'Coral Bay Beach Club', desc: 'Family-friendly beach resort with pools, slides, and beach access. Great for a day trip.', link: '/beach-pool-clubs' },
      { num: 12, name: 'Jet Ski Adventure', desc: 'Rent a jet ski at Amwaj or hire a tour. Thrilling way to explore Bahrain\'s coastline.', link: '/attractions' },
      { num: 13, name: 'Scuba Diving', desc: 'Explore underwater wrecks and coral reefs. Multiple dive centers offer courses and trips.', link: '/attractions' },
      { num: 14, name: 'Fishing Trip', desc: 'Traditional dhow fishing or modern sport fishing. Catch hammour, king fish, and more.', link: '/attractions' },
      { num: 15, name: 'Kayaking in Tubli Bay', desc: 'Paddle through mangroves and spot flamingos. Peaceful nature experience.', link: '/guides/outdoor-activities' },
    ]
  },
  {
    category: 'Nightlife & Entertainment',
    icon: Moon,
    color: 'from-purple-500 to-pink-600',
    items: [
      { num: 16, name: 'Juffair Nightlife', desc: 'Bahrain\'s party district. Multiple clubs, bars, and late-night venues. Something for everyone.', link: '/guides/nightlife-juffair' },
      { num: 17, name: 'Adliya Bar Hopping', desc: 'Trendy neighborhood with cocktail bars, live music venues, and art galleries.', link: '/guides/nightlife-adliya' },
      { num: 18, name: 'Rooftop Lounges', desc: 'Stunning city views with premium drinks. CUT, Hazel Rooftop, and more.', link: '/lounges-bars' },
      { num: 19, name: 'Live Music Venues', desc: 'Jazz clubs, rock bars, and Filipino bands. Live entertainment every night of the week.', link: '/events?category=music' },
      { num: 20, name: 'Ladies Night', desc: 'Free drinks and entry for ladies at top venues. Every night has a ladies night somewhere!', link: '/guides/ladies-nights' },
      { num: 21, name: 'Beach Club Party', desc: 'Daytime parties with pools, DJs, and cocktails. Coral Bay and Jumeirah lead the scene.', link: '/guides/beach-clubs' },
    ]
  },
  {
    category: 'Food & Dining',
    icon: Utensils,
    color: 'from-red-500 to-rose-600',
    items: [
      { num: 22, name: 'Friday Brunch', desc: 'The ultimate Gulf tradition. Unlimited food and drinks at 5-star hotels. Book ahead!', link: '/guides/brunch' },
      { num: 23, name: 'Traditional Bahraini Cuisine', desc: 'Try machboos, muhammar, and harees at local restaurants like Haji\'s Cafe.', link: '/restaurants' },
      { num: 24, name: 'Seafood by the Sea', desc: 'Fresh fish at Budaiya restaurants. Choose your catch and have it grilled to perfection.', link: '/guides/seafood' },
      { num: 25, name: 'Street Food Tour', desc: 'Shawarma, falafel, and samosas in Manama. Authentic flavors at local prices.', link: '/guides/street-food' },
      { num: 26, name: 'High-End Dining', desc: 'Michelin-quality restaurants at Four Seasons, Ritz-Carlton, and Gulf Hotel.', link: '/restaurants' },
      { num: 27, name: 'Shisha Experience', desc: 'Relax with flavored tobacco at traditional cafes. A quintessential Gulf experience.', link: '/guides/shisha' },
      { num: 28, name: 'Specialty Coffee', desc: 'Third-wave coffee scene is booming. Visit 198 Cafe, Crust & Crema, and more.', link: '/guides/cafes' },
    ]
  },
  {
    category: 'Family Activities',
    icon: Users,
    color: 'from-green-500 to-emerald-600',
    items: [
      { num: 29, name: 'Lost Paradise of Dilmun', desc: 'Massive water park with slides, wave pools, and lazy rivers. Full day of fun for all ages.', link: '/guides/water-parks' },
      { num: 30, name: 'Bahrain International Circuit', desc: 'Watch F1 or drive the track yourself. Karting, drag racing, and passenger experiences available.', link: '/guides/f1' },
      { num: 31, name: 'Wahooo! Waterpark', desc: 'Indoor water park at City Centre. Perfect for hot summer days.', link: '/family-kids' },
      { num: 32, name: 'Kids Kingdom', desc: 'Indoor play areas at every major mall. Air-conditioned fun for little ones.', link: '/guides/things-to-do-with-kids' },
      { num: 33, name: 'Al Areen Wildlife Park', desc: 'See Arabian oryx, gazelles, and other desert wildlife in their natural habitat.', link: '/attractions' },
      { num: 34, name: 'Gravity Indoor Skydiving', desc: 'Experience freefall without jumping from a plane. Safe and thrilling for ages 4+.', link: '/attractions' },
    ]
  },
  {
    category: 'Shopping',
    icon: ShoppingBag,
    color: 'from-pink-500 to-fuchsia-600',
    items: [
      { num: 35, name: 'City Centre Bahrain', desc: 'The biggest mall with 350+ stores. Cinema, water park, and endless shopping.', link: '/guides/malls/city-centre-bahrain' },
      { num: 36, name: 'Marassi Galleria', desc: 'Luxury waterfront mall with high-end brands and stunning sea views.', link: '/guides/malls/marassi-galleria' },
      { num: 37, name: 'Seef Mall', desc: 'Popular shopping destination with great mix of local and international brands.', link: '/guides/malls/seef-mall' },
      { num: 38, name: 'The Avenues', desc: 'Modern mall with premium brands, great restaurants, and entertainment.', link: '/guides/malls/the-avenues' },
      { num: 39, name: 'Gold City', desc: 'Dedicated gold souq with hundreds of shops. Best prices in the Gulf.', link: '/guides/souks' },
      { num: 40, name: 'Dragon City', desc: 'Massive Chinese market with everything from electronics to home goods. Bargain heaven.', link: '/guides/malls/dragon-city' },
    ]
  },
  {
    category: 'Unique Experiences',
    icon: Sparkles,
    color: 'from-violet-500 to-indigo-600',
    items: [
      { num: 41, name: 'Tree of Life', desc: 'Mysterious 400-year-old tree in the desert with no water source. How does it survive?', link: '/attractions' },
      { num: 42, name: 'Oil Museum', desc: 'Learn about Bahrain\'s first oil well in the Arab world. Free outdoor museum.', link: '/guides/museums' },
      { num: 43, name: 'Sunset at Bahrain Bay', desc: 'Watch the sun set behind the skyline. Best views from the corniche or a dhow cruise.', link: '/places' },
      { num: 44, name: 'Desert Safari', desc: 'Dune bashing, camel riding, and BBQ dinner under the stars. Book through local tour operators.', link: '/attractions' },
      { num: 45, name: 'Pearl Diving', desc: 'Traditional pearl diving experience. Dive like Bahrainis did for centuries.', link: '/attractions' },
      { num: 46, name: 'Jarada Island', desc: 'Sandbar island that appears at low tide. Unique photo opportunity!', link: '/attractions' },
      { num: 47, name: 'King Fahd Causeway', desc: 'Drive the 25km bridge to Saudi Arabia. Stop at the island for great views.', link: '/attractions' },
    ]
  },
  {
    category: 'Sports & Adventure',
    icon: Trophy,
    color: 'from-yellow-500 to-amber-600',
    items: [
      { num: 48, name: 'Golf at Royal Golf Club', desc: '18-hole championship course. Beautiful green oasis in the desert.', link: '/guides/golf' },
      { num: 49, name: 'Horse Racing at REHC', desc: 'Free entry to races every Friday during season. Exciting atmosphere and great facilities.', link: '/events?category=sports' },
      { num: 50, name: 'Paddleboarding', desc: 'Stand-up paddleboarding at Amwaj or Zallaq. Peaceful way to explore the coast.', link: '/guides/outdoor-activities' },
    ]
  }
];

export default async function ThingsToDoPage() {
  const [events, venues] = await Promise.all([
    getUpcomingEvents(),
    getFeaturedVenues()
  ]);

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
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li>/</li>
                <li className="text-white">Things to Do in Bahrain</li>
              </ol>
            </nav>

            <div className="text-center">
              <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full text-purple-300 text-sm mb-4">
                ✨ Updated for 2026
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                50 Best Things to Do in Bahrain
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Your ultimate guide to experiencing the Kingdom of Bahrain. From ancient forts and pristine beaches 
                to world-class dining and legendary nightlife — here's everything you need to know.
              </p>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-8 mt-10">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">50+</div>
                  <div className="text-sm text-gray-400">Activities</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-400">8</div>
                  <div className="text-sm text-gray-400">Categories</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400">2026</div>
                  <div className="text-sm text-gray-400">Updated</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="py-12 px-4 border-y border-gray-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Jump to Category</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {activities.map((cat) => (
                <a
                  key={cat.category}
                  href={`#${cat.category.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`px-4 py-2 rounded-full bg-gradient-to-r ${cat.color} text-white text-sm font-medium hover:opacity-90 transition flex items-center gap-2`}
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.category}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
            <h2 className="text-3xl font-bold text-white mb-6">Why Visit Bahrain?</h2>
            <p className="text-gray-300 leading-relaxed">
              Bahrain, the "Pearl of the Gulf," is an island nation that perfectly blends ancient history with modern luxury. 
              As the smallest country in the Middle East, it packs an incredible amount of experiences into its compact size.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Unlike its neighbors, Bahrain offers a more relaxed atmosphere — you can enjoy a cocktail at sunset, explore 
              4,000-year-old ruins, swim with dolphins, and dance the night away at world-class clubs. Whether you're a 
              history buff, beach lover, foodie, or party enthusiast, Bahrain has something special waiting for you.
            </p>
            <p className="text-gray-300 leading-relaxed">
              This guide covers the <strong>50 best things to do in Bahrain</strong>, organized by category to help you 
              plan the perfect trip. From must-see attractions to hidden gems, we've got you covered.
            </p>
          </div>
        </section>

        {/* Activities by Category */}
        {activities.map((category) => (
          <section 
            key={category.category} 
            id={category.category.toLowerCase().replace(/\s+/g, '-')}
            className="py-16 px-4"
          >
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color}`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">{category.category}</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {category.items.map((item) => (
                  <Link 
                    key={item.num} 
                    href={item.link}
                    className="group p-6 bg-gray-800/50 hover:bg-gray-800 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <span className={`flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-white font-bold text-sm`}>
                        {item.num}
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition mb-2">
                          {item.name}
                        </h3>
                        <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Upcoming Events Section */}
        {events.length > 0 && (
          <section className="py-16 px-4 bg-gray-800/30">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <Calendar className="w-8 h-8 text-purple-400" />
                  Upcoming Events in Bahrain
                </h2>
                <Link 
                  href="/events" 
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

        {/* FAQ Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-10">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">What are the must-see attractions in Bahrain?</h3>
                <p className="text-gray-300">
                  The must-see attractions in Bahrain include Bahrain Fort (UNESCO World Heritage), the National Museum, 
                  Al Fateh Grand Mosque, Tree of Life, and Manama Souq. For beaches, visit Al Dar Islands or Amwaj.
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Is Bahrain good for tourists?</h3>
                <p className="text-gray-300">
                  Yes! Bahrain is excellent for tourists. It offers a unique blend of rich history, modern attractions, 
                  beautiful beaches, world-class dining, vibrant nightlife, and warm hospitality. Most nationalities can get visa on arrival.
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">What is Bahrain famous for?</h3>
                <p className="text-gray-300">
                  Bahrain is famous for its ancient Dilmun civilization, pearl diving heritage, Formula 1 Grand Prix, 
                  liberal atmosphere in the Gulf, excellent nightlife, and being a financial hub. It's also known for 
                  the Tree of Life and beautiful mosques.
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">How many days do you need in Bahrain?</h3>
                <p className="text-gray-300">
                  We recommend 3-5 days to experience the highlights. This gives you time for cultural sites, beach activities, 
                  dining experiences, and nightlife. Weekend visitors from Saudi Arabia often come for 2-3 days.
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">What is the best time to visit Bahrain?</h3>
                <p className="text-gray-300">
                  November to March is the best time to visit when temperatures are pleasant (18-25°C). Summer months 
                  (June-September) can be extremely hot (40°C+) but indoor attractions and water activities are still enjoyable.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Links Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-10">Explore More of Bahrain</h2>
            
            <div className="grid md:grid-cols-4 gap-4">
              <Link href="/bahrain-nightlife-guide" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition text-center group">
                <Moon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <h3 className="font-semibold text-white group-hover:text-purple-300">Nightlife Guide</h3>
                <p className="text-sm text-gray-400 mt-2">Bars, clubs & parties</p>
              </Link>
              
              <Link href="/best-restaurants-bahrain" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition text-center group">
                <Utensils className="w-8 h-8 text-pink-400 mx-auto mb-3" />
                <h3 className="font-semibold text-white group-hover:text-pink-300">Restaurant Guide</h3>
                <p className="text-sm text-gray-400 mt-2">Where to eat</p>
              </Link>
              
              <Link href="/weekend-in-bahrain" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition text-center group">
                <Calendar className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                <h3 className="font-semibold text-white group-hover:text-cyan-300">Weekend Guide</h3>
                <p className="text-sm text-gray-400 mt-2">48-hour itinerary</p>
              </Link>
              
              <Link href="/events" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition text-center group">
                <Ticket className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                <h3 className="font-semibold text-white group-hover:text-amber-300">Events Calendar</h3>
                <p className="text-sm text-gray-400 mt-2">What's happening</p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Start Planning Your Bahrain Adventure</h2>
            <p className="text-gray-300 text-lg mb-8">
              Discover events, book experiences, and make the most of your time in Bahrain.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/events"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold hover:opacity-90 transition"
              >
                Browse Events
              </Link>
              <Link 
                href="/places"
                className="px-8 py-4 bg-gray-800 rounded-full text-white font-semibold hover:bg-gray-700 transition"
              >
                Explore Places
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
