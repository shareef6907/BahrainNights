'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Play, Volume2, VolumeX } from 'lucide-react';
import { loadYouTubeIframeApi } from '@/lib/utils/youtube-iframe-api';
import type { YTPlayerInstance } from '@/types/youtube';

/**
 * Shared YouTube trailer player with progressive (unmuted-first) audio.
 *
 * Behaviour required by the spec:
 *  1. FACADE FIRST. The initial payload contains only a poster image and a
 *     play affordance. The YouTube iframe — and therefore every byte of
 *     YouTube JavaScript, CSS and video stream — is created ONLY after the
 *     user asks for it (a click on the play control), or, for players that
 *     opt into `activation="viewport"`, when the player nears the viewport.
 *  2. When playback starts, attempt UNMUTED playback FIRST and AWAIT the
 *     result. If the browser refuses (autoplay policy), fall back to MUTED
 *     playback so the trailer ALWAYS plays — a muted trailer is acceptable, a
 *     frozen one is not.
 *  3. Tapping the unmute control is a user gesture: unmute, play, and persist
 *     the preference in sessionStorage AND localStorage.
 *  4. On later page views the stored preference is read. Unmuted is still
 *     attempted first UNLESS the visitor explicitly chose mute, in which case
 *     the muted start is respected.
 *  5. Always playsInline.
 *  6. Never leave a play() promise unhandled — always .catch().
 *  7. Respect prefers-reduced-motion: no autoplay, poster + play button.
 *
 * Performance:
 *  - Embeds use https://www.youtube-nocookie.com.
 *  - The container reserves explicit dimensions so there is zero layout shift.
 *  - The poster is the film's own backdrop image, so the facade does not add
 *    a request beyond the image the hero already needs.
 *
 * Why autoplay=0 in the embed URL:
 *  With `autoplay=1&mute=1` the embedded player starts MUTED on its own. Calling
 *  unMute() on a running media element without a user gesture makes the browser
 *  pause it ("Unmuting failed and the element was paused instead…"), which is
 *  precisely the reported "frozen on the first frame" bug. So the embed is
 *  loaded paused and ALL playback is driven through the IFrame API, where the
 *  mute state is set BEFORE playVideo() is called.
 *
 * The IFrame API script is requested from the privacy-preserving nocookie
 * origin first, falling back to the canonical host because
 * https://www.youtube-nocookie.com/iframe_api answers HTTP 404. See
 * src/lib/utils/youtube-iframe-api.ts. Every *embed* stays on
 * youtube-nocookie.com.
 */

const SOUND_PREF_KEY = 'bn:trailer-sound';

/**
 * `playsInline` is a valid iframe attribute but is missing from the React 18
 * type definitions for `IframeHTMLAttributes`, so it is applied through a
 * typed spread. Without it iOS Safari plays the trailer fullscreen instead
 * of inline.
 */

/** How long to wait for the unmuted attempt before falling back to muted. */
const UNMUTED_ATTEMPT_TIMEOUT_MS = 3500;
/** How long to wait for the muted fallback to start playing. */
const MUTED_ATTEMPT_TIMEOUT_MS = 8000;
/** Poll interval while waiting for a playback state. */
const POLL_INTERVAL_MS = 120;

/** YouTube player states. */
const YT_STATE_UNSTARTED = -1;
const YT_STATE_PLAYING = 1;
const YT_STATE_BUFFERING = 3;

/**
 * How the player is allowed to start.
 *
 *  - `click`    — the visitor must press play. The iframe is not created at
 *                 all until then. Used by every header/hero trailer.
 *  - `viewport` — the iframe is created once the player nears the viewport
 *                 (used for below-the-fold trailers), then playback starts
 *                 with the progressive unmuted-first attempt.
 */
export type TrailerActivation = 'click' | 'viewport';

