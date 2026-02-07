import { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { 
  MapPin, Star, Clock, DollarSign, Utensils, Coffee, Wine,
  Fish, Beef, Salad, Pizza, ChefHat, Heart, ArrowRight, 
  Flame, Sparkles, Globe, Users, Calendar
} from 'lucide-react';

// SEO Optimized Metadata
export const metadata: Metadata = {
  title: 'Best Restaurants in Bahrain (2026) — Complete Dining Guide | BahrainNights',
  description: 'Discover the best restaurants in Bahrain for 2026! From fine dining and seafood to brunches and hidden gems. Curated guide with reviews, prices, and booking tips.',
  keywords: [
    'best restaurants Bahrain', 'restaurants in Bahrain', 'Bahrain dining guide',
    'where to eat Bahrain', 'Bahrain food guide', 'top restaurants Bahrain 2026',
    'fine dining Bahrain', 'seafood Bahrain', 'brunch Bahrain',
    'Arabic restaurants Bahrain', 'Indian restaurants Bahrain', 'Italian restaurants Bahrain',
    'Bahrain restaurant reviews', 'Manama restaurants', 'Juffair restaurants'
  ].join(', '),
  alternates: {
    canonical: 'https://www.bahrainnights.com/best-restaurants-bahrain',
  },
  openGraph: {
    title: 'Best Restaurants in Bahrain (2026) — Complete Dining Guide',
    description: 'Your ultimate guide to dining in Bahrain. From 5-star restaurants to local gems, discover where to eat.',
    url: 'https://www.bahrainnights.com/best-restaurants-bahrain',
    siteName: 'BahrainNights',
    images: [
      {
        url: 'https://www.bahrainnights.com/og-restaurants.jpg',
        width: 1200,
        height: 630,
        alt: 'Best Restaurants in Bahrain',
      },
    ],
    type: 'article',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Restaurants in Bahrain (2026)',
    description: 'Complete dining guide - fine dining, brunch, seafood & more!',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

interface Restaurant {
  id: string;
  name: string;
  slug: string;
  category: string;
  cuisine: string;
  area: string;
  rating: number;
  price_range: string;
  image_url: string;
}

async function getFeaturedRestaurants(): Promise<Restaurant[]> {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { data } = await supabase
      .from('venues')
      .select('id, name, slug, category, cuisine, area, rating, price_range, image_url')
      .in('category', ['restaurant', 'fine-dining', 'casual-dining', 'cafe'])
      .eq('status', 'approved')
      .order('rating', { ascending: false })
      .limit(12);
    return data || [];
  } catch {
    return [];
  }
}

// JSON-LD Schema
function generateSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': 'https://www.bahrainnights.com/best-restaurants-bahrain#article',
        headline: 'Best Restaurants in Bahrain — Complete Dining Guide 2026',
        description: 'Discover the best restaurants in Bahrain. From fine dining and seafood to brunches and local gems.',
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
        name: 'Best Restaurants in Bahrain',
        itemListOrder: 'https://schema.org/ItemListOrderDescending',
        numberOfItems: 30,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'CUT by Wolfgang Puck', description: 'Premium steakhouse at Four Seasons' },
          { '@type': 'ListItem', position: 2, name: 'La Mer', description: 'Upscale seafood at Ritz-Carlton' },
          { '@type': 'ListItem', position: 3, name: 'Bushido', description: 'Japanese fine dining' },
          { '@type': 'ListItem', position: 4, name: 'Masso', description: 'Italian excellence at Four Seasons' },
          { '@type': 'ListItem', position: 5, name: 'Takht Jamsheed', description: 'Persian fine dining' },
        ]
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.bahrainnights.com' },
          { '@type': 'ListItem', position: 2, name: 'Best Restaurants Bahrain', item: 'https://www.bahrainnights.com/best-restaurants-bahrain' }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What are the best fine dining restaurants in Bahrain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The best fine dining restaurants in Bahrain include CUT by Wolfgang Puck at Four Seasons, La Mer at Ritz-Carlton, Bushido for Japanese cuisine, Masso for Italian, and Plums at Gulf Hotel. Expect to pay 30-60 BHD per person.'
            }
          },
          {
            '@type': 'Question',
            name: 'Where can I find the best brunch in Bahrain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The best brunches in Bahrain are at Gulf Hotel (award-winning Al Waha brunch), Four Seasons, Ritz-Carlton, and Jumeirah. Friday brunches typically cost 25-50 BHD and include unlimited food and drinks.'
            }
          }
        ]
      }
    ]
  };
}

