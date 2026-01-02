'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Images,
  Upload,
  X,
  Loader2,
  CheckCircle,
  AlertCircle,
  Trash2,
  Image as ImageIcon,
} from 'lucide-react';

const MAX_IMAGES = 20;

interface UploadProgress {
  fileName: string;
  previewUrl: string;
  progress: number; // 0-100
  status: 'uploading' | 'success' | 'error';
}

export default function VenueImagesPage() {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadImages();
  }, []);

  async function loadImages() {
    try {
      const response = await fetch('/api/venue-portal/profile');
      if (response.ok) {
        const data = await response.json();
        setImages(data.venue.gallery_images || []);
      }
    } catch (error) {
      console.error('Failed to load images:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const remainingSlots = MAX_IMAGES - images.length;
    if (remainingSlots === 0) {
      setMessage({ type: 'error', text: `Maximum ${MAX_IMAGES} images allowed` });
      return;
    }

    const filesToUpload = Array.from(files).slice(0, remainingSlots);
    setIsUploading(true);
    setMessage(null);

    // Create preview URLs and initial progress state
    const initialProgress: UploadProgress[] = filesToUpload.map(file => ({
      fileName: file.name,
      previewUrl: URL.createObjectURL(file),
      progress: 0,
      status: 'uploading' as const,
    }));
    setUploadProgress(initialProgress);

    try {
      const uploadedUrls: string[] = [];

      for (let i = 0; i < filesToUpload.length; i++) {
        const file = filesToUpload[i];

        // Validate file type
        if (!file.type.startsWith('image/')) {
          setUploadProgress(prev => prev.map((p, idx) =>
            idx === i ? { ...p, status: 'error', progress: 100 } : p
          ));
          continue;
        }

        // Validate file size (max 25MB)
        if (file.size > 25 * 1024 * 1024) {
          setMessage({ type: 'error', text: `${file.name} is too large (max 25MB)` });
          setUploadProgress(prev => prev.map((p, idx) =>
            idx === i ? { ...p, status: 'error', progress: 100 } : p
          ));
          continue;
        }

        // Update progress to show uploading
        setUploadProgress(prev => prev.map((p, idx) =>
          idx === i ? { ...p, progress: 30 } : p
        ));

        const formData = new FormData();
        formData.append('file', file);
        formData.append('imageType', 'gallery');

        // Update progress to show processing
        setUploadProgress(prev => prev.map((p, idx) =>
          idx === i ? { ...p, progress: 60 } : p
        ));

        const uploadResponse = await fetch('/api/venue-portal/upload', {
          method: 'POST',
          body: formData,
        });

        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json();
          uploadedUrls.push(uploadData.url);
          setUploadProgress(prev => prev.map((p, idx) =>
            idx === i ? { ...p, status: 'success', progress: 100 } : p
          ));
        } else {
          setUploadProgress(prev => prev.map((p, idx) =>
            idx === i ? { ...p, status: 'error', progress: 100 } : p
          ));
        }
      }

      if (uploadedUrls.length > 0) {
        // Update venue profile with new images
        const newImages = [...images, ...uploadedUrls];
        const updateResponse = await fetch('/api/venue-portal/profile', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ gallery_images: newImages }),
        });

        if (updateResponse.ok) {
          setImages(newImages);
          setMessage({
            type: 'success',
            text: `${uploadedUrls.length} image${uploadedUrls.length > 1 ? 's' : ''} uploaded successfully!`
          });
        }
      }
    } catch (error) {
      console.error('Upload error:', error);
      setMessage({ type: 'error', text: 'Failed to upload images' });
    } finally {
      setIsUploading(false);
      // Clear upload progress after a delay
      setTimeout(() => {
        setUploadProgress([]);
      }, 2000);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDeleteImage = async (index: number) => {
    try {
      const newImages = images.filter((_, i) => i !== index);

      const response = await fetch('/api/venue-portal/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gallery_images: newImages }),
      });

      if (response.ok) {
        setImages(newImages);
        setMessage({ type: 'success', text: 'Image removed successfully' });
      }
    } catch (error) {
      console.error('Delete error:', error);
      setMessage({ type: 'error', text: 'Failed to remove image' });
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
          <h1 className="text-2xl lg:text-3xl font-bold text-white">Gallery Images</h1>
          <p className="text-gray-400 mt-1">
            Upload up to {MAX_IMAGES} images to showcase your venue.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl">
          <Images className="w-5 h-5 text-yellow-400" />
          <span className="text-white font-semibold">{images.length}/{MAX_IMAGES}</span>
        </div>
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
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span>{message.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          disabled={isUploading || images.length >= MAX_IMAGES}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading || images.length >= MAX_IMAGES}
          className={`w-full border-2 border-dashed rounded-2xl p-8 transition-all ${
            images.length >= MAX_IMAGES
              ? 'border-gray-700 bg-gray-900/50 cursor-not-allowed'
              : 'border-white/20 hover:border-yellow-400/50 hover:bg-white/5 cursor-pointer'
          }`}
        >
          <div className="flex flex-col items-center gap-3">
            {isUploading ? (
              <>
                <Loader2 className="w-12 h-12 text-yellow-400 animate-spin" />
                <p className="text-white font-medium">Uploading...</p>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-500/20 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-yellow-400" />
                </div>
                <div className="text-center">
                  <p className="text-white font-medium">
                    {images.length >= MAX_IMAGES
                      ? 'Maximum images reached'
                      : 'Click to upload images'}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    PNG, JPG up to 25MB
                  </p>
                </div>
              </>
            )}
          </div>
        </button>
      </motion.div>

      {/* Upload Progress with Low Opacity Previews */}
      <AnimatePresence>
        {uploadProgress.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {uploadProgress.map((item, index) => (
              <motion.div
                key={item.fileName + index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative aspect-square rounded-xl overflow-hidden bg-white/5"
              >
                {/* Low opacity preview image */}
                <img
                  src={item.previewUrl}
                  alt={`Uploading ${item.fileName}`}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    item.status === 'uploading' ? 'opacity-40' : 'opacity-100'
                  }`}
                />

                {/* Progress overlay */}
                {item.status === 'uploading' && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30">
                    <Loader2 className="w-8 h-8 text-yellow-400 animate-spin mb-2" />
                    <div className="w-2/3 h-2 bg-white/20 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-yellow-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${item.progress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <p className="text-white text-xs mt-2">{item.progress}%</p>
                  </div>
                )}

                {/* Success overlay */}
                {item.status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-green-500/20"
                  >
                    <CheckCircle className="w-10 h-10 text-green-400" />
                  </motion.div>
                )}

                {/* Error overlay */}
                {item.status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-red-500/20"
                  >
                    <AlertCircle className="w-10 h-10 text-red-400" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Images Grid */}
      {images.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {images.map((url, index) => (
            <motion.div
              key={url}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative group aspect-square rounded-xl overflow-hidden bg-white/5"
            >
              <img
                src={url}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => handleDeleteImage(index)}
                  className="p-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="w-5 h-5 text-white" />
                </button>
              </div>
              <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/70 rounded text-xs text-white">
                {index + 1}
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center"
        >
          <ImageIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No images uploaded yet</p>
          <p className="text-gray-500 text-sm mt-1">
            Upload images to showcase your venue to visitors
          </p>
        </motion.div>
      )}

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-yellow-400/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-6"
      >
        <h3 className="text-white font-semibold mb-3">Tips for Great Gallery Images</h3>
        <ul className="text-gray-400 text-sm space-y-2">
          <li>• Use high-quality, well-lit photos</li>
          <li>• Show your venue's ambiance and unique features</li>
          <li>• Include images of your food/drinks if applicable</li>
          <li>• Add photos of special events or experiences</li>
          <li>• The first image will be featured prominently</li>
        </ul>
      </motion.div>
    </div>
  );
}
