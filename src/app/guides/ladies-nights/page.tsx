import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Sparkles, Wine, Clock, MapPin, Calendar, Star,
  ArrowRight, Users, Music, Heart, Gift
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Ladies Nights in Bahrain 2026 | Free Drinks & Best Deals',
  description: 'Find the best ladies nights in Bahrain! Free drinks, free entry, and special offers for women every week. Complete guide to ladies night deals in Manama, Juffair & more.',
  keywords: 'ladies nights Bahrain, ladies night Bahrain, free drinks Bahrain, Bahrain ladies night deals, women night out Bahrain, girls night Bahrain, ladies night Manama',
  openGraph: {
    title: 'Ladies Nights in Bahrain 2026 | Free Drinks & Best Deals',
    description: 'Your guide to the best ladies nights in Bahrain - free drinks, free entry, and exclusive offers.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/ladies-nights',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/ladies-nights',
  },
};

const ladiesNightVenues = [
  {
    name: 'CK\'s',
    location: 'Juffair',
    day: 'Tuesday & Wednesday',
    deal: 'Free entry + unlimited selected drinks 9 PM - 12 AM',
    dressCode: 'Smart casual, no sneakers',
    vibe: 'Party, dancing, energetic',
    rating: 5,
    tip: 'Arrive early (9-10 PM) for best experience. Gets very busy after 11 PM.',
  },
  {
    name: 'Club D',
    location: 'Juffair',
    day: 'Tuesday & Wednesday',
    deal: 'Free entry + complimentary drinks until midnight',
    dressCode: 'Smart casual',
    vibe: 'Nightclub, international music',
    rating: 4,
    tip: 'Good mix of music. Can get crowded - go with a group.',
  },
  {
    name: 'Coral Bay Beach Club',
    location: 'Amwaj',
    day: 'Wednesday',
    deal: 'Free entry + 3 complimentary drinks + pool access',
    dressCode: 'Casual beach chic',
    vibe: 'Beach, relaxed, sunset',
    rating: 5,
    tip: 'Great for daytime/early evening. Bring swimwear for the pool.',
  },
  {
    name: 'Gulf Hotel - Multiple Venues',
    location: 'Adliya',
    day: 'Various nights',
    deal: 'Depends on venue - check individually',
    dressCode: 'Smart casual',
    vibe: 'Varies by venue',
    rating: 4,
    tip: 'Multiple options: Typhoon, Sherlock Holmes, Al Waha. Check their socials.',
  },
  {
    name: 'Coda Jazz Lounge',
    location: 'Seef',
    day: 'Wednesday',
    deal: 'Complimentary drinks + free entry',
    dressCode: 'Elegant casual',
    vibe: 'Sophisticated, jazz',
    rating: 4,
    tip: 'More upscale vibe. Great for a relaxed evening with live jazz.',
  },
  {
    name: 'Trader Vic\'s',
    location: 'Ritz-Carlton',
    day: 'Tuesday',
    deal: '3 complimentary cocktails + appetizers',
    dressCode: 'Smart casual',
    vibe: 'Tropical, tiki bar',
    rating: 4,
    tip: 'Unique tropical atmosphere. Famous for their Mai Tais.',
  },
  {
    name: 'Zengo',
    location: 'Grand Hyatt',
    day: 'Wednesday',
    deal: 'Selected complimentary drinks',
    dressCode: 'Smart',
    vibe: 'Asian fusion, trendy',
    rating: 4,
    tip: 'Upscale Asian restaurant with great cocktails and views.',
  },
  {
    name: 'Meisei',
    location: 'Four Seasons',
    day: 'Wednesday',
    deal: 'Special packages for ladies',
    dressCode: 'Elegant',
    vibe: 'Japanese, sophisticated',
    rating: 5,
    tip: 'Premium experience. Perfect for a special girls night.',
  },
];

