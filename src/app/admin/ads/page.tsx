'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Pause,
  Play,
  FileText,
  Trash2,
  Megaphone,
  DollarSign,
  MousePointer,
  TrendingUp,
  ChevronDown,
} from 'lucide-react';

// Mock ads data
const mockAds = [
  {
    id: 'ad1',
    advertiserName: 'The Ritz-Carlton',
    companyName: 'Ritz-Carlton Bahrain',
    title: 'NYE Gala 2025',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=300&fit=crop',
    targetUrl: 'https://ritzcarlton.com/nye',
    slotPosition: 1,
    startDate: '2024-12-15',
    endDate: '2025-01-01',
    status: 'active',
    impressions: 45000,
    clicks: 1250,
    price: 500,
    paymentStatus: 'paid',
  },
  {
    id: 'ad2',
    advertiserName: 'Gulf Hotel',
    companyName: 'Gulf Hotel Convention & Spa',
    title: 'Friday Brunch Special',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=300&fit=crop',
    targetUrl: 'https://gulfhotel.com/brunch',
    slotPosition: 2,
    startDate: '2025-01-01',
    endDate: '2025-03-31',
    status: 'active',
    impressions: 32000,
    clicks: 890,
    price: 400,
    paymentStatus: 'paid',
  },
  {
    id: 'ad3',
    advertiserName: 'Amber Lounge',
    companyName: 'Amber Entertainment',
    title: 'Weekend Party Nights',
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&h=300&fit=crop',
    targetUrl: 'https://amberlounge.bh/weekends',
    slotPosition: 3,
    startDate: '2025-01-10',
    endDate: '2025-02-28',
    status: 'active',
    impressions: 18000,
    clicks: 520,
    price: 350,
    paymentStatus: 'pending',
  },
  {
    id: 'ad4',
    advertiserName: 'Coral Bay',
    companyName: 'Coral Bay Beach Resort',
    title: 'Summer Beach Festival',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=300&fit=crop',
    targetUrl: 'https://coralbay.bh/festival',
    slotPosition: null,
    startDate: '2025-06-01',
    endDate: '2025-08-31',
    status: 'scheduled',
    impressions: 0,
    clicks: 0,
    price: 450,
    paymentStatus: 'pending',
  },
  {
    id: 'ad5',
    advertiserName: 'Four Seasons',
    companyName: 'Four Seasons Hotel Bahrain',
    title: 'Spa & Wellness Retreat',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=300&fit=crop',
    targetUrl: 'https://fourseasons.com/bahrain/spa',
    slotPosition: null,
    startDate: '2024-11-01',
    endDate: '2024-12-31',
    status: 'expired',
    impressions: 62000,
    clicks: 1800,
    price: 500,
    paymentStatus: 'paid',
  },
];

type AdStatus = 'all' | 'active' | 'scheduled' | 'expired';

