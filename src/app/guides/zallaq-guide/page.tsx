import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Waves, Hotel, Utensils, Car, Star,
  Sun, TreePalm, Clock, Users, Sparkles
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Zallaq Guide — Beaches, Resorts & Things to Do | Bahrain 2026',
  description: 'Complete guide to Zallaq, Bahrain. Discover the best beach resorts, restaurants, water parks, and things to do on Bahrain\'s scenic western coast.',
  keywords: 'Zallaq Bahrain, Zallaq beach, Zallaq resorts, Lost Paradise Dilmun, things to do Zallaq, Zallaq guide, Al Jazayer Beach, Bahrain beach',
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/zallaq-guide',
  },
  openGraph: {
    title: 'Zallaq Guide — Beaches, Resorts & Things to Do',
    description: 'Discover Zallaq: Bahrain\'s western coast destination with beaches, resorts, and family attractions.',
    type: 'article',
    locale: 'en_US',
  },
};

const faqs = [
  { 
    q: 'What is Zallaq known for in Bahrain?', 
    a: 'Zallaq is Bahrain\'s premier beach destination, known for its resorts, the Lost Paradise of Dilmun Water Park, Al Jazayer Beach, and the beautiful western coastline. It\'s where Bahrainis go for staycations, beach days, and weekend escapes from the city.' 
  },
  { 
    q: 'What are the best resorts in Zallaq?', 
    a: 'Top Zallaq resorts include Sofitel Bahrain Zallaq Thalassa Sea & Spa, The Art Hotel & Resort, and Beach Rotana. These offer private beaches, pools, spa facilities, and multiple dining options. Day passes are available at most resorts.' 
  },
  { 
    q: 'Is there a public beach in Zallaq?', 
    a: 'Yes, Al Jazayer Beach is a public beach in Zallaq with facilities. There are also beach access points along the coast. For a more premium experience, resort day passes provide access to private beaches with full amenities.' 
  },
  { 
    q: 'What is Lost Paradise of Dilmun Water Park?', 
    a: 'Lost Paradise of Dilmun is Bahrain\'s largest water park, located in Zallaq. It features water slides, wave pools, lazy rivers, and kids areas themed around the ancient Dilmun civilization. Open year-round with seasonal hours.' 
  },
  { 
    q: 'How far is Zallaq from Manama?', 
    a: 'Zallaq is approximately 25-30 km from Manama city center, about 30-40 minutes drive. The scenic coastal road provides beautiful views. Own transport is recommended as public transport to Zallaq is limited.' 
  },
];

const resorts = [
  {
    name: 'Sofitel Bahrain Zallaq Thalassa Sea & Spa',
    type: '5-Star Resort',
    rating: 5,
    priceRange: 'BD 120-250/night',
    highlights: ['Private beach', 'Thalassa spa', 'Multiple restaurants', 'Kids club'],
    bestFor: 'Luxury staycation, spa lovers',
  },
  {
    name: 'Art Rotana Amwaj Islands',
    type: '5-Star Resort',
    rating: 5,
    priceRange: 'BD 100-200/night',
    highlights: ['Beach access', 'Multiple pools', 'Fine dining', 'Golf nearby'],
    bestFor: 'Business + leisure, families',
  },
  {
    name: 'Beach Rotana',
    type: '4-Star Resort',
    rating: 4,
    priceRange: 'BD 80-150/night',
    highlights: ['Beachfront', 'Water sports', 'Multiple outlets', 'Day passes'],
    bestFor: 'Affordable luxury, beach lovers',
  },
  {
    name: 'The Art Hotel & Resort',
    type: 'Boutique Resort',
    rating: 4,
    priceRange: 'BD 70-130/night',
    highlights: ['Artistic design', 'Private beach', 'Unique rooms', 'Pool'],
    bestFor: 'Couples, unique experience',
  },
];

const attractions = [
  { 
    name: 'Lost Paradise of Dilmun Water Park', 
    icon: Waves, 
    desc: 'Bahrain\'s largest water park with slides, wave pools, and Dilmun-themed attractions',
    price: 'BD 18-22 adults'
  },
  { 
    name: 'Al Jazayer Beach', 
    icon: Sun, 
    desc: 'Public beach with facilities, perfect for family picnics and swimming',
    price: 'Free entry'
  },
  { 
    name: 'Al Areen Wildlife Park', 
    icon: TreePalm, 
    desc: 'Arabian wildlife reserve with safari tours and nature walks',
    price: 'BD 2-4'
  },
  { 
    name: 'Resort Day Passes', 
    icon: Hotel, 
    desc: 'Access private beaches, pools, and facilities at Zallaq resorts',
    price: 'BD 20-50'
  },
  { 
    name: 'Bahrain International Circuit', 
    icon: Car, 
    desc: 'Home of F1 Bahrain GP, offers track experiences and driving courses',
    price: 'Varies'
  },
  { 
    name: 'Sunset Beach Walks', 
    icon: Sparkles, 
    desc: 'The western coast offers some of Bahrain\'s best sunset views',
    price: 'Free'
  },
];

const restaurants = [
  { name: 'Resort Restaurants', type: 'Various', desc: 'Multiple dining options at Sofitel, Art Hotel, and Beach Rotana' },
  { name: 'Byblos Sur Mer', type: 'Lebanese', desc: 'Lebanese cuisine with sea views at Sofitel' },
  { name: 'La Mer', type: 'Mediterranean', desc: 'Fine dining at Sofitel with fresh seafood' },
  { name: 'Water Park Eateries', type: 'Casual', desc: 'Various food options inside Lost Paradise' },
];

