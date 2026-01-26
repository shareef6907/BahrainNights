import { Metadata } from 'next';
import Link from 'next/link';
import { 
  UtensilsCrossed, Star, MapPin, Clock, Wine,
  ArrowRight, Sparkles, Sun, Users, DollarSign
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Best Brunch in Bahrain 2026 | Friday Brunch Guide & Prices',
  description: 'Find the best brunch in Bahrain! Complete guide to Friday brunches with prices, reviews, and booking tips. From budget-friendly to luxury - all Bahrain brunch spots.',
  keywords: 'best brunch in Bahrain, Friday brunch Bahrain, Bahrain brunch, brunch deals Bahrain, hotel brunch Bahrain, Saturday brunch Bahrain, brunch prices Bahrain',
  openGraph: {
    title: 'Best Brunch in Bahrain 2026 | Friday Brunch Guide & Prices',
    description: 'Your complete guide to Friday and Saturday brunches in Bahrain - prices, venues, and booking tips.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/brunch',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/brunch',
  },
};

const topBrunches = [
  {
    name: 'CUT Brunch',
    hotel: 'Four Seasons Bahrain Bay',
    price: { soft: 'BD 42', house: 'BD 55', premium: 'BD 72' },
    time: '12:30 PM - 4:00 PM',
    day: 'Friday',
    rating: 4.9,
    cuisine: 'International with steakhouse specials',
    description: 'Upscale brunch in the famous Wolfgang Puck steakhouse. Stunning bay views, premium cuts, and sophisticated atmosphere.',
    highlights: ['Bahrain Bay views', 'Premium steaks', 'Champagne upgrade', 'Adults-focused'],
    dressCode: 'Smart casual',
    reservation: 'Essential - book 1-2 weeks ahead',
  },
  {
    name: 'La Mer Brunch',
    hotel: 'The Ritz-Carlton',
    price: { soft: 'BD 48', house: 'BD 62', premium: 'BD 85' },
    time: '1:00 PM - 4:30 PM',
    day: 'Friday',
    rating: 4.9,
    cuisine: 'International, seafood focus',
    description: 'Legendary five-star brunch with lavish seafood displays, live cooking stations, and impeccable Ritz service.',
    highlights: ['Seafood tower', 'Extensive buffet', 'Pool views', 'Live entertainment'],
    dressCode: 'Smart casual',
    reservation: 'Essential',
  },
  {
    name: 'Sherlock Holmes Brunch',
    hotel: 'Gulf Hotel',
    price: { soft: 'BD 32', house: 'BD 42', premium: 'BD 52' },
    time: '12:30 PM - 4:00 PM',
    day: 'Friday',
    rating: 4.7,
    cuisine: 'British pub meets international',
    description: 'A Bahrain institution - lively, fun, and great value. Popular with expats and families alike.',
    highlights: ['Live music', 'Great atmosphere', 'Good value', 'Family-friendly'],
    dressCode: 'Casual',
    reservation: 'Recommended',
  },
  {
    name: 'La Mosaique Brunch',
    hotel: 'Sofitel Bahrain',
    price: { soft: 'BD 30', house: 'BD 40', premium: 'BD 55' },
    time: '12:30 PM - 4:00 PM',
    day: 'Friday',
    rating: 4.6,
    cuisine: 'French-international',
    description: 'French elegance with excellent food quality. Pool access included, making it perfect for a full day out.',
    highlights: ['Pool access', 'French cuisine', 'Great desserts', 'Value option'],
    dressCode: 'Smart casual',
    reservation: 'Recommended',
  },
  {
    name: 'Bahrain Bay Kitchen',
    hotel: 'Four Seasons Bahrain Bay',
    price: { soft: 'BD 38', house: 'BD 50', premium: 'BD 65' },
    time: '1:00 PM - 4:00 PM',
    day: 'Friday',
    rating: 4.8,
    cuisine: 'International all-day dining',
    description: 'Relaxed luxury brunch with beautiful waterfront terrace. Great variety and family-friendly.',
    highlights: ['Terrace seating', 'Family-friendly', 'Diverse menu', 'Bay views'],
    dressCode: 'Smart casual',
    reservation: 'Recommended',
  },
  {
    name: 'Intercontinental Brunch',
    hotel: 'InterContinental Regency',
    price: { soft: 'BD 28', house: 'BD 38', premium: 'BD 48' },
    time: '12:30 PM - 4:00 PM',
    day: 'Friday',
    rating: 4.5,
    cuisine: 'International',
    description: 'Solid all-rounder with good food variety and central location. Popular with families.',
    highlights: ['Central location', 'Family-friendly', 'Good variety', 'Affordable'],
    dressCode: 'Smart casual',
    reservation: 'Recommended',
  },
];

