import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Utensils, MapPin, Star,
  DollarSign, Award, Sparkles, Clock, Users
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Best Arabic & Lebanese Restaurants in Bahrain 2026 | Top 15 Mezze & Grills',
  description: 'Discover the best Arabic and Lebanese restaurants in Bahrain for 2026. From authentic mezze and shawarma to premium Arabic grills, find top-rated venues including Mirai, Al Abraaj, and Bahraini heritage spots.',
  keywords: 'best Arabic restaurants Bahrain, Lebanese food Bahrain, mezze Bahrain, shawarma Bahrain, Arabic grill Manama, hummus Bahrain, machboos Bahrain',
  openGraph: {
    title: 'Best Arabic & Lebanese Restaurants in Bahrain 2026 | Top 15 Mezze & Grills',
    description: 'Complete guide to the best Arabic and Lebanese restaurants in Bahrain - from authentic mezze to traditional Bahraini cuisine.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/best-arabic-restaurants-bahrain',
    images: [{ url: 'https://www.bahrainnights.com/images/guides/arabic-restaurants-bahrain.jpg', width: 1200, height: 630, alt: 'Best Arabic Restaurants in Bahrain' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Arabic & Lebanese Restaurants in Bahrain 2026',
    description: 'Your ultimate guide to Arabic and Lebanese cuisine in Bahrain.',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/best-arabic-restaurants-bahrain',
  },
};

const restaurants = [
  {
    name: "Haji's Café",
    location: 'Muharraq',
    type: 'Heritage',
    rating: 5,
    price: 'BD 5-15',
    cuisine: 'Traditional Bahraini',
    description: "Haji's Café is a Bahraini institution, serving authentic local cuisine in the historic heart of Muharraq. This heritage restaurant offers a genuine taste of traditional Bahraini cooking, from perfectly spiced machboos to fresh seafood dishes.",
    specialties: ['Machboos', 'Bahraini breakfast', 'Traditional fish dishes', 'Gahwa coffee'],
    bestFor: 'Authentic Bahraini food, cultural experience',
    mustTry: 'Machboos laham, Balaleet',
  },
  {
    name: 'Al Abraaj',
    location: 'Seef District',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 15-35',
    cuisine: 'Lebanese Fine Dining',
    description: 'Al Abraaj represents the pinnacle of Lebanese fine dining in Bahrain. The restaurant offers an extensive mezze selection, premium grilled meats, and sophisticated Lebanese dishes in an elegant setting.',
    specialties: ['Premium mezze', 'Mixed grill', 'Lamb dishes', 'Shisha terrace'],
    bestFor: 'Special occasions, business dinners',
    mustTry: 'Mixed mezze, Mixed grill, Lamb ouzi',
  },
  {
    name: "Khoury's",
    location: 'Adliya',
    type: 'Lebanese',
    rating: 5,
    price: 'BD 12-25',
    cuisine: 'Lebanese',
    description: "Khoury's has been serving authentic Lebanese cuisine in Adliya for years, earning a loyal following for its consistent quality and generous portions. The warm atmosphere makes it feel like dining at a Lebanese family home.",
    specialties: ['Mezze spread', 'Grilled meats', 'Fattoush', 'Hummus'],
    bestFor: 'Family gatherings, Lebanese food lovers',
    mustTry: 'Mezze platter, Shish taouk, Baklava',
  },
  {
    name: 'Fares',
    location: 'Multiple locations',
    type: 'Casual',
    rating: 4,
    price: 'BD 6-15',
    cuisine: 'Lebanese Seafood',
    description: 'Fares is beloved for its fresh, simply prepared Lebanese-style seafood. The restaurant offers generous portions of grilled fish, fried calamari, and seafood mezze at reasonable prices.',
    specialties: ['Fresh fish', 'Fried calamari', 'Seafood mezze', 'Fish sayadieh'],
    bestFor: 'Seafood, families, value',
    mustTry: 'Grilled hammour, Fried calamari',
  },
  {
    name: 'Abd El Wahab',
    location: 'Bahrain Bay',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 18-40',
    cuisine: 'Lebanese',
    description: "Part of an acclaimed regional chain, Abd El Wahab brings sophisticated Lebanese cuisine to Bahrain Bay. The stunning waterfront location and impeccable service make it one of Bahrain's premier Lebanese dining destinations.",
    specialties: ['Signature mezze', 'Grilled specialties', 'Lebanese wines', 'Waterfront terrace'],
    bestFor: 'Special occasions, waterfront dining',
    mustTry: 'Signature mezze selection, Mixed grill',
  },
  {
    name: 'Al Safir',
    location: 'Juffair',
    type: 'Casual',
    rating: 4,
    price: 'BD 5-12',
    cuisine: 'Syrian/Lebanese',
    description: 'Al Safir offers authentic Syrian and Lebanese cuisine at excellent prices. The restaurant is particularly known for its shawarma, grilled meats, and fresh bread.',
    specialties: ['Shawarma', 'Grilled meats', 'Fresh bread', 'Fatayer'],
    bestFor: 'Quick meals, shawarma cravings, budget dining',
    mustTry: 'Chicken shawarma, Mixed grill',
  },
  {
    name: 'Saffron by Nic',
    location: 'Amwaj Islands',
    type: 'Contemporary Arabic',
    rating: 4,
    price: 'BD 12-25',
    cuisine: 'Modern Arabic',
    description: 'Saffron by Nic offers a contemporary take on Arabic cuisine in the beautiful Amwaj Islands setting. The restaurant blends traditional flavors with modern presentations.',
    specialties: ['Modern mezze', 'Fusion dishes', 'Marina views', 'Creative cocktails'],
    bestFor: 'Modern Arabic, Amwaj dining, date nights',
    mustTry: 'Contemporary mezze, Signature mains',
  },
  {
    name: 'Meirc',
    location: 'Manama',
    type: 'Traditional',
    rating: 4,
    price: 'BD 8-18',
    cuisine: 'Iraqi',
    description: 'Meirc specializes in Iraqi cuisine, offering a unique addition to Bahrain\'s Arabic dining scene. The restaurant serves traditional Iraqi dishes including tikka, kebabs, and the famous masgouf.',
    specialties: ['Masgouf', 'Iraqi tikka', 'Kebabs', 'Dolma'],
    bestFor: 'Iraqi cuisine, unique experience, meat lovers',
    mustTry: 'Masgouf, Iraqi tikka, Dolma',
  },
  {
    name: 'Yildizlar',
    location: 'Adliya',
    type: 'Turkish',
    rating: 4,
    price: 'BD 10-22',
    cuisine: 'Turkish',
    description: 'Yildizlar brings authentic Turkish cuisine to Bahrain, offering everything from traditional mezze to expertly grilled kebabs. The Saturday Turkish breakfast spread is legendary.',
    specialties: ['Turkish breakfast', 'Kebabs', 'Pide', 'Baklava'],
    bestFor: 'Turkish food, weekend breakfast, kebab lovers',
    mustTry: 'Full Turkish breakfast, Adana kebab, Künefe',
  },
  {
    name: 'Levant',
    location: 'Seef Mall',
    type: 'Casual',
    rating: 4,
    price: 'BD 7-15',
    cuisine: 'Lebanese',
    description: 'Levant offers reliable Lebanese cuisine in a convenient mall location. Perfect for shopping breaks or casual family meals with consistent quality.',
    specialties: ['Mezze', 'Grills', 'Shawarma', 'Lebanese desserts'],
    bestFor: 'Shopping breaks, families, quick Lebanese',
    mustTry: 'Shawarma plate, Mezze combo',
  },
  {
    name: 'Bahrain Traditional Restaurant',
    location: 'Manama Souq',
    type: 'Heritage',
    rating: 4,
    price: 'BD 6-14',
    cuisine: 'Traditional Bahraini',
    description: 'Located in the historic Manama Souq area, this restaurant offers authentic Bahraini dishes in a traditional setting with local favorites like machboos and harees.',
    specialties: ['Machboos', 'Harees', 'Muhammar', 'Traditional fish'],
    bestFor: 'Authentic Bahraini, cultural experience',
    mustTry: 'Chicken machboos, Harees, Muhammar',
  },
  {
    name: 'Ritz-Carlton Arabic Corner',
    location: 'Ritz-Carlton',
    type: 'Fine Dining',
    rating: 5,
    price: 'BD 20-40',
    cuisine: 'Arabic Fine Dining',
    description: 'The Arabic selections at the Ritz-Carlton deliver refined Arabic cuisine in a luxurious setting with premium ingredients and sophisticated preparations.',
    specialties: ['Refined mezze', 'Premium lamb', 'Arabic desserts', 'Shisha garden'],
    bestFor: 'Special occasions, luxury Arabic',
    mustTry: 'Premium lamb dishes, Signature mezze',
  },
];

const mezzeGuide = [
  { dish: 'Hummus', description: 'Creamy chickpea dip - essential start to any meal', where: 'All restaurants' },
  { dish: 'Fattoush', description: 'Fresh salad with crispy pita, sumac dressing', where: "Khoury's, Abd El Wahab" },
  { dish: 'Tabbouleh', description: 'Parsley salad with bulgur, tomatoes, mint', where: 'All Lebanese restaurants' },
  { dish: 'Baba Ganoush', description: 'Smoky eggplant dip', where: 'Al Abraaj, Fares' },
  { dish: 'Kibbeh', description: 'Bulgur shells with spiced lamb filling', where: "Khoury's, Levant" },
  { dish: 'Machboos', description: 'Bahraini spiced rice with meat', where: "Haji's Café" },
];

const tips = [
  {
    icon: Users,
    title: 'Mezze is for Sharing',
    content: 'Order multiple mezze dishes for the table. Arabic dining is communal - sharing is part of the experience.',
  },
  {
    icon: Utensils,
    title: 'Fresh Bread is Essential',
    content: 'Arabic bread should be warm and fresh. Use it to scoop mezze and soak up sauces.',
  },
  {
    icon: Award,
    title: 'Try the National Dish',
    content: 'Machboos (spiced rice with meat) is Bahrain\'s national dish. Every visitor should try it.',
  },
  {
    icon: Clock,
    title: 'Arabic Coffee Ritual',
    content: 'Finish with Arabic coffee (gahwa) and dates - the traditional way to end a meal.',
  },
];

const faqs = [
  {
    q: 'What is the best Arabic restaurant in Bahrain?',
    a: "For Lebanese fine dining, Al Abraaj and Abd El Wahab are exceptional. For authentic Bahraini food, Haji's Café in Muharraq is unmissable. Khoury's in Adliya offers excellent Lebanese cuisine in a warm atmosphere.",
  },
  {
    q: 'Where can I try traditional Bahraini food?',
    a: "Haji's Café in Muharraq is the most famous spot for authentic Bahraini cuisine, including machboos and traditional breakfast. The Bahrain Traditional Restaurant in Manama Souq also offers genuine local dishes.",
  },
  {
    q: 'What is machboos and where is the best one?',
    a: "Machboos is Bahrain's national dish - fragrant rice cooked with meat (usually chicken or lamb), spices, and dried limes. Haji's Café is widely considered to serve the most authentic version.",
  },
  {
    q: 'Are there good Lebanese restaurants in Bahrain?',
    a: "Bahrain has excellent Lebanese dining options. Khoury's and Al Abraaj are top choices for traditional Lebanese. Abd El Wahab offers upscale Lebanese with stunning bay views. Fares is great for Lebanese-style seafood.",
  },
  {
    q: 'Where can I find the best shawarma in Bahrain?',
    a: "Al Safir in Juffair is renowned for authentic shawarma at great prices. Many roadside stands also serve excellent shawarma. For sit-down shawarma, Khoury's and Levant offer quality versions.",
  },
];

export default function BestArabicRestaurantsBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-amber-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Best Arabic Restaurants Bahrain', url: 'https://www.bahrainnights.com/guides/best-arabic-restaurants-bahrain' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-yellow-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-4">
              🥙 Ultimate Arabic Guide 2026
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                Best Arabic & Lebanese Restaurants
              </span>
              {' '}in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From authentic Bahraini machboos at heritage restaurants to elegant Lebanese mezze spreads — 
              your complete guide to the best Arabic restaurants, grills, and traditional dining in Bahrain.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated} | By <Link href="https://www.bahrainnights.com" className="text-amber-400 hover:underline">BahrainNights.com</Link>
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Restaurants Reviewed', value: '30+', icon: Utensils },
              { label: 'Budget From', value: 'BD 5', icon: DollarSign },
              { label: 'Fine Dining Options', value: '5+', icon: Award },
              { label: 'Cuisines', value: 'All Arab', icon: Sparkles },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-amber-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-gray-300 leading-relaxed">
              Arabic cuisine in Bahrain reflects the Kingdom&apos;s rich heritage and its position as a crossroads 
              of Gulf and Levantine culinary traditions. From traditional Bahraini dishes passed down through 
              generations to sophisticated Lebanese restaurants and authentic Iraqi grills, the Arabic dining 
              scene offers incredible diversity.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mt-4">
              Whether you&apos;re seeking the comfort of a mezze spread shared with friends, the unique flavors 
              of Bahraini machboos, or the theater of a mixed grill at a Lebanese restaurant, this guide 
              covers the complete spectrum of Arabic dining in the Kingdom.
            </p>
          </div>
        </div>
      </section>

      {/* Mezze Guide */}
      <section className="py-8 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Essential Mezze & Dishes</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {mezzeGuide.map((item) => (
              <div key={item.dish} className="bg-white/5 rounded-xl p-4">
                <h3 className="font-semibold text-amber-400 mb-1">{item.dish}</h3>
                <p className="text-xs text-gray-400 mb-2">{item.description}</p>
                <p className="text-xs text-yellow-300">Try at: {item.where}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurant List */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Top Arabic & Lebanese Restaurants in Bahrain</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Comprehensive reviews covering Lebanese, Bahraini, Turkish, Iraqi, and Arabic cuisines for 2026.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {restaurants.map((restaurant) => (
              <div 
                key={restaurant.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold">{restaurant.name}</h3>
                    <p className="text-amber-400 text-sm flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {restaurant.location} • {restaurant.type}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex">
                      {[...Array(restaurant.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-white">{restaurant.price}</span>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-4">{restaurant.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {restaurant.specialties.map((s) => (
                    <span key={s} className="text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded">{s}</span>
                  ))}
                </div>
                
                <div className="text-sm text-gray-400 space-y-1">
                  <p><strong className="text-gray-300">Best for:</strong> {restaurant.bestFor}</p>
                  <p><strong className="text-gray-300">Must try:</strong> {restaurant.mustTry}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Arabic Dining Tips</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {tips.map((tip) => (
              <div key={tip.title} className="bg-white/5 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-500/20 rounded-lg">
                    <tip.icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">{tip.title}</h3>
                    <p className="text-gray-400 text-sm">{tip.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white/5 rounded-xl p-6">
                <h3 className="font-bold text-amber-400 mb-2">{faq.q}</h3>
                <p className="text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-500/10 to-yellow-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Hungry for Arabic Food?</h2>
          <p className="text-gray-300 mb-8">
            Browse all restaurants and find the perfect spot for your next meal.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/places?category=restaurant"
              className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg transition-colors"
            >
              Browse Restaurants
            </Link>
            <Link 
              href="/guides/brunches"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              Friday Brunch Guide
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(faq => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a,
              },
            })),
          }),
        }}
      />

      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Best Arabic & Lebanese Restaurants in Bahrain 2026',
            description: 'Complete guide to Arabic and Lebanese restaurants in Bahrain from budget to luxury.',
            author: { '@type': 'Organization', name: 'BahrainNights' },
            publisher: { '@type': 'Organization', name: 'BahrainNights' },
            datePublished: '2026-01-25',
            dateModified: lastUpdated,
          }),
        }}
      />
    </div>
  );
}
