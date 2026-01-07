'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';
import ExploreGrid, { ExploreItem } from '@/components/explore/ExploreGrid';
import ExploreFilters, { FilterConfig } from '@/components/explore/ExploreFilters';

interface ToursExploreClientProps {
  initialTours: ExploreItem[];
}

// Filter configurations
const filterConfigs: FilterConfig[] = [
  {
    id: 'type',
    label: 'Type',
    type: 'multi',
    options: [
      { id: 'cultural', label: 'Cultural' },
      { id: 'food', label: 'Food & Culinary' },
      { id: 'desert', label: 'Desert Safari' },
      { id: 'boat', label: 'Boat Tours' },
      { id: 'walking', label: 'Walking Tours' },
      { id: 'private', label: 'Private Tours' },
      { id: 'photography', label: 'Photography' },
      { id: 'day tours', label: 'Day Tours' },
    ],
  },
  {
    id: 'duration',
    label: 'Duration',
    type: 'single',
    options: [
      { id: 'short', label: 'Under 3 hours' },
      { id: 'medium', label: '3-5 hours' },
      { id: 'full-day', label: 'Full day (5+ hours)' },
    ],
  },
  {
    id: 'price',
    label: 'Price Range',
    type: 'single',
    options: [
      { id: 'budget', label: 'Under BD 35' },
      { id: 'mid', label: 'BD 35 - 50' },
      { id: 'premium', label: 'BD 50+' },
    ],
  },
];

export default function ToursExploreClient({ initialTours }: ToursExploreClientProps) {
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

  const filteredTours = useMemo(() => {
    let result = [...initialTours];

    if (activeFilters.type?.length) {
      result = result.filter((tour) =>
        activeFilters.type.some(
          (type) => tour.type.toLowerCase().includes(type.toLowerCase())
        )
      );
    }

    if (activeFilters.duration?.length) {
      result = result.filter((tour) => {
        const durationStr = tour.duration || '';
        const hours = parseInt(durationStr.replace(/[^0-9]/g, '') || '0');
        if (activeFilters.duration.includes('short')) return hours < 3;
        if (activeFilters.duration.includes('medium')) return hours >= 3 && hours <= 5;
        if (activeFilters.duration.includes('full-day')) return hours > 5;
        return true;
      });
    }

    if (activeFilters.price?.length) {
      result = result.filter((tour) => {
        const priceNum = parseInt(tour.price?.replace(/[^0-9]/g, '') || '0');
        if (activeFilters.price.includes('budget')) return priceNum < 35;
        if (activeFilters.price.includes('mid')) return priceNum >= 35 && priceNum <= 50;
        if (activeFilters.price.includes('premium')) return priceNum > 50;
        return true;
      });
    }

    return result;
  }, [activeFilters, initialTours]);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className="relative pt-24 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-500/10 via-transparent to-transparent" />

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
              <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center">
                <span className="text-2xl">🧭</span>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Tours & Adventures
                </h1>
                <p className="text-gray-400">
                  {filteredTours.length} unique experiences
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
            categoryColor="#14B8A6"
          />
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <ExploreGrid
          items={filteredTours}
          category="tours"
          emptyMessage="No tours match your filters"
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
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-600" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />

          <div className="relative z-10 py-12 px-6 md:px-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Offer Tours & Experiences?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
                List your tours, experiences, and adventures on BahrainNights and reach thousands of visitors.
              </p>

              <Link
                href="/register-venue"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-teal-600 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Register Your Business
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
