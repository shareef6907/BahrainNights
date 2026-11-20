#!/usr/bin/env python3
"""
Venue verification runner v2 for bahrainnights.com.

Method (validated against live Maps responses on 2026-11-20):

  * The public `tbm=map` endpoint returns PLACE RECORDS only when the query
    contains a concrete locality token. "Starbucks Bahrain" -> map-tile
    fallback, zero places. "Starbucks City Centre Bahrain" -> the place.
    The bare word "Bahrain" often breaks the search, so the chain leads with
    named localities, malls and hotels.

  * A Bahrain area-token chain is tried for every venue. Each attempt records
    the query, the byte size of the response and whether a place payload was
    returned, so the evidence row can show the method actually ran.

  * Results are geo-filtered to Bahrain (lat/lng box + address tokens).
    Foreign branches of global brands are rejected and recorded as such.

  * A venue with no Maps record is NOT proof of closure. Absence from Maps
    means UNVERIFIED unless a second independent source agrees.

Every row keeps the exact request URL and the unmodified payload.

Usage:
    python3 verify_venues.py [--limit N] [--out results.json] [--resume]
                              [--workers 6] [--delay 0.6]
"""
import argparse
import json
import os
import re
import sys
import threading
import time
from concurrent.futures import ThreadPoolExecutor

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import maps_lookup as ml  # noqa: E402

HERE = os.path.dirname(os.path.abspath(__file__))
INVENTORY = os.path.join(HERE, "inventory.json")
RAW_DIR = os.path.join(HERE, "raw")
RESULTS = os.path.join(HERE, "results.json")

# Named Bahrain localities / malls / hotels used to unlock place search.
BAHRAIN_PLACES = [
    "City Centre Bahrain", "Marassi Galleria", "The Avenues Bahrain",
    "Seef Mall", "Dana Mall", "Moda Mall", "Oasis Mall", "Enma Mall",
    "Wadi Al Sail", "Saar Mall", "Bahrain Mall", "Dragon City",
    "Lost Paradise", "Manama", "Seef", "Adliya", "Juffair", "Amwaj",
    "Budaiya", "Muharraq", "Riffa", "Saar", "Sitra", "Al Seef",
    "Gulf Hotel Bahrain", "Four Seasons Bahrain", "Ritz-Carlton Bahrain",
    "Palmyard", "Jumeirah Royal Saray", "InterContinental Bahrain",
    "Crowne Plaza Bahrain", "Wyndham Grand Manama", "The Domain Bahrain",
    "Radisson Blu Bahrain", "Swiss-Belhotel Seef", "Mercure Grand Seef",
    "Movenpick Bahrain", "Downtown Rotana Bahrain", "Elite Grande",
    "Ibis Seef", "Golden Tulip Bahrain", "Ramada Bahrain", "Al Safir",
    "Bahrain Fort", "Qal'at al-Bahrain", "Arad Fort", "Riffa Fort",
    "Manama Souq", "Bab Al Bahrain", "Bahrain International Circuit",
    "Al Areen", "Al Hajar", "Zallaq", "Awali", "Hidd", "Jidda",
    "Diyar Al Muharraq", "Sanabis", "Al Nai'm", "Qudaibiya", "Block 338",
]

# Location hints mapped from the values stored on our own pages.
AREA_HINTS = [
    ("adliya", "Adliya"), ("seef", "Seef"), ("juffair", "Juffair"),
    ("amwaj", "Amwaj"), ("manama", "Manama"), ("budaiya", "Budaiya"),
    ("muharraq", "Muharraq"), ("riffa", "Riffa"), ("saar", "Saar"),
    ("sitra", "Sitra"), ("city centre", "City Centre Bahrain"),
    ("diyar al muharraq", "Diyar Al Muharraq"),
    ("seef district", "Seef"), ("sanabis", "Sanabis"),
    ("isa town", "Isa Town"), ("al nai'm", "Al Nai'm"),
    ("block 338", "Block 338"), ("qudaibiya", "Qudaibiya"),
    ("diplomatic area", "Diplomatic Area"), ("al seef", "Al Seef"),
    ("moharraq", "Muharraq"), ("al ain", "Awali"),
]

HOTELS = ["Four Seasons", "Ritz-Carlton", "Gulf Hotel", "InterContinental",
          "Crowne Plaza", "Mövenpick", "Movenpick", "Palmyard", "Jumeirah",
          "Wyndham", "Hyatt", "Sheraton", "Westin", "Le Méridien", "Meridien",
          "Sofitel", "Radisson Blu", "Swiss-Belhotel", "Mercure Grand",
          "Downtown Rotana", "Domain Hotel", "Elite Grande", "Mövenpick"]

