import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Coffee, Star, MapPin, Clock, DollarSign, Utensils, Wine,
  Music, Sparkles, Users, Calendar, ChefHat, Cake, Sun
} from 'lucide-react';

// SEO Optimized Metadata
export const metadata: Metadata = {
  title: 'Best Brunches in Bahrain 2026 — Friday Brunch Guide | BahrainNights',
  description: 'Discover the best Friday brunches in Bahrain for 2026! Complete guide to hotel brunches, prices, what to expect, and insider tips. From Gulf Hotel to Four Seasons.',
  keywords: [
    'best brunch Bahrain', 'Friday brunch Bahrain', 'Bahrain brunch 2026',
    'Gulf Hotel brunch', 'Four Seasons brunch Bahrain', 'hotel brunch Bahrain',
    'brunch deals Bahrain', 'unlimited brunch Bahrain', 'champagne brunch Bahrain',
    'family brunch Bahrain', 'best Friday brunch Manama', 'brunch prices Bahrain'
  ].join(', '),
  alternates: {
    canonical: 'https://www.bahrainnights.com/best-brunches-bahrain',
  },
  openGraph: {
    title: 'Best Brunches in Bahrain 2026 — Friday Brunch Guide',
    description: 'Your ultimate guide to Friday brunches in Bahrain. Compare prices, menus, and atmospheres at top hotels and restaurants.',
    url: 'https://www.bahrainnights.com/best-brunches-bahrain',
    siteName: 'BahrainNights',
    images: [
      {
        url: 'https://www.bahrainnights.com/og-brunch.jpg',
        width: 1200,
        height: 630,
        alt: 'Best Brunches in Bahrain',
      },
    ],
    type: 'article',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Brunches in Bahrain 2026',
    description: 'Friday brunch guide - prices, menus, and top picks!',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

// JSON-LD Schema
function generateSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': 'https://www.bahrainnights.com/best-brunches-bahrain#article',
        headline: 'Best Brunches in Bahrain 2026 — Complete Friday Brunch Guide',
        description: 'Discover the best Friday brunches in Bahrain. From luxury hotel spreads to casual café brunches.',
        author: {
          '@type': 'Organization',
          name: 'BahrainNights'
        },
        publisher: {
          '@type': 'Organization',
          name: 'BahrainNights',
          logo: {
            '@type': 'ImageObject',
            url: 'https://www.bahrainnights.com/logo.png'
          }
        },
        datePublished: '2024-01-15',
        dateModified: new Date().toISOString().split('T')[0],
      },
      {
        '@type': 'ItemList',
        name: 'Best Brunches in Bahrain',
        itemListOrder: 'https://schema.org/ItemListOrderDescending',
        numberOfItems: 15,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Al Waha - Gulf Hotel', description: 'Bahrain\'s most famous Friday brunch' },
          { '@type': 'ListItem', position: 2, name: 'Bay View - Four Seasons', description: 'Elegant champagne brunch' },
          { '@type': 'ListItem', position: 3, name: 'La Med - Ritz-Carlton', description: 'Mediterranean poolside brunch' },
          { '@type': 'ListItem', position: 4, name: 'Choices - InterContinental', description: 'Best value hotel brunch' },
          { '@type': 'ListItem', position: 5, name: 'Mövenpick Friday Brunch', description: 'Swiss hospitality brunch' },
        ]
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.bahrainnights.com' },
          { '@type': 'ListItem', position: 2, name: 'Best Brunches Bahrain', item: 'https://www.bahrainnights.com/best-brunches-bahrain' }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is the best Friday brunch in Bahrain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The most popular Friday brunch in Bahrain is Al Waha at Gulf Hotel, known for its extensive selection, live cooking stations, and legendary dessert room. Other top choices include Four Seasons Bay View for elegance and Ritz-Carlton La Med for Mediterranean cuisine.'
            }
          },
          {
            '@type': 'Question',
            name: 'How much does Friday brunch cost in Bahrain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Friday brunch prices in Bahrain range from 18-60 BHD per person. Budget brunches start around 18-25 BHD, mid-range options are 25-35 BHD, and premium hotel brunches cost 40-60 BHD. Prices usually include soft drinks, with alcohol packages available.'
            }
          },
          {
            '@type': 'Question',
            name: 'What time does Friday brunch start in Bahrain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Most Friday brunches in Bahrain run from 12:30 PM to 4:00 PM. Some venues offer extended brunches until 5:00 PM. Early arrival is recommended for the best selection and to secure good seating.'
            }
          },
          {
            '@type': 'Question',
            name: 'Do I need to book Friday brunch in advance?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, booking in advance is highly recommended, especially for popular venues like Gulf Hotel and Four Seasons. Some brunches sell out weeks ahead. Book at least a week in advance for weekend brunches.'
            }
          },
          {
            '@type': 'Question',
            name: 'Are Friday brunches in Bahrain family-friendly?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Most hotel brunches in Bahrain are family-friendly with special kids\' areas, entertainment, and children\'s menus. Many offer discounted or free entry for children under 6. Ritz-Carlton and InterContinental are particularly popular with families.'
            }
          }
        ]
      }
    ]
  };
}

