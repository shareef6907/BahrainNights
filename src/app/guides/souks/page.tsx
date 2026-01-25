import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Store, Clock, MapPin, Star,
  Gem, ShoppingBag, Coffee, Camera
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Traditional Souks in Bahrain 2025 | Gold Souq, Bab Al Bahrain Market',
  description: 'Explore traditional souks in Bahrain! Complete guide to Bab Al Bahrain, Gold Souq, Muharraq Souq, spice markets, and authentic Bahraini shopping.',
  keywords: 'souks Bahrain, Gold Souq Bahrain, Bab Al Bahrain, traditional market Bahrain, Muharraq Souq, spice market Bahrain, shopping Manama old town',
  openGraph: {
    title: 'Traditional Souks in Bahrain 2025 | Gold Souq, Bab Al Bahrain Market',
    description: 'Your guide to traditional markets and souks in Bahrain.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/souks',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/souks',
  },
};

const souks = [
  {
    name: 'Bab Al Bahrain Souq',
    location: 'Manama (behind Bab Al Bahrain)',
    type: 'Traditional Market Complex',
    rating: 5,
    description: 'The heart of Bahrain\'s traditional shopping. Sprawling network of narrow lanes filled with shops selling everything from textiles to electronics, spices to souvenirs.',
    sections: [
      { name: 'Main Souq', items: 'Textiles, clothing, souvenirs, housewares' },
      { name: 'Gold City', items: 'Gold & jewelry' },
      { name: 'Spice Section', items: 'Spices, herbs, dried fruits' },
      { name: 'Fabric Alley', items: 'Textiles, tailoring' },
    ],
    whatToBuy: ['Gold jewelry', 'Pearls', 'Textiles & fabric', 'Spices', 'Perfumes (oud/attar)', 'Traditional clothing', 'Souvenirs'],
    hours: 'Sat-Thu 9AM-12PM, 4PM-9PM',
    tips: 'Bargaining expected! Start at 50% of asking price. Morning is less crowded.',
    mustVisit: true,
  },
  {
    name: 'Gold City (Gold Souq)',
    location: 'Within Bab Al Bahrain Souq',
    type: 'Jewelry Market',
    rating: 5,
    description: 'Glittering lanes dedicated to gold, showcasing hundreds of shops with 18K, 21K, and 22K gold jewelry. Better prices than malls with room to negotiate.',
    sections: [
      { name: 'Main Gold Lane', items: 'Traditional & modern gold' },
      { name: 'Jewelry Shops', items: 'Diamonds & precious stones' },
      { name: 'Pearl Dealers', items: 'Bahraini pearls' },
    ],
    whatToBuy: ['Gold necklaces & chains', 'Bracelets & bangles', 'Traditional designs', 'Bahraini pearls', 'Custom pieces'],
    hours: 'Sat-Thu 9AM-12PM, 4PM-9PM',
    tips: 'Check daily gold price. Negotiate on making charges, not gold weight. Ask for certificates.',
    mustVisit: true,
  },
  {
    name: 'Muharraq Souq',
    location: 'Muharraq Island',
    type: 'Traditional Market',
    rating: 4,
    description: 'Authentic old-world souq in historic Muharraq. Less touristy than Manama, with traditional crafts, local shops, and the famous halwa (sweet) makers.',
    sections: [
      { name: 'Halwa Lane', items: 'Traditional Bahraini sweets' },
      { name: 'Local Shops', items: 'Daily goods, spices' },
      { name: 'Craft Shops', items: 'Traditional items' },
    ],
    whatToBuy: ['Bahraini halwa', 'Traditional crafts', 'Local spices', 'Dates', 'Authentic souvenirs'],
    hours: 'Sat-Thu 8AM-12PM, 4PM-8PM',
    tips: 'Try fresh halwa from traditional makers. Part of Pearling Path UNESCO area.',
    mustVisit: true,
  },
  {
    name: 'Qaisariya Souq',
    location: 'Near Bab Al Bahrain',
    type: 'Historic Market',
    rating: 4,
    description: 'Historic covered market with traditional architecture. Home to textile merchants, tailors, and traditional clothing shops.',
    sections: [
      { name: 'Textile Shops', items: 'Fabrics, materials' },
      { name: 'Tailor Lane', items: 'Custom clothing' },
      { name: 'Traditional Wear', items: 'Abayas, thobes' },
    ],
    whatToBuy: ['Custom-made clothing', 'Fabrics', 'Traditional abayas', 'Men\'s thobes'],
    hours: 'Sat-Thu 9AM-1PM, 4PM-9PM',
    tips: 'Great for custom tailoring. Bring designs for copying. Allow 3-7 days for orders.',
    mustVisit: false,
  },
  {
    name: 'Central Market (Manama Souq)',
    location: 'Behind Bab Al Bahrain',
    type: 'Fresh Produce Market',
    rating: 4,
    description: 'Vibrant fresh market selling fruits, vegetables, fish, and meat. Authentic local atmosphere and the best prices for fresh produce.',
    sections: [
      { name: 'Fruit & Veg Hall', items: 'Fresh produce' },
      { name: 'Fish Market', items: 'Fresh seafood' },
      { name: 'Meat Section', items: 'Butchers' },
    ],
    whatToBuy: ['Fresh dates', 'Local produce', 'Fresh fish', 'Dried fruits', 'Local honey'],
    hours: 'Daily 5AM-12PM (best early morning)',
    tips: 'Go early for best selection. Fish market is fascinating. Bring cash.',
    mustVisit: false,
  },
  {
    name: 'Friday Market (Juma\'a Market)',
    location: 'Various locations',
    type: 'Weekly Flea Market',
    rating: 4,
    description: 'Bustling flea market selling everything from antiques to plants, electronics to pets. Different locations on different days.',
    sections: [
      { name: 'Antiques', items: 'Old items, collectibles' },
      { name: 'Plants', items: 'Garden plants, flowers' },
      { name: 'General', items: 'Everything else' },
    ],
    whatToBuy: ['Antiques', 'Plants', 'Secondhand items', 'Curiosities'],
    hours: 'Friday mornings (6AM-12PM)',
    tips: 'Arrive early. Bring cash. Bargain hard. Great for treasure hunting.',
    mustVisit: false,
  },
];

