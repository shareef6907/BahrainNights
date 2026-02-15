import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Moon, Clock, MapPin, Star, Utensils, Users, 
  DollarSign, Phone, ExternalLink
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import InternalLinks from '@/components/SEO/InternalLinks';

export const metadata: Metadata = {
  title: 'Best Iftar in Bahrain 2026 | Top Iftar Buffets & Ramadan Tents',
  description: 'Discover the best iftar spots in Bahrain for Ramadan 2026. From luxury hotel buffets to traditional Ramadan tents, find the perfect place to break your fast.',
  keywords: 'best iftar Bahrain, iftar buffet Bahrain, Ramadan tent Bahrain, iftar 2026, where to eat iftar Bahrain, iftar deals Bahrain',
  openGraph: {
    title: 'Best Iftar in Bahrain 2026 | Top Iftar Buffets & Ramadan Tents',
    description: 'Find the best iftar experiences in Bahrain - luxury hotels, traditional tents, and hidden gems.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/ramadan/best-iftars',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/ramadan/best-iftars',
  },
};

const luxuryIftars = [
  {
    name: 'Four Seasons Hotel Bahrain Bay',
    location: 'Bahrain Bay',
    price: 'BD 40-60',
    rating: 4.9,
    description: 'Experience the pinnacle of Ramadan dining with stunning bay views. The Four Seasons offers an extensive iftar spread featuring live cooking stations, premium Arabic cuisine, and international delicacies. The elegant setting is perfect for special occasions.',
    highlights: ['Panoramic bay views', 'Live cooking stations', 'Oud music', 'Premium seafood', 'Valet parking'],
    phone: '+973 1711 5000',
    bookingTip: 'Book at least 3 days in advance, especially for weekends.',
  },
  {
    name: 'The Ritz-Carlton Ramadan Tent',
    location: 'Seef',
    price: 'BD 35-50',
    rating: 4.8,
    description: 'The iconic Ritz-Carlton Ramadan tent returns with its magical atmosphere. Traditional Arabic décor, live entertainment, and an impressive buffet make this a must-visit. The tent accommodates large groups and families.',
    highlights: ['Traditional tent setting', 'Live Arabic entertainment', 'Shisha lounge', 'Kids area', 'Group packages'],
    phone: '+973 1758 0000',
    bookingTip: 'Corporate packages available. Book early for groups of 10+.',
  },
  {
    name: 'Gulf Hotel Convention & Spa',
    location: 'Adliya',
    price: 'BD 28-38',
    rating: 4.7,
    description: 'A Bahrain institution for Ramadan dining. The Gulf Hotel brings decades of expertise to their iftar spread. Zahle Restaurant&apos;s Lebanese influence shines through in the mezze selection.',
    highlights: ['Zahle restaurant quality', 'Central location', 'Large capacity', 'Variety of cuisines', 'Live stations'],
    phone: '+973 1771 3000',
    bookingTip: 'Great value for quality. Walk-ins possible on weekdays.',
  },
];

const traditionalTents = [
  {
    name: 'Al Waha Tent',
    location: 'Multiple locations',
    price: 'BD 15-25',
    rating: 4.5,
    description: 'For an authentic Ramadan tent experience, Al Waha delivers tradition at an accessible price. The atmosphere is lively with families and friends gathering to break fast together.',
    highlights: ['Authentic atmosphere', 'Budget-friendly', 'Traditional Arabic food', 'Shisha after iftar', 'Family-friendly'],
    phone: '+973 1772 2222',
    bookingTip: 'Popular with locals. Arrive early on weekends.',
  },
  {
    name: 'Reef Resort Tent',
    location: 'Bahrain Bay',
    price: 'BD 22-30',
    rating: 4.6,
    description: 'Waterfront iftar with a fresh seafood focus. The tent overlooks the bay, offering a refreshing setting for breaking your fast. Fresh catches of the day are always featured.',
    highlights: ['Waterfront location', 'Fresh seafood', 'Outdoor seating', 'Sunset views', 'Free parking'],
    phone: '+973 1311 3333',
    bookingTip: 'Request waterfront seating when booking.',
  },
];

