import Link from 'next/link';

interface LinkItem {
  title: string;
  href: string;
}

interface InternalLinksProps {
  title?: string;
  links: LinkItem[];
}

/**
 * SEO Internal Links component
 * Adds contextual internal links to improve site crawlability and link equity distribution
 */
export default function InternalLinks({ title = 'Explore More', links }: InternalLinksProps) {
  if (!links || links.length === 0) return null;

  return (
    <nav aria-label="Related pages" className="mt-12 mb-8 px-4">
      <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
      <div className="flex flex-wrap gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="inline-block px-4 py-2 bg-gray-800/60 hover:bg-orange-500/20 border border-gray-700 hover:border-orange-500/50 rounded-full text-sm text-gray-300 hover:text-orange-400 transition-all"
          >
            {link.title}
          </Link>
        ))}
      </div>
    </nav>
  );
}

// Pre-built link collections for common page types
export const guideLinks: LinkItem[] = [
  { title: 'Things to Do in Bahrain', href: '/guides/things-to-do' },
  { title: 'Best Restaurants', href: '/guides/restaurants' },
  { title: 'Nightlife Guide', href: '/guides/nightlife' },
  { title: 'Beach Clubs', href: '/guides/beach-clubs' },
  { title: 'Family Activities', href: '/guides/family-activities' },
  { title: 'Best Brunches', href: '/guides/brunches' },
  { title: 'Shopping Malls', href: '/guides/malls' },
  { title: 'Tourist Attractions', href: '/guides/tourist-attractions' },
];

export const eventLinks: LinkItem[] = [
  { title: 'Events Today', href: '/events/today' },
  { title: 'This Weekend', href: '/events/this-weekend' },
  { title: 'All Events', href: '/events' },
  { title: 'Cinema', href: '/cinema' },
  { title: 'Concerts & Shows', href: '/guides/concerts' },
  { title: 'Parties', href: '/guides/parties' },
  { title: 'Ladies Nights', href: '/guides/ladies-nights' },
];

export const placeLinks: LinkItem[] = [
  { title: 'All Places', href: '/places' },
  { title: 'Restaurants', href: '/guides/restaurants' },
  { title: 'Cafes', href: '/guides/cafes' },
  { title: 'Lounges & Bars', href: '/guides/nightlife' },
  { title: 'Hotels', href: '/explore/hotels' },
  { title: 'Spas', href: '/explore/spas' },
  { title: 'Shopping', href: '/explore/shopping' },
];

export const exploreLinks: LinkItem[] = [
  { title: 'Events', href: '/events' },
  { title: 'Places', href: '/places' },
  { title: 'Guides', href: '/guides' },
  { title: 'Attractions', href: '/attractions' },
  { title: 'Tours', href: '/tours' },
  { title: 'Offers & Deals', href: '/offers' },
  { title: 'Cinema', href: '/cinema' },
];
