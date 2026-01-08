'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Star,
  Search,
  Building2,
  Heart,
  Loader2,
  CheckCircle,
  XCircle,
  Filter,
} from 'lucide-react';

interface Venue {
  id: string;
  name: string;
  slug: string;
  category: string;
  area: string;
  logo_url: string | null;
  cover_image_url: string | null;
  is_featured: boolean;
  like_count: number;
  status: string;
}

export default function FeaturedListingsPage() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [updating, setUpdating] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // All venue categories including explore categories
  const categories = [
    'all',
    'restaurant',
    'cafe',
    'lounge',
    'bar',
    'club',
    'hotel',
    'spa',
    'gym',
    'salon',
    'shopping',
    'tour',
    'kids',
    'community',
    'other',
  ];

  // Mapping for explore page categories
  const exploreCategoryMapping: Record<string, string[]> = {
    hotels: ['hotel', 'resort', 'staycation'],
    spas: ['spa', 'wellness', 'massage', 'gym', 'salon', 'spa & wellness', 'fitness center'],
    shopping: ['shopping', 'market', 'mall', 'retail', 'shopping mall', 'mall outlet'],
    tours: ['tour', 'experience', 'adventure'],
    kids: ['kids', 'family', 'entertainment', 'waterpark', 'entertainment venue'],
    community: ['community', 'charity', 'volunteer', 'cultural center'],
  };

  // Get explore category for a venue
  const getExploreCategory = (venueCategory: string): string | null => {
    for (const [exploreCategory, venueCategories] of Object.entries(exploreCategoryMapping)) {
      if (venueCategories.includes(venueCategory.toLowerCase())) {
        return exploreCategory;
      }
    }
    return null;
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  async function fetchVenues() {
    try {
      const response = await fetch('/api/admin/featured');
      if (response.ok) {
        const data = await response.json();
        setVenues(data.venues || []);
      }
    } catch (error) {
      console.error('Failed to fetch venues:', error);
    } finally {
      setLoading(false);
    }
  }

  async function toggleFeatured(venueId: string, currentStatus: boolean) {
    setUpdating(venueId);
    setMessage(null);

    try {
      const response = await fetch('/api/admin/featured', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ venueId, is_featured: !currentStatus }),
      });

      if (response.ok) {
        setVenues(prev =>
          prev.map(v =>
            v.id === venueId ? { ...v, is_featured: !currentStatus } : v
          )
        );
        setMessage({
          type: 'success',
          text: `Venue ${!currentStatus ? 'featured' : 'unfeatured'} successfully!`,
        });
      } else {
        setMessage({ type: 'error', text: 'Failed to update venue' });
      }
    } catch (error) {
      console.error('Error updating venue:', error);
      setMessage({ type: 'error', text: 'Failed to update venue' });
    } finally {
      setUpdating(null);
      setTimeout(() => setMessage(null), 3000);
    }
  }

  const filteredVenues = venues
    .filter(v => {
      const matchesSearch =
        v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.area.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === 'all' || v.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      // Featured venues first, then by like count
      if (a.is_featured && !b.is_featured) return -1;
      if (!a.is_featured && b.is_featured) return 1;
      return b.like_count - a.like_count;
    });

  const featuredCount = venues.filter(v => v.is_featured).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-yellow-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-3">
            <Star className="w-8 h-8 text-yellow-400" />
            Featured Listings
          </h1>
          <p className="text-gray-400 mt-1">
            Manage which venues appear at the top of their category with a featured badge
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-yellow-400/10 border border-yellow-400/20 rounded-xl">
          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          <span className="text-yellow-400 font-semibold">{featuredCount} Featured</span>
        </div>
      </div>

      {/* Message */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex items-center gap-3 p-4 rounded-xl ${
            message.type === 'success'
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <XCircle className="w-5 h-5" />
          )}
          <span>{message.text}</span>
        </motion.div>
      )}

      {/* Info Box */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
        <h3 className="text-blue-400 font-semibold mb-2">How Featured Listings Work</h3>
        <ul className="text-gray-400 text-sm space-y-1">
          <li>• Featured venues appear at the top of their category on the Places page</li>
          <li>• Featured venues also appear on the <strong className="text-blue-300">Explore page</strong> under their category</li>
          <li>• Featured venues display a special badge on their listing</li>
          <li>• If multiple venues are featured in the same category, they are sorted by likes</li>
        </ul>
        <div className="mt-3 pt-3 border-t border-blue-500/20">
          <p className="text-blue-300 text-sm font-medium mb-2">Explore Page Categories:</p>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded">Hotels: hotel, resort</span>
            <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded">Spa: spa, gym, salon</span>
            <span className="px-2 py-1 bg-amber-500/20 text-amber-300 rounded">Shopping: shopping, market</span>
            <span className="px-2 py-1 bg-teal-500/20 text-teal-300 rounded">Tours: tour, experience</span>
            <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded">Kids: kids, family</span>
            <span className="px-2 py-1 bg-orange-500/20 text-orange-300 rounded">Community: community, charity</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search venues..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="pl-10 pr-8 py-3 bg-white/5 border border-white/10 rounded-xl text-white appearance-none focus:outline-none focus:border-yellow-400/50 cursor-pointer"
          >
            {categories.map(cat => (
              <option key={cat} value={cat} className="bg-slate-900">
                {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Venues List */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-gray-400 font-medium px-6 py-4">Venue</th>
                <th className="text-left text-gray-400 font-medium px-6 py-4">Category</th>
                <th className="text-left text-gray-400 font-medium px-6 py-4">Explore</th>
                <th className="text-left text-gray-400 font-medium px-6 py-4">Area</th>
                <th className="text-center text-gray-400 font-medium px-6 py-4">Likes</th>
                <th className="text-center text-gray-400 font-medium px-6 py-4">Status</th>
                <th className="text-center text-gray-400 font-medium px-6 py-4">Featured</th>
              </tr>
            </thead>
            <tbody>
              {filteredVenues.map(venue => (
                <tr
                  key={venue.id}
                  className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                    venue.is_featured ? 'bg-yellow-400/5' : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
                        {venue.logo_url || venue.cover_image_url ? (
                          <img
                            src={venue.logo_url || venue.cover_image_url || ''}
                            alt={venue.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-gray-500" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-white font-medium">{venue.name}</p>
                        {venue.is_featured && (
                          <span className="inline-flex items-center gap-1 text-xs text-yellow-400">
                            <Star className="w-3 h-3 fill-yellow-400" />
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-white/10 rounded text-sm text-gray-300 capitalize">
                      {venue.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {(() => {
                      const exploreCategory = getExploreCategory(venue.category);
                      if (!exploreCategory) return <span className="text-gray-600">-</span>;
                      const colors: Record<string, string> = {
                        hotels: 'bg-blue-500/20 text-blue-300',
                        spas: 'bg-purple-500/20 text-purple-300',
                        shopping: 'bg-amber-500/20 text-amber-300',
                        tours: 'bg-teal-500/20 text-teal-300',
                        kids: 'bg-green-500/20 text-green-300',
                        community: 'bg-orange-500/20 text-orange-300',
                      };
                      return (
                        <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${colors[exploreCategory] || 'bg-gray-500/20 text-gray-300'}`}>
                          {exploreCategory}
                        </span>
                      );
                    })()}
                  </td>
                  <td className="px-6 py-4 text-gray-400">{venue.area}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-1 text-pink-400">
                      <Heart className="w-4 h-4 fill-pink-400" />
                      <span>{venue.like_count}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        venue.status === 'approved'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {venue.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => toggleFeatured(venue.id, venue.is_featured)}
                      disabled={updating === venue.id}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        venue.is_featured
                          ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                          : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
                      } disabled:opacity-50`}
                    >
                      {updating === venue.id ? (
                        <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                      ) : venue.is_featured ? (
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-black" />
                          Featured
                        </span>
                      ) : (
                        'Feature'
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredVenues.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No venues found</p>
          </div>
        )}
      </div>
    </div>
  );
}
