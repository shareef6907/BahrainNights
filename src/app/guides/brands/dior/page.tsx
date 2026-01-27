import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Clock, ExternalLink, 
  Sparkles, ShoppingBag, Star, Info
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Dior Bahrain - Store Locations & Shopping Guide 2026',
  description: 'Find Dior stores in Bahrain. Complete guide to 3 Dior boutiques at City Centre, The Avenues & Marassi Galleria. Beauty counters, fashion boutique, store hours & shopping tips.',
  keywords: 'Dior Bahrain, Dior store Bahrain, where to buy Dior Bahrain, Dior City Centre, Dior The Avenues, Dior Marassi Galleria, Dior beauty Bahrain',
  openGraph: {
    title: 'Dior Bahrain - Store Locations & Shopping Guide 2026',
    description: 'Find Dior stores in Bahrain. Complete guide to Dior locations at Marassi Galleria.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/brands/dior',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/brands/dior',
  },
};

const storeLocations = [
  {
    name: 'DIOR Bahrain Marassi',
    mall: 'Marassi Galleria',
    address: 'Shop 2149, Marassi Galleria, Road 6403, Diyar Al Muharraq, Bahrain',
    floor: 'Ground Floor',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    products: ['Ready-to-Wear', 'Handbags', 'Accessories', 'Shoes', 'Fine Jewelry', 'Watches', 'Fragrances', 'Beauty'],
    features: ['Main boutique', 'Full collection', 'Beachfront luxury mall', 'Near Address Hotel'],
    mapsLink: 'https://www.google.com/maps/search/DIOR+Marassi+Galleria+Bahrain',
    isPrimary: true,
    rating: 4.4,
    reviews: 52,
  },
  {
    name: 'MAISON CHRISTIAN DIOR - The Avenues',
    mall: 'The Avenues Bahrain',
    address: 'The Avenues Mall, Bahrain Bay, Manama',
    floor: 'Ground Floor',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    products: ['Ready-to-Wear', 'Handbags', 'Accessories', 'Fragrances', 'Beauty'],
    features: ['Premium location', 'Bahrain Bay waterfront', 'Maison collection'],
    mapsLink: 'https://www.google.com/maps/search/Maison+Christian+Dior+Avenues+Bahrain',
    isPrimary: false,
    rating: 4.3,
    reviews: 22,
  },
  {
    name: 'Christian Dior Boutique - City Centre',
    mall: 'City Centre Bahrain',
    address: 'City Centre Bahrain, Seef District, Manama',
    floor: 'Ground Floor',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    products: ['Ready-to-Wear', 'Handbags', 'Accessories', 'Fragrances', 'Beauty'],
    features: ['Central location', 'Good accessibility', 'Popular mall'],
    mapsLink: 'https://www.google.com/maps/search/Dior+City+Centre+Bahrain',
    isPrimary: false,
    rating: 4.2,
    reviews: 17,
  },
];

const beautyCounters = [
  {
    name: 'Dior Beauty - Paris Gallery',
    location: 'City Centre Bahrain',
    products: ['Fragrances', 'Skincare', 'Makeup'],
    mapsLink: 'https://www.google.com/maps/search/Paris+Gallery+City+Centre+Bahrain',
  },
  {
    name: 'Dior Beauty - Faces',
    location: 'Multiple locations',
    products: ['Fragrances', 'Skincare', 'Makeup'],
    mapsLink: 'https://www.google.com/maps/search/Faces+Bahrain',
  },
  {
    name: 'Dior Beauty - Sephora',
    location: 'City Centre Bahrain & The Avenues',
    products: ['Makeup', 'Skincare', 'Selected Fragrances'],
    mapsLink: 'https://www.google.com/maps/search/Sephora+Bahrain',
  },
];

const shoppingTips = [
  {
    title: 'Iconic Pieces',
    tip: 'Lady Dior, Book Tote, and Saddle bags are Dior classics. These popular items may require waitlists.',
  },
  {
    title: 'Beauty First',
    tip: 'If you\'re unsure about Dior fashion, start with their beauty line at multiple counters across Bahrain.',
  },
  {
    title: 'Cruise Collections',
    tip: 'Dior releases unique cruise collections. Ask about limited edition items exclusive to the Middle East.',
  },
  {
    title: 'Personal Styling',
    tip: 'Book a private appointment for personalized styling advice and first access to new arrivals.',
  },
];

