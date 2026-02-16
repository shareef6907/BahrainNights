import { Metadata } from 'next';

// Static page with ISR - revalidate every hour
export const revalidate = 3600;
import Link from 'next/link';
import { 
  Moon, Clock, MapPin, ShoppingBag, Store, 
  Utensils, AlertCircle, ExternalLink, Phone
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import InternalLinks from '@/components/SEO/InternalLinks';

export const metadata: Metadata = {
  title: 'Ramadan Mall Hours Bahrain 2026 | Shopping Mall Timings During Ramadan',
  description: 'Complete guide to mall hours during Ramadan in Bahrain 2026. Find extended shopping hours for City Centre, Seef Mall, The Avenues, Moda Mall and all major malls.',
  keywords: 'Ramadan mall hours Bahrain, mall timings Ramadan Bahrain, City Centre Ramadan hours, Seef Mall Ramadan timing, Bahrain malls Ramadan 2026, shopping during Ramadan Bahrain',
  openGraph: {
    title: 'Ramadan Mall Hours Bahrain 2026 | Shopping Mall Timings During Ramadan',
    description: 'Find extended mall hours during Ramadan in Bahrain - all major malls with food court and iftar information.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/ramadan/mall-hours',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/ramadan/mall-hours',
  },
};

const megaMalls = [
  {
    name: 'City Centre Bahrain',
    location: 'Seef District',
    normalHours: 'Sat-Wed 10AM-10PM, Thu-Fri 10AM-12AM',
    ramadanNote: 'Typically extends to 1AM-2AM during Ramadan. Food court opens after iftar.',
    features: ['Wahooo! Waterpark', 'Cineco Cinema', 'Food Court (60+ restaurants)', 'Carrefour Hypermarket'],
    foodCourt: 'Large food court with 60+ restaurants - all open after iftar time.',
    website: 'https://www.citycentrebahrain.com',
    phone: '+973 1717 8999',
    href: '/guides/malls/city-centre-bahrain',
  },
  {
    name: 'Seef Mall',
    location: 'Seef District (+ Muharraq & Isa Town)',
    normalHours: 'Sat-Wed 10AM-10PM, Thu-Fri 10AM-12AM',
    ramadanNote: 'Extended hours typically until 1AM. Multiple locations across Bahrain.',
    features: ['Magic Island', 'Cinema', 'Family Entertainment', 'Wide variety of stores'],
    foodCourt: 'Food court with diverse options - restaurants serve after iftar.',
    website: 'https://www.seefmall.com',
    phone: '+973 1758 1111',
    href: '/guides/malls/seef-mall',
  },
  {
    name: 'The Avenues Bahrain',
    location: 'Bahrain Bay',
    normalHours: 'Sat-Wed 10AM-10PM, Thu-Fri 10AM-12AM',
    ramadanNote: 'Usually extends hours during Ramadan. Waterfront restaurants popular for iftar.',
    features: ['Bahrain Bay Waterfront', 'Below Zero Ice Rink', 'VOX Cinemas', 'Premium Dining'],
    foodCourt: 'Waterfront restaurants and cafés - perfect for iftar with a view.',
    website: 'https://www.theavenuesbahrain.com',
    phone: '+973 7755 5555',
    href: '/guides/malls/the-avenues',
  },
  {
    name: 'Marassi Galleria',
    location: 'Diyar Al Muharraq',
    normalHours: 'Sat-Wed 10AM-10PM, Thu-Fri 10AM-12AM',
    ramadanNote: 'Extended Ramadan hours. Beachfront location popular for evening shopping.',
    features: ['Marassi Aquarium', 'Beachfront Location', 'VOX Cinemas', 'Luxury Brands'],
    foodCourt: 'Premium dining options available - many offer Ramadan iftar menus.',
    website: 'https://www.marrassigalleria.com',
    phone: '+973 1600 0707',
    href: '/guides/malls/marassi-galleria',
  },
];

const premiumMalls = [
  {
    name: 'Moda Mall',
    location: 'Bahrain World Trade Centre',
    normalHours: 'Sat-Wed 10AM-10PM, Thu-Fri 10AM-11PM',
    ramadanNote: 'Extended hours during Ramadan. Located in the iconic BWTC.',
    features: ['Luxury Brands', 'Designer Fashion', 'Fine Jewelry', 'BWTC Location'],
    foodCourt: 'Upscale dining options including fine restaurants.',
    website: 'https://www.modamallbh.com',
    phone: '+973 1721 0210',
    href: '/guides/malls/moda-mall',
  },
  {
    name: 'Al Aali Shopping Complex',
    location: 'Seef District',
    normalHours: 'Sat-Wed 10AM-10PM, Thu-Fri 10AM-11PM',
    ramadanNote: 'Typically extends hours during Ramadan for evening shoppers.',
    features: ['Premium Brands', 'Family Shopping', 'Restaurants', 'Convenient Location'],
    foodCourt: 'Mix of casual and fine dining restaurants.',
    phone: '+973 1758 8338',
  },
];

const communityMalls = [
  {
    name: 'Bahrain Mall',
    location: 'Sanabis',
    normalHours: 'Sat-Wed 9AM-10PM, Thu-Fri 9AM-11PM',
    ramadanNote: 'Extended evening hours during Ramadan. Popular with families.',
    features: ['LuLu Hypermarket', 'Fun Factory', 'Family-Friendly', 'Value Shopping'],
    foodCourt: 'Food court and restaurants open after iftar.',
    phone: '+973 1755 1700',
    href: '/guides/malls/bahrain-mall',
  },
  {
    name: 'Enma Mall',
    location: 'Riffa',
    normalHours: 'Sat-Wed 9AM-10PM, Thu-Fri 9AM-11PM',
    ramadanNote: 'Extended hours during Ramadan to accommodate evening shoppers.',
    features: ['LuLu Hypermarket', 'Family Entertainment', 'Value Stores', 'Riffa Location'],
    foodCourt: 'Food court with variety of options - opens after iftar.',
    phone: '+973 1776 0000',
    href: '/guides/malls/enma-mall',
  },
  {
    name: 'Oasis Mall',
    location: 'Juffair',
    normalHours: 'Sat-Wed 9AM-10PM, Thu-Fri 9AM-11PM',
    ramadanNote: 'Extended hours during Ramadan. Popular in Juffair area.',
    features: ['LuLu Hypermarket', 'Entertainment Zone', 'Diverse Stores', 'Juffair Location'],
    foodCourt: 'Food court and restaurants available after iftar.',
    phone: '+973 1772 5000',
    href: '/guides/malls/oasis-mall',
  },
  {
    name: 'Dragon City',
    location: 'Diyar Al Muharraq',
    normalHours: 'Sat-Thu 10AM-10PM, Fri 2PM-10PM',
    ramadanNote: 'Hours may vary during Ramadan - check directly.',
    features: ['Wholesale Prices', 'Home Goods', 'Fashion', 'Electronics'],
    foodCourt: 'Limited dining options on-site.',
    phone: '+973 1600 1144',
    href: '/guides/malls/dragon-city',
  },
];

const faqs = [
  {
    q: 'Do Bahrain malls have different hours during Ramadan?',
    a: 'Yes! Most malls in Bahrain extend their operating hours during Ramadan to accommodate the changed daily rhythm. Malls typically open later (around 10 AM or noon) but stay open much later - often until 1 AM or 2 AM. This allows shoppers to enjoy evening shopping after iftar and through the night.',
  },
  {
    q: 'What time do mall food courts open during Ramadan in Bahrain?',
    a: 'Mall food courts follow the same rules as standalone restaurants - they cannot serve food publicly during fasting hours. Food courts typically open at iftar time (Maghrib prayer, around 6 PM in March). Some may have limited seating before iftar for non-fasting visitors.',
  },
  {
    q: 'Are all mall stores open during Ramadan fasting hours?',
    a: 'Yes, retail stores in malls operate throughout the day during Ramadan. Only restaurants and food outlets close during fasting hours. You can shop for clothes, electronics, home goods, and more at any time the mall is open.',
  },
  {
    q: 'Which Bahrain mall is best for iftar shopping?',
    a: 'City Centre Bahrain and Seef Mall are popular choices as they have the largest selection of restaurants and extended hours. The Avenues Bahrain is excellent for a scenic iftar with bay views, while Marassi Galleria offers premium beachfront dining options.',
  },
  {
    q: 'Do malls have special Ramadan promotions?',
    a: 'Yes! Many Bahrain malls offer special Ramadan promotions including discounts, extended loyalty rewards, and special events. Check individual mall websites and social media for current offers. Many retailers also have Ramadan sales throughout the month.',
  },
  {
    q: 'Can I break my fast at mall restaurants in Bahrain?',
    a: 'Absolutely! Mall restaurants are popular iftar spots. Many offer special Ramadan menus and iftar buffets. Reservations are recommended for popular restaurants, especially on weekends. Food courts offer more casual, walk-in friendly options.',
  },
];

export default function MallHoursPage() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://www.bahrainnights.com' },
    { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
    { name: 'Ramadan', url: 'https://www.bahrainnights.com/guides/ramadan' },
    { name: 'Mall Hours', url: 'https://www.bahrainnights.com/guides/ramadan/mall-hours' },
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
            headline: 'Ramadan Mall Hours Bahrain 2026 | Shopping Mall Timings During Ramadan',
            description: 'Complete guide to mall hours during Ramadan in Bahrain 2026.',
            author: { '@type': 'Organization', name: 'Bahrain Nights' },
            publisher: { '@type': 'Organization', name: 'Bahrain Nights' },
            datePublished: '2026-02-01',
            dateModified: '2026-02-16',
            mainEntityOfPage: 'https://www.bahrainnights.com/guides/ramadan/mall-hours',
          }),
        }}
      />

      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-cyan-500/10" />
          <div className="max-w-4xl mx-auto text-center relative">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Moon className="w-8 h-8 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Ramadan 2026</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Mall Hours During{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500">
                Ramadan
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Complete guide to shopping mall hours in Bahrain during Ramadan 2026. 
              Most malls extend their hours for late-night shopping after iftar.
            </p>
          </div>
        </section>

        {/* Important Notice */}
        <section className="py-6 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-amber-500/10 rounded-2xl p-6 border border-amber-500/30">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-lg font-bold text-white mb-2">Important: Verify Before You Go</h2>
                  <p className="text-gray-300">
                    Mall hours during Ramadan can vary and may change throughout the month. The hours listed here are 
                    <strong className="text-amber-400"> typical patterns</strong> - always verify current hours with the mall directly 
                    via their website, social media, or phone before visiting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ramadan Shopping Info */}
        <section className="py-8 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Clock className="w-6 h-6 text-teal-400" />
              What to Expect During Ramadan
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-900/50 rounded-xl p-5 border border-teal-500/20">
                <h3 className="text-lg font-semibold text-white mb-3">Extended Evening Hours</h3>
                <p className="text-gray-300 text-sm">
                  Most malls in Bahrain extend their hours during Ramadan, typically staying open until 
                  1 AM - 2 AM. This accommodates the shift in daily routines during the holy month.
                </p>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-5 border border-teal-500/20">
                <h3 className="text-lg font-semibold text-white mb-3">Food Court Timings</h3>
                <p className="text-gray-300 text-sm">
                  Restaurant and food court dining areas don&apos;t serve during fasting hours. 
                  They open at iftar time (Maghrib prayer) and stay open until mall closing.
                </p>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-5 border border-teal-500/20">
                <h3 className="text-lg font-semibold text-white mb-3">Best Shopping Times</h3>
                <p className="text-gray-300 text-sm">
                  Malls are quietest in the morning and afternoon. Evening hours (8 PM - midnight) 
                  are the busiest as families come out after iftar for shopping and entertainment.
                </p>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-5 border border-teal-500/20">
                <h3 className="text-lg font-semibold text-white mb-3">Ramadan Sales</h3>
                <p className="text-gray-300 text-sm">
                  Many retailers offer special Ramadan promotions and discounts. Look for 
                  special offers on fashion, home goods, and electronics throughout the month.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4">
            <a href="#mega" className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-full hover:bg-emerald-500/30 transition-colors">
              Mega Malls
            </a>
            <a href="#premium" className="px-4 py-2 bg-teal-500/20 text-teal-400 rounded-full hover:bg-teal-500/30 transition-colors">
              Premium Malls
            </a>
            <a href="#community" className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-full hover:bg-cyan-500/30 transition-colors">
              Community Malls
            </a>
            <a href="#tips" className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full hover:bg-blue-500/30 transition-colors">
              Shopping Tips
            </a>
          </div>
        </section>

        {/* Mega Malls */}
        <section id="mega" className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <ShoppingBag className="w-8 h-8 text-emerald-400" />
              Major Shopping Malls
            </h2>
            <p className="text-gray-400 mb-8">Bahrain&apos;s largest malls with the most stores, restaurants, and entertainment.</p>
            
            <div className="space-y-6">
              {megaMalls.map((mall, index) => (
                <div key={index} className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-emerald-500/30 transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{mall.name}</h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" /> {mall.location}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {mall.phone && (
                        <a href={`tel:${mall.phone}`} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 text-white rounded-lg text-sm hover:bg-white/20 transition-colors">
                          <Phone className="w-4 h-4" /> Call
                        </a>
                      )}
                      {mall.website && (
                        <a href={mall.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 text-white rounded-lg text-sm hover:bg-emerald-400 transition-colors">
                          <ExternalLink className="w-4 h-4" /> Website
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-slate-900/50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">Normal Hours</p>
                      <p className="text-gray-300 text-sm">{mall.normalHours}</p>
                    </div>
                    <div className="bg-emerald-500/10 rounded-lg p-3 border border-emerald-500/20">
                      <p className="text-xs text-emerald-400 mb-1">Ramadan Hours</p>
                      <p className="text-gray-300 text-sm">{mall.ramadanNote}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {mall.features.map((feature, i) => (
                      <span key={i} className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-sm">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-start gap-2 text-sm text-gray-400">
                    <Utensils className="w-4 h-4 mt-0.5 text-emerald-400" />
                    <span>{mall.foodCourt}</span>
                  </div>

                  {mall.href && (
                    <Link href={mall.href} className="inline-flex items-center gap-1 mt-4 text-emerald-400 hover:text-emerald-300 text-sm">
                      View full mall guide <ExternalLink className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Premium Malls */}
        <section id="premium" className="py-16 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Store className="w-8 h-8 text-teal-400" />
              Premium Shopping Destinations
            </h2>
            <p className="text-gray-400 mb-8">Luxury and upscale shopping experiences.</p>
            
            <div className="space-y-6">
              {premiumMalls.map((mall, index) => (
                <div key={index} className="bg-slate-900/50 rounded-2xl p-6 border border-white/10 hover:border-teal-500/30 transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{mall.name}</h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" /> {mall.location}
                        </span>
                      </div>
                    </div>
                    {mall.phone && (
                      <a href={`tel:${mall.phone}`} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 text-white rounded-lg text-sm hover:bg-white/20 transition-colors">
                        <Phone className="w-4 h-4" /> Call
                      </a>
                    )}
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">Normal Hours</p>
                      <p className="text-gray-300 text-sm">{mall.normalHours}</p>
                    </div>
                    <div className="bg-teal-500/10 rounded-lg p-3 border border-teal-500/20">
                      <p className="text-xs text-teal-400 mb-1">Ramadan Hours</p>
                      <p className="text-gray-300 text-sm">{mall.ramadanNote}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {mall.features.map((feature, i) => (
                      <span key={i} className="px-3 py-1 bg-teal-500/10 text-teal-400 rounded-full text-sm">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-start gap-2 text-sm text-gray-400">
                    <Utensils className="w-4 h-4 mt-0.5 text-teal-400" />
                    <span>{mall.foodCourt}</span>
                  </div>

                  {mall.href && (
                    <Link href={mall.href} className="inline-flex items-center gap-1 mt-4 text-teal-400 hover:text-teal-300 text-sm">
                      View full mall guide <ExternalLink className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Community Malls */}
        <section id="community" className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <ShoppingBag className="w-8 h-8 text-cyan-400" />
              Community & Value Malls
            </h2>
            <p className="text-gray-400 mb-8">Neighborhood malls with hypermarkets and family-friendly shopping.</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {communityMalls.map((mall, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-cyan-500/30 transition-colors">
                  <h3 className="text-lg font-bold text-white mb-2">{mall.name}</h3>
                  <p className="text-sm text-gray-400 flex items-center gap-1 mb-3">
                    <MapPin className="w-4 h-4" /> {mall.location}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="bg-slate-900/50 rounded p-2">
                      <p className="text-xs text-gray-500">Normal: {mall.normalHours}</p>
                    </div>
                    <div className="bg-cyan-500/10 rounded p-2 border border-cyan-500/20">
                      <p className="text-xs text-cyan-400">{mall.ramadanNote}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {mall.features.map((feature, i) => (
                      <span key={i} className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded text-xs">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-gray-500">{mall.foodCourt}</p>

                  {mall.href && (
                    <Link href={mall.href} className="inline-flex items-center gap-1 mt-3 text-cyan-400 hover:text-cyan-300 text-xs">
                      View guide <ExternalLink className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Shopping Tips */}
        <section id="tips" className="py-16 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Clock className="w-8 h-8 text-blue-400" />
              Ramadan Shopping Tips
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-900/50 rounded-xl p-6 border border-blue-500/20">
                <h3 className="text-lg font-semibold text-white mb-3">Best Times to Shop</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Morning/early afternoon: Quietest, best for focused shopping</li>
                  <li>• Just before iftar: Malls empty as people go to break fast</li>
                  <li>• 9 PM - 11 PM: Peak family time, busiest hours</li>
                  <li>• After midnight: Less crowded, good for late-night shopping</li>
                </ul>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-6 border border-blue-500/20">
                <h3 className="text-lg font-semibold text-white mb-3">Food Court Tips</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Food courts open at iftar (Maghrib prayer time)</li>
                  <li>• Arrive early for best seating during iftar rush</li>
                  <li>• Many restaurants offer special Ramadan menus</li>
                  <li>• Reservations recommended for sit-down restaurants</li>
                </ul>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-6 border border-blue-500/20">
                <h3 className="text-lg font-semibold text-white mb-3">Ramadan Sales</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Many stores offer Ramadan discounts</li>
                  <li>• Check mall social media for special promotions</li>
                  <li>• Fashion and home goods often heavily discounted</li>
                  <li>• End of Ramadan (pre-Eid) has excellent deals</li>
                </ul>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-6 border border-blue-500/20">
                <h3 className="text-lg font-semibold text-white mb-3">Practical Tips</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Always verify hours before visiting</li>
                  <li>• Parking is easier during daytime hours</li>
                  <li>• Dress modestly out of respect</li>
                  <li>• Entertainment venues may have modified hours</li>
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
            <h2 className="text-2xl font-bold text-white mb-4">Looking for Iftar or Ghabga?</h2>
            <p className="text-gray-400 mb-6">
              Explore our complete Ramadan dining guides for the best places to break your fast.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/guides/ramadan/best-iftars" className="px-6 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-400 transition-colors">
                Best Iftars Guide
              </Link>
              <Link href="/guides/malls" className="px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors">
                Complete Malls Guide
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
            { href: '/guides/ramadan/ghabga', title: 'Ghabga Venues' },
            { href: '/guides/malls', title: 'All Malls Guide' },
            { href: '/guides/ramadan/suhoor', title: 'Suhoor Spots' },
            { href: '/places', title: 'Discover Restaurants' },
          ]}
        />
      </main>
    </>
  );
}
