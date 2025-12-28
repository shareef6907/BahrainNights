'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

type EntityType = 'venue' | 'event' | 'offer' | 'sponsor' | 'ad';
type ImageType = 'logo' | 'cover' | 'gallery' | 'banner';

interface ImageUploaderProps {
  entityType: EntityType;
  imageType: ImageType;
  venueSlug?: string;
  eventSlug?: string;
  offerSlug?: string;
  sponsorSlug?: string;
  adSlug?: string;
  currentImage?: string;
  onUpload: (url: string) => void;
  onRemove?: () => void;
  label?: string;
  helpText?: string;
  aspectRatio?: 'square' | 'video' | 'banner' | 'auto';
  className?: string;
}

type UploadStatus = 'idle' | 'uploading' | 'processing' | 'success' | 'error';

export function ImageUploader({
  entityType,
  imageType,
  venueSlug,
  eventSlug,
  offerSlug,
  sponsorSlug,
  adSlug,
  currentImage,
  onUpload,
  onRemove,
  label,
  helpText,
  aspectRatio = 'auto',
  className = '',
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    banner: 'aspect-[3/1]',
    auto: 'min-h-[200px]',
  };

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

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
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      return 'Invalid file type. Allowed: JPG, PNG, WebP, GIF';
    }

    if (file.size > maxSize) {
      return 'File too large. Maximum 10MB allowed';
    }

    return null;
  };

  const uploadFile = async (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      setStatus('error');
      return;
    }

    setStatus('uploading');
    setError(null);
    setProgress(0);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('entityType', entityType);
      formData.append('imageType', imageType);
      if (venueSlug) formData.append('venueSlug', venueSlug);
      if (eventSlug) formData.append('eventSlug', eventSlug);
      if (offerSlug) formData.append('offerSlug', offerSlug);
      if (sponsorSlug) formData.append('sponsorSlug', sponsorSlug);
      if (adSlug) formData.append('adSlug', adSlug);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Upload failed');
      }

      setProgress(95);
      setStatus('processing');

      const data = await response.json();

      setProgress(100);
      setStatus('success');
      setPreviewUrl(data.url);
      onUpload(data.url);

      // Reset to idle after showing success
      setTimeout(() => {
        setStatus('idle');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      setStatus('error');
      setPreviewUrl(currentImage || null);
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        uploadFile(files[0]);
      }
    },
    [entityType, imageType, venueSlug, eventSlug, offerSlug, sponsorSlug, adSlug]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      uploadFile(files[0]);
    }
  };

  const handleRemove = async () => {
    if (previewUrl && onRemove) {
      try {
        // Delete from S3
        await fetch(`/api/upload?url=${encodeURIComponent(previewUrl)}`, {
          method: 'DELETE',
        });
      } catch (err) {
        console.error('Failed to delete image:', err);
      }

      setPreviewUrl(null);
      onRemove();
    }
  };

  const handleClick = () => {
    if (status === 'idle' || status === 'success' || status === 'error') {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-white/90">{label}</label>
      )}

      <div
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`
          relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300
          ${aspectRatioClasses[aspectRatio]}
          ${
            isDragging
              ? 'border-2 border-solid border-teal-400 bg-teal-500/10'
              : status === 'error'
              ? 'border-2 border-dashed border-red-400/50 bg-red-500/5'
              : previewUrl
              ? 'border-2 border-solid border-white/20 bg-white/5'
              : 'border-2 border-dashed border-white/20 hover:border-teal-400/50 bg-white/5 hover:bg-teal-500/5'
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleFileSelect}
          className="hidden"
        />

        <AnimatePresence mode="wait">
          {/* Preview Image */}
          {previewUrl && status !== 'uploading' && status !== 'processing' && (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Remove Button */}
              {onRemove && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove();
                  }}
                  className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-500 rounded-full transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
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
              )}

              {/* Change Image Text */}
              <div className="absolute bottom-2 left-2 text-xs text-white/70">
                Click to change
              </div>
            </motion.div>
          )}

          {/* Upload Progress */}
          {(status === 'uploading' || status === 'processing') && (
            <motion.div
              key="progress"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-4"
            >
              {previewUrl && (
                <div className="absolute inset-0 opacity-30">
                  <Image
                    src={previewUrl}
                    alt="Uploading"
                    fill
                    className="object-cover blur-sm"
                    unoptimized
                  />
                </div>
              )}

              <div className="relative z-10 flex flex-col items-center gap-3">
                {status === 'uploading' && (
                  <>
                    <div className="w-12 h-12 rounded-full border-4 border-white/20 border-t-teal-400 animate-spin" />
                    <p className="text-sm text-white/80">Uploading... {progress}%</p>
                  </>
                )}
                {status === 'processing' && (
                  <>
                    <svg
                      className="w-12 h-12 text-teal-400 animate-pulse"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-sm text-white/80">Optimizing & watermarking...</p>
                  </>
                )}

                {/* Progress Bar */}
                <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-teal-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Success State */}
          {status === 'success' && !previewUrl && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-2">
                <svg
                  className="w-8 h-8 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-sm text-green-400">Upload complete!</p>
            </motion.div>
          )}

          {/* Empty State */}
          {!previewUrl && status !== 'uploading' && status !== 'processing' && status !== 'success' && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-4"
            >
              <svg
                className={`w-12 h-12 mb-3 ${
                  status === 'error' ? 'text-red-400' : 'text-white/40'
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="text-sm text-white/60 text-center">
                {isDragging ? 'Drop image here' : 'Drag & drop or click to upload'}
              </p>
              <p className="text-xs text-white/40 mt-1">JPG, PNG, WebP up to 10MB</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Error Message */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-400"
        >
          {error}
        </motion.p>
      )}

      {/* Help Text */}
      {helpText && !error && (
        <p className="text-xs text-white/50">{helpText}</p>
      )}
    </div>
  );
}
