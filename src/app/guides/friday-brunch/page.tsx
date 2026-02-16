import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, Star, Clock, DollarSign, Utensils, Wine, 
  Sun, Phone, Users, Sparkles, CheckCircle
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';

export const metadata: Metadata = {
  title: 'Best Friday Brunch in Bahrain 2026 | Friday Brunch Deals & Prices',
  description: 'Find the best Friday brunch in Bahrain for 2026. Compare prices, packages, and deals at top hotels including Four Seasons, Ritz-Carlton, and Gulf Hotel. Book your perfect Friday brunch today.',
  keywords: 'best brunch Bahrain Friday, Friday brunch deals Bahrain 2026, Friday brunch Bahrain prices, best Friday brunch Manama, hotel brunch Bahrain Friday, champagne brunch Bahrain',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/friday-brunch' },
  openGraph: {
    title: 'Best Friday Brunch in Bahrain 2026 | Deals & Prices',
    description: 'Complete guide to the best Friday brunches in Bahrain with prices, packages, and booking tips.',
    type: 'article',
    url: 'https://www.bahrainnights.com/guides/friday-brunch',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Friday Brunch in Bahrain 2026',
    description: 'Your ultimate guide to Friday brunch deals in Bahrain.',
  },
};

const faqs = [
  {
    q: 'What is the best Friday brunch in Bahrain?',
    a: 'The top Friday brunches in Bahrain include Four Seasons Bahrain Bay (BD 45-60), Ritz-Carlton La Med (BD 38-55), Gulf Hotel Al Waha (BD 28-42), and Sofitel Zallaq (BD 35-50). Each offers unique experiences from beachfront luxury to traditional hotel elegance.',
  },
  {
    q: 'How much does Friday brunch cost in Bahrain?',
    a: 'Friday brunch prices in Bahrain range from BD 25-60 depending on the venue and package. Most hotels offer tiered pricing: soft drinks only (cheapest), house beverages (mid-range), or premium champagne packages (most expensive).',
  },
  {
    q: 'What time is Friday brunch in Bahrain?',
    a: 'Friday brunch in Bahrain typically runs from 12:30 PM to 4:00 PM. Some venues extend to 5 PM. It\'s best to arrive early (12:30-1:00 PM) for the best selection at live cooking stations.',
  },
  {
    q: 'Do I need to book Friday brunch in advance?',
    a: 'Yes, reservations are essential for popular Friday brunches, especially at Four Seasons, Ritz-Carlton, and Gulf Hotel. Book 1-2 weeks ahead during peak season (October-April) and for holidays.',
  },
  {
    q: 'Which Friday brunch has the best value in Bahrain?',
    a: 'Gulf Hotel Al Waha offers excellent value at BD 28-42 with diverse cuisines and live stations. JW Marriott (BD 25-38) and Coral Bay (BD 22-35) are also great budget-friendly options without compromising quality.',
  },
  {
    q: 'Are Friday brunches in Bahrain family-friendly?',
    a: 'Yes, most hotel brunches welcome families. Gulf Hotel, Ritz-Carlton, and Sofitel have dedicated kids\' areas, entertainment, and children\'s buffets. Some offer free entry for children under certain ages.',
  },
];

