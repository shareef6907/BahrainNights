import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Coffee, Star, MapPin, Clock, Wifi,
  ArrowRight, Laptop, Cake, Leaf, Sparkles
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Best Cafes in Bahrain 2025 | Coffee Shops & Specialty Coffee',
  description: 'Discover the best cafes in Bahrain! From specialty coffee to Instagram-worthy spots, explore top coffee shops in Manama, Adliya, Seef. Complete cafe guide with reviews.',
  keywords: 'best cafes in Bahrain, coffee shops Bahrain, specialty coffee Bahrain, Bahrain cafes, Adliya cafes, Manama coffee, work-friendly cafes Bahrain',
  openGraph: {
    title: 'Best Cafes in Bahrain 2025 | Coffee Shops & Specialty Coffee',
    description: 'Your complete guide to the best cafes in Bahrain - specialty coffee, cozy spots, and Instagram-worthy coffee shops.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/cafes',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/cafes',
  },
};

const topCafes = [
  {
    name: 'Lilou Artisan Patisserie',
    location: 'Adliya',
    style: 'French patisserie',
    rating: 4.8,
    priceRange: '$$',
    description: 'The queen of Bahrain cafes. French-inspired patisserie with stunning pastries, excellent coffee, and a beautiful setting. Always busy, always worth it.',
    mustTry: ['Croissants', 'French pastries', 'Breakfast', 'Coffee'],
    vibe: 'Elegant, Instagram-worthy, brunch crowd',
    features: ['Great pastries', 'Outdoor seating', 'Breakfast menu'],
  },
  {
    name: 'Crust & Crema',
    location: 'Adliya & Seef',
    style: 'Specialty coffee',
    rating: 4.7,
    priceRange: '$$',
    description: 'Serious specialty coffee roasters with a focus on quality. Perfect for coffee enthusiasts who appreciate a well-made brew.',
    mustTry: ['Single origin pour-over', 'Flat white', 'Pastries'],
    vibe: 'Coffee-focused, minimalist, professionals',
    features: ['Specialty beans', 'Multiple locations', 'Roastery'],
  },
  {
    name: 'Costa Coffee',
    location: 'Multiple locations',
    style: 'Chain cafe',
    rating: 4.3,
    priceRange: '$',
    description: 'Reliable chain with consistent quality and free WiFi. Great for work sessions with its abundant locations across Bahrain.',
    mustTry: ['Flat white', 'Iced coffee', 'Toasties'],
    vibe: 'Casual, work-friendly, convenient',
    features: ['WiFi', 'Many locations', 'Reliable'],
  },
  {
    name: 'Verse Specialty Coffee',
    location: 'Manama',
    style: 'Third wave coffee',
    rating: 4.6,
    priceRange: '$$',
    description: 'Modern third wave coffee shop with carefully sourced beans and expert baristas. A haven for specialty coffee lovers.',
    mustTry: ['Cold brew', 'V60 pour-over', 'Espresso flights'],
    vibe: 'Hipster, minimalist, coffee nerds',
    features: ['Specialty focus', 'Expert baristas', 'Modern design'],
  },
  {
    name: 'Al Osra Supermarket Cafe',
    location: 'Gudaibiya',
    style: 'Local favorite',
    rating: 4.5,
    priceRange: '$',
    description: 'Unexpected gem inside a supermarket. Famous for fresh juices, affordable Arabic coffee, and great people-watching.',
    mustTry: ['Fresh juices', 'Arabic coffee', 'Date pastries'],
    vibe: 'Local, authentic, budget-friendly',
    features: ['Budget-friendly', 'Fresh juices', 'Local experience'],
  },
  {
    name: 'Block 338 Cafes',
    location: 'Adliya (Block 338)',
    style: 'Multiple options',
    rating: 4.5,
    priceRange: '$$',
    description: 'The hip block in Adliya has multiple cafe options including Lilou, galleries with coffee, and hidden gems.',
    mustTry: ['Walk around and explore'],
    vibe: 'Artsy, trendy, gallery vibes',
    features: ['Art galleries', 'Multiple options', 'Evening atmosphere'],
  },
  {
    name: 'Haji\'s Cafe',
    location: 'Various locations',
    style: 'Traditional Bahraini',
    rating: 4.6,
    priceRange: '$',
    description: 'Traditional Bahraini cafe serving authentic local food and drinks. Try the karak chai and traditional breakfast.',
    mustTry: ['Karak chai', 'Bahraini breakfast', 'Regag'],
    vibe: 'Traditional, local, authentic',
    features: ['Local experience', 'Traditional food', 'Affordable'],
  },
  {
    name: 'The Coffee Club',
    location: 'Multiple locations',
    style: 'Australian chain',
    rating: 4.4,
    priceRange: '$$',
    description: 'Australian chain with solid brunch menu and good coffee. Popular for all-day breakfast and work sessions.',
    mustTry: ['All-day breakfast', 'Flat white', 'Avocado toast'],
    vibe: 'Casual, brunch-focused, work-friendly',
    features: ['All-day breakfast', 'WiFi', 'Multiple locations'],
  },
];

