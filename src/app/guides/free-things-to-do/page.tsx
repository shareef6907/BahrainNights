import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Wallet, Star, MapPin, Clock, Sun,
  ArrowRight, Building, Waves, TreePalm, Camera, Mountain
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Free Things to Do in Bahrain 2025 | Budget-Friendly Activities',
  description: 'Discover free things to do in Bahrain! From UNESCO sites to beautiful beaches, explore the best free attractions and activities. Complete budget guide for Bahrain.',
  keywords: 'free things to do in Bahrain, free activities Bahrain, budget Bahrain, cheap things to do Bahrain, free attractions Bahrain, Bahrain on a budget',
  openGraph: {
    title: 'Free Things to Do in Bahrain 2025 | Budget-Friendly Activities',
    description: 'Your complete guide to free activities in Bahrain - beaches, heritage sites, parks, and more.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/free-things-to-do',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/free-things-to-do',
  },
};

const freeAttractions = [
  {
    name: 'Bahrain Fort (Qal\'at al-Bahrain)',
    location: 'Karbabad',
    type: 'UNESCO Heritage Site',
    bestTime: 'Sunset',
    description: 'A 4,000-year-old UNESCO World Heritage Site overlooking the sea. Explore ancient ruins, climb the Portuguese-era fort, and enjoy stunning sunset views. The on-site museum is only BD 0.5.',
    highlights: ['UNESCO site', 'Free entry to fort', 'Sea views', 'Archaeological excavations'],
    tip: 'Visit at golden hour for incredible photos. Bring water and comfortable shoes.',
  },
  {
    name: 'Al Fateh Grand Mosque',
    location: 'Juffair',
    type: 'Religious Site',
    bestTime: 'Morning (outside prayer times)',
    description: 'One of the largest mosques in the world, featuring stunning Italian marble, Austrian chandeliers, and a library. Free guided tours available for non-Muslims.',
    highlights: ['Guided tours', 'Islamic library', 'Beautiful architecture', 'Dress code applies'],
    tip: 'Dress modestly. Women will be provided abayas at entrance. Tours in English available.',
  },
  {
    name: 'Tree of Life',
    location: 'Southern Desert',
    type: 'Natural Wonder',
    bestTime: 'Late afternoon',
    description: 'A 400-year-old mesquite tree thriving alone in the desert with no visible water source. A mysterious landmark and popular photo spot.',
    highlights: ['400 years old', 'Desert scenery', 'Unique phenomenon', 'Instagram worthy'],
    tip: 'Combine with a visit to the oil museum nearby. Best in cooler months or late afternoon.',
  },
  {
    name: 'Manama Souq',
    location: 'Central Manama',
    type: 'Traditional Market',
    bestTime: 'Evening (after 5 PM)',
    description: 'Wander through Bahrain\'s oldest market with narrow alleys selling everything from gold to spices. Great for photography and soaking up local culture.',
    highlights: ['Gold Souq', 'Spice Souq', 'Traditional shops', 'Local atmosphere'],
    tip: 'Explore Bab Al Bahrain gate and surrounding area. Haggling expected at some shops.',
  },
  {
    name: 'Muharraq Heritage Trail',
    location: 'Muharraq Island',
    type: 'Cultural Walk',
    bestTime: 'Morning or late afternoon',
    description: 'A UNESCO-listed walking trail through traditional Bahraini houses, pearl merchant homes, and restored heritage buildings. Completely free to explore.',
    highlights: ['UNESCO pearling path', 'Traditional architecture', 'Cultural insights', 'Photo opportunities'],
    tip: 'Start at Sheikh Isa bin Ali House (small entry fee) then explore free areas.',
  },
  {
    name: 'Marassi Beach',
    location: 'Diyar Al Muharraq',
    type: 'Public Beach',
    bestTime: 'Early morning or late afternoon',
    description: 'A clean, well-maintained public beach with facilities. Free access to the sandy beach and promenade. Perfect for swimming, walking, or watching sunset.',
    highlights: ['Free beach access', 'Clean facilities', 'Promenade', 'Food nearby'],
    tip: 'Gets busy on weekends. Bring your own umbrella and supplies.',
  },
];

