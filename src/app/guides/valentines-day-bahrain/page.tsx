import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, Heart, Gift, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Valentine\'s Day in Bahrain 2026 | Romantic Ideas & Restaurants',
  description: 'Plan the perfect Valentine\'s Day in Bahrain. Romantic restaurant deals, gift ideas, staycations, and special experiences for couples.',
  keywords: 'Valentines Day Bahrain, romantic restaurants Bahrain, Valentines dinner Bahrain, Valentines gifts Bahrain, couples Bahrain',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/valentines-day-bahrain' },
  openGraph: {
    title: 'Valentine\'s Day in Bahrain 2026',
    description: 'Romantic ideas, restaurants, and special experiences for Valentine\'s Day in Bahrain.',
    type: 'article', locale: 'en_US',
  },
};

const faqs = [
  { q: 'Is Valentine\'s Day celebrated in Bahrain?', a: 'Yes, Valentine\'s Day is widely celebrated in Bahrain. Restaurants offer special menus, hotels have romantic packages, and shops stock gifts. While it\'s not an official holiday, most venues embrace the occasion.' },
  { q: 'What are the best Valentine\'s Day restaurants in Bahrain?', a: 'Top choices include CUT (Four Seasons), Mezzaluna (Ritz-Carlton), Bushido, and La Mer. Most offer special set menus for the occasion. Book well in advance as popular spots fill up quickly.' },
  { q: 'How much should I budget for Valentine\'s in Bahrain?', a: 'Romantic dinner: 50-150 BD for two. Staycation packages: 100-300 BD including dinner. Gifts: varies widely. Plan to spend 100-400 BD total for a memorable Valentine\'s experience.' },
  { q: 'Are there Valentine\'s staycation deals in Bahrain?', a: 'Yes, most major hotels offer Valentine\'s packages including room, dinner, breakfast, and sometimes spa treatments. Four Seasons, Ritz-Carlton, and Sofitel typically have excellent packages.' },
  { q: 'What romantic activities are there besides dinner?', a: 'Options include spa couples treatments, sunset dhow cruises, beach picnics (via hotels), cooking classes for two, and staycations. Some venues offer live music or special entertainment for the occasion.' },
];

const ideas = [
  {
    category: 'Romantic Dinners',
    icon: Heart,
    options: [
      { name: 'CUT by Wolfgang Puck', desc: 'World-class steaks with special V-Day menu', price: 'BD 80-120' },
      { name: 'Mezzaluna', desc: 'Italian romance with city views', price: 'BD 60-90' },
      { name: 'Bushido', desc: 'Mysterious Japanese-Peruvian atmosphere', price: 'BD 70-100' },
      { name: 'La Mer', desc: 'Beachfront dining at Sofitel', price: 'BD 50-80' },
    ]
  },
  {
    category: 'Staycation Packages',
    icon: Sparkles,
    options: [
      { name: 'Four Seasons', desc: 'Luxury bay-view suite + dinner', price: 'BD 200-350' },
      { name: 'Ritz-Carlton', desc: 'Beachfront romance package', price: 'BD 180-300' },
      { name: 'Sofitel Zallaq', desc: 'Spa & beach romance', price: 'BD 150-250' },
      { name: 'Art Rotana', desc: 'Island getaway feeling', price: 'BD 120-200' },
    ]
  },
  {
    category: 'Experiences',
    icon: Gift,
    options: [
      { name: 'Couples Spa', desc: 'Side-by-side massage treatments', price: 'BD 80-150' },
      { name: 'Sunset Cruise', desc: 'Private or shared dhow experience', price: 'BD 50-150' },
      { name: 'Cooking Class', desc: 'Learn to cook together', price: 'BD 40-80' },
      { name: 'Beach Picnic', desc: 'Arranged by hotels', price: 'BD 100-200' },
    ]
  },
];

export default function ValentinesDayBahrainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-rose-950/20 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Valentine\'s Day', url: 'https://www.bahrainnights.com/guides/valentines-day-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-pink-500/20" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-rose-500/20 text-rose-400 rounded-full text-sm font-medium mb-4">💕 Valentine&apos;s Day</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">Valentine&apos;s Day</span> in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Romantic restaurants, staycation deals, and special experiences to 
              celebrate love in the Kingdom of Bahrain.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Valentine&apos;s Day is embraced wholeheartedly in Bahrain, with restaurants, hotels, 
            and spas rolling out special packages for couples. While it&apos;s not a public holiday, 
            the occasion is celebrated across the kingdom with romantic dinners, flower deliveries, 
            and thoughtful gifts.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            <strong className="text-rose-400">Pro tip:</strong> Book restaurants and hotels at least 
            2 weeks in advance — popular venues sell out quickly. If you&apos;re planning a surprise, 
            coordinate with the restaurant for special touches like flowers or a cake.
          </p>
        </div>
      </section>

      {ideas.map((category) => (
        <section key={category.category} className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <category.icon className="w-6 h-6 text-rose-400" />
              {category.category}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {category.options.map((option) => (
                <div key={option.name} className="bg-white/5 rounded-xl p-5 hover:bg-white/10 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold">{option.name}</h3>
                    <span className="text-rose-400 font-medium text-sm">{option.price}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{option.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Valentine&apos;s FAQs</h2>
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
          <h2 className="text-xl font-bold mb-6">Related Guides</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { title: 'Date Night', href: '/guides/best-date-night-bahrain' },
              { title: 'Best Views', href: '/guides/best-views-bahrain' },
              { title: 'Italian Restaurants', href: '/guides/best-italian-restaurants-bahrain' },
              { title: 'Spa & Wellness', href: '/guides/spa-wellness-bahrain' },
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
        headline: 'Valentine\'s Day in Bahrain 2026',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2026-02-11', dateModified: '2026-02-11',
      })}} />
    </div>
  );
}
