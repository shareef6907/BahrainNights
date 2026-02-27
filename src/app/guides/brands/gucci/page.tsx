import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Clock, ExternalLink, 
  Sparkles, ShoppingBag, Star, Info
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
  title: 'Gucci Bahrain - Store Location & Shopping Guide 2026',
  description: 'Find Gucci in Bahrain at Marassi Galleria, Diyar Al Muharraq. Complete guide to the Gucci boutique with store hours, directions & luxury shopping tips.',
  keywords: 'Gucci Bahrain, Gucci store Bahrain, where to buy Gucci Bahrain, Gucci Marassi Galleria, Gucci bags Bahrain, Gucci Diyar Al Muharraq',
  openGraph: {
    title: 'Gucci Bahrain - Store Location & Shopping Guide 2026',
    description: 'Find Gucci in Bahrain at Marassi Galleria. Complete guide with store hours, directions & shopping tips.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/brands/gucci',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/brands/gucci',
  },
};

const storeLocations = [
  {
    name: 'Gucci - Marassi Galleria',
    mall: 'Marassi Galleria',
    address: 'Marassi Galleria Mall, Marassi Al Bahrain, Diyar Al Muharraq',
    floor: 'Ground Floor',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    products: ['Leather Goods', 'Handbags', 'Ready-to-Wear', 'Shoes', 'Accessories', 'Jewelry', 'Watches', 'Fragrances', 'Eyewear'],
    features: ['Full boutique', 'In-store pick-up for online orders', 'Personal styling', 'Beachfront luxury mall', 'Near Address Hotel'],
    mapsLink: 'https://www.google.com/maps/search/Gucci+Marassi+Galleria+Bahrain',
    isPrimary: true,
    rating: 4.3,
    reviews: 29,
  },
];

const shoppingTips = [
  {
    title: 'Online Order Pick-up',
    tip: 'Gucci offers in-store pick-up for online orders. Browse gucci.com and collect at the Marassi Galleria boutique.',
  },
  {
    title: 'Personal Styling',
    tip: 'Request a dedicated sales associate for personalized styling advice and access to the full collection.',
  },
  {
    title: 'New Collections',
    tip: 'Marassi Galleria receives new seasonal collections. Follow @gucci on Instagram for the latest drops.',
  },
  {
    title: 'Tax-Free Shopping',
    tip: 'Bahrain has no VAT on luxury goods, making prices competitive compared to other GCC countries.',
  },
];

const relatedBrands = [
  { name: 'Louis Vuitton', href: '/guides/brands/louis-vuitton', emoji: '👜' },
  { name: 'Chanel', href: '/guides/brands/chanel', emoji: '🖤' },
  { name: 'Dior', href: '/guides/brands/dior', emoji: '💄' },
  { name: 'Hermès', href: '/guides/brands/hermes', emoji: '🧣' },
];

