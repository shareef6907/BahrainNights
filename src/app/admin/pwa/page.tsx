'use client';

import { useState, useEffect } from 'react';
import { Smartphone, Download, Eye, XCircle, TrendingUp, Apple, Monitor } from 'lucide-react';

interface PWAStats {
  summary: {
    totalInstalls: number;
    estimatedIOSInstalls: number;
    promptsShown: number;
    promptsDismissed: number;
    conversionRate: string;
  };
  platform: {
    androidDesktop: number;
    ios: number;
  };
  dailyInstalls: Array<{ date: string; count: number }>;
  recentInstalls: Array<{ date: string; details: Record<string, unknown> }>;
}

export default function PWAStatsPage() {
  const [stats, setStats] = useState<PWAStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/admin/pwa-stats');
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError('Failed to load PWA statistics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-800 rounded w-1/4"></div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-32 bg-gray-800 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] p-8 flex items-center justify-center">
        <div className="text-red-400">{error || 'No data available'}</div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Installs',
      value: stats.summary.totalInstalls,
      icon: Download,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
    },
    {
      title: 'Prompts Shown',
      value: stats.summary.promptsShown,
      icon: Eye,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
    },
    {
      title: 'Prompts Dismissed',
      value: stats.summary.promptsDismissed,
      icon: XCircle,
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/10',
    },
    {
      title: 'Conversion Rate',
      value: stats.summary.conversionRate,
      icon: TrendingUp,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
      isPercent: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="p-3 bg-yellow-500/20 rounded-xl">
            <Smartphone className="w-8 h-8 text-yellow-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">PWA Install Analytics</h1>
            <p className="text-gray-400">Track BahrainNights app installations</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card) => (
            <div
              key={card.title}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400 text-sm">{card.title}</span>
                <div className={`p-2 rounded-lg ${card.bgColor}`}>
                  <card.icon className={`w-5 h-5 ${card.color}`} />
                </div>
              </div>
              <div className={`text-3xl font-bold ${card.color}`}>
                {card.value}
              </div>
            </div>
          ))}
        </div>

        {/* Platform Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Platform Breakdown</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Monitor className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-gray-300">Android / Desktop</span>
                </div>
                <span className="text-xl font-bold text-white">{stats.platform.androidDesktop}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-500/20 rounded-lg">
                    <Apple className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <span className="text-gray-300">iOS (estimated)</span>
                    <p className="text-xs text-gray-500">Based on instruction views</p>
                  </div>
                </div>
                <span className="text-xl font-bold text-white">{stats.platform.ios}</span>
              </div>
            </div>
          </div>

          {/* Daily Installs */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Recent Daily Installs</h2>
            {stats.dailyInstalls.length > 0 ? (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {stats.dailyInstalls.slice(0, 7).map((day) => (
                  <div key={day.date} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
                    <span className="text-gray-400">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                    <span className="text-green-400 font-semibold">{day.count} install{day.count !== 1 ? 's' : ''}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No installs recorded yet</p>
            )}
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-blue-900/20 border border-blue-800 rounded-xl p-6">
          <h3 className="text-blue-400 font-semibold mb-2">📊 About These Stats</h3>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>• <strong>Total Installs:</strong> Users who installed via the browser prompt (Android/Desktop)</li>
            <li>• <strong>iOS Estimated:</strong> iOS doesn&apos;t support automatic PWA install detection. This counts users who viewed install instructions.</li>
            <li>• <strong>Conversion Rate:</strong> Percentage of users who installed after seeing the prompt</li>
            <li>• Tracking started when this feature was deployed. Historical data is not available.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
