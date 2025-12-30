'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  Image,
  PlaySquare,
  Film,
  BarChart3,
  Settings,
  Sparkles,
} from 'lucide-react';

const studioNavItems = [
  {
    name: 'Dashboard',
    href: '/admin/studio',
    icon: LayoutDashboard,
    description: 'Overview & pending approvals',
  },
  {
    name: 'Blog Posts',
    href: '/admin/studio/blog',
    icon: FileText,
    description: 'Long-form articles',
  },
  {
    name: 'Feed Posts',
    href: '/admin/studio/feed',
    icon: Image,
    description: 'Instagram feed content',
  },
  {
    name: 'Stories',
    href: '/admin/studio/stories',
    icon: PlaySquare,
    description: 'Story sequences',
  },
  {
    name: 'Reel Briefs',
    href: '/admin/studio/reels',
    icon: Film,
    description: 'Video content briefs',
  },
  {
    name: 'Analytics',
    href: '/admin/studio/analytics',
    icon: BarChart3,
    description: 'Performance metrics',
  },
  {
    name: 'Settings',
    href: '/admin/studio/settings',
    icon: Settings,
    description: 'AI & automation config',
  },
];

export default function StudioSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === '/admin/studio') {
      return pathname === '/admin/studio';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="bg-[#0F0F1A]/50 border border-white/10 rounded-2xl p-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-white">Content Studio</h3>
          <p className="text-xs text-gray-400">AI-Powered Content</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-1">
        {studioNavItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                active
                  ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon
                className={`w-5 h-5 flex-shrink-0 ${
                  active ? 'text-purple-400' : 'group-hover:text-purple-400'
                }`}
              />
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium block">{item.name}</span>
                {active && (
                  <motion.span
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-xs text-gray-400 block"
                  >
                    {item.description}
                  </motion.span>
                )}
              </div>
              {active && (
                <motion.div
                  layoutId="studioActiveIndicator"
                  className="w-1.5 h-1.5 rounded-full bg-purple-400"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Quick Stats */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <h4 className="text-xs font-medium text-gray-500 uppercase mb-3">Quick Stats</h4>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white/5 rounded-lg p-2 text-center">
            <p className="text-lg font-bold text-white">0</p>
            <p className="text-xs text-gray-400">Pending</p>
          </div>
          <div className="bg-white/5 rounded-lg p-2 text-center">
            <p className="text-lg font-bold text-white">0</p>
            <p className="text-xs text-gray-400">Published</p>
          </div>
        </div>
      </div>
    </div>
  );
}
