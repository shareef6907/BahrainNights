import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Tv, Volume2, Building2, Lightbulb, ArrowRight,
  CheckCircle, Phone, Mail, Calendar, Star
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Event Equipment Rental Bahrain 2026 | Sound, Lighting & LED Walls',
  description: 'Rent professional event equipment in Bahrain - LED video walls, sound systems, stage lighting, exhibition booths & full production services for corporate events, weddings & concerts.',
  keywords: 'event equipment rental Bahrain, sound system rental Bahrain, lighting rental Bahrain, LED wall rental Bahrain, exhibition booth Bahrain, event production Bahrain, AV rental Bahrain',
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/event-equipment-rental',
  },
  openGraph: {
    title: 'Event Equipment Rental Bahrain 2026 | Sound, Lighting & LED Walls',
    description: 'Complete guide to renting professional event equipment in Bahrain - from LED walls to sound systems.',
    type: 'article',
    locale: 'en_BH',
  },
};

const faqs = [
  {
    q: 'What event equipment can I rent in Bahrain?',
    a: 'You can rent LED video walls, professional sound systems, stage lighting, truss structures, stages, exhibition booths, projectors, microphones, DJ equipment, and full AV setups for any event size.',
  },
  {
    q: 'How much does LED wall rental cost in Bahrain?',
    a: 'LED wall rental in Bahrain typically starts from BD 200-500 per day depending on size and resolution. Indoor P2.5-P3 panels cost more than outdoor P4-P6 panels. Get a free quote from Events Bahrain for exact pricing.',
  },
  {
    q: 'Do event equipment rental companies in Bahrain provide setup?',
    a: 'Yes, professional event rental companies like Events Bahrain provide full delivery, setup, operation during the event, and takedown services. Technical operators are available for sound and lighting.',
  },
  {
    q: 'How far in advance should I book event equipment in Bahrain?',
    a: 'For major events, book 2-4 weeks in advance. During peak seasons (F1 Grand Prix, National Day, wedding season), book at least 1 month ahead to ensure availability.',
  },
  {
    q: 'Can I rent exhibition booth materials in Bahrain?',
    a: 'Yes, Events Bahrain offers complete exhibition booth solutions including shell schemes, custom builds, furniture, lighting, and graphics for trade shows at Bahrain International Exhibition Centre and other venues.',
  },
];

const equipmentCategories = [
  {
    icon: Tv,
    title: 'LED Video Walls',
    description: 'High-resolution indoor and outdoor LED screens',
    features: ['P2.5, P3, P4, P6 pixel pitch options', 'Indoor & outdoor configurations', 'Curved & flat installations', 'Content playback included'],
    useCases: 'Conferences, concerts, weddings, exhibitions, product launches',
  },
  {
    icon: Volume2,
    title: 'Sound Systems',
    description: 'Professional audio for any venue size',
    features: ['Line array systems', 'PA speakers & subwoofers', 'Wireless microphones', 'Digital mixing consoles'],
    useCases: 'Concerts, corporate events, weddings, outdoor festivals',
  },
  {
    icon: Lightbulb,
    title: 'Stage Lighting',
    description: 'Create the perfect atmosphere',
    features: ['Moving head lights', 'LED uplighting', 'Followspots', 'Haze & fog machines'],
    useCases: 'Galas, performances, fashion shows, nightclub events',
  },
  {
    icon: Building2,
    title: 'Exhibition Booths',
    description: 'Stand out at trade shows',
    features: ['Modular shell schemes', 'Custom booth builds', 'Furniture & counters', 'Signage & graphics'],
    useCases: 'Trade shows, job fairs, product exhibitions, brand activations',
  },
];

const eventTypes = [
  { name: 'Corporate Conferences', equipment: 'LED walls, sound, wireless mics, staging' },
  { name: 'Weddings & Celebrations', equipment: 'Lighting, sound, LED screens, decor lighting' },
  { name: 'Concerts & Live Events', equipment: 'Line arrays, stage lighting, LED backdrops' },
  { name: 'Exhibition & Trade Shows', equipment: 'Booth structures, AV equipment, furniture' },
  { name: 'Product Launches', equipment: 'LED walls, professional lighting, sound' },
  { name: 'Outdoor Festivals', equipment: 'Weatherproof sound, outdoor LED, truss staging' },
];

export default function EventEquipmentRentalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Event Equipment Rental', url: 'https://www.bahrainnights.com/guides/event-equipment-rental' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium mb-4">
              🎤 Event Production Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Event Equipment{' '}
              <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                Rental Bahrain
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need for professional events — LED walls, sound systems, 
              stage lighting, and exhibition booths from Bahrain&apos;s leading rental company.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Years Experience', value: '15+', icon: Star },
              { label: 'Events Delivered', value: '500+', icon: Calendar },
              { label: 'LED Panels', value: '1000+', icon: Tv },
              { label: 'Coverage', value: 'All Bahrain', icon: Building2 },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Categories */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Equipment Categories
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Professional-grade equipment for events of any scale
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {equipmentCategories.map((category) => (
              <div 
                key={category.title}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 hover:border-purple-500/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-500/20 rounded-lg">
                    <category.icon className="w-8 h-8 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                    <p className="text-gray-400 mb-4">{category.description}</p>
                    
                    <ul className="space-y-2 mb-4">
                      {category.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="text-xs text-purple-300">
                      <strong>Best for:</strong> {category.useCases}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Equipment by Event Type
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {eventTypes.map((event) => (
              <div key={event.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold mb-2 text-purple-300">{event.name}</h3>
                <p className="text-sm text-gray-400">{event.equipment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Events Bahrain */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-2xl p-8 md:p-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Get a Free Quote</h2>
              <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                Events Bahrain is the leading event equipment rental company in Bahrain. 
                Get a customized quote for your next event.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <a
                  href="https://www.eventsbahrain.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-purple-500 hover:bg-purple-400 text-white font-bold rounded-lg transition-colors"
                >
                  Visit Events Bahrain
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
                  Serving all of Bahrain
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
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-6">
                <h3 className="font-bold mb-2 text-purple-300">{faq.q}</h3>
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
              { title: 'Video Production Bahrain', href: '/guides/video-production', emoji: '🎬' },
              { title: 'Upcoming Events', href: '/events', emoji: '🎉' },
              { title: 'Venues in Bahrain', href: '/places', emoji: '🏛️' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group flex items-center gap-3"
              >
                <span className="text-2xl">{guide.emoji}</span>
                <span className="font-medium group-hover:text-purple-400 transition-colors">
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
            headline: 'Event Equipment Rental Bahrain 2026',
            description: 'Complete guide to renting professional event equipment in Bahrain including LED walls, sound systems, lighting, and exhibition booths.',
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
              '@id': 'https://www.bahrainnights.com/guides/event-equipment-rental',
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
