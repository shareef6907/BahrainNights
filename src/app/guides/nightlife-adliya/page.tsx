import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Music, Moon, Wine, MapPin, Clock, Star,
  ArrowRight, Palette, Coffee
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Adliya Nightlife Guide 2026 | Best Bars & Cafes in Adliya Bahrain',
  description: 'Complete guide to Adliya nightlife in Bahrain. Discover the best bars, cafes, and lounges in Block 338. JJ\'s, art galleries, and the trendy Adliya scene.',
  keywords: 'Adliya nightlife, Adliya bars, Block 338 Adliya, Adliya Bahrain, JJs Adliya, bars Adliya, cafes Adliya',
  openGraph: {
    title: 'Adliya Nightlife Guide 2026 | Best Bars & Cafes in Adliya Bahrain',
    description: 'Your guide to the best bars, cafes, and nightlife in Adliya, Bahrain.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/nightlife-adliya',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/nightlife-adliya',
  },
};

const adliyaVenues = [
  {
    name: 'Colony',
    type: 'Gastro Pub & Lounge',
    description: 'Trendy gastropub with great food, craft drinks, and a stylish atmosphere. A must-visit in Adliya.',
    vibe: 'Trendy, upscale casual, social',
    music: 'DJ sets, Lounge',
    bestNights: 'Thursday-Saturday',
    hours: '12 PM - 2 AM',
    tip: 'Great for both dinner and drinks. Reservations recommended on weekends.',
  },
  {
    name: 'JJ\'s Irish Pub',
    type: 'Live Music Pub',
    description: 'Legendary live music venue with bands playing nightly. The go-to spot for rock and pop covers.',
    vibe: 'Energetic, lively, party',
    music: 'Live bands - Rock, Pop covers',
    bestNights: 'Thursday-Saturday',
    hours: '6 PM - 2 AM',
    tip: 'Best atmosphere when the band is on. Arrive by 10 PM for a good spot.',
  },
  {
    name: 'Coco\'s',
    type: 'Lounge/Bar',
    description: 'Trendy lounge with great cocktails and a stylish crowd.',
    vibe: 'Trendy, sophisticated, social',
    music: 'Lounge, DJ sets',
    bestNights: 'Thursday, Friday',
    hours: '6 PM - 2 AM',
    tip: 'Good for pre-dinner drinks or late-night cocktails.',
  },
  {
    name: 'Block 338 Venues',
    type: 'Bar Street',
    description: 'The heart of Adliya with multiple bars, cafes, and restaurants in one area.',
    vibe: 'Artsy, diverse, walkable',
    music: 'Various',
    bestNights: 'Thursday-Saturday',
    hours: 'Varies by venue',
    tip: 'Walk around and explore - each spot has its own vibe.',
  },
  {
    name: 'Art Galleries & Cafes',
    type: 'Cultural',
    description: 'Adliya is Bahrain\'s art district with galleries, boutiques, and artsy cafes.',
    vibe: 'Creative, relaxed, cultural',
    music: 'Ambient',
    bestNights: 'Any day',
    hours: 'Daytime + evening',
    tip: 'Great for a cultural afternoon followed by dinner and drinks.',
  },
  {
    name: 'Gulf Hotel Complex',
    type: 'Hotel Venues',
    description: 'Multiple bars including Sherlock Holmes, Lanterns, and Typhoon - all with different vibes.',
    vibe: 'Varies by venue',
    music: 'Live music, DJ',
    bestNights: 'Nightly',
    hours: 'Varies',
    tip: 'All under one roof. Great option if you want variety.',
  },
];

const adliyaVibe = [
  { title: 'Artsy', description: 'Galleries, street art, and creative spaces' },
  { title: 'Casual', description: 'Less dressy than Juffair clubs' },
  { title: 'Walkable', description: 'Explore multiple spots on foot' },
  { title: 'Diverse', description: 'Cafes, bars, restaurants, galleries' },
];

const comparedToJuffair = {
  adliya: ['More casual dress code', 'Live bands & lounges', 'Art galleries & cafes', 'Walkable area', 'Earlier start times'],
  juffair: ['Nightclubs & dancing', 'Later night (1-3 AM peak)', 'More dressed up', 'Bigger venues', 'Ladies nights'],
};

