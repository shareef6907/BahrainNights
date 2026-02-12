import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Plane, Camera, Video, Building2, ArrowRight,
  CheckCircle, Phone, Mail, MapPin, Shield, Award
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Drone Filming Bahrain 2026 | Aerial Photography & Videography',
  description: 'Professional drone filming services in Bahrain - aerial photography, real estate videos, event coverage, construction progress, tourism & promotional content. GACA licensed operators.',
  keywords: 'drone filming Bahrain, aerial photography Bahrain, drone videography Bahrain, real estate drone Bahrain, drone services Bahrain, aerial video Bahrain, drone operator Bahrain',
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/drone-filming',
  },
  openGraph: {
    title: 'Drone Filming Bahrain 2026 | Aerial Photography & Videography',
    description: 'Complete guide to professional drone filming services in Bahrain.',
    type: 'article',
    locale: 'en_BH',
  },
};

const faqs = [
  {
    q: 'Do I need a permit for drone filming in Bahrain?',
    a: 'Yes, drone filming in Bahrain requires proper authorization from the Civil Aviation Affairs (CAA). Commercial drone operators must hold a valid Remote Pilot License (RPL) and obtain flight permits for specific locations. Professional production companies like Film Production Bahrain handle all permits as part of their service.',
  },
  {
    q: 'How much does drone filming cost in Bahrain?',
    a: 'Professional drone filming in Bahrain starts from BD 150 for basic aerial photos. Half-day shoots (up to 4 hours) range from BD 250-400, full-day coverage from BD 400-600, and multi-day projects are quoted based on scope. Permits and editing are typically included.',
  },
  {
    q: 'Where can drones fly in Bahrain?',
    a: 'Drones can fly in approved areas away from airports, military installations, and restricted zones. No-fly zones include areas near Bahrain International Airport, Isa Air Base, and government buildings. Licensed operators know the regulations and handle location clearances.',
  },
  {
    q: 'What drone equipment is used for professional filming?',
    a: 'Professional operators use cinema-grade drones like DJI Inspire 3 and Mavic 3 Pro Cine capable of 5.1K/8K recording. For specialized shots, FPV drones provide dynamic cinematic movements. All equipment includes ND filters, extra batteries, and backup units.',
  },
  {
    q: 'Can drones film at events and weddings in Bahrain?',
    a: 'Yes, drone filming is popular for outdoor weddings, corporate events, and festivals in Bahrain. Indoor flying is possible in large venues with proper safety measures. Film Production Bahrain provides licensed operators with full insurance for event coverage.',
  },
  {
    q: 'How far in advance should I book drone filming?',
    a: 'Book at least 1-2 weeks in advance to allow time for permits, especially for locations near restricted areas. For major events or complex shoots, 3-4 weeks notice is recommended. Rush bookings may be possible with additional fees.',
  },
];

const services = [
  {
    icon: Building2,
    title: 'Real Estate & Property',
    description: 'Stunning aerial views that sell properties faster',
    features: ['Villa & apartment showcases', 'Development marketing', 'Virtual tour integration', 'Twilight shoots'],
    pricing: 'From BD 200',
  },
  {
    icon: Video,
    title: 'Event Coverage',
    description: 'Capture your event from breathtaking angles',
    features: ['Corporate events', 'Outdoor weddings', 'Festivals & concerts', 'Sports events'],
    pricing: 'From BD 300',
  },
  {
    icon: Camera,
    title: 'Commercial & Tourism',
    description: 'Promotional content that showcases Bahrain',
    features: ['Hotel & resort videos', 'Destination marketing', 'Brand commercials', 'Social media content'],
    pricing: 'From BD 400',
  },
  {
    icon: Plane,
    title: 'Construction Progress',
    description: 'Document your project from groundbreaking to completion',
    features: ['Weekly/monthly updates', 'Site surveys', 'Stakeholder reports', 'Time-lapse compilation'],
    pricing: 'From BD 150/visit',
  },
];

const equipment = [
  'DJI Inspire 3 (8K Cinema)',
  'DJI Mavic 3 Pro Cine (5.1K)',
  'FPV Cinewhoop Drones',
  'DJI Mini 4 Pro (Compact)',
  'Thermal Imaging Camera',
  'ND Filter Kits',
  'Live Monitoring Systems',
  'Backup Aircraft',
];

