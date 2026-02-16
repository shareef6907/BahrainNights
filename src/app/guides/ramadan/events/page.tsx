import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Moon, Clock, MapPin, Star, Calendar, Users, 
  Music, ShoppingBag, Heart, BookOpen, Sparkles
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import InternalLinks from '@/components/SEO/InternalLinks';

export const metadata: Metadata = {
  title: 'Ramadan Events Bahrain 2026 | What to Do During Ramadan',
  description: 'Discover Ramadan events and activities in Bahrain 2026. From Ramadan markets and charity events to cultural activities, Quran recitations, and family entertainment.',
  keywords: 'Ramadan events Bahrain 2026, what to do Ramadan Bahrain, Ramadan activities Bahrain, Ramadan markets Bahrain, charity events Ramadan, Quran recitations Bahrain',
  openGraph: {
    title: 'Ramadan Events Bahrain 2026 | What to Do During Ramadan',
    description: 'Find the best Ramadan events and activities in Bahrain - markets, charity events, cultural activities, and entertainment.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/ramadan/events',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/ramadan/events',
  },
};

const ramadanMarkets = [
  {
    name: 'Bahrain Ramadan Market',
    location: 'Exhibition World Bahrain',
    dates: 'Throughout Ramadan',
    description: 'The largest Ramadan market in Bahrain featuring local vendors, traditional crafts, food stalls, and entertainment. Shop for Ramadan essentials, traditional clothing, and unique gifts.',
    highlights: ['Local vendors', 'Traditional crafts', 'Food stalls', 'Live entertainment', 'Family-friendly'],
    timing: '5:00 PM - 1:00 AM',
  },
  {
    name: 'Block 338 Ramadan Nights',
    location: 'Adliya',
    dates: 'Weekends during Ramadan',
    description: 'The vibrant Block 338 comes alive with special Ramadan night markets. Browse boutique shops, enjoy pop-up food vendors, and experience the festive atmosphere.',
    highlights: ['Boutique shopping', 'Pop-up vendors', 'Art galleries', 'Café culture', 'Evening walks'],
    timing: 'After iftar until late',
  },
  {
    name: 'Bab Al Bahrain Souq',
    location: 'Manama',
    dates: 'Daily during Ramadan',
    description: 'The historic Manama souq takes on special energy during Ramadan. Shop for traditional Ramadan items, Arabic perfumes, gold, and experience old Bahrain.',
    highlights: ['Historic atmosphere', 'Traditional goods', 'Arabic perfumes', 'Gold souq', 'Budget-friendly'],
    timing: 'Extended evening hours',
  },
];

const culturalEvents = [
  {
    name: 'Quran Recitations at Al-Fateh Mosque',
    location: 'Juffair',
    dates: 'Every evening',
    description: 'Experience beautiful Quran recitations at Bahrain\'s largest mosque. The Al-Fateh Grand Mosque hosts special Taraweeh prayers and recitations throughout Ramadan.',
    type: 'Religious',
    icon: BookOpen,
  },
  {
    name: 'Ramadan Nights at Bahrain National Museum',
    location: 'Manama',
    dates: 'Select evenings',
    description: 'The National Museum hosts special Ramadan programming including cultural exhibitions, traditional music performances, and educational workshops.',
    type: 'Cultural',
    icon: Sparkles,
  },
  {
    name: 'Traditional Music at Muharraq Heritage',
    location: 'Muharraq',
    dates: 'Weekends',
    description: 'Explore Muharraq\'s UNESCO heritage sites with special Ramadan evening programs featuring traditional Bahraini music, poetry, and cultural performances.',
    type: 'Heritage',
    icon: Music,
  },
  {
    name: 'Art Exhibitions - Block 338',
    location: 'Adliya',
    dates: 'Throughout Ramadan',
    description: 'Local galleries showcase Ramadan-themed art exhibitions featuring Bahraini and regional artists. Many galleries host evening openings after iftar.',
    type: 'Art',
    icon: Sparkles,
  },
];

const charityEvents = [
  {
    name: 'Royal Charity Organisation Iftar',
    description: 'The RCO hosts daily iftar meals for workers and those in need across Bahrain. Volunteer opportunities available.',
    howToHelp: 'Donate or volunteer through RCO website',
  },
  {
    name: 'Community Iftar Tents',
    description: 'Various mosques and community organizations set up free iftar tents throughout Bahrain, serving hundreds daily.',
    howToHelp: 'Donate food supplies or volunteer to serve',
  },
  {
    name: 'Food Bank Bahrain',
    description: 'Increased collection and distribution during Ramadan. Food parcels delivered to families in need throughout the month.',
    howToHelp: 'Donate food items or sponsor family food parcels',
  },
  {
    name: 'Clothing Drives',
    description: 'Multiple organizations collect and distribute clothing and Eid outfits for children and families in need.',
    howToHelp: 'Donate gently used or new clothing',
  },
];

