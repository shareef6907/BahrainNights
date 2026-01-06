'use client';

import Link from 'next/link';
import { Home } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function FloatingHomeButton() {
  const pathname = usePathname();

  // Don't show on homepage
  if (pathname === '/') return null;

  return (
    <Link
      href="/"
      className="fixed bottom-6 right-6 z-50 lg:hidden
        w-14 h-14 rounded-full
        bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500
        flex items-center justify-center
        shadow-lg shadow-orange-500/30
        hover:scale-110 active:scale-95
        transition-transform duration-200"
      aria-label="Return to home"
    >
      <Home className="w-6 h-6 text-white" />
    </Link>
  );
}
