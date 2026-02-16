import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Moon, Clock, MapPin, Star, Utensils, 
  DollarSign, Phone, Sunrise, Coffee
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import InternalLinks from '@/components/SEO/InternalLinks';

export const metadata: Metadata = {
  title: 'Best Suhoor in Bahrain 2026 | Late Night Restaurants & Pre-Dawn Meals',
  description: 'Find the best suhoor spots in Bahrain for Ramadan 2026. From 24-hour restaurants to hotel suhoor buffets, discover where to enjoy your pre-dawn meal.',
  keywords: 'suhoor Bahrain, best suhoor spots Bahrain 2026, late night restaurants Bahrain Ramadan, suhoor buffet Bahrain, pre-dawn meal Bahrain, 24 hour restaurants Bahrain',
  openGraph: {
    title: 'Best Suhoor in Bahrain 2026 | Late Night Restaurants & Pre-Dawn Meals',
    description: 'Discover the best suhoor spots in Bahrain - 24hr restaurants, hotel buffets, and traditional venues.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/ramadan/suhoor',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/ramadan/suhoor',
  },
};

const hotelSuhoors = [
  {
    name: 'The Ritz-Carlton Suhoor',
    location: 'Seef',
    price: 'BD 28-40',
    rating: 4.8,
    description: 'Experience pre-dawn dining in style at the Ritz-Carlton. Their suhoor service offers a refined selection of Arabic and international dishes, fresh juices, and traditional Ramadan beverages in an elegant setting.',
    highlights: ['Elegant ambiance', 'Live cooking stations', 'Arabic & international', 'Fresh juices', 'Quiet atmosphere'],
    phone: '+973 1758 0000',
    hours: '2:00 AM - 4:30 AM',
    bookingTip: 'Perfect for special occasions. Advance booking recommended.',
  },
  {
    name: 'Four Seasons Bahrain Bay',
    location: 'Bahrain Bay',
    price: 'BD 32-45',
    rating: 4.9,
    description: 'Wake up to stunning bay views and a premium suhoor spread. The Four Seasons offers an extensive pre-dawn buffet with live stations, fresh bakery items, and traditional Arabic dishes.',
    highlights: ['Bay views', 'Premium buffet', 'Fresh bakery', 'Healthy options', 'Peaceful setting'],
    phone: '+973 1711 5000',
    hours: '2:30 AM - 4:30 AM',
    bookingTip: 'Request window seating for the best views.',
  },
  {
    name: 'Gulf Hotel Suhoor',
    location: 'Adliya',
    price: 'BD 22-32',
    rating: 4.6,
    description: 'Reliable suhoor service from a Bahrain institution. The Gulf Hotel offers a mix of Arabic and Lebanese dishes, fresh fruits, and all the traditional suhoor essentials at reasonable prices.',
    highlights: ['Great value', 'Lebanese options', 'Central location', 'Ample parking', 'Family-friendly'],
    phone: '+973 1771 3000',
    hours: '2:00 AM - 4:30 AM',
    bookingTip: 'Walk-ins usually available. Call ahead on weekends.',
  },
];

const twentyFourHourRestaurants = [
  {
    name: 'Fuddruckers',
    location: 'Seef, Riffa',
    price: 'BD 5-12',
    rating: 4.3,
    description: 'American comfort food available all night. Burgers, sandwiches, and hearty meals perfect for a filling suhoor. Multiple locations across Bahrain.',
    highlights: ['24/7 during Ramadan', 'Multiple locations', 'Hearty meals', 'Quick service'],
    hours: '24 hours',
  },
  {
    name: 'Jasmis',
    location: 'Seef',
    price: 'BD 4-10',
    rating: 4.4,
    description: 'South Indian vegetarian restaurant popular for late-night dining. Dosas, idlis, and authentic South Indian breakfast items perfect for suhoor.',
    highlights: ['Vegetarian', 'Authentic South Indian', 'Quick service', 'Affordable'],
    hours: '24 hours',
  },
  {
    name: 'Reem Al Bawadi',
    location: 'Juffair',
    price: 'BD 6-15',
    rating: 4.5,
    description: 'Traditional Arabic and Levantine cuisine served around the clock. Hummus, falafel, grilled meats, and fresh bread - ideal for a traditional suhoor.',
    highlights: ['Arabic cuisine', 'Grilled meats', 'Fresh bread', 'Traditional'],
    hours: '24 hours',
  },
  {
    name: 'Kabab King',
    location: 'Multiple locations',
    price: 'BD 3-8',
    rating: 4.2,
    description: 'Budget-friendly Pakistani cuisine perfect for suhoor. Parathas, kebabs, and chai make this a favorite late-night spot during Ramadan.',
    highlights: ['Budget-friendly', 'Filling meals', 'Multiple locations', 'Pakistani cuisine'],
    hours: '24 hours',
  },
];

