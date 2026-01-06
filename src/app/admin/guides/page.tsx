'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import {
  Search,
  Eye,
  Trash2,
  Star,
  Loader2,
  RefreshCw,
  User,
  CheckCircle,
  XCircle,
  BadgeCheck,
  Clock,
  Mail,
  Phone,
} from 'lucide-react';

interface GuideApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp: string | null;
  languages: string[] | null;
  specialties: string[] | null;
  experience: string | null;
  bio: string | null;
  status: string;
  submitted_at: string;
  reviewed_at: string | null;
}

interface LocalGuide {
  id: string;
  name: string;
  slug: string;
  bio: string | null;
  tagline: string | null;
  email: string | null;
  phone: string | null;
  profile_image: string | null;
  languages: string[] | null;
  specialties: string[] | null;
  areas: string[] | null;
  years_experience: number | null;
  hourly_rate: number | null;
  is_verified: boolean;
  is_active: boolean;
  is_featured: boolean;
  rating: number | null;
  review_count: number;
  created_at: string;
}

// Toast notification
function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className={`fixed bottom-4 right-4 z-[100] px-6 py-3 rounded-xl shadow-lg ${
        type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      }`}
    >
      <div className="flex items-center gap-2">
        {type === 'success' ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
        <span className="font-medium">{message}</span>
      </div>
    </motion.div>
  );
}

