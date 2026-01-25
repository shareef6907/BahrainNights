import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Clock, Phone, ExternalLink, 
  Sparkles, UtensilsCrossed, Star, Info
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Five Guys Bahrain - All Locations & Menu Guide 2026',
  description: 'Find Five Guys locations in Bahrain. Complete guide to Five Guys burgers with free toppings, Cajun fries, and milkshakes. Locations, hours & tips.',
  keywords: 'Five Guys Bahrain, Five Guys locations Bahrain, Five Guys menu Bahrain, best burgers Bahrain, Cajun fries Bahrain',
  openGraph: {
    title: 'Five Guys Bahrain - All Locations & Menu Guide 2026',
    description: 'Find Five Guys locations in Bahrain. Burgers with free toppings, Cajun fries & milkshakes.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/brands/five-guys',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/brands/five-guys',
  },
};

const storeLocations = [
  {
    name: 'Five Guys - City Centre Bahrain',
    address: 'City Centre Bahrain, Food Court Area, Seef',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    features: ['Dine-in', 'Takeaway', 'Full menu', 'Free peanuts'],
    mapsLink: 'https://www.google.com/maps/search/Five+Guys+City+Centre+Bahrain',
    isPrimary: true,
  },
  {
    name: 'Five Guys - The Avenues Bahrain',
    address: 'The Avenues Bahrain, Bahrain Bay',
    hours: 'Sun-Wed: 10:00 AM - 10:00 PM, Thu-Sat: 10:00 AM - 12:00 AM',
    features: ['Dine-in', 'Takeaway', 'Full menu', 'Free peanuts'],
    mapsLink: 'https://www.google.com/maps/search/Five+Guys+Avenues+Bahrain',
    isPrimary: false,
  },
];

const freeToppings = [
  'Mayo', 'Lettuce', 'Pickles', 'Tomatoes', 'Grilled Onions', 'Grilled Mushrooms',
  'Ketchup', 'Mustard', 'Relish', 'Onions', 'Jalapeño Peppers', 'Green Peppers',
  'A.1. Steak Sauce', 'BBQ Sauce', 'Hot Sauce'
];

const popularItems = [
  { name: 'Cheeseburger', description: 'Two fresh beef patties with cheese and your choice of toppings', price: '~BD 4.5' },
  { name: 'Little Cheeseburger', description: 'Single patty with cheese - still plenty filling', price: '~BD 3.5' },
  { name: 'Bacon Cheeseburger', description: 'Two patties with bacon, cheese and unlimited toppings', price: '~BD 5.2' },
  { name: 'Cajun Fries', description: 'Hand-cut fries with Cajun seasoning - generous portions', price: '~BD 2.0' },
  { name: 'Regular Fries', description: 'Fresh-cut boardwalk-style fries', price: '~BD 2.0' },
  { name: 'Milkshakes', description: 'Hand-spun with unlimited mix-ins', price: '~BD 3.5' },
];

const shoppingTips = [
  {
    title: 'All Toppings Free',
    tip: 'Unlike other burger joints, ALL toppings at Five Guys are free. Load up your burger however you want.',
  },
  {
    title: 'Fries Are Huge',
    tip: 'Even a small fries is massive. The regular size is meant for sharing. They literally scoop extra into the bag.',
  },
  {
    title: 'Peanuts While You Wait',
    tip: 'Free peanuts are available while your burger is made fresh. Note: not suitable if you have a peanut allergy.',
  },
  {
    title: 'Milkshake Mix-Ins',
    tip: 'Like burger toppings, milkshake mix-ins are free and unlimited. Add bacon, cookies, or bananas.',
  },
];

const relatedBrands = [
  { name: 'Shake Shack', href: '/guides/brands/shake-shack', emoji: '🍔' },
  { name: 'Cheesecake Factory', href: '/guides/brands/cheesecake-factory', emoji: '🍰' },
  { name: 'Starbucks', href: '/guides/brands/starbucks', emoji: '☕' },
  { name: 'Costa Coffee', href: '/guides/brands/costa-coffee', emoji: '☕' },
];