const weeklySchedule = [
  {
    day: 'Monday',
    options: 'Limited options - most places quiet',
    bestBet: 'Some hotel bars may have promotions',
  },
  {
    day: 'Tuesday',
    options: '⭐ BEST NIGHT - Major clubs & bars',
    bestBet: 'CK\'s, Club D, Trader Vic\'s',
  },
  {
    day: 'Wednesday',
    options: '⭐ BEST NIGHT - Continued deals',
    bestBet: 'CK\'s, Club D, Coral Bay, Coda',
  },
  {
    day: 'Thursday',
    options: 'Weekend starts - regular pricing',
    bestBet: 'Full price but best party night',
  },
  {
    day: 'Friday',
    options: 'Day brunches with deals',
    bestBet: 'Pool parties, beach clubs',
  },
  {
    day: 'Saturday',
    options: 'Some lounge specials',
    bestBet: 'Check individual venues',
  },
  {
    day: 'Sunday',
    options: 'Limited options',
    bestBet: 'Quiet drink at hotel bars',
  },
];

const tips = [
  {
    icon: Clock,
    title: 'Timing is Everything',
    content: 'Free drinks typically run 9 PM - 12 AM or 10 PM - 1 AM. Arrive early to maximize your time and avoid long queues.',
  },
  {
    icon: Users,
    title: 'Go with Friends',
    content: 'Ladies nights are social events. Groups of 3-6 tend to have the best experience and may get better seating.',
  },
  {
    icon: Gift,
    title: 'Check the Fine Print',
    content: '"Unlimited drinks" usually means selected house wines, beers, and basic spirits. Premium options cost extra.',
  },
  {
    icon: Heart,
    title: 'Stay Safe',
    content: 'Arrange transport in advance. Use Uber/Careem. Never leave drinks unattended. Go out with trusted friends.',
  },
];

const whatToExpect = [
  {
    title: 'Free Entry',
    description: 'Most venues waive cover charge for ladies. Men may still pay entry.',
  },
  {
    title: 'Complimentary Drinks',
    description: 'Usually house wines, beers, and well spirits. Premium drinks at regular prices.',
  },
  {
    title: 'Time Limits',
    description: 'Free drink window is typically 3-4 hours. After that, regular pricing applies.',
  },
  {
    title: 'Dress Code',
    description: 'Smart casual minimum. Heels and dresses are common. No beachwear or very casual attire.',
  },
];

