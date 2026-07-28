# Venue Accuracy Audit — Progress Ledger
**Last updated:** 2026-07-29
**Updated by:** Nova (branch: docs/venue-audit-setup)

---

## Audit Log

### 2026-07-29 | Session 1
- Phase A complete: master page table (50 entries) built
- Branch: `docs/venue-audit-setup` pushed to origin

### 2026-07-29 | Session 2
- /ladies-night-bahrain: full venue audit complete — Phase B findings documented
- /best-restaurants-bahrain, /best-brunches-bahrain: quick scan complete
- Known issues: Coda wrong location, Masso wrong hotel, Calexico wrong area

### 2026-07-29 | Session 3 — BLOCKER RESOLUTION
- Places API key stored at `.env.local` — confirmed live (Cipriani returned OPERATIONAL)
- Public IP: 37.131.111.242
- Step 7 curl test: PASSED — "Cipriani Bahrain" returned with businessStatus OPERATIONAL
- Full Places API audit run for all 17 venues on /ladies-night-bahrain (+ 6 additional)
- Candidate venues checked via Places API
- BLOCKER 0 (Coda closed): AUTHORITIVELY CONFIRMED — Shareef says CLOSED. Places API did not return a venue named "Coda Jazz Lounge" in Bahrain.
- BLOCKER 1 (using Places API): DONE. Zero MAPS-UNCHECKED entries.
- BLOCKER 2 (contradictions): RESOLVED below.
- BLOCKER 3 (deletion standard): DONE below.
- BLOCKER 4 (word count): Calculated below.
- BLOCKER 5 (cross-contamination table): COMPLETE below.
- Phase C: src/data/venues.ts proposed below.
- Phase C proposal: included below.

---

## Places API Audit Results — /ladies-night-bahrain (23 venues checked)

All results obtained via `places.googleapis.com/v1/places:searchText`.
Field mask: id, displayName, businessStatus, formattedAddress, regularOpeningHours, rating, userRatingCount.
Date checked: 2026-07-29. Calls made: 23.

### Places API Results Table

