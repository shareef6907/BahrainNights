# BahrainNights Venue Accuracy Audit — Task Brief
**Created:** 2026-10-02 (Day 2)
**Status:** IN PROGRESS — starting systematic audit

## Mission
Systematically audit every page on bahrainnights.com that makes factual claims about venues 
(names, addresses, hours, hotel affiliations). Goal: eliminate fabricated venues and 
incorrect information that could damage relationships with real venue partners.

## Known Issues (pre-existing)
1. /bahrain-nightlife-guide: "Jumeirah Beach" listed as beach club — FABRICATED
2. /bahrain-nightlife-guide: "Sofitel Beach" listed as beach club — UNVERIFIED/FABRICATED
3. /bahrain-nightlife-guide: "Ritz Beach Club" — UNVERIFIED
4. /ladies-night-bahrain: Coda Jazz Lounge listed as "Ritz-Carlton" — WRONG (Palmyard Hotel Adliya)
5. /nightlife-bahrain: Coda Jazz Lounge listed as "Ritz-Carlton" — WRONG (Palmyard Hotel Adliya)
6. /bahrain-nightlife-guide: Zenj listed under "Hotel Scene" as Ritz-Carlton — WRONG (Gulf Hotel)
7. /bahrain-nightlife-guide: Vox listed as "InterContinental" — UNVERIFIED (may have closed)
8. /bahrain-nightlife-guide: Bushido Lounge listed as Ritz-Carlton — UNVERIFIED
9. /bahrain-nightlife-guide: Trader Vic's listed as Ritz-Carlton — UNVERIFIED

## Scope
- src/app/bahrain-nightlife-guide/page.tsx
- src/app/ladies-night-bahrain/page.tsx
- src/app/nightlife-bahrain/page.tsx
- src/app/weekend-in-bahrain/page.tsx
- src/app/best-cafes-bahrain/page.tsx
- src/app/best-restaurants-bahrain/page.tsx
- Any other page with hardcoded venue data

## Approach
1. List all hardcoded venues in each page
2. Cross-reference with known Bahrain venue facts
3. Flag unverified venues (need manual check with Shareef)
4. Flag clearly fabricated venues (can remove without approval)
5. Submit PR with removals only — Shareef approves before any additions
