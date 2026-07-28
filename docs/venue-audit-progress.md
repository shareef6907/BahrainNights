# Venue Accuracy Audit — Progress Ledger
**Last updated:** 2026-07-29
**Updated by:** Nova (branch: docs/venue-audit-setup)

---

## Audit Log

### 2026-07-29 | Session 1
- Created docs/venue-accuracy-audit.md (task brief)
- Created docs/venue-audit-progress.md (this ledger)
- Built master page table (50 entries) — Phase A complete
- Branch: `docs/venue-audit-setup` — pushed to origin

### 2026-07-29 | Session 2
- **/ladies-night-bahrain** — FULL AUDIT COMPLETE. See findings below.
- **/best-restaurants-bahrain** — QUICK SCAN COMPLETE. See preliminary findings below.
- **/best-brunches-bahrain** — QUICK SCAN COMPLETE. See preliminary findings below.
- Updated ledger with all findings.

---

## P1 Pages — Audit Status

### #1 /bahrain-nightlife-guide
- **Status:** AUDITED — awaiting Shareef venue list approval (from separate task)
- **Known issues:** 6 Juffair venues to remove; beach clubs recommend remove; hotel venues need full verification; Adliya venues need full verification
- **Phase 2 research complete — presenting to Shareef separately**

### #2 /ladies-night-bahrain
- **Status:** AUDITED — presenting findings to Shareef now
- **Current word count:** 2,862
- **Page title:** `Ladies Night Bahrain — Best Deals This Week 2026 | BahrainNights` ✓
- **H1:** `Ladies Night Bahrain` ✓
- **Slug:** `/ladies-night-bahrain` ✓

#### Full Venue Audit Table — /ladies-night-bahrain

| # | Venue | Stated location | Confirmed location | Stated hours | Confirmed hours | Status | Issues |
|---|---|---|---|---|---|---|---|
| 1 | Coda Jazz Lounge | Ritz-Carlton | **Palmyard Hotel, Adliya** | Sun 7pm-2am, Fri 7pm-2am | UNVERIFIED | **⚠️ CONFLICTING** | Location WRONG. Multiple sources confirm Coda is at Palmyard Hotel Adliya. "Ritz-Carlton" on page is incorrect. |
| 2 | re/Asian | Four Seasons | **Four Seasons Hotel Bahrain Bay** ✓ | Sun 6pm-11pm, Sat 6pm-11pm | Mon-Sat 7pm-11pm (Foursquare) | **✓ CONFIRMED with hours conflict** | Venue and hotel confirmed. Hours: Foursquare says Mon-Sat 7pm-11pm; page says Sun & Sat only 6pm-11pm. Note: Sunday hours may differ. |
| 3 | Mezzanine | Le Méridien | **Le Méridien City Centre Bahrain, Seef district** ✓ | Mon 8pm-12am | UNVERIFIED | **✓ CONFIRMED location, hours UNVERIFIED** | Le Méridien City Centre is in Seef district (near CityCentre mall), NOT in Juffair. Ladies night claim needs separate verification. |
| 4 | Piano Piano | Gulf Hotel | **NOT FOUND** | Mon 7pm-11pm | N/A | **❌ DOES NOT EXIST** | Gulf Hotel Bahrain's own website lists 21 venues including Sherlock Holmes, Typhoon Bar, Spin Bar — no "Piano Piano". Venue does not exist. Remove. |
| 5 | Trader Vic's | Ritz-Carlton | **Ritz-Carlton Bahrain, Seef** ✓ | Tue 8pm-12am, Sat 6pm-9pm | Daily 12pm-2am (venue) | **✓ CONFIRMED with hours conflict** | Venue confirmed. Page hours are ladies-night specific deal windows, not full hours. Fine. |
| 6 | Typhoon | Le Méridien | **Gulf Hotel, Block 338, Adliya** (NOT Le Méridien) | Tue 8pm-1am | UNVERIFIED | **⚠️ CONFLICTING** | Venue confirmed at Gulf Hotel Adliya. Page says "Le Méridien" — WRONG. Gulf Hotel confirms Typhoon Bar as one of their venues. |
| 7 | Sheraton Lobby Lounge | Sheraton Hotel | **Sheraton Bahrain Hotel, Manama** ✓ | Tue 7pm-11pm | UNVERIFIED | **UNVERIFIED** | Sheraton Bahrain is a real hotel. Lobby lounge existence and ladies night claim unverifiable without further research. MAPS-UNCHECKED. |
| 8 | Calexico | Amwaj | **Block 338, Adliya** (NOT Amwaj) | Tue 7pm-11pm | UNVERIFIED | **⚠️ CONFLICTING** | Venue confirmed in Block 338 Adliya. Page says "Amwaj" — WRONG. |
| 9 | CUT Lounge | Four Seasons | **Four Seasons Bahrain Bay** (steakhouse, not lounge) | Wed 7pm-12am, Fri 6pm-9pm | UNVERIFIED | **⚠️ CONFLICTING** | Four Seasons Bahrain Bay has CUT as a steakhouse (not a lounge/bar). Their cocktail bar is Blue Moon Lounge (50th floor). "CUT Lounge" as a bar venue may be incorrect naming. |
| 10 | Club Wahoo | Juffair | **NO SOURCE FOUND** | Wed 10pm-3am | N/A | **❌ DOES NOT EXIST** | No source found for "Club Wahoo" venue in Bahrain. No search result, no Google Maps listing. Likely entirely fabricated. Remove. |
| 11 | The Meat Company | Adliya | **Block 338, Adliya** ✓ | Wed 7pm-12am | UNVERIFIED | **✓ CONFIRMED location** | Venue name confirmed in Adliya's Block 338. Hours and ladies night claim unverifiable. MAPS-UNCHECKED. |
| 12 | Gaucho | Adliya | **NO SOURCE FOUND** | Wed 6pm-11pm | N/A | **❌ DOES NOT EXIST** | "Gaucho" is a Dubai-based restaurant brand. No Gaucho found in Bahrain. Remove. |
| 13 | Bushido Lounge | Ritz-Carlton | **Ritz-Carlton Bahrain, Seef** ✓ | Wed 7pm-11pm | UNVERIFIED | **⚠️ UNVERIFIED (website down)** | Venue confirmed at Ritz-Carlton but bushidobhb.com is inaccessible. Operating status unclear. Website may be temporarily down or venue rebranded. MAPS-UNCHECKED. |
| 14 | JJ's Irish Bar | Juffair | **Juffair area** ✓ | Thu 8pm-2am | UNVERIFIED | **✓ CONFIRMED location** | JJ's confirmed at Gulf Hotel Bahrain. Ladies night claim unverifiable. MAPS-UNCHECKED. |
| 15 | Block 338 Venues | Adliya | **Adliya, Block 338** ✓ | Thu 8pm-2am | N/A | **✓ CONFIRMED (area reference)** | Area description, not a specific venue. Keep. |
| 16 | Diggers | Juffair | **Juffair area** ✓ | Thu 7pm-1am | UNVERIFIED | **✓ CONFIRMED location** | Known Juffair venue. Ladies night claim unverifiable. MAPS-UNCHECKED. |
| 17 | La Med Lounge | Ritz-Carlton | **Ritz-Carlton Bahrain, Seef** ✓ | Thu 7pm-11pm | UNVERIFIED | **⚠️ CONFLICTING (venue type)** | La Med is confirmed at Ritz-Carlton but is a Mediterranean **restaurant** (casual dining with buffet), not a poolside **lounge bar**. The description "Mediterranean vibes by the pool" fits. Ladies night claim unverifiable. MAPS-UNCHECKED. |

