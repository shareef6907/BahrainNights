import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Clock, Car, 
  ShoppingBag, Utensils, Gamepad2,
  Star
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
};

export const metadata: Metadata = {
  title: 'Bahrain Mall - Complete Guide with LuLu Hypermarket 2025',
  description: 'Complete guide to Bahrain Mall in Seef District. Home to LuLu Hypermarket, 1,400 seat food court, amusement arcade with rides and games.',
  keywords: 'Bahrain Mall, LuLu Hypermarket Bahrain, Seef District mall, family mall Bahrain, food court Bahrain',
  openGraph: {
    title: 'Bahrain Mall - Shopping & Entertainment Guide 2025',
    description: 'Family-friendly mall with LuLu Hypermarket, large food court & amusement arcade.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/malls/bahrain-mall',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/malls/bahrain-mall',
  },
};

const mallInfo = {
  name: 'Bahrain Mall',
  tagline: 'Family Shopping & Entertainment',
  address: 'Sanabis, Manama, Kingdom of Bahrain',
  mapsLink: 'https://www.google.com/maps/place/Bahrain+Mall/@26.2298,50.5352,17z',
  hours: {
    regular: 'Sat-Wed: 9:00 AM - 10:00 PM',
    weekend: 'Thu-Fri: 9:00 AM - 12:00 AM',
  },
  parking: {
    spaces: '2,000+',
    cost: 'Free',
  },
};

const keyFeatures = [
  {
    name: 'LuLu Hypermarket',
    description: 'Large hypermarket anchor store offering groceries, electronics, household items, and more at competitive prices.',
    icon: ShoppingBag,
  },
  {
    name: 'Food Court',
    description: 'One of Bahrain\'s largest food courts with 1,400 seats and diverse dining options.',
    icon: Utensils,
  },
  {
    name: 'Amusement Arcade',
    description: 'Family entertainment with rides, video games, and activities for children and adults.',
    icon: Gamepad2,
  },
];

const storeCategories = [
  {
    name: 'Anchor Store',
    icon: ShoppingBag,
    stores: ['LuLu Hypermarket'],
  },
  {
    name: 'Retail',
    icon: ShoppingBag,
    stores: ['Various retail outlets', 'Fashion stores', 'Electronics', 'Home goods'],
  },
];

const tips = [
  {
    title: 'LuLu Hypermarket',
    tip: 'Great for groceries and household items at competitive prices - opens earlier than mall stores.',
  },
  {
    title: 'Food Court',
    tip: 'With 1,400 seats, you\'ll always find space even during busy times.',
  },
  {
    title: 'Family Friendly',
    tip: 'The amusement arcade makes it a great destination for families with children.',
  },
  {
    title: 'Near Seef Mall',
    tip: 'Located close to Seef Mall - you can visit both in one trip.',
  },
];

const faqs = [
  {
    q: 'Where is Bahrain Mall located?',
    a: 'Bahrain Mall is located in Seef District, Manama, near Seef Mall.',
  },
  {
    q: 'What is the main store in Bahrain Mall?',
    a: 'LuLu Hypermarket is the main anchor store, offering groceries, electronics, and household items.',
  },
  {
    q: 'Is there entertainment at Bahrain Mall?',
    a: 'Yes, there\'s an amusement arcade with rides and video games for families.',
  },
  {
    q: 'How big is the food court?',
    a: 'Bahrain Mall has one of Bahrain\'s largest food courts with 1,400 seats.',
  },
];

export default function BahrainMallPage() {
  const lastUpdated = '2025-01-27';
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-green-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Malls', url: 'https://www.bahrainnights.com/guides/malls' },
          { name: 'Bahrain Mall', url: 'https://www.bahrainnights.com/guides/malls/bahrain-mall' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium mb-4">
              🛒 Family Mall • Seef District
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                Bahrain Mall
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {mallInfo.tagline}. Home to LuLu Hypermarket, one of Bahrain&apos;s largest 
              food courts with 1,400 seats, and a family amusement arcade.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
            {[
              { label: 'Anchor', value: 'LuLu', icon: ShoppingBag },
              { label: 'Food Court', value: '1,400 seats', icon: Utensils },
              { label: 'Parking', value: mallInfo.parking.spaces, icon: Car },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-green-400" />
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
                <MapPin className="w-5 h-5 text-green-400" />
                Address
              </h3>
              <div className="space-y-3 text-gray-300">
                <p>{mallInfo.address}</p>
                <div className="flex gap-3 pt-2">
                  <a 
                    href={mallInfo.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-green-500 hover:bg-green-400 text-black font-bold rounded-lg transition-colors text-sm"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-400" />
                Opening Hours
              </h3>
              <div className="space-y-4 text-gray-300">
                <p><strong>Sat-Wed:</strong> 9:00 AM - 10:00 PM</p>
                <p><strong>Thu-Fri:</strong> 9:00 AM - 12:00 AM</p>
                <p className="text-sm text-gray-500">* LuLu Hypermarket may have extended hours</p>
              </div>
              
              <h4 className="font-bold mt-6 mb-2 flex items-center gap-2">
                <Car className="w-4 h-4 text-green-400" />
                Parking
              </h4>
              <p className="text-gray-300">
                {mallInfo.parking.spaces} spaces • {mallInfo.parking.cost}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Key Features</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {keyFeatures.map((feature) => (
              <div key={feature.name} className="bg-white/5 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <feature.icon className="w-5 h-5 text-green-400" />
                  {feature.name}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stores */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Stores</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {storeCategories.map((category) => (
              <div key={category.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-lg text-green-400 mb-3 flex items-center gap-2">
                  <category.icon className="w-5 h-5" />
                  {category.name}
                </h3>
                <div className="space-y-1">
                  {category.stores.map((store) => (
                    brandLinks[store] ? (
                      <Link key={store} href={brandLinks[store]} className="block text-green-400 hover:text-green-300 text-sm hover:underline">
                        {store}
                      </Link>
                    ) : (
                      <span key={store} className="block text-gray-400 text-sm">
                        {store}
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
              { name: 'Seef Mall', href: '/guides/malls/seef-mall' },
              { name: 'City Centre Bahrain', href: '/guides/malls/city-centre-bahrain' },
              { name: 'The Avenues', href: '/guides/malls/the-avenues' },
              { name: 'Marassi Galleria', href: '/guides/malls/marassi-galleria' },
            ].map((mall) => (
              <Link 
                key={mall.href}
                href={mall.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group text-center"
              >
                <span className="font-medium group-hover:text-green-400 transition-colors">
                  {mall.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Plan Your Visit</h2>
          <p className="text-gray-300 mb-8">
            Family-friendly shopping and entertainment in Seef District
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/malls"
              className="px-8 py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded-lg transition-colors"
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
            name: 'Bahrain Mall',
            description: 'Family-friendly mall with LuLu Hypermarket, large food court & amusement arcade.',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Seef District',
              addressLocality: 'Manama',
              addressCountry: 'BH',
            },
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday'],
                opens: '09:00',
                closes: '22:00',
              },
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Thursday', 'Friday'],
                opens: '09:00',
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
