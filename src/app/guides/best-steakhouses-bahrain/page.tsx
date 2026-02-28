import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';
import FAQSchema from '@/components/SEO/FAQSchema';
import InternalLinks from '@/components/SEO/InternalLinks';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Star, DollarSign, Flame, Utensils } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Best Steakhouses in Bahrain 2026 | Prime Cuts, Wagyu & Grills',
  description: 'Discover the best steakhouses in Bahrain. From Wolfgang Puck\'s CUT to Brazilian churrascarias and dry-aged specialists. Complete guide with prices, locations, and must-try cuts.',
  keywords: 'best steakhouses Bahrain, steak restaurants Bahrain, wagyu Bahrain, prime rib Bahrain, CUT Bahrain, grillhouse Manama, meat restaurants Bahrain, Brazilian steakhouse Bahrain',
  alternates: { canonical: 'https://www.bahrainnights.com/guides/best-steakhouses-bahrain' },
  openGraph: {
    title: 'Best Steakhouses in Bahrain 2026',
    description: 'Your complete guide to premium steaks and grillhouses in Bahrain.',
    type: 'article',
    locale: 'en_BH',
  },
};

const faqs = [
  { q: 'What is the best steakhouse in Bahrain?', a: 'CUT by Wolfgang Puck at Four Seasons is widely considered Bahrain\'s best steakhouse, offering USDA Prime and Wagyu cuts with impeccable service. For a more casual experience, The Meat Co and Manos are local favorites.' },
  { q: 'Where can I get Wagyu beef in Bahrain?', a: 'CUT by Wolfgang Puck offers premium Japanese and Australian Wagyu. The Butcher\'s Knife specializes in dry-aged cuts including Wagyu options. The Meat Co serves Mayura Station Signature Wagyu (10+).' },
  { q: 'How much does a steak dinner cost in Bahrain?', a: 'Casual steakhouses like Big Texas and Manos cost BD 10-20. Mid-range options like The Meat Co and Black Angus run BD 20-35. Premium spots like CUT range from BD 50-100 depending on your cut selection.' },
  { q: 'Are there Brazilian steakhouses in Bahrain?', a: 'Yes! Via Brasil in Juffair offers authentic churrascaria-style dining where meats are carved tableside. Brasero Atlántico at Sheraton brings Argentine-style grilling to Bahrain.' },
  { q: 'What\'s the best steakhouse for a date night?', a: 'CUT by Wolfgang Puck offers stunning views and elegant ambiance. Le Sauvage at Domain Hotel has sweeping views. For a more intimate setting, The Butcher\'s Knife or Legendz at InterContinental offer refined experiences.' },
];

