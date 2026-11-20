#!/usr/bin/env python3
"""
Count occurrences of each corrected venue token in a given git revision.

Lets us prove that EVERY occurrence of a corrected venue - including the
JSON-LD structured-data copies Google actually reads - was updated, and not
just the venue data object.

Usage:
    python3 scripts/audit/count_occurrences.py [REV]
    # REV defaults to the working tree (including uncommitted changes).
"""
import os
import re
import subprocess
import sys

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# label -> regex. The regexes match the OLD (wrong) values we corrected.
PATTERNS = {
    "Typhoon": r"Typhoon",
    "LeMeridien(any)": r"Le M[ée]ridien",
    "JJsIrishPub": r"JJ\\?'s Irish Pub",
    "JJsIrishPub@Juffair": r"JJ\\?'s Irish Pub[^,\n]*Juffair",
    "Calexico": r"Calexico",
    "Calexico@Amwaj": r"Calexico[^,\n]*Amwaj",
    "Amwaj(any)": r"Amwaj",
    "PrimeUS": r"Prime US",
    "KaramBeirut": r"Karam Beirut",
    "GreyCafe": r"Grey Cafe",
    "CoralBayBahrain": r"Coral Bay Bahrain",
    "AlAreenWildlifePark": r"Al Areen Wildlife Park",
    "Babel": r"\bBabel\b",
    "CostaWTC": r"Costa WTC",
    "Masso": r"Masso",
    "BlackAngus": r"Black Angus",
    "Bebabel": r"Bebabel",
    "CafeGray": r"Cafe Gray",
    "KaramRestaurant": r"Karam Restaurant",
    "CoralBayHotelResort": r"Coral Bay Hotel & Resort",
    "MohamedBinZayed": r"Mohamed bin Zayed",
    "Westin": r"Westin",
    "GulfHotelBahrain": r"Gulf Hotel Bahrain",
    "Block338": r"Block 338",
    "Road3827": r"Road 3827",
}


def files_at(rev):
    if rev in (None, "", "WORKTREE"):
        out = subprocess.run(
            ["git", "-C", REPO, "ls-files", "src/app"], capture_output=True, text=True
        ).stdout.split()
        return [f for f in out if f.endswith(".tsx")]
    out = subprocess.run(
        ["git", "-C", REPO, "ls-tree", "-r", "--name-only", rev, "src/app"],
        capture_output=True, text=True,
    ).stdout.split()
    return [f for f in out if f.endswith(".tsx")]


def content_at(rev, path):
    if rev in (None, "", "WORKTREE"):
        with open(os.path.join(REPO, path), encoding="utf-8") as f:
            return f.read()
    out = subprocess.run(
        ["git", "-C", REPO, "show", f"{rev}:{path}"], capture_output=True, text=True
    )
    return out.stdout


def main():
    rev = sys.argv[1] if len(sys.argv) > 1 else "WORKTREE"
    files = files_at(rev)
    print(f"revision: {rev}   files: {len(files)}\n")
    width = max(len(k) for k in PATTERNS)
    for label, rx in PATTERNS.items():
        total = 0
        per_file = []
        for path in files:
            text = content_at(rev, path)
            if not text:
                continue
            n = len(re.findall(rx, text))
            if n:
                total += n
                per_file.append((path, n))
        print(f"{label:<{width}}  total={total}")
        for path, n in per_file:
            print(f"{'':<{width}}    {n:>3}  {path}")


if __name__ == "__main__":
    main()
