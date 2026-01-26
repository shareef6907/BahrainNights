import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Clock, ExternalLink, 
  Sparkles, ShoppingBag, Star, Info, AlertTriangle, Plane
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Gucci Bahrain - Store Status & Shopping Guide 2026',
  description: 'Looking for Gucci in Bahrain? The Moda Mall Gucci store has closed. Find alternatives and where to shop Gucci near Bahrain.',
  keywords: 'Gucci Bahrain, Gucci store Bahrain, where to buy Gucci Bahrain, Gucci Moda Mall closed, Gucci bags Bahrain, Gucci Dubai',
  openGraph: {
    title: 'Gucci Bahrain - Store Status & Shopping Guide 2026',
    description: 'Looking for Gucci in Bahrain? Find alternatives and where to shop Gucci near Bahrain.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/brands/gucci',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/brands/gucci',
  },
};

const nearbyLocations = [
  {
    name: 'Gucci - The Dubai Mall',
    city: 'Dubai, UAE',
    distance: '~45 min flight',
    mall: 'The Dubai Mall',
    features: ['Flagship store', 'Full collection', 'Largest selection in GCC'],
    mapsLink: 'https://www.google.com/maps/search/Gucci+Dubai+Mall',
  },
  {
    name: 'Gucci - Mall of the Emirates',
    city: 'Dubai, UAE',
    distance: '~45 min flight',
    mall: 'Mall of the Emirates',
    features: ['Full boutique', 'Ready-to-wear', 'Accessories'],
    mapsLink: 'https://www.google.com/maps/search/Gucci+Mall+of+Emirates+Dubai',
  },
  {
    name: 'Gucci - The Avenues Kuwait',
    city: 'Kuwait City, Kuwait',
    distance: '~1 hour flight',
    mall: 'The Avenues',
    features: ['Regional flagship', 'Full collection'],
    mapsLink: 'https://www.google.com/maps/search/Gucci+Avenues+Kuwait',
  },
];

const alternatives = [
  { name: 'Louis Vuitton', href: '/guides/brands/louis-vuitton', emoji: '👜', available: true, location: 'Marassi Galleria' },
  { name: 'Chanel', href: '/guides/brands/chanel', emoji: '🖤', available: true, location: 'The Avenues, Marassi Galleria' },
  { name: 'Dior', href: '/guides/brands/dior', emoji: '💄', available: true, location: 'City Centre, The Avenues, Marassi' },
  { name: 'Hermès', href: '/guides/brands/hermes', emoji: '🧣', available: true, location: 'Marassi Galleria' },
];

const faqs = [
  {
    q: 'Is Gucci available in Bahrain?',
    a: 'Unfortunately, there are currently no Gucci stores in Bahrain. The Gucci boutique at Moda Mall (Bahrain World Trade Center) has permanently closed. The nearest Gucci stores are in Dubai and Kuwait.',
  },
  {
    q: 'Why did Gucci close in Bahrain?',
    a: 'The Gucci store at Moda Mall has permanently closed. While the exact reasons haven\'t been publicly disclosed, many luxury brands have been consolidating their GCC presence. Dubai remains the primary luxury hub for the region.',
  },
  {
    q: 'Where is the nearest Gucci store to Bahrain?',
    a: 'The nearest Gucci stores are in Dubai, UAE (approximately 45 minutes by flight). The Dubai Mall has a flagship Gucci store with the full collection. Mall of the Emirates also has a Gucci boutique.',
  },
  {
    q: 'Can I buy Gucci online and ship to Bahrain?',
    a: 'Yes, you can shop on gucci.com and select UAE or regional delivery options. Some items may be available for delivery to Bahrain through Gucci\'s official website or authorized online retailers.',
  },
];

export default function GucciBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-green-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Brands', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Gucci', url: 'https://www.bahrainnights.com/guides/brands/gucci' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-red-900/20" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium mb-4">
              ⚠️ Store Closed
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-green-400">GUCCI</span>
              {' '}
              <span className="text-gray-400">in Bahrain</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Unfortunately, Gucci no longer has a physical store in Bahrain. 
              The boutique at Moda Mall has permanently closed. Here&apos;s where you 
              can find Gucci near Bahrain and alternative luxury brands available locally.
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
                <h2 className="text-lg font-bold text-yellow-400 mb-2">No Gucci Stores in Bahrain</h2>
                <p className="text-gray-300">
                  The Gucci store at Moda Mall (Bahrain World Trade Center) has permanently closed. 
                  For Gucci purchases, the nearest stores are in Dubai, UAE.
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
            <Plane className="w-8 h-8 text-green-400" />
            Nearest Gucci Stores
          </h2>
          <p className="text-gray-400 mb-8">Find Gucci boutiques within a short flight from Bahrain.</p>
          
          <div className="space-y-6">
            {nearbyLocations.map((store) => (
              <div 
                key={store.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-green-500/10"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-green-400">{store.name}</h3>
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
                          <span key={feature} className="px-2 py-1 bg-green-500/10 text-green-300 text-xs rounded">
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
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-green-500 text-black font-bold rounded-lg hover:bg-green-400 transition-colors"
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
          <h2 className="text-3xl font-bold mb-8">Shop Gucci Online</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="font-bold text-green-400 mb-3">Official Website</h3>
              <p className="text-gray-400 text-sm mb-4">
                Shop the full Gucci collection on gucci.com with regional shipping options.
              </p>
              <a 
                href="https://www.gucci.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-green-400 hover:text-green-300"
              >
                Visit gucci.com <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="font-bold text-green-400 mb-3">Authorized Retailers</h3>
              <p className="text-gray-400 text-sm mb-4">
                Some luxury department stores and multi-brand boutiques may carry Gucci items.
              </p>
              <p className="text-xs text-gray-500">
                Check authenticity carefully when buying from third-party sellers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Alternative Luxury Brands */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Luxury Brands Available in Bahrain</h2>
          <p className="text-gray-400 mb-8">While Gucci isn&apos;t available, these luxury brands have stores in Bahrain:</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {alternatives.map((brand) => (
              <Link 
                key={brand.href}
                href={brand.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group"
              >
                <span className="text-2xl mb-2 block">{brand.emoji}</span>
                <span className="font-bold text-lg group-hover:text-green-400 transition-colors block">
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
      <section className="py-16 px-4 bg-gradient-to-r from-green-500/10 to-red-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore Luxury Shopping in Bahrain</h2>
          <p className="text-gray-300 mb-8">
            Discover the luxury brands that are available in Bahrain.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/brands/louis-vuitton"
              className="px-8 py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded-lg transition-colors"
            >
              Louis Vuitton Guide
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
            headline: 'Gucci Bahrain - Store Status & Shopping Guide 2026',
            description: 'Looking for Gucci in Bahrain? The Moda Mall Gucci store has closed. Find alternatives and where to shop Gucci near Bahrain.',
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
