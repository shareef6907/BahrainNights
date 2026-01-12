'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Search,
  MapPin,
  Phone,
  Globe,
  Star,
  ExternalLink,
  Check,
  X,
  RefreshCw,
  Eye,
  Tag,
  Clock,
  AlertCircle,
  Play,
  Loader2,
} from 'lucide-react';

interface DiscoveredVenue {
  id: string;
  google_place_id: string;
  name: string;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  rating: number | null;
  total_ratings: number | null;
  phone: string | null;
  website: string | null;
  google_maps_url: string | null;
  photo_reference: string | null;
  category: string;
  suggested_tags: string[];
  status: 'pending' | 'approved' | 'rejected';
  admin_notes: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
}

interface AgentStats {
  pending: number;
  approved: number;
  rejected: number;
  total: number;
  lastRun: string | null;
}

export default function AdminDiscoveredVenuesPage() {
  const router = useRouter();
  const [venues, setVenues] = useState<DiscoveredVenue[]>([]);
  const [stats, setStats] = useState<AgentStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [runningAgent, setRunningAgent] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedVenue, setSelectedVenue] = useState<DiscoveredVenue | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  const [processing, setProcessing] = useState(false);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'restaurant', label: 'Restaurants' },
    { value: 'cafe', label: 'Cafes' },
    { value: 'lounge', label: 'Lounges & Bars' },
    { value: 'nightclub', label: 'Nightclubs' },
    { value: 'spa', label: 'Spas' },
    { value: 'hotel', label: 'Hotels' },
  ];

  const fetchVenues = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter && statusFilter !== 'all') {
        params.set('status', statusFilter);
      }
      if (categoryFilter && categoryFilter !== 'all') {
        params.set('category', categoryFilter);
      }

      const response = await fetch(`/api/admin/discovered-venues?${params.toString()}`);
      if (response.status === 401) {
        router.push('/admin/login');
        return;
      }
      const data = await response.json();
      setVenues(data.venues || []);
    } catch (error) {
      console.error('Error fetching discovered venues:', error);
    }
  }, [statusFilter, categoryFilter, router]);

  const fetchStats = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/discovered-venues/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchVenues(), fetchStats()]);
      setLoading(false);
    };
    loadData();
  }, [fetchVenues, fetchStats]);

  const runDiscoveryAgent = async () => {
    if (runningAgent) return;

    setRunningAgent(true);
    try {
      const response = await fetch('/api/admin/discovery-agent/run', {
        method: 'POST',
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Discovery complete!\n\nDiscovered: ${result.totalDiscovered} new venues\nDuplicates skipped: ${result.totalDuplicates}\nErrors: ${result.errors?.length || 0}`);
        await fetchVenues();
        await fetchStats();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'Failed to run discovery agent'}`);
      }
    } catch (error) {
      console.error('Error running discovery agent:', error);
      alert('Failed to run discovery agent');
    } finally {
      setRunningAgent(false);
    }
  };

  const handleReview = async (status: 'approved' | 'rejected') => {
    if (!selectedVenue || processing) return;

    setProcessing(true);
    try {
      const response = await fetch(`/api/admin/discovered-venues/${selectedVenue.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, admin_notes: adminNotes }),
      });

      if (response.ok) {
        setShowReviewModal(false);
        setSelectedVenue(null);
        setAdminNotes('');
        await fetchVenues();
        await fetchStats();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'Failed to update venue'}`);
      }
    } catch (error) {
      console.error('Error updating venue:', error);
      alert('Failed to update venue');
    } finally {
      setProcessing(false);
    }
  };

  const filteredVenues = venues.filter((venue) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        venue.name.toLowerCase().includes(query) ||
        venue.address?.toLowerCase().includes(query) ||
        venue.category.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'approved':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'rejected':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getGooglePhotoUrl = (photoReference: string | null) => {
    if (!photoReference) return null;
    return `/api/proxy/google-photo?reference=${encodeURIComponent(photoReference)}`;
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-amber-500">Discovered Venues</h1>
            <p className="text-gray-400 mt-1">
              Review venues discovered by the AI agent from Google Maps
            </p>
          </div>
          <button
            onClick={runDiscoveryAgent}
            disabled={runningAgent}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {runningAgent ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Running Discovery...
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                Run Discovery Agent
              </>
            )}
          </button>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <div className="text-sm text-gray-400">Total Discovered</div>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 border border-yellow-500/30">
              <div className="text-2xl font-bold text-yellow-400">{stats.pending}</div>
              <div className="text-sm text-gray-400">Pending Review</div>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 border border-green-500/30">
              <div className="text-2xl font-bold text-green-400">{stats.approved}</div>
              <div className="text-sm text-gray-400">Approved</div>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 border border-red-500/30">
              <div className="text-2xl font-bold text-red-400">{stats.rejected}</div>
              <div className="text-sm text-gray-400">Rejected</div>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
              <div className="text-sm font-medium text-white">
                {stats.lastRun ? formatDate(stats.lastRun) : 'Never'}
              </div>
              <div className="text-sm text-gray-400">Last Agent Run</div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Status Tabs */}
          <div className="flex gap-2">
            {['pending', 'approved', 'rejected', 'all'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  statusFilter === status
                    ? 'bg-amber-500 text-black'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>

          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search venues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Refresh */}
          <button
            onClick={() => {
              fetchVenues();
              fetchStats();
            }}
            className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>

        {/* Venues Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
          </div>
        ) : filteredVenues.length === 0 ? (
          <div className="text-center py-20 bg-gray-900 rounded-lg border border-gray-800">
            <AlertCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No discovered venues found</p>
            <p className="text-sm text-gray-500 mt-2">
              Run the discovery agent to find new venues
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVenues.map((venue) => (
              <div
                key={venue.id}
                className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden hover:border-gray-700 transition-colors"
              >
                {/* Photo */}
                <div className="relative h-48 bg-gray-800">
                  {venue.photo_reference ? (
                    <Image
                      src={getGooglePhotoUrl(venue.photo_reference) || ''}
                      alt={venue.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <MapPin className="w-12 h-12 text-gray-600" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded border ${getStatusColor(
                        venue.status
                      )}`}
                    >
                      {venue.status}
                    </span>
                  </div>
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-1 text-xs font-medium bg-black/60 text-white rounded">
                      {venue.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">
                    {venue.name}
                  </h3>

                  {venue.address && (
                    <div className="flex items-start gap-2 text-sm text-gray-400 mb-2">
                      <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                      <span className="line-clamp-2">{venue.address}</span>
                    </div>
                  )}

                  {venue.rating && (
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-white font-medium">{venue.rating}</span>
                      <span className="text-gray-500">({venue.total_ratings} reviews)</span>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {venue.suggested_tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs bg-gray-800 text-gray-300 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedVenue(venue);
                        setAdminNotes(venue.admin_notes || '');
                        setShowReviewModal(true);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      Review
                    </button>
                    {venue.google_maps_url && (
                      <a
                        href={venue.google_maps_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review Modal */}
      {showReviewModal && selectedVenue && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h2 className="text-xl font-bold text-white">Review Venue</h2>
              <button
                onClick={() => {
                  setShowReviewModal(false);
                  setSelectedVenue(null);
                  setAdminNotes('');
                }}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Photo */}
              {selectedVenue.photo_reference && (
                <div className="relative h-64 bg-gray-800 rounded-lg overflow-hidden">
                  <Image
                    src={getGooglePhotoUrl(selectedVenue.photo_reference) || ''}
                    alt={selectedVenue.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Venue Info */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{selectedVenue.name}</h3>
                <span
                  className={`inline-block px-3 py-1 text-sm font-medium rounded border ${getStatusColor(
                    selectedVenue.status
                  )}`}
                >
                  {selectedVenue.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Tag className="w-4 h-4 text-amber-500" />
                    <span className="font-medium">Category:</span>
                    <span>{selectedVenue.category}</span>
                  </div>

                  {selectedVenue.address && (
                    <div className="flex items-start gap-2 text-gray-300">
                      <MapPin className="w-4 h-4 mt-1 text-amber-500" />
                      <span>{selectedVenue.address}</span>
                    </div>
                  )}

                  {selectedVenue.phone && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <Phone className="w-4 h-4 text-amber-500" />
                      <span>{selectedVenue.phone}</span>
                    </div>
                  )}

                  {selectedVenue.website && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <Globe className="w-4 h-4 text-amber-500" />
                      <a
                        href={selectedVenue.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-400 hover:underline truncate"
                      >
                        {selectedVenue.website}
                      </a>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  {selectedVenue.rating && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="font-medium">{selectedVenue.rating}</span>
                      <span className="text-gray-500">
                        ({selectedVenue.total_ratings} reviews)
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-gray-300">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span>Discovered: {formatDate(selectedVenue.created_at)}</span>
                  </div>

                  {selectedVenue.google_maps_url && (
                    <a
                      href={selectedVenue.google_maps_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-amber-400 hover:underline"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View on Google Maps
                    </a>
                  )}
                </div>
              </div>

              {/* Suggested Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Suggested Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {selectedVenue.suggested_tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Admin Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Admin Notes
                </label>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add any notes about this venue..."
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 p-6 border-t border-gray-800">
              <button
                onClick={() => {
                  setShowReviewModal(false);
                  setSelectedVenue(null);
                  setAdminNotes('');
                }}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReview('rejected')}
                disabled={processing}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                <X className="w-4 h-4" />
                Reject
              </button>
              <button
                onClick={() => handleReview('approved')}
                disabled={processing}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {processing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
                Approve & Create Venue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
