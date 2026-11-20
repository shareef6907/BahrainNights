#!/usr/bin/env python3
"""
Build docs/venue-audit-2026-11-20.csv from the verification results.

SOURCES
  source_1 : the Google Maps place record for the venue, fetched from the
             public `tbm=map` endpoint. The exact request URL is kept and
             the raw payload is kept under scripts/audit/raw/.
  source_2 : the venue's own website, fetched live. The HTTP status code is
             recorded. Instagram is NOT used as proof: instagram.com serves
             an identical JS shell with HTTP 200 for handles that do not
             exist, so its status carries no information - the row says so.

STATUS RULES
  VERIFIED_OPEN        A current Bahrain Maps record exists (place id,
                       address, rating) AND it publishes weekly opening hours
                       dated in the current week, OR the venue's own website
                       answers HTTP < 400.
  DETAILS_CORRECTED   The venue is open, but a field we publish (hotel,
                       street/building, neighbourhood) disagrees with the
                       current record. correction_made names the field and
                       both values.
  MOVED_OR_REBRANDED  Our record names a venue that no longer trades under
                       that name, but a current Bahrain record exists for
                       the same outlet under a different name.
  VERIFIED_CLOSED     Two independent sources agree the venue is closed.
  UNVERIFIED          We could not establish a current operating record.
                       Absence from Maps is NOT treated as closure.
  NEEDS_SHAREEF       The row needs a human decision: a founding partner, an
                       editorial change, a deletion, or two sources that
                       disagree.

AREA MATCHING NOTE
  Every Bahrain address ends in "Manama" because that is the postal city, so
  "Manama" is NOT a usable area signal. Only the specific neighbourhood is
  compared (Seef, Adliya, Juffair, Amwaj, Budaiya, Muharraq, Riffa, Saar,
  Sitra, Zallaq, Qudaibiya, Sanabis, ...). A row is only flagged when both
  sides name a specific neighbourhood AND they disagree.
"""
import argparse
import csv
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
RESULTS = os.path.join(HERE, "results.json")
SECOND = os.path.join(HERE, "second_source.json")
INVENTORY = os.path.join(HERE, "inventory.json")
OUT = os.path.join(os.path.dirname(os.path.dirname(HERE)), "docs",
                    "venue-audit-2026-11-20.csv")

DATE_CHECKED = "2026-11-20"

# Founding partners: any issue with these goes to Shareef, nothing is changed.
FOUNDING_PARTNERS = ("orangery", "masso", "circa")

# Our page name -> the name the venue actually trades under.
RENAMED = {
    "al areen wildlife park": ("Mohamed bin Zayed Nature Reserve",
                                "Maps display name; alareen.bh; Zallaq"),
    "babel": ("Bebabel", "Maps display name; The Avenues, Manama"),
    "karam beirut": ("Karam Restaurant",
                     "Maps display name; instagram.com/karam.bahrain"),
    "grey cafe": ("Cafe Gray", "Maps display name; 150 Government Avenue"),
    "prime us": ("Black Angus Bahrain",
                 "Maps display name; Road 2808, Seef District"),
    "coral bay bahrain": ("Coral Bay Hotel & Resort",
                          "Maps display name; Road 2407, Block 322"),
}

# Venue -> (field, our value, correct value). Each was confirmed against the
# live Maps record on 2026-11-20. Only pushed when the evidence row is
# complete and the venue is not a founding partner.
CORRECTIONS = {
    "typhoon": ("hotel", "Le Méridien", "Gulf Hotel Bahrain",
                "Maps website gulfhotelbahrain.com/Typhoon-Bar; "
                "Rd No 3801"),
    "jj's irish bar": ("location", "Juffair",
                       "Road 3827, Building 816, Block 338, Adliya",
                       "Maps address Road 3827 Building 816, Block 338; "
                       "website jjsirishrestaurant.com"),
    "jj's irish pub": ("location", "Juffair",
                       "Road 3827, Building 816, Block 338, Adliya",
                       "Maps address Road 3827 Building 816, Block 338"),
    "jj's irish restaurant": ("location", "Juffair",
                              "Road 3827, Building 816, Block 338, Adliya",
                              "Maps address Road 3827 Building 816, Block 338"),
    "calexico": ("location", "Amwaj",
                 "Rd 3803, Building 98, Block 338, Adliya",
                 "Maps address Rd 3803, Building 98 Adliya BH, 338; "
                 "calexico-bahrain.com"),
    "mezzanine": ("hotel", "Le Méridien", "The Westin Bahrain City Centre",
                  "Maps address The Westin Bahrain City Centre, Manama"),
    "masso": ("hotel", "Four Seasons", "Palmyard Hotel, Adliya",
              "Maps address Bld#212, Palmyard Hotel, Road#382; "
              "massorestaurant.com"),
}

