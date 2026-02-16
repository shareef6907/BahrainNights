import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Moon, MapPin, Users, Heart, Gift, 
  Calendar, Star, Sparkles, PartyPopper,
  ShoppingBag, Utensils, Camera
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import InternalLinks from '@/components/SEO/InternalLinks';

export const metadata: Metadata = {
  title: 'Eid Al Fitr in Bahrain 2026 | Celebrations, Events & Guide',
  description: 'Complete guide to Eid Al Fitr in Bahrain 2026. Discover Eid traditions, celebration spots, family activities, prayer times, and what to expect during the festive holiday.',
  keywords: 'Eid Al Fitr Bahrain 2026, Eid celebrations Bahrain, Eid events Bahrain, Eid prayer Bahrain, Eid holiday Bahrain, what to do Eid Bahrain',
  openGraph: {
    title: 'Eid Al Fitr in Bahrain 2026 | Celebrations, Events & Guide',
    description: 'Your complete guide to celebrating Eid Al Fitr in Bahrain — traditions, family activities, and festive experiences.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/eid-al-fitr',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/eid-al-fitr',
  },
};

const eidTraditions = [
  {
    name: 'Eid Prayer (Salat al-Eid)',
    description: 'The day begins with a special congregational prayer held at mosques and designated prayer grounds across Bahrain. Families dress in their best clothes and gather for this communal worship.',
    icon: Moon,
  },
  {
    name: 'Zakat al-Fitr',
    description: 'Before Eid prayer, Muslims give charity (usually food or its monetary equivalent) to ensure everyone can celebrate. This purifies the fasting and helps those in need enjoy the festivities.',
    icon: Heart,
  },
  {
    name: 'Family Gatherings',
    description: 'After prayers, families visit each other, often starting with elders. Large family breakfasts and lunches are common, featuring special Eid dishes and sweets.',
    icon: Users,
  },
  {
    name: 'Eidiya (Gift Giving)',
    description: 'Children receive "Eidiya" — money or gifts from relatives. It\'s traditional for elders to give to younger family members, making it a special day for kids.',
    icon: Gift,
  },
  {
    name: 'New Clothes',
    description: 'Wearing new clothes on Eid is a beloved tradition. Families often buy new outfits in the days leading up to Eid, and children especially look forward to showing off their Eid attire.',
    icon: Sparkles,
  },
  {
    name: 'Eid Greetings',
    description: 'People greet each other with "Eid Mubarak" (Blessed Eid) or "Eid Saeed" (Happy Eid). Phone calls, messages, and visits to friends and neighbors are customary.',
    icon: PartyPopper,
  },
];

const celebrationSpots = [
  {
    name: 'Major Malls',
    location: 'City Centre, Seef Mall, The Avenues',
    description: 'Malls host Eid celebrations with decorations, entertainment, and activities. Expect crowds, festive atmosphere, and extended hours during Eid holidays.',
    activities: ['Kids entertainment', 'Eid decorations & photo spots', 'Restaurant specials', 'Shopping sales'],
  },
  {
    name: 'Hotels & Resorts',
    location: 'Various',
    description: 'Many hotels offer special Eid brunches, family activities, and pool/beach access packages. Popular for families wanting a relaxed celebration.',
    activities: ['Eid brunches', 'Pool parties', 'Kids clubs', 'Special menus'],
  },
  {
    name: 'Parks & Public Spaces',
    location: 'Prince Khalifa Park, Al Areen, various',
    description: 'Families gather at parks for picnics and outdoor celebrations. The weather in late March is typically pleasant for outdoor activities.',
    activities: ['Family picnics', 'Children\'s play areas', 'BBQ spots', 'Nature walks'],
  },
  {
    name: 'Restaurants',
    location: 'Throughout Bahrain',
    description: 'Restaurants are busy during Eid with family gatherings. Many offer special Eid menus or buffets. Reservations recommended for popular spots.',
    activities: ['Eid brunches', 'Family dinners', 'Special menus', 'Private dining'],
  },
];

