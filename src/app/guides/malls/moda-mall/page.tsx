import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Clock, Car, 
  ShoppingBag, Utensils, Sparkles,
  Star, Gem, Building2
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

// Brand page links mapping
const brandLinks: Record<string, string> = {
  'Zara': '/guides/brands/zara',
  'H&M': '/guides/brands/hm',
  'Nike': '/guides/brands/nike',
  'Adidas': '/guides/brands/adidas',
  'Sephora': '/guides/brands/sephora',
  'Apple': '/guides/brands/apple',
  'Bath & Body Works': '/guides/brands/bath-body-works',
  'Starbucks': '/guides/brands/starbucks',
  'Costa': '/guides/brands/costa-coffee',
  'Costa Coffee': '/guides/brands/costa-coffee',
  'Shake Shack': '/guides/brands/shake-shack',
  'Five Guys': '/guides/brands/five-guys',
  'Crocs': '/guides/brands/crocs',
  'Uniqlo': '/guides/brands/uniqlo',
  'The Cheesecake Factory': '/guides/brands/cheesecake-factory',
  'Louis Vuitton': '/guides/brands/louis-vuitton',
  'Gucci': '/guides/brands/gucci',
  'Dior': '/guides/brands/dior',
  'Chanel': '/guides/brands/chanel',
  'Hermès': '/guides/brands/hermes',
};

export const metadata: Metadata = {
  title: 'Moda Mall Bahrain - Luxury Shopping at World Trade Center 2025',
  description: 'Complete guide to Moda Mall at Bahrain World Trade Center. Luxury brands, designer fashion, premium dining in the iconic twin towers of Manama.',
  keywords: 'Moda Mall, Bahrain World Trade Center, luxury shopping Bahrain, designer brands Bahrain, premium mall Manama',
  openGraph: {
    title: 'Moda Mall Bahrain - Luxury Shopping Guide 2025',
    description: 'Luxury shopping destination at Bahrain World Trade Center with designer brands and premium dining.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/malls/moda-mall',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/malls/moda-mall',
  },
};

const mallInfo = {
  name: 'Moda Mall',
  tagline: 'Luxury Shopping at Bahrain World Trade Center',
  address: 'Bahrain World Trade Center, Manama, Kingdom of Bahrain',
  mapsLink: 'https://www.google.com/maps/place/Moda+Mall/@26.2379,50.5841,17z',
  hours: {
    regular: 'Sat-Wed: 10:00 AM - 10:00 PM',
    weekend: 'Thu-Fri: 10:00 AM - 12:00 AM',
  },
  parking: {
    spaces: '1,500+',
    cost: 'Free',
    valet: 'Available',
  },
};

const storeCategories = [
  {
    name: 'Luxury & Designer',
    icon: Gem,
    stores: [
      'High-end fashion brands', 'Designer boutiques', 'Luxury accessories',
      'Premium watches', 'Fine jewellery'
    ],
    note: 'Focus on luxury and designer brands',
  },
  {
    name: 'Fashion',
    icon: ShoppingBag,
    stores: [
      'High-end fashion', 'Designer apparel', 'Premium footwear'
    ],
  },
  {
    name: 'Beauty & Cosmetics',
    icon: Sparkles,
    stores: [
      'Premium perfumes', 'Luxury cosmetics', 'Skincare boutiques'
    ],
  },
];

const diningOptions = [
  {
    category: 'Premium Dining',
    restaurants: [
      'High-end restaurants', 'Cafés with views', 'Fine dining options'
    ],
  },
];

const tips = [
  {
    title: 'Iconic Location',
    tip: 'Located in the famous Bahrain World Trade Center twin towers with wind turbines.',
  },
  {
    title: 'Luxury Focus',
    tip: 'Specializes in luxury and designer brands - perfect for high-end shopping.',
  },
  {
    title: 'Central Location',
    tip: 'In the heart of Manama\'s business district with easy access.',
  },
  {
    title: 'Premium Experience',
    tip: 'Offers a more intimate, upscale shopping experience than larger malls.',
  },
];

const faqs = [
  {
    q: 'Where is Moda Mall located?',
    a: 'Moda Mall is located in the iconic Bahrain World Trade Center twin towers in Manama.',
  },
  {
    q: 'What type of stores are in Moda Mall?',
    a: 'Moda Mall focuses on luxury and designer brands, high-end fashion, and premium dining.',
  },
  {
    q: 'What are Moda Mall opening hours?',
    a: 'Saturday-Wednesday: 10 AM - 10 PM. Thursday-Friday: 10 AM - 12 Midnight.',
  },
  {
    q: 'Is parking available at Moda Mall?',
    a: 'Yes, free parking is available with over 1,500 spaces. Valet parking is also offered.',
  },
];

