import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Clock, ExternalLink, Car, 
  ShoppingBag, Utensils, Film, Users, Sparkles,
  Waves, Fish, Star, Building2, Hotel
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Marassi Galleria Bahrain - Luxury Mall & Aquarium Guide 2026',
  description: 'Complete guide to Marassi Galleria, Bahrain\'s premier beachfront luxury mall. 400+ stores, largest aquarium in the Kingdom, VOX Cinemas, Address Hotel. Hours, stores & tips.',
  keywords: 'Marassi Galleria, Marassi Galleria Bahrain, Diyar Al Muharraq mall, luxury mall Bahrain, Marassi Aquarium, shopping Bahrain, beachfront mall',
  openGraph: {
    title: 'Marassi Galleria Bahrain - Luxury Mall & Aquarium Guide 2026',
    description: 'Bahrain\'s premier beachfront luxury destination with 400+ stores, the Kingdom\'s largest aquarium, and connected to 5-star hotels.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/malls/marassi-galleria',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/malls/marassi-galleria',
  },
};

const mallInfo = {
  name: 'Marassi Galleria',
  tagline: 'Bahrain\'s Premier Beachfront Luxury Destination',
  address: 'Diyar Al Muharraq, Muharraq, Kingdom of Bahrain',
  website: 'https://www.marassigalleria.com',
  mapsLink: 'https://www.google.com/maps/dir/?api=1&destination=Marassi+Galleria+Bahrain',
  hours: {
    regular: 'Sat-Wed: 10:00 AM - 10:00 PM',
    weekend: 'Thu-Fri: 10:00 AM - 12:00 AM',
    ramadan: 'Extended hours during Ramadan (until 2:00 AM last 10 days)',
  },
  parking: {
    spaces: '4,000+',
    cost: 'Free',
    valet: 'Available (paid)',
  },
  size: '200,000 sqm',
  stores: '400+',
  yearOpened: '2022',
};

const storeCategories = [
  {
    name: 'Luxury Fashion & Jewelry',
    icon: Sparkles,
    stores: [
      { name: 'Al Fardan Jewellery', link: null },
      { name: 'Aigner', link: null },
      { name: 'Ajmal Perfumes', link: null },
      { name: 'Chopard', link: null },
      { name: 'Michael Kors', link: null },
      { name: 'Tiffany & Co.', link: null },
    ],
  },
  {
    name: 'Fashion & Apparel',
    icon: ShoppingBag,
    stores: [
      { name: 'Zara', link: '/guides/brands/zara' },
      { name: 'H&M', link: '/guides/brands/hm' },
      { name: 'Massimo Dutti', link: null },
      { name: 'Mango', link: null },
      { name: 'Ted Baker', link: null },
      { name: 'COS', link: null },
      { name: 'ALDO', link: null },
      { name: 'Charles & Keith', link: null },
    ],
  },
  {
    name: 'Sports & Lifestyle',
    icon: Users,
    stores: [
      { name: 'Nike', link: '/guides/brands/nike' },
      { name: 'Adidas', link: '/guides/brands/adidas' },
      { name: 'Sun & Sand Sports', link: null },
      { name: 'Skechers', link: null },
      { name: 'Under Armour', link: null },
      { name: 'Lululemon', link: null },
    ],
  },
  {
    name: 'Beauty & Cosmetics',
    icon: Sparkles,
    stores: [
      { name: 'Sephora', link: '/guides/brands/sephora' },
      { name: 'MAC', link: null },
      { name: 'Bath & Body Works', link: '/guides/brands/bath-body-works' },
      { name: 'Paris Gallery', link: null },
      { name: 'The Body Shop', link: null },
      { name: 'Rituals', link: null },
    ],
  },
  {
    name: 'Home & Lifestyle',
    icon: Building2,
    stores: [
      { name: 'Pottery Barn', link: null },
      { name: 'Crate & Barrel', link: null },
      { name: 'West Elm', link: null },
      { name: 'Zara Home', link: null },
      { name: 'Home Centre', link: null },
    ],
  },
  {
    name: 'Electronics & Tech',
    icon: ShoppingBag,
    stores: [
      { name: 'Apple (iStyle)', link: '/guides/brands/apple' },
      { name: 'Samsung', link: null },
      { name: 'Virgin Megastore', link: null },
      { name: 'Sharaf DG', link: null },
    ],
  },
];

