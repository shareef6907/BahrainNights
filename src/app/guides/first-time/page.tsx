import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Plane, Clock, MapPin, Star,
  Info, CheckCircle, AlertTriangle, Globe
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'First Time in Bahrain 2026 | Essential Visitor Guide',
  description: 'First time visiting Bahrain? Complete guide with visa info, getting around, cultural tips, must-see attractions, and everything first-time visitors need to know.',
  keywords: 'first time Bahrain, visiting Bahrain, Bahrain travel guide, Bahrain visa, Bahrain tips, what to know Bahrain, Bahrain tourist guide',
  openGraph: {
    title: 'First Time in Bahrain 2026 | Essential Visitor Guide',
    description: 'Your essential first-time visitor guide to Bahrain.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/first-time',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/first-time',
  },
};

const essentialInfo = [
  { label: 'Capital', value: 'Manama' },
  { label: 'Currency', value: 'Bahraini Dinar (BHD)' },
  { label: 'Language', value: 'Arabic (English widely spoken)' },
  { label: 'Time Zone', value: 'GMT+3 (no daylight saving)' },
  { label: 'Electricity', value: '230V, UK-style plugs' },
  { label: 'Weekend', value: 'Friday-Saturday' },
];

const visaInfo = {
  title: 'Visa Information',
  details: [
    'Many nationalities get visa on arrival (14 days)',
    'eVisa available online before travel',
    'GCC residents can enter freely',
    'Check visa requirements for your nationality',
    'Passport must be valid 6+ months',
  ],
};

const mustSee = [
  { name: 'Bahrain Fort (UNESCO)', description: '4,000 years of history', time: '2-3 hours' },
  { name: 'Al Fateh Grand Mosque', description: 'One of world\'s largest mosques', time: '1 hour' },
  { name: 'Manama Souq', description: 'Traditional market experience', time: '2 hours' },
  { name: 'Bahrain National Museum', description: '6,000 years of Bahrain history', time: '2-3 hours' },
  { name: 'Tree of Life', description: 'Mysterious desert landmark', time: '1 hour' },
  { name: 'Muharraq Heritage', description: 'UNESCO pearling path', time: '2 hours' },
];

const doAndDont = {
  do: [
    'Dress modestly in public (shoulders and knees covered)',
    'Ask before photographing people',
    'Try local food — it\'s delicious!',
    'Bargain in souks',
    'Carry cash for small purchases',
    'Say "Shukran" (thank you)',
  ],
  dont: [
    'Don\'t drink and drive (zero tolerance)',
    'Don\'t photograph government buildings',
    'Don\'t eat/drink publicly during Ramadan',
    'Don\'t be overly affectionate in public',
    'Don\'t disrespect local customs',
    'Don\'t litter',
  ],
};

const gettingAround = [
  { method: 'Taxi/Careem', description: 'Main transport. Apps give fair pricing.', cost: 'BD 2-10 typical' },
  { method: 'Car Rental', description: 'Best for exploring outside Manama.', cost: 'BD 10-25/day' },
  { method: 'Bus', description: 'Cheap but limited routes.', cost: '200-300 fils' },
  { method: 'Walking', description: 'OK in city areas (except summer!)', cost: 'Free' },
];

const bestTime = [
  { season: 'Nov-Feb', temp: '15-25°C', verdict: 'Perfect! Best time to visit.' },
  { season: 'Mar-Apr', temp: '20-32°C', verdict: 'Good. F1 season. Warming up.' },
  { season: 'May-Sep', temp: '35-48°C', verdict: 'Very hot. Indoor activities only.' },
  { season: 'Oct', temp: '28-35°C', verdict: 'OK. Heat starting to ease.' },
];

const tips = [
  { title: 'Money', content: '1 BHD = 2.65 USD approx. ATMs everywhere. Cards widely accepted.' },
  { title: 'SIM Card', content: 'Buy at airport (Batelco, Zain, STC). Passport required. ~BD 5-10 for tourist SIM.' },
  { title: 'Water', content: 'Tap water is safe but most drink bottled. Stay very hydrated.' },
  { title: 'Alcohol', content: 'Available in hotels and licensed venues. Not in public or streets.' },
  { title: 'Safety', content: 'Very safe country. Low crime. Normal precautions apply.' },
  { title: 'Friday', content: 'Islamic holy day. Some places closed morning. Brunch culture popular.' },
];