export default function LadiesNightsPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-pink-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Ladies Nights', url: 'https://www.bahrainnights.com/guides/ladies-nights' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-rose-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-pink-500/20 text-pink-400 rounded-full text-sm font-medium mb-4">
              💃 Girls Night Out
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent">
                Ladies Nights
              </span>
              {' '}in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Bahrain has some of the best ladies night deals in the Gulf. Free drinks, 
              free entry, and great vibes — here&apos;s your complete guide.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Venues', value: '15+', icon: MapPin },
              { label: 'Best Days', value: 'Tue & Wed', icon: Calendar },
              { label: 'Avg Savings', value: 'BD 30+', icon: Gift },
              { label: 'Drink Hours', value: '3-4 hrs', icon: Clock },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-pink-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Schedule */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Weekly Schedule</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
            {weeklySchedule.map((day) => (
              <div 
                key={day.day}
                className={`bg-white/5 rounded-xl p-4 ${
                  day.day === 'Tuesday' || day.day === 'Wednesday' 
                    ? 'ring-2 ring-pink-500 bg-pink-500/10' 
                    : ''
                }`}
              >
                <div className="text-lg font-bold mb-1">{day.day}</div>
                <p className="text-xs text-gray-400 mb-2">{day.options}</p>
                <p className="text-xs text-pink-400">{day.bestBet}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-pink-400 mt-4 text-sm">
            ⭐ Tuesday & Wednesday are the main ladies nights in Bahrain
          </p>
        </div>
      </section>

      {/* Venue List */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Best Ladies Night Venues</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Our top picks for ladies nights in Bahrain with the best deals.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {ladiesNightVenues.map((venue) => (
              <div 
                key={venue.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold">{venue.name}</h3>
                    <p className="text-pink-400 text-sm">{venue.location}</p>
                  </div>
                  <div className="flex">
                    {[...Array(venue.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-pink-400 fill-pink-400" />
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2 text-sm mb-4">
                  <p>
                    <strong className="text-pink-400">Day:</strong> {venue.day}
                  </p>
                  <p>
                    <strong className="text-gray-400">Deal:</strong> {venue.deal}
                  </p>
                  <p>
                    <strong className="text-gray-400">Dress code:</strong> {venue.dressCode}
                  </p>
                  <p>
                    <strong className="text-gray-400">Vibe:</strong> {venue.vibe}
                  </p>
                </div>
                
                <p className="text-xs text-pink-300 italic">💡 {venue.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">What to Expect</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whatToExpect.map((item) => (
              <div key={item.title} className="bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-xl p-5 text-center">
                <h3 className="font-bold text-pink-400 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Tips for a Great Night</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {tips.map((tip) => (
              <div key={tip.title} className="bg-white/5 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-pink-500/20 rounded-lg">
                    <tip.icon className="w-6 h-6 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">{tip.title}</h3>
                    <p className="text-gray-400 text-sm">{tip.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Note */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Important Note</h2>
            <div className="text-gray-300 space-y-3 text-sm">
              <p>
                <strong>Deals change frequently!</strong> Venues may update their offers without notice. 
                Always confirm the current deal by calling ahead or checking the venue&apos;s social media.
              </p>
              <p>
                <strong>Ramadan:</strong> During the holy month, most nightlife venues close or have 
                restricted hours. Ladies nights typically don&apos;t run during this period.
              </p>
              <p>
                <strong>Stay connected:</strong> Follow venues on Instagram for the latest promotions 
                and special events.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-pink-500/20 to-rose-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for Girls Night?</h2>
          <p className="text-gray-300 mb-8">
            Check out this week&apos;s events and plan your perfect night out.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/events"
              className="px-8 py-3 bg-pink-500 hover:bg-pink-400 text-white font-bold rounded-lg transition-colors"
            >
              View Events
            </Link>
            <Link 
              href="/guides/nightlife"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              Full Nightlife Guide
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
              { title: 'Nightlife Guide', href: '/guides/nightlife', emoji: '🌙' },
              { title: 'Best Parties', href: '/guides/parties', emoji: '🎉' },
              { title: 'Best Brunches', href: '/guides/brunches', emoji: '🥂' },
              { title: 'Beach Clubs', href: '/guides/beach-clubs', emoji: '🏖️' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group"
              >
                <span className="text-2xl mb-2 block">{guide.emoji}</span>
                <span className="font-medium group-hover:text-pink-400 transition-colors">
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
                q: 'What nights are ladies nights in Bahrain?',
                a: 'Tuesday and Wednesday are the main ladies nights in Bahrain, with most major venues offering free drinks and entry. Some venues also have offers on other days.',
              },
              {
                q: 'Are drinks really free on ladies nights?',
                a: 'Yes, most venues offer complimentary house wines, beers, and well spirits during a specific time window (usually 3-4 hours). Premium drinks are usually extra.',
              },
              {
                q: 'What should I wear to ladies night?',
                a: 'Smart casual is the minimum. Most women dress up - heels and dresses are common. Avoid very casual clothing, sneakers, or beachwear at upscale venues.',
              },
              {
                q: 'Can men come to ladies nights?',
                a: 'Yes, men can attend but usually pay regular entry and drink prices. Ladies nights are designed to encourage women to visit, but men are welcome.',
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
            headline: 'Ladies Nights in Bahrain 2026 | Free Drinks & Best Deals',
            description: 'Complete guide to ladies nights in Bahrain including the best venues, deals, and tips for a great night out.',
            author: {
              '@type': 'Organization',
              name: 'BahrainNights',
              url: 'https://bahrainnights.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'BahrainNights',
            },
            datePublished: '2026-01-26',
            dateModified: lastUpdated,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://bahrainnights.com/guides/ladies-nights',
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
                name: 'What nights are ladies nights in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Tuesday and Wednesday are the main ladies nights in Bahrain, with most major venues offering free drinks and entry.',
                },
              },
              {
                '@type': 'Question',
                name: 'Are drinks really free on ladies nights?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, most venues offer complimentary house wines, beers, and well spirits during a specific time window (usually 3-4 hours).',
                },
              },
              {
                '@type': 'Question',
                name: 'What should I wear to ladies night?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Smart casual is the minimum. Most women dress up - heels and dresses are common.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can men come to ladies nights?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, men can attend but usually pay regular entry and drink prices.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
