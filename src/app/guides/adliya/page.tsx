import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import InternalLinks from '@/components/SEO/InternalLinks';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Utensils, Wine, Music, Coffee, Palette, Clock, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Adliya Bahrain Guide 2026 | Best Restaurants, Bars & Cafes in Block 338',
  description: 'Explore Adliya - Bahrain\'s artsy neighborhood. Best restaurants, bars, cafes, and nightlife in Block 338. Complete guide to dining and entertainment in Adliya.',
  keywords: 'Adliya Bahrain, Block 338, Adliya restaurants, Adliya bars, Adliya nightlife, Adliya cafes, best restaurants Adliya, things to do Adliya',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/adliya' },
  openGraph: {
    title: 'Adliya Bahrain Guide 2026 | Block 338 Dining & Nightlife',
    description: 'Your complete guide to Adliya - Bahrain\'s coolest neighborhood for dining, drinks, and art.',
    type: 'article',
    locale: 'en_BH',
  },
};

const faqs = [
  { q: 'What is Adliya known for in Bahrain?', a: 'Adliya is Bahrain\'s artsy, bohemian neighborhood known for Block 338 - a vibrant strip of restaurants, bars, cafes, and galleries. It\'s the go-to area for foodies, creatives, and those seeking a more relaxed nightlife vibe.' },
  { q: 'What are the best restaurants in Adliya?', a: 'Top Adliya restaurants include Calexico (Mexican), Masso (Italian), Lilou (French bistro), Takht Jamsheed (Persian), and Barn Adliya (American). The area offers diverse cuisines from casual to upscale.' },
  { q: 'Is Adliya good for nightlife?', a: 'Yes! Adliya offers a more relaxed nightlife compared to Juffair. Popular spots include JJ\'s Irish Pub for live music, Calexico for late-night drinks, and various wine bars and lounges along Block 338.' },
  { q: 'How do I get to Adliya?', a: 'Adliya is centrally located near Gudaibiya and Exhibition Road. It\'s a 10-minute drive from Seef Mall or Bahrain City Centre. Taxis and Uber/Careem are readily available.' },
];

const venues = [
  { name: 'Calexico', type: 'Mexican Restaurant & Bar', highlight: 'Tacos, tequila & late-night vibes' },
  { name: 'Lilou Artisan Patisserie', type: 'French Cafe', highlight: 'Brunch, pastries & Instagram-worthy' },
  { name: 'Masso', type: 'Italian Restaurant', highlight: 'Upscale Italian dining' },
  { name: 'JJ\'s Irish Pub', type: 'Pub', highlight: 'Live music & sports' },
  { name: 'Takht Jamsheed', type: 'Persian Restaurant', highlight: 'Authentic Persian cuisine' },
  { name: 'Barn Adliya', type: 'American Diner', highlight: 'Burgers & comfort food' },
  { name: 'Coco\'s', type: 'Cafe & Restaurant', highlight: 'All-day dining' },
  { name: 'Block 338 Art Galleries', type: 'Art Galleries', highlight: 'Local & international art' },
];

