'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Sparkles, X, Send, Moon, Users, Wallet, Clock,
  Heart, Utensils, Music, Coffee, Wine, Star, MapPin,
  ChevronRight, Loader2, RotateCcw, Share2, Copy, Check
} from 'lucide-react';

interface Venue {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  image?: string;
  priceRange?: string;
  rating?: number;
  address?: string;
}

interface ItineraryStop {
  time: string;
  venue: Venue;
  activity: string;
  tip: string;
  duration: string;
}

interface Itinerary {
  title: string;
  mood: string;
  totalBudget: string;
  stops: ItineraryStop[];
  proTip: string;
}

type Mood = 'romantic' | 'party' | 'chill' | 'adventurous' | 'foodie' | 'cultural';
type Step = 'mood' | 'group' | 'budget' | 'time' | 'generating' | 'result';

const moods: { value: Mood; label: string; icon: string; color: string }[] = [
  { value: 'romantic', label: 'Romantic', icon: '💕', color: 'from-pink-500 to-rose-500' },
  { value: 'party', label: 'Party Mode', icon: '🎉', color: 'from-purple-500 to-indigo-500' },
  { value: 'chill', label: 'Chill Vibes', icon: '😌', color: 'from-cyan-500 to-teal-500' },
  { value: 'adventurous', label: 'Adventurous', icon: '🔥', color: 'from-orange-500 to-red-500' },
  { value: 'foodie', label: 'Foodie Night', icon: '🍽️', color: 'from-amber-500 to-yellow-500' },
  { value: 'cultural', label: 'Cultural', icon: '🎭', color: 'from-emerald-500 to-green-500' },
];

const groupSizes = [
  { value: 1, label: 'Solo', icon: '🧍' },
  { value: 2, label: 'Date Night', icon: '👫' },
  { value: 4, label: 'Small Group', icon: '👥' },
  { value: 8, label: 'Squad', icon: '🎊' },
];

const budgets = [
  { value: 'low', label: 'Budget Friendly', range: 'BD 10-25', icon: '💵' },
  { value: 'medium', label: 'Moderate', range: 'BD 25-50', icon: '💰' },
  { value: 'high', label: 'Splurge', range: 'BD 50-100', icon: '💎' },
  { value: 'luxury', label: 'No Limits', range: 'BD 100+', icon: '👑' },
];

const times = [
  { value: 'afternoon', label: 'Afternoon', range: '2PM - 6PM', icon: '☀️' },
  { value: 'evening', label: 'Evening', range: '6PM - 10PM', icon: '🌅' },
  { value: 'night', label: 'Night Out', range: '10PM - 2AM', icon: '🌙' },
  { value: 'fullnight', label: 'Full Night', range: '6PM - Late', icon: '✨' },
];

const generatingPhrases = [
  "Consulting the nightlife gods... 🔮",
  "Mapping your perfect evening... 🗺️",
  "Finding hidden gems... 💎",
  "Crafting your adventure... ✨",
  "Checking the vibe at venues... 🎵",
];

