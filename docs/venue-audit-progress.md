# Venue Accuracy Audit — Progress Ledger
**Last updated:** 2026-07-29
**Updated by:** Nova

## Master Page Table

### P1 — Ranking in Google with venue data (highest exposure)

| # | URL | Page title | Venue data? | Venue count | Notes | Status |
|---|---|---|---|---|---|---|
| 1 | /bahrain-nightlife-guide | Bahrain Nightlife Guide (2026) — Best Bars, Clubs & Parties | Y | ~22 venues | Static hardcoded. **ALREADY AUDITED (Phase 2). Awaiting Shareef venue list approval before implementing fix.** | AUDITED — awaiting venue approval |
| 2 | /ladies-night-bahrain | Ladies Night Bahrain — Best Deals This Week 2026 | Y | ~20 venues | Static hardcoded. Quick scan shows location errors: Coda Jazz Lounge listed as "Ritz-Carlton" (WRONG — is at Palmyard Adliya). Requires full audit. | PENDING |
| 3 | /best-brunches-bahrain | Best Brunches in Bahrain 2026 — Friday Brunch Guide | Y | ~15 venues | Static hardcoded. Requires audit. | PENDING |
| 4 | /best-restaurants-bahrain | Best Restaurants in Bahrain 2026 — Dining Guide | Y | ~15 venues | Static hardcoded. Requires audit. | PENDING |
| 5 | /best-cafes-bahrain | Best Cafes in Bahrain 2026 — Coffee Shops & Study Spots | Y | ~15 venues | Static hardcoded. Requires audit. | PENDING |
| 6 | /best-hotels-bahrain | Best Hotels in Bahrain 2026 — Luxury to Budget | Y | ~15 venues | Static hardcoded. Requires audit. | PENDING |

### P2 — Commercial partner venue pages (Orangery, Masso, Circa — errors here are worst)

| # | URL | Page title | Venue data? | Venue count | Notes | Status |
|---|---|---|---|---|---|---|
| 7 | /places/circa | Circa — Partner venue page | DB-driven | 1 venue | Supabase-driven. Fetch live page and verify against venue's own sources. | PENDING |
| 8 | /places/the-orangery | The Orangery — Partner venue page | DB-driven | 1 venue | Supabase-driven. Verify hours, description, status. | PENDING |
| 9 | /places/the-palmyard | The Palmyard — Partner venue page | DB-driven | 1 venue | Supabase-driven. Verify hours, description, status. | PENDING |
| 10 | /places/o-lounge-adliya | Ô Lounge Adliya — Venue page | DB-driven | 1 venue | Supabase-driven. Verify venue name (shown as "Ô" in title), location, hours. | PENDING |
| 11 | /places/vibes-bahrain-entertainment | Vibes Bahrain Entertainment | DB-driven | 1 venue | Supabase-driven. Requires audit. | PENDING |
| 12 | /places/enma-mall | Enma Mall | DB-driven | 1 venue | Supabase-driven. Mall venue — verify name and basic info. | PENDING |

### P3 — Other pages containing venue data

| # | URL | Page title | Venue data? | Venue count | Notes | Status |
|---|---|---|---|---|---|---|
| 13 | /nightlife-bahrain | Nightlife in Bahrain 2026 — Clubs & Lounges | Y | ~10 venues | Static hardcoded. Requires audit. | PENDING |
| 14 | /places | Best Restaurants, Lounges, Cafes & Nightlife in Bahrain | DB-driven | Multiple | Places directory — verify basic listing data. | PENDING |
| 15 | /venues | Venues listing page | DB-driven | Multiple | Venues directory — verify data quality. | PENDING |
| 16 | /cafes/[slug] | Dynamic cafe venue pages | DB-driven | Many | Dynamic pages — audit a sample + check DB entry approach. | PENDING |
| 17 | /nightclubs/[slug] | Dynamic nightclub venue pages | DB-driven | Many | Dynamic pages — audit a sample. | PENDING |
| 18 | /lounges-bars/[slug] | Dynamic lounge/bar venue pages | DB-driven | Many | Dynamic pages — audit a sample. | PENDING |
| 19 | /beach-pool-clubs/[slug] | Dynamic beach club venue pages | DB-driven | Many | Dynamic pages — audit a sample. Coral Bay beach club referenced here — verify. | PENDING |
| 20 | /attractions | Attractions & Experiences in Bahrain | Y (light) | ~5 attractions | Small page (5KB). Verify attraction names are real. | PENDING |
| 21 | /explore | Explore page | Y (light) | Several | Subdir has tours, kids, shopping, spas, hotels subpages. Quick check. | PENDING |

### P4 — No venue data (verify only — factual claims check, then mark VERIFIED)

