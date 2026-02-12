import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Video, Camera, Film, Clapperboard, ArrowRight,
  CheckCircle, Phone, Mail, Play, Star, Award
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Video Production Bahrain 2026 | Corporate Videos, Events & Films',
  description: 'Professional video production services in Bahrain - corporate videos, event coverage, commercials, wedding films & post-production. Award-winning cinematography.',
  keywords: 'video production Bahrain, film production Bahrain, corporate video Bahrain, wedding videography Bahrain, commercial production Bahrain, event video Bahrain',
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/video-production',
  },
  openGraph: {
    title: 'Video Production Bahrain 2026 | Corporate Videos, Events & Films',
    description: 'Complete guide to professional video production services in Bahrain.',
    type: 'article',
    locale: 'en_BH',
  },
};

const faqs = [
  {
    q: 'How much does video production cost in Bahrain?',
    a: 'Video production in Bahrain varies based on scope. Corporate videos start from BD 500-2000, event coverage from BD 300-800/day, wedding films from BD 800-2500, and commercials from BD 2000-10000+ depending on complexity.',
  },
  {
    q: 'What video production services are available in Bahrain?',
    a: 'Professional services include corporate videos, TV commercials, event coverage, wedding cinematography, documentary production, animation, live streaming, and full post-production including editing, color grading, and motion graphics.',
  },
  {
    q: 'How long does it take to produce a corporate video in Bahrain?',
    a: 'A typical corporate video takes 2-4 weeks from concept to delivery. This includes pre-production (scripting, planning), 1-2 days of filming, and 1-2 weeks of post-production. Rush projects can be completed faster.',
  },
  {
    q: 'Do video production companies in Bahrain provide equipment rental?',
    a: 'Most full-service production companies include equipment in their packages. For standalone equipment rental (cameras, lighting, etc.), contact the production company directly for availability and rates.',
  },
];

const services = [
  {
    icon: Film,
    title: 'Corporate Videos',
    description: 'Professional company profiles, training videos & internal communications',
    features: ['Company profile films', 'Training & educational videos', 'Product demonstrations', 'Executive interviews'],
    pricing: 'From BD 500',
  },
  {
    icon: Camera,
    title: 'Event Coverage',
    description: 'Multi-camera coverage for conferences, galas & corporate events',
    features: ['Multi-camera setup', 'Live switching', 'Same-day highlights', 'Full event documentary'],
    pricing: 'From BD 300/day',
  },
  {
    icon: Clapperboard,
    title: 'Commercials & Ads',
    description: 'TV commercials, social media ads & promotional content',
    features: ['TVC production', 'Social media content', 'Product commercials', 'Brand films'],
    pricing: 'From BD 2000',
  },
  {
    icon: Video,
    title: 'Wedding Cinematography',
    description: 'Cinematic wedding films that tell your love story',
    features: ['Full day coverage', 'Highlight reels', 'Documentary style', 'Same-day edits'],
    pricing: 'From BD 800',
  },
];

const capabilities = [
  '4K & 8K Cinema Cameras',
  'Professional Lighting',
  'Gimbal Stabilization',
  'Live Streaming',
  'Motion Graphics',
  'Color Grading',
  '3D Animation',
  'Voice-Over Recording',
  'Multi-Language Subtitles',
  'Social Media Cuts',
];

const industries = [
  'Banking & Finance',
  'Healthcare',
  'Real Estate',
  'Government',
  'Hospitality',
  'Education',
  'Retail & F&B',
  'Manufacturing',
];

export default function VideoProductionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-rose-950/20 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Video Production Bahrain', url: 'https://www.bahrainnights.com/guides/video-production' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 to-orange-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-rose-500/20 text-rose-400 rounded-full text-sm font-medium mb-4">
              🎬 Production Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Video Production{' '}
              <span className="bg-gradient-to-r from-rose-400 to-orange-500 bg-clip-text text-transparent">
                Bahrain
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From corporate videos to cinematic wedding films — professional video production 
              services for businesses and events across Bahrain.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Years Experience', value: '12+', icon: Star },
              { label: 'Videos Produced', value: '800+', icon: Film },
              { label: 'Happy Clients', value: '300+', icon: Award },
              { label: 'Countries', value: '15+', icon: Camera },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-rose-400" />
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
            Video Production Services
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Full-service video production from concept to final delivery
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div 
                key={service.title}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 hover:border-rose-500/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-rose-500/20 rounded-lg">
                    <service.icon className="w-8 h-8 text-rose-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold">{service.title}</h3>
                      <span className="text-sm text-rose-400 font-medium">{service.pricing}</span>
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

      {/* Capabilities */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Production Capabilities
          </h2>
          
          <div className="flex flex-wrap justify-center gap-3">
            {capabilities.map((cap) => (
              <span 
                key={cap}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300"
              >
                {cap}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Industries We Serve
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Experience across Bahrain&apos;s key sectors
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {industries.map((industry) => (
              <div 
                key={industry}
                className="bg-gradient-to-br from-rose-500/10 to-orange-500/10 rounded-xl p-4 text-center"
              >
                <span className="text-gray-300">{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-rose-500/20 to-orange-500/20 border border-rose-500/30 rounded-2xl p-8 md:p-12">
            <div className="text-center">
              <Play className="w-12 h-12 mx-auto mb-4 text-rose-400" />
              <h2 className="text-3xl font-bold mb-4">Start Your Project</h2>
              <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                Film Production Bahrain delivers award-winning video content for businesses 
                and events. Let&apos;s bring your vision to life.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <a
                  href="https://www.filmproductionbahrain.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-rose-500 hover:bg-rose-400 text-white font-bold rounded-lg transition-colors"
                >
                  View Portfolio
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
                <h3 className="font-bold mb-2 text-rose-300">{faq.q}</h3>
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
              { title: 'Upcoming Events', href: '/events', emoji: '🎉' },
              { title: 'Wedding Venues', href: '/places?category=wedding', emoji: '💒' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group flex items-center gap-3"
              >
                <span className="text-2xl">{guide.emoji}</span>
                <span className="font-medium group-hover:text-rose-400 transition-colors">
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
            headline: 'Video Production Bahrain 2026',
            description: 'Complete guide to professional video production services in Bahrain including corporate videos, event coverage, and wedding cinematography.',
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
              '@id': 'https://www.bahrainnights.com/guides/video-production',
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
            },
          }),
        }}
      />
    </div>
  );
}
