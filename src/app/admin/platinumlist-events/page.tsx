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
  XCircle,
  Calendar,
  Clock,
  ExternalLink
} from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string | null;
  category: string;
  venue_name: string | null;
  venue_address: string | null;
  start_date: string | null;
  end_date: string | null;
  start_time: string | null;
  price: string | null;
  price_min: number | null;
  price_currency: string | null;
  image_url: string | null;
  cover_url: string | null;
  thumbnail: string | null;
  source_url: string | null;
  source_name: string | null;
  affiliate_url: string | null;
  booking_url: string | null;
  is_active: boolean;
  is_hidden: boolean;
  status: string;
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

const EVENT_CATEGORIES = [
  { value: 'concerts', label: 'Concerts' },
  { value: 'nightlife', label: 'Nightlife' },
  { value: 'comedy', label: 'Comedy' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'sports', label: 'Sports' },
  { value: 'family', label: 'Family' },
  { value: 'events', label: 'Events' },
];

export default function PlatinumlistEventsAdmin() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkActionLoading, setBulkActionLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Edit modal state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    category: '',
    venue_name: '',
    venue_address: '',
    start_date: '',
    end_date: '',
    start_time: '',
    price_min: '',
    image_url: '',
    cover_url: ''
  });
  const [saving, setSaving] = useState(false);
  const [rewriting, setRewriting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [coverUrlInput, setCoverUrlInput] = useState('');

  // Toast helper
  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  // Fetch events
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/events?source=platinumlist&includeHidden=true');
      const data = await response.json();
      if (data.events) {
        setEvents(data.events);
        setFilteredEvents(data.events);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      showToast('Failed to load events', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Filter events
  useEffect(() => {
    let filtered = [...events];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(term) ||
        event.venue_name?.toLowerCase().includes(term) ||
        event.description?.toLowerCase().includes(term)
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(event => event.category === categoryFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(event =>
        statusFilter === 'active' ? event.is_active && !event.is_hidden : !event.is_active || event.is_hidden
      );
    }

    setFilteredEvents(filtered);
  }, [events, searchTerm, categoryFilter, statusFilter]);

  // Get unique categories
  const categories = [...new Set(events.map(e => e.category).filter(Boolean))];

  // Selection handlers
  const toggleSelectAll = () => {
    if (selectedIds.size === filteredEvents.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredEvents.map(e => e.id)));
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
  const handleToggleVisibility = async (id: string, currentlyHidden: boolean) => {
    try {
      const response = await fetch(`/api/admin/events/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update', is_hidden: !currentlyHidden })
      });

      if (response.ok) {
        setEvents(prev => prev.map(e =>
          e.id === id ? { ...e, is_hidden: !currentlyHidden } : e
        ));
        showToast(currentlyHidden ? 'Event visible' : 'Event hidden', 'success');
      } else {
        showToast('Failed to update visibility', 'error');
      }
    } catch (error) {
      console.error('Error toggling visibility:', error);
      showToast('Failed to update visibility', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
      const response = await fetch(`/api/admin/events/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setEvents(prev => prev.filter(e => e.id !== id));
        showToast('Event deleted', 'success');
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

    if (action === 'delete' && !confirm(`Delete ${selectedIds.size} events?`)) {
      return;
    }

    setBulkActionLoading(true);
    showToast(`Processing ${selectedIds.size} items...`, 'success');

    try {
      const response = await fetch('/api/admin/events/bulk', {
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
          setEvents(prev => prev.filter(e => !selectedIds.has(e.id)));
        } else if (action === 'hide') {
          setEvents(prev => prev.map(e =>
            selectedIds.has(e.id) ? { ...e, is_hidden: true } : e
          ));
        } else if (action === 'show') {
          setEvents(prev => prev.map(e =>
            selectedIds.has(e.id) ? { ...e, is_hidden: false } : e
          ));
        } else if (action === 'rewrite') {
          await fetchEvents();
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
  const openEditModal = (event: Event) => {
    setEditingEvent(event);
    setEditForm({
      title: event.title || '',
      description: event.description || '',
      category: event.category || '',
      venue_name: event.venue_name || '',
      venue_address: event.venue_address || '',
      start_date: event.start_date || '',
      end_date: event.end_date || '',
      start_time: event.start_time || '',
      price_min: event.price_min?.toString() || '',
      image_url: event.image_url || event.thumbnail || '',
      cover_url: event.cover_url || ''
    });
    setImageUrlInput('');
    setCoverUrlInput('');
    setEditModalOpen(true);
  };

  const handleSave = async () => {
    if (!editingEvent) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/admin/events/${editingEvent.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update',
          title: editForm.title,
          description: editForm.description,
          category: editForm.category,
          venue_name: editForm.venue_name,
          venue_address: editForm.venue_address,
          start_date: editForm.start_date || null,
          end_date: editForm.end_date || null,
          start_time: editForm.start_time || null,
          price_min: editForm.price_min ? parseFloat(editForm.price_min) : null,
          price: editForm.price_min ? `${editForm.price_min} BHD` : null,
          image_url: editForm.image_url,
          thumbnail: editForm.image_url,
          cover_url: editForm.cover_url
        })
      });

      if (response.ok) {
        const data = await response.json();
        setEvents(prev => prev.map(e =>
          e.id === editingEvent.id ? { ...e, ...data.event } : e
        ));
        showToast('Event updated', 'success');
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
    if (!editingEvent) return;

    setRewriting(true);
    try {
      const response = await fetch(`/api/admin/events/${editingEvent.id}/rewrite`, {
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
    if (!file || !editingEvent) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`/api/admin/events/${editingEvent.id}/upload-image`, {
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
    if (!imageUrlInput || !editingEvent) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('imageUrl', imageUrlInput);

    try {
      const response = await fetch(`/api/admin/events/${editingEvent.id}/upload-image`, {
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

  const handleCoverFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingEvent) return;

    setUploadingCover(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`/api/admin/events/${editingEvent.id}/upload-cover`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success && data.coverUrl) {
        setEditForm(prev => ({ ...prev, cover_url: data.coverUrl }));
        showToast('Cover image uploaded', 'success');
      } else {
        showToast(data.error || 'Upload failed', 'error');
      }
    } catch (error) {
      console.error('Cover upload error:', error);
      showToast('Upload failed', 'error');
    } finally {
      setUploadingCover(false);
    }
  };

  const handleCoverFetchFromUrl = async () => {
    if (!coverUrlInput || !editingEvent) return;

    setUploadingCover(true);
    const formData = new FormData();
    formData.append('imageUrl', coverUrlInput);

    try {
      const response = await fetch(`/api/admin/events/${editingEvent.id}/upload-cover`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success && data.coverUrl) {
        setEditForm(prev => ({ ...prev, cover_url: data.coverUrl }));
        setCoverUrlInput('');
        showToast('Cover image fetched and uploaded', 'success');
      } else {
        showToast(data.error || 'Failed to fetch cover image', 'error');
      }
    } catch (error) {
      console.error('Cover fetch error:', error);
      showToast('Failed to fetch cover image', 'error');
    } finally {
      setUploadingCover(false);
    }
  };

  // Format date for display
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '-';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateStr;
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
        <h1 className="text-3xl font-bold mb-2">Platinumlist Events</h1>
        <p className="text-gray-400">
          Manage events from Platinumlist (concerts, nightlife, comedy, sports). Edit descriptions, upload images, and control visibility.
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
              placeholder="Search events..."
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
            {EVENT_CATEGORIES.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
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
            onClick={fetchEvents}
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
          <div className="text-2xl font-bold text-cyan-400">{events.length}</div>
          <div className="text-gray-400 text-sm">Total Events</div>
        </div>
        <div className="bg-[#0F0F1A] rounded-xl p-4 border border-white/10">
          <div className="text-2xl font-bold text-green-400">
            {events.filter(e => e.is_active && !e.is_hidden).length}
          </div>
          <div className="text-gray-400 text-sm">Active</div>
        </div>
        <div className="bg-[#0F0F1A] rounded-xl p-4 border border-white/10">
          <div className="text-2xl font-bold text-gray-400">
            {events.filter(e => !e.is_active || e.is_hidden).length}
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
      ) : filteredEvents.length === 0 ? (
        <div className="bg-[#0F0F1A] rounded-xl p-12 text-center border border-white/10">
          <AlertCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400">No events found</p>
          <p className="text-sm text-gray-500 mt-2">Run the Platinumlist events scraper to import events.</p>
        </div>
      ) : (
        <div className="bg-[#0F0F1A] rounded-xl overflow-hidden border border-white/10">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800/50">
                <th className="p-4 text-left">
                  <button onClick={toggleSelectAll} className="text-gray-400 hover:text-white">
                    {selectedIds.size === filteredEvents.length ? (
                      <CheckSquare className="w-5 h-5" />
                    ) : (
                      <Square className="w-5 h-5" />
                    )}
                  </button>
                </th>
                <th className="p-4 text-left text-gray-400 font-medium">Image</th>
                <th className="p-4 text-left text-gray-400 font-medium">Title</th>
                <th className="p-4 text-left text-gray-400 font-medium">Category</th>
                <th className="p-4 text-left text-gray-400 font-medium">Date</th>
                <th className="p-4 text-left text-gray-400 font-medium">Price</th>
                <th className="p-4 text-left text-gray-400 font-medium">Status</th>
                <th className="p-4 text-left text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event) => (
                <tr
                  key={event.id}
                  className={`border-t border-white/10 hover:bg-gray-800/30 transition ${
                    !event.is_active || event.is_hidden ? 'opacity-50' : ''
                  }`}
                >
                  <td className="p-4">
                    <button
                      onClick={() => toggleSelect(event.id)}
                      className="text-gray-400 hover:text-white"
                    >
                      {selectedIds.has(event.id) ? (
                        <CheckSquare className="w-5 h-5 text-cyan-400" />
                      ) : (
                        <Square className="w-5 h-5" />
                      )}
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-800 relative">
                      {event.image_url || event.thumbnail ? (
                        <Image
                          src={event.image_url || event.thumbnail || ''}
                          alt={event.title}
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
                    <div className="font-medium text-white line-clamp-1">{event.title}</div>
                    <div className="text-sm text-gray-400 line-clamp-1">{event.venue_name}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-gray-800 rounded-md text-xs capitalize">
                      {event.category || 'events'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>{formatDate(event.start_date)}</span>
                    </div>
                    {event.start_time && (
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                        <Clock className="w-3 h-3" />
                        <span>{event.start_time}</span>
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    {event.price_min ? (
                      <span className="text-green-400">
                        {event.price_currency || 'BHD'} {event.price_min}
                      </span>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </td>
                  <td className="p-4">
                    {event.is_active && !event.is_hidden ? (
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
                        onClick={() => openEditModal(event)}
                        className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleToggleVisibility(event.id, event.is_hidden)}
                        className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition"
                        title={event.is_hidden ? 'Show' : 'Hide'}
                      >
                        {event.is_hidden ? (
                          <Eye className="w-4 h-4" />
                        ) : (
                          <EyeOff className="w-4 h-4" />
                        )}
                      </button>
                      {event.source_url && (
                        <a
                          href={event.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition"
                          title="View original"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      <button
                        onClick={() => handleDelete(event.id)}
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
        {editModalOpen && editingEvent && (
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
                <h2 className="text-xl font-bold">Edit Event</h2>
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
                    Thumbnail Image
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

                {/* Cover Image Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Cover Image (Wide Banner)
                  </label>
                  <p className="text-xs text-gray-500 mb-3">
                    Optional: A wide banner image for the event detail modal. Recommended: 1200x600px.
                  </p>
                  <div className="flex gap-4">
                    <div className="w-48 h-24 rounded-xl overflow-hidden bg-gray-800 relative flex-shrink-0">
                      {editForm.cover_url ? (
                        <Image
                          src={editForm.cover_url}
                          alt="Cover"
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
                      <div>
                        <label className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg cursor-pointer transition">
                          <Upload className="w-4 h-4" />
                          <span className="text-sm">Upload Cover Image</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleCoverFileUpload}
                            className="hidden"
                            disabled={uploadingCover}
                          />
                        </label>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          placeholder="Or paste cover image URL..."
                          value={coverUrlInput}
                          onChange={(e) => setCoverUrlInput(e.target.value)}
                          className="flex-1 px-3 py-2 bg-gray-800 rounded-lg border border-white/10 focus:border-cyan-500 focus:outline-none text-sm"
                        />
                        <button
                          onClick={handleCoverFetchFromUrl}
                          disabled={!coverUrlInput || uploadingCover}
                          className="px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg disabled:opacity-50 transition"
                        >
                          <LinkIcon className="w-4 h-4" />
                        </button>
                      </div>
                      {uploadingCover && (
                        <div className="flex items-center gap-2 text-sm text-cyan-400">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Uploading cover...
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
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

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={editForm.category}
                    onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-white/10 focus:border-cyan-500 focus:outline-none"
                  >
                    {EVENT_CATEGORIES.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                {/* Two Column Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Venue
                    </label>
                    <input
                      type="text"
                      value={editForm.venue_name}
                      onChange={(e) => setEditForm(prev => ({ ...prev, venue_name: e.target.value }))}
                      className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-white/10 focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={editForm.venue_address}
                      onChange={(e) => setEditForm(prev => ({ ...prev, venue_address: e.target.value }))}
                      className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-white/10 focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={editForm.start_date}
                      onChange={(e) => setEditForm(prev => ({ ...prev, start_date: e.target.value }))}
                      className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-white/10 focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={editForm.end_date}
                      onChange={(e) => setEditForm(prev => ({ ...prev, end_date: e.target.value }))}
                      className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-white/10 focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={editForm.start_time}
                      onChange={(e) => setEditForm(prev => ({ ...prev, start_time: e.target.value }))}
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
                      value={editForm.price_min}
                      onChange={(e) => setEditForm(prev => ({ ...prev, price_min: e.target.value }))}
                      className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-white/10 focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Source URL */}
                {editingEvent.source_url && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Source URL
                    </label>
                    <a
                      href={editingEvent.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 text-sm break-all"
                    >
                      {editingEvent.source_url}
                    </a>
                  </div>
                )}
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
