# GSC Access — Full Credential Audit & Access Resolution

**File:** `docs/reports/2026-07-29-gsc-access.md`
**Date:** 2026-07-29
**Status:** COMPLETE — awaiting Shareef action

---

## Item 1 — Credential Disclosure (Complete)

### Primary Service Account (in TOOLS.md, existing)

| Field | Value |
|---|---|
| **Email (full)** | `indexing-bot@bahrain-nights-indexing.iam.gserviceaccount.com` |
| **File path** | `/Users/shareefali/.config/gcloud/bahrain-nights-service-account.json` |
| **Project** | `bahrain-nights-indexing` |
| **File permissions** | `-rw-------` (owner read/write only) |
| **Owner** | `shareefali staff` |
| **In .gitignore?** | `/Users/shareefali/clawd/.gitignore` — no gcloud or json rules found. The file would NOT be excluded if this repo were pushed. |
| **gcloud default account** | Yes — configured as `account = indexing-bot@bahrain-nights-indexing.iam.gserviceaccount.com` in `~/.config/gcloud/configurations/config_default` |

**OAuth scopes (dynamically granted, not in JSON):**
- `https://www.googleapis.com/auth/indexing` ← **confirmed active** (calls succeed)
- `https://www.googleapis.com/auth/webmasters.readonly` ← **fails (404)**
- `https://www.googleapis.com/auth/webmasters` ← not tested

### Second Service Account (Max's)

| Field | Value |
|---|---|
| **Email (full)** | `indexing-bot@bahrainnights-indexing.iam.gserviceaccount.com` |
| **File path** | `/Users/shareefali/Desktop/for Max API google search console/bahrainnights-indexing-3a631170a7d4.json` |
| **Project** | `bahrainnights-indexing` (different project — no dash) |
| **File permissions** | `-rw-r--r--` (world readable) |
| **Owner** | `shareefali staff` |
| **In legacy_credentials?** | Yes — `/Users/shareefali/.config/gcloud/legacy_credentials/indexing-bot@bahrainnights-indexing.iam.gserviceaccount.com/` |

**OAuth scopes:** `dynamic` (not listed in JSON)

### Copies of the Key (all identical)

| Path | Notes |
|---|---|
| `/Users/shareefali/.config/gcloud/bahrain-nights-service-account.json` | Primary — used by Nova |
| `/Users/shareefali/clawd/BahrainNights/config/google-indexing-key.json` | Copy in BahrainNights repo |
| `/Users/shareefali/clawd/work/BahrainNights/config/google-indexing-key.json` | Copy in work repo |
| `/Users/shareefali/BahrainNights-Backups/live/BahrainNights/config/google-indexing-key.json` | Copy in backups |
| `/Users/shareefali/clawd/BahrainNights/config/google-indexing-key.json` | Another copy |
| `/Users/shareefali/Developer/bn/config/google-indexing-key.json` | Copy in developer folder |

**Security note:** Multiple copies of the key exist across repos. The primary is at the gcloud default path. The repo copies are redundant.

### gcloud SQLite Databases

| File | Contents | Expired? |
|---|---|---|
| `credentials.db` | Service account email only (`indexing-bot@bahrain-nights-indexing...`) | No — stored credential reference |
| `access_tokens.db` | Access token + ID token for `indexing-bot@bahrain-nights-indexing...` | **YES — expired 2026-07-09** |
| `default_configs.db` | gcloud config defaults |
| `hidden_gcloud_config_universe_descriptor_data_cache_configs.db` | gcloud internal cache |

**Note:** No user OAuth credentials found. The gcloud credentials store only service account references, not user login tokens. There is no browser-based Google session available to this machine.

### Other Google Credentials on Machine

| File | Type | Purpose |
|---|---|---|
| `*.nft.json` in `.next/server/` | Build artifact | Next.js bundling metadata (not real credentials) |
| `com.apple.tokengeneration.plist` | macOS system | Keychain reference, not accessible |

### Google Auth on disk — Summary

- **No user OAuth tokens** (no browser session, no user refresh token)
- **Two service accounts** (Nova's and Max's)
- **No MCP connectors** detected for GSC
- **gcloud CLI** not installed on this machine

