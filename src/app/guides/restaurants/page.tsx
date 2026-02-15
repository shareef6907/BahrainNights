import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Utensils, Star, MapPin, Clock, DollarSign,
  ArrowRight, Wine, Flame, Leaf, Fish, ChefHat
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import InternalLinks from '@/components/SEO/InternalLinks';

export const metadata: Metadata = {
  title: 'Best Restaurants in Bahrain 2026 | Top Dining Guide',
  description: 'Discover the best restaurants in Bahrain! From fine dining to local gems, explore top-rated restaurants in Manama, Seef, Adliya. Complete dining guide with reviews.',
  keywords: 'best restaurants in Bahrain, Bahrain restaurants, where to eat in Bahrain, Bahrain dining, Manama restaurants, fine dining Bahrain, Bahrain food guide',
  openGraph: {
    title: 'Best Restaurants in Bahrain 2026 | Top Dining Guide',
    description: 'Your complete guide to the best restaurants in Bahrain - fine dining, casual eats, and hidden gems.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/restaurants',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/restaurants',
  },
};

const topRestaurants = [
  {
    name: 'CUT by Wolfgang Puck',
    cuisine: 'Steakhouse',
    location: 'Four Seasons Bahrain Bay',
    price: '$$$$',
    rating: 4.9,
    description: 'World-class steakhouse with prime cuts, stunning views of Bahrain Bay, and impeccable service.',
    mustTry: ['Bone-in ribeye', 'Wagyu beef', 'Truffle mac & cheese'],
    atmosphere: 'Elegant, romantic, special occasions',
    reservations: 'Essential - book 1-2 weeks ahead',
  },
  {
    name: 'Masso',
    cuisine: 'Italian',
    location: 'Downtown Rotana',
    price: '$$$',
    rating: 4.8,
    description: 'Authentic Italian cuisine in a contemporary setting. Known for fresh pasta and wood-fired pizzas.',
    mustTry: ['Truffle pasta', 'Ossobuco', 'Tiramisu'],
    atmosphere: 'Sophisticated, buzzy, great for groups',
    reservations: 'Recommended for weekends',
  },
  {
    name: 'The Orangery',
    cuisine: 'International/Brunch',
    location: 'The Merchant House',
    price: '$$$',
    rating: 4.8,
    description: 'Boutique hotel restaurant famous for its Friday brunch and garden setting.',
    mustTry: ['Friday brunch', 'Afternoon tea', 'Lamb shank'],
    atmosphere: 'Elegant, intimate, colonial charm',
    reservations: 'Essential for Friday brunch',
  },
  {
    name: 'Takht Jamsheed',
    cuisine: 'Persian',
    location: 'Gudaibiya',
    price: '$$',
    rating: 4.7,
    description: 'Authentic Persian cuisine loved by locals. Generous portions and aromatic dishes.',
    mustTry: ['Joojeh kebab', 'Ghormeh sabzi', 'Tahdig rice'],
    atmosphere: 'Casual, family-friendly, traditional',
    reservations: 'Walk-in usually fine',
  },
  {
    name: 'Bushido',
    cuisine: 'Japanese',
    location: 'The Ritz-Carlton',
    price: '$$$$',
    rating: 4.8,
    description: 'Contemporary Japanese dining with sushi, teppanyaki, and a sophisticated ambiance.',
    mustTry: ['Omakase', 'Black cod miso', 'Dragon roll'],
    atmosphere: 'Upscale, elegant, date night',
    reservations: 'Recommended',
  },
  {
    name: 'Mirai',
    cuisine: 'Japanese/Sushi',
    location: 'Adliya',
    price: '$$$',
    rating: 4.7,
    description: 'Hidden gem for sushi lovers. Fresh fish and creative rolls in a minimalist setting.',
    mustTry: ['Chef\'s selection sashimi', 'Specialty rolls', 'Japanese curry'],
    atmosphere: 'Minimalist, trendy, intimate',
    reservations: 'Recommended for dinner',
  },
  {
    name: 'La Vinoteca',
    cuisine: 'Spanish/Tapas',
    location: 'The Westin',
    price: '$$$',
    rating: 4.6,
    description: 'Spanish tapas bar with extensive wine selection and lively atmosphere.',
    mustTry: ['Jamón ibérico', 'Patatas bravas', 'Paella'],
    atmosphere: 'Lively, social, wine bar vibes',
    reservations: 'Recommended for groups',
  },
  {
    name: 'Saffron by Jena',
    cuisine: 'Bahraini/Middle Eastern',
    location: 'Adliya',
    price: '$$',
    rating: 4.7,
    description: 'Traditional Bahraini cuisine in a heritage house. Perfect for experiencing local flavors.',
    mustTry: ['Machboos', 'Muhammar', 'Bahraini breakfast'],
    atmosphere: 'Traditional, heritage, authentic',
    reservations: 'Recommended for groups',
  },
];

