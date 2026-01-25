import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Camera, Landmark, Waves, Building2, TreePalm,
  Star, ArrowRight, Clock, Car, Compass, Sun
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Best Places to Visit in Bahrain 2026 | Top Attractions & Landmarks',
  description: 'Discover the best places to visit in Bahrain! Explore UNESCO heritage sites, stunning beaches, modern attractions, and hidden gems. Your complete Bahrain sightseeing guide.',
  keywords: 'places to visit in Bahrain, Bahrain attractions, Bahrain landmarks, best places Bahrain, Bahrain sightseeing, visit Bahrain, Bahrain tourist spots, Bahrain must see',
  openGraph: {
    title: 'Best Places to Visit in Bahrain 2026 | Top Attractions & Landmarks',
    description: 'Your complete guide to the best places to visit in Bahrain - from ancient forts to modern marvels.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/places-to-visit',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/places-to-visit',
  },
};

const mustSeeAttractions = [
  {
    name: 'Bahrain Fort (Qal\'at al-Bahrain)',
    category: 'UNESCO Heritage',
    description: 'A UNESCO World Heritage site dating back to 2300 BC. This ancient harbor fort tells the story of 4,000 years of continuous human occupation.',
    location: 'Karbabad',
    visitTime: '2-3 hours',
    bestTime: 'Sunset for stunning views',
    entryFee: 'Free',
    highlights: ['Archaeological museum', 'Sea views', 'Ancient ruins', 'Sunset spot'],
    image: '🏰',
  },
  {
    name: 'Bahrain National Museum',
    category: 'Museum',
    description: 'The largest and oldest museum in Bahrain showcasing 6,000 years of history. Features Dilmun burial mounds, traditional crafts, and natural history.',
    location: 'Manama Corniche',
    visitTime: '2-3 hours',
    bestTime: 'Morning',
    entryFee: 'BD 1',
    highlights: ['Dilmun artifacts', 'Traditional crafts', 'Burial mound replicas', 'Art galleries'],
    image: '🏛️',
  },
  {
    name: 'Al Fateh Grand Mosque',
    category: 'Religious Site',
    description: 'One of the largest mosques in the world, capable of holding 7,000 worshippers. Features stunning Italian marble, Austrian chandeliers, and Indian teak doors.',
    location: 'Juffair',
    visitTime: '1 hour',
    bestTime: 'Saturday-Thursday mornings',
    entryFee: 'Free',
    highlights: ['Guided tours available', 'Beautiful architecture', 'Library', 'Traditional dress provided'],
    image: '🕌',
  },
  {
    name: 'Tree of Life',
    category: 'Natural Wonder',
    description: 'A mysterious 400-year-old mesquite tree thriving alone in the desert with no apparent water source. A symbol of resilience and one of Bahrain\'s most famous landmarks.',
    location: 'Southern Desert',
    visitTime: '30-45 minutes',
    bestTime: 'Early morning or sunset',
    entryFee: 'Free',
    highlights: ['Photo opportunity', 'Desert landscape', 'Nearby oil fields', 'Mysterious origin'],
    image: '🌳',
  },
  {
    name: 'Manama Souq',
    category: 'Traditional Market',
    description: 'Bahrain\'s oldest and most atmospheric market. Wander through narrow alleys filled with gold, spices, textiles, and traditional handicrafts.',
    location: 'Old Manama',
    visitTime: '2-4 hours',
    bestTime: 'Evening',
    entryFee: 'Free',
    highlights: ['Gold souq', 'Spice market', 'Textile shops', 'Street food'],
    image: '🏪',
  },
  {
    name: 'Bahrain World Trade Center',
    category: 'Modern Architecture',
    description: 'Iconic twin towers connected by three wind turbines. A symbol of Bahrain\'s modernization and commitment to sustainable energy.',
    location: 'Manama',
    visitTime: '30 minutes exterior',
    bestTime: 'Any time',
    entryFee: 'Free (exterior)',
    highlights: ['Wind turbines', 'Photo spot', 'Shopping mall', 'Restaurants'],
    image: '🏢',
  },
];

const beachesAndIslands = [
  {
    name: 'Al Dar Islands',
    description: 'Private island resort with pristine beaches, water sports, and pearl diving experiences.',
    bestFor: 'Day trips, swimming, pearl diving',
    access: 'Boat from Sitra',
  },
  {
    name: 'Amwaj Islands',
    description: 'Man-made islands with beach clubs, restaurants, and luxury living.',
    bestFor: 'Beach clubs, dining, sunset views',
    access: 'Drive or taxi',
  },
  {
    name: 'Coral Bay',
    description: 'Popular beach resort with a private beach, pools, and water sports.',
    bestFor: 'Families, beach parties, brunches',
    access: 'Drive or taxi',
  },
  {
    name: 'Marassi Beach',
    description: 'Upscale beach destination in Diyar Al Muharraq with crystal-clear waters.',
    bestFor: 'Swimming, dining, photography',
    access: 'Drive or taxi',
  },
];

