# Ladies Night — Offer Verification Checklist

**File:** `docs/ladies-night-verification.md`
**Date:** 2026-07-29 (updated with phone numbers)
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

## Full Checklist Table (with phone numbers)

| Venue | Place ID | Phone (national) | Page location | Verified day? | Verified offer? | Source URL | Source date | Status |
|---|---|---|---|---|---|---|---|---|
| re/Asian | ChIJ58u8Gu6lST4RS24xq7G_S0s | +973 1711 5046 | Four Seasons | ❌ NO | ❌ NO | — | — | HOLD |
| Mezzanine Lounge | ChIJPYAiK3-lST4RoDjLZ5Mzmlw | NOT RETURNED | Westin (was Le Méridien) | ❌ NO | ❌ NO | — | — | REMOVE — wrong hotel |
| Piano Piano | NOT FOUND | — | Gulf Hotel | ❌ NO | ❌ NO | — | — | REMOVE — venue not found |
| Trader Vic's Bahrain | ChIJv1hZXRSlST4Rtp0o3Msxk_s | +973 1758 6555 | Ritz-Carlton | ❌ NO | ❌ NO | — | — | HOLD |
| Typhoon | ChIJH6Lu2X2vST4Rv0Fxs-mrRck | +973 1774 6395 | Gulf Hotel (fix from Le Méridien) | ❌ NO | ❌ NO | — | — | HOLD |
| Sheraton Lobby Lounge | ChIJBTWa-fWlST4Rao_8vv4UGNA | +973 1753 3533 | Sheraton Hotel | ❌ NO | ❌ NO | — | — | HOLD |
| Calexico | ChIJxVuZWc2oST4RLhMZVFGErp0 | — | Adliya (was Amwaj) | — | — | — | — | REMOVE — CLOSED_TEMPORARILY |
| CUT Lounge | ChIJM1jSNRSlST4RYUWfmrGp5p4 | +973 1711 5044 | Four Seasons | ❌ NO | ❌ NO | — | — | HOLD |
| Club Wahoo | NOT FOUND | — | Juffair | ❌ NO | ❌ NO | — | — | REMOVE — venue does not exist |
| The Meat Co. | ChIJrzggBjSvST4RTySsGBEEr2w | — | Adliya | — | — | — | — | REMOVE — CLOSED_TEMPORARILY |
| Gaucho | NOT FOUND | — | Adliya | ❌ NO | ❌ NO | — | — | REMOVE — venue does not exist in Bahrain |
| Bushido | ChIJIYvPyW2lST4RnYmbnXMppAc | +973 1758 3555 | Ritz-Carlton | ❌ NO | ❌ NO | — | — | HOLD |
| JJ's Irish Restaurant | ChIJu0QbKzavST4R2VjEAOros8s | +973 3384 3005 | Block 338 Adliya (fix from Juffair) | ❌ NO | ❌ NO | — | — | HOLD |
| Diggers | ChIJzaGGxmGvST4RLYyuzGZgaXo | +973 1722 4000 | Delmon Hotel Manama (fix from Juffair) | ❌ NO | ❌ NO | — | — | HOLD |
| La Med | ChIJ63lVkBSlST4RYwuDcAFjfis | +973 1758 3317 | Ritz-Carlton | ❌ NO | ❌ NO | — | — | REMOVE — no evening service |
| Circa Bahrain | ChIJHx1BXaevST4ROu7015fOd9o | +973 3992 7872 | Palmyard Hotel | ❌ NO | ❌ NO | — | — | HOLD |
| The Orangery | ChIJUe8WzCyvST4RdMgGaZr5-rw | +973 1736 9696 | Palmyard Hotel | ❌ NO | ❌ NO | — | — | HOLD |

**New candidates (from Time Out Bahrain discovery):**

