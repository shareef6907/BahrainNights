import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, Eye, Sun, Moon, Camera } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Views in Bahrain 2026 | Rooftop Bars, Restaurants & Lookouts',
  description: 'Discover the best views in Bahrain. Rooftop bars, waterfront restaurants, skyline views, and sunset spots. Where to see Bahrain from above.',
  keywords: 'best views Bahrain, rooftop bars Bahrain, skyline views Bahrain, sunset spots Bahrain, Bahrain viewpoints, restaurants with views',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/best-views-bahrain' },
  openGraph: {
    title: 'Best Views in Bahrain 2026',
    description: 'Find the most stunning viewpoints, rooftop bars, and restaurants with views in Bahrain.',
    type: 'article', locale: 'en_US',
  },
};

const faqs = [
  { q: 'Where are the best rooftop bars in Bahrain?', a: 'Top rooftop bars include CU-BA at Ritz-Carlton, Wyndham rooftop, Marriott rooftop bars, and various hotel sky lounges. Most offer skyline or sea views with cocktails and light bites.' },
  { q: 'Where can I watch the sunset in Bahrain?', a: 'Best sunset spots include Bahrain Bay promenade, Al Dar Islands, the Four Seasons waterfront, beach clubs in Zallaq, and the Corniche. West-facing rooftop bars also offer sunset views.' },
  { q: 'Which restaurants have the best views in Bahrain?', a: 'Restaurants with standout views include Re Asian Cuisine (Four Seasons bay view), Bahrain Bay venues, Ritz-Carlton waterfront restaurants, and Zallaq beach resort dining.' },
  { q: 'Are there observation decks in Bahrain?', a: 'Bahrain doesn\'t have dedicated observation decks like some cities, but hotel bars and restaurants at higher floors offer panoramic views. Bahrain World Trade Center has limited observation access during events.' },
  { q: 'What time is best for views in Bahrain?', a: 'Golden hour (30 min before sunset) offers the best photography. Evening views (after 7 PM in winter, 8 PM in summer) showcase city lights. Daytime views can be hazy in summer due to humidity.' },
];

const viewpoints = [
  {
    name: 'CU-BA (Ritz-Carlton)',
    area: 'Manama',
    rating: 5,
    viewType: 'Skyline & Sea',
    highlights: ['Outdoor terrace', 'Cocktails', 'Sunset views', 'City lights'],
    bestFor: 'Sunset drinks, date nights',
  },
  {
    name: 'Re Asian Cuisine',
    area: 'Four Seasons',
    rating: 5,
    viewType: 'Bahrain Bay',
    highlights: ['Floor-to-ceiling windows', 'Water features', 'Fine dining'],
    bestFor: 'Special dinners with views',
  },
  {
    name: 'Bahrain Bay Promenade',
    area: 'Bahrain Bay',
    rating: 5,
    viewType: 'Skyline & Water',
    highlights: ['Free access', 'Walking paths', 'Fountain shows', 'Photography'],
    bestFor: 'Casual strolls, free views',
  },
  {
    name: 'Four Seasons Waterfront',
    area: 'Bahrain Bay',
    rating: 5,
    viewType: 'Bay & City',
    highlights: ['Multiple venues', 'Sunset views', 'Upscale atmosphere'],
    bestFor: 'Elegant evening',
  },
  {
    name: 'Zallaq Beach Resorts',
    area: 'Zallaq',
    rating: 4,
    viewType: 'Sea & Sunset',
    highlights: ['Beach views', 'Sunset over Gulf', 'Resort access'],
    bestFor: 'Beach sunset dining',
  },
  {
    name: 'Hotel Rooftop Bars',
    area: 'Various',
    rating: 4,
    viewType: 'City Panoramas',
    highlights: ['Elevated views', 'Cocktails', 'AC option inside'],
    bestFor: 'Evening drinks, celebrations',
  },
  {
    name: 'Manama Corniche',
    area: 'Manama',
    rating: 4,
    viewType: 'Sea & City',
    highlights: ['Free', 'Walking/cycling', 'Local atmosphere'],
    bestFor: 'Morning walks, casual views',
  },
  {
    name: 'Al Dar Islands',
    area: 'Off Coast',
    rating: 4,
    viewType: 'Open Sea',
    highlights: ['Island escape', 'Beach views', 'Boat trip included'],
    bestFor: 'Day trip views',
  },
];

