import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Star, Clock, ArrowRight, Sparkles,
  Sun, Waves, Building2, Palmtree, Camera, Mountain,
  Heart, Users, Car, ShoppingBag, Ticket, ChevronRight,
  History, Gem, Fish, Music
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Things to Do in Bahrain 2026 — 75+ Activities & Attractions | BahrainNights',
  description: 'Discover the best things to do in Bahrain in 2026. From historic sites and beaches to adventure activities and cultural experiences. Your complete Bahrain activity guide.',
  keywords: [
    'things to do Bahrain 2026', 'Bahrain attractions', 'Bahrain activities',
    'what to do Bahrain', 'Bahrain tourist attractions', 'Bahrain beach',
    'Bahrain shopping', 'Bahrain culture', 'Bahrain adventure', 'Bahrain tours',
    'free things to do Bahrain', 'family activities Bahrain', 'Bahrain day trips'
  ].join(', '),
  alternates: {
    canonical: 'https://www.bahrainnights.com/blog/things-to-do-bahrain-2026',
  },
  openGraph: {
    title: 'Things to Do in Bahrain 2026 — 75+ Activities & Attractions',
    description: 'Your complete guide to activities and attractions in Bahrain.',
    url: 'https://www.bahrainnights.com/blog/things-to-do-bahrain-2026',
    siteName: 'BahrainNights',
    images: [
      {
        url: 'https://www.bahrainnights.com/og-things-to-do-2026.jpg',
        width: 1200,
        height: 630,
        alt: 'Things to Do in Bahrain 2026',
      },
    ],
    type: 'article',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Things to Do in Bahrain 2026',
    description: '75+ activities and attractions in Bahrain!',
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
        headline: 'Things to Do in Bahrain 2026 — 75+ Activities & Attractions',
        description: 'Your complete guide to activities and attractions in Bahrain.',
        image: 'https://www.bahrainnights.com/og-things-to-do-2026.jpg',
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
        datePublished: '2026-01-01',
        dateModified: '2026-02-15',
        mainEntityOfPage: 'https://www.bahrainnights.com/blog/things-to-do-bahrain-2026'
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is the best time to visit Bahrain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The best time to visit Bahrain is from November to March when temperatures are pleasant (18-25°C). Avoid summer months (June-August) when temperatures can exceed 40°C. The F1 Grand Prix weekend in March is exciting but busy.'
            }
          },
          {
            '@type': 'Question',
            name: 'Is Bahrain safe for tourists?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Bahrain is very safe for tourists with low crime rates. It\'s one of the most liberal Gulf countries with a welcoming attitude toward visitors. Standard precautions apply, but violent crime against tourists is extremely rare.'
            }
          },
          {
            '@type': 'Question',
            name: 'How many days do you need in Bahrain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '3-5 days is ideal to explore Bahrain\'s main attractions. You can see the highlights in 3 days, but 5 days allows for a more relaxed pace with time for beaches, dining, and day trips to historic sites.'
            }
          },
          {
            '@type': 'Question',
            name: 'What are free things to do in Bahrain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Free activities include exploring the Bahrain National Museum (nominal fee), walking through Muharraq\'s historic souks, visiting the Tree of Life, watching sunset at Al Dar Islands, exploring mosques, and enjoying public beaches.'
            }
          }
        ]
      }
    ]
  };
}

