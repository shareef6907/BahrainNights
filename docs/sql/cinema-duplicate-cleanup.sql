-- =============================================================================
-- CINEMA DUPLICATE CLEANUP  —  PREPARED FOR SHAREEF, NOT EXECUTED
-- =============================================================================
--
-- Written by Nova on 2026-11-19 during the autonomous cinema-pipeline recovery.
-- THIS FILE HAS NOT BEEN RUN against the `movies` table. Every MUTATING
-- statement below is commented out. The preview SELECTs in SECTION 1 were
-- executed read-only against production on 2026-11-19 to validate the syntax
-- and the numbers — a SELECT cannot change anything.
--
-- PREVIEW OUTPUT (verified read-only on 2026-11-19):
--
--   total_rows        904
--   distinct_films    841
--   duplicate_groups   61
--   redundant_rows     63
--
-- The three collisions named in the brief, with the row this script KEEPS:
--
--   senseandsensibility  KEEP  tmdb=1503762  2026-09-23  rating 7.2
--                         ARCHIVE tmdb=4584   1995-12-13  rating 7.4   <- the 1995 film
--                         ARCHIVE tmdb=NULL   no date                 <- posterless
--   thecatinthehat       KEEP  tmdb=1117898  2026-10-31  rating 7.0
--                         ARCHIVE tmdb=10588   2003-11-21  rating 5.3   <- the 2003 film
--   heartofthebeast      KEEP  tmdb=1263337  2026-09-19  rating 7.3
--                         ARCHIVE tmdb=857447  2017-08-01  rating NULL
--                         ARCHIVE tmdb=NULL   no date                 <- posterless
--
-- The 1995 "Sense and Sensibility" (7.4) and the 2003 "The Cat in the Hat"
-- (5.3) are the rows the page used to show, because the old dedupe kept the
-- HIGHEST RATED row. The rule below keeps the film that is actually on
-- screen instead.
--
-- WHY
-- ---
-- The `movies` table holds 904 rows for 841 distinct films:
--     61 duplicate title groups, 63 redundant rows.
-- The page's dedupe already hides the damage (it shows one card per film),
-- but the rows are still there, they still count towards the sitemap and the
-- API, and they still confuse the sync. This is HYGIENE, not a fix — the
-- correctness fix (PR "fix/cinema-pipeline-correctness") is separate.
--
-- WHY ARCHIVE RATHER THAN DELETE
-- ------------------------------
-- The `movies` table has no `deleted_at` / `archived` / `status` column. It
-- DOES have `is_now_showing` and `is_coming_soon`, and deactivating a row
-- with those is exactly what the cinema sync's own Step 6 cleanup does for a
-- film that stops screening, and what PR #44's repair script did for the
-- duplicates it found. Deactivating takes a row off /cinema without
-- destroying any of the metadata, so it is reversible:
--
--     UPDATE movies SET is_now_showing = true, is_coming_soon = false
--      WHERE id = '<the id you archived>';
--
-- A hard DELETE is offered at the very end, commented out, for use only after
-- the archive has been reviewed and a backup has been taken.
--
-- WHICH ROW IS KEPT
-- -----------------
-- The keeper is chosen with EXACTLY the rule the /cinema page now uses, so
-- archiving the other rows does not change what visitors see:
--
--   1. the row whose release_date is CLOSEST TO NOW — that is the film the
--      cinema is actually screening (this is what keeps the 2026 "Sense and
--      Sensibility" over the 1995 one);
--   2. then the row that has a usable poster;
--   3. then the better rated row;
--   4. then the lowest id, so the result is deterministic.
--
-- A row with no release_date is treated as the furthest possible answer and
-- is only ever kept when the whole group has no date at all.
--
-- HOW TO RUN IT
-- -------------
--   psql "$DATABASE_URL" -f docs/sql/cinema-duplicate-cleanup.sql
--
-- Run the PREVIEW section first and read every line of it before running the
-- ARCHIVE section.
-- =============================================================================


-- =============================================================================
-- SECTION 1 — PREVIEW. Safe to run: SELECT only, changes nothing.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1a. The headline numbers.
-- -----------------------------------------------------------------------------
WITH normalized AS (
    SELECT
        m.id,
        m.title,
        m.slug,
        m.tmdb_id,
        m.poster_url,
        m.release_date,
        m.tmdb_rating,
        m.is_now_showing,
        m.is_coming_soon,
        -- Fold diacritics, then strip everything that is not a letter or a
        -- digit, so "Les Misérables" and "Les Miserables" are one film.
        -- translate() in Postgres requires the two strings to be the SAME
        -- LENGTH, which is why this is an explicit character list rather
        -- than a range.
        regexp_replace(
            translate(
                lower(m.title),
                '²Üáçéíîúüāıöñßåøàâäãèêëēėęìïīįòôõōőùûūůűćčźżšžýÿăąųřťďěğşœ€£',
                '2Uaceiiuuaionsaoaaaaeeeeeeiiiiooooouuuuucczzszyyaaurtdegsoel'
            ),
            '[^a-z0-9]', '', 'g'
        ) AS title_key
    FROM movies m
),
grouped AS (
    SELECT
        title_key,
        count(*) AS n
    FROM normalized
    GROUP BY title_key
)
SELECT
    (SELECT count(*) FROM movies)                            AS total_rows,
    (SELECT count(DISTINCT title_key) FROM normalized)       AS distinct_films,
    (SELECT count(*) FROM grouped WHERE n > 1)               AS duplicate_groups,
    (SELECT coalesce(sum(n - 1), 0) FROM grouped WHERE n > 1) AS redundant_rows;


-- -----------------------------------------------------------------------------
-- 1b. EVERY row in every duplicate group, with the decision for it.
--
--     keep_rank = 1  ->  this row stays
--     keep_rank > 1  ->  this row would be archived
--
--     Read this in full before running section 2.
-- -----------------------------------------------------------------------------
WITH normalized AS (
    SELECT
        m.id,
        m.title,
        m.slug,
        m.tmdb_id,
        m.poster_url,
        m.release_date,
        m.tmdb_rating,
        m.is_now_showing,
        m.is_coming_soon,
        m.scraped_from,
        regexp_replace(
            translate(
                lower(m.title),
                '²Üáçéíîúüāıöñßåøàâäãèêëēėęìïīįòôõōőùûūůűćčźżšžýÿăąųřťďěğşœ€£',
                '2Uaceiiuuaionsaoaaaaeeeeeeiiiiooooouuuuucczzszyyaaurtdegsoel'
            ),
            '[^a-z0-9]', '', 'g'
        ) AS title_key
    FROM movies m
),
ranked AS (
    SELECT
        n.*,
        row_number() OVER (
            PARTITION BY n.title_key
            ORDER BY
                -- 1. the release date closest to now wins; a row with no date
                --    is the furthest possible answer and sorts last.
                (n.release_date IS NULL) ASC,
                abs(n.release_date - current_date) ASC,
                -- 2. then the row we can actually show.
                (n.poster_url IS NULL
                 OR n.poster_url = ''
                 OR n.poster_url IN ('null', 'undefined')
                 OR n.poster_url LIKE '%placeholder%') ASC,
                -- 3. then the better rated one.
                coalesce(n.tmdb_rating, -1) DESC,
                -- 4. then a stable tiebreak.
                n.id ASC
        ) AS keep_rank
    FROM normalized n
)
SELECT
    r.title_key,
    r.keep_rank,
    CASE WHEN r.keep_rank = 1 THEN 'KEEP' ELSE 'ARCHIVE' END AS decision,
    r.id,
    r.title,
    r.slug,
    r.tmdb_id,
    r.release_date,
    r.tmdb_rating,
    (r.poster_url IS NULL
     OR r.poster_url = ''
     OR r.poster_url IN ('null', 'undefined')
     OR r.poster_url LIKE '%placeholder%') AS posterless,
    r.is_now_showing,
    r.is_coming_soon,
    r.scraped_from
FROM ranked r
WHERE r.title_key IN (
    SELECT title_key FROM normalized GROUP BY title_key HAVING count(*) > 1
)
ORDER BY r.title_key, r.keep_rank;


-- -----------------------------------------------------------------------------
-- 1c. A one-line summary per duplicate group — the quickest sanity check.
--
--     "Sense and Sensibility" should show 3 rows, KEEP = the 2026 one
--     (tmdb_id 1503762, release_date 2026-...), ARCHIVE = the 1995 one
--     (tmdb_id 4584) and the row with no TMDB id.
-- -----------------------------------------------------------------------------
WITH normalized AS (
    SELECT
        m.id, m.title, m.tmdb_id, m.poster_url, m.release_date, m.tmdb_rating,
        regexp_replace(
            translate(
                lower(m.title),
                '²Üáçéíîúüāıöñßåøàâäãèêëēėęìïīįòôõōőùûūůűćčźżšžýÿăąųřťďěğşœ€£',
                '2Uaceiiuuaionsaoaaaaeeeeeeiiiiooooouuuuucczzszyyaaurtdegsoel'
            ),
            '[^a-z0-9]', '', 'g'
        ) AS title_key
    FROM movies m
),
ranked AS (
    SELECT n.*, row_number() OVER (
        PARTITION BY n.title_key
        ORDER BY (n.release_date IS NULL) ASC,
                 abs(n.release_date - current_date) ASC,
                 (n.poster_url IS NULL OR n.poster_url = '' OR n.poster_url IN ('null','undefined') OR n.poster_url LIKE '%placeholder%') ASC,
                 coalesce(n.tmdb_rating, -1) DESC,
                 n.id ASC
    ) AS keep_rank
    FROM normalized n
)
SELECT
    title_key,
    count(*) AS rows_in_group,
    sum(CASE WHEN keep_rank = 1 THEN 1 ELSE 0 END) AS kept,
    sum(CASE WHEN keep_rank > 1 THEN 1 ELSE 0 END) AS to_archive,
    string_agg(
        (CASE WHEN keep_rank = 1 THEN 'KEEP: ' ELSE 'archive: ' END)
        || title
        || ' (tmdb ' || coalesce(tmdb_id::text, 'none')
        || ', ' || coalesce(release_date::text, 'no date')
        || ', rating ' || coalesce(tmdb_rating::text, 'none') || ')',
        ' | ' ORDER BY keep_rank
    ) AS detail
FROM ranked
GROUP BY title_key
HAVING count(*) > 1
ORDER BY count(*) DESC, title_key;


-- =============================================================================
-- SECTION 2 — ARCHIVE (soft-delete). NOT RUN. Run only after reading section 1.
-- =============================================================================
--
-- This sets is_now_showing = false and is_coming_soon = false on the rows
-- that lose their group's keeper. Nothing is deleted: the rows, their
-- metadata and their trailers all stay in the table, they simply stop being
-- published on /cinema. It is reversible.
--
-- Before running it, take a backup:
--     pg_dump --data-only --table=movies "$DATABASE_URL" > movies-backup.sql
--
-- Expect:  63 rows updated.
--
-- UPDATE movies m
-- SET is_now_showing = false,
--     is_coming_soon = false,
--     updated_at = now()
-- WHERE m.id IN (
--     WITH normalized AS (
--         SELECT
--             m.id,
--             m.poster_url,
--             m.release_date,
--             m.tmdb_rating,
--             regexp_replace(
--                 translate(
--                     lower(m.title),
--                     '²Üáçéíîúüāıöñßåøàâäãèêëēėęìïīįòôõōőùûūůűćčźżšžýÿăąųřťďěğşœ€£',
--                     '2Uaceiiuuaionsaoaaaaeeeeeeiiiiooooouuuuucczzszyyaaurtdegsoel'
--                 ),
--                 '[^a-z0-9]', '', 'g'
--             ) AS title_key
--         FROM movies m
--     ),
--     ranked AS (
--         SELECT n.id, row_number() OVER (
--             PARTITION BY n.title_key
--             ORDER BY (n.release_date IS NULL) ASC,
--                      abs(n.release_date - current_date) ASC,
--                      (n.poster_url IS NULL OR n.poster_url = '' OR n.poster_url IN ('null','undefined') OR n.poster_url LIKE '%placeholder%') ASC,
--                      coalesce(n.tmdb_rating, -1) DESC,
--                      n.id ASC
--         ) AS keep_rank
--         FROM normalized n
--     )
--     SELECT id FROM ranked WHERE keep_rank > 1
-- );


-- =============================================================================
-- SECTION 3 — VERIFY. Safe to run: SELECT only.
-- =============================================================================

-- 3a. The duplicate groups should now be gone.
-- WITH normalized AS (
--     SELECT m.id, regexp_replace(
--         translate(lower(m.title),
--             '²Üáçéíîúüāıöñßåøàâäãèêëēėęìïīįòôõōőùûūůűćčźżšžýÿăąųřťďěğşœ€£',
--             '2Uaceiiuuaionsaoaaaaeeeeeeiiiiooooouuuuucczzszyyaaurtdegsoel'),
--         '[^a-z0-9]', '', 'g') AS title_key
--     FROM movies m
-- )
-- SELECT title_key, count(*) FROM normalized
-- GROUP BY title_key HAVING count(*) > 1;

-- 3b. How many films are now published on /cinema.
-- SELECT count(*) FILTER (WHERE is_now_showing)    AS now_showing,
--        count(*) FILTER (WHERE is_coming_soon)    AS coming_soon,
--        count(*)                                   AS total_rows
-- FROM movies;


-- =============================================================================
-- SECTION 4 — OPTIONAL HARD DELETE. NOT RUN. Use only after the archive has
-- been reviewed AND a backup has been taken.
-- =============================================================================
--
-- This permanently removes the archived rows. It is NOT reversible except
-- from the backup. Only run it once the archive has been live for long
-- enough to be confident (a week is sensible), and only for rows that have
-- been archived for that whole period.
--
-- DELETE FROM movies
-- WHERE id IN (
--     WITH normalized AS (
--         SELECT m.id, m.poster_url, m.release_date, m.tmdb_rating,
--             regexp_replace(
--                 translate(lower(m.title),
--                     '²Üáçéíîúüāıöñßåøàâäãèêëēėęìïīįòôõōőùûūůűćčźżšžýÿăąųřťďěğşœ€£',
--                     '2Uaceiiuuaionsaoaaaaeeeeeeiiiiooooouuuuucczzszyyaaurtdegsoel'),
--                 '[^a-z0-9]', '', 'g') AS title_key
--         FROM movies m
--     ),
--     ranked AS (
--         SELECT n.id, row_number() OVER (
--             PARTITION BY n.title_key
--             ORDER BY (n.release_date IS NULL) ASC,
--                      abs(n.release_date - current_date) ASC,
--                      (n.poster_url IS NULL OR n.poster_url = '' OR n.poster_url IN ('null','undefined') OR n.poster_url LIKE '%placeholder%') ASC,
--                      coalesce(n.tmdb_rating, -1) DESC,
--                      n.id ASC
--         ) AS keep_rank
--         FROM normalized n
--     )
--     SELECT id FROM ranked WHERE keep_rank > 1
-- );
