import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Sparkles, Clock, MapPin, Star,
  Heart, DollarSign, Flower2, Droplets
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Best Spas in Bahrain 2026 | Luxury Wellness & Massage Guide',
  description: 'Discover the best spas in Bahrain! Complete guide to luxury hotel spas, wellness centers, massage therapy, hammams, and relaxation retreats.',
  keywords: 'spas Bahrain, best spa Bahrain, massage Bahrain, wellness Bahrain, luxury spa Manama, hammam Bahrain, Four Seasons spa, Ritz Carlton spa Bahrain',
  openGraph: {
    title: 'Best Spas in Bahrain 2026 | Luxury Wellness & Massage Guide',
    description: 'Your guide to the best spas and wellness experiences in Bahrain.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/spas',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/spas',
  },
};

const spas = [
  {
    name: 'The Spa at Four Seasons Bahrain Bay',
    location: 'Four Seasons Hotel, Bahrain Bay',
    type: 'Luxury Hotel Spa',
    rating: 5,
    priceRange: 'BD 60-200',
    description: 'Award-winning spa with stunning bay views, featuring 12 treatment rooms, couples suites, hammam, and Bahrain\'s most exclusive wellness experience.',
    specialties: ['Signature Bahraini treatments', 'Pearl-infused therapies', 'Couples rituals', 'Hammam', 'Facial treatments'],
    amenities: ['Bay views', 'Private suites', 'Relaxation lounges', 'Vitality pool', 'Steam & sauna', 'Fitness center'],
    signature: 'Pearl of Bahrain Ritual - 90min journey inspired by pearl diving heritage',
    hours: '9AM-10PM daily',
    booking: 'Advance booking required',
    bestFor: 'Special occasions, luxury seekers, couples',
  },
  {
    name: 'The Ritz-Carlton Spa',
    location: 'Ritz-Carlton Hotel, Seef',
    type: 'Luxury Hotel Spa',
    rating: 5,
    priceRange: 'BD 50-180',
    description: 'Elegant spa sanctuary offering world-class treatments, private hammam experiences, and comprehensive wellness programs.',
    specialties: ['ESPA treatments', 'Hot stone therapy', 'Detox programs', 'Men\'s treatments', 'Bridal packages'],
    amenities: ['Treatment rooms', 'Private hammam', 'Jacuzzi', 'Steam room', 'Sauna', 'Relaxation area'],
    signature: 'Arabian Hammam Experience - Traditional cleansing ritual with modern luxury',
    hours: '9AM-9PM daily',
    booking: 'Recommended',
    bestFor: 'Authentic hammam, premium treatments',
  },
  {
    name: 'Heavenly Spa by Westin',
    location: 'Westin City Centre Bahrain',
    type: 'Hotel Spa',
    rating: 4,
    priceRange: 'BD 40-120',
    description: 'Serene wellness sanctuary focusing on holistic well-being with signature treatments and excellent value packages.',
    specialties: ['Deep tissue massage', 'Body wraps', 'Facials', 'Reflexology', 'Wellness packages'],
    amenities: ['Treatment rooms', 'Steam room', 'Sauna', 'Relaxation lounge', 'Pool access'],
    signature: 'Heavenly Massage - Customized pressure full-body treatment',
    hours: '10AM-8PM daily',
    booking: 'Walk-ins welcome, booking preferred',
    bestFor: 'Value packages, after-shopping relaxation',
  },
  {
    name: 'Sofitel Thalassa Sea & Spa',
    location: 'Sofitel Bahrain Zallaq',
    type: 'Thalassotherapy Spa',
    rating: 5,
    priceRange: 'BD 45-150',
    description: 'Bahrain\'s premier thalassotherapy center using seawater and marine elements for therapeutic treatments and rejuvenation.',
    specialties: ['Thalassotherapy', 'Seaweed wraps', 'Marine facials', 'Hydrotherapy', 'Algae treatments'],
    amenities: ['Seawater pool', 'Hammam', 'Treatment rooms', 'Beach access', 'Outdoor areas'],
    signature: 'Thalasso Circuit - Full marine-based wellness journey',
    hours: '8AM-8PM daily',
    booking: 'Required',
    bestFor: 'Thalassotherapy, natural healing, beach setting',
  },
  {
    name: 'ART Rotana Bodylines Spa',
    location: 'ART Rotana, Amwaj Islands',
    type: 'Resort Spa',
    rating: 4,
    priceRange: 'BD 35-100',
    description: 'Relaxing spa experience in Amwaj with quality treatments, good packages, and beautiful resort setting.',
    specialties: ['Thai massage', 'Hot stone', 'Body scrubs', 'Facials', 'Couples treatments'],
    amenities: ['Treatment rooms', 'Steam room', 'Jacuzzi', 'Beach access'],
    signature: 'Arabian Journey - Traditional Middle Eastern spa ritual',
    hours: '10AM-9PM daily',
    booking: 'Recommended for weekends',
    bestFor: 'Resort guests, Amwaj visitors',
  },
  {
    name: 'The Spa at Gulf Hotel',
    location: 'Gulf Hotel, Adliya',
    type: 'Hotel Spa',
    rating: 4,
    priceRange: 'BD 30-90',
    description: 'Well-established spa at the iconic Gulf Hotel offering reliable treatments and good value memberships.',
    specialties: ['Swedish massage', 'Aromatherapy', 'Body treatments', 'Facials', 'Nail services'],
    amenities: ['Treatment rooms', 'Salon', 'Steam & sauna', 'Pool access'],
    signature: 'Gulf Relaxation Package - Full body massage with facial',
    hours: '9AM-9PM daily',
    booking: 'Walk-ins accepted',
    bestFor: 'Value treatments, regular visits',
  },
  {
    name: 'Bliss Ladies Spa',
    location: 'Seef District',
    type: 'Ladies-Only Spa',
    rating: 4,
    priceRange: 'BD 20-70',
    description: 'Popular ladies-only spa offering Moroccan hammam, henna, and comprehensive beauty services in a comfortable environment.',
    specialties: ['Moroccan hammam', 'Henna', 'Hair removal', 'Bridal services', 'Facials'],
    amenities: ['Private rooms', 'Hammam', 'Lounge area'],
    signature: 'Moroccan Bath Package - Traditional hammam with argan oil treatment',
    hours: '10AM-10PM (ladies only)',
    booking: 'Recommended for hammam',
    bestFor: 'Ladies, Moroccan hammam, bridal prep',
  },
  {
    name: 'Tips & Toes',
    location: 'Multiple locations',
    type: 'Day Spa Chain',
    rating: 4,
    priceRange: 'BD 15-50',
    description: 'Popular spa chain with multiple branches offering affordable massages, facials, and beauty services.',
    specialties: ['Quick massages', 'Mani-pedi', 'Express facials', 'Waxing', 'Everyday treatments'],
    amenities: ['Treatment rooms', 'Express services'],
    signature: 'Express Head & Shoulder - Quick stress relief',
    hours: 'Mall hours typically',
    booking: 'Walk-ins welcome',
    bestFor: 'Quick treatments, budget-friendly',
  },
];