const diningOptions = [
  {
    category: 'Fine Dining',
    restaurants: ['The Maine Oyster Bar', 'Coya', 'La Petite Maison', 'Zuma'],
  },
  {
    category: 'Casual Dining',
    restaurants: ['The Cheesecake Factory', 'P.F. Chang\'s', 'Five Guys', 'Shake Shack'],
  },
  {
    category: 'Waterfront Restaurants',
    restaurants: ['Beachfront dining options', 'Seaside cafes', 'Al fresco terraces'],
  },
  {
    category: 'Coffee & Desserts',
    restaurants: ['Starbucks Reserve', 'Angelina Paris', '%Arabica', 'Godiva'],
  },
  {
    category: 'International Cuisine',
    restaurants: ['Japanese', 'Italian', 'Arabic', 'Mediterranean', 'Asian fusion'],
  },
];

const entertainment = [
  {
    name: 'Marassi Aquarium',
    description: 'The Kingdom\'s largest aquarium featuring diverse marine life, interactive exhibits, and educational programs for all ages.',
    icon: Fish,
  },
  {
    name: 'VOX Cinemas',
    description: 'State-of-the-art multiplex with IMAX, 4DX, GOLD Class, and kids experiences. Latest blockbusters and premium viewing.',
    icon: Film,
  },
  {
    name: 'Address Beach Resort',
    description: 'Connected to the luxury 5-star Address Beach Resort Bahrain, offering direct beach access and world-class hospitality.',
    icon: Hotel,
  },
  {
    name: 'Beachfront Promenade',
    description: 'Scenic waterfront walkway with stunning sea views, outdoor seating, and evening entertainment.',
    icon: Waves,
  },
];

const tips = [
  {
    title: 'Best Time to Visit',
    tip: 'Weekday afternoons are quietest. Evenings and weekends attract crowds, especially to the aquarium.',
  },
  {
    title: 'Aquarium Tip',
    tip: 'Book aquarium tickets online in advance, especially during weekends and school holidays.',
  },
  {
    title: 'Parking Strategy',
    tip: 'Use basement parking for easy elevator access to all levels. Valet available near main entrance.',
  },
  {
    title: 'Beachfront Access',
    tip: 'The promenade offers beautiful sunset views. Plan dinner at waterfront restaurants for the best experience.',
  },
  {
    title: 'Hotel Connection',
    tip: 'Direct walkway connects to Address Beach Resort - great for combining shopping with a staycation.',
  },
];

const faqs = [
  {
    q: 'What are Marassi Galleria\'s opening hours?',
    a: 'Marassi Galleria is open Saturday-Wednesday 10 AM - 10 PM, and Thursday-Friday 10 AM - 12 AM (midnight). During Ramadan, hours extend until 1-2 AM.',
  },
  {
    q: 'Is parking free at Marassi Galleria?',
    a: 'Yes, Marassi Galleria offers free covered parking with over 4,000 spaces. Valet parking is also available for a fee near the main entrances.',
  },
  {
    q: 'Does Marassi Galleria have an aquarium?',
    a: 'Yes, Marassi Galleria features the Marassi Aquarium, the largest aquarium in the Kingdom of Bahrain, with diverse marine life and interactive exhibits.',
  },
  {
    q: 'Is Marassi Galleria connected to a hotel?',
    a: 'Yes, Marassi Galleria is directly connected to Address Beach Resort Bahrain, a luxury 5-star hotel offering beach access and premium amenities.',
  },
  {
    q: 'Where is Marassi Galleria located?',
    a: 'Marassi Galleria is located in Diyar Al Muharraq, a waterfront development near Bahrain International Airport, approximately 20 minutes from Manama.',
  },
];

