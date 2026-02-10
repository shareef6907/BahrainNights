import { Metadata } from 'next';
import Link from 'next/link';
import { Clock, MapPin, Star, Beer, Wine, Martini, Percent } from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';

export const metadata: Metadata = {
  title: 'Best Happy Hour Deals in Bahrain 2026 | Bars & Drink Specials',
  description: 'Discover the best happy hour deals in Bahrain for 2026. From hotel bars to Adliya nightlife, find 2-for-1 drinks, discounted cocktails, and evening specials.',
  keywords: 'happy hour Bahrain, drink deals Bahrain, bar specials Manama, 2-for-1 drinks Bahrain, cheap drinks Bahrain, Adliya bars happy hour',
  openGraph: {
    title: 'Best Happy Hour Deals in Bahrain 2026',
    description: 'Complete guide to happy hour deals and drink specials across Bahrain.',
    type: 'article',
    locale: 'en_BH',
    url: 'https://www.bahrainnights.com/guides/happy-hour-bahrain',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/happy-hour-bahrain',
  },
};

const faqs = [
  {
    q: 'What time is happy hour in Bahrain?',
    a: 'Most happy hours run from 4-8 PM, with some starting as early as 12 PM and extending until 9 PM. Weekend brunch deals often include drinks packages from 12-4 PM on Fridays and Saturdays.',
  },
  {
    q: 'How much can you save on happy hour in Bahrain?',
    a: 'Typical savings are 25-50% off regular prices. Common deals include 2-for-1 drinks, BD 2-3 house pours, and BD 15-20 unlimited drink packages during brunch.',
  },
  {
    q: 'Which areas have the best happy hour deals?',
    a: 'Juffair has the most competitive pricing, Adliya offers trendy bars with good deals, and hotel bars in Seef provide upscale happy hours with premium spirits.',
  },
  {
    q: 'Can you drink alcohol in Bahrain?',
    a: 'Yes, alcohol is legal and widely available in Bahrain at licensed hotels, restaurants, and bars. You must be 21+ to purchase alcohol. Standalone liquor stores are also available for residents.',
  },
];

const venues = [
  {
    name: 'Trader Vic\'s',
    location: 'Ritz-Carlton, Seef',
    type: 'Tiki Bar',
    rating: 4.5,
    deal: '2-for-1 cocktails 4-7 PM',
    savings: '50%',
    description: 'Iconic Polynesian bar with legendary Mai Tais. Happy hour on the waterfront terrace is unbeatable.',
    drinks: ['Mai Tai', 'Samoan Fog Cutter', 'Tiki cocktails'],
  },
  {
    name: 'JJ\'s Irish Pub',
    location: 'Juffair',
    type: 'Pub',
    rating: 4.3,
    deal: 'BD 2 pints 12-8 PM',
    savings: '40%',
    description: 'Classic Irish pub atmosphere with some of the best drink prices in Bahrain. Sports on TV.',
    drinks: ['Draft beer', 'Guinness', 'Whiskey'],
  },
  {
    name: 'Calexico',
    location: 'Adliya',
    type: 'Mexican Bar',
    rating: 4.4,
    deal: 'BD 3 margaritas 5-8 PM',
    savings: '35%',
    description: 'Vibrant Mexican spot with excellent margaritas and tacos. Popular after-work destination.',
    drinks: ['Margaritas', 'Tequila', 'Mexican beer'],
  },
  {
    name: 'The Wyndham Garden Lounge',
    location: 'Juffair',
    type: 'Hotel Bar',
    rating: 4.2,
    deal: '2-for-1 all drinks 5-8 PM',
    savings: '50%',
    description: 'Great value happy hour with a wide selection of spirits, beers, and cocktails.',
    drinks: ['House spirits', 'Beer', 'Wine'],
  },
  {
    name: 'CUT by Wolfgang Puck',
    location: 'Four Seasons',
    type: 'Steakhouse Bar',
    rating: 4.7,
    deal: 'Premium cocktails + oysters 5-7 PM',
    savings: '30%',
    description: 'Upscale happy hour with craft cocktails and discounted oysters. Sophisticated crowd.',
    drinks: ['Craft cocktails', 'Premium whiskey', 'Champagne'],
  },
  {
    name: 'Lanterns',
    location: 'Ritz-Carlton',
    type: 'Rooftop Bar',
    rating: 4.5,
    deal: '2-for-1 drinks 5-8 PM',
    savings: '50%',
    description: 'Stunning views of Bahrain skyline with Asian-inspired cocktails and bites.',
    drinks: ['Asian cocktails', 'Sake', 'Wine'],
  },
  {
    name: 'Mezzanine Lounge',
    location: 'Gulf Hotel',
    type: 'Lounge',
    rating: 4.3,
    deal: '30% off all drinks 4-8 PM',
    savings: '30%',
    description: 'Elegant hotel lounge with live music and comfortable seating for after-work drinks.',
    drinks: ['Cocktails', 'Wine', 'Champagne'],
  },
  {
    name: 'Warbler',
    location: 'Adliya',
    type: 'Bar & Kitchen',
    rating: 4.4,
    deal: 'House wines BD 3, beers BD 2.5',
    savings: '35%',
    description: 'Trendy Adliya hangout with good music, food, and competitive drink prices all evening.',
    drinks: ['Wine', 'Beer', 'Cocktails'],
  },
];

