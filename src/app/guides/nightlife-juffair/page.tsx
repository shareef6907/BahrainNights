import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Music, Moon, Wine, MapPin, Clock, Star,
  ArrowRight, Users, Sparkles
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Juffair Nightlife Guide 2026 | Nightlife Area in Bahrain',
  description: 'Complete guide to Juffair nightlife in Bahrain. Discover the vibrant nightlife scene, bars, and late-night spots in Juffair.',
  keywords: 'Juffair nightlife, Juffair bars, nightlife Juffair Bahrain, where to party Juffair, Juffair entertainment',
  openGraph: {
    title: 'Juffair Nightlife Guide 2026 | Nightlife Area in Bahrain',
    description: 'Your guide to the nightlife scene in Juffair, Bahrain.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/nightlife-juffair',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/nightlife-juffair',
  },
};

const areaHighlights = [
  {
    title: 'Hotel Entertainment',
    description: 'Multiple hotels in Juffair feature bars, lounges, and entertainment venues with varied atmospheres.',
    features: ['Various music styles', 'International crowd', 'Safe environment', 'Good service'],
  },
  {
    title: 'Late Night Scene',
    description: 'Juffair comes alive after dark with options for every taste, from relaxed lounges to energetic venues.',
    features: ['Open late', 'Diverse options', 'Walking distance', 'Taxi accessible'],
  },
  {
    title: 'Rooftop Venues',
    description: 'Several hotels offer rooftop spaces with city views, perfect for sunset drinks and evening relaxation.',
    features: ['City views', 'Sunset spots', 'Casual atmosphere', 'Cocktails'],
  },
];

const weeklySchedule = [
  { day: 'Monday', status: 'quiet', note: 'Most venues quiet or closed' },
  { day: 'Tuesday', status: 'ladies', note: 'Ladies night specials at various venues' },
  { day: 'Wednesday', status: 'ladies', note: 'Ladies night continues' },
  { day: 'Thursday', status: 'peak', note: '🔥 Main party night - busiest!' },
  { day: 'Friday', status: 'busy', note: 'Great night out' },
  { day: 'Saturday', status: 'busy', note: 'Good atmosphere' },
  { day: 'Sunday', status: 'quiet', note: 'Limited options' },
];

const tips = [
  { title: 'Getting There', content: 'Juffair is central and easy to reach by taxi or Uber/Careem. Most venues are within walking distance of each other.' },
  { title: 'Dress Code', content: 'Smart casual for most venues. No shorts or sandals for men. Ladies dress up.' },
  { title: 'Timing', content: 'Venues fill up around 11 PM-midnight. Peak hours are typically 1-3 AM.' },
  { title: 'Safety', content: 'Juffair is safe but arrange transport home. Never drink and drive.' },
];

export default function JuffairNightlifePage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Nightlife', url: 'https://www.bahrainnights.com/guides/nightlife' },
          { name: 'Juffair', url: 'https://www.bahrainnights.com/guides/nightlife-juffair' },
        ]}
      />

      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium mb-4">
              🌙 Area Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Juffair
              </span>
              {' '}Nightlife
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Juffair is one of Bahrain&apos;s most popular nightlife areas, known for its 
              vibrant entertainment scene, hotel venues, and international atmosphere.
            </p>
            <p className="text-sm text-gray-500 mt-4">Last updated: {lastUpdated}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Venues', value: '20+', icon: Music },
              { label: 'Bars & Lounges', value: '15+', icon: Wine },
              { label: 'Best Night', value: 'Thursday', icon: Star },
              { label: 'Peak Hours', value: '11PM-2AM', icon: Clock },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Juffair */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">About Juffair Nightlife</h2>
          <div className="bg-white/5 rounded-2xl p-8">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Juffair is a bustling district in Bahrain known for its diverse nightlife and entertainment options. 
              Popular with expats and visitors alike, the area features numerous hotels with entertainment venues, 
              creating a concentrated nightlife zone that&apos;s easy to explore on foot.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              The area is particularly busy on Thursday nights (the start of the weekend) and offers 
              various ladies night specials during the week. From relaxed lounges to more energetic 
              venues, Juffair caters to different tastes and preferences.
            </p>
          </div>
        </div>
      </section>

      {/* Weekly Calendar */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Weekly Schedule</h2>
          <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
            {weeklySchedule.map((day) => (
              <div 
                key={day.day}
                className={`bg-white/5 rounded-xl p-4 ${
                  day.status === 'peak' ? 'ring-2 ring-purple-500' :
                  day.status === 'ladies' ? 'ring-1 ring-pink-500' : ''
                }`}
              >
                <div className="font-bold mb-1">{day.day}</div>
                <p className="text-xs text-gray-400">{day.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Area Highlights */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">What to Expect</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {areaHighlights.map((highlight) => (
              <div key={highlight.title} className="bg-white/5 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-purple-400 mb-3">{highlight.title}</h3>
                <p className="text-gray-300 mb-4">{highlight.description}</p>
                <div className="flex flex-wrap gap-2">
                  {highlight.features.map((f) => (
                    <span key={f} className="text-xs bg-white/10 px-2 py-1 rounded">{f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Tips for Juffair Nightlife</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {tips.map((tip) => (
              <div key={tip.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-purple-400 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-300">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More Areas</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guides/nightlife-adliya" className="px-6 py-3 bg-purple-500 hover:bg-purple-400 text-white font-bold rounded-lg">
              Adliya Nightlife
            </Link>
            <Link href="/guides/nightlife" className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg">
              Full Nightlife Guide
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">FAQ</h2>
          <div className="space-y-4">
            {[
              { q: 'What is the nightlife like in Juffair?', a: 'Juffair has a diverse nightlife scene with various hotel bars, lounges, and entertainment venues. It is one of Bahrain\'s most popular areas for going out.' },
              { q: 'What night is best for Juffair nightlife?', a: 'Thursday is the biggest night as it marks the start of the weekend. Ladies nights typically run Tuesday and Wednesday.' },
              { q: 'Is Juffair safe at night?', a: 'Yes, Juffair is generally safe. The area is well-lit with security presence. Use ride-hailing apps for transport.' },
            ].map((faq, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6">
                <h3 className="font-bold mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Adliya Nightlife', href: '/guides/nightlife-adliya', emoji: '🎭' },
              { title: 'Juffair Restaurants', href: '/guides/juffair-dining', emoji: '🍽️' },
              { title: 'Ladies Nights', href: '/guides/ladies-nights', emoji: '💃' },
              { title: 'Nightlife Guide', href: '/guides/nightlife', emoji: '🌙' },
            ].map((guide) => (
              <Link key={guide.href} href={guide.href} className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group">
                <span className="text-2xl mb-2 block">{guide.emoji}</span>
                <span className="font-medium group-hover:text-purple-400 transition-colors">{guide.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Juffair Nightlife Guide 2026',
        description: 'Complete guide to nightlife in Juffair, Bahrain.',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2026-01-26',
        dateModified: lastUpdated,
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What is the nightlife like in Juffair?', acceptedAnswer: { '@type': 'Answer', text: 'Juffair has a diverse nightlife scene with various hotel bars, lounges, and entertainment venues.' }},
          { '@type': 'Question', name: 'What night is best for Juffair nightlife?', acceptedAnswer: { '@type': 'Answer', text: 'Thursday is the biggest night. Ladies nights typically run Tuesday and Wednesday.' }},
        ],
      })}} />
    </div>
  );
}
