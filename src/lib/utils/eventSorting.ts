/**
 * Event Sorting Utility
 *
 * Sorts events with the following rules:
 * 1. Featured events appear FIRST
 * 2. Featured events are sorted alphabetically by title
 * 3. Non-featured events appear after, sorted by date (soonest first)
 */

interface SortableEvent {
  id: string;
  title: string;
  date?: string | null;
  start_date?: string | null;
  is_featured?: boolean;
  isFeatured?: boolean;
}

/**
 * Sort events with featured first (alphabetically), then non-featured by date
 */
export function sortEventsWithFeatured<T extends SortableEvent>(events: T[]): T[] {
  return [...events].sort((a, b) => {
    const aFeatured = a.is_featured || a.isFeatured || false;
    const bFeatured = b.is_featured || b.isFeatured || false;

    // Featured events come first
    if (aFeatured && !bFeatured) return -1;
    if (!aFeatured && bFeatured) return 1;

    // Both featured: sort alphabetically by title
    if (aFeatured && bFeatured) {
      return a.title.localeCompare(b.title);
    }

    // Both non-featured: sort by date (soonest first)
    const aDate = a.date || a.start_date || '';
    const bDate = b.date || b.start_date || '';
    return new Date(aDate).getTime() - new Date(bDate).getTime();
  });
}

/**
 * Separate events into featured and non-featured arrays
 */
export function separateFeaturedEvents<T extends SortableEvent>(events: T[]): {
  featured: T[];
  regular: T[];
} {
  const featured: T[] = [];
  const regular: T[] = [];

  events.forEach(event => {
    if (event.is_featured || event.isFeatured) {
      featured.push(event);
    } else {
      regular.push(event);
    }
  });

  // Sort featured alphabetically
  featured.sort((a, b) => a.title.localeCompare(b.title));

  // Sort regular by date
  regular.sort((a, b) => {
    const aDate = a.date || a.start_date || '';
    const bDate = b.date || b.start_date || '';
    return new Date(aDate).getTime() - new Date(bDate).getTime();
  });

  return { featured, regular };
}

/**
 * Get featured events only, sorted alphabetically
 */
export function getFeaturedEvents<T extends SortableEvent>(events: T[]): T[] {
  return events
    .filter(e => e.is_featured || e.isFeatured)
    .sort((a, b) => a.title.localeCompare(b.title));
}
