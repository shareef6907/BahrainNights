import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Clock, Phone, ExternalLink, Car, 
  ShoppingBag, Utensils, Gem, Sparkles,
  Star, Building2, Crown
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Moda Mall Bahrain - Luxury Store Directory & Shopping Guide 2026',
  description: 'Complete guide to Moda Mall at Bahrain World Trade Center. Luxury brands including Chanel, Dior, Burberry. Store directory, hours & shopping tips.',
  keywords: 'Moda Mall Bahrain, BWTC mall, luxury shopping Bahrain, Chanel Bahrain, designer brands Manama, high-end shopping Bahrain',
  openGraph: {
    title: 'Moda Mall Bahrain - Luxury Store Directory & Shopping Guide 2026',
    description: 'Complete guide to Moda Mall - Bahrain\'s exclusive luxury shopping destination at the World Trade Center.',
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
  tagline: 'Bahrain\'s Exclusive Luxury Shopping Destination',
  address: 'Bahrain World Trade Center, King Faisal Highway, Manama, Bahrain',
  phone: '+973 17 531 166',
  website: 'https://www.modamall.com.bh',
  mapsLink: 'https://www.google.com/maps/dir/?api=1&destination=Moda+Mall+Bahrain',
  hours: {
    regular: 'Sat-Thu: 10:00 AM - 10:00 PM',
    friday: 'Fri: 2:00 PM - 10:00 PM',
  },
  parking: {
    spaces: '2,000+',
    cost: 'Paid (BWTC parking)',
    valet: 'Available',
  },
  size: '45,000 sqm',
  stores: '120+',
  yearOpened: '2006',
};

const storeCategories = [
  {
    name: 'Haute Couture & Luxury Fashion',
    icon: Crown,
    stores: [
      { name: 'Chanel', link: '/guides/brands/chanel' },
      { name: 'Dior', link: '/guides/brands/dior' },
      { name: 'Louis Vuitton', link: '/guides/brands/louis-vuitton' },
      { name: 'Burberry', link: null },
      { name: 'Fendi', link: null },
      { name: 'Valentino', link: null },
      { name: 'Givenchy', link: null },
      { name: 'Salvatore Ferragamo', link: null },
    ],
  },
  {
    name: 'Fine Jewelry & Watches',
    icon: Gem,
    stores: [
      { name: 'Bvlgari', link: null },
      { name: 'Chopard', link: null },
      { name: 'Rolex', link: null },
      { name: 'Cartier', link: null },
      { name: 'Tiffany & Co.', link: null },
      { name: 'Van Cleef & Arpels', link: null },
      { name: 'Omega', link: null },
      { name: 'IWC', link: null },
    ],
  },
  {
    name: 'Designer Accessories',
    icon: ShoppingBag,
    stores: [
      { name: 'Hermès', link: '/guides/brands/hermes' },
      { name: 'Gucci', link: '/guides/brands/gucci' },
      { name: 'Prada', link: null },
      { name: 'Bottega Veneta', link: null },
      { name: 'Loewe', link: null },
      { name: 'Celine', link: null },
    ],
  },
  {
    name: 'Premium Beauty',
    icon: Sparkles,
    stores: [
      { name: 'Chanel Beauty', link: '/guides/brands/chanel' },
      { name: 'Dior Beauty', link: '/guides/brands/dior' },
      { name: 'La Mer', link: null },
      { name: 'La Prairie', link: null },
      { name: 'Tom Ford Beauty', link: null },
    ],
  },
];

const diningOptions = [
  {
    category: 'Fine Dining',
    restaurants: ['La Vinoteca', 'Masso', 'Re Napoli'],
  },
  {
    category: 'Premium Cafes',
    restaurants: ['Café Milano', 'Le Café', 'TWG Tea'],
  },
  {
    category: 'Hotel Connected',
    restaurants: ['Sheraton Hotel restaurants & bars nearby'],
  },
];

const tips = [
  {
    title: 'Dress Code',
    tip: 'Smart casual recommended. This is Bahrain\'s most upscale mall.',
  },
  {
    title: 'Personal Shopping',
    tip: 'Most luxury boutiques offer personal shopping appointments for VIP service.',
  },
  {
    title: 'Best Time',
    tip: 'Weekday mornings for personalized attention. Less crowded than mega malls.',
  },
  {
    title: 'Parking',
    tip: 'Use BWTC parking (paid). Valet is recommended for convenience.',
  },
  {
    title: 'Business Travelers',
    tip: 'Connected to Sheraton Hotel, perfect for business visitors.',
  },
];

