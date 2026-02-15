import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Building2, MapPin, Star, Wifi, Waves, Utensils, Dumbbell,
  Sparkles, Crown, Gem, Wallet, Users, Car, Coffee, Wine
} from 'lucide-react';

// SEO Optimized Metadata
export const metadata: Metadata = {
  title: 'Best Hotels in Bahrain 2026 — Luxury to Budget | BahrainNights',
  description: 'Complete guide to the best hotels in Bahrain for 2026. From 5-star luxury resorts to budget-friendly stays. Reviews, prices, amenities & booking tips for Four Seasons, Ritz-Carlton, and more.',
  keywords: [
    'best hotels Bahrain', 'luxury hotels Bahrain', 'hotels in Bahrain',
    'Bahrain resorts', '5 star hotels Bahrain', 'budget hotels Bahrain',
    'Four Seasons Bahrain', 'Ritz Carlton Bahrain', 'hotels Manama',
    'beach hotels Bahrain', 'where to stay Bahrain', 'Bahrain accommodation',
    'hotels near Bahrain airport', 'hotel deals Bahrain', 'boutique hotels Bahrain'
  ].join(', '),
  alternates: {
    canonical: 'https://www.bahrainnights.com/best-hotels-bahrain',
  },
  openGraph: {
    title: 'Best Hotels in Bahrain 2026 — Luxury to Budget',
    description: 'Complete guide to where to stay in Bahrain. From world-class luxury resorts to affordable gems.',
    url: 'https://www.bahrainnights.com/best-hotels-bahrain',
    siteName: 'BahrainNights',
    images: [
      {
        url: 'https://www.bahrainnights.com/og-hotels.jpg',
        width: 1200,
        height: 630,
        alt: 'Best Hotels in Bahrain',
      },
    ],
    type: 'article',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Hotels in Bahrain 2026 — Luxury to Budget',
    description: 'Complete hotel guide - 5-star luxury, mid-range comfort & budget-friendly options!',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// JSON-LD Schema
function generateSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': 'https://www.bahrainnights.com/best-hotels-bahrain#article',
        headline: 'Best Hotels in Bahrain — Luxury to Budget Guide 2026',
        description: 'Complete guide to the best hotels in Bahrain from luxury 5-star resorts to budget-friendly options.',
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
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.bahrainnights.com' },
          { '@type': 'ListItem', position: 2, name: 'Best Hotels Bahrain', item: 'https://www.bahrainnights.com/best-hotels-bahrain' }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What are the best 5-star hotels in Bahrain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The best 5-star hotels in Bahrain are Four Seasons Hotel Bahrain Bay (most luxurious, stunning architecture), Ritz-Carlton Bahrain (beachfront resort, largest pool), Jumeirah Royal Saray (private beach, palatial design), and Gulf Hotel (legendary service, award-winning dining). Rates start from 120 BHD/night.'
            }
          },
          {
            '@type': 'Question',
            name: 'Which hotels in Bahrain have the best beach access?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Hotels with the best beach access include Ritz-Carlton Bahrain (private beach and lagoon), Jumeirah Royal Saray (pristine private beach), The Diplomat Radisson Blu (beachfront location), and Sofitel Bahrain Zallaq (beach resort outside Manama).'
            }
          },
          {
            '@type': 'Question',
            name: 'What are the best budget hotels in Bahrain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The best budget hotels in Bahrain include Downtown Rotana (great value 4-star), Ramada Hotel Bahrain (affordable comfort), Golden Tulip Bahrain (excellent location), and Ibis Seef (reliable budget option). Expect to pay 25-50 BHD per night for clean, comfortable rooms.'
            }
          },
          {
            '@type': 'Question',
            name: 'Where should I stay in Bahrain for nightlife?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'For nightlife, stay in Juffair (Gulf Hotel, The Domain) or Adliya area. Hotels like Gulf Hotel, InterContinental Regency, and Wyndham Grand are near bars and clubs. The Seef area also offers good nightlife options.'
            }
          },
          {
            '@type': 'Question',
            name: 'Which Bahrain hotels are best for families?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Best family hotels include Ritz-Carlton Bahrain (kids club, beach), Jumeirah Royal Saray (family suites, pools), Sofitel Zallaq (waterpark nearby), and The Domain Hotel (spacious apartments). All offer family-friendly amenities and activities.'
            }
          }
        ]
      }
    ]
  };
}