export default function ModaMallPage() {
  const lastUpdated = '2025-01-27';
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-rose-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Malls', url: 'https://www.bahrainnights.com/guides/malls' },
          { name: 'Moda Mall', url: 'https://www.bahrainnights.com/guides/malls/moda-mall' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 to-pink-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-rose-500/20 text-rose-400 rounded-full text-sm font-medium mb-4">
              💎 Luxury Mall • World Trade Center
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">
                Moda Mall
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {mallInfo.tagline}. Experience luxury shopping in the iconic twin towers 
              with designer brands, high-end fashion, and premium dining.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
            {[
              { label: 'Focus', value: 'Luxury', icon: Gem },
              { label: 'Parking', value: mallInfo.parking.spaces, icon: Car },
              { label: 'Location', value: 'BWTC', icon: Building2 },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-rose-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Location & Hours</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-rose-400" />
                Address
              </h3>
              <div className="space-y-3 text-gray-300">
                <p>{mallInfo.address}</p>
                <p className="text-sm text-gray-400">Located in the iconic twin towers with wind turbines</p>
                <div className="flex gap-3 pt-2">
                  <a 
                    href={mallInfo.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-rose-500 hover:bg-rose-400 text-black font-bold rounded-lg transition-colors text-sm"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-rose-400" />
                Opening Hours
              </h3>
              <div className="space-y-4 text-gray-300">
                <p><strong>Sat-Wed:</strong> 10:00 AM - 10:00 PM</p>
                <p><strong>Thu-Fri:</strong> 10:00 AM - 12:00 AM</p>
              </div>
              
              <h4 className="font-bold mt-6 mb-2 flex items-center gap-2">
                <Car className="w-4 h-4 text-rose-400" />
                Parking
              </h4>
              <p className="text-gray-300">
                {mallInfo.parking.spaces} spaces • {mallInfo.parking.cost} • Valet available
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Store Categories */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Shopping</h2>
          <p className="text-gray-400 mb-8">Luxury and designer brands in an exclusive setting</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {storeCategories.map((category) => (
              <div key={category.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-lg text-rose-400 mb-3 flex items-center gap-2">
                  <category.icon className="w-5 h-5" />
                  {category.name}
                </h3>
                <div className="space-y-1">
                  {category.stores.map((store) => (
                    brandLinks[store] ? (
                      <Link key={store} href={brandLinks[store]} className="block text-rose-400 hover:text-rose-300 text-sm hover:underline">
                        {store}
                      </Link>
                    ) : (
                      <span key={store} className="block text-gray-400 text-sm">
                        {store}
                      </span>
                    )
                  ))}
                </div>
                {category.note && (
                  <p className="text-xs text-gray-500 mt-2 italic">{category.note}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dining */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
            <Utensils className="w-8 h-8 text-rose-400" />
            Dining
          </h2>
          
          <div className="max-w-md">
            {diningOptions.map((option) => (
              <div key={option.category} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-rose-400 mb-3">{option.category}</h3>
                <div className="space-y-1">
                  {option.restaurants.map((restaurant) => (
                    brandLinks[restaurant] ? (
                      <Link key={restaurant} href={brandLinks[restaurant]} className="block text-rose-400 hover:text-rose-300 text-sm hover:underline">
                        {restaurant}
                      </Link>
                    ) : (
                      <span key={restaurant} className="block text-gray-400 text-sm">
                        {restaurant}
                      </span>
                    )
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Tips for Visiting</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tips.map((item) => (
              <div key={item.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.tip}</p>
              </div>
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

      {/* Related Links */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Explore More Malls</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Marassi Galleria', href: '/guides/malls/marassi-galleria' },
              { name: 'City Centre Bahrain', href: '/guides/malls/city-centre-bahrain' },
              { name: 'The Avenues', href: '/guides/malls/the-avenues' },
              { name: 'Seef Mall', href: '/guides/malls/seef-mall' },
            ].map((mall) => (
              <Link 
                key={mall.href}
                href={mall.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group text-center"
              >
                <span className="font-medium group-hover:text-rose-400 transition-colors">
                  {mall.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-rose-500/20 to-pink-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Plan Your Visit</h2>
          <p className="text-gray-300 mb-8">
            Experience luxury shopping at Bahrain World Trade Center
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/malls"
              className="px-8 py-3 bg-rose-500 hover:bg-rose-400 text-black font-bold rounded-lg transition-colors"
            >
              All Malls in Bahrain
            </Link>
            <a 
              href={mallInfo.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              Get Directions
            </a>
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ShoppingCenter',
            name: 'Moda Mall',
            description: 'Luxury shopping destination at Bahrain World Trade Center with designer brands and premium dining.',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Bahrain World Trade Center',
              addressLocality: 'Manama',
              addressCountry: 'BH',
            },
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday'],
                opens: '10:00',
                closes: '22:00',
              },
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Thursday', 'Friday'],
                opens: '10:00',
                closes: '00:00',
              },
            ],
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
