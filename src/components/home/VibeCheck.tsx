'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Activity, X, Users, Music, Clock, TrendingUp,
  Flame, Snowflake, Zap, ChevronRight, MapPin,
  ThumbsUp, RefreshCw
} from 'lucide-react';

interface VenueVibe {
  id: string;
  name: string;
  slug: string;
  category: string;
  image?: string;
  crowdLevel: number; // 1-5
  musicVibe: string;
  waitTime: string;
  atmosphere: string;
  lastUpdated: string;
  totalCheckins: number;
  trending: boolean;
}

const crowdLevels = [
  { level: 1, label: 'Empty', icon: '😴', color: 'text-blue-400', bg: 'bg-blue-500' },
  { level: 2, label: 'Quiet', icon: '🙂', color: 'text-green-400', bg: 'bg-green-500' },
  { level: 3, label: 'Buzzing', icon: '😊', color: 'text-yellow-400', bg: 'bg-yellow-500' },
  { level: 4, label: 'Packed', icon: '🔥', color: 'text-orange-400', bg: 'bg-orange-500' },
  { level: 5, label: 'Insane!', icon: '🚀', color: 'text-red-400', bg: 'bg-red-500' },
];

const atmospheres = [
  { value: 'chill', label: 'Chill', icon: '😌' },
  { value: 'lively', label: 'Lively', icon: '🎉' },
  { value: 'romantic', label: 'Romantic', icon: '💕' },
  { value: 'wild', label: 'Wild', icon: '🔥' },
  { value: 'classy', label: 'Classy', icon: '🥂' },
];

const musicVibes = [
  { value: 'none', label: 'No Music', icon: '🔇' },
  { value: 'background', label: 'Background', icon: '🎵' },
  { value: 'dj', label: 'DJ Playing', icon: '🎧' },
  { value: 'live', label: 'Live Music', icon: '🎸' },
  { value: 'party', label: 'Party Mode', icon: '🪩' },
];