const faqs = [
  {
    q: 'Is Gucci available in Bahrain?',
    a: 'Yes, Gucci has a boutique at Marassi Galleria in Diyar Al Muharraq. The store offers the full Gucci collection including leather goods, ready-to-wear, shoes, accessories, jewelry, and fragrances.',
  },
  {
    q: 'Where is the Gucci store in Bahrain?',
    a: 'The Gucci boutique is located at Marassi Galleria Mall in Diyar Al Muharraq. It is on the ground floor of Bahrain\'s premier luxury shopping destination, near the Address Beach Resort.',
  },
  {
    q: 'What happened to Gucci at Moda Mall?',
    a: 'The Gucci store at Moda Mall (Bahrain World Trade Center) has permanently closed. Gucci has relocated to the newer Marassi Galleria mall in Diyar Al Muharraq.',
  },
  {
    q: 'Is Gucci cheaper in Bahrain?',
    a: 'Bahrain has no VAT on luxury goods, which can make prices competitive. Prices are generally aligned with regional GCC pricing. Compare with gucci.com for specific items.',
  },
  {
    q: 'What are Gucci Bahrain\'s opening hours?',
    a: 'The Gucci store at Marassi Galleria is open Sunday to Wednesday from 10 AM to 10 PM, and Thursday to Saturday from 10 AM to 12 AM.',
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
            <span className="inline-block px-4 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium mb-4">
              🐍 Luxury Fashion
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-green-400">GUCCI</span>
              {' '}
              <span className="text-gray-400">in Bahrain</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Founded in Florence in 1921, Gucci is one of the world&apos;s leading luxury fashion houses. 
              Known for its iconic GG monogram, horsebit details, and bold Italian craftsmanship, 
              Gucci offers a full boutique experience at Marassi Galleria in Bahrain.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Store', value: '1', icon: ShoppingBag },
              { label: 'Rating', value: '4.3★', icon: Star },
              { label: 'Reviews', value: '29', icon: Sparkles },
              { label: '', value: 'Marassi Galleria', icon: MapPin },
            ].map((stat, index) => (
              <div key={`${stat.value}-${index}`} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-green-400" />
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
          <h2 className="text-3xl font-bold mb-4">Gucci Store in Bahrain</h2>
          <p className="text-gray-400 mb-8">One boutique serving the Kingdom of Bahrain at the prestigious Marassi Galleria.</p>
          
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
                        {mallLinks[store.mall] ? (
                          <Link href={mallLinks[store.mall]} className="hover:underline">
                            {store.mall}
                          </Link>
                        ) : (
                          store.address
                        )}
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
              Note: The former Gucci store at Moda Mall (Bahrain World Trade Center) has permanently closed. Marassi Galleria is now the only Gucci location in Bahrain.
            </p>
          </div>
        </div>
      </section>

      {/* Shopping Tips */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Tips for Shopping Gucci in Bahrain</h2>
          
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

      {/* Online Shopping */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Shop Gucci Online</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="font-bold text-green-400 mb-3">Official Website</h3>
              <p className="text-gray-400 text-sm mb-4">
                Browse the full Gucci collection on gucci.com with in-store pick-up available at the Marassi Galleria boutique.
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
              <h3 className="font-bold text-green-400 mb-3">In-Store Pick-Up</h3>
              <p className="text-gray-400 text-sm mb-4">
                Order online and collect at the Marassi Galleria store. Check gucci.com for eligible items and availability.
              </p>
              <p className="text-xs text-gray-500">
                Always verify availability before visiting the store.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Brands */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Luxury Brands in Bahrain</h2>
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
      <section className="py-16 px-4 bg-gradient-to-r from-green-500/10 to-red-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore Luxury Shopping in Bahrain</h2>
          <p className="text-gray-300 mb-8">
            Discover other luxury brands and shopping destinations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/malls/marassi-galleria"
              className="px-8 py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded-lg transition-colors"
            >
              Marassi Galleria Guide
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
            headline: 'Gucci Bahrain - Store Location & Shopping Guide 2026',
            description: 'Find Gucci in Bahrain at Marassi Galleria. Complete guide with store hours, directions & shopping tips.',
            author: {
              '@type': 'Organization',
              name: 'BahrainNights',
              url: 'https://bahrainnights.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'BahrainNights',
            },
            datePublished: '2026-01-27',
            dateModified: lastUpdated,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://bahrainnights.com/guides/brands/gucci',
            },
          }),
        }}
      />
      
      {/* Store Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Store',
            name: 'Gucci - Marassi Galleria Bahrain',
            image: 'https://www.bahrainnights.com/images/brands/gucci.jpg',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Marassi Galleria Mall, Marassi Al Bahrain',
              addressLocality: 'Diyar Al Muharraq',
              addressCountry: 'BH',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.3',
              reviewCount: '29',
            },
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday'],
                opens: '10:00',
                closes: '22:00',
              },
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Thursday', 'Friday', 'Saturday'],
                opens: '10:00',
                closes: '00:00',
              },
            ],
            brand: {
              '@type': 'Brand',
              name: 'Gucci',
            },
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
