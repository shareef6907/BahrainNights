import { OG_IMAGE } from '@/lib/og';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  MapPin, Clock, ExternalLink, Car,
  ShoppingBag, Utensils, Users, Sparkles,
  Film, Store, Ticket
} from 'lucide-react';
import BreadcrumbSchema from '@/components/SEO/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Dana Mall Sanabis - Shopping & Cinema Guide 2026',
  description: 'Complete guide to Dana Mall in Sanabis, Bahrain. 100+ stores, Lulu Hypermarket, EPIX Cinemas with 10 screens, 1,800 free parking spaces and hours.',
  keywords: 'Dana Mall Bahrain, Dana Mall Sanabis, shopping mall Seef, Lulu Hypermarket Dana Mall, EPIX Cinemas Bahrain, malls in Bahrain, budget shopping Bahrain',
  openGraph: {
    title: 'Dana Mall Sanabis - Shopping & Cinema Guide 2026',
    description: 'One of Bahrain\'s first malls: Lulu Hypermarket, EPIX Cinemas with 10 screens, a food court and 1,800 free parking spaces in Sanabis.',
    type: 'article',
    locale: 'en_US',
    url: 'https://www.bahrainnights.com/guides/malls/dana-mall',
  images: [OG_IMAGE],
  },
  alternates: {
    canonical: 'https://www.bahrainnights.com/guides/malls/dana-mall',
  },
};

const mallInfo = {
  name: 'Dana Mall',
  tagline: 'Sanabis\'s community mall, built around a hypermarket',
  address: 'Sanabis, Seef District, Manama, Kingdom of Bahrain',
  website: 'https://danamallbh.com/',
  mapsLink: 'https://www.google.com/maps/dir/?api=1&destination=Dana+Mall+Sanabis+Bahrain',
  hours: {
    regular: 'Sat-Wed: 9:00 AM - 10:00 PM',
    weekend: 'Thu-Fri: 9:00 AM - 11:00 PM',
    ramadan: 'Special hours during Ramadan',
  },
  parking: {
    spaces: '1,800',
    cost: 'Free',
    valet: 'Not available',
  },
  size: '65,000 sqm',
  stores: '100+',
  yearOpened: '2002',
  type: 'Community Mall',
};

const storeCategories = [
  {
    name: 'Value Fashion',
    icon: ShoppingBag,
    stores: [
      { name: 'Max', link: null },
      { name: 'Splash', link: null },
      { name: 'Lifestyle', link: null },
      { name: 'Shoe Mart', link: null },
      { name: 'Various retail', link: null },
    ],
  },
  {
    name: 'Supermarket & Grocery',
    icon: Store,
    stores: [
      { name: 'Lulu Hypermarket (anchor store)', link: null },
      { name: 'Fresh produce', link: null },
      { name: 'Daily essentials', link: null },
    ],
  },
  {
    name: 'Cinema',
    icon: Film,
    stores: [
      { name: 'EPIX Cinemas - 10 screens', link: null },
      { name: 'Several titles running at once', link: null },
    ],
  },
  {
    name: 'Food Court',
    icon: Utensils,
    stores: [
      { name: 'Food court stalls', link: null },
      { name: 'Restaurants', link: null },
      { name: 'Quick bites between shops', link: null },
    ],
  },
  {
    name: 'Other Anchors',
    icon: Sparkles,
    stores: [
      { name: 'LuLu Group headquarters', link: null },
      { name: 'Community mall services', link: null },
    ],
  },
];

