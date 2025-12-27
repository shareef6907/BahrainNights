import { Suspense } from 'react';
import { Metadata } from 'next';
import AuthCard from '@/components/auth/AuthCard';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';

export const metadata: Metadata = {
  title: 'Reset Password | BahrainNights',
  description: 'Create a new password for your BahrainNights.com account.',
};

export default function ResetPasswordPage() {
  return (
    <AuthCard variant="reset-password">
      <Suspense fallback={<ResetPasswordSkeleton />}>
        <ResetPasswordForm />
      </Suspense>
    </AuthCard>
  );
}

function ResetPasswordSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="text-center mb-8">
        <div className="h-8 bg-white/10 rounded w-40 mx-auto mb-2" />
        <div className="h-4 bg-white/10 rounded w-52 mx-auto" />
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-white/10 rounded w-28" />
        <div className="h-12 bg-white/10 rounded-xl" />
      </div>
      <div className="h-2 bg-white/10 rounded-full" />
      <div className="space-y-2">
        <div className="h-4 bg-white/10 rounded w-36" />
        <div className="h-12 bg-white/10 rounded-xl" />
      </div>
      <div className="h-12 bg-white/10 rounded-xl" />
    </div>
  );
}
