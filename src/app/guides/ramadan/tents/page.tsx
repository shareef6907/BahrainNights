import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Moon, Clock, MapPin, Star, Users, 
  Music, Coffee, Tent, Heart, Sparkles
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import InternalLinks from '@/components/SEO/InternalLinks';

export const metadata: Metadata = {
  title: 'Ramadan Tent Bahrain 2026 | Best Ramadan Tent Experiences',
  description: 'Discover the best Ramadan tent experiences in Bahrain for 2026. Traditional Arabian tent iftars at hotels and venues with authentic atmosphere, live entertainment, and shisha.',
  keywords: 'Ramadan tent Bahrain, Ramadan tent 2026, best Ramadan tent experience, iftar tent Bahrain, traditional Ramadan tent, Ritz-Carlton tent',
  openGraph: {
    title: 'Ramadan Tent Bahrain 2026 | Best Ramadan Tent Experiences',
    description: 'Traditional Ramadan tent experiences in Bahrain - authentic atmosphere, live entertainment, and Arabian hospitality.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/ramadan/tents',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/ramadan/tents',
  },
};

const tentVenues = [
  {
    name: 'The Ritz-Carlton Ramadan Tent',
    location: 'Seef District',
    tier: 'Premium',
    description: 'The Ritz-Carlton\'s Ramadan tent is legendary in Bahrain. The beautifully decorated tent offers an authentic Arabian atmosphere combined with the hotel\'s signature luxury service. Expect live entertainment, an extensive buffet, and shisha in a memorable setting.',
    experience: [
      'Elaborate traditional Arabian décor',
      'Live oud and Arabic music',
      'Premium shisha lounge',
      'Extensive iftar buffet',
      'Private majlis areas available',
      'Post-iftar entertainment',
    ],
    bestFor: 'Those seeking the full traditional tent experience with luxury touches. Ideal for groups, families, and special occasions.',
    capacity: 'Large - accommodates groups and events',
    atmosphere: 'Magical and festive with traditional Arabian ambiance',
    bookingNote: 'Extremely popular - book well in advance, especially for weekends and large groups.',
  },
  {
    name: 'Gulf Hotel Ramadan Tent',
    location: 'Adliya',
    tier: 'Premium',
    description: 'The Gulf Hotel has decades of Ramadan experience, and their tent reflects this expertise. A central location, quality food from their acclaimed kitchens, and reliable service make this a trusted choice.',
    experience: [
      'Central Adliya location',
      'Lebanese-influenced cuisine',
      'Live entertainment',
      'Traditional setting',
      'Large capacity',
      'Established reputation',
    ],
    bestFor: 'Those wanting quality and consistency from an experienced venue. Good for business gatherings.',
    capacity: 'Large - suitable for corporate events',
    atmosphere: 'Traditional with refined touches',
    bookingNote: 'Walk-ins may be possible on weekdays, but reservations recommended.',
  },
  {
    name: 'Reef Resort Ramadan Tent',
    location: 'Bahrain Bay',
    tier: 'Mid-Range',
    description: 'Reef Resort offers a unique waterfront tent experience. The bayfront location provides refreshing breezes and pleasant views. Known for their seafood options alongside traditional Arabic fare.',
    experience: [
      'Waterfront location',
      'Bay views',
      'Fresh seafood focus',
      'Outdoor seating options',
      'Traditional tent setting',
      'Family-friendly atmosphere',
    ],
    bestFor: 'Families and groups who appreciate waterfront dining. Good choice for those wanting something different.',
    capacity: 'Medium-Large',
    atmosphere: 'Relaxed waterfront ambiance',
    bookingNote: 'Request waterfront seating when booking.',
  },
  {
    name: 'Traditional Local Tents',
    location: 'Various locations across Bahrain',
    tier: 'Budget-Friendly',
    description: 'Beyond hotel venues, various local establishments and community organizations set up traditional Ramadan tents during the holy month. These offer authentic, no-frills experiences popular with locals.',
    experience: [
      'Authentic local atmosphere',
      'Traditional Arabic food',
      'Budget-friendly pricing',
      'Community spirit',
      'Shisha available',
      'Casual environment',
    ],
    bestFor: 'Budget-conscious visitors seeking authentic local experiences. Great for casual gatherings with friends.',
    capacity: 'Varies by venue',
    atmosphere: 'Casual and communal',
    bookingNote: 'Many operate walk-in. Check local listings and social media for current year venues.',
  },
];