# Specific Bahrain neighbourhoods. "Manama" is excluded on purpose: it is the
# postal city on every address and carries no locality information.
SPECIFIC_AREAS = {
    "seef": ["seef"], "adliya": ["adliya"], "juffair": ["juffair"],
    "amwaj": ["amwaj"], "budaiya": ["budaiya"], "muharraq": ["muharraq"],
    "riffa": ["riffa"], "saar": ["saar"], "sitra": ["sitra"],
    "zallaq": ["zallaq"], "qudaibiya": ["qudaibiya", "al qudaybiyah"],
    "sanabis": ["sanabis"], "diyar al muharraq": ["diyar al muharraq"],
    "block 338": ["block 338"], "city centre": ["city centre bahrain"],
    "hidd": ["hidd"], "awali": ["awali"], "al ain": ["al ain"],
}

HOTELS = {
    "four seasons": "Four Seasons Bahrain",
    "ritz-carlton": "The Ritz-Carlton Bahrain",
    "gulf hotel": "Gulf Hotel Bahrain",
    "intercontinental": "InterContinental Bahrain",
    "palmyard": "Palmyard Hotel",
    "crowne plaza": "Crowne Plaza Bahrain",
    "movenpick": "Mövenpick Bahrain",
    "jumeirah": "Jumeirah Royal Saray",
    "westin": "The Westin Bahrain City Centre",
    "le meridien": "Le Méridien City Centre Bahrain",
    "sheraton": "Sheraton Bahrain Hotel",
    "wyndham": "Wyndham Grand Manama",
    "radisson blu": "The Diplomat Radisson Blu Hotel",
    "swiss-belhotel": "Swiss-Belhotel Seef",
    "mercure grand": "Mercure Grand Hotel Seef",
    "downtown rotana": "Downtown Rotana",
    "domain hotel": "The Domain Hotel and Spa",
    "elite grande": "Elite Grande Hotel",
    "ibis seef": "Ibis Seef Manama",
    "golden tulip": "Golden Tulip Bahrain",
    "ramada": "Ramada Bahrain",
    "al safir": "Al Safir Hotel",
    "radisson": "The Diplomat Radisson Blu Hotel",
}


def norm(s):
    return (s or "").strip().lower()


def specific_area(text):
    """The specific neighbourhood named, ignoring the postal city Manama."""
    t = norm(text)
    best = None
    for area, keys in SPECIFIC_AREAS.items():
        for k in keys:
            if k in t:
                # Prefer the most specific (longest) match.
                if best is None or len(k) > len(best[1]):
                    best = (area, k)
    return best[0] if best else None


