'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, Search, Filter } from 'lucide-react';
import OffersTable, { Offer } from '@/components/dashboard/OffersTable';

// Mock data for offers
const allMockOffers: Offer[] = [
  {
    id: '1',
    title: 'Ladies Night Tuesday',
    type: 'Ladies Night',
    days: ['Tuesday'],
    time: '8:00 PM - 12:00 AM',
    status: 'active',
    views: 245,
    image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=100&h=100&fit=crop',
  },
  {
    id: '2',
    title: 'Happy Hour Daily',
    type: 'Happy Hour',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    time: '5:00 PM - 8:00 PM',
    status: 'active',
    views: 189,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=100&h=100&fit=crop',
  },
  {
    id: '3',
    title: 'Christmas Special',
    type: 'Special Deal',
    days: ['Friday', 'Saturday', 'Sunday'],
    time: '6:00 PM - 11:00 PM',
    validUntil: 'Dec 26, 2025',
    status: 'expired',
    views: 423,
    image: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=100&h=100&fit=crop',
  },
  {
    id: '4',
    title: 'Weekend Brunch',
    type: 'Brunch',
    days: ['Friday', 'Saturday'],
    time: '11:00 AM - 4:00 PM',
    status: 'draft',
    views: 0,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100&h=100&fit=crop',
  },
];

type StatusFilter = 'all' | 'active' | 'expired' | 'draft';

export default function OffersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  // Filter offers
  const filteredOffers = allMockOffers.filter((offer) => {
    // Search filter
    if (searchQuery && !offer.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    // Status filter
    if (statusFilter !== 'all' && offer.status !== statusFilter) {
      return false;
    }
    return true;
  });

  const handleEdit = (id: string) => {
    window.location.href = `/dashboard/offers/${id}/edit`;
  };

  const handleDuplicate = (id: string) => {
    console.log('Duplicate offer:', id);
    // TODO: Implement duplicate logic
  };

  const handleToggleActive = (id: string) => {
    console.log('Toggle active:', id);
    // TODO: Implement toggle active logic
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this offer?')) {
      console.log('Delete offer:', id);
      // TODO: Implement delete logic
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Manage Offers</h1>
          <p className="text-gray-400 mt-1">
            {filteredOffers.length} offer{filteredOffers.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <Link
          href="/dashboard/offers/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-yellow-500/25 transition-all"
        >
          <Plus className="w-5 h-5" />
          Add New Offer
        </Link>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search offers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/25 transition-all"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-gray-300 focus:outline-none focus:border-yellow-400/50 appearance-none cursor-pointer min-w-[140px]"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Offers Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <OffersTable
          offers={filteredOffers}
          onEdit={handleEdit}
          onDuplicate={handleDuplicate}
          onToggleActive={handleToggleActive}
          onDelete={handleDelete}
        />
      </motion.div>
    </div>
  );
}