const hiddenGems = [
  {
    name: 'A\'ali Burial Mounds',
    description: 'UNESCO World Heritage site with thousands of burial mounds from the Dilmun civilization.',
    tip: 'Best visited with a guide for historical context',
  },
  {
    name: 'Beit Al Quran',
    description: 'Museum dedicated to Islamic calligraphy and rare Quran manuscripts.',
    tip: 'Peaceful spot for art and history lovers',
  },
  {
    name: 'Oil Museum',
    description: 'Learn about Bahrain\'s first oil well (1932) and the industry that transformed the nation.',
    tip: 'Combine with Tree of Life visit',
  },
  {
    name: 'Pearl Trail',
    description: 'UNESCO-listed heritage trail showing traditional pearl diving industry sites.',
    tip: 'Start at Muharraq for the full experience',
  },
  {
    name: 'Arad Fort',
    description: 'Beautifully restored 15th-century fort, especially magical when illuminated at night.',
    tip: 'Visit after sunset for night photography',
  },
  {
    name: 'Block 338 Adliya',
    description: 'Artsy neighborhood with galleries, cafes, and street art.',
    tip: 'Best explored on foot in the evening',
  },
];

const itineraries = [
  {
    title: '1 Day in Bahrain',
    emoji: '⚡',
    stops: [
      'Morning: Bahrain Fort & Museum',
      'Lunch: Manama Souq',
      'Afternoon: Al Fateh Mosque',
      'Evening: Adliya dining & nightlife',
    ],
  },
  {
    title: '3 Days in Bahrain',
    emoji: '🗓️',
    stops: [
      'Day 1: Manama highlights (Fort, Museum, Souq)',
      'Day 2: Beach day at Amwaj + Muharraq Pearl Trail',
      'Day 3: Tree of Life, Oil Museum, F1 track visit',
    ],
  },
  {
    title: 'Family Itinerary',
    emoji: '👨‍👩‍👧‍👦',
    stops: [
      'Lost Paradise of Dilmun (Waterpark)',
      'Bahrain Zoo',
      'Al Dar Islands boat trip',
      'Magic Island or Gravity',
    ],
  },
];

