import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { 
  MapPin, Calendar, Utensils, Music, Film, Users, 
  Sun, Moon, ShoppingBag, Landmark, Waves, Car,
  Star, ArrowRight, Clock, Sparkles
} from 'lucide-react';

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Ultimate Guide: Things to Do in Bahrain 2026 | BahrainNights',
  description: 'Discover the best things to do in Bahrain! From beaches and nightlife to culture, dining, and family activities. Your complete guide to exploring the Kingdom of Bahrain.',
  keywords: 'things to do in Bahrain, Bahrain activities, Bahrain attractions, what to do in Bahrain, Bahrain guide, visit Bahrain, Bahrain tourism',
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/things-to-do',
  },
  openGraph: {
    title: 'Ultimate Guide: Things to Do in Bahrain 2026',
    description: 'Your complete guide to the best experiences in Bahrain - beaches, nightlife, culture, dining, and more.',
    type: 'article',
    locale: 'en_US',
  },
};

// Supabase client setup
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Event type for this page
interface LiveEvent {
  id: string;
  title: string;
  slug: string;
  venue: string;
  date: string;
  rawDate: string;
  category: string;
}

// Category mapping to match events to guide categories
const categoryMapping: Record<string, string[]> = {
  'Nightlife & Entertainment': ['nightlife', 'music', 'party', 'club', 'concert'],
  'Cultural Experiences': ['arts', 'culture', 'heritage', 'exhibition', 'museum'],
  'Dining & Brunches': ['dining', 'food', 'brunch', 'restaurant', 'culinary'],
  'Family Activities': ['family', 'kids', 'children', 'entertainment'],
  'Events & Festivals': ['festival', 'sports', 'community', 'special'],
  'Beaches & Water Activities': ['beach', 'water', 'outdoor'],
};

// Fetch upcoming events from Supabase
async function getUpcomingEvents(): Promise<LiveEvent[]> {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('events')
      .select('id, title, slug, venue_name, venue, date, category')
      .eq('status', 'published')
      .eq('is_hidden', false)
      .eq('country', 'Bahrain')
      .gte('date', today)
      .order('date', { ascending: true })
      .limit(20);

    if (error) {
      console.error('Error fetching events for things-to-do:', error);
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }

    return data.map((event) => ({
      id: event.id,
      title: event.title || 'Untitled Event',
      slug: event.slug || event.id,
      venue: event.venue_name || event.venue || 'Venue TBA',
      rawDate: event.date || '',
      date: event.date
        ? new Date(event.date).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          })
        : 'Date TBA',
      category: (event.category || 'general').toLowerCase(),
    }));
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return [];
  }
}

// Match events to categories
function getEventsForCategory(events: LiveEvent[], categoryTitle: string): LiveEvent[] {
  const keywords = categoryMapping[categoryTitle] || [];
  return events.filter(event => 
    keywords.some(keyword => event.category.includes(keyword))
  ).slice(0, 4);
}