const hotelCategories = [
  {
    title: 'Luxury 5-Star Hotels',
    icon: Crown,
    color: 'from-amber-500 to-yellow-600',
    description: 'World-class resorts with exceptional service and amenities',
    priceRange: '120-350 BHD/night',
    hotels: [
      { 
        name: 'Four Seasons Hotel Bahrain Bay', 
        location: 'Bahrain Bay', 
        stars: 5,
        rating: 4.9, 
        priceRange: '180-350 BHD',
        style: 'Modern Luxury',
        amenities: ['Private Beach', 'Infinity Pool', 'Spa', 'Multiple Restaurants', 'Yacht Access'],
        desc: 'Rising dramatically from a private island in Bahrain Bay, the Four Seasons is an architectural masterpiece and the Kingdom\'s most prestigious address. The hotel\'s striking design features a soaring atrium and rooms with floor-to-ceiling windows overlooking the Arabian Gulf. Every detail speaks of refined luxury — from the Italian marble bathrooms to the Egyptian cotton linens. The hotel houses some of Bahrain\'s finest restaurants including CUT by Wolfgang Puck and Masso. The infinity pool seems to merge with the sea, and the spa offers treatments using Middle Eastern-inspired techniques. This is where royalty and celebrities stay when visiting Bahrain.',
        highlights: ['Iconic architecture on private island', 'Celebrity chef restaurants', 'Personal butler service available', 'Private yacht for guest excursions'],
        bestFor: 'Ultimate luxury seekers, honeymoons, special occasions'
      },
      { 
        name: 'The Ritz-Carlton, Bahrain', 
        location: 'Seef', 
        stars: 5,
        rating: 4.8, 
        priceRange: '150-280 BHD',
        style: 'Beachfront Resort',
        amenities: ['Private Beach', 'Lagoon Pools', 'Kids Club', 'Golf Course Access', 'Water Sports'],
        desc: 'Spread across 20 acres of beachfront paradise, The Ritz-Carlton Bahrain offers the quintessential resort experience in the Kingdom. The property features private villas with pools, a pristine beach, and multiple lagoon-style pools. It\'s essentially a self-contained luxury destination where you could spend your entire holiday without leaving. The dining options are exceptional — from La Mer\'s seafood to Bushido\'s Japanese cuisine. Families particularly love the expansive grounds where children can play freely. The spa is one of the largest in Bahrain, and the fitness facilities are state-of-the-art. Evening brings the property to life with restaurants, bars, and the sound of waves.',
        highlights: ['Largest hotel pool in Bahrain', 'Private beach with water sports', 'Outstanding kids\' club', 'Villa accommodations available'],
        bestFor: 'Beach lovers, families, resort experience seekers'
      },
      { 
        name: 'Jumeirah Royal Saray', 
        location: 'Seef', 
        stars: 5,
        rating: 4.7, 
        priceRange: '140-260 BHD',
        style: 'Palatial Elegance',
        amenities: ['Private Beach', 'Talise Spa', 'Multiple Pools', 'Fine Dining', 'Luxury Boutiques'],
        desc: 'Drawing inspiration from Bahrain\'s royal heritage, Jumeirah Royal Saray is a palace by the sea. The interiors are lavishly decorated with gold leaf, crystal chandeliers, and intricate Arabic patterns that feel authentically Gulf while maintaining Jumeirah\'s signature elegance. The private beach is immaculately maintained, and the pools offer varying experiences from family-friendly to adults-only tranquility. The Talise Spa is a destination in itself, spanning multiple floors with treatment rooms, hammams, and relaxation lounges. Dining options include Italian, Asian, and international cuisines. The hotel has a royal quality that makes every guest feel like visiting aristocracy.',
        highlights: ['Palatial Arabic design', 'Award-winning Talise Spa', 'Adults-only infinity pool', 'Butler service for suites'],
        bestFor: 'Couples, spa enthusiasts, those seeking Arabian luxury'
      },
      { 
        name: 'Gulf Hotel Bahrain', 
        location: 'Adliya', 
        stars: 5,
        rating: 4.7, 
        priceRange: '120-200 BHD',
        style: 'Legendary Classic',
        amenities: ['Award-winning Dining', 'Spa', 'Pool', 'Nightlife', 'Convention Center'],
        desc: 'The Gulf Hotel is a Bahrain institution — a legendary property that has hosted dignitaries and celebrities for decades. While it may not have the beach frontage of newer competitors, it compensates with unmatched character, exceptional dining, and a prime Adliya location. The hotel is home to some of Bahrain\'s most celebrated restaurants including the award-winning Al Waha, Plums, and Takht Jamsheed. The Friday brunch here is legendary. The property has been continuously updated while maintaining its classic charm. The nightlife within the hotel is among the best in the city. For many, the Gulf Hotel IS Bahrain hospitality.',
        highlights: ['Most famous Friday brunch in Bahrain', 'Multiple award-winning restaurants', 'Prime Adliya location', 'Rich history and character'],
        bestFor: 'Foodies, nightlife lovers, those wanting classic Bahrain hospitality'
      },
      { 
        name: 'Wyndham Grand Manama', 
        location: 'Bahrain Bay', 
        stars: 5,
        rating: 4.6, 
        priceRange: '100-180 BHD',
        style: 'Modern Business Luxury',
        amenities: ['Bay Views', 'Rooftop Pool', 'Spa', 'Multiple Dining', 'Connected to Mall'],
        desc: 'The newest addition to Bahrain\'s luxury hotel scene, Wyndham Grand Manama offers contemporary five-star luxury with stunning views of Bahrain Bay. The hotel is connected to Water Garden City mall, making shopping and dining conveniently accessible. Rooms are spacious and modern with floor-to-ceiling windows showcasing city or bay views. The rooftop pool offers panoramic vistas of the skyline. It\'s an excellent choice for business travelers who want luxury without the beach resort premium, while still enjoying five-star amenities and service.',
        highlights: ['Newest 5-star in Bahrain', 'Connected to shopping mall', 'Stunning bay views', 'Modern business facilities'],
        bestFor: 'Business travelers, modern luxury seekers, shoppers'
      },
    ]
  },
  {
    title: 'Upscale 4-Star Hotels',
    icon: Gem,
    color: 'from-blue-500 to-indigo-600',
    description: 'Excellent quality hotels balancing comfort and value',
    priceRange: '60-120 BHD/night',
    hotels: [
      { 
        name: 'InterContinental Regency Bahrain', 
        location: 'Manama', 
        stars: 4,
        rating: 4.5, 
        priceRange: '80-130 BHD',
        style: 'Business & Leisure',
        amenities: ['Rooftop Pool', 'Multiple Restaurants', 'Spa', 'Nightlife', 'Central Location'],
        desc: 'A stalwart of Bahrain hospitality, the InterContinental Regency has been welcoming guests for years with consistent four-star quality. The central Manama location puts you within easy reach of the business district and attractions. The hotel has cultivated a loyal following among business travelers and tourists alike. Multiple dining venues including the popular Trader Vic\'s provide variety, and the nightlife options within the hotel are well-established. The rooftop pool is a great place to unwind after a day of meetings or sightseeing. Recently renovated rooms maintain comfort and modern amenities.',
        highlights: ['Prime central Manama location', 'Popular bars and restaurants', 'Well-established property', 'Excellent meeting facilities'],
        bestFor: 'Business travelers, city explorers, those wanting central location'
      },
      { 
        name: 'The Diplomat Radisson Blu Hotel', 
        location: 'Diplomatic Area', 
        stars: 4,
        rating: 4.4, 
        priceRange: '70-120 BHD',
        style: 'Beachfront Business',
        amenities: ['Private Beach', 'Pool', 'Multiple Dining', 'Tennis Courts', 'Business Center'],
        desc: 'Combining beachfront location with business hotel efficiency, The Diplomat offers a unique value proposition. The private beach allows guests to enjoy resort-like relaxation without resort prices. The diplomatic area location is convenient for government and business visitors. Multiple restaurants cater to various tastes, and the sports facilities including tennis courts add recreational value. Rooms have been recently updated and offer sea or city views. The hotel strikes a nice balance between work and leisure.',
        highlights: ['Beachfront at 4-star price', 'Diplomatic area location', 'Good sports facilities', 'Multiple dining options'],
        bestFor: 'Beach seekers on a budget, business travelers, sports enthusiasts'
      },
      { 
        name: 'The Domain Hotel and Spa', 
        location: 'Juffair', 
        stars: 4,
        rating: 4.5, 
        priceRange: '60-100 BHD',
        style: 'Apart-Hotel Luxury',
        amenities: ['Apartment Suites', 'Full Kitchens', 'Pool', 'Spa', 'Gym'],
        desc: 'The Domain pioneered the luxury apartment-hotel concept in Bahrain, offering spacious suites with full kitchens in a prime Juffair location. This makes it ideal for extended stays and families who appreciate the extra space and self-catering option. Despite the apartment format, service levels are hotel-standard with daily housekeeping and concierge assistance. The location in Juffair means easy access to restaurants, shops, and nightlife. The pool area is a peaceful retreat, and the spa offers relaxation options. The Domain is like having your own luxury apartment with hotel services.',
        highlights: ['Spacious apartment-style rooms', 'Full kitchens available', 'Prime Juffair location', 'Excellent for extended stays'],
        bestFor: 'Long-stay guests, families, those wanting apartment comfort'
      },
      { 
        name: 'Elite Grande Hotel', 
        location: 'Seef', 
        stars: 4,
        rating: 4.4, 
        priceRange: '55-90 BHD',
        style: 'Modern Comfort',
        amenities: ['Near Malls', 'Pool', 'Restaurant', 'Gym', 'Business Center'],
        desc: 'Located in the heart of Seef\'s shopping district, Elite Grande offers modern four-star comfort at competitive prices. The contemporary rooms are well-appointed with all modern amenities. The location is ideal for shoppers with City Centre and Seef Mall within walking distance. The hotel provides reliable quality and service without unnecessary frills. A solid choice for travelers who want comfortable accommodation without paying luxury premiums.',
        highlights: ['Shopping district location', 'Modern facilities', 'Competitive pricing', 'Reliable service standards'],
        bestFor: 'Shoppers, value-conscious travelers, short business trips'
      },
    ]
  },
  {
    title: 'Mid-Range Hotels',
    icon: Building2,
    color: 'from-green-500 to-emerald-600',
    description: 'Comfortable hotels with good amenities at reasonable prices',
    priceRange: '35-70 BHD/night',
    hotels: [
      { 
        name: 'Downtown Rotana', 
        location: 'Manama', 
        stars: 4,
        rating: 4.4, 
        priceRange: '45-75 BHD',
        style: 'Business Comfort',
        amenities: ['Central Location', 'Pool', 'Gym', 'Restaurant', 'Meeting Rooms'],
        desc: 'Downtown Rotana punches above its weight, offering four-star quality at mid-range prices. The central Manama location is excellent for business and exploration. Rooms are modern and comfortable with the reliable Rotana quality standards. The rooftop pool provides city views and a relaxing escape. Restaurant and bar options are adequate for casual dining. This is the go-to choice for savvy business travelers who want quality without overpaying. The Rotana brand guarantees consistent standards.',
        highlights: ['Excellent value for quality', 'Prime downtown location', 'Reliable Rotana standards', 'Good meeting facilities'],
        bestFor: 'Business travelers, value seekers, city explorers'
      },
      { 
        name: 'Ramada Hotel & Suites Amwaj', 
        location: 'Amwaj Islands', 
        stars: 4,
        rating: 4.3, 
        priceRange: '40-70 BHD',
        style: 'Island Resort Feel',
        amenities: ['Pool', 'Beach Nearby', 'Restaurant', 'Gym', 'Modern Rooms'],
        desc: 'Located on the man-made Amwaj Islands, this Ramada property offers a resort-like atmosphere at mid-range prices. The island setting provides a break from urban Bahrain, with beaches and waterfront dining nearby. Rooms are contemporary and spacious. The pool area is pleasant, and the location near Amwaj restaurants and beaches adds value. It\'s a good choice for those who want a vacation feel without luxury resort costs.',
        highlights: ['Amwaj Island location', 'Near beach and restaurants', 'Spacious modern rooms', 'Resort atmosphere at mid-range price'],
        bestFor: 'Beach seekers on budget, families, those wanting island setting'
      },
      { 
        name: 'Mercure Grand Hotel Seef', 
        location: 'Seef', 
        stars: 4,
        rating: 4.2, 
        priceRange: '40-65 BHD',
        style: 'Shopping District',
        amenities: ['Near Malls', 'Pool', 'Restaurant', 'Bar', 'Business Center'],
        desc: 'A reliable Accor property in the Seef shopping district, Mercure Grand offers predictable quality and convenience. The location is ideal for shoppers and business travelers. Rooms follow the Mercure standard — clean, functional, and comfortable. The pool provides relaxation options, and the restaurant and bar handle dining needs adequately. For travelers who value consistency and location over luxury, this is a solid bet.',
        highlights: ['Walking distance to malls', 'Reliable Mercure quality', 'Good value', 'Convenient Seef location'],
        bestFor: 'Shoppers, business travelers, value-conscious guests'
      },
      { 
        name: 'Golden Tulip Bahrain', 
        location: 'Juffair', 
        stars: 4,
        rating: 4.2, 
        priceRange: '35-60 BHD',
        style: 'Comfortable Stay',
        amenities: ['Pool', 'Restaurant', 'Gym', 'Near Restaurants', 'Bar'],
        desc: 'Golden Tulip in Juffair offers comfortable accommodation in one of Bahrain\'s most vibrant neighborhoods. The surrounding area is filled with restaurants, cafes, and entertainment options. The hotel itself provides all essential amenities — clean rooms, a decent pool, and dining options. Staff are friendly and helpful. This is an excellent base for exploring Juffair\'s offerings while maintaining comfortable accommodation standards.',
        highlights: ['Vibrant Juffair location', 'Walking distance to dining and nightlife', 'Competitive pricing', 'Friendly service'],
        bestFor: 'Nightlife seekers, young travelers, those wanting vibrant location'
      },
    ]
  },
  {
    title: 'Budget-Friendly Hotels',
    icon: Wallet,
    color: 'from-teal-500 to-cyan-600',
    description: 'Clean, comfortable options for cost-conscious travelers',
    priceRange: '20-40 BHD/night',
    hotels: [
      { 
        name: 'Ibis Seef Manama', 
        location: 'Seef', 
        stars: 3,
        rating: 4.1, 
        priceRange: '25-40 BHD',
        style: 'Smart Budget',
        amenities: ['Near Malls', 'Restaurant', 'WiFi', 'Clean Rooms', 'Consistent Standards'],
        desc: 'The Ibis brand delivers exactly what budget travelers need — clean, modern rooms with no surprises. The Seef location offers convenience to shopping and dining. Rooms are compact but smartly designed with comfortable beds (Ibis is known for their Sweet Bed concept). The lobby restaurant serves affordable meals, and the WiFi is reliable. For travelers who spend minimal time in their room and maximum time exploring, Ibis provides excellent value.',
        highlights: ['Reliable Accor standards', 'Comfortable beds', 'Great shopping location', 'No unpleasant surprises'],
        bestFor: 'Budget travelers, business stays, solo travelers'
      },
      { 
        name: 'Swiss-Belhotel Seef', 
        location: 'Seef', 
        stars: 3,
        rating: 4.0, 
        priceRange: '28-45 BHD',
        style: 'Value Comfort',
        amenities: ['Pool', 'Restaurant', 'Gym', 'WiFi', 'Near Attractions'],
        desc: 'Swiss-Belhotel offers three-star comfort with amenities that rival more expensive properties. The pool is a rare find at this price point, and the gym is well-equipped. Rooms are clean and functional with decent size. The Seef location provides easy access to malls and restaurants. Staff are accommodating and helpful. This hotel over-delivers for its price category.',
        highlights: ['Pool at budget price', 'Good facilities for 3-star', 'Helpful staff', 'Convenient location'],
        bestFor: 'Value seekers, families on budget, those wanting pool access'
      },
      { 
        name: 'Ramada Bahrain', 
        location: 'Juffair', 
        stars: 3,
        rating: 3.9, 
        priceRange: '25-40 BHD',
        style: 'Budget Reliable',
        amenities: ['Restaurant', 'WiFi', 'Gym', 'Near Entertainment', 'Clean Rooms'],
        desc: 'A straightforward budget hotel in the heart of Juffair\'s entertainment district. Rooms are basic but clean and functional. The location means you\'re surrounded by restaurants, cafes, and nightlife. For travelers who use hotels primarily for sleeping and want to spend their budget on experiences, this Ramada delivers adequate accommodation at accessible prices.',
        highlights: ['Juffair entertainment district', 'Budget-friendly', 'Clean and functional', 'Surrounded by dining options'],
        bestFor: 'Budget travelers, nightlife seekers, young travelers'
      },
      { 
        name: 'Al Safir Hotel', 
        location: 'Juffair', 
        stars: 3,
        rating: 3.8, 
        priceRange: '20-35 BHD',
        style: 'Local Budget',
        amenities: ['Restaurant', 'WiFi', 'AC', 'Near Shops', 'Basic Gym'],
        desc: 'Al Safir provides no-frills accommodation at very competitive prices. The rooms are basic but clean, with essential amenities like air conditioning and WiFi. The location in Juffair offers access to nearby dining and entertainment. Service is friendly if not polished. For extremely budget-conscious travelers or those just needing a place to sleep, Al Safir gets the job done at minimal cost.',
        highlights: ['Very affordable', 'Basic but clean', 'Juffair location', 'Friendly staff'],
        bestFor: 'Ultra-budget travelers, backpackers, short stays'
      },
    ]
  },
];

