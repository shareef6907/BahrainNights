'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Trees,
  Upload,
  X,
  Check,
  Loader2,
  RefreshCw,
  MapPin,
  Star,
  Clock,
  ImageIcon,
  AlertCircle,
  ChevronDown,
} from 'lucide-react';

interface Park {
  id: string;
  name: string;
  name_arabic: string | null;
  latitude: number;
  longitude: number;
  address: string;
  governorate: string;
  rating: number | null;
  total_reviews: number;
  opening_hours: string | null;
  features: string[];
  image_url: string | null;
  description: string | null;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
}

const GOVERNORATES = [
  { id: 'capital', name: 'Capital Governorate' },
  { id: 'muharraq', name: 'Muharraq Governorate' },
  { id: 'northern', name: 'Northern Governorate' },
  { id: 'southern', name: 'Southern Governorate' },
];

const FEATURES = [
  'Playground',
  'Walking Track',
  'Walking Paths',
  'Sports Courts',
  'Sports Facilities',
  'Parking Available',
  'Lit at Night',
  'Restrooms',
  'Cycling Track',
  'BBQ Area',
  'Lake/Pond',
  'Mosque Nearby',
  'Exercise Equipment',
  'Picnic Area',
  'Waterfront',
  'Shaded Areas',
  'Fountains',
  'Benches',
  'Photography Spot',
  'Historic Site',
  'Wildlife',
  'Nature Reserve',
  'Botanical Garden',
  'Educational',
  'Amusement Rides',
  'Restaurants',
  'Natural Spring',
  'Guided Tours',
];

