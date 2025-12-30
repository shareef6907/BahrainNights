'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Image,
  Plus,
  Search,
  Filter,
  RefreshCw,
  Eye,
  Edit3,
  Trash2,
  Instagram,
  Copy,
  Check,
} from 'lucide-react';
import GenerateButton from '@/components/studio/GenerateButton';
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
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

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
    const response = await fetch('/api/admin/studio/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'feed', count: 1 }),
    });

    if (response.ok) {
      await fetchPosts();
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

  const handleCopyCaption = async (id: string, caption: string) => {
    await navigator.clipboard.writeText(caption);
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Instagram className="w-6 h-6 text-pink-400" />
            Feed Posts
          </h1>
          <p className="text-gray-400 mt-1">Instagram feed content ready to post</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchPosts}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 transition-all"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <GenerateButton
            type="feed"
            label="Generate Post"
            onGenerate={handleGenerate}
            variant="primary"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
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

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <div className="flex gap-2">
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
                {status === 'all' ? 'All' : status.replace('_', ' ')}
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
          <p className="text-gray-400 mb-4">Generate your first Instagram feed post</p>
          <GenerateButton
            type="feed"
            label="Generate First Post"
            onGenerate={handleGenerate}
          />
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
              {/* Mock Image Area */}
              <div className="aspect-square bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                <Image className="w-16 h-16 text-gray-600" />
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="text-white font-semibold truncate">{post.title}</h3>
                  <StatusBadge status={post.status} size="sm" />
                </div>

                {/* Caption Preview */}
                <div className="bg-black/30 rounded-xl p-3 mb-3 max-h-32 overflow-y-auto">
                  <p className="text-gray-300 text-sm whitespace-pre-wrap line-clamp-4">
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
                    onClick={() => handleCopyCaption(post.id, post.caption)}
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
