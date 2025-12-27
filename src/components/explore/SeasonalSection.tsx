'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, MapPin } from 'lucide-react';

export interface SeasonalItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  image: string;
  area: string;
  description: string;
  badge?: string;
}

interface SeasonalSectionProps {
  title: string;
  subtitle: string;
  items: SeasonalItem[];
  accentColor?: string;
}

export default function SeasonalSection({
  title,
  subtitle,
  items,
  accentColor = '#F97316',
}: SeasonalSectionProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Background Decoration */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${accentColor}40 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
            style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
          >
            <Sparkles className="w-4 h-4" />
            <span>Limited Time</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {title}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/explore/${item.categorySlug}/${item.slug}`}
                className="block group"
              >
                <div className="relative h-56 rounded-2xl overflow-hidden">
                  {/* Image */}
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to top, ${accentColor}CC 0%, ${accentColor}40 40%, transparent 100%)`,
                    }}
                  />

                  {/* Badge */}
                  {item.badge && (
                    <div
                      className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: accentColor }}
                    >
                      {item.badge}
                    </div>
                  )}

                  {/* Category */}
                  <div className="absolute top-3 right-3 px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full text-xs text-white">
                    {item.category}
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-lg group-hover:text-yellow-300 transition-colors mb-1">
                      {item.name}
                    </h3>
                    <p className="text-white/80 text-sm line-clamp-2 mb-2">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-1.5 text-white/70 text-sm">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{item.area}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
