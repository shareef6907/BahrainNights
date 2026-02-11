import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, Moon, Coffee } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Shisha Lounges in Bahrain 2026 | Hookah Cafes & Arabic Cafes',
  description: 'Find the best shisha lounges and hookah cafes in Bahrain. From traditional Arabic cafes to modern lounges. Complete guide to shisha spots in Adliya, Seef, and Juffair.',
  keywords: 'shisha Bahrain, hookah Bahrain, shisha lounge Bahrain, shisha cafe Bahrain, Arabic cafe Bahrain, best shisha Bahrain, hookah lounge Bahrain',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/shisha-lounges-bahrain' },
  openGraph: {
    title: 'Best Shisha Lounges in Bahrain 2026',
    description: 'Your guide to the best hookah and shisha spots in Bahrain.',
    type: 'article',
    locale: 'en_BH',
  },
};

const faqs = [
  { q: 'Where are the best shisha lounges in Bahrain?', a: 'Adliya has excellent shisha spots like Zaitoun and various Arabic cafes. Seef has upscale options. Juffair has numerous hookah cafes. Traditional souq area cafes offer authentic experiences.' },
  { q: 'How much does shisha cost in Bahrain?', a: 'Standard shisha costs BD 3-6 at most cafes. Premium lounges charge BD 8-15. Prices vary by tobacco type and venue atmosphere. Tea and snacks are typically extra.' },
  { q: 'What shisha flavors are popular in Bahrain?', a: 'Double apple (two-apple) is the traditional favorite. Grape, mint, watermelon, and mixed fruit are popular. Premium venues offer exotic blends and imported tobaccos.' },
  { q: 'Can you get shisha at restaurants in Bahrain?', a: 'Many Arabic restaurants offer shisha, especially outdoor terraces. Lebanese restaurants commonly have shisha. Some cafes specialize in both shisha and food.' },
  { q: 'What time do shisha lounges open in Bahrain?', a: 'Most open from afternoon (3-4pm) and stay open late, often until 1-3am. Popular times are after dinner (9pm onwards). Some 24-hour cafes exist.' },
];

const venues = [
  { 
    name: 'Zaitoun', 
    location: 'Adliya',
    style: 'Lebanese Restaurant & Shisha',
    atmosphere: 'Garden terrace, family-friendly',
    priceRange: 'BD 5-8',
    highlight: 'Quality shisha with excellent Lebanese food',
    rating: 4.5,
  },
  { 
    name: 'Layali Zaman', 
    location: 'Juffair',
    style: 'Upscale Arabic Lounge',
    atmosphere: 'Elegant, live oud music',
    priceRange: 'BD 8-12',
    highlight: 'Premium shisha, romantic atmosphere',
    rating: 4.6,
  },
  { 
    name: 'Café Lilou', 
    location: 'Adliya',
    style: 'French-Arabic Café',
    atmosphere: 'Chic garden setting',
    priceRange: 'BD 6-9',
    highlight: 'Trendy spot with quality tobacco',
    rating: 4.4,
  },
  { 
    name: 'Al Abraaj Terrace', 
    location: 'Adliya',
    style: 'Lebanese Restaurant & Shisha',
    atmosphere: 'Outdoor terrace, social vibe',
    priceRange: 'BD 5-8',
    highlight: 'Popular evening hangout',
    rating: 4.4,
  },
  { 
    name: 'Mirai Lounge', 
    location: 'Seef',
    style: 'Modern Lebanese Lounge',
    atmosphere: 'Contemporary, stylish',
    priceRange: 'BD 7-10',
    highlight: 'Upscale shisha experience',
    rating: 4.3,
  },
  { 
    name: 'Haifa Café', 
    location: 'Manama',
    style: 'Traditional Arabic Café',
    atmosphere: 'Authentic, local crowd',
    priceRange: 'BD 3-5',
    highlight: 'Classic shisha at good prices',
    rating: 4.2,
  },
  { 
    name: 'Sho Cho', 
    location: 'The Ritz-Carlton, Seef',
    style: 'Asian Fusion & Shisha',
    atmosphere: 'Waterfront terrace, upscale',
    priceRange: 'BD 10-15',
    highlight: 'Premium setting with Gulf views',
    rating: 4.5,
  },
  { 
    name: 'Various Souq Cafes', 
    location: 'Manama Souq',
    style: 'Traditional Arabic',
    atmosphere: 'Authentic, heritage',
    priceRange: 'BD 2-4',
    highlight: 'Most authentic local experience',
    rating: 4.3,
  },
];

export default function ShishaLoungesBahrainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-amber-950/20 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Shisha Lounges', url: 'https://www.bahrainnights.com/guides/shisha-lounges-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium mb-4">💨 Activity Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Shisha Lounges</span> in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From traditional Arabic cafes to upscale lounges — discover the best 
              hookah spots across the Kingdom for a relaxing evening.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
          <p>
            Shisha (hookah) culture runs deep in Bahrain, blending tradition with modern 
            lounge experiences. Whether you prefer a classic Arabic café in the souq or a 
            chic terrace overlooking the Gulf, Bahrain has shisha spots for every mood.
          </p>
          <p>
            The best shisha experiences combine quality tobacco, comfortable seating, good 
            company, and often Arabic coffee or tea. Many venues also serve food, making 
            shisha a social activity that can stretch for hours. Late evenings and weekends 
            see the most activity at popular lounges.
          </p>
        </div>
      </section>

      {/* Venue Cards */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Top Shisha Spots</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {venues.map((venue, index) => (
              <div 
                key={venue.name}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-amber-400/50 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-amber-400 text-sm font-medium">#{index + 1}</span>
                    <h3 className="text-xl font-bold text-white">{venue.name}</h3>
                    <p className="text-gray-400 text-sm flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {venue.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-500/20 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="text-amber-400 font-medium">{venue.rating}</span>
                  </div>
                </div>
                <p className="text-yellow-400 text-sm mb-2">{venue.style}</p>
                <p className="text-gray-400 text-sm mb-2">{venue.atmosphere}</p>
                <p className="text-gray-300 text-sm mb-3">{venue.highlight}</p>
                <p className="text-green-400 text-sm">Shisha: {venue.priceRange}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-12 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Shisha Tips</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-amber-400 mb-2">🍎 Classic Flavors</h3>
              <p className="text-gray-300 text-sm">
                Double apple is the traditional choice. For something lighter, try grape or 
                mint. Watermelon and mixed fruit are refreshing options.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-amber-400 mb-2">☕ Pair with Drinks</h3>
              <p className="text-gray-300 text-sm">
                Traditional: Arabic coffee (gahwa) or tea. Modern: fresh juices, mocktails, 
                or even cocktails at licensed venues.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-amber-400 mb-2">⏰ Best Times</h3>
              <p className="text-gray-300 text-sm">
                Evenings after 9pm are most atmospheric. Weekends are busiest. For quieter 
                experiences, try late afternoon on weekdays.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-amber-400 mb-2">🪑 Outdoor Seating</h3>
              <p className="text-gray-300 text-sm">
                The best shisha spots have outdoor terraces. Cooler months (Nov-Mar) are 
                perfect for al fresco shisha sessions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More Nightlife</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guides/best-arabic-restaurants-bahrain" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all">
              Arabic Restaurants →
            </Link>
            <Link href="/guides/nightlife" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all">
              Nightlife Guide →
            </Link>
            <Link href="/places" className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full font-medium transition-all">
              Browse All Cafes
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
