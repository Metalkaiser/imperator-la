'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { User, authResult } from '@/app/utils/types';
import { getAuthService } from '@/config/auth/authServiceInstance';
import { AuthService } from '@/config/auth/authService';

interface AuthContextType {
  isAuthenticated: boolean;
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const authServiceRef = useRef<AuthService>(null); // cache del servicio para evitar multiple inits
  const router = useRouter();

  async function getService() {
    if (!authServiceRef.current) {
      authServiceRef.current = await getAuthService();
    }
    return authServiceRef.current;
  }

  const refreshSession = async () => {
    try {
      const res = await fetch('/api/admin/me', { credentials: 'include' });
      const json = await res.json();
      if (res.ok) {
        setUser(json.user ?? null);
        setIsAuthenticated(!!json.user);
        return { success: true, message: 'Session refreshed', user: json.user ?? null };
      } else {
        setUser(null);
        setIsAuthenticated(false);
        return { success: false, message: 'Failed to refresh session' };
      }
    } catch {
      setUser(null);
      setIsAuthenticated(false);
      return { success: false, message: 'Error refreshing session' };
    }
  };

  useEffect(() => {
    // Inicializar sesión al montar (no leak de cookie httpOnly — el endpoint lo lee en el servidor)
    refreshSession();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const authService = await getService();
      const result = await authService.login(email, password);
      if (!result.success) {
        return { success: false, message: result.message || 'Login failed' };
      }
      setUser(result.user || null);
      // La cookie httpOnly es colocada por el servidor; ahora pedimos /api/admin/me
      await refreshSession();
      router.replace('/admin/dashboard');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Login failed';
      return { success: false, message };
    }
  };

  const logout = async () => {
    try {
      const authService = await getService();
      await authService.logout();
      await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' });
      setUser(null);
      setIsAuthenticated(false);
      router.replace('/admin/login');
      return { success: true, message: 'Logout successful' };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Logout failed';
      return { success: false, message };
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
};
