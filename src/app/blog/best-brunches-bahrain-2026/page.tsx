import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Coffee, MapPin, Star, Clock, ArrowRight, Sparkles,
  Wine, Users, ChefHat, Sun, UtensilsCrossed, Music,
  Heart, DollarSign, Calendar, ChevronRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Brunches in Bahrain 2026 — Friday Brunch Guide | BahrainNights',
  description: 'Discover the best Friday brunches in Bahrain for 2026. From luxury hotel buffets to casual café brunch spots. Complete guide with prices, packages, and booking tips.',
  keywords: [
    'best brunch Bahrain 2026', 'Friday brunch Bahrain', 'Bahrain brunch guide',
    'hotel brunch Bahrain', 'brunch with pool Bahrain', 'family brunch Bahrain',
    'Gulf Hotel brunch', 'Ritz Carlton brunch Bahrain'
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
        dateModified: '2026-02-24',
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
              text: 'The Gulf Hotel\'s Brunch at Al Waha is consistently rated the best brunch in Bahrain, offering exceptional variety, quality, and value. The Ritz-Carlton also offers premium brunch experiences.'
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
              text: 'Most Friday brunches run from 12:30 PM to 4:00 PM. Some venues offer extended hours until 5 PM. Saturday brunches are also popular at many venues.'
            }
          },
          {
            '@type': 'Question',
            name: 'Do I need to book brunch in Bahrain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, booking is highly recommended for popular brunches, especially at five-star hotels. Some venues like the Gulf Hotel sell out weeks in advance. Book directly with the hotel.'
            }
          }
        ]
      }
    ]
  };
}

// Verified hotel brunches
const verifiedBrunches = [
  {
    name: 'Al Waha Brunch',
    hotel: 'Gulf Hotel',
    desc: 'Bahrain\'s most legendary brunch. Multiple live cooking stations, seafood tower, sushi bar, BBQ, and an incredible dessert spread. The standard against which all others are measured.',
    highlights: ['Seafood tower', '12+ live stations', 'Kids area', 'Pool access'],
    time: '12:30 PM - 4:00 PM',
    bestFor: 'Groups, special occasions',
    verified: true
  },
  {
    name: 'La Med Brunch',
    hotel: 'Ritz-Carlton Bahrain',
    desc: 'Mediterranean brunch by the marina. Exceptional seafood, elegant ambiance, and waterfront views. One of Bahrain\'s most refined brunch experiences.',
    highlights: ['Seafood focus', 'Marina views', 'Mediterranean cuisine', 'Live music'],
    time: '12:30 PM - 4:00 PM',
    bestFor: 'Romantic brunches, seafood lovers',
    verified: true
  },
  {
    name: 'Primavera Brunch',
    hotel: 'Ritz-Carlton Bahrain',
    desc: 'Italian-themed brunch with fresh pasta, pizza, and Mediterranean dishes. Beautiful setting with Gulf views.',
    highlights: ['Italian cuisine', 'Gulf views', 'Fresh pasta', 'Family-friendly'],
    time: '12:30 PM - 4:00 PM',
    bestFor: 'Italian food lovers, families',
    verified: true
  },
];

const brunchPackages = [
  { type: 'Soft Drinks', desc: 'Water, juices, soft drinks, tea, coffee', typical: 'BHD 20-35' },
  { type: 'House Package', desc: 'House wines, beers, selected spirits', typical: 'BHD 35-50' },
  { type: 'Premium Package', desc: 'Premium spirits, champagne, craft cocktails', typical: 'BHD 50-65' },
];

