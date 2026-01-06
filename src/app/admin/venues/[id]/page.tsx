'use client';

import { useState, useEffect, useCallback, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Save,
  Loader2,
  Upload,
  Sparkles,
  CheckCircle,
  XCircle,
  MapPin,
  Phone,
  Mail,
  Globe,
  Instagram,
  Star,
  StarOff,
  Eye,
  EyeOff,
  Trash2,
  ExternalLink,
} from 'lucide-react';

interface Venue {
  id: string;
  owner_id: string | null;
  name: string;
  slug: string;
  description: string | null;
  description_ar: string | null;
  category: string;
  subcategories: string[] | null;
  cuisine_types: string[] | null;
  area: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  google_maps_url: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  whatsapp: string | null;
  instagram: string | null;
  facebook: string | null;
  tiktok: string | null;
  twitter: string | null;
  menu_url: string | null;
  booking_url: string | null;
  logo_url: string | null;
  cover_image_url: string | null;
  gallery: string[] | null;
  opening_hours: Record<string, string> | null;
  price_range: number | null;
  avg_cost_per_person: string | null;
  features: string[] | null;
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  rejection_reason: string | null;
  is_verified: boolean;
  is_featured: boolean;
  view_count: number;
  like_count: number;
  created_at: string;
  updated_at: string;
  approved_at: string | null;
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

const VENUE_CATEGORIES = [
  'restaurant',
  'cafe',
  'lounge',
  'bar',
  'nightclub',
  'beach-club',
  'hotel',
  'spa',
  'shopping',
  'tour',
  'kids',
  'community',
];

const AREAS = [
  'Manama',
  'Seef',
  'Juffair',
  'Adliya',
  'Amwaj',
  'Muharraq',
  'Riffa',
  'Hamad Town',
  'Isa Town',
  'Bahrain Bay',
  'Saar',
  'Budaiya',
  'Durrat Al Bahrain',
  'Diyar Al Muharraq',
  'Zallaq',
  'Other',
];

export default function AdminVenueEditPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [aiRewriting, setAiRewriting] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    description_ar: '',
    category: '',
    area: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    instagram: '',
    facebook: '',
    whatsapp: '',
    google_maps_url: '',
    booking_url: '',
    menu_url: '',
    price_range: '',
    avg_cost_per_person: '',
    features: '',
    logo_url: '',
    cover_image_url: '',
    is_featured: false,
    is_verified: false,
  });

  const fetchVenue = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/venues/${resolvedParams.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch venue');
      }
      const data = await response.json();
      setVenue(data.venue);

      // Populate form
      const v = data.venue;
      setFormData({
        name: v.name || '',
        slug: v.slug || '',
        description: v.description || '',
        description_ar: v.description_ar || '',
        category: v.category || '',
        area: v.area || '',
        address: v.address || '',
        phone: v.phone || '',
        email: v.email || '',
        website: v.website || '',
        instagram: v.instagram || '',
        facebook: v.facebook || '',
        whatsapp: v.whatsapp || '',
        google_maps_url: v.google_maps_url || '',
        booking_url: v.booking_url || '',
        menu_url: v.menu_url || '',
        price_range: v.price_range?.toString() || '',
        avg_cost_per_person: v.avg_cost_per_person || '',
        features: v.features?.join(', ') || '',
        logo_url: v.logo_url || '',
        cover_image_url: v.cover_image_url || '',
        is_featured: v.is_featured || false,
        is_verified: v.is_verified || false,
      });
    } catch (error) {
      console.error('Error fetching venue:', error);
      setToast({ message: 'Failed to load venue', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [resolvedParams.id]);

  useEffect(() => {
    fetchVenue();
  }, [fetchVenue]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updates = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description || null,
        description_ar: formData.description_ar || null,
        category: formData.category,
        area: formData.area,
        address: formData.address,
        phone: formData.phone || null,
        email: formData.email || null,
        website: formData.website || null,
        instagram: formData.instagram || null,
        facebook: formData.facebook || null,
        whatsapp: formData.whatsapp || null,
        google_maps_url: formData.google_maps_url || null,
        booking_url: formData.booking_url || null,
        menu_url: formData.menu_url || null,
        price_range: formData.price_range ? parseInt(formData.price_range) : null,
        avg_cost_per_person: formData.avg_cost_per_person || null,
        features: formData.features ? formData.features.split(',').map((f) => f.trim()).filter(Boolean) : null,
        logo_url: formData.logo_url || null,
        cover_image_url: formData.cover_image_url || null,
        is_featured: formData.is_featured,
        is_verified: formData.is_verified,
      };

      const response = await fetch(`/api/admin/venues/${resolvedParams.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update venue');
      }

      const data = await response.json();
      setVenue(data.venue);
      setToast({ message: 'Venue updated successfully', type: 'success' });
    } catch (error) {
      console.error('Error saving venue:', error);
      setToast({ message: 'Failed to save venue', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleAIRewrite = async () => {
    if (!formData.description) {
      setToast({ message: 'Please enter a description first', type: 'error' });
      return;
    }

    setAiRewriting(true);
    try {
      const response = await fetch('/api/ai/generate-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'venue',
          name: formData.name,
          category: formData.category,
          area: formData.area,
          currentDescription: formData.description,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate description');
      }

      const data = await response.json();
      setFormData((prev) => ({
        ...prev,
        description: data.description,
      }));
      setToast({ message: 'Description rewritten with AI', type: 'success' });
    } catch (error) {
      console.error('Error rewriting description:', error);
      setToast({ message: 'Failed to rewrite description', type: 'error' });
    } finally {
      setAiRewriting(false);
    }
  };

  const handleImageUpload = async (file: File, type: 'logo' | 'cover') => {
    if (type === 'logo') setUploadingLogo(true);
    else setUploadingCover(true);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('entityType', 'venue');
      uploadFormData.append('imageType', type);
      uploadFormData.append('venueSlug', venue?.slug || resolvedParams.id);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to upload image');
      }

      const data = await response.json();
      const imageUrl = data.url;

      if (type === 'logo') {
        setFormData((prev) => ({ ...prev, logo_url: imageUrl }));
      } else {
        setFormData((prev) => ({ ...prev, cover_image_url: imageUrl }));
      }

      setToast({ message: 'Image uploaded successfully', type: 'success' });
    } catch (error) {
      console.error('Error uploading image:', error);
      setToast({ message: error instanceof Error ? error.message : 'Failed to upload image', type: 'error' });
    } finally {
      if (type === 'logo') setUploadingLogo(false);
      else setUploadingCover(false);
    }
  };

  const handleApprove = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/admin/venues/${resolvedParams.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'approve' }),
      });

      if (!response.ok) throw new Error('Failed to approve venue');

      const data = await response.json();
      setVenue(data.venue);
      setToast({ message: 'Venue approved successfully', type: 'success' });
    } catch (error) {
      console.error('Error approving venue:', error);
      setToast({ message: 'Failed to approve venue', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      setToast({ message: 'Please provide a rejection reason', type: 'error' });
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`/api/admin/venues/${resolvedParams.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reject', reason: rejectReason }),
      });

      if (!response.ok) throw new Error('Failed to reject venue');

      const data = await response.json();
      setVenue(data.venue);
      setShowRejectModal(false);
      setRejectReason('');
      setToast({ message: 'Venue rejected', type: 'success' });
    } catch (error) {
      console.error('Error rejecting venue:', error);
      setToast({ message: 'Failed to reject venue', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleToggleFeatured = async () => {
    const newValue = !formData.is_featured;
    setFormData((prev) => ({ ...prev, is_featured: newValue }));

    try {
      const response = await fetch(`/api/admin/venues/${resolvedParams.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_featured: newValue }),
      });

      if (!response.ok) throw new Error('Failed to update');

      setToast({
        message: newValue ? 'Added to featured' : 'Removed from featured',
        type: 'success',
      });
    } catch (error) {
      console.error('Error toggling featured:', error);
      setFormData((prev) => ({ ...prev, is_featured: !newValue }));
      setToast({ message: 'Failed to update', type: 'error' });
    }
  };

  const handleDelete = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/admin/venues/${resolvedParams.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete venue');

      setToast({ message: 'Venue deleted successfully', type: 'success' });
      router.push('/admin/venues');
    } catch (error) {
      console.error('Error deleting venue:', error);
      setToast({ message: 'Failed to delete venue', type: 'error' });
    } finally {
      setSaving(false);
      setShowDeleteModal(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D1A] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="min-h-screen bg-[#0D0D1A] p-6">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-white mb-2">Venue not found</h2>
          <p className="text-gray-400 mb-4">The venue you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/admin/venues"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Venues
          </Link>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="px-3 py-1 text-sm font-medium bg-green-500/20 text-green-400 rounded-full">
            Approved
          </span>
        );
      case 'pending':
        return (
          <span className="px-3 py-1 text-sm font-medium bg-orange-500/20 text-orange-400 rounded-full">
            Pending
          </span>
        );
      case 'rejected':
        return (
          <span className="px-3 py-1 text-sm font-medium bg-red-500/20 text-red-400 rounded-full">
            Rejected
          </span>
        );
      case 'suspended':
        return (
          <span className="px-3 py-1 text-sm font-medium bg-gray-500/20 text-gray-400 rounded-full">
            Suspended
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D1A] p-6">
      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col gap-4 mb-6">
        <Link
          href="/admin/venues"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Venues
        </Link>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            {formData.logo_url ? (
              <Image
                src={formData.logo_url}
                alt={formData.name}
                width={64}
                height={64}
                className="w-16 h-16 rounded-xl object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-xl bg-gray-700 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-gray-500" />
              </div>
            )}
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-white">{formData.name || 'Edit Venue'}</h1>
                {getStatusBadge(venue.status)}
                {formData.is_featured && (
                  <Star className="w-5 h-5 text-amber-400 fill-current" />
                )}
              </div>
              <p className="text-gray-400 mt-1">
                {formData.category} {formData.area && `• ${formData.area}`}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {venue.status === 'pending' && (
              <>
                <button
                  onClick={handleApprove}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  <CheckCircle className="w-4 h-4" />
                  Approve
                </button>
                <button
                  onClick={() => setShowRejectModal(true)}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-lg font-medium transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                  Reject
                </button>
              </>
            )}
            <button
              onClick={handleToggleFeatured}
              className="flex items-center gap-2 px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30 rounded-lg font-medium transition-colors"
            >
              {formData.is_featured ? (
                <>
                  <StarOff className="w-4 h-4" />
                  Unfeature
                </>
              ) : (
                <>
                  <Star className="w-4 h-4" />
                  Feature
                </>
              )}
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Changes
            </button>
            <a
              href={`/places/${venue.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg font-medium transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View Page
            </a>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-lg font-medium transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-[#1A1A2E] rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Slug *</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                >
                  <option value="">Select Category</option>
                  {VENUE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Area *</label>
                <select
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                >
                  <option value="">Select Area</option>
                  {AREAS.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm text-gray-400 mb-1">Address *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm text-gray-400">Description</label>
                <button
                  onClick={handleAIRewrite}
                  disabled={aiRewriting || !formData.description}
                  className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 disabled:opacity-50"
                >
                  {aiRewriting ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Sparkles className="w-3 h-3" />
                  )}
                  AI Rewrite
                </button>
              </div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 resize-none"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm text-gray-400 mb-1">Features (comma-separated)</label>
              <input
                type="text"
                name="features"
                value={formData.features}
                onChange={handleInputChange}
                placeholder="WiFi, Parking, Live Music, Outdoor Seating"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-[#1A1A2E] rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  <Globe className="w-4 h-4 inline mr-1" />
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">WhatsApp</label>
                <input
                  type="text"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  <Instagram className="w-4 h-4 inline mr-1" />
                  Instagram
                </label>
                <input
                  type="text"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  placeholder="@username"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Facebook</label>
                <input
                  type="text"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Google Maps URL</label>
                <input
                  type="url"
                  name="google_maps_url"
                  value={formData.google_maps_url}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Booking URL</label>
                <input
                  type="url"
                  name="booking_url"
                  value={formData.booking_url}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Menu URL</label>
                <input
                  type="url"
                  name="menu_url"
                  value={formData.menu_url}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Price Range (1-4)</label>
                <select
                  name="price_range"
                  value={formData.price_range}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                >
                  <option value="">Select</option>
                  <option value="1">$ - Budget</option>
                  <option value="2">$$ - Moderate</option>
                  <option value="3">$$$ - Upscale</option>
                  <option value="4">$$$$ - Luxury</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Logo Upload */}
          <div className="bg-[#1A1A2E] rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Logo</h3>
            <div className="relative">
              {formData.logo_url ? (
                <div className="relative aspect-square rounded-xl overflow-hidden group">
                  <Image
                    src={formData.logo_url}
                    alt="Logo"
                    fill
                    className="object-cover"
                  />
                  {/* Overlay with actions on hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <label className="p-2 bg-cyan-500 rounded-lg text-white hover:bg-cyan-600 cursor-pointer">
                      <Upload className="w-5 h-5" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file, 'logo');
                        }}
                      />
                    </label>
                    <button
                      onClick={() => setFormData((prev) => ({ ...prev, logo_url: '' }))}
                      className="p-2 bg-red-500 rounded-lg text-white hover:bg-red-600"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  {uploadingLogo && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
                    </div>
                  )}
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-cyan-500/50 transition-colors">
                  {uploadingLogo ? (
                    <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-gray-400 text-sm">Upload Logo</span>
                      <span className="text-gray-500 text-xs mt-1">Max 10MB, compressed to 1MB</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file, 'logo');
                    }}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Cover Image Upload */}
          <div className="bg-[#1A1A2E] rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Cover Image</h3>
            <div className="relative">
              {formData.cover_image_url ? (
                <div className="relative aspect-video rounded-xl overflow-hidden group">
                  <Image
                    src={formData.cover_image_url}
                    alt="Cover"
                    fill
                    className="object-cover"
                  />
                  {/* Overlay with actions on hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <label className="p-2 bg-cyan-500 rounded-lg text-white hover:bg-cyan-600 cursor-pointer">
                      <Upload className="w-5 h-5" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file, 'cover');
                        }}
                      />
                    </label>
                    <button
                      onClick={() => setFormData((prev) => ({ ...prev, cover_image_url: '' }))}
                      className="p-2 bg-red-500 rounded-lg text-white hover:bg-red-600"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  {uploadingCover && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
                    </div>
                  )}
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center aspect-video border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-cyan-500/50 transition-colors">
                  {uploadingCover ? (
                    <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-gray-400 text-sm">Upload Cover</span>
                      <span className="text-gray-500 text-xs mt-1">Max 10MB, compressed to 1MB</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file, 'cover');
                    }}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-[#1A1A2E] rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-white/5 rounded-xl">
                <Eye className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                <p className="text-2xl font-bold text-white">{venue.view_count.toLocaleString()}</p>
                <p className="text-xs text-gray-400">Views</p>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-xl">
                <Star className="w-5 h-5 text-red-400 mx-auto mb-1" />
                <p className="text-2xl font-bold text-white">{venue.like_count}</p>
                <p className="text-xs text-gray-400">Likes</p>
              </div>
            </div>
          </div>

          {/* Meta */}
          <div className="bg-[#1A1A2E] rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Information</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-400">Status</p>
                <p className="text-white capitalize">{venue.status}</p>
              </div>
              {venue.rejection_reason && (
                <div>
                  <p className="text-gray-400">Rejection Reason</p>
                  <p className="text-red-400">{venue.rejection_reason}</p>
                </div>
              )}
              <div>
                <p className="text-gray-400">Created</p>
                <p className="text-white">{new Date(venue.created_at).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-400">Last Updated</p>
                <p className="text-white">{new Date(venue.updated_at).toLocaleDateString()}</p>
              </div>
              {venue.approved_at && (
                <div>
                  <p className="text-gray-400">Approved</p>
                  <p className="text-white">{new Date(venue.approved_at).toLocaleDateString()}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-[#1A1A2E] border border-white/10 rounded-2xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Delete Venue</h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to delete &quot;{venue.name}&quot;? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={saving}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Delete'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-[#1A1A2E] border border-white/10 rounded-2xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Reject Venue</h3>
            <p className="text-gray-400 mb-4">
              Please provide a reason for rejecting this venue. This will be sent to the venue owner.
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter rejection reason..."
              rows={4}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500/50 resize-none"
            />
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={saving}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Reject Venue'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