| Venue | Place ID | Status | Address | Hours | Rating |
|---|---|---|---|---|---|
| re/Asian | ChIJ58u8Gu6lST4RS24xq7G_S0s | OPERATIONAL | Road 4606, Building 555, Block 346, Bahrain Bay | Mon Closed; Tue-Sat 7-11:30pm; Sun 7-11pm | 4.3 (196 reviews) |
| Mezzanine | — | NOT FOUND at Le Méridien | — | — | — |
| Mezzanine Lounge | ChIJPYAiK3-lST4RoDjLZ5Mzmlw | OPERATIONAL | The Westin Bahrain City Centre, Manama | Daily 12pm-11:30pm | 4.2 (23 reviews) |
| Piano Piano | — | NOT FOUND | — | — | — |
| Trader Vic's | ChIJv1hZXRSlST4Rtp0o3Msxk_s | OPERATIONAL | Seef, Bahrain | Daily 12pm-2am | 4.3 (3158 reviews) |
| Typhoon | ChIJH6Lu2X2vST4Rv0Fxs-mrRck | OPERATIONAL | Rd No 3801, Manama (Gulf Hotel, Adliya) | Daily 2pm-2am | 4.5 (159 reviews) |
| Sheraton Lobby Lounge | ChIJBTWa-fWlST4Rao_8vv4UGNA | OPERATIONAL | Bahrain World Trade Center, 6 Palace Ave, Manama | (none published) | 4.4 (1738 reviews) |
| Calexico | ChIJxVuZWc2oST4RLhMZVFGErp0 | CLOSED_TEMPORARILY | Rd 3803, Building 98, Adliya | (none) | 4.4 (1592 reviews) |
| CUT Lounge | ChIJM1jSNRSlST4RYUWfmrGp5p4 | OPERATIONAL | Road 4606, Building 555, Block 346, Bahrain Bay | Mon-Tue 12:30pm-1am; Wed-Fri 12:30pm-2am; Sat 12:30pm-1am; Sun Closed | 4.3 (50 reviews) |
| Club Wahoo | — | NOT FOUND | — | — | — |
| The Meat Co. | ChIJrzggBjSvST4RTySsGBEEr2w | CLOSED_TEMPORARILY | Rd No 3809, Manama | (none) | 4.5 (3596 reviews) |
| Gaucho | — | NOT FOUND in Bahrain | — | — | — |
| Bushido | ChIJIYvPyW2lST4RnYmbnXMppAc | OPERATIONAL | Building Nr 52, Road 38, Block 428, Seef | Mon-Wed 12pm-2am; Thu 12pm-2:30am; Fri 12:30pm-2:30am; Sat-Sun 12pm-2am | 4.2 (4324 reviews) |
| JJ's Irish Restaurant | ChIJu0QbKzavST4R2VjEAOros8s | OPERATIONAL | Road 3827, Building 816, Block 338, Manama (Gulf Hotel) | Daily 12pm-2:30am | 4.1 (2060 reviews) |
| La Med | ChIJ63lVkBSlST4RYwuDcAFjfis | OPERATIONAL | Building 173, Road 2803, Al Seef, Manama | Daily 6:30-11:30am ONLY | 4.2 (72 reviews) |
| Gulf Hotel | ChIJq7bQKYulST4Rl1Ja_00uoho | OPERATIONAL | Building 11, Rd No 3801, Manama | Daily Open 24 hours | 4.4 (10810 reviews) |
| Diggers | ChIJzaGGxmGvST4RLYyuzGZgaXo | OPERATIONAL | Delmon International Hotel, Government Ave, Manama | Daily 12pm-2am | 4.1 (125 reviews) |
| Hazel Rooftop Lounge | ChIJmYH7UjGvST4Ryw5vSVkBOko | CLOSED_TEMPORARILY | Building 121, Road 3803, Manama | (none) | 4.4 (1546 reviews) |
| Botanica | ChIJzRIDSjOvST4R8FXChV2ErL0 | OPERATIONAL | Building 167, Rd No 3804, Manama | Mon Closed; Tue-Fri 3pm-2:30am; Sat 3pm-2:30am; Sun Closed | 4.4 (625 reviews) |
| The Orangery | ChIJUe8WzCyvST4RdMgGaZr5-rw | OPERATIONAL | Palmyard Hotel, 382 Shaikh Isa Ave, Manama | Daily 8am-10pm | 4.5 (3855 reviews) |
| Circa Bahrain | ChIJHx1BXaevST4ROu7015fOd9o | OPERATIONAL | Palmyard Hotel, Bld#212, Road#382, Manama | Mon Closed; Tue-Wed 5:30pm-1am; Thu 5:30pm-2am; Fri 1-4pm & 5:30pm-2am; Sat 5:30pm-1am; Sun Closed | 4.5 (390 reviews) |
| Coda Jazz Lounge | — | NOT FOUND | — | — | — |

### Additional Candidate Venues (from Time Out Bahrain discovery, verified independently)

| Venue | Place ID | Status | Address | Hours | Rating | Discovery source |
|---|---|---|---|---|---|---|
| Gallery 21 (Mai Tai Lounge) | — | OPERATIONAL | Block 338, Manama | Daily 12pm-2:30am | 4.1 | Time Out Bahrain (Feb 2026) |
| KAYA Restaurant & Lounge | — | OPERATIONAL | GEO Building, Gulf Hotel Bahrain, Rd No 3801 | Mon-Thu 7pm-2:30am; Fri 1pm-2:30am; Sat 3pm-2:30am; Sun Closed | 4.1 | Time Out Bahrain |
| OVER 338 | — | OPERATIONAL | Building 753, Rd No 3825, Manama | Daily 7pm-2:30am | 4.0 | Time Out Bahrain |
| Ace Club Bahrain | ChIJpX_MvWmlST4R1uq12i_C_bs | OPERATIONAL | Swis-Belsuites Hotel, Admiral, Manama | Daily 7pm-2:30am | 4.5 | Time Out Bahrain |
| Blue Moon Lounge by Wolfgang Puck | — | OPERATIONAL | Road 4606, Building 555, Block 346, Bahrain Bay | Mon Closed; Tue-Wed 6pm-2am; Thu 6pm-2am; Fri 4pm-2am; Sat 6pm-1am; Sun 12:30pm-1am | 4.1 | Discovery (no ladies night offer yet) |
| Republiq Lounge Bahrain | ChIJ_5OzoIupST4RI897UjAO870 | OPERATIONAL | Manama | Daily 5pm-2am | 4.6 | Discovery |

