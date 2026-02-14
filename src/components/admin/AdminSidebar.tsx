'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Building2,
  Calendar,
  Film,
  Megaphone,
  BarChart3,
  Users,
  ExternalLink,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Shield,
  Crown,
  Inbox,
  Sparkles,
  Heart,
  ClipboardCheck,
  Star,
  MapPin,
  Ticket,
  FileText,
  Mail,
  Smartphone,
  Music,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

const navItems = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    name: 'Content Studio',
    href: '/admin/studio',
    icon: Sparkles,
    highlight: true,
  },
  {
    name: 'Blog Articles',
    href: '/admin/blog',
    icon: FileText,
  },
  {
    name: 'Regional Trailers',
    href: '/admin/regional/trailers',
    icon: Film,
    highlight: true,
  },
  {
    name: 'Venues',
    href: '/admin/venues',
    icon: Building2,
  },
  {
    name: 'Venue Changes',
    href: '/admin/venue-changes',
    icon: ClipboardCheck,
  },
  {
    name: 'Events',
    href: '/admin/events',
    icon: Calendar,
  },
  {
    name: 'Artists',
    href: '/admin/artists',
    icon: Music,
    highlight: true,
  },
  {
    name: 'Cinema',
    href: '/admin/cinema',
    icon: Film,
  },
  {
    name: 'Sponsors',
    href: '/admin/sponsors',
    icon: Crown,
  },
  {
    name: 'Inquiries',
    href: '/admin/sponsors/inquiries',
    icon: Inbox,
  },
  {
    name: 'Ads Manager',
    href: '/admin/ads',
    icon: Megaphone,
  },
  {
    name: 'Featured Listings',
    href: '/admin/featured',
    icon: Star,
  },
  {
    name: 'Attractions',
    href: '/admin/attractions',
    icon: MapPin,
  },
  {
    name: 'Platinumlist',
    href: '/admin/platinumlist-attractions',
    icon: Ticket,
  },
  {
    name: 'Platinumlist Events',
    href: '/admin/platinumlist-events',
    icon: Calendar,
  },
  {
    name: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
  },
  {
    name: 'PWA Installs',
    href: '/admin/pwa',
    icon: Smartphone,
  },
  {
    name: 'Newsletter',
    href: '/admin/newsletter',
    icon: Mail,
  },
  {
    name: 'Members',
    href: '/admin/members',
    icon: Heart,
  },
  {
    name: 'Users',
    href: '/admin/users',
    icon: Users,
  },
];

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function AdminSidebar({ collapsed, onToggle }: AdminSidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === '/admin') {
      return pathname === '/admin';
    }
    // Exact match for specific pages like /admin/sponsors/inquiries
    if (href === '/admin/sponsors/inquiries') {
      return pathname === '/admin/sponsors/inquiries';
    }
    // For parent routes like /admin/sponsors, only match if not on a specific sub-route
    if (href === '/admin/sponsors') {
      return pathname === '/admin/sponsors' ||
             (pathname.startsWith('/admin/sponsors/') &&
              !pathname.includes('/inquiries'));
    }
    // Handle studio routes
    if (href === '/admin/studio') {
      return pathname === '/admin/studio' || pathname.startsWith('/admin/studio/');
    }
    return pathname.startsWith(href);
  };

  return (
    <motion.aside
      className="fixed left-0 top-0 h-full bg-[#0F0F1A] border-r border-white/10 z-40 flex flex-col"
      initial={false}
      animate={{ width: collapsed ? 80 : 260 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {/* Logo Section */}
      <div className="p-4 border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-teal-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden whitespace-nowrap"
              >
                <span className="font-bold text-white">BahrainNights</span>
                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-cyan-500/20 text-cyan-400 rounded">
                  Admin
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                active
                  ? 'bg-cyan-500/20 text-cyan-400'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-cyan-400' : ''}`} />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="overflow-hidden whitespace-nowrap text-sm font-medium"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}

        {/* Divider */}
        <div className="my-4 border-t border-white/10" />

        {/* View Website */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
        >
          <ExternalLink className="w-5 h-5 flex-shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden whitespace-nowrap text-sm font-medium"
              >
                View Website
              </motion.span>
            )}
          </AnimatePresence>
        </a>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-white/10 space-y-2">
        {/* Logout */}
        <button
          onClick={() => logout()}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden whitespace-nowrap text-sm font-medium"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* Collapse Toggle */}
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm">Collapse</span>
            </>
          )}
        </button>
      </div>
    </motion.aside>
  );
}