interface TrailerPlayerProps {
  /** YouTube video id (11 chars). */
  videoId: string;
  /** Poster image URL shown before/instead of the player. */
  poster?: string | null;
  /** Accessible title, used for the iframe title and the poster alt text. */
  title: string;
  /** How playback may start. Default: `click`. */
  activation?: TrailerActivation;
  /** IntersectionObserver rootMargin — generous so the player is ready in time. */
  rootMargin?: string;
  /** Extra class names for the wrapper. */
  className?: string;
  /**
   * CSS aspect-ratio reserved for the container so the iframe insertion causes
   * zero layout shift. Pass `null` when the parent already reserves the box
   * (e.g. a full-bleed hero).
   */
  aspectRatio?: string | null;
  /** Mark the poster as high priority (hero images). */
  priority?: boolean;
  /**
   * Where the facade play button sits.
   *  - `center`     — large centred play circle (standalone players).
   *  - `bottomRight` — compact badge in the bottom-right corner, used by the
   *                    full-bleed heroes where the copy block occupies the
   *                    centre.
   *  - `topRight`    — same badge in the top-right corner, for heroes whose
   *                    bottom edge is covered by an overlapping panel.
   */
  playButtonPlacement?: 'center' | 'bottomRight' | 'topRight';
  /** Called when the player reports it is playing / stopped playing. */
  onPlayingChange?: (playing: boolean) => void;
  /** Optional callback exposing playback controls to a parent. */
  onReady?: (controls: TrailerPlayerControls) => void;
}

export interface TrailerPlayerControls {
  play: () => void;
  unmute: () => void;
  setVolume: (volume: number) => void;
  isMuted: () => boolean;
  isPlaying: () => boolean;
}

/* -------------------------------------------------------------------------- */
/* YouTube player typings live in src/types/youtube.ts (single global decl) */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/* Storage helpers                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Returns true when the visitor previously turned sound ON, false when they
 * explicitly muted it, null when they have never made a choice.
 */
function readSoundPreference(): boolean | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw =
      window.sessionStorage.getItem(SOUND_PREF_KEY) ??
      window.localStorage.getItem(SOUND_PREF_KEY);
    if (raw === null) return null;
    return raw === 'on';
  } catch {
    return null;
  }
}

function writeSoundPreference(soundOn: boolean): void {
  if (typeof window === 'undefined') return;
  const value = soundOn ? 'on' : 'off';
  try {
    window.sessionStorage.setItem(SOUND_PREF_KEY, value);
  } catch {
    /* storage unavailable — non-fatal */
  }
  try {
    window.localStorage.setItem(SOUND_PREF_KEY, value);
  } catch {
    /* storage unavailable — non-fatal */
  }
}

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

