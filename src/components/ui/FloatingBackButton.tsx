'use client';

import { ArrowLeft } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export default function FloatingBackButton() {
  const pathname = usePathname();
  const router = useRouter();

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
      className="fixed bottom-6 left-6 z-50 lg:hidden
        w-14 h-14 rounded-full
        bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500
        flex items-center justify-center
        shadow-lg shadow-orange-500/30
        hover:scale-110 active:scale-95
        transition-transform duration-200"
      aria-label="Go back"
    >
      <ArrowLeft className="w-6 h-6 text-white" />
    </button>
  );
}