const cuisineGuide = [
  {
    cuisine: 'Bahraini/Gulf',
    icon: Flame,
    description: 'Traditional dishes like machboos (spiced rice with meat), muhammar (sweet rice), and fresh seafood.',
    topPicks: ['Saffron by Jena', 'Haji\'s Cafe', 'Al Bindaira Cafe'],
    tip: 'Try the traditional Bahraini breakfast for an authentic experience.',
  },
  {
    cuisine: 'Indian',
    icon: Leaf,
    description: 'Bahrain has excellent Indian restaurants, from fine dining to street food style.',
    topPicks: ['Charcoal Grill', 'Rasoi by Vineet', 'Lanterns'],
    tip: 'South Indian options are particularly good. Try Kozhikode Restaurant for Kerala cuisine.',
  },
  {
    cuisine: 'Seafood',
    icon: Fish,
    description: 'Fresh Gulf seafood including hammour, shrimp, and crab in various styles.',
    topPicks: ['Ocean', 'Fish Market (Intercontinental)', 'Bahrain Fish House'],
    tip: 'Friday fish market at Manama Souq is great for fresh catches.',
  },
  {
    cuisine: 'International/Fine Dining',
    icon: ChefHat,
    description: 'World-class restaurants in five-star hotels offering global cuisines.',
    topPicks: ['CUT', 'Bushido', 'The Orangery', 'Masso'],
    tip: 'Hotel restaurants often have the best Friday brunches - book ahead!',
  },
];

const diningAreas = [
  {
    area: 'Adliya',
    vibe: 'Artsy, trendy, diverse',
    description: 'The hip dining district with cafes, restaurants, and art galleries. Best for casual dining and nightlife.',
    bestFor: 'Casual dinner, coffee, bar hopping',
    topSpots: ['Block 338', 'Coco\'s', 'Mirai', 'Saffron'],
  },
  {
    area: 'Seef Mall Area',
    vibe: 'Family-friendly, variety',
    description: 'Mall dining with everything from fast food to family restaurants.',
    bestFor: 'Families, shopping breaks, variety',
    topSpots: ['Seef Mall food court', 'City Centre restaurants', 'The Avenues'],
  },
  {
    area: 'Bahrain Bay',
    vibe: 'Upscale, waterfront',
    description: 'Home to Four Seasons and high-end waterfront dining with stunning views.',
    bestFor: 'Special occasions, fine dining, sunsets',
    topSpots: ['CUT', 're/Asian', 'Bahrain Bay Kitchen'],
  },
  {
    area: 'Diyar Al Muharraq',
    vibe: 'Waterfront, modern',
    description: 'Home to Marassi Galleria with diverse waterfront dining options and beautiful sea views.',
    bestFor: 'Waterfront dining, family outings, weekend meals',
    topSpots: ['Marassi Galleria restaurants', 'Waterfront cafes', 'Family restaurants'],
  },
  {
    area: 'Juffair',
    vibe: 'International, casual',
    description: 'Expat hub with diverse international options and late-night eats.',
    bestFor: 'Late night, international cuisine, casual',
    topSpots: ['Nando\'s', 'Various cuisines', 'Hotel restaurants'],
  },
];

