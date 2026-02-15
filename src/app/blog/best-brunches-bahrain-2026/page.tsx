import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Coffee, MapPin, Star, Clock, ArrowRight, Sparkles,
  Wine, Users, ChefHat, Sun, UtensilsCrossed, Music,
  Heart, DollarSign, Calendar, ChevronRight, Waves, Palmtree
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Brunches in Bahrain 2026 — Friday Brunch Guide | BahrainNights',
  description: 'Discover the best Friday brunches in Bahrain for 2026. From luxury hotel buffets to casual café brunch spots. Complete guide with prices, packages, and booking tips.',
  keywords: [
    'best brunch Bahrain 2026', 'Friday brunch Bahrain', 'Bahrain brunch guide',
    'hotel brunch Bahrain', 'brunch with pool Bahrain', 'family brunch Bahrain',
    'unlimited brunch Bahrain', 'brunch buffet Bahrain', 'Gulf Hotel brunch',
    'Four Seasons brunch Bahrain', 'Ritz Carlton brunch Bahrain'
  ].join(', '),
  alternates: {
    canonical: 'https://www.bahrainnights.com/blog/best-brunches-bahrain-2026',
  },
  openGraph: {
    title: 'Best Brunches in Bahrain 2026 — Friday Brunch Guide',
    description: 'Your complete guide to the best Friday brunches in Bahrain.',
    url: 'https://www.bahrainnights.com/blog/best-brunches-bahrain-2026',
    siteName: 'BahrainNights',
    images: [
      {
        url: 'https://www.bahrainnights.com/og-brunch-guide-2026.jpg',
        width: 1200,
        height: 630,
        alt: 'Best Brunches Bahrain 2026',
      },
    ],
    type: 'article',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Brunches in Bahrain 2026',
    description: 'The ultimate Friday brunch guide!',
  },
  authors: [{ name: 'BahrainNights Team' }],
  robots: {
    index: true,
    follow: true,
  },
};

function generateSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'Best Brunches in Bahrain 2026 — Friday Brunch Guide',
        description: 'Your complete guide to the best Friday brunches in Bahrain.',
        image: 'https://www.bahrainnights.com/og-brunch-guide-2026.jpg',
        author: {
          '@type': 'Organization',
          name: 'BahrainNights Team',
          url: 'https://www.bahrainnights.com'
        },
        publisher: {
          '@type': 'Organization',
          name: 'BahrainNights',
          logo: {
            '@type': 'ImageObject',
            url: 'https://www.bahrainnights.com/logo.png'
          }
        },
        datePublished: '2026-01-01',
        dateModified: '2026-02-15',
        mainEntityOfPage: 'https://www.bahrainnights.com/blog/best-brunches-bahrain-2026'
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is the best brunch in Bahrain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The Gulf Hotel\'s Brunch at Al Waha is consistently rated the best brunch in Bahrain, offering exceptional variety, quality, and value. The Four Seasons and Ritz-Carlton also offer premium brunch experiences.'
            }
          },
          {
            '@type': 'Question',
            name: 'How much does brunch cost in Bahrain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Brunch prices in Bahrain range from BHD 15-25 for soft drinks packages to BHD 35-65 for premium packages with beverages. Family brunches typically range BHD 20-35 per adult with discounts for children.'
            }
          },
          {
            '@type': 'Question',
            name: 'What time is Friday brunch in Bahrain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Most Friday brunches run from 12:30 PM to 4:00 PM. Some venues offer extended hours until 5 PM or have after-brunch parties. Saturday brunches are also popular at many venues.'
            }
          },
          {
            '@type': 'Question',
            name: 'Do I need to book brunch in Bahrain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, booking is highly recommended for popular brunches, especially at five-star hotels. Some venues like the Gulf Hotel sell out weeks in advance. Book directly with the hotel or through their website.'
            }
          }
        ]
      }
    ]
  };
}

