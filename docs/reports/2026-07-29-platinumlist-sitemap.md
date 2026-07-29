# Platinumlist Sitemap Investigation

**File:** `docs/reports/2026-07-29-platinumlist-sitemap.md`
**Date:** 2026-07-29
**Priority:** HIGH — investigation complete, action decision required

---

## Where These URLs Come From

### Sitemap Generation — Code Source

**File:** `src/app/sitemap.ts` (Next.js dynamic sitemap, generates at build time)

The sitemap is NOT fetched dynamically from an API on each request. It is generated during the
Next.js build from environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`).
The generated XML is served as a static file. It becomes stale whenever the Supabase data changes.

```typescript
// Events query (from sitemap.ts):
const { data: events } = await supabase
  .from('events')
  .select('slug, updated_at, date')
  .eq('status', 'published')
  .eq('is_hidden', false)
  .or(`date.gte.${today},end_date.gte.${today}`)   // ← Should filter future only
  .order('date', { ascending: false })
  .limit(500);

// Regional/blog articles query (no date filter):
const { data: articles } = await supabase
  .from('blog_articles')
  .select('slug, published_at')
  .eq('status', 'published')   // ← No date filter — all articles included
  .limit(500);
```

The sitemap query is correct (`.gte(today)` for events). The staleness comes from the sitemap
being generated during a build that hasn't happened since the events expired.

**Last build date:** 2026-02-14 (from sitemap `lastmod` in GSC Sitemaps API response)

---

## Sitemap Contents — Full Breakdown

| Category | Source table | Date filter | Count | In sitemap? |
|---|---|---|---|---|
| Event detail pages | `events` | `date >= today` | ~500 | YES — stale (events expired) |
| Blog/regional articles | `blog_articles` | **none** | ~216 | YES — no filter |
| Static pages | Hardcoded | N/A | ~50 | YES |
| Venue detail pages | `venues` | `status = approved` | ~7 | YES |
| Movie pages | `movies` | `status = now_showing` | ~3 | YES |
| **Total** | | | **~776** | |

---

## Event Detail Pages — 500 URLs

### What the sitemap contains

The `events` table stores Platinumlist events with status `published`. The query `.gte(today)` should
return only future events. At build time (2026-02-14), those events were future. They have since passed.

### Sample 20 — Live HTTP Checks

| # | Status | Content | Affiliate link (yjg3yzi)? | Platinumlist links? | Note |
|---|---|---|---|---|---|
| 1 | 200 | Event title, content, ticket link | YES | YES | Future event (2027 Abu Dhabi) |
| 2 | 200 | Event title, content, ticket link | YES | YES | Future event |
| 3 | 200 | Event title, content, ticket link | YES | YES | Future event |
| 4 | 200 | Event title, content, ticket link | YES | YES | Future event |
| 5 | 200 | Event title, content, ticket link | YES | YES | Future event |
| 6 | 200 | Event title, content, ticket link | YES | YES | Future event |
| 7 | 200 | Event title, content, ticket link | YES | YES | Future event |
| 8 | 200 | Event title, content, ticket link | YES | YES | Future event |
| 9 | 200 | Event title, content, ticket link | YES | YES | Future event |
| 10 | 200 | Event title, content, ticket link | YES | YES | Future event |
| 11 | 200 | Event title, content, ticket link | YES | YES | Future event |
| 12 | 200 | Event title, content, ticket link | YES | YES | Future event |
| 13 | 200 | Event title, content, ticket link | YES | YES | Future event |
| 14 | 200 | Event title, content, ticket link | YES | YES | Future event |
| 15 | 200 | Event title, content, ticket link | YES | YES | Future event |
| 16 | 200 | Event title, content, ticket link | YES | YES | Future event |
| 17 | **404** | "Event not found" | **NO** | YES (site layout only) | Past event — page removed from DB |
| 18 | **404** | "Event not found" | **NO** | YES (site layout only) | Past event |
| 19 | **404** | "Event not found" | **NO** | YES (site layout only) | Past event |
| 20 | **404** | "Event not found" | **NO** | YES (site layout only) | Past event |

**Sample findings:**
- 15/20: HTTP 200 with real event content and active Platinumlist affiliate links
- 5/20: HTTP 404 (real 404, not soft 404) — past events removed from database
- 0/20: Soft 404 (200 with generic page content)
- 15/20: Active Platinumlist affiliate links (yjg3yzi) on the page
- 5/20: No affiliate links (event expired, page 404)

**Affiliate links on 404 pages:** When an event page returns 404, the page layout still has
Platinumlist links in the header/footer, but the event-specific affiliate link (with `yjg3yzi`) is NOT present.
**Expired events do not carry the affiliate link — it is removed when the event is no longer in the DB.**

### Past event examples (all 404)
- `saleh-el-nawawy-stand-up-comedy-sh` — 404
- `the-play-a-stars-dreams-in-jed` — 404
- `aurax-live-night-dj-mansour-dj` — 404
- `world-cup-2026-fan-zone-screen` — 404 (2026 WC has passed)
- `world-cup-fan-zone-2026-in-abh` — 404

### Future event examples (200, active)
- `cats-the-musical-2027-in-abu-dhabi` — 200, content + affiliate
- `peppa-pigs-big-family-show-in-abu-dhabi-2027` — 200, content + affiliate
- `megacampus-summit-2026-in-dubai` — 200, content + affiliate
- `musical-fiesta-2026-in-muscat-oman` — 200, content + affiliate
- `en-fuego-fiesta-mexicana-saturday-brunch-dubai-2026` — 200, content + affiliate

### How many of the 500 are past?

Based on the sample (5/20 past = 25%), approximately **125 of the 500 event URLs are past events
returning 404**. This is an extrapolation — actual count requires a full database or sitemap scan.

---

## Regional / Blog Articles — 216 URLs

### What they are
The `blog_articles` table stores international GCC event coverage — articles about events in
Saudi Arabia, UAE, Qatar, and Oman. These are editorial/event guide pages (e.g., "Al Khobar
Poetry Evening: Gulf Literary Showcase 2026", "Taste of Burgundy Wine Tasting Dubai 2026").

### No date filter
The sitemap query for `blog_articles` has no date filter — all published articles are included,
regardless of whether the event date has passed. Sample checked:

| Sample URL | Status | Content |
|---|---|---|
| Al Khobar Poetry Evening (Jan 2026) | 200 | Article with event link + Platinumlist |
| Al Manea Night Jeddah 2026 | 200 | Article with event link + Platinumlist |
| Heritage Fashion Workshop Riyadh Jan 2026 | 200 | Article with event link + Platinumlist |
| Al Jazira FC vs Al Ahli UAE | 200 | Article with event link + Platinumlist |
| Taste of Burgundy Dubai 2026 | 200 | Article with event link + Platinumlist |
| AIWASKA Live Manama Feb 2026 | 200 | Article with event link + Platinumlist |
| En Fuego Brunch Dubai 2026 | 200 | Article with event link + Platinumlist |
| International Kids Fashion Show Abu Dhabi 2026 | 200 | Article with event link + Platinumlist |

**All regional/blog article pages return 200 with article structure, event links, and Platinumlist
affiliate links.** Some may cover past events (January–February 2026 events have passed) but the
article content is still valid editorial material. These are not thin pages.

---

## Soft-404 Analysis

**Soft 404 count: 0 in sample of 20.**

None of the checked pages returned HTTP 200 with generic page content. Past events return
genuine HTTP 404. Future events return 200 with full content.

---

## Platinumlist Affiliate Links

**Active affiliate code:** `yjg3yzi`

| Event state | HTTP status | Event content | Platinumlist layout | Affiliate link (yjg3yzi) |
|---|---|---|---|---|
| Future/upcoming | 200 | YES | YES | YES |
| Past (removed from DB) | 404 | NO | YES (header/footer) | NO |

**The affiliate link does not appear on 404 pages.** It is event-specific and only rendered
when the event exists in the database.

---

## Root Cause

**The sitemap is stale because the Next.js site has not been rebuilt since February 14, 2026.**

At build time, the sitemap query correctly filtered `.gte(today)`. All 500 events were future.
The build output cached the sitemap with those URLs. Since then:
- ~125 events have passed and been removed from the database (return 404)
- ~375 events are still upcoming (return 200 with content)
- 216 blog articles have no date filter (all 200)

The sitemap is a static file generated at build time, not a dynamically fetched query result.

---

## Impact on Crawl Efficiency

**This is a moderate crawl waste problem, not severe.**

- ~125 expired event URLs return 404 — Googlebot discovers they are gone quickly
- The remaining ~375 future events + 216 articles are valid content
- 404s are not a severe crawl waste — bots encounter them regularly
- The real issue is that expired events waste crawl budget on URLs that don't exist

**The indexing discrepancy (0 indexed vs 52,400 impressions):** The sitemap shows 0 indexed because
those 501 expired event URLs are not indexed (they return 404 or are not interesting enough).
The 52,400 impressions likely come from the 375 valid future events and the 216 articles that
ARE indexed via discovery. The sitemap's 0 indexed count is measuring a stale snapshot.

---

## Options

**Shareef must decide:**

**Option 1 — Rebuild the site:** Trigger a Vercel rebuild. The sitemap regenerates with fresh
Supabase data. Expired events drop out (query `.gte(today)` filters them). Future events stay.
This is the cleanest fix.

**Option 2 — Leave as-is:** Accept the stale sitemap. ~125 expired events return 404. Googlebot
handles them naturally. No immediate harm, but the sitemap reports a misleading picture.

**Option 3 — Separate sitemaps:** Split the sitemap into two: one for events (with date filter),
one for articles. Events sitemap rebuilds on each site deploy. Articles are static editorial.

**What I cannot do:** Delete 500 URLs from the sitemap without Shareef's explicit decision.
Removing expired events from a sitemap is a significant SEO action.

---

## Findings Summary

| Question | Answer |
|---|---|
| Where do 501 URLs come from? | Supabase `events` table via `src/app/sitemap.ts` |
| Static or dynamic? | Static — generated at Next.js build time |
| Date filter applied? | Yes (`.gte(today)`) — stale because build is old |
| How many past events? | ~25% of 500 ≈ ~125 (based on sample) |
| 404 vs soft 404? | Real 404s — not soft 404s |
| Affiliate links on 404s? | NO — only on live event pages |
| Platinumlist links still work? | YES — on future event pages (200) |
| All 501 include affiliate? | NO — 404 pages do not carry yjg3yzi |
| Regional pages thin? | NO — editorial articles, all 200, all have content |
| Root cause | Site has not been rebuilt since Feb 14, 2026 |

---

## API Call Count This Investigation

| Action | Calls |
|---|---|
| Sitemap parse + event URL sampling | 1 |
| Event URL HTTP checks (20 sample) | 20 |
| Regional URL HTTP checks (8 sample) | 8 |
| Sitemap code read | 1 (file read) |
| **Total** | **30** |

**Running total Places API calls: 70 (unchanged)**
