# BahrainNights Venue Accuracy Audit Report
**Date:** February 15, 2026
**Total Venues Audited:** 7

## Summary

| Issue Type | Count | Severity |
|------------|-------|----------|
| Double https:// in URLs | 4 | High |
| Inconsistent Area Capitalization | 7 | Medium |
| Missing/Invalid Phone Format | 1 | Medium |
| Empty/Missing Address | 1 | High |
| Trailing Spaces in Names | 1 | Low |
| Trailing Dash in Slugs | 1 | Low |
| Placeholder Opening Hours | 1 | Medium |
| Leading/Trailing Whitespace | 1 | Low |

---

## Detailed Issues by Venue

### 1. Vibes Bahrain entertainment
**Slug:** `vibes-bahrain-entertainment-`

| Field | Issue | Current Value | Recommended Fix |
|-------|-------|---------------|-----------------|
| name | Trailing space | "Vibes Bahrain entertainment " | "Vibes Bahrain Entertainment" |
| slug | Trailing dash | "vibes-bahrain-entertainment-" | "vibes-bahrain-entertainment" |
| phone | Missing country code | "66655566" | "+973 6665 5566" |
| area | Lowercase | "manama" | "Manama" |

---

### 2. The Palmyard
**Slug:** `the-palmyard`

| Field | Issue | Current Value | Recommended Fix |
|-------|-------|---------------|-----------------|
| website | Double https:// | "https://https://www.palmyard.com/?f=aj/A722669.html" | "https://www.palmyard.com" |
| opening_hours | All 00:00-00:00 | {"monday": {"open": "00:00", "close": "00:00"}, ...} | Set hideHours: true OR set actual hours |
| area | Lowercase | "adliya" | "Adliya" |

---

### 3. Ô (O Lounge Adliya)
**Slug:** `o-lounge-adliya`

| Field | Issue | Current Value | Recommended Fix |
|-------|-------|---------------|-----------------|
| area | Lowercase | "adliya" | "Adliya" |

✅ Otherwise accurate

---

### 4. Enma Mall
**Slug:** `enma-mall`

| Field | Issue | Current Value | Recommended Fix |
|-------|-------|---------------|-----------------|
| website | Double https:// | "https://https://enma-mall.com" | "https://enma-mall.com" |
| address | Arabic comma + duplicate block | "Building 493 16 Um Al Nassan، Avenue, Block 925، 925, Bahrain" | "Building 493, 16 Um Al Nassan Avenue, Block 925, Riffa, Bahrain" |
| area | Lowercase | "riffa" | "Riffa" |

---

### 5. The Orangery
**Slug:** `the-orangery`

| Field | Issue | Current Value | Recommended Fix |
|-------|-------|---------------|-----------------|
| website | Double https:// | "https://https://orangeryme.com/" | "https://orangeryme.com" |
| phone | Leading space | " +973 1736 9696" | "+973 1736 9696" |
| area | ✅ Already capitalized | "Adliya" | "Adliya" |

---

### 6. Circa
**Slug:** `circa`

| Field | Issue | Current Value | Recommended Fix |
|-------|-------|---------------|-----------------|
| website | Double https:// | "https://https://circabahrain.com/" | "https://circabahrain.com" |
| area | Lowercase | "adliya" | "Adliya" |

**Note:** Uses same CR number as The Palmyard (48452-1) - this is correct as both are at Palmyard Hotel.

---

### 7. BH Nights
**Slug:** `bh-nights`

| Field | Issue | Current Value | Recommended Fix |
|-------|-------|---------------|-----------------|
| address | Empty | "" | Should add proper address or hide location section |
| area | ✅ Already capitalized | "Adliya" | "Adliya" |

---

## No Placeholder Text Found
- ✅ No "TBA" in venue descriptions
- ✅ No "Coming Soon" in venue content (only used as UI labels)
- ✅ No "Lorem ipsum" placeholder text

## No Duplicate Venues Found
- ✅ All 7 venues are unique

## Phone Number Formats
Bahrain phone numbers should follow the format:
- Landlines: +973 17XX XXXX
- Mobile: +973 3XXX XXXX or +973 6XXX XXXX

| Venue | Phone | Status |
|-------|-------|--------|
| Vibes Bahrain | 66655566 | ❌ Missing +973 |
| The Palmyard | +973 1772 5000 | ✅ Correct |
| Ô Lounge | +97333662111 | ⚠️ Missing spaces |
| Enma Mall | +973 3838 8744 | ✅ Correct |
| The Orangery | +973 1736 9696 | ⚠️ Leading space |
| Circa | +973 3992 7872 | ✅ Correct |
| BH Nights | +97339007750 | ⚠️ Missing spaces |

---

## Opening Hours Issues

| Venue | Issue |
|-------|-------|
| The Palmyard | All days set to 00:00-00:00 (should hide hours or set actual hotel hours) |
| Others | ✅ Valid opening hours |

---

## Recommended Actions

### Critical (Fix Immediately)
1. Fix all double https:// URLs (4 venues)
2. Add address for BH Nights or hide location section

### High Priority
1. Standardize area names to Title Case
2. Fix phone number formatting

### Low Priority
1. Remove trailing space from venue name
2. Fix slug trailing dash
3. Configure opening hours for The Palmyard

---

## Attractions Data Issues

**Note:** These are from Platinumlist API data - see TOOLS.md for restrictions on modifying this data.

| Issue | Count | Notes |
|-------|-------|-------|
| Generic "Bahrain" area | ~20 | Should be specific area |
| Potential duplicates | 2 | Gravity Indoor Skydiving appears twice |
| HTML entities in descriptions | Multiple | &rsquo;, &ndash;, etc. |
| Miscategorized | 2 | EVA VR Gaming as "water-sports" |

**No action taken** - Platinumlist data cannot be modified per legal restrictions.

---

## SQL Fixes Generated
See `scripts/fix-venue-accuracy.cjs` for automated fixes.
