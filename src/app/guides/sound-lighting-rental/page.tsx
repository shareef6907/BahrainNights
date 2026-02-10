import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Volume2, Lightbulb, Music, Mic2, ArrowRight,
  CheckCircle, Phone, Mail, Building2, Star, Headphones
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sound & Lighting Rental Bahrain 2026 | PA Systems, Stage Lights',
  description: 'Rent professional sound systems and stage lighting in Bahrain. PA speakers, line arrays, moving head lights, LED uplighting for weddings, concerts, conferences & events.',
  keywords: 'sound system rental Bahrain, PA rental Bahrain, lighting rental Bahrain, stage lighting Bahrain, DJ equipment rental, wedding sound Bahrain, concert sound Bahrain, event lighting',
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/sound-lighting-rental',
  },
  openGraph: {
    title: 'Sound & Lighting Rental Bahrain 2026 | PA Systems, Stage Lights',
    description: 'Professional sound and lighting equipment rental for events in Bahrain.',
    type: 'article',
    locale: 'en_BH',
  },
};

const faqs = [
  {
    q: 'How much does sound system rental cost in Bahrain?',
    a: 'Sound system rental in Bahrain starts from BD 100-150 for small events (50-100 guests) up to BD 500-1500+ for large concerts and festivals. Price depends on venue size, speaker power, and whether you need a sound engineer.',
  },
  {
    q: 'What sound equipment is available for rent in Bahrain?',
    a: 'You can rent PA speakers, subwoofers, line array systems, digital mixing consoles, wireless microphones (handheld, lapel, headset), monitors, DJ equipment, and complete concert sound systems.',
  },
  {
    q: 'Do you provide a sound engineer with the rental?',
    a: 'Yes, professional sound engineers are available to operate the equipment during your event. This is recommended for concerts, conferences, and any event with live microphones or complex audio requirements.',
  },
  {
    q: 'What stage lighting options are available in Bahrain?',
    a: 'Stage lighting options include moving head lights, LED par cans, wash lights, spotlights/followspots, LED uplighting, strobe lights, haze/fog machines, and DMX controllers for programming.',
  },
  {
    q: 'How far in advance should I book sound and lighting?',
    a: 'For standard events, 1-2 weeks advance booking is usually sufficient. For peak seasons (F1, National Day, wedding season), book at least 3-4 weeks ahead to ensure equipment availability.',
  },
  {
    q: 'Can you do outdoor events in Bahrain?',
    a: 'Yes, we have weatherproof outdoor sound systems and IP-rated lighting suitable for outdoor events in Bahrain. All outdoor setups include proper power distribution and safety measures.',
  },
];

const soundEquipment = [
  {
    category: 'PA Systems',
    items: ['JBL VRX Line Arrays', 'QSC K-Series Speakers', 'EV ELX Portable PA', 'Subwoofers 18"'],
    bestFor: 'Concerts, outdoor events, large venues',
  },
  {
    category: 'Small Event Sound',
    items: ['Powered speakers', 'Portable PA systems', 'Column speakers', 'All-in-one systems'],
    bestFor: 'Weddings, corporate events, small gatherings',
  },
  {
    category: 'Microphones',
    items: ['Shure wireless handhelds', 'Sennheiser lapel mics', 'Headset microphones', 'Wired SM58s'],
    bestFor: 'Speeches, presentations, performances',
  },
  {
    category: 'DJ & Playback',
    items: ['Pioneer CDJs', 'DJ mixers', 'Turntables', 'Media players'],
    bestFor: 'Parties, nightclub events, DJ performances',
  },
];

const lightingEquipment = [
  {
    category: 'Moving Heads',
    items: ['Beam lights', 'Spot lights', 'Wash lights', 'Hybrid fixtures'],
    bestFor: 'Concerts, galas, high-energy events',
  },
  {
    category: 'LED Lighting',
    items: ['LED par cans', 'Uplighting', 'LED bars', 'Pixel mapping'],
    bestFor: 'Weddings, corporate branding, ambient lighting',
  },
  {
    category: 'Effects',
    items: ['Haze machines', 'Fog machines', 'Strobe lights', 'Lasers'],
    bestFor: 'Concerts, nightclub events, dramatic reveals',
  },
  {
    category: 'Control',
    items: ['DMX controllers', 'Lighting consoles', 'Wireless DMX', 'Pre-programmed shows'],
    bestFor: 'Any professional lighting setup',
  },
];

