'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import {
  Search,
  Eye,
  Trash2,
  Star,
  StarOff,
  Loader2,
  RefreshCw,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
} from 'lucide-react';

interface Tour {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  tour_type: string;
  category: string | null;
  duration: string | null;
  group_size: string | null;
  price_from: number | null;
  currency: string | null;
  image_url: string | null;
  tripadvisor_rating: number | null;
  tripadvisor_reviews: number | null;
  provider_name: string | null;
  is_featured: boolean;
  is_active: boolean;
  source: string | null;
  created_at: string;
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

export default function AdminToursPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [showActive, setShowActive] = useState<'all' | 'active' | 'inactive'>('all');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const tourTypes = ['all', 'Cultural', 'Food', 'Desert', 'Boat', 'Walking', 'Private', 'Photography', 'Day Tours'];

  const fetchTours = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTours(data || []);
    } catch (error) {
      console.error('Error fetching tours:', error);
      setToast({ message: 'Failed to load tours', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTours();
  }, [fetchTours]);

  const toggleFeatured = async (tour: Tour) => {
    try {
      const { error } = await supabase
        .from('tours')
        .update({ is_featured: !tour.is_featured })
        .eq('id', tour.id);

      if (error) throw error;
      setTours(prev =>
        prev.map(t => t.id === tour.id ? { ...t, is_featured: !t.is_featured } : t)
      );
      setToast({ message: `${tour.is_featured ? 'Removed from' : 'Added to'} featured`, type: 'success' });
    } catch (error) {
      console.error('Error toggling featured:', error);
      setToast({ message: 'Failed to update', type: 'error' });
    }
  };

  const toggleActive = async (tour: Tour) => {
    try {
      const { error } = await supabase
        .from('tours')
        .update({ is_active: !tour.is_active })
        .eq('id', tour.id);

      if (error) throw error;
      setTours(prev =>
        prev.map(t => t.id === tour.id ? { ...t, is_active: !t.is_active } : t)
      );
      setToast({ message: `Tour ${tour.is_active ? 'deactivated' : 'activated'}`, type: 'success' });
    } catch (error) {
      console.error('Error toggling active:', error);
      setToast({ message: 'Failed to update', type: 'error' });
    }
  };

  const deleteTour = async (tour: Tour) => {
    if (!confirm(`Delete "${tour.name}"? This cannot be undone.`)) return;

    try {
      const { error } = await supabase
        .from('tours')
        .delete()
        .eq('id', tour.id);

      if (error) throw error;
      setTours(prev => prev.filter(t => t.id !== tour.id));
      setToast({ message: 'Tour deleted', type: 'success' });
    } catch (error) {
      console.error('Error deleting tour:', error);
      setToast({ message: 'Failed to delete', type: 'error' });
    }
  };

  const filteredTours = tours.filter(tour => {
    const matchesSearch = searchQuery
      ? tour.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.provider_name?.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesType = selectedType === 'all' || tour.tour_type === selectedType;
    const matchesActive = showActive === 'all' ||
      (showActive === 'active' && tour.is_active) ||
      (showActive === 'inactive' && !tour.is_active);
    return matchesSearch && matchesType && matchesActive;
  });

  return (
    <div className="min-h-screen bg-[#0D0D1A] p-6">
      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Tours</h1>
          <p className="text-gray-400">Manage tours and experiences</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchTours}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={() => window.open('/tours', '_blank')}
            className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 rounded-lg text-black font-medium transition-colors"
          >
            <Eye className="w-4 h-4" />
            View Page
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#1A1A2E] rounded-xl p-4 mb-6 border border-white/10">
        <div className="flex flex-wrap gap-4">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tours or providers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            />
          </div>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          >
            {tourTypes.map(type => (
              <option key={type} value={type}>{type === 'all' ? 'All Types' : type}</option>
            ))}
          </select>

          {/* Active Filter */}
          <select
            value={showActive}
            onChange={(e) => setShowActive(e.target.value as typeof showActive)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#1A1A2E] rounded-xl p-4 border border-white/10">
          <p className="text-gray-400 text-sm">Total</p>
          <p className="text-2xl font-bold text-white">{tours.length}</p>
        </div>
        <div className="bg-[#1A1A2E] rounded-xl p-4 border border-white/10">
          <p className="text-gray-400 text-sm">Active</p>
          <p className="text-2xl font-bold text-green-400">{tours.filter(t => t.is_active).length}</p>
        </div>
        <div className="bg-[#1A1A2E] rounded-xl p-4 border border-white/10">
          <p className="text-gray-400 text-sm">Featured</p>
          <p className="text-2xl font-bold text-cyan-400">{tours.filter(t => t.is_featured).length}</p>
        </div>
        <div className="bg-[#1A1A2E] rounded-xl p-4 border border-white/10">
          <p className="text-gray-400 text-sm">From TripAdvisor</p>
          <p className="text-2xl font-bold text-blue-400">{tours.filter(t => t.source === 'tripadvisor').length}</p>
        </div>
      </div>

      {/* Tours List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
        </div>
      ) : filteredTours.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400">No tours found</p>
        </div>
      ) : (
        <div className="bg-[#1A1A2E] rounded-xl border border-white/10 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-gray-400 font-medium">Tour</th>
                <th className="text-left p-4 text-gray-400 font-medium hidden md:table-cell">Type</th>
                <th className="text-left p-4 text-gray-400 font-medium hidden lg:table-cell">Provider</th>
                <th className="text-left p-4 text-gray-400 font-medium hidden lg:table-cell">Price</th>
                <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                <th className="text-right p-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTours.map((tour) => (
                <tr key={tour.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        {tour.image_url ? (
                          <Image
                            src={tour.image_url}
                            alt={tour.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-gray-500" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-white font-medium">{tour.name}</p>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <Clock className="w-3 h-3" />
                          <span>{tour.duration || 'Duration not set'}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <span className="px-2 py-1 bg-gray-700 rounded text-gray-300 text-sm">
                      {tour.tour_type}
                    </span>
                  </td>
                  <td className="p-4 hidden lg:table-cell text-gray-300">
                    {tour.provider_name || '-'}
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    {tour.price_from ? (
                      <span className="text-green-400">{tour.currency} {tour.price_from}</span>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${tour.is_active ? 'bg-green-400' : 'bg-red-400'}`} />
                      <span className="text-gray-300 text-sm">{tour.is_active ? 'Active' : 'Inactive'}</span>
                      {tour.is_featured && (
                        <Star className="w-4 h-4 text-cyan-400 fill-current" />
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => toggleFeatured(tour)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        title={tour.is_featured ? 'Remove from featured' : 'Add to featured'}
                      >
                        {tour.is_featured ? (
                          <StarOff className="w-4 h-4 text-cyan-400" />
                        ) : (
                          <Star className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                      <button
                        onClick={() => toggleActive(tour)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        title={tour.is_active ? 'Deactivate' : 'Activate'}
                      >
                        {tour.is_active ? (
                          <Eye className="w-4 h-4 text-green-400" />
                        ) : (
                          <Eye className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                      <button
                        onClick={() => deleteTour(tour)}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
