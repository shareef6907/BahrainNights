import { Metadata } from 'next';
import Link from 'next/link';
import { 
  ShoppingBag, Store, MapPin, Clock, Star,
  Gem, Tag, CreditCard, Gift
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Shopping in Bahrain 2026 | Best Malls, Souks & Boutiques Guide',
  description: 'Complete shopping guide to Bahrain — discover the best malls, traditional souks, luxury boutiques, and local markets. Where to shop, what to buy, and insider tips.',
  keywords: 'shopping Bahrain, Bahrain malls, souks Bahrain, Manama Souq, City Centre Bahrain, luxury shopping Bahrain, gold souk Bahrain, shopping guide Bahrain',
  openGraph: {
    title: 'Shopping in Bahrain 2026 | Best Malls, Souks & Boutiques',
    description: 'Your complete guide to shopping in Bahrain — malls, souks, and local treasures.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/shopping-bahrain',
    images: [{ url: 'https://www.bahrainnights.com/images/shopping-bahrain.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shopping in Bahrain 2026 | Malls, Souks & Boutiques',
    description: 'Discover the best shopping destinations in Bahrain.',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/shopping-bahrain',
  },
};

const malls = [
  { name: 'City Centre Bahrain', location: 'Seef', description: 'Bahrain\'s largest mall with 350+ stores, Wahooo! Waterpark, 20-screen cinema, and Magic Planet', stores: '350+', highlights: 'Carrefour, H&M, Zara, luxury brands', parking: 'Free' },
  { name: 'The Avenues Bahrain', location: 'Bahrain Bay', description: 'Newest premium mall with waterfront dining, luxury stores, and stunning architecture', stores: '200+', highlights: 'High-end fashion, waterfront restaurants', parking: 'Free' },
  { name: 'Moda Mall', location: 'World Trade Center', description: 'Luxury shopping destination in the iconic WTC towers with designer boutiques', stores: '80+', highlights: 'Louis Vuitton, Gucci, Cartier', parking: 'Free' },
  { name: 'Seef Mall', location: 'Seef', description: 'Family-friendly mall with diverse retail, entertainment, and food court', stores: '200+', highlights: 'Department stores, kids entertainment', parking: 'Free' },
  { name: 'Bahrain Mall', location: 'Hoora', description: 'Original mega-mall with good mix of stores and entertainment options', stores: '150+', highlights: 'Funland, varied retail', parking: 'Free' },
  { name: 'Enma Mall', location: 'Riffa', description: 'Southern Bahrain\'s premier shopping destination with IKEA and family entertainment', stores: '100+', highlights: 'IKEA, Snow City', parking: 'Free' },
];

const souks = [
  { name: 'Manama Souq (Bab Al Bahrain)', location: 'Central Manama', description: 'Historic market dating back centuries — a maze of narrow alleys selling everything from textiles to electronics', mustBuy: 'Spices, fabrics, perfumes', tips: 'Bargain! Start at 50% of asking price', bestTime: 'Morning or evening' },
  { name: 'Gold Souq', location: 'Manama Souq area', description: 'Glittering gold shops with 18K, 21K, and 22K jewelry at competitive prices. Price based on daily gold rate plus making charges', mustBuy: '21K gold jewelry', tips: 'Compare prices, check purity certificate', bestTime: 'Afternoon' },
  { name: 'Muharraq Souq', location: 'Muharraq', description: 'Authentic traditional souq with fewer tourists, local crafts, and genuine Bahraini atmosphere', mustBuy: 'Traditional crafts, local snacks', tips: 'More authentic than Manama Souq', bestTime: 'Evening' },
  { name: 'Farmers Market', location: 'Budaiya Road (Fridays)', description: 'Weekly market with fresh produce, organic goods, homemade products, and artisan crafts', mustBuy: 'Local honey, dates, fresh produce', tips: 'Arrive early for best selection', bestTime: 'Friday morning 7am-12pm' },
];

const luxuryDestinations = [
  { name: 'Moda Mall', specialty: 'Designer Fashion', brands: 'Louis Vuitton, Gucci, Dior, Chanel, Cartier, Rolex', location: 'World Trade Center' },
  { name: 'City Centre Luxury', specialty: 'Premium Brands', brands: 'Harvey Nichols, Bloomingdale\'s, Coach, Michael Kors', location: 'City Centre Bahrain' },
  { name: 'The Avenues', specialty: 'Contemporary Luxury', brands: 'Balenciaga, Bottega Veneta, Saint Laurent, Fendi', location: 'Bahrain Bay' },
  { name: 'Four Seasons Retail', specialty: 'Boutique Shopping', brands: 'Exclusive boutiques, jewelry, art galleries', location: 'Four Seasons Hotel' },
];

const whatToBuy = [
  { item: 'Gold & Jewelry', description: 'Bahrain has competitive gold prices. 21K is most popular locally. Check daily rates and compare shops.', where: 'Gold Souq, Moda Mall' },
  { item: 'Pearls', description: 'Bahrain was famous for natural pearls. Buy from certified dealers. Ask for authenticity certificates.', where: 'Pearl shops in Manama Souq' },
  { item: 'Perfumes & Oud', description: 'Arabic perfumes and oud are signature gifts. From affordable attar to premium oud wood.', where: 'Souks, Arabian Oud stores' },
  { item: 'Spices & Dates', description: 'Saffron, cardamom, and premium dates make great gifts. Much cheaper than Western prices.', where: 'Manama Souq' },
  { item: 'Textiles', description: 'Indian and Middle Eastern fabrics, pashminas, and traditional garments at bargain prices.', where: 'Manama Souq' },
  { item: 'Electronics', description: 'Tax-free prices on electronics, though not always cheaper than home. Compare before buying.', where: 'Malls, electronics shops' },
];

const shoppingAreas = [
  { area: 'Seef District', description: 'Mall heaven with City Centre, Seef Mall, and surrounding retail. Best for modern shopping.', type: 'Malls & Modern Retail' },
  { area: 'Central Manama', description: 'Historic shopping with souks, gold market, and traditional stores. Best for authentic experience.', type: 'Traditional & Bargains' },
  { area: 'Bahrain Bay', description: 'Premium waterfront shopping at The Avenues with luxury brands and fine dining.', type: 'Luxury & Waterfront' },
  { area: 'Adliya', description: 'Bohemian neighborhood with boutiques, galleries, cafes, and unique independent stores.', type: 'Boutiques & Lifestyle' },
];

const shoppingTips = [
  { tip: 'Bargaining', detail: 'Expected in souks, not in malls. Start at 50-60% of asking price and negotiate up.' },
  { tip: 'Tax-Free', detail: 'Most items are tax-free. VAT (10%) applies to some goods but tourists can reclaim at airport.' },
  { tip: 'Gold Buying', detail: 'Price = gold weight × daily rate + making charge. Making charge is negotiable.' },
  { tip: 'Mall Hours', detail: 'Most malls: 10am-10pm weekdays, until midnight weekends. Souks: morning and evening best.' },
  { tip: 'Sales Seasons', detail: 'Major sales during Ramadan, Eid, and year-end. Summer Festival (July-August) has big discounts.' },
  { tip: 'Payment', detail: 'Cards accepted in malls. Souks prefer cash (BHD). ATMs widely available.' },
];

const faqs = [
  { q: 'What are the best shopping malls in Bahrain?', a: 'The best shopping malls in Bahrain are City Centre Bahrain (largest, 350+ stores), The Avenues Bahrain (newest, premium), Moda Mall (luxury brands), Seef Mall (family-friendly), and Enma Mall (Riffa, includes IKEA).' },
  { q: 'Where is the Gold Souq in Bahrain?', a: 'The Gold Souq is located in the heart of Manama Souq near Bab Al Bahrain. It features dozens of gold shops selling 18K, 21K, and 22K jewelry at competitive prices based on daily gold rates plus making charges.' },
  { q: 'What should I buy in Bahrain?', a: 'Popular purchases in Bahrain include gold and jewelry (competitive prices), natural pearls (Bahrain specialty), Arabic perfumes and oud, spices and dates, textiles, and tax-free electronics. The Gold Souq and Manama Souq are best for traditional items.' },
  { q: 'Can you bargain in Bahrain shops?', a: 'Bargaining is expected and accepted in traditional souks and markets. Start at 50-60% of the asking price. In malls and modern stores, prices are fixed except during sales periods.' },
  { q: 'What are the shopping mall hours in Bahrain?', a: 'Most malls open 10am-10pm on weekdays and extend until midnight on weekends (Thursday-Friday). During Ramadan and special occasions, hours may vary. Souks are best visited in mornings or evenings.' },
];

export default function ShoppingBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-amber-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Shopping', url: 'https://www.bahrainnights.com/guides/shopping-bahrain' },
      ]} />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-4">🛍️ Shopping Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Shopping in Bahrain</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
              From glittering malls to ancient souks — discover the best shopping destinations in Bahrain. Your complete guide to malls, markets, luxury boutiques, and hidden gems.
            </p>
            <p className="text-sm text-gray-500">Last updated: {lastUpdated}</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <Store className="w-6 h-6 text-amber-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-amber-400">15+</p>
              <p className="text-xs text-gray-400">Major Malls</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <ShoppingBag className="w-6 h-6 text-orange-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-orange-400">1000+</p>
              <p className="text-xs text-gray-400">Stores</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <Gem className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-yellow-400">50+</p>
              <p className="text-xs text-gray-400">Gold Shops</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <Tag className="w-6 h-6 text-red-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-red-400">0%</p>
              <p className="text-xs text-gray-400">Sales Tax</p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-8 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Bahrain offers a shopping experience that bridges ancient trading traditions with modern retail luxury. From the atmospheric narrow alleys of Manama Souq, where merchants have traded for centuries, to the air-conditioned comfort of mega-malls featuring international brands, the Kingdom caters to every shopping style and budget.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            Tax-free shopping, competitive gold prices, and the historic pearl trade heritage make Bahrain a destination for serious shoppers. Whether you&apos;re hunting for designer labels, bargaining for spices, or seeking the perfect piece of gold jewelry, this guide will help you navigate Bahrain&apos;s retail landscape.
          </p>
        </div>
      </section>

      {/* Major Malls */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center flex items-center justify-center gap-2">
            <Store className="w-8 h-8 text-amber-400" /> Major Shopping Malls
          </h2>
          <p className="text-center text-gray-400 mb-8 max-w-2xl mx-auto">
            Modern mega-malls with international brands, entertainment, and dining under one roof.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {malls.map((mall) => (
              <div key={mall.name} className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-amber-400">{mall.name}</h3>
                  <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-1 rounded">{mall.stores} stores</span>
                </div>
                <p className="text-xs text-gray-400 mb-2"><MapPin className="w-3 h-3 inline mr-1" />{mall.location}</p>
                <p className="text-gray-300 mb-4">{mall.description}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="text-orange-400"><Star className="w-4 h-4 inline mr-1" />{mall.highlights}</span>
                  <span className="text-emerald-400">{mall.parking} Parking</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Traditional Souks */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center flex items-center justify-center gap-2">
            <ShoppingBag className="w-8 h-8 text-orange-400" /> Traditional Souks & Markets
          </h2>
          <p className="text-center text-gray-400 mb-8 max-w-2xl mx-auto">
            Experience authentic Middle Eastern shopping in Bahrain&apos;s historic markets.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {souks.map((souk) => (
              <div key={souk.name} className="bg-gradient-to-br from-orange-500/10 to-amber-500/5 rounded-xl p-6">
                <h3 className="text-xl font-bold text-orange-400 mb-1">{souk.name}</h3>
                <p className="text-xs text-gray-400 mb-2"><MapPin className="w-3 h-3 inline mr-1" />{souk.location}</p>
                <p className="text-gray-300 mb-4">{souk.description}</p>
                <div className="space-y-2 text-sm">
                  <p><span className="text-amber-400">Must Buy:</span> {souk.mustBuy}</p>
                  <p><span className="text-emerald-400">Tip:</span> {souk.tips}</p>
                  <p><span className="text-gray-400"><Clock className="w-4 h-4 inline mr-1" />Best:</span> {souk.bestTime}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Shopping */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-2">
            <Gem className="w-8 h-8 text-yellow-400" /> Luxury Shopping Destinations
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {luxuryDestinations.map((dest) => (
              <div key={dest.name} className="bg-gradient-to-br from-yellow-500/10 to-amber-500/5 rounded-xl p-5">
                <h3 className="font-bold text-yellow-400 mb-1">{dest.name}</h3>
                <p className="text-xs text-gray-400 mb-2"><MapPin className="w-3 h-3 inline mr-1" />{dest.location}</p>
                <p className="text-sm text-gray-300 mb-2">{dest.specialty}</p>
                <p className="text-xs text-amber-400">{dest.brands}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Buy */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">🎁 What to Buy in Bahrain</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {whatToBuy.map((item) => (
              <div key={item.item} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-amber-400 mb-2">{item.item}</h3>
                <p className="text-sm text-gray-300 mb-2">{item.description}</p>
                <p className="text-xs text-gray-400"><MapPin className="w-3 h-3 inline mr-1" />{item.where}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shopping Areas */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">📍 Shopping Areas</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {shoppingAreas.map((area) => (
              <div key={area.area} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-amber-400 mb-2">{area.area}</h3>
                <span className="inline-block px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded mb-2">{area.type}</span>
                <p className="text-sm text-gray-300">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shopping Tips */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">💡 Shopping Tips</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {shoppingTips.map((tip) => (
              <div key={tip.tip} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-amber-400 mb-2 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" /> {tip.tip}
                </h3>
                <p className="text-sm text-gray-300">{tip.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Shop?</h2>
          <p className="text-gray-300 mb-6">Explore more Bahrain guides to plan your trip</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guides/things-to-do" className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg transition-colors">Things to Do</Link>
            <Link href="/guides/restaurants" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors">Restaurants</Link>
          </div>
          <p className="text-sm text-gray-400 mt-8">
            Book experiences and events on <a href="https://bahrain.platinumlist.net?affiliate=yjg3yzi" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">Platinumlist</a>
          </p>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'First Time Visitor', href: '/guides/first-time', emoji: '✈️' },
              { title: 'Budget Guide', href: '/guides/budget', emoji: '💰' },
              { title: 'Things to Do', href: '/guides/things-to-do', emoji: '🎯' },
              { title: 'Restaurants', href: '/guides/restaurants', emoji: '🍽️' },
            ].map((g) => (
              <Link key={g.href} href={g.href} className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group">
                <span className="text-2xl mb-2 block">{g.emoji}</span>
                <span className="font-medium group-hover:text-amber-400 transition-colors">{g.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cross Promotion */}
      <section className="py-8 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400">
            Looking for shopping festivals and events? Visit <a href="https://www.eventsbahrain.com" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">EventsBahrain.com</a> for the latest promotions. 
            Need retail marketing content? <a href="https://www.cinematicwebworks.com" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">CinematicWebWorks.com</a> creates stunning commercial videos.
          </p>
        </div>
      </section>

      {/* FAQs */}
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

      {/* Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Shopping in Bahrain 2026 — Best Malls, Souks & Boutiques',
        description: 'Complete shopping guide to Bahrain including malls, traditional souks, luxury boutiques, and shopping tips.',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        publisher: { '@type': 'Organization', name: 'BahrainNights', url: 'https://www.bahrainnights.com' },
        datePublished: '2026-01-26',
        dateModified: lastUpdated,
        mainEntityOfPage: 'https://www.bahrainnights.com/guides/shopping-bahrain'
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a }
        }))
      })}} />
    </div>
  );
}
