'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Vote, X, Plus, Trash2, Share2, Copy, Check,
  Crown, Users, ChevronRight, ExternalLink, Sparkles,
  Trophy, RefreshCw
} from 'lucide-react';

interface VoteOption {
  id: string;
  name: string;
  slug?: string;
  category?: string;
  votes: number;
  voters: string[];
}

interface Poll {
  id: string;
  title: string;
  options: VoteOption[];
  createdAt: string;
  expiresAt?: string;
  totalVotes: number;
  isCreator: boolean;
}

export default function SquadVote() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<'home' | 'create' | 'vote' | 'results'>('home');
  const [pollTitle, setPollTitle] = useState("Where should we go tonight?");
  const [options, setOptions] = useState<{ name: string; category: string }[]>([
    { name: '', category: '' },
    { name: '', category: '' },
  ]);
  const [activePoll, setActivePoll] = useState<Poll | null>(null);
  const [voterName, setVoterName] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [joinCode, setJoinCode] = useState('');

  const addOption = () => {
    if (options.length < 6) {
      setOptions([...options, { name: '', category: '' }]);
    }
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const updateOption = (index: number, field: 'name' | 'category', value: string) => {
    const newOptions = [...options];
    newOptions[index][field] = value;
    setOptions(newOptions);
  };

  const createPoll = async () => {
    const validOptions = options.filter(o => o.name.trim());
    if (validOptions.length < 2) return;

    setLoading(true);

    try {
      const response = await fetch('/api/squad-vote/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: pollTitle,
          options: validOptions,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setActivePoll(data.poll);
        setShareUrl(data.shareUrl || `${window.location.origin}/vote/${data.poll.id}`);
        setView('results');
      } else {
        // Create local mock poll for demo
        const mockPoll: Poll = {
          id: Math.random().toString(36).substr(2, 9),
          title: pollTitle,
          options: validOptions.map((o, i) => ({
            id: `opt-${i}`,
            name: o.name,
            category: o.category,
            votes: 0,
            voters: [],
          })),
          createdAt: new Date().toISOString(),
          totalVotes: 0,
          isCreator: true,
        };
        setActivePoll(mockPoll);
        setShareUrl(`${window.location.origin}/vote/${mockPoll.id}`);
        setView('results');
      }
    } catch (err) {
      console.error('Error creating poll:', err);
      // Fallback to mock
      const mockPoll: Poll = {
        id: Math.random().toString(36).substr(2, 9),
        title: pollTitle,
        options: options.filter(o => o.name.trim()).map((o, i) => ({
          id: `opt-${i}`,
          name: o.name,
          category: o.category,
          votes: 0,
          voters: [],
        })),
        createdAt: new Date().toISOString(),
        totalVotes: 0,
        isCreator: true,
      };
      setActivePoll(mockPoll);
      setShareUrl(`${window.location.origin}/vote/${mockPoll.id}`);
      setView('results');
    }

    setLoading(false);
  };

  const joinPoll = async () => {
    if (!joinCode.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/squad-vote/${joinCode}`);
      if (response.ok) {
        const data = await response.json();
        setActivePoll(data.poll);
        setView('vote');
      }
    } catch (err) {
      console.error('Error joining poll:', err);
    }
    setLoading(false);
  };

  const submitVote = async () => {
    if (!selectedOption || !voterName.trim() || !activePoll) return;

    setLoading(true);

    try {
      const response = await fetch('/api/squad-vote/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pollId: activePoll.id,
          optionId: selectedOption,
          voterName: voterName,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setActivePoll(data.poll);
      } else {
        // Update locally for demo
        const updatedPoll = { ...activePoll };
        const option = updatedPoll.options.find(o => o.id === selectedOption);
        if (option) {
          option.votes += 1;
          option.voters.push(voterName);
          updatedPoll.totalVotes += 1;
        }
        setActivePoll(updatedPoll);
      }
      setView('results');
    } catch (err) {
      console.error('Error voting:', err);
      // Update locally for demo
      const updatedPoll = { ...activePoll };
      const option = updatedPoll.options.find(o => o.id === selectedOption);
      if (option) {
        option.votes += 1;
        option.voters.push(voterName);
        updatedPoll.totalVotes += 1;
      }
      setActivePoll(updatedPoll);
      setView('results');
    }

    setLoading(false);
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    const text = `🗳️ Vote on where we should go tonight!\n\n${pollTitle}\n\n${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const reset = () => {
    setView('home');
    setPollTitle("Where should we go tonight?");
    setOptions([{ name: '', category: '' }, { name: '', category: '' }]);
    setActivePoll(null);
    setVoterName('');
    setSelectedOption(null);
    setJoinCode('');
  };

  const getWinner = () => {
    if (!activePoll) return null;
    const sorted = [...activePoll.options].sort((a, b) => b.votes - a.votes);
    if (sorted[0].votes === 0) return null;
    return sorted[0];
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => { setIsOpen(true); reset(); }}
        className="fixed bottom-[11rem] right-6 z-40 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2.5 rounded-full shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300 group flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9 }}
      >
        <Vote className="w-4 h-4" />
        <span className="font-medium text-sm">Squad Vote</span>
        <Users className="w-4 h-4" />
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
              className="relative bg-gradient-to-br from-slate-900 via-orange-950/30 to-slate-900 rounded-3xl p-6 md:p-8 max-w-lg w-full border border-orange-500/30 shadow-2xl shadow-orange-500/20 max-h-[85vh] overflow-y-auto"
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

              <AnimatePresence mode="wait">
                {/* Home View */}
                {view === 'home' && (
                  <motion.div
                    key="home"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-center"
                  >
                    <span className="text-5xl mb-4 block">🗳️</span>
                    <h2 className="text-2xl font-bold mb-2">Squad Vote</h2>
                    <p className="text-gray-400 mb-8">Can't decide where to go? Let your friends vote!</p>

                    <div className="space-y-3">
                      <button
                        onClick={() => setView('create')}
                        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                      >
                        <Plus className="w-5 h-5" />
                        Create a Vote
                      </button>

                      <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-slate-900 text-gray-400">or</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter vote code..."
                          value={joinCode}
                          onChange={(e) => setJoinCode(e.target.value)}
                          className="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500/50 focus:outline-none"
                        />
                        <button
                          onClick={joinPoll}
                          disabled={!joinCode.trim()}
                          className="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl font-medium transition-all disabled:opacity-50"
                        >
                          Join
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Create View */}
                {view === 'create' && (
                  <motion.div
                    key="create"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <h2 className="text-xl font-bold mb-6 text-center">Create Your Vote</h2>

                    {/* Poll Title */}
                    <div className="mb-4">
                      <label className="text-sm text-gray-400 mb-2 block">Question</label>
                      <input
                        type="text"
                        value={pollTitle}
                        onChange={(e) => setPollTitle(e.target.value)}
                        placeholder="Where should we go tonight?"
                        className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500/50 focus:outline-none"
                      />
                    </div>

                    {/* Options */}
                    <div className="mb-4">
                      <label className="text-sm text-gray-400 mb-2 block">Options (2-6)</label>
                      <div className="space-y-2">
                        {options.map((option, index) => (
                          <div key={index} className="flex gap-2">
                            <input
                              type="text"
                              value={option.name}
                              onChange={(e) => updateOption(index, 'name', e.target.value)}
                              placeholder={`Option ${index + 1} (e.g., JJ's Irish Pub)`}
                              className="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500/50 focus:outline-none text-sm"
                            />
                            {options.length > 2 && (
                              <button
                                onClick={() => removeOption(index)}
                                className="p-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition-all"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                      {options.length < 6 && (
                        <button
                          onClick={addOption}
                          className="mt-2 text-orange-400 hover:text-orange-300 text-sm flex items-center gap-1"
                        >
                          <Plus className="w-4 h-4" /> Add option
                        </button>
                      )}
                    </div>

                    <button
                      onClick={createPoll}
                      disabled={loading || options.filter(o => o.name.trim()).length < 2}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                    >
                      {loading ? (
                        <RefreshCw className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          Create Vote
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setView('home')}
                      className="mt-4 text-gray-400 hover:text-white text-sm mx-auto block"
                    >
                      ← Back
                    </button>
                  </motion.div>
                )}

                {/* Vote View */}
                {view === 'vote' && activePoll && (
                  <motion.div
                    key="vote"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <h2 className="text-xl font-bold mb-2 text-center">{activePoll.title}</h2>
                    <p className="text-gray-400 text-sm text-center mb-6">
                      {activePoll.totalVotes} vote{activePoll.totalVotes !== 1 ? 's' : ''} so far
                    </p>

                    {/* Voter Name */}
                    <div className="mb-4">
                      <input
                        type="text"
                        value={voterName}
                        onChange={(e) => setVoterName(e.target.value)}
                        placeholder="Your name"
                        className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500/50 focus:outline-none"
                      />
                    </div>

                    {/* Options */}
                    <div className="space-y-2 mb-6">
                      {activePoll.options.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setSelectedOption(option.id)}
                          className={`w-full p-4 rounded-xl text-left transition-all border flex items-center justify-between ${
                            selectedOption === option.id
                              ? 'border-orange-500 bg-orange-500/20'
                              : 'border-white/10 bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          <div>
                            <span className="font-medium block">{option.name}</span>
                            {option.category && (
                              <span className="text-xs text-gray-400">{option.category}</span>
                            )}
                          </div>
                          {selectedOption === option.id && (
                            <Check className="w-5 h-5 text-orange-400" />
                          )}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={submitVote}
                      disabled={loading || !selectedOption || !voterName.trim()}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                    >
                      {loading ? (
                        <RefreshCw className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <Vote className="w-5 h-5" />
                          Submit Vote
                        </>
                      )}
                    </button>
                  </motion.div>
                )}

                {/* Results View */}
                {view === 'results' && activePoll && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <h2 className="text-xl font-bold mb-2 text-center">{activePoll.title}</h2>
                    <p className="text-gray-400 text-sm text-center mb-6">
                      {activePoll.totalVotes} vote{activePoll.totalVotes !== 1 ? 's' : ''} total
                    </p>

                    {/* Results */}
                    <div className="space-y-3 mb-6">
                      {[...activePoll.options]
                        .sort((a, b) => b.votes - a.votes)
                        .map((option, index) => {
                          const percentage = activePoll.totalVotes > 0
                            ? Math.round((option.votes / activePoll.totalVotes) * 100)
                            : 0;
                          const isWinner = index === 0 && option.votes > 0;

                          return (
                            <div
                              key={option.id}
                              className={`p-4 rounded-xl border transition-all ${
                                isWinner
                                  ? 'border-yellow-500/50 bg-yellow-500/10'
                                  : 'border-white/10 bg-white/5'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  {isWinner && <Trophy className="w-4 h-4 text-yellow-500" />}
                                  <span className="font-medium">{option.name}</span>
                                </div>
                                <span className={`font-bold ${isWinner ? 'text-yellow-500' : 'text-gray-400'}`}>
                                  {option.votes} ({percentage}%)
                                </span>
                              </div>
                              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                  className={`h-full ${isWinner ? 'bg-yellow-500' : 'bg-orange-500'}`}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${percentage}%` }}
                                  transition={{ duration: 0.5, delay: index * 0.1 }}
                                />
                              </div>
                              {option.voters.length > 0 && (
                                <div className="mt-2 text-xs text-gray-400">
                                  {option.voters.join(', ')}
                                </div>
                              )}
                            </div>
                          );
                        })}
                    </div>

                    {/* Share Section */}
                    <div className="bg-white/5 rounded-xl p-4 mb-4">
                      <p className="text-sm text-gray-400 mb-3">Share with your squad:</p>
                      <div className="flex gap-2">
                        <button
                          onClick={copyLink}
                          className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all"
                        >
                          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          {copied ? 'Copied!' : 'Copy Link'}
                        </button>
                        <button
                          onClick={shareWhatsApp}
                          className="flex-1 bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                          WhatsApp
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        Poll ID: {activePoll.id}
                      </p>
                    </div>

                    <button
                      onClick={reset}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                    >
                      <Plus className="w-5 h-5" />
                      Create New Vote
                    </button>
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