const entertainment = [
  {
    name: 'EPIX Cinemas',
    description: 'Ten screens inside the mall, so shopping, a supermarket run and a film can all happen in a single trip.',
    icon: Film,
  },
  {
    name: 'Ten-Screen Cinema Choice',
    description: 'Ten screens means the cinema can run more than one title at a time, so a group is not limited to a single auditorium for the evening.',
    icon: Ticket,
  },
  {
    name: 'LuLu Group Headquarters',
    description: 'The headquarters of the LuLu Group sits at the mall, the same group that opened the first LuLu Hypermarket in Bahrain here.',
    icon: Users,
  },
  {
    name: 'Everyday Errands',
    description: 'The hypermarket, the food court and the cinema cover most of what a weekly visit needs, so routine errands in the Sanabis area can be done under one roof.',
    icon: Store,
  },
];

const tips = [
  {
    title: 'Best Time to Visit',
    tip: 'Weekday mornings are the quietest. Thursday and Friday evenings run later, to 11 PM, and are the busiest window.',
  },
  {
    title: 'Combine Trips',
    tip: 'Because Lulu Hypermarket is the anchor store, a supermarket run and a cinema visit work well as one outing.',
  },
  {
    title: 'Parking',
    tip: 'Parking is free with 1,800 spaces on site, so there is no reason to pay for parking in a nearby block.',
  },
  {
    title: 'Budget Focus',
    tip: 'Dana Mall is listed in our mall directory as a community mall. The mix is value fashion - Max, Splash, Lifestyle and Shoe Mart - rather than luxury labels.',
  },
  {
    title: 'How It Compares',
    tip: 'Bahrain Mall and Seef Mall are close by in the same district if you want a larger store list or a bigger entertainment floor.',
  },
];

const faqs = [
  {
    q: 'What are Dana Mall\'s opening hours?',
    a: 'Dana Mall is open Saturday to Wednesday from 9 AM to 10 PM, and Thursday and Friday from 9 AM to 11 PM. Hours can change during Ramadan and public holidays.',
  },
  {
    q: 'Is parking free at Dana Mall?',
    a: 'Yes. Dana Mall has 1,800 parking spaces and parking is free for visitors.',
  },
  {
    q: 'Does Dana Mall have a cinema?',
    a: 'Yes. EPIX Cinemas is located inside Dana Mall and has 10 screens, so a film and a shopping trip can be handled in the same visit.',
  },
  {
    q: 'Is there a supermarket at Dana Mall?',
    a: 'Yes. Lulu Hypermarket is the anchor store at Dana Mall. It was the first LuLu Hypermarket in Bahrain, and the LuLu Group headquarters is also based at the mall.',
  },
  {
    q: 'Where is Dana Mall located?',
    a: 'Dana Mall is in Sanabis in the Seef District of Manama. It opened in 2002 and is one of the earliest shopping malls in Bahrain.',
  },
];

