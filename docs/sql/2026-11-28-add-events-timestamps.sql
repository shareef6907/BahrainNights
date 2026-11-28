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
-- 2. The backfill
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
    -- Normalised source values.
    COALESCE(NULLIF(e.start_date::text, ''), NULLIF(e.date::text, ''))::date  AS start_d,
    NULLIF(e.end_date::text, '')::date                                          AS end_d,
    NULLIF(e.start_time::text, '')::time                                         AS start_t,
    NULLIF(e.end_time::text, '')::time                                           AS end_t,
    COALESCE(NULLIF(e.start_time::text, ''), NULLIF(e.time::text, ''))::time     AS eff_start_t,
    lower(COALESCE(e.category, ''))                                              AS cat,
    -- RULE 1: overnight detection. This drives WHICH end formula is used.
    (
      e.start_date IS NOT NULL
      AND e.end_date IS NOT NULL
      AND e.end_date::date = e.start_date::date + 1
      AND COALESCE(NULLIF(e.start_time::text, ''), NULLIF(e.time::text, ''))::time >= TIME '18:00'
      AND (
        NULLIF(e.end_time::text, '')::time IS NULL
        OR NULLIF(e.end_time::text, '')::time <= TIME '06:00'
      )
    ) AS rule1_overnight,
    -- RULE 2 can also be an overnight event: an explicit end time in the
    -- small hours with an evening start, on a longer span.
    (
      e.start_date IS NOT NULL AND e.end_date IS NOT NULL
      AND NULLIF(e.end_time::text, '')::time IS NOT NULL
      AND NULLIF(e.end_time::text, '')::time <= TIME '06:00'
      AND COALESCE(NULLIF(e.start_time::text, ''), NULLIF(e.time::text, ''))::time >= TIME '18:00'
    ) AS rule2_overnight,
    (e.end_date::date - e.start_date::date)                                     AS span_days
  FROM events e
  WHERE COALESCE(NULLIF(e.start_date::text, ''), NULLIF(e.date::text, '')) IS NOT NULL
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
      WHEN r.end_d IS NOT NULL AND r.end_t IS NOT NULL THEN
        (r.end_d::timestamp + r.end_t) AT TIME ZONE 'Asia/Bahrain'
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
-- 3. FAIL CLOSED
-- ---------------------------------------------------------------------------
-- A row with a NULL end_at is EXPIRED and is never displayed. The NOT NULL
-- constraint makes it impossible for a null to reach the listing.
--
-- FIRST: any row the backfill could not resolve is given the most
-- conservative end there is - the end of its own day. That is still a
-- real instant, and it is in the past for anything that has already run.
UPDATE events
SET end_at = COALESCE(end_at, (start_date::timestamp + TIME '23:59:59') AT TIME ZONE 'Asia/Bahrain')
WHERE end_at IS NULL
  AND start_date IS NOT NULL;

-- Any row with no date at all cannot be resolved and is expired. It gets a
-- sentinel in the past.
UPDATE events
SET end_at = TIMESTAMPTZ '2000-01-01 00:00:00+00'
WHERE end_at IS NULL;

ALTER TABLE events ALTER COLUMN end_at SET NOT NULL;

-- ---------------------------------------------------------------------------
-- 4. THE INDEX
-- ---------------------------------------------------------------------------
-- The listing filter is end_at > now(), and the ordering is by end_at.
CREATE INDEX IF NOT EXISTS idx_events_end_at ON events (end_at);
CREATE INDEX IF NOT EXISTS idx_events_starts_at ON events (starts_at);
-- A partial index for the published listing: only published, visible rows.
CREATE INDEX IF NOT EXISTS idx_events_published_end_at
  ON events (end_at)
  WHERE status = 'published' AND is_hidden = false;

-- ---------------------------------------------------------------------------
-- 5. EXPLAIN ANALYZE - the index must be used
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
-- 6. VERIFY
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

-- The rule breakdown, so the counts can be compared against
-- scripts/audit/a1_classify.ts.
SELECT
  count(*) FILTER (WHERE rule1_overnight)                            AS rule1_overnight,
  count(*) FILTER (WHERE NOT rule1_overnight AND rule2_overnight)     AS rule2_overnight,
  count(*) FILTER (WHERE NOT rule1_overnight AND NOT rule2_overnight
                     AND end_t IS NOT NULL)                           AS rule3_or_2_explicit,
  count(*) FILTER (WHERE is_overnight)                               AS is_overnight_total,
  count(*)                                                            AS total
FROM resolved;
