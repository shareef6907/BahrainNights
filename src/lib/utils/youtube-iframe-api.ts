/**
 * Shared loader for the YouTube IFrame API script.
 *
 * The API *script* is only published on the canonical host:
 * https://www.youtube-nocookie.com/iframe_api answers HTTP 404 (verified
 * 2026-11-18), so requesting it first burns a failed request and delays the
 * player by the round trip. The canonical script is therefore loaded first,
 * with the nocookie origin kept as a fallback.
 *
 * Every *embed* still lives on youtube-nocookie.com regardless of which host
 * served the API script — verified working: YT.Player binds to a
 * youtube-nocookie.com iframe and reports PLAYING.
 *
 * The promise is memoised so the script is only ever requested once per page.
 */

export const YT_API_SCRIPT_PRIMARY = 'https://www.youtube.com/iframe_api';
export const YT_API_SCRIPT_ALTERNATE = 'https://www.youtube-nocookie.com/iframe_api';
export const YT_EMBED_ORIGIN = 'https://www.youtube-nocookie.com';

let ytApiPromise: Promise<void> | null = null;

export function loadYouTubeIframeApi(): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('YouTube IFrame API is browser-only'));
  }
  if (window.YT?.Player) return Promise.resolve();
  if (ytApiPromise) return ytApiPromise;

  ytApiPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src*="iframe_api"]'
    );
    if (existing) {
      // The script may still be loading. Wait for the global to appear.
      const poll = setInterval(() => {
        if (window.YT?.Player) {
          clearInterval(poll);
          resolve();
        }
      }, 100);
      setTimeout(() => {
        clearInterval(poll);
        if (!window.YT?.Player) reject(new Error('YouTube IFrame API did not load'));
      }, 10000);
      return;
    }

    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousReady?.();
      resolve();
    };

    const appendScript = (src: string, onError: () => void) => {
      const tag = document.createElement('script');
      tag.src = src;
      tag.async = true;
      tag.onerror = onError;
      document.head.appendChild(tag);
    };

    // Load the canonical API script first — it is the only host that serves
    // it. The nocookie origin is kept as a fallback so the player still works
    // if YouTube ever moves the script back.
    appendScript(YT_API_SCRIPT_PRIMARY, () => {
      appendScript(YT_API_SCRIPT_ALTERNATE, () => {
        reject(new Error('Failed to load YouTube IFrame API'));
      });
    });
  });

  // Never leave an unhandled rejection on the shared promise.
  ytApiPromise.catch(() => {
    ytApiPromise = null;
  });

  return ytApiPromise;
}