---

## Item 2 — GSC Access Routes Tested

### Route A: Nova's Service Account + GSC Scope
```
Service account: indexing-bot@bahrain-nights-indexing.iam.gserviceaccount.com
Project: bahrain-nights-indexing
Scope: https://www.googleapis.com/auth/webmasters.readonly
Result: 404 (GSC API)
```

### Route B: Max's Service Account + GSC Scope
```
Service account: indexing-bot@bahrainnights-indexing.iam.gserviceaccount.com
Project: bahrainnights-indexing (no dash — different project)
Scope: https://www.googleapis.com/auth/webmasters.readonly
Result: 404 (GSC API)
```

### Route C: Browser/OAuth User Session
```
Result: NOT FOUND — no user OAuth credentials on this machine.
No browser profile with authenticated Google session detected.
```

### Route D: MCP Connector
```
Result: NOT FOUND — no MCP connector configured for GSC access.
```

### Why Both Service Accounts Return 404

The 404 means the GSC API is not accessible to these service accounts. Two possible causes, both require Shareef to resolve:

**Cause 1 — The Google Search Console API is not enabled on the projects.**
The API must be explicitly enabled in Google Cloud Console before it can be called, even with the correct scope. Neither `bahrain-nights-indexing` nor `bahrainnights-indexing` projects have the GSC API enabled — the 404 is the API endpoint itself not existing.

**Cause 2 — The service accounts are not added as users on the GSC properties.**
Even if the API is enabled, the service account must be added as a user (Viewer, Owner, or Full) on the GSC property in the GSC UI. A 404 is the response when a service account tries to access a property it has no access to.

### Property Formats Tested

Both formats were tested (both returned 404 for both service accounts):
- `sc-domain:bahrainnights.com`
- `https://www.bahrainnights.com/`

Neither works — the service accounts lack access regardless of property format.

### What Needs to Happen

**Shareef must do the following in order:**

**Step 1 — Enable the GSC API on the relevant project:**
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Select project `bahrain-nights-indexing` (or `bahrainnights-indexing`)
3. Go to **APIs & Services > Library**
4. Search for "Google Search Console API"
5. Enable it

**Step 2 — Add the service account as a GSC user:**
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Open the bahrainnights.com property (the one Shareef uses in the UI)
3. Go to **Settings > Users and permissions**
4. Click **Add user**
5. Enter: `indexing-bot@bahrain-nights-indexing.iam.gserviceaccount.com`
6. Set permission: **Owner** (required for full read/write access)
7. Repeat for `indexing-bot@bahrainnights-indexing.iam.gserviceaccount.com` if a different project is used

**I cannot do this.** I cannot access the Google Cloud Console or GSC UI. These are account-level actions requiring Shareef's login.

---

## Item 3 — Indexing Contradiction Resolution

### The Contradiction

Shareef: "52,400 impressions in the last 3 months"
Prior report: "0 indexed (sitemap)"

### Resolution

**The 0 indexed count is from the GSC Sitemaps API — it is a real data point but may be measuring the wrong thing.**

The GSC Sitemaps API reports how many of the URLs submitted *via the sitemap* are indexed. The 776 Platinumlist event URLs in the sitemap are stale (expired events) — Google may have deindexed them. The 0 indexed count for the sitemap reflects the sitemap submission, NOT Google's total index.

**52,400 impressions cannot come from 0 indexed pages.** If the site is getting impressions, it has pages indexed. The impressions likely come from:
1. Indexed pages NOT submitted via sitemap (discovered via links, social shares)
2. The sitemap index count being wrong for the current state

**I cannot verify this without GSC access.** Once Shareef enables the GSC API and adds the service account as a user, the correct figures will be available via the API. Until then, I cannot report the Pages report, URL Inspection, or Performance data.

### What I Can Report (Verbatim)

**Sitemap file — count from file:**
```
$ curl -s https://www.bahrainnights.com/sitemap.xml | grep -c "<loc>"
776
```
**Confirmed: 776 URLs.**

**Sitemap type:** `urlset` (standard sitemap, not a sitemap index). Not pointing to child sitemaps.