const topAttractions = [
  {
    name: 'Bahrain Fort (Qal\'at al-Bahrain)',
    type: 'UNESCO World Heritage Site',
    desc: 'A 4,000-year-old archaeological site that served as the capital of the ancient Dilmun civilization. The museum showcases artifacts from Bahrain\'s rich history.',
    duration: '2-3 hours',
    cost: 'BHD 1',
    highlights: ['Ancient ruins', 'Museum', 'Sea views', 'Sunset spot'],
    icon: History
  },
  {
    name: 'Al-Fateh Grand Mosque',
    type: 'Religious & Cultural',
    desc: 'One of the largest mosques in the world, accommodating over 7,000 worshippers. The stunning architecture features Italian marble and Austrian glass.',
    duration: '1-2 hours',
    cost: 'Free',
    highlights: ['Guided tours', 'Islamic architecture', 'Library', 'Photography'],
    icon: Building2
  },
  {
    name: 'Tree of Life',
    type: 'Natural Wonder',
    desc: 'A 400-year-old mesquite tree standing alone in the desert with no apparent water source. One of Bahrain\'s most mysterious attractions.',
    duration: '1 hour',
    cost: 'Free',
    highlights: ['Desert views', 'Sunset photos', 'Mystery', 'Nature'],
    icon: Palmtree
  },
  {
    name: 'Bahrain National Museum',
    type: 'Museum',
    desc: 'The premier museum showcasing 6,000 years of Bahrain\'s history, from Dilmun civilization to modern day. Beautifully designed with interactive exhibits.',
    duration: '2-3 hours',
    cost: 'BHD 1',
    highlights: ['Dilmun artifacts', 'Pearl diving', 'Traditional crafts', 'Art gallery'],
    icon: Gem
  },
  {
    name: 'Bab Al Bahrain & Manama Souq',
    type: 'Shopping & Culture',
    desc: 'The gateway to Manama\'s traditional souq. Wander through narrow alleys selling gold, spices, textiles, and traditional crafts.',
    duration: '2-4 hours',
    cost: 'Free',
    highlights: ['Gold souq', 'Spice market', 'Local bargains', 'Authentic atmosphere'],
    icon: ShoppingBag
  },
  {
    name: 'Muharraq Heritage Trail',
    type: 'UNESCO & Cultural',
    desc: 'A walking path through Bahrain\'s traditional heart, featuring restored houses, museums, and the pearl diving heritage sites.',
    duration: '3-4 hours',
    cost: 'Free',
    highlights: ['Pearl trail', 'Traditional houses', 'Cafés', 'Photography'],
    icon: Camera
  },
];

const beachActivities = [
  { name: 'Al Dar Islands', desc: 'Take a dhow boat to these pristine islands for swimming, snorkeling, and beach barbecues. Day trips available.', cost: 'BHD 15-25' },
  { name: 'Amwaj Islands', desc: 'Upscale waterfront community with public beaches, water sports, and seaside dining. Popular sunset spot.', cost: 'Free/varies' },
  { name: 'Marassi Beach', desc: 'Private beach resort with full facilities, water sports, and cabanas. Day passes available.', cost: 'BHD 15-30' },
  { name: 'Hotel Beach Clubs', desc: 'Ritz-Carlton, Four Seasons, and other hotels offer day passes to their private beaches and pools.', cost: 'BHD 25-50' },
  { name: 'Jetski & Watersports', desc: 'Multiple operators offer jetski rental, parasailing, banana boats, and wakeboarding.', cost: 'BHD 15-40' },
  { name: 'Diving & Snorkeling', desc: 'Explore coral reefs and shipwrecks with certified dive operators. PADI courses available.', cost: 'BHD 25-80' },
];

const culturalExperiences = [
  { name: 'Pearl Diving Experience', desc: 'Authentic dhow boat trip with traditional pearl diving demonstration and the chance to find your own pearl.', duration: 'Half day' },
  { name: 'Bahraini Cooking Class', desc: 'Learn to prepare traditional dishes like machboos and harees with local chefs in heritage settings.', duration: '3-4 hours' },
  { name: 'Friday Fish Market', desc: 'Experience the bustling morning fish auction at Manama Fish Market. Arrive early for the best experience.', duration: '1-2 hours' },
  { name: 'Pottery Village (A\'ali)', desc: 'Watch traditional potters at work in this ancient craft village. You can try your hand at the wheel.', duration: '1-2 hours' },
  { name: 'Falcon Hospital', desc: 'Learn about the Gulf\'s falcon heritage at the Royal Falcon Hospital with guided tours.', duration: '1-2 hours' },
  { name: 'Traditional Dhow Cruise', desc: 'Sunset or dinner cruise on traditional wooden boats along the coast. Some include dinner and music.', duration: '2-3 hours' },
];