const shoppingTips = [
  {
    title: 'Bargaining',
    content: 'Always bargain in souks! Start at 40-50% of asking price and work up. Be friendly but firm.',
  },
  {
    title: 'Cash is King',
    content: 'Many small shops only take cash. ATMs available at Bab Al Bahrain entrance.',
  },
  {
    title: 'Best Times',
    content: 'Mornings (9-11AM) are less crowded. Evening (5-8PM) has more atmosphere but bigger crowds.',
  },
  {
    title: 'Gold Buying',
    content: 'Know the daily gold rate. Negotiate on making charges only. Get receipts and certificates.',
  },
  {
    title: 'Dress Code',
    content: 'Dress modestly in souks. Cover shoulders and knees. Comfortable walking shoes essential.',
  },
  {
    title: 'Getting There',
    content: 'Taxi to Bab Al Bahrain. Parking available but challenging. Walking is best once there.',
  },
];

const whatToBuy = [
  { item: 'Gold Jewelry', where: 'Gold City', priceRange: 'BD 50-500+', tip: 'Negotiate making charges' },
  { item: 'Bahraini Pearls', where: 'Gold Souq, Muharraq', priceRange: 'BD 20-200+', tip: 'Ensure authenticity certificate' },
  { item: 'Oud & Perfume', where: 'Main Souq', priceRange: 'BD 5-50', tip: 'Test before buying' },
  { item: 'Spices', where: 'Spice section', priceRange: 'BD 1-10', tip: 'Buy whole, not ground' },
  { item: 'Bahraini Halwa', where: 'Muharraq Souq', priceRange: 'BD 2-15', tip: 'Buy fresh, many flavors' },
  { item: 'Textiles', where: 'Qaisariya', priceRange: 'BD 5-50/meter', tip: 'Great for custom tailoring' },
  { item: 'Traditional Clothing', where: 'Throughout', priceRange: 'BD 20-100', tip: 'Quality varies widely' },
  { item: 'Handicrafts', where: 'Main Souq', priceRange: 'BD 5-50', tip: 'Look for authentic Bahraini items' },
];

