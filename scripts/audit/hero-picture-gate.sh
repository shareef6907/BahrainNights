#!/usr/bin/env bash
#
# THE HERO PICTURE GATE.
#
# A REQUIRED status check. It fails when the hero on ANY hero page does not
# show a MOVING PICTURE.
#
# WHY IT IS A PIXEL CHECK AND NOT A "data-playing" CHECK
# ------------------------------------------------------
# The old check asserted a bounding rect and data-playing. Both are
# perfectly satisfied by a player sitting under an opaque poster, or under
# visibility:hidden - which is exactly the state the heroes were in while
# they played AUDIO WITH NO PICTURE. It reported PASS on a black box.
#
# This check proves PIXELS CHANGE between two frames, and that the frame is
# not a flat colour, and that nothing covers the iframe. A poster, a black
# box and a hidden player all fail it.
#
# It runs against PRODUCTION, because the heroes are client-rendered and a
# local build has no database - a local run would prove nothing.
#
# Usage: scripts/audit/hero-picture-gate.sh [base-url]

set -uo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$REPO_ROOT"

PAGES=(
  "https://www.bahrainnights.com/regional"
  "https://www.bahrainnights.com/cinema"
  "https://www.bahrainnights.com/international"
)

echo "=== HERO PICTURE GATE ==="
echo ""

FAIL=0

for url in "${PAGES[@]}"; do
  echo "--- $url ---"
  if npx tsx scripts/audit/hero_picture_check.ts "$url" /tmp/hero-gate-pics 2>&1 | tail -40; then
    :
  else
    FAIL=1
  fi
  echo ""
done

# The homepage hero uses a native <video>, not the YouTube player, so it
# gets its own check. It runs at a desktop viewport because the homepage
# hero video is desktop-only BY DESIGN.
echo "--- https://www.bahrainnights.com/ (desktop: the hero video is desktop-only) ---"
if DESKTOP=1 npx tsx scripts/audit/home_hero_check.ts "https://www.bahrainnights.com/" /tmp/hero-gate-pics 2>&1 | tail -30; then
  :
else
  FAIL=1
fi
echo ""

if [ "$FAIL" -ne 0 ]; then
  echo "=========================================================="
  echo "HERO PICTURE GATE: FAILED"
  echo "A hero is not showing a moving picture. DO NOT MERGE."
  echo "If the hero is intentionally broken, get Shareef's approval first."
  echo "=========================================================="
  exit 1
fi

echo "=========================================================="
echo "HERO PICTURE GATE: PASSED - every hero shows a moving picture"
echo "=========================================================="