const premiumBrunches = [
  {
    name: 'Al Waha Brunch',
    hotel: 'Gulf Hotel',
    desc: 'Bahrain\'s most legendary brunch. Multiple live cooking stations, seafood tower, sushi bar, BBQ, and an incredible dessert spread. The standard against which all others are measured.',
    price: { soft: 'BHD 32', house: 'BHD 45', premium: 'BHD 55' },
    rating: 5,
    highlights: ['Seafood tower', '12+ live stations', 'Kids area', 'Pool access'],
    time: '12:30 PM - 4:00 PM',
    bestFor: 'Groups, special occasions'
  },
  {
    name: 'CUT Brunch',
    hotel: 'Four Seasons',
    desc: 'Sophisticated brunch at Wolfgang Puck\'s steakhouse. Premium meats, elegant presentations, and stunning bay views. More refined than massive buffets.',
    price: { soft: 'BHD 38', house: 'BHD 52', premium: 'BHD 65' },
    rating: 5,
    highlights: ['Premium steaks', 'Bay views', 'Intimate setting', 'Craft cocktails'],
    time: '1:00 PM - 4:00 PM',
    bestFor: 'Couples, foodies'
  },
  {
    name: 'La Mer Brunch',
    hotel: 'Ritz-Carlton',
    desc: 'French Mediterranean brunch by the marina. Exceptional seafood, live oyster bar, and elegant ambiance. One of Bahrain\'s most refined brunch experiences.',
    price: { soft: 'BHD 35', house: 'BHD 48', premium: 'BHD 58' },
    rating: 5,
    highlights: ['Seafood focus', 'Marina views', 'French cuisine', 'Live music'],
    time: '12:30 PM - 4:00 PM',
    bestFor: 'Romantic brunches, seafood lovers'
  },
  {
    name: 'The Orangery Brunch',
    hotel: 'InterContinental',
    desc: 'Garden setting with excellent variety. Known for their roast carvery, Asian stations, and impressive selection. Great value for quality.',
    price: { soft: 'BHD 28', house: 'BHD 40', premium: 'BHD 48' },
    rating: 4,
    highlights: ['Garden setting', 'Carvery station', 'Asian cuisine', 'Good value'],
    time: '12:30 PM - 4:00 PM',
    bestFor: 'Families, value seekers'
  },
  {
    name: 'Elements Brunch',
    hotel: 'Four Seasons',
    desc: 'Poolside brunch with beach club vibes. Multiple cuisines, DJ, and the option to continue by the pool. Transitions nicely into afternoon drinks.',
    price: { soft: 'BHD 35', house: 'BHD 48', premium: 'BHD 60' },
    rating: 4,
    highlights: ['Pool access', 'DJ', 'Beach vibes', 'After-brunch party'],
    time: '1:00 PM - 5:00 PM',
    bestFor: 'Young professionals, groups'
  },
  {
    name: 'Thai Lounge Brunch',
    hotel: 'ART Rotana',
    desc: 'Authentic Thai brunch with unlimited dishes. More focused menu than hotel buffets but exceptional quality. Great for Thai food enthusiasts.',
    price: { soft: 'BHD 25', house: 'BHD 38' },
    rating: 4,
    highlights: ['Authentic Thai', 'Made to order', 'Intimate', 'Consistent quality'],
    time: '12:30 PM - 4:00 PM',
    bestFor: 'Thai food lovers'
  },
];

const familyBrunches = [
  {
    name: 'Family Brunch at Al Waha',
    hotel: 'Gulf Hotel',
    kids: 'Dedicated kids zone, entertainment, special menu',
    price: 'BHD 32 adults / BHD 16 kids (6-12) / Free under 6',
    highlights: ['Kids club', 'Pool access', 'Family tables']
  },
  {
    name: 'Bahrain Bay Kitchen',
    hotel: 'Four Seasons',
    kids: 'Kids corner, healthy options, high chairs',
    price: 'BHD 30 adults / BHD 15 kids',
    highlights: ['Kid-friendly', 'All-day dining', 'Casual vibe']
  },
  {
    name: 'Primavera Brunch',
    hotel: 'Crowne Plaza',
    kids: 'Children\'s buffet, entertainment, play area',
    price: 'BHD 22 adults / BHD 11 kids',
    highlights: ['Budget-friendly', 'Italian focus', 'Good for kids']
  },
  {
    name: 'Flavours on 2',
    hotel: 'Sheraton',
    kids: 'Family-friendly layout, diverse menu',
    price: 'BHD 24 adults / BHD 12 kids',
    highlights: ['Central location', 'Varied menu', 'Reliable']
  },
];

