import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Sparkles, Heart, Clock, MapPin, Star,
  Droplets, Flame, Users, Leaf
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Best Spas & Wellness Centers in Bahrain 2026 | Luxury Spa Guide',
  description: 'Discover the best spas and wellness centers in Bahrain — luxury hotel spas, Thai massage, hammams, yoga studios, and holistic wellness retreats. Complete relaxation guide.',
  keywords: 'spa Bahrain, wellness Bahrain, massage Bahrain, best spa Manama, hammam Bahrain, luxury spa Bahrain, yoga Bahrain, wellness retreat Bahrain',
  openGraph: {
    title: 'Best Spas & Wellness Centers in Bahrain 2026',
    description: 'Your complete guide to spa and wellness experiences in Bahrain.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/spa-wellness-bahrain',
    images: [{ url: 'https://www.bahrainnights.com/images/spa-bahrain.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Spas & Wellness Centers in Bahrain 2026',
    description: 'Luxury spas, massages, hammams, and wellness retreats in Bahrain.',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/spa-wellness-bahrain',
  },
};

const luxurySpas = [
  { name: 'The Ritz-Carlton Spa', hotel: 'The Ritz-Carlton Bahrain', description: 'World-class spa with ocean views, featuring signature rituals, private hammam, and hydrotherapy circuits', specialty: 'Signature Royal Hammam', price: 'BD 60-200', rating: 5 },
  { name: 'Chi The Spa', hotel: 'Shangri-La Bahrain', description: 'Asian-inspired wellness sanctuary with private villas, traditional Chinese therapies, and meditation gardens', specialty: 'Chinese healing rituals', price: 'BD 50-180', rating: 5 },
  { name: 'The Spa at Four Seasons', hotel: 'Four Seasons Bahrain Bay', description: 'Elegant waterfront spa offering holistic treatments, couples suites, and stunning bay views', specialty: 'Bespoke facial treatments', price: 'BD 55-170', rating: 5 },
  { name: 'So SPA', hotel: 'Sofitel Bahrain', description: 'French-inspired luxury spa with comprehensive treatment menu and relaxation lounges', specialty: 'French beauty rituals', price: 'BD 45-150', rating: 5 },
  { name: 'Eforea Spa', hotel: 'Hilton Bahrain', description: 'Journey-based spa experiences designed to renew mind, body, and spirit', specialty: 'Personalized spa journeys', price: 'BD 40-120', rating: 4 },
  { name: 'The Spa', hotel: 'Wyndham Grand Bahrain', description: 'Modern wellness facility with diverse treatment options and thermal experiences', specialty: 'Aromatherapy treatments', price: 'BD 35-100', rating: 4 },
];

const daySpas = [
  { name: 'Zen The Spa', location: 'Adliya', description: 'Popular day spa offering Thai, Swedish, and hot stone massages at affordable prices', services: 'Massage, facials, body treatments', price: 'BD 20-60' },
  { name: 'Le Meridien Spa', location: 'Diplomatic Area', description: 'Hotel spa open to day visitors with professional therapists and premium products', services: 'Full spa menu, packages', price: 'BD 35-90' },
  { name: 'Thai Spa Bahrain', location: 'Juffair', description: 'Authentic Thai massage and treatments by skilled Thai therapists', services: 'Thai massage, foot reflexology', price: 'BD 15-45' },
  { name: 'Serene Spa', location: 'Seef', description: 'Boutique day spa with personalized treatments and organic products', services: 'Organic treatments, couples', price: 'BD 25-70' },
  { name: 'Bliss Spa', location: 'Amwaj Islands', description: 'Beach-adjacent spa offering relaxation with island vibes', services: 'Massage, beauty treatments', price: 'BD 20-55' },
  { name: 'Lotus Spa', location: 'Riffa', description: 'Community favorite known for skilled therapists and great value', services: 'Full body treatments', price: 'BD 18-50' },
];

const hammams = [
  { name: 'Royal Hammam at Ritz-Carlton', description: 'Authentic Moroccan hammam experience with traditional rituals, black soap, and rhassoul clay treatments', experience: 'Traditional hammam journey', duration: '90 min', price: 'BD 80-120' },
  { name: 'Turkish Bath at Gulf Hotel', description: 'Classic Turkish bath experience with steam, scrub, and massage', experience: 'Ottoman-style ritual', duration: '60 min', price: 'BD 50-75' },
  { name: 'Al Areen Spa Village', description: 'Desert oasis spa with Middle Eastern inspired treatments and hammam facilities', experience: 'Arabian wellness', duration: '120 min', price: 'BD 70-100' },
];

const yogaStudios = [
  { name: 'The Yoga Studio', location: 'Adliya', classes: 'Hatha, Vinyasa, Yin, Prenatal', drop: 'BD 8', monthly: 'BD 60-80' },
  { name: 'Hot Yoga Bahrain', location: 'Seef', classes: 'Hot Yoga, Bikram, Power', drop: 'BD 10', monthly: 'BD 75-95' },
  { name: 'Ananda Yoga', location: 'Saar', classes: 'Traditional yoga, meditation', drop: 'BD 7', monthly: 'BD 50-70' },
  { name: 'Core Fit Studio', location: 'Juffair', classes: 'Yoga, Pilates, Barre', drop: 'BD 9', monthly: 'BD 65-85' },
];

const wellnessServices = [
  { service: 'Massage Therapy', types: 'Swedish, Deep Tissue, Sports, Hot Stone', priceRange: 'BD 25-100' },
  { service: 'Facial Treatments', types: 'Anti-aging, Hydrating, Brightening, Acne', priceRange: 'BD 30-150' },
  { service: 'Body Treatments', types: 'Scrubs, Wraps, Detox, Slimming', priceRange: 'BD 35-120' },
  { service: 'Hydrotherapy', types: 'Jacuzzi, Steam, Sauna, Vitality Pools', priceRange: 'BD 20-60' },
  { service: 'Beauty Services', types: 'Mani-pedi, Waxing, Lash extensions', priceRange: 'BD 15-80' },
  { service: 'Alternative Therapies', types: 'Acupuncture, Cupping, Reiki', priceRange: 'BD 40-100' },
];

const spaPackages = [
  { name: 'Couple\'s Retreat', description: 'Side-by-side massage, private suite, champagne', duration: '2-3 hours', price: 'BD 150-300' },
  { name: 'Full Day Spa', description: 'Multiple treatments, lunch, pool access', duration: '6-8 hours', price: 'BD 180-350' },
  { name: 'Bridal Package', description: 'Pre-wedding pampering, facials, massage, beauty', duration: '4-5 hours', price: 'BD 200-400' },
  { name: 'Detox Journey', description: 'Cleansing treatments, body wrap, healthy lunch', duration: '3-4 hours', price: 'BD 120-200' },
];

const faqs = [
  { q: 'What are the best luxury spas in Bahrain?', a: 'The best luxury spas in Bahrain include The Ritz-Carlton Spa, Chi The Spa at Shangri-La, The Spa at Four Seasons, So SPA at Sofitel, and Al Areen Spa Village. These offer world-class treatments, premium facilities, and exceptional service.' },
  { q: 'How much does a spa treatment cost in Bahrain?', a: 'Spa prices in Bahrain vary widely. Budget day spas offer massages from BD 15-30, mid-range spas from BD 35-60, and luxury hotel spas from BD 60-200+. Packages and couples treatments cost more but offer better value.' },
  { q: 'Are there traditional hammams in Bahrain?', a: 'Yes, several hotels offer authentic hammam experiences. The Royal Hammam at Ritz-Carlton, Turkish Bath at Gulf Hotel, and Al Areen Spa Village provide traditional Middle Eastern and Turkish bath experiences with steam, scrubs, and rituals.' },
  { q: 'Where can I find yoga studios in Bahrain?', a: 'Popular yoga studios in Bahrain include The Yoga Studio in Adliya, Hot Yoga Bahrain in Seef, Ananda Yoga in Saar, and Core Fit Studio in Juffair. Drop-in classes typically cost BD 7-10, with monthly memberships available.' },
  { q: 'Do I need to book spa treatments in advance?', a: 'For luxury hotel spas, booking 1-2 days in advance is recommended, especially for weekends and couples treatments. Day spas may accommodate walk-ins, but booking ahead ensures your preferred time and therapist.' },
];

export default function SpaWellnessBahrainPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Spa & Wellness', url: 'https://www.bahrainnights.com/guides/spa-wellness-bahrain' },
      ]} />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium mb-4">💆 Wellness Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Best Spas & Wellness Centers in Bahrain</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
              Discover Bahrain&apos;s finest spa experiences — from luxury hotel spas with world-class treatments to authentic hammams and serene yoga studios. Your complete guide to relaxation and rejuvenation.
            </p>
            <p className="text-sm text-gray-500">Last updated: {lastUpdated}</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <Sparkles className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-400">30+</p>
              <p className="text-xs text-gray-400">Luxury Spas</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <Flame className="w-6 h-6 text-orange-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-orange-400">5+</p>
              <p className="text-xs text-gray-400">Hammams</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <Leaf className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-400">15+</p>
              <p className="text-xs text-gray-400">Yoga Studios</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <Heart className="w-6 h-6 text-pink-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-pink-400">50+</p>
              <p className="text-xs text-gray-400">Wellness Services</p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-8 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Bahrain has emerged as a wellness destination in the Gulf, offering an impressive array of spa and wellness experiences. From world-renowned luxury hotel spas featuring signature treatments to authentic Middle Eastern hammams and modern yoga studios, the Kingdom caters to every wellness need. Whether you&apos;re seeking a quick massage after a busy week or a full-day pampering retreat, Bahrain&apos;s wellness scene delivers exceptional quality and value.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            International hotel chains have brought their flagship spa concepts to Bahrain, while local establishments offer unique Arabian wellness traditions. The fusion of Eastern and Western treatments, combined with genuine hospitality, makes spa experiences in Bahrain truly special.
          </p>
        </div>
      </section>

      {/* Luxury Hotel Spas */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8 text-purple-400" /> Luxury Hotel Spas
          </h2>
          <p className="text-center text-gray-400 mb-8 max-w-2xl mx-auto">
            Bahrain&apos;s finest spas are found in its luxury hotels, offering world-class facilities, expert therapists, and transformative treatments.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {luxurySpas.map((spa) => (
              <div key={spa.name} className="bg-gradient-to-br from-purple-500/10 to-pink-500/5 rounded-xl p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-purple-400">{spa.name}</h3>
                    <p className="text-sm text-gray-400">{spa.hotel}</p>
                  </div>
                  <div className="flex">
                    {[...Array(spa.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{spa.description}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="text-pink-400"><Sparkles className="w-4 h-4 inline mr-1" />{spa.specialty}</span>
                  <span className="text-emerald-400 font-medium">{spa.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Day Spas */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center flex items-center justify-center gap-2">
            <Heart className="w-8 h-8 text-pink-400" /> Day Spas & Massage Centers
          </h2>
          <p className="text-center text-gray-400 mb-8 max-w-2xl mx-auto">
            Quality spa experiences without the luxury hotel price tag — perfect for regular wellness maintenance.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {daySpas.map((spa) => (
              <div key={spa.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-pink-400 mb-1">{spa.name}</h3>
                <p className="text-xs text-gray-400 mb-2"><MapPin className="w-3 h-3 inline mr-1" />{spa.location}</p>
                <p className="text-sm text-gray-300 mb-3">{spa.description}</p>
                <p className="text-xs text-gray-400 mb-2"><Droplets className="w-3 h-3 inline mr-1" />{spa.services}</p>
                <p className="text-sm font-medium text-emerald-400">{spa.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hammams */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center flex items-center justify-center gap-2">
            <Flame className="w-8 h-8 text-orange-400" /> Traditional Hammams
          </h2>
          <p className="text-center text-gray-400 mb-8 max-w-2xl mx-auto">
            Experience ancient bathing rituals with authentic Moroccan and Turkish hammam experiences.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {hammams.map((hammam) => (
              <div key={hammam.name} className="bg-gradient-to-br from-orange-500/10 to-amber-500/5 rounded-xl p-6">
                <h3 className="text-xl font-bold text-orange-400 mb-2">{hammam.name}</h3>
                <p className="text-gray-300 mb-4">{hammam.description}</p>
                <div className="space-y-2 text-sm">
                  <p className="text-amber-400"><Sparkles className="w-4 h-4 inline mr-1" />{hammam.experience}</p>
                  <p className="text-gray-400"><Clock className="w-4 h-4 inline mr-1" />{hammam.duration}</p>
                  <p className="text-emerald-400 font-medium">{hammam.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Yoga Studios */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">🧘 Yoga Studios</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {yogaStudios.map((studio) => (
              <div key={studio.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-green-400 mb-1">{studio.name}</h3>
                <p className="text-xs text-gray-400 mb-2"><MapPin className="w-3 h-3 inline mr-1" />{studio.location}</p>
                <p className="text-sm text-gray-300 mb-3">{studio.classes}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Drop-in: {studio.drop}</span>
                  <span className="text-emerald-400">{studio.monthly}/mo</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wellness Services */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">💆 Wellness Services & Pricing</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {wellnessServices.map((service) => (
              <div key={service.service} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-purple-400 mb-2">{service.service}</h3>
                <p className="text-sm text-gray-300 mb-2">{service.types}</p>
                <p className="text-sm font-medium text-emerald-400">{service.priceRange}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spa Packages */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">🎁 Popular Spa Packages</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {spaPackages.map((pkg) => (
              <div key={pkg.name} className="bg-gradient-to-br from-purple-500/10 to-pink-500/5 rounded-xl p-5">
                <h3 className="font-bold text-purple-400 mb-2">{pkg.name}</h3>
                <p className="text-sm text-gray-300 mb-3">{pkg.description}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400"><Clock className="w-4 h-4 inline mr-1" />{pkg.duration}</span>
                  <span className="text-emerald-400 font-medium">{pkg.price}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-gray-400">
            Book spa packages on <a href="https://bahrain.platinumlist.net?affiliate=yjg3yzi" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Platinumlist</a> for special deals and gift vouchers.
          </p>
        </div>
      </section>

      {/* Booking Tips */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">💡 Spa Booking Tips</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-xl p-5">
              <h3 className="font-bold text-purple-400 mb-2">Before Your Visit</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Book 2-3 days ahead for weekend appointments</li>
                <li>• Mention allergies or health conditions when booking</li>
                <li>• Arrive 15-30 minutes early to enjoy facilities</li>
                <li>• Avoid heavy meals 1-2 hours before treatments</li>
                <li>• Check if swimwear is needed for hydrotherapy</li>
              </ul>
            </div>
            <div className="bg-white/5 rounded-xl p-5">
              <h3 className="font-bold text-purple-400 mb-2">Maximize Your Experience</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Communicate pressure preferences to your therapist</li>
                <li>• Switch off your phone completely</li>
                <li>• Stay hydrated before and after treatments</li>
                <li>• Ask about package deals for better value</li>
                <li>• Tip is appreciated (10-15% if not included)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Time to Relax</h2>
          <p className="text-gray-300 mb-6">Explore more ways to unwind in Bahrain</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guides/pool-day-passes-bahrain" className="px-8 py-3 bg-purple-500 hover:bg-purple-400 text-black font-bold rounded-lg transition-colors">Pool Day Passes</Link>
            <Link href="/guides/hotels" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors">Hotel Guide</Link>
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Pool Day Passes', href: '/guides/pool-day-passes-bahrain', emoji: '🏊' },
              { title: 'Hotels', href: '/guides/hotels', emoji: '🏨' },
              { title: 'Outdoor Activities', href: '/guides/outdoor-activities-bahrain', emoji: '🏜️' },
              { title: 'Weekend Getaways', href: '/guides/weekend-getaways', emoji: '✈️' },
            ].map((g) => (
              <Link key={g.href} href={g.href} className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group">
                <span className="text-2xl mb-2 block">{g.emoji}</span>
                <span className="font-medium group-hover:text-purple-400 transition-colors">{g.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cross Promotion */}
      <section className="py-8 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400">
            Looking for wellness events and retreats? Visit <a href="https://www.eventsbahrain.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">EventsBahrain.com</a> for yoga workshops and wellness festivals. 
            Need spa marketing content? <a href="https://www.cinematicwebworks.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">CinematicWebWorks.com</a> creates stunning wellness videos.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-4">
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

      {/* Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Best Spas & Wellness Centers in Bahrain 2026',
        description: 'Complete guide to spa and wellness experiences in Bahrain including luxury hotel spas, day spas, hammams, and yoga studios.',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        publisher: { '@type': 'Organization', name: 'BahrainNights', url: 'https://www.bahrainnights.com' },
        datePublished: '2026-01-26',
        dateModified: lastUpdated,
        mainEntityOfPage: 'https://www.bahrainnights.com/guides/spa-wellness-bahrain'
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a }
        }))
      })}} />
    </div>
  );
}
