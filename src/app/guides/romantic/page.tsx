import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Heart, Star, MapPin, Clock, Wine,
  ArrowRight, Sunset, Moon, Sparkles, Utensils, Building2
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Romantic Things to Do in Bahrain 2026 | Date Ideas & Couples Guide',
  description: 'Discover romantic things to do in Bahrain for couples! From sunset dinners to luxury spas, explore the best date night ideas and romantic experiences in Bahrain.',
  keywords: 'romantic things to do Bahrain, date ideas Bahrain, couples Bahrain, romantic dinner Bahrain, date night Bahrain, anniversary Bahrain, honeymoon Bahrain',
  openGraph: {
    title: 'Romantic Things to Do in Bahrain 2026 | Date Ideas & Couples Guide',
    description: 'Your complete guide to romantic experiences in Bahrain - fine dining, sunsets, spas, and unforgettable date nights.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/romantic',
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/romantic',
  },
};

const romanticDining = [
  {
    name: 'CUT by Wolfgang Puck',
    location: 'Four Seasons Bahrain Bay',
    vibe: 'Upscale, elegant, special occasion',
    price: '$$$$',
    description: 'World-class steakhouse with stunning Bahrain Bay views. Perfect for anniversaries and special celebrations.',
    highlights: ['Bay views', 'Prime cuts', 'Exceptional service', 'Romantic atmosphere'],
    tip: 'Request a window table when booking.',
  },
  {
    name: 'The Orangery',
    location: 'The Merchant House, Manama',
    vibe: 'Intimate, boutique, colonial charm',
    price: '$$$',
    description: 'Charming restaurant in a boutique heritage hotel. Garden setting with fairy lights and romantic ambiance.',
    highlights: ['Garden setting', 'Intimate atmosphere', 'Boutique hotel', 'Afternoon tea'],
    tip: 'The courtyard is magical for evening dates.',
  },
  {
    name: 're/Asian Cuisine',
    location: 'Four Seasons Bahrain Bay',
    vibe: 'Contemporary, chic, waterfront',
    price: '$$$$',
    description: 'Modern Asian cuisine with panoramic bay views. Sophisticated setting perfect for date nights.',
    highlights: ['Pan-Asian menu', 'Stunning views', 'Cocktails', 'Modern ambiance'],
    tip: 'Try the tasting menu for a shared experience.',
  },
  {
    name: 'Bushido',
    location: 'The Ritz-Carlton',
    vibe: 'Elegant, romantic, Japanese',
    price: '$$$$',
    description: 'Upscale Japanese restaurant with beautiful decor. Sushi, teppanyaki, and an intimate atmosphere.',
    highlights: ['Omakase experience', 'Private dining', 'Sake selection', 'Elegant setting'],
    tip: 'Book the private teppanyaki experience for special occasions.',
  },
  {
    name: 'Masso',
    location: 'Downtown Rotana',
    vibe: 'Sophisticated, Italian, buzzy',
    price: '$$$',
    description: 'Contemporary Italian with fresh pasta and romantic lighting. Perfect for a classic date night.',
    highlights: ['Fresh pasta', 'Italian wines', 'Romantic lighting', 'Quality cuisine'],
    tip: 'Excellent wine selection to pair with dinner.',
  },
  {
    name: 'La Vinoteca',
    location: 'The Westin',
    vibe: 'Wine bar, tapas, intimate',
    price: '$$$',
    description: 'Spanish wine bar with tapas and an intimate setting. Perfect for sharing plates and wine.',
    highlights: ['Extensive wines', 'Spanish tapas', 'Cozy atmosphere', 'Live music nights'],
    tip: 'Try the jamón ibérico and pair with recommended wines.',
  },
];

const romanticExperiences = [
  {
    name: 'Sunset at Bahrain Fort',
    type: 'Free Experience',
    duration: '2 hours',
    description: 'Watch the sunset over the sea from this 4,000-year-old UNESCO World Heritage Site. Magical and completely free.',
    why: 'The golden hour light and ancient ruins create an unforgettable romantic backdrop.',
    tip: 'Bring a blanket and arrive 1 hour before sunset for the best spots.',
  },
  {
    name: 'Couples Spa at Ritz-Carlton',
    type: 'Luxury Spa',
    duration: '2-3 hours',
    description: 'Side-by-side treatments in luxurious surroundings. Multiple packages for couples including massage, hammam, and more.',
    why: 'Ultimate relaxation together with world-class service.',
    tip: 'Book the couples hammam experience for something unique.',
  },
  {
    name: 'Dhow Cruise Dinner',
    type: 'Dining Cruise',
    duration: '2-3 hours',
    description: 'Traditional wooden boat cruise with dinner, music, and views of Bahrain\'s illuminated skyline.',
    why: 'Unique way to see Manama while enjoying a romantic dinner on the water.',
    tip: 'Available through hotels or tour operators. Evening cruises are most romantic.',
  },
  {
    name: 'Beach Day at Coral Bay',
    type: 'Beach Resort',
    duration: 'Full day',
    description: 'Upscale beach resort with private cabanas, infinity pool, and excellent food. Adults-only sections available.',
    why: 'Escape and relax together in a beautiful waterfront setting.',
    tip: 'Book a cabana for privacy and shade.',
  },
  {
    name: 'Stargazing in the Desert',
    type: 'Adventure',
    duration: 'Evening',
    description: 'Drive to the southern desert away from city lights for incredible stargazing. Bring blankets and drinks.',
    why: 'Bahrain\'s desert offers surprisingly clear skies for star watching.',
    tip: 'Visit the Tree of Life area. Best in winter months.',
  },
];

