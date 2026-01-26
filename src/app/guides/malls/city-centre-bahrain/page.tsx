import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Clock, Phone, ExternalLink, Car, 
  ShoppingBag, Utensils, Film, Users, Sparkles,
  Waves, Gamepad2, Star, Info
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'City Centre Bahrain - Store Directory & Shopping Guide 2026',
  description: 'Complete guide to City Centre Bahrain, the largest mall in Bahrain. 340+ stores, Wahooo! Waterpark, VOX Cinemas. Store directory, hours, parking & tips.',
  keywords: 'City Centre Bahrain, City Centre mall, shopping mall Bahrain, Seef mall, Wahooo waterpark, Magic Planet Bahrain, best mall Bahrain',
  openGraph: {
    title: 'City Centre Bahrain - Store Directory & Shopping Guide 2026',
    description: 'Complete guide to City Centre Bahrain with 340+ stores, entertainment & dining. The largest mall in Bahrain.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/malls/city-centre-bahrain',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/malls/city-centre-bahrain',
  },
};

const mallInfo = {
  name: 'City Centre Bahrain',
  tagline: 'Bahrain\'s Largest Shopping & Entertainment Destination',
  address: 'Road 2835, Block 428, Seef District, Manama, Bahrain',
  phone: '+973 17 177 177',
  website: 'https://www.citycentrebahrain.com',
  mapsLink: 'https://www.google.com/maps/dir/?api=1&destination=City+Centre+Bahrain',
  hours: {
    regular: 'Sat-Wed: 10:00 AM - 10:00 PM',
    weekend: 'Thu-Fri: 10:00 AM - 12:00 AM',
    ramadan: 'Special hours during Ramadan',
  },
  parking: {
    spaces: '7,000+',
    cost: 'Free',
    valet: 'Available (paid)',
  },
  size: '185,000 sqm',
  stores: '340+',
  yearOpened: '2008',
};

const storeCategories = [
  {
    name: 'Luxury Fashion',
    icon: Sparkles,
    stores: [
      { name: 'Louis Vuitton', link: '/guides/brands/louis-vuitton' },
      { name: 'Gucci', link: '/guides/brands/gucci' },
      { name: 'Dior', link: '/guides/brands/dior' },
      { name: 'Burberry', link: null },
      { name: 'Michael Kors', link: null },
      { name: 'Coach', link: null },
    ],
  },
  {
    name: 'Fashion & Apparel',
    icon: ShoppingBag,
    stores: [
      { name: 'Zara', link: '/guides/brands/zara' },
      { name: 'H&M', link: '/guides/brands/hm' },
      { name: 'Marks & Spencer', link: null },
      { name: 'Uniqlo', link: '/guides/brands/uniqlo' },
      { name: 'Massimo Dutti', link: null },
      { name: 'Mango', link: null },
      { name: 'Pull & Bear', link: null },
      { name: 'Bershka', link: null },
      { name: 'Forever 21', link: null },
      { name: 'American Eagle', link: null },
    ],
  },
  {
    name: 'Sports & Activewear',
    icon: Users,
    stores: [
      { name: 'Nike', link: '/guides/brands/nike' },
      { name: 'Adidas', link: '/guides/brands/adidas' },
      { name: 'Foot Locker', link: null },
      { name: 'JD Sports', link: null },
      { name: 'Under Armour', link: null },
      { name: 'Skechers', link: null },
    ],
  },
  {
    name: 'Electronics & Tech',
    icon: Gamepad2,
    stores: [
      { name: 'Apple (iStyle)', link: '/guides/brands/apple' },
      { name: 'Samsung', link: null },
      { name: 'Virgin Megastore', link: null },
      { name: 'Sharaf DG', link: null },
      { name: 'Lulu Techzone', link: null },
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
      { name: 'Lush', link: null },
    ],
  },
  {
    name: 'Home & Living',
    icon: ShoppingBag,
    stores: [
      { name: 'IKEA (connected)', link: '/guides/brands/ikea' },
      { name: 'Pottery Barn', link: null },
      { name: 'Crate & Barrel', link: null },
      { name: 'Home Centre', link: null },
      { name: 'Zara Home', link: null },
    ],
  },
];

const diningOptions = [
  {
    category: 'Fine Dining',
    restaurants: ['The Cheesecake Factory', 'P.F. Chang\'s', 'Nando\'s', 'TGI Friday\'s'],
  },
  {
    category: 'Casual Dining',
    restaurants: ['Five Guys', 'Shake Shack', 'Johnny Rockets', 'Chili\'s'],
  },
  {
    category: 'Fast Food',
    restaurants: ['McDonald\'s', 'KFC', 'Burger King', 'Pizza Hut', 'Subway'],
  },
  {
    category: 'Coffee & Desserts',
    restaurants: ['Starbucks', 'Costa Coffee', 'Tim Hortons', 'Cinnabon', 'Krispy Kreme'],
  },
  {
    category: 'Food Court',
    restaurants: ['International cuisine options', 'Quick bites', 'Asian, Arabic, Western'],
  },
];

