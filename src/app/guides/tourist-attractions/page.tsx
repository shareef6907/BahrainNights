import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Landmark, Star, MapPin, Clock, Camera,
  ArrowRight, Building, Waves, TreePalm, History
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Bahrain Tourist Attractions 2025 | Top Sights & Landmarks',
  description: 'Discover Bahrain tourist attractions! From UNESCO sites to modern marvels, explore the best landmarks, museums, and sights in Bahrain. Complete visitor guide.',
  keywords: 'Bahrain tourist attractions, Bahrain landmarks, things to see in Bahrain, Bahrain sightseeing, Bahrain points of interest, UNESCO sites Bahrain, Bahrain tourism',
  openGraph: {
    title: 'Bahrain Tourist Attractions 2025 | Top Sights & Landmarks',
    description: 'Your complete guide to Bahrain\'s tourist attractions - UNESCO sites, museums, landmarks, and must-see sights.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/tourist-attractions',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/tourist-attractions',
  },
};

const topAttractions = [
  {
    name: 'Bahrain Fort (Qal\'at al-Bahrain)',
    type: 'UNESCO World Heritage Site',
    location: 'Karbabad',
    entryFee: 'Free (Museum: BD 0.5)',
    duration: '2-3 hours',
    rating: 4.8,
    description: 'A magnificent 4,000-year-old archaeological site and UNESCO World Heritage Site. The fort has been occupied by various civilizations including Dilmun, Portuguese, and Persians.',
    highlights: ['Ancient Dilmun ruins', 'Portuguese fort', 'Site museum', 'Sea views', 'Sunset spot'],
    bestTime: 'Late afternoon/sunset',
    tip: 'Visit the excellent on-site museum for context. Bring water and wear comfortable shoes.',
  },
  {
    name: 'Al Fateh Grand Mosque',
    type: 'Religious Landmark',
    location: 'Juffair',
    entryFee: 'Free',
    duration: '1-2 hours',
    rating: 4.8,
    description: 'One of the largest mosques in the world, capable of holding 7,000 worshippers. Features stunning Italian marble, Austrian chandeliers, and free guided tours for visitors.',
    highlights: ['Stunning architecture', 'Free guided tours', 'Islamic library', 'World\'s largest dome'],
    bestTime: 'Morning (outside prayer times)',
    tip: 'Dress modestly. Free abayas provided for women. Tours available outside prayer times.',
  },
  {
    name: 'Bahrain National Museum',
    type: 'Museum',
    location: 'Manama Corniche',
    entryFee: 'BD 1',
    duration: '2-3 hours',
    rating: 4.7,
    description: 'Bahrain\'s premier museum showcasing 6,000 years of history, from Dilmun civilization to modern era. Excellent displays of archaeological finds and traditional life.',
    highlights: ['Dilmun burial mounds', 'Traditional Bahraini house', 'Natural history', 'Art gallery'],
    bestTime: 'Morning',
    tip: 'The traditional house exhibit and burial mound displays are must-sees.',
  },
  {
    name: 'Tree of Life',
    type: 'Natural Wonder',
    location: 'Southern Desert',
    entryFee: 'Free',
    duration: '1 hour',
    rating: 4.3,
    description: 'A 400-year-old mesquite tree standing alone in the desert with no visible water source. A mysterious natural phenomenon and popular photo spot.',
    highlights: ['400-year-old tree', 'Desert scenery', 'Mysterious origin', 'Photo opportunity'],
    bestTime: 'Late afternoon (cooler)',
    tip: 'Combine with visit to Oil Museum nearby. Best visited October-April when cooler.',
  },
  {
    name: 'Beit Al Quran',
    type: 'Museum',
    location: 'Hoora',
    entryFee: 'BD 0.5',
    duration: '1-2 hours',
    rating: 4.6,
    description: 'A stunning museum dedicated to Islamic arts and Quranic manuscripts. Houses one of the world\'s largest collections of historic Quran manuscripts.',
    highlights: ['Ancient Qurans', 'Islamic calligraphy', 'Beautiful architecture', 'Rare manuscripts'],
    bestTime: 'Morning',
    tip: 'The manuscript collection is world-class. Check for guided tour availability.',
  },
  {
    name: 'Bahrain World Trade Center',
    type: 'Modern Landmark',
    location: 'Manama',
    entryFee: 'Free (exterior)',
    duration: '30 minutes',
    rating: 4.4,
    description: 'Iconic twin towers connected by three wind turbines - the first building in the world to integrate large-scale wind turbines into its design.',
    highlights: ['Unique architecture', 'Wind turbines', 'Photo spot', 'Surrounding area'],
    bestTime: 'Daytime for photos',
    tip: 'Great for architecture photography. The area around has shopping and dining.',
  },
  {
    name: 'Muharraq Heritage Trail',
    type: 'UNESCO World Heritage Site',
    location: 'Muharraq',
    entryFee: 'Free (some buildings charge small fees)',
    duration: '3-4 hours',
    rating: 4.5,
    description: 'A UNESCO-listed walking trail through traditional Bahraini houses, pearl merchant homes, and restored heritage buildings. Experience Bahrain\'s pearling history.',
    highlights: ['Sheikh Isa bin Ali House', 'Pearl route', 'Traditional architecture', 'Cultural insight'],
    bestTime: 'Morning or late afternoon',
    tip: 'Start at Sheikh Isa bin Ali House. The area has charming cafes for breaks.',
  },
  {
    name: 'Bahrain International Circuit',
    type: 'Sports Venue',
    location: 'Sakhir',
    entryFee: 'Varies (tours available)',
    duration: '2-3 hours',
    rating: 4.6,
    description: 'Home of the Bahrain Grand Prix F1 race. Offers experiences from circuit tours to go-karting on the track.',
    highlights: ['F1 circuit', 'Go-karting', 'Tours', 'Racing experiences'],
    bestTime: 'Anytime',
    tip: 'Book karting sessions or track day experiences for an unforgettable experience.',
  },
];

