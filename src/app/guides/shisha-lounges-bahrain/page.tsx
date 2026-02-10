import { Metadata } from 'next';
import Link from 'next/link';
import { Wind, MapPin, Star, Moon, Music, Coffee, Users } from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';

export const metadata: Metadata = {
  title: 'Best Shisha Lounges in Bahrain 2026 | Top Hookah Spots & Cafés',
  description: 'Discover the best shisha lounges in Bahrain for 2026. From rooftop terraces to traditional cafés, find the perfect spot for premium hookah, Arabic coffee, and late-night vibes.',
  keywords: 'shisha Bahrain, hookah lounges Bahrain, shisha cafes Manama, best shisha Adliya, Arabic shisha Bahrain, shisha bars Juffair',
  openGraph: {
    title: 'Best Shisha Lounges in Bahrain 2026 | Top Hookah Spots',
    description: 'Complete guide to the best shisha lounges and hookah cafés in Bahrain.',
    type: 'article',
    locale: 'en_BH',
    url: 'https://www.bahrainnights.com/guides/shisha-lounges-bahrain',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/shisha-lounges-bahrain',
  },
};

const faqs = [
  {
    q: 'Is shisha legal in Bahrain?',
    a: 'Yes, shisha is legal in Bahrain and widely available at cafés, restaurants, and dedicated shisha lounges. Many venues operate until late night, especially in areas like Adliya, Juffair, and Seef.',
  },
  {
    q: 'How much does shisha cost in Bahrain?',
    a: 'Shisha prices range from BD 3-8 depending on the venue. Premium lounges charge BD 6-10 for specialty flavors. Most places include unlimited coal refreshes.',
  },
  {
    q: 'What are the best areas for shisha in Bahrain?',
    a: 'Adliya has the highest concentration of shisha cafés with a trendy vibe. Juffair offers lively nightlife spots, while Seef has family-friendly options. The Old Town and Muharraq have traditional Arabic cafés.',
  },
  {
    q: 'Can women go to shisha lounges in Bahrain?',
    a: 'Absolutely. Bahrain is cosmopolitan and women are welcome at all shisha lounges. Many venues have mixed seating and family sections.',
  },
];

