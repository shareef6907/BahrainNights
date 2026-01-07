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
      className="fixed top-4 left-4 z-50 lg:hidden
        w-10 h-10 rounded-full
        bg-black/30 backdrop-blur-sm
        flex items-center justify-center
        hover:bg-black/50 active:scale-95
        transition-all duration-200"
      aria-label="Go back"
    >
      <ArrowLeft className="w-5 h-5 text-white" />
    </button>
  );
}
