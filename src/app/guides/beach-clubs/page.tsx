import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Waves, Sun, Umbrella, Clock, MapPin, Star,
  ArrowRight, Users, Wine, Music, DollarSign, Calendar
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import InternalLinks from '@/components/SEO/InternalLinks';

export const metadata: Metadata = {
  title: 'Beach Clubs in Bahrain 2026 | Best Pools, Day Passes & Parties',
  description: 'Discover the best beach clubs in Bahrain! Complete guide to beach clubs, pool day passes, beach parties, and waterfront venues in Amwaj, Bahrain Bay & more.',
  keywords: 'beach clubs Bahrain, Bahrain beach club, pool day pass Bahrain, beach party Bahrain, Amwaj beach, Coral Bay Bahrain, best beaches Bahrain, pool access Bahrain',
  openGraph: {
    title: 'Beach Clubs in Bahrain 2026 | Best Pools, Day Passes & Parties',
    description: 'Your guide to the best beach clubs and pool day passes in Bahrain.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/beach-clubs',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/beach-clubs',
  },
};

const beachClubs = [
  {
    name: 'Coral Bay',
    location: 'Budaiya',
    type: 'Beach & Pool Club',
    rating: 5,
    price: 'BD 15-25 day pass',
    description: 'The most popular beach club in Bahrain with a private beach, pools, water sports, and regular events.',
    features: ['Private beach', 'Swimming pools', 'Water sports', 'Restaurant & bar', 'Beach parties', 'Kids area'],
    bestFor: 'Families, couples, groups, beach parties',
    events: 'Friday pool parties, themed nights, brunches',
    hours: '9 AM - 10 PM',
    contact: 'Book via website or call ahead',
  },
  {
    name: 'Four Seasons Bahrain Bay',
    location: 'Bahrain Bay',
    type: 'Luxury Beach Resort',
    rating: 5,
    price: 'BD 40-60 day pass',
    description: 'Luxury beach experience with pristine facilities, private cabanas, and world-class service.',
    features: ['Private beach', 'Infinity pool', 'Cabanas', 'Fine dining', 'Spa access', 'Water activities'],
    bestFor: 'Special occasions, couples, luxury seekers',
    events: 'Pool parties, special brunches, celebrity DJ events',
    hours: '7 AM - Sunset',
    contact: 'Reservations recommended',
  },
  {
    name: 'The Ritz-Carlton Beach Club',
    location: 'Seef',
    type: 'Luxury Beach Club',
    rating: 5,
    price: 'BD 35-50 day pass',
    description: 'Elegant beachfront setting with excellent facilities and renowned Ritz service.',
    features: ['Beach access', 'Multiple pools', 'Fitness center', 'Beach restaurant', 'Kids pool', 'Towel service'],
    bestFor: 'Families, relaxation, luxury experience',
    events: 'Friday brunch with pool, special occasions',
    hours: '6 AM - 10 PM',
    contact: 'Call to reserve',
  },
  {
    name: 'Sofitel Bahrain Beach',
    location: 'Zallaq',
    type: 'Resort Beach Club',
    rating: 4,
    price: 'BD 20-35 day pass',
    description: 'Beautiful beach resort with a relaxed atmosphere and excellent French-inspired cuisine.',
    features: ['Private beach', 'Pool', 'Beach bar', 'Water sports', 'Spa', 'Multiple restaurants'],
    bestFor: 'Relaxation, couples, beach lovers',
    events: 'Sunset sessions, weekend brunches',
    hours: '8 AM - 8 PM',
    contact: 'Walk-in or reserve',
  },
  {
    name: 'ART Rotana Beach',
    location: 'Amwaj Islands',
    type: 'Resort Beach',
    rating: 4,
    price: 'BD 15-25 day pass',
    description: 'Family-friendly beach resort with good value day passes including pool and beach access.',
    features: ['Beach access', 'Pool', 'Kids pool', 'Beach bar', 'Water activities', 'Gym access'],
    bestFor: 'Families, budget-conscious, casual day out',
    events: 'Weekend activities, family events',
    hours: '8 AM - 7 PM',
    contact: 'Walk-in available',
  },
  {
    name: 'Lost Paradise of Dilmun',
    location: 'Sakhir',
    type: 'Water Park',
    rating: 4,
    price: 'BD 18-22 entry',
    description: 'Bahrain\'s largest waterpark with slides, wave pools, and lazy rivers. Great for families.',
    features: ['Water slides', 'Wave pool', 'Lazy river', 'Kids zones', 'Food outlets', 'Cabanas'],
    bestFor: 'Families with kids, thrill seekers',
    events: 'Season passes, birthday packages',
    hours: '10 AM - 6 PM (varies seasonally)',
    contact: 'Book online for discounts',
  },
  {
    name: 'Marassi Beach',
    location: 'Diyar Al Muharraq',
    type: 'Public Beach',
    rating: 4,
    price: 'Free (paid parking)',
    description: 'Beautiful public beach with clear waters, walking paths, and nearby dining options.',
    features: ['Public beach', 'Walking paths', 'Nearby restaurants', 'Family-friendly', 'Parking', 'Clean facilities'],
    bestFor: 'Budget beach day, families, sunset walks',
    events: 'Public events occasionally',
    hours: '24/7 (best during daylight)',
    contact: 'No reservation needed',
  },
  {
    name: 'Al Dar Islands',
    location: 'Off Sitra coast',
    type: 'Island Resort',
    rating: 5,
    price: 'BD 8-12 boat + island',
    description: 'Private island experience with pristine beaches, water sports, and pearl diving.',
    features: ['Private beach', 'Snorkeling', 'Pearl diving', 'Kayaking', 'Restaurant', 'Chalets'],
    bestFor: 'Day trips, couples, unique experience',
    events: 'Pearl diving experiences, island camping',
    hours: 'Boats run 9 AM - 5 PM',
    contact: 'Book boat in advance',
  },
];

