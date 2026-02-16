import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Moon, MapPin, Users, Heart, Gift, 
  ShoppingBag, Star, Sparkles, BookOpen
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import InternalLinks from '@/components/SEO/InternalLinks';

export const metadata: Metadata = {
  title: 'Ramadan Activities for Kids & Families in Bahrain 2026 | Family Guide',
  description: 'Discover family-friendly Ramadan activities in Bahrain. Kid-friendly iftars, mall events, educational experiences, Gergaoun celebrations, and fun for the whole family.',
  keywords: 'Ramadan activities for kids Bahrain, family Ramadan Bahrain, kids iftar Bahrain, Gergaoun Bahrain, Ramadan family activities, Ramadan kids events Bahrain',
  openGraph: {
    title: 'Ramadan Activities for Kids & Families in Bahrain 2026',
    description: 'Family-friendly Ramadan activities, kid-friendly iftars, and fun experiences for children in Bahrain.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/ramadan/family-activities',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/ramadan/family-activities',
  },
};

const familyIftarSpots = [
  {
    name: 'Hotel Iftar Buffets',
    description: 'Major hotels like Four Seasons, Ritz-Carlton, and Gulf Hotel offer family-friendly iftar buffets with dedicated kids\' sections, high chairs, and activities to keep children entertained.',
    highlights: ['Kids menu options', 'High chairs available', 'Family seating areas', 'Entertainment'],
    priceRange: 'BD 15-25 for kids (varies by hotel)',
  },
  {
    name: 'Mall Food Courts',
    description: 'After iftar time, mall food courts become lively family spots. City Centre Bahrain, Seef Mall, and The Avenues have diverse food options and nearby play areas.',
    highlights: ['Variety of cuisines', 'Near play areas', 'Affordable options', 'Air-conditioned'],
    priceRange: 'BD 3-10 per person',
  },
  {
    name: 'Family Restaurants',
    description: 'Many family restaurants offer special Ramadan menus. Look for restaurants with dedicated family sections and kids\' menus at popular spots in Seef, Adliya, and Juffair.',
    highlights: ['Kids menus', 'Family atmosphere', 'Early opening at iftar', 'Takeaway available'],
    priceRange: 'BD 8-20 per person',
  },
];

const mallActivities = [
  {
    name: 'City Centre Bahrain',
    location: 'Seef',
    activities: ['Ramadan decorations & photo spots', 'Kids play areas (Magic Planet)', 'Gergaoun events mid-Ramadan', 'Extended shopping hours after iftar'],
  },
  {
    name: 'Seef Mall',
    location: 'Seef',
    activities: ['Traditional Ramadan displays', 'Fun Factory entertainment', 'Family dining options', 'Late-night shopping atmosphere'],
  },
  {
    name: 'The Avenues Bahrain',
    location: 'Bahrain Bay',
    activities: ['Beautiful Ramadan decor', 'Premium family dining', 'Kids entertainment zones', 'Waterfront evening walks'],
  },
  {
    name: 'Bahrain Mall',
    location: 'Seef',
    activities: ['Wahooo! Waterpark access', 'Family entertainment center', 'Budget-friendly food court', 'Local shopping experience'],
  },
];

const gergaounInfo = {
  title: 'Gergaoun — Mid-Ramadan Children\'s Celebration',
  description: 'Gergaoun (also spelled Girgian) is a beloved Bahraini tradition held on the 14th and 15th nights of Ramadan. Children dress in traditional clothes and go door-to-door singing traditional songs, collecting nuts, sweets, and treats from neighbors.',
  traditions: [
    'Children wear traditional Bahraini clothing',
    'They carry decorated bags or baskets',
    'Families prepare sweets and nuts to distribute',
    'Traditional songs are sung at each door',
    'Malls and community centers host organized events',
  ],
  tips: [
    'Check mall social media for Gergaoun event dates',
    'Prepare treats if you live in a residential area',
    'Traditional costumes available at souqs and malls',
    'Great photo opportunity for families',
  ],
};