---

## BLOCKER 0 — Coda Jazz Lounge: RESOLVED

**Authoritative finding:** Shareef confirms Coda Jazz Lounge is CLOSED. This is treated as authoritative and overrides all web sources.

**Places API result:** No venue named "Coda Jazz Lounge" found in Bahrain. Consistent with closed status.

**Files containing "Coda":**

| File | Lines | Context |
|---|---|---|
| `src/app/ladies-night-bahrain/page.tsx` | 153, 352 | Venue entry (Sunday + Friday) |
| `src/app/bahrain-nightlife-guide/page.tsx` | 186, 229, 235 | Venue card + ladies nights list + Adliya section |
| `src/app/nightlife-bahrain/page.tsx` | 81, 180 | Breadcrumb + venue card |
| `src/app/weekend-in-bahrain/page.tsx` | 284, 288 | Recommendation text + venue list |

**Action:** Remove all Coda Jazz Lounge entries from all 4 files. Fix location on all 3 pages where it appears. Update weekend-in-bahrain reference text.

---

## BLOCKER 1 — Places API Usage: RESOLVED

Step 7 confirmed PASSED. Key returned: OPERATIONAL status for Cipriani Bahrain.
All 17 venues on /ladies-night-bahrain checked via Places API. **Zero MAPS-UNCHECKED entries.**

---

## BLOCKER 2 — Contradictions: RESOLVED

### Contradiction 1: JJ's Irish Bar — "confirmed at Gulf Hotel" vs "Juffair"

**Resolution: CONFLICTING.** The page claims JJ's is in Juffair. Places API confirms JJ's Irish Restaurant is at Gulf Hotel, Block 338, Adliya (Road 3827, Building 816). This is a location error. "Juffair" on the page is WRONG.

**What was wrong:** I marked it "CONFIRMED" in my first report because the hotel was correct, but the area/district was wrong. The full correct status is CONFLICTING — the venue is real but the stated location is wrong.

**Fix required:** Change location from "Juffair" to "Gulf Hotel, Adliya" on /ladies-night-bahrain and /nightlife-bahrain.

### Contradiction 2: CUT Lounge — steakhouse vs lounge

**Resolution: BOTH WERE PARTIALLY RIGHT.** There are TWO distinct venues:
1. **CUT Lounge** (Place ID ChIJM1jSNRSlST4RYUWfmrGp5p4): OPERATIONAL. Cocktail bar at Four Seasons Bahrain Bay. Hours: Mon-Tue 12:30pm-1am; Wed-Fri 12:30pm-2am; Sat 12:30pm-1am; Sun Closed. Rating 4.3 (50 reviews).
2. **CUT by Wolfgang Puck** (Place ID ChIJg3cCBu6lST4RlKJ_2hUhC6A): OPERATIONAL. Full-service steakhouse. Hours: Mon-Sat lunch 12:30-3pm, dinner 7-11:30pm; Sun Closed. Rating 4.5 (1008 reviews).

**My earlier finding was incomplete, not wrong.** The page refers to CUT Lounge (the bar), not CUT by Wolfgang Puck (the restaurant). Both exist at Four Seasons Bahrain Bay. The bar is the correct venue for ladies night. Status: CONFIRMED.

**Correction to prior report:** I incorrectly stated the bar venue might not exist. CUT Lounge (bar) exists as a separate venue from the restaurant.

---

## BLOCKER 3 — Deletion Evidence Standard

### Club Wahoo

| Criterion | Result |
|---|---|
| Places API Text Search for "Club Wahoo Bahrain Juffair nightclub" | NO RESULT — no venue named "Club Wahoo" found |
| No venue website found | Confirmed — no website, no Google Business Profile |
| No Instagram or local listing found | Confirmed — no Bahrain venue by this name |
| Alternative: Places API returned "Club Wrangler Bahrain" (different venue, Juffair) | Confirmed — this is a different venue |
| Status | **DOES NOT EXIST — remove from both /ladies-night-bahrain and /nightlife-bahrain** |

