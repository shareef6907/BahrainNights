'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, SlidersHorizontal } from 'lucide-react';

export interface PlaceFiltersState {
  area: string;
  priceRange: string;
  features: string[];
  sortBy: string;
}

interface PlaceFiltersProps {
  filters: PlaceFiltersState;
  onFilterChange: (filters: PlaceFiltersState) => void;
  onClearFilters: () => void;
}

const areas = [
  { value: 'all', label: 'All Areas' },
  { value: 'manama', label: 'Manama' },
  { value: 'seef', label: 'Seef' },
  { value: 'juffair', label: 'Juffair' },
  { value: 'amwaj', label: 'Amwaj' },
  { value: 'adliya', label: 'Adliya' },
  { value: 'riffa', label: 'Riffa' },
];

const priceRanges = [
  { value: 'all', label: 'All Prices' },
  { value: '1', label: 'Budget (BD)' },
  { value: '2', label: 'Mid-Range (BD BD)' },
  { value: '3', label: 'Premium (BD BD BD)' },
];

const features = [
  'Outdoor Seating',
  'Live Music',
  'Shisha',
  'Family Friendly',
  'Reservations',
  'Parking',
  'Pool Access',
  'Beach',
  'Live Sports',
  'DJ',
];

const sortOptions = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'az', label: 'A-Z' },
];

