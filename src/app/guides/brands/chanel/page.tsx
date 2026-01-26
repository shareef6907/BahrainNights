import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Clock, Phone, ExternalLink, 
  Sparkles, ShoppingBag, Star, Info
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Chanel Bahrain - Store Locations & Shopping Guide 2026',
  description: 'Find Chanel stores in Bahrain. Complete guide to Chanel locations at Moda Mall and luxury boutiques. Store hours, directions & tips for shopping Chanel in Bahrain.',
  keywords: 'Chanel Bahrain, Chanel store Bahrain, where to buy Chanel Bahrain, Chanel Moda Mall, Chanel perfume Bahrain, Chanel bags Bahrain',
  openGraph: {
    title: 'Chanel Bahrain - Store Locations & Shopping Guide 2026',
    description: 'Find Chanel stores in Bahrain. Complete guide to Chanel locations at Moda Mall and luxury boutiques.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/brands/chanel',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/brands/chanel',
  },
};

const storeLocations = [
  {
    name: 'Chanel - Moda Mall',
    mall: 'Moda Mall (Bahrain World Trade Center)',
    address: 'Bahrain World Trade Center, King Faisal Highway, Manama',
    floor: 'Ground Floor',
    phone: '+973 1753 5333',
    hours: 'Sun-Thu: 10:00 AM - 10:00 PM, Fri-Sat: 10:00 AM - 11:00 PM',
    products: ['Haute Couture', 'Ready-to-Wear', 'Handbags', 'Accessories', 'Fragrance', 'Beauty', 'Fine Jewelry', 'Watches'],
    features: ['Full boutique experience', 'Personal styling', 'Beauty counter'],
    mapsLink: 'https://www.google.com/maps/search/Chanel+Moda+Mall+Bahrain',
    isPrimary: true,
  },
  {
    name: 'Chanel - Marassi Galleria',
    mall: 'Marassi Galleria',
    address: 'Marassi Galleria, Marassi Al Bahrain, Diyar Al Muharraq',
    floor: 'Level 2',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    products: ['Ready-to-Wear', 'Handbags', 'Accessories', 'Fragrance', 'Beauty', 'Fine Jewelry', 'Watches'],
    features: ['Beachfront luxury mall', 'Premium boutique', 'Near Address Hotel'],
    mapsLink: 'https://www.google.com/maps/search/Chanel+Marassi+Galleria+Bahrain',
    isPrimary: false,
  },
];

const beautyCounters = [
  {
    name: 'Chanel Beauty - Paris Gallery',
    location: 'City Centre Bahrain',
    products: ['Fragrances', 'Makeup', 'Skincare'],
    mapsLink: 'https://www.google.com/maps/search/Paris+Gallery+City+Centre+Bahrain',
  },
  {
    name: 'Chanel Beauty - Faces',
    location: 'Various locations',
    products: ['Fragrances', 'Makeup', 'Skincare'],
    mapsLink: 'https://www.google.com/maps/search/Faces+Bahrain',
  },
];

const shoppingTips = [
  {
    title: 'Visit During Weekdays',
    tip: 'For personalized attention and less crowds, visit Monday to Wednesday mornings.',
  },
  {
    title: 'Duty-Free Advantage',
    tip: 'Bahrain has no VAT, making luxury purchases more attractive than many other destinations.',
  },
  {
    title: 'New Collections',
    tip: 'New collections typically arrive in February/March (Spring) and September/October (Fall).',
  },
  {
    title: 'Request an Appointment',
    tip: 'For high-value purchases like jewelry or haute couture, request a private appointment.',
  },
];

const relatedBrands = [
  { name: 'Louis Vuitton', href: '/guides/brands/louis-vuitton', emoji: '👜' },
  { name: 'Dior', href: '/guides/brands/dior', emoji: '💄' },
  { name: 'Hermès', href: '/guides/brands/hermes', emoji: '🧣' },
  { name: 'Gucci', href: '/guides/brands/gucci', emoji: '🐍' },
];

const faqs = [
  {
    q: 'Is Chanel available in Bahrain?',
    a: 'Yes, Chanel has two boutiques in Bahrain - the flagship at Moda Mall (Bahrain World Trade Center) and a new location at Marassi Galleria in Diyar Al Muharraq, offering fashion, accessories, and beauty products.',
  },
  {
    q: 'Which mall has Chanel in Bahrain?',
    a: 'Chanel boutiques are located in Moda Mall at Bahrain World Trade Center and Marassi Galleria (Level 2) in Diyar Al Muharraq. Chanel beauty products are also available at Paris Gallery and Faces stores in various malls.',
  },
  {
    q: 'Is Chanel cheaper in Bahrain?',
    a: 'Bahrain has no VAT, which can make luxury items more affordable compared to countries with high sales tax. Prices are generally comparable to Dubai but may be lower than Europe.',
  },
  {
    q: 'Does Chanel Bahrain have the full collection?',
    a: 'The Moda Mall boutique offers a comprehensive collection including ready-to-wear, handbags, accessories, beauty, fine jewelry, and watches. Some limited pieces may require special ordering.',
  },
];

export default function ChanelBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Brands', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Chanel', url: 'https://www.bahrainnights.com/guides/brands/chanel' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/50 to-black/50" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-white/10 text-white rounded-full text-sm font-medium mb-4">
              🏛️ Luxury Fashion
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-white">CHANEL</span>
              {' '}
              <span className="text-gray-400">in Bahrain</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Founded in 1910 by Coco Chanel, the French luxury fashion house is 
              synonymous with timeless elegance. Find Chanel boutiques and beauty 
              counters in Bahrain&apos;s premier shopping destinations.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Boutiques', value: '2', icon: ShoppingBag },
              { label: 'Beauty Counters', value: '2+', icon: Sparkles },
              { label: 'Locations', value: 'Moda Mall, Marassi', icon: MapPin },
              { label: 'VAT', value: '0%', icon: Star },
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
          <h2 className="text-3xl font-bold mb-4">Chanel Boutiques in Bahrain</h2>
          <p className="text-gray-400 mb-8">Two Chanel boutiques serving the Kingdom of Bahrain.</p>
          
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
                          <span key={feature} className="px-2 py-1 bg-neutral-800 text-gray-300 text-xs rounded">
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
          <h2 className="text-3xl font-bold mb-4">Chanel Beauty Counters</h2>
          <p className="text-gray-400 mb-8">Find Chanel fragrances and cosmetics at these locations.</p>
          
          <div className="grid md:grid-cols-2 gap-6">
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
          <h2 className="text-3xl font-bold mb-8">Tips for Shopping Chanel in Bahrain</h2>
          
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
          <h2 className="text-2xl font-bold mb-8">Related Luxury Brands in Bahrain</h2>
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
      <section className="py-16 px-4 bg-gradient-to-r from-neutral-800/30 to-neutral-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More Shopping in Bahrain</h2>
          <p className="text-gray-300 mb-8">
            Discover other luxury brands and shopping destinations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/brands/louis-vuitton"
              className="px-8 py-3 bg-white hover:bg-gray-200 text-black font-bold rounded-lg transition-colors"
            >
              Louis Vuitton Guide
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
            headline: 'Chanel Bahrain - Store Locations & Shopping Guide 2026',
            description: 'Find Chanel stores in Bahrain. Complete guide to Chanel locations at Moda Mall and luxury boutiques.',
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
              '@id': 'https://bahrainnights.com/guides/brands/chanel',
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
            name: 'Chanel - Moda Mall Bahrain',
            image: 'https://www.bahrainnights.com/images/brands/chanel.jpg',
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
              name: 'Chanel',
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
