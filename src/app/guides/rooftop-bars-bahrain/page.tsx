import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Wine, MapPin, Clock, Star, Building2,
  ArrowRight, Sparkles, Eye, Music, Sun
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import InternalLinks from '@/components/SEO/InternalLinks';

export const metadata: Metadata = {
  title: 'Best Rooftop Bars in Bahrain 2026 | Sky Lounges & Terrace Bars',
  description: 'Discover the best rooftop bars in Bahrain with stunning skyline views. From the 50th floor Blue Moon Lounge to Block 338 terraces, find your perfect sky-high spot.',
  keywords: 'rooftop bars Bahrain, sky lounge Bahrain, terrace bars Manama, best views Bahrain, rooftop restaurants Bahrain, Block 338 rooftop, Juffair rooftop bars',
  openGraph: {
    title: 'Best Rooftop Bars in Bahrain 2026 | Sky Lounges & Terrace Bars',
    description: 'The complete guide to Bahrain\'s best rooftop bars with stunning city views, signature cocktails, and vibrant nightlife.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/rooftop-bars-bahrain',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/rooftop-bars-bahrain',
  },
};

const rooftopBars = [
  {
    name: 'Blue Moon Lounge',
    hotel: 'Four Seasons Hotel Bahrain Bay',
    floor: '50th floor',
    location: 'Bahrain Bay',
    description: 'The highest bar in Bahrain with Wolfgang Puck\'s signature sushi bar and handcrafted cocktails. Unmatched panoramic views.',
    vibe: 'Ultra-premium, sophisticated',
    bestFor: 'Special occasions, impressive dates',
    hours: 'Sun 12:30pm-12am, Wed-Fri 6pm-2am',
    tip: 'Book a window table for sunset views. Smart casual dress code.',
    featured: true,
  },
  {
    name: 'Txoko Sky Lounge',
    hotel: 'The Domain Bahrain Hotel',
    floor: '36th floor',
    location: 'Diplomatic Area',
    description: 'Level 36 views over Manama with live music and creative cocktails. Enclosed design means year-round comfort.',
    vibe: 'Chic, live entertainment',
    bestFor: 'Cocktails with views, live music',
    hours: 'Mon-Sat 4pm-2am',
    tip: 'Great for any season thanks to the enclosed design.',
    featured: true,
  },
  {
    name: 'Alto',
    hotel: 'Downtown Rotana',
    floor: '25th floor',
    location: 'Manama',
    description: 'Perfect views of the Bahrain World Trade Centre. Something special every night of the week.',
    vibe: 'Trendy, vibrant',
    bestFor: 'Regular nights out, daily deals',
    hours: 'Daily 5pm-2am',
    tip: 'Right next to Manama Souq — great for a pre-dinner wander.',
    featured: true,
  },
  {
    name: 'SUSHISAMBA',
    hotel: 'Bahrain Financial Harbour',
    floor: 'Elevated',
    location: 'Financial Harbour',
    description: 'Brazilian, Peruvian, and Japanese cuisine with incredible city views. Global dining brand with a stunning setup.',
    vibe: 'Vibrant, international',
    bestFor: 'Food & views, groups',
    hours: 'Sun-Wed 12:30pm-12am, Thu-Fri 1pm-2am',
    tip: 'Try the signature samba rolls and robata dishes.',
    featured: false,
  },
  {
    name: 'Roka',
    hotel: 'Pearl House, Bahrain Harbour',
    floor: '8th floor',
    location: 'Bahrain Harbour',
    description: 'World-class robata and sushi with stunning waterfront views. One of Bahrain\'s most scenic dining spots.',
    vibe: 'Upscale, scenic',
    bestFor: 'Sunset dining, special occasions',
    hours: 'Daily 5:30pm-2:30am',
    tip: 'Book terrace seating during cooler months.',
    featured: false,
  },
  {
    name: 'Taiga Sky',
    hotel: 'The Seven Hotel',
    floor: 'Rooftop',
    location: 'Juffair',
    description: 'New in 2024 — Arabian and international music, cool interiors, global brand with venues worldwide.',
    vibe: 'Trendy, international',
    bestFor: 'New hotspots, mixed crowd',
    hours: 'Daily 6pm-2:30am',
    tip: 'Try the smoked prawn saganaki or veal cheeks.',
    featured: false,
  },
  {
    name: 'Clay',
    hotel: 'The Terminal',
    floor: 'Rooftop',
    location: 'Block 338, Adliya',
    description: 'Nikkei cuisine (Japanese-Peruvian fusion) in a stunning setting. Business lunch deal BD15.',
    vibe: 'Artsy, fusion',
    bestFor: 'Foodie experiences, Adliya nights',
    hours: 'Sun-Tue 12:30pm-1am, Wed-Fri 12:30pm-2:30am',
    tip: 'Combine with other Block 338 spots for a full Adliya experience.',
    featured: false,
  },
  {
    name: 'Halo',
    hotel: 'Block 338',
    floor: 'Rooftop',
    location: 'Adliya',
    description: 'Chic modern lounge with international cuisine and creative cocktails under the stars.',
    vibe: 'Modern, chic',
    bestFor: 'Happy hour (6-9pm Sat-Wed)',
    hours: 'Daily 6pm-2:30am',
    tip: 'Best rooftop happy hour in Adliya.',
    featured: false,
  },
  {
    name: 'Volto',
    hotel: 'Block 338',
    floor: 'Rooftop',
    location: 'Adliya',
    description: 'Spectacular aerial dance performances, live DJ, and al fresco dining. Unique entertainment concept.',
    vibe: 'Entertainment, vibrant',
    bestFor: 'Friday brunch, performances',
    hours: 'Daily 7pm-3am, Fri brunch 2-6pm',
    tip: 'The Friday brunch with performances is legendary.',
    featured: false,
  },
  {
    name: 'Gallery 21',
    hotel: 'Standalone',
    floor: 'Multi-level',
    location: 'Block 338, Adliya',
    description: 'Home to Mai Tai Lounge, Genwa, and nightclub Void. Multiple rooftop experiences in one building.',
    vibe: 'Eclectic, diverse',
    bestFor: 'Variety, bar hopping',
    hours: 'Daily 12pm-2am',
    tip: 'Start at Mai Tai for drinks, then explore Genwa or Void.',
    featured: false,
  },
  {
    name: 'MOOD Rooftop Lounge',
    hotel: 'Royal Saray Resort',
    floor: 'Rooftop',
    location: 'Seef District',
    description: 'Exotic-inspired venue from the Dubai and Egypt brand. Live entertainment, food, cocktails, and shisha.',
    vibe: 'Exotic, party',
    bestFor: 'Late nights, entertainment',
    hours: 'Daily 8pm-2am',
    tip: 'Popular with a mixed international crowd.',
    featured: false,
  },
  {
    name: 'Cocoluna',
    hotel: 'Hilton Bahrain',
    floor: 'Rooftop',
    location: 'Juffair',
    description: 'Views and vibes with bites, cocktails, and shisha. Ladies get 3 free drinks on Wednesdays.',
    vibe: 'Lounge, social',
    bestFor: 'Ladies nights (Wed), shisha',
    hours: 'Daily 1pm-2am',
    tip: 'Half-off shisha Sun-Wed. Ladies night Wednesdays 7pm-12am.',
    featured: false,
  },
  {
    name: 'Terrace@28',
    hotel: 'Wyndham Garden',
    floor: '28th floor',
    location: 'Juffair',
    description: 'Open-air rooftop club nights with rotating DJs. Central bar, lounge tables, Mediterranean dishes.',
    vibe: 'Club nights, social',
    bestFor: 'Outdoor parties, DJs',
    hours: 'Daily 5pm-2am',
    tip: 'Different DJ styles throughout the week.',
    featured: false,
  },
  {
    name: 'Brasero Atlántico',
    hotel: 'Sheraton Bahrain',
    floor: 'Rooftop',
    location: 'Manama',
    description: 'Ship-themed Argentine grill with skyline views. The bar sits like a docked ship — staff are "sailors"!',
    vibe: 'Unique, steakhouse',
    bestFor: 'Argentine steaks, unique concept',
    hours: 'Daily 12pm-2am',
    tip: 'The fire-grilled steaks are shipped from Argentina.',
    featured: false,
  },
  {
    name: 'Time Out Market Rooftop',
    hotel: 'City Centre Bahrain',
    floor: 'Rooftop',
    location: 'Seef District',
    description: 'Food hall rooftop with 14 restaurant options below. Drinks, shisha, and live entertainment.',
    vibe: 'Casual, foodie',
    bestFor: 'Groups, variety',
    hours: 'Sun-Wed 10am-10pm, Thu-Sat 10am-12am',
    tip: 'Rooftop open during cooler months — call ahead.',
    featured: false,
  },
];