const brunchTips = [
  { title: 'Book Early', tip: 'Popular brunches sell out 2-3 weeks in advance. Book as soon as you know your dates, especially for Gulf Hotel.' },
  { title: 'Pace Yourself', tip: 'These brunches are marathons, not sprints. Start with light items, explore all stations, then go back for favorites.' },
  { title: 'Arrive On Time', tip: 'Most brunches have set start times. Arriving 15-20 minutes early ensures you get a good table.' },
  { title: 'Plan Transportation', tip: 'If you\'re having drinks, arrange a taxi or Uber. Never drink and drive.' },
  { title: 'Ask About Pool Access', tip: 'Many hotel brunches include pool access. Bring swimwear if you want to extend your afternoon.' },
  { title: 'Children Policies', tip: 'Check age policies and kids\' pricing. Some brunches have dedicated kids\' areas.' },
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
                Friday brunch is a Gulf institution, and Bahrain does it better than anywhere. 
                Discover the best verified brunches in the Kingdom.
              </p>
              
              <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> 8 min read
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
              In Bahrain, brunch isn't just a meal — it's a way of life. Every Friday, hotels across 
              the Kingdom roll out lavish spreads that bring together food, drinks, entertainment, and 
              socializing into one spectacular experience.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              The concept is simple: pay one price and enjoy unlimited food and drinks for 3-4 hours. 
              This guide covers verified brunches we can confidently recommend, with accurate information 
              about what to expect.
            </p>
          </div>
        </section>

        {/* Verified Brunches */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Verified Hotel Brunches</h2>
                <p className="text-gray-400">Trusted recommendations</p>
              </div>
            </div>
            
            <div className="space-y-6">
              {verifiedBrunches.map((brunch, idx) => (
                <div key={brunch.name} className={`p-6 rounded-2xl border ${idx === 0 ? 'bg-gradient-to-r from-amber-600/20 to-yellow-600/20 border-amber-500/50' : 'bg-gray-800/50 border-gray-700'}`}>
                  {idx === 0 && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-500/30 text-amber-300 text-xs rounded-full mb-3">
                      <Star className="w-3 h-3" /> Most Popular
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
            
            <div className="grid md:grid-cols-3 gap-4">
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

        {/* More Coming Soon */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-4xl mx-auto text-center">
            <ChefHat className="w-16 h-16 text-amber-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">More Brunches Coming Soon</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              We're actively visiting and verifying more brunch venues across Bahrain. 
              Check back regularly for updates with accurate pricing and details.
            </p>
          </div>
        </section>

        {/* Pro Tips */}
        <section className="py-16 px-4">
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

        {/* FAQ Section */}
        <section className="py-16 px-4 bg-gray-800/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-2">What is the best brunch in Bahrain?</h3>
                <p className="text-gray-400">The Gulf Hotel's Brunch at Al Waha is consistently rated the best brunch in Bahrain, offering exceptional variety, quality, and value.</p>
              </div>
              
              <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-2">How much does brunch cost in Bahrain?</h3>
                <p className="text-gray-400">Brunch prices in Bahrain range from BHD 20-35 for soft drinks packages to BHD 50-65 for premium packages with champagne and spirits.</p>
              </div>
              
              <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-2">What time is Friday brunch in Bahrain?</h3>
                <p className="text-gray-400">Most Friday brunches run from 12:30 PM to 4:00 PM. Some venues offer extended hours. Saturday brunches are also popular.</p>
              </div>
              
              <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-2">Do I need to book brunch in Bahrain?</h3>
                <p className="text-gray-400">Yes, booking is highly recommended, especially for popular venues like the Gulf Hotel. Book 1-2 weeks in advance for weekends.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-amber-900/30 to-yellow-900/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready for Brunch?</h2>
            <p className="text-gray-300 text-lg mb-8">
              Explore our restaurant guides for more dining recommendations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/blog/best-restaurants-bahrain-2026"
                className="px-8 py-4 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-full text-white font-semibold hover:opacity-90 transition"
              >
                Best Restaurants
              </Link>
              <Link 
                href="/restaurants"
                className="px-8 py-4 bg-gray-800 rounded-full text-white font-semibold hover:bg-gray-700 transition"
              >
                Browse All
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
              <Link href="/blog/bahrain-foodie-guide" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition group">
                <Coffee className="w-8 h-8 text-amber-400 mb-3" />
                <h3 className="font-semibold text-white group-hover:text-amber-300 transition">Bahrain Foodie Guide</h3>
                <p className="text-sm text-gray-400 mt-2">Must-try dishes</p>
              </Link>
              <Link href="/blog/weekend-guide-bahrain-february-2026" className="p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition group">
                <Calendar className="w-8 h-8 text-purple-400 mb-3" />
                <h3 className="font-semibold text-white group-hover:text-purple-300 transition">Weekend Guide</h3>
                <p className="text-sm text-gray-400 mt-2">What to do this weekend</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
