import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, Sun, Waves, DollarSign } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Pool Day Passes in Bahrain 2026 | Beach Clubs & Hotel Pools',
  description: 'Find the best pool day passes in Bahrain. From luxury hotel pools to beach clubs. Complete guide to day passes, prices, and amenities at Bahrain\'s top pools.',
  keywords: 'pool day pass Bahrain, beach club Bahrain, hotel pool Bahrain, swimming Bahrain, day pass Bahrain, pool party Bahrain, beach day Bahrain',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/pool-day-passes-bahrain' },
  openGraph: {
    title: 'Best Pool Day Passes in Bahrain 2026',
    description: 'Your guide to the best pool and beach day passes in Bahrain.',
    type: 'article',
    locale: 'en_BH',
  },
};

const faqs = [
  { q: 'Which hotels in Bahrain offer pool day passes?', a: 'Most five-star hotels offer day passes including Four Seasons, Ritz-Carlton, Sofitel, Jumeirah, and Gulf Hotel. Prices range from BD 15-50 depending on the property and day.' },
  { q: 'How much is a pool day pass in Bahrain?', a: 'Budget options start around BD 10-15 (three-star hotels). Mid-range is BD 20-30. Luxury hotels like Four Seasons and Ritz-Carlton charge BD 35-50, often including food/drink credit.' },
  { q: 'Are there beach clubs in Bahrain?', a: 'Yes! Coral Bay, Al Bandar Resort, and Marassi Beach are popular beach options. Several hotels have private beaches attached to their pool areas.' },
  { q: 'Do pool day passes include food and drinks?', a: 'Many luxury hotels include BD 10-20 food/drink credit with day passes. Others offer packages with lunch included. Budget options typically don\'t include F&B.' },
  { q: 'When is the best time for pool days in Bahrain?', a: 'October to April offers perfect weather. Summer (May-September) is very hot — go early morning or late afternoon. Weekdays are less crowded than weekends.' },
];

const venues = [
  { 
    name: 'Four Seasons Pool', 
    location: 'Bahrain Bay',
    type: 'Luxury Hotel Pool',
    price: 'BD 40-50',
    includes: 'BD 20 F&B credit, towels, loungers',
    highlight: 'Stunning infinity pool overlooking the bay',
    amenities: ['Infinity Pool', 'Private Beach', 'Cabanas', 'Pool Bar'],
    rating: 4.9,
  },
  { 
    name: 'Ritz-Carlton Pool & Beach', 
    location: 'Seef',
    type: 'Luxury Hotel Pool & Beach',
    price: 'BD 35-45',
    includes: 'Towels, loungers, beach access',
    highlight: 'Multiple pools plus private beach',
    amenities: ['Adult Pool', 'Family Pool', 'Beach', 'Spa Access'],
    rating: 4.8,
  },
  { 
    name: 'Jumeirah Royal Saray', 
    location: 'Seef',
    type: 'Luxury Resort Pool',
    price: 'BD 30-40',
    includes: 'Towels, loungers',
    highlight: 'Resort-style pool with Arabian Gulf views',
    amenities: ['Large Pool', 'Beach Access', 'Kids Pool', 'Pool Bar'],
    rating: 4.7,
  },
  { 
    name: 'Sofitel Pool', 
    location: 'Zallaq',
    type: 'Beach Resort Pool',
    price: 'BD 25-35',
    includes: 'Towels, loungers',
    highlight: 'Beachfront resort atmosphere',
    amenities: ['Pool', 'Private Beach', 'Water Sports', 'Restaurant'],
    rating: 4.5,
  },
  { 
    name: 'Coral Bay', 
    location: 'South Coast',
    type: 'Beach Club',
    price: 'BD 10-15',
    includes: 'Beach access',
    highlight: 'Popular local beach, family-friendly',
    amenities: ['Beach', 'Swimming', 'Jet Ski Rentals', 'Cafes'],
    rating: 4.2,
  },
  { 
    name: 'Al Bandar Resort', 
    location: 'Sitra',
    type: 'Beach Resort',
    price: 'BD 15-20',
    includes: 'Pool and beach access',
    highlight: 'Good value resort with beach',
    amenities: ['Pool', 'Beach', 'Restaurants', 'Water Sports'],
    rating: 4.3,
  },
  { 
    name: 'Gulf Hotel Pool', 
    location: 'Adliya',
    type: 'Hotel Pool',
    price: 'BD 20-25',
    includes: 'Towels, loungers',
    highlight: 'Central location, well-maintained pool',
    amenities: ['Pool', 'Gym Access', 'Poolside Dining'],
    rating: 4.4,
  },
  { 
    name: 'Marassi Beach', 
    location: 'Diyar Al Muharraq',
    type: 'Beach Development',
    price: 'BD 5-10',
    includes: 'Beach access',
    highlight: 'Public beach with facilities',
    amenities: ['Beach', 'Restaurants', 'Promenade', 'Activities'],
    rating: 4.1,
  },
];

