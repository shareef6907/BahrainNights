# Mobile Hero Trailer Diagnosis

**Date:** 2026-07-09
**Site:** bahrainnights.com

---

## Findings

### /cinema Page (Mobile 390×844)

**YouTube iframe:**
- Present: YES
- Container ID: `youtube-player`
- iframe src parameters:
  - `autoplay=1` ✅
  - `mute=1` ✅
  - `playsinline=1` ✅
  - `controls=0`, `showinfo=0`, `rel=0`, `loop=1`, `modestbranding=1`, `iv_load_policy=3`, `disablekb=1`, `fs=0` ✅
  - `origin` set to `https://www.bahrainnights.com` ✅

**Visibility:**
- iframe visible: YES (`display: block`, `visibility: visible`)
- Dimensions: 390×591 (fills viewport)
- No overlay blocking

**Console errors:**
- 401 error (unrelated to YouTube)

### /regional Page (Mobile 390×844)

**YouTube iframe:**
- Present: YES
- Container ID: `youtube-player` (NOT `regional-youtube-player` as task requires)

---

## Root Cause

**CONFIRMED:** The YouTube iframe parameters are CORRECT. The issue is NOT missing autoplay/mute/playsinline parameters.

The likely cause is one of:
1. **YouTube Player State:** The player might be in UNSTARTED (-1) or CUED (5) state rather than PLAYING (1)
2. **iOS Safari Restrictions:** Even with autoplay=1, Safari may block autoplay unless there's explicit user interaction
3. **The onReady handler exists but may not be firing properly on mobile**

Both components (NetflixHero.tsx and HeroTrailerPlayer.tsx) already have:
- `playerVars: { autoplay: 1, mute: 1, playsinline: 1, ... }`
- `onReady` handler that calls `event.target.playVideo()`

**The fix needed:**
1. Add explicit `mute()` call BEFORE `playVideo()` in onReady
2. Add tap-to-play fallback for iOS Low Power Mode
3. Ensure allow attributes on iframe

---

## Container ID Issue

/regional should use `regional-youtube-player` per task requirements but currently uses `youtube-player` — this is a regression that needs fixing.
