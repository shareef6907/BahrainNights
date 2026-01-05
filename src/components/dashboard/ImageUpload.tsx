'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Image as ImageIcon, Loader2, CheckCircle } from 'lucide-react';
import { compressImage } from '@/lib/image-compress';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string | undefined) => void;
  label?: string;
  aspectRatio?: '16:9' | '1:1' | '4:3';
  maxSize?: number; // in MB
  required?: boolean;
  error?: string;
  entityType?: 'venue' | 'event' | 'offer' | 'sponsor' | 'ad';
  imageType?: 'logo' | 'cover' | 'gallery' | 'banner';
}

export default function ImageUpload({
  value,
  onChange,
  label = 'Upload Image',
  aspectRatio = '16:9',
  maxSize = 10,
  required = false,
  error,
  entityType = 'event',
  imageType = 'cover',
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'compressing' | 'uploading' | 'success' | 'error'>('idle');
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(value);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const aspectRatioClass = {
    '16:9': 'aspect-video',
    '1:1': 'aspect-square',
    '4:3': 'aspect-[4/3]',
  }[aspectRatio];

  const handleFile = useCallback(
    async (file: File) => {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setUploadError('Please upload an image file');
        return;
      }

      // Validate file size
      if (file.size > maxSize * 1024 * 1024) {
        setUploadError(`File size must be less than ${maxSize}MB`);
        return;
      }

      setIsUploading(true);
      setUploadError(null);
      setUploadStatus('compressing');

      try {
        // Create local preview immediately for better UX
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviewUrl(e.target?.result as string);
        };
        reader.readAsDataURL(file);

        // Compress image to target 600KB-1MB
        console.log(`[ImageUpload] Original size: ${(file.size / 1024).toFixed(0)}KB`);
        let fileToUpload: File | Blob = file;

        try {
          fileToUpload = await compressImage(file);
          console.log(`[ImageUpload] Compressed size: ${(fileToUpload.size / 1024).toFixed(0)}KB`);
        } catch (compressError) {
          console.warn('[ImageUpload] Compression failed, using original:', compressError);
          // Continue with original file if compression fails
        }

        setUploadStatus('uploading');

        // Upload to S3 via API
        const formData = new FormData();
        formData.append('file', fileToUpload);
        formData.append('entityType', entityType);
        formData.append('imageType', imageType);
        formData.append('processLocally', 'true');

        const response = await fetch('/api/upload/image', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to upload image');
        }

        const data = await response.json();
        console.log(`[ImageUpload] Upload successful: ${data.url}`);

        // Update preview with the actual S3 URL
        setPreviewUrl(data.url);
        onChange(data.url);
        setUploadStatus('success');

        // Reset status after showing success
        setTimeout(() => {
          setUploadStatus('idle');
        }, 2000);
      } catch (err) {
        console.error('[ImageUpload] Upload error:', err);
        setUploadError(err instanceof Error ? err.message : 'Failed to upload image');
        setUploadStatus('error');
        // Clear the preview on error
        setPreviewUrl(value);
      } finally {
        setIsUploading(false);
      }
    },
    [maxSize, onChange, entityType, imageType, value]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  const handleRemove = useCallback(() => {
    setPreviewUrl(undefined);
    onChange(undefined);
    setUploadError(null);
    setUploadStatus('idle');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [onChange]);

  const getStatusMessage = () => {
    switch (uploadStatus) {
      case 'compressing':
        return 'Compressing image...';
      case 'uploading':
        return 'Uploading to cloud...';
      case 'success':
        return 'Upload complete!';
      case 'error':
        return uploadError || 'Upload failed';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}

      <div
        className={`relative ${aspectRatioClass} rounded-xl border-2 border-dashed transition-all duration-200 overflow-hidden ${
          error || uploadError
            ? 'border-red-400/50 bg-red-500/5'
            : isDragging
            ? 'border-yellow-400 bg-yellow-400/10'
            : previewUrl
            ? 'border-transparent'
            : 'border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <AnimatePresence mode="wait">
          {previewUrl ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Upload status overlay */}
              {isUploading && (
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
                  <Loader2 className="w-10 h-10 text-yellow-400 animate-spin mb-2" />
                  <p className="text-white text-sm">{getStatusMessage()}</p>
                </div>
              )}

              {/* Success indicator */}
              {uploadStatus === 'success' && !isUploading && (
                <div className="absolute top-3 left-3 flex items-center gap-2 bg-green-500/80 px-3 py-1.5 rounded-full">
                  <CheckCircle className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-medium">Uploaded</span>
                </div>
              )}

              <button
                type="button"
                onClick={handleRemove}
                disabled={isUploading}
                className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors disabled:opacity-50"
              >
                <X className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={isUploading}
                className="absolute bottom-3 right-3 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-white text-sm font-medium transition-colors disabled:opacity-50"
              >
                Change Image
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isUploading && inputRef.current?.click()}
              className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer p-6 text-center"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-10 h-10 text-yellow-400 animate-spin mb-2" />
                  <p className="text-gray-300 text-sm">{getStatusMessage()}</p>
                </>
              ) : (
                <>
                  <div className="p-4 rounded-full bg-white/10 mb-4">
                    {isDragging ? (
                      <Upload className="w-8 h-8 text-yellow-400" />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <p className="text-gray-300 font-medium">
                    {isDragging ? 'Drop your image here' : 'Click or drag to upload'}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    PNG, JPG, WebP up to {maxSize}MB
                  </p>
                  {aspectRatio === '16:9' && (
                    <p className="text-xs text-gray-500 mt-2">
                      Recommended: 1920 x 1080px
                    </p>
                  )}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
          disabled={isUploading}
        />
      </div>

      {/* Error message */}
      {(error || uploadError) && (
        <p className="text-sm text-red-400">{error || uploadError}</p>
      )}
    </div>
  );
}
