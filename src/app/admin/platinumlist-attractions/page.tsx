'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  Search,
  RefreshCw,
  Eye,
  EyeOff,
  Trash2,
  Edit2,
  Sparkles,
  CheckSquare,
  Square,
  X,
  Upload,
  Link as LinkIcon,
  Save,
  Loader2,
  ImageIcon,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface Attraction {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  price_from: number | null;
  currency: string | null;
  image_url: string | null;
  area: string | null;
  address: string | null;
  category: string | null;
  booking_url: string | null;
  is_active: boolean;
  is_featured: boolean;
  source: string | null;
  source_id: string | null;
  created_at: string;
  updated_at: string;
}

// Toast notification
function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className={`fixed bottom-4 right-4 z-[100] px-6 py-3 rounded-xl shadow-lg ${
        type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      }`}
    >
      <div className="flex items-center gap-2">
        {type === 'success' ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
        <span className="font-medium">{message}</span>
      </div>
    </motion.div>
  );
}

export default function PlatinumlistAttractionsAdmin() {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [filteredAttractions, setFilteredAttractions] = useState<Attraction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkActionLoading, setBulkActionLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Edit modal state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingAttraction, setEditingAttraction] = useState<Attraction | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    price_from: '',
    area: '',
    address: '',
    category: '',
    image_url: '',
    booking_url: ''
  });
  const [saving, setSaving] = useState(false);
  const [rewriting, setRewriting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState('');

  // Toast helper
  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  // Fetch attractions
  const fetchAttractions = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/attractions?status=all');
      const data = await response.json();
      if (data.attractions) {
        // Filter to only show platinumlist attractions
        const platinumlistAttractions = data.attractions.filter(
          (a: Attraction) => a.source === 'platinumlist'
        );
        setAttractions(platinumlistAttractions);
        setFilteredAttractions(platinumlistAttractions);
      }
    } catch (error) {
      console.error('Error fetching attractions:', error);
      showToast('Failed to load attractions', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttractions();
  }, []);

  // Filter attractions
  useEffect(() => {
    let filtered = [...attractions];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(attr =>
        attr.name.toLowerCase().includes(term) ||
        attr.area?.toLowerCase().includes(term) ||
        attr.description?.toLowerCase().includes(term)
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(attr => attr.category === categoryFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(attr =>
        statusFilter === 'active' ? attr.is_active : !attr.is_active
      );
    }

    setFilteredAttractions(filtered);
  }, [attractions, searchTerm, categoryFilter, statusFilter]);

  // Get unique categories
  const categories = [...new Set(attractions.map(attr => attr.category).filter((c): c is string => c !== null))];

  // Selection handlers
  const toggleSelectAll = () => {
    if (selectedIds.size === filteredAttractions.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredAttractions.map(attr => attr.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  // Single item actions
  const handleToggleVisibility = async (id: string, currentlyActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/attractions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggleActive' })
      });

      if (response.ok) {
        setAttractions(prev => prev.map(attr =>
          attr.id === id ? { ...attr, is_active: !currentlyActive } : attr
        ));
        showToast(currentlyActive ? 'Attraction hidden' : 'Attraction visible', 'success');
      } else {
        showToast('Failed to update visibility', 'error');
      }
    } catch (error) {
      console.error('Error toggling visibility:', error);
      showToast('Failed to update visibility', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this attraction?')) return;

    try {
      const response = await fetch(`/api/admin/attractions/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setAttractions(prev => prev.filter(attr => attr.id !== id));
        showToast('Attraction deleted', 'success');
      } else {
        showToast('Failed to delete', 'error');
      }
    } catch (error) {
      console.error('Error deleting:', error);
      showToast('Failed to delete', 'error');
    }
  };

  // Bulk actions
  const handleBulkAction = async (action: 'hide' | 'show' | 'delete' | 'rewrite') => {
    if (selectedIds.size === 0) {
      showToast('No items selected', 'error');
      return;
    }

    if (action === 'delete' && !confirm(`Delete ${selectedIds.size} attractions?`)) {
      return;
    }

    setBulkActionLoading(true);
    showToast(`Processing ${selectedIds.size} items...`, 'success');

    try {
      const response = await fetch('/api/admin/attractions/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          ids: Array.from(selectedIds)
        })
      });

      const data = await response.json();

      if (response.ok) {
        if (action === 'delete') {
          setAttractions(prev => prev.filter(attr => !selectedIds.has(attr.id)));
        } else if (action === 'hide') {
          setAttractions(prev => prev.map(attr =>
            selectedIds.has(attr.id) ? { ...attr, is_active: false } : attr
          ));
        } else if (action === 'show') {
          setAttractions(prev => prev.map(attr =>
            selectedIds.has(attr.id) ? { ...attr, is_active: true } : attr
          ));
        } else if (action === 'rewrite') {
          // Refresh to get updated descriptions
          await fetchAttractions();
        }

        setSelectedIds(new Set());
        showToast(`${data.affected || selectedIds.size} items processed`, 'success');
      } else {
        showToast(data.error || 'Bulk action failed', 'error');
      }
    } catch (error) {
      console.error('Bulk action error:', error);
      showToast('Bulk action failed', 'error');
    } finally {
      setBulkActionLoading(false);
    }
  };

  // Edit modal handlers
  const openEditModal = (attraction: Attraction) => {
    setEditingAttraction(attraction);
    setEditForm({
      name: attraction.name || '',
      description: attraction.description || '',
      price_from: attraction.price_from?.toString() || '',
      area: attraction.area || '',
      address: attraction.address || '',
      category: attraction.category || '',
      image_url: attraction.image_url || '',
      booking_url: attraction.booking_url || ''
    });
    setImageUrlInput('');
    setEditModalOpen(true);
  };

  const handleSave = async () => {
    if (!editingAttraction) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/admin/attractions/${editingAttraction.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editForm.name,
          description: editForm.description,
          priceFrom: editForm.price_from ? parseFloat(editForm.price_from) : null,
          area: editForm.area,
          category: editForm.category,
          imageUrl: editForm.image_url
        })
      });

      if (response.ok) {
        const data = await response.json();
        setAttractions(prev => prev.map(attr =>
          attr.id === editingAttraction.id ? data.attraction : attr
        ));
        showToast('Attraction updated', 'success');
        setEditModalOpen(false);
      } else {
        const data = await response.json();
        showToast(data.error || 'Failed to save', 'error');
      }
    } catch (error) {
      console.error('Save error:', error);
      showToast('Failed to save', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleRewriteWithAI = async () => {
    if (!editingAttraction) return;

    setRewriting(true);
    try {
      const response = await fetch(`/api/admin/attractions/${editingAttraction.id}/rewrite`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });

      const data = await response.json();

      if (data.success && data.description) {
        setEditForm(prev => ({ ...prev, description: data.description }));
        showToast('Description rewritten with AI', 'success');
      } else {
        showToast(data.error || 'AI rewriting failed', 'error');
      }
    } catch (error) {
      console.error('Rewrite error:', error);
      showToast('AI rewriting failed', 'error');
    } finally {
      setRewriting(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingAttraction) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`/api/admin/attractions/${editingAttraction.id}/upload-image`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success && data.imageUrl) {
        setEditForm(prev => ({ ...prev, image_url: data.imageUrl }));
        showToast('Image uploaded', 'success');
      } else {
        showToast(data.error || 'Upload failed', 'error');
      }
    } catch (error) {
      console.error('Upload error:', error);
      showToast('Upload failed', 'error');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFetchFromUrl = async () => {
    if (!imageUrlInput || !editingAttraction) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('imageUrl', imageUrlInput);

    try {
      const response = await fetch(`/api/admin/attractions/${editingAttraction.id}/upload-image`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success && data.imageUrl) {
        setEditForm(prev => ({ ...prev, image_url: data.imageUrl }));
        setImageUrlInput('');
        showToast('Image fetched and uploaded', 'success');
      } else {
        showToast(data.error || 'Failed to fetch image', 'error');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      showToast('Failed to fetch image', 'error');
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Platinumlist Attractions</h1>
        <p className="text-gray-400">
          Manage attractions from Platinumlist. Edit descriptions, upload images, and control visibility.
        </p>
      </div>

      {/* Filters & Actions Bar */}
      <div className="bg-[#0F0F1A] rounded-xl p-4 mb-6 border border-white/10">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search attractions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800/50 rounded-lg border border-white/10 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 bg-gray-800/50 rounded-lg border border-white/10 focus:border-cyan-500 focus:outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-gray-800/50 rounded-lg border border-white/10 focus:border-cyan-500 focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="hidden">Hidden</option>
          </select>

          {/* Refresh */}
          <button
            onClick={fetchAttractions}
            disabled={loading}
            className="px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg flex items-center gap-2 transition border border-white/10"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Bulk Actions */}
        {selectedIds.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-3 items-center"
          >
            <span className="text-cyan-400 font-medium">
              {selectedIds.size} selected
            </span>
            <button
              onClick={() => handleBulkAction('hide')}
              disabled={bulkActionLoading}
              className="px-3 py-1.5 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg flex items-center gap-2 text-sm transition"
            >
              <EyeOff className="w-4 h-4" />
              Hide Selected
            </button>
            <button
              onClick={() => handleBulkAction('show')}
              disabled={bulkActionLoading}
              className="px-3 py-1.5 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg flex items-center gap-2 text-sm transition"
            >
              <Eye className="w-4 h-4" />
              Show Selected
            </button>
            <button
              onClick={() => handleBulkAction('rewrite')}
              disabled={bulkActionLoading}
              className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 rounded-lg flex items-center gap-2 text-sm transition"
            >
              <Sparkles className="w-4 h-4" />
              Rewrite with AI
            </button>
            <button
              onClick={() => handleBulkAction('delete')}
              disabled={bulkActionLoading}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-500 rounded-lg flex items-center gap-2 text-sm transition"
            >
              <Trash2 className="w-4 h-4" />
              Delete Selected
            </button>
            <button
              onClick={() => setSelectedIds(new Set())}
              className="px-3 py-1.5 text-gray-400 hover:text-white text-sm"
            >
              Clear Selection
            </button>
          </motion.div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#0F0F1A] rounded-xl p-4 border border-white/10">
          <div className="text-2xl font-bold text-cyan-400">{attractions.length}</div>
          <div className="text-gray-400 text-sm">Total Attractions</div>
        </div>
        <div className="bg-[#0F0F1A] rounded-xl p-4 border border-white/10">
          <div className="text-2xl font-bold text-green-400">
            {attractions.filter(a => a.is_active).length}
          </div>
          <div className="text-gray-400 text-sm">Active</div>
        </div>
        <div className="bg-[#0F0F1A] rounded-xl p-4 border border-white/10">
          <div className="text-2xl font-bold text-gray-400">
            {attractions.filter(a => !a.is_active).length}
          </div>
          <div className="text-gray-400 text-sm">Hidden</div>
        </div>
        <div className="bg-[#0F0F1A] rounded-xl p-4 border border-white/10">
          <div className="text-2xl font-bold text-blue-400">{categories.length}</div>
          <div className="text-gray-400 text-sm">Categories</div>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
        </div>
      ) : filteredAttractions.length === 0 ? (
        <div className="bg-[#0F0F1A] rounded-xl p-12 text-center border border-white/10">
          <AlertCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400">No attractions found</p>
        </div>
      ) : (
        <div className="bg-[#0F0F1A] rounded-xl overflow-hidden border border-white/10">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800/50">
                <th className="p-4 text-left">
                  <button onClick={toggleSelectAll} className="text-gray-400 hover:text-white">
                    {selectedIds.size === filteredAttractions.length ? (
                      <CheckSquare className="w-5 h-5" />
                    ) : (
                      <Square className="w-5 h-5" />
                    )}
                  </button>
                </th>
                <th className="p-4 text-left text-gray-400 font-medium">Image</th>
                <th className="p-4 text-left text-gray-400 font-medium">Title</th>
                <th className="p-4 text-left text-gray-400 font-medium">Category</th>
                <th className="p-4 text-left text-gray-400 font-medium">Price</th>
                <th className="p-4 text-left text-gray-400 font-medium">Status</th>
                <th className="p-4 text-left text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttractions.map((attr) => (
                <tr
                  key={attr.id}
                  className={`border-t border-white/10 hover:bg-gray-800/30 transition ${
                    !attr.is_active ? 'opacity-50' : ''
                  }`}
                >
                  <td className="p-4">
                    <button
                      onClick={() => toggleSelect(attr.id)}
                      className="text-gray-400 hover:text-white"
                    >
                      {selectedIds.has(attr.id) ? (
                        <CheckSquare className="w-5 h-5 text-cyan-400" />
                      ) : (
                        <Square className="w-5 h-5" />
                      )}
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-800 relative">
                      {attr.image_url ? (
                        <Image
                          src={attr.image_url}
                          alt={attr.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-gray-500" />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-white line-clamp-1">{attr.name}</div>
                    <div className="text-sm text-gray-400 line-clamp-1">{attr.area}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-gray-800 rounded-md text-xs">
                      {attr.category || 'Uncategorized'}
                    </span>
                  </td>
                  <td className="p-4">
                    {attr.price_from ? (
                      <span className="text-green-400">
                        {attr.currency || 'BHD'} {attr.price_from}
                      </span>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </td>
                  <td className="p-4">
                    {attr.is_active ? (
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-md text-xs">
                        Active
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded-md text-xs">
                        Hidden
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(attr)}
                        className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleToggleVisibility(attr.id, attr.is_active)}
                        className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition"
                        title={attr.is_active ? 'Hide' : 'Show'}
                      >
                        {attr.is_active ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(attr.id)}
                        className="p-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg transition"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      <AnimatePresence>
        {editModalOpen && editingAttraction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
            onClick={() => setEditModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0F0F1A] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-[#0F0F1A] border-b border-white/10 p-6 flex items-center justify-between">
                <h2 className="text-xl font-bold">Edit Attraction</h2>
                <button
                  onClick={() => setEditModalOpen(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Image Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Image
                  </label>
                  <div className="flex gap-4">
                    <div className="w-32 h-32 rounded-xl overflow-hidden bg-gray-800 relative flex-shrink-0">
                      {editForm.image_url ? (
                        <Image
                          src={editForm.image_url}
                          alt="Thumbnail"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-gray-500" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 space-y-3">
                      {/* File Upload */}
                      <div>
                        <label className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg cursor-pointer transition">
                          <Upload className="w-4 h-4" />
                          <span className="text-sm">Upload Image</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                            disabled={uploadingImage}
                          />
                        </label>
                      </div>
                      {/* URL Fetch */}
                      <div className="flex gap-2">
                        <input
                          type="url"
                          placeholder="Or paste image URL..."
                          value={imageUrlInput}
                          onChange={(e) => setImageUrlInput(e.target.value)}
                          className="flex-1 px-3 py-2 bg-gray-800 rounded-lg border border-white/10 focus:border-cyan-500 focus:outline-none text-sm"
                        />
                        <button
                          onClick={handleFetchFromUrl}
                          disabled={!imageUrlInput || uploadingImage}
                          className="px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg disabled:opacity-50 transition"
                        >
                          <LinkIcon className="w-4 h-4" />
                        </button>
                      </div>
                      {uploadingImage && (
                        <div className="flex items-center gap-2 text-sm text-cyan-400">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Uploading...
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-white/10 focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                {/* Description */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-300">
                      Description
                    </label>
                    <button
                      onClick={handleRewriteWithAI}
                      disabled={rewriting}
                      className="flex items-center gap-2 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 rounded-lg text-sm transition disabled:opacity-50"
                    >
                      {rewriting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Rewriting...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          Rewrite with AI
                        </>
                      )}
                    </button>
                  </div>
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={5}
                    className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-white/10 focus:border-cyan-500 focus:outline-none resize-none"
                  />
                </div>

                {/* Two Column Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Area
                    </label>
                    <input
                      type="text"
                      value={editForm.area}
                      onChange={(e) => setEditForm(prev => ({ ...prev, area: e.target.value }))}
                      className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-white/10 focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Category
                    </label>
                    <input
                      type="text"
                      value={editForm.category}
                      onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-white/10 focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Price (BHD)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={editForm.price_from}
                      onChange={(e) => setEditForm(prev => ({ ...prev, price_from: e.target.value }))}
                      className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-white/10 focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Booking URL
                    </label>
                    <input
                      type="url"
                      value={editForm.booking_url}
                      onChange={(e) => setEditForm(prev => ({ ...prev, booking_url: e.target.value }))}
                      className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-white/10 focus:border-cyan-500 focus:outline-none"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-[#0F0F1A] border-t border-white/10 p-6 flex justify-end gap-3">
                <button
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-medium rounded-lg transition disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
