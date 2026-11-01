#!/usr/bin/env python3
"""Check live HTTP status of every GSC-listed /events/<slug> URL.

Writes the raw curl-style output to stdout and a JSON summary to
/tmp/event_status.json for downstream redirect-map generation.
"""
import json
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor

BASE = "https://www.bahrainnights.com"


def check(url):
    # -o /dev/null -s -w "%{http_code} %{redirect_url}\n" exactly as specified
    out = subprocess.run(
        ["curl", "-o", "/dev/null", "-s", "-w", "%{http_code} %{redirect_url}\n",
         "--max-time", "30", url],
        capture_output=True, text=True,
    ).stdout.strip()
    parts = out.split(" ", 1)
    code = parts[0]
    redir = parts[1] if len(parts) > 1 else ""
    return url, code, redir


def main():
    pages = json.load(open("/tmp/event_pages.json"))
    urls = sorted(pages.keys())
    print(f"# checking {len(urls)} event URLs against {BASE}", file=sys.stderr)

    results = []
    with ThreadPoolExecutor(max_workers=8) as ex:
        for url, code, redir in ex.map(check, urls):
            results.append({"url": url, "code": code, "redirect": redir})

    # Raw output, paste-ready
    for r in sorted(results, key=lambda x: x["url"]):
        print(f"{r['code']} {r['redirect']} {r['url']}")

    summary = {}
    for r in results:
        summary.setdefault(r["code"], []).append(r["url"])
    print("\n# ---- summary ----", file=sys.stderr)
    for code in sorted(summary):
        print(f"# {code}: {len(summary[code])} urls", file=sys.stderr)

    json.dump(results, open("/tmp/event_status.json", "w"))
    print(f"# wrote /tmp/event_status.json ({len(results)} rows)", file=sys.stderr)


if __name__ == "__main__":
    main()
