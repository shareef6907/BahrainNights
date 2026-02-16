import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Moon, Clock, MapPin, Star, Utensils, 
  Smartphone, Truck, AlertCircle, Coffee,
  Sunrise, CreditCard, Timer
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import InternalLinks from '@/components/SEO/InternalLinks';

export const metadata: Metadata = {
  title: 'Suhoor Delivery Bahrain 2026 | Late Night Food Delivery During Ramadan',
  description: 'Find suhoor delivery options in Bahrain during Ramadan 2026. Order late-night food via Talabat, Carriage & more. 24-hour restaurants with delivery.',
  keywords: 'suhoor delivery Bahrain, late night food delivery Bahrain Ramadan, Talabat Bahrain Ramadan, 24 hour delivery Bahrain, food delivery suhoor, Ramadan food delivery Bahrain',
  openGraph: {
    title: 'Suhoor Delivery Bahrain 2026 | Late Night Food Delivery During Ramadan',
    description: 'Order suhoor delivery in Bahrain - delivery apps, 24-hour restaurants, and late-night food options.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/ramadan/suhoor-delivery',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/ramadan/suhoor-delivery',
  },
};

const deliveryApps = [
  {
    name: 'Talabat',
    description: 'The most popular food delivery app in Bahrain with the widest restaurant selection. During Ramadan, many restaurants on Talabat operate extended hours for suhoor delivery.',
    features: ['Largest restaurant selection', 'Live order tracking', 'Multiple payment options', 'Scheduled ordering', 'Ramadan deals & discounts'],
    availability: 'Most restaurants available until late night during Ramadan. Many 24-hour options.',
    tip: 'Enable notifications for Ramadan deals. Many restaurants offer suhoor specials exclusively on the app.',
    rating: 4.8,
    color: 'orange',
  },
  {
    name: 'Carriage',
    description: 'Popular delivery app in Bahrain and the GCC. Offers a good selection of restaurants with competitive delivery fees and frequent promotions.',
    features: ['Good restaurant variety', 'Competitive prices', 'Easy reordering', 'Promo codes', 'Bahrain-focused'],
    availability: 'Extended hours during Ramadan with late-night options available.',
    tip: 'Check their Ramadan section for special suhoor menus and bundles.',
    rating: 4.6,
    color: 'blue',
  },
  {
    name: 'Jahez',
    description: 'Growing delivery platform in Bahrain. Offers various cuisines and competitive pricing with regular promotions.',
    features: ['Growing restaurant network', 'Regular promotions', 'Multiple cuisines', 'Easy interface'],
    availability: 'Late-night delivery available during Ramadan from participating restaurants.',
    tip: 'New users often get signup discounts - worth checking during Ramadan.',
    rating: 4.4,
    color: 'green',
  },
];

const twentyFourHourRestaurants = [
  {
    name: 'Fuddruckers',
    cuisine: 'American',
    locations: 'Seef, Riffa',
    bestFor: 'Burgers, hearty meals',
    suhoorPicks: ['Burgers', 'Chicken sandwiches', 'Loaded fries'],
    delivery: 'Available via Talabat & Carriage',
    note: 'Filling American comfort food. Great for a satisfying suhoor.',
  },
  {
    name: 'Jasmis',
    cuisine: 'South Indian Vegetarian',
    locations: 'Seef',
    bestFor: 'Vegetarian, South Indian breakfast',
    suhoorPicks: ['Masala Dosa', 'Idli Sambar', 'Pongal', 'Filter Coffee'],
    delivery: 'Available via Talabat',
    note: 'Perfect for vegetarians. Traditional South Indian breakfast items ideal for suhoor.',
  },
  {
    name: 'Reem Al Bawadi',
    cuisine: 'Arabic/Levantine',
    locations: 'Juffair',
    bestFor: 'Traditional Arabic food',
    suhoorPicks: ['Hummus', 'Foul', 'Grilled meats', 'Fresh bread'],
    delivery: 'Available via major apps',
    note: 'Authentic Arabic cuisine. Traditional suhoor favorites like foul and hummus.',
  },
  {
    name: 'McDonald\'s',
    cuisine: 'Fast Food',
    locations: 'Multiple across Bahrain',
    bestFor: 'Quick, familiar meals',
    suhoorPicks: ['McArabia', 'Breakfast items', 'Hash browns'],
    delivery: 'Available via Talabat & own app',
    note: 'Reliable late-night option. Breakfast menu often available during suhoor hours.',
  },
  {
    name: 'KFC',
    cuisine: 'Fast Food',
    locations: 'Multiple across Bahrain',
    bestFor: 'Fried chicken, filling meals',
    suhoorPicks: ['Chicken buckets', 'Wraps', 'Rice meals'],
    delivery: 'Available via Talabat & own app',
    note: 'Filling option for those wanting a hearty suhoor meal.',
  },
  {
    name: 'Hardee\'s',
    cuisine: 'Fast Food',
    locations: 'Multiple across Bahrain',
    bestFor: 'Burgers, breakfast items',
    suhoorPicks: ['Breakfast biscuits', 'Hash rounds', 'Burgers'],
    delivery: 'Available via major apps',
    note: 'Breakfast menu is especially good for suhoor.',
  },
];