const whatToExpect = [
  {
    title: 'The Setting',
    icon: Tent,
    description: 'Ramadan tents are specially erected structures decorated with traditional Arabian elements - carpets, cushions, lanterns, and draping fabrics. They create a festive, communal atmosphere.',
  },
  {
    title: 'The Food',
    icon: Coffee,
    description: 'Expect extensive buffets with traditional Arabic dishes, dates, Arabic coffee, fresh juices, grilled meats, rice dishes, mezze, and an array of desserts. Live cooking stations are common.',
  },
  {
    title: 'Entertainment',
    icon: Music,
    description: 'Many tents feature live Arabic music, often oud players or traditional singers. Some venues offer additional entertainment like poetry readings or cultural performances.',
  },
  {
    title: 'Shisha',
    icon: Sparkles,
    description: 'Shisha (hookah) is a popular post-iftar activity at most tents. Dedicated shisha lounges within the tent allow guests to relax after their meal.',
  },
  {
    title: 'Timing',
    icon: Clock,
    description: 'Arrive 15-20 minutes before iftar (sunset). The meal typically lasts 2-3 hours. Many guests stay longer to enjoy shisha and entertainment.',
  },
  {
    title: 'Community Spirit',
    icon: Heart,
    description: 'Ramadan tents embody the spirit of togetherness. Expect a lively, social atmosphere where families and friends gather to break fast together.',
  },
];

const pricingTiers = [
  {
    tier: 'Premium (5-Star Hotel Tents)',
    range: 'BD 30-55+',
    includes: 'Extensive premium buffet, live entertainment, shisha, elegant décor, full service',
    examples: 'Ritz-Carlton, Gulf Hotel',
  },
  {
    tier: 'Mid-Range (4-Star & Resorts)',
    range: 'BD 20-35',
    includes: 'Good buffet selection, entertainment, shisha, comfortable setting',
    examples: 'Reef Resort, various hotel tents',
  },
  {
    tier: 'Budget-Friendly (Local Tents)',
    range: 'BD 12-25',
    includes: 'Traditional buffet, basic shisha, authentic atmosphere',
    examples: 'Local establishments, community tents',
  },
];

const faqs = [
  {
    q: 'What is a Ramadan tent?',
    a: 'A Ramadan tent is a specially erected structure where people gather for iftar during the holy month. Decorated with traditional Arabian elements, these tents create a festive, communal atmosphere. Hotels and restaurants set them up seasonally to host iftar gatherings.',
  },
  {
    q: 'Which is the best Ramadan tent in Bahrain?',
    a: 'The Ritz-Carlton Ramadan tent is widely considered one of the best in Bahrain, known for its authentic atmosphere, quality food, and entertainment. Gulf Hotel also has an excellent reputation. The "best" depends on your priorities - luxury, authenticity, location, or budget.',
  },
  {
    q: 'Do I need to book a Ramadan tent in advance?',
    a: 'Yes, especially for premium hotel tents. The Ritz-Carlton and similar venues should be booked days or even weeks ahead, particularly for weekends and large groups. Budget-friendly local tents may accept walk-ins, but calling ahead is always wise.',
  },
  {
    q: 'Is shisha included at Ramadan tents?',
    a: 'Most Ramadan tents in Bahrain offer shisha, though it may be charged separately from the iftar buffet. Premium venues typically have dedicated shisha lounges within the tent. Ask about shisha pricing when making your reservation.',
  },
  {
    q: 'Can families bring children to Ramadan tents?',
    a: 'Yes, most Ramadan tents welcome families with children. The atmosphere is generally family-friendly, especially earlier in the evening. Some venues may have reduced rates for children. Check with specific venues about any age policies.',
  },
  {
    q: 'What should I wear to a Ramadan tent?',
    a: 'Dress modestly and respectfully. Smart casual is appropriate for most venues. Avoid very casual clothing like shorts or sleeveless tops. Hotel tents may have slightly more formal expectations. The tent setting is traditionally carpeted, so comfortable shoes that slip on and off easily are practical.',
  },
];