const traditionalSpots = [
  {
    name: 'Saffron by Jena',
    location: 'Adliya',
    price: 'BD 12-20',
    rating: 4.6,
    description: 'Intimate suhoor experience with excellent Indian cuisine. Their biryani and tandoor dishes are perfect for a filling pre-dawn meal.',
    highlights: ['Biryani', 'Tandoor items', 'Cozy setting', 'Quality food'],
    hours: '2:00 AM - 4:00 AM',
  },
  {
    name: 'Haji Gahwa',
    location: 'Manama',
    price: 'BD 3-8',
    rating: 4.5,
    description: 'Traditional Bahraini café serving authentic local breakfast. Balaleet, khameer bread, eggs, and Arabic tea - the true local suhoor experience.',
    highlights: ['Authentic Bahraini', 'Traditional breakfast', 'Budget-friendly', 'Local favorite'],
    hours: 'Open late during Ramadan',
  },
  {
    name: 'Café Lilou',
    location: 'Adliya',
    price: 'BD 8-15',
    rating: 4.4,
    description: 'French-inspired café offering light suhoor options. Croissants, eggs, fresh pastries, and excellent coffee in a charming courtyard setting.',
    highlights: ['French pastries', 'Light options', 'Great coffee', 'Charming setting'],
    hours: 'Extended hours during Ramadan',
  },
];

const faqs = [
  {
    q: 'What time is suhoor in Bahrain during Ramadan 2026?',
    a: 'Suhoor timing varies throughout Ramadan. In early March 2026, imsak (the time to stop eating) is around 4:45 AM. Most suhoor venues open from 2:00 AM to allow ample time. By the end of Ramadan (late March), imsak moves slightly earlier. Always check daily prayer times for exact timings.',
  },
  {
    q: 'What are the best foods to eat for suhoor?',
    a: 'Ideal suhoor foods include complex carbohydrates (oats, whole grain bread), protein (eggs, beans, dairy), fresh fruits, and plenty of water. Traditional Arabic options like hummus, foul medames, labneh, and dates are excellent choices. Avoid overly salty or sugary foods that can increase thirst during fasting.',
  },
  {
    q: 'Are there 24-hour restaurants open during Ramadan in Bahrain?',
    a: 'Yes! Many restaurants extend their hours during Ramadan, and several operate 24/7 including Fuddruckers, Jasmis, Reem Al Bawadi, and various kebab shops. Most malls also have extended hours with food courts open until very late.',
  },
  {
    q: 'How much does suhoor cost in Bahrain?',
    a: 'Suhoor prices vary widely. Budget options at local restaurants cost BD 3-10 per person. Mid-range restaurants charge BD 10-20, while luxury hotel suhoor buffets range from BD 25-45 per person. 24-hour fast food restaurants are the most affordable option.',
  },
  {
    q: 'Can I find vegetarian suhoor options in Bahrain?',
    a: 'Absolutely! South Indian restaurants like Jasmis offer excellent vegetarian options 24/7. Arabic restaurants serve vegetarian mezze (hummus, falafel, foul), and hotels typically include vegetarian sections in their suhoor buffets. Café Lilou also has light vegetarian options.',
  },
  {
    q: 'Do I need to book for hotel suhoor in Bahrain?',
    a: 'While not always required, booking is recommended for hotel suhoor, especially on weekends. Many hotels offer suhoor packages that can be booked in advance. Casual restaurants and 24-hour spots typically don\'t require reservations.',
  },
];