const suhoorBestChoices = [
  {
    category: 'Traditional Arabic',
    why: 'Best for keeping full during fasting',
    items: ['Foul Medames (fava beans)', 'Hummus with bread', 'Labneh', 'Eggs with vegetables', 'Dates'],
    restaurants: 'Reem Al Bawadi, Arabic restaurants on Talabat',
  },
  {
    category: 'South Indian',
    why: 'Light yet sustaining, vegetarian-friendly',
    items: ['Dosa', 'Idli & Sambar', 'Upma', 'Pongal'],
    restaurants: 'Jasmis, Saravana Bhavan',
  },
  {
    category: 'Pakistani/North Indian',
    why: 'Filling and flavorful',
    items: ['Paratha with eggs', 'Kebabs', 'Biryani', 'Haleem'],
    restaurants: 'Kabab King, Indian restaurants via delivery apps',
  },
  {
    category: 'Fast Food',
    why: 'Convenient and filling',
    items: ['Breakfast sandwiches', 'Wraps', 'Hash browns'],
    restaurants: 'McDonald\'s, Hardee\'s, KFC',
  },
];

const faqs = [
  {
    q: 'What time can I order suhoor delivery in Bahrain?',
    a: 'During Ramadan, many restaurants on delivery apps operate until very late - often 3-4 AM for suhoor. Order at least 45-60 minutes before you need to eat to ensure delivery before imsak (the time to stop eating, around 4:30 AM). 24-hour restaurants and fast-food chains are your most reliable options for late orders.',
  },
  {
    q: 'Which delivery app is best for suhoor in Bahrain?',
    a: 'Talabat has the largest selection of restaurants in Bahrain and the most reliable late-night delivery coverage. Carriage is also excellent with competitive pricing. Check both apps during Ramadan as they often run different promotions and have different restaurant availability late at night.',
  },
  {
    q: 'Are delivery fees higher during suhoor time in Bahrain?',
    a: 'Delivery fees are generally consistent, though surge pricing may occasionally apply during peak demand times. Some apps offer free delivery promotions during Ramadan - check the app regularly for deals. Ordering directly from restaurant apps (McDonald\'s, etc.) sometimes has lower fees.',
  },
  {
    q: 'What are the best foods to order for suhoor delivery?',
    a: 'For sustaining energy during fasting, order foods with complex carbohydrates and protein: Arabic dishes like foul and hummus, eggs with bread, South Indian dosas and idlis, or hearty burgers. Avoid very salty or sugary foods that increase thirst. Include water-rich sides when possible.',
  },
  {
    q: 'Can I schedule suhoor delivery in advance?',
    a: 'Yes! Both Talabat and Carriage offer scheduled delivery options. You can order the night before and schedule delivery for your preferred time (e.g., 3 AM). This is highly recommended to avoid delays during the busy pre-suhoor rush.',
  },
  {
    q: 'What if delivery is delayed and imsak is approaching?',
    a: 'If your delivery is running late, contact the restaurant or use the in-app support. Have backup options ready - dates, water, and simple foods you can eat quickly. It\'s wise to order with a buffer of at least 45-60 minutes before imsak time.',
  },
];

