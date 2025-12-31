'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  FileText,
  Image,
  PlaySquare,
  Film,
  Clock,
  ExternalLink,
  Copy,
  Check,
  Calendar,
  Hash,
  Music,
  Sparkles,
} from 'lucide-react';
import StatusBadge from './StatusBadge';

interface ContentDetail {
  id: string;
  content_type: 'blog' | 'feed' | 'story' | 'reel_brief';
  title: string;
  body?: string;
  caption?: string;
  hashtags?: string[];
  media_urls?: string[];
  status: string;
  created_at: string;
  scheduled_for?: string;
  source_type?: string;
  // Blog specific
  slug?: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[];
  // Story specific
  story_type?: string;
  story_sticker_data?: Record<string, unknown>;
  // Reel specific
  reel_concept?: string;
  reel_hook?: string;
  reel_text_overlays?: { slide: number; text: string; visual_note?: string }[];
  reel_music_suggestions?: { song: string; artist: string; reason: string }[];
  reel_duration?: string;
  reel_style?: string;
}

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentId: string | null;
}

const typeConfig = {
  blog: {
    icon: FileText,
    label: 'Blog Post',
    color: 'from-blue-500 to-indigo-500',
  },
  feed: {
    icon: Image,
    label: 'Feed Post',
    color: 'from-pink-500 to-rose-500',
  },
  story: {
    icon: PlaySquare,
    label: 'Story',
    color: 'from-purple-500 to-violet-500',
  },
  reel_brief: {
    icon: Film,
    label: 'Reel Brief',
    color: 'from-orange-500 to-red-500',
  },
};

export default function PreviewModal({ isOpen, onClose, contentId }: PreviewModalProps) {
  const [content, setContent] = useState<ContentDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen && contentId) {
      fetchContent();
    }
  }, [isOpen, contentId]);

  const fetchContent = async () => {
    if (!contentId) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/studio/content/${contentId}`);
      if (response.ok) {
        const data = await response.json();
        setContent(data.content);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  const config = content ? typeConfig[content.content_type] : null;
  const Icon = config?.icon || FileText;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-[#0F0F1A] border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              {config && (
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${config.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
              )}
              <div>
                <h2 className="text-xl font-semibold text-white">Content Preview</h2>
                <p className="text-sm text-gray-400">{config?.label || 'Content'}</p>
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
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" />
              </div>
            ) : content ? (
              <div className="space-y-6">
                {/* Title & Status */}
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-bold text-white">{content.title}</h3>
                  <StatusBadge status={content.status as 'pending_review'} />
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {new Date(content.created_at).toLocaleString()}
                  </span>
                  {content.source_type && (
                    <span className="flex items-center gap-1.5">
                      <ExternalLink className="w-4 h-4" />
                      {content.source_type}
                    </span>
                  )}
                  {content.scheduled_for && (
                    <span className="flex items-center gap-1.5 text-cyan-400">
                      <Calendar className="w-4 h-4" />
                      Scheduled: {new Date(content.scheduled_for).toLocaleDateString()}
                    </span>
                  )}
                </div>

                {/* Image Preview */}
                {content.media_urls && content.media_urls.length > 0 && (
                  <div className="relative rounded-xl overflow-hidden bg-black/30">
                    <img
                      src={content.media_urls[0]}
                      alt={content.title}
                      className="w-full max-h-80 object-contain"
                    />
                    <div className="absolute top-2 left-2 px-2 py-1 bg-green-500/90 text-white text-xs rounded font-medium flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      AI Generated
                    </div>
                  </div>
                )}

                {/* Blog Content */}
                {content.content_type === 'blog' && content.body && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-white">Article Content</h4>
                      <button
                        onClick={() => handleCopy(content.body!)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg text-sm transition-all"
                      >
                        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <div className="bg-black/30 rounded-xl p-4 prose prose-invert prose-sm max-w-none max-h-60 overflow-y-auto">
                      <div className="whitespace-pre-wrap text-gray-300">{content.body}</div>
                    </div>
                    {content.seo_description && (
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                        <h5 className="text-sm font-medium text-blue-400 mb-2">SEO Description</h5>
                        <p className="text-gray-300 text-sm">{content.seo_description}</p>
                      </div>
                    )}
                    {content.seo_keywords && content.seo_keywords.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {content.seo_keywords.map((keyword, i) => (
                          <span key={i} className="px-2 py-1 bg-white/5 text-gray-400 rounded text-xs">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Feed/Story Caption */}
                {(content.content_type === 'feed' || content.content_type === 'story') && content.caption && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-white">Caption</h4>
                      <button
                        onClick={() => handleCopy(content.caption! + (content.hashtags ? '\n\n' + content.hashtags.map(h => `#${h}`).join(' ') : ''))}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg text-sm transition-all"
                      >
                        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'Copied!' : 'Copy All'}
                      </button>
                    </div>
                    <div className="bg-black/30 rounded-xl p-4">
                      <p className="text-gray-300 whitespace-pre-wrap">{content.caption}</p>
                    </div>
                  </div>
                )}

                {/* Hashtags */}
                {content.hashtags && content.hashtags.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Hash className="w-5 h-5 text-pink-400" />
                      Hashtags ({content.hashtags.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {content.hashtags.map((tag, i) => (
                        <span key={i} className="px-3 py-1.5 bg-pink-500/10 text-pink-400 rounded-lg text-sm">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Story Specific */}
                {content.content_type === 'story' && content.story_type && (
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                    <h5 className="text-sm font-medium text-purple-400 mb-2">Story Type</h5>
                    <p className="text-white capitalize">{content.story_type.replace('_', ' ')}</p>
                    {content.story_sticker_data && (
                      <pre className="mt-2 text-xs text-gray-400 overflow-x-auto">
                        {JSON.stringify(content.story_sticker_data, null, 2)}
                      </pre>
                    )}
                  </div>
                )}

                {/* Reel Brief Specific */}
                {content.content_type === 'reel_brief' && (
                  <div className="space-y-4">
                    {content.reel_hook && (
                      <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
                        <h5 className="text-sm font-medium text-orange-400 mb-2">Hook</h5>
                        <p className="text-white text-lg font-medium">{content.reel_hook}</p>
                      </div>
                    )}
                    {content.reel_concept && (
                      <div className="bg-black/30 rounded-xl p-4">
                        <h5 className="text-sm font-medium text-gray-400 mb-2">Concept</h5>
                        <p className="text-gray-300">{content.reel_concept}</p>
                      </div>
                    )}
                    {content.reel_text_overlays && content.reel_text_overlays.length > 0 && (
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium text-gray-400">Slides</h5>
                        {content.reel_text_overlays.map((slide, i) => (
                          <div key={i} className="flex items-start gap-3 bg-black/30 rounded-lg p-3">
                            <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                              {slide.slide}
                            </span>
                            <div>
                              <p className="text-white">{slide.text}</p>
                              {slide.visual_note && (
                                <p className="text-gray-500 text-sm mt-1">{slide.visual_note}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {content.reel_music_suggestions && content.reel_music_suggestions.length > 0 && (
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium text-gray-400 flex items-center gap-2">
                          <Music className="w-4 h-4" />
                          Music Suggestions
                        </h5>
                        {content.reel_music_suggestions.map((music, i) => (
                          <div key={i} className="bg-black/30 rounded-lg p-3">
                            <p className="text-white font-medium">{music.song} - {music.artist}</p>
                            <p className="text-gray-500 text-sm">{music.reason}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                Content not found
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
