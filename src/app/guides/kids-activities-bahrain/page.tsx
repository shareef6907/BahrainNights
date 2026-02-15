import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import InternalLinks from '@/components/SEO/InternalLinks';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, Baby, Gamepad2, Waves, TreePine, Clock, Ticket, Sun, Building2, Palette, Music } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kids Activities in Bahrain 2026 | Family Fun & Things to Do',
  description: 'Discover the best things to do with kids in Bahrain. Amusement parks, water parks, play areas, educational activities, beaches, and family-friendly attractions across the Kingdom.',
  keywords: 'kids activities Bahrain, things to do with kids Bahrain, family activities Bahrain, children entertainment Bahrain, Funland Bahrain, Lost Paradise Bahrain, family fun Bahrain',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/kids-activities-bahrain' },
  openGraph: {
    title: 'Kids Activities in Bahrain 2026 | Family Fun Guide',
    description: 'The best family-friendly activities and attractions for children in Bahrain.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/kids-activities-bahrain',
    images: [{ url: 'https://www.bahrainnights.com/images/kids-bahrain.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kids Activities in Bahrain 2026',
    description: 'Family fun and children\'s attractions in Bahrain.',
  },
};

const faqs = [
  { q: 'What are the best kids attractions in Bahrain?', a: 'Top spots include Lost Paradise of Dilmun (water park), Funland (indoor amusement), Magic Planet (arcade and play), Trampo Extreme (trampolines), Al Areen Wildlife Park (animals and nature), and the National Museum\'s interactive children section. Mall play areas are also popular for younger children.' },
  { q: 'Is there a water park in Bahrain?', a: 'Yes, Lost Paradise of Dilmun in Sakhir is Bahrain\'s premier water park with slides, wave pools, lazy rivers, and dedicated kids\' areas. Entry costs around BD 18-28 depending on day and package. Many hotels also have pool facilities that welcome families with day passes.' },
  { q: 'What indoor activities exist for kids in Bahrain?', a: 'Popular indoor options include Funland (arcade games and rides), Magic Planet (games and soft play), bowling alleys at Dana Mall and Seef, escape rooms for older kids, Trampo Extreme trampoline park, soft play areas in most malls, and cinema complexes with kids\' screenings.' },
  { q: 'Are there beaches suitable for kids in Bahrain?', a: 'Yes, family-friendly beaches include Al Jazayer Beach (public with facilities), Amwaj Islands beaches, and hotel beaches with day passes (Sofitel, ART Rotana, Coral Bay). Always supervise children closely and check for lifeguard presence. Private beach clubs often have better facilities for families.' },
  { q: 'What educational activities are available for children?', a: 'Educational attractions include Bahrain National Museum (interactive exhibits), Bahrain Science Centre (hands-on learning), Al Areen Wildlife Park (500+ animals), Bahrain Fort UNESCO site (history), Qal\'at al-Bahrain (archaeology), and various cultural exhibitions throughout the year.' },
  { q: 'What activities are best during Bahrain\'s hot summer months?', a: 'During summer (May-September), focus on indoor activities: malls with play areas, indoor theme parks, museums, cinema, and swimming pools. Save outdoor activities for early morning or evening when temperatures are more manageable. Water parks open early for cooler hours.' },
];

const topAttractions = [
  {
    name: 'Lost Paradise of Dilmun',
    category: 'Water Park',
    location: 'Sakhir',
    ageRange: 'All ages (baby pools to thrill slides)',
    price: 'BD 18-28',
    hours: '10am-6pm (extended summer)',
    description: 'Bahrain\'s largest water park features wave pools, lazy rivers, water slides for all ages, a dedicated children\'s area, and Arabian-themed landscapes. Perfect for a full day of family fun with restaurants and changing facilities on-site.',
    highlights: ['Wave pool', 'Kids splash zone', 'Thrill slides', 'Lazy river', 'Food outlets'],
  },
  {
    name: 'Al Areen Wildlife Park',
    category: 'Nature & Animals',
    location: 'Sakhir',
    ageRange: 'All ages',
    price: 'BD 2-5',
    hours: '9am-5pm',
    description: 'Arabia\'s first wildlife reserve with over 500 animals including Arabian oryx, gazelles, ostriches, zebras, and exotic birds. Take a safari-style bus tour or explore on foot. Educational and entertaining for kids who love animals.',
    highlights: ['Safari bus tour', 'Walk-through areas', 'Picnic spots', 'Bird watching', 'Educational tours'],
  },
  {
    name: 'Funland',
    category: 'Indoor Amusement',
    location: 'Multiple malls',
    ageRange: 'All ages',
    price: 'BD 5-15 (games/rides)',
    hours: 'Mall hours',
    description: 'Classic indoor amusement center with arcade games, carnival rides, soft play areas, and prize redemption. Multiple locations across Bahrain\'s major malls make it convenient for rainy days or hot afternoons.',
    highlights: ['Arcade games', 'Indoor rides', 'Prize redemption', 'Party rooms', 'Toddler areas'],
  },
  {
    name: 'Bahrain National Museum',
    category: 'Educational',
    location: 'Manama',
    ageRange: 'All ages (guided kids tours)',
    price: 'BD 1-3',
    hours: '8am-8pm',
    description: 'Bahrain\'s premier museum features interactive exhibits on the island\'s 5,000-year history. The children\'s section includes hands-on activities, and special kids\' programs run during school holidays. Air-conditioned and educational.',
    highlights: ['Interactive exhibits', 'Children\'s programs', 'Air-conditioned', 'Cafe on-site', 'Gift shop'],
  },
  {
    name: 'Trampo Extreme',
    category: 'Active Play',
    location: 'Riffa',
    ageRange: '5+ years',
    price: 'BD 7-12 per hour',
    hours: '10am-10pm',
    description: 'Bahrain\'s largest trampoline park with interconnected trampolines, foam pits, dodgeball courts, ninja courses, and basketball dunking areas. Great for burning energy and perfect for birthday parties.',
    highlights: ['Trampolines', 'Foam pits', 'Ninja course', 'Birthday packages', 'Cafe viewing area'],
  },
  {
    name: 'Magic Planet',
    category: 'Entertainment',
    location: 'City Centre Bahrain',
    ageRange: '3-12 years',
    price: 'BD 5-15',
    hours: 'Mall hours',
    description: 'Family entertainment center with arcade games, skill games, soft play areas for toddlers, and exciting rides. Part of the City Centre mega-mall, making it easy to combine with shopping and dining.',
    highlights: ['Soft play', 'Arcade games', 'Skill games', 'Toddler area', 'Prize counter'],
  },
];

const moreActivities = [
  {
    category: 'Outdoor Adventures',
    icon: Sun,
    items: [
      { name: 'Al Dar Islands', desc: 'Beach day trip by boat', location: 'Off coast', age: 'All ages', price: 'BD 10-20' },
      { name: 'Bahrain Fort (Qal\'at)', desc: 'UNESCO heritage site exploration', location: 'Karbabad', age: 'All ages', price: 'Free' },
      { name: 'Tree of Life', desc: 'Desert adventure to ancient tree', location: 'Southern desert', age: 'All ages', price: 'Free' },
      { name: 'Amwaj Beaches', desc: 'Island beach access', location: 'Amwaj Islands', age: 'All ages', price: 'Free/Day pass' },
    ],
  },
  {
    category: 'Indoor Fun',
    icon: Building2,
    items: [
      { name: 'Snow City', desc: 'Indoor snow experience', location: 'Enma Mall', age: '3+', price: 'BD 8-15' },
      { name: 'Bowling', desc: 'Family bowling lanes', location: 'Dana Mall, Seef', age: '5+', price: 'BD 5-10' },
      { name: 'Escape Rooms', desc: 'Puzzle adventures (older kids)', location: 'Various', age: '10+', price: 'BD 10-15' },
      { name: 'Cinema', desc: 'Kids\' screenings at VOX/Cineco', location: 'Malls', age: 'All ages', price: 'BD 3-5' },
    ],
  },
  {
    category: 'Water Activities',
    icon: Waves,
    items: [
      { name: 'Hotel Pool Day Pass', desc: 'Family swim at luxury hotels', location: 'Various hotels', age: 'All ages', price: 'BD 15-30' },
      { name: 'Coral Bay Beach Club', desc: 'Beach club with kids\' pool', location: 'Budaiya', age: 'All ages', price: 'BD 10-20' },
      { name: 'Wahooo! Waterpark', desc: 'Indoor water park', location: 'City Centre', age: 'All ages', price: 'BD 12-20' },
      { name: 'Kayaking Tours', desc: 'Family kayak adventures', location: 'Various', age: '6+', price: 'BD 15-25' },
    ],
  },
  {
    category: 'Creative & Learning',
    icon: Palette,
    items: [
      { name: 'Bahrain Science Centre', desc: 'Hands-on science exhibits', location: 'Isa Town', age: '5+', price: 'BD 2-4' },
      { name: 'Art Classes', desc: 'Kids\' painting and crafts', location: 'Various studios', age: '4+', price: 'BD 10-20' },
      { name: 'Cooking Classes', desc: 'Kids\' baking workshops', location: 'Hotels, studios', age: '6+', price: 'BD 15-25' },
      { name: 'Library Programs', desc: 'Story time and reading clubs', location: 'Public libraries', age: '3+', price: 'Free' },
    ],
  },
];

const mallPlayAreas = [
  { mall: 'City Centre Bahrain', areas: 'Funland, Magic Planet, Wahooo! Waterpark', best: 'Biggest variety' },
  { mall: 'Seef Mall', areas: 'Funland, soft play, bowling nearby', best: 'Central location' },
  { mall: 'The Avenues', areas: 'Modern play areas, kids\' zones', best: 'Newest facilities' },
  { mall: 'Enma Mall', areas: 'Snow City, play areas', best: 'Southern Bahrain families' },
  { mall: 'Bahrain Mall', areas: 'Funland, arcade zones', best: 'Classic option' },
];

const seasonalTips = [
  { season: 'Winter (Nov-Feb)', temp: '18-24°C', recommendation: 'Perfect for all outdoor activities — parks, beaches, desert trips' },
  { season: 'Spring (Mar-Apr)', temp: '22-32°C', recommendation: 'Morning outdoor activities, transition to indoor afternoons' },
  { season: 'Summer (May-Sep)', temp: '35-45°C', recommendation: 'Indoor focus — malls, museums, pools. Outdoor only early AM' },
  { season: 'Autumn (Oct)', temp: '28-35°C', recommendation: 'Heat subsiding — evening outdoor activities return' },
];

const partyVenues = [
  { name: 'Funland Party Rooms', type: 'Arcade party', capacity: '15-30 kids', includes: 'Games, food, cake' },
  { name: 'Trampo Extreme', type: 'Active party', capacity: '10-20 kids', includes: 'Jump time, party room' },
  { name: 'Hotel Kids Clubs', type: 'Themed parties', capacity: 'Varies', includes: 'Activities, food, decorations' },
  { name: 'Beach Club Parties', type: 'Outdoor party', capacity: '15-40 kids', includes: 'Pool, BBQ, games' },
];

export default function KidsActivitiesBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-green-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Kids Activities', url: 'https://www.bahrainnights.com/guides/kids-activities-bahrain' },
      ]} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium mb-4">👨‍👩‍👧‍👦 Family Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Kids Activities</span> in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
              Your complete guide to family fun in the Kingdom — water parks, play areas, educational attractions, 
              beaches, and entertainment for children of all ages.
            </p>
            <p className="text-sm text-gray-500">Last updated: {lastUpdated}</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <Gamepad2 className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-400">20+</p>
              <p className="text-xs text-gray-400">Play Areas</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <Waves className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-400">3</p>
              <p className="text-xs text-gray-400">Water Parks</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <TreePine className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-emerald-400">5+</p>
              <p className="text-xs text-gray-400">Nature Spots</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <Baby className="w-6 h-6 text-pink-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-pink-400">0-16</p>
              <p className="text-xs text-gray-400">All Ages</p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Bahrain is surprisingly well-equipped for families with children. From the massive Lost Paradise water park 
            to air-conditioned play centers in every major mall, there&apos;s no shortage of ways to keep kids entertained. 
            The Kingdom also offers excellent educational experiences at museums, wildlife parks, and historical UNESCO sites.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Whether you&apos;re a resident looking for weekend activities or a tourist planning a family trip, Bahrain 
            delivers year-round entertainment. The key is knowing what works for each season — outdoor adventures 
            in winter, indoor escapes during the hot summer months.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            <strong className="text-green-400">Summer tip:</strong> During the hot months (May-September), 
            focus on indoor activities during the day. Save outdoor activities for early morning or evening 
            when temperatures are more manageable. Water parks open early for cooler swimming.
          </p>
        </div>
      </section>

      {/* Top Attractions */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center flex items-center justify-center gap-2">
            <Star className="w-8 h-8 text-yellow-400" /> Top Kids Attractions
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            The must-visit destinations for family fun in Bahrain
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {topAttractions.map((attraction) => (
              <div key={attraction.name} className="bg-gradient-to-br from-green-500/10 to-blue-500/5 rounded-xl p-6 hover:from-green-500/20 hover:to-blue-500/10 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">{attraction.category}</span>
                    <h3 className="text-xl font-bold mt-2">{attraction.name}</h3>
                    <p className="text-green-400 text-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {attraction.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-blue-400">{attraction.price}</div>
                    <div className="text-xs text-gray-400">{attraction.ageRange}</div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4">{attraction.description}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                  <Clock className="w-3 h-3" /> {attraction.hours}
                </div>
                <div className="flex flex-wrap gap-2">
                  {attraction.highlights.map((h) => (
                    <span key={h} className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded">{h}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* More Activities by Category */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">More Activities by Category</h2>
          {moreActivities.map((category) => (
            <div key={category.category} className="mb-12">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <category.icon className="w-6 h-6 text-green-400" /> {category.category}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {category.items.map((item) => (
                  <div key={item.name} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all">
                    <h4 className="font-bold text-green-300 mb-1">{item.name}</h4>
                    <p className="text-sm text-gray-400 mb-2">{item.desc}</p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{item.location}</span>
                      <span className="text-blue-400">{item.price}</span>
                    </div>
                    <span className="inline-block mt-2 text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded">Ages: {item.age}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mall Play Areas */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">🏬 Mall Play Areas</h2>
          <p className="text-center text-gray-400 mb-8">Perfect for hot days or quick entertainment while shopping</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mallPlayAreas.map((mall) => (
              <div key={mall.mall} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-blue-400 mb-2">{mall.mall}</h3>
                <p className="text-sm text-gray-300 mb-2">{mall.areas}</p>
                <span className="text-xs text-green-400">Best for: {mall.best}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Guide */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">📅 Seasonal Planning</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {seasonalTips.map((s) => (
              <div key={s.season} className={`rounded-xl p-5 ${s.season.includes('Winter') ? 'bg-green-500/20 ring-2 ring-green-500' : 'bg-white/5'}`}>
                <h3 className="font-bold text-blue-400">{s.season}</h3>
                <p className="text-lg font-bold mb-2">{s.temp}</p>
                <p className="text-sm text-gray-300">{s.recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Birthday Parties */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">🎂 Birthday Party Venues</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {partyVenues.map((venue) => (
              <div key={venue.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-pink-400 mb-2">{venue.name}</h3>
                <p className="text-sm text-gray-400 mb-1">{venue.type}</p>
                <p className="text-xs text-gray-500">Capacity: {venue.capacity}</p>
                <p className="text-xs text-green-400 mt-2">Includes: {venue.includes}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-500/20 to-blue-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Plan Your Family Day Out</h2>
          <p className="text-gray-300 mb-6">Explore more guides for family-friendly Bahrain</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guides/best-family-restaurants-bahrain" className="px-8 py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded-lg transition-colors">Family Restaurants</Link>
            <Link href="/guides/summer-activities-bahrain" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors">Summer Activities</Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
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

      {/* Related Guides */}
      <section className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-6">Related Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Family Restaurants', href: '/guides/best-family-restaurants-bahrain', emoji: '🍽️' },
              { title: 'Summer Activities', href: '/guides/summer-activities-bahrain', emoji: '☀️' },
              { title: 'Beach Clubs', href: '/guides/beach-clubs', emoji: '🏖️' },
              { title: 'Shopping Malls', href: '/guides/malls', emoji: '🛍️' },
            ].map((guide) => (
              <Link key={guide.href} href={guide.href} className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group">
                <span className="text-2xl mb-2 block">{guide.emoji}</span>
                <span className="font-medium group-hover:text-green-400 transition-colors">{guide.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cross Promotion */}
      <section className="py-8 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400">
            Looking for family events and festivals? Visit <a href="https://www.eventsbahrain.com" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">EventsBahrain.com</a> for the latest family-friendly listings.
          </p>
        </div>
      </section>

      {/* Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Kids Activities in Bahrain 2026 — Family Fun Guide',
        description: 'Complete guide to family-friendly activities, attractions, and entertainment for children in Bahrain.',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        publisher: { '@type': 'Organization', name: 'BahrainNights', url: 'https://www.bahrainnights.com' },
        datePublished: '2026-02-11',
        dateModified: lastUpdated,
        mainEntityOfPage: 'https://www.bahrainnights.com/guides/kids-activities-bahrain'
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a }
        }))
      })}} />

      <InternalLinks 
        title="Family Fun in Bahrain" 
        links={[
          { title: 'Family Activities Guide', href: '/guides/family-activities' },
          { title: 'Family-Friendly Restaurants', href: '/guides/best-family-restaurants-bahrain' },
          { title: 'Beach Clubs & Water Parks', href: '/guides/beach-clubs' },
          { title: 'Shopping Malls', href: '/guides/malls' },
          { title: 'Free Things to Do', href: '/guides/free-things-to-do' },
        ]} 
      />
    </div>
  );
}