export default function ZallaqGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-cyan-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Zallaq Guide', url: 'https://www.bahrainnights.com/guides/zallaq-guide' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-medium mb-4">
              🏖️ Beach Destination
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Zallaq
              </span>
              {' '}Guide
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Bahrain&apos;s beach paradise — luxury resorts, pristine coastline, 
              water parks, and the perfect escape from city life.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Beach Resorts', value: '4+', icon: Hotel },
              { label: 'From Manama', value: '35 min', icon: Car },
              { label: 'Water Park', value: 'Yes', icon: Waves },
              { label: 'Vibe', value: 'Resort', icon: Sun },
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

      {/* About Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Bahrain&apos;s Beach Escape</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Zallaq represents Bahrain&apos;s answer to beach resort destinations. Stretching along 
              the western coast, this area has transformed from quiet fishing villages into a 
              collection of luxury resorts, beach clubs, and family attractions. It&apos;s where 
              Bahrainis go to escape the city, enjoy the sea, and spend quality time with family.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              The star attraction is undoubtedly the Lost Paradise of Dilmun Water Park, 
              Bahrain&apos;s largest water park themed around the ancient civilization that once 
              thrived on these islands. With its wave pools, water slides, and lazy rivers, 
              it draws families from across the Gulf region, especially during the hot summer months.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Beyond the water park, Zallaq&apos;s resorts offer everything from luxurious spa 
              treatments at Sofitel&apos;s renowned Thalassa spa to private beaches where you 
              can spend the day swimming, lounging, and enjoying the Gulf waters. Many resorts 
              offer day passes, making Zallaq accessible even without an overnight stay.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              The area is also home to Al Areen Wildlife Park, where Arabian oryx and other 
              native species roam, and is conveniently close to the Bahrain International 
              Circuit — home of the Formula 1 Bahrain Grand Prix. Whether you&apos;re seeking 
              relaxation, adventure, or family fun, Zallaq delivers.
            </p>
          </div>
        </div>
      </section>

      {/* Resorts */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Beach Resorts in Zallaq</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Luxury beachfront resorts offering staycations, day passes, and world-class amenities
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {resorts.map((resort) => (
              <div 
                key={resort.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{resort.name}</h3>
                    <p className="text-cyan-400 text-sm">{resort.type}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">{resort.priceRange}</div>
                    <div className="flex items-center gap-1 justify-end">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${i < resort.rating ? 'text-cyan-400 fill-cyan-400' : 'text-gray-600'}`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {resort.highlights.map((h) => (
                    <span key={h} className="text-xs bg-white/10 px-2 py-1 rounded">
                      {h}
                    </span>
                  ))}
                </div>
                
                <p className="text-sm text-gray-400">
                  <strong className="text-gray-300">Best for:</strong> {resort.bestFor}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Attractions */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Things to Do in Zallaq</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attractions.map((attraction) => (
              <div key={attraction.name} className="bg-white/5 rounded-xl p-6">
                <div className="flex justify-between items-start mb-3">
                  <attraction.icon className="w-8 h-8 text-cyan-400" />
                  <span className="text-sm text-cyan-300 font-medium">{attraction.price}</span>
                </div>
                <h3 className="font-bold mb-2">{attraction.name}</h3>
                <p className="text-gray-400 text-sm">{attraction.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dining */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Dining in Zallaq</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {restaurants.map((restaurant) => (
              <div key={restaurant.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold mb-1">{restaurant.name}</h3>
                <p className="text-cyan-400 text-sm mb-2">{restaurant.type}</p>
                <p className="text-gray-400 text-xs">{restaurant.desc}</p>
              </div>
            ))}
          </div>
          
          <p className="text-center text-gray-500 text-sm mt-8">
            Note: Most dining options in Zallaq are within resorts. The area has limited standalone restaurants.
          </p>
        </div>
      </section>

      {/* Practical Info */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Practical Information</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-xl p-6">
              <Car className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="font-bold mb-2">Getting There</h3>
              <p className="text-gray-400 text-sm">
                30-40 minutes from Manama via the coastal road. Own transport essential 
                as public transport is very limited. Plenty of parking at all venues.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <Clock className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="font-bold mb-2">Best Time to Visit</h3>
              <p className="text-gray-400 text-sm">
                October to April for pleasant beach weather. Water park is 
                popular year-round with cooler pools in summer. Avoid midday 
                sun from June to August.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <Users className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="font-bold mb-2">Day Passes</h3>
              <p className="text-gray-400 text-sm">
                Most resorts offer day passes (BD 20-50) including beach access, 
                pool, and some F&B credit. Book ahead on weekends. Lost Paradise 
                water park: BD 18-22.
              </p>
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
                <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-6">Explore More Areas</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Budaiya', href: '/guides/budaiya-guide', emoji: '🌴' },
              { title: 'Riffa', href: '/guides/riffa-guide', emoji: '🏰' },
              { title: 'Amwaj', href: '/guides/amwaj-islands-guide', emoji: '🏝️' },
              { title: 'Beach Clubs', href: '/guides/beach-clubs', emoji: '☀️' },
            ].map((guide) => (
              <Link key={guide.href} href={guide.href} className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors flex items-center gap-3">
                <span className="text-2xl">{guide.emoji}</span>
                <span className="font-medium">{guide.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Plan Your Beach Day</h2>
          <p className="text-gray-300 mb-8">
            Discover beaches, pools, and coastal attractions across Bahrain.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/pool-day-passes-bahrain"
              className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-white font-bold rounded-lg transition-colors"
            >
              Pool Day Passes
            </Link>
            <Link 
              href="/guides/beach-clubs"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              Beach Clubs Guide
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
            headline: 'Zallaq Guide — Beaches, Resorts & Things to Do',
            description: 'Complete guide to Zallaq, Bahrain with beaches, resorts, and activities.',
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
