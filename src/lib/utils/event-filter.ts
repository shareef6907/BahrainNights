/**
 * THE SHARED UPCOMING FILTER.
 *
 * ONE predicate, used by EVERY surface that renders an event.
 *
 * WHY A SHARED FUNCTION
 * ---------------------
 * Four public pages had their own date-granular filters, and one of them
 * - /international - had NO end filter at all, so it rendered an event
 * that had already finished ("Arabian Tale at TODA in Dubai", end_at
 * 13:00 Bahrain, on the page at 13:30).
 *
 * A correctness rule that lives in five places is a rule that will be
 * wrong in one of them. This is the one place.
 *
 * THE PREDICATE
 * -------------
 *     WHERE end_at > now()
 *
 * `now()` is the DATABASE's clock, evaluated per request on the server,
 * so a visitor in another time zone sees the same list.
 *
 * ZERO GRACE PERIOD: an event ending 03:00 disappears at 03:00:01.
 *
 * THE FALLBACK
 * -------------
 * If the `end_at` column does not exist yet - the migration has not been
 * run - the timestamp filter cannot work, and an empty events page is
 * worse than the bug it is fixing. So the caller falls back to the old
 * date-granular filter and says so loudly in the log.
 *
 * The fallback is per-surface, because each surface has its own extra
 * filters (country, category, date range).
 */

/** The ISO timestamp of now, for the `end_at > now()` comparison. */
export function endAtAfterNow(): string {
  return new Date().toISOString();
}

/**
 * Does this error mean the `end_at` column does not exist?
 *
 * PostgREST reports the FIRST missing column in the select list, and the
 * select list is alphabetical-ish, so `starts_at` can be reported before
 * `end_at`. All three new columns are checked.
 */
export function isMissingEndAtColumn(error: { message?: string } | null): boolean {
  if (!error?.message) return false;
  return /column events\.(end_at|starts_at|is_overnight) does not exist/i.test(
    error.message
  ) || /column .*(end_at|starts_at|is_overnight)/i.test(error.message);
}
