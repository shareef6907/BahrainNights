'use client';

import { motion } from 'framer-motion';
import { Filter, ChevronDown, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface FilterOption {
  value: string;
  label: string;
}

interface MovieFiltersProps {
  cinemas: FilterOption[];
  genres: FilterOption[];
  languages: FilterOption[];
  selectedCinema: string;
  selectedGenre: string;
  selectedLanguage: string;
  sortBy: string;
  onCinemaChange: (value: string) => void;
  onGenreChange: (value: string) => void;
  onLanguageChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onClearFilters: () => void;
}

const sortOptions: FilterOption[] = [
  { value: 'popular', label: 'Popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'rating', label: 'Rating' }
];

function FilterDropdown({
  label,
  options,
  value,
  onChange
}: {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLabel = options.find(opt => opt.value === value)?.label || label;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${
          value !== 'all'
            ? 'bg-yellow-400/10 border-yellow-400/50 text-yellow-400'
            : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
        }`}
      >
        <span className="text-sm font-medium">{selectedLabel}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <motion.div
          className="absolute top-full left-0 mt-2 w-48 bg-slate-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-left text-sm hover:bg-white/5 transition-colors ${
                  value === option.value ? 'text-yellow-400 bg-yellow-400/5' : 'text-gray-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default function MovieFilters({
  cinemas,
  genres,
  languages,
  selectedCinema,
  selectedGenre,
  selectedLanguage,
  sortBy,
  onCinemaChange,
  onGenreChange,
  onLanguageChange,
  onSortChange,
  onClearFilters
}: MovieFiltersProps) {
  const hasActiveFilters = selectedCinema !== 'all' || selectedGenre !== 'all' || selectedLanguage !== 'all';

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2 text-gray-400">
        <Filter className="w-4 h-4" />
        <span className="text-sm font-medium hidden sm:inline">Filters:</span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <FilterDropdown
          label="Cinema"
          options={cinemas}
          value={selectedCinema}
          onChange={onCinemaChange}
        />

        <FilterDropdown
          label="Genre"
          options={genres}
          value={selectedGenre}
          onChange={onGenreChange}
        />

        <FilterDropdown
          label="Language"
          options={languages}
          value={selectedLanguage}
          onChange={onLanguageChange}
        />

        <div className="hidden sm:block w-px h-6 bg-white/10" />

        <FilterDropdown
          label="Sort"
          options={sortOptions}
          value={sortBy}
          onChange={onSortChange}
        />

        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1 px-3 py-2 text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Clear</span>
          </button>
        )}
      </div>
    </div>
  );
}
