'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Film,
  Search,
  RefreshCw,
  Trash2,
  Download,
  Music,
  Type,
  Zap,
  Clock,
  Copy,
  Check,
} from 'lucide-react';
import GenerateButton from '@/components/studio/GenerateButton';
import StatusBadge from '@/components/studio/StatusBadge';

interface ReelBrief {
  id: string;
  title: string;
  caption: string;
  hashtags: string[];
  reel_concept: string;
  reel_hook: string;
  reel_text_overlays: { slide: number; text: string }[];
  reel_music_suggestions: { song: string; artist: string; reason?: string }[];
  reel_duration: string;
  reel_style: string;
  status: 'draft' | 'pending_review' | 'approved' | 'scheduled' | 'posted' | 'rejected';
  created_at: string;
}

const reelStyles = [
  { id: 'trendy', label: 'Trendy', emoji: '🔥' },
  { id: 'educational', label: 'Educational', emoji: '📚' },
  { id: 'entertaining', label: 'Entertaining', emoji: '🎉' },
  { id: 'aesthetic', label: 'Aesthetic', emoji: '✨' },
  { id: 'listicle', label: 'Listicle', emoji: '📋' },
];

export default function ReelsPage() {
  const [reels, setReels] = useState<ReelBrief[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedReel, setExpandedReel] = useState<string | null>(null);

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

  const handleGenerate = async (style: string = 'trendy') => {
    const response = await fetch('/api/admin/studio/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'reel', count: 1, reelStyle: style }),
    });

    if (response.ok) {
      await fetchReels();
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
        <div className="flex items-center gap-3">
          <button
            onClick={fetchReels}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 transition-all"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <GenerateButton
            type="reel"
            label="Generate Brief"
            onGenerate={() => handleGenerate('trendy')}
            variant="primary"
          />
        </div>
      </div>

      {/* Style Selector */}
      <div className="bg-[#0F0F1A]/50 border border-white/10 rounded-2xl p-4">
        <h3 className="text-sm font-medium text-gray-400 mb-3">Generate by Style</h3>
        <div className="flex flex-wrap gap-2">
          {reelStyles.map((style) => (
            <button
              key={style.id}
              onClick={() => handleGenerate(style.id)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 hover:from-orange-500/30 hover:to-red-500/30 text-white rounded-xl transition-all"
            >
              <span>{style.emoji}</span>
              <span className="text-sm font-medium">{style.label}</span>
            </button>
          ))}
        </div>
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
          <p className="text-gray-400 mb-4">Generate your first video content brief</p>
          <GenerateButton
            type="reel"
            label="Generate First Brief"
            onGenerate={() => handleGenerate('trendy')}
          />
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
