'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Search,
  MoreVertical,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
  Trash2,
  Building2,
  ChevronDown,
  ArrowUpDown,
  Loader2,
  RefreshCw,
} from 'lucide-react';

interface Venue {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  cover_image_url: string | null;
  category: string;
  area: string;
  email: string | null;
  phone: string | null;
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  created_at: string;
  view_count: number;
  like_count: number;
  is_verified: boolean;
  is_featured: boolean;
}

interface VenueCounts {
  total: number;
  all: number;
  pending: number;
  approved: number;
  rejected: number;
  suspended: number;
}

type VenueStatus = 'all' | 'pending' | 'approved' | 'rejected' | 'suspended';

export default function AdminVenuesPage() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [counts, setCounts] = useState<VenueCounts>({
    total: 0,
    all: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    suspended: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<VenueStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [openActionMenu, setOpenActionMenu] = useState<string | null>(null);
  const [selectedVenues, setSelectedVenues] = useState<string[]>([]);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [rejectModal, setRejectModal] = useState<{ venueId: string; venueName: string } | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const categories = ['all', 'Restaurant', 'Cafe', 'Bar', 'Nightclub', 'Hotel', 'Beach Club', 'Lounge'];

  // Fetch venues from API
  const fetchVenues = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (activeTab !== 'all') params.set('status', activeTab);
      if (categoryFilter !== 'all') params.set('category', categoryFilter);
      if (searchQuery) params.set('search', searchQuery);

      const response = await fetch(`/api/admin/venues?${params.toString()}`);

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error('Unauthorized access');
        }
        throw new Error('Failed to fetch venues');
      }

      const data = await response.json();
      setVenues(data.venues || []);
      const countsData = data.counts || { total: 0, pending: 0, approved: 0, rejected: 0, suspended: 0 };
      setCounts({ ...countsData, all: countsData.total });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [activeTab, categoryFilter, searchQuery]);

  useEffect(() => {
    fetchVenues();
  }, [fetchVenues]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchVenues();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, fetchVenues]);

  const handleApprove = async (venueId: string) => {
    setActionLoading(venueId);
    try {
      const response = await fetch(`/api/admin/venues/${venueId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'approve' }),
      });

      if (!response.ok) throw new Error('Failed to approve venue');

      await fetchVenues();
      setOpenActionMenu(null);
    } catch (err) {
      console.error('Error approving venue:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async () => {
    if (!rejectModal || !rejectReason.trim()) return;

    setActionLoading(rejectModal.venueId);
    try {
      const response = await fetch(`/api/admin/venues/${rejectModal.venueId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reject', reason: rejectReason }),
      });

      if (!response.ok) throw new Error('Failed to reject venue');

      await fetchVenues();
      setRejectModal(null);
      setRejectReason('');
      setOpenActionMenu(null);
    } catch (err) {
      console.error('Error rejecting venue:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (venueId: string) => {
    if (!confirm('Are you sure you want to delete this venue? This action cannot be undone.')) {
      return;
    }

    setActionLoading(venueId);
    try {
      const response = await fetch(`/api/admin/venues/${venueId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete venue');

      await fetchVenues();
      setOpenActionMenu(null);
    } catch (err) {
      console.error('Error deleting venue:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleBulkAction = async (action: 'approve' | 'reject' | 'delete') => {
    if (selectedVenues.length === 0) return;

    if (action === 'reject') {
      // Open reject modal for bulk rejection
      setRejectModal({ venueId: 'bulk', venueName: `${selectedVenues.length} venues` });
      return;
    }

    if (action === 'delete') {
      if (!confirm(`Are you sure you want to delete ${selectedVenues.length} venues?`)) {
        return;
      }
    }

    setActionLoading('bulk');
    try {
      const response = await fetch('/api/admin/venues/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          venueIds: selectedVenues,
          reason: rejectReason || undefined,
        }),
      });

      if (!response.ok) throw new Error(`Failed to ${action} venues`);

      await fetchVenues();
      setSelectedVenues([]);
      setRejectModal(null);
      setRejectReason('');
    } catch (err) {
      console.error(`Error performing bulk ${action}:`, err);
    } finally {
      setActionLoading(null);
    }
  };

  const toggleSelectAll = () => {
    if (selectedVenues.length === venues.length) {
      setSelectedVenues([]);
    } else {
      setSelectedVenues(venues.map((v) => v.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedVenues.includes(id)) {
      setSelectedVenues(selectedVenues.filter((v) => v !== id));
    } else {
      setSelectedVenues([...selectedVenues, id]);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-green-500/20 text-green-400 rounded-full">
            Approved
          </span>
        );
      case 'pending':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-orange-500/20 text-orange-400 rounded-full">
            Pending
          </span>
        );
      case 'rejected':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-red-500/20 text-red-400 rounded-full">
            Rejected
          </span>
        );
      case 'suspended':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-gray-500/20 text-gray-400 rounded-full">
            Suspended
          </span>
        );
      default:
        return null;
    }
  };

  const getVenueImage = (venue: Venue) => {
    return venue.logo_url || venue.cover_image_url || '/placeholder-venue.jpg';
  };

  if (error === 'Unauthorized access') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <Building2 className="w-16 h-16 text-red-400 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
        <p className="text-gray-400 mb-4">You don&apos;t have permission to access this page.</p>
        <Link href="/admin" className="px-4 py-2 bg-cyan-500 text-white rounded-lg">
          Go to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Manage Venues</h1>
          <p className="text-gray-400 mt-1">
            {counts.total} total venues ({counts.pending} pending approval)
          </p>
        </div>
        <button
          onClick={() => fetchVenues()}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 border-b border-white/10 pb-px overflow-x-auto"
      >
        {(['all', 'pending', 'approved', 'rejected', 'suspended'] as VenueStatus[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors relative ${
              activeTab === tab
                ? 'text-cyan-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            <span className="ml-2 px-1.5 py-0.5 text-xs bg-white/10 rounded">
              {counts[tab] || 0}
            </span>
            {activeTab === tab && (
              <motion.div
                layoutId="venues-tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400"
              />
            )}
          </button>
        ))}
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search venues by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-cyan-500/50"
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="appearance-none px-4 py-2.5 pr-10 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500/50 cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-[#1A1A2E]">
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Sort */}
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-colors">
          <ArrowUpDown className="w-4 h-4" />
          <span className="text-sm">Sort</span>
        </button>
      </motion.div>

      {/* Bulk Actions */}
      {selectedVenues.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl"
        >
          <span className="text-sm text-cyan-400">
            {selectedVenues.length} selected
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => handleBulkAction('approve')}
              disabled={actionLoading === 'bulk'}
              className="px-3 py-1.5 text-xs bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors disabled:opacity-50"
            >
              Approve Selected
            </button>
            <button
              onClick={() => handleBulkAction('reject')}
              disabled={actionLoading === 'bulk'}
              className="px-3 py-1.5 text-xs bg-orange-500/20 text-orange-400 rounded-lg hover:bg-orange-500/30 transition-colors disabled:opacity-50"
            >
              Reject Selected
            </button>
            <button
              onClick={() => handleBulkAction('delete')}
              disabled={actionLoading === 'bulk'}
              className="px-3 py-1.5 text-xs bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors disabled:opacity-50"
            >
              Delete Selected
            </button>
          </div>
          {actionLoading === 'bulk' && (
            <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
          )}
        </motion.div>
      )}

      {/* Loading State */}
      {isLoading && venues.length === 0 && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
        </div>
      )}

      {/* Error State */}
      {error && error !== 'Unauthorized access' && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
          {error}
        </div>
      )}

      {/* Table */}
      {!isLoading && !error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
        >
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4">
                    <input
                      type="checkbox"
                      checked={selectedVenues.length === venues.length && venues.length > 0}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-white/30 bg-white/5 text-cyan-500 focus:ring-cyan-500/50"
                    />
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Venue</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Category</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Area</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Contact</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Stats</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Status</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Registered</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {venues.map((venue) => (
                  <tr
                    key={venue.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedVenues.includes(venue.id)}
                        onChange={() => toggleSelect(venue.id)}
                        className="w-4 h-4 rounded border-white/30 bg-white/5 text-cyan-500 focus:ring-cyan-500/50"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/10">
                          <Image
                            src={getVenueImage(venue)}
                            alt={venue.name}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <span className="font-medium text-white">{venue.name}</span>
                          {venue.is_verified && (
                            <span className="ml-2 text-xs text-blue-400">Verified</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-300">{venue.category}</td>
                    <td className="p-4 text-gray-300">{venue.area}</td>
                    <td className="p-4 text-gray-400 text-sm">
                      <div>{venue.email || '-'}</div>
                      <div className="text-xs">{venue.phone || '-'}</div>
                    </td>
                    <td className="p-4 text-gray-400 text-sm">
                      <div>{venue.view_count} views</div>
                      <div className="text-xs">{venue.like_count} likes</div>
                    </td>
                    <td className="p-4">{getStatusBadge(venue.status)}</td>
                    <td className="p-4 text-gray-400 text-sm">
                      {new Date(venue.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="relative">
                        <button
                          onClick={() =>
                            setOpenActionMenu(openActionMenu === venue.id ? null : venue.id)
                          }
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                          {actionLoading === venue.id ? (
                            <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                          ) : (
                            <MoreVertical className="w-4 h-4 text-gray-400" />
                          )}
                        </button>

                        {openActionMenu === venue.id && (
                          <>
                            <div
                              className="fixed inset-0 z-40"
                              onClick={() => setOpenActionMenu(null)}
                            />
                            <div className="absolute right-0 mt-1 w-48 bg-[#1A1A2E] border border-white/10 rounded-xl shadow-xl z-50 py-1">
                              <Link
                                href={`/venues/${venue.slug}`}
                                target="_blank"
                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5"
                              >
                                <Eye className="w-4 h-4" />
                                View Public Page
                              </Link>
                              <Link
                                href={`/admin/venues/${venue.id}`}
                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5"
                              >
                                <Edit className="w-4 h-4" />
                                Edit Details
                              </Link>
                              {venue.status === 'pending' && (
                                <>
                                  <button
                                    onClick={() => handleApprove(venue.id)}
                                    disabled={actionLoading === venue.id}
                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-green-400 hover:bg-green-500/10 disabled:opacity-50"
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => setRejectModal({ venueId: venue.id, venueName: venue.name })}
                                    disabled={actionLoading === venue.id}
                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-orange-400 hover:bg-orange-500/10 disabled:opacity-50"
                                  >
                                    <XCircle className="w-4 h-4" />
                                    Reject
                                  </button>
                                </>
                              )}
                              <div className="my-1 border-t border-white/10" />
                              <button
                                onClick={() => handleDelete(venue.id)}
                                disabled={actionLoading === venue.id}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 disabled:opacity-50"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-white/10">
            {venues.map((venue) => (
              <div key={venue.id} className="p-4">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={selectedVenues.includes(venue.id)}
                    onChange={() => toggleSelect(venue.id)}
                    className="mt-1 w-4 h-4 rounded border-white/30 bg-white/5 text-cyan-500"
                  />
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/10">
                    <Image
                      src={getVenueImage(venue)}
                      alt={venue.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-white">{venue.name}</h3>
                        <p className="text-sm text-gray-400">{venue.category}</p>
                      </div>
                      {getStatusBadge(venue.status)}
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      <p>{venue.area} &middot; {venue.view_count} views &middot; {venue.like_count} likes</p>
                      <p className="mt-1">{venue.email || venue.phone || 'No contact'}</p>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Link
                        href={`/admin/venues/${venue.id}`}
                        className="px-3 py-1.5 text-xs bg-cyan-500/20 text-cyan-400 rounded-lg"
                      >
                        View
                      </Link>
                      {venue.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(venue.id)}
                            disabled={actionLoading === venue.id}
                            className="px-3 py-1.5 text-xs bg-green-500/20 text-green-400 rounded-lg disabled:opacity-50"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => setRejectModal({ venueId: venue.id, venueName: venue.name })}
                            disabled={actionLoading === venue.id}
                            className="px-3 py-1.5 text-xs bg-orange-500/20 text-orange-400 rounded-lg disabled:opacity-50"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {venues.length === 0 && (
            <div className="p-12 text-center">
              <Building2 className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No venues found</h3>
              <p className="text-gray-400">
                {searchQuery || categoryFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria'
                  : 'No venues have been registered yet'}
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* Reject Modal */}
      {rejectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1A1A2E] border border-white/10 rounded-2xl p-6 max-w-md w-full"
          >
            <h3 className="text-lg font-bold text-white mb-2">
              Reject {rejectModal.venueName}
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Please provide a reason for rejecting this venue. This will be sent to the venue owner.
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter rejection reason..."
              rows={4}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-red-500/50 resize-none"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => {
                  setRejectModal(null);
                  setRejectReason('');
                }}
                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (rejectModal.venueId === 'bulk') {
                    handleBulkAction('reject');
                  } else {
                    handleReject();
                  }
                }}
                disabled={!rejectReason.trim() || actionLoading !== null}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {actionLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                Reject
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
