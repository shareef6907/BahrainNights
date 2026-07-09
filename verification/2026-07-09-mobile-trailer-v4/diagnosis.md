# Mobile Trailer Fix - PLAN B v4 Final Report

## What Shipped

### Solution
- **Mobile (<768px):** TMDB backdrop via next/image with `priority` (LCP element), gold branded play button. Tap opens YouTube fullscreen.
- **Desktop (≥768px):** YouTube iframe unchanged - exact same behavior as before.

### Files Changed
1. `NetflixHero.tsx` - /cinema page
2. `HeroTrailerPlayer.tsx` - /regional page  
3. `RegionalTrailerHero.tsx` - /regional page

### Key Fixes
1. **LCP Optimization:** Mobile uses `next/image` with `priority` for backdrop - fastest possible LCP
2. **No YouTube on Mobile:** YouTube API script only loads on desktop (uses `isMobileRef` pattern)
3. **Pointer-events Fixed:** All gradient overlays have `pointer-events: none`, play button has `pointer-events: auto`
4. **Desktop Unmute:** Still works ✅

## Verification Results

### Production (Chromium + WebKit)
| Page | Viewport | Crash | Iframe | next/image | Play Button |
|------|----------|-------|--------|------------|-------------|
| /cinema | 390×844 | ❌ | ❌ | ✅ | ✅ |
| /cinema | 1440×900 | ❌ | ✅ | N/A | N/A |
| /regional | 390×844 | ❌ | ❌ | ✅ | ✅ |
| /regional | 1440×900 | ❌ | ✅ | N/A | N/A |

### WebKit (iPhone emulation)
| Page | next/image | Play Button | No Iframe | No Crash |
|------|------------|-------------|-----------|-----------|
| /cinema mobile | ✅ | ✅ | ✅ | ✅ |
| /regional mobile | ✅ | ✅ | ✅ | ✅ |

### LCP Check
- Mobile: `img[data-nimg="fill"]` present (next/image) ✅
- Mobile: YouTube requests = 0 after hydration ✅

### Desktop Unmute Button
- Present: ✅
- Clickable: ✅

## Merge
- **Branch:** `main`
- **Commit:** `1897afb`
- **Deployed:** ✅

## Screenshots
- `/verification/2026-07-09-mobile-trailer-v4/cinema-mobile.png`
- `/verification/2026-07-09-mobile-trailer-v4/cinema-desktop.png`
- `/verification/2026-07-09-mobile-trailer-v4/regional-mobile.png`
- `/verification/2026-07-09-mobile-trailer-v4/regional-desktop.png`