const fridayBrunches = [
  {
    name: 'Four Seasons Bahrain Bay',
    venue: 'Four Seasons Hotel',
    area: 'Bahrain Bay',
    rating: 5,
    price: { soft: 'BD 45', house: 'BD 52', premium: 'BD 60' },
    timing: '12:30 PM - 4:00 PM',
    phone: '+973 1711 5000',
    highlights: [
      'Stunning waterfront setting',
      'Premium champagne selection',
      'Live seafood & sushi station',
      'Beach access included',
      'Live entertainment',
    ],
    bestFor: 'Special occasions, luxury seekers, romantic brunches',
    cuisine: 'International with focus on premium seafood',
    kids: 'Family-friendly with supervised kids\' activities',
    featured: true,
  },
  {
    name: 'La Med at Ritz-Carlton',
    venue: 'The Ritz-Carlton Bahrain',
    area: 'Seef',
    rating: 5,
    price: { soft: 'BD 38', house: 'BD 45', premium: 'BD 55' },
    timing: '12:30 PM - 4:00 PM',
    phone: '+973 1758 0000',
    highlights: [
      'Mediterranean poolside terrace',
      'Extensive buffet spread',
      'Fresh pasta station',
      'Gelato & dessert room',
      'Refined Ritz service',
    ],
    bestFor: 'Groups, families, classic hotel brunch experience',
    cuisine: 'Mediterranean with international options',
    kids: 'Dedicated kids\' buffet and entertainment',
    featured: true,
  },
  {
    name: 'Al Waha at Gulf Hotel',
    venue: 'Gulf Hotel Bahrain',
    area: 'Adliya',
    rating: 5,
    price: { soft: 'BD 28', house: 'BD 35', premium: 'BD 42' },
    timing: '12:30 PM - 4:00 PM',
    phone: '+973 1771 3000',
    highlights: [
      'Bahrain\'s original brunch tradition',
      'Multiple live cooking stations',
      'Thai, Indian, BBQ sections',
      'Excellent value for money',
      'Large venue capacity',
    ],
    bestFor: 'Families, value seekers, variety lovers',
    cuisine: 'International with strong Asian representation',
    kids: 'Excellent kids\' facilities and special pricing',
    featured: true,
  },
  {
    name: 'Sofitel Bahrain Zallaq',
    venue: 'Sofitel Bahrain',
    area: 'Zallaq Beach',
    rating: 5,
    price: { soft: 'BD 35', house: 'BD 42', premium: 'BD 50' },
    timing: '12:30 PM - 4:00 PM',
    phone: '+973 1763 6363',
    highlights: [
      'Private beach access',
      'French patisserie excellence',
      'Fresh oysters & seafood',
      'Sunset views',
      'Resort atmosphere',
    ],
    bestFor: 'Beach lovers, couples, French cuisine fans',
    cuisine: 'French-inspired international',
    kids: 'Kids club available during brunch',
  },
  {
    name: 'InterContinental Regency',
    venue: 'InterContinental Regency Bahrain',
    area: 'Manama',
    rating: 4,
    price: { soft: 'BD 28', house: 'BD 35', premium: 'BD 40' },
    timing: '12:30 PM - 3:30 PM',
    phone: '+973 1722 7777',
    highlights: [
      'Central Manama location',
      'Classic roast carvery',
      'Asian wok station',
      'Consistent quality',
      'Elegant ballroom setting',
    ],
    bestFor: 'Business groups, traditional brunch lovers',
    cuisine: 'International with British influences',
    kids: 'Family-friendly environment',
  },
  {
    name: 'JW Marriott Brunch',
    venue: 'JW Marriott Hotel',
    area: 'Manama',
    rating: 4,
    price: { soft: 'BD 25', house: 'BD 32', premium: 'BD 38' },
    timing: '12:30 PM - 4:00 PM',
    phone: '+973 1711 4114',
    highlights: [
      'Central location',
      'Sushi & Asian bar',
      'Chocolate fountain',
      'Budget-friendly luxury',
      'Reliable quality',
    ],
    bestFor: 'Families, budget-conscious, consistent experience',
    cuisine: 'International buffet',
    kids: 'Great for families with kids\' menu',
  },
  {
    name: 'Coral Bay Brunch',
    venue: 'Coral Bay Resort',
    area: 'Diyar Al Muharraq',
    rating: 4,
    price: { soft: 'BD 22', house: 'BD 28', premium: 'BD 35' },
    timing: '1:00 PM - 5:00 PM',
    phone: '+973 1600 0000',
    highlights: [
      'Beach resort atmosphere',
      'Outdoor BBQ grills',
      'Relaxed casual vibe',
      'Extended hours',
      'Great value pricing',
    ],
    bestFor: 'Casual beachgoers, groups, families',
    cuisine: 'BBQ and international',
    kids: 'Very kid-friendly with beach activities',
  },
  {
    name: 'Karma Kafe',
    venue: 'The Avenues Mall',
    area: 'Bahrain Bay',
    rating: 4,
    price: { soft: 'BD 28', house: 'BD 35', premium: 'BD 42' },
    timing: '1:00 PM - 5:00 PM',
    phone: '+973 1711 5777',
    highlights: [
      'Trendy atmosphere',
      'Asian fusion cuisine',
      'Great music & vibes',
      'Bay views',
      'Younger crowd',
    ],
    bestFor: 'Young professionals, foodies, groups',
    cuisine: 'Pan-Asian fusion',
    kids: 'More suited for adults',
  },
  {
    name: 'Wyndham Grand Brunch',
    venue: 'Wyndham Grand Manama',
    area: 'Manama',
    rating: 4,
    price: { soft: 'BD 26', house: 'BD 32', premium: 'BD 38' },
    timing: '12:30 PM - 4:00 PM',
    phone: '+973 1799 8888',
    highlights: [
      'Value for money',
      'Diverse stations',
      'City center location',
      'Multiple dining venues',
      'Good beverage selection',
    ],
    bestFor: 'Budget-conscious, business travelers',
    cuisine: 'International',
    kids: 'Family-friendly',
  },
  {
    name: 'ART Rotana Brunch',
    venue: 'ART Rotana Amwaj',
    area: 'Amwaj Islands',
    rating: 4,
    price: { soft: 'BD 28', house: 'BD 35', premium: 'BD 42' },
    timing: '12:30 PM - 4:00 PM',
    phone: '+973 1600 0111',
    highlights: [
      'Island resort setting',
      'Multiple restaurants combined',
      'Pool access option',
      'Good for staycation',
      'Relaxed atmosphere',
    ],
    bestFor: 'Staycation guests, island lovers',
    cuisine: 'International with Middle Eastern touches',
    kids: 'Good for families with pool access',
  },
];