const faqs = [
  {
    q: 'Where is Five Guys in Bahrain?',
    a: 'Five Guys has locations at City Centre Bahrain and The Avenues Bahrain. Both serve the full menu including burgers, fries, and milkshakes.',
  },
  {
    q: 'Are toppings really free at Five Guys?',
    a: 'Yes, all toppings are completely free at Five Guys. You can add as many as you want including cheese, bacon, grilled onions, mushrooms, jalapeños, and various sauces.',
  },
  {
    q: 'Is Five Guys halal in Bahrain?',
    a: 'Yes, Five Guys in Bahrain serves halal-certified beef and chicken, complying with local requirements.',
  },
  {
    q: 'Why are Five Guys fries so big?',
    a: 'It\'s Five Guys tradition - they fill the cup then add extra scoops into the bag. Even a small feeds two people easily.',
  },
];

export default function FiveGuysBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-red-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Brands', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Five Guys', url: 'https://www.bahrainnights.com/guides/brands/five-guys' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-yellow-900/20" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium mb-4">
              🍟 Burgers & Fries
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-red-500">FIVE GUYS</span>
              {' '}
              <span className="text-gray-400">in Bahrain</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The Virginia-born burger chain famous for fresh beef patties, unlimited free 
              toppings, and overflowing Cajun fries. Experience handcrafted burgers made 
              your way at Five Guys Bahrain.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Locations', value: '2', icon: MapPin },
              { label: 'Free Toppings', value: '15+', icon: Sparkles },
              { label: 'Origin', value: 'Virginia', icon: Star },
              { label: 'Famous For', value: 'Cajun Fries', icon: UtensilsCrossed },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-red-500" />
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
          <h2 className="text-3xl font-bold mb-4">Five Guys Locations in Bahrain</h2>
          <p className="text-gray-400 mb-8">Find your nearest Five Guys.</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {storeLocations.map((store) => (
              <div 
                key={store.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-red-500/10"
              >
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xl font-bold text-red-400">{store.name}</h3>
                  {store.isPrimary && (
                    <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded">
                      MAIN
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
                    <span key={feature} className="px-2 py-1 bg-red-500/10 text-red-300 text-xs rounded">
                      {feature}
                    </span>
                  ))}
                </div>

                <a 
                  href={store.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-400 transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  Get Directions
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Toppings */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Free Toppings</h2>
          <p className="text-gray-400 mb-8">All toppings are FREE and UNLIMITED. Build your burger however you want.</p>
          
          <div className="flex flex-wrap gap-3">
            {freeToppings.map((topping) => (
              <span key={topping} className="px-4 py-2 bg-red-500/10 text-red-300 rounded-full text-sm">
                {topping}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Items */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Menu Highlights</h2>
          <p className="text-gray-400 mb-8">Popular items at Five Guys Bahrain.</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularItems.map((item) => (
              <div key={item.name} className="bg-white/5 rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-red-400">{item.name}</h3>
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
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Tips for Visiting Five Guys</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {shoppingTips.map((item) => (
              <div key={item.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-red-400 mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Brands */}
      <section className="py-16 px-4">
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
                <span className="font-medium group-hover:text-red-400 transition-colors">
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
      <section className="py-16 px-4 bg-gradient-to-r from-red-500/10 to-yellow-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Hungry for More?</h2>
          <p className="text-gray-300 mb-8">
            Discover other burger spots in Bahrain.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/brands/shake-shack"
              className="px-8 py-3 bg-red-500 hover:bg-red-400 text-white font-bold rounded-lg transition-colors"
            >
              Shake Shack Guide
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
            headline: 'Five Guys Bahrain - All Locations & Menu Guide 2026',
            description: 'Find Five Guys locations in Bahrain. Burgers with free toppings, Cajun fries & milkshakes.',
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
