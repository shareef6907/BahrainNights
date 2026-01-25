import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Home, Briefcase, Heart, Users,
  Car, Building, GraduationCap, Stethoscope
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Expat Guide to Bahrain 2025 | Living, Working & Settling In',
  description: 'Essential guide for expats moving to Bahrain! Housing, visas, healthcare, schools, cost of living, and tips for settling into life in the Kingdom.',
  keywords: 'expat Bahrain, living in Bahrain, moving to Bahrain, Bahrain cost of living, expat life Bahrain, working in Bahrain, Bahrain visa work',
  openGraph: {
    title: 'Expat Guide to Bahrain 2025 | Living, Working & Settling In',
    description: 'Your complete guide to expat life in Bahrain.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/expat',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/expat',
  },
};

const livingCosts = [
  { item: 'Apartment (1BR, nice area)', cost: 'BD 300-500/month', notes: 'Juffair, Seef, Adliya' },
  { item: 'Apartment (2BR, nice area)', cost: 'BD 450-700/month', notes: 'Family-friendly areas' },
  { item: 'Villa (3BR)', cost: 'BD 600-1,200/month', notes: 'Saar, Riffa, Janabiya' },
  { item: 'Utilities', cost: 'BD 30-80/month', notes: 'Electric, water, cooling' },
  { item: 'Internet', cost: 'BD 20-40/month', notes: 'Fiber available most areas' },
  { item: 'Groceries', cost: 'BD 150-300/month', notes: 'Family of 2-4' },
  { item: 'Dining out', cost: 'BD 10-30/meal', notes: 'Casual to upscale' },
  { item: 'Domestic help', cost: 'BD 100-200/month', notes: 'Live-out cleaner/nanny' },
];

const neighborhoods = [
  { name: 'Juffair', vibe: 'Expat hub, urban, nightlife', rent: 'BD 350-600', best: 'Singles, couples' },
  { name: 'Seef', vibe: 'Modern, malls, convenient', rent: 'BD 400-700', best: 'Professionals, families' },
  { name: 'Adliya', vibe: 'Artsy, cafes, restaurants', rent: 'BD 350-550', best: 'Creative types, foodies' },
  { name: 'Saar', vibe: 'Residential, schools, villas', rent: 'BD 500-900', best: 'Families with kids' },
  { name: 'Amwaj Islands', vibe: 'Beach resort, modern', rent: 'BD 450-800', best: 'Beach lovers, expats' },
  { name: 'Riffa', vibe: 'Suburban, spacious, golf', rent: 'BD 400-700', best: 'Families, golfers' },
];

const visaTypes = [
  { type: 'Work Visa', description: 'Sponsored by employer', duration: '1-2 years renewable' },
  { type: 'Flexi Permit', description: 'Self-sponsored work', duration: '1-2 years' },
  { type: 'Golden Residency', description: 'For investors, talents', duration: '10 years' },
  { type: 'Dependent Visa', description: 'For spouse/children', duration: 'Tied to sponsor' },
];

const schools = [
  { name: 'British School of Bahrain', curriculum: 'British', fees: 'BD 3,000-6,000/year' },
  { name: 'St. Christopher\'s School', curriculum: 'British', fees: 'BD 3,500-6,500/year' },
  { name: 'Bahrain School (DOD)', curriculum: 'American', fees: 'US military families' },
  { name: 'American School of Bahrain', curriculum: 'American', fees: 'BD 4,000-7,000/year' },
  { name: 'Indian School Bahrain', curriculum: 'Indian (CBSE)', fees: 'BD 800-1,500/year' },
];

const healthcare = [
  { name: 'Public Healthcare', description: 'Available to residents at low cost', cost: 'BD 7 per visit' },
  { name: 'Private Insurance', description: 'Most expats use private healthcare', cost: 'BD 300-800/year' },
  { name: 'Top Hospitals', description: 'BDF, KHUH, American Mission Hospital', cost: 'Varies' },
];

const tips = [
  { title: 'CPR is Essential', content: 'Central Population Registry (CPR) card is your ID for everything. Get it ASAP.' },
  { title: 'Bank Account', content: 'Need CPR and salary certificate. HSBC, NBB, Standard Chartered popular with expats.' },
  { title: 'Driving License', content: 'Many can convert home license. Otherwise, driving test required.' },
  { title: 'Mobile/Internet', content: 'Batelco, Zain, STC available. Get postpaid plan once you have CPR.' },
  { title: 'Social Life', content: 'Join clubs, gyms, groups. Expat community is welcoming and active.' },
  { title: 'Summer Planning', content: 'Many leave in summer. Schools have long break. AC is essential!' },
];