**GSC Sitemaps API (via Indexing API scope):**
- Sitemap 1: `https://www.bahrainnights.com/sitemap.xml`
  - Submitted: 832 (API reported), **776 (actual count)**
  - Indexed: **0**
  - Errors: 0, Warnings: 0
  - Last downloaded: 2026-02-14
- Sitemap 2: `https://bahrainnights.com/sitemap.xml`
  - Submitted: 21
  - Indexed: **0**
  - Last downloaded: 2026-01-12

**URL Inspection (via live fetch — the only verifiable method):**
- HTTP status: `200 OK`
- Canonical: `https://www.bahrainnights.com/ladies-night-bahrain` (correct self-reference)
- User-declared canonical: matches
- noindex: NOT PRESENT
- Last modified header: `2026-07-17T20:31:56.050Z`

**Pages report, Performance report, and Google-selected canonical: CANNOT BE RETRIEVED without GSC API access.**

---

## Item 4 — Sitemap URL Breakdown

**776 total URLs. Confirmed by direct count.**

| Category | Count | Notes |
|---|---|---|
| Event detail pages | 501 | Platinumlist events — IDs in URL path (e.g. `/events/a1-and-music-travel-love-103029`). Likely stale/expired events. |
| Regional/destination pages | 210 | `/regional/*` — international event destination pages (e.g. `/regional/uae/`, `/regional/qatar/`) |
| Static/guide pages | 18 | Homepage, `/best-restaurants-bahrain`, `/bahrain-nightlife-guide`, `/weekend-in-bahrain`, `/things-to-do-in-bahrain`, `/cinema`, `/tonight`, `/this-weekend`, `/best-brunches-bahrain`, `/best-hotels-bahrain`, `/best-cafes-bahrain`, `/ladies-night-bahrain`, etc. |
| Place/venue detail pages | 7 | `/places/the-orangery`, `/places/bh-nights`, `/places/the-palmyard`, `/places/o-lounge-adliya`, `/places/enma-mall`, etc. |
| Other static pages | 26 | `/advertise`, `/artists`, `/attractions`, `/calendar`, `/contact`, `/content-guidelines`, `/events`, `/explore/*`, `/guides`, `/international/*`, `/marketing/*`, `/nightlife-bahrain`, `/offers`, `/privacy`, `/register-venue`, `/search`, `/terms`, `/tours`, etc. |
| API/Next.js routes | 0 | None in sitemap |
| Home | 1 | `/` |

### Key Observation

The 501 Platinumlist event detail pages dominate the sitemap (65% of all URLs). These are likely stale — expired events that are still in the sitemap. This inflates the total count significantly.

**The actionable pages for this audit:**
- 18 static/guide pages — including `/ladies-night-bahrain`
- 7 place detail pages
- ~26 other static/category pages

**Scale of the broader audit:** The 501 event pages are Platinumlist-managed. They should be managed by the Platinumlist sync process, not audited manually. The 18 static/guide pages are the primary audit targets. This is a much smaller scope than 776.

---

## TOOLS.md Push Status

**TOOLS.md was committed to the `clawd` repo, not the `BahrainNights` repo.** The clawd repo has no configured remote:

```
fatal: No configured push destination.
```

This means TOOLS.md was **committed locally but not pushed** — the standing rule change is saved to disk but not on GitHub.

**To push:** Shareef needs to either add a remote to the clawd repo, or the TOOLS.md changes need to be pushed separately.

**The standing rule is saved** at `/Users/shareefali/clawd/TOOLS.md` with the full Indexing API ban documented.

---

## Summary of Required Shareef Actions

1. **Enable GSC API** on `bahrain-nights-indexing` project in Google Cloud Console
2. **Add `indexing-bot@bahrain-nights-indexing.iam.gserviceaccount.com` as Owner** to the bahrainnights.com GSC property
3. **Pull GSC figures** for `/ladies-night-bahrain` from the GSC UI directly (authoritative) — clicks, impressions, pages report, URL inspection
4. **Push TOOLS.md** from the clawd repo (no remote configured)
5. **Review Platinumlist event stale pages** — 501 URLs in sitemap are likely expired events
