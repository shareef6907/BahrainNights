import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Hotel, Star, MapPin, Waves, Dumbbell,
  ArrowRight, Utensils, Sparkles, Coffee, Users
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Best Hotels in Bahrain 2025 | Luxury, Beach & Budget Options',
  description: 'Find the best hotels in Bahrain! From luxury 5-star resorts to budget-friendly options, explore top hotels in Manama, Seef, and near attractions. Complete hotel guide.',
  keywords: 'best hotels in Bahrain, Bahrain hotels, luxury hotels Bahrain, beach hotels Bahrain, 5 star hotels Bahrain, hotels near Bahrain attractions, Manama hotels',
  openGraph: {
    title: 'Best Hotels in Bahrain 2025 | Luxury, Beach & Budget Options',
    description: 'Your complete guide to the best hotels in Bahrain - luxury resorts, beach hotels, and budget options for every traveler.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/hotels',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/hotels',
  },
};

const luxuryHotels = [
  {
    name: 'Four Seasons Hotel Bahrain Bay',
    location: 'Bahrain Bay',
    stars: 5,
    priceRange: 'From BD 150/night',
    rating: 4.9,
    description: 'The crown jewel of Bahrain hotels. Stunning architecture on its own island with private beach, world-class dining, and exceptional service.',
    highlights: ['Private beach', 'CUT by Wolfgang Puck', 'Spa', 'Bay views', 'Pool'],
    bestFor: 'Luxury seekers, special occasions, business travelers',
    dining: ['CUT', 'Bahrain Bay Kitchen', 're/Asian Cuisine'],
  },
  {
    name: 'The Ritz-Carlton, Bahrain',
    location: 'Seef',
    stars: 5,
    priceRange: 'From BD 140/night',
    rating: 4.9,
    description: 'Legendary luxury with beautiful grounds, private beach, and multiple award-winning restaurants. A Bahrain institution.',
    highlights: ['Private beach', 'Multiple pools', 'Spa', 'Royal Beach Club', 'Dining'],
    bestFor: 'Families, luxury seekers, beach lovers',
    dining: ['Bushido', 'La Plage', 'Primavera', 'Trader Vic\'s'],
  },
  {
    name: 'The Merchant House',
    location: 'Manama',
    stars: 5,
    priceRange: 'From BD 120/night',
    rating: 4.8,
    description: 'Boutique luxury in a restored heritage building. Intimate, romantic, and full of character. Home to The Orangery restaurant.',
    highlights: ['Boutique experience', 'Heritage building', 'The Orangery', 'Courtyard', 'Personalized service'],
    bestFor: 'Couples, boutique lovers, culture seekers',
    dining: ['The Orangery'],
  },
  {
    name: 'Jumeirah Royal Saray',
    location: 'Seef',
    stars: 5,
    priceRange: 'From BD 130/night',
    rating: 4.8,
    description: 'Palatial resort with Ottoman-inspired design, private beach, and lavish spa. One of the most impressive properties in the Gulf.',
    highlights: ['Private beach', 'Talise Spa', 'Royal residences', 'Pool', 'Architecture'],
    bestFor: 'Luxury seekers, spa lovers, special occasions',
    dining: ['North Ocean', 'Plums', 'Salt Restaurant'],
  },
];

const midRangeHotels = [
  {
    name: 'Gulf Hotel Bahrain',
    location: 'Adliya',
    stars: 5,
    priceRange: 'From BD 70/night',
    rating: 4.5,
    description: 'Long-established hotel with character, excellent dining options, and central Adliya location. Great value for five-star.',
    highlights: ['Central location', 'Multiple restaurants', 'Pool', 'Spa', 'Convention facilities'],
    bestFor: 'Business travelers, families, value seekers',
  },
  {
    name: 'Sofitel Bahrain Zallaq Thalassa',
    location: 'Zallaq',
    stars: 5,
    priceRange: 'From BD 80/night',
    rating: 4.6,
    description: 'Beach resort south of Manama with thalassotherapy spa and French elegance. Great for a beach escape.',
    highlights: ['Beach', 'Thalasso spa', 'Pool', 'French dining', 'Relaxed vibe'],
    bestFor: 'Beach lovers, spa seekers, relaxation',
  },
  {
    name: 'InterContinental Regency Bahrain',
    location: 'Manama',
    stars: 5,
    priceRange: 'From BD 65/night',
    rating: 4.4,
    description: 'Centrally located with good facilities and multiple dining options. Solid five-star option at reasonable prices.',
    highlights: ['Central location', 'Multiple dining', 'Pool', 'Business facilities'],
    bestFor: 'Business travelers, central location seekers',
  },
  {
    name: 'Downtown Rotana',
    location: 'Manama',
    stars: 5,
    priceRange: 'From BD 55/night',
    rating: 4.4,
    description: 'Modern business hotel with great Italian restaurant (Masso) and convenient city location.',
    highlights: ['City location', 'Masso restaurant', 'Modern rooms', 'Business facilities'],
    bestFor: 'Business travelers, city access',
  },
];

