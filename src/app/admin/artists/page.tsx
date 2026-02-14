'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Artist, ArtistCategory, ArtistStatus, ArtistTier } from '@/types/database';

const CATEGORY_LABELS: Record<ArtistCategory, string> = {
  dj: 'DJ',
  vocalist: 'Vocalist',
  instrumentalist: 'Instrumentalist',
  band: 'Band',
  fire_show: 'Fire Show',
  performer: 'Performer',
  kids_entertainment: 'Kids Entertainment',
  magician: 'Magician',
};

const STATUS_COLORS: Record<ArtistStatus, string> = {
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  approved: 'bg-green-500/20 text-green-400 border-green-500/30',
  rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
  suspended: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

const TIER_LABELS: Record<ArtistTier, string> = {
  vibes: 'Vibes',
  bahrainnights_exclusive: 'BN Exclusive',
};

interface DashboardStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  suspended: number;
  byCategory: Record<string, number>;
  monthlyRequests: number;
}

export default function ArtistsAdminPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<ArtistStatus | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<ArtistCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch artists
  const fetchArtists = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeTab !== 'all') params.set('status', activeTab);
      if (selectedCategory !== 'all') params.set('category', selectedCategory);
      if (searchQuery) params.set('search', searchQuery);

      const res = await fetch(`/api/admin/artists?${params}`);
      const data = await res.json();
      setArtists(data.artists || []);
      setStats(data.stats || null);
    } catch (error) {
      console.error('Failed to fetch artists:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtists();
  }, [activeTab, selectedCategory, searchQuery]);

  // Update artist status
  const updateStatus = async (id: string, status: ArtistStatus, rejectionReason?: string) => {
    try {
      await fetch(`/api/admin/artists/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, rejection_reason: rejectionReason }),
      });
      fetchArtists();
      setSelectedArtist(null);
    } catch (error) {
      console.error('Failed to update artist:', error);
    }
  };

  // Upload photo to S3
  const handlePhotoUpload = async (artistId: string, file: File) => {
    setUploadingPhoto(true);
    try {
      // Get presigned URL
      const presignResponse = await fetch(`/api/admin/artists/${artistId}/upload-photo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileType: file.type,
          fileSize: file.size,
          imageType: 'profile',
        }),
      });

      if (!presignResponse.ok) {
        const error = await presignResponse.json();
        throw new Error(error.error || 'Failed to get upload URL');
      }

      const { presignedUrl, finalUrl } = await presignResponse.json();

      // Upload directly to S3
      const uploadResponse = await fetch(presignedUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload to S3');
      }

      // Update artist with new image URL
      const updateResponse = await fetch(`/api/admin/artists/${artistId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile_image: finalUrl }),
      });

      if (!updateResponse.ok) {
        throw new Error('Failed to update artist');
      }

      // Refresh artists list
      await fetchArtists();
      
      // Update selected artist if still viewing
      if (selectedArtist && selectedArtist.id === artistId) {
        setSelectedArtist({ ...selectedArtist, profile_image: finalUrl });
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedArtist) {
      handlePhotoUpload(selectedArtist.id, file);
    }
    e.target.value = '';
  };

  // Toggle featured
  const toggleFeatured = async (id: string, is_featured: boolean) => {
    try {
      await fetch(`/api/admin/artists/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_featured }),
      });
      fetchArtists();
    } catch (error) {
      console.error('Failed to toggle featured:', error);
    }
  };

  // Move artist up or down in order
  const moveArtist = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = artists.findIndex(a => a.id === id);
    if (currentIndex === -1) return;
    
    const swapIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (swapIndex < 0 || swapIndex >= artists.length) return;

    const currentArtist = artists[currentIndex];
    const swapArtist = artists[swapIndex];

    try {
      // Swap display_order values
      await Promise.all([
        fetch(`/api/admin/artists/${currentArtist.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ display_order: swapArtist.display_order }),
        }),
        fetch(`/api/admin/artists/${swapArtist.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ display_order: currentArtist.display_order }),
        }),
      ]);
      fetchArtists();
    } catch (error) {
      console.error('Failed to reorder artists:', error);
    }
  };

  return (
    <div className="text-white">
      {/* Hidden file input for photo upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
      />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Artist Management</h1>
        <p className="text-gray-400">Manage artists and booking requests</p>
      </div>

      {/* Stats Dashboard */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-gray-800 rounded-xl p-4">
            <p className="text-gray-400 text-sm">Total Artists</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
            <p className="text-yellow-400 text-sm">Pending</p>
            <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
          </div>
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
            <p className="text-green-400 text-sm">Approved</p>
            <p className="text-2xl font-bold text-green-400">{stats.approved}</p>
          </div>
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
            <p className="text-red-400 text-sm">Rejected</p>
            <p className="text-2xl font-bold text-red-400">{stats.rejected}</p>
          </div>
          <div className="bg-gray-700 rounded-xl p-4">
            <p className="text-gray-400 text-sm">Suspended</p>
            <p className="text-2xl font-bold">{stats.suspended}</p>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
            <p className="text-amber-400 text-sm">This Month Requests</p>
            <p className="text-2xl font-bold text-amber-400">{stats.monthlyRequests}</p>
          </div>
        </div>
      )}

      {/* Category Breakdown */}
      {stats?.byCategory && Object.keys(stats.byCategory).length > 0 && (
        <div className="bg-gray-800 rounded-xl p-4 mb-8">
          <h3 className="text-lg font-semibold mb-4">Artists by Category</h3>
          <div className="flex flex-wrap gap-3">
            {Object.entries(stats.byCategory).map(([category, count]) => (
              <div key={category} className="bg-gray-700 px-4 py-2 rounded-lg">
                <span className="text-gray-300">{CATEGORY_LABELS[category as ArtistCategory] || category}</span>
                <span className="ml-2 text-amber-400 font-semibold">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Status Tabs */}
        <div className="flex gap-2 bg-gray-800 p-1 rounded-lg">
          {(['all', 'pending', 'approved', 'rejected', 'suspended'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setActiveTab(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === status
                  ? 'bg-amber-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              {status === 'pending' && stats?.pending ? (
                <span className="ml-1 bg-yellow-500 text-black px-1.5 py-0.5 rounded-full text-xs">
                  {stats.pending}
                </span>
              ) : null}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as ArtistCategory | 'all')}
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
        >
          <option value="all">All Categories</option>
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>

        {/* Search */}
        <input
          type="text"
          placeholder="Search artists..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white flex-1 min-w-[200px]"
        />
      </div>

      {/* Artists Table */}
      <div className="bg-gray-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400">Loading...</div>
        ) : artists.length === 0 ? (
          <div className="p-12 text-center text-gray-400">No artists found</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Order</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Artist</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Category</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Tier</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Rate/Hr</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Featured</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {artists.map((artist, index) => (
                <tr key={artist.id} className="hover:bg-gray-700/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => moveArtist(artist.id, 'up')}
                        disabled={index === 0}
                        className="p-1 text-gray-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move up"
                      >
                        ▲
                      </button>
                      <button
                        onClick={() => moveArtist(artist.id, 'down')}
                        disabled={index === artists.length - 1}
                        className="p-1 text-gray-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move down"
                      >
                        ▼
                      </button>
                      <span className="text-xs text-gray-500 ml-1">{artist.display_order}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-700 flex-shrink-0">
                        {artist.profile_image ? (
                          <Image
                            src={artist.profile_image}
                            alt={artist.stage_name}
                            width={40}
                            height={40}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-500">
                            🎭
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{artist.stage_name}</p>
                        {artist.real_name && (
                          <p className="text-xs text-gray-500">{artist.real_name}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-300">
                    {artist.subcategory 
                      ? `${artist.subcategory.charAt(0).toUpperCase() + artist.subcategory.slice(1).replace('_', ' ')}`
                      : CATEGORY_LABELS[artist.category]
                    }
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded ${
                      artist.tier === 'vibes' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {TIER_LABELS[artist.tier]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded border ${STATUS_COLORS[artist.status]}`}>
                      {artist.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {artist.rate_per_hour ? `${artist.rate_per_hour} ${artist.currency}` : '-'}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleFeatured(artist.id, !artist.is_featured)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        artist.is_featured
                          ? 'bg-amber-500 text-white'
                          : 'bg-gray-700 text-gray-500 hover:bg-gray-600'
                      }`}
                    >
                      ⭐
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedArtist(artist)}
                        className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-sm"
                      >
                        View
                      </button>
                      {artist.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updateStatus(artist.id, 'approved')}
                            className="px-3 py-1.5 bg-green-600 hover:bg-green-500 rounded text-sm"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => {
                              const reason = prompt('Rejection reason:');
                              if (reason) updateStatus(artist.id, 'rejected', reason);
                            }}
                            className="px-3 py-1.5 bg-red-600 hover:bg-red-500 rounded text-sm"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Artist Detail Modal */}
      {selectedArtist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">{selectedArtist.stage_name}</h2>
                {selectedArtist.real_name && (
                  <p className="text-gray-400">Real name: {selectedArtist.real_name}</p>
                )}
              </div>
              <button
                onClick={() => setSelectedArtist(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Profile Image with Upload */}
              <div className="relative">
                <div className="w-full aspect-video relative rounded-lg overflow-hidden bg-gray-700 group">
                  {selectedArtist.profile_image ? (
                    <Image
                      src={selectedArtist.profile_image}
                      alt={selectedArtist.stage_name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 text-6xl">
                      🎭
                    </div>
                  )}
                  
                  {/* Upload overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingPhoto}
                      className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-white rounded-lg font-medium flex items-center gap-2 transition-colors"
                    >
                      {uploadingPhoto ? (
                        <>
                          <span className="animate-spin">⏳</span>
                          Uploading...
                        </>
                      ) : (
                        <>
                          📷 Change Photo
                        </>
                      )}
                    </button>
                  </div>
                </div>
                
                {/* Upload button below image on mobile */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingPhoto}
                  className="mt-3 w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm flex items-center justify-center gap-2 md:hidden"
                >
                  {uploadingPhoto ? '⏳ Uploading...' : '📷 Change Photo'}
                </button>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400">Category</label>
                  <p>{CATEGORY_LABELS[selectedArtist.category]}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Subcategory</label>
                  <p>{selectedArtist.subcategory || '-'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Status</label>
                  <p className={STATUS_COLORS[selectedArtist.status].replace('bg-', 'text-').split(' ')[0]}>
                    {selectedArtist.status}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Tier</label>
                  <p>{TIER_LABELS[selectedArtist.tier]}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Rate per Hour</label>
                  <p>{selectedArtist.rate_per_hour ? `${selectedArtist.rate_per_hour} ${selectedArtist.currency}` : 'Not set'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Rate per Event</label>
                  <p>{selectedArtist.rate_per_event ? `${selectedArtist.rate_per_event} ${selectedArtist.currency}` : 'Not set'}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm text-gray-400">Rate Notes</label>
                  <p>{selectedArtist.rate_notes || 'No notes'}</p>
                </div>
              </div>

              {/* Bio */}
              {selectedArtist.bio && (
                <div>
                  <label className="text-sm text-gray-400">Bio</label>
                  <p className="mt-1 whitespace-pre-wrap">{selectedArtist.bio}</p>
                </div>
              )}

              {/* Instagram */}
              {selectedArtist.instagram_handle && (
                <div>
                  <label className="text-sm text-gray-400">Instagram</label>
                  <p className="text-pink-400">@{selectedArtist.instagram_handle.replace('@', '')}</p>
                </div>
              )}

              {/* Contact (for signups) */}
              {selectedArtist.submitted_email && (
                <div className="border-t border-gray-700 pt-4">
                  <h3 className="font-semibold mb-2">Contact Info (Tier 2 Signup)</h3>
                  <p>Email: {selectedArtist.submitted_email}</p>
                  {selectedArtist.submitted_phone && (
                    <p>Phone: {selectedArtist.submitted_phone}</p>
                  )}
                </div>
              )}

              {/* Admin Notes */}
              <div>
                <label className="text-sm text-gray-400">Admin Notes</label>
                <p className="mt-1 text-gray-300">{selectedArtist.admin_notes || 'No admin notes'}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 border-t border-gray-700 pt-6">
                {selectedArtist.status === 'pending' && (
                  <>
                    <button
                      onClick={() => updateStatus(selectedArtist.id, 'approved')}
                      className="flex-1 py-3 bg-green-600 hover:bg-green-500 rounded-lg font-medium"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        const reason = prompt('Rejection reason:');
                        if (reason) updateStatus(selectedArtist.id, 'rejected', reason);
                      }}
                      className="flex-1 py-3 bg-red-600 hover:bg-red-500 rounded-lg font-medium"
                    >
                      Reject
                    </button>
                  </>
                )}
                {selectedArtist.status === 'approved' && (
                  <button
                    onClick={() => updateStatus(selectedArtist.id, 'suspended')}
                    className="flex-1 py-3 bg-gray-600 hover:bg-gray-500 rounded-lg font-medium"
                  >
                    Suspend
                  </button>
                )}
                {selectedArtist.status === 'suspended' && (
                  <button
                    onClick={() => updateStatus(selectedArtist.id, 'approved')}
                    className="flex-1 py-3 bg-green-600 hover:bg-green-500 rounded-lg font-medium"
                  >
                    Reactivate
                  </button>
                )}
                <button
                  onClick={() => toggleFeatured(selectedArtist.id, !selectedArtist.is_featured)}
                  className={`px-6 py-3 rounded-lg font-medium ${
                    selectedArtist.is_featured
                      ? 'bg-amber-500 text-white'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                >
                  {selectedArtist.is_featured ? '⭐ Featured' : 'Mark Featured'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