export default function AdminAdsPage() {
  const [activeTab, setActiveTab] = useState<AdStatus>('all');
  const [openActionMenu, setOpenActionMenu] = useState<string | null>(null);

  const filteredAds = mockAds.filter((ad) => {
    if (activeTab === 'all') return true;
    return ad.status === activeTab;
  });

  const statusCounts = {
    all: mockAds.length,
    active: mockAds.filter((a) => a.status === 'active').length,
    scheduled: mockAds.filter((a) => a.status === 'scheduled').length,
    expired: mockAds.filter((a) => a.status === 'expired').length,
  };

  const totalRevenue = mockAds.reduce((sum, ad) => sum + ad.price, 0);
  const totalImpressions = mockAds.reduce((sum, ad) => sum + ad.impressions, 0);
  const totalClicks = mockAds.reduce((sum, ad) => sum + ad.clicks, 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-green-500/20 text-green-400 rounded-full">
            Active
          </span>
        );
      case 'scheduled':
        return (
          <span className="px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-400 rounded-full">
            Scheduled
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Homepage Ads Manager</h1>
          <p className="text-gray-400 mt-1">
            Manage homepage slider advertisements
          </p>
        </div>
        <Link
          href="/admin/ads/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create New Ad
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
            <div className="p-2 bg-green-500/20 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Revenue</p>
              <p className="text-xl font-bold text-white">BD {totalRevenue.toLocaleString()}</p>
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
          {mockAds
            .filter((ad) => ad.status === 'active')
            .sort((a, b) => (a.slotPosition || 99) - (b.slotPosition || 99))
            .map((ad) => (
              <div
                key={ad.id}
                className="relative rounded-xl overflow-hidden group"
              >
                <img
                  src={ad.image}
                  alt={ad.title}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium text-sm">{ad.title}</p>
                      <p className="text-gray-300 text-xs">{ad.advertiserName}</p>
                    </div>
                    <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-full">
                      Slot {ad.slotPosition}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          {Array.from({ length: 5 - statusCounts.active }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="h-32 border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center"
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
        {(['all', 'active', 'scheduled', 'expired'] as AdStatus[]).map((tab) => (
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
                <th className="text-left p-4 text-sm font-medium text-gray-400">Slot</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Duration</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Status</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Performance</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Price</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Payment</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAds.map((ad) => {
                const ctr = ad.impressions > 0 ? ((ad.clicks / ad.impressions) * 100).toFixed(2) : '0';
                return (
                  <tr
                    key={ad.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="p-4">
                      <img
                        src={ad.image}
                        alt={ad.title}
                        className="w-24 h-14 rounded-lg object-cover"
                      />
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-white">{ad.advertiserName}</p>
                      <p className="text-sm text-gray-400">{ad.title}</p>
                    </td>
                    <td className="p-4 text-gray-300">
                      {ad.slotPosition ? `Slot ${ad.slotPosition}` : '-'}
                    </td>
                    <td className="p-4">
                      <p className="text-white text-sm">
                        {new Date(ad.startDate).toLocaleDateString()}
                      </p>
                      <p className="text-gray-400 text-xs">
                        to {new Date(ad.endDate).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="p-4">{getStatusBadge(ad.status)}</td>
                    <td className="p-4">
                      <p className="text-white text-sm">{ad.impressions.toLocaleString()} views</p>
                      <p className="text-gray-400 text-xs">
                        {ad.clicks.toLocaleString()} clicks ({ctr}% CTR)
                      </p>
                    </td>
                    <td className="p-4 text-white font-medium">BD {ad.price}</td>
                    <td className="p-4">{getPaymentBadge(ad.paymentStatus)}</td>
                    <td className="p-4">
                      <div className="relative">
                        <button
                          onClick={() =>
                            setOpenActionMenu(openActionMenu === ad.id ? null : ad.id)
                          }
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>

                        {openActionMenu === ad.id && (
                          <>
                            <div
                              className="fixed inset-0 z-40"
                              onClick={() => setOpenActionMenu(null)}
                            />
                            <div className="absolute right-0 mt-1 w-48 bg-[#1A1A2E] border border-white/10 rounded-xl shadow-xl z-50 py-1">
                              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5">
                                <Eye className="w-4 h-4" />
                                View Details
                              </button>
                              <Link
                                href={`/admin/ads/${ad.id}/edit`}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5"
                              >
                                <Edit className="w-4 h-4" />
                                Edit
                              </Link>
                              {ad.status === 'active' ? (
                                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-orange-400 hover:bg-orange-500/10">
                                  <Pause className="w-4 h-4" />
                                  Pause
                                </button>
                              ) : ad.status === 'scheduled' ? (
                                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-green-400 hover:bg-green-500/10">
                                  <Play className="w-4 h-4" />
                                  Activate Now
                                </button>
                              ) : null}
                              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5">
                                <FileText className="w-4 h-4" />
                                Generate Invoice
                              </button>
                              <div className="my-1 border-t border-white/10" />
                              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10">
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
                  src={ad.image}
                  alt={ad.title}
                  className="w-20 h-14 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-medium text-white">{ad.title}</h3>
                      <p className="text-sm text-gray-400">{ad.advertiserName}</p>
                    </div>
                    {getStatusBadge(ad.status)}
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                    <span>BD {ad.price}</span>
                    <span>•</span>
                    <span>{ad.impressions.toLocaleString()} views</span>
                    <span>•</span>
                    {getPaymentBadge(ad.paymentStatus)}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Link
                      href={`/admin/ads/${ad.id}/edit`}
                      className="px-3 py-1.5 text-xs bg-cyan-500/20 text-cyan-400 rounded-lg"
                    >
                      Edit
                    </Link>
                    <button className="px-3 py-1.5 text-xs bg-white/5 text-gray-300 rounded-lg">
                      Invoice
                    </button>
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
