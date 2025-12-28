'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

type EntityType = 'venue' | 'sponsor';

interface LogoUploaderProps {
  entityType: EntityType;
  venueSlug?: string;
  sponsorSlug?: string;
  currentLogo?: string;
  onUpload: (url: string) => void;
  onRemove?: () => void;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

type UploadStatus = 'idle' | 'uploading' | 'processing' | 'success' | 'error';

export function LogoUploader({
  entityType,
  venueSlug,
  sponsorSlug,
  currentLogo,
  onUpload,
  onRemove,
  size = 'md',
  label = 'Logo',
  className = '',
}: LogoUploaderProps) {
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentLogo || null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-28 h-28',
    lg: 'w-36 h-36',
  };

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
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
    const maxSize = 5 * 1024 * 1024; // 5MB for logos

    if (!allowedTypes.includes(file.type)) {
      return 'Invalid file type. Use JPG, PNG, or WebP';
    }

    if (file.size > maxSize) {
      return 'File too large. Maximum 5MB';
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

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('entityType', entityType);
      formData.append('imageType', 'logo');
      if (venueSlug) formData.append('venueSlug', venueSlug);
      if (sponsorSlug) formData.append('sponsorSlug', sponsorSlug);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Upload failed');
      }

      setStatus('processing');

      const data = await response.json();

      setStatus('success');
      setPreviewUrl(data.url);
      onUpload(data.url);

      // Reset to idle after showing success
      setTimeout(() => {
        setStatus('idle');
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      setStatus('error');
      setPreviewUrl(currentLogo || null);
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
    [entityType, venueSlug, sponsorSlug]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      uploadFile(files[0]);
    }
    e.target.value = '';
  };

  const handleRemove = async () => {
    if (previewUrl && onRemove) {
      try {
        await fetch(`/api/upload?url=${encodeURIComponent(previewUrl)}`, {
          method: 'DELETE',
        });
      } catch (err) {
        console.error('Failed to delete logo:', err);
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

      <div className="flex items-center gap-4">
        {/* Circular Logo Container */}
        <div
          onClick={handleClick}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`
            relative rounded-full cursor-pointer overflow-hidden transition-all duration-300
            ${sizeClasses[size]}
            ${
              isDragging
                ? 'ring-4 ring-teal-400 ring-offset-2 ring-offset-[#0a0f1a]'
                : status === 'error'
                ? 'ring-2 ring-red-400/50'
                : 'ring-2 ring-white/20 hover:ring-teal-400/50'
            }
            ${previewUrl ? 'bg-white/10' : 'bg-white/5'}
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
            {/* Preview */}
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
                  alt="Logo"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </motion.div>
            )}

            {/* Uploading/Processing */}
            {(status === 'uploading' || status === 'processing') && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-black/50"
              >
                {previewUrl && (
                  <div className="absolute inset-0 opacity-50">
                    <Image
                      src={previewUrl}
                      alt="Uploading"
                      fill
                      className="object-cover blur-sm"
                      unoptimized
                    />
                  </div>
                )}
                <div className="relative z-10 w-8 h-8 rounded-full border-2 border-white/20 border-t-teal-400 animate-spin" />
              </motion.div>
            )}

            {/* Empty State */}
            {!previewUrl && status !== 'uploading' && status !== 'processing' && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <svg
                  className={`${iconSizes[size]} ${
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
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </motion.div>
            )}

            {/* Success Overlay */}
            {status === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-green-500/20"
              >
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
              </motion.div>
            )}
          </AnimatePresence>

          {/* Remove Button */}
          {previewUrl && onRemove && status === 'idle' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className="absolute -top-1 -right-1 p-1 bg-red-500 hover:bg-red-600 rounded-full transition-colors shadow-lg"
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
          )}
        </div>

        {/* Side Text */}
        <div className="flex-1">
          <p className="text-sm text-white/60">
            {previewUrl ? 'Click to change' : 'Click or drag to upload'}
          </p>
          <p className="text-xs text-white/40 mt-0.5">PNG, JPG, or WebP up to 5MB</p>
          {status === 'uploading' && (
            <p className="text-xs text-teal-400 mt-1">Uploading...</p>
          )}
          {status === 'processing' && (
            <p className="text-xs text-teal-400 mt-1">Optimizing...</p>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-400"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
