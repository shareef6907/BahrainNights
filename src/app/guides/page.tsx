import { OG_IMAGE } from '@/lib/og';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen, ArrowRight, ShoppingBag, Sparkles, Utensils, Landmark, MapPin
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Bahrain Guides — Malls, Brands, Restaurants & Souks',
  description: 'Browse Bahrain Nights guides to Bahrain malls, brand stores, restaurant cuisines and traditional souks, with hours, parking and store directories.',
  keywords: 'Bahrain guides, malls in Bahrain, brands in Bahrain, restaurants in Bahrain, souks in Bahrain, shopping guide Bahrain',
  openGraph: {
    title: 'Bahrain Guides — Malls, Brands, Restaurants & Souks',
    description: 'Guides to the malls, brand stores, restaurant cuisines and souks we have covered in Bahrain, with hours, parking and store directories.',
    type: 'website',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bahrain Guides — Malls, Brands, Restaurants & Souks',
    description: 'Guides to the malls, brand stores, restaurant cuisines and souks we have covered in Bahrain.',
    images: [OG_IMAGE.url],
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const mallGuides = [
  {
    name: 'City Centre Bahrain',
    area: 'Seef District',
    href: '/guides/malls/city-centre-bahrain',
    description:
      'The largest shopping centre in Bahrain, with a store directory covering Zara, H&M, Saks Fifth Avenue, Carrefour, Wahooo! Waterpark, Magic Planet and a 20-screen Cineco cinema.',
  },
  {
    name: 'Seef Mall',
    area: 'Seef District, Muharraq, Isa Town',
    href: '/guides/malls/seef-mall',
    description:
      'Now three locations, each with Magic Island entertainment and a cinema. The guide covers 250+ stores including H&M, Marks & Spencer, Mango and Sephora.',
  },
  {
    name: 'Marassi Galleria',
    area: 'Diyar Al Muharraq',
    href: '/guides/malls/marassi-galleria',
    description:
      'Beachfront luxury shopping with 150+ stores including Louis Vuitton, Dior, Chanel and Gucci, plus Marassi Aquarium, Reel Cinemas and a restaurant directory.',
  },
  {
    name: 'The Avenues Bahrain',
    area: 'Bahrain Bay',
    href: '/guides/malls/the-avenues',
    description:
      'A waterfront lifestyle mall with 130+ stores, the Below Zero ice rink, VOX Cinemas, The Cheesecake Factory and a 1.5km seafront promenade.',
  },
  {
    name: 'Moda Mall',
    area: 'Bahrain World Trade Centre',
    href: '/guides/malls/moda-mall',
    description:
      'Luxury fashion, jewellery and premium dining inside the iconic twin towers of the Bahrain World Trade Centre.',
  },
  {
    name: 'Dana Mall',
    area: 'Sanabis',
    href: '/guides/malls/dana-mall',
    description:
      'A community mall built around LuLu Hypermarket, with EPIX Cinemas on ten screens, a food court and 1,800 free parking spaces.',
  },
  {
    name: 'Bahrain Mall',
    area: 'Sanabis',
    href: '/guides/malls/bahrain-mall',
    description:
      'LuLu Hypermarket, a 1,400-seat food court and an amusement arcade with rides and games in the same building.',
  },
  {
    name: 'Oasis Mall',
    area: 'Juffair',
    href: '/guides/malls/oasis-mall',
    description:
      'A convenient neighbourhood mall with 80+ stores, a cinema, a fitness centre and everyday dining close to Juffair.',
  },
  {
    name: 'Enma Mall',
    area: 'Riffa',
    href: '/guides/malls/enma-mall',
    description:
      'Riffa main shopping centre, with 70+ stores, Fun City entertainment, a supermarket and family dining.',
  },
  {
    name: 'Dragon City',
    area: 'Diyar Al Muharraq',
    href: '/guides/malls/dragon-city',
    description:
      'A wholesale market rather than a mall: 800+ shops selling electronics, fashion, home goods and other Chinese imports at bargain prices.',
  },
  {
    name: 'Souq Al Baraha',
    area: 'Diyar Al Muharraq',
    href: '/guides/malls/souq-al-baraha',
    description:
      'A traditional-style waterfront souq with restaurants, cafes, boutiques and a promenade looking out over the water.',
  },
];

const brandGuides = [
  { name: 'Zara', href: '/guides/brands/zara', group: 'Fashion', description: 'Spanish fast-fashion, with its Bahrain store at City Centre Bahrain.' },
  { name: 'H&M', href: '/guides/brands/hm', group: 'Fashion', description: 'Affordable Swedish fashion at City Centre, Seef Mall, The Avenues and more.' },
  { name: 'Nike', href: '/guides/brands/nike', group: 'Fashion', description: 'Athletic footwear and apparel, with every store location listed.' },
  { name: 'Adidas', href: '/guides/brands/adidas', group: 'Fashion', description: 'German sportswear at City Centre, Seef Mall and The Avenues.' },
  { name: 'Uniqlo', href: '/guides/brands/uniqlo', group: 'Fashion', description: 'A guide to a brand that does not currently operate stores in Bahrain, and where to shop instead.' },
  { name: 'Crocs', href: '/guides/brands/crocs', group: 'Fashion', description: 'Casual footwear at City Centre, Seef Mall and The Avenues.' },
  { name: 'Louis Vuitton', href: '/guides/brands/louis-vuitton', group: 'Luxury', description: 'Store location and hours at Marassi Galleria.' },
  { name: 'Gucci', href: '/guides/brands/gucci', group: 'Luxury', description: 'Boutique locations at Marassi Galleria and Moda Mall.' },
  { name: 'Dior', href: '/guides/brands/dior', group: 'Luxury', description: 'Fashion and beauty boutiques at Marassi Galleria and Moda Mall.' },
  { name: 'Chanel', href: '/guides/brands/chanel', group: 'Luxury', description: 'Store locations at The Avenues and Marassi Galleria.' },
  { name: 'Hermès', href: '/guides/brands/hermes', group: 'Luxury', description: 'Leather goods, scarves and silk at Marassi Galleria.' },
  { name: 'Sephora', href: '/guides/brands/sephora', group: 'Beauty', description: 'Makeup, skincare and fragrance counters at City Centre and The Avenues.' },
  { name: 'Bath & Body Works', href: '/guides/brands/bath-body-works', group: 'Beauty', description: 'Body care, candles and fragrances, including the seasonal collections.' },
  { name: 'Apple', href: '/guides/brands/apple', group: 'Tech & home', description: 'Authorised resellers including iMachines, iWorld, Virgin Megastore and LuLu.' },
  { name: 'IKEA', href: '/guides/brands/ikea', group: 'Tech & home', description: 'The Salmabad store: address, opening hours, phone number and directions.' },
  { name: 'Starbucks', href: '/guides/brands/starbucks', group: 'Food & drink', description: 'Coffee shops in malls, standalone stores and drive-thrus, with menu and WiFi notes.' },
  { name: 'Costa Coffee', href: '/guides/brands/costa-coffee', group: 'Food & drink', description: 'Cafés at malls, standalone stores and drive-thrus, with menu, WiFi and hours.' },
  { name: 'Five Guys', href: '/guides/brands/five-guys', group: 'Food & drink', description: 'Burgers with free toppings, Cajun fries and milkshakes, plus every location.' },
  { name: 'Shake Shack', href: '/guides/brands/shake-shack', group: 'Food & drink', description: 'ShackBurger, crinkle fries and shakes at City Centre, The Avenues and more.' },
  { name: 'The Cheesecake Factory', href: '/guides/brands/cheesecake-factory', group: 'Food & drink', description: 'The restaurant at The Avenues, with menu highlights, hours and reservation tips.' },
];

const cuisineGuides = [
  {
    name: 'Fine Dining',
    href: '/guides/best-fine-dining-bahrain',
    description:
      'Hotel dining rooms and tasting menus, including CUT by Wolfgang Puck, Rasoi by Vineet, La Mer, Plums, BiCE and Marrakech.',
  },
  {
    name: 'Korean',
    href: '/guides/best-korean-restaurants-bahrain',
    description:
      'Korean BBQ, unlimited samgyeopsal and fried chicken, with Arirang, Seoul, BonChon, Han Kook Kwan and Yakiniku Shabu Shabu.',
  },
  {
    name: 'Lebanese',
    href: '/guides/best-lebanese-restaurants-bahrain',
    description:
      'Mezze, shawarma and Lebanese fine dining, covering Em Sherif, Badawi, Naseef, Zaatar w Zeit and Al Abraaj.',
  },
  {
    name: 'Mexican',
    href: '/guides/best-mexican-restaurants-bahrain',
    description:
      'Tacos, burritos and margaritas, from Cantina Kahlo and Casa Mexicana to Señor Paco, ElChapo and Burrito Loco.',
  },
  {
    name: 'Steakhouses',
    href: '/guides/best-steakhouses-bahrain',
    description:
      'Prime cuts and grills at CUT by Wolfgang Puck, The Meat Co, Legendz Steakhouse, Black Angus, Manos and Big Texas Steak House.',
  },
  {
    name: 'Turkish',
    href: '/guides/best-turkish-restaurants-bahrain',
    description:
      'Kebabs, pide and breakfast spreads, with CZN Burak, Konyali Ahmet Usta, Şişler, Bosporus and Iskenderun Grills.',
  },
];

const generalFoodGuides = [
  {
    name: 'Best Restaurants in Bahrain',
    href: '/best-restaurants-bahrain',
    description: 'The full restaurant guide, from fine dining and seafood to brunches and hidden gems.',
  },
  {
    name: 'Best Cafes in Bahrain',
    href: '/best-cafes-bahrain',
    description: 'Specialty coffee, study-friendly spots and the cafés worth a long sit-down.',
  },
  {
    name: 'Best Brunches in Bahrain',
    href: '/best-brunches-bahrain',
    description: 'Friday brunches across the hotels, with what to expect and how to book.',
  },
];

const faqs = [
  {
    q: 'What do the Bahrain Nights guides cover?',
    a: 'They cover four things: shopping malls in Bahrain, where individual brand stores are, restaurants organised by cuisine, and the traditional souks. Each guide includes the practical details that decide a trip — opening hours, parking, store or venue lists, and how to find the place.',
  },
  {
    q: 'Which mall guide should I read first?',
    a: 'If you want the biggest store directory, start with City Centre Bahrain, which lists 350+ stores alongside Wahooo! Waterpark, Magic Planet and a 20-screen Cineco cinema. For luxury shopping, start with Marassi Galleria or Moda Mall.',
  },
  {
    q: 'Does every brand have a store in Bahrain?',
    a: 'No. Uniqlo, for example, does not currently have stores in Bahrain. Our Uniqlo guide explains the situation and points to alternatives worth looking at instead.',
  },
  {
    q: 'Do the guides include opening hours and parking?',
    a: 'Yes. Mall and brand guides list regular and weekend hours, parking capacity and whether parking is free. Most malls open around 10AM and close around 10PM, with later hours on Thursday and Friday.',
  },
  {
    q: 'I am out in Bahrain and need something now — where do I go?',
    a: 'Use the venue directory to find places near you, the events listings for what is on tonight, and the cinema page for current showtimes. The guides are for planning ahead; those pages are for the same day.',
  },
];

export default function GuidesPage() {
  const totalGuides = mallGuides.length + brandGuides.length + cuisineGuides.length + 1;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com/guides' },
        ]}
      />

      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10" />
        <div className="max-w-5xl mx-auto relative text-center">
          <span className="inline-block px-4 py-1 bg-pink-500/20 text-pink-400 rounded-full text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4 inline mr-1" />
            {totalGuides} Guides
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
              Guides
            </span>
            {' '}to Bahrain
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Plain-English guides to the places people actually ask about: which mall to go
            to, where a brand&apos;s store is, which restaurants serve a particular cuisine,
            and where the traditional souks are. Every guide covers opening hours, parking,
            store lists and the practical details that decide whether a trip is worth it.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8 text-sm">
            <Link
              href="/guides/malls"
              className="px-5 py-2 bg-pink-500 hover:bg-pink-400 text-black font-semibold rounded-lg transition-colors"
            >
              Mall guides
            </Link>
            <Link
              href="/guides/brands"
              className="px-5 py-2 bg-white/10 hover:bg-white/20 font-semibold rounded-lg transition-colors"
            >
              Brand guides
            </Link>
            <Link
              href="/guides/souks"
              className="px-5 py-2 bg-white/10 hover:bg-white/20 font-semibold rounded-lg transition-colors"
            >
              Traditional souks
            </Link>
          </div>
        </div>
      </section>

      {/* Mall Guides */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
            <span className="p-2 rounded-lg bg-pink-500/20">
              <ShoppingBag className="w-6 h-6 text-pink-400" />
            </span>
            Shopping Mall Guides
          </h2>
          <p className="text-gray-400 mb-10 max-w-3xl">
            A trip to a Bahrain mall can mean three very different things. Luxury shopping
            at Marassi Galleria and Moda Mall, a full day out with the family at City
            Centre or Seef Mall, or a quick supermarket run and a cinema session at a
            neighbourhood centre such as Dana Mall, Bahrain Mall, Oasis Mall or Enma Mall.
            Dragon City is a different experience again — a wholesale market rather than a
            mall. Each guide below sets out the store list, parking, opening hours and what
            is worth the trip.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mallGuides.map((mall) => (
              <Link
                key={mall.href}
                href={mall.href}
                className="group bg-white/5 hover:bg-white/10 rounded-xl p-5 transition-all flex flex-col"
              >
                <h3 className="font-bold text-lg mb-1 group-hover:text-pink-400 transition-colors">
                  {mall.name}
                </h3>
                <p className="text-xs text-pink-400 mb-3 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {mall.area}
                </p>
                <p className="text-sm text-gray-400 flex-1">{mall.description}</p>
                <span className="inline-flex items-center gap-1 text-pink-400 text-sm font-medium mt-4">
                  Read the guide <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>

          <p className="text-sm text-gray-500 mt-8">
            The{' '}
            <Link href="/guides/malls" className="text-pink-400 hover:text-pink-300">
              mall directory
            </Link>{' '}
            also lists Wadi Al Sail in Riffa and Saar Mall in Saar, which do not have
            dedicated guides yet.
          </p>
        </div>
      </section>

      {/* Brand Guides */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
            <span className="p-2 rounded-lg bg-amber-500/20">
              <Sparkles className="w-6 h-6 text-amber-400" />
            </span>
            Brand Store Guides
          </h2>
          <p className="text-gray-400 mb-10 max-w-3xl">
            Twenty brand guides cover where each store actually is in Bahrain, its opening
            hours and how to find it — across fashion and sportswear, luxury houses, beauty,
            tech and home, and food and drink. Where a brand does not trade in Bahrain, the
            guide says so rather than sending you on a pointless trip.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {brandGuides.map((brand) => (
              <Link
                key={brand.href}
                href={brand.href}
                className="group bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold mb-1 group-hover:text-amber-400 transition-colors">
                      {brand.name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">{brand.group}</p>
                    <p className="text-sm text-gray-400">{brand.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-amber-400 opacity-0 group-hover:opacity-100 shrink-0 mt-1" />
                </div>
              </Link>
            ))}
          </div>

          <p className="text-sm text-gray-500 mt-8">
            See the full{' '}
            <Link href="/guides/brands" className="text-amber-400 hover:text-amber-300">
              brand shopping directory
            </Link>{' '}
            for every store guide we publish.
          </p>
        </div>
      </section>

      {/* Restaurant Guides */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
            <span className="p-2 rounded-lg bg-blue-500/20">
              <Utensils className="w-6 h-6 text-blue-400" />
            </span>
            Restaurant & Cuisine Guides
          </h2>
          <p className="text-gray-400 mb-10 max-w-3xl">
            When you want a specific kind of food, cuisine is a better way to search than
            location. These six guides list the restaurants in Bahrain by the food they
            serve, with prices, locations and the dishes worth ordering. If you would rather
            browse the whole scene, start with the general food guides underneath.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cuisineGuides.map((cuisine) => (
              <Link
                key={cuisine.href}
                href={cuisine.href}
                className="group bg-white/5 hover:bg-white/10 rounded-xl p-5 transition-all flex flex-col"
              >
                <h3 className="font-bold text-lg mb-2 group-hover:text-blue-400 transition-colors">
                  {cuisine.name} Restaurants in Bahrain
                </h3>
                <p className="text-sm text-gray-400 flex-1">{cuisine.description}</p>
                <span className="inline-flex items-center gap-1 text-blue-400 text-sm font-medium mt-4">
                  Read the guide <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {generalFoodGuides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group bg-white/5 hover:bg-white/10 rounded-xl p-5 transition-all"
              >
                <h3 className="font-bold mb-2 group-hover:text-blue-400 transition-colors">
                  {guide.name}
                </h3>
                <p className="text-sm text-gray-400">{guide.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Souks */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
            <span className="p-2 rounded-lg bg-purple-500/20">
              <Landmark className="w-6 h-6 text-purple-400" />
            </span>
            Traditional Souks
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <p className="text-gray-400">
              The malls are only half of shopping in Bahrain. The souk guide covers Bab Al
              Bahrain Souq in Manama with its Main Souq, the Gold Souq and the jewellery shops
              and pearl dealers along the gold lanes, the spice section and the fabric alley,
              plus Muharraq Souq with its halwa lane and local shops. It also covers where to
              eat while you are there and when each area is busiest.
            </p>
            <Link
              href="/guides/souks"
              className="group bg-white/5 hover:bg-white/10 rounded-xl p-6 transition-all"
            >
              <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                Traditional Souks in Bahrain
              </h3>
              <p className="text-sm text-gray-400">
                Bab Al Bahrain, Gold Souq, Muharraq Souq, spice markets and authentic
                Bahraini shopping.
              </p>
              <span className="inline-flex items-center gap-1 text-purple-400 text-sm font-medium mt-4">
                Read the guide <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* How to use */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">How to Use These Guides</h2>
          <div className="space-y-6 text-gray-400">
            <p>
              Start with the mall guide if your day is built around shopping and you want to
              know what is under one roof before you drive there. The store directories list
              the anchors and the mainstream brands, and the sections on parking, opening
              hours and food are there so a shopping trip and a meal can be planned together.
            </p>
            <p>
              Use the brand guides when you already know what you want. They answer the
              question a directory cannot: which mall the store is actually in, what time it
              opens, and whether the brand trades in Bahrain at all. The brand directory
              groups them by fashion, luxury, beauty, tech and home, and food and drink.
            </p>
            <p>
              Use the cuisine guides when the food is the plan. Each one is organised around
              the kind of meal you are after — a long lunch, a BBQ, a mezze spread, brunch —
              rather than around a neighbourhood, which is how most people search once they
              are hungry. The three general food guides cover the scene when you have not
              decided yet.
            </p>
            <p>
              For the same day rather than the plan, the{' '}
              <Link href="/places" className="text-pink-400 hover:text-pink-300">
                venue directory
              </Link>
              ,{' '}
              <Link href="/events" className="text-pink-400 hover:text-pink-300">
                events listings
              </Link>{' '}
              and{' '}
              <Link href="/tonight" className="text-pink-400 hover:text-pink-300">
                what is on tonight
              </Link>{' '}
              page are the ones to keep open in another tab.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6">
                <h3 className="font-bold mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* More */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">More from Bahrain Nights</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Things to Do', href: '/things-to-do-in-bahrain' },
              { title: 'Restaurants', href: '/best-restaurants-bahrain' },
              { title: 'Family Activities', href: '/family-kids' },
              { title: 'Nightlife', href: '/nightlife-bahrain' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors text-center font-medium hover:text-pink-400 transition-colors"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Bahrain Guides — Malls, Brands, Restaurants & Souks',
            description:
              'Guides to malls, brand stores, restaurant cuisines and traditional souks in Bahrain.',
            url: 'https://www.bahrainnights.com/guides',
            inLanguage: 'en',
            isPartOf: {
              '@type': 'WebSite',
              name: 'Bahrain Nights',
              url: 'https://www.bahrainnights.com',
            },
            hasPart: [
              ...mallGuides.map((m) => ({ '@type': 'WebPage', name: m.name, url: `https://www.bahrainnights.com${m.href}` })),
              ...brandGuides.map((b) => ({ '@type': 'WebPage', name: b.name, url: `https://www.bahrainnights.com${b.href}` })),
              ...cuisineGuides.map((c) => ({ '@type': 'WebPage', name: c.name, url: `https://www.bahrainnights.com${c.href}` })),
            ],
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a,
              },
            })),
          }),
        }}
      />
    </div>
  );
}
