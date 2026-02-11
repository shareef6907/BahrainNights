import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, Wind, Moon, Music } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Shisha Lounges in Bahrain 2026 | Hookah Cafes Guide',
  description: 'Find the best shisha lounges and hookah cafes in Bahrain. Traditional and modern venues, flavors, and the best spots for a relaxed evening.',
  keywords: 'shisha Bahrain, hookah Bahrain, shisha lounges Bahrain, best shisha Bahrain, hookah cafe Bahrain, argileh Bahrain',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/shisha-lounges-bahrain' },
  openGraph: {
    title: 'Best Shisha Lounges in Bahrain 2026',
    description: 'Guide to the best hookah and shisha spots in Bahrain.',
    type: 'article', locale: 'en_US',
  },
};

const faqs = [
  { q: 'Is shisha legal in Bahrain?', a: 'Yes, shisha is legal in Bahrain for adults (21+). Many cafes, restaurants, and hotel venues offer shisha. Some have dedicated shisha areas or terraces.' },
  { q: 'How much does shisha cost in Bahrain?', a: 'Shisha prices range from 3-5 BD at local cafes to 8-15 BD at upscale hotel venues. Premium tobaccos and elaborate setups cost more. Most places have minimum charge policies in the evening.' },
  { q: 'Where are the best shisha spots in Bahrain?', a: 'Popular areas include Adliya (trendy cafes), Juffair (late-night spots), and hotel terraces. Traditional cafes in Muharraq offer authentic experiences. Bahrain Bay has upscale options.' },
  { q: 'What shisha flavors are popular in Bahrain?', a: 'Double apple (classic), grape, mint, watermelon, and mixed fruit are popular. Many places offer premium brands like Al Fakher, Starbuzz, and Fumari with creative combinations.' },
  { q: 'Can you smoke shisha indoors in Bahrain?', a: 'Indoor shisha is restricted in many venues due to smoking laws. Most shisha is served on terraces, rooftops, or outdoor areas. Some have designated indoor sections with ventilation.' },
];

const lounges = [
  {
    name: 'Hotel Terraces',
    area: 'Various Hotels',
    rating: 5,
    priceRange: 'BD 8-15',
    vibe: 'Upscale, scenic',
    features: ['Premium brands', 'Views', 'Food menu', 'Cocktails available'],
  },
  {
    name: 'Adliya Cafes',
    area: 'Adliya',
    rating: 4,
    priceRange: 'BD 5-10',
    vibe: 'Trendy, artistic',
    features: ['Creative flavors', 'Good food', 'Hipster crowd', 'Late nights'],
  },
  {
    name: 'Juffair Lounges',
    area: 'Juffair',
    rating: 4,
    priceRange: 'BD 5-12',
    vibe: 'Party-adjacent',
    features: ['Late hours', 'Music', 'Mixed crowd', 'Pre-club vibes'],
  },
  {
    name: 'Muharraq Traditional',
    area: 'Muharraq',
    rating: 4,
    priceRange: 'BD 3-6',
    vibe: 'Authentic, local',
    features: ['Traditional setup', 'Arabic coffee', 'Local atmosphere', 'Budget-friendly'],
  },
  {
    name: 'Bahrain Bay',
    area: 'Bahrain Bay',
    rating: 5,
    priceRange: 'BD 10-18',
    vibe: 'Premium waterfront',
    features: ['Bay views', 'Modern setting', 'Upscale crowd', 'Premium service'],
  },
  {
    name: 'Seef Cafes',
    area: 'Seef District',
    rating: 3,
    priceRange: 'BD 4-8',
    vibe: 'Casual, convenient',
    features: ['Family-friendly', 'Near malls', 'Easy parking', 'Relaxed'],
  },
];

export default function ShishaLoungesBahrainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-emerald-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Shisha Lounges', url: 'https://www.bahrainnights.com/guides/shisha-lounges-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium mb-4">💨 Shisha Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">Shisha Lounges</span> in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From traditional Muharraq cafes to upscale hotel terraces — find the 
              perfect spot for hookah in Bahrain.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Shisha culture is deeply rooted in Bahrain&apos;s social fabric. Whether you prefer 
            a traditional setup with Arabic coffee in an old Muharraq cafe or a premium 
            experience with craft cocktails at a hotel terrace, the kingdom offers diverse 
            options for hookah enthusiasts.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Most shisha is served outdoors due to smoking regulations, which means beautiful 
            terrace settings, rooftop views, and al fresco evenings. The best time for shisha 
            is after sunset when temperatures cool and the city comes alive.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Top Shisha Areas</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {lounges.map((lounge) => (
              <div key={lounge.name} className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      {lounge.name}
                      <Wind className="w-4 h-4 text-emerald-400" />
                    </h3>
                    <p className="text-emerald-400 text-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {lounge.area}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{lounge.priceRange}</div>
                    <div className="text-xs text-gray-400">{lounge.vibe}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {lounge.features.map((f) => (
                    <span key={f} className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded">{f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Shisha FAQs</h2>
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
              { title: 'Nightlife', href: '/guides/nightlife' },
              { title: 'Late Night Food', href: '/guides/best-late-night-food-bahrain' },
              { title: 'Cafes', href: '/guides/cafes' },
              { title: 'Adliya Guide', href: '/guides/adliya' },
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
        headline: 'Best Shisha Lounges in Bahrain 2026',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2026-02-11', dateModified: '2026-02-11',
      })}} />
    </div>
  );
}
