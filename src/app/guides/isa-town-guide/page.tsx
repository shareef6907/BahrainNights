import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  MapPin, School, ShoppingBag, Trophy, Utensils, Star,
  Car, Clock, Building, Users, GraduationCap, Home
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Isa Town Guide — Restaurants, Markets & Things to Do 2026',
  description: 'Complete guide to Isa Town, Bahrain. Discover the famous souq, Seef Mall, Bahrain National Stadium, top restaurants, and why this middle-class hub is home to Bahrain\'s best schools.',
  keywords: 'Isa Town Bahrain, Isa Town souq, Seef Mall Isa Town, Bahrain National Stadium, Isa Town restaurants, Isa Town schools, University of Bahrain, Madina Isa',
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/isa-town-guide',
  },
  openGraph: {
    title: 'Isa Town Guide — Restaurants, Markets & Things to Do 2026',
    description: 'Discover Isa Town: Bahrain\'s educational hub with the famous souq, National Stadium, and vibrant community life.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/isa-town-guide',
  },
};

const faqs = [
  { 
    q: 'What is Isa Town known for in Bahrain?', 
    a: 'Isa Town (Madinat Isa) is known as Bahrain\'s educational hub, housing most of the kingdom\'s private schools including the Indian School, Sacred Heart School, St. Christopher\'s School, and Ibn Khuldoon National School. It\'s also famous for its traditional souq (market), the Bahrain National Stadium, Seef Mall Isa Town, and the University of Bahrain campus. Named after the late Emir Isa ibn Salman Al Khalifa, who ruled from 1961-1999.' 
  },
  { 
    q: 'What are the best restaurants in Isa Town?', 
    a: 'Isa Town offers diverse dining options including Mohammed Noor Bokhari Restaurant for authentic Pakistani-Indian cuisine, Hashtag Burger for gourmet burgers, various cafes and restaurants in Seef Mall food court, and traditional eateries near the souq. The area is known for affordable, family-friendly dining rather than fine dining.' 
  },
  { 
    q: 'Is Isa Town Souq worth visiting?', 
    a: 'Yes, Isa Town Souq is one of Bahrain\'s largest traditional markets and a must-visit for authentic shopping. You\'ll find everything from fresh produce and spices to textiles, electronics, and household goods at competitive prices. The souq has a distinctly local atmosphere compared to tourist-oriented markets. Note: Part of the souq was rebuilt after a 2012 fire that damaged over 450 shops.' 
  },
  { 
    q: 'How far is Isa Town from Manama?', 
    a: 'Isa Town is approximately 10-15 km south of Manama city center, about 15-25 minutes by car depending on traffic. The town is well-connected via main roads and is centrally located in Bahrain, making it easily accessible from most areas of the island.' 
  },
  { 
    q: 'What schools are in Isa Town?', 
    a: 'Isa Town hosts most of Bahrain\'s private schools including The Indian School Bahrain, Sacred Heart School, St. Christopher\'s School, Ibn Khuldoon National School, Pakistan School, Bahrain Bayan School, The New Indian School, and Naseem International School. The University of Bahrain also has a campus here, along with Bahrain Polytechnic.' 
  },
  { 
    q: 'What is at Bahrain National Stadium?', 
    a: 'Bahrain National Stadium, located in Isa Town, is the kingdom\'s largest sports venue hosting football matches, concerts, and national events. It\'s home to the Bahrain national football team and hosts Gulf Cup and international matches. The stadium has been renovated and can accommodate major sporting and entertainment events.' 
  },
];

