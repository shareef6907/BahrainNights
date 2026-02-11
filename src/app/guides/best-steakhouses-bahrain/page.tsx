import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, Flame } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Steakhouses in Bahrain 2026 | Premium Steaks & Grills',
  description: 'Discover the best steakhouses in Bahrain. Prime cuts, dry-aged beef, wagyu, and premium grills. Complete guide with prices and recommendations.',
  keywords: 'steakhouses Bahrain, best steak Bahrain, wagyu Bahrain, dry aged beef Bahrain, prime steak Bahrain, grill restaurants Bahrain',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/best-steakhouses-bahrain' },
  openGraph: {
    title: 'Best Steakhouses in Bahrain 2026',
    description: 'Find the finest steaks in Bahrain - prime cuts, wagyu, and premium grills.',
    type: 'article', locale: 'en_US',
  },
};

const faqs = [
  { q: 'What are the best steakhouses in Bahrain?', a: 'Top steakhouses include CUT by Wolfgang Puck (Four Seasons), Butcher\'s Block, Günaydın, The Meat Co, and Nusr-Et (if visiting). Each offers premium cuts with distinct preparation styles from American to Turkish.' },
  { q: 'What cuts of steak are available?', a: 'Bahrain steakhouses offer ribeye, filet mignon, New York strip, T-bone, porterhouse, tomahawk, and wagyu options. Dry-aged beef is available at premium establishments. Most offer USDA Prime or Australian wagyu grades.' },
  { q: 'How much does a steak dinner cost in Bahrain?', a: 'Steak prices range from 12-20 BD for mid-range restaurants, 25-45 BD at premium steakhouses, and 60-150+ BD for wagyu or specialty cuts. Sides typically cost 4-8 BD extra.' },
  { q: 'What\'s the difference between wet and dry-aged steak?', a: 'Wet-aged beef is vacuum-sealed and aged in its juices, resulting in tender meat. Dry-aged beef is hung in controlled conditions, developing intense flavor and tenderness through moisture loss. Dry-aged is pricier but offers deeper, nuttier flavors.' },
  { q: 'Which steakhouses serve wagyu in Bahrain?', a: 'CUT by Wolfgang Puck, Nusr-Et, Günaydın, and select hotel restaurants serve authentic wagyu beef. Grades range from A4 to A5 Japanese wagyu, with Australian and American wagyu as more affordable options.' },
];

const restaurants = [
  {
    name: 'CUT by Wolfgang Puck',
    area: 'Four Seasons',
    rating: 5,
    priceRange: 'BD 40-80',
    mustTry: ['USDA Prime ribeye', 'Japanese A5 wagyu', 'Bone marrow flan'],
    vibe: 'Sophisticated fine dining',
    bestFor: 'Special occasions, steak connoisseurs',
  },
  {
    name: 'Butcher\'s Block',
    area: 'Seef',
    rating: 5,
    priceRange: 'BD 25-50',
    mustTry: ['Dry-aged tomahawk', 'Beef tartare', 'Truffle fries'],
    vibe: 'Modern steakhouse, open kitchen',
    bestFor: 'Serious steak lovers, dates',
  },
  {
    name: 'Günaydın',
    area: 'Seef',
    rating: 5,
    priceRange: 'BD 20-40',
    mustTry: ['Turkish-style steaks', 'Lamb chops', 'Baklava'],
    vibe: 'Contemporary Turkish grill',
    bestFor: 'Groups, Turkish preparation',
  },
  {
    name: 'The Meat Co',
    area: 'City Centre',
    rating: 4,
    priceRange: 'BD 18-35',
    mustTry: ['Fillet steak', 'Lamb rack', 'Chocolate fondant'],
    vibe: 'South African steakhouse',
    bestFor: 'Mall dining, families',
  },
  {
    name: 'Prime',
    area: 'InterContinental',
    rating: 4,
    priceRange: 'BD 25-45',
    mustTry: ['Prime ribeye', 'Lobster tail', 'Caesar salad'],
    vibe: 'Classic American steakhouse',
    bestFor: 'Business dinners, hotel guests',
  },
  {
    name: 'JW\'s Steakhouse',
    area: 'JW Marriott',
    rating: 4,
    priceRange: 'BD 22-40',
    mustTry: ['USDA beef', 'Seafood tower', 'Creamed spinach'],
    vibe: 'Traditional steakhouse elegance',
    bestFor: 'Classic experience, consistency',
  },
  {
    name: 'Furn Bistro & Bakery',
    area: 'Budaiya',
    rating: 4,
    priceRange: 'BD 15-28',
    mustTry: ['Grilled ribeye', 'Mixed grill', 'Wood-fired dishes'],
    vibe: 'Casual Mediterranean grill',
    bestFor: 'Casual steak night, value',
  },
  {
    name: 'Texas Roadhouse',
    area: 'Seef',
    rating: 4,
    priceRange: 'BD 10-20',
    mustTry: ['Bone-in ribeye', 'Ribs', 'Loaded potato'],
    vibe: 'American roadhouse, casual',
    bestFor: 'Families, value steaks',
  },
];

