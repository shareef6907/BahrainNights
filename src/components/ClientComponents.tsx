'use client';

import dynamic from 'next/dynamic';

// Dynamic imports for non-critical components (improves initial load)
// Using ssr: false since these are purely client-side interactive components
const FloatingBackButton = dynamic(() => import("@/components/ui/FloatingBackButton"), { 
  ssr: false,
  loading: () => null 
});

const SwipeBackHandler = dynamic(() => import("@/components/SwipeBackHandler"), { 
  ssr: false,
  loading: () => null 
});

const PWARegister = dynamic(
  () => import("@/components/PWARegister").then(mod => ({ default: mod.PWARegister })), 
  { ssr: false, loading: () => null }
);

const PWAInstallPrompt = dynamic(
  () => import("@/components/PWAInstallPrompt").then(mod => ({ default: mod.PWAInstallPrompt })), 
  { ssr: false, loading: () => null }
);

const RamadanBanner = dynamic(() => import("@/components/Ramadan/RamadanBanner"), { 
  ssr: false,
  loading: () => null 
});

// Mobile Bottom Navigation - sticky nav for mobile users
const MobileBottomNav = dynamic(() => import("@/components/ui/MobileBottomNav"), { 
  ssr: false,
  loading: () => null 
});

interface ClientComponentsProps {
  children: React.ReactNode;
}

/**
 * Wrapper for client-side interactive components that are not needed for initial render.
 * These components are lazily loaded to improve First Contentful Paint and Time to Interactive.
 */
export function ClientComponents({ children }: ClientComponentsProps) {
  return (
    <>
      <RamadanBanner />
      <SwipeBackHandler threshold={50} edgeWidth={50} />
      {children}
      <FloatingBackButton />
      <MobileBottomNav />
      <PWARegister />
      <PWAInstallPrompt />
    </>
  );
}
