'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Upload,
  Trash2,
  Link as LinkIcon,
  Calendar,
  Loader2,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Eye,
  MousePointer,
  TrendingUp,
  ExternalLink,
} from 'lucide-react';

// Client-side image compression function
async function compressImage(file: File, maxSizeKB: number = 600, maxWidth: number = 1920): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Resize if wider than maxWidth
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Try different quality levels to get under maxSizeKB
        const tryCompress = (quality: number): void => {
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Failed to compress image'));
                return;
              }

              const sizeKB = blob.size / 1024;

              // If still too large and quality > 0.1, try lower quality
              if (sizeKB > maxSizeKB && quality > 0.1) {
                tryCompress(quality - 0.1);
                return;
              }

              // Create new file from blob
              const compressedFile = new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });

              resolve(compressedFile);
            },
            'image/jpeg',
            quality
          );
        };

        tryCompress(0.9); // Start with 90% quality
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

// Categories for ads
const CATEGORIES = [
  { value: 'homepage', label: 'Homepage', slots: 5 },
  { value: 'events', label: 'Events', slots: 5 },
  { value: 'cinema', label: 'Cinema', slots: 5 },
  { value: 'places', label: 'Places', slots: 5 },
  { value: 'restaurants', label: 'Restaurants', slots: 5 },
  { value: 'cafes', label: 'Cafes', slots: 5 },
  { value: 'lounges', label: 'Lounges', slots: 5 },
  { value: 'nightclubs', label: 'Nightclubs', slots: 5 },
  { value: 'offers', label: 'Offers', slots: 5 },
] as const;

type Category = typeof CATEGORIES[number]['value'];

interface Ad {
  id: string;
  image_url: string;
  target_url: string;
  end_date: string;
  slot_position: number;
  target_page: string;
  status: string;
  impressions: number;
  clicks: number;
}

interface SlotData {
  ad: Ad | null;
  uploading: boolean;
  saving: boolean;
  tempLink: string;
  tempEndDate: string;
  previewUrl: string; // For immediate preview after upload
  imageError: boolean;
  objectPosition: string; // For image repositioning
}

