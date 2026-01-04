'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Pause,
  Play,
  Trash2,
  Megaphone,
  MousePointer,
  TrendingUp,
  Loader2,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  LayoutGrid,
  Monitor,
} from 'lucide-react';

// Target pages for ads
const TARGET_PAGES = [
  { value: 'all', label: 'All Pages' },
  { value: 'homepage', label: 'Homepage' },
  { value: 'events', label: 'Events' },
  { value: 'cinema', label: 'Cinema' },
  { value: 'places', label: 'Places' },
  { value: 'restaurants', label: 'Restaurants' },
  { value: 'cafes', label: 'Cafes' },
  { value: 'lounges', label: 'Lounges' },
  { value: 'nightclubs', label: 'Nightclubs' },
  { value: 'offers', label: 'Offers' },
  { value: 'explore', label: 'Explore' },
] as const;

// Placement types
const PLACEMENTS = [
  { value: 'all', label: 'All Placements' },
  { value: 'slider', label: 'Slider' },
  { value: 'banner', label: 'Banner' },
  { value: 'sidebar', label: 'Sidebar' },
  { value: 'inline', label: 'Inline' },
] as const;

type TargetPage = typeof TARGET_PAGES[number]['value'];
type Placement = typeof PLACEMENTS[number]['value'];

interface Ad {
  id: string;
  advertiser_name: string;
  company_name: string | null;
  contact_email: string;
  contact_phone: string | null;
  title: string | null;
  subtitle: string | null;
  cta_text: string | null;
  image_url: string;
  target_url: string;
  slot_position: number | null;
  start_date: string;
  end_date: string;
  price_bd: number;
  payment_status: 'pending' | 'paid' | 'overdue';
  payment_date: string | null;
  status: 'pending' | 'active' | 'paused' | 'expired';
  impressions: number;
  clicks: number;
  invoice_number: string | null;
  notes: string | null;
  target_page: string;
  placement: string;
  created_at: string;
  updated_at: string;
}

interface Stats {
  totalAds: number;
  activeAds: number;
  pendingAds: number;
  totalRevenue: number;
  paidRevenue: number;
  pendingRevenue: number;
  totalImpressions: number;
  totalClicks: number;
}

type AdStatus = 'all' | 'active' | 'pending' | 'paused' | 'expired';

