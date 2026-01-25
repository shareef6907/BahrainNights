'use client';

import { useState } from 'react';
import { Mail, CheckCircle, Loader2, Sparkles } from 'lucide-react';

interface NewsletterSignupProps {
  variant?: 'inline' | 'card' | 'banner' | 'minimal';
  title?: string;
  description?: string;
  buttonText?: string;
  source?: string;
}

export function NewsletterSignup({
  variant = 'card',
  title = 'Get Weekly Bahrain Tips',
  description = 'Subscribe for the latest events, new venues, and insider tips delivered to your inbox.',
  buttonText = 'Subscribe',
  source = 'website',
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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