const cafeAreas = [
  {
    area: 'Adliya',
    description: 'The cafe capital of Bahrain. Home to Lilou, Block 338, and numerous trendy spots.',
    bestFor: 'Brunch, Instagram spots, evening coffee',
    topPicks: ['Lilou', 'Crust & Crema', 'Coco\'s'],
  },
  {
    area: 'Seef',
    description: 'Mall-based cafes and chains. Convenient but less character.',
    bestFor: 'Shopping breaks, convenience, families',
    topPicks: ['Seef Mall options', 'Costa', 'Starbucks'],
  },
  {
    area: 'Manama',
    description: 'Mix of traditional cafes and modern specialty spots.',
    bestFor: 'Specialty coffee, local experience, business meetings',
    topPicks: ['Verse Coffee', 'Hotel cafes', 'Traditional spots'],
  },
  {
    area: 'Juffair',
    description: 'International chains and hotel cafes. Good for late-night options.',
    bestFor: 'Late nights, convenience, expat area',
    topPicks: ['Oasis Mall cafes', 'Hotel lobbies'],
  },
];

const workFriendly = [
  {
    name: 'Costa Coffee',
    location: 'Multiple',
    why: 'Free WiFi, power outlets, consistent experience',
    hours: 'Varies by location',
  },
  {
    name: 'The Coffee Club',
    location: 'Multiple',
    why: 'Spacious, WiFi, good food for long sessions',
    hours: '7 AM - 11 PM',
  },
  {
    name: 'Starbucks',
    location: 'Multiple',
    why: 'Reliable WiFi, familiar setup, many locations',
    hours: 'Varies',
  },
  {
    name: 'Hotel Lobbies',
    location: 'Various',
    why: 'Professional setting, great WiFi, quiet',
    hours: '24 hours (lobby cafes)',
  },
];

const cafeTypes = [
  {
    type: 'Specialty Coffee',
    description: 'Third-wave coffee shops with single-origin beans and expert brewing',
    picks: ['Crust & Crema', 'Verse', 'Local roasters'],
    icon: Coffee,
  },
  {
    type: 'Patisserie & Brunch',
    description: 'Beautiful pastries, French vibes, and Instagram-worthy spots',
    picks: ['Lilou', 'Paul', 'The Orangery'],
    icon: Cake,
  },
  {
    type: 'Traditional Bahraini',
    description: 'Authentic local cafes with karak chai and local snacks',
    picks: ['Haji\'s Cafe', 'Al Osra', 'Local cafeterias'],
    icon: Leaf,
  },
  {
    type: 'Work-Friendly',
    description: 'WiFi, power outlets, and a productive atmosphere',
    picks: ['Costa', 'Starbucks', 'Coffee Club'],
    icon: Laptop,
  },
];