const brunchVenues = [
  {
    category: 'Premium Hotel Brunches',
    description: 'The crème de la crème of Bahrain\'s brunch scene',
    icon: Sparkles,
    color: 'from-amber-500 to-orange-600',
    venues: [
      {
        name: 'Al Waha - Gulf Hotel',
        location: 'Gulf Hotel Bahrain',
        price: '35-45 BHD',
        time: '12:30 PM - 4:00 PM',
        rating: 4.8,
        description: 'The undisputed king of Bahrain brunches. Al Waha has been voted the best brunch in the Gulf for years. Features over 15 live cooking stations, an incredible seafood tower, premium sushi bar, and the famous dessert room that\'s an Instagram sensation. The atmosphere is buzzing with live music and entertainment.',
        highlights: ['15+ Live Stations', 'Seafood Tower', 'Dessert Room', 'Live Music'],
        tip: 'Book 2 weeks ahead. Ask for terrace seating for the best experience.',
        alcohol: 'Packages available',
        link: '/venues'
      },
      {
        name: 'Bay View - Four Seasons',
        location: 'Four Seasons Bahrain Bay',
        price: '45-60 BHD',
        time: '12:30 PM - 4:00 PM',
        rating: 4.7,
        description: 'Elegance meets excellence at Four Seasons\' signature brunch. Stunning views of Bahrain Bay, impeccable service, and a curated selection of premium dishes. The champagne flows freely, and the quality is consistently outstanding. Perfect for special occasions.',
        highlights: ['Champagne Package', 'Bay Views', 'Premium Seafood', 'Live Chef Stations'],
        tip: 'Request window seating for the best views. Their wagyu station is exceptional.',
        alcohol: 'Premium champagne packages',
        link: '/venues'
      },
      {
        name: 'La Med - Ritz-Carlton',
        location: 'The Ritz-Carlton Bahrain',
        price: '40-55 BHD',
        time: '12:30 PM - 4:00 PM',
        rating: 4.6,
        description: 'Mediterranean-themed brunch by the stunning infinity pool. La Med offers a sophisticated atmosphere with outstanding mezze, grilled meats, and seafood. The poolside setting is unbeatable, and kids have their own entertainment area.',
        highlights: ['Pool Views', 'Mediterranean Focus', 'Kids\' Area', 'Outdoor Seating'],
        tip: 'Come early to grab poolside tables. Great for families with children.',
        alcohol: 'Packages available',
        link: '/venues'
      },
    ]
  },
  {
    category: 'Best Value Brunches',
    description: 'Excellent quality without breaking the bank',
    icon: DollarSign,
    color: 'from-green-500 to-emerald-600',
    venues: [
      {
        name: 'Choices - InterContinental',
        location: 'InterContinental Regency',
        price: '25-35 BHD',
        time: '12:00 PM - 4:00 PM',
        rating: 4.5,
        description: 'Arguably the best value brunch in Bahrain. Choices offers an enormous selection across multiple cuisines - Asian, Arabic, Indian, and Western. The stations are constantly refreshed, and the quality rivals more expensive options. Very popular with families.',
        highlights: ['Best Value', 'Huge Selection', 'Multiple Cuisines', 'Family Friendly'],
        tip: 'Start with the Asian station - their dim sum is excellent.',
        alcohol: 'Packages available',
        link: '/venues'
      },
      {
        name: 'Flavours on 2 - Crowne Plaza',
        location: 'Crowne Plaza Manama',
        price: '22-30 BHD',
        time: '12:30 PM - 4:00 PM',
        rating: 4.3,
        description: 'A hidden gem that locals love. Excellent variety with particularly strong Indian and Arabic sections. The price-to-quality ratio is outstanding, and it never feels overcrowded. Great service and consistently good food.',
        highlights: ['Great Value', 'Strong Indian Section', 'Less Crowded', 'Good Service'],
        tip: 'Their biryani station is exceptional. Arrive early for the freshest dishes.',
        alcohol: 'Available',
        link: '/venues'
      },
      {
        name: 'Mövenpick Friday Brunch',
        location: 'Mövenpick Hotel Bahrain',
        price: '20-28 BHD',
        time: '12:30 PM - 4:00 PM',
        rating: 4.4,
        description: 'Swiss hospitality meets Gulf generosity. Known for excellent chocolate desserts (it\'s Mövenpick, after all), solid main courses, and a friendly atmosphere. The outdoor garden area is lovely in cooler months.',
        highlights: ['Amazing Desserts', 'Garden Seating', 'Swiss Quality', 'Good Kids\' Menu'],
        tip: 'Save room for the chocolate fountain and ice cream station.',
        alcohol: 'Packages available',
        link: '/venues'
      },
    ]
  },
  {
    category: 'Boutique & Restaurant Brunches',
    description: 'Unique experiences beyond hotel buffets',
    icon: ChefHat,
    color: 'from-purple-500 to-pink-600',
    venues: [
      {
        name: 'The Orangery',
        location: 'Adliya',
        price: '15-25 BHD',
        time: '9:00 AM - 4:00 PM',
        rating: 4.5,
        description: 'The Instagram queen of Bahrain cafés. The Orangery offers a à la carte brunch in a stunning garden setting. Perfect for those who prefer ordering dishes rather than buffet-style. Their shakshuka, avocado toast, and pastries are legendary.',
        highlights: ['À La Carte', 'Garden Setting', 'Instagrammable', 'Great Coffee'],
        tip: 'Book the garden area. Try their rose latte and eggs royale.',
        alcohol: 'Not available',
        link: '/venues'
      },
      {
        name: 'Lilou Artisan Patisserie',
        location: 'Adliya',
        price: '12-20 BHD',
        time: '8:00 AM - 5:00 PM',
        rating: 4.5,
        description: 'French café charm in the heart of Adliya. Lilou serves all-day breakfast and brunch with authentic French pastries, excellent eggs dishes, and the best croissants in Bahrain. Cozy atmosphere perfect for a relaxed meal.',
        highlights: ['French Pastries', 'Cozy Atmosphere', 'Best Croissants', 'All-Day Breakfast'],
        tip: 'Go early on Fridays - it fills up fast. Their almond croissant is a must.',
        alcohol: 'Not available',
        link: '/venues'
      },
      {
        name: 'Crust & Crema',
        location: 'Adliya',
        price: '10-18 BHD',
        time: '7:00 AM - 6:00 PM',
        rating: 4.4,
        description: 'Artisan bakery café with outstanding breakfast options. Fresh-baked breads, pastries, and hearty brunch plates. Their sourdough toast and egg dishes are exceptional. Great for a casual, quality brunch without the hotel crowds.',
        highlights: ['Fresh Baked Goods', 'Sourdough Bread', 'Casual Vibe', 'Quality Ingredients'],
        tip: 'Try their signature breakfast board - great for sharing.',
        alcohol: 'Not available',
        link: '/venues'
      },
      {
        name: '198 Cafe',
        location: 'Manama',
        price: '10-18 BHD',
        time: '8:00 AM - 10:00 PM',
        rating: 4.6,
        description: 'Specialty coffee haven with excellent brunch offerings. Perfect for those who take their coffee seriously. Healthy options, smoothie bowls, and classic brunch dishes. Great for remote work with a delicious meal.',
        highlights: ['Specialty Coffee', 'Healthy Options', 'Work-Friendly', 'Smoothie Bowls'],
        tip: 'Their pour-over coffee paired with avocado toast is perfection.',
        alcohol: 'Not available',
        link: '/venues'
      },
    ]
  },
  {
    category: 'Beach & Pool Brunches',
    description: 'Brunch with a view and a swim',
    icon: Sun,
    color: 'from-cyan-500 to-blue-600',
    venues: [
      {
        name: 'Reef Resort Pool Brunch',
        location: 'Reef Resort Bahrain',
        price: '25-35 BHD',
        time: '12:00 PM - 5:00 PM',
        rating: 4.3,
        description: 'Combine brunch with a beach day. Reef Resort offers a casual poolside brunch with access to their beach and pool facilities. Great BBQ, international dishes, and the perfect setting for a lazy Friday with friends or family.',
        highlights: ['Pool Access', 'Beach Access', 'BBQ Station', 'Casual Vibe'],
        tip: 'Bring swimwear and make a day of it. Great value with pool included.',
        alcohol: 'Packages available',
        link: '/venues'
      },
      {
        name: 'Coral Bay Bahrain',
        location: 'Coral Bay',
        price: '20-30 BHD',
        time: '11:00 AM - 4:00 PM',
        rating: 4.2,
        description: 'Beach club brunch with a laid-back atmosphere. Perfect for those who want to combine dining with beach activities. The setting is beautiful, and the food is solid. Great for groups and celebrations.',
        highlights: ['Beach Setting', 'Relaxed Atmosphere', 'Water Sports', 'Group Friendly'],
        tip: 'Book a cabana for the best experience. Weekends can get busy.',
        alcohol: 'Available',
        link: '/venues'
      },
    ]
  }
];

