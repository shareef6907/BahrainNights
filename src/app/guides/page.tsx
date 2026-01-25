import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, Calendar, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Bahrain Travel Guides | BahrainNights',
  description: 'Expert travel guides for Bahrain - discover the best things to do, nightlife, dining, events, and local tips from BahrainNights.',
  keywords: 'Bahrain guide, Bahrain travel, things to do Bahrain, Bahrain tips, visit Bahrain',
};

const guides = [
  {
    title: 'Ultimate Guide: Things to Do in Bahrain',
    description: 'Complete guide to attractions, activities, beaches, culture, and experiences in Bahrain.',
    href: '/guides/things-to-do',
    emoji: '🇧🇭',
    category: 'Essential',
    readTime: '10 min read',
    isLive: true,
  },
  {
    title: 'Bahrain Nightlife Guide',
    description: 'The best clubs, bars, lounges and late-night spots in Manama, Adliya, and Juffair.',
    href: '/guides/nightlife',
    emoji: '🌙',
    category: 'Nightlife',
    readTime: '8 min read',
    isLive: true,
  },
  {
    title: 'Best Brunches in Bahrain',
    description: 'Your guide to Friday brunches - from budget-friendly to luxury experiences.',
    href: '/guides/brunches',
    emoji: '🥂',
    category: 'Dining',
    readTime: '6 min read',
    isLive: true,
  },
  {
    title: 'F1 Bahrain Grand Prix 2026',
    description: 'Everything you need to know for F1 weekend - tickets, transport, events, and tips.',
    href: '/guides/f1-2026',
    emoji: '🏎️',
    category: 'Events',
    readTime: '12 min read',
    isLive: true,
  },
  {
    title: 'Ramadan in Bahrain 2026',
    description: 'Guide to Ramadan traditions, iftar spots, events, and what to expect.',
    href: '/guides/ramadan-2026',
    emoji: '🌙',
    category: 'Culture',
    readTime: '7 min read',
    isLive: true,
  },
];

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            Expert Local Guides
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-6">
            Bahrain Travel Guides
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to know about visiting Bahrain — written by locals who know the Kingdom inside out.
          </p>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {guides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.isLive ? guide.href : '#'}
                className={`group relative bg-white/5 rounded-2xl p-6 transition-all ${
                  guide.isLive 
                    ? 'hover:bg-white/10 cursor-pointer' 
                    : 'opacity-60 cursor-not-allowed'
                }`}
              >
                {!guide.isLive && (
                  <span className="absolute top-4 right-4 px-2 py-1 bg-gray-500/50 text-xs rounded-full">
                    Coming Soon
                  </span>
                )}
                
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{guide.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded">
                        {guide.category}
                      </span>
                      <span className="text-xs text-gray-500">{guide.readTime}</span>
                    </div>
                    <h2 className={`text-xl font-bold mb-2 ${guide.isLive ? 'group-hover:text-yellow-400' : ''} transition-colors`}>
                      {guide.title}
                    </h2>
                    <p className="text-gray-400 text-sm mb-4">{guide.description}</p>
                    {guide.isLive && (
                      <span className="inline-flex items-center gap-1 text-yellow-400 text-sm font-medium">
                        Read Guide <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-yellow-500/10 to-amber-500/10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Get Weekly Bahrain Tips</h2>
          <p className="text-gray-300 mb-6">
            Subscribe to our newsletter for the latest events, new venues, and insider tips.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-lg font-bold mb-6 text-center text-gray-400">Explore More</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: 'Events This Week', href: '/events' },
              { label: 'Restaurants', href: '/restaurants' },
              { label: 'Nightclubs', href: '/nightclubs' },
              { label: 'Attractions', href: '/attractions' },
              { label: 'Cinema', href: '/cinema' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
