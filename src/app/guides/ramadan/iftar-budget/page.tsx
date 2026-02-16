import { Metadata } from 'next';

// Static page with ISR - revalidate every hour
export const revalidate = 3600;
import Link from 'next/link';
import { 
  Moon, Clock, MapPin, Star, Utensils, Users, 
  DollarSign, Wallet, CheckCircle
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import InternalLinks from '@/components/SEO/InternalLinks';

export const metadata: Metadata = {
  title: 'Budget Iftar Bahrain 2026 | Affordable Iftar Under BD 15',
  description: 'Find affordable iftar options in Bahrain for Ramadan 2026. Budget-friendly iftars at local restaurants, mall food courts, and community venues. Break your fast without breaking the bank.',
  keywords: 'budget iftar Bahrain, cheap iftar Bahrain, iftar under 10 BD, affordable iftar Bahrain 2026, low cost iftar, iftar deals Bahrain',
  openGraph: {
    title: 'Budget Iftar Bahrain 2026 | Affordable Iftar Under BD 15',
    description: 'Affordable iftar options in Bahrain - local restaurants, mall food courts, and community venues.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/ramadan/iftar-budget',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/ramadan/iftar-budget',
  },
};

const budgetCategories = [
  {
    category: 'Mall Food Courts',
    description: 'Malls across Bahrain offer diverse food court options during Ramadan. Many restaurants extend their hours and offer special iftar combos.',
    locations: ['City Centre Bahrain', 'Seef Mall', 'The Avenues', 'Bahrain Mall'],
    priceRange: 'BD 3-8 per person',
    highlights: ['Variety of cuisines', 'Family-friendly', 'Air-conditioned', 'Free parking usually available'],
    tips: 'Arrive early as food courts get crowded around iftar time. Many offer special Ramadan set menus.',
  },
  {
    category: 'Local Arabic Restaurants',
    description: 'Traditional local eateries offer authentic Arabic iftar at affordable prices. These spots are popular with locals and offer genuine Bahraini hospitality.',
    locations: ['Muharraq old town', 'Manama downtown', 'Various neighborhoods'],
    priceRange: 'BD 5-12 per person',
    highlights: ['Authentic flavors', 'Generous portions', 'Traditional atmosphere', 'Dates and laban included'],
    tips: 'Many local restaurants don\'t take reservations during Ramadan - arrive 15-20 minutes before iftar.',
  },
  {
    category: 'Indian & Pakistani Restaurants',
    description: 'Bahrain has excellent South Asian restaurants offering hearty iftar meals at great value. Look for iftar thali sets or buffet options.',
    locations: ['Manama', 'Hoora', 'Juffair', 'Gudaibiya'],
    priceRange: 'BD 4-10 per person',
    highlights: ['Hearty portions', 'Biryani specials', 'Vegetarian options', 'Great value'],
    tips: 'Many offer special Ramadan thali sets that include soup, dates, main course, and drinks.',
  },
  {
    category: 'Cafeteria-Style Eateries',
    description: 'Simple cafeterias and shawarma shops offer basic but satisfying iftar meals. Perfect for a quick, no-fuss breaking of fast.',
    locations: ['Throughout Bahrain'],
    priceRange: 'BD 2-5 per person',
    highlights: ['Quick service', 'Simple meals', 'Very affordable', 'Multiple locations'],
    tips: 'Great for solo diners or those wanting a quick iftar before evening prayers.',
  },
];

const communityOptions = [
  {
    name: 'Mosque Iftars',
    description: 'Many mosques in Bahrain provide free iftar for worshippers. Al Fateh Grand Mosque often hosts large community iftars.',
    cost: 'Free',
    note: 'Open to all Muslims. Non-Muslims may be welcome to observe respectfully at some locations.',
  },
  {
    name: 'Charity Iftars',
    description: 'Various charities and community organizations host free or donation-based iftars throughout Ramadan.',
    cost: 'Free or donation',
    note: 'Check local newspapers and social media for announcements.',
  },
  {
    name: 'Hotel Staff Canteens',
    description: 'Some hotels open their staff canteens to the public during Ramadan, offering quality food at reduced prices.',
    cost: 'BD 5-10',
    note: 'Not all hotels offer this - call ahead to check availability.',
  },
];

const savingTips = [
  {
    tip: 'Download Food Delivery Apps',
    description: 'Talabat, Carriage, and other apps often have exclusive Ramadan promo codes and discounts.',
  },
  {
    tip: 'Check Bank Card Offers',
    description: 'Credit and debit cards from Bahraini banks often have Ramadan dining discounts. Check your bank\'s app or website.',
  },
  {
    tip: 'Go Weekdays',
    description: 'Weekday iftars are often cheaper and less crowded than Thursday/Friday iftars.',
  },
  {
    tip: 'Share Group Platters',
    description: 'Many restaurants offer family-style sharing platters that work out cheaper per person than individual meals.',
  },
  {
    tip: 'Look for Early Bird Specials',
    description: 'Some venues offer discounts for bookings made early in Ramadan or for the first 10 days.',
  },
  {
    tip: 'Follow Restaurant Social Media',
    description: 'Restaurants announce daily specials and limited-time offers on Instagram. Follow your favorites.',
  },
];

const faqs = [
  {
    q: 'What is the cheapest iftar in Bahrain?',
    a: 'The most affordable iftars in Bahrain are at local cafeterias and shawarma shops (BD 2-5), mall food courts (BD 3-8), and mosque community iftars (free). Many local Arabic and Indian restaurants also offer set iftar menus under BD 10.',
  },
  {
    q: 'Where can I find free iftar in Bahrain?',
    a: 'Free iftars are available at many mosques throughout Bahrain, including Al Fateh Grand Mosque. Various charities and community organizations also host free community iftars during Ramadan. Check local announcements and social media.',
  },
  {
    q: 'Are mall food courts open during Ramadan?',
    a: 'Yes, mall food courts in Bahrain operate during Ramadan but with adjusted hours. Most open after iftar time and stay open late into the night. Some may offer takeaway before iftar.',
  },
  {
    q: 'Can I find vegetarian iftar options on a budget?',
    a: 'Absolutely! Indian and South Asian restaurants offer excellent vegetarian iftar options at great prices. Mall food courts also have vegetarian choices, and Arabic restaurants offer mezze-based options.',
  },
  {
    q: 'What is included in a typical budget iftar meal?',
    a: 'A typical budget iftar includes dates, laban (buttermilk) or juice, soup, a main dish (often rice with meat or chicken), bread, and sometimes a simple dessert. Set menus usually offer better value than ordering à la carte.',
  },
];

export default function BudgetIftarPage() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://www.bahrainnights.com' },
    { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
    { name: 'Ramadan', url: 'https://www.bahrainnights.com/guides/ramadan' },
    { name: 'Budget Iftar', url: 'https://www.bahrainnights.com/guides/ramadan/iftar-budget' },
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
            headline: 'Budget Iftar Bahrain 2026 | Affordable Iftar Options',
            description: 'Guide to affordable iftar options in Bahrain for Ramadan 2026.',
            author: { '@type': 'Organization', name: 'Bahrain Nights' },
            publisher: { '@type': 'Organization', name: 'Bahrain Nights' },
            datePublished: '2026-02-01',
            dateModified: '2026-02-15',
            mainEntityOfPage: 'https://www.bahrainnights.com/guides/ramadan/iftar-budget',
          }),
        }}
      />

      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-green-500/5 to-teal-500/10" />
          <div className="max-w-4xl mx-auto text-center relative">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Wallet className="w-8 h-8 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Ramadan 2026</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Budget Iftar in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500">
                Bahrain
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Enjoy delicious iftar without overspending. From mall food courts to local gems, 
              discover affordable ways to break your fast this Ramadan.
            </p>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-8 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-emerald-400">BD 2-15</div>
              <div className="text-sm text-gray-400">Price Range</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-emerald-400">100+</div>
              <div className="text-sm text-gray-400">Budget Options</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-emerald-400">Free</div>
              <div className="text-sm text-gray-400">Mosque Iftars</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-emerald-400">Island-wide</div>
              <div className="text-sm text-gray-400">Locations</div>
            </div>
          </div>
        </section>

        {/* Budget Categories */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Utensils className="w-8 h-8 text-emerald-400" />
              Where to Find Budget Iftar
            </h2>
            <p className="text-gray-400 mb-8">Affordable options across Bahrain for every taste and budget.</p>
            
            <div className="space-y-6">
              {budgetCategories.map((cat, index) => (
                <div key={index} className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-emerald-500/30 transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{cat.category}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                          <DollarSign className="w-4 h-4" /> {cat.priceRange}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">{cat.description}</p>
                  <div className="mb-4">
                    <span className="text-sm text-gray-400">Where to look: </span>
                    <span className="text-sm text-white">{cat.locations.join(', ')}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {cat.highlights.map((highlight, i) => (
                      <span key={i} className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-sm">
                        {highlight}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Tip: {cat.tips}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Community & Free Options */}
        <section className="py-16 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Users className="w-8 h-8 text-teal-400" />
              Community & Free Iftars
            </h2>
            <p className="text-gray-400 mb-8">Experience the spirit of Ramadan at community gatherings.</p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {communityOptions.map((option, index) => (
                <div key={index} className="bg-slate-900/50 rounded-xl p-5 border border-white/10">
                  <h3 className="text-lg font-bold text-white mb-2">{option.name}</h3>
                  <div className="text-teal-400 font-semibold mb-3">{option.cost}</div>
                  <p className="text-gray-300 text-sm mb-3">{option.description}</p>
                  <p className="text-xs text-gray-500 italic">{option.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Money-Saving Tips */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-400" />
              Money-Saving Tips
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {savingTips.map((item, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-2">{item.tip}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              ))}
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
            <h2 className="text-2xl font-bold text-white mb-4">Explore More Iftar Options</h2>
            <p className="text-gray-400 mb-6">
              Looking to splurge? Check out our luxury iftar guide for special occasions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/guides/ramadan/iftar-luxury" className="px-6 py-3 bg-emerald-500 text-black rounded-lg font-medium hover:bg-emerald-400 transition-colors">
                Luxury Iftars
              </Link>
              <Link href="/guides/ramadan/best-iftars" className="px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors">
                All Iftars Guide
              </Link>
              <Link href="/guides/ramadan/deals" className="px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors">
                Ramadan Deals
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
            { href: '/guides/ramadan/tents', title: 'Ramadan Tents' },
            { href: '/guides/ramadan/ghabga', title: 'Ghabga Guide' },
            { href: '/guides/buffets', title: 'Best Buffets' },
            { href: '/guides/street-food', title: 'Street Food' },
          ]}
        />
      </main>
    </>
  );
}
