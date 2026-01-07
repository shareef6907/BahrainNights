'use client';

import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { RefreshCw, CheckCircle, XCircle, Clock, Film, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

interface ScraperLog {
  id: string;
  cinema_chain: string;
  status: string;
  movies_found: number;
  movies_updated: number;
  coming_soon_count: number;
  now_showing_count: number;
  error_message: string | null;
  details: {
    comingSoonTitles?: string[];
    nowShowingTitles?: string[];
  } | null;
  started_at: string;
  completed_at: string | null;
  created_at: string;
}

export default function ScraperLogsPage() {
  const [logs, setLogs] = useState<ScraperLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/cinema/logs');
      const data = await res.json();

      if (data.error) {
        setError(data.error);
      }

      setLogs(data.logs || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch logs');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-400" />;
      case 'running':
        return <RefreshCw className="w-5 h-5 text-amber-400 animate-spin" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-500/10 border-green-500/20 text-green-400';
      case 'failed':
        return 'bg-red-500/10 border-red-500/20 text-red-400';
      case 'running':
        return 'bg-amber-500/10 border-amber-500/20 text-amber-400';
      default:
        return 'bg-gray-500/10 border-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link
            href="/admin/cinema"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Cinema
          </Link>
          <h1 className="text-2xl font-bold text-white">Cinema Scraper Logs</h1>
          <p className="text-gray-400">View history of automated cinema data syncs</p>
        </div>
        <button
          onClick={fetchLogs}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
          <p className="text-red-400">{error}</p>
          {error.includes('not yet created') && (
            <p className="text-sm text-gray-400 mt-2">
              Run the database migrations to create the logs table.
            </p>
          )}
        </div>
      )}

      {/* Logs List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="w-8 h-8 text-amber-400 animate-spin" />
        </div>
      ) : logs.length === 0 ? (
        <div className="text-center py-12 bg-gray-800 rounded-xl">
          <Film className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No scraper logs yet</p>
          <p className="text-gray-500 text-sm mt-2">
            Logs will appear here after running the Mukta Cinema sync
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {logs.map((log) => (
            <div
              key={log.id}
              className={`bg-gray-800 rounded-xl p-4 border ${getStatusColor(log.status)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(log.status)}
                  <div>
                    <h3 className="text-white font-semibold capitalize">
                      {log.cinema_chain} Cinema Sync
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {formatDistanceToNow(new Date(log.created_at), { addSuffix: true })}
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 text-sm">
                  <div className="text-center">
                    <p className="text-gray-500 text-xs">Found</p>
                    <p className="text-white font-bold">{log.movies_found}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-500 text-xs">Updated</p>
                    <p className="text-green-400 font-bold">{log.movies_updated}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-500 text-xs">Coming Soon</p>
                    <p className="text-amber-400 font-bold">{log.coming_soon_count}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-500 text-xs">Now Showing</p>
                    <p className="text-blue-400 font-bold">{log.now_showing_count}</p>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {log.error_message && (
                <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-400 text-sm font-mono">{log.error_message}</p>
                </div>
              )}

              {/* Coming Soon Movies */}
              {log.details?.comingSoonTitles && log.details.comingSoonTitles.length > 0 && (
                <div className="mt-3 p-3 bg-amber-500/5 border border-amber-500/10 rounded-lg">
                  <p className="text-amber-400 text-sm font-semibold mb-1">Coming Soon Movies:</p>
                  <p className="text-gray-300 text-sm">
                    {log.details.comingSoonTitles.join(', ')}
                  </p>
                </div>
              )}

              {/* Now Showing Movies */}
              {log.details?.nowShowingTitles && log.details.nowShowingTitles.length > 0 && (
                <div className="mt-3 p-3 bg-blue-500/5 border border-blue-500/10 rounded-lg">
                  <p className="text-blue-400 text-sm font-semibold mb-1">Now Showing Movies:</p>
                  <p className="text-gray-300 text-sm">
                    {log.details.nowShowingTitles.join(', ')}
                  </p>
                </div>
              )}

              {/* Timestamps */}
              <div className="mt-3 pt-3 border-t border-gray-700/50 flex gap-4 text-xs text-gray-500">
                <span>Started: {new Date(log.started_at).toLocaleString()}</span>
                {log.completed_at && (
                  <span>Completed: {new Date(log.completed_at).toLocaleString()}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
