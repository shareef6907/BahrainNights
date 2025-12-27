'use client';

import { motion } from 'framer-motion';
import { Music, Users, Theater, Moon, UtensilsCrossed, Trophy, Film, X, Check } from 'lucide-react';

export type EventCategory = 'concerts' | 'family' | 'cultural' | 'nightlife' | 'dining' | 'sports' | 'cinema';

export interface CategoryConfig {
  id: EventCategory;
  label: string;
  emoji: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderColor: string;
}

export const categoryConfigs: CategoryConfig[] = [
  { id: 'concerts', label: 'Concerts', emoji: '🎵', icon: Music, color: '#8B5CF6', bgColor: 'bg-purple-500/20', borderColor: 'border-purple-500' },
  { id: 'family', label: 'Family', emoji: '👨‍👩‍👧‍👦', icon: Users, color: '#10B981', bgColor: 'bg-emerald-500/20', borderColor: 'border-emerald-500' },
  { id: 'cultural', label: 'Cultural', emoji: '🎭', icon: Theater, color: '#F59E0B', bgColor: 'bg-amber-500/20', borderColor: 'border-amber-500' },
  { id: 'nightlife', label: 'Nightlife', emoji: '🌙', icon: Moon, color: '#EC4899', bgColor: 'bg-pink-500/20', borderColor: 'border-pink-500' },
  { id: 'dining', label: 'Dining', emoji: '🍽️', icon: UtensilsCrossed, color: '#EF4444', bgColor: 'bg-red-500/20', borderColor: 'border-red-500' },
  { id: 'sports', label: 'Sports', emoji: '⚽', icon: Trophy, color: '#3B82F6', bgColor: 'bg-blue-500/20', borderColor: 'border-blue-500' },
  { id: 'cinema', label: 'Cinema', emoji: '🎬', icon: Film, color: '#EAB308', bgColor: 'bg-yellow-500/20', borderColor: 'border-yellow-500' },
];

interface CalendarFiltersProps {
  activeCategories: EventCategory[];
  onToggleCategory: (category: EventCategory) => void;
  onClearAll: () => void;
  onSelectAll: () => void;
}

export default function CalendarFilters({
  activeCategories,
  onToggleCategory,
  onClearAll,
  onSelectAll,
}: CalendarFiltersProps) {
  const allSelected = activeCategories.length === categoryConfigs.length;
  const noneSelected = activeCategories.length === 0;

  return (
    <div className="space-y-3">
      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categoryConfigs.map((cat) => {
          const isActive = activeCategories.includes(cat.id);
          const IconComponent = cat.icon;

          return (
            <motion.button
              key={cat.id}
              onClick={() => onToggleCategory(cat.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${
                isActive
                  ? `${cat.bgColor} ${cat.borderColor} border-opacity-100`
                  : 'bg-white/5 border-white/10 opacity-50 hover:opacity-75'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                borderColor: isActive ? cat.color : undefined,
              }}
            >
              <span className="text-sm">{cat.emoji}</span>
              <span
                className="text-sm font-medium"
                style={{ color: isActive ? cat.color : '#9CA3AF' }}
              >
                {cat.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Clear/Select All Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={onSelectAll}
          disabled={allSelected}
          className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded transition-colors ${
            allSelected
              ? 'text-gray-500 cursor-not-allowed'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Check className="w-3 h-3" />
          Select All
        </button>
        <span className="text-gray-600">|</span>
        <button
          onClick={onClearAll}
          disabled={noneSelected}
          className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded transition-colors ${
            noneSelected
              ? 'text-gray-500 cursor-not-allowed'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <X className="w-3 h-3" />
          Clear All
        </button>
        <span className="text-gray-500 text-xs ml-2">
          {activeCategories.length} of {categoryConfigs.length} selected
        </span>
      </div>
    </div>
  );
}
