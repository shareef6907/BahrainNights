'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Search,
  Globe,
  FileText,
  Clock,
  Play,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BarChart3,
  Target,
  Zap,
  Calendar
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

interface SEOStats {
  sitemap: {
    totalUrls: number;
    staticUrls: number;
    events: number;
    venues: number;
    attractions: number;
    movies: number;
    offers: number;
  };
  keywords: {
    total: number;
  };
  pages: {
    optimized: number;
    avgScore: number;
  };
  lastRun: {
    date: string;
    status: string;
    pagesOptimized: number;
    duration: number;
  } | null;
  weeklyStats: {
    totalRuns: number;
    successfulRuns: number;
    totalPagesOptimized: number;
    avgDuration: number;
  };
}

interface SEOLog {
  id: string;
  run_date: string;
  pages_optimized: number;
  keywords_checked: number;
  sitemap_updated: boolean;
  errors: string[] | null;
  duration_seconds: number;
  status: string;
  details: any;
}

interface SEOKeyword {
  id: string;
  keyword: string;
  search_volume: number;
  difficulty: string;
  priority: number;
  current_ranking: number | null;
  last_checked: string | null;
}

export default function AdminSEOPage() {
  const [stats, setStats] = useState<SEOStats | null>(null);
  const [logs, setLogs] = useState<SEOLog[]>([]);
  const [keywords, setKeywords] = useState<SEOKeyword[]>([]);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'logs' | 'keywords'>('overview');
  const [runResult, setRunResult] = useState<{ success: boolean; message: string } | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [statsRes, logsRes, keywordsRes] = await Promise.all([
        fetch('/api/admin/seo/stats'),
        fetch('/api/admin/seo/logs?limit=10'),
        fetch('/api/admin/seo/keywords')
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData.data);
      }

      if (logsRes.ok) {
        const logsData = await logsRes.json();
        setLogs(logsData.data || []);
      }

      if (keywordsRes.ok) {
        const keywordsData = await keywordsRes.json();
        setKeywords(keywordsData.data || []);
      }
    } catch (error) {
      console.error('Error fetching SEO data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRunAgent = async () => {
    setRunning(true);
    setRunResult(null);

    try {
      const response = await fetch('/api/admin/seo/run', {
        method: 'POST'
      });

      const data = await response.json();

      setRunResult({
        success: data.success,
        message: data.message || (data.success ? 'SEO agent completed successfully' : 'SEO agent failed')
      });

      // Refresh data after run
      await fetchData();
    } catch (error) {
      setRunResult({
        success: false,
        message: 'Failed to run SEO agent'
      });
    } finally {
      setRunning(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'completed_with_errors':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'low':
        return 'bg-green-500/20 text-green-400';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'high':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Search className="w-8 h-8 text-yellow-400" />
              SEO Dashboard
            </h1>
            <p className="text-gray-400 mt-1">
              Monitor and manage SEO optimization for BahrainNights
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              disabled={loading}
              className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 text-gray-400 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={handleRunAgent}
              disabled={running}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-50"
            >
              {running ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Run SEO Agent
                </>
              )}
            </button>
          </div>
        </div>

        {/* Run Result Alert */}
        {runResult && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
            runResult.success ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'
          }`}>
            {runResult.success ? (
              <CheckCircle className="w-5 h-5 text-green-400" />
            ) : (
              <XCircle className="w-5 h-5 text-red-400" />
            )}
            <span className={runResult.success ? 'text-green-300' : 'text-red-300'}>
              {runResult.message}
            </span>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(['overview', 'logs', 'keywords'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                activeTab === tab
                  ? 'bg-yellow-500 text-black'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <RefreshCw className="w-8 h-8 text-yellow-400 animate-spin" />
          </div>
        ) : (
          <>
            {/* Overview Tab */}
            {activeTab === 'overview' && stats && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <div className="flex items-center gap-3 mb-3">
                      <Globe className="w-6 h-6 text-blue-400" />
                      <span className="text-gray-400">Sitemap URLs</span>
                    </div>
                    <p className="text-3xl font-bold text-white">{stats.sitemap.totalUrls}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {stats.sitemap.events} events, {stats.sitemap.venues} venues
                    </p>
                  </div>

                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <div className="flex items-center gap-3 mb-3">
                      <Target className="w-6 h-6 text-green-400" />
                      <span className="text-gray-400">Target Keywords</span>
                    </div>
                    <p className="text-3xl font-bold text-white">{stats.keywords.total}</p>
                    <p className="text-sm text-gray-500 mt-1">Active keywords tracked</p>
                  </div>

                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <div className="flex items-center gap-3 mb-3">
                      <FileText className="w-6 h-6 text-purple-400" />
                      <span className="text-gray-400">Optimized Pages</span>
                    </div>
                    <p className="text-3xl font-bold text-white">{stats.pages.optimized}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Avg score: {stats.pages.avgScore}/100
                    </p>
                  </div>

                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <div className="flex items-center gap-3 mb-3">
                      <Zap className="w-6 h-6 text-yellow-400" />
                      <span className="text-gray-400">Weekly Stats</span>
                    </div>
                    <p className="text-3xl font-bold text-white">
                      {stats.weeklyStats.successfulRuns}/{stats.weeklyStats.totalRuns}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Successful runs this week
                    </p>
                  </div>
                </div>

                {/* Last Run Info */}
                {stats.lastRun && (
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-yellow-400" />
                      Last Run
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-gray-500 text-sm">Date</p>
                        <p className="text-white">{formatDate(stats.lastRun.date)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Status</p>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(stats.lastRun.status)}
                          <span className="text-white capitalize">{stats.lastRun.status.replace(/_/g, ' ')}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Pages Optimized</p>
                        <p className="text-white">{stats.lastRun.pagesOptimized}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Duration</p>
                        <p className="text-white">{stats.lastRun.duration}s</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sitemap Breakdown */}
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-yellow-400" />
                    Sitemap Breakdown
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    {[
                      { label: 'Static', value: stats.sitemap.staticUrls, color: 'text-gray-400' },
                      { label: 'Events', value: stats.sitemap.events, color: 'text-blue-400' },
                      { label: 'Venues', value: stats.sitemap.venues, color: 'text-green-400' },
                      { label: 'Attractions', value: stats.sitemap.attractions, color: 'text-purple-400' },
                      { label: 'Movies', value: stats.sitemap.movies, color: 'text-red-400' },
                      { label: 'Offers', value: stats.sitemap.offers, color: 'text-yellow-400' },
                      { label: 'Total', value: stats.sitemap.totalUrls, color: 'text-white font-bold' }
                    ].map((item) => (
                      <div key={item.label} className="text-center">
                        <p className={`text-2xl font-semibold ${item.color}`}>{item.value}</p>
                        <p className="text-sm text-gray-500">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Links */}
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="/sitemap.xml"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gray-700 rounded-lg text-gray-300 hover:text-white hover:bg-gray-600 transition-colors"
                    >
                      View Sitemap →
                    </a>
                    <a
                      href="/robots.txt"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gray-700 rounded-lg text-gray-300 hover:text-white hover:bg-gray-600 transition-colors"
                    >
                      View Robots.txt →
                    </a>
                    <a
                      href="https://search.google.com/search-console"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gray-700 rounded-lg text-gray-300 hover:text-white hover:bg-gray-600 transition-colors"
                    >
                      Google Search Console →
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Logs Tab */}
            {activeTab === 'logs' && (
              <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left p-4 text-gray-400 font-medium">Date</th>
                        <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                        <th className="text-left p-4 text-gray-400 font-medium">Pages</th>
                        <th className="text-left p-4 text-gray-400 font-medium">Keywords</th>
                        <th className="text-left p-4 text-gray-400 font-medium">Duration</th>
                        <th className="text-left p-4 text-gray-400 font-medium">Errors</th>
                      </tr>
                    </thead>
                    <tbody>
                      {logs.map((log) => (
                        <tr key={log.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                          <td className="p-4 text-white">{formatDate(log.run_date)}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(log.status)}
                              <span className="text-white capitalize">{log.status.replace(/_/g, ' ')}</span>
                            </div>
                          </td>
                          <td className="p-4 text-white">{log.pages_optimized}</td>
                          <td className="p-4 text-white">{log.keywords_checked}</td>
                          <td className="p-4 text-white">{log.duration_seconds}s</td>
                          <td className="p-4">
                            {log.errors && log.errors.length > 0 ? (
                              <span className="text-red-400">{log.errors.length} errors</span>
                            ) : (
                              <span className="text-green-400">None</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {logs.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    No logs yet. Run the SEO agent to generate logs.
                  </div>
                )}
              </div>
            )}

            {/* Keywords Tab */}
            {activeTab === 'keywords' && (
              <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left p-4 text-gray-400 font-medium">Keyword</th>
                        <th className="text-left p-4 text-gray-400 font-medium">Search Volume</th>
                        <th className="text-left p-4 text-gray-400 font-medium">Difficulty</th>
                        <th className="text-left p-4 text-gray-400 font-medium">Priority</th>
                        <th className="text-left p-4 text-gray-400 font-medium">Ranking</th>
                      </tr>
                    </thead>
                    <tbody>
                      {keywords.map((keyword) => (
                        <tr key={keyword.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                          <td className="p-4 text-white font-medium">{keyword.keyword}</td>
                          <td className="p-4 text-white">{keyword.search_volume.toLocaleString()}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-xs capitalize ${getDifficultyColor(keyword.difficulty)}`}>
                              {keyword.difficulty}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 10 }).map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-2 h-4 rounded-sm ${
                                    i < keyword.priority ? 'bg-yellow-400' : 'bg-gray-600'
                                  }`}
                                />
                              ))}
                            </div>
                          </td>
                          <td className="p-4 text-white">
                            {keyword.current_ranking || '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {keywords.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    No keywords configured. Add keywords to start tracking.
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
}
