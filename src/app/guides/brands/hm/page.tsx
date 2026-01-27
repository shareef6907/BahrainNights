import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Clock, ExternalLink, 
  Sparkles, ShoppingBag, Star, Info, Users
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'H&M Bahrain - All Store Locations & Shopping Guide 2026',
  description: 'Find all H&M stores in Bahrain. Complete guide to H&M locations at City Centre, Seef Mall, The Avenues & more. Store hours, directions & shopping tips.',
  keywords: 'H&M Bahrain, H&M store Bahrain, H&M City Centre Bahrain, H&M Seef Mall, H&M Avenues Bahrain, where to buy H&M Bahrain',
  openGraph: {
    title: 'H&M Bahrain - All Store Locations & Shopping Guide 2026',
    description: 'Find all H&M stores in Bahrain. Complete guide to H&M locations across the Kingdom.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/brands/hm',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/brands/hm',
  },
};

const storeLocations = [
  {
    name: 'H&M - City Centre Bahrain',
    mall: 'City Centre Bahrain',
    address: 'City Centre Bahrain, Seef District, Manama',
    floor: 'Ground Floor & First Floor',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    products: ['Women\'s Fashion', 'Men\'s Fashion', 'Kids\' Fashion', 'H&M Home', 'Divided', 'Sport'],
    features: ['Largest store in Bahrain', 'Two floors', 'Full collection', 'H&M Home section'],
    mapsLink: 'https://www.google.com/maps/search/H%26M+City+Centre+Bahrain',
    isPrimary: true,
  },
  {
    name: 'H&M - Seef Mall',
    mall: 'Seef Mall',
    address: 'Seef Mall, Seef District, Manama',
    floor: 'Ground Floor',
    hours: 'Sun-Thu: 10:00 AM - 10:00 PM, Fri-Sat: 10:00 AM - 11:00 PM',
    products: ['Women\'s Fashion', 'Men\'s Fashion', 'Kids\' Fashion', 'Divided'],
    features: ['Convenient location', 'Good selection'],
    mapsLink: 'https://www.google.com/maps/search/H%26M+Seef+Mall+Bahrain',
    isPrimary: false,
  },
  {
    name: 'H&M - The Avenues Bahrain',
    mall: 'The Avenues Bahrain',
    address: 'The Avenues, Bahrain Bay, Manama',
    floor: 'Ground Floor',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    products: ['Women\'s Fashion', 'Men\'s Fashion', 'Kids\' Fashion', 'Divided', 'Sport'],
    features: ['Modern store', 'Full collection'],
    mapsLink: 'https://www.google.com/maps/search/H%26M+Avenues+Bahrain',
    isPrimary: false,
  },
  {
    name: 'H&M - Marassi Galleria',
    mall: 'Marassi Galleria',
    address: 'Marassi Galleria, Diyar Al Muharraq, Bahrain',
    floor: 'Ground Floor',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    products: ['Women\'s Fashion', 'Men\'s Fashion', 'Kids\' Fashion', 'Divided', 'Sport'],
    features: ['Beachfront mall', 'Premium location', 'Near Marassi Aquarium'],
    mapsLink: 'https://www.google.com/maps/search/H%26M+Marassi+Galleria+Bahrain',
    isPrimary: false,
  },
];

const shoppingTips = [
  {
    title: 'Member Pricing',
    tip: 'Join H&M Member for free to access member pricing, early sale access, and exclusive offers. Sign up in-store or via the app.',
  },
  {
    title: 'Sales Season',
    tip: 'Major sales happen in January and July. H&M also has frequent mid-season sales and Member Week promotions.',
  },
  {
    title: 'Garment Collecting',
    tip: 'H&M accepts old clothes from any brand for recycling. Drop off a bag and receive a discount voucher.',
  },
  {
    title: 'Conscious Collection',
    tip: 'Look for the green tag - Conscious Collection items are made from sustainable materials.',
  },
];

const relatedBrands = [
  { name: 'Zara', href: '/guides/brands/zara', emoji: '👗' },
  { name: 'Uniqlo', href: '/guides/brands/uniqlo', emoji: '🧥' },
  { name: 'Nike', href: '/guides/brands/nike', emoji: '👟' },
  { name: 'Adidas', href: '/guides/brands/adidas', emoji: '⚽' },
];

const faqs = [
  {
    q: 'How many H&M stores are there in Bahrain?',
    a: 'H&M has 5 stores in Bahrain - City Centre Bahrain (flagship), Seef Mall, The Avenues Bahrain, Bahrain Mall, and Marassi Galleria.',
  },
  {
    q: 'Which is the biggest H&M in Bahrain?',
    a: 'The City Centre Bahrain H&M is the largest, spanning two floors with complete collections including H&M Home.',
  },
  {
    q: 'Does H&M Bahrain have H&M Home?',
    a: 'Yes, the City Centre Bahrain flagship store has an H&M Home section with homeware, bedding, and decor items.',
  },
  {
    q: 'Can I shop H&M online in Bahrain?',
    a: 'Yes, H&M offers online shopping in Bahrain through their website and app with delivery options.',
  },
];

export default function HMBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-red-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Brands', url: 'https://www.bahrainnights.com/guides' },
          { name: 'H&M', url: 'https://www.bahrainnights.com/guides/brands/hm' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-slate-900/50" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium mb-4">
              👔 Fast Fashion
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-red-400">H&M</span>
              {' '}
              <span className="text-gray-400">in Bahrain</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The Swedish fashion retailer founded in 1947, H&M (Hennes & Mauritz) offers 
              affordable fashion and quality for women, men, teenagers, and children. With 
              multiple stores across Bahrain, trendy fashion is always within reach.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Stores', value: '4+', icon: ShoppingBag },
              { label: 'Flagship', value: 'City Centre', icon: Star },
              { label: 'Founded', value: '1947', icon: Sparkles },
              { label: 'Style', value: 'Affordable', icon: Users },
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
          <h2 className="text-3xl font-bold mb-4">All H&M Stores in Bahrain</h2>
          <p className="text-gray-400 mb-8">Find your nearest H&M location.</p>
          
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
                          FLAGSHIP
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
          <h2 className="text-3xl font-bold mb-8">Tips for Shopping H&M in Bahrain</h2>
          
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
              href="/guides/brands/zara"
              className="px-8 py-3 bg-red-500 hover:bg-red-400 text-white font-bold rounded-lg transition-colors"
            >
              Zara Guide
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
            headline: 'H&M Bahrain - All Store Locations & Shopping Guide 2026',
            description: 'Find all H&M stores in Bahrain. Complete guide to H&M locations across the Kingdom.',
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