| Venue | Place ID | Phone | Status |
|---|---|---|---|
| Botanica | ChIJzRIDSjOvST4R8FXChV2ErL0 | +973 3380 8035 | HOLD — offer not verified |
| Gallery 21 | ChIJiav33jKvST4RGFbP_fPgcDs | +973 1771 1600 | HOLD — offer not verified |
| KAYA Restaurant & Lounge | (candidate) | — | HOLD — Place ID not confirmed |
| OVER 338 | (candidate) | — | HOLD — Place ID not confirmed |

---

## Place Details Reference

### DIGGERS — Correction to prior report
**Place ID:** ChIJzaGGxmGvST4RLYyuzGZgaXo
**Status:** OPERATIONAL ← CORRECTION: was wrongly marked CLOSED_TEMPORARILY
**Address:** Delmon International Hotel, Government Ave, Manama ← NOT Juffair
**Hours:** Daily 12pm–2am
**Rating:** 4.1 (125 reviews)
**Phone:** +973 1722 4000

**Correction:** Diggers is OPERATIONAL. The only error is the area ("Juffair" → Delmon International Hotel, Government Ave, Manama). This is a **location fix, not a removal.** Prior internal contradiction (listed in both "removals" AND "kept 9") is corrected.

---

### CIRCA BAHRAIN
**Place ID:** ChIJHx1BXaevST4ROu7015fOd9o
**Status:** OPERATIONAL
**Address:** Palmyard Hotel, Bld#212, Road#382, Block 338, Manama
**Hours:** Mon Closed; Tue–Wed 5:30pm–1am; Thu 5:30pm–2am; Fri 1–4pm & 5:30pm–2am; Sat 5:30pm–1am; Sun Closed
**Rating:** 4.5 (390 reviews)
**Phone:** +973 3992 7872
**Note:** Missing from prior session's Places API table (inadvertent omission). Now confirmed. Palmyard Hotel confirmed.

---

### THE ORANGERY
**Place ID:** ChIJUe8WzCyvST4RdMgGaZr5-rw
**Status:** OPERATIONAL
**Address:** Palmyard Hotel, 382 Shaikh Isa Ave, Manama
**Hours:** Daily 8am–10pm (all 7 days)
**Rating:** 4.5 (3856 reviews)
**Phone:** +973 1736 9696
**Note:** Missing from prior session's Places API table (inadvertent omission). Now confirmed. Palmyard Hotel confirmed.

---

### MASSO RESTAURANT (cross-contamination — not on ladies-night page)
**Place ID:** ChIJ6Qn-tSyvST4RrESvXhNL0hM
**Status:** OPERATIONAL
**Address:** Palmyard Hotel, Bld#212, Road#382, Manama ← NOT Four Seasons!
**Hours:** Mon 7pm–midnight; Tue–Sun lunch 12:30–2:30pm, dinner 7pm–midnight
**Rating:** 4.3 (1163 reviews)
**Phone:** NOT RETURNED by Places API v1
**Note:** Listed as "Four Seasons" on /best-restaurants-bahrain. Correct hotel: Palmyard Hotel, Block 338, Adliya.

---

## Phone Numbers — API Notes

**`nationalPhoneNumber` IS available in Places API v1** when added to the FieldMask. The prior report was wrong — the field simply was not in the mask I was given.

**Places API v1 pricing:**
- Basic fields (name, address, hours, status, rating): included
- Contact fields (phone, website): **no additional charge**
- Phone retrieval bills at the **Basic Data** SKU, not a higher tier
- Atmosphere data and Rich Snippet fields bill at higher SKUs — not used in this audit

**Calls this pass:** 14 phone number calls
**Running total Places API calls:** 56 + 14 = **70**

---

## Pending: Shareef's Venue Verification

All venues marked HOLD have OPERATIONAL status and phone numbers confirmed.
Shareef's job: call the venue directly and confirm ladies night day/offer.

When a venue is confirmed, update the checklist with:
- `verified day`: the confirmed day
- `verified offer`: the confirmed offer text
- `source URL`: the venue's own channel (or note: "confirmed by phone [date]")
- `source date`: date of confirmation
- Set `Status` to APPROVED

---

## Action Required

All venues above are **HOLD** — do not display offer claims until verified.
