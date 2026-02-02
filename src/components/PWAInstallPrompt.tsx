'use client';

import { useState, useEffect } from 'react';
import { X, Download } from 'lucide-react';
import { trackPWAInstall, trackPWAPromptShown, trackPWAPromptDismissed } from '@/components/analytics/GoogleAnalytics';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

// Track event to internal analytics
async function trackInternalEvent(event: string, data?: Record<string, unknown>) {
  try {
    await fetch('/api/track/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, data }),
    });
  } catch (error) {
    console.debug('Track event failed:', error);
  }
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return; // Already installed, don't show prompt
    }

    // Check if dismissed recently
    const dismissed = localStorage.getItem('pwa-prompt-dismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < 7) {
        return; // Don't show for 7 days after dismissal
      }
    }

    // Check for iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    // Listen for install prompt (Android/Desktop)
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      // Show prompt after 30 seconds on site
      setTimeout(() => {
        setShowPrompt(true);
        // Track prompt shown
        trackPWAPromptShown();
        trackInternalEvent('pwa_prompt_shown', { platform: 'android_desktop' });
      }, 30000);
    };

    // Listen for successful install
    const handleAppInstalled = () => {
      console.log('[PWA] App installed successfully');
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
      
      // Track the install
      trackPWAInstall('prompt');
      trackInternalEvent('pwa_installed', { method: 'prompt', platform: 'android_desktop' });
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    // For iOS, show after 30 seconds
    if (isIOSDevice) {
      setTimeout(() => {
        setShowPrompt(true);
        trackPWAPromptShown();
        trackInternalEvent('pwa_prompt_shown', { platform: 'ios' });
      }, 30000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        console.log('[PWA] User accepted install');
        // Note: The actual install is tracked by the 'appinstalled' event
      } else {
        console.log('[PWA] User dismissed install');
        trackPWAPromptDismissed();
        trackInternalEvent('pwa_prompt_dismissed', { stage: 'native_prompt' });
      }

      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-prompt-dismissed', Date.now().toString());
    trackPWAPromptDismissed();
    trackInternalEvent('pwa_prompt_dismissed', { stage: 'custom_prompt' });
  };

  // Track when iOS user has likely installed (they've seen instructions)
  const handleIOSInstallClick = () => {
    // Can't know for sure if they installed on iOS, but track the intent
    trackPWAInstall('ios_manual');
    trackInternalEvent('pwa_ios_instructions_viewed');
    // Keep prompt visible so they can follow instructions
  };

  if (!showPrompt || isInstalled) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 animate-slide-up">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-gray-500 hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="flex items-start gap-4">
          {/* App Icon */}
          <div className="w-14 h-14 rounded-xl flex-shrink-0 overflow-hidden bg-[#0f172a] border-2 border-yellow-500 p-1">
            <img
              src="/android-chrome-192x192.png"
              alt="BahrainNights"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>

          <div className="flex-1 pr-6">
            <h3 className="font-bold text-white mb-1">Install BahrainNights</h3>
            <p className="text-sm text-gray-400 mb-3">
              Add to your home screen for quick access and offline use
            </p>

            {isIOS ? (
              /* iOS Instructions */
              <div 
                className="text-sm text-gray-300 bg-gray-800 rounded-lg p-3 cursor-pointer"
                onClick={handleIOSInstallClick}
              >
                <p className="flex items-center gap-2 mb-2">
                  <span>1.</span> Tap the share button <span className="text-blue-400">↑</span>
                </p>
                <p className="flex items-center gap-2">
                  <span>2.</span> Select &quot;Add to Home Screen&quot;
                </p>
              </div>
            ) : (
              /* Android/Desktop Install Button */
              <button
                onClick={handleInstall}
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Download size={18} />
                Install App
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
