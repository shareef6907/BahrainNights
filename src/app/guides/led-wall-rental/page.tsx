import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Tv, Monitor, Zap, ArrowRight,
  CheckCircle, Phone, Mail, Building2, Star, Ruler
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'LED Wall Rental Bahrain 2026 | Video Wall Hire for Events',
  description: 'Rent LED video walls in Bahrain for events, exhibitions, conferences & weddings. Indoor & outdoor LED screens, P2.5 to P6 pixel pitch, professional setup & operation included.',
  keywords: 'LED wall rental Bahrain, LED screen rental Bahrain, video wall hire Bahrain, LED display rental Manama, event LED screen Bahrain, exhibition LED wall, conference screen rental',
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/led-wall-rental',
  },
  openGraph: {
    title: 'LED Wall Rental Bahrain 2026 | Video Wall Hire for Events',
    description: 'Professional LED video wall rental for events in Bahrain. All sizes and resolutions available.',
    type: 'article',
    locale: 'en_BH',
  },
};

const faqs = [
  {
    q: 'How much does LED wall rental cost in Bahrain?',
    a: 'LED wall rental in Bahrain typically costs BD 200-800 per day depending on size, resolution (pixel pitch), and whether it is indoor or outdoor. A standard 3m x 2m indoor P2.5 LED wall costs approximately BD 400-500/day. Request a free quote for exact pricing.',
  },
  {
    q: 'What sizes of LED walls are available for rent in Bahrain?',
    a: 'LED walls are modular and can be built to any size. Common rental sizes range from 2m x 1.5m (small presentations) to 10m x 4m+ (concerts and exhibitions). Custom sizes and curved configurations are available.',
  },
  {
    q: 'What is the difference between P2.5, P3, and P6 LED walls?',
    a: 'The P number indicates pixel pitch - the distance between LED pixels. P2.5 has 2.5mm spacing (highest resolution, best for close viewing), P3 has 3mm spacing (good for medium distances), and P6 has 6mm spacing (best for outdoor/long distance viewing).',
  },
  {
    q: 'Do you provide LED wall setup and operation?',
    a: 'Yes, LED wall rental in Bahrain includes professional delivery, installation, testing, on-site technical support during your event, and takedown. Operators ensure smooth content playback throughout your event.',
  },
  {
    q: 'Can LED walls be used outdoors in Bahrain?',
    a: 'Yes, outdoor-rated LED panels (typically P4, P5, P6) are weather-resistant and much brighter for daylight visibility. They are ideal for outdoor concerts, festivals, and building projections. Indoor panels should not be used outdoors.',
  },
  {
    q: 'What content formats work on LED walls?',
    a: 'LED walls accept most video formats including MP4, MOV, and AVI. Live camera feeds, PowerPoint presentations, and real-time graphics can also be displayed. Content support is included with rental.',
  },
];

const ledTypes = [
  {
    type: 'Indoor P2.5',
    pitch: '2.5mm',
    resolution: 'Ultra High',
    viewingDistance: '2-15 meters',
    bestFor: 'Conferences, TV studios, exhibitions, luxury events',
    priceRange: 'Premium',
  },
  {
    type: 'Indoor P3',
    pitch: '3mm',
    resolution: 'High',
    viewingDistance: '3-20 meters',
    bestFor: 'Corporate events, weddings, presentations, retail',
    priceRange: 'Standard',
  },
  {
    type: 'Outdoor P4',
    pitch: '4mm',
    resolution: 'High (Outdoor)',
    viewingDistance: '4-30 meters',
    bestFor: 'Outdoor concerts, festivals, building displays',
    priceRange: 'Premium',
  },
  {
    type: 'Outdoor P6',
    pitch: '6mm',
    resolution: 'Standard (Outdoor)',
    viewingDistance: '6-50+ meters',
    bestFor: 'Large outdoor events, sports venues, advertising',
    priceRange: 'Standard',
  },
];

