'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, CheckCircle, Loader2, Sparkles, Bell, Gift, Star } from 'lucide-react';

interface NewsletterPopupProps {
  delayMs?: number;
  scrollThreshold?: number; // Percentage (0-100)
}

export function NewsletterPopup({
  delayMs = 30000, // 30 seconds
  scrollThreshold = 50, // 50% scroll
}: NewsletterPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [hasBeenDismissed, setHasBeenDismissed] = useState(false);
  const [hasBeenTriggered, setHasBeenTriggered] = useState(false);

  useEffect(() => {
    // Check localStorage if already dismissed
    const dismissed = localStorage.getItem('newsletter_popup_dismissed');
    const subscribed = localStorage.getItem('newsletter_subscribed');
    
    if (dismissed || subscribed) {
      setHasBeenDismissed(true);
      return;
    }

    // Timer trigger
    const timer = setTimeout(() => {
      if (!hasBeenTriggered && !hasBeenDismissed) {
        setIsVisible(true);
        setHasBeenTriggered(true);
      }
    }, delayMs);

    // Scroll trigger
    const handleScroll = () => {
      if (hasBeenTriggered || hasBeenDismissed) return;
      
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercent >= scrollThreshold) {
        setIsVisible(true);
        setHasBeenTriggered(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [delayMs, scrollThreshold, hasBeenTriggered, hasBeenDismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    setHasBeenDismissed(true);
    localStorage.setItem('newsletter_popup_dismissed', 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'popup' }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      setStatus('success');
      localStorage.setItem('newsletter_subscribed', 'true');
      
      // Auto-dismiss after success
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-md z-[101]"
          >
            <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-amber-500/20">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400" />
              <div className="absolute top-10 right-10 w-20 h-20 bg-amber-500/10 rounded-full blur-2xl" />
              <div className="absolute bottom-10 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />

              {/* Close Button */}
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-400 hover:text-white transition z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative p-8">
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Welcome to the Crew! 🎉</h3>
                    <p className="text-gray-400">
                      You're in! Get ready for exclusive updates on the best events and experiences in Bahrain.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    {/* Header */}
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full px-4 py-1 mb-4">
                        <Gift className="w-4 h-4 text-amber-400" />
                        <span className="text-amber-400 text-sm font-medium">Exclusive Access</span>
                      </div>
                      <h2 className="text-3xl font-bold text-white mb-3">
                        Don't Miss Out! ✨
                      </h2>
                      <p className="text-gray-400">
                        Get weekly updates on the hottest events, new restaurants, and exclusive deals in Bahrain.
                      </p>
                    </div>

                    {/* Benefits */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {[
                        { icon: Star, text: 'VIP Event Access' },
                        { icon: Bell, text: 'Early Notifications' },
                        { icon: Gift, text: 'Exclusive Offers' },
                        { icon: Sparkles, text: 'Curated Picks' },
                      ].map((benefit, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                          <benefit.icon className="w-4 h-4 text-amber-400 flex-shrink-0" />
                          <span>{benefit.text}</span>
                        </div>
                      ))}
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (status === 'error') setStatus('idle');
                          }}
                          placeholder="Enter your email"
                          className="w-full bg-slate-800/50 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition"
                        />
                      </div>

                      {status === 'error' && (
                        <p className="text-red-400 text-sm">{errorMessage}</p>
                      )}

                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-900 font-bold py-4 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {status === 'loading' ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Subscribing...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5" />
                            Join the Insiders
                          </>
                        )}
                      </button>
                    </form>

                    <p className="text-center text-gray-500 text-xs mt-4">
                      No spam, ever. Unsubscribe anytime.
                    </p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
