# Ladies Night — Offer Verification Checklist

**File:** `docs/ladies-night-verification.md`
**Date:** 2026-07-29
**Purpose:** Audit trail for ladies night offer verification per Correction 1 standard

---

## Verification Standard

An offer is **VERIFIED** only when sourced from:
1. **The venue's own website** — current page on venue/domain
2. **The venue's own Instagram** — post, story highlight, or bio mention within the last 90 days
3. **The hotel's own F&B / offers page** — for hotel-affiliated venues

Sources that do **NOT** satisfy this standard:
- Time Out Bahrain
- Bahrain Confidential
- Marhaba Qatar
- Any third-party event listing
- Any listing aggregator
- Any search result snippet

---

## Checklist Table

| Venue | Place ID | Phone | Area claimed on page | Verified ladies night day? | Verified offer? | Source URL | Source date | Status |
|---|---|---|---|---|---|---|---|---|
| re/Asian | ChIJ58u8Gu6lST4RS24xq7G_S0s | — | Four Seasons | ❌ NO | ❌ NO | — | — | HOLD — no venue own-channel source |
| Mezzanine Lounge | ChIJPYAiK3-lST4RoDjLZ5Mzmlw | — | Westin (was Le Méridien) | ❌ NO | ❌ NO | — | — | REMOVE — wrong hotel, offer unverified |
| Piano Piano | NOT FOUND | — | Gulf Hotel | ❌ NO | ❌ NO | — | — | REMOVE — venue not found |
| Trader Vic's Bahrain | ChIJv1hZXRSlST4Rtp0o3Msxk_s | — | Ritz-Carlton | ❌ NO | ❌ NO | — | — | HOLD — no venue own-channel source |
| Typhoon | ChIJH6Lu2X2vST4Rv0Fxs-mrRck | — | Gulf Hotel (fix from Le Méridien) | ❌ NO | ❌ NO | — | — | HOLD — no venue own-channel source |
| Sheraton Lobby Lounge | ChIJBTWa-fWlST4Rao_8vv4UGNA | — | Sheraton Hotel | ❌ NO | ❌ NO | — | — | HOLD — no venue own-channel source |
| Calexico | ChIJxVuZWc2oST4RLhMZVFGErp0 | — | Adliya (was Amwaj) | — | — | — | — | REMOVE — CLOSED_TEMPORARILY per Maps |
| CUT Lounge | ChIJM1jSNRSlST4RYUWfmrGp5p4 | — | Four Seasons | ❌ NO | ❌ NO | — | — | HOLD — no venue own-channel source |
| Club Wahoo | NOT FOUND | — | Juffair | ❌ NO | ❌ NO | — | — | REMOVE — venue does not exist |
| The Meat Co. | ChIJrzggBjSvST4RTySsGBEEr2w | — | Adliya | — | — | — | — | REMOVE — CLOSED_TEMPORARILY per Maps |
| Gaucho | NOT FOUND | — | Adliya | ❌ NO | ❌ NO | — | — | REMOVE — venue does not exist in Bahrain |
| Bushido | ChIJIYvPyW2lST4RnYmbnXMppAc | — | Ritz-Carlton | ❌ NO | ❌ NO | — | — | HOLD — no venue own-channel source |
| JJ's Irish Restaurant | ChIJu0QbKzavST4R2VjEAOros8s | — | Block 338 Adliya (fix from Juffair) | ❌ NO | ❌ NO | — | — | HOLD — no venue own-channel source |
| Diggers | ChIJzaGGxmGvST4RLYyuzGZgaXo | — | Delmon Hotel Manama (fix from Juffair) | ❌ NO | ❌ NO | — | — | HOLD — no venue own-channel source |
| La Med | ChIJ63lVkBSlST4RYwuDcAFjfis | — | Ritz-Carlton | ❌ NO | ❌ NO | — | — | REMOVE — no evening service verified |
| Circa Bahrain | ChIJHx1BXaevST4ROu7015fOd9o | — | Palmyard Hotel | ❌ NO | ❌ NO | — | — | HOLD — no venue own-channel source |
| The Orangery | ChIJUe8WzCyvST4RdMgGaZr5-rw | — | Palmyard Hotel | ❌ NO | ❌ NO | — | — | HOLD — no venue own-channel source |