const restaurantCategories = [
  {
    title: 'Fine Dining',
    icon: ChefHat,
    color: 'from-amber-500 to-orange-600',
    description: 'Exceptional cuisine, impeccable service, and memorable atmospheres',
    restaurants: [
      { name: 'CUT by Wolfgang Puck', cuisine: 'American Steakhouse', location: 'Four Seasons', price: '$$$$', rating: 4.8, desc: 'Celebrity chef steakhouse with dry-aged cuts, stunning views, and impeccable service. The wagyu and USDA prime steaks are legendary.', specialties: ['Dry-aged Ribeye', 'Bone-in Filet', 'Truffle Mac & Cheese'], link: '/restaurants' },
      { name: 'La Mer', cuisine: 'French Seafood', location: 'Ritz-Carlton', price: '$$$$', rating: 4.7, desc: 'Elegant waterfront restaurant serving the finest Mediterranean seafood. The oyster bar and whole fish preparations are outstanding.', specialties: ['Lobster Thermidor', 'Dover Sole', 'Seafood Tower'], link: '/restaurants' },
      { name: 'Bushido', cuisine: 'Japanese', location: 'Ritz-Carlton', price: '$$$$', rating: 4.7, desc: 'Sophisticated Japanese restaurant with sushi bar, teppanyaki, and robata grill. Stunning ambiance and sake selection.', specialties: ['Omakase', 'Wagyu Tataki', 'Black Cod Miso'], link: '/restaurants' },
      { name: 'Masso', cuisine: 'Italian', location: 'Four Seasons', price: '$$$$', rating: 4.6, desc: 'Modern Italian cuisine with homemade pastas and wood-fired specialties. Beautiful terrace overlooking Bahrain Bay.', specialties: ['Truffle Pasta', 'Grilled Octopus', 'Tiramisu'], link: '/restaurants' },
      { name: 'Plums', cuisine: 'Continental', location: 'Gulf Hotel', price: '$$$$', rating: 4.5, desc: 'Award-winning restaurant known for its Sunday roast and sophisticated Continental cuisine.', specialties: ['Beef Wellington', 'Rack of Lamb', 'Crème Brûlée'], link: '/restaurants' },
      { name: 'Takht Jamsheed', cuisine: 'Persian', location: 'Gulf Hotel', price: '$$$', rating: 4.6, desc: 'Elegant Persian fine dining with live music. Traditional recipes prepared with premium ingredients.', specialties: ['Lamb Shank', 'Zereshk Polo', 'Koobideh'], link: '/restaurants' },
    ]
  },
  {
    title: 'Seafood',
    icon: Fish,
    color: 'from-cyan-500 to-blue-600',
    description: 'Fresh catches from the Arabian Gulf and beyond',
    restaurants: [
      { name: 'Fish Market', cuisine: 'Seafood', location: 'Multiple Locations', price: '$$$', rating: 4.5, desc: 'Interactive dining experience where you choose your fresh catch and cooking style. Fun and delicious.', specialties: ['Market Fresh Fish', 'Grilled Prawns', 'Crab'], link: '/restaurants' },
      { name: 'Lanterns', cuisine: 'Seafood', location: 'Budaiya', price: '$$', rating: 4.4, desc: 'Seaside restaurant famous for traditional Bahraini-style grilled fish. Casual atmosphere with stunning sunset views.', specialties: ['Hammour', 'King Fish', 'Machboos'], link: '/restaurants' },
      { name: 'Furn Bistro & Bakery', cuisine: 'Mediterranean', location: 'Adliya', price: '$$', rating: 4.5, desc: 'Charming bistro known for fresh salads, seafood dishes, and artisanal breads.', specialties: ['Salmon Tartare', 'Sea Bass', 'Fresh Breads'], link: '/restaurants' },
      { name: 'Mirai', cuisine: 'Japanese', location: 'Seef', price: '$$$', rating: 4.4, desc: 'Contemporary Japanese restaurant with exceptional sushi and sashimi from premium imported fish.', specialties: ['Sushi Platter', 'Salmon Tataki', 'Tempura'], link: '/restaurants' },
    ]
  },
  {
    title: 'Steakhouses',
    icon: Beef,
    color: 'from-red-500 to-rose-600',
    description: 'Premium cuts and grilled perfection',
    restaurants: [
      { name: 'Nusr-Et', cuisine: 'Turkish Steakhouse', location: 'Marassi', price: '$$$$', rating: 4.6, desc: 'Salt Bae\'s famous steakhouse with theatrical service and premium meats. An experience as much as a meal.', specialties: ['Tomahawk', 'Golden Tomahawk', 'Ottoman Steak'], link: '/restaurants' },
      { name: 'The Meat Co', cuisine: 'South African', location: 'City Centre', price: '$$$', rating: 4.3, desc: 'Premium South African steakhouse with aged meats and robust flavors. Great wine selection.', specialties: ['Fillet Steak', 'Lamb Chops', 'Beef Ribs'], link: '/restaurants' },
      { name: 'Gaucho', cuisine: 'Argentinian', location: 'Adliya', price: '$$$', rating: 4.4, desc: 'Authentic Argentinian grill with premium beef imported from the Pampas. Vibrant atmosphere.', specialties: ['Ribeye', 'Chorizo', 'Dulce de Leche'], link: '/restaurants' },
      { name: 'Prime US', cuisine: 'American', location: 'Seef', price: '$$$', rating: 4.3, desc: 'Classic American steakhouse with USDA Prime cuts. Great for business dinners.', specialties: ['NY Strip', 'Porterhouse', 'Creamed Spinach'], link: '/restaurants' },
    ]
  },
  {
    title: 'Arabic & Middle Eastern',
    icon: Globe,
    color: 'from-amber-600 to-yellow-500',
    description: 'Authentic flavors from the region',
    restaurants: [
      { name: 'Haji\'s Café', cuisine: 'Bahraini', location: 'Muharraq', price: '$', rating: 4.7, desc: 'Legendary local spot for authentic Bahraini breakfast. A must-visit for cultural food experience.', specialties: ['Balaleet', 'Khameer', 'Chai Haleeb'], link: '/restaurants' },
      { name: 'Bahraini Heritage', cuisine: 'Bahraini', location: 'Budaiya', price: '$$', rating: 4.5, desc: 'Traditional Bahraini cuisine in a heritage house setting. Perfect for experiencing local culture.', specialties: ['Machboos', 'Harees', 'Muhammar'], link: '/restaurants' },
      { name: 'Al Abraaj', cuisine: 'Lebanese', location: 'Adliya', price: '$$', rating: 4.4, desc: 'Popular Lebanese restaurant with generous portions and authentic flavors.', specialties: ['Mixed Grill', 'Moutabal', 'Fattoush'], link: '/restaurants' },
      { name: 'Zafran', cuisine: 'Indian', location: 'Multiple Locations', price: '$$', rating: 4.5, desc: 'Award-winning Indian restaurant with tandoor specialties and rich curries.', specialties: ['Butter Chicken', 'Lamb Biryani', 'Naan'], link: '/guides/indian-restaurants' },
      { name: 'Shogun', cuisine: 'Turkish', location: 'Juffair', price: '$$', rating: 4.3, desc: 'Authentic Turkish cuisine with kebabs, pides, and traditional desserts.', specialties: ['Adana Kebab', 'Iskender', 'Baklava'], link: '/restaurants' },
      { name: 'Al Safir', cuisine: 'Arabian', location: 'Manama', price: '$$', rating: 4.4, desc: 'Upscale Arabian restaurant with stunning décor and live entertainment.', specialties: ['Lamb Ouzi', 'Grilled Prawns', 'Um Ali'], link: '/restaurants' },
    ]
  },
  {
    title: 'International',
    icon: Globe,
    color: 'from-purple-500 to-pink-600',
    description: 'Global flavors from around the world',
    restaurants: [
      { name: 'The Orangery', cuisine: 'Mediterranean', location: 'Adliya', price: '$$', rating: 4.5, desc: 'Beautiful garden restaurant perfect for brunch and Mediterranean fare. Instagram-worthy ambiance.', specialties: ['Avocado Toast', 'Shakshuka', 'Grilled Halloumi'], link: '/restaurants' },
      { name: 'PF Chang\'s', cuisine: 'Asian', location: 'City Centre', price: '$$', rating: 4.2, desc: 'Reliable Asian bistro with consistent quality and great sharing platters.', specialties: ['Lettuce Wraps', 'Orange Chicken', 'Pad Thai'], link: '/restaurants' },
      { name: 'Texas Roadhouse', cuisine: 'American', location: 'Seef', price: '$$', rating: 4.3, desc: 'Fun American restaurant with hand-cut steaks and legendary rolls.', specialties: ['Ribeye', 'Fall-Off Ribs', 'Honey Butter Rolls'], link: '/restaurants' },
      { name: 'Segafredo', cuisine: 'Italian', location: 'Adliya', price: '$$', rating: 4.4, desc: 'Trendy Italian café and restaurant. Great for people-watching in Adliya.', specialties: ['Wood-fired Pizza', 'Pasta', 'Italian Coffee'], link: '/restaurants' },
      { name: 'Calexico', cuisine: 'Mexican', location: 'Amwaj', price: '$$', rating: 4.5, desc: 'Vibrant Mexican restaurant with authentic recipes and great margaritas.', specialties: ['Tacos', 'Burritos', 'Guacamole'], link: '/restaurants' },
    ]
  },
  {
    title: 'Brunch Spots',
    icon: Coffee,
    color: 'from-orange-500 to-amber-500',
    description: 'Friday brunches are a Gulf tradition',
    restaurants: [
      { name: 'Al Waha - Gulf Hotel', cuisine: 'International Brunch', location: 'Gulf Hotel', price: '$$$', rating: 4.8, desc: 'The most famous Friday brunch in Bahrain. Multiple live cooking stations, endless seafood, and free-flowing drinks.', specialties: ['Seafood Station', 'Live Cooking', 'Dessert Room'], link: '/guides/brunch' },
      { name: 'Bay View - Four Seasons', cuisine: 'International Brunch', location: 'Four Seasons', price: '$$$$', rating: 4.7, desc: 'Elegant brunch with stunning bay views. Premium quality and sophisticated atmosphere.', specialties: ['Champagne Brunch', 'Sushi Bar', 'Carving Station'], link: '/guides/brunch' },
      { name: 'La Med - Ritz-Carlton', cuisine: 'Mediterranean Brunch', location: 'Ritz-Carlton', price: '$$$', rating: 4.6, desc: 'Mediterranean-focused brunch with outdoor seating by the pool. Family-friendly.', specialties: ['Mezze', 'Grilled Meats', 'Mediterranean'], link: '/guides/brunch' },
      { name: 'Choices - InterContinental', cuisine: 'International Brunch', location: 'InterContinental', price: '$$$', rating: 4.5, desc: 'Vast selection with themed food stations. Great value for money.', specialties: ['Asian Station', 'BBQ', 'Desserts'], link: '/guides/brunch' },
    ]
  },
  {
    title: 'Cafés & Casual',
    icon: Coffee,
    color: 'from-green-500 to-emerald-600',
    description: 'Perfect for coffee, light meals, and catching up',
    restaurants: [
      { name: '198 Cafe', cuisine: 'Café', location: 'Manama', price: '$$', rating: 4.6, desc: 'Trendy specialty coffee shop with artisanal brews and healthy bites. Great for remote work.', specialties: ['Pour Over', 'Avocado Toast', 'Smoothie Bowls'], link: '/guides/cafes' },
      { name: 'Crust & Crema', cuisine: 'Bakery Café', location: 'Adliya', price: '$$', rating: 4.5, desc: 'Artisanal bakery with fresh breads, pastries, and excellent breakfast options.', specialties: ['Croissants', 'Sourdough', 'Eggs Benedict'], link: '/guides/cafes' },
      { name: 'Lilou', cuisine: 'French Café', location: 'Adliya', price: '$$', rating: 4.5, desc: 'Charming French café with authentic pastries and all-day breakfast. A local favorite.', specialties: ['French Toast', 'Crêpes', 'Macarons'], link: '/guides/cafes' },
      { name: 'Meisei', cuisine: 'Japanese Café', location: 'Seef', price: '$$', rating: 4.4, desc: 'Unique Japanese café experience with matcha drinks and Japanese desserts.', specialties: ['Matcha Latte', 'Japanese Cheesecake', 'Mochi'], link: '/guides/cafes' },
      { name: 'The Daily Grind', cuisine: 'Café', location: 'Multiple', price: '$', rating: 4.3, desc: 'Popular local chain with reliable coffee and quick bites. Great for grab-and-go.', specialties: ['Latte', 'Sandwiches', 'Muffins'], link: '/guides/cafes' },
    ]
  },
  {
    title: 'Late Night & After Hours',
    icon: Wine,
    color: 'from-indigo-500 to-violet-600',
    description: 'When hunger strikes after midnight',
    restaurants: [
      { name: 'Block 338', cuisine: 'Various', location: 'Adliya', price: '$$', rating: 4.4, desc: 'Trendy destination with multiple restaurants and bars. Open late every night.', specialties: ['Various Cuisines', 'Cocktails', 'Shisha'], link: '/lounges-bars' },
      { name: 'Bahrain Bay Kitchen', cuisine: 'International', location: 'Four Seasons', price: '$$$', rating: 4.5, desc: '24-hour restaurant at Four Seasons. Perfect for late-night cravings.', specialties: ['All-Day Dining', 'Room Service Quality', 'Night Menu'], link: '/restaurants' },
      { name: 'Al Bandar', cuisine: 'Fast Casual', location: 'Juffair', price: '$', rating: 4.2, desc: 'Late-night spot popular after clubbing. Shawarma and grill favorites.', specialties: ['Shawarma', 'Mixed Grill', 'Hummus'], link: '/restaurants' },
      { name: 'Lulu Hypermarket Food Court', cuisine: 'Various', location: 'Multiple', price: '$', rating: 4.0, desc: 'Budget-friendly option open until midnight. Various cuisines under one roof.', specialties: ['Indian', 'Filipino', 'Arabic'], link: '/restaurants' },
    ]
  }
];