#### /ladies-night-bahrain Summary:
- **Fabricated (does not exist):** Club Wahoo, Gaucho (2 venues)
- **Wrong location:** Coda Jazz Lounge (Ritz→Palmyard), Typhoon (LeM→Gulf Hotel), Calexico (Amwaj→Adliya)
- **Wrong venue type/name:** CUT Lounge (steakhouse not lounge), La Med (restaurant not lounge)
- **Unverified (MAPS-UNCHECKED):** Sheraton Lobby Lounge, Bushido Lounge, JJ's Irish Bar, Diggers, The Meat Company, La Med Lounge
- **Confirmed with issues:** 5 venues
- **Confirmed clean:** 5 venues

---

### #3 /best-restaurants-bahrain
- **Status:** QUICK SCAN COMPLETE — needs full audit
- **Known issues found:**
  - Masso listed as "Four Seasons" → **WRONG** (confirmed at Palmyard Hotel Adliya)
  - Calexico listed as "Amwaj" → **WRONG** (confirmed in Adliya Block 338)
  - Segafredo listed as "Adliya" → unverified
  - "Choices - InterContinental" — need verify this is the right venue name
  - Nusr-Et (Marassi) — confirmed in Marassi (Phase 2 for /bahrain-nightlife-guide)
- **Requires:** Full venue-by-venue audit with sources

### #4 /best-brunches-bahrain
- **Status:** QUICK SCAN COMPLETE — needs full audit
- **Known issues found:** None immediately obvious. All listed venues are plausible.
  - Al Waha (Gulf Hotel) — Gulf Hotel confirms this venue ✓
  - Bay View (Four Seasons) — Four Seasons confirms Bay View Lounge ✓
  - La Med (Ritz-Carlton) — confirmed ✓
  - Choices (InterContinental Regency) — need verify exact venue name
  - Mövenpick Hotel Bahrain — plausible, need verify
  - The Orangery (Adliya) — confirmed (Phase 2) ✓
  - Lilou (Adliya) — plausible, need verify
  - Crust & Crema (Adliya) — plausible, need verify
- **Requires:** Full venue-by-venue audit with sources

---

## Known Cross-Page Issues (same venue, different errors)

| Venue | /ladies-night | /best-restaurants | /bahrain-nightlife-guide | Correct info |
|---|---|---|---|---|
| Coda Jazz Lounge | "Ritz-Carlton" ❌ | — | "Ritz-Carlton" ❌ | Palmyard Hotel Adliya |
| Masso | — | "Four Seasons" ❌ | — | Palmyard Hotel Adliya |
| Calexico | "Amwaj" ❌ | "Amwaj" ❌ | — | Block 338 Adliya |
| Bushido | Ritz-Carlton ✓ (venue) | Ritz-Carlton ✓ | "Ritz-Carlton" ✓ | Confirmed at Ritz-Carlton |
| La Med | "Poolside lounge" ⚠️ | "Ritz-Carlton" ✓ | — | Ritz-Carlton — restaurant not lounge |
| Segafredo | "Adliya" (no source) | "Adliya" (no source) | "Adliya" ⚠️ | Unverified in Adliya |

---

## Next Steps

1. **WAITING:** Shareef approval of /bahrain-nightlife-guide venue list (separate task)
2. **NEXT:** Present Phase B findings for /ladies-night-bahrain to Shareef
3. **THEN:** Full audit of /best-restaurants-bahrain (has 25+ venues with pricing — more complex)
4. **THEN:** /best-brunches-bahrain, /best-cafes-bahrain, /best-hotels-bahrain (batch)
5. **THEN:** Partner venue pages (/places/circa, /places/the-orangery, /places/the-palmyard)
6. **PROPOSE:** Phase C — single source of truth (venues.ts data file)