const freeAttractions = [
  { name: 'Bahrain Fort', description: 'UNESCO site with ancient ruins', location: 'Karbabad' },
  { name: 'Al Fateh Grand Mosque', description: 'One of the world\'s largest mosques', location: 'Juffair' },
  { name: 'Tree of Life', description: '400-year-old tree in the desert', location: 'Southern Desert' },
  { name: 'Muharraq Heritage Trail', description: 'UNESCO pearling path', location: 'Muharraq' },
  { name: 'Manama Souq', description: 'Traditional market and gold souq', location: 'Manama' },
  { name: 'Bab Al Bahrain', description: 'Historic gateway and landmark', location: 'Manama' },
  { name: 'Marassi Beach', description: 'Public beach with facilities', location: 'Diyar Al Muharraq' },
  { name: 'Bahrain Bay Promenade', description: 'Waterfront walking area', location: 'Bahrain Bay' },
];

const attractionCategories = [
  {
    category: 'Historical & Cultural',
    icon: History,
    attractions: ['Bahrain Fort', 'Bahrain National Museum', 'Muharraq Heritage', 'Beit Al Quran'],
    description: 'Explore 6,000 years of history from ancient Dilmun to modern Bahrain.',
  },
  {
    category: 'Religious Sites',
    icon: Building,
    attractions: ['Al Fateh Grand Mosque', 'Beit Al Quran', 'Khamis Mosque'],
    description: 'Beautiful mosques and Islamic heritage sites open to visitors.',
  },
  {
    category: 'Natural Attractions',
    icon: TreePalm,
    attractions: ['Tree of Life', 'Al Areen Wildlife Park', 'Hawar Islands'],
    description: 'Natural wonders and wildlife in Bahrain\'s unique desert and marine environments.',
  },
  {
    category: 'Modern Landmarks',
    icon: Landmark,
    attractions: ['Bahrain World Trade Center', 'Bahrain Financial Harbour', 'The Avenues'],
    description: 'Contemporary architecture and modern Bahrain.',
  },
];

const itineraries = [
  {
    title: '1-Day Essential Bahrain',
    attractions: [
      '9 AM: Bahrain National Museum',
      '11 AM: Bahrain Fort',
      '2 PM: Al Fateh Grand Mosque',
      '4 PM: Manama Souq',
      '7 PM: Sunset at Bahrain Bay',
    ],
  },
  {
    title: '2-Day Cultural Explorer',
    attractions: [
      'Day 1: Bahrain Fort, National Museum, Manama Souq',
      'Day 2: Muharraq Heritage, Beit Al Quran, Tree of Life',
    ],
  },
  {
    title: 'Half-Day Heritage',
    attractions: [
      'Muharraq Heritage Trail (3-4 hours)',
      'Sheikh Isa bin Ali House',
      'Traditional coffee break',
    ],
  },
];