const familyActivities = [
  {
    title: 'Wahooo! Waterpark',
    location: 'Bahrain Mall',
    description: 'Indoor waterpark perfect for Eid family fun. Slides, wave pool, and activities for all ages.',
  },
  {
    title: 'Bahrain National Museum',
    location: 'Manama',
    description: 'Cultural outing with exhibitions about Bahraini heritage. Often has special programming during holidays.',
  },
  {
    title: 'Lost Paradise of Dilmun',
    location: 'A\'ali',
    description: 'Bahrain\'s largest waterpark with themed areas and rides. A full day of entertainment for families.',
  },
  {
    title: 'Gravity Indoor Trampoline Park',
    location: 'Seef',
    description: 'Active fun for kids and adults with trampolines, foam pits, and obstacle courses.',
  },
  {
    title: 'Beach Clubs & Hotels',
    location: 'Various',
    description: 'Many beach clubs offer day passes for Eid. Swimming, beach activities, and family-friendly facilities.',
  },
  {
    title: 'Bahrain Fort (Qal\'at al-Bahrain)',
    location: 'Karbabad',
    description: 'UNESCO World Heritage site with grounds perfect for family walks and picnics. Beautiful at sunset.',
  },
];

const whatToExpect = [
  {
    title: 'Public Holiday',
    content: 'Eid Al Fitr is a public holiday in Bahrain, typically 3-4 days. Government offices, schools, and many businesses close. Some private businesses may have reduced hours.',
  },
  {
    title: 'Timing',
    content: 'Eid Al Fitr 2026 is expected around March 30-31, depending on moon sighting. The exact date is confirmed 1-2 days before by religious authorities.',
  },
  {
    title: 'Atmosphere',
    content: 'The mood shifts from the reflective nature of Ramadan to joyful celebration. People are in high spirits, families gather, and there\'s a festive energy everywhere.',
  },
  {
    title: 'Crowds',
    content: 'Popular destinations like malls, restaurants, and attractions are very busy during Eid. Plan ahead, make reservations, and expect queues.',
  },
];

const faqs = [
  {
    q: 'When is Eid Al Fitr 2026 in Bahrain?',
    a: 'Eid Al Fitr 2026 is expected around March 30-31, but the exact date depends on the moon sighting that marks the end of Ramadan. The date is officially confirmed by religious authorities 1-2 days before.',
  },
  {
    q: 'How long is the Eid holiday in Bahrain?',
    a: 'Eid Al Fitr is typically a 3-4 day public holiday in Bahrain. Government offices and schools close, while private businesses may operate with reduced hours or close entirely.',
  },
  {
    q: 'What should I wear for Eid celebrations?',
    a: 'People typically wear their best clothes — often new outfits purchased for the occasion. For visitors, smart casual attire is appropriate. At mosques, modest clothing is required.',
  },
  {
    q: 'Are restaurants open during Eid?',
    a: 'Yes, most restaurants are open and often very busy with family gatherings. Many offer special Eid menus or buffets. Reservations are highly recommended for popular venues.',
  },
  {
    q: 'Can tourists visit Bahrain during Eid?',
    a: 'Absolutely! Eid is a wonderful time to experience Bahraini culture and hospitality. Just be aware that some services may have holiday hours, and popular spots will be busy with local celebrations.',
  },
];

