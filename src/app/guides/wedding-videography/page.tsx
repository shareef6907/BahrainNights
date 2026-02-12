import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Heart, Camera, Film, Sparkles, ArrowRight,
  CheckCircle, Phone, Mail, Star, Clock, MapPin
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Wedding Videography Bahrain 2026 | Cinematic Wedding Films',
  description: 'Professional wedding videography in Bahrain - cinematic films, same-day edits & multicam coverage. Capture your special day beautifully.',
  keywords: 'wedding videography Bahrain, wedding video Bahrain, wedding cinematography Bahrain, wedding film Bahrain, Bahrain wedding videographer, Arabic wedding video, destination wedding Bahrain',
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/wedding-videography',
  },
  openGraph: {
    title: 'Wedding Videography Bahrain 2026 | Cinematic Wedding Films',
    description: 'Complete guide to wedding videography services in Bahrain.',
    type: 'article',
    locale: 'en_BH',
  },
};

const faqs = [
  {
    q: 'How much does wedding videography cost in Bahrain?',
    a: 'Wedding videography in Bahrain typically ranges from BD 800-2500+ depending on coverage. Basic packages (6-8 hours, highlight reel) start around BD 800. Full-day cinematic coverage with multiple cameras and documentary-style editing ranges from BD 1500-2500.',
  },
  {
    q: 'What should I look for in a Bahrain wedding videographer?',
    a: 'Look for: 1) Portfolio showing weddings similar to yours (Arabic, Western, Indian style), 2) Experience with your venue, 3) Equipment quality (4K cameras, stabilizers), 4) Editing style that matches your taste, 5) Reviews from previous couples, and 6) Clear contract terms.',
  },
  {
    q: 'How long does it take to receive the wedding video?',
    a: 'Standard delivery is 6-12 weeks after the wedding. Highlight reels (3-5 minutes) are usually ready in 4-6 weeks. Same-day edits for reception screenings take 4-8 hours. Rush delivery is available for an additional fee.',
  },
  {
    q: 'Do I need both a photographer and videographer for my wedding?',
    a: 'While some couples choose one or the other, having both is recommended. Photos capture perfect frozen moments, while video preserves voices, vows, speeches, and the movement of your day. Many companies offer combined packages for better value.',
  },
  {
    q: 'Can wedding videographers film Arabic and traditional ceremonies?',
    a: 'Yes, experienced Bahrain videographers understand local customs including Milcha, Laylat Al Henna, Zaffa, and traditional ceremonies. They know appropriate angles and moments to capture while respecting cultural sensitivities.',
  },
  {
    q: 'What is a same-day edit wedding video?',
    a: 'A same-day edit (SDE) is a 3-5 minute highlight video edited during the wedding and screened at the reception. It captures the day\'s best moments from preparation to ceremony, creating a memorable surprise for guests.',
  },
];

const packages = [
  {
    name: 'Essential',
    price: 'BD 800',
    duration: '6 hours',
    features: [
      'Single videographer',
      '1 camera coverage',
      '3-5 min highlight reel',
      'Full ceremony edit',
      '4-6 week delivery',
      'Online delivery',
    ],
    popular: false,
  },
  {
    name: 'Cinematic',
    price: 'BD 1,500',
    duration: '10 hours',
    features: [
      'Lead + assistant videographer',
      'Multi-camera coverage',
      '5-8 min cinematic film',
      'Full ceremony & speeches',
      'Cinematic color grading',
      'USB in premium box',
    ],
    popular: true,
  },
  {
    name: 'Premium',
    price: 'BD 2,500',
    duration: 'Full day',
    features: [
      '2 videographers',
      '3+ camera angles',
      '10-15 min documentary film',
      'Same-day edit screening',
      'Gimbal + crane shots',
      'Raw footage included',
    ],
    popular: false,
  },
];

const styles = [
  {
    name: 'Cinematic',
    description: 'Film-like storytelling with dramatic shots, color grading, and curated music',
    icon: Film,
  },
  {
    name: 'Documentary',
    description: 'Natural, chronological coverage capturing authentic moments as they unfold',
    icon: Camera,
  },
  {
    name: 'Traditional',
    description: 'Classic coverage focused on key moments, ceremonies, and family portraits',
    icon: Heart,
  },
  {
    name: 'Highlight Reel',
    description: 'Fast-paced 3-5 minute edit perfect for social media sharing',
    icon: Sparkles,
  },
];

const venueTypes = [
  { name: 'Hotels & Ballrooms', examples: 'Four Seasons, Ritz-Carlton, Gulf Hotel' },
  { name: 'Beach Venues', examples: 'Coral Bay, Sofitel Private Beach, Reef Resort' },
  { name: 'Traditional Halls', examples: 'Al Fateh Hall, Isa Cultural Centre' },
  { name: 'Garden Venues', examples: 'Al Areen, Lost Paradise, Botanical Garden' },
  { name: 'Destination Weddings', examples: 'Desert camps, yachts, private islands' },
];