---

## Place Details Reference (this audit pass)

### DIGGERS — Correction to prior report
**Place ID:** ChIJzaGGxmGvST4RLYyuzGZgaXo
**Status:** OPERATIONAL ← PRIOR REPORT WAS WRONG (was marked CLOSED_TEMPORARILY in session table)
**Address:** Delmon International Hotel, Government Ave, Manama ← NOT Juffair
**Hours:** Daily 12pm–2am
**Rating:** 4.1 (125 reviews)
**Phone:** Not available in v1 API

**Correction:** In my prior session report I placed Diggers in the "CLOSED_TEMPORARILY" section. This was an error. The Places API call returned OPERATIONAL with full daily hours. The correction is: Diggers is OPERATIONAL, address fix needed from "Juffair" → "Delmon International Hotel, Government Ave, Manama." The area correction is sufficient. Diggers is NOT a removal — it is a location fix.

**Prior contradiction (Blocker B):** In the same report, I listed Diggers among "removals" while also listing it in the "kept 9." This was an internal contradiction. Corrected: Diggers stays, fix area to "Delmon International Hotel, Manama."

---

### CIRCA BAHRAIN — Place Details (new this pass)
**Place ID:** ChIJHx1BXaevST4ROu7015fOd9o
**Status:** OPERATIONAL
**Address:** Palmyard Hotel, Bld#212, Road#382, Block 338, Manama ← Confirmed at Palmyard
**Hours:** Mon Closed; Tue–Wed 5:30pm–1am; Thu 5:30pm–2am; Fri 1–4pm & 5:30pm–2am; Sat 5:30pm–1am; Sun Closed
**Rating:** 4.5 (390 reviews)
**Phone:** Not available in v1 API

**Note:** Was missing from Places API table in prior session report (inadvertent omission). Now confirmed. Hotel affiliation (Palmyard Hotel) matches the page's founding partner info. Area on page ("Adliya") is consistent — Palmyard is in Block 338, Adliya.

---

### THE ORANGERY — Place Details (new this pass)
**Place ID:** ChIJUe8WzCyvST4RdMgGaZr5-rw
**Status:** OPERATIONAL
**Address:** Palmyard Hotel, 382 Shaikh Isa Ave, Manama ← Confirmed at Palmyard
**Hours:** Daily 8am–10pm (all 7 days)
**Rating:** 4.5 (3856 reviews)
**Phone:** Not available in v1 API

**Note:** Was missing from Places API table in prior session report (inadvertent omission). Now confirmed. Hotel affiliation (Palmyard Hotel) matches the page's founding partner info.

---

### MASSO RESTAURANT — Place Details (new this pass)
**Place ID:** ChIJ6Qn-tSyvST4RrESvXhNL0hM
**Status:** OPERATIONAL
**Address:** Palmyard Hotel, Bld#212, Road#382, Manama ← Confirmed at Palmyard
**Hours:** Not returned in v1 API (may not be in Places database)
**Rating:** 4.3 (1163 reviews)
**Phone:** Not available in v1 API

**Note:** NOT on /ladies-night-bahrain. Found during cross-contamination scan of /best-restaurants-bahrain where it was incorrectly listed as "Four Seasons." Correct hotel: Palmyard Hotel, Block 338, Adliya — same building as Circa and The Orangery.

---

## Phone Numbers

**Note:** `regularPhoneNumber` is not a valid field in Places API v1 for these venues. Phone numbers are not available from the v1 REST API for this dataset. Phone verification would require manual checking or the Google Business Profile scraping (not available via API).

For venues requiring phone verification, recommend Shareef or team member call directly.

---

## Action Required

All venues above are **HOLD** — do not display offer claims until `verified = true` and `source` is populated with the venue's own channel URL and date.