const budgetFriendly = [
  {
    name: 'Wyndham Garden Manama',
    location: 'Juffair',
    stars: 4,
    priceRange: 'From BD 35/night',
    description: 'Good value in the Juffair area with pool and restaurant. Popular with expats and business visitors.',
    bestFor: 'Budget-conscious, Juffair area',
  },
  {
    name: 'Ramada Hotel Bahrain',
    location: 'Juffair',
    stars: 4,
    priceRange: 'From BD 30/night',
    description: 'Reliable chain hotel with basic amenities and good location near restaurants and nightlife.',
    bestFor: 'Budget, convenience',
  },
  {
    name: 'Golden Tulip Bahrain',
    location: 'Manama',
    stars: 4,
    priceRange: 'From BD 35/night',
    description: 'Affordable option with pool and decent facilities. Good for budget travelers.',
    bestFor: 'Budget-conscious visitors',
  },
];

const hotelAreas = [
  {
    area: 'Bahrain Bay',
    description: 'Ultra-luxury with Four Seasons and waterfront location. Best for luxury seekers.',
    hotels: ['Four Seasons'],
    pros: 'Stunning views, luxury, peaceful',
    cons: 'Expensive, away from action',
  },
  {
    area: 'Seef',
    description: 'Major hotel hub near malls and beaches. Mix of luxury and mid-range.',
    hotels: ['Ritz-Carlton', 'Jumeirah', 'Multiple mid-range'],
    pros: 'Beach access, shopping, dining',
    cons: 'Can be commercial feeling',
  },
  {
    area: 'Manama/City',
    description: 'Central location near souqs and business district. Good for business.',
    hotels: ['InterContinental', 'Downtown Rotana', 'Various'],
    pros: 'Central, good for business, culture nearby',
    cons: 'No beach',
  },
  {
    area: 'Juffair',
    description: 'Budget and mid-range options in the expat area. Near nightlife.',
    hotels: ['Wyndham', 'Ramada', 'Various'],
    pros: 'Affordable, nightlife nearby, restaurants',
    cons: 'Less upscale',
  },
];

const hotelTips = [
  {
    title: 'Book Friday Brunch',
    tip: 'Most luxury hotels offer legendary Friday brunches. Book in advance as they sell out.',
  },
  {
    title: 'Ask for Upgrades',
    tip: 'Book directly with hotels for potential upgrade opportunities. Mention special occasions.',
  },
  {
    title: 'Check Beach Access',
    tip: 'Not all hotels have private beaches. Confirm beach access if that\'s important to you.',
  },
  {
    title: 'Consider Location',
    tip: 'Seef is best for beach/shopping, Manama for business/culture, Juffair for nightlife.',
  },
  {
    title: 'Pool Day Passes',
    tip: 'Many hotels sell day passes. Try before you book or enjoy a day at a different property.',
  },
  {
    title: 'F1 Season Prices',
    tip: 'Prices spike during F1 weekend (February/March). Book months ahead or avoid these dates.',
  },
];