export default function SuhoorDeliveryPage() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://www.bahrainnights.com' },
    { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
    { name: 'Ramadan', url: 'https://www.bahrainnights.com/guides/ramadan' },
    { name: 'Suhoor Delivery', url: 'https://www.bahrainnights.com/guides/ramadan/suhoor-delivery' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={faqs} />
      
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Suhoor Delivery Bahrain 2026 | Late Night Food Delivery During Ramadan',
            description: 'Complete guide to suhoor delivery options in Bahrain during Ramadan 2026.',
            author: { '@type': 'Organization', name: 'Bahrain Nights' },
            publisher: { '@type': 'Organization', name: 'Bahrain Nights' },
            datePublished: '2026-02-01',
            dateModified: '2026-02-16',
            mainEntityOfPage: 'https://www.bahrainnights.com/guides/ramadan/suhoor-delivery',
          }),
        }}
      />

      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-purple-500/5 to-fuchsia-500/10" />
          <div className="max-w-4xl mx-auto text-center relative">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Moon className="w-8 h-8 text-violet-400" />
              <span className="text-violet-400 font-semibold">Ramadan 2026</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Suhoor Delivery in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-500 to-fuchsia-500">
                Bahrain
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Order your pre-dawn meal delivered to your door. Complete guide to late-night 
              food delivery apps and 24-hour restaurants during Ramadan 2026.
            </p>
          </div>
        </section>

        {/* Important Notice */}
        <section className="py-6 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-violet-500/10 rounded-2xl p-6 border border-violet-500/30">
              <div className="flex items-start gap-3">
                <Timer className="w-6 h-6 text-violet-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-lg font-bold text-white mb-2">Order Early for Suhoor!</h2>
                  <p className="text-gray-300">
                    Place your suhoor order at least <strong className="text-violet-400">45-60 minutes before imsak</strong> (around 4:30 AM in March). 
                    Delivery times can vary during peak hours. Consider scheduling your order in advance for peace of mind.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="py-8 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4">
            <a href="#apps" className="px-4 py-2 bg-violet-500/20 text-violet-400 rounded-full hover:bg-violet-500/30 transition-colors">
              Delivery Apps
            </a>
            <a href="#24hr" className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-full hover:bg-purple-500/30 transition-colors">
              24-Hour Restaurants
            </a>
            <a href="#what-to-order" className="px-4 py-2 bg-fuchsia-500/20 text-fuchsia-400 rounded-full hover:bg-fuchsia-500/30 transition-colors">
              What to Order
            </a>
            <a href="#tips" className="px-4 py-2 bg-pink-500/20 text-pink-400 rounded-full hover:bg-pink-500/30 transition-colors">
              Ordering Tips
            </a>
          </div>
        </section>

        {/* Delivery Apps */}
        <section id="apps" className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Smartphone className="w-8 h-8 text-violet-400" />
              Food Delivery Apps
            </h2>
            <p className="text-gray-400 mb-8">The main apps for ordering suhoor delivery in Bahrain.</p>
            
            <div className="space-y-6">
              {deliveryApps.map((app, index) => (
                <div key={index} className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-violet-500/30 transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{app.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="flex items-center gap-1 text-violet-400">
                          <Star className="w-4 h-4 fill-current" /> {app.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-4">{app.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {app.features.map((feature, i) => (
                      <span key={i} className="px-3 py-1 bg-violet-500/10 text-violet-400 rounded-full text-sm">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-900/50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Late Night Availability
                      </p>
                      <p className="text-gray-300 text-sm">{app.availability}</p>
                    </div>
                    <div className="bg-violet-500/10 rounded-lg p-3 border border-violet-500/20">
                      <p className="text-xs text-violet-400 mb-1">💡 Tip</p>
                      <p className="text-gray-300 text-sm">{app.tip}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 24-Hour Restaurants */}
        <section id="24hr" className="py-16 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Truck className="w-8 h-8 text-purple-400" />
              24-Hour Restaurants with Delivery
            </h2>
            <p className="text-gray-400 mb-8">Reliable options that operate around the clock during Ramadan.</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {twentyFourHourRestaurants.map((restaurant, index) => (
                <div key={index} className="bg-slate-900/50 rounded-xl p-5 border border-white/10 hover:border-purple-500/30 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-white">{restaurant.name}</h3>
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs font-medium">
                      24 Hours
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
                    <span className="text-purple-400">{restaurant.cuisine}</span>
                    <span>•</span>
                    <span>{restaurant.locations}</span>
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-3">{restaurant.note}</p>
                  
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-1">Best for Suhoor:</p>
                    <div className="flex flex-wrap gap-1">
                      {restaurant.suhoorPicks.map((item, i) => (
                        <span key={i} className="px-2 py-0.5 bg-purple-500/10 text-purple-400 rounded text-xs">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Truck className="w-3 h-3" /> {restaurant.delivery}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What to Order */}
        <section id="what-to-order" className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Utensils className="w-8 h-8 text-fuchsia-400" />
              What to Order for Suhoor
            </h2>
            <p className="text-gray-400 mb-8">Best food choices to keep you energized during fasting.</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {suhoorBestChoices.map((choice, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-fuchsia-500/30 transition-colors">
                  <h3 className="text-lg font-bold text-white mb-2">{choice.category}</h3>
                  <p className="text-fuchsia-400 text-sm mb-3">{choice.why}</p>
                  
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Recommended Items:</p>
                    <div className="flex flex-wrap gap-1">
                      {choice.items.map((item, i) => (
                        <span key={i} className="px-2 py-1 bg-fuchsia-500/10 text-fuchsia-400 rounded text-xs">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500">
                    <strong>Where to order:</strong> {choice.restaurants}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ordering Tips */}
        <section id="tips" className="py-16 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Coffee className="w-8 h-8 text-pink-400" />
              Suhoor Ordering Tips
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-900/50 rounded-xl p-6 border border-pink-500/20">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Timer className="w-5 h-5 text-pink-400" /> Timing
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Order 45-60 minutes before imsak</li>
                  <li>• Use scheduled ordering for peace of mind</li>
                  <li>• Account for potential delays</li>
                  <li>• Have backup food at home just in case</li>
                </ul>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-6 border border-pink-500/20">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-pink-400" /> Savings
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Check for Ramadan promo codes</li>
                  <li>• Compare prices across apps</li>
                  <li>• Use app loyalty points</li>
                  <li>• Look for free delivery promotions</li>
                </ul>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-6 border border-pink-500/20">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-pink-400" /> Food Selection
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Choose protein + complex carbs</li>
                  <li>• Avoid very salty foods</li>
                  <li>• Include dates if possible</li>
                  <li>• Order water/drinks if available</li>
                </ul>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-6 border border-pink-500/20">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-pink-400" /> Backup Plan
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Keep dates and water at home</li>
                  <li>• Have simple backup foods ready</li>
                  <li>• Track your delivery in real-time</li>
                  <li>• Contact support if very delayed</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
                  <p className="text-gray-300">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Prefer Dining Out for Suhoor?</h2>
            <p className="text-gray-400 mb-6">
              Check out our guide to the best suhoor restaurants in Bahrain for a sit-down experience.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/guides/ramadan/suhoor" className="px-6 py-3 bg-violet-500 text-white rounded-lg font-medium hover:bg-violet-400 transition-colors">
                Best Suhoor Restaurants
              </Link>
              <Link href="/guides/ramadan/best-iftars" className="px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors">
                Best Iftars Guide
              </Link>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <InternalLinks
          title="Explore More"
          links={[
            { href: '/guides/ramadan', title: 'Complete Ramadan Guide' },
            { href: '/guides/ramadan/suhoor', title: 'Best Suhoor Restaurants' },
            { href: '/guides/ramadan/best-iftars', title: 'Best Iftars' },
            { href: '/guides/ramadan/ghabga', title: 'Ghabga Venues' },
            { href: '/guides/ramadan/timings', title: 'Ramadan Timings' },
            { href: '/places', title: 'Discover Restaurants' },
          ]}
        />
      </main>
    </>
  );
}
