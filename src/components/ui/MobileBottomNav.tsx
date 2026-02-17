'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Calendar, Film, Search, Menu, X, MapPin, Utensils, Music, Gift, Ticket } from 'lucide-react';

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  activePattern?: RegExp;
}

const navItems: NavItem[] = [
  { icon: Home, label: 'Home', href: '/', activePattern: /^\/$/ },
  { icon: Calendar, label: 'Events', href: '/whats-on', activePattern: /^\/(whats-on|events|this-weekend)/ },
  { icon: Film, label: 'Cinema', href: '/cinema', activePattern: /^\/cinema/ },
  { icon: Search, label: 'Search', href: '/search', activePattern: /^\/search/ },
];

const menuItems = [
  { icon: Utensils, label: 'Restaurants', href: '/restaurants' },
  { icon: Music, label: 'Clubs & Lounges', href: '/clubs' },
  { icon: MapPin, label: 'Attractions', href: '/attractions' },
  { icon: Gift, label: 'Offers', href: '/offers' },
  { icon: Ticket, label: 'List Your Event', href: '/list-event' },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Throttled scroll handler for performance
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY < 50) {
      setIsVisible(true);
    } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsVisible(false);
      setIsMenuOpen(false);
    } else if (currentScrollY < lastScrollY) {
      setIsVisible(true);
    }
    
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    let ticking = false;
    
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleScroll]);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isActive = (item: NavItem) => {
    if (!pathname) return false;
    if (item.activePattern) {
      return item.activePattern.test(pathname);
    }
    return pathname === item.href;
  };

  return (
    <>
      {/* Menu Overlay - CSS transition instead of framer-motion */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-200 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Expanded Menu Panel - CSS transition */}
      <div
        className={`fixed bottom-20 left-4 right-4 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-white/10 shadow-2xl z-50 md:hidden overflow-hidden transition-all duration-200 ${
          isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="p-4">
          <div className="grid grid-cols-3 gap-3">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="w-6 h-6 text-orange-400" />
                <span className="text-xs text-white/80 text-center font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar - CSS transition */}
      <nav
        className={`fixed bottom-0 left-0 right-0 z-50 md:hidden safe-area-bottom transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="mx-2 mb-2 bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg shadow-black/50">
          <div className="flex items-center justify-around px-2 py-2">
            {navItems.map((item) => {
              const active = isActive(item);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-transform active:scale-90"
                >
                  <div className={`relative transition-transform ${active ? 'scale-110 -translate-y-0.5' : ''}`}>
                    {active && (
                      <div className="absolute -inset-2 bg-orange-500/20 rounded-xl" />
                    )}
                    <item.icon
                      className={`relative z-10 w-5 h-5 transition-colors ${
                        active ? 'text-orange-400' : 'text-white/50'
                      }`}
                    />
                  </div>
                  <span
                    className={`text-[10px] font-medium transition-colors ${
                      active ? 'text-orange-400' : 'text-white/50'
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}

            {/* Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all active:scale-90"
            >
              <div className={`transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`}>
                {isMenuOpen ? (
                  <X className="w-5 h-5 text-orange-400" />
                ) : (
                  <Menu className="w-5 h-5 text-white/50" />
                )}
              </div>
              <span
                className={`text-[10px] font-medium transition-colors ${
                  isMenuOpen ? 'text-orange-400' : 'text-white/50'
                }`}
              >
                More
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Bottom padding spacer */}
      <div className="h-20 md:hidden" />
    </>
  );
}
