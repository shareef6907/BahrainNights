# Phase C — `src/data/venues.ts` Schema

**File:** `docs/phase-c-venues-schema.md`
**Date:** 2026-07-29
**Status:** PROPOSED — awaiting Shareef approval

---

## 1. Data Model

```typescript
// src/data/venues.ts

export type Area =
  | 'adliya'
  | 'juffair'
  | 'seef'
  | 'manama'
  | 'amwaj'
  | 'muharraq'
  | 'budaiya'
  | 'marassi';

export type VenueType =
  | 'nightclub'
  | 'lounge'
  | 'bar'
  | 'pub'
  | 'restaurant'
  | 'rooftop'
  | 'beach_club'
  | 'cafe'
  | 'other';

export type BusinessStatus = 'OPERATIONAL' | 'CLOSED_PERMANENTLY' | 'CLOSED_TEMPORARILY';

/** One weekday period. Sunday = 0 per Google Places API convention. */
export interface DayPeriod {
  open: { day: number; hour: number; minute: number };
  close: { day: number; hour: number; minute: number };
}

export interface VenueHours {
  periods: DayPeriod[];   // raw from Places API — all 7 days always present
  weekdayDescriptions?: string[];  // human-readable, for display
  openNow?: boolean;
  nextOpenTime?: string;  // ISO timestamp
}

/** One evidence source for a factual claim (hours, ladies night, etc.) */
export interface Source {
  type: 'google_places' | 'website' | 'instagram' | 'phone_call' | 'manual';
  url: string;           // URL or description of source
  dateChecked: string;   // ISO date string
  verifiedBy?: string;   // optional: name/role of verifier
}

export interface LadiesNightOffer {
  day: string;           // e.g. "Tuesday"
  offer: string;         // e.g. "Unlimited drinks 8pm–12am for ladies"
  /** Only display the offer if verified = true. */
  verified: boolean;
  source?: Source;       // venue's own website, Instagram, or phone — required if verified = true
  notes?: string;        // e.g. "venue confirmed by phone call 2026-07-29"
}

export interface Venue {
  // Identity
  id: string;            // Google Place ID (from Places API)
  slug: string;          // URL-safe identifier, e.g. "trader-vics"
  name: string;          // Internal/use name, e.g. "Trader Vic's"
  displayName: string;   // As venue spells it, e.g. "Trader Vic's Bahrain"

  // Location
  area: Area;
  address: string;        // Full formatted address from Places API
  building?: string;      // Hotel or complex name, e.g. "The Ritz-Carlton Bahrain"
  road?: string;         // e.g. "Road 3801" (for display in lists)

  // Classification
  type: VenueType;

  // Status
  businessStatus: BusinessStatus;
  hours: VenueHours;
  rating?: number;
  userRatingCount?: number;
  placeUrl?: string;     // Google Maps link: https://www.google.com/maps/place/?cid=<id>

  // Ladies night (optional — omit entirely until verified)
  ladiesNight?: LadiesNightOffer;

  // Audit trail
  lastVerified: string;   // ISO date of last Places API check
  sources: Source[];     // all sources used for venue data

  // Optional
  notes?: string;         // free text for any caveat or known issue
}
```

---

## 2. Worked Example: Trader Vic's Bahrain