const faqs = [
  {
    q: 'What luxury brands are in Moda Mall Bahrain?',
    a: 'Moda Mall features top luxury brands including Chanel, Dior, Louis Vuitton, Hermès, Gucci, Burberry, Fendi, and prestigious watch brands like Rolex, Cartier, and Chopard.',
  },
  {
    q: 'Where is Moda Mall located?',
    a: 'Moda Mall is located inside the iconic Bahrain World Trade Center (BWTC) on King Faisal Highway in Manama, connected to the Sheraton Hotel.',
  },
  {
    q: 'Is parking free at Moda Mall?',
    a: 'Parking at Moda Mall uses the BWTC parking facilities which are paid. Valet parking is available for convenience.',
  },
  {
    q: 'What are Moda Mall opening hours?',
    a: 'Moda Mall is open Saturday-Thursday 10 AM - 10 PM, and Friday 2 PM - 10 PM. Individual luxury boutiques may have slightly different hours.',
  },
];

export default function ModaMallPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-amber-950/10 to-slate-950 text-white">
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
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-yellow-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-4">
              👑 Luxury Mall
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                Moda Mall
              </span>
              {' '}Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {mallInfo.tagline}. Located in the iconic Bahrain World Trade Center, 
              home to the world&apos;s finest luxury fashion, jewelry, and watch brands.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Luxury Stores', value: mallInfo.stores, icon: Crown },
              { label: 'Location', value: 'BWTC', icon: Building2 },
              { label: 'Parking', value: mallInfo.parking.spaces, icon: Car },
              { label: 'Since', value: mallInfo.yearOpened, icon: Star },
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

      {/* Location & Hours */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Location & Hours</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-400" />
                Address & Contact
              </h3>
              <div className="space-y-3 text-gray-300">
                <p>{mallInfo.address}</p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  {mallInfo.phone}
                </p>
                <div className="flex gap-3 pt-2">
                  <a 
                    href={mallInfo.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg transition-colors text-sm"
                  >
                    Get Directions
                  </a>
                  <a 
                    href={mallInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm flex items-center gap-1"
                  >
                    Website <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-400" />
                Opening Hours
              </h3>
              <div className="space-y-2 text-gray-300">
                <p><strong>Sat-Thu:</strong> 10:00 AM - 10:00 PM</p>
                <p><strong>Friday:</strong> 2:00 PM - 10:00 PM</p>
                <p className="text-sm text-gray-500 pt-2">
                  * Individual boutiques may have different hours
                </p>
              </div>
              
              <h4 className="font-bold mt-6 mb-2 flex items-center gap-2">
                <Car className="w-4 h-4 text-amber-400" />
                Parking
              </h4>
              <p className="text-gray-300">
                BWTC parking • {mallInfo.parking.cost} • Valet recommended
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Store Directory */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Luxury Brand Directory</h2>
          <p className="text-gray-400 mb-8">Discover world-class luxury brands</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {storeCategories.map((category) => (
              <div key={category.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-lg text-amber-400 mb-3 flex items-center gap-2">
                  <category.icon className="w-5 h-5" />
                  {category.name}
                </h3>
                <div className="grid grid-cols-2 gap-1">
                  {category.stores.map((store) => (
                    store.link ? (
                      <Link 
                        key={store.name}
                        href={store.link}
                        className="text-gray-300 hover:text-amber-400 transition-colors text-sm"
                      >
                        {store.name} →
                      </Link>
                    ) : (
                      <span key={store.name} className="text-gray-400 text-sm">
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
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
            <Utensils className="w-8 h-8 text-amber-400" />
            Dining
          </h2>
          
          <div className="grid md:grid-cols-3 gap-4">
            {diningOptions.map((option) => (
              <div key={option.category} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-amber-400 mb-2">{option.category}</h3>
                <p className="text-gray-400 text-sm">
                  {option.restaurants.join(' • ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 px-4">
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
              { name: 'The Avenues', href: '/guides/malls/the-avenues' },
              { name: 'City Centre Bahrain', href: '/guides/malls/city-centre-bahrain' },
              { name: 'Seef Mall', href: '/guides/malls/seef-mall' },
              { name: 'Bahrain Mall', href: '/guides/malls/bahrain-mall' },
            ].map((mall) => (
              <Link 
                key={mall.href}
                href={mall.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group text-center"
              >
                <span className="font-medium group-hover:text-amber-400 transition-colors">
                  {mall.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-500/20 to-yellow-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Discover Luxury Shopping</h2>
          <p className="text-gray-300 mb-8">
            Explore all luxury brand guides in Bahrain
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/brands/chanel"
              className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg transition-colors"
            >
              Chanel Guide
            </Link>
            <Link 
              href="/guides/malls"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              All Malls
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
            '@type': 'ShoppingCenter',
            name: 'Moda Mall Bahrain',
            description: 'Bahrain\'s exclusive luxury shopping destination at the World Trade Center featuring Chanel, Dior, Louis Vuitton, and prestigious watch brands.',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Bahrain World Trade Center, King Faisal Highway',
              addressLocality: 'Manama',
              addressCountry: 'BH',
            },
            telephone: mallInfo.phone,
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
                opens: '14:00',
                closes: '22:00',
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
