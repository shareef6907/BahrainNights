'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Eye, EyeOff, ArrowLeft, Film, AlertCircle, Database } from 'lucide-react';
import Link from 'next/link';

interface Movie {
  id: string;
  title: string;
  poster_url?: string | null;
  backdrop_url?: string | null;
  trailer_url?: string | null;
  trailer_key?: string | null;
  synopsis?: string | null;
  genre?: string[] | null;
}

interface FeaturedTrailer {
  id: string;
  movie_id: string;
  display_order: number;
  is_active: boolean;
  movie?: Movie | null;
}

export default function TrailersAdminPage() {
  const [featuredTrailers, setFeaturedTrailers] = useState<FeaturedTrailer[]>([]);
  const [availableMovies, setAvailableMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<string>('');
  const [tableExists, setTableExists] = useState(true);
  const [creatingTable, setCreatingTable] = useState(false);

  const fetchData = async () => {
    setLoading(true);

    try {
      // Fetch featured trailers
      const featuredRes = await fetch('/api/admin/blog/trailers');
      const featuredData = await featuredRes.json();
      setFeaturedTrailers(featuredData.trailers || []);
      setTableExists(featuredData.tableExists !== false);

      // Fetch all movies with trailers
      const moviesRes = await fetch('/api/cinema/trailers?limit=100');
      const moviesData = await moviesRes.json();
      setAvailableMovies(moviesData.movies || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createTable = async () => {
    setCreatingTable(true);
    try {
      const res = await fetch('/api/admin/blog/trailers/init', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setTableExists(true);
        fetchData();
      } else {
        alert('Failed to create table: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      alert('Failed to create table: ' + String(error));
    }
    setCreatingTable(false);
  };

  const addTrailer = async () => {
    if (!selectedMovie) return;

    try {
      await fetch('/api/admin/blog/trailers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movie_id: selectedMovie }),
      });

      setSelectedMovie('');
      fetchData();
    } catch (error) {
      console.error('Error adding trailer:', error);
    }
  };

  const removeTrailer = async (id: string) => {
    if (!confirm('Remove this trailer from featured?')) return;

    try {
      await fetch(`/api/admin/blog/trailers/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (error) {
      console.error('Error removing trailer:', error);
    }
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    try {
      await fetch(`/api/admin/blog/trailers/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !isActive }),
      });
      fetchData();
    } catch (error) {
      console.error('Error toggling active:', error);
    }
  };

  const moveTrailer = async (id: string, direction: 'up' | 'down') => {
    const index = featuredTrailers.findIndex((t) => t.id === id);
    if (index === -1) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= featuredTrailers.length) return;

    const newOrder = [...featuredTrailers];
    [newOrder[index], newOrder[newIndex]] = [newOrder[newIndex], newOrder[index]];

    // Optimistic update
    setFeaturedTrailers(newOrder);

    try {
      // Update order in database
      await fetch('/api/admin/blog/trailers/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order: newOrder.map((t, i) => ({ id: t.id, display_order: i })),
        }),
      });
    } catch (error) {
      console.error('Error reordering:', error);
      fetchData(); // Revert on error
    }
  };

  // Filter out movies that are already featured
  const featuredMovieIds = featuredTrailers.map((t) => t.movie_id);
  const availableToAdd = availableMovies.filter((m) => !featuredMovieIds.includes(m.id));

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Film className="text-purple-500" size={28} />
              <h1 className="text-2xl font-bold">Featured Trailers</h1>
            </div>
            <p className="text-gray-400">Manage trailers shown on the blog hero section</p>
          </div>
          <Link
            href="/admin/blog"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Blog Admin
          </Link>
        </div>

        {/* Table Not Exists Warning */}
        {!tableExists && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="text-yellow-500 flex-shrink-0" size={24} />
              <div className="flex-1">
                <h3 className="font-bold text-yellow-500 mb-2">Database Setup Required</h3>
                <p className="text-gray-300 mb-4">
                  The featured_trailers table doesn&apos;t exist yet. Click below to create it.
                </p>
                <button
                  onClick={createTable}
                  disabled={creatingTable}
                  className="flex items-center gap-2 bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-400 disabled:opacity-50"
                >
                  <Database size={18} />
                  {creatingTable ? 'Creating...' : 'Create Table'}
                </button>
              </div>
            </div>
          </div>
        )}

        {tableExists && (
          <>
            {/* Add New Trailer */}
            <div className="bg-gray-900 rounded-xl p-6 mb-8 border border-gray-800">
              <h2 className="font-bold mb-4 flex items-center gap-2">
                <Plus size={18} className="text-green-500" />
                Add Trailer to Hero
              </h2>
              <div className="flex gap-4">
                <select
                  value={selectedMovie}
                  onChange={(e) => setSelectedMovie(e.target.value)}
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                >
                  <option value="">Select a movie with trailer...</option>
                  {availableToAdd.map((movie) => (
                    <option key={movie.id} value={movie.id}>
                      {movie.title}
                    </option>
                  ))}
                </select>
                <button
                  onClick={addTrailer}
                  disabled={!selectedMovie}
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                >
                  <Plus size={18} />
                  Add
                </button>
              </div>
              {availableToAdd.length === 0 && availableMovies.length > 0 && (
                <p className="text-gray-500 text-sm mt-3">
                  All available movies with trailers have been added.
                </p>
              )}
            </div>

            {/* Featured Trailers List */}
            <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
              <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                <div>
                  <h2 className="font-bold">Current Featured ({featuredTrailers.length})</h2>
                  <p className="text-gray-500 text-sm">First trailer plays first on the blog page</p>
                </div>
              </div>

              {loading ? (
                <div className="p-8 text-center text-gray-500">
                  <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  Loading...
                </div>
              ) : featuredTrailers.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Film size={48} className="mx-auto mb-3 opacity-50" />
                  <p>No featured trailers yet.</p>
                  <p className="text-sm">Add some movies from the dropdown above!</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-800">
                  {featuredTrailers.map((trailer, index) => (
                    <div
                      key={trailer.id}
                      className={`flex items-center gap-4 p-4 ${
                        !trailer.is_active ? 'opacity-50 bg-gray-900/50' : ''
                      }`}
                    >
                      {/* Order Controls */}
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => moveTrailer(trailer.id, 'up')}
                          disabled={index === 0}
                          className="text-gray-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed text-sm px-2 py-1 hover:bg-gray-800 rounded transition-colors"
                          title="Move up"
                        >
                          ▲
                        </button>
                        <button
                          onClick={() => moveTrailer(trailer.id, 'down')}
                          disabled={index === featuredTrailers.length - 1}
                          className="text-gray-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed text-sm px-2 py-1 hover:bg-gray-800 rounded transition-colors"
                          title="Move down"
                        >
                          ▼
                        </button>
                      </div>

                      {/* Order Number */}
                      <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                        {index + 1}
                      </div>

                      {/* Poster */}
                      {trailer.movie?.poster_url ? (
                        <img
                          src={trailer.movie.poster_url}
                          alt={trailer.movie?.title || 'Movie'}
                          className="w-16 h-24 object-cover rounded flex-shrink-0"
                        />
                      ) : (
                        <div className="w-16 h-24 bg-gray-800 rounded flex items-center justify-center flex-shrink-0">
                          <Film size={24} className="text-gray-600" />
                        </div>
                      )}

                      {/* Title & Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-white truncate">
                          {trailer.movie?.title || 'Unknown Movie'}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {trailer.movie?.trailer_key
                            ? 'YouTube Trailer'
                            : trailer.movie?.trailer_url
                            ? 'Direct URL'
                            : 'No trailer URL'}
                        </p>
                        {trailer.movie?.genre && (
                          <p className="text-xs text-gray-600 mt-1">
                            {Array.isArray(trailer.movie.genre)
                              ? trailer.movie.genre.slice(0, 3).join(', ')
                              : trailer.movie.genre}
                          </p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => toggleActive(trailer.id, trailer.is_active)}
                          className={`p-2 rounded-lg transition-colors ${
                            trailer.is_active
                              ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                              : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                          }`}
                          title={trailer.is_active ? 'Click to hide' : 'Click to show'}
                        >
                          {trailer.is_active ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                        <button
                          onClick={() => removeTrailer(trailer.id)}
                          className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                          title="Remove from featured"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="mt-6 p-4 bg-gray-900/50 rounded-xl border border-gray-800">
              <h3 className="font-medium text-gray-300 mb-2">How it works:</h3>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>
                  <span className="text-purple-400">1.</span> Select movies from the dropdown to add them as featured trailers
                </li>
                <li>
                  <span className="text-purple-400">2.</span> Use the arrows to reorder - first trailer plays first
                </li>
                <li>
                  <span className="text-purple-400">3.</span> Use the eye icon to temporarily hide a trailer without removing it
                </li>
                <li>
                  <span className="text-purple-400">4.</span> Trailers auto-advance every 25 seconds on the blog page
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