const steakhouses = [
  { 
    name: 'CUT by Wolfgang Puck', 
    location: 'Four Seasons Hotel, Bahrain Bay',
    style: 'Modern American Fine Dining',
    priceRange: 'BD 50-100',
    highlight: 'Bahrain\'s premier steakhouse. USDA Prime and Wagyu with 180° Manama views.',
    mustTry: 'USDA Prime Ribeye, Japanese Wagyu, Bone Marrow Flan',
    rating: 4.9,
    vibe: 'Fine Dining',
  },
  { 
    name: 'The Meat Co', 
    location: 'Block 338, Adliya',
    style: 'South African Premium',
    priceRange: 'BD 25-45',
    highlight: 'Afro-fusion flair with Mayura Station Wagyu. Energetic, stylish atmosphere.',
    mustTry: 'Tomahawk Steak, Wagyu Ribeye, Chakalaka Sides',
    rating: 4.7,
    vibe: 'Upscale Casual',
  },
  { 
    name: 'Legendz Steakhouse', 
    location: 'InterContinental Regency, Manama',
    style: 'Classic Fine Dining',
    priceRange: 'BD 30-55',
    highlight: 'Timeless steakhouse with loyal following. Impeccable service, prime cuts.',
    mustTry: 'Prime Sirloin, Filet Mignon, Seafood Tower',
    rating: 4.7,
    vibe: 'Fine Dining',
  },
  { 
    name: 'The Butcher\'s Knife', 
    location: 'District One',
    style: 'Butcher-to-Table',
    priceRange: 'BD 25-50',
    highlight: 'Dry-aged specialists with theatrical presentation. Specialty cocktails with dry ice.',
    mustTry: 'Dry-Aged Ribeye, Tomahawk, Butcher\'s Selection',
    rating: 4.6,
    vibe: 'Upscale Casual',
  },
  { 
    name: 'Plums', 
    location: 'The Ritz-Carlton, Seef',
    style: 'Hotel Fine Dining',
    priceRange: 'BD 35-60',
    highlight: 'Ritz-Carlton elegance with international steakhouse standards.',
    mustTry: 'Prime Cuts, Seafood Selection, Signature Sides',
    rating: 4.6,
    vibe: 'Fine Dining',
  },
  { 
    name: 'Black Angus', 
    location: 'Seef Mall, Seef District',
    style: 'Classic American',
    priceRange: 'BD 18-35',
    highlight: 'USDA Prime beef in generous portions. American steakhouse charm.',
    mustTry: 'Black Angus Ribeye, Prime Rib, Loaded Baked Potato',
    rating: 4.5,
    vibe: 'Casual',
  },
  { 
    name: 'Le Sauvage', 
    location: 'The Domain Hotel, Diplomatic Area',
    style: 'Contemporary European',
    priceRange: 'BD 30-55',
    highlight: 'Sweeping views with curated meat menu. Chic and refined setting.',
    mustTry: 'Premium Cuts, Tasting Menu, Signature Cocktails',
    rating: 4.6,
    vibe: 'Fine Dining',
  },
  { 
    name: 'Manos', 
    location: 'Rugby Club',
    style: 'Flame-Grilled Casual',
    priceRange: 'BD 12-25',
    highlight: 'Loyal following for honest, flame-grilled steaks. Hearty portions, great value.',
    mustTry: 'Flame-Grilled Ribeye, Mixed Grill, Greek Salad',
    rating: 4.5,
    vibe: 'Casual',
  },
  { 
    name: 'Via Brasil', 
    location: 'Wyndham Garden, Juffair',
    style: 'Brazilian Churrascaria',
    priceRange: 'BD 20-35',
    highlight: 'All-you-can-eat Brazilian experience. Meats carved tableside until you say stop.',
    mustTry: 'Picanha, Lamb Chops, Chicken Hearts, Salad Bar',
    rating: 4.4,
    vibe: 'Lively',
  },
  { 
    name: 'Brasero Atlántico', 
    location: 'Sheraton Bahrain Hotel',
    style: 'Argentine Grillhouse',
    priceRange: 'BD 25-45',
    highlight: 'Traditional brasero grilling with fire-kissed Argentine flavors.',
    mustTry: 'Entraña, Bife de Chorizo, Provoleta',
    rating: 4.5,
    vibe: 'Upscale Casual',
  },
  { 
    name: 'The Foundry', 
    location: 'Block 338, Adliya',
    style: 'Industrial Chic',
    priceRange: 'BD 18-35',
    highlight: 'Trendy spot with creative cocktails and expertly grilled meats.',
    mustTry: 'Grilled Ribeye, Craft Cocktails, Sharing Plates',
    rating: 4.4,
    vibe: 'Trendy',
  },
  { 
    name: 'Big Texas Steak House', 
    location: 'Block 338, Adliya',
    style: 'American Southern',
    priceRange: 'BD 12-25',
    highlight: 'Cowboy charm with big portions and comfort food vibes.',
    mustTry: 'Texas Ribeye, BBQ Ribs, Loaded Fries',
    rating: 4.3,
    vibe: 'Casual',
  },
  { 
    name: 'Meat Moot', 
    location: 'El Balcon, Seef District',
    style: 'Turkish BBQ',
    priceRange: 'BD 15-30',
    highlight: 'Slow-cooked over real wood. Turkish-style meat experience with theatrical presentation.',
    mustTry: 'Smoked Brisket, Lamb Ribs, Turkish Sides',
    rating: 4.4,
    vibe: 'Casual',
  },
  { 
    name: 'Flames & Flavours', 
    location: 'The Art Hotel, Amwaj',
    style: 'Modern Grill',
    priceRange: 'BD 20-40',
    highlight: 'Open kitchen concept with flame-grilled perfection. Sleek modern design.',
    mustTry: 'Signature Steak, Grilled Seafood, Craft Cocktails',
    rating: 4.4,
    vibe: 'Upscale Casual',
  },
  { 
    name: 'The Don Steak House', 
    location: 'District One',
    style: 'Premium Grill',
    priceRange: 'BD 20-40',
    highlight: 'Bold flavors with premium aged meats and flame-kissed skewers.',
    mustTry: 'Aged Ribeye, Mixed Grill, Signature Sides',
    rating: 4.3,
    vibe: 'Upscale Casual',
  },
  { 
    name: 'Swiss Butter', 
    location: 'Seef BLVD, Seef District',
    style: 'Parisian Concept',
    priceRange: 'BD 12-22',
    highlight: 'New Parisian concept with signature secret butter sauce. Simple and satisfying.',
    mustTry: 'Steak-Frites, Secret Butter Sauce, Golden Fries',
    rating: 4.3,
    vibe: 'Casual',
  },
];

