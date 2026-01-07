'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Users, Plus } from 'lucide-react';
import Link from 'next/link';

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className="relative pt-24 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-transparent to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Explore
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                <span className="text-2xl">🤝</span>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Community Events
                </h1>
                <p className="text-gray-400">
                  Connect, volunteer, and give back
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Empty State with Registration CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center py-16"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-orange-500/10 flex items-center justify-center">
            <Users className="w-12 h-12 text-orange-500" />
          </div>

          <h2 className="text-2xl font-bold text-white mb-4">
            Coming Soon
          </h2>

          <p className="text-gray-400 max-w-md mx-auto mb-8">
            We&apos;re building the best directory of community events and organizations in Bahrain.
            Run a community group, charity, or organization? Be among the first to list!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register-venue"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:from-orange-400 hover:to-orange-500 transition-all shadow-lg shadow-orange-500/25"
            >
              <Plus className="w-5 h-5" />
              Register Your Organization
            </Link>

            <Link
              href="/explore"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
            >
              Explore Other Categories
            </Link>
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <div className="text-3xl mb-3">✨</div>
            <h3 className="text-lg font-semibold text-white mb-2">Get Visibility</h3>
            <p className="text-gray-400 text-sm">
              List your organization and reach thousands. Equal visibility for all.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <div className="text-3xl mb-3">📍</div>
            <h3 className="text-lg font-semibold text-white mb-2">Grow Your Community</h3>
            <p className="text-gray-400 text-sm">
              Reach thousands of people looking to connect and give back in Bahrain.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <div className="text-3xl mb-3">📅</div>
            <h3 className="text-lg font-semibold text-white mb-2">Promote Events</h3>
            <p className="text-gray-400 text-sm">
              Share your volunteer drives, charity events, and community gatherings.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
