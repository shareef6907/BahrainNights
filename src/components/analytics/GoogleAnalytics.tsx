'use client';

import Script from 'next/script';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  );
}

// Helper to track custom events
export function trackEvent(eventName: string, parameters?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('event', eventName, parameters);
  }
}

// Track PWA install
export function trackPWAInstall(method: 'prompt' | 'ios_manual') {
  trackEvent('pwa_install', {
    method,
    event_category: 'PWA',
    event_label: method === 'prompt' ? 'Install Prompt' : 'iOS Manual',
  });
}

// Track PWA install prompt shown
export function trackPWAPromptShown() {
  trackEvent('pwa_install_prompt_shown', {
    event_category: 'PWA',
  });
}

// Track PWA install prompt dismissed
export function trackPWAPromptDismissed() {
  trackEvent('pwa_install_prompt_dismissed', {
    event_category: 'PWA',
  });
}