const relatedBrands = [
  { name: 'Chanel', href: '/guides/brands/chanel', emoji: '🖤' },
  { name: 'Louis Vuitton', href: '/guides/brands/louis-vuitton', emoji: '👜' },
  { name: 'Gucci', href: '/guides/brands/gucci', emoji: '🐍' },
  { name: 'Sephora', href: '/guides/brands/sephora', emoji: '💄' },
];

const faqs = [
  {
    q: 'Is Dior available in Bahrain?',
    a: 'Yes, Dior has three boutiques in Bahrain - the main store at Marassi Galleria (4.4★), Maison Christian Dior at The Avenues (4.3★), and City Centre Bahrain (4.2★). Dior beauty products are also available at Paris Gallery, Faces, and Sephora stores.',
  },
  {
    q: 'Which mall has Dior in Bahrain?',
    a: 'The main Dior boutique is at Marassi Galleria in Diyar Al Muharraq. Dior is also available at The Avenues and City Centre Bahrain. For beauty products only, visit Paris Gallery and Faces in various malls.',
  },
  {
    q: 'Does Dior Bahrain sell Lady Dior bags?',
    a: 'Yes, the Dior boutique at Marassi Galleria carries Lady Dior bags, though popular sizes and colors may have waitlists. Ask a sales associate about current availability.',
  },
  {
    q: 'Where can I buy Dior perfume in Bahrain?',
    a: 'Dior fragrances are available at the Marassi Galleria boutique, Paris Gallery, Faces stores, and Sephora across multiple malls in Bahrain.',
  },
];

export default function DiorBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Brands', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Dior', url: 'https://www.bahrainnights.com/guides/brands/dior' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800/30 to-gray-900/30" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-white/10 text-gray-300 rounded-full text-sm font-medium mb-4">
              💄 Luxury Fashion & Beauty
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-white">DIOR</span>
              {' '}
              <span className="text-gray-400">in Bahrain</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Founded by Christian Dior in 1946, the French luxury house revolutionized 
              fashion with the &quot;New Look&quot;. Today, Dior offers haute couture, ready-to-wear, 
              leather goods, accessories, and beauty products at its Bahrain boutique.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Boutiques', value: '3', icon: ShoppingBag },
              { label: 'Beauty Counters', value: '3+', icon: Sparkles },
              { label: '', value: 'Marassi Galleria', icon: MapPin },
              { label: '', value: 'The Avenues', icon: MapPin },
            ].map((stat, index) => (
              <div key={`${stat.value}-${index}`} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                {stat.label && <div className="text-sm text-gray-400">{stat.label}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Store Locations */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Dior Boutiques in Bahrain</h2>
          <p className="text-gray-400 mb-8">Two Dior boutiques serving the Kingdom of Bahrain.</p>
          
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
                      <p className="text-sm text-gray-500 mb-2">Products Available:</p>
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

      {/* Beauty Counters */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Dior Beauty Counters</h2>
          <p className="text-gray-400 mb-8">Find Dior fragrances, makeup, and skincare at these locations.</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {beautyCounters.map((counter) => (
              <div key={counter.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-lg text-white mb-2">{counter.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{counter.location}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {counter.products.map((product) => (
                    <span key={product} className="px-2 py-1 bg-white/10 text-xs rounded">
                      {product}
                    </span>
                  ))}
                </div>
                <a 
                  href={counter.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white hover:underline flex items-center gap-1"
                >
                  Find on Maps <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shopping Tips */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Tips for Shopping Dior in Bahrain</h2>
          
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
                <span className="font-medium group-hover:text-white transition-colors">
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
      <section className="py-16 px-4 bg-gradient-to-r from-gray-800/20 to-gray-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More Shopping in Bahrain</h2>
          <p className="text-gray-300 mb-8">
            Discover other luxury brands and shopping destinations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/brands/hermes"
              className="px-8 py-3 bg-white hover:bg-gray-200 text-black font-bold rounded-lg transition-colors"
            >
              Hermès Guide
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
            headline: 'Dior Bahrain - Store Locations & Shopping Guide 2026',
            description: 'Find Dior stores in Bahrain. Complete guide to Dior locations at Marassi Galleria.',
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
