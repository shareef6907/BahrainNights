import { Metadata } from 'next';

// Static page with ISR - revalidate every hour
export const revalidate = 3600;
import Link from 'next/link';
import { 
  Moon, MapPin, Users, Heart, Camera, 
  ShoppingBag, Compass, Clock
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import InternalLinks from '@/components/SEO/InternalLinks';

export const metadata: Metadata = {
  title: 'Things to Do in Bahrain During Ramadan 2026 | Activities & Experiences',
  description: 'Discover the best things to do in Bahrain during Ramadan. Cultural experiences, evening walks, souq visits, mosque tours, family activities, and charity opportunities.',
  keywords: 'things to do Ramadan Bahrain, Ramadan activities Bahrain, what to do Ramadan Bahrain, Ramadan experiences Bahrain, Ramadan 2026 activities',
  openGraph: {
    title: 'Things to Do in Bahrain During Ramadan 2026 | Activities & Experiences',
    description: 'Experience Ramadan in Bahrain with cultural activities, souq visits, and family-friendly experiences.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/ramadan/things-to-do',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/ramadan/things-to-do',
  },
};

const culturalExperiences = [
  {
    title: 'Visit Al-Fateh Grand Mosque',
    description: 'One of the largest mosques in the world, Al-Fateh offers free guided tours for non-Muslims. During Ramadan, the mosque has a special atmosphere, especially for Taraweeh prayers in the evening. Tours are available outside prayer times.',
    icon: Moon,
    tips: ['Tours available Saturday-Thursday', 'Dress modestly (abayas provided for women)', 'Closed during prayer times'],
  },
  {
    title: 'Experience Gergaoun',
    description: 'A beloved Bahraini tradition held on the 14th night of Ramadan. Children dress in traditional clothes and go door-to-door singing, collecting nuts and sweets. Many malls and community centers host Gergaoun celebrations.',
    icon: Heart,
    tips: ['Usually falls mid-Ramadan', 'Malls host organized events', 'Great photo opportunity'],
  },
  {
    title: 'Attend a Community Iftar',
    description: 'Many mosques and community organizations host free iftar meals for anyone to join. This is a wonderful way to experience Bahraini hospitality and meet locals. These are often simple, heartfelt gatherings.',
    icon: Users,
    tips: ['Check local mosque announcements', 'Arrive before sunset', 'Bring nothing — everything is provided'],
  },
];

const eveningActivities = [
  {
    title: 'Evening Souq Walks',
    location: 'Bab Al Bahrain Souq, Muharraq Souq',
    description: 'Traditional souqs come alive after iftar. The cool evening air makes it perfect for strolling through narrow alleyways filled with spices, textiles, and traditional goods. Muharraq Souq is especially atmospheric.',
  },
  {
    title: 'Manama Corniche Stroll',
    location: 'Manama Waterfront',
    description: 'The corniche is popular for evening walks after iftar. Families gather along the waterfront, children play, and the city lights reflect on the water. Street vendors sell snacks and drinks.',
  },
  {
    title: 'Bahrain Fort at Sunset',
    location: 'Qal\'at al-Bahrain',
    description: 'The UNESCO World Heritage site offers stunning sunset views — perfect timing for iftar picnics on the grounds. The fort area is peaceful and scenic for evening walks.',
  },
  {
    title: 'Muharraq Heritage Walk',
    location: 'Muharraq Island',
    description: 'Explore the old capital\'s traditional houses, pearl merchant homes, and historic pathways. The Sheikh Ebrahim Center often hosts cultural events during Ramadan.',
  },
];

const whatsDifferent = [
  {
    title: 'Altered Timings',
    points: [
      'Work hours typically 9 AM - 2 PM or 3 PM',
      'Most restaurants closed during daylight',
      'Shops open late afternoon, stay open late',
      'Malls bustling after iftar until midnight',
    ],
  },
  {
    title: 'Dining Changes',
    points: [
      'No public eating, drinking, or smoking during daylight',
      'Hotels serve discreetly in covered areas for guests',
      'Restaurants open at iftar (sunset) time',
      'Late-night dining culture until suhoor (pre-dawn)',
    ],
  },
  {
    title: 'Atmosphere',
    points: [
      'Roads quieter during the day, busy at iftar time',
      'Festive decorations across the city',
      'Live music and entertainment reduced',
      'Family-oriented atmosphere everywhere',
    ],
  },
  {
    title: 'Cultural Etiquette',
    points: [
      'Dress more conservatively than usual',
      'Be respectful of those fasting',
      'Greet people with "Ramadan Kareem"',
      'Charity and kindness are emphasized',
    ],
  },
];

const charityOpportunities = [
  {
    name: 'Iftar Distribution',
    description: 'Many organizations prepare and distribute iftar meals to workers and those in need. Volunteers help with packing and distribution.',
  },
  {
    name: 'Food Bank Donations',
    description: 'Bahrain Food Bank and other charities accept food and monetary donations during Ramadan to help families in need.',
  },
  {
    name: 'Mosque Volunteering',
    description: 'Local mosques often need volunteers to help organize community iftars, manage crowds, and assist with cleaning.',
  },
  {
    name: 'Zakat & Sadaqah',
    description: 'Ramadan is the traditional time for giving Zakat (obligatory charity) and Sadaqah (voluntary giving). Many collection points exist throughout Bahrain.',
  },
];

const faqs = [
  {
    q: 'Can tourists visit Bahrain during Ramadan?',
    a: 'Absolutely! Ramadan is a wonderful time to visit and experience Bahraini culture. Just be respectful of local customs — avoid eating, drinking, or smoking in public during daylight hours, and dress modestly.',
  },
  {
    q: 'What time does everything open during Ramadan?',
    a: 'Most businesses operate on reduced daytime hours (typically 9 AM - 2 PM or 3 PM). After iftar (sunset), shops and malls reopen and stay open late, often until midnight or later.',
  },
  {
    q: 'Can I eat during the day as a non-Muslim?',
    a: 'You should not eat, drink, or smoke in public during fasting hours. Hotels provide discreet dining areas for guests, and some restaurants serve takeaway. Eating in private is acceptable.',
  },
  {
    q: 'Is nightlife available during Ramadan?',
    a: 'Bars and nightclubs are typically closed during Ramadan. However, cafes, shisha lounges (after iftar), and restaurants are open late. The atmosphere is family-oriented and relaxed.',
  },
];

export default function RamadanThingsToDoPage() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://www.bahrainnights.com' },
    { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
    { name: 'Ramadan', url: 'https://www.bahrainnights.com/guides/ramadan' },
    { name: 'Things to Do', url: 'https://www.bahrainnights.com/guides/ramadan/things-to-do' },
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
            headline: 'Things to Do in Bahrain During Ramadan 2026',
            description: 'Guide to activities and experiences during Ramadan in Bahrain.',
            author: { '@type': 'Organization', name: 'Bahrain Nights' },
            publisher: { '@type': 'Organization', name: 'Bahrain Nights' },
            datePublished: '2026-02-01',
            dateModified: '2026-02-16',
            mainEntityOfPage: 'https://www.bahrainnights.com/guides/ramadan/things-to-do',
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
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-indigo-500/5 to-amber-500/10" />
          <div className="max-w-4xl mx-auto text-center relative">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Moon className="w-8 h-8 text-amber-400" />
              <span className="text-amber-400 font-semibold">Ramadan Activities</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Things to Do in Bahrain During{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-500 to-amber-400">
                Ramadan
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Experience the magic of the holy month with cultural activities, evening explorations, 
              and meaningful experiences that capture the spirit of Ramadan in Bahrain.
            </p>
          </div>
        </section>

        {/* Cultural Experiences */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Heart className="w-8 h-8 text-purple-400" />
              Cultural Experiences
            </h2>
            <p className="text-gray-400 mb-8">Immerse yourself in Bahraini traditions during the holy month.</p>
            
            <div className="space-y-6">
              {culturalExperiences.map((exp, index) => (
                <div key={index} className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-500/20 rounded-xl">
                      <exp.icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{exp.title}</h3>
                      <p className="text-gray-300 mb-4">{exp.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.tips.map((tip, i) => (
                          <span key={i} className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm">
                            {tip}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Evening Activities */}
        <section className="py-16 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Compass className="w-8 h-8 text-amber-400" />
              Evening Explorations
            </h2>
            <p className="text-gray-400 mb-8">After iftar, the city comes alive. Here&apos;s where to go.</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {eveningActivities.map((activity, index) => (
                <div key={index} className="bg-slate-900/50 rounded-xl p-6 border border-white/10 hover:border-amber-500/30 transition-colors">
                  <h3 className="text-lg font-bold text-white mb-1">{activity.title}</h3>
                  <p className="text-amber-400 text-sm flex items-center gap-1 mb-3">
                    <MapPin className="w-4 h-4" /> {activity.location}
                  </p>
                  <p className="text-gray-300 text-sm">{activity.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's Different */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Clock className="w-8 h-8 text-indigo-400" />
              What&apos;s Different During Ramadan
            </h2>
            <p className="text-gray-400 mb-8">Understanding the changes to daily life during the holy month.</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {whatsDifferent.map((item, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-6 border border-indigo-500/20">
                  <h3 className="text-lg font-semibold text-white mb-4">{item.title}</h3>
                  <ul className="space-y-2">
                    {item.points.map((point, i) => (
                      <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                        <span className="text-indigo-400 mt-1">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Charity Opportunities */}
        <section className="py-16 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Users className="w-8 h-8 text-rose-400" />
              Giving Back
            </h2>
            <p className="text-gray-400 mb-8">Ramadan emphasizes charity and community. Here&apos;s how you can participate.</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {charityOpportunities.map((charity, index) => (
                <div key={index} className="bg-slate-900/50 rounded-xl p-5 border border-white/10 hover:border-rose-500/30 transition-colors">
                  <h3 className="text-lg font-bold text-white mb-2">{charity.name}</h3>
                  <p className="text-gray-300 text-sm">{charity.description}</p>
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
        <section className="py-16 px-4 bg-gradient-to-r from-purple-500/20 to-amber-500/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Explore More Ramadan Guides</h2>
            <p className="text-gray-400 mb-6">
              Plan your perfect Ramadan experience in Bahrain with our comprehensive guides.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/guides/ramadan/best-iftars" className="px-6 py-3 bg-amber-500 text-black rounded-lg font-medium hover:bg-amber-400 transition-colors">
                Best Iftars
              </Link>
              <Link href="/guides/ramadan/family-activities" className="px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors">
                Family Activities
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
            { href: '/guides/ramadan/best-iftars', title: 'Best Iftars' },
            { href: '/guides/souks', title: 'Souks Guide' },
            { href: '/guides/historical-sites', title: 'Historical Sites' },
            { href: '/guides/museums', title: 'Museums' },
            { href: '/guides/eid-al-fitr', title: 'Eid Al Fitr' },
          ]}
        />
      </main>
    </>
  );
}
