#!/usr/bin/env python3
"""
Bahrain-scoped Google Maps place lookup.

Two findings from method testing (2026-11-20) shaped this module:

1. The public `tbm=map` endpoint only returns PLACE RECORDS when the query
   carries a concrete locality token. "Starbucks Bahrain" returns a map-tile
   fallback with zero places; "Starbucks City Centre Bahrain" returns the
   place. Adding the bare word "Bahrain" frequently BREAKS the search.

2. A place-token chain is needed, and results must be geo-filtered: a query
   for a global brand can return the same brand in Sydney or Bangkok.

A result is accepted only if its coordinates fall inside Bahrain's bounding
box (lat 25.70-26.42, lng 50.30-50.90) OR its address names a Bahrain
locality. Everything else is recorded but marked out-of-country.

Every accepted record carries the exact request URL so a human can re-open it.
"""
import json
import re
import subprocess
import sys
import time
import urllib.parse

UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
)
ENDPOINT = "https://www.google.com/search?tbm=map&authuser=0&hl=en&gl=bh&q={q}"

PLACE_ID_RE = re.compile(r"ChIJ[A-Za-z0-9_-]{20,}")
HOURS_RE = re.compile(r"\b(Closed|closed)\b")
WEEKDAYS = ("Monday", "Tuesday", "Wednesday", "Thursday",
            "Friday", "Saturday", "Sunday")

# Bahrain bounding box (generous, includes offshore islands).
BH_LAT = (25.70, 26.42)
BH_LNG = (50.30, 50.90)

# Bahrain locality tokens that may appear in a formatted address.
BH_TOKENS = [
    "manama",
    "seef",
    "juffair",
    "adliya",
    "amwaj",
    "budaiya",
    "muharraq",
    "riffa",
    "saar",
    "sitra",
    "diyar al muharraq",
    "sanabis",
    "al nai'm",
    "al naiem",
    "qudaibiya",
    "zallaq",
    "hidd",
    "awali",
    "jidda",
    "al seef",
    "block 338",
    "isa town",
    "diplomatic area",
    "bahrain bay",
    "al ain",
    "karbabad",
    "al shabab",
    "al khuwair",
    "al mashroor",
    "east riffa",
    "saint joseph",
    "umm al hassam",
    "al musalama",
    "busaiteen",
    "admiral",
    "al juffair",
    "al muharrraq",
    "al bouhoul",
    "al muhaisir",
    "al quraya",
    "muharraq islands",
    "al muhaisir",
]

# Non-Bahrain places that must never be accepted.
FOREIGN_MARKERS = [
    "australia", "sydney", "melbourne", "chadstone", "bangkok", "thailand",
    "dubai", "uae", "abu dhabi", "doha", "qatar", "riyadh", "jeddah", "saudi",
    "saudi arabia", "kuwait", "oman", "muscat", "cairo", "egypt", "amman",
    "jordan", "india", "mumbai", "delhi", "bangalore", "pakistan", "karachi",
    "istanbul", "turkey", "singapore", "malaysia", "kuala lumpur", "london",
    "manchester", "united kingdom", "england", "new york", "usa", "chicago",
    "los angeles", "germany", "france", "paris", "italy", "milan", "spain",
    "madrid", "netherlands", "amsterdam", "russia", "moscow", "china",
    "shanghai", "beijing", "japan", "tokyo", "hong kong", "taiwan",
    "philippines", "manila", "indonesia", "jakarta", "vietnam", "hanoi",
    "brazil", "sao paulo", "mexico", "sweden", "stockholm", "norway",
    "denmark", "copenhagen", "finland", "poland", "austria", "vienna",
    "switzerland", "zurich", "south africa", "cape town", "johannesburg",
    "morocco", "casablanca", "tunisia", "algeria", "lebanon", "beirut",
    "syria", "iraq", "baghdad", "tehran", "iran", "afghanistan", "kabul",
    "portugal", "lisbon", "greece", "athens", "czech", "prague", "hungary",
    "budapest", "romania", "bulgaria", "serbia", "croatia", "belgium",
    "brussels", "ireland", "dublin", "scotland", "edinburgh", "new zealand",
    "argentina", "buenos aires", "chile", "santiago", "colombia", "peru",
    "lima", "hong kong", "macau", "taipei", "kyoto", "osaka", "seoul",
    "korea", "beijing", "shenzhen", "guangzhou", "chengdu", "shenzhen",
]


def fetch(query: str, timeout: int = 30):
    q = urllib.parse.quote_plus(query)
    url = ENDPOINT.format(q=q)
    out = subprocess.run(
        ["curl", "-sL", "--max-time", str(timeout), "-A", UA,
         "-H", "Accept-Language: en-BH,en;q=0.9", url],
        capture_output=True, text=True,
    )
    return out.stdout, url


def _loads(text: str):
    text = text.strip()
    if text.startswith(")]}'"):
        text = text[4:]
    text = text.strip()
    try:
        return json.loads(text)
    except Exception:
        pass
    fixed = re.sub(r"(?<![\"\\\w])([A-Za-z][A-Za-z0-9_.\-]*)(?![\"\\\w])", r'"\1"', text)
    fixed = fixed.replace("'", '"')
    try:
        return json.loads(fixed)
    except Exception:
        return None


def _iter_records(data):
    stack = [data]
    while stack:
        node = stack.pop()
        if isinstance(node, list):
            if len(node) > 60 and PLACE_ID_RE.search(json.dumps(node)):
                yield node
            for x in node:
                stack.append(x)
        elif isinstance(node, dict):
            for v in node.values():
                stack.append(v)