export default function PlaceFilters({
  filters,
  onFilterChange,
  onClearFilters,
}: PlaceFiltersProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const hasActiveFilters =
    filters.area !== 'all' ||
    filters.priceRange !== 'all' ||
    filters.features.length > 0 ||
    filters.sortBy !== 'recommended';

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const updateFilter = (key: keyof PlaceFiltersState, value: string | string[]) => {
    onFilterChange({ ...filters, [key]: value });
    if (key !== 'features') {
      setOpenDropdown(null);
    }
  };

  const toggleFeature = (feature: string) => {
    const newFeatures = filters.features.includes(feature)
      ? filters.features.filter((f) => f !== feature)
      : [...filters.features, feature];
    updateFilter('features', newFeatures);
  };

  const FilterDropdown = ({
    name,
    label,
    options,
    value,
    onChange,
  }: {
    name: string;
    label: string;
    options: { value: string; label: string }[];
    value: string;
    onChange: (value: string) => void;
  }) => {
    const isOpen = openDropdown === name;
    const selectedLabel = options.find((o) => o.value === value)?.label || label;
    const isActive = value !== 'all' && value !== 'recommended';

    return (
      <div className="relative">
        <button
          onClick={() => toggleDropdown(name)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
            isActive
              ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30'
              : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-transparent'
          }`}
        >
          <span className="text-sm">{selectedLabel}</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-0 mt-2 w-48 bg-slate-800 border border-white/10 rounded-xl shadow-xl overflow-hidden z-50"
            >
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => onChange(option.value)}
                  className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                    value === option.value
                      ? 'bg-yellow-400/20 text-yellow-400'
                      : 'text-gray-300 hover:bg-white/5'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const FeaturesDropdown = () => {
    const isOpen = openDropdown === 'features';
    const activeCount = filters.features.length;

    return (
      <div className="relative">
        <button
          onClick={() => toggleDropdown('features')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
            activeCount > 0
              ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30'
              : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-transparent'
          }`}
        >
          <span className="text-sm">Features</span>
          {activeCount > 0 && (
            <span className="px-1.5 py-0.5 bg-yellow-400 text-black text-xs font-bold rounded-full">
              {activeCount}
            </span>
          )}
          <ChevronDown
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-0 mt-2 w-56 bg-slate-800 border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 p-3"
            >
              <div className="grid grid-cols-1 gap-1">
                {features.map((feature) => (
                  <button
                    key={feature}
                    onClick={() => toggleFeature(feature)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                      filters.features.includes(feature)
                        ? 'bg-yellow-400/20 text-yellow-400'
                        : 'text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                        filters.features.includes(feature)
                          ? 'bg-yellow-400 border-yellow-400'
                          : 'border-gray-500'
                      }`}
                    >
                      {filters.features.includes(feature) && (
                        <svg
                          className="w-3 h-3 text-black"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                    {feature}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <>
      {/* Desktop Filters */}
      <div ref={dropdownRef} className="hidden md:flex items-center gap-3 flex-wrap">
        <FilterDropdown
          name="area"
          label="Area"
          options={areas}
          value={filters.area}
          onChange={(v) => updateFilter('area', v)}
        />
        <FilterDropdown
          name="price"
          label="Price Range"
          options={priceRanges}
          value={filters.priceRange}
          onChange={(v) => updateFilter('priceRange', v)}
        />
        <FeaturesDropdown />
        <FilterDropdown
          name="sort"
          label="Sort By"
          options={sortOptions}
          value={filters.sortBy}
          onChange={(v) => updateFilter('sortBy', v)}
        />

        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={onClearFilters}
            className="flex items-center gap-1.5 px-3 py-2 text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            <X className="w-4 h-4" />
            Clear Filters
          </motion.button>
        )}
      </div>

      {/* Mobile Filter Button */}
      <button
        onClick={() => setShowMobileFilters(true)}
        className="md:hidden flex items-center gap-2 px-4 py-2.5 bg-white/5 rounded-xl text-gray-300"
      >
        <SlidersHorizontal className="w-4 h-4" />
        <span>Filters</span>
        {hasActiveFilters && (
          <span className="px-1.5 py-0.5 bg-yellow-400 text-black text-xs font-bold rounded-full">
            {(filters.area !== 'all' ? 1 : 0) +
              (filters.priceRange !== 'all' ? 1 : 0) +
              filters.features.length +
              (filters.sortBy !== 'recommended' ? 1 : 0)}
          </span>
        )}
      </button>

      {/* Mobile Filter Sheet */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-[90] md:hidden"
              onClick={() => setShowMobileFilters(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-slate-900 rounded-t-3xl z-[95] md:hidden max-h-[80vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Filters</h3>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="p-2 bg-white/5 rounded-full"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                {/* Area */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-400 mb-3">Area</h4>
                  <div className="flex flex-wrap gap-2">
                    {areas.map((area) => (
                      <button
                        key={area.value}
                        onClick={() => updateFilter('area', area.value)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          filters.area === area.value
                            ? 'bg-yellow-400 text-black'
                            : 'bg-white/5 text-gray-300'
                        }`}
                      >
                        {area.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-400 mb-3">Price Range</h4>
                  <div className="flex flex-wrap gap-2">
                    {priceRanges.map((price) => (
                      <button
                        key={price.value}
                        onClick={() => updateFilter('priceRange', price.value)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          filters.priceRange === price.value
                            ? 'bg-yellow-400 text-black'
                            : 'bg-white/5 text-gray-300'
                        }`}
                      >
                        {price.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-400 mb-3">Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {features.map((feature) => (
                      <button
                        key={feature}
                        onClick={() => toggleFeature(feature)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          filters.features.includes(feature)
                            ? 'bg-yellow-400 text-black'
                            : 'bg-white/5 text-gray-300'
                        }`}
                      >
                        {feature}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort By */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-400 mb-3">Sort By</h4>
                  <div className="flex flex-wrap gap-2">
                    {sortOptions.map((sort) => (
                      <button
                        key={sort.value}
                        onClick={() => updateFilter('sortBy', sort.value)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          filters.sortBy === sort.value
                            ? 'bg-yellow-400 text-black'
                            : 'bg-white/5 text-gray-300'
                        }`}
                      >
                        {sort.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-white/10">
                  {hasActiveFilters && (
                    <button
                      onClick={() => {
                        onClearFilters();
                        setShowMobileFilters(false);
                      }}
                      className="flex-1 py-3 border border-white/20 rounded-xl text-white font-medium"
                    >
                      Clear All
                    </button>
                  )}
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="flex-1 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl text-black font-bold"
                  >
                    Show Results
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
