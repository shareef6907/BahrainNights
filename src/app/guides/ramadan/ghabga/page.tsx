import { Metadata } from 'next';

// Static page with ISR - revalidate every hour
export const revalidate = 3600;
import Link from 'next/link';
import { 
  Moon, Clock, MapPin, Star, Utensils, Users, 
  DollarSign, Phone, Sparkles, Music
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import InternalLinks from '@/components/SEO/InternalLinks';

export const metadata: Metadata = {
  title: 'Best Ghabga in Bahrain 2026 | Top Ghabga Tents & Late Night Ramadan',
  description: 'Discover the best ghabga spots in Bahrain for Ramadan 2026. From luxury hotel ghabga tents to traditional venues, find the perfect late-night Ramadan gathering.',
  keywords: 'ghabga Bahrain 2026, best ghabga Bahrain, ghabga deals Bahrain, ghabga tent Bahrain, late night Ramadan Bahrain, Ramadan gathering Bahrain',
  openGraph: {
    title: 'Best Ghabga in Bahrain 2026 | Top Ghabga Tents & Late Night Ramadan',
    description: 'Find the best ghabga experiences in Bahrain - luxury hotels, traditional tents, and late-night gatherings.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/ramadan/ghabga',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/ramadan/ghabga',
  },
};

const luxuryGhabgas = [
  {
    name: 'The Ritz-Carlton Ghabga Tent',
    location: 'Seef',
    price: 'BD 38-55',
    rating: 4.9,
    description: 'The most prestigious ghabga experience in Bahrain. The Ritz-Carlton\'s legendary Ramadan tent transforms into a magical late-night gathering space with live Arabic entertainment, premium shisha, and an extensive spread of traditional delicacies.',
    highlights: ['Live oud & Arabic music', 'Premium shisha selection', 'Traditional Arabic sweets', 'VIP majlis areas', 'Valet parking'],
    phone: '+973 1758 0000',
    bookingTip: 'Book VIP majlis areas at least 1 week in advance for groups.',
  },
  {
    name: 'Four Seasons Bahrain Bay',
    location: 'Bahrain Bay',
    price: 'BD 42-60',
    rating: 4.8,
    description: 'Elegant late-night Ramadan experience with stunning bay views. The Four Seasons offers a sophisticated ghabga atmosphere with live cooking stations, traditional entertainment, and impeccable service.',
    highlights: ['Panoramic bay views', 'Live cooking stations', 'Premium dates & Arabic coffee', 'Elegant ambiance', 'Private dining options'],
    phone: '+973 1711 5000',
    bookingTip: 'Request waterfront seating for the best atmosphere.',
  },
  {
    name: 'Gulf Hotel Al Andalus Tent',
    location: 'Adliya',
    price: 'BD 30-45',
    rating: 4.7,
    description: 'A Bahrain institution for Ramadan gatherings. The Gulf Hotel\'s ghabga tent offers authentic atmosphere, excellent Lebanese cuisine, and great value for money. Perfect for large family gatherings.',
    highlights: ['Authentic tent atmosphere', 'Lebanese cuisine', 'Large capacity', 'Shisha lounge', 'Central location'],
    phone: '+973 1771 3000',
    bookingTip: 'Great for corporate gatherings. Group packages available.',
  },
];

const traditionalVenues = [
  {
    name: 'Al Waha Traditional Tent',
    location: 'Multiple locations',
    price: 'BD 18-28',
    rating: 4.6,
    description: 'Authentic Bahraini ghabga experience at accessible prices. Al Waha captures the true spirit of Ramadan gatherings with traditional décor, Arabic hospitality, and excellent shisha.',
    highlights: ['Authentic atmosphere', 'Budget-friendly', 'Traditional Arabic food', 'Premium shisha', 'Family-friendly'],
    phone: '+973 1772 2222',
    bookingTip: 'Arrives early on weekends - very popular with locals.',
  },
  {
    name: 'Mövenpick Bahrain Ghabga',
    location: 'Muharraq',
    price: 'BD 25-35',
    rating: 4.5,
    description: 'Waterfront ghabga with a relaxed vibe. The Mövenpick offers a perfect blend of luxury and accessibility, featuring traditional Arabic hospitality with their signature hospitality.',
    highlights: ['Waterfront setting', 'Swiss-Arabic fusion', 'Outdoor seating', 'Family packages', 'Free parking'],
    phone: '+973 1746 0000',
    bookingTip: 'Thursday nights are busiest - book ahead.',
  },
  {
    name: 'Reef Resort Ramadan Tent',
    location: 'Bahrain Bay',
    price: 'BD 22-32',
    rating: 4.5,
    description: 'Beachfront ghabga experience with fresh seafood focus. Enjoy the sea breeze while gathering with friends and family for late-night Ramadan celebrations.',
    highlights: ['Beachfront location', 'Fresh seafood', 'Sunset views', 'Relaxed atmosphere', 'Shisha available'],
    phone: '+973 1311 3333',
    bookingTip: 'Book outdoor tables for the best experience.',
  },
];

const budgetOptions = [
  {
    name: 'Saffron by Jena',
    location: 'Adliya',
    price: 'BD 15-22',
    rating: 4.5,
    description: 'Intimate ghabga setting with exceptional Indian cuisine. A cozy alternative to the big hotel tents, perfect for smaller gatherings.',
    highlights: ['Authentic Indian', 'Cozy atmosphere', 'Great biryani', 'Affordable'],
  },
  {
    name: 'Takht Jamsheed',
    location: 'Adliya',
    price: 'BD 18-28',
    rating: 4.4,
    description: 'Persian-style ghabga with traditional Iranian hospitality. Excellent kebabs and saffron rice make this a unique late-night option.',
    highlights: ['Persian cuisine', 'Unique experience', 'Kebab variety', 'Traditional décor'],
  },
  {
    name: 'Café Lilou',
    location: 'Adliya',
    price: 'BD 12-20',
    rating: 4.4,
    description: 'French-Arabian fusion for those wanting something different. Light bites and excellent Arabic coffee in a charming courtyard setting.',
    highlights: ['French-Arabian fusion', 'Courtyard seating', 'Light menu', 'Great coffee'],
  },
];

const faqs = [
  {
    q: 'What is ghabga in Bahrain?',
    a: 'Ghabga is a traditional late-night Ramadan gathering that takes place after Taraweeh prayers (around 10-11 PM). It\'s a social occasion where family and friends come together to enjoy food, Arabic coffee, sweets, and conversation. Unlike iftar (breaking fast) or suhoor (pre-dawn meal), ghabga is purely a social gathering.',
  },
  {
    q: 'What time does ghabga typically start in Bahrain?',
    a: 'Ghabga typically starts around 10:00 PM to 11:00 PM, after Taraweeh prayers. Most venues serve ghabga until 2:00 AM or later. The late timing allows families to complete their evening prayers before gathering for this social tradition.',
  },
  {
    q: 'What is served at a traditional Bahraini ghabga?',
    a: 'Traditional ghabga spreads include Arabic coffee (gahwa), dates, luqaimat (sweet dumplings), balaleet (sweet vermicelli), harees, machboos, sambousas, Arabic sweets like kunafa and baklava, fresh fruits, and shisha. Many venues also offer international options.',
  },
  {
    q: 'How much does ghabga cost in Bahrain 2026?',
    a: 'Ghabga prices in Bahrain range from BD 15-25 at traditional venues to BD 40-60 at luxury hotels. Most mid-range options fall between BD 25-35 per person. Prices usually include the buffet spread, Arabic coffee, and sweets. Shisha is often extra.',
  },
  {
    q: 'Do I need to book ghabga in advance?',
    a: 'Yes, especially for popular venues and weekend nights (Thursday-Friday). Luxury hotel tents should be booked 3-5 days in advance. Traditional venues may accept walk-ins on weekdays, but booking is recommended during the last 10 days of Ramadan.',
  },
  {
    q: 'What is the difference between ghabga and suhoor?',
    a: 'Ghabga is a social gathering after Taraweeh prayers (10 PM-2 AM) focused on socializing with light food and Arabic coffee. Suhoor is the pre-dawn meal before the fast begins (3-4 AM), which is the last meal before fasting. Both are distinct Ramadan traditions.',
  },
];

export default function GhabgaPage() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://www.bahrainnights.com' },
    { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
    { name: 'Ramadan', url: 'https://www.bahrainnights.com/guides/ramadan' },
    { name: 'Best Ghabga', url: 'https://www.bahrainnights.com/guides/ramadan/ghabga' },
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
            headline: 'Best Ghabga in Bahrain 2026 | Top Ghabga Tents & Late Night Ramadan',
            description: 'Comprehensive guide to the best ghabga spots in Bahrain for Ramadan 2026.',
            author: { '@type': 'Organization', name: 'Bahrain Nights' },
            publisher: { '@type': 'Organization', name: 'Bahrain Nights' },
            datePublished: '2026-02-01',
            dateModified: '2026-02-15',
            mainEntityOfPage: 'https://www.bahrainnights.com/guides/ramadan/ghabga',
          }),
        }}
      />

      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-indigo-500/5 to-blue-500/10" />
          <div className="max-w-4xl mx-auto text-center relative">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Moon className="w-8 h-8 text-purple-400" />
              <span className="text-purple-400 font-semibold">Ramadan 2026</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Best Ghabga in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-500">
                Bahrain
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Experience the magic of late-night Ramadan gatherings. From luxury hotel tents to traditional venues, 
              discover where to enjoy ghabga with family and friends this Ramadan 2026.
            </p>
          </div>
        </section>

        {/* What is Ghabga */}
        <section className="py-8 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <div className="bg-purple-500/10 rounded-2xl p-6 border border-purple-500/20">
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                What is Ghabga?
              </h2>
              <p className="text-gray-300">
                Ghabga is a cherished Bahraini Ramadan tradition - a late-night social gathering after Taraweeh prayers 
                where families and friends come together to share Arabic coffee, traditional sweets, light snacks, and 
                conversation. It&apos;s the heart of Ramadan social life in Bahrain, typically running from 10 PM to 2 AM.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4">
            <a href="#luxury" className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-full hover:bg-purple-500/30 transition-colors">
              Luxury Hotels
            </a>
            <a href="#traditional" className="px-4 py-2 bg-indigo-500/20 text-indigo-400 rounded-full hover:bg-indigo-500/30 transition-colors">
              Traditional Venues
            </a>
            <a href="#budget" className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full hover:bg-blue-500/30 transition-colors">
              Budget Options
            </a>
            <a href="#tips" className="px-4 py-2 bg-teal-500/20 text-teal-400 rounded-full hover:bg-teal-500/30 transition-colors">
              Ghabga Tips
            </a>
          </div>
        </section>

        {/* Luxury Ghabgas */}
        <section id="luxury" className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Star className="w-8 h-8 text-purple-400" />
              Luxury Hotel Ghabgas
            </h2>
            <p className="text-gray-400 mb-8">Premium late-night Ramadan experiences with exceptional service and entertainment.</p>
            
            <div className="space-y-6">
              {luxuryGhabgas.map((venue, index) => (
                <div key={index} className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{venue.name}</h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" /> {venue.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" /> {venue.price}
                        </span>
                        <span className="flex items-center gap-1 text-purple-400">
                          <Star className="w-4 h-4 fill-current" /> {venue.rating}
                        </span>
                      </div>
                    </div>
                    <a href={`tel:${venue.phone}`} className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-400 transition-colors">
                      <Phone className="w-4 h-4" /> Book Now
                    </a>
                  </div>
                  <p className="text-gray-300 mb-4">{venue.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {venue.highlights.map((highlight, i) => (
                      <span key={i} className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm">
                        {highlight}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Tip: {venue.bookingTip}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Traditional Venues */}
        <section id="traditional" className="py-16 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Moon className="w-8 h-8 text-indigo-400" />
              Traditional Ghabga Venues
            </h2>
            <p className="text-gray-400 mb-8">Authentic Ramadan atmosphere with traditional hospitality and excellent value.</p>
            
            <div className="space-y-6">
              {traditionalVenues.map((venue, index) => (
                <div key={index} className="bg-slate-900/50 rounded-2xl p-6 border border-white/10 hover:border-indigo-500/30 transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{venue.name}</h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" /> {venue.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" /> {venue.price}
                        </span>
                        <span className="flex items-center gap-1 text-indigo-400">
                          <Star className="w-4 h-4 fill-current" /> {venue.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">{venue.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {venue.highlights.map((highlight, i) => (
                      <span key={i} className="px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-sm">
                        {highlight}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Tip: {venue.bookingTip}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Budget Options */}
        <section id="budget" className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Utensils className="w-8 h-8 text-blue-400" />
              Budget-Friendly Options
            </h2>
            <p className="text-gray-400 mb-8">Cozy alternatives with great food and atmosphere at accessible prices.</p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {budgetOptions.map((venue, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-blue-500/30 transition-colors">
                  <h3 className="text-lg font-bold text-white mb-2">{venue.name}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
                    <span>{venue.location}</span>
                    <span className="text-blue-400">{venue.price}</span>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">{venue.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {venue.highlights.map((h, i) => (
                      <span key={i} className="px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded text-xs">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ghabga Tips */}
        <section id="tips" className="py-16 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Clock className="w-8 h-8 text-teal-400" />
              Ghabga Tips & Etiquette
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-900/50 rounded-xl p-6 border border-teal-500/20">
                <h3 className="text-lg font-semibold text-white mb-3">When to Go</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Ghabga starts after Taraweeh (~10 PM)</li>
                  <li>• Most venues serve until 2-3 AM</li>
                  <li>• Thursday nights are most popular</li>
                  <li>• Last 10 days of Ramadan are busiest</li>
                </ul>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-6 border border-teal-500/20">
                <h3 className="text-lg font-semibold text-white mb-3">What to Expect</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Arabic coffee & dates upon arrival</li>
                  <li>• Traditional sweets and light snacks</li>
                  <li>• Live oud music at premium venues</li>
                  <li>• Shisha available at most locations</li>
                </ul>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-6 border border-teal-500/20">
                <h3 className="text-lg font-semibold text-white mb-3">Booking Tips</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Book luxury hotels 5-7 days ahead</li>
                  <li>• Request VIP majlis for large groups</li>
                  <li>• Walk-ins possible at traditional venues</li>
                  <li>• Corporate packages offer best value</li>
                </ul>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-6 border border-teal-500/20">
                <h3 className="text-lg font-semibold text-white mb-3">Dress Code</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Smart casual at luxury hotels</li>
                  <li>• Traditional attire welcome everywhere</li>
                  <li>• Modest dress out of respect</li>
                  <li>• No strict requirements at casual venues</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
                  <p className="text-gray-300">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Planning Your Ramadan Experience?</h2>
            <p className="text-gray-400 mb-6">
              Explore more of our Ramadan guides for a complete holy month experience in Bahrain.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/guides/ramadan/best-iftars" className="px-6 py-3 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-400 transition-colors">
                Best Iftars Guide
              </Link>
              <Link href="/guides/ramadan/suhoor" className="px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors">
                Suhoor Spots
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
            { href: '/guides/ramadan/suhoor', title: 'Suhoor Spots' },
            { href: '/guides/ramadan/events', title: 'Ramadan Events' },
            { href: '/guides/ramadan/timings', title: 'Ramadan Timings' },
            { href: '/guides/shisha', title: 'Shisha Lounges' },
          ]}
        />
      </main>
    </>
  );
}