const adventureActivities = [
  { name: 'Bahrain International Circuit', desc: 'Drive experiences on the F1 track, from passenger laps to full driving experiences in supercars.', cost: 'BHD 50-500' },
  { name: 'Go-Karting', desc: 'Multiple karting tracks including the world-class circuit at BIC. Night racing available.', cost: 'BHD 15-30' },
  { name: 'Desert Safari', desc: 'Dune bashing, camel rides, and desert camping experiences in Bahrain\'s interior.', cost: 'BHD 30-60' },
  { name: 'Lost Paradise of Dilmun', desc: 'Middle East\'s largest water park with over 30 rides and attractions. Great for families.', cost: 'BHD 18-25' },
  { name: 'Indoor Skydiving', desc: 'Gravity Indoor Skydiving offers the thrill of freefall in a safe, controlled environment.', cost: 'BHD 25-40' },
  { name: 'Escape Rooms', desc: 'Multiple themed escape rooms across Manama and Juffair for puzzle enthusiasts.', cost: 'BHD 8-15' },
];

const shoppingDestinations = [
  { name: 'City Centre Bahrain', desc: 'The largest mall in Bahrain with 350+ stores, cinema, and entertainment zone.', type: 'Major Mall' },
  { name: 'The Avenues Bahrain', desc: 'Luxury shopping destination with high-end brands and gourmet dining.', type: 'Luxury Mall' },
  { name: 'Seef Mall', desc: 'Popular local mall with a good mix of international and regional brands.', type: 'Major Mall' },
  { name: 'Gold City', desc: 'Dedicated gold souq with dozens of shops offering competitive prices.', type: 'Specialty' },
  { name: 'Moda Mall', desc: 'Attached to the World Trade Center, featuring premium fashion brands.', type: 'Fashion' },
  { name: 'Bahrain Mall', desc: 'Family-friendly mall with entertainment, dining, and mid-range shopping.', type: 'Family' },
];

const familyActivities = [
  { name: 'Lost Paradise of Dilmun', desc: 'Water park with slides, wave pools, and lazy rivers for all ages.', age: 'All ages' },
  { name: 'Wahooo! Water Park', desc: 'Indoor water park at City Centre Bahrain. Perfect for hot days.', age: 'All ages' },
  { name: 'KidZania', desc: 'Educational entertainment center where kids can role-play adult professions.', age: '4-14 years' },
  { name: 'Magic Planet', desc: 'Indoor amusement park with rides and games at major malls.', age: 'All ages' },
  { name: 'Al Areen Wildlife Park', desc: 'Conservation park with Arabian wildlife and safari experiences.', age: 'All ages' },
  { name: 'Bahrain Science Centre', desc: 'Interactive science exhibits and planetarium shows.', age: '5+ years' },
];

const dayTrips = [
  { name: 'Hawar Islands', desc: 'Remote island nature reserve accessible by boat. Birdwatching, beaches, and eco-tourism.', distance: '1.5 hours by boat' },
  { name: 'Saudi Arabia (King Fahd Causeway)', desc: 'Easy day trip across the causeway to Al Khobar for shopping and dining.', distance: '1 hour drive' },
  { name: 'Oil Museum', desc: 'First oil well in the Gulf region with museum exhibits about the oil industry.', distance: '30 min drive' },
  { name: 'Burial Mounds of Dilmun', desc: 'UNESCO site with thousands of ancient burial mounds dating back to 2050 BCE.', distance: '20 min drive' },
  { name: 'Riffa Fort', desc: 'Restored 19th-century fort with panoramic views over Riffa\'s green valley.', distance: '25 min drive' },
];

const freeThings = [
  'Walk the Muharraq Heritage Trail and explore traditional architecture',
  'Watch sunset at the Bahrain Fort with bay views',
  'Explore the Manama Souq and practice your bargaining',
  'Visit the Tree of Life in the southern desert',
  'Stroll along the Al Fateh Corniche waterfront',
  'Attend Friday prayers at Al-Fateh Grand Mosque (tours available)',
  'Watch the fish auction at Manama Fish Market (early morning)',
  'Explore Amwaj Islands waterfront and marina',
  'Visit the Art Centre in the financial harbour',
  'Walk through Block 338 art galleries in Adliya',
];

const monthlyHighlights = [
  { month: 'January-February', events: 'Perfect weather, Spring of Culture festival begins', weather: '14-20°C' },
  { month: 'March', events: 'F1 Grand Prix weekend, Spring of Culture', weather: '18-26°C' },
  { month: 'April', events: 'Shoulder season, pleasant evenings', weather: '22-30°C' },
  { month: 'May-September', events: 'Hot season, indoor activities recommended', weather: '32-42°C' },
  { month: 'October', events: 'Weather improving, National Day preparations', weather: '26-34°C' },
  { month: 'November-December', events: 'National Day (Dec 16-17), food festivals, ideal weather', weather: '18-26°C' },
];

