import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Building2, Palette, Tv, ArrowRight,
  CheckCircle, Phone, Mail, MapPin, Star, Users
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Exhibition Booth Rental Bahrain 2026 | Trade Show Stands & Displays',
  description: 'Rent exhibition booths in Bahrain for trade shows at BIEC, job fairs & expos. Custom booth design, shell schemes, modular stands, furniture & graphics included.',
  keywords: 'exhibition booth Bahrain, trade show booth rental, BIEC booth, exhibition stand Bahrain, expo booth rental, trade show display Bahrain, exhibition contractor Bahrain',
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/exhibition-booth-rental',
  },
  openGraph: {
    title: 'Exhibition Booth Rental Bahrain 2026 | Trade Show Stands & Displays',
    description: 'Professional exhibition booth rental and custom stand building for trade shows in Bahrain.',
    type: 'article',
    locale: 'en_BH',
  },
};

const faqs = [
  {
    q: 'How much does an exhibition booth cost in Bahrain?',
    a: 'Exhibition booth rental in Bahrain ranges from BD 300-500 for a basic 3x3m shell scheme to BD 2000-10000+ for custom-built booths. Price depends on size, design complexity, graphics, furniture, and AV equipment.',
  },
  {
    q: 'What is included in a shell scheme booth?',
    a: 'A standard shell scheme includes aluminum frame walls, fascia board with company name, carpet flooring, 2-3 spotlights, 1 power socket, and basic furniture (table + chairs). Graphics, screens, and custom elements are additional.',
  },
  {
    q: 'Can you build custom exhibition booths in Bahrain?',
    a: 'Yes, Events Bahrain designs and builds fully custom exhibition booths with 3D visualization, unique structures, integrated lighting, LED screens, meeting rooms, and branded graphics. Full project management included.',
  },
  {
    q: 'Which exhibition venues do you cover in Bahrain?',
    a: 'We provide exhibition booth services at all Bahrain venues including Bahrain International Exhibition Centre (BIEC), Gulf Hotel Convention Centre, ART Rotana, Ritz-Carlton, and all major hotels.',
  },
  {
    q: 'How far in advance should I book an exhibition booth?',
    a: 'For shell schemes, 2-3 weeks is usually sufficient. For custom booth builds, book at least 4-6 weeks in advance to allow for design, approval, and construction. Major exhibitions may require earlier booking.',
  },
  {
    q: 'Do you handle booth installation and dismantling?',
    a: 'Yes, we provide complete booth installation before the exhibition and dismantling after. Our team handles all logistics, including coordination with venue organizers and compliance with safety regulations.',
  },
];

const boothTypes = [
  {
    name: 'Shell Scheme',
    description: 'Ready-made modular booth with standard fixtures',
    sizes: ['3x3m', '3x4m', '3x6m', '6x6m'],
    includes: ['Frame walls', 'Fascia board', 'Carpet', 'Lights', 'Power', 'Basic furniture'],
    priceRange: 'BD 300-800',
    bestFor: 'First-time exhibitors, budget-conscious companies',
  },
  {
    name: 'Modular Custom',
    description: 'Reusable modular system with custom graphics',
    sizes: ['Any size', 'Scalable', 'Reconfigurable'],
    includes: ['Modular frames', 'Custom graphics', 'Lighting', 'Furniture', 'Storage'],
    priceRange: 'BD 800-2500',
    bestFor: 'Regular exhibitors, brand consistency',
  },
  {
    name: 'Fully Custom',
    description: 'Bespoke design built from scratch',
    sizes: ['Any configuration', 'Double-deck available', 'Islands'],
    includes: ['3D design', 'Unique structure', 'All elements', 'Project management'],
    priceRange: 'BD 2500-15000+',
    bestFor: 'Premium brands, product launches, major exhibitions',
  },
];

const addOns = [
  { name: 'LED Video Walls', desc: 'High-impact digital displays' },
  { name: 'Interactive Touchscreens', desc: 'Product catalogs, presentations' },
  { name: 'Meeting Rooms', desc: 'Private enclosed spaces' },
  { name: 'Reception Counters', desc: 'Branded welcome desks' },
  { name: 'Product Display Cases', desc: 'Lit showcases for products' },
  { name: 'Hanging Signage', desc: 'Overhead branding (venue permitting)' },
  { name: 'Flooring Upgrades', desc: 'Raised platforms, custom flooring' },
  { name: 'Hostesses & Staff', desc: 'Professional booth personnel' },
];