export default function SouksPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-yellow-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Souks', url: 'https://www.bahrainnights.com/guides/souks' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium mb-4">
              🏺 Traditional Shopping
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Traditional Souks
              </span>
              {' '}in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Lose yourself in the winding lanes of Bahrain's traditional markets — from 
              glittering gold souqs to aromatic spice stalls and authentic local crafts.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Traditional Souks', value: '6+', icon: Store },
              { label: 'Gold Shops', value: '100+', icon: Gem },
              { label: 'Price Advantage', value: '20-40%', icon: ShoppingBag },
              { label: 'Best Activity', value: 'Bargaining', icon: Coffee },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Souks List */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Traditional Markets</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Complete guide to Bahrain's souks and traditional markets.
          </p>
          
          <div className="space-y-6">
            {souks.map((souq) => (
              <div 
                key={souq.name}
                className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all ${
                  souq.mustVisit ? 'ring-2 ring-yellow-500/50' : ''
                }`}
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold">{souq.name}</h3>
                          {souq.mustVisit && (
                            <span className="text-xs bg-yellow-500 text-black px-2 py-0.5 rounded font-bold">MUST VISIT</span>
                          )}
                        </div>
                        <p className="text-yellow-400 text-sm flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {souq.location} • {souq.type}
                        </p>
                      </div>
                      <div className="flex">
                        {[...Array(souq.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{souq.description}</p>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
                      {souq.sections.map((section) => (
                        <div key={section.name} className="bg-black/20 rounded-lg p-2">
                          <p className="font-semibold text-yellow-400 text-sm">{section.name}</p>
                          <p className="text-xs text-gray-400">{section.items}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {souq.whatToBuy.map((item) => (
                        <span key={item} className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="lg:w-1/4 space-y-2 text-sm bg-black/20 rounded-xl p-4">
                    <p><strong className="text-gray-400">Hours:</strong> {souq.hours}</p>
                    <p className="text-yellow-400 italic pt-2">💡 {souq.tips}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Buy */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">What to Buy</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-yellow-500/20 text-left">
                  <th className="p-4 rounded-tl-lg">Item</th>
                  <th className="p-4">Where</th>
                  <th className="p-4">Price Range</th>
                  <th className="p-4 rounded-tr-lg">Tip</th>
                </tr>
              </thead>
              <tbody>
                {whatToBuy.map((item, i) => (
                  <tr key={item.item} className={i % 2 === 0 ? 'bg-white/5' : ''}>
                    <td className="p-4 font-medium text-yellow-400">{item.item}</td>
                    <td className="p-4 text-gray-300">{item.where}</td>
                    <td className="p-4 text-gray-300">{item.priceRange}</td>
                    <td className="p-4 text-gray-400 text-sm">{item.tip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Souq Shopping Tips</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {shoppingTips.map((tip) => (
              <div key={tip.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-yellow-400 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-300">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More Shopping</h2>
          <p className="text-gray-300 mb-8">
            Discover modern malls and other shopping destinations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/malls"
              className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition-colors"
            >
              Modern Malls
            </Link>
            <Link 
              href="/guides/things-to-do"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              Things to Do
            </Link>
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Best Malls', href: '/guides/malls', emoji: '🛍️' },
              { title: 'Historical Sites', href: '/guides/historical-sites', emoji: '🏰' },
              { title: 'Manama Guide', href: '/guides/manama', emoji: '🌆' },
              { title: 'Budget Bahrain', href: '/guides/budget', emoji: '💰' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group"
              >
                <span className="text-2xl mb-2 block">{guide.emoji}</span>
                <span className="font-medium group-hover:text-yellow-400 transition-colors">
                  {guide.title}
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
            {[
              {
                q: 'Where is the Gold Souq in Bahrain?',
                a: 'The Gold Souq (Gold City) is located within the Bab Al Bahrain Souq in central Manama. Enter through the Bab Al Bahrain gateway and follow signs to the gold section.',
              },
              {
                q: 'Is bargaining expected in Bahrain souks?',
                a: 'Yes! Bargaining is expected and part of the experience. Start at 40-50% of the asking price for non-gold items. For gold, negotiate making charges rather than gold weight.',
              },
              {
                q: 'What are souq opening hours in Bahrain?',
                a: 'Most souks open Saturday-Thursday 9AM-12PM and 4PM-9PM. They\'re closed or have limited hours on Fridays. The Central Market opens at 5AM.',
              },
              {
                q: 'Is Bahrain gold cheaper than other countries?',
                a: 'Bahrain gold is competitively priced with lower making charges than many places. The absence of VAT (0%) makes it good value. Always compare with current gold rates.',
              },
            ].map((faq, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6">
                <h3 className="font-bold mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
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
            headline: 'Traditional Souks in Bahrain 2025 | Gold Souq, Bab Al Bahrain Market',
            description: 'Complete guide to traditional souks in Bahrain including Gold Souq, Bab Al Bahrain, and Muharraq markets.',
            author: {
              '@type': 'Organization',
              name: 'BahrainNights',
              url: 'https://bahrainnights.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'BahrainNights',
            },
            datePublished: '2025-01-26',
            dateModified: lastUpdated,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://bahrainnights.com/guides/souks',
            },
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
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Where is the Gold Souq in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The Gold Souq (Gold City) is located within the Bab Al Bahrain Souq in central Manama.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is bargaining expected in Bahrain souks?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! Bargaining is expected. Start at 40-50% of asking price for non-gold items.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is Bahrain gold cheaper than other countries?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Bahrain gold is competitively priced with lower making charges and 0% VAT.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