const byArea = {
  'Adliya / Block 338': ['Clay', 'Halo', 'Volto', 'Gallery 21'],
  'Juffair': ['Taiga Sky', 'Cocoluna', 'Terrace@28'],
  'Financial District / Harbour': ['Blue Moon Lounge', 'SUSHISAMBA', 'Roka', 'Alto'],
  'Seef': ['MOOD Rooftop Lounge', 'Time Out Market Rooftop'],
};

const bestFor = [
  { emoji: '🌅', title: 'Sunset Views', venues: ['Blue Moon Lounge', 'Roka', 'Alto'] },
  { emoji: '🍸', title: 'Cocktails', venues: ['Txoko Sky Lounge', 'Halo', 'SUSHISAMBA'] },
  { emoji: '💃', title: 'Ladies Night', venues: ['Cocoluna', 'Halo', 'MOOD Rooftop Lounge'] },
  { emoji: '🎵', title: 'Live Music', venues: ['Txoko Sky Lounge', 'Volto', 'Terrace@28'] },
  { emoji: '🍽️', title: 'Fine Dining', venues: ['Blue Moon Lounge', 'Roka', 'SUSHISAMBA'] },
  { emoji: '💨', title: 'Shisha', venues: ['Cocoluna', 'MOOD Rooftop Lounge', 'Halo'] },
];