const venues = [
  { name: 'Bahrain International Exhibition Centre (BIEC)', location: 'Sanabis', type: 'Major exhibitions' },
  { name: 'Gulf Hotel Convention Centre', location: 'Adliya', type: 'Conferences & smaller expos' },
  { name: 'ART Rotana', location: 'Amwaj', type: 'Corporate exhibitions' },
  { name: 'The Ritz-Carlton', location: 'Seef', type: 'Premium events' },
  { name: 'Crowne Plaza', location: 'Diplomatic Area', type: 'Trade shows' },
  { name: 'Exhibition World Bahrain', location: 'Sakhir', type: 'Large-scale exhibitions' },
];

export default function ExhibitionBoothRentalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-emerald-950/20 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Exhibition Booth Rental', url: 'https://www.bahrainnights.com/guides/exhibition-booth-rental' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium mb-4">
              🏛️ Exhibition Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Exhibition Booth{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                Rental Bahrain
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Professional exhibition stands for trade shows, job fairs, and expos. 
              From shell schemes to fully custom booths at BIEC and all Bahrain venues.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Exhibitions', value: '100+', icon: Building2 },
              { label: 'Custom Builds', value: '50+', icon: Palette },
              { label: 'Venues Covered', value: 'All', icon: MapPin },
              { label: 'Happy Clients', value: '200+', icon: Users },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-emerald-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booth Types */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Exhibition Booth Options
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Choose the right booth type for your exhibition goals and budget
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {boothTypes.map((booth) => (
              <div 
                key={booth.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-emerald-500/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-emerald-300">{booth.name}</h3>
                  <span className="text-sm text-emerald-400 font-medium">{booth.priceRange}</span>
                </div>
                <p className="text-gray-400 mb-4">{booth.description}</p>
                
                <div className="mb-4">
                  <div className="text-xs text-gray-500 mb-2">Sizes:</div>
                  <div className="flex flex-wrap gap-1">
                    {booth.sizes.map((size) => (
                      <span key={size} className="px-2 py-1 bg-black/30 rounded text-xs text-gray-300">
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-xs text-gray-500 mb-2">Includes:</div>
                  <ul className="space-y-1">
                    {booth.includes.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-gray-300">
                        <CheckCircle className="w-3 h-3 text-green-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="text-xs text-emerald-300">
                  <strong>Best for:</strong> {booth.bestFor}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Booth Add-Ons & Upgrades
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {addOns.map((addon) => (
              <div key={addon.name} className="bg-white/5 rounded-xl p-4">
                <h3 className="font-bold mb-1 text-emerald-300">{addon.name}</h3>
                <p className="text-sm text-gray-400">{addon.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venues */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Exhibition Venues in Bahrain
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {venues.map((venue) => (
              <div key={venue.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold mb-2">{venue.name}</h3>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">{venue.location}</span>
                  <span className="text-emerald-400">{venue.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-2xl p-8 md:p-12">
            <div className="text-center">
              <Building2 className="w-12 h-12 mx-auto mb-4 text-emerald-400" />
              <h2 className="text-3xl font-bold mb-4">Get Your Exhibition Quote</h2>
              <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                Events Bahrain is an official exhibition contractor providing booth design, 
                construction, and logistics for all major venues in Bahrain.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <a
                  href="https://www.eventsbahrain.com/exhibition-booth-building"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-lg transition-colors"
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
                  <MapPin className="w-4 h-4" />
                  All Bahrain venues
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
            Exhibition Booth FAQs
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-6">
                <h3 className="font-bold mb-2 text-emerald-300">{faq.q}</h3>
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
              { title: 'Upcoming Events', href: '/events', emoji: '🎉' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group flex items-center gap-3"
              >
                <span className="text-2xl">{guide.emoji}</span>
                <span className="font-medium group-hover:text-emerald-400 transition-colors">
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
            headline: 'Exhibition Booth Rental Bahrain 2026',
            description: 'Complete guide to exhibition booth rental in Bahrain for trade shows at BIEC and other venues.',
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
              '@id': 'https://www.bahrainnights.com/guides/exhibition-booth-rental',
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