const eventTypes = [
  { name: 'Weddings', sound: 'Elegant PA + wireless mics', lighting: 'Uplighting + pin spots' },
  { name: 'Corporate Events', sound: 'Conference sound + lapel mics', lighting: 'Stage wash + gobo' },
  { name: 'Concerts', sound: 'Line arrays + monitors', lighting: 'Moving heads + effects' },
  { name: 'Outdoor Festivals', sound: 'High-power PA + delays', lighting: 'Weatherproof fixtures' },
  { name: 'DJ Events', sound: 'Club sound + subs', lighting: 'Dynamic color changing' },
  { name: 'Gala Dinners', sound: 'Distributed speakers', lighting: 'Warm ambient + stage' },
];

export default function SoundLightingRentalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950/20 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Sound & Lighting Rental', url: 'https://www.bahrainnights.com/guides/sound-lighting-rental' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm font-medium mb-4">
              🔊 Equipment Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Sound & Lighting{' '}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                Rental Bahrain
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Professional PA systems, stage lighting, and audio equipment for 
              weddings, concerts, conferences, and events across Bahrain.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Speaker Power', value: '100kW+', icon: Volume2 },
              { label: 'Lighting Fixtures', value: '500+', icon: Lightbulb },
              { label: 'Wireless Mics', value: '50+', icon: Mic2 },
              { label: 'Events/Year', value: '200+', icon: Music },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-indigo-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sound Equipment */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Headphones className="w-8 h-8 text-indigo-400" />
            <h2 className="text-3xl font-bold">Sound Equipment</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {soundEquipment.map((cat) => (
              <div 
                key={cat.category}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              >
                <h3 className="text-xl font-bold text-indigo-300 mb-4">{cat.category}</h3>
                <ul className="space-y-2 mb-4">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="text-xs text-indigo-300">
                  <strong>Best for:</strong> {cat.bestFor}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lighting Equipment */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Lightbulb className="w-8 h-8 text-amber-400" />
            <h2 className="text-3xl font-bold">Lighting Equipment</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {lightingEquipment.map((cat) => (
              <div 
                key={cat.category}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              >
                <h3 className="text-xl font-bold text-amber-300 mb-4">{cat.category}</h3>
                <ul className="space-y-2 mb-4">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="text-xs text-amber-300">
                  <strong>Best for:</strong> {cat.bestFor}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By Event Type */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Packages by Event Type
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {eventTypes.map((event) => (
              <div key={event.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold mb-3 text-indigo-300">{event.name}</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-500">Sound:</span>{' '}
                    <span className="text-gray-300">{event.sound}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Lighting:</span>{' '}
                    <span className="text-gray-300">{event.lighting}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-2xl p-8 md:p-12">
            <div className="text-center">
              <Volume2 className="w-12 h-12 mx-auto mb-4 text-indigo-400" />
              <h2 className="text-3xl font-bold mb-4">Get Your Sound & Lighting Quote</h2>
              <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                Events Bahrain provides complete audio-visual solutions with professional 
                technicians. Tell us about your event for a custom package.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <a
                  href="https://www.eventsbahrain.com/sound-and-lights"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-lg transition-colors"
                >
                  Get Free Quote
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="tel:+97339007750"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  +973 3900 7750
                </a>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6 text-sm text-gray-400">
                <div className="flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  shareef@eventsbahrain.com
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Delivery across Bahrain
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Sound & Lighting Rental FAQs
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-6">
                <h3 className="font-bold mb-2 text-indigo-300">{faq.q}</h3>
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
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: 'LED Wall Rental', href: '/guides/led-wall-rental', emoji: '📺' },
              { title: 'Event Equipment Rental', href: '/guides/event-equipment-rental', emoji: '🎤' },
              { title: 'Video Production', href: '/guides/video-production', emoji: '🎬' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group flex items-center gap-3"
              >
                <span className="text-2xl">{guide.emoji}</span>
                <span className="font-medium group-hover:text-indigo-400 transition-colors">
                  {guide.title}
                </span>
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
            headline: 'Sound & Lighting Rental Bahrain 2026',
            description: 'Complete guide to sound system and stage lighting rental in Bahrain for weddings, concerts, and corporate events.',
            author: {
              '@type': 'Organization',
              name: 'BahrainNights',
              url: 'https://www.bahrainnights.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'BahrainNights',
            },
            datePublished: '2026-02-10',
            dateModified: '2026-02-10',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://www.bahrainnights.com/guides/sound-lighting-rental',
            },
            mentions: {
              '@type': 'LocalBusiness',
              name: 'Events Bahrain',
              url: 'https://www.eventsbahrain.com',
              telephone: '+973 3900 7750',
              email: 'shareef@eventsbahrain.com',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'BH',
                addressLocality: 'Manama',
              },
            },
          }),
        }}
      />
    </div>
  );
}
