import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Clock, Wifi, ExternalLink, 
  Coffee, ShoppingBag, Star, Info
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

// Mall page links mapping
const mallLinks: Record<string, string> = {
  'City Centre Bahrain': '/guides/malls/city-centre-bahrain',
  'City Centre': '/guides/malls/city-centre-bahrain',
  'Seef Mall': '/guides/malls/seef-mall',
  'The Avenues': '/guides/malls/the-avenues',
  'The Avenues Bahrain': '/guides/malls/the-avenues',
  'Marassi Galleria': '/guides/malls/marassi-galleria',
  'Moda Mall': '/guides/malls/moda-mall',
  'Bahrain Mall': '/guides/malls/bahrain-mall',
};

export const metadata: Metadata = {
  title: 'Costa Coffee Bahrain - All Locations & Guide 2026',
  description: 'Find all Costa Coffee locations in Bahrain. Complete guide to Costa cafes at malls, standalone stores & drive-thrus. Menu, WiFi, hours & tips.',
  keywords: 'Costa Coffee Bahrain, Costa locations Bahrain, Costa menu Bahrain, Costa City Centre Bahrain, coffee shops Bahrain',
  openGraph: {
    title: 'Costa Coffee Bahrain - All Locations & Guide 2026',
    description: 'Find all Costa Coffee locations in Bahrain. Complete guide to Costa cafes.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/brands/costa-coffee',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/brands/costa-coffee',
  },
};

const mallLocations = [
  {
    name: 'Costa Coffee City Centre Bahrain',
    type: 'Mall',
    address: 'City Centre Bahrain, Seef',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    features: ['Seating', 'Free WiFi', 'Full Menu'],
    mapsLink: 'https://www.google.com/maps/search/Costa+Coffee+City+Centre+Bahrain',
  },
  {
    name: 'Costa Coffee Seef Mall',
    type: 'Mall',
    address: 'Seef Mall, Seef',
    hours: 'Sun-Thu: 10:00 AM - 10:00 PM, Fri-Sat: 10:00 AM - 11:00 PM',
    features: ['Seating', 'Free WiFi'],
    mapsLink: 'https://www.google.com/maps/search/Costa+Coffee+Seef+Mall+Bahrain',
  },
  {
    name: 'Costa Coffee The Avenues',
    type: 'Mall',
    address: 'The Avenues Bahrain',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    features: ['Seating', 'Free WiFi'],
    mapsLink: 'https://www.google.com/maps/search/Costa+Coffee+Avenues+Bahrain',
  },
];

const otherLocations = [
  {
    name: 'Costa Coffee Bahrain Bay',
    area: 'Bahrain Bay',
    features: ['Waterfront', 'Seating', 'Free WiFi'],
    mapsLink: 'https://www.google.com/maps/search/Costa+Coffee+Bahrain+Bay',
  },
  {
    name: 'Costa Coffee Adliya',
    area: 'Adliya',
    features: ['Seating', 'Free WiFi', 'Street-Side'],
    mapsLink: 'https://www.google.com/maps/search/Costa+Coffee+Adliya+Bahrain',
  },
  {
    name: 'Costa Coffee Diplomatic Area',
    area: 'Diplomatic Area',
    features: ['Business Area', 'Seating', 'Free WiFi'],
    mapsLink: 'https://www.google.com/maps/search/Costa+Coffee+Diplomatic+Area+Bahrain',
  },
  {
    name: 'Costa Coffee Riffa',
    area: 'Riffa',
    features: ['Drive-Thru', 'Seating', 'Free WiFi'],
    mapsLink: 'https://www.google.com/maps/search/Costa+Coffee+Riffa+Bahrain',
  },
];

const shoppingTips = [
  {
    title: 'Costa Club',
    tip: 'Join Costa Club through the app to earn points (beans) on every purchase. Get free drinks and exclusive offers.',
  },
  {
    title: 'British Heritage',
    tip: 'Costa is Britain\'s largest coffee chain. Try their signature Flat White or classic English breakfast tea.',
  },
  {
    title: 'Food Menu',
    tip: 'Costa offers a solid food menu beyond coffee - sandwiches, toasties, and pastries for breakfast or lunch.',
  },
  {
    title: 'Reusable Cup Discount',
    tip: 'Bring your own cup and get a discount on your drink. Good for the environment and your wallet.',
  },
];