const restaurants = [
  {
    name: 'Mohammed Noor Bokhari Restaurant',
    type: 'Pakistani-Indian',
    vibe: 'Traditional',
    priceRange: 'BD 3-8',
    mustTry: 'Biryani, Kebabs, Karahi',
    bestFor: 'Authentic subcontinental cuisine',
  },
  {
    name: 'Hashtag Burger',
    type: 'American Burgers',
    vibe: 'Casual Modern',
    priceRange: 'BD 4-10',
    mustTry: 'Signature burgers, Loaded fries',
    bestFor: 'Burger lovers, casual dining',
  },
  {
    name: 'Seef Mall Food Court',
    type: 'Multi-Cuisine',
    vibe: 'Family Casual',
    priceRange: 'BD 2-8',
    mustTry: 'Various fast food options',
    bestFor: 'Shopping breaks, family meals',
  },
  {
    name: 'Traditional Souq Eateries',
    type: 'Local Bahraini',
    vibe: 'Authentic',
    priceRange: 'BD 1-5',
    mustTry: 'Shawarma, Samosas, Fresh juice',
    bestFor: 'Quick bites, local experience',
  },
  {
    name: 'Al Jazeera Restaurant',
    type: 'Arabic & Grills',
    vibe: 'Family',
    priceRange: 'BD 4-12',
    mustTry: 'Mixed grill, Hummus, Fresh bread',
    bestFor: 'Family dinners, group meals',
  },
  {
    name: 'Café Delights',
    type: 'Café & Desserts',
    vibe: 'Relaxed',
    priceRange: 'BD 2-6',
    mustTry: 'Coffee, Cakes, Light snacks',
    bestFor: 'Coffee breaks, casual meetings',
  },
];

const attractions = [
  { name: 'Isa Town Souq', icon: ShoppingBag, desc: 'One of Bahrain\'s largest traditional markets with everything from produce to electronics' },
  { name: 'Bahrain National Stadium', icon: Trophy, desc: 'The kingdom\'s premier sports venue hosting football matches and major events' },
  { name: 'Seef Mall Isa Town', icon: Building, desc: 'Family-friendly mall with shops, restaurants, and entertainment (opened 1993)' },
  { name: 'University of Bahrain', icon: GraduationCap, desc: 'The national university campus with beautiful grounds open to visitors' },
  { name: 'A\'ali Pottery (Nearby)', icon: MapPin, desc: 'Traditional pottery village and ancient burial mounds just 5 minutes away' },
  { name: 'School Zone Heritage', icon: School, desc: 'Explore the unique concentration of international schools that shaped generations' },
];