const lounges = [
  {
    name: 'Café Lilou',
    location: 'Adliya',
    type: 'French Café & Shisha',
    rating: 4.5,
    price: 'BD 5-8',
    description: 'Charming French-inspired café famous for its pastries and quality shisha. The outdoor terrace is perfect for evening sessions with friends.',
    highlights: ['Premium tobacco', 'French pastries', 'Outdoor seating', 'Late-night hours'],
    atmosphere: 'Chic European café meets Middle Eastern tradition',
    bestFor: 'Dates, catch-ups with friends, brunch to late night',
  },
  {
    name: 'Coco\'s',
    location: 'Adliya',
    type: 'Lounge & Restaurant',
    rating: 4.5,
    price: 'BD 5-7',
    description: 'Popular Adliya hangout known for its relaxed vibe, good food, and quality shisha. Great for people-watching on the terrace.',
    highlights: ['Street-side terrace', 'Full food menu', 'Late closing', 'Live music weekends'],
    atmosphere: 'Trendy and social, perfect for the Adliya crowd',
    bestFor: 'Social nights, dinner with shisha, weekend hangouts',
  },
  {
    name: 'Trader Vic\'s',
    location: 'Ritz-Carlton, Seef',
    type: 'Tiki Bar & Lounge',
    rating: 4.5,
    price: 'BD 7-10',
    description: 'Iconic Polynesian-themed bar with outdoor terrace serving premium shisha alongside famous cocktails. Upscale atmosphere with seaside views.',
    highlights: ['Waterfront terrace', 'Premium cocktails', 'Quality shisha', 'Live entertainment'],
    atmosphere: 'Upscale tropical escape with sophisticated crowd',
    bestFor: 'Special occasions, sunset shisha, date nights',
  },
  {
    name: 'Mirai',
    location: 'Adliya',
    type: 'Japanese Restaurant & Lounge',
    rating: 4.5,
    price: 'BD 6-8',
    description: 'Trendy Japanese restaurant with a stylish outdoor shisha lounge. Modern ambiance with quality tobacco and creative flavors.',
    highlights: ['Contemporary setting', 'Japanese cuisine', 'Premium shisha', 'DJ nights'],
    atmosphere: 'Modern Asian fusion with nightlife energy',
    bestFor: 'Pre-party vibes, dinner and shisha combo, trendy crowds',
  },
  {
    name: 'Nusr-Et (Salt Bae)',
    location: 'Four Seasons',
    type: 'Steakhouse & Terrace',
    rating: 4.5,
    price: 'BD 8-12',
    description: 'The famous Salt Bae restaurant offers premium shisha on its stunning terrace overlooking Bahrain Bay.',
    highlights: ['Luxury setting', 'Bay views', 'Premium service', 'Celebrity spot'],
    atmosphere: 'Ultra-luxury with Instagram-worthy views',
    bestFor: 'Impressing guests, special celebrations, luxury experience',
  },
  {
    name: 'Al Abraaj',
    location: 'Old Town, Manama',
    type: 'Traditional Arabic Café',
    rating: 4.0,
    price: 'BD 3-5',
    description: 'Authentic Arabic café experience in Manama\'s old town. Traditional setting with local flavors and classic shisha.',
    highlights: ['Authentic experience', 'Arabic coffee', 'Traditional tobacco', 'Local atmosphere'],
    atmosphere: 'Traditional Bahraini café culture',
    bestFor: 'Cultural experience, budget-friendly, authentic vibes',
  },
  {
    name: 'Bushido',
    location: 'Ritz-Carlton, Seef',
    type: 'Japanese Restaurant & Terrace',
    rating: 4.5,
    price: 'BD 7-10',
    description: 'Upscale Japanese restaurant with a sophisticated terrace for shisha. Premium selection with attentive service.',
    highlights: ['Sophisticated setting', 'Fine dining', 'Quality shisha', 'Waterfront'],
    atmosphere: 'Elegant and refined',
    bestFor: 'Business entertaining, romantic evenings, luxury dining',
  },
  {
    name: 'La Fontaine Centre of Contemporary Art',
    location: 'Hoora',
    type: 'Art Café',
    rating: 4.0,
    price: 'BD 4-6',
    description: 'Unique shisha experience in a converted traditional house turned art gallery. Bohemian vibes with cultural events.',
    highlights: ['Art exhibitions', 'Garden setting', 'Cultural events', 'Unique atmosphere'],
    atmosphere: 'Artsy and bohemian, creative crowd',
    bestFor: 'Art lovers, unique experiences, cultural evenings',
  },
];