const educationalExperiences = [
  {
    title: 'Mosque Visits',
    description: 'Al-Fateh Grand Mosque offers educational tours suitable for families. Children can learn about Islamic architecture, traditions, and the significance of Ramadan in a welcoming environment.',
    icon: Moon,
  },
  {
    title: 'Bahrain National Museum',
    description: 'The national museum provides context about Bahraini culture and history. During Ramadan, evening visits are pleasant and educational for children.',
    icon: BookOpen,
  },
  {
    title: 'Traditional Souks',
    description: 'Walking through Bab Al Bahrain Souq or Muharraq Souq teaches children about traditional trades, local goods, and bargaining culture. Evening visits after iftar are best.',
    icon: ShoppingBag,
  },
  {
    title: 'Cooking Ramadan Dishes',
    description: 'Many families involve children in preparing iftar dishes like luqaimat (sweet dumplings), harees, or thareed. Some cooking classes offer family sessions during Ramadan.',
    icon: Heart,
  },
];

const craftIdeas = [
  {
    name: 'Ramadan Lanterns',
    description: 'Create paper or cardboard lanterns (fanoos) using colored paper, scissors, and glue. Decorate with crescent moons and stars.',
    materials: ['Colored paper', 'Scissors', 'Glue', 'String lights (optional)'],
  },
  {
    name: 'Countdown Calendar',
    description: 'Make a Ramadan countdown calendar with 30 pockets or boxes. Add treats, good deed suggestions, or Ramadan facts for each day.',
    materials: ['Cardboard', 'Small envelopes or cups', 'Decorations', 'Treats'],
  },
  {
    name: 'Gergaoun Bags',
    description: 'Decorate cloth or paper bags for collecting Gergaoun treats. Use fabric paint, stickers, and glitter.',
    materials: ['Plain bags', 'Fabric markers', 'Stickers', 'Ribbon'],
  },
  {
    name: 'Moon & Star Art',
    description: 'Create artwork featuring crescents and stars using paint, collage, or mixed media. Perfect for decorating the home.',
    materials: ['Canvas or paper', 'Paint', 'Glitter', 'Stamps'],
  },
];

const faqs = [
  {
    q: 'What age should children start fasting?',
    a: 'There\'s no fixed age — it depends on the child. Many families start with half-day fasts around age 7-10, gradually building up. Full fasting typically begins after puberty, but it\'s a personal family decision.',
  },
  {
    q: 'Are there Ramadan events specifically for children?',
    a: 'Yes! Malls often host Gergaoun celebrations, storytelling sessions, and craft activities. Hotels may have kids\' entertainment during iftar. Check mall social media for specific dates closer to Ramadan.',
  },
  {
    q: 'Can non-Muslim children participate in Gergaoun?',
    a: 'Absolutely! Gergaoun is a cultural celebration that welcomes all children. Many expat families join in the festivities, and it\'s a wonderful way for children to experience Bahraini traditions.',
  },
  {
    q: 'What should families wear during Ramadan outings?',
    a: 'Modest clothing is appreciated during Ramadan. For children, comfortable, respectful attire is fine. At mosques, traditional clothing or modest dress is required (abayas provided for women/girls).',
  },
];

