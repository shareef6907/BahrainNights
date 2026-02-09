import { Metadata } from 'next';
import Link from 'next/link';
import { 
  PartyPopper, Clock, MapPin, Star,
  Calendar, Music, Users, Sparkles,
  Wine, Utensils, Building, DollarSign
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: "New Year's Eve in Bahrain — Best Parties & Events 2026 | Complete Guide",
  description: "Celebrate New Year's Eve 2026 in Bahrain! Discover the best NYE parties, fireworks, concerts, dinners, and countdown events at hotels, clubs, and venues across the kingdom.",
  keywords: 'New Year Bahrain, NYE Bahrain, New Year Eve Bahrain, countdown Bahrain, New Year party Bahrain, fireworks Bahrain New Year, best NYE parties Bahrain',
  openGraph: {
    title: "New Year's Eve in Bahrain — Best Parties & Events",
    description: 'Your guide to celebrating NYE 2026 in Bahrain with parties, fireworks, and countdown events.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/new-year-bahrain',
    images: [{ url: 'https://www.bahrainnights.com/images/new-year-bahrain-og.jpg', width: 1200, height: 630, alt: "New Year's Eve in Bahrain" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "New Year's Eve in Bahrain — Best Parties & Events",
    description: 'Complete guide to NYE celebrations in Bahrain.',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/new-year-bahrain',
  },
};

const nyeParties = [
  {
    name: 'Four Seasons NYE Gala',
    location: 'Bahrain Bay',
    type: 'Luxury Gala',
    price: 'BD 150-250',
    description: "The most prestigious New Year's Eve celebration in Bahrain. The Four Seasons hosts an elegant black-tie gala featuring international live entertainment, gourmet dining, premium open bar, and midnight fireworks views over Bahrain Bay.",
    highlights: ['Black-tie gala', 'Live international acts', 'Gourmet dinner', 'Premium open bar', 'Fireworks view'],
    dressCode: 'Black tie / Formal',
  },
  {
    name: 'Ritz-Carlton NYE Party',
    location: 'Seef',
    type: 'Premium Party',
    price: 'BD 120-180',
    description: "The Ritz-Carlton transforms for New Year's Eve with multiple party zones, live bands, DJs, and an elaborate buffet dinner. Their beachfront setting offers firework views and sophisticated atmosphere.",
    highlights: ['Multiple party areas', 'Live bands & DJs', 'Dinner buffet', 'Beach setting', 'Midnight countdown'],
    dressCode: 'Smart elegant',
  },
  {
    name: 'Gulf Hotel NYE Celebration',
    location: 'Adliya',
    type: 'Hotel Party',
    price: 'BD 80-120',
    description: 'A long-standing NYE tradition in Bahrain, Gulf Hotel offers excellent value with quality entertainment, good food, and a central location. Multiple venue options cater to different vibes.',
    highlights: ['Multiple venues', 'Good value', 'Quality entertainment', 'Central location'],
    dressCode: 'Smart casual to elegant',
  },
  {
    name: 'ART Rotana Beach Party',
    location: 'Amwaj Islands',
    type: 'Beach Party',
    price: 'BD 100-150',
    description: "Ring in the new year with your feet in the sand at ART Rotana's beach NYE party. A more relaxed vibe with live music, BBQ stations, beach bonfire, and fireworks over Amwaj waters.",
    highlights: ['Beach party vibe', 'Live music', 'BBQ & bonfire', 'Fireworks', 'Relaxed atmosphere'],
    dressCode: 'Beach elegant',
  },
  {
    name: 'Coral Bay NYE',
    location: 'Budaiya',
    type: 'Beach Club Party',
    price: 'BD 80-120',
    description: "Bahrain's favorite beach club hosts a legendary NYE party with top DJs, beach dancing, flowing drinks, and midnight fireworks. The atmosphere is energetic and youthful.",
    highlights: ['Beach club setting', 'Top DJs', 'Party atmosphere', 'Fireworks', 'Late night dancing'],
    dressCode: 'Beach chic',
  },
];

const nyeDinners = [
  {
    name: 'CUT by Wolfgang Puck',
    location: 'Four Seasons',
    cuisine: 'Steakhouse',
    price: 'BD 80-120',
    description: 'World-class steaks and a special NYE menu in an elegant setting. Perfect for couples seeking refined dining before heading to parties.',
    features: ['Special NYE menu', 'Premium steaks', 'Elegant ambiance'],
  },
  {
    name: 'La Med',
    location: 'Ritz-Carlton',
    cuisine: 'Mediterranean',
    price: 'BD 70-100',
    description: 'Mediterranean feast with stunning sea views. Their NYE dinner package often includes party access afterward.',
    features: ['Sea views', 'Party package options', 'Mediterranean menu'],
  },
  {
    name: 'Masso',
    location: 'Four Seasons',
    cuisine: 'Italian',
    price: 'BD 60-90',
    description: 'Authentic Italian cuisine for an intimate NYE dinner. Their terrace offers bay views for the midnight fireworks.',
    features: ['Italian fine dining', 'Bay views', 'Intimate setting'],
  },
  {
    name: 'Bushido',
    location: 'Diplomatic Area',
    cuisine: 'Japanese',
    price: 'BD 50-80',
    description: 'Trendy Japanese restaurant with a special NYE atmosphere. Popular with the younger crowd before heading out to parties.',
    features: ['Trendy vibe', 'Japanese fusion', 'Pre-party crowd'],
  },
];

const fireworksLocations = [
  { name: 'Bahrain Bay', description: 'The main NYE fireworks display launches here at midnight. Best views from the walkway or hotel rooftops.', type: 'Main Display' },
  { name: 'Amwaj Islands', description: 'Smaller but scenic fireworks over the marina. Less crowded alternative to Bahrain Bay.', type: 'Secondary Display' },
  { name: 'Hotel Rooftops', description: 'Four Seasons, Ritz-Carlton, and other hotels offer prime elevated views of the fireworks.', type: 'Premium Views' },
  { name: 'Juffair Area', description: 'Some bars and hotels in Juffair host rooftop countdowns with views of distant fireworks.', type: 'Alternative Viewing' },
];

const nyeNightlife = [
  {
    name: 'Block 338 Bars',
    area: 'Adliya',
    description: "The heart of Bahrain's bar scene comes alive on NYE. Multiple venues mean you can bar-hop through the countdown.",
    venues: ['Calexico', "JJ's Irish Pub", 'Various lounges'],
    vibe: 'Bar-hopping, casual party',
  },
  {
    name: 'Juffair Clubs',
    area: 'Juffair',
    description: 'Nightclubs in Juffair host special NYE events with DJs, performances, and countdown celebrations. More casual than hotel galas.',
    venues: ['Various nightclubs'],
    vibe: 'Club night, dancing',
  },
  {
    name: 'Hotel Bars',
    area: 'Various',
    description: 'Hotel bars offer sophisticated NYE environments with quality drinks, live music, and often views of fireworks.',
    venues: ['Lobby lounges', 'Rooftop bars'],
    vibe: 'Sophisticated, drinks-focused',
  },
];

const nyeTips = [
  { title: 'Book Early', content: 'NYE events sell out weeks in advance. Book hotel parties by mid-December; popular restaurants by early December.', icon: Calendar },
  { title: 'Transport Planning', content: "Taxis are scarce and surge-priced on NYE. Book a return taxi in advance, use Careem/Uber (expect surcharges), or stay at your party venue.", icon: MapPin },
  { title: 'Dress Code', content: 'NYE is the time to dress up. Most hotel events require formal or smart elegant attire. Beach parties allow resort chic.', icon: Users },
  { title: 'Hotel Stay', content: 'Consider booking a room at your party venue. Many hotels offer NYE packages including accommodation.', icon: Building },
  { title: 'January 1st Plans', content: 'January 1 is a public holiday. Many hotels offer recovery brunches. Plan ahead for New Year\'s Day brunch reservations.', icon: Clock },
  { title: 'Budget Wisely', content: "NYE in Bahrain isn't cheap. Budget BD 100-300 per person for a quality celebration including dinner, drinks, and party.", icon: DollarSign },
];

const countdownSpots = [
  { name: 'Bahrain Bay Walkway', type: 'Public', price: 'Free', description: 'Join crowds watching fireworks. Bring your own drinks (discreetly). Family-friendly early evening.' },
  { name: 'Hotel Galas', type: 'Ticketed', price: 'BD 100-250', description: 'All-inclusive celebrations with entertainment, food, drinks, and fireworks.' },
  { name: 'Beach Clubs', type: 'Ticketed', price: 'BD 80-150', description: 'Beach party atmosphere with DJs, drinks, and seaside countdown.' },
  { name: 'Restaurant Dinners', type: 'Reservation', price: 'BD 50-120', description: 'Elegant dinner then watch fireworks or head to a party.' },
];

const faqs = [
  { q: "Where are the best fireworks for New Year's Eve in Bahrain?", a: 'The main NYE fireworks display is at Bahrain Bay, launched at midnight. Best views are from the waterfront walkway, hotel rooftops (Four Seasons, Ritz-Carlton), or Bahrain Bay restaurants. Amwaj Islands also has a smaller display.' },
  { q: "How much does New Year's Eve in Bahrain cost?", a: 'NYE celebrations range from free (public fireworks viewing) to BD 250+ (luxury hotel galas). Budget BD 80-120 for good beach club or mid-range hotel parties. Fine dining NYE dinners run BD 50-120.' },
  { q: 'Is January 1st a public holiday in Bahrain?', a: "Yes, January 1st is an official public holiday in Bahrain. Most businesses are closed, but hotels, malls, and tourist areas operate normally. Many hotels offer New Year's Day recovery brunches." },
  { q: "What should I wear to New Year's Eve parties in Bahrain?", a: 'Dress code varies by venue. Luxury hotel galas require formal/black-tie attire. Most hotel parties expect smart elegant dress. Beach club parties allow resort chic or beach elegant.' },
  { q: "How do I get around on New Year's Eve in Bahrain?", a: "Transport is challenging on NYE. Book taxis in advance, use Careem/Uber (expect 2-3x surge pricing), or stay at your party venue. Never drink and drive — Bahrain has strict drunk driving laws." },
];

export default function NewYearBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-amber-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'New Year Bahrain', url: 'https://www.bahrainnights.com/guides/new-year-bahrain' },
      ]} />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-4">🎆 Celebration Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">New Year&apos;s Eve in Bahrain</span>
              <span className="block text-2xl md:text-3xl mt-2 text-white">Best Parties & Events 2026</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ring in 2027 in style! From glamorous hotel galas and beach club bashes to waterfront fireworks and legendary parties, discover the best ways to celebrate New Year&apos;s Eve in the Kingdom of Bahrain.
            </p>
            <p className="text-sm text-gray-500 mt-4">Last updated: {lastUpdated}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'NYE Date', value: 'Dec 31', icon: Calendar },
              { label: 'Fireworks', value: 'Midnight', icon: Sparkles },
              { label: 'Best Parties', value: '10+', icon: PartyPopper },
              { label: 'Jan 1 Holiday', value: 'Yes', icon: Star },
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

      {/* Introduction */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto prose prose-invert">
          <p className="text-lg text-gray-300 leading-relaxed">
            New Year&apos;s Eve in Bahrain is a night of glamour, celebration, and unforgettable moments. Unlike neighboring Saudi Arabia where NYE celebrations are more subdued, Bahrain embraces the occasion with open arms — fireworks light up the bay, champagne flows at luxury hotels, and the kingdom&apos;s best venues compete to throw the party of the year.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed mt-4">
            Whether you&apos;re looking for a sophisticated black-tie gala, a beach party under the stars, an intimate fine dining experience, or simply a great spot to watch the midnight fireworks, Bahrain delivers. This guide covers the best NYE options across all budgets and styles, plus essential tips for making your celebration smooth and memorable.
          </p>
        </div>
      </section>

      {/* Best NYE Parties */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Best New Year&apos;s Eve Parties 2026</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">The most sought-after NYE celebrations in Bahrain. Book early — these sell out fast.</p>
          
          <div className="space-y-6">
            {nyeParties.map((party) => (
              <div key={party.name} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-300 text-xs rounded-full mb-3">{party.type}</span>
                    <h3 className="text-xl font-bold">{party.name}</h3>
                    <p className="text-amber-400 text-sm flex items-center gap-1 mb-2">
                      <MapPin className="w-4 h-4" />{party.location}
                    </p>
                    <p className="text-gray-300 mb-4">{party.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {party.highlights.map((h) => (<span key={h} className="text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded">{h}</span>))}
                    </div>
                    <p className="text-sm text-gray-400">👔 Dress code: {party.dressCode}</p>
                  </div>
                  <div className="lg:w-1/4 lg:text-right">
                    <span className="text-xl font-bold text-white">{party.price}</span>
                    <p className="text-sm text-gray-400">per person</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NYE Dinners */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Fine Dining on New Year&apos;s Eve</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Start your evening with a memorable meal before heading to parties or fireworks.</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {nyeDinners.map((restaurant) => (
              <div key={restaurant.name} className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold">{restaurant.name}</h3>
                    <p className="text-amber-400 text-sm">{restaurant.location} • {restaurant.cuisine}</p>
                  </div>
                  <span className="text-lg font-bold">{restaurant.price}</span>
                </div>
                <p className="text-gray-300 text-sm mb-3">{restaurant.description}</p>
                <div className="flex flex-wrap gap-2">
                  {restaurant.features.map((f) => (
                    <span key={f} className="text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded">{f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-center mt-8 text-gray-400">
            More options: <Link href="/guides/restaurants" className="text-amber-400 hover:underline">Best Restaurants</Link> • <Link href="/guides/romantic" className="text-amber-400 hover:underline">Romantic Dining</Link>
          </p>
        </div>
      </section>

      {/* Fireworks */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">NYE Fireworks in Bahrain</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Where to watch the midnight fireworks display.</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {fireworksLocations.map((location) => (
              <div key={location.name} className="bg-white/5 rounded-xl p-5">
                <span className="inline-block px-2 py-1 bg-amber-500/20 text-amber-300 text-xs rounded mb-3">{location.type}</span>
                <h3 className="font-bold text-amber-400 mb-2">{location.name}</h3>
                <p className="text-sm text-gray-300">{location.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nightlife Options */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">NYE Nightlife Scene</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {nyeNightlife.map((area) => (
              <div key={area.name} className="bg-white/5 rounded-xl p-6">
                <h3 className="text-xl font-bold text-amber-400 mb-1">{area.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{area.area}</p>
                <p className="text-gray-300 text-sm mb-4">{area.description}</p>
                <p className="text-xs text-gray-400 mb-2">Popular: {area.venues.join(', ')}</p>
                <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded">{area.vibe}</span>
              </div>
            ))}
          </div>
          
          <p className="text-center mt-8 text-gray-400">
            Explore: <Link href="/guides/nightlife" className="text-amber-400 hover:underline">Bahrain Nightlife Guide</Link> • <Link href="/guides/nightlife-juffair" className="text-amber-400 hover:underline">Juffair Nightlife</Link>
          </p>
        </div>
      </section>

      {/* Countdown Options */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Countdown Options by Budget</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {countdownSpots.map((spot) => (
              <div key={spot.name} className="bg-white/5 rounded-xl p-5">
                <span className="inline-block px-2 py-1 bg-amber-500/20 text-amber-300 text-xs rounded mb-3">{spot.type}</span>
                <h3 className="font-bold mb-1">{spot.name}</h3>
                <p className="text-xl font-bold text-amber-400 mb-2">{spot.price}</p>
                <p className="text-sm text-gray-300">{spot.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Essential NYE Tips</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Make your New Year&apos;s Eve celebration smooth and memorable.</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nyeTips.map((tip) => (
              <div key={tip.title} className="bg-white/5 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-500/20 rounded-lg">
                    <tip.icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">{tip.title}</h3>
                    <p className="text-gray-400 text-sm">{tip.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white/5 rounded-xl p-6">
                <h3 className="font-bold text-amber-400 mb-2">{faq.q}</h3>
                <p className="text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Celebrate?</h2>
          <p className="text-gray-300 mb-8">
            Start planning your perfect New Year&apos;s Eve in Bahrain now.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/nightlife"
              className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg transition-colors"
            >
              Explore Nightlife
            </Link>
            <Link 
              href="/guides/restaurants"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              Best Restaurants
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(faq => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a,
              },
            })),
          }),
        }}
      />

      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: "New Year's Eve in Bahrain — Best Parties & Events 2026",
            description: 'Complete guide to NYE celebrations in Bahrain including parties, fireworks, and dining.',
            author: { '@type': 'Organization', name: 'BahrainNights' },
            publisher: { '@type': 'Organization', name: 'BahrainNights' },
            datePublished: '2026-01-25',
            dateModified: lastUpdated,
          }),
        }}
      />
    </div>
  );
}