export default function ShishaLoungesBahrainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Shisha Lounges Bahrain', url: 'https://www.bahrainnights.com/guides/shisha-lounges-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium mb-4">
              💨 Nightlife Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best Shisha Lounges in{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Bahrain
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From trendy Adliya terraces to luxury hotel lounges — discover where to enjoy 
              premium shisha, Arabic coffee, and late-night vibes in Bahrain.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Venues Featured', value: '15+', icon: Wind },
              { label: 'Hotspot Areas', value: '5', icon: MapPin },
              { label: 'Price Range', value: 'BD 3-12', icon: Coffee },
              { label: 'Late Night Spots', value: '10+', icon: Moon },
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

      {/* Introduction */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg prose-invert">
            <p className="text-xl text-gray-300 leading-relaxed">
              Shisha culture runs deep in Bahrain&apos;s social fabric. Whether you&apos;re looking for a 
              traditional Arabic café experience in the old souks or a chic rooftop lounge with 
              bay views, the kingdom offers an incredible variety of hookah spots. From the 
              bustling terraces of Adliya to the luxury hotel venues of Seef, there&apos;s a perfect 
              shisha spot for every mood and occasion.
            </p>
            <p className="text-gray-400 mt-4">
              Bahrain&apos;s shisha scene blends tradition with modernity — you&apos;ll find everything 
              from authentic apple-tobacco blends served with Arabic coffee to premium imported 
              flavors paired with gourmet cuisine. Most venues operate until 2-3 AM on weekends, 
              making them perfect for late-night socializing.
            </p>
          </div>
        </div>
      </section>

      {/* Lounges Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Top Shisha Lounges</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Handpicked venues for quality shisha and great atmosphere
          </p>
          
          <div className="grid gap-6">
            {lounges.map((lounge, index) => (
              <div 
                key={lounge.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 hover:border-purple-500/30 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-2xl font-bold text-purple-400">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="text-xl font-bold">{lounge.name}</h3>
                        <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                          <MapPin className="w-4 h-4" />
                          {lounge.location}
                          <span className="text-purple-400">•</span>
                          <span>{lounge.type}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-yellow-400">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="font-medium">{lounge.rating}</span>
                        </div>
                        <div className="text-sm text-purple-400 mt-1">{lounge.price}</div>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{lounge.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {lounge.highlights.map((highlight) => (
                        <span key={highlight} className="px-3 py-1 bg-purple-500/10 text-purple-300 rounded-full text-xs">
                          {highlight}
                        </span>
                      ))}
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Atmosphere:</span>
                        <p className="text-gray-400">{lounge.atmosphere}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Best For:</span>
                        <p className="text-gray-400">{lounge.bestFor}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas Guide */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Shisha by Area</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { area: 'Adliya', vibe: 'Trendy & Social', description: 'The heart of Bahrain\'s café culture with numerous terraces and late-night spots.' },
              { area: 'Juffair', vibe: 'Lively & International', description: 'Diverse crowd with many sports bars and casual lounges offering shisha.' },
              { area: 'Seef', vibe: 'Upscale & Family', description: 'Hotel lounges and mall-adjacent cafés with premium service.' },
              { area: 'Old Town', vibe: 'Traditional & Authentic', description: 'Classic Arabic cafés serving traditional shisha and Arabic coffee.' },
              { area: 'Bahrain Bay', vibe: 'Luxury & Views', description: 'High-end venues with waterfront settings and premium prices.' },
              { area: 'Muharraq', vibe: 'Heritage & Local', description: 'Traditional cafés in the historic town with authentic atmosphere.' },
            ].map((item) => (
              <div key={item.area} className="bg-white/5 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2">{item.area}</h3>
                <div className="text-purple-400 text-sm mb-3">{item.vibe}</div>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Shisha Etiquette & Tips</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="font-bold mb-4 text-purple-400">Ordering Tips</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>• Double apple (two apples) is the classic flavor</li>
                <li>• Ask for &quot;light coal&quot; if you prefer milder smoke</li>
                <li>• Most venues offer flavor mixing</li>
                <li>• Order mint tea or Arabic coffee as tradition</li>
              </ul>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="font-bold mb-4 text-purple-400">Best Times to Go</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>• After 9 PM for the best atmosphere</li>
                <li>• Weekends are busiest (Thurs-Sat)</li>
                <li>• Book terrace spots in advance</li>
                <li>• Summer months: opt for AC lounges</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-6">
                <h3 className="font-bold mb-2 text-purple-300">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-Promo: Cinematic Group */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Planning a Shisha Lounge Event?</h2>
            <p className="text-gray-300 mb-6 max-w-xl mx-auto">
              Cinematic Group offers professional event photography, videography, and production 
              services for venues, launches, and private events across Bahrain.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://www.filmproductionbahrain.com" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-purple-500 hover:bg-purple-400 rounded-lg font-medium transition-colors">
                Film Production
              </a>
              <a href="https://www.eventsbahrain.com" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-colors">
                Events Equipment
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-6">Related Guides</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: 'Nightlife Guide', href: '/guides/nightlife', emoji: '🌙' },
              { title: 'Adliya Guide', href: '/guides/adliya-restaurants-bars', emoji: '🍸' },
              { title: 'Happy Hour Deals', href: '/guides/happy-hour', emoji: '🍻' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group flex items-center gap-3"
              >
                <span className="text-2xl">{guide.emoji}</span>
                <span className="font-medium group-hover:text-purple-400 transition-colors">{guide.title}</span>
              </Link>
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
            headline: 'Best Shisha Lounges in Bahrain 2026',
            description: 'Complete guide to the best shisha lounges and hookah cafés in Bahrain.',
            author: { '@type': 'Organization', name: 'BahrainNights' },
            publisher: { '@type': 'Organization', name: 'BahrainNights' },
            datePublished: '2026-02-11',
            dateModified: '2026-02-11',
          }),
        }}
      />
    </div>
  );
}