const saturdayBrunches = [
  {
    name: 'The Orangery',
    location: 'The Merchant House',
    price: 'From BD 25',
    vibe: 'Intimate, boutique',
    specialty: 'Garden brunch with colonial charm',
  },
  {
    name: 'Masso',
    location: 'Downtown Rotana',
    price: 'From BD 28',
    vibe: 'Italian elegance',
    specialty: 'Italian brunch with fresh pasta stations',
  },
  {
    name: 'Trader Vic\'s',
    location: 'The Ritz-Carlton',
    price: 'From BD 35',
    vibe: 'Tiki vibes',
    specialty: 'Polynesian brunch with signature cocktails',
  },
];

const brunchTips = [
  {
    title: 'Book Early',
    tip: 'Popular brunches sell out. Book 1-2 weeks ahead, especially for Friday at top hotels.',
  },
  {
    title: 'Pace Yourself',
    tip: 'Brunches run 3-4 hours. Start light, save room for the good stuff. Don\'t fill up on bread!',
  },
  {
    title: 'Check Packages',
    tip: 'Soft drinks vs house drinks vs premium - big price differences. Know what you want.',
  },
  {
    title: 'Dress Code',
    tip: 'Most require smart casual. No beachwear, flip-flops, or sportswear.',
  },
  {
    title: 'Arrive on Time',
    tip: 'Late arrival means less time. Most don\'t extend your slot.',
  },
  {
    title: 'Kids Policy',
    tip: 'Some are adults-only, others are family-friendly. Check before booking.',
  },
];

const priceGuide = [
  {
    tier: 'Budget (Under BD 35)',
    options: 'Sofitel, Intercontinental, smaller hotels',
    includes: 'Full buffet, soft drinks',
    note: 'Great value, good food, less lavish presentation',
  },
  {
    tier: 'Mid-Range (BD 35-50)',
    options: 'Gulf Hotel, Four Seasons BBK, most 5-stars',
    includes: 'Full buffet, house beverages',
    note: 'Best balance of quality and price',
  },
  {
    tier: 'Premium (BD 50+)',
    options: 'Ritz-Carlton, CUT, Four Seasons premium',
    includes: 'Premium drinks, champagne, specialty items',
    note: 'Ultimate luxury, special occasions',
  },
];

