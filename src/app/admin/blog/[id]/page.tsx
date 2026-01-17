'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Save,
  Trash2,
  ExternalLink,
  Eye,
  AlertTriangle,
  RefreshCw,
  Globe,
  MapPin,
  Tag,
  FileText,
  Image as ImageIcon,
} from 'lucide-react';

interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  meta_title: string | null;
  meta_description: string | null;
  keywords: string[] | null;
  country: string;
  city: string | null;
  category: string | null;
  tags: string[] | null;
  featured_image: string | null;
  status: 'draft' | 'published' | 'archived';
  is_featured: boolean;
  view_count: number;
  read_time_minutes: number;
  created_at: string;
  updated_at: string;
  published_at: string;
  event_id: string | null;
  venue_id: string | null;
}

interface LinkedEvent {
  id: string;
  title: string;
  slug: string;
  start_date: string;
  venue_name: string | null;
}

interface LinkedVenue {
  id: string;
  name: string;
  slug: string;
}

const COUNTRIES = [
  { value: 'bahrain', label: 'Bahrain' },
  { value: 'uae', label: 'UAE' },
  { value: 'saudi-arabia', label: 'Saudi Arabia' },
  { value: 'qatar', label: 'Qatar' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'unknown', label: 'Unknown' },
];

const STATUSES = [
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
  { value: 'archived', label: 'Archived' },
];