export default function AdminParksPage() {
  const [parks, setParks] = useState<Park[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [governorateFilter, setGovernorateFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingPark, setEditingPark] = useState<Park | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    name_arabic: '',
    latitude: '',
    longitude: '',
    address: '',
    governorate: 'capital',
    rating: '',
    total_reviews: '',
    opening_hours: '',
    features: [] as string[],
    description: '',
    is_verified: false,
  });

  // Fetch parks
  const fetchParks = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/parks');
      if (!response.ok) throw new Error('Failed to fetch parks');

      const data = await response.json();
      setParks(data.parks || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchParks();
  }, [fetchParks]);

  // Show toast
  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  // Filter parks
  const filteredParks = parks.filter(park => {
    const matchesSearch = 
      park.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      park.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGovernorate = governorateFilter === 'all' || park.governorate === governorateFilter;
    return matchesSearch && matchesGovernorate && park.is_active;
  });

  // Open add/edit modal
  const openModal = (park?: Park) => {
    if (park) {
      setEditingPark(park);
      setFormData({
        name: park.name,
        name_arabic: park.name_arabic || '',
        latitude: park.latitude.toString(),
        longitude: park.longitude.toString(),
        address: park.address,
        governorate: park.governorate,
        rating: park.rating?.toString() || '',
        total_reviews: park.total_reviews.toString(),
        opening_hours: park.opening_hours || '',
        features: park.features || [],
        description: park.description || '',
        is_verified: park.is_verified,
      });
    } else {
      setEditingPark(null);
      setFormData({
        name: '',
        name_arabic: '',
        latitude: '',
        longitude: '',
        address: '',
        governorate: 'capital',
        rating: '',
        total_reviews: '',
        opening_hours: '',
        features: [],
        description: '',
        is_verified: false,
      });
    }
    setShowModal(true);
  };

  // Save park
  const handleSave = async () => {
    if (!formData.name || !formData.latitude || !formData.longitude || !formData.address) {
      showToast('error', 'Please fill in all required fields');
      return;
    }

    setSaving(true);
    try {
      const url = editingPark 
        ? `/api/admin/parks/${editingPark.id}`
        : '/api/admin/parks';
      
      const method = editingPark ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save park');

      showToast('success', editingPark ? 'Park updated successfully' : 'Park created successfully');
      setShowModal(false);
      fetchParks();
    } catch (err) {
      showToast('error', 'Failed to save park');
    } finally {
      setSaving(false);
    }
  };

  // Delete park
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/parks/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete park');

      showToast('success', 'Park deleted successfully');
      setDeleteConfirm(null);
      fetchParks();
    } catch (err) {
      showToast('error', 'Failed to delete park');
    }
  };

  // Upload image
  const handleImageUpload = async (parkId: string, file: File) => {
    setUploadingImage(parkId);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`/api/admin/parks/${parkId}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to upload image');

      showToast('success', 'Image uploaded successfully');
      fetchParks();
    } catch (err) {
      showToast('error', 'Failed to upload image');
    } finally {
      setUploadingImage(null);
    }
  };

  // Delete image
  const handleDeleteImage = async (parkId: string) => {
    try {
      const response = await fetch(`/api/admin/parks/${parkId}/upload`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete image');

      showToast('success', 'Image deleted successfully');
      fetchParks();
    } catch (err) {
      showToast('error', 'Failed to delete image');
    }
  };

  // Toggle feature
  const toggleFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature],
    }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Trees className="w-7 h-7 text-green-400" />
            Parks & Gardens
          </h1>
          <p className="text-gray-400 mt-1">{parks.length} parks in database</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Park
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search parks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#1A1A2E] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-400/50"
          />
        </div>
        <select
          value={governorateFilter}
          onChange={(e) => setGovernorateFilter(e.target.value)}
          className="px-4 py-2 bg-[#1A1A2E] border border-white/10 rounded-lg text-white focus:outline-none focus:border-green-400/50"
        >
          <option value="all">All Governorates</option>
          {GOVERNORATES.map(gov => (
            <option key={gov.id} value={gov.id}>{gov.name}</option>
          ))}
        </select>
        <button
          onClick={fetchParks}
          className="flex items-center gap-2 px-4 py-2 bg-[#1A1A2E] border border-white/10 rounded-lg text-gray-400 hover:text-white hover:border-white/20 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-green-400 animate-spin" />
        </div>
      )}

      {/* Parks Grid */}
      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredParks.map(park => (
            <motion.div
              key={park.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#1A1A2E] border border-white/10 rounded-xl overflow-hidden hover:border-green-400/30 transition-colors"
            >
              {/* Image Section */}
              <div className="relative h-48 bg-slate-800">
                {park.image_url ? (
                  <Image
                    src={park.image_url}
                    alt={park.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-green-500/10 to-teal-500/10">
                    <Trees className="w-12 h-12 text-green-400/50 mb-2" />
                    <span className="text-gray-500 text-sm">No Image</span>
                  </div>
                )}

                {/* Upload Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(park.id, file);
                      }}
                      disabled={uploadingImage === park.id}
                    />
                    <div className="flex items-center gap-2 px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors">
                      {uploadingImage === park.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Upload className="w-4 h-4" />
                      )}
                      {park.image_url ? 'Replace' : 'Upload'}
                    </div>
                  </label>
                  {park.image_url && (
                    <button
                      onClick={() => handleDeleteImage(park.id)}
                      className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Status Badges */}
                <div className="absolute top-2 left-2 flex gap-2">
                  {park.is_verified && (
                    <span className="px-2 py-1 bg-green-500/90 text-white text-xs font-medium rounded-full flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    park.image_url 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                  }`}>
                    {park.image_url ? 'Has Image' : 'Needs Image'}
                  </span>
                </div>
              </div>

              {/* Info Section */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="text-lg font-bold text-white">{park.name}</h3>
                  {park.name_arabic && (
                    <p className="text-gray-500 text-sm" dir="rtl">{park.name_arabic}</p>
                  )}
                </div>

                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <MapPin className="w-4 h-4 text-green-400" />
                  {park.address}
                </div>

                <div className="flex items-center gap-4 text-sm">
                  {park.rating && (
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      {park.rating}
                    </div>
                  )}
                  <span className="text-gray-500">
                    {park.total_reviews} reviews
                  </span>
                </div>

                {park.features && park.features.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {park.features.slice(0, 3).map(feature => (
                      <span key={feature} className="px-2 py-1 bg-white/5 text-gray-400 text-xs rounded">
                        {feature}
                      </span>
                    ))}
                    {park.features.length > 3 && (
                      <span className="px-2 py-1 bg-white/5 text-gray-400 text-xs rounded">
                        +{park.features.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2 border-t border-white/10">
                  <button
                    onClick={() => openModal(park)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 text-white text-sm rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(park.id)}
                    className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredParks.length === 0 && (
        <div className="text-center py-12">
          <Trees className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">No parks found</h3>
          <p className="text-gray-400">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#1A1A2E] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-xl font-bold text-white">
                  {editingPark ? 'Edit Park' : 'Add New Park'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Park Name (English) *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-green-400/50"
                      placeholder="Prince Khalifa Park"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Park Name (Arabic)</label>
                    <input
                      type="text"
                      value={formData.name_arabic}
                      onChange={(e) => setFormData({ ...formData, name_arabic: e.target.value })}
                      className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-green-400/50"
                      placeholder="حديقة الأمير خليفة"
                      dir="rtl"
                    />
                  </div>
                </div>

                {/* Coordinates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Latitude *</label>
                    <input
                      type="text"
                      value={formData.latitude}
                      onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                      className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-green-400/50"
                      placeholder="26.2478"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Longitude *</label>
                    <input
                      type="text"
                      value={formData.longitude}
                      onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                      className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-green-400/50"
                      placeholder="50.6567"
                    />
                  </div>
                </div>

                {/* Address & Governorate */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Address *</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-green-400/50"
                      placeholder="Hidd, Bahrain"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Governorate *</label>
                    <select
                      value={formData.governorate}
                      onChange={(e) => setFormData({ ...formData, governorate: e.target.value })}
                      className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-green-400/50"
                    >
                      {GOVERNORATES.map(gov => (
                        <option key={gov.id} value={gov.id}>{gov.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Rating & Reviews */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Rating (1-5)</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      step="0.1"
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                      className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-green-400/50"
                      placeholder="4.5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Total Reviews</label>
                    <input
                      type="number"
                      value={formData.total_reviews}
                      onChange={(e) => setFormData({ ...formData, total_reviews: e.target.value })}
                      className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-green-400/50"
                      placeholder="500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Opening Hours</label>
                    <input
                      type="text"
                      value={formData.opening_hours}
                      onChange={(e) => setFormData({ ...formData, opening_hours: e.target.value })}
                      className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-green-400/50"
                      placeholder="6:00 AM - 11:00 PM"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white focus:outline-none focus:border-green-400/50 resize-none"
                    placeholder="A brief description of the park..."
                  />
                </div>

                {/* Features */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Features</label>
                  <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 bg-black/20 rounded-lg">
                    {FEATURES.map(feature => (
                      <button
                        key={feature}
                        type="button"
                        onClick={() => toggleFeature(feature)}
                        className={`px-3 py-1 text-sm rounded-full transition-colors ${
                          formData.features.includes(feature)
                            ? 'bg-green-500 text-white'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        {feature}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Verified Toggle */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, is_verified: !formData.is_verified })}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      formData.is_verified ? 'bg-green-500' : 'bg-white/10'
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        formData.is_verified ? 'translate-x-6' : ''
                      }`}
                    />
                  </button>
                  <span className="text-white">Verified Park</span>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 p-6 border-t border-white/10">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  {editingPark ? 'Update Park' : 'Create Park'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#1A1A2E] border border-white/10 rounded-2xl p-6 max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-white mb-2">Delete Park?</h3>
              <p className="text-gray-400 mb-6">
                This will remove the park from the public directory. This action can be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-6 right-6 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 ${
              toast.type === 'success' 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'
            }`}
          >
            {toast.type === 'success' ? (
              <Check className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
