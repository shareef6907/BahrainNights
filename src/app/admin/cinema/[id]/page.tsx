'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Film,
  Clock,
  Calendar,
  Star,
  ExternalLink,
  Play,
  Save,
  Loader2,
  Users,
  Globe,
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
  trailer_key: string;
  language: string;
  director: string;
  cast: string[];
  tmdb_rating: number;
  is_now_showing: boolean;
  is_coming_soon: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export default function AdminMovieDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    is_now_showing: false,
    is_coming_soon: false,
    display_order: 0,
    synopsis: '',
    rating: '',
  });

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`/api/cinema/movies/${id}`);
        if (res.ok) {
          const data = await res.json();
          setMovie(data.movie);
          setFormData({
            is_now_showing: data.movie.is_now_showing,
            is_coming_soon: data.movie.is_coming_soon,
            display_order: data.movie.display_order || 0,
            synopsis: data.movie.synopsis || '',
            rating: data.movie.rating || '',
          });
        }
      } catch (error) {
        console.error('Failed to fetch movie:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await fetch(`/api/cinema/movies/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        setMovie(data.movie);
      }
    } catch (error) {
      console.error('Failed to save:', error);
    } finally {
      setSaving(false);
    }
  };

  const formatDuration = (mins: number) => {
    if (!mins) return 'N/A';
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="text-center py-12">
        <Film className="w-12 h-12 text-gray-600 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Movie Not Found</h2>
        <Link href="/admin/cinema" className="text-cyan-400 hover:underline">
          Back to Movies
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <Link
            href="/admin/cinema"
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">{movie.title}</h1>
            <p className="text-gray-400">{movie.language} • {formatDuration(movie.duration_minutes)}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <a
            href={`https://www.themoviedb.org/movie/${movie.tmdb_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:text-white transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            TMDB
          </a>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save Changes
          </button>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Movie Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Backdrop */}
          {movie.backdrop_url && !movie.backdrop_url.includes('placeholder') && (
            <div className="relative aspect-video rounded-2xl overflow-hidden">
              <Image
                src={movie.backdrop_url}
                alt={movie.title}
                fill
                className="object-cover"
                unoptimized
              />
              {movie.trailer_key && (
                <a
                  href={movie.trailer_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-colors group"
                >
                  <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-white fill-current" />
                  </div>
                </a>
              )}
            </div>
          )}

          {/* Details */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Movie Details</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <Star className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">TMDB Rating</p>
                    <p className="text-white font-medium">{movie.tmdb_rating?.toFixed(1) || 'N/A'} / 10</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-cyan-500/20 rounded-lg">
                    <Clock className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Duration</p>
                    <p className="text-white font-medium">{formatDuration(movie.duration_minutes)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Calendar className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Release Date</p>
                    <p className="text-white font-medium">
                      {movie.release_date ? new Date(movie.release_date).toLocaleDateString() : 'TBA'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Globe className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Language</p>
                    <p className="text-white font-medium">{movie.language}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Genres */}
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Genres</h4>
              <div className="flex flex-wrap gap-2">
                {movie.genre?.map((g) => (
                  <span key={g} className="px-3 py-1 bg-white/10 text-gray-300 rounded-full text-sm">
                    {g}
                  </span>
                ))}
              </div>
            </div>

            {/* Director & Cast */}
            {movie.director && (
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Director</h4>
                <p className="text-white">{movie.director}</p>
              </div>
            )}

            {movie.cast?.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Cast
                </h4>
                <div className="flex flex-wrap gap-2">
                  {movie.cast.map((actor) => (
                    <span key={actor} className="px-3 py-1 bg-white/5 text-gray-300 rounded-lg text-sm">
                      {actor}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Synopsis */}
            <div>
              <label className="text-sm font-medium text-gray-400 mb-2 block">Synopsis</label>
              <textarea
                value={formData.synopsis}
                onChange={(e) => setFormData(prev => ({ ...prev, synopsis: e.target.value }))}
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50"
              />
            </div>
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          {/* Poster */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <div className="relative aspect-[2/3] rounded-xl overflow-hidden">
              {movie.poster_url && !movie.poster_url.includes('placeholder') ? (
                <Image
                  src={movie.poster_url}
                  alt={movie.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full bg-white/10 flex items-center justify-center">
                  <Film className="w-12 h-12 text-gray-500" />
                </div>
              )}
            </div>
          </div>

          {/* Status Controls */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="font-semibold text-white">Status</h3>

            <label className="flex items-center justify-between p-3 bg-white/5 rounded-xl cursor-pointer">
              <span className="text-gray-300">Now Showing</span>
              <input
                type="checkbox"
                checked={formData.is_now_showing}
                onChange={(e) => setFormData(prev => ({ ...prev, is_now_showing: e.target.checked }))}
                className="w-5 h-5 rounded border-white/30 bg-white/5 text-green-500 focus:ring-green-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 bg-white/5 rounded-xl cursor-pointer">
              <span className="text-gray-300">Coming Soon</span>
              <input
                type="checkbox"
                checked={formData.is_coming_soon}
                onChange={(e) => setFormData(prev => ({ ...prev, is_coming_soon: e.target.checked }))}
                className="w-5 h-5 rounded border-white/30 bg-white/5 text-orange-500 focus:ring-orange-500"
              />
            </label>

            <div>
              <label className="text-sm text-gray-400 mb-1 block">Display Order</label>
              <input
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-1 block">Rating</label>
              <select
                value={formData.rating}
                onChange={(e) => setFormData(prev => ({ ...prev, rating: e.target.value }))}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
              >
                <option value="" className="bg-[#1A1A2E]">Select Rating</option>
                <option value="G" className="bg-[#1A1A2E]">G - General Audiences</option>
                <option value="PG" className="bg-[#1A1A2E]">PG - Parental Guidance</option>
                <option value="PG-13" className="bg-[#1A1A2E]">PG-13 - Parents Strongly Cautioned</option>
                <option value="15+" className="bg-[#1A1A2E]">15+</option>
                <option value="18+" className="bg-[#1A1A2E]">18+ - Adults Only</option>
              </select>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
            <h3 className="font-semibold text-white">Quick Actions</h3>
            <Link
              href={`/cinema/${movie.slug}`}
              className="flex items-center gap-2 w-full px-4 py-2.5 bg-white/5 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Film className="w-4 h-4" />
              View on Website
            </Link>
            <Link
              href={`/admin/cinema/showtimes?movie=${movie.id}`}
              className="flex items-center gap-2 w-full px-4 py-2.5 bg-white/5 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Clock className="w-4 h-4" />
              Manage Showtimes
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