export default function RamadanFamilyActivitiesPage() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://www.bahrainnights.com' },
    { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
    { name: 'Ramadan', url: 'https://www.bahrainnights.com/guides/ramadan' },
    { name: 'Family Activities', url: 'https://www.bahrainnights.com/guides/ramadan/family-activities' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Ramadan Activities for Kids & Families in Bahrain 2026',
            description: 'Guide to family-friendly Ramadan activities in Bahrain.',
            author: { '@type': 'Organization', name: 'Bahrain Nights' },
            publisher: { '@type': 'Organization', name: 'Bahrain Nights' },
            datePublished: '2026-02-01',
            dateModified: '2026-02-16',
            mainEntityOfPage: 'https://www.bahrainnights.com/guides/ramadan/family-activities',
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

      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 via-purple-500/5 to-amber-500/10" />
          <div className="max-w-4xl mx-auto text-center relative">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-8 h-8 text-amber-400" />
              <span className="text-amber-400 font-semibold">Family Guide</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ramadan Activities for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-purple-500 to-amber-400">
                Kids & Families
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Make Ramadan memorable for the whole family with kid-friendly iftars, 
              fun activities, educational experiences, and beloved traditions like Gergaoun.
            </p>
          </div>
        </section>

        {/* Family Iftar Spots */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Users className="w-8 h-8 text-rose-400" />
              Family-Friendly Iftar Spots
            </h2>
            <p className="text-gray-400 mb-8">Where to break fast with children in tow.</p>
            
            <div className="space-y-6">
              {familyIftarSpots.map((spot, index) => (
                <div key={index} className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-rose-500/30 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{spot.name}</h3>
                      <p className="text-rose-400 text-sm">{spot.priceRange}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">{spot.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {spot.highlights.map((h, i) => (
                      <span key={i} className="px-3 py-1 bg-rose-500/10 text-rose-400 rounded-full text-sm">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gergaoun Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-rose-500/10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <Gift className="w-8 h-8 text-amber-400" />
              <h2 className="text-3xl font-bold text-white">{gergaounInfo.title}</h2>
            </div>
            <p className="text-gray-300 mb-8">{gergaounInfo.description}</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-xl p-6 border border-amber-500/20">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-400" /> Traditions
                </h3>
                <ul className="space-y-2">
                  {gergaounInfo.traditions.map((t, i) => (
                    <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                      <span className="text-amber-400 mt-1">•</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white/5 rounded-xl p-6 border border-amber-500/20">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-400" /> Tips for Families
                </h3>
                <ul className="space-y-2">
                  {gergaounInfo.tips.map((t, i) => (
                    <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                      <span className="text-rose-400 mt-1">•</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Mall Activities */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <ShoppingBag className="w-8 h-8 text-purple-400" />
              Mall Activities & Events
            </h2>
            <p className="text-gray-400 mb-8">Malls become family hubs during Ramadan with special events and extended hours.</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {mallActivities.map((mall, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-purple-500/30 transition-colors">
                  <h3 className="text-lg font-bold text-white mb-1">{mall.name}</h3>
                  <p className="text-purple-400 text-sm flex items-center gap-1 mb-3">
                    <MapPin className="w-4 h-4" /> {mall.location}
                  </p>
                  <ul className="space-y-1">
                    {mall.activities.map((a, i) => (
                      <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                        <span className="text-purple-400">•</span> {a}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Educational Experiences */}
        <section className="py-16 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-indigo-400" />
              Educational Experiences
            </h2>
            <p className="text-gray-400 mb-8">Learning opportunities that make Ramadan meaningful for children.</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {educationalExperiences.map((exp, index) => (
                <div key={index} className="bg-slate-900/50 rounded-xl p-6 border border-white/10 hover:border-indigo-500/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-indigo-500/20 rounded-lg">
                      <exp.icon className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">{exp.title}</h3>
                      <p className="text-gray-300 text-sm">{exp.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Craft Ideas */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-amber-400" />
              Ramadan Craft Ideas
            </h2>
            <p className="text-gray-400 mb-8">Fun projects to do at home with kids during Ramadan.</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {craftIdeas.map((craft, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-amber-500/30 transition-colors">
                  <h3 className="text-lg font-bold text-white mb-2">{craft.name}</h3>
                  <p className="text-gray-300 text-sm mb-3">{craft.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {craft.materials.map((m, i) => (
                      <span key={i} className="px-2 py-0.5 bg-amber-500/10 text-amber-400 rounded text-xs">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-slate-900/50 rounded-xl p-6 border border-white/10">
                  <h3 className="font-bold text-white mb-2">{faq.q}</h3>
                  <p className="text-gray-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">More Ramadan Guides</h2>
            <p className="text-gray-400 mb-6">
              Explore our complete collection of Ramadan guides for the perfect family experience.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/guides/ramadan/best-iftars" className="px-6 py-3 bg-amber-500 text-black rounded-lg font-medium hover:bg-amber-400 transition-colors">
                Best Iftars
              </Link>
              <Link href="/guides/ramadan/decorations" className="px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors">
                Ramadan Decorations
              </Link>
              <Link href="/guides/ramadan" className="px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors">
                Complete Guide
              </Link>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <InternalLinks
          title="Related Guides"
          links={[
            { href: '/guides/ramadan', title: 'Ramadan Guide' },
            { href: '/guides/ramadan/things-to-do', title: 'Things to Do' },
            { href: '/guides/things-to-do-with-kids', title: 'Things to Do with Kids' },
            { href: '/guides/family-activities', title: 'Family Activities' },
            { href: '/guides/malls', title: 'Malls Guide' },
            { href: '/guides/eid-al-fitr', title: 'Eid Al Fitr' },
          ]}
        />
      </main>
    </>
  );
}