const dateNightIdeas = [
  {
    category: 'Budget Dates',
    ideas: [
      'Sunset at Bahrain Fort (free)',
      'Coffee at Adliya cafes',
      'Walk along Bahrain Bay promenade',
      'Explore Manama Souq together',
      'Picnic at Prince Khalifa Park',
    ],
  },
  {
    category: 'Mid-Range Dates',
    ideas: [
      'Dinner at Adliya restaurants',
      'Brunch at a hotel',
      'Cinema at Seef or Avenues',
      'Beach club day pass',
      'Art gallery hopping in Block 338',
    ],
  },
  {
    category: 'Splurge Dates',
    ideas: [
      'Fine dining at CUT or Bushido',
      'Couples spa treatment',
      'Staycation at Four Seasons or Ritz',
      'Private dhow cruise',
      'Special occasion dinner cruise',
    ],
  },
];

const anniversaryIdeas = [
  {
    occasion: 'Anniversary Dinner',
    suggestion: 'Book a window table at CUT for sunset views over Bahrain Bay.',
    budget: '$$$$',
  },
  {
    occasion: 'Weekend Staycation',
    suggestion: 'Four Seasons or Ritz-Carlton offer romantic packages with spa credits.',
    budget: '$$$$',
  },
  {
    occasion: 'Unique Experience',
    suggestion: 'Arrange a private dinner at Bahrain Fort at sunset (contact event planners).',
    budget: '$$$',
  },
  {
    occasion: 'Relaxation',
    suggestion: 'Book a full day at a beach club followed by dinner at a nearby restaurant.',
    budget: '$$$',
  },
];

