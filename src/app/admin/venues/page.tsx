'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
  Trash2,
  Building2,
  ChevronDown,
  ArrowUpDown,
} from 'lucide-react';

// Mock venues data
const mockVenues = [
  {
    id: 'v1',
    name: 'The Orangery',
    logo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&h=100&fit=crop',
    category: 'Restaurant & Lounge',
    area: 'Seef',
    ownerEmail: 'owner@theorangery.bh',
    eventsCount: 12,
    status: 'approved',
    registeredDate: '2025-01-01',
  },
  {
    id: 'v2',
    name: 'Cafe Lilou',
    logo: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=100&h=100&fit=crop',
    category: 'Cafe',
    area: 'Adliya',
    ownerEmail: 'info@cafelilou.com',
    eventsCount: 5,
    status: 'pending',
    registeredDate: '2025-01-13',
  },
  {
    id: 'v3',
    name: 'Block 338',
    logo: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=100&h=100&fit=crop',
    category: 'Bar',
    area: 'Adliya',
    ownerEmail: 'contact@block338.com',
    eventsCount: 8,
    status: 'pending',
    registeredDate: '2025-01-14',
  },
  {
    id: 'v4',
    name: 'The Meat Company',
    logo: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=100&h=100&fit=crop',
    category: 'Restaurant',
    area: 'Seef',
    ownerEmail: 'hello@meatco.bh',
    eventsCount: 3,
    status: 'pending',
    registeredDate: '2025-01-15',
  },
  {
    id: 'v5',
    name: 'Gulf Hotel',
    logo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=100&h=100&fit=crop',
    category: 'Hotel',
    area: 'Manama',
    ownerEmail: 'events@gulfhotel.com',
    eventsCount: 25,
    status: 'approved',
    registeredDate: '2024-12-01',
  },
  {
    id: 'v6',
    name: 'Coral Bay',
    logo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=100&h=100&fit=crop',
    category: 'Beach Club',
    area: 'Amwaj',
    ownerEmail: 'info@coralbay.bh',
    eventsCount: 18,
    status: 'approved',
    registeredDate: '2024-11-15',
  },
  {
    id: 'v7',
    name: 'The Junction',
    logo: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=100&h=100&fit=crop',
    category: 'Bar & Grill',
    area: 'Juffair',
    ownerEmail: 'hello@thejunction.bh',
    eventsCount: 15,
    status: 'approved',
    registeredDate: '2024-10-20',
  },
  {
    id: 'v8',
    name: 'Amber Lounge',
    logo: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=100&h=100&fit=crop',
    category: 'Nightclub',
    area: 'Juffair',
    ownerEmail: 'vip@amberlounge.bh',
    eventsCount: 20,
    status: 'approved',
    registeredDate: '2024-09-01',
  },
  {
    id: 'v9',
    name: 'Closed Venue',
    logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100&h=100&fit=crop',
    category: 'Restaurant',
    area: 'Manama',
    ownerEmail: 'closed@example.com',
    eventsCount: 0,
    status: 'rejected',
    registeredDate: '2024-08-15',
  },
];

type VenueStatus = 'all' | 'pending' | 'approved' | 'rejected';

