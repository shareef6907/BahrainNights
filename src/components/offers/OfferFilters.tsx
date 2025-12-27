'use client';

import { motion } from 'framer-motion';
import { Filter, ChevronDown, X, Grid, Calendar as CalendarIcon, SlidersHorizontal } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export interface FilterState {
  day: string;
  area: string;
  priceRange: string;
  sortBy: string;
}

interface OfferFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  viewMode: 'grid' | 'day';
  onViewModeChange: (mode: 'grid' | 'day') => void;
  totalResults: number;
}

const days = [
  { value: '', label: 'Any Day' },
  { value: 'sunday', label: 'Sunday' },
  { value: 'monday', label: 'Monday' },
  { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' },
  { value: 'saturday', label: 'Saturday' },
];

const areas = [
  { value: '', label: 'All Areas' },
  { value: 'manama', label: 'Manama' },
  { value: 'juffair', label: 'Juffair' },
  { value: 'seef', label: 'Seef' },
  { value: 'adliya', label: 'Adliya' },
  { value: 'amwaj', label: 'Amwaj Islands' },
  { value: 'bahrain-bay', label: 'Bahrain Bay' },
];

const priceRanges = [
  { value: '', label: 'Any Price' },
  { value: 'free', label: 'Free' },
  { value: 'under-10', label: 'Under BD 10' },
  { value: '10-25', label: 'BD 10 - 25' },
  { value: '25-50', label: 'BD 25 - 50' },
  { value: 'over-50', label: 'Over BD 50' },
];

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest First' },
  { value: 'ending-soon', label: 'Ending Soon' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
];

interface DropdownProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

function FilterDropdown({ label, value, options, onChange }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(o => o.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${
          value
            ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
            : 'bg-white/5 border-white/10 text-gray-300 hover:border-white/20'
        }`}
      >
        <span className="text-sm font-medium whitespace-nowrap">
          {selectedOption?.label || label}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 mt-2 w-48 bg-slate-800 border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden"
        >
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                value === option.value
                  ? 'bg-yellow-500/20 text-yellow-400'
                  : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              {option.label}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default function OfferFilters({
  filters,
  onFilterChange,
  viewMode,
  onViewModeChange,
  totalResults,
}: OfferFiltersProps) {
  const hasActiveFilters = filters.day || filters.area || filters.priceRange;

  const clearFilters = () => {
    onFilterChange({
      day: '',
      area: '',
      priceRange: '',
      sortBy: 'featured',
    });
  };

  const activeFilterCount = [filters.day, filters.area, filters.priceRange].filter(Boolean).length;

  return (
    <div className="w-full">
      {/* Desktop Filters */}
      <div className="hidden lg:flex items-center justify-between gap-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-gray-400">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filter:</span>
          </div>

          <FilterDropdown
            label="Day"
            value={filters.day}
            options={days}
            onChange={(value) => onFilterChange({ ...filters, day: value })}
          />

          <FilterDropdown
            label="Area"
            value={filters.area}
            options={areas}
            onChange={(value) => onFilterChange({ ...filters, area: value })}
          />

          <FilterDropdown
            label="Price"
            value={filters.priceRange}
            options={priceRanges}
            onChange={(value) => onFilterChange({ ...filters, priceRange: value })}
          />

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 px-3 py-2 text-red-400 hover:text-red-300 transition-colors"
            >
              <X className="w-4 h-4" />
              <span className="text-sm">Clear</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm">
            {totalResults} {totalResults === 1 ? 'offer' : 'offers'}
          </span>

          <div className="h-6 w-px bg-white/10" />

          <FilterDropdown
            label="Sort"
            value={filters.sortBy}
            options={sortOptions}
            onChange={(value) => onFilterChange({ ...filters, sortBy: value })}
          />

          <div className="h-6 w-px bg-white/10" />

          <div className="flex items-center bg-white/5 rounded-xl p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-yellow-500 text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('day')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'day'
                  ? 'bg-yellow-500 text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Day View"
            >
              <CalendarIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Filters */}
      <div className="lg:hidden space-y-3">
        {/* Top Row: View Toggle + Filter Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center bg-white/5 rounded-xl p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-yellow-500 text-black'
                  : 'text-gray-400'
              }`}
            >
              <Grid className="w-4 h-4" />
              <span className="text-sm font-medium">Grid</span>
            </button>
            <button
              onClick={() => onViewModeChange('day')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                viewMode === 'day'
                  ? 'bg-yellow-500 text-black'
                  : 'text-gray-400'
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
              <span className="text-sm font-medium">By Day</span>
            </button>
          </div>

          <span className="text-gray-400 text-sm">
            {totalResults} {totalResults === 1 ? 'offer' : 'offers'}
          </span>
        </div>

        {/* Scrollable Filter Pills */}
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-2 pb-1">
            <FilterDropdown
              label="Day"
              value={filters.day}
              options={days}
              onChange={(value) => onFilterChange({ ...filters, day: value })}
            />

            <FilterDropdown
              label="Area"
              value={filters.area}
              options={areas}
              onChange={(value) => onFilterChange({ ...filters, area: value })}
            />

            <FilterDropdown
              label="Price"
              value={filters.priceRange}
              options={priceRanges}
              onChange={(value) => onFilterChange({ ...filters, priceRange: value })}
            />

            <FilterDropdown
              label="Sort"
              value={filters.sortBy}
              options={sortOptions}
              onChange={(value) => onFilterChange({ ...filters, sortBy: value })}
            />

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 px-3 py-2.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400"
              >
                <X className="w-4 h-4" />
                <span className="text-sm whitespace-nowrap">Clear ({activeFilterCount})</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
