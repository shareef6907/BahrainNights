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
  /**
   * The ISO date (YYYY-MM-DD).
   *
   * THIS IS THE FIELD THE SORT MUST USE.
   *
   * `date` is the DISPLAY string - "Fri, Jan 8" - and `new Date("Jan 8")`
   * parses as 8 January of the CURRENT year. On 27 Nov 2026 that is a date
   * in the PAST, so every event stored for 2027 sorted itself to the very
   * top of the page and read as a dead event ("Jan 8", "Feb 5", "Mar 12",
   * "Oct 22" - no year shown). The events were in the database with the
   * right year; the sort threw that year away.
   *
   * `rawDate` is the ISO date, so it is the only safe sort key.
   */
  rawDate?: string | null;
  rawEndDate?: string | null;
  is_featured?: boolean;
  isFeatured?: boolean;
}

/**
 * The sort key for an event: its ISO start date.
 *
 * `rawDate` is preferred. `start_date` is the fallback for callers that
 * only have the raw column. The DISPLAY `date` is never used, because it
 * has no year in it.
 */
function eventSortKey(event: SortableEvent): number {
  const iso = event.rawDate || event.start_date || '';
  if (!iso) return Number.POSITIVE_INFINITY;

  // A bare YYYY-MM-DD parsed as UTC midnight; that is fine for ORDERING
  // because every key is the same kind of value.
  const t = new Date(`${iso.slice(0, 10)}T00:00:00Z`).getTime();
  return Number.isNaN(t) ? Number.POSITIVE_INFINITY : t;
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

    // Both non-featured: sort by ISO date (soonest first)
    const diff = eventSortKey(a) - eventSortKey(b);
    if (diff !== 0) return diff;

    /*
     * A deterministic tiebreaker.
     *
     * Without it, two events on the same date keep whatever order the array
     * happened to have, and the grid visibly reshuffles between renders -
     * which reads as the page "glitching". The id is stable.
     */
    return String(a.id).localeCompare(String(b.id));
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

  // Sort regular by ISO date, with a deterministic tiebreaker.
  regular.sort((a, b) => {
    const diff = eventSortKey(a) - eventSortKey(b);
    if (diff !== 0) return diff;
    return String(a.id).localeCompare(String(b.id));
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