MALLS = ("City Centre", "Marassi Galleria", "The Avenues", "Seef Mall",
         "Moda Mall", "Dana Mall", "Oasis Mall", "Enma Mall",
         "Bahrain Mall", "Dragon City", "Saar Mall", "Wadi Al Sail",
         "Lost Paradise", "Wahooo")

# Venues whose Maps display name differs from the name on our pages.
# Each entry was confirmed against the live Maps record on 2026-11-20.
# Exact display names (lower-cased, punctuation stripped) that are the same
# business as our page name. Exact match only: a substring rule would let
# "Prime US" match "Toys\"R\"Us".
ALIASES = {
    "al areen wildlife park": ["mohamed bin zayed nature reserve"],
    "babel": ["bebabel"],
    "karam beirut": ["karam restaurant"],
    "prime us": ["black angus bahrain"],
    "coral bay bahrain": ["coral bay hotel & resort"],
    "grey cafe": ["cafe gray"],
    "wahooo! waterpark": ["wahooo waterpark", "wahooo"],
    "nusr-et": ["nusr et", "nusret"],
    "takumi": ["takumi restaurant"],
    "h&m": ["h&m", "h & m", "h&m"],
    "elite grande hotel": ["elite grande hotel"],
}

# Venues whose Maps place-name index needs a specific query to surface the
# record. Each was confirmed against the live Maps payload on 2026-11-20.
ALIAS_QUERIES = {
    "karam beirut": ["Karam Lebanese Bahrain", "Karam Restaurant Budaiya",
                     "Karam Beirut Bahrain"],
}

_print_lock = threading.Lock()


def norm(s):
    return (s or "").strip().lower()


def clean_name(name):
    for h in HOTELS:
        suffix = " - " + h
        if name.endswith(suffix):
            return name[: -len(suffix)].strip()
    return name


def build_queries(venue):
    """Bahrain-scoped fallback chain, most specific first."""
    name = clean_name(venue["venue_name"])
    loc = venue.get("location") or ""
    desc = venue.get("description") or ""
    blob = (loc + " " + desc).lower()

    hint = None
    for k, v in AREA_HINTS:
        if k in blob:
            hint = v
            break

    hotel = None
    for h in HOTELS:
        if h.lower() in blob:
            hotel = h
            break

    mall = None
    for m in MALLS:
        if m.lower() in blob:
            mall = m
            break

    queries = []
    # 1. Our own page's hotel + area context.
    if hotel and hint:
        queries.append(f"{name} {hotel} {hint}")
    # 2. Our own page's area.
    if hint:
        queries.append(f"{name} {hint}")
    # 3. Our own page's hotel.
    if hotel:
        queries.append(f"{name} {hotel}")
    # 4. Our own page's mall.
    if mall:
        queries.append(f"{name} {mall}")
    # 5. If the venue trades under a different name, query that name too.
    #    These must come early: the generic chain can be long and the alias
    #    query is the one that produces the correct record.
    # The Maps place-name index often needs a category word. Take it from
    # our page's cuisine field or, failing that, from the description.
    for q in ALIAS_QUERIES.get(norm(venue["venue_name"]), []):
        queries.append(q)
    alias_cuisine = (venue.get("cuisine") or "").strip()
    if not alias_cuisine:
        alias_cuisine = (venue.get("description") or "").strip()
    for alias in ALIASES.get(norm(venue["venue_name"]), []):
        alias_name = alias.replace("&", " & ").title()
        queries.append(f"{alias_name} Bahrain")
        queries.append(f"{alias_name} Seef Bahrain")
        queries.append(f"{alias_name} Manama Bahrain")
        queries.append(f"{alias_name} Adliya Bahrain")
        if alias_cuisine:
            # The Maps place-name index often needs the category word too.
            for word in alias_cuisine.replace(",", " ").split()[:3]:
                queries.append(f"{alias_name} {word} Bahrain")
    # 6. The Bahrain place chain.
    for p in BAHRAIN_PLACES:
        queries.append(f"{name} {p}")
    # 7. Last resort: name + Bahrain (often returns the tile fallback).
    queries.append(f"{name} Bahrain")
    seen, out = set(), []
    for q in queries:
        if q not in seen:
            seen.add(q)
            out.append(q)
    return out


