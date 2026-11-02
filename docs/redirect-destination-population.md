# Redirect destinations must be populated, indexable hubs

**Date:** 2026-11-02
**Status:** FIX IN PROGRESS (branch `fix/redirect-populated-destinations-2026-11-02`)

## What happened

PR #38 (merged 2026-11-02, `e2a9248`) made an empty hub page `noindex, nofollow`:

```
src/app/events/category/[category]/page.tsx   -> robots: index ? index,follow : noindex,nofollow
src/app/international/[country]/page.tsx       -> same
```

The 801-URL redirect map (`src/data/event-redirects.ts`, PR #36) was generated
**before** that change, so it happily points 301s at hubs that are now empty
and noindex.

**89 of the 784 redirects land on a noindex destination:**

| count | destination |
|---|---|
| 32 | `/events/category/sports` |
| 15 | `/international/spain` |
| 9 | `/events/category/dining` |
| 8 | `/events/category/arts` |
| 8 | `/events/category/community` |
| 3 | `/events/category/shopping` |
| 3 | `/events/category/business` |
| 2 | `/international/india` |
| 2 | `/events/category/family` |
| 1 each | `/international/{malaysia,egypt,france,italy,kuwait,cyprus}`, `/events/category/wellness` |

Those pages render ~190 characters of text: "0 events", "No events found",
"Check back soon". A redirect into a noindex, empty page is a dead end for
both Google (no signal to consolidate, destination cannot rank) and the user.

## The fix

The generator already had a populated-destination fallback on the
`feat/crawlable-card-links` branch (written but never merged). It is ported to
`main` here.

Emptiness is tested against the **database**, not the rendered HTML — the same
query the page itself runs:

- `/events/category/<cat>`: `status=published, is_hidden=false, country=Bahrain, date >= today`
- `/international/<code>`: `status=published, is_hidden=false, country != Bahrain, date >= today`

Fallback rule:

- `/events/category/<empty>`  -> `/events`
- `/international/<empty>`     -> `/international`

Both fallbacks are populated hubs (`/events` = 544 event links,
`/international` = 512 event links) and both are `index, follow`.

## Why the map was NOT hand-edited for the 9 stashed URLs

An earlier stash moved 9 URLs from the 301 map to the 410 list. That was
rejected on two grounds:

1. **`src/data/event-redirects.ts` is generated.** MEMORY.md: "a redirect map is
   data, not code". It is emitted by `scripts/generate-event-redirects.mjs` from
   live evidence (GSC + Supabase + feed) so it can be regenerated and diffed. A
   hand-edit is overwritten by the next run and leaves the generator and the
   committed map disagreeing.

2. **The generator's 410 rule is principled.** `resolveDestination()` returns
   no destination only when neither a country nor a category can be
   established from the slug, the GSC queries, the feed host/timezone or the
   DB. The 9 URLs all resolve to a defensible hub (7 of them land on a
   populated, indexable page), so 301 is correct for them and 410 is not.

All 9 were independently confirmed gone — absent from the `events` table (no
row by slug, by `source_event_id`, or by title) and absent from all 1,529
events in the live Platinumlist feed. They are past events whose upstream
listing Platinumlist has dropped. Their GSC impressions over 365d total 258
with 7 clicks, all of which the 301 now captures.

## Evidence for the 9 (365d, GSC sc-domain:bahrainnights.com)

| URL | impressions | clicks | current destination |
|---|---|---|---|
| `/events/dandiya-raas-2026-by-out-of-the-box-events-107850` | 131 | 0 | `/events` |
| `/events/azul-beach-halloween-specials-featuring-sam-collins-109163` | 49 | 2 | `/events` |
| `/events/cultural-arena-concerts-fifa-world-cup-2026-fan-zone-20-august-107840` | 35 | 0 | `/events/category/sports` (empty) |
| `/events/cultural-arena-concerts-fifa-world-cup-2026-fan-zone-107962` | 16 | 0 | `/events/category/sports` (empty) |
| `/events/choral-masterclass-clinic-by-jonathan-velasco-dma-107624` | 10 | 1 | `/international/uae` |
| `/events/dmc-middle-east-dj-championships-2026-107517` | 6 | 1 | `/international/uae` |
| `/events/mestiza-106893` | 4 | 1 | `/international/uae` |
| `/events/unlimited-tapas-sangria-dj-night-at-bondz-difc-tapeo-night-107927` | 4 | 1 | `/international/uae` |
| `/events/black-bunny-halloween-109085` | 3 | 1 | `/international/uae` |

## Verification

- `node scripts/generate-event-redirects.mjs --check` — map matches generator output
- `node scripts/verify-event-redirects.mjs` — every source is 404-before / correct-redirect-after,
  every destination is 200, no chains, no path in both lists
- every destination in the map is checked live for `robots: index, follow`
  and for at least one real event listing
