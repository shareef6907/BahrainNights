'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  FileText,
  Image,
  PlaySquare,
  Film,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Calendar,
  Zap,
  RefreshCw,
} from 'lucide-react';
import ContentCard from '@/components/studio/ContentCard';
import StatusBadge from '@/components/studio/StatusBadge';

interface ContentStats {
  pending: number;
  approved: number;
  scheduled: number;
  published: number;
}

interface PendingContent {
  id: string;
  type: 'blog' | 'feed' | 'story' | 'reel_brief';
  title: string;
  createdAt: string;
  source?: string;
}

export default function StudioDashboardPage() {
  const [stats, setStats] = useState<ContentStats>({
    pending: 0,
    approved: 0,
    scheduled: 0,
    published: 0,
  });
  const [pendingContent, setPendingContent] = useState<PendingContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/studio/dashboard');
      if (response.ok) {
        const data = await response.json();
        setStats(data.stats || stats);
        setPendingContent(data.pending || []);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickGenerate = async (type: string) => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/admin/studio/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, count: 1 }),
      });

      if (response.ok) {
        await fetchDashboardData();
      }
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const statCards = [
    {
      label: 'Pending Review',
      value: stats.pending,
      icon: Clock,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-500/10',
    },
    {
      label: 'Approved',
      value: stats.approved,
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
    },
    {
      label: 'Scheduled',
      value: stats.scheduled,
      icon: Calendar,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: 'Published Today',
      value: stats.published,
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
    },
  ];

  const quickGenerateOptions = [
    { type: 'blog', label: 'Blog Post', icon: FileText, color: 'from-blue-500 to-indigo-500' },
    { type: 'feed', label: 'Feed Post', icon: Image, color: 'from-pink-500 to-rose-500' },
    { type: 'story', label: 'Story Set', icon: PlaySquare, color: 'from-purple-500 to-violet-500' },
    { type: 'reel', label: 'Reel Brief', icon: Film, color: 'from-orange-500 to-red-500' },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" />
          <p className="text-gray-400">Loading Content Studio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-400" />
            Content Studio
          </h1>
          <p className="text-gray-400 mt-1">AI-powered content generation and management</p>
        </div>
        <button
          onClick={() => fetchDashboardData()}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-gray-300 transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${stat.bgColor} border border-white/10 rounded-2xl p-4`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-3xl font-bold text-white">{stat.value}</span>
              </div>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Generate Section */}
      <div className="bg-[#0F0F1A]/50 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-yellow-400" />
          <h2 className="text-lg font-semibold text-white">Quick Generate</h2>
        </div>
        <p className="text-gray-400 text-sm mb-4">
          Generate AI content based on upcoming events and trending topics
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickGenerateOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.type}
                onClick={() => handleQuickGenerate(option.type)}
                disabled={isGenerating}
                className={`flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r ${option.color} opacity-90 hover:opacity-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <Icon className="w-5 h-5 text-white" />
                <span className="text-white font-medium">{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Pending Approvals */}
      <div className="bg-[#0F0F1A]/50 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-400" />
            <h2 className="text-lg font-semibold text-white">Pending Review</h2>
            {stats.pending > 0 && (
              <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                {stats.pending}
              </span>
            )}
          </div>
        </div>

        {pendingContent.length === 0 ? (
          <div className="text-center py-12">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <p className="text-gray-400">All caught up! No content pending review.</p>
            <p className="text-gray-500 text-sm mt-1">Use Quick Generate to create new content</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pendingContent.map((content) => (
              <ContentCard
                key={content.id}
                id={content.id}
                type={content.type}
                title={content.title}
                createdAt={content.createdAt}
                source={content.source}
                onApprove={fetchDashboardData}
                onReject={fetchDashboardData}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content Type Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-[#0F0F1A]/50 border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-gray-400">Content Studio initialized</span>
              <span className="text-gray-500 ml-auto">Just now</span>
            </div>
          </div>
        </div>

        {/* AI Status */}
        <div className="bg-[#0F0F1A]/50 border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">AI Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Claude Haiku</span>
              <StatusBadge status="active" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Auto-Generation</span>
              <StatusBadge status="inactive" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Instagram API</span>
              <StatusBadge status="not_connected" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
