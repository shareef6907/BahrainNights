import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, ExternalLink, 
  ShoppingBag, Info, AlertTriangle, Plane
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Uniqlo Bahrain - Store Status & Shopping Guide 2026',
  description: 'Looking for Uniqlo in Bahrain? Uniqlo does not currently have stores in Bahrain. Find alternatives and where to shop Uniqlo near Bahrain.',
  keywords: 'Uniqlo Bahrain, Uniqlo store Bahrain, where to buy Uniqlo Bahrain, Uniqlo Dubai, Uniqlo GCC',
  openGraph: {
    title: 'Uniqlo Bahrain - Store Status & Shopping Guide 2026',
    description: 'Looking for Uniqlo in Bahrain? Find alternatives and where to shop Uniqlo near Bahrain.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/brands/uniqlo',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/brands/uniqlo',
  },
};

const nearbyLocations = [
  {
    name: 'Uniqlo - The Dubai Mall',
    city: 'Dubai, UAE',
    distance: '~45 min flight',
    mall: 'The Dubai Mall',
    features: ['Main store', 'Full collection', 'All product lines'],
    mapsLink: 'https://www.google.com/maps/search/Uniqlo+Dubai+Mall',
  },
  {
    name: 'Uniqlo - Mall of the Emirates',
    city: 'Dubai, UAE',
    distance: '~45 min flight',
    mall: 'Mall of the Emirates',
    features: ['Full collection', 'UT graphics', 'Heattech'],
    mapsLink: 'https://www.google.com/maps/search/Uniqlo+Mall+of+Emirates',
  },
  {
    name: 'Uniqlo - Abu Dhabi Mall',
    city: 'Abu Dhabi, UAE',
    distance: '~50 min flight',
    mall: 'Abu Dhabi Mall',
    features: ['Good selection', 'Core collections'],
    mapsLink: 'https://www.google.com/maps/search/Uniqlo+Abu+Dhabi+Mall',
  },
];

const alternatives = [
  { name: 'Zara', href: '/guides/brands/zara', emoji: '👗', location: 'City Centre Bahrain' },
  { name: 'H&M', href: '/guides/brands/hm', emoji: '👕', location: 'Multiple locations' },
  { name: 'Marks & Spencer', href: '/explore/shopping', emoji: '🧥', location: 'City Centre, Seef Mall' },
  { name: 'Gap', href: '/explore/shopping', emoji: '👖', location: 'City Centre Bahrain' },
];

const faqs = [
  {
    q: 'Is Uniqlo available in Bahrain?',
    a: 'No, Uniqlo does not currently have any stores in Bahrain. The nearest Uniqlo stores are in Dubai and Abu Dhabi, UAE, approximately 45-50 minutes by flight.',
  },
  {
    q: 'Why is there no Uniqlo in Bahrain?',
    a: 'Uniqlo has been expanding in the Middle East primarily through the UAE market. While they may eventually expand to Bahrain, there are currently no announced plans for Bahrain stores.',
  },
  {
    q: 'Where is the nearest Uniqlo store to Bahrain?',
    a: 'The nearest Uniqlo stores are in Dubai, UAE. The Dubai Mall and Mall of the Emirates both have Uniqlo stores. Dubai is approximately 45 minutes by flight from Bahrain.',
  },
  {
    q: 'Can I order Uniqlo online and ship to Bahrain?',
    a: 'Uniqlo\'s UAE website does not currently offer shipping to Bahrain. You may need to use a shipping forwarder service or purchase during visits to Dubai.',
  },
];

export default function UniqloBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-red-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Brands', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Uniqlo', url: 'https://www.bahrainnights.com/guides/brands/uniqlo' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-gray-900/20" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium mb-4">
              ⚠️ Not Available
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-red-400">UNIQLO</span>
              {' '}
              <span className="text-gray-400">in Bahrain</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Unfortunately, Uniqlo does not currently have any stores in Bahrain.
              The Japanese casual wear brand has not yet expanded to the Bahrain market.
              Here&apos;s where you can find Uniqlo nearby and alternatives available locally.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Status Alert */}
          <div className="max-w-2xl mx-auto bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6 mt-8">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-yellow-500 flex-shrink-0" />
              <div>
                <h2 className="text-lg font-bold text-yellow-400 mb-2">No Uniqlo Stores in Bahrain</h2>
                <p className="text-gray-300">
                  Uniqlo has not opened any stores in Bahrain. For Uniqlo purchases,
                  the nearest stores are in Dubai, UAE (approximately 45 minutes by flight).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearest Locations */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
            <Plane className="w-8 h-8 text-red-400" />
            Nearest Uniqlo Stores
          </h2>
          <p className="text-gray-400 mb-8">Find Uniqlo stores within a short flight from Bahrain.</p>
          
          <div className="space-y-6">
            {nearbyLocations.map((store) => (
              <div 
                key={store.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-red-500/10"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-red-400">{store.name}</h3>
                      <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs font-bold rounded">
                        {store.distance}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm mb-4">
                      <p className="flex items-center gap-2 text-gray-300">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        {store.city} - {store.mall}
                      </p>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-2">
                        {store.features.map((feature) => (
                          <span key={feature} className="px-2 py-1 bg-red-500/10 text-red-300 text-xs rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:min-w-[200px]">
                    <a 
                      href={store.mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-400 transition-colors"
                    >
                      <MapPin className="w-4 h-4" />
                      View Location
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Online Shopping */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Shop Uniqlo Online</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="font-bold text-red-400 mb-3">Uniqlo UAE Website</h3>
              <p className="text-gray-400 text-sm mb-4">
                Shop online at Uniqlo UAE. Note: Direct shipping to Bahrain may not be available.
              </p>
              <a 
                href="https://www.uniqlo.com/ae"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-red-400 hover:text-red-300"
              >
                Visit uniqlo.com/ae <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="font-bold text-red-400 mb-3">Shop During Dubai Visits</h3>
              <p className="text-gray-400 text-sm mb-4">
                Many Bahrain residents shop at Uniqlo during visits to Dubai. 
                The Dubai Mall store has the largest selection.
              </p>
              <p className="text-xs text-gray-500">
                Tip: Dubai Mall is connected to the Metro for easy access.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Alternative Brands */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Similar Brands Available in Bahrain</h2>
          <p className="text-gray-400 mb-8">While Uniqlo isn&apos;t available, these brands offer similar quality basics:</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {alternatives.map((brand) => (
              <Link 
                key={brand.href}
                href={brand.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group"
              >
                <span className="text-2xl mb-2 block">{brand.emoji}</span>
                <span className="font-bold text-lg group-hover:text-red-400 transition-colors block">
                  {brand.name}
                </span>
                <span className="text-xs text-gray-500 block mt-1">
                  {brand.location}
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
      <section className="py-16 px-4 bg-gradient-to-r from-red-500/10 to-gray-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore Shopping in Bahrain</h2>
          <p className="text-gray-300 mb-8">
            Discover the fashion brands that are available in Bahrain.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/brands/hm"
              className="px-8 py-3 bg-red-500 hover:bg-red-400 text-white font-bold rounded-lg transition-colors"
            >
              H&M Guide
            </Link>
            <Link 
              href="/explore/shopping"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              All Shopping
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
            headline: 'Uniqlo Bahrain - Store Status & Shopping Guide 2026',
            description: 'Looking for Uniqlo in Bahrain? Uniqlo does not currently have stores in Bahrain. Find alternatives.',
            author: {
              '@type': 'Organization',
              name: 'BahrainNights',
              url: 'https://bahrainnights.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'BahrainNights',
            },
            datePublished: '2026-01-28',
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