export default function RamadanTentsPage() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://www.bahrainnights.com' },
    { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
    { name: 'Ramadan', url: 'https://www.bahrainnights.com/guides/ramadan' },
    { name: 'Ramadan Tents', url: 'https://www.bahrainnights.com/guides/ramadan/tents' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={faqs} />
      
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Ramadan Tent Bahrain 2026 | Best Ramadan Tent Experiences',
            description: 'Guide to the best Ramadan tent experiences in Bahrain for 2026.',
            author: { '@type': 'Organization', name: 'Bahrain Nights' },
            publisher: { '@type': 'Organization', name: 'Bahrain Nights' },
            datePublished: '2026-02-01',
            dateModified: '2026-02-15',
            mainEntityOfPage: 'https://www.bahrainnights.com/guides/ramadan/tents',
          }),
        }}
      />

      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-indigo-500/5 to-violet-500/10" />
          <div className="max-w-4xl mx-auto text-center relative">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Tent className="w-8 h-8 text-purple-400" />
              <span className="text-purple-400 font-semibold">Ramadan 2026</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ramadan Tents in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-500 to-violet-500">
                Bahrain
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Experience the magic of traditional Ramadan tents. Discover where to find the best 
              tent experiences with authentic atmosphere, live entertainment, and Arabian hospitality.
            </p>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-8 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-purple-400">Traditional</div>
              <div className="text-sm text-gray-400">Experience</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-purple-400">Live Music</div>
              <div className="text-sm text-gray-400">Entertainment</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-purple-400">Shisha</div>
              <div className="text-sm text-gray-400">Post-Iftar</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-purple-400">All Budgets</div>
              <div className="text-sm text-gray-400">Options Available</div>
            </div>
          </div>
        </section>

        {/* What to Expect */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Moon className="w-8 h-8 text-purple-400" />
              What to Expect at a Ramadan Tent
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {whatToExpect.map((item, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-purple-500/30 transition-colors">
                  <item.icon className="w-6 h-6 text-purple-400 mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tent Venues */}
        <section className="py-16 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Star className="w-8 h-8 text-indigo-400" />
              Best Ramadan Tents in Bahrain
            </h2>
            <p className="text-gray-400 mb-8">From luxury hotel tents to authentic local experiences.</p>
            
            <div className="space-y-8">
              {tentVenues.map((venue, index) => (
                <div key={index} className="bg-slate-900/50 rounded-2xl p-6 border border-white/10 hover:border-indigo-500/30 transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{venue.name}</h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" /> {venue.location}
                        </span>
                        <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-400 rounded text-xs">
                          {venue.tier}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-4">{venue.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-indigo-400 mb-2">The Experience</h4>
                    <div className="flex flex-wrap gap-2">
                      {venue.experience.map((item, i) => (
                        <span key={i} className="px-2 py-1 bg-indigo-500/10 text-indigo-300 rounded text-xs">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white/5 rounded-lg p-3">
                      <h4 className="text-xs font-semibold text-gray-400 mb-1">Best For</h4>
                      <p className="text-sm text-white">{venue.bestFor}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <h4 className="text-xs font-semibold text-gray-400 mb-1">Atmosphere</h4>
                      <p className="text-sm text-white">{venue.atmosphere}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500 flex items-center gap-2 pt-4 border-t border-white/10">
                    <Clock className="w-4 h-4" /> Booking: {venue.bookingNote}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Guide */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Users className="w-8 h-8 text-violet-400" />
              Pricing Guide
            </h2>
            
            <div className="space-y-4">
              {pricingTiers.map((tier, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                    <h3 className="text-lg font-semibold text-white">{tier.tier}</h3>
                    <span className="text-violet-400 font-bold">{tier.range}</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2"><strong>Typically includes:</strong> {tier.includes}</p>
                  <p className="text-gray-500 text-sm"><strong>Examples:</strong> {tier.examples}</p>
                </div>
              ))}
            </div>
            
            <p className="text-sm text-gray-500 mt-6 text-center">
              * Prices are approximate and vary by venue and year. Always confirm current pricing when booking.
            </p>
          </div>
        </section>

        {/* FAQs Display */}
        <section className="py-16 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-slate-900/50 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
                  <p className="text-gray-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Explore More Iftar Options</h2>
            <p className="text-gray-400 mb-6">
              Discover all the ways to experience Ramadan dining in Bahrain.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/guides/ramadan/best-iftars" className="px-6 py-3 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-400 transition-colors">
                All Iftars Guide
              </Link>
              <Link href="/guides/ramadan/iftar-luxury" className="px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors">
                Luxury Iftars
              </Link>
              <Link href="/guides/ramadan/iftar-budget" className="px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors">
                Budget Iftars
              </Link>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <InternalLinks
          title="Explore More"
          links={[
            { href: '/guides/ramadan', title: 'Complete Ramadan Guide' },
            { href: '/guides/ramadan/best-iftars', title: 'Best Iftars' },
            { href: '/guides/ramadan/ghabga', title: 'Ghabga Guide' },
            { href: '/guides/ramadan/suhoor', title: 'Suhoor Guide' },
            { href: '/guides/shisha', title: 'Shisha Lounges' },
            { href: '/guides/arabic-restaurants', title: 'Arabic Restaurants' },
          ]}
        />
      </main>
    </>
  );
}
