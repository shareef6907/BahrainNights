#!/usr/bin/env python3
"""
Venue inventory extractor for bahrainnights.com guide/listicle pages.

Handles two shapes of venue data in the page source:
  A. object literals  { name: '...', location: '...', rating: 4.5, ... }
  B. `recommended: ['A', 'B', ...]` arrays nested inside timeline objects

Noise filters are applied so that amenity lists ("Private Beach", "Spa",
"150-280 BHD") and site furniture ("BahrainNights", "Guides") are excluded.

Read-only: never writes to site source.
"""
import json
import os
import re
import sys

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
APP = os.path.join(REPO, "src", "app")

GUIDE_PAGES = {
    "/best-restaurants-bahrain": "best-restaurants-bahrain/page.tsx",
    "/best-brunches-bahrain": "best-brunches-bahrain/page.tsx",
    "/best-cafes-bahrain": "best-cafes-bahrain/page.tsx",
    "/best-hotels-bahrain": "best-hotels-bahrain/page.tsx",
    "/bahrain-nightlife-guide": "bahrain-nightlife-guide/page.tsx",
    "/ladies-night-bahrain": "ladies-night-bahrain/page.tsx",
    "/nightlife-bahrain": "nightlife-bahrain/page.tsx",
    "/weekend-in-bahrain": "weekend-in-bahrain/page.tsx",
    "/things-to-do-in-bahrain": "things-to-do-in-bahrain/page.tsx",
    "/explore/shopping": "explore/shopping/page.tsx",
    "/explore/spas": "explore/spas/page.tsx",
    "/guides/malls": "guides/malls/page.tsx",
    "/guides/souks": "guides/souks/page.tsx",
    "/guides/brands": "guides/brands/page.tsx",
    "/guides/best-turkish-restaurants-bahrain": "guides/best-turkish-restaurants-bahrain/page.tsx",
    "/guides/best-steakhouses-bahrain": "guides/best-steakhouses-bahrain/page.tsx",
    "/guides/best-mexican-restaurants-bahrain": "guides/best-mexican-restaurants-bahrain/page.tsx",
    "/guides/best-lebanese-restaurants-bahrain": "guides/best-lebanese-restaurants-bahrain/page.tsx",
    "/guides/best-korean-restaurants-bahrain": "guides/best-korean-restaurants-bahrain/page.tsx",
    "/guides/best-fine-dining-bahrain": "guides/best-fine-dining-bahrain/page.tsx",
}

NAME_KEYS = ("name", "venue", "venue_name", "restaurant", "hotel", "cafe", "place", "brand", "mall", "souk")
LOC_KEYS = ("location", "area", "area_name", "hotel", "address", "city", "neighborhood", "location_name", "region")
STR_RE = re.compile(r"'((?:[^'\\]|\\.)*)'|\"((?:[^\"\\]|\\.)*)\"|`((?:[^`\\]|\\.)*)`")

# Site furniture / non-venues.
STOPLIST = {
    "bahrainnights", "manama", "adliya", "juffair", "seef", "amwaj", "budaiya",
    "muharraq", "riffa", "sitra", "saar", "block 338", "bahrain", "guides",
    "four seasons", "ritz-carlton", "gulf hotel", "intercontinental",
    "souq al baraha", "brands", "malls", "souks", "hotels", "cafes",
}

# Amenity / price / marketing strings that are not venue names.
NOISE_PATTERNS = [
    r"^\d+[\-–]\d+\s*BHD$", r"BHD$", r"^\d+%",
    r"^(Private|Public|Indoor|Outdoor|Rooftop|Beachfront|Poolside|Live|Sunset)?\s*(Beach|Pool|Spa|Gym|Sauna)",
    r"^(Multiple|Family|Private|Excellent|Modern|Luxury|Iconic|Legendary|Palatial|Contemporary|Classic)\s",
    r"^(Business|Beach|Lagoon|Kids|Convention|Water|Inf|Yacht|Celebrity|Personal|Private|Ultimate|Largest|Outstanding)",
    r"^(Award|Iconic|Newest|Best|Famous|Premium|Signature)$",
    r"(seeking|travelers|enthusiasts|honeymoons|families|lovers|couples)$",
    r"^(Day \d|Perfect|Find your|Complete guide|Discover |Explore |Best )",
    r"^(Guests|Amenities|Highlights|Specialties|Hours|Price|Rating|Location|Area|Dress code|Opening)$",
    r"^(BHD|BD)$", r"^City Centre Bahrain$", r"^Bahrain Bay$", r"^Seef District$",
]


def strip_ts(text: str) -> str:
    text = re.sub(r"/\*.*?\*/", " ", text, flags=re.S)
    text = re.sub(r"//[^\n]*", " ", text)
    text = re.sub(r"\bas\s+const\b", " ", text)
    text = re.sub(r"\bas\s+[A-Za-z_][\w<>\[\]\. ]*", " ", text)
    text = re.sub(r"\bsatisfies\s+[A-Za-z_][\w<>\[\]\.]*", " ", text)
    return text


