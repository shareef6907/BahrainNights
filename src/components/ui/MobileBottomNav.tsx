'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
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

  // Hide nav when scrolling down, show when scrolling up
  useEffect(() => {
    const handleScroll = () => {
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
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

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
      {/* Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Expanded Menu Panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-20 left-4 right-4 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-white/10 shadow-2xl z-50 md:hidden overflow-hidden"
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation Bar */}
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : 100 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden safe-area-bottom"
      >
        <div className="mx-2 mb-2 bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg shadow-black/50">
          <div className="flex items-center justify-around px-2 py-2">
            {navItems.map((item) => {
              const active = isActive(item);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all active:scale-90"
                >
                  <motion.div
                    animate={{
                      scale: active ? 1.1 : 1,
                      y: active ? -2 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="relative"
                  >
                    {active && (
                      <motion.div
                        layoutId="navIndicator"
                        className="absolute -inset-2 bg-orange-500/20 rounded-xl"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <item.icon
                      className={`relative z-10 w-5 h-5 transition-colors ${
                        active ? 'text-orange-400' : 'text-white/50'
                      }`}
                    />
                  </motion.div>
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
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5 text-orange-400" />
                ) : (
                  <Menu className="w-5 h-5 text-white/50" />
                )}
              </motion.div>
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
      </motion.nav>

      {/* Bottom padding spacer to prevent content from being hidden behind nav */}
      <div className="h-20 md:hidden" />
    </>
  );
}