def score_match(rec, venue):
    """How well does a Maps record match our stored venue details?"""
    loc = (venue.get("location") or "").lower()
    hay = " ".join([
        (rec.get("address") or ""), (rec.get("neighborhood") or ""),
        " ".join(rec.get("categories") or []), (rec.get("website") or ""),
    ]).lower()
    score = 0
    for token in ["seef", "juffair", "adliya", "amwaj", "manama", "budaiya",
                  "muharraq", "riffa", "saar", "sitra", "city centre",
                  "diyar al muharraq", "sanabis", "block 338", "al seef",
                  "qudaibiya", "zallaq", "hidd", "awali"]:
        if token in loc and token in hay:
            score += 10
    for hotel in [h.lower() for h in HOTELS]:
        if hotel in loc and hotel in hay:
            score += 8
    if venue.get("cuisine"):
        c = venue["cuisine"].lower()
        if c and c in hay:
            score += 3
    a = set(re.findall(r"[a-z]+", norm(venue["venue_name"])))
    b = set(re.findall(r"[a-z]+", (rec.get("name") or "").lower()))
    if a and b:
        score += len(a & b) * 2
    return score


def name_overlap(venue, rec):
    """Token overlap between our venue name and the Maps display name."""
    a = set(re.findall(r"[a-z]{3,}", norm(venue["venue_name"])))
    b = set(re.findall(r"[a-z]{3,}", (rec.get("name") or "").lower()))
    if not a:
        return 0.0
    return len(a & b) / len(a)


# Generic venue-type words that appear in both our names and Maps names and
# therefore carry no discriminating power.
# Qualifiers that carry no identity signal.
QUALIFIER_WORDS = {
    "bahrain", "hotel", "resort", "mall", "centre", "center", "city",
    "international", "branch", "the", "and",
    # "US" as in United States, "UK", "UAE" - country codes, not identity.
    "us", "uk", "uae", "ksa", "doha", "dubai", "abu",
}

GENERIC_WORDS = {
    "club", "lounge", "bar", "cafe", "coffee", "restaurant", "hotel",
    "shop", "store", "market", "mall", "resort", "beach", "pool", "nightclub",
    "house", "grill", "kitchen", "bakery", "the", "and", "by", "city",
    "centre", "center", "royal", "grand", "park", "garden", "dining",
    "lounge", "sports", "cinema", "theatre", "theater", "water", "play",
    "kids", "family", "arena", "studio", "lab", "tours", "tour", "cruise",
    "fishing", "diving", "jet", "ski", "kayaking", "paddleboarding",
    "pearl", "diving", "horse", "racing", "safari", "coral", "bay",
    "jazz", "music", "live", "brunch", "dinner", "seafood", "sunset",
    "nightlife", "cocktails", "sports", "trek", "hike", "camping",
}


def _all_tokens(name):
    """All alphabetic tokens, including 1-char brand initials like H&M.

    "H&M" -> {"h", "m"}; "H & M" -> {"h", "m"}.
    """
    return set(re.findall(r"[a-z]+", norm(name)))


def _content_tokens(name):
    """Tokens that carry identity: not generic venue words, not qualifiers."""
    all_t = _all_tokens(name)
    toks = {t for t in all_t if len(t) >= 3}
    toks -= GENERIC_WORDS
    toks -= QUALIFIER_WORDS
    if toks:
        return toks
    # A short brand name such as "H&M": keep its 1-2 char tokens.
    short = {t for t in all_t if len(t) <= 2}
    return short - QUALIFIER_WORDS