const freeBeaches = [
  {
    name: 'Marassi Beach',
    location: 'Diyar Al Muharraq',
    features: 'Sandy beach, clean water, promenade, nearby cafes',
    best_for: 'Families, swimming, sunsets',
  },
  {
    name: 'Jarada Island Beach',
    location: 'Near Budaiya',
    features: 'Local beach, quieter atmosphere, basic facilities',
    best_for: 'Locals, quiet time',
  },
  {
    name: 'Amwaj Beach',
    location: 'Amwaj Islands',
    features: 'Marina views, walking paths, restaurants nearby',
    best_for: 'Walking, dining, photography',
  },
  {
    name: 'Budaiya Beach',
    location: 'Northern Bahrain',
    features: 'Long stretch of sand, local vibe, less touristy',
    best_for: 'Quiet beach day, local experience',
  },
];

const freeParks = [
  {
    name: 'Prince Khalifa bin Salman Park',
    location: 'Hidd',
    description: 'Large green park with walking trails, playgrounds, and beautiful landscaping. Popular with families.',
    features: ['Walking trails', 'Playgrounds', 'Gardens', 'Exercise areas'],
  },
  {
    name: 'Al Areen Garden',
    location: 'Near Al Areen',
    description: 'Botanical gardens adjacent to the wildlife park. Pleasant walking area with plants and shade.',
    features: ['Gardens', 'Shaded areas', 'Walking paths'],
  },
  {
    name: 'Hunainiyah Park',
    location: 'Hunainiyah',
    description: 'Neighborhood park with playgrounds, walking tracks, and green spaces.',
    features: ['Playgrounds', 'Jogging track', 'Picnic areas'],
  },
];

const culturalFree = [
  {
    name: 'Bab Al Bahrain',
    description: 'Historic gateway to Manama Souq. A beautiful landmark and photo opportunity.',
    location: 'Central Manama',
  },
  {
    name: 'Pearl Roundabout Memorial',
    description: 'Iconic sculpture and roundabout, now rebuilt. Drive by for photos.',
    location: 'Manama',
  },
  {
    name: 'Friday Fish Market',
    description: 'Watch the morning fish auction at Manama Central Market. Lively local experience.',
    location: 'Manama Souq',
  },
  {
    name: 'Sunset at Bahrain Bay',
    description: 'Walk along the waterfront promenade with views of the skyline. Free and beautiful.',
    location: 'Bahrain Bay',
  },
];

const budgetTips = [
  {
    title: 'Visit on Weekdays',
    tip: 'Museums with small fees are less crowded. Some attractions offer weekday discounts.',
  },
  {
    title: 'Bring Your Own',
    tip: 'Pack water, snacks, and sunscreen. Beach trips and desert visits don\'t need expensive supplies.',
  },
  {
    title: 'Walk the Heritage Trails',
    tip: 'Muharraq and Manama have free walking trails. Better than organized tours.',
  },
  {
    title: 'Sunset Is Free',
    tip: 'Bahrain Fort, beaches, and Bahrain Bay all offer stunning free sunset views.',
  },
  {
    title: 'Shop Smart',
    tip: 'Traditional souqs are fun to browse without buying. Just enjoy the atmosphere.',
  },
  {
    title: 'Free Friday Tours',
    tip: 'Al Fateh Mosque offers free guided tours on certain days - check schedules.',
  },
];