export default function NightPlanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>('mood');
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [generatingPhrase, setGeneratingPhrase] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setStep('mood');
    setSelectedMood(null);
    setSelectedGroup(null);
    setSelectedBudget(null);
    setSelectedTime(null);
    setItinerary(null);
    setError(null);
  };

  const handleOpen = () => {
    setIsOpen(true);
    reset();
  };

  const generateItinerary = async () => {
    setStep('generating');
    setError(null);

    // Animate through phrases
    let phraseIndex = 0;
    setGeneratingPhrase(generatingPhrases[0]);
    const phraseInterval = setInterval(() => {
      phraseIndex = (phraseIndex + 1) % generatingPhrases.length;
      setGeneratingPhrase(generatingPhrases[phraseIndex]);
    }, 2000);

    try {
      const response = await fetch('/api/ai/night-planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mood: selectedMood,
          groupSize: selectedGroup,
          budget: selectedBudget,
          timeSlot: selectedTime,
        }),
      });

      clearInterval(phraseInterval);

      if (!response.ok) {
        throw new Error('Failed to generate itinerary');
      }

      const data = await response.json();
      setItinerary(data.itinerary);
      setStep('result');
    } catch (err) {
      clearInterval(phraseInterval);
      console.error('Error generating itinerary:', err);
      setError('Could not generate your night plan. Please try again!');
      setStep('mood');
    }
  };

  const shareItinerary = async () => {
    if (!itinerary) return;

    const text = `🌙 My BahrainNights Plan: ${itinerary.title}\n\n${itinerary.stops.map(s => `${s.time} - ${s.venue.name}`).join('\n')}\n\nPlan your night at bahrainnights.com`;

    if (navigator.share) {
      try {
        await navigator.share({ title: itinerary.title, text });
      } catch {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const progressSteps = ['mood', 'group', 'budget', 'time'];
  const currentProgress = progressSteps.indexOf(step) + 1;

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-5 py-3 rounded-full shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 group flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Moon className="w-5 h-5" />
        <span className="font-semibold">Plan My Night</span>
        <Sparkles className="w-4 h-4 text-yellow-300" />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Content */}
            <motion.div
              className="relative bg-gradient-to-br from-slate-900 via-indigo-950/50 to-slate-900 rounded-3xl p-6 md:p-8 max-w-lg w-full border border-indigo-500/30 shadow-2xl shadow-indigo-500/20 max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: 'spring', damping: 20 }}
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Progress Bar (only show during selection steps) */}
              {step !== 'generating' && step !== 'result' && (
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                    <span>Step {currentProgress} of 4</span>
                    <span>{Math.round((currentProgress / 4) * 100)}%</span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${(currentProgress / 4) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm text-center">
                  {error}
                </div>
              )}

              <AnimatePresence mode="wait">
                {/* Step 1: Mood Selection */}
                {step === 'mood' && (
                  <motion.div
                    key="mood"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="text-center mb-6">
                      <span className="text-4xl mb-2 block">🌙</span>
                      <h2 className="text-2xl font-bold mb-2">Plan Your Perfect Night</h2>
                      <p className="text-gray-400">What's the vibe tonight?</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {moods.map((mood) => (
                        <motion.button
                          key={mood.value}
                          onClick={() => {
                            setSelectedMood(mood.value);
                            setStep('group');
                          }}
                          className={`p-4 rounded-2xl text-left transition-all border ${
                            selectedMood === mood.value
                              ? 'border-white/50 bg-white/10'
                              : 'border-white/10 hover:border-white/30 hover:bg-white/5'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="text-3xl block mb-2">{mood.icon}</span>
                          <span className="font-semibold block">{mood.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Group Size */}
                {step === 'group' && (
                  <motion.div
                    key="group"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="text-center mb-6">
                      <span className="text-4xl mb-2 block">👥</span>
                      <h2 className="text-2xl font-bold mb-2">Who's Coming?</h2>
                      <p className="text-gray-400">Tell us about your crew</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {groupSizes.map((size) => (
                        <motion.button
                          key={size.value}
                          onClick={() => {
                            setSelectedGroup(size.value);
                            setStep('budget');
                          }}
                          className="p-4 rounded-2xl text-left transition-all border border-white/10 hover:border-white/30 hover:bg-white/5"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="text-3xl block mb-2">{size.icon}</span>
                          <span className="font-semibold block">{size.label}</span>
                          <span className="text-sm text-gray-400">{size.value === 1 ? '1 person' : `${size.value} people`}</span>
                        </motion.button>
                      ))}
                    </div>

                    <button
                      onClick={() => setStep('mood')}
                      className="mt-4 text-gray-400 hover:text-white text-sm flex items-center gap-1 mx-auto"
                    >
                      ← Back
                    </button>
                  </motion.div>
                )}

                {/* Step 3: Budget */}
                {step === 'budget' && (
                  <motion.div
                    key="budget"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="text-center mb-6">
                      <span className="text-4xl mb-2 block">💰</span>
                      <h2 className="text-2xl font-bold mb-2">What's Your Budget?</h2>
                      <p className="text-gray-400">Per person, approximately</p>
                    </div>

                    <div className="space-y-3">
                      {budgets.map((budget) => (
                        <motion.button
                          key={budget.value}
                          onClick={() => {
                            setSelectedBudget(budget.value);
                            setStep('time');
                          }}
                          className="w-full p-4 rounded-2xl text-left transition-all border border-white/10 hover:border-white/30 hover:bg-white/5 flex items-center gap-4"
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <span className="text-2xl">{budget.icon}</span>
                          <div>
                            <span className="font-semibold block">{budget.label}</span>
                            <span className="text-sm text-gray-400">{budget.range}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>

                    <button
                      onClick={() => setStep('group')}
                      className="mt-4 text-gray-400 hover:text-white text-sm flex items-center gap-1 mx-auto"
                    >
                      ← Back
                    </button>
                  </motion.div>
                )}

                {/* Step 4: Time */}
                {step === 'time' && (
                  <motion.div
                    key="time"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="text-center mb-6">
                      <span className="text-4xl mb-2 block">⏰</span>
                      <h2 className="text-2xl font-bold mb-2">When Are You Going Out?</h2>
                      <p className="text-gray-400">Pick your time slot</p>
                    </div>

                    <div className="space-y-3">
                      {times.map((time) => (
                        <motion.button
                          key={time.value}
                          onClick={() => {
                            setSelectedTime(time.value);
                            generateItinerary();
                          }}
                          className="w-full p-4 rounded-2xl text-left transition-all border border-white/10 hover:border-white/30 hover:bg-white/5 flex items-center gap-4"
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <span className="text-2xl">{time.icon}</span>
                          <div>
                            <span className="font-semibold block">{time.label}</span>
                            <span className="text-sm text-gray-400">{time.range}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>

                    <button
                      onClick={() => setStep('budget')}
                      className="mt-4 text-gray-400 hover:text-white text-sm flex items-center gap-1 mx-auto"
                    >
                      ← Back
                    </button>
                  </motion.div>
                )}

                {/* Generating State */}
                {step === 'generating' && (
                  <motion.div
                    key="generating"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 text-center"
                  >
                    <motion.div
                      className="text-6xl mb-6 inline-block"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    >
                      🔮
                    </motion.div>
                    <h2 className="text-xl font-bold mb-2">Creating Your Perfect Night</h2>
                    <p className="text-purple-300">{generatingPhrase}</p>

                    <div className="mt-8 flex justify-center gap-2">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-3 h-3 rounded-full bg-purple-500"
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Result */}
                {step === 'result' && itinerary && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    {/* Header */}
                    <div className="text-center mb-6">
                      <span className="text-4xl mb-2 block">✨</span>
                      <h2 className="text-2xl font-bold mb-1">{itinerary.title}</h2>
                      <div className="flex items-center justify-center gap-3 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Wallet className="w-4 h-4" />
                          {itinerary.totalBudget}
                        </span>
                        <span>•</span>
                        <span className="capitalize">{itinerary.mood} Vibe</span>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-4 mb-6">
                      {itinerary.stops.map((stop, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="relative pl-8"
                        >
                          {/* Timeline line */}
                          {index < itinerary.stops.length - 1 && (
                            <div className="absolute left-[11px] top-8 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-purple-500/20" />
                          )}

                          {/* Timeline dot */}
                          <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </div>

                          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <span className="text-purple-400 text-sm font-medium">{stop.time}</span>
                                <h3 className="font-bold">{stop.venue.name}</h3>
                                <span className="text-sm text-gray-400">{stop.activity}</span>
                              </div>
                              <span className="text-xs bg-white/10 px-2 py-1 rounded-full">
                                {stop.duration}
                              </span>
                            </div>

                            {stop.tip && (
                              <p className="text-xs text-yellow-400/80 mt-2">
                                💡 {stop.tip}
                              </p>
                            )}

                            <Link
                              href={`/places/${stop.venue.slug}`}
                              className="text-xs text-purple-400 hover:text-purple-300 mt-2 inline-flex items-center gap-1"
                              onClick={() => setIsOpen(false)}
                            >
                              View venue <ChevronRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Pro Tip */}
                    {itinerary.proTip && (
                      <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-4 mb-6">
                        <p className="text-sm">
                          <span className="font-bold text-yellow-500">Pro Tip:</span>{' '}
                          <span className="text-gray-300">{itinerary.proTip}</span>
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={shareItinerary}
                        className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                        {copied ? 'Copied!' : 'Share Plan'}
                      </button>
                      <button
                        onClick={reset}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all"
                      >
                        <RotateCcw className="w-4 h-4" />
                        New Plan
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
