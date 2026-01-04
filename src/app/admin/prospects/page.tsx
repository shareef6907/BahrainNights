'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Plus,
  RefreshCw,
  Loader2,
  AlertCircle,
  CheckCircle,
  Building2,
  Globe,
  Phone,
  Mail,
  MessageSquare,
  TrendingUp,
  Users,
  Target,
  Sparkles,
  ExternalLink,
  ChevronDown,
  X,
  MapPin,
  Calendar,
  Camera,
} from 'lucide-react';

interface Prospect {
  id: string;
  company_name: string;
  website: string | null;
  industry: string | null;
  source: string;
  source_url: string | null;
  ad_content: string | null;
  estimated_budget: string | null;
  relevance_score: number | null;
  status: 'new' | 'contacted' | 'interested' | 'not_interested' | 'converted';
  priority: string | null;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  notes: string | null;
  ai_summary: string | null;
  ai_suggested_approach: string | null;
  ai_enriched: boolean;
  created_at: string;
  contacted_at: string | null;
}

interface ManualEntry {
  id: string;
  company_name: string;
  source_type: string;
  location: string | null;
  description: string | null;
  photo_url: string | null;
  spotted_date: string;
  processed: boolean;
  prospect_id: string | null;
  created_at: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const SOURCES = [
  { value: 'all', label: 'All Sources' },
  { value: 'facebook', label: 'Facebook Ads' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'google_ads', label: 'Google Ads' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'news_site', label: 'News Sites' },
  { value: 'billboard', label: 'Billboard' },
  { value: 'magazine', label: 'Magazine' },
  { value: 'newspaper', label: 'Newspaper' },
  { value: 'manual', label: 'Manual Entry' },
];

const STATUSES = [
  { value: 'all', label: 'All Statuses' },
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'interested', label: 'Interested' },
  { value: 'not_interested', label: 'Not Interested' },
  { value: 'converted', label: 'Converted' },
];

const SOURCE_TYPES = [
  { value: 'billboard', label: 'Billboard' },
  { value: 'magazine', label: 'Magazine' },
  { value: 'newspaper', label: 'Newspaper' },
  { value: 'radio', label: 'Radio' },
  { value: 'tv', label: 'TV' },
  { value: 'other', label: 'Other' },
];