export default function PlacesToVisitPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Places to Visit', url: 'https://www.bahrainnights.com/guides/places-to-visit' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium mb-4">
              🗺️ Sightseeing Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best Places to Visit in{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
                Bahrain
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From ancient UNESCO heritage sites to stunning modern architecture — discover the 
              best attractions and landmarks that make Bahrain a unique destination.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'UNESCO Sites', value: '3', icon: Landmark },
              { label: 'Museums', value: '15+', icon: Building2 },
              { label: 'Beaches', value: '10+', icon: Waves },
              { label: 'Historic Sites', value: '25+', icon: Camera },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-emerald-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Must-See Attractions */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Must-See Attractions</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            These are the essential places every visitor to Bahrain should experience.
          </p>
          
          <div className="space-y-6">
            {mustSeeAttractions.map((attraction) => (
              <div 
                key={attraction.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="text-6xl md:w-24 text-center">{attraction.image}</div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{attraction.name}</h3>
                      <span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded">
                        {attraction.category}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-4">{attraction.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                      <div>
                        <span className="text-gray-500">📍 Location:</span>
                        <span className="text-white ml-1">{attraction.location}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">⏱️ Duration:</span>
                        <span className="text-white ml-1">{attraction.visitTime}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">🌅 Best Time:</span>
                        <span className="text-white ml-1">{attraction.bestTime}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">💰 Entry:</span>
                        <span className="text-white ml-1">{attraction.entryFee}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {attraction.highlights.map((h) => (
                        <span key={h} className="text-xs bg-white/10 px-2 py-1 rounded">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beaches & Islands */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">
            <Waves className="inline w-8 h-8 mr-2 text-cyan-400" />
            Beaches & Islands
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Bahrain is surrounded by beautiful waters. Here are the best beach destinations.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {beachesAndIslands.map((beach) => (
              <div key={beach.name} className="bg-white/5 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2 text-cyan-400">{beach.name}</h3>
                <p className="text-gray-300 mb-4">{beach.description}</p>
                <div className="text-sm space-y-1">
                  <p><strong className="text-gray-400">Best for:</strong> {beach.bestFor}</p>
                  <p><strong className="text-gray-400">Access:</strong> {beach.access}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hidden Gems */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">
            <Compass className="inline w-8 h-8 mr-2 text-amber-400" />
            Hidden Gems
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Beyond the tourist trail — lesser-known places that locals love.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hiddenGems.map((gem) => (
              <div key={gem.name} className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-xl p-5">
                <h3 className="font-bold mb-2">{gem.name}</h3>
                <p className="text-sm text-gray-300 mb-3">{gem.description}</p>
                <p className="text-xs text-amber-400 italic">💡 {gem.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Suggested Itineraries */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Suggested Itineraries</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {itineraries.map((itinerary) => (
              <div key={itinerary.title} className="bg-white/5 rounded-xl p-6">
                <div className="text-3xl mb-2">{itinerary.emoji}</div>
                <h3 className="text-lg font-bold mb-4 text-emerald-400">{itinerary.title}</h3>
                <ul className="space-y-2">
                  {itinerary.stops.map((stop, i) => (
                    <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">•</span>
                      {stop}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practical Tips */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Practical Tips</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Sun className="w-5 h-5 text-yellow-400" />
                Best Time to Visit
              </h3>
              <p className="text-gray-300 mb-4">
                <strong>October to April</strong> offers the best weather for sightseeing (20-28°C). 
                Summer months (June-September) can exceed 40°C.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• <strong>November-February:</strong> Peak season, perfect weather</li>
                <li>• <strong>March-April:</strong> Warm but pleasant, F1 season</li>
                <li>• <strong>May-September:</strong> Very hot, indoor activities recommended</li>
              </ul>
            </div>
            
            <div className="bg-white/5 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Car className="w-5 h-5 text-blue-400" />
                Getting Around
              </h3>
              <p className="text-gray-300 mb-4">
                Bahrain is small and easy to navigate. Most attractions are within 30 minutes of Manama.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• <strong>Taxis:</strong> Affordable and air-conditioned</li>
                <li>• <strong>Uber/Careem:</strong> Convenient and reliable</li>
                <li>• <strong>Car Rental:</strong> Best for flexibility (from BD 15/day)</li>
                <li>• <strong>Guided Tours:</strong> Available for key attractions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore?</h2>
          <p className="text-gray-300 mb-8">
            Plan your Bahrain adventure with our complete guides and event listings.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/attractions"
              className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-lg transition-colors"
            >
              Browse All Attractions
            </Link>
            <Link 
              href="/guides/things-to-do"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              Things to Do Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Things to Do in Bahrain', href: '/guides/things-to-do', emoji: '🎯' },
              { title: 'Nightlife Guide', href: '/guides/nightlife', emoji: '🌙' },
              { title: 'Family Activities', href: '/family-kids', emoji: '👨‍👩‍👧‍👦' },
              { title: 'Beach Clubs', href: '/guides/beach-clubs', emoji: '🏖️' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group"
              >
                <span className="text-2xl mb-2 block">{guide.emoji}</span>
                <span className="font-medium group-hover:text-emerald-400 transition-colors">
                  {guide.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section for Schema */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {[
              {
                q: 'What are the must-see places in Bahrain?',
                a: 'The top places to visit in Bahrain include Bahrain Fort (UNESCO site), Bahrain National Museum, Al Fateh Grand Mosque, the Tree of Life, and Manama Souq. These offer a mix of history, culture, and unique experiences.',
              },
              {
                q: 'How many days do I need to explore Bahrain?',
                a: '3-4 days is ideal to see the main attractions. You can cover the highlights in 2 days, but a longer stay allows you to enjoy beaches, dining, and day trips to Al Dar Islands.',
              },
              {
                q: 'Is Bahrain safe for tourists?',
                a: 'Yes, Bahrain is one of the safest countries in the Middle East for tourists. It has low crime rates, friendly locals, and a welcoming attitude toward visitors.',
              },
              {
                q: 'What is the best time to visit Bahrain?',
                a: 'The best time to visit is October to April when temperatures are pleasant (20-28°C). Avoid summer months (June-September) when temperatures can exceed 40°C.',
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

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Best Places to Visit in Bahrain 2026',
            description: 'Complete guide to the best places to visit in Bahrain including UNESCO sites, beaches, museums, and hidden gems.',
            author: {
              '@type': 'Organization',
              name: 'BahrainNights',
              url: 'https://bahrainnights.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'BahrainNights',
              logo: {
                '@type': 'ImageObject',
                url: 'https://bahrainnights.com/logo.png',
              },
            },
            datePublished: '2026-01-26',
            dateModified: lastUpdated,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://bahrainnights.com/guides/places-to-visit',
            },
            about: {
              '@type': 'Place',
              name: 'Bahrain',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'BH',
              },
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
                name: 'What are the must-see places in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The top places to visit in Bahrain include Bahrain Fort (UNESCO site), Bahrain National Museum, Al Fateh Grand Mosque, the Tree of Life, and Manama Souq. These offer a mix of history, culture, and unique experiences.',
                },
              },
              {
                '@type': 'Question',
                name: 'How many days do I need to explore Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '3-4 days is ideal to see the main attractions. You can cover the highlights in 2 days, but a longer stay allows you to enjoy beaches, dining, and day trips to Al Dar Islands.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is Bahrain safe for tourists?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, Bahrain is one of the safest countries in the Middle East for tourists. It has low crime rates, friendly locals, and a welcoming attitude toward visitors.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the best time to visit Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The best time to visit is October to April when temperatures are pleasant (20-28°C). Avoid summer months (June-September) when temperatures can exceed 40°C.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
