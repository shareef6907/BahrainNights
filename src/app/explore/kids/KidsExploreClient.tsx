'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';
import ExploreGrid, { ExploreItem } from '@/components/explore/ExploreGrid';
import ExploreFilters, { FilterConfig } from '@/components/explore/ExploreFilters';

interface KidsExploreClientProps {
  initialKids: ExploreItem[];
}

// Filter configurations
const filterConfigs: FilterConfig[] = [
  {
    id: 'type',
    label: 'Type',
    type: 'multi',
    options: [
      { id: 'water-park', label: 'Water Parks' },
      { id: 'theme-park', label: 'Theme Parks' },
      { id: 'museum', label: 'Museums' },
      { id: 'playground', label: 'Playgrounds' },
      { id: 'entertainment', label: 'Entertainment' },
      { id: 'educational', label: 'Educational' },
      { id: 'outdoor', label: 'Outdoor Activities' },
    ],
  },
  {
    id: 'ageRange',
    label: 'Age Range',
    type: 'single',
    options: [
      { id: 'toddlers', label: 'Toddlers (0-3)' },
      { id: 'kids', label: 'Kids (4-12)' },
      { id: 'teens', label: 'Teens (13+)' },
      { id: 'all', label: 'All Ages' },
    ],
  },
  {
    id: 'price',
    label: 'Price Range',
    type: 'single',
    options: [
      { id: 'free', label: 'Free' },
      { id: 'budget', label: 'Under BD 10' },
      { id: 'mid', label: 'BD 10 - 20' },
      { id: 'premium', label: 'BD 20+' },
    ],
  },
];

export default function KidsExploreClient({ initialKids }: KidsExploreClientProps) {
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});

  const handleFilterChange = (filterId: string, value: string[]) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterId]: value,
    }));
  };

  const handleClearAll = () => {
    setActiveFilters({});
  };

  const filteredKids = useMemo(() => {
    let result = [...initialKids];

    if (activeFilters.type?.length) {
      result = result.filter((item) =>
        activeFilters.type.some(
          (type) => item.type.toLowerCase().includes(type.toLowerCase().replace('-', ' '))
        )
      );
    }

    if (activeFilters.ageRange?.length) {
      result = result.filter((item) => {
        const ageRange = item.ageRange?.toLowerCase() || 'all ages';
        if (activeFilters.ageRange.includes('toddlers')) return ageRange.includes('toddler') || ageRange.includes('all');
        if (activeFilters.ageRange.includes('kids')) return ageRange.includes('kid') || ageRange.includes('all');
        if (activeFilters.ageRange.includes('teens')) return ageRange.includes('teen') || ageRange.includes('all');
        if (activeFilters.ageRange.includes('all')) return ageRange.includes('all');
        return true;
      });
    }

    if (activeFilters.price?.length) {
      result = result.filter((item) => {
        const priceStr = item.price?.toLowerCase() || '';
        if (activeFilters.price.includes('free')) return priceStr === 'free';
        const priceNum = parseInt(priceStr.replace(/[^0-9]/g, '') || '0');
        if (activeFilters.price.includes('budget')) return priceNum > 0 && priceNum < 10;
        if (activeFilters.price.includes('mid')) return priceNum >= 10 && priceNum <= 20;
        if (activeFilters.price.includes('premium')) return priceNum > 20;
        return true;
      });
    }

    return result;
  }, [activeFilters, initialKids]);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className="relative pt-24 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 via-transparent to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Explore
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <span className="text-2xl">👨‍👩‍👧‍👦</span>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Family & Kids
                </h1>
                <p className="text-gray-400">
                  {filteredKids.length} family-friendly activities
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="py-4 border-b border-white/10">
          <ExploreFilters
            filters={filterConfigs}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            onClearAll={handleClearAll}
            categoryColor="#22C55E"
          />
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <ExploreGrid
          items={filteredKids}
          category="kids"
          emptyMessage="No family activities match your filters"
        />
      </section>

      {/* Register Venue CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative overflow-hidden rounded-3xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />

          <div className="relative z-10 py-12 px-6 md:px-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Have a Family-Friendly Venue?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
                List your attraction, play area, or family activity on BahrainNights and reach thousands of families.
              </p>

              <Link
                href="/register-venue"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-green-600 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Register Your Venue
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
