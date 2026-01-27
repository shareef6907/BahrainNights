import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Clock, ExternalLink, Car, 
  ShoppingBag, Utensils, Waves, Sparkles,
  Star, Building2, Compass
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Souq Al Baraha Bahrain - Waterfront Shopping & Dining Guide 2026',
  description: 'Complete guide to Souq Al Baraha in Diyar Al Muharraq. Traditional waterfront souq with restaurants, cafes, boutiques & stunning views. Opening hours, directions & tips.',
  keywords: 'Souq Al Baraha, Diyar Al Muharraq shopping, waterfront souq Bahrain, traditional market Bahrain, Souq Al Baraha restaurants, Bahrain souq',
  openGraph: {
    title: 'Souq Al Baraha Bahrain - Waterfront Shopping & Dining Guide 2026',
    description: 'Complete guide to Souq Al Baraha - Bahrain\'s beautiful waterfront souq in Diyar Al Muharraq.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/malls/souq-al-baraha',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/malls/souq-al-baraha',
  },
};

const souqInfo = {
  name: 'Souq Al Baraha',
  tagline: 'Traditional Waterfront Souq in Diyar Al Muharraq',
  address: 'Diyar Al Muharraq, Muharraq Governorate, Kingdom of Bahrain',
  website: 'https://www.diyar.bh',
  mapsLink: 'https://www.google.com/maps/dir/?api=1&destination=Souq+Al+Baraha+Diyar+Al+Muharraq+Bahrain',
  hours: {
    regular: 'Daily: 10:00 AM - 10:00 PM',
    weekend: 'Thu-Fri: 10:00 AM - 12:00 AM',
  },
  parking: {
    spaces: '500+',
    cost: 'Free',
    street: 'Street parking available',
  },
  size: 'Open-air waterfront',
  stores: '50+',
  yearOpened: '2019',
};

const storeCategories = [
  {
    name: 'Fashion & Boutiques',
    icon: ShoppingBag,
    stores: [
      { name: 'Local fashion boutiques', link: null },
      { name: 'Traditional clothing', link: null },
      { name: 'Accessories & jewelry', link: null },
      { name: 'Abayas & modest fashion', link: null },
    ],
  },
  {
    name: 'Beauty & Wellness',
    icon: Sparkles,
    stores: [
      { name: 'Perfume shops', link: null },
      { name: 'Beauty salons', link: null },
      { name: 'Traditional oud & incense', link: null },
      { name: 'Spa services', link: null },
    ],
  },
  {
    name: 'Gifts & Souvenirs',
    icon: ShoppingBag,
    stores: [
      { name: 'Bahraini handicrafts', link: null },
      { name: 'Arabic souvenirs', link: null },
      { name: 'Home decor', link: null },
      { name: 'Art galleries', link: null },
    ],
  },
  {
    name: 'Services',
    icon: Building2,
    stores: [
      { name: 'Banks & ATMs', link: null },
      { name: 'Pharmacy', link: null },
      { name: 'Exchange services', link: null },
    ],
  },
];

const diningOptions = [
  {
    category: 'Restaurants',
    restaurants: ['Maraq Al Baraha (Traditional Bahraini)', 'Freej Bin Rashdan', 'Al Kwar', 'Haji Patata', 'Mama Adhari', 'AlBaraha Cafe'],
  },
  {
    category: 'Burgers & Quick Bites',
    restaurants: ['Jan Burger'],
  },
  {
    category: 'Cafes & Coffee',
    restaurants: ['Starbucks', 'Sophia (Bookstore & Coffee)', 'Black Drop', 'Shamshareef', 'KUMA Cafe'],
  },
  {
    category: 'Tea Houses',
    restaurants: ['RaelChai (راعي الچاي)'],
  },
];

const highlights = [
  {
    name: 'Traditional Architecture',
    description: 'Designed to recreate a traditional Bahraini market streetscape with spacious courtyards, arched walkways, high ceilings, and wooden shop doors.',
    icon: Building2,
  },
  {
    name: 'Open-Air & Air-Conditioned Areas',
    description: 'A blend of open-air walkways and air-conditioned sections, giving the feel of wandering through a traditional souq with modern comfort.',
    icon: Waves,
  },
  {
    name: 'Restaurants & Cafes',
    description: 'Multiple restaurants and cafes offering diverse cuisines, from traditional Bahraini food to international options.',
    icon: Utensils,
  },
  {
    name: 'Local Artisans & Crafts',
    description: 'A hub for Bahraini crafts with shops selling perfumes, handicrafts, arts, antiques, spices, and traditional products.',
    icon: Compass,
  },
];

const tips = [
  {
    title: 'Best Time to Visit',
    tip: 'Visit during sunset for the most beautiful waterfront views and cooler temperatures.',
  },
  {
    title: 'Evening Atmosphere',
    tip: 'The souq comes alive in the evening with families dining and walking along the promenade.',
  },
  {
    title: 'Scenic Views',
    tip: 'Beautiful traditional architecture makes for great phone photos. Note: professional photography may require permission.',
  },
  {
    title: 'Combine with Diyar',
    tip: 'Explore the wider Diyar Al Muharraq area including Dragon City Mall nearby.',
  },
  {
    title: 'Parking',
    tip: 'Free parking available. The area is less crowded than central Manama malls.',
  },
];

