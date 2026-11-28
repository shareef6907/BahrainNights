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
  /**
   * The event's real start INSTANT (ISO 8601 with a Z).
   *
   * Used by the period chips: "Today" means "ends after now AND starts
   * before tomorrow 00:00 Bahrain".
   */
  starts_at?: string | null;
  /**
   * The event's real end INSTANT (ISO 8601 with a Z).
   *
   * The listing filter is `end_at > now()`. Zero grace period: an event
   * ending 03:00 disappears at 03:00:01.
   */
  end_at?: string | null;
  /** True for a single-night event that runs into the small hours. */
  is_overnight?: boolean;
  is_featured?: boolean;
  isFeatured?: boolean;
}

/**
 * The sort key for an event: the date it is ON or NEXT HAPPENS.
 *
 * `rawDate` is preferred. `start_date` is the fallback for callers that
 * only have the raw column. The DISPLAY `date` is never used, because it
 * has no year in it.
 *
 * A LONG-RUNNING EVENT IS KEYED BY ITS END DATE.
 *
 * Some rows are a series rather than a single night: "Saturday Techno
 * Night at Zyra" has start_date 2026-06-20 and end_date 2026-12-27. That
 * event is on TONIGHT - it is running right now - but its start_date is
 * five months ago, so sorting by start_date puts it at the TOP of the page
 * as "Jun 20", which reads as an event that finished in June.
 *
 * For a row whose start is in the past and whose end is still ahead, the
 * event is ON NOW. The listing shows the range ("Jun 20 - Dec 27"), so
 * keying it by the end date puts it with the events that are on today and
 * next, which is where a visitor expects it.
 */
function eventSortKey(event: SortableEvent, today?: string): number {
  const startIso = (event.rawDate || event.start_date || '').slice(0, 10);
  const endIso = (event.rawEndDate || '').slice(0, 10);

  // A series that is running right now: key it by when it ends.
  if (today && endIso && startIso && startIso < today && endIso >= today) {
    const t = new Date(`${endIso}T00:00:00Z`).getTime();
    return Number.isNaN(t) ? Number.POSITIVE_INFINITY : t;
  }

  if (!startIso) return Number.POSITIVE_INFINITY;

  // A bare YYYY-MM-DD parsed as UTC midnight; that is fine for ORDERING
  // because every key is the same kind of value.
  const t = new Date(`${startIso}T00:00:00Z`).getTime();
  return Number.isNaN(t) ? Number.POSITIVE_INFINITY : t;
}

/**
 * Sort events with featured first (alphabetically), then non-featured by date
 *
 * `today` is Bahrain's calendar date as YYYY-MM-DD. It is used to decide
 * whether a long-running series is ON NOW (and should therefore be keyed by
 * its end date rather than its start date). Callers on the server pass
 * `todayInBahrain()`; callers in the browser pass the same value so the
 * server and the client sort identically - a different sort key on each
 * side is a hydration mismatch.
 */
export function sortEventsWithFeatured<T extends SortableEvent>(
  events: T[],
  today?: string
): T[] {
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
    const diff = eventSortKey(a, today) - eventSortKey(b, today);
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
export function separateFeaturedEvents<T extends SortableEvent>(
  events: T[],
  today?: string
): {
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
    const diff = eventSortKey(a, today) - eventSortKey(b, today);
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
