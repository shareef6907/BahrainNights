import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, Calendar, MapPin, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Bahrain Travel Guides | BahrainNights',
  description: 'Expert travel guides for Bahrain - discover the best things to do, nightlife, dining, events, and local tips from BahrainNights.',
  keywords: 'Bahrain guide, Bahrain travel, things to do Bahrain, Bahrain tips, visit Bahrain',
};

const bahrainGuides = [
  {
    title: 'Ultimate Guide: Things to Do in Bahrain',
    description: 'Complete guide to attractions, activities, beaches, culture, and experiences in Bahrain.',
    href: '/guides/things-to-do',
    emoji: '🇧🇭',
    category: 'Essential',
    readTime: '10 min read',
  },
  {
    title: 'Best Places to Visit in Bahrain',
    description: 'Top attractions, landmarks, UNESCO sites, beaches, and hidden gems to explore.',
    href: '/guides/places-to-visit',
    emoji: '🗺️',
    category: 'Sightseeing',
    readTime: '8 min read',
  },
  {
    title: 'Bahrain Tourist Attractions',
    description: 'Complete guide to tourist attractions including UNESCO sites, museums, and landmarks.',
    href: '/guides/tourist-attractions',
    emoji: '🏛️',
    category: 'Sightseeing',
    readTime: '10 min read',
  },
  {
    title: 'Bahrain Nightlife Guide',
    description: 'The best clubs, bars, lounges and late-night spots in Manama, Adliya, and Juffair.',
    href: '/guides/nightlife',
    emoji: '🌙',
    category: 'Nightlife',
    readTime: '8 min read',
  },
  {
    title: 'Best Parties in Bahrain',
    description: 'Where to party - nightclubs, themed nights, ladies nights, and the best events.',
    href: '/guides/parties',
    emoji: '🎉',
    category: 'Nightlife',
    readTime: '7 min read',
  },
  {
    title: 'Ladies Nights in Bahrain',
    description: 'Complete guide to ladies nights - free drinks, best deals, and top venues.',
    href: '/guides/ladies-nights',
    emoji: '💃',
    category: 'Nightlife',
    readTime: '6 min read',
  },
  {
    title: 'Best Brunches in Bahrain',
    description: 'Your guide to Friday brunches - from budget-friendly to luxury experiences.',
    href: '/guides/brunches',
    emoji: '🥂',
    category: 'Dining',
    readTime: '6 min read',
  },
  {
    title: 'Best Brunch in Bahrain',
    description: 'Complete Friday and Saturday brunch guide with prices and reviews.',
    href: '/guides/brunch',
    emoji: '🍳',
    category: 'Dining',
    readTime: '8 min read',
  },
  {
    title: 'Best Restaurants in Bahrain',
    description: 'Top restaurants for fine dining, local cuisine, and every budget.',
    href: '/guides/restaurants',
    emoji: '🍽️',
    category: 'Dining',
    readTime: '8 min read',
  },
  {
    title: 'Best Cafes in Bahrain',
    description: 'Specialty coffee, cozy spots, and Instagram-worthy cafes.',
    href: '/guides/cafes',
    emoji: '☕',
    category: 'Dining',
    readTime: '7 min read',
  },
  {
    title: 'Best Shisha Lounges in Bahrain',
    description: 'Top hookah spots from traditional cafes to rooftop lounges.',
    href: '/guides/shisha',
    emoji: '💨',
    category: 'Dining',
    readTime: '6 min read',
  },
  {
    title: 'Beach Clubs in Bahrain',
    description: 'Best beach clubs, pool day passes, and beach party venues.',
    href: '/guides/beach-clubs',
    emoji: '🏖️',
    category: 'Beach',
    readTime: '7 min read',
  },
  {
    title: 'Best Hotels in Bahrain',
    description: 'Luxury, beach, and budget hotels - complete accommodation guide.',
    href: '/guides/hotels',
    emoji: '🏨',
    category: 'Hotels',
    readTime: '10 min read',
  },
  {
    title: 'Family Activities in Bahrain',
    description: 'Best things to do with family - waterparks, museums, attractions.',
    href: '/guides/family-activities',
    emoji: '👨‍👩‍👧‍👦',
    category: 'Family',
    readTime: '8 min read',
  },
  {
    title: 'Things to Do with Kids in Bahrain',
    description: 'Kid-friendly activities for toddlers to teens.',
    href: '/guides/things-to-do-with-kids',
    emoji: '👶',
    category: 'Family',
    readTime: '8 min read',
  },
  {
    title: 'Free Things to Do in Bahrain',
    description: 'Budget-friendly attractions from beaches to UNESCO sites.',
    href: '/guides/free-things-to-do',
    emoji: '🆓',
    category: 'Budget',
    readTime: '7 min read',
  },
  {
    title: 'Romantic Things to Do in Bahrain',
    description: 'Date ideas, romantic restaurants, and couples experiences.',
    href: '/guides/romantic',
    emoji: '❤️',
    category: 'Couples',
    readTime: '7 min read',
  },
  {
    title: 'Things to Do This Weekend',
    description: 'What\'s on this weekend - events, brunches, and activities.',
    href: '/guides/things-to-do-this-weekend',
    emoji: '📅',
    category: 'Events',
    readTime: '6 min read',
  },
  {
    title: 'Concerts in Bahrain',
    description: 'Live music venues, concert calendars, and where to see music in Bahrain.',
    href: '/guides/concerts',
    emoji: '🎵',
    category: 'Events',
    readTime: '6 min read',
  },
  {
    title: 'F1 Bahrain Grand Prix 2026',
    description: 'Everything you need to know for F1 weekend - tickets, transport, events, and tips.',
    href: '/guides/f1-2026',
    emoji: '🏎️',
    category: 'Events',
    readTime: '12 min read',
  },
  {
    title: 'Ramadan in Bahrain 2026',
    description: 'Guide to Ramadan traditions, iftar spots, events, and what to expect.',
    href: '/guides/ramadan-2026',
    emoji: '🌙',
    category: 'Culture',
    readTime: '7 min read',
  },
];