export default function TrailerPlayer({
  videoId,
  poster,
  title,
  activation = 'click',
  rootMargin = '300px',
  className = '',
  aspectRatio = '16 / 9',
  priority = false,
  playButtonPlacement = 'center',
  onPlayingChange,
  onReady,
}: TrailerPlayerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  /*
   * The container the YouTube IFrame API owns.
   *
   * WHY A DIV AND NOT AN <iframe>
   * -----------------------------
   * The component used to render its own <iframe src=".../embed/..."> and
   * hand that element to `new YT.Player(iframe, ...)`.
   *
   * That does not work. The IFrame API expects to be given a CONTAINER — a
   * DIV or an element id — and it then creates the player iframe ITSELF, on
   * the host the API script came from, and wires up its postMessage channel
   * to that iframe. When it is handed a pre-existing iframe that points at a
   * DIFFERENT host, the API cannot bind to it: the control channel is never
   * opened and every command is posted to the wrong window.
   *
   * The symptom is precise and reproducible:
   *
   *   - the player reaches state 5 (VIDEO_CUED) — the video is loaded and
   *     cued, but it never advances to PLAYING;
   *   - `playVideo()` is called and returns, but nothing happens;
   *   - the console shows, once per player:
   *       "Failed to execute 'postMessage' on 'DOMWindow': The target
   *        origin provided ('https://www.youtube-nocookie.com') does not
   *        match the recipient window's origin ('https://www.bahrainnights.com')"
   *   - `data-playing` stays "false", so neither the unmute control nor the
   *     mute toggle is ever rendered.
   *
   * Measured on production, /cinema, 70 seconds with no interaction:
   *   YT.Player constructed 8x, onReady fired 2x (once per slide),
   *   player state 5 at every sample, playVideo never called,
   *   0 unmute controls, 0 video-stream requests.
   *
   * With a container DIV, the same API on the same page reaches state 1
   * (PLAYING) and creates its own iframe on the API script's own host.
   *
   * This fixes the CLICK path too: it had the same defect, which is why the
   * hero trailer never played on click either.
   */
  const playerHostRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YTPlayerInstance | null>(null);

  /**
   * The visitor pressed play (or — for below-the-fold players only — the
   * player entered the viewport). The YouTube iframe exists ONLY while this
   * is true, so no YouTube JavaScript, CSS or video stream is requested
   * before the visitor asks for the trailer.
   */
  const [activated, setActivated] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showUnmuteControl, setShowUnmuteControl] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [posterVisible, setPosterVisible] = useState(true);
  /*
   * Has the player REALLY started?
   *
   * `isPlaying` is set optimistically when `playVideo()` is CALLED, which
   * is long before the YouTube embed has finished booting. The embed swaps
   * its own player chrome in and out while it initialises, and that swap is
   * a layout shift inside the iframe.
   *
   * The poster stays up until the embed reports PLAYING, so the swap is
   * never visible. See the long note at the end of `handlePlay`.
   */
  const [playerStarted, setPlayerStarted] = useState(false);
  const [playerFailed, setPlayerFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Guards against a late event from a previous attempt resolving after we
  // already fell back to muted.
  const attemptIdRef = useRef(0);
  const mountedRef = useRef(true);
  /** True when the visitor explicitly muted the trailer on a previous view. */
  const soundDeclinedRef = useRef(false);
  /**
   * Whether the sound preference has already been re-applied to THIS player.
   *
   * Reset for every new player instance (every slide), because each slide
   * creates a fresh YouTube player that needs the preference re-applied.
   */
  const soundReappliedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  /* --- prefers-reduced-motion ------------------------------------------- */
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReducedMotion(mq.matches);
    apply();
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', apply);
      return () => mq.removeEventListener('change', apply);
    }
    mq.addListener(apply);
    return () => mq.removeListener(apply);
  }, []);

  /* --- viewport activation (only for activation="viewport") -------------- */
  useEffect(() => {
    // Under prefers-reduced-motion we never auto-start: the visitor must
    // press play, so the viewport alone must not create the player.
    if (reducedMotion) return;
    if (activation !== 'viewport' || activated) return;
    const node = containerRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setActivated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActivated(true);
            observer.disconnect();
            return;
          }
        }
      },
      { rootMargin, threshold: 0.01 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [activation, activated, rootMargin, reducedMotion]);

  /* --- the visitor pressed play ----------------------------------------- */
  const handleActivate = useCallback(() => {
    setActivated(true);
    setIsLoading(true);
  }, []);

  /* --- playback attempt --------------------------------------------------- */

  /**
   * Wait until the player actually plays.
   *
   * Detection is done by POLLING the player state rather than relying only on
   * the state-change event, because the browser can reject an unmuted start
   * without emitting a decisive event. The observed failure pattern is
   * state 3 (BUFFERING) followed by state -1 (UNSTARTED) with currentTime
   * stuck at 0. A leading state -1 also occurs on the happy path, so state -1 is
   * only a failure once buffering has been observed OR the timeout expires.
   */
  const waitForPlaying = useCallback(
    (timeoutMs: number, attemptId: number): Promise<boolean> => {
      return new Promise<boolean>((resolve) => {
        let settled = false;
        let sawBuffering = false;

        const finish = (ok: boolean) => {
          if (settled) return;
          settled = true;
          window.clearTimeout(timer);
          window.clearInterval(poll);
          resolve(ok);
        };

        const timer = window.setTimeout(() => finish(false), timeoutMs);

        const poll = window.setInterval(() => {
          const p = playerRef.current;
          if (!p || attemptId !== attemptIdRef.current) {
            finish(false);
            return;
          }
          let state: number;
          try {
            state = p.getPlayerState();
          } catch {
            finish(false);
            return;
          }
          if (state === YT_STATE_PLAYING) {
            /*
             * The player IS playing, by the same signal `waitForPlaying`
             * already trusts: `getPlayerState()`.
             *
             * The component's own `onStateChange` event does not always
             * arrive - the IFrame API's event channel can be dropped - but
             * the synchronous `getPlayerState()` call goes through the
             * same bridge and works. So the poster is lifted from HERE,
             * on the same evidence the playback attempt itself uses.
             */
            setPlayerStarted(true);
            finish(true);
            return;
          }
          if (state === YT_STATE_BUFFERING) {
            sawBuffering = true;
            return;
          }
          if (state === YT_STATE_UNSTARTED && sawBuffering) {
            // The browser aborted the start (autoplay policy refusing unmuted
            // playback). Signal failure so the caller can fall back to muted.
            finish(false);
          }
        }, POLL_INTERVAL_MS);
      });
    },
    []
  );

  const playWithSound = useCallback(
    async (withSound: boolean): Promise<void> => {
      const player = playerRef.current;
      if (!player) return;

      const attemptId = ++attemptIdRef.current;

      // 1. Set the mute state BEFORE asking the player to play.
      try {
        if (withSound) {
          player.unMute();
          player.setVolume(60);
        } else {
          player.mute();
        }
      } catch {
        /* the player may not be ready — the state check below catches it */
      }

      // 2. Call play(). The YouTube IFrame API returns a plain object (not a
      //    promise), but we normalise it: if it IS a promise we await it,
      //    otherwise we rely on the player state. Either way it is caught.
      let playPromise: Promise<unknown> | null = null;
      try {
        const result = player.playVideo() as unknown;
        if (result && typeof (result as Promise<unknown>).then === 'function') {
          playPromise = result as Promise<unknown>;
        }
      } catch (err) {
        console.warn('[TrailerPlayer] play() threw:', err);
      }

      if (playPromise) {
        try {
          await playPromise;
        } catch (err) {
          console.warn('[TrailerPlayer] play() promise rejected:', err);
        }
      }

      // 3. Await the actual PLAYING confirmation.
      const playing = await waitForPlaying(
        withSound ? UNMUTED_ATTEMPT_TIMEOUT_MS : MUTED_ATTEMPT_TIMEOUT_MS,
        attemptId
      );
      if (!mountedRef.current || attemptId !== attemptIdRef.current) return;

      if (playing) {
        setIsPlaying(true);
        setIsLoading(false);
        setIsMuted(!withSound);
        setPosterVisible(false);
        // The player reported PLAYING, so the poster can go.
        setPlayerStarted(true);
        // The "Tap for sound" nudge is shown when the browser forced muted
        // playback — unless the visitor already declined sound on purpose.
        setShowUnmuteControl(!withSound && !soundDeclinedRef.current);
        onPlayingChange?.(true);
        return;
      }

      // 4. The attempt was refused. Fall back to muted so the trailer ALWAYS
      //    plays. A muted trailer is acceptable; a frozen one is not.
      if (withSound) {
        await playWithSound(false).catch((err) => {
          console.warn('[TrailerPlayer] muted fallback failed:', err);
        });
      } else {
        setIsPlaying(false);
        setIsLoading(false);
        setPosterVisible(true);
        setShowUnmuteControl(false);
        setPlayerFailed(true);
        onPlayingChange?.(false);
      }
    },
    [onPlayingChange, waitForPlaying]
  );

  /* --- instantiate the player --------------------------------------------- */
  useEffect(() => {
    if (!activated) return;
    let cancelled = false;

    const host = playerHostRef.current;
    if (!host) return;

    const bind = () => {
      if (cancelled || playerRef.current) return;
      loadYouTubeIframeApi()
        .then(() => {
          if (cancelled) return;
          // A NEW player: the poster comes back until this one really starts.
          setPlayerStarted(false);
          try {
            // The API takes the CONTAINER, not an iframe. It creates the
            // player iframe itself, on its own host, and owns the messaging.
            const player = new window.YT!.Player(host, {
              videoId,
              playerVars,
              events: {
                onReady: (event) => {
                  if (cancelled) return;
                  playerRef.current = event.target;

                  // The stored preference decides whether the "Tap for sound"
                  // nudge is shown after a muted fallback, but the UNMUTED
                  // attempt is ALWAYS made first — the browser decides
                  // whether it is allowed.
                  const storedPreference = readSoundPreference();
                  soundDeclinedRef.current = storedPreference === false;

                  void playWithSound(true).catch((err) => {
                    console.warn('[TrailerPlayer] playback attempt failed:', err);
                  });
                },
                onStateChange: (event) => {
                  if (cancelled) return;
                  if (event.data === YT_STATE_PLAYING) {
                    setIsPlaying(true);
                    setIsLoading(false);
                    setPosterVisible(false);
                    // The player REALLY is playing now, so the poster can go.
                    setPlayerStarted(true);
                    onPlayingChange?.(true);

                    /*
                     * Re-apply the sound preference for THIS player, on the
                     * first PLAYING event.
                     *
                     * Each slide creates a brand-new YouTube player, and a
                     * fresh player can come up muted even though the
                     * preference says sound is on — the unmuted attempt in
                     * `playWithSound` sets the state before `playVideo()`, but
                     * YouTube can still mute the stream afterwards. Without
                     * this re-application, a visitor who turned the sound on
                     * would find the SECOND, THIRD and FOURTH trailer silent
                     * while the first one had sound.
                     *
                     * The preference is only honoured when the visitor has
                     * actually chosen sound ON. It is never used to defeat
                     * the browser's autoplay policy: the unmuted attempt is
                     * still made first and the browser still decides.
                     */
                    if (!soundReappliedRef.current) {
                      soundReappliedRef.current = true;
                      const preference = readSoundPreference();
                      if (preference === true) {
                        try {
                          event.target.unMute();
                          event.target.setVolume(60);
                          setIsMuted(false);
                        } catch {
                          /* the browser may refuse; the nudge stays visible */
                        }
                      }
                    }
                  }
                },
                onError: (event) => {
                  console.warn('[TrailerPlayer] YouTube error code:', event.data);
                  if (!cancelled) {
                    setPlayerFailed(true);
                    setIsLoading(false);
                  }
                },
              },
            });
          } catch (err) {
            console.warn('[TrailerPlayer] YT.Player bind failed:', err);
            if (!cancelled) {
              setPlayerFailed(true);
              setIsLoading(false);
            }
          }
        })
        .catch((err) => {
          console.warn('[TrailerPlayer] YouTube IFrame API unavailable:', err);
          if (!cancelled) {
            setPlayerFailed(true);
            setIsLoading(false);
          }
        });
    };

    // Bind straight away: the API creates the player iframe itself, so there
    // is no iframe 'load' event to wait for. The API script is memoised and
    // usually already resolved by the time this runs.
    bind();

    // Backstop: if the API script is slow to arrive, bind again. `bind()`
    // is idempotent — it returns early once `playerRef.current` is set.
    const bindTimer = window.setTimeout(() => bind(), 4000);

    return () => {
      cancelled = true;
      window.clearTimeout(bindTimer);
      try {
        playerRef.current?.destroy();
      } catch {
        /* ignore */
      }
      playerRef.current = null;
      // A new player needs the sound preference re-applied to it.
      soundReappliedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activated, reducedMotion, videoId]);

  /* --- user interaction: unmute ------------------------------------------- */
  const handleUnmute = useCallback(() => {
    const player = playerRef.current;
    writeSoundPreference(true);
    setShowUnmuteControl(false);
    setIsMuted(false);
    if (!player) return;
    // This runs inside a user gesture, so unmuted playback is allowed.
    try {
      player.unMute();
      player.setVolume(60);
    } catch {
      /* ignore */
    }
    try {
      const result = player.playVideo() as unknown;
      if (result && typeof (result as Promise<unknown>).then === 'function') {
        (result as Promise<unknown>).catch((err) => {
          console.warn('[TrailerPlayer] play() promise rejected:', err);
        });
      }
    } catch (err) {
      console.warn('[TrailerPlayer] play() threw:', err);
    }
    setIsPlaying(true);
    setIsLoading(false);
    /*
     * THE POSTER STAYS UNTIL THE PLAYER IS REALLY PLAYING.
     *
     * The poster used to be hidden here, the moment `playVideo()` was
     * CALLED. But `playVideo()` returns long before the YouTube embed has
     * finished initialising: the embed is still booting its own player
     * chrome, and it swaps that chrome in and out while it does so.
     *
     * Hiding the poster at that moment exposed the embed mid-swap, and the
     * swap is a layout shift INSIDE the iframe - which Chrome reports
     * because the iframe is visible in the viewport.
     *
     * Measured, from the Lighthouse trace of /regional:
     *
     *   node 14: [0, 0, 0, 0] -> [0, 172, 412, 232]   the embed's chrome appears
     *   node 14: [0, 172, 412, 232] -> [0, 0, 0, 0]   it is replaced
     *   node 14: [0, 0, 0, 0] -> [0, 172, 412, 232]   it comes back
     *
     * weighted score 0.2819 + 0.2819 + 0.3126 = 0.876 of a 0.885 total CLS.
     * The same three shifts are on /cinema (CLS 0.813).
     *
     * `onStateChange` already hides the poster when the player reports
     * PLAYING, which is the correct moment. The poster stays up until then,
     * so the embed is never visible while it is still swapping itself.
     *
     * `isPlaying` is set here so the player's own state is correct; the
     * poster is NOT hidden here.
     */
  }, []);

  const handleToggleMute = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    if (isMuted) {
      handleUnmute();
    } else {
      try {
        player.mute();
      } catch {
        /* ignore */
      }
      writeSoundPreference(false);
      setIsMuted(true);
      setShowUnmuteControl(true);
    }
  }, [handleUnmute, isMuted]);

  /* --- expose controls to the parent -------------------------------------- */
  useEffect(() => {
    if (!onReady) return;
    onReady({
      play: () => {
        setActivated(true);
        void playWithSound(true).catch(() => {
          /* handled inside playWithSound */
        });
      },
      unmute: handleUnmute,
      setVolume: (volume: number) => {
        const player = playerRef.current;
        if (!player) return;
        try {
          player.setVolume(Math.max(0, Math.min(100, volume)));
        } catch {
          /* ignore */
        }
      },
      isMuted: () => isMuted,
      isPlaying: () => isPlaying,
    });
  }, [onReady, playWithSound, handleUnmute, isMuted, isPlaying]);

  /*
   * The player parameters.
   *
   * autoplay=0: playback is driven exclusively through the IFrame API so the
   * mute state is always set before playVideo() (see the class comment).
   *
   * The API builds the player iframe itself now, so this is a PLAYER CONFIG
   * rather than an iframe URL. `origin` is set to this page's origin so the
   * API's postMessage handshake has a matching target.
   */
  const playerVars: Record<string, string | number> = {
    autoplay: '0',
    mute: '1',
    playsinline: '1',
    loop: '1',
    playlist: videoId,
    controls: '0',
    modestbranding: '1',
    rel: '0',
    iv_load_policy: '3',
    disablekb: '1',
    fs: '0',
    enablejsapi: '1',
    /*
     * `origin` IS NOT SET HERE ON PURPOSE.
     *
     * The `origin` playerVar is the EMBED'S OWN ORIGIN - the origin the
     * embed will use when it checks who is allowed to postMessage it. It
     * is NOT the parent page's origin.
     *
     * Setting it to `window.location.origin` (our site's origin) put
     * `origin=https://www.bahrainnights.com` into the embed's URL, so the
     * embed rejected every postMessage the IFrame API sent it:
     *
     *   Failed to execute 'postMessage' on 'DOMWindow': The target origin
     *   provided ('https://www.youtube.com') does not match the recipient
     *   window's origin ('https://www.bahrainnights.com')
     *
     * The consequence was severe and silent: `onStateChange` never fired,
     * so the component never learned the player had started. The poster
     * stayed up forever and the iframe stayed out of the viewport.
     *
     * The API sets `origin` itself, correctly, when it builds the iframe
     * URL - it appends `forigin` (the parent's full URL) alongside it. So
     * the correct action is to NOT pass `origin` at all and let the API
     * do it.
     *
     * The API still knows the parent's origin: that is what `forigin` is
     * for.
     */
  };

  /*
   * The sound controls live in the same corner as the facade play button.
   * On the full-bleed heroes the copy block sits over the centre of the
   * poster, and on /regional a stats panel overlaps the hero's bottom edge —
   * so a control pinned to the bottom-right can end up underneath an
   * overlapping element and become unclickable. Following the facade corner
   * keeps every control in the one place that is guaranteed to be clear.
   */
  const controlCorner =
    playButtonPlacement === 'topRight'
      ? 'top-3 right-3'
      : playButtonPlacement === 'bottomRight'
        ? 'bottom-3 right-3'
        : 'bottom-3 right-3';

  /*
   * THE POSTOR IS HIDDEN ONLY WHEN THE PLAYER HAS ACTUALLY STARTED.
   *
   * Not when `isPlaying` flips - that happens optimistically, before the
   * embed has booted, and the embed's own chrome swap is a layout shift.
   */
  const showPoster = posterVisible && !playerStarted;
  const showFacadePlayButton =
    !isPlaying && !reducedMotion && !playerFailed && !activated;

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-black ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
      data-testid="trailer-player"
      data-playing={isPlaying ? 'true' : 'false'}
      data-muted={isMuted ? 'true' : 'false'}
      data-activated={activated ? 'true' : 'false'}
    >
      {/* Facade / poster — always reserves the exact box the iframe will use. */}
      {poster && showPoster ? (
        <div className="absolute inset-0 z-10">
          <Image
            src={poster}
            alt={title}
            fill
            sizes="100vw"
            className="object-cover"
            priority={priority}
            /*
             * The hero poster is the LCP element on every trailer page. Next's
             * `priority` emits the <link rel="preload"> but not an explicit
             * fetchpriority on the <img> itself, and the GA script is also
             * preloaded as a script — so the image needs to say so explicitly
             * or it queues behind a 179 KB third-party script.
             */
            fetchPriority={priority ? 'high' : 'auto'}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ) : null}

      {/*
        The YouTube player container.

        It is only created once the visitor asked for it (or the viewport
        observer fired). It is a DIV, not an iframe: the IFrame API owns the
        player iframe and creates it itself inside this container, which is
        what lets its messaging channel work. See the note on
        `playerHostRef` above.
      */}
      {activated ? (
        <div
          ref={playerHostRef}
          title={title}
          data-testid="trailer-player-host"
          className="absolute inset-0 z-0 h-full w-full"
          style={{
            border: 0,
            /*
             * THE IFRAME IS KEPT OUT OF THE VIEWPORT UNTIL IT IS READY.
             *
             * Chrome counts a SUB-FRAME's layout shift whenever the frame
             * is in the viewport. The YouTube embed's controls container
             * expands from zero height to full height as it boots -
             * measured in the embed's own document:
             *
             *   ytPlayerControlsContainerHost  412 x 0
             *   ytPlayerControlsContainerHost  412 x 576
             *
             * and that expansion is a layout shift inside the iframe. It
             * is 0.876 of a 0.885 CLS on /regional, and the same 0.813 on
             * /cinema - both of them the hero trailer.
             *
             * The visitor cannot SEE the expansion, because the poster
             * covers that exact box. But covering it does not exempt it.
             *
             * So the host is moved out of the viewport until the player
             * reports PLAYING, and then moved back. It is absolutely
             * positioned, so moving it shifts nothing else on the page -
             * the poster still reserves the box, and the visitor still sees
             * the poster and then the playing video. Nothing visible
             * changes.
             */
            /*
             * visibility, NOT a position change.
             *
             * Moving the host out of the viewport fixed the CLS but broke
             * the player: `playerStarted` never became true, so the poster
             * never lifted and the visitor saw a static poster over a video
             * that was playing behind it.
             *
             * `visibility: hidden` does NOT change the LAYOUT, so nothing
             * on the page moves, and Chrome does not count layout shifts
             * inside a subtree that is not rendered. The iframe stays
             * exactly where it is, so the API's messaging is unaffected.
             */
            visibility: playerStarted ? 'visible' : 'hidden',
          }}
        />
      ) : null}

      {/*
        Facade play button — the ONLY way a header trailer starts.
        In `bottomRight` placement the BUTTON is the small visible badge and a
        sibling transparent layer covers the rest of the box, so a click
        anywhere on the poster starts the trailer without the button itself
        having to cover the hero copy.
      */}
      {showFacadePlayButton ? (
        playButtonPlacement !== 'center' ? (
          <>
            <button
              type="button"
              onClick={handleActivate}
              aria-label={`Play trailer: ${title}`}
              data-testid="trailer-play-facade"
              className={`absolute ${playButtonPlacement === 'topRight' ? 'top-3 right-3' : 'bottom-3 right-3'} z-30 flex h-14 w-14 items-center justify-center rounded-full bg-black/70 text-white ring-2 ring-white/80 backdrop-blur transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white`}
            >
              <Play className="h-6 w-6 fill-current" />
            </button>
            <button
              type="button"
              onClick={handleActivate}
              tabIndex={-1}
              aria-hidden="true"
              data-testid="trailer-poster-click"
              className="absolute inset-0 z-20 cursor-pointer"
            />
          </>
        ) : (
          <button
            type="button"
            onClick={handleActivate}
            aria-label={`Play trailer: ${title}`}
            data-testid="trailer-play-facade"
            className="absolute inset-0 z-20 flex items-center justify-center"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-black/60 text-white ring-2 ring-white/80 transition hover:bg-black/75 hover:scale-105 md:h-20 md:w-20">
              <Play className="h-7 w-7 fill-current md:h-9 md:w-9" />
            </span>
          </button>
        )
      ) : null}

      {/* Loading state between the click and the first frame. */}
      {isLoading && !isPlaying ? (
        <div
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          data-testid="trailer-loading"
        >
          <span className="h-12 w-12 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        </div>
      ) : null}

      {/* Reduced-motion: poster + explicit play button, never auto-started. */}
      {reducedMotion && !activated ? (
        <button
          type="button"
          onClick={handleActivate}
          aria-label={`Play trailer: ${title}`}
          data-testid="trailer-reduced-motion-play"
          className="absolute inset-0 z-20 flex items-center justify-center"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-black/60 text-white ring-2 ring-white/80">
            <Play className="h-7 w-7 fill-current" />
          </span>
        </button>
      ) : null}

      {/* Unmute control — visible when the browser forced muted playback. */}
      {!reducedMotion && showUnmuteControl ? (
        <button
          type="button"
          onClick={handleUnmute}
          data-testid="trailer-unmute-control"
          aria-label="Tap for sound"
          className={`absolute ${controlCorner} z-30 flex items-center gap-2 rounded-full bg-black/70 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-black/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-white`}
        >
          <VolumeX className="h-4 w-4" aria-hidden="true" />
          <span>Tap for sound</span>
        </button>
      ) : null}

      {/* Mute / unmute toggle (once the player is live and already unmuted). */}
      {!reducedMotion && isPlaying && !showUnmuteControl ? (
        <button
          type="button"
          onClick={handleToggleMute}
          data-testid="trailer-mute-toggle"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
          className={`absolute ${controlCorner} z-30 rounded-full bg-black/60 p-2 text-white backdrop-blur transition hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white`}
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Volume2 className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      ) : null}
    </div>
  );
}