const tips = [
  { 
    icon: Phone, 
    title: 'Book Early', 
    text: 'Reserve 1-2 weeks ahead for popular venues. Peak season (Oct-Apr) fills up fast.' 
  },
  { 
    icon: Clock, 
    title: 'Arrive Early', 
    text: 'Get there at 12:30 PM for best selection at live stations and to secure good seating.' 
  },
  { 
    icon: Users, 
    title: 'Group Discounts', 
    text: 'Many hotels offer group rates for 10+ people. Call ahead to negotiate.' 
  },
  { 
    icon: DollarSign, 
    title: 'Use Entertainer', 
    text: 'Apps like The Entertainer offer buy-one-get-one-free deals on many brunches.' 
  },
  { 
    icon: Sun, 
    title: 'Pool Access', 
    text: 'Some brunches include pool/beach access. Bring swimwear and make it a full day.' 
  },
  { 
    icon: Utensils, 
    title: 'Pace Yourself', 
    text: 'Brunches run 3-4 hours. Start light, skip breakfast, and take your time.' 
  },
];

export default function FridayBrunchPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-amber-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Friday Brunch', url: 'https://www.bahrainnights.com/guides/friday-brunch' },
        ]}
      />
      <FAQSchema faqs={faqs} />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20" />
        <div className="absolute top-20 right-20 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center">
            <span className="inline-block px-4 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-4 border border-amber-500/30">
              🥂 Friday Brunch Guide 2026
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Friday Brunch</span> in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your complete guide to Friday brunch deals in Bahrain. Compare prices, packages, 
              and find the perfect spot for your weekend celebration.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Brunches Listed', value: '10+', icon: Utensils },
              { label: 'Price Range', value: 'BD 22-60', icon: DollarSign },
              { label: 'Best Day', value: 'Friday', icon: Sun },
              { label: 'Typical Hours', value: '12:30-4PM', icon: Clock },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-amber-500/20">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-amber-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Brunches */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Top Friday Brunches</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            The best Friday brunch experiences in Bahrain, with prices and packages.
          </p>

          <div className="space-y-6">
            {fridayBrunches.map((brunch) => (
              <div 
                key={brunch.name}
                className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all ${brunch.featured ? 'border border-amber-500/30' : ''}`}
              >
                {brunch.featured && (
                  <span className="inline-block px-3 py-1 bg-amber-500 text-black text-xs font-bold rounded mb-4">
                    ⭐ TOP PICK
                  </span>
                )}
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold">{brunch.name}</h3>
                        <p className="text-amber-400 text-sm flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {brunch.venue}, {brunch.area}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-0.5 justify-end mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < brunch.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-600'}`} />
                          ))}
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-amber-300 flex items-center gap-2 mb-4">
                      <Clock className="w-4 h-4" />
                      {brunch.timing}
                      <span className="text-gray-500">|</span>
                      <Phone className="w-4 h-4" />
                      {brunch.phone}
                    </p>

                    {/* Pricing Grid */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="bg-black/30 rounded-lg p-3 text-center">
                        <div className="text-xs text-gray-500 mb-1">Soft Drinks</div>
                        <div className="text-lg font-bold text-white">{brunch.price.soft}</div>
                      </div>
                      <div className="bg-black/30 rounded-lg p-3 text-center">
                        <div className="text-xs text-gray-500 mb-1">House Beverages</div>
                        <div className="text-lg font-bold text-amber-400">{brunch.price.house}</div>
                      </div>
                      <div className="bg-black/30 rounded-lg p-3 text-center">
                        <div className="text-xs text-gray-500 mb-1">Premium</div>
                        <div className="text-lg font-bold text-orange-400">{brunch.price.premium}</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {brunch.highlights.slice(0, 4).map((h) => (
                        <span key={h} className="text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded">
                          {h}
                        </span>
                      ))}
                    </div>

                    <p className="text-gray-400 text-sm">
                      <strong className="text-gray-300">Cuisine:</strong> {brunch.cuisine}
                    </p>
                  </div>

                  <div className="lg:w-1/4 bg-black/20 rounded-xl p-4 space-y-3">
                    <div>
                      <p className="text-amber-400 font-semibold text-sm">Best for:</p>
                      <p className="text-gray-300 text-sm">{brunch.bestFor}</p>
                    </div>
                    <div>
                      <p className="text-amber-400 font-semibold text-sm">Kids:</p>
                      <p className="text-gray-400 text-xs">{brunch.kids}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Friday Brunch Tips</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tips.map((tip) => (
              <div key={tip.title} className="bg-white/5 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <tip.icon className="w-6 h-6 text-amber-400 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-white mb-1">{tip.title}</h3>
                    <p className="text-sm text-gray-400">{tip.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Price Comparison */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Quick Price Comparison</h2>
          <div className="bg-white/5 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-4 gap-4 p-4 bg-amber-500/20 font-bold text-sm">
              <div>Venue</div>
              <div className="text-center">Soft Drinks</div>
              <div className="text-center">House</div>
              <div className="text-center">Premium</div>
            </div>
            {fridayBrunches.slice(0, 6).map((brunch, i) => (
              <div key={brunch.name} className={`grid grid-cols-4 gap-4 p-4 ${i % 2 === 0 ? 'bg-white/5' : ''}`}>
                <div className="text-sm font-medium truncate">{brunch.venue.split(' ')[0]}</div>
                <div className="text-center text-gray-300">{brunch.price.soft}</div>
                <div className="text-center text-amber-400">{brunch.price.house}</div>
                <div className="text-center text-orange-400">{brunch.price.premium}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6">
                <h3 className="font-bold mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Plan Your Weekend</h2>
          <p className="text-gray-300 mb-8">
            Friday brunch is just the start. Explore more weekend activities in Bahrain.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/this-weekend"
              className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl transition-colors"
            >
              This Weekend Guide
            </Link>
            <Link
              href="/guides/beach-clubs"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors"
            >
              Beach Clubs
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto prose prose-invert">
          <h2>Friday Brunch in Bahrain — A Complete Guide</h2>
          <p>
            Friday brunch in Bahrain is more than just a meal — it&apos;s the centerpiece of the Gulf 
            weekend. While the rest of the world brunches on Saturday or Sunday, Bahrain&apos;s Friday 
            brunch tradition has evolved into an elaborate social event that brings together 
            expats, locals, families, and visitors for hours of exceptional food, flowing drinks, 
            and leisurely conversation.
          </p>
          
          <h3>Why Friday?</h3>
          <p>
            In Bahrain, Friday is the main day off (the Gulf weekend runs Thursday through Saturday). 
            This makes Friday brunch the perfect way to relax after the work week, with most people 
            having no obligations until Saturday evening or Sunday morning.
          </p>
          
          <h3>What to Expect</h3>
          <p>
            A typical Friday brunch in Bahrain includes:
          </p>
          <ul>
            <li><strong>Lavish buffets</strong> with international cuisines — sushi, seafood, carving stations, Asian woks, Mediterranean mezze, and extensive dessert spreads</li>
            <li><strong>Beverage packages</strong> from soft drinks to premium champagne</li>
            <li><strong>Live cooking stations</strong> where chefs prepare dishes to order</li>
            <li><strong>Entertainment</strong> including live music, DJs, and kids&apos; activities</li>
            <li><strong>Extended hours</strong> typically 12:30 PM to 4:00 PM</li>
          </ul>
          
          <h3>How to Choose Your Brunch</h3>
          <p>
            Consider your priorities: Are you celebrating a special occasion? Go for Four Seasons or 
            Ritz-Carlton. Looking for value? Gulf Hotel and JW Marriott offer excellent spreads at 
            lower prices. Want beach vibes? Head to Sofitel Zallaq or Coral Bay. Bringing the kids? 
            Gulf Hotel and Ritz-Carlton have the best children&apos;s facilities.
          </p>
          
          <p>
            <em>Prices and offerings may change. Contact venues directly for current menus and reservations.</em>
          </p>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-8 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-lg font-bold mb-4">Related Guides</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { title: 'This Weekend', href: '/this-weekend' },
              { title: 'Best Brunches', href: '/guides/best-brunch-bahrain' },
              { title: 'Beach Clubs', href: '/guides/beach-clubs' },
              { title: 'Best Cafes', href: '/guides/best-cafes-bahrain' },
              { title: 'Family Restaurants', href: '/guides/best-family-restaurants-bahrain' },
              { title: 'Hotel Guide', href: '/guides/hotels' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded text-sm transition-colors">
                {link.title}
              </Link>
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
            headline: 'Best Friday Brunch in Bahrain 2026 | Friday Brunch Deals & Prices',
            description: 'Complete guide to the best Friday brunches in Bahrain with prices, packages, and booking tips.',
            author: {
              '@type': 'Organization',
              name: 'BahrainNights',
              url: 'https://www.bahrainnights.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'BahrainNights',
            },
            datePublished: '2026-01-01',
            dateModified: lastUpdated,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://www.bahrainnights.com/guides/friday-brunch',
            },
          }),
        }}
      />
    </div>
  );
}
