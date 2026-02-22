import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Sparkles, MapPin, Clock, Star, Phone, Globe,
  Droplets, Flower2, Heart, ArrowRight, Crown,
  Users, Gem, Bath, Leaf
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Spas in Bahrain (2026) — Top Luxury Spa & Wellness Centers | BahrainNights',
  description: 'Discover the best spas in Bahrain for 2026. From luxury hotel spas to traditional hammams, find the perfect wellness retreat. Reviews, prices, and booking info.',
  keywords: [
    'best spas in Bahrain', 'Bahrain spa', 'luxury spa Bahrain', 'wellness Bahrain',
    'spa hotels Bahrain', 'hammam Bahrain', 'massage Bahrain', 'day spa Bahrain',
    'couples spa Bahrain', 'spa treatments Bahrain', 'relaxation Bahrain',
    'spa resorts Bahrain', 'beauty spa Bahrain', 'Thai massage Bahrain'
  ].join(', '),
  alternates: {
    canonical: 'https://www.bahrainnights.com/best-spas-bahrain',
  },
  openGraph: {
    title: 'Best Spas in Bahrain (2026) — Top Luxury Spa & Wellness Centers',
    description: 'Your guide to the best spas in Bahrain. Luxury hotel spas, traditional hammams, and wellness retreats.',
    url: 'https://www.bahrainnights.com/best-spas-bahrain',
    siteName: 'BahrainNights',
    images: [
      {
        url: 'https://www.bahrainnights.com/og-spas.jpg',
        width: 1200,
        height: 630,
        alt: 'Best Spas in Bahrain',
      },
    ],
    type: 'article',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Spas in Bahrain (2026)',
    description: 'Luxury spas, hammams & wellness centers in Bahrain',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const spas = [
  {
    id: 1,
    name: 'The Ritz-Carlton Spa',
    hotel: 'The Ritz-Carlton, Bahrain',
    description: 'An award-winning spa offering a comprehensive menu of treatments in a stunning beachfront setting. Features private treatment villas, hammam, and a state-of-the-art fitness center.',
    location: 'Seef District',
    priceRange: 'BHD 50-200',
    highlights: ['Private beach access', 'Couples suites', 'Traditional hammam', 'Outdoor pools'],
    treatments: ['Signature massages', 'Facials', 'Body wraps', 'Hammam rituals'],
    rating: 4.9,
    category: 'Luxury Hotel Spa',
    featured: true,
  },
  {
    id: 2,
    name: 'Heavenly Spa by Westin',
    hotel: 'The Westin Bahrain City Centre',
    description: 'A tranquil urban retreat focusing on holistic wellness. Known for their signature Heavenly treatments and modern approach to relaxation.',
    location: 'Seef District',
    priceRange: 'BHD 35-120',
    highlights: ['Rooftop pool', 'Couples rooms', 'Wellness programs', 'Gym access included'],
    treatments: ['Deep tissue massage', 'Aromatherapy', 'Detox wraps', 'Express treatments'],
    rating: 4.7,
    category: 'Luxury Hotel Spa',
    featured: true,
  },
  {
    id: 3,
    name: 'Chi, The Spa',
    hotel: 'Shangri-La Hotel, Bahrain',
    description: 'Inspired by the legendary Shangri-La, this spa combines Asian traditions with modern techniques. Their signature Chi treatments are renowned throughout the region.',
    location: 'Seef District',
    priceRange: 'BHD 45-180',
    highlights: ['Asian-inspired treatments', 'Vitality pool', 'Steam rooms', 'Private suites'],
    treatments: ['Chi balance massage', 'Hot stone therapy', 'Ayurvedic treatments', 'Facials'],
    rating: 4.8,
    category: 'Luxury Hotel Spa',
    featured: true,
  },
  {
    id: 4,
    name: 'Coral Bay Resort Spa',
    hotel: 'Coral Bay Resort',
    description: 'A serene spa escape on the shores of Bahrain. Perfect for those seeking a more intimate, boutique spa experience with personalized service.',
    location: 'Manama',
    priceRange: 'BHD 30-100',
    highlights: ['Beachfront location', 'Personalized service', 'Quiet atmosphere', 'Pool access'],
    treatments: ['Swedish massage', 'Reflexology', 'Body scrubs', 'Manicure/pedicure'],
    rating: 4.5,
    category: 'Boutique Spa',
    featured: false,
  },
  {
    id: 5,
    name: 'The Spa at Four Seasons',
    hotel: 'Four Seasons Hotel Bahrain Bay',
    description: 'Overlooking Bahrain Bay, this luxurious spa offers bespoke treatments in elegant surroundings. Their hammam experience is one of the best in the Kingdom.',
    location: 'Bahrain Bay',
    priceRange: 'BHD 60-250',
    highlights: ['Bay views', 'Private hammam', 'Couples journey', 'Premium products'],
    treatments: ['Bespoke facials', 'Signature massages', 'Hammam ritual', 'Beauty services'],
    rating: 4.9,
    category: 'Luxury Hotel Spa',
    featured: true,
  },
  {
    id: 6,
    name: 'Lagoon Beach Spa',
    hotel: 'The Diplomat Radisson Blu',
    description: 'Set within a beautiful lagoon-style beach club, this spa combines treatments with access to private beach and pools. Great value for a full day experience.',
    location: 'Diplomatic Area',
    priceRange: 'BHD 25-90',
    highlights: ['Beach club access', 'Day packages', 'Family-friendly', 'Multiple pools'],
    treatments: ['Thai massage', 'Back treatments', 'Facials', 'Mani-pedi'],
    rating: 4.4,
    category: 'Beach Club Spa',
    featured: false,
  },
  {
    id: 7,
    name: 'SoSPA',
    hotel: 'Sofitel Bahrain Zallaq Thalassa',
    description: 'The only thalassotherapy spa in Bahrain, using the healing properties of seawater. Offers unique marine-based treatments you won\'t find anywhere else in the Kingdom.',
    location: 'Zallaq',
    priceRange: 'BHD 40-150',
    highlights: ['Thalassotherapy', 'Seawater pool', 'Beach access', 'Wellness programs'],
    treatments: ['Thalasso treatments', 'Seaweed wraps', 'Marine facials', 'Hydrotherapy'],
    rating: 4.6,
    category: 'Wellness Resort',
    featured: true,
  },
  {
    id: 8,
    name: 'Al Areen Palace Spa',
    hotel: 'Al Areen Palace & Spa',
    description: 'A desert oasis spa featuring traditional Arabian treatments. Each villa has a private pool and garden, offering the ultimate in privacy and luxury.',
    location: 'Al Areen',
    priceRange: 'BHD 50-200',
    highlights: ['Private villas', 'Arabian treatments', 'Desert setting', 'Couples retreat'],
    treatments: ['Arabian massage', 'Gold facial', 'Desert scrubs', 'Royal hammam'],
    rating: 4.7,
    category: 'Desert Resort Spa',
    featured: true,
  },
  {
    id: 9,
    name: 'Art Rotana Spa',
    hotel: 'ART Rotana Amwaj Islands',
    description: 'A contemporary spa on Amwaj Islands with stunning sea views. Known for their art-inspired treatments and modern wellness approach.',
    location: 'Amwaj Islands',
    priceRange: 'BHD 35-120',
    highlights: ['Sea views', 'Modern design', 'Art therapy', 'Infinity pool'],
    treatments: ['Hot stone massage', 'Anti-aging facials', 'Body treatments', 'Nail art'],
    rating: 4.5,
    category: 'Luxury Hotel Spa',
    featured: false,
  },
  {
    id: 10,
    name: 'Thai Orchid Spa',
    hotel: 'Standalone',
    description: 'Authentic Thai spa experience with trained therapists from Thailand. Offers traditional Thai massage and treatments at accessible prices.',
    location: 'Juffair',
    priceRange: 'BHD 15-60',
    highlights: ['Authentic Thai', 'Affordable', 'Walk-in welcome', 'Expert therapists'],
    treatments: ['Thai massage', 'Foot reflexology', 'Herbal compress', 'Oil massage'],
    rating: 4.3,
    category: 'Day Spa',
    featured: false,
  },
  {
    id: 11,
    name: 'Remède Spa',
    hotel: 'The St. Regis Bahrain',
    description: 'Ultra-luxurious spa combining ancient healing traditions with modern techniques. Their signature Remède customized massage is legendary.',
    location: 'Bahrain Bay',
    priceRange: 'BHD 70-300',
    highlights: ['Ultra-luxury', 'Butler service', 'Premium products', 'Private suites'],
    treatments: ['Remède signature', 'Diamond facial', 'Couple rituals', 'Gentleman treatments'],
    rating: 4.9,
    category: 'Ultra-Luxury Spa',
    featured: true,
  },
  {
    id: 12,
    name: 'The Spa at InterContinental',
    hotel: 'InterContinental Regency Bahrain',
    description: 'A well-established spa with a loyal following. Known for consistent quality and a wide range of treatments to suit all needs.',
    location: 'Manama',
    priceRange: 'BHD 30-100',
    highlights: ['Central location', 'Consistent quality', 'Good value', 'Full menu'],
    treatments: ['Swedish massage', 'Deep tissue', 'Facials', 'Body treatments'],
    rating: 4.4,
    category: 'Luxury Hotel Spa',
    featured: false,
  },
];

const categories = [
  { name: 'Luxury Hotel Spa', icon: Crown, count: spas.filter(s => s.category === 'Luxury Hotel Spa').length },
  { name: 'Wellness Resort', icon: Leaf, count: spas.filter(s => s.category === 'Wellness Resort').length },
  { name: 'Day Spa', icon: Flower2, count: spas.filter(s => s.category === 'Day Spa').length },
  { name: 'Beach Club Spa', icon: Droplets, count: spas.filter(s => s.category === 'Beach Club Spa').length },
];

export default function BestSpasBahrain() {
  const featuredSpas = spas.filter(s => s.featured);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Wellness Guide 2026
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Best <span className="text-purple-400">Spas</span> in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Discover Bahrain's finest spas and wellness centers. From ultra-luxury hotel spas and 
              traditional hammams to thalassotherapy retreats — find your perfect escape.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="w-5 h-5" />
                <span>Updated February 2026</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Bath className="w-5 h-5" />
                <span>12 Top Spas Reviewed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 px-4 border-y border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <div key={cat.name} className="text-center">
                <cat.icon className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{cat.count}</div>
                <div className="text-gray-400 text-sm">{cat.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Spas */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <Gem className="w-8 h-8 text-purple-400" />
            Top-Rated Spas
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredSpas.map((spa) => (
              <div 
                key={spa.id}
                className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{spa.name}</h3>
                    <p className="text-purple-400 text-sm">{spa.hotel}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-purple-500/10 px-2 py-1 rounded-lg">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white font-medium">{spa.rating}</span>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-4">{spa.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {spa.highlights.map((h, i) => (
                    <span key={i} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                      {h}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{spa.location}</span>
                  </div>
                  <div className="text-purple-400 font-medium">{spa.priceRange}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Spas */}
      <section className="py-16 px-4 bg-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">
            All Spas & Wellness Centers
          </h2>
          <div className="space-y-4">
            {spas.map((spa, index) => (
              <div 
                key={spa.id}
                className="bg-gray-800/50 rounded-xl p-5 border border-gray-700 hover:border-purple-500/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-500/10 rounded-full flex items-center justify-center text-purple-400 font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                          {spa.name}
                          {spa.featured && (
                            <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full">
                              Featured
                            </span>
                          )}
                        </h3>
                        <p className="text-purple-400 text-sm">{spa.hotel}</p>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-white">{spa.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{spa.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <span className="flex items-center gap-1 text-gray-400">
                        <MapPin className="w-3 h-3" />
                        {spa.location}
                      </span>
                      <span className="text-purple-400">{spa.category}</span>
                      <span className="text-green-400">{spa.priceRange}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {spa.treatments.map((t, i) => (
                        <span key={i} className="text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spa Tips */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">
            Spa Booking Tips
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-purple-400 mb-4">💆 Before Your Visit</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Book at least 24-48 hours in advance for weekend slots</li>
                <li>• Arrive 15-30 minutes early to enjoy facilities</li>
                <li>• Inform staff of any health conditions or allergies</li>
                <li>• Avoid heavy meals 1-2 hours before treatments</li>
              </ul>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-purple-400 mb-4">💰 Saving Money</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Look for weekday specials and packages</li>
                <li>• Many hotels offer spa days with pool/beach access</li>
                <li>• Check hotel loyalty programs for discounts</li>
                <li>• Couples packages often offer better value</li>
              </ul>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-purple-400 mb-4">👫 For Couples</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Four Seasons and Ritz-Carlton have the best couples suites</li>
                <li>• Al Areen offers complete privacy with villa treatments</li>
                <li>• Book couples packages for coordinated experiences</li>
                <li>• Request side-by-side treatment times</li>
              </ul>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-purple-400 mb-4">✨ Unique Experiences</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Try thalassotherapy at Sofitel Zallaq (only in Bahrain)</li>
                <li>• Experience traditional hammam at luxury hotels</li>
                <li>• Arabian treatments at Al Areen use local ingredients</li>
                <li>• Ask about signature treatments unique to each spa</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-16 px-4 bg-gray-800/30">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-8">
            More to Explore
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/hotels"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl text-white transition-colors"
            >
              Hotels
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/beach-pool-clubs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl text-white transition-colors"
            >
              Beach & Pool Clubs
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/things-to-do-in-bahrain"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl text-white transition-colors"
            >
              Things to Do
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/best-restaurants-bahrain"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl text-white transition-colors"
            >
              Restaurants
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Best Spas in Bahrain (2026)',
            description: 'Discover the best spas in Bahrain. From luxury hotel spas to traditional hammams and wellness retreats.',
            author: {
              '@type': 'Organization',
              name: 'BahrainNights',
            },
            publisher: {
              '@type': 'Organization',
              name: 'BahrainNights',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.bahrainnights.com/logo.png',
              },
            },
            datePublished: '2026-02-23',
            dateModified: '2026-02-23',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://www.bahrainnights.com/best-spas-bahrain',
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: spas.map((spa, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'HealthAndBeautyBusiness',
                name: spa.name,
                description: spa.description,
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: spa.location,
                  addressCountry: 'Bahrain',
                },
                priceRange: spa.priceRange,
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: spa.rating,
                  bestRating: 5,
                },
              },
            })),
          }),
        }}
      />
    </div>
  );
}