export default function HotelsGuidePage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Hotels', url: 'https://www.bahrainnights.com/guides/hotels' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium mb-4">
              🏨 Hotel Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                Hotels
              </span>
              {' '}in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From world-class luxury resorts to comfortable budget options, Bahrain offers 
              accommodation for every traveler. Here&apos;s your complete guide to the best 
              hotels in the Kingdom.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: '5-Star Hotels', value: '15+', icon: Star },
              { label: 'Beach Resorts', value: '8+', icon: Waves },
              { label: 'With Spa', value: '12+', icon: Sparkles },
              { label: 'Starting From', value: 'BD 30', icon: Hotel },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Hotels */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Luxury Hotels</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Bahrain&apos;s finest hotels offering world-class service and amenities.
          </p>
          
          <div className="space-y-6">
            {luxuryHotels.map((hotel) => (
              <div 
                key={hotel.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-blue-400">{hotel.name}</h3>
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star className="w-4 h-4 fill-yellow-400" />
                        <span className="text-sm font-bold">{hotel.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 mb-1">{hotel.location} • {hotel.stars} Stars</p>
                    <p className="text-gray-300 text-sm mb-4">{hotel.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {hotel.highlights.map((h) => (
                        <span key={h} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">
                          {h}
                        </span>
                      ))}
                    </div>
                    
                    <p className="text-sm text-gray-400 mb-2">
                      <strong>Best for:</strong> {hotel.bestFor}
                    </p>
                    {hotel.dining && (
                      <p className="text-sm text-amber-400">
                        <strong>Dining:</strong> {hotel.dining.join(', ')}
                      </p>
                    )}
                  </div>
                  
                  <div className="lg:text-right lg:min-w-[150px]">
                    <p className="text-lg font-bold text-blue-400">{hotel.priceRange}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mid-Range */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Mid-Range Options</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Great value five-star hotels with excellent facilities.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {midRangeHotels.map((hotel) => (
              <div key={hotel.name} className="bg-white/5 rounded-2xl p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg">{hotel.name}</h3>
                    <p className="text-sm text-gray-400">{hotel.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="w-4 h-4 fill-yellow-400" />
                      <span className="text-sm">{hotel.rating}</span>
                    </div>
                    <p className="text-xs text-blue-400">{hotel.priceRange}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-3">{hotel.description}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {hotel.highlights.map((h) => (
                    <span key={h} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">
                      {h}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-400">Best for: {hotel.bestFor}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Budget Options */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">💰 Budget-Friendly</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {budgetFriendly.map((hotel) => (
              <div key={hotel.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-lg">{hotel.name}</h3>
                <p className="text-sm text-gray-400 mb-1">{hotel.location} • {hotel.stars}★</p>
                <p className="text-blue-400 font-bold mb-3">{hotel.priceRange}</p>
                <p className="text-gray-300 text-sm mb-2">{hotel.description}</p>
                <p className="text-xs text-gray-400">Best for: {hotel.bestFor}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By Area */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">By Area</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {hotelAreas.map((area) => (
              <div key={area.area} className="bg-white/5 rounded-2xl p-6">
                <h3 className="font-bold text-xl text-blue-400 mb-2">{area.area}</h3>
                <p className="text-gray-300 text-sm mb-3">{area.description}</p>
                <p className="text-xs text-gray-400 mb-2">Hotels: {area.hotels.join(', ')}</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="text-green-400">✓ {area.pros}</div>
                  <div className="text-red-400">✗ {area.cons}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">💡 Hotel Tips</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hotelTips.map((item) => (
              <div key={item.title} className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl p-5">
                <h3 className="font-bold text-blue-400 mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Beach Clubs', href: '/guides/beach-clubs', emoji: '🏖️' },
              { title: 'Best Brunches', href: '/guides/brunch', emoji: '🥂' },
              { title: 'Tourist Attractions', href: '/guides/tourist-attractions', emoji: '🏛️' },
              { title: 'Things to Do', href: '/guides/things-to-do', emoji: '🎯' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group"
              >
                <span className="text-2xl mb-2 block">{guide.emoji}</span>
                <span className="font-medium group-hover:text-blue-400 transition-colors">
                  {guide.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {[
              {
                q: 'What are the best hotels in Bahrain?',
                a: 'The Four Seasons Bahrain Bay and The Ritz-Carlton are consistently rated as the best hotels in Bahrain. The Merchant House offers boutique luxury, while Gulf Hotel provides excellent value.',
              },
              {
                q: 'Which hotels in Bahrain have private beaches?',
                a: 'Hotels with private beaches include Four Seasons, The Ritz-Carlton, Jumeirah Royal Saray, and Sofitel Zallaq. All offer beach access with loungers, water sports, and dining.',
              },
              {
                q: 'Where should I stay in Bahrain?',
                a: 'Stay in Seef for beach access and shopping, Manama/City Center for business and culture, Bahrain Bay for luxury, or Juffair for nightlife and budget options.',
              },
              {
                q: 'How much do hotels cost in Bahrain?',
                a: 'Budget hotels start from BD 30/night, mid-range from BD 55/night, and luxury hotels from BD 120-150/night. Prices increase significantly during F1 weekend and peak season.',
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

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Plan Your Stay</h2>
          <p className="text-gray-300 mb-8">
            Explore attractions or check what&apos;s happening during your visit.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/tourist-attractions"
              className="px-8 py-3 bg-blue-500 hover:bg-blue-400 text-black font-bold rounded-lg transition-colors"
            >
              Tourist Attractions
            </Link>
            <Link 
              href="/events"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              View Events
            </Link>
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
            headline: 'Best Hotels in Bahrain 2025',
            description: 'Complete guide to the best hotels in Bahrain including luxury resorts, beach hotels, and budget options.',
            author: {
              '@type': 'Organization',
              name: 'BahrainNights',
              url: 'https://bahrainnights.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'BahrainNights',
            },
            datePublished: '2025-01-26',
            dateModified: lastUpdated,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://bahrainnights.com/guides/hotels',
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
                name: 'What are the best hotels in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The Four Seasons Bahrain Bay and The Ritz-Carlton are consistently rated as the best. The Merchant House offers boutique luxury, while Gulf Hotel provides excellent value.',
                },
              },
              {
                '@type': 'Question',
                name: 'Which hotels in Bahrain have private beaches?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Hotels with private beaches include Four Seasons, The Ritz-Carlton, Jumeirah Royal Saray, and Sofitel Zallaq.',
                },
              },
              {
                '@type': 'Question',
                name: 'Where should I stay in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Stay in Seef for beach access and shopping, Manama for business, Bahrain Bay for luxury, or Juffair for nightlife and budget options.',
                },
              },
              {
                '@type': 'Question',
                name: 'How much do hotels cost in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Budget hotels start from BD 30/night, mid-range from BD 55/night, and luxury hotels from BD 120-150/night.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
