'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { AdminRole } from '@/lib/admin-permissions';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  adminRole: AdminRole;
}

interface AdminAuthContextType {
  user: AdminUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  role: AdminRole | null;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  role: null,
  logout: async () => {},
  refresh: async () => {},
});

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchSession = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/session');
      if (!res.ok) {
        console.error('Session fetch failed:', res.status);
        setUser(null);
        return;
      }
      const data = await res.json();
      console.log('Session data:', data);
      
      if (data.success && data.data?.user && data.data.user.role === 'admin') {
        const adminRole = data.data.user.adminRole as AdminRole;
        if (!adminRole) {
          console.error('No adminRole found in session');
          setUser(null);
          return;
        }
        
        setUser({
          id: data.data.user.id,
          name: data.data.user.name,
          email: data.data.user.email,
          role: data.data.user.role,
          adminRole,
        });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Session fetch error:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  const logout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } finally {
      setUser(null);
      router.push('/admin/login');
    }
  }, [router]);

  const refresh = useCallback(async () => {
    await fetchSession();
  }, [fetchSession]);

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        role: user?.adminRole ?? null,
        logout,
        refresh,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
}