const regionalGuides = [
  {
    title: 'Parties in Dubai',
    description: 'Dubai nightlife guide - mega clubs, beach parties, and where to party.',
    href: '/guides/dubai-parties',
    emoji: '🇦🇪',
    category: 'Dubai',
    readTime: '8 min read',
  },
  {
    title: 'Events in Dubai This Weekend',
    description: 'What\'s on in Dubai - brunches, events, concerts, and weekend activities.',
    href: '/guides/dubai-events',
    emoji: '📅',
    category: 'Dubai',
    readTime: '7 min read',
  },
  {
    title: 'Concerts in Dubai',
    description: 'Live music events, concerts, and shows at Coca-Cola Arena and more.',
    href: '/guides/dubai-concerts',
    emoji: '🎵',
    category: 'Dubai',
    readTime: '6 min read',
  },
  {
    title: 'Parties in Abu Dhabi',
    description: 'Abu Dhabi nightlife - Yas Island clubs, beach parties, and F1 weekend.',
    href: '/guides/abu-dhabi-parties',
    emoji: '🇦🇪',
    category: 'Abu Dhabi',
    readTime: '7 min read',
  },
  {
    title: 'Parties in Qatar',
    description: 'Doha nightlife and entertainment guide - hotels, events, and what to expect.',
    href: '/guides/qatar-parties',
    emoji: '🇶🇦',
    category: 'Qatar',
    readTime: '6 min read',
  },
  {
    title: 'Concerts in Saudi Arabia',
    description: 'MDL Beast, Soundstorm, Riyadh Season - concerts in the Kingdom.',
    href: '/guides/saudi-concerts',
    emoji: '🇸🇦',
    category: 'Saudi',
    readTime: '7 min read',
  },
];

const areaGuides = [
  {
    title: 'Things to Do in Seef',
    description: 'Shopping, beach clubs, and hotels in the commercial hub.',
    href: '/guides/seef',
    emoji: '🛍️',
    category: 'Area',
    readTime: '6 min read',
  },
  {
    title: 'Things to Do in Manama',
    description: 'The capital - souqs, museums, and cultural attractions.',
    href: '/guides/manama',
    emoji: '🏙️',
    category: 'Area',
    readTime: '8 min read',
  },
  {
    title: 'Things to Do in Riffa',
    description: 'Golf, heritage, and residential Bahrain.',
    href: '/guides/riffa',
    emoji: '⛳',
    category: 'Area',
    readTime: '5 min read',
  },
  {
    title: 'Amwaj Islands Guide',
    description: 'Beaches, marina, and waterfront dining.',
    href: '/guides/amwaj',
    emoji: '🏝️',
    category: 'Area',
    readTime: '6 min read',
  },
  {
    title: 'Restaurants in Juffair',
    description: 'Dining guide to Juffair - international, late-night, and more.',
    href: '/guides/juffair-dining',
    emoji: '🍴',
    category: 'Area',
    readTime: '7 min read',
  },
  {
    title: 'Nightlife in Juffair',
    description: 'Bars, clubs, and nightlife in the expat hub.',
    href: '/guides/nightlife-juffair',
    emoji: '🌃',
    category: 'Area',
    readTime: '6 min read',
  },
  {
    title: 'Nightlife in Adliya',
    description: 'Trendy bars, cafes, and the arts district.',
    href: '/guides/nightlife-adliya',
    emoji: '🎭',
    category: 'Area',
    readTime: '6 min read',
  },
];

