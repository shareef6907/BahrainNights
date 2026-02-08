import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Landmark, Star, MapPin, Clock, Waves, ShoppingBag, Camera,
  Utensils, Wine, Car, Palette, TreePalm, Building, Sparkles,
  Globe, Users, Sun, Moon, Heart
} from 'lucide-react';

// SEO Optimized Metadata
export const metadata: Metadata = {
  title: 'Things to Do in Bahrain 2026 — Complete Activities Guide | BahrainNights',
  description: 'Discover the best things to do in Bahrain 2026! Complete guide to attractions, beaches, restaurants, nightlife, shopping, and hidden gems. Perfect for tourists and residents.',
  keywords: [
    'things to do in Bahrain', 'Bahrain attractions', 'Bahrain tourism',
    'what to do in Bahrain', 'Bahrain activities', 'visit Bahrain 2026',
    'Bahrain tourist attractions', 'Bahrain sightseeing', 'Bahrain beaches',
    'Bahrain museums', 'Bahrain shopping', 'Bahrain weekend activities',
    'Manama attractions', 'Bahrain travel guide', 'Bahrain itinerary'
  ].join(', '),
  alternates: {
    canonical: 'https://www.bahrainnights.com/things-to-do-bahrain',
  },
  openGraph: {
    title: 'Things to Do in Bahrain 2026 — Complete Activities Guide',
    description: 'Your ultimate guide to Bahrain. Museums, beaches, restaurants, nightlife, and hidden gems.',
    url: 'https://www.bahrainnights.com/things-to-do-bahrain',
    siteName: 'BahrainNights',
    images: [
      {
        url: 'https://www.bahrainnights.com/og-things-to-do.jpg',
        width: 1200,
        height: 630,
        alt: 'Things to Do in Bahrain',
      },
    ],
    type: 'article',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Things to Do in Bahrain 2026',
    description: 'Complete activities guide - attractions, beaches, dining & nightlife!',
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
        '@id': 'https://www.bahrainnights.com/things-to-do-bahrain#article',
        headline: 'Things to Do in Bahrain 2026 — Complete Activities Guide',
        description: 'Complete guide to attractions, activities, and experiences in Bahrain for tourists and residents.',
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
        name: 'Top Things to Do in Bahrain',
        itemListOrder: 'https://schema.org/ItemListOrderDescending',
        numberOfItems: 25,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Bahrain National Museum', description: 'Premier museum showcasing Bahrain\'s 5000-year history' },
          { '@type': 'ListItem', position: 2, name: 'Bahrain Fort (Qal\'at al-Bahrain)', description: 'UNESCO World Heritage archaeological site' },
          { '@type': 'ListItem', position: 3, name: 'Al Fateh Grand Mosque', description: 'One of the largest mosques in the world' },
          { '@type': 'ListItem', position: 4, name: 'Manama Souq', description: 'Traditional market with gold, spices, and crafts' },
          { '@type': 'ListItem', position: 5, name: 'Tree of Life', description: 'Mysterious 400-year-old tree in the desert' },
        ]
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.bahrainnights.com' },
          { '@type': 'ListItem', position: 2, name: 'Things to Do Bahrain', item: 'https://www.bahrainnights.com/things-to-do-bahrain' }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What are the top attractions in Bahrain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Top attractions include Bahrain National Museum, Bahrain Fort (UNESCO World Heritage Site), Al Fateh Grand Mosque, Manama Souq, Tree of Life, and Bahrain International Circuit. The island also offers excellent beaches, shopping, and world-class dining.'
            }
          },
          {
            '@type': 'Question',
            name: 'Is Bahrain good for tourists?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, Bahrain is excellent for tourists. It offers a unique blend of ancient history and modern luxury, with 5000 years of civilization, UNESCO sites, beaches, world-class hotels, diverse dining, and the Gulf\'s best nightlife. English is widely spoken and the country is very safe.'
            }
          },
          {
            '@type': 'Question',
            name: 'How many days do you need in Bahrain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'For a comprehensive visit, 3-4 days is ideal. You can see the main attractions in 2 days, with extra time for beaches, dining, and nightlife. Weekend visitors from Saudi Arabia often come for 2-3 days. A week allows for a more relaxed pace with day trips.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is Bahrain famous for?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Bahrain is famous for its ancient Dilmun civilization, pearl diving heritage, Formula 1 Grand Prix, liberal social atmosphere, excellent dining and nightlife, and being a gateway to Saudi Arabia via the King Fahd Causeway.'
            }
          },
          {
            '@type': 'Question',
            name: 'Is Bahrain safe for tourists?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, Bahrain is very safe for tourists. It has low crime rates, a stable government, and is welcoming to visitors. Normal precautions apply as in any country. The country is particularly safe for solo travelers and women travelers.'
            }
          }
        ]
      }
    ]
  };
}

