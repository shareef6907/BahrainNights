/**
 * Server-side read of the per-film booking URLs.
 *
 * WHY THIS IS A SEPARATE, FAULT-TOLERANT QUERY
 * ---------------------------------------------
 * The booking URLs live in `movies.booking_urls`, a `jsonb` column added by
 * `docs/sql/2026-11-20-add-movies-booking-urls.sql`. That script is MANUAL —
 * it has not been run against production yet.
 *
 * That matters, because a column that does not exist cannot appear in a
 * `select()` list: PostgREST answers the WHOLE query with
 * `42703 column movies.booking_urls does not exist`. If `booking_urls` were
 * added to `PUBLIC_MOVIE_SELECT`, the `/cinema` page and every public cinema
 * API would fail with a 500 the moment this branch deployed — until Shareef
 * ran the SQL by hand.
 *
 * So the column is read in its own, fault-tolerant query: a failure here
 * degrades to "no per-film booking URL", which means "no Book button" — the
 * safe direction. The rest of the page keeps working.
 *
 * This is also the right shape for the data: the booking URLs are a private
 * concern of the cinema display, not part of the public movie payload, and
 * they are never serialised into the RSC payload of a page as a raw DB row.
 */
import { supabaseAdmin } from '@/lib/supabase';

/**
 * The per-film booking URLs, keyed by movie id, then by cinema id.
 *
 * e.g. `{ "<movie-uuid>": { "vox": "https://bhr.voxcinemas.com/movies/xyz" } }`
 */
export type BookingUrlsByMovie = Record<string, Record<string, string>>;

/**
 * Has the `booking_urls` column been added yet?
 *
 * Cached for the lifetime of the process. The answer cannot change without a
 * deploy, and the sync logs a warning about it too.
 */
let columnAvailable: boolean | null = null;

/**
 * Fetch the per-film booking URLs for the given movie ids.
 *
 * Returns an EMPTY map (never throws) when:
 *   - the column has not been created yet,
 *   - the query fails for any other reason,
 *   - there are no ids.
 *
 * A film with no entry here simply has no Book button. A film with a bad URL
 * here would get one — but the sync only ever writes a URL it has verified
 * answers HTTP 200, and `buildBookingLinks` additionally rejects anything
 * that is not an absolute https URL.
 */
export async function getBookingUrlsByMovie(movieIds: string[]): Promise<BookingUrlsByMovie> {
  if (!Array.isArray(movieIds) || movieIds.length === 0) return {};
  if (columnAvailable === false) return {};

  // PostgREST's `in` filter has a URL-length limit; chunk to stay well under it.
  const CHUNK = 100;
  const out: BookingUrlsByMovie = {};

  for (let i = 0; i < movieIds.length; i += CHUNK) {
    const chunk = movieIds.slice(i, i + CHUNK);

    let data: { id: string; booking_urls: unknown }[] | null = null;
    try {
      const res = await supabaseAdmin
        .from('movies')
        .select('id, booking_urls')
        .in('id', chunk);
      if (res.error) {
        // 42703 = the column does not exist. The script has not been run yet.
        if (res.error.code === '42703' || /does not exist/i.test(res.error.message || '')) {
          columnAvailable = false;
          console.warn(
            '[booking-urls] `movies.booking_urls` does not exist yet — per-film Book buttons are suppressed. ' +
              'Run: docs/sql/2026-11-20-add-movies-booking-urls.sql (manual, one-off), then re-run the cinema sync.'
          );
          return {};
        }
        console.error('[booking-urls] failed to read booking_urls:', res.error.message);
        return {};
      }
      data = res.data as unknown as { id: string; booking_urls: unknown }[];
    } catch (err) {
      // A network or client error must never take the page down.
      console.error('[booking-urls] booking_urls query threw:', err);
      return {};
    }

    columnAvailable = true;

    for (const row of data || []) {
      const value = row.booking_urls;
      if (!value || typeof value !== 'object' || Array.isArray(value)) continue;
      const map = value as Record<string, unknown>;
      const clean: Record<string, string> = {};
      for (const [cinema, url] of Object.entries(map)) {
        if (typeof url === 'string' && url.trim()) clean[cinema] = url.trim();
      }
      if (Object.keys(clean).length > 0) out[row.id] = clean;
    }
  }

  return out;
}