const seasonGuide = [
  {
    season: 'Winter (Nov-Feb)',
    weather: 'Perfect 20-25°C',
    recommendation: 'Ideal beach weather. All clubs busy, especially weekends.',
    tip: 'Book day passes in advance for Fridays',
  },
  {
    season: 'Spring (Mar-Apr)',
    weather: 'Warm 25-32°C',
    recommendation: 'Great beach season. F1 weekend brings special events.',
    tip: 'Pool parties in full swing',
  },
  {
    season: 'Summer (May-Sep)',
    weather: 'Hot 35-45°C',
    recommendation: 'Morning or evening visits only. Pools preferred over beach.',
    tip: 'Early morning swims, evening sundowners',
  },
  {
    season: 'Autumn (Oct)',
    weather: 'Pleasant 28-35°C',
    recommendation: 'Beach season returns. Water still warm from summer.',
    tip: 'Less crowded than winter',
  },
];

const beachTips = [
  {
    title: 'What to Bring',
    content: 'Sunscreen (essential!), hat, sunglasses, cover-up for restaurants. Most clubs provide towels.',
  },
  {
    title: 'Dress Code',
    content: 'Swimwear by pools/beach. Cover up for restaurants and common areas. Some clubs have smart casual evening dress codes.',
  },
  {
    title: 'Booking',
    content: 'Always book day passes for Fridays and public holidays. Weekdays are usually walk-in friendly.',
  },
  {
    title: 'Food & Drink',
    content: 'Most clubs don\'t allow outside food. Budget for lunch and drinks (typically BD 15-25 extra).',
  },
  {
    title: 'Kids',
    content: 'Coral Bay, Ritz-Carlton, and Lost Paradise are most family-friendly. Ask about kids\' pricing.',
  },
  {
    title: 'Events',
    content: 'Friday pool parties are big social events. Follow clubs on Instagram for event announcements.',
  },
];

const poolParties = [
  {
    venue: 'Coral Bay',
    day: 'Friday',
    time: '12 PM - 8 PM',
    vibe: 'Biggest regular pool party in Bahrain',
    music: 'House, Deep House, Chill',
  },
  {
    venue: 'Four Seasons',
    day: 'Select Fridays',
    time: 'Varies',
    vibe: 'Upscale events with international DJs',
    music: 'House, Electronic',
  },
  {
    venue: 'Sofitel',
    day: 'Saturday',
    time: '12 PM - 6 PM',
    vibe: 'Relaxed weekend pool session',
    music: 'Chill, Acoustic',
  },
];