const areaGuide = [
  { 
    name: 'Bahrain Bay', 
    vibe: 'Ultra-luxury waterfront', 
    bestFor: 'Luxury travelers, special occasions',
    hotels: ['Four Seasons', 'Wyndham Grand']
  },
  { 
    name: 'Seef', 
    vibe: 'Shopping & business hub', 
    bestFor: 'Shoppers, business travelers',
    hotels: ['Ritz-Carlton', 'Jumeirah', 'Elite Grande']
  },
  { 
    name: 'Juffair', 
    vibe: 'Entertainment & nightlife', 
    bestFor: 'Nightlife, dining, young travelers',
    hotels: ['The Domain', 'Golden Tulip', 'Ramada']
  },
  { 
    name: 'Adliya', 
    vibe: 'Boutique & cafes', 
    bestFor: 'Art lovers, foodies, cafe hoppers',
    hotels: ['Gulf Hotel', 'Boutique options']
  },
  { 
    name: 'Manama Downtown', 
    vibe: 'Central business district', 
    bestFor: 'Business, city exploration',
    hotels: ['InterContinental', 'Downtown Rotana']
  },
  { 
    name: 'Amwaj Islands', 
    vibe: 'Island resort lifestyle', 
    bestFor: 'Beach lovers, families',
    hotels: ['Ramada Amwaj', 'Serviced apartments']
  },
];