export default function BestViewsBahrainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-cyan-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Best Views', url: 'https://www.bahrainnights.com/guides/best-views-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-medium mb-4">📸 View Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Views</span> in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Rooftop bars, waterfront dining, sunset spots, and the best places to see 
              Bahrain&apos;s skyline and stunning Gulf waters.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Despite being a small island nation, Bahrain offers some spectacular views. The 
            modern skyline of Bahrain Bay, the glittering lights of Manama at night, and 
            the endless horizons over the Arabian Gulf create memorable vistas for visitors 
            and residents alike.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            The best views come with a cocktail in hand at rooftop bars, through 
            floor-to-ceiling windows at waterfront restaurants, or freely from promenades 
            and beaches. Sunset is the magic hour — when the Gulf turns golden and the city 
            lights begin to twinkle.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Best Viewpoints & Venues</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {viewpoints.map((venue) => (
              <div key={venue.name} className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      {venue.name}
                      <Eye className="w-4 h-4 text-cyan-400" />
                    </h3>
                    <p className="text-cyan-400 text-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {venue.area}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs bg-cyan-500/30 text-cyan-200 px-2 py-1 rounded">
                      {venue.viewType}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {venue.highlights.map((h) => (
                    <span key={h} className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded">{h}</span>
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
          <h2 className="text-3xl font-bold mb-12 text-center">Views FAQs</h2>
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

      {/* Views by Area */}
      <section className="py-12 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-6">Best View Locations</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link href="/guides/bahrain-bay" className="bg-white/5 hover:bg-cyan-500/10 rounded-lg p-4 transition-colors">
              <h3 className="font-bold">Bahrain Bay</h3>
              <p className="text-xs text-gray-400">Skyline & water</p>
            </Link>
            <Link href="/guides/hotels-bahrain-bay" className="bg-white/5 hover:bg-cyan-500/10 rounded-lg p-4 transition-colors">
              <h3 className="font-bold">Four Seasons</h3>
              <p className="text-xs text-gray-400">Bay views</p>
            </Link>
            <Link href="/guides/zallaq-guide" className="bg-white/5 hover:bg-cyan-500/10 rounded-lg p-4 transition-colors">
              <h3 className="font-bold">Zallaq</h3>
              <p className="text-xs text-gray-400">Beach sunsets</p>
            </Link>
            <Link href="/guides/amwaj" className="bg-white/5 hover:bg-cyan-500/10 rounded-lg p-4 transition-colors">
              <h3 className="font-bold">Amwaj</h3>
              <p className="text-xs text-gray-400">Island views</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-6">More Guides</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { title: 'Date Night', href: '/guides/best-date-night-bahrain' },
              { title: 'Rooftop Bars', href: '/guides/nightlife' },
              { title: 'Beach Clubs', href: '/guides/beach-clubs' },
              { title: 'Happy Hour', href: '/guides/happy-hour-bahrain' },
              { title: 'Shisha Lounges', href: '/guides/shisha-lounges-bahrain' },
              { title: 'Italian Restaurants', href: '/guides/best-italian-restaurants-bahrain' },
            ].map((guide) => (
              <Link key={guide.href} href={guide.href} className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors">
                {guide.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Related Content */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-lg font-bold mb-4">Plan Your Evening</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { title: 'Tonight', href: '/tonight' },
              { title: 'This Weekend', href: '/this-weekend' },
              { title: 'New Year\'s Eve', href: '/guides/new-years-eve-bahrain' },
              { title: 'Valentine\'s Day', href: '/guides/valentines-day-bahrain' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded text-sm transition-colors">
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Best Views in Bahrain 2026',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2026-02-11', dateModified: '2026-02-11',
      })}} />
    </div>
  );
}