export default function BestSteakhousesBahrainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-amber-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Best Steakhouses', url: 'https://www.bahrainnights.com/guides/best-steakhouses-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-red-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-4">🥩 Cuisine Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best <span className="bg-gradient-to-r from-amber-400 to-red-500 bg-clip-text text-transparent">Steakhouses</span> in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Prime cuts, dry-aged perfection, sizzling wagyu, and classic American grills — 
              discover where to find the finest steaks in Bahrain.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Bahrain&apos;s steakhouse scene has matured into a serious destination for meat lovers. 
            From celebrity chef restaurants serving Japanese A5 wagyu to neighborhood grills 
            perfecting the art of the ribeye, there&apos;s a steak experience for every palate and budget.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            What sets the best steakhouses apart is quality sourcing, proper aging, and expert 
            preparation. Whether you prefer your steak charred over open flames Turkish-style 
            or broiled to perfection American steakhouse-fashion, Bahrain delivers world-class 
            cuts in impressive settings.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Top Steakhouses</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {restaurants.map((restaurant) => (
              <div key={restaurant.name} className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      {restaurant.name}
                      {restaurant.rating === 5 && <Flame className="w-4 h-4 text-amber-400" />}
                    </h3>
                    <p className="text-amber-400 text-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {restaurant.area}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{restaurant.priceRange}</div>
                    <div className="flex items-center gap-0.5 justify-end">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < restaurant.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-600'}`} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-3">{restaurant.vibe}</p>
                <div className="mb-3">
                  <span className="text-xs text-gray-500">Must try:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {restaurant.mustTry.map((item) => (
                      <span key={item} className="text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded">{item}</span>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-500"><strong>Best for:</strong> {restaurant.bestFor}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steak Guide */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Know Your Cuts</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="font-bold text-amber-400 mb-2">Ribeye</h3>
              <p className="text-gray-400 text-sm">Rich, marbled, and full of flavor. The most popular cut for its perfect balance of tenderness and beefy taste.</p>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="font-bold text-amber-400 mb-2">Filet Mignon</h3>
              <p className="text-gray-400 text-sm">The most tender cut, lean with buttery texture. Perfect for those who prefer tenderness over bold flavor.</p>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="font-bold text-amber-400 mb-2">New York Strip</h3>
              <p className="text-gray-400 text-sm">Firm texture with a strip of fat along one edge. Great beefy flavor with satisfying chew.</p>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="font-bold text-amber-400 mb-2">T-Bone / Porterhouse</h3>
              <p className="text-gray-400 text-sm">Two steaks in one — strip and tenderloin separated by a T-shaped bone. Best of both worlds.</p>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="font-bold text-amber-400 mb-2">Tomahawk</h3>
              <p className="text-gray-400 text-sm">Dramatic bone-in ribeye with French-trimmed rib bone. Perfect for sharing and Instagram.</p>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="font-bold text-amber-400 mb-2">Wagyu</h3>
              <p className="text-gray-400 text-sm">Intensely marbled Japanese beef with melt-in-mouth texture. A5 grade is the pinnacle.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Steakhouse FAQs</h2>
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

      <section className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-6">More Cuisine Guides</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { title: 'Seafood', href: '/guides/best-seafood-bahrain' },
              { title: 'Italian', href: '/guides/best-italian-restaurants-bahrain' },
              { title: 'Japanese', href: '/guides/best-japanese-restaurants-bahrain' },
              { title: 'Turkish', href: '/guides/best-turkish-restaurants-bahrain' },
            ].map((guide) => (
              <Link key={guide.href} href={guide.href} className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors">
                {guide.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Best Steakhouses in Bahrain 2026',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2026-02-11', dateModified: '2026-02-11',
      })}} />
    </div>
  );
}