const applications = [
  { name: 'Corporate Conferences', desc: 'Presentations, keynotes, branding' },
  { name: 'Exhibitions & Trade Shows', desc: 'BIEC, booth displays, product launches' },
  { name: 'Weddings & Celebrations', desc: 'Photo slideshows, live feeds, backdrops' },
  { name: 'Concerts & Festivals', desc: 'Stage backdrops, IMAG, visual effects' },
  { name: 'Sports Events', desc: 'Scoreboards, replays, sponsorship' },
  { name: 'Retail & Advertising', desc: 'Window displays, digital signage' },
];

const included = [
  'LED panels & processors',
  'Rigging & truss (if needed)',
  'Content playback system',
  'Delivery & installation',
  'On-site technical support',
  'Takedown & collection',
  'Power distribution',
  'Backup equipment',
];

export default function LEDWallRentalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950/20 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'LED Wall Rental Bahrain', url: 'https://www.bahrainnights.com/guides/led-wall-rental' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium mb-4">
              📺 Equipment Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              LED Wall Rental{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                Bahrain
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              High-resolution LED video walls for conferences, exhibitions, weddings, and concerts. 
              Professional installation and support included.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'LED Panels', value: '1000+', icon: Monitor },
              { label: 'Screen Sizes', value: 'Any', icon: Ruler },
              { label: 'Resolution', value: 'P2.5-P6', icon: Tv },
              { label: 'Support', value: '24/7', icon: Zap },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LED Types */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">
            LED Wall Types Available
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Choose the right resolution for your viewing distance and venue
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {ledTypes.map((led) => (
              <div 
                key={led.type}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-blue-500/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-blue-300">{led.type}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    led.priceRange === 'Premium' ? 'bg-amber-500/20 text-amber-400' : 'bg-green-500/20 text-green-400'
                  }`}>
                    {led.priceRange}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-gray-500">Pixel Pitch:</span>
                    <span className="text-white ml-2">{led.pitch}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Resolution:</span>
                    <span className="text-white ml-2">{led.resolution}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-500">Optimal Viewing:</span>
                    <span className="text-white ml-2">{led.viewingDistance}</span>
                  </div>
                </div>
                
                <div className="text-xs text-blue-300">
                  <strong>Best for:</strong> {led.bestFor}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            LED Wall Applications
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {applications.map((app) => (
              <div key={app.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold mb-2 text-blue-300">{app.name}</h3>
                <p className="text-sm text-gray-400">{app.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            What&apos;s Included in LED Wall Rental
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {included.map((item) => (
              <div key={item} className="flex items-center gap-3 bg-white/5 rounded-lg p-4">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-2xl p-8 md:p-12">
            <div className="text-center">
              <Tv className="w-12 h-12 mx-auto mb-4 text-blue-400" />
              <h2 className="text-3xl font-bold mb-4">Get Your LED Wall Quote</h2>
              <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                Events Bahrain provides professional LED wall rental with complete technical 
                support. Tell us your event details for a custom quote.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <a
                  href="https://www.eventsbahrain.com/led-video-wall-rental"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-lg transition-colors"
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
            LED Wall Rental FAQs
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-6">
                <h3 className="font-bold mb-2 text-blue-300">{faq.q}</h3>
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
              { title: 'Event Equipment Rental', href: '/guides/event-equipment-rental', emoji: '🎤' },
              { title: 'Video Production', href: '/guides/video-production', emoji: '🎬' },
              { title: 'Upcoming Events', href: '/events', emoji: '🎉' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group flex items-center gap-3"
              >
                <span className="text-2xl">{guide.emoji}</span>
                <span className="font-medium group-hover:text-blue-400 transition-colors">
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
            headline: 'LED Wall Rental Bahrain 2026',
            description: 'Complete guide to LED video wall rental in Bahrain for events, exhibitions, conferences and weddings.',
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
              '@id': 'https://www.bahrainnights.com/guides/led-wall-rental',
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
