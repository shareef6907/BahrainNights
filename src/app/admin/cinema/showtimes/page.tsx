'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Plus,
  Clock,
  Film,
  MapPin,
  Calendar,
  Trash2,
  Loader2,
  Search,
  X,
  Copy,
  CheckCircle,
  AlertCircle,
  Edit2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface Movie {
  id: string;
  title: string;
  poster_url: string;
  is_now_showing: boolean;
  is_coming_soon: boolean;
}

interface Cinema {
  id: string;
  name: string;
  location: string;
  area: string;
  booking_url: string;
}

interface Showtime {
  id: string;
  movie_id: string;
  cinema_id: string;
  showtime: string;
  format: string;
  language: string;
  screen_number: string;
  price_standard: number;
  price_vip: number;
  booking_url: string;
  is_active: boolean;
  movie?: Movie;
  cinema?: Cinema;
}

const FORMATS = ['2D', '3D', 'IMAX', 'VIP', '4DX', 'Dolby', 'MX4D', 'ScreenX'];
const LANGUAGES = ['English', 'Arabic', 'Hindi', 'Arabic Subtitles', 'English Subtitles', 'Malayalam', 'Tamil', 'Filipino'];
const DEFAULT_TIMES = ['10:00', '12:30', '15:00', '17:30', '20:00', '22:30'];

