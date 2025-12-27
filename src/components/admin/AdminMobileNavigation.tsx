'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Building2,
  Calendar,
  Megaphone,
  BarChart3,
} from 'lucide-react';

const navItems = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    name: 'Venues',
    href: '/admin/venues',
    icon: Building2,
  },
  {
    name: 'Events',
    href: '/admin/events',
    icon: Calendar,
  },
  {
    name: 'Ads',
    href: '/admin/ads',
    icon: Megaphone,
  },
  {
    name: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
  },
];

export default function AdminMobileNavigation() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0F0F1A]/95 backdrop-blur-xl border-t border-white/10 z-50 safe-area-inset-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center justify-center flex-1 py-2 transition-colors ${
                active ? 'text-cyan-400' : 'text-gray-400'
              }`}
            >
              {active && (
                <motion.div
                  layoutId="admin-mobile-nav-indicator"
                  className="absolute -top-0.5 w-12 h-1 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full"
                />
              )}
              <Icon className={`w-5 h-5 ${active ? 'text-cyan-400' : ''}`} />
              <span className="text-xs mt-1 font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
