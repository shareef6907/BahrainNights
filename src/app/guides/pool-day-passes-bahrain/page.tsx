import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Waves, Sun, MapPin, Clock, Star,
  DollarSign, Users, Umbrella, Phone
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Best Pool Day Passes in Bahrain 2026 | Hotel Pools & Beach Clubs',
  description: 'Complete guide to pool day passes in Bahrain — luxury hotel pools, beach clubs, and day access rates. Compare prices, facilities, and book your perfect pool day.',
  keywords: 'pool day pass Bahrain, hotel pool Bahrain, beach club Bahrain, day pass Manama, swimming Bahrain, Four Seasons pool, Ritz Carlton pool, best pools Bahrain',
  openGraph: {
    title: 'Best Pool Day Passes in Bahrain 2026 | Hotel Pools & Beach Clubs',
    description: 'Your guide to the best hotel pools and beach clubs with day passes in Bahrain.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/pool-day-passes-bahrain',
    images: [{ url: 'https://www.bahrainnights.com/images/pool-bahrain.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Pool Day Passes in Bahrain 2026',
    description: 'Luxury hotel pools and beach clubs with day access in Bahrain.',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/pool-day-passes-bahrain',
  },
};

const luxuryPools = [
  {
    name: 'Four Seasons Bahrain Bay',
    location: 'Bahrain Bay',
    description: 'Stunning infinity pools overlooking the bay with private cabanas, beach access, and world-class service. The ultimate luxury pool experience in Bahrain.',
    pools: '3 pools + beach',
    facilities: 'Cabanas, beach, spa, fine dining',
    weekdayPrice: 'BD 40-60',
    weekendPrice: 'BD 50-70',
    includes: 'Pool, beach, towels, locker',
    contact: '+973 1711 5000',
    rating: 5,
  },
  {
    name: 'The Ritz-Carlton Bahrain',
    location: 'Seef',
    description: 'Iconic resort with expansive pools, private beach, and legendary service. Multiple pool options including adults-only areas.',
    pools: '4 pools + lagoon beach',
    facilities: 'Private beach, cabanas, restaurants',
    weekdayPrice: 'BD 35-55',
    weekendPrice: 'BD 45-65',
    includes: 'Pool, beach, towels, F&B credit',
    contact: '+973 1758 0000',
    rating: 5,
  },
  {
    name: 'Jumeirah Royal Saray',
    location: 'Seef',
    description: 'Adults-only beach club with premium pools, daybeds, and sophisticated atmosphere. Perfect for couples seeking a refined pool day.',
    pools: '2 pools + beach',
    facilities: 'Infinity pool, beach, restaurant',
    weekdayPrice: 'BD 35-50',
    weekendPrice: 'BD 45-60',
    includes: 'Pool, beach, towels',
    contact: '+973 7777 3000',
    rating: 5,
  },
  {
    name: 'Sofitel Bahrain',
    location: 'Seef',
    description: 'Beachfront resort with multiple pools, water sports, and excellent F&B options. Great for families looking for a full day of activities.',
    pools: '3 pools + beach',
    facilities: 'Beach, water sports, kids pool',
    weekdayPrice: 'BD 25-40',
    weekendPrice: 'BD 35-50',
    includes: 'Pool, beach, towels',
    contact: '+973 1711 5000',
    rating: 4,
  },
];

const midRangePools = [
  {
    name: 'Gulf Hotel',
    location: 'Adliya',
    description: 'Legendary hotel with large pool, gardens, and iconic atmosphere. Day passes include F&B credit.',
    pools: '1 large pool',
    price: 'BD 20-30',
    includes: 'Pool, F&B credit, towels',
    facilities: 'Restaurant, bar, garden',
  },
  {
    name: 'Wyndham Grand',
    location: 'Manama',
    description: 'City hotel with rooftop pool and stunning skyline views. Adult-friendly atmosphere.',
    pools: 'Rooftop pool',
    price: 'BD 18-28',
    includes: 'Pool, towels, gym access',
    facilities: 'Rooftop bar, gym',
  },
  {
    name: 'Intercontinental Regency',
    location: 'Manama',
    description: 'Central location with pool, gym, and convenient access to Manama attractions.',
    pools: '1 pool',
    price: 'BD 20-30',
    includes: 'Pool, gym, towels',
    facilities: 'Gym, restaurants',
  },
  {
    name: 'Crowne Plaza',
    location: 'Diplomatic Area',
    description: 'Business hotel with refreshing pool area, good for a quick escape from the city.',
    pools: '1 pool',
    price: 'BD 15-25',
    includes: 'Pool, towels',
    facilities: 'Restaurant, bar',
  },
  {
    name: 'ART Rotana',
    location: 'Amwaj Islands',
    description: 'Island resort with beach access, pools, and relaxed vibe. Great for families.',
    pools: '2 pools + beach',
    price: 'BD 20-35',
    includes: 'Pool, beach, towels',
    facilities: 'Beach, restaurants',
  },
  {
    name: 'Novotel Al Dana Resort',
    location: 'Diplomatic Area',
    description: 'Resort-style hotel with large pool area and family-friendly facilities.',
    pools: '1 large pool',
    price: 'BD 15-22',
    includes: 'Pool, towels',
    facilities: 'Gardens, restaurant',
  },
];

const beachClubs = [
  {
    name: 'Marassi Beach Club',
    location: 'Diyar Al Muharraq',
    description: "Premium beach club with pristine sands, crystal pools, and upscale dining. Bahrain's most Instagrammable beach destination.",
    vibe: 'Upscale',
    dayPass: 'BD 35-50',
    membership: 'Available',
    bestFor: 'Couples, influencers',
  },
  {
    name: 'Coral Beach Club',
    location: 'Amwaj Islands',
    description: 'Established beach club with pools, beach, and water sports. Popular with families and groups.',
    vibe: 'Family-friendly',
    dayPass: 'BD 25-40',
    membership: 'Available',
    bestFor: 'Families, groups',
  },
  {
    name: 'Hawar Islands Resort',
    location: 'Hawar Islands',
    description: 'Remote island resort with pristine beaches and wildlife. Day trips available by boat for a unique escape.',
    vibe: 'Adventure',
    dayPass: 'BD 50+ (includes boat)',
    membership: 'Resort packages',
    bestFor: 'Nature lovers, adventure',
  },
];

const budgetOptions = [
  { name: 'Public Beaches', location: 'Various', description: 'Free beach access at Amwaj, Jaw, and other public areas. Basic facilities.', price: 'Free', facilities: 'Basic' },
  { name: 'Lost Paradise Pool', location: 'Sakhir', description: 'Waterpark entry includes pools, slides, and all-day fun.', price: 'BD 18-28', facilities: 'Waterpark' },
  { name: 'Hotel Happy Hours', location: 'Various', description: 'Some hotels offer discounted afternoon rates (2-6pm). Call to inquire.', price: 'BD 10-18', facilities: 'Varies' },
];

const seasonalTips = [
  { season: 'Summer (May-Sep)', advice: 'Peak pool season. Book cabanas in advance. Morning visits (before 11am) are less crowded and cooler.', pricing: 'Higher rates, book ahead' },
  { season: 'Winter (Nov-Feb)', advice: 'Pleasant weather but pools may be too cool for some. Heated pools at luxury hotels. Great for beach clubs.', pricing: 'Lower rates, deals available' },
  { season: 'Ramadan', advice: 'Pools still available for non-Muslims. Expect quieter atmosphere and possible restaurant closures during day.', pricing: 'Special Ramadan packages' },
  { season: 'Weekends (Thu-Fri)', advice: 'Busiest days. Prices often higher. Book in advance for cabanas and beach clubs.', pricing: 'Weekend premium rates' },
];

const whatToExpect = [
  { item: 'Included', details: 'Pool access, beach (where available), towels, sun loungers, changing facilities' },
  { item: 'Extra Cost', details: 'Food & beverages, cabanas/daybeds, water sports, spa treatments' },
  { item: 'Dress Code', details: 'Swimwear at pool only. Cover-up required in restaurant areas' },
  { item: 'Booking', details: 'Advance booking recommended, especially weekends. Call hotel directly for best rates' },
  { item: 'Children', details: 'Most hotels welcome kids. Some beach clubs are adults-only. Check before booking' },
  { item: 'Time Slots', details: 'Typical access 9am-7pm. Some offer half-day rates. Sunset sessions popular' },
];

const faqs = [
  { q: 'Which hotel has the best pool in Bahrain?', a: 'Four Seasons Bahrain Bay is widely considered to have the best hotel pool, with stunning infinity pools overlooking the bay. The Ritz-Carlton offers the most extensive pool complex with multiple pools and a private beach. Both offer premium day passes.' },
  { q: 'How much is a pool day pass in Bahrain?', a: 'Pool day passes in Bahrain range from BD 15-25 at mid-range hotels to BD 35-60+ at luxury properties like Four Seasons and Ritz-Carlton. Weekend rates are typically BD 10-15 higher. Most include pool, towels, and basic facilities.' },
  { q: 'Are there adults-only pools in Bahrain?', a: 'Yes, Jumeirah Royal Saray offers an adults-only beach club experience. Several luxury hotels also have designated adults-only pool areas. Beach clubs like Marassi tend to have a more adult-oriented atmosphere, especially on weekdays.' },
  { q: 'Can non-guests use hotel pools in Bahrain?', a: 'Yes, most hotels in Bahrain offer day passes to non-guests. Call ahead to confirm availability and rates, especially during peak season and weekends. Some hotels may require advance booking.' },
  { q: 'What are the best beach clubs in Bahrain?', a: 'Top beach clubs include Marassi Beach Club (upscale, Diyar), Coral Beach Club (family-friendly, Amwaj), and the beach clubs at Four Seasons and Ritz-Carlton. Hawar Islands Resort offers a unique remote beach experience.' },
];

export default function PoolDayPassesBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-cyan-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Pool Day Passes', url: 'https://www.bahrainnights.com/guides/pool-day-passes-bahrain' },
      ]} />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-medium mb-4">
              🏊 Pool Guide 2026
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Pool Day Passes
              </span>
              {' '}in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Beat the heat at Bahrain&apos;s best hotel pools and beach clubs. From luxury infinity pools overlooking the bay to family-friendly resorts — find your perfect pool day.
            </p>
            <p className="text-sm text-gray-500 mt-4">Last updated: {lastUpdated}</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Hotel Pools', value: '20+', icon: Waves },
              { label: 'Price From', value: 'BD 15', icon: DollarSign },
              { label: 'Beach Clubs', value: '5+', icon: Umbrella },
              { label: 'Best Season', value: 'Year-round', icon: Sun },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-cyan-400" />
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
              With Bahrain&apos;s warm climate, a pool day is the perfect escape from the heat. The kingdom&apos;s luxury hotels and beach clubs offer exceptional pool facilities with day passes available to non-guests. Whether you&apos;re seeking a tranquil infinity pool with bay views, a family-friendly resort with water slides, or a trendy beach club scene, there&apos;s an option for every mood and budget.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mt-4">
              This comprehensive guide covers all the best pool day passes in Bahrain, from five-star luxury to budget-friendly options, including pricing, facilities, and insider tips to maximize your pool day experience.
            </p>
          </div>
        </div>
      </section>

      {/* Luxury Pools */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Luxury Hotel Pools</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">The finest pool experiences in Bahrain with premium amenities and service.</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {luxuryPools.map((pool) => (
              <div 
                key={pool.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold">{pool.name}</h3>
                    <p className="text-cyan-400 text-sm flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {pool.location}
                    </p>
                  </div>
                  <div className="flex">
                    {[...Array(pool.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-4">{pool.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-400">Weekday:</span>
                    <span className="text-white font-bold ml-2">{pool.weekdayPrice}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Weekend:</span>
                    <span className="text-white font-bold ml-2">{pool.weekendPrice}</span>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-400">Pools:</span> {pool.pools}</p>
                  <p><span className="text-gray-400">Facilities:</span> {pool.facilities}</p>
                  <p><span className="text-gray-400">Includes:</span> {pool.includes}</p>
                  <p className="flex items-center gap-1">
                    <Phone className="w-4 h-4 text-cyan-400" />
                    <span className="text-cyan-400">{pool.contact}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mid-Range Pools */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Mid-Range Hotel Pools</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Great value pool options with solid amenities.</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {midRangePools.map((pool) => (
              <div 
                key={pool.name}
                className="bg-white/5 rounded-xl p-5 hover:bg-white/10 transition-all"
              >
                <h3 className="font-bold text-lg mb-1">{pool.name}</h3>
                <p className="text-cyan-400 text-sm mb-2">{pool.location}</p>
                <p className="text-gray-300 text-sm mb-3">{pool.description}</p>
                <div className="text-xl font-bold text-white mb-2">{pool.price}</div>
                <p className="text-xs text-gray-400">Includes: {pool.includes}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beach Clubs */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Beach Clubs</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Sun, sand, and style at Bahrain&apos;s best beach clubs.</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {beachClubs.map((club) => (
              <div 
                key={club.name}
                className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all"
              >
                <span className="inline-block px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded mb-3">{club.vibe}</span>
                <h3 className="font-bold text-lg mb-1">{club.name}</h3>
                <p className="text-cyan-400 text-sm mb-3">{club.location}</p>
                <p className="text-gray-300 text-sm mb-4">{club.description}</p>
                <div className="text-xl font-bold text-white mb-2">{club.dayPass}</div>
                <p className="text-xs text-gray-400">Best for: {club.bestFor}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Budget Options */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Budget-Friendly Options</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {budgetOptions.map((option) => (
              <div 
                key={option.name}
                className="bg-white/5 rounded-xl p-5"
              >
                <h3 className="font-bold text-lg mb-1">{option.name}</h3>
                <p className="text-cyan-400 text-sm mb-2">{option.location}</p>
                <p className="text-gray-300 text-sm mb-3">{option.description}</p>
                <div className="text-xl font-bold text-green-400">{option.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">What to Expect</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {whatToExpect.map((item) => (
              <div key={item.item} className="bg-white/5 rounded-xl p-4">
                <h3 className="font-semibold text-cyan-400 mb-1">{item.item}</h3>
                <p className="text-sm text-gray-300">{item.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Tips */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Seasonal Tips</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {seasonalTips.map((tip) => (
              <div key={tip.season} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-cyan-400 mb-2">{tip.season}</h3>
                <p className="text-sm text-gray-300 mb-2">{tip.advice}</p>
                <p className="text-xs text-amber-400">{tip.pricing}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white/5 rounded-xl p-6">
                <h3 className="font-bold text-cyan-400 mb-2">{faq.q}</h3>
                <p className="text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for a Pool Day?</h2>
          <p className="text-gray-300 mb-8">
            Explore more things to do in Bahrain or plan your perfect weekend.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/things-to-do"
              className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg transition-colors"
            >
              Things to Do
            </Link>
            <Link 
              href="/guides/brunches"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              Friday Brunches
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(faq => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a,
              },
            })),
          }),
        }}
      />

      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Best Pool Day Passes in Bahrain 2026',
            description: 'Complete guide to hotel pools and beach clubs with day passes in Bahrain.',
            author: { '@type': 'Organization', name: 'BahrainNights' },
            publisher: { '@type': 'Organization', name: 'BahrainNights' },
            datePublished: '2026-01-25',
            dateModified: lastUpdated,
          }),
        }}
      />
    </div>
  );
}
