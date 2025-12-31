'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Image,
  Search,
  Filter,
  RefreshCw,
  Trash2,
  Copy,
  Check,
  Lightbulb,
  Sparkles,
  Loader2,
  Instagram,
} from 'lucide-react';
import StatusBadge from '@/components/studio/StatusBadge';

interface FeedPost {
  id: string;
  title: string;
  caption: string;
  hashtags: string[];
  media_urls?: string[];
  status: 'draft' | 'pending_review' | 'approved' | 'scheduled' | 'posted' | 'rejected';
  created_at: string;
  scheduled_for?: string;
  source_type?: string;
}

export default function FeedPostsPage() {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // User input states
  const [userInput, setUserInput] = useState('');
  const [contentSource, setContentSource] = useState('custom');
  const [generateImages, setGenerateImages] = useState(true);
  const [postCount, setPostCount] = useState(3);

  useEffect(() => {
    fetchPosts();
  }, [filter]);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({ type: 'feed' });
      if (filter !== 'all') {
        params.set('status', filter);
      }

      const response = await fetch(`/api/admin/studio/content?${params}`);
      if (response.ok) {
        const data = await response.json();
        setPosts(data.content || []);
      }
    } catch (error) {
      console.error('Error fetching feed posts:', error);
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
          type: 'feed',
          count: postCount,
          userInput,
          contentSource,
          generateImages,
        }),
      });

      if (response.ok) {
        await fetchPosts();
        setUserInput('');
      }
    } catch (error) {
      console.error('Error generating:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this feed post?')) return;

    const response = await fetch(`/api/admin/studio/content?id=${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      await fetchPosts();
    }
  };

  const handleCopyCaption = async (id: string, caption: string, hashtags: string[]) => {
    const fullCaption = `${caption}\n\n${hashtags.map(h => `#${h}`).join(' ')}`;
    await navigator.clipboard.writeText(fullCaption);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleApprove = async (id: string) => {
    const response = await fetch(`/api/admin/studio/content/${id}/approve`, {
      method: 'POST',
    });

    if (response.ok) {
      await fetchPosts();
    }
  };

  const handleReject = async (id: string) => {
    const response = await fetch(`/api/admin/studio/content/${id}/reject`, {
      method: 'POST',
    });

    if (response.ok) {
      await fetchPosts();
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.caption?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statusCounts = {
    all: posts.length,
    pending_review: posts.filter(p => p.status === 'pending_review').length,
    approved: posts.filter(p => p.status === 'approved').length,
    posted: posts.filter(p => p.status === 'posted').length,
  };

  const sourceOptions = [
    { id: 'custom', icon: '✨', label: 'Custom' },
    { id: 'events', icon: '🎯', label: 'From Events' },
    { id: 'cinema', icon: '🎬', label: 'From Cinema' },
    { id: 'weekend', icon: '📅', label: 'Weekend Roundup' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Instagram className="w-6 h-6 text-pink-400" />
            Feed Posts
          </h1>
          <p className="text-gray-400 mt-1">Instagram feed content with AI images</p>
        </div>
        <button
          onClick={fetchPosts}
          className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 transition-all self-start"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* User Input Section */}
      <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-400" />
          What&apos;s the post about?
        </h3>

        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Example: New rooftop lounge opening in Seef called SkyBar - amazing views of the city, great for sunset photos, perfect for date nights. They have a special opening week offer of 50% off all mocktails..."
          className="w-full h-28 p-4 bg-black/30 border border-white/10 rounded-xl text-white placeholder:text-gray-500 resize-none focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50"
        />

        {/* Source Selection */}
        <div className="flex flex-wrap gap-2 mt-4">
          {sourceOptions.map((source) => (
            <button
              key={source.id}
              onClick={() => setContentSource(source.id)}
              className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${
                contentSource === source.id
                  ? 'bg-pink-600 text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              <span>{source.icon}</span>
              <span className="text-sm font-medium">{source.label}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mt-4">
          {/* Post Count */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-400">Posts:</label>
            <select
              value={postCount}
              onChange={(e) => setPostCount(Number(e.target.value))}
              className="px-3 py-1.5 bg-black/30 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-pink-500/50"
            >
              <option value={1}>1</option>
              <option value={3}>3</option>
              <option value={5}>5</option>
            </select>
          </div>

          {/* AI Images Toggle */}
          <button
            onClick={() => setGenerateImages(!generateImages)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              generateImages
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-white/5 text-gray-400 border border-white/10'
            }`}
          >
            <Image className="w-4 h-4" />
            {generateImages ? 'AI Images: On' : 'AI Images: Off'}
          </button>
        </div>

        <p className="text-gray-400 text-sm mt-4">
          <span className="text-pink-400 font-medium">🖼️</span> AI will generate Instagram-optimized images (1080x1080) based on your topic
        </p>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full mt-4 py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating {postCount} post{postCount > 1 ? 's' : ''} with images...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate {postCount} Feed Post{postCount > 1 ? 's' : ''}
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
            placeholder="Search feed posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-pink-500/50"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <div className="flex gap-2 flex-wrap">
            {(['all', 'pending_review', 'approved', 'posted'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  filter === status
                    ? 'bg-pink-500/20 text-pink-400'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {status === 'all' ? 'All' : status === 'pending_review' ? 'Pending' : status.charAt(0).toUpperCase() + status.slice(1)}
                <span className="ml-1 text-xs opacity-70">({statusCounts[status]})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-pink-400/30 border-t-pink-400 rounded-full animate-spin" />
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-12 bg-[#0F0F1A]/50 border border-white/10 rounded-2xl">
          <Image className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No Feed Posts Yet</h3>
          <p className="text-gray-400">Use the form above to generate your first Instagram post</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#0F0F1A]/50 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all"
            >
              {/* Image */}
              <div className="aspect-square relative bg-gradient-to-br from-pink-500/20 to-purple-500/20">
                {post.media_urls?.[0] ? (
                  <>
                    <img
                      src={post.media_urls[0]}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-green-500/90 text-white text-xs rounded font-medium">
                      AI Generated
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Image className="w-16 h-16 text-gray-600" />
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <StatusBadge status={post.status} size="sm" showIcon={false} />
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-white font-semibold truncate mb-2">{post.title}</h3>

                {/* Caption Preview */}
                <div className="bg-black/30 rounded-xl p-3 mb-3 max-h-24 overflow-y-auto">
                  <p className="text-gray-300 text-sm whitespace-pre-wrap line-clamp-3">
                    {post.caption}
                  </p>
                </div>

                {/* Hashtags */}
                {post.hashtags && post.hashtags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {post.hashtags.slice(0, 4).map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-pink-500/10 text-pink-400 rounded text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                    {post.hashtags.length > 4 && (
                      <span className="text-xs text-gray-500">
                        +{post.hashtags.length - 4} more
                      </span>
                    )}
                  </div>
                )}

                {/* Metadata */}
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  {post.source_type && (
                    <>
                      <span>•</span>
                      <span className="capitalize">{post.source_type}</span>
                    </>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {post.status === 'pending_review' && (
                    <>
                      <button
                        onClick={() => handleApprove(post.id)}
                        className="flex-1 py-1.5 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg text-sm font-medium transition-all"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(post.id)}
                        className="flex-1 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-medium transition-all"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleCopyCaption(post.id, post.caption, post.hashtags || [])}
                    className="p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-all"
                    title="Copy caption"
                  >
                    {copiedId === post.id ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-2 bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-lg transition-all"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
