'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import StudioSidebar from '@/components/studio/StudioSidebar';

interface StudioLayoutProps {
  children: ReactNode;
}

const mobileNavItems = [
  { href: '/admin/studio', label: 'Dashboard' },
  { href: '/admin/studio/blog', label: 'Blog' },
  { href: '/admin/studio/feed', label: 'Feed' },
  { href: '/admin/studio/stories', label: 'Stories' },
  { href: '/admin/studio/reels', label: 'Reels' },
  { href: '/admin/studio/analytics', label: 'Analytics' },
  { href: '/admin/studio/settings', label: 'Settings' },
];

export default function StudioLayout({ children }: StudioLayoutProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === '/admin/studio') {
      return pathname === '/admin/studio';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Sidebar - Hidden on mobile, shown on desktop */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24">
          <StudioSidebar />
        </div>
      </aside>

      {/* Mobile Navigation Tabs */}
      <div className="lg:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
        <div className="flex gap-2 pb-4">
          {mobileNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                isActive(item.href)
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
