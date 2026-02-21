'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { User, authResult } from '@/app/utils/types';
import { getAuthService } from '@/config/auth/authServiceInstance';
import { AuthService } from '@/config/auth/authService';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

interface AuthContextType {
  isAuthenticated: boolean;
  authStatus: AuthStatus;
  authError: string | null;
  user: User | null;
  login: (email: string, password: string) => Promise<authResult | void>;
  logout: () => Promise<authResult>;
  refreshSession: () => Promise<authResult>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authStatus, setAuthStatus] = useState<AuthStatus>('loading');
  const [authError, setAuthError] = useState<string | null>(null);
  const authServiceRef = useRef<AuthService>(null);
  const userRef = useRef<User | null>(null);
  const router = useRouter();
  const isAuthenticated = authStatus === 'authenticated';

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  async function getService() {
    if (!authServiceRef.current) {
      authServiceRef.current = await getAuthService();
    }
    return authServiceRef.current;
  }

  const refreshSession = useCallback(async (): Promise<authResult> => {
    try {
      const previousUser = userRef.current;
      console.info("previousUser in refreshSession:", previousUser);
      const res = await fetch('/api/admin/me', { credentials: 'include' });
      const json = await res.json().catch(() => ({}));

      if (res.ok) {
        const nextUser = json.user ?? null;
        setUser(nextUser);
        setAuthStatus(nextUser ? 'authenticated' : 'unauthenticated');
        setAuthError(null);
        if (process.env.NODE_ENV === 'development') {
          console.info('[auth] refreshSession: ok');
        }
        return { success: true, message: 'Session refreshed', user: nextUser ?? undefined };
      }

      if (res.status === 401 || res.status === 403) {
        setUser(null);
        setAuthStatus('unauthenticated');
        setAuthError(json.message ?? 'Invalid or expired session');
        if (process.env.NODE_ENV === 'development') {
          console.warn('[auth] refreshSession: unauthorized', { status: res.status, code: json.message });
        }
        return { success: false, message: json.message ?? 'Invalid or expired session' };
      }

      setAuthError(json.message ?? 'Temporary session refresh error');
      if (!previousUser) {
        setAuthStatus('unauthenticated');
      }
      if (process.env.NODE_ENV === 'development') {
        console.warn('[auth] refreshSession: temporary server error', { status: res.status, code: json.code });
      }
      return {
        success: false,
        message: json.message ?? 'Temporary session refresh error',
        user: previousUser ?? undefined,
      };
    } catch {
      const previousUser = userRef.current;
      setAuthError('Network error refreshing session');
      if (!previousUser) {
        setAuthStatus('unauthenticated');
      }
      if (process.env.NODE_ENV === 'development') {
        console.warn('[auth] refreshSession: network error');
      }
      return {
        success: false,
        message: 'Error refreshing session',
        user: previousUser ?? undefined,
      };
    }
  }, []);

  useEffect(() => {
    void refreshSession();
  }, [refreshSession]);

  useEffect(() => {
    if (authStatus === 'unauthenticated') {
      void logout();
    }
  }, [authStatus, router]);

  const login = async (email: string, password: string) => {
    try {
      setAuthStatus('loading');
      setAuthError(null);

      const authService = await getService();
      const result = await authService.login(email, password);
      if (!result.success) {
        setAuthStatus('unauthenticated');
        setAuthError(result.message || 'Login failed');
        if (process.env.NODE_ENV === 'development') {
          console.warn('[auth] login failed', { reason: result.message });
        }
        return { success: false, message: result.message || 'Login failed' };
      }

      setUser(result.user || null);
      const refreshed = await refreshSession();
      if (!refreshed.success) {
        return { success: false, message: refreshed.message || 'Failed to restore session after login' };
      }

      router.replace('/admin/dashboard');
    } catch (error: unknown) {
      setAuthStatus('unauthenticated');
      const message = error instanceof Error ? error.message : 'Login failed';
      setAuthError(message);
      return { success: false, message };
    }
  };

  const logout = async () => {
    try {
      const authService = await getService();
      const localLogoutResult = await authService.logout();
      const serverRes = await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' });
      if (!serverRes.ok && process.env.NODE_ENV === 'development') {
        console.warn('[auth] server logout failed', { status: serverRes.status });
      }

      setUser(null);
      setAuthStatus('unauthenticated');
      setAuthError(null);
      if (process.env.NODE_ENV === 'development') {
        console.info('[auth] logout: manual');
      }
      router.replace('/admin/login');

      if (!localLogoutResult.success) {
        return { success: false, message: localLogoutResult.message || 'Logout failed' };
      }
      return { success: true, message: 'Logout successful' };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Logout failed';
      return { success: false, message };
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, authStatus, authError, user, login, logout, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
};
