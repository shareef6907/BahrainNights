import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Utensils, Building2, Waves, Star, Coffee, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Bahrain Bay Guide 2026 | Four Seasons, Dining & Waterfront Living',
  description: 'Discover Bahrain Bay - Bahrain\'s premier waterfront destination. Four Seasons resort, fine dining restaurants, luxury apartments, and stunning views of Manama skyline.',
  keywords: 'Bahrain Bay, Four Seasons Bahrain, Bahrain Bay restaurants, waterfront dining Bahrain, luxury hotels Bahrain, Bahrain Bay apartments',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/bahrain-bay' },
  openGraph: {
    title: 'Bahrain Bay Guide 2026 | Luxury Waterfront Destination',
    description: 'Your guide to Bahrain Bay - Four Seasons, fine dining, and waterfront luxury.',
    type: 'article', locale: 'en_BH',
  },
};

const faqs = [
  { q: 'What is Bahrain Bay?', a: 'Bahrain Bay is a master-planned waterfront development featuring the Four Seasons Hotel, luxury residences, fine dining restaurants, and the upcoming Bahrain Bay Park. It offers stunning views of the Manama skyline and Arabian Gulf.' },
  { q: 'What restaurants are in Bahrain Bay?', a: 'Bahrain Bay is home to several Four Seasons restaurants including CUT by Wolfgang Puck (steakhouse), re Asian Cuisine, Bahrain Bay Kitchen, and the Pool Bar. Additional restaurants are in development.' },
  { q: 'Can non-hotel guests visit Bahrain Bay?', a: 'Yes! The restaurants, beach club, and public areas are open to visitors. Restaurant reservations are recommended, especially for CUT by Wolfgang Puck and weekend brunches.' },
  { q: 'Is Bahrain Bay good for families?', a: 'Yes, Bahrain Bay offers family-friendly beaches at Four Seasons, a safe walking promenade, and the upcoming Bahrain Bay Park will add more family attractions.' },
];

const venues = [
  { name: 'CUT by Wolfgang Puck', type: 'Steakhouse', highlight: 'World-class steaks, celebrity chef' },
  { name: 're Asian Cuisine', type: 'Pan-Asian', highlight: 'Japanese, Chinese, Thai fusion' },
  { name: 'Bahrain Bay Kitchen', type: 'All-Day Dining', highlight: 'Buffet & à la carte' },
  { name: 'Four Seasons Beach', type: 'Beach Club', highlight: 'Private beach, day passes' },
  { name: 'The Spa at Four Seasons', type: 'Spa & Wellness', highlight: 'Luxury treatments' },
  { name: 'Pool Bar', type: 'Bar & Lounge', highlight: 'Sunset drinks, light bites' },
];

export default function BahrainBayGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-cyan-950/20 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Bahrain Bay', url: 'https://www.bahrainnights.com/guides/bahrain-bay' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-medium mb-4">📍 Area Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Bahrain Bay</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Bahrain&apos;s premier waterfront destination — home to Four Seasons, 
              world-class dining, and the most stunning views of the Manama skyline.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Fine Dining', value: '6+', icon: Utensils },
              { label: '5-Star Hotel', value: '1', icon: Building2 },
              { label: 'Beach Access', value: 'Yes', icon: Waves },
              { label: 'Views', value: '360°', icon: Sparkles },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-cyan-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">The Bahrain Bay Experience</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-3">Four Seasons Resort</h3>
              <p className="text-gray-300">The crown jewel of Bahrain Bay, Four Seasons offers 273 rooms and suites with floor-to-ceiling 
              windows overlooking the bay. The private beach, infinity pool, and world-class spa make it a destination in itself.</p>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-3">Waterfront Living</h3>
              <p className="text-gray-300">Beyond the hotel, Bahrain Bay features luxury apartments and the upcoming Bahrain Bay Park. 
              The waterfront promenade offers stunning sunset views and connects to Bahrain&apos;s growing pedestrian infrastructure.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Dining & Experiences</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {venues.map((venue) => (
              <div key={venue.name} className="bg-white/5 rounded-xl p-5 hover:bg-white/10 transition-colors">
                <h3 className="font-bold text-cyan-300 mb-1">{venue.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{venue.type}</p>
                <p className="text-sm text-gray-400">{venue.highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6">
                <h3 className="font-bold mb-2 text-cyan-300">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-6">Explore More Areas</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Seef', href: '/guides/seef', emoji: '🏙️' },
              { title: 'Amwaj Islands', href: '/guides/amwaj', emoji: '🏝️' },
              { title: 'Hotels', href: '/guides/hotels', emoji: '🏨' },
              { title: 'Spas', href: '/guides/spas', emoji: '💆' },
            ].map((guide) => (
              <Link key={guide.href} href={guide.href} className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors flex items-center gap-3">
                <span className="text-2xl">{guide.emoji}</span>
                <span className="font-medium">{guide.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Bahrain Bay Guide 2026',
        description: 'Complete guide to Bahrain Bay - Four Seasons, dining, and waterfront experiences.',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2026-02-10', dateModified: '2026-02-10',
      })}} />
    </div>
  );
}