export default function AdliyaNightlifePage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-amber-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Nightlife', url: 'https://www.bahrainnights.com/guides/nightlife' },
          { name: 'Adliya', url: 'https://www.bahrainnights.com/guides/nightlife-adliya' },
        ]}
      />

      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-4">
              🎨 Area Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Adliya
              </span>
              {' '}Nightlife
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Adliya is Bahrain's artsy, creative neighborhood. Home to Block 338, 
              live music venues, and a more relaxed bar scene.
            </p>
            <p className="text-sm text-gray-500 mt-4">Last updated: {lastUpdated}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Bars & Lounges', value: '20+', icon: Wine },
              { label: 'Live Music', value: '5+', icon: Music },
              { label: 'Art Galleries', value: '10+', icon: Palette },
              { label: 'Cafes', value: '15+', icon: Coffee },
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

      {/* Adliya Vibe */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">The Adliya Vibe</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {adliyaVibe.map((item) => (
              <div key={item.title} className="bg-amber-500/10 rounded-xl p-5 text-center">
                <h3 className="font-bold text-amber-400 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venues */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Top Adliya Spots</h2>
          
          <div className="space-y-6">
            {adliyaVenues.map((venue) => (
              <div key={venue.name} className="bg-white/5 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold">{venue.name}</h3>
                  <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-1 rounded">
                    {venue.type}
                  </span>
                </div>
                <p className="text-gray-300 mb-3">{venue.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm mb-3">
                  <p><strong className="text-gray-400">Vibe:</strong> {venue.vibe}</p>
                  <p><strong className="text-gray-400">Music:</strong> {venue.music}</p>
                  <p><strong className="text-gray-400">Best:</strong> {venue.bestNights}</p>
                  <p><strong className="text-gray-400">Hours:</strong> {venue.hours}</p>
                </div>
                <p className="text-xs text-amber-300 italic">💡 {venue.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Adliya vs Juffair */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Adliya vs Juffair</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-amber-500/10 rounded-xl p-6">
              <h3 className="font-bold text-amber-400 mb-4 text-lg">Adliya is for...</h3>
              <ul className="space-y-2">
                {comparedToJuffair.adliya.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span className="text-amber-400">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-purple-500/10 rounded-xl p-6">
              <h3 className="font-bold text-purple-400 mb-4 text-lg">Juffair is for...</h3>
              <ul className="space-y-2">
                {comparedToJuffair.juffair.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span className="text-purple-400">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-center text-gray-400 mt-6 text-sm">
            Many people start in Adliya for dinner and drinks, then head to Juffair for late-night clubbing.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More Areas</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guides/nightlife-juffair" className="px-6 py-3 bg-purple-500 hover:bg-purple-400 text-white font-bold rounded-lg">
              Juffair Nightlife
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
              { q: 'What is Block 338 in Adliya?', a: 'Block 338 is the main nightlife and dining area in Adliya, featuring multiple bars, restaurants, cafes, and art galleries within walking distance.' },
              { q: 'Is Adliya good for nightlife?', a: 'Yes! Adliya offers a more casual, artsy nightlife scene compared to Juffair. It\'s great for live music, lounges, and a relaxed evening out.' },
              { q: 'What is the dress code for Adliya?', a: 'Adliya is more casual than Juffair clubs. Smart casual works for most venues. No need to dress up as much as for nightclubs.' },
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
              { title: 'Juffair Nightlife', href: '/guides/nightlife-juffair', emoji: '🌙' },
              { title: 'Full Nightlife Guide', href: '/guides/nightlife', emoji: '🎉' },
              { title: 'Best Restaurants', href: '/guides/restaurants', emoji: '🍽️' },
              { title: 'Best Parties', href: '/guides/parties', emoji: '💃' },
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
        headline: 'Adliya Nightlife Guide 2026',
        description: 'Complete guide to nightlife in Adliya, Bahrain.',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2026-01-26',
        dateModified: lastUpdated,
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What is Block 338 in Adliya?', acceptedAnswer: { '@type': 'Answer', text: 'Block 338 is the main nightlife and dining area in Adliya, featuring multiple bars, restaurants, and cafes.' }},
          { '@type': 'Question', name: 'Is Adliya good for nightlife?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Adliya offers a more casual, artsy nightlife scene with live music and lounges.' }},
        ],
      })}} />
    </div>
  );
}