const familyActivities = [
  {
    name: 'Ramadan Decorations at Malls',
    location: 'City Centre, Seef Mall, The Avenues',
    description: 'Major malls feature spectacular Ramadan decorations, lighting displays, and special activities for children. Great for family outings after iftar.',
    bestFor: 'Families with children',
  },
  {
    name: 'Wahooo! Waterpark',
    location: 'City Centre Bahrain',
    description: 'Extended evening hours during Ramadan make this perfect for families. Beat the heat and enjoy the waterpark after iftar.',
    bestFor: 'Active families',
  },
  {
    name: 'Lost Paradise of Dilmun',
    location: 'Near Zallaq',
    description: 'The waterpark offers special Ramadan evening sessions with cooler temperatures and beautiful sunset views.',
    bestFor: 'Adventure seekers',
  },
  {
    name: 'Gravity Indoor Trampoline Park',
    location: 'Seef District',
    description: 'Perfect evening activity for kids to burn energy after iftar. Extended hours during Ramadan.',
    bestFor: 'Kids and teens',
  },
];

const entertainmentVenues = [
  {
    name: 'Ramadan Tents with Entertainment',
    venues: ['Ritz-Carlton', 'Four Seasons', 'Gulf Hotel'],
    description: 'Luxury hotel Ramadan tents feature live Arabic music, oud players, and traditional entertainment nightly.',
  },
  {
    name: 'Cinema Extended Hours',
    venues: ['VOX Cinemas', 'Cineco'],
    description: 'Cinemas extend hours during Ramadan with late-night showings. Perfect for post-iftar entertainment.',
  },
  {
    name: 'Bowling & Entertainment',
    venues: ['Funland Centre', 'Magic Island'],
    description: 'Family entertainment centers offer bowling, arcade games, and activities with extended Ramadan hours.',
  },
];

const faqs = [
  {
    q: 'What events happen during Ramadan in Bahrain?',
    a: 'Ramadan in Bahrain features numerous events including traditional markets, charity iftars, Quran recitations at mosques, cultural exhibitions at museums, live entertainment at hotel tents, and special family activities at malls and entertainment venues. Most events take place after iftar and continue late into the night.',
  },
  {
    q: 'Are malls open during Ramadan in Bahrain?',
    a: 'Yes, malls are open during Ramadan but with adjusted hours. Most malls open around 10 AM and stay open until midnight or later. Some malls have extended hours until 1-2 AM, especially on weekends. Food courts and restaurants open for iftar time.',
  },
  {
    q: 'What are the best Ramadan markets in Bahrain?',
    a: 'The main Ramadan markets include the Bahrain Ramadan Market at Exhibition World, Block 338 Ramadan Nights in Adliya, and the traditional Bab Al Bahrain Souq in Manama. These markets feature local vendors, traditional crafts, food stalls, and evening entertainment.',
  },
  {
    q: 'Can non-Muslims attend Ramadan events in Bahrain?',
    a: 'Yes, non-Muslims are welcome at most Ramadan events in Bahrain including markets, cultural exhibitions, and entertainment venues. Visitors should dress modestly and be respectful. Public eating and drinking should be avoided during fasting hours out of respect.',
  },
  {
    q: 'What charity events happen during Ramadan in Bahrain?',
    a: 'Ramadan is a time of giving in Bahrain. Major charity initiatives include Royal Charity Organisation iftars for workers, community iftar tents at mosques, Food Bank Bahrain distributions, and clothing drives. Many organizations welcome volunteers and donations.',
  },
  {
    q: 'What can families do during Ramadan evenings in Bahrain?',
    a: 'Family activities during Ramadan include visiting mall decorations and events, waterparks with extended evening hours (Wahooo!, Lost Paradise), entertainment centers like Gravity, late-night cinema showings, and strolling through Ramadan markets. Most venues extend hours to accommodate the Ramadan schedule.',
  },
];

