/**
 * EVENT END TIMESTAMPS.
 *
 * Every event has a real start and end INSTANT, not a pair of dates.
 *
 * WHY
 * ---
 * An event that runs from 20:00 Friday to 03:00 Saturday is stored as
 * `start_date = Friday`, `end_date = Saturday`, because it crosses
 * midnight. A date-granular filter - `end_date >= today` - therefore keeps
 * it until 23:59 on Saturday, long after the party finished. At 08:46 on
 * Saturday the page still showed it.
 *
 * A DATE CANNOT EXPRESS "ENDED AT 03:00". Only a timestamp can. So every
 * event carries `starts_at` and `end_at` as timestamptz, and the listing
 * filter is `end_at > now()`.
 *
 * THE RESOLUTION ORDER
 * --------------------
 * 1. OVERNIGHT DETECTION - the event starts in the evening and ends in the
 *    small hours of the next day. It is a SINGLE-NIGHT event, not a
 *    multi-day one.
 * 2. An explicit end date and time.
 * 3. A genuine multi-day event (two days or more).
 * 4. A single-day event with a start time and no end time - the duration
 *    comes from the category.
 * 5. No start time at all - the event runs to the end of its day.
 *
 * RULE 1 COMES FIRST, DELIBERATELY. The stored `end_date` is the start
 * date plus one day for EVERY overnight event - that is what the ingestion
 * writes - so a row with an explicit end_date AND an end_time is not
 * "the source gave an explicit end", it is an overnight event whose
 * end_date was derived. Rule 2 must not swallow it.
 *
 * THE 03:00 CUT
 * --------------
 * The source's end_time is the venue's stated "doors close" time, and the
 * distribution across the overnight rows is bimodal:
 *
 *   00:00 - 02:59  ->  78 events   (the stated close time)
 *   03:00 - 05:59  ->  119 events  (a genuinely longer night)
 *
 * 03:00 is when Bahrain venues close, and it is the cutoff the site is
 * specified to use: "An event ending 03:00 disappears at 03:00:01".
 *
 * So an overnight event ends at max(the stated end_time, 03:00). A stated
 * end time EARLIER than 03:00 is rounded UP to the cut - which is what
 * "03:00 is when venues close" means - and a stated end time LATER than
 * 03:00 is honoured, because a party that finishes at 04:00 really does
 * finish at 04:00.
 */

/** Bahrain is UTC+3 all year. */
export const BAHRAIN_UTC_OFFSET_MINUTES = 180;

/** The hour Bahrain venues close. */
export const VENUE_CLOSE_MINUTE = 3 * 60;

/** The default duration by category, in minutes. */
export const CATEGORY_DURATION_MINUTES: Record<string, number> = {
  nightlife: 7 * 60, // to 03:00 the next day
  concerts: 5 * 60,
  music: 5 * 60,
  comedy: 5 * 60,
  dining: 5 * 60,
  food: 5 * 60,
  restaurant: 5 * 60,
  brunch: 5 * 60,
  sports: 3 * 60,
  fitness: 3 * 60,
};

export interface EventTimeInput {
  /** 'YYYY-MM-DD' */
  start_date?: string | null;
  /** 'YYYY-MM-DD' */
  end_date?: string | null;
  /** 'HH:MM' or 'HH:MM:SS' */
  start_time?: string | null;
  /** 'HH:MM' or 'HH:MM:SS' */
  end_time?: string | null;
  /** the legacy `time` column, used when start_time is absent */
  time?: string | null;
  category?: string | null;
}

export interface ResolvedEventTimes {
  /** ISO 8601 with a Z - a UTC instant. Null when the row cannot be resolved. */
  starts_at: string | null;
  /** ISO 8601 with a Z - a UTC instant. NULL MEANS EXPIRED. */
  end_at: string | null;
  /** True when the event starts in the evening and ends in the small hours. */
  is_overnight: boolean;
  /** Which rule produced the answer: 1-5. */
  rule: 1 | 2 | 3 | 4 | 5;
  /** Set when the source data was bad and the value had to be clamped. */
  clamped: boolean;
  /** A human-readable note, for the log. */
  note?: string;
}

/** Minutes since midnight, or null. */
export function parseTimeToMinutes(value: string | null | undefined): number | null {
  if (!value) return null;
  const m = String(value).match(/(\d{1,2}):(\d{2})/);
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h > 23 || min > 59) return null;
  return h * 60 + min;
}

/** Whole days from a to b, both 'YYYY-MM-DD'. */
export function daysBetween(a: string, b: string): number {
  return Math.round(
    (Date.parse(b.slice(0, 10) + 'T00:00:00Z') - Date.parse(a.slice(0, 10) + 'T00:00:00Z')) / 86400000
  );
}

/** 'YYYY-MM-DD' for the day after the given one. */
export function nextDay(date: string): string {
  return new Date(Date.parse(date.slice(0, 10) + 'T00:00:00Z') + 86400000).toISOString().slice(0, 10);
}