const priceGuide = [
  { symbol: '$', range: 'Under 10 BHD', desc: 'Budget-friendly meals' },
  { symbol: '$$', range: '10-25 BHD', desc: 'Mid-range dining' },
  { symbol: '$$$', range: '25-50 BHD', desc: 'Upscale restaurants' },
  { symbol: '$$$$', range: '50+ BHD', desc: 'Fine dining' },
];

export default async function RestaurantsPage() {
  const featuredRestaurants = await getFeaturedRestaurants();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSchema()) }}
      />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/30 to-red-900/30" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/20 rounded-full blur-3xl" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <nav className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li>/</li>
                <li className="text-white">Best Restaurants Bahrain</li>
              </ol>
            </nav>

            <div className="text-center">
              <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full text-orange-300 text-sm mb-4">
                🍽️ Curated for 2026
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-orange-200 to-red-200 bg-clip-text text-transparent">
                Best Restaurants in Bahrain
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                From Michelin-quality fine dining to beloved local gems, discover where to eat in Bahrain. 
                Our curated guide covers every cuisine, budget, and occasion.
              </p>
              
              <div className="flex flex-wrap justify-center gap-8 mt-10">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400">50+</div>
                  <div className="text-sm text-gray-400">Restaurants</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400">8</div>
                  <div className="text-sm text-gray-400">Categories</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-400">All</div>
                  <div className="text-sm text-gray-400">Budgets</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Price Guide */}
        <section className="py-8 px-4 border-y border-gray-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-semibold text-center mb-6">Price Guide (per person)</h2>
            <div className="flex flex-wrap justify-center gap-6">
              {priceGuide.map((p) => (
                <div key={p.symbol} className="text-center">
                  <div className="text-2xl font-bold text-amber-400">{p.symbol}</div>
                  <div className="text-sm text-white">{p.range}</div>
                  <div className="text-xs text-gray-400">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Category Navigation */}
        <section className="py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3">
              {restaurantCategories.map((cat) => (
                <a
                  key={cat.title}
                  href={`#${cat.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`px-4 py-2 rounded-full bg-gradient-to-r ${cat.color} text-white text-sm font-medium hover:opacity-90 transition flex items-center gap-2`}
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.title}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
            <h2 className="text-3xl font-bold text-white mb-6">Dining in Bahrain</h2>
            <p className="text-gray-300 leading-relaxed">
              Bahrain's dining scene is remarkably diverse for such a small island. From celebrity chef restaurants 
              at world-class hotels to hidden local gems serving generations-old recipes, the Kingdom offers 
              something for every palate and budget.
            </p>
            <p className="text-gray-300 leading-relaxed">
              The restaurant culture here blends Gulf hospitality with international influences. You'll find 
              <strong> authentic Bahraini cuisine</strong> alongside Lebanese, Indian, Japanese, and European options. 
              Friday brunches are legendary, late-night dining is the norm, and the waterfront restaurants 
              offer stunning views of the Arabian Gulf.
            </p>
            <p className="text-gray-300 leading-relaxed">
              This guide organizes the best restaurants by category, with honest reviews and insider tips 
              to help you make the perfect choice for any occasion.
            </p>
          </div>
        </section>

        {/* Restaurant Categories */}
        {restaurantCategories.map((category) => (
          <section 
            key={category.title} 
            id={category.title.toLowerCase().replace(/\s+/g, '-')}
            className="py-16 px-4"
          >
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color}`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">{category.title}</h2>
                  <p className="text-gray-400">{category.description}</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                {category.restaurants.map((restaurant) => (
                  <Link 
                    key={restaurant.name} 
                    href={restaurant.link}
                    className="group p-6 bg-gray-800/50 hover:bg-gray-800 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-white group-hover:text-orange-300 transition">
                          {restaurant.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                          <span>{restaurant.cuisine}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {restaurant.location}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-amber-400">
                          <Star className="w-4 h-4 fill-amber-400" />
                          <span className="font-semibold">{restaurant.rating}</span>
                        </div>
                        <div className="text-orange-400 font-semibold">{restaurant.price}</div>
                      </div>
                    </div>
                    
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{restaurant.desc}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {restaurant.specialties.map((spec) => (
                        <span key={spec} className="px-2 py-1 bg-gray-700/50 rounded-full text-xs text-gray-300">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* FAQ Section */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-10">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">What are the best fine dining restaurants in Bahrain?</h3>
                <p className="text-gray-300">
                  The best fine dining restaurants include CUT by Wolfgang Puck at Four Seasons, La Mer at Ritz-Carlton, 
                  Bushido for Japanese, Masso for Italian, and Plums at Gulf Hotel. Expect to pay 30-60 BHD per person.
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Where can I find the best brunch in Bahrain?</h3>
                <p className="text-gray-300">
                  The best Friday brunches are at Gulf Hotel (Al Waha - the most famous), Four Seasons, Ritz-Carlton, 
                  and InterContinental. Brunches typically cost 25-50 BHD and include unlimited food and drinks.
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Where should I eat traditional Bahraini food?</h3>
                <p className="text-gray-300">
                  For authentic Bahraini cuisine, visit Haji's Café in Muharraq for breakfast, Bahraini Heritage in Budaiya, 
                  or the seafood restaurants along Budaiya road. Try machboos (spiced rice with meat), harees, and muhammar.
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Do I need reservations for restaurants in Bahrain?</h3>
                <p className="text-gray-300">
                  For fine dining and popular brunch spots, reservations are essential, especially on weekends. 
                  Mid-range restaurants usually don't require bookings except on Thursday/Friday nights.
                </p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Is alcohol available in Bahrain restaurants?</h3>
                <p className="text-gray-300">
                  Alcohol is served at licensed venues, primarily in hotels and select standalone restaurants. 
                  Most fine dining restaurants have full bar service. Local restaurants typically don't serve alcohol.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Guides */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-10">More Dining Guides</h2>
            
            <div className="grid md:grid-cols-4 gap-4">
              <Link href="/guides/brunch" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition text-center group">
                <Coffee className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                <h3 className="font-semibold text-white group-hover:text-orange-300">Brunches</h3>
                <p className="text-sm text-gray-400 mt-2">Friday brunch guide</p>
              </Link>
              
              <Link href="/guides/cafes" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition text-center group">
                <Coffee className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <h3 className="font-semibold text-white group-hover:text-green-300">Cafés</h3>
                <p className="text-sm text-gray-400 mt-2">Coffee & light bites</p>
              </Link>
              
              <Link href="/guides/seafood" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition text-center group">
                <Fish className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                <h3 className="font-semibold text-white group-hover:text-cyan-300">Seafood</h3>
                <p className="text-sm text-gray-400 mt-2">Fresh from the Gulf</p>
              </Link>
              
              <Link href="/guides/indian-restaurants" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition text-center group">
                <Flame className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                <h3 className="font-semibold text-white group-hover:text-amber-300">Indian</h3>
                <p className="text-sm text-gray-400 mt-2">Curries & tandoor</p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-orange-900/30 to-red-900/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Eat?</h2>
            <p className="text-gray-300 text-lg mb-8">
              Explore our full restaurant directory with reviews, photos, and contact information.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/restaurants"
                className="px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 rounded-full text-white font-semibold hover:opacity-90 transition"
              >
                Browse All Restaurants
              </Link>
              <Link 
                href="/guides/brunch"
                className="px-8 py-4 bg-gray-800 rounded-full text-white font-semibold hover:bg-gray-700 transition"
              >
                Friday Brunch Guide
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
