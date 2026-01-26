import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Clock, ExternalLink, 
  Sparkles, ShoppingBag, Star, Info
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Uniqlo Bahrain - Store Locations & Shopping Guide 2026',
  description: 'Find Uniqlo stores in Bahrain. Complete guide to Uniqlo at City Centre Bahrain and The Avenues. Store hours, directions & shopping tips for quality basics.',
  keywords: 'Uniqlo Bahrain, Uniqlo store Bahrain, Uniqlo City Centre Bahrain, where to buy Uniqlo Bahrain, Uniqlo Avenues Bahrain',
  openGraph: {
    title: 'Uniqlo Bahrain - Store Locations & Shopping Guide 2026',
    description: 'Find Uniqlo stores in Bahrain. Complete guide to Uniqlo locations.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/brands/uniqlo',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/brands/uniqlo',
  },
};

const storeLocations = [
  {
    name: 'Uniqlo - City Centre Bahrain',
    mall: 'City Centre Bahrain',
    address: 'City Centre Bahrain, Seef District, Manama',
    floor: 'Ground Floor',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    products: ['Women\'s Basics', 'Men\'s Basics', 'Kids\' Wear', 'UT Collection', 'Heattech', 'AIRism', 'Ultra Light Down'],
    features: ['Full collection', 'UT graphic tees', 'Seasonal collections'],
    mapsLink: 'https://www.google.com/maps/search/Uniqlo+City+Centre+Bahrain',
    isPrimary: true,
  },
  {
    name: 'Uniqlo - The Avenues Bahrain',
    mall: 'The Avenues Bahrain',
    address: 'The Avenues, Bahrain Bay, Manama',
    floor: 'Ground Floor',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    products: ['Women\'s Basics', 'Men\'s Basics', 'Kids\' Wear', 'UT Collection', 'Heattech', 'AIRism'],
    features: ['Modern store', 'Good selection'],
    mapsLink: 'https://www.google.com/maps/search/Uniqlo+Avenues+Bahrain',
    isPrimary: false,
  },
];

const shoppingTips = [
  {
    title: 'LifeWear Philosophy',
    tip: 'Uniqlo focuses on quality basics that last. Their items are designed to be versatile and timeless.',
  },
  {
    title: 'Seasonal Tech',
    tip: 'Heattech for winter warmth, AIRism for summer cooling. These innovative fabrics are Uniqlo specialties.',
  },
  {
    title: 'UT Collaborations',
    tip: 'UT (Uniqlo T-shirts) features collaborations with artists, brands, and pop culture. Limited editions sell out fast.',
  },
  {
    title: 'Alterations Service',
    tip: 'Uniqlo offers free hemming on pants at some locations. Ask at the counter for availability.',
  },
];

const relatedBrands = [
  { name: 'Zara', href: '/guides/brands/zara', emoji: '👗' },
  { name: 'H&M', href: '/guides/brands/hm', emoji: '👔' },
  { name: 'Nike', href: '/guides/brands/nike', emoji: '👟' },
  { name: 'Adidas', href: '/guides/brands/adidas', emoji: '⚽' },
];

const faqs = [
  {
    q: 'Is Uniqlo available in Bahrain?',
    a: 'Yes, Uniqlo has stores in Bahrain at City Centre Bahrain and The Avenues Bahrain, offering their full range of quality basics and innovative fabrics.',
  },
  {
    q: 'What is Uniqlo known for?',
    a: 'Uniqlo is known for high-quality basics, innovative fabrics like Heattech and AIRism, affordable pricing, and timeless designs that focus on function and simplicity.',
  },
  {
    q: 'Does Uniqlo Bahrain have kids\' clothes?',
    a: 'Yes, both Uniqlo stores in Bahrain carry kids\' collections including basics, UT graphic tees, and seasonal items.',
  },
  {
    q: 'Is Uniqlo expensive in Bahrain?',
    a: 'Uniqlo is mid-range priced, positioned between fast fashion and premium brands. Their focus is on value - quality basics at reasonable prices.',
  },
];

export default function UniqloBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-red-950/5 to-slate-950 text-white">
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
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 to-slate-900/50" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium mb-4">
              🧥 Quality Basics
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-red-500">UNIQLO</span>
              {' '}
              <span className="text-gray-400">in Bahrain</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The Japanese retail giant founded in 1984, Uniqlo is known for &quot;LifeWear&quot; - 
              simple, high-quality, everyday clothing. Famous for innovative fabrics like 
              Heattech and AIRism, Uniqlo offers timeless basics at accessible prices.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Stores', value: '2', icon: ShoppingBag },
              { label: 'Style', value: 'LifeWear', icon: Star },
              { label: 'Specialty', value: 'Basics', icon: Sparkles },
              { label: 'Origin', value: 'Japan', icon: Info },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-red-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Store Locations */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Uniqlo Stores in Bahrain</h2>
          <p className="text-gray-400 mb-8">Find your nearest Uniqlo location.</p>
          
          <div className="space-y-6">
            {storeLocations.map((store) => (
              <div 
                key={store.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-red-500/10"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-red-400">{store.name}</h3>
                      {store.isPrimary && (
                        <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded">
                          MAIN STORE
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-2 text-sm mb-4">
                      <p className="flex items-center gap-2 text-gray-300">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        {store.address}
                      </p>
                      <p className="flex items-center gap-2 text-gray-300">
                        <Info className="w-4 h-4 text-gray-500" />
                        {store.floor}
                      </p>
                      <p className="flex items-center gap-2 text-gray-300">
                        <Clock className="w-4 h-4 text-gray-500" />
                        {store.hours}
                      </p>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-2">Products:</p>
                      <div className="flex flex-wrap gap-2">
                        {store.products.map((product) => (
                          <span key={product} className="px-2 py-1 bg-red-500/10 text-red-300 text-xs rounded">
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-2">Features:</p>
                      <div className="flex flex-wrap gap-2">
                        {store.features.map((feature) => (
                          <span key={feature} className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded">
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
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-yellow-400 text-sm flex items-start gap-2">
              <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
              Store locations may change. Please verify current location before visiting.
            </p>
          </div>
        </div>
      </section>

      {/* Shopping Tips */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Tips for Shopping Uniqlo in Bahrain</h2>
          
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
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Brands in Bahrain</h2>
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
      <section className="py-16 px-4 bg-gradient-to-r from-red-500/10 to-slate-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More Shopping in Bahrain</h2>
          <p className="text-gray-300 mb-8">
            Discover other fashion brands and shopping destinations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/brands/nike"
              className="px-8 py-3 bg-red-500 hover:bg-red-400 text-white font-bold rounded-lg transition-colors"
            >
              Nike Guide
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
            headline: 'Uniqlo Bahrain - Store Locations & Shopping Guide 2026',
            description: 'Find Uniqlo stores in Bahrain. Complete guide to Uniqlo locations.',
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