export default function SuhoorPage() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://www.bahrainnights.com' },
    { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
    { name: 'Ramadan', url: 'https://www.bahrainnights.com/guides/ramadan' },
    { name: 'Suhoor', url: 'https://www.bahrainnights.com/guides/ramadan/suhoor' },
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
            headline: 'Best Suhoor in Bahrain 2026 | Late Night Restaurants & Pre-Dawn Meals',
            description: 'Comprehensive guide to the best suhoor spots in Bahrain for Ramadan 2026.',
            author: { '@type': 'Organization', name: 'Bahrain Nights' },
            publisher: { '@type': 'Organization', name: 'Bahrain Nights' },
            datePublished: '2026-02-01',
            dateModified: '2026-02-15',
            mainEntityOfPage: 'https://www.bahrainnights.com/guides/ramadan/suhoor',
          }),
        }}
      />

      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/5 to-teal-500/10" />
          <div className="max-w-4xl mx-auto text-center relative">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sunrise className="w-8 h-8 text-cyan-400" />
              <span className="text-cyan-400 font-semibold">Ramadan 2026</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Best Suhoor Spots in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-500 to-teal-500">
                Bahrain
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Find the perfect pre-dawn meal this Ramadan. From 24-hour restaurants to luxury hotel buffets, 
              discover where to enjoy suhoor in Bahrain before the fast begins.
            </p>
          </div>
        </section>

        {/* Suhoor Info */}
        <section className="py-8 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <div className="bg-cyan-500/10 rounded-2xl p-6 border border-cyan-500/20">
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-cyan-400" />
                Suhoor Timing - Ramadan 2026
              </h2>
              <p className="text-gray-300">
                Suhoor is the pre-dawn meal eaten before beginning the daily fast. In Bahrain, imsak (time to stop eating) 
                is approximately 4:45 AM in early March, adjusting slightly throughout the month. Most venues serve suhoor 
                from 2:00 AM onwards. Check our <Link href="/guides/ramadan/timings" className="text-cyan-400 hover:underline">Ramadan Timings page</Link> for daily schedules.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4">
            <a href="#hotels" className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full hover:bg-blue-500/30 transition-colors">
              Hotel Suhoors
            </a>
            <a href="#24hr" className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-full hover:bg-cyan-500/30 transition-colors">
              24-Hour Restaurants
            </a>
            <a href="#traditional" className="px-4 py-2 bg-teal-500/20 text-teal-400 rounded-full hover:bg-teal-500/30 transition-colors">
              Traditional Spots
            </a>
            <a href="#tips" className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-full hover:bg-emerald-500/30 transition-colors">
              Suhoor Tips
            </a>
          </div>
        </section>

        {/* Hotel Suhoors */}
        <section id="hotels" className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Star className="w-8 h-8 text-blue-400" />
              Hotel Suhoor Buffets
            </h2>
            <p className="text-gray-400 mb-8">Premium pre-dawn dining with extensive buffets and elegant atmosphere.</p>
            
            <div className="space-y-6">
              {hotelSuhoors.map((venue, index) => (
                <div key={index} className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-colors">
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
                        <span className="flex items-center gap-1 text-blue-400">
                          <Star className="w-4 h-4 fill-current" /> {venue.rating}
                        </span>
                      </div>
                    </div>
                    <a href={`tel:${venue.phone}`} className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-400 transition-colors">
                      <Phone className="w-4 h-4" /> Book Now
                    </a>
                  </div>
                  <p className="text-gray-300 mb-4">{venue.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {venue.highlights.map((highlight, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm">
                        {highlight}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Hours: {venue.hours}
                    </span>
                    <span className="flex items-center gap-2">
                      <Coffee className="w-4 h-4" /> Tip: {venue.bookingTip}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 24-Hour Restaurants */}
        <section id="24hr" className="py-16 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Clock className="w-8 h-8 text-cyan-400" />
              24-Hour Restaurants
            </h2>
            <p className="text-gray-400 mb-8">Convenient late-night options open around the clock during Ramadan.</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {twentyFourHourRestaurants.map((venue, index) => (
                <div key={index} className="bg-slate-900/50 rounded-xl p-6 border border-white/10 hover:border-cyan-500/30 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-white">{venue.name}</h3>
                    <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded text-xs font-medium">
                      {venue.hours}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {venue.location}
                    </span>
                    <span className="text-cyan-400">{venue.price}</span>
                    <span className="flex items-center gap-1 text-cyan-400">
                      <Star className="w-4 h-4 fill-current" /> {venue.rating}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">{venue.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {venue.highlights.map((h, i) => (
                      <span key={i} className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded text-xs">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Traditional Spots */}
        <section id="traditional" className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Utensils className="w-8 h-8 text-teal-400" />
              Traditional Suhoor Spots
            </h2>
            <p className="text-gray-400 mb-8">Authentic experiences with traditional cuisine and cozy atmospheres.</p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {traditionalSpots.map((venue, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-teal-500/30 transition-colors">
                  <h3 className="text-lg font-bold text-white mb-2">{venue.name}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-400 mb-2">
                    <span>{venue.location}</span>
                    <span className="text-teal-400">{venue.price}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {venue.hours}
                  </p>
                  <p className="text-gray-300 text-sm mb-4">{venue.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {venue.highlights.map((h, i) => (
                      <span key={i} className="px-2 py-0.5 bg-teal-500/10 text-teal-400 rounded text-xs">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Suhoor Tips */}
        <section id="tips" className="py-16 px-4 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Coffee className="w-8 h-8 text-emerald-400" />
              Suhoor Tips for Fasting
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-900/50 rounded-xl p-6 border border-emerald-500/20">
                <h3 className="text-lg font-semibold text-white mb-3">Best Foods for Suhoor</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Complex carbs: oats, whole grain bread</li>
                  <li>• Protein: eggs, beans, labneh, cheese</li>
                  <li>• Fiber: fresh fruits, vegetables</li>
                  <li>• Dates and honey for natural energy</li>
                </ul>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-6 border border-emerald-500/20">
                <h3 className="text-lg font-semibold text-white mb-3">Foods to Avoid</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Very salty foods (increase thirst)</li>
                  <li>• Excessive sugar and sweets</li>
                  <li>• Fried and heavy foods</li>
                  <li>• Too much caffeine</li>
                </ul>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-6 border border-emerald-500/20">
                <h3 className="text-lg font-semibold text-white mb-3">Hydration Tips</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Drink plenty of water at suhoor</li>
                  <li>• Eat water-rich fruits (watermelon, cucumber)</li>
                  <li>• Avoid excessive salt intake</li>
                  <li>• Limit caffeinated beverages</li>
                </ul>
              </div>
              <div className="bg-slate-900/50 rounded-xl p-6 border border-emerald-500/20">
                <h3 className="text-lg font-semibold text-white mb-3">Timing Tips</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Finish eating 15 min before imsak</li>
                  <li>• Don&apos;t skip suhoor - it&apos;s essential</li>
                  <li>• Set multiple alarms to wake up</li>
                  <li>• Prepare food the night before</li>
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
              <Link href="/guides/ramadan/best-iftars" className="px-6 py-3 bg-cyan-500 text-white rounded-lg font-medium hover:bg-cyan-400 transition-colors">
                Best Iftars Guide
              </Link>
              <Link href="/guides/ramadan/timings" className="px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors">
                Ramadan Timings
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
            { href: '/guides/ramadan/ghabga', title: 'Ghabga Venues' },
            { href: '/guides/ramadan/events', title: 'Ramadan Events' },
            { href: '/guides/ramadan/timings', title: 'Ramadan Timings' },
            { href: '/places', title: 'Discover Restaurants' },
          ]}
        />
      </main>
    </>
  );
}
