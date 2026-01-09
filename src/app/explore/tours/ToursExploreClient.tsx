'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';
import ExploreGrid, { ExploreItem } from '@/components/explore/ExploreGrid';
import ExploreFilters, { FilterConfig } from '@/components/explore/ExploreFilters';
import { useTranslation } from '@/lib/i18n';

interface ToursExploreClientProps {
  initialTours: ExploreItem[];
}

export default function ToursExploreClient({ initialTours }: ToursExploreClientProps) {
  const { t } = useTranslation();
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});

  // Filter configurations - same as kids page since we're showing attractions
  const filterConfigs: FilterConfig[] = [
    {
      id: 'type',
      label: t.familyKids.filters.type,
      type: 'multi',
      options: [
        { id: 'water-park', label: t.familyKids.types.waterParks },
        { id: 'theme-park', label: t.familyKids.types.themeParks },
        { id: 'museum', label: t.familyKids.types.museums },
        { id: 'playground', label: t.familyKids.types.playgrounds },
        { id: 'entertainment', label: t.familyKids.types.entertainment },
        { id: 'educational', label: t.familyKids.types.educational },
        { id: 'outdoor', label: t.familyKids.types.outdoor },
      ],
    },
    {
      id: 'ageRange',
      label: t.familyKids.filters.ageRange,
      type: 'single',
      options: [
        { id: 'toddlers', label: t.familyKids.ages.toddlers },
        { id: 'kids', label: t.familyKids.ages.kids },
        { id: 'teens', label: t.familyKids.ages.teens },
        { id: 'all', label: t.familyKids.ages.allAges },
      ],
    },
    {
      id: 'price',
      label: t.familyKids.filters.priceRange,
      type: 'single',
      options: [
        { id: 'free', label: t.familyKids.prices.free },
        { id: 'budget', label: t.familyKids.prices.budget },
        { id: 'mid', label: t.familyKids.prices.mid },
        { id: 'premium', label: t.familyKids.prices.premium },
      ],
    },
  ];

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
            {t.familyKids.backToExplore}
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
                  {t.explore.categories.tours}
                </h1>
                <p className="text-gray-400">
                  {t.familyKids.activitiesCount.replace('{count}', filteredTours.length.toString())}
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
          emptyMessage={t.familyKids.emptyMessage}
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
                {t.familyKids.haveFamilyVenue}
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
                {t.familyKids.listYourAttraction}
              </p>

              <Link
                href="/register-venue"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-teal-600 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
              >
                <Plus className="w-5 h-5" />
                {t.explore.registerYourVenue}
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
