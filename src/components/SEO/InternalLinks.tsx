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
// NOTE: every href here is verified to return 200. Previous versions pointed at
// /guides/* paths that do not exist (404) — e.g. /guides/nightlife, /guides/restaurants,
// /guides/brunches, /guides/cafes, /guides/concerts, /guides/parties, /guides/ladies-nights,
// /guides/things-to-do, /guides/family-activities, /guides/beach-clubs,
// /guides/tourist-attractions. These now point at the real pages.
export const guideLinks: LinkItem[] = [
  { title: 'Things to Do in Bahrain', href: '/things-to-do-in-bahrain' },
  { title: 'Best Restaurants', href: '/best-restaurants-bahrain' },
  { title: 'Nightlife Guide', href: '/nightlife-bahrain' },
  { title: 'Best Hotels', href: '/best-hotels-bahrain' },
  { title: 'Family Activities', href: '/family-kids' },
  { title: 'Best Brunches', href: '/best-brunches-bahrain' },
  { title: 'Best Cafes', href: '/best-cafes-bahrain' },
  { title: 'Shopping Malls', href: '/guides/malls' },
  { title: 'Tourist Attractions', href: '/attractions' },
];

export const eventLinks: LinkItem[] = [
  { title: 'Events Today', href: '/events/today' },
  { title: 'This Weekend', href: '/events/this-weekend' },
  { title: 'This Week', href: '/bahrain-events-this-week' },
  { title: 'Cinema', href: '/cinema' },
  { title: 'Event Calendar', href: '/calendar' },
  { title: 'Tonight in Bahrain', href: '/tonight' },
  { title: 'Ladies Nights', href: '/ladies-night-bahrain' },
];

export const placeLinks: LinkItem[] = [
  { title: 'All Places', href: '/places' },
  { title: 'Restaurants', href: '/best-restaurants-bahrain' },
  { title: 'Cafes', href: '/best-cafes-bahrain' },
  { title: 'Lounges', href: '/nightlife-bahrain' },
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

/**
 * Removes duplicate hrefs while preserving order.
 * Use when combining link collections that overlap (e.g. guideLinks + placeLinks).
 */
export function dedupeLinks(...groups: LinkItem[][]): LinkItem[] {
  const seen = new Set<string>();
  const out: LinkItem[] = [];
  for (const group of groups) {
    for (const item of group) {
      if (seen.has(item.href)) continue;
      seen.add(item.href);
      out.push(item);
    }
  }
  return out;
}
