'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { LucideIcon } from 'lucide-react';

export interface ExploreCategory {
  id: string;
  name: string;
  tagline: string;
  icon: LucideIcon;
  emoji: string;
  href: string;
  image: string;
  itemCount: number;
  color: string;
  gradient: string;
}

interface ExploreCategoryCardProps {
  category: ExploreCategory;
  index?: number;
}

export default function ExploreCategoryCard({
  category,
  index = 0,
}: ExploreCategoryCardProps) {
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={category.href} className="block group">
        <div className="relative h-64 md:h-72 rounded-2xl overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Gradient Overlay */}
          <div
            className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-80"
            style={{
              background: `linear-gradient(to top, ${category.color}E6 0%, ${category.color}99 30%, transparent 70%)`,
            }}
          />

          {/* Content */}
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            {/* Icon and Emoji */}
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm"
                style={{ backgroundColor: `${category.color}40` }}
              >
                <span className="text-2xl">{category.emoji}</span>
              </div>
              <div
                className="px-3 py-1 rounded-full text-xs font-medium text-white/90 backdrop-blur-sm"
                style={{ backgroundColor: `${category.color}60` }}
              >
                {category.itemCount} places
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-yellow-300 transition-colors">
              {category.name}
            </h3>

            {/* Tagline */}
            <p className="text-white/80 text-sm md:text-base">
              {category.tagline}
            </p>

            {/* Arrow indicator */}
            <div className="mt-3 flex items-center gap-2 text-white/70 group-hover:text-yellow-300 transition-colors">
              <span className="text-sm font-medium">Explore</span>
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </div>
          </div>

          {/* Hover Border Effect */}
          <div
            className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/30 transition-colors pointer-events-none"
          />
        </div>
      </Link>
    </motion.div>
  );
}