export default function ExpatPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-teal-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Expat', url: 'https://www.bahrainnights.com/guides/expat' },
      ]} />

      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-cyan-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-teal-500/20 text-teal-400 rounded-full text-sm font-medium mb-4">🏠 Living Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">Expat Guide</span> to Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Moving to Bahrain? Everything you need to know — housing, visas, schools, healthcare, and settling into life in the Kingdom.
            </p>
            <p className="text-sm text-gray-500 mt-4">Last updated: {lastUpdated}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Expat Population', value: '55%+', icon: Users },
              { label: 'Tax', value: '0%', icon: Briefcase },
              { label: 'Safety', value: 'Very High', icon: Heart },
              { label: 'English', value: 'Widely Spoken', icon: Building },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-teal-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Cost of Living</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {livingCosts.map((c) => (
              <div key={c.item} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-teal-400 text-sm">{c.item}</h3>
                <p className="text-xl font-bold mt-1">{c.cost}</p>
                <p className="text-xs text-gray-400">{c.notes}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Where to Live</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {neighborhoods.map((n) => (
              <div key={n.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-teal-400">{n.name}</h3>
                <p className="text-sm text-gray-300 mb-2">{n.vibe}</p>
                <p className="text-sm"><strong>Rent:</strong> {n.rent}</p>
                <p className="text-xs text-gray-400 mt-1">Best for: {n.best}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Visa Types</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {visaTypes.map((v) => (
              <div key={v.type} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-teal-400">{v.type}</h3>
                <p className="text-sm text-gray-300 mb-2">{v.description}</p>
                <p className="text-xs text-gray-400">{v.duration}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-2">
            <GraduationCap className="w-8 h-8 text-teal-400" /> Schools
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {schools.map((s) => (
              <div key={s.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-teal-400">{s.name}</h3>
                <p className="text-sm text-gray-300">{s.curriculum}</p>
                <p className="text-sm font-bold mt-2">{s.fees}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-2">
            <Stethoscope className="w-8 h-8 text-teal-400" /> Healthcare
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {healthcare.map((h) => (
              <div key={h.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-teal-400">{h.name}</h3>
                <p className="text-sm text-gray-300 mb-2">{h.description}</p>
                <p className="text-sm font-bold">{h.cost}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Expat Tips</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tips.map((tip) => (
              <div key={tip.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-teal-400 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-300">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-teal-500/20 to-cyan-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore Your New Home</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guides/things-to-do" className="px-8 py-3 bg-teal-500 hover:bg-teal-400 text-black font-bold rounded-lg transition-colors">Things to Do</Link>
            <Link href="/guides/restaurants" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors">Restaurants</Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Things to Do', href: '/guides/things-to-do', emoji: '🎯' },
              { title: 'Restaurants', href: '/guides/restaurants', emoji: '🍽️' },
              { title: 'Family Fun', href: '/guides/family-activities', emoji: '👨‍👩‍👧‍👦' },
              { title: 'Nightlife', href: '/guides/nightlife', emoji: '🌃' },
            ].map((g) => (
              <Link key={g.href} href={g.href} className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group">
                <span className="text-2xl mb-2 block">{g.emoji}</span>
                <span className="font-medium group-hover:text-teal-400 transition-colors">{g.title}</span>
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
              { q: 'Is Bahrain good for expats?', a: 'Yes! No income tax, diverse expat community, high safety, good quality of life, and central Gulf location. Ranked highly in expat surveys.' },
              { q: 'What is the average expat salary in Bahrain?', a: 'Varies widely. Mid-level professionals BD 1,500-3,000/month. Management BD 3,000-8,000+. Includes housing allowance often.' },
              { q: 'Do I need to speak Arabic in Bahrain?', a: 'No, English is widely spoken in business and daily life. Arabic useful but not essential for most expats.' },
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
        headline: 'Expat Guide to Bahrain 2025',
        description: 'Complete guide for expats moving to and living in Bahrain.',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2025-01-26', dateModified: lastUpdated,
      })}} />
    </div>
  );
}