export default function TouristAttractionsPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-amber-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Tourist Attractions', url: 'https://www.bahrainnights.com/guides/tourist-attractions' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-4">
              🏛️ Tourist Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Bahrain{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Tourist Attractions
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From ancient Dilmun civilization ruins to modern architectural marvels, 
              Bahrain packs 6,000 years of history into a small island kingdom. Discover 
              UNESCO sites, stunning mosques, and unique landmarks.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'UNESCO Sites', value: '3', icon: Landmark },
              { label: 'Museums', value: '8+', icon: Building },
              { label: 'Free Attractions', value: '10+', icon: Camera },
              { label: 'Heritage Sites', value: '15+', icon: History },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-amber-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Attractions */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Must-See Attractions</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Bahrain&apos;s top sights that every visitor should experience.
          </p>
          
          <div className="space-y-6">
            {topAttractions.map((attraction) => (
              <div 
                key={attraction.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-amber-400">{attraction.name}</h3>
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star className="w-4 h-4 fill-yellow-400" />
                        <span className="text-sm font-bold">{attraction.rating}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-400 mb-3">
                      <span className="px-2 py-1 bg-amber-500/20 text-amber-300 text-xs rounded">
                        {attraction.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> {attraction.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {attraction.duration}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-4">{attraction.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {attraction.highlights.map((h) => (
                        <span key={h} className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded">
                          {h}
                        </span>
                      ))}
                    </div>
                    
                    <p className="text-sm text-gray-400 mb-1">
                      <strong>Best time:</strong> {attraction.bestTime}
                    </p>
                    <p className="text-sm text-amber-400 italic">💡 {attraction.tip}</p>
                  </div>
                  
                  <div className="lg:text-right lg:min-w-[120px]">
                    <p className="text-lg font-bold text-amber-400">{attraction.entryFee}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Attractions */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">🆓 Free Attractions</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {freeAttractions.map((attr) => (
              <div key={attr.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-amber-400 mb-1">{attr.name}</h3>
                <p className="text-sm text-gray-300 mb-2">{attr.description}</p>
                <p className="text-xs text-gray-400">{attr.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By Category */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">By Category</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {attractionCategories.map((cat) => (
              <div key={cat.category} className="bg-white/5 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-amber-500/20 rounded-lg">
                    <cat.icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <h3 className="font-bold text-lg">{cat.category}</h3>
                </div>
                <p className="text-gray-400 text-sm mb-3">{cat.description}</p>
                <p className="text-xs text-amber-400">{cat.attractions.join(' • ')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Itineraries */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">📋 Suggested Itineraries</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {itineraries.map((itin) => (
              <div key={itin.title} className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-xl p-5">
                <h3 className="font-bold text-lg text-amber-400 mb-4">{itin.title}</h3>
                <ul className="space-y-2">
                  {itin.attractions.map((item, i) => (
                    <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                      <span className="text-amber-400">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Places to Visit', href: '/guides/places-to-visit', emoji: '🗺️' },
              { title: 'Free Things to Do', href: '/guides/free-things-to-do', emoji: '🆓' },
              { title: 'Best Hotels', href: '/guides/hotels', emoji: '🏨' },
              { title: 'Things to Do', href: '/guides/things-to-do', emoji: '🎯' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group"
              >
                <span className="text-2xl mb-2 block">{guide.emoji}</span>
                <span className="font-medium group-hover:text-amber-400 transition-colors">
                  {guide.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {[
              {
                q: 'What are the top tourist attractions in Bahrain?',
                a: 'The top attractions include Bahrain Fort (UNESCO site), Al Fateh Grand Mosque, Bahrain National Museum, Tree of Life, and the Muharraq Heritage Trail. These offer a mix of ancient history, culture, and unique experiences.',
              },
              {
                q: 'Are there free tourist attractions in Bahrain?',
                a: 'Yes! Many attractions are free including Bahrain Fort (fort grounds), Al Fateh Mosque, Tree of Life, Manama Souq, Muharraq Heritage Trail, and public beaches like Marassi Beach.',
              },
              {
                q: 'How many UNESCO sites are in Bahrain?',
                a: 'Bahrain has 3 UNESCO World Heritage Sites: Qal\'at al-Bahrain (Bahrain Fort), the Pearling Path in Muharraq, and the Dilmun Burial Mounds.',
              },
              {
                q: 'What is the best time to visit Bahrain\'s tourist attractions?',
                a: 'Visit outdoor attractions in the cooler months (October-April) or early morning/late afternoon in summer. Indoor museums can be enjoyed year-round. Sunset at Bahrain Fort is particularly special.',
              },
            ].map((faq, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6">
                <h3 className="font-bold mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Plan Your Visit</h2>
          <p className="text-gray-300 mb-8">
            Browse all attractions or find out what&apos;s happening during your trip.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/attractions"
              className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg transition-colors"
            >
              All Attractions
            </Link>
            <Link 
              href="/events"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              View Events
            </Link>
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Bahrain Tourist Attractions 2025',
            description: 'Complete guide to Bahrain\'s tourist attractions including UNESCO sites, museums, and landmarks.',
            author: {
              '@type': 'Organization',
              name: 'BahrainNights',
              url: 'https://bahrainnights.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'BahrainNights',
            },
            datePublished: '2025-01-26',
            dateModified: lastUpdated,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://bahrainnights.com/guides/tourist-attractions',
            },
          }),
        }}
      />
      
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What are the top tourist attractions in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The top attractions include Bahrain Fort (UNESCO site), Al Fateh Grand Mosque, Bahrain National Museum, Tree of Life, and the Muharraq Heritage Trail.',
                },
              },
              {
                '@type': 'Question',
                name: 'Are there free tourist attractions in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! Many attractions are free including Bahrain Fort, Al Fateh Mosque, Tree of Life, Manama Souq, Muharraq Heritage Trail, and public beaches.',
                },
              },
              {
                '@type': 'Question',
                name: 'How many UNESCO sites are in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Bahrain has 3 UNESCO World Heritage Sites: Qal\'at al-Bahrain, the Pearling Path in Muharraq, and the Dilmun Burial Mounds.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the best time to visit Bahrain\'s tourist attractions?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Visit outdoor attractions in the cooler months (October-April) or early morning/late afternoon in summer. Indoor museums can be enjoyed year-round.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
