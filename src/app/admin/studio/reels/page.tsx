'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Film,
  Search,
  RefreshCw,
  Trash2,
  Music,
  Type,
  Zap,
  Clock,
  Copy,
  Check,
  Lightbulb,
  Sparkles,
  Loader2,
} from 'lucide-react';
import StatusBadge from '@/components/studio/StatusBadge';

interface ReelBrief {
  id: string;
  title: string;
  caption: string;
  hashtags: string[];
  reel_concept: string;
  reel_hook: string;
  reel_text_overlays: { slide: number; text: string; visual_note?: string }[];
  reel_music_suggestions: { song: string; artist: string; reason?: string }[];
  reel_duration: string;
  reel_style: string;
  status: 'draft' | 'pending_review' | 'approved' | 'scheduled' | 'posted' | 'rejected';
  created_at: string;
}

const reelStyles = [
  { id: 'trendy', label: 'Trendy', emoji: '🔥', description: 'Viral-worthy content' },
  { id: 'educational', label: 'Educational', emoji: '📚', description: 'Tips & guides' },
  { id: 'entertaining', label: 'Entertaining', emoji: '🎉', description: 'Fun & engaging' },
  { id: 'aesthetic', label: 'Aesthetic', emoji: '✨', description: 'Visually stunning' },
  { id: 'listicle', label: 'Listicle', emoji: '📋', description: 'Top X lists' },
];

