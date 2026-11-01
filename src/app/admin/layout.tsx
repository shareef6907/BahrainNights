import { Metadata } from 'next';
import AdminLayout from '@/components/admin/AdminLayout';

export const metadata: Metadata = {
  title: 'Admin Panel',
  description: 'Manage venues, events, ads, and platform analytics on BahrainNights.com',
  // The admin panel is a private app surface - it must never be indexed.
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