def is_same_venue(venue, rec):
    """Guard against matching a different venue that shares a token.

    'Vox' must not match 'VOX Cinemas' (a cinema, not a hotel lounge);
    'Gaucho' must not match 'Calexico'. The rule is that at least one
    CONTENT token of our venue name must appear in the Maps display name.
    Generic words (club, lounge, restaurant, ...) are ignored because they
    carry no discriminating power.
    """
    if rec is None:
        return False
    if not rec.get("in_bahrain"):
        return False
    a = _content_tokens(venue["venue_name"])
    b = _all_tokens(rec.get("name") or "")
    if not a:
        # Our name is entirely generic; fall back to a full-token match.
        a = _all_tokens(venue["venue_name"])
        if not a:
            return False
    # "Coral Bay Bahrain" -> Maps calls it "Coral Bay Hotel & Resort":
    # drop trailing country/qualifier words from our name.
    a = {t for t in a if t not in QUALIFIER_WORDS} or a
    # Strip the " - <Hotel>" suffix we use in our own content.
    base = clean_name(venue["venue_name"]).lower()
    base_tokens = {t for t in _all_tokens(base)
                   if t not in QUALIFIER_WORDS and len(t) >= 3}
    base_tokens = {t for t in base_tokens if t not in GENERIC_WORDS} or base_tokens
    if base_tokens & b:
        a = a | base_tokens
    rec_name = (rec.get("name") or "").lower()
    if not (a & b):
        # No content token matched. The venue may still be the same business
        # under a different label, so allow two escape hatches:
        #   (1) the venue's own website domain contains our token
        #   (2) the venue is a known alias of our name
        dom = (rec.get("website_domain") or "").lower()
        dom_ok = any(tok in dom for tok in a)
        aliases = ALIASES.get(norm(venue["venue_name"]), [])
        rec_key = re.sub(r"[^a-z0-9&]+", " ", rec_name).strip()
        alias_ok = any(al == rec_key or al in rec_key.split()
                       for al in aliases)
        # Maps renders brand stores as "Nike - City Centre Bahrain": the
        # brand token is present but may be spelled with different spacing.
        sub_ok = any(tok in rec_name for tok in a)
        if not (dom_ok or alias_ok or sub_ok):
            return False
    # Category compatibility: our page's category must not contradict the
    # Maps categories. "Vox" (a hotel lounge on our page) must not match
    # "VOX Cinemas" (a movie theatre).
    if not _category_compatible(venue, rec):
        return False
    return True


# Our page categories mapped onto Maps category vocabulary.
CATEGORY_MAP = {
    "nightclub": {"night club", "nightclub", "dance club", "disco club"},
    "lounge": {"lounge", "cocktail bar", "tiki bar", "lounge bar", "night club",
               "sports lounge", "shisha lounge", "hookah lounge", "bar"},
    "bar": {"bar", "pub", "sports bar", "beer bar", "cocktail bar", "wine bar"},
    "pub": {"pub", "irish pub", "sports bar", "bar"},
    "restaurant": {"restaurant", "steak house", "steakhouse", "eatery",
                   "bistro", "dining room", "grill", "seafood restaurant"},
    "cafe": {"cafe", "coffee shop", "bakery", "tea house", "patisserie"},
    "hotel": {"hotel", "resort", "apartment hotel", "guest house"},
    "beach club": {"beach club", "beach resort", "resort", "club", "swimming pool club"},
    "rooftop": {"lounge", "cocktail bar", "rooftop bar", "bar"},
    "gym": {"gym", "fitness center", "fitness centre", "sports complex"},
    "spa": {"spa", "wellness center", "day spa"},
    "attraction": {"fortress", "archaeological site", "castle", "historical landmark",
                   "museum", "mosque", "market", "mall", "amusement park",
                   "water park", "theme park", "zoo", "tourist attraction"},
    "shopping mall": {"shopping mall", "mall", "wholesale mall"},
    "brand": {"store", "clothing store", "footwear store", "jewelry store",
              "beauty supply store", "cosmetics store", "electronics store",
              "furniture store", "department store", "cafe", "coffee shop",
              "restaurant", "bakery", "shop"},
    "souq": {"market", "shopping mall", "wholesale mall"},
}


def _category_compatible(venue, rec):
    """Reject a Maps record whose category contradicts our stored category."""
    ours = (venue.get("cuisine") or "").strip().lower()
    if not ours:
        return True
    allowed = CATEGORY_MAP.get(ours)
    if allowed is None:
        return True
    cats = {c.lower() for c in (rec.get("categories") or [])}
    if not cats:
        return True
    # Exact or near match on the Maps side.
    for c in cats:
        if c in allowed or any(a in c for a in allowed):
            return True
    return False


def describe(rec):
    bits = [f"name={rec['name']}", f"place_id={rec['place_id']}"]
    if rec.get("address"):
        bits.append(f"address={rec['address']}")
    if rec.get("neighborhood"):
        bits.append(f"area={rec['neighborhood']}")
    if rec.get("rating") is not None:
        bits.append(f"rating={rec['rating']}")
    if rec.get("review_count") is not None:
        bits.append(f"reviews={rec['review_count']}")
    if rec.get("categories"):
        bits.append("categories=" + "/".join(rec["categories"][:4]))
    if rec.get("website"):
        bits.append(f"website={rec['website']}")
    if rec.get("hours"):
        h = rec["hours"]
        rngs = sorted({v["range"] for v in h.values() if v.get("range")})
        d0 = next((v.get("date") for v in h.values() if v.get("date")), None)
        if rngs:
            bits.append("hours=" + " | ".join(rngs[:4]))
        if d0:
            bits.append("hours_week_of=" + "-".join(str(x) for x in d0))
    bits.append("geo=in_bahrain" if rec.get("in_bahrain") else "geo=OUT_OF_BAHRAIN")
    return "; ".join(bits)