export default function AdminGuidesPage() {
  const [activeTab, setActiveTab] = useState<'applications' | 'guides'>('applications');
  const [applications, setApplications] = useState<GuideApplication[]>([]);
  const [guides, setGuides] = useState<LocalGuide[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch applications
      const { data: appsData, error: appsError } = await supabase
        .from('guide_applications')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (appsError) throw appsError;
      setApplications(appsData || []);

      // Fetch guides
      const { data: guidesData, error: guidesError } = await supabase
        .from('local_guides')
        .select('*')
        .order('created_at', { ascending: false });

      if (guidesError) throw guidesError;
      setGuides(guidesData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setToast({ message: 'Failed to load data', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const approveApplication = async (application: GuideApplication) => {
    try {
      // Create guide from application
      const slug = application.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

      const { error: guideError } = await supabase
        .from('local_guides')
        .insert({
          name: application.name,
          slug,
          email: application.email,
          phone: application.phone,
          whatsapp: application.whatsapp,
          languages: application.languages,
          specialties: application.specialties,
          bio: application.bio,
          is_active: true,
          is_verified: false,
          is_featured: false,
        });

      if (guideError) throw guideError;

      // Update application status
      const { error: appError } = await supabase
        .from('guide_applications')
        .update({
          status: 'approved',
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', application.id);

      if (appError) throw appError;

      setToast({ message: 'Application approved! Guide created.', type: 'success' });
      fetchData();
    } catch (error) {
      console.error('Error approving application:', error);
      setToast({ message: 'Failed to approve application', type: 'error' });
    }
  };

  const rejectApplication = async (application: GuideApplication) => {
    if (!confirm(`Reject application from "${application.name}"?`)) return;

    try {
      const { error } = await supabase
        .from('guide_applications')
        .update({
          status: 'rejected',
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', application.id);

      if (error) throw error;

      setApplications(prev =>
        prev.map(a => a.id === application.id ? { ...a, status: 'rejected', reviewed_at: new Date().toISOString() } : a)
      );
      setToast({ message: 'Application rejected', type: 'success' });
    } catch (error) {
      console.error('Error rejecting application:', error);
      setToast({ message: 'Failed to reject application', type: 'error' });
    }
  };

  const toggleGuideVerified = async (guide: LocalGuide) => {
    try {
      const { error } = await supabase
        .from('local_guides')
        .update({ is_verified: !guide.is_verified })
        .eq('id', guide.id);

      if (error) throw error;
      setGuides(prev =>
        prev.map(g => g.id === guide.id ? { ...g, is_verified: !g.is_verified } : g)
      );
      setToast({ message: `Guide ${guide.is_verified ? 'unverified' : 'verified'}`, type: 'success' });
    } catch (error) {
      console.error('Error toggling verified:', error);
      setToast({ message: 'Failed to update', type: 'error' });
    }
  };

  const toggleGuideActive = async (guide: LocalGuide) => {
    try {
      const { error } = await supabase
        .from('local_guides')
        .update({ is_active: !guide.is_active })
        .eq('id', guide.id);

      if (error) throw error;
      setGuides(prev =>
        prev.map(g => g.id === guide.id ? { ...g, is_active: !g.is_active } : g)
      );
      setToast({ message: `Guide ${guide.is_active ? 'deactivated' : 'activated'}`, type: 'success' });
    } catch (error) {
      console.error('Error toggling active:', error);
      setToast({ message: 'Failed to update', type: 'error' });
    }
  };

  const deleteGuide = async (guide: LocalGuide) => {
    if (!confirm(`Delete guide "${guide.name}"? This cannot be undone.`)) return;

    try {
      const { error } = await supabase
        .from('local_guides')
        .delete()
        .eq('id', guide.id);

      if (error) throw error;
      setGuides(prev => prev.filter(g => g.id !== guide.id));
      setToast({ message: 'Guide deleted', type: 'success' });
    } catch (error) {
      console.error('Error deleting guide:', error);
      setToast({ message: 'Failed to delete', type: 'error' });
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = searchQuery
      ? app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.email.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredGuides = guides.filter(guide => {
    const matchesSearch = searchQuery
      ? guide.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.email?.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesSearch;
  });

  const pendingCount = applications.filter(a => a.status === 'pending').length;

  return (
    <div className="min-h-screen bg-[#0D0D1A] p-6">
      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Local Guides</h1>
          <p className="text-gray-400">Manage guide applications and profiles</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchData}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={() => window.open('/become-a-guide', '_blank')}
            className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 rounded-lg text-black font-medium transition-colors"
          >
            <Eye className="w-4 h-4" />
            View Page
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('applications')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'applications'
              ? 'bg-cyan-500 text-black'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Applications
          {pendingCount > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-orange-500 text-white text-xs rounded-full">
              {pendingCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('guides')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'guides'
              ? 'bg-cyan-500 text-black'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Active Guides ({guides.length})
        </button>
      </div>

      {/* Filters */}
      <div className="bg-[#1A1A2E] rounded-xl p-4 mb-6 border border-white/10">
        <div className="flex flex-wrap gap-4">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            />
          </div>

          {activeTab === 'applications' && (
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          )}
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
        </div>
      ) : activeTab === 'applications' ? (
        /* Applications List */
        filteredApplications.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No applications found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((app) => (
              <div key={app.id} className="bg-[#1A1A2E] rounded-xl p-6 border border-white/10">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{app.name}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        app.status === 'pending' ? 'bg-orange-500/20 text-orange-400' :
                        app.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-3">
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {app.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {app.phone}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date(app.submitted_at).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {app.languages?.map(lang => (
                        <span key={lang} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                          {lang}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {app.specialties?.map(spec => (
                        <span key={spec} className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded">
                          {spec}
                        </span>
                      ))}
                    </div>
                    {app.bio && (
                      <p className="text-gray-400 text-sm line-clamp-2">{app.bio}</p>
                    )}
                  </div>
                  {app.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => approveApplication(app)}
                        className="px-4 py-2 bg-green-500 hover:bg-green-400 rounded-lg text-black font-medium transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => rejectApplication(app)}
                        className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 font-medium transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        /* Guides List */
        filteredGuides.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No guides found</p>
          </div>
        ) : (
          <div className="bg-[#1A1A2E] rounded-xl border border-white/10 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-gray-400 font-medium">Guide</th>
                  <th className="text-left p-4 text-gray-400 font-medium hidden md:table-cell">Languages</th>
                  <th className="text-left p-4 text-gray-400 font-medium hidden lg:table-cell">Specialties</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                  <th className="text-right p-4 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredGuides.map((guide) => (
                  <tr key={guide.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                          {guide.profile_image ? (
                            <Image
                              src={guide.profile_image}
                              alt={guide.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                              <User className="w-5 h-5 text-gray-500" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-white font-medium">{guide.name}</p>
                            {guide.is_verified && (
                              <BadgeCheck className="w-4 h-4 text-blue-400" />
                            )}
                          </div>
                          <p className="text-gray-400 text-sm">{guide.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {guide.languages?.slice(0, 3).map(lang => (
                          <span key={lang} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {guide.specialties?.slice(0, 2).map(spec => (
                          <span key={spec} className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${guide.is_active ? 'bg-green-400' : 'bg-red-400'}`} />
                        <span className="text-gray-300 text-sm">{guide.is_active ? 'Active' : 'Inactive'}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => toggleGuideVerified(guide)}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          title={guide.is_verified ? 'Remove verification' : 'Verify guide'}
                        >
                          <BadgeCheck className={`w-4 h-4 ${guide.is_verified ? 'text-blue-400' : 'text-gray-400'}`} />
                        </button>
                        <button
                          onClick={() => toggleGuideActive(guide)}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          title={guide.is_active ? 'Deactivate' : 'Activate'}
                        >
                          <Eye className={`w-4 h-4 ${guide.is_active ? 'text-green-400' : 'text-gray-400'}`} />
                        </button>
                        <button
                          onClick={() => deleteGuide(guide)}
                          className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
}
