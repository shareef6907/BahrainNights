import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Clock, ExternalLink, 
  Sparkles, UtensilsCrossed, Star, Info
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
  title: 'Shake Shack Bahrain - All Locations & Menu Guide 2026',
  description: 'Find Shake Shack locations in Bahrain. Complete guide to Shake Shack at City Centre, The Avenues & more. Famous ShackBurger, crinkle fries & shakes.',
  keywords: 'Shake Shack Bahrain, Shake Shack locations Bahrain, Shake Shack menu Bahrain, ShackBurger Bahrain, best burgers Bahrain',
  openGraph: {
    title: 'Shake Shack Bahrain - All Locations & Menu Guide 2026',
    description: 'Find Shake Shack locations in Bahrain. ShackBurger, crinkle fries & shakes.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/brands/shake-shack',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/brands/shake-shack',
  },
};

const storeLocations = [
  {
    name: 'Shake Shack - City Centre Bahrain',
    address: 'City Centre Bahrain, Food Court Area, Seef',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    features: ['Dine-in', 'Takeaway', 'Full menu'],
    mapsLink: 'https://www.google.com/maps/search/Shake+Shack+City+Centre+Bahrain',
    isPrimary: true,
  },
  {
    name: 'Shake Shack - The Avenues Bahrain',
    address: 'The Avenues Bahrain, Bahrain Bay',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    features: ['Dine-in', 'Takeaway', 'Full menu'],
    mapsLink: 'https://www.google.com/maps/search/Shake+Shack+Avenues+Bahrain',
    isPrimary: false,
  },
  {
    name: 'Shake Shack - Marassi Galleria',
    address: 'Marassi Galleria, Diyar Al Muharraq',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    features: ['Dine-in', 'Takeaway', 'Full menu', 'Beachfront mall'],
    mapsLink: 'https://www.google.com/maps/search/Shake+Shack+Marassi+Galleria+Bahrain',
    isPrimary: false,
  },
];

const popularItems = [
  { name: 'ShackBurger', description: 'The signature burger - Angus beef, lettuce, tomato, ShackSauce', price: '~BD 3.5' },
  { name: 'SmokeShack', description: 'ShackBurger with cherry peppers, bacon & ShackSauce', price: '~BD 4.2' },
  { name: 'Shroom Burger', description: 'Vegetarian - crispy fried portobello with cheese', price: '~BD 4.0' },
  { name: 'Chicken Shack', description: 'Crispy chicken breast with pickles', price: '~BD 3.8' },
  { name: 'Crinkle-Cut Fries', description: 'Classic crinkle-cut fries', price: '~BD 1.5' },
  { name: 'Cheese Fries', description: 'Crinkle fries with cheese sauce', price: '~BD 2.2' },
  { name: 'Shakes', description: 'Hand-spun vanilla, chocolate, strawberry, and more', price: '~BD 2.5' },
  { name: 'Concretes', description: 'Frozen custard blended with mix-ins', price: '~BD 2.8' },
];

const shoppingTips = [
  {
    title: 'Peak Hours',
    tip: 'Lunch (12-2pm) and dinner (7-9pm) are busiest. Visit early or late to avoid queues.',
  },
  {
    title: 'ShackBurger is King',
    tip: 'First-timers should try the classic ShackBurger. It\'s what made Shake Shack famous.',
  },
  {
    title: 'Don\'t Skip the Shakes',
    tip: 'The hand-spun shakes and frozen custard concretes are legendary. Order one to share.',
  },
  {
    title: 'Delivery Available',
    tip: 'Shake Shack delivers through Talabat and Carriage if you can\'t make it to the store.',
  },
];

const relatedBrands = [
  { name: 'Five Guys', href: '/guides/brands/five-guys', emoji: '🍟' },
  { name: 'Cheesecake Factory', href: '/guides/brands/cheesecake-factory', emoji: '🍰' },
  { name: 'Starbucks', href: '/guides/brands/starbucks', emoji: '☕' },
  { name: 'Costa Coffee', href: '/guides/brands/costa-coffee', emoji: '☕' },
];