export default function MarassiGalleriaPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-pink-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Malls', url: 'https://www.bahrainnights.com/guides/malls' },
          { name: 'Marassi Galleria', url: 'https://www.bahrainnights.com/guides/malls/marassi-galleria' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-pink-500/20 text-pink-400 rounded-full text-sm font-medium mb-4">
              🏝️ Luxury Beachfront Mall
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                Marassi
              </span>
              {' '}Galleria
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {mallInfo.tagline}. Experience luxury shopping with 400+ stores, 
              Bahrain&apos;s largest aquarium, world-class dining, and stunning beachfront views.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Stores', value: mallInfo.stores, icon: ShoppingBag },
              { label: 'Size', value: mallInfo.size, icon: MapPin },
              { label: 'Parking', value: mallInfo.parking.spaces, icon: Car },
              { label: 'Since', value: mallInfo.yearOpened, icon: Star },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-pink-400" />
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
                <MapPin className="w-5 h-5 text-pink-400" />
                Address & Contact
              </h3>
              <div className="space-y-3 text-gray-300">
                <p>{mallInfo.address}</p>
                <div className="flex gap-3 pt-2">
                  <a 
                    href={mallInfo.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-pink-500 hover:bg-pink-400 text-black font-bold rounded-lg transition-colors text-sm"
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
                <Clock className="w-5 h-5 text-pink-400" />
                Opening Hours
              </h3>
              <div className="space-y-2 text-gray-300">
                <p><strong>Sat-Wed:</strong> 10:00 AM - 10:00 PM</p>
                <p><strong>Thu-Fri:</strong> 10:00 AM - 12:00 AM (midnight)</p>
                <p className="text-sm text-gray-500 pt-2">
                  * Extended hours during Ramadan and public holidays
                </p>
              </div>
              
              <h4 className="font-bold mt-6 mb-2 flex items-center gap-2">
                <Car className="w-4 h-4 text-pink-400" />
                Parking
              </h4>
              <p className="text-gray-300">
                {mallInfo.parking.spaces} spaces • {mallInfo.parking.cost} • Valet available
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Store Directory */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Store Directory by Category</h2>
          <p className="text-gray-400 mb-8">Browse 400+ stores across all categories</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {storeCategories.map((category) => (
              <div key={category.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-lg text-pink-400 mb-3 flex items-center gap-2">
                  <category.icon className="w-5 h-5" />
                  {category.name}
                </h3>
                <div className="space-y-1">
                  {category.stores.map((store) => (
                    store.link ? (
                      <Link 
                        key={store.name}
                        href={store.link}
                        className="block text-gray-300 hover:text-pink-400 transition-colors text-sm"
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

      {/* Entertainment */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Entertainment & Attractions</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {entertainment.map((item) => (
              <div key={item.name} className="bg-white/5 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <item.icon className="w-5 h-5 text-pink-400" />
                  {item.name}
                </h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Food & Dining */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
            <Utensils className="w-8 h-8 text-pink-400" />
            Food & Dining
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {diningOptions.map((option) => (
              <div key={option.category} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-pink-400 mb-2">{option.category}</h3>
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
              { name: 'City Centre Bahrain', href: '/guides/malls/city-centre-bahrain' },
              { name: 'The Avenues', href: '/guides/malls/the-avenues' },
              { name: 'Moda Mall', href: '/guides/malls/moda-mall' },
              { name: 'Dragon City', href: '/guides/malls/dragon-city' },
            ].map((mall) => (
              <Link 
                key={mall.href}
                href={mall.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group text-center"
              >
                <span className="font-medium group-hover:text-pink-400 transition-colors">
                  {mall.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Plan Your Visit</h2>
          <p className="text-gray-300 mb-8">
            Discover all shopping destinations in Bahrain
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/malls"
              className="px-8 py-3 bg-pink-500 hover:bg-pink-400 text-black font-bold rounded-lg transition-colors"
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
            name: 'Marassi Galleria',
            description: 'Bahrain\'s premier beachfront luxury destination with 400+ stores, the Kingdom\'s largest aquarium, VOX Cinemas, and connected to Address Beach Resort.',
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
              { '@type': 'LocationFeatureSpecification', name: 'Aquarium', value: true },
              { '@type': 'LocationFeatureSpecification', name: 'Cinema', value: true },
              { '@type': 'LocationFeatureSpecification', name: 'Beachfront', value: true },
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
