import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Moon, Clock, MapPin, Star, Utensils, 
  Crown, Phone, Sparkles, Wine
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import InternalLinks from '@/components/SEO/InternalLinks';

export const metadata: Metadata = {
  title: 'Luxury Iftar Bahrain 2026 | Best 5-Star Hotel Iftar Buffets',
  description: 'Experience the finest luxury iftars in Bahrain for Ramadan 2026. Premium iftar buffets at Four Seasons, Ritz-Carlton, Gulf Hotel, and more 5-star venues.',
  keywords: 'luxury iftar Bahrain, best 5 star iftar Bahrain, premium iftar buffet, Four Seasons iftar, Ritz-Carlton Ramadan, Gulf Hotel iftar',
  openGraph: {
    title: 'Luxury Iftar Bahrain 2026 | Best 5-Star Hotel Iftar Buffets',
    description: 'Premium iftar experiences at Bahrain\'s finest 5-star hotels and restaurants.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/ramadan/iftar-luxury',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/ramadan/iftar-luxury',
  },
};

const luxuryHotels = [
  {
    name: 'Four Seasons Hotel Bahrain Bay',
    location: 'Bahrain Bay',
    description: 'The Four Seasons sets the standard for luxury Ramadan dining in Bahrain. Expect an exquisite spread featuring premium Arabic delicacies, live cooking stations with international cuisine, and impeccable service. The stunning bay views at sunset create a magical iftar atmosphere.',
    highlights: ['Panoramic Bahrain Bay views', 'Live cooking stations', 'Premium seafood selection', 'Traditional oud music', 'Extensive dessert selection', 'Valet parking included'],
    atmosphere: 'Elegant and sophisticated with floor-to-ceiling windows overlooking the bay.',
    bestFor: 'Special occasions, corporate entertaining, romantic iftars',
    bookingTip: 'Reserve at least 5-7 days in advance, especially for weekend iftars. Request a window table for the best views.',
    contact: 'Call the hotel directly for reservations and current pricing',
  },
  {
    name: 'The Ritz-Carlton, Bahrain',
    location: 'Seef District',
    description: 'The Ritz-Carlton\'s legendary Ramadan tent is one of Bahrain\'s most sought-after iftar experiences. The beautifully decorated tent combines Arabian hospitality with Ritz-Carlton refinement. Live entertainment and an extensive buffet make this a complete Ramadan experience.',
    highlights: ['Iconic Ramadan tent', 'Live Arabic entertainment', 'Extensive buffet spread', 'Shisha lounge', 'Private majlis areas available', 'Beachfront location'],
    atmosphere: 'Traditional Arabian tent with luxurious Ritz-Carlton touches.',
    bestFor: 'Large groups, families, corporate events, authentic tent experience',
    bookingTip: 'Book early for groups of 10+. Corporate packages available with customized menus.',
    contact: 'Contact the hotel for reservations and group packages',
  },
  {
    name: 'Gulf Hotel Bahrain Convention & Spa',
    location: 'Adliya',
    description: 'A Bahrain institution for Ramadan dining with over four decades of experience. The Gulf Hotel combines quality with consistency, featuring their acclaimed Zahle restaurant\'s Lebanese expertise. The central location and spacious venue make it ideal for gatherings.',
    highlights: ['Zahle restaurant expertise', 'Central Adliya location', 'Large capacity venue', 'Mix of Arabic & international', 'Live stations', 'Excellent value for quality'],
    atmosphere: 'Classic hotel elegance with warm Arabic hospitality.',
    bestFor: 'Business iftars, family gatherings, those seeking reliability',
    bookingTip: 'Walk-ins possible on weekdays, but reservations recommended for weekends.',
    contact: 'Reserve through the hotel for current availability',
  },
  {
    name: 'InterContinental Regency Bahrain',
    location: 'Manama',
    description: 'Located in the heart of Manama, the InterContinental offers sophisticated iftar dining with city views. Known for their attention to detail and diverse buffet featuring both traditional and contemporary dishes.',
    highlights: ['Central Manama location', 'City views', 'Diverse cuisine selection', 'Elegant setting', 'Professional service', 'Close to business district'],
    atmosphere: 'Contemporary luxury with Arabian accents.',
    bestFor: 'Business travelers, city-center convenience, after-work iftars',
    bookingTip: 'Great option for those working in Manama looking for quality after-work iftar.',
    contact: 'Contact the hotel for reservations',
  },
  {
    name: 'The Diplomat Radisson Blu Hotel',
    location: 'Diplomatic Area',
    description: 'The Diplomat offers polished iftar experiences in the prestigious Diplomatic Area. Known for quality buffets and professional service, it\'s a reliable choice for those seeking upscale dining without the highest price tags.',
    highlights: ['Diplomatic Area location', 'Quality buffet', 'Professional service', 'Business-friendly', 'Multiple dining options', 'Good value luxury'],
    atmosphere: 'Business-oriented elegance.',
    bestFor: 'Corporate iftars, diplomatic community, professional gatherings',
    bookingTip: 'Popular with the business community - book early for large groups.',
    contact: 'Reserve through the hotel',
  },
  {
    name: 'Crowne Plaza Bahrain',
    location: 'Diplomatic Area',
    description: 'Crowne Plaza delivers consistent quality with their Ramadan offerings. The hotel\'s experienced team creates a welcoming atmosphere with a well-curated buffet selection that balances Arabic traditions with international variety.',
    highlights: ['Consistent quality', 'Welcoming atmosphere', 'Well-curated buffet', 'Convenient location', 'Experienced team', 'Competitive pricing'],
    atmosphere: 'Comfortable upscale dining.',
    bestFor: 'Those seeking reliable quality, business gatherings',
    bookingTip: 'Check for special Ramadan packages that may include additional perks.',
    contact: 'Call for current Ramadan offerings',
  },
];

