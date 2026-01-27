import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Clock, ExternalLink, Car, 
  ShoppingBag, Utensils, Users, Package,
  Lightbulb, Sofa, Wrench, Star, Building
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Dragon City Bahrain - Wholesale Shopping Guide 2026',
  description: 'Complete guide to Dragon City Bahrain, the Kingdom\'s largest wholesale and retail center for Chinese goods. 799+ shops, bargain prices on electronics, fashion, home goods & more.',
  keywords: 'Dragon City Bahrain, wholesale Bahrain, Chinese products Bahrain, bargain shopping Bahrain, Diyar Al Muharraq, bulk buying Bahrain, electronics wholesale',
  openGraph: {
    title: 'Dragon City Bahrain - Wholesale Shopping Guide 2026',
    description: 'Bahrain\'s largest wholesale center with 799+ shops selling Chinese products at bargain prices. Electronics, fashion, home goods & more.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/malls/dragon-city',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/malls/dragon-city',
  },
};

const mallInfo = {
  name: 'Dragon City Bahrain',
  tagline: 'Bahrain\'s Largest Wholesale & Retail Trading Center',
  address: 'Diyar Al Muharraq, Muharraq Governorate, Kingdom of Bahrain',
  website: 'https://www.dragoncity.bh',
  mapsLink: 'https://www.google.com/maps/dir/?api=1&destination=Dragon+City+Bahrain',
  hours: {
    regular: 'Sat-Thu: 10:00 AM - 10:00 PM',
    friday: 'Fri: 4:00 PM - 10:00 PM',
    ramadan: 'Special hours during Ramadan',
  },
  parking: {
    spaces: '3,000+',
    cost: 'Free',
    valet: 'Not available',
  },
  size: '70,000 sqm',
  stores: '799+',
  yearOpened: '2015',
};

const storeCategories = [
  {
    name: 'Electronics',
    icon: Lightbulb,
    stores: [
      { name: 'Mobile phones & accessories', link: null },
      { name: 'Computer parts & laptops', link: null },
      { name: 'Audio equipment', link: null },
      { name: 'Cameras & photography', link: null },
      { name: 'LED lights & electronics', link: null },
      { name: 'Gaming accessories', link: null },
    ],
  },
  {
    name: 'Fashion & Textiles',
    icon: ShoppingBag,
    stores: [
      { name: 'Wholesale clothing', link: null },
      { name: 'Fabrics & textiles', link: null },
      { name: 'Shoes & footwear', link: null },
      { name: 'Bags & accessories', link: null },
      { name: 'Watches & jewelry', link: null },
      { name: 'Sportswear', link: null },
    ],
  },
  {
    name: 'Home Furnishing',
    icon: Sofa,
    stores: [
      { name: 'Furniture', link: null },
      { name: 'Bedding & linens', link: null },
      { name: 'Curtains & drapes', link: null },
      { name: 'Carpets & rugs', link: null },
      { name: 'Home decor', link: null },
      { name: 'Kitchen items', link: null },
    ],
  },
  {
    name: 'Building Materials',
    icon: Building,
    stores: [
      { name: 'Sanitary ware', link: null },
      { name: 'Tiles & flooring', link: null },
      { name: 'Plumbing supplies', link: null },
      { name: 'Electrical fittings', link: null },
      { name: 'Construction materials', link: null },
    ],
  },
  {
    name: 'Machinery & Hardware',
    icon: Wrench,
    stores: [
      { name: 'Power tools', link: null },
      { name: 'Hand tools', link: null },
      { name: 'Industrial equipment', link: null },
      { name: 'Spare parts', link: null },
      { name: 'Safety equipment', link: null },
    ],
  },
  {
    name: 'Toys & Kids',
    icon: Package,
    stores: [
      { name: 'Wholesale toys', link: null },
      { name: 'Children\'s clothing', link: null },
      { name: 'School supplies', link: null },
      { name: 'Party supplies', link: null },
      { name: 'Gift items', link: null },
    ],
  },
];