const brunchTips = [
  {
    icon: Calendar,
    title: 'Book in Advance',
    tip: 'Popular brunches sell out 1-2 weeks ahead. Book early, especially for Gulf Hotel and Four Seasons.'
  },
  {
    icon: Clock,
    title: 'Arrive Early',
    tip: 'Get there at opening time for the freshest dishes and best selection. Late arrivals miss the prime picks.'
  },
  {
    icon: Users,
    title: 'Pace Yourself',
    tip: 'Start light with salads and seafood, then move to hot dishes. Save room for dessert - it\'s usually spectacular.'
  },
  {
    icon: DollarSign,
    title: 'Check Packages',
    tip: 'Most venues offer different pricing tiers. Soft drinks, house beverages, and premium packages - choose what suits you.'
  }
];

export default function BrunchesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSchema()) }}
      />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/30 to-orange-900/30" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <nav className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li>/</li>
                <li className="text-white">Best Brunches Bahrain</li>
              </ol>
            </nav>

            <div className="text-center">
              <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full text-amber-300 text-sm mb-4">
                ☕ Friday Brunch Guide 2026
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-amber-200 to-orange-200 bg-clip-text text-transparent">
                Best Brunches in Bahrain
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Friday brunch is a Gulf tradition, and Bahrain does it exceptionally well. From legendary hotel spreads 
                to charming café experiences, discover where to brunch like a local.
              </p>
              
              <div className="flex flex-wrap justify-center gap-8 mt-10">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-400">15+</div>
                  <div className="text-sm text-gray-400">Brunch Venues</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400">18-60</div>
                  <div className="text-sm text-gray-400">BHD Range</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">Friday</div>
                  <div className="text-sm text-gray-400">Best Day</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What to Expect */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
            <h2 className="text-3xl font-bold text-white mb-6">What is Friday Brunch in Bahrain?</h2>
            <p className="text-gray-300 leading-relaxed">
              Friday brunch in the Gulf is more than just a meal — it's a cherished social institution. Since Friday is the 
              weekend in Bahrain, families and friends gather at hotels and restaurants for elaborate brunches that can last 
              several hours. It's a time to relax, indulge, and catch up after the workweek.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Unlike Western brunch, Gulf brunches are typically <strong>all-you-can-eat buffet affairs</strong> with an 
              incredible variety of cuisines. Expect live cooking stations, seafood towers, carving stations, sushi bars, 
              and dessert rooms that rival the main course. Many venues offer packages with unlimited beverages, making 
              it a true celebration.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Most hotel brunches run from <strong>12:30 PM to 4:00 PM</strong>, giving you plenty of time to sample 
              everything. Dress code is smart casual — think sundresses and linen shirts rather than beachwear. 
              Reservations are essential for popular spots, especially during the cooler months from October to April.
            </p>
          </div>
        </section>

        {/* Brunch Tips */}
        <section className="py-8 px-4 bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white text-center mb-8">Brunch Like a Pro</h2>
            <div className="grid md:grid-cols-4 gap-4">
              {brunchTips.map((tip) => (
                <div key={tip.title} className="p-4 bg-gray-800/50 rounded-xl text-center">
                  <tip.icon className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-2">{tip.title}</h3>
                  <p className="text-sm text-gray-400">{tip.tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Brunch Venues */}
        {brunchVenues.map((category) => (
          <section 
            key={category.category} 
            id={category.category.toLowerCase().replace(/\s+/g, '-')}
            className="py-16 px-4"
          >
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color}`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">{category.category}</h2>
                  <p className="text-gray-400">{category.description}</p>
                </div>
              </div>
              
              <div className="space-y-6">
                {category.venues.map((venue) => (
                  <div 
                    key={venue.name} 
                    className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                      <div>
                        <h3 className="text-2xl font-semibold text-white">
                          {venue.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mt-2">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" /> {venue.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" /> {venue.time}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-amber-400">
                          <Star className="w-5 h-5 fill-amber-400" />
                          <span className="font-semibold text-lg">{venue.rating}</span>
                        </div>
                        <div className="text-xl font-bold text-green-400">{venue.price}</div>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed mb-4">{venue.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {venue.highlights.map((highlight) => (
                        <span key={highlight} className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-amber-300">
                          {highlight}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex flex-col md:flex-row md:items-center gap-4 pt-4 border-t border-gray-700">
                      <div className="flex-1">
                        <span className="text-gray-400 text-sm">💡 Insider Tip:</span>
                        <span className="text-gray-300 text-sm ml-2">{venue.tip}</span>
                      </div>
                      <div className="text-sm text-gray-400">
                        <Wine className="w-4 h-4 inline mr-1" /> {venue.alcohol}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Price Comparison */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-10">Brunch Price Guide</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-gray-800/50 rounded-xl text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">18-25 BHD</div>
                <div className="text-lg font-semibold text-white mb-2">Budget Friendly</div>
                <p className="text-sm text-gray-400">Café brunches, smaller hotels, à la carte options. Great quality without the premium price.</p>
              </div>
              <div className="p-6 bg-amber-900/30 rounded-xl text-center border border-amber-700/50">
                <div className="text-3xl font-bold text-amber-400 mb-2">25-40 BHD</div>
                <div className="text-lg font-semibold text-white mb-2">Mid-Range</div>
                <p className="text-sm text-gray-400">Most hotel brunches. Excellent variety, good atmosphere, beverage packages available.</p>
              </div>
              <div className="p-6 bg-gray-800/50 rounded-xl text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">40-60 BHD</div>
                <div className="text-lg font-semibold text-white mb-2">Premium</div>
                <p className="text-sm text-gray-400">Five-star hotels, champagne packages, premium seafood, exceptional service.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-10">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">What is the best Friday brunch in Bahrain?</h3>
                <p className="text-gray-300">
                  The most popular Friday brunch is Al Waha at Gulf Hotel, known for its extensive selection, live cooking 
                  stations, and legendary dessert room. Other top choices include Four Seasons Bay View for elegance and 
                  Ritz-Carlton La Med for Mediterranean cuisine by the pool.
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">How much does Friday brunch cost in Bahrain?</h3>
                <p className="text-gray-300">
                  Brunch prices range from 18-60 BHD per person. Budget options start around 18-25 BHD, mid-range hotel 
                  brunches are 25-35 BHD, and premium five-star brunches cost 40-60 BHD. Most venues offer beverage 
                  packages at additional cost.
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">What time does Friday brunch start?</h3>
                <p className="text-gray-300">
                  Most Friday brunches in Bahrain run from 12:30 PM to 4:00 PM. Some venues offer extended hours until 
                  5:00 PM. Café brunches often start earlier, around 9:00 AM, and continue throughout the afternoon.
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Do I need reservations for brunch?</h3>
                <p className="text-gray-300">
                  Yes! Popular brunches like Gulf Hotel and Four Seasons can sell out 1-2 weeks in advance. Always book 
                  ahead, especially during the cooler months (October-April) and for large groups.
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Are Bahrain brunches family-friendly?</h3>
                <p className="text-gray-300">
                  Most hotel brunches are very family-friendly with dedicated kids' areas, entertainment, and children's 
                  menus. Many offer discounted rates for children, and kids under 6 often eat free. Ritz-Carlton and 
                  InterContinental are particularly popular with families.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-amber-900/30 to-orange-900/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Brunch?</h2>
            <p className="text-gray-300 text-lg mb-8">
              Explore more dining options and discover this week's events in Bahrain.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/best-restaurants-bahrain"
                className="px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full text-white font-semibold hover:opacity-90 transition"
              >
                Restaurant Guide
              </Link>
              <Link 
                href="/events"
                className="px-8 py-4 bg-gray-800 rounded-full text-white font-semibold hover:bg-gray-700 transition"
              >
                This Week's Events
              </Link>
            </div>
            
            <p className="mt-12 text-gray-500 text-sm">
              Powered by <Link href="/" className="text-gray-400 hover:text-white">BahrainNights.com</Link> — Bahrain's #1 Events & Lifestyle Platform
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
