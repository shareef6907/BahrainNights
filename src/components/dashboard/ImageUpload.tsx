'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string | undefined) => void;
  label?: string;
  aspectRatio?: '16:9' | '1:1' | '4:3';
  maxSize?: number; // in MB
  required?: boolean;
  error?: string;
}

export default function ImageUpload({
  value,
  onChange,
  label = 'Upload Image',
  aspectRatio = '16:9',
  maxSize = 5,
  required = false,
  error,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(value);
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
        alert('Please upload an image file');
        return;
      }

      // Validate file size
      if (file.size > maxSize * 1024 * 1024) {
        alert(`File size must be less than ${maxSize}MB`);
        return;
      }

      setIsUploading(true);

      try {
        // Create local preview
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setPreviewUrl(result);
          onChange(result);
        };
        reader.readAsDataURL(file);

        // TODO: Implement actual S3 upload
        // const formData = new FormData();
        // formData.append('file', file);
        // const response = await fetch('/api/upload/image', {
        //   method: 'POST',
        //   body: formData,
        // });
        // const data = await response.json();
        // onChange(data.url);
      } catch (err) {
        console.error('Upload error:', err);
        alert('Failed to upload image');
      } finally {
        setIsUploading(false);
      }
    },
    [maxSize, onChange]
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
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [onChange]);

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
          error
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
              <button
                onClick={handleRemove}
                className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <button
                onClick={() => inputRef.current?.click()}
                className="absolute bottom-3 right-3 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-white text-sm font-medium transition-colors"
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
              onClick={() => inputRef.current?.click()}
              className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer p-6 text-center"
            >
              {isUploading ? (
                <Loader2 className="w-10 h-10 text-yellow-400 animate-spin" />
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
        />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
