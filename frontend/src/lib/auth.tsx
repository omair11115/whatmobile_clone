import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: () => Promise<void>;
  loginWithCredentials: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    
    const handleLoginTrigger = () => login();
    window.addEventListener('TRIGGER_LOGIN', handleLoginTrigger);
    
    const handleMessage = (event: MessageEvent) => {
      // Allow messages from the same domain (including ngrok)
      // and common dev/preview domains
      const origin = event.origin;
      const isAllowed = 
        origin === window.location.origin ||
        origin.endsWith('.run.app') || 
        origin.includes('localhost') ||
        origin.includes('ngrok-free.dev');
        
      if (!isAllowed) return;
      
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        checkAuth();
      }
    };
    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('TRIGGER_LOGIN', handleLoginTrigger);
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    } catch (err) {
      console.error("Auth check failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async () => {
    try {
      const res = await fetch('/api/auth/google/url');
      if (res.ok) {
        const { url } = await res.json();
        const width = 600;
        const height = 700;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;
        
        window.open(url, 'google_login', `width=${width},height=${height},left=${left},top=${top}`);
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const loginWithCredentials = async (username: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        checkAuth();
        return { success: true };
      } else {
        return { success: false, error: data.error || "Login failed" };
      }
    } catch (err) {
      console.error("Credentials login failed:", err);
      return { success: false, error: "System error" };
    }
  };

  const logout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' });
      if (res.ok) {
        setUser(null);
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, loginWithCredentials, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