const spaTypes = [
  {
    type: 'Luxury Hotel Spas',
    description: 'Premium experiences with world-class facilities',
    examples: 'Four Seasons, Ritz-Carlton',
    priceRange: 'BD 50-200',
  },
  {
    type: 'Resort Spas',
    description: 'Beach/pool access combined with treatments',
    examples: 'Sofitel, ART Rotana',
    priceRange: 'BD 35-150',
  },
  {
    type: 'Day Spas',
    description: 'Standalone spas for quick treatments',
    examples: 'Tips & Toes, Bliss',
    priceRange: 'BD 15-70',
  },
  {
    type: 'Hammams',
    description: 'Traditional Middle Eastern bathing rituals',
    examples: 'Ritz-Carlton, Bliss',
    priceRange: 'BD 25-100',
  },
];

const spaTips = [
  {
    title: 'Book Ahead',
    content: 'Popular spas like Four Seasons book out, especially weekends. Reserve 1-2 weeks in advance.',
  },
  {
    title: 'Arrive Early',
    content: 'Arrive 15-30 minutes early to enjoy facilities like saunas, steam rooms, and relaxation areas.',
  },
  {
    title: 'Packages Save',
    content: 'Multi-treatment packages offer 15-25% savings. Couples packages are great value.',
  },
  {
    title: 'Memberships',
    content: 'Regular visitors should ask about memberships - monthly rates can halve per-visit costs.',
  },
  {
    title: 'Gratuities',
    content: 'Tips of 10-15% are appreciated but not mandatory at hotel spas. Always optional.',
  },
  {
    title: 'Ladies Days',
    content: 'Some spas have ladies-only days or sessions. Check schedules if you prefer this.',
  },
];

