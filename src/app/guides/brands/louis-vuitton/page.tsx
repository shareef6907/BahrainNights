import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Clock, Phone, ExternalLink, 
  Sparkles, ShoppingBag, Star, Info
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Louis Vuitton Bahrain - Store Locations & Shopping Guide 2026',
  description: 'Find Louis Vuitton stores in Bahrain. Complete guide to LV locations at Moda Mall and City Centre Bahrain. Store hours, directions & shopping tips.',
  keywords: 'Louis Vuitton Bahrain, LV Bahrain, Louis Vuitton store Bahrain, where to buy Louis Vuitton Bahrain, Louis Vuitton Moda Mall, LV bags Bahrain',
  openGraph: {
    title: 'Louis Vuitton Bahrain - Store Locations & Shopping Guide 2026',
    description: 'Find Louis Vuitton stores in Bahrain. Complete guide to LV locations at Moda Mall and City Centre Bahrain.',
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
    name: 'Louis Vuitton - Moda Mall',
    mall: 'Moda Mall (Bahrain World Trade Center)',
    address: 'Bahrain World Trade Center, King Faisal Highway, Manama',
    floor: 'Ground Floor',
    phone: '+973 1753 5000',
    hours: 'Sun-Thu: 10:00 AM - 10:00 PM, Fri-Sat: 10:00 AM - 11:00 PM',
    products: ['Leather Goods', 'Handbags', 'Travel Bags', 'Small Leather Goods', 'Accessories', 'Shoes', 'Ready-to-Wear', 'Watches', 'Jewelry'],
    features: ['Full collection', 'Personalization services', 'Expert advisors'],
    mapsLink: 'https://www.google.com/maps/search/Louis+Vuitton+Moda+Mall+Bahrain',
    isPrimary: true,
  },
  {
    name: 'Louis Vuitton - City Centre Bahrain',
    mall: 'City Centre Bahrain',
    address: 'City Centre Bahrain, Seef District, Manama',
    floor: 'Ground Floor',
    phone: '+973 1717 1800',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    products: ['Leather Goods', 'Handbags', 'Small Leather Goods', 'Accessories', 'Selected Ready-to-Wear'],
    features: ['Popular location', 'Good selection', 'Hot stamping available'],
    mapsLink: 'https://www.google.com/maps/search/Louis+Vuitton+City+Centre+Bahrain',
    isPrimary: false,
  },
];

const shoppingTips = [
  {
    title: 'Hot Stamping Service',
    tip: 'Louis Vuitton offers complimentary hot stamping to personalize your leather goods with initials. Ask in-store.',
  },
  {
    title: 'Tax-Free Shopping',
    tip: 'Bahrain has 0% VAT, making luxury purchases more attractive. No tax refund paperwork needed.',
  },
  {
    title: 'New Arrivals',
    tip: 'Check both stores - they receive different stock. Moda Mall often gets exclusives first.',
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
    a: 'Yes, Louis Vuitton has two boutiques in Bahrain - the flagship store at Moda Mall (Bahrain World Trade Center) and another location at City Centre Bahrain.',
  },
  {
    q: 'Which Louis Vuitton store in Bahrain is bigger?',
    a: 'The Moda Mall location is the flagship store with a larger selection including watches, jewelry, and the full ready-to-wear collection. City Centre Bahrain focuses more on leather goods and accessories.',
  },
  {
    q: 'Is Louis Vuitton cheaper in Bahrain?',
    a: 'Bahrain has no VAT (0%), which can make luxury items more affordable than countries with high sales tax. Prices are generally similar to Dubai and other GCC countries.',
  },
  {
    q: 'Does Louis Vuitton Bahrain offer personalization?',
    a: 'Yes, both stores offer complimentary hot stamping service to add your initials to eligible leather goods. Some items may also be available for special orders.',
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
              leather goods, fashion, and accessories at two locations in Bahrain.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Stores', value: '2', icon: ShoppingBag },
              { label: 'Flagship', value: 'Moda Mall', icon: Star },
              { label: 'Also At', value: 'City Centre', icon: MapPin },
              { label: 'VAT', value: '0%', icon: Sparkles },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-amber-400" />
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
          <h2 className="text-3xl font-bold mb-4">Louis Vuitton Stores in Bahrain</h2>
          <p className="text-gray-400 mb-8">Two boutiques serving the Kingdom of Bahrain.</p>
          
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
                      {store.phone && (
                        <p className="flex items-center gap-2 text-gray-300">
                          <Phone className="w-4 h-4 text-gray-500" />
                          {store.phone}
                        </p>
                      )}
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
            description: 'Find Louis Vuitton stores in Bahrain. Complete guide to LV locations at Moda Mall and City Centre Bahrain.',
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
            name: 'Louis Vuitton - Moda Mall Bahrain',
            image: 'https://www.bahrainnights.com/images/brands/louis-vuitton.jpg',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Bahrain World Trade Center, King Faisal Highway',
              addressLocality: 'Manama',
              addressCountry: 'BH',
            },
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
                opens: '10:00',
                closes: '22:00',
              },
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Friday', 'Saturday'],
                opens: '10:00',
                closes: '23:00',
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