export default function EidAlFitrPage() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://www.bahrainnights.com' },
    { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
    { name: 'Eid Al Fitr', url: 'https://www.bahrainnights.com/guides/eid-al-fitr' },
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
            headline: 'Eid Al Fitr in Bahrain 2026 | Celebrations, Events & Guide',
            description: 'Complete guide to Eid Al Fitr celebrations in Bahrain.',
            author: { '@type': 'Organization', name: 'Bahrain Nights' },
            publisher: { '@type': 'Organization', name: 'Bahrain Nights' },
            datePublished: '2026-02-01',
            dateModified: '2026-02-16',
            mainEntityOfPage: 'https://www.bahrainnights.com/guides/eid-al-fitr',
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
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-rose-500/5 to-purple-500/10" />
          <div className="max-w-4xl mx-auto text-center relative">
            <div className="flex items-center justify-center gap-2 mb-4">
              <PartyPopper className="w-8 h-8 text-amber-400" />
              <span className="text-amber-400 font-semibold">Eid Mubarak!</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Eid Al Fitr in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-500 to-purple-400">
                Bahrain 2026
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-6">
              Celebrate the joyous festival marking the end of Ramadan. Discover traditions, 
              celebration spots, and how to make the most of Eid in the Kingdom of Bahrain.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 text-amber-400 rounded-full">
              <Calendar className="w-5 h-5" />
              <span>Expected: Around March 30-31, 2026 (moon sighting dependent)</span>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-8 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Holiday Duration', value: '3-4 days', icon: Calendar },
              { label: 'Key Activity', value: 'Family time', icon: Users },
              { label: 'Tradition', value: 'Eidiya gifts', icon: Gift },
              { label: 'Atmosphere', value: 'Festive', icon: Sparkles },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-amber-400" />
                <div className="text-lg font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Eid Traditions */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Star className="w-8 h-8 text-amber-400" />
              Eid Traditions
            </h2>
            <p className="text-gray-400 mb-8">The customs and traditions that make Eid special.</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {eidTraditions.map((tradition, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-amber-500/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-amber-500/20 rounded-lg">
                      <tradition.icon className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">{tradition.name}</h3>
                      <p className="text-gray-300 text-sm">{tradition.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What to Expect */}
        <section className="py-16 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Calendar className="w-8 h-8 text-purple-400" />
              What to Expect
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {whatToExpect.map((item, index) => (
                <div key={index} className="bg-slate-900/50 rounded-xl p-6 border border-purple-500/20">
                  <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-300 text-sm">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Celebration Spots */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <MapPin className="w-8 h-8 text-rose-400" />
              Where to Celebrate
            </h2>
            <p className="text-gray-400 mb-8">Popular spots for Eid festivities in Bahrain.</p>
            
            <div className="space-y-6">
              {celebrationSpots.map((spot, index) => (
                <div key={index} className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-rose-500/30 transition-colors">
                  <h3 className="text-xl font-bold text-white mb-1">{spot.name}</h3>
                  <p className="text-rose-400 text-sm flex items-center gap-1 mb-3">
                    <MapPin className="w-4 h-4" /> {spot.location}
                  </p>
                  <p className="text-gray-300 mb-4">{spot.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {spot.activities.map((a, i) => (
                      <span key={i} className="px-3 py-1 bg-rose-500/10 text-rose-400 rounded-full text-sm">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Family Activities */}
        <section className="py-16 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Users className="w-8 h-8 text-indigo-400" />
              Family Activities
            </h2>
            <p className="text-gray-400 mb-8">Fun places to take the family during Eid holidays.</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {familyActivities.map((activity, index) => (
                <div key={index} className="bg-slate-900/50 rounded-xl p-5 border border-white/10 hover:border-indigo-500/30 transition-colors">
                  <h3 className="text-lg font-bold text-white mb-1">{activity.title}</h3>
                  <p className="text-indigo-400 text-sm mb-2">{activity.location}</p>
                  <p className="text-gray-300 text-sm">{activity.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="font-bold text-white mb-2">{faq.q}</h3>
                  <p className="text-gray-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-amber-500/20 to-rose-500/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Explore More Guides</h2>
            <p className="text-gray-400 mb-6">
              Plan your perfect Eid and discover more of Bahrain.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/guides/ramadan" className="px-6 py-3 bg-amber-500 text-black rounded-lg font-medium hover:bg-amber-400 transition-colors">
                Ramadan Guide
              </Link>
              <Link href="/guides/things-to-do-with-kids" className="px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors">
                Kids Activities
              </Link>
              <Link href="/guides/restaurants" className="px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors">
                Restaurants Guide
              </Link>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <InternalLinks
          title="Related Guides"
          links={[
            { href: '/guides/ramadan', title: 'Ramadan Guide' },
            { href: '/guides/ramadan/best-iftars', title: 'Best Iftars' },
            { href: '/guides/family-activities', title: 'Family Activities' },
            { href: '/guides/brunches', title: 'Brunches' },
            { href: '/guides/malls', title: 'Malls Guide' },
            { href: '/guides/restaurants', title: 'Restaurants' },
          ]}
        />
      </main>
    </>
  );
}
