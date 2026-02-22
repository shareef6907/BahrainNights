import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MapPin, Palmtree, Waves, Landmark, Camera, Sun,
  Mountain, Footprints, Bird, Building2, ShoppingBag,
  Bike, Star, ArrowRight, Clock, Heart, Compass,
  Users, Sparkles, TreePalm
} from 'lucide-react';

// SEO Optimized Metadata
export const metadata: Metadata = {
  title: '25 Best FREE Things to Do in Bahrain (2026) — Budget Travel Guide | BahrainNights',
  description: 'Discover the best FREE things to do in Bahrain! From stunning beaches and historic sites to parks, souks, and nature trails. Experience Bahrain without spending a dinar.',
  keywords: [
    'free things to do in Bahrain', 'Bahrain free activities', 'Bahrain budget travel',
    'free attractions Bahrain', 'Bahrain on a budget', 'cheap things to do Bahrain',
    'Bahrain free beaches', 'free Bahrain sightseeing', 'Bahrain free entry',
    'budget Bahrain', 'Bahrain for free', 'free Bahrain experiences',
    'Bahrain free tourist attractions', 'free family activities Bahrain'
  ].join(', '),
  alternates: {
    canonical: 'https://www.bahrainnights.com/free-things-to-do-bahrain',
  },
  openGraph: {
    title: '25 Best FREE Things to Do in Bahrain (2026) — Budget Travel Guide',
    description: 'Experience the best of Bahrain without spending a dinar! Free beaches, historic sites, parks, souks & more.',
    url: 'https://www.bahrainnights.com/free-things-to-do-bahrain',
    siteName: 'BahrainNights',
    images: [
      {
        url: 'https://www.bahrainnights.com/og-free-things.jpg',
        width: 1200,
        height: 630,
        alt: 'Free Things to Do in Bahrain - Budget Guide',
      },
    ],
    type: 'article',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: '25 Best FREE Things to Do in Bahrain (2026)',
    description: 'Experience Bahrain on a budget - free beaches, historic sites, parks & more!',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Free activities data
const freeActivities = [
  {
    id: 1,
    name: 'Al Dar Islands Beach',
    description: 'Crystal-clear waters and white sand beaches accessible by boat from Sitra. While the boat costs a small fee, the beach itself is free to enjoy all day.',
    location: 'Off Sitra Coast',
    category: 'Beaches',
    icon: Waves,
    tip: 'Bring your own food and drinks to save money',
    highlight: true,
  },
  {
    id: 2,
    name: 'Bahrain Fort (Qal\'at al-Bahrain)',
    description: 'A UNESCO World Heritage Site dating back 4,000 years. Explore ancient ruins, enjoy panoramic views of the sea, and learn about Dilmun civilization.',
    location: 'Karbabad',
    category: 'History',
    icon: Landmark,
    tip: 'Visit at sunset for stunning views',
    highlight: true,
  },
  {
    id: 3,
    name: 'Tree of Life',
    description: 'A 400-year-old mesquite tree standing alone in the desert with no apparent water source. One of Bahrain\'s most mystical attractions.',
    location: 'Southern Desert',
    category: 'Nature',
    icon: TreePalm,
    tip: 'Best visited early morning to avoid heat',
    highlight: true,
  },
  {
    id: 4,
    name: 'Bab Al Bahrain & Manama Souq',
    description: 'The gateway to Bahrain\'s oldest market. Wander through narrow alleyways filled with spices, textiles, gold, and local crafts.',
    location: 'Manama',
    category: 'Culture',
    icon: ShoppingBag,
    tip: 'Window shopping is free - great for photography',
    highlight: false,
  },
  {
    id: 5,
    name: 'Arad Fort',
    description: 'A beautifully restored 15th-century fort with stunning architecture. Especially magical when lit up at night.',
    location: 'Muharraq',
    category: 'History',
    icon: Building2,
    tip: 'Visit at night to see it illuminated',
    highlight: false,
  },
  {
    id: 6,
    name: 'Prince Khalifa Bin Salman Park',
    description: 'Bahrain\'s largest public park with walking trails, lakes, playgrounds, and beautiful landscaping. Perfect for families.',
    location: 'Hidd',
    category: 'Parks',
    icon: Palmtree,
    tip: 'Bring a picnic for a perfect family day out',
    highlight: true,
  },
  {
    id: 7,
    name: 'Al Fateh Grand Mosque',
    description: 'One of the world\'s largest mosques, featuring stunning architecture and a beautiful library. Free guided tours available.',
    location: 'Juffair',
    category: 'Culture',
    icon: Landmark,
    tip: 'Tours available Saturday-Thursday, dress modestly',
    highlight: true,
  },
  {
    id: 8,
    name: 'Muharraq Heritage Trail',
    description: 'A self-guided walking tour through Muharraq\'s historic pearling district. Discover traditional houses, mosques, and the pearl trading heritage.',
    location: 'Muharraq',
    category: 'History',
    icon: Footprints,
    tip: 'Download the heritage trail map from the tourism board',
    highlight: false,
  },
  {
    id: 9,
    name: 'Budaiya Beach',
    description: 'A peaceful public beach with calm waters, perfect for swimming and sunset watching. Popular with locals on weekends.',
    location: 'Budaiya',
    category: 'Beaches',
    icon: Waves,
    tip: 'Less crowded on weekday mornings',
    highlight: false,
  },
  {
    id: 10,
    name: 'Al Areen Wildlife Park (Exterior)',
    description: 'While the main park has an entry fee, you can enjoy the scenic drive around the reserve and spot wildlife from the road.',
    location: 'Al Areen',
    category: 'Nature',
    icon: Bird,
    tip: 'Drive slowly to spot oryx and gazelles',
    highlight: false,
  },
  {
    id: 11,
    name: 'Jarada Island',
    description: 'A sandbar island that appears at low tide. Walk on water and enjoy 360-degree sea views. A unique natural phenomenon.',
    location: 'Near Sitra',
    category: 'Nature',
    icon: Sun,
    tip: 'Check tide times before visiting - only accessible at low tide',
    highlight: true,
  },
  {
    id: 12,
    name: 'La Fontaine Centre of Contemporary Art',
    description: 'A beautifully restored heritage house showcasing contemporary art exhibitions. Free entry to galleries.',
    location: 'Manama',
    category: 'Art',
    icon: Camera,
    tip: 'Check their website for current exhibitions',
    highlight: false,
  },
  {
    id: 13,
    name: 'Bahrain Financial Harbour Walk',
    description: 'A scenic waterfront promenade with stunning views of the harbor and city skyline. Great for evening walks and photography.',
    location: 'Manama',
    category: 'Urban',
    icon: Building2,
    tip: 'Best at golden hour for photography',
    highlight: false,
  },
  {
    id: 14,
    name: 'Riffa Clock Tower & Surrounding Gardens',
    description: 'An iconic landmark with beautifully maintained gardens. A peaceful spot for a morning or evening stroll.',
    location: 'Riffa',
    category: 'Parks',
    icon: Palmtree,
    tip: 'Nice café nearby if you want to grab a coffee',
    highlight: false,
  },
  {
    id: 15,
    name: 'Adhari Park Grounds',
    description: 'While the amusement rides cost money, walking around the lake and enjoying the landscaped gardens is free.',
    location: 'Adhari',
    category: 'Parks',
    icon: Palmtree,
    tip: 'A good spot for a morning jog',
    highlight: false,
  },
  {
    id: 16,
    name: 'Bu Maher Fort',
    description: 'A 19th-century fort on the southern tip of Muharraq with great views. Part of the UNESCO pearling trail.',
    location: 'Muharraq',
    category: 'History',
    icon: Landmark,
    tip: 'Combine with a visit to Arad Fort nearby',
    highlight: false,
  },
  {
    id: 17,
    name: 'Oil Well No.1 Site',
    description: 'The site of the first oil well in the Arabian Gulf (1932). A monument marks this historic location.',
    location: 'Jebel Dukhan',
    category: 'History',
    icon: Mountain,
    tip: 'Combine with a trip to the Tree of Life',
    highlight: false,
  },
  {
    id: 18,
    name: 'Saar Burial Mounds',
    description: 'Ancient burial mounds dating back to the Dilmun era. A UNESCO World Heritage Site you can explore freely.',
    location: 'Saar',
    category: 'History',
    icon: Landmark,
    tip: 'Sunrise offers great photography opportunities',
    highlight: false,
  },
  {
    id: 19,
    name: 'Amwaj Lagoon Walk',
    description: 'A beautiful waterfront walk around the Amwaj Islands. Enjoy the marina views, cafés, and architecture.',
    location: 'Amwaj Islands',
    category: 'Urban',
    icon: Waves,
    tip: 'Pleasant for evening walks with sea breeze',
    highlight: false,
  },
  {
    id: 20,
    name: 'Friday Market',
    description: 'A bustling market selling everything from plants to pets to antiques. Free to explore and great for people-watching.',
    location: 'Sitra',
    category: 'Culture',
    icon: ShoppingBag,
    tip: 'Go early Friday morning for the best experience',
    highlight: false,
  },
  {
    id: 21,
    name: 'King Fahd Causeway Viewpoint',
    description: 'Enjoy views of the causeway connecting Bahrain and Saudi Arabia from the free viewing areas along the coast.',
    location: 'Jasra',
    category: 'Nature',
    icon: Waves,
    tip: 'Great sunset spot',
    highlight: false,
  },
  {
    id: 22,
    name: 'Bahrain World Trade Center',
    description: 'Admire the iconic wind turbine towers from the outside. The first skyscraper to integrate wind turbines.',
    location: 'Manama',
    category: 'Architecture',
    icon: Building2,
    tip: 'Night views are spectacular when lit up',
    highlight: false,
  },
  {
    id: 23,
    name: 'Hunainiyah Farms Area',
    description: 'A rural area with date palm farms. Perfect for a peaceful drive or cycle through Bahrain\'s agricultural side.',
    location: 'Hunainiyah',
    category: 'Nature',
    icon: Palmtree,
    tip: 'Especially beautiful during date season',
    highlight: false,
  },
  {
    id: 24,
    name: 'National Charter Monument',
    description: 'A symbolic monument celebrating Bahrain\'s National Action Charter. Beautiful at night when illuminated.',
    location: 'Manama',
    category: 'Landmarks',
    icon: Star,
    tip: 'Combine with a walk along the nearby corniche',
    highlight: false,
  },
  {
    id: 25,
    name: 'Jebel Dukhan',
    description: 'Bahrain\'s highest point at 134 meters. Drive to the top for panoramic views of the entire island.',
    location: 'Central Bahrain',
    category: 'Nature',
    icon: Mountain,
    tip: 'Bring binoculars for bird watching',
    highlight: false,
  },
];

const categories = [
  { name: 'All', icon: Compass },
  { name: 'Beaches', icon: Waves },
  { name: 'History', icon: Landmark },
  { name: 'Nature', icon: Palmtree },
  { name: 'Culture', icon: ShoppingBag },
  { name: 'Parks', icon: TreePalm },
];

export default function FreeThingsToDo() {
  const highlights = freeActivities.filter(a => a.highlight);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-teal-600/20" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Budget-Friendly Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              25 Best <span className="text-emerald-400">FREE</span> Things to Do in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Experience the best of Bahrain without spending a dinar. From pristine beaches and ancient forts 
              to vibrant souks and scenic parks — your ultimate budget travel guide for 2026.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="w-5 h-5" />
                <span>Updated February 2026</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-5 h-5" />
                <span>25 Free Attractions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-12 px-4 border-y border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">25+</div>
              <div className="text-gray-400">Free Activities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">5</div>
              <div className="text-gray-400">Free Beaches</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">7</div>
              <div className="text-gray-400">Historic Sites</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">$0</div>
              <div className="text-gray-400">Total Cost</div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Picks Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <Star className="w-8 h-8 text-yellow-400" />
            Must-Visit Free Attractions
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((activity) => (
              <div 
                key={activity.id}
                className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-emerald-500/50 transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-emerald-500/10 rounded-xl">
                    <activity.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{activity.name}</h3>
                    <p className="text-gray-400 text-sm flex items-center gap-1 mt-1">
                      <MapPin className="w-4 h-4" />
                      {activity.location}
                    </p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{activity.description}</p>
                <div className="bg-emerald-500/10 rounded-lg p-3 text-sm text-emerald-300">
                  💡 <strong>Tip:</strong> {activity.tip}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Activities */}
      <section className="py-16 px-4 bg-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">
            All Free Activities
          </h2>
          <div className="space-y-4">
            {freeActivities.map((activity, index) => (
              <div 
                key={activity.id}
                className="bg-gray-800/50 rounded-xl p-5 border border-gray-700 hover:border-emerald-500/30 transition-all flex items-start gap-4"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-emerald-400 font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        {activity.name}
                        {activity.highlight && (
                          <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full">
                            Must Visit
                          </span>
                        )}
                      </h3>
                      <p className="text-gray-400 text-sm flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {activity.location}
                        <span className="mx-2">•</span>
                        <span className="text-emerald-400">{activity.category}</span>
                      </p>
                    </div>
                    <activity.icon className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  </div>
                  <p className="text-gray-300 mt-2 text-sm">{activity.description}</p>
                  <p className="text-emerald-400 text-sm mt-2">💡 {activity.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">
            Budget Travel Tips for Bahrain
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-emerald-400 mb-4">🚗 Getting Around</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Public buses are cheap at 200-300 fils per ride</li>
                <li>• Download Careem or Uber for affordable taxi rides</li>
                <li>• Rent a car if visiting multiple locations</li>
                <li>• Many attractions are clustered - plan walking routes</li>
              </ul>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-emerald-400 mb-4">🍽️ Eating on a Budget</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Try local cafeterias for meals under 2 BHD</li>
                <li>• Pack picnics for beach and park visits</li>
                <li>• Visit souks for fresh fruits and snacks</li>
                <li>• Many malls have affordable food courts</li>
              </ul>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-emerald-400 mb-4">📅 Best Times to Visit</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• October to April: Perfect weather for outdoor activities</li>
                <li>• Fridays: Visit souks and markets for local atmosphere</li>
                <li>• Sunsets: Best time for beaches and forts</li>
                <li>• Early mornings: Avoid crowds at popular sites</li>
              </ul>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-emerald-400 mb-4">💡 Pro Tips</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Always carry water - stays are hot year-round</li>
                <li>• Dress modestly when visiting mosques</li>
                <li>• Check museum free-entry days</li>
                <li>• Ask locals for hidden gems - they love sharing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-16 px-4 bg-gray-800/30">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-8">
            Explore More of Bahrain
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/things-to-do-in-bahrain"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl text-white transition-colors"
            >
              50 Things to Do
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/best-restaurants-bahrain"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl text-white transition-colors"
            >
              Best Restaurants
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/beach-pool-clubs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl text-white transition-colors"
            >
              Beach & Pool Clubs
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/attractions"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl text-white transition-colors"
            >
              All Attractions
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: '25 Best FREE Things to Do in Bahrain (2026)',
            description: 'Discover the best free things to do in Bahrain. From stunning beaches and historic sites to parks, souks, and nature trails.',
            author: {
              '@type': 'Organization',
              name: 'BahrainNights',
            },
            publisher: {
              '@type': 'Organization',
              name: 'BahrainNights',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.bahrainnights.com/logo.png',
              },
            },
            datePublished: '2026-02-22',
            dateModified: '2026-02-22',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://www.bahrainnights.com/free-things-to-do-bahrain',
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: freeActivities.map((activity, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'TouristAttraction',
                name: activity.name,
                description: activity.description,
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: activity.location,
                  addressCountry: 'Bahrain',
                },
                isAccessibleForFree: true,
              },
            })),
          }),
        }}
      />
    </div>
  );
}
