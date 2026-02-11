import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, Briefcase, Clock, Wifi } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Business Lunch Spots in Bahrain 2026 | Professional Dining',
  description: 'Find the best restaurants for business lunches in Bahrain. Professional settings, efficient service, and quality food for client meetings and work lunches.',
  keywords: 'business lunch Bahrain, corporate dining Bahrain, client lunch Bahrain, professional restaurants Bahrain, work lunch Bahrain',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/best-business-lunch-bahrain' },
  openGraph: {
    title: 'Best Business Lunch Spots in Bahrain 2026',
    description: 'Professional restaurants perfect for business meetings and client lunches in Bahrain.',
    type: 'article', locale: 'en_US',
  },
};

const faqs = [
  { q: 'What are the best restaurants for business lunch in Bahrain?', a: 'Top choices include hotel restaurants (Four Seasons, Ritz-Carlton, Gulf Hotel), upscale venues in Bahrain Financial Harbour, and established restaurants in Seef. Look for professional ambiance, good service, and reasonable noise levels.' },
  { q: 'How much should I budget for a business lunch?', a: 'Quality business lunches range from 12-25 BD per person. Many hotels offer set lunch menus at 15-20 BD. For important client meetings, budget 25-40 BD to include drinks and coffee.' },
  { q: 'Which restaurants have private dining for business?', a: 'Hotels like Four Seasons, Ritz-Carlton, and Gulf Hotel offer private dining rooms. Restaurants like CUT, Mezzaluna, and some Bahrain Bay venues also have private spaces. Book well in advance.' },
  { q: 'What time works best for business lunch in Bahrain?', a: 'Standard business lunch time is 12:30-2:00 PM. Arrive promptly, as Bahraini business culture values punctuality. Some prefer later lunches (1:30-3 PM) to avoid the rush.' },
  { q: 'Are there business lunch deals in Bahrain?', a: 'Yes, many hotel restaurants offer business lunch set menus (2-3 courses for fixed price). These provide value while maintaining quality appropriate for professional meetings.' },
];

const restaurants = [
  {
    name: 'Capital Club',
    area: 'Bahrain Financial Harbour',
    rating: 5,
    priceRange: 'BD 18-30',
    businessFeatures: ['Private members club', 'Discreet setting', 'Impeccable service'],
    bestFor: 'High-level meetings, privacy',
  },
  {
    name: 'CUT by Wolfgang Puck',
    area: 'Four Seasons',
    rating: 5,
    priceRange: 'BD 25-45',
    businessFeatures: ['Prestigious address', 'Private rooms', 'Executive ambiance'],
    bestFor: 'Important clients, celebrating deals',
  },
  {
    name: 'Gulf Hotel Restaurants',
    area: 'Adliya',
    rating: 5,
    priceRange: 'BD 15-28',
    businessFeatures: ['Multiple venue options', 'Business lunch menus', 'Central location'],
    bestFor: 'Variety of cuisine choices',
  },
  {
    name: 'La Vinoteca',
    area: 'Adliya',
    rating: 4,
    priceRange: 'BD 15-25',
    businessFeatures: ['Mediterranean cuisine', 'Good wine selection', 'Professional vibe'],
    bestFor: 'Relaxed business discussions',
  },
  {
    name: 'Masso',
    area: 'Adliya',
    rating: 4,
    priceRange: 'BD 15-28',
    businessFeatures: ['Italian fine dining', 'Quiet atmosphere', 'Quality assured'],
    bestFor: 'Client entertainment',
  },
  {
    name: 'Hotel Set Lunches',
    area: 'Various Hotels',
    rating: 4,
    priceRange: 'BD 15-22',
    businessFeatures: ['Fixed price menus', 'Predictable quality', 'Quick service'],
    bestFor: 'Efficient business meals',
  },
  {
    name: 'Seef Area Restaurants',
    area: 'Seef District',
    rating: 4,
    priceRange: 'BD 12-22',
    businessFeatures: ['Near business offices', 'Variety of options', 'Parking available'],
    bestFor: 'Convenience, team lunches',
  },
  {
    name: 'Café chains (Upscale)',
    area: 'Various',
    rating: 3,
    priceRange: 'BD 8-15',
    businessFeatures: ['WiFi', 'Casual meetings', 'Quick turnaround'],
    bestFor: 'Informal meetings, coffee catch-ups',
  },
];

export default function BestBusinessLunchBahrainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Best Business Lunch', url: 'https://www.bahrainnights.com/guides/best-business-lunch-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-slate-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium mb-4">💼 Business Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best <span className="bg-gradient-to-r from-blue-400 to-slate-400 bg-clip-text text-transparent">Business Lunch</span> Spots in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Professional settings, efficient service, and cuisine that impresses — find the 
              perfect restaurants for client meetings and corporate dining.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            In Bahrain&apos;s business culture, where you lunch matters. The right venue signals 
            professionalism, creates a comfortable environment for discussion, and can help 
            close deals. Hotel restaurants remain popular for their consistent quality and 
            discrete settings, while Financial Harbour area venues cater specifically to the 
            business community.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Key factors for business dining: appropriate noise levels for conversation, 
            professional service that doesn&apos;t interrupt, quality food served efficiently, 
            and a setting that matches the importance of the meeting.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Top Business Lunch Venues</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {restaurants.map((restaurant) => (
              <div key={restaurant.name} className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      {restaurant.name}
                      <Briefcase className="w-4 h-4 text-blue-400" />
                    </h3>
                    <p className="text-blue-400 text-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {restaurant.area}
                    </p>
                  </div>
                  <div className="font-bold">{restaurant.priceRange}</div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {restaurant.businessFeatures.map((f) => (
                    <span key={f} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">{f}</span>
                  ))}
                </div>
                <p className="text-xs text-gray-500"><strong>Best for:</strong> {restaurant.bestFor}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Business Lunch FAQs</h2>
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
          <h2 className="text-xl font-bold mb-6">More Dining Guides</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { title: 'Steakhouses', href: '/guides/best-steakhouses-bahrain' },
              { title: 'Italian', href: '/guides/best-italian-restaurants-bahrain' },
              { title: 'Japanese', href: '/guides/best-japanese-restaurants-bahrain' },
              { title: 'Seafood', href: '/guides/best-seafood-bahrain' },
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
        headline: 'Best Business Lunch Spots in Bahrain 2026',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2026-02-11', dateModified: '2026-02-11',
      })}} />
    </div>
  );
}