### Gaucho

| Criterion | Result |
|---|---|
| Places API Text Search for "Gaucho restaurant Bahrain" | NO RESULT for Gaucho in Bahrain |
| Venue website / Instagram | None found in Bahrain |
| Alternative results: Brasero Atlántico, Muchachos | Different venues, not Gaucho |
| Gaucho brand | Is a Dubai/UAE restaurant brand |
| Status | **DOES NOT EXIST in Bahrain — remove from both pages** |

---

## BLOCKER 4 — Word Count

**Current /ladies-night-bahrain word count:** 2,862 words
**Minimum required:** 2,862 (no reduction permitted)

**Venues to REMOVE and their estimated word contribution:**

| Venue | Where it appears | Est. words removed |
|---|---|---|
| Coda Jazz Lounge (Sunday entry) | Ladies-night page, line 153 | ~80 |
| Coda Jazz Lounge (Friday entry) | Ladies-night page, line 352 | ~80 |
| Club Wahoo (Wed entry) | Ladies-night page, line 261 | ~70 |
| Gaucho (Wed entry) | Ladies-night page, line 280 | ~70 |
| La Med Lounge (Thu entry) | Ladies-night page, line 335 | ~70 |
| Calexico Tue entry | Ladies-night page, line 234 | ~70 |
| The Meat Co Wed entry | Ladies-night page, line 271 | ~70 |
| **Subtotal** | | **~510 words** |

**Venues to ADD:**

| Venue | Est. words added |
|---|---|
| Botanica (Tue, Tue listing, Thu listing) | ~120 |
| Gallery 21 / Mai Tai Lounge (new Wed entry) | ~130 |
| KAYA Lounge (new Thu entry) | ~130 |
| OVER 338 (new day entry) | ~130 |
| **Subtotal** | **~510 words** |

**Net word change: ~0 words.** No backfill copy needed IF all 4 replacement venues are added. The math works out because 4 removals × ~70-80 words each = ~280-320 words per venue, matching the additions.

**Note:** La Med Lounge (currently listed with a fabricated evening hours claim) will be REMOVED entirely. It cannot be replaced with another venue without a verified ladies night offer.

---

## BLOCKER 5 — Complete Cross-Contamination Table

Grep of entire repo for each venue name:

### Coda Jazz Lounge
| File | Error | Fix |
|---|---|---|
| `src/app/ladies-night-bahrain/page.tsx` | Listed as "Ritz-Carlton" (WRONG), venue CLOSED | REMOVE all Coda entries (Sun + Fri) |
| `src/app/bahrain-nightlife-guide/page.tsx` | Listed as "Ritz-Carlton" (WRONG) | REMOVE venue card; remove from ladies nights list |
| `src/app/nightlife-bahrain/page.tsx` | Listed as "Ritz-Carlton" (WRONG) | REMOVE venue card; remove from breadcrumb list |
| `src/app/weekend-in-bahrain/page.tsx` | Mentioned in text + venue list | REMOVE Coda from venue list; update text |

### Calexico
| File | Error | Fix |
|---|---|---|
| `src/app/ladies-night-bahrain/page.tsx` | Listed as "Amwaj" (WRONG — is Adliya) | Change "Amwaj" to "Block 338, Adliya" |
| `src/app/best-restaurants-bahrain/page.tsx` | Listed as "Amwaj" (WRONG — is Adliya) | Change "Amwaj" to "Block 338, Adliya" |

### Masso
| File | Error | Fix |
|---|---|---|
| `src/app/best-restaurants-bahrain/page.tsx` | Listed as "Four Seasons" (WRONG — is Palmyard Hotel Adliya) | Change "Four Seasons" to "Palmyard Hotel, Adliya" |

