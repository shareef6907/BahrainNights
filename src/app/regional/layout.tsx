import { ReactNode } from 'react';

// Preconnect to YouTube for faster trailer loading
export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Preconnect to YouTube domains for faster trailer loading */}
      <link rel="preconnect" href="https://www.youtube.com" />
      <link rel="preconnect" href="https://www.google.com" />
      <link rel="preconnect" href="https://i.ytimg.com" />
      <link rel="dns-prefetch" href="https://www.youtube.com" />
      <link rel="dns-prefetch" href="https://i.ytimg.com" />
      {children}
    </>
  );
}