export default function AdliyaGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-amber-950/20 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Adliya', url: 'https://www.bahrainnights.com/guides/adliya' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-4">📍 Area Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Adliya</span> & Block 338
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Bahrain&apos;s artsy neighborhood — home to Block 338&apos;s eclectic mix of restaurants, bars, 
              galleries, and the city&apos;s creative community.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Restaurants', value: '30+', icon: Utensils },
              { label: 'Bars & Pubs', value: '10+', icon: Wine },
              { label: 'Cafes', value: '15+', icon: Coffee },
              { label: 'Art Galleries', value: '5+', icon: Palette },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-amber-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Why Adliya?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-xl font-bold text-amber-400 mb-3">The Vibe</h3>
              <p className="text-gray-300">Unlike the high-rise hotel bars of other areas, Adliya offers a more authentic, 
              neighborhood feel. It&apos;s where expats and locals mix, where you can walk between venues, and where 
              the creative community gathers. Think Brooklyn or Shoreditch vibes.</p>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-xl font-bold text-amber-400 mb-3">Block 338</h3>
              <p className="text-gray-300">The heart of Adliya is Block 338 — a pedestrian-friendly area packed with 
              dining options. From French patisseries to Mexican cantinas, Irish pubs to Persian restaurants, 
              it&apos;s a food lover&apos;s paradise within walking distance.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Top Spots in Adliya</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {venues.map((venue) => (
              <div key={venue.name} className="bg-white/5 rounded-xl p-5 hover:bg-white/10 transition-colors">
                <h3 className="font-bold text-amber-300 mb-1">{venue.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{venue.type}</p>
                <p className="text-sm text-gray-400">{venue.highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Best Times to Visit</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-xl p-6">
              <Clock className="w-8 h-8 text-amber-400 mb-3" />
              <h3 className="font-bold mb-2">Brunch (Fri-Sat)</h3>
              <p className="text-sm text-gray-400">Lilou and other cafes are packed for weekend brunch. Book ahead!</p>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <Utensils className="w-8 h-8 text-amber-400 mb-3" />
              <h3 className="font-bold mb-2">Dinner (7-10pm)</h3>
              <p className="text-sm text-gray-400">Prime dining time. Restaurants fill up quickly on weekends.</p>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <Music className="w-8 h-8 text-amber-400 mb-3" />
              <h3 className="font-bold mb-2">Late Night (10pm+)</h3>
              <p className="text-sm text-gray-400">JJ&apos;s and Calexico come alive with music and drinks.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6">
                <h3 className="font-bold mb-2 text-amber-300">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Do in Adliya */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-6">What to Do in Adliya</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/guides/shisha-lounges-bahrain" className="bg-white/5 hover:bg-white/10 rounded-lg p-4 transition-colors">
              <span className="text-xl mb-2 block">💨</span>
              <h3 className="font-bold text-sm">Shisha</h3>
              <p className="text-xs text-gray-400">Hookah spots in Adliya</p>
            </Link>
            <Link href="/guides/happy-hour-bahrain" className="bg-white/5 hover:bg-white/10 rounded-lg p-4 transition-colors">
              <span className="text-xl mb-2 block">🍺</span>
              <h3 className="font-bold text-sm">Happy Hour</h3>
              <p className="text-xs text-gray-400">Drink deals nearby</p>
            </Link>
            <Link href="/guides/best-date-night-bahrain" className="bg-white/5 hover:bg-white/10 rounded-lg p-4 transition-colors">
              <span className="text-xl mb-2 block">💕</span>
              <h3 className="font-bold text-sm">Date Night</h3>
              <p className="text-xs text-gray-400">Romantic spots</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Cuisine in Adliya */}
      <section className="py-8 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-lg font-bold mb-4">Cuisines Near Adliya</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { title: 'Italian', href: '/guides/best-italian-restaurants-bahrain' },
              { title: 'Japanese', href: '/guides/best-japanese-restaurants-bahrain' },
              { title: 'Lebanese', href: '/guides/best-lebanese-restaurants-bahrain' },
              { title: 'Mexican', href: '/guides/best-mexican-restaurants-bahrain' },
              { title: 'Steakhouses', href: '/guides/best-steakhouses-bahrain' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="px-3 py-1.5 bg-white/5 hover:bg-amber-500/20 rounded text-sm transition-colors">
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-6">Explore More Areas</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Juffair', href: '/guides/juffair-restaurants-bars', emoji: '🌃' },
              { title: 'Seef', href: '/guides/seef', emoji: '🏙️' },
              { title: 'Amwaj', href: '/guides/amwaj', emoji: '🏝️' },
              { title: 'Manama', href: '/guides/manama-city-guide', emoji: '🕌' },
            ].map((guide) => (
              <Link key={guide.href} href={guide.href} className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors flex items-center gap-3">
                <span className="text-2xl">{guide.emoji}</span>
                <span className="font-medium">{guide.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* More Guides */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-lg font-bold mb-4">Related Guides</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { title: 'Tonight', href: '/tonight' },
              { title: 'This Weekend', href: '/this-weekend' },
              { title: 'Nightlife', href: '/guides/nightlife' },
              { title: 'Live Music', href: '/guides/live-music' },
              { title: 'Best Views', href: '/guides/best-views-bahrain' },
              { title: 'Late Night Food', href: '/guides/best-late-night-food-bahrain' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded text-sm transition-colors">
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <InternalLinks 
        title="Explore More"
        links={[
          { title: 'All Guides', href: '/guides' },
          { title: 'Discover Places', href: '/places' },
          { title: 'Upcoming Events', href: '/events' },
          { title: 'Nightlife Guide', href: '/guides/nightlife' },
          { title: 'Best Restaurants', href: '/guides/restaurants' },
          { title: 'Juffair Area Guide', href: '/guides/juffair-restaurants-bars' },
        ]}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Adliya Bahrain Guide 2026',
        description: 'Complete guide to Adliya and Block 338 - restaurants, bars, cafes, and nightlife.',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2026-02-10', dateModified: '2026-02-10',
      })}} />
    </div>
  );
}
