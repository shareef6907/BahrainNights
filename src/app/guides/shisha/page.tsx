import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Wind, Star, MapPin, Clock, Moon,
  ArrowRight, Music, Sofa, Sparkles, Users
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Best Shisha Lounges in Bahrain 2025 | Hookah Cafes & Spots',
  description: 'Discover the best shisha lounges in Bahrain! From rooftop spots to traditional cafes, explore top hookah places in Manama, Adliya, Juffair. Complete shisha guide.',
  keywords: 'best shisha in Bahrain, hookah Bahrain, shisha lounges Bahrain, shisha cafes Manama, Bahrain hookah bars, shisha spots Bahrain',
  openGraph: {
    title: 'Best Shisha Lounges in Bahrain 2025 | Hookah Cafes & Spots',
    description: 'Your complete guide to the best shisha lounges in Bahrain - rooftop spots, traditional cafes, and premium experiences.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/shisha',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/shisha',
  },
};

const topShishaSpots = [
  {
    name: 'Café Lilou Terrace',
    location: 'Adliya',
    type: 'Upscale Lounge',
    rating: 4.7,
    priceRange: '$$$',
    description: 'The famous Lilou extends to an outdoor terrace where you can enjoy shisha in elegant surroundings. Perfect for sophisticated evenings.',
    highlights: ['Premium shisha', 'Beautiful setting', 'Great food', 'Evening vibes'],
    bestFor: 'Upscale nights out, dates',
    hours: 'Evening to late night',
  },
  {
    name: 'Al Bindaira Cafe',
    location: 'Adliya',
    type: 'Traditional Bahraini',
    rating: 4.6,
    priceRange: '$$',
    description: 'Authentic Bahraini cafe with traditional decor, great shisha, and local food. A cultural experience as much as a shisha spot.',
    highlights: ['Traditional vibes', 'Local food', 'Cultural experience', 'Outdoor seating'],
    bestFor: 'Traditional experience, groups',
    hours: 'All day to late night',
  },
  {
    name: 'Saffron by Jena',
    location: 'Adliya',
    type: 'Heritage Restaurant',
    rating: 4.7,
    priceRange: '$$',
    description: 'Heritage house turned restaurant with a courtyard perfect for shisha. Enjoy traditional Bahraini food and atmosphere.',
    highlights: ['Heritage setting', 'Bahraini food', 'Courtyard', 'Authentic'],
    bestFor: 'Cultural experience, dinner + shisha',
    hours: 'Lunch and dinner',
  },
  {
    name: 'Level 23 Lounge',
    location: 'Diplomatic Area',
    type: 'Rooftop Lounge',
    rating: 4.5,
    priceRange: '$$$',
    description: 'Rooftop lounge with stunning city views and premium shisha selection. Perfect for special nights with an impressive backdrop.',
    highlights: ['City views', 'Premium selection', 'Cocktails', 'Rooftop setting'],
    bestFor: 'Special occasions, views',
    hours: 'Evening to late night',
  },
  {
    name: 'Wyndham Garden Cafe',
    location: 'Juffair',
    type: 'Hotel Terrace',
    rating: 4.4,
    priceRange: '$$',
    description: 'Popular Juffair spot with outdoor seating, good shisha, and a relaxed atmosphere. Convenient for the expat community.',
    highlights: ['Juffair location', 'Relaxed vibe', 'Good variety', 'Late hours'],
    bestFor: 'Casual evenings, groups',
    hours: 'Evening to late night',
  },
  {
    name: 'Café Crepaway',
    location: 'Multiple locations',
    type: 'Lebanese Chain',
    rating: 4.3,
    priceRange: '$$',
    description: 'Lebanese restaurant chain with reliable shisha and great food. Multiple locations make it convenient across Bahrain.',
    highlights: ['Lebanese food', 'Multiple locations', 'Consistent quality', 'Good value'],
    bestFor: 'Casual dining + shisha',
    hours: 'All day to late night',
  },
  {
    name: 'Elements Lounge',
    location: 'Juffair',
    type: 'Modern Lounge',
    rating: 4.4,
    priceRange: '$$',
    description: 'Modern lounge in Juffair with good shisha selection, food menu, and DJ nights on weekends.',
    highlights: ['Modern vibe', 'Music nights', 'Good menu', 'Young crowd'],
    bestFor: 'Casual nights, young groups',
    hours: 'Evening to late night',
  },
  {
    name: 'Nusr-Et Terrace',
    location: 'The Avenues',
    type: 'Premium Restaurant',
    rating: 4.6,
    priceRange: '$$$$',
    description: 'The famous Salt Bae restaurant has a terrace area with premium shisha. Ultimate splurge for a fancy night.',
    highlights: ['Premium experience', 'Famous brand', 'Upscale crowd', 'Great service'],
    bestFor: 'Splurge nights, special occasions',
    hours: 'Lunch and dinner',
  },
];

