import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Flag, Clock, MapPin, Star,
  Sun, DollarSign, Users, Calendar
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Golf Courses in Bahrain 2025 | Royal Golf Club & Driving Ranges',
  description: 'Discover golf in Bahrain! Complete guide to Royal Golf Club, Awali Golf Club, driving ranges, green fees, memberships, and golf facilities.',
  keywords: 'golf Bahrain, Royal Golf Club Bahrain, Awali Golf Club, golf courses Bahrain, driving range Bahrain, golf membership Bahrain, best golf Manama',
  openGraph: {
    title: 'Golf Courses in Bahrain 2025 | Royal Golf Club & Driving Ranges',
    description: 'Your guide to playing golf in Bahrain.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/golf',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/golf',
  },
};

const golfCourses = [
  {
    name: 'Royal Golf Club',
    location: 'Riffa Views',
    type: 'Championship Course',
    rating: 5,
    holes: 18,
    par: 72,
    designer: 'Colin Montgomerie',
    description: 'Bahrain\'s premier championship golf course designed by Colin Montgomerie. Beautiful desert-links layout with stunning views of Riffa Valley. Home to professional tournaments.',
    greenFees: {
      weekday: 'BD 50-65',
      weekend: 'BD 60-75',
      twilight: 'BD 35-45',
    },
    facilities: ['Pro shop', 'Driving range', 'Practice greens', 'Golf academy', 'Club rental', 'Restaurant', 'Locker rooms'],
    courseFeatures: ['Links-style holes', 'Desert landscaping', 'Water features', 'Challenging bunkers', 'Immaculate greens'],
    amenities: 'Full clubhouse with dining, bar, and terrace with course views',
    hours: '6AM-7PM (last tee time 5PM)',
    contact: 'Book via website or call',
    bestFor: 'Serious golfers, visitors, tournaments',
  },
  {
    name: 'Awali Golf Club',
    location: 'Awali',
    type: 'Members Club',
    rating: 4,
    holes: 18,
    par: 72,
    designer: 'Traditional layout',
    description: 'Historic 18-hole sand course established in 1938, making it one of the oldest golf clubs in the Gulf. Unique sand "browns" instead of grass greens.',
    greenFees: {
      weekday: 'BD 15-20',
      weekend: 'BD 20-25',
      twilight: 'BD 10-15',
    },
    facilities: ['Clubhouse', 'Driving range', 'Pro shop', 'Club rental', 'Lessons available'],
    courseFeatures: ['Sand greens (browns)', 'Desert course', 'Floodlit driving range', 'Historic layout'],
    amenities: 'Traditional clubhouse with dining facilities',
    hours: '6AM-8PM',
    contact: 'Visitors welcome, call ahead',
    bestFor: 'Unique experience, budget golfers, history lovers',
  },
  {
    name: 'Royal Golf Club Driving Range',
    location: 'Riffa Views',
    type: 'Practice Facility',
    rating: 5,
    holes: 0,
    par: 0,
    designer: 'N/A',
    description: 'State-of-the-art driving range attached to Royal Golf Club with covered and open bays, target greens, and professional instruction.',
    greenFees: {
      weekday: 'BD 5-8 per bucket',
      weekend: 'BD 5-8 per bucket',
      twilight: 'Same',
    },
    facilities: ['50+ hitting bays', 'Covered section', 'Target greens', 'Short game area', 'Lessons'],
    courseFeatures: ['Floodlit for evening practice', 'All skill levels welcome', 'Club rental available'],
    amenities: 'Full clubhouse access',
    hours: '6AM-10PM',
    contact: 'Walk-ins welcome',
    bestFor: 'Practice, beginners, non-members',
  },
];

const golfTips = [
  {
    title: 'Best Time to Play',
    content: 'October-April offers pleasant weather (18-28°C). Summer rounds should start at dawn (6AM tee times). Twilight offers good value.',
  },
  {
    title: 'Dress Code',
    content: 'Collared shirts required. No jeans or shorts above knee. Soft spikes only. Royal Golf Club enforces strict dress standards.',
  },
  {
    title: 'Booking',
    content: 'Royal Golf Club: Book 2-7 days in advance online. Weekends fill up fast. Awali more flexible for walk-ins.',
  },
  {
    title: 'Visitors',
    content: 'Both clubs welcome visitors. Green fees include cart at Royal. Handicap certificate may be required for Royal Golf Club.',
  },
  {
    title: 'Hydration',
    content: 'Essential! Drink water throughout your round. Beverage carts circulate on course. Bring extra water in summer.',
  },
  {
    title: 'Club Rental',
    content: 'Quality rental sets available at both clubs (BD 15-25). Callaway/TaylorMade at Royal GC.',
  },
];

const membershipInfo = [
  {
    type: 'Royal Golf Club Annual',
    price: 'BD 2,500-4,000',
    benefits: 'Unlimited golf, driving range, tournaments, reciprocal clubs, discounts',
  },
  {
    type: 'Royal Golf Club Corporate',
    price: 'BD 5,000+',
    benefits: 'Multiple users, client entertainment, branded events',
  },
  {
    type: 'Awali Golf Club',
    price: 'BD 300-600',
    benefits: 'Unlimited play, social events, historic club atmosphere',
  },
  {
    type: 'Junior Programs',
    price: 'BD 500-1,000',
    benefits: 'Academy coaching, competitions, equipment deals',
  },
];

