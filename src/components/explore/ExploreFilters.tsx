'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, SlidersHorizontal } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export interface FilterOption {
  id: string;
  label: string;
}

export interface FilterConfig {
  id: string;
  label: string;
  options: FilterOption[];
  type: 'single' | 'multi';
}

interface ExploreFiltersProps {
  filters: FilterConfig[];
  activeFilters: Record<string, string[]>;
  onFilterChange: (filterId: string, value: string[]) => void;
  onClearAll: () => void;
  categoryColor?: string;
}

export default function ExploreFilters({
  filters,
  activeFilters,
  onFilterChange,
  onClearAll,
  categoryColor = '#3B82F6',
}: ExploreFiltersProps) {
  const { t } = useTranslation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeCount = Object.values(activeFilters).flat().length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (filterId: string, optionId: string, type: 'single' | 'multi') => {
    const current = activeFilters[filterId] || [];

    if (type === 'single') {
      if (current.includes(optionId)) {
        onFilterChange(filterId, []);
      } else {
        onFilterChange(filterId, [optionId]);
      }
      setOpenDropdown(null);
    } else {
      if (current.includes(optionId)) {
        onFilterChange(filterId, current.filter((id) => id !== optionId));
      } else {
        onFilterChange(filterId, [...current, optionId]);
      }
    }
  };

  const getFilterLabel = (filter: FilterConfig): string => {
    const selected = activeFilters[filter.id] || [];
    if (selected.length === 0) return filter.label;
    if (selected.length === 1) {
      const option = filter.options.find((o) => o.id === selected[0]);
      return option?.label || filter.label;
    }
    return `${filter.label} (${selected.length})`;
  };

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden md:flex items-center gap-3 flex-wrap" ref={dropdownRef}>
        {filters.map((filter) => {
          const isOpen = openDropdown === filter.id;
          const hasSelection = (activeFilters[filter.id] || []).length > 0;

          return (
            <div key={filter.id} className="relative">
              <button
                onClick={() => setOpenDropdown(isOpen ? null : filter.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  hasSelection
                    ? 'bg-white/20 text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
                style={hasSelection ? { backgroundColor: `${categoryColor}40` } : {}}
              >
                {getFilterLabel(filter)}
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
                    className="absolute top-full left-0 mt-2 min-w-48 bg-slate-800 border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden"
                  >
                    <div className="p-2 max-h-64 overflow-y-auto">
                      {filter.options.map((option) => {
                        const isSelected = (activeFilters[filter.id] || []).includes(option.id);

                        return (
                          <button
                            key={option.id}
                            onClick={() => toggleOption(filter.id, option.id, filter.type)}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                              isSelected
                                ? 'bg-white/10 text-white'
                                : 'text-gray-300 hover:bg-white/5'
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded ${
                                filter.type === 'single' ? 'rounded-full' : ''
                              } border-2 flex items-center justify-center transition-colors ${
                                isSelected
                                  ? 'border-transparent'
                                  : 'border-gray-500'
                              }`}
                              style={isSelected ? { backgroundColor: categoryColor } : {}}
                            >
                              {isSelected && (
                                <svg
                                  className="w-2.5 h-2.5 text-white"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={3}
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {activeCount > 0 && (
          <button
            onClick={onClearAll}
            className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
            {t.exploreFilters.clearAll}
          </button>
        )}
      </div>

      {/* Mobile Filter Button */}
      <div className="md:hidden">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium text-white"
        >
          <SlidersHorizontal className="w-4 h-4" />
          {t.exploreFilters.filters}
          {activeCount > 0 && (
            <span
              className="px-1.5 py-0.5 text-xs rounded-full text-white"
              style={{ backgroundColor: categoryColor }}
            >
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Filter Sheet */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="fixed inset-0 bg-black/60 z-50 md:hidden"
            />

            {/* Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 bg-slate-900 border-t border-white/10 rounded-t-3xl z-50 md:hidden max-h-[80vh] overflow-hidden flex flex-col"
            >
              {/* Handle */}
              <div className="flex justify-center py-3">
                <div className="w-12 h-1 bg-white/20 rounded-full" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-4 pb-4 border-b border-white/10">
                <h3 className="text-lg font-semibold text-white">{t.exploreFilters.filters}</h3>
                <div className="flex items-center gap-3">
                  {activeCount > 0 && (
                    <button
                      onClick={onClearAll}
                      className="text-sm text-gray-400"
                    >
                      {t.exploreFilters.clearAll}
                    </button>
                  )}
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="p-2 hover:bg-white/10 rounded-full"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Filter Options */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {filters.map((filter) => (
                  <div key={filter.id}>
                    <h4 className="text-sm font-medium text-gray-400 mb-3">
                      {filter.label}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {filter.options.map((option) => {
                        const isSelected = (activeFilters[filter.id] || []).includes(option.id);

                        return (
                          <button
                            key={option.id}
                            onClick={() => toggleOption(filter.id, option.id, filter.type)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                              isSelected
                                ? 'text-white'
                                : 'bg-white/5 text-gray-300'
                            }`}
                            style={isSelected ? { backgroundColor: categoryColor } : {}}
                          >
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Apply Button */}
              <div className="p-4 border-t border-white/10">
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="w-full py-3 rounded-xl font-semibold text-black transition-colors"
                  style={{ backgroundColor: categoryColor }}
                >
                  {t.exploreFilters.applyFilters}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