export default function AdminAdsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('homepage');
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [slots, setSlots] = useState<Record<number, SlotData>>({});
  const [stats, setStats] = useState({ impressions: 0, clicks: 0 });
  const fileInputRefs = useRef<Record<number, HTMLInputElement | null>>({});

  const fetchAds = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/ads?targetPage=${activeCategory}`);
      if (!response.ok) throw new Error('Failed to fetch ads');

      const data = await response.json();
      setAds(data.ads || []);

      // Calculate stats for this category
      const categoryAds = data.ads || [];
      const totalImpressions = categoryAds.reduce((sum: number, ad: Ad) => sum + (ad.impressions || 0), 0);
      const totalClicks = categoryAds.reduce((sum: number, ad: Ad) => sum + (ad.clicks || 0), 0);
      setStats({ impressions: totalImpressions, clicks: totalClicks });

      // Initialize slots
      const newSlots: Record<number, SlotData> = {};
      for (let i = 1; i <= 5; i++) {
        const ad = categoryAds.find((a: Ad) => a.slot_position === i);
        newSlots[i] = {
          ad: ad || null,
          uploading: false,
          saving: false,
          tempLink: ad?.target_url || '',
          tempEndDate: ad?.end_date ? ad.end_date.split('T')[0] : '',
          previewUrl: '',
          imageError: false,
          objectPosition: 'center',
        };
      }
      setSlots(newSlots);
    } catch (error) {
      showToast('Failed to load ads', 'error');
    } finally {
      setLoading(false);
    }
  }, [activeCategory]);

  useEffect(() => {
    fetchAds();
  }, [fetchAds]);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSlotClick = (slotNumber: number) => {
    if (slots[slotNumber]?.ad) return; // Already has an ad
    fileInputRefs.current[slotNumber]?.click();
  };

  const handleFileSelect = async (slotNumber: number, file: File) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      showToast('Please select an image file', 'error');
      return;
    }

    setSlots(prev => ({
      ...prev,
      [slotNumber]: { ...prev[slotNumber], uploading: true }
    }));

    try {
      // Compress image to ~600KB and max 1920px width
      showToast('Compressing image...', 'success');
      const compressedFile = await compressImage(file, 600, 1920);

      // Create preview URL for immediate display
      const previewUrl = URL.createObjectURL(compressedFile);
      setSlots(prev => ({
        ...prev,
        [slotNumber]: { ...prev[slotNumber], previewUrl }
      }));

      // Upload to S3 (direct, no watermark)
      const formData = new FormData();
      formData.append('file', compressedFile);

      showToast('Uploading to S3...', 'success');
      const uploadResponse = await fetch('/api/upload/ads', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to upload image');
      }

      const { url: imageUrl } = await uploadResponse.json();
      console.log('Uploaded image URL:', imageUrl);

      // Create ad with image
      const defaultEndDate = new Date();
      defaultEndDate.setMonth(defaultEndDate.getMonth() + 1);

      const createResponse = await fetch('/api/admin/ads/quick', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl,
          targetUrl: '',
          endDate: defaultEndDate.toISOString().split('T')[0],
          slotPosition: slotNumber,
          targetPage: activeCategory,
        }),
      });

      if (!createResponse.ok) throw new Error('Failed to create ad');

      const { ad } = await createResponse.json();
      console.log('Created ad:', ad);

      setSlots(prev => ({
        ...prev,
        [slotNumber]: {
          ad,
          uploading: false,
          saving: false,
          tempLink: '',
          tempEndDate: ad.end_date.split('T')[0],
          previewUrl: '', // Clear preview, use actual URL
          imageError: false,
          objectPosition: 'center',
        }
      }));

      showToast('Image uploaded! Add a link below.', 'success');
    } catch (error) {
      showToast('Failed to upload image', 'error');
      setSlots(prev => ({
        ...prev,
        [slotNumber]: { ...prev[slotNumber], uploading: false, previewUrl: '' }
      }));
    }
  };

  const handleUpdateSlot = async (slotNumber: number) => {
    const slot = slots[slotNumber];
    if (!slot?.ad) return;

    setSlots(prev => ({
      ...prev,
      [slotNumber]: { ...prev[slotNumber], saving: true }
    }));

    try {
      const response = await fetch(`/api/admin/ads/${slot.ad.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetUrl: slot.tempLink,
          endDate: slot.tempEndDate,
        }),
      });

      if (!response.ok) throw new Error('Failed to update');

      const { ad } = await response.json();

      setSlots(prev => ({
        ...prev,
        [slotNumber]: {
          ...prev[slotNumber],
          ad,
          saving: false,
        }
      }));

      showToast('Saved!', 'success');
    } catch (error) {
      showToast('Failed to save', 'error');
      setSlots(prev => ({
        ...prev,
        [slotNumber]: { ...prev[slotNumber], saving: false }
      }));
    }
  };

  const handleDeleteSlot = async (slotNumber: number) => {
    const slot = slots[slotNumber];
    if (!slot?.ad) return;

    if (!confirm('Delete this ad?')) return;

    try {
      const response = await fetch(`/api/admin/ads/${slot.ad.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete');

      setSlots(prev => ({
        ...prev,
        [slotNumber]: {
          ad: null,
          uploading: false,
          saving: false,
          tempLink: '',
          tempEndDate: '',
          previewUrl: '',
          imageError: false,
          objectPosition: 'center',
        }
      }));

      showToast('Ad deleted', 'success');
    } catch (error) {
      showToast('Failed to delete', 'error');
    }
  };

  const handleReplaceImage = async (slotNumber: number, file: File) => {
    const slot = slots[slotNumber];
    if (!slot?.ad || !file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select an image file', 'error');
      return;
    }

    setSlots(prev => ({
      ...prev,
      [slotNumber]: { ...prev[slotNumber], uploading: true }
    }));

    try {
      // Compress image to ~600KB and max 1920px width
      showToast('Compressing image...', 'success');
      const compressedFile = await compressImage(file, 600, 1920);

      // Create preview URL for immediate display
      const previewUrl = URL.createObjectURL(compressedFile);
      setSlots(prev => ({
        ...prev,
        [slotNumber]: { ...prev[slotNumber], previewUrl, imageError: false }
      }));

      // Upload new image to S3 (direct, no watermark)
      const formData = new FormData();
      formData.append('file', compressedFile);

      showToast('Uploading to S3...', 'success');
      const uploadResponse = await fetch('/api/upload/ads', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to upload image');
      }

      const { url: imageUrl } = await uploadResponse.json();
      console.log('Replaced image URL:', imageUrl);

      // Update ad with new image
      const response = await fetch(`/api/admin/ads/${slot.ad.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl }),
      });

      if (!response.ok) throw new Error('Failed to update');

      const { ad } = await response.json();
      console.log('Updated ad:', ad);

      setSlots(prev => ({
        ...prev,
        [slotNumber]: {
          ...prev[slotNumber],
          ad,
          uploading: false,
          previewUrl: '', // Clear preview, use actual URL
          imageError: false,
        }
      }));

      showToast('Image replaced!', 'success');
    } catch (error) {
      showToast('Failed to replace image', 'error');
      setSlots(prev => ({
        ...prev,
        [slotNumber]: { ...prev[slotNumber], uploading: false, previewUrl: '' }
      }));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading ads...</p>
        </div>
      </div>
    );
  }

  const activeCount = Object.values(slots).filter(s => s.ad).length;
  const ctr = stats.impressions > 0 ? ((stats.clicks / stats.impressions) * 100).toFixed(2) : '0';

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg ${
            toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}
        >
          {toast.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {toast.message}
        </motion.div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Ads Manager</h1>
          <p className="text-gray-400 mt-1">Click empty slots to upload ad images</p>
        </div>
        <button
          onClick={() => fetchAds()}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <RefreshCw className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat.value
                ? 'bg-cyan-500 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <Eye className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Impressions</p>
              <p className="text-xl font-bold text-white">{stats.impressions.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <MousePointer className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Clicks</p>
              <p className="text-xl font-bold text-white">{stats.clicks.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <TrendingUp className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">CTR</p>
              <p className="text-xl font-bold text-white">{ctr}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Slots Grid */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 capitalize">
          {activeCategory} Ads ({activeCount} of 5 slots)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5].map((slotNumber) => {
            const slot = slots[slotNumber] || { ad: null, uploading: false, saving: false, tempLink: '', tempEndDate: '', previewUrl: '', imageError: false, objectPosition: 'center' };
            const imageUrl = slot.previewUrl || slot.ad?.image_url;

            return (
              <div key={slotNumber} className="space-y-3">
                {/* Slot Label */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-400">Slot {slotNumber}</span>
                  {slot.ad && (
                    <button
                      onClick={() => handleDeleteSlot(slotNumber)}
                      className="p-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Image Slot */}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={(el) => { fileInputRefs.current[slotNumber] = el; }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      if (slot.ad) {
                        handleReplaceImage(slotNumber, file);
                      } else {
                        handleFileSelect(slotNumber, file);
                      }
                    }
                    e.target.value = '';
                  }}
                />

                <div
                  onClick={() => !imageUrl && handleSlotClick(slotNumber)}
                  className={`relative h-40 rounded-xl overflow-hidden border-2 transition-all ${
                    imageUrl
                      ? 'border-transparent'
                      : 'border-dashed border-white/20 hover:border-cyan-500/50 cursor-pointer hover:bg-white/5'
                  }`}
                >
                  {slot.uploading && !slot.previewUrl ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
                    </div>
                  ) : imageUrl ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imageUrl}
                        alt={`Slot ${slotNumber}`}
                        className="w-full h-full object-cover"
                        style={{ objectPosition: slot.objectPosition }}
                        onError={() => {
                          console.error('Image failed to load:', imageUrl);
                          setSlots(prev => ({
                            ...prev,
                            [slotNumber]: { ...prev[slotNumber], imageError: true }
                          }));
                        }}
                        onLoad={() => {
                          setSlots(prev => ({
                            ...prev,
                            [slotNumber]: { ...prev[slotNumber], imageError: false }
                          }));
                        }}
                      />
                      {slot.uploading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
                        </div>
                      )}
                      {slot.imageError && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-500/20 text-red-400">
                          <AlertCircle className="w-8 h-8 mb-2" />
                          <span className="text-sm">Failed to load</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              fileInputRefs.current[slotNumber]?.click();
                            }}
                            className="mt-2 px-3 py-1 bg-red-500 text-white text-xs rounded"
                          >
                            Upload New
                          </button>
                        </div>
                      )}
                      {!slot.uploading && !slot.imageError && (
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/50 transition-colors group">
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                fileInputRefs.current[slotNumber]?.click();
                              }}
                              className="flex items-center gap-2 px-3 py-2 bg-white/20 rounded-lg text-white text-sm hover:bg-white/30"
                            >
                              <Upload className="w-4 h-4" />
                              Replace
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                      <Upload className="w-8 h-8 mb-2" />
                      <span className="text-sm">Click to upload</span>
                    </div>
                  )}
                </div>

                {/* Position Controls - Only show when image exists */}
                {imageUrl && !slot.imageError && (
                  <div className="flex items-center gap-1 justify-center">
                    <span className="text-xs text-gray-500 mr-2">Position:</span>
                    {['left', 'center', 'right'].map((pos) => (
                      <button
                        key={pos}
                        onClick={() => setSlots(prev => ({
                          ...prev,
                          [slotNumber]: { ...prev[slotNumber], objectPosition: pos }
                        }))}
                        className={`px-2 py-1 text-xs rounded transition-colors ${
                          slot.objectPosition === pos
                            ? 'bg-cyan-500 text-white'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        {pos.charAt(0).toUpperCase() + pos.slice(1)}
                      </button>
                    ))}
                  </div>
                )}

                {/* Link Input */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <LinkIcon className="w-4 h-4 text-gray-500" />
                    <input
                      type="url"
                      placeholder="https://example.com"
                      value={slot.tempLink}
                      onChange={(e) => setSlots(prev => ({
                        ...prev,
                        [slotNumber]: { ...prev[slotNumber], tempLink: e.target.value }
                      }))}
                      disabled={!slot.ad}
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    {slot.ad && slot.tempLink && (
                      <a
                        href={slot.tempLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-cyan-400 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  {/* End Date */}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <input
                      type="date"
                      value={slot.tempEndDate}
                      onChange={(e) => setSlots(prev => ({
                        ...prev,
                        [slotNumber]: { ...prev[slotNumber], tempEndDate: e.target.value }
                      }))}
                      disabled={!slot.ad}
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  {/* Save Button */}
                  {slot.ad && (
                    <button
                      onClick={() => handleUpdateSlot(slotNumber)}
                      disabled={slot.saving}
                      className="w-full px-3 py-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-500/50 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      {slot.saving ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        'Save Changes'
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
