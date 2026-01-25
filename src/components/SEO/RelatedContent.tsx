'use client';

import Link from 'next/link';
import { ArrowRight, MapPin, Calendar, Star } from 'lucide-react';

interface RelatedItem {
  title: string;
  href: string;
  type: 'event' | 'venue' | 'guide' | 'category';
  image?: string;
  subtitle?: string;
}

interface RelatedContentProps {
  title?: string;
  items: RelatedItem[];
  variant?: 'default' | 'compact' | 'cards';
  maxItems?: number;
}

export function RelatedContent({ 
  title = 'You Might Also Like',
  items,
  variant = 'default',
  maxItems = 4
}: RelatedContentProps) {
  const displayItems = items.slice(0, maxItems);

  if (displayItems.length === 0) return null;

  const getIcon = (type: RelatedItem['type']) => {
    switch (type) {
      case 'event': return Calendar;
      case 'venue': return MapPin;
      case 'guide': return Star;
      default: return ArrowRight;
    }
  };

  const getTypeColor = (type: RelatedItem['type']) => {
    switch (type) {
      case 'event': return 'text-blue-400 bg-blue-500/20';
      case 'venue': return 'text-green-400 bg-green-500/20';
      case 'guide': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  if (variant === 'compact') {
    return (
      <div className="border-t border-white/10 pt-6 mt-8">
        <h3 className="text-sm font-medium text-gray-400 mb-4">{title}</h3>
        <div className="flex flex-wrap gap-2">
          {displayItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-full text-sm transition-colors"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'cards') {
    return (
      <section className="py-8">
        <h2 className="text-xl font-bold mb-6">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {displayItems.map((item) => {
            const Icon = getIcon(item.type);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-all"
              >
                {item.image && (
                  <div className="aspect-video rounded-lg overflow-hidden mb-3 bg-gray-800">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                )}
                <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs mb-2 ${getTypeColor(item.type)}`}>
                  <Icon className="w-3 h-3" />
                  {item.type}
                </div>
                <h3 className="font-medium text-sm group-hover:text-yellow-400 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="text-xs text-gray-500 mt-1">{item.subtitle}</p>
                )}
              </Link>
            );
          })}
        </div>
      </section>
    );
  }

  // Default variant
  return (
    <section className="py-8 border-t border-white/10">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <div className="space-y-3">
        {displayItems.map((item) => {
          const Icon = getIcon(item.type);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all group"
            >
              <div className={`p-2 rounded-lg ${getTypeColor(item.type)}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm group-hover:text-yellow-400 transition-colors truncate">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="text-xs text-gray-500 truncate">{item.subtitle}</p>
                )}
              </div>
              <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}

// Pre-built related content sections for common use cases
export function RelatedGuides() {
  const guides: RelatedItem[] = [
    { title: 'Things to Do in Bahrain', href: '/guides/things-to-do', type: 'guide' },
    { title: 'Nightlife Guide', href: '/guides/nightlife', type: 'guide' },
    { title: 'Best Brunches', href: '/guides/brunches', type: 'guide' },
    { title: 'F1 Grand Prix 2026', href: '/guides/f1-2026', type: 'guide' },
  ];

  return <RelatedContent title="Explore Our Guides" items={guides} variant="compact" />;
}

export function RelatedCategories({ currentCategory }: { currentCategory?: string }) {
  const categories: RelatedItem[] = [
    { title: 'Events', href: '/events', type: 'category' as const },
    { title: 'Restaurants', href: '/restaurants', type: 'category' as const },
    { title: 'Nightclubs', href: '/nightclubs', type: 'category' as const },
    { title: 'Attractions', href: '/attractions', type: 'category' as const },
    { title: 'Cinema', href: '/cinema', type: 'category' as const },
  ].filter(c => c.title.toLowerCase() !== currentCategory?.toLowerCase());

  return <RelatedContent title="Explore More" items={categories} variant="compact" />;
}