const whatToExpect = [
  {
    title: 'Arrival & Welcome',
    description: 'Arrive 15-20 minutes before iftar. You\'ll be greeted with dates, Arabic coffee, and water to break your fast at sunset.',
  },
  {
    title: 'The Spread',
    description: 'Luxury iftars feature extensive buffets with live cooking stations, premium ingredients, and both traditional Arabic and international cuisines.',
  },
  {
    title: 'Atmosphere',
    description: 'Expect elegant decor, often with traditional Arabian touches. Many venues feature live oud music or entertainment.',
  },
  {
    title: 'Timing',
    description: 'Plan for 2-3 hours. After the initial breaking of fast, enjoy the buffet at leisure. Some venues offer shisha after iftar.',
  },
  {
    title: 'Dress Code',
    description: 'Smart casual to business casual. While not overly formal, luxury venues expect guests to dress respectfully.',
  },
  {
    title: 'Reservations',
    description: 'Always book in advance, especially for weekends and the last 10 days of Ramadan. Groups should book at least a week ahead.',
  },
];

const faqs = [
  {
    q: 'How much does a luxury iftar cost in Bahrain?',
    a: 'Luxury hotel iftars in Bahrain typically range from BD 25-60+ per person, depending on the venue. Five-star hotels like Four Seasons and Ritz-Carlton are at the higher end, while upscale 4-star hotels offer excellent quality at slightly lower prices. Prices vary by year, so always confirm current rates when booking.',
  },
  {
    q: 'Which is the best luxury iftar in Bahrain?',
    a: 'Four Seasons Bahrain Bay and The Ritz-Carlton are consistently rated among the best luxury iftars. Four Seasons offers stunning bay views and refined dining, while Ritz-Carlton\'s Ramadan tent provides a more traditional atmosphere. Gulf Hotel is excellent value for quality. The "best" depends on your priorities - views, atmosphere, or cuisine.',
  },
  {
    q: 'Do I need to book luxury iftar in advance?',
    a: 'Yes, reservations are strongly recommended for luxury hotel iftars, especially on Thursdays, Fridays, and during the last 10 days of Ramadan. Book 5-7 days ahead for top venues like Four Seasons. Walk-ins may be possible at some hotels on quieter weekdays.',
  },
  {
    q: 'Are children welcome at luxury iftars?',
    a: 'Most luxury hotels welcome children, though the atmosphere is generally more suited to adults. Many offer children\'s menus and reduced rates for kids. Some venues have dedicated family areas. Check with the hotel about specific policies and any children\'s entertainment offered.',
  },
  {
    q: 'Can non-Muslims attend luxury iftars in Bahrain?',
    a: 'Absolutely! Luxury hotel iftars in Bahrain welcome guests of all backgrounds. It\'s a wonderful opportunity to experience Ramadan hospitality and culture. Be respectful of the occasion and dress appropriately.',
  },
  {
    q: 'Do luxury iftars include shisha?',
    a: 'Some luxury venues, particularly those with Ramadan tents like the Ritz-Carlton, offer shisha after iftar, often in dedicated lounge areas. Not all venues include shisha - check when booking if this is important to you.',
  },
];

