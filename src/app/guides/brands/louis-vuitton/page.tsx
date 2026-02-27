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
  title: 'Louis Vuitton Bahrain - Store Locations & Shopping Guide 2026',
  description: 'Find Louis Vuitton store in Bahrain. Complete guide to LV at Marassi Galleria. Store hours, directions & shopping tips.',
  keywords: 'Louis Vuitton Bahrain, LV Bahrain, Louis Vuitton store Bahrain, where to buy Louis Vuitton Bahrain, Louis Vuitton Marassi Galleria, LV bags Bahrain',
  openGraph: {
    title: 'Louis Vuitton Bahrain - Store Locations & Shopping Guide 2026',
    description: 'Find Louis Vuitton stores in Bahrain. Complete guide to LV locations at Marassi Galleria.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/brands/louis-vuitton',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/brands/louis-vuitton',
  },
};

const storeLocations = [
  {
    name: 'Louis Vuitton - Marassi Galleria',
    mall: 'Marassi Galleria',
    address: 'Marassi Galleria, Diyar Al Muharraq, Bahrain',
    floor: 'Ground Floor',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    products: ['Leather Goods', 'Handbags', 'Travel Bags', 'Small Leather Goods', 'Accessories', 'Shoes', 'Ready-to-Wear', 'Watches', 'Jewelry'],
    features: ['Full collection', 'Personalization services', 'Hot stamping available', 'Premium beachfront location', 'Near Address Hotel'],
    mapsLink: 'https://www.google.com/maps/search/Louis+Vuitton+Marassi+Galleria+Bahrain',
    isPrimary: true,
    rating: 3.3,
    reviews: 93,
  },
];

const shoppingTips = [
  {
    title: 'Hot Stamping Service',
    tip: 'Louis Vuitton offers complimentary hot stamping to personalize your leather goods with initials. Ask in-store.',
  },
  {
    title: 'Personal Shopping',
    tip: 'Request a dedicated sales associate for a more personalized shopping experience with expert advice.',
  },
  {
    title: 'New Arrivals',
    tip: 'The Marassi Galleria main store carries the full collection including exclusives.',
  },
  {
    title: 'Waitlists',
    tip: 'Popular items like Neverfull and Speedy may have waitlists. Ask to be added and they\'ll call when stock arrives.',
  },
];

const relatedBrands = [
  { name: 'Chanel', href: '/guides/brands/chanel', emoji: '🖤' },
  { name: 'Gucci', href: '/guides/brands/gucci', emoji: '🐍' },
  { name: 'Dior', href: '/guides/brands/dior', emoji: '💄' },
  { name: 'Hermès', href: '/guides/brands/hermes', emoji: '🧣' },
];

const faqs = [
  {
    q: 'Is Louis Vuitton available in Bahrain?',
    a: 'Yes, Louis Vuitton has one boutique in Bahrain located at Marassi Galleria in Diyar Al Muharraq, offering the full LV collection including leather goods, fashion, and accessories.',
  },
  {
    q: 'Where is the Louis Vuitton store in Bahrain?',
    a: 'The Louis Vuitton boutique is located at Marassi Galleria, a premium beachfront mall in Diyar Al Muharraq. It offers the full collection including watches, jewelry, and ready-to-wear.',
  },
  {
    q: 'Is Louis Vuitton cheaper in Bahrain?',
    a: 'Louis Vuitton prices in Bahrain are generally similar to Dubai and other GCC countries. Prices are aligned with regional pricing standards.',
  },
  {
    q: 'Does Louis Vuitton Bahrain offer personalization?',
    a: 'Yes, the Marassi Galleria store offers complimentary hot stamping service to add your initials to eligible leather goods. Some items may also be available for special orders.',
  },
];

export default function LouisVuittonBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-amber-950/5 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Brands', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Louis Vuitton', url: 'https://www.bahrainnights.com/guides/brands/louis-vuitton' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 to-orange-900/20" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-4">
              👜 Luxury Fashion
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-amber-400">Louis Vuitton</span>
              {' '}
              <span className="text-gray-400">in Bahrain</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Founded in Paris in 1854, Louis Vuitton is the world&apos;s most valuable luxury brand. 
              Known for its iconic monogram canvas and exceptional craftsmanship, LV offers 
              leather goods, fashion, and accessories at Marassi Galleria in Bahrain.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Store', value: '1', icon: ShoppingBag },
              { label: 'Rating', value: '3.3★', icon: Star },
              { label: 'Reviews', value: '93', icon: Sparkles },
              { label: '', value: 'Marassi Galleria', icon: MapPin },
            ].map((stat, index) => (
              <div key={`${stat.value}-${index}`} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-amber-400" />
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
          <h2 className="text-3xl font-bold mb-4">Louis Vuitton Store in Bahrain</h2>
          <p className="text-gray-400 mb-8">One main boutique serving the Kingdom of Bahrain at the prestigious Marassi Galleria.</p>
          
          <div className="space-y-6">
            {storeLocations.map((store) => (
              <div 
                key={store.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/10"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-amber-400">{store.name}</h3>
                      {store.isPrimary && (
                        <span className="px-2 py-0.5 bg-amber-500 text-black text-xs font-bold rounded">
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
                          <span key={product} className="px-2 py-1 bg-amber-500/10 text-amber-300 text-xs rounded">
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
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-amber-500 text-black font-bold rounded-lg hover:bg-amber-400 transition-colors"
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
          <h2 className="text-3xl font-bold mb-8">Tips for Shopping Louis Vuitton in Bahrain</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {shoppingTips.map((item) => (
              <div key={item.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-amber-400 mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Brands */}
      <section className="py-16 px-4">
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
                <span className="font-medium group-hover:text-amber-400 transition-colors">
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
      <section className="py-16 px-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More Shopping in Bahrain</h2>
          <p className="text-gray-300 mb-8">
            Discover other luxury brands and shopping destinations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/brands/gucci"
              className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg transition-colors"
            >
              Gucci Guide
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
            headline: 'Louis Vuitton Bahrain - Store Locations & Shopping Guide 2026',
            description: 'Find Louis Vuitton stores in Bahrain. Complete guide to LV locations at Marassi Galleria.',
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
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://bahrainnights.com/guides/brands/louis-vuitton',
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
            name: 'Louis Vuitton - Marassi Galleria Bahrain',
            image: 'https://www.bahrainnights.com/images/brands/louis-vuitton.jpg',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Marassi Galleria, Diyar Al Muharraq',
              addressLocality: 'Muharraq',
              addressCountry: 'BH',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '3.3',
              reviewCount: '93',
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
              name: 'Louis Vuitton',
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