const entertainment = [
  {
    name: 'Wahooo! Waterpark',
    description: 'Indoor waterpark with slides, wave pool, lazy river, and kids area. Perfect for family fun.',
    icon: Waves,
  },
  {
    name: 'VOX Cinemas',
    description: '20+ screens including IMAX, 4DX, GOLD, and Kids experiences. Latest Hollywood and Bollywood releases.',
    icon: Film,
  },
  {
    name: 'Magic Planet',
    description: 'Largest family entertainment center with arcade games, rides, bowling, and attractions.',
    icon: Gamepad2,
  },
  {
    name: 'Carrefour Hypermarket',
    description: 'Full-service hypermarket for groceries, electronics, and household essentials.',
    icon: ShoppingBag,
  },
];

const tips = [
  {
    title: 'Best Time to Visit',
    tip: 'Weekday mornings (10-12 PM) are quietest. Avoid Thursday/Friday evenings when it\'s most crowded.',
  },
  {
    title: 'Parking Strategy',
    tip: 'Use the P2 or P3 parking near IKEA for easier access. Weekend parking can fill up by 6 PM.',
  },
  {
    title: 'Sale Seasons',
    tip: 'Shop Bahrain (Feb-Mar), Eid sales, and year-end promotions offer the best discounts.',
  },
  {
    title: 'Family Tip',
    tip: 'Rent strollers near entrances. Kids play areas are on Level 1 near the food court.',
  },
  {
    title: 'IKEA Connection',
    tip: 'IKEA is directly connected via walkway on Level 1. Great for combining shopping trips.',
  },
];

const faqs = [
  {
    q: 'What are City Centre Bahrain\'s opening hours?',
    a: 'City Centre Bahrain is open Saturday-Wednesday 10 AM - 10 PM, and Thursday-Friday 10 AM - 12 AM (midnight). Hours may vary during Ramadan and public holidays.',
  },
  {
    q: 'Is parking free at City Centre Bahrain?',
    a: 'Yes, City Centre Bahrain offers free parking with over 7,000 spaces. Valet parking is also available for a fee near the main entrances.',
  },
  {
    q: 'Does City Centre Bahrain have a waterpark?',
    a: 'Yes, Wahooo! Waterpark is located inside City Centre Bahrain. It\'s an indoor waterpark with slides, wave pool, lazy river, and dedicated kids areas.',
  },
  {
    q: 'What luxury brands are available at City Centre Bahrain?',
    a: 'City Centre Bahrain features luxury brands including Louis Vuitton, Gucci, Dior, Burberry, Michael Kors, and Coach, along with 340+ other stores.',
  },
  {
    q: 'Is IKEA connected to City Centre Bahrain?',
    a: 'Yes, IKEA Bahrain is directly connected to City Centre Bahrain via an enclosed walkway on Level 1, making it convenient to visit both in one trip.',
  },
];

export default function CityCentreBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-pink-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Malls', url: 'https://www.bahrainnights.com/guides/malls' },
          { name: 'City Centre Bahrain', url: 'https://www.bahrainnights.com/guides/malls/city-centre-bahrain' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-pink-500/20 text-pink-400 rounded-full text-sm font-medium mb-4">
              🏬 Mega Mall
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                City Centre
              </span>
              {' '}Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {mallInfo.tagline}. Home to 340+ stores, Wahooo! Waterpark, 
              VOX Cinemas, and endless entertainment options.
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
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  {mallInfo.phone}
                </p>
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
                  * Hours may vary during Ramadan and public holidays
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
          <p className="text-gray-400 mb-8">Browse 340+ stores across all categories</p>
          
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
              { name: 'Seef Mall', href: '/guides/malls/seef-mall' },
              { name: 'The Avenues', href: '/guides/malls/the-avenues' },
              { name: 'Moda Mall', href: '/guides/malls/moda-mall' },
              { name: 'Bahrain Mall', href: '/guides/malls/bahrain-mall' },
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
            name: 'City Centre Bahrain',
            description: 'Bahrain\'s largest shopping and entertainment destination with 340+ stores, Wahooo! Waterpark, VOX Cinemas, and Magic Planet.',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Road 2835, Block 428, Seef District',
              addressLocality: 'Manama',
              addressCountry: 'BH',
            },
            telephone: mallInfo.phone,
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
              { '@type': 'LocationFeatureSpecification', name: 'Waterpark', value: true },
              { '@type': 'LocationFeatureSpecification', name: 'Cinema', value: true },
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