const hiddenGems = [
  {
    name: 'Saffron by Jena',
    location: 'Adliya',
    price: 'BD 18-25',
    rating: 4.6,
    description: 'Intimate iftar setting with exceptional Indian cuisine. Known for their biryani and tandoor dishes. A quieter alternative to the big hotel buffets.',
    highlights: ['Authentic Indian', 'Intimate setting', 'Excellent biryani', 'Vegetarian options'],
  },
  {
    name: 'Takht Jamsheed',
    location: 'Adliya',
    price: 'BD 20-30',
    rating: 4.5,
    description: 'Persian iftar experience with traditional Iranian dishes. The saffron rice and kebabs are exceptional. Cozy atmosphere perfect for smaller gatherings.',
    highlights: ['Persian cuisine', 'Saffron rice', 'Kebab variety', 'Traditional decor'],
  },
  {
    name: 'Mezzaluna',
    location: 'Seef',
    price: 'BD 22-32',
    rating: 4.4,
    description: 'Italian-influenced iftar for those wanting something different. Fresh pasta stations and wood-fired pizzas alongside Arabic essentials.',
    highlights: ['Italian fusion', 'Fresh pasta', 'Wood-fired pizza', 'Unique option'],
  },
];

export default function BestIftarsPage() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://www.bahrainnights.com' },
    { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
    { name: 'Ramadan', url: 'https://www.bahrainnights.com/guides/ramadan' },
    { name: 'Best Iftars', url: 'https://www.bahrainnights.com/guides/ramadan/best-iftars' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Best Iftar in Bahrain 2026 | Top Iftar Buffets & Ramadan Tents',
            description: 'Comprehensive guide to the best iftar spots in Bahrain for Ramadan 2026.',
            author: { '@type': 'Organization', name: 'Bahrain Nights' },
            publisher: { '@type': 'Organization', name: 'Bahrain Nights' },
            datePublished: '2026-02-01',
            dateModified: '2026-02-15',
            mainEntityOfPage: 'https://www.bahrainnights.com/guides/ramadan/best-iftars',
          }),
        }}
      />

      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-rose-500/10" />
          <div className="max-w-4xl mx-auto text-center relative">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Moon className="w-8 h-8 text-amber-400" />
              <span className="text-amber-400 font-semibold">Ramadan 2026</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Best Iftar in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500">
                Bahrain
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              From luxury hotel buffets to traditional Ramadan tents, discover where to break your fast 
              this Ramadan. Updated for 2026 with prices, booking tips, and insider recommendations.
            </p>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="py-8 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4">
            <a href="#luxury" className="px-4 py-2 bg-amber-500/20 text-amber-400 rounded-full hover:bg-amber-500/30 transition-colors">
              Luxury Hotels
            </a>
            <a href="#traditional" className="px-4 py-2 bg-orange-500/20 text-orange-400 rounded-full hover:bg-orange-500/30 transition-colors">
              Traditional Tents
            </a>
            <a href="#hidden" className="px-4 py-2 bg-rose-500/20 text-rose-400 rounded-full hover:bg-rose-500/30 transition-colors">
              Hidden Gems
            </a>
            <a href="#tips" className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-full hover:bg-purple-500/30 transition-colors">
              Booking Tips
            </a>
          </div>
        </section>

        {/* Luxury Iftars */}
        <section id="luxury" className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Star className="w-8 h-8 text-amber-400" />
              Luxury Hotel Iftars
            </h2>
            <p className="text-gray-400 mb-8">Premium dining experiences with exceptional service and extensive spreads.</p>
            
            <div className="space-y-6">
              {luxuryIftars.map((venue, index) => (
                <div key={index} className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-amber-500/30 transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{venue.name}</h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" /> {venue.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" /> {venue.price}
                        </span>
                        <span className="flex items-center gap-1 text-amber-400">
                          <Star className="w-4 h-4 fill-current" /> {venue.rating}
                        </span>
                      </div>
                    </div>
                    <a href={`tel:${venue.phone}`} className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-black rounded-lg font-medium hover:bg-amber-400 transition-colors">
                      <Phone className="w-4 h-4" /> Book Now
                    </a>
                  </div>
                  <p className="text-gray-300 mb-4">{venue.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {venue.highlights.map((highlight, i) => (
                      <span key={i} className="px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full text-sm">
                        {highlight}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Tip: {venue.bookingTip}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Traditional Tents */}
        <section id="traditional" className="py-16 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Moon className="w-8 h-8 text-orange-400" />
              Traditional Ramadan Tents
            </h2>
            <p className="text-gray-400 mb-8">Experience authentic Ramadan atmosphere in traditional tent settings.</p>
            
            <div className="space-y-6">
              {traditionalTents.map((venue, index) => (
                <div key={index} className="bg-slate-900/50 rounded-2xl p-6 border border-white/10 hover:border-orange-500/30 transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{venue.name}</h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" /> {venue.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" /> {venue.price}
                        </span>
                        <span className="flex items-center gap-1 text-orange-400">
                          <Star className="w-4 h-4 fill-current" /> {venue.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">{venue.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {venue.highlights.map((highlight, i) => (
                      <span key={i} className="px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full text-sm">
                        {highlight}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Tip: {venue.bookingTip}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hidden Gems */}
        <section id="hidden" className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Utensils className="w-8 h-8 text-rose-400" />
              Hidden Gems
            </h2>
            <p className="text-gray-400 mb-8">Lesser-known spots with exceptional iftar experiences.</p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {hiddenGems.map((venue, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-rose-500/30 transition-colors">
                  <h3 className="text-lg font-bold text-white mb-2">{venue.name}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
                    <span>{venue.location}</span>
                    <span className="text-rose-400">{venue.price}</span>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">{venue.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {venue.highlights.map((h, i) => (
                      <span key={i} className="px-2 py-0.5 bg-rose-500/10 text-rose-400 rounded text-xs">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Tips */}
        <section id="tips" className="py-16 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Clock className="w-8 h-8 text-purple-400" />
              Iftar Booking Tips
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-900/50 rounded-xl p-6 border border-purple-500/20">
                <h3 className="text-lg font-semibold text-white mb-3">When to Book</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Book luxury hotels 3-5 days ahead</li>
                  <li>• Weekend bookings fill up fast</li>
                  <li>• Last 10 days of Ramadan are busiest</li>
                  <li>• Walk-ins possible at tents on weekdays</li>
                </ul>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-6 border border-purple-500/20">
                <h3 className="text-lg font-semibold text-white mb-3">Best Times</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Arrive 15-20 min before iftar time</li>
                  <li>• Iftar time changes daily (follow Maghrib)</li>
                  <li>• Thursdays & Fridays are most popular</li>
                  <li>• Early Ramadan offers best availability</li>
                </ul>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-6 border border-purple-500/20">
                <h3 className="text-lg font-semibold text-white mb-3">Group Bookings</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Corporate packages available at hotels</li>
                  <li>• Groups of 10+ get special rates</li>
                  <li>• Book at least 1 week ahead for groups</li>
                  <li>• Request private areas for large gatherings</li>
                </ul>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-6 border border-purple-500/20">
                <h3 className="text-lg font-semibold text-white mb-3">Budget Tips</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Tents offer best value (BD 15-25)</li>
                  <li>• Weekday rates often lower than weekends</li>
                  <li>• Some hotels offer early bird discounts</li>
                  <li>• Check bank card offers for savings</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Planning Your Ramadan Experience?</h2>
            <p className="text-gray-400 mb-6">
              Explore more of our Ramadan guides for a complete holy month experience in Bahrain.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/guides/ramadan" className="px-6 py-3 bg-amber-500 text-black rounded-lg font-medium hover:bg-amber-400 transition-colors">
                Complete Ramadan Guide
              </Link>
              <Link href="/events" className="px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors">
                Ramadan Events
              </Link>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <InternalLinks
          title="Explore More"
          links={[
            { href: '/guides/ramadan', title: 'Complete Ramadan Guide' },
            { href: '/guides', title: 'All Guides' },
            { href: '/places', title: 'Discover Restaurants' },
            { href: '/events', title: 'Upcoming Events' },
            { href: '/guides/restaurants', title: 'Best Restaurants' },
            { href: '/guides/nightlife', title: 'Nightlife Guide' },
          ]}
        />
      </main>
    </>
  );
}
