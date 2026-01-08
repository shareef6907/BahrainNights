'use client';

import { useState, useEffect, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import AdminMobileNavigation from './AdminMobileNavigation';
import { useAuth } from '@/lib/auth-context';

interface AdminLayoutProps {
  children: ReactNode;
}

// Map pathnames to page titles
const pageTitles: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/venues': 'Manage Venues',
  '/admin/events': 'Manage Events',
  '/admin/cinema': 'Cinema Manager',
  '/admin/sponsors': 'Sponsors Manager',
  '/admin/sponsors/new': 'Add New Sponsor',
  '/admin/sponsors/inquiries': 'Sponsor Inquiries',
  '/admin/ads': 'Ads Manager',
  '/admin/ads/new': 'Create New Ad',
  '/admin/analytics': 'Platform Analytics',
  '/admin/members': 'Members',
  '/admin/users': 'Manage Users',
  '/admin/studio': 'Content Studio',
  '/admin/studio/blog': 'Blog Posts',
  '/admin/studio/feed': 'Feed Posts',
  '/admin/studio/stories': 'Stories',
  '/admin/studio/reels': 'Reel Briefs',
  '/admin/studio/analytics': 'Studio Analytics',
  '/admin/studio/settings': 'Studio Settings',
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get page title
  const getPageTitle = () => {
    if (!pathname) return 'Admin';

    // Check for exact match first
    if (pageTitles[pathname]) {
      return pageTitles[pathname];
    }

    // Check for venue detail page
    if (pathname.match(/^\/admin\/venues\/[^/]+$/)) {
      return 'Venue Details';
    }

    // Check for event detail page
    if (pathname.match(/^\/admin\/events\/[^/]+$/)) {
      return 'Event Details';
    }

    // Check for cinema movie detail page
    if (pathname.match(/^\/admin\/cinema\/[^/]+$/)) {
      return 'Movie Details';
    }

    // Check for ad edit page
    if (pathname.match(/^\/admin\/ads\/[^/]+\/edit$/)) {
      return 'Edit Ad';
    }

    return 'Admin';
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Check if user is admin - redirect if not authenticated or not admin
  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // Not authenticated - redirect to login
        router.push('/login');
      } else if (user.role !== 'admin') {
        // Authenticated but not admin - redirect to venue portal
        router.push('/venue-portal/dashboard');
      }
    }
  }, [user, isLoading, router]);

  // Pending approvals count (mock)
  const pendingCount = 8;

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
          <p className="text-gray-400">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  // Not authenticated or not admin - will be redirected
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-gray-400">Access denied. Redirecting...</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <AdminSidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="lg:hidden fixed left-0 top-0 h-full w-[280px] bg-[#0F0F1A] border-r border-white/10 z-50"
            >
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <AdminSidebar
                collapsed={false}
                onToggle={() => {}}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-[260px]'
        }`}
      >
        {/* Header */}
        <AdminHeader
          title={getPageTitle()}
          onMobileMenuToggle={() => setMobileMenuOpen(true)}
          pendingCount={pendingCount}
        />

        {/* Page Content */}
        <main className="p-4 lg:p-6 pb-24 lg:pb-6">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <AdminMobileNavigation />
    </div>
  );
}
