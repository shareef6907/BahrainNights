'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  Building2,
  User,
  Crown,
  Medal,
  Clock,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Download,
  ChevronDown,
  ChevronUp,
  Calendar,
  Filter,
  RefreshCw,
  Inbox,
  ArrowUpRight,
  Trash2,
} from 'lucide-react';

interface SponsorInquiry {
  id: string;
  business_name: string;
  contact_name: string;
  email: string;
  phone: string | null;
  preferred_tier: 'golden' | 'silver';
  message: string | null;
  status: 'pending' | 'contacted' | 'converted' | 'rejected';
  created_at: string;
  updated_at: string;
}

interface Stats {
  total: number;
  pending: number;
  contacted: number;
  converted: number;
  rejected: number;
  golden: number;
  silver: number;
}

type StatusFilter = 'all' | 'pending' | 'contacted' | 'converted' | 'rejected';
type TierFilter = 'all' | 'golden' | 'silver';

export default function SponsorInquiriesPage() {
  const [inquiries, setInquiries] = useState<SponsorInquiry[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    pending: 0,
    contacted: 0,
    converted: 0,
    rejected: 0,
    golden: 0,
    silver: 0,
  });
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [tierFilter, setTierFilter] = useState<TierFilter>('all');
  const [expandedMessage, setExpandedMessage] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  useEffect(() => {
    fetchInquiries();
  }, [statusFilter, tierFilter]);

  async function fetchInquiries() {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (tierFilter !== 'all') params.set('tier', tierFilter);

      const response = await fetch(`/api/admin/sponsor-inquiries?${params}`);
      if (response.ok) {
        const data = await response.json();
        setInquiries(data.inquiries || []);
        setStats(data.stats || stats);
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, newStatus: string) {
    try {
      setUpdatingStatus(id);
      const response = await fetch(`/api/admin/sponsor-inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Refresh data
        fetchInquiries();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setUpdatingStatus(null);
    }
  }

  async function deleteInquiry(id: string) {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;

    try {
      const response = await fetch(`/api/admin/sponsor-inquiries/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchInquiries();
      }
    } catch (error) {
      console.error('Error deleting inquiry:', error);
    }
  }

  function exportToCSV() {
    const headers = [
      'Business Name',
      'Contact Name',
      'Email',
      'Phone',
      'Preferred Tier',
      'Message',
      'Status',
      'Date Submitted',
    ];

    const rows = inquiries.map((inquiry) => [
      inquiry.business_name,
      inquiry.contact_name,
      inquiry.email,
      inquiry.phone || '',
      inquiry.preferred_tier,
      inquiry.message || '',
      inquiry.status,
      new Date(inquiry.created_at).toLocaleDateString(),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `sponsor-inquiries-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-yellow-500/20 text-yellow-400 rounded-full">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
      case 'contacted':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-400 rounded-full">
            <Mail className="w-3 h-3" />
            Contacted
          </span>
        );
      case 'converted':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-green-500/20 text-green-400 rounded-full">
            <CheckCircle2 className="w-3 h-3" />
            Converted
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-red-500/20 text-red-400 rounded-full">
            <XCircle className="w-3 h-3" />
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'golden':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-amber-500/20 text-amber-400 rounded-full">
            <Crown className="w-3 h-3" />
            Golden
          </span>
        );
      case 'silver':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-gray-400/20 text-gray-300 rounded-full">
            <Medal className="w-3 h-3" />
            Silver
          </span>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const truncateMessage = (message: string | null, maxLength: number = 50) => {
    if (!message) return '-';
    if (message.length <= maxLength) return message;
    return message.slice(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
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
          <h1 className="text-2xl font-bold text-white">Sponsor Inquiries</h1>
          <p className="text-gray-400 mt-1">
            Manage sponsorship inquiry submissions
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchInquiries}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-medium transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button
            onClick={exportToCSV}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black rounded-lg font-medium transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <Inbox className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Inquiries</p>
              <p className="text-xl font-bold text-white">{stats.total}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Pending</p>
              <p className="text-xl font-bold text-white">{stats.pending}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Mail className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Contacted</p>
              <p className="text-xl font-bold text-white">{stats.contacted}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <ArrowUpRight className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Converted</p>
              <p className="text-xl font-bold text-white">{stats.converted}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Summary Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4"
      >
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <span className="text-white font-medium">{stats.total} Total Inquiries</span>
          <span className="text-gray-500">|</span>
          <span className="text-yellow-400">{stats.pending} Pending</span>
          <span className="text-gray-500">|</span>
          <span className="text-blue-400">{stats.contacted} Contacted</span>
          <span className="text-gray-500">|</span>
          <span className="text-green-400">{stats.converted} Converted</span>
          <span className="text-gray-500">|</span>
          <span className="text-amber-400">{stats.golden} Golden</span>
          <span className="text-gray-500">|</span>
          <span className="text-gray-300">{stats.silver} Silver</span>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="flex flex-wrap gap-4 items-center"
      >
        <div className="flex items-center gap-2 text-gray-400">
          <Filter className="w-4 h-4" />
          <span className="text-sm">Filters:</span>
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
          className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="contacted">Contacted</option>
          <option value="converted">Converted</option>
          <option value="rejected">Rejected</option>
        </select>

        {/* Tier Filter */}
        <select
          value={tierFilter}
          onChange={(e) => setTierFilter(e.target.value as TierFilter)}
          className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
        >
          <option value="all">All Tiers</option>
          <option value="golden">Golden Only</option>
          <option value="silver">Silver Only</option>
        </select>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
      >
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-sm font-medium text-gray-400">Business</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Contact</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Email</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Phone</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Tier</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Message</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Status</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Date</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inquiry) => (
                <tr
                  key={inquiry.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-white">{inquiry.business_name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-300">{inquiry.contact_name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <a
                      href={`mailto:${inquiry.email}`}
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      {inquiry.email}
                    </a>
                  </td>
                  <td className="p-4">
                    {inquiry.phone ? (
                      <a
                        href={`tel:${inquiry.phone}`}
                        className="text-gray-300 hover:text-white transition-colors flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3" />
                        {inquiry.phone}
                      </a>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </td>
                  <td className="p-4">{getTierBadge(inquiry.preferred_tier)}</td>
                  <td className="p-4 max-w-[200px]">
                    {inquiry.message ? (
                      <div className="relative">
                        <p className="text-gray-400 text-sm">
                          {expandedMessage === inquiry.id
                            ? inquiry.message
                            : truncateMessage(inquiry.message)}
                        </p>
                        {inquiry.message && inquiry.message.length > 50 && (
                          <button
                            onClick={() =>
                              setExpandedMessage(
                                expandedMessage === inquiry.id ? null : inquiry.id
                              )
                            }
                            className="text-xs text-cyan-400 hover:text-cyan-300 mt-1 flex items-center gap-1"
                          >
                            {expandedMessage === inquiry.id ? (
                              <>
                                <ChevronUp className="w-3 h-3" />
                                Show less
                              </>
                            ) : (
                              <>
                                <ChevronDown className="w-3 h-3" />
                                Show more
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </td>
                  <td className="p-4">
                    <select
                      value={inquiry.status}
                      onChange={(e) => updateStatus(inquiry.id, e.target.value)}
                      disabled={updatingStatus === inquiry.id}
                      className={`px-2 py-1 text-xs rounded-lg border transition-colors ${
                        inquiry.status === 'pending'
                          ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
                          : inquiry.status === 'contacted'
                          ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                          : inquiry.status === 'converted'
                          ? 'bg-green-500/10 border-green-500/30 text-green-400'
                          : 'bg-red-500/10 border-red-500/30 text-red-400'
                      } ${updatingStatus === inquiry.id ? 'opacity-50' : ''}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="contacted">Contacted</option>
                      <option value="converted">Converted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-gray-400 text-sm">
                      <Calendar className="w-3 h-3" />
                      {formatDate(inquiry.created_at)}
                    </div>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => deleteInquiry(inquiry.id)}
                      className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Delete inquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden divide-y divide-white/10">
          {inquiries.map((inquiry) => (
            <div key={inquiry.id} className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-medium text-white flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gray-500" />
                    {inquiry.business_name}
                  </h3>
                  <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                    <User className="w-3 h-3" />
                    {inquiry.contact_name}
                  </p>
                </div>
                {getTierBadge(inquiry.preferred_tier)}
              </div>

              <div className="flex flex-wrap gap-2 text-sm">
                <a
                  href={`mailto:${inquiry.email}`}
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  {inquiry.email}
                </a>
                {inquiry.phone && (
                  <>
                    <span className="text-gray-600">|</span>
                    <a
                      href={`tel:${inquiry.phone}`}
                      className="text-gray-300 flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" />
                      {inquiry.phone}
                    </a>
                  </>
                )}
              </div>

              {inquiry.message && (
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
                    <MessageSquare className="w-3 h-3" />
                    Message
                  </div>
                  <p className="text-gray-300 text-sm">
                    {expandedMessage === inquiry.id
                      ? inquiry.message
                      : truncateMessage(inquiry.message, 100)}
                  </p>
                  {inquiry.message.length > 100 && (
                    <button
                      onClick={() =>
                        setExpandedMessage(
                          expandedMessage === inquiry.id ? null : inquiry.id
                        )
                      }
                      className="text-xs text-cyan-400 mt-2"
                    >
                      {expandedMessage === inquiry.id ? 'Show less' : 'Show more'}
                    </button>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between gap-2 pt-2">
                <div className="flex items-center gap-2">
                  <select
                    value={inquiry.status}
                    onChange={(e) => updateStatus(inquiry.id, e.target.value)}
                    disabled={updatingStatus === inquiry.id}
                    className="px-2 py-1 text-xs bg-white/5 border border-white/10 rounded-lg text-white"
                  >
                    <option value="pending">Pending</option>
                    <option value="contacted">Contacted</option>
                    <option value="converted">Converted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <button
                    onClick={() => deleteInquiry(inquiry.id)}
                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs text-gray-500">
                  {formatDate(inquiry.created_at)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {inquiries.length === 0 && (
          <div className="p-12 text-center">
            <Inbox className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No inquiries found</h3>
            <p className="text-gray-400 mb-4">
              {statusFilter !== 'all' || tierFilter !== 'all'
                ? 'Try adjusting your filters to see more results.'
                : 'Sponsor inquiries will appear here when submitted.'}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