def all_objects(text: str):
    stack = []
    for i, ch in enumerate(text):
        if ch == "{":
            stack.append(i)
        elif ch == "}" and stack:
            start = stack.pop()
            yield text[start : i + 1]


def get_str(obj: str, key: str):
    m = re.search(r"(?:^|[{,]\s*)" + re.escape(key) + r"\s*:\s*", obj)
    if not m:
        return None
    rest = obj[m.end():].lstrip()
    sm = STR_RE.match(rest)
    if not sm:
        return None
    val = sm.group(1) or sm.group(2) or sm.group(3) or ""
    val = (
        val.replace("\\'", "'").replace('\\"', '"').replace("\\n", " ")
        .replace("\\&", "&").replace("\\\\", "\\")
    )
    return val.strip()


def get_num(obj: str, key: str):
    m = re.search(r"(?:^|[{,]\s*)" + re.escape(key) + r"\s*:\s*(-?\d+(?:\.\d+)?)", obj)
    return float(m.group(1)) if m else None


def is_noise(name: str) -> bool:
    n = name.strip()
    if not n or len(n) > 70:
        return True
    low = n.lower()
    if low in STOPLIST:
        return True
    for pat in NOISE_PATTERNS:
        if re.search(pat, n, re.I):
            return True
    return False


def main():
    rows = []
    page_counts = {}
    for slug, rel in GUIDE_PAGES.items():
        path = os.path.join(APP, rel)
        if not os.path.exists(path):
            print(f"MISSING PAGE FILE: {slug} -> {rel}", file=sys.stderr)
            continue
        text = strip_ts(open(path, encoding="utf-8").read())
        found = {}

        def add(name, loc=None, cuisine=None, hours=None, phone=None, website=None,
                insta=None, rating=None, desc=None, kind="object"):
            n = (name or "").strip()
            if is_noise(n):
                return
            key = n.lower()
            rec = {
                "guide_page": slug, "venue_name": n,
                "source_file": f"src/app/{rel}", "data_kind": kind,
                "location": loc, "cuisine": cuisine, "hours": hours, "phone": phone,
                "website": website, "instagram": insta, "rating": rating,
                "description": (desc or "")[:400],
            }
            prev = found.get(key)
            if prev is None:
                found[key] = rec
            else:
                found[key] = rec if sum(1 for v in rec.values() if v) > sum(1 for v in prev.values() if v) else prev

        # A. object literals
        for obj in all_objects(text):
            name = None
            for k in NAME_KEYS:
                name = get_str(obj, k)
                if name:
                    break
            if not name:
                continue
            location = next((get_str(obj, k) for k in LOC_KEYS if get_str(obj, k)), None)
            rating = get_num(obj, "rating") or get_num(obj, "score") or get_num(obj, "stars")
            cuisine = get_str(obj, "cuisine") or get_str(obj, "category") or get_str(obj, "type")
            hours = get_str(obj, "hours") or get_str(obj, "opening_hours") or get_str(obj, "time")
            phone = get_str(obj, "phone") or get_str(obj, "tel") or get_str(obj, "whatsapp")
            website = get_str(obj, "website") or get_str(obj, "url") or get_str(obj, "link")
            insta = get_str(obj, "instagram")
            desc = get_str(obj, "desc") or get_str(obj, "description") or get_str(obj, "note")
            signals = sum(1 for v in (location, rating, cuisine, hours, phone, website, insta, desc) if v)
            if signals < 1:
                continue
            add(name, location, cuisine, hours, phone, website, insta, rating, desc, "object")

        # B. `recommended: [...]` arrays (all occurrences, not just the first)
        for m in re.finditer(r"(?:^|[{,]\s*)recommended\s*:\s*\[", text):
            i = m.end() - 1
            depth = 0
            j = len(text) - 1
            for k in range(i, len(text)):
                if text[k] == "[":
                    depth += 1
                elif text[k] == "]":
                    depth -= 1
                    if depth == 0:
                        j = k
                        break
            arr = text[i : j + 1]
            for sm in STR_RE.finditer(arr):
                add(sm.group(1) or sm.group(2) or sm.group(3), kind="recommended_array")

        page_counts[slug] = len(found)
        rows.extend(found.values())

    here = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(here, "inventory.json"), "w", encoding="utf-8") as f:
        json.dump({"pages": page_counts, "rows": rows}, f, indent=2, ensure_ascii=False)

    total = 0
    for s, c in page_counts.items():
        print(f"  {s}: {c}")
        total += c
    print(f"TOTAL page-venue pairs: {total}")
    print(f"DISTINCT venue names: {len({r['venue_name'].lower() for r in rows})}")


if __name__ == "__main__":
    main()
