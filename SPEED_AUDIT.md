# BahrainNights Homepage Speed Audit
**Date:** March 15, 2026  
**URL:** https://www.bahrainnights.com  
**Branch:** `perf/homepage-speed-optimization`

---

## Current Performance Scores

### Lighthouse (Mobile Simulation)
| Metric | Value | Score |
|--------|-------|-------|
| **Performance** | - | **60%** |
| First Contentful Paint (FCP) | 4.1s | 21% |
| Largest Contentful Paint (LCP) | 7.4s | 4% |
| Cumulative Layout Shift (CLS) | 0 | ✅ Good |
| Total Blocking Time (TBT) | 30ms | ✅ Good |
| Speed Index | 8.1s | 21% |
| Time to Interactive (TTI) | 7.5s | 48% |

### Core Web Vitals
- **LCP:** 7.4s ❌ (target: <2.5s)
- **CLS:** 0 ✅ 
- **INP:** Not measured (requires real user interaction)

---

## Critical Issues

### 1. Header Video Loading (30MB)
**Impact:** Highest - blocks everything

The video is currently set to `preload="auto"` which downloads the **entire 30MB video** immediately, blocking other resources.

```
Header-Video1.mp4: 30,060,587 bytes (30MB)
```

**Fix:** Change to `preload="metadata"` (per requirements)

---

### 2. Main Thread Work (12.8 seconds)
**Impact:** Critical

| Category | Duration |
|----------|----------|
| Other | 5,696ms |
| Style & Layout | 2,477ms |
| Rendering | 2,239ms |
| Script Evaluation | 2,155ms |
| Script Parsing | 103ms |

**Top JS execution offenders:**
| File | Total Time | Scripting |
|------|------------|-----------|
| chunk 1058 | 5,611ms | 1,469ms |
| Page render | 4,717ms | 5ms |
| chunk 4bd1b696 | 732ms | 191ms |
| chunk 1255 | 386ms | 342ms |
| Google Analytics | 90ms | 62ms |

---

### 3. Unused JavaScript (82KB potential savings)
| Source | Total Size | Wasted | % Unused |
|--------|------------|--------|----------|
| Google Analytics | 155KB | 63KB | 41% |
| chunk 1058 | 42KB | 21KB | 49% |

---

### 4. Framer Motion in Multiple Components
The following homepage components import `framer-motion` which runs on mount:

- `CategoryShowcase.tsx` - useMotionValue, useSpring, useTransform
- `HappeningNow.tsx` - motion
- `TonightQuickView.tsx` - motion, AnimatePresence
- `TrendingSection.tsx` - motion, AnimatePresence
- `InternationalEventsSection.tsx` - motion
- `FavoritesBar.tsx` - motion, AnimatePresence
- `SurpriseMe.tsx` - motion, AnimatePresence

All of these are dynamically imported, but framer-motion still adds to the bundle and executes JS for animations.

---

### 5. Network Payload Summary
**Total payload:** 30,418 KiB (~30MB)

| Resource Type | Size | Notes |
|--------------|------|-------|
| Video | 30MB | Header video (main issue) |
| Scripts (JS) | ~200KB | Next.js chunks + GA |
| Fonts | ~150KB | 4 font files |
| Images | ~200KB | Optimized via Next.js |
| Document | 38KB | HTML response |

---

## API/Database Calls (Homepage Load)

### Server-Side (page.tsx - runs at build/revalidate)
1. `getTodayEvents()` - Supabase query for upcoming events
2. `getMovies()` - Supabase query for now showing movies
3. `getInternationalEvents()` - Supabase query for non-Bahrain events
4. `getStats()` - 5 parallel count queries (events, venues, movies, attractions, blogs)
5. `getHappeningNowEvents()` - Supabase query for today's events
6. `getTrendingData()` - 2 parallel queries (venues, events by view_count)
7. `getSurpriseData()` - 3 parallel queries (events, venues, attractions)

**Total: 7 function calls, ~14 Supabase queries**

**Current revalidation:** 120 seconds (2 minutes)

### Client-Side
- AdBanner fetches ads dynamically (deferred 1.5s)
- NewsletterPopup checks localStorage

---

## Opportunities & Diagnostics Summary

| Issue | Potential Savings | Priority |
|-------|-------------------|----------|
| Video preload="auto" → metadata | Faster LCP | 🔴 High |
| Increase revalidate (events 1hr, venues 24hr) | Reduced DB load | 🟡 Medium |
| Remove/replace framer-motion in homepage components | ~100KB JS | 🟡 Medium |
| Add placeholder="blur" to images | Better CLS | 🟢 Low |
| Defer more below-fold components | Faster TTI | 🟢 Low |

---

## Third-Party Scripts

| Script | Size | Strategy | Notes |
|--------|------|----------|-------|
| Google Analytics (gtag.js) | 155KB | afterInteractive | ✅ Deferred correctly |

No other third-party scripts detected.

---

## Fonts

| Font | Size | Status |
|------|------|--------|
| Inter (woff2) | 48KB | ✅ Preloaded, display: swap |
| IBM Plex Arabic (woff2) | 36KB | ✅ Preloaded, display: swap |
| Arabic variants x2 | 67KB | ✅ Preloaded |

**Status:** Fonts are optimized via next/font/google.

---

## Fix Plan

### Priority 1: Video Optimization
- [ ] Change `preload="auto"` to `preload="metadata"`
- [ ] Remove `autoPlay` attribute (let JS handle it)
- [ ] Confirm poster image loads instantly

### Priority 2: Caching
- [ ] Increase revalidate from 120s to:
  - Events: 3600s (1 hour)
  - Venues/Stats: 86400s (24 hours - these rarely change)
- [ ] Consider splitting page.tsx queries by revalidation needs

### Priority 3: JavaScript
- [ ] Replace framer-motion animations with CSS in above-fold components
- [ ] Audit dynamic imports - ensure no framer-motion leaks into main bundle

### Priority 4: Images
- [ ] Add `placeholder="blur"` to movie posters and event images
- [ ] Verify all below-fold images have `loading="lazy"`

---

## Target After Fixes
- **Mobile Performance:** 85+
- **Desktop Performance:** 95+
- **LCP:** <2.5s
- **FCP:** <1.8s