export default function BestSteakhousesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-red-950/20 to-slate-950 text-white">
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.bahrainnights.com' },
        { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        { name: 'Best Steakhouses', url: 'https://www.bahrainnights.com/guides/best-steakhouses-bahrain' },
      ]} />
      <FAQSchema faqs={faqs} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium mb-4">🥩 Meat Lovers Guide</span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Best <span className="bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">Steakhouses</span> in Bahrain
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From Wolfgang Puck&apos;s world-famous CUT to Brazilian churrascarias and dry-aged specialists — 
              discover Bahrain&apos;s finest steakhouses for every budget and occasion.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
          <p>
            Bahrain&apos;s steakhouse scene has evolved dramatically, from classic American grillhouses 
            to Argentine parrillas, Brazilian churrascarias, and world-class fine dining establishments. 
            Whether you&apos;re craving a perfectly marbled ribeye, dry-aged prime cuts, or all-you-can-eat 
            Brazilian meats carved tableside, the Kingdom delivers.
          </p>
          <p>
            The luxury hotels lead with destinations like CUT by Wolfgang Puck and Legendz. Adliya&apos;s 
            Block 338 has emerged as a steakhouse hub with The Meat Co, Big Texas, and The Foundry 
            within walking distance. For a truly local experience, Manos at the Rugby Club has built 
            a legendary reputation for honest, flame-grilled steaks.
          </p>
        </div>
      </section>

      {/* Premium Selection */}
      <section className="py-12 px-4 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Premium Steakhouses</h2>
          <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
            For special occasions and the finest cuts — these are Bahrain&apos;s top-tier steakhouses.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steakhouses.slice(0, 6).map((steakhouse, index) => (
              <div 
                key={steakhouse.name}
                className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-red-400 font-bold">#{index + 1}</span>
                  <div className="flex items-center gap-1 bg-red-500/20 px-2 py-0.5 rounded-full">
                    <Star className="w-3 h-3 text-red-400 fill-red-400" />
                    <span className="text-red-400 text-sm font-medium">{steakhouse.rating}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{steakhouse.name}</h3>
                <p className="text-gray-400 text-sm flex items-center gap-1 mb-3">
                  <MapPin className="w-4 h-4" /> {steakhouse.location}
                </p>
                <p className="text-gray-300 text-sm mb-3">{steakhouse.highlight}</p>
                <div className="space-y-1 text-sm">
                  <p className="text-red-400">
                    <DollarSign className="w-4 h-4 inline" /> {steakhouse.priceRange}
                  </p>
                  <p className="text-gray-500">
                    <Utensils className="w-4 h-4 inline mr-1" /> {steakhouse.mustTry}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Steakhouses */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">All Steakhouses</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {steakhouses.map((steakhouse, index) => (
              <div 
                key={steakhouse.name}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-red-400/50 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-red-400 text-sm font-medium">#{index + 1}</span>
                    <h3 className="text-xl font-bold text-white">{steakhouse.name}</h3>
                    <p className="text-gray-400 text-sm flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {steakhouse.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-red-500/20 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 text-red-400 fill-red-400" />
                    <span className="text-red-400 font-medium">{steakhouse.rating}</span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-2">{steakhouse.style}</p>
                <p className="text-gray-400 text-sm mb-3">{steakhouse.highlight}</p>
                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="flex items-center gap-1 text-red-400">
                    <DollarSign className="w-4 h-4" /> {steakhouse.priceRange}
                  </span>
                  <span className="flex items-center gap-1 text-orange-400">
                    <Flame className="w-4 h-4" /> {steakhouse.vibe}
                  </span>
                </div>
                <p className="text-gray-500 text-xs mt-3">
                  <strong className="text-gray-400">Must Try:</strong> {steakhouse.mustTry}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By Style */}
      <section className="py-12 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Steakhouses by Style</h2>
          
          <div className="space-y-8">
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-xl font-bold text-red-400 mb-3">🏆 Fine Dining</h3>
              <p className="text-gray-300 mb-3">
                For special occasions where only the best will do. Impeccable service, premium cuts, elegant settings.
              </p>
              <ul className="space-y-1 text-gray-400">
                <li><strong className="text-white">CUT by Wolfgang Puck</strong> — The pinnacle, Four Seasons</li>
                <li><strong className="text-white">Legendz Steakhouse</strong> — Classic elegance, InterContinental</li>
                <li><strong className="text-white">Plums</strong> — Ritz-Carlton sophistication</li>
                <li><strong className="text-white">Le Sauvage</strong> — Views and refinement, Domain Hotel</li>
              </ul>
            </div>
            
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-xl font-bold text-red-400 mb-3">🔥 South American</h3>
              <p className="text-gray-300 mb-3">
                Bold flavors from Argentina and Brazil. Fire-grilled traditions with passionate execution.
              </p>
              <ul className="space-y-1 text-gray-400">
                <li><strong className="text-white">Via Brasil</strong> — All-you-can-eat churrascaria, Juffair</li>
                <li><strong className="text-white">Brasero Atlántico</strong> — Argentine grilling, Sheraton</li>
                <li><strong className="text-white">The Meat Co</strong> — South African with Afro-fusion</li>
              </ul>
            </div>
            
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-xl font-bold text-red-400 mb-3">🍺 Casual & Value</h3>
              <p className="text-gray-300 mb-3">
                Great steaks without the formality. Perfect for friends, family, and weeknight dinners.
              </p>
              <ul className="space-y-1 text-gray-400">
                <li><strong className="text-white">Manos</strong> — Local legend, Rugby Club</li>
                <li><strong className="text-white">Big Texas</strong> — Cowboy portions, Adliya</li>
                <li><strong className="text-white">Black Angus</strong> — American classic, Seef Mall</li>
                <li><strong className="text-white">Swiss Butter</strong> — Simple steak-frites, Seef</li>
              </ul>
            </div>
            
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-xl font-bold text-red-400 mb-3">🥃 Trendy & Creative</h3>
              <p className="text-gray-300 mb-3">
                For foodies who want more than just a steak. Creative cocktails, unique presentations, stylish vibes.
              </p>
              <ul className="space-y-1 text-gray-400">
                <li><strong className="text-white">The Butcher&apos;s Knife</strong> — Dry-aged specialists, District One</li>
                <li><strong className="text-white">The Foundry</strong> — Industrial chic, Adliya</li>
                <li><strong className="text-white">The Don</strong> — Bold and theatrical, District One</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Steak Guide */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Know Your Cuts</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-red-400 mb-2">🥩 Ribeye</h3>
              <p className="text-gray-300 text-sm">
                Rich marbling, intense beef flavor. The most popular cut for good reason. 
                Best medium-rare to medium for optimal fat rendering.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-red-400 mb-2">🥩 Filet Mignon</h3>
              <p className="text-gray-300 text-sm">
                Tender and lean, the most delicate cut. Less beefy flavor but butter-soft texture. 
                Often wrapped in bacon for added fat.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-red-400 mb-2">🥩 Tomahawk</h3>
              <p className="text-gray-300 text-sm">
                A bone-in ribeye with the full rib bone attached. Dramatic presentation, 
                excellent for sharing. Usually 1kg or more.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-red-400 mb-2">🥩 Wagyu</h3>
              <p className="text-gray-300 text-sm">
                Japanese or Australian origin with extreme marbling. Intensely rich, 
                almost buttery. Best served rare to medium-rare in small portions.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-red-400 mb-2">🥩 Picanha</h3>
              <p className="text-gray-300 text-sm">
                Brazilian favorite from the top sirloin cap. Fat cap on top for flavor. 
                The star of any churrascaria.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-red-400 mb-2">🥩 Dry-Aged</h3>
              <p className="text-gray-300 text-sm">
                Aged 21-60 days for concentrated flavor and tender texture. 
                Nutty, funky notes that steak purists love.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4 bg-white/5">
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
          <h2 className="text-3xl font-bold mb-4">Explore More Dining</h2>
          <p className="text-gray-400 mb-8">Discover more restaurant guides by cuisine and style</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guides/best-fine-dining-bahrain" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all">
              Fine Dining →
            </Link>
            <Link href="/guides/best-seafood-bahrain" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-all">
              Seafood Restaurants →
            </Link>
            <Link href="/places" className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-full font-medium hover:shadow-lg hover:shadow-red-500/25 transition-all">
              Browse All Restaurants
            </Link>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-lg font-bold mb-4">More Guides</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { title: 'Fine Dining', href: '/guides/best-fine-dining-bahrain' },
              { title: 'Italian', href: '/guides/best-italian-restaurants-bahrain' },
              { title: 'Indian', href: '/guides/best-indian-restaurants-bahrain' },
              { title: 'Seafood', href: '/guides/best-seafood-bahrain' },
              { title: 'Arabic', href: '/guides/best-arabic-restaurants-bahrain' },
              { title: 'Adliya Restaurants', href: '/guides/adliya-restaurants-bars' },
              { title: 'Date Night', href: '/guides/romantic' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="px-3 py-1.5 bg-white/5 hover:bg-red-500/20 rounded text-sm transition-colors">
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <InternalLinks 
        title="Explore Dining in Bahrain" 
        links={[
          { title: 'Best Fine Dining', href: '/guides/best-fine-dining-bahrain' },
          { title: 'Best Restaurants in Bahrain', href: '/guides/restaurants' },
          { title: 'Adliya Restaurants & Bars', href: '/guides/adliya-restaurants-bars' },
          { title: 'Rooftop Bars', href: '/guides/rooftop-bars-bahrain' },
          { title: 'Romantic Date Night', href: '/guides/romantic' },
        ]} 
      />
    </div>
  );
}
