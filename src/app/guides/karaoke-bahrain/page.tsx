import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, Music, Clock, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Karaoke in Bahrain 2026 | KTV Rooms & Karaoke Bars',
  description: 'Find the best karaoke spots in Bahrain. Private KTV rooms, karaoke bars, and sing-along venues. Complete guide with prices and locations.',
  keywords: 'karaoke Bahrain, KTV Bahrain, karaoke bar Bahrain, private karaoke room Bahrain, singing Bahrain',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/karaoke-bahrain' },
  openGraph: {
    title: 'Best Karaoke in Bahrain 2026',
    description: 'Discover the top karaoke venues in Bahrain - KTV rooms and karaoke bars.',
    type: 'article', locale: 'en_US',
  },
};

const faqs = [
  { q: 'Where can I do karaoke in Bahrain?', a: 'Popular karaoke spots include K-Square KTV (Seef), Red Box Karaoke (Juffair), various hotel lounges with karaoke nights, and some Asian restaurants with private KTV rooms. Most offer private room rentals.' },
  { q: 'How much does karaoke cost in Bahrain?', a: 'Private karaoke rooms typically cost 15-35 BD per hour depending on room size. Some venues offer packages including food and drinks. Happy hour rates are often available on weekdays.' },
  { q: 'Do I need to book karaoke rooms in advance?', a: 'Booking is recommended, especially on weekends (Thursday-Saturday). Walk-ins may be available on quieter weekday evenings. Most venues accept phone or WhatsApp bookings.' },
  { q: 'What songs are available at Bahrain karaoke?', a: 'Most KTV venues offer extensive libraries including English pop, Arabic songs, Filipino classics, Hindi hits, Korean K-pop, Chinese songs, and more. Song selection varies by venue.' },
  { q: 'Can I bring my own drinks to karaoke?', a: 'Most venues don\'t allow outside food or drinks. KTV rooms typically have F&B minimum spend requirements. Some hotels allow bringing drinks from their own bars.' },
];

const venues = [
  {
    name: 'K-Square KTV',
    area: 'Seef',
    rating: 4,
    priceRange: 'BD 20-35/hour',
    features: ['Private rooms', 'Large song library', 'Food menu', 'Latest system'],
    bestFor: 'Groups, parties',
  },
  {
    name: 'Red Box Karaoke',
    area: 'Juffair',
    rating: 4,
    priceRange: 'BD 18-30/hour',
    features: ['Multiple room sizes', 'Asian food', 'Touch screens', 'Good sound'],
    bestFor: 'Friends, Asian community',
  },
  {
    name: 'Hotel Karaoke Nights',
    area: 'Various',
    rating: 3,
    priceRange: 'Free entry',
    features: ['Open mic style', 'Full bar', 'No room rental', 'Social atmosphere'],
    bestFor: 'Spontaneous singing, meeting people',
  },
  {
    name: 'Asian Restaurant KTV',
    area: 'Various',
    rating: 3,
    priceRange: 'BD 15-25/hour',
    features: ['Smaller rooms', 'Asian cuisine', 'Local vibe', 'Budget-friendly'],
    bestFor: 'Casual nights, small groups',
  },
];

export default function KaraokeBahrainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Karaoke in Bahrain', url: 'https://www.bahrainnights.com/guides/karaoke-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium mb-4">🎤 Activity Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Karaoke</span> in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Belt out your favorite songs in private KTV rooms or join open mic nights — 
              discover Bahrain&apos;s best karaoke spots.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Karaoke culture thrives in Bahrain, driven largely by the Filipino and Asian communities 
            who&apos;ve brought their love of singing to the kingdom. Whether you prefer the privacy of 
            a dedicated KTV room where you can sing with just your friends, or the social buzz of 
            an open karaoke night at a bar, Bahrain has options.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Private karaoke rooms (KTV) are the most popular choice, offering the freedom to sing 
            without judgment, control your own playlist, and enjoy food and drinks in comfort. 
            Perfect for birthday celebrations, team outings, or just a fun night with friends.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Karaoke Venues</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {venues.map((venue) => (
              <div key={venue.name} className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold">{venue.name}</h3>
                    <p className="text-purple-400 text-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {venue.area}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm">{venue.priceRange}</div>
                    <div className="flex items-center gap-0.5 justify-end">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < venue.rating ? 'text-purple-400 fill-purple-400' : 'text-gray-600'}`} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {venue.features.map((f) => (
                    <span key={f} className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">{f}</span>
                  ))}
                </div>
                <p className="text-xs text-gray-500"><strong>Best for:</strong> {venue.bestFor}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Karaoke FAQs</h2>
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
          <h2 className="text-xl font-bold mb-6">More Activities</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { title: 'Bowling', href: '/guides/bowling-bahrain' },
              { title: 'Escape Rooms', href: '/guides/escape-rooms-bahrain' },
              { title: 'Nightlife', href: '/guides/nightlife' },
              { title: 'Live Music', href: '/guides/live-music-bahrain' },
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
        headline: 'Best Karaoke in Bahrain 2026',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2026-02-11', dateModified: '2026-02-11',
      })}} />
    </div>
  );
}
