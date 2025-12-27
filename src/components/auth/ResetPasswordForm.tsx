'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { resetPasswordSchema } from '@/lib/validations/auth';
import PasswordInput from './PasswordInput';
import PasswordStrength from './PasswordStrength';

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams?.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'invalid-token'>('idle');
  const [countdown, setCountdown] = useState(5);

  // Validate token on mount
  useEffect(() => {
    if (!token) {
      setStatus('invalid-token');
    }
  }, [token]);

  // Countdown redirect after success
  useEffect(() => {
    if (status === 'success') {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            router.push('/login');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate with Zod
    const result = resetPasswordSchema.safeParse({
      token,
      password,
      confirmPassword,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((error) => {
        if (error.path[0]) {
          fieldErrors[error.path[0].toString()] = error.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
      } else {
        if (data.error === 'Invalid or expired reset token') {
          setStatus('invalid-token');
        } else {
          setErrors({ password: data.error || 'Failed to reset password' });
        }
      }
    } catch {
      setErrors({ password: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Invalid token state
  if (status === 'invalid-token') {
    return (
      <div className="text-center py-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
          className="w-20 h-20 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center"
        >
          <XCircle className="w-10 h-10 text-red-400" />
        </motion.div>

        <h2 className="text-xl font-bold text-white mb-2">Invalid Reset Link</h2>
        <p className="text-gray-400 mb-6 max-w-sm mx-auto">
          This password reset link is invalid or has expired. Please request a new one.
        </p>

        <Link
          href="/forgot-password"
          className="inline-block w-full py-3 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all"
        >
          Request New Link
        </Link>

        <Link
          href="/login"
          className="block mt-4 text-gray-400 hover:text-white transition-colors"
        >
          Back to Login
        </Link>
      </div>
    );
  }

  // Success state
  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
          className="w-20 h-20 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center"
        >
          <CheckCircle2 className="w-10 h-10 text-green-400" />
        </motion.div>

        <h2 className="text-xl font-bold text-white mb-2">Password Reset Successful!</h2>
        <p className="text-gray-400 mb-6 max-w-sm mx-auto">
          Your password has been reset successfully. Redirecting to login in{' '}
          <span className="text-yellow-400 font-semibold">{countdown}</span> seconds...
        </p>

        <Link
          href="/login"
          className="inline-block w-full py-3 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all"
        >
          Go to Login Now
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Reset Password</h1>
        <p className="text-gray-400">Create a new secure password</p>
      </div>

      {/* General Error */}
      {errors.password && !password && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400"
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">{errors.password}</span>
        </motion.div>
      )}

      {/* New Password */}
      <PasswordInput
        name="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
        }}
        label="New Password"
        placeholder="Create a strong password"
        disabled={isLoading}
        error={errors.password}
      />

      {/* Password Strength */}
      <PasswordStrength password={password} />

      {/* Confirm Password */}
      <PasswordInput
        name="confirmPassword"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          if (errors.confirmPassword)
            setErrors((prev) => ({ ...prev, confirmPassword: '' }));
        }}
        label="Confirm New Password"
        placeholder="Confirm your password"
        disabled={isLoading}
        error={errors.confirmPassword}
      />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Resetting...</span>
          </>
        ) : (
          <span>Reset Password</span>
        )}
      </button>

      {/* Back to Login */}
      <div className="text-center">
        <Link
          href="/login"
          className="text-gray-400 hover:text-white transition-colors"
        >
          Back to Login
        </Link>
      </div>
    </form>
  );
}