def _hours_from_record(rec):
    hours = {}
    for el in rec:
        if not isinstance(el, list) or not el:
            continue
        days = None
        if isinstance(el[0], list) and el[0] and isinstance(el[0][0], list) \
                and el[0][0] and isinstance(el[0][0][0], str) and el[0][0][0] in WEEKDAYS:
            days = el[0]
        elif isinstance(el[0], list) and el[0] and isinstance(el[0][0], str) \
                and el[0][0] in WEEKDAYS:
            days = [el[0]]
        if days is None:
            continue
        for day_entry in days:
            if not isinstance(day_entry, list) or not day_entry:
                continue
            head = day_entry[0]
            if not (isinstance(head, str) and head in WEEKDAYS):
                continue
            date = day_entry[2] if len(day_entry) > 2 else None
            slots = day_entry[3] if len(day_entry) > 3 else None
            rendered = None
            if isinstance(slots, list) and slots:
                first = slots[0]
                if isinstance(first, list) and first and isinstance(first[0], str):
                    rendered = first[0]
            hours[head] = {"range": rendered, "date": date}
    return hours


def _rec_from_list(rec):
    def g(i):
        return rec[i] if i < len(rec) else None

    blob = json.dumps(rec)
    pid = PLACE_ID_RE.search(blob)
    out = {
        "place_id": pid.group(0) if pid else None,
        "name": None, "address": None, "neighborhood": None,
        "rating": None, "review_count": None, "reviews_label": None,
        "website": None, "website_domain": None, "categories": [],
        "status": None, "lat": None, "lng": None, "cid": None,
        "hours": {}, "maps_url": None, "in_bahrain": None,
    }
    addr = g(2)
    if isinstance(addr, list) and all(isinstance(x, str) for x in addr):
        out["address"] = ", ".join(x for x in addr if x)
    meta = g(4)
    if isinstance(meta, list):
        if len(meta) > 3 and isinstance(meta[3], list) and len(meta[3]) > 1:
            out["reviews_label"] = meta[3][1]
        if len(meta) > 8 and isinstance(meta[8], (int, float)):
            out["review_count"] = meta[8]
        if len(meta) > 7 and isinstance(meta[7], (int, float)):
            out["rating"] = meta[7]
    web = g(7)
    if isinstance(web, list) and web:
        if isinstance(web[0], str) and web[0].startswith("http"):
            out["website"] = web[0].split(",")[0]
        if len(web) > 1 and isinstance(web[1], str):
            out["website_domain"] = web[1]
    coord = g(9)
    if isinstance(coord, list) and len(coord) == 4:
        if isinstance(coord[2], (int, float)) and isinstance(coord[3], (int, float)):
            out["lat"], out["lng"] = coord[2], coord[3]
    cid = g(10)
    if isinstance(cid, str) and cid.startswith("0x"):
        out["cid"] = cid
    name = g(11)
    if isinstance(name, str):
        out["name"] = name
    cats = g(13)
    if isinstance(cats, list) and all(isinstance(x, str) for x in cats):
        out["categories"] = cats
    hood = g(14)
    if isinstance(hood, str):
        out["neighborhood"] = hood
    full = g(18)
    if isinstance(full, str) and out["address"] is None:
        out["address"] = full

    if isinstance(name, str) and HOURS_RE.search(name):
        out["status"] = name
    out["hours"] = _hours_from_record(rec)

    if out["place_id"]:
        out["maps_url"] = (
            "https://www.google.com/maps/place/?q=place_id:" + out["place_id"]
        )

    # Bahrain scoping.
    geo_ok = None
    if out["lat"] is not None and out["lng"] is not None:
        geo_ok = (BH_LAT[0] <= out["lat"] <= BH_LAT[1]
                  and BH_LNG[0] <= out["lng"] <= BH_LNG[1])
    blob_low = " ".join([
        out.get("address") or "", out.get("neighborhood") or "",
        " ".join(out.get("categories") or []),
    ]).lower()
    token_ok = any(t in blob_low for t in BH_TOKENS)
    foreign = [f for f in FOREIGN_MARKERS if f in blob_low]
    out["foreign_markers"] = foreign
    if geo_ok is True:
        out["in_bahrain"] = True
    elif foreign:
        out["in_bahrain"] = False
    elif token_ok:
        out["in_bahrain"] = True
    else:
        out["in_bahrain"] = False
    return out


def parse_records(raw: str) -> list:
    data = _loads(raw)
    if data is None:
        return []
    records, seen = [], set()
    for rec in _iter_records(data):
        out = _rec_from_list(rec)
        if not out["place_id"] or out["place_id"] in seen:
            continue
        if not out["name"] or len(out["name"]) > 80:
            continue
        seen.add(out["place_id"])
        records.append(out)
    return records


def has_place_payload(raw: str) -> bool:
    return "ChIJ" in raw


def lookup(query: str, retries: int = 1):
    last = None
    for attempt in range(retries + 1):
        raw, url = fetch(query)
        recs = parse_records(raw)
        if recs:
            return recs, url, raw
        last = (recs, url, raw)
        time.sleep(1.0 * (attempt + 1))
    return last


if __name__ == "__main__":
    q = " ".join(sys.argv[1:])
    recs, url, raw = lookup(q)
    print("URL:", url)
    print("raw bytes:", len(raw), "place_payload:", has_place_payload(raw))
    print("records:", len(recs))
    for r in recs:
        print(json.dumps(r, ensure_ascii=False, indent=2))