| # | URL | Page title | Venue data? | Notes | Status |
|---|---|---|---|---|---|
| 22 | /cinema | Cinema in Bahrain | N | Movie listings from Platinumlist. No venue factual claims. | PENDING |
| 23 | /events | Events page | N | Platinumlist event listings. Not venue data. | PENDING |
| 24 | /calendar | Calendar | N | Event calendar. Not venue data. | PENDING |
| 25 | /international/* | Regional event pages (200+) | N | Platinumlist event pages for UAE, Qatar, Saudi. Out-of-scope for venue audit. | OUT OF SCOPE |
| 26 | /blog, /blogs | Blog posts | N | Editorial content. Verify no hardcoded venue factual claims. | PENDING |
| 27 | /contact | Contact | N | No venue data. | PENDING |
| 28 | /advertise | Advertise | N | No venue data. | PENDING |
| 29 | /privacy | Privacy policy | N | No venue data. | PENDING |
| 30 | /terms | Terms | N | No venue data. | PENDING |
| 31 | /register-venue | Register a venue | N | Form page. No venue factual claims. | PENDING |
| 32 | /submit-venue | Submit venue | N | Form page. No venue factual claims. | PENDING |
| 33 | /become-a-guide | Become a guide | N | No venue data. | PENDING |
| 34 | /become-an-artist | Become an artist | N | No venue data. | PENDING |
| 35 | /guides | Guides listing | N | Likely static guides. Quick check. | PENDING |
| 36 | /artists | Artists | N | No venue data. | PENDING |
| 37 | /sponsors | Sponsors | N | No venue data. | PENDING |
| 38 | /offers | Offers/deals | N | Likely promotional. Quick check. | PENDING |
| 39 | /this-weekend | Weekend events | N | Event listings. Not venue data. | PENDING |
| 40 | /tonight | Tonight's events | N | Event listings. Not venue data. | PENDING |
| 41 | /bahrain-events-this-week | Weekly events | N | Event listings. Not venue data. | PENDING |
| 42 | /weekend-in-bahrain | Weekend guide | N | Likely editorial. Quick check. | PENDING |
| 43 | /tours | Tours | N | Tour listings. Quick check. | PENDING |
| 44 | /content-guidelines | Content guidelines | N | Static page. No venue data. | PENDING |
| 45 | /marketing, /marketing/ar, /marketing/en | Marketing | N | Static. No venue data. | PENDING |
| 46 | /regional | Regional landing | N | Likely redirects to /international. | PENDING |
| 47 | /admin | Admin | N | Not public. | NOT APPLICABLE |
| 48 | /search | Search page | N | UI page. No venue data. | PENDING |
| 49 | /list-event | List event form | N | Form. No venue data. | PENDING |
| 50 | /venue-portal | Venue portal | N | Business portal. Quick check. | PENDING |

### Deleted / Not Found

| URL | Status |
|---|---|
| /places/bahrain-nights | 404 — listed in sitemap but page does not exist |
| /places/test-new- | 404 — test page, should be cleaned up (do NOT touch without approval) |
| /lounges-bars | 404 — sitemap lists it but no static page exists (dynamic [slug] only) |
| /beach-pool-clubs | 404 — sitemap lists it but no static page exists (dynamic [slug] only) |

## Audit Log

### 2026-07-29 | Nova | Initial setup
- Created docs/venue-accuracy-audit.md (task brief)
- Created docs/venue-audit-progress.md (this ledger)
- Built master page table (50 entries)
- Phase 1 of /bahrain-nightlife-guide AUDITED — awaiting Shareef approval of venue list

### Known Issues Found During Reconnaissance
- /ladies-night-bahrain: Coda Jazz Lounge listed as "Ritz-Carlton" — IS WRONG (Coda is at Palmyard Hotel Adliya)
- /bahrain-nightlife-guide: "Jumeirah Beach" and "Sofitel Beach Amwaj" appear to be fabricated venues
- /places/bahrain-nights: 404 but listed in sitemap (orphaned entry)
- /places/test-new-: 404 test page (orphaned entry)
- Zenj at Gulf Hotel: current page lists it but Gulf Hotel's own website does not use the name "Zenj" for any venue
- Vox at InterContinental: no source found for this venue name at this hotel

## Next Steps

1. **WAITING:** Shareef approval of /bahrain-nightlife-guide venue list (Phase 3 approval pending)
2. **NEXT:** Audit /ladies-night-bahrain — Coda Jazz Lounge location error is already identified
3. **THEN:** Audit /best-brunches-bahrain, /best-restaurants-bahrain, /best-cafes-bahrain (batch)
4. **THEN:** Partner venue pages (/places/circa, /places/the-orangery, /places/the-palmyard)
5. **THEN:** Remaining static pages and dynamic page samples
6. **PROPOSE:** Phase C — single source of truth (venues.ts data file)