export default function RamadanEventsPage() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://www.bahrainnights.com' },
    { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
    { name: 'Ramadan', url: 'https://www.bahrainnights.com/guides/ramadan' },
    { name: 'Ramadan Events', url: 'https://www.bahrainnights.com/guides/ramadan/events' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={faqs} />
      
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Ramadan Events Bahrain 2026 | What to Do During Ramadan',
            description: 'Comprehensive guide to Ramadan events and activities in Bahrain for 2026.',
            author: { '@type': 'Organization', name: 'Bahrain Nights' },
            publisher: { '@type': 'Organization', name: 'Bahrain Nights' },
            datePublished: '2026-02-01',
            dateModified: '2026-02-15',
            mainEntityOfPage: 'https://www.bahrainnights.com/guides/ramadan/events',
          }),
        }}
      />

      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-green-500/5 to-teal-500/10" />
          <div className="max-w-4xl mx-auto text-center relative">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Moon className="w-8 h-8 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Ramadan 2026</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ramadan Events in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500">
                Bahrain
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Discover what to do during Ramadan 2026 in Bahrain. From traditional markets and cultural events 
              to charity initiatives and family entertainment, make the most of the holy month.
            </p>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="py-8 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4">
            <a href="#markets" className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-full hover:bg-emerald-500/30 transition-colors">
              <ShoppingBag className="w-4 h-4 inline mr-1" /> Markets
            </a>
            <a href="#cultural" className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full hover:bg-green-500/30 transition-colors">
              <Sparkles className="w-4 h-4 inline mr-1" /> Cultural Events
            </a>
            <a href="#charity" className="px-4 py-2 bg-teal-500/20 text-teal-400 rounded-full hover:bg-teal-500/30 transition-colors">
              <Heart className="w-4 h-4 inline mr-1" /> Charity
            </a>
            <a href="#family" className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-full hover:bg-cyan-500/30 transition-colors">
              <Users className="w-4 h-4 inline mr-1" /> Family Activities
            </a>
          </div>
        </section>

        {/* Ramadan Markets */}
        <section id="markets" className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <ShoppingBag className="w-8 h-8 text-emerald-400" />
              Ramadan Markets
            </h2>
            <p className="text-gray-400 mb-8">Traditional markets and night shopping experiences during Ramadan.</p>
            
            <div className="space-y-6">
              {ramadanMarkets.map((market, index) => (
                <div key={index} className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-emerald-500/30 transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{market.name}</h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" /> {market.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" /> {market.dates}
                        </span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm">
                      {market.timing}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-4">{market.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {market.highlights.map((highlight, i) => (
                      <span key={i} className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-sm">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cultural Events */}
        <section id="cultural" className="py-16 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-green-400" />
              Cultural & Religious Events
            </h2>
            <p className="text-gray-400 mb-8">Experience Bahrain&apos;s rich cultural and spiritual Ramadan traditions.</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {culturalEvents.map((event, index) => {
                const IconComponent = event.icon;
                return (
                  <div key={index} className="bg-slate-900/50 rounded-xl p-6 border border-white/10 hover:border-green-500/30 transition-colors">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <IconComponent className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{event.name}</h3>
                        <p className="text-sm text-gray-400">{event.location}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{event.description}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-green-400" />
                      <span className="text-green-400">{event.dates}</span>
                      <span className="px-2 py-0.5 bg-green-500/10 text-green-400 rounded text-xs ml-auto">
                        {event.type}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Charity Events */}
        <section id="charity" className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Heart className="w-8 h-8 text-teal-400" />
              Charity & Giving Back
            </h2>
            <p className="text-gray-400 mb-8">Ways to contribute and give back during the holy month.</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {charityEvents.map((charity, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-teal-500/30 transition-colors">
                  <h3 className="text-lg font-bold text-white mb-2">{charity.name}</h3>
                  <p className="text-gray-300 text-sm mb-4">{charity.description}</p>
                  <div className="flex items-start gap-2 bg-teal-500/10 rounded-lg p-3">
                    <Heart className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                    <p className="text-teal-400 text-sm">{charity.howToHelp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Family Activities */}
        <section id="family" className="py-16 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Users className="w-8 h-8 text-cyan-400" />
              Family Activities
            </h2>
            <p className="text-gray-400 mb-8">Fun activities for the whole family during Ramadan evenings.</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {familyActivities.map((activity, index) => (
                <div key={index} className="bg-slate-900/50 rounded-xl p-6 border border-white/10 hover:border-cyan-500/30 transition-colors">
                  <h3 className="text-lg font-bold text-white mb-1">{activity.name}</h3>
                  <p className="text-sm text-gray-400 mb-3 flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {activity.location}
                  </p>
                  <p className="text-gray-300 text-sm mb-3">{activity.description}</p>
                  <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm">
                    Best for: {activity.bestFor}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Entertainment */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Music className="w-8 h-8 text-purple-400" />
              Entertainment Venues
            </h2>
            
            <div className="space-y-6">
              {entertainmentVenues.map((venue, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-purple-500/30 transition-colors">
                  <h3 className="text-lg font-bold text-white mb-2">{venue.name}</h3>
                  <p className="text-gray-300 text-sm mb-3">{venue.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {venue.venues.map((v, i) => (
                      <span key={i} className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm">
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-slate-900/50 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
                  <p className="text-gray-300">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Stay Updated on Ramadan Events</h2>
            <p className="text-gray-400 mb-6">
              Check our events page for the latest Ramadan happenings in Bahrain.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/events" className="px-6 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-400 transition-colors">
                Browse All Events
              </Link>
              <Link href="/guides/ramadan" className="px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors">
                Complete Ramadan Guide
              </Link>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <InternalLinks
          title="Explore More"
          links={[
            { href: '/guides/ramadan', title: 'Complete Ramadan Guide' },
            { href: '/guides/ramadan/best-iftars', title: 'Best Iftars' },
            { href: '/guides/ramadan/ghabga', title: 'Ghabga Venues' },
            { href: '/guides/ramadan/suhoor', title: 'Suhoor Spots' },
            { href: '/guides/ramadan/timings', title: 'Ramadan Timings' },
            { href: '/events', title: 'All Events' },
          ]}
        />
      </main>
    </>
  );
}
