'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
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
  AlertTriangle,
  Globe,
  MapPin,
  Clock,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Sparkles,
  Rocket,
  Key,
} from 'lucide-react';

interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  country: string;
  city: string | null;
  category: string | null;
  status: 'draft' | 'published' | 'archived';
  is_featured: boolean;
  view_count: number;
  read_time_minutes: number;
  featured_image: string | null;
  created_at: string;
  published_at: string;
}

interface ArticlesResponse {
  articles: BlogArticle[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  countryStats: Record<string, number>;
}

interface GeneratorStats {
  total_articles: number;
  remaining_events: number;
}

interface GeneratorResult {
  success?: boolean;
  message?: string;
  processed?: number;
  failed?: number;
  remaining?: number;
  articles?: Array<{ article_title: string; slug: string }>;
  error?: string;
}

const COUNTRIES = [
  { value: 'all', label: 'All Countries', flag: '🌍' },
  { value: 'bahrain', label: 'Bahrain', flag: '🇧🇭' },
  { value: 'uae', label: 'UAE', flag: '🇦🇪' },
  { value: 'saudi-arabia', label: 'Saudi Arabia', flag: '🇸🇦' },
  { value: 'qatar', label: 'Qatar', flag: '🇶🇦' },
  { value: 'uk', label: 'United Kingdom', flag: '🇬🇧' },
  { value: 'unknown', label: 'Unknown', flag: '❓' },
];

const STATUSES = [
  { value: 'all', label: 'All Status' },
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
  { value: 'archived', label: 'Archived' },
];

export default function BlogAdminPage() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [countryFilter, setCountryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [countryStats, setCountryStats] = useState<Record<string, number>>({});
  const [selectedArticles, setSelectedArticles] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<'bulk' | 'country' | 'all' | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  // Generator state
  const [generatorStats, setGeneratorStats] = useState<GeneratorStats>({ total_articles: 0, remaining_events: 0 });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatorProgress, setGeneratorProgress] = useState(0);
  const [generatorResult, setGeneratorResult] = useState<GeneratorResult | null>(null);
  const [secretInput, setSecretInput] = useState('');
  const [hasSecret, setHasSecret] = useState(false);
  const [showSecretInput, setShowSecretInput] = useState(false);

  // Check for saved secret on mount
  useEffect(() => {
    const saved = localStorage.getItem('blog_generation_secret');
    if (saved) {
      setHasSecret(true);
    }
  }, []);