```typescript
// === Trader Vic's Bahrain ===
{
  id: 'ChIJv1hZXRSlST4Rtp0o3Msxk_s',
  slug: 'trader-vics',
  name: "Trader Vic's",
  displayName: "Trader Vic's Bahrain",

  area: 'seef',
  address: 'Seef, Bahrain',
  building: 'The Ritz-Carlton Bahrain',
  road: 'Seef District',

  type: 'lounge',

  businessStatus: 'OPERATIONAL',
  hours: {
    periods: [
      { open: { day: 0, hour: 12, minute: 0 }, close: { day: 1, hour: 2, minute: 0 } },
      { open: { day: 1, hour: 12, minute: 0 }, close: { day: 2, hour: 2, minute: 0 } },
      { open: { day: 2, hour: 12, minute: 0 }, close: { day: 3, hour: 2, minute: 0 } },
      { open: { day: 3, hour: 12, minute: 0 }, close: { day: 4, hour: 2, minute: 0 } },
      { open: { day: 4, hour: 12, minute: 0 }, close: { day: 5, hour: 2, minute: 0 } },
      { open: { day: 5, hour: 12, minute: 0 }, close: { day: 6, hour: 2, minute: 0 } },
      { open: { day: 6, hour: 12, minute: 0 }, close: { day: 0, hour: 2, minute: 0 } },
    ],
    weekdayDescriptions: [
      'Monday: 12:00 PM–2:00 AM',
      'Tuesday: 12:00 PM–2:00 AM',
      'Wednesday: 12:00 PM–2:00 AM',
      'Thursday: 12:00 PM–2:00 AM',
      'Friday: 12:00 PM–2:00 AM',
      'Saturday: 12:00 PM–2:00 AM',
      'Sunday: 12:00 PM–2:00 AM',
    ],
    openNow: false,
    nextOpenTime: '2026-07-29T09:00:00Z',
  },

  rating: 4.3,
  userRatingCount: 3158,
  placeUrl: 'https://www.google.com/maps/place/?cid=ChIJv1hZXRSlST4Rtp0o3Msxk_s',

  // ❌ NOT SET — ladies night offer NOT verified from venue's own channel
  // ladiesNight: undefined,

  lastVerified: '2026-07-29',
  sources: [
    {
      type: 'google_places',
      url: 'https://www.google.com/maps/place/?cid=ChIJv1hZXRSlST4Rtp0o3Msxk_s',
      dateChecked: '2026-07-29',
    },
  ],
  notes:
    'Ladies night (Tuesday: unlimited drinks 8pm–12am) sourced from third-party listings. ' +
    'Not verified from ritzcarlton.com or venue Instagram. Do NOT display offer until verified. ' +
    'Ritz-Carlton Bahrain hotel pages inaccessible at time of audit (404/403). ' +
    'Place ID confirmed by Places API searchText + placeDetails.',
},
```

---

## 3. How Closing a Venue Propagates

When `businessStatus` changes to `CLOSED_PERMANENTLY` or `CLOSED_TEMPORARILY` in `venues.ts`:

1. All pages that import the venue list it check `businessStatus`
2. If `CLOSED_PERMANENTLY`: page component filters it out (does not render)
3. If `CLOSED_TEMPORARILY`: page may show it with a visual "temporarily closed" badge, OR filter it out — configurable per page
4. No separate edit needed on any individual page file
5. Audit trail: `lastVerified` date and a `notes` field explain the status

```typescript
// In page components:
const activeVenues = venues.filter(v =>
  v.businessStatus === 'OPERATIONAL' ||
  v.businessStatus === 'CLOSED_TEMPORARILY' // show with badge
);
const permanentVenues = venues.filter(v =>
  v.businessStatus !== 'CLOSED_PERMANENTLY'
);
```

---

## 4. Pages That Will Import From `venues.ts`

Migration order (most broken first):

| # | Page | Why first | Venues it shares |
|---|---|---|---|
| 1 | `/ladies-night-bahrain` | Most errors, most urgent | re/Asian, Trader Vic's, Typhoon, Sheraton, CUT, Bushido, JJ's, Circa, Orangery, Mezzanine |
| 2 | `/bahrain-nightlife-guide` | 4 venue errors confirmed | Most of the above + more |
| 3 | `/nightlife-bahrain` | Overlapping venue data | Same set |
| 4 | `/best-restaurants-bahrain` | Calexico (wrong area), Masso (wrong hotel) | Calexico, Masso, and others |
| 5 | `/best-brunches-bahrain` | La Med hours conflict | La Med |
| 6 | `/weekend-in-bahrain` | Coda reference needs fix | Coda, re/Asian, others |
| 7 | `/best-cafes-bahrain` | Segafredo Adliya unverified | Segafredo |
| 8 | `/best-hotels-bahrain` | Not yet audited | TBD |

---

## 5. Estimated Effort

| Step | Action | Notes |
|---|---|---|
| 1 | Define `Venue` + related interfaces in `src/data/venues.ts` | 1–2 hours |
| 2 | Populate all OPERATIONAL venues from Places API data already collected | 2–3 hours |
| 3 | Mark all `CLOSED_*` venues with correct status | 1 hour |
| 4 | Migrate `/ladies-night-bahrain` to import from `venues.ts` | 2 hours |
| 5 | Test locally — verify renders, no console errors | 1 hour |
| 6 | Migrate remaining pages in order | 4–6 hours |
| 7 | Full audit pass on migrated pages | 3–4 hours |
| **Total** | | **~14–20 hours** |

**Key risk:** Some pages have venue data baked into JSX with custom descriptions that can't be auto-migrated. Those will need manual review per page.

---

## 6. Decisions Needed Before Migration

1. **Offers display rule:** Only show `ladiesNight` offer if `verified = true`? Or show unverified offers with a disclaimer?
2. **Temporarily closed handling:** Filter out, or show with a badge?
3. **Phone numbers:** Should be included if available from Places API. Some venues don't return phone in v1 API.
4. **Branch name:** `fix/ladies-night-venue-data` for the first page migration, or all-at-once?