const faqs = [
  {
    q: 'What is Souq Al Baraha?',
    a: 'Souq Al Baraha is a traditional-style waterfront marketplace in Diyar Al Muharraq, featuring restaurants, cafes, boutiques, and a scenic promenade with stunning water views.',
  },
  {
    q: 'Where is Souq Al Baraha located?',
    a: 'Souq Al Baraha is located in Diyar Al Muharraq, a modern island development northeast of Manama. It\'s accessible via the causeway from Muharraq Island.',
  },
  {
    q: 'What can I do at Souq Al Baraha?',
    a: 'You can enjoy waterfront dining at various restaurants and cafes, shop at boutiques selling traditional goods and fashion, and take evening walks along the scenic promenade.',
  },
  {
    q: 'Is parking free at Souq Al Baraha?',
    a: 'Yes, parking is free at Souq Al Baraha with ample spaces available for visitors.',
  },
  {
    q: 'What are the opening hours of Souq Al Baraha?',
    a: 'Souq Al Baraha is generally open daily from 10 AM to 10 PM, with restaurants staying open until midnight on weekends. Individual shop hours may vary.',
  },
];

export default function SouqAlBarahaPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-orange-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Malls', url: 'https://www.bahrainnights.com/guides/malls' },
          { name: 'Souq Al Baraha', url: 'https://www.bahrainnights.com/guides/malls/souq-al-baraha' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm font-medium mb-4">
              🏛️ Traditional Souq
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                Souq Al Baraha
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {souqInfo.tagline}. A charming open-air marketplace featuring 
              traditional Bahraini architecture, waterfront dining, boutique shopping, 
              and stunning promenade views.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Shops & Cafes', value: souqInfo.stores, icon: ShoppingBag },
              { label: 'Location', value: 'Diyar', icon: MapPin },
              { label: 'Parking', value: 'Free', icon: Car },
              { label: 'Since', value: souqInfo.yearOpened, icon: Star },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-orange-400" />
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
                <MapPin className="w-5 h-5 text-orange-400" />
                Address
              </h3>
              <div className="space-y-3 text-gray-300">
                <p>{souqInfo.address}</p>
                <p className="text-sm text-gray-500">Part of Diyar Al Muharraq development</p>
                <div className="flex gap-3 pt-2">
                  <a 
                    href={souqInfo.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-400 text-black font-bold rounded-lg transition-colors text-sm"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-400" />
                Opening Hours
              </h3>
              <div className="space-y-2 text-gray-300">
                <p><strong>Sat-Wed:</strong> 10:00 AM - 10:00 PM</p>
                <p><strong>Thu-Fri:</strong> 10:00 AM - 12:00 AM</p>
                <p className="text-sm text-gray-500 pt-2">
                  * Restaurant hours may vary. Many stay open late.
                </p>
              </div>
              
              <h4 className="font-bold mt-6 mb-2 flex items-center gap-2">
                <Car className="w-4 h-4 text-orange-400" />
                Parking
              </h4>
              <p className="text-gray-300">
                {souqInfo.parking.spaces} spaces • {souqInfo.parking.cost}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">What Makes It Special</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {highlights.map((item) => (
              <div key={item.name} className="bg-white/5 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <item.icon className="w-5 h-5 text-orange-400" />
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
          <h2 className="text-3xl font-bold mb-4">Shopping & Services</h2>
          <p className="text-gray-400 mb-8">Discover boutique shops and local businesses</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {storeCategories.map((category) => (
              <div key={category.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-lg text-orange-400 mb-3 flex items-center gap-2">
                  <category.icon className="w-5 h-5" />
                  {category.name}
                </h3>
                <div className="space-y-1">
                  {category.stores.map((store) => (
                    store.link ? (
                      <Link 
                        key={store.name}
                        href={store.link}
                        className="block text-gray-300 hover:text-orange-400 transition-colors text-sm"
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
            <Utensils className="w-8 h-8 text-orange-400" />
            Food & Dining
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {diningOptions.map((option) => (
              <div key={option.category} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-orange-400 mb-2">{option.category}</h3>
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
          <h2 className="text-2xl font-bold mb-8">Explore More Shopping Destinations</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'City Centre Bahrain', href: '/guides/malls/city-centre-bahrain' },
              { name: 'Seef Mall', href: '/guides/malls/seef-mall' },
              { name: 'The Avenues', href: '/guides/malls/the-avenues' },
              { name: 'Moda Mall', href: '/guides/malls/moda-mall' },
            ].map((mall) => (
              <Link 
                key={mall.href}
                href={mall.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group text-center"
              >
                <span className="font-medium group-hover:text-orange-400 transition-colors">
                  {mall.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-500/20 to-amber-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Plan Your Visit</h2>
          <p className="text-gray-300 mb-8">
            Discover all shopping and souq destinations in Bahrain
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/malls"
              className="px-8 py-3 bg-orange-500 hover:bg-orange-400 text-black font-bold rounded-lg transition-colors"
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

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ShoppingCenter',
            name: 'Souq Al Baraha',
            description: 'Traditional waterfront souq in Diyar Al Muharraq featuring restaurants, cafes, boutiques and a scenic promenade.',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Diyar Al Muharraq',
              addressLocality: 'Muharraq',
              addressCountry: 'BH',
            },
            url: souqInfo.website,
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
            amenityFeature: [
              { '@type': 'LocationFeatureSpecification', name: 'Free Parking', value: true },
              { '@type': 'LocationFeatureSpecification', name: 'Waterfront', value: true },
              { '@type': 'LocationFeatureSpecification', name: 'Outdoor Dining', value: true },
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
