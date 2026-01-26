import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Clock, Wifi, ExternalLink, 
  Coffee, ShoppingBag, Star, Info
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Starbucks Bahrain - All Locations & Menu Guide 2026',
  description: 'Find all Starbucks locations in Bahrain. Complete guide to Starbucks coffee shops at malls, standalone stores & drive-thrus. Menu, WiFi, hours & tips.',
  keywords: 'Starbucks Bahrain, Starbucks locations Bahrain, Starbucks menu Bahrain, Starbucks City Centre Bahrain, coffee shops Bahrain',
  openGraph: {
    title: 'Starbucks Bahrain - All Locations & Menu Guide 2026',
    description: 'Find all Starbucks locations in Bahrain. Complete guide to Starbucks coffee shops.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/brands/starbucks',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/brands/starbucks',
  },
};

const mallLocations = [
  {
    name: 'Starbucks City Centre Bahrain',
    type: 'Mall',
    address: 'City Centre Bahrain, Ground Floor, Seef',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    features: ['Seating', 'Free WiFi', 'Mobile Order'],
    mapsLink: 'https://www.google.com/maps/search/Starbucks+City+Centre+Bahrain',
  },
  {
    name: 'Starbucks Seef Mall',
    type: 'Mall',
    address: 'Seef Mall, Ground Floor, Seef',
    hours: 'Sun-Thu: 10:00 AM - 10:00 PM, Fri-Sat: 10:00 AM - 11:00 PM',
    features: ['Seating', 'Free WiFi'],
    mapsLink: 'https://www.google.com/maps/search/Starbucks+Seef+Mall+Bahrain',
  },
  {
    name: 'Starbucks The Avenues',
    type: 'Mall',
    address: 'The Avenues Bahrain, Ground Floor',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    features: ['Seating', 'Free WiFi', 'Modern Design'],
    mapsLink: 'https://www.google.com/maps/search/Starbucks+Avenues+Bahrain',
  },
  {
    name: 'Starbucks Bahrain Mall',
    type: 'Mall',
    address: 'Bahrain Mall, Ground Floor',
    hours: 'Sun-Thu: 10:00 AM - 10:00 PM, Fri-Sat: 10:00 AM - 11:00 PM',
    features: ['Seating', 'Free WiFi'],
    mapsLink: 'https://www.google.com/maps/search/Starbucks+Bahrain+Mall',
  },
  {
    name: 'Starbucks Reserve - Marassi Galleria',
    type: 'Mall',
    address: 'Marassi Galleria, Diyar Al Muharraq',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    features: ['Starbucks Reserve', 'Seating', 'Free WiFi', 'Beachfront mall'],
    mapsLink: 'https://www.google.com/maps/search/Starbucks+Marassi+Galleria+Bahrain',
  },
];

const standaloneLocations = [
  {
    name: 'Starbucks Adliya',
    area: 'Adliya',
    type: 'Standalone',
    features: ['Drive-Thru', 'Seating', 'Free WiFi', 'Parking'],
    mapsLink: 'https://www.google.com/maps/search/Starbucks+Adliya+Bahrain',
  },
  {
    name: 'Starbucks Juffair',
    area: 'Juffair',
    type: 'Standalone',
    features: ['Seating', 'Free WiFi'],
    mapsLink: 'https://www.google.com/maps/search/Starbucks+Juffair+Bahrain',
  },
  {
    name: 'Starbucks Budaiya Road',
    area: 'Budaiya',
    type: 'Drive-Thru',
    features: ['Drive-Thru', 'Seating', 'Free WiFi', 'Parking'],
    mapsLink: 'https://www.google.com/maps/search/Starbucks+Budaiya+Bahrain',
  },
  {
    name: 'Starbucks Riffa',
    area: 'Riffa',
    type: 'Standalone',
    features: ['Drive-Thru', 'Seating', 'Free WiFi'],
    mapsLink: 'https://www.google.com/maps/search/Starbucks+Riffa+Bahrain',
  },
];

const shoppingTips = [
  {
    title: 'Starbucks Rewards',
    tip: 'Download the Starbucks app and join Rewards to earn stars on every purchase. Free drinks, customization, and birthday rewards.',
  },
  {
    title: 'Mobile Order',
    tip: 'Skip the line by ordering ahead on the app. Select your store and pickup time.',
  },
  {
    title: 'Free WiFi',
    tip: 'All Starbucks in Bahrain offer free WiFi. Great for remote work or meetings.',
  },
  {
    title: 'Seasonal Drinks',
    tip: 'Look for seasonal offerings like Pumpkin Spice Latte (fall) and holiday drinks (winter). Limited time only!',
  },
];

