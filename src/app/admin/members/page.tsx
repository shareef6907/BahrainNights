'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Search,
  Heart,
  Calendar,
  Mail,
  Trash2,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Clock,
  Building2,
  Loader2,
  UserCheck,
  Activity,
  TrendingUp,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import Image from 'next/image';

interface Member {
  id: string;
  google_id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
  last_login: string;
  likes_count: number;
}

interface VenueLike {
  id: string;
  created_at: string;
  venue_id: string;
  venues: {
    id: string;
    name: string;
    slug: string;
    category: string;
    area: string;
    logo_url: string | null;
  } | null;
}

interface Stats {
  totalUsers: number;
  totalLikes: number;
  newToday: number;
  activeThisWeek: number;
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [memberLikes, setMemberLikes] = useState<VenueLike[]>([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchMembers();
  }, [page, sortBy, sortOrder]);

  const fetchMembers = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        sortBy,
        sortOrder,
        ...(searchQuery && { search: searchQuery }),
      });

      const response = await fetch(`/api/admin/members?${params}`);
      if (response.ok) {
        const data = await response.json();
        setMembers(data.members);
        setStats(data.stats);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchMembers();
  };

  const viewMemberDetails = async (member: Member) => {
    setSelectedMember(member);
    setShowDetailsModal(true);
    setLoadingDetails(true);

    try {
      const response = await fetch(`/api/admin/members/${member.id}`);
      if (response.ok) {
        const data = await response.json();
        setMemberLikes(data.likes);
      }
    } catch (error) {
      console.error('Error fetching member details:', error);
    } finally {
      setLoadingDetails(false);
    }
  };

  const deleteMember = async () => {
    if (!deletingId) return;

    try {
      const response = await fetch(`/api/admin/members/${deletingId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMembers((prev) => prev.filter((m) => m.id !== deletingId));
        setShowDeleteModal(false);
        setDeletingId(null);
        if (stats) {
          setStats({ ...stats, totalUsers: stats.totalUsers - 1 });
        }
      }
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatDateTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getInitials = (name: string | null, email: string) => {
    if (name) {
      return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return email.slice(0, 2).toUpperCase();
  };

  const getTimeAgo = (dateStr: string) => {
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Members</h1>
            <p className="text-gray-400 mt-1">
              Manage Google users who signed in to like venues
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800/50 rounded-xl p-4 border border-gray-700"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-500/20 rounded-lg">
                  <Users className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
                  <p className="text-gray-400 text-sm">Total Members</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-800/50 rounded-xl p-4 border border-gray-700"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-pink-500/20 rounded-lg">
                  <Heart className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stats.totalLikes}</p>
                  <p className="text-gray-400 text-sm">Total Likes</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800/50 rounded-xl p-4 border border-gray-700"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stats.newToday}</p>
                  <p className="text-gray-400 text-sm">New Today</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800/50 rounded-xl p-4 border border-gray-700"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/20 rounded-lg">
                  <Activity className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stats.activeThisWeek}</p>
                  <p className="text-gray-400 text-sm">Active This Week</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Search and Filters */}
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [newSortBy, newSortOrder] = e.target.value.split('-');
              setSortBy(newSortBy);
              setSortOrder(newSortOrder as 'asc' | 'desc');
              setPage(1);
            }}
            className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="created_at-desc">Newest First</option>
            <option value="created_at-asc">Oldest First</option>
            <option value="last_login-desc">Recently Active</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
          </select>
          <button
            type="submit"
            className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
          >
            Search
          </button>
        </form>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
          </div>
        )}

        {/* Members Table - Desktop */}
        {!isLoading && (
          <div className="hidden lg:block bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-900/50">
                <tr>
                  <th className="text-left p-4 text-gray-400 font-medium">Member</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Joined</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Last Active</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Likes</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {members.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-700/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {member.avatar_url ? (
                          <Image
                            src={member.avatar_url}
                            alt={member.name || 'User'}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                            {getInitials(member.name, member.email)}
                          </div>
                        )}
                        <div>
                          <p className="text-white font-medium">
                            {member.name || 'Unnamed User'}
                          </p>
                          <p className="text-gray-400 text-sm">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-gray-300">{formatDate(member.created_at)}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-400"></span>
                        <span className="text-gray-300">{getTimeAgo(member.last_login)}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm bg-pink-500/20 text-pink-400">
                        <Heart className="w-3.5 h-3.5" />
                        {member.likes_count}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => viewMemberDetails(member)}
                          className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-400 hover:text-white"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setDeletingId(member.id);
                            setShowDeleteModal(true);
                          }}
                          className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-gray-400 hover:text-red-400"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Members Cards - Mobile */}
        {!isLoading && (
          <div className="lg:hidden space-y-4">
            {members.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800/50 rounded-xl p-4 border border-gray-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {member.avatar_url ? (
                      <Image
                        src={member.avatar_url}
                        alt={member.name || 'User'}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {getInitials(member.name, member.email)}
                      </div>
                    )}
                    <div>
                      <p className="text-white font-medium">{member.name || 'Unnamed User'}</p>
                      <p className="text-gray-400 text-sm">{member.email}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm bg-pink-500/20 text-pink-400">
                    <Heart className="w-3.5 h-3.5" />
                    {member.likes_count}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Joined</span>
                    <span className="text-gray-300 text-sm">{formatDate(member.created_at)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Last Active</span>
                    <span className="text-gray-300 text-sm">{getTimeAgo(member.last_login)}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => viewMemberDetails(member)}
                    className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => {
                      setDeletingId(member.id);
                      setShowDeleteModal(true);
                    }}
                    className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && members.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No members found</h3>
            <p className="text-gray-400">No Google users have signed up yet</p>
          </div>
        )}

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-gray-400">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Member Details Modal */}
        <AnimatePresence>
          {showDetailsModal && selectedMember && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-gray-800 rounded-xl w-full max-w-lg max-h-[90vh] overflow-auto"
              >
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                  <h3 className="text-lg font-semibold text-white">Member Details</h3>
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      setSelectedMember(null);
                      setMemberLikes([]);
                    }}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
                <div className="p-6">
                  {/* Member Header */}
                  <div className="flex items-center gap-4 mb-6">
                    {selectedMember.avatar_url ? (
                      <Image
                        src={selectedMember.avatar_url}
                        alt={selectedMember.name || 'User'}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {getInitials(selectedMember.name, selectedMember.email)}
                      </div>
                    )}
                    <div>
                      <h4 className="text-xl font-bold text-white">
                        {selectedMember.name || 'Unnamed User'}
                      </h4>
                      <p className="text-gray-400">{selectedMember.email}</p>
                    </div>
                  </div>

                  {/* Member Info */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 text-gray-300">
                      <Mail className="w-5 h-5 text-gray-500" />
                      <span>{selectedMember.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Calendar className="w-5 h-5 text-gray-500" />
                      <span>Joined {formatDateTime(selectedMember.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Clock className="w-5 h-5 text-gray-500" />
                      <span>Last active {formatDateTime(selectedMember.last_login)}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-pink-400" />
                      <span className="text-2xl font-bold text-white">{selectedMember.likes_count}</span>
                      <span className="text-gray-400">venues liked</span>
                    </div>
                  </div>

                  {/* Liked Venues */}
                  <div>
                    <h5 className="text-white font-medium mb-3">Liked Venues</h5>
                    {loadingDetails ? (
                      <div className="flex items-center justify-center py-4">
                        <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
                      </div>
                    ) : memberLikes.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">No liked venues yet</p>
                    ) : (
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {memberLikes.map((like) => (
                          <div
                            key={like.id}
                            className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg"
                          >
                            {like.venues?.logo_url ? (
                              <Image
                                src={like.venues.logo_url}
                                alt={like.venues?.name || 'Venue'}
                                width={40}
                                height={40}
                                className="w-10 h-10 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center">
                                <Building2 className="w-5 h-5 text-gray-400" />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-white font-medium truncate">
                                {like.venues?.name || 'Unknown Venue'}
                              </p>
                              <p className="text-gray-400 text-sm">
                                {like.venues?.area} - {like.venues?.category}
                              </p>
                            </div>
                            <span className="text-gray-500 text-xs">
                              {formatDate(like.created_at)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteModal && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-gray-800 rounded-xl w-full max-w-md p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-red-500/20 rounded-full">
                    <Trash2 className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Delete Member</h3>
                </div>
                <p className="text-gray-400 mb-6">
                  Are you sure you want to delete this member? This will also remove all their likes. This action cannot be undone.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setDeletingId(null);
                    }}
                    className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={deleteMember}
                    className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Delete Member
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
}
