/**
 * Shared ambient typings for the YouTube IFrame API.
 *
 * Declared once, globally, so that every component that drives a YouTube
 * player (the shared TrailerPlayer, the homepage TrailerModal, ...) agrees on
 * the shape of `window.YT` and `window.onYouTubeIframeAPIReady`. Two separate
 * `declare global` blocks with different shapes are a compile error
 * (TS2687 / TS2717).
 */

export interface YTPlayerInstance {
  playVideo: () => unknown;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  setVolume: (volume: number) => void;
  getPlayerState: () => number;
  getCurrentTime: () => number;
  getDuration: () => number;
  destroy: () => void;
}

export interface YTPlayerConfig {
  videoId?: string;
  playerVars?: Record<string, string | number>;
  events?: {
    onReady?: (event: { target: YTPlayerInstance }) => void;
    onStateChange?: (event: { data: number; target: YTPlayerInstance }) => void;
    onError?: (event: { data: number }) => void;
  };
}

declare global {
  interface Window {
    YT?: {
      Player: new (
        element: HTMLIFrameElement | HTMLDivElement | string,
        config: YTPlayerConfig
      ) => YTPlayerInstance;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}