const activityCategories = [
  {
    category: 'Culture & Heritage',
    description: 'Explore 5000 years of Bahraini civilization',
    icon: Landmark,
    color: 'from-amber-500 to-orange-600',
    activities: [
      {
        name: 'Bahrain National Museum',
        type: 'Museum',
        location: 'Manama Corniche',
        duration: '2-3 hours',
        price: '1 BHD',
        rating: 4.6,
        description: 'Bahrain\'s premier museum showcasing the island\'s 5000-year history from the ancient Dilmun civilization to the present. Excellent exhibits on burial mounds, pearl diving, traditional crafts, and modern art. The architecture itself is stunning.',
        highlights: ['Dilmun artifacts', 'Pearl diving heritage', 'Traditional costumes', 'Modern art gallery'],
        tip: 'Visit in the morning when it\'s less crowded. The gift shop has unique Bahraini souvenirs.',
        link: '/attractions'
      },
      {
        name: 'Bahrain Fort (Qal\'at al-Bahrain)',
        type: 'UNESCO World Heritage Site',
        location: 'Karbabad',
        duration: '1-2 hours',
        price: 'Free',
        rating: 4.5,
        description: 'A UNESCO World Heritage Site and the most important archaeological site in Bahrain. This ancient fort has been occupied for over 4000 years and sits atop an artificial mound containing artifacts from Dilmun, Greek, and Islamic periods. Stunning sunset views over the sea.',
        highlights: ['4000 years of history', 'Sea views', 'Excavation site', 'Small museum'],
        tip: 'Visit at sunset for incredible photos and cooler temperatures.',
        link: '/attractions'
      },
      {
        name: 'Al Fateh Grand Mosque',
        type: 'Religious Site',
        location: 'Juffair',
        duration: '1 hour',
        price: 'Free',
        rating: 4.7,
        description: 'One of the largest mosques in the world, capable of holding 7000 worshippers. The stunning architecture features the world\'s largest fiberglass dome and beautiful Islamic calligraphy. Free guided tours available for non-Muslim visitors.',
        highlights: ['Stunning architecture', 'Free tours', 'Islamic library', 'Air-conditioned'],
        tip: 'Dress modestly (long sleeves, covered legs). Women should bring a headscarf or use ones provided.',
        link: '/attractions'
      },
      {
        name: 'Manama Souq',
        type: 'Traditional Market',
        location: 'Bab Al Bahrain',
        duration: '2-3 hours',
        price: 'Free entry',
        rating: 4.4,
        description: 'The heart of old Manama, this bustling souq offers everything from gold and spices to textiles and traditional crafts. Start at the iconic Bab Al Bahrain gateway and wander through the atmospheric alleyways. Great for authentic souvenirs.',
        highlights: ['Gold souq', 'Spice market', 'Textiles', 'Street food'],
        tip: 'Best visited in the evening when it\'s cooler and busier. Bargaining is expected!',
        link: '/attractions'
      },
      {
        name: 'Muharraq Heritage Trail',
        type: 'Walking Tour',
        location: 'Muharraq',
        duration: '2-3 hours',
        price: 'Free',
        rating: 4.5,
        description: 'Explore Bahrain\'s pearl diving heritage on this UNESCO-listed trail through historic Muharraq. Visit traditional houses, the Siyadi family homes, and pearling merchants\' buildings. A fascinating glimpse into pre-oil Bahrain.',
        highlights: ['Pearl heritage', 'Traditional architecture', 'Craft workshops', 'Local cafés'],
        tip: 'Join a guided walking tour or download the self-guided trail map from the tourism website.',
        link: '/attractions'
      },
    ]
  },
  {
    category: 'Beaches & Outdoors',
    description: 'Sun, sea, and natural wonders',
    icon: Waves,
    color: 'from-cyan-500 to-blue-600',
    activities: [
      {
        name: 'Coral Bay Beach Club',
        type: 'Beach Club',
        location: 'Amwaj Islands',
        duration: 'Half day',
        price: '15-25 BHD',
        rating: 4.4,
        description: 'Popular beach club with private beach, water sports, pools, and restaurants. Perfect for a relaxed day of swimming and sunbathing. Good facilities including cabanas, showers, and a beach bar.',
        highlights: ['Private beach', 'Water sports', 'Pools', 'Restaurant & bar'],
        tip: 'Book ahead for weekends. Try their Friday brunch with beach access.',
        link: '/beach-pool-clubs'
      },
      {
        name: 'Al Dar Islands',
        type: 'Island Trip',
        location: 'Off Sitra',
        duration: 'Full day',
        price: '15-30 BHD',
        rating: 4.3,
        description: 'Escape to pristine islands just 15 minutes offshore. Crystal-clear water, white sand beaches, and excellent swimming. Boat trips include beach facilities. Great for families and groups.',
        highlights: ['Island hopping', 'Clear water', 'Beach BBQ', 'Snorkeling'],
        tip: 'Go on weekdays for a more peaceful experience. Bring reef-safe sunscreen.',
        link: '/attractions'
      },
      {
        name: 'Tree of Life',
        type: 'Natural Wonder',
        location: 'Southern Desert',
        duration: '1-2 hours',
        price: 'Free',
        rating: 4.2,
        description: 'A mysterious 400-year-old tree standing alone in the desert with no apparent water source. A popular sunset spot with panoramic desert views. Combine with a desert drive for a unique Bahrain experience.',
        highlights: ['Desert views', 'Sunset spot', 'Unique photo op', 'Off-road accessible'],
        tip: 'Visit at sunset. Consider hiring a driver or 4x4 as roads can be rough.',
        link: '/attractions'
      },
      {
        name: 'Hawar Islands',
        type: 'Island Destination',
        location: '30km south of Bahrain',
        duration: 'Full day or overnight',
        price: '50+ BHD',
        rating: 4.5,
        description: 'Remote island archipelago known for wildlife, particularly migrating birds and the rare Dugong (sea cow). The resort offers kayaking, nature walks, and pristine beaches far from the city.',
        highlights: ['Wildlife', 'Bird watching', 'Remote beaches', 'Resort'],
        tip: 'Best November-March for birdwatching. Book the resort in advance.',
        link: '/attractions'
      },
    ]
  },
  {
    category: 'Dining & Nightlife',
    description: 'The Gulf\'s best food and party scene',
    icon: Utensils,
    color: 'from-red-500 to-pink-600',
    activities: [
      {
        name: 'Friday Brunch',
        type: 'Dining Experience',
        location: 'Various Hotels',
        duration: '3-4 hours',
        price: '25-60 BHD',
        rating: 4.6,
        description: 'Friday brunch is a Gulf institution and Bahrain does it exceptionally well. Gulf Hotel\'s Al Waha is legendary, but Four Seasons, Ritz-Carlton, and InterContinental all offer spectacular spreads with unlimited food and drinks.',
        highlights: ['Unlimited food', 'Beverage packages', 'Live stations', 'Entertainment'],
        tip: 'Book ahead! The best brunches sell out 1-2 weeks in advance.',
        link: '/best-brunches-bahrain'
      },
      {
        name: 'Adliya Block 338',
        type: 'Entertainment District',
        location: 'Adliya',
        duration: 'Evening',
        price: 'Varies',
        rating: 4.5,
        description: 'The heart of Bahrain\'s nightlife scene. Block 338 and surrounding streets are packed with restaurants, bars, cafés, and galleries. Start with dinner and bar-hop through the night.',
        highlights: ['Multiple venues', 'Restaurant variety', 'Live music', 'Late night'],
        tip: 'Come on Thursday or Friday night when it\'s most vibrant. Dress smart casual.',
        link: '/nightlife-bahrain'
      },
      {
        name: 'Traditional Bahraini Cuisine',
        type: 'Food Experience',
        location: 'Various',
        duration: '1-2 hours',
        price: '5-20 BHD',
        rating: 4.4,
        description: 'Don\'t miss authentic Bahraini food. Try machboos (spiced rice with meat), muhammar (sweet rice), and harees. Haji\'s Café in Muharraq for breakfast is a must. Seafood restaurants along Budaiya Road serve excellent local-style fish.',
        highlights: ['Machboos', 'Seafood', 'Bahraini breakfast', 'Local experience'],
        tip: 'Head to Muharraq or Budaiya for the most authentic experiences.',
        link: '/best-restaurants-bahrain'
      },
      {
        name: 'Ladies Night',
        type: 'Nightlife',
        location: 'Various Venues',
        duration: 'Evening',
        price: 'Free for ladies',
        rating: 4.3,
        description: 'Bahrain\'s ladies nights are famous across the Gulf. Tuesday-Thursday, ladies get free drinks at many venues. Great way to explore different bars and lounges without breaking the bank.',
        highlights: ['Free drinks', 'Multiple venues', 'Great atmosphere', 'Midweek fun'],
        tip: 'Check current offers - they change regularly. Tuesday and Wednesday are most popular.',
        link: '/ladies-night-bahrain'
      },
    ]
  },
  {
    category: 'Shopping',
    description: 'From traditional souqs to modern malls',
    icon: ShoppingBag,
    color: 'from-purple-500 to-violet-600',
    activities: [
      {
        name: 'Gold Souq',
        type: 'Traditional Market',
        location: 'Manama Souq',
        duration: '1-2 hours',
        price: 'Free entry',
        rating: 4.4,
        description: 'Bahrain has been a gold trading hub for centuries. The gold souq offers 18K and 21K gold jewelry at competitive prices. Bargaining is expected. Get pieces by weight for best value.',
        highlights: ['Competitive prices', 'Traditional designs', 'Modern pieces', 'Bargaining welcome'],
        tip: 'Check daily gold prices before shopping. Negotiate based on weight plus labor.',
        link: '/attractions'
      },
      {
        name: 'City Centre Bahrain',
        type: 'Shopping Mall',
        location: 'Seef',
        duration: '2-4 hours',
        price: 'Free entry',
        rating: 4.3,
        description: 'Bahrain\'s largest mall with over 340 stores, a cinema, Wahooo waterpark, and numerous restaurants. International brands, entertainment, and family-friendly attractions all under one roof.',
        highlights: ['Major brands', 'Wahooo waterpark', 'Cinema', 'Family entertainment'],
        tip: 'Visit on weekdays for fewer crowds. The food court has great variety.',
        link: '/attractions'
      },
      {
        name: 'The Avenues Bahrain',
        type: 'Premium Mall',
        location: 'Bahrain Bay',
        duration: '2-3 hours',
        price: 'Free entry',
        rating: 4.5,
        description: 'Newest and most upscale shopping destination with luxury brands, waterfront dining, and beautiful architecture. Excellent restaurants with bay views and regular entertainment events.',
        highlights: ['Luxury brands', 'Waterfront dining', 'Bay views', 'Modern design'],
        tip: 'Come for sunset drinks and dinner with stunning bay views.',
        link: '/attractions'
      },
      {
        name: 'Pearl Shops',
        type: 'Specialty Shopping',
        location: 'Manama Souq & Hotels',
        duration: '1 hour',
        price: 'Free entry',
        rating: 4.3,
        description: 'Bahrain was historically the center of the pearl trade. Natural Bahraini pearls are rare and valuable. Buy certified natural pearls or high-quality cultured pearls as unique souvenirs.',
        highlights: ['Natural pearls', 'Unique souvenirs', 'Historic significance', 'Quality certified'],
        tip: 'Ask for certificates of authenticity. Natural pearls are expensive but stunning.',
        link: '/attractions'
      },
    ]
  },
  {
    category: 'Thrills & Entertainment',
    description: 'Racing, water sports, and family fun',
    icon: Car,
    color: 'from-green-500 to-emerald-600',
    activities: [
      {
        name: 'Bahrain International Circuit',
        type: 'Motorsport',
        location: 'Sakhir',
        duration: '3-4 hours',
        price: '20-50 BHD',
        rating: 4.7,
        description: 'Home of the Formula 1 Bahrain Grand Prix. Experience track days, karting, passenger rides in race cars, or attend the spectacular night race in March. Even non-F1 fans will enjoy the facilities and driving experiences.',
        highlights: ['F1 circuit tours', 'Karting', 'Driving experiences', 'Passenger rides'],
        tip: 'Book F1 Grand Prix tickets months in advance. Regular track experiences available year-round.',
        link: '/attractions'
      },
      {
        name: 'Wahooo! Waterpark',
        type: 'Waterpark',
        location: 'City Centre Bahrain',
        duration: '4-6 hours',
        price: '15-25 BHD',
        rating: 4.4,
        description: 'Indoor waterpark perfect for escaping the heat. Slides for all ages, wave pool, lazy river, and family areas. Great for kids but fun for adults too. Located inside City Centre mall for easy access.',
        highlights: ['Indoor cooling', 'All ages', 'Multiple slides', 'Wave pool'],
        tip: 'Go on weekday mornings for shorter queues. Book online for discounts.',
        link: '/attractions'
      },
      {
        name: 'Lost Paradise of Dilmun',
        type: 'Waterpark',
        location: 'Sakhir',
        duration: '5-7 hours',
        price: '20-30 BHD',
        rating: 4.5,
        description: 'The largest waterpark in Bahrain with a Dilmun civilization theme. Thrilling slides, lazy rivers, wave pools, and family areas. Open air (outdoor) so best visited October-April.',
        highlights: ['Largest waterpark', 'Themed experience', 'Thrilling slides', 'Family friendly'],
        tip: 'Visit in cooler months (Oct-Apr). Weekdays are much less crowded.',
        link: '/attractions'
      },
      {
        name: 'Diving & Water Sports',
        type: 'Adventure',
        location: 'Various',
        duration: 'Half to full day',
        price: '25-100 BHD',
        rating: 4.3,
        description: 'Explore shipwrecks, coral gardens, and marine life around Bahrain. Several dive centers offer courses and trips. Jet skiing, kayaking, and paddleboarding also available at beach clubs and hotels.',
        highlights: ['Shipwreck diving', 'Coral reefs', 'Jet skiing', 'Paddleboarding'],
        tip: 'Book with certified dive centers. Best visibility November-April.',
        link: '/attractions'
      },
    ]
  }
];