const categoryColors: Record<string, string> = {
  Essential: 'bg-yellow-500/20 text-yellow-400',
  Sightseeing: 'bg-emerald-500/20 text-emerald-400',
  Nightlife: 'bg-purple-500/20 text-purple-400',
  Dining: 'bg-orange-500/20 text-orange-400',
  Beach: 'bg-cyan-500/20 text-cyan-400',
  Events: 'bg-red-500/20 text-red-400',
  Culture: 'bg-amber-500/20 text-amber-400',
  Hotels: 'bg-blue-500/20 text-blue-400',
  Family: 'bg-pink-500/20 text-pink-400',
  Budget: 'bg-green-500/20 text-green-400',
  Couples: 'bg-rose-500/20 text-rose-400',
  Area: 'bg-teal-500/20 text-teal-400',
  Dubai: 'bg-pink-500/20 text-pink-400',
  'Abu Dhabi': 'bg-blue-500/20 text-blue-400',
  Qatar: 'bg-rose-500/20 text-rose-400',
  Saudi: 'bg-green-500/20 text-green-400',
};

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

      {/* Bahrain Guides Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <span className="text-3xl">🇧🇭</span> Bahrain Guides
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bahrainGuides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group relative bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{guide.emoji}</span>
                    <div>
                      <span className={`text-xs px-2 py-0.5 rounded ${categoryColors[guide.category] || 'bg-gray-500/20 text-gray-400'}`}>
                        {guide.category}
                      </span>
                    </div>
                  </div>
                  <h2 className="text-lg font-bold mb-2 group-hover:text-yellow-400 transition-colors">
                    {guide.title}
                  </h2>
                  <p className="text-gray-400 text-sm mb-4 flex-1">{guide.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{guide.readTime}</span>
                    <span className="inline-flex items-center gap-1 text-yellow-400 text-sm font-medium">
                      Read <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Area Guides */}
      <section className="py-12 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <MapPin className="w-7 h-7 text-teal-400" />
            Area Guides
          </h2>
          <p className="text-gray-400 mb-8">
            Explore different areas of Bahrain with our detailed local guides.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {areaGuides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group relative bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{guide.emoji}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${categoryColors[guide.category] || 'bg-gray-500/20 text-gray-400'}`}>
                      {guide.category}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold mb-2 group-hover:text-teal-400 transition-colors">
                    {guide.title}
                  </h2>
                  <p className="text-gray-400 text-sm mb-4 flex-1">{guide.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{guide.readTime}</span>
                    <span className="inline-flex items-center gap-1 text-teal-400 text-sm font-medium">
                      Read <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Guides */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <Globe className="w-7 h-7 text-yellow-400" />
            Regional Guides
          </h2>
          <p className="text-gray-400 mb-8">
            Planning to explore beyond Bahrain? Check out our guides to nightlife and events in the Gulf region.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {regionalGuides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group relative bg-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{guide.emoji}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${categoryColors[guide.category] || 'bg-gray-500/20 text-gray-400'}`}>
                      {guide.category}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold mb-2 group-hover:text-yellow-400 transition-colors">
                    {guide.title}
                  </h2>
                  <p className="text-gray-400 text-sm mb-4 flex-1">{guide.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{guide.readTime}</span>
                    <span className="inline-flex items-center gap-1 text-yellow-400 text-sm font-medium">
                      Read <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Popular Pages</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Events This Weekend', href: '/events/this-weekend', emoji: '📅' },
              { label: 'Movies Now Showing', href: '/cinema', emoji: '🎬' },
              { label: 'Family Activities', href: '/family-kids', emoji: '👨‍👩‍👧‍👦' },
              { label: 'Attractions', href: '/attractions', emoji: '🏛️' },
              { label: 'All Events', href: '/events', emoji: '🎉' },
              { label: 'Places', href: '/places', emoji: '📍' },
              { label: 'Regional Events', href: '/regional', emoji: '🌍' },
              { label: 'Calendar', href: '/calendar', emoji: '📆' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm transition-colors"
              >
                <span className="text-xl">{link.emoji}</span>
                {link.label}
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
    </div>
  );
}
