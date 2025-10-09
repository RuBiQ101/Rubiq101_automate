"use client";
import { createContext, useState, useEffect, type ReactNode, useContext } from "react";
import Cookies from "js-cookie";
import api from "@/lib/api";

interface User { 
  id: string; 
  email: string; 
  name: string; 
  role: string; 
}

interface AuthContextType { 
  user: User | null; 
  login: (email: string, password: string) => Promise<void>; 
  signup: (name: string, email: string, password: string) => Promise<void>; 
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      api.get("/api/me")
        .then(res => {
          setUser(res.data.user);
          setLoading(false);
        })
        .catch(() => {
          logout();
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.post("/api/auth/login", { email, password });
    const { token, user } = res.data;
    Cookies.set("token", token);
    setUser(user);
  };

  const signup = async (name: string, email: string, password: string) => {
    const res = await api.post("/api/auth/signup", { name, email, password });
    const { token, user } = res.data;
    Cookies.set("token", token);
    setUser(user);
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    if (typeof window !== 'undefined') {
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
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

export { AuthContext };


