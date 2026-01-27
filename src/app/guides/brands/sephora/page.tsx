import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Clock, ExternalLink, 
  Sparkles, ShoppingBag, Star, Info
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Sephora Bahrain - Store Locations & Beauty Guide 2026',
  description: 'Find Sephora stores in Bahrain. Complete guide to Sephora at City Centre & The Avenues. Makeup, skincare, fragrances, and exclusive brands.',
  keywords: 'Sephora Bahrain, Sephora store Bahrain, Sephora City Centre Bahrain, makeup Bahrain, beauty store Bahrain, skincare Bahrain',
  openGraph: {
    title: 'Sephora Bahrain - Store Locations & Beauty Guide 2026',
    description: 'Find Sephora stores in Bahrain. Complete guide to Sephora locations.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/brands/sephora',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/brands/sephora',
  },
};

const storeLocations = [
  {
    name: 'Sephora - City Centre Bahrain',
    mall: 'City Centre Bahrain',
    address: 'City Centre Bahrain, Seef District, Manama',
    floor: 'Ground Floor',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    products: ['Makeup', 'Skincare', 'Fragrance', 'Haircare', 'Beauty Tools', 'Sephora Collection', 'Exclusive Brands'],
    features: ['Largest Sephora in Bahrain', 'Beauty services', 'Sephora Collection', 'Fragrance bar'],
    mapsLink: 'https://www.google.com/maps/search/Sephora+City+Centre+Bahrain',
    isPrimary: true,
  },
  {
    name: 'Sephora - The Avenues Bahrain',
    mall: 'The Avenues Bahrain',
    address: 'The Avenues, Bahrain Bay, Manama',
    floor: 'Ground Floor',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    products: ['Makeup', 'Skincare', 'Fragrance', 'Haircare', 'Beauty Tools', 'Sephora Collection'],
    features: ['Modern store', 'Good selection', 'Beauty advisors'],
    mapsLink: 'https://www.google.com/maps/search/Sephora+Avenues+Bahrain',
    isPrimary: false,
  },
  {
    name: 'Sephora - Seef Mall',
    mall: 'Seef Mall',
    address: 'Seef Mall, Road 2813, Seef District, Manama',
    floor: 'Ground Floor',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    products: ['Makeup', 'Skincare', 'Fragrance', 'Haircare', 'Beauty Tools', 'Sephora Collection'],
    features: ['Convenient location', 'Beauty advisors', 'Good selection'],
    mapsLink: 'https://www.google.com/maps/search/Sephora+Seef+Mall+Bahrain',
    isPrimary: false,
  },
  {
    name: 'Sephora - Marassi Galleria',
    mall: 'Marassi Galleria',
    address: 'Marassi Galleria, Diyar Al Muharraq, Bahrain',
    floor: 'Ground Floor',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    products: ['Makeup', 'Skincare', 'Fragrance', 'Haircare', 'Beauty Tools', 'Sephora Collection'],
    features: ['Beachfront mall', 'Premium location', 'Near Marassi Aquarium'],
    mapsLink: 'https://www.google.com/maps/search/Sephora+Marassi+Galleria+Bahrain',
    isPrimary: false,
  },
];

const exclusiveBrands = [
  'Fenty Beauty', 'Rare Beauty', 'Charlotte Tilbury', 'Huda Beauty', 
  'NARS', 'Urban Decay', 'Too Faced', 'Benefit', 'Tarte', 'Drunk Elephant',
  'The Ordinary', 'Sol de Janeiro', 'Sephora Collection'
];

const shoppingTips = [
  {
    title: 'Beauty Insider',
    tip: 'Join the free Beauty Insider loyalty program for points on purchases, birthday gifts, and exclusive offers.',
  },
  {
    title: 'Sample Everything',
    tip: 'Sephora encourages sampling. Ask beauty advisors for samples before committing to full-size products.',
  },
  {
    title: 'Fragrance First',
    tip: 'Test fragrances early in your visit - your nose gets overwhelmed after a few scents. Use coffee beans to reset.',
  },
  {
    title: 'Mini Sets',
    tip: 'Travel-size sets are great for trying multiple products or as gifts. Look for holiday and limited edition sets.',
  },
];

