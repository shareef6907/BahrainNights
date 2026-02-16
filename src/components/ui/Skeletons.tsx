'use client';

import { motion } from 'framer-motion';

// Shimmer animation for skeleton loading
const shimmer = {
  initial: { backgroundPosition: '-200% 0' },
  animate: {
    backgroundPosition: '200% 0',
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: 'linear',
    },
  },
};

// Base skeleton component with shimmer effect
function SkeletonBase({ className }: { className?: string }) {
  return (
    <motion.div
      variants={shimmer}
      initial="initial"
      animate="animate"
      className={`bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-[length:200%_100%] rounded-lg ${className}`}
    />
  );
}

// Event Card Skeleton
export function EventCardSkeleton({ view = 'grid' }: { view?: 'grid' | 'list' }) {
  if (view === 'list') {
    return (
      <div className="flex gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden p-3">
        <SkeletonBase className="w-48 h-32 flex-shrink-0 rounded-xl" />
        <div className="flex flex-col justify-center gap-3 flex-1 py-2">
          <SkeletonBase className="h-5 w-3/4" />
          <SkeletonBase className="h-4 w-1/2" />
          <div className="flex gap-4 mt-2">
            <SkeletonBase className="h-4 w-24" />
            <SkeletonBase className="h-4 w-20" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
      <SkeletonBase className="aspect-[16/10] w-full rounded-none" />
      <div className="p-4 space-y-3">
        <SkeletonBase className="h-5 w-2/3" />
        <div className="flex items-center gap-2">
          <SkeletonBase className="h-4 w-4 rounded-full" />
          <SkeletonBase className="h-4 w-1/2" />
        </div>
        <div className="flex items-center gap-2">
          <SkeletonBase className="h-4 w-4 rounded-full" />
          <SkeletonBase className="h-4 w-1/3" />
        </div>
        <div className="flex justify-between items-center pt-2">
          <SkeletonBase className="h-5 w-16 rounded-full" />
          <SkeletonBase className="h-8 w-24 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

// Venue/Place Card Skeleton
export function VenueCardSkeleton() {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
      <SkeletonBase className="aspect-[4/3] w-full rounded-none" />
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <SkeletonBase className="h-5 w-1/2" />
          <SkeletonBase className="h-4 w-12" />
        </div>
        <SkeletonBase className="h-4 w-3/4" />
        <div className="flex items-center gap-2">
          <SkeletonBase className="h-6 w-16 rounded-full" />
          <SkeletonBase className="h-6 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}

// Movie Card Skeleton
export function MovieCardSkeleton() {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
      <SkeletonBase className="aspect-[2/3] w-full rounded-none" />
      <div className="p-3 space-y-2">
        <SkeletonBase className="h-4 w-3/4" />
        <div className="flex items-center gap-2">
          <SkeletonBase className="h-4 w-8" />
          <SkeletonBase className="h-4 w-12" />
        </div>
      </div>
    </div>
  );
}

// Image Placeholder Skeleton
export function ImageSkeleton({ aspectRatio = '16/9' }: { aspectRatio?: string }) {
  return (
    <SkeletonBase
      className={`w-full rounded-xl`}
      style={{ aspectRatio }}
    />
  );
}

// Hero Section Skeleton
export function HeroSkeleton() {
  return (
    <div className="relative w-full h-[60vh] min-h-[400px] max-h-[600px]">
      <SkeletonBase className="absolute inset-0 rounded-none" />
      <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
        <SkeletonBase className="h-8 w-1/3" />
        <SkeletonBase className="h-12 w-2/3" />
        <SkeletonBase className="h-6 w-1/2" />
        <div className="flex gap-4 pt-4">
          <SkeletonBase className="h-12 w-32 rounded-full" />
          <SkeletonBase className="h-12 w-32 rounded-full" />
        </div>
      </div>
    </div>
  );
}

// Grid of Event Card Skeletons
export function EventGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <EventCardSkeleton />
        </motion.div>
      ))}
    </div>
  );
}

// List of Event Card Skeletons
export function EventListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <EventCardSkeleton view="list" />
        </motion.div>
      ))}
    </div>
  );
}

// Venue Grid Skeleton
export function VenueGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <VenueCardSkeleton />
        </motion.div>
      ))}
    </div>
  );
}

// Text Content Skeleton (for paragraphs)
export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonBase
          key={i}
          className={`h-4 ${i === lines - 1 ? 'w-2/3' : 'w-full'}`}
        />
      ))}
    </div>
  );
}

// Profile/Avatar Skeleton
export function AvatarSkeleton({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return <SkeletonBase className={`${sizeClasses[size]} rounded-full`} />;
}

// Search Result Skeleton
export function SearchResultSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
      <SkeletonBase className="w-16 h-16 rounded-lg flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <SkeletonBase className="h-5 w-3/4" />
        <SkeletonBase className="h-4 w-1/2" />
      </div>
    </div>
  );
}