export default function GolfPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-green-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Golf', url: 'https://www.bahrainnights.com/guides/golf' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium mb-4">
              ⛳ Golf Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                Golf Courses
              </span>
              {' '}in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From the championship fairways of Royal Golf Club to the historic sands of Awali — 
              discover golf in the Kingdom of Bahrain.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Golf Courses', value: '2', icon: Flag },
              { label: 'Green Fee From', value: 'BD 15', icon: DollarSign },
              { label: 'Best Season', value: 'Oct-Apr', icon: Sun },
              { label: 'Total Holes', value: '36', icon: Star },
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

      {/* Golf Courses */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Golf Courses & Facilities</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Complete guide to golf venues with green fees and booking information.
          </p>
          
          <div className="space-y-8">
            {golfCourses.map((course) => (
              <div 
                key={course.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-2xl font-bold">{course.name}</h3>
                        <p className="text-green-400 text-sm flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {course.location} • {course.type}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex">
                          {[...Array(course.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-green-400 fill-green-400" />
                          ))}
                        </div>
                        {course.holes > 0 && (
                          <span className="text-sm text-gray-400">{course.holes} holes • Par {course.par}</span>
                        )}
                      </div>
                    </div>
                    
                    {course.designer !== 'N/A' && (
                      <p className="text-sm text-green-300 mb-2">Designed by: {course.designer}</p>
                    )}
                    
                    <p className="text-gray-300 mb-4">{course.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {course.courseFeatures.map((f) => (
                        <span key={f} className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">
                          {f}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-4 bg-black/20 rounded-lg p-4">
                      <div>
                        <p className="text-xs text-gray-400">Weekday</p>
                        <p className="font-bold text-green-400">{course.greenFees.weekday}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Weekend</p>
                        <p className="font-bold text-green-400">{course.greenFees.weekend}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Twilight</p>
                        <p className="font-bold text-green-400">{course.greenFees.twilight}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:w-1/3 space-y-2 text-sm bg-black/20 rounded-xl p-4">
                    <p><strong className="text-gray-400">Hours:</strong> {course.hours}</p>
                    <p><strong className="text-gray-400">Booking:</strong> {course.contact}</p>
                    <p><strong className="text-gray-400">Amenities:</strong> {course.amenities}</p>
                    <div className="pt-2">
                      <strong className="text-gray-400">Facilities:</strong>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {course.facilities.slice(0, 5).map((f) => (
                          <span key={f} className="text-xs bg-white/10 px-2 py-0.5 rounded">{f}</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-green-400 italic pt-2">Best for: {course.bestFor}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Memberships */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Membership Options</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {membershipInfo.map((mem) => (
              <div key={mem.type} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-green-400 mb-1">{mem.type}</h3>
                <p className="text-2xl font-bold mb-2">{mem.price}</p>
                <p className="text-sm text-gray-400">{mem.benefits}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Golf Tips for Bahrain</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {golfTips.map((tip) => (
              <div key={tip.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-green-400 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-300">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Tee Off?</h2>
          <p className="text-gray-300 mb-8">
            Explore more outdoor activities in Bahrain.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/outdoor-activities"
              className="px-8 py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded-lg transition-colors"
            >
              Outdoor Activities
            </Link>
            <Link 
              href="/guides/hotels"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              Stay Near Golf
            </Link>
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Outdoor Activities', href: '/guides/outdoor-activities', emoji: '🌴' },
              { title: 'Best Hotels', href: '/guides/hotels', emoji: '🏨' },
              { title: 'Spas & Wellness', href: '/guides/spas', emoji: '💆' },
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
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {[
              {
                q: 'What are the golf courses in Bahrain?',
                a: 'Bahrain has two main golf courses: Royal Golf Club (18-hole championship course designed by Colin Montgomerie) and Awali Golf Club (historic 18-hole sand course from 1938).',
              },
              {
                q: 'How much does it cost to play golf in Bahrain?',
                a: 'Green fees range from BD 15-25 at Awali Golf Club to BD 50-75 at Royal Golf Club. Twilight rates offer savings of 25-40%.',
              },
              {
                q: 'When is the best time to play golf in Bahrain?',
                a: 'October to April offers the best weather (18-28°C). Summer months are very hot — if playing, book dawn tee times (6AM) and hydrate constantly.',
              },
              {
                q: 'Can visitors play golf in Bahrain?',
                a: 'Yes, both clubs welcome visitors. Royal Golf Club may require handicap certificates for course access. Booking in advance is recommended.',
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

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Golf Courses in Bahrain 2025 | Royal Golf Club & Driving Ranges',
            description: 'Complete guide to golf in Bahrain including Royal Golf Club, Awali Golf Club, and driving ranges.',
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
              '@id': 'https://bahrainnights.com/guides/golf',
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
                name: 'What are the golf courses in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Bahrain has Royal Golf Club (championship) and Awali Golf Club (historic sand course).',
                },
              },
              {
                '@type': 'Question',
                name: 'How much does it cost to play golf in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Green fees range from BD 15-25 at Awali to BD 50-75 at Royal Golf Club.',
                },
              },
              {
                '@type': 'Question',
                name: 'When is the best time to play golf in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'October to April offers the best weather for golf in Bahrain.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