const quickFacts = [
  { icon: Sun, title: 'Best Time', value: 'Oct-Apr', desc: 'Cooler months' },
  { icon: Clock, title: 'Ideal Duration', value: '3-4 days', desc: 'To see highlights' },
  { icon: Globe, title: 'Language', value: 'English', desc: 'Widely spoken' },
  { icon: Users, title: 'Safety', value: 'Very Safe', desc: 'Low crime' },
];

export default function ThingsToDoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSchema()) }}
      />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-teal-900/30" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <nav className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li>/</li>
                <li className="text-white">Things to Do in Bahrain</li>
              </ol>
            </nav>

            <div className="text-center">
              <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-full text-blue-300 text-sm mb-4">
                🌴 Complete Guide 2026
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-teal-200 bg-clip-text text-transparent">
                Things to Do in Bahrain
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                From ancient Dilmun ruins to world-class dining, discover everything the Kingdom of Bahrain 
                has to offer. Culture, beaches, nightlife, and adventure await.
              </p>
              
              <div className="flex flex-wrap justify-center gap-8 mt-10">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">5000+</div>
                  <div className="text-sm text-gray-400">Years of History</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-400">3</div>
                  <div className="text-sm text-gray-400">UNESCO Sites</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400">33</div>
                  <div className="text-sm text-gray-400">Islands</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Facts */}
        <section className="py-8 px-4 bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickFacts.map((fact) => (
                <div key={fact.title} className="p-4 bg-gray-800/50 rounded-xl text-center">
                  <fact.icon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-lg font-bold text-white">{fact.value}</div>
                  <div className="text-sm text-gray-400">{fact.title}</div>
                  <div className="text-xs text-gray-500">{fact.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
            <h2 className="text-3xl font-bold text-white mb-6">Welcome to Bahrain</h2>
            <p className="text-gray-300 leading-relaxed">
              The Kingdom of Bahrain may be the smallest country in the Middle East, but it packs an 
              incredible amount of history, culture, and entertainment into its 33 islands. As one of 
              the earliest centers of civilization in the Gulf, Bahrain offers a unique blend of 
              <strong> ancient heritage</strong> and <strong>modern luxury</strong>.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Unlike its more conservative neighbors, Bahrain has a relatively liberal social atmosphere. 
              This means excellent <strong>nightlife</strong>, diverse <strong>dining options</strong> 
              (including alcohol at licensed venues), and a cosmopolitan vibe that welcomes visitors from 
              around the world. It's also one of the safest countries in the region.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Whether you're here for a weekend from Saudi Arabia or spending a week exploring, Bahrain 
              offers <strong>world-class hotels</strong>, <strong>beautiful beaches</strong>, 
              <strong>fascinating museums</strong>, and the <strong>Gulf's best Friday brunch</strong>. 
              This guide covers everything you need to plan an unforgettable visit.
            </p>
          </div>
        </section>

        {/* Category Navigation */}
        <section className="py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3">
              {activityCategories.map((cat) => (
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

        {/* Activity Categories */}
        {activityCategories.map((category) => (
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
                <div>
                  <h2 className="text-3xl font-bold text-white">{category.category}</h2>
                  <p className="text-gray-400">{category.description}</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {category.activities.map((activity) => (
                  <div 
                    key={activity.name} 
                    className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {activity.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400 mt-1">
                          <span className="text-blue-400">{activity.type}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {activity.location}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400">
                        <Star className="w-4 h-4 fill-amber-400" />
                        <span className="font-semibold">{activity.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{activity.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {activity.highlights.map((highlight) => (
                        <span key={highlight} className="px-2 py-1 bg-gray-700/50 rounded-full text-xs text-blue-300">
                          {highlight}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-700 text-sm">
                      <span className="flex items-center gap-1 text-gray-400">
                        <Clock className="w-4 h-4" /> {activity.duration}
                      </span>
                      <span className="text-green-400 font-semibold">{activity.price}</span>
                    </div>
                    
                    <div className="mt-3 text-sm">
                      <span className="text-gray-500">💡</span>
                      <span className="text-gray-400 ml-1">{activity.tip}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Sample Itinerary */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-10">Sample 3-Day Itinerary</h2>
            
            <div className="space-y-6">
              <div className="p-6 bg-gray-800/50 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold">1</div>
                  <h3 className="text-xl font-semibold text-white">Day 1: Culture & History</h3>
                </div>
                <p className="text-gray-300">
                  Morning: Bahrain National Museum (2 hours) → Manama Souq for gold and spices (2 hours) → 
                  Lunch at a traditional restaurant → Afternoon: Bahrain Fort at sunset → Evening: 
                  Dinner and drinks in Adliya
                </p>
              </div>
              
              <div className="p-6 bg-gray-800/50 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center font-bold">2</div>
                  <h3 className="text-xl font-semibold text-white">Day 2: Beach & Brunch</h3>
                </div>
                <p className="text-gray-300">
                  Late morning: Epic Friday brunch at Gulf Hotel or Four Seasons → Afternoon: Recover 
                  by the pool or beach at a beach club → Evening: Explore Muharraq heritage trail and 
                  dinner in the old town
                </p>
              </div>
              
              <div className="p-6 bg-gray-800/50 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center font-bold">3</div>
                  <h3 className="text-xl font-semibold text-white">Day 3: Adventure & Nightlife</h3>
                </div>
                <p className="text-gray-300">
                  Morning: Visit Al Fateh Mosque → Afternoon: Bahrain International Circuit experience 
                  or waterpark → Drive to Tree of Life for sunset → Evening: Fine dining followed by 
                  hotel bar hopping (Ritz-Carlton jazz, Four Seasons rooftop)
                </p>
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
                <h3 className="text-xl font-semibold text-white mb-3">What are the top attractions in Bahrain?</h3>
                <p className="text-gray-300">
                  Top attractions include Bahrain National Museum, Bahrain Fort (UNESCO World Heritage Site), 
                  Al Fateh Grand Mosque, Manama Souq, Tree of Life, and Bahrain International Circuit. Don't 
                  miss the dining scene and nightlife, which are among the best in the Gulf.
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Is Bahrain good for tourists?</h3>
                <p className="text-gray-300">
                  Absolutely! Bahrain offers a unique blend of ancient history and modern luxury. It's safe, 
                  welcoming, and more liberal than neighboring countries. English is widely spoken, hotels 
                  are world-class, and there's excellent dining, nightlife, and cultural attractions.
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">How many days do you need in Bahrain?</h3>
                <p className="text-gray-300">
                  3-4 days is ideal for a comprehensive visit covering main attractions, dining, and some 
                  beach time. Weekend visitors from Saudi Arabia often come for 2-3 days. A week allows for 
                  a more relaxed pace with day trips to islands and extensive restaurant exploration.
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">What is Bahrain famous for?</h3>
                <p className="text-gray-300">
                  Bahrain is famous for its ancient Dilmun civilization, pearl diving heritage, Formula 1 
                  Grand Prix, liberal social atmosphere, excellent dining and nightlife, and the King Fahd 
                  Causeway connecting to Saudi Arabia.
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Is Bahrain safe for tourists?</h3>
                <p className="text-gray-300">
                  Yes, Bahrain is very safe. It has low crime rates, a stable government, and is welcoming 
                  to visitors. It's particularly safe for solo travelers and women travelers. Normal 
                  precautions apply as in any country.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-900/30 to-teal-900/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Start Planning Your Visit</h2>
            <p className="text-gray-300 text-lg mb-8">
              Explore events, restaurants, nightlife, and more on BahrainNights.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/events"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full text-white font-semibold hover:opacity-90 transition"
              >
                What's On This Week
              </Link>
              <Link 
                href="/best-restaurants-bahrain"
                className="px-8 py-4 bg-gray-800 rounded-full text-white font-semibold hover:bg-gray-700 transition"
              >
                Restaurant Guide
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