export default function PoolDayPassesBahrainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-cyan-950/20 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Pool Day Passes', url: 'https://www.bahrainnights.com/guides/pool-day-passes-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-medium mb-4">🏊 Activity Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Pool Day Passes</span> in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From luxury hotel infinity pools to beach clubs and public beaches — 
              discover the best ways to cool off and soak up the sun in Bahrain.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
          <p>
            In Bahrain&apos;s warm climate, a pool day is always a good idea. The Kingdom offers 
            excellent options ranging from world-class five-star hotel pools with stunning 
            views to affordable beach clubs perfect for families. Whether you&apos;re looking for 
            a luxurious escape with cabanas and cocktails or a simple beach day, this guide 
            has you covered.
          </p>
          <p>
            Day passes give you access to facilities normally reserved for hotel guests. 
            Many include food and beverage credits, making them excellent value for a full 
            day of relaxation. Book ahead on weekends, especially during the cooler months 
            when pools are most popular.
          </p>
        </div>
      </section>

      {/* Venue Cards */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Top Pool & Beach Spots</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {venues.map((venue, index) => (
              <div 
                key={venue.name}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-cyan-400/50 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-cyan-400 text-sm font-medium">#{index + 1}</span>
                    <h3 className="text-xl font-bold text-white">{venue.name}</h3>
                    <p className="text-gray-400 text-sm flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {venue.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-cyan-500/20 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                    <span className="text-cyan-400 font-medium">{venue.rating}</span>
                  </div>
                </div>
                <p className="text-blue-400 text-sm mb-2">{venue.type}</p>
                <p className="text-gray-300 text-sm mb-2">{venue.highlight}</p>
                <p className="text-gray-400 text-sm mb-3">Includes: {venue.includes}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {venue.amenities.map((amenity, i) => (
                    <span key={i} className="text-xs bg-white/10 px-2 py-1 rounded-full text-gray-300">
                      {amenity}
                    </span>
                  ))}
                </div>
                <p className="text-green-400 font-medium">{venue.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-12 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Pool Day Tips</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-cyan-400 mb-2">📅 Book Ahead</h3>
              <p className="text-gray-300 text-sm">
                Weekends and holidays get busy. Call ahead or book online, especially for 
                popular spots like Four Seasons. Weekdays offer quieter experiences.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-cyan-400 mb-2">☀️ Best Seasons</h3>
              <p className="text-gray-300 text-sm">
                October to April is ideal — warm but not scorching. Summer pool days are 
                best early morning or late afternoon to avoid peak heat.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-cyan-400 mb-2">💰 Value Packages</h3>
              <p className="text-gray-300 text-sm">
                Look for packages that include lunch or F&B credit — they often offer 
                better value than basic day passes. Some hotels offer spa + pool combos.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-cyan-400 mb-2">👨‍👩‍👧 Family vs Adult</h3>
              <p className="text-gray-300 text-sm">
                Some pools are adult-only or have adult-only hours. Check policies if 
                bringing children. Beach clubs are generally more family-friendly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More Activities</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guides/beach-clubs" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all">
              Beach Clubs →
            </Link>
            <Link href="/guides/spa-wellness-bahrain" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all">
              Spa & Wellness →
            </Link>
            <Link href="/attractions" className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full font-medium transition-all">
              All Attractions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