export default function DanaMallPage() {
  const lastUpdated = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-pink-950/10 to-slate-950 text-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bahrainnights.com' },
          { name: 'Guides', url: 'https://www.bahrainnights.com' },
          { name: 'Malls', url: 'https://www.bahrainnights.com/guides/malls' },
          { name: 'Dana Mall', url: 'https://www.bahrainnights.com/guides/malls/dana-mall' },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-pink-500/20 text-pink-400 rounded-full text-sm font-medium mb-4">
              🛒 Community Mall
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                Dana Mall
              </span>
              {' '}Sanabis
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              One of Bahrain&apos;s earliest malls, opened in 2002 and built around Lulu Hypermarket -
              the first LuLu in the country - with EPIX Cinemas on 10 screens, a food court and
              1,800 free parking spaces a short walk from most of Sanabis.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Stores', value: mallInfo.stores, icon: ShoppingBag },
              { label: 'Size', value: mallInfo.size, icon: MapPin },
              { label: 'Parking', value: mallInfo.parking.spaces, icon: Car },
              { label: 'Opened', value: mallInfo.yearOpened, icon: Sparkles },
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

      {/* Introduction */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto space-y-6 text-gray-300">
          <h2 className="text-3xl font-bold text-white">Why Dana Mall Still Matters</h2>
          <p>
            Dana Mall opened in 2002, at a point when Bahrain had very few purpose-built shopping
            centres and most retail was still happening along Manama Souq and in small neighbourhood
            centres. That makes it an early piece of the country&apos;s modern retail map, and it
            explains a lot about how the place still works today. It was never designed as a
            destination for a day out. It was designed as a place where the weekly grocery shop, a
            pharmacy, a bit of clothes shopping and a film could all happen in one trip.
          </p>
          <p>
            The anchor is Lulu Hypermarket, and it was the first LuLu in Bahrain. The LuLu Group
            also keeps its headquarters at the mall, which means the grocery operation here is a
            long-standing part of the group&apos;s Bahrain business rather than a recent addition.
            In practice that makes the supermarket the reason most people come through the doors,
            and the fashion, service and food tenants fill out the rest of the visit.
          </p>
          <p>
            The other anchor is EPIX Cinemas with 10 screens. Ten screens is enough for the cinema
            to run a full evening of titles at once, so two people who do not want the same film can
            still be at the mall together. It is the detail that lifts Dana Mall above a purely
            functional shopping centre: it gives the Sanabis and Seef area a proper cinema without
            anyone having to drive towards the bigger entertainment malls.
          </p>
          <p>
            Dana Mall sits in our mall directory as a community mall. That is an honest description
            rather than a ranking. The mix is value fashion - Max, Splash, Lifestyle and Shoe Mart
            among the names we list - with the hypermarket and the food court doing the heavy
            lifting on footfall. If you are after luxury labels, the Marassi Galleria, Moda Mall and
            The Avenues are the places to compare; if you want a supermarket, a family film and
            free parking in one building, this is the mall.
          </p>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Location & Hours</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-pink-400" />
                Address
              </h3>
              <div className="space-y-3 text-gray-300">
                <p>{mallInfo.address}</p>
                <p className="text-sm text-gray-500">
                  Dana Mall opened in {mallInfo.yearOpened} and covers about {mallInfo.size} of
                  retail space, with {mallInfo.stores} stores across the site.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={mallInfo.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-pink-500 hover:bg-pink-400 text-black font-bold rounded-lg transition-colors text-sm"
                  >
                    Get Directions
                  </a>
                  <a
                    href={mallInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors text-sm flex items-center gap-2"
                  >
                    Official Website <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-pink-400" />
                Opening Hours
              </h3>
              <div className="space-y-2 text-gray-300">
                <p><strong>Sat-Wed:</strong> 9:00 AM - 10:00 PM</p>
                <p><strong>Thu-Fri:</strong> 9:00 AM - 11:00 PM</p>
                <p className="text-sm text-gray-500 pt-2">
                  * Hours may vary during Ramadan and public holidays
                </p>
              </div>

              <h4 className="font-bold mt-6 mb-2 flex items-center gap-2">
                <Car className="w-4 h-4 text-pink-400" />
                Parking
              </h4>
              <p className="text-gray-300">
                {mallInfo.parking.spaces} spaces • {mallInfo.parking.cost} • No valet service
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Store Directory */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Store Directory by Category</h2>
          <p className="text-gray-400 mb-8">
            Browse the store mix across {mallInfo.stores} shops, the hypermarket, the cinema and
            the food court
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {storeCategories.map((category) => (
              <div key={category.name} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-lg text-pink-400 mb-3 flex items-center gap-2">
                  <category.icon className="w-5 h-5" />
                  {category.name}
                </h3>
                <div className="space-y-1">
                  {category.stores.map((store) => (
                    <span key={store.name} className="block text-gray-400 text-sm">
                      {store.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Entertainment & Anchors */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Cinema, Anchors & Everyday Services</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {entertainment.map((item) => (
              <div key={item.name} className="bg-white/5 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <item.icon className="w-5 h-5 text-pink-400" />
                  {item.name}
                </h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Food & Dining */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
            <Utensils className="w-8 h-8 text-pink-400" />
            Food & Dining
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                category: 'Food Court',
                restaurants: 'Food court stalls • Quick bites between shops',
              },
              {
                category: 'Restaurants',
                restaurants: 'Sit-down restaurants • Casual dining',
              },
              {
                category: 'Grocery',
                restaurants: 'Lulu Hypermarket • Fresh produce • Daily essentials',
              },
            ].map((option) => (
              <div key={option.category} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-pink-400 mb-2">{option.category}</h3>
                <p className="text-gray-400 text-sm">
                  {option.restaurants}
                </p>
              </div>
            ))}
          </div>

          <p className="text-gray-400 mt-6 max-w-3xl">
            Because the hypermarket is the anchor, a lot of Dana Mall&apos;s food traffic is grocery
            rather than restaurant. For a longer sit-down meal or a wider choice of cuisines, our
            guides to{' '}
            <Link href="/best-restaurants-bahrain" className="text-pink-400 hover:text-pink-300">
              the best restaurants in Bahrain
            </Link>{' '}
            and{' '}
            <Link href="/guides/souks" className="text-pink-400 hover:text-pink-300">
              the traditional souks
            </Link>{' '}
            cover the alternatives nearby.
          </p>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Tips for Visiting</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tips.map((item) => (
              <div key={item.title} className="bg-white/5 rounded-xl p-5">
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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

      {/* Related Links */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Explore More Malls</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Bahrain Mall', href: '/guides/malls/bahrain-mall' },
              { name: 'Seef Mall', href: '/guides/malls/seef-mall' },
              { name: 'City Centre Bahrain', href: '/guides/malls/city-centre-bahrain' },
              { name: 'All Malls in Bahrain', href: '/guides/malls' },
            ].map((mall) => (
              <Link
                key={mall.href}
                href={mall.href}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors group text-center"
              >
                <span className="font-medium group-hover:text-pink-400 transition-colors">
                  {mall.name}
                </span>
              </Link>
            ))}
          </div>

          <p className="text-gray-400 mt-8 max-w-3xl">
            Looking for something specific to shop for? Browse the{' '}
            <Link href="/explore/shopping" className="text-pink-400 hover:text-pink-300">
              shopping section
            </Link>{' '}
            for brand-by-brand listings, or check the{' '}
            <Link href="/explore/kids" className="text-pink-400 hover:text-pink-300">
              family activities guide
            </Link>{' '}
            for planning a day out with children.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Plan Your Visit</h2>
          <p className="text-gray-300 mb-8">
            Discover all shopping destinations in Bahrain
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/guides/malls"
              className="px-8 py-3 bg-pink-500 hover:bg-pink-400 text-black font-bold rounded-lg transition-colors"
            >
              All Malls in Bahrain
            </Link>
            <Link
              href="/explore/shopping"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
            >
              Shopping in Bahrain
            </Link>
          </div>
        </div>
      </section>

      {/* Structured Data - ShoppingCenter Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ShoppingCenter',
            name: 'Dana Mall',
            description: 'Community mall in Sanabis, Bahrain, opened in 2002, with 100+ stores, Lulu Hypermarket as anchor store, EPIX Cinemas with 10 screens and a food court.',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Sanabis, Seef District',
              addressLocality: 'Manama',
              addressRegion: 'Capital Governorate',
              addressCountry: 'BH',
            },
            url: mallInfo.website,
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday'],
                opens: '09:00',
                closes: '22:00',
              },
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Thursday', 'Friday'],
                opens: '09:00',
                closes: '23:00',
              },
            ],
            amenityFeature: [
              { '@type': 'LocationFeatureSpecification', name: 'Free Parking', value: true },
              { '@type': 'LocationFeatureSpecification', name: 'Cinema', value: true },
              { '@type': 'LocationFeatureSpecification', name: 'Hypermarket', value: true },
              { '@type': 'LocationFeatureSpecification', name: 'Food Court', value: true },
            ],
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
