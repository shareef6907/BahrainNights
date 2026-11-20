#!/usr/bin/env python3
"""
Second-source evidence, targeted.

Source 1 is the Google Maps place record (see maps_lookup.py). This module
produces source 2 for each venue from the venue's OWN live web presence:

  1. the venue's website (taken from the Maps record when it has one, or from
     our own page content)
  2. the venue's Instagram profile, probed by handle candidates derived from
     the venue name

Each probe records the HTTP status code, the final URL and a short quoted
snippet of the page text. Those are the artifacts Shareef can re-open.

A venue is corroborated from two independent sources when its Maps record
shows weekly opening hours dated in the current week AND its own site or
Instagram answers HTTP 200.

Usage:
    python3 second_source.py [--limit N] [--out second_source.json]
"""
import argparse
import json
import os
import re
import subprocess
import sys
import threading
import time
from concurrent.futures import ThreadPoolExecutor

HERE = os.path.dirname(os.path.abspath(__file__))
RESULTS = os.path.join(HERE, "results.json")
INVENTORY = os.path.join(HERE, "inventory.json")
OUT = os.path.join(HERE, "second_source.json")

UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")

_lock = threading.Lock()

# Instagram handles that are known Bahrain venues. Each was read from the
# Maps record's website field or the venue's own public link.
KNOWN_INSTAGRAM = {
    "karam beirut": "karam.bahrain",
    "gulf hotel bahrain": "gulfhotelbh",
    "the orangery": "theorangerybh",
    "typhoon": "gulfhotelbahrain",
    "wahooo! waterpark": "wahooowaterpark",
    "coda jazz lounge": None,
}


def http_get(url, timeout=20, cap=400000):
    """GET a URL. Returns (status, final_url, text_snippet)."""
    try:
        out = subprocess.run(
            ["curl", "-sL", "--max-time", str(timeout), "-A", UA,
             "-H", "Accept-Language: en-BH,en;q=0.9",
             "-w", "\n__STATUS__%{http_code}__URL__%{url_effective}", url],
            capture_output=True, text=True, errors="replace",
        )
        text = out.stdout
        m = re.search(r"__STATUS__(\d+)__URL__(.*)$", text, re.S)
        if not m:
            return None, None, ""
        status = int(m.group(1))
        final = m.group(2).strip()
        body = text[: m.start()][:cap]
        snippet = re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", body)).strip()
        return status, final, snippet[:400]
    except Exception as e:  # noqa: BLE001
        return None, None, f"error: {e}"


def ig_handles(name):
    """Candidate Instagram handles derived from the venue name."""
    key = name.strip().lower()
    if key in KNOWN_INSTAGRAM and KNOWN_INSTAGRAM[key]:
        return [KNOWN_INSTAGRAM[key]]
    base = re.sub(r"[^a-z0-9]+", "", key)
    cands = []
    if base:
        cands.append(base)
        cands.append(base + "bh")
        cands.append(base + "bahrain")
    return cands[:3]


def run_one(key, res, inv_row, lock, delay, counter, results):
    name = res["venue_name"]
    entry = {
        "venue_name": name,
        "source_2_website": None, "website_status": None,
        "website_final_url": None, "website_snippet": "",
        "source_2_instagram": None, "instagram_status": None,
        "instagram_final_url": None, "instagram_snippet": "",
        "notes": "",
    }

    # 1. Website: Maps record first, then our own page content.
    sites = []
    mrec = res.get("match") or {}
    if mrec.get("website"):
        sites.append(mrec["website"])
    if inv_row and inv_row.get("website") and inv_row["website"] not in sites:
        sites.append(inv_row["website"])
    for u in sites:
        st, final, snip = http_get(u)
        if st:
            entry["source_2_website"] = u
            entry["website_status"] = st
            entry["website_final_url"] = final
            entry["website_snippet"] = snip
            if st < 400:
                break
        time.sleep(delay)

    # 2. Instagram.
    #
    # IMPORTANT (measured 2026-11-20): instagram.com serves an IDENTICAL
    # ~540 KB JavaScript shell with HTTP 200 for every handle, including
    # handles that do not exist (verified against a made-up handle). The
    # page contains no profile metadata at all. An HTTP 200 from Instagram
    # is therefore NOT evidence that a profile exists, and is never treated
    # as source-2 proof here. The handle is still recorded so a human can
    # open it, but the row notes that no profile data could be retrieved
    # programmatically.
    handle = None
    if inv_row and inv_row.get("instagram"):
        handle = inv_row["instagram"].lstrip("@")
    if not handle:
        cands = ig_handles(name)
        handle = cands[0] if cands else None
    if handle:
        ig_url = f"https://www.instagram.com/{handle}/"
        st, final, snip = http_get(ig_url)
        entry["source_2_instagram"] = ig_url
        entry["instagram_status"] = st
        entry["instagram_final_url"] = final
        entry["instagram_snippet"] = snip
        entry["instagram_evidence"] = (
            "HTTP status only - instagram.com returns the same JS shell for "
            "existing and non-existent handles, so this is NOT proof the "
            "profile exists; open the URL to check")

    if not entry["website_status"]:
        entry["notes"] = ("no independent web source retrieved "
                          "(instagram status alone is not proof of existence)")

    with lock:
        results[key] = entry
        with open(OUT, "w", encoding="utf-8") as f:
            json.dump(results, f, indent=2, ensure_ascii=False)
        counter[0] += 1
        n = counter[0]
        print(f"[{n}] {name[:34]:34} web={entry['website_status']} "
              f"ig={entry['instagram_status']}", flush=True)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=int, default=0)
    ap.add_argument("--out", default=OUT)
    ap.add_argument("--delay", type=float, default=0.4)
    ap.add_argument("--workers", type=int, default=7)
    args = ap.parse_args()

    res = json.load(open(RESULTS, encoding="utf-8"))
    inv = json.load(open(INVENTORY, encoding="utf-8"))
    inv_by = {}
    for row in inv["rows"]:
        inv_by.setdefault(row["venue_name"].strip().lower(), row)

    keys = sorted(res.keys())
    if args.limit:
        keys = keys[: args.limit]

    print(f"Second-source check for {len(keys)} venues", flush=True)
    lock = threading.Lock()
    counter = [0]
    results = {}
    with ThreadPoolExecutor(max_workers=args.workers) as ex:
        futs = [ex.submit(run_one, k, res[k], inv_by.get(k), lock,
                          args.delay, counter, results) for k in keys]
        for f in futs:
            f.result()
    print(f"\nDone -> {args.out}")


if __name__ == "__main__":
    main()
