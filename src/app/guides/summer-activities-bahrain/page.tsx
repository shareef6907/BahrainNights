import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, Sun, Waves, Snowflake, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Summer Activities in Bahrain 2026 | Beat the Heat Guide',
  description: 'Best things to do in Bahrain during summer. Indoor activities, water parks, air-conditioned attractions, and cool escapes from the Gulf heat.',
  keywords: 'summer Bahrain, things to do summer Bahrain, indoor activities Bahrain, water park Bahrain, beat the heat Bahrain, summer kids Bahrain',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/summer-activities-bahrain' },
  openGraph: {
    title: 'Summer Activities in Bahrain 2026 - Beat the Heat',
    description: 'How to stay cool and entertained during Bahrain\'s hot summer months.',
    type: 'article', locale: 'en_US',
  },
};

const faqs = [
  { q: 'How hot does it get in Bahrain during summer?', a: 'Summer temperatures (June-September) regularly exceed 40°C (104°F) with high humidity. July and August are the hottest months. Outdoor activities are best limited to early morning or after sunset.' },
  { q: 'What indoor activities are there in Bahrain?', a: 'Malls (City Centre, Seef Mall, The Avenues), cinemas, bowling alleys, escape rooms, indoor trampoline parks, museums (National Museum, Bahrain Fort), and hotel facilities like pools and spas.' },
  { q: 'Are there water parks in Bahrain?', a: 'Lost Paradise of Dilmun is Bahrain\'s main water park. Many hotels also have pool facilities that offer day passes. Beach clubs like Coral Bay provide pool and beach access.' },
  { q: 'Is summer a good time to visit Bahrain?', a: 'Summer is low season due to heat, meaning better hotel deals and fewer crowds. If you can handle the heat (and stay indoors during peak hours), it can be budget-friendly. Most expat families travel during school holidays.' },
  { q: 'What do locals do in summer?', a: 'Many locals travel abroad during summer holidays. Those who stay enjoy air-conditioned malls, evening gatherings, late-night outings when temperatures drop, and indoor entertainment venues.' },
];

const activities = [
  {
    category: 'Water Fun',
    icon: Waves,
    items: [
      { name: 'Lost Paradise of Dilmun', desc: 'Bahrain\'s main water park', location: 'Sakhir' },
      { name: 'Hotel Pool Day Passes', desc: 'Ritz, Four Seasons, Sofitel', location: 'Various' },
      { name: 'Coral Bay Beach Club', desc: 'Pool and beach access', location: 'Budaiya' },
      { name: 'Al Dar Islands', desc: 'Beach escape (go early!)', location: 'Off coast' },
    ]
  },
  {
    category: 'Indoor Entertainment',
    icon: Snowflake,
    items: [
      { name: 'Funland', desc: 'Indoor amusement center', location: 'Various malls' },
      { name: 'Magic Planet', desc: 'Games and rides', location: 'City Centre' },
      { name: 'Trampo Extreme', desc: 'Indoor trampoline park', location: 'Riffa' },
      { name: 'Escape Rooms', desc: 'Mystery solving fun', location: 'Various' },
    ]
  },
  {
    category: 'Mall Activities',
    icon: Sun,
    items: [
      { name: 'City Centre Bahrain', desc: 'Shopping, cinema, dining', location: 'Seef' },
      { name: 'The Avenues', desc: 'Latest addition, massive', location: 'Bahrain Bay' },
      { name: 'Seef Mall', desc: 'Local favorite', location: 'Seef' },
      { name: 'Bowling Alleys', desc: 'In multiple malls', location: 'Various' },
    ]
  },
  {
    category: 'Cultural (Air-Conditioned)',
    icon: Star,
    items: [
      { name: 'Bahrain National Museum', desc: 'History and art', location: 'Manama' },
      { name: 'Bahrain Fort', desc: 'UNESCO site (visit at sunset)', location: 'Karbabad' },
      { name: 'Beit Al Quran', desc: 'Islamic arts museum', location: 'Hoora' },
      { name: 'Art galleries', desc: 'Various exhibitions', location: 'Adliya area' },
    ]
  },
];

export default function SummerActivitiesBahrainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-orange-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Summer Activities', url: 'https://www.bahrainnights.com/guides/summer-activities-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm font-medium mb-4">☀️ Summer Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">Summer Activities</span> in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              It&apos;s 45°C outside. Here&apos;s how to stay cool, entertained, and sane 
              during Bahrain&apos;s scorching summer months.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Bahrain summers are not for the faint-hearted. With temperatures regularly exceeding 
            40°C and humidity that makes it feel even hotter, outdoor activities between 10 AM 
            and 5 PM are essentially off-limits. But fear not — the kingdom is well-equipped 
            for summer survival.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            <strong className="text-orange-400">Summer strategy:</strong> Embrace air conditioning. 
            Malls become your living room, hotel pools your backyard, and late evenings (after 8 PM) 
            the only sensible time for outdoor dining or walks.
          </p>
        </div>
      </section>

      {activities.map((category) => (
        <section key={category.category} className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <category.icon className="w-6 h-6 text-orange-400" />
              {category.category}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {category.items.map((item) => (
                <div key={item.name} className="bg-white/5 rounded-xl p-5 hover:bg-white/10 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold">{item.name}</h3>
                    <span className="text-orange-400 text-xs">{item.location}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Summer FAQs</h2>
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
              { title: 'Kids Activities', href: '/guides/kids-activities-bahrain' },
              { title: 'Beach Clubs', href: '/guides/beach-clubs' },
              { title: 'Family Restaurants', href: '/guides/best-family-restaurants-bahrain' },
              { title: 'Malls', href: '/guides/malls' },
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
        headline: 'Summer Activities in Bahrain 2026 - Beat the Heat',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2026-02-11', dateModified: '2026-02-11',
      })}} />
    </div>
  );
}