export default function CafesGuidePage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-amber-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Cafes', url: 'https://www.bahrainnights.com/guides/cafes' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-4">
              ☕ Cafe Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Cafes
              </span>
              {' '}in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From French patisseries to specialty coffee roasters, Bahrain&apos;s cafe scene has 
              something for everyone. Whether you&apos;re looking for the perfect Instagram shot 
              or a quiet place to work, here&apos;s your guide to the best coffee spots.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Cafes', value: '200+', icon: Coffee },
              { label: 'Specialty', value: '20+', icon: Sparkles },
              { label: 'Best Area', value: 'Adliya', icon: MapPin },
              { label: 'Avg Price', value: 'BD 3-5', icon: Star },
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

      {/* Top Cafes */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Top Cafes</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Our handpicked selection of the best cafes in Bahrain.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {topCafes.map((cafe) => (
              <div 
                key={cafe.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold">{cafe.name}</h3>
                    <p className="text-amber-400 text-sm">{cafe.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="w-4 h-4 fill-yellow-400" />
                      <span className="font-bold">{cafe.rating}</span>
                    </div>
                    <span className="text-xs text-gray-400">{cafe.priceRange}</span>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 italic mb-2">{cafe.style}</p>
                <p className="text-gray-300 text-sm mb-4">{cafe.description}</p>
                
                <div className="mb-3">
                  <span className="text-xs text-amber-400">Must try: </span>
                  <span className="text-xs text-gray-400">{cafe.mustTry.join(', ')}</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {cafe.features.map((f) => (
                    <span key={f} className="px-2 py-1 bg-amber-500/20 text-amber-300 text-xs rounded">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cafe Types */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">By Vibe</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cafeTypes.map((type) => (
              <div key={type.type} className="bg-white/5 rounded-xl p-5">
                <type.icon className="w-8 h-8 text-amber-400 mb-3" />
                <h3 className="font-bold text-lg mb-2">{type.type}</h3>
                <p className="text-gray-400 text-sm mb-3">{type.description}</p>
                <p className="text-xs text-amber-400">{type.picks.join(' • ')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By Area */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">By Area</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {cafeAreas.map((area) => (
              <div key={area.area} className="bg-white/5 rounded-2xl p-6">
                <h3 className="font-bold text-xl text-amber-400 mb-2">{area.area}</h3>
                <p className="text-gray-300 text-sm mb-3">{area.description}</p>
                <p className="text-xs text-gray-400 mb-2">Best for: {area.bestFor}</p>
                <p className="text-xs text-amber-400">Top picks: {area.topPicks.join(', ')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work-Friendly */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">💻 Best for Working</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Need WiFi and a productive atmosphere? These spots are laptop-friendly.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {workFriendly.map((cafe) => (
              <div key={cafe.name} className="bg-white/5 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Wifi className="w-4 h-4 text-green-400" />
                  <h3 className="font-bold">{cafe.name}</h3>
                </div>
                <p className="text-xs text-gray-400 mb-2">{cafe.location}</p>
                <p className="text-sm text-gray-300 mb-2">{cafe.why}</p>
                <p className="text-xs text-amber-400">{cafe.hours}</p>
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
              { title: 'Best Restaurants', href: '/guides/restaurants', emoji: '🍽️' },
              { title: 'Best Brunch', href: '/guides/brunch', emoji: '🥂' },
              { title: 'Shisha Lounges', href: '/guides/shisha', emoji: '💨' },
              { title: 'Nightlife Adliya', href: '/guides/nightlife-adliya', emoji: '🌙' },
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
                q: 'What are the best cafes in Bahrain?',
                a: 'Lilou in Adliya is widely considered the best for pastries and atmosphere. For specialty coffee, try Crust & Crema or Verse. For a local experience, visit Haji\'s Cafe for karak chai.',
              },
              {
                q: 'Where can I find specialty coffee in Bahrain?',
                a: 'The best specialty coffee shops include Crust & Crema (Adliya and Seef), Verse Specialty Coffee (Manama), and various local roasters. These offer single-origin beans and expert brewing methods.',
              },
              {
                q: 'Which cafes in Bahrain have good WiFi for working?',
                a: 'Costa Coffee, Starbucks, and The Coffee Club offer reliable WiFi across multiple locations. Hotel lobby cafes are also excellent for productive work sessions with quiet atmospheres.',
              },
              {
                q: 'What is the best area for cafes in Bahrain?',
                a: 'Adliya is the cafe capital of Bahrain, home to Lilou, Block 338, and numerous trendy spots. It\'s the best area for cafe hopping, especially in the evenings.',
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
          <h2 className="text-3xl font-bold mb-4">Time for Coffee</h2>
          <p className="text-gray-300 mb-8">
            Explore our restaurant guide or check what&apos;s happening this weekend.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/restaurants"
              className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg transition-colors"
            >
              Restaurant Guide
            </Link>
            <Link 
              href="/places"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              All Venues
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
            headline: 'Best Cafes in Bahrain 2025',
            description: 'Complete guide to the best cafes in Bahrain including specialty coffee, patisseries, and work-friendly spots.',
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
              '@id': 'https://bahrainnights.com/guides/cafes',
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
                name: 'What are the best cafes in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Lilou in Adliya is widely considered the best for pastries and atmosphere. For specialty coffee, try Crust & Crema or Verse. For a local experience, visit Haji\'s Cafe.',
                },
              },
              {
                '@type': 'Question',
                name: 'Where can I find specialty coffee in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The best specialty coffee shops include Crust & Crema (Adliya and Seef), Verse Specialty Coffee (Manama), and various local roasters.',
                },
              },
              {
                '@type': 'Question',
                name: 'Which cafes in Bahrain have good WiFi for working?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Costa Coffee, Starbucks, and The Coffee Club offer reliable WiFi across multiple locations. Hotel lobby cafes are also excellent for work.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the best area for cafes in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Adliya is the cafe capital of Bahrain, home to Lilou, Block 338, and numerous trendy spots. It\'s the best area for cafe hopping.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