export default function FirstTimePage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'First Time', url: 'https://www.bahrainnights.com/guides/first-time' },
      ]} />

      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium mb-4">✈️ Visitor Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">First Time in Bahrain</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to know for your first visit — visa info, getting around, cultural tips, and must-see attractions.
            </p>
            <p className="text-sm text-gray-500 mt-4">Last updated: {lastUpdated}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-12">
            {essentialInfo.map((info) => (
              <div key={info.label} className="bg-white/5 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-400 mb-1">{info.label}</p>
                <p className="font-bold text-blue-400">{info.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-center flex items-center justify-center gap-2">
            <Globe className="w-5 h-5 text-blue-400" />{visaInfo.title}
          </h2>
          <div className="bg-white/5 rounded-xl p-6">
            <ul className="space-y-2">
              {visaInfo.details.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />{d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Must-See Attractions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mustSee.map((a) => (
              <div key={a.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-blue-400">{a.name}</h3>
                <p className="text-sm text-gray-300 mb-2">{a.description}</p>
                <p className="text-xs text-gray-400"><Clock className="w-3 h-3 inline mr-1" />{a.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Do's and Don'ts</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-500/10 rounded-xl p-6">
              <h3 className="font-bold text-green-400 mb-4 text-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> DO
              </h3>
              <ul className="space-y-2">
                {doAndDont.do.map((item, i) => (
                  <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                    <span className="text-green-400">✓</span>{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-500/10 rounded-xl p-6">
              <h3 className="font-bold text-red-400 mb-4 text-lg flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" /> DON'T
              </h3>
              <ul className="space-y-2">
                {doAndDont.dont.map((item, i) => (
                  <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                    <span className="text-red-400">✗</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">When to Visit</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {bestTime.map((s) => (
              <div key={s.season} className={`rounded-xl p-5 ${s.season === 'Nov-Feb' ? 'bg-green-500/20 ring-2 ring-green-500' : 'bg-white/5'}`}>
                <h3 className="font-bold text-blue-400">{s.season}</h3>
                <p className="text-lg font-bold">{s.temp}</p>
                <p className="text-sm text-gray-400">{s.verdict}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Getting Around</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {gettingAround.map((g) => (
              <div key={g.method} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-blue-400">{g.method}</h3>
                <p className="text-sm text-gray-300 mb-2">{g.description}</p>
                <p className="text-sm font-bold">{g.cost}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Practical Tips</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tips.map((tip) => (
              <div key={tip.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-blue-400 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-300">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Start Exploring</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guides/things-to-do" className="px-8 py-3 bg-blue-500 hover:bg-blue-400 text-black font-bold rounded-lg transition-colors">Things to Do</Link>
            <Link href="/guides/tourist-attractions" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors">Top Attractions</Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Things to Do', href: '/guides/things-to-do', emoji: '🎯' },
              { title: 'Budget Guide', href: '/guides/budget', emoji: '💰' },
              { title: 'Hotels', href: '/guides/hotels', emoji: '🏨' },
              { title: 'Restaurants', href: '/guides/restaurants', emoji: '🍽️' },
            ].map((g) => (
              <Link key={g.href} href={g.href} className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group">
                <span className="text-2xl mb-2 block">{g.emoji}</span>
                <span className="font-medium group-hover:text-blue-400 transition-colors">{g.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">FAQs</h2>
          <div className="space-y-4">
            {[
              { q: 'Do I need a visa for Bahrain?', a: 'Many nationalities get visa on arrival (14 days). Check requirements for your passport. eVisa available online.' },
              { q: 'Is Bahrain safe for tourists?', a: 'Yes, Bahrain is very safe with low crime. Normal travel precautions apply.' },
              { q: 'What\'s the best time to visit Bahrain?', a: 'November to February offers perfect weather (15-25°C). Avoid May-September heat.' },
            ].map((faq, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6">
                <h3 className="font-bold mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'First Time in Bahrain 2026',
        description: 'Essential guide for first-time visitors to Bahrain.',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2026-01-26', dateModified: lastUpdated,
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'Do I need a visa for Bahrain?', acceptedAnswer: { '@type': 'Answer', text: 'Many nationalities get visa on arrival (14 days). Check requirements for your passport. eVisa available online.' } },
          { '@type': 'Question', name: 'Is Bahrain safe for tourists?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, Bahrain is very safe with low crime. Normal travel precautions apply.' } },
          { '@type': 'Question', name: 'What\'s the best time to visit Bahrain?', acceptedAnswer: { '@type': 'Answer', text: 'November to February offers perfect weather (15-25°C). Avoid May-September heat.' } },
        ]
      })}} />
    </div>
  );
}