/**
 * A Bahrain-local instant, as a UTC ISO string.
 *
 * Bahrain is UTC+3 with no daylight saving, so the conversion is a fixed
 * offset.
 */
export function bahrainInstant(date: string, minutesOfDay: number): string {
  const y = Number(date.slice(0, 4));
  const m = Number(date.slice(5, 7));
  const d = Number(date.slice(8, 10));
  const hh = Math.floor(minutesOfDay / 60);
  const mm = minutesOfDay % 60;
  const utc = Date.UTC(y, m - 1, d, hh, mm) - BAHRAIN_UTC_OFFSET_MINUTES * 60000;
  return new Date(utc).toISOString();
}

/** The category's default duration in minutes, or null for "end of day". */
export function defaultDurationMinutes(category: string | null | undefined): number | null {
  const c = String(category || '').toLowerCase();
  return CATEGORY_DURATION_MINUTES[c] ?? null;
}

/**
 * Resolve an event's start and end instants.
 *
 * The order is RULE 1 (overnight), RULE 2 (explicit end), RULE 3
 * (multi-day), RULE 4 (single-day with a start time), RULE 5 (no start
 * time).
 */
export function resolveEventTimes(input: EventTimeInput): ResolvedEventTimes {
  const startDate = String(input.start_date || '').slice(0, 10);
  const endDate = String(input.end_date || '').slice(0, 10);
  const startMin = parseTimeToMinutes(input.start_time ?? input.time);
  const endMin = parseTimeToMinutes(input.end_time);

  if (!startDate) {
    return {
      starts_at: null,
      end_at: null,
      is_overnight: false,
      rule: 5,
      clamped: false,
      note: 'no start date',
    };
  }

  // RULE 1: OVERNIGHT DETECTION.
  //   end_date = start_date + 1 day
  //   start_time >= 18:00
  //   end_time is null OR end_time <= 06:00
  if (
    endDate &&
    daysBetween(startDate, endDate) === 1 &&
    startMin !== null &&
    startMin >= 18 * 60 &&
    (endMin === null || endMin <= 6 * 60)
  ) {
    const starts_at = bahrainInstant(startDate, startMin);
    const endMinutes = endMin === null ? VENUE_CLOSE_MINUTE : Math.max(endMin, VENUE_CLOSE_MINUTE);
    return {
      starts_at,
      end_at: bahrainInstant(endDate, endMinutes),
      is_overnight: true,
      rule: 1,
      clamped: false,
    };
  }

  // RULE 2: an explicit end date and time.
  if (endDate && endMin !== null) {
    const starts_at = startMin === null ? bahrainInstant(startDate, 0) : bahrainInstant(startDate, startMin);
    let end_at: string;
    let is_overnight = false;
    if (endDate === startDate) {
      end_at = bahrainInstant(endDate, endMin);
      if (startMin !== null && endMin < startMin) {
        // The end time is earlier than the start on the SAME date, so it
        // ran past midnight and the end_date was written as the start date.
        end_at = bahrainInstant(nextDay(startDate), endMin);
        is_overnight = true;
      }
    } else {
      end_at = bahrainInstant(endDate, endMin);
      is_overnight = endMin <= 6 * 60 && startMin !== null && startMin >= 18 * 60;
    }
    return { starts_at, end_at, is_overnight, rule: 2, clamped: false };
  }

  // RULE 3: a genuine multi-day event.
  if (endDate && daysBetween(startDate, endDate) >= 2) {
    const starts_at = startMin === null ? bahrainInstant(startDate, 0) : bahrainInstant(startDate, startMin);
    return {
      starts_at,
      end_at: bahrainInstant(endDate, 23 * 60 + 59),
      is_overnight: false,
      rule: 3,
      clamped: false,
    };
  }

  // RULE 4: a single-day event with a start time and no end time.
  if (startMin !== null) {
    const duration = defaultDurationMinutes(input.category);
    const starts_at = bahrainInstant(startDate, startMin);
    if (duration === null) {
      return {
        starts_at,
        end_at: bahrainInstant(startDate, 23 * 60 + 59),
        is_overnight: false,
        rule: 4,
        clamped: false,
      };
    }
    let end_at = bahrainInstant(nextDay(startDate), startMin + duration - 24 * 60);
    let clamped = false;
    if (Date.parse(end_at) <= Date.parse(starts_at)) {
      end_at = bahrainInstant(nextDay(startDate), startMin + 60 - 24 * 60);
      clamped = true;
    }
    return {
      starts_at,
      end_at,
      is_overnight: duration === 7 * 60,
      rule: 4,
      clamped,
      note: clamped ? 'end_at clamped to starts_at + 1h (bad source data)' : undefined,
    };
  }

  // RULE 5: no start time at all.
  const target = endDate || startDate;
  return {
    starts_at: bahrainInstant(startDate, 0),
    end_at: bahrainInstant(target, 23 * 60 + 59),
    is_overnight: false,
    rule: 5,
    clamped: false,
  };
}