export default function WeddingVideographyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-pink-950/20 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Wedding Videography', url: 'https://www.bahrainnights.com/guides/wedding-videography' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-rose-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-pink-500/20 text-pink-400 rounded-full text-sm font-medium mb-4">
              💒 Wedding Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Wedding Videography{' '}
              <span className="bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent">
                Bahrain
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your wedding day happens once. Cinematic videography preserves every emotion, 
              every vow, every celebration — forever.
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Weddings Filmed', value: '400+', icon: Heart },
              { label: 'Years Experience', value: '12+', icon: Star },
              { label: 'Happy Couples', value: '400+', icon: Sparkles },
              { label: 'Venues Covered', value: '50+', icon: MapPin },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-pink-400" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Wedding Video Packages
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Packages tailored for every wedding style and budget
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div 
                key={pkg.name}
                className={`relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border transition-colors ${
                  pkg.popular 
                    ? 'border-pink-500/50 ring-1 ring-pink-500/20' 
                    : 'border-white/10 hover:border-pink-500/30'
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-pink-500 text-white text-xs font-bold rounded-full">
                    Most Popular
                  </span>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-black text-pink-400">{pkg.price}</div>
                  <div className="text-sm text-gray-400 flex items-center justify-center gap-1 mt-1">
                    <Clock className="w-4 h-4" />
                    {pkg.duration} coverage
                  </div>
                </div>
                
                <ul className="space-y-3">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <p className="text-center text-gray-400 text-sm mt-8">
            * All packages include pre-wedding consultation and custom music licensing
          </p>
        </div>
      </section>

      {/* Styles */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Video Styles
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Choose the storytelling approach that matches your vision
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {styles.map((style) => (
              <div 
                key={style.name}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center"
              >
                <style.icon className="w-10 h-10 mx-auto mb-4 text-pink-400" />
                <h3 className="font-bold mb-2">{style.name}</h3>
                <p className="text-sm text-gray-400">{style.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venue Experience */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Venue Experience
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Filmed at Bahrain&apos;s top wedding venues
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {venueTypes.map((venue) => (
              <div 
                key={venue.name}
                className="bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-xl p-5"
              >
                <h3 className="font-bold mb-1">{venue.name}</h3>
                <p className="text-sm text-gray-400">{venue.examples}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            What We Capture
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-pink-400">Before the Ceremony</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Bridal preparation & getting ready</li>
                <li>• Groom preparation</li>
                <li>• Dress reveal moments</li>
                <li>• Family interactions</li>
                <li>• Venue details & decor</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-pink-400">The Ceremony</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Grand entrance / Zaffa</li>
                <li>• Vows and ring exchange</li>
                <li>• Traditional rituals (Milcha, etc.)</li>
                <li>• First kiss & pronouncement</li>
                <li>• Guest reactions</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-pink-400">Reception & Party</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• First dance</li>
                <li>• Cake cutting</li>
                <li>• Speeches & toasts</li>
                <li>• Dancing & celebrations</li>
                <li>• Bouquet toss / traditions</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-pink-400">Special Shots</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Wide-angle venue shots</li>
                <li>• Sunset/golden hour portraits</li>
                <li>• Slow-motion moments</li>
                <li>• Candid guest interactions</li>
                <li>• Exit & send-off</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-pink-500/20 to-rose-500/20 border border-pink-500/30 rounded-2xl p-8 md:p-12">
            <div className="text-center">
              <Heart className="w-12 h-12 mx-auto mb-4 text-pink-400" />
              <h2 className="text-3xl font-bold mb-4">Let&apos;s Capture Your Love Story</h2>
              <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                Film Production Bahrain creates cinematic wedding films that you&apos;ll treasure 
                for generations. Book your consultation today.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <a
                  href="https://www.filmproductionbahrain.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-pink-500 hover:bg-pink-400 text-white font-bold rounded-lg transition-colors"
                >
                  View Wedding Portfolio
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
            Wedding Video FAQs
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-6">
                <h3 className="font-bold mb-2 text-pink-300">{faq.q}</h3>
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
              { title: 'Video Production', href: '/guides/video-production', emoji: '🎬' },
              { title: 'Event Equipment Rental', href: '/guides/event-equipment-rental', emoji: '🎤' },
              { title: 'Hotels & Venues', href: '/guides/hotels', emoji: '🏨' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group flex items-center gap-3"
              >
                <span className="text-2xl">{guide.emoji}</span>
                <span className="font-medium group-hover:text-pink-400 transition-colors">
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
            headline: 'Wedding Videography Bahrain 2026',
            description: 'Complete guide to wedding videography services in Bahrain including packages, styles, and what to expect.',
            author: {
              '@type': 'Organization',
              name: 'BahrainNights',
              url: 'https://www.bahrainnights.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'BahrainNights',
            },
            datePublished: '2026-02-11',
            dateModified: '2026-02-11',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://www.bahrainnights.com/guides/wedding-videography',
            },
            mentions: {
              '@type': 'LocalBusiness',
              name: 'Film Production Bahrain',
              url: 'https://www.filmproductionbahrain.com',
              telephone: '+973 3900 7750',
              priceRange: 'BD 800 - BD 2500',
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