export default function RooftopBarsBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  const featuredVenues = rooftopBars.filter(v => v.featured);
  const otherVenues = rooftopBars.filter(v => !v.featured);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Rooftop Bars', url: 'https://www.bahrainnights.com/guides/rooftop-bars-bahrain' },
        ]}
      />

      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm font-medium mb-4">
              🌃 Sky High Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                Rooftop Bars
              </span>
              {' '}in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From the 50th floor Blue Moon Lounge to the trendy terraces of Block 338, 
              discover Bahrain's best sky-high spots for cocktails, views, and vibes.
            </p>
            <p className="text-sm text-gray-500 mt-4">Last updated: {lastUpdated}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Rooftop Bars', value: '15+', icon: Wine },
              { label: 'Highest Floor', value: '50th', icon: Building2 },
              { label: 'Areas Covered', value: '4', icon: MapPin },
              { label: 'With Views', value: '100%', icon: Eye },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-indigo-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Venues */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">🏆 Top Picks</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredVenues.map((venue) => (
              <div key={venue.name} className="bg-gradient-to-br from-indigo-500/20 to-purple-500/10 rounded-2xl p-6 border border-indigo-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded">Featured</span>
                </div>
                <h3 className="text-xl font-bold mb-1">{venue.name}</h3>
                <p className="text-indigo-300 text-sm mb-2">{venue.hotel} • {venue.floor}</p>
                <p className="text-gray-300 text-sm mb-3">{venue.description}</p>
                <div className="space-y-1 text-xs text-gray-400 mb-3">
                  <p><strong>Best for:</strong> {venue.bestFor}</p>
                  <p><strong>Hours:</strong> {venue.hours}</p>
                </div>
                <p className="text-xs text-indigo-300 italic">💡 {venue.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best For Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Find Your Vibe</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {bestFor.map((category) => (
              <div key={category.title} className="bg-white/5 rounded-xl p-5">
                <div className="text-2xl mb-2">{category.emoji}</div>
                <h3 className="font-bold text-indigo-400 mb-2">{category.title}</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  {category.venues.map((v) => (
                    <li key={v}>{v}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Venues */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">All Rooftop Bars</h2>
          
          <div className="space-y-6">
            {otherVenues.map((venue) => (
              <div key={venue.name} className="bg-white/5 rounded-2xl p-6">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold">{venue.name}</h3>
                  <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded">
                    {venue.floor}
                  </span>
                  <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {venue.location}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-2">{venue.hotel}</p>
                <p className="text-gray-300 mb-3">{venue.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm mb-3">
                  <p><strong className="text-gray-400">Vibe:</strong> {venue.vibe}</p>
                  <p><strong className="text-gray-400">Best for:</strong> {venue.bestFor}</p>
                  <p className="col-span-2"><strong className="text-gray-400">Hours:</strong> {venue.hours}</p>
                </div>
                <p className="text-xs text-indigo-300 italic">💡 {venue.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By Area */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">By Area</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(byArea).map(([area, venues]) => (
              <div key={area} className="bg-white/5 rounded-xl p-6">
                <h3 className="font-bold text-indigo-400 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5" /> {area}
                </h3>
                <ul className="space-y-2">
                  {venues.map((v) => (
                    <li key={v} className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="text-indigo-400">•</span> {v}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Rooftop Tips</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Best Season', text: 'October to April is perfect for outdoor rooftops. Summer months, go for enclosed venues like Blue Moon or Txoko.' },
              { title: 'Sunset Timing', text: 'Arrive 30-45 minutes before sunset for the best views. Book ahead for premium spots.' },
              { title: 'Dress Code', text: 'Most rooftop bars are smart casual. Hotel venues may be stricter — no shorts or flip flops.' },
              { title: 'Reservations', text: 'Thursday and Friday nights get busy. Book ahead, especially for Blue Moon, Roka, and SUSHISAMBA.' },
            ].map((tip) => (
              <div key={tip.title} className="bg-indigo-500/10 rounded-xl p-5">
                <h3 className="font-bold text-indigo-400 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-300">{tip.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More Nightlife</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guides/nightlife" className="px-6 py-3 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-lg">
              Full Nightlife Guide
            </Link>
            <Link href="/guides/happy-hour-bahrain" className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg">
              Happy Hours
            </Link>
            <Link href="/lounges-bars" className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg">
              All Bars & Lounges
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
              { q: 'What is the highest rooftop bar in Bahrain?', a: 'Blue Moon Lounge at Four Seasons Bahrain Bay is on the 50th floor — the highest bar in Bahrain with unmatched panoramic views.' },
              { q: 'Are rooftop bars open year-round?', a: 'Many are, but outdoor terraces may close in summer (June-September). Enclosed rooftop bars like Blue Moon Lounge and Txoko Sky Lounge are comfortable year-round.' },
              { q: 'What should I wear to a rooftop bar in Bahrain?', a: 'Smart casual is standard. For hotel venues like Four Seasons or The Domain, dress slightly more formal. Avoid shorts and sandals at premium venues.' },
              { q: 'Do rooftop bars have happy hours?', a: 'Yes! Halo has happy hour 6-9pm (Sat-Wed), and many others have daily deals. Check our happy hour guide for full details.' },
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
              { title: 'Nightlife Guide', href: '/guides/nightlife', emoji: '🎉' },
              { title: 'Happy Hours', href: '/guides/happy-hour-bahrain', emoji: '🍹' },
              { title: 'Ladies Nights', href: '/ladies-night-bahrain', emoji: '👠' },
              { title: 'Best Restaurants', href: '/guides/restaurants', emoji: '🍽️' },
            ].map((guide) => (
              <Link key={guide.href} href={guide.href} className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors">
                <span className="text-2xl mb-2 block">{guide.emoji}</span>
                <span className="font-medium">{guide.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Best Rooftop Bars in Bahrain 2026',
        description: 'Complete guide to rooftop bars in Bahrain with stunning skyline views.',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2026-02-24',
        dateModified: lastUpdated,
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What is the highest rooftop bar in Bahrain?', acceptedAnswer: { '@type': 'Answer', text: 'Blue Moon Lounge at Four Seasons Bahrain Bay is on the 50th floor — the highest bar in Bahrain.' }},
          { '@type': 'Question', name: 'Are rooftop bars open year-round?', acceptedAnswer: { '@type': 'Answer', text: 'Many are, but outdoor terraces may close in summer. Enclosed bars like Blue Moon and Txoko are comfortable year-round.' }},
          { '@type': 'Question', name: 'Do rooftop bars have happy hours?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Halo has happy hour 6-9pm (Sat-Wed), and many others have daily deals.' }},
        ],
      })}} />

      <InternalLinks 
        title="Bahrain Nightlife" 
        links={[
          { title: 'Adliya Nightlife', href: '/guides/nightlife-adliya' },
          { title: 'Juffair Nightlife', href: '/guides/nightlife-juffair' },
          { title: 'Best Parties', href: '/guides/parties' },
          { title: 'Happy Hour Guide', href: '/guides/happy-hour-bahrain' },
          { title: 'All Lounges & Bars', href: '/lounges-bars' },
        ]} 
      />
    </div>
  );
}
