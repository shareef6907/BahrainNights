import { Metadata } from 'next';

// Static page with ISR - revalidate every hour
export const revalidate = 3600;
import Link from 'next/link';
import { 
  Moon, Tag, Percent, CreditCard, Smartphone, 
  Building2, Utensils, Clock, Gift, Sparkles
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import InternalLinks from '@/components/SEO/InternalLinks';

export const metadata: Metadata = {
  title: 'Ramadan Deals Bahrain 2026 | Iftar Offers & Restaurant Discounts',
  description: 'Find the best Ramadan deals in Bahrain for 2026. Discover iftar offers, restaurant discounts, hotel packages, and exclusive Ramadan promotions across the kingdom.',
  keywords: 'Ramadan deals Bahrain 2026, Ramadan offers Bahrain, iftar deals, Ramadan restaurant deals, Ramadan promotions Bahrain, Ramadan discounts',
  openGraph: {
    title: 'Ramadan Deals Bahrain 2026 | Iftar Offers & Restaurant Discounts',
    description: 'Best Ramadan deals, iftar offers, and restaurant discounts in Bahrain for 2026.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/ramadan/deals',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/ramadan/deals',
  },
};

const dealCategories = [
  {
    category: 'Hotel Iftar Packages',
    icon: Building2,
    description: 'Major hotels offer special Ramadan packages combining accommodation with iftar or suhoor dining. These can offer excellent value compared to booking separately.',
    whereToFind: 'Book directly through hotel websites or call their reservations. Check sites like Booking.com for package deals.',
    typicalOffers: [
      'Stay + Iftar buffet packages',
      'Early bird booking discounts',
      'Group rates for 10+ guests',
      'Corporate packages',
      'Weekend vs weekday pricing',
    ],
    tips: 'Book early in Ramadan for the best rates. Hotels often offer launch specials for the first week.',
  },
  {
    category: 'Restaurant Promotions',
    icon: Utensils,
    description: 'Restaurants across Bahrain offer special Ramadan menus, set iftar prices, and promotional deals. Many introduce exclusive Ramadan set menus.',
    whereToFind: 'Follow restaurants on Instagram, check their websites, or call directly. Look for Ramadan menu announcements.',
    typicalOffers: [
      'Special Ramadan set menus',
      'Kids eat free promotions',
      'Early booking discounts',
      'Loyalty program bonuses',
      'Takeaway iftar packages',
    ],
    tips: 'Instagram is the best place to find restaurant Ramadan deals. Follow your favorites before Ramadan starts.',
  },
  {
    category: 'Food Delivery App Deals',
    icon: Smartphone,
    description: 'Talabat, Carriage, and other delivery apps run extensive Ramadan promotions. Expect daily promo codes, free delivery, and exclusive discounts.',
    whereToFind: 'Download Talabat, Carriage, Jahez, and other delivery apps. Enable notifications for deal alerts.',
    typicalOffers: [
      'Daily promo codes',
      'Free delivery on iftar orders',
      'Percentage discounts',
      'Flash sales around iftar time',
      'First-time user bonuses',
    ],
    tips: 'Order 30-60 minutes before iftar to avoid rush. Promo codes often have minimum order requirements.',
  },
  {
    category: 'Bank Card Offers',
    icon: CreditCard,
    description: 'Bahraini banks partner with restaurants and hotels for exclusive Ramadan discounts. Your debit or credit card may unlock significant savings.',
    whereToFind: 'Check your bank\'s app, website, or SMS alerts. Major banks like BisB, NBB, and others publish Ramadan offers.',
    typicalOffers: [
      'Percentage off at partner restaurants',
      'Buy-one-get-one deals',
      'Extra loyalty points',
      'Cashback on dining',
      'Exclusive venue access',
    ],
    tips: 'Log into your banking app at the start of Ramadan to see available offers. Some require activation.',
  },
  {
    category: 'Supermarket & Grocery Deals',
    icon: Gift,
    description: 'Supermarkets offer Ramadan essentials at discounted prices. Look for deals on dates, laban, juices, and traditional Ramadan items.',
    whereToFind: 'Lulu, Carrefour, Al Jazira, and local supermarkets. Check weekly flyers and in-store promotions.',
    typicalOffers: [
      'Discounted dates and dried fruits',
      'Buy-one-get-one on Ramadan staples',
      'Reduced prices on cooking ingredients',
      'Special Ramadan food bundles',
      'Extended operating hours',
    ],
    tips: 'Shop early in the week for best selection. Many stores have special Ramadan sections.',
  },
  {
    category: 'Telecommunications',
    icon: Sparkles,
    description: 'Mobile carriers offer Ramadan data packages and promotions. Useful for staying connected during the holy month.',
    whereToFind: 'Batelco, Zain, STC - check their apps or visit stores.',
    typicalOffers: [
      'Extra data packages',
      'Reduced international call rates',
      'Ramadan bundle deals',
      'Family plan discounts',
    ],
    tips: 'Check offers at the start of Ramadan. Some deals are time-limited.',
  },
];

const howToFind = [
  {
    method: 'Social Media',
    description: 'Follow hotels, restaurants, and malls on Instagram. Most announce Ramadan deals before and during the holy month.',
    platforms: ['Instagram', 'Facebook', 'Twitter/X'],
  },
  {
    method: 'Delivery Apps',
    description: 'Enable notifications on Talabat, Carriage, and other apps. They push daily Ramadan deals and promo codes.',
    platforms: ['Talabat', 'Carriage', 'Jahez'],
  },
  {
    method: 'Bank Apps',
    description: 'Your banking app\'s offers section will show restaurant and retail deals available to cardholders.',
    platforms: ['BisB', 'NBB', 'Bank of Bahrain'],
  },
  {
    method: 'Direct Contact',
    description: 'Call hotels and restaurants directly to ask about current promotions. Some offers aren\'t advertised publicly.',
    platforms: ['Phone', 'WhatsApp', 'Email'],
  },
];

const faqs = [
  {
    q: 'When do Ramadan deals start in Bahrain?',
    a: 'Ramadan deals typically start a few days before Ramadan begins and run throughout the holy month. The best deals are often available in the first two weeks. Hotels may announce early bird specials weeks in advance.',
  },
  {
    q: 'Where can I find Ramadan promo codes for food delivery?',
    a: 'Delivery apps like Talabat and Carriage share promo codes through their app notifications, social media, and sometimes via SMS. Enable app notifications and follow their social accounts. Codes are often released daily during Ramadan.',
  },
  {
    q: 'Do hotels offer group discounts for iftar?',
    a: 'Yes, most hotels offer reduced rates for groups of 10 or more. Corporate packages are common, especially for larger groups. Contact the hotel directly for group pricing as these aren\'t always advertised online.',
  },
  {
    q: 'Are Ramadan deals available for takeaway iftar?',
    a: 'Absolutely! Many restaurants and hotels offer takeaway iftar packages, often at lower prices than dine-in. Delivery apps also have special Ramadan sections featuring pre-packaged iftar meals for home delivery.',
  },
  {
    q: 'How can I save money on iftar dining?',
    a: 'Book early for early bird discounts, dine on weekdays (usually cheaper than weekends), use bank card offers, check delivery app promo codes, and consider set menus over à la carte. Group bookings often qualify for discounts.',
  },
  {
    q: 'Do deals apply to suhoor as well as iftar?',
    a: 'Many venues offer suhoor deals alongside iftar promotions. Late-night restaurants and 24-hour cafes often have special suhoor menus. Hotels with overnight packages may include both iftar and suhoor.',
  },
];

export default function RamadanDealsPage() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://www.bahrainnights.com' },
    { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
    { name: 'Ramadan', url: 'https://www.bahrainnights.com/guides/ramadan' },
    { name: 'Deals', url: 'https://www.bahrainnights.com/guides/ramadan/deals' },
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
            headline: 'Ramadan Deals Bahrain 2026 | Iftar Offers & Discounts',
            description: 'Guide to finding the best Ramadan deals in Bahrain for 2026.',
            author: { '@type': 'Organization', name: 'Bahrain Nights' },
            publisher: { '@type': 'Organization', name: 'Bahrain Nights' },
            datePublished: '2026-02-01',
            dateModified: '2026-02-15',
            mainEntityOfPage: 'https://www.bahrainnights.com/guides/ramadan/deals',
          }),
        }}
      />

      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 via-pink-500/5 to-red-500/10" />
          <div className="max-w-4xl mx-auto text-center relative">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Tag className="w-8 h-8 text-rose-400" />
              <span className="text-rose-400 font-semibold">Ramadan 2026</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ramadan Deals in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-500 to-red-500">
                Bahrain
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Your guide to finding the best Ramadan offers across Bahrain. From iftar discounts 
              to hotel packages, discover how to make the most of Ramadan promotions.
            </p>
          </div>
        </section>

        {/* Quick Tips */}
        <section className="py-8 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-rose-400">Book Early</div>
              <div className="text-sm text-gray-400">Best Rates</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-rose-400">Weekdays</div>
              <div className="text-sm text-gray-400">Lower Prices</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-rose-400">Bank Cards</div>
              <div className="text-sm text-gray-400">Hidden Discounts</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-rose-400">Apps</div>
              <div className="text-sm text-gray-400">Promo Codes</div>
            </div>
          </div>
        </section>

        {/* Deal Categories */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Percent className="w-8 h-8 text-rose-400" />
              Where to Find Ramadan Deals
            </h2>
            <p className="text-gray-400 mb-8">Comprehensive guide to savings opportunities during the holy month.</p>
            
            <div className="space-y-6">
              {dealCategories.map((cat, index) => (
                <div key={index} className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-rose-500/30 transition-colors">
                  <div className="flex items-start gap-4 mb-4">
                    <cat.icon className="w-8 h-8 text-rose-400 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-white">{cat.category}</h3>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-4">{cat.description}</p>
                  
                  <div className="bg-white/5 rounded-lg p-4 mb-4">
                    <h4 className="text-sm font-semibold text-rose-400 mb-2">Where to Look</h4>
                    <p className="text-sm text-gray-400">{cat.whereToFind}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-pink-400 mb-2">Typical Offers</h4>
                    <div className="flex flex-wrap gap-2">
                      {cat.typicalOffers.map((offer, i) => (
                        <span key={i} className="px-2 py-1 bg-rose-500/10 text-rose-300 rounded text-xs">
                          {offer}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500 flex items-center gap-2 pt-4 border-t border-white/10">
                    <Clock className="w-4 h-4" /> Tip: {cat.tips}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Find Deals */}
        <section className="py-16 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Smartphone className="w-8 h-8 text-pink-400" />
              How to Find the Best Deals
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {howToFind.map((method, index) => (
                <div key={index} className="bg-slate-900/50 rounded-xl p-5 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-2">{method.method}</h3>
                  <p className="text-gray-400 text-sm mb-3">{method.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {method.platforms.map((platform, i) => (
                      <span key={i} className="px-2 py-1 bg-pink-500/10 text-pink-400 rounded text-xs">
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Important Note */}
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-rose-400 mb-2">📋 Important Note</h3>
              <p className="text-gray-300 text-sm">
                This guide explains where and how to find Ramadan deals in Bahrain. Specific promotions, 
                prices, and offers change each year and during the month. Always verify current deals 
                directly with venues, apps, or your bank before making plans. Prices and availability 
                may vary.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs Display */}
        <section className="py-16 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-slate-900/50 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
                  <p className="text-gray-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Plan Your Ramadan Experience</h2>
            <p className="text-gray-400 mb-6">
              Explore our other Ramadan guides for the best iftar venues and experiences.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/guides/ramadan/best-iftars" className="px-6 py-3 bg-rose-500 text-white rounded-lg font-medium hover:bg-rose-400 transition-colors">
                Best Iftars
              </Link>
              <Link href="/guides/ramadan/iftar-budget" className="px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors">
                Budget Iftars
              </Link>
              <Link href="/guides/ramadan/tents" className="px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors">
                Ramadan Tents
              </Link>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <InternalLinks
          title="Explore More"
          links={[
            { href: '/guides/ramadan', title: 'Complete Ramadan Guide' },
            { href: '/guides/ramadan/best-iftars', title: 'Best Iftars' },
            { href: '/guides/ramadan/iftar-luxury', title: 'Luxury Iftars' },
            { href: '/guides/ramadan/iftar-budget', title: 'Budget Iftars' },
            { href: '/guides/ramadan/ghabga', title: 'Ghabga Guide' },
            { href: '/offers', title: 'Current Offers' },
          ]}
        />
      </main>
    </>
  );
}