const beachPoolBrunches = [
  {
    name: 'Iris Beach Brunch',
    location: 'Bahrain Bay',
    desc: 'Beachside brunch with infinity pool and DJ. Food is Mediterranean with seafood focus. Transforms into beach party after brunch.',
    price: 'BHD 35-55',
    vibe: 'Party / Social'
  },
  {
    name: 'Marassi Beach Brunch',
    location: 'Marassi Al Bahrain',
    desc: 'Beach resort brunch with full beach access. Relaxed vibe, water sports available. Great for making a day of it.',
    price: 'BHD 30-45',
    vibe: 'Relaxed / Active'
  },
  {
    name: 'Reef Club Brunch',
    location: 'Reef Resort',
    desc: 'Beachfront brunch with cabanas and fire pits. Laid-back atmosphere perfect for groups wanting beach time.',
    price: 'BHD 28-42',
    vibe: 'Casual / Beach'
  },
  {
    name: 'Ritz Pool Brunch',
    location: 'Ritz-Carlton',
    desc: 'Access to stunning infinity pool with marina views. Premium experience with excellent food stations.',
    price: 'BHD 40-58',
    vibe: 'Luxury / Relaxed'
  },
];

const budgetBrunches = [
  { name: 'Café Lilou', location: 'Adliya', price: 'BHD 12-18', desc: 'French café brunch with pastries, eggs, and champagne options' },
  { name: 'Coco\'s', location: 'Adliya', price: 'BHD 10-15', desc: 'Cozy café with excellent croissants and breakfast dishes' },
  { name: '198 Café', location: 'Various', price: 'BHD 8-14', desc: 'Trendy local café with good breakfast menu' },
  { name: 'Shakespeare & Co', location: 'Seef', price: 'BHD 12-18', desc: 'Victorian-themed restaurant with extensive breakfast menu' },
  { name: 'Meisei', location: 'Seef', price: 'BHD 15-22', desc: 'Japanese brunch with unique options like tamago and onigiri' },
  { name: 'The Meat Co', location: 'City Centre', price: 'BHD 18-25', desc: 'Steak-focused brunch with quality meats' },
];

const brunchPackages = [
  { type: 'Soft Drinks', desc: 'Water, juices, soft drinks, tea, coffee', typical: 'BHD 20-35' },
  { type: 'House Package', desc: 'House wines, beers, selected spirits, cocktails', typical: 'BHD 35-50' },
  { type: 'Premium/Sparkling', desc: 'Champagne, premium spirits, craft cocktails', typical: 'BHD 50-65' },
  { type: 'Grape Package', desc: 'Wine and bubbly focus, sommelier selections', typical: 'BHD 45-55' },
];

const brunchTips = [
  { title: 'Book Early', tip: 'Popular brunches sell out 2-3 weeks in advance. Book as soon as you know your dates, especially for Gulf Hotel.' },
  { title: 'Pace Yourself', tip: 'These brunches are marathons, not sprints. Start with light items, explore all stations, then go back for favorites.' },
  { title: 'Arrive On Time', tip: 'Most brunches have set start times. Arriving 15-20 minutes early ensures you get a good table and first access to fresh stations.' },
  { title: 'Plan Transportation', tip: 'If you\'re having drinks, arrange a taxi or Uber. Never drink and drive — penalties in Bahrain are severe.' },
  { title: 'Ask About Pool Access', tip: 'Many hotel brunches include pool access. Bring swimwear if you want to extend your afternoon.' },
  { title: 'Children Policies', tip: 'Check age policies and kids\' pricing. Some brunches are adults-only; others have dedicated kids\' areas.' },
];