export default function IsaTownGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950/10 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Isa Town Guide', url: 'https://www.bahrainnights.com/guides/isa-town-guide' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium mb-4">
              🏟️ Area Guide
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                Isa Town
              </span>
              {' '}Guide
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The heart of middle-class Bahrain — home to the famous souq, the National Stadium, 
              the kingdom&apos;s best schools, and a vibrant community that represents the 
              authentic, everyday life of the island nation.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Schools', value: '10+', icon: School },
              { label: 'From Manama', value: '15 min', icon: Car },
              { label: 'Famous Souq', value: 'Yes', icon: ShoppingBag },
              { label: 'Stadium', value: 'National', icon: Trophy },
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

      {/* About Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Discovering Isa Town: Bahrain&apos;s Community Heart</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Named after the late Emir Isa ibn Salman Al Khalifa, who guided Bahrain through 
              four decades of transformation from 1961 to 1999, Isa Town (Madinat Isa) embodies 
              the kingdom&apos;s emerging middle class. While tourists flock to the gleaming towers 
              of Manama and the heritage streets of Muharraq, Isa Town reveals a different 
              Bahrain — one of tree-lined residential streets, bustling souqs, and the schools 
              that have educated generations of Bahrainis and expatriates alike.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              The town&apos;s most distinctive feature is its concentration of educational institutions. 
              Within a compact zone, you&apos;ll find an remarkable array of schools serving Bahrain&apos;s 
              diverse population: The Indian School Bahrain, Sacred Heart School, St. Christopher&apos;s 
              School, Ibn Khuldoon National School, Pakistan School, and several others. The 
              University of Bahrain maintains a campus here, and Bahrain Polytechnic occupies the 
              former university site. This educational cluster has shaped Isa Town&apos;s character, 
              creating a community oriented around families and academic life.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              The Isa Town Souq stands as one of Bahrain&apos;s largest and most authentic traditional 
              markets. Unlike the curated souqs designed for tourists, this sprawling marketplace 
              serves the daily needs of local residents. Vendors sell everything from fresh 
              vegetables and aromatic spices to electronics, textiles, and household goods. The 
              prices are competitive, the atmosphere is genuine, and the experience offers a 
              window into everyday Bahraini commerce. The souq gained international attention in 
              2012 when a devastating fire damaged more than 450 shops — the community&apos;s resilient 
              rebuilding effort speaks to the market&apos;s importance in local life.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Sports enthusiasts know Isa Town as home to the Bahrain National Stadium, the 
              kingdom&apos;s largest sporting venue. This arena hosts the Bahrain national football 
              team&apos;s home matches, Gulf Cup tournaments, and major international fixtures. Beyond 
              football, the stadium has welcomed concerts and national celebrations, serving as 
              a gathering place for the entire country. Match days bring an electric atmosphere 
              to the town as fans from across Bahrain converge to support their team.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Seef Mall Isa Town represents another facet of the community. Launched in 1993 
              as one of Bahrain&apos;s first modern shopping centers, this family-oriented mall 
              predates the mega-malls of Seef District and maintains a more intimate, 
              neighborhood character. Its Islamic-influenced architecture, surrounded by 
              green spaces and walking paths, reflects a thoughtful approach to retail 
              development. For families in the area, it serves as a convenient hub for shopping, 
              dining, and entertainment.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Government institutions have also chosen Isa Town as their home. The Ministry of 
              Education headquarters reflects the town&apos;s educational focus, while Bahrain Radio 
              and Television broadcasts from facilities here. The National Driving School and 
              Directorate of Road Traffic maintain their headquarters in the town, making it a 
              necessary visit for anyone obtaining a Bahraini driving license.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Dining in Isa Town is characterized by value and authenticity rather than 
              fine dining ambition. The area excels in subcontinental cuisine — unsurprising 
              given the large South Asian community. Mohammed Noor Bokhari Restaurant serves 
              beloved Pakistani-Indian dishes, while numerous small eateries near the souq offer 
              freshly made shawarmas, samosas, and fresh juices at remarkably low prices. The 
              food court at Seef Mall provides family-friendly variety, and newer establishments 
              like Hashtag Burger cater to younger tastes.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              For visitors, Isa Town offers an authentic glimpse into middle-class Bahraini life. 
              This is where teachers and government workers raise their families, where students 
              walk between schools and tutoring centers, where neighbors shop at the same souq 
              stalls their parents frequented. The nearby village of A&apos;ali, famous for its 
              ancient pottery tradition and burial mounds, adds historical depth to any visit. 
              While lacking the glamour of Bahrain Bay or the heritage prestige of Muharraq, 
              Isa Town represents something equally valuable — the everyday Bahrain where life 
              is lived, communities thrive, and traditions continue across generations.
            </p>
          </div>
        </div>
      </section>

      {/* Restaurants */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Best Restaurants in Isa Town</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            From authentic subcontinental cuisine to souq street food — dining that serves the community
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((venue) => (
              <div 
                key={venue.name}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold">{venue.name}</h3>
                    <p className="text-blue-400 text-sm">{venue.type}</p>
                  </div>
                  <span className="text-lg font-bold text-white">{venue.priceRange}</span>
                </div>
                
                <div className="mb-3">
                  <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded">
                    {venue.vibe}
                  </span>
                </div>
                
                <p className="text-sm text-gray-400 mb-2">
                  <strong className="text-gray-300">Must try:</strong> {venue.mustTry}
                </p>
                <p className="text-sm text-gray-500">
                  <strong className="text-gray-400">Best for:</strong> {venue.bestFor}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Things to Do */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Things to Do in Isa Town</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attractions.map((attraction) => (
              <div key={attraction.name} className="bg-white/5 rounded-xl p-6">
                <attraction.icon className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="font-bold mb-2">{attraction.name}</h3>
                <p className="text-gray-400 text-sm">{attraction.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Day Itinerary */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">A Day in Isa Town</h2>
          <p className="text-gray-400 text-center mb-12">
            Experience the authentic community life of this residential hub
          </p>
          
          <div className="space-y-4">
            {[
              { time: '9:00 AM', name: 'Explore Isa Town Souq', activity: 'Browse the bustling market for local goods and street food' },
              { time: '11:00 AM', name: 'Visit A\'ali Village', activity: 'See traditional pottery workshops and ancient burial mounds' },
              { time: '1:00 PM', name: 'Lunch at Local Restaurant', activity: 'Try authentic subcontinental cuisine or Arabic grills' },
              { time: '3:00 PM', name: 'Seef Mall Isa Town', activity: 'Shopping and café break in the family-friendly mall' },
              { time: '5:00 PM', name: 'University of Bahrain Area', activity: 'Stroll the campus grounds and observe student life' },
              { time: '7:00 PM', name: 'Match Day (if scheduled)', activity: 'Experience the atmosphere at Bahrain National Stadium' },
            ].map((stop, index) => (
              <div key={stop.name} className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-blue-400">{index + 1}</span>
                </div>
                <div className="flex-1 bg-white/5 rounded-xl p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{stop.name}</h3>
                      <p className="text-gray-400 text-sm">{stop.activity}</p>
                    </div>
                    <span className="text-blue-400 text-sm flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {stop.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practical Info */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Practical Information</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-xl p-6">
              <Car className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="font-bold mb-2">Getting There</h3>
              <p className="text-gray-400 text-sm">
                15-25 minutes from Manama via main roads. Centrally located in Bahrain, 
                easily accessible from Riffa, A&apos;ali, and other areas. Taxis and 
                ride-shares readily available.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <Clock className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="font-bold mb-2">Best Times to Visit</h3>
              <p className="text-gray-400 text-sm">
                Souq is busiest in mornings and late afternoons. Avoid school rush hours 
                (7-8 AM, 1-2 PM) if driving through. Match days at the stadium create 
                traffic — plan accordingly.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <Users className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="font-bold mb-2">Local Character</h3>
              <p className="text-gray-400 text-sm">
                Diverse, family-oriented community with large South Asian population. 
                Modest dress appreciated, especially near schools and the souq. 
                Friendly, welcoming atmosphere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-6">Explore More Areas</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Riffa', href: '/guides/riffa-guide', emoji: '🏰' },
              { title: 'Manama', href: '/guides/manama-city-guide', emoji: '🏙️' },
              { title: 'Muharraq', href: '/guides/muharraq-guide', emoji: '🕌' },
              { title: 'Budaiya', href: '/guides/budaiya-guide', emoji: '🌴' },
            ].map((guide) => (
              <Link key={guide.href} href={guide.href} className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors flex items-center gap-3">
                <span className="text-2xl">{guide.emoji}</span>
                <span className="font-medium">{guide.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More of Bahrain</h2>
          <p className="text-gray-300 mb-8">
            Discover events, venues, and experiences across the kingdom.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/places?category=restaurant"
              className="px-8 py-3 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-lg transition-colors"
            >
              Browse All Restaurants
            </Link>
            <Link 
              href="/guides"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              View All Area Guides
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-gray-500 text-sm border-t border-white/5">
        <p>Powered by BahrainNights.com — Bahrain&apos;s #1 Events & Lifestyle Platform</p>
      </footer>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Isa Town Guide — Restaurants, Markets & Things to Do 2026',
            description: 'Complete guide to Isa Town, Bahrain with souq, restaurants, schools, and stadium information.',
            author: { '@type': 'Organization', name: 'BahrainNights' },
            publisher: { '@type': 'Organization', name: 'BahrainNights' },
            datePublished: '2026-02-15',
            dateModified: '2026-02-15',
          }),
        }}
      />
    </div>
  );
}
