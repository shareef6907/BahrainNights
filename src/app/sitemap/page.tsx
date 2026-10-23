import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sitemap',
  description: 'Complete sitemap of Bahrain Nights - Find all pages for events, venues, guides, and more in Bahrain.',
};

const sitemapData = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Events', href: '/events' },
    { name: 'Events Today', href: '/events/today' },
    { name: 'This Weekend', href: '/events/this-weekend' },
    { name: 'Events Calendar', href: '/events/calendar' },
    { name: 'Places', href: '/places' },
    { name: 'Venues', href: '/venues' },
    { name: 'Cinema', href: '/cinema' },
    { name: 'Attractions', href: '/attractions' },
    { name: 'Tours', href: '/tours' },
    { name: 'Offers', href: '/offers' },
    { name: 'Search', href: '/search' },
  ],
  explore: [
    { name: 'Explore', href: '/explore' },
    { name: 'Kids & Family', href: '/explore/kids' },
    { name: 'Hotels', href: '/explore/hotels' },
    { name: 'Spas', href: '/explore/spas' },
    { name: 'Shopping', href: '/explore/shopping' },
    { name: 'Tours', href: '/explore/tours' },
    { name: 'Community', href: '/explore/community' },
  ],
  guides: [
    { name: 'All Guides', href: '/guides' },
    { name: 'Things To Do', href: '/things-to-do-in-bahrain' },
    { name: 'Things To Do This Weekend', href: '/weekend-in-bahrain' },
    { name: 'Things To Do With Kids', href: '/family-kids' },
    { name: 'Nightlife', href: '/nightlife-bahrain' },
    { name: 'Nightlife Juffair', href: '/nightlife-bahrain' },
    { name: 'Nightlife Adliya', href: '/nightlife-bahrain' },
    { name: 'Parties', href: '/events' },
    { name: 'Ladies Nights', href: '/ladies-night-bahrain' },
    { name: 'Beach Clubs', href: '/attractions' },
    { name: 'Brunches', href: '/best-brunches-bahrain' },
    { name: 'Brunch', href: '/best-brunches-bahrain' },
    { name: 'Restaurants', href: '/best-restaurants-bahrain' },
    { name: 'Cafes', href: '/best-cafes-bahrain' },
    { name: 'Shisha', href: '/best-restaurants-bahrain' },
    { name: 'Hotels', href: '/best-hotels-bahrain' },
    { name: 'Spas', href: '/explore/spas' },
    { name: 'Concerts', href: '/events' },
    { name: 'Tourist Attractions', href: '/attractions' },
    { name: 'Places To Visit', href: '/attractions' },
    { name: 'Family Activities', href: '/family-kids' },
    { name: 'Free Things To Do', href: '/things-to-do-in-bahrain' },
    { name: 'Fine Dining', href: '/guides/best-fine-dining-bahrain' },
    { name: 'Water Parks', href: '/attractions' },
    { name: 'Museums', href: '/attractions' },
    { name: 'Historical Sites', href: '/attractions' },
    { name: 'Outdoor Activities', href: '/attractions' },
    { name: 'Golf', href: '/attractions' },
    { name: 'Staycations', href: '/best-hotels-bahrain' },
    { name: 'Weekend Getaways', href: '/weekend-in-bahrain' },
    { name: 'Public Beaches', href: '/attractions' },
    { name: 'Souks', href: '/guides/souks' },
  ],
  food: [
    { name: 'Indian Restaurants', href: '/best-restaurants-bahrain' },
    { name: 'Arabic Restaurants', href: '/best-restaurants-bahrain' },
    { name: 'Seafood', href: '/best-restaurants-bahrain' },
    { name: 'Sushi', href: '/best-restaurants-bahrain' },
    { name: 'Buffets', href: '/best-restaurants-bahrain' },
    { name: 'Street Food', href: '/best-restaurants-bahrain' },
  ],
  areas: [
    { name: 'Manama', href: '/things-to-do-in-bahrain' },
    { name: 'Seef', href: '/things-to-do-in-bahrain' },
    { name: 'Riffa', href: '/things-to-do-in-bahrain' },
    { name: 'Amwaj', href: '/things-to-do-in-bahrain' },
    { name: 'Juffair Dining', href: '/best-restaurants-bahrain' },
  ],
  malls: [
    { name: 'Malls Guide', href: '/guides/malls' },
    { name: 'Marassi Galleria', href: '/guides/malls/marassi-galleria' },
    { name: 'City Centre Bahrain', href: '/guides/malls/city-centre-bahrain' },
    { name: 'Seef Mall', href: '/guides/malls/seef-mall' },
    { name: 'The Avenues', href: '/guides/malls/the-avenues' },
    { name: 'Moda Mall', href: '/guides/malls/moda-mall' },
    { name: 'Bahrain Mall', href: '/guides/malls/bahrain-mall' },
    { name: 'Dragon City', href: '/guides/malls/dragon-city' },
    { name: 'Enma Mall', href: '/guides/malls/enma-mall' },
    { name: 'Oasis Mall', href: '/guides/malls/oasis-mall' },
    { name: 'Souq Al Baraha', href: '/guides/malls/souq-al-baraha' },
  ],
  brands: [
    { name: 'Chanel', href: '/guides/brands/chanel' },
    { name: 'Louis Vuitton', href: '/guides/brands/louis-vuitton' },
    { name: 'Gucci', href: '/guides/brands/gucci' },
    { name: 'Dior', href: '/guides/brands/dior' },
    { name: 'Hermes', href: '/guides/brands/hermes' },
    { name: 'Zara', href: '/guides/brands/zara' },
    { name: 'H&M', href: '/guides/brands/hm' },
    { name: 'Uniqlo', href: '/guides/brands/uniqlo' },
    { name: 'Nike', href: '/guides/brands/nike' },
    { name: 'Adidas', href: '/guides/brands/adidas' },
    { name: 'Apple', href: '/guides/brands/apple' },
    { name: 'IKEA', href: '/guides/brands/ikea' },
    { name: 'Crocs', href: '/guides/brands/crocs' },
    { name: 'Sephora', href: '/guides/brands/sephora' },
    { name: 'Bath & Body Works', href: '/guides/brands/bath-body-works' },
    { name: 'Starbucks', href: '/guides/brands/starbucks' },
    { name: 'Costa Coffee', href: '/guides/brands/costa-coffee' },
    { name: 'Cheesecake Factory', href: '/guides/brands/cheesecake-factory' },
    { name: 'Shake Shack', href: '/guides/brands/shake-shack' },
    { name: 'Five Guys', href: '/guides/brands/five-guys' },
  ],
  seasonal: [
    { name: 'F1 2026', href: '/events' },
    { name: 'F1', href: '/events' },
    { name: 'Ramadan 2026', href: '/events' },
    { name: 'Ramadan', href: '/events' },
    { name: 'Eid', href: '/events' },
    { name: 'National Day', href: '/events' },
    { name: 'Summer', href: '/attractions' },
  ],
  regional: [
    { name: 'Regional Events', href: '/regional' },
    { name: 'International', href: '/international' },
    { name: 'Dubai Parties', href: '/international' },
    { name: 'Dubai Concerts', href: '/international' },
    { name: 'Dubai Events', href: '/international' },
    { name: 'Abu Dhabi Parties', href: '/international' },
    { name: 'Qatar Parties', href: '/international' },
    { name: 'Saudi Concerts', href: '/international' },
  ],
  visitors: [
    { name: 'Budget Travel', href: '/offers' },
    { name: 'First Time Visitors', href: '/things-to-do-in-bahrain' },
    { name: 'Expat Guide', href: '/international' },
  ],
  business: [
    { name: 'Advertise With Us', href: '/advertise' },
    { name: 'List Your Event', href: '/list-event' },
    { name: 'Register Venue', href: '/register-venue' },
    { name: 'Become a Guide', href: '/become-a-guide' },
    { name: 'Sponsors', href: '/sponsors' },
  ],
  info: [
    { name: 'Contact', href: '/contact' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Content Guidelines', href: '/content-guidelines' },
  ],
};

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-gray-950 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">Sitemap</h1>
        <p className="text-gray-400 mb-12">
          Find all pages on Bahrain Nights - your guide to events, nightlife, and things to do in Bahrain.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Main Pages */}
          <section>
            <h2 className="text-xl font-semibold text-purple-400 mb-4">Main Pages</h2>
            <ul className="space-y-2">
              {sitemapData.main.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-300 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Explore */}
          <section>
            <h2 className="text-xl font-semibold text-purple-400 mb-4">Explore</h2>
            <ul className="space-y-2">
              {sitemapData.explore.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-300 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Guides */}
          <section>
            <h2 className="text-xl font-semibold text-purple-400 mb-4">Guides</h2>
            <ul className="space-y-2">
              {sitemapData.guides.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-300 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Food & Dining */}
          <section>
            <h2 className="text-xl font-semibold text-purple-400 mb-4">Food & Dining</h2>
            <ul className="space-y-2">
              {sitemapData.food.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-300 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Areas */}
          <section>
            <h2 className="text-xl font-semibold text-purple-400 mb-4">Areas</h2>
            <ul className="space-y-2">
              {sitemapData.areas.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-300 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Malls */}
          <section>
            <h2 className="text-xl font-semibold text-purple-400 mb-4">Malls</h2>
            <ul className="space-y-2">
              {sitemapData.malls.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-300 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Brands */}
          <section>
            <h2 className="text-xl font-semibold text-purple-400 mb-4">Brand Guides</h2>
            <ul className="space-y-2">
              {sitemapData.brands.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-300 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Seasonal */}
          <section>
            <h2 className="text-xl font-semibold text-purple-400 mb-4">Seasonal</h2>
            <ul className="space-y-2">
              {sitemapData.seasonal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-300 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Regional */}
          <section>
            <h2 className="text-xl font-semibold text-purple-400 mb-4">Regional</h2>
            <ul className="space-y-2">
              {sitemapData.regional.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-300 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* For Visitors */}
          <section>
            <h2 className="text-xl font-semibold text-purple-400 mb-4">For Visitors</h2>
            <ul className="space-y-2">
              {sitemapData.visitors.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-300 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* For Business */}
          <section>
            <h2 className="text-xl font-semibold text-purple-400 mb-4">For Business</h2>
            <ul className="space-y-2">
              {sitemapData.business.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-300 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Info */}
          <section>
            <h2 className="text-xl font-semibold text-purple-400 mb-4">Information</h2>
            <ul className="space-y-2">
              {sitemapData.info.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-300 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-16 text-center text-gray-500 text-sm">
          <p>Dynamic content like individual events, venues, and blog posts are not listed here.</p>
          <p className="mt-2">
            <Link href="/sitemap.xml" className="text-purple-400 hover:text-purple-300">
              View XML Sitemap
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
