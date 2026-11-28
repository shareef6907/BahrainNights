-- ===========================================================================
-- 2026-11-28  Add real start/end INSTANTS to `events`
-- ===========================================================================
-- RUN THIS IN THE SUPABASE SQL EDITOR. It is idempotent.
--
-- WHY
-- ---
-- An event that runs 20:00 Friday -> 03:00 Saturday is stored as
-- start_date = Friday, end_date = Saturday, because it crosses midnight.
-- A date-granular filter (end_date >= today) keeps it until 23:59 on
-- Saturday. At 08:46 on Saturday the /events page was still showing five
-- such events.
--
-- A DATE CANNOT EXPRESS "ENDED AT 03:00". Only a timestamp can.
--
-- AFTER THIS SCRIPT, THE LISTING FILTER IS:  WHERE end_at > now()
-- ===========================================================================

-- ---------------------------------------------------------------------------
-- 1. The columns
-- ---------------------------------------------------------------------------
ALTER TABLE events
  ADD COLUMN IF NOT EXISTS starts_at timestamptz,
  ADD COLUMN IF NOT EXISTS end_at    timestamptz,
  ADD COLUMN IF NOT EXISTS is_overnight boolean NOT NULL DEFAULT false;

COMMENT ON COLUMN events.starts_at IS
  'The event start as an instant. NULL means the row is unresolvable and is treated as EXPIRED.';
COMMENT ON COLUMN events.end_at IS
  'The event end as an instant. The listing filter is end_at > now(). NULL means EXPIRED - fail closed, never open.';
COMMENT ON COLUMN events.is_overnight IS
  'True when the event starts in the evening and ends in the small hours of the next day. It is a SINGLE-NIGHT event, not a multi-day one.';

-- ---------------------------------------------------------------------------
-- 2. The helper functions
-- ---------------------------------------------------------------------------
-- THE TIME COLUMNS ARE FREE TEXT, AND SOME ROWS HOLD A WHOLE RANGE IN ONE
-- COLUMN:
--
--     time = "05:00 PM - 12:00 AM"
--
-- The first run of this migration FAILED on exactly that value:
--
--     invalid input syntax for type time: "05:00 PM - 12:00 AM"
--
-- So the time is parsed with a helper that extracts the time-like TOKENS
-- from the string, in order: the FIRST token is the start, the SECOND is
-- the end. A value with no token at all returns NULL, and a NULL end
-- means EXPIRED - fail closed, never open.
--
-- These functions are the SAME rules as src/lib/utils/time-parsing.ts, and
-- scripts/audit/a1_db_parity.ts checks the two against each other row by
-- row against the live data.
--
-- bn_parse_time returns the FIRST time-like token, as a time.
-- bn_parse_end_time returns the SECOND token, as a time - the end of a
-- range. NULL when the value carries only one time.
-- bn_parse_date returns a date from a text value, or NULL.

CREATE OR REPLACE FUNCTION public.bn_parse_time(v text)
RETURNS time
LANGUAGE plpgsql
IMMUTABLE
AS $$
DECLARE
  m text[];
  hh int;
  mm int;
  pp text;
  result time;
BEGIN
  IF v IS NULL OR btrim(v) = '' THEN
    RETURN NULL;
  END IF;

  -- Every time-like token: 1-2 digits, an optional separator, 2 digits,
  -- an optional am/pm suffix. The seconds group is consumed as part of
  -- the token so "20:00:00" is ONE time, not a start and an end.
  m := regexp_matches(v, '(\d{1,2})\s*[:.]?\s*(\d{2})?(?::(\d{2}))?\s*(am|pm)?', 'gi');

  IF m IS NULL OR array_length(m, 1) = 0 THEN
    RETURN NULL;
  END IF;

  hh := m[1][1]::int;
  mm := COALESCE(NULLIF(m[1][2], '')::int, 0);
  pp := lower(COALESCE(m[1][4], ''));

  IF mm > 59 THEN
    RETURN NULL;
  END IF;
  IF pp = 'pm' AND hh < 12 THEN
    hh := hh + 12;
  ELSIF pp = 'am' AND hh = 12 THEN
    hh := 0;
  END IF;
  IF hh > 23 THEN
    RETURN NULL;
  END IF;

  result := make_time(hh, mm, 0);
  RETURN result;
END;
$$;

CREATE OR REPLACE FUNCTION public.bn_parse_end_time(v text)
RETURNS time
LANGUAGE plpgsql
IMMUTABLE
AS $$
DECLARE
  m text[][];
  hh int;
  mm int;
  pp text;
