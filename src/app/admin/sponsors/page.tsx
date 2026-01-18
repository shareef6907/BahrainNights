'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Crown,
  Medal,
  DollarSign,
  ExternalLink,
  Building2,
  Eye,
  ChevronUp,
  ChevronDown,
  AlertCircle,
  CheckCircle2,
  Clock,
  Ban,
} from 'lucide-react';
import type { Sponsor } from '@/types/database';

type SponsorStatus = 'all' | 'active' | 'pending' | 'expired';
type SponsorTier = 'all' | 'golden' | 'silver';

export default function AdminSponsorsPage() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<SponsorStatus>('all');
  const [tierFilter, setTierFilter] = useState<SponsorTier>('all');
  const [openActionMenu, setOpenActionMenu] = useState<string | null>(null);

  useEffect(() => {
    fetchSponsors();
  }, []);

  async function fetchSponsors() {
    try {
      const response = await fetch('/api/admin/sponsors');
      if (response.ok) {
        const data = await response.json();
        setSponsors(data.sponsors || []);
      }
    } catch (error) {
      console.error('Error fetching sponsors:', error);
    } finally {
      setLoading(false);
    }
  }

  // Filter sponsors
  const filteredSponsors = sponsors.filter((sponsor) => {
    if (activeTab !== 'all' && sponsor.status !== activeTab) return false;
    if (tierFilter !== 'all' && sponsor.tier !== tierFilter) return false;
    return true;
  });

  // Calculate stats
  const statusCounts = {
    all: sponsors.length,
    active: sponsors.filter((s) => s.status === 'active').length,
    pending: sponsors.filter((s) => s.status === 'pending').length,
    expired: sponsors.filter((s) => s.status === 'expired').length,
  };

  const goldenCount = sponsors.filter((s) => s.tier === 'golden' && s.status === 'active').length;
  const silverCount = sponsors.filter((s) => s.tier === 'silver' && s.status === 'active').length;
  const totalRevenue = sponsors
    .filter((s) => s.payment_status === 'paid')
    .reduce((sum, s) => sum + (s.price_bd || 0), 0);
  const pendingRevenue = sponsors
    .filter((s) => s.payment_status === 'pending')
    .reduce((sum, s) => sum + (s.price_bd || 0), 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-green-500/20 text-green-400 rounded-full">
            <CheckCircle2 className="w-3 h-3" />
            Active
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-yellow-500/20 text-yellow-400 rounded-full">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
      case 'expired':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-gray-500/20 text-gray-400 rounded-full">
            <Ban className="w-3 h-3" />
            Expired
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

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-green-500/20 text-green-400 rounded-full">
            Paid
          </span>
        );
      case 'pending':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-orange-500/20 text-orange-400 rounded-full">
            Pending
          </span>
        );
      case 'overdue':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-red-500/20 text-red-400 rounded-full">
            Overdue
          </span>
        );
      default:
        return null;
    }
  };

  const handleMoveUp = async (sponsorId: string, currentOrder: number) => {
    try {
      const response = await fetch(`/api/admin/sponsors/${sponsorId}/reorder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ direction: 'up' }),
      });
      if (response.ok) {
        fetchSponsors();
      }
    } catch (error) {
      console.error('Error reordering:', error);
    }
  };

  const handleMoveDown = async (sponsorId: string, currentOrder: number) => {
    try {
      const response = await fetch(`/api/admin/sponsors/${sponsorId}/reorder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ direction: 'down' }),
      });
      if (response.ok) {
        fetchSponsors();
      }
    } catch (error) {
      console.error('Error reordering:', error);
    }
  };

  const handleDelete = async (sponsorId: string) => {
    if (!confirm('Are you sure you want to delete this sponsor?')) return;

    try {
      const response = await fetch(`/api/admin/sponsors/${sponsorId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchSponsors();
      }
    } catch (error) {
      console.error('Error deleting sponsor:', error);
    }
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
          <h1 className="text-2xl font-bold text-white">Sponsors Manager</h1>
          <p className="text-gray-400 mt-1">
            Manage sponsor logos and placements
          </p>
        </div>
        <Link
          href="/admin/sponsors/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black rounded-lg font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Sponsor
        </Link>
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
            <div className="p-2 bg-amber-500/20 rounded-lg">
              <Crown className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Golden Sponsors</p>
              <p className="text-xl font-bold text-white">{goldenCount}</p>
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
            <div className="p-2 bg-gray-400/20 rounded-lg">
              <Medal className="w-5 h-5 text-gray-300" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Silver Sponsors</p>
              <p className="text-xl font-bold text-white">{silverCount}</p>
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
            <div className="p-2 bg-green-500/20 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Collected Revenue</p>
              <p className="text-xl font-bold text-white">BD {totalRevenue.toLocaleString()}</p>
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
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <AlertCircle className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Pending Revenue</p>
              <p className="text-xl font-bold text-white">BD {pendingRevenue.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap gap-4 items-center"
      >
        {/* Status Tabs */}
        <div className="flex gap-2 border-b border-white/10 pb-px">
          {(['all', 'active', 'pending', 'expired'] as SponsorStatus[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors relative ${
                activeTab === tab
                  ? 'text-amber-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              <span className="ml-2 px-1.5 py-0.5 text-xs bg-white/10 rounded">
                {statusCounts[tab]}
              </span>
              {activeTab === tab && (
                <motion.div
                  layoutId="sponsors-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400"
                />
              )}
            </button>
          ))}
        </div>

        {/* Tier Filter */}
        <select
          value={tierFilter}
          onChange={(e) => setTierFilter(e.target.value as SponsorTier)}
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
        transition={{ delay: 0.35 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
      >
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-sm font-medium text-gray-400 w-8">Order</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Logo</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Sponsor</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Tier</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Duration</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Status</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Price</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Payment</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSponsors
                .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
                .map((sponsor, index) => (
                  <tr
                    key={sponsor.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => handleMoveUp(sponsor.id, sponsor.display_order || 0)}
                          className="p-1 hover:bg-white/10 rounded transition-colors"
                          disabled={index === 0}
                        >
                          <ChevronUp className={`w-4 h-4 ${index === 0 ? 'text-gray-600' : 'text-gray-400'}`} />
                        </button>
                        <button
                          onClick={() => handleMoveDown(sponsor.id, sponsor.display_order || 0)}
                          className="p-1 hover:bg-white/10 rounded transition-colors"
                          disabled={index === filteredSponsors.length - 1}
                        >
                          <ChevronDown className={`w-4 h-4 ${index === filteredSponsors.length - 1 ? 'text-gray-600' : 'text-gray-400'}`} />
                        </button>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="w-24 h-14 bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
                        {sponsor.logo_url ? (
                          <Image
                            src={sponsor.logo_url}
                            alt={sponsor.name}
                            width={96}
                            height={56}
                            className="object-contain"
                          />
                        ) : (
                          <Building2 className="w-6 h-6 text-gray-600" />
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-white">{sponsor.name}</p>
                      {sponsor.website_url && (
                        <a
                          href={sponsor.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Website
                        </a>
                      )}
                    </td>
                    <td className="p-4">{getTierBadge(sponsor.tier)}</td>
                    <td className="p-4">
                      <p className="text-white text-sm">
                        {sponsor.start_date ? new Date(sponsor.start_date).toLocaleDateString() : '-'}
                      </p>
                      <p className="text-gray-400 text-xs">
                        to {sponsor.end_date ? new Date(sponsor.end_date).toLocaleDateString() : '-'}
                      </p>
                    </td>
                    <td className="p-4">{getStatusBadge(sponsor.status || 'pending')}</td>
                    <td className="p-4 text-white font-medium">
                      BD {sponsor.price_bd?.toLocaleString() || 0}
                    </td>
                    <td className="p-4">{getPaymentBadge(sponsor.payment_status || 'pending')}</td>
                    <td className="p-4">
                      <div className="relative">
                        <button
                          onClick={() =>
                            setOpenActionMenu(openActionMenu === sponsor.id ? null : sponsor.id)
                          }
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>

                        {openActionMenu === sponsor.id && (
                          <>
                            <div
                              className="fixed inset-0 z-40"
                              onClick={() => setOpenActionMenu(null)}
                            />
                            <div className="absolute right-0 mt-1 w-48 bg-[#1A1A2E] border border-white/10 rounded-xl shadow-xl z-50 py-1">
                              <Link
                                href={`/admin/sponsors/${sponsor.id}/edit`}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5"
                              >
                                <Edit className="w-4 h-4" />
                                Edit
                              </Link>
                              {sponsor.website_url && (
                                <a
                                  href={sponsor.website_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                  View Website
                                </a>
                              )}
                              <div className="my-1 border-t border-white/10" />
                              <button
                                onClick={() => {
                                  setOpenActionMenu(null);
                                  handleDelete(sponsor.id);
                                }}
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
                ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden divide-y divide-white/10">
          {filteredSponsors
            .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
            .map((sponsor) => (
              <div key={sponsor.id} className="p-4">
                <div className="flex gap-4">
                  <div className="w-16 h-12 bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
                    {sponsor.logo_url ? (
                      <Image
                        src={sponsor.logo_url}
                        alt={sponsor.name}
                        width={64}
                        height={48}
                        className="object-contain"
                      />
                    ) : (
                      <Building2 className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-medium text-white">{sponsor.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          {getTierBadge(sponsor.tier)}
                          {getStatusBadge(sponsor.status || 'pending')}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                      <span>BD {sponsor.price_bd?.toLocaleString() || 0}</span>
                      <span>•</span>
                      {getPaymentBadge(sponsor.payment_status || 'pending')}
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Link
                        href={`/admin/sponsors/${sponsor.id}/edit`}
                        className="px-3 py-1.5 text-xs bg-amber-500/20 text-amber-400 rounded-lg"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(sponsor.id)}
                        className="px-3 py-1.5 text-xs bg-red-500/10 text-red-400 rounded-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Empty State */}
        {filteredSponsors.length === 0 && (
          <div className="p-12 text-center">
            <Crown className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No sponsors found</h3>
            <p className="text-gray-400 mb-4">
              {activeTab === 'all'
                ? 'Add your first sponsor to get started.'
                : `No ${activeTab} sponsors at the moment.`}
            </p>
            <Link
              href="/admin/sponsors/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black rounded-lg font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Sponsor
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}