const relatedBrands = [
  { name: 'Starbucks', href: '/guides/brands/starbucks', emoji: '☕' },
  { name: 'Cheesecake Factory', href: '/guides/brands/cheesecake-factory', emoji: '🍰' },
  { name: 'Shake Shack', href: '/guides/brands/shake-shack', emoji: '🍔' },
  { name: 'Five Guys', href: '/guides/brands/five-guys', emoji: '🍟' },
];

const faqs = [
  {
    q: 'How many Costa Coffee locations are in Bahrain?',
    a: 'Costa Coffee has approximately 15+ locations across Bahrain including mall stores, standalone cafes, and some drive-thru locations.',
  },
  {
    q: 'Does Costa Coffee Bahrain have WiFi?',
    a: 'Yes, all Costa Coffee locations in Bahrain offer free WiFi for customers.',
  },
  {
    q: 'Is Costa Coffee British?',
    a: 'Yes, Costa Coffee was founded in London in 1971 by Italian brothers Sergio and Bruno Costa. It\'s now Britain\'s largest coffee chain.',
  },
  {
    q: 'Does Costa Coffee Bahrain deliver?',
    a: 'Yes, Costa Coffee delivery is available through food delivery apps like Talabat in most areas of Bahrain.',
  },
];

export default function CostaCoffeeBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-red-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Brands', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Costa Coffee', url: 'https://www.bahrainnights.com/guides/brands/costa-coffee' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-slate-900/50" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium mb-4">
              ☕ Coffee
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-red-600">COSTA COFFEE</span>
              {' '}
              <span className="text-gray-400">in Bahrain</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Britain&apos;s favorite coffee shop brings its signature slow-roasted coffee 
              to Bahrain. With numerous locations across the Kingdom, enjoy premium 
              coffee, food, and a cozy atmosphere at Costa.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Locations', value: '15+', icon: ShoppingBag },
              { label: 'Origin', value: 'UK', icon: Coffee },
              { label: 'Free WiFi', value: 'All Stores', icon: Wifi },
              { label: 'Costa Club', value: 'Available', icon: Star },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-red-500" />
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
          <h2 className="text-3xl font-bold mb-4">Costa Coffee in Malls</h2>
          <p className="text-gray-400 mb-8">Find Costa at major shopping centers.</p>
          
          <div className="grid md:grid-cols-3 gap-4">
            {mallLocations.map((store) => (
              <div 
                key={store.name}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-red-500/10"
              >
                <h3 className="font-bold text-red-400 mb-2">{store.name}</h3>
                <p className="text-sm text-gray-400 mb-2">{store.address}</p>
                <p className="text-xs text-gray-500 mb-3">{store.hours}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {store.features.map((feature) => (
                    <span key={feature} className="px-2 py-1 bg-red-500/10 text-red-300 text-xs rounded">
                      {feature}
                    </span>
                  ))}
                </div>
                <a 
                  href={store.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-red-400 hover:underline flex items-center gap-1"
                >
                  Get Directions <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Locations */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Other Costa Coffee Locations</h2>
          <p className="text-gray-400 mb-8">Standalone cafes around Bahrain.</p>
          
          <div className="grid md:grid-cols-2 gap-4">
            {otherLocations.map((store) => (
              <div 
                key={store.name}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-5"
              >
                <h3 className="font-bold text-red-400 mb-2">{store.name}</h3>
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
                  className="text-sm text-red-400 hover:underline flex items-center gap-1"
                >
                  Find on Maps <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-yellow-400 text-sm flex items-start gap-2">
              <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
              This is not a complete list. Use Google Maps or the Costa app to find all locations.
            </p>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Tips for Costa Coffee in Bahrain</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {shoppingTips.map((item) => (
              <div key={item.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-red-400 mb-2">{item.title}</h3>
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
                <span className="font-medium group-hover:text-red-400 transition-colors">
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
      <section className="py-16 px-4 bg-gradient-to-r from-red-500/10 to-slate-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More Food & Drink in Bahrain</h2>
          <p className="text-gray-300 mb-8">
            Discover other popular cafes and restaurants.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/brands/starbucks"
              className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition-colors"
            >
              Starbucks Guide
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
            headline: 'Costa Coffee Bahrain - All Locations & Guide 2026',
            description: 'Find all Costa Coffee locations in Bahrain. Complete guide to Costa cafes.',
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