export default function VibeCheck() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<'trending' | 'checkin'>('trending');
  const [venues, setVenues] = useState<VenueVibe[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkinStep, setCheckinStep] = useState<'venue' | 'crowd' | 'vibe' | 'done'>('venue');
  const [selectedVenue, setSelectedVenue] = useState<VenueVibe | null>(null);
  const [checkinData, setCheckinData] = useState({
    crowdLevel: 3,
    musicVibe: 'background',
    atmosphere: 'lively',
    waitTime: '5-10 min',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchVibes();
    }
  }, [isOpen]);

  const fetchVibes = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/vibe-check');
      if (response.ok) {
        const data = await response.json();
        setVenues(data.venues || []);
      }
    } catch (err) {
      console.error('Error fetching vibes:', err);
      // Use fallback mock data for demo
      setVenues(getMockVenues());
    }
    setLoading(false);
  };

  const getMockVenues = (): VenueVibe[] => [
    {
      id: '1',
      name: 'Coral Bay',
      slug: 'coral-bay',
      category: 'Lounge',
      crowdLevel: 4,
      musicVibe: 'DJ Playing',
      waitTime: '15-20 min',
      atmosphere: 'Lively',
      lastUpdated: '10 min ago',
      totalCheckins: 23,
      trending: true,
    },
    {
      id: '2',
      name: 'JJ\'s Irish Pub',
      slug: 'jjs-irish-pub',
      category: 'Pub',
      crowdLevel: 3,
      musicVibe: 'Live Music',
      waitTime: 'No wait',
      atmosphere: 'Lively',
      lastUpdated: '25 min ago',
      totalCheckins: 15,
      trending: true,
    },
    {
      id: '3',
      name: 'Meisei',
      slug: 'meisei',
      category: 'Restaurant',
      crowdLevel: 2,
      musicVibe: 'Background',
      waitTime: '5-10 min',
      atmosphere: 'Classy',
      lastUpdated: '1 hour ago',
      totalCheckins: 8,
      trending: false,
    },
  ];

  const submitCheckin = async () => {
    if (!selectedVenue) return;

    setSubmitted(true);
    setCheckinStep('done');

    try {
      await fetch('/api/vibe-check/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          venueId: selectedVenue.id,
          ...checkinData,
        }),
      });
    } catch (err) {
      console.error('Error submitting check-in:', err);
    }

    // Refresh vibes after checkin
    setTimeout(() => {
      fetchVibes();
    }, 1000);
  };

  const resetCheckin = () => {
    setCheckinStep('venue');
    setSelectedVenue(null);
    setSubmitted(false);
    setView('trending');
  };

  const getCrowdInfo = (level: number) => crowdLevels.find(c => c.level === level) || crowdLevels[2];

  return (
    <>
      {/* Live Indicator Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-40 right-6 z-40 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2.5 rounded-full shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transition-all duration-300 group flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
        </span>
        <span className="font-medium text-sm">Live Vibe</span>
        <Activity className="w-4 h-4" />
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
              className="relative bg-gradient-to-br from-slate-900 via-emerald-950/30 to-slate-900 rounded-3xl p-6 md:p-8 max-w-lg w-full border border-emerald-500/30 shadow-2xl shadow-emerald-500/20 max-h-[85vh] overflow-y-auto"
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

              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium mb-3">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                  </span>
                  LIVE
                </div>
                <h2 className="text-2xl font-bold mb-2">Vibe Check</h2>
                <p className="text-gray-400 text-sm">Real-time crowd levels & atmosphere</p>
              </div>

              {/* Tab Switcher */}
              <div className="flex gap-2 mb-6 p-1 bg-white/5 rounded-xl">
                <button
                  onClick={() => { setView('trending'); resetCheckin(); }}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                    view === 'trending'
                      ? 'bg-emerald-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  🔥 Trending Now
                </button>
                <button
                  onClick={() => setView('checkin')}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                    view === 'checkin'
                      ? 'bg-emerald-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  📍 Check In
                </button>
              </div>

              <AnimatePresence mode="wait">
                {/* Trending View */}
                {view === 'trending' && (
                  <motion.div
                    key="trending"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center py-12">
                        <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin" />
                      </div>
                    ) : venues.length === 0 ? (
                      <div className="text-center py-12 text-gray-400">
                        <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No vibe reports yet tonight.</p>
                        <button
                          onClick={() => setView('checkin')}
                          className="mt-4 text-emerald-400 hover:text-emerald-300 font-medium"
                        >
                          Be the first to check in →
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {venues.map((venue) => {
                          const crowd = getCrowdInfo(venue.crowdLevel);
                          return (
                            <motion.div
                              key={venue.id}
                              className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-emerald-500/30 transition-all"
                              whileHover={{ scale: 1.01 }}
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-bold">{venue.name}</h3>
                                    {venue.trending && (
                                      <span className="bg-orange-500/20 text-orange-400 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                                        <TrendingUp className="w-3 h-3" /> Hot
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-sm text-gray-400">{venue.category}</span>
                                </div>
                                <div className={`text-2xl ${crowd.color}`}>
                                  {crowd.icon}
                                </div>
                              </div>

                              {/* Crowd Level Bar */}
                              <div className="mb-3">
                                <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                                  <span>Crowd Level</span>
                                  <span className={crowd.color}>{crowd.label}</span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                  <motion.div
                                    className={`h-full ${crowd.bg}`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(venue.crowdLevel / 5) * 100}%` }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                  />
                                </div>
                              </div>

                              {/* Quick Stats */}
                              <div className="flex items-center gap-4 text-xs text-gray-400">
                                <span className="flex items-center gap-1">
                                  <Music className="w-3 h-3" /> {venue.musicVibe}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" /> {venue.waitTime}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Users className="w-3 h-3" /> {venue.totalCheckins} check-ins
                                </span>
                              </div>

                              <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                                <span className="text-xs text-gray-500">Updated {venue.lastUpdated}</span>
                                <Link
                                  href={`/places/${venue.slug}`}
                                  className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                                  onClick={() => setIsOpen(false)}
                                >
                                  View <ChevronRight className="w-3 h-3" />
                                </Link>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Check-in View */}
                {view === 'checkin' && (
                  <motion.div
                    key="checkin"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {checkinStep === 'done' ? (
                      <div className="text-center py-8">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', damping: 10 }}
                          className="text-6xl mb-4"
                        >
                          🎉
                        </motion.div>
                        <h3 className="text-xl font-bold mb-2">Thanks for the Vibe Check!</h3>
                        <p className="text-gray-400 mb-6">You're helping others find the best spots tonight.</p>
                        <button
                          onClick={resetCheckin}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-medium transition-all"
                        >
                          Done
                        </button>
                      </div>
                    ) : (
                      <>
                        {/* Venue Selection */}
                        {checkinStep === 'venue' && (
                          <div>
                            <p className="text-center text-gray-400 mb-4">Where are you right now?</p>
                            <div className="space-y-2">
                              {venues.map((venue) => (
                                <button
                                  key={venue.id}
                                  onClick={() => {
                                    setSelectedVenue(venue);
                                    setCheckinStep('crowd');
                                  }}
                                  className="w-full p-3 rounded-xl text-left bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/30 transition-all flex items-center gap-3"
                                >
                                  <MapPin className="w-4 h-4 text-emerald-500" />
                                  <div>
                                    <span className="font-medium block">{venue.name}</span>
                                    <span className="text-xs text-gray-400">{venue.category}</span>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Crowd Level Selection */}
                        {checkinStep === 'crowd' && (
                          <div>
                            <p className="text-center text-gray-400 mb-4">How crowded is {selectedVenue?.name}?</p>
                            <div className="space-y-2">
                              {crowdLevels.map((crowd) => (
                                <button
                                  key={crowd.level}
                                  onClick={() => {
                                    setCheckinData({ ...checkinData, crowdLevel: crowd.level });
                                    setCheckinStep('vibe');
                                  }}
                                  className={`w-full p-4 rounded-xl text-left transition-all border flex items-center gap-4 ${
                                    checkinData.crowdLevel === crowd.level
                                      ? 'border-emerald-500 bg-emerald-500/10'
                                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                                  }`}
                                >
                                  <span className="text-3xl">{crowd.icon}</span>
                                  <div>
                                    <span className={`font-bold ${crowd.color}`}>{crowd.label}</span>
                                    <span className="text-sm text-gray-400 block">Level {crowd.level}/5</span>
                                  </div>
                                </button>
                              ))}
                            </div>
                            <button
                              onClick={() => setCheckinStep('venue')}
                              className="mt-4 text-gray-400 hover:text-white text-sm mx-auto block"
                            >
                              ← Back
                            </button>
                          </div>
                        )}

                        {/* Atmosphere Selection */}
                        {checkinStep === 'vibe' && (
                          <div>
                            <p className="text-center text-gray-400 mb-4">What's the vibe like?</p>

                            <div className="mb-4">
                              <label className="text-sm text-gray-400 mb-2 block">Atmosphere</label>
                              <div className="flex flex-wrap gap-2">
                                {atmospheres.map((atm) => (
                                  <button
                                    key={atm.value}
                                    onClick={() => setCheckinData({ ...checkinData, atmosphere: atm.value })}
                                    className={`px-3 py-2 rounded-lg text-sm transition-all ${
                                      checkinData.atmosphere === atm.value
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                                    }`}
                                  >
                                    {atm.icon} {atm.label}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="mb-6">
                              <label className="text-sm text-gray-400 mb-2 block">Music</label>
                              <div className="flex flex-wrap gap-2">
                                {musicVibes.map((music) => (
                                  <button
                                    key={music.value}
                                    onClick={() => setCheckinData({ ...checkinData, musicVibe: music.value })}
                                    className={`px-3 py-2 rounded-lg text-sm transition-all ${
                                      checkinData.musicVibe === music.value
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                                    }`}
                                  >
                                    {music.icon} {music.label}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <button
                              onClick={submitCheckin}
                              className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                            >
                              <ThumbsUp className="w-5 h-5" />
                              Submit Vibe Check
                            </button>

                            <button
                              onClick={() => setCheckinStep('crowd')}
                              className="mt-4 text-gray-400 hover:text-white text-sm mx-auto block"
                            >
                              ← Back
                            </button>
                          </div>
                        )}
                      </>
                    )}
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