export default function BrunchGuidePage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-amber-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Best Brunch', url: 'https://www.bahrainnights.com/guides/brunch' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-yellow-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-4">
              🥂 Brunch Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best{' '}
              <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                Brunch
              </span>
              {' '}in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Friday brunch is a Bahrain institution — an all-you-can-eat feast of food, drinks, 
              and socializing. From budget-friendly buffers to luxury champagne affairs, 
              here&apos;s your complete guide to the best brunches in the Kingdom.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Brunches', value: '40+', icon: UtensilsCrossed },
              { label: 'Starting From', value: 'BD 25', icon: DollarSign },
              { label: 'Duration', value: '3-4 hrs', icon: Clock },
              { label: 'Best Day', value: 'Friday', icon: Sun },
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

      {/* Top Brunches */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Top Friday Brunches</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            The best brunches in Bahrain, with all the details you need to book.
          </p>
          
          <div className="space-y-6">
            {topBrunches.map((brunch) => (
              <div 
                key={brunch.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-amber-400">{brunch.name}</h3>
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star className="w-4 h-4 fill-yellow-400" />
                        <span className="text-sm font-bold">{brunch.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 mb-1">{brunch.hotel}</p>
                    <p className="text-xs text-gray-500 mb-3">{brunch.day} • {brunch.time}</p>
                    <p className="text-gray-300 text-sm mb-4">{brunch.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {brunch.highlights.map((h) => (
                        <span key={h} className="px-2 py-1 bg-amber-500/20 text-amber-300 text-xs rounded">
                          {h}
                        </span>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Dress:</span>{' '}
                        <span className="text-gray-300">{brunch.dressCode}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Booking:</span>{' '}
                        <span className="text-gray-300">{brunch.reservation}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:text-right lg:min-w-[200px]">
                    <div className="bg-white/5 rounded-xl p-4">
                      <p className="text-xs text-gray-400 mb-2">Packages</p>
                      <div className="space-y-1 text-sm">
                        <p><span className="text-gray-400">Soft:</span> <span className="font-bold">{brunch.price.soft}</span></p>
                        <p><span className="text-gray-400">House:</span> <span className="font-bold">{brunch.price.house}</span></p>
                        <p><span className="text-gray-400">Premium:</span> <span className="font-bold text-amber-400">{brunch.price.premium}</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Saturday Options */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Saturday Brunch Options</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {saturdayBrunches.map((brunch) => (
              <div key={brunch.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-lg text-amber-400">{brunch.name}</h3>
                <p className="text-sm text-gray-400 mb-2">{brunch.location}</p>
                <p className="text-amber-400 font-bold mb-2">{brunch.price}</p>
                <p className="text-xs text-gray-500 italic mb-2">{brunch.vibe}</p>
                <p className="text-sm text-gray-300">{brunch.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Price Guide */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Price Guide</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {priceGuide.map((tier) => (
              <div key={tier.tier} className="bg-gradient-to-br from-amber-500/10 to-yellow-500/10 rounded-xl p-5">
                <h3 className="font-bold text-lg text-amber-400 mb-2">{tier.tier}</h3>
                <p className="text-sm text-gray-300 mb-2"><strong>Where:</strong> {tier.options}</p>
                <p className="text-sm text-gray-300 mb-2"><strong>Includes:</strong> {tier.includes}</p>
                <p className="text-xs text-gray-400 italic">{tier.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Brunch Tips</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {brunchTips.map((item) => (
              <div key={item.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-amber-400 mb-2">{item.title}</h3>
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
              { title: 'Best Restaurants', href: '/guides/restaurants', emoji: '🍽️' },
              { title: 'Best Cafes', href: '/guides/cafes', emoji: '☕' },
              { title: 'Beach Clubs', href: '/guides/beach-clubs', emoji: '🏖️' },
              { title: 'This Weekend', href: '/guides/things-to-do-this-weekend', emoji: '📅' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group"
              >
                <span className="text-2xl mb-2 block">{guide.emoji}</span>
                <span className="font-medium group-hover:text-amber-400 transition-colors">
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
                q: 'What is the best brunch in Bahrain?',
                a: 'The Ritz-Carlton\'s La Mer brunch and CUT at Four Seasons are considered the best luxury options. For great value, Sherlock Holmes at Gulf Hotel and Sofitel\'s brunch are excellent choices.',
              },
              {
                q: 'How much does brunch cost in Bahrain?',
                a: 'Brunches range from BD 25 for budget options to BD 85+ for premium packages with champagne. Average mid-range brunches are BD 35-50 including house beverages.',
              },
              {
                q: 'Do I need to book brunch in advance?',
                a: 'Yes, especially for Friday brunch. Popular venues like Ritz-Carlton and Four Seasons often book out 1-2 weeks ahead. Book early for the best experience.',
              },
              {
                q: 'Is brunch only on Fridays in Bahrain?',
                a: 'Friday is the main brunch day, but many venues offer Saturday and even Sunday options. Saturday brunches are often quieter and more relaxed.',
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
      <section className="py-16 px-4 bg-gradient-to-r from-amber-500/20 to-yellow-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for Brunch?</h2>
          <p className="text-gray-300 mb-8">
            Browse restaurant listings or see what else is happening this weekend.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/restaurants"
              className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg transition-colors"
            >
              Restaurant Guide
            </Link>
            <Link 
              href="/events/this-weekend"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              This Weekend
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
            headline: 'Best Brunch in Bahrain 2026',
            description: 'Complete guide to Friday and Saturday brunches in Bahrain with prices, venues, and booking tips.',
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
              '@id': 'https://bahrainnights.com/guides/brunch',
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
                name: 'What is the best brunch in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The Ritz-Carlton\'s La Mer brunch and CUT at Four Seasons are considered the best luxury options. For great value, Sherlock Holmes at Gulf Hotel and Sofitel\'s brunch are excellent.',
                },
              },
              {
                '@type': 'Question',
                name: 'How much does brunch cost in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Brunches range from BD 25 for budget options to BD 85+ for premium packages with champagne. Average mid-range brunches are BD 35-50.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do I need to book brunch in advance?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, especially for Friday brunch. Popular venues often book out 1-2 weeks ahead. Book early for the best experience.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is brunch only on Fridays in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Friday is the main brunch day, but many venues offer Saturday and Sunday options. Saturday brunches are often quieter.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
