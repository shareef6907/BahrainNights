'use client';

import { motion } from 'framer-motion';
import { Sparkles, Wine, UtensilsCrossed, Tag, LucideIcon } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export type OfferType = 'all' | 'ladies-night' | 'happy-hour' | 'brunch' | 'special';

interface CategoryTabConfig {
  id: OfferType;
  icon: LucideIcon;
  gradient: string;
  count?: number;
}

interface OfferCategoryTabsProps {
  activeCategory: OfferType;
  onCategoryChange: (category: OfferType) => void;
  counts: Record<OfferType, number>;
}

const categoryConfigs: CategoryTabConfig[] = [
  { id: 'all', icon: Tag, gradient: 'from-white/10 to-white/5' },
  { id: 'ladies-night', icon: Sparkles, gradient: 'from-pink-500/20 to-purple-500/20' },
  { id: 'brunch', icon: UtensilsCrossed, gradient: 'from-orange-500/20 to-amber-500/20' },
  { id: 'happy-hour', icon: Wine, gradient: 'from-yellow-500/20 to-orange-500/20' },
  { id: 'special', icon: Tag, gradient: 'from-blue-500/20 to-indigo-500/20' },
];

const activeGradients: Record<OfferType, string> = {
  'all': 'from-white to-gray-200',
  'ladies-night': 'from-pink-500 to-purple-500',
  'happy-hour': 'from-yellow-500 to-orange-500',
  'brunch': 'from-orange-500 to-amber-500',
  'special': 'from-blue-500 to-indigo-500',
};

export default function OfferCategoryTabs({ activeCategory, onCategoryChange, counts }: OfferCategoryTabsProps) {
  const { t } = useTranslation();

  // Build categories with translated labels
  const categories = categoryConfigs.map(config => ({
    ...config,
    label: t.offers.categories[config.id === 'ladies-night' ? 'ladiesNight' : config.id === 'happy-hour' ? 'happyHour' : config.id] as string,
    shortLabel: t.offers.categories[config.id === 'ladies-night' ? 'ladiesNight' : config.id === 'happy-hour' ? 'happyHour' : config.id] as string,
  }));

  return (
    <div className="w-full">
      {/* Desktop/Tablet View */}
      <div className="hidden md:grid grid-cols-5 gap-3">
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          const IconComponent = category.icon;

          return (
            <motion.button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`relative p-4 rounded-xl border transition-all duration-300 overflow-hidden ${
                isActive
                  ? 'border-white/30 shadow-lg'
                  : 'border-white/5 hover:border-white/20'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${
                  isActive ? activeGradients[category.id] : category.gradient
                } opacity-${isActive ? '20' : '100'} transition-opacity`}
              />

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`p-2 rounded-lg ${
                      isActive
                        ? `bg-gradient-to-r ${activeGradients[category.id]}`
                        : 'bg-white/10'
                    }`}
                  >
                    <IconComponent
                      className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`}
                    />
                  </div>
                  {counts[category.id] > 0 && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        isActive
                          ? 'bg-white text-black'
                          : 'bg-white/10 text-white'
                      }`}
                    >
                      {counts[category.id]}
                    </span>
                  )}
                </div>

                <h3
                  className={`font-bold text-left ${
                    isActive ? 'text-white' : 'text-gray-300'
                  }`}
                >
                  {category.label}
                </h3>
              </div>

              {/* Active Indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${activeGradients[category.id]}`}
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Mobile View - Horizontal Scroll */}
      <div className="md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
        <div className="flex gap-2 pb-2">
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            const IconComponent = category.icon;

            return (
              <motion.button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`relative flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all ${
                  isActive
                    ? `border-transparent bg-gradient-to-r ${activeGradients[category.id]} shadow-lg`
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <IconComponent
                  className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`}
                />
                <span
                  className={`font-medium text-sm whitespace-nowrap ${
                    isActive ? 'text-white' : 'text-gray-300'
                  }`}
                >
                  {category.shortLabel}
                </span>
                {counts[category.id] > 0 && (
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-xs font-bold min-w-[20px] text-center ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-white/10 text-gray-400'
                    }`}
                  >
                    {counts[category.id]}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
