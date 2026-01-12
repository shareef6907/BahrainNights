'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Phone,
  Instagram,
  Globe,
  User,
  Mail,
  Loader2,
  RefreshCw,
  Eye,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';

interface VenueSubmission {
  id: string;
  venue_name: string;
  category: string;
  description: string | null;
  address: string | null;
  area: string | null;
  phone: string | null;
  instagram: string | null;
  website: string | null;
  google_maps_url: string | null;
  submitter_name: string | null;
  submitter_email: string;
  submitter_phone: string | null;
  is_owner: boolean;
  status: 'pending' | 'approved' | 'rejected';
  admin_notes: string | null;
  venue_id: string | null;
  created_at: string;
}

type SubmissionStatus = 'all' | 'pending' | 'approved' | 'rejected';

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<VenueSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<SubmissionStatus>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<VenueSubmission | null>(null);
  const [adminNotes, setAdminNotes] = useState('');

  const fetchSubmissions = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (activeTab !== 'all') params.set('status', activeTab);

      const response = await fetch(`/api/venue-submissions?${params.toString()}`);

      if (!response.ok) {
        throw new Error('Failed to fetch submissions');
      }

      const data = await response.json();
      setSubmissions(data.submissions || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load submissions');
    } finally {
      setIsLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const handleAction = async (id: string, action: 'approved' | 'rejected') => {
    setActionLoading(id);

    try {
      const response = await fetch(`/api/venue-submissions/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: action,
          admin_notes: adminNotes || null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update submission');
      }

      // Refresh the list
      await fetchSubmissions();
      setSelectedSubmission(null);
      setAdminNotes('');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update submission');
    } finally {
      setActionLoading(null);
    }
  };

  const filteredSubmissions = submissions.filter((submission) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      submission.venue_name.toLowerCase().includes(query) ||
      submission.submitter_email.toLowerCase().includes(query) ||
      submission.submitter_name?.toLowerCase().includes(query) ||
      submission.area?.toLowerCase().includes(query)
    );
  });

  const statusCounts = {
    all: submissions.length,
    pending: submissions.filter((s) => s.status === 'pending').length,
    approved: submissions.filter((s) => s.status === 'approved').length,
    rejected: submissions.filter((s) => s.status === 'rejected').length,
  };

  const tabs: { status: SubmissionStatus; label: string; icon: typeof Clock }[] = [
    { status: 'pending', label: 'Pending', icon: Clock },
    { status: 'approved', label: 'Approved', icon: CheckCircle },
    { status: 'rejected', label: 'Rejected', icon: XCircle },
    { status: 'all', label: 'All', icon: Eye },
  ];

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Venue Submissions</h1>
          <p className="text-gray-400 mt-1">Review and manage venue suggestions from the community</p>
        </div>
        <button
          onClick={fetchSubmissions}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-gray-300 hover:bg-white/20 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Status Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.status}
            onClick={() => setActiveTab(tab.status)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === tab.status
                ? 'bg-yellow-400 text-black'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            <span
              className={`px-2 py-0.5 rounded-full text-xs ${
                activeTab === tab.status ? 'bg-black/20' : 'bg-white/10'
              }`}
            >
              {statusCounts[tab.status]}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by venue name, email, area..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 mb-6 text-red-400">
          {error}
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-yellow-400 animate-spin" />
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredSubmissions.length === 0 && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📭</div>
          <h3 className="text-xl font-semibold text-white mb-2">No submissions found</h3>
          <p className="text-gray-400">
            {activeTab === 'pending'
              ? 'No pending submissions to review'
              : 'No submissions match your search'}
          </p>
        </div>
      )}

      {/* Submissions Grid */}
      {!isLoading && filteredSubmissions.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredSubmissions.map((submission) => (
            <motion.div
              key={submission.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800/50 rounded-xl border border-white/10 overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 border-b border-white/10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-white text-lg">{submission.venue_name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm text-gray-400">{submission.category}</span>
                      {submission.area && (
                        <>
                          <span className="text-gray-600">•</span>
                          <span className="text-sm text-gray-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {submission.area}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      submission.status === 'pending'
                        ? 'bg-yellow-400/20 text-yellow-400'
                        : submission.status === 'approved'
                        ? 'bg-green-400/20 text-green-400'
                        : 'bg-red-400/20 text-red-400'
                    }`}
                  >
                    {submission.status}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="p-4 space-y-3">
                {submission.description && (
                  <p className="text-sm text-gray-400 line-clamp-2">{submission.description}</p>
                )}

                {/* Contact Info */}
                <div className="flex flex-wrap gap-3 text-sm">
                  {submission.phone && (
                    <span className="flex items-center gap-1 text-gray-400">
                      <Phone className="w-3 h-3" />
                      {submission.phone}
                    </span>
                  )}
                  {submission.instagram && (
                    <a
                      href={`https://instagram.com/${submission.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-pink-400 hover:underline"
                    >
                      <Instagram className="w-3 h-3" />
                      @{submission.instagram}
                    </a>
                  )}
                  {submission.website && (
                    <a
                      href={submission.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-400 hover:underline"
                    >
                      <Globe className="w-3 h-3" />
                      Website
                    </a>
                  )}
                  {submission.google_maps_url && (
                    <a
                      href={submission.google_maps_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-green-400 hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Maps
                    </a>
                  )}
                </div>

                {/* Submitter Info */}
                <div className="pt-3 border-t border-white/5">
                  <p className="text-xs text-gray-500 mb-2">Submitted by:</p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-300">
                        {submission.submitter_name || 'Anonymous'}
                      </span>
                      {submission.is_owner && (
                        <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs rounded-full">
                          Owner
                        </span>
                      )}
                    </div>
                    <a
                      href={`mailto:${submission.submitter_email}`}
                      className="flex items-center gap-1 text-sm text-gray-400 hover:text-white"
                    >
                      <Mail className="w-3 h-3" />
                      {submission.submitter_email}
                    </a>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{formatDate(submission.created_at)}</p>
                </div>
              </div>

              {/* Actions */}
              {submission.status === 'pending' && (
                <div className="p-4 bg-white/5 border-t border-white/10 flex items-center gap-3">
                  <button
                    onClick={() => setSelectedSubmission(submission)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-gray-300 hover:bg-white/20 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Review
                  </button>
                  <button
                    onClick={() => handleAction(submission.id, 'approved')}
                    disabled={actionLoading === submission.id}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors disabled:opacity-50"
                  >
                    {actionLoading === submission.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <CheckCircle className="w-4 h-4" />
                    )}
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(submission.id, 'rejected')}
                    disabled={actionLoading === submission.id}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors disabled:opacity-50"
                  >
                    {actionLoading === submission.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <XCircle className="w-4 h-4" />
                    )}
                    Reject
                  </button>
                </div>
              )}

              {/* Approved - Show venue link */}
              {submission.status === 'approved' && submission.venue_id && (
                <div className="p-4 bg-green-500/5 border-t border-white/10">
                  <a
                    href={`/admin/venues`}
                    className="text-sm text-green-400 hover:underline flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Venue created - View in venues
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Review Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">Review Submission</h2>
              <p className="text-gray-400 mt-1">{selectedSubmission.venue_name}</p>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Admin Notes (optional)</label>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows={3}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none resize-none"
                  placeholder="Add notes about this submission..."
                />
              </div>
            </div>

            <div className="p-6 bg-white/5 border-t border-white/10 flex gap-3">
              <button
                onClick={() => {
                  setSelectedSubmission(null);
                  setAdminNotes('');
                }}
                className="flex-1 px-4 py-3 bg-white/10 rounded-lg text-gray-300 hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAction(selectedSubmission.id, 'rejected')}
                disabled={actionLoading === selectedSubmission.id}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors disabled:opacity-50"
              >
                {actionLoading === selectedSubmission.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <XCircle className="w-4 h-4" />
                )}
                Reject
              </button>
              <button
                onClick={() => handleAction(selectedSubmission.id, 'approved')}
                disabled={actionLoading === selectedSubmission.id}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
              >
                {actionLoading === selectedSubmission.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <CheckCircle className="w-4 h-4" />
                )}
                Approve
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