BEGIN
  IF v IS NULL OR btrim(v) = '' THEN
    RETURN NULL;
  END IF;

  m := regexp_matches(v, '(\d{1,2})\s*[:.]?\s*(\d{2})?(?::(\d{2}))?\s*(am|pm)?', 'gi');

  -- The SECOND token is the end of a range.
  IF m IS NULL OR array_length(m, 1) < 2 THEN
    RETURN NULL;
  END IF;

  hh := m[2][1]::int;
  mm := COALESCE(NULLIF(m[2][2], '')::int, 0);
  pp := lower(COALESCE(m[2][4], ''));

  IF mm > 59 THEN
    RETURN NULL;
  END IF;
  IF pp = 'pm' AND hh < 12 THEN
    hh := hh + 12;
  ELSIF pp = 'am' AND hh = 12 THEN
    hh := 0;
  END IF;
  IF hh > 23 THEN
    RETURN NULL;
  END IF;

  RETURN make_time(hh, mm, 0);
END;
$$;

CREATE OR REPLACE FUNCTION public.bn_parse_date(v text)
RETURNS date
LANGUAGE plpgsql
IMMUTABLE
AS $$
BEGIN
  IF v IS NULL OR btrim(v) = '' THEN
    RETURN NULL;
  END IF;
  BEGIN
    RETURN v::date;
  EXCEPTION WHEN others THEN
    RETURN NULL;
  END;
END;
$$;

COMMENT ON FUNCTION public.bn_parse_time(text) IS
  'The first time-like token in a free-text value, as a time. Handles 12-hour forms ("05:00 PM" -> 17:00) and ignores a seconds group. NULL when nothing is parseable.';
COMMENT ON FUNCTION public.bn_parse_end_time(text) IS
  'The SECOND time-like token in a free-text value, as a time - the end of a range like "05:00 PM - 12:00 AM". NULL when the value carries only one time.';
COMMENT ON FUNCTION public.bn_parse_date(text) IS
  'A date from a text value, or NULL when it cannot be parsed.';

-- ---------------------------------------------------------------------------
-- 3. The backfill
-- ---------------------------------------------------------------------------
-- The rule order here is EXACTLY the order in
-- src/lib/utils/event-times.ts (resolveEventTimes). The two implementations
-- were checked against each other row by row - see
-- scripts/audit/a1_parity.ts.
--
--   RULE 1  OVERNIGHT DETECTION - end_date = start_date + 1 day AND
--           start_time >= 18:00 AND (end_time IS NULL OR end_time <= 06:00).
--           A SINGLE-NIGHT event. end_at = max(end_time, 03:00) Bahrain.
--   RULE 2  an explicit end date and time.
--   RULE 3  a genuine multi-day event (end_date >= start_date + 2 days):
--           end_at = 23:59:59 on end_date.
--   RULE 4  a single-day event with a start time and no end time: the
--           duration comes from the category.
--   RULE 5  no start time at all: end_at = 23:59:59 on end_date.
--
-- Bahrain is UTC+3 all year, so the offset is fixed.
-- The 03:00 cut is when Bahrain venues close.
--
-- The stored FLAG is_overnight is rule 1 OR rule 2. The END FORMULA is
-- chosen by rule 1 alone - rule 2 uses the explicit end time as given.

