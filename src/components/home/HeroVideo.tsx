'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

/**
 * Homepage hero media.
 *
 * This is the decorative brand loop on the homepage — it is NOT the cinema
 * trailer player (src/components/cinema/NetflixHero.tsx and
 * src/components/regional/*). Those are content: they load trailers on
 * mobile and they are allowed to have audio. This one is decoration, so the
 * rules are the opposite:
 *
 *   - mobile (< 1024px): the video is never requested at all. Poster only.
 *   - desktop: the video is attached late (after window load + idle) and
 *     only when the hero is actually on screen.
 *   - always muted, always playsInline. Removing either breaks autoplay in
 *     Safari / iOS completely.
 *
 * Why late: `preload="metadata"` is ignored whenever `autoplay` is set — the
 * browser starts buffering the file immediately and aggressively. With the
 * old 5.8 MB /header-1080p-v3.webm that saturated the connection and every
 * JS chunk, font and image queued behind it (1-6 KB chunks were taking
 * 5-7 seconds). `preload="none"` + a late `src` is what actually fixes it.
 */

interface HeroVideoProps {
  /** Path to the poster image. Rendered through next/image so it is served
   *  as AVIF/WebP and can be the LCP element. */
  posterSrc: string;
  /** 720p webm source (desktop only). */
  webmSrc: string;
  /** 720p mp4 source, for Safari / iOS desktop (desktop only). */
  mp4Src: string;
  /** Alt text for the poster image. */
  posterAlt: string;
}

/** Below this viewport width the hero renders poster-only — no video request. */
const MOBILE_BREAKPOINT = 1024;

export default function HeroVideo({
  posterSrc,
  webmSrc,
  mp4Src,
  posterAlt,
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [attachSources, setAttachSources] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);

  // Attach the video source late, and only on desktop.
  useEffect(() => {
    let cancelled = false;
    let observer: IntersectionObserver | null = null;
    let idleHandle: number | null = null;
    let timeoutHandle: ReturnType<typeof setTimeout> | null = null;

    const isMobileViewport = () =>
      window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches;

    const prefersReducedMotion = () =>
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const attach = () => {
      if (cancelled) return;
      // Reduced motion: no autoplay, poster only.
      if (prefersReducedMotion()) return;
      // Mobile: the video is never requested at all.
      if (isMobileViewport()) return;

      const video = videoRef.current;
      if (!video) return;

      const attachNow = () => {
        if (cancelled) return;
        setAttachSources(true);
      };

      // Only pull the video in once the hero is (nearly) in view.
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            observer?.disconnect();
            observer = null;
            if ('requestIdleCallback' in window) {
              idleHandle = window.requestIdleCallback(attachNow, { timeout: 3000 });
            } else {
              timeoutHandle = setTimeout(attachNow, 800);
            }
          }
        },
        { rootMargin: '200px' }
      );
      observer.observe(video);
    };

    if (document.readyState === 'complete') {
      attach();
    } else {
      window.addEventListener('load', attach, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener('load', attach);
      if (idleHandle !== null && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleHandle as number);
      }
      if (timeoutHandle !== null) window.clearTimeout(timeoutHandle);
      observer?.disconnect();
    };
  }, []);

  // Once the sources are attached, start playback. The promise is always
  // handled: if the browser refuses (low power mode, save-data) the poster
  // simply stays up, which is the intended fallback.
  useEffect(() => {
    if (!attachSources) return;
    const video = videoRef.current;
    if (!video) return;

    let raf = 0;
    const onPlaying = () => setVideoVisible(true);
    video.addEventListener('playing', onPlaying);

    const tryPlay = () => {
      const p = video.play();
      if (p && typeof p.catch === 'function') {
        p.catch(() => {
          // Autoplay refused — poster remains. Not an error worth shouting about.
          setVideoVisible(false);
        });
      }
    };

    // <source> children were just added — the resource selection algorithm
    // has to be re-run for the browser to pick a source and start fetching.
    raf = window.requestAnimationFrame(() => {
      if (video.networkState === video.NETWORK_EMPTY) {
        video.load();
      }
      tryPlay();
    });

    video.addEventListener('canplay', tryPlay, { once: true });

    return () => {
      window.cancelAnimationFrame(raf);
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('canplay', tryPlay);
    };
  }, [attachSources]);

  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Poster — served through next/image (AVIF/WebP), priority so it is
          the LCP element and is preloaded. Sized to the viewport because it
          is a full-bleed background image. */}
      <Image
        src={posterSrc}
        alt={posterAlt}
        fill
        priority
        quality={60}
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: 'center center' }}
      />

      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        autoPlay
        preload="none"
        disablePictureInPicture
        aria-hidden="true"
        tabIndex={-1}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
        style={{
          objectPosition: 'center center',
          opacity: videoVisible ? 1 : 0,
        }}
      >
        {attachSources && (
          <>
            <source src={webmSrc} type="video/webm" />
            <source src={mp4Src} type="video/mp4" />
          </>
        )}
      </video>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50" />
      {/* Subtle navy blue gradient at bottom to blend with background */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0F] to-transparent" />
    </div>
  );
}
