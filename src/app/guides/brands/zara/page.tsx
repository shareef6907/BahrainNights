import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Clock, Phone, ExternalLink, 
  Sparkles, ShoppingBag, Star, Info, Users
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Zara Bahrain - All Store Locations & Shopping Guide 2026',
  description: 'Find all Zara stores in Bahrain. Complete guide to Zara locations at City Centre, Seef Mall, The Avenues & more. Store hours, directions & shopping tips.',
  keywords: 'Zara Bahrain, Zara store Bahrain, Zara City Centre Bahrain, Zara Seef Mall, Zara Avenues Bahrain, where to buy Zara Bahrain',
  openGraph: {
    title: 'Zara Bahrain - All Store Locations & Shopping Guide 2026',
    description: 'Find all Zara stores in Bahrain. Complete guide to Zara locations at City Centre, Seef Mall, The Avenues & more.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/brands/zara',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/brands/zara',
  },
};

const storeLocations = [
  {
    name: 'Zara - City Centre Bahrain',
    mall: 'City Centre Bahrain',
    address: 'City Centre Bahrain, Seef District, Manama',
    floor: 'Ground Floor & First Floor',
    phone: '+973 1717 8100',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    products: ['Women\'s Fashion', 'Men\'s Fashion', 'Kids\' Fashion', 'TRF Collection', 'Shoes', 'Accessories'],
    features: ['Largest store in Bahrain', 'Two floors', 'Full collection', 'Click & Collect'],
    mapsLink: 'https://www.google.com/maps/search/Zara+City+Centre+Bahrain',
    isPrimary: true,
  },
  {
    name: 'Zara - Seef Mall',
    mall: 'Seef Mall',
    address: 'Seef Mall, Seef District, Manama',
    floor: 'Ground Floor',
    phone: '+973 1758 1000',
    hours: 'Sun-Thu: 10:00 AM - 10:00 PM, Fri-Sat: 10:00 AM - 11:00 PM',
    products: ['Women\'s Fashion', 'Men\'s Fashion', 'Kids\' Fashion', 'Accessories'],
    features: ['Popular location', 'Good selection', 'Less crowded weekdays'],
    mapsLink: 'https://www.google.com/maps/search/Zara+Seef+Mall+Bahrain',
    isPrimary: false,
  },
  {
    name: 'Zara - The Avenues Bahrain',
    mall: 'The Avenues Bahrain',
    address: 'The Avenues, Bahrain Bay, Manama',
    floor: 'Ground Floor',
    phone: '+973 1711 6000',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    products: ['Women\'s Fashion', 'Men\'s Fashion', 'Kids\' Fashion', 'TRF Collection', 'Shoes', 'Accessories'],
    features: ['Newest store', 'Modern layout', 'Full collection'],
    mapsLink: 'https://www.google.com/maps/search/Zara+Avenues+Bahrain',
    isPrimary: false,
  },
  {
    name: 'Zara - Bahrain Mall',
    mall: 'Bahrain Mall',
    address: 'Bahrain Mall, Sanabis, Manama',
    floor: 'Ground Floor',
    hours: 'Sun-Thu: 10:00 AM - 10:00 PM, Fri-Sat: 10:00 AM - 11:00 PM',
    products: ['Women\'s Fashion', 'Men\'s Fashion', 'Kids\' Fashion'],
    features: ['Convenient location', 'Smaller store'],
    mapsLink: 'https://www.google.com/maps/search/Zara+Bahrain+Mall',
    isPrimary: false,
  },
  {
    name: 'Zara - Marassi Galleria',
    mall: 'Marassi Galleria',
    address: 'Marassi Galleria, Diyar Al Muharraq, Bahrain',
    floor: 'Ground Floor',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    products: ['Women\'s Fashion', 'Men\'s Fashion', 'Kids\' Fashion', 'TRF Collection', 'Accessories'],
    features: ['Beachfront mall', 'Premium location', 'Near Marassi Aquarium'],
    mapsLink: 'https://www.google.com/maps/search/Zara+Marassi+Galleria+Bahrain',
    isPrimary: false,
  },
];