export default function RomanticGuidePage() {
  const lastUpdated = new Date().toISOString().split('T')[0];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-rose-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
          { name: 'Romantic Things to Do', url: 'https://www.bahrainnights.com/guides/romantic' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 to-pink-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-rose-500/20 text-rose-400 rounded-full text-sm font-medium mb-4">
              ❤️ Couples Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Romantic{' '}
              <span className="bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">
                Things to Do
              </span>
              {' '}in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Whether you&apos;re planning a special anniversary, honeymoon, or simply a memorable 
              date night, Bahrain offers countless romantic experiences. From sunset views to 
              world-class dining, discover the perfect way to celebrate love.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Fine Dining', value: '20+', icon: Utensils },
              { label: 'Luxury Spas', value: '15+', icon: Sparkles },
              { label: 'Sunset Spots', value: '10+', icon: Sunset },
              { label: 'Hotels', value: '30+', icon: Building2 },
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

      {/* Romantic Dining */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Romantic Restaurants</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            The most romantic dining spots in Bahrain for unforgettable date nights.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {romanticDining.map((restaurant) => (
              <div 
                key={restaurant.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-rose-400">{restaurant.name}</h3>
                    <p className="text-sm text-gray-400">{restaurant.location}</p>
                  </div>
                  <span className="text-xs bg-rose-500/20 text-rose-300 px-2 py-1 rounded">
                    {restaurant.price}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-3 italic">{restaurant.vibe}</p>
                <p className="text-gray-300 text-sm mb-4">{restaurant.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {restaurant.highlights.map((h) => (
                    <span key={h} className="px-2 py-1 bg-rose-500/20 text-rose-300 text-xs rounded">
                      {h}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-amber-400 italic">💡 {restaurant.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Romantic Experiences */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Romantic Experiences</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Unique experiences to share with someone special.
          </p>
          
          <div className="space-y-6">
            {romanticExperiences.map((exp) => (
              <div 
                key={exp.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{exp.name}</h3>
                      <span className="px-2 py-1 bg-rose-500/20 text-rose-300 text-xs rounded">
                        {exp.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">Duration: {exp.duration}</p>
                    <p className="text-gray-300 mb-3">{exp.description}</p>
                    <p className="text-sm text-rose-400 mb-3">
                      <Heart className="w-4 h-4 inline mr-1" /> Why it&apos;s romantic: {exp.why}
                    </p>
                    <p className="text-sm text-amber-400 italic">💡 Tip: {exp.tip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Date Night Ideas by Budget */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Date Ideas by Budget</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {dateNightIdeas.map((cat) => (
              <div key={cat.category} className="bg-white/5 rounded-2xl p-6">
                <h3 className="font-bold text-lg text-rose-400 mb-4">{cat.category}</h3>
                <ul className="space-y-2">
                  {cat.ideas.map((idea) => (
                    <li key={idea} className="text-gray-300 text-sm flex items-start gap-2">
                      <Heart className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                      {idea}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Anniversary Ideas */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">💍 Anniversary & Special Occasions</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {anniversaryIdeas.map((idea) => (
              <div key={idea.occasion} className="bg-gradient-to-br from-rose-500/10 to-pink-500/10 rounded-xl p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{idea.occasion}</h3>
                  <span className="text-xs bg-rose-500/20 text-rose-300 px-2 py-1 rounded">
                    {idea.budget}
                  </span>
                </div>
                <p className="text-gray-300 text-sm">{idea.suggestion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Guides</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Best Restaurants', href: '/guides/restaurants', emoji: '🍽️' },
              { title: 'Best Brunches', href: '/guides/brunches', emoji: '🥂' },
              { title: 'Beach Clubs', href: '/guides/beach-clubs', emoji: '🏖️' },
              { title: 'Nightlife', href: '/guides/nightlife', emoji: '🌙' },
            ].map((guide) => (
              <Link 
                key={guide.href}
                href={guide.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group"
              >
                <span className="text-2xl mb-2 block">{guide.emoji}</span>
                <span className="font-medium group-hover:text-rose-400 transition-colors">
                  {guide.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {[
              {
                q: 'What are the most romantic things to do in Bahrain?',
                a: 'The most romantic activities include sunset at Bahrain Fort, fine dining at CUT or Bushido with bay views, couples spa treatments at luxury hotels, dhow cruise dinners, and beach days at upscale resorts.',
              },
              {
                q: 'Where should I take my partner for a special dinner in Bahrain?',
                a: 'For special occasions, consider CUT by Wolfgang Puck at Four Seasons for stunning views, The Orangery for intimate charm, or Bushido at Ritz-Carlton for elegant Japanese cuisine. All offer exceptional ambiance for celebrations.',
              },
              {
                q: 'What are good date night ideas in Bahrain?',
                a: 'Date night ideas range from budget-friendly sunset watching at Bahrain Fort and coffee in Adliya, to mid-range options like cinema and brunch, to splurge experiences like spa treatments and fine dining.',
              },
              {
                q: 'Is Bahrain good for honeymoons?',
                a: 'Yes! Bahrain offers luxury hotels like Four Seasons and Ritz-Carlton with romantic packages, beautiful beaches, world-class dining, and couples spa experiences. It\'s also well-connected for regional exploration.',
              },
            ].map((faq, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6">
                <h3 className="font-bold mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-rose-500/20 to-pink-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Plan Your Perfect Date</h2>
          <p className="text-gray-300 mb-8">
            Browse our restaurant guide or check what&apos;s on this weekend.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/guides/restaurants"
              className="px-8 py-3 bg-rose-500 hover:bg-rose-400 text-black font-bold rounded-lg transition-colors"
            >
              Restaurant Guide
            </Link>
            <Link 
              href="/events/this-weekend"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              This Weekend
            </Link>
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
            headline: 'Romantic Things to Do in Bahrain 2026',
            description: 'Complete guide to romantic activities, date ideas, and couples experiences in Bahrain.',
            author: {
              '@type': 'Organization',
              name: 'BahrainNights',
              url: 'https://bahrainnights.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'BahrainNights',
            },
            datePublished: '2026-01-26',
            dateModified: lastUpdated,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://bahrainnights.com/guides/romantic',
            },
          }),
        }}
      />
      
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What are the most romantic things to do in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The most romantic activities include sunset at Bahrain Fort, fine dining at CUT or Bushido with bay views, couples spa treatments, dhow cruise dinners, and beach days at upscale resorts.',
                },
              },
              {
                '@type': 'Question',
                name: 'Where should I take my partner for a special dinner in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'For special occasions, consider CUT by Wolfgang Puck at Four Seasons, The Orangery for intimate charm, or Bushido at Ritz-Carlton for elegant Japanese cuisine.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are good date night ideas in Bahrain?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Date night ideas range from budget-friendly sunset watching and coffee, to mid-range options like cinema and brunch, to splurge experiences like spa treatments and fine dining.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is Bahrain good for honeymoons?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! Bahrain offers luxury hotels with romantic packages, beautiful beaches, world-class dining, and couples spa experiences.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
