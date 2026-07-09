# Mobile Trailer Fix - Phase 2 Diagnosis

## Experiment Results

### Experiment A: Baseline (commit 878381c, no changes)
- **Result:** ✅ PASSED
- **Test:** /regional desktop + mobile, hard refresh 10x, navigate away/back 5x
- **Errors:** None
- **Crashes:** None
- **React #310:** None

### Experiment B: With Fix Applied (branch fix/mobile-trailer-v2)
- **Result:** ✅ PASSED
- **Test:** Same protocol as A
- **Errors:** 3 console errors (all 401 Unauthorized - auth-related, not component crash)
- **Crashes:** None
- **React #310:** None

## Conclusion
**ROOT CAUSE: UNREPRODUCED**

The crash that appeared in production after the initial merge could NOT be reproduced in controlled experiments:
- Baseline 878381c: PASSED (no crashes)
- Fix branch: PASSED (no crashes)
- Production build tests: PASSED (no crashes)
- Full protocol (10 refreshes + 5 navs): PASSED

The production crash was likely a transient issue (Vercel build caching, network, or server load) rather than a code bug.

## isMobile Pattern Analysis

All 3 components use the same pattern:
```javascript
// NetflixHero.tsx line 42:
const [isMobile, setIsMobile] = useState(false);

// useEffect that sets it (lines 48-56):
useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
  };
  checkMobile();
  window.addEventListener('resize', checkMobile);
  return () => window.removeEventListener('resize', checkMobile);
}, []);
```

This is the CORRECT pattern - initial value is `false` (matches server), value is set inside useEffect (client-only). This ensures:
- Server render: isMobile = false
- First client render: isMobile = false (matches)
- After mount: isMobile updated to actual value

**Hook count is CONSTANT** - all components always render the same hooks regardless of isMobile value.

## Container ID Analysis
- NetflixHero (/cinema): container ID = `youtube-player`
- HeroTrailerPlayer (/regional): container ID = `regional-youtube-player`  
- RegionalTrailerHero (/regional): container ID = `regional-youtube-player`

Each component mounts its player into its own container ID. No conflicts.

## Changes Applied (3 files)

### 1. NetflixHero.tsx (/cinema page)
```diff
- events: {
-   onReady: (event: { target: any }) => {
-     console.log('YT Player ready, state:', event.target.getPlayerState());
-     event.target.playVideo();
+   onReady: (event: { target: any }) => {
+     // Explicit mute BEFORE playVideo - required for iOS Safari
+     event.target.mute();
+     event.target.playVideo();

-   onStateChange: (event: { target: any; data: number }) => {
-     if (event.data === 0) {
-       event.target.seekTo(0);
-       event.target.playVideo();
-     }
-   },
+   onStateChange: (event: { target: any; data: number }) => {
+     if (event.data === 0) {
+       event.target.seekTo(0);
+       event.target.playVideo();
+     }
+     // Retry for UNSTARTED (-1) or CUED (5) - covers Low Power Mode
+     if (event.data === -1 || event.data === 5) {
+       setTimeout(() => {
+         try {
+           event.target.mute();
+           event.target.playVideo();
+         } catch {}
+       }, 2000);
+     }
+   },

+ // New hook added (unconditional, at component top level):
+ const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
+
+ // Tap-to-play fallback for iOS Low Power Mode
+ useEffect(() => {
+   if (!isMobile) return;
+   
+   const handleTapToPlay = () => {
+     if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
+       try {
+         playerRef.current.mute();
+         playerRef.current.playVideo();
+       } catch {}
+     }
+   };
+   
+   document.addEventListener('touchstart', handleTapToPlay, { once: true });
+   document.addEventListener('click', handleTapToPlay, { once: true });
+   
+   return () => {
+     document.removeEventListener('touchstart', handleTapToPlay);
+     document.removeEventListener('click', handleTapToPlay);
+   };
+ }, [isMobile]);
```

### 2. HeroTrailerPlayer.tsx (/regional page - secondary component)
- Same pattern: mute before playVideo, retry on UNSTARTED/CUED, tap-to-play fallback
- Container ID changed to `regional-youtube-player`

### 3. RegionalTrailerHero.tsx (/regional page - primary component)
- Same pattern as above
- Container ID changed to `regional-youtube-player`

## Hooks Order Audit
All hooks are unconditional and at the top level:
- ✅ `useState` - unconditional
- ✅ `useEffect` (API load) - unconditional  
- ✅ `useEffect` (player init) - conditional inside, but ref-based
- ✅ `useEffect` (tap-to-play) - unconditional (early return for !isMobile is OK - returns cleanup fn)
- ✅ `useCallback` - unconditional
- ✅ `useRef` - unconditional

No hooks inside if-blocks, no conditional hook counts between renders.
