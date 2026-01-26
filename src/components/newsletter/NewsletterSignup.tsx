'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, CheckCircle, Loader2, Sparkles, Bell, Zap, Star } from 'lucide-react';

interface NewsletterSignupProps {
  variant?: 'inline' | 'card' | 'banner' | 'minimal' | 'premium';
  title?: string;
  description?: string;
  buttonText?: string;
  source?: string;
}

export function NewsletterSignup({
  variant = 'premium',
  title = 'Be the First to Know',
  description = 'Weekly newsletter launching soon — get exclusive updates on events, dining, and nightlife in Bahrain.',
  buttonText = 'Join the Insiders',
  source = 'website',
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
        body: JSON.stringify({ email, source }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMessage('Network error. Please try again.');
      setStatus('error');
    }
  };

  // Premium variant - the main redesigned version
  if (variant === 'premium') {
    return (
      <div className="relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-slate-900 to-yellow-900/30" />
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400/40 rounded-full"
              initial={{
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%',
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                y: [null, '-20%', '120%'],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        {/* Glow effect following mouse */}
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-yellow-500/10 blur-3xl pointer-events-none"
          animate={{
            x: mousePosition.x - 192,
            y: mousePosition.y - 400,
          }}
          transition={{ type: 'spring', damping: 30, stiffness: 200 }}
        />

        {/* Content */}
        <div className="relative z-10 py-16 md:py-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Floating icons */}
            <div className="relative h-16 mb-8">
              <motion.div
                className="absolute left-1/2 -translate-x-1/2"
                animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-yellow-500/30 blur-xl rounded-full" />
                  <div className="relative p-4 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl shadow-2xl shadow-yellow-500/30">
                    <Bell className="w-8 h-8 text-black" />
                  </div>
                </div>
              </motion.div>
              
              {/* Orbiting stars */}
              <motion.div
                className="absolute left-1/2 top-1/2"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <Star className="w-4 h-4 text-yellow-400 absolute -left-16 -top-2" />
                <Sparkles className="w-3 h-3 text-purple-400 absolute left-12 top-4" />
                <Zap className="w-4 h-4 text-amber-400 absolute -left-8 top-8" />
              </motion.div>
            </div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
              </span>
              <span className="text-yellow-400 text-sm font-medium">Launching Soon</span>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black mb-6"
            >
              <span className="bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
                {title}
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10"
            >
              {description}
            </motion.p>

            {/* Success State */}
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="max-w-md mx-auto"
                >
                  <div className="flex items-center justify-center gap-3 p-6 bg-green-500/10 border border-green-500/30 rounded-2xl">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                    >
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </motion.div>
                    <div className="text-left">
                      <p className="font-bold text-green-400">You&apos;re on the list!</p>
                      <p className="text-sm text-gray-400">We&apos;ll notify you when we launch.</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  onSubmit={handleSubmit}
                  className="max-w-md mx-auto"
                >
                  <div className="relative group">
                    {/* Glow effect on focus */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-500 rounded-2xl opacity-0 group-focus-within:opacity-30 blur-lg transition-opacity duration-500" />
                    
                    <div className="relative flex flex-col sm:flex-row gap-3 p-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
                      <div className="flex-1 relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          className="w-full pl-12 pr-4 py-4 bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg"
                          disabled={status === 'loading'}
                        />
                      </div>
                      <motion.button
                        type="submit"
                        disabled={status === 'loading'}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-black font-bold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/25"
                      >
                        {status === 'loading' ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5" />
                            <span className="whitespace-nowrap">{buttonText}</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>

                  {/* Error message */}
                  <AnimatePresence>
                    {status === 'error' && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-400 text-sm mt-3"
                      >
                        {errorMessage}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Trust badges */}
                  <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      No spam
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Unsubscribe anytime
                    </span>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-8 mt-12 pt-8 border-t border-white/10"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">100+</div>
                <div className="text-xs text-gray-500">Events Monthly</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">50+</div>
                <div className="text-xs text-gray-500">Exclusive Tips</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">Free</div>
                <div className="text-xs text-gray-500">Forever</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className={getContainerClasses(variant)}>
        <div className="flex items-center gap-3 text-green-400">
          <CheckCircle className="w-6 h-6" />
          <div>
            <p className="font-medium">You&apos;re subscribed!</p>
            <p className="text-sm text-gray-400">Check your inbox for a welcome email.</p>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 text-sm"
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-medium rounded-lg transition-colors disabled:opacity-50 text-sm"
        >
          {status === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : buttonText}
        </button>
      </form>
    );
  }

  if (variant === 'inline') {
    return (
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <p className="text-gray-300 text-sm">{description}</p>
        <form onSubmit={handleSubmit} className="flex gap-2 flex-shrink-0">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-48 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 text-sm"
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-medium rounded-lg transition-colors disabled:opacity-50 text-sm whitespace-nowrap"
          >
            {status === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : buttonText}
          </button>
        </form>
        {status === 'error' && <p className="text-red-400 text-xs">{errorMessage}</p>}
      </div>
    );
  }

  if (variant === 'banner') {
    return (
      <div className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-yellow-500/20 rounded-xl">
              <Mail className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="text-gray-400 text-sm">{description}</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2 flex-shrink-0">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full md:w-64 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
              disabled={status === 'loading'}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : buttonText}
            </button>
          </form>
        </div>
        {status === 'error' && <p className="text-red-400 text-sm mt-3">{errorMessage}</p>}
      </div>
    );
  }

  // Card variant (default)
  return (
    <div className={getContainerClasses(variant)}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-yellow-500/20 rounded-lg">
          <Sparkles className="w-5 h-5 text-yellow-400" />
        </div>
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      <p className="text-gray-400 text-sm mb-6">{description}</p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {status === 'loading' ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Mail className="w-5 h-5" />
              {buttonText}
            </>
          )}
        </button>
        {status === 'error' && <p className="text-red-400 text-sm">{errorMessage}</p>}
      </form>
      <p className="text-xs text-gray-500 mt-4 text-center">
        No spam, unsubscribe anytime.
      </p>
    </div>
  );
}

function getContainerClasses(variant: string): string {
  switch (variant) {
    case 'minimal':
      return '';
    case 'inline':
      return '';
    case 'banner':
      return '';
    case 'card':
    default:
      return 'bg-white/5 backdrop-blur-sm rounded-2xl p-6';
  }
}

export default NewsletterSignup;
