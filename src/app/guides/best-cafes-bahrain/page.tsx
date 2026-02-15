import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, Coffee, Wifi, Clock, Laptop, Heart, Cake } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Cafes in Bahrain 2026 | Coffee Shops & Work Spots',
  description: 'Discover the best cafes in Bahrain for 2026. From specialty coffee to cozy work spots, find the perfect café in Adliya, Seef, and Manama with reviews, WiFi info, and atmosphere.',
  keywords: 'best cafes Bahrain 2026, coffee shops Bahrain, specialty coffee Manama, coworking cafes Seef, Adliya cafes, WiFi cafes Bahrain, work friendly cafes',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/best-cafes-bahrain' },
  openGraph: {
    title: 'Best Cafes in Bahrain 2026 | Coffee Shops & Work Spots',
    description: 'Complete guide to the best cafes in Bahrain - from specialty coffee roasters to cozy work spots.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/best-cafes-bahrain',
    images: [{ url: 'https://www.bahrainnights.com/images/guides/cafes-bahrain.jpg', width: 1200, height: 630, alt: 'Best Cafes in Bahrain' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Cafes in Bahrain 2026',
    description: 'Your ultimate guide to cafes and coffee culture in Bahrain.',
  },
};

const faqs = [
  { 
    q: 'What are the best cafes in Bahrain for specialty coffee?', 
    a: 'Top specialty coffee cafes include Coda Coffee (expert roasting, multiple locations), Wild Coffee (Australian-style, excellent espresso), Canvas (hipster vibes, quality beans), and Quaint Coffee (third-wave focus). These cafes source premium beans and employ skilled baristas who craft exceptional espresso drinks and pour-overs.' 
  },
  { 
    q: 'Which cafes in Bahrain are best for working or studying?', 
    a: 'Wild Coffee, Coda Coffee, and Canvas offer strong WiFi, plenty of power outlets, and work-friendly atmospheres. Lilou is also popular for laptop work with good seating. For longer work sessions, check out the cafes in malls like City Centre or The Avenues which offer all-day comfort.' 
  },
  { 
    q: 'What are the most Instagrammable cafes in Bahrain?', 
    a: 'Canvas in Adliya features artistic interiors perfect for photos. Lilou offers elegant French aesthetics. Cocoa Room has stunning dessert presentations. Urban Coffee has industrial-chic décor. Cloud Cafés locations feature bright, airy spaces designed for photography.' 
  },
  { 
    q: 'Are there cafes in Bahrain that serve alcohol?', 
    a: 'Traditional cafes in Bahrain don\'t serve alcohol. However, hotel cafes and lounges like those at Four Seasons, Ritz-Carlton, and Gulf Hotel offer coffee and espresso drinks alongside alcoholic beverages. Some bar-cafes in Adliya transform from daytime cafes to evening lounges.' 
  },
  { 
    q: 'What time do cafes in Bahrain typically open and close?', 
    a: 'Most cafes open between 7-9 AM and close around 10 PM-12 AM. Mall-based cafes follow shopping hours. Some 24-hour options exist, particularly in areas like Adliya and Juffair. Weekend hours may differ, with many cafes opening later on Fridays.' 
  },
];

const cafes = [
  {
    name: 'Coda Coffee',
    area: 'Multiple Locations',
    rating: 5,
    priceRange: 'BD 2-6',
    specialty: 'Local roastery, precision espresso',
    vibe: 'Modern minimalist, serious coffee focus',
    wifi: true,
    workFriendly: true,
    mustTry: ['Flat white', 'Single origin pour-over', 'Iced Coda'],
    bestFor: 'Coffee purists, specialty drinks',
    hours: '7AM-11PM',
    highlights: 'Bahrain\'s premier coffee roaster, beans sourced globally, expert baristas, clean modern spaces',
  },
  {
    name: 'Wild Coffee',
    area: 'Seef / Amwaj',
    rating: 5,
    priceRange: 'BD 2-5',
    specialty: 'Australian-style café, healthy food',
    vibe: 'Bright, healthy, laid-back',
    wifi: true,
    workFriendly: true,
    mustTry: ['Magic (Aussie espresso drink)', 'Avocado toast', 'Acai bowl'],
    bestFor: 'Health-conscious, brunch, work',
    hours: '7AM-10PM',
    highlights: 'Imported Australian coffee culture, exceptional espresso, healthy menu, great for laptops',
  },
  {
    name: 'Canvas',
    area: 'Adliya',
    rating: 5,
    priceRange: 'BD 2-6',
    specialty: 'Artistic café, specialty coffee',
    vibe: 'Hipster-industrial, creative energy',
    wifi: true,
    workFriendly: true,
    mustTry: ['Specialty latte', 'Avocado toast', 'Matcha latte'],
    bestFor: 'Creatives, Instagram, work sessions',
    hours: '8AM-12AM',
    highlights: 'Iconic Adliya spot, artistic interiors, excellent coffee, perfect for photos and productivity',
  },
  {
    name: 'Lilou',
    area: 'Adliya / Seef',
    rating: 5,
    priceRange: 'BD 3-8',
    specialty: 'French bistro-café, pastries',
    vibe: 'Elegant Parisian charm',
    wifi: true,
    workFriendly: true,
    mustTry: ['Croissants', 'French press coffee', 'Eggs Benedict', 'Macarons'],
    bestFor: 'Breakfast, elegant meetings, pastries',
    hours: '7:30AM-11PM',
    highlights: 'Bahrain institution, French bakery excellence, beautiful setting, all-day dining',
  },
  {
    name: 'Quaint Coffee',
    area: 'Manama',
    rating: 5,
    priceRange: 'BD 2-5',
    specialty: 'Third-wave coffee, manual brews',
    vibe: 'Intimate, coffee-focused',
    wifi: true,
    workFriendly: false,
    mustTry: ['V60 pour-over', 'Aeropress', 'Espresso tonic'],
    bestFor: 'Coffee geeks, manual brew enthusiasts',
    hours: '8AM-10PM',
    highlights: 'Dedicated third-wave focus, educational approach, bean sourcing expertise, intimate space',
  },
  {
    name: 'Calexico',
    area: 'Adliya',
    rating: 4,
    priceRange: 'BD 3-8',
    specialty: 'California-style, brunch focus',
    vibe: 'Sunny, casual, friendly',
    wifi: true,
    workFriendly: true,
    mustTry: ['Breakfast burrito', 'Iced coffee', 'Pancakes', 'Fresh juice'],
    bestFor: 'Weekend brunch, casual catch-ups',
    hours: '8AM-11PM',
    highlights: 'Beloved brunch spot, generous portions, great coffee, warm atmosphere',
  },
  {
    name: 'Cocoa Room',
    area: 'Riffa / Amwaj',
    rating: 4,
    priceRange: 'BD 3-7',
    specialty: 'Desserts, chocolate, all-day dining',
    vibe: 'Cozy, sweet-focused',
    wifi: true,
    workFriendly: true,
    mustTry: ['Hot chocolate', 'Belgian waffles', 'Molten chocolate cake'],
    bestFor: 'Sweet cravings, families, dessert lovers',
    hours: '8AM-12AM',
    highlights: 'Chocolate heaven, stunning desserts, family-friendly, south Bahrain favorite',
  },
  {
    name: 'Urban Coffee',
    area: 'Juffair',
    rating: 4,
    priceRange: 'BD 2-5',
    specialty: 'Industrial-chic, good espresso',
    vibe: 'Hip, young, energetic',
    wifi: true,
    workFriendly: true,
    mustTry: ['Spanish latte', 'Cold brew', 'Breakfast bagel'],
    bestFor: 'Juffair residents, young crowd, work',
    hours: '7AM-12AM',
    highlights: 'Juffair favorite, industrial design, solid coffee, convenient location',
  },
  {
    name: 'Costa Coffee',
    area: 'Multiple Locations',
    rating: 4,
    priceRange: 'BD 2-5',
    specialty: 'Reliable chain quality',
    vibe: 'Familiar, comfortable',
    wifi: true,
    workFriendly: true,
    mustTry: ['Flat white', 'Caramel latte', 'Cakes'],
    bestFor: 'Reliable quality, multiple locations, quick meetings',
    hours: 'Varies by location',
    highlights: 'Consistent quality across locations, comfortable seating, reliable WiFi, mall presence',
  },
  {
    name: 'The Coffee Club',
    area: 'Seef / City Centre',
    rating: 4,
    priceRange: 'BD 3-7',
    specialty: 'Australian chain, all-day menu',
    vibe: 'Casual comfortable, family-friendly',
    wifi: true,
    workFriendly: true,
    mustTry: ['Big breakfast', 'Smoothie', 'Club sandwich'],
    bestFor: 'Families, mall shopping, reliable choice',
    hours: 'Mall hours',
    highlights: 'All-day dining, kid-friendly, good coffee, extensive menu beyond coffee',
  },
  {
    name: 'Dose Café',
    area: 'Seef',
    rating: 4,
    priceRange: 'BD 3-6',
    specialty: 'Premium chain, specialty drinks',
    vibe: 'Modern, upscale casual',
    wifi: true,
    workFriendly: true,
    mustTry: ['Signature lattes', 'Lotus biscoff drinks', 'Pastries'],
    bestFor: 'Meeting spot, comfort drinks',
    hours: '7AM-12AM',
    highlights: 'Premium café experience, creative drink menu, comfortable seating, popular brand',
  },
  {
    name: 'Two Cups Coffee',
    area: 'Amwaj',
    rating: 4,
    priceRange: 'BD 2-5',
    specialty: 'Local roaster, community focus',
    vibe: 'Neighborhood gem, friendly',
    wifi: true,
    workFriendly: true,
    mustTry: ['House blend espresso', 'Cold brew', 'Local pastries'],
    bestFor: 'Amwaj residents, casual work, regulars',
    hours: '7AM-10PM',
    highlights: 'Amwaj favorite, locally roasted, community atmosphere, personal service',
  },
];

const cafeCategories = [
  { category: 'Specialty Coffee', picks: ['Coda Coffee', 'Quaint Coffee', 'Wild Coffee'] },
  { category: 'Work Friendly', picks: ['Wild Coffee', 'Canvas', 'Coda Coffee'] },
  { category: 'Best Pastries', picks: ['Lilou', 'Cocoa Room', 'Dose Café'] },
  { category: 'Instagram Worthy', picks: ['Canvas', 'Lilou', 'Cocoa Room'] },
  { category: 'Best Brunch', picks: ['Lilou', 'Calexico', 'Wild Coffee'] },
  { category: 'Late Night', picks: ['Canvas', 'Urban Coffee', 'Cocoa Room'] },
];

const coffeeTips = [
  {
    title: 'Try Local Roasters',
    tip: 'Coda Coffee and Two Cups roast locally — fresher beans mean better coffee. Ask about single origins.',
  },
  {
    title: 'Morning vs Afternoon',
    tip: 'Visit popular cafes early on weekends. By mid-afternoon, spots like Lilou and Canvas get crowded.',
  },
  {
    title: 'Check WiFi Quality',
    tip: 'Not all cafes have strong WiFi. Coda and Wild Coffee are reliable for work. Test before settling in.',
  },
  {
    title: 'Explore Off-Peak Hours',
    tip: 'Weekday mornings offer the best atmosphere for work. Weekends are social but can be noisy.',
  },
  {
    title: 'Order Season Specials',
    tip: 'Many cafes rotate seasonal drinks. Ask your barista about limited-edition offerings.',
  },
  {
    title: 'Consider the Food',
    tip: 'Lilou and Calexico excel at food. Pure coffee spots may have limited menus — eat first if needed.',
  },
];

export default function BestCafesBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-amber-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Best Cafes', url: 'https://www.bahrainnights.com/guides/best-cafes-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-brown-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-4">
              ☕ Café Guide 2026
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Cafes</span> in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From specialty coffee roasters to cozy work spots — your complete guide to 
              Bahrain&apos;s thriving café culture for 2026.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated} | By <Link href="https://www.bahrainnights.com" className="text-amber-400 hover:underline">BahrainNights.com</Link>
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Cafes Reviewed', value: '50+', icon: Coffee },
              { label: 'Work Friendly', value: '30+', icon: Laptop },
              { label: 'With WiFi', value: '95%', icon: Wifi },
              { label: 'Open Late', value: '20+', icon: Clock },
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

      {/* Introduction */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-gray-300 leading-relaxed">
              Bahrain&apos;s café scene has blossomed into one of the region&apos;s most exciting coffee cultures, 
              with homegrown specialty roasters competing alongside international brands and artisan 
              independent cafes carving out distinctive niches. Whether you&apos;re seeking the perfect 
              pour-over from a passionate barista, a cozy corner to work through the afternoon, 
              or an Instagram-worthy spot for weekend brunch, the kingdom offers cafes to match 
              every mood and mission.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mt-4">
              The café landscape spans from the artistic streets of Adliya — where spots like Canvas 
              and Calexico have become local institutions — to the modern towers of Seef and the 
              beachfront communities of Amwaj. Local roasters like Coda Coffee have elevated 
              Bahrain&apos;s coffee game with expertly sourced beans and precision brewing, while 
              establishments like Lilou bring European café elegance to the Gulf. This comprehensive 
              guide will help you discover the best cafes for specialty coffee, remote work, pastries, 
              or simply watching the world go by with a perfectly crafted cappuccino in hand.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Picks by Category */}
      <section className="py-8 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Quick Picks by Category</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {cafeCategories.map((cat) => (
              <div key={cat.category} className="bg-white/5 rounded-xl p-4">
                <h3 className="font-semibold text-amber-400 mb-2 text-sm">{cat.category}</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  {cat.picks.map((pick) => (
                    <li key={pick}>• {pick}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cafe List */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Top Cafes in Bahrain</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Comprehensive reviews with atmosphere, WiFi info, and what to order.
          </p>
          
          <div className="grid gap-6">
            {cafes.map((cafe) => (
              <div 
                key={cafe.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold flex items-center gap-2">
                          {cafe.name}
                          {cafe.rating === 5 && <Heart className="w-4 h-4 text-amber-400 fill-amber-400" />}
                        </h3>
                        <p className="text-amber-400 text-sm flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {cafe.area}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-0.5 justify-end mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < cafe.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-600'}`} />
                          ))}
                        </div>
                        <span className="text-sm font-bold text-white">{cafe.priceRange}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-amber-300 mb-2">{cafe.specialty}</p>
                    <p className="text-gray-400 text-sm mb-3">{cafe.vibe}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {cafe.wifi && (
                        <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded flex items-center gap-1">
                          <Wifi className="w-3 h-3" /> WiFi
                        </span>
                      )}
                      {cafe.workFriendly && (
                        <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded flex items-center gap-1">
                          <Laptop className="w-3 h-3" /> Work-Friendly
                        </span>
                      )}
                      <span className="text-xs bg-gray-500/20 text-gray-300 px-2 py-1 rounded flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {cafe.hours}
                      </span>
                    </div>

                    <div className="mb-3">
                      <span className="text-xs text-gray-500">Must try:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {cafe.mustTry.map((item) => (
                          <span key={item} className="text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded">{item}</span>
                        ))}
                      </div>
                    </div>

                    <p className="text-sm text-gray-300">{cafe.highlights}</p>
                  </div>
                  
                  <div className="lg:w-1/4 space-y-2 text-sm bg-black/20 rounded-xl p-4">
                    <p className="text-amber-400 font-semibold">Best for:</p>
                    <p className="text-gray-300">{cafe.bestFor}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coffee Tips */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Café Tips & Tricks</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coffeeTips.map((tip) => (
              <div key={tip.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-amber-400 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-300">{tip.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coffee Glossary */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Coffee Drink Guide</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Know your drinks — a quick reference for ordering in Bahrain cafes.
          </p>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { drink: 'Flat White', desc: 'Espresso with velvety microfoam milk, less foam than a latte' },
              { drink: 'Cortado', desc: 'Equal parts espresso and steamed milk, Spanish origin' },
              { drink: 'Magic', desc: 'Australian drink — double ristretto with steamed milk' },
              { drink: 'Piccolo', desc: 'Single ristretto with silky steamed milk in a small glass' },
              { drink: 'Affogato', desc: 'Espresso poured over vanilla gelato — coffee dessert' },
              { drink: 'V60 Pour-Over', desc: 'Manual brewing method highlighting single-origin flavors' },
              { drink: 'Cold Brew', desc: 'Coffee steeped cold for 12-24 hours, smooth and strong' },
              { drink: 'Spanish Latte', desc: 'Espresso with sweetened condensed milk, Gulf favorite' },
            ].map((item) => (
              <div key={item.drink} className="bg-white/5 rounded-xl p-4">
                <h3 className="font-bold text-amber-400 mb-1">{item.drink}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6">
                <h3 className="font-bold mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-6">More Dining Guides</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { title: 'Best Brunch', href: '/guides/best-brunch-bahrain' },
              { title: 'Best Breakfast', href: '/guides/best-breakfast-bahrain' },
              { title: 'Desserts & Sweets', href: '/guides/desserts-cafes-bahrain' },
              { title: 'Shisha Lounges', href: '/guides/shisha-lounges-bahrain' },
              { title: 'Best Views', href: '/guides/best-views-bahrain' },
              { title: 'Adliya Guide', href: '/guides/adliya' },
            ].map((guide) => (
              <Link key={guide.href} href={guide.href} className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors">
                {guide.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400 mb-4">
            Powered by <Link href="https://www.bahrainnights.com" className="text-amber-400 hover:underline">BahrainNights.com</Link> — 
            Your ultimate guide to nightlife, dining, and entertainment in Bahrain.
          </p>
          <div className="flex justify-center gap-6 text-sm text-gray-500">
            <a href="https://www.eventsbahrain.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400">EventsBahrain.com</a>
            <a href="https://www.cinematicwebworks.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400">CinematicWebWorks.com</a>
          </div>
        </div>
      </section>

      {/* Structured Data - Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Best Cafes in Bahrain 2026 | Coffee Shops & Work Spots',
            description: 'Complete guide to the best cafes in Bahrain, from specialty coffee roasters to cozy work-friendly spots.',
            author: {
              '@type': 'Organization',
              name: 'BahrainNights',
              url: 'https://www.bahrainnights.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'BahrainNights',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.bahrainnights.com/logo.png',
              },
            },
            datePublished: '2026-01-01',
            dateModified: lastUpdated,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://www.bahrainnights.com/guides/best-cafes-bahrain',
            },
          }),
        }}
      />
    </div>
  );
}
