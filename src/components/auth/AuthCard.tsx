'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface AuthCardProps {
  children: ReactNode;
  variant?: 'login' | 'register' | 'forgot-password' | 'reset-password';
}

const brandingContent = {
  login: {
    tagline: 'Your Nightlife. Our Spotlight.',
    benefits: [
      'Post unlimited events',
      'Reach thousands of visitors daily',
      'Equal visibility for all venues',
      'AI-powered promotion',
    ],
  },
  register: {
    tagline: 'Join Bahrain\'s #1 Events Platform',
    benefits: [
      'Get your venue discovered',
      'Reach thousands of customers',
      'Post unlimited events',
      'Equal visibility for all',
    ],
  },
  'forgot-password': {
    tagline: 'We\'ve got you covered',
    benefits: [
      'Quick password recovery',
      'Secure reset process',
      'Get back to promoting',
      '24/7 support available',
    ],
  },
  'reset-password': {
    tagline: 'Almost there!',
    benefits: [
      'Create a strong password',
      'Secure your account',
      'Get back to business',
      'Your data is safe',
    ],
  },
};

export default function AuthCard({ children, variant = 'login' }: AuthCardProps) {
  const content = brandingContent[variant];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-600/10 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-yellow-600/10 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      {/* Left Side - Branding (Desktop Only) */}
      <div className="hidden lg:flex lg:w-2/5 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-orange-500/10 to-pink-500/20" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-950" />

        <div className="relative z-10 flex flex-col justify-center px-12 w-full">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <span className="text-3xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
              BahrainNights
            </span>
            <span className="flex text-xs text-yellow-400 items-center gap-1">
              <Sparkles className="w-3 h-3" />
              AI-Powered
            </span>
          </Link>

          {/* Tagline */}
          <motion.h1
            className="text-4xl xl:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {content.tagline}
          </motion.h1>

          {/* Benefits */}
          <motion.ul
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {content.benefits.map((benefit, index) => (
              <motion.li
                key={benefit}
                className="flex items-center gap-3 text-gray-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              >
                <span className="w-6 h-6 rounded-full bg-yellow-400/20 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-yellow-400" />
                </span>
                <span>{benefit}</span>
              </motion.li>
            ))}
          </motion.ul>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-sm text-gray-400">
              Supporting local businesses since 2025
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Trusted by 500+ venues across Bahrain
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 lg:py-12 relative z-10">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex flex-col items-center gap-2">
              <span className="text-2xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                BahrainNights
              </span>
              <span className="flex text-xs text-yellow-400 items-center gap-1">
                <Sparkles className="w-3 h-3" />
                AI-Powered Events Platform
              </span>
            </Link>
          </div>

          {/* Form Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
