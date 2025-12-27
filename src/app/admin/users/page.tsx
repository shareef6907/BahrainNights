'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Search,
  Filter,
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  Building2,
  Shield,
  ShieldCheck,
  ShieldX,
  UserCheck,
  UserX,
  Eye,
  Edit,
  Trash2,
  Download,
  Plus,
  X,
  ChevronDown,
  Clock,
  MapPin
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

// Mock users data
const mockUsers = [
  {
    id: 'user1',
    name: 'Ahmed Al-Khalifa',
    email: 'ahmed@ritzcarlton.bh',
    phone: '+973 1758 0001',
    role: 'venue_owner',
    status: 'active',
    venue: 'The Ritz-Carlton Bahrain',
    eventsCount: 12,
    joinedAt: '2024-03-15',
    lastActive: '2024-12-27',
    avatar: null,
  },
  {
    id: 'user2',
    name: 'Sara Mohammed',
    email: 'sara@fourseasons.bh',
    phone: '+973 1711 0002',
    role: 'venue_owner',
    status: 'active',
    venue: 'Four Seasons Hotel Bahrain',
    eventsCount: 8,
    joinedAt: '2024-04-20',
    lastActive: '2024-12-26',
    avatar: null,
  },
  {
    id: 'user3',
    name: 'Mohammed Hassan',
    email: 'mohammed@gulfhotel.bh',
    phone: '+973 1771 0003',
    role: 'venue_owner',
    status: 'suspended',
    venue: 'Gulf Hotel Bahrain',
    eventsCount: 15,
    joinedAt: '2024-02-10',
    lastActive: '2024-11-15',
    avatar: null,
  },
  {
    id: 'user4',
    name: 'Fatima Ali',
    email: 'fatima@admin.bahrainnights.com',
    phone: '+973 1700 0001',
    role: 'admin',
    status: 'active',
    venue: null,
    eventsCount: 0,
    joinedAt: '2024-01-01',
    lastActive: '2024-12-27',
    avatar: null,
  },
  {
    id: 'user5',
    name: 'Yusuf Ibrahim',
    email: 'yusuf@westin.bh',
    phone: '+973 1795 0001',
    role: 'venue_owner',
    status: 'pending',
    venue: 'The Westin City Centre',
    eventsCount: 0,
    joinedAt: '2024-12-20',
    lastActive: '2024-12-25',
    avatar: null,
  },
  {
    id: 'user6',
    name: 'Layla Nasser',
    email: 'layla@jumeirah.bh',
    phone: '+973 1717 0001',
    role: 'venue_owner',
    status: 'active',
    venue: 'Jumeirah Royal Saray',
    eventsCount: 9,
    joinedAt: '2024-05-01',
    lastActive: '2024-12-26',
    avatar: null,
  },
  {
    id: 'user7',
    name: 'Admin User',
    email: 'super@bahrainnights.com',
    phone: '+973 1700 0000',
    role: 'super_admin',
    status: 'active',
    venue: null,
    eventsCount: 0,
    joinedAt: '2024-01-01',
    lastActive: '2024-12-27',
    avatar: null,
  },
];

