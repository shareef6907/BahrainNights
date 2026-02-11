import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, Baby, Gamepad2, Waves, TreePine } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kids Activities in Bahrain 2026 | Family Fun & Things to Do',
  description: 'Best things to do with kids in Bahrain. Amusement parks, play areas, educational activities, beaches, and family-friendly attractions.',
  keywords: 'kids activities Bahrain, things to do with kids Bahrain, family activities Bahrain, children entertainment Bahrain, Funland Bahrain',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/kids-activities-bahrain' },
  openGraph: {
    title: 'Kids Activities in Bahrain 2026',
    description: 'The best family-friendly activities and attractions for children in Bahrain.',
    type: 'article', locale: 'en_US',
  },
};

const faqs = [
  { q: 'What are the best kids attractions in Bahrain?', a: 'Top spots include Lost Paradise of Dilmun (water park), Funland (indoor amusement), Magic Planet, Trampo Extreme (trampolines), and the National Museum\'s children section. Mall play areas are also popular.' },
  { q: 'Is there a water park in Bahrain?', a: 'Yes, Lost Paradise of Dilmun in Sakhir is Bahrain\'s main water park with slides, wave pools, and lazy rivers. Many hotels also have pool facilities that welcome families.' },
  { q: 'What indoor activities exist for kids?', a: 'Funland (arcade games, rides), Magic Planet, bowling alleys, escape rooms (for older kids), trampoline parks, soft play areas in malls, and cinema are all popular indoor options.' },
  { q: 'Are there beaches suitable for kids in Bahrain?', a: 'Yes, Al Jazayer Beach, Amwaj beaches, and hotel beaches (with day passes) are family-friendly. Coral Bay in Budaiya has a calm swimming area. Always supervise children.' },
  { q: 'What educational activities are available?', a: 'Bahrain National Museum, Bahrain Science Centre, Al Areen Wildlife Park, Bahrain Fort (UNESCO site), and various cultural exhibitions offer educational experiences for children.' },
];

const activities = [
  {
    category: 'Amusement & Play',
    icon: Gamepad2,
    items: [
      { name: 'Lost Paradise of Dilmun', desc: 'Water park with slides & pools', location: 'Sakhir', ageRange: 'All ages' },
      { name: 'Funland', desc: 'Indoor rides and arcade games', location: 'Multiple malls', ageRange: 'All ages' },
      { name: 'Magic Planet', desc: 'Games and soft play', location: 'City Centre', ageRange: '3-12' },
      { name: 'Trampo Extreme', desc: 'Trampoline park', location: 'Riffa', ageRange: '5+' },
    ]
  },
  {
    category: 'Educational',
    icon: TreePine,
    items: [
      { name: 'Bahrain National Museum', desc: 'History and interactive exhibits', location: 'Manama', ageRange: 'All ages' },
      { name: 'Bahrain Science Centre', desc: 'Hands-on science exhibits', location: 'Isa Town', ageRange: '5+' },
      { name: 'Al Areen Wildlife Park', desc: 'Animals and nature', location: 'Sakhir', ageRange: 'All ages' },
      { name: 'Bahrain Fort', desc: 'UNESCO heritage site', location: 'Karbabad', ageRange: 'All ages' },
    ]
  },
  {
    category: 'Water & Beach',
    icon: Waves,
    items: [
      { name: 'Hotel Pool Day Passes', desc: 'Family swim days', location: 'Various', ageRange: 'All ages' },
      { name: 'Al Dar Islands', desc: 'Beach day trip', location: 'Off coast', ageRange: 'All ages' },
      { name: 'Coral Bay', desc: 'Beach club', location: 'Budaiya', ageRange: 'All ages' },
      { name: 'Amwaj Beaches', desc: 'Island beaches', location: 'Amwaj', ageRange: 'All ages' },
    ]
  },
];

export default function KidsActivitiesBahrainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-green-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Kids Activities', url: 'https://www.bahrainnights.com/guides/kids-activities-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium mb-4">👨‍👩‍👧‍👦 Kids Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Kids Activities</span> in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Water parks, play areas, educational attractions, and family-friendly 
              fun for children of all ages.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Bahrain is surprisingly well-equipped for families with children. From the massive 
            Lost Paradise water park to air-conditioned play centers in every major mall, 
            there&apos;s no shortage of ways to keep kids entertained. The kingdom also offers 
            educational experiences at museums, wildlife parks, and historical sites.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            <strong className="text-green-400">Summer tip:</strong> During the hot months (May-September), 
            focus on indoor activities during the day. Save outdoor activities for early morning 
            or evening when temperatures are more manageable.
          </p>
        </div>
      </section>

      {activities.map((category) => (
        <section key={category.category} className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <category.icon className="w-6 h-6 text-green-400" />
              {category.category}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {category.items.map((item) => (
                <div key={item.name} className="bg-white/5 rounded-xl p-5 hover:bg-white/10 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold">{item.name}</h3>
                    <span className="text-green-400 text-xs">{item.location}</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{item.desc}</p>
                  <span className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded">Ages: {item.ageRange}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Kids Activities FAQs</h2>
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
              { title: 'Family Restaurants', href: '/guides/best-family-restaurants-bahrain' },
              { title: 'Summer Activities', href: '/guides/summer-activities-bahrain' },
              { title: 'Beach Clubs', href: '/guides/beach-clubs' },
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
        headline: 'Kids Activities in Bahrain 2026',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2026-02-11', dateModified: '2026-02-11',
      })}} />
    </div>
  );
}
