'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Heart, Users, PartyPopper, Compass, ChevronRight, X } from 'lucide-react';

interface MoodOption {
  id: string;
  emoji: string;
  label: string;
  tagline: string;
  gradient: string;
  categories: string[];
  suggestedLinks: {
    label: string;
    href: string;
    emoji: string;
  }[];
}

const moodOptions: MoodOption[] = [
  {
    id: 'date-night',
    emoji: '💕',
    label: 'Date Night',
    tagline: 'Romantic vibes only',
    gradient: 'from-pink-500 via-rose-500 to-red-500',
    categories: ['lounge', 'restaurant', 'beach-club'],
    suggestedLinks: [
      { label: 'Romantic Restaurants', href: '/places?category=restaurant&vibe=romantic', emoji: '🍽️' },
      { label: 'Rooftop Lounges', href: '/places?category=lounge', emoji: '🌃' },
      { label: 'Beach Clubs', href: '/places?category=beach-club', emoji: '🏖️' },
      { label: 'Cinema Date', href: '/cinema', emoji: '🎬' },
    ],
  },
  {
    id: 'family-day',
    emoji: '👨‍👩‍👧‍👦',
    label: 'Family Day',
    tagline: 'Fun for all ages',
    gradient: 'from-green-500 via-emerald-500 to-teal-500',
    categories: ['attraction', 'mall', 'restaurant'],
    suggestedLinks: [
      { label: 'Family Attractions', href: '/attractions?category=family', emoji: '🎢' },
      { label: 'Kids Activities', href: '/explore/kids', emoji: '🧒' },
      { label: 'Family Restaurants', href: '/places?category=restaurant&family=true', emoji: '🍕' },
      { label: 'Shopping Malls', href: '/explore/shopping', emoji: '🛍️' },
    ],
  },
  {
    id: 'girls-night',
    emoji: '👯‍♀️',
    label: 'Girls Night Out',
    tagline: 'Let\'s go queens!',
    gradient: 'from-purple-500 via-fuchsia-500 to-pink-500',
    categories: ['nightclub', 'lounge', 'brunch'],
    suggestedLinks: [
      { label: 'Ladies Nights', href: '/offers?type=ladies-night', emoji: '💃' },
      { label: 'Nightclubs', href: '/places?category=nightclub', emoji: '🪩' },
      { label: 'Brunch Spots', href: '/offers?type=brunch', emoji: '🥂' },
      { label: 'Spas & Wellness', href: '/explore/spas', emoji: '💅' },
    ],
  },
  {
    id: 'solo-adventure',
    emoji: '🧭',
    label: 'Solo Adventure',
    tagline: 'Me, myself & Bahrain',
    gradient: 'from-blue-500 via-indigo-500 to-violet-500',
    categories: ['cafe', 'attraction', 'tour'],
    suggestedLinks: [
      { label: 'Cozy Cafés', href: '/places?category=cafe', emoji: '☕' },
      { label: 'Sightseeing', href: '/attractions?category=sightseeing', emoji: '🏛️' },
      { label: 'Boat Tours', href: '/attractions?category=boat-tour', emoji: '⛵' },
      { label: 'Desert Safari', href: '/attractions?category=desert-safari', emoji: '🏜️' },
    ],
  },
  {
    id: 'party-mode',
    emoji: '🎉',
    label: 'Party Mode',
    tagline: 'Turn up tonight!',
    gradient: 'from-orange-500 via-red-500 to-pink-500',
    categories: ['nightclub', 'bar', 'event'],
    suggestedLinks: [
      { label: 'Nightclubs', href: '/places?category=nightclub', emoji: '🌙' },
      { label: 'Live Events', href: '/events?category=nightlife', emoji: '🎤' },
      { label: 'Happy Hours', href: '/offers?type=happy-hour', emoji: '🍻' },
      { label: 'Artists & DJs', href: '/artists', emoji: '🎧' },
    ],
  },
];

export default function MoodFilters() {
  const [selectedMood, setSelectedMood] = useState<MoodOption | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedMood(null);
        setIsExpanded(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const handleMoodClick = (mood: MoodOption) => {
    if (selectedMood?.id === mood.id) {
      setSelectedMood(null);
      setIsExpanded(false);
    } else {
      setSelectedMood(mood);
      setIsExpanded(true);
    }
  };

  return (
    <section className="px-4 mb-12 md:mb-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Show me something for...
              </h2>
              <p className="text-gray-400 text-sm">Pick your vibe, find your perfect night</p>
            </div>
          </div>

          {/* Mood Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            {moodOptions.map((mood) => (
              <motion.button
                key={mood.id}
                onClick={() => handleMoodClick(mood)}
                className={`relative group px-5 py-3 rounded-full border-2 transition-all duration-300 ${
                  selectedMood?.id === mood.id
                    ? `bg-gradient-to-r ${mood.gradient} border-transparent text-white shadow-lg shadow-purple-500/25`
                    : 'bg-white/5 border-white/20 text-white hover:border-white/40 hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  <span className="text-xl">{mood.emoji}</span>
                  <span className="font-medium">{mood.label}</span>
                </span>
                
                {/* Glow effect */}
                {selectedMood?.id === mood.id && (
                  <motion.div
                    className={`absolute inset-0 -z-10 rounded-full bg-gradient-to-r ${mood.gradient} blur-xl opacity-50`}
                    layoutId="mood-glow"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Expanded Content Panel */}
          <AnimatePresence>
            {selectedMood && isExpanded && (
              <motion.div
                className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${selectedMood.gradient} p-[2px]`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <div className="bg-slate-900/95 backdrop-blur-xl rounded-[22px] p-6 md:p-8">
                  {/* Close button */}
                  <button
                    onClick={() => {
                      setSelectedMood(null);
                      setIsExpanded(false);
                    }}
                    className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>

                  {/* Mood Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-5xl">{selectedMood.emoji}</span>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{selectedMood.label}</h3>
                      <p className="text-gray-400">{selectedMood.tagline}</p>
                    </div>
                  </div>

                  {/* Suggested Links Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedMood.suggestedLinks.map((link, index) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          className="group flex flex-col items-center justify-center p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all"
                        >
                          <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                            {link.emoji}
                          </span>
                          <span className="text-white font-medium text-center text-sm">
                            {link.label}
                          </span>
                          <ChevronRight className="w-4 h-4 text-gray-500 mt-2 group-hover:text-white group-hover:translate-x-1 transition-all" />
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Quick tip */}
                  <p className="mt-6 text-center text-gray-500 text-sm">
                    ✨ Click on any option to start exploring!
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