export default function LuxuryIftarPage() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://www.bahrainnights.com' },
    { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
    { name: 'Ramadan', url: 'https://www.bahrainnights.com/guides/ramadan' },
    { name: 'Luxury Iftar', url: 'https://www.bahrainnights.com/guides/ramadan/iftar-luxury' },
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
            headline: 'Luxury Iftar Bahrain 2026 | Best 5-Star Hotel Iftar Buffets',
            description: 'Guide to the finest luxury iftars at 5-star hotels in Bahrain for Ramadan 2026.',
            author: { '@type': 'Organization', name: 'Bahrain Nights' },
            publisher: { '@type': 'Organization', name: 'Bahrain Nights' },
            datePublished: '2026-02-01',
            dateModified: '2026-02-15',
            mainEntityOfPage: 'https://www.bahrainnights.com/guides/ramadan/iftar-luxury',
          }),
        }}
      />

      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-orange-500/10" />
          <div className="max-w-4xl mx-auto text-center relative">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Crown className="w-8 h-8 text-amber-400" />
              <span className="text-amber-400 font-semibold">Ramadan 2026</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Luxury Iftar in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500">
                Bahrain
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Experience Ramadan at its finest. Discover Bahrain&apos;s most prestigious hotel iftars 
              with exquisite cuisine, elegant settings, and impeccable service.
            </p>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="py-8 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4">
            <a href="#hotels" className="px-4 py-2 bg-amber-500/20 text-amber-400 rounded-full hover:bg-amber-500/30 transition-colors">
              5-Star Hotels
            </a>
            <a href="#expect" className="px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-full hover:bg-yellow-500/30 transition-colors">
              What to Expect
            </a>
            <a href="#faqs" className="px-4 py-2 bg-orange-500/20 text-orange-400 rounded-full hover:bg-orange-500/30 transition-colors">
              FAQs
            </a>
          </div>
        </section>

        {/* Luxury Hotels */}
        <section id="hotels" className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-amber-400" />
              5-Star Hotel Iftars
            </h2>
            <p className="text-gray-400 mb-8">Bahrain&apos;s finest hotels deliver exceptional Ramadan dining experiences.</p>
            
            <div className="space-y-8">
              {luxuryHotels.map((hotel, index) => (
                <div key={index} className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-amber-500/30 transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Star className="w-5 h-5 text-amber-400 fill-current" />
                        {hotel.name}
                      </h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" /> {hotel.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-4">{hotel.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="text-sm font-semibold text-amber-400 mb-2">Highlights</h4>
                      <div className="flex flex-wrap gap-2">
                        {hotel.highlights.map((highlight, i) => (
                          <span key={i} className="px-2 py-1 bg-amber-500/10 text-amber-300 rounded text-xs">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-yellow-400 mb-2">Best For</h4>
                      <p className="text-sm text-gray-400">{hotel.bestFor}</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-4 mb-4">
                    <h4 className="text-sm font-semibold text-white mb-1">Atmosphere</h4>
                    <p className="text-sm text-gray-400">{hotel.atmosphere}</p>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Tip: {hotel.bookingTip}
                    </p>
                    <p className="text-sm text-amber-400 flex items-center gap-2">
                      <Phone className="w-4 h-4" /> {hotel.contact}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What to Expect */}
        <section id="expect" className="py-16 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Utensils className="w-8 h-8 text-yellow-400" />
              What to Expect at a Luxury Iftar
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {whatToExpect.map((item, index) => (
                <div key={index} className="bg-slate-900/50 rounded-xl p-5 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs Display */}
        <section id="faqs" className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
                  <p className="text-gray-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Explore All Iftar Options</h2>
            <p className="text-gray-400 mb-6">
              Looking for more affordable options or traditional tent experiences?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/guides/ramadan/iftar-budget" className="px-6 py-3 bg-amber-500 text-black rounded-lg font-medium hover:bg-amber-400 transition-colors">
                Budget Iftars
              </Link>
              <Link href="/guides/ramadan/tents" className="px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors">
                Ramadan Tents
              </Link>
              <Link href="/guides/ramadan/best-iftars" className="px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors">
                All Iftars Guide
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
            { href: '/guides/ramadan/tents', title: 'Ramadan Tents' },
            { href: '/guides/ramadan/ghabga', title: 'Ghabga Guide' },
            { href: '/guides/hotels', title: 'Best Hotels' },
            { href: '/guides/buffets', title: 'Best Buffets' },
          ]}
        />
      </main>
    </>
  );
}
