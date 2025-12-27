'use client';

import { useState, useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import MobileNavigation from './MobileNavigation';
import { useRequireAuth } from '@/lib/auth-context';

interface DashboardLayoutProps {
  children: ReactNode;
}

// Map pathnames to page titles
const pageTitles: Record<string, string> = {
  '/dashboard': 'Overview',
  '/dashboard/events': 'Events',
  '/dashboard/events/new': 'Create Event',
  '/dashboard/offers': 'Offers',
  '/dashboard/offers/new': 'Create Offer',
  '/dashboard/analytics': 'Analytics',
  '/dashboard/profile': 'Venue Profile',
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, isLoading } = useRequireAuth('/login');
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get page title
  const getPageTitle = () => {
    if (!pathname) return 'Dashboard';

    // Check for exact match first
    if (pageTitles[pathname]) {
      return pageTitles[pathname];
    }

    // Check for edit event page
    if (pathname.match(/^\/dashboard\/events\/[^/]+\/edit$/)) {
      return 'Edit Event';
    }

    // Check for edit offer page
    if (pathname.match(/^\/dashboard\/offers\/[^/]+\/edit$/)) {
      return 'Edit Offer';
    }

    return 'Dashboard';
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin" />
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - will be redirected by useRequireAuth
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <DashboardSidebar
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
              className="lg:hidden fixed left-0 top-0 h-full w-[280px] bg-[#1A1A2E] border-r border-white/10 z-50"
            >
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <DashboardSidebar
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
        <DashboardHeader
          title={getPageTitle()}
          onMobileMenuToggle={() => setMobileMenuOpen(true)}
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
      <MobileNavigation />
    </div>
  );
}