export default function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [linkedEvent, setLinkedEvent] = useState<LinkedEvent | null>(null);
  const [linkedVenue, setLinkedVenue] = useState<LinkedVenue | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    meta_title: '',
    meta_description: '',
    keywords: '',
    country: 'unknown',
    city: '',
    category: '',
    tags: '',
    featured_image: '',
    status: 'published' as 'draft' | 'published' | 'archived',
    is_featured: false,
  });

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/admin/blog/${id}`);
        if (response.ok) {
          const data = await response.json();
          setArticle(data.article);
          setLinkedEvent(data.linkedEvent);
          setLinkedVenue(data.linkedVenue);

          // Populate form
          setFormData({
            title: data.article.title || '',
            slug: data.article.slug || '',
            excerpt: data.article.excerpt || '',
            content: data.article.content || '',
            meta_title: data.article.meta_title || '',
            meta_description: data.article.meta_description || '',
            keywords: data.article.keywords?.join(', ') || '',
            country: data.article.country || 'unknown',
            city: data.article.city || '',
            category: data.article.category || '',
            tags: data.article.tags?.join(', ') || '',
            featured_image: data.article.featured_image || '',
            status: data.article.status || 'published',
            is_featured: data.article.is_featured || false,
          });
        } else {
          alert('Article not found');
          router.push('/admin/blog');
        }
      } catch (error) {
        console.error('Error fetching article:', error);
        alert('Failed to load article');
        router.push('/admin/blog');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id, router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.slug) {
      alert('Title and slug are required');
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          keywords: formData.keywords
            ? formData.keywords.split(',').map(k => k.trim()).filter(Boolean)
            : null,
          tags: formData.tags
            ? formData.tags.split(',').map(t => t.trim()).filter(Boolean)
            : null,
        }),
      });

      if (response.ok) {
        setHasChanges(false);
        alert('Article saved successfully');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to save article');
      }
    } catch (error) {
      console.error('Error saving article:', error);
      alert('Failed to save article');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/admin/blog');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to delete article');
      }
    } catch (error) {
      console.error('Error deleting article:', error);
      alert('Failed to delete article');
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" />
          <p className="text-gray-400">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Article not found</p>
        <Link href="/admin/blog" className="text-purple-400 hover:text-purple-300 mt-4 inline-block">
          &larr; Back to Blog Admin
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blog"
            className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white">Edit Article</h1>
            <p className="text-sm text-gray-400">ID: {article.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={`/blog/${article.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            View Live
          </a>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-xl text-red-400 transition-all flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving || !hasChanges}
            className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-xl text-white font-medium transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Linked Content Info */}
      {(linkedEvent || linkedVenue) && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
          <h3 className="text-blue-400 font-semibold mb-2">Linked Content</h3>
          <div className="flex flex-wrap gap-4">
            {linkedEvent && (
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span className="text-blue-400">Event:</span>
                <a
                  href={`/events/${linkedEvent.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white underline"
                >
                  {linkedEvent.title}
                </a>
                <span className="text-gray-500">({new Date(linkedEvent.start_date).toLocaleDateString()})</span>
              </div>
            )}
            {linkedVenue && (
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span className="text-blue-400">Venue:</span>
                <a
                  href={`/places/${linkedVenue.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white underline"
                >
                  {linkedVenue.name}
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Views</p>
          <p className="text-2xl font-bold text-white">{article.view_count}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Read Time</p>
          <p className="text-2xl font-bold text-white">{article.read_time_minutes} min</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Created</p>
          <p className="text-lg font-semibold text-white">
            {new Date(article.created_at).toLocaleDateString()}
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Published</p>
          <p className="text-lg font-semibold text-white">
            {new Date(article.published_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title & Slug */}
          <div className="bg-[#0F0F1A]/50 border border-white/10 rounded-xl p-6 space-y-4">
            <div>
              <label className="text-sm text-gray-400 block mb-2">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-2">Slug *</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-2">Excerpt</label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white resize-none focus:outline-none focus:border-purple-500/50"
              />
            </div>
          </div>

          {/* Content */}
          <div className="bg-[#0F0F1A]/50 border border-white/10 rounded-xl p-6">
            <label className="text-sm text-gray-400 block mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Content (HTML)
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows={20}
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white font-mono text-sm resize-none focus:outline-none focus:border-purple-500/50"
            />
          </div>

          {/* SEO */}
          <div className="bg-[#0F0F1A]/50 border border-white/10 rounded-xl p-6 space-y-4">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <Globe className="w-4 h-4 text-purple-400" />
              SEO Settings
            </h3>
            <div>
              <label className="text-sm text-gray-400 block mb-2">Meta Title</label>
              <input
                type="text"
                name="meta_title"
                value={formData.meta_title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-2">Meta Description</label>
              <textarea
                name="meta_description"
                value={formData.meta_description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white resize-none focus:outline-none focus:border-purple-500/50"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-2">Keywords (comma-separated)</label>
              <input
                type="text"
                name="keywords"
                value={formData.keywords}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
                placeholder="keyword1, keyword2, keyword3"
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Featured Image */}
          <div className="bg-[#0F0F1A]/50 border border-white/10 rounded-xl p-6">
            <label className="text-sm text-gray-400 block mb-2 flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              Featured Image URL
            </label>
            <input
              type="text"
              name="featured_image"
              value={formData.featured_image}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50 mb-3"
            />
            {formData.featured_image && (
              <img
                src={formData.featured_image}
                alt="Featured"
                className="w-full h-40 object-cover rounded-lg"
              />
            )}
          </div>

          {/* Location */}
          <div className="bg-[#0F0F1A]/50 border border-white/10 rounded-xl p-6 space-y-4">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <MapPin className="w-4 h-4 text-purple-400" />
              Location
            </h3>
            <div>
              <label className="text-sm text-gray-400 block mb-2">Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
              >
                {COUNTRIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-2">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
              />
            </div>
          </div>

          {/* Category & Tags */}
          <div className="bg-[#0F0F1A]/50 border border-white/10 rounded-xl p-6 space-y-4">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <Tag className="w-4 h-4 text-purple-400" />
              Category & Tags
            </h3>
            <div>
              <label className="text-sm text-gray-400 block mb-2">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-2">Tags (comma-separated)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
                placeholder="tag1, tag2, tag3"
              />
            </div>
          </div>

          {/* Status */}
          <div className="bg-[#0F0F1A]/50 border border-white/10 rounded-xl p-6 space-y-4">
            <div>
              <label className="text-sm text-gray-400 block mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
              >
                {STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="is_featured"
                checked={formData.is_featured}
                onChange={handleInputChange}
                className="w-5 h-5 rounded border-white/20 bg-black/30 text-purple-500 focus:ring-purple-500"
              />
              <span className="text-white">Featured Article</span>
            </label>
          </div>
        </div>
      </div>

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
                <h3 className="text-lg font-semibold text-white">Delete Article?</h3>
                <p className="text-sm text-gray-400">This action cannot be undone</p>
              </div>
            </div>

            <p className="text-gray-300 mb-6">
              Are you sure you want to delete &quot;{article.title}&quot;?
            </p>

            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-400 rounded-lg transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Delete Article'
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
