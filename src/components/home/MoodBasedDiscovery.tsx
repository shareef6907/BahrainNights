'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, X, ChevronRight } from 'lucide-react';

interface MoodOption {
  emoji: string;
  label: string;
  description: string;
  gradient: string;
  suggestions: {
    title: string;
    icon: string;
    href: string;
    tag?: string;
  }[];
}

const moods: MoodOption[] = [
  {
    emoji: '🎉',
    label: 'Party Mode',
    description: 'Ready to dance and celebrate',
    gradient: 'from-purple-600 to-pink-600',
    suggestions: [
      { title: 'Nightclubs', icon: '🎶', href: '/places?category=nightclub', tag: 'HOT' },
      { title: 'DJ Events', icon: '🎧', href: '/events?category=music', tag: 'TONIGHT' },
      { title: 'Bars & Lounges', icon: '🍸', href: '/places?category=lounge' },
      { title: 'Ladies Nights', icon: '👠', href: '/offers?type=ladies-night', tag: 'DEALS' },
    ],
  },
  {
    emoji: '💑',
    label: 'Date Night',
    description: 'Romantic evening for two',
    gradient: 'from-rose-500 to-red-600',
    suggestions: [
      { title: 'Fine Dining', icon: '🍽️', href: '/places?category=restaurant&vibe=romantic', tag: 'POPULAR' },
      { title: 'Beach Clubs', icon: '🌅', href: '/places?category=beach-club' },
      { title: 'Live Jazz', icon: '🎷', href: '/events?category=music&type=jazz' },
      { title: 'Cinema', icon: '🎬', href: '/cinema', tag: 'NEW' },
    ],
  },
  {
    emoji: '👨‍👩‍👧‍👦',
    label: 'Family Day',
    description: 'Fun for all ages',
    gradient: 'from-green-500 to-emerald-600',
    suggestions: [
      { title: 'Theme Parks', icon: '🎢', href: '/attractions?category=family', tag: 'KIDS LOVE' },
      { title: 'Family Events', icon: '🎈', href: '/events?category=family' },
      { title: 'Cafes', icon: '☕', href: '/places?category=cafe' },
      { title: 'Indoor Activities', icon: '🎮', href: '/attractions?category=indoor' },
    ],
  },
  {
    emoji: '😌',
    label: 'Chill Vibes',
    description: 'Relax and unwind',
    gradient: 'from-cyan-500 to-blue-600',
    suggestions: [
      { title: 'Spas & Wellness', icon: '💆', href: '/explore/spas', tag: 'SELF-CARE' },
      { title: 'Beach Spots', icon: '🏖️', href: '/places?category=beach-club' },
      { title: 'Cozy Cafes', icon: '📖', href: '/places?category=cafe&vibe=cozy' },
      { title: 'Rooftop Lounges', icon: '🌃', href: '/places?category=lounge&vibe=chill' },
    ],
  },
  {
    emoji: '🎨',
    label: 'Culture Vulture',
    description: 'Art, history & experiences',
    gradient: 'from-orange-500 to-amber-600',
    suggestions: [
      { title: 'Museums', icon: '🏛️', href: '/attractions?category=sightseeing', tag: 'DISCOVER' },
      { title: 'Art Exhibitions', icon: '🖼️', href: '/events?category=cultural' },
      { title: 'Live Theatre', icon: '🎭', href: '/events?category=cultural&type=theatre' },
      { title: 'Heritage Tours', icon: '🕌', href: '/attractions?category=tour' },
    ],
  },
  {
    emoji: '🔥',
    label: 'FOMO Mode',
    description: "Don't miss what's trending",
    gradient: 'from-yellow-500 to-orange-600',
    suggestions: [
      { title: 'Trending Now', icon: '📈', href: '/events?sort=trending', tag: 'VIRAL' },
      { title: 'New Openings', icon: '✨', href: '/places?filter=new' },
      { title: 'This Weekend', icon: '🗓️', href: '/events?filter=weekend', tag: 'SOON' },
      { title: 'Special Events', icon: '⭐', href: '/events?category=special' },
    ],
  },
];

export default function MoodBasedDiscovery() {
  const [selectedMood, setSelectedMood] = useState<MoodOption | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="px-4 mb-12 md:mb-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-yellow-500" />
            <h2 className="text-3xl md:text-5xl font-bold">What&apos;s Your Vibe?</h2>
          </div>
          <span className="hidden md:block text-gray-400 text-sm bg-white/5 px-4 py-2 rounded-full">
            🆕 Only on BahrainNights
          </span>
        </motion.div>

        <motion.p
          className="text-gray-400 text-lg mb-8 max-w-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Pick your mood and we&apos;ll show you the perfect experiences. No more endless scrolling!
        </motion.p>

        {/* Mood Selector Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {moods.map((mood, index) => (
            <motion.button
              key={mood.label}
              onClick={() => {
                setSelectedMood(mood);
                setIsExpanded(true);
              }}
              className={`relative group p-6 rounded-2xl border transition-all duration-300 text-left overflow-hidden ${
                selectedMood?.label === mood.label
                  ? `bg-gradient-to-br ${mood.gradient} border-transparent`
                  : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${mood.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
              />
              <div className="relative z-10">
                <span className="text-4xl mb-3 block group-hover:scale-110 transition-transform">
                  {mood.emoji}
                </span>
                <h3 className="font-bold text-lg mb-1">{mood.label}</h3>
                <p className="text-xs text-gray-400 line-clamp-1">{mood.description}</p>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Expanded Suggestions Panel */}
        <AnimatePresence>
          {isExpanded && selectedMood && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div
                className={`relative bg-gradient-to-br ${selectedMood.gradient} rounded-3xl p-8 md:p-12`}
              >
                {/* Close button */}
                <button
                  onClick={() => setIsExpanded(false)}
                  className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-4 mb-6">
                  <span className="text-5xl">{selectedMood.emoji}</span>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold">{selectedMood.label}</h3>
                    <p className="text-white/70">{selectedMood.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {selectedMood.suggestions.map((suggestion, idx) => (
                    <Link
                      key={suggestion.title}
                      href={suggestion.href}
                      className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-2xl p-6 transition-all duration-200 hover:scale-[1.02] relative"
                    >
                      {suggestion.tag && (
                        <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded-full">
                          {suggestion.tag}
                        </span>
                      )}
                      <motion.span
                        className="text-3xl mb-3 block"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: idx * 0.1, type: 'spring' }}
                      >
                        {suggestion.icon}
                      </motion.span>
                      <span className="font-semibold block mb-1">{suggestion.title}</span>
                      <span className="text-white/60 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        Explore <ChevronRight className="w-4 h-4" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