const diningOptions = [
  {
    category: 'Chinese Cuisine',
    restaurants: ['Authentic Chinese restaurants', 'Dim sum', 'Noodle houses', 'Szechuan cuisine'],
  },
  {
    category: 'Food Court',
    restaurants: ['Asian cuisine', 'Quick bites', 'Local favorites', 'International options'],
  },
  {
    category: 'Cafes & Snacks',
    restaurants: ['Bubble tea', 'Chinese bakery', 'Snack stalls', 'Fresh juices'],
  },
];

const shoppingTips = [
  {
    name: 'Bargaining Culture',
    description: 'Unlike regular malls, bargaining is expected here. Start at 40-50% of the asking price and negotiate.',
    icon: ShoppingBag,
  },
  {
    name: 'Wholesale Pricing',
    description: 'Better prices when buying in bulk. Many vendors offer significant discounts for larger quantities.',
    icon: Package,
  },
  {
    name: 'Cash is King',
    description: 'Many vendors prefer cash payments. ATMs are available, but bring sufficient cash for the best deals.',
    icon: Star,
  },
  {
    name: 'Quality Check',
    description: 'Inspect items carefully before purchasing. Quality varies widely between vendors.',
    icon: Users,
  },
];

const tips = [
  {
    title: 'Best Time to Visit',
    tip: 'Weekday mornings are less crowded. Avoid Friday afternoons (opens 4 PM) and weekends.',
  },
  {
    title: 'What to Bring',
    tip: 'Bring a calculator, cash, and comfortable shoes. The mall is large and requires walking.',
  },
  {
    title: 'Negotiation Tip',
    tip: 'Always negotiate! Start at 50% of asking price. Walk away if needed - they\'ll often call you back.',
  },
  {
    title: 'Bulk Buying',
    tip: 'Perfect for businesses and events. Get wholesale prices when buying multiple items.',
  },
  {
    title: 'Return Policy',
    tip: 'Returns are difficult. Check items thoroughly before paying. Test electronics on the spot.',
  },
];

const faqs = [
  {
    q: 'What are Dragon City\'s opening hours?',
    a: 'Dragon City is open Saturday-Thursday 10 AM - 10 PM, and Friday 4 PM - 10 PM (opens later for Friday prayers). Hours may vary during Ramadan.',
  },
  {
    q: 'Is parking free at Dragon City?',
    a: 'Yes, Dragon City offers free parking with over 3,000 spaces available in large outdoor lots.',
  },
  {
    q: 'Can I bargain at Dragon City?',
    a: 'Yes! Bargaining is expected and encouraged at Dragon City. Most vendors expect negotiation, so start lower than the asking price.',
  },
  {
    q: 'What products does Dragon City sell?',
    a: 'Dragon City specializes in Chinese products including electronics, fashion, home furnishings, building materials, toys, and machinery. It\'s ideal for both retail and wholesale purchases.',
  },
  {
    q: 'Is Dragon City good for bulk buying?',
    a: 'Yes, Dragon City is perfect for bulk buying. Most vendors offer wholesale prices and significant discounts for larger quantities. Popular with businesses and event planners.',
  },
];

