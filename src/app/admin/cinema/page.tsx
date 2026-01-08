'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Film,
  Calendar,
  Star,
  ExternalLink,
  Eye,
  Edit2,
  MoreVertical,
  CheckCircle,
  XCircle,
  Loader2,
  Play,
  Clock,
  Globe,
  Trash2,
  Info,
  Plus,
  Upload,
  X,
  GripVertical,
  Image as ImageIcon,
  FileText,
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
  movie_cast: string[];
  tmdb_rating: number;
  is_now_showing: boolean;
  is_coming_soon: boolean;
  display_order: number;
  scraped_from?: string[];
  last_scraped?: string;
  created_at: string;
  updated_at: string;
}

type MovieTab = 'all' | 'now_showing' | 'coming_soon';
type ModalTab = 'basic' | 'media' | 'details';

// Helper to construct full TMDB image URLs
function getPosterUrl(posterPath: string | null): string {
  if (!posterPath) return '';
  if (posterPath.startsWith('http')) return posterPath;
  return `https://image.tmdb.org/t/p/w500${posterPath}`;
}

function getBackdropUrl(backdropPath: string | null): string {
  if (!backdropPath) return '';
  if (backdropPath.startsWith('http')) return backdropPath;
  return `https://image.tmdb.org/t/p/original${backdropPath}`;
}