export default function AdminAdsPage() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<AdStatus>('all');
  const [targetPageFilter, setTargetPageFilter] = useState<TargetPage>('all');
  const [placementFilter, setPlacementFilter] = useState<Placement>('all');
  const [openActionMenu, setOpenActionMenu] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const fetchAds = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (activeTab !== 'all') {
        params.set('status', activeTab);
      }
      if (targetPageFilter !== 'all') {
        params.set('targetPage', targetPageFilter);
      }
      if (placementFilter !== 'all') {
        params.set('placement', placementFilter);
      }

      const response = await fetch(`/api/admin/ads?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch ads');
      }

      const data = await response.json();
      setAds(data.ads);
      setStats(data.stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [activeTab, targetPageFilter, placementFilter]);

  useEffect(() => {
    fetchAds();
  }, [fetchAds]);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAction = async (adId: string, action: 'pause' | 'activate' | 'delete' | 'markPaid') => {
    try {
      setActionLoading(adId);
      setOpenActionMenu(null);

      if (action === 'delete') {
        const response = await fetch(`/api/admin/ads/${adId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete ad');
        }

        showToast('Ad deleted successfully', 'success');
      } else {
        const response = await fetch(`/api/admin/ads/${adId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action }),
        });

        if (!response.ok) {
          throw new Error(`Failed to ${action} ad`);
        }

        const actionMessages: Record<string, string> = {
          pause: 'Ad paused successfully',
          activate: 'Ad activated successfully',
          markPaid: 'Ad marked as paid',
        };

        showToast(actionMessages[action], 'success');
      }

      fetchAds();
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'An error occurred', 'error');
    } finally {
      setActionLoading(null);
    }
  };

  const filteredAds = ads.filter((ad) => {
    if (activeTab === 'all') return true;
    return ad.status === activeTab;
  });

  const statusCounts = {
    all: ads.length,
    active: ads.filter((a) => a.status === 'active').length,
    pending: ads.filter((a) => a.status === 'pending').length,
    paused: ads.filter((a) => a.status === 'paused').length,
    expired: ads.filter((a) => a.status === 'expired').length,
  };

  const totalImpressions = stats?.totalImpressions || 0;
  const totalClicks = stats?.totalClicks || 0;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-green-500/20 text-green-400 rounded-full">
            Active
          </span>
        );
      case 'pending':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-400 rounded-full">
            Pending
          </span>
        );
      case 'expired':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-gray-500/20 text-gray-400 rounded-full">
            Expired
          </span>
        );
      case 'paused':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-orange-500/20 text-orange-400 rounded-full">
            Paused
          </span>
        );
      default:
        return null;
    }
  };


  if (loading && ads.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading ads...</p>
        </div>
      </div>
    );
  }

  if (error && ads.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">Error Loading Ads</h3>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => fetchAds()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg ${
            toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}
        >
          {toast.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
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
          <h1 className="text-2xl font-bold text-white">Ads Manager</h1>
          <p className="text-gray-400 mt-1">
            Manage advertisements across all pages
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchAds()}
            disabled={loading}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
            title="Refresh"
          >
            <RefreshCw className={`w-5 h-5 text-gray-400 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <Link
            href="/admin/ads/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create New Ad
          </Link>
        </div>
      </motion.div>

      {/* Page & Placement Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="flex flex-wrap gap-3"
      >
        <div className="flex items-center gap-2">
          <Monitor className="w-4 h-4 text-gray-400" />
          <select
            value={targetPageFilter}
            onChange={(e) => setTargetPageFilter(e.target.value as TargetPage)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
          >
            {TARGET_PAGES.map((page) => (
              <option key={page.value} value={page.value} className="bg-[#1A1A2E]">
                {page.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <LayoutGrid className="w-4 h-4 text-gray-400" />
          <select
            value={placementFilter}
            onChange={(e) => setPlacementFilter(e.target.value as Placement)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
          >
            {PLACEMENTS.map((placement) => (
              <option key={placement.value} value={placement.value} className="bg-[#1A1A2E]">
                {placement.label}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <Eye className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Impressions</p>
              <p className="text-xl font-bold text-white">{totalImpressions.toLocaleString()}</p>
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
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <MousePointer className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Clicks</p>
              <p className="text-xl font-bold text-white">{totalClicks.toLocaleString()}</p>
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
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <TrendingUp className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Average CTR</p>
              <p className="text-xl font-bold text-white">
                {totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : 0}%
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Active Ads Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">
          Currently Active ({statusCounts.active} of 5 slots)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ads
            .filter((ad) => ad.status === 'active')
            .sort((a, b) => (a.slot_position || 99) - (b.slot_position || 99))
            .map((ad) => (
              <div
                key={ad.id}
                className="relative rounded-xl overflow-hidden group"
              >
                <img
                  src={ad.image_url}
                  alt={ad.title || ad.advertiser_name}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium text-sm">{ad.title || ad.advertiser_name}</p>
                      <p className="text-gray-300 text-xs">{ad.advertiser_name}</p>
                    </div>
                    <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-full">
                      Slot {ad.slot_position}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          {Array.from({ length: Math.max(0, 5 - statusCounts.active) }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="h-40 border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center"
            >
              <p className="text-gray-500 text-sm">Empty Slot</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="flex gap-2 border-b border-white/10 pb-px overflow-x-auto"
      >
        {(['all', 'active', 'pending', 'paused', 'expired'] as AdStatus[]).map((tab) => (
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
              {statusCounts[tab]}
            </span>
            {activeTab === tab && (
              <motion.div
                layoutId="ads-tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400"
              />
            )}
          </button>
        ))}
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
                <th className="text-left p-4 text-sm font-medium text-gray-400">Preview</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Advertiser</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Page</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Placement</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Duration</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Status</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Performance</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAds.map((ad) => {
                const ctr = ad.impressions > 0 ? ((ad.clicks / ad.impressions) * 100).toFixed(2) : '0';
                const isActionLoading = actionLoading === ad.id;
                return (
                  <tr
                    key={ad.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="p-4">
                      <img
                        src={ad.image_url}
                        alt={ad.title || ad.advertiser_name}
                        className="w-24 h-14 rounded-lg object-cover"
                      />
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-white">{ad.advertiser_name}</p>
                      <p className="text-sm text-gray-400">{ad.title || '-'}</p>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 text-xs font-medium bg-indigo-500/20 text-indigo-400 rounded-full capitalize">
                        {ad.target_page || 'homepage'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 text-xs font-medium bg-violet-500/20 text-violet-400 rounded-full capitalize">
                        {ad.placement || 'slider'}
                      </span>
                      {ad.slot_position && (
                        <span className="ml-1 text-xs text-gray-500">#{ad.slot_position}</span>
                      )}
                    </td>
                    <td className="p-4">
                      <p className="text-white text-sm">
                        {new Date(ad.start_date).toLocaleDateString()}
                      </p>
                      <p className="text-gray-400 text-xs">
                        to {new Date(ad.end_date).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="p-4">{getStatusBadge(ad.status)}</td>
                    <td className="p-4">
                      <p className="text-white text-sm">{ad.impressions.toLocaleString()} views</p>
                      <p className="text-gray-400 text-xs">
                        {ad.clicks.toLocaleString()} clicks ({ctr}% CTR)
                      </p>
                    </td>
                    <td className="p-4">
                      <div className="relative">
                        {isActionLoading ? (
                          <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
                        ) : (
                          <button
                            onClick={() =>
                              setOpenActionMenu(openActionMenu === ad.id ? null : ad.id)
                            }
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          >
                            <MoreVertical className="w-4 h-4 text-gray-400" />
                          </button>
                        )}

                        {openActionMenu === ad.id && (
                          <>
                            <div
                              className="fixed inset-0 z-40"
                              onClick={() => setOpenActionMenu(null)}
                            />
                            <div className="absolute right-0 mt-1 w-48 bg-[#1A1A2E] border border-white/10 rounded-xl shadow-xl z-50 py-1">
                              <Link
                                href={`/admin/ads/${ad.id}`}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5"
                              >
                                <Eye className="w-4 h-4" />
                                View Details
                              </Link>
                              <Link
                                href={`/admin/ads/${ad.id}/edit`}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5"
                              >
                                <Edit className="w-4 h-4" />
                                Edit
                              </Link>
                              {ad.status === 'active' ? (
                                <button
                                  onClick={() => handleAction(ad.id, 'pause')}
                                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-orange-400 hover:bg-orange-500/10"
                                >
                                  <Pause className="w-4 h-4" />
                                  Pause
                                </button>
                              ) : ad.status === 'pending' || ad.status === 'paused' ? (
                                <button
                                  onClick={() => handleAction(ad.id, 'activate')}
                                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-green-400 hover:bg-green-500/10"
                                >
                                  <Play className="w-4 h-4" />
                                  Activate Now
                                </button>
                              ) : null}
                              <div className="my-1 border-t border-white/10" />
                              <button
                                onClick={() => handleAction(ad.id, 'delete')}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
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
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden divide-y divide-white/10">
          {filteredAds.map((ad) => (
            <div key={ad.id} className="p-4">
              <div className="flex gap-4">
                <img
                  src={ad.image_url}
                  alt={ad.title || ad.advertiser_name}
                  className="w-20 h-14 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-medium text-white">{ad.title || ad.advertiser_name}</h3>
                      <p className="text-sm text-gray-400">{ad.advertiser_name}</p>
                    </div>
                    {getStatusBadge(ad.status)}
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                    <span>{ad.impressions.toLocaleString()} views</span>
                    <span>-</span>
                    <span>{ad.clicks.toLocaleString()} clicks</span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Link
                      href={`/admin/ads/${ad.id}/edit`}
                      className="px-3 py-1.5 text-xs bg-cyan-500/20 text-cyan-400 rounded-lg"
                    >
                      Edit
                    </Link>
                    {ad.status === 'active' ? (
                      <button
                        onClick={() => handleAction(ad.id, 'pause')}
                        disabled={actionLoading === ad.id}
                        className="px-3 py-1.5 text-xs bg-orange-500/20 text-orange-400 rounded-lg disabled:opacity-50"
                      >
                        {actionLoading === ad.id ? 'Loading...' : 'Pause'}
                      </button>
                    ) : ad.status === 'pending' || ad.status === 'paused' ? (
                      <button
                        onClick={() => handleAction(ad.id, 'activate')}
                        disabled={actionLoading === ad.id}
                        className="px-3 py-1.5 text-xs bg-green-500/20 text-green-400 rounded-lg disabled:opacity-50"
                      >
                        {actionLoading === ad.id ? 'Loading...' : 'Activate'}
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAds.length === 0 && (
          <div className="p-12 text-center">
            <Megaphone className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No ads found</h3>
            <p className="text-gray-400 mb-4">
              {activeTab === 'all'
                ? 'Create your first advertisement to get started.'
                : `No ${activeTab} ads at the moment.`}
            </p>
            <Link
              href="/admin/ads/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create New Ad
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}