const categories = [
  {
    title: 'Beaches & Water Activities',
    icon: Waves,
    color: 'from-cyan-500 to-blue-500',
    description: 'Crystal clear waters and stunning beaches',
    items: [
      { name: 'Al Dar Islands', desc: 'Private island getaway with pristine beaches' },
      { name: 'Amwaj Beach', desc: 'Popular beach with water sports' },
      { name: 'Coral Bay', desc: 'Beach resort with family facilities' },
      { name: 'Jet Skiing', desc: 'Thrilling water sports adventures' },
    ],
    link: '/attractions?category=beach',
  },
  {
    title: 'Nightlife & Entertainment',
    icon: Moon,
    color: 'from-purple-500 to-pink-500',
    description: 'Vibrant clubs, bars, and live music',
    items: [
      { name: 'Adliya', desc: 'Trendy bars and restaurants district' },
      { name: 'Juffair', desc: 'Nightclub hub with international DJs' },
      { name: 'Hotel Lounges', desc: 'Upscale cocktail bars' },
      { name: 'Live Music Venues', desc: 'Jazz, rock, and local talent' },
    ],
    link: '/guides/nightlife',
  },
  {
    title: 'Cultural Experiences',
    icon: Landmark,
    color: 'from-amber-500 to-orange-500',
    description: 'Rich history and heritage sites',
    items: [
      { name: 'Bahrain Fort', desc: 'UNESCO World Heritage site' },
      { name: 'Manama Souq', desc: 'Traditional market experience' },
      { name: 'Bahrain National Museum', desc: 'History and artifacts' },
      { name: 'Pearl Trail', desc: 'Historic pearl diving heritage' },
    ],
    link: '/attractions?category=cultural',
  },
  {
    title: 'Dining & Brunches',
    icon: Utensils,
    color: 'from-green-500 to-emerald-500',
    description: 'World-class restaurants and cafes',
    items: [
      { name: 'Friday Brunch', desc: 'Legendary weekend brunches' },
      { name: 'Seef District', desc: 'Dining and shopping hub' },
      { name: 'Block 338', desc: 'Artsy cafes and restaurants' },
      { name: 'Fine Dining', desc: 'Michelin-quality experiences' },
    ],
    link: '/places',
  },
  {
    title: 'Family Activities',
    icon: Users,
    color: 'from-pink-500 to-rose-500',
    description: 'Fun for all ages',
    items: [
      { name: 'Lost Paradise of Dilmun', desc: 'Waterpark adventure' },
      { name: 'Bahrain Zoo', desc: 'Wildlife and nature' },
      { name: 'Gravity', desc: 'Indoor entertainment center' },
      { name: 'Magic Island', desc: 'Amusement park' },
    ],
    link: '/family-kids',
  },
  {
    title: 'Events & Festivals',
    icon: Calendar,
    color: 'from-red-500 to-orange-500',
    description: 'Year-round entertainment',
    items: [
      { name: 'F1 Grand Prix', desc: 'World-class motorsport' },
      { name: 'Spring of Culture', desc: 'Arts and music festival' },
      { name: 'National Day', desc: 'Celebrations and fireworks' },
      { name: 'Ramadan Nights', desc: 'Special evening events' },
    ],
    link: '/events',
  },
];

const topPicks = [
  {
    title: 'Best for First-Time Visitors',
    items: ['Bahrain Fort', 'Manama Souq', 'Friday Brunch', 'Al Fateh Mosque'],
  },
  {
    title: 'Best for Couples',
    items: ['Sunset at Amwaj', 'Rooftop Dining', 'Tree of Life', 'Spa Day'],
  },
  {
    title: 'Best for Adventure',
    items: ['F1 Track Experience', 'Scuba Diving', 'Jet Skiing', 'Kayak Mangroves'],
  },
];

// Event Card Component
function EventCard({ event }: { event: LiveEvent }) {
  return (
    <Link 
      href={`/events/${event.slug}`}
      className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors group"
    >
      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-amber-500/20 rounded-lg flex items-center justify-center">
        <Calendar className="w-5 h-5 text-yellow-400" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm truncate group-hover:text-yellow-400 transition-colors">
          {event.title}
        </h4>
        <p className="text-xs text-gray-400 truncate">
          {event.date} • {event.venue}
        </p>
      </div>
      <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-yellow-400 transition-colors flex-shrink-0" />
    </Link>
  );
}