const relatedBrands = [
  { name: 'Costa Coffee', href: '/guides/brands/costa-coffee', emoji: '☕' },
  { name: 'Cheesecake Factory', href: '/guides/brands/cheesecake-factory', emoji: '🍰' },
  { name: 'Shake Shack', href: '/guides/brands/shake-shack', emoji: '🍔' },
  { name: 'Five Guys', href: '/guides/brands/five-guys', emoji: '🍟' },
];

const faqs = [
  {
    q: 'How many Starbucks are there in Bahrain?',
    a: 'Bahrain has approximately 20+ Starbucks locations across malls, standalone stores, and drive-thrus throughout Manama, Seef, Juffair, Riffa, and other areas.',
  },
  {
    q: 'Does Starbucks Bahrain have WiFi?',
    a: 'Yes, all Starbucks locations in Bahrain offer free WiFi for customers.',
  },
  {
    q: 'Does Starbucks Bahrain deliver?',
    a: 'Yes, Starbucks delivery is available through food delivery apps like Talabat and Carriage in most areas of Bahrain.',
  },
  {
    q: 'Are Starbucks prices in Bahrain expensive?',
    a: 'Starbucks prices in Bahrain are similar to other GCC countries. A tall latte typically costs around BD 1.800-2.200.',
  },
];

export default function StarbucksBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-green-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Brands', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Starbucks', url: 'https://www.bahrainnights.com/guides/brands/starbucks' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 to-slate-900/50" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium mb-4">
              ☕ Coffee
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-green-500">STARBUCKS</span>
              {' '}
              <span className="text-gray-400">in Bahrain</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The world&apos;s largest coffeehouse chain has numerous locations across Bahrain. 
              From mall kiosks to drive-thrus, find your favorite Frappuccino, espresso, 
              or seasonal drink at a Starbucks near you.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Locations', value: '20+', icon: ShoppingBag },
              { label: 'Drive-Thrus', value: 'Multiple', icon: Coffee },
              { label: 'Free WiFi', value: 'All Stores', icon: Wifi },
              { label: 'Rewards', value: 'Available', icon: Star },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mall Locations */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Starbucks in Malls</h2>
          <p className="text-gray-400 mb-8">Find Starbucks at major shopping centers.</p>
          
          <div className="grid md:grid-cols-2 gap-4">
            {mallLocations.map((store) => (
              <div 
                key={store.name}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-green-500/10"
              >
                <h3 className="font-bold text-green-400 mb-2">{store.name}</h3>
                <p className="text-sm text-gray-400 mb-2">{store.address}</p>
                <p className="text-xs text-gray-500 mb-3">{store.hours}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {store.features.map((feature) => (
                    <span key={feature} className="px-2 py-1 bg-green-500/10 text-green-300 text-xs rounded">
                      {feature}
                    </span>
                  ))}
                </div>
                <a 
                  href={store.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-green-400 hover:underline flex items-center gap-1"
                >
                  Get Directions <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standalone & Drive-Thru */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Standalone & Drive-Thru Locations</h2>
          <p className="text-gray-400 mb-8">Starbucks outside of malls with parking and drive-thru options.</p>
          
          <div className="grid md:grid-cols-2 gap-4">
            {standaloneLocations.map((store) => (
              <div 
                key={store.name}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-green-400">{store.name}</h3>
                  {store.type === 'Drive-Thru' && (
                    <span className="px-2 py-0.5 bg-green-500 text-black text-xs font-bold rounded">
                      DRIVE-THRU
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-400 mb-3">{store.area} Area</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {store.features.map((feature) => (
                    <span key={feature} className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded">
                      {feature}
                    </span>
                  ))}
                </div>
                <a 
                  href={store.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-green-400 hover:underline flex items-center gap-1"
                >
                  Find on Maps <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-yellow-400 text-sm flex items-start gap-2">
              <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
              This is not a complete list. Starbucks has 20+ locations in Bahrain. Use Google Maps or the Starbucks app to find all stores.
            </p>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Tips for Starbucks in Bahrain</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {shoppingTips.map((item) => (
              <div key={item.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-green-400 mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Brands */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Food & Drink in Bahrain</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedBrands.map((brand) => (
              <Link 
                key={brand.href}
                href={brand.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group text-center"
              >
                <span className="text-2xl mb-2 block">{brand.emoji}</span>
                <span className="font-medium group-hover:text-green-400 transition-colors">
                  {brand.name}
                </span>
              </Link>
            ))}
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

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-500/10 to-slate-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More Food & Drink in Bahrain</h2>
          <p className="text-gray-300 mb-8">
            Discover other popular cafes and restaurants.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/brands/costa-coffee"
              className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-colors"
            >
              Costa Coffee Guide
            </Link>
            <Link 
              href="/guides"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              All Guides
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
            headline: 'Starbucks Bahrain - All Locations & Menu Guide 2026',
            description: 'Find all Starbucks locations in Bahrain. Complete guide to Starbucks coffee shops.',
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
            mainEntity: faqs.map((faq) => ({
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
    </div>
  );
}
