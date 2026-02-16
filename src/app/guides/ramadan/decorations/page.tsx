import { Metadata } from 'next';

// Static page with ISR - revalidate every hour
export const revalidate = 3600;
import Link from 'next/link';
import { 
  Moon, MapPin, ShoppingBag, Star, 
  Sparkles, Home, DollarSign, Store
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import InternalLinks from '@/components/SEO/InternalLinks';

export const metadata: Metadata = {
  title: 'Where to Buy Ramadan Decorations in Bahrain 2026 | Shopping Guide',
  description: 'Find the best places to buy Ramadan decorations in Bahrain. From Dragon City to traditional souqs, discover where to find lanterns, lights, crescents, and festive décor.',
  keywords: 'Ramadan decorations Bahrain, where to buy Ramadan decorations, Ramadan lanterns Bahrain, fanoos Bahrain, Ramadan lights Bahrain, Dragon City Ramadan',
  openGraph: {
    title: 'Where to Buy Ramadan Decorations in Bahrain 2026',
    description: 'Complete guide to shopping for Ramadan decorations in Bahrain - lanterns, lights, and festive décor.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/ramadan/decorations',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/ramadan/decorations',
  },
};

const shoppingLocations = [
  {
    name: 'Dragon City',
    location: 'Diyar Al Muharraq',
    description: 'The best value destination for Ramadan decorations. Dragon City offers an enormous selection of lanterns, lights, banners, and décor at wholesale prices. The sheer variety is unmatched — you\'ll find everything from traditional fanoos to modern LED displays.',
    priceRange: 'BD 0.5-20',
    rating: 5,
    highlights: ['Largest selection', 'Best prices', 'Bulk buying', 'LED lights', 'Traditional & modern styles'],
    tips: 'Shop early in the season for best selection. Weekdays are less crowded. Bring cash for better bargaining.',
  },
  {
    name: 'Bab Al Bahrain Souq',
    location: 'Manama',
    description: 'The traditional souq comes alive with Ramadan decorations before the holy month. Find authentic lanterns, fabric bunting, and traditional items alongside modern décor. The atmosphere itself is part of the experience.',
    priceRange: 'BD 1-30',
    rating: 4,
    highlights: ['Traditional items', 'Authentic atmosphere', 'Bargaining expected', 'Central location'],
    tips: 'Bargain politely — starting at 30-40% below asking price is normal. Visit in the late afternoon for a cooler experience.',
  },
  {
    name: 'Muharraq Souq',
    location: 'Muharraq',
    description: 'Another traditional market with Ramadan decorations and a more local feel. Smaller than Bab Al Bahrain but often has unique items and less tourist-focused pricing.',
    priceRange: 'BD 1-25',
    rating: 4,
    highlights: ['Local atmosphere', 'Unique finds', 'Less crowded', 'Traditional feel'],
    tips: 'Combine with a walk through historic Muharraq for a cultural afternoon.',
  },
  {
    name: 'City Centre Bahrain',
    location: 'Seef',
    description: 'Several stores within the mall stock Ramadan decorations including Home Centre, Pottery Barn, and seasonal pop-up shops. Higher prices but convenient one-stop shopping with quality options.',
    priceRange: 'BD 5-100+',
    rating: 3,
    highlights: ['Quality items', 'One-stop shopping', 'Air-conditioned', 'Premium brands'],
    tips: 'Look for seasonal sections near store entrances. Home Centre has good mid-range options.',
  },
  {
    name: 'Seef Mall',
    location: 'Seef',
    description: 'Home Box and other home stores carry Ramadan collections. The mall often has Ramadan-themed installations that can inspire your own decorating.',
    priceRange: 'BD 3-80',
    rating: 3,
    highlights: ['Home Box selection', 'Mall atmosphere', 'Convenient parking', 'Extended hours'],
    tips: 'Home Box typically has the best selection in the mall for home décor.',
  },
  {
    name: 'IKEA',
    location: 'Salmabad',
    description: 'While not Ramadan-specific, IKEA\'s string lights, lanterns, and neutral decorative items work beautifully for Ramadan décor. Great for modern, minimalist aesthetics.',
    priceRange: 'BD 2-50',
    rating: 3,
    highlights: ['Modern style', 'Quality lights', 'Neutral pieces', 'DIY potential'],
    tips: 'Combine IKEA basics with traditional pieces from souqs for a unique look.',
  },
];

const decorationTypes = [
  {
    name: 'Fanoos (Lanterns)',
    description: 'The iconic Ramadan lantern is the centerpiece of most decorations. Available in traditional metal designs with colored glass, or modern LED versions.',
    varieties: ['Traditional metal & glass', 'LED battery-powered', 'Paper lanterns', 'Giant outdoor lanterns', 'Tabletop miniatures'],
    icon: Moon,
  },
  {
    name: 'String Lights',
    description: 'Crescent and star-shaped LED lights, fairy lights, and decorative string lights to illuminate homes and outdoor spaces.',
    varieties: ['Crescent moon lights', 'Star-shaped LEDs', 'Fairy light curtains', 'Solar-powered outdoor', 'Color-changing RGB'],
    icon: Sparkles,
  },
  {
    name: 'Banners & Bunting',
    description: 'Fabric or paper banners with "Ramadan Kareem" and "Ramadan Mubarak" messages, along with crescent and star bunting.',
    varieties: ['Fabric banners', 'Paper bunting', 'Felt letter garlands', 'Wooden signs', 'Door hangers'],
    icon: Star,
  },
  {
    name: 'Table Decorations',
    description: 'Items for the iftar table including decorative trays, date bowls, candle holders, and table runners.',
    varieties: ['Date serving sets', 'Decorative trays', 'Candle holders', 'Table runners', 'Place card holders'],
    icon: Home,
  },
  {
    name: 'Outdoor Decorations',
    description: 'Large-scale decorations for gardens, balconies, and building exteriors including large lanterns and light-up figures.',
    varieties: ['Giant lanterns', 'Crescent moon displays', 'Light-up stars', 'Solar garden stakes', 'Window silhouettes'],
    icon: Store,
  },
];

const budgetGuide = [
  {
    budget: 'Under BD 20',
    description: 'Basic but festive setup',
    items: ['String of LED lights', 'Small paper lanterns (2-3)', 'Simple banner', 'LED tea lights'],
    where: 'Dragon City, souqs',
  },
  {
    budget: 'BD 20-50',
    description: 'Good selection for most homes',
    items: ['Medium metal lanterns (2-3)', 'Quality string lights', 'Fabric banner set', 'Table centerpiece', 'Window decorations'],
    where: 'Dragon City, Home Box, souqs',
  },
  {
    budget: 'BD 50-100',
    description: 'Comprehensive decoration',
    items: ['Statement lanterns', 'Multiple light sets', 'Premium banners', 'Table setting items', 'Outdoor decorations'],
    where: 'Mix of mall stores and Dragon City',
  },
  {
    budget: 'BD 100+',
    description: 'Premium & designer pieces',
    items: ['Designer lanterns', 'Custom lighting', 'Premium tableware', 'Large outdoor displays', 'Coordinated theme'],
    where: 'Pottery Barn, premium stores, IKEA',
  },
];

const faqs = [
  {
    q: 'When should I buy Ramadan decorations?',
    a: 'Decorations appear in stores 2-4 weeks before Ramadan. For the best selection, shop early. Dragon City and souqs start stocking up first, while mall stores follow. By the second week of Ramadan, selection is limited.',
  },
  {
    q: 'Is Dragon City the cheapest place for Ramadan decorations?',
    a: 'Yes, Dragon City typically offers the lowest prices and widest selection. However, quality can vary, so inspect items before buying. Souqs may be competitive for traditional items, while mall stores offer higher quality at higher prices.',
  },
  {
    q: 'Can I bargain at Dragon City?',
    a: 'Yes, bargaining is expected at Dragon City, especially for multiple items. Prices aren\'t usually fixed — politely ask for a better price or bundle discounts. Cash payments may get better rates.',
  },
  {
    q: 'What are the most popular Ramadan decoration colors?',
    a: 'Traditional colors are gold, purple, and deep blue. Green and white are also popular. Modern décor often uses metallics (gold, rose gold, silver) with navy or burgundy accents. Whatever matches your home works!',
  },
];

export default function RamadanDecorationsPage() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://www.bahrainnights.com' },
    { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
    { name: 'Ramadan', url: 'https://www.bahrainnights.com/guides/ramadan' },
    { name: 'Decorations', url: 'https://www.bahrainnights.com/guides/ramadan/decorations' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Where to Buy Ramadan Decorations in Bahrain 2026',
            description: 'Shopping guide for Ramadan decorations in Bahrain.',
            author: { '@type': 'Organization', name: 'Bahrain Nights' },
            publisher: { '@type': 'Organization', name: 'Bahrain Nights' },
            datePublished: '2026-02-01',
            dateModified: '2026-02-16',
            mainEntityOfPage: 'https://www.bahrainnights.com/guides/ramadan/decorations',
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
            mainEntity: faqs.map(faq => ({
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

      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-purple-500/5 to-rose-500/10" />
          <div className="max-w-4xl mx-auto text-center relative">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-8 h-8 text-amber-400" />
              <span className="text-amber-400 font-semibold">Shopping Guide</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ramadan Decorations in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-purple-500 to-rose-400">
                Bahrain
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Where to find lanterns, lights, banners, and everything you need to create 
              a festive Ramadan atmosphere at home.
            </p>
          </div>
        </section>

        {/* Shopping Locations */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <ShoppingBag className="w-8 h-8 text-amber-400" />
              Where to Shop
            </h2>
            <p className="text-gray-400 mb-8">The best places to find Ramadan decorations in Bahrain.</p>
            
            <div className="space-y-6">
              {shoppingLocations.map((location, index) => (
                <div key={index} className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-amber-500/30 transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{location.name}</h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" /> {location.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" /> {location.priceRange}
                        </span>
                        <span className="flex items-center gap-1 text-amber-400">
                          {[...Array(location.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">{location.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {location.highlights.map((h, i) => (
                      <span key={i} className="px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full text-sm">
                        {h}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 italic">💡 {location.tips}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Decoration Types */}
        <section className="py-16 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Moon className="w-8 h-8 text-purple-400" />
              Types of Decorations
            </h2>
            <p className="text-gray-400 mb-8">What to look for when shopping for Ramadan décor.</p>
            
            <div className="space-y-6">
              {decorationTypes.map((type, index) => (
                <div key={index} className="bg-slate-900/50 rounded-xl p-6 border border-white/10 hover:border-purple-500/30 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-500/20 rounded-xl">
                      <type.icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2">{type.name}</h3>
                      <p className="text-gray-300 mb-3">{type.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {type.varieties.map((v, i) => (
                          <span key={i} className="px-2 py-1 bg-purple-500/10 text-purple-400 rounded text-xs">
                            {v}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Budget Guide */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-green-400" />
              Budget Guide
            </h2>
            <p className="text-gray-400 mb-8">What you can expect to buy at different price points.</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {budgetGuide.map((tier, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-green-500/30 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-white">{tier.budget}</h3>
                    <span className="text-green-400 text-sm">{tier.description}</span>
                  </div>
                  <ul className="space-y-1 mb-4">
                    {tier.items.map((item, i) => (
                      <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                        <span className="text-green-400">•</span> {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-gray-500">Shop at: {tier.where}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-slate-900/50 rounded-xl p-6 border border-white/10">
                  <h3 className="font-bold text-white mb-2">{faq.q}</h3>
                  <p className="text-gray-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Explore More Ramadan Guides</h2>
            <p className="text-gray-400 mb-6">
              Everything you need to know for the perfect Ramadan in Bahrain.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/guides/ramadan" className="px-6 py-3 bg-amber-500 text-black rounded-lg font-medium hover:bg-amber-400 transition-colors">
                Complete Ramadan Guide
              </Link>
              <Link href="/guides/ramadan/best-iftars" className="px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors">
                Best Iftars
              </Link>
              <Link href="/guides/malls/dragon-city" className="px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors">
                Dragon City Guide
              </Link>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <InternalLinks
          title="Related Guides"
          links={[
            { href: '/guides/ramadan', title: 'Ramadan Guide' },
            { href: '/guides/malls/dragon-city', title: 'Dragon City' },
            { href: '/guides/souks', title: 'Souks Guide' },
            { href: '/guides/malls', title: 'Malls Guide' },
            { href: '/guides/shopping-bahrain', title: 'Shopping Guide' },
            { href: '/guides/eid-al-fitr', title: 'Eid Al Fitr' },
          ]}
        />
      </main>
    </>
  );
}