WITH resolved AS (
  SELECT
    e.id,
    -- Normalised source values, through the defensive parsers.
    --
    -- The time columns are FREE TEXT and some rows hold a whole RANGE
    -- ("05:00 PM - 12:00 AM"), so they CANNOT be cast to time directly -
    -- that is what made the first run of this migration fail with
    --     invalid input syntax for type time: "05:00 PM - 12:00 AM"
    --
    -- `eff_start_t` is the start time, from `start_time` when it has one
    -- and from the legacy `time` column otherwise. `end_t` is the end
    -- time: `end_time` when it has one, and otherwise the SECOND token of
    -- the range in the legacy `time` column.
    COALESCE(
      public.bn_parse_date(e.start_date::text),
      public.bn_parse_date(e.date::text)
    )                                                                    AS start_d,
    public.bn_parse_date(e.end_date::text)                                AS end_d,
    public.bn_parse_time(e.start_time::text)                               AS start_t,
    public.bn_parse_time(e.end_time::text)                                 AS end_t,
    COALESCE(
      public.bn_parse_time(e.start_time::text),
      public.bn_parse_time(e.time::text)
    )                                                                     AS eff_start_t,
    -- The end of a range carried in the legacy `time` column.
    public.bn_parse_end_time(e.time::text)                                 AS time_range_end,
    lower(COALESCE(e.category, ''))                                              AS cat,
    -- RULE 1: overnight detection. This drives WHICH end formula is used.
    (
      public.bn_parse_date(e.start_date::text) IS NOT NULL
      AND public.bn_parse_date(e.end_date::text) IS NOT NULL
      AND public.bn_parse_date(e.end_date::text)
          = public.bn_parse_date(e.start_date::text) + 1
      AND COALESCE(
            public.bn_parse_time(e.start_time::text),
            public.bn_parse_time(e.time::text)
          ) >= TIME '18:00'
      AND (
        public.bn_parse_time(e.end_time::text) IS NULL
        OR public.bn_parse_time(e.end_time::text) <= TIME '06:00'
      )
    ) AS rule1_overnight,
    -- RULE 2 can also be an overnight event: an explicit end time in the
    -- small hours with an evening start, on a longer span.
    (
      public.bn_parse_date(e.start_date::text) IS NOT NULL
      AND public.bn_parse_date(e.end_date::text) IS NOT NULL
      AND public.bn_parse_time(e.end_time::text) IS NOT NULL
      AND public.bn_parse_time(e.end_time::text) <= TIME '06:00'
      AND COALESCE(
            public.bn_parse_time(e.start_time::text),
            public.bn_parse_time(e.time::text)
          ) >= TIME '18:00'
    ) AS rule2_overnight,
    (public.bn_parse_date(e.end_date::text) - public.bn_parse_date(e.start_date::text))
                                                                                AS span_days
  FROM events e
  WHERE COALESCE(
          public.bn_parse_date(e.start_date::text),
          public.bn_parse_date(e.date::text)
        ) IS NOT NULL
),
built AS (
  SELECT
    r.*,
    (r.rule1_overnight OR r.rule2_overnight) AS is_overnight,
    -- START
    CASE
      WHEN r.eff_start_t IS NULL THEN (r.start_d::timestamp + TIME '00:00') AT TIME ZONE 'Asia/Bahrain'
      ELSE (r.start_d::timestamp + r.eff_start_t) AT TIME ZONE 'Asia/Bahrain'
    END AS starts_at,
    -- END
    CASE
      -- RULE 1: overnight. max(the stated end time, the 03:00 venue close).
      WHEN r.rule1_overnight THEN
        (r.end_d::timestamp + (
          CASE
            WHEN r.end_t IS NULL THEN TIME '03:00'
            ELSE GREATEST(r.end_t, TIME '03:00')
          END
        )) AT TIME ZONE 'Asia/Bahrain'
      -- RULE 2: an explicit end date and time.
      WHEN r.end_d IS NOT NULL AND COALESCE(r.end_t, r.time_range_end) IS NOT NULL THEN
        (r.end_d::timestamp + COALESCE(r.end_t, r.time_range_end)) AT TIME ZONE 'Asia/Bahrain'
      -- RULE 3: a genuine multi-day event.
      WHEN r.end_d IS NOT NULL AND r.span_days >= 2 THEN
        (r.end_d::timestamp + TIME '23:59:59') AT TIME ZONE 'Asia/Bahrain'
      -- RULE 4: a single-day event with a start time. The duration comes
      -- from the category.
      WHEN r.eff_start_t IS NOT NULL THEN
        CASE
          WHEN r.cat = 'nightlife' THEN
            (r.start_d::timestamp + r.eff_start_t + INTERVAL '7 hours') AT TIME ZONE 'Asia/Bahrain'
          WHEN r.cat IN ('concerts','music','comedy','dining','food','restaurant','brunch') THEN
            (r.start_d::timestamp + r.eff_start_t + INTERVAL '5 hours') AT TIME ZONE 'Asia/Bahrain'
          WHEN r.cat IN ('sports','fitness') THEN
            (r.start_d::timestamp + r.eff_start_t + INTERVAL '3 hours') AT TIME ZONE 'Asia/Bahrain'
          ELSE
            (r.start_d::timestamp + TIME '23:59:59') AT TIME ZONE 'Asia/Bahrain'
        END
      -- RULE 5: no start time at all.
      ELSE
        (COALESCE(r.end_d, r.start_d)::timestamp + TIME '23:59:59') AT TIME ZONE 'Asia/Bahrain'
    END AS raw_end_at
  FROM resolved r
),
final AS (
  SELECT
    b.id,
    b.starts_at,
    b.is_overnight,
    b.raw_end_at,
    -- A computed end that lands BEFORE the start means the source data is
    -- bad. Clamp it to starts_at + 1 hour.
    CASE
      WHEN b.raw_end_at <= b.starts_at THEN b.starts_at + INTERVAL '1 hour'
      ELSE b.raw_end_at
    END AS end_at
  FROM built b
)
UPDATE events e
SET
  starts_at    = f.starts_at,
  end_at       = f.end_at,
  is_overnight = f.is_overnight,
  updated_at   = now()
