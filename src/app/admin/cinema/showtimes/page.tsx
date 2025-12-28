'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
} from 'lucide-react';

interface Movie {
  id: string;
  title: string;
  poster_url: string;
}

interface Cinema {
  id: string;
  name: string;
  location: string;
  area: string;
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
  is_active: boolean;
  movie?: Movie;
  cinema?: Cinema;
}

export default function AdminShowtimesPage() {
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCinema, setFilterCinema] = useState('all');
  const [filterDate, setFilterDate] = useState('');

  const [newShowtime, setNewShowtime] = useState({
    movie_id: '',
    cinema_id: '',
    date: '',
    time: '',
    format: '2D',
    language: 'English',
    screen_number: '',
    price_standard: 4,
    price_vip: 8,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch showtimes
      const showtimesRes = await fetch('/api/cinema/showtimes');
      if (showtimesRes.ok) {
        const data = await showtimesRes.json();
        setShowtimes(data.showtimes || []);
      }

      // Fetch movies
      const moviesRes = await fetch('/api/cinema/movies?status=now_showing');
      if (moviesRes.ok) {
        const data = await moviesRes.json();
        setMovies(data.movies || []);
      }

      // Fetch cinemas
      const cinemasRes = await fetch('/api/cinema/cinemas');
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

  const handleAddShowtime = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newShowtime.movie_id || !newShowtime.cinema_id || !newShowtime.date || !newShowtime.time) {
      return;
    }

    try {
      setSaving(true);

      const showtime = `${newShowtime.date}T${newShowtime.time}:00`;

      const res = await fetch('/api/cinema/showtimes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          movie_id: newShowtime.movie_id,
          cinema_id: newShowtime.cinema_id,
          showtime,
          format: newShowtime.format,
          language: newShowtime.language,
          screen_number: newShowtime.screen_number,
          price_standard: newShowtime.price_standard,
          price_vip: newShowtime.price_vip,
        }),
      });

      if (res.ok) {
        await fetchData();
        setShowAddForm(false);
        setNewShowtime({
          movie_id: '',
          cinema_id: '',
          date: '',
          time: '',
          format: '2D',
          language: 'English',
          screen_number: '',
          price_standard: 4,
          price_vip: 8,
        });
      }
    } catch (error) {
      console.error('Failed to add showtime:', error);
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
        setShowtimes(prev => prev.filter(s => s.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete showtime:', error);
    }
  };

  const filteredShowtimes = showtimes.filter(showtime => {
    const matchesSearch = showtime.movie?.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCinema = filterCinema === 'all' || showtime.cinema_id === filterCinema;
    const matchesDate = !filterDate || showtime.showtime.startsWith(filterDate);
    return matchesSearch && matchesCinema && matchesDate;
  });

  const groupedByDate = filteredShowtimes.reduce((acc, showtime) => {
    const date = showtime.showtime.split('T')[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push(showtime);
    return acc;
  }, {} as Record<string, Showtime[]>);

  const formatTime = (datetime: string) => {
    return new Date(datetime).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <Link
            href="/admin/cinema"
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Showtimes</h1>
            <p className="text-gray-400">Manage movie showtimes across cinemas</p>
          </div>
        </div>

        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Add Showtime
        </button>
      </motion.div>

      {/* Add Showtime Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1A1A2E] border border-white/10 rounded-2xl p-6 w-full max-w-lg"
          >
            <h2 className="text-xl font-bold text-white mb-6">Add Showtime</h2>

            <form onSubmit={handleAddShowtime} className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Movie</label>
                <select
                  value={newShowtime.movie_id}
                  onChange={(e) => setNewShowtime(prev => ({ ...prev, movie_id: e.target.value }))}
                  required
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
                >
                  <option value="" className="bg-[#1A1A2E]">Select Movie</option>
                  {movies.map(movie => (
                    <option key={movie.id} value={movie.id} className="bg-[#1A1A2E]">
                      {movie.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-1 block">Cinema</label>
                <select
                  value={newShowtime.cinema_id}
                  onChange={(e) => setNewShowtime(prev => ({ ...prev, cinema_id: e.target.value }))}
                  required
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
                >
                  <option value="" className="bg-[#1A1A2E]">Select Cinema</option>
                  {cinemas.map(cinema => (
                    <option key={cinema.id} value={cinema.id} className="bg-[#1A1A2E]">
                      {cinema.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Date</label>
                  <input
                    type="date"
                    value={newShowtime.date}
                    onChange={(e) => setNewShowtime(prev => ({ ...prev, date: e.target.value }))}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Time</label>
                  <input
                    type="time"
                    value={newShowtime.time}
                    onChange={(e) => setNewShowtime(prev => ({ ...prev, time: e.target.value }))}
                    required
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Format</label>
                  <select
                    value={newShowtime.format}
                    onChange={(e) => setNewShowtime(prev => ({ ...prev, format: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
                  >
                    <option value="2D" className="bg-[#1A1A2E]">2D</option>
                    <option value="3D" className="bg-[#1A1A2E]">3D</option>
                    <option value="IMAX" className="bg-[#1A1A2E]">IMAX</option>
                    <option value="VIP" className="bg-[#1A1A2E]">VIP</option>
                    <option value="4DX" className="bg-[#1A1A2E]">4DX</option>
                    <option value="Dolby" className="bg-[#1A1A2E]">Dolby Cinema</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Language</label>
                  <select
                    value={newShowtime.language}
                    onChange={(e) => setNewShowtime(prev => ({ ...prev, language: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
                  >
                    <option value="English" className="bg-[#1A1A2E]">English</option>
                    <option value="Arabic" className="bg-[#1A1A2E]">Arabic</option>
                    <option value="Hindi" className="bg-[#1A1A2E]">Hindi</option>
                    <option value="Arabic Subtitles" className="bg-[#1A1A2E]">English (Arabic Subs)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Screen</label>
                  <input
                    type="text"
                    value={newShowtime.screen_number}
                    onChange={(e) => setNewShowtime(prev => ({ ...prev, screen_number: e.target.value }))}
                    placeholder="e.g., Hall 1"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Standard (BD)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={newShowtime.price_standard}
                    onChange={(e) => setNewShowtime(prev => ({ ...prev, price_standard: parseFloat(e.target.value) }))}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">VIP (BD)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={newShowtime.price_vip}
                    onChange={(e) => setNewShowtime(prev => ({ ...prev, price_vip: parseFloat(e.target.value) }))}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
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

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-3"
      >
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
          value={filterCinema}
          onChange={(e) => setFilterCinema(e.target.value)}
          className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500/50"
        >
          <option value="all" className="bg-[#1A1A2E]">All Cinemas</option>
          {cinemas.map(cinema => (
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
      </motion.div>

      {/* Showtimes List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
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
            <p className="text-gray-400 mb-4">Add showtimes to display them here</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
            >
              Add First Showtime
            </button>
          </div>
        ) : (
          Object.entries(groupedByDate)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([date, dateShowtimes]) => (
              <div key={date} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-semibold text-white">{formatDate(date)}</h3>
                  <span className="px-2 py-0.5 text-xs bg-white/10 text-gray-400 rounded-full">
                    {dateShowtimes.length} showtime{dateShowtimes.length !== 1 ? 's' : ''}
                  </span>
                </div>

                <div className="divide-y divide-white/5">
                  {dateShowtimes
                    .sort((a, b) => a.showtime.localeCompare(b.showtime))
                    .map(showtime => (
                      <div key={showtime.id} className="px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="text-center min-w-[60px]">
                            <p className="text-lg font-bold text-white">{formatTime(showtime.showtime)}</p>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <Film className="w-4 h-4 text-cyan-400" />
                              <p className="font-medium text-white">{showtime.movie?.title || 'Unknown Movie'}</p>
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
                          </div>
                          <button
                            onClick={() => handleDeleteShowtime(showtime.id)}
                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))
        )}
      </motion.div>
    </div>
  );
}