def run_one(venue, delay, max_tries=26):
    """Try the chain. Returns (match, url, raw, attempts, all_records)."""
    attempts = []
    all_recs = []
    raw = ""
    url = None
    for q in build_queries(venue):
        raw, url = ml.fetch(q)
        recs = ml.parse_records(raw)
        bh = [r for r in recs if r.get("in_bahrain")]
        attempts.append({"query": q, "url": url, "records": len(recs),
                         "in_bahrain": len(bh), "bytes": len(raw),
                         "place_payload": ml.has_place_payload(raw)})
        if bh:
            all_recs.extend(bh)
            good = [r for r in bh if is_same_venue(venue, r)]
            if good:
                best = max(good, key=lambda r: score_match(r, venue))
                if score_match(best, venue) >= 10:
                    return best, url, raw, attempts, all_recs
        if recs:
            all_recs.extend(recs)
        if len(attempts) >= max_tries:
            break
        time.sleep(delay)
    if all_recs:
        bh = [r for r in all_recs if r.get("in_bahrain")]
        good = [r for r in bh if is_same_venue(venue, r)]
        if not good:
            # A Bahrain record exists but it is a DIFFERENT venue (e.g. our
            # "Vox" vs "VOX Cinemas", our "Gaucho" vs "Calexico"). Record the
            # candidates for the audit trail but do not claim a match.
            return None, url, raw, attempts, all_recs
        best = max(good, key=lambda r: score_match(r, venue))
        return best, url, raw, attempts, all_recs
    return None, url, raw, attempts, all_recs


def process(key, v, results, lock, delay, counter):
    match, url, raw, attempts, all_recs = run_one(v, delay)
    safe = "".join(c if c.isalnum() else "_" for c in v["venue_name"])[:60]
    raw_path = os.path.join(RAW_DIR, f"{safe}.txt")
    with open(raw_path, "w", encoding="utf-8") as f:
        f.write(raw)
    entry = {
        "venue_name": v["venue_name"],
        "location_on_page": v.get("location"),
        "cuisine_on_page": v.get("cuisine"),
        "attempts": attempts,
        "url": url,
        "raw_file": os.path.relpath(raw_path, HERE),
        "records_found": len(all_recs),
        "in_bahrain_found": sum(1 for r in all_recs if r.get("in_bahrain")),
        "match": match,
        "match_score": score_match(match, v) if match else 0,
        "observed": describe(match) if match else "no matching Maps record returned",
    }
    with lock:
        results[key] = entry
        with open(RESULTS, "w", encoding="utf-8") as f:
            json.dump(results, f, indent=2, ensure_ascii=False)
        counter[0] += 1
        n = counter[0]
        flag = "HIT " if match else "MISS"
        print(f"[{n}] {flag} {v['venue_name'][:36]:36} -> "
              f"{(match['place_id'] if match else 'none')} "
              f"score={entry['match_score']} bh={entry['in_bahrain_found']} "
              f"tries={len(attempts)}", flush=True)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=int, default=0)
    ap.add_argument("--out", default=RESULTS)
    ap.add_argument("--resume", action="store_true")
    ap.add_argument("--delay", type=float, default=0.6)
    ap.add_argument("--workers", type=int, default=6)
    args = ap.parse_args()

    os.makedirs(RAW_DIR, exist_ok=True)
    inv = json.load(open(INVENTORY, encoding="utf-8"))
    venues = inv["rows"]

    by_name = {}
    for v in venues:
        by_name.setdefault(norm(v["venue_name"]), v)

    results = {}
    if args.resume and os.path.exists(args.out):
        results = json.load(open(args.out, encoding="utf-8"))

    names = [n for n in sorted(by_name.keys()) if n not in results]
    if args.limit:
        names = names[: args.limit]

    print(f"Looking up {len(names)} venues with {args.workers} workers", flush=True)
    lock = threading.Lock()
    counter = [0]
    with ThreadPoolExecutor(max_workers=args.workers) as ex:
        futs = [ex.submit(process, n, by_name[n], results, lock, args.delay, counter)
                for n in names]
        for f in futs:
            f.result()

    print(f"\nDone. {len(results)} venues looked up -> {args.out}")


if __name__ == "__main__":
    main()