export default function FreeThingsToDoPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-green-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Free Things to Do', url: 'https://www.bahrainnights.com/guides/free-things-to-do' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium mb-4">
              💰 Budget Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Free{' '}
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                Things to Do
              </span>
              {' '}in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              You don&apos;t need to spend a fortune to enjoy Bahrain. From UNESCO World Heritage Sites 
              to beautiful beaches, discover the best free activities and attractions in the Kingdom.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Free Attractions', value: '15+', icon: Building },
              { label: 'Public Beaches', value: '5+', icon: Waves },
              { label: 'Parks & Gardens', value: '10+', icon: TreePalm },
              { label: 'Heritage Sites', value: '8+', icon: Camera },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-green-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Free Attractions */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Top Free Attractions</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Bahrain&apos;s best experiences that won&apos;t cost you anything.
          </p>
          
          <div className="space-y-6">
            {freeAttractions.map((attraction) => (
              <div 
                key={attraction.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-green-400">{attraction.name}</h3>
                      <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded font-medium">
                        FREE
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> {attraction.location}
                      </span>
                      <span>•</span>
                      <span>{attraction.type}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Sun className="w-4 h-4" /> Best: {attraction.bestTime}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-4">{attraction.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {attraction.highlights.map((h) => (
                        <span key={h} className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded">
                          {h}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-amber-400 italic">💡 Tip: {attraction.tip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Beaches */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">🏖️ Free Beaches</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {freeBeaches.map((beach) => (
              <div key={beach.name} className="bg-white/5 rounded-2xl p-6">
                <h3 className="font-bold text-lg text-cyan-400">{beach.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{beach.location}</p>
                <p className="text-gray-300 text-sm mb-3">{beach.features}</p>
                <p className="text-xs text-green-400">Best for: {beach.best_for}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Parks */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">🌳 Parks & Gardens</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {freeParks.map((park) => (
              <div key={park.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-lg mb-2">{park.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{park.location}</p>
                <p className="text-gray-300 text-sm mb-3">{park.description}</p>
                <div className="flex flex-wrap gap-2">
                  {park.features.map((f) => (
                    <span key={f} className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cultural Free */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">🏛️ Cultural Experiences</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {culturalFree.map((item) => (
              <div key={item.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-lg text-green-400">{item.name}</h3>
                <p className="text-sm text-gray-400 mb-2">{item.location}</p>
                <p className="text-gray-300 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Budget Tips */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">💡 Budget Tips</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {budgetTips.map((item) => (
              <div key={item.title} className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-5">
                <h3 className="font-bold text-green-400 mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Family Activities', href: '/guides/family-activities', emoji: '👨‍👩‍👧‍👦' },
              { title: 'Places to Visit', href: '/guides/places-to-visit', emoji: '🗺️' },
              { title: 'Beach Clubs', href: '/guides/beach-clubs', emoji: '🏖️' },
              { title: 'Things to Do', href: '/guides/things-to-do', emoji: '🎯' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group"
              >
                <span className="text-2xl mb-2 block">{guide.emoji}</span>
                <span className="font-medium group-hover:text-green-400 transition-colors">
                  {guide.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {[
              {
                q: 'What are the best free things to do in Bahrain?',
                a: 'The best free activities include visiting Bahrain Fort (UNESCO site), Al Fateh Grand Mosque with free tours, Marassi Beach, the Tree of Life, and exploring Manama Souq. All offer incredible experiences at no cost.',
              },
              {
                q: 'Are there free beaches in Bahrain?',
                a: 'Yes! Marassi Beach in Diyar Al Muharraq is the most popular free public beach with good facilities. Budaiya Beach and Amwaj Beach areas also offer free access to the waterfront.',
              },
              {
                q: 'Can you visit Bahrain on a budget?',
                a: 'Absolutely! Bahrain has many free attractions including UNESCO sites, beaches, parks, and cultural landmarks. Museums have low fees (BD 1-2), and local food is affordable.',
              },
              {
                q: 'Is Al Fateh Mosque free to visit?',
                a: 'Yes, Al Fateh Grand Mosque offers free guided tours for visitors. Tours are available outside of prayer times. Dress modestly, and women will be provided with abayas at the entrance.',
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
      <section className="py-16 px-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore Bahrain for Free</h2>
          <p className="text-gray-300 mb-8">
            Check out our attractions guide or see what&apos;s happening this weekend.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/attractions"
              className="px-8 py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded-lg transition-colors"
            >
              All Attractions
            </Link>
            <Link 
              href="/events/this-weekend"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              This Weekend
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
            headline: 'Free Things to Do in Bahrain 2025',
            description: 'Complete guide to free activities and attractions in Bahrain including beaches, heritage sites, and parks.',
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
              '@id': 'https://bahrainnights.com/guides/free-things-to-do',
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
                name: 'What are the best free things to do in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The best free activities include visiting Bahrain Fort (UNESCO site), Al Fateh Grand Mosque with free tours, Marassi Beach, the Tree of Life, and exploring Manama Souq.',
                },
              },
              {
                '@type': 'Question',
                name: 'Are there free beaches in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! Marassi Beach in Diyar Al Muharraq is the most popular free public beach with good facilities. Budaiya Beach and Amwaj Beach areas also offer free access.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can you visit Bahrain on a budget?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Absolutely! Bahrain has many free attractions including UNESCO sites, beaches, parks, and cultural landmarks. Museums have low fees (BD 1-2).',
                },
              },
              {
                '@type': 'Question',
                name: 'Is Al Fateh Mosque free to visit?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, Al Fateh Grand Mosque offers free guided tours for visitors outside of prayer times. Women will be provided with abayas at the entrance.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
