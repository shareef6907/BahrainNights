#!/usr/bin/env bash
# Content gate for automated daily PRs on the Bahrain sites.
# Usage: content-check.sh <files.tsv> <pr.diff> <head-branch-name>
# Strict rules apply to agent branches (nova/daily-*, max/daily-*).
# Other branches (owner feature work) only get the always-on rules.
set -u
export LC_ALL=C.UTF-8

FILES="$1"
DIFF="$2"
HEAD_REF="${3:-}"
fail=0
report() { echo ""; echo "FAIL: $1"; fail=1; }

if [ ! -s "$FILES" ] || [ ! -s "$DIFF" ]; then
  echo "FAIL: could not read the PR file list or diff (empty input)."
  exit 1
fi

ADDED=$(mktemp)
grep '^+' "$DIFF" | grep -v '^+++ ' > "$ADDED" || true

check() {
  local label="$1" pattern="$2" opts="${3:-}"
  local hits
  hits=$(grep -nP $opts -- "$pattern" "$ADDED" | head -5 || true)
  if [ -n "$hits" ]; then
    report "$label"
    echo "$hits" | cut -c1-220 | sed 's/^/    /'
  fi
}

# ---------- Always-on rule (every branch) ----------
check "Google Indexing API reference found (permanently banned)." \
  'indexing\.googleapis\.com'

case "$HEAD_REF" in
  nova/daily-*|max/daily-*) STRICT=1 ;;
  *) STRICT=0 ;;
esac

count=$(grep -c . "$FILES" || true)

if [ "$STRICT" -eq 1 ]; then
  if [ "$count" -gt 15 ]; then
    report "PR changes $count files (limit is 15)."
  fi

  bad=$(awk -F'\t' '$1=="removed" || $1=="renamed" {print "    " $1 ": " $2}' "$FILES")
  if [ -n "$bad" ]; then
    report "PR deletes or renames existing files."
    echo "$bad"
  fi

  prot=$(cut -f2 "$FILES" | grep -E '^(\.github/|scripts/content-check|package\.json$|package-lock\.json$|pnpm-lock\.yaml$|yarn\.lock$|bun\.lockb?$|next\.config\.|vercel\.json$|tsconfig\.json$|tailwind\.config\.|postcss\.config\.|\.env)|(^|/)(middleware|robots)\.|(^|/)(supabase|migrations|scrapers?|api|admin|auth)/|\.sql$|analytics' || true)
  if [ -n "$prot" ]; then
    report "PR touches protected files (config, dependencies, CI, database, API, auth, admin, analytics)."
    echo "$prot" | sed 's/^/    /'
  fi

  check "Unverified company statistic found (real stats only)." \
    '(\d{2,}\s?\+\s?(projects|clients|events|weddings|brands|companies|years|مشروع|عميل)|\b(over|more than)\s+\d{2,}\s+(projects|clients|events|weddings|brands|companies|years))' \
    '-i'

  check "Review or rating structured data found (not allowed)." \
    '(aggregateRating|"@type"\s*:\s*"Review")'
fi

rm -f "$ADDED"

echo ""
if [ "$fail" -ne 0 ]; then
  echo "RESULT: FAILED. This PR must not be merged."
  exit 1
fi
if [ "$STRICT" -eq 1 ]; then
  echo "RESULT: PASSED (strict rules, agent branch $HEAD_REF). $count files changed."
else
  echo "RESULT: PASSED (basic rules only, branch $HEAD_REF is not an agent daily branch)."
fi
