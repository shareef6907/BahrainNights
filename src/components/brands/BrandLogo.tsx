'use client';

import { cn } from '@/lib/utils';

// Brand styling config - colors and typography for each brand
// Using colors/styling instead of images to avoid any mismatch issues
const brandConfig: Record<string, {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    text: string;
    accent?: string;
  };
  fontStyle?: string;
  pattern?: 'solid' | 'gradient' | 'stripe' | 'monogram';
}> = {
  chanel: {
    name: 'CHANEL',
    colors: { primary: '#000000', secondary: '#FFFFFF', text: '#FFFFFF' },
    fontStyle: 'tracking-[0.3em] font-light',
    pattern: 'solid',
  },
  'louis-vuitton': {
    name: 'Louis Vuitton',
    colors: { primary: '#5c4033', secondary: '#d4af37', text: '#d4af37' },
    fontStyle: 'tracking-wider font-semibold',
    pattern: 'monogram',
  },
  gucci: {
    name: 'GUCCI',
    colors: { primary: '#006633', secondary: '#cc0000', text: '#FFFFFF', accent: '#d4af37' },
    fontStyle: 'tracking-[0.2em] font-bold',
    pattern: 'stripe',
  },
  dior: {
    name: 'DIOR',
    colors: { primary: '#000000', secondary: '#c9a86c', text: '#c9a86c' },
    fontStyle: 'tracking-[0.4em] font-light italic',
    pattern: 'solid',
  },
  hermes: {
    name: 'HERMÈS',
    colors: { primary: '#f37021', secondary: '#5c4033', text: '#FFFFFF' },
    fontStyle: 'tracking-wider font-bold',
    pattern: 'solid',
  },
  zara: {
    name: 'ZARA',
    colors: { primary: '#000000', secondary: '#FFFFFF', text: '#FFFFFF' },
    fontStyle: 'tracking-[0.25em] font-bold',
    pattern: 'solid',
  },
  hm: {
    name: 'H&M',
    colors: { primary: '#cc0000', secondary: '#FFFFFF', text: '#FFFFFF' },
    fontStyle: 'font-bold',
    pattern: 'solid',
  },
  nike: {
    name: 'NIKE',
    colors: { primary: '#000000', secondary: '#f37021', text: '#FFFFFF' },
    fontStyle: 'tracking-wider font-black italic',
    pattern: 'solid',
  },
  adidas: {
    name: 'adidas',
    colors: { primary: '#000000', secondary: '#FFFFFF', text: '#FFFFFF' },
    fontStyle: 'font-bold lowercase',
    pattern: 'stripe',
  },
  uniqlo: {
    name: 'UNIQLO',
    colors: { primary: '#cc0000', secondary: '#FFFFFF', text: '#FFFFFF' },
    fontStyle: 'tracking-wider font-bold',
    pattern: 'solid',
  },
  sephora: {
    name: 'SEPHORA',
    colors: { primary: '#000000', secondary: '#FFFFFF', text: '#FFFFFF' },
    fontStyle: 'tracking-[0.15em] font-bold',
    pattern: 'solid',
  },
  apple: {
    name: 'Apple',
    colors: { primary: '#555555', secondary: '#a3a3a3', text: '#FFFFFF' },
    fontStyle: 'font-light',
    pattern: 'gradient',
  },
  starbucks: {
    name: 'STARBUCKS',
    colors: { primary: '#00704A', secondary: '#FFFFFF', text: '#FFFFFF' },
    fontStyle: 'tracking-wider font-bold',
    pattern: 'solid',
  },
  ikea: {
    name: 'IKEA',
    colors: { primary: '#0051ba', secondary: '#ffcc00', text: '#ffcc00' },
    fontStyle: 'font-black',
    pattern: 'solid',
  },
  'bath-body-works': {
    name: 'Bath & Body Works',
    colors: { primary: '#0a3d62', secondary: '#4a90a4', text: '#FFFFFF' },
    fontStyle: 'font-semibold',
    pattern: 'gradient',
  },
  'costa-coffee': {
    name: 'Costa Coffee',
    colors: { primary: '#6a0f23', secondary: '#FFFFFF', text: '#FFFFFF' },
    fontStyle: 'font-bold',
    pattern: 'solid',
  },
  crocs: {
    name: 'CROCS',
    colors: { primary: '#73c42d', secondary: '#FFFFFF', text: '#FFFFFF' },
    fontStyle: 'tracking-wider font-black',
    pattern: 'solid',
  },
  'five-guys': {
    name: 'FIVE GUYS',
    colors: { primary: '#cc0000', secondary: '#FFFFFF', text: '#FFFFFF' },
    fontStyle: 'font-black',
    pattern: 'solid',
  },
  'shake-shack': {
    name: 'SHAKE SHACK',
    colors: { primary: '#1a472a', secondary: '#FFFFFF', text: '#FFFFFF' },
    fontStyle: 'tracking-wider font-black',
    pattern: 'solid',
  },
  'cheesecake-factory': {
    name: 'The Cheesecake Factory',
    colors: { primary: '#8B4513', secondary: '#d4af37', text: '#FFFFFF' },
    fontStyle: 'font-semibold italic',
    pattern: 'gradient',
  },
};

interface BrandLogoProps {
  brandSlug: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showName?: boolean;
}

export default function BrandLogo({ 
  brandSlug, 
  size = 'md',
  className,
  showName = true,
}: BrandLogoProps) {
  const config = brandConfig[brandSlug] || {
    name: brandSlug.replace(/-/g, ' ').toUpperCase(),
    colors: { primary: '#1a1a2e', secondary: '#FFFFFF', text: '#FFFFFF' },
    fontStyle: 'font-bold tracking-wider',
    pattern: 'solid' as const,
  };

  const sizeClasses = {
    sm: 'h-12 w-24 text-xs',
    md: 'h-16 w-32 text-sm',
    lg: 'h-20 w-40 text-base',
    xl: 'h-24 w-48 text-lg',
  };

  const getBackgroundStyle = () => {
    switch (config.pattern) {
      case 'gradient':
        return {
          background: `linear-gradient(135deg, ${config.colors.primary} 0%, ${config.colors.secondary} 100%)`,
        };
      case 'stripe':
        if (brandSlug === 'gucci') {
          return {
            background: `linear-gradient(180deg, 
              ${config.colors.primary} 0%, 
              ${config.colors.primary} 35%, 
              ${config.colors.secondary} 35%, 
              ${config.colors.secondary} 65%,
              ${config.colors.primary} 65%,
              ${config.colors.primary} 100%)`,
          };
        }
        if (brandSlug === 'adidas') {
          return {
            background: config.colors.primary,
          };
        }
        return { backgroundColor: config.colors.primary };
      case 'monogram':
        return {
          background: config.colors.primary,
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            ${config.colors.secondary}22 10px,
            ${config.colors.secondary}22 20px
          )`,
        };
      default:
        return { backgroundColor: config.colors.primary };
    }
  };

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-lg overflow-hidden',
        sizeClasses[size],
        className
      )}
      style={getBackgroundStyle()}
    >
      {showName && (
        <span
          className={cn('text-center px-2', config.fontStyle)}
          style={{ color: config.colors.text }}
        >
          {config.name}
        </span>
      )}
      {/* Adidas stripes accent */}
      {brandSlug === 'adidas' && (
        <div className="absolute right-2 flex flex-col gap-0.5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-1 bg-white"
              style={{ height: `${12 + i * 4}px` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Export brand config for use in pages
export { brandConfig };
