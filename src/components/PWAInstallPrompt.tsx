'use client';

import { useState, useEffect } from 'react';
import { X, Download } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
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
      }, 30000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // For iOS, show after 30 seconds
    if (isIOSDevice) {
      setTimeout(() => {
        setShowPrompt(true);
      }, 30000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        console.log('[PWA] User accepted install');
      }

      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-prompt-dismissed', Date.now().toString());
  };

  if (!showPrompt) return null;

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
              <div className="text-sm text-gray-300 bg-gray-800 rounded-lg p-3">
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
