'use client';

import Link from 'next/link';

/**
 * Footer line: BahrainNights.com is a Premiera Live company.
 * Replaces the former group-ownership bar, which referenced a name that
 * was never an official entity.
 */
export default function PremieraLiveCompanyLine() {
  return (
    <div className="bg-[#111] border-t border-b border-amber-500/20 py-5 text-center">
      <Link
        href="https://www.premieralive.com"
        target="_blank"
        rel="noopener noreferrer"
        className="font-sans text-xs tracking-[4px] text-amber-500 uppercase hover:underline"
      >
        A Premiera Live company
      </Link>
    </div>
  );
}
