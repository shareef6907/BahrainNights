import { Suspense } from 'react';
import { Metadata } from 'next';
import AuthCard from '@/components/auth/AuthCard';
import LoginForm from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Login | BahrainNights',
  description: 'Sign in to manage your venue on BahrainNights.com',
};

export default function LoginPage() {
  return (
    <AuthCard variant="login">
      <Suspense fallback={<LoginFormSkeleton />}>
        <LoginForm />
      </Suspense>
    </AuthCard>
  );
}

function LoginFormSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="text-center mb-8">
        <div className="h-8 bg-white/10 rounded w-48 mx-auto mb-2" />
        <div className="h-4 bg-white/10 rounded w-36 mx-auto" />
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-white/10 rounded w-24" />
        <div className="h-12 bg-white/10 rounded-xl" />
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-white/10 rounded w-20" />
        <div className="h-12 bg-white/10 rounded-xl" />
      </div>
      <div className="h-12 bg-white/10 rounded-xl" />
    </div>
  );
}
