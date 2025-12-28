'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import Image from 'next/image';

type EntityType = 'venue' | 'event';

interface GalleryImage {
  url: string;
  isUploading?: boolean;
  progress?: number;
  error?: string;
}

interface GalleryUploaderProps {
  entityType: EntityType;
  venueSlug: string;
  eventSlug?: string;
  currentImages: string[];
  onUpdate: (urls: string[]) => void;
  maxImages?: number;
  label?: string;
  className?: string;
}

export function GalleryUploader({
  entityType,
  venueSlug,
  eventSlug,
  currentImages,
  onUpdate,
  maxImages = 12,
  label = 'Gallery Images',
  className = '',
}: GalleryUploaderProps) {
  const [images, setImages] = useState<GalleryImage[]>(
    currentImages.map((url) => ({ url }))
  );
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const remainingSlots = maxImages - images.filter((img) => !img.error || img.error === undefined).length;
  const canAddMore = remainingSlots > 0;

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (canAddMore) setIsDragging(true);
  }, [canAddMore]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const validateFile = (file: File): string | null => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    const maxSize = 10 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      return 'Invalid file type';
    }
    if (file.size > maxSize) {
      return 'File too large (max 10MB)';
    }
    return null;
  };

  const uploadFile = async (file: File, tempId: string) => {
    const validationError = validateFile(file);
    if (validationError) {
      setImages((prev) =>
        prev.map((img) =>
          img.url === tempId ? { ...img, error: validationError, isUploading: false } : img
        )
      );
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('entityType', entityType);
      formData.append('imageType', 'gallery');
      formData.append('venueSlug', venueSlug);
      if (eventSlug) formData.append('eventSlug', eventSlug);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Upload failed');
      }

      const data = await response.json();

      setImages((prev) => {
        const updated = prev.map((img) =>
          img.url === tempId ? { url: data.url, isUploading: false } : img
        );
        // Update parent with successful URLs
        onUpdate(updated.filter((img) => !img.isUploading && !('error' in img && img.error)).map((img) => img.url));
        return updated;
      });
    } catch (err) {
      setImages((prev) =>
        prev.map((img) =>
          img.url === tempId
            ? { ...img, error: err instanceof Error ? err.message : 'Upload failed', isUploading: false }
            : img
        )
      );
    }
  };

  const handleFiles = async (files: FileList) => {
    const fileArray = Array.from(files).slice(0, remainingSlots);

    if (fileArray.length === 0) return;

    // Add placeholder items for each file
    const newImages: GalleryImage[] = fileArray.map((file, index) => ({
      url: `temp-${Date.now()}-${index}`,
      isUploading: true,
      progress: 0,
    }));

    setImages((prev) => [...prev, ...newImages]);

    // Upload each file
    for (let i = 0; i < fileArray.length; i++) {
      await uploadFile(fileArray[i], newImages[i].url);
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (e.dataTransfer.files.length > 0 && canAddMore) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [canAddMore, remainingSlots]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
    // Reset input so same file can be selected again
    e.target.value = '';
  };

  const handleRemove = async (index: number) => {
    const imageToRemove = images[index];

    // Try to delete from S3 if it's a real URL
    if (imageToRemove.url && !imageToRemove.url.startsWith('temp-')) {
      try {
        await fetch(`/api/upload?url=${encodeURIComponent(imageToRemove.url)}`, {
          method: 'DELETE',
        });
      } catch (err) {
        console.error('Failed to delete image:', err);
      }
    }

    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    onUpdate(updatedImages.filter((img) => !img.isUploading && !img.error).map((img) => img.url) as string[]);
  };

  const handleReorder = (newOrder: GalleryImage[]) => {
    setImages(newOrder);
    onUpdate(newOrder.filter((img) => !img.isUploading && !img.error).map((img) => img.url) as string[]);
  };

  const getCounterColor = () => {
    const count = images.filter((img) => !img.error || img.error === undefined).length;
    if (count >= maxImages) return 'text-red-400';
    if (count >= maxImages - 2) return 'text-amber-400';
    return 'text-teal-400';
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-white/90">{label}</label>
        <span className={`text-sm font-medium ${getCounterColor()}`}>
          📷 {images.filter((img) => !img.error || img.error === undefined).length}/{maxImages} photos
        </span>
      </div>

      {/* Gallery Grid */}
      <div className="space-y-3">
        {images.length > 0 && (
          <Reorder.Group
            axis="x"
            values={images}
            onReorder={handleReorder}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
          >
            <AnimatePresence>
              {images.map((image, index) => (
                <Reorder.Item
                  key={image.url}
                  value={image}
                  className="relative aspect-square rounded-lg overflow-hidden bg-white/5 border border-white/10 cursor-grab active:cursor-grabbing"
                >
                  {/* Image */}
                  {!image.isUploading && !image.error && !image.url.startsWith('temp-') && (
                    <Image
                      src={image.url}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  )}

                  {/* Uploading State */}
                  {image.isUploading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-teal-400 animate-spin mb-2" />
                      <span className="text-xs text-white/60">Uploading...</span>
                    </div>
                  )}

                  {/* Error State */}
                  {image.error && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-2 bg-red-500/10">
                      <svg
                        className="w-6 h-6 text-red-400 mb-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-xs text-red-400 text-center">{image.error}</span>
                    </div>
                  )}

                  {/* Order Badge */}
                  {!image.isUploading && !image.error && (
                    <div className="absolute top-1 left-1 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center">
                      <span className="text-[10px] font-medium text-white">{index + 1}</span>
                    </div>
                  )}

                  {/* Remove Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(index);
                    }}
                    className="absolute top-1 right-1 p-1 bg-red-500/80 hover:bg-red-500 rounded-full transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </Reorder.Item>
              ))}
            </AnimatePresence>
          </Reorder.Group>
        )}

        {/* Drop Zone / Add More Button */}
        {canAddMore && (
          <motion.div
            onClick={() => fileInputRef.current?.click()}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`
              flex flex-col items-center justify-center p-6 rounded-xl cursor-pointer transition-all
              ${
                isDragging
                  ? 'border-2 border-solid border-teal-400 bg-teal-500/10'
                  : 'border-2 border-dashed border-white/20 hover:border-teal-400/50 bg-white/5 hover:bg-teal-500/5'
              }
            `}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />

            <svg
              className="w-8 h-8 text-white/40 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <p className="text-sm text-white/60">
              {images.length === 0 ? 'Add gallery images' : 'Add more images'}
            </p>
            <p className="text-xs text-white/40 mt-1">
              {remainingSlots} slot{remainingSlots !== 1 ? 's' : ''} remaining
            </p>
          </motion.div>
        )}

        {/* Max Reached Message */}
        {!canAddMore && (
          <p className="text-sm text-amber-400 text-center py-2">
            Maximum {maxImages} images reached. Remove some to add more.
          </p>
        )}
      </div>

      {/* Help Text */}
      <p className="text-xs text-white/50">
        Drag images to reorder. First image will be shown as the main gallery preview.
      </p>
    </div>
  );
}