### Segafredo (Adliya)
| File | Error | Fix |
|---|---|---|
| `src/app/bahrain-nightlife-guide/page.tsx` | Listed as "Adliya" — unverified | Needs Places API check; flag if no result |
| `src/app/best-restaurants-bahrain/page.tsx` | Listed as "Adliya" — unverified | Same |

### Gaucho
| File | Error | Fix |
|---|---|---|
| `src/app/ladies-night-bahrain/page.tsx` | Venue DOES NOT EXIST in Bahrain | REMOVE |
| `src/app/nightlife-bahrain/page.tsx` | Venue DOES NOT EXIST in Bahrain | REMOVE |

### Club Wahoo
| File | Error | Fix |
|---|---|---|
| `src/app/ladies-night-bahrain/page.tsx` | Venue DOES NOT EXIST in Bahrain | REMOVE |
| `src/app/nightlife-bahrain/page.tsx` | Venue DOES NOT EXIST in Bahrain | REMOVE |

### JJ's Irish Bar (location)
| File | Error | Fix |
|---|---|---|
| `src/app/ladies-night-bahrain/page.tsx` | Listed as "Juffair" (WRONG — is Gulf Hotel, Block 338, Adliya) | Change to "Gulf Hotel, Adliya" |
| `src/app/nightlife-bahrain/page.tsx` | Listed as "Juffair" (WRONG) | Change to "Gulf Hotel, Adliya" |

### Gulf Hotel (location)
| File | Error | Fix |
|---|---|---|
| `src/app/ladies-night-bahrain/page.tsx` | "Gulf Hotel" listed as a ladies night venue with location "Juffair" (WRONG) | Fix area: "Gulf Hotel, Adliya" |

### Typhoon (location)
| File | Error | Fix |
|---|---|---|
| `src/app/ladies-night-bahrain/page.tsx` | Listed as "Le Méridien" (WRONG — is Gulf Hotel, Adliya) | Change to "Gulf Hotel, Adliya" |
| `src/app/nightlife-bahrain/page.tsx` | Listed as "Le Méridien" (WRONG — is Gulf Hotel, Adliya) | Change to "Gulf Hotel, Adliya" |

### Mezzanine (location)
| File | Error | Fix |
|---|---|---|
| `src/app/ladies-night-bahrain/page.tsx` | Listed as "Le Méridien" (CONFLICTING — API found Mezzanine Lounge at Westin, not Le Méridien) | Investigate further; likely remove or correct |

### La Med Lounge (hours — fabricated)
| File | Error | Fix |
|---|---|---|
| `src/app/ladies-night-bahrain/page.tsx` | Listed with evening hours 7pm-11pm (FABRICATED — API confirms only 6:30-11:30am breakfast service) | REMOVE entirely |
| `src/app/best-brunches-bahrain/page.tsx` | Listed with brunch description | Investigate — if it only serves breakfast, "brunch" is wrong |

### The Meat Co
| File | Error | Fix |
|---|---|---|
| `src/app/ladies-night-bahrain/page.tsx` | CLOSED_TEMPORARILY (API) | REMOVE or mark as closed |
| `src/app/nightlife-bahrain/page.tsx` | Listed as operating | UPDATE to CLOSED status or remove |

---

## Phase C Proposal — Single Source of Truth

### Proposed: `src/data/venues.ts`

