'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';

// Types
export interface UserVenue {
  id: string;
  name: string;
  slug: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface User {
  id: string;
  email: string;
  role: 'venue_owner' | 'admin';
  venue?: UserVenue;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string; user?: User }>;
  logout: () => Promise<void>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  refreshUser: () => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  venueName: string;
  crNumber: string;
  venueType: string;
  phone: string;
  website?: string;
  instagram?: string;
  area: string;
  address: string;
  googleMapsLink?: string;
  agreeToTerms: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check authentication status on mount with retry for mobile reliability
  const checkAuth = useCallback(async (retryCount = 0) => {
    const maxRetries = 2;

    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include',
        // Add cache control to prevent stale responses on mobile
        headers: {
          'Cache-Control': 'no-cache',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setIsLoading(false);
      } else {
        // On mobile, sometimes the first request fails - retry
        if (retryCount < maxRetries && response.status !== 401) {
          await new Promise(resolve => setTimeout(resolve, 500));
          return checkAuth(retryCount + 1);
        }
        setUser(null);
        setIsLoading(false);
      }
    } catch (error) {
      // Network error - retry on mobile
      if (retryCount < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 500));
        return checkAuth(retryCount + 1);
      }
      console.error('Auth check failed after retries:', error);
      setUser(null);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Login function
  const login = async (
    email: string,
    password: string,
    rememberMe = false
  ): Promise<{ success: boolean; error?: string; user?: User }> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        return { success: true, user: data.user };
      } else {
        return { success: false, error: data.error || 'Login failed' };
      }
    } catch {
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } finally {
      setUser(null);
      router.push('/login');
    }
  };

  // Register function
  const register = async (
    data: RegisterData
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        return { success: true };
      } else {
        return { success: false, error: result.error || 'Registration failed' };
      }
    } catch {
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  // Refresh user data
  const refreshUser = async (): Promise<void> => {
    await checkAuth();
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    register,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Hook for protected pages
export function useRequireAuth(redirectTo = '/login') {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(`${redirectTo}?redirect=${encodeURIComponent(window.location.pathname)}`);
    }
  }, [isLoading, isAuthenticated, router, redirectTo]);

  return { user, isLoading };
}

// Hook for guest-only pages (login, register)
export function useRequireGuest(redirectTo = '/venue-portal/dashboard') {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      // Check if venue is pending approval
      if (user?.role === 'venue_owner' && user?.venue?.status === 'pending') {
        router.push('/pending-approval');
      } else {
        router.push(redirectTo);
      }
    }
  }, [isLoading, isAuthenticated, user, router, redirectTo]);

  return { isLoading };
}