const weekendBrunchSchedule = [
  { day: 'Friday', desc: 'The main brunch day. All major hotels host their flagship brunches. Most popular and busiest.', recommended: ['Gulf Hotel Al Waha', 'Four Seasons CUT', 'Ritz-Carlton La Mer'] },
  { day: 'Saturday', desc: 'Growing in popularity. More relaxed vibe, easier to book. Some hotels offer different concepts.', recommended: ['The Orangery', 'Elements', 'Beach Club Brunches'] },
  { day: 'Thursday', desc: 'Some venues offer preview brunches or special dinners that feel like brunch.', recommended: ['Ladies night dinners', 'Happy hour transitions'] },
];

const seasonalConsiderations = [
  { season: 'Winter (Nov-Mar)', notes: 'Perfect for outdoor and poolside brunches. Book terrace seating when available. Best time for beach brunches.' },
  { season: 'Summer (Jun-Sep)', notes: 'Indoor brunches preferred. Look for venues with excellent AC. Pool brunches still work if you can handle the heat.' },
  { season: 'Ramadan', notes: 'Most brunches pause during Ramadan. Some hotels offer iftar buffets instead. Check dates before planning.' },
  { season: 'F1 Weekend', notes: 'March brings the Grand Prix. Brunches are extremely busy; book months in advance or skip that weekend.' },
];

