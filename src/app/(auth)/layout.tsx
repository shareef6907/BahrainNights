import type { Metadata } from 'next';

// Login / register / password-reset / pending-approval are transactional app
// pages, not content pages. They must never be indexed.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