export default function SpasPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Spas', url: 'https://www.bahrainnights.com/guides/spas' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium mb-4">
              💆 Wellness Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Best Spas
              </span>
              {' '}in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Unwind and rejuvenate at Bahrain's finest spas — from luxury hotel sanctuaries 
              to traditional hammams and affordable day spas.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Top Spas', value: '15+', icon: Sparkles },
              { label: 'Massage From', value: 'BD 20', icon: DollarSign },
              { label: 'Luxury Spas', value: '5+', icon: Star },
              { label: 'Hammams', value: '4+', icon: Droplets },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spa Types */}
      <section className="py-8 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-center">Types of Spas</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {spaTypes.map((type) => (
              <div key={type.type} className="bg-white/5 rounded-xl p-4">
                <h3 className="font-semibold text-purple-400 mb-1">{type.type}</h3>
                <p className="text-xs text-gray-400 mb-2">{type.description}</p>
                <p className="text-sm text-gray-300">{type.examples}</p>
                <p className="text-xs text-purple-300 mt-1">{type.priceRange}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spas List */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Best Spas in Bahrain</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Complete guide to spas with treatments, prices, and booking info.
          </p>
          
          <div className="space-y-6">
            {spas.map((spa) => (
              <div 
                key={spa.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold">{spa.name}</h3>
                        <p className="text-purple-400 text-sm flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {spa.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex">
                          {[...Array(spa.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-purple-400 fill-purple-400" />
                          ))}
                        </div>
                        <span className="text-sm font-bold text-white">{spa.priceRange}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{spa.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {spa.specialties.map((s) => (
                        <span key={s} className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="bg-purple-500/10 rounded-lg p-3 mb-4">
                      <p className="text-sm">
                        <Flower2 className="w-4 h-4 inline mr-1 text-purple-400" />
                        <strong className="text-purple-300">Signature: </strong>
                        {spa.signature}
                      </p>
                    </div>
                  </div>
                  
                  <div className="lg:w-1/4 space-y-2 text-sm bg-black/20 rounded-xl p-4">
                    <p><strong className="text-gray-400">Hours:</strong> {spa.hours}</p>
                    <p><strong className="text-gray-400">Booking:</strong> {spa.booking}</p>
                    <div className="pt-2">
                      <strong className="text-gray-400">Amenities:</strong>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {spa.amenities.slice(0, 4).map((a) => (
                          <span key={a} className="text-xs bg-white/10 px-2 py-0.5 rounded">{a}</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-purple-400 italic pt-2">Best for: {spa.bestFor}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Spa Visit Tips</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {spaTips.map((tip) => (
              <div key={tip.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-purple-400 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-300">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Time to Relax</h2>
          <p className="text-gray-300 mb-8">
            Explore more ways to unwind in Bahrain.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/hotels"
              className="px-8 py-3 bg-purple-500 hover:bg-purple-400 text-black font-bold rounded-lg transition-colors"
            >
              Luxury Hotels
            </Link>
            <Link 
              href="/guides/beach-clubs"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              Beach Clubs
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
              { title: 'Best Hotels', href: '/guides/hotels', emoji: '🏨' },
              { title: 'Beach Clubs', href: '/guides/beach-clubs', emoji: '🏖️' },
              { title: 'Romantic Ideas', href: '/guides/romantic', emoji: '💕' },
              { title: 'Staycations', href: '/guides/staycations', emoji: '🌴' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group"
              >
                <span className="text-2xl mb-2 block">{guide.emoji}</span>
                <span className="font-medium group-hover:text-purple-400 transition-colors">
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
                q: 'What is the best spa in Bahrain?',
                a: 'The Spa at Four Seasons Bahrain Bay is widely considered Bahrain\'s best luxury spa, followed by The Ritz-Carlton Spa. Both offer world-class treatments and facilities.',
              },
              {
                q: 'How much does a massage cost in Bahrain?',
                a: 'Prices range from BD 20-30 for basic 60-minute massages at day spas to BD 80-150 for signature treatments at luxury hotel spas.',
              },
              {
                q: 'Are there ladies-only spas in Bahrain?',
                a: 'Yes, Bliss Ladies Spa and similar venues offer ladies-only environments. Many hotel spas also have dedicated ladies\' sessions or areas.',
              },
              {
                q: 'Where can I experience a traditional hammam in Bahrain?',
                a: 'The Ritz-Carlton Spa has an excellent private hammam. Sofitel offers hammam treatments, and Bliss Spa specializes in Moroccan hammam experiences.',
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
            headline: 'Best Spas in Bahrain 2026 | Luxury Wellness & Massage Guide',
            description: 'Complete guide to spas in Bahrain including luxury hotel spas, hammams, and day spas.',
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
              '@id': 'https://bahrainnights.com/guides/spas',
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
                name: 'What is the best spa in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The Spa at Four Seasons Bahrain Bay is widely considered Bahrain\'s best luxury spa.',
                },
              },
              {
                '@type': 'Question',
                name: 'How much does a massage cost in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Prices range from BD 20-30 at day spas to BD 80-150 at luxury hotel spas.',
                },
              },
              {
                '@type': 'Question',
                name: 'Are there ladies-only spas in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, Bliss Ladies Spa and many hotel spas offer ladies-only environments.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
