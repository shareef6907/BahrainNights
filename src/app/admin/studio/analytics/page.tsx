'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  FileText,
  Image,
  PlaySquare,
  Film,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
} from 'lucide-react';

interface AnalyticsData {
  totalContent: number;
  byType: {
    blog: number;
    feed: number;
    story: number;
    reel_brief: number;
  };
  byStatus: {
    draft: number;
    pending_review: number;
    approved: number;
    scheduled: number;
    posted: number;
    rejected: number;
  };
  thisWeek: number;
  thisMonth: number;
  approvalRate: number;
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      // Fetch all content and calculate analytics
      const response = await fetch('/api/admin/studio/content?limit=1000');
      if (response.ok) {
        const data = await response.json();
        const content = data.content || [];

        // Calculate analytics
        const byType = {
          blog: content.filter((c: { content_type: string }) => c.content_type === 'blog').length,
          feed: content.filter((c: { content_type: string }) => c.content_type === 'feed').length,
          story: content.filter((c: { content_type: string }) => c.content_type === 'story').length,
          reel_brief: content.filter((c: { content_type: string }) => c.content_type === 'reel_brief').length,
        };

        const byStatus = {
          draft: content.filter((c: { status: string }) => c.status === 'draft').length,
          pending_review: content.filter((c: { status: string }) => c.status === 'pending_review').length,
          approved: content.filter((c: { status: string }) => c.status === 'approved').length,
          scheduled: content.filter((c: { status: string }) => c.status === 'scheduled').length,
          posted: content.filter((c: { status: string }) => c.status === 'posted').length,
          rejected: content.filter((c: { status: string }) => c.status === 'rejected').length,
        };

        const now = new Date();
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

        const thisWeek = content.filter((c: { created_at: string }) => new Date(c.created_at) >= weekAgo).length;
        const thisMonth = content.filter((c: { created_at: string }) => new Date(c.created_at) >= monthAgo).length;

        const reviewed = byStatus.approved + byStatus.posted + byStatus.rejected;
        const approvalRate = reviewed > 0 ? ((byStatus.approved + byStatus.posted) / reviewed) * 100 : 0;

        setAnalytics({
          totalContent: content.length,
          byType,
          byStatus,
          thisWeek,
          thisMonth,
          approvalRate: Math.round(approvalRate),
        });
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const contentTypeCards = [
    { key: 'blog' as const, label: 'Blog Posts', icon: FileText, color: 'from-blue-500 to-indigo-500' },
    { key: 'feed' as const, label: 'Feed Posts', icon: Image, color: 'from-pink-500 to-rose-500' },
    { key: 'story' as const, label: 'Stories', icon: PlaySquare, color: 'from-purple-500 to-violet-500' },
    { key: 'reel_brief' as const, label: 'Reel Briefs', icon: Film, color: 'from-orange-500 to-red-500' },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-cyan-400" />
            Studio Analytics
          </h1>
          <p className="text-gray-400 mt-1">Content generation performance metrics</p>
        </div>
        <button
          onClick={fetchAnalytics}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-gray-300 transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-white/10 rounded-2xl p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-3xl font-bold text-white">{analytics?.totalContent || 0}</span>
          </div>
          <p className="text-sm text-gray-400">Total Content</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-white/10 rounded-2xl p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-3xl font-bold text-white">{analytics?.thisWeek || 0}</span>
          </div>
          <p className="text-sm text-gray-400">This Week</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10 rounded-2xl p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="text-3xl font-bold text-white">{analytics?.thisMonth || 0}</span>
          </div>
          <p className="text-sm text-gray-400">This Month</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-white/10 rounded-2xl p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-3xl font-bold text-white">{analytics?.approvalRate || 0}%</span>
          </div>
          <p className="text-sm text-gray-400">Approval Rate</p>
        </motion.div>
      </div>

      {/* Content by Type */}
      <div className="bg-[#0F0F1A]/50 border border-white/10 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Content by Type</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {contentTypeCards.map((type, index) => {
            const Icon = type.icon;
            const count = analytics?.byType[type.key] || 0;
            const total = analytics?.totalContent || 1;
            const percentage = Math.round((count / total) * 100);

            return (
              <motion.div
                key={type.key}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 rounded-xl p-4"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${type.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{count}</p>
                    <p className="text-xs text-gray-400">{type.label}</p>
                  </div>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    className={`h-full bg-gradient-to-r ${type.color}`}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">{percentage}% of total</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Content by Status */}
      <div className="bg-[#0F0F1A]/50 border border-white/10 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Content by Status</h2>
        <div className="space-y-3">
          {[
            { key: 'pending_review' as const, label: 'Pending Review', color: 'bg-yellow-500', icon: Clock },
            { key: 'approved' as const, label: 'Approved', color: 'bg-green-500', icon: CheckCircle },
            { key: 'scheduled' as const, label: 'Scheduled', color: 'bg-blue-500', icon: Calendar },
            { key: 'posted' as const, label: 'Posted', color: 'bg-purple-500', icon: TrendingUp },
            { key: 'rejected' as const, label: 'Rejected', color: 'bg-red-500', icon: XCircle },
          ].map((status) => {
            const count = analytics?.byStatus[status.key] || 0;
            const total = analytics?.totalContent || 1;
            const percentage = Math.round((count / total) * 100);
            const Icon = status.icon;

            return (
              <div key={status.key} className="flex items-center gap-4">
                <div className="w-32 flex items-center gap-2 text-gray-400">
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{status.label}</span>
                </div>
                <div className="flex-1 h-4 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className={`h-full ${status.color}`}
                  />
                </div>
                <span className="w-16 text-right text-sm text-gray-400">
                  {count} ({percentage}%)
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Empty State Message */}
      {analytics?.totalContent === 0 && (
        <div className="text-center py-12 bg-[#0F0F1A]/50 border border-white/10 rounded-2xl">
          <BarChart3 className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No Analytics Yet</h3>
          <p className="text-gray-400">Start generating content to see analytics here</p>
        </div>
      )}
    </div>
  );
}
