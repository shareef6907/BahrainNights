'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Search,
  RefreshCw,
  Film,
  Calendar,
  Star,
  ExternalLink,
  Eye,
  Edit,
  MoreVertical,
  CheckCircle,
  XCircle,
  Loader2,
  Play,
  Timer,
  Globe,
  Building2,
} from 'lucide-react';

interface Movie {
  id: string;
  tmdb_id: number;
  title: string;
  slug: string;
  poster_url: string;
  backdrop_url: string;
  duration_minutes: number;
  genre: string[];
  rating: string;
  synopsis: string;
  release_date: string;
  trailer_url: string;
  language: string;
  director: string;
  cast: string[];
  tmdb_rating: number;
  is_now_showing: boolean;
  is_coming_soon: boolean;
  scraped_from?: string[];
  last_scraped?: string;
  created_at: string;
  updated_at: string;
}

interface AgentStatus {
  stats: {
    total_movies: number;
    now_showing: number;
    coming_soon: number;
    cinemas: number;
  };
  latest_run: {
    id: string;
    started_at: string;
    completed_at: string;
    status: string;
    items_found: number;
    items_added: number;
    items_updated: number;
    error_count: number;
    duration_ms: number;
  } | null;
}

interface ScrapeStatus {
  lastScrape: {
    started_at: string;
    completed_at: string;
    status: string;
    items_found: number;
    items_updated: number;
    duration_ms: number;
    agent_type?: string;
    metadata?: {
      scrapeResults?: { cinema: string; moviesFound: number }[];
      cinemas?: { name: string; count: number }[];
      matchedCount?: number;
      unmatchedCount?: number;
      unmatchedTitles?: string[];
      usedFallback?: boolean;
      usedTMDBFallback?: boolean;
    };
  } | null;
  nowShowingCount: number;
  scrapedMovies: { title: string; scraped_from: string[]; last_scraped: string }[];
}

type MovieTab = 'all' | 'now_showing' | 'coming_soon';

// Helper to construct full TMDB image URLs
function getPosterUrl(posterPath: string | null): string {
  if (!posterPath) return '';
  if (posterPath.startsWith('http')) return posterPath;
  // Handle paths like "/abc123.jpg" - prepend TMDB URL
  return `https://image.tmdb.org/t/p/w500${posterPath}`;
}