const shishaAreas = [
  {
    area: 'Adliya',
    description: 'The heart of Bahrain\'s cafe culture with the best traditional and upscale shisha spots.',
    vibe: 'Trendy, artsy, mixed crowd',
    topPicks: ['Lilou Terrace', 'Al Bindaira', 'Saffron', 'Block 338 cafes'],
  },
  {
    area: 'Juffair',
    description: 'Popular expat area with numerous casual shisha spots and late-night options.',
    vibe: 'Casual, international, lively',
    topPicks: ['Wyndham Garden', 'Elements', 'Various cafes'],
  },
  {
    area: 'Manama',
    description: 'Traditional cafes and some upscale hotel rooftop options.',
    vibe: 'Mix of traditional and modern',
    topPicks: ['Hotel rooftops', 'Traditional cafes'],
  },
  {
    area: 'Bahrain Bay',
    description: 'Upscale hotel terraces and lounges with premium shisha experiences.',
    vibe: 'Upscale, sophisticated',
    topPicks: ['Four Seasons terrace', 'Hotel lounges'],
  },
];

const shishaTips = [
  {
    title: 'Premium vs Regular',
    tip: 'Premium shisha uses higher quality tobacco and cleaner coal. Worth the extra BD 2-3 for a better experience.',
  },
  {
    title: 'Best Times',
    tip: 'Early evening (7-9 PM) is ideal - not too crowded, good weather. Late night gets busy on weekends.',
  },
  {
    title: 'Flavor Selection',
    tip: 'Double apple is the classic. Grape, mint, and fruit mixes are popular. Ask for recommendations.',
  },
  {
    title: 'Etiquette',
    tip: 'One hose per person is standard. Don\'t adjust the coal yourself - ask the waiter.',
  },
  {
    title: 'Duration',
    tip: 'A shisha typically lasts 1-2 hours. You can ask for new coal to extend it.',
  },
  {
    title: 'Weather Check',
    tip: 'Most shisha spots are outdoors. Check weather in summer - many are AC\'d in covered terraces.',
  },
];

const flavorGuide = [
  { flavor: 'Double Apple', description: 'The classic choice. Anise-forward, traditional taste. A must-try.', popularity: 'Most popular' },
  { flavor: 'Grape', description: 'Sweet and fruity. Lighter than double apple. Great for beginners.', popularity: 'Very popular' },
  { flavor: 'Mint', description: 'Refreshing and clean. Often mixed with other flavors.', popularity: 'Popular' },
  { flavor: 'Watermelon', description: 'Sweet summer flavor. Light and refreshing.', popularity: 'Popular' },
  { flavor: 'Blueberry Mint', description: 'Modern combo. Sweet with a cool finish.', popularity: 'Trending' },
  { flavor: 'Lemon Mint', description: 'Citrusy and refreshing. Perfect for hot evenings.', popularity: 'Popular' },
];

