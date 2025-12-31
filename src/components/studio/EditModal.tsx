'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  FileText,
  Image,
  PlaySquare,
  Film,
  Save,
  Loader2,
  Hash,
} from 'lucide-react';

interface ContentDetail {
  id: string;
  content_type: 'blog' | 'feed' | 'story' | 'reel_brief';
  title: string;
  body?: string;
  caption?: string;
  hashtags?: string[];
  status: string;
  // Blog specific
  seo_title?: string;
  seo_description?: string;
  // Story specific
  story_type?: string;
  // Reel specific
  reel_concept?: string;
  reel_hook?: string;
}

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentId: string | null;
  onSave?: () => void;
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

export default function EditModal({ isOpen, onClose, contentId, onSave }: EditModalProps) {
  const [content, setContent] = useState<ContentDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    caption: '',
    hashtags: '',
    seo_title: '',
    seo_description: '',
    reel_concept: '',
    reel_hook: '',
  });

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
        setFormData({
          title: data.content.title || '',
          body: data.content.body || '',
          caption: data.content.caption || '',
          hashtags: data.content.hashtags?.join(', ') || '',
          seo_title: data.content.seo_title || '',
          seo_description: data.content.seo_description || '',
          reel_concept: data.content.reel_concept || '',
          reel_hook: data.content.reel_hook || '',
        });
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!contentId || !content) return;
    setIsSaving(true);
    try {
      const updateData: Record<string, unknown> = {
        title: formData.title,
      };

      if (content.content_type === 'blog') {
        updateData.body = formData.body;
        updateData.seo_title = formData.seo_title;
        updateData.seo_description = formData.seo_description;
      } else if (content.content_type === 'feed' || content.content_type === 'story') {
        updateData.caption = formData.caption;
        updateData.hashtags = formData.hashtags.split(',').map(h => h.trim().replace('#', '')).filter(Boolean);
      } else if (content.content_type === 'reel_brief') {
        updateData.caption = formData.caption;
        updateData.reel_concept = formData.reel_concept;
        updateData.reel_hook = formData.reel_hook;
        updateData.hashtags = formData.hashtags.split(',').map(h => h.trim().replace('#', '')).filter(Boolean);
      }

      const response = await fetch(`/api/admin/studio/content/${contentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        onSave?.();
        onClose();
      }
    } catch (error) {
      console.error('Error saving content:', error);
    } finally {
      setIsSaving(false);
    }
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
          className="bg-[#0F0F1A] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
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
                <h2 className="text-xl font-semibold text-white">Edit Content</h2>
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
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" />
              </div>
            ) : content ? (
              <div className="space-y-5">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-3 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
                  />
                </div>

                {/* Blog Fields */}
                {content.content_type === 'blog' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Article Body</label>
                      <textarea
                        value={formData.body}
                        onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                        rows={10}
                        className="w-full p-3 bg-black/30 border border-white/10 rounded-xl text-white resize-none focus:outline-none focus:border-purple-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">SEO Title</label>
                      <input
                        type="text"
                        value={formData.seo_title}
                        onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                        className="w-full p-3 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">SEO Description</label>
                      <textarea
                        value={formData.seo_description}
                        onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
                        rows={2}
                        className="w-full p-3 bg-black/30 border border-white/10 rounded-xl text-white resize-none focus:outline-none focus:border-purple-500/50"
                      />
                    </div>
                  </>
                )}

                {/* Feed/Story Fields */}
                {(content.content_type === 'feed' || content.content_type === 'story') && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Caption</label>
                      <textarea
                        value={formData.caption}
                        onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                        rows={6}
                        className="w-full p-3 bg-black/30 border border-white/10 rounded-xl text-white resize-none focus:outline-none focus:border-purple-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                        <Hash className="w-4 h-4" />
                        Hashtags (comma separated)
                      </label>
                      <input
                        type="text"
                        value={formData.hashtags}
                        onChange={(e) => setFormData({ ...formData, hashtags: e.target.value })}
                        placeholder="BahrainNights, Bahrain, Events"
                        className="w-full p-3 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
                      />
                    </div>
                  </>
                )}

                {/* Reel Brief Fields */}
                {content.content_type === 'reel_brief' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Hook</label>
                      <input
                        type="text"
                        value={formData.reel_hook}
                        onChange={(e) => setFormData({ ...formData, reel_hook: e.target.value })}
                        className="w-full p-3 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Concept</label>
                      <textarea
                        value={formData.reel_concept}
                        onChange={(e) => setFormData({ ...formData, reel_concept: e.target.value })}
                        rows={3}
                        className="w-full p-3 bg-black/30 border border-white/10 rounded-xl text-white resize-none focus:outline-none focus:border-purple-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Caption</label>
                      <textarea
                        value={formData.caption}
                        onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                        rows={4}
                        className="w-full p-3 bg-black/30 border border-white/10 rounded-xl text-white resize-none focus:outline-none focus:border-purple-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                        <Hash className="w-4 h-4" />
                        Hashtags (comma separated)
                      </label>
                      <input
                        type="text"
                        value={formData.hashtags}
                        onChange={(e) => setFormData({ ...formData, hashtags: e.target.value })}
                        placeholder="BahrainNights, Bahrain, Reels"
                        className="w-full p-3 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
                      />
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                Content not found
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-white/10">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving || !content}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl transition-all disabled:opacity-50"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save Changes
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
