'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import {
  Search,
  Eye,
  Edit,
  Trash2,
  Star,
  StarOff,
  Loader2,
  RefreshCw,
  MapPin,
  Clock,
  DollarSign,
  X,
  Plus,
  CheckCircle,
  XCircle,
} from 'lucide-react';

interface Attraction {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category: string;
  area: string | null;
  price_range: string | null;
  price_from: number | null;
  duration: string | null;
  image_url: string | null;
  tripadvisor_rating: number | null;
  tripadvisor_reviews: number | null;
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

export default function AdminAttractionsPage() {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showActive, setShowActive] = useState<'all' | 'active' | 'inactive'>('all');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);

  const categories = ['all', 'Family & Kids', 'Cultural', 'Nature', 'Adventure', 'Historical', 'Entertainment', 'Shopping'];

  const fetchAttractions = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('attractions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAttractions(data || []);
    } catch (error) {
      console.error('Error fetching attractions:', error);
      setToast({ message: 'Failed to load attractions', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAttractions();
  }, [fetchAttractions]);

  const toggleFeatured = async (attraction: Attraction) => {
    try {
      const { error } = await supabase
        .from('attractions')
        .update({ is_featured: !attraction.is_featured })
        .eq('id', attraction.id);

      if (error) throw error;
      setAttractions(prev =>
        prev.map(a => a.id === attraction.id ? { ...a, is_featured: !a.is_featured } : a)
      );
      setToast({ message: `${attraction.is_featured ? 'Removed from' : 'Added to'} featured`, type: 'success' });
    } catch (error) {
      console.error('Error toggling featured:', error);
      setToast({ message: 'Failed to update', type: 'error' });
    }
  };

  const toggleActive = async (attraction: Attraction) => {
    try {
      const { error } = await supabase
        .from('attractions')
        .update({ is_active: !attraction.is_active })
        .eq('id', attraction.id);

      if (error) throw error;
      setAttractions(prev =>
        prev.map(a => a.id === attraction.id ? { ...a, is_active: !a.is_active } : a)
      );
      setToast({ message: `Attraction ${attraction.is_active ? 'deactivated' : 'activated'}`, type: 'success' });
    } catch (error) {
      console.error('Error toggling active:', error);
      setToast({ message: 'Failed to update', type: 'error' });
    }
  };

  const deleteAttraction = async (attraction: Attraction) => {
    if (!confirm(`Delete "${attraction.name}"? This cannot be undone.`)) return;

    try {
      const { error } = await supabase
        .from('attractions')
        .delete()
        .eq('id', attraction.id);

      if (error) throw error;
      setAttractions(prev => prev.filter(a => a.id !== attraction.id));
      setToast({ message: 'Attraction deleted', type: 'success' });
    } catch (error) {
      console.error('Error deleting attraction:', error);
      setToast({ message: 'Failed to delete', type: 'error' });
    }
  };

  const filteredAttractions = attractions.filter(attraction => {
    const matchesSearch = searchQuery
      ? attraction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        attraction.area?.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesCategory = selectedCategory === 'all' || attraction.category === selectedCategory;
    const matchesActive = showActive === 'all' ||
      (showActive === 'active' && attraction.is_active) ||
      (showActive === 'inactive' && !attraction.is_active);
    return matchesSearch && matchesCategory && matchesActive;
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
          <h1 className="text-2xl font-bold text-white">Attractions</h1>
          <p className="text-gray-400">Manage family-friendly attractions and things to do</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchAttractions}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={() => window.open('/family-kids', '_blank')}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 rounded-lg text-black font-medium transition-colors"
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
              placeholder="Search attractions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
            ))}
          </select>

          {/* Active Filter */}
          <select
            value={showActive}
            onChange={(e) => setShowActive(e.target.value as typeof showActive)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
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
          <p className="text-2xl font-bold text-white">{attractions.length}</p>
        </div>
        <div className="bg-[#1A1A2E] rounded-xl p-4 border border-white/10">
          <p className="text-gray-400 text-sm">Active</p>
          <p className="text-2xl font-bold text-green-400">{attractions.filter(a => a.is_active).length}</p>
        </div>
        <div className="bg-[#1A1A2E] rounded-xl p-4 border border-white/10">
          <p className="text-gray-400 text-sm">Featured</p>
          <p className="text-2xl font-bold text-amber-400">{attractions.filter(a => a.is_featured).length}</p>
        </div>
        <div className="bg-[#1A1A2E] rounded-xl p-4 border border-white/10">
          <p className="text-gray-400 text-sm">From TripAdvisor</p>
          <p className="text-2xl font-bold text-blue-400">{attractions.filter(a => a.source === 'tripadvisor').length}</p>
        </div>
      </div>

      {/* Attractions List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
        </div>
      ) : filteredAttractions.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400">No attractions found</p>
        </div>
      ) : (
        <div className="bg-[#1A1A2E] rounded-xl border border-white/10 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-gray-400 font-medium">Attraction</th>
                <th className="text-left p-4 text-gray-400 font-medium hidden md:table-cell">Category</th>
                <th className="text-left p-4 text-gray-400 font-medium hidden lg:table-cell">Area</th>
                <th className="text-left p-4 text-gray-400 font-medium hidden lg:table-cell">Rating</th>
                <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                <th className="text-right p-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttractions.map((attraction) => (
                <tr key={attraction.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        {attraction.image_url ? (
                          <Image
                            src={attraction.image_url}
                            alt={attraction.name}
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
                        <p className="text-white font-medium">{attraction.name}</p>
                        <p className="text-gray-400 text-sm">{attraction.duration || 'Duration not set'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <span className="px-2 py-1 bg-gray-700 rounded text-gray-300 text-sm">
                      {attraction.category}
                    </span>
                  </td>
                  <td className="p-4 hidden lg:table-cell text-gray-300">
                    {attraction.area || '-'}
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    {attraction.tripadvisor_rating ? (
                      <div className="flex items-center gap-1 text-amber-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span>{attraction.tripadvisor_rating}</span>
                        <span className="text-gray-500 text-sm">({attraction.tripadvisor_reviews})</span>
                      </div>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${attraction.is_active ? 'bg-green-400' : 'bg-red-400'}`} />
                      <span className="text-gray-300 text-sm">{attraction.is_active ? 'Active' : 'Inactive'}</span>
                      {attraction.is_featured && (
                        <Star className="w-4 h-4 text-amber-400 fill-current" />
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => toggleFeatured(attraction)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        title={attraction.is_featured ? 'Remove from featured' : 'Add to featured'}
                      >
                        {attraction.is_featured ? (
                          <StarOff className="w-4 h-4 text-amber-400" />
                        ) : (
                          <Star className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                      <button
                        onClick={() => toggleActive(attraction)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        title={attraction.is_active ? 'Deactivate' : 'Activate'}
                      >
                        {attraction.is_active ? (
                          <Eye className="w-4 h-4 text-green-400" />
                        ) : (
                          <Eye className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                      <button
                        onClick={() => deleteAttraction(attraction)}
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
