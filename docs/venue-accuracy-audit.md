# Venue Accuracy Audit — Task Brief
**Created:** 2026-07-29
**Status:** ACTIVE — in progress
**Task owner:** Nova (autonomous agent, Mac Mini)
**Max (Mac Studio):** handles PR creation and merging once fixes are ready

## Why This Matters

bahrainnights.com publishes venue information — names, locations, opening hours,
operating status. Phase 2 research on /bahrain-nightlife-guide proved that at least
two listed venues appear to be entirely fabricated:

- "Jumeirah Beach" — Jumeirah hotel chain has no Bahrain property
- "Sofitel Beach, Amwaj" — Sofitel is in Zallaq, 30+ km from Amwaj

Publishing wrong information creates real exposure:
- Reputational damage with venues we are trying to sign as commercial partners
- Users who travel to a venue based on our page and find it closed or non-existent

This is not cosmetic cleanup. It is an accuracy audit and correction exercise.

## Autonomy Rules

**MAY do without asking:**
- Enumerate pages, research venues, build data tables
- Create branches and commit code changes
- Update the progress ledger continuously
- Work through the full page list without pausing between pages

**MAY NOT do without explicit approval:**
- Publish or deploy anything
- Run `vercel --prod` or `vercel deploy --prod`
- Open or merge a pull request — all PR/merge operations go to Max
- Create any account, API key, Google Cloud project, or billing setup
- Delete any page, route, or URL
- Change any URL/slug, <title>, H1, or meta description
- Reduce word count on any page that receives organic traffic

Publishing stays gated. Batch 3–5 pages, then present for approval as a group.

## Data Source Rules (priority order)

1. The venue's own website
2. The venue's own Instagram (bio, highlights, recent posts)
3. Google Maps / Google Business Profile listing
4. Time Out Bahrain, local press — USE WITH CAUTION, often outdated

**Google Maps handling:**
- Google Maps hours are user-submitted and frequently wrong. Do NOT treat Maps as automatically correct.
- Where venue's own channel and Google Maps AGREE: publish it.
- Where they CONFLICT: publish the venue's own source, log the conflict in the ledger with both values.
- Where Google Maps says PERMANENTLY CLOSED: do not publish the venue as open, even if its website is still up. Flag it.
- If Google Maps cannot be accessed: mark field MAPS-UNCHECKED.

**Never invent a fact.** No estimated hours. No plausible-sounding descriptions.
No copying one venue's hours to another. A blank field that is flagged is always
better than a filled field that is wrong.

## Scope Rules

- Adliya/Seef/Marassi geographic restriction applies ONLY to /bahrain-nightlife-guide.
- Other pages keep their own scope — do not strip Juffair or Amwaj venues from other pages.
- Fix accuracy everywhere; change scope only where explicitly instructed.

## Deliverables

1. Phase A: Master page table (all pages, categorized by priority)
2. Phase B: Per-page venue table with source URLs and status per venue
3. Phase C: Structural proposal for a single source of truth (venues.ts data file)
4. Persistent progress ledger at: docs/venue-audit-progress.md
5. All branches pushed to origin, handed off to Max for PR/merge

## Verification Required (in every completion report)

- `git ls-remote origin` output showing the branch exists remotely
- The diff or exact list of files changed
- Before/after word count for every page touched
- Confirmation that slug, title, H1, meta description are unchanged
- Screenshot of each rendered page from local dev server
- Updated progress ledger

Reports without this evidence will be rejected and the work redone.