export default function AdminCinemaPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<MovieTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openActionMenu, setOpenActionMenu] = useState<string | null>(null);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [dragging, setDragging] = useState<string | null>(null);
  // Mukta sync removed - Mukta A2 Cinema no longer on platform

  // Fetch movies
  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchQuery) params.set('search', searchQuery);
      params.set('orderBy', 'display_order');
      params.set('orderDir', 'asc');
      params.set('limit', '200');

      const res = await fetch(`/api/cinema/movies?${params}`);
      if (res.ok) {
        const data = await res.json();
        setMovies(data.movies || []);
      }
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  // Toggle movie status
  const toggleMovieStatus = async (movieId: string, field: 'is_now_showing' | 'is_coming_soon', value: boolean) => {
    try {
      const res = await fetch(`/api/cinema/movies/${movieId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: !value }),
      });

      if (res.ok) {
        setMovies(prev =>
          prev.map(m =>
            m.id === movieId ? { ...m, [field]: !value } : m
          )
        );
      }
    } catch (error) {
      console.error('Failed to update movie:', error);
    }
  };

  // Delete movie
  const handleDeleteMovie = async (movieId: string) => {
    if (!confirm('Are you sure you want to delete this movie? This cannot be undone.')) {
      return;
    }

    try {
      const res = await fetch(`/api/cinema/movies/${movieId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setMovies(prev => prev.filter(m => m.id !== movieId));
      }
    } catch (error) {
      console.error('Failed to delete movie:', error);
    }
  };

  // Handle drag and drop reordering
  const handleDragStart = (movieId: string) => {
    setDragging(movieId);
  };

  const handleDragOver = (e: React.DragEvent, movieId: string) => {
    e.preventDefault();
    if (!dragging || dragging === movieId) return;

    const draggedIndex = movies.findIndex(m => m.id === dragging);
    const targetIndex = movies.findIndex(m => m.id === movieId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newMovies = [...movies];
    const [draggedMovie] = newMovies.splice(draggedIndex, 1);
    newMovies.splice(targetIndex, 0, draggedMovie);
    setMovies(newMovies);
  };

  const handleDragEnd = async () => {
    if (!dragging) return;

    // Save new order to server
    try {
      await fetch('/api/cinema/movies/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderedIds: movies.map(m => m.id) }),
      });
    } catch (error) {
      console.error('Failed to save order:', error);
    }

    setDragging(null);
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Film className="w-7 h-7 text-amber-400" />
            Cinema Manager
          </h1>
          <p className="text-gray-400 mt-1">
            Full control over all movies. Edit, add, delete, and reorder.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/cinema/logs"
            className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-gray-300 rounded-xl hover:bg-white/10 transition-colors"
          >
            <FileText className="w-4 h-4" />
            View Logs
          </Link>
          <Link
            href="/cinema"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-gray-300 rounded-xl hover:bg-white/10 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View Cinema Page
          </Link>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            Add Movie
          </button>
        </div>
      </motion.div>

      {/* Info Note */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3"
      >
        <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-amber-400 font-medium">Full Admin Control</p>
          <p className="text-amber-300/70 text-sm mt-1">
            Edit all movie details including posters, backdrops, trailers, and more.
            Drag movies to reorder them. Images uploaded here are NOT watermarked.
          </p>
        </div>
      </motion.div>


      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <Film className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{tabCounts.all}</p>
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
              <p className="text-2xl font-bold text-white">{tabCounts.now_showing}</p>
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
              <p className="text-2xl font-bold text-white">{tabCounts.coming_soon}</p>
              <p className="text-xs text-gray-400">Coming Soon</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Globe className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Drag to Reorder</p>
              <p className="text-xs text-gray-400">Custom Display Order</p>
            </div>
          </div>
        </div>
      </motion.div>

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
                ? 'text-amber-400'
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
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400"
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
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-amber-500/50"
          />
        </div>
      </motion.div>

      {/* Movies List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
      >
        {loading ? (
          <div className="p-12 text-center">
            <Loader2 className="w-8 h-8 text-amber-400 animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading movies...</p>
          </div>
        ) : filteredMovies.length === 0 ? (
          <div className="p-12 text-center">
            <Film className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No movies found</h3>
            <p className="text-gray-400 mb-4">
              {movies.length === 0
                ? 'Add your first movie to get started'
                : 'Try adjusting your search'}
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="text-amber-400 hover:underline"
            >
              Add a movie
            </button>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                draggable
                onDragStart={() => handleDragStart(movie.id)}
                onDragOver={(e) => handleDragOver(e, movie.id)}
                onDragEnd={handleDragEnd}
                className={`p-4 hover:bg-white/5 transition-colors ${
                  dragging === movie.id ? 'opacity-50 bg-amber-500/10' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Drag Handle */}
                  <div className="cursor-grab active:cursor-grabbing text-gray-500 hover:text-gray-300">
                    <GripVertical className="w-5 h-5" />
                  </div>

                  {/* Poster */}
                  <div className="relative w-14 h-20 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
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

                  {/* Movie Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-white truncate">{movie.title}</h3>
                      {movie.scraped_from && movie.scraped_from.length > 0 && (
                        <span className="px-2 py-0.5 text-xs bg-purple-500/20 text-purple-400 rounded">
                          Auto
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                      {movie.genre?.slice(0, 2).map((g: string) => (
                        <span key={g} className="px-2 py-0.5 text-xs bg-white/10 rounded">
                          {g}
                        </span>
                      ))}
                      {movie.duration_minutes && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDuration(movie.duration_minutes)}
                        </span>
                      )}
                      {movie.tmdb_rating && (
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          {movie.tmdb_rating.toFixed(1)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Status Toggles */}
                  <div className="hidden md:flex items-center gap-2">
                    <button
                      onClick={() => toggleMovieStatus(movie.id, 'is_now_showing', movie.is_now_showing)}
                      className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                        movie.is_now_showing
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-white/5 text-gray-500 hover:text-gray-300'
                      }`}
                      title="Toggle Now Showing"
                    >
                      {movie.is_now_showing ? (
                        <span className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Now Showing
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <XCircle className="w-3 h-3" /> Now Showing
                        </span>
                      )}
                    </button>

                    <button
                      onClick={() => toggleMovieStatus(movie.id, 'is_coming_soon', movie.is_coming_soon)}
                      className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                        movie.is_coming_soon
                          ? 'bg-orange-500/20 text-orange-400'
                          : 'bg-white/5 text-gray-500 hover:text-gray-300'
                      }`}
                      title="Toggle Coming Soon"
                    >
                      {movie.is_coming_soon ? (
                        <span className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Coming Soon
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <XCircle className="w-3 h-3" /> Coming Soon
                        </span>
                      )}
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setEditingMovie(movie)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                      title="Edit movie"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDeleteMovie(movie.id)}
                      className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-gray-400 hover:text-red-400"
                      title="Delete movie"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="relative">
                      <button
                        onClick={() => setOpenActionMenu(openActionMenu === movie.id ? null : movie.id)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400"
                      >
                        <MoreVertical className="w-4 h-4" />
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
                              target="_blank"
                              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5"
                            >
                              <Eye className="w-4 h-4" />
                              View on Site
                            </Link>
                            {movie.tmdb_id && (
                              <a
                                href={`https://www.themoviedb.org/movie/${movie.tmdb_id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5"
                              >
                                <ExternalLink className="w-4 h-4" />
                                View on TMDB
                              </a>
                            )}
                            {movie.trailer_url && (
                              <a
                                href={movie.trailer_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5"
                              >
                                <Play className="w-4 h-4" />
                                Watch Trailer
                              </a>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Mobile Status Toggles */}
                <div className="flex md:hidden items-center gap-2 mt-3 ml-9">
                  <button
                    onClick={() => toggleMovieStatus(movie.id, 'is_now_showing', movie.is_now_showing)}
                    className={`px-2 py-1 text-xs rounded ${
                      movie.is_now_showing
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-white/5 text-gray-500'
                    }`}
                  >
                    Now Showing
                  </button>
                  <button
                    onClick={() => toggleMovieStatus(movie.id, 'is_coming_soon', movie.is_coming_soon)}
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
            ))}
          </div>
        )}
      </motion.div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingMovie && (
          <MovieModal
            movie={editingMovie}
            onClose={() => setEditingMovie(null)}
            onSave={() => {
              setEditingMovie(null);
              fetchMovies();
            }}
          />
        )}
      </AnimatePresence>

      {/* Add Modal */}
      <AnimatePresence>
        {showAddModal && (
          <MovieModal
            onClose={() => setShowAddModal(false)}
            onSave={() => {
              setShowAddModal(false);
              fetchMovies();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Movie Modal Component for Add/Edit
interface MovieModalProps {
  movie?: Movie;
  onClose: () => void;
  onSave: () => void;
}

function MovieModal({ movie, onClose, onSave }: MovieModalProps) {
  const [activeTab, setActiveTab] = useState<ModalTab>('basic');
  const [saving, setSaving] = useState(false);
  const [uploadingPoster, setUploadingPoster] = useState(false);
  const [uploadingBackdrop, setUploadingBackdrop] = useState(false);

  const [formData, setFormData] = useState({
    title: movie?.title || '',
    synopsis: movie?.synopsis || '',
    poster_url: movie?.poster_url || '',
    backdrop_url: movie?.backdrop_url || '',
    trailer_url: movie?.trailer_url || '',
    genre: movie?.genre?.join(', ') || '',
    duration_minutes: movie?.duration_minutes || '',
    rating: movie?.rating || '',
    tmdb_rating: movie?.tmdb_rating || '',
    release_date: movie?.release_date || '',
    director: movie?.director || '',
    movie_cast: movie?.movie_cast?.join(', ') || '',
    language: movie?.language || 'English',
    is_now_showing: movie?.is_now_showing ?? true,
    is_coming_soon: movie?.is_coming_soon ?? false,
  });

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    imageType: 'poster' | 'backdrop'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const setUploading = imageType === 'poster' ? setUploadingPoster : setUploadingBackdrop;
    setUploading(true);

    const uploadFormData = new FormData();
    uploadFormData.append('file', file);
    uploadFormData.append('imageType', imageType);
    if (movie?.id) {
      uploadFormData.append('movieId', movie.id);
    }

    try {
      const res = await fetch('/api/admin/cinema/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      const data = await res.json();

      if (data.url) {
        setFormData(prev => ({
          ...prev,
          [imageType === 'poster' ? 'poster_url' : 'backdrop_url']: data.url,
        }));
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert('Title is required');
      return;
    }

    setSaving(true);

    const payload = {
      title: formData.title,
      synopsis: formData.synopsis || null,
      poster_url: formData.poster_url || null,
      backdrop_url: formData.backdrop_url || null,
      trailer_url: formData.trailer_url || null,
      genre: formData.genre ? formData.genre.split(',').map(s => s.trim()).filter(Boolean) : [],
      duration_minutes: formData.duration_minutes ? parseInt(String(formData.duration_minutes)) : null,
      rating: formData.rating || null,
      tmdb_rating: formData.tmdb_rating ? parseFloat(String(formData.tmdb_rating)) : null,
      release_date: formData.release_date || null,
      director: formData.director || null,
      movie_cast: formData.movie_cast ? formData.movie_cast.split(',').map(s => s.trim()).filter(Boolean) : [],
      language: formData.language || 'English',
      is_now_showing: formData.is_now_showing,
      is_coming_soon: formData.is_coming_soon,
    };

    try {
      const url = movie ? `/api/cinema/movies/${movie.id}` : '/api/cinema/movies';
      const method = movie ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        onSave();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to save movie');
      }
    } catch (error) {
      console.error('Save failed:', error);
      alert('Failed to save movie');
    } finally {
      setSaving(false);
    }
  };

  const genres = [
    'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
    'Drama', 'Family', 'Fantasy', 'Horror', 'Musical', 'Mystery',
    'Romance', 'Sci-Fi', 'Thriller', 'War', 'Western'
  ];

  const ratings = ['G', 'PG', 'PG-13', 'R', 'NC-17', '15+', '18+'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-[#1A1A2E] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 flex-shrink-0">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Film className="w-5 h-5 text-amber-400" />
            {movie ? 'Edit Movie' : 'Add New Movie'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10 flex-shrink-0">
          {[
            { id: 'basic', label: 'Basic Info' },
            { id: 'media', label: 'Media & Images' },
            { id: 'details', label: 'Details' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ModalTab)}
              className={`px-6 py-3 text-sm font-medium transition-colors relative ${
                activeTab === tab.id
                  ? 'text-amber-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="modal-tab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400"
                />
              )}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Basic Info Tab */}
            {activeTab === 'basic' && (
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                    placeholder="e.g., Avatar: The Way of Water"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                {/* Synopsis */}
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Synopsis</label>
                  <textarea
                    value={formData.synopsis}
                    onChange={(e) => setFormData(prev => ({ ...prev, synopsis: e.target.value }))}
                    rows={4}
                    placeholder="Movie synopsis..."
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:border-amber-500 focus:outline-none resize-none"
                  />
                </div>

                {/* Genre & Rating */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Genre (comma separated)</label>
                    <input
                      type="text"
                      value={formData.genre}
                      onChange={(e) => setFormData(prev => ({ ...prev, genre: e.target.value }))}
                      placeholder="Action, Adventure, Sci-Fi"
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:border-amber-500 focus:outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Common: {genres.slice(0, 5).join(', ')}...
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Age Rating</label>
                    <select
                      value={formData.rating}
                      onChange={(e) => setFormData(prev => ({ ...prev, rating: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:border-amber-500 focus:outline-none"
                    >
                      <option value="" className="bg-[#1A1A2E]">Select rating</option>
                      {ratings.map((r) => (
                        <option key={r} value={r} className="bg-[#1A1A2E]">{r}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Status Toggles */}
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_now_showing}
                      onChange={(e) => setFormData(prev => ({ ...prev, is_now_showing: e.target.checked }))}
                      className="w-4 h-4 rounded border-white/30 bg-white/5 text-green-500 focus:ring-green-500"
                    />
                    <span className="text-gray-300">Now Showing</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_coming_soon}
                      onChange={(e) => setFormData(prev => ({ ...prev, is_coming_soon: e.target.checked }))}
                      className="w-4 h-4 rounded border-white/30 bg-white/5 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="text-gray-300">Coming Soon</span>
                  </label>
                </div>
              </div>
            )}

            {/* Media Tab */}
            {activeTab === 'media' && (
              <div className="space-y-6">
                {/* Poster Upload */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Movie Poster</label>
                  <div className="flex gap-4">
                    {/* Preview */}
                    <div className="w-32 h-48 bg-white/5 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                      {formData.poster_url ? (
                        <Image
                          src={getPosterUrl(formData.poster_url)}
                          alt="Poster preview"
                          width={128}
                          height={192}
                          className="w-full h-full object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                          <Film className="w-10 h-10" />
                        </div>
                      )}
                    </div>

                    {/* Upload Controls */}
                    <div className="flex-1 space-y-3">
                      <input
                        type="text"
                        value={formData.poster_url}
                        onChange={(e) => setFormData(prev => ({ ...prev, poster_url: e.target.value }))}
                        placeholder="Poster URL or upload below"
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:border-amber-500 focus:outline-none"
                      />

                      <label className="flex items-center gap-2 px-4 py-3 bg-white/5 text-gray-300 rounded-xl cursor-pointer hover:bg-white/10 transition-colors w-fit border border-white/10">
                        <Upload className="w-5 h-5" />
                        {uploadingPoster ? 'Uploading...' : 'Upload Poster (No Watermark)'}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'poster')}
                          className="hidden"
                          disabled={uploadingPoster}
                        />
                      </label>

                      <p className="text-gray-500 text-xs">
                        Recommended: 680x1000px, JPG/PNG/WebP, max 10MB
                      </p>
                    </div>
                  </div>
                </div>

                {/* Backdrop Upload */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Backdrop / Banner Image</label>
                  <div className="space-y-3">
                    {/* Preview */}
                    <div className="w-full h-36 bg-white/5 rounded-xl overflow-hidden border border-white/10">
                      {formData.backdrop_url ? (
                        <Image
                          src={getBackdropUrl(formData.backdrop_url)}
                          alt="Backdrop preview"
                          width={800}
                          height={144}
                          className="w-full h-full object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                          <ImageIcon className="w-10 h-10" />
                        </div>
                      )}
                    </div>

                    {/* Upload Controls */}
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={formData.backdrop_url}
                        onChange={(e) => setFormData(prev => ({ ...prev, backdrop_url: e.target.value }))}
                        placeholder="Backdrop URL or upload"
                        className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:border-amber-500 focus:outline-none"
                      />

                      <label className="flex items-center gap-2 px-4 py-2 bg-white/5 text-gray-300 rounded-xl cursor-pointer hover:bg-white/10 transition-colors border border-white/10">
                        <Upload className="w-4 h-4" />
                        {uploadingBackdrop ? 'Uploading...' : 'Upload'}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'backdrop')}
                          className="hidden"
                          disabled={uploadingBackdrop}
                        />
                      </label>
                    </div>

                    <p className="text-gray-500 text-xs">
                      Recommended: 1920x1080px, JPG/PNG/WebP, max 10MB
                    </p>
                  </div>
                </div>

                {/* Trailer URL */}
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Trailer URL (YouTube)</label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={formData.trailer_url}
                      onChange={(e) => setFormData(prev => ({ ...prev, trailer_url: e.target.value }))}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:border-amber-500 focus:outline-none"
                    />
                    {formData.trailer_url && (
                      <a
                        href={formData.trailer_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-500"
                      >
                        <Play className="w-4 h-4" />
                        Preview
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Details Tab */}
            {activeTab === 'details' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Duration */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Duration (minutes)</label>
                    <input
                      type="number"
                      value={formData.duration_minutes}
                      onChange={(e) => setFormData(prev => ({ ...prev, duration_minutes: e.target.value }))}
                      placeholder="120"
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  {/* Rating (TMDB/IMDb) */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">TMDB/IMDb Rating</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      value={formData.tmdb_rating}
                      onChange={(e) => setFormData(prev => ({ ...prev, tmdb_rating: e.target.value }))}
                      placeholder="7.5"
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  {/* Release Date */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Release Date</label>
                    <input
                      type="date"
                      value={formData.release_date}
                      onChange={(e) => setFormData(prev => ({ ...prev, release_date: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Director */}
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Director</label>
                  <input
                    type="text"
                    value={formData.director}
                    onChange={(e) => setFormData(prev => ({ ...prev, director: e.target.value }))}
                    placeholder="e.g., James Cameron"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                {/* Cast */}
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Cast (comma separated)</label>
                  <input
                    type="text"
                    value={formData.movie_cast}
                    onChange={(e) => setFormData(prev => ({ ...prev, movie_cast: e.target.value }))}
                    placeholder="e.g., Sam Worthington, Zoe Saldaña, Sigourney Weaver"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                {/* Language */}
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Language</label>
                  <input
                    type="text"
                    value={formData.language}
                    onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value }))}
                    placeholder="English"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex gap-3 p-4 border-t border-white/10 bg-[#1A1A2E] flex-shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center gap-2"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              {saving ? 'Saving...' : movie ? 'Update Movie' : 'Add Movie'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