export default function HappyHourBahrainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-amber-950/20 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Happy Hour Bahrain', url: 'https://www.bahrainnights.com/guides/happy-hour-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-4">
              🍻 Nightlife Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Happy Hour in{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Bahrain
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              2-for-1 deals, discounted cocktails, and the best drink specials 
              across the kingdom — your guide to saving on a night out.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Venues', value: '25+', icon: Beer },
              { label: 'Best Hours', value: '4-8 PM', icon: Clock },
              { label: 'Savings Up To', value: '50%', icon: Percent },
              { label: 'Areas', value: '5', icon: MapPin },
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

      {/* Venues Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Best Happy Hour Deals</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Updated regularly with the latest drink specials
          </p>
          
          <div className="grid gap-6">
            {venues.map((venue) => (
              <div 
                key={venue.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 hover:border-amber-500/30 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="text-xl font-bold">{venue.name}</h3>
                        <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                          <MapPin className="w-4 h-4" />
                          {venue.location}
                          <span className="text-amber-400">•</span>
                          <span>{venue.type}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-medium">{venue.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{venue.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {venue.drinks.map((drink) => (
                        <span key={drink} className="px-3 py-1 bg-amber-500/10 text-amber-300 rounded-full text-xs">
                          {drink}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="md:text-right md:min-w-48">
                    <div className="inline-block bg-green-500/20 text-green-400 px-4 py-2 rounded-lg mb-2">
                      <span className="font-bold">{venue.deal}</span>
                    </div>
                    <div className="text-amber-400 font-medium">Save {venue.savings}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By Area */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Happy Hours by Area</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { area: 'Juffair', vibe: 'Best Value', description: 'Most competitive prices with pubs, sports bars, and hotel lounges.' },
              { area: 'Adliya', vibe: 'Trendy Crowd', description: 'Stylish bars and restaurants with good deals in a vibrant setting.' },
              { area: 'Seef', vibe: 'Upscale Options', description: 'Hotel bars with premium spirits and sophisticated atmosphere.' },
            ].map((item) => (
              <div key={item.area} className="bg-white/5 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2">{item.area}</h3>
                <div className="text-amber-400 text-sm mb-3">{item.vibe}</div>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-6">
                <h3 className="font-bold mb-2 text-amber-300">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-Promo */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Hosting a Bar Event?</h2>
            <p className="text-gray-300 mb-6 max-w-xl mx-auto">
              Cinematic Group provides event production, photography, and equipment 
              for bar launches, club nights, and hospitality events.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://www.eventsbahrain.com" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-amber-500 hover:bg-amber-400 rounded-lg font-medium transition-colors">
                Event Equipment
              </a>
              <a href="https://www.filmproductionbahrain.com" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-colors">
                Event Photography
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
              { title: 'Shisha Lounges', href: '/guides/shisha-lounges-bahrain', emoji: '💨' },
              { title: 'Ladies Nights', href: '/guides/ladies-nights', emoji: '👠' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group flex items-center gap-3"
              >
                <span className="text-2xl">{guide.emoji}</span>
                <span className="font-medium group-hover:text-amber-400 transition-colors">{guide.title}</span>
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
            headline: 'Best Happy Hour Deals in Bahrain 2026',
            description: 'Complete guide to happy hour deals and drink specials across Bahrain.',
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