export default function BestBrunches2026Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSchema()) }}
      />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/30 to-yellow-900/30" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl" />
          
          <div className="max-w-4xl mx-auto relative z-10">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li>/</li>
                <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
                <li>/</li>
                <li className="text-white">Best Brunches Bahrain 2026</li>
              </ol>
            </nav>

            <div className="text-center">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-full text-amber-300 text-sm mb-4">
                <Sun className="w-4 h-4" /> 2026 Brunch Guide
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-amber-200 to-yellow-200 bg-clip-text text-transparent leading-tight">
                Best Brunches in Bahrain 2026
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Friday brunch is a Gulf institution, and Bahrain does it better than anywhere. From legendary hotel 
                buffets to beachside feasts, discover the best brunches in the Kingdom.
              </p>
              
              <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> 12 min read
                </span>
                <span>•</span>
                <span>Updated February 2026</span>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
            <p className="text-gray-300 leading-relaxed text-lg">
              In Bahrain, brunch isn't just a meal — it's a way of life. Every Friday, hotels and restaurants 
              across the Kingdom roll out lavish spreads that bring together food, drinks, entertainment, and 
              socializing into one spectacular experience. Whether you're celebrating a birthday, catching up 
              with friends, or simply indulging in life's pleasures, Friday brunch is the highlight of the week.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              The concept is simple: pay one price and enjoy unlimited food and drinks for 3-4 hours. But the 
              execution varies dramatically. Some brunches focus on quantity with massive buffet spreads, while 
              others emphasize quality with made-to-order stations and premium ingredients. Pool and beach access, 
              live entertainment, and after-brunch parties add extra dimensions.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              This guide covers the best brunches in Bahrain for 2026, from five-star hotel experiences to 
              budget-friendly café options. We've eaten our way through them all (it's a tough job) to bring 
              you the definitive guide to Bahrain's brunch scene.
            </p>
          </div>
        </section>

        {/* Premium Brunches */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Premium Hotel Brunches</h2>
                <p className="text-gray-400">Bahrain's best-in-class brunch experiences</p>
              </div>
            </div>
            
            <div className="space-y-6">
              {premiumBrunches.map((brunch, idx) => (
                <div key={brunch.name} className={`p-6 rounded-2xl border ${idx === 0 ? 'bg-gradient-to-r from-amber-600/20 to-yellow-600/20 border-amber-500/50' : 'bg-gray-800/50 border-gray-700'}`}>
                  {idx === 0 && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-500/30 text-amber-300 text-xs rounded-full mb-3">
                      <Star className="w-3 h-3" /> Editor's Choice
                    </span>
                  )}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white">{brunch.name}</h3>
                      <p className="text-amber-400 text-sm mb-2">{brunch.hotel}</p>
                      <p className="text-gray-400 mb-4">{brunch.desc}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {brunch.highlights.map((h) => (
                          <span key={h} className="px-2 py-1 bg-gray-700/50 rounded text-xs text-gray-300">{h}</span>
                        ))}
                      </div>
                      <p className="text-gray-500 text-sm flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {brunch.time} • Best for: {brunch.bestFor}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="space-y-1 text-sm">
                        <p><span className="text-gray-500">Soft:</span> <span className="text-white">{brunch.price.soft}</span></p>
                        <p><span className="text-gray-500">House:</span> <span className="text-white">{brunch.price.house}</span></p>
                        {brunch.price.premium && <p><span className="text-gray-500">Premium:</span> <span className="text-amber-400">{brunch.price.premium}</span></p>}
                      </div>
                      <div className="flex items-center gap-1 mt-3 justify-end">
                        {Array.from({ length: brunch.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Package Types */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-violet-600">
                <Wine className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Understanding Brunch Packages</h2>
                <p className="text-gray-400">What's included at each price tier</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {brunchPackages.map((pkg) => (
                <div key={pkg.type} className="p-5 bg-gray-800/50 rounded-xl border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">{pkg.type}</h3>
                    <span className="text-purple-400 text-sm">{pkg.typical}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{pkg.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Family Brunches */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Family-Friendly Brunches</h2>
                <p className="text-gray-400">Great options when you're bringing the kids</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {familyBrunches.map((brunch) => (
                <div key={brunch.name} className="p-5 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-green-500/30 transition">
                  <h3 className="text-lg font-semibold text-white mb-1">{brunch.name}</h3>
                  <p className="text-green-400 text-sm mb-2">{brunch.hotel}</p>
                  <p className="text-gray-400 text-sm mb-2">{brunch.kids}</p>
                  <p className="text-gray-500 text-sm mb-3">{brunch.price}</p>
                  <div className="flex flex-wrap gap-2">
                    {brunch.highlights.map((h) => (
                      <span key={h} className="px-2 py-1 bg-green-500/10 border border-green-500/20 rounded text-xs text-green-300">{h}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Beach & Pool Brunches */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600">
                <Waves className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Beach & Pool Brunches</h2>
                <p className="text-gray-400">Make a day of it with water access</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {beachPoolBrunches.map((brunch) => (
                <div key={brunch.name} className="p-5 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-cyan-500/30 transition">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{brunch.name}</h3>
                      <p className="text-cyan-400 text-sm">{brunch.location}</p>
                    </div>
                    <span className="text-white font-semibold">{brunch.price}</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">{brunch.desc}</p>
                  <span className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full">
                    {brunch.vibe}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Link 
                href="/guides/beach-clubs"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full text-white font-semibold hover:opacity-90 transition"
              >
                Full Beach Club Guide <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Budget Brunches */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Budget-Friendly Brunches</h2>
                <p className="text-gray-400">Great food without the five-star price tag</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {budgetBrunches.map((brunch) => (
                <div key={brunch.name} className="p-5 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-emerald-500/30 transition">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">{brunch.name}</h3>
                    <span className="text-emerald-400 text-sm">{brunch.price}</span>
                  </div>
                  <p className="text-emerald-400/70 text-sm mb-2">{brunch.location}</p>
                  <p className="text-gray-400 text-sm">{brunch.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Weekly Schedule */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Weekend Brunch Schedule</h2>
                <p className="text-gray-400">What to expect each day</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {weekendBrunchSchedule.map((day) => (
                <div key={day.day} className={`p-6 rounded-xl border ${day.day === 'Friday' ? 'bg-gradient-to-b from-pink-600/20 to-rose-600/20 border-pink-500/50' : 'bg-gray-800/50 border-gray-700'}`}>
                  <h3 className="text-xl font-semibold text-white mb-2">{day.day}</h3>
                  <p className="text-gray-400 text-sm mb-4">{day.desc}</p>
                  <div className="space-y-2">
                    <p className="text-pink-400 text-xs font-medium">Recommended:</p>
                    {day.recommended.map((rec) => (
                      <p key={rec} className="text-gray-300 text-sm">• {rec}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pro Tips */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-amber-400" />
              Brunch Pro Tips
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brunchTips.map((tip) => (
                <div key={tip.title} className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                  <h3 className="text-lg font-semibold text-amber-300 mb-2">{tip.title}</h3>
                  <p className="text-gray-400 text-sm">{tip.tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Seasonal Guide */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">Seasonal Considerations</h2>
            
            <div className="space-y-4">
              {seasonalConsiderations.map((season) => (
                <div key={season.season} className="p-5 bg-gray-800/50 rounded-xl border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-2">{season.season}</h3>
                  <p className="text-gray-400">{season.notes}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-2">What is the best brunch in Bahrain?</h3>
                <p className="text-gray-400">The Gulf Hotel's Brunch at Al Waha is consistently rated the best brunch in Bahrain, offering exceptional variety, quality, and value. The Four Seasons and Ritz-Carlton also offer premium brunch experiences.</p>
              </div>
              
              <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-2">How much does brunch cost in Bahrain?</h3>
                <p className="text-gray-400">Brunch prices in Bahrain range from BHD 15-25 for soft drinks packages to BHD 35-65 for premium packages with beverages. Family brunches typically range BHD 20-35 per adult with discounts for children.</p>
              </div>
              
              <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-2">What time is Friday brunch in Bahrain?</h3>
                <p className="text-gray-400">Most Friday brunches run from 12:30 PM to 4:00 PM. Some venues offer extended hours until 5 PM or have after-brunch parties. Saturday brunches are also popular at many venues.</p>
              </div>
              
              <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-2">Do I need to book brunch in Bahrain?</h3>
                <p className="text-gray-400">Yes, booking is highly recommended for popular brunches, especially at five-star hotels. Some venues like the Gulf Hotel sell out weeks in advance. Book directly with the hotel or through their website.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-amber-900/30 to-yellow-900/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready for Brunch?</h2>
            <p className="text-gray-300 text-lg mb-8">
              Explore our complete brunch directory with menus, prices, and booking information.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/guides/brunch"
                className="px-8 py-4 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-full text-white font-semibold hover:opacity-90 transition"
              >
                Browse All Brunches
              </Link>
              <Link 
                href="/best-brunches-bahrain"
                className="px-8 py-4 bg-gray-800 rounded-full text-white font-semibold hover:bg-gray-700 transition"
              >
                Brunch Rankings
              </Link>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8">Related Guides</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/blog/best-restaurants-bahrain-2026" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition group">
                <UtensilsCrossed className="w-8 h-8 text-orange-400 mb-3" />
                <h3 className="font-semibold text-white group-hover:text-orange-300 transition">Best Restaurants 2026</h3>
                <p className="text-sm text-gray-400 mt-2">Top dining experiences</p>
              </Link>
              <Link href="/guides/best-breakfast-bahrain" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition group">
                <Coffee className="w-8 h-8 text-amber-400 mb-3" />
                <h3 className="font-semibold text-white group-hover:text-amber-300 transition">Best Breakfast Spots</h3>
                <p className="text-sm text-gray-400 mt-2">Morning favorites</p>
              </Link>
              <Link href="/guides/beach-clubs" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition group">
                <Palmtree className="w-8 h-8 text-cyan-400 mb-3" />
                <h3 className="font-semibold text-white group-hover:text-cyan-300 transition">Beach Clubs</h3>
                <p className="text-sm text-gray-400 mt-2">Pool & beach days</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