const faqs = [
  {
    q: 'Where is Shake Shack in Bahrain?',
    a: 'Shake Shack has 3 locations in Bahrain - City Centre Bahrain, The Avenues Bahrain, and Marassi Galleria. All offer the full menu including burgers, fries, and shakes.',
  },
  {
    q: 'What is the most popular item at Shake Shack?',
    a: 'The ShackBurger is the signature item - an Angus beef burger with lettuce, tomato, and ShackSauce. The crinkle-cut fries and hand-spun shakes are also must-tries.',
  },
  {
    q: 'Is Shake Shack halal in Bahrain?',
    a: 'Yes, Shake Shack in Bahrain serves halal-certified beef and chicken, in accordance with local requirements.',
  },
  {
    q: 'Does Shake Shack Bahrain deliver?',
    a: 'Yes, Shake Shack delivery is available through food delivery apps like Talabat in Bahrain.',
  },
];

export default function ShakeShackBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-green-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Brands', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Shake Shack', url: 'https://www.bahrainnights.com/guides/brands/shake-shack' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-slate-900/50" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium mb-4">
              🍔 Burgers
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-green-500">SHAKE SHACK</span>
              {' '}
              <span className="text-gray-400">in Bahrain</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The New York-born burger sensation that started as a hot dog cart in Madison 
              Square Park. Now serving its famous ShackBurgers, crinkle-cut fries, and 
              hand-spun shakes at multiple locations in Bahrain.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Locations', value: '3', icon: MapPin },
              { label: 'Famous For', value: 'ShackBurger', icon: UtensilsCrossed },
              { label: 'Origin', value: 'NYC', icon: Star },
              { label: 'Style', value: 'Fast Casual', icon: Sparkles },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Shake Shack Locations in Bahrain</h2>
          <p className="text-gray-400 mb-8">Find your nearest Shake Shack.</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {storeLocations.map((store) => (
              <div 
                key={store.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-green-500/10"
              >
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xl font-bold text-green-400">{store.name}</h3>
                  {store.isPrimary && (
                    <span className="px-2 py-0.5 bg-green-500 text-black text-xs font-bold rounded">
                      MAIN STORE
                    </span>
                  )}
                </div>
                
                <div className="space-y-2 text-sm mb-4">
                  <p className="flex items-center gap-2 text-gray-300">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    {store.address}
                  </p>
                  <p className="flex items-center gap-2 text-gray-300">
                    <Clock className="w-4 h-4 text-gray-500" />
                    {store.hours}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {store.features.map((feature) => (
                    <span key={feature} className="px-2 py-1 bg-green-500/10 text-green-300 text-xs rounded">
                      {feature}
                    </span>
                  ))}
                </div>

                <a 
                  href={store.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-green-500 text-black font-bold rounded-lg hover:bg-green-400 transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  Get Directions
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Items */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Menu Highlights</h2>
          <p className="text-gray-400 mb-8">Must-try items at Shake Shack Bahrain.</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularItems.map((item) => (
              <div key={item.name} className="bg-white/5 rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-green-400">{item.name}</h3>
                  <span className="text-sm text-gray-400">{item.price}</span>
                </div>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-yellow-400 text-sm flex items-start gap-2">
              <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
              Prices are approximate and may vary. Check current menu in-store or on delivery apps.
            </p>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Tips for Visiting Shake Shack</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {shoppingTips.map((item) => (
              <div key={item.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-green-400 mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Brands */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Food & Drink in Bahrain</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedBrands.map((brand) => (
              <Link 
                key={brand.href}
                href={brand.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group text-center"
              >
                <span className="text-2xl mb-2 block">{brand.emoji}</span>
                <span className="font-medium group-hover:text-green-400 transition-colors">
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
      <section className="py-16 px-4 bg-gradient-to-r from-green-500/10 to-slate-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Hungry for More?</h2>
          <p className="text-gray-300 mb-8">
            Discover other burger joints in Bahrain.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/brands/five-guys"
              className="px-8 py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded-lg transition-colors"
            >
              Five Guys Guide
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
            headline: 'Shake Shack Bahrain - All Locations & Menu Guide 2026',
            description: 'Find Shake Shack locations in Bahrain. ShackBurger, crinkle fries & shakes.',
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
