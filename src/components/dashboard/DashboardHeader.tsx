'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bell,
  ChevronDown,
  User,
  HelpCircle,
  LogOut,
  Menu,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

interface DashboardHeaderProps {
  title: string;
  onMobileMenuToggle?: () => void;
}

export default function DashboardHeader({ title, onMobileMenuToggle }: DashboardHeaderProps) {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-white/10">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Page Title */}
          <h1 className="text-xl font-bold text-white">{title}</h1>
        </div>

        {/* Center - Search (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search events, offers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/25 transition-all"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Search (Mobile) */}
          <button className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <Search className="w-5 h-5" />
          </button>

          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-yellow-400 rounded-full" />
          </button>

          {/* User Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500 flex items-center justify-center text-black font-bold text-sm">
                {user?.venue?.name?.charAt(0) || user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="hidden sm:block text-sm font-medium text-white max-w-[120px] truncate">
                {user?.venue?.name || 'My Venue'}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                  showUserMenu ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-56 bg-[#1A1A2E] border border-white/10 rounded-xl shadow-xl shadow-black/50 overflow-hidden"
                >
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-white/10">
                    <p className="text-sm font-medium text-white truncate">
                      {user?.venue?.name || 'My Venue'}
                    </p>
                    <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <Link
                      href="/dashboard/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span>My Account</span>
                    </Link>
                    <a
                      href="mailto:help@bahrainnights.com"
                      className="flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <HelpCircle className="w-4 h-4" />
                      <span>Help & Support</span>
                    </a>
                  </div>

                  {/* Logout */}
                  <div className="py-2 border-t border-white/10">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
