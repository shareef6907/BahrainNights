'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Plus,
  Search,
  Filter,
  RefreshCw,
  Eye,
  Edit3,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import ContentCard from '@/components/studio/ContentCard';
import GenerateButton from '@/components/studio/GenerateButton';
import StatusBadge from '@/components/studio/StatusBadge';

interface BlogPost {
  id: string;
  title: string;
  body: string;
  slug: string;
  status: 'draft' | 'pending_review' | 'approved' | 'scheduled' | 'posted' | 'rejected';
  seo_title?: string;
  seo_description?: string;
  created_at: string;
  scheduled_for?: string;
}

export default function BlogPostsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

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
    const response = await fetch('/api/admin/studio/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'blog', count: 1 }),
    });

    if (response.ok) {
      await fetchPosts();
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

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
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
          <p className="text-gray-400 mt-1">AI-generated articles for the website</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchPosts}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 transition-all"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <GenerateButton
            type="blog"
            label="Generate Blog"
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
            placeholder="Search blog posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500/50"
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
                    ? 'bg-blue-500/20 text-blue-400'
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
          <div className="w-8 h-8 border-4 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-12 bg-[#0F0F1A]/50 border border-white/10 rounded-2xl">
          <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No Blog Posts Yet</h3>
          <p className="text-gray-400 mb-4">Generate your first AI-powered blog post</p>
          <GenerateButton
            type="blog"
            label="Generate First Post"
            onGenerate={handleGenerate}
          />
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#0F0F1A]/50 border border-white/10 rounded-2xl p-4 hover:border-white/20 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="text-white font-semibold text-lg truncate">{post.title}</h3>
                      <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                        {post.body?.slice(0, 200)}...
                      </p>
                    </div>
                    <StatusBadge status={post.status} />
                  </div>

                  <div className="flex items-center gap-4 mt-4">
                    <span className="text-xs text-gray-500">
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                    {post.slug && (
                      <span className="text-xs text-blue-400">/blog/{post.slug}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-4">
                    {post.status === 'pending_review' && (
                      <>
                        <button
                          onClick={() => {/* Approve */}}
                          className="px-3 py-1.5 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg text-sm font-medium transition-all"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => {/* Reject */}}
                          className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-medium transition-all"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => {/* Preview */}}
                      className="p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-all ml-auto"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {/* Edit */}}
                      className="p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-all"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-2 bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {post.status === 'posted' && (
                      <a
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-all"
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
