-- ============================================================================
-- movies.booking_urls — per-film booking URLs, keyed by cinema
-- ============================================================================
--
-- STATUS: **NOT EXECUTED.** This file is for Shareef to run by hand.
-- Nothing in this repository runs it. The application tolerates the column
-- being absent (see src/lib/cinema/booking-urls.ts), so the site keeps
-- working either way — the only difference is whether per-film "Book"
-- buttons appear.
--
-- WHY A NEW COLUMN
-- ----------------
-- The "Book" button used to link to the cinema's HOMEPAGE
-- (`https://bhr.voxcinemas.com/`) or to a search URL that 404s
-- (`https://bhr.voxcinemas.com/movies?search=<title>`). Neither is a
-- per-film booking link.
--
-- The authoritative per-film paths are published by the cinemas themselves:
--
--   VOX    — https://bhr.voxcinemas.com/movies/<slug>
--   Cineco — https://bahrain.cineco.net/amy_movie/<slug>/
--
-- The cinema sync captures those slugs from the cinemas' own listing pages
-- and stores them here, per film, per cinema.
--
-- SHAPE
-- -----
--   jsonb, keyed by cinema id:
--
--     { "vox": "https://bhr.voxcinemas.com/movies/i-play-rocky",
--       "cineco": "https://bahrain.cineco.net/amy_movie/i-play-rocky/" }
--
-- Only URLs that the sync has VERIFIED answer HTTP 200 are written, so a
-- Book button built from this column can never point at a 404.
--
-- RUN IT LIKE THIS (one-off, then re-run the cinema sync):
--
--   psql "$SUPABASE_DB_URL" -f docs/sql/2026-11-20-add-movies-booking-urls.sql
--
-- ============================================================================

begin;

alter table movies
  add column if not exists booking_urls jsonb;

comment on column movies.booking_urls is
  'Per-film booking URLs keyed by cinema id (vox, cineco, cinepolis, mukta). '
  'Only URLs verified to answer HTTP 200 are stored. Empty/absent means no Book button.';

-- A GIN index is not needed: the column is read by movie id, never queried
-- by URL. Keep the index set minimal.

commit;

-- ----------------------------------------------------------------------------
-- VERIFY (read-only)
-- ----------------------------------------------------------------------------
-- select id, title, booking_urls from movies
--  where booking_urls is not null and booking_urls <> '{}'::jsonb
--  order by updated_at desc
--  limit 20;
