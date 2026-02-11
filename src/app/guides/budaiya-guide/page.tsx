import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Trees, Home, Utensils, Car, Star,
  Sun, Waves, Clock, Heart
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Budaiya Guide — Restaurants, Beaches & Things to Do | Bahrain 2026',
  description: 'Complete guide to Budaiya, Bahrain. Discover the best restaurants, beach spots, family activities, and things to do in Bahrain\'s scenic northern coast.',
  keywords: 'Budaiya Bahrain, Budaiya restaurants, Budaiya beach, things to do Budaiya, Budaiya guide, Al Budaiya Bahrain, Northern Bahrain',
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/budaiya-guide',
  },
  openGraph: {
    title: 'Budaiya Guide — Restaurants, Beaches & Things to Do',
    description: 'Discover Budaiya: Bahrain\'s scenic northern coast with beaches, restaurants, and family activities.',
    type: 'article',
    locale: 'en_US',
  },
};

const faqs = [
  { 
    q: 'What is Budaiya known for in Bahrain?', 
    a: 'Budaiya is known for its scenic northern coastline, date palm gardens, traditional Bahraini villages, and peaceful residential areas. It\'s popular for beach activities, highway restaurants, and escaping the bustle of Manama. The Budaiya Highway is lined with restaurants, cafes, and farms.' 
  },
  { 
    q: 'What are the best restaurants in Budaiya?', 
    a: 'Popular Budaiya restaurants include Al Abraaj (mixed grill and Bahraini cuisine), Furn Bistro (Mediterranean), Maki Bahrain (Japanese), and various seafood restaurants along the coast. The area also has traditional Bahraini coffee shops and garden cafes.' 
  },
  { 
    q: 'Is there a beach in Budaiya?', 
    a: 'Yes, Budaiya has public beach access points along the northern coast. While not as developed as hotel beaches, the coastline offers peaceful spots for picnics and watching the sunset. Nearby Al Dar Islands provides a more complete beach experience with facilities.' 
  },
  { 
    q: 'How far is Budaiya from Manama?', 
    a: 'Budaiya is approximately 20-25 km from Manama city center, about 25-35 minutes drive depending on traffic. The scenic Budaiya Highway connects the area to Manama and continues to the western coast.' 
  },
  { 
    q: 'What family activities are there in Budaiya?', 
    a: 'Budaiya offers farm visits, date palm gardens, horse riding stables, coastal walks, and family-friendly restaurants with outdoor seating. The Al Areen Wildlife Park and Lost Paradise of Dilmun Water Park are accessible from Budaiya.' 
  },
];

const restaurants = [
  {
    name: 'Al Abraaj Restaurant',
    type: 'Arabic & Bahraini',
    vibe: 'Traditional',
    priceRange: 'BD 8-15',
    mustTry: 'Mixed grill, Machboos',
    bestFor: 'Family dinners, local cuisine',
  },
  {
    name: 'Furn Bistro',
    type: 'Mediterranean',
    vibe: 'Casual Modern',
    priceRange: 'BD 8-18',
    mustTry: 'Wood-fired pizza, Mezze',
    bestFor: 'Casual lunch, garden seating',
  },
  {
    name: 'Maki Bahrain',
    type: 'Japanese',
    vibe: 'Contemporary',
    priceRange: 'BD 12-25',
    mustTry: 'Sushi rolls, Ramen',
    bestFor: 'Sushi lovers, date night',
  },
  {
    name: 'The Village Restaurant',
    type: 'International',
    vibe: 'Garden',
    priceRange: 'BD 6-14',
    mustTry: 'Breakfast menu, Fresh juices',
    bestFor: 'Morning brunch, outdoor dining',
  },
  {
    name: 'Budaiya Seafood',
    type: 'Seafood',
    vibe: 'Local',
    priceRange: 'BD 10-20',
    mustTry: 'Fresh fish, Prawns',
    bestFor: 'Seafood fans, authentic experience',
  },
  {
    name: 'Traditional Coffee Shops',
    type: 'Bahraini Cafe',
    vibe: 'Heritage',
    priceRange: 'BD 1-5',
    mustTry: 'Karak chai, Arabic coffee',
    bestFor: 'Morning coffee, local atmosphere',
  },
];

const activities = [
  { name: 'Budaiya Beach & Coast', icon: Waves, desc: 'Peaceful coastal walks and sunset spots along the northern shore' },
  { name: 'Date Palm Farms', icon: Trees, desc: 'Visit traditional date farms and sample fresh dates' },
  { name: 'Budaiya Highway Dining', icon: Utensils, desc: 'Explore the diverse restaurants along the scenic highway' },
  { name: 'Al Dar Islands Day Trip', icon: Sun, desc: 'Boat trip to islands with beach facilities (from Sitra)' },
  { name: 'Horse Riding', icon: Heart, desc: 'Several stables offer riding lessons and trail rides' },
  { name: 'Al Areen Wildlife Park', icon: Trees, desc: 'Arabian wildlife and safari experience (nearby)' },
];

