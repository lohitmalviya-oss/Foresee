
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types/user';
import { authService } from '../services/authService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  userForecasts: string[]; // List of prediction IDs the user has participated in
  login: (email: string, pass: string) => Promise<void>;
  register: (name: string, email: string, pass: string) => Promise<void>;
  loginGoogle: () => Promise<void>;
  requestOTP: (phone: string) => Promise<void>;
  verifyOTP: (phone: string, otp: string) => Promise<void>;
  logout: () => void;
  recordParticipation: (predictionId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userForecasts, setUserForecasts] = useState<string[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('foresee_auth_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      // In a real app, we would fetch the user's forecast history here.
      // For mock purposes, we'll initialize from local storage if exists.
      const savedForecasts = localStorage.getItem('foresee_user_forecasts');
      if (savedForecasts) {
        setUserForecasts(JSON.parse(savedForecasts));
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    try {
      const u = await authService.login(email, pass);
      setUser(u);
      localStorage.setItem('foresee_auth_user', JSON.stringify(u));
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, pass: string) => {
    setIsLoading(true);
    try {
      const u = await authService.register(name, email, pass);
      setUser(u);
      localStorage.setItem('foresee_auth_user', JSON.stringify(u));
    } finally {
      setIsLoading(false);
    }
  };

  const loginGoogle = async () => {
    setIsLoading(true);
    try {
      const u = await authService.loginWithGoogle();
      setUser(u);
      localStorage.setItem('foresee_auth_user', JSON.stringify(u));
    } finally {
      setIsLoading(false);
    }
  };

  const requestOTP = async (phone: string) => {
    await authService.sendOTP(phone);
  };

  const verifyOTP = async (phone: string, otp: string) => {
    setIsLoading(true);
    try {
      const u = await authService.verifyOTP(phone, otp);
      setUser(u);
      localStorage.setItem('foresee_auth_user', JSON.stringify(u));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setUserForecasts([]);
    localStorage.removeItem('foresee_auth_user');
    localStorage.removeItem('foresee_user_forecasts');
  };

  const recordParticipation = (predictionId: string) => {
    setUserForecasts(prev => {
      if (prev.includes(predictionId)) return prev;
      const updated = [...prev, predictionId];
      localStorage.setItem('foresee_user_forecasts', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
      userForecasts,
      login, 
      register,
      loginGoogle, 
      requestOTP, 
      verifyOTP, 
      logout,
      recordParticipation
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
