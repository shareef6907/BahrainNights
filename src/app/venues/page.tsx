'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function VenuesRedirectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Preserve query parameters when redirecting
    const params = searchParams?.toString() ?? '';
    const redirectUrl = params ? `/places?${params}` : '/places';
    router.replace(redirectUrl);
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-center text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-400 mx-auto mb-4"></div>
        <p className="text-gray-400">Redirecting to places...</p>
      </div>
    </div>
  );
}

function VenuesLoadingFallback() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-center text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-400 mx-auto mb-4"></div>
        <p className="text-gray-400">Loading...</p>
      </div>
    </div>
  );
}

export default function VenuesRedirectPage() {
  return (
    <Suspense fallback={<VenuesLoadingFallback />}>
      <VenuesRedirectContent />
    </Suspense>
  );
}