const tabs = [
  { id: 'all', label: 'All Users', count: 7 },
  { id: 'venue_owner', label: 'Venue Owners', count: 5 },
  { id: 'admin', label: 'Admins', count: 2 },
  { id: 'suspended', label: 'Suspended', count: 1 },
  { id: 'pending', label: 'Pending', count: 1 },
];

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.venue && user.venue.toLowerCase().includes(searchQuery.toLowerCase()));

    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'suspended') return matchesSearch && user.status === 'suspended';
    if (activeTab === 'pending') return matchesSearch && user.status === 'pending';
    if (activeTab === 'admin') return matchesSearch && (user.role === 'admin' || user.role === 'super_admin');
    return matchesSearch && user.role === activeTab;
  });

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(u => u.id));
    }
  };

  const handleSelectUser = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(prev => prev.filter(id => id !== userId));
    } else {
      setSelectedUsers(prev => [...prev, userId]);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400';
      case 'suspended':
        return 'bg-red-500/20 text-red-400';
      case 'pending':
        return 'bg-amber-500/20 text-amber-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'super_admin':
        return { bg: 'bg-purple-500/20 text-purple-400', icon: ShieldCheck, label: 'Super Admin' };
      case 'admin':
        return { bg: 'bg-cyan-500/20 text-cyan-400', icon: Shield, label: 'Admin' };
      case 'venue_owner':
        return { bg: 'bg-gray-500/20 text-gray-400', icon: Building2, label: 'Venue Owner' };
      default:
        return { bg: 'bg-gray-500/20 text-gray-400', icon: Users, label: role };
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Users Management</h1>
            <p className="text-gray-400 mt-1">Manage venue owners and admin accounts</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg hover:bg-gray-700 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors">
              <Plus className="w-4 h-4" />
              Add User
            </button>
          </div>
        </div>

        {/* Stats Cards */}
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
                <p className="text-2xl font-bold text-white">7</p>
                <p className="text-gray-400 text-sm">Total Users</p>
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
              <div className="p-2 bg-green-500/20 rounded-lg">
                <UserCheck className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">5</p>
                <p className="text-gray-400 text-sm">Active</p>
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
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <Clock className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">1</p>
                <p className="text-gray-400 text-sm">Pending</p>
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
              <div className="p-2 bg-red-500/20 rounded-lg">
                <UserX className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">1</p>
                <p className="text-gray-400 text-sm">Suspended</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-cyan-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {tab.label}
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                activeTab === tab.id ? 'bg-white/20' : 'bg-gray-700'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search users by name, email, or venue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg hover:bg-gray-700 transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        {/* Bulk Actions */}
        {selectedUsers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 mb-6"
          >
            <span className="text-cyan-400">{selectedUsers.length} user(s) selected</span>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors">
                Activate
              </button>
              <button className="px-4 py-2 bg-amber-500/20 text-amber-400 rounded-lg hover:bg-amber-500/30 transition-colors">
                Suspend
              </button>
              <button className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">
                Delete
              </button>
            </div>
          </motion.div>
        )}

        {/* Users Table - Desktop */}
        <div className="hidden lg:block bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-900/50">
              <tr>
                <th className="text-left p-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-gray-600 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 bg-gray-700"
                  />
                </th>
                <th className="text-left p-4 text-gray-400 font-medium">User</th>
                <th className="text-left p-4 text-gray-400 font-medium">Role</th>
                <th className="text-left p-4 text-gray-400 font-medium">Venue</th>
                <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                <th className="text-left p-4 text-gray-400 font-medium">Last Active</th>
                <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredUsers.map((user) => {
                const roleInfo = getRoleBadge(user.role);
                const RoleIcon = roleInfo.icon;
                return (
                  <tr key={user.id} className="hover:bg-gray-700/30 transition-colors">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                        className="w-4 h-4 rounded border-gray-600 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 bg-gray-700"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                          {getInitials(user.name)}
                        </div>
                        <div>
                          <p className="text-white font-medium">{user.name}</p>
                          <p className="text-gray-400 text-sm">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm ${roleInfo.bg}`}>
                        <RoleIcon className="w-3.5 h-3.5" />
                        {roleInfo.label}
                      </span>
                    </td>
                    <td className="p-4">
                      {user.venue ? (
                        <div className="flex items-center gap-2 text-gray-300">
                          <Building2 className="w-4 h-4 text-gray-500" />
                          <span className="truncate max-w-[150px]">{user.venue}</span>
                        </div>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm capitalize ${getStatusBadge(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <p className="text-gray-300">{formatDate(user.lastActive)}</p>
                    </td>
                    <td className="p-4">
                      <div className="relative">
                        <button
                          onClick={() => setOpenDropdown(openDropdown === user.id ? null : user.id)}
                          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>

                        <AnimatePresence>
                          {openDropdown === user.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="absolute right-0 top-full mt-1 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700 py-2 z-50"
                            >
                              <button
                                onClick={() => {
                                  setSelectedUser(user);
                                  setShowUserModal(true);
                                  setOpenDropdown(null);
                                }}
                                className="flex items-center gap-3 w-full px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors"
                              >
                                <Eye className="w-4 h-4" />
                                View Details
                              </button>
                              <button className="flex items-center gap-3 w-full px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors">
                                <Edit className="w-4 h-4" />
                                Edit User
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedUser(user);
                                  setShowRoleModal(true);
                                  setOpenDropdown(null);
                                }}
                                className="flex items-center gap-3 w-full px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors"
                              >
                                <Shield className="w-4 h-4" />
                                Change Role
                              </button>
                              <button className="flex items-center gap-3 w-full px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors">
                                <Mail className="w-4 h-4" />
                                Send Email
                              </button>
                              <hr className="my-2 border-gray-700" />
                              {user.status === 'suspended' ? (
                                <button className="flex items-center gap-3 w-full px-4 py-2 text-green-400 hover:bg-gray-700 transition-colors">
                                  <UserCheck className="w-4 h-4" />
                                  Activate User
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    setSelectedUser(user);
                                    setShowSuspendModal(true);
                                    setOpenDropdown(null);
                                  }}
                                  className="flex items-center gap-3 w-full px-4 py-2 text-amber-400 hover:bg-gray-700 transition-colors"
                                >
                                  <UserX className="w-4 h-4" />
                                  Suspend User
                                </button>
                              )}
                              <button
                                onClick={() => {
                                  setSelectedUser(user);
                                  setShowDeleteModal(true);
                                  setOpenDropdown(null);
                                }}
                                className="flex items-center gap-3 w-full px-4 py-2 text-red-400 hover:bg-gray-700 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete User
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Users Cards - Mobile */}
        <div className="lg:hidden space-y-4">
          {filteredUsers.map((user) => {
            const roleInfo = getRoleBadge(user.role);
            const RoleIcon = roleInfo.icon;
            return (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800/50 rounded-xl p-4 border border-gray-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      className="w-4 h-4 rounded border-gray-600 text-cyan-500 focus:ring-cyan-500"
                    />
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {getInitials(user.name)}
                    </div>
                    <div>
                      <p className="text-white font-medium">{user.name}</p>
                      <p className="text-gray-400 text-sm">{user.email}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm capitalize ${getStatusBadge(user.status)}`}>
                    {user.status}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Role</span>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm ${roleInfo.bg}`}>
                      <RoleIcon className="w-3.5 h-3.5" />
                      {roleInfo.label}
                    </span>
                  </div>
                  {user.venue && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Venue</span>
                      <span className="text-gray-300 text-sm truncate max-w-[200px]">{user.venue}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Last Active</span>
                    <span className="text-gray-300 text-sm">{formatDate(user.lastActive)}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setShowUserModal(true);
                    }}
                    className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                  >
                    View Details
                  </button>
                  <button className="px-3 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No users found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* User Details Modal */}
        <AnimatePresence>
          {showUserModal && selectedUser && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-gray-800 rounded-xl w-full max-w-lg max-h-[90vh] overflow-auto"
              >
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                  <h3 className="text-lg font-semibold text-white">User Details</h3>
                  <button
                    onClick={() => {
                      setShowUserModal(false);
                      setSelectedUser(null);
                    }}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
                <div className="p-6">
                  {/* User Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {getInitials(selectedUser.name)}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">{selectedUser.name}</h4>
                      <p className="text-gray-400">{selectedUser.email}</p>
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-gray-300">
                      <Phone className="w-5 h-5 text-gray-500" />
                      <span>{selectedUser.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Shield className="w-5 h-5 text-gray-500" />
                      <span className="capitalize">{selectedUser.role.replace('_', ' ')}</span>
                    </div>
                    {selectedUser.venue && (
                      <div className="flex items-center gap-3 text-gray-300">
                        <Building2 className="w-5 h-5 text-gray-500" />
                        <span>{selectedUser.venue}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-gray-300">
                      <Calendar className="w-5 h-5 text-gray-500" />
                      <span>Joined {formatDate(selectedUser.joinedAt)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Clock className="w-5 h-5 text-gray-500" />
                      <span>Last active {formatDate(selectedUser.lastActive)}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-gray-700/50 rounded-lg p-4">
                      <p className="text-2xl font-bold text-white">{selectedUser.eventsCount}</p>
                      <p className="text-gray-400 text-sm">Events Created</p>
                    </div>
                    <div className="bg-gray-700/50 rounded-lg p-4">
                      <p className="text-2xl font-bold text-white capitalize">{selectedUser.status}</p>
                      <p className="text-gray-400 text-sm">Account Status</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-6">
                    <button className="flex-1 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors">
                      Edit User
                    </button>
                    <button className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                      Send Email
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Suspend Modal */}
        <AnimatePresence>
          {showSuspendModal && selectedUser && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-gray-800 rounded-xl w-full max-w-md p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-amber-500/20 rounded-full">
                    <UserX className="w-6 h-6 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Suspend User</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  Are you sure you want to suspend <span className="text-white font-medium">{selectedUser.name}</span>? They will lose access to their dashboard and all their events will be hidden.
                </p>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Reason for suspension
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Enter reason..."
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setShowSuspendModal(false);
                      setSelectedUser(null);
                    }}
                    className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      alert('User suspended!');
                      setShowSuspendModal(false);
                      setSelectedUser(null);
                    }}
                    className="flex-1 px-4 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                  >
                    Suspend User
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Delete Modal */}
        <AnimatePresence>
          {showDeleteModal && selectedUser && (
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
                  <h3 className="text-xl font-semibold text-white">Delete User</h3>
                </div>
                <p className="text-gray-400 mb-6">
                  Are you sure you want to delete <span className="text-white font-medium">{selectedUser.name}</span>? This action cannot be undone and all associated data will be permanently removed.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setSelectedUser(null);
                    }}
                    className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      alert('User deleted!');
                      setShowDeleteModal(false);
                      setSelectedUser(null);
                    }}
                    className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Delete User
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Change Role Modal */}
        <AnimatePresence>
          {showRoleModal && selectedUser && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-gray-800 rounded-xl w-full max-w-md p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-purple-500/20 rounded-full">
                    <Shield className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Change User Role</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  Change the role for <span className="text-white font-medium">{selectedUser.name}</span>
                </p>
                <div className="space-y-3 mb-6">
                  <label className="flex items-center gap-3 p-4 bg-gray-700/50 rounded-lg cursor-pointer border border-gray-600 hover:border-cyan-500/50 transition-colors">
                    <input type="radio" name="role" value="venue_owner" defaultChecked={selectedUser.role === 'venue_owner'} className="text-cyan-500" />
                    <div>
                      <p className="text-white font-medium">Venue Owner</p>
                      <p className="text-gray-400 text-sm">Can manage their venue and events</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 bg-gray-700/50 rounded-lg cursor-pointer border border-gray-600 hover:border-cyan-500/50 transition-colors">
                    <input type="radio" name="role" value="admin" defaultChecked={selectedUser.role === 'admin'} className="text-cyan-500" />
                    <div>
                      <p className="text-white font-medium">Admin</p>
                      <p className="text-gray-400 text-sm">Can manage all venues and events</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 bg-gray-700/50 rounded-lg cursor-pointer border border-gray-600 hover:border-cyan-500/50 transition-colors">
                    <input type="radio" name="role" value="super_admin" defaultChecked={selectedUser.role === 'super_admin'} className="text-cyan-500" />
                    <div>
                      <p className="text-white font-medium">Super Admin</p>
                      <p className="text-gray-400 text-sm">Full system access including user management</p>
                    </div>
                  </label>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setShowRoleModal(false);
                      setSelectedUser(null);
                    }}
                    className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      alert('Role updated!');
                      setShowRoleModal(false);
                      setSelectedUser(null);
                    }}
                    className="flex-1 px-4 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                  >
                    Update Role
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