export default function AdminCinemaPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<{ success: boolean; message: string } | null>(null);
  const [status, setStatus] = useState<AgentStatus | null>(null);
  const [scrapeStatus, setScrapeStatus] = useState<ScrapeStatus | null>(null);
  const [activeTab, setActiveTab] = useState<MovieTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openActionMenu, setOpenActionMenu] = useState<string | null>(null);

  // Fetch movies and status
  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch TMDB sync status
      const statusRes = await fetch('/api/agents/cinema/status');
      if (statusRes.ok) {
        const statusData = await statusRes.json();
        setStatus(statusData);
      }

      // Fetch GitHub Actions scrape status from agent_logs
      const scrapeStatusRes = await fetch('/api/agents/cinema/scrape-status');
      if (scrapeStatusRes.ok) {
        const scrapeData = await scrapeStatusRes.json();
        setScrapeStatus(scrapeData);
      }

      // Fetch movies from Supabase
      const moviesRes = await fetch('/api/cinema/movies');
      if (moviesRes.ok) {
        const moviesData = await moviesRes.json();
        setMovies(moviesData.movies || []);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Sync with TMDB
  const handleSync = async () => {
    try {
      setSyncing(true);
      setSyncResult(null);

      const res = await fetch('/api/agents/cinema/run', { method: 'POST' });
      const data = await res.json();

      if (data.success) {
        setSyncResult({
          success: true,
          message: `Synced ${data.summary.found} movies. Added: ${data.summary.added}, Updated: ${data.summary.updated}`,
        });
        // Refresh data
        await fetchData();
      } else {
        setSyncResult({
          success: false,
          message: data.error || 'Sync failed',
        });
      }
    } catch (error) {
      setSyncResult({
        success: false,
        message: 'Failed to sync with TMDB',
      });
    } finally {
      setSyncing(false);
    }
  };

  // Toggle movie status
  const toggleMovieStatus = async (movieId: string, field: 'is_now_showing' | 'is_coming_soon', value: boolean) => {
    try {
      const res = await fetch(`/api/cinema/movies/${movieId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: value }),
      });

      if (res.ok) {
        setMovies(prev =>
          prev.map(m =>
            m.id === movieId ? { ...m, [field]: value } : m
          )
        );
      }
    } catch (error) {
      console.error('Failed to update movie:', error);
    }
  };

  // Filter movies
  const filteredMovies = movies.filter(movie => {
    const matchesSearch =
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.director?.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 'now_showing') return matchesSearch && movie.is_now_showing;
    if (activeTab === 'coming_soon') return matchesSearch && movie.is_coming_soon;
    return matchesSearch;
  });

  const tabCounts = {
    all: movies.length,
    now_showing: movies.filter(m => m.is_now_showing).length,
    coming_soon: movies.filter(m => m.is_coming_soon).length,
  };

  const formatDuration = (mins: number) => {
    if (!mins) return 'N/A';
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const timeSince = (dateStr: string) => {
    if (!dateStr) return 'Never';
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (mins > 0) return `${mins}m ago`;
    return 'Just now';
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
          <h1 className="text-2xl font-bold text-white">Cinema Manager</h1>
          <p className="text-gray-400 mt-1">
            Sync movies from TMDB. Cinema scraping runs automatically via GitHub Actions.
          </p>
        </div>

        <div className="flex gap-3">
          <a
            href="https://github.com/shareef6907/BahrainNights/actions/workflows/cinema-scraper.yml"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:opacity-90 transition-opacity"
          >
            <Globe className="w-4 h-4" />
            View Scraper Logs
          </a>
          <button
            onClick={handleSync}
            disabled={syncing}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {syncing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            {syncing ? 'Syncing...' : 'Sync TMDB'}
          </button>
        </div>
      </motion.div>

      {/* Results */}
      {syncResult && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl ${
            syncResult.success
              ? 'bg-green-500/10 border border-green-500/20'
              : 'bg-red-500/10 border border-red-500/20'
          }`}
        >
          <p className={syncResult.success ? 'text-green-400' : 'text-red-400'}>
            {syncResult.message}
          </p>
        </motion.div>
      )}


      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-5 gap-4"
      >
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <Film className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{status?.stats.total_movies || 0}</p>
              <p className="text-xs text-gray-400">Total Movies</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Play className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{status?.stats.now_showing || 0}</p>
              <p className="text-xs text-gray-400">Now Showing</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <Calendar className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{status?.stats.coming_soon || 0}</p>
              <p className="text-xs text-gray-400">Coming Soon</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <Timer className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">
                {status?.latest_run ? timeSince(status.latest_run.completed_at) : 'Never'}
              </p>
              <p className="text-xs text-gray-400">Last TMDB Sync</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Globe className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">
                {scrapeStatus?.lastScrape ? timeSince(scrapeStatus.lastScrape.completed_at) : 'Never'}
              </p>
              <p className="text-xs text-gray-400">Last Scrape</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scrape Status Details */}
      {scrapeStatus?.lastScrape && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-4"
        >
          <h3 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-purple-400" />
            Last GitHub Actions Scrape
            {(scrapeStatus.lastScrape.metadata?.usedFallback || scrapeStatus.lastScrape.metadata?.usedTMDBFallback) && (
              <span className="px-2 py-0.5 text-xs bg-yellow-500/20 text-yellow-400 rounded ml-2">
                Used TMDB Fallback
              </span>
            )}
          </h3>

          {/* Cinema results from GitHub Actions */}
          {scrapeStatus.lastScrape.metadata?.cinemas && scrapeStatus.lastScrape.metadata.cinemas.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {scrapeStatus.lastScrape.metadata.cinemas.map((result) => (
                <div
                  key={result.name}
                  className="bg-white/5 rounded-lg p-3 text-center"
                >
                  <p className="text-lg font-bold text-white">{result.count}</p>
                  <p className="text-xs text-gray-400">{result.name}</p>
                </div>
              ))}
            </div>
          )}

          {/* Summary stats */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Status:</span>
              <span className={scrapeStatus.lastScrape.status === 'completed' ? 'text-green-400' : 'text-red-400'}>
                {scrapeStatus.lastScrape.status}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Found:</span>
              <span className="text-white">{scrapeStatus.lastScrape.items_found} titles</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Matched:</span>
              <span className="text-white">{scrapeStatus.lastScrape.items_updated} movies</span>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-3">
            Scrapes automatically every 6 hours via GitHub Actions. You can also manually trigger from the Actions tab.
          </p>
        </motion.div>
      )}

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex gap-2 border-b border-white/10 pb-px overflow-x-auto"
      >
        {(['all', 'now_showing', 'coming_soon'] as MovieTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors relative ${
              activeTab === tab
                ? 'text-cyan-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab === 'now_showing' ? 'Now Showing' : tab === 'coming_soon' ? 'Coming Soon' : 'All Movies'}
            <span className="ml-2 px-1.5 py-0.5 text-xs bg-white/10 rounded">
              {tabCounts[tab]}
            </span>
            {activeTab === tab && (
              <motion.div
                layoutId="cinema-tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400"
              />
            )}
          </button>
        ))}
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-cyan-500/50"
          />
        </div>
      </motion.div>

      {/* Movies Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
      >
        {loading ? (
          <div className="p-12 text-center">
            <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading movies...</p>
          </div>
        ) : filteredMovies.length === 0 ? (
          <div className="p-12 text-center">
            <Film className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No movies found</h3>
            <p className="text-gray-400 mb-4">
              {movies.length === 0
                ? 'Click "Sync TMDB" to fetch movies, then "Scrape Cinemas" to detect now showing'
                : 'Try adjusting your search'}
            </p>
            {movies.length === 0 && (
              <button
                onClick={handleSync}
                disabled={syncing}
                className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
              >
                Sync Now
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 text-sm font-medium text-gray-400">Movie</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-400">Genre</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-400">Duration</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-400">Rating</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-400">Source</th>
                    <th className="text-center p-4 text-sm font-medium text-gray-400">Now Showing</th>
                    <th className="text-center p-4 text-sm font-medium text-gray-400">Coming Soon</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMovies.map((movie) => (
                    <tr
                      key={movie.id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-16 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
                            {getPosterUrl(movie.poster_url) ? (
                              <Image
                                src={getPosterUrl(movie.poster_url)}
                                alt={movie.title}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Film className="w-6 h-6 text-gray-500" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-white">{movie.title}</p>
                            <p className="text-xs text-gray-500">{movie.language}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {movie.genre?.slice(0, 2).map((g: string) => (
                            <span
                              key={g}
                              className="px-2 py-0.5 text-xs bg-white/10 text-gray-300 rounded"
                            >
                              {g}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 text-gray-300 text-sm">
                        {formatDuration(movie.duration_minutes)}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white">{movie.tmdb_rating?.toFixed(1) || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        {movie.scraped_from && movie.scraped_from.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {movie.scraped_from.map((source) => (
                              <span
                                key={source}
                                className="px-2 py-0.5 text-xs bg-purple-500/20 text-purple-400 rounded"
                              >
                                {source}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs text-gray-500">Manual</span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => toggleMovieStatus(movie.id, 'is_now_showing', !movie.is_now_showing)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            movie.is_now_showing
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-white/5 text-gray-500 hover:text-gray-300'
                          }`}
                        >
                          {movie.is_now_showing ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <XCircle className="w-5 h-5" />
                          )}
                        </button>
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => toggleMovieStatus(movie.id, 'is_coming_soon', !movie.is_coming_soon)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            movie.is_coming_soon
                              ? 'bg-orange-500/20 text-orange-400'
                              : 'bg-white/5 text-gray-500 hover:text-gray-300'
                          }`}
                        >
                          {movie.is_coming_soon ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <XCircle className="w-5 h-5" />
                          )}
                        </button>
                      </td>
                      <td className="p-4">
                        <div className="relative">
                          <button
                            onClick={() => setOpenActionMenu(openActionMenu === movie.id ? null : movie.id)}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          >
                            <MoreVertical className="w-4 h-4 text-gray-400" />
                          </button>

                          {openActionMenu === movie.id && (
                            <>
                              <div
                                className="fixed inset-0 z-40"
                                onClick={() => setOpenActionMenu(null)}
                              />
                              <div className="absolute right-0 mt-1 w-48 bg-[#1A1A2E] border border-white/10 rounded-xl shadow-xl z-50 py-1">
                                <Link
                                  href={`/cinema/${movie.slug}`}
                                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5"
                                >
                                  <Eye className="w-4 h-4" />
                                  View on Site
                                </Link>
                                <Link
                                  href={`/admin/cinema/${movie.id}`}
                                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5"
                                >
                                  <Edit className="w-4 h-4" />
                                  Edit Details
                                </Link>
                                <a
                                  href={`https://www.themoviedb.org/movie/${movie.tmdb_id}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                  View on TMDB
                                </a>
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
            <div className="lg:hidden divide-y divide-white/10">
              {filteredMovies.map((movie) => (
                <div key={movie.id} className="p-4">
                  <div className="flex gap-3">
                    <div className="relative w-16 h-24 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
                      {getPosterUrl(movie.poster_url) ? (
                        <Image
                          src={getPosterUrl(movie.poster_url)}
                          alt={movie.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Film className="w-6 h-6 text-gray-500" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white truncate">{movie.title}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {movie.genre?.slice(0, 2).join(', ')} • {formatDuration(movie.duration_minutes)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-300">{movie.tmdb_rating?.toFixed(1)}</span>
                        {movie.scraped_from && movie.scraped_from.length > 0 && (
                          <span className="px-2 py-0.5 text-xs bg-purple-500/20 text-purple-400 rounded">
                            {movie.scraped_from[0]}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => toggleMovieStatus(movie.id, 'is_now_showing', !movie.is_now_showing)}
                          className={`px-2 py-1 text-xs rounded ${
                            movie.is_now_showing
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-white/5 text-gray-500'
                          }`}
                        >
                          Now Showing
                        </button>
                        <button
                          onClick={() => toggleMovieStatus(movie.id, 'is_coming_soon', !movie.is_coming_soon)}
                          className={`px-2 py-1 text-xs rounded ${
                            movie.is_coming_soon
                              ? 'bg-orange-500/20 text-orange-400'
                              : 'bg-white/5 text-gray-500'
                          }`}
                        >
                          Coming Soon
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
