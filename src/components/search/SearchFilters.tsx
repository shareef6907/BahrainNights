'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  MapPin,
  Film,
  Ticket,
  LayoutGrid,
  ChevronDown,
  SlidersHorizontal,
  X,
} from 'lucide-react';

export type SearchTab = 'all' | 'events' | 'places' | 'cinema' | 'offers';
export type DateFilter = 'any' | 'today' | 'week' | 'month';
export type SortOption = 'relevance' | 'date' | 'popularity';

interface SearchFiltersProps {
  activeTab: SearchTab;
  onTabChange: (tab: SearchTab) => void;
  counts: {
    all: number;
    events: number;
    places: number;
    cinema: number;
    offers: number;
  };
  dateFilter: DateFilter;
  onDateFilterChange: (filter: DateFilter) => void;
  areaFilter: string;
  onAreaFilterChange: (area: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const tabs: { id: SearchTab; label: string; icon: React.ReactNode }[] = [
  { id: 'all', label: 'All Results', icon: <LayoutGrid className="w-4 h-4" /> },
  { id: 'events', label: 'Events', icon: <Calendar className="w-4 h-4" /> },
  { id: 'places', label: 'Places', icon: <MapPin className="w-4 h-4" /> },
  { id: 'cinema', label: 'Cinema', icon: <Film className="w-4 h-4" /> },
  { id: 'offers', label: 'Offers', icon: <Ticket className="w-4 h-4" /> },
];

const dateOptions: { id: DateFilter; label: string }[] = [
  { id: 'any', label: 'Any Date' },
  { id: 'today', label: 'Today' },
  { id: 'week', label: 'This Week' },
  { id: 'month', label: 'This Month' },
];

const areaOptions = [
  'All Areas',
  'Manama',
  'Seef',
  'Juffair',
  'Adliya',
  'Amwaj Islands',
  'Riffa',
  'Muharraq',
];

const sortOptions: { id: SortOption; label: string }[] = [
  { id: 'relevance', label: 'Relevance' },
  { id: 'date', label: 'Date' },
  { id: 'popularity', label: 'Popularity' },
];

export default function SearchFilters({
  activeTab,
  onTabChange,
  counts,
  dateFilter,
  onDateFilterChange,
  areaFilter,
  onAreaFilterChange,
  sortBy,
  onSortChange,
}: SearchFiltersProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div
        ref={tabsContainerRef}
        className="flex overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide"
      >
        <div className="flex gap-2">
          {tabs.map((tab) => {
            const count = counts[tab.id];
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-pink-500 text-black font-medium'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-black/20' : 'bg-white/10'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Desktop Filters */}
        <div className="hidden md:flex items-center gap-3 flex-1">
          {/* Date Filter */}
          <FilterDropdown
            label={
              dateOptions.find((d) => d.id === dateFilter)?.label || 'Any Date'
            }
            icon={<Calendar className="w-4 h-4" />}
          >
            {dateOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => onDateFilterChange(option.id)}
                className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                  dateFilter === option.id
                    ? 'bg-pink-500/20 text-pink-400'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                {option.label}
              </button>
            ))}
          </FilterDropdown>

          {/* Area Filter */}
          <FilterDropdown
            label={areaFilter || 'All Areas'}
            icon={<MapPin className="w-4 h-4" />}
          >
            {areaOptions.map((area) => (
              <button
                key={area}
                onClick={() =>
                  onAreaFilterChange(area === 'All Areas' ? '' : area)
                }
                className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                  (area === 'All Areas' && !areaFilter) ||
                  areaFilter === area
                    ? 'bg-pink-500/20 text-pink-400'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                {area}
              </button>
            ))}
          </FilterDropdown>

          {/* Sort By */}
          <FilterDropdown
            label={`Sort: ${
              sortOptions.find((s) => s.id === sortBy)?.label || 'Relevance'
            }`}
          >
            {sortOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => onSortChange(option.id)}
                className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                  sortBy === option.id
                    ? 'bg-pink-500/20 text-pink-400'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                {option.label}
              </button>
            ))}
          </FilterDropdown>
        </div>

        {/* Mobile Filter Button */}
        <button
          onClick={() => setShowMobileFilters(true)}
          className="md:hidden flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:bg-white/10 transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters</span>
          {(dateFilter !== 'any' || areaFilter) && (
            <span className="w-2 h-2 bg-pink-500 rounded-full" />
          )}
        </button>

        {/* Active Filters Badges */}
        <div className="flex gap-2 flex-wrap">
          {dateFilter !== 'any' && (
            <FilterBadge
              label={dateOptions.find((d) => d.id === dateFilter)?.label || ''}
              onRemove={() => onDateFilterChange('any')}
            />
          )}
          {areaFilter && (
            <FilterBadge
              label={areaFilter}
              onRemove={() => onAreaFilterChange('')}
            />
          )}
        </div>
      </div>

      {/* Mobile Filter Modal */}
      <AnimatePresence>
        {showMobileFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
            onClick={() => setShowMobileFilters(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 bg-slate-900 rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Filters</h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Date Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-3">
                  Date
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {dateOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => onDateFilterChange(option.id)}
                      className={`px-4 py-3 rounded-lg text-sm transition-colors ${
                        dateFilter === option.id
                          ? 'bg-pink-500 text-black font-medium'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Area Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-3">
                  Area
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {areaOptions.map((area) => (
                    <button
                      key={area}
                      onClick={() =>
                        onAreaFilterChange(area === 'All Areas' ? '' : area)
                      }
                      className={`px-4 py-3 rounded-lg text-sm transition-colors ${
                        (area === 'All Areas' && !areaFilter) ||
                        areaFilter === area
                          ? 'bg-pink-500 text-black font-medium'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-3">
                  Sort By
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {sortOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => onSortChange(option.id)}
                      className={`px-4 py-3 rounded-lg text-sm transition-colors ${
                        sortBy === option.id
                          ? 'bg-pink-500 text-black font-medium'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Apply Button */}
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full py-3 bg-pink-500 hover:bg-pink-400 text-black font-semibold rounded-lg transition-colors"
              >
                Apply Filters
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Dropdown component for desktop filters
function FilterDropdown({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
      >
        {icon}
        <span className="text-sm">{label}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 mt-2 min-w-[160px] bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl overflow-hidden z-20"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Active filter badge
function FilterBadge({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 bg-pink-500/20 text-pink-400 text-sm rounded-full">
      {label}
      <button
        onClick={onRemove}
        className="p-0.5 hover:bg-pink-500/30 rounded-full"
      >
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}