export default function ThingsToDo2026Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSchema()) }}
      />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/30 to-blue-900/30" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          
          <div className="max-w-4xl mx-auto relative z-10">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li>/</li>
                <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
                <li>/</li>
                <li className="text-white">Things to Do Bahrain 2026</li>
              </ol>
            </nav>

            <div className="text-center">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full text-cyan-300 text-sm mb-4">
                <Sparkles className="w-4 h-4" /> 75+ Activities
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent leading-tight">
                Things to Do in Bahrain 2026
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                From ancient forts and pearl diving heritage to F1 thrills and pristine beaches, 
                discover everything this island kingdom has to offer visitors in 2026.
              </p>
              
              <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> 18 min read
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
              Bahrain may be the smallest country in the Gulf, but it packs an extraordinary punch when it 
              comes to things to see and do. As the region's most progressive destination, the Kingdom 
              offers a unique blend of ancient history and modern entertainment that you won't find anywhere 
              else in the Middle East.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              From UNESCO World Heritage Sites that tell the story of the Dilmun civilization to adrenaline-pumping 
              experiences at the Formula 1 circuit, Bahrain caters to every type of traveler. History buffs can 
              spend days exploring forts and museums, beach lovers can island-hop to pristine shores, and 
              adventure seekers can dive shipwrecks or dune bash in the desert.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              This comprehensive guide covers 75+ activities and attractions to help you plan the perfect 
              Bahrain itinerary, whether you're visiting for a weekend or staying for weeks. Let's explore 
              everything this fascinating island has to offer.
            </p>
          </div>
        </section>

        {/* Top Attractions */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Must-See Attractions</h2>
                <p className="text-gray-400">The essential Bahrain bucket list</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topAttractions.map((attraction) => (
                <div key={attraction.name} className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-cyan-500/50 transition">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-cyan-500/20">
                      <attraction.icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <span className="text-cyan-400 text-xs">{attraction.type}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{attraction.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{attraction.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {attraction.highlights.map((h) => (
                      <span key={h} className="px-2 py-1 bg-gray-700/50 rounded text-xs text-gray-300">{h}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {attraction.duration}
                    </span>
                    <span>{attraction.cost}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Beach & Water Activities */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600">
                <Waves className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Beach & Water Activities</h2>
                <p className="text-gray-400">Make the most of Bahrain's island setting</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {beachActivities.map((activity) => (
                <div key={activity.name} className="p-5 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-blue-500/30 transition">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">{activity.name}</h3>
                    <span className="text-blue-400 text-sm">{activity.cost}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{activity.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Link 
                href="/guides/beach-clubs"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-white font-semibold hover:opacity-90 transition"
              >
                Beach & Pool Club Guide <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Cultural Experiences */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600">
                <History className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Cultural Experiences</h2>
                <p className="text-gray-400">Immerse yourself in Bahrain's heritage</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {culturalExperiences.map((exp) => (
                <div key={exp.name} className="p-5 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-amber-500/30 transition">
                  <h3 className="text-lg font-semibold text-white mb-2">{exp.name}</h3>
                  <p className="text-gray-400 text-sm mb-2">{exp.desc}</p>
                  <span className="text-amber-400 text-xs">{exp.duration}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Adventure Activities */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-600">
                <Mountain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Adventure & Thrills</h2>
                <p className="text-gray-400">Get your adrenaline pumping</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {adventureActivities.map((activity) => (
                <div key={activity.name} className="p-5 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-red-500/30 transition">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">{activity.name}</h3>
                    <span className="text-red-400 text-sm">{activity.cost}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{activity.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Family Activities */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Family Activities</h2>
                <p className="text-gray-400">Fun for all ages</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {familyActivities.map((activity) => (
                <div key={activity.name} className="p-5 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-green-500/30 transition">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">{activity.name}</h3>
                    <span className="text-green-400 text-xs">{activity.age}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{activity.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Link 
                href="/guides/family-activities"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full text-white font-semibold hover:opacity-90 transition"
              >
                Complete Family Guide <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Shopping */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Shopping Destinations</h2>
                <p className="text-gray-400">From luxury malls to traditional souks</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {shoppingDestinations.map((shop) => (
                <div key={shop.name} className="p-5 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-pink-500/30 transition">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">{shop.name}</h3>
                    <span className="text-pink-400 text-xs">{shop.type}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{shop.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Day Trips */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-violet-600">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Day Trips & Excursions</h2>
                <p className="text-gray-400">Worth the journey</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {dayTrips.map((trip) => (
                <div key={trip.name} className="p-5 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-purple-500/30 transition">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">{trip.name}</h3>
                    <span className="text-purple-400 text-xs">{trip.distance}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{trip.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Free Things */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">10 Free Things to Do</h2>
                <p className="text-gray-400">Budget-friendly Bahrain experiences</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {freeThings.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm">
                    {idx + 1}
                  </span>
                  <p className="text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Seasonal Guide */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-600">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">When to Visit</h2>
                <p className="text-gray-400">Seasonal highlights and weather guide</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {monthlyHighlights.map((month) => (
                <div key={month.month} className="p-5 bg-gray-800/50 rounded-xl border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-2">{month.month}</h3>
                  <p className="text-yellow-400 text-sm mb-2">{month.weather}</p>
                  <p className="text-gray-400 text-sm">{month.events}</p>
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
                <h3 className="text-lg font-semibold text-white mb-2">What is the best time to visit Bahrain?</h3>
                <p className="text-gray-400">The best time to visit Bahrain is from November to March when temperatures are pleasant (18-25°C). Avoid summer months (June-August) when temperatures can exceed 40°C. The F1 Grand Prix weekend in March is exciting but busy.</p>
              </div>
              
              <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-2">Is Bahrain safe for tourists?</h3>
                <p className="text-gray-400">Bahrain is very safe for tourists with low crime rates. It's one of the most liberal Gulf countries with a welcoming attitude toward visitors. Standard precautions apply, but violent crime against tourists is extremely rare.</p>
              </div>
              
              <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-2">How many days do you need in Bahrain?</h3>
                <p className="text-gray-400">3-5 days is ideal to explore Bahrain's main attractions. You can see the highlights in 3 days, but 5 days allows for a more relaxed pace with time for beaches, dining, and day trips to historic sites.</p>
              </div>
              
              <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-2">What are free things to do in Bahrain?</h3>
                <p className="text-gray-400">Free activities include exploring the Bahrain National Museum (nominal fee), walking through Muharraq's historic souks, visiting the Tree of Life, watching sunset at Al Dar Islands, exploring mosques, and enjoying public beaches.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-cyan-900/30 to-blue-900/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Plan Your Bahrain Adventure</h2>
            <p className="text-gray-300 text-lg mb-8">
              Explore our complete guides to make the most of your visit to the Kingdom.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/things-to-do"
                className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full text-white font-semibold hover:opacity-90 transition"
              >
                Browse Activities
              </Link>
              <Link 
                href="/blog/bahrain-tourist-guide-2026"
                className="px-8 py-4 bg-gray-800 rounded-full text-white font-semibold hover:bg-gray-700 transition"
              >
                Tourist Guide
              </Link>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8">Related Guides</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/guides/free-things-to-do" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition group">
                <Heart className="w-8 h-8 text-emerald-400 mb-3" />
                <h3 className="font-semibold text-white group-hover:text-emerald-300 transition">Free Activities</h3>
                <p className="text-sm text-gray-400 mt-2">Budget-friendly things to do</p>
              </Link>
              <Link href="/guides/outdoor-activities-bahrain" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition group">
                <Sun className="w-8 h-8 text-amber-400 mb-3" />
                <h3 className="font-semibold text-white group-hover:text-amber-300 transition">Outdoor Activities</h3>
                <p className="text-sm text-gray-400 mt-2">Adventure in the sun</p>
              </Link>
              <Link href="/attractions" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition group">
                <Camera className="w-8 h-8 text-cyan-400 mb-3" />
                <h3 className="font-semibold text-white group-hover:text-cyan-300 transition">All Attractions</h3>
                <p className="text-sm text-gray-400 mt-2">Complete directory</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
