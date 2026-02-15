import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, Sparkles, Heart, Waves, Clock, Phone, Flower2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Spas & Wellness in Bahrain 2026 | Luxury Massage & Treatments',
  description: 'Discover the best spas and wellness centers in Bahrain. Luxury hotel spas, thalassotherapy, hammams, massage therapies, and relaxation experiences across the Kingdom.',
  keywords: 'spa Bahrain, massage Bahrain, wellness Bahrain, best spa Bahrain, hammam Bahrain, thalassotherapy Bahrain, spa packages Bahrain, couples spa Bahrain',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/spa-wellness-bahrain' },
  openGraph: {
    title: 'Best Spas & Wellness in Bahrain 2026',
    description: 'Your complete guide to luxury spas, wellness centers, and relaxation experiences in Bahrain.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/spa-wellness-bahrain',
    images: [{ url: 'https://www.bahrainnights.com/images/spa-bahrain.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Spas & Wellness in Bahrain 2026',
    description: 'Luxury spas, massages, and wellness experiences in Bahrain.',
  },
};

const faqs = [
  { q: 'What are the best spas in Bahrain?', a: 'Top spas include Sofitel Thalassa Spa (sea treatments), ESPA at Four Seasons, Ritz-Carlton Spa, The Spa at Gulf Hotel, and ART Rotana Spa. Hotel spas generally offer the highest quality treatments and facilities with trained therapists and premium products.' },
  { q: 'How much do spa treatments cost in Bahrain?', a: 'Massage starts around BD 30-40 at mid-range spas, BD 50-100 at luxury hotel spas. Full spa days range from BD 80-200. Facials cost BD 40-80, and specialty treatments vary widely. Many spas offer packages combining multiple treatments for better value.' },
  { q: 'Are there hammams in Bahrain?', a: 'Yes, several spas offer traditional hammam treatments including body scrubs, steam rooms, and exfoliation rituals. Ritz-Carlton, The Spa at Gulf Hotel, and dedicated wellness centers provide authentic hammam experiences with Moroccan or Turkish traditions.' },
  { q: 'Do I need to book spa treatments in advance?', a: 'Yes, especially for weekends and popular treatments. Book 2-3 days ahead for regular appointments, a week ahead for special packages. Walk-ins are possible on weekdays but not guaranteed. Couples treatments and holiday periods require earlier booking.' },
  { q: 'Are there couples spa treatments in Bahrain?', a: 'Most luxury spas offer couples rooms and romantic packages. Four Seasons, Ritz-Carlton, Sofitel, and Gulf Hotel are particularly good for couples spa experiences. Book well ahead for Valentine\'s Day, anniversaries, or special occasions.' },
  { q: 'What is thalassotherapy?', a: 'Thalassotherapy uses seawater and marine elements for healing treatments. Sofitel Thalassa is Bahrain\'s premier destination for this, featuring authentic sea water pools, jets, and treatments that harness the therapeutic properties of the Gulf waters.' },
];

const luxurySpas = [
  {
    name: 'Sofitel Thalassa Sea & Spa',
    area: 'Zallaq',
    rating: 5,
    specialty: 'Thalassotherapy (Sea Treatments)',
    priceRange: 'BD 60-150',
    highlights: ['Heated sea water pools', 'Beach access', 'Marine algae wraps', 'Comprehensive hydrotherapy', 'Detox programs'],
    description: 'Bahrain\'s only authentic thalassotherapy spa uses Gulf sea water pumped directly into treatment pools. The spa features a complete circuit of heated pools, jets, and marine treatments. Perfect for those seeking therapeutic benefits beyond standard spa services.',
    contact: '+973 1763 6363',
    hours: '9am-9pm daily',
  },
  {
    name: 'ESPA at Four Seasons',
    area: 'Bahrain Bay',
    rating: 5,
    specialty: 'Luxury Wellness',
    priceRange: 'BD 70-180',
    highlights: ['Bay views', 'ESPA products', 'Private suites', 'Couples experiences', 'Rooftop pool'],
    description: 'Set within the iconic Four Seasons Hotel, ESPA delivers world-class treatments using their signature product line. The spa\'s design maximizes views of Bahrain Bay, creating a serene environment. Their signature facials and body treatments are consistently rated among Bahrain\'s best.',
    contact: '+973 1711 5000',
    hours: '10am-10pm daily',
  },
  {
    name: 'Ritz-Carlton Spa',
    area: 'Manama',
    rating: 5,
    specialty: 'Traditional & Contemporary',
    priceRange: 'BD 60-160',
    highlights: ['Hammam', 'Private couples suites', 'Ocean views', 'Signature massages', 'Beauty salon'],
    description: 'The Ritz-Carlton Spa blends traditional Middle Eastern therapies with contemporary techniques. Their hammam ritual is a standout, featuring body scrubbing, steaming, and conditioning treatments. The spa overlooks the Arabian Gulf with private terraces for select treatments.',
    contact: '+973 1758 0000',
    hours: '9am-10pm daily',
  },
  {
    name: 'The Spa at Gulf Hotel',
    area: 'Adliya',
    rating: 5,
    specialty: 'Holistic Wellness',
    priceRange: 'BD 50-130',
    highlights: ['Oriental treatments', 'Hydrotherapy', 'Fitness integration', 'Meditation rooms', 'Spa cuisine'],
    description: 'One of Bahrain\'s most established spas, The Spa at Gulf Hotel offers a comprehensive wellness approach. Their Oriental massage techniques and hot stone therapies are particularly popular. The spa integrates with the hotel\'s fitness facilities for complete wellness packages.',
    contact: '+973 1771 3000',
    hours: '9am-9pm daily',
  },
];

const midRangeSpas = [
  {
    name: 'ART Rotana Spa',
    area: 'Amwaj',
    rating: 4,
    specialty: 'Island Relaxation',
    priceRange: 'BD 40-100',
    highlights: ['Beach resort setting', 'Good value', 'Pool access', 'Wide treatment menu'],
    description: 'Set within the ART Rotana resort on Amwaj Islands, this spa offers relaxed island vibes with professional treatments. Often combined with beach club access for a full day experience.',
  },
  {
    name: 'The Retreat Spa',
    area: 'Various Locations',
    rating: 4,
    specialty: 'Day Spa',
    priceRange: 'BD 25-70',
    highlights: ['Accessible pricing', 'Multiple branches', 'Professional service', 'Walk-ins welcome'],
    description: 'A popular local chain with consistent quality across locations. Great option for regular treatments without hotel spa prices. Offers full menu from massages to facials and body treatments.',
  },
  {
    name: 'Diplomat Radisson Spa',
    area: 'Diplomatic Area',
    rating: 4,
    specialty: 'Business Traveler Friendly',
    priceRange: 'BD 35-90',
    highlights: ['Central location', 'Quick treatments', 'Gym access', 'Steam & sauna'],
    description: 'Conveniently located for business travelers and residents in Manama. Offers efficient treatments perfect for busy schedules plus full gym access.',
  },
  {
    name: 'Jumeirah Royal Saray Spa',
    area: 'Seef',
    rating: 4.5,
    specialty: 'Arabian Luxury',
    priceRange: 'BD 55-120',
    highlights: ['Talise spa brand', 'Oceanfront', 'Traditional hammam', 'Premium amenities'],
    description: 'Jumeirah\'s signature Talise spa concept brings Arabian luxury with contemporary treatments. The oceanfront setting and traditional hammam make this a destination experience.',
  },
];

const treatmentTypes = [
  {
    name: 'Massage Therapies',
    icon: Sparkles,
    treatments: [
      { name: 'Swedish Massage', duration: '60-90 min', price: 'BD 35-60', benefit: 'Relaxation & stress relief' },
      { name: 'Deep Tissue', duration: '60-90 min', price: 'BD 45-70', benefit: 'Muscle tension & knots' },
      { name: 'Hot Stone', duration: '75-90 min', price: 'BD 55-85', benefit: 'Deep warmth & circulation' },
      { name: 'Thai Massage', duration: '60-90 min', price: 'BD 45-75', benefit: 'Flexibility & energy flow' },
      { name: 'Aromatherapy', duration: '60-90 min', price: 'BD 45-70', benefit: 'Mind-body balance' },
    ],
  },
  {
    name: 'Facial Treatments',
    icon: Flower2,
    treatments: [
      { name: 'Classic Facial', duration: '60 min', price: 'BD 40-60', benefit: 'Cleansing & hydration' },
      { name: 'Anti-Aging', duration: '75 min', price: 'BD 60-100', benefit: 'Firming & rejuvenation' },
      { name: 'Hydrating Facial', duration: '60 min', price: 'BD 45-70', benefit: 'Deep moisture boost' },
      { name: 'Men\'s Facial', duration: '45-60 min', price: 'BD 35-55', benefit: 'Male skin care' },
    ],
  },
  {
    name: 'Body Treatments',
    icon: Waves,
    treatments: [
      { name: 'Body Scrub', duration: '45-60 min', price: 'BD 35-55', benefit: 'Exfoliation & smoothing' },
      { name: 'Body Wrap', duration: '60-90 min', price: 'BD 50-80', benefit: 'Detox & nourishment' },
      { name: 'Hammam Ritual', duration: '90-120 min', price: 'BD 70-120', benefit: 'Traditional cleansing' },
      { name: 'Thalassotherapy', duration: '60-90 min', price: 'BD 60-100', benefit: 'Sea mineral therapy' },
    ],
  },
];

const spaTips = [
  { tip: 'Book Ahead', detail: 'Reserve 3-5 days in advance for weekends. Popular therapists book up quickly.' },
  { tip: 'Arrive Early', detail: 'Arrive 20-30 minutes early to use facilities and prepare for your treatment.' },
  { tip: 'Stay Hydrated', detail: 'Drink plenty of water before and after treatments for best results.' },
  { tip: 'Day Packages', detail: 'Look for packages that include pool/beach access for extended relaxation.' },
  { tip: 'Off-Peak Pricing', detail: 'Many spas offer discounts on weekday mornings — ask about promotions.' },
  { tip: 'Gift Vouchers', detail: 'Spa vouchers make excellent gifts — most spas offer attractive packages.' },
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
              Best <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Spas & Wellness</span> in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
              Discover luxury hotel spas, thalassotherapy treatments, traditional hammams, and wellness retreats 
              for the ultimate relaxation experience in the Kingdom of Bahrain.
            </p>
            <p className="text-sm text-gray-500">Last updated: {lastUpdated}</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <Sparkles className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-400">15+</p>
              <p className="text-xs text-gray-400">Luxury Spas</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <Heart className="w-6 h-6 text-pink-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-pink-400">50+</p>
              <p className="text-xs text-gray-400">Treatments</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <Waves className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-400">1</p>
              <p className="text-xs text-gray-400">Thalassotherapy</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <Flower2 className="w-6 h-6 text-rose-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-rose-400">BD 25+</p>
              <p className="text-xs text-gray-400">Starting Price</p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Bahrain&apos;s spa scene punches well above its weight, with world-class facilities at major hotels and unique offerings 
            like Sofitel&apos;s thalassotherapy spa using Gulf sea water. Whether you&apos;re seeking a quick massage to unwind after 
            a long flight, a full spa day with friends, or a romantic couples retreat, the Kingdom delivers exceptional 
            wellness experiences.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            The spa culture here blends Eastern and Western traditions beautifully. You&apos;ll find authentic Turkish hammams 
            alongside Swedish massage techniques, Thai therapies next to Arabian beauty rituals. Hotel spas dominate the 
            luxury end, but standalone wellness centers offer excellent value for regular treatments.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            <strong className="text-purple-400">Best value tip:</strong> Look for spa packages that include pool and beach 
            access — you&apos;ll get a full day of relaxation for not much more than the treatment alone. Many hotels offer 
            &quot;spa day&quot; packages combining treatments, lunch, and facility access.
          </p>
        </div>
      </section>

      {/* Luxury Spas */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8 text-purple-400" /> Luxury Hotel Spas
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Bahrain&apos;s finest spa experiences with world-class facilities and premium treatments
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {luxurySpas.map((spa) => (
              <div key={spa.name} className="bg-gradient-to-br from-purple-500/10 to-pink-500/5 rounded-xl p-6 hover:from-purple-500/20 hover:to-pink-500/10 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      {spa.name}
                      <span className="text-yellow-400 text-sm flex items-center"><Star className="w-4 h-4 fill-current" /> {spa.rating}</span>
                    </h3>
                    <p className="text-purple-400 text-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {spa.area}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-pink-400">{spa.priceRange}</div>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-2">{spa.specialty}</p>
                <p className="text-gray-300 text-sm mb-4">{spa.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {spa.highlights.map((h) => (
                    <span key={h} className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">{h}</span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {spa.contact}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {spa.hours}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mid-Range Spas */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">More Great Spa Options</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {midRangeSpas.map((spa) => (
              <div key={spa.name} className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold">{spa.name}</h3>
                    <p className="text-purple-400 text-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {spa.area}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-yellow-400 text-sm"><Star className="w-4 h-4 fill-current" /> {spa.rating}</div>
                    <div className="font-medium text-pink-400">{spa.priceRange}</div>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-2">{spa.specialty}</p>
                <p className="text-gray-300 text-sm mb-3">{spa.description}</p>
                <div className="flex flex-wrap gap-2">
                  {spa.highlights.map((h) => (
                    <span key={h} className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded">{h}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment Types */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Popular Treatment Types</h2>
          {treatmentTypes.map((category) => (
            <div key={category.name} className="mb-12">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <category.icon className="w-6 h-6 text-purple-400" /> {category.name}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.treatments.map((treatment) => (
                  <div key={treatment.name} className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-bold text-purple-300 mb-1">{treatment.name}</h4>
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>{treatment.duration}</span>
                      <span className="text-pink-400">{treatment.price}</span>
                    </div>
                    <p className="text-xs text-gray-500">{treatment.benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">💡 Spa Tips</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {spaTips.map((tip) => (
              <div key={tip.tip} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-purple-400 mb-2">{tip.tip}</h3>
                <p className="text-sm text-gray-300">{tip.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Plan Your Wellness Escape</h2>
          <p className="text-gray-300 mb-6">Explore more Bahrain guides for the perfect getaway</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guides/beach-clubs" className="px-8 py-3 bg-purple-500 hover:bg-purple-400 text-white font-bold rounded-lg transition-colors">Beach Clubs</Link>
            <Link href="/guides/romantic" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors">Romantic Guide</Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
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

      {/* Related Guides */}
      <section className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-6">Related Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Valentine\'s Day', href: '/guides/valentines-day-bahrain', emoji: '💕' },
              { title: 'Mother\'s Day', href: '/guides/mothers-day-bahrain', emoji: '👩' },
              { title: 'Date Night', href: '/guides/best-date-night-bahrain', emoji: '💑' },
              { title: 'Beach Clubs', href: '/guides/beach-clubs', emoji: '🏖️' },
            ].map((guide) => (
              <Link key={guide.href} href={guide.href} className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group">
                <span className="text-2xl mb-2 block">{guide.emoji}</span>
                <span className="font-medium group-hover:text-purple-400 transition-colors">{guide.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cross Promotion */}
      <section className="py-8 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400">
            Looking for wellness events and retreats? Visit <a href="https://www.eventsbahrain.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">EventsBahrain.com</a> for the latest listings.
          </p>
        </div>
      </section>

      {/* Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Best Spas & Wellness in Bahrain 2026',
        description: 'Complete guide to luxury spas, wellness centers, and relaxation experiences in Bahrain.',
        author: { '@type': 'Organization', name: 'BahrainNights' },
        publisher: { '@type': 'Organization', name: 'BahrainNights', url: 'https://www.bahrainnights.com' },
        datePublished: '2026-02-11',
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
