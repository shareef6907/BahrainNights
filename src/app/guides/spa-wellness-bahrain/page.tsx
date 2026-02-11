import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, Sparkles, Heart, Waves } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Spas & Wellness in Bahrain 2026 | Massage & Treatments',
  description: 'Find the best spas and wellness centers in Bahrain. Luxury hotel spas, massage therapies, hammams, and relaxation experiences.',
  keywords: 'spa Bahrain, massage Bahrain, wellness Bahrain, best spa Bahrain, hammam Bahrain, thalassotherapy Bahrain',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/spa-wellness-bahrain' },
  openGraph: {
    title: 'Best Spas & Wellness in Bahrain 2026',
    description: 'Guide to luxury spas, wellness centers, and relaxation experiences in Bahrain.',
    type: 'article', locale: 'en_US',
  },
};

const faqs = [
  { q: 'What are the best spas in Bahrain?', a: 'Top spas include Sofitel Thalassa Spa (sea treatments), ESPA at Four Seasons, Ritz-Carlton Spa, and Zallaq beach resorts. Hotel spas generally offer the highest quality treatments and facilities.' },
  { q: 'How much do spa treatments cost in Bahrain?', a: 'Massage starts around 30-40 BD at mid-range spas, 50-100 BD at luxury hotel spas. Full spa days range from 80-200 BD. Facials and specialty treatments vary widely. Many offer packages for better value.' },
  { q: 'Are there hammams in Bahrain?', a: 'Yes, several spas offer traditional hammam treatments including body scrubs and steam rooms. Ritz-Carlton, some hotel spas, and dedicated wellness centers provide authentic hammam experiences.' },
  { q: 'Do I need to book spa treatments in advance?', a: 'Yes, especially for weekends and popular treatments. Book 2-3 days ahead for regular appointments, a week ahead for special packages. Walk-ins are possible on weekdays but not guaranteed.' },
  { q: 'Are there couples spa treatments?', a: 'Most luxury spas offer couples rooms and packages. Four Seasons, Ritz-Carlton, and Sofitel are particularly good for romantic spa experiences. Book well ahead for Valentine\'s Day or anniversaries.' },
];

const spas = [
  {
    name: 'Sofitel Thalassa Sea & Spa',
    area: 'Zallaq',
    rating: 5,
    specialty: 'Thalassotherapy (sea treatments)',
    priceRange: 'BD 60-150',
    highlights: ['Sea water treatments', 'Beach access', 'Comprehensive facilities'],
  },
  {
    name: 'ESPA at Four Seasons',
    area: 'Bahrain Bay',
    rating: 5,
    specialty: 'Luxury treatments',
    priceRange: 'BD 70-180',
    highlights: ['Bay views', 'Premium products', 'Expert therapists'],
  },
  {
    name: 'Ritz-Carlton Spa',
    area: 'Manama',
    rating: 5,
    specialty: 'Full-service luxury',
    priceRange: 'BD 60-160',
    highlights: ['Hammam', 'Couples treatments', 'Private suites'],
  },
  {
    name: 'ART Rotana Spa',
    area: 'Amwaj',
    rating: 4,
    specialty: 'Island relaxation',
    priceRange: 'BD 40-100',
    highlights: ['Beach resort setting', 'Good value', 'Range of treatments'],
  },
  {
    name: 'The Retreat Spa',
    area: 'Various',
    rating: 4,
    specialty: 'Day spa',
    priceRange: 'BD 25-70',
    highlights: ['Accessible pricing', 'Professional service', 'Multiple locations'],
  },
  {
    name: 'Hotel Day Spas',
    area: 'Various Hotels',
    rating: 4,
    specialty: 'Convenience',
    priceRange: 'BD 35-90',
    highlights: ['Many options', 'Often include pool', 'Day packages'],
  },
];

export default function SpaWellnessBahrainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Spa & Wellness', url: 'https://www.bahrainnights.com/guides/spa-wellness-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium mb-4">💆 Wellness Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Spas & Wellness</span> in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Luxury hotel spas, thalassotherapy, hammams, and wellness retreats 
              for the ultimate relaxation experience.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Bahrain&apos;s spa scene punches above its weight, with world-class facilities at 
            major hotels and unique offerings like Sofitel&apos;s thalassotherapy spa using 
            Gulf sea water. Whether you&apos;re seeking a quick massage, a full spa day, or 
            a wellness retreat, the kingdom delivers.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            <strong className="text-purple-400">Best value tip:</strong> Look for spa packages 
            that include pool and beach access — you get a full day of relaxation for not 
            much more than the treatment alone.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Top Spas in Bahrain</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {spas.map((spa) => (
              <div key={spa.name} className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      {spa.name}
                      <Sparkles className="w-4 h-4 text-purple-400" />
                    </h3>
                    <p className="text-purple-400 text-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {spa.area}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{spa.priceRange}</div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-3"><strong>Specialty:</strong> {spa.specialty}</p>
                <div className="flex flex-wrap gap-2">
                  {spa.highlights.map((h) => (
                    <span key={h} className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">{h}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Spa & Wellness FAQs</h2>
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
              { title: 'Valentine\'s Day', href: '/guides/valentines-day-bahrain' },
              { title: 'Mother\'s Day', href: '/guides/mothers-day-bahrain' },
              { title: 'Date Night', href: '/guides/best-date-night-bahrain' },
              { title: 'Beach Clubs', href: '/guides/beach-clubs' },
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
        headline: 'Best Spas & Wellness in Bahrain 2026',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2026-02-11', dateModified: '2026-02-11',
      })}} />
    </div>
  );
}