export default function BudaiyaGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-green-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Budaiya Guide', url: 'https://www.bahrainnights.com/guides/budaiya-guide' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium mb-4">
              🌴 Area Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                Budaiya
              </span>
              {' '}Guide
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Bahrain&apos;s peaceful northern escape — scenic coastline, date palm gardens, 
              traditional villages, and the famous Budaiya Highway dining strip.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Restaurants', value: '50+', icon: Utensils },
              { label: 'From Manama', value: '25 min', icon: Car },
              { label: 'Beach Access', value: 'Public', icon: Waves },
              { label: 'Vibe', value: 'Peaceful', icon: Trees },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-green-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Discovering Budaiya</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Budaiya represents a different side of Bahrain — one where date palm farms still line 
              the roads, traditional villages maintain their character, and the pace of life slows 
              down. Located along Bahrain&apos;s scenic northern coast, this area offers a refreshing 
              contrast to the busy commercial districts of Manama and Seef.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              The famous Budaiya Highway serves as the main artery through the area, connecting 
              the western coast to the capital. This scenic route has become a destination in 
              itself, lined with diverse restaurants, cafes, plant nurseries, and farms. Whether 
              you&apos;re craving authentic Bahraini cuisine, Mediterranean mezze, or Japanese sushi, 
              the highway delivers an unexpected variety of dining options.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Beyond dining, Budaiya offers beach access along the northern coast, horse riding 
              stables, traditional farms open to visitors, and proximity to attractions like 
              Al Areen Wildlife Park. It&apos;s a popular area for weekend drives, family outings, 
              and anyone seeking the authentic, unhurried Bahrain that existed before the 
              modernization boom.
            </p>
          </div>
        </div>
      </section>

      {/* Restaurants */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Best Restaurants in Budaiya</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            From traditional Bahraini cafes to modern international cuisine along the famous highway
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((venue) => (
              <div 
                key={venue.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold">{venue.name}</h3>
                    <p className="text-green-400 text-sm">{venue.type}</p>
                  </div>
                  <span className="text-lg font-bold text-white">{venue.priceRange}</span>
                </div>
                
                <div className="mb-3">
                  <span className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded">
                    {venue.vibe}
                  </span>
                </div>
                
                <p className="text-sm text-gray-400 mb-2">
                  <strong className="text-gray-300">Must try:</strong> {venue.mustTry}
                </p>
                <p className="text-sm text-gray-500">
                  <strong className="text-gray-400">Best for:</strong> {venue.bestFor}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Things to Do */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Things to Do in Budaiya</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity) => (
              <div key={activity.name} className="bg-white/5 rounded-xl p-6">
                <activity.icon className="w-8 h-8 text-green-400 mb-4" />
                <h3 className="font-bold mb-2">{activity.name}</h3>
                <p className="text-gray-400 text-sm">{activity.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practical Info */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Practical Information</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-xl p-6">
              <Car className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="font-bold mb-2">Getting There</h3>
              <p className="text-gray-400 text-sm">
                25-35 minutes from Manama via Budaiya Highway. Own transport 
                recommended as public transport is limited. Plenty of parking at most venues.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <Clock className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="font-bold mb-2">Best Time to Visit</h3>
              <p className="text-gray-400 text-sm">
                Late afternoon and evenings are perfect for dining and sunset views. 
                Cooler months (October-April) are ideal for outdoor activities and beach visits.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <MapPin className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="font-bold mb-2">Nearby Attractions</h3>
              <p className="text-gray-400 text-sm">
                Al Areen Wildlife Park (15 min), Lost Paradise Water Park (20 min), 
                Bahrain International Circuit (25 min), King Fahd Causeway (30 min).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-6">Explore More Areas</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Riffa', href: '/guides/riffa-guide', emoji: '🏰' },
              { title: 'Zallaq', href: '/guides/zallaq-guide', emoji: '🏖️' },
              { title: 'Manama', href: '/guides/manama-city-guide', emoji: '🏙️' },
              { title: 'Muharraq', href: '/guides/muharraq-guide', emoji: '🕌' },
            ].map((guide) => (
              <Link key={guide.href} href={guide.href} className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors flex items-center gap-3">
                <span className="text-2xl">{guide.emoji}</span>
                <span className="font-medium">{guide.title}</span>
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
            headline: 'Budaiya Guide — Restaurants, Beaches & Things to Do',
            description: 'Complete guide to Budaiya, Bahrain with restaurants, beaches, and activities.',
            author: { '@type': 'Organization', name: 'BahrainNights' },
            publisher: { '@type': 'Organization', name: 'BahrainNights' },
            datePublished: '2026-02-11',
            dateModified: '2026-02-11',
          }),
        }}
      />
    </div>
  );
}
