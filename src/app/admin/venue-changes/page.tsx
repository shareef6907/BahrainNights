'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  RefreshCw,
  Loader2,
  CheckCircle,
  XCircle,
  Eye,
  Clock,
  Building2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface ChangeRequest {
  id: string;
  venue_id: string;
  changes: Record<string, unknown>;
  status: 'pending' | 'approved' | 'rejected';
  rejection_reason?: string;
  reviewed_by?: string;
  reviewed_at?: string;
  submitted_at: string;
  venues?: { name: string };
}

interface Counts {
  pending: number;
  approved: number;
  rejected: number;
  total: number;
}

type TabStatus = 'pending' | 'approved' | 'rejected';

export default function AdminVenueChangesPage() {
  const [requests, setRequests] = useState<ChangeRequest[]>([]);
  const [counts, setCounts] = useState<Counts>({
    pending: 0,
    approved: 0,
    rejected: 0,
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabStatus>('pending');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [expandedRequest, setExpandedRequest] = useState<string | null>(null);
  const [rejectModal, setRejectModal] = useState<{ id: string; venueName: string } | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  // Fetch change requests
  const fetchRequests = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      params.set('status', activeTab);

      const response = await fetch(`/api/admin/venue-changes?${params.toString()}`);

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error('Unauthorized access');
        }
        throw new Error('Failed to fetch change requests');
      }

      const data = await response.json();
      setRequests(data.requests || []);
      setCounts(data.counts || { pending: 0, approved: 0, rejected: 0, total: 0 });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleApprove = async (requestId: string) => {
    setActionLoading(requestId);
    try {
      const response = await fetch(`/api/admin/venue-changes/${requestId}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to approve changes');
      }

      await fetchRequests();
    } catch (err) {
      console.error('Error approving changes:', err);
      alert(err instanceof Error ? err.message : 'Failed to approve changes');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async () => {
    if (!rejectModal) return;

    setActionLoading(rejectModal.id);
    try {
      const response = await fetch(`/api/admin/venue-changes/${rejectModal.id}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: rejectReason }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to reject changes');
      }

      await fetchRequests();
      setRejectModal(null);
      setRejectReason('');
    } catch (err) {
      console.error('Error rejecting changes:', err);
      alert(err instanceof Error ? err.message : 'Failed to reject changes');
    } finally {
      setActionLoading(null);
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
      default:
        return null;
    }
  };

  const formatFieldName = (field: string) => {
    return field
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const formatValue = (value: unknown): string => {
    if (value === null || value === undefined) return '-';
    if (Array.isArray(value)) return value.join(', ') || '-';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  };

  if (error === 'Unauthorized access') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <Building2 className="w-16 h-16 text-red-400 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
        <p className="text-gray-400 mb-4">You don&apos;t have permission to access this page.</p>
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
          <h1 className="text-2xl font-bold text-white">Venue Profile Changes</h1>
          <p className="text-gray-400 mt-1">
            Review and manage venue profile change requests ({counts.pending} pending)
          </p>
        </div>
        <button
          onClick={() => fetchRequests()}
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
        {(['pending', 'approved', 'rejected'] as TabStatus[]).map((tab) => (
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
                layoutId="venue-changes-tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400"
              />
            )}
          </button>
        ))}
      </motion.div>

      {/* Loading State */}
      {isLoading && requests.length === 0 && (
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

      {/* Request List */}
      {!isLoading && !error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {requests.map((request) => (
            <div
              key={request.id}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
            >
              {/* Request Header */}
              <div
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
                onClick={() => setExpandedRequest(expandedRequest === request.id ? null : request.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-yellow-400/20 to-orange-500/20 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{request.venues?.name || 'Unknown Venue'}</h3>
                    <p className="text-sm text-gray-400 flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      Submitted {new Date(request.submitted_at).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(request.status)}
                  {expandedRequest === request.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Request Details */}
              {expandedRequest === request.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-white/10 p-4"
                >
                  {/* Changes */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-300 mb-3">Requested Changes</h4>
                    <div className="bg-white/5 rounded-xl p-4 space-y-3">
                      {Object.entries(request.changes).map(([field, value]) => (
                        <div key={field} className="flex flex-col sm:flex-row sm:items-start gap-2">
                          <span className="text-sm font-medium text-yellow-400 min-w-[150px]">
                            {formatFieldName(field)}:
                          </span>
                          <span className="text-sm text-gray-300 break-all">
                            {formatValue(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rejection Reason */}
                  {request.status === 'rejected' && request.rejection_reason && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
                      <p className="text-sm text-red-400">
                        <strong>Rejection Reason:</strong> {request.rejection_reason}
                      </p>
                    </div>
                  )}

                  {/* Review Info */}
                  {request.reviewed_at && (
                    <div className="mb-4 text-sm text-gray-500">
                      Reviewed on {new Date(request.reviewed_at).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  )}

                  {/* Actions */}
                  {request.status === 'pending' && (
                    <div className="flex gap-3 pt-3 border-t border-white/10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApprove(request.id);
                        }}
                        disabled={actionLoading === request.id}
                        className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-xl hover:bg-green-500/30 transition-colors disabled:opacity-50"
                      >
                        {actionLoading === request.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <CheckCircle className="w-4 h-4" />
                        )}
                        Approve Changes
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setRejectModal({ id: request.id, venueName: request.venues?.name || 'Unknown Venue' });
                        }}
                        disabled={actionLoading === request.id}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-colors disabled:opacity-50"
                      >
                        <XCircle className="w-4 h-4" />
                        Reject
                      </button>
                      <a
                        href={`/admin/venues/${request.venue_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 text-gray-300 rounded-xl hover:bg-white/10 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        View Venue
                      </a>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          ))}

          {/* Empty State */}
          {requests.length === 0 && (
            <div className="p-12 text-center bg-white/5 border border-white/10 rounded-2xl">
              <Building2 className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No change requests</h3>
              <p className="text-gray-400">
                {activeTab === 'pending'
                  ? 'No pending venue profile changes to review.'
                  : `No ${activeTab} change requests found.`}
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
              Reject Changes for {rejectModal.venueName}
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Please provide a reason for rejecting these changes. This will be visible to the venue owner.
            </p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter rejection reason (optional)..."
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
                onClick={handleReject}
                disabled={actionLoading !== null}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {actionLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                Reject Changes
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