export default function ReelsPage() {
  const [reels, setReels] = useState<ReelBrief[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedReel, setExpandedReel] = useState<string | null>(null);

  // User input states
  const [userInput, setUserInput] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('trendy');
  const [reelCount, setReelCount] = useState(1);

  useEffect(() => {
    fetchReels();
  }, [filter]);

  const fetchReels = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({ type: 'reel_brief' });
      if (filter !== 'all') {
        params.set('status', filter);
      }

      const response = await fetch(`/api/admin/studio/content?${params}`);
      if (response.ok) {
        const data = await response.json();
        setReels(data.content || []);
      }
    } catch (error) {
      console.error('Error fetching reels:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/admin/studio/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'reel',
          count: reelCount,
          reelStyle: selectedStyle,
          userInput,
        }),
      });

      if (response.ok) {
        await fetchReels();
        setUserInput('');
      }
    } catch (error) {
      console.error('Error generating reels:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this reel brief?')) return;

    const response = await fetch(`/api/admin/studio/content?id=${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      await fetchReels();
    }
  };

  const handleApprove = async (id: string) => {
    const response = await fetch(`/api/admin/studio/content/${id}/approve`, {
      method: 'POST',
    });

    if (response.ok) {
      await fetchReels();
    }
  };

  const handleCopyBrief = async (reel: ReelBrief) => {
    const briefText = `
REEL BRIEF: ${reel.title}

HOOK: ${reel.reel_hook}

CONCEPT: ${reel.reel_concept}

DURATION: ${reel.reel_duration}
STYLE: ${reel.reel_style}

TEXT OVERLAYS:
${reel.reel_text_overlays?.map(o => `Slide ${o.slide}: ${o.text}`).join('\n') || 'None'}

MUSIC SUGGESTIONS:
${reel.reel_music_suggestions?.map(m => `- ${m.song} by ${m.artist}`).join('\n') || 'None'}

CAPTION:
${reel.caption}

HASHTAGS: ${reel.hashtags?.map(h => `#${h}`).join(' ') || ''}
    `.trim();

    await navigator.clipboard.writeText(briefText);
    setCopiedId(reel.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredReels = reels.filter(reel =>
    reel.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    reel.reel_concept?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Film className="w-6 h-6 text-orange-400" />
            Reel Briefs
          </h1>
          <p className="text-gray-400 mt-1">Video content briefs for your video editor</p>
        </div>
        <button
          onClick={fetchReels}
          className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 transition-all self-start"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* User Input Section */}
      <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-400" />
          What&apos;s the reel about?
        </h3>

        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Example: I want to make a reel about the best hidden gems in Bahrain - cafes that most people don't know about. Include places like Little Italy in Riffa, that tiny coffee shop in Muharraq, and the Japanese place near the airport..."
          className="w-full h-28 p-4 bg-black/30 border border-white/10 rounded-xl text-white placeholder:text-gray-500 resize-none focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50"
        />

        {/* Style Selection */}
        <div className="mt-4">
          <label className="text-sm text-gray-400 block mb-2">Reel Style</label>
          <div className="flex flex-wrap gap-2">
            {reelStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  selectedStyle === style.id
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                }`}
              >
                <span>{style.emoji}</span>
                <span className="text-sm font-medium">{style.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-4">
          {/* Brief Count */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-400">Briefs:</label>
            <select
              value={reelCount}
              onChange={(e) => setReelCount(Number(e.target.value))}
              className="px-3 py-1.5 bg-black/30 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-orange-500/50"
            >
              <option value={1}>1</option>
              <option value={3}>3</option>
              <option value={5}>5</option>
            </select>
          </div>
        </div>

        <p className="text-gray-400 text-sm mt-4">
          <span className="text-orange-400 font-medium">🎬</span> Briefs include hook, concept, text overlays for each slide, and music suggestions
        </p>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full mt-4 py-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating {reelCount} {reelStyles.find(s => s.id === selectedStyle)?.label} brief{reelCount > 1 ? 's' : ''}...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate {reelCount} Reel Brief{reelCount > 1 ? 's' : ''}
            </>
          )}
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search reel briefs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-500/50"
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-orange-500/50"
        >
          <option value="all">All Status</option>
          <option value="pending_review">Pending</option>
          <option value="approved">Approved</option>
        </select>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-orange-400/30 border-t-orange-400 rounded-full animate-spin" />
        </div>
      ) : filteredReels.length === 0 ? (
        <div className="text-center py-12 bg-[#0F0F1A]/50 border border-white/10 rounded-2xl">
          <Film className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No Reel Briefs Yet</h3>
          <p className="text-gray-400">Use the form above to generate your first video brief</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReels.map((reel, index) => (
            <motion.div
              key={reel.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#0F0F1A]/50 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all"
            >
              {/* Main Content */}
              <div className="p-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                    <Film className="w-6 h-6 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-white font-semibold text-lg">{reel.title}</h3>
                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {reel.reel_duration}
                          </span>
                          <span className="capitalize">{reel.reel_style}</span>
                        </div>
                      </div>
                      <StatusBadge status={reel.status} />
                    </div>

                    {/* Hook */}
                    <div className="mt-3 p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                      <div className="flex items-center gap-2 text-orange-400 text-xs font-medium mb-1">
                        <Zap className="w-3 h-3" />
                        HOOK
                      </div>
                      <p className="text-white text-sm">{reel.reel_hook}</p>
                    </div>

                    {/* Expandable Content */}
                    <button
                      onClick={() => setExpandedReel(expandedReel === reel.id ? null : reel.id)}
                      className="text-sm text-orange-400 hover:text-orange-300 mt-3 transition-colors"
                    >
                      {expandedReel === reel.id ? 'Show less' : 'Show full brief'}
                    </button>

                    {expandedReel === reel.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 space-y-4"
                      >
                        {/* Concept */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-400 mb-2">Concept</h4>
                          <p className="text-gray-300 text-sm">{reel.reel_concept}</p>
                        </div>

                        {/* Text Overlays */}
                        {reel.reel_text_overlays && reel.reel_text_overlays.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                              <Type className="w-4 h-4" />
                              Text Overlays
                            </h4>
                            <div className="space-y-2">
                              {reel.reel_text_overlays.map((overlay, i) => (
                                <div key={i} className="flex items-center gap-3 bg-black/30 rounded-lg p-2">
                                  <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs text-gray-400">
                                    {overlay.slide}
                                  </span>
                                  <span className="text-gray-300 text-sm">{overlay.text}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Music Suggestions */}
                        {reel.reel_music_suggestions && reel.reel_music_suggestions.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                              <Music className="w-4 h-4" />
                              Music Suggestions
                            </h4>
                            <div className="space-y-2">
                              {reel.reel_music_suggestions.map((music, i) => (
                                <div key={i} className="bg-black/30 rounded-lg p-2">
                                  <p className="text-gray-300 text-sm">
                                    <span className="font-medium">{music.song}</span>
                                    {' by '}
                                    <span className="text-gray-400">{music.artist}</span>
                                  </p>
                                  {music.reason && (
                                    <p className="text-xs text-gray-500 mt-1">{music.reason}</p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Caption */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-400 mb-2">Caption</h4>
                          <p className="text-gray-300 text-sm bg-black/30 rounded-lg p-3">{reel.caption}</p>
                        </div>

                        {/* Hashtags */}
                        {reel.hashtags && reel.hashtags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {reel.hashtags.map((tag, i) => (
                              <span key={i} className="px-2 py-0.5 bg-orange-500/10 text-orange-400 rounded text-xs">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-4">
                      {reel.status === 'pending_review' && (
                        <button
                          onClick={() => handleApprove(reel.id)}
                          className="px-3 py-1.5 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg text-sm font-medium transition-all"
                        >
                          Approve
                        </button>
                      )}
                      <button
                        onClick={() => handleCopyBrief(reel)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg text-sm transition-all ml-auto"
                      >
                        {copiedId === reel.id ? (
                          <>
                            <Check className="w-4 h-4 text-green-400" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copy Brief
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(reel.id)}
                        className="p-2 bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