  const getSecret = (): string => {
    // Try URL param first, then localStorage
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const urlSecret = urlParams.get('secret');
      if (urlSecret) {
        localStorage.setItem('blog_generation_secret', urlSecret);
        setHasSecret(true);
        return urlSecret;
      }
      return localStorage.getItem('blog_generation_secret') || '';
    }
    return '';
  };

  const saveSecret = () => {
    if (secretInput.trim()) {
      localStorage.setItem('blog_generation_secret', secretInput.trim());
      setHasSecret(true);
      setShowSecretInput(false);
      setSecretInput('');
    }
  };

  const clearSecret = () => {
    localStorage.removeItem('blog_generation_secret');
    setHasSecret(false);
  };

  const fetchGeneratorStats = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/blog/stats');
      if (response.ok) {
        const data = await response.json();
        setGeneratorStats(data);
      }
    } catch (error) {
      console.error('Error fetching generator stats:', error);
    }
  }, []);

  const fetchArticles = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
      });

      if (countryFilter !== 'all') {
        params.set('country', countryFilter);
      }
      if (statusFilter !== 'all') {
        params.set('status', statusFilter);
      }
      if (searchQuery) {
        params.set('search', searchQuery);
      }

      const response = await fetch(`/api/admin/blog?${params}`);
      if (response.ok) {
        const data: ArticlesResponse = await response.json();
        setArticles(data.articles);
        setTotal(data.total);
        setTotalPages(data.totalPages);
        setCountryStats(data.countryStats || {});
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setIsLoading(false);
    }
  }, [page, countryFilter, statusFilter, searchQuery]);

  useEffect(() => {
    fetchArticles();
    fetchGeneratorStats();
  }, [fetchArticles, fetchGeneratorStats]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [countryFilter, statusFilter, searchQuery]);

  const generateBlogs = async (count: number) => {
    const secret = getSecret();
    if (!secret) {
      setShowSecretInput(true);
      return;
    }

    if (isGenerating) return;

    setIsGenerating(true);
    setGeneratorProgress(0);
    setGeneratorResult(null);

    // Simulate progress
    const estimatedSeconds = count * 2;
    let progress = 0;
    const interval = setInterval(() => {
      progress += (100 / estimatedSeconds) * 0.5;
      if (progress > 95) progress = 95;
      setGeneratorProgress(progress);
    }, 500);

    try {
      const response = await fetch(`/api/blog/generate?secret=${secret}&limit=${count}`, {
        method: 'POST',
      });
      const result = await response.json();

      clearInterval(interval);
      setGeneratorProgress(100);
      setGeneratorResult(result);

      // Refresh data
      await fetchArticles();
      await fetchGeneratorStats();

    } catch (error) {
      clearInterval(interval);
      setGeneratorResult({ error: String(error) });
    }

    setIsGenerating(false);
  };

  const handleDeleteSingle = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchArticles();
        await fetchGeneratorStats();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to delete article');
      }
    } catch (error) {
      console.error('Error deleting article:', error);
      alert('Failed to delete article');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedArticles.length === 0) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/blog?ids=${selectedArticles.join(',')}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSelectedArticles([]);
        await fetchArticles();
        await fetchGeneratorStats();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to delete articles');
      }
    } catch (error) {
      console.error('Error deleting articles:', error);
      alert('Failed to delete articles');
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(null);
    }
  };

  const handleDeleteByCountry = async (country: string) => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/blog?country=${country}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Deleted ${data.deletedCount} articles from ${country}`);
        await fetchArticles();
        await fetchGeneratorStats();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to delete articles');
      }
    } catch (error) {
      console.error('Error deleting articles:', error);
      alert('Failed to delete articles');
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(null);
      setDeleteTarget(null);
    }
  };

  const handleDeleteAll = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch('/api/admin/blog?all=true', {
        method: 'DELETE',
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Deleted ${data.deletedCount} articles`);
        setSelectedArticles([]);
        await fetchArticles();
        await fetchGeneratorStats();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to delete articles');
      }
    } catch (error) {
      console.error('Error deleting articles:', error);
      alert('Failed to delete articles');
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(null);
    }
  };

  const toggleSelectAll = () => {
    if (selectedArticles.length === articles.length) {
      setSelectedArticles([]);
    } else {
      setSelectedArticles(articles.map(a => a.id));
    }
  };

  const toggleSelectArticle = (id: string) => {
    if (selectedArticles.includes(id)) {
      setSelectedArticles(selectedArticles.filter(a => a !== id));
    } else {
      setSelectedArticles([...selectedArticles, id]);
    }
  };

  const getCountryFlag = (country: string) => {
    const found = COUNTRIES.find(c => c.value === country);
    return found?.flag || '❓';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-purple-400" />
            Blog Articles
          </h1>
          <p className="text-gray-400 mt-1">
            {total} articles total • {generatorStats.remaining_events} events to blog
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { fetchArticles(); fetchGeneratorStats(); }}
            disabled={isLoading}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* AI Blog Generator Section */}
      <div className="bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-pink-500/10 border border-amber-500/20 rounded-2xl p-5 md:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                AI Blog Generator
                {hasSecret ? (
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Ready</span>
                ) : (
                  <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full">Needs Setup</span>
                )}
              </h2>
              <p className="text-gray-400 text-sm mt-0.5">
                {generatorStats.remaining_events > 0
                  ? `Generate blog posts for ${generatorStats.remaining_events} Platinumlist events`
                  : 'All events have been blogged!'}
              </p>
            </div>
          </div>

          {/* Secret Management */}
          <div className="flex items-center gap-2">
            {hasSecret ? (
              <button
                onClick={clearSecret}
                className="text-xs text-gray-500 hover:text-gray-400 flex items-center gap-1"
              >
                <Key className="w-3 h-3" />
                Clear Secret
              </button>
            ) : (
              <button
                onClick={() => setShowSecretInput(true)}
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                <Key className="w-3 h-3" />
                Set API Secret
              </button>
            )}
          </div>
        </div>

        {/* Secret Input */}
        {showSecretInput && (
          <div className="mt-4 p-4 bg-black/20 rounded-xl border border-white/10">
            <p className="text-sm text-gray-400 mb-3">Enter your blog generation secret key:</p>
            <div className="flex gap-2">
              <input
                type="password"
                value={secretInput}
                onChange={(e) => setSecretInput(e.target.value)}
                placeholder="Enter BLOG_GENERATION_SECRET"
                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-amber-500/50"
              />
              <button
                onClick={saveSecret}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black rounded-lg font-medium text-sm transition-all"
              >
                Save
              </button>
              <button
                onClick={() => { setShowSecretInput(false); setSecretInput(''); }}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-400 rounded-lg text-sm transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Generate Buttons */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => generateBlogs(10)}
            disabled={isGenerating || generatorStats.remaining_events === 0}
            className="px-4 py-2.5 bg-white/5 hover:bg-amber-500/20 border border-white/10 hover:border-amber-500/30 text-white rounded-xl font-medium text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isGenerating ? '...' : 'Generate 10'}
          </button>
          <button
            onClick={() => generateBlogs(25)}
            disabled={isGenerating || generatorStats.remaining_events === 0}
            className="px-4 py-2.5 bg-white/5 hover:bg-amber-500/20 border border-white/10 hover:border-amber-500/30 text-white rounded-xl font-medium text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isGenerating ? '...' : 'Generate 25'}
          </button>
          <button
            onClick={() => generateBlogs(50)}
            disabled={isGenerating || generatorStats.remaining_events === 0}
            className="px-4 py-2.5 bg-white/5 hover:bg-amber-500/20 border border-white/10 hover:border-amber-500/30 text-white rounded-xl font-medium text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isGenerating ? '...' : 'Generate 50'}
          </button>
          <button
            onClick={() => generateBlogs(100)}
            disabled={isGenerating || generatorStats.remaining_events === 0}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-400 hover:to-pink-400 text-black rounded-xl font-bold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Rocket className="w-4 h-4" />
            {isGenerating ? '...' : 'Generate 100'}
          </button>
        </div>

        {/* Progress Bar */}
        {isGenerating && (
          <div className="mt-4">
            <div className="bg-black/30 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-pink-500 h-full transition-all duration-300"
                style={{ width: `${generatorProgress}%` }}
              />
            </div>
            <p className="text-sm text-gray-400 mt-2 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              Generating articles... {Math.round(generatorProgress)}%
            </p>
          </div>
        )}

        {/* Result */}
        {generatorResult && !isGenerating && (
          <div className={`mt-4 p-4 rounded-xl text-sm ${
            generatorResult.error
              ? 'bg-red-500/10 border border-red-500/20'
              : 'bg-green-500/10 border border-green-500/20'
          }`}>
            {generatorResult.error ? (
              <span className="text-red-400 flex items-center gap-2">
                <X className="w-4 h-4" />
                Error: {generatorResult.error}
              </span>
            ) : (
              <div>
                <span className="text-green-400 flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Generated {generatorResult.processed} articles
                  {generatorResult.failed ? ` (${generatorResult.failed} failed)` : ''}
                  {' • '}{generatorResult.remaining} events remaining
                </span>
                {generatorResult.articles && generatorResult.articles.length > 0 && (
                  <div className="mt-3 space-y-1">
                    {generatorResult.articles.slice(0, 5).map((article, i) => (
                      <a
                        key={i}
                        href={`/blog/${article.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-amber-400 hover:text-amber-300 text-xs truncate"
                      >
                        → {article.article_title}
                      </a>
                    ))}
                    {generatorResult.articles.length > 5 && (
                      <p className="text-gray-500 text-xs">+ {generatorResult.articles.length - 5} more</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {COUNTRIES.slice(1).map((country) => (
          <button
            key={country.value}
            onClick={() => setCountryFilter(country.value)}
            className={`p-4 rounded-xl border transition-all ${
              countryFilter === country.value
                ? 'bg-purple-500/20 border-purple-500/50'
                : 'bg-white/5 border-white/10 hover:border-white/20'
            }`}
          >
            <span className="text-2xl">{country.flag}</span>
            <p className="text-white font-semibold mt-1">
              {countryStats[country.value] || 0}
            </p>
            <p className="text-xs text-gray-400">{country.label}</p>
          </button>
        ))}
      </div>

      {/* Bulk Actions */}
      {selectedArticles.length > 0 && (
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 flex items-center justify-between">
          <p className="text-purple-400">
            {selectedArticles.length} article{selectedArticles.length > 1 ? 's' : ''} selected
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedArticles([])}
              className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-400 rounded-lg text-sm transition-all"
            >
              Clear Selection
            </button>
            <button
              onClick={() => setShowDeleteConfirm('bulk')}
              disabled={isDeleting}
              className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-medium transition-all disabled:opacity-50"
            >
              Delete Selected
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
          />
        </div>

        {/* Country Filter */}
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-gray-400" />
          <select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
          >
            {COUNTRIES.map((country) => (
              <option key={country.value} value={country.value}>
                {country.flag} {country.label}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
          >
            {STATUSES.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
        <h3 className="text-red-400 font-semibold flex items-center gap-2 mb-3">
          <AlertTriangle className="w-5 h-5" />
          Danger Zone
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setShowDeleteConfirm('all')}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-medium transition-all disabled:opacity-50"
          >
            Delete All Articles
          </button>
          {COUNTRIES.slice(1, -1).map((country) => (
            <button
              key={country.value}
              onClick={() => {
                setDeleteTarget(country.value);
                setShowDeleteConfirm('country');
              }}
              disabled={isDeleting || !countryStats[country.value]}
              className="px-3 py-2 bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-lg text-sm transition-all disabled:opacity-50"
            >
              {country.flag} Delete {country.label} ({countryStats[country.value] || 0})
            </button>
          ))}
        </div>
      </div>

      {/* Articles List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" />
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-12 bg-[#0F0F1A]/50 border border-white/10 rounded-2xl">
          <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No Articles Found</h3>
          <p className="text-gray-400">
            {searchQuery || countryFilter !== 'all' || statusFilter !== 'all'
              ? 'Try adjusting your filters'
              : 'Click "Generate" above to create blog posts from events'}
          </p>
        </div>
      ) : (
        <>
          {/* Select All Header */}
          <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl">
            <button
              onClick={toggleSelectAll}
              className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                selectedArticles.length === articles.length
                  ? 'bg-purple-500 border-purple-500'
                  : 'border-white/30 hover:border-white/50'
              }`}
            >
              {selectedArticles.length === articles.length && (
                <Check className="w-3 h-3 text-white" />
              )}
            </button>
            <span className="text-sm text-gray-400">
              Select all on this page ({articles.length})
            </span>
          </div>

          {/* Articles */}
          <div className="space-y-3">
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className={`bg-[#0F0F1A]/50 border rounded-xl overflow-hidden transition-all ${
                  selectedArticles.includes(article.id)
                    ? 'border-purple-500/50'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Checkbox + Image */}
                  <div className="flex items-start gap-3 p-4 md:w-64 flex-shrink-0">
                    <button
                      onClick={() => toggleSelectArticle(article.id)}
                      className={`w-5 h-5 rounded border flex items-center justify-center transition-all flex-shrink-0 mt-1 ${
                        selectedArticles.includes(article.id)
                          ? 'bg-purple-500 border-purple-500'
                          : 'border-white/30 hover:border-white/50'
                      }`}
                    >
                      {selectedArticles.includes(article.id) && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </button>
                    {article.featured_image ? (
                      <img
                        src={article.featured_image}
                        alt={article.title}
                        className="w-full h-24 md:h-20 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-24 md:h-20 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg flex items-center justify-center">
                        <FileText className="w-8 h-8 text-gray-600" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4 pt-0 md:pt-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-white font-semibold line-clamp-1">{article.title}</h3>
                        {article.excerpt && (
                          <p className="text-gray-400 text-sm mt-1 line-clamp-2">{article.excerpt}</p>
                        )}
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        article.status === 'published'
                          ? 'bg-green-500/20 text-green-400'
                          : article.status === 'draft'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {article.status}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-3 flex-wrap">
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        {getCountryFlag(article.country)}
                        <span className="capitalize">{article.country.replace('-', ' ')}</span>
                      </span>
                      {article.city && (
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {article.city}
                        </span>
                      )}
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.read_time_minutes} min
                      </span>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {article.view_count} views
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(article.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                      <Link
                        href={`/admin/blog/${article.id}`}
                        className="p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-all"
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>
                      <a
                        href={`/blog/${article.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-all"
                        title="View Live"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => handleDeleteSingle(article.id)}
                        disabled={isDeleting}
                        className="p-2 bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-lg transition-all disabled:opacity-50"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-gray-400">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1A1A2E] border border-white/10 rounded-2xl p-6 max-w-md w-full"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Confirm Delete</h3>
                <p className="text-sm text-gray-400">This action cannot be undone</p>
              </div>
            </div>

            <p className="text-gray-300 mb-6">
              {showDeleteConfirm === 'bulk'
                ? `Are you sure you want to delete ${selectedArticles.length} selected article${selectedArticles.length > 1 ? 's' : ''}?`
                : showDeleteConfirm === 'country'
                ? `Are you sure you want to delete all articles from ${deleteTarget?.replace('-', ' ')}?`
                : 'Are you sure you want to delete ALL blog articles? This will remove all AI-generated content.'}
            </p>

            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() => {
                  setShowDeleteConfirm(null);
                  setDeleteTarget(null);
                }}
                disabled={isDeleting}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-400 rounded-lg transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (showDeleteConfirm === 'bulk') {
                    handleBulkDelete();
                  } else if (showDeleteConfirm === 'country' && deleteTarget) {
                    handleDeleteByCountry(deleteTarget);
                  } else if (showDeleteConfirm === 'all') {
                    handleDeleteAll();
                  }
                }}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