export default function AdminShowtimesPage() {
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Modal states
  const [showSingleForm, setShowSingleForm] = useState(false);
  const [showBulkForm, setShowBulkForm] = useState(false);
  const [editingShowtime, setEditingShowtime] = useState<Showtime | null>(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCinema, setFilterCinema] = useState('all');
  const [filterDate, setFilterDate] = useState('');
  const [filterMovie, setFilterMovie] = useState('all');

  // Expanded groups state
  const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set());

  // Single showtime form
  const [singleForm, setSingleForm] = useState({
    movie_id: '',
    cinema_id: '',
    date: '',
    time: '',
    format: '2D',
    language: 'English',
    screen_number: '',
    price_standard: 4,
    price_vip: 8,
    booking_url: '',
  });

  // Bulk showtime form
  const [bulkForm, setBulkForm] = useState({
    movie_id: '',
    cinema_ids: [] as string[],
    date_start: '',
    date_end: '',
    times: ['12:00', '15:00', '18:00', '21:00'] as string[],
    format: '2D',
    language: 'English',
    booking_url: '',
  });

  // Custom time input for bulk form
  const [customTime, setCustomTime] = useState('');

  // Result message
  const [resultMessage, setResultMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch all data in parallel
      const [showtimesRes, moviesRes, cinemasRes] = await Promise.all([
        fetch('/api/cinema/showtimes?future_only=false'),
        fetch('/api/cinema/movies'),
        fetch('/api/cinema/cinemas'),
      ]);

      if (showtimesRes.ok) {
        const data = await showtimesRes.json();
        setShowtimes(data.showtimes || []);
      }

      if (moviesRes.ok) {
        const data = await moviesRes.json();
        setMovies(data.movies || []);
      }

      if (cinemasRes.ok) {
        const data = await cinemasRes.json();
        setCinemas(data.cinemas || []);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSingleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!singleForm.movie_id || !singleForm.cinema_id || !singleForm.date || !singleForm.time) {
      setResultMessage({ type: 'error', text: 'Please fill in all required fields' });
      return;
    }

    try {
      setSaving(true);
      const showtime = `${singleForm.date}T${singleForm.time}:00`;

      const res = await fetch('/api/cinema/showtimes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          movie_id: singleForm.movie_id,
          cinema_id: singleForm.cinema_id,
          showtime,
          format: singleForm.format,
          language: singleForm.language,
          screen_number: singleForm.screen_number || null,
          price_standard: singleForm.price_standard,
          price_vip: singleForm.price_vip,
          booking_url: singleForm.booking_url || null,
        }),
      });

      if (res.ok) {
        setResultMessage({ type: 'success', text: 'Showtime added successfully!' });
        await fetchData();
        setShowSingleForm(false);
        resetSingleForm();
      } else {
        const data = await res.json();
        setResultMessage({ type: 'error', text: data.error || 'Failed to add showtime' });
      }
    } catch (error) {
      console.error('Failed to add showtime:', error);
      setResultMessage({ type: 'error', text: 'Failed to add showtime' });
    } finally {
      setSaving(false);
    }
  };

  const handleBulkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkForm.movie_id || !bulkForm.cinema_ids.length || !bulkForm.date_start || !bulkForm.date_end || !bulkForm.times.length) {
      setResultMessage({ type: 'error', text: 'Please fill in all required fields' });
      return;
    }

    try {
      setSaving(true);

      const res = await fetch('/api/cinema/showtimes/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          movie_id: bulkForm.movie_id,
          cinema_ids: bulkForm.cinema_ids,
          date_start: bulkForm.date_start,
          date_end: bulkForm.date_end,
          times: bulkForm.times,
          format: bulkForm.format,
          language: bulkForm.language,
          booking_url: bulkForm.booking_url || null,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setResultMessage({
          type: 'success',
          text: `Created ${data.created} showtimes for ${data.details?.movie}${data.skipped > 0 ? ` (${data.skipped} already existed)` : ''}`,
        });
        await fetchData();
        setShowBulkForm(false);
        resetBulkForm();
      } else {
        setResultMessage({ type: 'error', text: data.error || 'Failed to create showtimes' });
      }
    } catch (error) {
      console.error('Failed to create bulk showtimes:', error);
      setResultMessage({ type: 'error', text: 'Failed to create showtimes' });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateShowtime = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingShowtime) return;

    try {
      setSaving(true);

      const res = await fetch(`/api/cinema/showtimes/${editingShowtime.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          format: editingShowtime.format,
          language: editingShowtime.language,
          screen_number: editingShowtime.screen_number || null,
          price_standard: editingShowtime.price_standard,
          price_vip: editingShowtime.price_vip,
          booking_url: editingShowtime.booking_url || null,
        }),
      });

      if (res.ok) {
        setResultMessage({ type: 'success', text: 'Showtime updated successfully!' });
        await fetchData();
        setEditingShowtime(null);
      } else {
        const data = await res.json();
        setResultMessage({ type: 'error', text: data.error || 'Failed to update showtime' });
      }
    } catch (error) {
      console.error('Failed to update showtime:', error);
      setResultMessage({ type: 'error', text: 'Failed to update showtime' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteShowtime = async (id: string) => {
    if (!confirm('Are you sure you want to delete this showtime?')) return;

    try {
      const res = await fetch(`/api/cinema/showtimes/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setShowtimes((prev) => prev.filter((s) => s.id !== id));
        setResultMessage({ type: 'success', text: 'Showtime deleted' });
      }
    } catch (error) {
      console.error('Failed to delete showtime:', error);
      setResultMessage({ type: 'error', text: 'Failed to delete showtime' });
    }
  };

  const resetSingleForm = () => {
    setSingleForm({
      movie_id: '',
      cinema_id: '',
      date: '',
      time: '',
      format: '2D',
      language: 'English',
      screen_number: '',
      price_standard: 4,
      price_vip: 8,
      booking_url: '',
    });
  };

  const resetBulkForm = () => {
    setBulkForm({
      movie_id: '',
      cinema_ids: [],
      date_start: '',
      date_end: '',
      times: ['12:00', '15:00', '18:00', '21:00'],
      format: '2D',
      language: 'English',
      booking_url: '',
    });
  };

  const addBulkTime = () => {
    if (customTime && !bulkForm.times.includes(customTime)) {
      setBulkForm((prev) => ({
        ...prev,
        times: [...prev.times, customTime].sort(),
      }));
      setCustomTime('');
    }
  };

  const removeBulkTime = (time: string) => {
    setBulkForm((prev) => ({
      ...prev,
      times: prev.times.filter((t) => t !== time),
    }));
  };

  const toggleCinemaSelection = (cinemaId: string) => {
    setBulkForm((prev) => ({
      ...prev,
      cinema_ids: prev.cinema_ids.includes(cinemaId)
        ? prev.cinema_ids.filter((id) => id !== cinemaId)
        : [...prev.cinema_ids, cinemaId],
    }));
  };

  const selectAllCinemas = () => {
    setBulkForm((prev) => ({
      ...prev,
      cinema_ids: cinemas.map((c) => c.id),
    }));
  };

  const clearCinemaSelection = () => {
    setBulkForm((prev) => ({
      ...prev,
      cinema_ids: [],
    }));
  };

  const filteredShowtimes = useMemo(() => {
    return showtimes.filter((showtime) => {
      const matchesSearch = !searchQuery || showtime.movie?.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCinema = filterCinema === 'all' || showtime.cinema_id === filterCinema;
      const matchesDate = !filterDate || showtime.showtime.startsWith(filterDate);
      const matchesMovie = filterMovie === 'all' || showtime.movie_id === filterMovie;
      return matchesSearch && matchesCinema && matchesDate && matchesMovie;
    });
  }, [showtimes, searchQuery, filterCinema, filterDate, filterMovie]);

  const groupedByDate = useMemo(() => {
    const grouped = filteredShowtimes.reduce((acc, showtime) => {
      const date = showtime.showtime.split('T')[0];
      if (!acc[date]) acc[date] = [];
      acc[date].push(showtime);
      return acc;
    }, {} as Record<string, Showtime[]>);

    // Sort showtimes within each date
    Object.keys(grouped).forEach((date) => {
      grouped[date].sort((a, b) => a.showtime.localeCompare(b.showtime));
    });

    return grouped;
  }, [filteredShowtimes]);

  const toggleDateExpansion = (date: string) => {
    setExpandedDates((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(date)) {
        newSet.delete(date);
      } else {
        newSet.add(date);
      }
      return newSet;
    });
  };

  const formatTime = (datetime: string) => {
    return new Date(datetime).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getMinDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  // Calculate bulk form preview
  const bulkPreview = useMemo(() => {
    if (!bulkForm.date_start || !bulkForm.date_end || !bulkForm.times.length || !bulkForm.cinema_ids.length) {
      return null;
    }

    const startDate = new Date(bulkForm.date_start);
    const endDate = new Date(bulkForm.date_end);
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    return {
      days,
      timesPerDay: bulkForm.times.length,
      cinemas: bulkForm.cinema_ids.length,
      total: days * bulkForm.times.length * bulkForm.cinema_ids.length,
    };
  }, [bulkForm.date_start, bulkForm.date_end, bulkForm.times, bulkForm.cinema_ids]);

  // Auto-dismiss result message
  useEffect(() => {
    if (resultMessage) {
      const timer = setTimeout(() => setResultMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [resultMessage]);

  return (
    <div className="space-y-6">
      {/* Result Message Toast */}
      <AnimatePresence>
        {resultMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg ${
              resultMessage.type === 'success'
                ? 'bg-green-500/90 text-white'
                : 'bg-red-500/90 text-white'
            }`}
          >
            {resultMessage.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span>{resultMessage.text}</span>
            <button onClick={() => setResultMessage(null)}>
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <Link href="/admin/cinema" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Showtimes</h1>
            <p className="text-gray-400">
              {showtimes.length} total showtimes • {filteredShowtimes.length} showing
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowSingleForm(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Single
          </button>
          <button
            onClick={() => setShowBulkForm(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:opacity-90 transition-opacity"
          >
            <Copy className="w-4 h-4" />
            Bulk Add
          </button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/5 border border-white/10 rounded-2xl p-4"
      >
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          <select
            value={filterMovie}
            onChange={(e) => setFilterMovie(e.target.value)}
            className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500/50"
          >
            <option value="all" className="bg-[#1A1A2E]">All Movies</option>
            {movies.map((movie) => (
              <option key={movie.id} value={movie.id} className="bg-[#1A1A2E]">
                {movie.title}
              </option>
            ))}
          </select>

          <select
            value={filterCinema}
            onChange={(e) => setFilterCinema(e.target.value)}
            className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500/50"
          >
            <option value="all" className="bg-[#1A1A2E]">All Cinemas</option>
            {cinemas.map((cinema) => (
              <option key={cinema.id} value={cinema.id} className="bg-[#1A1A2E]">
                {cinema.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500/50"
          />

          {(searchQuery || filterCinema !== 'all' || filterDate || filterMovie !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterCinema('all');
                setFilterDate('');
                setFilterMovie('all');
              }}
              className="px-4 py-2.5 text-gray-400 hover:text-white transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </motion.div>

      {/* Showtimes List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        {loading ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
            <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading showtimes...</p>
          </div>
        ) : Object.keys(groupedByDate).length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
            <Clock className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No showtimes found</h3>
            <p className="text-gray-400 mb-4">
              {showtimes.length === 0
                ? 'Add showtimes to display them here'
                : 'Try adjusting your filters'}
            </p>
            <button
              onClick={() => setShowBulkForm(true)}
              className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
            >
              Add Showtimes
            </button>
          </div>
        ) : (
          Object.entries(groupedByDate)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([date, dateShowtimes]) => {
              const isExpanded = expandedDates.has(date);
              const isPastDate = new Date(date) < new Date(new Date().toDateString());

              return (
                <div
                  key={date}
                  className={`bg-white/5 border border-white/10 rounded-2xl overflow-hidden ${
                    isPastDate ? 'opacity-60' : ''
                  }`}
                >
                  <button
                    onClick={() => toggleDateExpansion(date)}
                    className="w-full px-6 py-4 border-b border-white/10 flex items-center justify-between hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-cyan-400" />
                      <h3 className="font-semibold text-white">{formatDate(date)}</h3>
                      {isPastDate && (
                        <span className="px-2 py-0.5 text-xs bg-red-500/20 text-red-400 rounded-full">
                          Past
                        </span>
                      )}
                      <span className="px-2 py-0.5 text-xs bg-white/10 text-gray-400 rounded-full">
                        {dateShowtimes.length} showtime{dateShowtimes.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="divide-y divide-white/5"
                      >
                        {dateShowtimes.map((showtime) => (
                          <div
                            key={showtime.id}
                            className="px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                          >
                            <div className="flex items-center gap-4">
                              {showtime.movie?.poster_url && (
                                <Image
                                  src={showtime.movie.poster_url}
                                  alt={showtime.movie.title || ''}
                                  width={40}
                                  height={60}
                                  className="rounded object-cover"
                                />
                              )}
                              <div className="text-center min-w-[70px]">
                                <p className="text-lg font-bold text-white">
                                  {formatTime(showtime.showtime)}
                                </p>
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <Film className="w-4 h-4 text-cyan-400" />
                                  <p className="font-medium text-white">
                                    {showtime.movie?.title || 'Unknown Movie'}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                                  <MapPin className="w-3 h-3" />
                                  <span>{showtime.cinema?.name || 'Unknown Cinema'}</span>
                                  {showtime.screen_number && (
                                    <>
                                      <span>•</span>
                                      <span>{showtime.screen_number}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-4">
                              <div className="flex gap-2">
                                <span className="px-2 py-1 text-xs bg-cyan-500/20 text-cyan-400 rounded">
                                  {showtime.format}
                                </span>
                                <span className="px-2 py-1 text-xs bg-white/10 text-gray-300 rounded">
                                  {showtime.language}
                                </span>
                                {showtime.price_standard > 0 && (
                                  <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded">
                                    BD {showtime.price_standard}
                                  </span>
                                )}
                              </div>
                              <div className="flex gap-1">
                                <button
                                  onClick={() => setEditingShowtime(showtime)}
                                  className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteShowtime(showtime.id)}
                                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
        )}
      </motion.div>

      {/* Single Showtime Modal */}
      <AnimatePresence>
        {showSingleForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#1A1A2E] border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Add Single Showtime</h2>
                <button onClick={() => setShowSingleForm(false)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSingleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Movie *</label>
                  <select
                    value={singleForm.movie_id}
                    onChange={(e) => setSingleForm((prev) => ({ ...prev, movie_id: e.target.value }))}
                    required
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
                  >
                    <option value="" className="bg-[#1A1A2E]">Select Movie</option>
                    {movies.map((movie) => (
                      <option key={movie.id} value={movie.id} className="bg-[#1A1A2E]">
                        {movie.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Cinema *</label>
                  <select
                    value={singleForm.cinema_id}
                    onChange={(e) => setSingleForm((prev) => ({ ...prev, cinema_id: e.target.value }))}
                    required
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
                  >
                    <option value="" className="bg-[#1A1A2E]">Select Cinema</option>
                    {cinemas.map((cinema) => (
                      <option key={cinema.id} value={cinema.id} className="bg-[#1A1A2E]">
                        {cinema.name} - {cinema.area}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Date *</label>
                    <input
                      type="date"
                      value={singleForm.date}
                      onChange={(e) => setSingleForm((prev) => ({ ...prev, date: e.target.value }))}
                      required
                      min={getMinDate()}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Time *</label>
                    <input
                      type="time"
                      value={singleForm.time}
                      onChange={(e) => setSingleForm((prev) => ({ ...prev, time: e.target.value }))}
                      required
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Format</label>
                    <select
                      value={singleForm.format}
                      onChange={(e) => setSingleForm((prev) => ({ ...prev, format: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
                    >
                      {FORMATS.map((format) => (
                        <option key={format} value={format} className="bg-[#1A1A2E]">{format}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Language</label>
                    <select
                      value={singleForm.language}
                      onChange={(e) => setSingleForm((prev) => ({ ...prev, language: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
                    >
                      {LANGUAGES.map((lang) => (
                        <option key={lang} value={lang} className="bg-[#1A1A2E]">{lang}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Screen</label>
                    <input
                      type="text"
                      value={singleForm.screen_number}
                      onChange={(e) => setSingleForm((prev) => ({ ...prev, screen_number: e.target.value }))}
                      placeholder="Hall 1"
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Standard BD</label>
                    <input
                      type="number"
                      step="0.5"
                      value={singleForm.price_standard}
                      onChange={(e) => setSingleForm((prev) => ({ ...prev, price_standard: parseFloat(e.target.value) || 0 }))}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">VIP BD</label>
                    <input
                      type="number"
                      step="0.5"
                      value={singleForm.price_vip}
                      onChange={(e) => setSingleForm((prev) => ({ ...prev, price_vip: parseFloat(e.target.value) || 0 }))}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Booking URL (optional)</label>
                  <input
                    type="url"
                    value={singleForm.booking_url}
                    onChange={(e) => setSingleForm((prev) => ({ ...prev, booking_url: e.target.value }))}
                    placeholder="https://..."
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowSingleForm(false)}
                    className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                    Add Showtime
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bulk Add Modal */}
      <AnimatePresence>
        {showBulkForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#1A1A2E] border border-white/10 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">Bulk Add Showtimes</h2>
                  <p className="text-sm text-gray-400 mt-1">Create multiple showtimes at once</p>
                </div>
                <button onClick={() => setShowBulkForm(false)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleBulkSubmit} className="space-y-6">
                {/* Movie Selection */}
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Movie *</label>
                  <select
                    value={bulkForm.movie_id}
                    onChange={(e) => setBulkForm((prev) => ({ ...prev, movie_id: e.target.value }))}
                    required
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
                  >
                    <option value="" className="bg-[#1A1A2E]">Select Movie</option>
                    {movies.map((movie) => (
                      <option key={movie.id} value={movie.id} className="bg-[#1A1A2E]">
                        {movie.title} {movie.is_now_showing ? '(Now Showing)' : movie.is_coming_soon ? '(Coming Soon)' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Cinema Selection */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-gray-400">Cinemas * ({bulkForm.cinema_ids.length} selected)</label>
                    <div className="flex gap-2">
                      <button type="button" onClick={selectAllCinemas} className="text-xs text-cyan-400 hover:text-cyan-300">
                        Select All
                      </button>
                      <button type="button" onClick={clearCinemaSelection} className="text-xs text-gray-400 hover:text-gray-300">
                        Clear
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto bg-white/5 border border-white/10 rounded-xl p-3">
                    {cinemas.map((cinema) => (
                      <label
                        key={cinema.id}
                        className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                          bulkForm.cinema_ids.includes(cinema.id)
                            ? 'bg-cyan-500/20 text-cyan-400'
                            : 'hover:bg-white/5 text-gray-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={bulkForm.cinema_ids.includes(cinema.id)}
                          onChange={() => toggleCinemaSelection(cinema.id)}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                          bulkForm.cinema_ids.includes(cinema.id)
                            ? 'bg-cyan-500 border-cyan-500'
                            : 'border-gray-600'
                        }`}>
                          {bulkForm.cinema_ids.includes(cinema.id) && (
                            <CheckCircle className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <span className="text-sm truncate">{cinema.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Date Range */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Start Date *</label>
                    <input
                      type="date"
                      value={bulkForm.date_start}
                      onChange={(e) => setBulkForm((prev) => ({ ...prev, date_start: e.target.value }))}
                      required
                      min={getMinDate()}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">End Date *</label>
                    <input
                      type="date"
                      value={bulkForm.date_end}
                      onChange={(e) => setBulkForm((prev) => ({ ...prev, date_end: e.target.value }))}
                      required
                      min={bulkForm.date_start || getMinDate()}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
                    />
                  </div>
                </div>

                {/* Time Slots */}
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Time Slots *</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {bulkForm.times.map((time) => (
                      <span
                        key={time}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm"
                      >
                        {time}
                        <button type="button" onClick={() => removeBulkTime(time)}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="time"
                      value={customTime}
                      onChange={(e) => setCustomTime(e.target.value)}
                      className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
                    />
                    <button
                      type="button"
                      onClick={addBulkTime}
                      disabled={!customTime}
                      className="px-4 py-2.5 bg-cyan-500/20 text-cyan-400 rounded-xl hover:bg-cyan-500/30 transition-colors disabled:opacity-50"
                    >
                      Add Time
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="text-xs text-gray-500">Quick add:</span>
                    {DEFAULT_TIMES.filter((t) => !bulkForm.times.includes(t)).map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setBulkForm((prev) => ({ ...prev, times: [...prev.times, time].sort() }))}
                        className="text-xs px-2 py-1 bg-white/5 text-gray-400 rounded hover:bg-white/10 transition-colors"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Format and Language */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Format</label>
                    <select
                      value={bulkForm.format}
                      onChange={(e) => setBulkForm((prev) => ({ ...prev, format: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
                    >
                      {FORMATS.map((format) => (
                        <option key={format} value={format} className="bg-[#1A1A2E]">{format}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Language</label>
                    <select
                      value={bulkForm.language}
                      onChange={(e) => setBulkForm((prev) => ({ ...prev, language: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
                    >
                      {LANGUAGES.map((lang) => (
                        <option key={lang} value={lang} className="bg-[#1A1A2E]">{lang}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Booking URL */}
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Booking URL (optional - uses cinema default if empty)</label>
                  <input
                    type="url"
                    value={bulkForm.booking_url}
                    onChange={(e) => setBulkForm((prev) => ({ ...prev, booking_url: e.target.value }))}
                    placeholder="https://..."
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50"
                  />
                </div>

                {/* Preview */}
                {bulkPreview && (
                  <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4">
                    <h4 className="text-sm font-medium text-cyan-400 mb-2">Preview</h4>
                    <p className="text-gray-300">
                      This will create <span className="font-bold text-white">{bulkPreview.total}</span> showtimes:
                    </p>
                    <ul className="text-sm text-gray-400 mt-2 space-y-1">
                      <li>• {bulkPreview.days} day{bulkPreview.days !== 1 ? 's' : ''}</li>
                      <li>• {bulkPreview.timesPerDay} time slot{bulkPreview.timesPerDay !== 1 ? 's' : ''} per day</li>
                      <li>• {bulkPreview.cinemas} cinema{bulkPreview.cinemas !== 1 ? 's' : ''}</li>
                    </ul>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowBulkForm(false)}
                    className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving || !bulkPreview}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                    Create {bulkPreview?.total || 0} Showtimes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Showtime Modal */}
      <AnimatePresence>
        {editingShowtime && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#1A1A2E] border border-white/10 rounded-2xl p-6 w-full max-w-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Edit Showtime</h2>
                <button onClick={() => setEditingShowtime(null)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdateShowtime} className="space-y-4">
                <div className="bg-white/5 rounded-xl p-4 mb-4">
                  <p className="text-sm text-gray-400">Movie</p>
                  <p className="text-white font-medium">{editingShowtime.movie?.title}</p>
                  <p className="text-sm text-gray-400 mt-2">Cinema</p>
                  <p className="text-white font-medium">{editingShowtime.cinema?.name}</p>
                  <p className="text-sm text-gray-400 mt-2">Time</p>
                  <p className="text-white font-medium">
                    {new Date(editingShowtime.showtime).toLocaleString()}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Format</label>
                    <select
                      value={editingShowtime.format}
                      onChange={(e) => setEditingShowtime((prev) => prev ? { ...prev, format: e.target.value } : null)}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
                    >
                      {FORMATS.map((format) => (
                        <option key={format} value={format} className="bg-[#1A1A2E]">{format}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Language</label>
                    <select
                      value={editingShowtime.language}
                      onChange={(e) => setEditingShowtime((prev) => prev ? { ...prev, language: e.target.value } : null)}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
                    >
                      {LANGUAGES.map((lang) => (
                        <option key={lang} value={lang} className="bg-[#1A1A2E]">{lang}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Screen</label>
                    <input
                      type="text"
                      value={editingShowtime.screen_number || ''}
                      onChange={(e) => setEditingShowtime((prev) => prev ? { ...prev, screen_number: e.target.value } : null)}
                      placeholder="Hall 1"
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Standard BD</label>
                    <input
                      type="number"
                      step="0.5"
                      value={editingShowtime.price_standard || 0}
                      onChange={(e) => setEditingShowtime((prev) => prev ? { ...prev, price_standard: parseFloat(e.target.value) || 0 } : null)}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">VIP BD</label>
                    <input
                      type="number"
                      step="0.5"
                      value={editingShowtime.price_vip || 0}
                      onChange={(e) => setEditingShowtime((prev) => prev ? { ...prev, price_vip: parseFloat(e.target.value) || 0 } : null)}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Booking URL</label>
                  <input
                    type="url"
                    value={editingShowtime.booking_url || ''}
                    onChange={(e) => setEditingShowtime((prev) => prev ? { ...prev, booking_url: e.target.value } : null)}
                    placeholder="https://..."
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditingShowtime(null)}
                    className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
