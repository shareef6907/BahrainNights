import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Clock, ExternalLink, 
  Sparkles, ShoppingBag, Star, Info
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Crocs Bahrain - All Store Locations & Shopping Guide 2026',
  description: 'Find Crocs stores in Bahrain. Complete guide to Crocs locations at City Centre, Seef Mall & The Avenues. Jibbitz, Classic Clogs, and more.',
  keywords: 'Crocs Bahrain, Crocs store Bahrain, Crocs City Centre Bahrain, Crocs shoes Bahrain, where to buy Crocs Bahrain, Jibbitz Bahrain',
  openGraph: {
    title: 'Crocs Bahrain - All Store Locations & Shopping Guide 2026',
    description: 'Find Crocs stores in Bahrain. Complete guide to Crocs locations.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/brands/crocs',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/brands/crocs',
  },
};

const storeLocations = [
  {
    name: 'Crocs - City Centre Bahrain',
    mall: 'City Centre Bahrain',
    address: 'City Centre Bahrain, Seef District, Manama',
    floor: 'Ground Floor',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    products: ['Classic Clogs', 'Sandals', 'Slides', 'Kids\' Crocs', 'Jibbitz Charms', 'Limited Editions'],
    features: ['Full collection', 'Jibbitz station', 'Exclusive colors'],
    mapsLink: 'https://www.google.com/maps/search/Crocs+City+Centre+Bahrain',
    isPrimary: true,
  },
  {
    name: 'Crocs - Seef Mall',
    mall: 'Seef Mall',
    address: 'Seef Mall, Seef District, Manama',
    floor: 'Ground Floor',
    hours: 'Sun-Thu: 10:00 AM - 10:00 PM, Fri-Sat: 10:00 AM - 11:00 PM',
    products: ['Classic Clogs', 'Sandals', 'Slides', 'Kids\' Crocs', 'Jibbitz Charms'],
    features: ['Good selection', 'Popular styles'],
    mapsLink: 'https://www.google.com/maps/search/Crocs+Seef+Mall+Bahrain',
    isPrimary: false,
  },
  {
    name: 'Crocs - Marassi Galleria',
    mall: 'Marassi Galleria',
    address: 'Marassi Galleria Mall, Diyar Al Muharraq',
    floor: 'Ground Floor',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    products: ['Classic Clogs', 'Sandals', 'Slides', 'Kids\' Crocs', 'Jibbitz Charms', 'Limited Editions'],
    features: ['Newer location', 'Full range'],
    mapsLink: 'https://www.google.com/maps/search/Crocs+Marassi+Galleria+Bahrain',
    isPrimary: false,
  },
];

const shoppingTips = [
  {
    title: 'Jibbitz Customization',
    tip: 'Crocs stores have Jibbitz stations where you can personalize your Crocs with charms. Great for gifts!',
  },
  {
    title: 'Size Guide',
    tip: 'Crocs come in whole sizes only. If you\'re between sizes, go up. Try them on in-store.',
  },
  {
    title: 'Limited Editions',
    tip: 'Crocs collaborations (brands, characters, artists) sell out fast. Ask about new arrivals.',
  },
  {
    title: 'Best for Bahrain',
    tip: 'Classic Clogs, slides, and sandals are perfect for Bahrain\'s warm weather. Lightweight and waterproof.',
  },
];

const relatedBrands = [
  { name: 'Nike', href: '/guides/brands/nike', emoji: '👟' },
  { name: 'Adidas', href: '/guides/brands/adidas', emoji: '⚽' },
  { name: 'Zara', href: '/guides/brands/zara', emoji: '👗' },
  { name: 'H&M', href: '/guides/brands/hm', emoji: '👔' },
];

const faqs = [
  {
    q: 'Where can I buy Crocs in Bahrain?',
    a: 'Crocs has dedicated stores at City Centre Bahrain, Seef Mall, and The Avenues Bahrain. You can also find Crocs at some multi-brand shoe retailers.',
  },
  {
    q: 'Does Crocs Bahrain sell Jibbitz?',
    a: 'Yes, all Crocs stores in Bahrain have Jibbitz charms available. The stores have Jibbitz stations where you can customize your Crocs.',
  },
  {
    q: 'Are Crocs good for Bahrain weather?',
    a: 'Crocs are ideal for Bahrain\'s hot climate - they\'re lightweight, breathable, waterproof, and easy to clean. Great for casual wear, beach, and home.',
  },
  {
    q: 'Do Crocs have sales in Bahrain?',
    a: 'Crocs occasionally has promotions and seasonal sales. Follow their social media or ask in-store about current offers.',
  },
];

export default function CrocsBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-green-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Brands', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Crocs', url: 'https://www.bahrainnights.com/guides/brands/crocs' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-lime-900/20" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium mb-4">
              🐊 Footwear
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-green-400">CROCS</span>
              {' '}
              <span className="text-gray-400">in Bahrain</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The iconic foam clog brand has become a global phenomenon. Whether you love 
              them or questioned them, Crocs are comfortable, customizable with Jibbitz, 
              and perfect for Bahrain&apos;s warm climate. Find them at multiple locations.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Stores', value: '3+', icon: ShoppingBag },
              { label: 'Jibbitz', value: 'Available', icon: Sparkles },
              { label: 'Kids\' Range', value: 'Yes', icon: Star },
              { label: 'Style', value: 'Comfort', icon: Info },
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

      {/* Store Locations */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Crocs Stores in Bahrain</h2>
          <p className="text-gray-400 mb-8">Find your nearest Crocs location.</p>
          
          <div className="space-y-6">
            {storeLocations.map((store) => (
              <div 
                key={store.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-green-500/10"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-green-400">{store.name}</h3>
                      {store.isPrimary && (
                        <span className="px-2 py-0.5 bg-green-500 text-black text-xs font-bold rounded">
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
                          <span key={product} className="px-2 py-1 bg-green-500/10 text-green-300 text-xs rounded">
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
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-green-500 text-black font-bold rounded-lg hover:bg-green-400 transition-colors"
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
          <h2 className="text-3xl font-bold mb-8">Tips for Shopping Crocs in Bahrain</h2>
          
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
                <span className="font-medium group-hover:text-green-400 transition-colors">
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
      <section className="py-16 px-4 bg-gradient-to-r from-green-500/10 to-lime-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More Shopping in Bahrain</h2>
          <p className="text-gray-300 mb-8">
            Discover other footwear brands and shopping destinations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/brands/nike"
              className="px-8 py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded-lg transition-colors"
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
            headline: 'Crocs Bahrain - All Store Locations & Shopping Guide 2026',
            description: 'Find Crocs stores in Bahrain. Complete guide to Crocs locations.',
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