export default function AdminProspectsPage() {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [manualEntries, setManualEntries] = useState<ManualEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [activeTab, setActiveTab] = useState<'prospects' | 'manual'>('prospects');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [showAddManual, setShowAddManual] = useState(false);
  const [processingEntry, setProcessingEntry] = useState<string | null>(null);

  // Manual entry form state
  const [manualForm, setManualForm] = useState({
    company_name: '',
    source_type: 'billboard',
    location: '',
    description: '',
    spotted_date: new Date().toISOString().split('T')[0],
  });

  const fetchProspects = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (sourceFilter !== 'all') params.set('source', sourceFilter);
      if (searchQuery) params.set('search', searchQuery);

      const response = await fetch(`/api/admin/prospects?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch prospects');

      const data = await response.json();
      setProspects(data.prospects);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, sourceFilter, searchQuery]);

  const fetchManualEntries = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/prospects/manual?processed=false');
      if (!response.ok) throw new Error('Failed to fetch manual entries');

      const data = await response.json();
      setManualEntries(data.entries);
    } catch (err) {
      console.error('Failed to fetch manual entries:', err);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'prospects') {
      fetchProspects();
    } else {
      fetchManualEntries();
    }
  }, [activeTab, fetchProspects, fetchManualEntries]);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const updateProspectStatus = async (prospectId: string, status: string) => {
    try {
      const response = await fetch(`/api/admin/prospects/${prospectId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error('Failed to update status');

      showToast('Status updated successfully', 'success');
      fetchProspects();

      if (selectedProspect?.id === prospectId) {
        setSelectedProspect({ ...selectedProspect, status: status as Prospect['status'] });
      }
    } catch (err) {
      showToast('Failed to update status', 'error');
    }
  };

  const handleAddManualEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/prospects/manual', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(manualForm),
      });

      if (!response.ok) throw new Error('Failed to add entry');

      showToast('Entry added successfully', 'success');
      setShowAddManual(false);
      setManualForm({
        company_name: '',
        source_type: 'billboard',
        location: '',
        description: '',
        spotted_date: new Date().toISOString().split('T')[0],
      });
      fetchManualEntries();
    } catch (err) {
      showToast('Failed to add entry', 'error');
    }
  };

  const processManualEntry = async (entryId: string) => {
    try {
      setProcessingEntry(entryId);
      const response = await fetch(`/api/admin/prospects/manual/${entryId}/process`, {
        method: 'POST',
      });

      if (!response.ok) throw new Error('Failed to process entry');

      showToast('Entry processed and prospect created', 'success');
      fetchManualEntries();
      fetchProspects();
    } catch (err) {
      showToast('Failed to process entry', 'error');
    } finally {
      setProcessingEntry(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { bg: string; text: string }> = {
      new: { bg: 'bg-blue-500/20', text: 'text-blue-400' },
      contacted: { bg: 'bg-yellow-500/20', text: 'text-yellow-400' },
      interested: { bg: 'bg-green-500/20', text: 'text-green-400' },
      not_interested: { bg: 'bg-red-500/20', text: 'text-red-400' },
      converted: { bg: 'bg-purple-500/20', text: 'text-purple-400' },
    };
    const badge = badges[status] || badges.new;
    return (
      <span className={`px-2 py-1 text-xs font-medium ${badge.bg} ${badge.text} rounded-full capitalize`}>
        {status.replace('_', ' ')}
      </span>
    );
  };

  const getBudgetBadge = (budget: string | null) => {
    if (!budget) return null;
    const colors: Record<string, string> = {
      small: 'text-gray-400',
      medium: 'text-blue-400',
      large: 'text-green-400',
      enterprise: 'text-purple-400',
    };
    return (
      <span className={`text-xs ${colors[budget] || 'text-gray-400'} capitalize`}>
        {budget}
      </span>
    );
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'facebook':
        return '📘';
      case 'instagram':
        return '📸';
      case 'google_ads':
        return '🔍';
      case 'linkedin':
        return '💼';
      case 'news_site':
        return '📰';
      case 'billboard':
        return '🪧';
      case 'magazine':
        return '📖';
      case 'newspaper':
        return '📰';
      default:
        return '📍';
    }
  };

  const stats = {
    total: prospects.length,
    new: prospects.filter(p => p.status === 'new').length,
    contacted: prospects.filter(p => p.status === 'contacted').length,
    interested: prospects.filter(p => p.status === 'interested').length,
    converted: prospects.filter(p => p.status === 'converted').length,
    aiEnriched: prospects.filter(p => p.ai_enriched).length,
  };

  if (loading && prospects.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading prospects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg ${
            toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}
        >
          {toast.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {toast.message}
        </motion.div>
      )}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Prospect Management</h1>
          <p className="text-gray-400 mt-1">Discover and manage advertising prospects</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => activeTab === 'prospects' ? fetchProspects() : fetchManualEntries()}
            disabled={loading}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 text-gray-400 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => setShowAddManual(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Sighting
          </button>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <Building2 className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Total</p>
              <p className="text-xl font-bold text-white">{stats.total}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white/5 border border-white/10 rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Target className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-gray-400">New</p>
              <p className="text-xl font-bold text-white">{stats.new}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 border border-white/10 rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <MessageSquare className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Contacted</p>
              <p className="text-xl font-bold text-white">{stats.contacted}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white/5 border border-white/10 rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Users className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Interested</p>
              <p className="text-xl font-bold text-white">{stats.interested}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Converted</p>
              <p className="text-xl font-bold text-white">{stats.converted}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white/5 border border-white/10 rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-pink-500/20 rounded-lg">
              <Sparkles className="w-5 h-5 text-pink-400" />
            </div>
            <div>
              <p className="text-xs text-gray-400">AI Enriched</p>
              <p className="text-xl font-bold text-white">{stats.aiEnriched}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-2 border-b border-white/10 pb-px"
      >
        {(['prospects', 'manual'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
              activeTab === tab ? 'text-cyan-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab === 'prospects' ? 'All Prospects' : 'Manual Sightings'}
            {tab === 'manual' && manualEntries.length > 0 && (
              <span className="ml-2 px-1.5 py-0.5 text-xs bg-orange-500/20 text-orange-400 rounded">
                {manualEntries.length}
              </span>
            )}
            {activeTab === tab && (
              <motion.div
                layoutId="prospects-tab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400"
              />
            )}
          </button>
        ))}
      </motion.div>

      {/* Filters (Prospects tab only) */}
      {activeTab === 'prospects' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-3"
        >
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search prospects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
          >
            {STATUSES.map((status) => (
              <option key={status.value} value={status.value} className="bg-[#1A1A2E]">
                {status.label}
              </option>
            ))}
          </select>
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
          >
            {SOURCES.map((source) => (
              <option key={source.value} value={source.value} className="bg-[#1A1A2E]">
                {source.label}
              </option>
            ))}
          </select>
        </motion.div>
      )}

      {/* Prospects List */}
      {activeTab === 'prospects' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Company</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Source</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Industry</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Budget</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Score</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Status</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {prospects.map((prospect) => (
                  <tr
                    key={prospect.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                    onClick={() => setSelectedProspect(prospect)}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {prospect.ai_enriched && (
                          <Sparkles className="w-4 h-4 text-pink-400" />
                        )}
                        <div>
                          <p className="font-medium text-white">{prospect.company_name}</p>
                          {prospect.website && (
                            <p className="text-sm text-gray-400 flex items-center gap-1">
                              <Globe className="w-3 h-3" />
                              {prospect.website.replace(/^https?:\/\//, '')}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="flex items-center gap-2">
                        <span>{getSourceIcon(prospect.source)}</span>
                        <span className="text-sm text-gray-300 capitalize">{prospect.source.replace('_', ' ')}</span>
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-gray-300">{prospect.industry || '-'}</span>
                    </td>
                    <td className="p-4">{getBudgetBadge(prospect.estimated_budget)}</td>
                    <td className="p-4">
                      {prospect.relevance_score !== null && (
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                prospect.relevance_score >= 70
                                  ? 'bg-green-500'
                                  : prospect.relevance_score >= 40
                                  ? 'bg-yellow-500'
                                  : 'bg-red-500'
                              }`}
                              style={{ width: `${prospect.relevance_score}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-400">{prospect.relevance_score}</span>
                        </div>
                      )}
                    </td>
                    <td className="p-4">{getStatusBadge(prospect.status)}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={prospect.status}
                          onChange={(e) => updateProspectStatus(prospect.id, e.target.value)}
                          className="bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white focus:outline-none"
                        >
                          <option value="new" className="bg-[#1A1A2E]">New</option>
                          <option value="contacted" className="bg-[#1A1A2E]">Contacted</option>
                          <option value="interested" className="bg-[#1A1A2E]">Interested</option>
                          <option value="not_interested" className="bg-[#1A1A2E]">Not Interested</option>
                          <option value="converted" className="bg-[#1A1A2E]">Converted</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {prospects.length === 0 && (
            <div className="p-12 text-center">
              <Building2 className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No prospects found</h3>
              <p className="text-gray-400">
                Run the scrapers or add manual sightings to discover prospects.
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* Manual Entries List */}
      {activeTab === 'manual' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-4"
        >
          {manualEntries.map((entry) => (
            <div
              key={entry.id}
              className="bg-white/5 border border-white/10 rounded-xl p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{getSourceIcon(entry.source_type)}</span>
                    <h3 className="font-medium text-white">{entry.company_name}</h3>
                    <span className="px-2 py-0.5 text-xs bg-orange-500/20 text-orange-400 rounded-full capitalize">
                      {entry.source_type}
                    </span>
                  </div>
                  {entry.location && (
                    <p className="text-sm text-gray-400 flex items-center gap-1 mb-1">
                      <MapPin className="w-3 h-3" />
                      {entry.location}
                    </p>
                  )}
                  {entry.description && (
                    <p className="text-sm text-gray-300 mb-2">{entry.description}</p>
                  )}
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Spotted: {new Date(entry.spotted_date).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => processManualEntry(entry.id)}
                  disabled={processingEntry === entry.id}
                  className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {processingEntry === entry.id ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      AI Process
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}

          {manualEntries.length === 0 && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
              <Camera className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No pending sightings</h3>
              <p className="text-gray-400 mb-4">
                Add billboard, magazine, or newspaper ad sightings to process with AI.
              </p>
              <button
                onClick={() => setShowAddManual(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Sighting
              </button>
            </div>
          )}
        </motion.div>
      )}

      {/* Prospect Detail Sidebar */}
      {selectedProspect && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedProspect(null)} />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="relative w-full max-w-md bg-[#1A1A2E] h-full overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Prospect Details</h2>
                <button
                  onClick={() => setSelectedProspect(null)}
                  className="p-2 hover:bg-white/10 rounded-lg"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Company Info */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {selectedProspect.ai_enriched && (
                      <span className="px-2 py-0.5 text-xs bg-pink-500/20 text-pink-400 rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        AI Enriched
                      </span>
                    )}
                    {getStatusBadge(selectedProspect.status)}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{selectedProspect.company_name}</h3>
                  {selectedProspect.industry && (
                    <p className="text-gray-400">{selectedProspect.industry}</p>
                  )}
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                  {selectedProspect.website && (
                    <a
                      href={selectedProspect.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-cyan-400 hover:text-cyan-300"
                    >
                      <Globe className="w-5 h-5" />
                      {selectedProspect.website}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {selectedProspect.contact_email && (
                    <a
                      href={`mailto:${selectedProspect.contact_email}`}
                      className="flex items-center gap-3 text-gray-300 hover:text-white"
                    >
                      <Mail className="w-5 h-5" />
                      {selectedProspect.contact_email}
                    </a>
                  )}
                  {selectedProspect.contact_phone && (
                    <a
                      href={`tel:${selectedProspect.contact_phone}`}
                      className="flex items-center gap-3 text-gray-300 hover:text-white"
                    >
                      <Phone className="w-5 h-5" />
                      {selectedProspect.contact_phone}
                    </a>
                  )}
                </div>

                {/* AI Summary */}
                {selectedProspect.ai_summary && (
                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-pink-400" />
                      AI Summary
                    </h4>
                    <p className="text-gray-300 text-sm">{selectedProspect.ai_summary}</p>
                  </div>
                )}

                {/* AI Suggested Approach */}
                {selectedProspect.ai_suggested_approach && (
                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4 text-cyan-400" />
                      Suggested Approach
                    </h4>
                    <p className="text-gray-300 text-sm">{selectedProspect.ai_suggested_approach}</p>
                  </div>
                )}

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1">Relevance Score</p>
                    <p className="text-2xl font-bold text-white">
                      {selectedProspect.relevance_score || '-'}
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1">Est. Budget</p>
                    <p className="text-lg font-bold text-white capitalize">
                      {selectedProspect.estimated_budget || '-'}
                    </p>
                  </div>
                </div>

                {/* Source */}
                <div className="bg-white/5 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Source</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{getSourceIcon(selectedProspect.source)}</span>
                    <span className="text-gray-300 capitalize">{selectedProspect.source.replace('_', ' ')}</span>
                  </div>
                  {selectedProspect.source_url && (
                    <a
                      href={selectedProspect.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 text-sm hover:underline mt-2 block"
                    >
                      View source →
                    </a>
                  )}
                </div>

                {/* Notes */}
                {selectedProspect.notes && (
                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Notes</h4>
                    <p className="text-gray-300 text-sm">{selectedProspect.notes}</p>
                  </div>
                )}

                {/* Status Change */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Update Status
                  </label>
                  <select
                    value={selectedProspect.status}
                    onChange={(e) => updateProspectStatus(selectedProspect.id, e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="new" className="bg-[#1A1A2E]">New</option>
                    <option value="contacted" className="bg-[#1A1A2E]">Contacted</option>
                    <option value="interested" className="bg-[#1A1A2E]">Interested</option>
                    <option value="not_interested" className="bg-[#1A1A2E]">Not Interested</option>
                    <option value="converted" className="bg-[#1A1A2E]">Converted</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Add Manual Entry Modal */}
      {showAddManual && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowAddManual(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-[#1A1A2E] rounded-2xl p-6 w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Add Ad Sighting</h2>
              <button
                onClick={() => setShowAddManual(false)}
                className="p-2 hover:bg-white/10 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleAddManualEntry} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  value={manualForm.company_name}
                  onChange={(e) => setManualForm({ ...manualForm, company_name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
                  placeholder="e.g., Coca-Cola"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Source Type *
                </label>
                <select
                  value={manualForm.source_type}
                  onChange={(e) => setManualForm({ ...manualForm, source_type: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
                >
                  {SOURCE_TYPES.map((type) => (
                    <option key={type.value} value={type.value} className="bg-[#1A1A2E]">
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={manualForm.location}
                  onChange={(e) => setManualForm({ ...manualForm, location: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
                  placeholder="e.g., Seef Mall entrance"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Description
                </label>
                <textarea
                  value={manualForm.description}
                  onChange={(e) => setManualForm({ ...manualForm, description: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
                  rows={3}
                  placeholder="Describe the ad..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Date Spotted
                </label>
                <input
                  type="date"
                  value={manualForm.spotted_date}
                  onChange={(e) => setManualForm({ ...manualForm, spotted_date: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddManual(false)}
                  className="flex-1 px-4 py-2 border border-white/10 text-gray-400 rounded-lg hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors"
                >
                  Add Sighting
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