export default function HotelsBahrainPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSchema()) }}
      />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-indigo-900/30" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <nav className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li>/</li>
                <li className="text-white">Best Hotels Bahrain</li>
              </ol>
            </nav>

            <div className="text-center">
              <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full text-blue-300 text-sm mb-4">
                🏨 Updated for 2026
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-indigo-200 bg-clip-text text-transparent">
                Best Hotels in Bahrain
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                From world-class luxury resorts to budget-friendly gems, find the perfect place to stay 
                in the Kingdom of Bahrain. Complete guide with honest reviews and insider tips.
              </p>
              
              <div className="flex flex-wrap justify-center gap-8 mt-10">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">20+</div>
                  <div className="text-sm text-gray-400">Hotels Reviewed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-400">4</div>
                  <div className="text-sm text-gray-400">Price Categories</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">6</div>
                  <div className="text-sm text-gray-400">Areas Covered</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Category Nav */}
        <section className="py-8 px-4 border-y border-gray-800">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3">
              {hotelCategories.map((cat) => (
                <a
                  key={cat.title}
                  href={`#${cat.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`px-4 py-2 rounded-full bg-gradient-to-r ${cat.color} text-white text-sm font-medium hover:opacity-90 transition flex items-center gap-2`}
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.title}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
            <h2 className="text-3xl font-bold text-white mb-6">Where to Stay in Bahrain</h2>
            <p className="text-gray-300 leading-relaxed">
              Bahrain punches well above its weight in hospitality. This small island nation hosts some of 
              the region's most prestigious hotels, from the architectural marvel of Four Seasons Bahrain Bay 
              to the legendary Gulf Hotel that has hosted royalty for decades.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Unlike larger Gulf destinations, Bahrain's compact size means you're never far from anything. 
              Most hotels can reach the airport in 15-20 minutes, and the entire island is easily explorable 
              from any base. Your choice of area matters more for atmosphere than accessibility.
            </p>
            <p className="text-gray-300 leading-relaxed">
              <strong>Bahrain Bay and Seef</strong> offer modern luxury with beach access. <strong>Juffair</strong> is 
              the entertainment hub with nightlife at your doorstep. <strong>Adliya</strong> provides boutique 
              charm amid cafes and galleries. <strong>Downtown Manama</strong> suits business travelers. 
              This guide helps you find the perfect match for your needs and budget.
            </p>
          </div>
        </section>

        {/* Area Guide */}
        <section className="py-12 px-4 bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white text-center mb-8">Hotels by Area</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {areaGuide.map((area) => (
                <div key={area.name} className="p-5 bg-gray-800/50 rounded-xl border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-1">{area.name}</h3>
                  <p className="text-blue-400 text-sm mb-2">{area.vibe}</p>
                  <p className="text-gray-400 text-sm mb-3">Best for: {area.bestFor}</p>
                  <div className="flex flex-wrap gap-1">
                    {area.hotels.map((hotel) => (
                      <span key={hotel} className="px-2 py-0.5 bg-gray-700/50 rounded text-xs text-gray-300">
                        {hotel}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hotel Categories */}
        {hotelCategories.map((category) => (
          <section 
            key={category.title} 
            id={category.title.toLowerCase().replace(/\s+/g, '-')}
            className="py-16 px-4"
          >
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color}`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">{category.title}</h2>
                  <p className="text-gray-400">{category.description}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <span className="inline-block px-4 py-1.5 bg-gray-800 rounded-full text-gray-300 text-sm">
                  💰 Price Range: {category.priceRange}
                </span>
              </div>
              
              <div className="space-y-6">
                {category.hotels.map((hotel) => (
                  <div 
                    key={hotel.name} 
                    className="p-6 bg-gray-800/50 hover:bg-gray-800 rounded-2xl border border-gray-700 transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-semibold text-white">
                            {hotel.name}
                          </h3>
                          <div className="flex">
                            {[...Array(hotel.stars)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {hotel.location}
                          </span>
                          <span>•</span>
                          <span>{hotel.style}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-blue-400">
                          <Star className="w-4 h-4 fill-blue-400" />
                          <span className="font-semibold">{hotel.rating}</span>
                        </div>
                        <div className="text-green-400 font-semibold">{hotel.priceRange}</div>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed mb-4">{hotel.desc}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {hotel.amenities.map((amenity) => (
                        <span key={amenity} className="px-2 py-1 bg-gray-700/50 rounded-full text-xs text-gray-300">
                          {amenity}
                        </span>
                      ))}
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="text-sm font-semibold text-blue-400 mb-2">Highlights</h4>
                        <ul className="space-y-1">
                          {hotel.highlights.map((highlight) => (
                            <li key={highlight} className="text-sm text-gray-400 flex items-start gap-2">
                              <Sparkles className="w-3 h-3 mt-1 text-blue-400 flex-shrink-0" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-green-400 mb-2">Best For</h4>
                        <p className="text-sm text-gray-400">{hotel.bestFor}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Hotel Website CTA */}
        <section className="py-16 px-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Own a Hotel in Bahrain?</h2>
            <p className="text-xl text-gray-300 mb-6">
              Your hotel deserves a stunning website that converts visitors into bookings.
            </p>
            <p className="text-gray-400 mb-8">
              We create beautiful, high-converting hotel websites with integrated booking systems, 
              SEO optimization, and mobile-first design.
            </p>
            <a 
              href="https://cinematicwebworks.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold hover:opacity-90 transition"
            >
              Visit CinematicWebWorks.com →
            </a>
          </div>
        </section>

        {/* Booking Tips */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-10">Hotel Booking Tips</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-800/50 rounded-xl">
                <h3 className="text-xl font-semibold text-blue-400 mb-3">📅 Best Time to Book</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Book 2-4 weeks ahead for best rates</li>
                  <li>• Avoid F1 weekend (prices triple)</li>
                  <li>• Summer (June-Aug) has lowest rates</li>
                  <li>• Winter weekends fill up fast</li>
                </ul>
              </div>
              
              <div className="p-6 bg-gray-800/50 rounded-xl">
                <h3 className="text-xl font-semibold text-green-400 mb-3">💰 Saving Money</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Book direct for perks (breakfast, upgrade)</li>
                  <li>• Check hotel's own website last</li>
                  <li>• Consider apartment hotels for stays 3+ days</li>
                  <li>• Weekday rates are usually cheaper</li>
                </ul>
              </div>
              
              <div className="p-6 bg-gray-800/50 rounded-xl">
                <h3 className="text-xl font-semibold text-amber-400 mb-3">🏨 What to Expect</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Most hotels have licensed restaurants/bars</li>
                  <li>• Pools are standard at 4-5 star properties</li>
                  <li>• Airport transfers often available</li>
                  <li>• WiFi is free at most hotels</li>
                </ul>
              </div>
              
              <div className="p-6 bg-gray-800/50 rounded-xl">
                <h3 className="text-xl font-semibold text-purple-400 mb-3">🎯 Insider Tips</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Join hotel loyalty programs for perks</li>
                  <li>• Request high floor for views</li>
                  <li>• Ask about resident rates if with local</li>
                  <li>• Friday brunch packages add value</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-10">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">What are the best 5-star hotels in Bahrain?</h3>
                <p className="text-gray-300">
                  The best 5-star hotels are Four Seasons Hotel Bahrain Bay (most luxurious, stunning architecture), 
                  Ritz-Carlton Bahrain (beachfront resort, largest pool), Jumeirah Royal Saray (private beach, 
                  palatial design), and Gulf Hotel (legendary service, award-winning dining). Rates start from 120 BHD/night.
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Which hotels in Bahrain have the best beach access?</h3>
                <p className="text-gray-300">
                  Hotels with the best beach access include Ritz-Carlton Bahrain (private beach and lagoon), 
                  Jumeirah Royal Saray (pristine private beach), The Diplomat Radisson Blu (beachfront location), 
                  and Sofitel Bahrain Zallaq (beach resort outside Manama).
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">What are the best budget hotels in Bahrain?</h3>
                <p className="text-gray-300">
                  The best budget hotels include Downtown Rotana (great value 4-star), Ramada Hotel Bahrain 
                  (affordable comfort), Golden Tulip Bahrain (excellent location), and Ibis Seef (reliable 
                  budget option). Expect to pay 25-50 BHD per night for clean, comfortable rooms.
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Where should I stay in Bahrain for nightlife?</h3>
                <p className="text-gray-300">
                  For nightlife, stay in Juffair (Gulf Hotel, The Domain) or Adliya area. Hotels like 
                  Gulf Hotel, InterContinental Regency, and Wyndham Grand are near bars and clubs. 
                  The Seef area also offers good nightlife options.
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Which Bahrain hotels are best for families?</h3>
                <p className="text-gray-300">
                  Best family hotels include Ritz-Carlton Bahrain (kids club, beach), Jumeirah Royal Saray 
                  (family suites, pools), Sofitel Zallaq (waterpark nearby), and The Domain Hotel (spacious 
                  apartments). All offer family-friendly amenities and activities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Links */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white text-center mb-8">Plan Your Trip</h2>
            
            <div className="grid md:grid-cols-4 gap-4">
              <Link href="/best-restaurants-bahrain" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition text-center group">
                <span className="text-3xl mb-3 block">🍽️</span>
                <h3 className="font-semibold text-white group-hover:text-blue-300">Restaurants</h3>
                <p className="text-sm text-gray-400 mt-2">Where to eat</p>
              </Link>
              
              <Link href="/things-to-do-in-bahrain" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition text-center group">
                <span className="text-3xl mb-3 block">🎯</span>
                <h3 className="font-semibold text-white group-hover:text-blue-300">Things To Do</h3>
                <p className="text-sm text-gray-400 mt-2">Activities & attractions</p>
              </Link>
              
              <Link href="/bahrain-nightlife-guide" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition text-center group">
                <span className="text-3xl mb-3 block">🌙</span>
                <h3 className="font-semibold text-white group-hover:text-blue-300">Nightlife</h3>
                <p className="text-sm text-gray-400 mt-2">Bars & clubs</p>
              </Link>
              
              <Link href="/events" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition text-center group">
                <span className="text-3xl mb-3 block">🎉</span>
                <h3 className="font-semibold text-white group-hover:text-blue-300">Events</h3>
                <p className="text-sm text-gray-400 mt-2">What's happening</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-400">
              Powered by <Link href="/" className="text-blue-400 hover:underline">BahrainNights.com</Link> — Bahrain's #1 Events & Lifestyle Platform
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
