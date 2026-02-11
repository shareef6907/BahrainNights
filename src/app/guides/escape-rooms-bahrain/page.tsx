import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, Clock, Users, Puzzle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Escape Rooms in Bahrain 2026 | Puzzle Rooms & Locations',
  description: 'Find the best escape rooms in Bahrain. Horror, adventure, mystery themes with team challenges. Complete guide with difficulty levels and prices.',
  keywords: 'escape rooms Bahrain, puzzle rooms Bahrain, escape games Bahrain, team building Bahrain, adventure rooms Bahrain',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/escape-rooms-bahrain' },
  openGraph: {
    title: 'Best Escape Rooms in Bahrain 2026',
    description: 'Challenge yourself at Bahrain\'s top escape room venues - puzzles, adventure, and teamwork.',
    type: 'article', locale: 'en_US',
  },
};

const faqs = [
  { q: 'What are the best escape rooms in Bahrain?', a: 'Popular escape room venues include Breakout Bahrain, The Exit, Escape Hunt, and LOCKED. Each offers multiple themed rooms ranging from mystery to horror to adventure themes.' },
  { q: 'How much do escape rooms cost in Bahrain?', a: 'Escape rooms typically cost 10-15 BD per person, with most rooms designed for 2-6 players. Some venues offer group rates or team-building packages for larger parties.' },
  { q: 'How long do escape room games last?', a: 'Most escape rooms are designed for 60 minutes of play time. You should arrive 15-20 minutes early for briefing. Some venues offer 45-minute or 90-minute experiences.' },
  { q: 'Are escape rooms scary?', a: 'Difficulty varies by venue and theme. Horror-themed rooms may include jump scares and dark settings. Most venues clearly label rooms by intensity — many family-friendly options exist.' },
  { q: 'Is escape room good for team building?', a: 'Escape rooms are excellent for team building as they require communication, problem-solving, and collaboration under pressure. Many venues offer corporate packages with debriefing sessions.' },
];

const venues = [
  {
    name: 'Breakout Bahrain',
    area: 'Seef',
    rating: 5,
    priceRange: 'BD 12-15/person',
    rooms: ['Prison Break', 'Da Vinci\'s Code', 'Zombie Apocalypse', 'Bank Heist'],
    difficulty: 'Easy to Hard',
    bestFor: 'Variety, quality production',
  },
  {
    name: 'The Exit',
    area: 'Juffair',
    rating: 4,
    priceRange: 'BD 10-14/person',
    rooms: ['Murder Mystery', 'Haunted House', 'Time Machine', 'Spy Mission'],
    difficulty: 'Medium to Hard',
    bestFor: 'Horror fans, experienced players',
  },
  {
    name: 'Escape Hunt',
    area: 'Adliya',
    rating: 4,
    priceRange: 'BD 12-15/person',
    rooms: ['Detective Agency', 'Ancient Egypt', 'Submarine Escape'],
    difficulty: 'Easy to Medium',
    bestFor: 'Beginners, families',
  },
  {
    name: 'LOCKED',
    area: 'Manama',
    rating: 4,
    priceRange: 'BD 10-12/person',
    rooms: ['The Heist', 'Haunted Manor', 'Secret Lab'],
    difficulty: 'Medium',
    bestFor: 'Value, groups',
  },
];

export default function EscapeRoomsBahrainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-green-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Escape Rooms', url: 'https://www.bahrainnights.com/guides/escape-rooms-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-teal-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium mb-4">🔐 Activity Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent">Escape Rooms</span> in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Solve puzzles, crack codes, and beat the clock — discover Bahrain&apos;s most 
              challenging and immersive escape room experiences.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Escape rooms have become one of Bahrain&apos;s most popular group activities, 
            offering immersive experiences that test your problem-solving skills under pressure. 
            Locked in a themed room, you and your team have 60 minutes to find clues, solve 
            puzzles, and escape before time runs out.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Whether you&apos;re looking for a thrilling horror experience, a mind-bending mystery, 
            or a fun team-building activity for work, Bahrain&apos;s escape rooms offer diverse 
            themes and difficulty levels for all types of players.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Escape Room Venues</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {venues.map((venue) => (
              <div key={venue.name} className="bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold">{venue.name}</h3>
                    <p className="text-green-400 text-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {venue.area}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm">{venue.priceRange}</div>
                    <div className="text-xs text-gray-400">{venue.difficulty}</div>
                  </div>
                </div>
                <div className="mb-3">
                  <span className="text-xs text-gray-500">Rooms:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {venue.rooms.map((r) => (
                      <span key={r} className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">{r}</span>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-500"><strong>Best for:</strong> {venue.bestFor}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Escape Room FAQs</h2>
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
              { title: 'Karaoke', href: '/guides/karaoke-bahrain' },
              { title: 'Golf', href: '/guides/golf-bahrain' },
              { title: 'Things to Do', href: '/guides/things-to-do' },
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
        headline: 'Best Escape Rooms in Bahrain 2026',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        datePublished: '2026-02-11', dateModified: '2026-02-11',
      })}} />
    </div>
  );
}
