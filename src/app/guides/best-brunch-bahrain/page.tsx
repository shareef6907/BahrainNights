import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, Clock, DollarSign, Utensils, Wine, Sun } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Brunches in Bahrain 2026 | Friday Brunch Guide',
  description: 'Discover the best brunches in Bahrain for 2026. From luxurious hotel Friday brunches to casual weekend spots, find the perfect brunch with prices, packages, and reservations.',
  keywords: 'best brunch Bahrain 2026, Friday brunch Bahrain, hotel brunch Manama, weekend brunch Seef, champagne brunch Bahrain, family brunch, pool brunch Bahrain',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/best-brunch-bahrain' },
  openGraph: {
    title: 'Best Brunches in Bahrain 2026 | Friday Brunch Guide',
    description: 'Complete guide to the best brunches in Bahrain - from lavish hotel spreads to casual weekend favorites.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/best-brunch-bahrain',
    images: [{ url: 'https://www.bahrainnights.com/images/guides/brunch-bahrain.jpg', width: 1200, height: 630, alt: 'Best Brunches in Bahrain' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Brunches in Bahrain 2026',
    description: 'Your ultimate guide to brunch in Bahrain.',
  },
};

const faqs = [
  { 
    q: 'What are the best Friday brunches in Bahrain?', 
    a: 'The top Friday brunches include the Four Seasons Bahrain Bay Brunch, Ritz-Carlton La Med, Gulf Hotel Al Waha, and Sofitel Zallaq. These offer extensive buffets with premium beverages, live stations, and often pool or beach access. Prices range from BD 25-60 depending on package.' 
  },
  { 
    q: 'How much does brunch cost in Bahrain?', 
    a: 'Brunch prices vary significantly: casual café brunches cost BD 8-15, mid-range hotel brunches BD 20-35, and premium hotel brunches with beverages BD 40-60+. Most hotels offer tiered packages: soft drinks, house beverages, or premium champagne options.' 
  },
  { 
    q: 'Do I need to book brunch in advance in Bahrain?', 
    a: 'Yes, reservations are essential for popular hotel brunches, especially on Fridays. Book 1-2 weeks ahead for peak season and holidays. Some popular brunches like Four Seasons and Ritz-Carlton fill up weeks in advance. Casual café brunches usually don\'t require booking.' 
  },
  { 
    q: 'Are there family-friendly brunches in Bahrain?', 
    a: 'Many hotels offer family-friendly brunches with kids\' entertainment, dedicated children\'s buffets, and activities. Gulf Hotel, Ritz-Carlton, and Sofitel have excellent family programs. Some brunches offer free entry for children under certain ages or discounted kids\' pricing.' 
  },
  { 
    q: 'What time does brunch typically start and end in Bahrain?', 
    a: 'Most hotel brunches run from 12:30 PM to 4:00 PM on Fridays. Some venues offer Saturday brunches as well. Casual café brunches often run from 9 AM onwards through the afternoon, offering more flexibility for weekend plans.' 
  },
];

const brunches = [
  {
    name: 'Friday Brunch at Four Seasons',
    venue: 'Four Seasons Hotel',
    area: 'Bahrain Bay',
    rating: 5,
    priceRange: 'BD 45-60',
    timing: 'Fridays 12:30PM-4PM',
    mustTry: ['Live seafood station', 'Sushi counter', 'Prime beef carving', 'Dessert room'],
    vibe: 'Ultra-luxurious beachfront experience',
    bestFor: 'Special celebrations, couples, luxury seekers',
    highlights: 'Stunning bay views, premium champagnes, live entertainment, beach access',
    kids: 'Family-friendly with kids\' activities',
  },
  {
    name: 'La Med Brunch',
    venue: 'Ritz-Carlton',
    area: 'Seef',
    rating: 5,
    priceRange: 'BD 38-55',
    timing: 'Fridays 12:30PM-4PM',
    mustTry: ['Mediterranean mezze', 'Seafood platter', 'Gelato station', 'Fresh pasta'],
    vibe: 'Elegant Mediterranean poolside',
    bestFor: 'Groups, families, classic hotel brunch',
    highlights: 'Poolside terrace, extensive spread, refined atmosphere, Ritz service',
    kids: 'Kids\' buffet and entertainment available',
  },
  {
    name: 'Al Waha Brunch',
    venue: 'Gulf Hotel',
    area: 'Adliya',
    rating: 5,
    priceRange: 'BD 28-42',
    timing: 'Fridays 12:30PM-4PM',
    mustTry: ['International buffet', 'Thai station', 'Indian curries', 'BBQ grills'],
    vibe: 'Grand hotel tradition, diverse cuisines',
    bestFor: 'Families, value seekers, variety lovers',
    highlights: 'One of Bahrain\'s original brunches, multiple live stations, great value',
    kids: 'Excellent kids\' facilities and pricing',
  },
  {
    name: 'Brunch by the Beach',
    venue: 'Sofitel Bahrain',
    area: 'Zallaq',
    rating: 5,
    priceRange: 'BD 35-50',
    timing: 'Fridays 12:30PM-4PM',
    mustTry: ['French patisserie', 'Fresh oysters', 'Grilled meats', 'Cheese selection'],
    vibe: 'Beach resort luxury, French flair',
    bestFor: 'Beach lovers, French cuisine fans, couples',
    highlights: 'Private beach access, sunset views, champagne free-flow, refined French touch',
    kids: 'Kids club available during brunch',
  },
  {
    name: 'Intercontinental Brunch',
    venue: 'InterContinental Regency',
    area: 'Manama',
    rating: 4,
    priceRange: 'BD 28-40',
    timing: 'Fridays 12:30PM-3:30PM',
    mustTry: ['Roast carvery', 'Asian wok station', 'Seafood display', 'Dessert spread'],
    vibe: 'Classic five-star hotel experience',
    bestFor: 'Business groups, traditional brunch lovers',
    highlights: 'Central location, consistent quality, elegant setting',
    kids: 'Family-friendly environment',
  },
  {
    name: 'Trader Vic\'s Brunch',
    venue: 'Ritz-Carlton',
    area: 'Seef',
    rating: 4,
    priceRange: 'BD 30-45',
    timing: 'Saturdays 12PM-4PM',
    mustTry: ['Polynesian BBQ', 'Mai Tais', 'Tiki appetizers', 'Tropical desserts'],
    vibe: 'Fun tropical party atmosphere',
    bestFor: 'Friends, fun seekers, cocktail lovers',
    highlights: 'Unique Polynesian theme, live music, vibrant energy, signature cocktails',
    kids: 'More suited for adults',
  },
  {
    name: 'CUT Brunch',
    venue: 'Four Seasons Hotel',
    area: 'Bahrain Bay',
    rating: 5,
    priceRange: 'BD 45-65',
    timing: 'Saturdays 12PM-4PM',
    mustTry: ['Prime steaks', 'Wagyu sliders', 'Truffle eggs', 'Artisan pastries'],
    vibe: 'Sophisticated steakhouse brunch',
    bestFor: 'Steak lovers, special occasions, foodies',
    highlights: 'Wolfgang Puck quality, premium meats, intimate setting, exceptional service',
    kids: 'Better for adults and older children',
  },
  {
    name: 'JW Marriott Brunch',
    venue: 'JW Marriott',
    area: 'Manama',
    rating: 4,
    priceRange: 'BD 25-38',
    timing: 'Fridays 12:30PM-4PM',
    mustTry: ['International buffet', 'Live cooking', 'Sushi bar', 'Chocolate fountain'],
    vibe: 'Elegant five-star comfort',
    bestFor: 'Families, consistent experience seekers',
    highlights: 'Central location, good value, reliable quality, family-friendly',
    kids: 'Great for families with kids\' menu',
  },
  {
    name: 'Coral Bay Brunch',
    venue: 'Coral Bay Resort',
    area: 'Diyar Al Muharraq',
    rating: 4,
    priceRange: 'BD 22-35',
    timing: 'Fridays 1PM-5PM',
    mustTry: ['Beach BBQ', 'Fresh grills', 'Seafood selection', 'Tropical drinks'],
    vibe: 'Relaxed beach resort feel',
    bestFor: 'Casual beachgoers, families, groups',
    highlights: 'Beach access, relaxed atmosphere, outdoor setting, value pricing',
    kids: 'Very kid-friendly with beach activities',
  },
  {
    name: 'Karma Kafe Brunch',
    venue: 'The Avenues',
    area: 'Bahrain Bay',
    rating: 4,
    priceRange: 'BD 28-42',
    timing: 'Fridays 1PM-5PM',
    mustTry: ['Asian fusion bites', 'Dim sum', 'Sushi rolls', 'Pan-Asian plates'],
    vibe: 'Trendy Asian fusion party',
    bestFor: 'Young professionals, foodies, groups',
    highlights: 'Modern setting, great music, Asian flavors, Bay views',
    kids: 'More suitable for adults',
  },
];

const casualBrunchSpots = [
  {
    name: 'Calexico',
    area: 'Adliya',
    priceRange: 'BD 8-15',
    style: 'Eggs Benedict, pancakes, fresh juices',
    bestFor: 'Casual weekend mornings',
  },
  {
    name: 'Lilou',
    area: 'Adliya',
    priceRange: 'BD 10-18',
    style: 'French café, pastries, brunch classics',
    bestFor: 'Elegant casual, great coffee',
  },
  {
    name: 'Café Lilou',
    area: 'Seef',
    priceRange: 'BD 10-18',
    style: 'Same Lilou quality, mall setting',
    bestFor: 'Shopping day brunch',
  },
  {
    name: 'Canvas',
    area: 'Adliya',
    priceRange: 'BD 8-14',
    style: 'Hipster café, avocado toast, specialty coffee',
    bestFor: 'Young crowd, Instagram-worthy',
  },
  {
    name: 'Wild Coffee',
    area: 'Seef',
    priceRange: 'BD 6-12',
    style: 'Aussie-style café, healthy options',
    bestFor: 'Health-conscious brunch',
  },
  {
    name: 'Cocoa Room',
    area: 'Riffa',
    priceRange: 'BD 8-15',
    style: 'All-day breakfast, chocolate specialties',
    bestFor: 'Sweet tooths, families',
  },
];

const brunchTips = [
  {
    title: 'Book Early',
    tip: 'Popular hotel brunches fill up fast, especially during cooler months and holidays. Reserve 1-2 weeks ahead.',
  },
  {
    title: 'Arrive Hungry',
    tip: 'Skip breakfast to fully enjoy the spread. Most brunches run 3-4 hours, so pace yourself.',
  },
  {
    title: 'Check Packages',
    tip: 'Most hotels offer tiered packages: soft drinks only, house beverages, or premium champagne. Choose based on your preference.',
  },
  {
    title: 'Ask About Pool Access',
    tip: 'Some hotel brunches include pool or beach access — bring swimwear and make a full day of it.',
  },
  {
    title: 'Consider Timing',
    tip: 'Arrive early for the best selection at live stations. Later arrival means a more relaxed atmosphere.',
  },
  {
    title: 'Download Deals',
    tip: 'Apps like The Entertainer and credit card offers often include brunch discounts.',
  },
];

export default function BestBrunchBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-orange-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Best Brunches', url: 'https://www.bahrainnights.com/guides/best-brunch-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm font-medium mb-4">
              🥂 Weekend Guide 2026
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">Brunches</span> in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From lavish Friday hotel spreads with champagne towers to cozy café mornings — 
              your complete guide to brunch in Bahrain for 2026.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated} | By <Link href="https://www.bahrainnights.com" className="text-orange-400 hover:underline">BahrainNights.com</Link>
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Brunches Reviewed', value: '40+', icon: Utensils },
              { label: 'Starting From', value: 'BD 8', icon: DollarSign },
              { label: 'Premium Options', value: '10+', icon: Wine },
              { label: 'Best Day', value: 'Friday', icon: Sun },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-orange-400" />
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
              Brunch in Bahrain is more than just a meal — it&apos;s a cherished weekend tradition that brings 
              friends and families together for leisurely afternoons of exceptional food, flowing drinks, 
              and memorable conversations. The kingdom&apos;s hotel industry has elevated the Friday brunch 
              to an art form, with five-star properties competing to offer the most impressive spreads 
              featuring international cuisines, premium beverages, and entertainment that transforms a 
              simple meal into an experience.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mt-4">
              Whether you&apos;re seeking a glamorous champagne-fueled affair at the Four Seasons, a family-friendly 
              feast at the Gulf Hotel, or a relaxed café morning with artisan coffee and eggs Benedict, 
              Bahrain offers brunch options for every taste and budget. This comprehensive guide covers 
              the best hotel brunches with their various packages, casual weekend spots for a more laid-back 
              experience, and insider tips to help you make the most of your brunch in Bahrain. From beachfront 
              settings to elegant ballrooms, discover where to spend your perfect weekend afternoon.
            </p>
          </div>
        </div>
      </section>

      {/* Premium Hotel Brunches */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Premium Hotel Brunches</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Lavish spreads, premium beverages, and five-star service — the best hotel brunches in Bahrain.
          </p>
          
          <div className="grid gap-6">
            {brunches.map((brunch) => (
              <div 
                key={brunch.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold">{brunch.name}</h3>
                        <p className="text-orange-400 text-sm flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {brunch.venue}, {brunch.area}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-0.5 justify-end mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < brunch.rating ? 'text-orange-400 fill-orange-400' : 'text-gray-600'}`} />
                          ))}
                        </div>
                        <span className="text-sm font-bold text-white">{brunch.priceRange}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-orange-300 flex items-center gap-2 mb-3">
                      <Clock className="w-4 h-4" />
                      {brunch.timing}
                    </p>
                    
                    <p className="text-gray-400 text-sm mb-3">{brunch.vibe}</p>
                    
                    <div className="mb-3">
                      <span className="text-xs text-gray-500">Must try:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {brunch.mustTry.map((item) => (
                          <span key={item} className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded">{item}</span>
                        ))}
                      </div>
                    </div>

                    <p className="text-sm text-gray-300">{brunch.highlights}</p>
                  </div>
                  
                  <div className="lg:w-1/4 space-y-2 text-sm bg-black/20 rounded-xl p-4">
                    <p className="text-orange-400 font-semibold">Best for:</p>
                    <p className="text-gray-300">{brunch.bestFor}</p>
                    <p className="text-gray-400 text-xs mt-3">{brunch.kids}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Casual Brunch Spots */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Casual Café Brunches</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            No reservations needed — just great food and relaxed weekend vibes.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {casualBrunchSpots.map((spot) => (
              <div key={spot.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-lg">{spot.name}</h3>
                <p className="text-orange-400 text-sm flex items-center gap-1 mb-2">
                  <MapPin className="w-3 h-3" /> {spot.area}
                </p>
                <p className="text-sm font-medium mb-1">{spot.priceRange}</p>
                <p className="text-gray-400 text-sm mb-2">{spot.style}</p>
                <p className="text-xs text-gray-500">Best for: {spot.bestFor}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brunch Tips */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Brunch Tips & Tricks</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {brunchTips.map((tip) => (
              <div key={tip.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-orange-400 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-300">{tip.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events CTA */}
      <section className="py-12 px-4 bg-gradient-to-r from-orange-500/20 to-amber-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Looking for Brunch Events & Special Offers?</h2>
          <p className="text-gray-300 mb-6">
            Discover themed brunches, holiday specials, and exclusive dining events in Bahrain.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://platinumlist.net/aff/?ref=yjg3yzi&link=https://bahrain.platinumlist.net"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-orange-500 hover:bg-orange-400 text-black font-bold rounded-lg transition-colors"
            >
              Browse Events on Platinumlist
            </a>
            <a 
              href="https://www.eventsbahrain.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              EventsBahrain.com
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
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
              { title: 'Best Breakfast Spots', href: '/guides/best-breakfast-bahrain' },
              { title: 'Best Cafes', href: '/guides/best-cafes-bahrain' },
              { title: 'Buffet Guide', href: '/guides/buffets' },
              { title: 'Hotel Dining', href: '/guides/hotels' },
              { title: 'Family Restaurants', href: '/guides/best-family-restaurants-bahrain' },
              { title: 'Best Views', href: '/guides/best-views-bahrain' },
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
            Powered by <Link href="https://www.bahrainnights.com" className="text-orange-400 hover:underline">BahrainNights.com</Link> — 
            Your ultimate guide to nightlife, dining, and entertainment in Bahrain.
          </p>
          <div className="flex justify-center gap-6 text-sm text-gray-500">
            <a href="https://www.eventsbahrain.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400">EventsBahrain.com</a>
            <a href="https://www.cinematicwebworks.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400">CinematicWebWorks.com</a>
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
            headline: 'Best Brunches in Bahrain 2026 | Friday Brunch Guide',
            description: 'Complete guide to the best brunches in Bahrain, from luxury hotel spreads to casual café mornings.',
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
              '@id': 'https://www.bahrainnights.com/guides/best-brunch-bahrain',
            },
          }),
        }}
      />
    </div>
  );
}
