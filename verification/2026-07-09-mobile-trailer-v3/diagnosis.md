# Mobile Trailer Fix - Phase 3 Report (PLAN B)

## Diagnosis Findings (Production)

### Before Fix
- Iframe URL: Contains all required params (`autoplay=1`, `mute=1`, `playsinline=1`, `enablejsapi=1`, `origin=`) ✅
- Overlay issue: Content at z-10 blocks iframe taps ❌

### Root Cause
YouTube autoplay blocked on real iOS devices due to:
1. Browser restrictions on autoplay with sound
2. Overlay elements blocking tap targets
3. Chromium emulation doesn't reflect real device behavior

## Solution Implemented: PLAN B

### Netflix Mobile Pattern
- **Mobile (<768px):** Show TMDB backdrop image + branded play button
- **Desktop:** YouTube iframe unchanged
- **Mobile tap:** Opens YouTube in fullscreen new tab

### Files Changed
1. `NetflixHero.tsx` (/cinema)
2. `RegionalTrailerHero.tsx` (/regional)  
3. `HeroTrailerPlayer.tsx` (/regional)

### Local Test Results
| Page | Viewport | Poster | Play Button | Iframe | Crash |
|------|----------|--------|--------------|--------|-------|
| /cinema | 390×844 | ✅ | ✅ | ❌ | ❌ |
| /cinema | 1440×900 | ❌ | ❌ | ✅ | ❌ |
| /regional | 390×844 | ✅ | ✅ | ❌ | ❌ |
| /regional | 1440×900 | ❌ | ❌ | ✅ | ❌ |

## Production Verification

### Test Results
- Desktop: YouTube iframe works ✅
- Mobile: Poster + button pattern renders ✅
- No crashes ✅
- No console errors ✅

### Screenshots
- `/verification/2026-07-09-mobile-trailer-v3/-cinema-desktop.png`
- `/verification/2026-07-09-mobile-trailer-v3/-cinema-mobile.png`
- `/verification/2026-07-09-mobile-trailer-v3/-regional-desktop.png`
- `/verification/2026-07-09-mobile-trailer-v3/-regional-mobile.png`

## Notes
- WebKit not installed on machine - could not run WebKit tests
- Xcode/Simulator not available - no iOS device tests
- Real device testing needed to verify tap-to-play behavior
- Solution is Netflix-proven pattern: faster LCP, no autoplay issues

## Merge
- Branch: `fix/mobile-trailer-v3`
- Commit: `67b8fc8`
- Deployed to production ✅
