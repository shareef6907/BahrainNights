'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Building2,
  LayoutDashboard,
  User,
  Images,
  Calendar,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Clock,
  MapPin,
  Tag,
  Film,
  Plus,
} from 'lucide-react';

interface VenueSession {
  id: string;
  name: string;
  slug: string;
  email: string;
  logo_url?: string;
}

const sidebarLinks = [
  { href: '/venue-portal/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/venue-portal/profile', label: 'Venue Profile', icon: User },
  { href: '/venue-portal/hours', label: 'Opening Hours', icon: Clock },
  { href: '/venue-portal/location', label: 'Location', icon: MapPin },
  { href: '/venue-portal/images', label: 'Gallery Images', icon: Images },
  { href: '/venue-portal/reels', label: 'Instagram Reels', icon: Film },
  { href: '/venue-portal/events', label: 'My Events', icon: Calendar },
  { href: '/venue-portal/offers', label: 'My Offers', icon: Tag },
];

// Quick action links for creating content
const quickActions = [
  { href: '/venue-portal/events/create', label: 'Create Event', icon: Calendar },
  { href: '/venue-portal/offers/create', label: 'Create Offer', icon: Tag },
];

export default function VenuePortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [venue, setVenue] = useState<VenueSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Don't apply layout to login page
  const isLoginPage = pathname === '/venue-portal/login';

  useEffect(() => {
    if (isLoginPage) {
      setIsLoading(false);
      return;
    }

    async function checkSession() {
      try {
        const response = await fetch('/api/venue-portal/session');
        if (!response.ok) {
          router.push('/venue-portal/login');
          return;
        }
        const data = await response.json();
        setVenue(data.venue);
      } catch {
        router.push('/venue-portal/login');
      } finally {
        setIsLoading(false);
      }
    }

    checkSession();
  }, [router, isLoginPage]);

  const handleLogout = async () => {
    try {
      await fetch('/api/venue-portal/logout', { method: 'POST' });
      router.push('/venue-portal/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Login page doesn't need the layout
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  // Not authenticated
  if (!venue) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-white/10 px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-white hover:bg-white/10 rounded-lg"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-600 bg-clip-text text-transparent" style={{ filter: 'drop-shadow(0 0 8px rgba(217, 119, 6, 0.3))' }}>
            BahrainNights
          </Link>
          <div className="w-10" /> {/* Spacer for balance */}
        </div>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-slate-900/95 backdrop-blur-xl border-r border-white/10 z-50 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <Link href="/" className="block">
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-600 bg-clip-text text-transparent" style={{ filter: 'drop-shadow(0 0 8px rgba(217, 119, 6, 0.3))' }}>
                BahrainNights
              </span>
            </Link>
            <p className="text-xs text-gray-500 mt-1">Venue Portal</p>
          </div>

          {/* Venue Info */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-500/20 flex items-center justify-center">
                {venue.logo_url ? (
                  <img
                    src={venue.logo_url}
                    alt={venue.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <Building2 className="w-5 h-5 text-yellow-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{venue.name}</p>
                <p className="text-xs text-gray-500 truncate">{venue.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || pathname?.startsWith(link.href + '/');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-yellow-400/20 to-orange-500/20 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-yellow-400' : ''}`} />
                  <span className="font-medium">{link.label}</span>
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto text-yellow-400" />}
                </Link>
              );
            })}

            {/* Quick Actions */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Quick Actions
              </p>
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.href}
                    href={action.href}
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-yellow-400 hover:bg-yellow-400/10 transition-all"
                  >
                    <div className="w-6 h-6 rounded-lg bg-yellow-400/20 flex items-center justify-center">
                      <Plus className="w-4 h-4" />
                    </div>
                    <span className="font-medium">{action.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen pt-16 lg:pt-0">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