export default async function ThingsToDoPage() {
  // Fetch live events from database
  const events = await getUpcomingEvents();
  const featuredEvents = events.slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Things to Do in Bahrain', url: 'https://www.bahrainnights.com/guides/things-to-do' },
      ]} />
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-purple-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium mb-4">
              🇧🇭 Complete Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Things to Do in{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                Bahrain
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From ancient forts to futuristic skylines, pristine beaches to buzzing nightlife — 
              discover why Bahrain is the Gulf&apos;s best-kept secret.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Attractions', value: '100+', icon: Star },
              { label: 'Restaurants', value: '500+', icon: Utensils },
              { label: 'Events/Month', value: '50+', icon: Calendar },
              { label: 'Beach Clubs', value: '20+', icon: Sun },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Happening Now Section - Live Events */}
      {featuredEvents.length > 0 && (
        <section className="py-12 px-4 bg-gradient-to-r from-yellow-500/10 via-purple-500/10 to-yellow-500/10">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">What&apos;s Happening Now</h2>
                  <p className="text-gray-400 text-sm">Live events from our database</p>
                </div>
              </div>
              <Link 
                href="/events"
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-lg transition-colors"
              >
                View All Events <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredEvents.map((event) => (
                <Link 
                  key={event.id}
                  href={`/events/${event.slug}`}
                  className="group bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-xl p-5 transition-all border border-white/5 hover:border-yellow-500/30"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-xl flex flex-col items-center justify-center text-black">
                      <span className="text-xs font-bold uppercase">
                        {new Date(event.rawDate).toLocaleDateString('en-US', { month: 'short' })}
                      </span>
                      <span className="text-lg font-black">
                        {new Date(event.rawDate).getDate()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg mb-1 group-hover:text-yellow-400 transition-colors line-clamp-1">
                        {event.title}
                      </h3>
                      <p className="text-gray-400 text-sm flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {event.venue}
                      </p>
                      <span className="inline-block mt-2 text-xs px-2 py-1 bg-white/10 rounded-full capitalize">
                        {event.category}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-6 text-center md:hidden">
              <Link 
                href="/events"
                className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition-colors"
              >
                View All Events <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Category Sections */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Explore by Category
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const categoryEvents = getEventsForCategory(events, category.title);
              
              return (
                <div 
                  key={category.title}
                  className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} mb-4`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{category.description}</p>
                  
                  <ul className="space-y-2 mb-4">
                    {category.items.map((item) => (
                      <li key={item.name} className="flex items-start gap-2 text-sm">
                        <span className="text-yellow-400 mt-1">•</span>
                        <span>
                          <strong className="text-white">{item.name}</strong>
                          <span className="text-gray-500"> — {item.desc}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Dynamic Events for this Category */}
                  {categoryEvents.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-xs text-yellow-400 font-medium mb-3 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Upcoming Events
                      </p>
                      <div className="space-y-2">
                        {categoryEvents.slice(0, 3).map((event) => (
                          <EventCard key={event.id} event={event} />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <Link 
                    href={category.link}
                    className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 text-sm font-medium mt-4"
                  >
                    Explore {category.title} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Top Picks Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Curated Recommendations
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {topPicks.map((pick) => (
              <div key={pick.title} className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4 text-yellow-400">{pick.title}</h3>
                <ol className="space-y-3">
                  {pick.items.map((item, index) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-bold">
                        {index + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practical Info */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Practical Information
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-yellow-400" />
                Best Time to Visit
              </h3>
              <p className="text-gray-300 mb-4">
                <strong>October to April</strong> offers perfect weather (20-25°C). 
                Avoid June-August when temperatures exceed 40°C.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• <strong>December-February:</strong> Peak season, pleasant weather</li>
                <li>• <strong>March-April:</strong> F1 Grand Prix season</li>
                <li>• <strong>Ramadan:</strong> Unique cultural experience (dates vary)</li>
              </ul>
            </div>
            
            <div className="bg-white/5 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Car className="w-5 h-5 text-yellow-400" />
                Getting Around
              </h3>
              <p className="text-gray-300 mb-4">
                Bahrain is compact and easy to navigate. Most attractions are within 30 minutes of Manama.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• <strong>Taxis:</strong> Affordable and readily available</li>
                <li>• <strong>Uber/Careem:</strong> Convenient app-based transport</li>
                <li>• <strong>Car Rental:</strong> Best for exploring freely</li>
                <li>• <strong>Causeway:</strong> Easy day trip to Saudi Arabia</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-yellow-500/20 to-amber-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Explore Bahrain?
          </h2>
          <p className="text-gray-300 mb-8">
            Check out what&apos;s happening this week and plan your perfect Bahrain experience.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/events"
              className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition-colors"
            >
              View Events
            </Link>
            <Link 
              href="/places"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              Explore Places
            </Link>
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Bahrain Nightlife Guide', href: '/guides/nightlife', emoji: '🌙' },
              { title: 'Best Brunches in Bahrain', href: '/guides/brunches', emoji: '🥂' },
              { title: 'F1 Bahrain 2026 Guide', href: '/guides/f1-2026', emoji: '🏎️' },
              { title: 'Ramadan 2026 Guide', href: '/guides/ramadan-2026', emoji: '🌙' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group"
              >
                <span className="text-2xl mb-2 block">{guide.emoji}</span>
                <span className="font-medium group-hover:text-yellow-400 transition-colors">
                  {guide.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Ultimate Guide: Things to Do in Bahrain 2026',
            description: 'Complete guide to the best things to do in Bahrain including beaches, nightlife, culture, dining and family activities.',
            author: {
              '@type': 'Organization',
              name: 'BahrainNights',
              url: 'https://bahrainnights.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'BahrainNights',
              logo: {
                '@type': 'ImageObject',
                url: 'https://bahrainnights.com/logo.png',
              },
            },
            datePublished: '2026-01-25',
            dateModified: '2026-01-25',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://bahrainnights.com/guides/things-to-do',
            },
            about: {
              '@type': 'Place',
              name: 'Bahrain',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'BH',
              },
            },
          }),
        }}
      />
    </div>
  );
}
