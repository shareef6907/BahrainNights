'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export default function FloatingBackButton() {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't show until mounted (prevents hydration flash)
  if (!mounted) return null;

  // Don't show on homepage
  if (pathname === '/') return null;

  const handleBack = () => {
    // Check if there's history to go back to
    if (window.history.length > 1) {
      router.back();
    } else {
      // Fallback to homepage if no history
      router.push('/');
    }
  };

  return (
    <button
      onClick={handleBack}
      className="fixed top-20 left-4 z-[60] lg:hidden
        w-10 h-10 rounded-full
        bg-black/60 backdrop-blur-md border border-white/20
        flex items-center justify-center
        hover:bg-black/80 active:scale-95
        transition-all duration-200 shadow-lg"
      aria-label="Go back"
    >
      <ArrowLeft className="w-5 h-5 text-white" />
    </button>
  );
}