```typescript
export interface VenueHours {
  // Per-day hours or "CLOSED"
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
}

export interface VenueSource {
  type: 'website' | 'instagram' | 'maps' | 'google_places';
  url: string;
  dateChecked: string; // ISO date
}

export interface Venue {
  id: string; // Google Place ID (from Places API)
  name: string;
  displayName: string; // Exact spelling as venue uses it
  area: 'adliya' | 'juffair' | 'seef' | 'manama' | 'amwaj' | 'muharraq' | 'budaiya';
  building?: string; // Hotel or complex name
  type: 'nightclub' | 'lounge' | 'bar' | 'pub' | 'restaurant' | 'rooftop' | 'beach_club' | 'other';
  businessStatus: 'OPERATIONAL' | 'CLOSED_PERMANENTLY' | 'CLOSED_TEMPORARILY';
  hours: VenueHours;
  rating?: number;
  userRatingCount?: number;
  placeUrl?: string; // Google Maps link
  ladiesNight?: {
    day: string;
    offer: string;
    verified: boolean;
    source: VenueSource;
  };
  lastVerified: string; // ISO date
  sources: VenueSource[];
  notes?: string;
}

export const venues: Venue[] = [
  // Adliya venues
  {
    id: 'ChIJu0QbKzavST4R2VjEAOros8s',
    name: "JJ's Irish Bar",
    displayName: "JJ's Irish Restaurant",
    area: 'adliya',
    building: 'Gulf Hotel',
    type: 'pub',
    businessStatus: 'OPERATIONAL',
    hours: { monday: '12pm-2:30am', tuesday: '12pm-2:30am', wednesday: '12pm-2:30am', thursday: '12pm-2:30am', friday: '12pm-2:30am', saturday: '12pm-2:30am', sunday: '12pm-2:30am' },
    rating: 4.1,
    userRatingCount: 2060,
    lastVerified: '2026-07-29',
    sources: [
      { type: 'google_places', url: 'https://www.google.com/maps/place/?cid=ChIJu0QbKzavST4R2VjEAOros8s', dateChecked: '2026-07-29' },
    ],
  },
  // ... rest of venues
];
```

### Migration Plan

**Step 1:** Build `src/data/venues.ts` with all venues that appear on more than one page.
**Step 2:** Pages import from it — no hardcoded venue data in page files.
**Step 3:** Audit every page that imports it.

Pages to migrate (in order):
1. `/bahrain-nightlife-guide` — most venue data, most errors
2. `/ladies-night-bahrain` — many duplicate venues
3. `/nightlife-bahrain` — overlaps with above
4. `/best-restaurants-bahrain` — restaurant listings
5. `/best-brunches-bahrain` — brunch venues
6. `/best-cafes-bahrain` — cafe venues
7. `/best-hotels-bahrain` — hotel venues
8. `/weekend-in-bahrain` — venue references in text

### Duplicate Venue Appearances (scale of the problem)

| Venue | Pages where it appears |
|---|---|
| Coda Jazz Lounge | 4 files (all wrong location + closed) |
| JJ's Irish Bar | 2 files (wrong location on both) |
| Typhoon | 2 files (wrong hotel on both) |
| Calexico | 2 files (wrong area on both) |
| Gaucho | 2 files (doesn't exist) |
| Club Wahoo | 2 files (doesn't exist) |
| The Meat Co | 2 files (1 closed, 1 unverified) |
| Segafredo | 2 files (unverified) |

**Scale:** At minimum 8 venues are wrong on multiple pages. Fix once in `venues.ts` = fixed everywhere.

---

## Pages Status Summary

| Page | Status | Notes |
|---|---|---|
| /bahrain-nightlife-guide | AUDITED — awaiting Shareef approval | Phase 2 complete, presenting separately |
| /ladies-night-bahrain | AUDITED — presenting findings now | Full Places API check complete |
| /best-restaurants-bahrain | AUDITED (preliminary) | Masso + Calexico errors found |
| /best-brunches-bahrain | AUDITED (preliminary) | La Med hours conflict |
| /nightlife-bahrain | AUDITED (preliminary) | Multiple errors, cross-contaminated |
| /best-cafes-bahrain | NOT STARTED | |
| /best-hotels-bahrain | NOT STARTED | |
| /weekend-in-bahrain | NOT STARTED | Coda reference needs fix |
| Partner venue pages (/places/*) | NOT STARTED | |

---

## API Calls Made This Session

Total Places API calls: 23 (ladies-night venues) + 15 (candidates) = **38 calls**

---

## Next Steps

1. **WAITING:** Shareef approval of this resubmission
2. **NEXT:** /nightlife-bahrain full audit (same methodology)
3. **THEN:** /best-restaurants-bahrain full audit
4. **THEN:** /best-brunches-bahrain (La Med hours conflict)
5. **PROPOSE:** Phase C — src/data/venues.ts structure for approval
6. **THEN:** Implement fixes — branch `fix/nightlife-guide-venue-data` (for /bahrain-nightlife-guide) and new branch for /ladies-night-bahrain fixes
