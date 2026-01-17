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
  }, [fetchArticles]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [countryFilter, statusFilter, searchQuery]);

  const handleDeleteSingle = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchArticles();
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
            Manage AI-generated blog posts ({total} total)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchArticles}
            disabled={isLoading}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
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
              : 'No blog articles have been generated yet'}
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
