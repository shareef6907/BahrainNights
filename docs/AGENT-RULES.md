# Agent Rules — Cinematic Group

**File:** `docs/AGENT-RULES.md`
**Purpose:** Permanent operational rules for all agent sessions
**Last updated:** 2026-07-29

---

## Google Indexing API — Permanent Site-Wide Ban

**Never call the Google Indexing API for any URL on any domain we operate.**

This rule is permanent and applies across all agents (Nova, Max, GM) and all sessions.

**Scope:** All Cinematic Group domains:
- bahrainnights.com
- eventsbahrain.com
- cinematicwebworks.com
- filmproductionbahrain.com
- studentphotos.com
- Any future domains

**Rationale:** The Indexing API is documented for JobPosting and BroadcastEvent structured data only.
Submitting general web pages is outside its stated purpose and may violate Google policy.

**Manual indexing requests:** Made by Shareef only, via the Google Search Console UI.

**What this covers:**
- `URL_UPDATED` and `URL_DELETED` calls to the Indexing API
- Any programmatic submission of URLs to Google for indexing

**What this does NOT cover:**
- Google Search Console API (read-only performance data) — permitted
- Google Places API (venue data) — permitted
- Google Maps Embed API — permitted

**Added:** 2026-07-29
**Reason:** Unauthorized Indexing API call made during bahrainnights.com venue audit