const relatedBrands = [
  { name: 'Dior', href: '/guides/brands/dior', emoji: '💄' },
  { name: 'Chanel', href: '/guides/brands/chanel', emoji: '🖤' },
  { name: 'Bath & Body Works', href: '/guides/brands/bath-body-works', emoji: '🛁' },
  { name: 'Zara', href: '/guides/brands/zara', emoji: '👗' },
];

const faqs = [
  {
    q: 'Where is Sephora in Bahrain?',
    a: 'Sephora has 3 stores in Bahrain - City Centre Bahrain (the largest), The Avenues Bahrain, and Marassi Galleria. All offer the full range of makeup, skincare, and fragrance.',
  },
  {
    q: 'Does Sephora Bahrain have Fenty Beauty?',
    a: 'Yes, Sephora is the exclusive retailer for Fenty Beauty in Bahrain. You can find the full Fenty Beauty and Fenty Skin range at Sephora stores.',
  },
  {
    q: 'Does Sephora Bahrain offer beauty services?',
    a: 'Yes, the City Centre store offers beauty services including makeovers and skincare consultations. Book in advance for special occasions.',
  },
  {
    q: 'Can I return products at Sephora Bahrain?',
    a: 'Sephora has a return policy for unused products with receipt. Check current terms in-store. Sampling before buying helps avoid returns.',
  },
];

export default function SephoraBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-pink-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Brands', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Sephora', url: 'https://www.bahrainnights.com/guides/brands/sephora' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-900/20 to-black/50" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-pink-500/20 text-pink-400 rounded-full text-sm font-medium mb-4">
              💄 Beauty
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-white">SEPHORA</span>
              {' '}
              <span className="text-gray-400">in Bahrain</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The world&apos;s leading beauty retailer, Sephora offers a curated selection of 
              makeup, skincare, fragrance, and haircare from top and emerging brands. 
              Experience beauty at two locations in Bahrain.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Stores', value: '3', icon: ShoppingBag },
              { label: 'Main Store', value: 'City Centre', icon: Star },
              { label: 'Brands', value: '100+', icon: Sparkles },
              { label: 'Exclusive', value: 'Fenty+', icon: Info },
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

      {/* Store Locations */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Sephora Stores in Bahrain</h2>
          <p className="text-gray-400 mb-8">Find your nearest Sephora location.</p>
          
          <div className="space-y-6">
            {storeLocations.map((store) => (
              <div 
                key={store.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-pink-500/10"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-pink-400">{store.name}</h3>
                      {store.isPrimary && (
                        <span className="px-2 py-0.5 bg-pink-500 text-white text-xs font-bold rounded">
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
                      <p className="text-sm text-gray-500 mb-2">Categories:</p>
                      <div className="flex flex-wrap gap-2">
                        {store.products.map((product) => (
                          <span key={product} className="px-2 py-1 bg-pink-500/10 text-pink-300 text-xs rounded">
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
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-pink-500 text-white font-bold rounded-lg hover:bg-pink-400 transition-colors"
                    >
                      <MapPin className="w-4 h-4" />
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exclusive Brands */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Brands Available at Sephora Bahrain</h2>
          <p className="text-gray-400 mb-8">Exclusive and popular brands you&apos;ll find at Sephora.</p>
          
          <div className="flex flex-wrap gap-3">
            {exclusiveBrands.map((brand) => (
              <span key={brand} className="px-4 py-2 bg-white/5 text-white rounded-full text-sm hover:bg-pink-500/20 transition-colors">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Shopping Tips */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Tips for Shopping at Sephora Bahrain</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {shoppingTips.map((item) => (
              <div key={item.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-pink-400 mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Brands */}
      <section className="py-16 px-4 bg-black/30">
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
                <span className="font-medium group-hover:text-pink-400 transition-colors">
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
      <section className="py-16 px-4 bg-gradient-to-r from-pink-500/10 to-purple-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More Shopping in Bahrain</h2>
          <p className="text-gray-300 mb-8">
            Discover other beauty and lifestyle brands.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/brands/bath-body-works"
              className="px-8 py-3 bg-pink-500 hover:bg-pink-400 text-white font-bold rounded-lg transition-colors"
            >
              Bath & Body Works Guide
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
            headline: 'Sephora Bahrain - Store Locations & Beauty Guide 2026',
            description: 'Find Sephora stores in Bahrain. Complete guide to Sephora locations.',
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
