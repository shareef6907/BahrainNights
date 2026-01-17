'use client';

import Link from 'next/link';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Offline Icon */}
        <div className="text-6xl mb-6">📡</div>

        <h1 className="text-3xl font-bold text-white mb-4">
          You&apos;re Offline
        </h1>

        <p className="text-gray-400 mb-8">
          It looks like you&apos;ve lost your internet connection.
          Some features may not be available until you&apos;re back online.
        </p>

        {/* Cached Pages */}
        <div className="bg-gray-900 rounded-xl p-6 mb-6">
          <p className="text-sm text-gray-500 mb-4">Try these cached pages:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/"
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              🏠 Home
            </Link>
            <Link
              href="/events"
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              🎭 Events
            </Link>
            <Link
              href="/blog"
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              📰 Blog
            </Link>
            <Link
              href="/cinema"
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              🎬 Cinema
            </Link>
          </div>
        </div>

        {/* Retry Button */}
        <button
          onClick={() => window.location.reload()}
          className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-3 rounded-full transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
