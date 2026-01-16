'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import {
  Film,
  Plus,
  X,
  Loader2,
  CheckCircle,
  AlertCircle,
  Trash2,
  Instagram,
  GripVertical,
  ExternalLink,
  Upload,
  Video,
} from 'lucide-react';
import { isValidInstagramReelUrl, getInstagramReelUrl } from '@/lib/utils/instagram';
import InstagramReelEmbed from '@/components/places/InstagramReelEmbed';

interface VenueReel {
  id: string;
  venue_id: string;
  instagram_url: string;
  video_url?: string | null;
  thumbnail_url?: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default function VenueReelsPage() {
  const [reels, setReels] = useState<VenueReel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newReelUrl, setNewReelUrl] = useState('');
  const [urlError, setUrlError] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Video upload state
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);

  useEffect(() => {
    loadReels();
  }, []);

  async function loadReels() {
    try {
      const response = await fetch('/api/venue-portal/reels');
      if (response.ok) {
        const data = await response.json();
        setReels(data.reels || []);
      }
    } catch (error) {
      console.error('Failed to load reels:', error);
      setMessage({ type: 'error', text: 'Failed to load reels' });
    } finally {
      setIsLoading(false);
    }
  }

  // Handle video file selection and upload
  const handleVideoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setVideoError(null);
    setVideoFile(file);

    // Validate file type
    const allowedTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
    if (!allowedTypes.includes(file.type)) {
      setVideoError('Invalid video format. Please upload MP4, WebM, or MOV.');
      setVideoFile(null);
      return;
    }

    // Validate file size (100MB limit)
    if (file.size > 100 * 1024 * 1024) {
      setVideoError('Video too large. Maximum 100MB allowed.');
      setVideoFile(null);
      return;
    }

    // Upload to S3
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Get presigned URL
      const presignResponse = await fetch('/api/venue-portal/reels/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileType: file.type,
          fileSize: file.size,
        }),
      });

      if (!presignResponse.ok) {
        const data = await presignResponse.json();
        throw new Error(data.error || 'Failed to get upload URL');
      }

      const { presignedUrl, finalUrl } = await presignResponse.json();

      // Upload directly to S3 with progress tracking
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 100);
            setUploadProgress(percent);
          }
        });

        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve();
          } else {
            reject(new Error('Upload failed'));
          }
        });

        xhr.addEventListener('error', () => reject(new Error('Upload failed')));

        xhr.open('PUT', presignedUrl);
        xhr.setRequestHeader('Content-Type', file.type);
        xhr.send(file);
      });

      setVideoUrl(finalUrl);
      setMessage({ type: 'success', text: 'Video uploaded! Now add your Instagram reel URL and save.' });
    } catch (error) {
      console.error('Video upload error:', error);
      setVideoError(error instanceof Error ? error.message : 'Video upload failed');
      setVideoFile(null);
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setNewReelUrl('');
    setVideoFile(null);
    setVideoUrl(null);
    setUploadProgress(0);
    setUrlError(null);
    setVideoError(null);
    setShowAddForm(false);
  };

  const handleAddReel = async (e: React.FormEvent) => {
    e.preventDefault();
    setUrlError(null);
    setMessage(null);

    if (!newReelUrl.trim()) {
      setUrlError('Please enter an Instagram Reel URL');
      return;
    }

    if (!isValidInstagramReelUrl(newReelUrl)) {
      setUrlError('Please enter a valid Instagram Reel URL (e.g., https://www.instagram.com/reel/ABC123/)');
      return;
    }

    // Normalize the URL
    const normalizedUrl = getInstagramReelUrl(newReelUrl);
    if (!normalizedUrl) {
      setUrlError('Could not process the Instagram Reel URL');
      return;
    }

    // Check for duplicates
    if (reels.some(reel => reel.instagram_url === normalizedUrl)) {
      setUrlError('This reel has already been added');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/venue-portal/reels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instagram_url: normalizedUrl,
          video_url: videoUrl, // Include uploaded video URL for autoplay
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setReels(prev => [...prev, data.reel]);
        resetForm();
        setMessage({ type: 'success', text: videoUrl ? 'Reel added with autoplay video!' : 'Reel added successfully!' });
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to add reel' });
      }
    } catch (error) {
      console.error('Add reel error:', error);
      setMessage({ type: 'error', text: 'Failed to add reel' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteReel = async (reelId: string) => {
    if (!confirm('Are you sure you want to delete this reel?')) return;

    setDeletingId(reelId);
    setMessage(null);

    try {
      const response = await fetch(`/api/venue-portal/reels/${reelId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setReels(prev => prev.filter(r => r.id !== reelId));
        setMessage({ type: 'success', text: 'Reel deleted successfully!' });
      } else {
        const data = await response.json();
        setMessage({ type: 'error', text: data.error || 'Failed to delete reel' });
      }
    } catch (error) {
      console.error('Delete reel error:', error);
      setMessage({ type: 'error', text: 'Failed to delete reel' });
    } finally {
      setDeletingId(null);
    }
  };

  const handleReorder = async (newOrder: VenueReel[]) => {
    setReels(newOrder);

    // Update the display order on the server
    try {
      const reorderData = newOrder.map((reel, index) => ({
        id: reel.id,
        display_order: index,
      }));

      await fetch('/api/venue-portal/reels/reorder', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reels: reorderData }),
      });
    } catch (error) {
      console.error('Reorder error:', error);
      // Reload reels to get the correct order
      loadReels();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-2">
            <Film className="w-8 h-8 text-pink-500" />
            Instagram Reels
          </h1>
          <p className="text-gray-400 mt-1">
            Showcase your venue with Instagram Reels. Drag to reorder.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl text-white font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5" />
          Add Reel
        </button>
      </div>

      {/* Message */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`flex items-center gap-3 p-4 rounded-xl ${
              message.type === 'success'
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <span>{message.text}</span>
            <button
              onClick={() => setMessage(null)}
              className="ml-auto p-1 hover:bg-white/10 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Reel Form Modal */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => resetForm()}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-2xl p-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Instagram className="w-6 h-6 text-pink-500" />
                  Add Instagram Reel
                </h2>
                <button
                  onClick={() => resetForm()}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddReel} className="space-y-4">
                {/* Video Upload Section (Optional - for autoplay) */}
                <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl">
                  <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <Video className="w-4 h-4 text-purple-400" />
                    Upload Video for Autoplay
                    <span className="text-xs font-normal text-gray-400">(Optional)</span>
                  </h3>
                  <p className="text-xs text-gray-400 mb-3">
                    Upload a video file to enable autoplay on your venue page. The video will play automatically when visitors view your profile.
                  </p>

                  {!videoUrl ? (
                    <label className={`relative block cursor-pointer ${isUploading ? 'pointer-events-none' : ''}`}>
                      <input
                        type="file"
                        accept="video/mp4,video/webm,video/quicktime"
                        onChange={handleVideoSelect}
                        className="sr-only"
                        disabled={isUploading}
                      />
                      <div className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl transition-all ${
                        videoError ? 'border-red-500' : 'border-gray-600 hover:border-purple-500'
                      }`}>
                        {isUploading ? (
                          <>
                            <Loader2 className="w-8 h-8 text-purple-400 animate-spin mb-2" />
                            <p className="text-sm text-gray-400">Uploading... {uploadProgress}%</p>
                            <div className="w-full mt-2 bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
                                style={{ width: `${uploadProgress}%` }}
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-400">Click to upload video</p>
                            <p className="text-xs text-gray-500 mt-1">MP4, WebM, MOV up to 100MB</p>
                          </>
                        )}
                      </div>
                    </label>
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-green-400 font-medium">Video uploaded!</p>
                        <p className="text-xs text-gray-400 truncate">{videoFile?.name}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setVideoFile(null);
                          setVideoUrl(null);
                          setUploadProgress(0);
                        }}
                        className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {videoError && (
                    <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {videoError}
                    </p>
                  )}
                </div>

                {/* Instagram URL (Required) */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Instagram Reel URL <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="url"
                    value={newReelUrl}
                    onChange={(e) => {
                      setNewReelUrl(e.target.value);
                      setUrlError(null);
                    }}
                    placeholder="https://www.instagram.com/reel/ABC123/"
                    className={`w-full bg-gray-900/50 border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-1 outline-none transition-all ${
                      urlError
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-700 focus:border-pink-500 focus:ring-pink-500'
                    }`}
                  />
                  {urlError && (
                    <p className="mt-2 text-sm text-red-400">{urlError}</p>
                  )}
                  <p className="mt-2 text-xs text-gray-500">
                    This link will show a &quot;Watch on Instagram&quot; button. The uploaded video above enables autoplay on your venue page.
                  </p>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => resetForm()}
                    className="flex-1 px-4 py-3 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || isUploading}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5" />
                        Add Reel
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reels Grid */}
      {reels.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Reorder.Group
            axis="x"
            values={reels}
            onReorder={handleReorder}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {reels.map((reel, index) => (
              <Reorder.Item
                key={reel.id}
                value={reel}
                className="relative group"
              >
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
                >
                  {/* Drag Handle */}
                  <div className="flex items-center justify-between p-3 border-b border-white/10 bg-white/5">
                    <div className="flex items-center gap-2">
                      <GripVertical className="w-5 h-5 text-gray-500 cursor-grab active:cursor-grabbing" />
                      <span className="text-sm text-gray-400">#{index + 1}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={reel.instagram_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-pink-400 hover:bg-pink-500/10 rounded-lg transition-colors"
                        title="Open in Instagram"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => handleDeleteReel(reel.id)}
                        disabled={deletingId === reel.id}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete reel"
                      >
                        {deletingId === reel.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Reel Preview */}
                  <div className="p-3">
                    <div className="aspect-[9/16] max-h-[400px] rounded-lg overflow-hidden bg-black">
                      <InstagramReelEmbed reelUrl={reel.instagram_url} className="w-full h-full" />
                    </div>
                  </div>
                </motion.div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center"
        >
          <Film className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg mb-2">No reels yet</p>
          <p className="text-gray-500 text-sm mb-6">
            Add Instagram Reels to showcase your venue's atmosphere and highlights
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl text-white font-medium hover:opacity-90 transition-opacity"
          >
            <Plus className="w-5 h-5" />
            Add Your First Reel
          </button>
        </motion.div>
      )}

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-2xl p-6"
      >
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <Instagram className="w-5 h-5 text-pink-500" />
          Tips for Great Reels
        </h3>
        <ul className="text-gray-400 text-sm space-y-2">
          <li>• Showcase your venue&apos;s best features and ambiance</li>
          <li>• Include clips of special events, live music, or food/drinks</li>
          <li>• Keep reels engaging and high-quality</li>
          <li>• <strong className="text-purple-400">Upload a video file</strong> to enable autoplay on your venue page</li>
          <li>• Make sure your Instagram account is public for reels to display</li>
          <li>• Drag reels to reorder them - the first reel will be most prominent</li>
        </ul>
      </motion.div>
    </div>
  );
}