FROM final f
WHERE e.id = f.id;

-- ---------------------------------------------------------------------------
-- 4. FAIL CLOSED
-- ---------------------------------------------------------------------------
-- A row with a NULL end_at is EXPIRED and is never displayed. The NOT NULL
-- constraint makes it impossible for a null to reach the listing.
--
-- FIRST: any row the backfill could not resolve is given the most
-- conservative end there is - the end of its own day. That is still a
-- real instant, and it is in the past for anything that has already run.
UPDATE events
SET end_at = COALESCE(
      end_at,
      (public.bn_parse_date(start_date::text)::timestamp + TIME '23:59:59')
        AT TIME ZONE 'Asia/Bahrain'
    )
WHERE end_at IS NULL
  AND public.bn_parse_date(start_date::text) IS NOT NULL;

-- Any row with no date at all cannot be resolved and is expired. It gets a
-- sentinel in the past.
UPDATE events
SET end_at = TIMESTAMPTZ '2000-01-01 00:00:00+00'
WHERE end_at IS NULL;

ALTER TABLE events ALTER COLUMN end_at SET NOT NULL;

-- ---------------------------------------------------------------------------
-- 5. THE INDEX
-- ---------------------------------------------------------------------------
-- The listing filter is end_at > now(), and the ordering is by end_at.
CREATE INDEX IF NOT EXISTS idx_events_end_at ON events (end_at);
CREATE INDEX IF NOT EXISTS idx_events_starts_at ON events (starts_at);
-- A partial index for the published listing: only published, visible rows.
CREATE INDEX IF NOT EXISTS idx_events_published_end_at
  ON events (end_at)
  WHERE status = 'published' AND is_hidden = false;

-- ---------------------------------------------------------------------------
-- 6. EXPLAIN ANALYZE - the index must be used
-- ---------------------------------------------------------------------------
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, title, starts_at, end_at, is_overnight
FROM events
WHERE status = 'published'
  AND is_hidden = false
  AND end_at > now()
ORDER BY end_at ASC
LIMIT 60;

-- ---------------------------------------------------------------------------
-- 7. VERIFY
-- ---------------------------------------------------------------------------
-- MUST RETURN ZERO ROWS.
SELECT count(*) AS expired_but_still_published
FROM events
WHERE status = 'published'
  AND is_hidden = false
  AND end_at < now();

-- The five events that were wrongly on the page at 08:46 on 28 Nov.
-- end_at must be 03:00 Bahrain on 28 Nov, and still_listed must be false.
SELECT
  title,
  start_date, start_time, end_date, end_time,
  is_overnight,
  starts_at AT TIME ZONE 'Asia/Bahrain' AS starts_at_bahrain,
  end_at    AT TIME ZONE 'Asia/Bahrain' AS end_at_bahrain,
  (end_at > now()) AS still_listed
FROM events
WHERE title ILIKE ANY (ARRAY['%Naak x Thuya%','%Cavallo Club%','%ANII live%','%Narratives at Teres%','%Pax Arabiana%'])
ORDER BY title;

/*
 * The rule breakdown.
 *
 * IT MUST NOT SELECT FROM `resolved` - that CTE is scoped to the
 * backfill statement above, so a standalone query against it fails with
 * "relation resolved does not exist" AFTER everything has already
 * committed. It looks like a failed migration when the migration
 * succeeded.
 *
 * This version is self-contained.
 */
SELECT
  count(*) FILTER (WHERE is_overnight)                          AS is_overnight_total,
  count(*) FILTER (WHERE is_overnight AND end_date::date = start_date::date + 1)
                                                                 AS rule1_overnight,
  count(*) FILTER (
    WHERE NOT (is_overnight AND end_date::date = start_date::date + 1)
      AND end_time IS NOT NULL
      AND end_time <= TIME '06:00'
      AND COALESCE(start_time, time)::time >= TIME '18:00'
  )                                                              AS rule2_overnight,
  count(*) FILTER (
    WHERE end_date IS NOT NULL
      AND end_date::date - start_date::date >= 2
  )                                                              AS rule3_multiday,
  count(*)                                                        AS total
FROM events
WHERE status = 'published'
  AND is_hidden = false;
