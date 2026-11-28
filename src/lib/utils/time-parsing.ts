/**
 * EVENT TIME PARSING.
 *
 * THE TIME COLUMNS ARE FREE TEXT, AND THEY CONTAIN MORE THAN ONE KIND OF
 * THING.
 *
 * A row scraped from the Bahrain Calendar stores a whole RANGE in the
 * `time` column:
 *
 *     time = "05:00 PM - 12:00 AM"
 *
 * That is a real value in the database - 8 rows have it today. The
 * Postgres migration failed on its first run with:
 *
 *     invalid input syntax for type time: "05:00 PM - 12:00 AM"
 *
 * So the parser here must survive every shape that is actually in the
 * data, and must NEVER throw.
 *
 * WHAT THE PARSER DOES
 * --------------------
 * It extracts the time-like TOKENS from the string, in order:
 *
 *     "05:00 PM - 12:00 AM"  ->  ["05:00 PM", "12:00 AM"]
 *     "06:00 PM"              ->  ["06:00 PM"]
 *     "17:00"                 ->  ["17:00"]
 *     "9:30"                  ->  ["09:30"]
 *     "from 6:00 PM to 10 PM" ->  ["6:00 PM", "10 PM"]
 *     "TBA"                   ->  []
 *
 * The FIRST token is the start, the SECOND (if there is one) is the end.
 * Anything with no token at all returns null, and null means EXPIRED -
 * fail closed, never open.
 *
 * The 12-HOUR FORMS ARE THE POINT. "05:00 PM" is 17:00, and "12:00 AM"
 * is 00:00 - the hour after midnight, which is how an overnight event
 * ends. Reading "05:00 PM" as 05:00 would put the start in the morning.
 *
 * The rule is deliberately permissive about what surrounds a token ("from",
 * "to", "-", "until") and strict about the token itself.
 */

/**
 * A time-like token: 1-2 digits, an optional separator, 2 digits, an
 * optional am/pm suffix.
 *
 * The am/pm suffix is THE POINT - "05:00 PM" is 17:00 and "12:00 AM" is
 * 00:00, and the overnight rows depend on that second reading.
 *
 * The seconds group is consumed as part of the token and NOT offered as a
 * separate one, so "20:00:00" is ONE time of 20:00, not a start of 20:00
 * and an end of 00:00.
 */
const TIME_TOKEN = /(\d{1,2})\s*[:.]?\s*(\d{2})?(?::(\d{2}))?\s*(am|pm)?/gi;

/**
 * Parse a free-text time value into minutes since midnight.
 *
 * Returns null when there is no parseable time in the string. It never
 * throws.
 */
export function parseTimeToMinutes(value: string | null | undefined): number | null {
  if (value === null || value === undefined) return null;
  const text = String(value).trim();
  if (!text) return null;

  // The tokens, in the order they appear.
  TIME_TOKEN.lastIndex = 0;
  const tokens: number[] = [];
  let m: RegExpExecArray | null;
  while ((m = TIME_TOKEN.exec(text)) !== null) {
    let hours = Number(m[1]);
    const minutes = m[2] !== undefined ? Number(m[2]) : 0;
    // m[3] is the seconds, which are part of the SAME token and are
    // deliberately not offered as a separate time.
    const period = m[4] ? m[4].toLowerCase() : null;

    if (!Number.isFinite(hours) || !Number.isFinite(minutes)) continue;
    if (minutes > 59) continue;

    if (period === 'pm' && hours < 12) hours += 12;
    else if (period === 'am' && hours === 12) hours = 0;
    // A 24-hour value with an am/pm suffix is contradictory; the suffix
    // wins, but an hour above 23 is nonsense either way.
    if (hours > 23) continue;

    tokens.push(hours * 60 + minutes);

    // Only the first two tokens matter: a range has two ends.
    if (tokens.length === 2) break;
  }

  return tokens.length ? tokens[0] : null;
}

/**
 * The END time from a free-text value, if it carries one.
 *
 * "05:00 PM - 12:00 AM" -> 00:00 (720 minutes)
 * "06:00 PM"            -> null (no end is stated)
 */
export function parseEndTimeToMinutes(value: string | null | undefined): number | null {
  if (value === null || value === undefined) return null;
  const text = String(value).trim();
  if (!text) return null;

  TIME_TOKEN.lastIndex = 0;
  const tokens: number[] = [];
  let m: RegExpExecArray | null;
  while ((m = TIME_TOKEN.exec(text)) !== null) {
    let hours = Number(m[1]);
    const minutes = m[2] !== undefined ? Number(m[2]) : 0;
    const period = m[4] ? m[4].toLowerCase() : null;
    if (!Number.isFinite(hours) || !Number.isFinite(minutes)) continue;
    if (minutes > 59) continue;
    if (period === 'pm' && hours < 12) hours += 12;
    else if (period === 'am' && hours === 12) hours = 0;
    if (hours > 23) continue;
    tokens.push(hours * 60 + minutes);
    if (tokens.length === 2) break;
  }

  return tokens.length >= 2 ? tokens[1] : null;
}

/**
 * Normalise a free-text time into 'HH:MM' for storage.
 *
 * Returns null when nothing is parseable, so a caller can leave the
 * column null rather than writing a range into it.
 */
export function normaliseTimeToHHMM(value: string | null | undefined): string | null {
  const minutes = parseTimeToMinutes(value);
  if (minutes === null) return null;
  const h = Math.floor(minutes / 60);
  const mm = minutes % 60;
  return `${String(h).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
}

/**
 * Split a free-text time value into a start and an end.
 *
 * This is what the INGESTION path must use, so a range never lands in a
 * single column.
 */
export function splitTimeRange(value: string | null | undefined): {
  start: string | null;
  end: string | null;
} {
  const start = normaliseTimeToHHMM(value);
  const endMinutes = parseEndTimeToMinutes(value);
  const end =
    endMinutes === null
      ? null
      : `${String(Math.floor(endMinutes / 60)).padStart(2, '0')}:${String(endMinutes % 60).padStart(2, '0')}`;
  return { start, end };
}

/**
 * Is this value a plain 'HH:MM' or 'HH:MM:SS'?
 *
 * The strict test, used to decide whether a value needs normalising
 * before it is written to a `time` column.
 */
export function isStrictTime(value: string | null | undefined): boolean {
  if (value === null || value === undefined) return false;
  return /^\d{1,2}:\d{2}(:\d{2})?$/.test(String(value).trim());
}