const budgetGuide = [
  {
    range: 'Budget (Under BD 5)',
    examples: 'Shawarma spots, local cafeterias, mall food courts',
    tips: 'Check out the old souq area for cheap local eats. Al Osra supermarket has great prepared foods.',
  },
  {
    range: 'Mid-Range (BD 5-15)',
    examples: 'Casual restaurants, cafes, most Adliya spots',
    tips: 'Lunch specials offer great value. Many restaurants have business lunch deals.',
  },
  {
    range: 'Premium (BD 15-30)',
    examples: 'Hotel restaurants, upscale casual, specialty cuisines',
    tips: 'Friday brunch offers the best value for premium dining - all-you-can-eat from BD 20-45.',
  },
  {
    range: 'Fine Dining (BD 30+)',
    examples: 'CUT, Bushido, top hotel restaurants',
    tips: 'Special occasion worthy. Book ahead and dress smart casual minimum.',
  },
];

export default function RestaurantsGuidePage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-orange-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Restaurants', url: 'https://www.bahrainnights.com/guides/restaurants' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm font-medium mb-4">
              🍽️ Dining Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best{' '}
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                Restaurants
              </span>
              {' '}in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From world-class fine dining to authentic local gems — Bahrain&apos;s food scene 
              rivals any major city. Discover where to eat for every occasion and budget.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Restaurants', value: '500+', icon: Utensils },
              { label: 'Cuisines', value: '50+', icon: ChefHat },
              { label: 'Fine Dining', value: '30+', icon: Star },
              { label: 'Friday Brunches', value: '40+', icon: Wine },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-orange-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Restaurants */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Top Restaurants</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Our handpicked selection of the best restaurants in Bahrain.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {topRestaurants.map((restaurant) => (
              <div 
                key={restaurant.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold">{restaurant.name}</h3>
                    <p className="text-orange-400 text-sm">{restaurant.cuisine} • {restaurant.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <span className="font-bold">{restaurant.rating}</span>
                    </div>
                    <span className="text-xs text-gray-400">{restaurant.price}</span>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-4">{restaurant.description}</p>
                
                <div className="space-y-2 text-sm mb-4">
                  <p>
                    <strong className="text-orange-400">Must try:</strong>{' '}
                    {restaurant.mustTry.join(', ')}
                  </p>
                  <p>
                    <strong className="text-gray-400">Vibe:</strong>{' '}
                    {restaurant.atmosphere}
                  </p>
                  <p>
                    <strong className="text-gray-400">Reservations:</strong>{' '}
                    {restaurant.reservations}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cuisine Guide */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">By Cuisine</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {cuisineGuide.map((cuisine) => (
              <div key={cuisine.cuisine} className="bg-white/5 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-orange-500/20 rounded-lg">
                    <cuisine.icon className="w-6 h-6 text-orange-400" />
                  </div>
                  <h3 className="text-xl font-bold">{cuisine.cuisine}</h3>
                </div>
                <p className="text-gray-300 mb-4">{cuisine.description}</p>
                <p className="text-sm mb-2">
                  <strong className="text-orange-400">Top picks:</strong>{' '}
                  {cuisine.topPicks.join(', ')}
                </p>
                <p className="text-xs text-gray-400 italic">💡 {cuisine.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dining Areas */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Dining Districts</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Each area has its own dining character. Here&apos;s where to go based on the vibe you want.
          </p>
          
          <div className="space-y-6">
            {diningAreas.map((area) => (
              <div 
                key={area.area}
                className="bg-white/5 rounded-2xl p-6"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-orange-400">{area.area}</h3>
                    <span className="text-sm text-gray-400">{area.vibe}</span>
                    <p className="text-gray-300 mt-2">{area.description}</p>
                  </div>
                  <div className="md:text-right">
                    <p className="text-sm text-gray-400">Best for: {area.bestFor}</p>
                    <p className="text-sm text-orange-400 mt-1">
                      {area.topSpots.join(' • ')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Budget Guide */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Budget Guide</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {budgetGuide.map((budget) => (
              <div key={budget.range} className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl p-5">
                <h3 className="font-bold text-orange-400 mb-2">{budget.range}</h3>
                <p className="text-sm text-gray-300 mb-3">{budget.examples}</p>
                <p className="text-xs text-gray-400 italic">💡 {budget.tips}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-500/20 to-red-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Hungry Yet?</h2>
          <p className="text-gray-300 mb-8">
            Browse our full restaurant directory or check out the best brunches in Bahrain.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/places?category=restaurant"
              className="px-8 py-3 bg-orange-500 hover:bg-orange-400 text-black font-bold rounded-lg transition-colors"
            >
              Browse All Restaurants
            </Link>
            <Link 
              href="/guides/brunches"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              Brunch Guide
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
              { title: 'Best Brunches', href: '/guides/brunches', emoji: '🥂' },
              { title: 'Nightlife Guide', href: '/guides/nightlife', emoji: '🌙' },
              { title: 'Things to Do', href: '/guides/things-to-do', emoji: '🎯' },
              { title: 'Beach Clubs', href: '/guides/beach-clubs', emoji: '🏖️' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group"
              >
                <span className="text-2xl mb-2 block">{guide.emoji}</span>
                <span className="font-medium group-hover:text-orange-400 transition-colors">
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
                q: 'What are the best restaurants in Bahrain for fine dining?',
                a: 'The top fine dining restaurants in Bahrain include CUT by Wolfgang Puck at Four Seasons, Bushido at The Ritz-Carlton, and The Orangery at The Merchant House. These offer exceptional food, service, and ambiance.',
              },
              {
                q: 'Where can I find authentic Bahraini food?',
                a: 'For traditional Bahraini cuisine, visit Saffron by Jena in Adliya, Haji\'s Cafe, or Al Bindaira Cafe. Try dishes like machboos (spiced rice with meat), muhammar, and fresh seafood.',
              },
              {
                q: 'What is Friday brunch in Bahrain?',
                a: 'Friday brunch is a Bahrain institution - elaborate all-you-can-eat buffets at hotels running from around noon to 4 PM. Prices range from BD 20-65 including drinks. It\'s a social event and booking is essential.',
              },
              {
                q: 'Is alcohol available in Bahrain restaurants?',
                a: 'Alcohol is available at licensed venues, primarily hotel restaurants and bars. Many standalone restaurants don\'t serve alcohol. Hotel restaurants typically have full bar service.',
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
            headline: 'Best Restaurants in Bahrain 2026',
            description: 'Complete guide to the best restaurants in Bahrain including fine dining, local cuisine, and budget options.',
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
              '@id': 'https://bahrainnights.com/guides/restaurants',
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
                name: 'What are the best restaurants in Bahrain for fine dining?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The top fine dining restaurants in Bahrain include CUT by Wolfgang Puck at Four Seasons, Bushido at The Ritz-Carlton, and The Orangery at The Merchant House.',
                },
              },
              {
                '@type': 'Question',
                name: 'Where can I find authentic Bahraini food?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'For traditional Bahraini cuisine, visit Saffron by Jena in Adliya, Haji\'s Cafe, or Al Bindaira Cafe.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is Friday brunch in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Friday brunch is an elaborate all-you-can-eat buffet at hotels running from around noon to 4 PM. Prices range from BD 20-65 including drinks.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is alcohol available in Bahrain restaurants?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Alcohol is available at licensed venues, primarily hotel restaurants and bars. Many standalone restaurants don\'t serve alcohol.',
                },
              },
            ],
          }),
        }}
      />

      <InternalLinks
        title="Discover More Dining Options"
        links={[
          { title: 'Best Brunches', href: '/guides/brunches' },
          { title: 'Arabic Restaurants', href: '/guides/arabic-restaurants' },
          { title: 'Indian Restaurants', href: '/guides/indian-restaurants' },
          { title: 'Seafood Restaurants', href: '/guides/seafood-restaurants-bahrain' },
          { title: 'Buffets in Bahrain', href: '/guides/buffets' },
          { title: 'Nightlife Guide', href: '/guides/nightlife' },
          { title: 'Beach Clubs', href: '/guides/beach-clubs' },
          { title: 'Things to Do', href: '/guides/things-to-do' },
        ]}
      />
    </div>
  );
}