export default function ShishaGuidePage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Shisha Lounges', url: 'https://www.bahrainnights.com/guides/shisha' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium mb-4">
              💨 Shisha Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Shisha Lounges
              </span>
              {' '}in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Shisha (hookah) is a beloved social tradition in Bahrain. Whether you prefer 
              rooftop lounges with city views or traditional cafes with authentic atmosphere, 
              here&apos;s your guide to the best shisha spots in the Kingdom.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Shisha Spots', value: '100+', icon: Wind },
              { label: 'Best Area', value: 'Adliya', icon: MapPin },
              { label: 'Avg Price', value: 'BD 6-12', icon: Star },
              { label: 'Best Time', value: 'Evening', icon: Moon },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Spots */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Top Shisha Spots</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Our handpicked selection of the best shisha lounges in Bahrain.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {topShishaSpots.map((spot) => (
              <div 
                key={spot.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold">{spot.name}</h3>
                    <p className="text-purple-400 text-sm">{spot.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="w-4 h-4 fill-yellow-400" />
                      <span className="font-bold">{spot.rating}</span>
                    </div>
                    <span className="text-xs text-gray-400">{spot.priceRange}</span>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 italic mb-2">{spot.type}</p>
                <p className="text-gray-300 text-sm mb-4">{spot.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {spot.highlights.map((h) => (
                    <span key={h} className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded">
                      {h}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Best for: {spot.bestFor}</span>
                  <span>{spot.hours}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flavor Guide */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">🍇 Flavor Guide</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {flavorGuide.map((flavor) => (
              <div key={flavor.flavor} className="bg-white/5 rounded-xl p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-purple-400">{flavor.flavor}</h3>
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
                    {flavor.popularity}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">{flavor.description}</p>
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
            {shishaAreas.map((area) => (
              <div key={area.area} className="bg-white/5 rounded-2xl p-6">
                <h3 className="font-bold text-xl text-purple-400 mb-2">{area.area}</h3>
                <p className="text-gray-300 text-sm mb-3">{area.description}</p>
                <p className="text-xs text-gray-500 italic mb-2">{area.vibe}</p>
                <p className="text-xs text-purple-400">Top picks: {area.topPicks.join(', ')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">💡 Shisha Tips</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {shishaTips.map((item) => (
              <div key={item.title} className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-5">
                <h3 className="font-bold text-purple-400 mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.tip}</p>
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
              { title: 'Best Cafes', href: '/guides/cafes', emoji: '☕' },
              { title: 'Nightlife Guide', href: '/guides/nightlife', emoji: '🌙' },
              { title: 'Nightlife Adliya', href: '/guides/nightlife-adliya', emoji: '🎭' },
              { title: 'Best Restaurants', href: '/guides/restaurants', emoji: '🍽️' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group"
              >
                <span className="text-2xl mb-2 block">{guide.emoji}</span>
                <span className="font-medium group-hover:text-purple-400 transition-colors">
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
                q: 'What are the best shisha lounges in Bahrain?',
                a: 'Top shisha spots include Café Lilou Terrace in Adliya for upscale vibes, Al Bindaira Cafe for traditional atmosphere, and rooftop lounges like Level 23 for city views. Adliya has the best concentration of quality spots.',
              },
              {
                q: 'How much does shisha cost in Bahrain?',
                a: 'Standard shisha costs BD 5-8 at most cafes. Premium tobacco or specialty flavors range from BD 8-15. Upscale lounges may charge more. One shisha typically lasts 1-2 hours.',
              },
              {
                q: 'What is the best shisha flavor?',
                a: 'Double apple (traditional anise flavor) is the most popular and classic choice. For something sweeter, try grape or watermelon. Mint is refreshing and often mixed with other flavors.',
              },
              {
                q: 'Where is the best area for shisha in Bahrain?',
                a: 'Adliya is the best area for shisha, with options ranging from traditional cafes to upscale lounges. Juffair is popular for casual spots, while hotel terraces offer premium experiences.',
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
      <section className="py-16 px-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for Shisha?</h2>
          <p className="text-gray-300 mb-8">
            Explore our cafe guide or check the nightlife scene.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/cafes"
              className="px-8 py-3 bg-purple-500 hover:bg-purple-400 text-black font-bold rounded-lg transition-colors"
            >
              Cafe Guide
            </Link>
            <Link 
              href="/guides/nightlife"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              Nightlife Guide
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
            headline: 'Best Shisha Lounges in Bahrain 2025',
            description: 'Complete guide to the best shisha and hookah lounges in Bahrain including traditional cafes and rooftop spots.',
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
              '@id': 'https://bahrainnights.com/guides/shisha',
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
                name: 'What are the best shisha lounges in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Top spots include Café Lilou Terrace in Adliya for upscale vibes, Al Bindaira Cafe for traditional atmosphere, and rooftop lounges like Level 23 for city views.',
                },
              },
              {
                '@type': 'Question',
                name: 'How much does shisha cost in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Standard shisha costs BD 5-8 at most cafes. Premium tobacco or specialty flavors range from BD 8-15. One shisha typically lasts 1-2 hours.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the best shisha flavor?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Double apple (traditional anise flavor) is the most popular and classic choice. Grape and watermelon are sweeter alternatives.',
                },
              },
              {
                '@type': 'Question',
                name: 'Where is the best area for shisha in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Adliya is the best area for shisha, with options ranging from traditional cafes to upscale lounges. Juffair is popular for casual spots.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