const applications = [
  { name: 'Real Estate Marketing', icon: '🏠' },
  { name: 'Wedding Films', icon: '💒' },
  { name: 'Corporate Events', icon: '🎤' },
  { name: 'Construction Sites', icon: '🏗️' },
  { name: 'Tourism Promotion', icon: '✈️' },
  { name: 'Sports Coverage', icon: '⚽' },
  { name: 'TV Commercials', icon: '📺' },
  { name: 'Music Videos', icon: '🎵' },
];

export default function DroneFilmingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-sky-950/20 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Drone Filming Bahrain', url: 'https://www.bahrainnights.com/guides/drone-filming' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-blue-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-sky-500/20 text-sky-400 rounded-full text-sm font-medium mb-4">
              🚁 Aerial Services
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Drone Filming{' '}
              <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
                Bahrain
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Professional aerial photography and videography for real estate, events, 
              construction, and commercial productions — fully licensed and insured.
            </p>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'CAA Licensed', value: '✓', icon: Shield },
              { label: 'Full Insurance', value: '✓', icon: Shield },
              { label: 'Projects Done', value: '500+', icon: Camera },
              { label: 'Years Experience', value: '8+', icon: Award },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-sky-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Aerial Filming Services
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            From sweeping landscape shots to dynamic tracking sequences
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div 
                key={service.title}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 hover:border-sky-500/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-sky-500/20 rounded-lg">
                    <service.icon className="w-8 h-8 text-sky-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold">{service.title}</h3>
                      <span className="text-sm text-sky-400 font-medium">{service.pricing}</span>
                    </div>
                    <p className="text-gray-400 mb-4">{service.description}</p>
                    
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Popular Applications
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Aerial perspectives that transform your content
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {applications.map((app) => (
              <div 
                key={app.name}
                className="bg-gradient-to-br from-sky-500/10 to-blue-500/10 rounded-xl p-4 text-center"
              >
                <span className="text-3xl mb-2 block">{app.icon}</span>
                <span className="text-gray-300 text-sm">{app.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Professional Equipment
          </h2>
          
          <div className="flex flex-wrap justify-center gap-3">
            {equipment.map((item) => (
              <span 
                key={item}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Regulations Notice */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 text-amber-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2 text-amber-300">Bahrain Drone Regulations</h3>
                <p className="text-gray-300 mb-4">
                  Drone operations in Bahrain are regulated by the Civil Aviation Affairs (CAA). 
                  All commercial drone filming requires:
                </p>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
                    Remote Pilot License (RPL) from CAA
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
                    Flight authorization for specific locations
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
                    Third-party liability insurance
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
                    Compliance with no-fly zones and altitude limits
                  </li>
                </ul>
                <p className="text-sm text-amber-400/80 mt-4">
                  Our licensed operators handle all permits and authorizations — you focus on the creative vision.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-sky-500/20 to-blue-500/20 border border-sky-500/30 rounded-2xl p-8 md:p-12">
            <div className="text-center">
              <Plane className="w-12 h-12 mx-auto mb-4 text-sky-400" />
              <h2 className="text-3xl font-bold mb-4">Book Your Aerial Shoot</h2>
              <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                Film Production Bahrain provides professional drone filming services with 
                full CAA licensing, insurance, and permit handling. Get stunning aerial content.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <a
                  href="https://www.filmproductionbahrain.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-lg transition-colors"
                >
                  View Aerial Portfolio
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
                  info@filmproductionbahrain.com
                </div>
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Manama, Bahrain
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
                <h3 className="font-bold mb-2 text-sky-300">{faq.q}</h3>
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
              { title: 'Wedding Videography', href: '/guides/wedding-videography', emoji: '💒' },
              { title: 'Event Equipment Rental', href: '/guides/event-equipment-rental', emoji: '🎤' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group flex items-center gap-3"
              >
                <span className="text-2xl">{guide.emoji}</span>
                <span className="font-medium group-hover:text-sky-400 transition-colors">
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
            headline: 'Drone Filming Bahrain 2026',
            description: 'Complete guide to professional drone filming and aerial photography services in Bahrain including real estate, events, construction, and commercial productions.',
            author: {
              '@type': 'Organization',
              name: 'BahrainNights',
              url: 'https://www.bahrainnights.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'BahrainNights',
            },
            datePublished: '2026-02-12',
            dateModified: '2026-02-12',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://www.bahrainnights.com/guides/drone-filming',
            },
            mentions: {
              '@type': 'LocalBusiness',
              name: 'Film Production Bahrain',
              url: 'https://www.filmproductionbahrain.com',
              telephone: '+973 3900 7750',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'BH',
                addressLocality: 'Manama',
              },
              priceRange: 'BD 150 - BD 600+',
            },
          }),
        }}
      />
    </div>
  );
}