const shoppingTips = [
  {
    title: 'New Arrivals',
    tip: 'Zara releases new styles twice a week, typically Monday and Thursday. Visit early in the week for the freshest picks.',
  },
  {
    title: 'Sales Season',
    tip: 'Major sales happen twice yearly - January and July. Be there early for the best selection.',
  },
  {
    title: 'City Centre Flagship',
    tip: 'For the widest selection including TRF and limited edition items, visit the two-floor City Centre store.',
  },
  {
    title: 'Try Before You Buy',
    tip: 'Zara sizing can vary between collections. Always try items on or check the return policy.',
  },
];

const relatedBrands = [
  { name: 'H&M', href: '/guides/brands/hm', emoji: '👔' },
  { name: 'Uniqlo', href: '/guides/brands/uniqlo', emoji: '🧥' },
  { name: 'Nike', href: '/guides/brands/nike', emoji: '👟' },
  { name: 'Sephora', href: '/guides/brands/sephora', emoji: '💄' },
];

const faqs = [
  {
    q: 'How many Zara stores are there in Bahrain?',
    a: 'Zara has 5 stores in Bahrain - City Centre Bahrain (flagship), Seef Mall, The Avenues Bahrain, Bahrain Mall, and Marassi Galleria.',
  },
  {
    q: 'Which is the biggest Zara in Bahrain?',
    a: 'The City Centre Bahrain Zara is the largest, spanning two floors with the complete women\'s, men\'s, and kids\' collections.',
  },
  {
    q: 'Does Zara Bahrain have sales?',
    a: 'Yes, Zara has two major sales per year in January and July. Additionally, there may be end-of-season clearances and special promotions.',
  },
  {
    q: 'Can I shop Zara online in Bahrain?',
    a: 'Yes, Zara offers online shopping in Bahrain through their website with delivery and Click & Collect options at select stores.',
  },
];

export default function ZaraBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Brands', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Zara', url: 'https://www.bahrainnights.com/guides/brands/zara' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-gray-900/50" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-white/10 text-white rounded-full text-sm font-medium mb-4">
              👗 Fast Fashion
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-white">ZARA</span>
              {' '}
              <span className="text-gray-400">in Bahrain</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The Spanish fast-fashion giant founded in 1975, Zara is known for bringing 
              runway trends to the high street at affordable prices. With multiple locations 
              across Bahrain, you&apos;re never far from the latest styles.
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
              { label: 'New Stock', value: '2x/week', icon: Sparkles },
              { label: 'Style', value: 'Fast Fashion', icon: Users },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-white/70" />
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
          <h2 className="text-3xl font-bold mb-4">All Zara Stores in Bahrain</h2>
          <p className="text-gray-400 mb-8">Find your nearest Zara location.</p>
          
          <div className="space-y-6">
            {storeLocations.map((store) => (
              <div 
                key={store.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-white">{store.name}</h3>
                      {store.isPrimary && (
                        <span className="px-2 py-0.5 bg-white text-black text-xs font-bold rounded">
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
                          <span key={product} className="px-2 py-1 bg-white/10 text-white text-xs rounded">
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-2">Features:</p>
                      <div className="flex flex-wrap gap-2">
                        {store.features.map((feature) => (
                          <span key={feature} className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded">
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
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
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
          <h2 className="text-3xl font-bold mb-8">Tips for Shopping Zara in Bahrain</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {shoppingTips.map((item) => (
              <div key={item.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
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
                <span className="font-medium group-hover:text-white transition-colors">
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
      <section className="py-16 px-4 bg-gradient-to-r from-gray-800/20 to-gray-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More Shopping in Bahrain</h2>
          <p className="text-gray-300 mb-8">
            Discover other fashion brands and shopping destinations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/brands/hm"
              className="px-8 py-3 bg-white hover:bg-gray-200 text-black font-bold rounded-lg transition-colors"
            >
              H&M Guide
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
            headline: 'Zara Bahrain - All Store Locations & Shopping Guide 2026',
            description: 'Find all Zara stores in Bahrain. Complete guide to Zara locations at City Centre, Seef Mall, The Avenues & more.',
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