export default function BeachClubsPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-cyan-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Beach Clubs', url: 'https://www.bahrainnights.com/guides/beach-clubs' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-medium mb-4">
              🏖️ Beach & Pool Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Beach Clubs
              </span>
              {' '}in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From luxury beach resorts to vibrant pool parties — discover the best 
              beach clubs, day passes, and waterfront experiences in Bahrain.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Beach Clubs', value: '10+', icon: Waves },
              { label: 'Day Pass From', value: 'BD 15', icon: DollarSign },
              { label: 'Pool Parties/Week', value: '5+', icon: Music },
              { label: 'Best Season', value: 'Oct-Apr', icon: Sun },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-cyan-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beach Clubs List */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Best Beach Clubs</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Complete guide to beach clubs and pool day passes in Bahrain.
          </p>
          
          <div className="space-y-6">
            {beachClubs.map((club) => (
              <div 
                key={club.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold">{club.name}</h3>
                        <p className="text-cyan-400 text-sm">{club.location} • {club.type}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex">
                          {[...Array(club.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                          ))}
                        </div>
                        <span className="text-sm font-bold text-white">{club.price}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{club.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {club.features.map((f) => (
                        <span key={f} className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="md:w-1/3 space-y-2 text-sm">
                    <p><strong className="text-gray-400">Best for:</strong> {club.bestFor}</p>
                    <p><strong className="text-gray-400">Events:</strong> {club.events}</p>
                    <p><strong className="text-gray-400">Hours:</strong> {club.hours}</p>
                    <p><strong className="text-cyan-400">{club.contact}</strong></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Season Guide */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">When to Visit</h2>
          
          <div className="grid md:grid-cols-4 gap-4">
            {seasonGuide.map((season) => (
              <div 
                key={season.season}
                className={`bg-white/5 rounded-xl p-5 ${
                  season.season.includes('Winter') ? 'ring-2 ring-cyan-500' : ''
                }`}
              >
                <h3 className="font-bold text-cyan-400 mb-2">{season.season}</h3>
                <p className="text-sm text-gray-300 mb-2">{season.weather}</p>
                <p className="text-sm text-gray-400 mb-2">{season.recommendation}</p>
                <p className="text-xs text-cyan-300 italic">💡 {season.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pool Parties */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <Music className="inline w-8 h-8 mr-2 text-cyan-400" />
            Pool Parties
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {poolParties.map((party) => (
              <div key={party.venue} className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2">{party.venue}</h3>
                <p className="text-cyan-400 text-sm mb-4">{party.day} • {party.time}</p>
                <p className="text-gray-300 text-sm mb-2">{party.vibe}</p>
                <p className="text-xs text-gray-400">Music: {party.music}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 mt-6 text-sm">
            Follow beach clubs on Instagram for event announcements and special parties
          </p>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Beach Day Tips</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {beachTips.map((tip) => (
              <div key={tip.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-cyan-400 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-300">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for the Beach?</h2>
          <p className="text-gray-300 mb-8">
            Check out beach club events and plan your perfect day by the water.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/events"
              className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg transition-colors"
            >
              View Beach Events
            </Link>
            <Link 
              href="/places?category=beach"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              All Beach Venues
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
              { title: 'Things to Do', href: '/guides/things-to-do', emoji: '🎯' },
              { title: 'Best Brunches', href: '/guides/brunches', emoji: '🥂' },
              { title: 'Family Activities', href: '/family-kids', emoji: '👨‍👩‍👧‍👦' },
              { title: 'Best Parties', href: '/guides/parties', emoji: '🎉' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group"
              >
                <span className="text-2xl mb-2 block">{guide.emoji}</span>
                <span className="font-medium group-hover:text-cyan-400 transition-colors">
                  {guide.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {[
              {
                q: 'What are the best beach clubs in Bahrain?',
                a: 'Coral Bay is the most popular for its beach parties and atmosphere. Four Seasons and Ritz-Carlton offer luxury experiences. For families, Lost Paradise waterpark and Al Dar Islands are great options.',
              },
              {
                q: 'How much does a beach club day pass cost?',
                a: 'Day passes range from BD 15-25 at mid-range venues like Coral Bay and ART Rotana, to BD 35-60 at luxury hotels like Four Seasons and Ritz-Carlton.',
              },
              {
                q: 'When is the best time to visit beach clubs in Bahrain?',
                a: 'October to April offers the best weather (20-32°C). Summer months (May-September) are very hot (35-45°C) - best for early mornings or evening visits only.',
              },
              {
                q: 'Do I need to book beach club day passes in advance?',
                a: 'For Fridays and public holidays, booking in advance is recommended, especially at popular venues like Coral Bay. Weekdays are usually walk-in friendly.',
              },
            ].map((faq, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6">
                <h3 className="font-bold mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
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
            headline: 'Beach Clubs in Bahrain 2026 | Best Pools, Day Passes & Parties',
            description: 'Complete guide to beach clubs in Bahrain including day passes, pool parties, and the best beaches.',
            author: {
              '@type': 'Organization',
              name: 'BahrainNights',
              url: 'https://bahrainnights.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'BahrainNights',
            },
            datePublished: '2026-01-26',
            dateModified: lastUpdated,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://bahrainnights.com/guides/beach-clubs',
            },
          }),
        }}
      />
      
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What are the best beach clubs in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Coral Bay is the most popular for its beach parties and atmosphere. Four Seasons and Ritz-Carlton offer luxury experiences.',
                },
              },
              {
                '@type': 'Question',
                name: 'How much does a beach club day pass cost?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Day passes range from BD 15-25 at mid-range venues to BD 35-60 at luxury hotels.',
                },
              },
              {
                '@type': 'Question',
                name: 'When is the best time to visit beach clubs in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'October to April offers the best weather (20-32°C).',
                },
              },
            ],
          }),
        }}
      />

      <InternalLinks 
        title="Explore More"
        links={[
          { title: 'All Guides', href: '/guides' },
          { title: 'Discover Places', href: '/places' },
          { title: 'Upcoming Events', href: '/events' },
          { title: 'Best Brunches', href: '/guides/brunches' },
          { title: 'Pool Parties', href: '/guides/parties' },
          { title: 'Amwaj Islands', href: '/guides/amwaj' },
        ]}
      />
    </div>
  );
}