export default function AdminVenuesPage() {
  const [activeTab, setActiveTab] = useState<VenueStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [openActionMenu, setOpenActionMenu] = useState<string | null>(null);
  const [selectedVenues, setSelectedVenues] = useState<string[]>([]);

  const categories = ['all', 'Restaurant', 'Cafe', 'Bar', 'Nightclub', 'Hotel', 'Beach Club'];
  const areas = ['all', 'Manama', 'Seef', 'Adliya', 'Juffair', 'Amwaj'];

  const filteredVenues = mockVenues.filter((venue) => {
    const matchesTab = activeTab === 'all' || venue.status === activeTab;
    const matchesSearch =
      venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.ownerEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || venue.category.includes(categoryFilter);
    return matchesTab && matchesSearch && matchesCategory;
  });

  const statusCounts = {
    all: mockVenues.length,
    pending: mockVenues.filter((v) => v.status === 'pending').length,
    approved: mockVenues.filter((v) => v.status === 'approved').length,
    rejected: mockVenues.filter((v) => v.status === 'rejected').length,
  };

  const toggleSelectAll = () => {
    if (selectedVenues.length === filteredVenues.length) {
      setSelectedVenues([]);
    } else {
      setSelectedVenues(filteredVenues.map((v) => v.id));
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
          <h1 className="text-2xl font-bold text-white">Manage Venues</h1>
          <p className="text-gray-400 mt-1">
            {statusCounts.all} total venues ({statusCounts.pending} pending)
          </p>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 border-b border-white/10 pb-px overflow-x-auto"
      >
        {(['all', 'pending', 'approved', 'rejected'] as VenueStatus[]).map((tab) => (
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
            placeholder="Search venues..."
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
            <button className="px-3 py-1.5 text-xs bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors">
              Approve Selected
            </button>
            <button className="px-3 py-1.5 text-xs bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">
              Reject Selected
            </button>
          </div>
        </motion.div>
      )}

      {/* Table */}
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
                    checked={selectedVenues.length === filteredVenues.length && filteredVenues.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-white/30 bg-white/5 text-cyan-500 focus:ring-cyan-500/50"
                  />
                </th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Venue</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Category</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Area</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Owner</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Events</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Status</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Registered</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVenues.map((venue) => (
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
                      <img
                        src={venue.logo}
                        alt={venue.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <span className="font-medium text-white">{venue.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-300">{venue.category}</td>
                  <td className="p-4 text-gray-300">{venue.area}</td>
                  <td className="p-4 text-gray-400 text-sm">{venue.ownerEmail}</td>
                  <td className="p-4 text-gray-300">{venue.eventsCount}</td>
                  <td className="p-4">{getStatusBadge(venue.status)}</td>
                  <td className="p-4 text-gray-400 text-sm">
                    {new Date(venue.registeredDate).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setOpenActionMenu(openActionMenu === venue.id ? null : venue.id)
                        }
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>

                      {openActionMenu === venue.id && (
                        <>
                          <div
                            className="fixed inset-0 z-40"
                            onClick={() => setOpenActionMenu(null)}
                          />
                          <div className="absolute right-0 mt-1 w-48 bg-[#1A1A2E] border border-white/10 rounded-xl shadow-xl z-50 py-1">
                            <Link
                              href={`/admin/venues/${venue.id}`}
                              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5"
                            >
                              <Eye className="w-4 h-4" />
                              View Details
                            </Link>
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5">
                              <Edit className="w-4 h-4" />
                              Edit
                            </button>
                            {venue.status === 'pending' && (
                              <>
                                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-green-400 hover:bg-green-500/10">
                                  <CheckCircle className="w-4 h-4" />
                                  Approve
                                </button>
                                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10">
                                  <XCircle className="w-4 h-4" />
                                  Reject
                                </button>
                              </>
                            )}
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
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-white/10">
          {filteredVenues.map((venue) => (
            <div key={venue.id} className="p-4">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={selectedVenues.includes(venue.id)}
                  onChange={() => toggleSelect(venue.id)}
                  className="mt-1 w-4 h-4 rounded border-white/30 bg-white/5 text-cyan-500"
                />
                <img
                  src={venue.logo}
                  alt={venue.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-white">{venue.name}</h3>
                      <p className="text-sm text-gray-400">{venue.category}</p>
                    </div>
                    {getStatusBadge(venue.status)}
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    <p>{venue.area} • {venue.eventsCount} events</p>
                    <p className="mt-1">{venue.ownerEmail}</p>
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
                        <button className="px-3 py-1.5 text-xs bg-green-500/20 text-green-400 rounded-lg">
                          Approve
                        </button>
                        <button className="px-3 py-1.5 text-xs bg-red-500/20 text-red-400 rounded-lg">
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
        {filteredVenues.length === 0 && (
          <div className="p-12 text-center">
            <Building2 className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No venues found</h3>
            <p className="text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
