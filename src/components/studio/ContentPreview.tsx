'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  FileText,
  Image,
  PlaySquare,
  Film,
  Calendar,
  Tag,
  Clock,
  Instagram,
  Globe,
  Copy,
  Check,
} from 'lucide-react';
import StatusBadge from './StatusBadge';

interface ContentPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  content: {
    id: string;
    type: 'blog' | 'feed' | 'story' | 'reel_brief';
    title: string;
    caption?: string;
    body?: string;
    hashtags?: string[];
    mediaUrls?: string[];
    scheduledFor?: string;
    status: string;
    createdAt: string;
    // Reel-specific
    reelConcept?: string;
    reelHook?: string;
    reelTextOverlays?: { slide: number; text: string }[];
    reelMusicSuggestions?: { song: string; artist: string }[];
    // Story-specific
    storyType?: string;
    storyStickerData?: Record<string, unknown>;
  };
}

const typeConfig = {
  blog: { icon: FileText, label: 'Blog Post', color: 'from-blue-500 to-indigo-500' },
  feed: { icon: Image, label: 'Feed Post', color: 'from-pink-500 to-rose-500' },
  story: { icon: PlaySquare, label: 'Story', color: 'from-purple-500 to-violet-500' },
  reel_brief: { icon: Film, label: 'Reel Brief', color: 'from-orange-500 to-red-500' },
};

export default function ContentPreview({
  isOpen,
  onClose,
  content,
}: ContentPreviewProps) {
  const [copied, setCopied] = useState(false);
  const config = typeConfig[content.type];
  const Icon = config.icon;

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[85vh] bg-[#0F0F1A] border border-white/10 rounded-2xl overflow-hidden z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${config.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">{config.label} Preview</h2>
                  <p className="text-sm text-gray-400">ID: {content.id.slice(0, 8)}...</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Title */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{content.title}</h3>
                <div className="flex items-center gap-3">
                  <StatusBadge status={content.status as 'draft' | 'pending_review' | 'approved' | 'scheduled' | 'posted' | 'rejected'} />
                  <span className="text-sm text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(content.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Caption/Body */}
              {content.caption && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-400">Caption</label>
                    <button
                      onClick={() => handleCopy(content.caption || '')}
                      className="flex items-center gap-1 text-xs text-gray-500 hover:text-white transition-colors"
                    >
                      {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="bg-black/30 rounded-xl p-4 text-gray-300 whitespace-pre-wrap">
                    {content.caption}
                  </div>
                </div>
              )}

              {content.body && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Body</label>
                  <div className="bg-black/30 rounded-xl p-4 text-gray-300 whitespace-pre-wrap max-h-60 overflow-y-auto">
                    {content.body}
                  </div>
                </div>
              )}

              {/* Hashtags */}
              {content.hashtags && content.hashtags.length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    Hashtags
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {content.hashtags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-lg text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Reel-specific content */}
              {content.type === 'reel_brief' && (
                <>
                  {content.reelConcept && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Concept</label>
                      <div className="bg-black/30 rounded-xl p-4 text-gray-300">
                        {content.reelConcept}
                      </div>
                    </div>
                  )}
                  {content.reelHook && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Hook</label>
                      <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 text-orange-300">
                        {content.reelHook}
                      </div>
                    </div>
                  )}
                  {content.reelTextOverlays && content.reelTextOverlays.length > 0 && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Text Overlays</label>
                      <div className="space-y-2">
                        {content.reelTextOverlays.map((overlay, i) => (
                          <div key={i} className="flex items-center gap-3 bg-black/30 rounded-lg p-3">
                            <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs text-gray-400">
                              {overlay.slide}
                            </span>
                            <span className="text-gray-300">{overlay.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Scheduled Date */}
              {content.scheduledFor && (
                <div className="flex items-center gap-2 text-cyan-400 bg-cyan-500/10 rounded-xl p-3">
                  <Calendar className="w-4 h-4" />
                  <span>Scheduled for: {new Date(content.scheduledFor).toLocaleString()}</span>
                </div>
              )}

              {/* Platforms */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <span className="text-sm text-gray-400">Platforms:</span>
                <div className="flex items-center gap-2">
                  {content.type === 'blog' ? (
                    <span className="flex items-center gap-1 text-sm text-blue-400">
                      <Globe className="w-4 h-4" />
                      Website
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-sm text-pink-400">
                      <Instagram className="w-4 h-4" />
                      Instagram
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-4 border-t border-white/10">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