export default function DragonCityPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-pink-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Malls', url: 'https://www.bahrainnights.com/guides/malls' },
          { name: 'Dragon City', url: 'https://www.bahrainnights.com/guides/malls/dragon-city' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-yellow-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium mb-4">
              🏮 Wholesale Mall
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-red-400 to-yellow-500 bg-clip-text text-transparent">
                Dragon City
              </span>
              {' '}Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {mallInfo.tagline}. With 799+ commercial units, it&apos;s the largest 
              wholesale center in the Kingdom offering Chinese products at unbeatable prices.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Shops', value: mallInfo.stores, icon: ShoppingBag },
              { label: 'Size', value: mallInfo.size, icon: MapPin },
              { label: 'Parking', value: mallInfo.parking.spaces, icon: Car },
              { label: 'Since', value: mallInfo.yearOpened, icon: Star },
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

      {/* Location & Hours */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Location & Hours</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-400" />
                Address
              </h3>
              <div className="space-y-3 text-gray-300">
                <p>{mallInfo.address}</p>
                <p className="text-sm text-gray-400">Near Bahrain International Airport and Khalifa Bin Salman Port</p>
                <div className="flex gap-3 pt-2">
                  <a 
                    href={mallInfo.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-red-500 hover:bg-red-400 text-white font-bold rounded-lg transition-colors text-sm"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-red-400" />
                Opening Hours
              </h3>
              <div className="space-y-2 text-gray-300">
                <p><strong>Sat-Thu:</strong> 10:00 AM - 10:00 PM</p>
                <p><strong>Friday:</strong> 4:00 PM - 10:00 PM</p>
                <p className="text-sm text-gray-500 pt-2">
                  * Friday opens later due to prayer times. Ramadan hours may vary.
                </p>
              </div>
              
              <h4 className="font-bold mt-6 mb-2 flex items-center gap-2">
                <Car className="w-4 h-4 text-red-400" />
                Parking
              </h4>
              <p className="text-gray-300">
                {mallInfo.parking.spaces} spaces • {mallInfo.parking.cost} • Large outdoor lots
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Shopping Tips */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">How to Shop at Dragon City</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {shoppingTips.map((item) => (
              <div key={item.name} className="bg-white/5 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <item.icon className="w-5 h-5 text-red-400" />
                  {item.name}
                </h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Store Directory */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Shop Directory by Category</h2>
          <p className="text-gray-400 mb-8">Browse 799+ shops across all categories</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {storeCategories.map((category) => (
              <div key={category.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-lg text-red-400 mb-3 flex items-center gap-2">
                  <category.icon className="w-5 h-5" />
                  {category.name}
                </h3>
                <div className="space-y-1">
                  {category.stores.map((store) => (
                    store.link ? (
                      <Link 
                        key={store.name}
                        href={store.link}
                        className="block text-gray-300 hover:text-red-400 transition-colors text-sm"
                      >
                        {store.name} →
                      </Link>
                    ) : (
                      <span key={store.name} className="block text-gray-400 text-sm">
                        {store.name}
                      </span>
                    )
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Food & Dining */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
            <Utensils className="w-8 h-8 text-red-400" />
            Food & Dining
          </h2>
          
          <div className="grid md:grid-cols-3 gap-4">
            {diningOptions.map((option) => (
              <div key={option.category} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-red-400 mb-2">{option.category}</h3>
                <p className="text-gray-400 text-sm">
                  {option.restaurants.join(' • ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Tips for Visiting</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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

      {/* Related Links */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Explore More Malls</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Marassi Galleria', href: '/guides/malls/marassi-galleria' },
              { name: 'City Centre Bahrain', href: '/guides/malls/city-centre-bahrain' },
              { name: 'Seef Mall', href: '/guides/malls/seef-mall' },
              { name: 'Bahrain Mall', href: '/guides/malls/bahrain-mall' },
            ].map((mall) => (
              <Link 
                key={mall.href}
                href={mall.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group text-center"
              >
                <span className="font-medium group-hover:text-red-400 transition-colors">
                  {mall.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-500/20 to-yellow-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Plan Your Visit</h2>
          <p className="text-gray-300 mb-8">
            Discover all shopping destinations in Bahrain
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/malls"
              className="px-8 py-3 bg-red-500 hover:bg-red-400 text-white font-bold rounded-lg transition-colors"
            >
              All Malls in Bahrain
            </Link>
            <Link 
              href="/guides/souks"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              Traditional Souks
            </Link>
          </div>
        </div>
      </section>

      {/* Structured Data - ShoppingCenter Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ShoppingCenter',
            name: 'Dragon City Bahrain',
            description: 'Bahrain\'s largest wholesale and retail trading center with 799+ commercial units offering Chinese products at bargain prices.',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Diyar Al Muharraq',
              addressLocality: 'Muharraq',
              addressCountry: 'BH',
            },
            url: mallInfo.website,
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
                opens: '10:00',
                closes: '22:00',
              },
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Friday'],
                opens: '16:00',
                closes: '22:00',
              },
            ],
            amenityFeature: [
              { '@type': 'LocationFeatureSpecification', name: 'Free Parking', value: true },
              { '@type': 'LocationFeatureSpecification', name: 'Wholesale Pricing', value: true },
              { '@type': 'LocationFeatureSpecification', name: 'Chinese Products', value: true },
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
