'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Search,
  Filter,
  RefreshCw,
  Eye,
  Edit3,
  Trash2,
  ExternalLink,
  Lightbulb,
  Sparkles,
  Image as ImageIcon,
  Loader2,
} from 'lucide-react';
import StatusBadge from '@/components/studio/StatusBadge';

interface BlogPost {
  id: string;
  title: string;
  body: string;
  slug: string;
  status: 'draft' | 'pending_review' | 'approved' | 'scheduled' | 'posted' | 'rejected';
  seo_title?: string;
  seo_description?: string;
  media_urls?: string[];
  created_at: string;
  scheduled_for?: string;
}

export default function BlogPostsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // User input states
  const [userInput, setUserInput] = useState('');
  const [contentSource, setContentSource] = useState('custom');
  const [contentStyle, setContentStyle] = useState('listicle');
  const [generateImages, setGenerateImages] = useState(true);
  const [postCount, setPostCount] = useState(3);

  useEffect(() => {
    fetchPosts();
  }, [filter]);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({ type: 'blog' });
      if (filter !== 'all') {
        params.set('status', filter);
      }

      const response = await fetch(`/api/admin/studio/content?${params}`);
      if (response.ok) {
        const data = await response.json();
        setPosts(data.content || []);
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
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
          type: 'blog',
          count: postCount,
          userInput,
          contentSource,
          contentStyle,
          generateImages,
        }),
      });

      if (response.ok) {
        await fetchPosts();
        setUserInput(''); // Clear input after successful generation
      }
    } catch (error) {
      console.error('Error generating:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    const response = await fetch(`/api/admin/studio/content?id=${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      await fetchPosts();
    }
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
    post.title?.toLowerCase().includes(searchQuery.toLowerCase())
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
            <FileText className="w-6 h-6 text-blue-400" />
            Blog Posts
          </h1>
          <p className="text-gray-400 mt-1">AI-generated articles with images</p>
        </div>
        <button
          onClick={fetchPosts}
          className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 transition-all self-start"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* User Input Section */}
      <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-400" />
          What do you want to write about?
        </h3>

        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Example: I want to write about the best beach clubs in Bahrain. In my opinion, Coral Bay is underrated because of their infinity pool and the prices are actually reasonable compared to hotels. Also mention Nammos and Billionaire..."
          className="w-full h-32 p-4 bg-black/30 border border-white/10 rounded-xl text-white placeholder:text-gray-500 resize-none focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {/* Content Source */}
          <div>
            <label className="text-xs text-gray-400 block mb-1.5">Source</label>
            <select
              value={contentSource}
              onChange={(e) => setContentSource(e.target.value)}
              className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500/50"
            >
              <option value="custom">✨ Custom Topic</option>
              <option value="events">🎯 From Events</option>
              <option value="cinema">🎬 From Movies</option>
              <option value="trending">📈 Trending</option>
            </select>
          </div>

          {/* Content Style */}
          <div>
            <label className="text-xs text-gray-400 block mb-1.5">Style</label>
            <select
              value={contentStyle}
              onChange={(e) => setContentStyle(e.target.value)}
              className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500/50"
            >
              <option value="listicle">📝 Listicle</option>
              <option value="guide">📖 Guide</option>
              <option value="review">⭐ Review</option>
              <option value="news">📰 News</option>
              <option value="story">📚 Story</option>
            </select>
          </div>

          {/* Post Count */}
          <div>
            <label className="text-xs text-gray-400 block mb-1.5">Posts</label>
            <select
              value={postCount}
              onChange={(e) => setPostCount(Number(e.target.value))}
              className="w-full px-3 py-2 bg-black/30 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500/50"
            >
              <option value={1}>1 Post</option>
              <option value={3}>3 Posts</option>
              <option value={5}>5 Posts</option>
            </select>
          </div>

          {/* Generate Images Toggle */}
          <div>
            <label className="text-xs text-gray-400 block mb-1.5">Images</label>
            <button
              onClick={() => setGenerateImages(!generateImages)}
              className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                generateImages
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-white/5 text-gray-400 border border-white/10'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              {generateImages ? 'AI Images On' : 'AI Images Off'}
            </button>
          </div>
        </div>

        <div className="mt-4 p-3 bg-black/20 rounded-lg">
          <p className="text-gray-400 text-sm">
            <span className="text-yellow-400 font-medium">💡 Tip:</span> The more specific you are, the better the content.
            Include your opinions, specific places, prices, or personal experiences.
            {generateImages && ' AI will also generate a featured image for each post.'}
          </p>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full mt-4 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating {postCount} blog post{postCount > 1 ? 's' : ''}{generateImages ? ' with images' : ''}...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate {postCount} Blog Post{postCount > 1 ? 's' : ''}{generateImages ? ' with Images' : ''}
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
            placeholder="Search blog posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500/50"
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
                    ? 'bg-blue-500/20 text-blue-400'
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
          <div className="w-8 h-8 border-4 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-12 bg-[#0F0F1A]/50 border border-white/10 rounded-2xl">
          <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No Blog Posts Yet</h3>
          <p className="text-gray-400">Use the form above to generate your first AI-powered blog post</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#0F0F1A]/50 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all"
            >
              <div className="flex flex-col md:flex-row">
                {/* Featured Image */}
                {post.media_urls?.[0] && (
                  <div className="md:w-48 h-32 md:h-auto flex-shrink-0 relative">
                    <img
                      src={post.media_urls[0]}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-green-500/90 text-white text-xs rounded font-medium">
                      AI Generated
                    </div>
                  </div>
                )}

                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-white font-semibold text-lg line-clamp-1">{post.title}</h3>
                      <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                        {post.body?.slice(0, 200)}...
                      </p>
                    </div>
                    <StatusBadge status={post.status} />
                  </div>

                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-xs text-gray-500">
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                    {post.slug && (
                      <span className="text-xs text-blue-400 truncate">/blog/{post.slug}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    {post.status === 'pending_review' && (
                      <>
                        <button
                          onClick={() => handleApprove(post.id)}
                          className="px-3 py-1.5 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg text-sm font-medium transition-all"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(post.id)}
                          className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-medium transition-all"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <div className="flex-1" />
                    <button
                      onClick={() => {/* Preview */}}
                      className="p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-all"
                      title="Preview"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {/* Edit */}}
                      className="p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-all"
                      title="Edit"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-2 bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-lg transition-all"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {post.status === 'posted' && (
                      <a
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-all"
                        title="View Live"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
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