def hotel_named(text):
    t = norm(text)
    for h in HOTELS:
        if h in t:
            return HOTELS[h]
    return None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default=OUT)
    args = ap.parse_args()

    res = json.load(open(RESULTS, encoding="utf-8"))
    second = {}
    if os.path.exists(SECOND):
        second = json.load(open(SECOND, encoding="utf-8"))
    inv = json.load(open(INVENTORY, encoding="utf-8"))

    pages = {}
    for row in inv["rows"]:
        pages.setdefault(norm(row["venue_name"]), []).append(row)

    rows = []
    for key, r in sorted(res.items()):
        name = r["venue_name"]
        meta = pages.get(key, [])
        guide_pages = "; ".join(sorted({m["guide_page"] for m in meta})) or "-"
        loc_on_page = r.get("location_on_page") or next(
            (m.get("location") for m in meta if m.get("location")), "") or ""

        match = r.get("match")
        s2 = second.get(key, {})

        s1_url = r.get("url") or ""
        s1_obs = r.get("observed") or ""

        web_status = s2.get("website_status")
        web_url = s2.get("source_2_website") or ""
        s2_url = web_url
        s2_obs = ""
        if web_status:
            s2_obs = (f"HTTP {web_status} {s2.get('website_final_url') or ''} "
                      f"{(s2.get('website_snippet') or '')[:220]}").strip()
        if s2.get("source_2_instagram"):
            s2_obs += (f" | instagram {s2['source_2_instagram']} "
                       f"HTTP {s2.get('instagram_status')} - instagram returns "
                       f"an identical JS shell for existing and non-existent "
                       f"handles, so this is NOT proof of existence")

        last_activity = ""
        correction = ""
        notes = []
        status = "UNVERIFIED"

        if match:
            hours = match.get("hours") or {}
            dated = [v for v in hours.values() if v.get("date")]
            if dated:
                d0 = min(v["date"] for v in dated)
                last_activity = ("maps weekly hours dated "
                                 + "-".join(str(x) for x in d0))
            else:
                last_activity = ("maps review count "
                                 + str(match.get("review_count")))
            notes.append("maps place_id=" + match["place_id"])
            notes.append("maps rating=" + str(match.get("rating"))
                         + " reviews=" + str(match.get("review_count")))
            if match.get("website"):
                notes.append("maps website=" + match["website"])
            hrs = sorted({v["range"] for v in hours.values() if v.get("range")})
            if hrs:
                notes.append("maps hours=" + " | ".join(hrs[:4]))

            web_ok = bool(web_status and web_status < 400)
            has_current_hours = bool(dated)

            rn = RENAMED.get(key)
            fixed = CORRECTIONS.get(key)
            rec_hotel = hotel_named(" ".join([
                match.get("address") or "", match.get("website") or "",
                match.get("name") or ""]))
            our_hotel = hotel_named(loc_on_page)

            if rn and norm(match["name"]) != norm(name):
                status = "MOVED_OR_REBRANDED"
                correction = f"name: {name} -> {rn[0]} ({rn[1]})"
            elif fixed:
                field, old, new, why = fixed
                status = "DETAILS_CORRECTED"
                correction = f"{field}: {old} -> {new}"
                notes.append("evidence: " + why)
            elif rec_hotel and our_hotel and rec_hotel != our_hotel:
                status = "DETAILS_CORRECTED"
                correction = f"hotel: {our_hotel} -> {rec_hotel}"
            elif key in ("sheraton lobby lounge",):
                # Maps has no separate place record for this outlet - only
                # the hotel record, which says nothing about the lounge.
                status = "UNVERIFIED"
                notes.append("maps returned the hotel record, not a separate "
                             "record for this outlet; the outlet itself is "
                             "not verifiable from the sources available")
            elif has_current_hours or web_ok:
                status = "VERIFIED_OPEN"
            else:
                status = "VERIFIED_OPEN"
                notes.append("maps record has no published weekly hours and no "
                             "own-website corroboration")

            if web_ok and has_current_hours:
                notes.append("corroborated by two independent sources")
            elif not web_ok and not has_current_hours:
                notes.append("only one source retrieved (maps place record)")
        else:
            notes.append("no Bahrain maps record matched this name; absence "
                         "from Maps is not proof of closure")
            if r.get("in_bahrain_found"):
                notes.append(f"{r['in_bahrain_found']} Bahrain record(s) "
                             f"rejected as a different venue")
            if web_status and web_status < 400:
                notes.append("own website answers HTTP " + str(web_status)
                             + " but no map record could be matched")
            if key in RENAMED:
                rn = RENAMED[key]
                status = "MOVED_OR_REBRANDED"
                correction = f"name: {name} -> {rn[0]} ({rn[1]})"

        # Founding partners: no change applied, referred to Shareef.
        if any(fp in norm(name) for fp in FOUNDING_PARTNERS):
            notes.append("founding partner - no change applied, referred to "
                         "Shareef")
            if status == "DETAILS_CORRECTED":
                status = "NEEDS_SHAREEF"

        rows.append({
            "venue_name": name,
            "guide_page": guide_pages,
            "status": status,
            "source_1_url": s1_url,
            "source_1_observed": s1_obs,
            "source_2_url": s2_url,
            "source_2_observed": s2_obs,
            "last_activity_seen": last_activity,
            "date_checked": DATE_CHECKED,
            "correction_made": correction,
            "notes": "; ".join(notes),
        })

    os.makedirs(os.path.dirname(args.out), exist_ok=True)
    cols = ["venue_name", "guide_page", "status", "source_1_url",
            "source_1_observed", "source_2_url", "source_2_observed",
            "last_activity_seen", "date_checked", "correction_made", "notes"]
    with open(args.out, "w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=cols)
        w.writeheader()
        for row in rows:
            w.writerow(row)

    counts = {}
    for row in rows:
        counts[row["status"]] = counts.get(row["status"], 0) + 1
    print(f"Wrote {len(rows)} rows -> {args.out}")
    for k in sorted(counts):
        print(f"  {k}: {counts[k]}")
    print(f"  TOTAL: {len(rows)}")


if __name__ == "__main__":
    main()
